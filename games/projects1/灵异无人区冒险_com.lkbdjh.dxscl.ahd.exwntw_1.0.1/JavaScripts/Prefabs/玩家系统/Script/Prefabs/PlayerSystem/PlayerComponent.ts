import { SpawnManager, SpawnInfo, } from '../../../../../Modified027Editor/ModifiedSpawn';
/*
 * @Description: Description
 */

import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";;
import { PlayerSystem } from "./PlayerSystem";
import UIPlayerInfo from "./UIPlayerInfo";
import UIPlayerHpSlider from "./UIPlayerSlider";

abstract class PlayerComPreDef extends mw.Script {
    protected abstract reqInit();
}

abstract class PlayerComData extends PlayerComPreDef {

    @mw.Property({ replicated: true, onChanged: "onSelfGuidChange" })
    public selfGuid: string = "";

    @mw.Property({ replicated: true })
    public relifeTime: number = 0;

    public get attack(): number {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.Attack);
    }

    public set attack(_attack: number) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _attack, PrefabEvent.AttrType.Attack);
    }

    public get def(): number {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.Def);
    }

    public set def(_def: number) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _def, PrefabEvent.AttrType.Def);
    }

    public get maxHp(): number {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.MaxHp);
    }

    public set maxHp(_maxHp: number) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _maxHp, PrefabEvent.AttrType.MaxHp);
    }

    public get level(): number {
        return PrefabEvent.PrefabEvtPlayerInfo.getPlayerInfo(this.selfGuid, PrefabEvent.PlayerInfoType.Level);
    }

    public set level(_level: number) {
        PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(this.selfGuid, this.selfGuid, _level, PrefabEvent.PlayerInfoType.Level);
    }

    public get hp(): number {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.CurHp);
    }

    public set hp(_hp: number) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _hp, PrefabEvent.AttrType.CurHp);
    }

    public get isInvincible(): boolean {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.IsInvincible) != 0;
    }

    public set isInvincible(value: boolean) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, value ? 1 : 0, PrefabEvent.AttrType.IsInvincible);
    }

    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isClient()) {



        }

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

    }
}

abstract class PlayerComClient extends PlayerComData {

    private _hpSlider: mw.UIWidget;
    private _ui: UIPlayerHpSlider;
    private slotGoList: mw.GameObject[] = [];

    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isClient()) {

            PrefabEvent.PrefabEvtAttr.onChangeAttrVal((senderGuid, targetGuid, val, type) => {

                //console.log("onChangeAttrVal : " + type + " => " + val)
                if (type == PrefabEvent.AttrType.CurHp || type == PrefabEvent.AttrType.MaxHp) {
                    this.onHpChange();
                }

            })

            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid, targetGuid, val, type) => {

                if (type == PrefabEvent.PlayerInfoType.Level) {
                    this.onLevelChange();
                }

            })
            mw.UIService.show(UIPlayerInfo)

        }
    }

    private async onHpChange() {
        const player = await Player.asyncGetLocalPlayer();
        if (this.selfGuid == player.character.gameObjectId) {
            console.log("生命：" + this.hp + ":" + this.maxHp)
            mw.UIService.getUI(UIPlayerInfo).updateHp(this.hp, this.maxHp);
        }
        if (this._ui) {
            this._ui.updateHp(this.hp, this.maxHp);
        }
    }

    private async onSelfGuidChange() {
        this.newHpSlider(this.selfGuid, this.hp, this.maxHp);
        const player = await Player.asyncGetLocalPlayer();
        if (this.selfGuid == player.character.gameObjectId) {
            console.log("showPlayerUI");

            // PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
            ModuleService.ready().then(() => {
                this.reqInit();
            })
            this.onHpChange();
            this.onLevelChange();
        }
        if (this._ui) {
            this._ui.updateHp(this.hp, this.maxHp);
        }
    }

    private onLevelChange() {

        if (this.selfGuid == Player.localPlayer.character.gameObjectId) {
            mw.UIService.getUI(UIPlayerInfo).setLevel(this.level);
            if (this._ui) {
                this._ui.updateLevel(this.level);
            }
        }

    }

    @RemoteFunction(mw.Multicast, mw.Client)
    protected setPlayerInfo(charGuid: string, level: number, hp: number, maxHp: number) {
        if (charGuid == Player.localPlayer.character.gameObjectId) {
            this.level = level;
            mw.UIService.getUI(UIPlayerInfo).setLevel(this.level);
            mw.UIService.getUI(UIPlayerInfo).updateHp(hp, maxHp);
        }
    }

    @RemoteFunction(mw.Multicast, mw.Client)
    protected async newHpSlider(charGuid: string, hp: number, maxHp: number) {
        const intervalId = setInterval(() => {
            if (!PlayerSystem.instance) {
                return;
            }
            if (!PlayerSystem.instance.showHeadHpSlider) {
                return;
            }

            clearInterval(intervalId);
            if (this._hpSlider != null) return;

            const handle = setInterval(async () => {
                let char = await GameObject.asyncFindGameObjectById(charGuid) as mw.Character;
                if (char == null) return;
                clearInterval(handle);
                if (this._hpSlider) return;
                this._hpSlider = await SpawnManager.asyncSpawn({ guid: "16037", replicates: false }) as mw.UIWidget;
                if (charGuid == Player.localPlayer.character.gameObjectId) {
                    return
                }
                this._ui = mw.UIService.create(UIPlayerHpSlider);
                this._ui.setVisible(true);
                this._ui.init(charGuid, maxHp, hp, this._hpSlider, this.level);
                this._hpSlider.setTargetUIWidget(this._ui.uiWidgetBase);
                this._hpSlider.drawSize = new mw.Vector2(405, 300);
                this._hpSlider.parent = char;
                this._hpSlider.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
                this._hpSlider.localTransform.position = (new mw.Vector(0, 0, 90));
            }, 300);
        }, 200)

    }

    onDestroy() {
        if (mw.SystemUtil.isClient()) {
            if (this._hpSlider) {
                this._hpSlider.parent = null;
                this._hpSlider.destroy();
            }
            this._ui?.destroy();
        }
    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isClient()) {

        }

    }
}

