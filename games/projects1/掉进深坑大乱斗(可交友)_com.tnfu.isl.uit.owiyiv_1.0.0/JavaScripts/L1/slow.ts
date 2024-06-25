@Component

export default class SlowingFloorTS extends mw.Script {

    //设置脚本在属性面板中填入角色默认的地面最大效果
    // @mw.Property({ displayName: "角色初始速度", group: "必填" })
    public OriginalSpeed: number = 450;
    
    //设置脚本在属性面板中可以填入减速效果
    // @mw.Property({ displayName: "减速效果", group: "必填" })
    public SpeedValue: number = 0.5;
    
    //设置脚本在属性面板中可以填入生效持续时间
    // @mw.Property({ displayName: "持续时间", group: "必填" })
    public Duration: number = 10;
    
    Slowingflag:boolean = true;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
    
        //角色进入触发器后获得减速效果
        trigger.onEnter.add((chara: mw.GameObject) => {
            this.Slowingflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Slowingflag == true) {
                    this.Slowingflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
    
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara: mw.GameObject) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
    
                setTimeout(() => {
                    if (this.Slowingflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }

}
