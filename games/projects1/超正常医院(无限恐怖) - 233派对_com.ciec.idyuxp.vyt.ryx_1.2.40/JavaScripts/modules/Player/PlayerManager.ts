import { oTraceError } from "odin";
import { Singleton } from "../../utils/uitls";

interface IPlayerTmpData {
    /**玩家坐标缓存 */
    tmpLoc: mw.Vector;
    /**上次获取数据时的时间戳 */
    getTimeStamp: number;
}

@Singleton()
export class PlayerManager {
    public static instance: PlayerManager;

    private _mapPlayer: Map<number, IPlayerTmpData> = new Map();
    // 玩家transform
    private _transform: mw.Transform = null;
    //

    // 当前玩家
    private _currentPlayer: mw.Player = null;

    /**添加玩家缓存 */
    public addPlayer(pId: number) {
        if (this._mapPlayer.has(pId)) {
            return;
        }
        let player = Player.getPlayer(pId);
        if (player == null) {
            oTraceError("===PlayerManager:addPlayer ", pId);
            return;
        }

        let tmpVector = mw.Vector.zero;

        let charaLoc = player.character.worldTransform.position;

        let tmpData: IPlayerTmpData = {
            tmpLoc: tmpVector,
            getTimeStamp: Date.now()
        }

        tmpVector.x = charaLoc.x;
        tmpVector.y = charaLoc.y;
        tmpVector.z = charaLoc.z;

        this._mapPlayer.set(pId, tmpData);
    }

    /**移除玩家缓存 */
    public removePlayer(pId: number) {
        if (this._mapPlayer.has(pId) == false) {
            return;
        }

        this._mapPlayer.delete(pId);
    }

    /**
     * 更新玩家位置
     * @param pId 玩家id
     * @param loc 更新坐标 可以为空 会主动获取下玩家当前坐标
     * @returns 
     */
    public updatePlayerLoc(pId: number = null, loc: mw.Vector = null) {
        let player: mw.Player = null;
        if (pId == null && SystemUtil.isClient()) {
            player = Player.localPlayer;
            pId = player.playerId;
        } else {
            player = Player.getPlayer(pId);
        }

        if (player == null) {
            return null;
        }

        if (player.character == null) {
            return null;
        }
        if (this._mapPlayer.has(pId) == false) {
            this.addPlayer(pId);
        }

        let data = this._mapPlayer.get(pId);

        let charaLoc = loc;
        if (charaLoc == null) {
            charaLoc = player.character.worldTransform.position;
        }

        data.getTimeStamp = Date.now();
        data.tmpLoc.x = charaLoc.x;
        data.tmpLoc.y = charaLoc.y;
        data.tmpLoc.z = charaLoc.z;

    }


    /**
     * 获取玩家坐标
     * @param 注意：适用于 玩家体感不敏感功能，使用坐标进行计算（比如 距离校验 播放声音特效），涉及设置玩家坐标计算不要使用
     * @param 注意：如果玩家被传送位置，注意 调用updatePlayerLoc 更新玩家缓存
     * @param pId 玩家id  如果为空，则默认为客户端当前玩家
     * @returns 返回玩家坐标  可能为空自行判断
     */
    public getPlayerLoc(pId: number = null) {
        let player: mw.Player = null;
        if (pId == null && SystemUtil.isClient()) {
            player = Player.localPlayer;
            pId = player.playerId;
        } else {
            player = Player.getPlayer(pId);
        }

        if (player == null) {
            return null;
        }

        if (player.character == null) {
            return null;
        }

        if (this._mapPlayer.has(pId) == false) {
            this.addPlayer(pId);
        }

        let data = this._mapPlayer.get(pId);

        let intervalTime = Date.now() - data.getTimeStamp;

        if (intervalTime < 0.1 * 1000) {
            return data.tmpLoc;
        } else {

            // 刷新
            data.getTimeStamp = Date.now();

            let charaLoc = player.character.worldTransform.position;

            data.tmpLoc.x = charaLoc.x;
            data.tmpLoc.y = charaLoc.y;
            data.tmpLoc.z = charaLoc.z;

            return data.tmpLoc;
        }
    }

    update(dt: number) {
        this.updateTransform();
        this.loadingUpdate(dt);
    }

    /**
     * loading update
     */
    private loadingUpdate(dt: number) {
        // Loading.onUpdate(dt);
    }

    /**
     * 玩家transform update
     */
    private updateTransform() {
        
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        if (this._currentPlayer == null || this._currentPlayer.character == null) return;
        this._transform = this._currentPlayer.character.worldTransform;
    }

    /**
     * 获取玩家transform
     */
    public getPlayerTransform(): mw.Transform {
        return this._transform;
    }

    public get isStart() {
        return this._currentPlayer != null;
    }


    /**
     * 客户端获取玩家
     */
    public get currentPlayer() {
        if (SystemUtil.isServer()) return null;
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        return this._currentPlayer;
    }

    /**
     * 客户端获取玩家ID
     */
    public get currentPlayerId() {
        if (SystemUtil.isServer()) return null;
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        if (this.currentPlayer == null) return null;
        return this._currentPlayer.playerId;
    }
}