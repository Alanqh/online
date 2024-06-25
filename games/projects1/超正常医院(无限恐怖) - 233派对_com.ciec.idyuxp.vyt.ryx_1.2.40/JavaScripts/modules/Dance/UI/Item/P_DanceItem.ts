
import { IChatElement } from "../../../../config/Chat";
import { GlobalData } from "../../../../const/GlobalData";
import { ShopModuleC } from "../../../Shop/ShopModuleC";
import DanceItem_Generate from "../../../../ui-generate/Dress/DanceItem_generate";

export default class P_DanceItem extends DanceItem_Generate {

    public curCfg: IChatElement;

    public init(cfg: IChatElement) {
        this.curCfg = cfg;
        this.mText_ExpressionName.text = cfg.Name;
        this.mButton_Click.touchMethod = ButtonTouchMethod.PreciseTap;
        this.mButton_Click.onClicked.add(() => {
            if (GlobalData.Dance.lastClickDanceTime && (new Date().getTime() - GlobalData.Dance.lastClickDanceTime) < GlobalData.Dance.danceBtnCD * 1000) return
            GlobalData.Dance.lastClickDanceTime = new Date().getTime();
            GlobalData.Dance.onPlayAnim.call(cfg.AssetGuid);
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