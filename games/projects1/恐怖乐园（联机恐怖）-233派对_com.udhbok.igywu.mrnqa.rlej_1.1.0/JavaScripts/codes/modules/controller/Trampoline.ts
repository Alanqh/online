/*
 * @Author       : dal
 * @Date         : 2024-05-19 16:46:25
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-19 16:51:57
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\controller\Trampoline.ts
 * @Description  : 
 */

import { WaitLoop } from "../../utils/AsyncTool";
import MusicMgr from "../../utils/MusicMgr";

@Component
export default class Trampoline extends Script {

    @mw.Property({ displayName: "力" })
    force: number = 5000;

    lis: EventListener;

    protected onStart() {
        if (SystemUtil.isClient()) {
            WaitLoop.loop(() => { return this.gameObject }).then((v: Trigger) => {
                v.onEnter.add((go: Character) => {
                    if (!(go instanceof Character) || go.player != Player.localPlayer) { return; }
                    Event.dispatchToServer("TrampolineEvt" + this.gameObject["BuildingUUID"]);
                    MusicMgr.instance.play(2008);
                });
            })
        } else {
            this.lis = Event.addClientListener("TrampolineEvt" + this.gameObject["BuildingUUID"], (player: Player) => {
                player.character.addImpulse(this.gameObject.worldTransform.getUpVector().multiply(this.force), true);
            });
        }
    }

    protected onHide() {
        if (this.lis) { this.lis.disconnect(); }
    }
}