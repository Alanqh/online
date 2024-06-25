import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GameConfig } from "../../../config/GameConfig";
import { IGearElement, GearConfig } from "../../../config/Gear";
import UIIceLolly_Generate from "../../../ui-generate/UIIceLolly_generate";
import { Prop } from "../Prop";
import { PropBase } from "./PropBase";


type IceLollyParam = {
    animationGuid: string,
    animationRate: number,
    triggerTime: number,
    checkRange: Vector
    impulse: number,
    time: number,
    cd: number
}
export class IceLolly extends PropBase {

    guids: string[] = [];
    param: IceLollyParam;

    button: mw.MaskButton;
    time: number = 0;
    text: mw.TextBlock;
    ui: UIIceLolly_Generate;
    cd: number = 0;

    onEquip(param: IceLollyParam): void {
        this.param = param;
        this.time = this.param.time;
        if (this.isPlayer) {
            Event.dispatchToLocal("Hand.Hide", this.currentCha, PropertyStatus.Off);
        }
        if (this.isPlayer && this.isMaster) {
            this.ui = mw.UIService.show(UIIceLolly_Generate);
            this.button = this.ui.itemBtn;
            this.text = this.ui.itemCountTxt;
            this.text.text = this.param.time.toString();
            this.time = this.param.time;
            this.button.fanShapedValue = 1;
            this.button.enable = true;
            let onClick = () => {
                this.time--;
                this.use();
                this.text.text = this.time.toString();
                this.button.fanShapedValue = 0;
                this.button.enable = false;
                if (this.time <= 0) {
                    this.button.clickedDelegate.remove(onClick);
                    setTimeout(() => {
                        Event.dispatchToLocal(Prop.unEquipProp, this.owner)
                    }, 1000);
                }
            }
            this.button.clickedDelegate.add(onClick);
        }
    }


    onUnEquip(): void {
        if (this.isPlayer) {
            Event.dispatchToLocal("Hand.Hide", this.currentCha, PropertyStatus.Off);
        }
        if (this.ui) {
            Event.dispatchToLocal("Hand.Hide", this.currentCha, PropertyStatus.On);
            mw.UIService.hide(UIIceLolly_Generate);
            this.ui = null;
            this.text = null;
            this.button = null;
        }

    }
    onUse(): void {
        this.guids.length = 0;
        let animation = PlayerManagerExtesion.loadAnimationExtesion(this.ownerCha, this.param.animationGuid, false)
        animation.loop = 1;
        animation.speed = this.param.animationRate;
        animation.play();
        TimeUtil.delayExecute(() => {
            GeneralManager.rpcPlayEffectOnGameObject("84931", this.ownerCha, 1, Vector.zero, Rotation.zero.set(150, 0, 0), Vector.one.multiply(1.2));
        }, 10)
        if (this.isMaster) {
            setTimeout(() => {
                this.checkHit();
            }, this.param.triggerTime);
        }
    }

    checkHit() {
        const character = GameObject.findGameObjectById(this.owner) as mw.Character;
        if (character) {
            const rs = GeneralManager.modiftboxOverlap(character.worldTransform.position.subtract(character.worldTransform.getForwardVector().multiply(50)), character.worldTransform.getForwardVector().multiply(this.param.checkRange.x).add(character.worldTransform.position), this.param.checkRange.y, this.param.checkRange.z, false, [], false, character);
            for (let i = 0; i < rs.length; i++) {
                const result = rs[i];
                if (result instanceof Character && result.getVisibility() && this.guids.indexOf(result.gameObjectId) < 0 && this.isMaster) {
                    this.hit(result, { dir: result.worldTransform.position.subtract(character.worldTransform.position).normalize() })
                    this.guids.push(result.gameObjectId);
                }
            }
        }
    }

    onHit(cha: mw.Character, param: { dir: Vector }): void {
        cha.groundFrictionEnabled = false;
        cha.brakingDecelerationWalking = 750;
        Event.dispatchToLocal("GEAR_EFF_BY_CFG", cha.gameObjectId, 14, cha.worldTransform.position);
        cha.addImpulse(param.dir.multiply(this.param.impulse), true)

    }


    get type(): Prop.PropType {
        return Prop.PropType.IceLolly;
    }

    onUpdate(dt: number): void {
        if (this.ui) {
            if (this.button.fanShapedValue < 1) {
                this.button.fanShapedValue += this.param.cd * dt / this.param.cd;
                if (this.button.fanShapedValue >= 1) {
                    this.button.enable = true;
                }
            }
        }
        if (this.isMaster && !this.isPlayer) {
            if (this.cd > 0) {
                this.cd -= dt;
            } else {
                if (this.ownerCha) {
                    if (this.ownerCha.worldTransform.position.subtract(this.currentCha.worldTransform.position).sqrLength < 20000) {
                        this.cd = this.param.cd;
                        this.use();
                        console.log("npc  use  prop");

                        this.time--;
                        if (this.time <= 0) {
                            setTimeout(() => {
                                Event.dispatchToLocal(Prop.unEquipProp, this.owner)
                            }, 1000);
                        }
                    }
                }
            }
        }
    }

}

Event.addLocalListener("GEAR_EFF_BY_CFG", (guid: string, id: number) => {
    const character = GameObject.findGameObjectById(guid) as Character
    if (character && !character.player) {
        let gearCfg: IGearElement = GameConfig.getConfig(GearConfig).getElement(id)
        if (gearCfg && gearCfg.time) {
            const animation = PlayerManagerExtesion.loadAnimationExtesion(character, "14701", false)
            animation.loop = 0;
            animation.play();
            character.movementEnabled = false;
            setTimeout(() => {
                character.movementEnabled = true;
                animation.stop()
            }, gearCfg.time * 1000);
        }
    }
});