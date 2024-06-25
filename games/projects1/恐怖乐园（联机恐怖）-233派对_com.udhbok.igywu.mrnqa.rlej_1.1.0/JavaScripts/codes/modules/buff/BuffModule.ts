/*
 * @Author       : dal
 * @Date         : 2024-03-06 17:21:48
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-02 09:46:55
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\buff\BuffModule.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { WaitLoop } from "../../utils/AsyncTool";
import { PlayerAttr } from "../player/PlayerAttr";
import { EBuffType } from "./BuffDefine";
import { BuffScript } from "./BuffScript";

export class BuffModuleC extends ModuleC<BuffModuleS, null> {

    private myBuff: BuffScript

    public async myBuffReady() {
        return WaitLoop.loop(() => { return this.myBuff });
    }

    public static get buffList() {
        return ModuleService.getModule(this).myBuff.buffList;
    }

    public static get attr() {
        return ModuleService.getModule(this).myBuff.playerAttr;
    }

    public registerState(script: BuffScript) {
        this.myBuff = script;
    }

    public get script() {
        return this.myBuff;
    }

    /**
     * 请求添加buff ( 所有游戏公用的buff )
     * @param buffId 配置id
     * @param addCount 添加数量
     */
    public reqAddBuff(buffId: number, addCount: number = 1) {
        if (!GameConfig.Buff.getElement(buffId)) { return; }
        this.server.net_reqAddBuff(this.localPlayer.userId, buffId, addCount);
    }

    /**
     * 添加存档buff
     * @param buffId 
     */
    public reqAddArchiveBuffs(buffIds: number[]) {
        for (const buffId of buffIds) {
            if (!GameConfig.Buff.getElement(buffId)) { return; }
        }
        if (!this.script) { return; }
        this.script.addArchiveBuff(buffIds);
    }

    /**
     * 添加存档buff
     * @param buffId 
     */
    public reqDeleteArchiveBuffs(buffIds: number[]) {
        for (const buffId of buffIds) {
            if (!GameConfig.Buff.getElement(buffId)) { return; }
            if (!this.script) { return; }
            this.script.removeArchiveBuff(buffId);
        }
    }

    /**
     * 检查是否中毒了
     * @returns 有毒返回true，否则返回undefined
     */
    public checkPoisonExist() {
        return this.myBuff.checkArchiveBuffExistByType(EBuffType.Poison);
    }

    public checkCanPoison() {
        return this.myBuff.checkArchiveBuffExistByType(EBuffType.Poison) == undefined && this.myBuff.checkArchiveBuffExistByType(EBuffType.NoPoison) == undefined;
    }

    /**
     * 添加带有存档性质的buff
     */
    public addArchiveBuff(buffType: EBuffType) {
        switch (buffType) {
            case EBuffType.Poison:
                // 如果不能中毒就不能中毒
                if (!this.checkCanPoison()) { return; }
                // 中毒还会有一个持续扣血的buff
                this.reqAddArchiveBuffs([5]);
                break;
            case EBuffType.NoPoison:
                this.reqAddArchiveBuffs([6]);
                // 毒免buff之后会解掉中毒buff
                this.script.removeArchiveBuff(5);
                break;
            default:
                console.error(`DEBUG MyType Error>>> 没有这个存档buff类型 EBuffType : ${buffType}`);
        }
    }

    /**
     * 清空身上的buff
     */
    public clearAllArchiveBuff() {
        if (!this.myBuff) { return; }
        this.myBuff.clearAllArchiveBuff();
    }

    /** 删除某一个buff */
    public deleteArchieBuff(buffType: EBuffType) {
        switch (buffType) {
            case EBuffType.Poison:
                if (!this.checkPoisonExist()) { return; }
                this.reqDeleteArchiveBuffs([5]);
                break;
            case EBuffType.NoPoison:
                this.reqDeleteArchiveBuffs([6]);
                break;
            default:
                console.error(`DEBUG MyType Error>>> 没有这个存档buff类型 EBuffType : ${buffType}`);
        }
    }

    /** 拿到某一个buff */
    public getBuff(buffType: EBuffType) {
        return this.myBuff.buffList.find(v => { return v.type === buffType });
    }

    /** 检查某一个buff是否存在 */
    public checkBuffExist(buffType: EBuffType) {
        return this.getBuff(buffType) != undefined;
    }

    /**
     * 检查某一个类型的buff 效果是否冲突
     * @param buffType 
     * @param newVal 新的效果值
     * @returns 冲突了返回 true, and false otherwise
     */
    public checkValConflict(buffType: EBuffType, newVal: number) {
        return this.checkBuffExist(buffType) && this.getBuff(buffType).value != newVal;
    }
}

export class BuffModuleS extends ModuleS<BuffModuleC, null> {

    public static getAttr(userId: string) {
        if (!Player.getPlayer(userId)) {
            console.error(`DEBUG>>> MyTypeError 获取buff属性失败，找不到玩家 userId = ${userId}, 给一个初始化属性`);
            return new PlayerAttr();
        }
        return ModuleService.getModule(this).getScript(Player.getPlayer(userId)).playerAttr;
    }

    /**
     * 检查是否中毒了
     * @returns 有毒返回true，否则返回undefined
     */
    public checkPoisonExist(player: Player) {
        return this.getScript(player).checkArchiveBuffExistByType(EBuffType.Poison);
    }

    /**
     * 检查一个全局buff是否存在
     * @param player 玩家
     * @param type 全局buff类型
     * @returns 
     */
    public checkBuffTypeExit(player: Player, type: EBuffType) {
        return this.getScript(player).checkBuffExistByType(type);
    }

    /**
     * 检查一个全局buff是否存在
     * @param player 玩家
     * @param type 全局buff类型
     * @returns 
     */
    public getBuffByType(player: Player, type: EBuffType) {
        return this.getScript(player).getBuffByType(type);
    }

    /**
     * 根据类型移除一个全局buff
     * @param player 玩家
     * @param type buff类型
     */
    public removeBuff(player: Player, type: EBuffType) {
        if (!player) {
            console.error(`DEBUG MyTypeError>>> 移除全局buff ${type} 失败，找不到玩家`);
            return;
        }
        this.getScript(player).removeBuff(type);
    }

    @Decorator.noReply()
    public net_reqAddBuff(userId: string, buffId: number, addCount: number) {
        let player = Player.getPlayer(userId);
        if (!player) {
            player = this.currentPlayer;
            if (!player) { return; }
        }
        const buffScript = this.getScript(player);
        buffScript.server_addBuff(buffId, addCount);
    }

    private scripMap: Map<string, BuffScript> = new Map();

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getScript(player).server_loadBuff();
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.scripMap.delete(player.userId);
    }

    public getScript(player: Player): BuffScript {
        if (!player) { console.error(`DEBUG MyTypError>>> 获取 BuffScript失败, 没有玩家`); return null; }
        const userId: string = player.userId;
        let script = this.scripMap.get(userId);
        if (!script) {
            script = player.getPlayerState(BuffScript);
            script.userId = userId;
        }
        return script;
    }
}