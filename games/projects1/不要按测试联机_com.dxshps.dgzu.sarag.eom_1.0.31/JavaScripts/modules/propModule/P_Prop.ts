import { GameConfig } from "../../config/GameConfig";
import { IToolStatElement } from "../../config/ToolStat";
import Tool_Generate from "../../ui-generate/Tool_generate";
import GameComUtils from "../../utils/GameComUtils";
import MGSHome from "../mgsModule/MGSHome";
import { PropModuleC } from "./PropModuleC";
import { PropAimType } from "./PropUtils";

export class P_Prop extends Tool_Generate {
    /**是否取消拖拽 */
    private _isCancel: boolean = false;
    /**道具配置 */
    private _propCfg: IToolStatElement;
    /**道具使用次数 */
    private _propCount: number = 0;
    /**是否使用了（仅记录二次点击） */
    private _isUse: boolean = false;
    private dtTime: number = 0.1;
    private againTime: any = null;

    private canUse: boolean = false;
    //首次点击位置
    private startv2: Vector2 = null;
    private propModule: PropModuleC;
    private joyStick: JoyStick;
    public index: number = 0;

    protected onStart() {
        this.propModule = ModuleService.getModule(PropModuleC);
        this.joyStick = new JoyStick(this);
    }

    onShow() {
        this.joyStick.canTouch(true);
        this.resetJoyStick();
    }

    onHide() {
        this.joyStick.canTouch(false);
    }

    /**初始化道具拾取 */
    public initPackData(propId: number) {
        this._isUse = false;
        this._propCfg = GameConfig.ToolStat.getElement(propId);
        this._propCount = this._propCfg.count;
        this.mImage_JoystickBG.visibility = SlateVisibility.Collapsed;// 隐藏摇杆背景图
        this.mImage_JoystickBG2.visibility = SlateVisibility.Collapsed;// 隐藏摇杆背景图
        // this.mJoystick_Tool.visibility = SlateVisibility.Visible;// 显示摇杆
        this.mCanvas_Cancel.visibility = SlateVisibility.Collapsed;// 隐藏摇杆取消
        this.mCanvas_TipTimer.visibility = SlateVisibility.Collapsed;// 隐藏魔方道具遮罩
        this.mImage_ToolBG.setImageColorByHex(this._propCfg.color);
        this.mImage_ToolIcon.imageGuid = this._propCfg.icon;
        this.mCanvas_TipCount.visibility = this._propCount > 1 ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.mText_Count.text = this._propCount.toString();
        this.mText_ToolName.text = this._propCfg.name;
    }

    /**
     * 按下摇杆事件
     */
    public onJoyStickDown() {
        this.canUse = this.propModule.getCanUseProp();
        if (!this.canUse) return;
        this.propModule.propDrawStart();// 通知道具开始瞄准
        this.setAimCancel(false);
        this.mCanvas_Cancel.visibility = SlateVisibility.SelfHitTestInvisible;// 显示摇杆取消
        this.mImage_JoystickBG.visibility = SlateVisibility.SelfHitTestInvisible;
        this.mImage_JoystickBG2.visibility = SlateVisibility.SelfHitTestInvisible;
        this.startv2 = null;
        this.propModule.changePropArea(true);
    }


    /**
     * 摇杆拖动
     * @param v 
     */
    public onInputDir(v: Vector2) {
        v.set(v.normalized.x, -v.normalized.y);
        if (this._propCfg.aimType == PropAimType.None) return;
        if (!this.canUse) return;
        if (this._propCfg.secondUse && this._isUse) return;
        if (!this.startv2) { this.startv2 = v.clone() };
        let bool = v.x == this.startv2.x && v.y == this.startv2.y;
        this.propModule.propDrawMove(bool ? Vector2.unitY : v, this._propCfg.projectionDensity, bool);
    }

