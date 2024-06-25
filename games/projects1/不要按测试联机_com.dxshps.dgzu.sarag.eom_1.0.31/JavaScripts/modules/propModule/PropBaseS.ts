import { GameConfig } from "../../config/GameConfig";
import { IToolStatElement } from "../../config/ToolStat";
import { PropModuleS } from "./PropModuleS";
import { ProjectileData, PropMrg, PropPool } from "./PropMrg";

//道具基类
export abstract class PropBaseS {
    //道具Id
    public propId: number;
    //道具配置
    public _propCfg: IToolStatElement;
    protected _propModel: GameObject;
    //道具投掷物数据
    protected _projectileData: ProjectileData;
    //道具使用次数
    protected _propCount: number;
    //道具拥有者ID
    protected _propOwnerId: number;
    //道具拥有者
    protected _propOwner: Character;
    //准备完成
    private isReady: boolean = false;
    //唯一标识
    public index: number = 0;


    constructor(propId: number) {
        this.index = null;
        this.propId = propId;
        this._propCfg = GameConfig.ToolStat.getElement(propId);
    }

    get equipIsReady(): boolean {
        return this.isReady;
    }

    set equipIsReady(isReady: boolean) {
        this.isReady = isReady;
    }


    /**
     * 道具装备(表现层)
     * @param char 装备玩家
     * @param isPet 是否为宠物
     * @param petBasePos 宠物基础偏移
     * @param refresh 是否刷新道具（拾取时刷新、切模式不刷新）
     */
    public async equipProp(char: Character, isPet: boolean, petBasePos: Vector, refresh: boolean): Promise<boolean> {
        await char.asyncReady();
        this._propOwner = char;
        this._propOwnerId = char.player.playerId;
        // 需要瞄准，通知客户端
        if (this._propCfg.aimType) {
            this._projectileData = await PropPool.spanwProjectile(this._propCfg.bindModel, this.propId);
        }
        if (refresh) {//拾取道具
            this._propCount = this._propCfg.count;
            this._propModel = await GameObjPool.asyncSpawn(this._propCfg.model, this._propCfg.modelType);//道具模型
            this._propModel.setCollision(mw.CollisionStatus.Off, true);
            this._propModel.setVisibility(true, true);
        } else {//变身刷新
            this._propOwner.detachFromSlot(this._propModel);
        }
        //异步后检查
        if (!this.checkCanReady()) return false;
        //插槽效果
        let scale = isPet ? this._propCfg.petScale.clone() : this._propCfg.humanScale.clone();
        scale = scale.divide(char.worldTransform.scale);
        this._propOwner.attachToSlot(this._propModel, isPet ? mw.NonHumanoidSlotType.Root : this._propCfg.humanPoint);
        this._propModel.localTransform.position = isPet ? petBasePos.clone().add(this._propCfg.petPos) : this._propCfg.humanPos;
        this._propModel.localTransform.rotation = isPet ? this._propCfg.petRot.toRotation() : this._propCfg.humanRot.toRotation();
        this._propModel.localTransform.scale = scale;
        this.isReady = true;
        return true;
    }

    //检查异步后的能否装备
    public checkCanReady() {
        //异步后检查
        let gameState = PropMrg.instance.getIsGameing();
        if (!this._propOwner || !this._propOwner.player || !gameState) {
            if (this._projectileData) {
                PropPool.unSpanProjectile(this._projectileData);//回收投掷物
            }
            GameObjPool.despawn(this._propModel);
            return false;
        }
        return true;
    }


    /**
     * 朝dir方向发射
     * @param dir 发射方向
     */
    public launch(startP: Vector, dir: Vector) {
        this._projectileData.toLaunch(startP, dir, this._propOwner);
    }

    //道具使用
    public useProp() {
        this._propCount--;
    }

    //道具销毁
    public destroyProp(isDestory: boolean): void {
        if (isDestory) {
            this._propModel.destroy();
        } else {
            this._propOwner.detachFromSlot(this._propModel);
            this._propModel.worldTransform.scale = Vector.zero;
            GameObjPool.despawn(this._propModel);
        }
        this._propOwner = null;
        this._propCount = 0;
        this.isReady = false;
    }

    //获取使用次数
    public getPropCount(): number {
        return this._propCount;
    }

    //打断道具
    public breakProp(): void {
    }
}



//打击咸鱼
export class PropFishS extends PropBaseS {
    constructor(propId: number) {
        super(propId);
    }

    public useProp() {
        super.useProp();
        let isPet = true;
        if (!isPet) {
            let ani = this._propOwner.loadAnimation(this._propCfg.humanAction);
            ani.loop = 1;
            ani.play();
            EffectService.playOnGameObject(
                this._propCfg.useEffectHuman, this._propOwner, {
                slotType: this._propCfg.useEffectHumanPoint, loopCount: 1, position: this._propCfg.useEffectHumanPos,
                rotation: this._propCfg.useEffectHumanRot.toRotation(), scale: this._propCfg.useEffectHumanScale
            });
        } else {
            let scale = ModuleService.getModule(PropModuleS).getPetEffScale(this._propOwnerId, this._propCfg.useEffectPetScale);
            EffectService.playOnGameObject(
                this._propCfg.useEffectPet, this._propOwner, {
                slotType: 0, loopCount: 1, position: this._propCfg.useEffectPetPos,
                rotation: this._propCfg.useEffectPetRot.toRotation(), scale: scale
            });
        }
        let arr = Player.getAllPlayers();
        arr = this.selector(arr);//排除自己
        if (arr.length > 0) {
            this.hitEffect(arr);
        };
        if (this._propCount <= 0) {
            PropMrg.instance.clearPlayerProp(this._propOwnerId);
        }
    }

