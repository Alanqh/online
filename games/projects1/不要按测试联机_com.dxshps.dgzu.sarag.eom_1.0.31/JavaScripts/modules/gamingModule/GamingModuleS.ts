import { oTrace } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { InGameStatus } from "../../const/Enum";
import { GamingCtrlEventS2S, GlobalCtrlEventS2S } from "../../const/GameCommonEvent";
import { GlobalData } from "../../const/GlobalData";
import GameComUtils from "../../utils/GameComUtils";
import HUDModuleS from "../hudModule/HUDModuleS";
import { GameToHallDataManager, JumpGameHelper } from "../jumpGame/JumpGameHelper";
import MGSModuleS from "../mgsModule/MGSModuleS";
import PlayerModuleS from "../playerModule/PlayerModuleS";
import { PropMrg, PropScene } from "../propModule/PropMrg";
import TeamModuleS from "../teamModule/TeamModuleS";
import GamingModuleC from "./GamingModuleC";
import RandomGroup from "./RandomGroup";

/**
 * 游戏模块
 * 受GamingCtrl控制
 * 类似mvc中的v。但是具体业务逻辑写这里
 */
export default class GamingModuleS extends ModuleS<GamingModuleC, null> {

    private myPrefab: mw.GameObject = null;             // 当前关卡预制体
    private lastLevelID: number = -1;                   // 上一个关卡ID
    private randomGroup: RandomGroup = null;                   // 随机关卡组

    private diveCountMap: Map<number, number> = new Map();  //玩家飞扑次数
    /**是否开始加载游戏如果还没进入游戏就退出是不会获得奖励的 */
    private enterGame: boolean = false;

    protected async onStart() {
        GlobalData.levelEndCount_S = 0;

        Event.addLocalListener(GlobalCtrlEventS2S.CTRL_WAIT_DONE_S2S, () => {
            ModuleService.getModule(HUDModuleS).showAllPlayerReady();
            ModuleService.getModule(MGSModuleS).waitDone();
        });

        this.randomGroup = new RandomGroup();
    }

    public enterLoadingState() {
        ModuleService.getModule(PlayerModuleS).enterLoadingState();
        let randomLevelID: number = this.getRandomNum();
        this.createTrap(randomLevelID);
        this.enterGame = true;
    }

    private getRandomNum() {
        let randomLevelID: number = 0;
        if (GlobalData.gmMapID != -1) {
            randomLevelID = GlobalData.gmMapID
            GlobalData.gmMapID = -1;
        } else {
            randomLevelID = this.randomGroup.getTrapRandomId();
        }
        oTrace('guan log 随机关卡id', randomLevelID);
        return randomLevelID;
    }

    private async createTrap(levelID: number) {
        if (this.myPrefab != null) {
            console.error("this.myTrap !=null this.lastLevelID:", this.lastLevelID)
            return
        }
        this.lastLevelID = levelID;
        let config = GameConfig.Level.getElement(levelID);

        // 通知所有玩家进入loading状态
        this.getAllClient().net_enterLoadingState(levelID);

        let trans = new mw.Transform();
        trans.position = config.pos.clone();
        trans.rotation = new Rotation(config.rot);
        trans.scale = Vector.one;
        // 
        let pguid = config.guid;
        if (GlobalData.gmPrefabGuid != "") {
            pguid = GlobalData.gmPrefabGuid;
            // GlobalData.gmPrefabGuid = "";
        }
        this.myPrefab = await mw.GameObject.asyncSpawn(pguid, { transform: trans });
        (this.myPrefab as Model).setCollision(PropertyStatus.Off);
        //生成道具
        PropMrg.instance.createPropPoint(PropScene.Game, levelID);
    }


    public enterPrepareState() {
        oTrace('guan log 这里写所有人的准备动画');
        Event.dispatchToLocal(GamingCtrlEventS2S.CTRL_GAMING_PREPARE, this.lastLevelID);

        // Tips.showToAllClient("准备阶段！！！！")
    }

    public enterGamingState() {
        oTrace('guan log 这里通知关卡开始');
        // Tips.showToAllClient("开始游戏了！！！")

    }

