import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
﻿/** 
 * @Author       : lei.zhao
 * @Date         : 2023-06-01 16:06:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-01 16:20:05
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\Redcarpet\RedCarpet.ts
 * @Description  : 修改描述
 */
import { Utils } from "../../tool/Utils";

@Component
export default class RedCarpet extends mw.Script {
    @mw.Property({ displayName: "触发器Guid" })
    private triggerGuid: string = "";
    @mw.Property({ displayName: "彩带特效Guid" })
    public effectGuids: string[] = [""];
    /**触发器 */
    private _trigger: mw.Trigger;
    /**彩带特效 */
    private effects: mw.Effect[] = [];

    private players: number[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.effectGuids.forEach(element => {
            GameObject.asyncFindGameObjectById(element).then(Obj => {
                if (Obj instanceof mw.Effect) {
                    this.effects.push(Obj);
                }
            })
        })
        const tri = this.gameObject;
        if (tri instanceof mw.Trigger) {
            this._trigger = tri;
            this._trigger.onEnter.add((obj) => {
                if (PlayerManagerExtesion.isCharacter(obj)) {
                    if (!obj.player) {
                        return;
                    }
                    let index = this.players.findIndex(i => i == obj.player.playerId);
                    if (index >= 0) {
                        return;
                    }
                    this.players.push(obj.player.playerId);
                    /**如果是同一个队伍，播放特效 */
                    if (Utils.checkSameTeam(Player.localPlayer, obj.player)) {
                        this.effects.forEach(element => {
                            element.play();
                        });
                    }
                }
            })
        }
    }
}