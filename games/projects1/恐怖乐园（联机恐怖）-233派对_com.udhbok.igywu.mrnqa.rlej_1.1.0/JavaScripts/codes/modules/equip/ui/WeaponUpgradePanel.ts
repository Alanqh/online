import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { IItemLevelElement } from "../../../../config/ItemLevel";
import WeaponUpgrade_UI_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/WeaponUpgrade_UI_generate";
import WeaponUpgradeItem_UI_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/WeaponUpgradeItem_UI_generate";
import WSTextItem_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/WSTextItem_generate";
import WUSuccess_UI_Generate from "../../../../ui-generate/ShareUI/weaponupgrade/WUSuccess_UI_generate";
import { EGameTheme, GamesStartDefines } from "../../../Defines";
import GameStart from "../../../GameStart";
import { MainUI } from "../../../ui/MainUI";
import { CommonUtils } from "../../../utils/CommonUtils";
import MusicMgr from "../../../utils/MusicMgr";
import Tips from "../../../utils/Tips";
import { GridContainer, GridSelectContainer } from "../../../utils/UIPool";
import { BagDefine, BagItemData } from "../../bag/BagDefine";
import { BagModuleC } from "../../bag/BagModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import { RouteModuleC } from "../../route/RouteModule";
import { EquipDefine } from "../EquipDefine";
import { PropertyType, WeaponPropertyService } from "../util/WeaponPropertyIns";
import ItemLackTipsPanel from "./ItemLackTipsPanel";
import UnlockPanel from "../../controller/ui/UnlockPanel";
import { UIItemDetailEn } from "../../store/ui/UIItemDetailEn";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import IAPModuleC from "../../iap/IAPModuleC";
import BagPanel from "../../bag/ui/BagPanel";
import { RouteDataHelper } from "../../route/RouteData";
import { MapEx } from "../../../utils/MapEx";
import FakerModuleC from "../../faker/FakerModuleC";
import { GhostModuleC } from "../../ghost/GhostModuleC";

export enum LevelType {

    /** 无 */
    None,
    /** 最高强化 */
    Max,
    /** 超限强化 */
    Ultra,
}

const goldColor = "#D99E63FF";
const greenColor = "#00E800FF";

AddGMCommand("调强化模型", (player, value: string) => {
    let vecArr = value.split("||");
    if (!vecArr) { vecArr = ["1|1|1", "1|1|1", "1|1|1"]; Tips.show("请以*|*|*||*|*|*||*|*|*方式输入参数，分别是scale||pos||rot") }
    let scale = CommonUtils.string2Vec(vecArr[0] ? vecArr[0] : "1|1|1");
    let off = CommonUtils.string2Vec(vecArr[1] ? vecArr[1] : "1|1|1");
    let rot = CommonUtils.string2Vec(vecArr[1] ? vecArr[2] : "1|1|1");
    let ui = UIService.getUI(WeaponUpgradePanel);
    let trans = ui["shopPoint"].worldTransform.clone();
    ui["showGameObj"].worldTransform.scale = scale;
    ui["showGameObj"].worldTransform.position = trans.position.add(off);
    ui["showGameObj"].worldTransform.rotation = trans.rotation.add(CommonUtils.vec2Rot(rot));
}, null, "武器");

AddGMCommand("设置强化等级", () => {
    setTimeout(() => {
        UIService.getUI(WeaponUpgradePanel).reStart();
    }, 1e2);
}, async (player, value: string) => {
    let paramArr = value.split("|");
    if (paramArr.length != 2) {
        Tips.show("参数错误，格式应该类似 2|11");
        return;
    }
    const data = await RouteDataHelper.reqGetData(player.userId, EGameTheme.Hall);
    MapEx.set(data.itemLevelMap, paramArr[0], Number(paramArr[1]));
    RouteDataHelper.reqSetData(player.userId, EGameTheme.Hall, [], []);
}, "武器");

