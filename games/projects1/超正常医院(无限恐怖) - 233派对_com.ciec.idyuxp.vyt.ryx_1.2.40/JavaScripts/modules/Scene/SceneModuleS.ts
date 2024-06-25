import { GlobalData } from "../../const/GlobalData";
import TimeModuleS from "../Time/TimeModuleS";
import SceneModuleC from "./SceneModuleC";

/**
 * 场景物体相关 - 服务端
 */
export default class SceneModuleS extends ModuleS<SceneModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // 晚上需要隐藏的物体
        // GlobalData.SceneObject.nightHideGuids.forEach(async (guid) => {
        //     let timeMS = ModuleService.getModule(TimeModuleS);
        //     let obj = GameObject.findGameObjectById(guid);
        //     if (obj) {
        //         // 晚上关碰撞和可见
        //         timeMS.onNightStart.add(() => {
        //             obj.setVisibility(PropertyStatus.Off);
        //             (obj as Model).setCollision(CollisionStatus.Off);
        //         });
        //         // 白天开启碰撞和可见
        //         timeMS.onDayStart.add(() => {
        //             obj.setVisibility(PropertyStatus.On);
        //             (obj as Model).setCollision(CollisionStatus.On);
        //         });
        //     }
        // });

        // GameObject.asyncFindGameObjectById("3DB839B1").then((obj) => {
        //     if (obj) {
        //         let loc = obj.worldTransform.position.clone();
        //         loc.z = 170;
        //         obj.worldTransform.position = loc;
        //     }
        // });
        // GameObject.asyncFindGameObjectById("282405DB").then((obj) => {
        //     if (obj) {
        //         let loc = obj.worldTransform.position.clone();
        //         loc.z = 170;
        //         obj.worldTransform.position = loc;
        //     }
        // })
    }

}