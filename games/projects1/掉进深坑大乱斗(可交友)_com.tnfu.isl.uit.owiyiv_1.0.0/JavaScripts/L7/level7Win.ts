import SettlementManager from "../SettlementManager";
import PassUI from "../UI/PassUI";
@Component
export default class levelEnd extends Script {
    private WinMap: Map<string, number> = new Map();
    // 当脚本启动时执行的函数
    protected async onStart(): Promise<void> {
        if (SystemUtil.isClient()) {
        }
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject as Trigger;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level7Init", () => {
                console.log("Level7Init")
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
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.PlaySound(chara.player)
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                this.RestoreModel(player);
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
    @RemoteFunction(Client,Multicast)
    private RestoreModel(player:Player):void{
        let chara = player.character;
        let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
        if(ring) {
            chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
            chara.meshPositionOffset = new Vector(0, 0, 0)
        }
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
