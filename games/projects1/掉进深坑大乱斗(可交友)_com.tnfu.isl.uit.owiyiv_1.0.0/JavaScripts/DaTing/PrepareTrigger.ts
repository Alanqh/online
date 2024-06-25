import CGSTSUI from "../UI/DaTingUI/CGSTSUI";
import GlobalManager from "../GlobalManager";
@Component
export default class PrepareTrigger extends Script {

    TSUI:CGSTSUI = null;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            let globalManager = GlobalManager.getInstance();
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other)=>{
                if(other instanceof Character){
                    globalManager.SetPlayerInDaTing(other.player.userId,true);
                    console.log("进入大厅准备区域触发器 "+globalManager.getGameType().toString())
                    if(globalManager.getGameType() != -1){
                        this.ShowTSUI(other.player);
                    }
                }
            });
            trigger.onLeave.add((other)=>{
                if(other instanceof Character){
                    globalManager.SetPlayerInDaTing(other.player.userId,false);
                    console.log("退出大厅准备区域触发器")
                    this.UnShowTSUI(other.player);
                }
            });
        }
    }

    @RemoteFunction(Client)
    private ShowTSUI(player:Player):void{
        if(this.TSUI == null){
            this.TSUI = mw.createUI("DaTingUI/CGSTSUI",CGSTSUI)
            this.TSUI.uiWidgetBase.addToViewport(10);
        }  
    }

    @RemoteFunction(Client)
    private UnShowTSUI(player:Player):void{
        if(this.TSUI != null){
            this.TSUI.destroy();
            this.TSUI = null;
        }
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