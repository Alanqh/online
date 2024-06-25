import { GameConfig } from "../../../config/GameConfig";
import GameStart from "../../GameStart";
import MissionData from "../mission/MissionData";
import MissionModuleS from "../mission/MissionModuleS";
import RecordData from "../record/RecordData";
import { FindData } from "./FindData";
import { FindModuleC } from "./FindModuleC";

export class FindModuleS extends ModuleS<FindModuleC, FindData> {
    @Decorator.noReply()
    net_findItem(findId: number) {
        const cfg = GameConfig.Find.getElement(findId);;
        const pid = this.currentPlayerId;
        if (!cfg) {
            console.error("不存在的find配置")
            return;
        }
        let result = this.currentData.reqFindItem(findId)
        if (!result) return;
        DataCenterS.getData(this.currentPlayer, MissionData).updateFindData(GameStart.GameTheme, findId);
    }

    net_getProcessItem(findId: number) {
        const cfg = GameConfig.Find.getElement(findId);;
        const pid = this.currentPlayerId;
        const data = this.currentData;
        if (!cfg) {
            console.error("不存在的find配置")
            return false;
        }
        if (cfg.process > data.finds.length) {
            return false;
        }
        if (!cfg.process && !data.isFined(findId)) {
            return false;
        }
        if (!data.reqGetProcessItem(findId)) {
            return false;
        }
        const reward = cfg.rewards;
        if (reward) {
            ModuleService.getModule(MissionModuleS).getReward(reward, Player.getPlayer(pid));
        }
        return true;
    }

    @Decorator.noReply()
    net_setGuide(id: number) {
        this.currentData.guideStage = id;
        if (id == 1) {
            const curTime = DataCenterS.getData(this.currentPlayer, RecordData).baseRecordInfo.totalOnlineTimesLength;
            this.currentData.startTime = curTime;
        }
        this.currentData.save(false);
    }

    public cheat(player: Player) {
        let findData = DataCenterS.getData(player, FindData);
        const missonData = DataCenterS.getData(player, MissionData)
        GameConfig.Find.getAllElement().forEach(e => {
            if (e.process) {
                return;
            }
            if (findData.finds.includes(e.id)) {
                return;
            }
            findData.reqFindItem(e.id, false)
            missonData.updateFindData(GameStart.GameTheme, e.id);
        })
        findData.save(true);
    }
} 