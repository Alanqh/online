/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-17 16:32:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-17 16:40:22
 * @FilePath: \巴里监狱\JavaScripts\CheckUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CheckUI_Generate from "./ui-generate/CheckUI_generate"


export class CheckUI extends CheckUI_Generate {
	private static _instance: CheckUI
	private resListener: Function//保存的结果回调方法

	private static get instance(): CheckUI {
		if (CheckUI._instance == null) {
			CheckUI._instance = mw.UIService.create(CheckUI)
		}
		return CheckUI._instance
	}
	onStart() {
		this.confirm.onClicked.add(() => {
			mw.UIService.hide(CheckUI)
			this.resListener(true)
		})
		this.cancel.onClicked.add(() => {
			mw.UIService.hide(CheckUI)
			this.resListener(false)
		})
	}
	public static showUI(title: string = '标题', content: string = '内容', confirm: string = '确认', cancel: string = '取消', resListener: (res: boolean) => void) {
		mw.UIService.showUI(CheckUI.instance, mw.UILayerTop)
		CheckUI.instance.changeUI(title, content, confirm, cancel, resListener)
	}
	private changeUI(title: string, content: string, confirm: string, cancel: string, resListener: (res: boolean) => void) {
		this.title.text = title
		this.content.text = content
		this.confirm.text = confirm
		this.cancel.text = cancel
		this.resListener = resListener
	}
}
