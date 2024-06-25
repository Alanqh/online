/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-09 10:48:25
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-11-09 10:51:44
 * @FilePath     : \petparty\JavaScripts\modules\hudModule\ui\P_BaseControl.ts
 * @Description  : 修改描述
 */
import { oTrace } from "odin";
import { GameEventC2C } from "../../../const/GameCommonEvent";
import BasicControl_Generate from "../../../ui-generate/BasicControl_generate";

export default class P_BaseControl extends BasicControl_Generate {
    public onJoyStickInput: Action1<Vector2> = new Action1<Vector2>();
    public onRestBtn: Action = new Action();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.layer = UILayerScene;
        this.initAction();
    }

    private initAction() {
        this.mVirtualJoystickPanel.onInputDir.add(v => {
            this.onJoyStickInput.call(v);
        })
        this.mBtn_Reset.onClicked.add(() => {
            // 回到上一个存储点
            oTrace('guan log 回到上一个存储点');
            Event.dispatchToLocal(GameEventC2C.GAME_RESET_PLAYER_POS_C2C)
        })
    }

    isHideJoyStick() {
        this.mCanvas_Reset.visibility = SlateVisibility.Collapsed;
        this.mVirtualJoystickPanel.visibility = SlateVisibility.Hidden;
    }

    onShow() {
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    onHide() {
        this.mVirtualJoystickPanel.resetJoyStick();
    }

     //是否取消摄像机滑动
     public isCancelCameraMove(isCancel: boolean) {
        this.mTouchPad.enable = !isCancel;
    }

}