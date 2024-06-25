import { RedDotModuleC } from "module_reddot";
import { GameConfig } from "../../../config/GameConfig";
import { IShopItemElement } from "../../../config/ShopItem";
import { PropRefreshType, RedDotType, ShopFirstDo, ShopType, TabType } from "../../../const/enum";
import HotGift_Generate from "../../../ui-generate/Shop/HotGift_generate";
import ShopItem_Generate from "../../../ui-generate/Shop/ShopItem_generate";
import { utils } from "../../../utils/uitls";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";
import { ShopData, propInfo } from "../ShopData";
import { P_Icon } from "./P_BuyDetails";
import { P_Shop } from "./P_Shop";
import { GlobalData } from "../../../const/GlobalData";
import P_IAA from "../P_IAA";
import { ShopModuleC } from "../ShopModuleC";


abstract class P_Item extends UIScript {
    id: number

    public abstract init(data: IShopItemElement, shopUI: P_Shop, tabType: TabType): void;


}


/**商城item */
export class P_ShopItem extends ShopItem_Generate implements P_Item {
    id: number;


    private shopData: ShopData = null;
    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
        this.shopData.onSuccessBuyAC.add(this.buySuccess.bind(this));
    }

    public init(data: IShopItemElement, shopUI: P_Shop, tabType: TabType): void {

        this.mText_Name.text = data.name;
        this.mText_Price.text = data.price.toString();

        let icon: string = "";
        if (data.propIds) {
            icon = GameConfig.Item.getElement(data.propIds[0]).Icon;
        }
        if (data.dressIds) {
            icon = GameConfig.Dress.getElement(data.dressIds[0]).Icon;
        }
        // if (tabType == TabType.Pendant) {
        //     icon = GameConfig.Dress.getElement(data.dressIds[0]).Icon;
        // } else {
        //     if (!data.propIds) {
        //         console.warn(`lwj shop prop 数据没有 ${data.ID}`);
        //     }
        //     icon = GameConfig.Item.getElement(data.propIds[0]).Icon;
        // }

        this.mImage_Money.imageGuid = GlobalData.Shop.icons[data.coinType];
        //TODO 临时加的需求，后续需要优化
        if (data.ID == 2002 || data.ID == 2003) {
            console.warn(`lwj 3天武器 7天武器item`);
            this.mImage_Shop.imageGuid = "317392";
        } else {
            this.mImage_Shop.imageGuid = icon;
        }
        if (data.limitCount) {
            this.updateLimit(data.ID);
            this.mText_BuyNumber.text = utils.Format(GameConfig.Language.Shop_Tips_6.Value, data.limitCount);
        } else {
            this.mText_BuyNumber.visibility = SlateVisibility.Collapsed;
        }

        this.mButton_Pay.onClicked.add(() => {
            shopUI.onClickAC.call(ShopType.Shop, data.ID);
            this.analytics(data.ID);
        });
        this.id = data.ID;
        this.setDiscount(data.discount);

        this.buySuccess(data.ID);

        this.mButton_Pay.touchMethod = ButtonTouchMethod.PreciseTap
    }

    /**设置折扣 */
    private setDiscount(val: number) {
        if (val != 0) {
            this.mText_Discount.text = utils.Format(GameConfig.Language.Shop_Tips_1.Value, val);
            return;
        }
        this.mText_Discount.visibility = SlateVisibility.Collapsed;
        this.mImage_Discount.visibility = SlateVisibility.Collapsed;
    }

    /**购买成功 */
    private buySuccess(id: number) {
        if (id != this.id) {
            return;
        }
        this.updateLimit(id);
        let isOut = this.shopData.isSellOut(this.id);
        if (!isOut) return;
        this.mButton_Pay.enable = false;
        this.mImage_black1.visibility = SlateVisibility.Visible;
        this.mText_BuyNumber.text = GameConfig.Language.Shop_Tips_2.Value;
    }

    /**限购刷新 */
    private updateLimit(id: number) {
        let count = this.shopData.getCanBuyCount(id);
        if (count == -1) return;
        this.mText_BuyNumber.text = utils.Format(GameConfig.Language.Shop_Tips_6.Value, count);
    }

    /**埋点 */
    private analytics(id: number) {
        switch (id) {
            case 2001:
                //武器
                ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.weapon_buy);
                break;
            case 1001:
                //复活币
                ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.reborn_click);
                break;
            default:
                break;
        }

    }


}


/**礼包item */
export class P_GiftItem extends HotGift_Generate implements P_Item {

    public id: number = 0;
    private redName: string = "";


