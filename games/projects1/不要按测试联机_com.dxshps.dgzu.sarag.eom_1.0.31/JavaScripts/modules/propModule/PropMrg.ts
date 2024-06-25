import { oTraceWarning } from "odin";
import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../config/GameConfig";
import { Singleton } from "../../utils/FunctionUtil";
import MGSHome from "../mgsModule/MGSHome";
import { PetModuleS } from "../petModule/PetModuleS";
import { PropBaseS, PropBubbleS, PropDoorS, PropFishS, PropSpeedUpS } from "./PropBaseS";
import { PropModuleS } from "./PropModuleS";
import { PropPoint } from "./PropPoint";
import { ProjectileMovementFactory, PropAimType, PropType } from "./PropUtils";

export enum PropScene {
    /**大厅 */
    Hall = 1,
    /**游戏场景 */
    Game = 2,
}

@Singleton()
export class PropMrg {
    //单例对象
    public static instance: PropMrg;
    /**道具固定点位数组 */
    private _propPointArr: Array<PropPoint> = new Array<PropPoint>();
    /**角色与拾取道具 */
    private _playerAndProp: Map<number, PropBaseS> = new Map<number, PropBaseS>();
    private level: number;
    private gameing: boolean = false;
    private index: number = 1000;


    //生成道具固定点位
    public createPropPoint(scene: PropScene, level: number): void {
        if (scene == PropScene.Game) {
            this.level = level;
            let gamePoints = GameConfig.ToolGame.getAllElement();
            gamePoints = gamePoints.filter(item => item.level == level)
            gamePoints.forEach((value, key) => {
                let propPoint: PropPoint = PropPool.spanwPos();
                propPoint.initPropPoint(value.id);
                propPoint.pickAction.add((playerId: number, propId: number) => {
                    this.playerPickProp(playerId, propId);
                });
                this._propPointArr.push(propPoint);
            });
            this.gameing = true;
        }
    }

    //玩家拾取道具
    private async playerPickProp(playerId: number, propId: number) {
        let player = Player.getPlayer(playerId);
        if (this._playerAndProp.has(playerId)) {
            this.clearPlayerProp(playerId);
        }
        let propBase = PropPool.spanwProp(propId);
        if (!propBase.index) {
            propBase.index = this.index;
            this.index++;
        }
        //获取玩家是否为宠物
        let isPet = true;
        let petId = ModuleService.getModule(PetModuleS).getCurPetId(playerId);
        let petCfg = GameConfig.Pet.getElement(petId);
        let bool = await propBase.equipProp(player.character, isPet, petCfg.backPos, true);
        if (!bool) {
            PropPool.unSpanProp(propBase);
            this._playerAndProp.delete(playerId);
            return;
        }
        if (this._playerAndProp.has(playerId)) {
            this.clearPlayerProp(playerId);
        }
        this._playerAndProp.set(playerId, propBase);
        // 玩家UI展示
        ModuleService.getModule(PropModuleS).createProp(playerId, propId, propBase.index);

    }

    //玩家能否拾取道具
    public getPlayerCanPickProp(playerId: number): boolean {
        if (this._playerAndProp.has(playerId)) {
            let prop = this._playerAndProp.get(playerId);
            if (!prop || !prop.equipIsReady) {
                return false;
            }
        }
        return true;
    }


    //打断玩家道具
    public breakPlayerProp(playerId: number): void {
        let prop = this._playerAndProp.get(playerId);
        if (prop && prop.equipIsReady) {
            prop.breakProp();
        }
    }


    //清空单个玩家道具
    public clearPlayerProp(playerId: number): void {
        let prop = this._playerAndProp.get(playerId);
        if (prop && prop.equipIsReady) {
            prop.destroyProp(false);
            PropPool.unSpanProp(prop);
            this._playerAndProp.delete(playerId);
        }
    }

    //游戏结束
    public gameOver() {
        this.gameing = false;
        this.clearProp();
        this.recyclePropPoint();
    }

    public getIsGameing(): boolean {
        return this.gameing;
    }


    //清空玩家道具
    private clearProp(): void {
        this._playerAndProp.forEach((value, key) => {
            if (value.equipIsReady) {
                value.destroyProp(false);
                PropPool.unSpanProp(value);
            }
            //玩家道具UI清空
            ModuleService.getModule(PropModuleS).clearePropUI(key);
        });
        this._playerAndProp.clear();
    }


