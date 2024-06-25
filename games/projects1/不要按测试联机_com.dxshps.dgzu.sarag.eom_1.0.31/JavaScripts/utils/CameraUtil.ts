import { EWatchType } from "../const/Enum";
import P_Main from "../modules/hudModule/P_Main";

export class CameraUtil {

    private static old_Camera: Camera;
    private static old_CameraTransform: Transform;
    private static old_CameraArmLength: number;
    private static mainUI: P_Main;
    private static _newCamera: Camera;
    // private static isUseNewCamera: boolean = false;

    public static allWatchObj: cameraInfo[] = [];

    private static curWatchObj: cameraInfo;
    private static curWatchType: EWatchType = EWatchType.EndWatch;
    public static get CurWatchObjInfo() {
        return this.curWatchObj;
    }

    public static get AllWatchObjLength() {
        return this.allWatchObj.length;
    }
    /**
     * 创建新相机
     * @param mainUI 观战功能相关UI 
     */
    public static async initCamera(mainUI: P_Main) {
        this.mainUI = mainUI;
        this._newCamera = await GameObject.asyncSpawn("Camera") as Camera;
        this.old_Camera = Camera.currentCamera;
        this.old_CameraTransform = this.old_Camera.springArm.localTransform.clone();
        this.old_CameraArmLength = this.old_Camera.springArm.length;
    }
    /**
     * 增加可观战目标
     * @param gameObjId 目标的GameObjectId
     * @param name 目标的名字
     * @returns 
     */
    public static addWatchObj(gameObjId: string, name: string) {
        let res = this.allWatchObj.find((value, index) => { return value.gameObjId == gameObjId; });
        if (res) return
        let info = new cameraInfo(gameObjId, name);
        this.allWatchObj.push(info);
    }
    /**
     * 移除可观战目标
     * @param info 目标GameObjectId
     * @returns 
     */
    public static removeWatchObj(info: string) {
        if (StringUtil.isEmpty(info)) return;

        let c = this.allWatchObj.find((value, index) => { return value.gameObjId == info; });
        let index = this.allWatchObj.indexOf(c)
        if (index == -1) return;
        this.allWatchObj.splice(index, 1);
        if (this.curWatchObj == null) return;
        if (this.curWatchObj.gameObjId != c.gameObjId) {
            if (CameraUtil.AllWatchObjLength > 0) return;
            this.mainUI.changeWatch(false);
            this.mainUI.changeWatchEnterState(false)
            if (this.myTraget != null) {
                this.myTraget.detachFromSlot(this._newCamera);
                this.myTraget = null;
            }
            return
        }
        this.changeWatch(EWatchType.ChangeOther);
    }
    protected static myTraget: Character = null;// 缓存当前
    /**
     * 修改可观战目标
     * @param type 观战类型
     * @returns 
     */
    public static changeWatch(type: EWatchType) {
        this.curWatchObj = this.getWatchInfo(type);
        if (this.curWatchObj == null) {
            Camera.switch(this.old_Camera);
            this.old_Camera.springArm.useControllerRotation = true;
            this.old_Camera.rotationMode = CameraRotationMode.RotationControl;
            if (CameraUtil.AllWatchObjLength > 0) return;
            this.mainUI.changeWatch(false);
            this.mainUI.changeWatchEnterState(false)
            return;
        }
        GameObject.asyncFindGameObjectById(this.curWatchObj.gameObjId).then(async (target) => {
            if (this.myTraget != null) {
                this.myTraget.detachFromSlot(this._newCamera);
            }
            if (!target || !(target instanceof Character)) return
            this.myTraget = target as Character;
            Camera.switch(this._newCamera);
            this.myTraget.attachToSlot(this._newCamera, NonHumanoidSlotType.Root);
            this._newCamera.springArm.useControllerRotation = true;
            this._newCamera.springArm.localTransform = this.old_CameraTransform.clone();
            this._newCamera.springArm.length = this.old_CameraArmLength;

            this.mainUI.mText_PlayerName.text = this.curWatchObj.name;
        })
    }
    /**
     * 获取可观战目标
     * @param type 观战类型
     * @returns 当前被观战者的信息
     */
    private static getWatchInfo(type: EWatchType): cameraInfo {

        //TODO:当观战类型不为结束观战时，判断是否可以观战：当前游戏状态不为游戏中状态/当前完成玩家数量已经达标/没有未完成的玩家或AI
        //TODO:不可以观战的情况下，直接切成结束观战类型 
        let index: number = 0;
        let char = Player.localPlayer.character;
        switch (type) {
            case EWatchType.StartWatch:
                char.movementEnabled = false;
                char.jumpEnabled = false;
                if (this.allWatchObj.length <= 0) {
                    return this.getWatchInfo(EWatchType.EndWatch);
                }
                return this.allWatchObj[0];

            case EWatchType.Previous:
                if (!this.curWatchObj) return this.getWatchInfo(EWatchType.EndWatch);
                index = this.allWatchObj.indexOf(this.curWatchObj);
                index--;
                if (index < 0) {
                    index = this.allWatchObj.length - 1;
                }
                return this.allWatchObj[index];

            case EWatchType.Next:
                if (!this.curWatchObj) return this.getWatchInfo(EWatchType.EndWatch);
                index = this.allWatchObj.indexOf(this.curWatchObj);
                index++;
                if (index >= this.allWatchObj.length) {
                    index = 0;
                }
                return this.allWatchObj[index];

            case EWatchType.ChangeOther://当前观战玩家完成了，换一个其他的
                this.curWatchObj = null;
                return this.getWatchInfo(EWatchType.StartWatch);
            case EWatchType.EndWatch:
                //观战结束，看自己
                char.movementEnabled = true;
                char.jumpEnabled = true;
                this.curWatchObj = null;
                if (this.myTraget != null) {
                    this.myTraget.detachFromSlot(this._newCamera);
                    this.myTraget = null;
                }
                return null;

            default:
                break;
        }

    }
}

export class cameraInfo {
    constructor(
        public gameObjId: string,
        public name: string,
    ) { }
}