    public init(data: IShopItemElement, shopUI: P_Shop, tabType: TabType): void {
        this.mText_Name.text = data.name;

        if (data.discount) {
            this.mText_Discount.text = utils.Format(GameConfig.Language.Shop_Tips_1.Value, data.discount)
        } else {
            this.mText_Discount.visibility = SlateVisibility.Collapsed;
            this.mImage_Discount.visibility = SlateVisibility.Collapsed;
        }
        if (data.limitCount) {
            this.mText_Times.text = utils.Format(GameConfig.Language.Shop_Tips_6.Value, data.limitCount);
        } else {
            this.mText_Times.visibility = SlateVisibility.Collapsed;
        }
        if (data.nowPrice) {
            this.mText_Price.text = utils.Format(GameConfig.Language.Shop_Tips_7.Value, data.price, data.nowPrice)
        } else {
            this.mText_Price.text = data.price.toString();
        }
        if (data.advertiseNum) {

            let iaa = UIService.create(P_IAA);
            iaa.init(data.ID);
            iaa.onSuccessAll.add(() => {
                shopUI.onWatchADAC.call(ShopType.Hot, data.ID);
            });
            iaa.onSuccessOnce.add((num) => {
                ModuleService.getModule(ShopModuleC).saveAdInfo(data.ID, num);
            });

            this.mButton_Pay.onClicked.add(() => {
                console.warn(`lwj 点击广告 ${data.ID}`);
                iaa.show();
                this.analytics(data.ID);
            });
        } else {
            this.mButton_Pay.onClicked.add(() => {
                shopUI.onClickAC.call(ShopType.Hot, data.ID);
                this.analytics(data.ID);

                console.warn(`lwj 点击礼包 ${data.ID}`);
            });
        }

        this.mImage_Money.imageGuid = GlobalData.Shop.icons[data.coinType]
        if (!data.propIds) {
            console.warn(`lwj 礼包没有道具 shopitem ${data.ID}`);
        }
        data.DanceIds?.forEach((v, i) => {
            let item = UIService.create(P_Icon);
            item.initChat(data, i);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Item.addChild(item.uiObject);
        });

        data.propIds?.forEach((v, i) => {
            let item = UIService.create(P_Icon);
            item.initProp(data, i);
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Item.addChild(item.uiObject);
        });

        this.id = data.ID;
        this.redName = "P_GiftItem" + this.id;
        this.addRedDot(tabType);

        this.mButton_Pay.clickMethod = ButtonClickMethod.PreciseClick
    }



    private addRedDot(tabType: TabType) {
        switch (tabType) {
            case TabType.Gift:
                ModuleService.getModule(RedDotModuleC).addRedDotPathByEvt(RedDotType.GiftLevel_1, this.redName, this.rootCanvas);
                let arr = ModuleService.getModule(RedDotModuleC).getRedDotUIArrsByEventName(this.redName);
                break;
            default:
                break;
        }
    }

    /**红点显隐 */
    public showRedDot(isShow: boolean) {
        let redDot = ModuleService.getModule(RedDotModuleC);
        if (isShow)
            redDot.triggerRedDotEvent(this.redName);
        else
            redDot.removeRedDotEvent(this.redName);
    }


    /**售罄 */
    public soldOut(id: number) {
        let str = "";
        let num = 0;

        let type = GameConfig.ShopItem.getElement(id).refreshType;
        let date = new Date();

        if (type == PropRefreshType.Day) {
            num = utils.secondsToMidnight(date);
            str = utils.formatSeconds(num);
        } else if (type == PropRefreshType.Week) {
            num = utils.secondsToNextMonday(date);
            str = utils.formatSeconds(num);
        }
        this.mButton_Pay.visibility = SlateVisibility.Collapsed;
        this.mImage_Money.visibility = SlateVisibility.Collapsed;
        this.mText_Price.text = GameConfig.Language.Shop_Tips_2.Value;
        this.mText_Times.text = str;
        this.mImage_Black.visibility = SlateVisibility.SelfHitTestInvisible;

        this.showRedDot(false);
    }

    /**更新限购 */
    public updateLimit(data: ShopData, id: number) {
        let count = data.getCanBuyCount(id);
        if (count == -1) return;
        this.mText_Times.text = utils.Format(GameConfig.Language.Shop_Tips_6.Value, count);
    }


    /**埋点 */
    public analytics(id: number) {
        let analytics = ModuleService.getModule(AnalyticsModuleC);
        switch (id) {
            case 3002:
                //复活币
                analytics.shopFirstDo(ShopFirstDo.reborn_present_buy);
                break;
            case 3003:
                //变身卡
                analytics.shopFirstDo(ShopFirstDo.transfer_click);
                break;
            case 3001:
                //周礼包
                analytics.shopFirstDo(ShopFirstDo.free_present_click)
                break;
            case 3006:
                //周礼包
                analytics.shopFirstDo(ShopFirstDo.free_present_click)
                break;
            case 2002:
                //3天武器
                analytics.shopFirstDo(ShopFirstDo.weapon_daily_buy_01);
                break;
            case 2003:
                //7天武器
                analytics.shopFirstDo(ShopFirstDo.weapon_daily_buy_02);
                break;
            default:
                break;
        }
    }


}