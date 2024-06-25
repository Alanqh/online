
import { SignDataHelper } from "./SignDataHelper";
import { SignModuleS } from "./SignModuleS";
import { MainUI } from "../../ui/MainUI";
import { GameConfig } from "../../../config/GameConfig";
import UISignIn from "./ui/UISignIn";
import GameStart, { EGameTheme } from "../../GameStart";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import UIIntegration from "../../ui/UIIntegration";

/**
 * 签到模块，提供本月签到的数据获取和更新接口，提供与本月天数，星期几等相关的接口
 */
export class SignModuleC extends ModuleC<SignModuleS, SignDataHelper> {

    /**
     * 模块初始化，功能为：模块内数据改变时发送七日签到设置主界面感叹号的事件，监听事件设置七日签到数据，添加七日签到物品修改补充逻辑
     */
    protected onStart(): void {

    }

    protected onEnterScene(sceneType: number): void {
        let mainUI = UIService.getUI(MainUI);
        //签到完成隐藏签到入口
        if (this.data.checkFinish()) {
            mainUI.canvas_checkIn.visibility = SlateVisibility.Collapsed
        }
        //监听领取状态变化
        this.data.onSingChangeAction.add((list1, list2) => {
            if (list1.length == GameConfig.CheckIn.getAllElement().length) {
                mainUI.canvas_checkIn.visibility = SlateVisibility.Collapsed
            }
            mainUI.img_checkInPoint.visibility = list2.length == 0 ? SlateVisibility.Collapsed : SlateVisibility.HitTestInvisible;
        })
        //初始化红点
        mainUI.img_checkInPoint.visibility = this.data.sign7thCanGetList.length == 0 ? SlateVisibility.Collapsed : SlateVisibility.HitTestInvisible;

        // if (GameStart.GameTheme != EGameTheme.Hall && GameStart.GameTheme != EGameTheme.Graveyard) {
        //     TimeUtil.delaySecond(2).then(() => { this.popSignUI() })
        // }
    }

    public async reqGetSignReward(dayIndex: number) {
        let result = await this.server.net_getSignReward(dayIndex)
        if (result) {
            GhostTraceHelper.uploadMGS("ts_game_over", "领取签到奖励", {
                round_id: 666,
                scene_id: dayIndex
            })
        }
        return result
    }

    public popSignUI() {
        //有可以领的就弹
        if (this.data.checkCanReceive()) UIService.show(UISignIn)
    }

}