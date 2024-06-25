
import { GameConfig } from "../../config/GameConfig";
import { GameEventC2C } from "../../const/GameCommonEvent";
import GameComUtils from "../../utils/GameComUtils";
import P_BaseControl from "../hudModule/ui/P_BaseControl";
import { PetModuleC } from "../petModule/PetModuleC";
import { FourPlayerState } from "../petModule/fourPlayerFSM/FourPlayerFSM";
import { P_Prop } from "./P_Prop";
import { PropBaseC } from "./PropBaseC";
import { PropModuleS } from "./PropModuleS";
import { ProjectileMovementFactory, PropMoveStartPosOffsetX, PropType, lineEffZIncrement, lineEffectGuid, lineEffectScale, moveObjCount, propMoveObjArr } from "./PropUtils";

/**
 * 点对象GUID
 */
const pointObjGuid: string = GameConfig.Global.getElement(50005).string_Value;


export class PropModuleC extends ModuleC<PropModuleS, null> {

    /**客户端道具类 */
    protected mProp: PropBaseC;

    private mProjectileObj: GameObject = null;
    /**道具投掷物 */
    protected projectile: ProjectileMovement = null;

    /**道具UI */
    private mUI: P_Prop;

    //箭头特效
    private arrowEffect: Effect = null;
    private baseUI: P_BaseControl;

    protected onEnterScene(sceneType: number): void {
        this.createPropMoveObj();

        this.mUI = UIService.create(P_Prop);
        this.baseUI = UIService.getUI(P_BaseControl);

        GameObject.asyncSpawn(pointObjGuid).then(go => {
            this.mProjectileObj = go;
            let model = this.mProjectileObj as Effect;
            model.play();
            model.setVisibility(PropertyStatus.Off);
            model.setCollision(CollisionStatus.Off);

            this.projectile = ProjectileMovementFactory.createProjectile(this.mProjectileObj, null);
        })
    }

    // 初始化道具路径点
    private async createPropMoveObj() {
        for (let i = 0; i < moveObjCount; i++) {
            let obj = await GameObject.asyncSpawn(pointObjGuid);
            let model = obj as Effect;
            model.play();
            model.setVisibility(PropertyStatus.Off);
            model.setCollision(CollisionStatus.Off);
            propMoveObjArr.push(obj);
        }
        this.arrowEffect = await GameObject.asyncSpawn(lineEffectGuid) as Effect;
        this.arrowEffect.loop = true;
        this.arrowEffect.worldTransform.scale = lineEffectScale;
        this.arrowEffect.setVisibility(PropertyStatus.Off);
    }


    /**
     * 客户端创建道具
     * @param propId 
     * @param guid 
     */
    public net_CreateProp(propId: number, index: number) {
        if (this.mProp) {
            this.drawCancel();
            this.mProp.destoryProp();
        }
        this.mProp = this.getPropObj(propId);
        UIService.showUI(this.mUI);
        this.mUI.index = index;
        ProjectileMovementFactory.refreshProjectile(this.projectile, propId);
    }

    private getPropObj(propId: number): PropBaseC {
        let propObj: PropBaseC = new PropBaseC(propId, this.mUI);
        return propObj;
    }

