/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-22 16:44:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-24 19:07:31
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\faker\AimScript.ts
 * @Description  : 
 */


import { WaitLoop } from "../../utils/AsyncTool";

@Component
export default class AimScript extends Script {

    /**警告特效 */
    private warnEffect: mw.GameObject;
    /**光线 */
    private line: mw.GameObject;

    private tween: Tween<{}>;

    /**警告特效状态 脏标记*/
    public warnState: boolean = false;

    /**当前扫描到的目标 */
    public curTarget: Character;

    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            Camera.currentCamera.preset = CameraPreset.FirstPerson;
            this.warnEffect = this.gameObject.getChildByName("图标");
            // this.line = this.gameObject.getChildByName("光环");
            this.gameObject.parent = Camera.currentCamera
            this.gameObject.localTransform.position = new Vector(20, 0, 0);
            this.gameObject.localTransform.rotation = Rotation.zero;
            this.useUpdate = true;
            // this.lineTween();
        })
    }

    /**光线移动 */
    private lineTween() {
        let oriLocation = this.line.localTransform.position;
        let toLocation = new Vector(oriLocation.x, oriLocation.y, oriLocation.z + 1200)
        this.tween = new Tween({ pos: oriLocation })
            .to({ pos: toLocation })
            .duration(1000)
            .onUpdate((val) => {
                this.line.localTransform.position = val.pos;
            })
            .yoyo(true)
            .repeat(Infinity)
            .start()
    }

    /**扫描伪人 */
    private scanFaker() {
        let forward = Camera.currentCamera.worldTransform.getForwardVector().normalize()
        let startPos = Vector.add(Camera.currentCamera.worldTransform.position, forward.multiply(50));
        let endPos = Vector.add(startPos, forward.multiply(600))
        let hitResult = QueryUtil.boxTrace(startPos, endPos, new Vector(30, 30, 30), mw.Rotation.zero, true, false);
        let target = null;
        for (let i = 0; i < hitResult.length; ++i) {
            let obj = hitResult[i].gameObject
            if (!obj) continue;
            if (obj instanceof Character) {
                if (obj.player && obj.player == Player.localPlayer) continue; //扫到自己
                if (!obj.player && obj.tag != "Faker") continue;//扫到其他怪物
                target = obj
                break;
            }
        }
        this.getTarget(target);
    }

    private getTarget(target: Character) {

        if (!target) {//丢失目标
            if (this.curTarget && !this.curTarget.isDestroyed) {
                this.curTarget?.setOutline(false, LinearColor.white, 0.3);
            }
            this.curTarget = null;
        } else {//扫描到目标
            if (!this.curTarget) {
                this.curTarget = target;
                this.curTarget?.setOutline(true, LinearColor.white, 0.3);
            } else {
                //切换目标
                if (this.curTarget != target) {
                    this.curTarget?.setOutline(false, LinearColor.white, 0.3);
                    target?.setOutline(true, LinearColor.white, 0.3);
                    this.curTarget = target
                }
            }
        }
        this.curTarget = target;
    }


    protected onUpdate(dt: number): void {
        TweenUtil.TWEEN.update();
        this.scanFaker();
    }

    protected onDestroy(): void {
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
        if (this.curTarget && !this.curTarget.isDestroyed) {
            this.curTarget?.setOutline(false, LinearColor.white, 0.3);
        }
    }

}