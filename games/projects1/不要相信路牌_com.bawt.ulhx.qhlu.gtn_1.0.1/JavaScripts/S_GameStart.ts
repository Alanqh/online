import { S_RebornManager } from "./S_RebornManager";
import S_DontTrustTrigger from "./S_DontTrustTrigger";
import DefaultUI_Generate from "./ui-generate/DefaultUI_generate";
import DefaultUI from "./DefaultUI";
import S_NextTrigger from "./S_NextTrigger";


@Component
export default class GameStart extends Script {

    protected async onStart(): Promise<void> {
        if (SystemUtil.isClient()) {
            S_RebornManager.instance.init()
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