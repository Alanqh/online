
 

 @UIBind('UI/ShareUI/integration/mission/MissionNormalPanel.ui')
 export default class MissionNormalPanel_Generate extends UIScript {
	 	private canvas_normal_Internal: mw.Canvas
	public get canvas_normal(): mw.Canvas {
		if(!this.canvas_normal_Internal&&this.uiWidgetBase) {
			this.canvas_normal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_normal') as mw.Canvas
		}
		return this.canvas_normal_Internal
	}
	private scrollBox_mission_Internal: mw.ScrollBox
	public get scrollBox_mission(): mw.ScrollBox {
		if(!this.scrollBox_mission_Internal&&this.uiWidgetBase) {
			this.scrollBox_mission_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_normal/scrollBox_mission') as mw.ScrollBox
		}
		return this.scrollBox_mission_Internal
	}
	private canvas_content02_Internal: mw.Canvas
	public get canvas_content02(): mw.Canvas {
		if(!this.canvas_content02_Internal&&this.uiWidgetBase) {
			this.canvas_content02_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_normal/scrollBox_mission/canvas_content02') as mw.Canvas
		}
		return this.canvas_content02_Internal
	}
	private canvas_taskList2_Internal: mw.Canvas
	public get canvas_taskList2(): mw.Canvas {
		if(!this.canvas_taskList2_Internal&&this.uiWidgetBase) {
			this.canvas_taskList2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_normal/scrollBox_mission/canvas_content02/canvas_taskList2') as mw.Canvas
		}
		return this.canvas_taskList2_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		

		//按钮添加点击
		

		//按钮多语言
		

		//文本多语言
		

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_MissionNormalPanel'] = MissionNormalPanel_Generate;