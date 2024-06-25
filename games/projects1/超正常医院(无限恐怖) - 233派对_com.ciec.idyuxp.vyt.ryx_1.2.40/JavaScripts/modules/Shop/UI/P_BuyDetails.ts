import { IChatElement } from "../../../config/Chat";
import { IDressElement } from "../../../config/Dress";
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { IShopItemElement } from "../../../config/ShopItem";
import { GlobalData } from "../../../const/GlobalData";
import { ShopFirstDo, ShopType, TabType } from "../../../const/enum";
import ItemTips_Generate from "../../../ui-generate/Shop/ItemTips_generate";
import ShopBuy_Generate from "../../../ui-generate/Shop/ShopBuy_generate";
import iconItem_Generate from "../../../ui-generate/Shop/iconItem_generate";
import { utils } from "../../../utils/uitls";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";
import { AnalyticsTool } from "../../Analytics/AnalyticsTool";

enum AddSub {
    Add,
    Sub
}

/**购买框 */
export class P_ShopBuy extends ShopBuy_Generate {

    /**购买事件 2：id, 3:购买个数  */
    public onBuyAC: Action2<number, number> = new Action2();
    /**当前购买数量 */
    private buyCount: number = 1;

    private cfg: IShopItemElement;

    private itemPool: Array<P_Icon> = new Array();

    onStart() {
        this.layer = UILayerMiddle;
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        });

        this.mButton_Add.onClicked.add(() => {
            this.onCountChange(AddSub.Add);
        });
        this.mButton_Reduce.onClicked.add(() => {
            this.onCountChange(AddSub.Sub);
        });
        this.mButton_Buy.onClicked.add(() => {
            this.onBuyAC.call(this.cfg.ID, this.buyCount);
            this.hide();
            this.analytics(this.cfg.ID);
            // ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.shopitem_buy_ + this.cfg.ID);
        });

    }

    /**显示商店购买框 */
    public showShopBuyDetail(type: ShopType, cfg: IShopItemElement) {
        this.cfg = cfg;

        this.mImage_Icon.imageGuid = GlobalData.Shop.icons[cfg.coinType];

        if (cfg.propIds) {
            //道具详情
            cfg.propIds.forEach((propId, index) => {
                let icon = IconPool.getIcon();
                icon.uiObject.size = icon.rootCanvas.size
                this.mCanvas_Item.addChild(icon.uiObject);
                icon.initProp(cfg, index);
                this.itemPool.push(icon);
            })
        }

        if (cfg.dressIds) {
            //装扮详情
            cfg.dressIds.forEach((dressId, index) => {
                let icon = IconPool.getIcon();
                icon.uiObject.size = icon.rootCanvas.size;
                this.mCanvas_Item.addChild(icon.uiObject);
                icon.initDress(cfg, index);
                this.itemPool.push(icon);
            })
        }
        if (cfg.DanceIds) {
            //表情
            cfg.DanceIds.forEach((chatId, index) => {
                let icon = IconPool.getIcon();
                icon.uiObject.size = icon.rootCanvas.size;
                this.mCanvas_Item.addChild(icon.uiObject);
                icon.initChat(cfg, index);
                this.itemPool.push(icon);
            })
        }

        this.show();
        this.setShopStyle(type);
        this.onCountChange(AddSub.Sub);
        // ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.shopitem_click_ + cfg.ID);
    }

    /**显示补给详情框 */
    public showSupplyDetail() {
        this.cfg = GameConfig.ShopItem.getElement(4001);
        let itemMap = this.countGiftNum();

        let ids = Array.from(itemMap.keys());
        let counts = Array.from(itemMap.values());

        for (let index = 0; index < itemMap.size; index++) {
            let item = IconPool.getIcon();
            item.uiObject.size = item.rootCanvas.size;
            this.mCanvas_Item.addChild(item.uiObject);
            item.initGift(ids[index], counts[index]);
            this.itemPool.push(item);
        }
        this.show();
        this.setShopStyle(ShopType.Hot);
        this.onCountChange(AddSub.Sub);
        this.mImage_Icon.imageGuid = GlobalData.Shop.icons[this.cfg.coinType];
    }

    /**购买数量改变 */
    private onCountChange(type: AddSub) {
        if (type == AddSub.Add) {
            this.buyCount++;
        } else {
            this.buyCount--;
        }
        if (this.cfg.limitCount) {
            if (this.buyCount > this.cfg.limitCount) {
                this.buyCount = this.cfg.limitCount;
            }
        }
        if (this.buyCount < 1) this.buyCount = 1;
        if (this.buyCount > 99) this.buyCount = 99;
        this.mText_num.text = this.buyCount.toString();
        this.mText_Money.text = (this.buyCount * this.cfg.price).toString();
        this.itemPool.forEach((item, index) => {
            item.setNum(this.buyCount);
        });
    }


    /**商店样式 */
    private setShopStyle(type: ShopType) {
        if (type == ShopType.Shop) {
            this.mText_Title.text = GameConfig.Language.Shop_Tips_9.Value;
            this.mCanvas_Select.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mCanvas_Select.visibility = SlateVisibility.Collapsed;
            this.mText_Title.text = GameConfig.Language.Shop_Tips_10.Value;
        }
    }

    /**超值礼包统计个数 */
    private countGiftNum() {
        let cfgIds = [4001, 4002, 4003];
        let item = new Map<number, number>()
        cfgIds.forEach((id) => {
            let cfg = GameConfig.ShopItem.getElement(id);
            cfg.propIds.forEach((propId, index) => {
                if (item.has(propId)) {
                    item.set(propId, item.get(propId) + cfg.awardCount[index]);
                } else {
                    item.set(propId, cfg.awardCount[index]);
                }
            });
        });
        return item;
    }

    onShow() {
        this.buyCount = 1;
        utils.showUITween(this);
    }

    onHide() {
        this.itemPool.forEach((item) => {
            IconPool.recycleIcon(item);
        });
        this.itemPool.length = 0;
    }

    /**埋点 */
    private analytics(id: number) {
        let analytics = ModuleService.getModule(AnalyticsModuleC)
        switch (id) {
            case 4001:
                analytics.shopFirstDo(ShopFirstDo.hot_buy_affrim);
                break;
            case 3002:
                AnalyticsTool.ts_action_firstdo(ShopFirstDo.reborn_present_buy_affrim, 0);
                break;
            case 3003:
                analytics.shopFirstDo(ShopFirstDo.transfer_buy);
                break;
            case 2001:
                //武器
                analytics.shopFirstDo(ShopFirstDo.weapon_buy_affrim);
                break;
            case 2002:
                //3天武器
                analytics.shopFirstDo(ShopFirstDo.weapon_daily_buy_affrim_01);
                break;
            case 2003:
                //7天武器
                analytics.shopFirstDo(ShopFirstDo.weapon_daily_buy_affrim_02);
                break;
            case 1001:
                //复活币
                analytics.shopFirstDo(ShopFirstDo.reborn_buy);
                break;
            default:
                break;
        }
    }

}


