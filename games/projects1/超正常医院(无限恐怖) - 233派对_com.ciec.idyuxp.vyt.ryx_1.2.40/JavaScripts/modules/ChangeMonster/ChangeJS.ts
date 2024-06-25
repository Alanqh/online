import { GameConfig } from "../../config/GameConfig";
import { IMonstersElement } from "../../config/Monsters";
import { GlobalData } from "../../const/GlobalData";
import { Events_CS, PlayerCurState, PlayerRace } from "../../const/enum";
import { EffectManager } from "../../utils/EffectManager";
import { SoundManager } from "../../utils/SoundManager";
import { P_GlobalTips } from "../../utils/UI/P_GlobalTips";
import { utils } from "../../utils/uitls";
import BagModuleC from "../Bag/BagModuleC";
import P_PropBar from "../Bag/P_PropBar";
import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import { P_HUD } from "../GameHud/UI/P_HUD";
import { P_Warning } from "../GameHud/UI/P_Warning";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { SceneUnitModuleC } from "../SceneUnitModule/SceneUnitModuleC";
import { NpcTrigger } from "../SceneUnitModule/Tool/NpcTrigger";
import { SportModuleC } from "../Sport/SportModuleC";
import { MonsterChangeC } from "./MonsterChangeC";
import { P_RulesTips } from "../Player/UI/P_RulesTips";
import P_Bag from "../Bag/P_Bag";
import P_DressMain from "../DressUp/UI/P_DressMain";
import P_SelfDress from "../DressUp/UI/P_SelfDress";
import DressUpModuleC from "../DressUp/DressUpModuleC";
enum EState {
    /**无 */
    None,
    /**正常待机*/
    Idle,
    /**跳*/
    jump,
    run
}
@Component
export default class ChangeJS extends Script {

    @Property({ replicated: true, multicast: true, onChanged: "onOwnerIdChange" })
    private ownerId: number = 0;
    /**击杀人数 */
    @Property({ replicated: true, multicast: true, onChanged: "onKillCountChange" })
    private _killCount: number = 0;

    @Property({ replicated: true, multicast: true })
    public cfgID: number = 0;

    private checkTime: number = 4;


    public get killCount(): number {
        return this._killCount;
    }
    /**变身脚本 */
    public static changeJSArr: ChangeJS[] = [];

    public get OwnerID(): number {
        return this.ownerId;
    }


    protected onStart(): void {

        if (SystemUtil.isServer()) {
            this.playerMS = ModuleService.getModule(PlayerModuleS);

            //变身怪 放下玩家事件
            Event.addLocalListener(Events_CS.ShowMonsterDropPlayer, (isShow: boolean, playerId: number) => {
                if (this.ownerId != playerId) return;

            });

        }

        if (SystemUtil.isClient()) {

            Player.asyncGetLocalPlayer().then((player) => {
                this.curPlayerId = player.playerId;
            });
            ChangeJS.changeJSArr.push(this);
        }

    }

    protected onDestroy(): void {
        if (this.ownerId == 0) return;
        if (SystemUtil.isServer()) {
        }

        if (SystemUtil.isClient()) {
            let index = ChangeJS.changeJSArr.indexOf(this);
            if (index != -1) {
                ChangeJS.changeJSArr.splice(index, 1);
            }
        }
    }
    private time: number = 0;
    protected onUpdate(dt: number): void {
        if (this.ownerId == 0) return;
        if (SystemUtil.isClient()) {
            //C
            this.updateDfState();
        } else {
            //S 
            this.time += dt;
            if (this.time < this.checkTime) return;
            this.time = 0;
            if (this.dropTimeOut) return;
            let targets = checkNpcByAngle(this.owner.character, this.cfg.TrackDis, this.cfgID);
            if (targets.length == 0) return;
            targets.forEach((player) => {
                this.findPlayer(player);
            });
        }
    }


    private cfg: IMonstersElement = null;


    //#region  S  端  ********************

    private owner: Player = null;
    private dropTimeOut: any = null;
    private changeSmallTime: any = null;
    private playerMS: PlayerModuleS = null;

