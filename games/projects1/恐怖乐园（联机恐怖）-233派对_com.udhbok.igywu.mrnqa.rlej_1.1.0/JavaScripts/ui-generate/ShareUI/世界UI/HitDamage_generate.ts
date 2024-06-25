
 

 @UIBind('UI/ShareUI/世界UI/HitDamage.ui')
 export default class HitDamage_Generate extends UIScript {
	 	private canvas_Damage_Internal: mw.Canvas
	public get canvas_Damage(): mw.Canvas {
		if(!this.canvas_Damage_Internal&&this.uiWidgetBase) {
			this.canvas_Damage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Damage') as mw.Canvas
		}
		return this.canvas_Damage_Internal
	}
	private mDamageText_Internal: mw.TextBlock
	public get mDamageText(): mw.TextBlock {
		if(!this.mDamageText_Internal&&this.uiWidgetBase) {
			this.mDamageText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Damage/mDamageText') as mw.TextBlock
		}
		return this.mDamageText_Internal
	}
	private canvas_Crritical_Internal: mw.Canvas
	public get canvas_Crritical(): mw.Canvas {
		if(!this.canvas_Crritical_Internal&&this.uiWidgetBase) {
			this.canvas_Crritical_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Crritical') as mw.Canvas
		}
		return this.canvas_Crritical_Internal
	}
	private mDamageCriticalText_Internal: mw.TextBlock
	public get mDamageCriticalText(): mw.TextBlock {
		if(!this.mDamageCriticalText_Internal&&this.uiWidgetBase) {
			this.mDamageCriticalText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Crritical/mDamageCriticalText') as mw.TextBlock
		}
		return this.mDamageCriticalText_Internal
	}
	private canvas_Hurt_Internal: mw.Canvas
	public get canvas_Hurt(): mw.Canvas {
		if(!this.canvas_Hurt_Internal&&this.uiWidgetBase) {
			this.canvas_Hurt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Hurt') as mw.Canvas
		}
		return this.canvas_Hurt_Internal
	}
	private mHurtText_Internal: mw.TextBlock
	public get mHurtText(): mw.TextBlock {
		if(!this.mHurtText_Internal&&this.uiWidgetBase) {
			this.mHurtText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Hurt/mHurtText') as mw.TextBlock
		}
		return this.mHurtText_Internal
	}
	private canvas_Heal_Internal: mw.Canvas
	public get canvas_Heal(): mw.Canvas {
		if(!this.canvas_Heal_Internal&&this.uiWidgetBase) {
			this.canvas_Heal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Heal') as mw.Canvas
		}
		return this.canvas_Heal_Internal
	}
	private mHealText_Internal: mw.TextBlock
	public get mHealText(): mw.TextBlock {
		if(!this.mHealText_Internal&&this.uiWidgetBase) {
			this.mHealText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_Heal/mHealText') as mw.TextBlock
		}
		return this.mHealText_Internal
	}
	private canvas_HeadHit_Internal: mw.Canvas
	public get canvas_HeadHit(): mw.Canvas {
		if(!this.canvas_HeadHit_Internal&&this.uiWidgetBase) {
			this.canvas_HeadHit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_HeadHit') as mw.Canvas
		}
		return this.canvas_HeadHit_Internal
	}
	private mHeadHitText_Internal: mw.TextBlock
	public get mHeadHitText(): mw.TextBlock {
		if(!this.mHeadHitText_Internal&&this.uiWidgetBase) {
			this.mHeadHitText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_HeadHit/mHeadHitText') as mw.TextBlock
		}
		return this.mHeadHitText_Internal
	}
	private canvas_BUFF_BurnHit_Internal: mw.Canvas
	public get canvas_BUFF_BurnHit(): mw.Canvas {
		if(!this.canvas_BUFF_BurnHit_Internal&&this.uiWidgetBase) {
			this.canvas_BUFF_BurnHit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_BUFF_BurnHit') as mw.Canvas
		}
		return this.canvas_BUFF_BurnHit_Internal
	}
	private mBurnHitText_Internal: mw.TextBlock
	public get mBurnHitText(): mw.TextBlock {
		if(!this.mBurnHitText_Internal&&this.uiWidgetBase) {
			this.mBurnHitText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_BUFF_BurnHit/mBurnHitText') as mw.TextBlock
		}
		return this.mBurnHitText_Internal
	}
	private canvas_BUFF_PoisoningHit_Internal: mw.Canvas
	public get canvas_BUFF_PoisoningHit(): mw.Canvas {
		if(!this.canvas_BUFF_PoisoningHit_Internal&&this.uiWidgetBase) {
			this.canvas_BUFF_PoisoningHit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_BUFF_PoisoningHit') as mw.Canvas
		}
		return this.canvas_BUFF_PoisoningHit_Internal
	}
	private mPoisoningHitText_Internal: mw.TextBlock
	public get mPoisoningHitText(): mw.TextBlock {
		if(!this.mPoisoningHitText_Internal&&this.uiWidgetBase) {
			this.mPoisoningHitText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_BUFF_PoisoningHit/mPoisoningHitText') as mw.TextBlock
		}
		return this.mPoisoningHitText_Internal
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
		
		this.initLanguage(this.mDamageText)
		this.mDamageText.isRichText = true;
		
	
		this.initLanguage(this.mDamageCriticalText)
		this.mDamageCriticalText.isRichText = true;
		
	
		this.initLanguage(this.mHurtText)
		this.mHurtText.isRichText = true;
		
	
		this.initLanguage(this.mHealText)
		this.mHealText.isRichText = true;
		
	
		this.initLanguage(this.mHeadHitText)
		this.mHeadHitText.isRichText = true;
		
	
		this.initLanguage(this.mBurnHitText)
		this.mBurnHitText.isRichText = true;
		
	
		this.initLanguage(this.mPoisoningHitText)
		this.mPoisoningHitText.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_HitDamage'] = HitDamage_Generate;