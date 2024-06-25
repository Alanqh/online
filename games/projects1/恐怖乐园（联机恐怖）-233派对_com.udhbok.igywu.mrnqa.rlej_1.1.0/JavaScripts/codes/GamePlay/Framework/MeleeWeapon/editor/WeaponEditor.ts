import { GMBasePanelUI } from "../../../../common/gm/GmUI";
import { SkillRectCheck } from "../SkillRectCheck";
import Weapon from "../Weapon";
import { WeaponData } from "../WeaponDef";
import { WeaponManager } from "../WeaponManager";
import { UIAnimationEditor } from "./UIAnimationEditor";

@Component
export default class WeaponEditor extends Script {
    @Property({})
    isEditorMode: boolean = false;

    // 冷兵器实例
    private testWeapon: Weapon = null;
    // 当前连击时间
    private curComboTime: number = 0;
    // 结束蓄力回调
    private _endChargeResolve: (chargeTime: number) => void = null;
    private _startChargeTime: number = 0;

    public animationJson: string[] = null;

    public weaponIndex = 0;

    public static instance: WeaponEditor;

    tempSpeed: number = null;

    get weapon() {
        return this.testWeapon;
    }
    /** 获取当前连击时间 */
    public getCurComboTime(): number {
        return this.curComboTime;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        WeaponEditor.instance = this;
        this.start()
    }

    start() {
        SkillRectCheck.showRect = true;
        setTimeout(() => {
            WeaponData.getWeaponJson = () => {
                console.log("getWeaponJson", WeaponEditor.instance.animationJson);
                return WeaponEditor.instance.animationJson;
            }
        }, 1000);

        if (SystemUtil.isClient()) {
            // 显示冷兵器编辑器
            UIService.show(UIAnimationEditor);
            console.log("显示冷兵器编辑器");
            setTimeout(() => {
                UIService.hideUI(GMBasePanelUI.instance["_view"]);
            }, 1000);
        }
    }

    onReleaseBtn() {
        if (this._endChargeResolve) {
            this._endChargeResolve(Date.now() - this._startChargeTime);
            this._startChargeTime = 0;
            this._endChargeResolve = null;
        }
    }

    /**
     * 播放动画
     * @param animationJson 动画数据
     */
    public async playAnimation_attack(animationJson: string[], weaponGuid: string, slot: number) {
        this.animationJson = animationJson;
        // 本地冷兵器实例没初始化，则初始化
        let player = await Player.asyncGetLocalPlayer();
        if (this.testWeapon == null) {
            let weapon = await WeaponManager.GetInstance().client_AsyncGetWeapon(player.character, player, 0);
            this.testWeapon = weapon;
        }
        // 如果传入了动画数据，则覆盖

        this.testWeapon.syncEff = true;

        if (animationJson.length > 0) {
            console.log("playAnimation_attack", this.animationJson)
            await this.testWeapon.reWriteAnimationByParams();
        }

        // // 佩戴装备

        this.testWeapon.equipWeapon_Hand(weaponGuid, slot == 1);
        this.testWeapon.equipWeapon_Hand("", slot != 1);


        let onHitCall = (hitObjs: mw.GameObject[]) => {
            console.error("击中目标数量 : " + hitObjs.length, hitObjs.map(go => go.gameObjectId + this.name));
            hitObjs.forEach(async e => {

            })
        }
        console.error("开始播放动画");
        //开始播放动画
        //播放 第 1 个动画 索引为 0，因为这里可能会有多个动画
        this.testWeapon.playAnimation(0,
            //播放完成
            (curActionIndex: number, maxIndex: number) => {
                this.curComboTime = 0;

            },
            //到达打击点
            (curActionIndex: string, maxIndex: number, hitObjs: mw.GameObject[]) => {
            }
            ,
            //可以开始combo
            (milSec: number) => {
                this.curComboTime = milSec;

            },
            //蓄能
            (curIndex: number, maxIndex: number, endChargeResolve: (chargeTime: number) => void) => {

                // 开始蓄能
                // 使用上方监听的函数 
                console.error("开始蓄能", curIndex, maxIndex);
                this._startChargeTime = Date.now();
                this._endChargeResolve = endChargeResolve;
            }, null, null);
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

