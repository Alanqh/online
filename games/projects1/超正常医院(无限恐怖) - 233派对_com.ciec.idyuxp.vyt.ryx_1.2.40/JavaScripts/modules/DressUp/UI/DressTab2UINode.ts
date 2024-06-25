import { IDressElement } from "../../../config/Dress";
import { IDressTabElement } from "../../../config/DressTab";
import { GameConfig } from "../../../config/GameConfig";
import P_DressItem from "./P_DressItem";
import P_DressTab2 from "./P_DressTab2";

/** */
export default class DressTab2UINode {

    /**装饰item列表 */
    public dressItemList: P_DressItem[] = [];
    /**二级页签 */
    public tab2UI: P_DressTab2;
    /**配置项 */
    public conf: IDressTabElement;
    /**当前装备装扮 */
    public curSelectDressItem: P_DressItem = null;
    /**当前装备装扮 */
    public curEquipDressItem: P_DressItem = null;


    constructor(conf: IDressTabElement) {
        this.conf = conf;
        this.tab2UI = UIService.create(P_DressTab2);
        this.tab2UI.init(conf);
        conf.SourceId.forEach((id) => {
            let dressConf = GameConfig.Dress.getElement(id);
            let ui = UIService.create(P_DressItem);
            ui.init(dressConf, this);
            this.dressItemList.push(ui);
            // 监听装备和选择事件
            ui.onSelect.add(this.onSelectDress.bind(this));
            ui.onUnselect.add(this.onUnselectDress.bind(this));
            ui.onEquip.add(this.onEquipDress.bind(this));
            ui.onUnequip.add(this.onUnequipDress.bind(this));
        })
    }

    /**选中装扮item */
    private onSelectDress(value: P_DressItem) {
        // 之前的装备自动取消选择
        if (this.curSelectDressItem) this.curSelectDressItem.isSelected = false;
        this.curSelectDressItem = value;
    }

    /**取消选中装扮item */
    onUnselectDress(value: P_DressItem) {
        this.curSelectDressItem = null;
    }

    /**装备装扮item */
    private onEquipDress(value: P_DressItem) {
        // 之前装备的装扮取消装备
        if (this.curEquipDressItem) this.curEquipDressItem.isEquip = false;
        this.curEquipDressItem = value;
    }

    /**取消装备装扮item */
    private onUnequipDress(value: P_DressItem) {
        this.curEquipDressItem = null;
    }
}