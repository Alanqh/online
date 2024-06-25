/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-07 16:59:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-08 19:08:23
 * @FilePath     : \TrackCamera\Prefabs\CameraRuntime\Script\Camera.ts
 * @Description  : 修改描述
 */

import { Player } from "./Player";

export namespace Camera {
    const player = new Player();
    let now = 0;
    const update = function () {
        const _now = Date.now();
        if (now > 0) {
            const passTime = (_now - now) / 1000;
            player.onUpdate(passTime);
        }
        now = _now
    }
    if (SystemUtil.isClient()) {
        player.ready().then(() => {
            setInterval(update, 1);
        });
    }
    export function simplePlay(config: string) {
        player.load(config).play();
    }
    /**获取播放器 */
    export function getPlayer() {
        return player;
    }
}