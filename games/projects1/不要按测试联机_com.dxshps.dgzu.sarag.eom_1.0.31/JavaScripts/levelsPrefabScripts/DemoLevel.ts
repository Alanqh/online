// import { oTrace } from "odin";
// import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
// import { recordCharacter } from "../Prefabs/CheckPoint/Script/CheckPoint";
// import { GameConfig } from "../config/GameConfig";
// import { ILevelElement } from "../config/Level";
// import { GameEventC2C, GamingCtrlEventS2S, LevelEventC2C, LevelEventS2S } from "../const/GameCommonEvent";
// import { GlobalData } from "../const/GlobalData";
// import GameComUtils from "../utils/GameComUtils";
/**
 * 测试脚本，后续都使用Level_Normal
 * TODO 测试完毕后删除该脚本
 */
// @Component
// export default class DemoLevel extends Script {

//     @mw.Property({ displayName: "胜利触发器", capture: true })
//     private winTriggerGuid: string = "";

//     @mw.Property({ displayName: "死亡触发器，DeathTriggers下触发器数量" })
//     private deadTriggerNum: number = 0;
//     private deadTriggerParentName: string = "DeathTriggers";

//     @mw.Property({ group: "基础设置", displayName: "数据表id" })
//     public configID: number = 10001;

//     @mw.Property({ replicated: true, onChanged: "onTimerChange" })
//     public totalTimer: number = 0;
//     private onTimerChange() {
//         Event.dispatchToLocal(LevelEventC2C.LEVEL_TIMECHANGE_C2C, this.totalTimer)
//     }

//     @mw.Property({ replicated: true, onChanged: "onWinerChange" })
//     public winPlayer: number[] = [];
//     // 修改获胜玩家
//     private onWinerChange() {
//         Event.dispatchToLocal(LevelEventC2C.LEVEL_WINERCHANGE_C2C, this.winPlayer, this.configID)
//     }

//     protected myConfig: ILevelElement = null;
//     private deadconfig = GameConfig.RuleGame.getElement(10018);
//     private timer: number = 0;

//     private resetListener: EventListener;
//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected onStart(): void {
//         this.myConfig = GameConfig.Level.getElement(this.configID);
//         if (SystemUtil.isServer()) {
//             this.initServer();
//         }

//         if (SystemUtil.isClient()) {
//             this.initClient();
//         }

//         oTrace('guan log DemoLevel onStart');
//     }

//     private async initClient() {
//         await this.gameObject.asyncReady();
//         this.findDeathTriggers();
//         this.resetListener = Event.addLocalListener(GameEventC2C.GAME_RESET_PLAYER_POS_C2C, () => {
//             this.reborn();
//         })
//     }

//     private async findDeathTriggers() {
//         if (this.deadTriggerNum == 0) return;

//         let deathTriggerParent = this.gameObject.getChildByName(this.deadTriggerParentName);
//         if (deathTriggerParent) {
//             await deathTriggerParent.asyncReady();
//             // 触发器名称从1开始
//             for (let i = 1; i <= this.deadTriggerNum; i++) {
//                 let deadTrigger = deathTriggerParent.getChildByName(i.toString()) as Trigger;
//                 if (!deadTrigger) {
//                     oTrace('guan log 没找到触发器', i);
//                     continue;
//                 }
//                 await deadTrigger.asyncReady();
//                 deadTrigger.onEnter.add(this.playerEnterDeadTrigger);

//                 oTrace('guan log 找到了死亡触发器', i);
//             }
//         }
//     }

//     private playerEnterDeadTrigger = (obj: GameObject) => {
//         if (!GameComUtils.check_isLocalPlayer(obj)) {
//             return
//         }
//         this.useUpdate = true;
//         this.timer = TimeUtil.elapsedTime() + this.deadconfig.float_Value;

//         Player.localPlayer.character.ragdollEnabled = true;
//     }


//     private startListener: EventListener;

//     private async initServer() {
//         this.startListener = Event.addLocalListener(GamingCtrlEventS2S.CTRL_GAMING_START_PLAY, () => {
//             this.countdownTimer = TimeUtil.elapsedTime() + 1;
//             this.useUpdate = true;
//             let plist = Player.getAllPlayers();

