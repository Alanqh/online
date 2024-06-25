import { IFindElement } from "../../../config/Find";
import { GameConfig } from "../../../config/GameConfig";
import Collect3D_UI_Generate from "../../../ui-generate/ShareUI/Find相关UI/Collect3D_UI_generate";
import { CollectionUI } from "./ui/CollectionUI";

@Component
export default class FindModel extends Script {

    private _ui: Collect3D_UI_Generate;

    public cfg: IFindElement;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener("FindModel", (guid: string) => {
            if (this.gameObject.gameObjectId != guid) {
                return;
            }
            UIService.show(CollectionUI, GameConfig.Find.getElement(Number(this.gameObject.name)));
        })
    }

    public setIsFind(isFind: boolean) {
        if (!this._ui) {
            this._ui = UIService.create(Collect3D_UI_Generate);
        }
        const uiwdiget = this.gameObject.getChildByName("uiwidget") as UIWidget;
        uiwdiget.setTargetUIWidget(this._ui.uiWidgetBase);
        uiwdiget.occlusionEnable = false;
        if (isFind) {
            this._ui.txt_name.text = this.cfg.name;
            this._ui.img_not.visibility = SlateVisibility.Collapsed;
            this._ui.img_yes.visibility = SlateVisibility.SelfHitTestInvisible;
            this.gameObject.getChildByName("model")?.setVisibility(PropertyStatus.On, true);
        }
        else {
            this._ui.txt_name.text = this.cfg.name;
            this._ui.img_not.visibility = SlateVisibility.SelfHitTestInvisible;
            this._ui.img_yes.visibility = SlateVisibility.Collapsed;
            this.gameObject.getChildByName("model")?.setVisibility(PropertyStatus.Off, true);
        }
    }
}