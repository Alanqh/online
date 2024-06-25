import { GlobalData } from "../../const/GlobalData";
import { GameMode } from "../../const/enum";
import DeadCountModuleC from "../DeadCount/DeadCountModuleC";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import EnvirmentChangeTween from "./EnvirmentChangeTween";
import TimeModuleS from "./TimeModuleS";

export enum CurTimeState {
    Day = 1,
    DayToNight = 2,
    Night = 3,
    NightToDay = 4,
}

export default class TimeModuleC extends ModuleC<TimeModuleS, null> {

    /**当前时间 */
    public curTime = 0;
    /**当天白天时间 */
    public dayTime = GlobalData.Time.dayTime;
    /**当天夜晚时间 */
    public nightTime = 300;
    /**时间UI */
    private timeUI: P_Game_HUD = null;
    /**时间流逝事件 */
    public onTimeFly: Action = new Action();
    /**一天过去事件 */
    public onDayOver = new Action();
    /**白天开始时间 */
    public onDayStart = new Action();
    /**夜晚开始事件 */
    public onNightStart = new Action();
    /**暂停时间 */
    public isPause = false;
    /**夜晚环境id */
    private nightEnvId = 2;
    /**模式 */
    private _mode = null;
    public get mode() {
        return this._mode;
    }
    public set mode(value) {
        this._mode = value;
        this.nightEnvId = GlobalData.Environment.modeNightEnvIdMap.get(value) ?? 3;
        // 根据模式设置夜晚时间
        if (value == GameMode.Normal) {
            this.nightTime = GlobalData.Time.normalNightTime;
        }
        // console.warn("设置夜晚时间" + this.nightTime)
        // console.warn("···当前模式为：" + value)
    }


    protected async onStart() {
        this.timeUI = UIService.getUI(P_Game_HUD);
        this.addEnvirmentChangeListener();
    }


    /**添加环境切换监听 */
    private addEnvirmentChangeListener() {
        this.onDayStart.add((mode: GameMode) => {
            this.mode = mode;
            EnvirmentChangeTween.setEnv(1);
            this.timeUI.clearCountDown();
            // console.log(`当前时间:${this.curTime}, 白天 启动！`)
        })
        this.onNightStart.add((mode: GameMode) => {
            this.mode = mode;
            EnvirmentChangeTween.setEnv(this.nightEnvId);

            console.log(`当前时间:${this.curTime}, 黑夜 启动！`)
        })
    }

    /**客户端第一次同步服务端的时间后，在客户端自己计时 */
    public net_initTime(curTime: number, mode: GameMode) {
        this.curTime = curTime;
        this.timeFly();
        // let timeUI = mw.UIService.show(P_Time);
        this.initEvironment(curTime, mode);
        console.log(`进入游戏！当前时间为 ${curTime}, 模式为: ${mode}`)
    }

    /**玩家加入房间初始化环境 */
    private initEvironment(curTime: number, mode: GameMode) {
        this.curTime = curTime;
        if (!this.isNight()) {
            this.onDayStart.call(mode);
        } else {
            this.onNightStart.call(mode);
        }
    }

    /**时间流逝 */
    public timeFly() {
        TimeUtil.setInterval(() => {
            if (this.isPause) return;

            this.curTime += 1;
            this.timeUI.setTimeUI(this.curTime);
            this.onTimeFly.call();
        }, 1);
    }


    /**是否是晚上 */
    public isNight() {
        return this.curTime >= GlobalData.Time.dayTime;
    }

    /**服务端通知客户端一天结束 */
    public net_dayOver() {
        this.curTime = 0;
        this.onDayOver.call();
    }

    /**服务端通知客户端白天到来 */
    public net_dayStart(time: number, mode: GameMode) {
        this.curTime = time;
        this.onDayStart.call(mode);
    }

    /**服务端通知客户端夜晚到来 */
    public net_nightStart(time: number, mode: GameMode) {
        this.curTime = time;
        this.onNightStart.call(mode);
        console.warn("晚上来力,mode = " + mode);
    }


    /**暂停时间 */
    public net_pauseTime(curTime: number) {
        this.isPause = true;
        this.curTime = curTime;
    }

    /**恢复时间 */
    public net_resumeTime(curTime: number) {
        this.isPause = false;
        this.curTime = curTime;
    }


    /**游戏失败UI表现 */
    public net_gameOver() {
        // UIService.getUI(P_Result).showResult(false);
        // 清除存活天数
        let module = ModuleService.getModule(DeadCountModuleC)
        module.deadCountData.aliveDays = 0;
        module.isGameover = true;
    }

}