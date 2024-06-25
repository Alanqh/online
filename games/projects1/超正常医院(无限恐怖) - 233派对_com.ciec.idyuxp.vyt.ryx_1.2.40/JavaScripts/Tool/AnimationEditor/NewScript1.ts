import { GameConfig } from "../../config/GameConfig";
import { AnimationPlayManager } from "./AnimationPlay";

@Component
export default class NewScript1 extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.F, () => {
            // console.log("按下F");
            // let cfg = GameConfig.Animation.getElement(6001);
            // AnimationPlayManager.instance.playAnimationEditor(
            //     Player.localPlayer.character,
            //     cfg.Animation)
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