//             let newP = this.myConfig.birthPoint.clone();
//             newP.z += 100;

//             let maxCount = plist.length > 15 ? plist.length : 15;
//             let forwardDir = this.myConfig.finishDirection;
//             let posLis = GameComUtils.getPos(newP,
//                 forwardDir,
//                 maxCount,
//                 200,
//                 300,
//                 6)

//             for (let i = 0; i < plist.length; i++) {
//                 // 确保了获得的位置比玩家数量多
//                 plist[i].character.worldTransform.position = posLis[i];
//             }
//         })

//         let trigger = await GameObject.asyncFindGameObjectById(this.winTriggerGuid) as Trigger;

//         trigger.onEnter.add(this.playerEnterWindTrigger);

//         this.totalTimer = this.myConfig.levelTime;
//         oTrace('guan log 关卡创建完毕');
//         // 初始化完毕，发送通知
//         Event.dispatchToLocal(LevelEventS2S.LEVEL_CREATE_PREFAB_DONE_S2S);
//     }

//     private playerEnterWindTrigger = (obj: GameObject) => {
//         if (!PlayerManagerExtesion.isCharacter(obj)) {
//             return
//         }

//         this.addWinPlayer(obj.player.playerId);

//         // 第二轮，只有1个玩家可以赢！！！
//         if (GlobalData.levelEndCount == 1) {
//             Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S)
//             return
//         }

//         if (this.winPlayer.length == this.myConfig.winNum) {
//             // 单轮游戏结束
//             Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S)
//         }
//     }

//     protected addWinPlayer(playerID: number) {
//         oTrace('guan log 进入胜利触发器', playerID);
//         if (this.winPlayer.includes(playerID)) {
//             oTrace('guan log 已经在胜利列表中');
//             return false;
//         }
//         Event.dispatchToLocal(LevelEventS2S.LEVEL_ADD_WINER_S2S, playerID)

//         let pidList = Array.from(this.winPlayer);
//         pidList.push(playerID);
//         this.winPlayer = pidList;
//         return true;
//     }

//     // 时间流逝
//     public timeLapse(value: number) {
//         if (this.totalTimer <= 0) {
//             return
//         }
//         if (this.totalTimer >= value) {
//             this.totalTimer -= value;
//         } else {
//             this.totalTimer = 0;
//         }

//         if (this.totalTimer == 0) {
//             Event.dispatchToLocal(LevelEventS2S.LEVEL_GAMING_DONE_S2S);
//             this.useUpdate = false;
//         }

//     }


//     /**
//      * 周期函数 每帧执行
//      * 此函数执行需要将this.useUpdate赋值为true
//      * @param dt 当前帧与上一帧的延迟 / 秒
//     */
//     protected onUpdate(dt: number): void {
//         this.clientUpdate();
//         this.serverUpdate();
//     }

//     protected countdownTimer: number;
//     private serverUpdate() {
//         if (SystemUtil.isClient()) return
//         if (TimeUtil.elapsedTime() < this.countdownTimer) {
//             return;
//         }
//         this.countdownTimer = TimeUtil.elapsedTime() + 1;
//         this.timeLapse(1);
//     }

//     private clientUpdate() {
//         if (SystemUtil.isServer()) return
//         if (this.timer == -1 || TimeUtil.elapsedTime() < this.timer) return
//         this.timer = -1;

//         this.reborn();
//     }

//     private reborn() {

//         if (recordCharacter.checkPoint == -1) {
//             // 默认出生点
//             Player.localPlayer.character.worldTransform.position = this.myConfig.birthPoint;
//         } else {

//             // Player.localPlayer.character.worldTransform.position = recordCharacter.location;
//         }
//         Player.localPlayer.character.ragdollEnabled = false;
//         // 重生特效
//         GameComUtils.playEffectOnChar(Player.localPlayer.character, this.deadconfig.int_Value);
//     }

//     /** 脚本被销毁时最后一帧执行完调用此函数 */
//     protected onDestroy(): void {
//         if (this.startListener) {
//             Event.removeListener(this.startListener);
//         }
//         if (this.resetListener) {
//             Event.removeListener(this.resetListener);
//         }

//         oTrace('guan log DemoLevel onDestroy');
//     }
// }