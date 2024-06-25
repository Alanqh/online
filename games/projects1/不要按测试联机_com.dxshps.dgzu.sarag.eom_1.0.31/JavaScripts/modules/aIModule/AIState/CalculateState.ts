import { GameConfig } from "../../../config/GameConfig";
import { GlobalData } from "../../../const/GlobalData";
import GameComUtils from "../../../utils/GameComUtils";
import { StateBase } from "../AIMachine/AIStateManager";

export class CalculateState extends StateBase {

    async onEnter(pos: Vector, rot: mw.Rotation): Promise<void> {
        let clothCfg = GameConfig.AIAvatar.getAllElement()[Math.floor(Math.random() * GameConfig.AIAvatar.getAllElement().length)];

        let complete = () => {
            if (!this.fsm.curAIObj) return;
            this.fsm.curAIObj.onDescriptionComplete.remove(complete);

            this.fsm.curAIObj.worldTransform.position = pos;
            this.fsm.curAIObj.worldTransform.rotation = rot;
            // this.fsm.curAIObj.description.scale = Vector.one;// 适当缩放
            this.fsm.curAIObj.worldTransform.scale = new Vector(2.5, 2.5, 2.5);

            let aniconfig = GameConfig.RuleGame.getElement(10023);
            let anim = this.fsm.curAIObj.loadAnimation(aniconfig.string_Value);
            anim.loop = 0;
            anim.speed = aniconfig.float_Value;
            let delayTime = GameConfig.RuleGame.getElement(10046).float_Value * 1000;
            setTimeout(() => {
                if (!this.fsm.curAIObj) {
                    return;
                }
                GameComUtils.playLoseAni(this.fsm.curAIObj,
                    () => {
                        anim.play();
                    }, () => {
                        anim.stop();
                    })

                setTimeout(() => {
                    GameComUtils.playEffectOnChar(this.fsm.curAIObj, GlobalData.loseEffectID);
                }, GlobalData.calculateWaitTime * 1000);
            }, delayTime);

        }
        this.fsm.curAIObj.onDescriptionComplete.clear();

        this.fsm.curAIObj.onDescriptionComplete.add(complete);
        this.fsm.curAIObj.setDescription(clothCfg.clothGuidArr);
    }

    onUpdate(dt: number): void {
    }

    onExit(): void {
    }

    onDestroy(): void {
    }
}