/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-21 11:04:29
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-28 18:25:04
 * @FilePath     : \2DCamera\Prefabs\CameraEditor\Script\Setting.ts
 * @Description  : 修改描述
 */
import { KeyAction } from "./KeyAction";

export namespace Setting {
    // TODO 按键映射 希望改为配置文件
    export const keyActionMap: Map<KeyAction, mw.Keys> = new Map([
        [KeyAction.CameraForward, mw.Keys.W],
        [KeyAction.CameraBack, mw.Keys.S],
        [KeyAction.CameraLeft, mw.Keys.A],
        [KeyAction.CameraRight, mw.Keys.D],
        [KeyAction.CameraUp, mw.Keys.Q],
        [KeyAction.CameraDown, mw.Keys.E],
        [KeyAction.KeyFrame, mw.Keys.K],
        [KeyAction.ChangeView, mw.Keys.F8],
        [KeyAction.Back2LastFrame, mw.Keys.F4],
        [KeyAction.PlayKeyFrames, mw.Keys.F5],
        [KeyAction.PlayKeyFramesFromStart, mw.Keys.F6],
        [KeyAction.StopKeyFrames, mw.Keys.F7],
        [KeyAction.SaveAnim, mw.Keys.F1],
        [KeyAction.ReadAnim, mw.Keys.F2],
        [KeyAction.ClearAnim, mw.Keys.F12],
        [KeyAction.HoldSpeedup, mw.Keys.LeftAlt],
        [KeyAction.DelKeyFrame, mw.Keys.Delete],
    ]);

}