export class WeaponUpgradeItem extends WeaponUpgradeItem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public cfg: IItemLevelElement;

    private readonly selectColor = LinearColor.colorHexToLinearColor("#8F2200FF");
    private readonly unSelectColor = LinearColor.colorHexToLinearColor("#818389FF");

    public curLevel: number = 0;

    public setLevel(level: number, needModel: boolean = false) {
        this.curLevel = level;
        // this.mText_WeaponName.text = this.itemCfg.name + "+" + this.curLevel;
        if (!this.itemCfg) { return; }
        BagDefine.getCfgEx(this.itemCfg.id, Player.localPlayer.userId).then((v) => {
            this.mText_WeaponName.text = v.name + "+" + this.curLevel;
            this.mImage_Icon.imageGuid = v.icon;
        });
        if (this.curLevel >= this.cfg.maxLevel && this.curLevel < this.cfg.maxLevel + this.cfg.exLevel) {
            this.setLevelTxt(LevelType.Max);
        } else if (this.curLevel === this.cfg.maxLevel + this.cfg.exLevel) {
            this.setLevelTxt(LevelType.Ultra);
        } else {
            this.setLevelTxt(LevelType.None);
        }
        this.selfPanel.setData(this, true, needModel);
    }

    /** 检查当前是否处于不计算超限强化的最高等级 */
    public checkIsMaxLevel() {
        return this.curLevel === this.cfg.maxLevel;
    }

    /** 检查当前是否被超限强化过 */
    public checkIsUltraLevel() {
        return this.curLevel > this.cfg.maxLevel;
    }

    /** 当前能否超限强化 */
    public canSuperUpgrade() {
        return this.isUnlock && this.curLevel >= this.cfg.maxLevel && this.curLevel < (this.cfg.exLevel + this.cfg.maxLevel);
    }

    /** 当前能否普通强化 */
    public canNormalUpgrade() {
        return this.isUnlock && this.curLevel < this.cfg.maxLevel;
    }

    /** 是否是最大的超限强化等级 */
    public isMaxUltraLevel() {
        return this.curLevel >= this.cfg.maxLevel + this.cfg.exLevel;
    }

    public onStart() {
        this.onSelect = new Action();
        this.triggerBtn.onClicked.add(() => {
            if (UIService.getUI(UIItemDetailEn)) { UIService.hide(UIItemDetailEn) }
            if (this.isSelected) { return; }
            if (!this.isUnlock) {
                Tips.show("请先解锁");
                const shopCfg = GameConfig.Shop.getAllElement().filter(v => { return v.showGameID[0] === 5 && v.itemID === this.itemCfg.id })[0];
                if (!shopCfg) { return; }
                // 硬处理一下，防止作弊
                if (shopCfg.price > 1e3) {
                    UIService.show(UnlockPanel, this.itemCfg.id, shopCfg.price, false);
                }
                return;
            }
            MusicMgr.instance.play(1020);
            this.selfPanel.setData(this, false, true);
            GhostTraceHelper.uploadMGS("ts_action_pick", "打开武器升级界面上发", { object: this.itemCfg.id });
        });
    }

    private get selfPanel() {
        return UIService.getUI(WeaponUpgradePanel);
    }


    public setSelected(isTrue: boolean) {
        this.isSelected = isTrue;
        if (isTrue) {
            this.bG2.imageColor = this.selectColor;
        } else {
            this.bG2.imageColor = this.unSelectColor;
        }
    }

    public itemCfg: IItemElement;

    /**
     * 初始化item
     * @param cfg 升级配置
     * @param isUnlock 是否解锁
     */
    public initData(cfg: IItemLevelElement, isUnlock: boolean, level: number) {
        this.cfg = cfg;
        this.itemCfg = GameConfig.Item.getElement(this.cfg.itemId);
        // this.mImage_Icon.imageGuid = this.itemCfg.icon;
        this.setLevelTxt(LevelType.None);
        this.setLockState(isUnlock);
        this.setLevel(level);
    }

    /** 是否解锁 */
    public isUnlock: boolean = false;

    /**
     * 设置锁状态
     * @param isUnlock 是否解锁
     */
    public setLockState(isUnlock: boolean) {
        this.isUnlock = isUnlock;
        this.mCanvas_Locked.visibility = isUnlock ? SlateVisibility.Collapsed : SlateVisibility.SelfHitTestInvisible;
    }

    public txtType: LevelType;

    public setLevelTxt(txtType: LevelType) {
        if (this.txtType === txtType) { return; }
        switch (txtType) {
            case LevelType.None:
                this.mText_MAX.visibility = SlateVisibility.Collapsed;
                this.mText_ULTRA.visibility = SlateVisibility.Collapsed;
                break;
            case LevelType.Max:
                this.mText_MAX.visibility = SlateVisibility.SelfHitTestInvisible;
                this.mText_ULTRA.visibility = SlateVisibility.Collapsed;
                break;
            case LevelType.Ultra:
                this.mText_MAX.visibility = SlateVisibility.Collapsed;
                this.mText_ULTRA.visibility = SlateVisibility.SelfHitTestInvisible;
                break;
        }
        this.txtType = txtType;
    }
}

/** 默认解锁了的道具列表 */
const DefaultUnlockedItemList: number[] = [1001, 2001];

/** 普通强化的需求列表 */
export class NeedsInfo {

    public isEnough1: boolean = false;
    public isEnough2: boolean = false;
    public needCount1: number = 0;
    public needCount2: number = 0;

