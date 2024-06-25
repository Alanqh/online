
import { IDressTabElement } from "../../../config/DressTab";
import { GlobalData } from "../../../const/GlobalData";
import DresstTab_1_Generate from "../../../ui-generate/Dress/DresstTab_1_generate";
import P_DressItem from "./P_DressItem";
import P_SelfDress from "./P_SelfDress";

export default class P_DressTab1 extends DresstTab_1_Generate {

    /**装饰Map */
    public dressMap: Map<number, P_DressItem> = new Map();
    /**配置 */
    public conf: IDressTabElement;
    /**个人装扮UI */
    public selfDressUI: P_SelfDress;
    /**是否被选中 */
    private _isSelected: boolean = null;
    public get isSelected(): boolean {
        return this._isSelected;
    }
    public set isSelected(value: boolean) {
        this.setSelected(value);
        this._isSelected = value;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**初始化一级页签 */
    public init(conf: IDressTabElement) {
        this.conf = conf
        this.mText_TagName.text = conf.tabName;
        this.isSelected = false;
    }


    /**设置选中状态 */
    private setSelected(isSelected: boolean) {
        if (isSelected) {
            // 选中
            this.mImage_Select_1_1.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mText_TagName.fontColor = LinearColor.colorHexToLinearColor(GlobalData.DressUp.tab1SelectFontColor);
        } else {
            // 未选中
            this.mImage_Select_1_1.visibility = SlateVisibility.Collapsed;
            this.mText_TagName.fontColor = LinearColor.colorHexToLinearColor(GlobalData.DressUp.tab1UnselectFontColor);
        }
    }
}