    /**变身 */
    public change(cfgID: number, playerID: number) {
        console.warn(`lwj 脚本 变身 ${cfgID} ${playerID}`);
        this.ownerId = playerID;
        if (this.ownerId == 0) {
            this.useUpdate = false;
            this.clearDropTimeOut();
            this.clearChangeSmallTime();
            // this.owner.character.clearDescription();
            this.owner = null;
            this._killCount = 0;
            return;
        }
        this.cfgID = cfgID;
        this.useUpdate = true;
        this.cfg = GameConfig.Monsters.getElement(cfgID);
        this.owner = Player.getPlayer(playerID);
        // this.owner.character.worldTransform.position = this.cfg.BirthPosition;
        // this.owner.character.setDescription([this.cfg.NightDressAsset]);


    }

    /**恢复 */
    public recovery() {
        this.change(0, 0);
    }


    /**受击注射器倒地 */
    public onPlayerDropBlood() {
        if (this.ownerId == 0) return;

        this.playerDrop(this.ownerId);
        this.dropTimeOut = setTimeout(() => {
            this.clearDropTimeOut();
        }, 10 * 1000);
    }

    /**玩家站起 */
    private clearDropTimeOut() {
        if (this.dropTimeOut) {
            this.dropTimeOut = null;
            this.playerStandUp(this.ownerId);
            clearTimeout(this.dropTimeOut);
        }
    }


    /**受到枪击
     * @param danceId 跳舞动作id
     */
    public onPlayerGun(danceId: number) {
        console.warn(`lwj 受到枪击 danceId ${danceId}`);
        if (this.ownerId == 0) {
            console.warn(`lwj dance ownerid 0`);
            return;
        }

        if (this.dropTimeOut) {
            //倒地中
            console.warn(`lwj 倒地中`);
            return;
        }
        console.warn(`lwj dance`);
        this.playerDance(this.ownerId, danceId);
    }



    @RemoteFunction(Server)
    private playAtk() {
        this.playAtkAni()
    }

    /**变小 */
    public changeSmall() {
        if (this.ownerId == 0) return;
        if (this.changeSmallTime) return;

        this.showAttackBtn(this.owner, false);
        let bulletData = GameConfig.nBullet.getElement(1004);
        let modelGuid = bulletData.TarnsferID[MathUtil.randomInt(0, bulletData.TarnsferID.length - 1)];
        this.owner.character.description.base.wholeBody = modelGuid;

        this.changeSmallTime = setTimeout(() => {
            this.showAttackBtn(this.owner, true);
            this.clearChangeSmallTime();
            this.owner.character.setDescription([this.cfg.NightDressAsset]);
        }, GlobalData.Gun.fanRecoverTime * 1000);
    }
    private clearChangeSmallTime() {
        if (this.changeSmallTime) {
            clearTimeout(this.changeSmallTime);
            this.changeSmallTime = null;
        }
    }

    /**成功攻击到玩家 */
    public onPlayerAttackSuccess() {
        if (this.ownerId == 0) return;
        this._killCount++;
    }



    //#endregion   S  端  ********************



    //#region  C  端   ********************

    private curPlayerId: number = 0;
    private isChange: boolean = false;
    /**倒地动画 */
    private currentAnim: mw.Animation = null;
    private walkAni: mw.Animation = null;
    private fallAniTime: any = null;
    /**NPC交互触发器 */
    private npcInterTrigger: NpcTrigger = null;

    private hudUI: P_Game_HUD = null;
    private danceAni: Animation = null;
    private danceTime: any = null;
    private dancer: Player = null;

    private async onOwnerIdChange() {
        this.useUpdate = this.ownerId != 0;
        if (!this.hudUI) {
            this.hudUI = UIService.getUI(P_Game_HUD);
        }
        if (this.isChange) {
            //重置
            this.changeSet(false);
            this.clearFallAni();
        }
        if (this.ownerId == 0) {
            this.clearDanceTime();
            this.walkAni?.stop();
            this.walkAni = null;
            this.hudUI.setKillNum(0);
            this.npcInterTrigger?.setTriggerEnable(false, this.ownerId);
            return;
        }

        this.owner = Player.getPlayer(this.ownerId);
        utils.playAnimation(this.owner.character, 6001);
        //npc交互触发器
        if (!this.npcInterTrigger) {
            this.npcInterTrigger = new NpcTrigger(this.ownerId);
            await this.npcInterTrigger.init(this.owner.character);
        }
        this.npcInterTrigger.setTriggerEnable(true, this.ownerId);
        console.warn(`lwj cfgid ${this.cfgID} `);
        this.cfg = GameConfig.Monsters.getElement(this.cfgID);
        if (this.ownerId != this.curPlayerId) return;


        this.changeSet(true);

    }


