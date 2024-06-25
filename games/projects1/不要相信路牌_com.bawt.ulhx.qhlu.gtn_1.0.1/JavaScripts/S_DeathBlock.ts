import { S_RebornManager } from "./S_RebornManager"

@Component
export default class S_DeathBlock extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let model = this.gameObject as Model
        model.onTouch.add((other: GameObject) => {
            if (other instanceof Character) {
                S_RebornManager.instance.charDeath(other)
            }
        })
    }

}