    public constructor(public shopId1: number, public itemId1: number, public count1: number, public leftCount1: number,
        public shopId2: number, public itemId2: number, public count2: number, public leftCount2: number) {
        this.isEnough1 = leftCount1 >= count1;
        this.isEnough2 = leftCount2 >= count2;
        this.needCount1 = count1 - leftCount1;
        this.needCount2 = count2 - leftCount2;
    }
}

export default class WeaponUpgradePanel extends WeaponUpgrade_UI_Generate {

    private itemContainer: GridSelectContainer<WeaponUpgradeItem>;

    private get routeModule() {
        return ModuleService.getModule(RouteModuleC);
    }

    private shopCamera: Camera;

    private shopPoint: GameObject;

    private registerTouchEvt() {
        let lastVec2 = Vector2.zero;
        let deltaRot = Rotation.zero;
        InputUtil.onTouchBegin((index: number, location: mw.Vector2) => {
            if (!this.visible || !this.showGameObj) { return; }
            lastVec2 = location;
            this.showGameObj.stopRotate();
            if (UIService.getUI(UIItemDetailEn)) { UIService.hide(UIItemDetailEn) }
        });

        let tempQuaternion = Quaternion.identity;
        InputUtil.onTouchMove((index: number, location: mw.Vector2) => {
            if (!this.visible || !this.showGameObj || !this.showGameObj.worldTransform) { return; }
            // deltaRot.set(lastVec2.y - location.y, 0, lastVec2.x - location.x);
            deltaRot.set(0, 0, lastVec2.x - location.x);
            lastVec2 = location;
            tempQuaternion.fromRotation(this.showGameObj.worldTransform.rotation.add(deltaRot));
            this.showGameObj.worldTransform.rotation = tempQuaternion.toRotation();
        });

        InputUtil.onTouchEnd((index: number, location: mw.Vector2) => {
            if (!this.visible || !this.showGameObj) { return; }
            this.selfRot();
        });
    }

    /** 重新初始化 */
    public reStart() {
        this.itemContainer.clear();
        const cfgList = GameConfig.ItemLevel.getAllElement().filter(v => { return v.type === 1 || v.type === 2 });
        DataCenterC.ready().then(async () => {
            const routeData = await this.routeModule.reqHallRouteData(Player.localPlayer.userId);
            cfgList.reverse().forEach(v => {
                const level = RouteDefine.getItemLevel(v.id, routeData);
                const node = this.itemContainer.addNode();
                node.initData(v, DefaultUnlockedItemList.includes(v.itemId) || routeData.unlockedItemList.includes(v.itemId), level);
            });
        });
        UIService.getUI(BagPanel).refresh();
    }

