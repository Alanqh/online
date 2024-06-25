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
        if(SystemUtil.isServer()){
            AssetUtil.asyncDownloadAsset("99723");

            const trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other) => {
                if(other instanceof Character){
                    let losepos = GameObject.findGameObjectByName("Level2小黑屋").worldTransform.position;
                    other.worldTransform.position = losepos;
                }  
            });
        }
        if (SystemUtil.isServer()) {

            // 获取脚本对应的触发器
            let trigger = this.gameObject as Trigger;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level2Init", () => {
                console.log("Level2Init")
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
                                settlementManager.AddPlayerCount(player.userId,5);
                                console.log("玩家"+player.userId+"获得5枚金币")
                                Event.dispatchToClient(player,"UpdateCoin",settlementManager.GetPlayerCount(player.userId))
                                this.ShowPassUI(player);
                            }
                        }
                    }, 100);
                }
            })
        }

    }


    @RemoteFunction(Client)
    private PlaySound(player:Player):void{
        SoundService.playSound("99723", 1, 1);
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