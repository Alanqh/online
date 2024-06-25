
 

 @UIBind('UI/ShareUI/boss/Boss_UI.ui')
 export default class Boss_UI_Generate extends UIScript {
	 	private mCanvas_Boss_Internal: mw.Canvas
	public get mCanvas_Boss(): mw.Canvas {
		if(!this.mCanvas_Boss_Internal&&this.uiWidgetBase) {
			this.mCanvas_Boss_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss') as mw.Canvas
		}
		return this.mCanvas_Boss_Internal
	}
	private mCanvas_BossNT_Internal: mw.Canvas
	public get mCanvas_BossNT(): mw.Canvas {
		if(!this.mCanvas_BossNT_Internal&&this.uiWidgetBase) {
			this.mCanvas_BossNT_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT') as mw.Canvas
		}
		return this.mCanvas_BossNT_Internal
	}
	private mCanvas_Taunt_Internal: mw.Canvas
	public get mCanvas_Taunt(): mw.Canvas {
		if(!this.mCanvas_Taunt_Internal&&this.uiWidgetBase) {
			this.mCanvas_Taunt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mCanvas_Taunt') as mw.Canvas
		}
		return this.mCanvas_Taunt_Internal
	}
	private taunt1_Internal: mw.Image
	public get taunt1(): mw.Image {
		if(!this.taunt1_Internal&&this.uiWidgetBase) {
			this.taunt1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mCanvas_Taunt/taunt1') as mw.Image
		}
		return this.taunt1_Internal
	}
	private taunt2_Internal: mw.Image
	public get taunt2(): mw.Image {
		if(!this.taunt2_Internal&&this.uiWidgetBase) {
			this.taunt2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mCanvas_Taunt/taunt2') as mw.Image
		}
		return this.taunt2_Internal
	}
	private taunt3_Internal: mw.Image
	public get taunt3(): mw.Image {
		if(!this.taunt3_Internal&&this.uiWidgetBase) {
			this.taunt3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mCanvas_Taunt/taunt3') as mw.Image
		}
		return this.taunt3_Internal
	}
	private taunt4_Internal: mw.Image
	public get taunt4(): mw.Image {
		if(!this.taunt4_Internal&&this.uiWidgetBase) {
			this.taunt4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mCanvas_Taunt/taunt4') as mw.Image
		}
		return this.taunt4_Internal
	}
	private mText_Bossname_Internal: mw.TextBlock
	public get mText_Bossname(): mw.TextBlock {
		if(!this.mText_Bossname_Internal&&this.uiWidgetBase) {
			this.mText_Bossname_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossNT/mText_Bossname') as mw.TextBlock
		}
		return this.mText_Bossname_Internal
	}
	private mCanvas_BossTime_Internal: mw.Canvas
	public get mCanvas_BossTime(): mw.Canvas {
		if(!this.mCanvas_BossTime_Internal&&this.uiWidgetBase) {
			this.mCanvas_BossTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossTime') as mw.Canvas
		}
		return this.mCanvas_BossTime_Internal
	}
	private mText_BossTime_Internal: mw.TextBlock
	public get mText_BossTime(): mw.TextBlock {
		if(!this.mText_BossTime_Internal&&this.uiWidgetBase) {
			this.mText_BossTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mCanvas_BossTime/mText_BossTime') as mw.TextBlock
		}
		return this.mText_BossTime_Internal
	}
	private mProgressBar_BossHP_Internal: mw.ProgressBar
	public get mProgressBar_BossHP(): mw.ProgressBar {
		if(!this.mProgressBar_BossHP_Internal&&this.uiWidgetBase) {
			this.mProgressBar_BossHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mProgressBar_BossHP') as mw.ProgressBar
		}
		return this.mProgressBar_BossHP_Internal
	}
	private mText_BossHPPercent_Internal: mw.TextBlock
	public get mText_BossHPPercent(): mw.TextBlock {
		if(!this.mText_BossHPPercent_Internal&&this.uiWidgetBase) {
			this.mText_BossHPPercent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mText_BossHPPercent') as mw.TextBlock
		}
		return this.mText_BossHPPercent_Internal
	}
	private mText_BossHP_Internal: mw.TextBlock
	public get mText_BossHP(): mw.TextBlock {
		if(!this.mText_BossHP_Internal&&this.uiWidgetBase) {
			this.mText_BossHP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Boss/mText_BossHP') as mw.TextBlock
		}
		return this.mText_BossHP_Internal
	}
	private mTextBlock_BossRun_Internal: mw.TextBlock
	public get mTextBlock_BossRun(): mw.TextBlock {
		if(!this.mTextBlock_BossRun_Internal&&this.uiWidgetBase) {
			this.mTextBlock_BossRun_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock_BossRun') as mw.TextBlock
		}
		return this.mTextBlock_BossRun_Internal
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
		
		this.initLanguage(this.mText_Bossname)
		this.mText_Bossname.isRichText = true;
		
	
		this.initLanguage(this.mText_BossTime)
		this.mText_BossTime.isRichText = true;
		
	
		this.initLanguage(this.mText_BossHPPercent)
		this.mText_BossHPPercent.isRichText = true;
		
	
		this.initLanguage(this.mText_BossHP)
		this.mText_BossHP.isRichText = true;
		
	
		this.initLanguage(this.mTextBlock_BossRun)
		this.mTextBlock_BossRun.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Boss_UI'] = Boss_UI_Generate;