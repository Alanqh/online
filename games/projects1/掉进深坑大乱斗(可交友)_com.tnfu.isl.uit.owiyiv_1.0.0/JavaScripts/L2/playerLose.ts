
@Component
export default class playerLose extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            const trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other) => {
                if(other instanceof Character){
                    let losepos = GameObject.findGameObjectByName("Level2小黑屋").worldTransform.position;
                    other.worldTransform.position = losepos;
                }  
            });
        }
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