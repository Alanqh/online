import PlayerData from "./DataBase/PlayerData";
import SettlementUI from "./UI/SettlementUI";
@Component
export default class GameStart extends Script {

    private playerCount:number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            console.log("欢迎来到大厅") 
        }
        if (SystemUtil.isClient()){
            let player = Player.localPlayer;
            this.Init(player)
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

    @RemoteFunction(Server)
    public Init(player:Player): void{
        console.log("欢迎来到大厅"+player.userId); 
        player.character.displayName = player.nickname
        player.character.maxWalkSpeed = 500;
    }

}