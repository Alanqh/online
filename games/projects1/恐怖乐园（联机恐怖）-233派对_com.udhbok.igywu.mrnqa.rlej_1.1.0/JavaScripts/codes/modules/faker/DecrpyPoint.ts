import { WaitLoop } from "../../utils/AsyncTool";
import FakerModuleS from "./FakerModuleS";

@Component
export default class DecrpyPoint extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        ModuleService.ready().then(() => {
            WaitLoop.loop(() => { return this.gameObject }).then(() => {
                if (SystemUtil.isServer()) {
                    ModuleService.getModule(FakerModuleS).savePoint(this.gameObject.worldTransform)
                }
            })
        })

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