    private onKillCountChange() {
        if (this.ownerId != this.curPlayerId) return;
        if (!this.hudUI) {
            this.hudUI = UIService.getUI(P_Game_HUD);
        }
        this.hudUI.setKillNum(this._killCount);
    }

    /**变身设置 */
    private async changeSet(isChange: boolean) {
        this.isChange = isChange;
        //玩家种族变化
        MonsterChangeC.curPlayerRace = isChange ? PlayerRace.Ghost : PlayerRace.Human;
        //buff加起来
        GlobalData.Buff.speedBuff = isChange ? GlobalData.PlayerChange.speedAdd : 0;
        GlobalData.Buff.sprintSpeedBuff = isChange ? GlobalData.PlayerChange.sprintSpeedAdd : 1;
        GlobalData.Buff.sprintCostSpSecondBuff = isChange ? GlobalData.PlayerChange.sprintCostSpSecondAdd : 0;
        //UI变化
        if (!this.hudUI) {
            this.hudUI = UIService.getUI(P_Game_HUD);
        }
        this.hudUI.setBtnVisible(true);
        this.hudUI.setChangeMonsterUI(isChange);
        this.onAttClickAC(isChange);
        if (isChange) {
            this.hudUI.setKillUIVis(true);
            this.hudUI.setSurvivalUIVis(false);
            UIService.getUI(P_PropBar).hide();
            UIService.getUI(P_SelfDress).hide();
            ModuleService.getModule(DressUpModuleC).closeDress()
            ModuleService.getModule(BagModuleC).onUnequipProp.call();
            ModuleService.getModule(SportModuleC).changeState_getUp();
            console.warn(`lwj 感染者`);
            this.owner.character.setDescription([this.cfg.NightDressAsset]);
            this.owner.character.syncDescription();
            // UIService.getUI(P_RulesTips).showTeamTips(PlayerRace.Ghost);
        }
        else {
            this.hudUI.setKillUIVis(false);
            UIService.getUI(P_PropBar).show();
            console.warn(`lwj 重置变身 ${this.ownerId}`);
            this.owner.character.clearDescription(true, true);
            let t_CurCharac = Player.localPlayer.character;
            mw.AccountService.downloadData(t_CurCharac);
        }

    }

    /**UI点击事件 */
    private onAttClickAC(isAdd: boolean) {
        if (isAdd) {
            this.hudUI.onMonsterAtkAC.add(this.monsterAttack.bind(this));
        } else {
            this.hudUI.onMonsterAtkAC.clear();
        }
    }

    /**怪物攻击 */
    private monsterAttack() {
        let player = Player.getPlayer(this.ownerId);
        if (!player) return;
        console.warn(`lwj 怪物攻击 ${this.walkAni}`);
        this.playAtk();
        ModuleService.getModule(SceneUnitModuleC).playerAttackByMonster();
    }

    /**玩家倒地 */
    @RemoteFunction(Client, Multicast)
    private playerDrop(playerId: number) {
        let char = Player.getPlayer(playerId).character;
        if (this.danceAni) {
            this.danceAni.stop();
            this.danceAni = null;
            char.movementEnabled = true;
        }

        utils.downloadAsset(GlobalData.NPC.npcFallDownGuid).then(() => {
            this.currentAnim = char.loadAnimation(GlobalData.NPC.npcFallDownGuid);
            this.currentAnim.play();

            this.fallAniTime = setTimeout(() => {
                this.currentAnim.pause();
                this.fallAniTime = null;
            }, 3 * 1000);
        });

        if (playerId == this.curPlayerId) {
            console.warn(`lwj 玩家倒地`);
            //自己
            if (!this.hudUI) {
                this.hudUI = UIService.getUI(P_Game_HUD);
            }
            this.hudUI.setMonsterSprintVis(false);
            this.hudUI.setMonsterAtkBtnVis(false);
            UIService.getUI(P_HUD).setInter(false);
        }
    }

