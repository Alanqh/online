/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-03 09:40:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-11-09 10:55:01
 * @FilePath     : \petparty\JavaScripts\modules\hudModule\HUDModuleC.ts
 * @Description  : 修改描述
 */

import { EGamingFsmType, EGlobalFsmType, EPlayerStateType } from "../../const/Enum";
import { GameEventC2C, GlobalCtrlEventC2C, LevelEventC2C } from "../../const/GameCommonEvent";
import { GlobalData } from "../../const/GlobalData";
import { CameraUtil } from "../../utils/CameraUtil";
import GameComUtils from "../../utils/GameComUtils";
import Tips from "../../utils/P_Tips";
import HUDModuleS from "./HUDModuleS";
import P_Main from "./P_Main";
import P_BaseControl from "./ui/P_BaseControl";

/**
 * 主页面
 */
export default class HUDModuleC extends ModuleC<HUDModuleS, null> {

    private mHUD: P_Main = null;
    private baseControl: P_BaseControl;


    protected onStart() {
        this.baseControl = UIService.show(P_BaseControl);

        this.mHUD = mw.UIService.show(P_Main);

        Event.addLocalListener(GlobalCtrlEventC2C.CTRL_STATE_CHANGE_C2C, this.globalStateChange);
        Event.addLocalListener(GlobalCtrlEventC2C.CTRL_PLAYER_ENTER_C2C, this.setWaitNum);

        Event.addLocalListener(LevelEventC2C.LEVEL_TIMECHANGE_C2C, this.onTimerChange)
        Event.addLocalListener(LevelEventC2C.LEVEL_WINERCHANGE_C2C, this.winNumChange)

        Event.addLocalListener(GameEventC2C.GAME_PLAYER_WIN_C2C, this.selfWin)

        Event.addLocalListener(GlobalCtrlEventC2C.CTRL_CHANGE_WAIT_TIME_C2C, this.waitTimerChange);

        // 创建UI后主动查询
        GameComUtils.waitForGlobalCtrlInitDone().then(() => {
            Event.dispatchToLocal(GlobalCtrlEventC2C.MODULE_GET_STATE_C2C);
        })

        this.mHUD.mBtn_Like.onClicked.add(() => {
            let curWatchInfo = CameraUtil.CurWatchObjInfo;
            if (!curWatchInfo) return;
            if (GlobalData.likeObjId.includes(curWatchInfo.gameObjId)) {
                Tips.show("点过了这个玩家了")
                return
            }
            GlobalData.likeObjId.push(curWatchInfo.gameObjId);
            let allPlayers = Player.getAllPlayers();
            let watchPlayer = allPlayers.find(p => { return p.character.gameObjectId == curWatchInfo.gameObjId })
            //现在看的不是玩家
            if (!watchPlayer) return
            this.server.net_PlayerAddLikeCount(watchPlayer.playerId);
        })
    }

    // 全局状态变更 只有等人和游戏中俩状态
    private globalStateChange = (state: EGlobalFsmType) => {
        this.mHUD.globalStateChange(state);
    }
    // 显示当前人数
    public setWaitNum = (curNum: number) => {
        this.mHUD.setWaitNum(curNum);
    }

    // 游戏状态变更
    public gamingStateChange(state: EGamingFsmType, playerState: EPlayerStateType) {
        this.mHUD.gamingStateChange(state, playerState);
    }

    // 显示匹配成功
    public net_ShowAllPlayerReady() {
        this.mHUD.showAllPlayerReady();
    }

    // 倒计时
    private onTimerChange = (curtime: number) => {
        this.mHUD.timerChange(curtime)
    }

    // 添加胜利者
    private winNumChange = (nameList: number[], configId: number) => {
        this.mHUD.winNumChange(nameList, configId)
        if (!nameList || nameList.length == 0) return;
        if (nameList[nameList.length - 1] != this.localPlayerId) return;
        if (nameList.length == 1) {
            GameComUtils.play2DSoundByCfg(30003);//第一名获胜音效
        } else {
            GameComUtils.play2DSoundByCfg(30004);//其他名次获胜音效
        }
    }

    // 开始结算
    public startCalculate(winNum: number, maxNum: number) {
        this.mHUD.startCalculate(winNum, maxNum);
    }

    // 显示失败
    public gameOver() {
        this.mHUD.gameOver();
    }
    //玩家被点赞
    net_setPlayerLikeCount() {
        GlobalData.curPlayerLikeCount++;
    }

    // 自己获胜
    public selfWin = () => {
        this.mHUD.selfWin();
        if (GlobalData.levelEndCount_C == 0) {
            this.mHUD.changeWatchEnterState(true);
        }
    }
    //控制基础界面
    public isShowBaseControl(isShow: boolean, pState?: EPlayerStateType) {
        if (isShow && !this.baseControl.visible) {
            UIService.showUI(this.baseControl);
            if (pState == EPlayerStateType.Lose) {
                this.baseControl.isHideJoyStick();
            }
        }
        else if (!isShow && this.baseControl.visible) {
            UIService.hideUI(this.baseControl);
        }
    }
    //设置观战界面显隐
    public setWatchUIVisible(isShow: boolean) {
        this.mHUD.changeWatchEnterState(isShow);
    }

    public firstLose() {
        this.mHUD.firstLose();
    }

    // 修改等待时间
    private waitTimerChange = (timer: number) => {
        this.mHUD.setMatchWaitTime(timer)
    }
}