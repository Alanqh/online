import { GlobalData } from "../../const/GlobalData";
import BagItem from "./BagItem";
import BagItemData from "./BagItemData";
import BagPanelBase from "./Base/BagPanelBase";
import { BagUIBase } from "./Base/BagUIBase";
import { Layout } from "./Base/IBagUI";
import P_Bag from "./P_Bag";
import P_BagItem from "./P_BagItem";

export default class BagPanel extends BagPanelBase<BagItemData, P_BagItem> {


    initLayout(): Layout {
        let layout = new Layout();
        layout.itemCount = GlobalData.Bag.rowCount;
        layout.itemHeight = GlobalData.Bag.itemHeight;
        layout.itemWidth = GlobalData.Bag.itemWidth;
        layout.itemInterval = GlobalData.Bag.itemInterval;
        layout.leftOffsetX = GlobalData.Bag.leftOffsetX;
        layout.topOffsetY = GlobalData.Bag.topOffsetY;
        this.layout = layout;

        return layout;
    }


    onAddItem(data: BagItemData): BagUIBase<BagItemData, P_BagItem> {
        let ui = mw.UIService.create(P_BagItem);
        this.canvas.addChild(ui.uiObject);
        let item = new BagItem(data, ui, this);
        item.initItem();
        this.itemMap.set(data.key, item);
        return item;
    }


    protected afterRefresh(): void {

    }

    protected afterOneItemRefresh(item: BagUIBase<BagItemData, P_BagItem>): void {
        item.ui.mText_Number.text = item.data.count.toString();
    }


    /**清除所有选中状态 */
    public clearAllSelected() {
        this.itemMap.forEach((item, k) => {
            item.ui.setUnselected();
        })
    }
}