    /**玩家站起 */
    @RemoteFunction(Client, Multicast)
    private playerStandUp(playerId: number) {
        let char = Player.getPlayer(playerId).character;
        this.currentAnim?.stop();
        this.currentAnim = null;
        char.worldTransform.rotation = new Rotation(0, 0, 0);
        this.clearFallAni();

        if (playerId == this.curPlayerId) {
            //自己
            if (!this.hudUI) {
                this.hudUI = UIService.getUI(P_Game_HUD);
            }
            this.hudUI.setMonsterSprintVis(true);
            this.hudUI.setMonsterAtkBtnVis(true);
            UIService.getUI(P_HUD).setInter(true);
        }

    }

    @RemoteFunction(Client, Multicast)
    private help(name: string) {
        if (!name || name == "") {
            console.warn(`lwj net_Help name is null`);
            return;
        }
        let str = utils.Format(GameConfig.Language.Text_Action_Name_14.Value, name);
        UIService.getUI(P_GlobalTips).showTips(str);
    }

    @RemoteFunction(Client, Multicast)
    private playAtkAni() {
        if (this.walkAni) {
            this.walkAni.stop();
        }
        let cfg = GameConfig.NPCAnimation.getElement(57);
        let ani = this.owner.character.loadAnimation(cfg.Guid);
        this.owner.character.movementEnabled = false;
        setTimeout(() => {
            if (this.owner)
                this.owner.character.movementEnabled = true;
        }, 1000);
        ani.play();
        ani.onFinish.add(() => {
            this.owner.character.movementEnabled = true;
        })
    }



    /**显隐攻击按钮 */
    @RemoteFunction(Client)
    private showAttackBtn(player: Player, isShow: boolean) {
        this.hudUI.setMonsterAtkBtnVis(isShow);
    }


    private clearFallAni() {
        if (this.fallAniTime) {
            clearTimeout(this.fallAniTime);
            this.fallAniTime = null;
        }
    }


    @RemoteFunction(Client, Multicast)
    private playerDance(playerID: number, danceId: number) {
        let player = Player.getPlayer(playerID);
        if (!player) return;

        if (danceId == 0) {
            //减速
            this.slowDown(player);
        } else {
            //跳舞
            this.dance(danceId, player);
        }

    }

    /**发现玩家 */
    @RemoteFunction(Client)
    private findPlayer(player: Player) {
        UIService.getUI(P_Warning).warningAni();
        SoundManager.instance.play3DSound(30, player.character);
    }

    private danceEff: number[] = [];
    /**跳舞 */
    private dance(danceId: number, player: Player): void {
        if (this.danceTime) return;
        this.dancer = player;
        let info = GameConfig.NPCAnimation.getElement(danceId);
        utils.downloadAsset(info.Guid).then(() => {
            this.danceAni = utils.playAnimationLocally2(player.character,
                info.Guid,
                info.Repeat ? 0 : 1,
                info.Time,
                info.slot
            );
            this.danceAni.play()
            this.danceAni?.onFinish.add(() => {
                this.danceAni = null;
            });
        });
        if (player.playerId == this.curPlayerId) {
            //自己
            console.warn(`lwj 自己 dance `);
            if (!this.hudUI) {
                this.hudUI = UIService.getUI(P_Game_HUD);
            }
            this.hudUI.setMonsterAtkBtnVis(false);
            this.hudUI.setMonsterSprintVis(false);
            player.character.movementEnabled = false;
        }
        let danceArr = [25, 26];
        danceArr.forEach(async (cfgId) => {
            let effid = await EffectManager.instance.playEffectOnGameObject(this.owner.character, cfgId);
            this.danceEff.push(effid);
        });

        this.danceTime = setTimeout(() => {
            this.clearDanceTime();
        }, GlobalData.NPC.npcDanceTime * 1000);
    }

    private stopDance() {
        if (this.danceAni) {
            this.danceAni.stop();
            this.danceAni = null;
        }
    }

