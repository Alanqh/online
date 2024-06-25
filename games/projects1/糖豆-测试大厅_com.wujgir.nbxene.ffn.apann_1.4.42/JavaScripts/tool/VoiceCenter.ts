/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-24 16:06:19
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-03-19 17:24:38
 * @FilePath     : \stumbleguys\JavaScripts\tool\VoiceCenter.ts
 * @Description  : 修改描述
 */

import { GameConfig } from "../config/GameConfig";
import { BGMHelper } from "./BGMScript";
import { Utils } from "./Utils";
class VoiceCenter {
    constructor() {
        Event.addLocalListener("PLAY_BY_CFG", (id: number, location: mw.Vector) => {
            let cfg = GameConfig.Voice.getElement(id);
            if (cfg) {
                if (cfg.loop == 0) {
                    BGMHelper.playBGM(cfg.guids, cfg.SoundPropportion);
                } else {
                    if (location) {
                        this.play3DSound(cfg.guids[0], location, cfg.SoundPropportion, cfg.distance);
                    } else {
                        this.playSound(cfg.guids[0], cfg.SoundPropportion);
                    }
                }
            }
        });
    }
    private async playSound(guid: string, volume: number) {
        await Utils.downloadAsset(guid);
        SoundService.playSound(guid, 1, volume);
        // console.log("play____sound", guid);

    }
    private playBgm(guid: string, volume: number) {
        // console.log("play____bgm", guid);
        SoundService.playBGM(guid, volume);
    }
    private play3DSound(guid: string, location: mw.Vector, volume: number, distance: number) {
        // console.log("play____3d", guid);

        SoundService.play3DSound(guid, location, 1, volume, { falloffDistance: distance });
    }
}
export let VoiceCenterIns = new VoiceCenter();