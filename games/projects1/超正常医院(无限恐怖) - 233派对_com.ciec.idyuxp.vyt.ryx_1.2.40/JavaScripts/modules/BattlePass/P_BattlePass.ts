import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { EnumAnalytics, ShopType, TabType } from "../../const/enum";
import PassCheck_Generate from "../../ui-generate/Event/PassCheck_generate";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import TSIAP from "../Shop/IAPInstance";
import { ShopModuleC } from "../Shop/ShopModuleC";
import BattlePassModuleData from "./BattlePassModuleData";
import P_BattlePassItem from "./P_BattlePassItem";
import P_PassRewardItem from "./P_PassRewardItem";
import { QualityType } from "./PassEnum";
import PassUtils from "./PassUtils";

export default class P_BattlePass extends PassCheck_Generate {

    /**战令等级item列表 */
    public itemList: P_BattlePassItem[] = [];
    /**当前等级 */
    public curLevel: number;
    /**高级奖励(需要展示)列表 */
    public showItemList: P_PassRewardItem[] = [];
    /**最有价值的奖励列表 */
    public mvpItemList: P_BattlePassItem[] = [];

    /**单个item的X方向大小 */
    private levelItemWidth: number = 0;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        // 经验条
        this.mBar_Level.sliderMaxValue = GlobalData.BattlePass.expPerLevel;
        this.mBar_Level.visibility = SlateVisibility.HitTestInvisible;
        this.mBar_Level.thumbImageSize = new Vector2(0, 0);
        this.mButton_Pay1.onClicked.add(() => {
            TSIAP.instance.reqBuyGoods("4gXL1zT0000C2", 1);
        });
        this.mButton_Pay2.onClicked.add(() => {
            ModuleService.getModule(ShopModuleC).showShop(ShopType.Shop, TabType.Recharge)
        });
    }


    public init(data: BattlePassModuleData) {
        this.initItems(data);
        // 已经购买过典藏则隐藏购买按钮
        if (data.isBuy) {
            this.mBtn_Buy.visibility = SlateVisibility.Collapsed;
            this.mImg_Mask.visibility = SlateVisibility.Collapsed;
            this.mImg_Lock.visibility = SlateVisibility.Collapsed;
        }
        let curLevel = PassUtils.getCurLevel(data.score);
        if (curLevel >= GlobalData.BattlePass.maxLevel) {
            this.mCanvas_LevelBuy.visibility = SlateVisibility.Collapsed;
        }
        this.levelItemWidth = this.itemList[0].uiObject.size.x + this.mCanvas_Item.autoLayoutSpacing;
        // 更新最有价值商品展示
        this.showMvpItem();
    }


    /**初始化通行证等级Item列表 */
    private initItems(data: BattlePassModuleData) {
        // 设置等级和经验条UI
        this.setCurLevelByScore(data.score);
        // 设置各个等级Item
        let confs = GameConfig.GamePassLevel.getAllElement();
        // 根据等级排序
        confs.sort((a, b) => a.ShowLevel - b.ShowLevel);
        confs.forEach((conf) => {
            let item = UIService.create(P_BattlePassItem);
            this.mCanvas_Item.addChild(item.uiObject);
            item.init(conf, data);
            this.itemList.push(item);
            if (conf.ShowLevel % 5 == 0) {
                let mvpItem = UIService.create(P_BattlePassItem);
                mvpItem.init(conf, data);
                this.mCanvas_MVPBonus.addChild(mvpItem.uiObject);
                mvpItem.uiObject.visibility = SlateVisibility.Collapsed;
                this.mvpItemList.push(mvpItem);
                // console.log(`初始化最有价值的物品，等级:${mvpItem.conf.ShowLevel}`);
            }
            // console.log("初始化战令等级:" + conf.ShowLevel);
        })
        // 添加需要展示的item到列表
        this.itemList.forEach((levelItem) => {
            levelItem.freeItems.forEach((freeItem) => {
                if (freeItem.conf.QualityType == QualityType.Legend) this.showItemList.push(freeItem);
            });
            levelItem.collectionItems.forEach((collectionItem) => {
                if (collectionItem.conf.QualityType == QualityType.Legend) this.showItemList.push(collectionItem);
            });
        })
        // 添加自动切换展示图片任务
        this.autoSwitchImg();
    }

    /**根据积分设置当前等级 */
    public setCurLevelByScore(score: number) {
        // 当前等级
        let level = PassUtils.getCurLevel(score);
        this.mTxt_Level.text = level.toString();
        // 当前经验
        let curExp = score - level * GlobalData.BattlePass.expPerLevel;
        this.mTxt_Exp.text = `${curExp}/${GlobalData.BattlePass.expPerLevel}`;
        this.mBar_Level.currentValue = curExp;
    }


    /**刷新奖励ItemUI */
    public refreshReward(moduleData: BattlePassModuleData) {
        // console.log(`刷新奖励itemUI，共有：${this.itemList.length} 级`);
        // 奖品列表
        this.itemList.forEach((levelItem) => {
            levelItem.freeItems.forEach((rewardItem) => {
                rewardItem.setState(moduleData, levelItem.conf.ShowLevel);
            })
            levelItem.collectionItems.forEach((rewardItem) => {
                rewardItem.setState(moduleData, levelItem.conf.ShowLevel);
            })
        })
        // 最有价值奖品
        this.mvpItemList.forEach(item => {
            item.freeItems.forEach((rewardItem) => {
                rewardItem.setState(moduleData, item.conf.ShowLevel);
            })
            item.collectionItems.forEach((rewardItem) => {
                rewardItem.setState(moduleData, item.conf.ShowLevel);
            })

        })
    }

    private interval: any = null;
    /**轮播展示图片 */
    private autoSwitchImg() {
        let p = 0;
        let len = this.showItemList.length;
        this.interval = TimeUtil.setInterval(() => {
            if (this.visible == false) return;
            let item = this.showItemList[p % len];
            this.mImg_Icon.imageGuid = item.conf.Icon;
            // console.log("切换图片为：" + item.conf.RewardName);
            p++;
        }, GlobalData.BattlePass.imgSwitchInterval)


    }

    /**在最右侧canvas显示MVP物品 */
    private showMvpItem() {
        this.mSB_Bonus.onUserScrolled.add((offset) => {
            // console.log(`offset: ${offset}`);
            this.updateMvpItem(offset);
        })
        this.updateMvpItem(0);
    }

    private curMvpItem: number = -1;
    /**更新最有价值的商品 */
    private updateMvpItem(offset: number) {
        offset += this.mSB_Bonus.size.x;
        let nextMvpItem = Math.floor(offset / (this.levelItemWidth * GlobalData.BattlePass.mvpItemPerItem));
        // nextMvpItem = Math.min(this.mvpItemList.length - 1, nextMvpItem + 1);
        // if (nextMvpItem == 0) nextMvpItem += GlobalData.BattlePass.mvpItemPerItem;
        if (this.curMvpItem == nextMvpItem) return;
        this.curMvpItem = nextMvpItem;

        this.mvpItemList.forEach((item, index) => {
            if (index == nextMvpItem) item.uiObject.visibility = SlateVisibility.Visible;
            else item.uiObject.visibility = SlateVisibility.Collapsed;
        });
    }

    protected onShow(...params: any[]): void {
        ModuleService.getModule(AnalyticsModuleC).threePhase(EnumAnalytics.PassCheck_Click);
    }

}