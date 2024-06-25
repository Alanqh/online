import { GameConfig } from "../../config/GameConfig";
import { MGSGame } from "../../mgs/MGSGame";
import PlayerCtrlUI from "../../playerCtrl/PlayerCtrlUI";
import { Singleton } from "../../tool/Singleton";
import { ZwtTween } from "../../tool/ZwtTween";
import { SuperJump } from "./Skill/SuperJump";
import { SkillBase } from "./SkillBase";

export class SkillManager {
    private static _ins: SkillManager;
    public static get instance(): SkillManager {
        if (!this._ins) {
            this._ins = new SkillManager();
        }
        return this._ins;
    }

    /**当前技能 */
    private curSkill: SkillBase;
    private skillPool: SkillBase[] = [];
    private ctrlUI: PlayerCtrlUI;
    private time: number = 0;
    private skillCD: number = 0;
    private canUseSkill: boolean = true;
    /**是否是减CD期间 */
    private isBlink: boolean = false;
    /**防止重复碰撞减cd */
    private isCD: boolean = false;

    constructor() {
        this.ctrlUI = mw.UIService.getUI(PlayerCtrlUI);
        this.ctrlUI.mSkillBtn.clickedDelegate.add(() => {
            if (!this.canUseSkill) return;
            Event.dispatchToLocal("PLAY_BY_CFG", 18);
            this.useSkill(1);
            this.ctrlUI.mSkillBtn.circleValue = 0;
            this.ctrlUI.mCDText.visibility = mw.SlateVisibility.Visible;
            this.ctrlUI.mSkillBtn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        })
        Event.addLocalListener("GameState.CountDown.Client", () => {
            this.skillCD = GameConfig.Skill.getElement(1).cd;
            this.time = this.skillCD / 2;
            this.ctrlUI.mCDText.visibility = mw.SlateVisibility.Visible;
            this.ctrlUI.mSkillBtn.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        })

        Event.addLocalListener("SKILL_BTN_ACTIVE", (active: boolean) => {
            this.canUseSkill = active;
        });
    }

    /**
     * 使用技能
     */
    public useSkill(skillId: number) {
        let skill = this.skillPool.find(skill => skill.skillId == skillId);
        if (skill) {
            this.curSkill = skill;
        } else {
            switch (skillId) {
                case 1:
                    this.curSkill = new SuperJump(skillId);
                    this.curSkill.onSkillInit();
                    this.skillPool.push(this.curSkill);
                    break;
            }
        }
        Singleton.getIns(MGSGame).useSkill(skillId);
        this.time = GameConfig.Skill.getElement(skillId).cd;
        this.skillCD = this.time;
        this.curSkill.onSkillStart();
    }

    /**
     * 停止技能
     */
    public stopSkill() {
        if (this.curSkill) {
            this.curSkill.onSkillEnd();
            this.curSkill = null;
        }
    }

    /**
     * 在受击或者死亡时减CD。
     * @param isDeath 是否死亡
     */
    public onHitOrDeath(isDeath: boolean) {
        if (this.time > 0) {
            if (this.isCD) return;
            this.isCD = true;
            setTimeout(() => {
                this.isCD = false;
            }, 1000);
            const reduce = isDeath ? GameConfig.Skill.getElement(1).deathCD : GameConfig.Skill.getElement(1).trapCD;
            new ZwtTween(this.ctrlUI.mCDImg).UIOpacityTo(1, 0.1).UIOpacityTo(0, 0.1).call(() => {
                this.time -= reduce;
                this.isBlink = false;
                if (this.time <= 0) {
                    this.ctrlUI.mSkillBtn.visibility = mw.SlateVisibility.Visible;
                    this.ctrlUI.mCDText.visibility = mw.SlateVisibility.Hidden;
                    this.ctrlUI.mSkillBtn.fanShapedValue = 1;
                } else {
                    this.onUpdate(0.2);
                }
            }).start();
            this.isBlink = true;

            Singleton.getIns(MGSGame).skillReduceCD(isDeath);
        }
    }

    onUpdate(dt: number) {
        if (this.isBlink) return;
        if (this.curSkill) {
            if (this.curSkill.onSkillUpdate(dt)) {
                this.curSkill.onSkillEnd();
                this.curSkill = null;
            }
        }
        if (this.time > 0) {
            this.time -= dt;
            this.ctrlUI.mSkillBtn.fanShapedValue = (this.skillCD - this.time) / this.skillCD;
            this.ctrlUI.mCDText.text = Math.ceil(this.time).toString();
            if (this.time <= 0) {
                this.ctrlUI.mSkillBtn.visibility = mw.SlateVisibility.Visible;
                this.ctrlUI.mCDText.visibility = mw.SlateVisibility.Hidden;
            }
        }
    }
}