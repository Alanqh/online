import { IDressTabElement } from "../../../config/DressTab";
import { GameConfig } from "../../../config/GameConfig";
import DressTab2UINode from "./DressTab2UINode";
import P_DressTab1 from "./P_DressTab1";


export default class DressTab1UINode {

    /**二级页签节点 */
    public tab2NodeList: DressTab2UINode[] = [];
    /**页签UI */
    public tab1UI: P_DressTab1;
    /**配置 */
    public conf: IDressTabElement;

    constructor(tab1Conf: IDressTabElement) {
        this.conf = tab1Conf;
        // 初始化页签UI
        this.tab1UI = UIService.create(P_DressTab1);
        this.tab1UI.init(tab1Conf);
        // 创建二级页签
        tab1Conf.childTabId.forEach((tabId) => {
            let dressConf = GameConfig.DressTab.getElement(tabId);
            let tab2Node = new DressTab2UINode(dressConf);
            this.tab2NodeList.push(tab2Node);
        });
    }


}