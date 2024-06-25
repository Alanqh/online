
/**
 * 轨道镜头用法<br />
 * 	1.场景上拖入一个C端动态的焦点对象
 *  2.场景上拖入一个C端动态的路径根节点，在这个节点下面加入路径点，路径点按照拖入顺序执行
 *  3
 * 
 */

import { ModifiedCameraSystem } from "../../../Modified027Editor/ModifiedCamera";


///#REGIN 管理器，供外部调用
export namespace TraceCameraService {
	let _camera: TraceCamera;
	export function _init(camera: TraceCamera) {
		_camera = camera;
	}
	export function startTrace(guid: string, onStart: () => void, onFininsh: () => void) {
		if (_camera && !_camera.useUpdate) {
			//正在移动
			_camera.start(guid, onStart, onFininsh);
		}
	}

	export function breakTrace() {
		if (_camera && _camera.useUpdate) {
			_camera.stop();
		}
	}
}

@Serializable
class TraceConfig {
	@mw.Property({ displayName: "节点" })
	root: string = "";
	@mw.Property({ displayName: "移动速度" })
	speed: number = 200;
	@mw.Property({ displayName: "循环次数(0-无限)" })
	loopCount: number = 1;
}
namespace TempData {
	export const vector = new mw.Vector();
	export const rotation = new mw.Rotation();
	export const transform = new mw.Transform();
	export function sub(v1: mw.Vector, v2: mw.Vector) {
		vector.x = v1.x - v2.x;
		vector.y = v1.y - v2.y;
		vector.z = v1.z - v2.z;
		return vector;
	}
	export function add(v1: mw.Vector, v2: mw.Vector) {
		vector.x = v1.x + v2.x;
		vector.y = v1.y + v2.y;
		vector.z = v1.z + v2.z;
		return vector;
	}
	export function mul(v1: mw.Vector, scale: number) {
		vector.x = v1.x * scale;
		vector.y = v1.y * scale;
		vector.z = v1.z * scale;
		return vector;
	}
	export function setTranfrom(location: mw.Vector, rotation: mw.Rotation) {
		transform.position.x = location.x;
		transform.position.y = location.y;
		transform.position.z = location.z;

		transform.rotation.x = rotation.x;
		transform.rotation.y = rotation.y;
		transform.rotation.z = rotation.z;
		return transform;
	}
	export function addR(r1: mw.Rotation, r2: mw.Rotation) {
		rotation.x = r1.x + r2.x;
		rotation.y = r1.y + r2.y;
		rotation.z = r1.z + r2.z;
		return rotation;
	}
	export function mulR(r1: mw.Rotation, scale: number) {
		rotation.x = r1.x * scale;
		rotation.y = r1.y * scale;
		rotation.z = r1.z * scale;
		return rotation;
	}
}
class Line {

	/**
	 * 起点坐标
	 */
	startVec: mw.Vector;
	/**
	 * 起点旋转
	 */
	startRot: mw.Rotation;
	/**
	 * 路径长度
	 */
	len: number;

	/**
	 * 路径方向
	 */
	dir: mw.Vector;
	/**
	 * 角度方向
	 */
	ang: mw.Rotation;

	private _time: number = 0;

	constructor(startObj: mw.GameObject, endObj: mw.GameObject, speed: number) {
		this.startVec = startObj.worldTransform.position;
		this.startRot = startObj.worldTransform.rotation;
		const vecTemp = TempData.sub(endObj.worldTransform.position, this.startVec);
		this.dir = vecTemp.normalized;
		this.len = vecTemp.length;
		this._time = this.len / speed;

		this.ang = startObj.worldTransform.getRightVector().subtract(endObj.worldTransform.getRightVector()).toRotation();
	}

	public get time() {
		return this._time;
	}
	public getPostion(time: number): mw.Vector {
		const ratio = time / this._time * this.len;
		return TempData.add(this.startVec, TempData.mul(this.dir, ratio));
	}
	public getRotation(time: number): mw.Rotation {
		const ratio = time / this._time * this.len;
		return TempData.addR(this.startRot, TempData.mulR(this.ang, ratio));
	}
}
/**
 * 镜头移动实现，实现每个镜头的移动
 */
