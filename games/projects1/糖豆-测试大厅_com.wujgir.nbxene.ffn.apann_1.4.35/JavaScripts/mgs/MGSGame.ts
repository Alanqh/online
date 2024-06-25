import { CLAI } from "../AI/client/ClientAIService";
import { GameConfig } from "../config/GameConfig";
import { TeamManager } from "../Prefabs/GameStater/Script/TeamManager";
import { MGSBase } from "./MGSBase";
/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-02-24 13:24:16
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-23 16:01:22
 * @FilePath     : \stumbleguys_new\JavaScripts\mgs\MGSGame.ts
 * @Description  : 关卡内埋点
 */
export class MGSGame extends MGSBase {

    private _deadNum: number = 0;
    private _finishTime: number = 0;
    private _firstFinishTime: number = 0;
    private _aiFinishCount: number = 0;
    private _postPoint: number[] = [];
    private _checkPointTime: number = 0;
    private _startTime: number = Date.now();
    private _eliminateTime: number = 0;
    private _eliminateCount: number = 0;
    private _eliminatePlayer: string[] = [];
    /**
     * 关卡开始
     */
    public startGame(round: number, playersNum: number): void {
        const num = Player.getAllPlayers().length;
        const aiCount = CLAI.getAllRobots().length;
        this._checkPointTime = Date.now();
        this._startTime = Date.now();
        this.reportLog("ts_game_start", "小关卡正式开始", { player_num: num, scene_id: round, player_power: playersNum, player_level: aiCount })
    }
    /**
     * 当前玩家淘汰
     */
    public curPlayerEliminate(): void {
        this._eliminateTime = Date.now() - this._startTime;
        let team = TeamManager.getPlayerTeam(Player.localPlayer.playerId);
        if (team) {
            const rank = team.clientPlayerCount - (team.clientAIData ? team.clientAIData.length : 0) - this._eliminateCount;
            this.reportLog("ts_action_dead", "玩家淘汰", { play_time: Math.ceil(this._eliminateTime / 1000), death_type: "Death", death_skill_id: ++this._eliminateCount, npc_id: rank });
        }
    }

    public otherPlayerEliminate(guid: string): void {
        if (this._eliminatePlayer.includes(guid)) return;
        this._eliminateCount++;
        this._eliminatePlayer.push(guid);
    }

    /**
     * 游戏结束
     */
    public endGame(round: number, polong: number, reason: string): void {
        // 获取当前玩家 teamID
        if (GameConfig.GameInfo.getElement(1).type == 2) {
            this.endGameElminate(round, polong);
            return;
        }
        const teamIdList = [];
        const allPlayer = Player.getAllPlayers();
        for (let index = 0; index < allPlayer.length; index++) {
            const player = allPlayer[index];
            const teleportId = player.teleportId;
            if (!StringUtil.isEmpty(teleportId) && !teamIdList.includes(teleportId)) {
                teamIdList.push(teleportId);
            }
        }
        // 结束的时间与过关时间做差
        let waitTime = 0;
        if (this._finishTime !== 0) {
            waitTime = TimeUtil.elapsedTime() - this._finishTime;
        }
        waitTime = Math.ceil(waitTime);
        this._finishTime = Math.ceil(this._finishTime);
        this._firstFinishTime = Math.ceil(this._firstFinishTime);
        const time = (Math.floor(Date.now() - this.startGameStamp)) / 1000;
        const checkpoint = this.lastCheckPoint;
        this.reportLog("ts_game_over", "结束上报参数", {
            survive_time: waitTime,
            win_num: teamIdList.length,
            kill_player: this._deadNum,
            round_length: this._finishTime,
            suicide: this._firstFinishTime,
            round_id: round,
            polong_hold: polong,
            prince_kill: this._aiFinishCount,
            student_timeout: time,
            student_dead: checkpoint,
            dead_reason: reason
        });
    }
    /**
    * 游戏结束
    */
    public endGameElminate(round: number, polong: number): void {
        // 获取当前玩家 teamID
        const teamIdList = [];
        const allPlayer = Player.getAllPlayers();
        for (let index = 0; index < allPlayer.length; index++) {
            const player = allPlayer[index];
            const teleportId = player.teleportId;
            if (!StringUtil.isEmpty(teleportId) && !teamIdList.includes(teleportId)) {
                teamIdList.push(teleportId);
            }
        }
        // 结束的时间与淘汰时间做差
        let roundTime = Date.now() - this._startTime;
        let waitTime = 0;
        if (this._eliminateTime !== 0) {
            waitTime = roundTime - this._eliminateTime;
            roundTime = this._eliminateTime;
        }
        waitTime = Math.ceil(waitTime / 1000);
        roundTime = Math.ceil(roundTime / 1000);
        this.reportLog("ts_game_over", "小关卡结束", {
            survive_time: waitTime,
            win_num: teamIdList.length,
            round_length: roundTime,
            round_id: round,
            polong_hold: polong,
        });
    }

