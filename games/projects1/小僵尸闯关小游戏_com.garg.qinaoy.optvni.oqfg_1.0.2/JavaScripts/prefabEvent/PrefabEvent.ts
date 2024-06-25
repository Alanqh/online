

import { PrefabEventModuleC, PrefabEventModuleData, PrefabEventModuleS } from "./PrefabEventModule";

export namespace PrefabEvent {

    /**
     * 网络事件key
     */
    export var _onEventNetKey = "PrefabEventExNeyKey";
    /**
     * 本地事件key
     */
    export var _onEventKey = "PrefabEventExKey";

    function callRemoteFunc(clazzName, funcName, ...params) {
        if (!PrefabEvent[clazzName] || !PrefabEvent[clazzName][funcName]) {
            console.error("无效协议 " + clazzName + " : " + funcName)
            return;
        }
        callFunc(clazzName, funcName, ...params);
    }

    function addEventListeners() {
        if (mw.SystemUtil.isServer()) {
            Event.addClientListener(_onEventNetKey, (player, clazzName, funcName, ...params) => {
                callRemoteFunc(clazzName, funcName, ...params);
            });
        }
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(_onEventNetKey, (clazzName: string, funcName: string, ...params) => {
                callLocalFunc(clazzName, funcName, ...params);
            });
        }
    }

    function initEvent() {
        addEventListeners();
    }

    /**
     * 回调客户端事件
     * @param clazzName 
     * @param funcName 
     * @param params 
     */
    function callLocalFunc(clazzName: string, funcName: string, ...params: any[]) {
        Event.dispatchToLocal(_onEventKey + ":" + clazzName + ":" + funcName, ...params);

    }

    /**
     * 回调事件
     * @param clazzName 
     * @param funcName 
     * @param params 
     */
    function callFunc(clazzName: string, funcName: string, ...params: any[]) {

        if (mw.SystemUtil.isClient()) {
            /** 透传到服务端去 执行 */
            Event.dispatchToServer(_onEventNetKey, clazzName, funcName, ...params);
        }
        if (mw.SystemUtil.isServer()) {

            /** 调用函数 得到结果 在广播出去 */
            if (ModuleService.getModule(PrefabEventModuleS)[funcName]) {
                ModuleService.getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
            } else {
                ModuleService.getModule(PrefabEventModuleS).notify(clazzName, funcName, ...params);
            }
        }

    }

    /**
     * 回调事件
     * @param clazzName 
     * @param funcName 
     * @param params 
     */
    function callFuncRes(clazzName: string, funcName: string, ...params: any[]): any {


        if (mw.SystemUtil.isClient()) {
            /** 透传到服务端去 执行 */

            if (!ModuleService.getModule(PrefabEventModuleC)[funcName]) {
                console.error("find error PrefabEventModuleC: " + funcName);
                return null;
            }

            return ModuleService.getModule(PrefabEventModuleC)[funcName](clazzName, ...params);
        }
        if (mw.SystemUtil.isServer()) {

            if (!ModuleService.getModule(PrefabEventModuleS)[funcName]) {
                console.error("find error PrefabEventModuleS: " + funcName);
                return null;
            }

            /** 调用函数 得到结果 在广播出去 */
            return ModuleService.getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
        }

    }

    /**
     * 监听事件
     * @param clazzName 
     * @param funcName 
     * @param callback 
     */
    function onFunc(clazzName: string, funcName: string, callback: any): mw.EventListener {
        // console.log("register : " + _onEventKey + ":" + clazzName + ":" + funcName);
        return Event.addLocalListener(_onEventKey + ":" + clazzName + ":" + funcName, callback);
    }

    /**
    * 属性类型
    */
    export enum AttrType {

        /** 最大血量  */
        MaxHp,
        /** 当前Hp */
        CurHp,
        /** 最大蓝量 */
        MaxMp,
        /** 攻击力 */
        Attack,
        /** 魔法力 */
        Magic,
        /** 防御力 */
        Def,
        /** 魔法防御力 */
        MDef,
        /** 速度 */
        Speed,
        /** 跳跃力 */
        Jump,
        /** 攻击速度 */
        AttackSpeed,
        /** 攻击距离 */
        AttackDistance,
        /** 是否是无敌 */
        IsInvincible

    }

    /**
     * 属性协议
     */
    export class PrefabEvtAttr {

        /**
         * (双端)添加属性
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param attrType 属性类型
         */
        public static setAttrVal(senderGuid: string, targetGuid: string, val: number, attrType: AttrType) {
            callFunc(this.name, this.onSetAttrVal.name, senderGuid, targetGuid, val, attrType);
        }

        /**
         * (双端)监听属性改变
         * @param callback 回调
         * @returns 
         */
        public static onSetAttrVal(callback: (senderGuid: string, targetGuid: string, val: number, attrType: AttrType) => void) {
            return this.onChangeAttrVal(callback);
        }

        /**
         * (双端)添加属性
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param attrType 属性类型
         */
        public static addAttrVal(senderGuid: string, targetGuid: string, val: number, attrType: AttrType) {
            callFunc(this.name, this.onAddAttrVal.name, senderGuid, targetGuid, val, attrType);
        }

        public static onAddAttrVal(callback: (senderGuid: string, targetGuid: string, val: number, attrType: AttrType) => void) {
            return this.onChangeAttrVal(callback);
        }

        /**
         * (双端)获取属性
         * @param targetGuid 
         * @param val 
         * @param attrType 
         */
        public static getAttrVal(targetGuid: string, attrType: AttrType): number {
            let res = callFuncRes(this.name, this.getAttrVal.name, targetGuid, attrType);
            return res;
        }

        /**
         * (双端)监听属性改变
         * @param callback 回调
         * @returns 
         */
        public static onChangeAttrVal(callback: (senderGuid: string, targetGuid: string, val: number, attrType: AttrType) => void) {
            return onFunc(this.name, this.onChangeAttrVal.name, callback);
        }

    }

    /**
     * 装备槽位
     */
    export enum EquipSlot {

        /** 武器 */
        Weapon = 1,

    }

    /**
     * 装备协议
     */
    export class PrefabEvtEquip {

        /**
         * (双端) 穿戴装备
         * @param targetGuid 对象Guid
         * @param slot 槽位
         * @param equipGuid 装备Guid
         */
        public static equip(targetGuid: string, slot: EquipSlot, equipGuid: string) {
            callFunc(this.name, this.onEquip.name, targetGuid, slot, equipGuid);
        }

        /**
         * (双端)监听装备改变
         * @param callback 
         * @returns 
         */
        public static onEquip(callback: (targetGuid: string, slot: EquipSlot, equipGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onEquip.name, callback);
        }

    }

    /**
     * 玩家信息类型
     */
    export enum PlayerInfoType {

        /** 名字 */
        Name,
        /** 等级 */
        Level,
        /** 经验 */
        Exp,
        /** 金币 */
        Gold,
        /** 积分 */
        Score,
        /** 关卡 */
        Stage,
        /** 人气 */
        Popularity,
        /** 是否不在大厅中 */
        IsNotInLobby,
        /** 死亡次数 */
        DeathCount
    }

    /**
     * 玩家信息协议
     */
    export class PrefabEvtPlayerInfo {

        /**
         * (双端)获取玩家信息
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        public static getPlayerInfo(targetGuid: string, infoType: PlayerInfoType | string): any {
            return callFuncRes(this.name, this.getPlayerInfo.name, targetGuid, infoType);
        }

        /**
         * (双端)设置玩家信息
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        public static setPlayerInfo(senderGuid: string, targetGuid: string, val: any, infoType: PlayerInfoType | string) {
            callFunc(this.name, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
        }

        /**
         * (双端)监听信息改变
         * @param callback 回调
         * @returns 
         */
        public static onSetPlayerInfo(callback: (senderGuid: string, targetGuid: string, val: any, infoType: PlayerInfoType | string) => void) {
            return onFunc(this.name, this.onSetPlayerInfo.name, callback);
        }

        /**
         * (双端)添加信息
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        public static addPlayerInfo(senderGuid: string, targetGuid: string, val: number, attrType: PlayerInfoType | string) {
            callFunc(this.name, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, attrType);
        }

        /**
         * (双端)监听信息改变
         * @param callback 回调
         * @returns 
         */
        public static onAddPlayerInfo(callback: (senderGuid: string, targetGuid: string, val: number, infoType: PlayerInfoType | string) => void) {
            return onFunc(this.name, this.onAddPlayerInfo.name, callback);
        }

    }

    export enum PlayerStatType {
        /** 行走 */
        Walking,
        /** 飞行 */
        Flying
    }

    export class PrefabEvtPlayerStat {
        /**
         * (双端)更改玩家状态
         * @param senderGuid 发起对象guid
         * @param targetGuid 目标对象guid
         * @param statType 玩家状态
         */
        public static setPlayerStat(senderGuid: string, targetGuid: string, statType: PlayerStatType) {
            return callFunc(this.name, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
        }

        /**
         * (双端)监听玩家状态更改
         * @param callback 
         */
        public static onSetPlayerStat(callback: (senderGuid: string, targetGuid: string, statType: PlayerStatType) => void) {
            return onFunc(this.name, this.onSetPlayerStat.name, callback);
        }

        /**
         * (双端)获得玩家当前状态
         * @param targetGuid 目标对象guid
         * @returns 玩家当前状态
         */
        public static getPlayerStat(targetGuid: string): PlayerStatType {
            return callFuncRes(this.name, this.getPlayerStat.name, targetGuid);
        }
    }

    /**
    * 攻击协议
    */
    export class PrefabEvtFight {

        /**
         * (双端)击中目标
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param damage 伤害
         * @param hitPoint 击中点
         */
        public static hit(senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector) {
            callFunc(this.name, this.onHit.name, senderGuid, targetGuid, damage, hitPoint);
        }

        /**
         * (双端)监听击中目标
         * @param callback 回调
         * @returns 
         */
        public static onHit(callback: (senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector) => void): mw.EventListener {
            return onFunc(this.name, this.onHit.name, callback);
        }

        /**
         * (双端)发起伤害
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param damage 伤害
         */
        public static hurt(senderGuid: string, targetGuid: string, damage: number) {
            callFunc(this.name, this.onHurt.name, senderGuid, targetGuid, damage);
        }

        /**
         * (双端)监听受到伤害
         * @param callback 回调
         * @returns 
         */
        public static onHurt(callback: (senderGuid: string, targetGuid: string, damage: number) => void): mw.EventListener {
            return onFunc(this.name, this.onHurt.name, callback);
        }

        /**
         * (双端)发起治疗
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param cureVal 治疗数值
         */
        public static cure(senderGuid: string, targetGuid: string, cureVal: number) {
            callFunc(this.name, this.onCure.name, senderGuid, targetGuid, cureVal);
        }

        /**
         * (双端)监听受到治疗
         * @param callback 回调
         * @returns 
         */
        public static onCure(callback: (senderGuid: string, targetGuid: string, cureVal: number) => void): mw.EventListener {
            return onFunc(this.name, this.onCure.name, callback);
        }

        /**
         * (双端)发起死亡
         * @param targetGuid 
         */
        public static die(targetGuid: string) {
            callFunc(this.name, this.onDie.name, targetGuid)
        }

        /**
         * (双端)监听对象死亡
         * @param callback 
         * @returns 
         */
        public static onDie(callback: (targetGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onDie.name, callback);
        }

        /**
         * (双端)通知复活
         * @param targetGuid 对象id
         */
        public static revive(targetGuid: string) {
            callFunc(this.name, this.onRevive.name, targetGuid);
        }

        /**
         * (双端)监听复活
         * @param callback 回调
         * @returns 
         */
        public static onRevive(callback: (targetGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onRevive.name, callback);
        }

    }

    /**
     * 记录点协议
     */
    export class PrefabEvtRecordPoint {

        /**
         * (双端)设置关卡
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标Guid
         * @param recordPointId 记录点id
         */
        public static setRecordPoint(senderGuid: string, targetGuid: string, recordPointId: number, saveDB: boolean) {
            callFunc(this.name, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId, saveDB);
        }

        /**
         * (双端)获取关卡
         * @param targetGuid 
         */
        public static getRecordPoint(targetGuid: string): number {
            return callFuncRes(this.name, this.getRecordPoint.name, targetGuid);
        }

        /**
         * (双端)监听设置关卡
         * @param callback 回调
         * @returns 
         */
        public static onSetRecordPoint(callback: (senderGuid: string, targetGuid: string, recordPointId: number) => void) {
            return onFunc(this.name, this.onSetRecordPoint.name, callback);
        }

        /**
         * (双端)返回存档记录点
         * @param senderGuid 发送者guid 
         */
        public static backCurrentRecordPoint(senderGuid: string) {
            callFunc(this.name, this.onBackCurrentRecordPoint.name, senderGuid);
        }

        /**
         * (双端)监听回到存档记录点
         * @param callback 回调
         */
        public static onBackCurrentRecordPoint(callback: (senderGuid: string) => void) {
            return onFunc(this.name, this.onBackCurrentRecordPoint.name, callback);
        }

        /**
         * (双端)返回记录点
         * @param senderGuid 发送者guid 
         * @param recordPointId 记录点id
         */
        public static backRecordPoint(senderGuid: string, recordPointId: number) {
            callFunc(this.name, this.onBackRecordPoint.name, senderGuid, recordPointId);
        }

        /**
         * (双端)监听回到记录点
         * @param callback 回调
         */
        public static onBackRecordPoint(callback: (senderGuid: string, recordPointId: number) => void) {
            return onFunc(this.name, this.onBackRecordPoint.name, callback);
        }

    }

    /**
     * 通知协议
     */
    export class PrefabEvtNotify {

        /**
         * (客户端)本地通知
         * @param text 
         */
        public static notifyLocal(text: string) {
            callLocalFunc(this.name, this.onNotify.name, text);
        }

        /**
         * (双端)全局通知
         * @param text 信息
         */
        public static notify(text: string) {
            callFunc(this.name, this.onNotify.name, text);
        }

        /**
         * (双端)监听通知
         * @param callback 
         * @returns 
         */
        public static onNotify(callback: (text: string) => void): mw.EventListener {
            return onFunc(this.name, this.onNotify.name, callback);
        }

    }

    /**
     * 排行榜协议
     */
    export class PrefabEvtRank {

        /**
         * (客户端)打开排行榜UI
         */
        public static openRank() {
            callLocalFunc(this.name, this.onOpenRank.name);
        }

        /**
         * (客户端)监听打开排行榜UI
         * @param callback 回调
         * @returns 
         */
        public static onOpenRank(callback: () => void): mw.EventListener {
            return onFunc(this.name, this.onOpenRank.name, callback);
        }

        /**
         * (双端)设置排行榜数据
         * @param senderGuid 
         * @param score 
         * @param typeName 
         */
        public static setRankData(senderGuid: string, name: string, score: number, typeName: string) {
            callFunc(this.name, this.onSetRankData.name, senderGuid, name, score, typeName);
        }

        /**
         * (双端)监听设置排行榜数据
         * @param callback 
         * @returns 
         */
        public static onSetRankData(callback: (senderGuid: string, name: string, score: number, typeName: string) => void): mw.EventListener {
            return onFunc(this.name, this.onSetRankData.name, callback);
        }

        /**
         * (双端)删除排行榜数据
         * @param senderGuid 
         */
        public static delRankData(senderGuid: string) {
            callFunc(this.name, this.onDelRankData.name, senderGuid);
        }

        /**
         * (双端)监听删除排行榜数据
         * @param callback 
         * @returns 
         */
        public static onDelRankData(callback: (senderGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onDelRankData.name, callback);
        }

    }

    /**
     * 换装协议
     */
    export class PrefabEvtCloth {


        /**
         * (客户端)加载角色体型
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param dressResGuid 装扮资源Guid
         */
        public static loadRole(senderGuid: string, targetGuid: string, dressResGuid: string[]) {
            callLocalFunc(this.name, this.onLoadRole.name, senderGuid, targetGuid, dressResGuid);
        }

        /**
         * (客户端)监听加载角色体型协议
         * @param callback 回调
         * @returns 
         */
        public static onLoadRole(callback: (senderGuid: string, targetGuid: string, dressResGuid: string[]) => void): mw.EventListener {
            return onFunc(this.name, this.onLoadRole.name, callback);
        }

        /**
         * (客户端)加载装扮
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param dressResGuid 装扮资源Guid
         */
        public static loadCloth(senderGuid: string, targetGuid: string, dressResGuid: string[]) {
            callLocalFunc(this.name, this.onLoadCloth.name, senderGuid, targetGuid, dressResGuid);
        }

        /**
         * (客户端)监听加载装扮
         * @param callback 
         * @returns 
         */
        public static onLoadCloth(callback: (senderGuid: string, targetGuid: string, dressResGuid: string[]) => void): mw.EventListener {
            return onFunc(this.name, this.onLoadCloth.name, callback);
        }

        /**
         * (客户端)加载插槽资源
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param slotResGuid 插槽资源Guid
         */
        public static loadSlot(senderGuid: string, targetGuid: string, slotResGuid: string) {
            callLocalFunc(this.name, this.onLoadSlot.name, senderGuid, targetGuid, slotResGuid);
        }

        /**
         * (客户端)监听加载插槽资源
         * @param callback 
         * @returns 
         */
        public static onLoadSlot(callback: (senderGuid: string, targetGuid: string, slotResGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onLoadSlot.name, callback);
        }


    }

    /**
     * 收集物协议
     */
    export class PrefabEvtCollection {

        /**
         * (客户端)打开收集物UI
         */
        public static openCollectionUI() {
            callLocalFunc(this.name, this.onOpenCollectionUI.name);
        }

        /**
         * (客户端)监听收集物UI被打开
         * @param callback 
         * @returns 
         */
        public static onOpenCollectionUI(callback: () => void): mw.EventListener {
            return onFunc(this.name, this.onOpenCollectionUI.name, callback);
        }

        /**
         * (双端)获得收集物
         * @param senderGuid 
         * @param targetGuid 
         * @param atlasId 
         */
        public static addCollection(atlasId: string, charGuid: string) {
            callFunc(this.name, this.onAddCollection.name, atlasId, charGuid);
        }

        /**
         * (双端)获取所有已经收集的物品
         */
        public static getAllCollection(charGuid: string): string[] {
            return callFuncRes(this.name, this.getAllCollection.name, charGuid);
        }

        /**
         * (双端)监听获得收集物
         * @param callback 回调
         * @returns 
         */
        public static onAddCollection(callback: (atlasId: string, charGuid: string) => void): mw.EventListener {
            return onFunc(this.name, this.onAddCollection.name, callback);
        }

    }


    export class PrefabEvtCurrency {
        /**
         * (双端)改变货币的值
         * @param targetGuid 改变的对象
         * @param currencyId 货币Id
         * @param changeNum 改变的数目
         */
        public static changeCurrency(targetGuid: string, currencyId: number, changeNum: number) {
            callFunc(this.name, this.onChangeCurrency.name, targetGuid, currencyId, changeNum);
        }

        /**
         * (双端)监听改变货币的值
         * @param targetGuid 改变的对象
         * @param currencyId 货币Id
         * @param changeNum 改变的数目
         */
        public static onChangeCurrency(callback: (targetGuid: string, currencyId: number, changeNum: number, resNum: number) => void) {
            return onFunc(this.name, this.onChangeCurrency.name, callback);
        }

        /**
         * （双端）消费
         * @param targetGuid 目标guid
         * @param currencyId 货币Id
         * @param price 价位
         * @returns 是否消费成功
         */
        public static async buyWithCurrency(targetGuid: string, currencyId: number, price: number): Promise<boolean> {
            if (SystemUtil.isClient()) {
                return await ModuleService.getModule(PrefabEventModuleC).buyWithCurrency(targetGuid, currencyId, price)
            }
            else {
                return await ModuleService.getModule(PrefabEventModuleS).net_BuyWithCurrency(targetGuid, currencyId, price)
            }

        }

        /**
         * (双端)
         * @param targetGuid 目标guid 
         * @param currencyId 货币id
         * @returns 货币值
         */
        public static getCurrencyNum(targetGuid: string, currencyId: number): number {
            return callFuncRes(this.name, this.getCurrencyNum.name, targetGuid, currencyId);
        }
    }

    initEvent();

}
