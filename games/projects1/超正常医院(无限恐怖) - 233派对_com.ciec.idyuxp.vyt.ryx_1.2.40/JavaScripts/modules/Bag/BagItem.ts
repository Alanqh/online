import { GameConfig } from "../../config/GameConfig";
import { IItemElement } from "../../config/Item";
import { utils } from "../../utils/uitls";
import BagItemData from "./BagItemData";
import BagModuleC, { SelectType } from "./BagModuleC";
import { BagUIBase } from "./Base/BagUIBase";
import P_Bag from "./P_Bag";
import P_BagItem, { BagItemStatus } from "./P_BagItem";

export default class BagItem extends BagUIBase<BagItemData, P_BagItem> {

    private bagMC: BagModuleC = null;

    private conf: IItemElement;

    initItem(): void {
        this.ui.uiObject.position = this.calcuItemPos(this.count);
        this.bagMC = ModuleService.getModule(BagModuleC);

        this.conf = GameConfig.Item.getElement(this.data.id);
        // utils.setIconByAssetId(this.ui.mIcon, conf.guid);
        this.ui.mIcon.imageGuid = this.conf.Icon.toString();
        this.ui.mBtn.onPressed.add(this.onClickItem.bind(this));
    }

    /**背包Item UI 点击事件 */
    private onClickItem() {
        this.ui.clickTween();
        let selectType = this.bagMC.curSelectType;
        let curSelectKeyLs = this.bagMC.curSelectKeys;
        this.ui.setRemainTime();
        let bagUI = UIService.getUI(P_Bag);
        switch (selectType) {
            case SelectType.Single:
                // 取消选中
                if (this.ui.selectStatus == BagItemStatus.Selected) {
                    this.ui.setUnselected();
                    curSelectKeyLs.length = 0;
                    // 设置装备按钮状态
                    bagUI.setSelect(false);
                    this.setBagUIBySelect(null, bagUI);
                }
                // 选中
                else {
                    // 其它按钮设置为非选中态
                    curSelectKeyLs.forEach((selectKey) => {
                        if (!this.panel.itemMap.get(selectKey)) return;
                        this.panel.itemMap.get(selectKey).ui.setUnselected();
                    })
                    bagUI.setSelect(true, this.conf);
                    // 当前按钮设置为选中态
                    this.ui.setSelected();
                    
                    curSelectKeyLs.length = 0;
                    curSelectKeyLs.push(this.data.key);
                    // 设置装备按钮状态
                    if (this.ui.isCarrying == true) {
                        bagUI.mBtn_Equip.text = GameConfig.Language.Bag_Text_5.Value;
                    } else {
                        bagUI.mBtn_Equip.text = GameConfig.Language.Bag_Text_4.Value;
                    }
                    this.setBagUIBySelect(this.data.id, bagUI);
                    // bagUI.mBtn_Use.enable = this.conf.IsUse;
                    // bagUI.mBtn_Equip.enable = this.conf.IsInItem;
                    console.log(`选中${this.conf.Name}, 是否可使用：${this.conf.IsUse}`)
                }
                break;
            case SelectType.Multiple:
                // // 取消选中
                // if (this.ui.selectStatus == BagItemStatus.Selected) {
                //     this.ui.setUnselected();
                //     let index = curSelectKeyLs.indexOf(this.data.key);
                //     curSelectKeyLs.splice(index, 1);
                //     // 如果当前没有道具被选中
                //     if (curSelectKeyLs.length == 0) {
                //         bagUI.setBtnVisible(bagUI.mButton_Sell, false);
                //         this.setBagUIBySelect(null, bagUI);
                //     } else {
                //         let lastKey = curSelectKeyLs[curSelectKeyLs.length - 1];
                //         let lastId = this.bagMC.getIdByKey(lastKey);
                //         this.setBagUIBySelect(lastId, bagUI);
                //     }
                // }
                // // 选中
                // else {
                //     bagUI.setBtnVisible(bagUI.mButton_Sell, true);
                //     this.ui.setSelected();
                //     curSelectKeyLs.push(this.data.key);
                //     this.setBagUIBySelect(this.data.id, bagUI);
                // }
                break;
            default:
                break;
        }
    }

    /**
     * 根据当前选中道具，设置描述UI
     * @param selectId 选中道具id
     * @param bagUI 背包ui
     */
    private setBagUIBySelect(selectId: number, bagUI: P_Bag) {
        let conf = GameConfig.Item.getElement(selectId);
        if (selectId == null) {
            // 描述和名称设置为默认
            bagUI.mTextBlock_Name.text = GameConfig.Language.Bag_Text_2.Value;
            bagUI.mTextBlock_Discribe.text = GameConfig.Language.Bag_Text_3.Value;
            // 装备按钮设置为不可点击
            bagUI.setSelect(false);
        } else {
            // 设置描述和名称
            bagUI.mTextBlock_Name.text = conf.Name;
            bagUI.mTextBlock_Discribe.text = conf.Describe;
            // 装备按钮设置为可点击
            bagUI.setSelect(true, conf);
            // 设置图片
            bagUI.mImg_Item.imageGuid = conf.Icon;
        }
    }






}