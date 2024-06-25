import { LevelLogic_S } from "../LevelLogic_S";
import Level_Normal from "./Level_Normal";

export class Level_Normal_S extends LevelLogic_S<Level_Normal> {
    protected onInitServer() {
        /**注册自己net方法 */
        this.registerObjNetFun(this, this.funcMap_S);
    }
    protected onStartPlayGame(): void {

        // this.info.net_Server_Call_Client_All_S("net_Test_C", "这里是服务器调用客户端---全部");

    }
    protected onPlayerLeave(player: mw.Player): void {

    }

    /**
     * 客户端调用服务器方法
     * @param player 调用玩家
     * @param args 参数
     */
    net_Test_S(playerID: number, ...args: any[]) {
        console.log("net_Test 服务器收到了客户端消息", args);

        // this.info.net_Server_Call_Client_Single_S(player, "net_Test_C", "这里是服务器调用客户端---单独", args);

    }
}