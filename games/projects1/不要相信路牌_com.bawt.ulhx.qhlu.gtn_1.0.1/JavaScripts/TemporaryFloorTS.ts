@Component
export default class TemporaryFloorTS extends Script {

    //设置脚本在属性面板中可以填入地板消失的时间
    @Property({ displayName: "恢复时间", group: "必填" })
    public HideTime: number = 1000;

    //设置脚本在属性面板中可以填入地板恢复的时间
    @Property({ displayName: "恢复时间", group: "必填" })
    public RecoveryTime: number = 1000;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        const trigger = this.gameObject as Trigger;
        const mesh = trigger.getChildren() as Model[];

        //当角色进入触发器时，地板在指定时间后消失
        trigger.onEnter.add((chara: Character) => {
            if (chara instanceof Character ) {
                setTimeout(() => {
                    mesh.forEach(element=> {
                        element.setVisibility(PropertyStatus.Off,true);
                        element.setCollision(PropertyStatus.Off,true);
                    });
                }, this.HideTime);
            }
        });

        //当角色离开触发器时，地板在指定时间后恢复
        trigger.onLeave.add((chara: Character) => {
            if (chara instanceof Character) {
                setTimeout(() => {
                    mesh.forEach(element=> {
                        element.setVisibility(PropertyStatus.On,true);
                        element.setCollision(PropertyStatus.On,true);
                    });
                }, this.RecoveryTime);

            }
        });
    }
}