import GlobalManager from "../GlobalManager";
import CGSInitUI from "../UI/DaTingUI/CGSInitUI";
import CGSTSUI from "../UI/DaTingUI/CGSTSUI";
@Component
export default class CGSMatch extends Script {

    curLevel:number = 0;
    // 当脚本启动时执行的函数
    protected async onStart(): Promise<void> {

        if (SystemUtil.isServer()) {
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    let globalManager = GlobalManager.getInstance();
                    if(globalManager.getGameType() != -1){
                        return;                       
                    }
                    //绑定光环称号
                    this.AttachHalo(chara.player)

                    const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
                    allPlayersIds.forEach(playerId => {
                        this.ShowCGSUI(Player.getPlayer(playerId));
                    });
                    globalManager.setGameType(1) //闯关赛玩法
                    globalManager.setLevelCount(0)
                    setTimeout(() => {
                        globalManager.setLevelId(globalManager.getLevelList()[this.curLevel]);
                        console.log("curLevel ",this.curLevel)
                        this.curLevel = this.curLevel + 1;
                        if(this.curLevel >= 8){
                            this.curLevel = 0;
                            //设置随机关卡
                            globalManager.SetRandomLevelList();
                        } 
                        let CGSLevelStr = "CGS_Level" + globalManager.getLevelId();
                        console.log("闯关赛事件 ",CGSLevelStr)
                        Event.dispatchToLocal(CGSLevelStr)
                    }, 5*1000);
                }
            })
        }

    }

    @RemoteFunction(Client,Multicast)
    private async AttachHalo(player:Player):Promise<void>{
        let TarHaloObj = GameObject.findGameObjectByName("光环称号")
        let HaloObj = TarHaloObj.clone();
        HaloObj.worldTransform.scale = new Vector(0.2,0.2,0.2);
        await player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration.add(HaloObj, new Transform(new Vector(0,0,0),new Rotation(0,0,0),new Vector(1,1,1)));
    
        setTimeout(() => {
            let obj = player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration[0].attachmentGameObject;
            if(obj) {
                player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration.delete(obj, true);
                //player.character.meshPositionOffset = new Vector(0, 0, 0)
            }
        }, 30*1000);
    
    }

    @RemoteFunction(Client)
    private ShowCGSUI(player:Player):void{
        let ui = mw.createUI("DaTingUI/CGSInitUI",CGSInitUI);
        ui.uiWidgetBase.addToViewport(10);
        setTimeout(() => {
            ui.destroy();
        }, 4.9*1000);
    }
    @RemoteFunction(Client)
    private ShowCGSTSUI(player:Player):void{
        let ui = mw.createUI("DaTingUI/CGSTSUI",CGSTSUI);
        ui.uiWidgetBase.addToViewport(10);
        setTimeout(() => {
            ui.destroy();
        }, 3*1000);
    }
}