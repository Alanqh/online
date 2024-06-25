import { BoxPassword } from "../../../../modules/ProcessModule/ProcessModuleS";
import { Team } from "./Team";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-27 14:17:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-06 10:30:47
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\data\Player.ts
 * @Description  : 修改描述
 */
export type PlayerData = {
    "skinId": number,  //皮肤id
    "garnitureId": number[], //拖尾id
    "seat": number,  //座位
    "fristRank": number, //第一局名次
    "finalRank": number, // 第二局 
    "exGold": number //额外金币
    "isAfk": boolean, // 是否挂机
    "emoji": [], // 拥有的表情
    "anims": [], // 拥有的动作
    title: string,
    team?: string[],//队伍信息
    aiList?: any[],//队伍信息
    "boxPassword": BoxPassword//大厅界面宝箱密码, 已经获取后probability为1
};
export class Player {

    public winNpcs = [];

    private _character: Character;
    /**
     * 排名
     */
    private _rank: number = 10000;
    /**
     * 是否淘汰
     */
    public isEliminate: boolean;
    /**
     * 淘汰剩余数量
     */
    public eliminateRemaind: number = 100;
    /**
     * AI剩余数量
     */
    public remainAICount: number = 100;
    /**
     * 队伍获胜
     */
    public isTeamWin: boolean = false;
    /**
     * 经过保底检查点时间
     */
    public passedTime: number = 0;

    /**
     * @param playerId   玩家ID，非空表示是玩家
     * @param team 所在游戏队伍
     * @param guid,非空则表示是AI
     * @param data 玩家数据
     */
    constructor(public playerId: number, public userId: string, public team: Team, public guid: string, public data: PlayerData) {
        this._rank = 10000;
    }
    /**
     * 添加胜利的NPC
     * @param characterName 
     * @param seat 
     * @param skinId 
     * @param garnitureId 
     */
    public addWinNpc(characterName: string, seat: number, skinId: number, garnitureId: number, guid: string) {
        this.winNpcs.push({ name: characterName, skinId: skinId, garnitureId: [garnitureId], seat: seat, guid: guid });
    }
    /**重置
     * @return true-成功 false-失败
     */
    public reset() {
        if (this.playerId) {
            if (!mw.Player.getPlayer(this.playerId)) {
                return false;
            }
        }
        this._rank = 10000;
        return true;
    }
    public set rank(value: number) {
        this._rank = value;
        if (this.team.serverData["round"] == 1) {
            this.data.fristRank = value;
        } else {
            this.data.finalRank = value;
        }
    }
    /**
     * 是否玩家并且存在
     */
    public get isPlayerAlive() {
        if (this.guid) return false;
        return mw.Player.getPlayer(this.playerId);
    }
    public get rank() {
        return this._rank;
    }
    public get character() {
        if (this.playerId) {
            if (!this._character) {
                const player = mw.Player.getPlayer(this.playerId);
                this._character = player.character;
            }
        } else {
            if (!this._character) {
                this._character = GameObject.findGameObjectById(this.guid) as Character;
            }
        }
        return this._character;
    }

    /**
     * 是否完成
     * @returns 
     */
    public get isFinish() {
        return this.rank < 10000;
    }
}