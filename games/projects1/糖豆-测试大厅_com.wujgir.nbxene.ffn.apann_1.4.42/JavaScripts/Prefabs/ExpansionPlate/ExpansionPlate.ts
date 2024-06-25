/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-10-10 18:08:13
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-10-11 10:59:57
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\ExpansionPlate\ExpansionPlate.ts
 * @Description  : 修改描述
 */
import { ZwtTween } from "../../tool/ZwtTween";
import CommonTrigger from "../CommonTrigger";

@Component
export default class ExpansionPlate extends CommonTrigger {
    @mw.Property({ displayName: "缩放大小" })
    scaleSize: Vector = Vector.one

    @mw.Property({ displayName: "缩放时间" })
    scaleTime: number = 1

    @mw.Property({ displayName: "缩放对象guid", capture: true })
    expansionObjGuid: string = ""

    @mw.Property({ displayName: "特效guid", capture: true })
    effectObjGuid: string = ""

    /**是否激活 */
    private _isActive: boolean = false
    private _expansionObj: mw.GameObject = null
    private _effectObj: mw.Effect = null

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        super.onStart()
        GameObject.asyncFindGameObjectById(this.expansionObjGuid).then((obj) => {
            this._expansionObj = obj
        })
        GameObject.asyncFindGameObjectById(this.effectObjGuid).then((obj: mw.Effect) => {
            this._effectObj = obj
        })
    }

    triggerEnterCharacter(character: Character): void {
        if (!this._expansionObj || !this._effectObj) return
        if (!this._isActive && character.getVisibility()) {
            this._isActive = true
            this.active()
        }
    }

    active() {
        this._effectObj.play()
        new ZwtTween(this._expansionObj)
            .scaleTo(this.scaleSize, this.scaleTime)
            .call(() => {
                this._effectObj.forceStop()
            })
            .start()
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}