    protected onStart() {
        if (GamesStartDefines.gameTheme != EGameTheme.Town) { return; }
        this.registerTouchEvt();
        this.itemContainer = new GridSelectContainer(this.mCanvas_WeaponList, WeaponUpgradeItem);
        const cfgList = GameConfig.ItemLevel.getAllElement().filter(v => { return v.type === 1 || v.type === 2 });
        DataCenterC.ready().then(async () => {
            const routeData = await this.routeModule.reqHallRouteData(Player.localPlayer.userId);
            cfgList.reverse().forEach(v => {
                const level = RouteDefine.getItemLevel(v.id, routeData);
                const node = this.itemContainer.addNode();
                node.initData(v, DefaultUnlockedItemList.includes(v.itemId) || routeData.unlockedItemList.includes(v.itemId), level);
            });

            this.shopCamera = await mw.GameObject.asyncFindGameObjectById(GameConfig.ShopInstance.getElement(2).cameraGuid) as Camera
            this.shopPoint = await mw.GameObject.asyncFindGameObjectById(GameConfig.ShopInstance.getElement(2).itemPoint)
        });

        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
            UIService.show(MainUI);
        });

        this.btn_Upgrade.onClicked.add(async () => {
            if (this.needsInfo && this.canUpgrade) {
                if (await RouteDefine.removeSpecialItems(Player.localPlayer.userId, [this.needsInfo.itemId1, this.needsInfo.itemId2], [this.needsInfo.count1, this.needsInfo.count2])) {
                    if (await this.routeModule.upgradeItem(this.curItemNode.cfg.id)) {
                        UIService.show(UpgradeSuccessHud, this.curItemNode, false);
                    }
                }
            } else {
                UIService.show(ItemLackTipsPanel, this.needsInfo, async () => {
                    if (await this.routeModule.upgradeItem(this.curItemNode.cfg.id)) {
                        UIService.show(UpgradeSuccessHud, this.curItemNode, true);
                    }
                });
            }
        });

        this.btn_UpgradeSP.onClicked.add(async () => {
            if (SystemUtil.isPIE) {
                Tips.show("因为这是pie，所以直接强化成功了就");
                if (await this.routeModule.upgradeItem(this.curItemNode.cfg.id)) {
                    UIService.show(UpgradeSuccessHud, this.curItemNode, false);
                }
            } else {
                ModuleService.getModule(IAPModuleC).placeOrder(this.needsInfoArray[0][1], 1)
            }
        });

        IAPModuleC.onPurchaseAction.add(async (commodityId, result) => {
            let data = GameConfig.happyCoin.getElement(this.needsInfoArray[0][1])
            if (!data) return
            if (data.clazz == commodityId || data.outClazz == commodityId) {//乐币升级成功
                if (await this.routeModule.upgradeItem(this.curItemNode.cfg.id)) {
                    UIService.show(UpgradeSuccessHud, this.curItemNode, false);
                }
            }
        })

        this.mBtntext_UpgradeNum1.onClicked.add(() => {
            UIService.show(UIItemDetailEn, this.needsInfo.itemId1, this.mBtntext_UpgradeNum1, this.rootCanvas);
        });

        this.mBtntext_UpgradeNum2.onClicked.add(() => {
            UIService.show(UIItemDetailEn, this.needsInfo.itemId2, this.mBtntext_UpgradeNum2, this.rootCanvas);
        });

        // 每秒去检测一下是否要显示主界面的红点
        setInterval(() => {
            this.redPointCheck();
        }, 1e3);
    }

    private redPointCheck() {
        for (const itemNode of this.itemContainer.nodes) {
            if (itemNode.canNormalUpgrade()) {
                const levelCfg = itemNode.cfg;
                const needsCfg = GameConfig.ItemNeeds.getElement(levelCfg.needsId);
                // 单子
                const levelNeeds = needsCfg[`level${itemNode.curLevel}`];
                const shopCfg1 = this.getShotCfg(this.getMaterialCfg(levelNeeds[0][0]).shopId);
                const shopCfg2 = this.getShotCfg(this.getMaterialCfg(levelNeeds[1][0]).shopId);
                let needCount1 = levelNeeds[0][1];
                let leftCount1 = this.bagModule.getAllItemCountByCfgId(shopCfg1.itemID);
                let needCount2 = levelNeeds[1][1];
                let leftCount2 = this.bagModule.getAllItemCountByCfgId(shopCfg2.itemID);
                let canUpgrade = leftCount1 >= needCount1 && leftCount2 >= needCount2;
                if (canUpgrade) { UIService.getUI(MainUI).img_wupoint.visibility = SlateVisibility.SelfHitTestInvisible; return; }
            }
        }
        UIService.getUI(MainUI).img_wupoint.visibility = SlateVisibility.Collapsed;
    }

    /** 当前强化的武器节点 */
    public curItemNode: WeaponUpgradeItem;

    public async setData(itemNode: WeaponUpgradeItem, isForce: boolean = false, needModel: boolean = false) {
        if (!this.visible) { return; }
        this.canUpgrade = false;
        if (!itemNode) { return; }
        if (!isForce && this.curItemNode === itemNode) { return; }
        this.curItemNode = itemNode;
        this.setCurLevel(itemNode.curLevel);
        needModel && this.generateViewObj();
        !itemNode.isSelected && itemNode.onSelect.call();
    }

    /** 需求列表 第一列是升级所需的道具，第二列是该道具所需数量 */
    private needsInfoArray: number[][];

    private get bagModule() {
        return ModuleService.getModule(BagModuleC);
    }

    private getMaterialCfg(id: number) {
        return GameConfig.ItemMaterial.getElement(id);
    }

    private getItemCfg(id: number) {
        return GameConfig.Item.getElement(id);
    }

    private getShotCfg(id: number) {
        return GameConfig.Shop.getElement(id);
    }

    /** 展示模型 */
    private showGameObj: GameObject;

    private playerCamera: Camera;

    /** 生成展示模型 */
    private async generateViewObj() {
        if (this.showGameObj) { this.showGameObj.destroy(); }
        this.showGameObj = await GameObject.asyncSpawn((await BagDefine.getCfgEx(this.curItemNode.cfg.itemId, Player.localPlayer.userId)).res);
        this.showGameObj.worldTransform = this.shopPoint.worldTransform.clone();
        let trans = this.showGameObj.worldTransform;
        this.showGameObj.worldTransform.scale = this.curItemNode.cfg.scale;
        this.showGameObj.worldTransform.position = trans.position.add(this.curItemNode.cfg.offset);
        this.showGameObj.worldTransform.rotation = trans.rotation.add(CommonUtils.vec2Rot(this.curItemNode.cfg.rot));
        this.selfRot();
    }

    private selfRot() {
        this.showGameObj.rotateBy(new Rotation(0, 0, -10), 2);
    }

    /** 回收展示物 */
    private recycleViewObj() {
        if (!this.showGameObj) { return; }
        this.showGameObj.destroy();
        this.showGameObj = null;
    }

    /** 能否升级 */
    private canUpgrade: boolean = false;

    /** 需求信息 */
    private needsInfo: NeedsInfo;

    /**
     * 设置普通强化的需求
     */
    private setNeedsInfo() {
        const shopCfg1 = this.getShotCfg(this.getMaterialCfg(this.needsInfoArray[0][0]).shopId);
        const shopCfg2 = this.getShotCfg(this.getMaterialCfg(this.needsInfoArray[1][0]).shopId);
        let needCount1 = this.needsInfoArray[0][1];
        let leftCount1 = this.bagModule.getAllItemCountByCfgId(shopCfg1.itemID);
        let needCount2 = this.needsInfoArray[1][1];
        let leftCount2 = this.bagModule.getAllItemCountByCfgId(shopCfg2.itemID);
        this.needsInfo = new NeedsInfo(shopCfg1.id, shopCfg1.itemID, needCount1, leftCount1, shopCfg2.id, shopCfg2.itemID, needCount2, leftCount2);
        this.img_UpgradeIcon1.imageGuid = this.getItemCfg(shopCfg1.itemID).icon;
        this.img_itembg1.imageGuid = GameConfig.ItemQuality.getElement(this.getItemCfg(shopCfg1.itemID).quality).imgGuid;
        this.text_UpgradeNum1.text = this.needsInfo.isEnough1 ? `${leftCount1}/${needCount1}` : `<color=#FF0035>${leftCount1}</color>/${needCount1}`;
        this.img_UpgradeIcon2.imageGuid = this.getItemCfg(shopCfg2.itemID).icon;
        this.img_itembg2.imageGuid = GameConfig.ItemQuality.getElement(this.getItemCfg(shopCfg2.itemID).quality).imgGuid;
        this.text_UpgradeNum2.text = this.needsInfo.isEnough2 ? `${leftCount2}/${needCount2}` : `<color=#FF0035>${leftCount2}</color>/${needCount2}`;
        this.canUpgrade = leftCount1 >= needCount1 && leftCount2 >= needCount2;
    }

    /** 设置升级按钮状态 */
    public setLevelUpBtnState() {
        this.needsInfoArray = this.getUpgradeMaterial();
        // 超限升级是需要乐币的，直接读取数量就行了
        if (this.curItemNode.canSuperUpgrade()) {
            if (this.needsInfoArray && this.needsInfoArray.length === 1) {
                const coinCfg = GameConfig.happyCoin.getElement(this.needsInfoArray[0][1]);
                this.text_UpgradeNumSP.text = GameStart.isGPark ? coinCfg.outValue + "" : coinCfg.value + "";
                this.img_UpgradeIconSP.imageGuid = GameStart.isGPark ? GameConfig.SubGlobal.gCoinIcon.string : GameConfig.SubGlobal.leCoinIcon.string;
                this.canvas_UpgradeSP.visibility = SlateVisibility.SelfHitTestInvisible;
            } else {
                console.error(`DEBUG>>> MyTypeError 超限强化的配置错误this.curItemNode id: ${this.curItemNode.cfg.itemId} level: ${this.curItemNode.curLevel}`);
                this.canvas_UpgradeSP.visibility = SlateVisibility.Collapsed;
            }
            this.canvas_Upgrade.visibility = SlateVisibility.Collapsed;
            this.mText_LevelMax.visibility = SlateVisibility.Collapsed;
        } else if (this.curItemNode.canNormalUpgrade()) {
            if (this.needsInfoArray && this.needsInfoArray.length === 2) {
                this.setNeedsInfo();
                this.canvas_Upgrade.visibility = SlateVisibility.SelfHitTestInvisible;
            } else {
                console.error(`DEBUG>>> MyTypeError 普通强化的配置错误 this.curItemNode id: ${this.curItemNode.cfg.itemId} level: ${this.curItemNode.curLevel}`);
                this.canvas_Upgrade.visibility = SlateVisibility.Collapsed;
            }
            this.canvas_UpgradeSP.visibility = SlateVisibility.Collapsed;
            this.mText_LevelMax.visibility = SlateVisibility.Collapsed;
        } else {
            this.canvas_Upgrade.visibility = SlateVisibility.Collapsed;
            this.canvas_UpgradeSP.visibility = SlateVisibility.Collapsed;
            this.mText_LevelMax.visibility = SlateVisibility.SelfHitTestInvisible;
        }
    }

    private getEvolutionNeedLevel(type: number, curLevel: number) {
        const arr = EvolutionLevelArr[type];
        const index = arr.findIndex(v => { return curLevel < v });
        const nextLevel = index === -1 ? arr[0] : arr[index];
        return nextLevel - curLevel;
    }

    private setCurLevel(level: number) {
        const levelCfg = this.curItemNode.cfg;
        const itemCfg = this.curItemNode.itemCfg;
        const weaponProperty = WeaponPropertyService.getProperty(Number(itemCfg.clazzParam[0]), level, levelCfg.type);
        // this.mText_WeaponName.text = itemCfg.name + "+" + level;
        BagDefine.getCfgEx(itemCfg.id, Player.localPlayer.userId).then((v) => {
            this.mText_WeaponName.text = v.name + "+" + level;
            UIService.getUI(UpgradeSuccessHud).text_WUNG2.text = v.name;
        });
        if (this.curItemNode.isMaxUltraLevel()) {
            this.mCanvas_NextG.visibility = SlateVisibility.Collapsed;
        } else {
            this.mCanvas_NextG.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        this.text_nextLevel.text = `距离下次进化还需${this.getEvolutionNeedLevel(levelCfg.type, level)}级`;
        this.mText_WeaponLevel.text = this.curItemNode.checkIsUltraLevel() ?
            `强化等级：<color=${goldColor}>${level}</color>/${levelCfg.maxLevel}` : `强化等级：${level}/${levelCfg.maxLevel}`;
        this.mText_WeaponAttack.text = this.curItemNode.checkIsUltraLevel() ?
            `威力：${weaponProperty.getCurVal(PropertyType.Dmg)} (+<color=${goldColor}>${weaponProperty.getNewPercentMul100(PropertyType.Dmg)}%</color>)` :
            `威力：${weaponProperty.getCurVal(PropertyType.Dmg)} (+<color=${greenColor}>${weaponProperty.getNewPercentMul100(PropertyType.Dmg)}%</color>)`;
        this.mText_WeaponHeadshot.text = this.curItemNode.checkIsUltraLevel() ?
            `爆头伤害：${weaponProperty.getCurVal(PropertyType.ShotHead) * 100}% (+<color=${goldColor}>${weaponProperty.getNewPercentMul100(PropertyType.ShotHead)}%</color>)` :
            `爆头伤害：${weaponProperty.getCurVal(PropertyType.ShotHead) * 100}% (+<color=${greenColor}>${weaponProperty.getNewPercentMul100(PropertyType.ShotHead)}%</color>)`;
        // 热武器
        if (levelCfg.type === 1) {
            this.mText_WeaponBackup.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mText_WeaponBackup.text = this.curItemNode.checkIsUltraLevel() ?
                `弹匣容量：${weaponProperty.getCurVal(PropertyType.Cp)} (+<color=${goldColor}>${weaponProperty.getNewPercentMul100(PropertyType.Cp)}%</color>)` :
                `弹匣容量：${weaponProperty.getCurVal(PropertyType.Cp)} (+<color=${greenColor}>${weaponProperty.getNewPercentMul100(PropertyType.Cp)}%</color>)`;
            this.mText_WeaponSpeed.visibility = SlateVisibility.SelfHitTestInvisible;

            // 射速
            const shootSped = Math.max(Math.floor(1e3 / weaponProperty.getCurVal(PropertyType.Spd)), 1);
            this.mText_WeaponSpeed.text = this.curItemNode.checkIsUltraLevel() ?
                `射速：${shootSped * 60}RPM (+<color=${goldColor}>${weaponProperty.getNewPercentMul100(PropertyType.Spd)}%</color>)` :
                `射速：${shootSped * 60}RPM (+<color=${greenColor}>${weaponProperty.getNewPercentMul100(PropertyType.Spd)}%</color>)`;
        }
        // 冷兵器
        else {
            this.mText_WeaponBackup.visibility = SlateVisibility.Collapsed;
            this.mText_WeaponSpeed.visibility = SlateVisibility.Collapsed;
            // this.mText_WeaponSpeed.text = this.curItemNode.checkIsUltraLevel() ?
            //     `攻速：${weaponProperty.getCurVal(PropertyType.Spd)} (+<color=${goldColor}>${weaponProperty.getNewPercentMul100(PropertyType.Spd)}%</color>)` :
            //     `攻速：${weaponProperty.getCurVal(PropertyType.Spd)} (+<color=${greenColor}>${weaponProperty.getNewPercentMul100(PropertyType.Spd)}%</color>)`;
        }
        this.setLevelUpBtnState();
    }

    /** 获取本次升级所需材料 */
    private getUpgradeMaterial() {
        const levelCfg = this.curItemNode.cfg;
        const needsCfg = GameConfig.ItemNeeds.getElement(levelCfg.needsId);
        if (!needsCfg) {
            console.error(`DEBUG>>> MyTypeError 获取升级材料失败 没有这个配置 itemId = ${levelCfg.itemId} needsId = ${levelCfg.needsId}`);
            return null;
        }
        // 单子
        const levelNeeds = needsCfg[`level${this.curItemNode.curLevel}`];
        if (!levelNeeds) {
            console.error(`DEBUG>>> MyTypeError 获取升级材料失败 没有这个等级的配置 itemId = ${levelCfg.itemId} level = ${this.curItemNode.curLevel}`);
            return null;
        }
        return levelNeeds;
    }

    private equipData: BagItemData;

    protected onShow() {
        this.equipData = EquipDefine.curPlayerEquipItem;
        if (this.equipData) { EquipDefine.EquipItem(null); }
        this.playerCamera = Camera.currentCamera;
        Camera.switch(this.shopCamera);
        UIService.hide(MainUI);
        this.refresh();
        this.mScrollBox.scrollToStart();

        // 设置玩家安全状态
        ModuleService.getModule(GhostModuleC).setSafe(true);
    }

    public refresh(itemId?: number) {
        this.routeModule.reqUnlockedItemList().then(unlockItemList => {
            this.itemContainer.nodes.forEach(node => {
                if (node.itemCfg) {
                    node.setLockState(DefaultUnlockedItemList.includes(node.itemCfg.id) || unlockItemList.includes(node.itemCfg.id))
                }
            })
            this.sortContainerNodes(itemId);
        });
    }

    /**
     * 排序
     * 价值高的在前面
     * 已解锁的放前面
     */
    private sortContainerNodes(itemId?: number) {
        let nodeItemInfoArr = this.itemContainer.nodes.map((v) => { return new NodeItemInfo(v.cfg, v.isUnlock, v.curLevel, v.itemCfg) });
        nodeItemInfoArr = nodeItemInfoArr.sort((a, b) => { return a.itemCfg.value - b.itemCfg.value });
        nodeItemInfoArr = nodeItemInfoArr.sort((a, b) => { return Number(b.isUnlock) - Number(a.isUnlock) });
        this.itemContainer.nodes.forEach((v, i) => {
            let nodeItemInfo = nodeItemInfoArr[i];
            v.initData(nodeItemInfo.itemLevelCfg, nodeItemInfo.isUnlock, nodeItemInfo.level);
        });
        const node = itemId ? this.itemContainer.nodes.find(v => { return v.itemCfg.id === itemId }) : this.itemContainer.nodes[0];
        this.setData(node, true, true);
    }

    protected onHide() {
        if (this.equipData) {
            EquipDefine.EquipItem(this.equipData.guid);
        }
        if (Camera.currentCamera == this.shopCamera) {
            Camera.switch(this.playerCamera);
        }
        if (UIService.getUI(UIItemDetailEn)) { UIService.hide(UIItemDetailEn) }
        this.recycleViewObj();

        ModuleService.getModule(GhostModuleC).setSafe(false);
    }
}


