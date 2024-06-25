import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
/*

* @Date: 2023-05-04 14:17:25

* @LastEditTime: 2023-07-18 18:43:21
* @FilePath: \commonprefab\JavaScripts\Prefabs\prefabEvent\Utils\MapEx.ts
* @Description: 
*/

import { PrefabEvent } from "./PrefabEvent";
import { PrefabEvtUI } from "./PrefabEvtUI";
/**
 * MapEx(可序列化)
*/
export namespace MapEx {

    export type MapExClass<T> = {
        [key: string | number]: T
    }

    /**
     * 是否为空
     * @param map 
     * @returns 是/否 
     */
    export function isNull<T>(map: MapExClass<T>): boolean {
        return !map || map == null || map == undefined;
    }

    /**
     * 获取对象
     * @param map 
     * @param key 
     * @returns 
     */
    export function get<T>(map: MapExClass<T>, key: string | number): T {

        if (map[key]) {
            return map[key];
        }

        let has = false;
        let keys = Object.keys(map)

        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }

        if (has) {
            return map[key];
        }
        return null;

    }

    /**
     * 设置对象
     * @param map 
     * @param key 
     * @param val 
     */
    export function set<T>(map: MapExClass<T>, key: string | number, val: T) {

        map[key] = val;

    }

    /**
     * 删除对象
     * @param map 
     * @param key 
     * @returns 成功/失败
     */
    export function del<T>(map: MapExClass<T>, key: string | number): boolean {

        if (map[key]) {
            delete map[key];
            return true;
        }

        let has = false;
        let keys = Object.keys(map)

        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }

        if (has) {
            delete map[key];
            return true;
        }
        return false;
    }

    /**
     * 是否有指定对象
     * @param map 
     * @param key 
     * @returns 
     */
    export function has<T>(map: MapExClass<T>, key: string | number): boolean {
        if (map[key]) {
            return true;
        }

        let has = false;
        let keys = Object.keys(map)

        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }

        if (has) {
            return true;
        }
        return false;
    }

    /**
     * 获取count数量
     * @param map 
     * @param key 
     * @returns 
     */
    export function count<T>(map: MapExClass<T>): number {
        let res = 0;
        forEach(map, e => {
            ++res;
        })
        return res;
    }

    /**
     * 遍历map
     * @param map 
     * @param callback 
     */
    export function forEach<T>(map: MapExClass<T>, callback: (key: string | number, element: T) => void) {
        for (let key in map) {
            if (map[key]) {
                callback(key, map[key]);
            }
        }
    }

    /**
     * 拷贝，Val还是引用出来的，只是Map换了
     * @param map 
     * @returns 
     */
    export function copy<T>(map: MapExClass<T>): MapExClass<T> {
        let res = {};
        for (let key in map) {
            res[key] = map[key];
        }
        return res;
    }

}
class DBSaveBase {
    public value: any;
}

export class PrefabEventModuleData extends Subdata {

    @Decorator.persistence()
    public cacheData: MapEx.MapExClass<string> = null;

    protected initDefaultData(): void {

        if (this.cacheData == null) {
            this.cacheData = {};
        }

    }

    /**
     * 设置Value
     * @param key 
     * @param val 
     */
    public setValue(key: string, val: any) {
        let data = new DBSaveBase();
        data.value = val;
        let dataStr = JSON.stringify(data);
        MapEx.set(this.cacheData, key, dataStr);
        this.save(true);
    }

    /**
     * 获取Value
     * @param key 
     */
    public getValue<T>(key: string): T {
        if (!MapEx.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx.get(this.cacheData, key);
        let res = JSON.parse(value) as DBSaveBase;
        return res.value;
    }

}

@Serializable
class PrefabEventAirportData {

    public cacheData: MapEx.MapExClass<string> = {};

    public constructor(_cacheData?: any) {
        if (_cacheData != null) {
            this.cacheData = _cacheData;
        }
    }

    /**
     * 设置Value
     * @param key 
     * @param val 
     */
    public setValue(key: string, val: any) {
        console.log("[PF]set Vale : " + key + " => " + val)
        let data = new DBSaveBase();
        data.value = val;
        let dataStr = JSON.stringify(data);
        MapEx.set(this.cacheData, key, dataStr);
    }

    /**
     * 获取Value
     * @param key 
     */
    public getValue<T>(key: string): T {
        if (!MapEx.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx.get(this.cacheData, key);
        let res = JSON.parse(value) as DBSaveBase;
        return res.value;
    }

}

export class PrefabEventModuleC extends ModuleC<PrefabEventModuleS, PrefabEventModuleData> {

