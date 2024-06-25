
@Component
export default class FMove extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        setTimeout(() => {
            Player.asyncGetLocalPlayer().then(player => {
                player.character.forceUpdateMovement = true;
            });
        }, 2000);

    }

}