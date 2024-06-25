/** 
 * @Author       : bao.zhang bao.zhang@appshahe.com
 * @Date         : 2023-01-05 16:47:08
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-07-17 18:39:11
 * @FilePath     : \stumbleguys\JavaScripts\tool\Utils.ts
 * @Description  : 
 * @
 */

import { SpawnManager } from "../Modified027Editor/ModifiedSpawn";



/** 
 * @Author       : lei.zhao
 * @Date         : 2022-11-03 15:33:45
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-01-04 10:29:54
 * @FilePath     : \HappyParty\JavaScripts\tool\Utils.ts
 * @Description  : 修改描述
 */
if (mw.SystemUtil.isServer()) {
    const _isRunOnMobile = (puerts.argv.getByName("Proxy") as any).ProjectDir.indexOf(":") < 0;
    DataStorage.setTemporaryStorage(!_isRunOnMobile);
}


export namespace Utils {
    let localPlayerId = 0;
    let _bgmId: string = null;
    export let localCharacter: Character;
    let isMobile: boolean;
    if (mw.SystemUtil.isClient()) {
        const inter = setInterval(() => {
            const player = Player.localPlayer
            if (player) {
                localPlayerId = player.playerId;
                localCharacter = player.character;
                clearInterval(inter);
            }
        }, 100);

    }

    export function isRunOnMobile() {
        if (isMobile == null) {
            isMobile = (puerts.argv.getByName("Proxy") as any).ProjectDir.indexOf(":") < 0;
        }
        return isMobile;
    }


    export function lerp(a: number, b: number, t: number) {
        if (t > 1) t = 1;
        return a + (b - a) * t;
    }
    export function rangeInt(a: number, b: number) {
        return Math.floor(a + (b - a) * Math.random());
    }
    export function randomInList<T>(list: T[]): T {
        return list[Utils.rangeInt(0, list.length)];
    }


    export function formatGold(gold: number) {
        return gold.toString();
    }
    function toHex(linear: number) {
        let result = 0;
        if (linear <= 0.0031308) {
            result = Math.floor(linear * 12.92 * 256);
        } else {
            result = Math.floor((1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055) * 256);
        }
        return `${result > 15 ? '' : '0'}${result.toString(16)}`;
    }
    export function colorToHex(color: mw.LinearColor) {
        return `${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${toHex(color.a)}`;
    }
    export function formatText(text: string, ...params: any[]) {
        return text.replace(/\{(\d+)\}/g, (text, index) => {
            return params[index];
        });
    }

    /**
     * 循环往复的运动
     * @param a t=0和t=1返回a
     * @param b t=0.5返回b
     * @param t 
     * @returns 
     */
    export function yoyo(a: number, b: number, t: number) {
        const aT = t * 2;
        if (aT >= 1) {
            t = 2 - aT;
        } else {
            t = aT;
        }
        return a + (b - a) * t;
    }
    export const currentCharacter = () => {
        return localCharacter;
    }

    export async function downloadAsset(guid: string) {
        if (AssetUtil.assetLoaded(guid)) return true;
        return AssetUtil.asyncDownloadAsset(guid);
    }
    /**
     * 创建一个游戏物体
     * @param guid 
     */
    export function spawnGameObject<T extends mw.GameObject>(guid: string) {
        return SpawnManager.wornSpawn(guid) as T;
    }


    export async function isLocalCharacter(character: Character) {
        if (localPlayerId) {
            return character.player.playerId == localPlayerId;
        } else {
            return new Promise(res => {
                const inter = setInterval(() => {
                    if (localPlayerId) {
                        clearInterval(inter);
                        res(character.player.playerId == localPlayerId);
                    }
                }, 50);
            });
        }
    }


    /**
     * 查找物体
     * @param guid 
     * @returns 
     */
    export function findGo<T extends mw.GameObject>(guid: string) {
        return GameObject.findGameObjectById(guid) as T;
    }
    /**
     * 异步查找物体
     * @param guid 
     * @returns 
     */
    export async function asyncFind<T extends mw.GameObject>(guid: string) {
        return GameObject.asyncFindGameObjectById(guid) as Promise<T>;
    }

    export function setImageByAsset(icon: mw.Image, e: any) {
        if (e.iconData) {
            icon.setImageByAssetIconData(e.iconData);
        } else {
            Utils.downloadAsset("117502").then(() => {
                icon.imageGuid = "117502"
            });
        }
    }

    /**装扮拖尾 */
    export async function garniture(character: Character, guid: string, location: mw.Vector, rotation: mw.Rotation) {
        const obj = await SpawnManager.asyncSpawn({ guid: guid, replicates: false });
        if (obj instanceof mw.Effect) {
            obj.loop = true;
            obj.play();
        }
        character.attachToSlot(obj, mw.HumanoidSlotType.Root);
        obj.localTransform.position = location;
        obj.localTransform.rotation = rotation;
        return obj;
    }

    /**
     * 判断两个玩家是否在同一个队伍
     * @param player 玩家
     */
    export function checkSameTeam(mPlayer: mw.Player, otherPlayer: mw.Player): boolean {
        if (mPlayer.teleportId == otherPlayer.teleportId) {
            return true;
        } else {
            return false
        }
    }
    /**
     * 从本列表中移除
     */
    export function removeOneFromList<T>(list: T[], target: T) {
        let index = list.findIndex(find => find == target);
        if (index != -1) {
            list.splice(index, 1)
            return true;
        }
        return false;
    }
    /**
     * 无效对象
     */
    export function illegalParam(param: any) {
        return param == null || param == undefined;
    }
    export function isNpc(other: Character) {
        return !other.player
    }
}
