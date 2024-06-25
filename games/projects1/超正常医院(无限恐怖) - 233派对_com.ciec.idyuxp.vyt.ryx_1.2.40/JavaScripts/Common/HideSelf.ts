
@Component
export default class HideSelf extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        InputUtil.onKeyDown(Keys.H, () => {
            Player.localPlayer.character.setVisibility(false);
        })
    }
}