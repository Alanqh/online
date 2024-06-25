import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import PropSaveData from "../PlayerAsset/PropSaveData";
import BagItemData from "./BagItemData";

export default class BagModuleData extends Subdata {

    /**玩家背包道具列表 */
    @Decorator.persistence()
    bagItemList: BagItemData[] = [];

    /**玩家携带道具key列表 */
    @Decorator.persistence()
    carryItemList: BagItemData[] = [];


    protected onDataInit(): void {
        this.bagItemList = [];
        this.carryItemList = [];
    }


    /**向背包增加道具 */
    public addProp(propId: number, count: number = 1): boolean {
        if (this.bagItemList.length >= GlobalData.Bag.bagMaxSize) {
            return false;
        }
        // 找到可以折叠的格子
        let itemData = this.bagItemList.find((item) => {
            return item.id == propId;
        })
        // 新增道具
        if (!itemData) {
            // 新格子
            let newKey = this.getNewKey(this.bagItemList);
            let data = new BagItemData(newKey, propId, count);
            this.bagItemList.push(data);
            this.sortBag();
            // 如果道具栏没满，自动携带该道具
            let canEquip = GameConfig.Item.getElement(propId).IsInItem;
            // let canEquip = false;
            if (this.carryItemList.length < GlobalData.Bag.propBarMaxSize && canEquip) {
                this.carryItemList.push(data);
            }
            return true;
        }
        // 已有的消耗品可以折叠
        if (itemData.count < GlobalData.Prop.propMaxCount) {
            itemData.count++;
        }
        else {
            // 道具达到上限
            return false;
        }
        return true;
    }

    /**删除道具 */
    public delPropByKey(key: number, delAll: boolean = false) {
        let bagIndex = this.bagItemList.findIndex((item) => {
            return item.key == key;
        })
        if (bagIndex == -1) return;

        let item = this.bagItemList[bagIndex];
        // 数量为1，或删除全部 则删除格子
        if (item.count <= 1 || delAll) {
            this.bagItemList.splice(bagIndex, 1);
            // 删除携带列表中的key
            let propIndex = this.carryItemList.findIndex((item) => {
                return item.key == key;
            });

            if (propIndex != -1) {
                this.carryItemList.splice(propIndex, 1);
            }
            this.sortBag();
        } else {
            // 数量大于1，则数量-1
            item.count--;
        }

    }

    /**获得下一个新增prop的唯一key */
    private getNewKey(playerBag: BagItemData[]): number {
        let max = 0;
        playerBag.forEach((value) => {
            if (value.key > max) {
                max = value.key;
            }
        });
        return max + 1;
    }

    /**背包排序 */
    public sortBag() {
        let bagList = this.bagItemList;
        let equipKeys = this.carryItemList.map((item) => { return item.key });
        bagList.sort((a, b) => {
            let aEquipt = equipKeys.includes(a.key) ? 1 : 0;
            let bEquipt = equipKeys.includes(b.key) ? 1 : 0;
            // 先根据是否装备排
            if (aEquipt != bEquipt) {
                return bEquipt - aEquipt;
            }
            // 再根据id排
            return b.id - a.id;
        });
    }

    /**删除多个数量道具 */
    public delMultiProp(id: number, count: number) {
        let propIndex = this.bagItemList.findIndex(item => item.id == id);
        let prop = this.bagItemList[propIndex];
        if (prop == null) return console.error("lmn error: 删除道具不存在, id: " + id);
        prop.count -= count;
        if (prop.count <= 0) {
            this.bagItemList.splice(propIndex, 1);
        }
    }


    /**通过道具id获得道具key, 如果不存在则返回-1 */
    public getKeyById(id: number) {
        let data = this.bagItemList.find((value) => {
            return value.id == id;
        });
        return data ? data.key : -1;
    }

    /**通过道具key获得道具id */
    public getIdByKey(key: number) {
        let data = this.bagItemList.find((value) => {
            return value.key == key;
        });
        return data ? data.id : -1;
    }

    /**玩家资产同步到背包数据 */
    public syncAseetData(saveDataList: PropSaveData[]) {
        // 移除
        this.bagItemList = this.bagItemList.filter((bagItem) => {
            let conf = GameConfig.Item.getElement(bagItem.id);
            if (conf.isAsset == false) return true;
            let item = saveDataList.find((assetData) => assetData.id == bagItem.id);
            return item != null;
        });
        // 更新和新增
        saveDataList.forEach((assetData) => {
            let bagData = this.bagItemList.find((bagData) => assetData.id == bagData.id);
            if (bagData == null) {
                this.addProp(assetData.id, assetData.count);
            } else {
                bagData.count = assetData.count;
            }
        });
    }
}