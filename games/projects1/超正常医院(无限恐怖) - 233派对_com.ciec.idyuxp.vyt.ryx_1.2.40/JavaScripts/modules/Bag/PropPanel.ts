import { GlobalData } from "../../const/GlobalData";
import BagItemData from "./BagItemData";
import BagPanelBase from "./Base/BagPanelBase";
import { BagUIBase } from "./Base/BagUIBase";
import { Layout } from "./Base/IBagUI";
import P_PropItem from "./P_PropItem";
import PropItem from "./PropItem";
import { PropItemData } from "./PropItemData";


export default class PropPanel extends BagPanelBase<PropItemData, P_PropItem> {
    
    /**向背包canvas中添加元素 */
    onAddItem(data: PropItemData): BagUIBase<PropItemData, P_PropItem> {
        let ui = mw.UIService.create(P_PropItem);
        this.canvas.addChild(ui.uiObject);
        let item = new PropItem(data, ui, this);
        item.initItem();
        this.itemMap.set(data.key, item);
        return item;
    }
    
    /**布局设置 */
    initLayout(): Layout {
        let layout = new Layout();
        layout.itemCount = GlobalData.Prop.rowCount;
        layout.itemHeight = GlobalData.Prop.itemHeight;
        layout.itemWidth = GlobalData.Prop.itemWidth;
        layout.itemInterval = GlobalData.Prop.itemInterval;
        layout.leftOffsetX = GlobalData.Prop.leftOffsetX;
        layout.topOffsetY = GlobalData.Prop.topOffsetY;
        this.layout = layout;

        return layout;
    }

    protected afterOneItemRefresh(item: BagUIBase<PropItemData, P_PropItem>): void {
        item.ui.mText_Number.text = item.data.count.toString();
    }
}