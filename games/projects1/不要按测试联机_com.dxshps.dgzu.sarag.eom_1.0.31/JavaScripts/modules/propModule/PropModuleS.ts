import { GameConfig } from "../../config/GameConfig";
import { PetModuleS } from "../petModule/PetModuleS";
import { FourPlayerState } from "../petModule/fourPlayerFSM/FourPlayerFSM";
import { PropModuleC } from "./PropModuleC";
import { PropMrg } from "./PropMrg";
import { PropType } from "./PropUtils";

export class PropModuleS extends ModuleS<PropModuleC, null> {
    //角色与加速计时
    private pldSpeedMap: Map<number, SpeedEffect> = new Map<number, SpeedEffect>();

    protected onStart(): void {

    }

    /**
     * 通知客户端道具拾取了
     * @param playerId 玩家id
     * @param propId 道具id
     * @param guid 道具guid
     */
    public createProp(playerId: number, propId: number, index: number) {
        this.getClient(playerId).net_CreateProp(propId, index);
    }

    /**
     * 通知服务器朝dir方向发射道具
     * @param playerId 玩家
     * @param dir 方向
     */
    @Decorator.noReply()
    public net_LaunchProp(startP: Vector, dir: Vector, index: number) {
        PropMrg.instance.landProp(this.currentPlayerId, startP, dir, index);
    }

    /**
     * 通知服务器道具二次使用
     */
    @Decorator.noReply()
    public net_PropUseAgain() {
        PropMrg.instance.propUseAgain(this.currentPlayerId);
    }

    //咸鱼击中玩家
    public hitPlayer(playerId: number, num: number) {
        this.getClient(playerId).net_HitPlayer(num);
    }

    //使用加速的玩家
    public async useSpeed(playerId: number, propId: number) {
        let cfg = GameConfig.ToolStat.getElement(propId);
        let char = Player.getPlayer(playerId).character;
        let speedEff: SpeedEffect = { speedTime: null, effectObj: null };
        if (this.pldSpeedMap.has(playerId)) {
            speedEff = this.pldSpeedMap.get(playerId);
            clearTimeout(speedEff.speedTime);
            char.detachFromSlot(speedEff.effectObj);
            GameObjPool.despawn(speedEff.effectObj);
            this.pldSpeedMap.delete(playerId);
            speedEff = await this.playSpeedEffect(playerId, propId);
        } else {
            this.getClient(playerId).net_UseSpeed(cfg.impulse);
            speedEff = await this.playSpeedEffect(playerId, propId);
        }
        this.pldSpeedMap.set(playerId, speedEff);
    }

    //播放加速特效
    private async playSpeedEffect(playerId: number, propId: number) {
        let speedEff: SpeedEffect = { speedTime: null, effectObj: null };
        let cfg = GameConfig.ToolStat.getElement(propId);
        let char = Player.getPlayer(playerId).character;
        let isAnimal = true;
        let petId = ModuleService.getModule(PetModuleS).getCurPetId(playerId);
        let petCfg = GameConfig.Pet.getElement(petId);

        speedEff.speedTime = setTimeout(() => {
            this.getClient(playerId).net_UseSpeed(-cfg.impulse);
            char.detachFromSlot(speedEff.effectObj);
            GameObjPool.despawn(speedEff.effectObj);
            this.pldSpeedMap.delete(playerId);
        }, cfg.time * 1000);

        speedEff.effectObj = await GameObjPool.asyncSpawn(cfg.hitEffectPet, mwext.GameObjPoolSourceType.Prefab);
        char.attachToSlot(speedEff.effectObj, isAnimal ? mw.NonHumanoidSlotType.Root : mw.HumanoidSlotType.Root);
        speedEff.effectObj.localTransform.position = isAnimal ? cfg.hitEffectPetPos.clone().add(petCfg.trailPos) : cfg.hitEffectHumanPos.clone();
        speedEff.effectObj.localTransform.rotation = isAnimal ? cfg.hitEffectPetRot.clone().toRotation() : cfg.hitEffectHumanRot.clone().toRotation();
        speedEff.effectObj.localTransform.scale = isAnimal ? this.getPetEffScale(playerId, cfg.hitEffectPetScale) : cfg.hitEffectHumanScale.clone();
        return speedEff;
    }


    //泡泡受击
    public hitBubble(hitId: number[], attpId: number, isHitNpc: boolean, hitPId: number) {
        if (isHitNpc) {
            this.getClient(attpId).net_HitBubble(isHitNpc, hitId);
        } else {
            this.getClient(hitPId).net_HitBubble(isHitNpc, hitId);
        }
    }


    //玩家离开事件
    protected onPlayerLeft(player: mw.Player): void {
        if (this.pldSpeedMap.has(player.playerId)) {
            let speedEff = this.pldSpeedMap.get(player.playerId);
            clearTimeout(speedEff.speedTime);
            speedEff.effectObj.destroy();
            this.pldSpeedMap.delete(player.playerId);
        }
        PropMrg.instance.onPlayerLeft(player.playerId);
    }


    public getPetEffScale(playerId: number, v3: Vector) {
        let scale = v3.clone();
        let curPetId = ModuleService.getModule(PetModuleS).getCurPetId(playerId);
        let petCfg = GameConfig.Pet.getElement(curPetId);
        Vector.multiply(scale, petCfg.attachScale.x, scale);
        return scale;
    }

    /**打断道具使用及效果 */
    public net_BreakProp(clear: boolean) {
        if (this.pldSpeedMap.has(this.currentPlayerId)) {//打断加速
            let cfg = GameConfig.ToolStat.getElement(PropType.SpeedUp);
            let speedEff = this.pldSpeedMap.get(this.currentPlayerId);
            let char = this.currentPlayer.character;
            char.detachFromSlot(speedEff.effectObj);
            GameObjPool.despawn(speedEff.effectObj);
            clearTimeout(speedEff.speedTime);
            this.getClient(this.currentPlayerId).net_UseSpeed(-cfg.impulse);
            this.pldSpeedMap.delete(this.currentPlayerId);
        }
        clear ? PropMrg.instance.clearPlayerProp(this.currentPlayerId) : PropMrg.instance.breakPlayerProp(this.currentPlayerId);
    }


    public clearePropUI(playerId) {
        this.getClient(playerId).net_ClearPropUI();
    }

    //能否拾取道具
    public canPickProp(playerId: number) {
        let canUse: boolean = true;
        let state = ModuleService.getModule(PetModuleS).getPetState(playerId);
        if (state == FourPlayerState.HitState || state == FourPlayerState.HitRecoverState) {
            canUse = false;
        }
        if (canUse) {
            let getPlayerCan = PropMrg.instance.getPlayerCanPickProp(playerId);
            return getPlayerCan;
        }
        return false;
    }

}

type SpeedEffect = { speedTime: any, effectObj: GameObject };