    /**
     * 空中数据
     */
    public airData: MapEx.MapExClass<PrefabEventAirportData> = {};

    onStart() {
        PrefabEvent.PrefabEvtPlayerStat.onSetPlayerStat((senderGuid: string, targetGuid: string, stat: PrefabEvent.PlayerStatType) => {
            let char = Player.localPlayer.character;
            if (targetGuid == char.gameObjectId) {
                let prefabEveUI = mw.UIService.getUI(PrefabEvtUI);
                if (stat == PrefabEvent.PlayerStatType.Flying) {
                    char.switchToFlying();
                    mw.UIService.showUI(prefabEveUI);
                    prefabEveUI.setFlyCanvas(true);
                }
                else if (stat == PrefabEvent.PlayerStatType.Walking) {
                    char.switchToWalking();
                    mw.UIService.hideUI(prefabEveUI);
                    prefabEveUI.setFlyCanvas(false);
                }
            }
        })
    }

    /**
     * 同步空中数据
     * @param data 
     */
    public net_SyncAirData(data: string) {

        console.log("[PF] sync air data : " + data);
        this.airData = JSON.parse(data);
        MapEx.forEach(this.airData, (k, v) => {

            MapEx.set(this.airData, k, new PrefabEventAirportData(v.cacheData))

        })

    }

    /**
     * 同步服务器空中数据
     * @param targetGuid 
     * @param key 
     * @param data 
     */
    public net_SetData(targetGuid: string, key: string, data: any) {

        console.log("客户端 net_SetData : " + key + " => " + data)

        if (!MapEx.has(this.airData, targetGuid)) {
            MapEx.set(this.airData, targetGuid, new PrefabEventAirportData(null));
        }
        MapEx.get(this.airData, targetGuid).setValue(key, data);

    }

    /**
     * 获取空中数据
     * @param targetGuid 
     * @param key 
     * @returns 
     */
    public getData<T>(targetGuid: string, key: string): T {
        let res: T = null;

        if (!MapEx.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx.get(this.airData, targetGuid).getValue(key) as T;

        return res;
    }

    /**
     * (双端)获取玩家信息
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    public getPlayerInfo(clazzName: string, targetGuid: string, infoType: PrefabEvent.PlayerInfoType | string) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.data?.getValue(clazzName + infoType);
                //console.log(value + ":" + clazzName + infoType)
                if (value == null) value = 0;
                return value;
            }
        }
        return null;
    }

    /**
     * 获取玩家属性
     * @param targetGuid 
     * @param val 
     * @param attrType 
     */
    public getAttrVal(clazzName: string, targetGuid: string, attrType: PrefabEvent.AttrType): number {
        let curVal = this.getData<number>(targetGuid, clazzName + attrType);
        if (curVal == null) curVal = 0;
        //console.error("获取玩家属性 : " + attrType + " : " + curVal);
        return curVal;
    }

    /**
    * 获取玩家状态
    * @param clazzName 
    * @param targetGuid 
    * @returns 
    */
    public getPlayerStat(clazzName: string, targetGuid: string) {
        let curVal = this.getData(clazzName, targetGuid);
        if (curVal == null) curVal = 0;
        //console.error("获取玩家状态 : " + curVal);
        return curVal;
    }

    /**
     * (双端)获取关卡
     * @param targetGuid 
     */
    public getRecordPoint(clazzName: string, targetGuid: string): number {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.data?.getValue(clazzName + "record") as number;
                if (dbval == null) dbval = 0;
                return dbval;
            }
        }
    }

    /**
     * 获取当前的货币数目
     * @param clazzName 
     * @param targetGuid 
     * @param currencyId 
     * @returns 
     */
    public getCurrencyNum(clazzName: string, targetGuid: string, currencyId: number): number {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.data?.getValue(clazzName + currencyId) as number;
                if (value == null) value = 0;
                return value;
            }
        }
        return null;
    }

    /**
     * 用货币买东西
     * @param targetGuid 购买者
     * @param currencyId 货币id
     * @param price 价格
     * @returns 是否购买成功
     */
    public async buyWithCurrency(targetGuid: string, currencyId: number, price: number): Promise<boolean> {
        return await this.server.net_BuyWithCurrency(targetGuid, currencyId, price);
    }
}

export class PrefabEventModuleS extends ModuleS<PrefabEventModuleC, PrefabEventModuleData> {

    public airData: MapEx.MapExClass<PrefabEventAirportData> = {};

    /**
     * 玩家进入游戏
     * @param player 
     */
    protected onPlayerEnterGame(player: mw.Player): void {
        // 同步一次空中数据
        this.getClient(player).net_SyncAirData(JSON.stringify(this.airData));
    }

