
 

 @UIBind('UI/ShareUI/rank/RankingList_UI.ui')
 export default class RankingList_UI_Generate extends UIScript {
	 	private canvas_rankingList_Internal: mw.Canvas
	public get canvas_rankingList(): mw.Canvas {
		if(!this.canvas_rankingList_Internal&&this.uiWidgetBase) {
			this.canvas_rankingList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList') as mw.Canvas
		}
		return this.canvas_rankingList_Internal
	}
	private img_bg_Internal: mw.Image
	public get img_bg(): mw.Image {
		if(!this.img_bg_Internal&&this.uiWidgetBase) {
			this.img_bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/img_bg') as mw.Image
		}
		return this.img_bg_Internal
	}
	private text_title_Internal: mw.TextBlock
	public get text_title(): mw.TextBlock {
		if(!this.text_title_Internal&&this.uiWidgetBase) {
			this.text_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/text_title') as mw.TextBlock
		}
		return this.text_title_Internal
	}
	private text_time_Internal: mw.TextBlock
	public get text_time(): mw.TextBlock {
		if(!this.text_time_Internal&&this.uiWidgetBase) {
			this.text_time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/text_time') as mw.TextBlock
		}
		return this.text_time_Internal
	}
	private canvas_list_Internal: mw.Canvas
	public get canvas_list(): mw.Canvas {
		if(!this.canvas_list_Internal&&this.uiWidgetBase) {
			this.canvas_list_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list') as mw.Canvas
		}
		return this.canvas_list_Internal
	}
	private canva_rankContent_Internal: mw.Canvas
	public get canva_rankContent(): mw.Canvas {
		if(!this.canva_rankContent_Internal&&this.uiWidgetBase) {
			this.canva_rankContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/ScrollBox/canva_rankContent') as mw.Canvas
		}
		return this.canva_rankContent_Internal
	}
	private text_rankNum_Internal: mw.TextBlock
	public get text_rankNum(): mw.TextBlock {
		if(!this.text_rankNum_Internal&&this.uiWidgetBase) {
			this.text_rankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/text_rankNum') as mw.TextBlock
		}
		return this.text_rankNum_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private text_data_Internal: mw.TextBlock
	public get text_data(): mw.TextBlock {
		if(!this.text_data_Internal&&this.uiWidgetBase) {
			this.text_data_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/text_data') as mw.TextBlock
		}
		return this.text_data_Internal
	}
	private giftTxt_Internal: mw.TextBlock
	public get giftTxt(): mw.TextBlock {
		if(!this.giftTxt_Internal&&this.uiWidgetBase) {
			this.giftTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/giftTxt') as mw.TextBlock
		}
		return this.giftTxt_Internal
	}
	private canvas_myRank_Internal: mw.Canvas
	public get canvas_myRank(): mw.Canvas {
		if(!this.canvas_myRank_Internal&&this.uiWidgetBase) {
			this.canvas_myRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank') as mw.Canvas
		}
		return this.canvas_myRank_Internal
	}
	private img_rankBg_Internal: mw.Image
	public get img_rankBg(): mw.Image {
		if(!this.img_rankBg_Internal&&this.uiWidgetBase) {
			this.img_rankBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/img_rankBg') as mw.Image
		}
		return this.img_rankBg_Internal
	}
	private text_myRankNum_Internal: mw.TextBlock
	public get text_myRankNum(): mw.TextBlock {
		if(!this.text_myRankNum_Internal&&this.uiWidgetBase) {
			this.text_myRankNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/text_myRankNum') as mw.TextBlock
		}
		return this.text_myRankNum_Internal
	}
	private text_myData_Internal: mw.TextBlock
	public get text_myData(): mw.TextBlock {
		if(!this.text_myData_Internal&&this.uiWidgetBase) {
			this.text_myData_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/text_myData') as mw.TextBlock
		}
		return this.text_myData_Internal
	}
	private text_myName_Internal: mw.TextBlock
	public get text_myName(): mw.TextBlock {
		if(!this.text_myName_Internal&&this.uiWidgetBase) {
			this.text_myName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/text_myName') as mw.TextBlock
		}
		return this.text_myName_Internal
	}
	private img_icon_Internal: mw.Image
	public get img_icon(): mw.Image {
		if(!this.img_icon_Internal&&this.uiWidgetBase) {
			this.img_icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/img_icon') as mw.Image
		}
		return this.img_icon_Internal
	}
	private btn_gift_Internal: mw.Button
	public get btn_gift(): mw.Button {
		if(!this.btn_gift_Internal&&this.uiWidgetBase) {
			this.btn_gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/btn_gift') as mw.Button
		}
		return this.btn_gift_Internal
	}
	private btn_openCard_Internal: mw.Button
	public get btn_openCard(): mw.Button {
		if(!this.btn_openCard_Internal&&this.uiWidgetBase) {
			this.btn_openCard_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_rankingList/canvas_list/canvas_myRank/btn_openCard') as mw.Button
		}
		return this.btn_openCard_Internal
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
		
		this.btn_gift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RankingList_UI_btn_gift");
		})
		this.btn_gift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift.onPressed.add(() => {
			this.btn_gift["preScale"] = this.btn_gift.renderScale;
			this.btn_gift.renderScale = Vector2.one.set(this.btn_gift["preScale"]).multiply(1.1);
		})
		this.btn_gift.onReleased.add(() => {
			this.btn_gift.renderScale = this.btn_gift["preScale"];
		})
		
	
		this.btn_openCard.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "RankingList_UI_btn_openCard");
		})
		this.btn_openCard.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_openCard.onPressed.add(() => {
			this.btn_openCard["preScale"] = this.btn_openCard.renderScale;
			this.btn_openCard.renderScale = Vector2.one.set(this.btn_openCard["preScale"]).multiply(1.1);
		})
		this.btn_openCard.onReleased.add(() => {
			this.btn_openCard.renderScale = this.btn_openCard["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_title)
		this.text_title.isRichText = true;
		
	
		this.initLanguage(this.text_time)
		this.text_time.isRichText = true;
		
	
		this.initLanguage(this.text_rankNum)
		this.text_rankNum.isRichText = true;
		
	
		this.initLanguage(this.text_name)
		this.text_name.isRichText = true;
		
	
		this.initLanguage(this.text_data)
		this.text_data.isRichText = true;
		
	
		this.initLanguage(this.giftTxt)
		this.giftTxt.isRichText = true;
		
	
		this.initLanguage(this.text_myRankNum)
		this.text_myRankNum.isRichText = true;
		
	
		this.initLanguage(this.text_myData)
		this.text_myData.isRichText = true;
		
	
		this.initLanguage(this.text_myName)
		this.text_myName.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_RankingList_UI'] = RankingList_UI_Generate;