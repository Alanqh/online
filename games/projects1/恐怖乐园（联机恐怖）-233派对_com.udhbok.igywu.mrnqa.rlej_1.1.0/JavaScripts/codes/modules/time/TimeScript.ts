import { GameConfig } from "../../../config/GameConfig";
import { IGhostDayElement } from "../../../config/GhostDay";
import { GamesStartDefines } from "../../Defines";
import { MainUI } from "../../ui/MainUI";
import { TipsUI } from "../../ui/TipsUI";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import MusicMgr from "../../utils/MusicMgr";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { ArchiveData } from "../archive/ArchiveHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { Event_LoadArchiveData } from "../procedure/const/Events";
import { StartProcedureStateClient } from "../procedure/state/ProcedureStateClient";
import TimeModuleC from "./TimeModuleC";
import TimeModuleS from "./TimeModuleS";
import { AllTimeSecond, DayTimeSecond } from "./timeConfig";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-21 14:11:41
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-08 11:21:35
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\TimeScript.ts
 * @Description  : 
 */

enum ETimeState {

    /** 白天 */
    DayLight = 0,

    /** 准备进入夜晚 */
    ReadyNight,

    /** 夜晚 */
    Night,
}

/** 不同时间状态对应的BGM音效配置id列表 */
const BGMSoundCfgIDList: number[] = [1000, 2002, 2001];

@Component
export default class TimeScript extends Script {
    public static instance: TimeScript;

    @Property({ replicated: true, onChanged: "onTimeChanged" })
    private _timer: number = 0;

    private _isCallNightAction = false;

    /**当前游戏天数 */
    @Property({ replicated: true, onChanged: "onDayAdd" })
    private _dayTime: number = 1;

    @Property({ replicated: true, onChanged: "onTimeStateChange" })
    private timeState: ETimeState = ETimeState.DayLight;

    private _dayCfg: IGhostDayElement;

    public playerDay: number = 0;

    public redMoonDay: number = 0;

    get time() {
        return this._timer;
    }

    get timeModuleC() {
        return ModuleService.getModule(TimeModuleC)
    }

