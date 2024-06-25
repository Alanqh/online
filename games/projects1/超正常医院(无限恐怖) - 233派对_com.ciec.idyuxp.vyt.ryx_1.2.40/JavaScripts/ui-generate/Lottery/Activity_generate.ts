
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Lottery/Activity.ui')
export default class Activity_Generate extends UIScript {
		private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private canvas_activity_Internal: mw.Canvas
	public get canvas_activity(): mw.Canvas {
		if(!this.canvas_activity_Internal&&this.uiWidgetBase) {
			this.canvas_activity_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_activity') as mw.Canvas
		}
		return this.canvas_activity_Internal
	}
	private img_activity_bg1_Internal: mw.Image
	public get img_activity_bg1(): mw.Image {
		if(!this.img_activity_bg1_Internal&&this.uiWidgetBase) {
			this.img_activity_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_activity/img_activity_bg1') as mw.Image
		}
		return this.img_activity_bg1_Internal
	}
	private canvas_join_Internal: mw.Canvas
	public get canvas_join(): mw.Canvas {
		if(!this.canvas_join_Internal&&this.uiWidgetBase) {
			this.canvas_join_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_join') as mw.Canvas
		}
		return this.canvas_join_Internal
	}
	private btn_join_Internal: mw.Button
	public get btn_join(): mw.Button {
		if(!this.btn_join_Internal&&this.uiWidgetBase) {
			this.btn_join_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_join/btn_join') as mw.Button
		}
		return this.btn_join_Internal
	}
	private txt_join_Internal: mw.TextBlock
	public get txt_join(): mw.TextBlock {
		if(!this.txt_join_Internal&&this.uiWidgetBase) {
			this.txt_join_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_join/txt_join') as mw.TextBlock
		}
		return this.txt_join_Internal
	}
	private canvas_reward1_Internal: mw.Canvas
	public get canvas_reward1(): mw.Canvas {
		if(!this.canvas_reward1_Internal&&this.uiWidgetBase) {
			this.canvas_reward1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward1') as mw.Canvas
		}
		return this.canvas_reward1_Internal
	}
	private img_reward1_bg_Internal: mw.Image
	public get img_reward1_bg(): mw.Image {
		if(!this.img_reward1_bg_Internal&&this.uiWidgetBase) {
			this.img_reward1_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward1/img_reward1_bg') as mw.Image
		}
		return this.img_reward1_bg_Internal
	}
	private img_reward1_icon_Internal: mw.Image
	public get img_reward1_icon(): mw.Image {
		if(!this.img_reward1_icon_Internal&&this.uiWidgetBase) {
			this.img_reward1_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward1/img_reward1_icon') as mw.Image
		}
		return this.img_reward1_icon_Internal
	}
	private canvas_reward2_Internal: mw.Canvas
	public get canvas_reward2(): mw.Canvas {
		if(!this.canvas_reward2_Internal&&this.uiWidgetBase) {
			this.canvas_reward2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward2') as mw.Canvas
		}
		return this.canvas_reward2_Internal
	}
	private img_reward2_bg_Internal: mw.Image
	public get img_reward2_bg(): mw.Image {
		if(!this.img_reward2_bg_Internal&&this.uiWidgetBase) {
			this.img_reward2_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward2/img_reward2_bg') as mw.Image
		}
		return this.img_reward2_bg_Internal
	}
	private img_reward2_icon_Internal: mw.Image
	public get img_reward2_icon(): mw.Image {
		if(!this.img_reward2_icon_Internal&&this.uiWidgetBase) {
			this.img_reward2_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward2/img_reward2_icon') as mw.Image
		}
		return this.img_reward2_icon_Internal
	}
	private canvas_reward3_Internal: mw.Canvas
	public get canvas_reward3(): mw.Canvas {
		if(!this.canvas_reward3_Internal&&this.uiWidgetBase) {
			this.canvas_reward3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward3') as mw.Canvas
		}
		return this.canvas_reward3_Internal
	}
	private img_reward3_bg_Internal: mw.Image
	public get img_reward3_bg(): mw.Image {
		if(!this.img_reward3_bg_Internal&&this.uiWidgetBase) {
			this.img_reward3_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward3/img_reward3_bg') as mw.Image
		}
		return this.img_reward3_bg_Internal
	}
	private img_reward3_icon_Internal: mw.Image
	public get img_reward3_icon(): mw.Image {
		if(!this.img_reward3_icon_Internal&&this.uiWidgetBase) {
			this.img_reward3_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_reward3/img_reward3_icon') as mw.Image
		}
		return this.img_reward3_icon_Internal
	}
	private canvas_quest_Internal: mw.Canvas
	public get canvas_quest(): mw.Canvas {
		if(!this.canvas_quest_Internal&&this.uiWidgetBase) {
			this.canvas_quest_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest') as mw.Canvas
		}
		return this.canvas_quest_Internal
	}
	private img_quest_bg_Internal: mw.Image
	public get img_quest_bg(): mw.Image {
		if(!this.img_quest_bg_Internal&&this.uiWidgetBase) {
			this.img_quest_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest/img_quest_bg') as mw.Image
		}
		return this.img_quest_bg_Internal
	}
	private img_quest_icon_Internal: mw.Image
	public get img_quest_icon(): mw.Image {
		if(!this.img_quest_icon_Internal&&this.uiWidgetBase) {
			this.img_quest_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest/img_quest_icon') as mw.Image
		}
		return this.img_quest_icon_Internal
	}
	private txt_quest_Internal: mw.TextBlock
	public get txt_quest(): mw.TextBlock {
		if(!this.txt_quest_Internal&&this.uiWidgetBase) {
			this.txt_quest_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest/txt_quest') as mw.TextBlock
		}
		return this.txt_quest_Internal
	}
	private btn_quest_Internal: mw.Button
	public get btn_quest(): mw.Button {
		if(!this.btn_quest_Internal&&this.uiWidgetBase) {
			this.btn_quest_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest/btn_quest') as mw.Button
		}
		return this.btn_quest_Internal
	}
	private txt_quest1_Internal: mw.TextBlock
	public get txt_quest1(): mw.TextBlock {
		if(!this.txt_quest1_Internal&&this.uiWidgetBase) {
			this.txt_quest1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_quest/btn_quest/txt_quest1') as mw.TextBlock
		}
		return this.txt_quest1_Internal
	}
	private canvas_close_Internal: mw.Canvas
	public get canvas_close(): mw.Canvas {
		if(!this.canvas_close_Internal&&this.uiWidgetBase) {
			this.canvas_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_close') as mw.Canvas
		}
		return this.canvas_close_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_close/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.btn_join.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_join");
		})
		
	
		this.btn_quest.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_quest");
		})
		
	
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_close");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_join)
		
	
		this.initLanguage(this.txt_quest)
		
	
		this.initLanguage(this.txt_quest1)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 