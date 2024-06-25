 /**

- player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
- character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。

 */



@Component
export default class RPCtest extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if(SystemUtil.isClient()){
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject as Trigger;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if(other instanceof Character){
                    //是角色,则执行
                    this.MulticastFun(other);
                }  
            });
        }
    }


    @RemoteFunction(Client,Multicast)
    public MulticastFun(chara:Character): void {
        //在玩家角色的位置播放特效
        EffectService.playOnGameObject("297400", chara,{slotType:HumanoidSlotType.Rings});
        // 1秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("297400", chara);
        }, 1000);
        chara.ragdollEnabled = true;
        
        //倒计时 1 秒
        setTimeout(() => {
            //角色关闭布娃娃系统
            chara.ragdollEnabled = false;
        }, 1000);

    }

}

 
