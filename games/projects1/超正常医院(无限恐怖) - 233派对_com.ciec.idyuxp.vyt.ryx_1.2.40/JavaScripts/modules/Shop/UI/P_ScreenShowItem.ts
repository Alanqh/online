import { GameConfig } from "../../../config/GameConfig";
import { IShopItemElement } from "../../../config/ShopItem";
import { ShopFirstDo, ShopType } from "../../../const/enum";
import { GlobalData } from "../../../const/GlobalData";
import ScreenShowItem_Generate from "../../../ui-generate/Shop/ScreenShow/ScreenShowItem_generate";
import { AnalyticsModuleC } from "../../Analytics/AnalyticsModule";
import { ShopData } from "../ShopData";
import { P_ScreeShow } from "./P_ScreeShow";

/**商城item */
export class P_ScreenShowItem extends ScreenShowItem_Generate {
    id: number;

    private shopData: ShopData = null;
    onStart() {
        this.shopData = DataCenterC.getData(ShopData);
        //this.shopData.onSuccessBuyAC.add(this.buySuccess.bind(this));
    }

    public init(data: IShopItemElement, screenUI: P_ScreeShow, isCanClick: Boolean): void {
        this.mTxt_Price.text = data.price.toString();
        let icon = GameConfig.Item.getElement(data.propIds[0]).Icon;
        this.mImg_Icon.imageGuid = icon;
        this.mImg_Bg.imageGuid = data.ItemBG;
        this.mImg_Coins.imageGuid = "291726";;

        if (isCanClick) {
            this.mBtn_Buy.onClicked.add(() => {
                screenUI.onClickScreenItem.call(ShopType.Hot, data.ID);
                //this.analytics(data.ID);
            });
            this.mBtn_Buy.enable = true;
            this.mBtn_Buy.visibility = SlateVisibility.Visible;
        } else {
            this.mBtn_Buy.enable = false;
            this.mBtn_Buy.visibility = SlateVisibility.SelfHitTestInvisible;
        }

        this.id = data.ID;

        //this.buySuccess(data.ID);
    }


    /**购买成功 */
    private buySuccess(id: number) {
        // if (id != this.id) {
        //     return;
        // }
        // let isOut = this.shopData.isSellOut(this.id);
        // if (!isOut) return;

    }

    /**埋点 */
    private analytics(id: number) {
        switch (id) {
            case 2001:
                //武器
                ModuleService.getModule(AnalyticsModuleC).shopFirstDo(ShopFirstDo.weapon_buy);
                break;
            default:
                break;
        }

    }


}