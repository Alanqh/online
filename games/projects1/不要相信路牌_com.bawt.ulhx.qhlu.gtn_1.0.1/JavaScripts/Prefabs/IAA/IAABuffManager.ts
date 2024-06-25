import { PrefabEvent } from "../../prefabEvent/PrefabEvent";

/*

 * @Date         : 2023-03-29 14:38:35

 * @LastEditTime : 2023-03-29 14:44:18
 * @FilePath     : \commonprefab3\JavaScripts\Prefabs\IAA\IAABuffManager.ts
 * @Description  : 
 */
export class IAABuffManager {
    public static get instance(): IAABuffManager {
        if (!this._instance) {
            this._instance = new IAABuffManager();
        }
        return this._instance;
    }
    private static _instance: IAABuffManager;

    /**
     * 飞行的timeOutHandle
     */
    private _flyHandler: number | undefined;

    /**
     * (C端)切换为飞行模式
     * @param keepTime 持续时间
     */
    public switchToFly(keepTime: number) {
        let player = Player.localPlayer;
        if (this._flyHandler != undefined) {
            clearTimeout(this._flyHandler);
            this._flyHandler = undefined;
        }
        PrefabEvent.PrefabEvtPlayerStat.setPlayerStat(player.character.gameObjectId, player.character.gameObjectId, PrefabEvent.PlayerStatType.Flying);
        setTimeout(() => {
            this._flyHandler = undefined;
            PrefabEvent.PrefabEvtPlayerStat.setPlayerStat(player.character.gameObjectId, player.character.gameObjectId, PrefabEvent.PlayerStatType.Walking);
        }, keepTime * 1000);
    }

    /**
     * 增加跳跃力
     * @param addVal 增加的值 
     * @param keepTime 持续时间
     */
    public addJumpForce(addVal: number, keepTime: number) {
        let player = Player.localPlayer;
        player.character.maxJumpHeight += addVal;
        setTimeout(() => {
            player.character.maxJumpHeight -= addVal;
        }, keepTime * 1000);
    }

    /**
     * 增加移动速度
     * @param addVal 增加的值 
     * @param keepTime 持续时间
     */
    public addMoveSpd(addVal: number, keepTime: number) {
        let player = Player.localPlayer;
        player.character.maxWalkSpeed += addVal;
        setTimeout(() => {
            player.character.maxWalkSpeed -= addVal;
        }, keepTime * 1000);
    }
}