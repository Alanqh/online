/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-07 14:07:47
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-11 17:32:56
 * @FilePath     : \petparty\JavaScripts\modules\playerModule\PlayerSync.ts
 * @Description  : 修改描述
 */
import { oTrace } from "odin";
import { EPlayerStateType, PlayerTeamStateType } from "../../const/Enum";
import { GameEventC2C } from "../../const/GameCommonEvent";
import { CameraUtil } from "../../utils/CameraUtil";
import TeamModuleC from "../teamModule/TeamModuleC";

@Component
export default class PlayerSync extends Script {
    /**是否自己 */
    private _isSelf: boolean = false;
    /**玩家属性同步对象缓存,仅客户端使用 */
    public static PlayerSyncMap_Client: Map<number, PlayerSync> = new Map();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        oTrace('guan log 初始化 PlayerSync');
    }

    // 宠物配置id
    @mw.Property({ replicated: true })
    private _petId: number = 0;
    public get getPetId() {
        return this._petId;
    }
    public server_init(pId: number) {
        if (this._beginDeatroy) return;

        this._playerId = pId;
        oTrace('guan log pId', pId);
    }

    @RemoteFunction(mw.Server)
    public setPetId(petId: number) {
        this._petId = petId;
    }
    public get IsSuccess() {
        return this._playerState == EPlayerStateType.Win;
    }

    @mw.Property({ replicated: true, onChanged: "client_call_playerName" })
    private _playerName: string = "";

    public set playerName(name: string) {
        if (SystemUtil.isClient()) {
            return;
        }
        this._playerName = name;
    }

    public get playerName() {
        return this._playerName;
    }

    private client_call_playerName(){
        this.refreshName();
    }

    private refreshName(){
        if (this._playerId == 0 || this._playerName == "") {
            return;  
        }
        ModuleService.getModule(TeamModuleC).refreshTeamName(this._playerId, this._playerName);
    }

    /**当前绑定的玩家id */
    @mw.Property({ replicated: true, onChanged: "client_call_pId" })
    private _playerId: number = 0;
    public get getPlayerId() {
        return this._playerId;
    }
    /**观战用key */
    private watchGuid: string = "";
    private client_call_pId() {
        oTrace('guan log client_call_pId');
        PlayerSync.PlayerSyncMap_Client.set(this._playerId, this);
        this.initClient();
        this.refreshName();
    }

    /**客户端初始化 */
    async initClient() {
        oTrace('guan log initClient this._playerId', this._playerId, "_petId", this._petId);
        if (this._playerId == 0) return;
        let localPlayer = await mw.Player.asyncGetLocalPlayer();
        this._isSelf = this._playerId == localPlayer.playerId;
        if (this._isSelf) return;//不向观战列表添加自己

        let p = await Player.asyncGetPlayer(this._playerId);
        if (!p) return;
        await p.character.asyncReady();

        this.watchGuid = p.character.gameObjectId;
        CameraUtil.addWatchObj(this.watchGuid, p.character.displayName)//向参与游戏的玩家的数组加一条数据

    }
    /**开始销毁 */
    private _beginDeatroy: boolean = false;
    @RemoteFunction(mw.Server)
    public prepareDestroy() {
        this._beginDeatroy = true;
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        if (PlayerSync.PlayerSyncMap_Client.has(this._playerId)) {
            PlayerSync.PlayerSyncMap_Client.delete(this._playerId);
        }

        if (this.isRunningClient()) {
            this.removeWatchObj();
        }
    }

    @mw.Property({ replicated: true, onChanged: "client_call_playerState" })
    private _playerState: EPlayerStateType = EPlayerStateType.Normal;
    private client_call_playerState() {
        oTrace('guan log client_call_playerState', this._playerState);
        switch (this._playerState) {
            case EPlayerStateType.Normal:
                this.addWatchObj();
                break;
            case EPlayerStateType.Win:
                if (this._isSelf) {
                    Event.dispatchToLocal(GameEventC2C.GAME_PLAYER_WIN_C2C)
                }
                this.removeWatchObj();
                break;
            case EPlayerStateType.Lose:
                this.removeWatchObj();
                break;

            default:
                break;
        }
    }

    // 添加观战对象
    private addWatchObj() {
        // 不处理自己
        if (this._isSelf) return;
        let char = Player.getPlayer(this._playerId).character;
        if (!char) return
        if (this.watchGuid == "") {
            this.watchGuid = char.gameObjectId;
        }
        CameraUtil.addWatchObj(this.watchGuid, char.displayName)//向参与游戏的玩家的数组加一条数据
    }
    // 移除观战对象
    private removeWatchObj() {
        // 不处理自己
        if (this._isSelf) return;
        if (this.watchGuid == "") {
            let char = Player.getPlayer(this._playerId).character;
            if (!char) return
            this.watchGuid = char.gameObjectId;
        }
        CameraUtil.removeWatchObj(this.watchGuid);
    }
    public get getPlayerState() {
        return this._playerState;
    }

    @RemoteFunction(mw.Server)
    public win(levelEndCount: number) {
        this._playerState = EPlayerStateType.Win;
        oTrace('guan log win');
        if (levelEndCount == 0) {
            this._firstRoundWin = true;
        } else if (levelEndCount == 1) {
            this._secondRoundWin = true;
        }
    }

    @RemoteFunction(mw.Server)
    // 只有没赢就输了
    public calculate() {
        if (this._playerState != EPlayerStateType.Win) {
            this._playerState = EPlayerStateType.Lose;
        }
    }

    @RemoteFunction(mw.Server)
    // 只修改没输的
    public levelStart() {
        if (this._playerState != EPlayerStateType.Lose) {
            this._playerState = EPlayerStateType.Normal;
        }
    }

    @mw.Property({ replicated: true })
    private _firstRoundWin: boolean = false;
    public get getFirstRoundWin() {
        return this._firstRoundWin;
    }
    @mw.Property({ replicated: true })
    private _secondRoundWin: boolean = false;
    public get getSecondRoundWin() {
        return this._secondRoundWin;
    }

    @mw.Property({ replicated: true })
    private _leaderId: string = "0";

    public get LeaderId() {
        return this._leaderId;
    }

    @mw.Property({ replicated: true })
    private _teamState: PlayerTeamStateType = PlayerTeamStateType.Normal;

    public playerAddTeam(leaderId: string) {
        this._teamState = PlayerTeamStateType.InTeam;
        this._leaderId = leaderId;
    }
}