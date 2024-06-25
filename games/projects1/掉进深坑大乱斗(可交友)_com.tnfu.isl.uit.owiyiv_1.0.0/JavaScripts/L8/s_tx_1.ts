@Component

export default class s_tx2 extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */

    protected onStart(): void {

        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数

        // 客户端

        if(SystemUtil.isServer()){

            // 异步下载资源

            AssetUtil.asyncDownloadAsset("142957");

            AssetUtil.asyncDownloadAsset("162451");

            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作

            const trigger = this.gameObject as Trigger;

            // 检测进入触发器范围的玩家

            trigger.onEnter.add((other) => {

                //判断是否是角色

                if(other instanceof Character){

                    //是角色,则执行广播

                    this.EnterFun(other);

                    this.PlaySound(other.player);

                }  

            });           

            // 当有物体离开触发器时，执行此函数

            trigger.onLeave.add((other: GameObject) => {

                // 如果离开的物体是Character类型

                if (other instanceof Character) {

                    this.LeaveFun(other);

                }

            });

        }

    }
    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("162451");
        setTimeout(() => {
            SoundService.stopSound("162451");
        }, 1.5*1000);
    }
    @RemoteFunction(Client,Multicast)

    //根据传入的Character参数来处理角色相关的逻辑

    public EnterFun(chara:Character): void {

        //打印执行消息

        console.log("这是广播,所有客户端执行");

        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0

        EffectService.playOnGameObject("142957", chara, {slotType: HumanoidSlotType.Root,loopCount:0});    

    }

    public LeaveFun(chara:Character): void {

        //打印执行消息

        // console.log("这是广播,所有客户端执行");

        // 停止本地玩家角色上所有资源ID为"142750"的特效

        EffectService.stopEffectFromHost("142957", chara);

    }

}
