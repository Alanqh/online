import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { DressUpItemData } from "../DressUp/DressData";
import DressUpModuleS from "../DressUp/DressUpModuleS";
import { ShareModuleS } from "../Share/ShareModule";
import TeamS from "../Team/TeamS";
import BattlePassModuleC from "./BattlePassModuleC";
import BattlePassModuleData from "./BattlePassModuleData";
import { RewardType } from "./PassEnum";
import PassUtils from "./PassUtils";


export default class BattlePassModuleS extends ModuleS<BattlePassModuleC, BattlePassModuleData> {


    protected onStart(): void {

    }


    /**增加积分 */
    public addScore(plyaerId: number, score: number) {
        let data = this.getPlayerData(plyaerId);
        data.addScore(score);
        data.save(true);
    }

    public net_addScore(score: number) {
        this.addScore(this.currentPlayerId, score);
    }

    /**领取一个奖励 */
    net_ReceiveOnePassReward(level: number, isSenior: boolean) {
        let state = this.currentData.setReceiveData(level, isSenior);
        if (state) {
            let levelId = this.currentData.getRewardByLevel(level).id;
            let normalRewardIds = GameConfig.GamePassLevel.getElement(levelId).NormalRewardCfgID;
            let seniorRewardIds = GameConfig.GamePassLevel.getElement(levelId).SpecialRewardCfgID;
            if (isSenior) normalRewardIds.forEach(id => this.addOneReward(this.currentPlayerId, id));
            else seniorRewardIds.forEach(id => this.addOneReward(this.currentPlayerId, id));

            this.currentData.save(true);
        }
        console.log(`level: ${level}, isSenior: ${isSenior},领取奖励成功状态：${state}`);
        return state;
    }


    /**领取所有奖励 */
    net_ReceiveAllPassReward() {
        let data = this.currentData;
        let curLevel = PassUtils.getCurLevel(data.score);
        let successIds: number[] = [];
        for (let i = 0; i < curLevel; i++) {
            const levelData = data.rewardList[i];
            let levelConf = GameConfig.GamePassLevel.getElement(levelData.id);
            let level = levelConf.ShowLevel;
            // 领取免费奖励
            if (levelData.isGet1 == false) {
                levelConf.NormalRewardCfgID.forEach(id => {
                    this.addOneReward(this.currentPlayerId, id);
                    successIds.push(id);
                })
                data.setReceiveData(level, false);
            }
            // 领取通行证奖励
            if (levelData.isGet2 == false && data.isBuy) {
                levelConf.SpecialRewardCfgID.forEach(id => {
                    this.addOneReward(this.currentPlayerId, id);
                    successIds.push(id);
                })
                data.setReceiveData(level, true);
            }
        }
        data.save(true);
        return successIds;
    }


    /**添加一个奖励 */
    private addOneReward(playerId: number, id: number) {
        let conf = GameConfig.GamePassRewarid.getElement(id);
        switch (conf.Type) {
            // 道具
            case RewardType.Item:

                break;
            // 装扮
            case RewardType.Dress:

                ModuleService.getModule(DressUpModuleS).addDress(playerId, new DressUpItemData(conf.RewardID));
                break;
            // 表情
            case RewardType.Expression:

                break;
            // 舞蹈
            case RewardType.Dance:

                break;
            // 活动代币
            case RewardType.ActivityCoin:
                ModuleService.getModule(TeamS).addGameCoin(conf.Count, playerId);
                break;


            default:
                break;
        }
    }


    /**购买通行证 */
    net_buyPass() {
        let isSuccess = ModuleService.getModule(ShareModuleS).reduceGameCoin(GlobalData.BattlePass.passCost, this.currentPlayer);
        if (isSuccess) {
            this.currentData.buyPass();
            this.currentData.save(true);
        }
        return isSuccess;
    }

    /**购买一级 */
    net_buyLevel() {
        let isSuccess = ModuleService.getModule(ShareModuleS).reduceGameCoin(GlobalData.BattlePass.levelCost, this.currentPlayer);
        if (isSuccess) {
            this.currentData.addScore(GlobalData.BattlePass.expPerLevel);
            this.currentData.save(true);
        }
        return isSuccess;
    }
}