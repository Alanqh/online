
import { oTrace, oTraceError } from "odin";
import { GameConfig } from "../config/GameConfig";
import { GlobalData } from '../const/GlobalData';
import { utils } from "./uitls";

export class EffectManager {

    private static _instance: EffectManager;
    public static get instance(): EffectManager {
        if (!this._instance) this._instance = new EffectManager();
        return this._instance;
    }

    public stopEffect(id: number): void {
        EffectService.stop(id);
    }

    /**
     * 在物体上播放特效并设置裁剪
     * @param id 特效表id
     * @param obj 父物体
     * @param clip 裁剪
     * @returns 
     */
    public playEffOnObjScene(id: number, obj: mw.GameObject, clip: number = 5000): mw.Effect {
        const effInfo = GameConfig.Effect.getElement(id);
        let Particle = GameObject.findGameObjectById(effInfo.EffectID);
        if (!Particle) return;
        let nParticle = (Particle.clone()) as mw.Effect;
        nParticle.parent = obj;
        nParticle.localTransform.position = effInfo.EffectLocation;
        nParticle.localTransform.rotation = new mw.Rotation(effInfo.EffectRotate);
        nParticle.worldTransform.scale = effInfo.EffectLarge;
        nParticle.setCullDistance(clip);
        nParticle.play();
        nParticle.onFinish.add(() => {
            nParticle.play();
        })
        return nParticle;
    }

    /**播放特效在位置上*/
    public async playEffectOnPos(id: number, pos: mw.Vector): Promise<number> {
        const effInfo = GameConfig.Effect.getElement(id);
        if (effInfo.EffectLocation.z != 0) {
            pos.z += effInfo.EffectLocation.z;
        }
        let duration = undefined;
        let loopCount = effInfo.EffectTime;
        if (loopCount < 0) {
            duration = -effInfo.EffectTime;
            loopCount = undefined;
        }
        await utils.downloadAsset(effInfo.EffectID);

        GlobalData.Global.tmpRotation.x = effInfo.EffectRotate.x;
        GlobalData.Global.tmpRotation.y = effInfo.EffectRotate.y;
        GlobalData.Global.tmpRotation.z = effInfo.EffectRotate.z;

        let effId = EffectService.playAtPosition(effInfo.EffectID, pos, {
            loopCount: effInfo.EffectTime,
            duration: duration,
            rotation: GlobalData.Global.tmpRotation,
            scale: effInfo.EffectLarge,
        });
        if (effInfo.Rate && SystemUtil.isClient()) {
            EffectService.getEffectById(effId).then((effect) => {
                effect?.setFloat("Rate", effInfo.Rate);
            })
        }

        if (effInfo.ColorValue && SystemUtil.isClient()) {
            EffectService.getEffectById(effId).then((effect) => {
                effect.setColor("Color", LinearColor.colorHexToLinearColor(effInfo.ColorValue));
            });
        }
        return effId;
    }

    public async playEffectOnGameObject(char: GameObject, cfgID: number) {
        let effectId = cfgID;
        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            console.error("error effectcfg")
            return
        }

        GlobalData.Global.tmpRotation.x = effectcfg.EffectRotate.x;
        GlobalData.Global.tmpRotation.y = effectcfg.EffectRotate.y;
        GlobalData.Global.tmpRotation.z = effectcfg.EffectRotate.z;

        await utils.downloadAsset(effectcfg.EffectID);

        let id = EffectService.playOnGameObject(
            effectcfg.EffectID,
            char,
            {
                slotType: effectcfg.EffectPoint,
                loopCount: effectcfg.EffectTime,
                position: effectcfg.EffectLocation,
                rotation: GlobalData.Global.tmpRotation,
                scale: effectcfg.EffectLarge
            });


        if (effectcfg.Rate && SystemUtil.isClient()) {
            EffectService.getEffectById(id).then((effect) => {
                effect?.setFloat("Rate", effectcfg.Rate);
            })
        }

        if (effectcfg.ColorValue && SystemUtil.isClient()) {
            EffectService.getEffectById(id).then((effect) => {
                effect.setColor("Color", LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
            });
        }

        return id;
    }

    /**播放特效在玩家上 */
    public async playEffectOnPlayer(effectId: number, target: mw.Player | mw.Character) {
        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            console.error("error effectcfg")
            return
        }

        await utils.downloadAsset(effectcfg.EffectID);

        let duration = undefined;
        let loopCount = effectcfg.EffectTime;
        if (loopCount < 0) {
            duration = -effectcfg.EffectTime;
            loopCount = undefined;
        }

        let id = EffectService.playOnGameObject(
            effectcfg.EffectID,
            target instanceof mw.Player ? target.character : target,
            {
                slotType: effectcfg.EffectPoint,
                loopCount: loopCount,
                duration: duration,
                position: effectcfg.EffectLocation,
                rotation: effectcfg.EffectRotate.toRotation(),
                scale: effectcfg.EffectLarge
            });

        if (effectcfg.Rate && SystemUtil.isClient()) {
            EffectService.getEffectById(id).then((effect) => {
                effect?.setFloat("Rate", effectcfg.Rate);
            })
        }

        if (effectcfg.ColorValue && SystemUtil.isClient()) {
            EffectService.getEffectById(id).then((effect) => {
                if (!effect) return;
                effect.setColor("Color", LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
            });
        }


        return id;
    }

}