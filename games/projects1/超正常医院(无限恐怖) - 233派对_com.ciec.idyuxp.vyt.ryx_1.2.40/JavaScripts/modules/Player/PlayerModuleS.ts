import { GlobalData } from "../../const/GlobalData";
import { EnumAnalytics, PlayerCurState } from "../../const/enum";
import { SoundManager } from "../../utils/SoundManager";
import { utils } from "../../utils/uitls";
import { GlobalAnalytics } from "../Analytics/GlobalAnalytics";
import { AreaCheck } from "../Area/AreaCheck";
import { MonsterChangeS } from "../ChangeMonster/MonsterChangeS";
import TeamS from "../Team/TeamS";
import TimeModuleS from "../Time/TimeModuleS";
import { PlayerModuleC } from "./PlayerModuleC";
import { PlayerModuleData } from "./PlayerModuleData";
import PlayerTempData from "./PlayerTempData";

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerModuleData> {

    private playerTempDatas: PlayerTempData[] = [];
    /**玩家受伤Map 玩家id  any */
    private playerInjuredMap: Map<number, any> = new Map();

    private teamMS: TeamS = null;

    protected onStart(): void {

        ModuleService.getModule(TimeModuleS).onDayStart.add(() => {
            this.setAllPlayerSafe(false);
        });
        this.teamMS = ModuleService.getModule(TeamS);

        GlobalData.PlayerAttribute.playerStateChanged_S.add(this.playerStateChange, this);
    }

    protected async onPlayerEnterGame(player: mw.Player): Promise<void> {
        let hasPlayer: boolean = false;
        if (this.playerTempDatas.length > 0) {
            this.playerTempDatas.forEach((element) => {
                if (element.PlayerId == player.playerId) {
                    hasPlayer = true;
                }
            });
        }
        if (hasPlayer) return;
        let tempData = player.character.addComponent(PlayerTempData);
        tempData.init_S(player.playerId, 0);
        this.playerTempDatas.push(tempData);

    }

    protected onPlayerLeft(player: mw.Player): void {

        try {
            let index = this.playerTempDatas.findIndex((element) => {
                return element.PlayerId == player.playerId;
            });
            if (index != -1) {
                this.playerTempDatas[index].destroy();
                this.playerTempDatas.splice(index, 1);
            }
            this.removeInjuredInterval(player.playerId);
        } catch (error) {

        }
    }

    /**获取玩家是否首次加入 */
    public getFirstJoin(playerId: number): boolean {
        let data = this.getPlayerData(playerId);
        if (data) {
            return data.firstJoin;
        }
        return false;
    }

    @Decorator.noReply()
    public net_setPlayerName(name: string) {
        this.currentPlayer.character.displayName = name;
    }

    @Decorator.noReply()
    public net_callHelp() {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == this.currentPlayerId;
        });
        if (!tempData) return;
        tempData.openOutLine_S();
        tempData.changeHp_S(GlobalData.PlayerAttribute.playerHelpBlood);
        SoundManager.instance.playSound(27);
    }

    @Decorator.noReply()
    public net_ChangeHP(val: number) {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == this.currentPlayerId;
        });
        if (!tempData) return;
        tempData.changeHp_S(val)
    }


    @Decorator.noReply()
    net_rescuePlayer(target: number) {
        let tempData = this.getPlayerTempData(target)
        if (!tempData) return;
        if (tempData.PlayerState != PlayerCurState.Weak) {
            console.warn(`lwj 玩家${target}不在弱状态，不能救援`);
            return;
        }
        tempData.PlayerState = PlayerCurState.Survive;
        tempData.changeHp_S(-100);
        this.removeInjuredInterval(target);
        //解救玩家
        tempData = this.getPlayerTempData(this.currentPlayerId);
        if (!tempData) return;
        tempData.savePlayer();
        this.currentData.addSaveCount();
    }

    @Decorator.noReply()
    net_startGame(isFirst: boolean) {
        if (isFirst) {
            this.currentData.firstJoin = false;
            this.currentData.save(false);
        }
        if (utils.isNight())
            this.teamMS.assignPlayerTeam(this.currentPlayer)
    }

    /**设置玩家状态 */
    public setPlayerState(playerId: number, state: PlayerCurState) {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == playerId;
        });
        if (tempData) {
            console.warn(`lwj 玩家状态 ${playerId} ${state}`);
            tempData.PlayerState = state;
        }
        if (state == PlayerCurState.Alive) {
            this.removeInjuredInterval(playerId);
        }
    }

    /**获取玩家拯救人数 */
    public getSavePlayerCount(playerId: number): number {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == playerId;
        });
        if (tempData) {
            return tempData.saveCount;
        }
        return 0;
    }

    public changeHp(playerId: number, value: number) {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == playerId;
        });
        if (tempData) {
            tempData.changeHp_S(value);
        }
    }

    private playerStateChange(playerId: number, state: PlayerCurState) {

        console.warn(`lwj 状态 ${state}`);
        if (state == PlayerCurState.Mutant) {
            this.removeInjuredInterval(playerId);
            ModuleService.getModule(TeamS).changeBio(Player.getPlayer(playerId));
        }
    }

    net_test() {
        this.attackPlayer(this.currentPlayerId, 1);
    }

    /**成功攻击到玩家
     * @param playerId 玩家ID
     * @param atker 攻击者
     */
    public attackPlayer(playerId: number, atker: number) {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == playerId;
        });
        if (tempData.PlayerState == PlayerCurState.Survive) {
            console.warn(`lwj 虚弱`);
            tempData.PlayerState = PlayerCurState.Weak;
            ModuleService.getModule(MonsterChangeS).successAttack(Player.getPlayer(atker));
            this.addInjuredInterval(playerId, tempData, GlobalData.Biochemical.infectRate);

            this.getPlayerData(atker).addInfectionCount();

        } else if (tempData.PlayerState == PlayerCurState.Weak) {
            tempData.changeHp_S(GlobalData.Biochemical.infectRateHit);
        }
    }


    /**
     * 添加玩家受伤定时器
     * @param playerId 玩家id
     * @param tempData 玩家临时数据
     * @returns 
     */
    private addInjuredInterval(playerId: number, tempData: PlayerTempData, val: number) {
        if (this.playerInjuredMap.has(playerId)) {
            this.removeInjuredInterval(playerId);
        }
        let interval = TimeUtil.setInterval(() => {
            tempData.changeHp_S(val);
        }, 1);
        this.playerInjuredMap.set(playerId, interval);
    }

    /**
     * 移除玩家受伤定时器
     * @param playerId 玩家id
     * @returns 
     */
    private removeInjuredInterval(playerId: number) {
        let interval = this.playerInjuredMap.get(playerId);
        if (interval) {
            TimeUtil.clearInterval(interval);
            this.playerInjuredMap.delete(playerId);
        }
    }


    public getPlayerTempData(playerId: number): PlayerTempData {
        let tempData = this.playerTempDatas.find((element) => {
            return element.PlayerId == playerId;
        });
        return tempData;
    }

    /**
     * 玩家是否可被NPC伤害
     * @param npcId 要攻击的NPC
     * @param playerId 受击 玩家id
     */
    public canBeAttacked(npcId: number, playerId: number): boolean {
        if (this.getPlayerSafe(playerId)) {
            console.warn(`lwj 玩家安全 ${playerId}`);
            return false;
        }
        if (this.teamMS.getISBio(playerId)) {
            // console.warn(`lwj 玩家是生化 ${playerId}`);
            return false;
        }
        let data = this.getPlayerTempData(playerId);
        if (!data) return false;
        if (data.PlayerState == PlayerCurState.Survive || data.PlayerState == PlayerCurState.Weak) return true;
        console.warn(`lwj 玩家状态不对 ${playerId} ${data.PlayerState}`);
        return false;
    }


    /**获取玩家血量 */
    public getPlayerHP(playerId: number): number {
        if (!this.getPlayerTempData(playerId)) return 0;
        return this.getPlayerTempData(playerId).CurHp;
    }

    /**获取玩家是否安全 */
    private getPlayerSafe(playerId: number): boolean {
        if (!this.getPlayerTempData(playerId)) {
            console.warn(`lwj 玩家不存在 ${playerId}`);
            return false;
        }
        // console.warn(`lwj 玩家是否安全  ${this.getPlayerTempData(playerId).isInSafeArea}`);
        return this.getPlayerTempData(playerId).isInSafeArea;
    }


    /**
     * 获取下目前活着、没有被NPC锁定的玩家 
     * @param npcID NPCID
     * @param center npc中心点位置
     */
    public getAlivePlayer(npcID: number, center: mw.Vector): mw.Player[] {

        let playerArr: mw.Player[] = [];
        //过滤活着的玩家
        let tempDatas = this.playerTempDatas.filter((element) => {
            return element.CurHp > 0;
        });

        //都死了
        if (tempDatas.length == 0) {
            return playerArr;
        }
        //获取在NPC区域内的玩家
        tempDatas = AreaCheck.instance.getAreaPlayer(center, tempDatas);
        if (tempDatas.length == 0) {
            return playerArr;
        }
        //过滤没有被NPC锁定的玩家

        tempDatas.forEach((item) => {
            let player = Player.getPlayer(item.PlayerId);
            if (player)
                playerArr.push(player);
        })
        return playerArr;
    }

    /**
    * 获取活着的玩家
    */
    public getAlive(npcID: number): mw.Player[] {
        let playerArr: mw.Player[] = [];
        //过滤活着的玩家
        let tempDatas = this.playerTempDatas.filter((element) => {
            return element.CurHp > 0;
        });

        //都死了
        if (tempDatas.length == 0) {
            return playerArr;
        }


        tempDatas.forEach((item) => {
            let player = Player.getPlayer(item.PlayerId);
            if (player)
                playerArr.push(player);
        });

        return playerArr;
    }

    /**
     * 设置玩家是否安全
     * @param playerId 玩家id
     * @param isLock is安全
     */
    public setPlayerSafe(playerId: number, isSafe: boolean) {
        let data = this.getPlayerTempData(playerId);
        if (data) {
            // console.warn(`lwj 设置玩家被NPC锁定 ${playerId} ${isSafe}`);
            data.isInSafeArea = (isSafe);
        }
    }


    /**设置玩家是否安全 */
    public net_SetSafe(isSafe: boolean) {
        this.setPlayerSafe(this.currentPlayerId, isSafe);
    }

    /**
     * 设置玩家是否交互
     * @param playerId 玩家id
     * @param isInteract 是否交互
     */
    public setPlayerInteract(playerId: number, isInteract: boolean) {
        let data = this.getPlayerTempData(playerId);
        if (data) {
            data.setInteract(playerId, isInteract);
        }
    }

    /**
     * 设置所有玩家是否安全
     */
    public setAllPlayerSafe(isSafe: boolean) {
        this.playerTempDatas.forEach((element) => {
            element.isInSafeArea = isSafe;
        });
    }

    /**使用复活币 */
    public net_useReviveCoin() {
        if (this.currentData.reviceCoin <= 0) return false;
        this.currentData.reviceCoin--;
        this.currentData.save(true);
        GlobalAnalytics.instance.setGlobalEnumData(EnumAnalytics.reborn_use, this.currentPlayer);
        return true;
    }


    /**增加复活币 （TODO，以后挪到玩家资产模块） */
    addReviveCoin(playerId: number, count: number) {

        let data = this.getPlayerData(playerId)
        data.reviceCoin += count;
        data.save(true);
    }

}