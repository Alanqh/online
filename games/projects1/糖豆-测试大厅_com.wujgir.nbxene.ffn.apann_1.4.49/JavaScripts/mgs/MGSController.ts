/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-03-29 16:13:16
 * @LastEditors  : zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime : 2023-03-29 16:27:05
 * @FilePath     : \stumbleguys\JavaScripts\mgs\MGSController.ts
 * @Descripttion : 
 */
import { MGSBase } from "./MGSBase";

export class MGSController extends MGSBase {
    /**
     * 玩家跳跃飞扑埋点
     * @param step 
     */
    public controllerType(button: string) {
        this.reportLog("ts_action_click", "玩家点击跳跃按钮", { button: button})
    }
}