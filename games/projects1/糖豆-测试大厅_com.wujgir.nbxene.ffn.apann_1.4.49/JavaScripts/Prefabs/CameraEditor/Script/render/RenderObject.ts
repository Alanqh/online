/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-08 16:01:27
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-08 16:02:26
 * @FilePath     : \TrackCamera\Prefabs\CameraEditor\Script\render\RenderObject.ts
 * @Description  : 修改描述
 */
import { NodeContainer } from "../NodeContainer"


@Component
export default class RenderObject extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        NodeContainer.template = this.gameObject
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