/** 武器进化所需等级 */
const EvolutionLevelArr: Array<Array<number>> = [[], [12, 30, 36], [12, 20, 24]];

class NodeItemInfo {

    public constructor(public itemLevelCfg, public isUnlock: boolean, public level, public itemCfg: IItemElement) { }
}

class SucTipsText extends WSTextItem_Generate {

    public setText(str: string) {
        this.text.text = str;
    }
}

export class UpgradeSuccessHud extends WUSuccess_UI_Generate {

    protected onStart() {
        this.layer = UILayerMiddle;
        this.mBtn_WUSuccessClose.onClicked.add(() => {
            UIService.hideUI(this);
        });
        this.mCanvas_WUSuccessDetail.removeAllChildren();
        this.container = new GridContainer(this.mCanvas_WUSuccessDetail, SucTipsText);
        this.container.clear();
    }

    private container: GridContainer<SucTipsText>;

    private getLevelPropertyCfg(propertyId: number, level: number): number[][] {
        return GameConfig.ItemLevelProperty.getElement(propertyId)[`level${level}`];
    }

    private curItemNode: WeaponUpgradeItem;

    /**
     * @param itemNode 
     * @param isUseOtherMaterial 是否使用了其他材料比如说恐惧币
     */
    protected onShow(itemNode: WeaponUpgradeItem, isUseOtherMaterial: boolean) {
        this.curItemNode = itemNode;
        // this.mImg_WUSuccessIcon.imageGuid = itemNode.itemCfg.icon;
        if (EvolutionLevelArr[itemNode.cfg.type].includes(itemNode.curLevel + 1)) {
            this.mCanvas_WUNG.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mCanvas_WUNG.visibility = SlateVisibility.Collapsed;
        }
        BagDefine.getCfgEx(itemNode.itemCfg.id, Player.localPlayer.userId).then((v) => {
            this.mImg_WUSuccessIcon.imageGuid = v.icon;
            this.text_WUNG2_1.text = v.name;
        });

        if (itemNode.curLevel >= itemNode.cfg.maxLevel) {
            MusicMgr.instance.play(1019);
        } else {
            MusicMgr.instance.play(1018);
        }
        const curWeaponProperty = WeaponPropertyService.getProperty(Number(itemNode.itemCfg.clazzParam[0]), itemNode.curLevel, itemNode.cfg.type);
        const nextLevelProperty = WeaponPropertyService.getProperty(Number(itemNode.itemCfg.clazzParam[0]), itemNode.curLevel + 1, itemNode.cfg.type);
        const nextLevelPropertyArr = this.getLevelPropertyCfg(itemNode.cfg.propertyId, itemNode.curLevel + 1);
        this.container.addNode().setText(itemNode.curLevel >= itemNode.cfg.maxLevel ?
            `等级：${itemNode.curLevel} → <color=${goldColor}>${itemNode.curLevel + 1}</color>` :
            `等级：${itemNode.curLevel} → <color=${greenColor}>${itemNode.curLevel + 1}</color>`);
        for (let index = 0; index < nextLevelPropertyArr.length; index++) {
            let str = "";
            switch (nextLevelPropertyArr[index][0]) {
                case PropertyType.Dmg:
                    str = itemNode.curLevel >= itemNode.cfg.maxLevel ?
                        `威力：${curWeaponProperty.getPercentMul100(PropertyType.Dmg)}% → <color=${goldColor}>${nextLevelProperty.getPercentMul100(PropertyType.Dmg)}%</color>` :
                        `威力：${curWeaponProperty.getPercentMul100(PropertyType.Dmg)}% → <color=${greenColor}>${nextLevelProperty.getPercentMul100(PropertyType.Dmg)}%</color>`
                    break;
                case PropertyType.Cp:
                    str = itemNode.curLevel >= itemNode.cfg.maxLevel ?
                        `弹匣容量：${curWeaponProperty.getPercentMul100(PropertyType.Cp)}% → <color=${goldColor}>${nextLevelProperty.getPercentMul100(PropertyType.Cp)}%</color>` :
                        `弹匣容量：${curWeaponProperty.getPercentMul100(PropertyType.Cp)}% → <color=${greenColor}>${nextLevelProperty.getPercentMul100(PropertyType.Cp)}%</color>`
                    break;
                case PropertyType.Spd:
                    if (itemNode.cfg.type === 1) {
                        str = itemNode.curLevel >= itemNode.cfg.maxLevel ?
                            `射速：${curWeaponProperty.getPercentMul100(PropertyType.Spd)}% → <color=${goldColor}>${nextLevelProperty.getPercentMul100(PropertyType.Spd)}%</color>` :
                            `射速：${curWeaponProperty.getPercentMul100(PropertyType.Spd)}% → <color=${greenColor}>${nextLevelProperty.getPercentMul100(PropertyType.Spd)}%</color>`
                    }
                    // } else {
                    //     str = itemNode.curLevel >= itemNode.cfg.maxLevel ?
                    //         `攻速：${curWeaponProperty.getPercentMul100(PropertyType.Spd)}% → <color=${goldColor}>${nextLevelProperty.getPercentMul100(PropertyType.Spd)}%</color>` :
                    //         `攻速：${curWeaponProperty.getPercentMul100(PropertyType.Spd)}% → <color=${greenColor}>${nextLevelProperty.getPercentMul100(PropertyType.Spd)}%</color>`
                    // }
                    break;
                case PropertyType.ShotHead:
                    str = itemNode.curLevel >= itemNode.cfg.maxLevel ?
                        `爆头伤害：${curWeaponProperty.getPercentMul100(PropertyType.ShotHead)}% → <color=${goldColor}>${nextLevelProperty.getPercentMul100(PropertyType.ShotHead)}%</color>` :
                        `爆头伤害：${curWeaponProperty.getPercentMul100(PropertyType.ShotHead)}% → <color=${greenColor}>${nextLevelProperty.getPercentMul100(PropertyType.ShotHead)}%</color>`
                    break;
            }
            this.container.addNode().setText(str);
        }

        // 刷新背包
        UIService.getUI(BagPanel).refresh();

        GhostTraceHelper.uploadMGS("ts_game_result", "打开武器升级界面上发", { value: itemNode.itemCfg.id, camp: itemNode.curLevel, install: isUseOtherMaterial ? 1 : 0 });
    }

    protected onHide() {
        this.curItemNode.setLevel(this.curItemNode.curLevel + 1, true);
        this.container.clear();
    }
}