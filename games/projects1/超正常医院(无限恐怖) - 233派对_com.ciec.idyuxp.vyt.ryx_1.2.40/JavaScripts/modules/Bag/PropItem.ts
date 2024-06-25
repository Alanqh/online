import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../utils/uitls";
import BagItemData from "./BagItemData";
import BagModuleC from "./BagModuleC";
import { BagUIBase } from "./Base/BagUIBase";
import P_PropBar from "./P_PropBar";
import P_PropItem from "./P_PropItem";
import { PropItemData } from "./PropItemData";


export default class PropItem extends BagUIBase<PropItemData, P_PropItem> {

    private bagModuleC: BagModuleC;

    /**初始化背包项 */
    initItem(): void {
        this.bagModuleC = ModuleService.getModule(BagModuleC);
        // 计算位置
        this.ui.uiObject.position = this.calcuItemPos(this.count);
        // 设置图标
        let conf = GameConfig.Item.getElement(this.data.id);
        // utils.setIconByAssetId(this.ui.mIcon, conf.guid);
        this.ui.mIcon.imageGuid = conf.Icon.toString();
        // 绑定点击事件
        this.ui.mBtn.onPressed.add(this.onClickItem.bind(this));
    }


    /**点击背包项 */
    private onClickItem() {
        // 设置点击cd
        // this.ui.mSelect.visibility = mw.SlateVisibility.Visible;
        
        // 装备
        if(this.bagModuleC.curPropKey == null){
            
            this.bagModuleC.onEquipProp.call(this.data.key);
            return;
        }
        // 卸载
        if(this.bagModuleC.curPropKey == this.data.key){
            
            this.bagModuleC.onUnequipProp.call();
            return;
        }
        // 更换
        this.bagModuleC.onChangeProp.call(this.data.key);
    }
}