import { GameConfig } from "../../../config/GameConfig";
import { IPetGameElement } from "../../../config/PetGame";
import { BaseState } from "../../../fsm/StateMachine";
import { PropModuleC } from "../../propModule/PropModuleC";
import { FourPlayerState } from "./FourPlayerFSM";


export class HitState extends BaseState {
    private aniConfig: IPetGameElement
    private bigStun: number = GameConfig.PetStat.getElement(40004).Value;//大硬直下限
    private smallTime: number = GameConfig.PetStat.getElement(40001).Value;//小硬直时长
    private bigTime: number = GameConfig.PetStat.getElement(40003).Value;//大硬直时长
    private time: number;
    private isBig: boolean;


    init(cfgId: number): void {
        let petConfig = GameConfig.Pet.getElement(cfgId);
        this.aniConfig = GameConfig.PetGame.getElement(petConfig.gameAnimationSet);
    }
    enter(...param: any[]): void {
        ModuleService.getModule(PropModuleC).breakProp();
        this.time = 0;
        this.owner.movementEnabled = false;
        this.owner.jumpEnabled = false;
        let impulseNum = param[0];//所受冲量
        if (impulseNum >= this.bigStun) {
            this.isBig = true;
            this.time = this.bigTime;
            this.fsm.toPlayAnim(FourPlayerState.HitState, true, this.aniConfig.BigStiffGuid, this.aniConfig.BigStiffRate, 999999);
        } else {
            this.isBig = false;
            this.time = this.smallTime;
            this.fsm.toPlayAnim(FourPlayerState.HitState, true, this.aniConfig.SmallStiffGuid, this.aniConfig.SmallStiffRate, 999999);
        }

        if (param.length > 1) {
            let gearId = param[1]
            let gearConfig = GameConfig.Gear.getElement(gearId);
            // TODO受击效果

        }
    }
    update(dt: number): void {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0) {
                this.fsm.changeState(FourPlayerState.IdleState);
            }
        }
    }
    exit(): void {
        this.owner.movementEnabled = true;
        this.owner.jumpEnabled = true;
        if (this.isBig) {
            this.fsm.toPlayAnim(FourPlayerState.HitState, false, this.aniConfig.BigStiffGuid);
        } else {
            this.fsm.toPlayAnim(FourPlayerState.HitState, false, this.aniConfig.SmallStiffGuid);
        }
    }

}