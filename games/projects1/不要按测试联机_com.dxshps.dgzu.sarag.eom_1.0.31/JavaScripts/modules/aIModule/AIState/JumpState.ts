import { GameConfig } from "../../../config/GameConfig";
import { IPetAnimationElement } from "../../../config/PetAnimation";
import { StateBase, stateType } from "../AIMachine/AIStateManager";

const TEMP = new mw.Vector();
const force: number = 200;

export class JumpState extends StateBase {
    private isJump: boolean = false;
    private petAnimCfg: IPetAnimationElement;
    private jumpAnim: Animation;
    private hoverUpAnim: Animation;
    private hoverDownAnim: Animation;
    private time: number = 0;

    onEnter(): void {
        this.petAnimCfg = GameConfig.PetAnimation.getElement(this.fsm.curPetCfg.animationSet)
        this.initAnim();
        this.fsm.curAIObj.jump();
        this.isJump = true;
    }

    private initAnim() {
        this.jumpAnim = this.fsm.curAIObj.loadAnimation(this.petAnimCfg.JumpGuid);
        this.jumpAnim.loop = 0;
        this.time = Math.ceil((this.jumpAnim.length / this.petAnimCfg.JumpRate) * 100) / 100;
        this.jumpAnim.play();
        setTimeout(() => {
            this.jumpAnim.stop();
        }, this.time * 1000);
        //TODO:加个向前位移

        // this.hoverUpAnim = this.fsm.curAIObj.loadAnimation(this.petAnimCfg.HoverUpGuid);
        // this.hoverDownAnim = this.fsm.curAIObj.loadAnimation(this.petAnimCfg.HoverDownGuid);
    }

    onUpdate(dt: number): void {
        if (this.isJump == false) return;
        if (this.fsm.curAIObj.isJumping || this.fsm.curAIObj.velocity.z > 0) {
            this.updatePosition(dt);
            return;//跳跃过程中，不切状态
        }
        this.fsm.changeState(stateType.Walk)
    }

    /**更新位置 */
    private updatePosition(dt: number) {
        mw.Vector.multiply(this.fsm.curAIObj.worldTransform.getForwardVector(), force * dt, TEMP);
        this.fsm.curAIObj.worldTransform.position = mw.Vector.add(this.fsm.curAIObj.worldTransform.position, TEMP, TEMP);
    }

    onExit(): void {
        this.isJump = false;
    }

    onDestroy(): void {

    }
}