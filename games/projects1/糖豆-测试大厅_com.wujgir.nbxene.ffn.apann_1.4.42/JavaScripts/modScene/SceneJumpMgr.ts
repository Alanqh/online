// import { Singleton } from "../utils/Singleton";

import { Singleton } from "../tool/Singleton";

const CLIENT_JUMP_EVENT: string = "CLIENT_JUMP_EVENT";
class SceneJumpMgr {
    constructor() {
        Event.addClientListener(CLIENT_JUMP_EVENT, (player, users: string[], sceneName: string, data: string) => {
            this.onServerjumpToScene(users, sceneName, data);
        });
    }
    /**
     * 跳转到指定场景,支持双端调用
     * @param users 
     * @param sceneName 
     * @param data 键值对结构
     */
    jumpToScene(users: string[], sceneName: string, data: any) {
        if (!data) data = {};
        if (SystemUtil.isClient()) {
            Event.dispatchToServer(CLIENT_JUMP_EVENT, users, sceneName, JSON.stringify(data));
        } else {
            this.onServerjumpToScene(users, sceneName, JSON.stringify(data));
        }
    }
    /**
     * 获取跳转数据，服务端调用
     * @param teleportId Player.localPlayer.teleportId
     * @returns 
     */
    getJumpData<T>(teleportId: string): T {
        const data = TeleportService.getTeleportData(teleportId);
        if (data) {
            return JSON.parse(data as string) as T
        } return null;
    }

    private onServerjumpToScene(users: string[], sceneName: string, data: string) {
        console.log("跳转游戏___#$#$#$#$#$#$", sceneName);
        TeleportService.asyncTeleportToScene(sceneName, users, { teleportData: data }).then((res: mw.TeleportResult) => {
            console.log("跳转结果————————", res.status);
            if (res.status == TeleportStatus.timeout) {
                setTimeout(() => {
                    this.onServerjumpToScene(users, sceneName, data);
                }, 3000);
            }
        }).catch((res: mw.TeleportResult) => {
            console.log("跳转结果————————?", sceneName, JSON.stringify(res));
            if (res.status == TeleportStatus.timeout) {
                setTimeout(() => {
                    this.onServerjumpToScene(users, sceneName, data);
                }, 3000);
            }
        });
    }
}
export let SceneJumpService = Singleton.getIns(SceneJumpMgr);