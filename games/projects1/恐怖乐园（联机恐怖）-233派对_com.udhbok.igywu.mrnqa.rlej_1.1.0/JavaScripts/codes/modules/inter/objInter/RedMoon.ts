import { EGameTheme } from "../../../Defines";
import GameStart from "../../../GameStart";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import LevelBase from "../../Level/LevelBase";
import { ArchiveHelper, ArchiveDataType, ArchiveData } from "../../archive/ArchiveHelper";
import ArchiveModuleC from "../../archive/ArchiveModuleC";
import { RouteModuleC } from "../../route/RouteModule";
import TimeModuleC from "../../time/TimeModuleC";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";

@Component
export default class RedMoon extends LevelBase {
    @mw.Property({ group: "血月设置", displayName: "是开启血月吗" })
    public isOpenMoon: boolean = false;

    @mw.Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    protected onLevelStart(): void {
        console.log("redmooninit")
        this.addLocalListen("RedMoon", (goid: string) => {
            if (goid != this.gameObject.gameObjectId) {
                return;
            }
            setTimeout(() => {
                this.activeRedMoon();
            }, 20);
        })
    }

    private activeRedMoon() {
        const timeScript = ModuleService.getModule(TimeModuleC).timeScript;
        let targetDate = this.isOpenMoon ? timeScript.playerDay : -1;
        if (timeScript.redMoonDay == -1) {
            return;
        }
        if (timeScript.redMoonDay > 0 && this.isOpenMoon) {
            return;
        }
        if (timeScript.redMoonDay <= 0 && !this.isOpenMoon) {
            return;
        }

        GhostTraceHelper.uploadMGS("ts_action_dj", "狂暴模式", {
            action_type: this.isOpenMoon ? 0 : 1,
            action_id: this.isOpenMoon ? targetDate : timeScript.playerDay - timeScript.redMoonDay
        });
        timeScript.redMoonDay = targetDate;
        ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.RedMoon], [targetDate])
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
        timeScript.refreshDayCfg();
    }
}