    protected onPlayerLeft(player: mw.Player): void {
        if (MapEx.has(this.airData, player.character.gameObjectId)) {
            MapEx.del(this.airData, player.character.gameObjectId);
        }
    }


    /**
     * 设置玩家空中数据
     * @param targetGuid 
     * @param key 
     * @param data 
     */
    public setData<T>(targetGuid: string, key: string, data: T) {

        console.log("[PF:]net_SetData");
        this.getAllClient().net_SetData(targetGuid, key, data);

        if (!MapEx.has(this.airData, targetGuid)) {
            MapEx.set(this.airData, targetGuid, new PrefabEventAirportData());
        }
        MapEx.get(this.airData, targetGuid).setValue(key, data);

    }

    /**
     * 获取玩家空中数据
     * @param targetGuid 
     * @param key 
     * @returns 
     */
    public getData<T>(targetGuid: string, key: string): T {
        let res: T = null;

        if (!MapEx.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx.get(this.airData, targetGuid).getValue(key) as T;

        return res;
    }

    /**
     * 广播事件
     * @param clazzName 
     * @param funcName 
     * @param params 
     */
    public notify(clazzName: string, funcName: string, ...params: any[]) {
        Event.dispatchToAllClient(PrefabEvent._onEventNetKey, clazzName, funcName, ...params);
        Event.dispatchToLocal(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
        console.log(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);

    }

    /**
     * (双端)添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param attrType 属性类型
     */
    public onSetAttrVal(clazzName: string, senderGuid: string, targetGuid: string, val: number, attrType: PrefabEvent.AttrType) {
        let curVal = 0;

        curVal = val;

        this.setData(targetGuid, clazzName + attrType, curVal);
        console.log("[PF:]设置玩家属性 : " + attrType + " : " + curVal);
        let char = GameObject.findGameObjectById(targetGuid);

        if (PlayerManagerExtesion.isCharacter(char)) {
            if (attrType == PrefabEvent.AttrType.Jump) {
                char.maxJumpHeight = curVal;
            }
            if (attrType == PrefabEvent.AttrType.Speed) {
                char.maxWalkSpeed = curVal;
            }
        }

        this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
    }

    /**
     * 添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param attrType 属性类型
     */
    public onAddAttrVal(clazzName: string, senderGuid: string, targetGuid: string, val: number, attrType: PrefabEvent.AttrType) {

        let curVal = this.getData<number>(targetGuid, clazzName + attrType);
        if (curVal == null) curVal = 0;

        curVal += val;

        this.setData(targetGuid, clazzName + attrType, curVal);
        console.log("[PF:]设置玩家属性 : " + attrType + " : " + curVal);
        let char = GameObject.findGameObjectById(targetGuid);

        if (PlayerManagerExtesion.isCharacter(char)) {
            if (attrType == PrefabEvent.AttrType.Jump) {
                char.maxJumpHeight = curVal;
            }
            if (attrType == PrefabEvent.AttrType.Speed) {
                char.maxWalkSpeed = curVal;
            }
        }

        this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
    }

    /**
     * 获取属性
     * @param targetGuid 
     * @param val 
     * @param attrType 
     */
    public getAttrVal(clazzName: string, targetGuid: string, attrType: PrefabEvent.AttrType): number {
        let curVal = this.getData<number>(targetGuid, clazzName + attrType);
        if (curVal == null) curVal = 0;
        //console.log("[PF:]获取玩家属性 : " + attrType + " : " + curVal);
        return curVal;
    }

    /**
     * (双端) 穿戴装备
     * @param targetGuid 对象Guid
     * @param slot 槽位
     * @param equipGuid 装备Guid
     */
    public onEquip(clazzName: string, targetGuid: string, slot: PrefabEvent.EquipSlot, equipGuid: string) {
        this.setData(targetGuid, clazzName + slot, equipGuid);
        this.notify(clazzName, this.onEquip.name, targetGuid, slot, equipGuid);
    }

    /**
     * (双端)设置属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    public onSetPlayerInfo(clazzName: string, senderGuid: string, targetGuid: string, val: number, infoType: PrefabEvent.PlayerInfoType | string) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                this.getPlayerData(char.player.playerId).setValue(clazzName + infoType, val);
                this.notify(clazzName, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
            }
        }
    }

    /**
     * (双端)获取属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    public getPlayerInfo(clazzName: string, targetGuid: string, infoType: PrefabEvent.PlayerInfoType | string) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.getPlayerData(char.player.playerId).getValue(clazzName + infoType);
                if (value == null) value = 0;
                return value;
            }
        }
        return null;
    }

    /**
     * (双端)添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    public onAddPlayerInfo(clazzName: string, senderGuid: string, targetGuid: string, val: number, infoType: PrefabEvent.PlayerInfoType | string) {

        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerInfo(clazzName, targetGuid, infoType);

                if (dbval == null || !Number.isNaN(dbval)) {
                    let nVal = dbval as unknown as number;
                    nVal += val;
                    this.onSetPlayerInfo(clazzName, senderGuid, targetGuid, nVal, infoType);
                    this.notify(clazzName, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, infoType);
                }
            }
        }
    }

    /**
     * (双端)设置关卡
     * @param senderGuid 发送者Guid
     * @param targetGuid 目标Guid
     * @param recordPointId 记录点id
     */
    public onSetRecordPoint(clazzName: string, senderGuid: string, targetGuid: string, recordPointId: number, saveDB: boolean) {

        console.log("[PF:]onSetRecordPoint : " + clazzName + "_" + senderGuid);

        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                if (saveDB)
                    this.getPlayerData(char.player.playerId)?.setValue(clazzName + "record", recordPointId);
                this.notify(clazzName, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId);
            }
        }

    }