    //回收道具固定点位
    private recyclePropPoint(): void {
        this._propPointArr.forEach((value, index) => {
            value.pickAction.clear();
            value.destroy();
            PropPool.unSpanPos(value);
        });
        this._propPointArr.length = 0;
    }

    /**
     * 朝dir方向发射道具
     * @param playerId 
     * @param dir 
     */
    public landProp(playerId: number, startP: Vector, dir: Vector, index: number): void {
        let prop = this._playerAndProp.get(playerId);
        if (!prop || !prop.equipIsReady || index != prop.index) return;
        if (prop._propCfg.aimType != PropAimType.None) {
            prop.launch(startP, dir);
        }
        prop.useProp();//使用道具
        MGSHome.useProp(Player.getPlayer(playerId), prop.propId, this.level);

    }

    /** 二次道具使用效果 */
    public propUseAgain(playerId: number): void {
        let prop = this._playerAndProp.get(playerId);
        if (!prop || !prop.equipIsReady) return;
        if (prop.propId == PropType.Door) {
            (prop as PropDoorS).useAgain();
        }
    }

    //玩家离开
    public onPlayerLeft(playerId: number): void {
        if (this._playerAndProp.has(playerId)) {
            let prop = this._playerAndProp.get(playerId);
            if (prop && prop.equipIsReady) {
                prop.destroyProp(true);
                PropPool.unSpanProp(prop);
            }
            this._playerAndProp.delete(playerId);
        }
    }


}

/**投掷物数据类 */
export class ProjectileData {
    /**道具Id */
    public propId: number = 0;
    //终点位置
    private endPos = new Vector(0, 0, -3000);
    /**投掷物模型guid */
    public bindGuid: string = null;
    /**投掷物绑定模型 */
    public bindModel: GameObject = null;
    /**道具投掷物类 */
    public projectile: ProjectileMovement = null;

    private keepTime: any = null;
    private doorEffId: number = null;

    public async init(bindGuid: string, propId: number) {
        this.propId = propId;
        this.bindGuid = bindGuid;
        this.bindModel = await GameObject.asyncSpawn(bindGuid);
        this.projectile = ProjectileMovementFactory.createProjectile(this.bindModel, propId);
        this.projectile.lifeSpan = 0;//道具投掷物生命周期
        this.bindModel.setCollision(mw.CollisionStatus.QueryOnly, true);
        this.bindModel.worldTransform.scale = GameConfig.ToolStat.getElement(propId).bindModelScale;
        this.bindModel.worldTransform.position = this.endPos;
    }


    //发射
    public toLaunch(startP: Vector, dir: Vector, owner: Character) {
        this.projectile.owner = owner;
        this.bindModel.worldTransform.position = startP;
        this.projectile.launch(dir);
        this.projectile.onProjectileHit.clear();
        this.projectile.onProjectileHit.add((hitGameObject, hitResult) => {// 击中委托
            if (hitGameObject == this.projectile.owner) return;
            this.onProjectHit(hitGameObject, hitResult);
        });
    }

    //投掷物击中回调
    private onProjectHit(hitGameObject: mw.GameObject, hitResult: mw.HitResult) {
        if (!this.projectile.owner || hitGameObject.gameObjectId == this.projectile.owner.gameObjectId) return;
        if (hitGameObject instanceof Trigger) return;
        oTraceWarning('投掷物击中回调', this.propId);

        switch (this.propId) {
            case PropType.Door:
                this.projectile.pause();
                this.projectile.onProjectileHit.clear();
                let propCfg = GameConfig.ToolStat.getElement(PropType.Door);
                let pos = this.bindModel.worldTransform.position;
                Vector.add(pos.clone(), propCfg.useEffectHumanPos, pos);
                if (!this.doorEffId) {
                    this.doorEffId = EffectService.playAtPosition(propCfg.useEffectHuman, pos, { loopCount: 99999, rotation: propCfg.useEffectHumanRot.toRotation(), scale: propCfg.useEffectHumanScale });
                }
                break;
            case PropType.Bubble:
                if (!PlayerManagerExtesion.isCharacter(hitGameObject)) return;
                let cfg = GameConfig.ToolStat.getElement(PropType.Bubble);
                let attPlayerId = this.projectile.owner.player.playerId;
                let isHitNpc: boolean = false;
                let playerId: number = hitGameObject.player.playerId;
                ModuleService.getModule(PropModuleS).hitBubble(cfg.hitRecoverId, attPlayerId, isHitNpc, playerId);
                this.projectile.pause();
                this.projectile.onProjectileHit.clear();
                PropPool.unSpanProjectile(this);//回收投掷物
                break;
        }
    }

