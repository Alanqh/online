// //aits-ignore
// import { oTrace } from "odin";
// import { ClassInstance } from "../ClassInstance/ClassInstance";
// import { PerTimer } from "../PerTimer";

// class RpcMerge {

//     public eventNames: string[] = [];
//     public params: unknown[][] = [];

//     public bytesLength: number = 0;

// }

// export class PerEvents {

//     public static addClientListener(eventName: string, listener: (player: mw.Player, ...params: unknown[]) => void): mw.EventListener {

//         return PerEvents.instance.addClientListener(eventName, listener);

//     }

//     public static addServerListener(eventName: string, listener: (...params: unknown[]) => void): mw.EventListener {

//         return PerEvents.instance.addServerListener(eventName, listener);

//     }

//     public static dispatchToAllClient(eventName: string, ...params: unknown[]) {

//         return PerEvents.instance.dispatchToAllClient(eventName, ...params);

//     }

//     public static dispatchToClient(e: mw.Player, eventName: string, ...params: unknown[]) {

//         return PerEvents.instance.dispatchToClient(e, eventName, ...params);

//     }

//     public static dispatchToServer(eventName: string, ...params: unknown[]) {

//         return PerEvents.instance.dispatchToServer(eventName, ...params);

//     }

//     public static setmaxBytesLength(buffLength: number) {
//         PerEvents.instance.maxBytesLength = buffLength;
//     }


//     public static instance: PerEvents = new PerEvents();

//     private rpcMerge: Map<number, RpcMerge> = new Map<number, RpcMerge>();
//     private send2ServerEventName: string = "performance_svr_rpc_commitRpc";
//     private send2ClientEventName: string = "performance_clt_rpc_commitRpc";
//     private maxBytesLength: number = 1024;

//     public static overrideOdinRpc(maxPlayerCount: number = 30) {

//         if (SystemUtil.isClient()) {
//             this.instance.maxBytesLength = 1024;
//         } else {
//             this.instance.maxBytesLength = 1024;
//         }

//         mwext["GameInitializer"]["getService"]("NetManager")["init"] = () => {
//             let self = mwext["GameInitializer"]["getService"]("NetManager");
//             if (SystemUtil.isClient()) {
//                 this.addServerListener("Ex_O_No_Reply" /* NO_REPLY */, (funName) => {
//                     if (self.waitServerResolveMap.has(funName)) {
//                         const waitResolveArr = self.waitServerResolveMap.get(funName);
//                         while (waitResolveArr.length > 0) {
//                             const resolve = self.waitServerResolveMap.get(funName).shift();
//                             resolve(null);
//                         }
//                         self.waitServerResolveMap.delete(funName);
//                         self.noReplyFunNameMap.set(funName, true);
//                     } else {
//                         console.error("NetObject(Client Reply): Function is not found. fun=" + funName);
//                     }
//                 });
//                 this.addServerListener("Ex_O_Reply" /* REPLY */, (funName, res) => {
//                     if (self.waitServerResolveMap.has(funName) && self.waitServerResolveMap.get(funName).length > 0) {
//                         const resolve = self.waitServerResolveMap.get(funName).shift();
//                         resolve(res);
//                     } else {
//                         console.error("NetObject(Client Reply): Function is not found. fun=" + funName);
//                     }
//                 });
//                 this.addServerListener("Ex_O_Notify" /* NOTIFY */, (funName, ...params) => {
//                     const fun = self.getFunction(funName);
//                     if (fun != null) {
//                         fun.call(...params);
//                     } else {
//                         console.error("NetObject(Client Notify): Function is not found. fun=" + funName);
//                     }
//                 });
//             }
//             if (SystemUtil.isServer()) {
//                 this.addClientListener("Ex_O_Ask" /* ASK */, (player, funName, ...params) => {
//                     const fun = self.getFunction(funName);
//                     if (fun != null) {
//                         self._callServerFnPlayer = player;
//                         params.push(player);
//                         const res = fun.call(...params);
//                         self._callServerFnPlayer = null;
//                         // if (fun["EX_O_No_Reply" /* NO_REPLY */] != null) {
//                         // if (!self.noReplyFunNameMap.has(funName)) {
//                         //     self.noReplyFunNameMap.set(funName, true);
//                         //     this.dispatchToClient(player, "Ex_O_No_Reply" /* NO_REPLY */, funName);
//                         // }
//                         if (res instanceof Promise) {
//                             res.then((result) => {
//                                 this.dispatchToClient(player, "Ex_O_Reply" /* REPLY */, funName, result);
//                             });
//                         } else {
//                             this.dispatchToClient(player, "Ex_O_Reply" /* REPLY */, funName, res);
//                         }
//                     } else {
//                         this.dispatchToClient(player, "Ex_O_Reply" /* REPLY */, funName, null);
//                     }
//                 });
//             }
//         }
//         let netInstance = mwext["GameInitializer"]["getService"]("NetManager");

