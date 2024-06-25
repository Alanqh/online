
import { GlobalData } from "../../../const/GlobalData";

/**
 * 血条世界ui池子
 */
export class HealthBarUIPool {

    private static _instance: HealthBarUIPool;
    public static get instance(): HealthBarUIPool {
        if (!this._instance) {
            this._instance = new HealthBarUIPool();
        }
        return this._instance;
    }

    private resourceUIMap: Map<string, resourceUI> = new Map<string, resourceUI>();

    /**世界UI上限 */
    private maxCount: number = 3;

    /**获得UI */
    public getUI(resGuid: string, cfgId: number, curHp: number, rate: number): resourceUI {
        let ui = this.resourceUIMap.get(resGuid);
        if (!ui) {
            if (this.resourceUIMap.size >= this.maxCount) {
                let first = this.resourceUIMap.keys().next().value;
                ui = this.resourceUIMap.get(first);
                this.resourceUIMap.delete(first);
                ui.reset();
            } else {
                ui = new resourceUI();
            }
            this.resourceUIMap.set(resGuid, ui);
        }
        ui.bindObj(resGuid, cfgId, curHp, rate);
        return ui;
    }

    /**回收UI */
    public recycleUI(resGuid: string) {
        let ui = this.resourceUIMap.get(resGuid);
        if (ui) {
            ui.reset();
            this.resourceUIMap.delete(resGuid);
        }
    }

}


/**
 * 血条ui
 */
export class resourceUI {

    private ui: mw.UIWidget;
    private bar_hp: mw.ProgressBar;
    private bloodText: mw.TextBlock;
    private rateText: mw.TextBlock;

    private curResGuid: string;
    private timer: any;

    constructor() {
        this.ui = GameObject.spawn("UIWidget") as mw.UIWidget;
        this.ui.setUIbyID("E1E49A4D4A7EB8A4E243BB8A4AC9F988");
        this.ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.ui.occlusionEnable = false;
        this.ui.headUIMaxVisibleDistance = GlobalData.worldUI.headUIMAxVisDistance;
        let uiRoot = this.ui.getTargetUIWidget().rootContent;
        uiRoot.size = uiRoot.size
        this.ui.drawSize = uiRoot.size
        this.ui.refresh();

        this.bar_hp = uiRoot.findChildByPath("bar_hp") as mw.ProgressBar;
        this.bloodText = uiRoot.findChildByPath("mText_Blood") as mw.TextBlock;
        this.rateText = uiRoot.findChildByPath("TextBlock_1") as mw.TextBlock;
        this.bar_hp.visibility = mw.SlateVisibility.HitTestInvisible;

        this.ui.setVisibility(mw.PropertyStatus.Off);
    }
    reset(): void {
        this.ui.parent = null;
        this.ui.setVisibility(mw.PropertyStatus.Off);
    }

    public bindObj(resGuid: string, cfgId: number, curHp: number, rate: number) {
        this.curResGuid = resGuid;
        let gameObject = GameObject.findGameObjectById(resGuid);

        this.updateHP(cfgId, curHp);

        if (gameObject) {
            this.ui.parent = gameObject;
            this.ui.localTransform.position = GlobalData.worldUI.petHeadUIOffset;
        }

        this.ui.localTransform.rotation = (new mw.Rotation(0, 0, 0));

        this.ui.setVisibility(mw.PropertyStatus.On);
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.timer = 0;
            HealthBarUIPool.instance.recycleUI(resGuid);
        }, 1 * 1000);

    }

    updateHP(cfgId: number, curHp: number) {
        //资源类 更新血条
        // let maxHp = GameConfig.SceneUnit.getElement(cfgId).HP

        // this.bar_hp.currentValue = curHp / maxHp;
        this.bloodText.text = curHp.toString();

        // if (curHp <= maxHp * 1 / 3 && this.bar_Type != barColor.red) {
        //     this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(217, 67, 77);
        //     this.bar_Type = barColor.red;
        //     return;
        // } else if (curHp > maxHp * 1 / 3 && curHp <= maxHp * 2 / 3 && this.bar_Type != barColor.orange) {
        //     this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(217, 142, 114);
        //     this.bar_Type = barColor.orange;
        //     return;
        // } else if (this.bar_Type != barColor.blue && curHp <= maxHp && curHp > maxHp * 2 / 3) {
        //     this.bar_hp.fillImageColor = mw.LinearColor.colorToLinearColor(76, 208, 217);
        //     this.bar_Type = barColor.blue;
        // }

    }
}
