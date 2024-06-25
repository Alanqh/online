
 

 @UIBind('UI/ShareUI/checkin/CheckIn_UI.ui')
 export default class CheckIn_UI_Generate extends UIScript {
	 	private canvas_checkIn_Internal: mw.Canvas
	public get canvas_checkIn(): mw.Canvas {
		if(!this.canvas_checkIn_Internal&&this.uiWidgetBase) {
			this.canvas_checkIn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn') as mw.Canvas
		}
		return this.canvas_checkIn_Internal
	}
	private img_rewardsBg_Internal: mw.Image
	public get img_rewardsBg(): mw.Image {
		if(!this.img_rewardsBg_Internal&&this.uiWidgetBase) {
			this.img_rewardsBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/img_rewardsBg') as mw.Image
		}
		return this.img_rewardsBg_Internal
	}
	private canvas_rewards_Internal: mw.Canvas
	public get canvas_rewards(): mw.Canvas {
		if(!this.canvas_rewards_Internal&&this.uiWidgetBase) {
			this.canvas_rewards_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards') as mw.Canvas
		}
		return this.canvas_rewards_Internal
	}
	private canvas_day1_Internal: mw.Canvas
	public get canvas_day1(): mw.Canvas {
		if(!this.canvas_day1_Internal&&this.uiWidgetBase) {
			this.canvas_day1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day1') as mw.Canvas
		}
		return this.canvas_day1_Internal
	}
	private canvas_day2_Internal: mw.Canvas
	public get canvas_day2(): mw.Canvas {
		if(!this.canvas_day2_Internal&&this.uiWidgetBase) {
			this.canvas_day2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day2') as mw.Canvas
		}
		return this.canvas_day2_Internal
	}
	private canvas_day3_Internal: mw.Canvas
	public get canvas_day3(): mw.Canvas {
		if(!this.canvas_day3_Internal&&this.uiWidgetBase) {
			this.canvas_day3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day3') as mw.Canvas
		}
		return this.canvas_day3_Internal
	}
	private canvas_day4_Internal: mw.Canvas
	public get canvas_day4(): mw.Canvas {
		if(!this.canvas_day4_Internal&&this.uiWidgetBase) {
			this.canvas_day4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day4') as mw.Canvas
		}
		return this.canvas_day4_Internal
	}
	private canvas_day5_Internal: mw.Canvas
	public get canvas_day5(): mw.Canvas {
		if(!this.canvas_day5_Internal&&this.uiWidgetBase) {
			this.canvas_day5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day5') as mw.Canvas
		}
		return this.canvas_day5_Internal
	}
	private canvas_day6_Internal: mw.Canvas
	public get canvas_day6(): mw.Canvas {
		if(!this.canvas_day6_Internal&&this.uiWidgetBase) {
			this.canvas_day6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day6') as mw.Canvas
		}
		return this.canvas_day6_Internal
	}
	private canvas_day7_Internal: mw.Canvas
	public get canvas_day7(): mw.Canvas {
		if(!this.canvas_day7_Internal&&this.uiWidgetBase) {
			this.canvas_day7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/canvas_rewards/canvas_day7') as mw.Canvas
		}
		return this.canvas_day7_Internal
	}
	private text_checkInTitle_Internal: mw.TextBlock
	public get text_checkInTitle(): mw.TextBlock {
		if(!this.text_checkInTitle_Internal&&this.uiWidgetBase) {
			this.text_checkInTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/text_checkInTitle') as mw.TextBlock
		}
		return this.text_checkInTitle_Internal
	}
	private text_checkInDesc_Internal: mw.TextBlock
	public get text_checkInDesc(): mw.TextBlock {
		if(!this.text_checkInDesc_Internal&&this.uiWidgetBase) {
			this.text_checkInDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/text_checkInDesc') as mw.TextBlock
		}
		return this.text_checkInDesc_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_checkIn/btn_back') as mw.Button
		}
		return this.btn_back_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CheckIn_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_checkInTitle)
		this.text_checkInTitle.isRichText = true;
		
	
		this.initLanguage(this.text_checkInDesc)
		this.text_checkInDesc.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day1/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day1/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day1/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day1/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day2/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day2/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day2/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day2/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day3/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day3/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day3/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day3/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day4/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day4/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day4/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day4/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day5/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day5/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day5/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day5/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day6/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day6/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day6/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day6/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day7/Text_day1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day7/Canvas_item/Text_itemNum") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day7/Canvas_item/Text_itemName") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/canvas_rewards/canvas_day7/Text_get1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_checkIn/TextBlock_2") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CheckIn_UI'] = CheckIn_UI_Generate;