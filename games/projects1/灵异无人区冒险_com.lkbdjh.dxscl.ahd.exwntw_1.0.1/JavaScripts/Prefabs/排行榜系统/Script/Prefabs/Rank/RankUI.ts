/*

 * @Date: 2023-09-11 09:25:01

 * @LastEditTime: 2023-09-11 11:36:53
 * @FilePath: \commonprefab\JavaScripts\Prefabs\排行榜系统\Script\Prefabs\Rank\RankUI.ts
 * @Description: 
 */
/*
 * @Description: Description
 */
/*
 * @Description: Description
 */
/*
 * @Description: Description
 */

import UIRank_Generate from "../../../../../ui-generate/Prefabs/排行榜系统/UI/UIRank_generate";
import { GridLayout } from "../Tools/GridLayout";
import { MapEx } from "../Tools/MapEx";
import { RankPlayerInfo } from "./RankSystem";
import RankUIItem from "./RankUIItem";

export default class RankUI extends UIRank_Generate {

    private _grid: GridLayout<RankUIItem>;

    private _index: number = 0;
    private _infos: MapEx.MapExClass<RankPlayerInfo[]>;
    private _maxIndex: number = 0;

    onStart() {

        this._grid = new GridLayout(this.list, RankUIItem, false);
        this._grid.spacingY = 30;
        this._index = 0;

        this.btnRight.visibility = mw.SlateVisibility.Hidden;
        this.btnLeft.visibility = mw.SlateVisibility.Hidden;

        this.btnRight.onClicked.add(() => {
            this._index++;
            this.showByIndex();
        })

        this.btnLeft.onClicked.add(() => {
            this._index--;
            this.showByIndex();
        })

        this.putBtn.onClicked.add(() => {
            if (this.list.visible) {
                this.list.visibility = mw.SlateVisibility.Hidden;
                this.rankBg.visibility = mw.SlateVisibility.Hidden;
                this.contentCanvas.visibility = mw.SlateVisibility.Hidden;
                let size = this.putBtn.size.clone();
                this.putBtn.size = new mw.Vector2(size.x, -size.y);
                this.putBtn.position = this.putBtn.position.clone().add(new mw.Vector2(0, size.y));
                this.rankText
            } else {
                this.list.visibility = mw.SlateVisibility.Visible;
                this.rankBg.visibility = mw.SlateVisibility.Visible;
                this.contentCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                let size = this.putBtn.size.clone();
                this.putBtn.size = new mw.Vector2(size.x, Math.abs(size.y));
                this.putBtn.position = this.putBtn.position.clone().add(new mw.Vector2(0, -Math.abs(size.y)));
            }
        })

    }

    UpdateData(infos: MapEx.MapExClass<RankPlayerInfo[]>) {
        this._infos = infos;

        let indexCount = 0;
        MapEx.forEach(this._infos, (k, e) => {
            indexCount++;
        })
        this._maxIndex = indexCount;
        if (this._index >= this._maxIndex) {
            this._index = this._maxIndex - 1;
        }
        if (this._index < 0) this._index = 0;

        this.showByIndex();
    }

    private showByIndex() {
        this._grid.removeAllNode();
        let curIndex = 0;
        MapEx.forEach(this._infos, (k, e) => {

            if (curIndex == this._index) {
                this.gradeText.text = k.toString();
                e.forEach((e2, i, arrs) => {
                    this._grid.addNode(e2, i);
                })
                this._grid.invalidate();
            }
            curIndex++;

        })

        this.btnRight.visibility = mw.SlateVisibility.Visible;
        this.btnLeft.visibility = mw.SlateVisibility.Visible;
        if (this._index >= this._maxIndex - 1) {
            this.btnRight.visibility = mw.SlateVisibility.Hidden;
        }
        if (this._index == 0) {
            this.btnLeft.visibility = mw.SlateVisibility.Hidden;
        }

    }

    onShow() {

    }

    onUpdate(dt: number) {

    }

}