    /**
     * (双端)获取关卡
     * @param targetGuid 
     */
    public getRecordPoint(clazzName: string, targetGuid: string): number {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerData(char.player.playerId)?.getValue(clazzName + "record") as number;
                return dbval;
            }
        }
    }

    /**
     * (双端)获得收集物
     * @param senderGuid 
     * @param targetGuid 
     * @param atlasId 
     */
    public onAddCollection(clazzName: string, atlasId: string, charGuid: string) {
        let char = GameObject.findGameObjectById(charGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let db = this.getPlayerData(char.player.playerId);
                if (db) {
                    let dbval = db.getValue(clazzName + "atlasItem") as string[];
                    if (!dbval) {
                        dbval = [];
                    }
                    if (dbval.indexOf(atlasId) == -1) {
                        dbval.push(atlasId);
                        db.setValue(clazzName + "atlasItem", dbval);
                        this.notify(clazzName, this.onAddCollection.name, atlasId, charGuid);
                    }
                }
            }
        }
    }

    /**
     * 获取所有收集物
     */
    public getAllCollection(clazzName: string, charGuid: string): string[] {

        let char = GameObject.findGameObjectById(charGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerData(char.player.playerId)?.getValue(clazzName + "atlasItem") as string[];
                let res = [];
                if (dbval) {
                    res.push(...dbval);
                }
                return res;
            }
        }
    }

    /**
     * 获取玩家状态
     * @param clazzName 
     * @param targetGuid 
     * @returns 
     */
    public getPlayerStat(clazzName: string, targetGuid: string) {
        let curVal = this.getData(clazzName, targetGuid);
        if (curVal == null) curVal = 0;
        //console.log("[PF:]获取玩家状态 : " + curVal);
        return curVal;
    }

    /**
     * (双端)设置属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    public onSetPlayerStat(clazzName: string, senderGuid: string, targetGuid: string, statType: PrefabEvent.PlayerStatType) {
        this.setData(targetGuid, clazzName, statType);
        this.notify(clazzName, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
    }

    public getCurrencyNum(clazzName: string, targetGuid: string, currencyId: number): number {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.getPlayerData(char.player.playerId).getValue(clazzName + currencyId) as number;
                if (value == null) value = 0;
                return value;
            }
        }
        return null;
    }

    /**
     * 
     * @param clazzName 
     * @param senderGuid 
     * @param targetGuid 
     */
    public onChangeCurrency(clazzName: string, targetGuid: string, currencyId: number, currencyNum: number) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getCurrencyNum(clazzName, targetGuid, currencyId);

                if (dbval == null || !Number.isNaN(dbval)) {
                    let nVal = dbval as number;
                    nVal += currencyNum;

                    this.getPlayerData(char.player.playerId).setValue(clazzName + currencyId, nVal);
                    this.notify(clazzName, this.onChangeCurrency.name, targetGuid, currencyId, currencyNum, nVal);
                }
            }
        }
    }

    /**
     * 
     * @param targetGuid 
     * @param currencyId 
     * @param price 
     * @returns 
     */
    public net_BuyWithCurrency(targetGuid: string, currencyId: number, price: number): boolean {
        let curNum = this.getCurrencyNum(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId)
        if (curNum < price) {
            return false;
        }
        else {
            this.onChangeCurrency(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId, -price);
            return true;
        }

    }
}
ModuleService.registerModule(PrefabEventModuleS, PrefabEventModuleC, PrefabEventModuleData);
