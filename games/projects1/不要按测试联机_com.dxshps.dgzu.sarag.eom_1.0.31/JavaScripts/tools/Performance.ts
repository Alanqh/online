// //aits-ignore
// /*
//  * @Author: YuKun.Gao
//  * @Date: 2023-08-09 18:23:33
//  * @LastEditors: YuKun.Gao
//  * @LastEditTime: 2023-08-10 16:07:22
//  * @Description: file content
//  * @FilePath: \Ecs\JavaScripts\PerformanceUtils\Performance.ts
//  */

// import { ClassInstance } from "./ClassInstance/ClassInstance";
// import { PerEvents } from "./Rpc/Rpc";
// import { PerTimer } from "./PerTimer";
// import { UseTimeHook } from "./UseTimeHook";

// @Component
// export default class Performance extends mw.Script {


//     public static startTime: number;

//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected async onStart(): Promise<void> {

//         if (SystemUtil.isClient()) {
//             this.server_ReqTimeUnix(await Player.asyncGetLocalPlayer());
//         } else {
//             let curTime = Date.now();
//             PerTimer.instance.setTimeUnix(curTime);
//         }

//         PerEvents.instance.init();

//         this.useUpdate = true;

//     }

//     private reciveCount: number = 0;

//     // ============================================服务器时间戳同步============================================
//     @RemoteFunction(mw.Server)
//     private server_ReqTimeUnix(player: mw.Player) {

//         let curTime = Date.now();
//         this.client_AckTimeUnix(player, curTime);

//     }

//     @RemoteFunction(mw.Client)
//     private client_AckTimeUnix(player: mw.Player, timeUnix: number) {

//         PerTimer.instance.setTimeUnix(timeUnix);

//     }

//     /**
//      * 周期函数 每帧执行
//      * 此函数执行需要将this.useUpdate赋值为true
//      * @param dt 当前帧与上一帧的延迟 / 秒
//      */
//     protected onUpdate(dt: number): void {

//         PerTimer.instance.updateDt(dt);

//     }

//     /** 脚本被销毁时最后一帧执行完调用此函数 */
//     protected onDestroy(): void {

//     }
// }