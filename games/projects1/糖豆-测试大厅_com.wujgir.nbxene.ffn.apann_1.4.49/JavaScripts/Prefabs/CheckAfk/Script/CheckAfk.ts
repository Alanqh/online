import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-21 15:40:55
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-03-29 18:38:06
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\CheckAfk\Script\CheckAfk.ts
 * @Description  : 确定玩家是否挂机
 */

@Component
export default class CheckAfk extends mw.Script {

    protected onStart() {
        if (SystemUtil.isServer()) {
            (this.gameObject as mw.Trigger).onEnter.add(go => {
                if (PlayerManagerExtesion.isCharacter(go) && go.player) {
                    Event.dispatchToLocal("CheckAfk.server", go.player.playerId);
                }
            });
        }

        if (SystemUtil.isClient()) {
            Player.asyncGetLocalPlayer().then(player => {
                (this.gameObject as mw.Trigger).onEnter.add(go => {
                    if (PlayerManagerExtesion.isCharacter(go) && go.player && player == go.player) {
                        Event.dispatchToLocal("CheckAfk.client", player.playerId);
                    }
                });
            })
        }
    }

}