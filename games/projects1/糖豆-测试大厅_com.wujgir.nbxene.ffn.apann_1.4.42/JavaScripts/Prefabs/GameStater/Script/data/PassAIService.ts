import { IAIPassElement } from "../../../../config/AIPass";
import { GameConfig } from "../../../../config/GameConfig";
import { IGameInfoElement } from "../../../../config/GameInfo";
import { Team } from "./Team";

export class PassAIService {
    /**
     * 是否通过AI表现
     */
    private isPassdAIPerferman: boolean = false;
    private refreshTime: number = 0;
    private aiPassCfg: IAIPassElement;
    private gameCfg: IGameInfoElement;

    private currentCount: number = 0;
    private passedPlayerCount: number = 0;
    constructor(private team: Team) {
        this.gameCfg = GameConfig.GameInfo.getElement(1);
    }

    public onUpdate(dt: number) {
        if (this.gameCfg.type == 3) return;
        if (this.isPassdAIPerferman) {
            if (this.passedPlayerCount + this.currentCount < this.gameCfg.playerNum) {
                if (this.refreshTime <= 0) {
                    this.refreshTime = MathUtil.randomFloat(this.aiPassCfg.refreshIntervalMin, this.aiPassCfg.refreshIntervalMax);
                    this.team.broadcast("PassAI.Birth", this.currentCount + 1);
                    console.log("刷新表演AI", this.currentCount + 1);
                    this.currentCount++;
                } else {
                    this.refreshTime -= dt;
                }
            }
        }
    }
    /**
     * 玩家经过保底点
     */
    public onPlayerPassed(count: number) {
        this.passedPlayerCount = count;
        console.log("玩家保底", count);
        if (this.passedPlayerCount + this.currentCount > this.gameCfg.playerNum) {
            //停止AI行动
            const stopId = this.currentCount - (this.passedPlayerCount + this.currentCount - this.gameCfg.playerNum - 1);
            this.team.broadcast("PassAI.Stop", stopId);
        }
    }
    /**
     * 玩家经过终点
     * @returns 
     */
    public onPlayerFinish() {
        if (this.isPassdAIPerferman) return false;
        const passedPlayerCount = this.team.players.filter(i => i.rank < 10000 && i.playerId).length;
        if (!this.aiPassCfg) {
            const truePlayerCount = this.team.players.filter(i => i.playerId).length;
            if (truePlayerCount == 0) return;
            this.aiPassCfg = GameConfig.AIPass.getElement(truePlayerCount)
        }
        this.isPassdAIPerferman = passedPlayerCount >= this.aiPassCfg.passCount;
        console.log("玩家通关", this.isPassdAIPerferman);
        return this.isPassdAIPerferman;
    }
}