/*

 * @Date         : 2023-03-24 18:42:54

 * @LastEditTime: 2023-07-19 10:23:08
 * @FilePath: \commonprefab\JavaScripts\Prefabs\IAA\IAADeathBuff.ts
 * @Description  : 
 */
import MessageBoxUI from "../common/MessageBox";
import { PrefabEvent } from "../../prefabEvent/PrefabEvent";
import { IAAUtil } from "../Tools/IAAUtil";
import { IAABuffManager } from "./IAABuffManager";
import { IAAUI } from "./IAAUI";
import { PrefabReport } from "../../prefabEvent/PrefabReport";
import { S_RebornManager } from "../../S_RebornManager";

@Component
export default class IAADeathBuff extends mw.Script {

    public static isHasInstance: boolean = false;

    @mw.Property({ displayName: "UI提示语" })
    public tipsLan: string = "关卡太难？看个广告飞行10秒钟！"

    @mw.Property({ displayName: "持续时间", tooltip: "持续时间仅对加速、跳跃、飞行起效果" })
    public keepTime: number = 10;

    @mw.Property({ displayName: "能力倍数", tooltip: "能力倍数仅对加速、跳跃生效" })
    public effectrate: number = 3;

    @mw.Property({ displayName: "加速效果" })
    public speedUp: boolean = false;

    @mw.Property({ displayName: "跳跃效果" })
    public jumpUp: boolean = false;

    @mw.Property({ displayName: "飞行效果" })
    public flyEffect: boolean = true;

    @mw.Property({ displayName: "跳关效果" })
    public jumpLevel: boolean = false;

    private _deathCount: number = 0;

    @PrefabReport(28)
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        if (IAADeathBuff.isHasInstance) {
            console.log("场景中存在多个IAA死亡Buff预制体，只有一个会生效");
            return;
        }
        IAADeathBuff.isHasInstance = true;
        PrefabEvent.PrefabEvtFight.onRevive((target: string) => {
            console.log("didi")
            if (target != Player.localPlayer.character.gameObjectId) {
                return;
            }
            let rate = 0.3;
            rate += this._deathCount * 0.1;
            rate = MathUtil.clamp(rate, 0, 1);
            console.log("当前的广告概率" + rate)
            let rd = Math.random();
            this._deathCount++;
            if (rd <= rate) {
                this.showDialog();
            }
        });
    }

    /**
     * 显示对话框
     */
    private showDialog() {
        MessageBoxUI.showTwoBtnMessage("", this.tipsLan, (res) => {
            if (res) {
                this._deathCount = 0;
                IAAUtil.playAds((res) => {
                    if (res) {
                        this.getEffects(Player.localPlayer.character);
                    }
                })
            }
        }, "观看广告"
            , "取消");
    }

    /**
     * 获得实际的buff
     */
    private getEffects(target: mw.Character) {
        if (this.flyEffect) {
            IAABuffManager.instance.switchToFly(this.keepTime);
        }
        if (this.speedUp) {
            let addVal = target.maxWalkSpeed * this.effectrate;
            IAABuffManager.instance.addMoveSpd(addVal, this.keepTime);
        }
        if (this.jumpUp) {
            let addVal = target.maxJumpHeight * this.effectrate;
            IAABuffManager.instance.addJumpForce(addVal, this.keepTime);
        }
        if (this.speedUp || this.flyEffect || this.speedUp) {
            let ui = mw.UIService.getUI(IAAUI);
            mw.UIService.showUI(ui);
            ui.setKeepTime(this.keepTime);
        }
        if (this.jumpLevel) {
            S_RebornManager.instance.jumpToPoint()
        }
    }
}
