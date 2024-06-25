import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { Utils } from "./Utils";

/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-03-19 16:12:41
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-03-19 17:26:05
 * @FilePath     : \stumbleguys\JavaScripts\tool\BGMScript.ts
 * @Description  : 修改描述
 */
export namespace BGMHelper {
    const bgmMap = {};
    let _bgmList = [];
    let _bgmIndex = 0;
    let _curDuration = 0;
    let _volume = 1;
    let _playing = false;
    const init = async (guids: string[]) => {
        await guids.forEach(async (guid: string) => {
            if (!bgmMap[guid]) {
                await Utils.downloadAsset(guid);
                let voice = await SpawnManager.asyncSpawn<mw.Sound>({ guid: guid }) as mw.Sound;
                if (voice) {
                    bgmMap[guid] = voice.timeLength;
                    voice.destroy();
                }
            }
        });
    }

    export const playBGM = async (guids: string[], volume: number) => {
        await init(guids);
        _volume = volume;
        _bgmList = guids;
        _bgmIndex = 0;
        _curDuration = 0;
        _playing = true;
    }

    export const onUpdate = (dt: number) => {
        if (!_playing) return;
        if (_curDuration >= 0) {
            _curDuration -= dt;
        }
        else {
            let guid = _bgmList[_bgmIndex];
            if (!guid) return;
            if (!bgmMap[guid]) return;
            _curDuration = bgmMap[guid] / 1000;
            _bgmIndex = (_bgmIndex + 1) % _bgmList.length;
            SoundService.playBGM(guid, _volume);
        }
    }

    export const stopBGM = () => {
        _playing = false;
        SoundService.stopBGM();
    }
}