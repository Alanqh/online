import { MoveUpdateRepeat } from "../MoveUtil/MoveObj";
import { MoveType } from "../MoveUtil/MoveScript";
import { GameConfig } from "../config/GameConfig";
import { AIManager_C } from "../modules/aIModule/AIManager_C";
import GameComUtils from "../utils/GameComUtils";

// 移动炸弹
@Component
export default class MoveBomb extends Script {

    //平移相关
    @mw.Property({ group: "平移设置", displayName: "速度" })
    private move_Speed: Vector = Vector.zero;
    @mw.Property({ group: "平移设置", displayName: "运动方式", selectOptions: { "世界轴向": "0", "本地轴向": "1" } })
    private moveType: string = "0";
    @mw.Property({ group: "平移设置", displayName: "首次启用延时时间" })
    private move_DelayTime: number = 0;
    @mw.Property({ group: "平移设置", displayName: "到达后重生时间" })
    private move_RestartTime: number = 0;
    @mw.Property({ group: "平移设置", displayName: "单程运动时间" })
    private move_MoveTimer: number = 0;
    @mw.Property({ group: "平移设置", displayName: "到达终点后消失特效" })
    private move_EndEffectID: number = 0;

    @mw.Property({ group: "炸弹设置", capture: true, displayName: "触发器Guid" })
    private triggerGuid: string = "";
    @mw.Property({ group: "炸弹设置", displayName: "受击恢复表Id" })
    public hitRecoverId: number = 10001;
    @mw.Property({ group: "炸弹设置", displayName: "爆炸特效表id" })
    public effectId: number = 10001;
    @mw.Property({ group: "炸弹设置", displayName: "爆炸半径" })
    public bombRadius: number = 100;
    @mw.Property({ group: "炸弹设置", displayName: "显示爆炸半径" })
    public showBombRadius: boolean = true;
    @mw.Property({ group: "炸弹设置", displayName: "自动激活时间" })
    public reActiveTime: number = 0;

    @mw.Property({ displayName: "向上的额外冲量,当最终计算方向水平的时候会额外加上这个力" })
    public _addUpForce: number = 0;
    // @mw.Property({ displayName: "径向力大小——地面" })
    // public _force: number = 1000;
    // @mw.Property({ displayName: "径向力大小——空中" })
    // public _forceAir: number = 1000;
    @mw.Property({ displayName: "是否需要显示受到攻击方向" })
    public _needShowDir: boolean = false;
    @mw.Property({ displayName: "纵向角度固定" })
    public _useUpAngle: boolean = true;
    @mw.Property({ displayName: "纵向角度大小", tooltip: "大于0朝上，小于0朝下" })
    public _upAngle: number = 10;

    /**炸弹是否启用 */
    @mw.Property({ hideInEditor: true, replicated: true })
    private bombActive: boolean = false;

    /**移动控制脚本 */
    private moveRepeatUpdate: MoveUpdateRepeat = null;

