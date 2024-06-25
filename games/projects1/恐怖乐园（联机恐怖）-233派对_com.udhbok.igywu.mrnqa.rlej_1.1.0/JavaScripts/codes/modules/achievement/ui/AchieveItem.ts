/*
 * @Author       : dal
 * @Date         : 2024-05-09 19:57:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 11:38:19
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\achievement\ui\AchieveItem.ts
 * @Description  : 
 */

import { IAchievementElement } from "../../../../config/Achievement";
import { GameConfig } from "../../../../config/GameConfig";
import AchieveItem_UI_Generate from "../../../../ui-generate/ShareUI/integration/Achievements/AchieveItem_UI_generate";
import AcMiniItem_UI_Generate from "../../../../ui-generate/ShareUI/integration/Achievements/AcMiniItem_UI_generate";
import { MapEx } from "../../../utils/MapEx";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { AchieveService, EAchieveType } from "../AchieveDefine";
import AchieveModuleData from "../AchieveModuleData";
import { AchievementPanel, EAchievePageType } from "./AchievementPanel";

/** 看别人的 */
export class AchieveMiniItem extends AcMiniItem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
    }

    private get selfPanel() {
        return UIService.getUI(AchievementPanel);
    }

    public setSelected(isTrue: boolean) {

    }

    public setData(data: AchieveModuleData, cfgId: number) {
        const cfg = AchieveService.getAchieveCfg(cfgId);
        this.img_achieveName.text = cfg.name;
        this.img_medalNum.text = cfg.points + "";
        this.img_achieveTip0.text = `${cfg.targetText}`;
        this.img_acTime.text = TimeTransferUtil.getDateStr2ByTimeStamp(MapEx.get(data.finishTimeStampMap, cfg.id)) + "达成";
        this.img_star.imageColor = LinearColor.colorHexToLinearColor(GameConfig.ItemQuality.getElement(cfg.rarity).colorRGB);
    }
}

/** 看自己的 */
export class AchieveItem extends AchieveItem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
    }

    private get selfPanel() {
        return UIService.getUI(AchievementPanel);
    }

    public setSelected(isTrue: boolean) {

    }

    public setData(data: AchieveModuleData, cfg: IAchievementElement, pageType: EAchievePageType) {
        this.img_medalNum.text = cfg.points + "";
        this.img_achieveName.text = cfg.name;
        this.img_achieveTip0.text = `${cfg.targetText}`;
        const isFinish: boolean = data.checkAchieveIsFinish(cfg.id);
        this.setLockView(!isFinish);
        this.setFinishTimeView(isFinish);
        if (isFinish) {
            this.img_timeOrLock.text = TimeTransferUtil.getDateStr2ByTimeStamp(MapEx.get(data.finishTimeStampMap, cfg.id)) + "达成";
        } else {
            const achieveIns = AchieveService.getAchieveIns(cfg.targetType as EAchieveType);
            if (!achieveIns) { console.error(`DEBUG MyTypeError>>> 成就实例获取失败 cfg ${JSON.stringify(cfg)}`); }
            else { this.img_lockNum.text = achieveIns.getCurProgress(cfg.id) }
        }
        this.img_star.imageColor = LinearColor.colorHexToLinearColor(GameConfig.ItemQuality.getElement(cfg.rarity).colorRGB);
    }

    /** 锁 */
    protected setLockView(isShow: boolean) {
        this.canvas_medalLock.visibility = isShow ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    /** 达成时间 */
    protected setFinishTimeView(isShow: boolean) {
        this.canvas_timeOrLock.visibility = isShow ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
}