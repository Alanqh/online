import { GameConfig } from "../../config/GameConfig";
import { IGamePassLevelElement } from "../../config/GamePassLevel";
import { GlobalData } from "../../const/GlobalData";

export class BattlePassItem {
    /**奖励ID */
    id: number;
    /**是否已领取(初级) */
    isGet1: boolean;
    /**是否已领取(高级) */
    isGet2: boolean;
    /**等级 */
    level: number;

    constructor(conf: IGamePassLevelElement) {
        this.id = conf.id
        this.isGet1 = false;
        this.isGet2 = false;
        this.level = conf.ShowLevel;
    }
}


export default class BattlePassModuleData extends Subdata {


    /**积分 */
    @Decorator.persistence()
    public score: number = 0;

    /**奖励列表 (按level排序, 第一个元素Level = 1) */
    @Decorator.persistence()
    public rewardList: BattlePassItem[] = [];

    /**是否已购买通行证 */
    @Decorator.persistence()
    public isBuy: boolean = false;




    protected initDefaultData(): void {
        this.score = 0;
        // 根据配置信息初始化战令列表
        GameConfig.GamePassLevel.getAllElement().forEach((element) => {
            this.rewardList.push(new BattlePassItem(element));
        });
        // 按等级升序排序
        this.rewardList.sort((a, b) => a.level - b.level);
    }


    /**
     * 领取战令奖励
     * @param id 奖励等级
     * @param isSenior 是否是高级奖励
     * @returns 领取成功状态
     */
    public setReceiveData(level: number, isSenior: boolean): boolean {
        let item = this.getRewardByLevel(level);
        if (item == null) return false;

        if (isSenior) {
            // 防止重复领取
            if (item.isGet2 == true) return false;
            item.isGet2 = true;
        } else {
            // 防止重复领取
            if (item.isGet1 == true) return false;
            item.isGet1 = true;
        }
        return true;
    }


    /**通过Id获取单个通行证奖励数据 */
    public getRewardById(id: number): BattlePassItem {
        return this.rewardList.find(item => item.id == id);
    }

    /**通过level获取通行证奖励数据 */
    public getRewardByLevel(level: number): BattlePassItem {
        return this.rewardList[level - 1];
    }


    /**增加积分 */
    public addScore(score: number) {
        this.score = Math.min(GlobalData.BattlePass.maxLevel * GlobalData.BattlePass.expPerLevel, this.score + score);
    }

    /**购买通行证 */
    buyPass() {
        this.isBuy = true;
    }

}