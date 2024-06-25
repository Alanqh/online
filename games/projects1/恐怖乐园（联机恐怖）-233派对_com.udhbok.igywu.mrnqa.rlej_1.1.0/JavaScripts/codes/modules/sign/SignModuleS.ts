/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-07 11:23:01
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-19 16:57:17
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\sign\SignModuleS.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { BagDefine } from "../bag/BagDefine";
import { SignDataHelper } from "./SignDataHelper";
import { SignModuleC } from "./SignModuleC";

/**
 * 签到模块（服务端），初始化玩家数据，提供签到奖励领取接口，更新配置信息接口
 */
export class SignModuleS extends ModuleS<SignModuleC, SignDataHelper> {

    protected onPlayerJoined(player: mw.Player): void {
        DataCenterS.getData(player, SignDataHelper).updateSignData()
    }

    /**领取签到奖励 */
    public net_getSignReward(dayIndex: number) {
        let singData = GameConfig.CheckIn.getElement(dayIndex);
        if (!singData) return false;
        let result = this.currentData.saveReward(dayIndex);
        if (!result) return false;
        BagDefine.AddItem(this.currentPlayerId, singData.itemId, "", "", singData.itemNum, false);
        return true;
    }

}