    protected onStart(): void {
        this.useUpdate = true;
        if (SystemUtil.isClient()) {
            Fog.enabled = false;
            TimeScript.instance = this;
            Event.addLocalListener(Event_LoadArchiveData, (data: ArchiveData) => {
                this._dayCfg = GameConfig.GhostDay.getElement(data.aliveDay + 1);
                this.playerDay = data.aliveDay;
                this.redMoonDay = data.redMoon || 0;
                this.refreshDayCfg();
            })
            Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
                this._cli_isEnable = true;
                Fog.enabled = this._cli_isInNight;
            })
            Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                Fog.enabled = false;
            })
            ModuleService.ready().then(() => {
                ModuleService.getModule(TimeModuleC).timeScript = this;
            })
        }
    }

    public addDayTime() {
        this._dayTime += 1;
    }

    public timeScale: number = 1;

    private _cli_isInNight: boolean = false;

    private _cli_isEnable: boolean = false;

    private _ser_interval: number = 0;

    private readonly interval: number = 1;

    onUpdate(dt: number): void {
        // 根据策划需求改
        if (SystemUtil.isServer()) {
            if (this._ser_interval > 0) {
                this._ser_interval -= dt;
                return;
            }
            this._ser_interval = this.interval;
            this._timer = this._timer + this.interval
            if (this._timer >= AllTimeSecond) {
                this._isCallNightAction = false
                ModuleService.getModule(TimeModuleS).dayAction.call();
                this._timer -= AllTimeSecond;
                this._dayTime++;
                this.timeState = ETimeState.DayLight;
            }

            // 入夜前十秒
            if (this._timer >= (DayTimeSecond - 10) && !this._isCallNightAction) {
                this.timeState = ETimeState.ReadyNight;
            }

            if (this._timer >= DayTimeSecond && !this._isCallNightAction) {
                this._isCallNightAction = true
                ModuleService.getModule(TimeModuleS).nightAction.call();
                this.timeState = ETimeState.Night;
            }
        }
    }

    public enterNight() {
        this._isCallNightAction = false;
        this._timer = DayTimeSecond;
    }

    private onTimeChanged() {
        if (!this.timeModuleC) {
            console.error("------等待Time模块加载-----");
            return;
        }
        this.timeModuleC.timer = this._timer;
        if (!this._cli_isEnable) {
            return;
        }
        let isInNight = this._timer >= DayTimeSecond;

        let lan = LanUtil.getText(isInNight ? this.getNightTips() : this.getDayTips());
        if (!isInNight) {
            let timeStr = CommonUtils.FormatTimeMS(DayTimeSecond - this._timer);
            UIService.getUI(TipsUI).showCatTips(CommonUtils.formatString(lan, timeStr));
        }
        else {
            UIService.getUI(TipsUI).showCatTips(lan);
        }

        if (isInNight != this._cli_isInNight) {
            this._cli_isInNight = isInNight;
            Fog.enabled = this._cli_isInNight;
        }
    }

    private getNightTips() {
        return this._dayCfg && this._dayCfg.exNightLan ? this._dayCfg.exNightLan : "tips_show_12";
    }

    private getDayTips() {
        return this._dayCfg && this._dayCfg.exLan ? this._dayCfg.exLan : "tips_show_11";
    }

    /** 时间状态改变 */
    private onTimeStateChange() {
        let bgmCfgId = BGMSoundCfgIDList[this.timeState];
        StartProcedureStateClient.BGMSoundItemCfgId = bgmCfgId;
        let pm = ModuleService.getModule(ProcedureModuleC);
        if (pm && pm.myScript && pm.myScript.state === EmProcedureState.Start) {
            MusicMgr.instance.play(bgmCfgId);
        }
    }

    /** 天数增加一天 */
    private onDayAdd() {
        // 游戏开始阶段，天数改变了的回调
        let pm = ModuleService.getModule(ProcedureModuleC);
        if (pm && pm.myScript && pm.myScript.state === EmProcedureState.Start) {
            UIService.getUI(MainUI).addAliveDay();
            this.playerDay++;
            this.refreshDayCfg();
        }
    }

    public refreshDayCfg() {
        const allCfg = GameConfig.GhostDay.getAllElement();
        if (this.redMoonDay > 0) {
            this._dayCfg = allCfg.find(e => {
                return e.isRedMoon && e.day == (this.playerDay - this.redMoonDay + 1);
            })
        }
        else {
            this._dayCfg = allCfg.find(e => {
                return !e.isRedMoon && e.day == (this.playerDay + 1);
            });
        }

        Event.dispatchToLocal("onPlayerDayAdd", this.playerDay, this.redMoonDay)
        this.refreshSkySys();
    }


    private refreshSkySys() {
        const skySys = ModuleService.getModule(TimeModuleC).skyBoxSys;
        this.redMoonDay > 0 ? skySys.initRedMoonValue() : skySys.initDefaultValue();
    }
}

export namespace TimeScriptTrace {
    export function triggerDay(type: number, id: string) {
        if (!GamesStartDefines.isOpenTimer) {
            return;
        }
        if (!TimeScript.instance) {
            return;
        }
        const day = TimeScript.instance.playerDay;
        GhostTraceHelper.uploadMGS("ts_action_upgrade_snowman", "第一次操作时上发天数（交互物、道具、条件）", {
            rebirth_num: type,
            isfirstbuy: id,
            lifetime: day
        })
    }


    export function traceEndMoon() {
        if (!GamesStartDefines.isOpenTimer) {
            return;
        }
        const script = TimeScript.instance;
        if (!script || !script.redMoonDay) {
            return;
        }
        GhostTraceHelper.uploadMGS("ts_action_dj", "狂暴模式", {
            action_type: 1,
            action_id: script.playerDay - script.redMoonDay
        });
    }
}
