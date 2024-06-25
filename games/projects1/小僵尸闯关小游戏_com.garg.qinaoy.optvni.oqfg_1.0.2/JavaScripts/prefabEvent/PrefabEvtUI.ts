/*

 * @Date         : 2023-03-22 16:42:04

 * @LastEditTime: 2023-07-19 14:03:09
 * @FilePath: \commonprefab\JavaScripts\Prefabs\prefabEvent\PrefabEvtUI.ts
 * @Description  : 
 */

import PrefabEvtUI_Generate from "../ui-generate/PrefabEvtUI_generate";


export class PrefabEvtUI extends PrefabEvtUI_Generate {
    private _char: mw.Character;

    private _flyMove: Vector = Vector.zero;

    onStart() {
        this.layer = mw.UILayerMiddle;
        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            this._char = player.character;
        })
        this.mFlyUpBtn.onPressed.add(() => {
            this._flyMove.z += 1;
            this.canUpdate = true;
        })
        this.mFlyDownBtn.onPressed.add(() => {
            this._flyMove.z -= 1;
            this.canUpdate = true;
        })
        this.mFlyDownBtn.onReleased.add(() => {
            this._flyMove.z += 1;
            this._char.addMovement(Vector.zero);
            if (this._flyMove.z == 0) {
                this.canUpdate = false;
            }
        })
        this.mFlyUpBtn.onReleased.add(() => {
            this._flyMove.z -= 1;
            this._char.addMovement(Vector.zero);
            if (this._flyMove.z == 0) {
                this.canUpdate = false;
            }
        })
    }

    onUpdate() {
        this._char.addMovement(this._flyMove);
    }


    setFlyCanvas(isShow: boolean) {
        this.mFlyCanvas.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
}