//         mwext["GameInitializer"]["getService"]("NetManager")["init"](netInstance);

//         netInstance["callServerFun"] = (fun, ...params) => {
//             if (SystemUtil.isClient()) {
//                 const funName = typeof fun === "string" ? fun : fun.name;

//                 // if (netInstance.noReplyFunNameMap.has(funName)) {
//                 //     this.dispatchToServer("Ex_O_Ask" /* ASK */, funName, ...params);
//                 //     return null;
//                 // } else {

//                 if (!netInstance.waitServerResolveMap.has(funName)) {
//                     netInstance.waitServerResolveMap.set(funName, []);
//                 }
//                 return new Promise((resolve) => {
//                     netInstance.waitServerResolveMap.get(funName).push(resolve);
//                     this.dispatchToServer("Ex_O_Ask" /* ASK */, funName, ...params);
//                 });
//             }
//         }

//         netInstance["callClientFun"] = (player, fun, ...params) => {
//             if (SystemUtil.isServer()) {
//                 const funName = typeof fun === "string" ? fun : fun.name;
//                 if (player instanceof mw.Player) {
//                     this.dispatchToClient(player, "Ex_O_Notify" /* NOTIFY */, funName, ...params);
//                 } else {
//                     this.dispatchToClient(Player.getPlayer(player), "Ex_O_Notify" /* NOTIFY */, funName, ...params);
//                 }
//             }
//         }

//         netInstance["callAllClientFun"] = (fun, ...params) => {
//             if (SystemUtil.isServer()) {
//                 const funName = typeof fun === "string" ? fun : fun.name;
//                 this.dispatchToAllClient("Ex_O_Notify" /* NOTIFY */, funName, ...params);
//             }
//         }

//     }

//     public init() {

//         if (SystemUtil.isServer()) {
//             Event.addClientListener(this.send2ServerEventName, (player: mw.Player, rpcMerge: RpcMerge) => {


//                 for (let i = 0; i < rpcMerge.eventNames.length; i++) {

//                     Event.dispatchToLocal("performance_svr_rpc_" + rpcMerge.eventNames[i], player, ...rpcMerge.params[i]);

//                 }

//             });
//         }

//         if (SystemUtil.isClient()) {
//             Event.addServerListener(this.send2ClientEventName, (rpcMerge: RpcMerge) => {


//                 for (let i = 0; i < rpcMerge.eventNames.length; i++) {

//                     Event.dispatchToLocal("performance_cli_rpc_" + rpcMerge.eventNames[i], ...rpcMerge.params[i]);

//                 }

//             });
//         }

//         PerTimer.setInterval(() => {
//             this.commitRpc();
//             ClassInstance.gc();
//         }, 1);


//     }

//     private addClientListener(eventName: string, listener: (player: mw.Player, ...params: unknown[]) => void): mw.EventListener {

