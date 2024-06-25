import { GameConfig } from "../../config/GameConfig";
import { Events_CS } from "../../const/enum";
import BagModuleS from "../Bag/BagModuleS";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import PropModuleC from "./PropModuleC";
import PropModuleData from "./PropModuleData";

export default class PropModuleS extends ModuleS<PropModuleC, PropModuleData> {

    /**背包模块 */
    private bagModuleS: BagModuleS;
    /**玩家模块 */
    private playerModuleS: PlayerModuleS;
    /**当装备规则相关道具时调用的事件 */
    public onEquipRuleProp: Action3<number, number, boolean> = new Action3();
    /**
     * 玩家当前装备的道具
     * key: playerId
     * value: 道具guid
     */
    public playCurEquiptMap: Map<number, GameObject> = new Map();

    protected onStart(): void {
        this.bagModuleS = ModuleService.getModule(BagModuleS);
        this.playerModuleS = ModuleService.getModule(PlayerModuleS);

        // 服务端通知所有客户端播放动画
        Event.addClientListener(Events_CS.PlayAnimEditor, (player, animConfId) => {
            // console.warn("playerId: " + player, "animConfId: " + animConfId);
            Event.dispatchToAllClient(Events_CS.PlayAnimEditor, player.playerId, animConfId);
        });
    }

    /**玩家退出游戏时，删除玩家装备的道具 */
    protected onPlayerLeft(player: mw.Player): void {
        try {
            let obj = this.playCurEquiptMap.get(player.playerId);
            if (obj) {
                GameObjPool.despawn(obj);
                obj.parent = null;
            }
            this.playCurEquiptMap.delete(player.playerId);
        } catch (error) {

        }

    }

    /**各个补给品对应的逻辑 */
    public useSupply(id: number, playerId: number) {

    }

    /**销毁所有玩家当前装备道具 */
    public destroyAllEquipObj() {
        this.playCurEquiptMap.forEach((value, key) => {
            if (value) {
                GameObjPool.despawn(value);
                value.parent = null;
            }
            value = null;
        })
    }

    /**销毁玩家当前装备道具 */
    public destroyEquipObj(playerId: number) {
        let obj = this.playCurEquiptMap.get(playerId);
        if (obj) {
            GameObjPool.despawn(obj);
            obj.parent = null;
        }
        this.playCurEquiptMap.set(playerId, null);
    }

    /**使用道具 */
    public useProp(playerId: number, propId: number) {
        this.getClient(playerId).net_useProp(propId);
    }


    // ------------------------ net方法 ------------------------

    /**
     * 加血
     * @param playerId 玩家id
     * @param addHp 加（或减）多少血
     * @param key 加血道具的key
     */
    @Decorator.noReply()
    public net_changeHp(playerId: number, addHp: number): void {
        this.playerModuleS.changeHp(playerId, addHp);
    }

    /** 
     * 装备或卸载规则相关道具发出的事件 
     * @param playerId 玩家id 
     * @param propId 道具id 
     * @param isEquip 是否是装备 
     */
    @Decorator.noReply()
    public net_equipRuleProp(playerId: number, propId: number, isEquip: boolean): void {
        this.onEquipRuleProp.call(playerId, propId, isEquip);
    }


    /**道具绑定到玩家插槽，同步给所有客户端 */
    public async net_attachToPlayer(propId: number, slot: HumanoidSlotType) {
        let player = this.currentPlayer;
        let propConf = GameConfig.Item.getElement(propId);
        let propObj = await GameObjPool.asyncSpawn(propConf.AssetID);
        (propObj as Model).setCollision(CollisionStatus.Off);
        let factionConf = GameConfig.Faction.getElement(propConf.FactionID[0]);
        player.character.attachToSlot(propObj, slot);
        // console.log(`玩家${playerId} 装备道具${propConf.Name}`);

        propObj.localTransform.position = factionConf.Offset[0];
        propObj.localTransform.rotation = new Rotation(factionConf.Offset[1]);
        propObj.localTransform.scale = factionConf.Offset[2];
        // 容错处理，如果玩家当前已经装备了道具，先销毁
        let oldPropObj = this.playCurEquiptMap.get(player.playerId);
        if (oldPropObj) {
            GameObjPool.despawn(oldPropObj);
            oldPropObj.parent = null;
        }
        // 保存当前装备的道具信息
        this.playCurEquiptMap.set(player.playerId, propObj);
        return propObj.gameObjectId;

        // this.getAllClient().net_attachToPlayer(playerId, propId, slot);
    }

    /**销毁玩家当前装备的道具，同步给所有客户端 */
    @Decorator.noReply()
    public net_destroyProp(): void {
        let obj = this.playCurEquiptMap.get(this.currentPlayerId);
        try {
            if (obj) {
                GameObjPool.despawn(obj);
                obj.parent = null;
            }
        } catch (error) {
        }
        this.playCurEquiptMap.set(this.currentPlayerId, null);
    }

    /**播放动画 */
    @Decorator.noReply()
    public net_playAnim(playerId: number, animConfId: number): void {
        this.getAllClient().net_playAnim(playerId, animConfId);
    }

    /**停止播放动画 */
    @Decorator.noReply()
    public net_stopAnim(playerId: number): void {
        this.getAllClient().net_stopAnim(playerId);
    }

    /**拾取补给品 */
    @Decorator.noReply()
    public net_pickUpSupply(propId: number, playerId: number) {
        this.useSupply(propId, playerId);
    }

    /**在装备的道具上播特效 */
    @Decorator.noReply()
    public net_playEffectOnEquipObj(effectGuid: string): void {
        let objGuid = this.playCurEquiptMap.get(this.currentPlayerId)?.gameObjectId;
        this.getAllClient().net_playEffectOnEquipObj(objGuid, effectGuid, this.currentPlayerId);
    }
}