@Component
export default class PlayerComServer extends PlayerComClient {

    private _onEvt: mw.EventListener[] = [];
    private _char: mw.Character = null;

    @RemoteFunction(mw.Server)
    protected async reqInit() {

        console.log("playerComServer Init Begin");

        this._char = await GameObject.asyncFindGameObjectById(this.selfGuid) as mw.Character;
        await this._char.asyncReady();
        //设置初始属性
        this.attack = PlayerSystem.instance.attack;
        this.def = PlayerSystem.instance.def;
        this.maxHp = PlayerSystem.instance.maxHp;
        this.hp = PlayerSystem.instance.maxHp;
        this.relifeTime = PlayerSystem.instance.relifeTime;
        console.log("初始化角色 : " + this.selfGuid);
        this.newHpSlider(this.selfGuid, this.hp, this.maxHp);

        // 初始化数据
        this.init(this._char.player.userId, this.selfGuid);

         //放背景音乐
         mw.SoundService.playBGM(PlayerSystem.instance.bgm);

        this._onEvt.push(PrefabEvent.PrefabEvtFight.onHit((senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.hurt(senderGuid, damage);
        }));

        this._onEvt.push(PrefabEvent.PrefabEvtFight.onHurt((senderGuid: string, targetGuid: string, damage: number) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.hurt(senderGuid, damage);
        }));

        this._onEvt.push(PrefabEvent.PrefabEvtFight.onCure((senderGuid: string, targetGuid: string, cureVal: number) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.cure(senderGuid, cureVal);
        }));
        PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
    }

    protected onStart() {

        super.onStart();

        if (mw.SystemUtil.isServer()) {
        }
    }

    private async init(playerId: string, charGuid: string) {

        let level = PrefabEvent.PrefabEvtPlayerInfo.getPlayerInfo(charGuid, PrefabEvent.PlayerInfoType.Level);
        if (!level) {
            level = 1;
            PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(charGuid, charGuid, level, PrefabEvent.PlayerInfoType.Level);
        }
        this.level = level;
        this.setPlayerInfo(charGuid, this.level, this.hp, this.maxHp);

    }

    /**
     * 伤害
     * @param senderGuid 
     * @param damage 
     */
    private hurt(senderGuid: string, damage: number) {
        if (this.hp <= 0) return;
        if (this.isInvincible) return;

        this.hp = this.hp - damage;

        if (this.hp <= 0) {
            this.hp = 0;
            this.setDie();
        }
    }

    /**
     * 治疗
     * @param senderGuid 
     * @param cureVal 
     */
    private cure(senderGuid: string, cureVal: number) {
        this.hp += cureVal;
        if (this.hp >= this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    /**
     * 设置死亡
     * @returns 
     */
    private setDie() {
        if (this._char.ragdollEnabled == true) return;

        this._char.ragdollEnabled = true;
        PrefabEvent.PrefabEvtFight.die(this.selfGuid);

        setTimeout(() => {

            if (PlayerSystem.instance && PlayerSystem.instance.reviveToCheckPoint) {
                console.log("玩家死了");
                PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
            } else {
                PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.selfGuid, 0);
            }

            setTimeout(() => {

                this.hp = this.maxHp;
                this._char.ragdollEnabled = false;
                PrefabEvent.PrefabEvtFight.revive(this._char.gameObjectId);

            }, 1000);

        }, this.relifeTime * 1000);
    }

    onDestroy() {
        super.onDestroy();
        this._onEvt.forEach(e => {
            e.disconnect();
        })
        this._onEvt = null;

    }

    protected onUpdate(dt: number) {

        super.onUpdate(dt);

        if (mw.SystemUtil.isServer()) {

        }

    }


}