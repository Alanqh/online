import { PropQualityType } from "../../const/enum";
import { Easing } from "../../utils/Tween";
import { utils } from "../../utils/uitls";


export class QualityEffectInfo {
    /**品质类型 */
    public qualityType: PropQualityType;
    /**品质第一特效 */
    public effObj_1: GameObject;
    /**品质第二特效 */
    public effObj_2: GameObject;
}
export class LotteryTransition {
    private static mainCamera: Camera;
    private static curQualityType: PropQualityType

    private static tempRot: Rotation = Rotation.zero;
    private static tempRot2: Rotation = Rotation.zero;
    private static tempRot3: Rotation = Rotation.zero;
    private static tempRot4: Rotation = Rotation.zero;

    private static normalBox: GameObject;
    private static normalBoxBornScale: Vector
    private static normalBox_Up: GameObject;
    private static normalBox_Down: GameObject;
    private static normalBox_Up_BornOffset: Vector;
    private static normalBox_Up_BornRotation: Rotation;

    private static cameraAnchor1: GameObject;
    private static cameraAnchor2: GameObject;

    private static qualityEff: QualityEffectInfo[] = [];

    private static endLookAnchor: GameObject;
    private static showEffect: Effect;
    private static camera: Camera;
    private static initFinish: boolean;
    private static get cameraPosition(): Vector { return this.camera.worldTransform.position; }
    private static set cameraPosition(pos: Vector) { this.camera.worldTransform.position = pos; }
    private static cameraLookTo(pos: Vector) { this.camera.worldTransform.rotation = Vector.subtract(pos, this.camera.worldTransform.position).toRotation(); }
    private static currentBox: GameObject;
    private static currentBox_Up: GameObject;
    private static currentBox_Down: GameObject;
    private static get currentBoxPosition(): Vector { return this.currentBox.worldTransform.position; }
    private static set currentBoxPosition(pos: Vector) { this.currentBox.worldTransform.position = pos; }

    private static finishCallback: () => void

