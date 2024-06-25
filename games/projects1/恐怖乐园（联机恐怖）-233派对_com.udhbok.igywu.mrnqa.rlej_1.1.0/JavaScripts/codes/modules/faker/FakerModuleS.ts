/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-17 10:47:53
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-20 16:09:16
 * @FilePath: \1001_hall\JavaScripts\codes\modules\faker\FakerModuleS.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import ExGuideData from "../../guide/ExGuideData";
import FakerModuleC from "./FakerModuleC";
import FakerScript from "./FakerScript";

export default class FakerModuleS extends ModuleS<FakerModuleC, null> {

    /**当前伪人数量 */
    public fakerCount: number = 0;

    /**保存伪人解密点 */
    private decryptPoint: Transform[] = [];

    /**开始随机倒计时 */
    private _randomCountDown: number = 30;
    /**随机出来的生成时间 */
    private _createTime: number = 0
    /**累计的生成次数 */
    private _createCount: number = 1;

    public playerList: Player[] = [];

    protected onStart(): void {
        Event.addLocalListener("evt_plaayerBackMainMenu", (player: mw.Player) => {
            this.removePlayer(player)
        })

    }

    protected onPlayerLeft(player: mw.Player): void {
        this.removePlayer(player)
    }

    private randomCreateTime() {
        // let rangeMax = GameConfig.Global.Alternate.array1d[1] * this._createCount * 60;//计算随机时间范围最大值
        // let rangeMin = GameConfig.Global.Alternate.array1d[1] * (this._createCount - 1);//计算随机时间范围最小值
        this._createTime = MathUtil.randomFloat(0, GameConfig.Global.Alternate.array1d[1] * 60);//随机一个怪物生成时间
        // this._randomCountDown = rangeMax;
    }

    public async createFaker() {
        if (this.fakerCount == GameConfig.Global.Alternate.array1d[0]) {
            console.log("伪人数量已达上限");
            return
        }
        let locations = GameConfig.Global.Alternate.locations
        if (!locations || locations.length == 0) return;//没有配置生成点 不生成
        if (this.playerList.length == 0) return;//没有准备就绪的玩家就不生成伪人

        let location = locations[MathUtil.randomInt(0, locations.length)]
        let char = await GameObject.asyncSpawn("Character") as Character;
        char.worldTransform.position = location;
        char.addComponent(FakerScript);
        this._randomCountDown = GameConfig.Global.Alternate.array1d[1] * 60;
        this._createCount++;
        this.fakerCount++;
    }

    public savePoint(point: Transform) {
        this.decryptPoint.push(point)
    }

    public getPoint() {
        return this.decryptPoint[MathUtil.randomInt(0, this.decryptPoint.length)]
    }

    public deleteFaker(gameObjectId: string) {
        this.fakerCount--;
        this.getAllClient().net_deleteFaker(gameObjectId)
    }

    public removePlayer(player: mw.Player) {
        let index = this.playerList.findIndex(p => p.playerId == player.playerId)
        if (-1 != index) {
            this.playerList.splice(index, 1);
        }
    }

    public getReadyPlayer() {
        return this.playerList[MathUtil.randomInt(0, this.playerList.length)]
    }

    public playerIsEnable(player: mw.Player) {
        if (!player || !player.character || player.character.isDestroyed) return false;
        return this.playerList.findIndex(p => p.playerId == player.playerId) !== -1
    }

    @Decorator.noReply()
    public net_playerReady(_playerId: number) {
        let curPlayer = Player.getPlayer(_playerId)
        if (!curPlayer || !curPlayer.character) return
        let guidStage = DataCenterS.getData(curPlayer, ExGuideData).guideStage ?? 0;
        let index = this.playerList.findIndex(p => p.playerId == curPlayer.playerId);
        if (index == -1) {
            if (GameStart.GameTheme == EGameTheme.Hall && guidStage >= 6) {//如果是大厅引导完成了才刷伪人
                this.playerList.push(curPlayer)
            } else {
                this.playerList.push(curPlayer)
            }
        }
    }

    /**
     * 警告发现伪人
     * @param gameObjectId 
     * @param fakerStr 
     */
    @Decorator.noReply()
    public net_warnFaker(gameObjectId: string, fakerStr: string) {
        this.getAllClient().net_findFaker(gameObjectId);
        GameObject.asyncFindGameObjectById(gameObjectId).then((value: mw.GameObject) => {
            let char = value as Character;
            if (char && !char.player) {
                char.getComponent(FakerScript).setFindState(true);
                TimeUtil.delaySecond(1.5).then(() => {
                    Event.dispatchToAllClient("Bubble_ClientMsg", gameObjectId, fakerStr, 0);
                })
            }
        })
    }

    /**弹幕通知客户端伪人被消除 */
    public notifyFakerBeCleaned(name: string, text: string, type: number) {
        this.getAllClient().net_fakerBeCleaned(name, text, type)
    }

    protected onUpdate(dt: number): void {
        // if (GameStart.GameTheme == EGameTheme.Hall) return
        if (!GameConfig.Global.Alternate.array1d) return;
        if (this.fakerCount >= GameConfig.Global.Alternate.array1d[0]) return;
        this._randomCountDown -= dt
        if (this._randomCountDown <= 0) {
            this.randomCreateTime()
        }

        if (this._createTime > 0) {
            this._createTime -= dt
            if (this._createTime <= 0) {
                this.createFaker()
            }
        }
    }

}