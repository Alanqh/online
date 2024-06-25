import { GeneralManager } from '../Modified027Editor/ModifiedStaticAPI';
/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-22 14:35:48
* @LastEditors  : weihao.xu
* @LastEditTime : 2023-06-12 11:22:50
* @FilePath     : \stumbleguys\JavaScripts\tool\GearCenter.ts
* @Description  : 机关的击中反馈
*/

import { GameConfig } from "../config/GameConfig";
class GearCenter {
    constructor() {
        /**
         * 客户端逻辑，接受character的guid，gear表对应的id，character位置
         */
        Event.addLocalListener("GEAR_EFF_BY_CFG", (guid: string, Id: number, location: mw.Vector) => {
            let cfg = GameConfig.Gear.getElement(Id);
            if (cfg) {
                // 声音
                Event.dispatchToLocal("PLAY_BY_CFG", cfg.sound, location);
                // 特效
                let player = Player.localPlayer;
                if (player && player.character.gameObjectId === guid && cfg.light) {
                    const effect = GameConfig.Effect.getElement(cfg.light);
                    GeneralManager.rpcPlayEffectOnPlayer(effect.guid, player, mw.HumanoidSlotType.BackOrnamental, 1, effect.offset, effect.rotation.toRotation(), effect.scale);
                }
            }
        });

        Event.addServerListener("OnCannonHit", (guid: string, Id: number, location: mw.Vector) => {
            Event.dispatchToLocal("GEAR_EFF_BY_CFG", guid, Id, location);
        })
    }
}
export let GearCenterInst = new GearCenter();