    /**
     * 抬起摇杆方法
     */
    public onJoyStickUp() {
        if (!this.canUse) return;
        this.canUse = false;
        this.mImage_JoystickBG.visibility = SlateVisibility.Collapsed;
        this.mImage_JoystickBG2.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Cancel.visibility = SlateVisibility.Collapsed;// 隐藏摇杆取消
        //取消预测
        if (this._propCfg.aimType != PropAimType.None) {
            this.propModule.drawCancel();
        }
        if (this._isCancel) {
            this.setAimCancel(false);
            this.resetJoyStick();
            return;
        }
        // 通知道具使用
        this.useProp();
        this.resetJoyStick();
    }

    // 修改拖拽UI背景颜色
    public setAimCancel(isCancel: boolean) {
        this._isCancel = isCancel;
        this.mCanvas_Cancel.renderOpacity = isCancel ? 1 : 0.5;
        let color = GameConfig.Global.getElement(isCancel ? 70002 : 70001).string_Value;
        this.mImage_JoystickBG.setImageColorByHex(color);
        this.mImage_JoystickBG2.setImageColorByHex(color);
    }

    //使用道具
    private useProp() {
        // 需要二次点击
        if (this._propCfg.secondUse) {
            if (this._isUse) {
                this.setBtnCD();
                this.propModule.propUseAgain();//二次使用
                this.clearPropUI();
                GameComUtils.play2DSoundByCfg(this._propCfg.hitSound);
                return
            }
            GameComUtils.play2DSoundByCfg(this._propCfg.useSound);
            this._isUse = true;
            this.propModule.propDrawEnd();//结束预测(使用道具)
            this.showPropAgain();//二次使用表现
            return
        }
        GameComUtils.play2DSoundByCfg(this._propCfg.useSound);
        // 直接使用
        this.setBtnCD();
        this.propModule.propDrawEnd();//结束预测(使用道具)
        this._propCount--;
        this.mText_Count.text = this._propCount.toString();
        if (this._propCount <= 0) {
            this.clearPropUI();
        }
    }

    //道具使用内置cd
    private setBtnCD() {
        this.joyStick.setBtnCD();
    }

    //二次使用表现
    private showPropAgain() {
        this.mMask_Timer.fanShapedValue = 0;
        this.mCanvas_TipTimer.visibility = SlateVisibility.SelfHitTestInvisible;
        let value = 0;
        this.againTime = TimeUtil.setInterval(() => {
            value += this.dtTime;
            this.mMask_Timer.fanShapedValue = value / this._propCfg.time;
            if (value >= this._propCfg.time) {
                this.clearPropUI();
            }
        }, this.dtTime);
    }


    //清除道具UI
    public clearPropUI(isHide: boolean = true) {
        this.canUse = false;
        this.startv2 = null;
        if (this.againTime) {
            TimeUtil.clearInterval(this.againTime);
            this.againTime = null;
        }
        this.mCanvas_TipTimer.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Cancel.visibility = SlateVisibility.Collapsed;
        this.resetJoyStick();
        this.mImage_JoystickBG.visibility = SlateVisibility.Collapsed;
        this.mImage_JoystickBG2.visibility = SlateVisibility.Collapsed;
        if (this._isUse || isHide) {
            this.mCanvas_TipCount.visibility = SlateVisibility.Collapsed;
            UIService.hideUI(this);
        }
        this._isUse = false;
    }

    //重置摇杆
    private resetJoyStick() {
        this.propModule.changePropArea(false);
        this.joyStick.resetJoy();
    }
}

