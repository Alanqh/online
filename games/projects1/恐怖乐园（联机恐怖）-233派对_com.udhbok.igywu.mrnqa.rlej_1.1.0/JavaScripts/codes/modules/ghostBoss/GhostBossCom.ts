import BossBornWorld_UI_Generate from "../../../ui-generate/ShareUI/boss/BossBornWorld_UI_generate";
import BossWorld_UI_Generate from "../../../ui-generate/ShareUI/boss/BossWorld_UI_generate";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BossInfo } from "./GhostBossInst";
import { GhostBossModuleC } from "./GhostBossModuleC";
import { GhostBossModuleS } from "./GhostBossModuleS";
import { BossConst } from "./const/BossConst";
import { BossInfoUI } from "./ui/BossInfoUI";

@Component
export default class GhostBossCom extends Script {
    @Property({ displayName: "权重" })
    public weight: number = 1;

    @Property({ displayName: "埋点id" })
    public scene_id: number = 1;

    @Property({ replicated: true, onChanged: "onRestHpChanged" })
    public restHp: number;

    private leaveTimer: number;

    public enable: boolean = false;

    private _leaveTrigger: Trigger;

    private _trigger: Trigger;

    private model: Model;

    private _uiwidget1: UIWidget;

    public ui1: BossWorld_UI_Generate;

    public enableModelWall: boolean = false;

    public isentry: boolean = false;

    private _curStat: number = 2;

    get uiwidget1(): UIWidget {
        if (!this._uiwidget1) {
            this._uiwidget1 = this.gameObject.getChildByName("uiwidget1") as UIWidget;
            this.ui1 = UIService.create(BossWorld_UI_Generate);
            this._uiwidget1.setTargetUIWidget(this.ui1.uiWidgetBase);
        }
        return this._uiwidget1;
    }

    private _uiwidget2: UIWidget;

    public ui2: BossBornWorld_UI_Generate;

    get uiwidget2(): UIWidget {
        if (!this._uiwidget2) {
            this._uiwidget2 = this.gameObject.getChildByName("uiwidget2") as UIWidget;
            this.ui2 = UIService.create(BossBornWorld_UI_Generate);
            this._uiwidget2.setTargetUIWidget(this.ui2.uiWidgetBase);
        }
        return this._uiwidget2;
    }

    onStart() {
        this.init();
    }

    private init() {
        ModuleService.ready().then(() => {
            if (SystemUtil.isServer()) {
                ModuleService.getModule(GhostBossModuleS).addBossArea(this);
            }
            else if (SystemUtil.isClient()) {
                ModuleService.getModule(GhostBossModuleC).addBossArea(this);
                this._trigger = this.gameObject.getChildByName("trigger") as Trigger;
                this.model = this.gameObject.getChildByName("model") as Model;
                this._leaveTrigger = this.gameObject.getChildByName("leaveTrigger") as Trigger;
                this._leaveTrigger.onEnter.add((char: Character) => {
                    if (!CommonUtils.isSelfChar(char)) {
                        return;
                    }
                    UIService.getUI(BossInfoUI).setTipsVisiable(false);
                    this.isentry = true;
                    GhostTraceHelper.uploadMGS("ts_game_over", "玩家进入boss战区域上发", {
                        round_id: 1008611,
                        scene_id: this.scene_id,
                        stage_level: this._curStat
                    })
                    if (!this.enableModelWall) {
                        return;
                    }
                    this.gameObject.getChildByName("showEffect1").setVisibility(PropertyStatus.Off, true);
                    this.gameObject.getChildByName("showEffect2").setCollision(CollisionStatus.Off, true);
                    ModuleService.getModule(GhostBossModuleC).reqEntryBoss(this.gameObject.gameObjectId, this);
                    this.refreshBossUI();
                    this.leaveTimer = 0;
                    this.model.setCollision(PropertyStatus.On);
                })
                this._trigger.onLeave.add((char: Character) => {
                    if (!CommonUtils.isSelfChar(char)) {
                        return;
                    }
                    GhostTraceHelper.uploadMGS("ts_game_over", "玩家离开boss战区域上发", {
                        round_id: 1008612,
                        scene_id: this.scene_id,
                        totalnum: this.enableModelWall ? 1 : 0
                    })
                    if (this.enableModelWall) {
                        ModuleService.getModule(GhostBossModuleC).reqLeaveBoss(this.gameObject.gameObjectId);
                        this.gameObject.getChildByName("showEffect1").setVisibility(PropertyStatus.On, true);
                        this.gameObject.getChildByName("showEffect2").setCollision(CollisionStatus.QueryOnly, true);
                    }
                    UIService.getUI(BossInfoUI).setBossCavVisiable(false);
                    this.isentry = false;
                    this.model.setCollision(PropertyStatus.Off);
                    this.leaveTimer = 0;
                    UIService.getUI(BossInfoUI).setTipsVisiable(false);
                })
                this._leaveTrigger.onLeave.add((char: Character) => {
                    if (!CommonUtils.isSelfChar(char)) {
                        return;
                    }
                    if (!this.enableModelWall) {
                        return;
                    }
                    this.leaveTimer = 8;
                    this.useUpdate = true;
                    UIService.getUI(BossInfoUI).setTipsVisiable(true);
                    UIService.getUI(BossInfoUI).showTips(LanUtil.getText("BossTips_1"))
                })
                this._leaveTrigger.onEnter.add((char: Character) => {
                    if (!CommonUtils.isSelfChar(char)) {
                        return;
                    }
                    if (!this.enableModelWall) {
                        return;
                    }
                    UIService.getUI(BossInfoUI).setTipsVisiable(false);
                    this.leaveTimer = 0;
                    this.useUpdate = false;
                })
            }
        })
    }

