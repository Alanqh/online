import { IDressTabElement } from "../../../config/DressTab";
import { GlobalData } from "../../../const/GlobalData";
import EffectTab_2_Generate from "../../../ui-generate/Dress/EffectTab_2_generate";
import LevelTab_2_Generate from "../../../ui-generate/Shop/LevelTab_2_generate";

/**装饰二级页签 */
export default class P_DressTab2 extends EffectTab_2_Generate {

    /**配置 */
    public conf: IDressTabElement;
    /**是否选中 */
    private _isSelected: boolean = false;
    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(value: boolean) {
        if (value == this._isSelected) return;
        this.setSelected(value);
        this._isSelected = value;
    }

    onStart(){
        this.mBtn_Form.touchMethod = ButtonTouchMethod.PreciseTap;
    }


    init(conf: IDressTabElement) {
        this.conf = conf;
        this.mText_Form.text = conf.tabName;
    }


    /**设置选中状态 */
    setSelected(isSelected: boolean) {
        if (isSelected) {
            this.mText_Form.fontColor = LinearColor.colorHexToLinearColor(GlobalData.DressUp.tab2SelectFontColor);
            this.mImage_Frame.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mText_Form.fontColor = LinearColor.colorHexToLinearColor(GlobalData.DressUp.tab2UnselectFontColor);
            this.mImage_Frame.visibility = SlateVisibility.Collapsed;
        }
    }
}