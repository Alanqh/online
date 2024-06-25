import { GameMode } from "../const/enum";
import TimeModuleS from "../modules/Time/TimeModuleS";

/**在白天来临时改变物体的坐标 */
@Component
export default class MoveObject extends Script {

    protected onStart(): void {
        if (SystemUtil.isClient()) return;
        ModuleService.ready().then(() => {
            ModuleService.getModule(TimeModuleS).onDayStart.add((mode: GameMode) => {
                
                if (mode == GameMode.Normal) {
                    this.gameObject.setVisibility(true);
                    (this.gameObject as Model).setCollision(CollisionStatus.On);
                } else if (mode == GameMode.Dream) {
                    this.gameObject.setVisibility(false);
                    (this.gameObject as Model).setCollision(CollisionStatus.Off);
                } else {
                    return console.error("lmn error模式不存在" + mode);
                }

                
            })
        })
    }
}