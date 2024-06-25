/** 
 * @Author       : chenxinyu
 * @Date         : 2023-08-17 16:14:24
 * @LastEditors  : chenxinyu
 * @LastEditTime : 2023-08-17 17:31:24
 * @FilePath     : \stumbleguys\JavaScripts\mgs\MGSWatch.ts
 * @Description  : 修改描述
 */
import { MGSBase } from "./MGSBase";

export class MGSWatch extends MGSBase {

    private _clickAssist: number = 0;
    private _clickSwitch: number = 0;

    /**
     * 点击点赞（10次算一次）
     */
    public onClickAssist(): void {
        this._clickAssist++;
        if (this._clickAssist == 1) {
            this.reportLog("ts_action_click", "点赞", { button: "402" });
        }
        if (this._clickAssist == 11) {
            this.reportLog("ts_action_click", "点赞10次", { button: "403" });
        }
    }

    /**
     * 点击切换
     */
    public onClickSwitch(): void {
        this._clickSwitch++;
        if (this._clickSwitch == 1) {
            this.reportLog("ts_action_click", "点切换", { button: "401" });
        }
        if (this._clickSwitch == 6) {
            this.reportLog("ts_action_click", "点切换5次", { button: "404" });
        }
    }

    /**点击返回按钮 */
    public onClickBack(button: string): void {
        this.reportLog("ts_action_click", "点击返回大厅", { button: button });
    }

    public getLikeCount() {
        return this._clickAssist;
    }

}