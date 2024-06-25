import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { WaitLoop } from "../../utils/AsyncTool";
import { BagDefine } from "../bag/BagDefine";
import { BagModuleC } from "../bag/BagModuleC";
import CameraPanel from "../equip/ui/UICamera";
import { RouteModuleC } from "../route/RouteModule";
import UnlockPanel from "./ui/UnlockPanel";

/*
 * @Author       : dal
 * @Date         : 2024-03-19 18:11:08
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-28 10:18:15
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\controller\UnlockItemChecker.ts
 * @Description  : 
 */
@Component
export default class UnlockItemChecker extends mw.Script {

    @mw.Property({ displayName: "已解锁世界UI", capture: true })
    public worldUITipsId: string = "";

    @mw.Property({ displayName: "名字和价格UI", capture: true })
    public infoUIId: string = "";

    @mw.Property({ displayName: "解锁物件道具id" })
    public unlockItemId: number = 1999;

    @mw.Property({ displayName: "价格" })
    public price: number = 1000;

    private uiObj: GameObject;

    private get isUnlock() {
        return this.uiObj.getVisibility();
    }

    public async reqUpdateUnlockState() {
        if (!this.uiObj) { return; }
        const unlockedItemList = await ModuleService.getModule(RouteModuleC).reqUnlockedItemList();
        if (unlockedItemList.includes(this.unlockItemId)) {
            this.uiObj.setVisibility(PropertyStatus.On);
        } else {
            this.uiObj.setVisibility(PropertyStatus.Off);
        }
    }

    private initBaseInfo() {
        this.uiObj = GameObject.findGameObjectById(this.worldUITipsId);
        ModuleService.ready().then(async () => {
            this.reqUpdateUnlockState();
        });

        const infoUI = GameObject.findGameObjectById(this.infoUIId) as UIWidget;
        const targetUI = infoUI.getTargetUIWidget();
        const textName = targetUI.findChildByPath("RootCanvas/text_name") as TextBlock;
        const textPrice = targetUI.findChildByPath("RootCanvas/canvas_money/text_money") as TextBlock;
        textName.text = this.cfg.name;
        textPrice.text = this.price + "";
    }

    private cfg: IItemElement;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) { return; }

        Event.addLocalListener("MergeConfigSuccess", () => {

            this.cfg = GameConfig.Item.getElement(this.unlockItemId);
            if (!this.cfg) { return; }

            this.useUpdate = false;
            this.initBaseInfo();
            Event.addLocalListener("UnlockItemSuccess", (cfgId: number) => {
                if (cfgId === this.unlockItemId) {
                    this.uiObj.setVisibility(PropertyStatus.On);
                }
            });

            WaitLoop.loop(() => { return this.gameObject }).then((go) => {
                if (!(go instanceof Trigger)) { return; }
                const trigger = go as Trigger;
                trigger.onEnter.add((go: GameObject) => {
                    if (go instanceof Character && go === Player.localPlayer.character && !UIService.getUI(CameraPanel).visible) {
                        UIService.show(UnlockPanel, this.unlockItemId, this.price, this.isUnlock);

                        if (this.isUnlock && !ModuleService.getModule(BagModuleC).checkItemExist(this.unlockItemId)) {
                            BagDefine.AddItem(Player.localPlayer.playerId, this.unlockItemId, "", "", 1, false);
                        }
                    }
                });

                trigger.onLeave.add((go: GameObject) => {
                    if (go instanceof Character && go === Player.localPlayer.character) {
                        UIService.hide(UnlockPanel);
                    }
                });
            })

        });

    }
}