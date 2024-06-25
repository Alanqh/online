
import { GlobalData } from "../../const/GlobalData";
import { GameMode } from "../../const/enum";
import { utils } from "../../utils/uitls";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import TimeModuleC from "./TimeModuleC";


export default class TimeModuleS extends ModuleS<TimeModuleC, null> {

    /**当前游戏时间，单位s */
    public curTime = -2;
    /**当天白天时间 */
    public dayTime = GlobalData.Time.dayTime;
    /**当天夜晚时间 */
    public nightTime = 300;
    /**当前天数 */
    private curDayCount = 1;
    /**时间流逝事件 */
    public onTimeFly = new Action();
    /**一天过去事件 */
    public onDayOver = new Action();
    /**白天来临事件 */
    public onDayStart = new Action()
    /**夜晚来临事件 */
    public onNightStart = new Action();
    /**暂停时间 */
    public isPause = false;
    /**历史模式列表 */
    private modeList = [null, null, null, null];
    /**当天模式 */
    private _mode = null;
    public get mode() {
        return this._mode;
    }
    public set mode(value) {
        this._mode = value;
        if (value == GameMode.Normal) {
            this.nightTime = GlobalData.Time.normalNightTime;
        }
    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.timeFly();
        this.addEnvirmentChangeListener();
        this.onDayOver.add(() => {
            this.getAllClient().net_dayOver();
        });
    }


    /**添加环境切换监听 */
    private addEnvirmentChangeListener() {
        this.onDayStart.add((mode: GameMode) => {
            this.getAllClient().net_dayStart(this.curTime, mode);
        })
        this.onNightStart.add((mode: GameMode) => {
            this.curTime = this.dayTime;
            this.getAllClient().net_nightStart(this.curTime, mode);
        })
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getClient(player).net_initTime(this.curTime, this.mode);
    }

    /**模式计数器 */
    private modeCount = 0;
    private timeFly() {
        // 为了上来就触发切换到白天
        this.curTime = this.dayTime + this.nightTime + 1;
        TimeUtil.setInterval(() => {
            if (this.isPause) return;

            this.curTime++;
            this.onTimeFly.call(this.curTime);
            // 夜晚时间结束后天数+1， 切换为白天
            if (this.curTime >= this.dayTime + this.nightTime) {
                // 梦境模式时间到则视为游戏失败
                if (this.mode == GameMode.Dream) {
                    console.warn("游戏失败！！");
                    this.gameOver();
                    this.pauseTime();
                    setTimeout(() => {
                        this.resumeTime();
                        this.randomSelectMode();
                    }, 5000);

                    return;
                }
                // this.mode = Math.floor(Math.random() * 2) + 1;
                this.randomSelectMode();
            }
            // 夜晚时间到
            else if (this.curTime == GlobalData.Time.dayTime) {
                this.onNightStart.call(this.mode);
            }
        }, 1);

    }

    /**进入下一天 */
    public nextDay(mode: GameMode) {
        this.mode = mode;
        this.curDayCount++;
        this.curTime = 0;
        this.onDayStart.call(mode);
        this.onDayOver.call();
    }

    /**暂停时间 */
    public pauseTime() {
        this.isPause = true;
        this.getAllClient().net_pauseTime(this.curTime);
    }

    /**恢复时间 */
    public resumeTime() {
        this.isPause = false;
        this.getAllClient().net_resumeTime(this.curTime);
    }

    /**游戏失败 */
    public gameOver() {
        let playerMS = ModuleService.getModule(PlayerModuleS);
        // 所有玩家死亡
        // Player.getAllPlayers().forEach(player => {
        //     playerMS.changeHp(player.playerId, -100);
        // })
        this.getAllClient().net_gameOver();
    }

    /**随机选择模式 */
    public randomSelectMode() {
        this.mode = utils.randomSelect(GlobalData.Mode.modeList, GlobalData.Mode.modeProbilityList);
        this.modeList[this.modeCount % 4] = this.mode;
        // 连续三次一样，强行切换模式
        if (this.modeList[0] == this.modeList[1] && this.modeList[1] == this.modeList[2] && this.modeList[2] == this.modeList[3] && this.modeList[0] != null) {
            this.mode = this.modeList[0] == GameMode.Dream ? GameMode.Normal : GameMode.Dream;
            this.modeList[this.modeCount % 4] = this.mode;
            console.warn(this.modeList + "  强行切换模式为：" + this.mode)
        }
        this.modeCount++;
        console.warn("随机 模式为" + this.mode, "列表为: " + this.modeList);
        this.nextDay(this.mode);
    }

    // ------------net方法----------------

    /**获得当前时间 */
    public net_getCurTime() {
        return this.curTime;
    }

    /**获得当前天数 */
    public net_getDayCount() {
        return this.curDayCount;
    }
}