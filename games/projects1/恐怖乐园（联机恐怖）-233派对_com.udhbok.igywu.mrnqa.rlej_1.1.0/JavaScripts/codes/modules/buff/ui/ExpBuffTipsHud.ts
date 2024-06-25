/*
 * @Author       : dal
 * @Date         : 2024-03-14 13:55:52
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-08 11:51:29
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\buff\ui\ExpBuffTipsHud.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import CompletRewardTip_UI_Generate from "../../../../ui-generate/ShareUI/props/CompletRewardTip_UI_generate";
import { EGameTheme } from "../../../Defines";
import GameStart from "../../../GameStart";
import { LanUtil } from "../../../utils/LanUtil";
import TimeTransferUtil from "../../../utils/TimeTransferUtil";
import { ProcedureModuleC } from "../../procedure/ProcedureModuleC";
import { EmProcedureState } from "../../procedure/const/EmProcedureState";
import { EBuffType } from "../BuffDefine";
import { BuffModuleC } from "../BuffModule";

export default class ExpBuffTipsHud extends CompletRewardTip_UI_Generate {

    public updateTips() {
        const leftTimeSec = this.duration - Math.floor((Date.now() - this.startTimeStamp) / 1e3);
        this.text_tip.text = "◉" + this.buffName + LanUtil.getText("Code_021") + StringUtil.format("：{0} ", TimeTransferUtil.getDateStrByTimeSec(leftTimeSec));
        const pm = ModuleService.getModule(ProcedureModuleC)
        if (pm && pm.myScript.state === EmProcedureState.Start || EGameTheme.Hall === GameStart.GameTheme) {
            this.rootCanvas.renderOpacity = 1;
        } else {
            this.rootCanvas.renderOpacity = 0.1;
        }
    }

    private checkTImer: number = 1;

    protected onUpdate(dt) {
        this.checkTImer -= dt;
        if (this.checkTImer <= 0) {
            this.checkTImer = 1;
            this.updateTips();
        }
    }

    /** 持续时间 */
    private duration: number = 0;

    /** 生效的时间戳 */
    private startTimeStamp: number = 0;

    private buffName = "";

    protected onShow() {
        this.canUpdate = true;
        const expBuff = BuffModuleC.buffList.find(v => { return v.type === EBuffType.DayExp });
        if (expBuff === undefined) { return; }
        this.buffName = GameConfig.Buff.getAllElement().find(v => { return v.type === expBuff.type && v.value === expBuff.value })?.name;
        this.startTimeStamp = expBuff.startTimeStamp;
        this.duration = expBuff.duration;
        this.updateTips();
        console.log("DEBUG>>> ExpTips onShow");
    }

    protected onHide() {
        this.canUpdate = false;
    }
}