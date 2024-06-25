
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/leaderboardModule/RankItem.ui
*/



@UIBind('UI/leaderboardModule/RankItem.ui')
export default class RankItem_Generate extends UIScript {
		private field_Internal: mw.TextBlock
	public get field(): mw.TextBlock {
		if(!this.field_Internal&&this.uiWidgetBase) {
			this.field_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField/sizeCanvas/field') as mw.TextBlock
		}
		return this.field_Internal
	}
	private sizeCanvas_Internal: mw.Canvas
	public get sizeCanvas(): mw.Canvas {
		if(!this.sizeCanvas_Internal&&this.uiWidgetBase) {
			this.sizeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField/sizeCanvas') as mw.Canvas
		}
		return this.sizeCanvas_Internal
	}
	private canvasField_Internal: mw.Canvas
	public get canvasField(): mw.Canvas {
		if(!this.canvasField_Internal&&this.uiWidgetBase) {
			this.canvasField_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField') as mw.Canvas
		}
		return this.canvasField_Internal
	}
	private field1_Internal: mw.TextBlock
	public get field1(): mw.TextBlock {
		if(!this.field1_Internal&&this.uiWidgetBase) {
			this.field1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField1/sizeCanvas1/field1') as mw.TextBlock
		}
		return this.field1_Internal
	}
	private sizeCanvas1_Internal: mw.Canvas
	public get sizeCanvas1(): mw.Canvas {
		if(!this.sizeCanvas1_Internal&&this.uiWidgetBase) {
			this.sizeCanvas1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField1/sizeCanvas1') as mw.Canvas
		}
		return this.sizeCanvas1_Internal
	}
	private canvasField1_Internal: mw.Canvas
	public get canvasField1(): mw.Canvas {
		if(!this.canvasField1_Internal&&this.uiWidgetBase) {
			this.canvasField1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField1') as mw.Canvas
		}
		return this.canvasField1_Internal
	}
	private field2_Internal: mw.TextBlock
	public get field2(): mw.TextBlock {
		if(!this.field2_Internal&&this.uiWidgetBase) {
			this.field2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField2/sizeCanvas2/field2') as mw.TextBlock
		}
		return this.field2_Internal
	}
	private sizeCanvas2_Internal: mw.Canvas
	public get sizeCanvas2(): mw.Canvas {
		if(!this.sizeCanvas2_Internal&&this.uiWidgetBase) {
			this.sizeCanvas2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField2/sizeCanvas2') as mw.Canvas
		}
		return this.sizeCanvas2_Internal
	}
	private canvasField2_Internal: mw.Canvas
	public get canvasField2(): mw.Canvas {
		if(!this.canvasField2_Internal&&this.uiWidgetBase) {
			this.canvasField2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField2') as mw.Canvas
		}
		return this.canvasField2_Internal
	}
	private field3_Internal: mw.TextBlock
	public get field3(): mw.TextBlock {
		if(!this.field3_Internal&&this.uiWidgetBase) {
			this.field3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField3/sizeCanvas3/field3') as mw.TextBlock
		}
		return this.field3_Internal
	}
	private sizeCanvas3_Internal: mw.Canvas
	public get sizeCanvas3(): mw.Canvas {
		if(!this.sizeCanvas3_Internal&&this.uiWidgetBase) {
			this.sizeCanvas3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField3/sizeCanvas3') as mw.Canvas
		}
		return this.sizeCanvas3_Internal
	}
	private canvasField3_Internal: mw.Canvas
	public get canvasField3(): mw.Canvas {
		if(!this.canvasField3_Internal&&this.uiWidgetBase) {
			this.canvasField3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasField3') as mw.Canvas
		}
		return this.canvasField3_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 