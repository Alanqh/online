import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { PlayerCurState } from "../../const/enum";
import PlayerAssetModuleData from "../PlayerAsset/PlayerAssetMData";
import PlayerAssetModuleC from "../PlayerAsset/PlayerAssetModuleC";
import PlayerAssetModuleS from "../PlayerAsset/PlayerAssetModuleS";
import PropModuleS from "../Prop/PropModuleS";
import TimeModuleS from "../Time/TimeModuleS";
import BagItemData from "./BagItemData";
import BagModuleC from "./BagModuleC";
import BagModuleData from "./BagModuleData";
import { PropItemData } from "./PropItemData";


export default class BagModuleS extends ModuleS<BagModuleC, BagModuleData> {


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        ModuleService.getModule(PlayerAssetModuleS).onAssetDataUpdate.add((playerId) => {
            let assetData = DataCenterS.getData(playerId, PlayerAssetModuleData);
            let bagData = this.getPlayerData(playerId);
            bagData.syncAseetData(assetData.propDataList);
            bagData.save(true);
        })
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.loadAssetData(player.playerId);
    }


    /**检查玩家背包是否已满 */
    public checkBagIsFull(playerId: number): boolean {
        if (this.getPlayerData(playerId).bagItemList.length >= GlobalData.Bag.bagMaxSize) {
            return true;
        }
        return false;
    }


    // ---------------net方法---------------
    /**装备道具 */
    @Decorator.noReply()
    public net_equipProp(key: number) {

    }

    /**卸载道具 */
    @Decorator.noReply()
    public net_unequipProp() {

    }

    /**更换道具 */
    @Decorator.noReply()
    public net_changeProp(key: number) {

    }


    /**
     * 新增道具到背包
     * @param propId 道具id
     * @returns 新道具的key, 新增失败返回-1
     */
    public net_addPropToBag(propId: number) {

        let isSuccess = this.currentData.addProp(propId);
        if (isSuccess) {
            this.currentData.save(true);
        } else {

        }
    }

    /**删除道具 */
    public net_delPropFromBag(key: number) {
        this.delPropFromBag(this.currentPlayerId, key);
    }


    /**删除道具 */
    public delPropFromBag(playerId: number, key: number) {
        let data = this.getPlayerData(playerId);
        data.delPropByKey(key);
        data.save(true);
        let id = data.getIdByKey(key);
        ModuleService.getModule(PlayerAssetModuleS).onUseAssetProp.call(playerId, id);
    }

    /**通过道具id删除道具 */
    public delPropFromBagById(playerId: number, propId: number) {
        let bagData = this.getPlayerData(playerId);
        let key = bagData.getKeyById(propId);
        if (key == -1) return console.error(`背包不存在id为${propId}的道具, 道具列表:${bagData.bagItemList.map((value) => value.id)}`);
        bagData.delPropByKey(key);
        bagData.save(true);
        ModuleService.getModule(PlayerAssetModuleS).onUseAssetProp.call(playerId, propId);
    }

    /**删除多个道具 */
    public delMultiProp(playerId: number, propInfoList: { id: number, count: number }[]) {
        let data = this.getPlayerData(playerId);
        propInfoList.forEach(info => {
            data.delMultiProp(info.id, info.count);
        })
        data.save(true);
    }

    /**检查玩家背包是否已满 */
    public net_checkBagIsFull() {
        let state = this.checkBagIsFull(this.currentPlayerId);
        return state;
    }


    /**检查玩家是否有该id对应的道具, 返回道具对应的id */
    public net_getPropKeyById(propId: number, playerId?: number): number {
        if (playerId == null) {
            playerId = this.currentPlayerId;
        }
        let bagData = this.currentData.bagItemList.find((value) => {
            return value.id == propId;
        });

        return bagData ? bagData.key : -1;
    }


    /**设置携带的道具 */
    public net_setCarryProps(keys: number[]): boolean {
        // 因为是装备是单选，只需要获取第一个元素
        let key = keys[0];
        let propIndex = this.currentData.carryItemList.findIndex(data => { return data.key == key; });

        // 卸载
        if (propIndex != -1) {
            this.currentData.carryItemList.splice(propIndex, 1);
            this.getClient(this.currentPlayerId).net_onUnequipProp(key);
        }
        // 装备
        else {
            // 判断道具栏是否满
            if (this.currentData.carryItemList.length >= GlobalData.Bag.propBarMaxSize) {
                return false;
            }
            let bagData = this.currentData.bagItemList.find((data) => { return data.key == key });
            this.currentData.carryItemList.push(bagData);
        }
        // 排序
        this.currentData.sortBag();
        this.currentData.save(true);
        return true;
    }


    /**加载玩家资产 */
    public loadAssetData(playerId: number) {
        let assetData = DataCenterS.getData(playerId, PlayerAssetModuleData);
        let bagData = this.getPlayerData(playerId);
        bagData.syncAseetData(assetData.propDataList);
        bagData.save(true);
    }

}