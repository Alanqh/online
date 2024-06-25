import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : zhenyu.zhang
* @Date         : 2023-02-06 11:36:22
* @LastEditors  : lei.zhao
* @LastEditTime : 2023-09-06 14:50:58
* @FilePath     : \stumbleguys\JavaScripts\Prefabs\FinishLine\Script\FinishLine.ts
* @Description  : 终点线
*/

import { CLAI } from "../../../AI/client/ClientAIService";
import { MGSGame } from "../../../mgs/MGSGame";
import { Singleton } from "../../../tool/Singleton";
import { recordCharacter } from "../../CheckPoint/Script/CheckPoint";

@Component
export default class FinishLine extends mw.Script {


    protected onStart(): void {

        if (mw.SystemUtil.isServer()) {

            // 服务器触发事件
            (this.gameObject as mw.Trigger).onEnter.add((character) => {
                if (PlayerManagerExtesion.isCharacter(character)) {
                    const playerId = character.player.playerId;
                    Event.dispatchToLocal("FinishLine.Pass.Server", playerId);
                }

                if (PlayerManagerExtesion.isNpc(character)) {
                    const guid = character.gameObjectId;
                    Event.dispatchToLocal("FinishLine.Pass.Server", guid);
                    setTimeout(() => {
                        //防止过早回收，等客户端创建完毕
                        Event.dispatchToLocal("AI.Recycle.Server", character);
                    }, 60);
                }
            });
        }

        if (mw.SystemUtil.isClient()) {
            CLAI.finishLine(this);
            (this.gameObject as mw.Trigger).onEnter.add((character) => {
                if (PlayerManagerExtesion.isCharacter(character)) {
                    const guid = character.gameObjectId;
                    Event.dispatchToLocal("FinishLine.Pass.Client", guid);
                    if (character.player && character.player.playerId == recordCharacter.playerId) {
                        recordCharacter && recordCharacter.onRecord();
                        if (character.getVisibility()) {
                            Event.dispatchToLocal("EnterPointClient", character.gameObjectId, 1000, true);
                        }
                    }
                } else if (PlayerManagerExtesion.isNpc(character)) {
                    CLAI.finish(character);
                    if (character.getVisibility()) {
                        Event.dispatchToLocal("EnterPointClient", character.gameObjectId, 1000, false);
                        Singleton.getIns(MGSGame).onAIFinished();

                    }
                }
            });
        }

    }

}