/** 
 * @Author       : lei.zhao
 * @Date         : 2023-08-17 17:00:38
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-09-19 17:32:56
 * @FilePath     : \stumbleguys\JavaScripts\tool\ItemService.ts
 * @Description  : 修改描述
 */

import { GameConfig } from "../config/GameConfig";

export namespace ItemService {
    let currentHandItemId = 0;
    const hanlders: ((type: HandItemType) => void)[] = [];
    const useHanlders: ((type: HandItemType, rotation: number) => void)[] = [];
    const joyHanlders: ((type: HandItemType, rotation: number) => void)[] = [];
    const unHanlders: ((type: HandItemType, isReplace: boolean) => void)[] = [];
    export const enum HandItemType {
        Bomb = 1,
        Wing,
        BigPotion,
        SmallPotion,
        Gun,
        IceLolly,
        Title,
        FishBait,
        Tempest,
        Laser
    }
    /**
     * 装备回调
     * @param handler 
     */
    export function addEquipHandler(handler: (type: HandItemType) => void) {
        hanlders.push(handler);
    }
    /**
     * 取消装备回调
     * @param handler 
     */
    export function addUnEquipHandler(handler: (type: HandItemType, isReplace: boolean) => void) {
        unHanlders.push(handler);
    }
    /**
     * 使用回调，道具监听这个方法来使用
     * @param handler 
     */
    export function addUseHandler(handler: (type: HandItemType, rotation: number) => void) {
        useHanlders.push(handler);
    }
    /**
     * 摇杆拖动事件
     * @param handler 
     * @param rotation 世界旋转Z轴角度
     */
    export function addJoyStickHandler(handler: (type: HandItemType, rotation: number) => void) {
        joyHanlders.push(handler);
    }
    export function onItemJoyStick(type: HandItemType, rotation: number) {
        joyHanlders.forEach(handler => {
            handler(type, rotation);
        });
    }

    export function equipItem(id: HandItemType) {
        const cfg = GameConfig.Prop.getElement(id);
        if (cfg.type == 1) return;
        if (currentHandItemId == id) {
            return;
        }
        if (currentHandItemId) {
            //先卸载再装备
            unEquipItem(currentHandItemId, true);
        } else {
            Event.dispatchToLocal("Hand.Hide", Player.localPlayer.character, PropertyStatus.Off);
        }
        hanlders.forEach(handler => {
            handler(id);
        });
        currentHandItemId = id;
    }
    export function unEquipItem(id: HandItemType, isReplace = false) {
        unHanlders.forEach(handler => {
            handler(id, isReplace);
        });
        currentHandItemId = 0;
        if (!isReplace) {
            Event.dispatchToLocal("Hand.Hide", Player.localPlayer.character, PropertyStatus.On);
        }
    }

    export function useItem(rotation: number) {
        if (currentHandItemId) {
            useHanlders.forEach(handler => {
                handler(currentHandItemId, rotation);
            });
        }
        // this.playerCtrlUI.iceLollyBtn.enable = false;
        // this.playerCtrlUI.iceLollyBtn.fanShapedValue = 0;
    }
}
