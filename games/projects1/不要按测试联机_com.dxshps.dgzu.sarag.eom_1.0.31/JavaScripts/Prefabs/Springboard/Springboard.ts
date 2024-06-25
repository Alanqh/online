import { oTrace, oTraceError } from "odin";

@Component
export default class Springboard extends Script {

    @mw.Property({ displayName: "冲量" })
    private impluse: number = 2700;

    @mw.Property({ displayName: "不可操作时间" })
    private inoperableTime: number = 1.2;

    @mw.Property({ displayName: "不可操作时间" })
    private coolTime: number = 1;

    private _trigger: mw.Trigger;
    private _moveModel: GameObject;
    private isRuning: boolean = false;

    //准备击飞的玩家
    private _chaList: Character[] = [];

    //正在击飞的玩家
    private _passCha: Character[] = []

    private myTween: Tween<any>;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) return;
        this._trigger = this.gameObject as mw.Trigger;
        this._trigger.onEnter.add((cha) => {
            if (cha instanceof mw.Character && this._passCha.indexOf(cha) == -1) {
                this._chaList.push(cha);
                this._passCha.push(cha);
                if (!this.isRuning) {
                    this.launch();
                }
            }
        });
        this._moveModel = this.gameObject.parent?.getChildByName("moveObject");
        if (!this._moveModel) {
            oTraceError("===============>>>>> 跳板预制体，可动的板子没找到");
        }
    }

    launch() {
        this.isRuning = true;
        for (let i = 0; i < this._chaList.length; i++) {
            const cha = this._chaList[i];
            oTrace('guan log 修改fsm');
            // PlayerCtrlMgr.ins['actionFSM'].forceToStand()
            cha.addImpulse(this.gameObject.worldTransform.getForwardVector().add(Vector.up).normalize().multiply(this.impluse).subtract(cha.velocity), true);
            Event.dispatchToLocal("Swoop.Blocker.Enter", cha, 1);
            cha.movementEnabled = false;
            setTimeout(() => {
                const index = this._passCha.indexOf(cha)
                if (index > -1) {
                    this._passCha.splice(index, 1);
                }
                Event.dispatchToLocal("Swoop.Blocker.Leave", cha)
                cha.movementEnabled = true;
                cha.driftControl = 1;
            }, this.inoperableTime * 1000);
        }
        this._chaList = [];

        if (!this._moveModel) return;

        const tempRot = new Rotation();
        this.myTween = new Tween({ y: 0 }).to({ y: -60 }, this.coolTime / 2 * 1000).onUpdate(o => {
            tempRot.y = o.y;
            this._moveModel.localTransform.rotation = tempRot;
        }).repeat(1).yoyo(true).start().onComplete(() => {
            if (this._chaList.length > 0) {
                setTimeout(() => {
                    this.launch();
                }, 200);
            } else {
                this.isRuning = false;
            }
        });
    }

    protected onDestroy(): void {
        if (this.myTween) {
            this.myTween.stop();
            this.myTween = null;
        }
    }
}