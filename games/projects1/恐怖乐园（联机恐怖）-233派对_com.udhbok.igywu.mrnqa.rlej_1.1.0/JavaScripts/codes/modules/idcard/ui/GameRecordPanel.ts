/*
 * @Author       : dal
 * @Date         : 2024-03-01 11:18:46
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 15:03:24
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\idcard\ui\GameRecordPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { ISubPassEndingElement } from "../../../../config/SubPassEnding";
import Cardrecord_UI_Generate from "../../../../ui-generate/ShareUI/card/Cardrecord_UI_generate";
import Recordbar_UI_Generate from "../../../../ui-generate/ShareUI/card/Recordbar_UI_generate";
import { EGameTheme } from "../../../Defines";
import { LanUtil } from "../../../utils/LanUtil";
import { MapEx } from "../../../utils/MapEx";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { GridContainer } from "../../../utils/UIPool";
import { getDegreeTxtByType } from "../../archive/ui/ArchiveItem";
import { DegreeType } from "../../blackboard/BoardDefine";
import { PlayerPassDataItem } from "../../globalRank/PlayerRankData";
import RouteConst from "../../route/RouteConst";
import { RouteData } from "../../route/RouteData";

export class RecordItem {

    public img: Image; time: TextBlock; diff: TextBlock

    public constructor(public mainCanvas: Canvas) {
        this.img = mainCanvas.getChildAt(1) as Image;
        this.time = mainCanvas.getChildAt(2) as TextBlock;
        this.diff = mainCanvas.getChildAt(3) as TextBlock;
    }

    public hide() {
        this.mainCanvas.visibility = SlateVisibility.Collapsed;
    }

    public show() {
        this.mainCanvas.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    public unlock(timeSec: number, degree?: DegreeType) {
        this.img.visibility = SlateVisibility.SelfHitTestInvisible;
        this.time.visibility = SlateVisibility.SelfHitTestInvisible;
        this.diff.visibility = degree ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.diff.text = getDegreeTxtByType(degree);
        this.time.text = TimeTransferUtil.getDateStrByTimeSec(timeSec);
    }

    public lock() {
        this.img.visibility = SlateVisibility.Collapsed;
        this.time.visibility = SlateVisibility.Collapsed;
        this.diff.visibility = SlateVisibility.Collapsed;
    }
}

export class RecordBar extends Recordbar_UI_Generate {

    private readonly ItemCount = 5;

    public setData(gameTheme: EGameTheme, v: ISubPassEndingElement, fastPassTimeMap: MapEx.MapExClass<PlayerPassDataItem>) {
        this.txt1.text = v.title;
        // 没有难度的
        if (gameTheme === EGameTheme.Graveyard) {
            for (let index = 0; index < this.ItemCount; index++) {
                const recordItem = this.recordItemList[index];
                if (index === 4) {
                    recordItem.show();
                    if (!fastPassTimeMap) { recordItem.lock(); continue; }
                    const passInfo = MapEx.get(fastPassTimeMap, v.passEndingId) as PlayerPassDataItem;
                    const passTime = passInfo ? PlayerPassDataItem.getRankScore(passInfo, DegreeType.Simple) : -1;
                    passTime != -1 ? recordItem.unlock(passTime) : recordItem.lock();
                } else {
                    recordItem.hide()
                }
            }
        } else {
            for (let index = 0; index < this.ItemCount; index++) {
                const recordItem = this.recordItemList[index];
                recordItem.show();
                if (!fastPassTimeMap) { recordItem.lock(); continue; }
                const passInfo = MapEx.get(fastPassTimeMap, v.passEndingId) as PlayerPassDataItem;
                const curDegree: DegreeType = index + 1;
                const passTime = passInfo ? PlayerPassDataItem.getRankScore(passInfo, curDegree) : -1;
                passTime != -1 ? recordItem.unlock(passTime, curDegree) : recordItem.lock();
            }
        }
    }

    public recordItemList: RecordItem[] = [];

    protected onStart() {
        for (let index = 0; index < this.ItemCount; index++) {
            const recordItem = new RecordItem(this.canvas_end.getChildAt(index) as Canvas);
            this.recordItemList.push(recordItem);
        }
    }
}

export default class GameRecordPanel extends Cardrecord_UI_Generate {

    protected onStart(): void {
        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this);
        });
        this.recordBarContainer = new GridContainer(this.record, RecordBar);
        this.layer = mw.UILayerDialog;
        this.canvas_tips.visibility = SlateVisibility.Collapsed;
    }

    private recordBarContainer: GridContainer<RecordBar>;

    private checkDataUpdate(routeData: RouteData) {
        return true;
        if (MapEx.count(routeData.passInfoMap) > 0 && MapEx.count(routeData.newFastPassTimeMap) === 0) {
            this.canvas_tips.visibility = SlateVisibility.SelfHitTestInvisible;
            return false;
        } else {
            this.canvas_tips.visibility = SlateVisibility.Collapsed;
            return true;
        }
    }

    protected onShow(gameTheme: EGameTheme, routeData: RouteData) {
        const cfg = RouteConst.getGameThemeCfg(gameTheme);
        this.txt_cardname.text = StringUtil.format("{0}", cfg.name) + LanUtil.getText("Code_022");
        // 这个游戏的各通关结局
        const passEndingArr = GameConfig.SubPassEnding.getAllElement().filter(v => { return v.gameTheme === gameTheme });
        this.recordBarContainer.clear();
        // if (!this.checkDataUpdate(routeData)) { return; }
        passEndingArr.forEach(v => {
            const node = this.recordBarContainer.addNode();
            node.setData(gameTheme, v, routeData.newFastPassTimeMap);
        });
    }
}