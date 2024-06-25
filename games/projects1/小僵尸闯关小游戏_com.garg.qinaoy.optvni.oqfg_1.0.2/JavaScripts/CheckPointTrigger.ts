
import { LevelManager } from "./LevelManager"

@Component
export default class CheckPointTrigger extends Script {

    @Property({ displayName: "序号" })
    public pointNumber: number = 0

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        LevelManager.instance.checkPointMap.set(this.pointNumber, this); 

        let trigger = this.gameObject as Trigger
        trigger.onEnter.add((other: GameObject) => {
            // 进入的物体是否是角色
            if (other instanceof Character) {

                // 进入的角色 是否是 当前客户端角色
                if (other == Player.localPlayer.character) {
                    // 本地事件通信（派发）
                    Event.dispatchToLocal("CheckPoint", this)
                    // 播放特效
                    EffectService.playAtPosition("89097", this.gameObject.worldTransform.position)
                    // 播放音效
                    SoundService.playSound("38193")
                }

                if (this.pointNumber == -1) {
                    // 播放动作
                    other.loadAnimation("14509").play()
                    // 播放特效
                    EffectService.playAtPosition("142750", this.gameObject.worldTransform.position)
                    // 播放音效
                    SoundService.playSound("47425")

                    
                    if (other == Player.localPlayer.character) {
                        Event.dispatchToLocal("Victory")
                    }
                }
            }
        })
    }


}