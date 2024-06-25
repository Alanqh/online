import { EditorMain } from "./EditorMain";
import { FrameAction } from "./FrameAction";

@Component
export default class EditorMainStart extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        
        if (SystemUtil.isServer()) return;
        InputUtil.onKeyDown(Keys.G, () => {
            UIService.getUI(EditorMain).show();
        })
        InputUtil.onKeyDown(Keys.F, () => {
            UIService.getUI(EditorMain).hide();
        })
        console.error("动画编辑器！启动！")
        
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