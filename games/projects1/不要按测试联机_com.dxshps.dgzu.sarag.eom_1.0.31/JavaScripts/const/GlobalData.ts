/** 
 * @Author       : Songyang.Xie
 * @Date         : 2024-01-18 10:34:45
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-19 21:40:08
 * @FilePath     : \petparty\JavaScripts\const\GlobalData.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../config/GameConfig";
import { EGamingFsmType, EGlobalFsmType } from "./Enum";

export class GlobalData {
    /**是否显示GM */
    public static isShowGM: boolean = false;
    /**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
    public static selectedLanguageIndex: number = -1;
    /**是否使用平台角色 */
    public static isUseAvatar: boolean = true;
    /**平台角色类型 */
    public static avatarSomatotype: mw.SomatotypeV2 = mw.SomatotypeV2.AnimeFemale;
    /**玩家是否无敌 */
    public static isInvincible: boolean = false;

    /**是否海外发布 */
    public static isOverSea: boolean = false;

    /**房间版本信息 */
    public static infoStr: string = "";

    /**odin初始化完毕 */
    public static odinInitDone: boolean = false;

    /**总控流程初始化完毕 */
    public static globalCtrlInitDone: boolean = false;

    /**GM设置的关卡id */
    public static gmMapID: number = -1;
    /**GM设置的关卡guid */
    public static gmPrefabGuid: string = "";

    /**完成几轮关卡-服务器 */
    public static levelEndCount_S: number = 0;
    /**完成几轮关卡-客户端 */
    public static levelEndCount_C: number = 0;

    //-----------------------------玩家------------------------------------
    /**avatar统一身高 */
    public static avatarHeight: number = 1;
    /**自动移动 */
    public static autoCtrl: boolean = false;

    /**-----------------------------------角色-------------------------------------- */
    /**玩家获取坐标频率 秒*/
    public static getPlayerLocInterval: number = 0.1 * 1000;

    /** ----------------------- 游戏跳转 ----------------------- */
    /**大厅GameID */
    public static HallRoom_GameId: string = "974460"

    /**玩家退出游戏事件 */
    public static playerQuitGameAc: Action = new Action();

    /**-----------------------------------关卡-------------------------------------- */
    /**固定死亡触发器根节点 */
    public static deadTriggerParentName: string = "DeathTriggers";
    /**AI寻路点父物体 */
    public static aiPathParentName: string = "aiPath";
    /**客户端存储游戏状态 */
    public static gameingState_C: EGamingFsmType = EGamingFsmType.None;

    /**客户端存储全局状态 */
    public static globalState_C: EGlobalFsmType = EGlobalFsmType.None;


    /**----------------------------------点赞--------------------------------------- */
    /**玩家点赞的对象ID数组 */
    public static likeObjId: string[] = [];
    /**所有玩家点赞数--- 服务端 */
    public static allPlayerLikeCounts: Map<number, number> = new Map();
    /**当前玩家的点赞数 --- 客户端 */
    public static curPlayerLikeCount: number = 0;

    /**----------------------------------第一轮淘汰--------------------------------------- */
    /**到展台后等待时间 */
    public static calculateWaitTime: number = 0.1;
    /**结算UI动画时间 */
    public static calculateChangeUITimer = GameConfig.RuleGame.getElement(10042).float_Value;
    /**胜利 特效表ID */
    public static winEffectID: number = 20002;
    /**胜利人数UI动画时间 */
    public static playerCountChangeTime: number = 1.5;

    /**淘汰 特效表ID */
    public static loseEffectID: number = 20001;
    /**淘汰 第一次上升时间 */
    public static loseUpTime: number = 1.5;
    /**淘汰 第一次上升高度 */
    public static loseUpHeight: number = 500;

    /**淘汰 第一次下降时间 */
    public static loseDownTime: number = 0.3;
    /**淘汰 第一次下降高度 */
    public static loseDownHeight: number = 200;

    /**淘汰 第二次上升时间 */
    public static loseUpTime2: number = 1;
    /**淘汰 第二次上升高度 */
    public static loseUpHeight2: number = 2000;
}