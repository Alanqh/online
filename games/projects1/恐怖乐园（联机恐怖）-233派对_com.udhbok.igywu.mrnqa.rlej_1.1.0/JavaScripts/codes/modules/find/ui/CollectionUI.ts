import { IFindElement } from "../../../../config/Find";
import Collection_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Collection_UI_generate";
import { FindData } from "../FindData";
import { FindDocumentUI } from "./FindDocumentUI";

export class CollectionUI extends Collection_UI_Generate {
    private _curCfg: IFindElement;

    onStart() {
        this.btn_back_01.onClicked.add(() => {
            UIService.show(FindDocumentUI, this._curCfg);
            UIService.hideUI(this);
        })
        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this);
        })
    }


    public onShow(cfg: IFindElement) {
        const data = DataCenterC.getData(FindData);
        /** init info */
        this._curCfg = cfg;
        const isFind = data.isFined(cfg.id);
        /** set findInfo */
        if (isFind) {
            this.img_notFinding.visibility = SlateVisibility.Collapsed;
            this.img_findicon.imageColor = LinearColor.white;
            this.txt_findname.text = cfg.name;
            this.txt_findcontent.text = cfg.description;
            this.txt_findbackground.text = cfg.tips
        }
        else {
            this.img_notFinding.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_findicon.imageColor = LinearColor.black;
            this.txt_findname.text = cfg.name;
            this.txt_findcontent.text = "?"
            this.txt_findbackground.text = cfg.tips
        }
        /** set base info */
        this.img_findicon.imageGuid = cfg.icon;
    }
}