    //重置对象
    public recycleMode() {
        if (this.doorEffId) {
            EffectService.stop(this.doorEffId);
            this.doorEffId = null;
        }

        if (this.keepTime) {
            clearTimeout(this.keepTime);
            this.keepTime = null;
        }
        this.projectile.pause();
        this.projectile.onProjectileHit.clear();
        this.projectile.owner = null;
        this.bindModel.worldTransform.position = this.endPos;
    }

    //移动销毁时间(目前只有泡泡用)
    public keepMoveTime(num: number) {
        this.keepTime = setTimeout(() => {
            PropPool.unSpanProjectile(this);//回收投掷物;//回收投掷物
            this.keepTime = null;
        }, num * 1000);
    }
}


export class PropPool {
    //点位对象池
    private static propPosArr: Array<PropPoint> = new Array<PropPoint>();
    //道具对象池
    private static propMap: Map<number, Array<PropBaseS>> = new Map();
    //道具模型对象池
    private static propProjectileMap: Map<string, Array<ProjectileData>> = new Map();

    public static async spanwProjectile(bindGuid: string, propId: number): Promise<ProjectileData> {
        if (this.propProjectileMap.has(bindGuid)) {
            if (this.propProjectileMap.get(bindGuid).length > 0) {
                let modelPool = this.propProjectileMap.get(bindGuid);
                let modelData = modelPool.pop();
                this.propProjectileMap.set(bindGuid, modelPool);
                return modelData;
            } else {
                let modelData: ProjectileData = new ProjectileData();
                await modelData.init(bindGuid, propId);
                return modelData;
            }
        } else {
            let modelData: ProjectileData = new ProjectileData();
            await modelData.init(bindGuid, propId);
            return modelData;
        }
    }

    public static unSpanProjectile(propModule: ProjectileData) {
        propModule.recycleMode();
        if (this.propProjectileMap.has(propModule.bindGuid)) {
            let arrProp = this.propProjectileMap.get(propModule.bindGuid);
            arrProp.push(propModule);
            this.propProjectileMap.set(propModule.bindGuid, arrProp);
        } else {
            this.propProjectileMap.set(propModule.bindGuid, [propModule]);
        }
    }


    public static spanwProp(propId: number): PropBaseS {
        if (this.propMap.has(propId)) {
            if (this.propMap.get(propId).length > 0) {
                let typePool = this.propMap.get(propId);
                let curProp = typePool.pop();
                this.propMap.set(propId, typePool);
                return curProp;
            } else {
                let spanProp = this.getPropObj(propId);
                return spanProp;
            }
        } else {
            let spanProp = this.getPropObj(propId);
            return spanProp;
        }
    }
    public static unSpanProp(prop: PropBaseS) {
        if (this.propMap.has(prop.propId)) {
            let arrProp = this.propMap.get(prop.propId);
            arrProp.push(prop);
            this.propMap.set(prop.propId, arrProp);
        } else {
            this.propMap.set(prop.propId, [prop]);
        }
    }


    private static getPropObj(propId: number): PropBaseS {
        let propObj: PropBaseS = null;
        switch (propId) {
            case PropType.Fish:
                propObj = new PropFishS(propId);
                break;
            case PropType.Bubble:
                propObj = new PropBubbleS(propId);
                break;
            case PropType.SpeedUp:
                propObj = new PropSpeedUpS(propId);
                break;
            case PropType.Door:
                propObj = new PropDoorS(propId);
                break;
        }
        return propObj;
    }



    public static spanwPos(): PropPoint {
        if (this.propPosArr && this.propPosArr.length > 0) {
            let propPos = this.propPosArr.pop();
            return propPos;
        } else {
            let propPoint: PropPoint = new PropPoint();
            return propPoint;
        }
    }

    public static unSpanPos(prop: PropPoint) {
        this.propPosArr.push(prop);
    }

}