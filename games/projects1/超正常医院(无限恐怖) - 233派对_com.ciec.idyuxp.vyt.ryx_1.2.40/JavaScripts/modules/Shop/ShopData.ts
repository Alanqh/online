import { GameConfig } from "../../config/GameConfig";
/**刷新的道具每日每周 */
export class propInfo {
    /**道具id */
    id: number;
    /**购买数量 */
    count: number;
    /**购买时间 */
    date: string;
}
/**补给礼包 */
export class SupplyInfo {
    /**购买时间 */
    date: string = "";
    /**领取阶段 */
    stage: number = 0;
}
/**会员VIP */
export class VipInfo {
    /**购买时间 */
    date: string = "";
    /**今日领取时间 */
    todayDate: string = "";
}

/**广告信息 */
export class AdInfo {

    constructor(public id: number, public remain: number) { }
}

export class ShopData extends Subdata {

    /**购买道具事件 */
    public onSuccessBuyAC: Action1<number> = new Action1();

    /**积分改变事件 */
    public onGameCoinChange: Action1<number> = new Action1();

    /**玩家异常币 */
    @Decorator.persistence()
    public gameCoin: number = 0;
    /**已购买的id */
    @Decorator.persistence()
    public boughtIds: number[] = [];

    /**已经购买的刷新道具 */
    @Decorator.persistence()
    public boughtProps: propInfo[] = [];
    /**补给礼包事件 0:刚买 123领取阶段 */
    public onSupplyInfoChange: Action1<number> = new Action1();

    /**补给礼包 */
    @Decorator.persistence()
    public supplyInfo: SupplyInfo = null;

    /**VIP */
    @Decorator.persistence()
    public vipInfo: VipInfo = null;
    /**购买VIP事件 */
    public onVipInfoChange: Action = new Action();

    /**是否弹礼包记录 */
    @Decorator.persistence()
    public isShowGift: boolean = true;

    /**选择弹窗时间 */
    @Decorator.persistence()
    public selectPopTime: string = new Date().toString();

    /**广告信息 */
    @Decorator.persistence()
    public adInfo: AdInfo[] = [];

    @Decorator.persistence()
    public isUp: boolean = false;

    protected initDefaultData(): void {
        this.isShowGift = true;
        this.isUp = true;
        this.selectPopTime = new Date().toString();
    }

    /**游戏币改变 */
    // public changegameCoin(value: number, isAdd: boolean, isSync: boolean = true): boolean {
    //     if (!isAdd && this.gameCoin < value) {
    //         console.error("游戏币不足");
    //         return false;
    //     }
    //     isAdd ? this.gameCoin += value : this.gameCoin -= value;

    //     this.save(isSync);
    //     this.onGameCoinChange.call(this.gameCoin);
    //     return true;
    // }


    /**添加已购买的id */
    public addBoughtId(id: number, buyCount: number) {
        this.boughtIds.push(id);

        let count = GameConfig.ShopItem.getElement(id).limitCount;
        if (count > 0) {
            //限购道具加入刷新列表
            this.addBoughtProps(id, buyCount);
        }

        this.save(true);
        this.onSuccessBuyAC.call(id);
    }

    /**是否已购买 */
    public isBought(id: number): boolean {
        return this.boughtIds.includes(id);
    }

    //#region   限购刷新道具

    /**添加限购道具 */
    private addBoughtProps(id: number, buyCount: number) {
        let item = this.boughtProps.find((value) => {
            return value.id == id;
        });
        console.warn(`lwj 添加限购道具 ${id}  ${item}`);
        if (item) {
            item.count += buyCount;
            item.date = new Date().toString();
        } else {
            let info = new propInfo();
            info.id = id;
            info.count = 1;
            info.date = new Date().toString();
            console.warn(`lwj 添加限购道具 ${id}`);
            this.boughtProps.push(info);
        }
    }

    /**是否售罄 */
    public isSellOut(id: number): boolean {
        let limitCount = GameConfig.ShopItem.getElement(id).limitCount;
        if (limitCount == 0) return false;
        let item = this.boughtProps.find((value) => {
            return value.id == id;
        });
        if (item) {
            if (item.count >= limitCount) {
                return true;
            }
        }
        return false;
    }
    /**是否可买 */
    public isCanBuy(id: number, buyCount: number): boolean {
        let limitCount = GameConfig.ShopItem.getElement(id).limitCount;
        if (limitCount == 0) return true;
        let item = this.boughtProps.find((value) => {
            return value.id == id;
        });
        if (item) {
            if (item.count + buyCount > limitCount) {
                return false;
            }
        }
        return true;
    }

    /**获取可购买次数 */
    public getCanBuyCount(id: number): number {
        let limitCount = GameConfig.ShopItem.getElement(id).limitCount;
        if (limitCount == 0) return -1;
        let item = this.boughtProps.find((value) => {
            return value.id == id;
        });
        if (item) {
            return limitCount - item.count;
        }
        return limitCount;
    }

    /**获取限购刷新道具 */
    public getBoughtProps(id: number): propInfo {
        return this.boughtProps.find((value) => {
            return value.id == id;
        });
    }

    //#endregion



    //#region   补给礼包

    /**购买补给礼包 */
    public buySupplyInfo() {
        this.supplyInfo = new SupplyInfo();
        this.supplyInfo.date = new Date().toString();
        this.supplyInfo.stage = 0;
        this.save(true);
        this.onSupplyInfoChange.call(this.supplyInfo.stage);
    }

    /**领取补给礼包 */
    public getSupplyInfo() {
        this.supplyInfo.stage++;
        this.save(true);
        this.onSupplyInfoChange.call(this.supplyInfo.stage);
    }


    //#endregion

    //#region   VIP

    /**购买VIP */
    public buyVipInfo() {
        this.vipInfo = new VipInfo();
        this.vipInfo.date = new Date().toString();
        this.save(true);
        this.onVipInfoChange.call();
    }

    public getVipAward(date: string) {
        this.vipInfo.todayDate = date;
        this.save(true);
        this.onVipInfoChange.call()
    }

    /**重置vip */
    public resetVip() {
        this.vipInfo = null;
        this.save(true);
        this.onVipInfoChange.call()
    }
}