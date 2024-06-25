import { GlobalData } from "../../const/GlobalData";
import { GameMode, PlayerCurState, PlayerRace } from "../../const/enum";
import { SoundManager } from "../../utils/SoundManager";
import { utils } from "../../utils/uitls";
import { AnalyticsModuleS } from "../Analytics/AnalyticsModule";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import BattlePassModuleS from "../BattlePass/BattlePassModuleS";
import { MonsterChangeS } from "../ChangeMonster/MonsterChangeS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import TimeModuleS from "../Time/TimeModuleS";
import TeamC from "./TeamC";
import { TeamData } from "./TeamData";

export default class TeamS extends ModuleS<TeamC, TeamData> {
    /**生化母体数组 */
    public bioMotherArr: Array<number> = [];
    /**生化数组 */
    public bioArr: Array<number> = [];
    /**人类数组 */
    public humanArr: Array<number> = [];
    /**生化人比例 */
    private bioRate: number;

    private playerMS: PlayerModuleS = null;
    private changeMS: MonsterChangeS = null;

    /**人类生存时间Map */
    private humanTimeMap: Map<number, number> = new Map();
    /**人类生存秒数Map */
    private _humanTimeSecMap: Map<number, number> = new Map();


    /**一局的开始时间 */
    private startTime: number = 0;

