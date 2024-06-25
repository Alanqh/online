@Component

export default class SpeedBoostFloorTS extends mw.Script {

    //设置脚本在属性面板中填入角色默认的地面最大效果
    // @mw.Property({ displayName: "角色初始速度", group: "必填" })
    public OriginalSpeed: number = 450;
    
    //设置脚本在属性面板中可以填入加速效果
    // @mw.Property({ displayName: "加速效果", group: "必填" })
    public SpeedValue: number = 1.3;
    
    //设置脚本在属性面板中可以填入生效持续时间
    // @mw.Property({ displayName: "持续时间", grsoup: "必填" })
    public Duration: number = 1500;
    
    Speedflag = true;
    
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
    
        //角色进入触发器后获得加速效果
        trigger.onEnter.add((chara: mw.GameObject) => {
            this.Speedflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if(this.Speedflag == true){
                    this.Speedflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
    
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara: mw.GameObject) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if(this.Speedflag == false){
                    chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }

}


