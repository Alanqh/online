import { PlayerManagerExtesion, } from '../../../../../Modified027Editor/ModifiedPlayer';
/*
 * @Description: Description
 */
/** 
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 浮华浪蕊
 * UI: UI/UIRoot.ui
 * TIME: 2022.11.23-16.34.07
 */

import PlayerInfo_Generate from "../../../../../ui-generate/Prefabs/玩家系统/UI/PlayerInfo_generate";
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";;


export default class UIPlayerInfo extends PlayerInfo_Generate {

    private _handle: boolean;

    private _maxHp: number;
    private _curHp: number;

    private _warnningHp: boolean = false;
    private _warnningCurTime = 0;
    private _warnningCount = 1;
    val: number;
    to: number;
    curProgress: number;
    rate: number;
    private _maxStage: number = 0;

    async onStart() {

        this.canUpdate = true;

        PrefabEvent.PrefabEvtFight.onHurt(((senderGuid: string, targetGuid: string, damage: number) => {
            if (targetGuid == Player.localPlayer.character.gameObjectId) {
                if (PrefabEvent.PrefabEvtAttr.getAttrVal(targetGuid, PrefabEvent.AttrType.IsInvincible) == 1) {
                    return;
                }
                if (this._warnningHp) {
                    return;
                }

                this._warnningHp = true;
                this.deathImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.deathImg.renderOpacity = 0;

                this._warnningCurTime = 0;
                this._warnningCount = 1;

            }
        }).bind(this))

        PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo(async (senderGuid: string, targetGuid: string, val: number, type: PrefabEvent.PlayerInfoType) => {

            let go = await GameObject.asyncFindGameObjectById(targetGuid);
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (go.player.playerId == Player.localPlayer.playerId) {

                    if (type == PrefabEvent.PlayerInfoType.Level) {
                        this.labelLv.text = "Lv." + val;
                    }

                }
            }

        })
        PrefabEvent.PrefabEvtRecordPoint.onSetRecordPoint(async (senderGuid: string, targetGuid: string, stage: number) => {

            let go = await GameObject.asyncFindGameObjectById(targetGuid);
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (go.player.playerId == Player.localPlayer.playerId) {

                    this.labelStage.text = "关卡:" + (stage);

                    this.progressStage.currentValue = (stage) / this._maxStage;

                }
            }

        })

        let curPlayer = await Player.asyncGetLocalPlayer();

        this.btnJump && this.btnJump.onPressed.add(() => {
            curPlayer.character.jump();
        })

        this.btnAtlas.onClicked.add(() => {
            PrefabEvent.PrefabEvtCollection.openCollectionUI();
        })

        this.btnRank.onClicked.add(() => {
            PrefabEvent.PrefabEvtRank.openRank();
        })

        mw.InputUtil.onKeyDown(mw.Keys.SpaceBar, () => {
            curPlayer.character.jump();
        })

        await ModuleService.ready();
        let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
        this.labelStage.text = "关卡:" + (stage);

        this.progressStage.currentValue = (stage) / this._maxStage;
    }

    /**
     * UI显示
     * @param maxStage 最大层数
     */
    onShow(maxStage: number) {
        this._maxStage = maxStage;
    }

    /**
     * 更新生命值
     * @param hp 当前生命值
     * @param maxhp 最大生命值
     */
    public updateHp(hp: number, maxhp: number) {
        console.error("更新生命值：" + hp + " : " + maxhp)
        this._curHp = hp;
        this._maxHp = maxhp;

        this.val = this.progresssHp.currentValue;
        this.to = this._curHp / this._maxHp;

        this.hpText.text = this._curHp + "/" + this._maxHp;

        this.curProgress = this.val;

        this.rate = Math.abs(this.curProgress - this.to) * 2;
        this._handle = true;
    }

    /**
     * 设置等级
     * @param lv 
     */
    public setLevel(lv: number) {
        this.labelLv.text = "Lv." + lv;
    }

    onUpdate(dt: number) {
        this.warningHp(dt);
        this.hpGradient(dt);
    }

    private hpGradient(dt: number) {
        if (!this._handle) {
            return;
        }

        if (Math.abs(this.curProgress - this.to) <= this.rate * dt) {
            this.progresssHp.currentValue = this.to;

            this._handle = false;
            return;
        }
        if (this.val < this.to) {
            this.curProgress += this.rate * dt;
        } else {
            this.curProgress -= this.rate * dt;
        }

        this.progresssHp.currentValue = this.curProgress;
    }

    private warningHp(dt: number) {
        if (this._warnningHp) {
            this._warnningCurTime += dt * 3;

            if (this._warnningCurTime >= 1) this._warnningCurTime == 1;

            if (this._warnningCount % 2 == 0) {
                this.deathImg.renderOpacity = 1 - this._warnningCurTime;
            } else {
                this.deathImg.renderOpacity = this._warnningCurTime;
            }

            if (this._warnningCurTime >= 1) {
                this._warnningCount++;
                this._warnningCurTime = 0;
                if (this._warnningCount >= 5) {
                    this._warnningHp = false;
                    this.deathImg.visibility = mw.SlateVisibility.Hidden;
                    return;
                }
            }
        }
    }
}