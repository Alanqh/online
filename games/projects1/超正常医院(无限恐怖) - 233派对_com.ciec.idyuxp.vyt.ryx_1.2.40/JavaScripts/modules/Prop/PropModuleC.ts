
import { GameConfig } from "../../config/GameConfig";
import PropModuleS from "./PropModuleS";
import { utils } from "../../utils/uitls";
import UITools from "../../utils/UI/UITools";
import { CoreGameplay, Events_CS } from "../../const/enum";
import BagModuleC from "../Bag/BagModuleC";
import P_PropBar from "../Bag/P_PropBar";
import { WeaponModuleC } from "../weaponModule/WeaponModuleC";
import { ActionCommon } from "../../const/GlobalData";
import { TaskEnum } from "../Guide/TaskEnum";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import GuideModuleC from "../Guide/GuideModuleC";
import { FactionType, PropId, PropType } from "../Bag/PropEnum";
import { MonsterChangeC } from "../ChangeMonster/MonsterChangeC";
import { LotteryWindow } from "../Lottery/LotteryWindow";
import PropModuleData from "./PropModuleData";
import P_Guide from "../Guide/P_Guide";
import { LotteryModuleC } from "../Lottery/LotteryModule";

export default class PropModuleC extends ModuleC<PropModuleS, PropModuleData> {

    /**当前装备的道具在背包中的key */
    public curEquipPropKey: number = null;
    /**当前装备的id */
    private curEquipPropId: number = null;
    /**当前装备模型的Guid */
    private curEquipGuid: string = null;
    /**当前道具播放的姿态 */
    private equipAnim: Animation = null;
    /**背包UI */
    private propBar: P_PropBar;
    /**背包模块 */
    private bagMC: BagModuleC;
    /**使用血药事件 */
    public onPotionOfHealing: Action = new Action();
    /**玩家道具特效map */
    private playerPropEffectMap: Map<number, number> = new Map();
    /**枪模块 */
    private weaponMC: WeaponModuleC;

    /**是否正在使用道具中 */
    private _isUsingProp = false;
    public get isUsingProp() {
        return this._isUsingProp;
    }
    public set isUsingProp(value) {
        this._isUsingProp = value;
        if (value) {
            this.localPlayer.character.movementEnabled = false;
            this.propBar.mPropCanvas.visibility = SlateVisibility.HitTestInvisible;
            console.log("禁止移动");
        } else {
            this.localPlayer.character.movementEnabled = true;
            this.propBar.mPropCanvas.visibility = SlateVisibility.Visible;
            console.log("允许移动");
        }
    }

    protected onStart(): void {
        this.bagMC = ModuleService.getModule(BagModuleC);
        this.bagMC.onEquipProp.add(this.equipProp.bind(this));
        this.bagMC.onUnequipProp.add(this.unequipProp.bind(this));
        this.bagMC.onChangeProp.add(this.changeProp.bind(this));
        this.propBar = mw.UIService.getUI(P_PropBar);
        this.weaponMC = ModuleService.getModule(WeaponModuleC);

        this.propBar.mBtn_Action.clickedDelegate.add(() => {
            console.log(`当前装备id：` + this.curEquipPropId)
            // 没装备道具不允许使用
            if (this.curEquipPropKey == null) {
                console.log("当前未装备道具");
                return;
            }
            this.useProp(this.curEquipPropId, this.curEquipPropKey);
        })

        Event.addServerListener(Events_CS.RecoverDefaultState, () => {
            this.unequipProp();
        })
        Event.addServerListener(Events_CS.PlayAnimEditor, this.net_playAnim.bind(this));
    }


