import RankUI1_Generate from "../ui-generate/Rank/RankUI1_generate";
import RankItemUI from "./RankItemUI";

/**上边距 */
const TopMargin = 200
/**item间的边距 */
const ItemSpace = 50
const ItemWidth = 200
const BottomMargin = 200

/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-03-07 09:58:08
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-08 10:08:32
 * @FilePath     : \stumbleguys\JavaScripts\UI\RankUI.ts
 * @Description  : 修改描述
 */
export default class RankUI extends RankUI1_Generate {
	ranking: number = 1
	setLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次
	 */
	protected onStart() {
		Event.addLocalListener(`LanguageInit`, () => {
			this.setLanguage(this.mRankText);
			this.setLanguage(this.mTextRankSelf);
		});
		this.setLanguage(this.mRankText);
		this.setLanguage(this.mTextRankSelf);
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerMiddle;
		Event.addLocalListener("refreshRank", (name: string) => {
			this.refreshView(name)
		})

		Event.addLocalListener("SetSelfTime", (time: number) => {
			let minute: number = Math.floor(Math.floor(time / 1000) / 60)
			let second: number = Math.floor(time / 1000) % 60
			let ms: number = Math.floor(time / 10) - Math.floor(time / 1000) * 100
			this.mTextTime.text = minute + " ' " + second + " '' " + ms
		})

		//最后一行显示当前玩家的数据
		mw.AccountService.fillAvatar(this.mImgHead)
		this.mTextName.text = mw.AccountService.getNickName()
	}

	async refreshView(name: string) {
		if (name == mw.AccountService.getNickName()) this.mTextRankSelf.text = this.ranking.toString()
		let item = mw.UIService.create(RankItemUI)
		item.init(this.ranking, name)
		this.ranking += 1
		let curY = TopMargin + (ItemSpace + ItemWidth) * (this.ranking - 2)
		this.mCanvasView.addChild(item.uiObject)
		item.uiObject.position = new Vector2(0, curY)
	}
}
