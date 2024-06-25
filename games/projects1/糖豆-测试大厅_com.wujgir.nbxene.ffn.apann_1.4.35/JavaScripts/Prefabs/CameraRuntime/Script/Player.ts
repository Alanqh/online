import { CameraNode } from "./CameraNode";
import { Data } from "./Data";
import { Parser } from "./Paser";

export class Player {

    private nodes: CameraNode[] = [];
    private editorNodes: CameraNode[] = [];
    private _timeScale = 1;
    /**当前播放的索引 */
    private playIndex = 0;
    /**摄像机对象 */
    private camera: UE.CameraComponent;
    private character: Character;
    private _isReady: boolean = false;
    private _location: UE.Vector;
    private _rotation: UE.Rotator;
    /**是否暂停 */
    private _isPause: boolean = true;

    /**移动到玩家节点 */
    private moveToCharacterNode: CameraNode;

    /**结束回调 */
    public onComplete: Action = new Action();
    /**镜头是否锁定 */
    private _isLock: boolean = false;
    cameraSystem: UE.MWSysCameraSystemComponent;
    // cameraSystem: UE.MWSysCameraSystemComponent;
    /**播放 */
    public play() {
        this._isPause = this.nodes.length == 0;
        this.moveToCharacterNode = null;
    }

    /**是否在播放中 */
    public get isPlaying() {
        return !this._isPause;
    }

    /**加载播放数据 */
    public loadCameraData(datas: Data[]) {
        this.nodes.length = 0;
        for (let i = 1; i < datas.length; i += 2) {
            const node = new CameraNode(datas[i]);
            node.setBezierNode(new CameraNode(datas[i - 1]), i < datas.length - 1 ? new CameraNode(datas[i + 1]) : null);
            this.nodes.push(node);
        }
    }
    /**加载播放数据 */
    public load(text: string) {
        const datas: Data[] = Parser.parse(text);
        this.loadCameraData(datas);
        return this;
    }
    public checkLock(isLock: boolean) {
        if (this._isLock != isLock) {
            this._isLock = isLock;
            if (isLock) {
                Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationFixed;
                Camera.currentCamera.positionMode = mw.CameraPositionMode.PositionFixed;
            } else {
                Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationControl;
                Camera.currentCamera.positionMode = mw.CameraPositionMode.PositionFollow;
            }
        }
    }

    /**加载编辑数据 */
    public loadEditorData(datas: Data[]) {
        this.editorNodes.length = 0;
        for (let i = 0; i < datas.length; i++) {
            const node = new CameraNode(datas[i]);
            this.editorNodes.push(node);
        }
    }
    /**跳转到时间点 */
    public select(data: Data) {
        const node = this.editorNodes.find(i => i.data == data);
        if (node) {
            this.cameraSystem.K2_SetRelativeLocationAndRotation(this._location, this._rotation, false, null, false);
            this.camera.K2_SetRelativeLocationAndRotation(this._location, this._rotation, false, null, false);
            node.transform.update(0, null, null, this.camera);
        }
    }
    /**准备资源 */
    public async ready(): Promise<void> {
        if (this._isReady) return;
        return new Promise(res => {

            const inter = setInterval(() => {
                const player = mw.Player.localPlayer
                if (player && player.character) {
                    clearInterval(inter);
                    player.character.asyncReady().then(() => {
                        this.character = player.character;
                        // this.camera = Camera.currentCamera["ueCamera"].CameraSystemComponent as UE.CameraComponent;
                        // Camera.currentCamera = Camera.currentCamera["ueCamera"] as UE.MWSysCameraSystemComponent;

                        this.camera = Camera.currentCamera["ueCamera"].CameraSystemComponent.CameraComponent as UE.CameraComponent;
                        this.cameraSystem = Camera.currentCamera["ueCamera"].CameraSystemComponent as UE.MWSysCameraSystemComponent;

                        this._location = new UE.Vector(0, 0, 0);
                        this._rotation = new UE.Rotator(0, 0, 0);
                        this._isReady = true;
                        res();
                    });
                }
            }, 100);
        });
    }
    /**销毁对象 */
    public destroy() {
        this._isLock = true;
        this.stop();
        this.nodes.length = 0;
    }
    /**进入编辑 */
    public enterEdit() {
        Camera.currentCamera.springArm.length = 0;
    }
    /**停止 */
    public stop() {
        if (!this._isPause) {
            mw.Camera.currentCamera.positionLagEnabled = true;
            this.backToFollower();
            this._timeScale = 1;
            this.playIndex = 0;
            this._isPause = true;
            this.onComplete.call();
        }
    }
    /**返回跟随者 */
    private backToFollower() {
        this.checkLock(false);
        this.cameraSystem.K2_SetRelativeLocationAndRotation(this._location, this._rotation, false, null, false);
        this.camera.K2_SetRelativeLocationAndRotation(this._location, this._rotation, false, null, false);

    }
    /**跳转到时间点 */
    public skipTo(time: number) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if (time < node.lifeTime) {
                this.playIndex = i;
                const passTime = (i == 0 ? -100 : this.nodes[i - 1].lifeTime);
                node.passTime = time - passTime;
                node.update(this.camera, false, 0);
                break;
            } else if (time == node.lifeTime) {
                //跳转到时间点
                this.playIndex = i;
                node.passTime = Infinity;
                node.update(this.camera, false, 0);
                break;
            }
        }

    }
    /**设置时间缩放 */
    public set timeScale(time: number) {
        this._timeScale = time;
    }
    /**暂停 */
    public pause() {
        this._isPause = true;
    }
    private moveToCharacter() {
        const characterLoc = this.character.worldTransform.position;
        const characterRot = this.character.worldTransform.rotation;
        characterRot.y -= 15;
        const offset = this.character.worldTransform.getForwardVector().multiply(-200);
        const preNode = this.nodes[this.nodes.length - 1];
        this.moveToCharacterNode = new CameraNode(
            new Data(
                1 + preNode.lifeTime,
                [characterLoc.x + offset.x, characterLoc.y + offset.y, characterLoc.z + offset.z],
                [characterRot.x, characterRot.y, characterRot.z])
        );
        this.moveToCharacterNode.setBezierNode(preNode, null);
    }
    public onUpdate(dt: number) {
        if (this._isPause) {
            return;
        }
        this.checkLock(true);
        dt *= this._timeScale;
        Event.dispatchToLocal("PlayTimePassed", dt);
        if (this.moveToCharacterNode) {
            if (this.moveToCharacterNode.update(this.camera, false, dt)) {
                this.stop();
            }
        }
        else if (this.nodes[this.playIndex].update(this.camera, false, dt)) {
            this.playIndex++;
            if (this.playIndex == this.nodes.length) {
                this.stop();
                // this.moveToCharacter();
            }
        }
    }
}