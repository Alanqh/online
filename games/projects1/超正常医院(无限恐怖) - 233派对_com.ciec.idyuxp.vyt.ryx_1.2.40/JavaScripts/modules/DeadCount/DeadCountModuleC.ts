import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { Events_CS, GameMode, PlayerCurState } from "../../const/enum";
import UITools from "../../utils/UI/UITools";
import { utils } from "../../utils/uitls";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import { TaskEnum } from "../Guide/TaskEnum";
import TimeModuleC from "../Time/TimeModuleC";
import { DeadCountData } from "./DeadCountData";
import DeadCountModuleData from "./DeadCountModuleData";
import DeadCountModuleS from "./DeadCountModuleS";

export class DeadCountDataC {
    /**生存天数 */
    public aliveDays: number = 0;
    /**拯救玩家数 */
    public rescuePlayerCount: number = 0;

    constructor(data: DeadCountData) {
        this.aliveDays = data.aliveDays;
        this.rescuePlayerCount = data.rescuePlayerCount;
    }
}

export default class DeadCountModuleC extends ModuleC<DeadCountModuleS, DeadCountModuleData> {

    /**死亡统计数据 */
    public deadCountData: DeadCountData = null;
    /**ui */
    // private ui: P_DeadCount = null;
    public isGameover: boolean = false;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // this.ui = UIService.getUI(P_DeadCount);
        this.deadCountData = new DeadCountData();
        console.log("lmn log: 初始化死亡计数模块");
    }

    protected onEnterScene(sceneType: number): void {
        this.addListener();
    }

    /**结算玩家死亡数据 */
    private async settleDeadCountData() {
        // 将数据设置到UI
        // this.ui.setData(this.deadCountData, true);
        // 上传到服务端
        let deadCountData = new DeadCountDataC(this.deadCountData);
        this.server.net_setData(deadCountData);
    }

    /**添加监听 */
    private addListener() {
        // 生存天数
        ModuleService.getModule(TimeModuleC).onDayOver.add(() => {
            // 玩家活着则生存天数++
            if (GlobalData.curPlayerData.PlayerState == PlayerCurState.Alive) {
                if (this.isGameover) {
                    this.isGameover = false;
                    return;
                }
                this.deadCountData.aliveDays++;
                // 埋点 存活天数变为1时触发
                let curMode = ModuleService.getModule(TimeModuleC).mode
                ModuleService.getModule(AnalyticsModuleC).coreEnd(curMode);
                //console.log("玩家生存天数+1:" + this.deadCountData.aliveDays);
                // UITools.ShowSoftTips(utils.getLanguageByKey("Tips_03", [this.deadCountData.rescuePlayerCount]));
            }

            if (GlobalData.curPlayerData.PlayerState == PlayerCurState.Weak) {
                // UITools.ShowSoftTips(utils.getLanguageByKey("Tips_04", [this.deadCountData.rescuePlayerCount]));
            }
        })
        // 拯救玩家数
        Event.addServerListener(Events_CS.PlayerRescue, () => {
            this.deadCountData.rescuePlayerCount++;
            ModuleService.getModule(AnalyticsModuleC).playerRescue();
        })
        // // 玩家死亡 或 重生
        // ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerId: number) => {
        //     if (playerId != this.localPlayerId) return;
        //     // //console.error("玩家状态改变", state);
        //     // 重生
        //     if (state == PlayerCurState.Alive) {
        //         // 重置玩家统计数据
        //         this.deadCountData.resetData();
        //         // 重置服务端统计数据
        //         this.server.net_resetPlayerData();
        //     }
        //     // 死亡
        //     else if (state == PlayerCurState.Weak) {
        //         // 结算死亡数据
        //         this.settleDeadCountData();
        //         // 显示UI
        // this.ui.showUIEffect();
        //         //console.log("玩家存活时间为：" + this.deadCountData.aliveDays + "天")
        //     }
        // })
    }
}