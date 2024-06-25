import playerDead from "../L4/playerDead";

@Component
export default class coinTX extends Script {
    // 当脚本启动时，执行此函数
    protected onStart(): void {
        if(SystemUtil.isServer){
             // 异步下载资源
             AssetUtil.asyncDownloadAsset("136198");
            // 获取脚本所在的GameObject，并将其转换为Model类型
            let obj = this.gameObject as Model;
            // 获取Model的第一个子物体，并将其转换为Trigger类型
            let trigger = obj.getChildren()[0] as Trigger;
            // 为Trigger的onEnter事件添加一个新的代理函数
            trigger.onEnter.add((chara: Character) => {
                // 如果chara存在且为玩家角色
                if (chara && chara.player) {
                    // 播放资源ID为"136198"的声音，循环播放1次，音量为1
                    // SoundService.playSound("136198", 1, 1);
                    this.PlaySound(chara.player);
                    // 拾取后禁用触发器
                    trigger.enabled = false;
                    setTimeout(() => {
                        // 启用触发器
                        trigger.enabled = true;
                    }, 5*1000);
                } 
            });
        }
    }
    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("136198", 1, 1);
    }
}
