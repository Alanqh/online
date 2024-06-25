import { WaitLoop } from "../../utils/AsyncTool";
import { GlobalSwitch } from "../../utils/GlobalSwitch";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import BeHurtEffUI from "./ui/BeHurtEffUI";

@Component
export default class DamageController extends mw.Script {

    @mw.Property({ displayName: "是否一次性伤害", tooltip: "true是一次性伤害 false是持续型伤害" })
    public isDamageOnce: boolean = true;

    @mw.Property({ displayName: "伤害值" })
    public damageVal: number = 10;

    @mw.Property({ displayName: "伤害间隔(秒)", tooltip: "如果是持续伤害，隔多久伤害一次的意思" })
    public damageInter: number = 1;

    @mw.Property({ displayName: "音效ID" })
    public soundGuid: string = "162714";

    @mw.Property({ displayName: "音量" })
    public volume: number = 1;

    /** 检查是否到持续伤害的扣血时间 */
    private checkTimer: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) { return; }
        this.useUpdate = false;
        WaitLoop.loop(() => { return this.gameObject }).then((go) => {
            if (!(go instanceof Trigger)) { return; }
            const trigger = go as Trigger;
            trigger.onEnter.add((go: GameObject) => {
                if (go instanceof Character && go === Player.localPlayer.character) {
                    if (this.isDamageOnce) {
                        UIService.show(BeHurtEffUI);
                        SoundService.playSound(this.soundGuid, 1, this.volume);
                        ModuleService.getModule(PlayerModuleC).changeHp(-this.damageVal);
                    } else {
                        UIService.show(BeHurtEffUI, 1e3);
                        SoundService.playSound(this.soundGuid, 1e3, this.volume);
                        this.checkTimer = this.damageInter;
                        this.useUpdate = true;
                    }
                }
            });

            trigger.onLeave.add((go: GameObject) => {
                if (go instanceof Character && go === Player.localPlayer.character) {
                    if (!this.isDamageOnce) {
                        this.checkTimer = 0;
                        this.useUpdate = false;
                    }
                    UIService.hide(BeHurtEffUI);
                    SoundService.stopSound(this.soundGuid);
                }
            });
        })
    }


    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.isDamageOnce) { return; }
        this.checkTimer += dt;
        if (this.checkTimer >= this.damageInter) {
            if (!GlobalSwitch.enableHpHud()) { this.useUpdate = false; return; }
            if (ModuleService.getModule(ProcedureModuleC).myScript.state != EmProcedureState.Start) { this.useUpdate = false; return; }
            ModuleService.getModule(PlayerModuleC).changeHp(-this.damageVal);
            this.checkTimer = 0;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
    }
}