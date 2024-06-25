import { IDressTabElement } from "../../config/DressTab";
import { GameConfig } from "../../config/GameConfig";
import { PlayerModuleData } from "../Player/PlayerModuleData";
import { DressUpItemData, DressUpNode1Data, DressUpNode2Data, DressUpTab1, DressUpTab2 } from "./DressData";


export default class DressUpModuleData extends Subdata {

    /** 一级页签数据列表 */
    @Decorator.persistence()
    node1DataList: DressUpNode1Data[] = [];

    public onDressChange: Action = new Action();

    protected initDefaultData(): void {
        let confs = GameConfig.DressTab.getAllElement();
        confs.forEach((tabConf) => {
            if (tabConf.tabLevel == 1) {
                this.node1DataList.push(new DressUpNode1Data(tabConf));
                console.warn(`初始化一级页签数据: ${tabConf.tabName}`);
            } else if (tabConf.tabLevel == 2) {
                tabConf.SourceId.forEach(id => {
                    this.defaultUnlock(id, tabConf.id);
                });
            }
        })
    }

    protected onDataInit(): void {
        let confs = GameConfig.DressTab.getAllElement();
        confs.forEach((tabConf) => {
            if (tabConf.tabLevel == 1) {
                let tab1Data = this.getTab1Data(tabConf.id);
                // 检查是否有新增一级页签
                if (tab1Data == null) {
                    tab1Data = new DressUpNode1Data(tabConf);
                    this.node1DataList.push(tab1Data);
                    tab1Data.tab2NodeList.forEach(tab2Data => {
                        let tab2Conf = GameConfig.DressTab.getElement(tab2Data.tab2Type);
                        tab2Conf.SourceId.forEach(id => {
                            this.defaultUnlock(id, tab2Data.tab2Type);
                        })
                    })
                    return console.warn(`没有一级页签，初始化一级页签数据: ${tabConf.tabName}`);
                }
                // 检查是否有新增二级页签
                tabConf.childTabId.forEach((tab2Id) => {
                    // 新的页签
                    if (this.checkTab2Exist(tab2Id) == false) {
                        tab1Data.tab2NodeList.push(new DressUpNode2Data(GameConfig.DressTab.getElement(tab2Id)));
                        let tab2Conf = GameConfig.DressTab.getElement(tab2Id);
                        tab2Conf.SourceId.forEach(id => {
                            this.defaultUnlock(id, tab2Id);
                        })
                        console.warn(`没有二级页签，初始化二级页签数据: ${tabConf.tabName}`);
                    }
                })
            }
        })
    }

    /**检查二级页签是否已存在 */
    private checkTab2Exist(tab2Type: DressUpTab2): boolean {
        let node1Data = this.node1DataList;
        // 遍历一级页签
        for (let i = 0; i < node1Data.length; i++) {
            const node2Data = node1Data[i].tab2NodeList;
            // 遍历二级页签
            for (let j = 0; j < node2Data.length; j++) {
                if (node2Data[j].tab2Type == tab2Type) {
                    return true;
                }
            }
        }
        return false;
    }

    /**获取一级页签类型 */
    private getTab1Data(tab1Type: DressUpTab1): DressUpNode1Data {
        let conf = GameConfig.DressTab.getElement(tab1Type);
        // 数据不脏直接返回
        let data = this.node1DataList.find(value => value.tab1Type == tab1Type);
        if (data) return data;
        // 处理脏数据
        for (let i = 0; i < this.node1DataList.length; i++) {
            for (let j = 0; j < this.node1DataList[i].tab2NodeList.length; j++) {
                if (conf.childTabId.includes(this.node1DataList[i].tab2NodeList[j].tab2Type)) {
                    let data = this.node1DataList[i];
                    data.tab1Type = tab1Type;
                    return data;
                }
            }
        }
        return null;
    }

    private defaultUnlock(dressId: number, tab2Id: number) {
        let dressConf = GameConfig.Dress.getElement(dressId);
        // 默认解锁
        if (dressConf.isUnlock) {
            let dressData = new DressUpItemData(dressConf.id, tab2Id);
            dressData.id = dressConf.id;
            dressData.isEquip = false;
            this.addDress(dressData);
            console.warn(`默认解锁：${dressConf.Name}`);
        }
    }

    /**根据二级页签获取当前装备的装扮 */
    public getCurDressByTab2(tab2Type: DressUpTab2): DressUpItemData {
        let node1Data = this.node1DataList;
        // 遍历一级页签
        for (let i = 0; i < node1Data.length; i++) {
            const node2Data = node1Data[i].tab2NodeList;
            // 遍历二级页签
            for (let j = 0; j < node2Data.length; j++) {
                if (node2Data[j].tab2Type == tab2Type) {
                    const dressItemList = node2Data[j].dressItemList;
                    // 遍历装扮
                    for (let k = 0; k < dressItemList.length; k++) {
                        if (dressItemList[k].isEquip) return dressItemList[k];
                    }
                }
            }
        }
        return null;
    }

    /**根据装扮id设置装扮为装备状态 (卸载的话dressId传-1)*/
    public setDressEquip(dressId: number, tab2Type: DressUpTab2) {
        // console.warn("设置装备装扮: " + dressId + " 页签: " + tab2Type);
        // 一级页签
        for (let i = 0; i < this.node1DataList.length; i++) {
            const node1Data = this.node1DataList[i];
            // 二级页签
            for (let j = 0; j < this.node1DataList[i].tab2NodeList.length; j++) {
                const tab2Node = node1Data.tab2NodeList[j];
                if (tab2Node.tab2Type == tab2Type) {
                    // 装扮列表
                    for (let k = 0; k < tab2Node.dressItemList.length; k++) {
                        const dressItem = tab2Node.dressItemList[k];
                        if (dressItem.id == dressId) {
                            dressItem.isEquip = true;

                            console.log('装备装扮: ' + dressItem.id);
                        } else {
                            dressItem.isEquip = false;
                        }
                    }
                }
            }
        }
    }

    /**获取当前拥有装扮id列表 */
    public getDressDataList(): DressUpItemData[] {

        let dressDataList: DressUpItemData[] = [];
        let node1Data = this.node1DataList;
        // 遍历一级页签
        for (let i = 0; i < node1Data.length; i++) {
            const node2Data = node1Data[i].tab2NodeList;
            // 遍历二级页签
            for (let j = 0; j < node2Data.length; j++) {
                const dressItemList = node2Data[j].dressItemList;
                // 遍历装扮
                for (let k = 0; k < dressItemList.length; k++) {
                    dressDataList.push(dressItemList[k]);
                }
            }
        }
        return dressDataList;
    }

    /**新增装扮 */
    public addDress(dressData: DressUpItemData) {
        let node1Data = this.node1DataList;
        let tab2Type = dressData.type;
        // 遍历一级页签
        for (let i = 0; i < node1Data.length; i++) {
            const node2Data = node1Data[i].tab2NodeList;
            // 遍历二级页签
            for (let j = 0; j < node2Data.length; j++) {
                const dressItemList = node2Data[j].dressItemList;

                if (node2Data[j].tab2Type == tab2Type) {
                    dressItemList.push(dressData);
                    console.log(`添加装扮: ${dressData.id}`);
                }
            }
        }
    }


    /**通过Id获取当前拥有的装扮 */
    public getDressById(id: number) {
        let dressDataList = this.getDressDataList();
        for (let i = 0; i < dressDataList.length; i++) {
            if (dressDataList[i].id == id) {
                return dressDataList[i];
            }
        }
        return null;
    }

}