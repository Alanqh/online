/*

 * @Date         : 2022-12-07 15:42:17

 * @LastEditTime: 2023-03-16 19:09:27
 * @FilePath: \commonprefab\JavaScripts\Prefabs\玩家系统\Script\Prefabs\PlayerSystem\UIPlayerSlider.ts
 * @Description  : 
 */
/*
 * @Description: Description    
 */


import PlayerHp_Generate from "../../../../../ui-generate/Prefabs/玩家系统/UI/PlayerHp_generate";
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";;

export default class UIPlayerHpSlider extends PlayerHp_Generate {

    private _charGuid: string = "";
    private _maxHp: number;
    private _curHp: number;
    private _level: number;

    private _changeHp: number;

    private _handle: boolean;
    private _widget: mw.UIWidget;
    val: number;
    to: number;
    curProgress: number;
    rate: number;

    public init(charGuid: string, maxHp: number, curHp: number, widget: mw.UIWidget, level: number) {
        this._charGuid = charGuid;
        this._curHp = curHp;
        this._maxHp = maxHp;
        this._widget = widget;
        this._level = level;

        this.hpSlider.currentValue = this._curHp / this._maxHp;
        this.levelTxt.text = "Lv." + this._level.toString();
    }

    public updateLevel(level: number) {
        this._level = level;
        this.levelTxt.text = "Lv." + this._level.toString();
    }

    public updateHp(curHp: number, maxHp: number) {
        this._curHp = curHp;
        this._maxHp = maxHp;

        this.val = this.hpSlider.currentValue;
        this.to = this._curHp / this._maxHp;

        this.curProgress = this.val;

        this.rate = Math.abs(this.curProgress - this.to) * 2;
        this._handle = true;

    }

    onStart() {

        this.setVisible(false);
        this.canUpdate = true;
    }

    onShow() {

    }

    onUpdate(dt: number) {
        if (Math.abs(this.curProgress - this.to) <= this.rate * dt) {
            this.hpSlider.currentValue = this.to;
            this._widget.refresh();
            this._handle = false;
            return;
        }

        if (this.val < this.to) {
            this.curProgress += this.rate * dt;
        } else {
            this.curProgress -= this.rate * dt;
        }

        this.hpSlider.currentValue = this.curProgress;
        //console.error("hp : " + this.to);
        this._widget.refresh();
    }

}