    private gunDestroyFunId: number;
    /**装备道具时进行的操作 */
    private async equipProp(key: number) {
        let propId = this.bagMC.getIdByKey(key);
        if (propId == null) return;
        let propConf = GameConfig.Item.getElement(propId);
        // 容错 如果没卸载道具，先卸载
        if (this.curEquipPropKey != null) {
            await this.unequipProp();
        }
        // 生成道具并绑在玩家插槽上
        this.curEquipGuid = await this.server.net_attachToPlayer(propId, propConf.HangingPointPosition)

        // 根据是否可用设置使用道具UI可见性
        this.propBar.setUseBtnVis(propConf.Tab == 3);
        this.propBar.mBtn_Action.normalImageGuid = propConf.Icon.toString();
        this.propBar.mBtn_Action.pressedImageGuid = propConf.Icon.toString();
        this.propBar.mBtn_Action.disableImageGuid = propConf.Icon.toString();
        // 记录当前道具信息
        this.curEquipPropKey = key;
        this.curEquipPropId = propId;
        let propType = propConf.Tab;
        // 额外处理
        switch (propType) {
            // 脉冲枪
            case PropType.Gun:
                // 第一次装备枪弹提示
                if (propId == PropId.DanceGun && !this.data.hasEquipDanceGun) {
                    UIService.getUI(P_Guide).showTaskDetail(11);
                    this.data.firstEquipDanceGun();
                }
                this.weaponMC.equipWeapon(propConf.WeaponId, this.curEquipGuid);

                this.gunDestroyFunId = this.weaponMC.weaponDestroyAC.add(() => {
                    this.bagMC.delPropFromBag(this.curEquipPropKey);
                });
                break;
            default:
                break;
        }
        if (propType == PropType.Consumable) ActionCommon.onShowTaskDetail.call(TaskEnum.useProp);
        if (propType == PropType.Gun) ActionCommon.onShowTaskDetail.call(TaskEnum.shootMonster);
    }


    /**卸载道具 */
    private async unequipProp() {

        if (this.curEquipPropId == null) return;
        // 额外处理
        let conf = GameConfig.Item.getElement(this.curEquipPropId);
        switch (conf.Tab) {
            // 脉冲枪
            case PropType.Gun:
                this.weaponMC.weaponDestroyAC.remove(this.gunDestroyFunId);
                ModuleService.getModule(WeaponModuleC).unEquipWeapon();
                break;
            default:
                break;
        }
        this.propBar.setUseBtnVis(false);

        await this.server.net_destroyProp();
        await this.server.net_stopAnim(this.localPlayerId);

        this.curEquipPropKey = null;
        this.curEquipPropId = null;
        this.curEquipGuid = null;

        console.warn("卸载");
    }


    /**更换道具 */
    private async changeProp(key: number) {

        await this.unequipProp();
        this.equipProp(key);
    }


    /**使用道具 */
    public async useProp(propId: number, key: number) {
        let propConf = GameConfig.Item.getElement(propId);
        let type = propConf.Tab;
        let mCharacter = this.localPlayer.character;
        ActionCommon.onTaskComplete.call(TaskEnum.useProp);
        ModuleService.getModule(AnalyticsModuleC).finishCoreStrp(CoreGameplay.useProp);
        /**道具不同分类 */
        switch (type) {
            // 3. 消耗品
            case PropType.Consumable:
                // 相同分类不同功能
                let factionType = utils.randomSelect(propConf.FactionID, propConf.Probability);
                let factionConf = GameConfig.Faction.getElement(factionType);
                console.log("factionType: " + factionType);
                this.server.net_changeHp(this.localPlayerId, factionConf.Damage);
                // 没合体，直接吃东西
                this.server.net_playAnim(this.localPlayerId, factionConf.Animation);

                console.log("血量变化值：" + factionConf.Damage);
                if (factionConf && factionConf.Damage >= 0) {
                    UITools.ShowSoftTips(utils.getLanguageByKey("Prop_Food_1", [factionConf.Damage]));
                }
                if (factionConf && factionConf.Damage < 0) {
                    UITools.ShowSoftTips(utils.getLanguageByKey("Tips_01", [factionConf.Damage]));
                }
                // 隐藏按钮
                this.propBar.setUseBtnVis(false);
                // 设置状态
                this.isUsingProp = true;
                console.log("使用道具")
                break;
            // 2.武器类道具
            case PropType.Weapon:
                switch (propConf.Faction) {
                    // 2.1 针管
                    case FactionType.Syringe:

                        let fectionType = utils.randomSelect(propConf.FactionID, propConf.Probability);
                        let factionConf = GameConfig.Faction.getElement(fectionType);

                        await this.server.net_playAnim(this.localPlayerId, 6002);
                        this.server.net_playEffectOnEquipObj("4399");
                        this.bagMC.delPropFromBag(key);
                        // 设置为已经攻击过，用于下次不再提示ui
                        ModuleService.getModule(GuideModuleC).isAttack = true;
                        break;
                }
                break;
            // 3. 枪类道具
            case PropType.Gun:
                this.weaponMC.startFire();
                break;

            // 6. 变身卡
            case PropType.TransformationCard:
                ModuleService.getModule(MonsterChangeC).openChooseMonster();
                break;
            // 7. 抽奖券
            case PropType.Ticket:
                ModuleService.getModule(LotteryModuleC).showLotteryUI();
                break;
            default:
                console.warn(`lmn warn 道具id:${propId}, type:${type} 未定义`);
                break;
        }
    }