//         if (SystemUtil.isClient()) return;

//         return Event.addLocalListener("performance_svr_rpc_" + eventName, listener);

//     }

//     private addServerListener(eventName: string, listener: (...params: unknown[]) => void): mw.EventListener {

//         if (SystemUtil.isServer()) return;

//         return Event.addLocalListener("performance_cli_rpc_" + eventName, listener);

//     }

//     private dispatchToAllClient(eventName: string, ...params: unknown[]) {

//         if (SystemUtil.isClient()) return;

//         for (var i = 0; i < params.length; ++i) {
//             if (params[i] instanceof mw.Player) {
//                 params.splice(i, 1);
//                 break;
//             }
//         }

//         let byteLength = (eventName.length + JSON.stringify(params).length) * 8;

//         Player.getAllPlayers().forEach(e => {


//             if (!this.rpcMerge.has(e.playerId)) {
//                 let newRpcMerge = ClassInstance.newc<RpcMerge>(RpcMerge);
//                 newRpcMerge.eventNames.length = 0;
//                 newRpcMerge.params.length = 0;
//                 newRpcMerge.bytesLength = 0;
//                 this.rpcMerge.set(e.playerId, newRpcMerge);
//             }

//             let merge = this.rpcMerge.get(e.playerId);

//             if (byteLength + merge.bytesLength >= this.maxBytesLength) {
//                 //console.error("dispatchToAllClient 字节超过" + this.maxBytesLength + " 直接发送 : " + byteLength + "|" + merge.bytesLength);
//                 this.commitRpc();
//                 let newRpcMerge2 = ClassInstance.newc<RpcMerge>(RpcMerge);
//                 newRpcMerge2.eventNames.length = 0;
//                 newRpcMerge2.params.length = 0;
//                 newRpcMerge2.bytesLength = 0;
//                 newRpcMerge2.eventNames.push(eventName);
//                 newRpcMerge2.params.push(params);
//                 Event.dispatchToClient(e, this.send2ClientEventName, newRpcMerge2);
//                 ClassInstance.delete(newRpcMerge2);
//                 return;
//             }


//             merge.eventNames.push(eventName);
//             merge.params.push(params);
//             merge.bytesLength += byteLength;

//         });


//     }

//     private dispatchToClient(e: mw.Player, eventName: string, ...params: unknown[]) {

//         if (SystemUtil.isClient()) return;

//         if (!e || !e.playerId) {
//             return;
//         }

//         if (!this.rpcMerge.has(e.playerId)) {
//             let newRpcMerge = ClassInstance.newc<RpcMerge>(RpcMerge);
//             newRpcMerge.bytesLength = 0;
//             newRpcMerge.eventNames.length = 0;
//             newRpcMerge.params.length = 0;
//             this.rpcMerge.set(e.playerId, newRpcMerge);
//         }

//         for (var i = 0; i < params.length; ++i) {
//             if (params[i] instanceof mw.Player) {
//                 params.splice(i, 1);
//                 break;
//             }
//         }

//         let merge = this.rpcMerge.get(e.playerId);
//         let lengthStr = "";
//         try {
//             lengthStr = JSON.stringify(params) + eventName;
//         } catch (ex) {
//             console.error(params);
//             console.error(ex);
//             console.error(ex.message);
//         }
//         let byteLength = lengthStr.length * 8;

//         if (byteLength + merge.bytesLength >= this.maxBytesLength) {
//             //console.error("dispatchToClient 字节超过" + this.maxBytesLength + " 直接发送 : " + byteLength + "|" + merge.bytesLength);
//             this.commitRpc();
//             let newRpcMerge = ClassInstance.newc<RpcMerge>(RpcMerge);
//             newRpcMerge.eventNames.length = 0;
//             newRpcMerge.params.length = 0;
//             newRpcMerge.eventNames.push(eventName);
//             newRpcMerge.params.push(params);
//             Event.dispatchToClient(e, this.send2ClientEventName, newRpcMerge);
//             ClassInstance.delete(newRpcMerge);
//             return;
//         }

