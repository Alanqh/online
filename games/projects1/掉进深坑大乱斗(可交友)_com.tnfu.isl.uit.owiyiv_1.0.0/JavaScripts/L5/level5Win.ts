import SettlementManager from "../SettlementManager";
import PassUI from "../UI/PassUI";
@Component
export default class levelEnd extends Script {

    private WinMap: Map<string, number> = new Map();

    // 当脚本启动时执行的函数
    protected async onStart(): Promise<void> {
        if (SystemUtil.isClient()) {
            //异步下载资源
            // let trigger = this.gameObject as Trigger;
            // trigger.onEnter.add((chara:GameObject) => {
            //     if(chara instanceof Character){

            //     }
            // });
        }
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject as Trigger;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level5Init", () => {
                console.log("Level5Init")
                this.WinMap.clear()
            });
            trigger.onEnter.add((chara:GameObject) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if(chara instanceof Character){
                    setTimeout(() => {
                        console.log("进入终点触发器")
                        console.log("chara:"+ chara.constructor.name)
                        if (chara.constructor.name == "PlayerCharacter"){
                            console.log("Enter PlayerCharacter");
                            const player: Player = chara.player;
                            if(!this.WinMap.has(player.userId)){
                                this.PlaySound(chara.player);
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                if(settlementManager.GetPlayerRankMap().size ==  this.WinMap.size){
                                    Event.dispatchToLocal("Level5End");
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
        SoundService.playSound("99723", 1, 1);
    }


    @RemoteFunction(Client)
    private ShowPassUI(player:Player):void {
        let ui = mw.createUI("PassUI",PassUI)
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy()
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }

}