    //筛选符合条件的玩家
    private selector(arr: Player[]) {
        const ownerPos = this._propOwner.worldTransform.position;
        const rangeSq = this._propCfg.range * this._propCfg.range;
        const cos = Math.cos(180 * Math.PI / 360);
        return arr.filter(actor => {
            // 不包含自己
            if (actor.character == this._propOwner) return false;
            // 距离过滤
            const distSq = Vector.squaredDistance(actor.character.worldTransform.position, ownerPos);
            if (distSq > rangeSq) return false;
            // 角度过滤
            const targetVec = actor.character.worldTransform.position.subtract(ownerPos).normalized;
            const forward = this._propOwner.worldTransform.getForwardVector();
            const cosTarget = Vector.dot(forward, targetVec);
            return cosTarget >= cos;
        });
    }

    //击中效果
    private hitEffect(arr: Player[]) {
        let attLoc = this._propOwner.worldTransform.position;
        arr.forEach(actor => {
            let hitLoc: mw.Vector = actor.character.worldTransform.position;
            if (actor.character.characterType == CharacterType.FourFootStandard) {
                let scale = ModuleService.getModule(PropModuleS).getPetEffScale(this._propOwnerId, this._propCfg.hitEffectPetScale);
                EffectService.playOnGameObject(
                    this._propCfg.hitEffectPet, actor.character, {
                    slotType: 0, loopCount: 1, position: this._propCfg.hitEffectPetPos,
                    rotation: this._propCfg.hitEffectPetRot.toRotation(), scale: scale
                });
            } else {
                EffectService.playOnGameObject(
                    this._propCfg.hitEffectHuman, actor.character, {
                    slotType: this._propCfg.hitEffectHumanPoint, loopCount: 1, position: this._propCfg.hitEffectHumanPos,
                    rotation: this._propCfg.hitEffectHumanRot.toRotation(), scale: this._propCfg.hitEffectHumanScale
                });
            }
            let newLoc = hitLoc.subtract(attLoc).normalized;
            newLoc.z = 1;
            actor.character.addImpulse(newLoc.multiply(this._propCfg.impulse), true);
            ModuleService.getModule(PropModuleS).hitPlayer(actor.playerId, this._propCfg.impulse);
        });
    }
}

export class PropBubbleS extends PropBaseS {
    private resetPrpject: boolean = true;
    constructor(propId: number) {
        super(propId);
    }

    public useProp(): void {
        super.useProp();
        this.resetPrpject = false;
        PropMrg.instance.clearPlayerProp(this._propOwnerId);
        this._projectileData.keepMoveTime(this._propCfg.time);
    }

    public destroyProp(isDestory: boolean): void {
        super.destroyProp(isDestory);
        if (this.resetPrpject) {
            PropPool.unSpanProjectile(this._projectileData);//回收投掷物
        }
        this.resetPrpject = true;
    }

}

export class PropSpeedUpS extends PropBaseS {
    constructor(propId: number) {
        super(propId);
    }

    public useProp(): void {
        super.useProp();
        PropMrg.instance.clearPlayerProp(this._propOwnerId);
        ModuleService.getModule(PropModuleS).useSpeed(this._propOwnerId, this.propId);
    }
}

export class PropDoorS extends PropBaseS {
    keepTime: any = null;
    constructor(propId: number) {
        super(propId);
    }

    public useProp(): void {
        super.useProp();
        this._propModel.setVisibility(false, true);
        this.keepTime = setTimeout(() => {
            PropMrg.instance.clearPlayerProp(this._propOwnerId);//回收道具
            PropPool.unSpanProjectile(this._projectileData);//回收投掷物
            this.keepTime = null;
        }, this._propCfg.time * 1000);
    }



    public useAgain() {
        if (!this.keepTime) return;
        clearTimeout(this.keepTime);
        this.keepTime = null;
        let pos = this._projectileData.bindModel.worldTransform.position;
        let charPos = this._propOwner.worldTransform.position;
        let extent = this._propOwner.collisionExtent;
        let fov = Vector.subtract(charPos.clone(), pos.clone()).normalized.multiply(100);
        Vector.add(pos.clone(), fov, pos);
        pos.z += extent.z;
        this._propOwner.worldTransform.position = pos;
        //播放特效
        if (this._propOwner.characterType == CharacterType.FourFootStandard) {
            let scale = ModuleService.getModule(PropModuleS).getPetEffScale(this._propOwnerId, this._propCfg.hitEffectPetScale);
            EffectService.playOnGameObject(this._propCfg.hitEffectPet, this._propOwner, { slotType: 0, loopCount: 1, position: this._propCfg.hitEffectPetPos, rotation: this._propCfg.hitEffectPetRot.toRotation(), scale: scale })
        } else {
            EffectService.playOnGameObject(this._propCfg.hitEffectHuman, this._propOwner, { slotType: this._propCfg.hitEffectHumanPoint, loopCount: 1, position: this._propCfg.hitEffectHumanPos, rotation: this._propCfg.hitEffectHumanRot.toRotation(), scale: this._propCfg.hitEffectHumanScale })
        }
        PropMrg.instance.clearPlayerProp(this._propOwnerId);//回收道具
        PropPool.unSpanProjectile(this._projectileData);//回收投掷物
    }

    public destroyProp(isDestory: boolean): void {
        super.destroyProp(isDestory);
        if (this.keepTime) {
            clearTimeout(this.keepTime);
            this.keepTime = null;
        }
        PropPool.unSpanProjectile(this._projectileData);//回收投掷物

    }

    //打断道具
    public breakProp(): void {
        if (!this.keepTime) return;//未使用不处理
        PropMrg.instance.clearPlayerProp(this._propOwnerId);//回收道具
    }


}