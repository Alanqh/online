/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-21 11:08:34
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-05-30 14:28:19
 * @FilePath     : \stumbleguys\JavaScripts\AI\HumanoidManager.ts
 * @Description  : 修改描述
 */
import { Humanoid } from "./Humanoid";
import { Swoop } from "./Swoop";

export namespace HumanoidManager {
    const humanoids: Humanoid[] = [];
    const swoops: Swoop[] = [];
    export function onUpdate(dt: number) {
        for (let i = 0; i < humanoids.length; i++) {
            const humanoid = humanoids[i];
            if (humanoid.onUpdate(dt)) {
                humanoids.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < swoops.length; i++) {
            if (swoops[i].onUpdate(dt)) {
                swoops.splice(i, 1);
                i--;
            }
        }
    }
    /**飞扑 */
    export function swoop(character: Character, timeOut: number) {
        if (swoops.find(i => i.humanoid == character)) return;
        swoops.push(new Swoop(character, timeOut));
    }
    export function addHumanoid(character: Character, dist: mw.Vector, cfg) {
        if (!character["ai"]) {
            character["ai"] = new Humanoid(character, dist, cfg);
            humanoids.push(character["ai"]);
        }
        return character["ai"] as Humanoid;
    }

    /**
     * 获取所有ai
     */
    export function getHunabiuds(): Humanoid[] {
        return humanoids;
    }
    export function stop() {
        for (let i = 0; i < swoops.length; i++) {
            swoops[i].stop();
        }
        swoops.length = 0;
    }

    function init() {
        Event.addLocalListener("GameState.End.Server", () => {
            HumanoidManager.stop();
        });

        AssetUtil.asyncDownloadAsset("122290");
    }
    init();
}