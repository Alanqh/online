
import { GameConfig } from "../../../config/GameConfig";
import WeaponAimPanel_Generate from "../../../ui-generate/Weapon/WeaponAimPanel_generate";
import { InputManager, TouchData } from "../../../utils/InputManager";
import { utils } from "../../../utils/uitls";

export class P_Ami extends WeaponAimPanel_Generate {

    /**检查是否点击的是攻击按钮 */
    private refAttackInPoints: mw.Vector[] = [mw.Vector.zero, mw.Vector.zero, mw.Vector.zero];

    /**是否点击攻击按钮 */
    private isClickAttack: boolean = false;
    /**当前ui的显示 */
    private isVisiable: boolean = false;

    /**攻击事件 */
    public onAttack: mw.Action = new mw.Action();

    onStart() {
        this.mBtn_Shoot.enable = false;
        InputManager.instance.onPressTouch.add((data: TouchData) => {
            if (data.event == mw.TouchInputType.TouchBegin && !this.isClickAttack && this.isVisiable) {
                if (this.checkAttack(data.x, data.y, this.mCanvas_Shoot, this.refAttackInPoints)) {
                    this.isClickAttack = true;
                    this.setBtnColor(true);
                }
            }
        });

        InputManager.instance.onReleaseTouch.add((data: TouchData) => {

            if (data.event == mw.TouchInputType.TouchEnd && this.isClickAttack && this.isVisiable) {
                this.onAttack.call();
                console.warn(`lwj onAttack.call()`);
                this.setBtnColor(false);
                this.isClickAttack = false;
            }
        })
    }
    protected onShow(...params: any[]): void {
        this.isVisiable = true;
        this.isClickAttack = false;
    }

    onHide() {
        this.isVisiable = false;
    }

    /**
     * 设置按钮颜色
     */
    setBtnColor(isPress: boolean) {
        this.mImg_Shoot.imageColor = isPress ? mw.LinearColor.colorHexToLinearColor("#FFDCDC") : mw.LinearColor.colorHexToLinearColor("#FFFFFF");
    }


    /**
       * 判断是否按下了某个按钮按钮
       */
    private checkAttack(x: number, y: number, objUI: mw.Canvas, refPoints: mw.Vector[]) {
        if (this.uiObject == null || objUI == null) return false;
        if (objUI.visible == false) return false;
        let absoluteSize = objUI.tickSpaceGeometry.getAbsoluteSize();
        let uiLocalPosition = mw.Vector2.zero;
        uiLocalPosition.x = x;
        uiLocalPosition.y = y;
        mw.localToViewport(objUI.tickSpaceGeometry, mw.Vector2.zero, refPoints[0], refPoints[2]);
        mw.localToViewport(this.uiObject.tickSpaceGeometry, uiLocalPosition, refPoints[2], refPoints[1]);
        return refPoints[1].x > refPoints[0].x && refPoints[1].y > refPoints[0].y
            && refPoints[1].x < (refPoints[0].x + absoluteSize.x) && refPoints[1].y < (refPoints[0].y + absoluteSize.y);
    }
    /**
     * 设置准心类型
     * @param isNormal 是否是普通瞄准
     */
    setAmiType(isNormal: boolean) {
        this.mImage_commonAimType.visibility = isNormal ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Hidden;
        this.mImage_commonAimTypeRed.visibility = isNormal ? mw.SlateVisibility.Hidden : mw.SlateVisibility.SelfHitTestInvisible;
    }

    /**
     * 设置子弹数
     */
    setBulletNum(curNum: number, maxNum: number) {
        this.mBulletCountText.text = utils.Format(GameConfig.Language.Weapon_Text_1.Value, curNum, maxNum)
    }

}