import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import UITools from "../../utils/UI/UITools";
import PropModuleC from "../Prop/PropModuleC";
import BagItemData from "./BagItemData";
import BagModuleData from "./BagModuleData";
import BagModuleS from "./BagModuleS";
import BagPanel from "./BagPanel";
import P_Bag from "./P_Bag";
import P_PropBar from "./P_PropBar";
import { PropItemData } from "./PropItemData";
import PropPanel from "./PropPanel";

/**选择状态 */
export enum SelectType {
    /**单选 */
    Single,
    /**多选 */
    Multiple,
}

export default class BagModuleC extends ModuleC<BagModuleS, BagModuleData> {

    /**道具栏UI */
    private propBarUI: P_PropBar;
    /**当前装备的道具id */
    public curPropKey = null;
    /**道具栏容器 */
    public propBarPanel: PropPanel;
    /**当前装备道具的key */
    public curEquipKey: number = null;
    /**背包UI */
    private bagUI: P_Bag;
    /**背包道具列表 */
    public bagItemList: BagItemData[] = [];
    /**背包容器 */
    public bagPanel: BagPanel;
    /**携带道具 */
    public onCarry: Action1<number> = new Action1();
    /**取消携带道具 */
    public onCancelCarry: Action1<number> = new Action1();
    /**装备道具事件 参数为道具id */
    public onEquipProp: Action1<number> = new Action1();
    /**卸载道具事件 */
    public onUnequipProp: Action = new Action();
    /**更换道具事件 参数为道具id */
    public onChangeProp: Action1<number> = new Action();
    /**添加道具事件 参数为道具id */
    public onAddProp: Action1<number> = new Action1();
    /**当前选择模式 */
    public curSelectType: SelectType = SelectType.Single;
    /**当前选中的道具key */
    public curSelectKeys: number[] = [];
    /**道具模块 */
    private propMC: PropModuleC = null;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.propMC = ModuleService.getModule(PropModuleC);
        // 道具栏canvas
        this.propBarUI = mw.UIService.getUI(P_PropBar);
        this.propBarPanel = new PropPanel(this.propBarUI.mPropCanvas);
        // 背包canvas
        this.bagUI = mw.UIService.getUI(P_Bag);
        this.bagPanel = new BagPanel(this.bagUI.mCanvas_Clothes);


