import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";

export class FindData extends Subdata {
    /** 已经找到的奖励 */
    @Decorator.persistence("a")
    public finds: number[] = [];

    /** 已经领取的奖励 */
    @Decorator.persistence("b")
    public rewardItems: number[] = [];

    @Decorator.persistence("c")
    public guideStage: number = 0;

    @Decorator.persistence("d")
    public startTime: number = 0;

    public isFined(id: number) {
        return this.finds.includes(id);
    }

    public isGetReward(id: number) {
        return this.rewardItems.includes(id);
    }

    public reqFindItem(id: number, isSave: boolean = true): boolean {
        if (this.finds.includes(id)) {
            return false;
        }
        this.finds.push(id);
        this.save(isSave);
        AchieveService.getAchieveIns(EAchieveType.FindCollection).listen(this["mUserId"], this.finds);
        return true;
    }

    public reqGetProcessItem(id: number) {
        if (this.rewardItems.includes(id)) {
            return false;
        }
        this.rewardItems.push(id);
        this.save(true);
        return true;
    }
}
