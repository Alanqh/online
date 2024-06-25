/** 
* @Author       : lei.zhao
* @Date         : 2023-07-27 09:17:16
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-08-24 15:46:36
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\BubbleTrap.ts
* @Description  : 修改描述
*/

const temp = new mw.Vector();
@Component
export default class BubbleTrap extends mw.Script {

    @mw.Property({ displayName: "触发器", capture: true })
    private trigger: string = "";
    @mw.Property({ displayName: "禁锢时间" })
    private time: number = 3;
    @mw.Property({ displayName: "漂浮高度" })
    private height: number = 200;
    @mw.Property({ displayName: "重生时间" })
    private rebirthInterval: number = 10;
    private lastTime: number = 0;
    private rebirthTime: number = 0;
    private character: mw.Character;
    private resetLocation: mw.Vector;
    private localPlayerID: number;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.resetLocation = this.gameObject.worldTransform.position;
        Player.asyncGetLocalPlayer().then((player) => {
            this.localPlayerID = player.playerId;
        });
        GameObject.asyncFindGameObjectById(this.trigger).then((trigger: mw.Trigger) => {
            trigger.onEnter.add(obj => {
                if (this.character) return;
                if (obj instanceof mw.Character) {
                    this.character = obj;
                    obj.switchToFlying();
                    if (obj.player) {
                    } else if (this.isController) {
                        Event.dispatchToServer("Bubble.In", obj.gameObjectId, this.resetLocation, this.time, this.height);
                    }
                    this.lastTime = this.time;
                    this.useUpdate = true;
                }
            });
        });
    }

    private get isController() {
        const players = Player.getAllPlayers().map(i => i.playerId).sort((a, b) => a - b);
        return this.localPlayerID == players[0];
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.lastTime) {
            this.lastTime -= dt;
            const height = MathUtil.lerp(0, this.height, 1 - this.lastTime / this.time);
            temp.set(this.resetLocation);
            temp.z += height;
            this.gameObject.worldTransform.position = temp;
            temp.z += 80;
            this.character.worldTransform.position = temp;
            if (this.lastTime <= 0) {
                this.lastTime = 0;
                this.character.switchToWalking();
                this.rebirthTime = this.rebirthInterval;
                this.gameObject.setVisibility(mw.PropertyStatus.Off);
            }
        } else if (this.rebirthTime > 0) {
            this.rebirthTime -= dt;
            if (this.rebirthTime <= 0) {
                this.character = null;
                this.useUpdate = false;
                this.gameObject.worldTransform.position = this.resetLocation;
                this.gameObject.setVisibility(mw.PropertyStatus.On);
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}