//         merge.eventNames.push(eventName);
//         merge.params.push(params);

//         merge.bytesLength += byteLength;

//     }

//     private dispatchToServer(eventName: string, ...params: unknown[]) {

//         if (SystemUtil.isServer()) return;

//         // 客户端不合并代码
//         if (SystemUtil.isClient()) {
//             let newRpcMerge2 = ClassInstance.newc<RpcMerge>(RpcMerge);
//             newRpcMerge2.eventNames.length = 0;
//             newRpcMerge2.params.length = 0;
//             newRpcMerge2.bytesLength = 0;
//             newRpcMerge2.eventNames.push(eventName);
//             newRpcMerge2.params.push(params);
//             Event.dispatchToServer(this.send2ServerEventName, newRpcMerge2);
//             ClassInstance.delete(newRpcMerge2);

//             // 客户端合并代码
//             // let lengthStr = JSON.stringify(params) + eventName;
//             // let byteLength = lengthStr.length * 8;

//             // if (!this.rpcMerge.has(getCurrentPlayer().playerId)) {
//             //     let newRpcMerge2 = ClassInstance.newc<RpcMerge>(RpcMerge);
//             //     newRpcMerge2.eventNames.length = 0;
//             //     newRpcMerge2.params.length = 0;
//             //     newRpcMerge2.bytesLength = 0;
//             //     this.rpcMerge.set(getCurrentPlayer().playerId, newRpcMerge2);
//             // }
//             // let merge = this.rpcMerge.get(getCurrentPlayer().playerId);

//             // if (merge.bytesLength + byteLength >= this.maxBytesLength) {
//             //     //console.error("dispatchToServer 字节超过" + this.maxBytesLength + " 直接发送 : " + byteLength + "|" + merge.bytesLength);
//             //     this.commitRpc();

//             //     if (!this.rpcMerge.has(getCurrentPlayer().playerId)) {
//             //         let newRpcMerge2 = ClassInstance.newc<RpcMerge>(RpcMerge);
//             //         newRpcMerge2.eventNames.length = 0;
//             //         newRpcMerge2.params.length = 0;
//             //         newRpcMerge2.bytesLength = 0;
//             //         this.rpcMerge.set(getCurrentPlayer().playerId, newRpcMerge2);
//             //     }

//             //     merge = this.rpcMerge.get(getCurrentPlayer().playerId);

//             // }

//             // merge.eventNames.push(eventName);
//             // merge.params.push(params);
//             // merge.bytesLength += byteLength;

//             return;
//         }

//     }

//     private curSec: number = 0;
//     private curSendCount: number = 0;

//     private commitRpc() {

//         if (SystemUtil.isClient()) {

//             this.rpcMerge.forEach(e => {

//                 this.curSendCount++;
//                 Event.dispatchToServer(this.send2ServerEventName, e);
//                 oTrace("bytes length = " + e.bytesLength);

//                 ClassInstance.delete(e);

//             })

//         }
//         if (SystemUtil.isServer()) {
//             this.rpcMerge.forEach((e, playerId, maps) => {
//                 let player = Player.getPlayer(playerId);
//                 if (player == null) return;
//                 this.curSendCount++;
//                 Event.dispatchToClient(Player.getPlayer(playerId), this.send2ClientEventName, e);
//                 oTrace("bytes length = " + e.bytesLength);
//                 ClassInstance.delete(e);
//             });
//         }

//         this.rpcMerge.clear();

//         var sec = new Date().getSeconds();
//         if (sec != this.curSec) {
//             this.curSec = sec;
//             oTrace("rpc次数 : " + this.curSendCount);
//             this.curSendCount = 0;
//         }

//         //console.error("提交rpc : " + PerTimer.instance.frameCount);

//     }

// }
