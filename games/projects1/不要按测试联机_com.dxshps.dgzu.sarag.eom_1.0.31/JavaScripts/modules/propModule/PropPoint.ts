import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../config/GameConfig";
import { IToolGameElement } from "../../config/ToolGame";
import { PropModuleS } from "./PropModuleS";

enum PointState {
    /**正常 */
    Normal = 0,
    /**刷新中 */
    Refreshing = 1,
    /**销毁 */
    Destroy = 2,
}
export class PropPoint {
    /**道具固定点位数据 */
    private _pointCfg: IToolGameElement;
    /**点位特效触发器PrefabGuid */
    private _effTriggerGuid: string;
    /**点位特效Prefab */
    private _effTrigger: Trigger;
    /**道具模型 */
    private _module: GameObject;
    /**道具触发函数 */
    private _entFunc: (gameObject: mw.GameObject) => void;;
    /**当前刷新的道具Id */
    private _propCfgId: number;
    /**点位状态 */
    private _pointState: PointState = PointState.Normal;
    //拾取回调函数
    public pickAction: Action2<number, number> = new Action2<number, number>();
    /**刷新cd记录 */
    private _refreshTime: any = null;


    public initPropPoint(cfgId: number): void {
        this._pointCfg = GameConfig.ToolGame.getElement(cfgId);
        this._effTriggerGuid = GameConfig.Global.getElement(60005).string_Value;
        this.createProp();
    }

    private async createProp(): Promise<void> {
        this._propCfgId = this.randomPropId(this._pointCfg.tools);//随机出道具Id
        let propCfg = GameConfig.ToolStat.getElement(this._propCfgId);
        this._module = await GameObjPool.asyncSpawn(propCfg.model, propCfg.modelType);
        this._module.setCollision(mw.CollisionStatus.Off, true);
        this._module.setVisibility(true, true);
        let loc = this._pointCfg.spawnPos.clone().add(propCfg.showPos);
        this._module.worldTransform.position = loc;
        this._module.worldTransform.rotation = propCfg.showRot.toRotation();
        this._module.worldTransform.scale = propCfg.showScale.clone();
        this._effTrigger = await GameObjPool.asyncSpawn(this._effTriggerGuid, mwext.GameObjPoolSourceType.Prefab) as Trigger;
        this._effTrigger.worldTransform.position = this._pointCfg.spawnPos.clone();
        this._entFunc = (obj: GameObject) => { this.pickProp(obj); };
        this._effTrigger.onEnter.add(this._entFunc);
        this._effTrigger.enabled = true;
        this.changeState(PointState.Normal);
    }


    //从可生成的道具Id数组中随机出当前道具Id
    private randomPropId(props: number[]): number {
        let randomNum: number = MathUtil.randomInt(0, props.length);
        return props[randomNum];
    }

    //道具被拾取
    private pickProp(obj: GameObject): void {
        if (!PlayerManagerExtesion.isCharacter(obj) || this._pointState != PointState.Normal) return;
        let player = (obj as Character).player;
        let bool = ModuleService.getModule(PropModuleS).canPickProp(player.playerId);
        if (!bool) return;
        this.changeState(PointState.Refreshing);
        this._refreshTime = setTimeout(() => {
            this._refreshTime = null;
            this.createProp();
        }, this._pointCfg.refreshTime * 1000);
        this.destroyProp();
        this.pickAction.call(player.playerId, this._propCfgId);
    }

    //状态修改
    private changeState(state: PointState): void {
        this._pointState = state;
    }


    //销毁点位
    public destroy(): void {
        this.changeState(PointState.Destroy);
        if (this._refreshTime) {
            clearTimeout(this._refreshTime);
            this._refreshTime = null;
        }
        this.destroyProp();
    }

    private destroyProp(): void {
        if (this._effTrigger) {
            this._effTrigger.onEnter.remove(this._entFunc);
            this._effTrigger.enabled = false;
            GameObjPool.despawn(this._effTrigger);
        }
        if (this._module) {
            GameObjPool.despawn(this._module);
        }
    }

}