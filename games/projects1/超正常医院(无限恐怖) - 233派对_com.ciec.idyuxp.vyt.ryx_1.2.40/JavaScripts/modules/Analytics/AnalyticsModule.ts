import { MapEx } from "odin";
import { CoreGameplay, EnumAnalytics, FirstDo, GameMode, GuideAnalytics, ShopFirstDo } from "../../const/enum";
import { utils } from "../../utils/uitls";
import { AnalyticsData } from "./AnalyticsData";
import { GlobalAnalytics } from "./GlobalAnalytics";
import { AnalyticsTool } from "./AnalyticsTool";
import GuideModuleC from "../Guide/GuideModuleC";

export class AnalyticsModuleC extends ModuleC<AnalyticsModuleS, AnalyticsData> {

    /**核心循环 */
    private coreStep: Map<CoreGameplay, boolean> = new Map();
    /**新手引导 */
    private guidStep: Map<GuideAnalytics, boolean> = new Map();
    private isEnd = false;
    /**核心循环开始 */
    public coreStart() {
        AnalyticsTool.ts_coregameplay_start();
    }
    /**核心循环结束 */
    public coreEnd(mode: GameMode) {
        if (this.isEnd) return;
        this.isEnd = true;
        AnalyticsTool.ts_coregameplay_end(mode);
    }

    /**完成核心循环步骤 */
    public finishCoreStrp(step: CoreGameplay) {
        if (this.coreStep.get(step)) return;
        this.coreStep.set(step, true);
        AnalyticsTool.ts_coregameplay_step(step);
    }

    /**新手引导开始 */
    public guideStart() {
        AnalyticsTool.ts_tutorial_start();
    }

    /**新手引导结束 */
    public guideEnd() {
        AnalyticsTool.ts_tutorial_end();
    }

    /**完成新手引导步骤 */
    public finishGuideStep(guidStep: GuideAnalytics) {
        let isFinsh = ModuleService.getModule(GuideModuleC).isFinishGuide;
        if (isFinsh) return;
        if (this.guidStep.get(guidStep)) return;
        this.guidStep.set(guidStep, true);
        AnalyticsTool.ts_tutorial_step(guidStep);
    }

    /**玩家死亡 */
    public playerDead() {
        this.server.net_playerDead();
    }


    /**玩家解救 */
    public playerRescue() {
        this.server.net_playerRescue();
    }

    /**玩家攻击 */
    public playerAttack() {
        this.server.net_playerAttack();
    }

    /**玩家拾取道具 */
    public pickItem(key: number) {
        let isHas = MapEx.get(this.data.pickItemMap, key);
        console.warn(`lwj 玩家拾取道具 id:${key} isHas:${isHas}`);
        if (isHas) return;

        this.server.net_pickItem(key);
    }


    /**第一次做 */
    public firstdo(any: FirstDo) {
        let isDo = MapEx.get(this.data.firstDo, any);
        if (isDo) return;
        this.server.net_firstdo(any);
    }

    /**每天一次 */
    public shopFirstDo(any: ShopFirstDo) {
        let isDo = MapEx.get(this.data.shopFirstDo, any);
        if (isDo) return;
        this.server.net_shopFirstDo(any);
    }

    /**商业化全服每天一次 */
    public shopFirstDoGlobal(any: EnumAnalytics) {
        let isDo = MapEx.get(this.data.shopFirstDo, any);
        if (isDo) return;
        this.server.net_shopFirstDoGlobal(any);
    }

    /**充值成功并返回游戏 */
    public recharge_return_hit() {
        this.server.net_recharge_return_hit();
    }
    /**三期埋点每天一次(加一) */
    public threePhase(any: EnumAnalytics | string) {
        let isDo = MapEx.get(this.data.shopFirstDo, any);
        if (isDo) return;
        this.server.net_threePhase(any);
    }
}


export class AnalyticsModuleS extends ModuleS<AnalyticsModuleC, AnalyticsData> {

    protected onStart(): void {
        // GlobalAnalytics.instance.init();
    }

