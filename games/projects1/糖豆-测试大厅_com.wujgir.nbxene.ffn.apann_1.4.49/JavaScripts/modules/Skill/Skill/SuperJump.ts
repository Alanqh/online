/** 
 * @Author       : weihao.xu
 * @Date         : 2023-11-20 14:39:00
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-12-28 16:02:42
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\Skill\Skill\SuperJump.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../../config/GameConfig";
import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { PlayerParam } from "../../../playerCtrl/PlayerParam";
import { SkatingDisable, SkatingEnable } from "../../../playerCtrl/SkatingAnimation";
import { Utils } from "../../../tool/Utils";
import { SkillBase } from "../SkillBase";

export class SuperJump extends SkillBase {
    private groundEffect: mw.Effect;
    private effectId: number;
    private jumpEffect: mw.Effect;
    private armLength: number = 0;
    private isFalling: boolean = false;

    onSkillInit(): void {
        Utils.downloadAsset(GROUND_ANIM);
        Utils.downloadAsset(GROUND_EFFECT);
        Utils.downloadAsset(JUMP_EFFECT);
        GameObject.asyncSpawn(GROUND_EFFECT).then((effect: mw.Effect) => {
            this.groundEffect = effect;
            effect.worldTransform.scale = new Vector(2, 2, 2);
            effect.loopCount = 1; 
        });
        GameObject.asyncSpawn(JUMP_EFFECT).then((effect: mw.Effect) => {
            this.jumpEffect = effect;
            this.character.attachToSlot(this.jumpEffect, mw.HumanoidSlotType.Root);
            this.jumpEffect.localTransform.scale = new mw.Vector(2);
            // this.jumpEffect.localTransform.position = new mw.Vector(70, 0, 50);
            // this.jumpEffect.localTransform.rotation = new mw.Rotation(0, 90, 0);
            this.jumpEffect.loopCount = 99;
        });
        this.armLength = Camera.currentCamera.fov;
    }

    onSkillStart(): void {
        Event.dispatchToLocal("SUPER_JUMP");
        Event.dispatchToLocal(SkatingDisable);

        this.character.driftControl = 1;
        this.character.horizontalBrakingDecelerationFalling = 0;
        let velocity = this.character.velocity;
        this.character[`ueCharacter`].SysMovementComponent.velocity = new UE.Vector(velocity.x * 0.1, velocity.y * 0.1, 0);

        let [impulse, angle] = this.skillConfig.params;
        let forward = this.character.worldTransform.getForwardVector();
        let up = new Vector(0, 0, Math.abs(Math.tan(angle / 180 * Math.PI)));
        Vector.add(forward, up, forward);
        this.character.addImpulse(forward.normalized.multiply(impulse), true);

        if (this.jumpEffect) {
            this.jumpEffect.play();
            this.jumpEffect.localTransform.scale = new mw.Vector(2);
        }

        SoundService.playSound(GameConfig.Voice.getElement(62).guids[0], 99, 10);
        Utils.downloadAsset(AIR_ANIM).then(() => {
            PlayerManagerExtesion.rpcPlayAnimation(this.character, AIR_ANIM, 0, 3);
        })
        new Tween({ length: this.armLength }).to({ length: this.armLength * 1.1 }, 200).onUpdate((obj) => {
            Camera.currentCamera.fov = obj.length;
        }).start();

        this.isFalling = false;
    }

    onSkillEnd(): void {

        setTimeout(() => {
            Event.dispatchToLocal(SkatingEnable);
        }, 1000);

        this.character.driftControl = PlayerParam.airControl;
        this.character.horizontalBrakingDecelerationFalling = PlayerParam.dropSpeed;
        PlayerManagerExtesion.rpcStopAnimation(this.character, AIR_ANIM);
        PlayerManagerExtesion.rpcPlayAnimation(this.character, GROUND_ANIM, 1);
        EffectService.stop(this.effectId);
        SoundService.stopSound(GameConfig.Voice.getElement(62).guids[0]);
        // Event.dispatchToLocal("PLAY_BY_CFG", 6);
        if (this.groundEffect) {
            let pos = this.character.worldTransform.position;
            pos.z -= 50;
            this.groundEffect.worldTransform.position = pos;
            this.groundEffect.setColorRandom("Color", LinearColor.black, LinearColor.white);
            this.groundEffect.play();
        }
        this.jumpEffect && this.jumpEffect.stop();
        let velocity = this.character.velocity.multiply(0.6);
        this.character[`ueCharacter`].SysMovementComponent.velocity = new UE.Vector(velocity.x, velocity.y, velocity.z);
        new Tween({ length: this.armLength * 1.1 }).to({ length: this.armLength }, 500).onUpdate((obj) => {
            Camera.currentCamera.fov = obj.length;
        }).start();
    }

    onSkillUpdate(dt: number): boolean {
        if (this.character && !this.character.isJumping) {
            return true;
        }
        if (!this.isFalling && this.character.velocity.z < 100) {
            this.isFalling = true;
            new Tween({ scale: 2 }).to({ scale: 0.8 }, 300).onUpdate((obj) => {
                if (this.jumpEffect) {
                    this.jumpEffect.localTransform.scale = new mw.Vector(obj.scale);
                }
            }).start();
        }
        return false;
    }

}

let AIR_ANIM = "14657";
let GROUND_ANIM = "197792";
let GROUND_EFFECT = "117231";
let JUMP_EFFECT = "151527";