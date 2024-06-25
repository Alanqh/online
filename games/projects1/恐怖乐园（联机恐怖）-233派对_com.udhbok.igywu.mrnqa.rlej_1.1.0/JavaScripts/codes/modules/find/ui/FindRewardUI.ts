import { GameConfig } from "../../../../config/GameConfig";
import CongratuItem_UI_Generate from "../../../../ui-generate/ShareUI/props/CongratuItem_UI_generate";
import Congratulations_UI_Generate from "../../../../ui-generate/ShareUI/props/Congratulations_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { GridContainer } from "../../../utils/UIPool";
import { BagDefine } from "../../bag/BagDefine";
import { UIDisplayItem } from "../../store/ui/UIGiftDisplay";
import { FindData } from "../FindData";
import { FindModuleC } from "../FindModuleC";
import { FindDocumentUI } from "./FindDocumentUI";

export class FindRewardUI extends Congratulations_UI_Generate {
    private _con: GridContainer<UIDisplayItem>;

    onStart() {
        this._con = new GridContainer(this.canvas_items0, UIDisplayItem);
        this.layer = UILayerSystem;
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this)
        })
        this.btn_next.onClicked.add(() => {
            UIService.hideUI(this)
        })
        this.btn_know.onClicked.add(() => {
            UIService.hideUI(this)
        })
        this.btn_open.onClicked.add(() => {
            UIService.hideUI(this)
        })
    }

    onShow(itemDataArr: number[][]) {
        this.canvas_1.visibility = SlateVisibility.Collapsed;
        this.canvas_3.visibility = SlateVisibility.SelfHitTestInvisible;
        this._con.removeAllNode();
        for (let i = 0; i < itemDataArr.length; ++i) {
            const data = itemDataArr[i];
            let item = this._con.addNode();
            let itemData = GameConfig.Item.getElement(data[0])
            item.setData(itemData.icon, `${BagDefine.extractTextBeforeRichText(itemData.name)}x${data[1]}`)
        }
        this.text_open.text = LanUtil.getText("UI_shop_08")
    }

    onHide() {
        const module = ModuleService.getModule(FindModuleC);
        if (module.curGuide == 2) {
            UIService.getUI(FindDocumentUI).startGuide();
        }
    }
}