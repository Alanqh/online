import { CommonUtils } from "../../../utils/CommonUtils";

@Component
export default class MoverEnableCtl extends Script {

    @mw.Property({ displayName: "运动器" })
    public moverGuids: string[] = [""];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as Trigger;
        trigger.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            this.moverGuids.forEach(e => {
                const mover = GameObject.findGameObjectById(e) as IntegratedMover;
                mover.enable = true;
            })
        })
        trigger.onLeave.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            this.moverGuids.forEach(e => {
                const mover = GameObject.findGameObjectById(e) as IntegratedMover;
                mover.enable = false;
            })
        })
    }
}