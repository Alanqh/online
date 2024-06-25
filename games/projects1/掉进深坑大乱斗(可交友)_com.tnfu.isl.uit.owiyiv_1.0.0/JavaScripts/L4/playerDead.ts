import SettlementManager from "../SettlementManager";
@Component
export default class playerDead extends Script {

    private PassMap: Map<string, number> = new Map();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isClient()){
            //异步下载结算音效资源
            AssetUtil.asyncDownloadAsset("136204");

            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara)=>{
                if(chara instanceof Character){
                    
                }
            }
        )}
        if(SystemUtil.isServer()){
            Event.addLocalListener("Level4Init", () => {
                console.log("Level4Init")
                this.PassMap.clear()
            });
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara)=>{
                if(chara instanceof Character){
                    setTimeout(() => {
                        console.log("进入终点触发器")
                        console.log("chara:"+ chara.constructor.name)
                        if (chara.constructor.name == "PlayerCharacter"){
                            console.log("Enter PlayerCharacter");
                            const player: Player = chara.player;
                            if(!this.PassMap.has(player.userId)){
                                // 当前玩家首次死亡，记录玩家ID,结算时注意倒序排名，排名最后的分数越高,排名0说明未死亡
                                //结算音效
                                this.PlaySound(chara.player);   
                                this.PassMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                if(settlementManager.GetPlayerRankMap().size == this.PassMap.size){
                                    Event.dispatchToLocal("Level4End");
                                }
                            }
                        }
                    }, 100);
                }
            })
        }
    }
    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        Event.dispatchToLocal("LookWarStart")
        SoundService.playSound("136204", 1, 1);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}