import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';

@Component
export default class AICheat extends mw.Script {

    @mw.Property({ displayName: "目标点" })
    public location: mw.Vector = new mw.Vector();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add((gameObject) => {
            if (PlayerManagerExtesion.isNpc(gameObject)) {
                gameObject.worldTransform.position = this.location;
            }
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}