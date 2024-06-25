import { GameConfig } from "../../config/GameConfig";
import GameComUtils from "../../utils/GameComUtils";
import { P_PetControl } from "./P_PetControl";
import { PetStrengthenType, SuitInfo } from "./PetModuleData";
import { PetModuleS } from "./PetModuleS";
import PlayerPet from "./PlayerPet";
import { FourPlayerState } from "./fourPlayerFSM/FourPlayerFSM";


export class PetModuleC extends ModuleC<PetModuleS, null> {

    private petUI: P_PetControl;//宠物操作UI
    private selfPlayerPet: PlayerPet;//玩家四足脚本
    public isReady: boolean = false;
    /**[冲刺加速度, 冲刺持续时间, 冲刺最大移动速度, 冲刺cd, 移动最大速度, 移动加速度] */
    private strengthenAttrMap: Map<PetStrengthenType, { level: number, val: number }> = new Map();

    protected onStart(): void {
        //移动墙体弹飞监听
        Event.addLocalListener('GEAR_AddPower', (guid: string, force: number, gearId: number) => {
            GameComUtils.play2DSoundByCfg(10002);//受击音效
            force = Math.abs(force);
            let smallStun: number = GameConfig.PetStat.getElement(40002).Value;//小硬直下限
            if (guid != this.localPlayer.character.gameObjectId || force < smallStun) return;
            this.selfPlayerPet.fourPlayerFSM.changeState(FourPlayerState.HitState, false, force, gearId);


        })

        Event.addLocalListener('HIT_RECOVER', (dir: Vector, configId: number) => {
            this.changeHitRecoverState(configId, dir)
        })
        this.initPetStrengthen();
    }
    public async waitInitReady() {
        if (this.isReady) {
            return true
        }
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (this.isReady) {
                    clearInterval(timer)
                    resolve(true)
                }
            }, 100)
        })
    }

    protected onEnterScene(sceneType: number): void {
        this.petUI = UIService.getUI(P_PetControl);
        this.petUI.mBtn_Jump_Pet.onPressed.add(() => {
            let bool = this.selfPlayerPet.fourPlayerFSM.changeState(FourPlayerState.HoverState, false, true);
            if (!bool && this.selfPlayerPet.fourPlayerFSM.curState != FourPlayerState.RollState) return;
            GameComUtils.play2DSoundByCfg(10003);
            Player.localPlayer.character.jump();
        })
        this.petUI.mBtn_Dive.onPressed.add(() => {
            this.selfPlayerPet.fourPlayerFSM.changeState(FourPlayerState.FlyState, false);
        })
        this.petUI.mBtn_Speed.onPressed.add(() => {
            let bool = this.selfPlayerPet.fourPlayerFSM.changeState(FourPlayerState.RollState, false);
            if (!bool) return;
            this.petUI.keepTime();
        })
    }


    /**外部设置开局冲刺CD */
    public setRollCDTime() {
        let time = GameConfig.RuleGame.getElement(20001).float_Value;
        this.petUI.cdTime(time);
    }

    /**强制结束冲刺 */
    public endRoll() {
        this.petUI.cdTime();
    }

    /**获取当前状态 */
    public getState() {
        return this.selfPlayerPet.fourPlayerFSM.curState;
    }
    /**
    * 注册玩家四足脚本
    * @param playerId 玩家Id
    * @param pet 宠物
    */
    public registerPetCom(playerId: number, pet: PlayerPet) {
        if (playerId == this.localPlayerId) {
            this.selfPlayerPet = pet;
            this.isReady = true;
        }
    }

    /**播放冲刺特效 */
    toPlayRollEff(bool: boolean, petCfgId: number) {
        this.selfPlayerPet.playMoveEffect(this.localPlayerId, bool, petCfgId);
    }

    /**切换状态 */
    public changeState(isForce: boolean, state: FourPlayerState) {
        this.selfPlayerPet.fourPlayerFSM.changeState(state, isForce);
    }

    /**玩家是否开启四足状态机 */
    public fourPlayerFsm(enable: boolean, info: SuitInfo = null) {
        enable ? UIService.showUI(this.petUI) : UIService.hideUI(this.petUI);
        this.server.net_playerChangeSuit(this.localPlayerId, enable, info);//同步玩家套装
    }

    /**
     * 观战和操作UI冲突
     * @param isOn 
     */
    public setPetCtrlUIVisible(isOn: boolean) {
        if (isOn) {
            UIService.showUI(this.petUI);
        } else {
            UIService.hideUI(this.petUI);
        }
    }

    /**
* 切换到受击硬直状态
* @param hitRecoverConfigId 受击硬直表id
* @param dir 受力方向
*/
    public changeHitRecoverState(hitRecoverConfigId: number, dir: Vector) {
        this.selfPlayerPet.fourPlayerFSM.changeState(FourPlayerState.HitRecoverState, true, hitRecoverConfigId, dir);
    }

    //获取宠物当前状态
    public getCurState() {
        return this.selfPlayerPet.getCurState();
    }

    private initPetStrengthen() {
        this.strengthenAttrMap.set(PetStrengthenType.SprintAccel, { level: 0, val: 0 });
        this.strengthenAttrMap.set(PetStrengthenType.SprintDuration, { level: 0, val: 0 });
        this.strengthenAttrMap.set(PetStrengthenType.SprintMaxSpeed, { level: 0, val: 0 });
        this.strengthenAttrMap.set(PetStrengthenType.SprintCd, { level: 0, val: 0 });
        this.strengthenAttrMap.set(PetStrengthenType.MoveMaxSpeed, { level: 0, val: 0 });
        this.strengthenAttrMap.set(PetStrengthenType.MoveAccel, { level: 0, val: 0 });
    }

    /**
     * 设置强化属性相关的新数值
     * @param petLevels 宠物强化技能等级
     */
    public setPetLevelAttr(petLevels: number[]) {

        if (!petLevels || petLevels.length != GameConfig.PetUpgrades.getAllElement().length) return;
        //计算冲刺加速度
        let sprintAccel = petLevels[0] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.SprintAccel).upScores[petLevels[0] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.SprintAccel, { level: petLevels[0], val: sprintAccel });

        //计算冲刺持续时间
        let sprintDuration = petLevels[1] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.SprintDuration).upScores[petLevels[1] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.SprintDuration, { level: petLevels[1], val: sprintDuration });

        //计算冲刺最大移动速度
        let sprintMaxSpeed = petLevels[2] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.SprintMaxSpeed).upScores[petLevels[2] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.SprintMaxSpeed, { level: petLevels[2], val: sprintMaxSpeed });

        //计算冲刺cd
        let sprintCd = petLevels[3] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.SprintCd).upScores[petLevels[3] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.SprintCd, { level: petLevels[3], val: sprintCd });

        //计算最大移动速度
        let maxSpeed = petLevels[4] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.MoveMaxSpeed).upScores[petLevels[4] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.MoveMaxSpeed, { level: petLevels[4], val: maxSpeed });

        //计算移动加速度
        let moveAccel = petLevels[5] == 0 ? 0 : GameConfig.PetUpgrades.getElement(PetStrengthenType.MoveAccel).upScores[petLevels[5] - 1];
        this.strengthenAttrMap.set(PetStrengthenType.MoveAccel, { level: petLevels[5], val: moveAccel });
    }

    /**
     * 获得强化计算后的属性
     * @param type 类型
     * @returns 强化计算后的属性
     */
    public getStrengthenAttr(type: PetStrengthenType) {
        return this.strengthenAttrMap.get(type);
    }
}