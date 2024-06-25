import { ActionCommon, GlobalData } from "../const/GlobalData";
import { EPlayerState } from "../const/enum";
import { SportModuleC } from "../modules/Sport/SportModuleC";
import { utils } from "../utils/uitls";


/**躲藏的触发器 单客户端 */
@Component
export default class HideTrigger extends Script {

    public onHide: Action1<boolean> = ActionCommon.onPlayerHide;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // 单客户端
        if (SystemUtil.isClient()) {

            let trigger = this.gameObject.getChildByName("触发器") as Trigger;
            trigger.onEnter.add((obj) => {
                if (utils.checkTriggerGo(obj) == false) return;
                let mesh = this.gameObject as Model;
                try {
                    mesh.setOutline(true, LinearColor.green, 1);
                } catch (error) {
                    console.error("lmn error: 物体不是模型 " + this.gameObject.gameObjectId);
                }
                if (GlobalData.curPlayerData)
                    GlobalData.curPlayerData.isInSafeArea = true;
                // 蹲伏状态进入安全区域，发送安全事件
                if (ModuleService.getModule(SportModuleC).getPlayerCurrentState() == EPlayerState.crouch) {
                    ActionCommon.onPlayerHide.call(true);
                }
                console.log("进入安全区");
            })

            trigger.onLeave.add((obj) => {
                if (utils.checkTriggerGo(obj) == false) return;
                let mesh = this.gameObject as Model;
                try {
                    mesh.setOutline(false);
                } catch (error) {
                    console.error("lmn error: 物体不是模型 " + this.gameObject.gameObjectId);
                }
                if (GlobalData.curPlayerData)
                    GlobalData.curPlayerData.isInSafeArea = false;
                console.log("离开安全区");
                ActionCommon.onPlayerHide.call(false);
            })
        }
    }
}