




@UIBind('UI/SettleUI.ui')
export default class SettleUI_Generate extends UIScript {
		private canvas_Champion_Internal: mw.Canvas
	public get canvas_Champion(): mw.Canvas {
		if(!this.canvas_Champion_Internal&&this.uiWidgetBase) {
			this.canvas_Champion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Champion') as mw.Canvas
		}
		return this.canvas_Champion_Internal
	}
	private img_Champion_Internal: mw.Image
	public get img_Champion(): mw.Image {
		if(!this.img_Champion_Internal&&this.uiWidgetBase) {
			this.img_Champion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Champion/img_Champion') as mw.Image
		}
		return this.img_Champion_Internal
	}
	private img_Champion_Eng_Internal: mw.Image
	public get img_Champion_Eng(): mw.Image {
		if(!this.img_Champion_Eng_Internal&&this.uiWidgetBase) {
			this.img_Champion_Eng_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Champion/img_Champion_Eng') as mw.Image
		}
		return this.img_Champion_Eng_Internal
	}
	private mBack_Internal: mw.Button
	public get mBack(): mw.Button {
		if(!this.mBack_Internal&&this.uiWidgetBase) {
			this.mBack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Back/mBack') as mw.Button
		}
		return this.mBack_Internal
	}
	private mCountDown_Internal: mw.TextBlock
	public get mCountDown(): mw.TextBlock {
		if(!this.mCountDown_Internal&&this.uiWidgetBase) {
			this.mCountDown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Back/mCountDown') as mw.TextBlock
		}
		return this.mCountDown_Internal
	}
	private mAward_Internal: mw.Canvas
	public get mAward(): mw.Canvas {
		if(!this.mAward_Internal&&this.uiWidgetBase) {
			this.mAward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Award/mAward') as mw.Canvas
		}
		return this.mAward_Internal
	}
	private canvas_Out_Internal: mw.Canvas
	public get canvas_Out(): mw.Canvas {
		if(!this.canvas_Out_Internal&&this.uiWidgetBase) {
			this.canvas_Out_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Out') as mw.Canvas
		}
		return this.canvas_Out_Internal
	}
	private img_Out_Internal: mw.Image
	public get img_Out(): mw.Image {
		if(!this.img_Out_Internal&&this.uiWidgetBase) {
			this.img_Out_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Out/img_Out') as mw.Image
		}
		return this.img_Out_Internal
	}
	private img_Out_Eng_Internal: mw.Image
	public get img_Out_Eng(): mw.Image {
		if(!this.img_Out_Eng_Internal&&this.uiWidgetBase) {
			this.img_Out_Eng_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Out/img_Out_Eng') as mw.Image
		}
		return this.img_Out_Eng_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		

		//按钮添加点击
		
		this.mBack.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCountDown)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Back/Txt_Back") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Award/Txt_Award") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_Out/Txt_ComeOn") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 