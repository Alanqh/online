// import { GameConfig } from "../../config/GameConfig";
// import { GlobalData } from "../../const/GlobalData";
// import DeadCount_Generate from "../../ui-generate/Common/DeadCount_generate";
// import { utils } from "../../utils/uitls";
// import { PlayerModuleC } from "../Player/PlayerModuleC";
// import { DeadCountData } from "./DeadCountData";

// export default class P_DeadCount extends DeadCount_Generate {

//     private curTween: mw.Tween<any> = null;

//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected onStart(): void {
//         this.mBtn_Skip.visibility = SlateVisibility.Visible;
//         // 关闭
//         this.mBtn_Yes.onClicked.add(() => {
//             this.hide();
//         })
//         // 跳过
//         this.mBtn_Skip.onClicked.add(() => {
//             this.skip();
//             this.mBtn_Skip.visibility = SlateVisibility.Hidden;
//         })
//         // 点击确定复活
//         this.mBtn_Yes.onClicked.add(() => {
//             this.hide();
//             ModuleService.getModule(PlayerModuleC).revivePlayerById(Player.localPlayer.playerId);
//         });
//     }

//     /**把数据设置给UI */
//     public setData(deadCountData: DeadCountData, isDie: boolean) {
//         // 存活天数
//         this.mText_DayCount.text = utils.Format(GameConfig.Language.DeadCount_Text_1.Value, deadCountData.aliveDays);
//         // 吃食物数量
//         this.mText_Eat.text = utils.Format(GameConfig.Language.DeadCount_Text_4.Value, deadCountData.eatFoodCount);
//         // 击退鬼的次数
//         this.mText_Push.text = utils.Format(GameConfig.Language.DeadCount_Text_3.Value, deadCountData.beatGhostCount);
//         // 逃跑的距离
//         this.mText_Walk.text = utils.Format(GameConfig.Language.DeadCount_Text_2.Value, deadCountData.escapeDistance);
//         // 移动家具的数量
//         this.mText_CatchObj.text = utils.Format(GameConfig.Language.DeadCount_Text_5.Value, deadCountData.catchObjCount);
//         // 最大高度
//         this.mText_MaxHeight.text = utils.Format(GameConfig.Language.DeadCount_Text_6.Value, deadCountData.maxHeight);
//         // 玩家头像
//         AccountService.fillAvatar(this.mImage_Player);
//     }

//     /**显示UI动效 */
//     public showUIEffect() {
//         this.mBtn_Skip.visibility = SlateVisibility.Visible;
//         this.mText_Push.visibility = SlateVisibility.Hidden;
//         this.mText_Eat.visibility = SlateVisibility.Hidden;
//         this.mText_CatchObj.visibility = SlateVisibility.Hidden;
//         this.mText_MaxHeight.visibility = SlateVisibility.Hidden;
//         this.show();

//         this.mText_Walk.visibility = SlateVisibility.Visible;
//         let tween1 = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, GlobalData.DeadCount.fadeInTime * 1000)
//             .onUpdate((obj) => {
//                 this.mText_Walk.renderOpacity = obj.alpha;
//             })
//             .onComplete(() => {
//                 this.mText_Push.visibility = SlateVisibility.Visible;
//                 tween2.start();
//                 this.curTween = tween2;
//             });
//         this.curTween = tween1;
//         let tween2 = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, GlobalData.DeadCount.fadeInTime * 1000)
//             .onUpdate((obj) => {
//                 this.mText_Push.renderOpacity = obj.alpha;

//             })
//             .onComplete(() => {
//                 this.mText_Eat.visibility = SlateVisibility.Visible;
//                 tween3.start();
//                 this.curTween = tween3;
//             });
//         let tween3 = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, GlobalData.DeadCount.fadeInTime * 1000)
//             .onUpdate((obj) => {
//                 this.mText_Eat.renderOpacity = obj.alpha;
//             })
//             .onComplete(() => {
//                 this.mText_CatchObj.visibility = SlateVisibility.Visible;
//                 tween4.start();
//                 this.curTween = tween4;
//             });
//         let tween4 = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, GlobalData.DeadCount.fadeInTime * 1000)
//             .onUpdate((obj) => {
//                 this.mText_CatchObj.renderOpacity = obj.alpha;
//             })
//             .onComplete(() => {
//                 this.mText_MaxHeight.visibility = SlateVisibility.Visible;
//                 tween5.start();
//                 this.curTween = tween5;
//             });
//         let tween5 = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, GlobalData.DeadCount.fadeInTime * 1000)
//             .onUpdate((obj) => {
//                 this.mText_MaxHeight.renderOpacity = obj.alpha;
//             })
//         // Tween! 启动! 
//         tween1.start();
//     }

//     /**跳过 */
//     private skip() {
//         this.curTween.stop();
//         this.mText_Push.visibility = SlateVisibility.Visible;
//         this.mText_Eat.visibility = SlateVisibility.Visible;
//         this.mText_Walk.renderOpacity = 1;
//         this.mText_Push.renderOpacity = 1;
//         this.mText_Eat.renderOpacity = 1;
//     }
// }