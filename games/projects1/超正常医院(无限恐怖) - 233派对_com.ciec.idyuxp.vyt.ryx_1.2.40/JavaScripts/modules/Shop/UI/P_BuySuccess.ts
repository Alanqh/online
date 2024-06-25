import { IShopItemElement } from "../../../config/ShopItem";
import { TabType } from "../../../const/enum";
import ItemBuyTips_Generate from "../../../ui-generate/Shop/ItemBuyTips_generate";
import VipBuyTips_Generate from "../../../ui-generate/Shop/VipBuyTips_generate";
import { utils } from "../../../utils/uitls";
import { IconPool, P_Icon } from "./P_BuyDetails";

/**购买成功框 */
export class P_BuySuccess extends VipBuyTips_Generate {

    onStart() {
        this.layer = UILayerMiddle;
        this.mYes_btn.onClicked.add(() => {
            this.hide();
        });
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        })
    }

    public showSuccess(type: TabType) {

        this.mText_Vip.visibility = type == TabType.Vip ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mText_Gift.visibility = type == TabType.Vip ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
        this.show()

    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
    }

}

/**购买成功细节框 */
export class P_BuySuccessDetails extends ItemBuyTips_Generate {
    private itemPool: Array<P_Icon> = new Array();

    onStart() {
        this.layer = UILayerMiddle;
        this.mYes_btn.onClicked.add(() => {
            this.hide();
        });
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        })
    }
    /**显示商店购买框
     * 是否是领取
     * @param cfg 道具配置
     * @param count 购买成功数量
     */
    public showShopBuyDetail(isGet: boolean, cfg: IShopItemElement, count: number = 1) {
        this.mText_Title.text = isGet ? "领取成功" : "购买成功";
        this.mContent_txt.text = isGet ? "领取成功，获得以下道具" : "购买成功，获得以下道具"

        if (cfg.propIds) {
            //道具详情
            cfg.propIds.forEach((propId, index) => {
                let icon = IconPool.getIcon();
                icon.uiObject.size = icon.rootCanvas.size
                this.mCanvas_Item.addChild(icon.uiObject);
                icon.initProp(cfg, index);
                icon.setNum(count);
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
            //舞蹈详情
            cfg.DanceIds.forEach((danceId, index) => {
                let icon = IconPool.getIcon();
                icon.uiObject.size = icon.rootCanvas.size;
                this.mCanvas_Item.addChild(icon.uiObject);
                icon.initChat(cfg, index);
                this.itemPool.push(icon);
            })
        }

        this.show();

    }
    onHide() {
        this.itemPool.forEach((item) => {
            IconPool.recycleIcon(item);
        });
        this.itemPool.length = 0;
    }
}