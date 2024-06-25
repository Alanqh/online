import LevelBase from "../../Level/LevelBase";
import { ArchiveData, ArchiveDataType, ArchiveHelper } from "../../archive/ArchiveHelper";
import TimeModuleC from "../../time/TimeModuleC";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";

@Component
export default class DayChecker extends LevelBase {

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ group: "基础设置", displayName: "第几天解锁" })
    public unlockDay: number = 0;

    @mw.Property({ group: "基础设置", displayName: "是否与狂暴挂钩", tooltip: "现在的天数- 开启血月的天数 = 你需要填的天数" })
    public isRedMoon: boolean = false;

    private _isActive: boolean = false;

    protected onLevelStart(): void {
        this.addLocalListen("onPlayerDayAdd", (day: number, redMoon: number) => {
            this.refresh(day, redMoon);
        })
    }

    private refresh(day: number, redMoon: number) {
        if (this.isRedMoon) {
            if (redMoon <= 0) {
                return;
            }
            day -= redMoon;
        }
        if (this._isActive) {
            return;
        }
        if (day >= this.unlockDay) {
            this._isActive = true;
            ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
        }
    }

    onLoadData(data: ArchiveData): void {
        this._isActive = false;
        this.refresh(data.aliveDay, data.redMoon || 0);
    }
}