    private activeTimer: number = -1;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (this.isRunningClient()) {
            this.initClient();
        } else {
            this.initServer();
        }
    }

    private initServer() {
        // 有速度才会移动
        if (!this.move_Speed.equals(Vector.zero)) {
            this.moveRepeatUpdate = new MoveUpdateRepeat(this.gameObject,
                this.move_Speed,
                this.move_MoveTimer,
                this.moveType as MoveType,
                this.move_DelayTime,
                this.move_RestartTime);
            this.moveRepeatUpdate.onRestart.add(this.onRestart);

            if (this.move_EndEffectID != 0) {
                this.moveRepeatUpdate.onMoveEnd.add(this.onMoveEnd);
            }
        }
        this.useUpdate = true;
        this.bombActive = true;
        this.activeTimer = -1;
    }

    private async initClient() {
        let trigger: Trigger = await GameObject.asyncFindGameObjectById(this.triggerGuid) as Trigger;
        if (!trigger) {
            return;
        }
        trigger.onEnter.add(this.onEnter);
    }

    private onRestart = () => {
        this.bombActive = true;
        // this.gameObject.setVisibility(PropertyStatus.On, true);
    }
    private onMoveEnd = () => {
        this.bombActive = false;
        GameComUtils.playEffectOnPos(this.gameObject.worldTransform.position, this.move_EndEffectID);
    }
    private onEnter = (obj: GameObject) => {
        if (!this.bombActive) {
            // 未激活
            return
        }
        if (!obj || (obj instanceof Character) == false) {
            return;
        }

        let isAi = AIManager_C.Instance.checkIsAiById(obj.gameObjectId);
        if (isAi || GameComUtils.check_isLocalPlayer(obj)) {
            // AI或者是本地玩家触发
            this.createBomb_C();

        }
    }

    /**
     * 客户端激活一个圆形检测范围，检测自身AI
     */
    @RemoteFunction(mw.Client)
    private createBomb_C() {
        this.createBomb_S();

        let objs = QueryUtil.sphereOverlap(this.gameObject.worldTransform.position, this.bombRadius, this.showBombRadius);
        // 客户端只检测AI。
        for (let i = 0; i < objs.length; i++) {
            if ((objs[i] instanceof Character) == false) {
                continue;
            }
            let char = objs[i] as Character;
            let isAi = AIManager_C.Instance.checkIsAiById(objs[i].gameObjectId);
            if (isAi) {
                // 击中AI
                let downForce = char.velocity;
                if (!downForce) return;
                const forceDir = this.getDirection(this.gameObject.worldTransform.position, char.worldTransform.position, this.getAddPower(char), this._upAngle, this._useUpAngle);
                forceDir.z -= downForce.z;
                // Event.dispatchToLocal("Npc.Impluse", char, forceDir,);
                Event.dispatchToLocal("HIT_RECOVER_Npc", char, forceDir, this.hitRecoverId);
                char.addImpulse(forceDir, true);
                continue;
            }
        }
    }


    /**
     * 服务器检测玩家
     * @param player 
     */
    @RemoteFunction(mw.Server)
    private createBomb_S() {
        if (!this.bombActive) {
            return;
        }
        this.bombActive = false;

        this.gameObject.setVisibility(PropertyStatus.Off, true);

        this.playVolume();

        GameComUtils.playEffectOnPos(this.gameObject.worldTransform.position, this.effectId);

        if (this.reActiveTime > 0) {
            this.activeTimer = TimeUtil.elapsedTime() + this.reActiveTime;
        }

        let objs = QueryUtil.sphereOverlap(this.gameObject.worldTransform.position, this.bombRadius);
        console.log('guan log objs', objs.length);
        for (let i = 0; i < objs.length; i++) {
            if ((objs[i] instanceof Character) == false) {
                continue;
            }
            // 击中玩家
            this.hitPlayer((objs[i] as Character).player);
        }
    }

    @RemoteFunction(mw.Client)
    private hitPlayer(player: mw.Player) {
        let char = Player.localPlayer.character;
        let forceDir = this.getDirection(this.gameObject.worldTransform.position, char.worldTransform.position.clone(), this.getAddPower(char), this._upAngle, this._useUpAngle);

        console.log('guan log HIT_RECOVER');
        // 冲量和力都在对应状态处理
        Event.dispatchToLocal("HIT_RECOVER", forceDir, this.hitRecoverId);
        // char.addImpulse(forceDir, true);
    }

    private getAddPower(char: Character) {
        // if (char.isJumping) {
        //     return this._forceAir;
        // }
        // return this._force;
        return 1;
    }


    /**
 * 返回力的方向（始终不会朝下）
 * @param from 
 * @param to 
 * @param scale 
 */
    private getDirection(from: mw.Vector, to: mw.Vector, scale: number = 1, offAngle: number, useOffAngle: boolean): mw.Vector {
        if (to) {

            if (useOffAngle) {
                if (to.z < from.z) to.z = from.z + mw.Vector.distance(from, to) * Math.sin(offAngle * Math.PI / 180);
            }
            to.subtract(from);
            to.normalize();
            to.multiply(scale);
            if (Vector.dot(to, Vector.up) == 0 && Player.localPlayer.character && !Player.localPlayer.character.isJumping) {
                to.add(new Vector(0, 0, this._addUpForce));
            }
            return to;
        }
        return Vector.zero;
    }

    @RemoteFunction(mw.Client, mw.Multicast)
    private playVolume() {
        let dataInfo = GameConfig.HitRecover.getElement(this.hitRecoverId);
        if (!dataInfo || !dataInfo.SoundId) {
            return;
        }
        GameComUtils.play3DSoundByCfg(dataInfo.SoundId, this.gameObject.worldTransform.position);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (this.moveRepeatUpdate != null) {
            this.moveRepeatUpdate.update(dt);
        }

        if (this.activeTimer != -1 && TimeUtil.elapsedTime() > this.activeTimer) {
            this.bombActive = true;
            this.activeTimer = -1;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.moveRepeatUpdate = null;
    }
}