import { Bubble, BubbleProxy, IBubbleUI } from "module_bubble";
import BubbleUI_Generate from "../../ui-generate/module_bubble/bubbleModule/BubbleUI_generate";

/**
 * 气泡脚本，继承自BubbleProxy
 * 初始化气泡相关属性，提供创建气泡UI的方法
 */
@Component
export default class BubbleScript extends BubbleProxy {
    /**
     * 初始化，设置气泡皮肤，设置气泡UI，监听MGS消息
     */
    protected onStart(): void {
        super.onStart();
        /**监听MGS消息 */
        if (SystemUtil.isClient()) {
            mw.RoomService.registerMGSChatMessageEvent(msg => {
                //这里的0可以替换成其他皮肤配置，可以每个角色不一样
                Bubble.showBubble(0, msg);
            });
        }
    }
    /**
     * 创建气泡UI
     * @returns 返回气泡UI
     */
    protected onCreateBubbleUI(): IBubbleUI {
        return mw.UIService.create(BubbleUI_Generate);
    }
}