class JoyStick {
    //模拟摇杆
    private _toucher: mw.TouchInput;
    private _touchBegin: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void
    private _touchMove: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void
    private _touchEnd: (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => void
    //道具UI
    private propUI: P_Prop;
    //摇杆控件属性
    private joyBgPos: mw.Vector2; //背景位置
    private joyBgSize: mw.Vector2; //背景大小
    private centrePos: mw.Vector2; //摇杆中心锚点位置
    //取消释放
    private cancelPos: mw.Vector2; //取消位置
    private cancelSize: mw.Vector2; //取消大小

    private joyCD: boolean = true;
    /**是否按下 */
    private isDown: boolean = false;

    constructor(propUI: P_Prop) {
        this.propUI = propUI;
        this.initJoyStick();
    }

    private initJoyStick() {
        this.joyBgPos = this.propUI.mImage_JoystickBG.position;
        this.joyBgSize = this.propUI.mImage_JoystickBG.size;
        this.centrePos = new Vector2(this.propUI.mImage_JoyCentre.position.x + this.propUI.mImage_JoyCentre.size.x / 2, this.propUI.mImage_JoyCentre.position.y + this.propUI.mImage_JoyCentre.size.y / 2);

        this.cancelPos = this.propUI.mCanvas_Cancel.position;
        this.cancelSize = this.propUI.mCanvas_Cancel.size;
        //触摸事件
        this._toucher = new mw.TouchInput();
        this._touchBegin = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
            if (!this.joyCD) return;
            if (!this.getInJoy(mw.screenToWidgetLocal(this.propUI.mCanvas_Joystick.tickSpaceGeometry, location))) return;
            this.isDown = true;
            this.propUI.onJoyStickDown();
        }
        this._touchMove = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
            if (!this.joyCD || !this.isDown) return;
            let moveV2 = mw.screenToWidgetLocal(this.propUI.mCanvas_Joystick.tickSpaceGeometry, location).clone().subtract(this.centrePos.clone());//点击向量
            this.changeJoyStickPos(mw.screenToWidgetLocal(this.propUI.mCanvas_Joystick.tickSpaceGeometry, location), moveV2);
            this.propUI.onInputDir(moveV2);
            this.propUI.setAimCancel(this.getInCancel(mw.screenToWidgetLocal(this.propUI.mCanvas_Joystick.tickSpaceGeometry, location)) ? true : false);
        }
        this._touchEnd = (index: number, location: mw.Vector2, touchType: mw.TouchInputType) => {
            if (!this.joyCD || !this.isDown) return;
            this.isDown = false;
            this.propUI.onJoyStickUp();
        }
    }

    //是否按下摇杆
    private getInJoy(v: Vector2) {
        if (v.x < this.joyBgPos.x || v.x > (this.joyBgPos.x + this.joyBgSize.x)) return false;
        if (v.y < this.joyBgPos.y || v.y > (this.joyBgPos.y + this.joyBgSize.y)) return false;
        return true;
    }

    //是否滑动到取消位置
    private getInCancel(v: Vector2) {
        if (v.x < this.cancelPos.x || v.x > (this.cancelPos.x + this.cancelSize.x)) return false;
        if (v.y < this.cancelPos.y || v.y > (this.cancelPos.y + this.cancelSize.y)) return false;
        return true;
    }

    //是否开启触摸事件
    public canTouch(bool: boolean) {
        if (bool && !this.propUI.visible) return;
        if (bool) {
            this._toucher.onTouchBegin.add(this._touchBegin);
            this._toucher.onTouchMove.add(this._touchMove);
            this._toucher.onTouchEnd.add(this._touchEnd);
        } else {
            this._toucher.onTouchBegin.remove(this._touchBegin);
            this._toucher.onTouchMove.remove(this._touchMove);
            this._toucher.onTouchEnd.remove(this._touchEnd);
        }
    }

    //修改中心图片位置
    private changeJoyStickPos(touchPos: Vector2, moveV2?: Vector2) {
        if (!moveV2) {
            this.propUI.mImage_JoyCentre.position = this.getJoyCentrePos(touchPos);
            return;
        }
        let maxPos = moveV2.normalized.multiply(this.propUI.mImage_JoystickBG.size.x / 2);
        if (moveV2.length > maxPos.length) {
            touchPos = this.centrePos.clone().add(maxPos);
        }
        this.propUI.mImage_JoyCentre.position = this.getJoyCentrePos(touchPos);
    }

    //获取中心图位置
    private getJoyCentrePos(v: Vector2) {
        v = v.set(v.x - this.propUI.mImage_JoyCentre.size.x / 2, v.y - this.propUI.mImage_JoyCentre.size.y / 2);
        return v;
    }

    //重置摇杆
    public resetJoy() {
        this.changeJoyStickPos(this.centrePos.clone());
        this.isDown = false;
        Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationControl;
    }

    public async setBtnCD() {
        this.joyCD = false;
        await TimeUtil.delaySecond(0.5);
        this.joyCD = true;
    }



}