    /**
     * 开始预测
     */
    public propDrawStart() {
        this.mProp.drawStart();
    }
    /**
     * 移动预测
     * @param v 摇杆方向
     */
    public propDrawMove(v: Vector2, density: number, isCharFwd: boolean) {
        let moveData = this.mProp.drawMove(v, isCharFwd);
        if (moveData == null) {
            return;
        }
        if (this.projectile.gravityScale == 0) {
            this.arrowEffect.setVisibility(PropertyStatus.On);
            this.arrowEffect.worldTransform.position = moveData.startPos.clone().add(lineEffZIncrement);
            this.arrowEffect.worldTransform.rotation = moveData.dir.clone().toRotation().add(new Rotation(90, 0, 0));
            return;
        }

        // 修改物体位置
        this.mProjectileObj.worldTransform.position = moveData.startPos;
        // 开始预测3秒
        let posList: Vector[] = this.projectile.getTrajectory(moveData.dir, density, 3);
        if (posList == null) {
            console.error("posList == null");
            return
        }

        // 这里只能多或相等，不可能少
        let hideCount = propMoveObjArr.length - posList.length;
        if (hideCount < 0) {
            hideCount = 0;
            // console.error("hideCount error", posList.length, propMoveObjArr.length, hideCount);
            // return
        }

        let index = propMoveObjArr.length - 1;
        for (let i = 0; i < hideCount; i++) {
            if (index < 0) {
                break;
            }
            propMoveObjArr[index].setVisibility(PropertyStatus.Off);
            index--;
        }

        posList.forEach((pos, index) => {
            if (index > propMoveObjArr.length - 1) return;
            let obj = propMoveObjArr[index];
            obj.setVisibility(PropertyStatus.On);
            obj.worldTransform.position = pos;
            const nextPos = posList[index + 1];
            if (nextPos) {
                let rot = Vector.subtract(nextPos, pos).toRotation();
                obj.worldTransform.rotation = rot;
            }
        })
    }
    /**
     * 结束预测(使用道具)
     */
    public propDrawEnd() {
        for (let i = 0; i < propMoveObjArr.length; i++) {
            propMoveObjArr[i].setVisibility(PropertyStatus.Off);
        }
        this.arrowEffect.setVisibility(PropertyStatus.Off);
        let endMoveData = this.mProp.drawEnd();
        this.server.net_LaunchProp(endMoveData.startPos, endMoveData.dir,this.mUI.index);
    }

    /**触发二次使用 */
    public propUseAgain() {
        this.server.net_PropUseAgain();
    }

    // /**
    //  * 直线发射
    //  */
    // public propLanuchForward() {
    //     // 先往玩家正前方发射
    //     let trans = Player.localPlayer.character.worldTransform;
    //     let pos = trans.position;
    //     let forward = trans.getForwardVector();
    //     Vector.multiply(forward, PropMoveStartPosOffsetX, forward);
    //     Vector.add(pos, forward, pos);
    //     this.server.net_LaunchProp(pos, forward);
    // }

    /**
     * 取消预测
     */
    public drawCancel() {
        this.mProp.drawCancel();
        this.arrowEffect.setVisibility(PropertyStatus.Off);
        for (let i = 0; i < propMoveObjArr.length; i++) {
            propMoveObjArr[i].setVisibility(PropertyStatus.Off);
        }
    }

    /**
     * 强行中断
     * @param bool 是否隐藏UI
     */
    public breakProp(bool: boolean = false) {
        if (this.mProp) {
            this.drawCancel();
            this.mUI.clearPropUI(bool);
        }
        this.server.net_BreakProp(bool);
    }

    /**
     * 咸鱼击中玩家
     * @param num 
     */
    public net_HitPlayer(num: number) {
        Event.dispatchToLocal("GEAR_AddPower", this.localPlayer.character.gameObjectId, num);
    }

    /**
     * 使用加速玩家
     * @param num 
     */
    public net_UseSpeed(num: number) {
        Event.dispatchToLocal(GameEventC2C.GAME_CHANGE_MAXWALKSPEED_C2C, num);
    }

    /**泡泡受击效果 */
    public net_HitBubble(isHitNpc: boolean, hitId: number[]) {
        ModuleService.getModule(PetModuleC).changeHitRecoverState(hitId[0], Vector.up);
        let hitSound = GameConfig.ToolStat.getElement(PropType.Bubble).hitSound;
        GameComUtils.play2DSoundByCfg(hitSound);
    }

    //当前能否使用道具
    public getCanUseProp(): boolean {
        let canUse: boolean = true;
        let state = ModuleService.getModule(PetModuleC).getCurState();
        if (state == FourPlayerState.HitState || state == FourPlayerState.HitRecoverState) {
            canUse = false;
        }
        return canUse;
    }

    //隐藏UI打断道具
    public net_ClearPropUI() {
        this.breakProp(true);
    }

    //修改设想就区域
    public changePropArea(isCancel: boolean) {
        this.baseUI.isCancelCameraMove(isCancel);
    }


}