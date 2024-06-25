import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../config/GameConfig";
import { Prop } from "../modules/PropModule/Prop";
import { PropModuleC } from "../modules/PropModule/PropModuleC";
import { Utils } from "../tool/Utils";


@Component
export default class PropIceLolly extends mw.Script {

    @mw.Property({ displayName: "武器Guid" })
    weaponGuid: string = "40832"

    @mw.Property({ displayName: "武器缩放" })
    weaponScale: Vector = new Vector(0.3, 0.3, 0.3);

    @mw.Property({ displayName: "装备位置(挂点右手)" })
    weaponLoc: Vector = new Vector(0, 0, 0);

    @mw.Property({ displayName: "装备旋转" })
    weaponRot: Rotation = new Rotation(0, 0, 0);
    @mw.Property({ displayName: "使用次数" })
    time: number = 3

    @mw.Property({ displayName: "冷却时间" })
    cd: number = 2

    @mw.Property({ displayName: "动作Guid" })
    animationGuid: string = "20263"

    @mw.Property({ displayName: "动画播放速率" })
    animationRate: number = 1

    @mw.Property({ displayName: "检测触发时间" })
    triggerTime: number = 500

    @mw.Property({ displayName: "冲量大小" })
    impulse: number = 1000

    @mw.Property({ displayName: "检测范围" })
    checkRange: Vector = new Vector(250, 200, 200);


    trigger: Trigger;

    character: mw.Character;

    protected onStart(): void {
        if (SystemUtil.isClient()) {

            Utils.downloadAsset("84931");
            Utils.downloadAsset(this.animationGuid);
            Utils.downloadAsset(this.weaponGuid);
            this.trigger = this.gameObject as Trigger;
            Player.asyncGetLocalPlayer().then(player => {
                this.character = player.character;
                this.trigger.onEnter.add((cha) => {
                    if (cha instanceof mw.Character && cha.getVisibility()) {
                        const module = ModuleService.getModule(PropModuleC);
                        if (module && module.hasEquip(cha.gameObjectId)) {
                            return;
                        }
                        if (cha instanceof Character && cha.player) {
                            if (cha == this.character) {
                                Event.dispatchToLocal(Prop.getProp, cha, this.weaponGuid, this.weaponLoc, this.weaponScale, this.weaponRot, HumanoidSlotType.RightHand, {
                                    animationGuid: this.animationGuid,
                                    animationRate: this.animationRate,
                                    triggerTime: this.triggerTime,
                                    checkRange: this.checkRange,
                                    impulse: this.impulse,
                                    time: this.time,
                                    cd: this.cd

                                }, Prop.PropType.IceLolly)
                            }
                        } else {
                            Event.dispatchToLocal(Prop.getProp, cha, this.weaponGuid, this.weaponLoc, this.weaponScale, this.weaponRot, HumanoidSlotType.RightHand, {
                                animationGuid: this.animationGuid,
                                animationRate: this.animationRate,
                                triggerTime: this.triggerTime,
                                checkRange: this.checkRange,
                                impulse: this.impulse,
                                time: this.time,
                                cd: this.cd
                            }, Prop.PropType.IceLolly)
                        }
                        Event.dispatchToLocal("Prop.Pick", this.gameObject.parent.gameObjectId);
                    }
                })
            })
        }
    }


}