    protected onStart(): void {

        let num = GlobalData.Biochemical.teamNumRate;
        this.bioRate = num[0] / (num[1] + num[0]);

        let timeMS = ModuleService.getModule(TimeModuleS);
        timeMS.onDayStart.add(this.dayStart.bind(this));
        timeMS.onNightStart.add(this.nightStart.bind(this));

        this.changeMS = ModuleService.getModule(MonsterChangeS);
        this.playerMS = ModuleService.getModule(PlayerModuleS);

    }
    protected onPlayerEnterGame(player: mw.Player): void {
        this.getPlayerData(player);
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.exitTeam(player);
        } catch (error) {
        }
    }

    private dayStart() {
        console.warn(`lwj 白天开始`);

        this.gameOver();
        this.clear();
    }

    private clear() {
        this.humanArr.length = 0;
        this.bioArr.length = 0;
        this.bioMotherArr.length = 0;
        this.humanTimeMap.clear();
        this._humanTimeSecMap.clear();
    }

    private nightStart() {
        this.startTime = TimeUtil.elapsedTime();
        this.assignTeam();
        SoundManager.instance.playSound(GlobalData.Biochemical.infectModeOpenSound)
    }

    /**分配队伍 */
    private assignTeam(): void {
        let allPlayers = Player.getAllPlayers();
        utils.shuffleArray(allPlayers);
        let bioNum = Math.floor(allPlayers.length * this.bioRate);
        console.warn(`lwj 生化人数  ${bioNum}  ${this.bioRate}`);
        let humanNum = allPlayers.length - bioNum;
        for (let i = 0; i < allPlayers.length; i++) {
            let can = this.playerMS.getFirstJoin(allPlayers[i].playerId);
            if (can) {
                continue;
            }
            if (i < humanNum) {
                //人类
                console.warn(`lwj 人类`);
                this.changeHuman(allPlayers[i]);
                this.getClient(allPlayers[i]).net_Tips(PlayerRace.Human);
            } else {
                //变身
                console.warn(`lwj 变身`);
                this.changeBio(allPlayers[i]);
                this.bioMotherArr.push(allPlayers[i].playerId);
                this.getClient(allPlayers[i]).net_Tips(PlayerRace.Ghost);
            }

        }
    }

    /**给玩家分配队伍 */
    public assignPlayerTeam(player: mw.Player): void {
        let curBio = Math.floor(Player.getAllPlayers().length * this.bioRate);
        if (curBio <= this.bioArr.length) {
            //人类
            this.changeHuman(player);
            this.getClient(player).net_Tips(PlayerRace.Human);
        } else {
            //是生化
            this.changeBio(player);
            this.bioMotherArr.push(player.playerId);
            this.getClient(player).net_Tips(PlayerRace.Ghost);
        }
    }

    /**变生化 */
    public changeBio(player: mw.Player): void {
        this.bioArr.push(player.playerId);
        //如果是人类，从人类数组中删除
        let index = this.humanArr.indexOf(player.playerId);
        if (index != -1) {
            this.humanArr.splice(index, 1);
        }

        this.getHumanMin(player.playerId);
        //是否全都是生化
        if (this.humanArr.length == 0) {
            //结束游戏
            console.warn(`lwj 没有玩家 结束`);
            ModuleService.getModule(TimeModuleS).nextDay(GameMode.Normal);
            return;
        }

        this.changeMS.changeBio(player);
    }

    /**变人类 */
    private changeHuman(player: mw.Player): void {
        this.addBioTime(player.playerId);
        let has = this.humanArr.includes(player.playerId);
        if (!has)
            this.humanArr.push(player.playerId);
        this.playerMS.setPlayerState(player.playerId, PlayerCurState.Survive);
    }


    /**退出 */
    private exitTeam(player: mw.Player): void {
        if (!utils.isNight()) return;
        let index = this.bioArr.indexOf(player.playerId);
        if (index != -1) {
            this.bioArr.splice(index, 1);
            this.changeMS.changeNormal(player);
        }
        index = this.humanArr.indexOf(player.playerId);
        if (index != -1) {
            this.humanArr.splice(index, 1);
        }
        if (this.humanArr.length == 0) {
            //结束游戏
            ModuleService.getModule(TimeModuleS).nextDay(GameMode.Normal);
            return;
        }
    }

    /**是否变身 */
    public getISBio(playerID: number) {
        return this.bioArr.includes(playerID);
    }


    /**添加变身时间 */
    private addBioTime(playerID: number) {
        if (this.humanTimeMap.has(playerID)) {
            console.warn(`lwj typee 已经存在变身时间`);
        }
        this.humanTimeMap.set(playerID, TimeUtil.elapsedTime());
    }

    /**获取人类生存时间 */
    private getHumanMin(playerId: number): number {
        let lastTime = this.humanTimeMap.get(playerId);
        if (lastTime) {
            let minute = Math.floor(TimeUtil.elapsedTime() - lastTime);
            this.humanTimeMap.delete(playerId);
            this._humanTimeSecMap.set(playerId, minute);
            return minute;
        } else {
            if (this._humanTimeSecMap.has(playerId)) {
                return this._humanTimeSecMap.get(playerId);
            }
        }
        return 0;
    }

    /**gameover */
    private gameOver() {
        if (this.humanArr.length == 0 && this.bioArr.length == 0) return;
        console.warn(`lwj 结束游戏`);
        SoundManager.instance.playSound(GlobalData.Biochemical.infectModeOpenSound)
        let Time = TimeUtil.elapsedTime() - this.startTime;

        //人类胜利
        if (this.humanArr.length > 0) {
            console.warn(`lwj 人类胜利 ${this.humanArr.length}`);
            AnalyticsTool.ts_game_over(Time, "survivors");

            //人类胜利
            this.bioResult(this.humanArr, true, PlayerRace.Human);

            //玩家-》生化 胜利
            this.bioMotherArr.forEach(playerId => {
                let index = this.bioArr.indexOf(playerId);
                if (index != -1) {
                    this.bioArr.splice(index, 1);
                }
            });
            this.bioResult(this.bioArr, true, PlayerRace.Mix);

            //生化母体 失败
            this.bioResult(this.bioMotherArr, false, PlayerRace.Ghost);
            return;
        }

        //生化胜利
        if (this.bioArr.length > 0) {
            console.warn(`lwj 生化胜利`);
            AnalyticsTool.ts_game_over(Time, "Zombie");
            //生化母体胜利
            this.bioResult(this.bioMotherArr, true, PlayerRace.Ghost);

            //玩家-》生化 失败
            this.bioMotherArr.forEach(playerId => {
                let index = this.bioArr.indexOf(playerId);
                if (index != -1) {
                    this.bioArr.splice(index, 1);
                }
            });
            this.bioResult(this.bioArr, false, PlayerRace.Mix);
        }

    }

    private bioResult(arr: number[], win: boolean, type: PlayerRace) {
        let sec = 0;
        let min = 0;
        let saveCount = 0;
        let killCount = 0;
        let reward = 0;
        let resData: { sec: number, saveCount: number, killCount: number, coin: number } = { sec: 0, saveCount: 0, killCount: 0, coin: 0 }
        const data = GlobalData.Biochemical;

        arr.forEach(playerId => {

            let player = Player.getPlayer(playerId);
            if (!player) {
                console.warn(`lwj typee player is null ${playerId}`);
                return;
            }

            switch (type) {
                case PlayerRace.Human:
                    sec = this.getHumanMin(playerId);
                    saveCount = this.playerMS.getSavePlayerCount(playerId);
                    min = Math.ceil(sec / 60);
                    reward = Math.ceil(data.baseScore * (1 + data.basePercent + min * data.percentAdd));
                    resData.sec = sec;
                    resData.killCount = 0;
                    resData.saveCount = saveCount;
                    resData.coin = reward;
                    this.getClient(playerId).net_settlement(type, win, JSON.stringify(resData));
                    break;

                case PlayerRace.Mix:
                    sec = this.getHumanMin(playerId);
                    saveCount = this.playerMS.getSavePlayerCount(playerId);
                    killCount = this.changeMS.getKillPlayerNum(playerId);
                    min = Math.ceil(sec / 60);
                    reward = Math.ceil(data.baseScore * (1 + data.basePercent + min * data.percentAdd) + data.baseScore * (1 + data.infectAdd * killCount));
                    this.changeMS.changeNormal(Player.getPlayer(playerId));

                    resData.sec = sec;
                    resData.killCount = killCount;
                    resData.saveCount = saveCount;
                    resData.coin = reward;
                    this.getClient(playerId).net_settlement(type, win, JSON.stringify(resData));

                    break;

                case PlayerRace.Ghost:
                    killCount = this.changeMS.getKillPlayerNum(playerId);
                    reward = Math.ceil(data.baseScore * (1 + data.infectAdd * killCount));
                    this.changeMS.changeNormal(Player.getPlayer(playerId));
                    resData.sec = 0;
                    resData.killCount = killCount;
                    resData.saveCount = 0;
                    resData.coin = reward;
                    this.getClient(playerId).net_settlement(type, win, JSON.stringify(resData));
                    break;

                default:
                    break;
            }
            this.addGameCoin(reward, playerId);
            this.playerMS.setPlayerState(playerId, PlayerCurState.Alive);
            ModuleService.getModule(BattlePassModuleS).addScore(playerId, GlobalData.Biochemical.expPerGame);
        });
    }




    net_AddGameCoin(value: number) {
        return this.addGameCoin(value, this.currentPlayer.playerId)
    }

    net_SubGameCoin(value: number) {
        return this.reduceGameCoin(value, this.currentPlayer.playerId)
    }

    addGameCoin(val: number, playerId: number) {
        return this.getPlayerData(playerId).changegameCoin(val, true);
    }

    reduceGameCoin(val: number, playerId: number) {
        return this.getPlayerData(playerId).changegameCoin(val, false);
    }
}