    public setStat(stat: number) {
        this._curStat = stat;
        this.uiwidget2.interaction = true;
        this.uiwidget1.interaction = true;
        /** 启动中 */
        if (stat == 0) {
            this.uiwidget2.setVisibility(PropertyStatus.On, true);
            this.uiwidget2.interaction = true;
        }
        /** 运行中 */
        else if (stat == 1) {
            this.uiwidget2.setVisibility(PropertyStatus.Off, true);
            this.uiwidget1.setVisibility(PropertyStatus.On, true);
            this.uiwidget1.interaction = true;
            this.gameObject.getChildByName("showEffect2").setVisibility(PropertyStatus.On, true);
            this.gameObject.getChildByName("showEffect1").setVisibility(PropertyStatus.On, true);
            if (this._trigger.checkInArea(Player.localPlayer.character)) {
                this.leaveTimer = 0;
                this.model.setCollision(CollisionStatus.On);
            }
            this.enableModelWall = true;
            if (this.isentry) {
                ModuleService.getModule(GhostBossModuleC).reqEntryBoss(this.gameObject.gameObjectId, this);
            }
            else {
                this.gameObject.getChildByName("showEffect2").setCollision(CollisionStatus.QueryOnly, true);
            }
            this.refreshBossUI();
            this.onRestHpChanged();
        }
        /**关闭 */
        else if (stat == 2) {
            this.gameObject.getChildByName("showEffect2").setVisibility(PropertyStatus.Off, true);
            this.gameObject.getChildByName("showEffect1").setVisibility(PropertyStatus.Off, true);
            this.gameObject.getChildByName("showEffect2").setCollision(CollisionStatus.Off, true);
            this.uiwidget1.setVisibility(PropertyStatus.Off, true);
            this.model.setCollision(PropertyStatus.Off);
            this.enableModelWall = false;
            this.refreshBossUI();
        }
    }

    public refreshBossUI() {
        if (!this.isentry) {
            return;
        }
        if (this.enableModelWall) {
            UIService.getUI(BossInfoUI).setBossCavVisiable(true);
        }
        else {
            UIService.getUI(BossInfoUI).setBossCavVisiable(false);
        }
    }

    public playFallEffect(restTime: number) {
        const fallEffect = this.gameObject.getChildByName("fallEffect")
        fallEffect.setVisibility(PropertyStatus.On, true);
        const endPos = fallEffect.worldTransform.position;
        const startpos = endPos.clone().add(Vector.up.multiply(BossConst.FALL_SPD * restTime));
        !this.isentry && UIService.getUI(BossInfoUI).setTipsVisiable(true);
        let tween = new Tween({ t: startpos, restTime: restTime }).to({ t: endPos, restTime: 0 }, restTime * 1000).onUpdate((t) => {
            fallEffect.worldTransform.position = t.t;
            !this.isentry && UIService.getUI(BossInfoUI).showTips(CommonUtils.formatString(LanUtil.getText("BossTips_3"), t.restTime.toFixed(1)));
        }).onComplete(() => {
            fallEffect.setVisibility(PropertyStatus.Off, true);
            if (!this.isentry) {
                UIService.getUI(BossInfoUI).showTipsWithTime(LanUtil.getText("BossTips_2"), 10);
            }
            else {
                UIService.getUI(BossInfoUI).setTipsVisiable(false);
            }
        }).start();
    }

    protected onUpdate(dt: number): void {
        if (this.leaveTimer > 0) {
            this.leaveTimer -= dt;
            UIService.getUI(BossInfoUI).showTips(CommonUtils.formatString(LanUtil.getText("BossTips_1"), this.leaveTimer.toFixed(1)));
            if (this.leaveTimer <= 0) {
                const model = this.gameObject.getChildByName("model") as Model;
                model.setCollision(PropertyStatus.Off);
                this.useUpdate = false;
                UIService.getUI(BossInfoUI).setTipsVisiable(false);
            }
        }
    }

    public cancelLifeTips() {
        this.leaveTimer = 0;
        this.useUpdate = false;
        UIService.getUI(BossInfoUI).setTipsVisiable(false);
    }

    onRestHpChanged() {
        if (!this.ui1) {
            return;
        }
        this.ui1.mTextBHP.text = CommonUtils.formatString(LanUtil.getText("BossTips_5"), (this.restHp * 100).toFixed(0) + "%")
    }
}