    /**
     * 是否挂机
     */
    public checkAfk(): void {
        this.reportLog("ts_achievement", "是否挂机", { achievement: 1001 });
    }

    /**
     * 复活玩家
     * @param tag 标签
     */
    public reborn(tag: number): void {
        this.reportLog("ts_action_dead", "复活", { rebirth_num: tag });
    }

    /**
     * 玩家死亡
     */
    public playerDead(): void {
        this._deadNum++;
    }

    /**
    * 玩家点赞
    */
    public playerClickGood(): void {
        this.reportLog("ts_action_click", "玩家点赞", { button: "click_like" });
    }

    /**
     * 当前玩家通过
     */
    public curPlayerFinish(): void {
        this._finishTime = TimeUtil.elapsedTime();
    }

    /**
     * 其他玩家通过
     */
    public otherPlayerFinish(): void {
        this._firstFinishTime = TimeUtil.elapsedTime();
    }

    public onAIFinished() {
        this._aiFinishCount++;
    }
    /**
     * 到这一个保存点的时间
     */
    public postCheckPointTime(checkPointId: number, round: number, rank: number, sub: number) {
        if (this._checkPointTime == 0) {
            this._checkPointTime = Date.now();
        } else if (this._postPoint.indexOf(checkPointId) == -1) {
            let costTime = Math.floor((Date.now() - this._checkPointTime) / 1000)
            this.reportLog("ts_action_dead", "存档点时间", { lifetime: costTime, death_skill_id: checkPointId, monster_id: round, stage_level: rank, kill_player: sub });
            this._checkPointTime = Date.now();
            this._postPoint.push(checkPointId);
        }
    }


    public checkPlayerNum(playerNum: number, checkPoint: number, round: number) {
        this.reportLog("ts_game_result", "检查周围玩家数量", { record: "CheckPlayer", value: checkPoint, catch: playerNum, round: round });
    }

    public passTime(time: number, round: number, playerNum: number) {
        if (round) {
            this.reportLog("ts_game_result", "通关时间", { round_length: time, record: round === 1 ? "FirestLine" : "SecondLine", camp: playerNum });
        }
    }

    /**
     * 淘汰房间结束时 发送是否赢得比赛
     */
    public blockEnd(win: 1 | 2): void {
        this.reportLog("ts_game_over", "淘汰方块结束", { win_camp: win.toString() });

    }

    public gainPassword(idx: number) {
        this.reportLog("ts_action_unlock", "玩家获取密码时发送", { area_id: idx + 1, isfirstunlock: "password" })
    }

    public areaEnter(area_id: number) {
        this.reportLog("ts_area_enter", "终点区域埋点", { area_id: area_id.toString() })
    }
    private startGameStamp: number = 0;
    saveStartGameStamp() {
        this.startGameStamp = Date.now();
    }
    private lastCheckPoint: number = 0;
    saveLastCheckPoint(pointId: number) {
        this.lastCheckPoint = pointId;
    }

    public useSkill(id: number) {
        this.reportLog("ts_game_result", "使用技能", { record: "Skill", value: id });
    }

    public skillReduceCD(isDeath: boolean) {
        this.reportLog("ts_game_result", "技能减CD", { record: isDeath ? "SkillDeathCD" : "SkillHurtCD" });
    }

}