        this.onEquipProp.add(this.equipProp.bind(this));
        this.onUnequipProp.add(this.unequipProp.bind(this));
        this.onChangeProp.add(this.changeProp.bind(this));
        // 使用
        this.bagUI.mBtn_Use.onClicked.add(() => {
            let id = this.getIdByKey(this.curSelectKeys[0]);
            let conf = GameConfig.Item.getElement(id);
            if (conf == null) return;
            // 能装备的道具才先装备再使用
            if (conf.IsInItem) this.onEquipProp.call(this.curSelectKeys[0]);
            this.propMC.useProp(id, this.curSelectKeys[0]);
        })
        // 隐藏背包
        this.bagUI.mButton_Close.onClicked.add(() => {
            this.curSelectKeys.length = 0;
            UITools.playCloseTween(this.bagUI);
            this.bagPanel.clearAllSelected();
        })
        // 装备卸载
        this.bagUI.mBtn_Equip.onClicked.add(() => {
            this.carryBagProp();
        });
        // data改变时，刷新背包
        this.data.onDataChange.add(() => {
            this.net_refreshBag();
        })
        console.log("bagModuleC初始化成功");
    }

    protected onEnterScene(sceneType: number): void {
        this.initUI();
    }

    /**初始化UI */
    private initUI() {
        // 初始化背包UI
        this.bagPanel.refreshPanel(this.data.bagItemList);
        this.bagUI.setCarryPropUI(this.bagPanel, this.data.carryItemList.map((item) => item.key));
        this.bagUI.setBagItemCount(this.data.bagItemList.length);

        // 初始化道具栏UI

        this.propBarPanel.refreshPanel(this.parseToPropItemData(this.data.carryItemList));
    }

    /**携带背包道具 */
    public async carryBagProp() {
        // 如果当前没有选中道具
        if (this.curSelectKeys.length == 0) {
            UITools.ShowSoftTips("请选择道具！");
            return;
        }
        // // 如果当前装备已满
        // if (this.propBarPanel.itemMap.size >= GlobalData.Bag.propBarMaxSize) {
        //     UITools.ShowSoftTips("道具栏已满！");
        //     return;
        // }

        // 设置当前装备道具数据
        let isSuccess = await this.server.net_setCarryProps(this.curSelectKeys);
        if (isSuccess) {
            let curCarryProps = this.parseToPropItemData(this.data.carryItemList);
            // 刷新道具栏UI
            this.propBarPanel.refreshPanel(curCarryProps);
            // 刷新背包UI
            this.bagPanel.refreshPanel(this.data.bagItemList);
            // 设置背包UI装备状态
            this.bagUI.setCarryPropUI(this.bagPanel, this.data.carryItemList.map((item) => item.key));
            // 取消选中状态
            // this.curSelectKeys = [];
            // 设置背包UI
            let key = this.curSelectKeys[0];
            this.bagUI.setBtnTextByCarryingState(this.bagPanel.itemMap.get(key).ui);
        } else {
            // UITools.ShowSoftTips(GameConfig.Language.Bag_Text_7.Value);
            console.error("lmn error 服务端携带道具失败, selectProps = " + this.curSelectKeys.join(","), "carryProps = " + this.data.carryItemList.join(","));
        }
    }


    /**在背包中新增道具 */
    public async addPropToBag(id: number): Promise<boolean> {

        if (this.propBarPanel.itemMap.size >= GlobalData.Bag.bagMaxSize) {
            return false;
        }
        this.server.net_addPropToBag(id);

        return true;
    }

    /**成功添加道具到背包 */
    public net_onSeccessAdd() {
        // 刷新背包UI
        this.bagPanel.refreshPanel(this.data.bagItemList);
        this.bagUI.setBagItemCount(this.data.bagItemList.length);
        // 刷新道具栏UI
        this.propBarPanel.refreshPanel(this.parseToPropItemData(this.data.carryItemList));
        // 设置背包UI装备状态
        this.bagUI.setCarryPropUI(this.bagPanel, this.data.carryItemList.map((item) => item.key));
    }


    /**删除道具 */
    public delPropFromBag(key: number) {
        // 如果已装备先卸载 再删除
        if (this.curPropKey == key) {
            this.onUnequipProp.call();
        }
        this.server.net_delPropFromBag(key);
    }

    /**成功删除 */
    public net_onSeccessDel() {
        // 刷新背包UI
        this.bagPanel.refreshPanel(this.data.bagItemList);
        this.bagUI.setBagItemCount(this.data.bagItemList.length);
        this.propBarPanel.refreshPanel(this.parseToPropItemData(this.data.carryItemList));
        // 取消选中状态
        this.curSelectKeys.length = 0;
        this.bagUI.setSelect(false);
    }


    /**装备道具 */
    private async equipProp(key: number) {
        let equipItem = this.propBarPanel.itemMap.get(key);
        if (equipItem == null) return;
        // await this.server.net_equipProp(key);
        equipItem.ui.mSelect.visibility = mw.SlateVisibility.Visible;
        // this.propBarUI.mBtn_Action.fanShapedValue = 1
        this.curPropKey = key;
    }


    /**卸载道具 */
    private async unequipProp() {
        // await this.server.net_unequipProp();
        let equipItem = this.propBarPanel.itemMap.get(this.curPropKey);
        if (equipItem) {
            equipItem.ui.mSelect.visibility = mw.SlateVisibility.Hidden;
        }
        this.curPropKey = null;
    }


    /**更换道具 */
    private async changeProp(key: number) {
        // await this.server.net_changeProp(key);
        let equipItem = this.propBarPanel.itemMap.get(this.curPropKey);
        if (equipItem) {
            equipItem.ui.mSelect.visibility = mw.SlateVisibility.Hidden;
        }

        equipItem = this.propBarPanel.itemMap.get(key);
        equipItem.ui.mSelect.visibility = mw.SlateVisibility.Visible;
        this.curPropKey = key;
    }

    /**通过key获得对应的id */
    public getIdByKey(key: number): number {
        let bagItem = this.bagPanel.itemMap.get(key);
        return bagItem?.data.id;
    }


    /**检查玩家背包是否有对应id的道具, 返回对应的id */
    public getPropKeyById(propId: number) {
        let bagData = this.data.bagItemList.find((value) => {
            return value.id == propId;
        });
        return bagData ? bagData.key : -1;
    }

    /**查看背包是否已满 */
    public checkBagIsFull(): boolean {
        return this.propBarPanel.itemMap.size >= GlobalData.Bag.bagMaxSize;
    }



    private parseToPropItemData(bagData: BagItemData[]): PropItemData[] {
        let propItemDataLs = []
        bagData.forEach((bagItem) => {

            let propItemData = new PropItemData(bagItem.key, bagItem.id, bagItem.count);
            propItemDataLs.push(propItemData);
        })
        return propItemDataLs;
    }


    // -----------------------net方法------------------------------
    /**刷新背包 */
    public net_refreshBag() {
        // 刷新背包和道具栏容器
        this.bagPanel.refreshPanel(this.data.bagItemList);
        this.propBarPanel.refreshPanel(this.parseToPropItemData(this.data.carryItemList));
        // 设置背包道具数量
        this.bagUI.setBagItemCount(this.data.bagItemList.length);
        // 取消选中
        this.curSelectKeys.length = 0;
        this.bagUI.setSelect(false);
        // 设置背包UI装备状态
        this.bagUI.setCarryPropUI(this.bagPanel, this.data.carryItemList.map((item) => item.key));
    }


    /**删除道具 */
    public net_delProp(key: number, tips?: string) {
        this.delPropFromBag(key);
        if (tips && tips != "") {
            UITools.ShowSoftTips(tips);
        }
    }


    /** 显示拾取提示信息 */
    public net_showTips(str: string) {
        UITools.ShowSoftTips(str);
    }

    /**把道具栏装备放回背包回调 */
    public net_onUnequipProp(key: number) {
        console.log(`当前装备的key:${this.propMC.curEquipPropKey}, 卸载的key: ${key}`);
        if (this.propMC.curEquipPropKey == key) {
            this.onUnequipProp.call();
        }
    }

}