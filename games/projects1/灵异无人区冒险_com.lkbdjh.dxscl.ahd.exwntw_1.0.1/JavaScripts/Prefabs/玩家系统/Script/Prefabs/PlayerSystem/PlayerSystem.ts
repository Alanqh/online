import { PlayerManagerExtesion, } from '../../../../../Modified027Editor/ModifiedPlayer';
/*

 * @Date: 2023-06-25 15:23:28

 * @LastEditTime: 2023-09-12 13:44:11
 * @FilePath: \commonprefab\JavaScripts\Prefabs\玩家系统\Script\Prefabs\PlayerSystem\PlayerSystem.ts
 * @Description: 
 */
/*
 * @Description: Description
 */

import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent"; import { PrefabReport } from '../../../../../prefabEvent/PrefabReport';
;
import PlayerComServer from "./PlayerComponent";
import UIPlayerInfo from "./UIPlayerInfo";

export namespace PlayerSystem {

    export var instance: PlayerSystemServer = null;

}

/**
 * 角色系统
 */
export abstract class PlayerSystemPreDef extends mw.Script {

    protected abstract initPlayerName(playerId: number, name: string);
}

export abstract class PlayerSystemClient extends PlayerSystemPreDef {

    @mw.Property({ displayName: "最大关卡数(请配置最大关卡数)", group: "玩家属性配置" })
    public maxStage: number = 1;

    @mw.Property({ displayName: "出生点/检查点复活(勾选是检查点)", group: "玩家属性配置" })
    public reviveToCheckPoint: boolean = true;

    @mw.Property({ displayName: "是否显示头顶血条", group: "玩家属性配置" })
    public showHeadHpSlider: boolean = true;

    @mw.Property({ displayName: "最大血量", group: "玩家属性配置" })
    public maxHp: number = 100;

    @mw.Property({ displayName: "默认防御力", group: "玩家属性配置" })
    public def: number = 0;

    @mw.Property({ displayName: "默认攻击力", group: "玩家属性配置" })
    public attack: number = 0;

    @mw.Property({ displayName: "复活时间", group: "玩家属性配置" })
    public relifeTime: number = 3;

    @mw.Property({ displayName: "默认关卡", group: "玩家属性配置" })
    public defaultStage: number = 1;

    @Property({ displayName: "默认速度", group: "玩家属性配置" })
    public speed = 1000;
    @Property({ displayName: "默认跳跃力", group: "玩家属性配置" })
    public jump = 200;

    @Property({ displayName: "背景音乐", group: "玩家属性配置" })
    public bgm: string = "121746" ;
    
    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isClient()) {
            // mw.UIService.show(UIPlayerInfo, this.maxStage);
            setTimeout(() => {
                Player.asyncGetLocalPlayer().then(player => {
                    let name = mw.AccountService.getNickName();
                    const char = player.character;
                    char.asyncReady().then(() => {
                        if (!name) {
                            name = "MWTest_" + char.player.playerId;
                        }
                        char.displayName = name;
                        this.initPlayerName(char.player.playerId, char.displayName);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.speed, PrefabEvent.AttrType.Speed);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.jump, PrefabEvent.AttrType.Jump);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.def, PrefabEvent.AttrType.Def);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.attack, PrefabEvent.AttrType.Attack);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.maxHp, PrefabEvent.AttrType.MaxHp);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.maxHp, PrefabEvent.AttrType.CurHp);
                    })
                })
            }, 1000);

        }

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isClient()) {

        }

    }

}

@Component
export default class PlayerSystemServer extends PlayerSystemClient {
    @mw.Property({ displayName: "本地存储" })
    public isLocalSave: boolean = true;

    private _cacheScript: Map<number, PlayerComServer> = new Map();

    private playerNum: number = 0;

    @PrefabReport(17)
    protected onStart() {

        PlayerSystem.instance = this;

        super.onStart();

        if (mw.SystemUtil.isServer()) {

            Player.onPlayerJoin.add(async (player: mw.Player) => {
                if (SystemUtil.isPIE && this.isLocalSave) {
                    let playerId = this.playerNum++;
                    player["getUserSystemId"] = () => {
                        return playerId + "";
                    }
                }
                let char = await player.character.asyncReady();
                let script = await mw.Script.spawnScript(PlayerComServer, true);
                //TODO:这里不能直接挂角色上
                //script.gameObject = this.gameObject;
                //通过guid绑定角色
                script.selfGuid = char.gameObjectId;
                this._cacheScript.set(player.playerId, script);

            })

            Player.onPlayerLeave.add((player: mw.Player) => {
                let playerId = player.playerId;
                if (this._cacheScript.has(playerId)) {
                    this._cacheScript.get(playerId).destroy();
                    this._cacheScript.delete(playerId);
                }

            })

            PrefabEvent.PrefabEvtRecordPoint.onBackCurrentRecordPoint(async (senderGuid: string) => {
                await ModuleService.ready();
                let go = await GameObject.asyncFindGameObjectById(senderGuid);
                if (!(PlayerManagerExtesion.isCharacter(go))) return;
                let char = go as mw.Character;

                let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(char.gameObjectId);//await PrefabEvent.DBServerTool.asyncGetValue<number>(char.player.getUserSystemId(), PrefabEvent.PrefabEvtRecordPoint.name);
                if (!stage) {
                    stage = this.defaultStage;
                    //PrefabEvent.PrefabEvtRecordPoint.setRecordPoint(char.guid, char.guid, stage);
                }
                console.log("期望回到的记录点" + stage);

                PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(senderGuid, stage);

            })

        }

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isServer()) {

        }

    }

    /**
     * 初始化玩家名字
     * @param playerId 玩家ID
     * @param name 名字
     */
    @RemoteFunction(mw.Server)
    protected initPlayerName(playerId: number, name: string) {
        const char = Player.getPlayer(playerId).character;
        char.displayName = name;
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(guid, guid, name, PrefabEvent.PlayerInfoType.Name);
    }
}