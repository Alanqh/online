import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { GlobalData } from "../../../const/GlobalData";
import { EPlayerState } from "../../../const/enum";
import { EffectManager } from "../../../utils/EffectManager";
import { PlyerState } from "./PlyerState";

/**
 * 潜行翻滚状态
 */
export class PlayerState_Roll extends PlyerState {

    /**当前帧数 */
    private displacementCount: number = 0;

    /**延迟退出key */
    private delayEixtTime: any = null;


    constructor(stateType: EPlayerState) {
        super(stateType);
    }

    enter() {

        this.displacementCount = GlobalData.PlayerSport.rollDisplacementCount;

        //特效
        if (GlobalData.PlayerSport.rolltEffect) {
            EffectManager.instance.playEffectOnPlayer(GlobalData.PlayerSport.rolltEffect, Player.localPlayer.character);
        }

        //动画
        let ani: Animation = PlayerManagerExtesion.rpcPlayAnimation(Player.localPlayer.character, GlobalData.PlayerSport.rollAnimtion[0],
            GlobalData.PlayerSport.rollAnimtion[1], GlobalData.PlayerSport.rollAnimtion[2]);
        ani.onFinish.clear();
        ani.onFinish.add(() => {

        })

        //提前结束动画站立部分 变为潜行状态
        this.delayEixtTime = setTimeout(() => {
            this.sportModuleC.changeState_Crouch();
        }, GlobalData.PlayerSport.rollAnimtionStopTime);
    }

    exit() {
        if (this.delayEixtTime) {
            clearTimeout(this.delayEixtTime);
            this.delayEixtTime = null;
        }
    }

    onUpdate(dt: number) {
        this.updateRoll(dt);
    }

    private updateRoll(dt: number) {

        if (this.displacementCount <= 0) {
            return;
        }
        this.displacementCount--;

        let playerDir = Player.localPlayer.character.localTransform.getForwardVector();
        let displacement = playerDir.clone().multiply(GlobalData.PlayerSport.rollDisplacement.x);

        // 腰部射线
        let playerLoc = Player.localPlayer.character.worldTransform.position;

        GlobalData.TempVector.copyVector(playerLoc);

        mw.Vector.add(GlobalData.TempVector.vector, displacement, GlobalData.TempVector.vector);

        let middleHitResult = QueryUtil.lineTrace(playerLoc, GlobalData.TempVector.vector, true, false);

        // 脚部射线
        GlobalData.TempVector.copyVector(playerLoc);
        GlobalData.TempVector.vector.z -= Player.localPlayer.character.getBoundingBoxExtent().z / 3;

        mw.Vector.add(GlobalData.TempVector.vector, displacement, GlobalData.TempVector.vector);

        let downHitResult = QueryUtil.lineTrace(playerLoc, GlobalData.TempVector.vector, true, false);

        // 腰前方有碰撞
        for (let hit of middleHitResult) {
            if (hit.gameObject == Player.localPlayer.character) continue;
            if (hit.gameObject instanceof mw.Trigger) continue;
            return;
        }
        // 脚前方有碰撞
        for (let hit of downHitResult) {
            if (hit.gameObject == Player.localPlayer.character) continue;
            if (hit.gameObject instanceof mw.Trigger) continue;
            return;
        }

        mw.Vector.add(playerLoc, displacement, GlobalData.TempVector.vector)

        Player.localPlayer.character.worldTransform.position = GlobalData.TempVector.vector;
    }

    onDestory(): void {

    }




    // /**能量消耗key */
    // private runKey: any = null;
    // /**检测计时 */
    // private wallEnergyTimer: number = 0;
    // //能量检测间隔
    // private wallEnergyDlateTime: number = 1;
    // //能量减少百分比
    // private wallEnergyReduceValue: number = 5;


    // /** 潜行翻滚每秒恢复计时 */
    // private recoverTimer: number = 0;

    // /**
    //  * 潜行翻滚每秒恢复
    //  */
    // private updateRevoverSp(dt: number) {
    //     this.recoverTimer += dt;
    //     if (this.recoverTimer >= 1) {
    //         this.wallEnergyTimer = 0;
    //         this.sp += GlobalData.PlayerSport.recoverSp;
    //     }
    // }

    // /**
    //  * 冲刺
    //  */
    // private sprint() {
    //     this.runKey = TimeUtil.onEnterFrame.add(this.updateEnergyt, this);
    // }

    // //跑墙玩家能量检测
    // private updateEnergyt(dt: number) {
    //     // if (this.mStateManager && this.mStateManager.currentStateType == EPlayerState.runWall) {
    //     //     let energy = this.playerModulec.getAttr(Attribute.EnumAttributeType.energy);
    //     //     if (energy <= 0) {
    //     //         if (PlyerState.runWallState == RunWallState.Runing) {
    //     //             Notice.showDownNotice(util.getLanguageByKey("Text_MainUI_2"));
    //     //             this.mStateManager.eixtState(EPlayerState.runWall);
    //     //             return;
    //     //         }
    //     //     } else {
    //     //         this.wallEnergyTimer += dt;
    //     //         if (this.wallEnergyTimer >= this.wallEnergyDlateTime) {
    //     //             this.wallEnergyTimer = 0;
    //     //             this.playerModulec.reduceAttr(Attribute.EnumAttributeType.energy, this.wallEnergyReduceValue, false)
    //     //         }
    //     //     }
    //     // }
    // }

    // private clear_updateEnergy() {
    //     if (this.runKey) {
    //         TimeUtil.onEnterFrame.remove(this.runKey)
    //         this.runKey = null;
    //     }
    //     this.wallEnergyTimer = 0;
    // }

}

