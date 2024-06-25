enum TriggerType {
    Next,
    Keep,
}
@Component
export default class SwoopBlocker extends mw.Script {

    @mw.Property({ displayName: "触发类型", enumType: TriggerType })
    private triggerType: TriggerType = TriggerType.Keep;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(gameObject => {
            Event.dispatchToLocal("Swoop.Blocker.Enter", gameObject, this.triggerType);
        });
        trigger.onLeave.add(gameObject => {
            if (this.triggerType == TriggerType.Keep) {
                Event.dispatchToLocal("Swoop.Blocker.Leave", gameObject);
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