    /**攻击Npc */
    public async attackNpc(key: number) {
        // 没有装备对应道具则装备
        if (this.curEquipPropKey != key) {
            this.bagMC.onEquipProp.call(key);
            console.warn("装备针管");
        }
        // 使用道具
        let id = this.bagMC.getIdByKey(key);
        this.useProp(id, key);
        console.warn("使用针管")
    }

    /**播放动画编辑器动画 同步到所有客户端 */
    public playAnimRPC(animId: number) {
        this.server.net_playAnim(this.localPlayerId, animId);
    }


    // ----------------- net方法 ----------------


    /**播放动画 */
    public async net_playAnim(playerId: number, animConfId: number): Promise<void> {

        let mCharacter = Player.getPlayer(playerId)?.character;
        if (mCharacter == null) return;
        let anim = utils.playAnimation(mCharacter, animConfId);

        if (playerId == this.localPlayerId) {
            anim.onFinish.add(() => {
                // 设置使用道具状态结束
                this.isUsingProp = false;
            })
        }
    }

    /**停止播放动画 */
    public net_stopAnim(playerId: number) {
        let mCharacter = Player.getPlayer(playerId)?.character;
        if (mCharacter == null || mCharacter.currentAnimation == null) {
            return console.warn("停止动画失败");
        };
        if (this.equipAnim && this.equipAnim.isPlaying) this.equipAnim.stop();
    }

    /**给对应物体绑定特效 */
    public net_playEffectOnEquipObj(guid: string, effectGuid: string, playerId: number) {
        console.log("开始播特效~");
        let obj = GameObject.findGameObjectById(guid);
        if (obj == null) {
            console.warn("物体不存在: " + guid, "effectId = " + effectGuid);
            return;
        }
        let effectId = EffectService.playOnGameObject(effectGuid, obj);
        // 如果正在播放别的特效，先停了
        let oldEffectId = this.playerPropEffectMap.get(playerId);
        if (oldEffectId) EffectService.stop(oldEffectId);
        this.playerPropEffectMap.set(playerId, effectId);
    }

    /**停止播放对应特效 */
    public net_stopEffectOnEquipObj(playerId: number) {
        let effectId = this.playerPropEffectMap.get(playerId);
        if (effectId == null) return;
        EffectService.stop(effectId);
        this.playerPropEffectMap.delete(playerId);
    }

    /**服务端通知使用道具 */
    public net_useProp(propId: number) {
        let key = this.bagMC.getPropKeyById(propId);
        if (key == -1) {
            UITools.ShowSoftTips("道具不存在");
            return;
        }
        this.useProp(propId, key);
    }
}

