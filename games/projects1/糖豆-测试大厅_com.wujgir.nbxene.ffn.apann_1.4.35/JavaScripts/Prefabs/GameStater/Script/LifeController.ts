/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 17:55:25
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-22 18:15:02
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\LifeController.ts
 * @Description  : 修改描述
 */
import { BGMHelper } from "../../../tool/BGMScript";
import { FootStepHelper } from "../../../tool/FootStepTrigger";
import { TeamManager } from "./TeamManager";

@Component
export default class LifeController extends mw.Script {

    protected onStart(): void {
        this.useUpdate = true;
        if (SystemUtil.isClient()) {
            FootStepHelper.init();
        }
    }

    protected onUpdate(dt: number): void {
        TweenUtil.TWEEN.update();
        if (SystemUtil.isClient() && dt > 5) {
            Event.dispatchToLocal("Eliminate_Self_Character");
        }
        // this.fsm && this.fsm.update(dt);
        TeamManager.onUpdate(dt);
        if (SystemUtil.isClient()) {
            BGMHelper.onUpdate(dt);
            FootStepHelper.onUpdate(dt);
        }
    }
}