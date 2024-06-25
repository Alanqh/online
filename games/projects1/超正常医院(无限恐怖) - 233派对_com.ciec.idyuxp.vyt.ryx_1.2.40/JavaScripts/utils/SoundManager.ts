import { GameConfig } from "../config/GameConfig";
import { utils } from "./uitls";

export class SoundManager {

    private sound: mw.Sound;

    private static _instance: SoundManager;
    public static get instance(): SoundManager {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }

    public async play3DSound(soundId: number, target: mw.Vector | mw.GameObject): Promise<number> {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        await utils.downloadAsset(soundInfo.AssetID)
        // let falloffDis = soundInfo.falloffDistance == 0 ? 600 : soundInfo.falloffDistance;
        // let shapeDis = soundInfo.shapeExtents == 0 ? 200 : soundInfo.shapeExtents;
        return SoundService.play3DSound(soundInfo.AssetID, target, 1, 1);

    }

    public async playAtkSound(soundId: number, target: mw.Vector | mw.GameObject) {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        await utils.downloadAsset(soundInfo.AssetID)
        // let falloffDis = soundInfo.falloffDistance == 0 ? 600 : soundInfo.falloffDistance;
        // let shapeDis = soundInfo.shapeExtents == 0 ? 200 : soundInfo.shapeExtents;

        if (this.sound && this.sound.playState == 0) {
            return;
        }
        let playId = SoundService.play3DSound(soundInfo.AssetID, target, 1, 1);
        SoundService.get3DSoundById(playId).then(go => {
            this.sound = go;
        })
    }

    /**播放3D循环音效 */
    public play3DSoundLoop(soundId: number, target: mw.Vector | mw.GameObject): number {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        return SoundService.play3DSound(soundInfo.AssetID, target, 0, 1);

    }

    /**播放背景音乐 */
    public async playBGM(soundId: number): Promise<void> {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        await utils.downloadAsset(soundInfo.AssetID)
        SoundService.playBGM(soundInfo.AssetID);
    }

    /**播放音效 */
    public async playSound(soundId: number): Promise<void> {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        await utils.downloadAsset(soundInfo.AssetID)
        SoundService.playSound(soundInfo.AssetID, 1);
    }

    /**循环播放音效 */
    public async playLoopSound(soundId: number): Promise<string> {
        let soundInfo = GameConfig.Audio.getElement(soundId);
        if (!soundInfo) return;
        await utils.downloadAsset(soundInfo.AssetID)
        return SoundService.playSound(soundInfo.AssetID, 0);
    }

}