import { IChatElement } from "../../../../config/Chat";
import { GlobalData } from "../../../../const/GlobalData";
import { ShopModuleC } from "../../../Shop/ShopModuleC";
import ExpressionItem_Generate from "../../../../ui-generate/Dress/ExpressionItem_generate";


export default class P_ExpressionItem extends ExpressionItem_Generate {

    public curCfg: IChatElement;

    public init(cfg: IChatElement) {
        this.curCfg = cfg;
        this.mText_ExpressionName.text = cfg.Name;
        this.mButton_Click.touchMethod = ButtonTouchMethod.PreciseTap;
        this.mImage_Pic.imageGuid = cfg.Icon;
        this.mButton_Click.onClicked.add(() => {
            if (GlobalData.Dance.lastClickExpressionTime && (new Date().getTime() - GlobalData.Dance.lastClickExpressionTime) < GlobalData.Dance.expressionBtnCD * 1000) return
            GlobalData.Dance.lastClickExpressionTime = new Date().getTime();
            GlobalData.Dance.onPlayExpression.call(cfg.AssetGuid);
        })

        this.refresh();
    }

    public refresh() {
        let id = ModuleService.getModule(ShopModuleC).getShopItemIDByChatID(this.curCfg.ID)
        let isLock: boolean = id == null;
        this.mButton_Click.enable = !isLock;
        this.mLock_Canvas.visibility = isLock ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }
}