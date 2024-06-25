import { ArchiveData } from "../../archive/ArchiveHelper";
import { BoardHelper } from "../../blackboard/BoardDefine";
import LevelBase from "../../Level/LevelBase";
import { TimeScriptTrace } from "../../time/TimeScript";
import { InterEvtData, ObjInterDefine } from "../ObjInterDefine";

@Serializable
class ConditionEvtData {
    @mw.Property({ displayName: "判断数据key" })
    public key: string = "";
    @mw.Property({ displayName: "判断数据value值" })
    public value: string = "";
    @Property({ hideInEditor: true })
    public isOk: boolean = false;
}

@Component
export default class RotLockWithCondition extends LevelBase {
    @Property({ displayName: "控制目标", capture: true })
    public captrueTarget: string = "";

    @Property({ displayName: "旋转角度" })
    public rotRate: number = 45;

    @Property({ displayName: "目标旋转角度", tooltip: "填写范围（0~360）" })
    public targetRot: number = 0;

    @Property({ displayName: "旋转速度" })
    public rotSpeed: number = 45;

    @Property({ group: "事件设置", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    @Property({ displayName: "轴" })
    public axis: string = "z";

    public isUnlocked: boolean = false;

    /** 当前的旋转量 */
    private _curRot: Rotation;

    private _targetRotZ: number = 0;

    /** 最初的旋转量 */
    private _oriRot: Rotation;

    private _tween;

    private _target: GameObject;

    @mw.Property({ group: "全局配置", displayName: "条件检测" })
    public conditionDataArr: ConditionEvtData[] = [new ConditionEvtData];
    @mw.Property({ displayName: "相等时发送的事件" })
    public equalEvtData: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ displayName: "不相等时发送的事件" })
    public unequalEvtData: InterEvtData[] = [new InterEvtData()];

    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];

    /** 是否所有条件都备好 */
    private isAllOk: boolean = false;

    protected async onLevelStart() {
        this._target = await GameObject.asyncFindGameObjectById(this.captrueTarget);
        if (!this._target) {
            console.error("目标不存在 ，无法进行旋转" + this.gameObject.gameObjectId);
            return;
        }
        this.addLocalListen("RetLock3D", (goId: string) => {
            if (goId != this.gameObject.gameObjectId) {
                return;
            }
            this.onClickHand();
        })

        this.addLocalListen(BoardHelper.BoardValueChangeEvent, (key: string, value: string) => {
            let arr = key.split("_");
            if (this.gameObject.gameObjectId == arr[1]) {
                for (let index = 0; index < this.conditionDataArr.length; index++) {
                    const element = this.conditionDataArr[index];
                    if (element.key == arr[0]) {
                        element.isOk = element.value == value;
                    }
                }
                for (let index = 0; index < this.conditionDataArr.length; index++) {
                    const element = this.conditionDataArr[index];
                    if (!element.isOk) {
                        this.isAllOk = false;
                        break;
                    }
                }
                this.isAllOk = true;
                this.checkDispatch();
            }
        })

        this.addLocalListen(BoardHelper.BoardClearEvent, () => {
            this.conditionDataArr.forEach(e => {
                e.isOk = false;
            })
        })
    }

    onReset(): void {
        if (this._oriRot) {
            this._target.localTransform.rotation = this._oriRot.clone();
            this._curRot = this._oriRot.clone();
            this._targetRotZ = this._oriRot[this.axis];
        }
        this.isUnlocked = false;
    }

    public onClickHand(): void {
        if (this.isUnlocked) {
            console.error("已经解锁了")
            return;
        }
        if (!this._target) {
            console.error("[RotLock]目标不存在")
            return;
        }
        if (!this._curRot) {
            this._oriRot = this._target.localTransform.rotation.clone();
            this._curRot = this._oriRot.clone();
            this._targetRotZ = this._curRot[this.axis];
        }
        this._targetRotZ = Math.round(this._targetRotZ + this.rotRate);
        if (this._tween) {
            this._tween.stop()
            TweenUtil.TWEEN.remove(this._tween);
            this._tween = null;
        }
        this._tween = new Tween({ rot: this._curRot[this.axis] })
            .to({ rot: this._targetRotZ }, this.rotSpeed == 0 ? 0 : this.rotRate / this.rotSpeed * 1000)
            .onUpdate((t) => {
                if (!this._target || !this._target.getVisibility()) { this._tween.stop(); return; }
                this._curRot[this.axis] = t.rot;
                this._target.localTransform.rotation = this._curRot;
            })
            .onComplete(() => {
                this.checkDispatch();       
                TweenUtil.TWEEN.remove(this._tween);
                this._tween = null;
            }).start();
    }

    private checkDispatch() {
        let curRot = this._curRot[this.axis] % 360
        if (curRot < 0) {
            curRot -= 360;
        }
        if (curRot == this.targetRot && this.isAllOk) {
            this.isUnlocked = true;
            this.save2Archive(1);
            ObjInterDefine.dispatchClientByData(this.evtDataArr, this._target.gameObjectId);
        }
    }

    onLoadData(data: ArchiveData) {
        if (!this._target) {
            console.error("[RotLock]目标不存在")
            return;
        }
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            this.isUnlocked = false;
            return;
        }
        this.isUnlocked = true;
        if (!this._curRot) {
            this._oriRot = this._target.localTransform.rotation.clone();
        }
        this._curRot = this._oriRot.clone();
        this._curRot[this.axis] = this.targetRot;
        this._target.localTransform.rotation = this._curRot;
        ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
    }
}