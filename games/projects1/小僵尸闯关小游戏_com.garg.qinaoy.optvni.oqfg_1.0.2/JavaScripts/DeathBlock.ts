
import { LevelManager } from "./LevelManager"

@Component
export default class DeathBlock extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // 当角色 碰到方块 就让角色死亡

        // 获取挂载到的物体的Model
        let model = this.gameObject as Model
        // 给物体的onTouch事件添加逻辑
        model.onTouch.add((other: GameObject) => {
            if (other instanceof Character) {
                // 让角色死亡
                LevelManager.instance.charDeath(other)
            }
        })
    }

}