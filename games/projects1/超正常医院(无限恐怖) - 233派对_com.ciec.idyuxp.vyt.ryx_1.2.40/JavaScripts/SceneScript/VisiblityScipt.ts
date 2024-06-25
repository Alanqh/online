import { GameMode } from "../const/enum";
import TimeModuleS from "../modules/Time/TimeModuleS";


@Component
export default class VisiblityScipt extends Script {

    @Property({ displayName: "子物体显示的模式" })
    private showMode: GameMode = GameMode.Dream;

    /**当前可见性 */
    private curVisibility: PropertyStatus;
    /**当前物体的子物体 */
    private children: GameObject[];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.children = this.gameObject.getChildren();
        ModuleService.ready().then(() => {
            let timeMS = ModuleService.getModule(TimeModuleS)
            timeMS.onNightStart.add(() => {
                let visibility = this.showMode == timeMS.mode ? PropertyStatus.On : PropertyStatus.Off;

                this.setChildrenVisibility(visibility);
            }, this);
            timeMS.onDayStart.add(() => {
                // 普通模式的物体显示
                if (this.showMode == GameMode.Normal) {
                    this.setChildrenVisibility(PropertyStatus.On);
                }
                // 特殊模式的物体隐藏
                else {
                    this.setChildrenVisibility(PropertyStatus.Off);
                }
            }, this);
        })

    }

    /**
     * 设置物体列表的可见性
     */
    private setChildrenVisibility(visibility: PropertyStatus) {
        if (this.curVisibility && visibility == this.curVisibility) return;

        this.curVisibility = visibility;
        this.children.forEach((obj) => {
            obj.setVisibility(visibility);
        })
    }
}