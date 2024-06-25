import SettlementManager from "../SettlementManager";
@Component
export default class BeHurt extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isClient()){
            AssetUtil.asyncDownloadAsset("120841");
            const trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other) => {
                if(other instanceof Character){
                    // SoundService.playSound("120841",0,1);
                    // this.PlaySound(other.player);
                    // // 1 秒后停止播放特效
                    // setTimeout(() => {
                    //     // SoundService.stopSound("120841");
                    //     this.StopSound(other.player);
                    // }, 1000);
                }  
            });
        }

        if(SystemUtil.isServer()){
            AssetUtil.asyncDownloadAsset("120841");
            const trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other) => {
                if(other instanceof Character){
                    //播放被撞击效果
                    this.MulticastFun(other); 
                    //增加撞击次数
                    this.AddLose(other.player);
                    //播放音效
                    this.PlaySound(other.player);
                }  
            });
        }
    }
    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("120841");
        setTimeout(() => {
            SoundService.stopSound("120841");
        }, 1000);
    }

    @RemoteFunction(Client)
    private StopSound(player:Player):void{
        SoundService.stopSound("120841");
    }
    @RemoteFunction(Client,Multicast)
    public MulticastFun(chara:Character): void {

        //异步下载资源
        AssetUtil.asyncDownloadAsset("142935");
        //console.log("这是,所有客户端执行");
        //在玩家角色头顶播放特效
        EffectService.playOnGameObject("142935", chara,{slotType:HumanoidSlotType.Rings});


        // 1 秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("142935", chara);
        }, 1000);

        chara.ragdollEnabled = true;
        //倒计时 1 秒
        setTimeout(() => {
            //角色关闭布娃娃系统
            chara.ragdollEnabled = false;
        }, 1000);

    }

    @RemoteFunction(Server)
    public AddLose(player:Player):void{
        //记录玩家死亡次数+1
        let settlementManager = SettlementManager.getInstance();
        settlementManager.AddPlayerLose(player.userId,1);
        Event.dispatchToClient(player,"UpdateHurt",settlementManager.GetPlayerLose(player.userId))
    }
    @RemoteFunction(Client)
    public BeHurtAudio(player:Player):void{
        //记录玩家死亡次数+1
        let settlementManager = SettlementManager.getInstance();
        settlementManager.AddPlayerLose(player.userId,1);
        Event.dispatchToClient(player,"UpdateHurt",settlementManager.GetPlayerLose(player.userId))
    }
}


/**
 * player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
 * character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。
 */