class Trace {
	private _cameraLocation = new mw.Vector();
	private _cameraRotation = new mw.Rotation();
	private _lines: Line[];
	private _time: number;
	private _loopCount: number;
	private _loop: number;
	private _totalTime: number;
	onFininsh: () => void;
	private _setting;
	constructor(private _camera: Camera, private cfg: TraceConfig) {
		this._loopCount = cfg.loopCount;
		this._loop = cfg.loopCount > 0 ? 0 : -1;
		this._lines = [];
		const root = GameObject.findGameObjectById(cfg.root);
		const childs = root.getChildren();
		this._lines = [];
		for (let i = 0; i < childs.length; i++) {
			if (i + 1 < childs.length) {
				this._lines.push(new Line(childs[i], childs[i + 1], cfg.speed));
			}
		}
		if (this._loopCount != 1) {
			this._lines.push(new Line(childs[childs.length - 1], childs[0], cfg.speed));
		}
		this._totalTime = 0;
		for (let i = 0; i < this._lines.length; i++) {
			this._totalTime += this._lines[i].time;
		}
	}
	stop() {
		ModifiedCameraSystem.resetOverrideCameraRotation();
		ModifiedCameraSystem.applySettings(this._setting);
		if (this._camera.positionMode == mw.CameraPositionMode.PositionFollow) {
			ModifiedCameraSystem.setCameraFollowTarget(Player.localPlayer.character);
		}
	}
	start(onStart: () => void, onFininsh: () => void) {
		onStart();
		this.onFininsh = onFininsh;
		this._time = 0;
		this._setting = ModifiedCameraSystem.getCurrentSettings();
		this._camera.positionMode = mw.CameraPositionMode.PositionFixed;
		this._camera.rotationMode = mw.CameraRotationMode.RotationControl;
		// this._camera.raiseCameraHeight = 0;
		this._camera.springArm.length = 0;
	}
	onUpdate(dt: number) {
		this._time += dt;
		while (this._time > this._totalTime) {
			this._time -= this._totalTime;
			if (this._loopCount > 0) {
				this._loop++;
				if (this._loop == this._loopCount) {
					this.stop();
					this.onFininsh();
				}
			}
		}
		if (this._loop < this._loopCount) {
			let time = this._time;
			for (let i = 0; i < this._lines.length; i++) {
				if (time < this._lines[i].time) {
					this._cameraLocation = this._lines[i].getPostion(time);
					this._cameraRotation = this._lines[i].getRotation(time);
					break;
				} else {
					time -= this._lines[i].time;
				}
			}
			TempData.setTranfrom(this._cameraLocation, this._cameraRotation);
			ModifiedCameraSystem.setOverrideCameraRotation(this._cameraRotation);
			this._camera.springArm.worldTransform = TempData.transform;

		}
	}
}
@Component
export default class TraceCamera extends mw.Script {


	@mw.Property({ displayName: "镜头轨道", arrayDefault: new TraceConfig() })
	private traceCfgs: TraceConfig[] = [];

	private traces: Map<string, Trace> = new Map();
	private trace: Trace;
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (this.isRunningClient()) {
			Player.asyncGetLocalPlayer().then(player => {
				player.character.asyncReady().then(character => {
					for (let i = 0; i < this.traceCfgs.length; i++) {
						const trace = new Trace(Camera.currentCamera, this.traceCfgs[i]);
						this.traces.set(this.traceCfgs[i].root, trace);
					}
					for (let i = 0; i < this.traceCfgs.length; i++) {
						const lookAtObj = GameObject.findGameObjectById(this.traceCfgs[i].root);
						lookAtObj && !lookAtObj["isDestroy"] && (lookAtObj["isDestroy"] = true) && lookAtObj.destroy();
					}
					TraceCameraService._init(this);
				});
			});
			setTimeout(() => {
				TraceCameraService.startTrace("21F531F5", () => { }, () => { });
			}, 3000);
		}
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		this.trace.onUpdate(dt);
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}
	start(guid: string, onStart: () => void, onFininsh: () => void) {
		this.trace = this.traces.get(guid);
		this.trace && this.trace.start(onStart, () => {
			this.useUpdate = false;
			onFininsh();
		});
		this.useUpdate = this.trace != null;
	}
	stop() {
		this.trace && this.trace.stop();
		this.useUpdate = false;
	}
}