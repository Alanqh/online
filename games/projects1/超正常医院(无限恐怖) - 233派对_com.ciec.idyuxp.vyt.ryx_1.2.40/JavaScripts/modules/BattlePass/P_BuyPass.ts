
/** 
 * AUTHOR: 芝士李浩
 * TIME: 2024.04.24-22.11.48
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../config/GameConfig";
import { IGamePassRewaridElement } from "../../config/GamePassRewarid";
import { GlobalData } from "../../const/GlobalData";
import PassCheckBuy_Generate from "../../ui-generate/Event/PassCheckBuy_generate";
import { P_RewardItem } from "../Lottery/LotteryRewardWindow";
import TSIAP from "../Shop/IAPInstance";
import P_PassRewardItem, { PassRewardState } from "./P_PassRewardItem";

export default class P_BuyPass extends PassCheckBuy_Generate {

	/**购买战令成功 */
	public onSuccessBuy: Action = new Action();

	/**奖励Map */
	public rewardMap: Map<string, P_PassRewardItem> = new Map<string, P_PassRewardItem>();

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		// 关闭
		this.mBtn_Close.onClicked.add(() => {
			this.hide();
		})
		// 设置价格
		this.mTxt_Price.text = GlobalData.BattlePass.passCost.toString();
		// 初始化奖励列表
		this.initRewardList();
	}


	/**初始化奖励列表 */
	private initRewardList() {
		// 根据名字合并奖励数量
		let rewardItemMap = new Map<string, { count: number, conf: IGamePassRewaridElement }>();
		let confs = GameConfig.GamePassLevel.getAllElement();
		confs.forEach((conf) => {
			conf.SpecialRewardCfgID.forEach((rewardId) => {
				let rewardConf = GameConfig.GamePassRewarid.getElement(rewardId);
				let reward = rewardItemMap.get(rewardConf.RewardName);
				if (reward == null) {
					reward = { count: 0, conf: rewardConf };
				}
				reward.count += rewardConf.Count;
				rewardItemMap.set(rewardConf.RewardName, reward);
			})
		});
		// 初始化奖励列表UI
		rewardItemMap.forEach((reward, name) => {
			let item = UIService.create(P_PassRewardItem);
			item.mTxt_Num.text = reward.count.toString();
			item.mImg_Icon.imageGuid = reward.conf.Icon;
			item.uiObject.size = item.uiObject.size.multiply(GlobalData.BattlePass.rewardItemScale);
			item.setStateUI(PassRewardState.UnReceive);
			this.mCanvas_Item.addChild(item.uiObject);
		})
	}


}