    protected onPlayerEnterGame(player: mw.Player): void {

        let curDay = utils.getTodayNumber();

        let data = this.getPlayerData(player.playerId);
        if (curDay > data.lastLoginDate) {
            data.reset();
        }
        data.lastLoginDate = curDay;
        data.save(false);
    }

    public resetData(playerId: number) {
        let data = this.getPlayerData(playerId);
        data.reset();
        data.save(false);
    }


    /**玩家拾取道具 */
    net_pickItem(key: number) {
        MapEx.set(this.currentData.pickItemMap, key, true);
        this.currentData.save(true);
        GlobalAnalytics.instance.setGlobalIdData(key.toString(), this.currentPlayer);
    }

    /**玩家死亡 */
    net_playerDead() {
        this.currentData.deadCount++;
        this.currentData.save(false);
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.PlayerDead, this.currentPlayer);
    }

    /**玩家解救 */
    net_playerRescue() {
        this.currentData.saveCount++;
        this.currentData.save(false);
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.PlayerRescue, this.currentPlayer);
    }

    /**玩家攻击 */
    net_playerAttack() {
        this.currentData.attackCount++;
        this.currentData.save(false);
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.PlayerAttack, this.currentPlayer);
    }

    /**解救 */
    public AttNPC(playerId: number) {
        let data = this.getPlayerData(playerId);
        data.attackCount++;
        data.save(false);
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.PlayerAttack, Player.getPlayer(playerId));
    }


    cabinet(playerId: number) {
        let data = this.getPlayerData(playerId);
        if (data.cabinetCount) return;
        data.cabinetCount = true;
        data.save(true);
        GlobalAnalytics.instance.setGlobalIdData("1000", Player.getPlayer(playerId));
    }

    /**合体触发器 */
    public enterCombineTrigger(playerId: number) {
        let data = this.getPlayerData(playerId);
        if (data.combineCount) return;
        data.combineCount = true;
        data.save(true);
        GlobalAnalytics.instance.setGlobalIdData("999", Player.getPlayer(playerId));
    }


    public net_firstdo(any: FirstDo) {
        this.firstdo(this.currentPlayerId, any);
    }

    public firstdo(playerId: number, any: FirstDo) {
        let data = this.getPlayerData(playerId);
        let isDo = MapEx.get(data.firstDo, any);
        if (isDo) return;
        MapEx.set(data.firstDo, any, true);
        data.save(true);

        AnalyticsTool.ts_action_firstdo(any, 0, Player.getPlayer(playerId));
    }


    net_shopFirstDo(any: ShopFirstDo) {
        this.shopFirstDo(this.currentPlayerId, any);
    }

    net_shopFirstDoGlobal(any: EnumAnalytics) {
        this.shopFirstDoGlobal(this.currentPlayerId, any);
    }

    public shopFirstDo(playerId: number, any: ShopFirstDo) {
        let data = this.getPlayerData(playerId);
        let isDo = MapEx.get(data.shopFirstDo, any);
        if (isDo) return;
        MapEx.set(data.shopFirstDo, any, true);
        data.save(true);

        AnalyticsTool.ts_action_firstdo(any, 0, Player.getPlayer(playerId));
    }

    /**商业化全服每天一次 */
    public shopFirstDoGlobal(playerId: number, any: EnumAnalytics) {
        let data = this.getPlayerData(playerId);
        let isDo = MapEx.get(data.shopFirstDo, any);
        if (isDo) return;
        MapEx.set(data.shopFirstDo, any, true);
        data.save(true);

        GlobalAnalytics.instance.setGlobalEnumData(any, Player.getPlayer(playerId));
    }

    /**充值成功并返回游戏 */
    net_recharge_return_hit() {
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.recharge_return_hit, this.currentPlayer);
    }
    net_threePhase(any: EnumAnalytics | string) {
        this.threePhase(this.currentPlayerId, any);
    }

    /**三期埋点每天一次 */
    public threePhase(playerId: number, any: EnumAnalytics | string) {
        let data = this.getPlayerData(playerId);
        let isDo = MapEx.get(data.shopFirstDo, any);
        if (isDo) return;
        MapEx.set(data.shopFirstDo, any, true);
        data.save(true);

        GlobalAnalytics.instance.setGlobalThreeData(any, Player.getPlayer(playerId));
    }
}

