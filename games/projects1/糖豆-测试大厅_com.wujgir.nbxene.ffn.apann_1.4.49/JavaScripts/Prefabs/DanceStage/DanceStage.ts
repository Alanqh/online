import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';

@Component
export default class DanceStage extends mw.Script {

    @mw.Property({ displayName: "舞蹈Guid" })
    danceGuid: string = "";
    @mw.Property({ displayName: "循环播放" })
    loop: boolean = true;
    @mw.Property({ displayName: "播放速度" })
    danceSpeed: number = 1;
    private _danceTrigger: mw.Trigger;
    private _danceAnim: mw.Animation;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.gameObject instanceof mw.Trigger) {
            this._danceTrigger = this.gameObject;
            this._danceTrigger.onEnter.add(async (player) => {
                if (PlayerManagerExtesion.isCharacter(player)) {
                    await AssetUtil.asyncDownloadAsset(this.danceGuid);
                    if (!this._danceAnim) {
                        this._danceAnim = PlayerManagerExtesion.loadAnimationExtesion(player, this.danceGuid);
                        this._danceAnim.loop = this.loop ? 0 : 1;
                        this._danceAnim.speed = this.danceSpeed;
                        this._danceAnim.play();
                    } else {
                        this._danceAnim.play();
                    }
                }
            })
            this._danceTrigger.onLeave.add(async (player) => {
                if (PlayerManagerExtesion.isCharacter(player)) {
                    this._danceAnim?.stop();
                }
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