/**道具详情Tips */
class P_ItemDetail extends ItemTips_Generate {



    onStart() {
        this.layer = UILayerMiddle;
        this.mButton_Click.onClicked.add(() => {
            this.hide();
        });
    }

    public init(cfg: IItemElement | IDressElement | IChatElement) {
        this.mText_Name.text = cfg.Name;
        this.mText_Name_1.text = cfg.Describe;
        this.mImage_Coin.imageGuid = cfg.Icon;
    }

}

/**道具icon */
export class P_Icon extends iconItem_Generate {
    cfg: IItemElement | IDressElement | IChatElement;
    private chooseNum: number = 1;

    onStart() {
        this.mButton.onClicked.add(() => {
            let tips = UIService.getUI(P_ItemDetail);
            tips.init(this.cfg);
            tips.show();
        });
        this.mButton.touchMethod = ButtonTouchMethod.PreciseTap;
        this.mButton.clickMethod = ButtonClickMethod.PreciseClick
    }

    initProp(data: IShopItemElement, index: number) {
        let propCfgID = data.propIds[index];
        this.cfg = GameConfig.Item.getElement(propCfgID);
        this.visible = true;
        //TODO 临时加需求 
        if (data.ID == 2002 || data.ID == 2003) {
            this.mImage_icon.imageGuid = "317392";
        } else {
            this.mImage_icon.imageGuid = this.cfg.Icon;
        }

        if (data.awardCount)
            this.chooseNum = data.awardCount[index];
        else if (data.awards) {
            this.chooseNum = data.awards;
        } else {
            this.chooseNum = 1;
        }
        this.mText_num.text = this.chooseNum.toString();
    }

    initDress(data: IShopItemElement, index: number) {
        let dressCfgID = data.dressIds[index];
        this.cfg = GameConfig.Dress.getElement(dressCfgID);
        this.visible = true;
        this.mImage_icon.imageGuid = this.cfg.Icon;
        this.chooseNum = 1;
        this.mText_num.text = "1";//装扮默认数量
    }

    initChat(data: IShopItemElement, index: number) {
        let chatCfgID = data.DanceIds[index];
        this.cfg = GameConfig.Chat.getElement(chatCfgID);
        this.visible = true;
        this.mImage_icon.imageGuid = this.cfg.Icon;
        this.chooseNum = 1;
        this.mText_num.text = "1";//默认数量
    }

    /**补给礼包显示用 */
    initGift(cfgId: number, count: number) {
        this.cfg = GameConfig.Item.getElement(cfgId);
        this.visible = true;
        this.mImage_icon.imageGuid = this.cfg.Icon;
        this.chooseNum = count
        this.mText_num.text = this.chooseNum.toString();
    }

    /**设置数量
     * @param times 倍数
     */
    setNum(times: number) {
        this.mText_num.text = (times * this.chooseNum).toString();
    }
}



/**道具icon对象池 */
export class IconPool {
    private static pool: Array<P_Icon> = new Array();

    public static getIcon(): P_Icon {
        let icon = this.pool.pop();
        if (icon == null) {
            icon = UIService.create(P_Icon);
        }
        icon.visible = true
        return icon;
    }

    public static recycleIcon(icon: P_Icon) {
        icon.visible = false;
        this.pool.push(icon);
    }

    public static recycleAll() {
        this.pool.forEach((icon) => {
            icon.visible = false;
        });
    }

    public static getALlIcon() {
        return this.pool;
    }
}
