import PlayerModuleS from "../playerModule/PlayerModuleS";
import TeamModuleC from "./TeamModuleC";

export default class TeamModuleS extends ModuleS<TeamModuleC, null>{

    private playerMS: PlayerModuleS;

    private _playerTeamMap: Map<string, string[]> = new Map();

    protected onStart(): void {
        this.playerMS = ModuleService.getModule(PlayerModuleS);
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.playerRemoveTeam(player.userId);
    }
    /**
     * 玩家加入队伍
     * @param pUserId 
     * @param leaderId 队长userId
     */
    public playerAddTeam(pUserId: string, leaderUserId: string) {
        if (!this._playerTeamMap.has(leaderUserId)) {
            this._playerTeamMap.set(leaderUserId, []);
            if (Player.getPlayer(leaderUserId)) {
                this._playerTeamMap.get(leaderUserId).push(leaderUserId);
                this.playerMS.playerAddTeam(leaderUserId, leaderUserId);
            }
        }
        let teamArr = this._playerTeamMap.get(leaderUserId);
        if (teamArr.length >= 4) return;
        if (teamArr.indexOf(pUserId) == -1 && leaderUserId != pUserId) {
            teamArr.push(pUserId);
        }
        else if (teamArr.indexOf(pUserId) == -1 && leaderUserId == pUserId) {
            teamArr.unshift(leaderUserId);
        }
        let playerIdArr = new Array<number>();
        teamArr.forEach(userId => {
            let player = Player.getPlayer(userId);
            if (!player) {
                return;
            }
            playerIdArr.push(player.playerId);
        });
        this.playerMS.playerAddTeam(pUserId, leaderUserId);
        teamArr.forEach(userId => {
            let player = Player.getPlayer(userId)
            if (!player) return
            let pId = player.playerId;
            this.getClient(pId).net_PlayerTeamChange(leaderUserId, playerIdArr);
        })
    }

    /**
     * 玩家离开队伍
     * @param pUserId 
     */
    public playerRemoveTeam(pUserId: string) {
        let leaderId = this.getPlayerLeaderId(pUserId);
        if (!this._playerTeamMap.has(leaderId)) {
            return;
        }
        let pIds = this._playerTeamMap.get(leaderId);
        let index = pIds.indexOf(pUserId)
        if (index == -1) return;
        pIds.splice(index, 1);
        if (pIds.length <= 1) {
            this._playerTeamMap.delete(leaderId);
            this.syncTeamClear(pIds);
            return;
        }
        let newpIds = Array.from(pIds);
        this.syncClientShow(newpIds)
        if (leaderId != pUserId) return;
        this._playerTeamMap.delete(leaderId);
        this._playerTeamMap.set(newpIds[0], newpIds);
        this.syncClientShow(newpIds)

    }

    private syncTeamClear(pIds: Array<string>) {
        pIds.forEach(userId => {
            let player = Player.getPlayer(userId);
            if (!player) {
                return;
            }
            this.getClient(player.playerId).net_teamBreak();
        });
    }

    private syncClientShow(userIdAtts: Array<string>) {
        let playerIdArr = new Array<number>();
        userIdAtts.forEach(userId => {
            let player = Player.getPlayer(userId);
            if (!player) {
                return;
            }
            playerIdArr.push(player.playerId);
        });
        userIdAtts.forEach(userId => {
            this.playerMS.playerAddTeam(userId, userIdAtts[0]);
            let pId = Player.getPlayer(userId).playerId;
            this.getClient(pId).net_PlayerTeamChange(userIdAtts[0], playerIdArr);
        })
    }

    /**
     * 获取玩家队伍Id（队长Id）
     * @param pId 
     * @returns 
     */
    public getPlayerLeaderId(pUserId: string) {
        let lId: string = null;
        this._playerTeamMap.forEach((teamIds, leaderId) => {
            if (lId != null) return
            if (teamIds.indexOf(pUserId) != -1) {
                let player = Player.getPlayer(leaderId);
                if (!player) return;
                lId = player.userId;
            }
        })
        return lId;
    }
    public net_getPlayerTeamPIds(pUserId: string) {
        let id = this.getPlayerTeamPIds(pUserId);
        return id
    }
    /**
     * 通过玩家Id获取玩家所在队伍的全部队员Id
     * @param pUserId 
     * @returns 
     */
    public getPlayerTeamPIds(pUserId: string) {
        let leaderId = this.getPlayerLeaderId(pUserId)
        if (leaderId == null) return null
        if (!this._playerTeamMap.has(leaderId)) return null;
        return this._playerTeamMap.get(leaderId);
    }
}