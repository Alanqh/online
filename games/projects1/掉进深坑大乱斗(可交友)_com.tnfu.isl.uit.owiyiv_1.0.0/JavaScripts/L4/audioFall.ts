@Component

export default class audioFall extends Script {
    // 当脚本启动时，执行此函数
    protected onStart(): void {

        // if(SystemUtil.isServer()){
        //     console.log("audioFall进入服务端");
        //     let Model = this.gameObject as Model;
        //     Model.setCollision(CollisionStatus.On);
        //     Model.onTouch.add((chara) => {
        //         console.log("audioFall进入触发器");
        //         if(chara instanceof Character){
        //             console.log("audioFall进入触发器执行");
        //             Model.setVisibility(false);
        //             Model.setCollision(CollisionStatus.Off);
        //         }
        //     });
        // }

        if(SystemUtil.isServer){
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("120846");
            // 获取脚本所在的GameObject，并将其转换为Model类型
            let obj = this.gameObject as Model;
            // 获取Model的第一个子物体，并将其转换为Trigger类
            let trigger = obj.getChildren()[0] as Trigger;
            // 为Trigger的onEnter事件添加一个新的代理函数
            trigger.onEnter.add((chara: Character) => {
                // 如果chara存在且为玩家角色
                if (chara && chara.player) {
                    // 播放资源ID为"120846"的声音，循环播放1次，音量为1
                    // SoundService.playSound("120846", 1, 1);
                    this.PlaySound(chara.player);
                }
                setTimeout(() => {
                    // 地板消失后禁用触发器
                    trigger.enabled = false;
                }, 1500);
            });
        }
    }
    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("120846", 1, 1);
    }
}
