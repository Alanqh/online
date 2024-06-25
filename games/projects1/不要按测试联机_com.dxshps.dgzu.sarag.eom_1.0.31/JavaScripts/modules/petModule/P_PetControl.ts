
/** 
 * AUTHOR: 香辣鸡腿堡
 * TIME: 2023.11.07-13.15.29
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../config/GameConfig";
import PetControl_Generate from "../../ui-generate/PetControl_generate";
import { PetModuleC } from "./PetModuleC";
import { PetStrengthenType } from "./PetModuleData";

enum State {
    CanUse,//可用
    Keep,//持续
    CD,//冷却
}

export class P_PetControl extends PetControl_Generate {
    private curState: State = State.CanUse;
    private curTime: number;

    private petModule: PetModuleC;

    protected onStart() {
        this.canUpdate = true;
        this.mText_Cooldown.text = "";
        this.petModule = ModuleService.getModule(PetModuleC);
    }

    protected onUpdate(dt: number): void {
        if (this.curState == State.CanUse) return;
        this.curTime -= dt;
        if (this.curTime > 0) {
            this.mText_Cooldown.text = Math.ceil(this.curTime).toString();
        } else {
            this.curState == State.Keep ? this.cdTime() : this.canUse();
        }
    }

    /**冲刺持续时间 */
    public keepTime() {
        this.mBtn_Speed.enable = false;
        // this.curTime = GameConfig.PetStat.getElement(30004).Value;//冲刺持续时间
        this.curTime = this.petModule ? GameConfig.PetStat.getElement(30004).Value + this.petModule.getStrengthenAttr(PetStrengthenType.SprintDuration).val : GameConfig.PetStat.getElement(30004).Value;//冲刺持续时间
        this.curState = State.Keep;
        this.mText_Cooldown.setFontColorByHex(GameConfig.Global.getElement(20001).string_Value);
        this.mText_Cooldown.visibility = SlateVisibility.SelfHitTestInvisible;
        this.mImage_Glow.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**冲刺冷却时间 */
    public cdTime(time?: number) {
        this.mBtn_Speed.enable = false;
        // this.curTime = time ? time : GameConfig.PetStat.getElement(30003).Value;
        this.curTime = time ? time : GameConfig.PetStat.getElement(30003).Value - this.petModule.getStrengthenAttr(PetStrengthenType.SprintCd).val;
        this.curState = State.CD;
        this.mImage_Glow.visibility = SlateVisibility.Hidden;
        this.mText_Cooldown.setFontColorByHex(GameConfig.Global.getElement(20002).string_Value);
        this.mText_Cooldown.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**恢复可用 */
    private canUse() {
        this.curState = State.CanUse;
        this.mBtn_Speed.enable = true;
        this.mText_Cooldown.visibility = SlateVisibility.Hidden;
        this.mText_Cooldown.text = "";
    }

}
