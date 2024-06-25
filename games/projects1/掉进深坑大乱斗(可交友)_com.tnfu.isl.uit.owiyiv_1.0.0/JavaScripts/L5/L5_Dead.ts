@Component
export default class playerDead extends Script {

    private PassMap: Map<string, number> = new Map();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara:GameObject)=>{
                if(chara instanceof Character){
                    setTimeout(() => {
                        let levelpos = GameObject.findGameObjectByName("Level5Start").worldTransform.position;
                        chara.worldTransform.position = levelpos;
                    }, 100);
                }
            })
        }
        if(SystemUtil.isServer()){
            //异步下载音效资源
            AssetUtil.asyncDownloadAsset("120841");
            AssetUtil.asyncDownloadAsset("153615");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject as Trigger;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if(other instanceof Character){
                    //是角色,则执行广播
                    this.MulticastFun(other);
                    this.PlaySound(other.player)
                }  
            });
        }
    }


    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("120841", 1, 1);
    }


    @RemoteFunction(Client,Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
    public MulticastFun(chara:Character): void {

        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        //在玩家角色的位置播放特效
        EffectService.playOnGameObject("153615", chara,{slotType:HumanoidSlotType.Root});


        // 3秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("153615", chara);
        }, 2000);
        // chara.ragdollEnabled = true;
        // //倒计时 3 秒
        // setTimeout(() => {
        // //角色关闭布娃娃系统
        // chara.ragdollEnabled = false;
        // }, 3000);
    }
}
