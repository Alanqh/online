// if (SystemUtil.isClient) {

import Tips_Generate from "../ui-generate/common/Tips_generate";

// 	Event.addServerListener("TIPS_RPC", (context: string) => {
// 		TipsUI.show(context);
// 	});
// }
/**
 * 系统提示
 * 一个顶一个向上跳动，然后消失，最多三条
 */
export default class TipsUI extends Tips_Generate {
	private static readonly Y_START = 400;
	private static readonly Y_OVER = 150;
	private static readonly MOVE_SPEED = 500;
	private static readonly KEEP_TIME = 2;
	private static _instance: TipsUI;
	private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
	private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
	private overCellArr: Array<mw.Canvas> = [];//已经完成的条目

	private static get instance(): TipsUI {
		if (this._instance == null) {
			this._instance = mw.UIService.create(TipsUI)
		}
		return this._instance;
	}


	onStart() {
		this.layer = mw.UILayerTop;
		this.canUpdate = false
		this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
		this.mCell1.visibility = (mw.SlateVisibility.Visible);
		this.mCell2.visibility = (mw.SlateVisibility.Visible);
		this.mCell3.visibility = (mw.SlateVisibility.Visible);
		setTimeout(() => {
			this.mCell1.visibility = (mw.SlateVisibility.Hidden);
			this.mCell2.visibility = (mw.SlateVisibility.Hidden);
			this.mCell3.visibility = (mw.SlateVisibility.Hidden);
		}, 1);
	}

	onShow() {
		this.canUpdate = true
	}

	//隐藏的对象不参与UI布局，所以要布局完成后再隐藏
	onLayout() {
		for (let i = 0; i < this.freeCellArr.length; i++) {
			this.freeCellArr[i].visibility = (mw.SlateVisibility.Collapsed);
		}
	}

	/**
	 * 显示系统提示 (Client Only)
	 * @param content 提示内容
	 */
	public static show(content: string) {
		if (mw.SystemUtil.isServer()) {
			// return;
			// debugger
			// Event.dispatchToAllClient("TIPS_RPC", content);
		} else {

			mw.UIService.showUI(TipsUI.instance)
			TipsUI.instance.showMsg(content);
		}
	}

	private showMsg(content: string) {
		let cell: mw.Canvas = null;
		if (this.freeCellArr.length > 0) {
			cell = this.freeCellArr.shift();
		} else {
			cell = this.activeCellArr.shift();
		}
		let text: mw.TextBlock = cell.findChildByPath('Content_txt') as mw.TextBlock;
		text.text = (content);
		cell["state"] = 0;
		cell["stopTime"] = 0;
		this.activeCellArr.push(cell);
	}

	onUpdate(dt: number) {
		if (this.activeCellArr.length == 0) return;
		let pos: mw.Vector2 = null;
		for (let i = 0; i < this.activeCellArr.length; i++) {
			let cell = this.activeCellArr[i];
			switch (cell["state"]) {
				case 0:
					cell.visibility = (mw.SlateVisibility.Visible);
					pos = cell.position;
					pos.y = TipsUI.Y_START;
					cell.position = (pos);
					cell["state"]++;
					break;
				case 1:
					pos = cell.position;
					pos.y -= TipsUI.MOVE_SPEED * dt;
					if (i == 0) {
						if (pos.y <= TipsUI.Y_OVER) {
							pos.y = TipsUI.Y_OVER;
							cell["state"]++;
						}
					} else {
						let lastCellPos = this.activeCellArr[i - 1].position;
						if (pos.y <= lastCellPos.y + 60) {
							pos.y = lastCellPos.y + 60;
							cell["stopTime"] += dt;
							if (cell["stopTime"] >= TipsUI.KEEP_TIME) {
								cell["state"] += 2;
							}
						}
					}
					cell.position = (pos);
					break;
				case 2:
					cell["stopTime"] += dt;
					if (cell["stopTime"] >= TipsUI.KEEP_TIME) {
						cell["state"]++;
					}
					break;
				case 3:
					cell.visibility = (mw.SlateVisibility.Collapsed);
					this.overCellArr.push(cell);
					break;
			}
		}
		while (this.overCellArr.length > 0) {
			let cell = this.overCellArr.shift();
			let index = this.activeCellArr.indexOf(cell);
			this.activeCellArr.splice(index, 1);
			this.freeCellArr.push(cell);
		}
	}
}