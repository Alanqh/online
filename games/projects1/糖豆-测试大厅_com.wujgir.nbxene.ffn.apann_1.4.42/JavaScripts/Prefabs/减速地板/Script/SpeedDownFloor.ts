import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-01 17:01:21
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-12 13:15:37
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\减速地板\Script\SpeedDownFloor.ts
 * @Description  : 减速地板
 */

@Component
export default class SpeedDownFloor extends mw.Script {

    @mw.Property({ displayName: "玩家踩在上面的速度" })
    private _characterSpeed: number = 10;

    // private _orgSpeed: number = 0;

    protected onStart(): void {

        const trigger = this.gameObject as mw.Trigger;
        if (this.isRunningClient()) {

            trigger.onEnter.add((character: mw.GameObject) => {
                if (PlayerManagerExtesion.isCharacter(character) && Player.localPlayer && character.player && character.player.playerId == Player.localPlayer.playerId) {
                    character.maxWalkSpeed = this._characterSpeed;
                }
                if (PlayerManagerExtesion.isNpc(character)) {
                    character.maxWalkSpeed = this._characterSpeed;
                }
            });

            trigger.onLeave.add((character: mw.GameObject) => {
                if (PlayerManagerExtesion.isCharacter(character) && Player.localPlayer && character.player && character.player.playerId == Player.localPlayer.playerId) {
                    character.maxWalkSpeed = 450;
                }
                if (PlayerManagerExtesion.isNpc(character)) {
                    character.maxWalkSpeed = 450;
                }
            });
        } else {
            trigger.onEnter.add((character: mw.GameObject) => {
                if (PlayerManagerExtesion.isNpc(character)) {
                    character.maxWalkSpeed = this._characterSpeed;
                }
            });

            trigger.onLeave.add((character: mw.GameObject) => {
                if (PlayerManagerExtesion.isNpc(character)) {
                    character.maxWalkSpeed = 450;
                }
            });
        }

    }

}