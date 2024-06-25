// @Component

// export default class GameStart extends Script {

//     // 当脚本启动时执行的函数

//     protected async onStart(): Promise<void> {

//         // 检查是否在客户端运行

//         if (SystemUtil.isClient()) {

//             // 异步下载资源

//             AssetUtil.asyncDownloadAsset("162452").then((success: boolean) => {

//                 // 如果下载成功，则打印成功消息

//                 if (success) {

//                     console.log("音乐资源加载成功");

//                 } else {

//                     // 如果下载失败，则打印失败消息

//                     console.log("音乐资源加载失败");

//                 }

//             });

//         }

//         // 获取脚本对应的GameObject并转换为Trigger类型

//         let trigger = this.gameObject as Trigger;

//         // 添加进入触发器的事件监听器

//         trigger.onEnter.add((other: GameObject) => {

//             // 检查进入的GameObject是否是本地玩家的角色

//             if (other == Player.localPlayer.character) {

//                 // 如果条件满足，则播放声音

//                 SoundService.playSound("162452");

//             }

//         });

//     }

// }

@Component

export default class s_tx2 extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */

    protected onStart(): void {

        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数

        // 客户端

        if(SystemUtil.isServer()){

            // 异步下载资源

            AssetUtil.asyncDownloadAsset("145503");

            AssetUtil.asyncDownloadAsset("162452");

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
        SoundService.playSound("162452");
        setTimeout(() => {
            SoundService.stopSound("162452");
        }, 1.5*1000);
    }
    @RemoteFunction(Client,Multicast)

    //根据传入的Character参数来处理角色相关的逻辑

    public EnterFun(chara:Character): void {

        //打印执行消息

        console.log("这是广播,所有客户端执行");

        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0

        EffectService.playOnGameObject("145503", chara, {slotType: HumanoidSlotType.Root,loopCount:0});    

    }

    public LeaveFun(chara:Character): void {

        //打印执行消息

        // console.log("这是广播,所有客户端执行");

        // 停止本地玩家角色上所有资源ID为"142750"的特效

        EffectService.stopEffectFromHost("145503", chara);

    }

}