    public enterCalculateState(levelEndCount: number) {
        oTrace('guan log 开始结算，玩家切换位置，到结算动画，直接销毁关卡，levelEndCount', levelEndCount);
        try {
            if (this.myPrefab != null) {

                // let childs = this.myPrefab.getChildren();
                // for (let i = 0; i < childs.length; i++) {
                //     childs[i].destroy();
                // }
                this.myPrefab.destroy();
                this.myPrefab = null;
            }
            //销毁道具
            PropMrg.instance.gameOver();
        } catch (error) {
            console.error("销毁关卡实例出错", error)
        }

        let winList = null;
        try {
            // 修改数据
            winList = ModuleService.getModule(PlayerModuleS).enterCalculateState();
        } catch (error) {
            console.error("PlayerModuleS enterCalculateState 出错", error)
        }

        if (winList == null) {
            console.error("enterCalculateState服务器出错了，winList = null");
            // this.getAllClient().net_GameOver();
            return false;
        }

        if (winList.length == 0) {
            oTrace('guan log 无人获胜，游戏结束');
            this.getAllClient().net_GameOver();
            return false;
        }

        let mgsModule = ModuleService.getModule(MGSModuleS);
        for (let i = 0; i < winList.length; i++) {
            mgsModule.playerWin(winList[i], levelEndCount);
        }

        // 第一轮结束有个淘汰动画，需要所有玩家看到的一致
        let plist = Player.getAllPlayers();
        let pidList = [];
        let pNameList = [];
        let loseList = [];
        for (let i = 0; i < plist.length; i++) {
            pidList.push(plist[i].playerId);
            pNameList.push(plist[i].character.displayName);
            if (!winList.includes(plist[i].playerId)) {
                loseList.push(plist[i].playerId);
            }
        }

        if (levelEndCount == 1) {
            let playEffectTimer = (GameConfig.RuleGame.getElement(10046).float_Value + GlobalData.calculateWaitTime) * 1000;
            // 播放特效
            setTimeout(() => {
                for (let i = 0; i < winList.length; i++) {
                    let player = Player.getPlayer(winList[i]);
                    if (!player || !player.character) continue;
                    GameComUtils.playEffectOnChar(player.character, GlobalData.winEffectID);
                }

                for (let i = 0; i < loseList.length; i++) {
                    let player = Player.getPlayer(loseList[i]);
                    if (!player || !player.character) continue;
                    GameComUtils.playEffectOnChar(player.character, GlobalData.loseEffectID);
                }
            }, playEffectTimer);

        }
        // 移动到结算位置做表现
        Player.getAllPlayers().forEach(player => {
            this.getClient(player).net_enterCalculateState(pidList, pNameList, winList, this.lastLevelID, levelEndCount);
        })
        return true;
    }


    public gm_jumpAll() {
        let needData: Record<string, unknown> = {};//玩家数据体
        let playerList: string[] = [];//跳转的玩家ID列表
        let gameId: string = GlobalData.HallRoom_GameId;//跳转的游戏ID
        const players = Player.getAllPlayers();
        players.forEach(p => {
            playerList.push(p.playerId.toString());
            let data: string = null;
            let res = InGameStatus.Winner;
            data = new GameToHallDataManager(res).encode();
            needData[p.userId] = data;
        })
        JumpGameHelper.enterNewGameByTeam(gameId, playerList, needData);
    }

    // 强制退出
    public forceGameOver() {
        this.getAllClient().net_GameOver();
    }

    public async net_JumpGameByTeam(pUserId: string, gameId: string) {
        let pUserIds = ModuleService.getModule(TeamModuleS).getPlayerTeamPIds(pUserId);
        if (!pUserIds || pUserIds.length == 0) {
            return;
        }
        let needData: Record<string, unknown> = {};//玩家数据体
        let playerList: string[] = [];//跳转的玩家ID列表
        pUserIds.forEach(p => {
            let pIds = Player.getPlayer(p).playerId
            playerList.push(pIds.toString());
            let data: string = null;
            let res = ModuleService.getModule(PlayerModuleS).getInGameStatus(pIds);
            let diveCount = this.diveCountMap.get(pIds);
            if (diveCount == null || diveCount == undefined) diveCount = 0;
            let gameToHall = new GameToHallDataManager(res, diveCount);
            gameToHall.leaderUserId = pUserId;
            data = gameToHall.encode();
            needData[p] = data;
            ModuleService.getModule(MGSModuleS).jumpToHall_Server(Player.getPlayer(p));
        })
        // 上面会发埋点，这里延迟一下等埋点结束;
        await TimeUtil.delaySecond(0.3);
        //跳转
        JumpGameHelper.enterNewGameByTeam(gameId, playerList, needData)
    }

    @Decorator.noReply()
    public net_incrDiveCount() {
        let diveCount = this.diveCountMap.get(this.currentPlayerId);
        if (diveCount == null || diveCount == undefined) {
            diveCount = 0;
        }
        diveCount++;
        this.diveCountMap.set(this.currentPlayerId, diveCount);
    }

    public getEnterGaming() {
        return this.enterGame;
    }
}