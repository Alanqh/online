




@UIBind('UI/ChampionShow.ui')
export default class ChampionShow_Generate extends UIScript {
		private canvas_Bottom_Internal: mw.Canvas
	public get canvas_Bottom(): mw.Canvas {
		if(!this.canvas_Bottom_Internal&&this.uiWidgetBase) {
			this.canvas_Bottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Bottom') as mw.Canvas
		}
		return this.canvas_Bottom_Internal
	}
	private img_Bottom_Internal: mw.Image
	public get img_Bottom(): mw.Image {
		if(!this.img_Bottom_Internal&&this.uiWidgetBase) {
			this.img_Bottom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Bottom/img_Bottom') as mw.Image
		}
		return this.img_Bottom_Internal
	}
	private img_Arrowhead_RIght_Internal: mw.Image
	public get img_Arrowhead_RIght(): mw.Image {
		if(!this.img_Arrowhead_RIght_Internal&&this.uiWidgetBase) {
			this.img_Arrowhead_RIght_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Arrowhead_RIght') as mw.Image
		}
		return this.img_Arrowhead_RIght_Internal
	}
	private img_Arrowhead_Left_Internal: mw.Image
	public get img_Arrowhead_Left(): mw.Image {
		if(!this.img_Arrowhead_Left_Internal&&this.uiWidgetBase) {
			this.img_Arrowhead_Left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_Arrowhead_Left') as mw.Image
		}
		return this.img_Arrowhead_Left_Internal
	}
	private canvas_TopLeft_Internal: mw.Canvas
	public get canvas_TopLeft(): mw.Canvas {
		if(!this.canvas_TopLeft_Internal&&this.uiWidgetBase) {
			this.canvas_TopLeft_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopLeft') as mw.Canvas
		}
		return this.canvas_TopLeft_Internal
	}
	private img_Trophy_Internal: mw.Image
	public get img_Trophy(): mw.Image {
		if(!this.img_Trophy_Internal&&this.uiWidgetBase) {
			this.img_Trophy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopLeft/img_Trophy') as mw.Image
		}
		return this.img_Trophy_Internal
	}
	private img_Rinbow_Internal: mw.Image
	public get img_Rinbow(): mw.Image {
		if(!this.img_Rinbow_Internal&&this.uiWidgetBase) {
			this.img_Rinbow_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopLeft/img_Rinbow') as mw.Image
		}
		return this.img_Rinbow_Internal
	}
	private canvas_TopMiddle_Internal: mw.Canvas
	public get canvas_TopMiddle(): mw.Canvas {
		if(!this.canvas_TopMiddle_Internal&&this.uiWidgetBase) {
			this.canvas_TopMiddle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopMiddle') as mw.Canvas
		}
		return this.canvas_TopMiddle_Internal
	}
	private img_Champion_Internal: mw.Image
	public get img_Champion(): mw.Image {
		if(!this.img_Champion_Internal&&this.uiWidgetBase) {
			this.img_Champion_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopMiddle/img_Champion') as mw.Image
		}
		return this.img_Champion_Internal
	}
	private img_Champion_Eng_Internal: mw.Image
	public get img_Champion_Eng(): mw.Image {
		if(!this.img_Champion_Eng_Internal&&this.uiWidgetBase) {
			this.img_Champion_Eng_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_TopMiddle/img_Champion_Eng') as mw.Image
		}
		return this.img_Champion_Eng_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Best/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private canvas_Skip_Internal: mw.Canvas
	public get canvas_Skip(): mw.Canvas {
		if(!this.canvas_Skip_Internal&&this.uiWidgetBase) {
			this.canvas_Skip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Skip') as mw.Canvas
		}
		return this.canvas_Skip_Internal
	}
	private mSkip_Internal: mw.StaleButton
	public get mSkip(): mw.StaleButton {
		if(!this.mSkip_Internal&&this.uiWidgetBase) {
			this.mSkip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Skip/mSkip') as mw.StaleButton
		}
		return this.mSkip_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
		//按钮添加点击
		
		this.mSkip.onClicked.add(()=>{
			Event.dispatchToLocal("PLAY_BY_CFG", 18);
		})
		this.initLanguage(this.mSkip);
		
	

		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mName)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas_Best/TextBlock") as any);
		
	
	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
	 
}
 