import { oTrace } from "odin";
import { LevelLogic_C } from "../LevelLogic_C";
import Level_Normal from "./Level_Normal";

export class Level_Normal_C extends LevelLogic_C<Level_Normal> {
    protected onInitClient() {
        /**注册自己net方法 */
        this.registerObjNetFun(this, this.funcMap_C);

        // 测试
        // setTimeout(() => {
        //     this.info.net_Client_Call_Server_C("net_Test_S", "这里是客户端调用服务器测试" + Player.localPlayer.playerId);
        // }, 5000);
    }

    public net_Test_C(...args: any[]) {
        oTrace('guan log Level_Normal_C 测试双端通信', args);
    }
}