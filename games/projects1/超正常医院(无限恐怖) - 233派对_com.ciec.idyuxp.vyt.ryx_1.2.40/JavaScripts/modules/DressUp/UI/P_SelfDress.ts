
import { GameConfig } from "../../../config/GameConfig";
import DressEffect_Generate from "../../../ui-generate/Dress/DressEffect_generate";
import P_Guide from "../../Guide/P_Guide";
import { DressUpItemData, DressUpTab2 } from "../DressData";
import DressTab1UINode from "./DressTab1UINode";
import DressTab2UINode from "./DressTab2UINode";
import P_DressItem from "./P_DressItem";

/**个人装扮页面 */
export default class P_SelfDress extends DressEffect_Generate {

    /**所有一级页签 */
    public tab1List: DressTab1UINode[] = [];
    /**一级页签变更事件 参数1. 新页签节点, 参数2. 老页签节点*/
    public onCurSelectTab1ChangeAC: Action2<DressTab1UINode, DressTab1UINode> = new Action();
    /**二级级页签变更事件 参数1. 新页签节点, 参数2. 老页签节点*/
    public onCurSelectTab2ChangeAC: Action2<DressTab2UINode, DressTab2UINode> = new Action();

    /**当前选中的一级页签 */
    private _curSelectTab1: DressTab1UINode = null;
    public get curSelectTab1(): DressTab1UINode {
        return this._curSelectTab1;
    }
    public set curSelectTab1(value: DressTab1UINode) {
        if (this._curSelectTab1 == value) return;
        // 一级页签变更事件
        this.onCurSelectTab1ChangeAC.call(value, this.curSelectTab1);

        console.log("选中一级页签: ", value.conf.tabName);
        this._curSelectTab1 = value;
    }
    /**当前选中的二级页签 */
    private _curSelectTab2: DressTab2UINode = null;
    public get curSelectTab2(): DressTab2UINode {
        return this._curSelectTab2;
    }
    public set curSelectTab2(value: DressTab2UINode) {
        if (this._curSelectTab2 == value) return;
        // 二级页签变更事件
        this.onCurSelectTab2ChangeAC.call(value, this.curSelectTab2);

        console.log("选中二级页签: ", value.conf.tabName);
        this._curSelectTab2 = value;
    }
    /**当前选中的装扮UI */
    private _curSelectDressUI: P_DressItem = null;
    public get curSelectDressUI(): P_DressItem {
        return this._curSelectDressUI;
    }
    public set curSelectDressUI(value: P_DressItem) {
        // 传入null则取消当前选中
        if (value == null) {
            if (this.curSelectDressUI) this.curSelectDressUI.isSelected = false;
            // this._curSelectDressUI = null;
            this.refreshBtn(null);
            return;
        }
        // 重复点击相同dressUI，取消选中
        if (this.curSelectDressUI == value) {
            this._curSelectDressUI = null;
            this.refreshBtn(null);
            value.isSelected = false;
            return;
        }
        // 卸载之前的，装备新的
        value.isSelected = true;
        this.refreshBtn(value);
        this._curSelectDressUI = value;
        console.log(`当前选中装扮为：${value.conf.Name}`);
    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        })
        this.init();
        this.layer = UILayerMiddle;
    }

    private init() {
        // 一级页签变更监听
        this.onCurSelectTab1ChangeAC.add(this.onCurSelectTab1Change.bind(this));
        // 二级页签变更监听
        this.onCurSelectTab2ChangeAC.add(this.onCurSelectTab2Change.bind(this));

        // 初始化一级页签
        GameConfig.DressTab.getAllElement().forEach((conf) => {
            if (conf.tabLevel == 1) {

                let tabNode1 = new DressTab1UINode(conf);
                this.tab1List.push(tabNode1);
                // console.log(`self: 添加一级页签: ${conf.tabName}, pos = ${tabNode1.tab1UI.uiObject.position}`)
                // 添加一级页签到canvas
                this.mCanvas_Tab1.addChild(tabNode1.tab1UI.uiObject);
                // 添加二级页签到canvas
                tabNode1.tab2NodeList.forEach((tabNode2) => {
                    this.mCanvas_Tab_2.addChild(tabNode2.tab2UI.uiObject);
                    tabNode2.tab2UI.uiObject.visibility = SlateVisibility.Collapsed;
                    // tab2UIObj.visibility = SlateVisibility.Collapsed;
                    // console.log(`self: 添加二级页签: ${tabNode2.conf.tabName}`);
                    // 添加装扮item到canvas
                    tabNode2.dressItemList.forEach((item) => {
                        this.mCanvas_Dress.addChild(item.uiObject);
                        item.uiObject.visibility = SlateVisibility.Collapsed;
                        // console.log(`self: 添加${item.conf.Name}`);
                    });
                });
                // 添加一级页签点击事件
                tabNode1.tab1UI.mBtn_Tab.onClicked.add(() => {
                    this.curSelectTab1 = tabNode1;
                });
                // 添加二级页签点击事件
                tabNode1.tab2NodeList.forEach((tab2Node) => {
                    tab2Node.tab2UI.mBtn_Form.onClicked.add(() => {
                        this.curSelectTab2 = tab2Node;
                    })

                    // 添加装扮UI点击事件
                    tab2Node.dressItemList.forEach(dressUI => {
                        dressUI.mbtn.onClicked.add(() => {
                            this.curSelectDressUI = dressUI;
                        })
                    })
                })
            }
        });
        // 添加 装备/卸载 按钮监听
        this.mButton_Equip.onClicked.add(() => {
            if(this.curSelectDressUI == null) return;
            this.curSelectDressUI.isEquip = true;
            this.refreshBtn(this.curSelectDressUI);
        })
        this.mButton_Unequip.onClicked.add(() => {
            if(this.curSelectDressUI == null) return;
            this.curSelectDressUI.isEquip = false;
            this.refreshBtn(this.curSelectDressUI);
        })
    }


    /**当前选中的一级页签改变 */
    private onCurSelectTab1Change(newNode1: DressTab1UINode, oldNode1: DressTab1UINode) {
        // 取消之前一级页签的选中，选中新页签
        if (oldNode1) oldNode1.tab1UI.isSelected = false;
        newNode1.tab1UI.isSelected = true;
        // 隐藏之前的二级页签
        if (oldNode1) {
            oldNode1.tab2NodeList.forEach((tabNode2) => {
                tabNode2.tab2UI.uiObject.visibility = SlateVisibility.Collapsed;
                // console.log(`self: 隐藏${tabNode2.conf.tabName}`);
            });
        } else console.warn(`之前没有选择一级页签`);
        // 显示当前二级页签
        newNode1.tab2NodeList.forEach((tabNode2) => {
            tabNode2.tab2UI.uiObject.visibility = SlateVisibility.Visible;
            // console.log(`self: 显示${tabNode2.conf.tabName}, pos = ${tabNode1.tab1UI.uiObject.position}, visib: ${tabNode2.tab2UI.uiObject.visibility}, parent: ${tabNode2.tab2UI.uiObject.parent.name}, size = ${tabNode2.tab2UI.uiObject.size}`)
        });
        // 默认选中第一个二级页签
        this.curSelectTab2 = newNode1.tab2NodeList[0];
    }

    /**当前选中二级页签改变 */
    private onCurSelectTab2Change(newNode2: DressTab2UINode, oldNode2: DressTab2UINode) {
        // 取消之前页签的选中，选中新页签
        if (oldNode2) oldNode2.tab2UI.isSelected = false;
        newNode2.tab2UI.isSelected = true;
        // 选择新页签中选中的item
        this.curSelectDressUI = newNode2.curSelectDressItem;
        // 隐藏之前装扮item
        if (oldNode2) {
            oldNode2.dressItemList.forEach((item) => {
                item.uiObject.visibility = SlateVisibility.Collapsed;
                // console.log(`self: 隐藏${item.conf.Name}`)
            });
        } else console.warn(`之前没有选择二级页签`);
        // 显示新的装扮item
        newNode2.dressItemList.forEach((item) => {
            item.uiObject.visibility = SlateVisibility.Visible;
            // console.log(`self: 显示${item.conf.Name}`)
        });
    }

    /**当前选中的装扮UI改变 */
    public refreshBtn(dressUI: P_DressItem) {
        // 根据当前选中UI的状态，显示按钮
        // 如果取消选中，隐藏所有按钮
        if (dressUI == null) {
            this.showBtnByCurSelectDressUI(null);
            return;
        }
        // 如果是未解锁，显示购买按钮
        if (dressUI.isLock) {
            this.showBtnByCurSelectDressUI(this.mButton_Buy);
            return;
        }
        // 如果是已装备，显示卸载按钮
        if (dressUI.isEquip) {
            this.showBtnByCurSelectDressUI(this.mButton_Unequip);
            return;
        }
        // 如果没装备且已解锁，显示 装备按钮
        this.showBtnByCurSelectDressUI(this.mButton_Equip);
    }


    private btnList: Button[] = [];
    /**根据当前选中的DressUI设置显示的按钮 */
    private showBtnByCurSelectDressUI(btn: Button) {
        this.btnList = [this.mButton_Buy, this.mButton_Equip, this.mButton_Unequip];
        this.btnList.forEach((_btn) => {
            if (_btn == btn) btn.visibility = SlateVisibility.Visible;
            else _btn.visibility = SlateVisibility.Collapsed;
        });
    }


    /**通过id选择一级页签 */
    public selectTab1ById(id: number) {
        let tabNode = this.tab1List.find((node) => {
            return node.conf.id == id;
        });
        if (tabNode) {
            this.curSelectTab1 = tabNode;
        } else {
            console.error("未找到id为", id, "的一级页签");
        }
    }

    /**刷新装扮列表 */
    public refresh(dressDataList: DressUpItemData[], selectEquipedDress: boolean = false) {

        console.warn(`刷新装扮列表，是否选中已装备装扮：${selectEquipedDress}`);
        // 拥有装备集合
        let idSet = new Set<number>();
        dressDataList.forEach((data) => {
            idSet.add(data.id);
        });
        // 装备type-data map
        let equipMap: Map<DressUpTab2, DressUpItemData> = new Map();
        dressDataList.forEach((data) => {
            if (data.isEquip) {
                equipMap.set(data.type, data)
                // console.log("已解锁的道具id: " + data.id, "装备状态：" + data.isEquip, "页签：" + data.type);
            };
        });


        // 设置装扮的 装备和锁定状态
        this.tab1List.forEach((node1) => {
            node1.tab2NodeList.forEach((node2) => {
                let equipData = equipMap.get(node2.conf.id);
                // console.log(`当前页签id: ${node2.conf.id}, 是否装备：${equipData}`);
                node2.dressItemList.forEach((dressUI) => {

                    // 拥有该装扮
                    if (idSet.has(dressUI.conf.id)) {
                        dressUI.isLock = false;
                        dressUI.isEquip = (equipData != null && equipData.id == dressUI.conf.id);
                        // 根据是否装备设置选中状态
                        if (selectEquipedDress && dressUI.isEquip) dressUI.isSelected = true;
                        // console.log(`拥有装扮${dressUI.conf.id}，是否装备：${dressUI.isEquip}, 是否选中：${dressUI.isSelected}`);
                    } else {
                        // 没有该装扮
                        dressUI.isLock = true;
                        dressUI.isEquip = false;
                    }
                });
            });
        })
    }


    protected onShow(...params: any[]): void {
        // 默认选中第一个页签
        this.curSelectTab1 = this.tab1List[0];
        UIService.getUI(P_Guide).hide();
    }


    protected onHide(){
        UIService.getUI(P_Guide).show();
    }
}