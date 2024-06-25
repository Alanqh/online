import { GlobalDefine } from "../DefNoSubModule";
import { ObjInterModuleC } from "./modules/inter/ObjInterModuleC";
import { MainUI } from "./ui/MainUI";

export class CeHuaDefines {
    public static GhostPatrolCfgs: GhostPatrolConfig[] = [
        {
            GhostPatrol: "132892",
            GhostPatrolStartScale: new Vector(0.000000, 0.000000, 0.000000),
            GhostPatrolScale: new Vector(30.000000, 35.000000, 35.000000),
            GhostPatrolScaleTime: 5,
            GhostPatrolKeepTime: 25,
            GhostPatrolRotation: new Rotation(-90, 0.000000, 90),
            GhostPatrolPosition: new Vector(47, -4110, 3146.680176)
        }
    ];
    /** 开始传送僵尸的时间 */
    public static GhostPatrolStartTime: number = 8;
    /** 消失特效 */
    public static GhostDisEffect: string = "DB3D6D764FE30988EA320BB3AC0F8864";
    /** 弹幕的移动速度 */
    public static DanmakuUISpd: number = 400;
}

export class GhostPatrolConfig {
    /** 传送门的guid */
    public GhostPatrol
    /** 传送门开始的缩放 */
    public GhostPatrolStartScale
    /** 传送门结束的缩放 */
    public GhostPatrolScale
    /** 传送门的缩放时间 */
    public GhostPatrolScaleTime
    /** 传送门的持续事件 */
    public GhostPatrolKeepTime
    /** 传送门的旋转 */
    public GhostPatrolRotation
    /** 传送门的开始点  */
    public GhostPatrolPosition
}

export class GameDefines {
    public static set isThirdPerson(val: boolean) {
        this._isThirdPerson = val;
        if (val) {
            UIService.getUI(MainUI).setHandVisible(false)
            ModuleService.getModule(ObjInterModuleC).resetSelectItem();
        }
    };

    public static get isThirdPerson(): boolean {
        return this._isThirdPerson;
    }

    private static _isThirdPerson: boolean = GlobalDefine.isThirdPerson;

}

