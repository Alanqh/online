/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 14:36:33
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-06 09:23:25
 * @FilePath     : \stumbleguys\Prefabs\OrientRotation\Script\OrientRotationScript.ts
 * @Description  : 修改描述
 */

@Component
export default class OrientRotationScript extends mw.Script {
    /**本地玩家 */
    private currentCharacter: Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        Player.asyncGetLocalPlayer().then(player => {
            this.currentCharacter = player.character;
        });
        Event.addLocalListener("Joy.Down.Client", () => {
            if (this.currentCharacter) {
                this.currentCharacter["ueCharacter"].SysMovementComponent.bOrientRotationToMovement = true;
            }
        });
        Event.addLocalListener("Joy.Up.Client", () => {
            if (this.currentCharacter) {
                this.currentCharacter["ueCharacter"].SysMovementComponent.bOrientRotationToMovement = false;
            }
        });
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