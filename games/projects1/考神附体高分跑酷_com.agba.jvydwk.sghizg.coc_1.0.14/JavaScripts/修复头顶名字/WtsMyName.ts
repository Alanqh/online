
@Component
export default class WtsMyName extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            let nickname = ""
            if (!SystemUtil.isPIE) {
                nickname = AccountService.getNickName();
            } else {
                return
            }
            Event.dispatchToServer("要名字", nickname)
        } else {
            Event.addClientListener("要名字", async (player: Player, nickName: string) => {
                let char = player.character
                await char.asyncReady()
                char.displayName = nickName
            })
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