/*
 * @Author       : dal
 * @Date         : 2023-11-17 10:53:04
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-10 16:15:33
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\procedure\state\ProcedureStateServer.ts
 * @Description  : 
 */

import { EGameTheme, GamesStartDefines } from "../../../Defines";
import GameStart from "../../../GameStart";
import { ArchiveDataType, ArchiveHelper } from "../../archive/ArchiveHelper";
import MissionData from "../../mission/MissionData";
import { ProcedureModuleS } from "../ProcedureModuleS";
import ProcedureScript from "../component/ProcedureScript";
import { EndType } from "../const/EmProcedureState";
import { ProcedureStateBase } from "./ProcedureState";

/** 初始化 */
export class InitProcedureStateServer extends ProcedureStateBase {

    enter: (data?: any) => void = async () => {
        ModuleService.getModule(ProcedureModuleS).net_setPlayerVisible(this.owner.pid, false);
        if (GamesStartDefines.gameTheme === EGameTheme.Hall) {
            // 每隔十秒存储一下游戏时间
            this.countPlayerTimer.setInterval(async () => {
                this.countTime += 1;
                if (this.countTime >= 10) {
                    if (!Player.getPlayer(this.owner.userId)) {
                        this.countPlayerTimer.stop();
                        return;
                    }
                    this.saveGameTime();
                }
            }, 1e3);
        }
    }
}

/** 加载中 */
export class LoadingProcedureStateServer extends ProcedureStateBase {

    enter?: (data?: any) => void = async () => {
        this.owner.server_startTimestamp = Date.now();
        let aliveDay = (await ArchiveHelper.reqGetData(this.owner.userId, this.owner.archiveID)).aliveDay;
        Event.dispatchToLocal("LoadingProcedureServer", this.owner.userId, aliveDay, this.owner.archiveID);
    };
}

/** 开始游戏 */
export class StartProcedureStateServer extends ProcedureStateBase {

    public constructor(protected owner: ProcedureScript) {
        super(owner);
        Event.addLocalListener("OnPlayerDeathBackupData", (userId: string, archiveId: number) => {
            if (owner.userId != userId) { return; }
            this.clearAllTimer(owner);
            owner.isDeath = true;
        });

        // 玩家复活后才重新开启计时
        Event.addLocalListener("OnPlayerReLife", (userId: string, archiveId: number) => {
            if (!owner.isDeath || owner.userId != userId) { return; }
            this.startTimer(owner);
        });
    }

    private clearAllTimer(owner: ProcedureScript) {
        owner.endSave();
        this.countPlayerTimer.stop();
        this.saveGameTime();
    }

    private startTimer(owner: ProcedureScript) {
        owner.isDeath = false;
        owner.startIntervalSave();
        // 每隔十秒存储一下游戏时间
        this.countPlayerTimer.setInterval(async () => {
            this.countTime += 1;
            if (this.countTime >= 10) {
                this.saveGameTime();
            }
        }, 1e3);
    }

    enter: (data?: any) => void = async () => {
        ArchiveHelper.reqSetData(this.owner.userId, [ArchiveDataType.DEGREE], [this.owner.degree]);
        this.owner.startIntervalSave();
        let aliveDay = (await ArchiveHelper.reqGetData(this.owner.userId, this.owner.archiveID)).aliveDay;
        Event.dispatchToLocal("StartProcedureServer", this.owner.userId, aliveDay);
        this.startTimer(this.owner);
    }

    exit: () => void = () => {
        this.clearAllTimer(this.owner);
    }
}

/** 结束 */
export class EndProcedureStateServer extends ProcedureStateBase {

    enter: (data?: any) => void = async (data?: any) => {
        ModuleService.getModule(ProcedureModuleS).net_setPlayerVisible(this.owner.pid, false);
        let archiveData = (await ArchiveHelper.reqGetData(this.owner.userId, this.owner.archiveID));
        Event.dispatchToLocal("EndProcedureServer", this.owner.userId, archiveData);
        // 是过关或者死亡的才删档
        // 这个data是endType，endType是Success代表通关
        if (data) {
            this.owner.endType = data;
            this.owner.countUseTime();
            ArchiveHelper.reqDeleteData(this.owner.userId, this.owner.archiveID);
            //更新任务进度
            if (this.owner.endType == EndType.Success) DataCenterS.getData(this.owner.pid, MissionData).updatePassInfo(GameStart.GameTheme, this.owner.degree)
        }
        // 没有数据传入的应该是返回主菜单的操作执行了
        else {
            ArchiveHelper.reqSetData(this.owner.userId, [], []);
        }


        this.owner.archiveID = -1;
    }

    exit: (nextState?: any) => void = () => {
        this.owner.server_useTime = 0;
        this.owner.endType = EndType.None;
    };
}
