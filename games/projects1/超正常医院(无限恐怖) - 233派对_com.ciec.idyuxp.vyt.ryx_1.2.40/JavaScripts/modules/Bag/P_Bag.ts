import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { GlobalData } from "../../const/GlobalData";
import Bag_Generate from "../../ui-generate/Porp/Bag_generate";
import BagModuleC, { SelectType } from "./BagModuleC";
import BagPanel from "./BagPanel";
import P_BagItem from "./P_BagItem";

export default class P_Bag extends Bag_Generate {

    /**正在播放背包UI动画 */
    public isPlayingTweenCount: number = 0;
    /**背包模块 */
    private bagMC: BagModuleC;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.bagMC = ModuleService.getModule(BagModuleC);
        this.mText_RemainTime.visibility = SlateVisibility.Collapsed;
    }

    protected onShow(...params: any[]): void {
        this.setSelect(false);
    }

    /**携带道具UI */
    public setCarryPropUI(panel: BagPanel, equipKeys: number[]) {

        panel.itemMap.forEach((v, k) => {
            // 设置装备状态UI
            if (equipKeys.indexOf(k) != -1) {
                v.ui.setCarrying(true);
            } else {
                v.ui.setCarrying(false);
            }
        })
    }

    /**设置背包道具数量 */
    public setBagItemCount(count: number) {
        this.mTextBlock_Number.text = `${count}/${GlobalData.Bag.bagMaxSize}`
        this.mTextBlock_Number.fontColor = count >= GlobalData.Bag.bagMaxSize ? LinearColor.colorHexToLinearColor(GlobalData.Bag.bagFullColor) : LinearColor.colorHexToLinearColor(GlobalData.Bag.bagDefaultColor);
    }


    /**设置选中状态与非选中状态的UI */
    public setSelect(isSelect: boolean, conf?: IItemElement) {
        if (isSelect) {
            this.mBtn_Equip.enable = conf.IsInItem;
            this.mBtn_Use.enable = conf.IsUse;
            this.mCanvas_Item.visibility = SlateVisibility.HitTestInvisible;
        } else {
            this.mBtn_Equip.enable = false;
            this.mBtn_Use.enable = false;
            this.mCanvas_Item.visibility = SlateVisibility.Collapsed;
            // 描述和名称设置为默认
            this.mTextBlock_Name.text = GameConfig.Language.Bag_Text_2.Value;
            this.mTextBlock_Discribe.text = GameConfig.Language.Bag_Text_3.Value;
        }
    }

    /**根据携带状态设置按钮文字 */
    public setBtnTextByCarryingState(itemUI: P_BagItem) {
        if (itemUI.isCarrying) {
            this.mBtn_Equip.text = GameConfig.Language.Bag_Text_5.Value;
        } else {
            this.mBtn_Equip.text = GameConfig.Language.Bag_Text_4.Value;
        }
    }

}