    private clearDanceTime() {
        if (this.danceTime) {
            console.warn(`lwj 清除跳舞时间`);
            let char = Player.getPlayer(this.curPlayerId)
            if (char == this.dancer) {
                //自己
                this.hudUI.setMonsterAtkBtnVis(true);
                this.hudUI.setMonsterSprintVis(true);
                char.character.movementEnabled = true;
            }
            this.stopDance();
            clearTimeout(this.danceTime);
            this.danceTime = null;
        }
        this.danceEff?.forEach(v => {
            EffectManager.instance.stopEffect(v);
        });
        this.danceEff.length = 0;
    }

    private slowTime: any = null;
    private buffEffArr: number[] = [];
    /**减速 */
    private slowDown(player: Player): void {
        if (this.slowTime) return;
        if (player == this.owner) {
            GlobalData.Buff.speedBuff = -GlobalData.Buff.speedBuff
        }

        this.playSpeedBuffEffect(player.character);

        this.slowTime = setTimeout(() => {
            this.buffEffArr.forEach(v => {
                EffectManager.instance.stopEffect(v);
            });
            this.slowTime = null;
            this.buffEffArr.length = 0;
            if (player == this.owner) {
                GlobalData.Buff.speedBuff = Math.abs(GlobalData.Buff.speedBuff)
            }
        }, GlobalData.NPC.eyeMonstHurtTime * 1000);
    }
    /**播放特效 */
    private async playSpeedBuffEffect(npc: Character) {
        this.buffEffArr.push(await EffectManager.instance.playEffectOnGameObject(npc, 21));
        this.buffEffArr.push(await EffectManager.instance.playEffectOnGameObject(npc, 22));
        this.buffEffArr.push(await EffectManager.instance.playEffectOnGameObject(npc, 23));
    }

    private stateType = EState.None;
    private static dfaultState: EState = null;

    /**
      * 刷新基本状态 
      */
    private updateDfState() {
        if (!this.owner) return;
        if (this.owner.character.isJumping) {
            ChangeJS.dfaultState = EState.jump;
        } else {
            let ve = this.owner.character.velocity;
            let speed = ve.length;
            if (speed <= 0) {
                ChangeJS.dfaultState = EState.Idle;
            }
            else {
                ChangeJS.dfaultState = EState.run;
            }
        }
        this.changeDefaultState();
    }

    /**
     * 切换
     */
    public changeDefaultState() {

        if (this.stateType != EState.Idle && ChangeJS.dfaultState == EState.Idle) {
            //待机
            this.walkAni?.stop();
            this.stateType = EState.Idle;
        }

        if (this.stateType != EState.run && ChangeJS.dfaultState == EState.run) {
            //跑
            this.playWalkAni(this.cfg.Active);
            this.stateType = EState.run;
        }

        if (this.stateType != EState.jump && ChangeJS.dfaultState == EState.jump) {
            //跳
            this.walkAni?.stop();
            this.stateType = EState.jump;
        }
    }

    /**播放动画 */
    private playWalkAni(aniId: number) {
        let info = GameConfig.NPCAnimation.getElement(aniId);
        utils.downloadAsset(info.Guid).then(() => {
            this.walkAni = this.owner.character.loadAnimation(info.Guid);
            this.walkAni.loop = info.Repeat ? 0 : 1;
            this.walkAni.play();
        });
    }


    //#endregion

}

function checkNpcByAngle(model: Character, distance: number, id: number): Player[] {
    if (!model) return;

    const angle = GlobalData.NPC.checkAnagle / 2;

    let npcTrans = model.worldTransform;
    let players = Player.getAllPlayers();

    let minDisPlayer: Player[] = [];

    let playerMS = ModuleService.getModule(PlayerModuleS);

    players.forEach((player) => {
        //剔除安全状态的玩家
        if (!player || !player.character || player.character == model) return;

        let can = playerMS.canBeAttacked(id, player.playerId);
        if (!can) return;

        //范围外的不计算
        let dis = Vector.squaredDistance(player.character.worldTransform.position, npcTrans.position);
        if (dis > Math.pow(distance, 2)) return;


        let temVec = Vector.subtract(player.character.worldTransform.position, npcTrans.position);
        let angle2 = Vector.angle(npcTrans.getForwardVector(), temVec);

        //判断是否在视野范围内
        if (angle2 <= angle) {
            minDisPlayer.push(player);
        }
    });
    return minDisPlayer;

}