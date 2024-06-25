import SettlementManager from "../SettlementManager";
@Component
export default class CoinTX extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            const model = this.gameObject as Model;
            // 添加进入模型事件
            model.onTouch.add((other) => {
                if (other instanceof Character) {
                    if(model.getVisibility() == false){
                        return;
                    }
                    model.setVisibility(false);
                    let settlementManager = SettlementManager.getInstance();
                    settlementManager.AddPlayerCount(other.player.userId,1);
                    Event.dispatchToClient(other.player,"UpdateCoin",settlementManager.GetPlayerCount(other.player.userId))
                    setTimeout(() => {
                        model.setVisibility(true);
                    }, 5*1000);
                }
            });
            // 添加离开模型事件
            model.onTouchEnd.add((other) => {
                if (other instanceof Character) {
                    
                }
            });
        }

        if(SystemUtil.isClient()){
            
        }
    }
}