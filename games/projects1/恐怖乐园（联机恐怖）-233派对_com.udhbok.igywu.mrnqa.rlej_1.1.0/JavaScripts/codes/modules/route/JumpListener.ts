/**
 * 跳游戏的数据监听
 */
export class JumpListener {
    /** 单例 */
    public static instance: JumpListener = new JumpListener();

    /**
     * 初始化跳游戏功能
     * @effect 双端可用
     */
    public init() {
        Event.addClientListener("evt_jump_game", (player: mw.Player, scene?: string) => {
            JumpListener.instance.jumpScene([player.userId], scene);
        });
    }

    /**
     * 双端组队跳游戏
     * @param player 组队跳转的玩家 playerId
     * @param sceneName 目标游戏 gameID，默认先取跳来的游戏，没有再跳默认主游戏
     * @param data 携带数据
     * @effect 双端可用
     */
    public async jumpScene(userIDs: string[], sceneName: string, data?: Record<string, unknown>[]) {
        data = data || [];
        data.push({ __team: userIDs });
        console.log("这些人跳了游戏" + userIDs)
        await TeleportService.asyncTeleportToScene(sceneName, userIDs);
    }

    /**
     * 双端组队跳游戏
     * @param player 组队跳转的玩家 playerId
     * @param sceneName 目标游戏 gameID，默认先取跳来的游戏，没有再跳默认主游戏
     * @param data 携带数据
     * @effect 双端可用
     */
    public async jumpSelf(sceneName: string) {
        Event.dispatchToServer("evt_jump_game", sceneName);
    }
}
