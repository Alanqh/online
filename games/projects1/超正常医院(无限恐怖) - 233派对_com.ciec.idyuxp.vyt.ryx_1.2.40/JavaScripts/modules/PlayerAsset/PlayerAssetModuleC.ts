import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import UITools from "../../utils/UI/UITools";
import BagModuleC from "../Bag/BagModuleC";
import P_Bag from "../Bag/P_Bag";
import { PropId } from "../Bag/PropEnum";
import FindModuleC from "../Find/FindModuleC";
import P_Guide from "../Guide/P_Guide";
import { WeaponModuleC } from "../weaponModule/WeaponModuleC";
import PlayerAssetModuleData from "./PlayerAssetMData";
import PlayerAssetModuleS from "./PlayerAssetModuleS";
import PropSaveData from "./PropSaveData";

export default class PlayerAssetModuleC extends ModuleC<PlayerAssetModuleS, PlayerAssetModuleData> {

    /**是否有枪 */
    public hasGun: boolean = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.data.getProp(PropId.DanceGun)) {
            this.initWeapon(PropId.DanceGun);
        }
        if (this.data.getProp(PropId.Fan)) {
            this.initWeapon(PropId.Fan)
        }
    }

    initWeapon(id: number) {
        let weaponId = GameConfig.Item.getElement(id).WeaponId;
        ModuleService.getModule(WeaponModuleC).initPlayerWeapon(weaponId);
        this.hasGun = true;
        console.warn(`初始化武器`);
    }

    /**更新过期时间 */
    async net_updateRemainTime(str: string) {
        let bagPanel = ModuleService.getModule(BagModuleC).bagPanel;
        let dataList = JSON.parse(str) as PropSaveData[];
        for (let i = 0; i < dataList.length; i++) {
            const data = dataList[i];
            for (let [key, item] of bagPanel.itemMap) {
                if (item.data.id == data.id) {
                    item.ui.remainTime = data.remain;
                    break;
                }
            }
        }
        this.data.propDataList = dataList;
        GlobalData.Lottery.lotteryCoinRefresh.call();
    }

    /**物品过期提示 */
    net_overTime(propId: number) {
        let conf = GameConfig.Item.getElement(propId);
        UITools.ShowSoftTips(`物品过期：${conf.Name}`)
    }

    /**初始化枪 */
    net_initWeapon(id: number) {
        this.initWeapon(id);
        ModuleService.getModule(FindModuleC).net_spawnProps();
    }

    /**第一次获得某道具 */
    net_firstGet(propId: number) {
        // let guideUI = UIService.getUI(P_Guide);
            
        // if (propId == PropId.TransformationCard) {
        //     guideUI.showTaskDetail(12);
        //     guideUI.showTaskDetail(13);
        //     guideUI.showTaskDetail(14);
        // }
    }
}