    static tween1 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 1 }, 1000)
        .onStart(() => {
            // 开启盒子显示
            this.currentBox.setVisibility(true);
        })
        .onUpdate(obj => {
            // 摄像机拉近
            this.cameraPosition = Vector.lerp(this.cameraAnchor1.worldTransform.position, this.cameraAnchor2.worldTransform.position, obj.t);
        })
        .onComplete(() => {
            this.tween2.start();
        });


    // 摇摇盒子
    static tween2 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 6.75 }, 2000)
        .onStart(() => {
            // 聚气
            EffectService.playAtPosition('108248', this.currentBoxPosition, { scale: new Vector(1.5, 1.5, 1.5) });
        })
        .onUpdate(obj => {
            // 盒子晃一晃
            let t = utils.pingPong(obj.t);
            let rot = Rotation.lerp(new Rotation(0, -20, -180), new Rotation(0, 20, -180), t);
            this.currentBox.worldTransform.rotation = rot;
        })
        .onComplete(() => {
            this.tween3.start();
        })
        .easing(Easing.Quadratic.InOut);

    // 盖子稍微打开一点
    static tween3 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 1 }, 1000)
        .onStart(() => {
            this.tempRot = new Rotation(new Vector(-15, this.normalBox_Up_BornRotation.y, this.normalBox_Up_BornRotation.z))
            let eff = this.qualityEff.find(info => { return info.qualityType == this.curQualityType })
            if (eff) {
                eff.effObj_2.setVisibility(false);
                eff.effObj_1.worldTransform.position = this.currentBox_Up.worldTransform.position;
                eff.effObj_1.setVisibility(true);
            }
        })
        .onUpdate(obj => {
            this.currentBox_Up.localTransform.rotation = Rotation.lerp(this.normalBox_Up_BornRotation, this.tempRot, obj.t);
        })
        .onComplete(() => {
            //TODO:播放特效

            this.tween4.start()
        });

    static tween4 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 1 }, 1000)
        .onStart(() => {
            this.tempRot = new Rotation(new Vector(-15, this.normalBox_Up_BornRotation.y, this.normalBox_Up_BornRotation.z))
            this.tempRot2 = new Rotation(new Vector(-90, this.normalBox_Up_BornRotation.y, this.normalBox_Up_BornRotation.z))
            let eff = this.qualityEff.find(info => { return info.qualityType == this.curQualityType })
            if (eff) {
                eff.effObj_1.setVisibility(false);
                eff.effObj_2.worldTransform.position = this.currentBox_Up.worldTransform.position;
                eff.effObj_2.setVisibility(true);
            }
        })
        .onUpdate(info => {
            this.currentBox_Up.localTransform.rotation = Rotation.lerp(this.tempRot, this.tempRot2, info.t);
        })
        .onComplete(() => {
            this.tween5.start();
        })
    static tween5 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 1 }, 1000)
        .onStart(() => {
            this.tempRot4 = this.camera.worldTransform.rotation;
        })
        .onUpdate(info => {
            this.cameraPosition = Vector.lerp(this.cameraAnchor1.worldTransform.position, this.cameraAnchor2.worldTransform.position, info.t);
            this.camera.worldTransform.rotation = Rotation.lerp(this.tempRot4, this.tempRot3, info.t);
        })
        .onComplete(() => {
            this.currentBox.setVisibility(PropertyStatus.Off);
            this.tween6.start();
        })
    // 结束延迟
    static tween6 = new Tween<{ t: number; }>({ t: 0 }).to({ t: 1 }, 500)
        .onComplete(() => {
            // 全部结束, 复发回调
            this.finishCallback()
        });

    static init() {
        this.normalBox = GameObject.findGameObjectById('39DD253D');
        this.normalBoxBornScale = this.normalBox.worldTransform.scale;
        this.normalBox_Up = this.normalBox.getChildByName("Up");
        this.normalBox_Down = this.normalBox.getChildByName("Down");
        this.normalBox_Up_BornOffset = this.normalBox_Up.localTransform.position;
        this.normalBox_Up_BornRotation = this.normalBox_Up.localTransform.rotation;

        this.cameraAnchor1 = GameObject.findGameObjectById('1A5A9816');
        this.cameraAnchor2 = GameObject.findGameObjectById('12F277DC');

        this.endLookAnchor = GameObject.findGameObjectById('1FAD9300');

        this.camera = GameObject.spawn('Camera', { replicates: false });
        this.mainCamera = Camera.currentCamera;

        //TODO:很蠢的写法，后面优化
        let info_1 = new QualityEffectInfo();
        info_1.qualityType = PropQualityType.Blue
        info_1.effObj_1 = GameObject.findGameObjectById(`1BF75407`)
        info_1.effObj_2 = GameObject.findGameObjectById(`145E4DF4`)
        this.qualityEff.push(info_1);
        let info_2 = new QualityEffectInfo();
        info_2.qualityType = PropQualityType.Purple
        info_2.effObj_1 = GameObject.findGameObjectById(`2AB5A57F`)
        info_2.effObj_2 = GameObject.findGameObjectById(`22073ED2`)
        this.qualityEff.push(info_2);
        let info_3 = new QualityEffectInfo();
        info_3.qualityType = PropQualityType.Golden
        info_3.effObj_1 = GameObject.findGameObjectById(`0F93BEA6`)
        info_3.effObj_2 = GameObject.findGameObjectById(`12D27003`)
        this.qualityEff.push(info_3);

        this.initFinish = true
    }

    static play(quality: PropQualityType, finishCallback: () => void) {
        if (!this.initFinish) this.init()

        // UIService.show(EmptyMask)
        this.curQualityType = quality;
        this.curQualityType = PropQualityType.Golden;
        // 关闭正在显示的UI
        UIService.setAllMiddleAndBottomPanelVisible(false)
        this.qualityEff.forEach(info => {
            info.effObj_1.setVisibility(false);
            info.effObj_2.setVisibility(false);
        })
        this.tempRot = Rotation.zero;
        this.tempRot2 = Rotation.zero;
        this.normalBox.setVisibility(false)
        // 盒子初始化
        this.currentBox = this.normalBox;
        this.currentBox_Up = this.normalBox_Up;
        this.currentBox_Down = this.normalBox_Down;

        this.currentBox_Up.localTransform.rotation = this.normalBox_Up_BornRotation;

        this.currentBox.setVisibility(true)
        // this.currentBoxPosition = this.boxStartAnchor.worldTransform.position
        this.currentBox.worldTransform.scale = this.normalBoxBornScale;
        this.tempRot3 = Vector.subtract(this.endLookAnchor.worldTransform.position, this.cameraAnchor2.worldTransform.position).toRotation();
        // 相机初始化
        this.cameraPosition = this.cameraAnchor1.worldTransform.position;
        // this.cameraLookTo(this.currentBoxPosition);
        this.cameraLookTo(this.currentBox.worldTransform.position);
        Camera.switch(this.camera);
        this.tween2.start();
        this.finishCallback = finishCallback
    }

    // 需要手动调用
    static exit() {
        Camera.switch(this.mainCamera);
        UIService.setAllMiddleAndBottomPanelVisible(true)
        // UIService.hide(EmptyMask)
    }
}
