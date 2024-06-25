import S_DontTrustUI from "./S_DontTrustUI";
import DefaultUI from "./DefaultUI";

@Component
export default class S_DontTrustTrigger extends Script {
    public pointNumber:number = 2
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()){
            let trigger = this.gameObject as mw.Trigger
            trigger.onEnter.add(async (other: mw.GameObject) => {
                UIService.show(S_DontTrustUI); 
                // DefaultUI.TextBlock1.text = "2"
                if (other instanceof Character) {

                    // 进入的角色 是否是 当前客户端角色
                    if (other == Player.localPlayer.character) {
                        // 本地事件通信（派发）
                        Event.dispatchToLocal("CheckPoint1", this)
                        EffectService.playAtPosition("4375", this.gameObject.worldTransform.position)
                    }
    
                }
            })
            trigger.onLeave.add(async (other: mw.GameObject) => {
                UIService.hide(S_DontTrustUI); 
            })
            
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