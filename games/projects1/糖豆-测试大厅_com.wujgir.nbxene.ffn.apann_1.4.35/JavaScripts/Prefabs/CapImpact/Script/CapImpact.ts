/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-07 16:13:48
 * @LastEditors  : zhenyu.zhang
 * @LastEditTime : 2023-02-23 10:06:31
 * @FilePath     : \stumbleguys\Prefabs\CapImpact\Script\CapImpact.ts
 * @Description  : 在最高点帽子给个冲量
 */

@Component
export default class CapImpact extends mw.Script {

    @mw.Property({ hideInEditor: false, displayName: "冲量对象", capture: true })
    private _impulseGuid: string = '';

    @mw.Property({ hideInEditor: false, displayName: "上升时间", group: "位移设置" })
    private _upTime: number = 500;

    @mw.Property({ hideInEditor: false, displayName: "上升距离", group: "位移设置" })
    private _moveDis: number = 60;

    @mw.Property({ hideInEditor: false, displayName: "高点暂停时间", group: "暂停设置" })
    private _stopTime: number = 300;

    @mw.Property({ hideInEditor: false, displayName: "启动延迟", group: "暂停设置" })
    private _delayTime: number = 3000;

    @mw.Property({ hideInEditor: false, displayName: "下降时间", group: "位移设置" })
    private _downTime: number = 300;

    private _impulseObj: mw.Impulse = null;

    protected onStart(): void {


        const tempVec = this.gameObject.worldTransform.position.clone();

        if (!mw.StringUtil.isEmpty(this._impulseGuid)) {

            this._impulseObj = GameObject.findGameObjectById(this._impulseGuid) as mw.Impulse;

            const tweenAniUp = new mw.Tween({ posZ: tempVec.z }).delay(this._delayTime).to({ posZ: tempVec.z + this._moveDis }, this._upTime).onUpdate(obj => {
                tempVec.z = obj.posZ;
                this.gameObject.worldTransform.position = tempVec;
            }).onStart(() => {
                if (this._impulseObj != null) {
                    this._impulseObj.enable = true;
                    setTimeout(() => {
                        this._impulseObj.enable = false;
                    }, 100);
                }
            }).start();

            const tweenAniDown = new mw.Tween({ posZ: tempVec.z + this._moveDis }).delay(this._stopTime).to({ posZ: tempVec.z }, this._downTime).onUpdate(obj => {
                tempVec.z = obj.posZ;
                this.gameObject.worldTransform.position = tempVec;
            })

            tweenAniUp.chain(tweenAniDown);
            tweenAniDown.chain(tweenAniUp);

        }

    }

}