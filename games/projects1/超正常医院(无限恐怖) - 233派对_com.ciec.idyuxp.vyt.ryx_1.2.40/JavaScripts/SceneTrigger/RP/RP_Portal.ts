import { utils } from "../../utils/uitls";

/**
 * 传送门
 * 传送玩家到具体位置
 */
@Component
export default class RP_Portal extends Script {

    @Property({ displayName: "传送目的地位置" })
    private tarPos: Vector = Vector.zero;

    protected onStart(): void {
        if (SystemUtil.isServer()) {

        }

        if (SystemUtil.isClient()) {

            this.triggerEvent();
        }


    }

    /**
     * 注册触发器事件
     */
    private triggerEvent() {

        let trigger = this.gameObject as Trigger;

        trigger.onEnter.add((obj) => {

            let isChar = utils.checkTriggerGo(obj)
            if (!isChar) return;

            let char = obj as Character;

            char.worldTransform.position = this.tarPos;
        });
    }


}