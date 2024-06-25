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

        } else {
            (this.gameObject as mw.Trigger).onEnter.add((other: mw.GameObject) => {
                if (PlayerManagerExtesion.isNpc(other)) {
                    // this.eliminate(other.guid);
                    Event.dispatchToLocal("GameState.EliminatePlayer.Server", other.gameObjectId);
                    Event.dispatchToLocal("AI.Reuse.Server", other);
                }
            })
        }
    }
}
// class WatchUI extends WatchUI_Generate {
//     private tweenIndex: number = 0;
//     private tweenHandle: mw.Tween<TweenUI>[] = [];
//     protected onAwake(): void {
//         this.initTween();
//         this.btnLeft.onClicked.add(() => {
//             Event.dispatchToLocal("GameState.WatchGaming.Client", -1)
//         });
//         this.btnRight.onClicked.add(() => {
//             Event.dispatchToLocal("GameState.WatchGaming.Client", 1);
//         });

//         this.btnAssist.onClicked.add(() => {
//             let tween = this.tweenHandle[this.tweenIndex % this.tweenHandle.length];
//             this.tweenIndex++;
//             tween.stop();
//             tween.start();
//         });
//     }
//     /**
//      * 初始化所有的Tween
//      */
//     private initTween() {
//         let nodeIndex: number = 0;
//         let sv: mw.Vector2 = this.btnAssist.position;

//         while (this[`imgP_${nodeIndex}`]) {
//             let img: mw.Image = this[`imgP_${nodeIndex}`];
//             let tweenui = new TweenUI(img, sv.x, sv.y, 1)
//             let tween = new mw.Tween(tweenui).to({
//                 x: sv.x + (Math.random() - 0.5) * 100, y: sv.y - 600, alph: 0
//             }).onStart(() => {
//                 tweenui.x = sv.x;
//                 tweenui.y = sv.y;
//                 tweenui.alph = 1;
//             }).onUpdate(() => { tweenui.render() });
//             this.tweenHandle.push(tween);
//             nodeIndex++;
//         }
//     }
// }
// class TweenUI {
//     private _alph: number = 1;

//     private _x: number;
//     private _y: number;
//     private _location: mw.Vector2 = new mw.Vector2();
//     constructor(private _node: mw.Widget, x: number, y: number, a: number) {
//         this._x = x;
//         this._y = y;
//         this._alph = a;
//     }
//     get x() { return this._x }
//     set x(v) { this._x = v }
//     get y() { return this._y }
//     set y(v) { this._y = v }
//     public get alph(): number { return this._alph }
//     public set alph(value: number) { this._alph = value }
//     render() {
//         this._location.set(this._x, this._y);
//         this._node.position = this._location;
//         this._node.renderOpacity = this._alph;
//     }
// }