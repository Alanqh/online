import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : yuanqi.bai
* @Date         : 2023-02-09 14:45:02
* @LastEditors  : yuanqi.bai
* @LastEditTime : 2023-08-21 17:47:32
* @FilePath     : \stumbleguys\JavaScripts\Prefabs\淘汰游戏触发器\Script\EliminateScript.ts
* @Description  : 淘汰机制触发器
*/

import { CLAI } from "../../../AI/client/ClientAIService";
import { MGSGame } from "../../../mgs/MGSGame";
import { Singleton } from "../../../tool/Singleton";

@Component
export default class EliminateScript extends mw.Script {

    private character: Character;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        if (this.isRunningClient()) {

            Player.asyncGetLocalPlayer().then(player => {
                this.character = player.character;
            });
            Event.addLocalListener("GameState.End.Client", () => {
                (this.gameObject as mw.Trigger).enabled = false;
            });
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {

                if (other) {
                    if (other == this.character) {
                        Event.dispatchToLocal("Eliminate_Self_Character");
                    } else if (PlayerManagerExtesion.isNpc(other)) {
                        Event.dispatchToLocal("AI.Eliminate.Client", other.gameObjectId);
                        CLAI.finish(other);
                    } else if (PlayerManagerExtesion.isCharacter(other)) {
                        if (other.getVisibility()) {
                            Singleton.getIns(MGSGame).otherPlayerEliminate(other.gameObjectId);
                        }
                        Event.dispatchToLocal("GameState.EliminatePlayer.Watch", other.gameObjectId);
                    }
                }
            })

        }
    }
}
