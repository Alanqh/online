
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/GameHUD/Game_HUD.ui')
export default class Game_HUD_Generate extends UIScript {
		private mCanvas_HP_Internal: mw.Canvas
	public get mCanvas_HP(): mw.Canvas {
		if(!this.mCanvas_HP_Internal&&this.uiWidgetBase) {
			this.mCanvas_HP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_HP') as mw.Canvas
		}
		return this.mCanvas_HP_Internal
	}
	private mProgressBar_HP_Internal: mw.ProgressBar
	public get mProgressBar_HP(): mw.ProgressBar {
		if(!this.mProgressBar_HP_Internal&&this.uiWidgetBase) {
			this.mProgressBar_HP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_HP/mProgressBar_HP') as mw.ProgressBar
		}
		return this.mProgressBar_HP_Internal
	}
	private mSpBar_Internal: mw.ProgressBar
	public get mSpBar(): mw.ProgressBar {
		if(!this.mSpBar_Internal&&this.uiWidgetBase) {
			this.mSpBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_HP/mSpBar') as mw.ProgressBar
		}
		return this.mSpBar_Internal
	}
	private mTextBlock_HP_Internal: mw.TextBlock
	public get mTextBlock_HP(): mw.TextBlock {
		if(!this.mTextBlock_HP_Internal&&this.uiWidgetBase) {
			this.mTextBlock_HP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_HP/mTextBlock_HP') as mw.TextBlock
		}
		return this.mTextBlock_HP_Internal
	}
	private mCanvas_Intercative_Internal: mw.Canvas
	public get mCanvas_Intercative(): mw.Canvas {
		if(!this.mCanvas_Intercative_Internal&&this.uiWidgetBase) {
			this.mCanvas_Intercative_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative') as mw.Canvas
		}
		return this.mCanvas_Intercative_Internal
	}
	private mBtn_Jump_Internal: mw.Button
	public get mBtn_Jump(): mw.Button {
		if(!this.mBtn_Jump_Internal&&this.uiWidgetBase) {
			this.mBtn_Jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_Jump') as mw.Button
		}
		return this.mBtn_Jump_Internal
	}
	private mBtn_Sprint_Internal: mw.Button
	public get mBtn_Sprint(): mw.Button {
		if(!this.mBtn_Sprint_Internal&&this.uiWidgetBase) {
			this.mBtn_Sprint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_Sprint') as mw.Button
		}
		return this.mBtn_Sprint_Internal
	}
	private mBtn_Stealth_Internal: mw.Button
	public get mBtn_Stealth(): mw.Button {
		if(!this.mBtn_Stealth_Internal&&this.uiWidgetBase) {
			this.mBtn_Stealth_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_Stealth') as mw.Button
		}
		return this.mBtn_Stealth_Internal
	}
	private mBtn_Attack_Internal: mw.Button
	public get mBtn_Attack(): mw.Button {
		if(!this.mBtn_Attack_Internal&&this.uiWidgetBase) {
			this.mBtn_Attack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_Attack') as mw.Button
		}
		return this.mBtn_Attack_Internal
	}
	private mBtn_Interactive_Internal: mw.Button
	public get mBtn_Interactive(): mw.Button {
		if(!this.mBtn_Interactive_Internal&&this.uiWidgetBase) {
			this.mBtn_Interactive_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_Interactive') as mw.Button
		}
		return this.mBtn_Interactive_Internal
	}
	private mBtn_MonsterAttack_Internal: mw.Button
	public get mBtn_MonsterAttack(): mw.Button {
		if(!this.mBtn_MonsterAttack_Internal&&this.uiWidgetBase) {
			this.mBtn_MonsterAttack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_MonsterAttack') as mw.Button
		}
		return this.mBtn_MonsterAttack_Internal
	}
	private mBtn_MonsterSkill_Internal: mw.Button
	public get mBtn_MonsterSkill(): mw.Button {
		if(!this.mBtn_MonsterSkill_Internal&&this.uiWidgetBase) {
			this.mBtn_MonsterSkill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Intercative/mBtn_MonsterSkill') as mw.Button
		}
		return this.mBtn_MonsterSkill_Internal
	}
	private mImg_DayLight_Internal: mw.Image
	public get mImg_DayLight(): mw.Image {
		if(!this.mImg_DayLight_Internal&&this.uiWidgetBase) {
			this.mImg_DayLight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Time/mImg_DayLight') as mw.Image
		}
		return this.mImg_DayLight_Internal
	}
	private mImg_Date_Internal: mw.Image
	public get mImg_Date(): mw.Image {
		if(!this.mImg_Date_Internal&&this.uiWidgetBase) {
			this.mImg_Date_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Time/mImg_Date') as mw.Image
		}
		return this.mImg_Date_Internal
	}
	private mImg_Week_Internal: mw.Image
	public get mImg_Week(): mw.Image {
		if(!this.mImg_Week_Internal&&this.uiWidgetBase) {
			this.mImg_Week_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Time/mImg_Week') as mw.Image
		}
		return this.mImg_Week_Internal
	}
	private mTxt_Time_Internal: mw.TextBlock
	public get mTxt_Time(): mw.TextBlock {
		if(!this.mTxt_Time_Internal&&this.uiWidgetBase) {
			this.mTxt_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Time/mTxt_Time') as mw.TextBlock
		}
		return this.mTxt_Time_Internal
	}
	private mImg_Drame_Internal: mw.Image
	public get mImg_Drame(): mw.Image {
		if(!this.mImg_Drame_Internal&&this.uiWidgetBase) {
			this.mImg_Drame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_Time/mImg_Drame') as mw.Image
		}
		return this.mImg_Drame_Internal
	}
	private mCanvas_Info_Internal: mw.Canvas
	public get mCanvas_Info(): mw.Canvas {
		if(!this.mCanvas_Info_Internal&&this.uiWidgetBase) {
			this.mCanvas_Info_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info') as mw.Canvas
		}
		return this.mCanvas_Info_Internal
	}
	private canvas_Score_Internal: mw.Canvas
	public get canvas_Score(): mw.Canvas {
		if(!this.canvas_Score_Internal&&this.uiWidgetBase) {
			this.canvas_Score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score') as mw.Canvas
		}
		return this.canvas_Score_Internal
	}
	private mCanvas_Survival_Internal: mw.Canvas
	public get mCanvas_Survival(): mw.Canvas {
		if(!this.mCanvas_Survival_Internal&&this.uiWidgetBase) {
			this.mCanvas_Survival_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Survival') as mw.Canvas
		}
		return this.mCanvas_Survival_Internal
	}
	private mTxt_Days_Internal: mw.TextBlock
	public get mTxt_Days(): mw.TextBlock {
		if(!this.mTxt_Days_Internal&&this.uiWidgetBase) {
			this.mTxt_Days_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Survival/mTxt_Days') as mw.TextBlock
		}
		return this.mTxt_Days_Internal
	}
	private mCanvas_Save_Internal: mw.Canvas
	public get mCanvas_Save(): mw.Canvas {
		if(!this.mCanvas_Save_Internal&&this.uiWidgetBase) {
			this.mCanvas_Save_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Save') as mw.Canvas
		}
		return this.mCanvas_Save_Internal
	}
	private mTxt_Peoples_Internal: mw.TextBlock
	public get mTxt_Peoples(): mw.TextBlock {
		if(!this.mTxt_Peoples_Internal&&this.uiWidgetBase) {
			this.mTxt_Peoples_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Save/mTxt_Peoples') as mw.TextBlock
		}
		return this.mTxt_Peoples_Internal
	}
	private mCanvas_Kill_Internal: mw.Canvas
	public get mCanvas_Kill(): mw.Canvas {
		if(!this.mCanvas_Kill_Internal&&this.uiWidgetBase) {
			this.mCanvas_Kill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Kill') as mw.Canvas
		}
		return this.mCanvas_Kill_Internal
	}
	private mTxt_Kill_Internal: mw.TextBlock
	public get mTxt_Kill(): mw.TextBlock {
		if(!this.mTxt_Kill_Internal&&this.uiWidgetBase) {
			this.mTxt_Kill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Kill/mTxt_Kill') as mw.TextBlock
		}
		return this.mTxt_Kill_Internal
	}
	private mcanvas_Countdown_Internal: mw.Canvas
	public get mcanvas_Countdown(): mw.Canvas {
		if(!this.mcanvas_Countdown_Internal&&this.uiWidgetBase) {
			this.mcanvas_Countdown_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_Countdown') as mw.Canvas
		}
		return this.mcanvas_Countdown_Internal
	}
	private mTxt_CD_Internal: mw.TextBlock
	public get mTxt_CD(): mw.TextBlock {
		if(!this.mTxt_CD_Internal&&this.uiWidgetBase) {
			this.mTxt_CD_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mcanvas_Countdown/mTxt_CD') as mw.TextBlock
		}
		return this.mTxt_CD_Internal
	}
	private mImg_Guide_Internal: mw.Image
	public get mImg_Guide(): mw.Image {
		if(!this.mImg_Guide_Internal&&this.uiWidgetBase) {
			this.mImg_Guide_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mImg_Guide') as mw.Image
		}
		return this.mImg_Guide_Internal
	}
	private mCanvas_Rule_Internal: mw.Canvas
	public get mCanvas_Rule(): mw.Canvas {
		if(!this.mCanvas_Rule_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule') as mw.Canvas
		}
		return this.mCanvas_Rule_Internal
	}
	private mCanvas_HospitalRule_Internal: mw.Canvas
	public get mCanvas_HospitalRule(): mw.Canvas {
		if(!this.mCanvas_HospitalRule_Internal&&this.uiWidgetBase) {
			this.mCanvas_HospitalRule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/mCanvas_HospitalRule') as mw.Canvas
		}
		return this.mCanvas_HospitalRule_Internal
	}
	private mCanvas_DrameRule_Internal: mw.Canvas
	public get mCanvas_DrameRule(): mw.Canvas {
		if(!this.mCanvas_DrameRule_Internal&&this.uiWidgetBase) {
			this.mCanvas_DrameRule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/mCanvas_DrameRule') as mw.Canvas
		}
		return this.mCanvas_DrameRule_Internal
	}
	private mBtn_Close_Internal: mw.StaleButton
	public get mBtn_Close(): mw.StaleButton {
		if(!this.mBtn_Close_Internal&&this.uiWidgetBase) {
			this.mBtn_Close_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Rule/mBtn_Close') as mw.StaleButton
		}
		return this.mBtn_Close_Internal
	}
	private mCanvas_Bag_Internal: mw.Canvas
	public get mCanvas_Bag(): mw.Canvas {
		if(!this.mCanvas_Bag_Internal&&this.uiWidgetBase) {
			this.mCanvas_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Bag') as mw.Canvas
		}
		return this.mCanvas_Bag_Internal
	}
	private mBtn_Bag_Internal: mw.Button
	public get mBtn_Bag(): mw.Button {
		if(!this.mBtn_Bag_Internal&&this.uiWidgetBase) {
			this.mBtn_Bag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Bag/mBtn_Bag') as mw.Button
		}
		return this.mBtn_Bag_Internal
	}
	private mCanvas_Shop_Internal: mw.Canvas
	public get mCanvas_Shop(): mw.Canvas {
		if(!this.mCanvas_Shop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop') as mw.Canvas
		}
		return this.mCanvas_Shop_Internal
	}
	private mButton_Hot_Internal: mw.Button
	public get mButton_Hot(): mw.Button {
		if(!this.mButton_Hot_Internal&&this.uiWidgetBase) {
			this.mButton_Hot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mButton_Hot') as mw.Button
		}
		return this.mButton_Hot_Internal
	}
	private hotImage_Internal: mw.Image
	public get hotImage(): mw.Image {
		if(!this.hotImage_Internal&&this.uiWidgetBase) {
			this.hotImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/hotImage') as mw.Image
		}
		return this.hotImage_Internal
	}
	private mText_Hot_Internal: mw.TextBlock
	public get mText_Hot(): mw.TextBlock {
		if(!this.mText_Hot_Internal&&this.uiWidgetBase) {
			this.mText_Hot_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mText_Hot') as mw.TextBlock
		}
		return this.mText_Hot_Internal
	}
	private mButton_Shop_Internal: mw.Button
	public get mButton_Shop(): mw.Button {
		if(!this.mButton_Shop_Internal&&this.uiWidgetBase) {
			this.mButton_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mButton_Shop') as mw.Button
		}
		return this.mButton_Shop_Internal
	}
	private mText_Shop_Internal: mw.TextBlock
	public get mText_Shop(): mw.TextBlock {
		if(!this.mText_Shop_Internal&&this.uiWidgetBase) {
			this.mText_Shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mText_Shop') as mw.TextBlock
		}
		return this.mText_Shop_Internal
	}
	private mButton_Dress_Internal: mw.Button
	public get mButton_Dress(): mw.Button {
		if(!this.mButton_Dress_Internal&&this.uiWidgetBase) {
			this.mButton_Dress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mButton_Dress') as mw.Button
		}
		return this.mButton_Dress_Internal
	}
	private mText_Dress_Internal: mw.TextBlock
	public get mText_Dress(): mw.TextBlock {
		if(!this.mText_Dress_Internal&&this.uiWidgetBase) {
			this.mText_Dress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/mText_Dress') as mw.TextBlock
		}
		return this.mText_Dress_Internal
	}
	private starImg1_Internal: mw.Image
	public get starImg1(): mw.Image {
		if(!this.starImg1_Internal&&this.uiWidgetBase) {
			this.starImg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/starImg1') as mw.Image
		}
		return this.starImg1_Internal
	}
	private starImg2_Internal: mw.Image
	public get starImg2(): mw.Image {
		if(!this.starImg2_Internal&&this.uiWidgetBase) {
			this.starImg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/starImg2') as mw.Image
		}
		return this.starImg2_Internal
	}
	private starImg3_Internal: mw.Image
	public get starImg3(): mw.Image {
		if(!this.starImg3_Internal&&this.uiWidgetBase) {
			this.starImg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/starImg3') as mw.Image
		}
		return this.starImg3_Internal
	}
	private mBtn_Lottery_Internal: mw.Button
	public get mBtn_Lottery(): mw.Button {
		if(!this.mBtn_Lottery_Internal&&this.uiWidgetBase) {
			this.mBtn_Lottery_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/Canvas_3/mBtn_Lottery') as mw.Button
		}
		return this.mBtn_Lottery_Internal
	}
	private mBtn_Event_Internal: mw.Button
	public get mBtn_Event(): mw.Button {
		if(!this.mBtn_Event_Internal&&this.uiWidgetBase) {
			this.mBtn_Event_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Shop/Canvas_3/mBtn_Event') as mw.Button
		}
		return this.mBtn_Event_Internal
	}
	private mBtn_Rule_Internal: mw.Button
	public get mBtn_Rule(): mw.Button {
		if(!this.mBtn_Rule_Internal&&this.uiWidgetBase) {
			this.mBtn_Rule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtn_Rule') as mw.Button
		}
		return this.mBtn_Rule_Internal
	}
	private mCanvas_Event_Internal: mw.Canvas
	public get mCanvas_Event(): mw.Canvas {
		if(!this.mCanvas_Event_Internal&&this.uiWidgetBase) {
			this.mCanvas_Event_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Event') as mw.Canvas
		}
		return this.mCanvas_Event_Internal
	}
	private mBtn_PassCheck_Internal: mw.Button
	public get mBtn_PassCheck(): mw.Button {
		if(!this.mBtn_PassCheck_Internal&&this.uiWidgetBase) {
			this.mBtn_PassCheck_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Event/mBtn_PassCheck') as mw.Button
		}
		return this.mBtn_PassCheck_Internal
	}
	private mBtn_EventShop_Internal: mw.Button
	public get mBtn_EventShop(): mw.Button {
		if(!this.mBtn_EventShop_Internal&&this.uiWidgetBase) {
			this.mBtn_EventShop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Event/mBtn_EventShop') as mw.Button
		}
		return this.mBtn_EventShop_Internal
	}
	private mCanvas_Expression_Internal: mw.Canvas
	public get mCanvas_Expression(): mw.Canvas {
		if(!this.mCanvas_Expression_Internal&&this.uiWidgetBase) {
			this.mCanvas_Expression_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Expression') as mw.Canvas
		}
		return this.mCanvas_Expression_Internal
	}
	private mButton_Expression_Internal: mw.Button
	public get mButton_Expression(): mw.Button {
		if(!this.mButton_Expression_Internal&&this.uiWidgetBase) {
			this.mButton_Expression_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Expression/mButton_Expression') as mw.Button
		}
		return this.mButton_Expression_Internal
	}
	private mText_Expression_Internal: mw.TextBlock
	public get mText_Expression(): mw.TextBlock {
		if(!this.mText_Expression_Internal&&this.uiWidgetBase) {
			this.mText_Expression_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Expression/mText_Expression') as mw.TextBlock
		}
		return this.mText_Expression_Internal
	}
	private mText_Hot_1_Internal: mw.TextBlock
	public get mText_Hot_1(): mw.TextBlock {
		if(!this.mText_Hot_1_Internal&&this.uiWidgetBase) {
			this.mText_Hot_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Expression/mText_Hot_1') as mw.TextBlock
		}
		return this.mText_Hot_1_Internal
	}
	private mText_Hot_1_1_Internal: mw.TextBlock
	public get mText_Hot_1_1(): mw.TextBlock {
		if(!this.mText_Hot_1_1_Internal&&this.uiWidgetBase) {
			this.mText_Hot_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Expression/mText_Hot_1_1') as mw.TextBlock
		}
		return this.mText_Hot_1_1_Internal
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
		
		this.mBtn_Close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Close");
		})
		this.initLanguage(this.mBtn_Close);
		
	
		//按钮添加点击
		
		this.mBtn_Jump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Jump");
		})
		
	
		this.mBtn_Sprint.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Sprint");
		})
		
	
		this.mBtn_Stealth.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Stealth");
		})
		
	
		this.mBtn_Attack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Attack");
		})
		
	
		this.mBtn_Interactive.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Interactive");
		})
		
	
		this.mBtn_MonsterAttack.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_MonsterAttack");
		})
		
	
		this.mBtn_MonsterSkill.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_MonsterSkill");
		})
		
	
		this.mBtn_Bag.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Bag");
		})
		
	
		this.mButton_Hot.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Hot");
		})
		
	
		this.mButton_Shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Shop");
		})
		
	
		this.mButton_Dress.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Dress");
		})
		
	
		this.mBtn_Lottery.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Lottery");
		})
		
	
		this.mBtn_Event.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Event");
		})
		
	
		this.mBtn_Rule.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Rule");
		})
		
	
		this.mBtn_PassCheck.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_PassCheck");
		})
		
	
		this.mBtn_EventShop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_EventShop");
		})
		
	
		this.mButton_Expression.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton_Expression");
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_HP)
		
	
		this.initLanguage(this.mTxt_Time)
		
	
		this.initLanguage(this.mTxt_Days)
		
	
		this.initLanguage(this.mTxt_Peoples)
		
	
		this.initLanguage(this.mTxt_Kill)
		
	
		this.initLanguage(this.mTxt_CD)
		
	
		this.initLanguage(this.mText_Hot)
		
	
		this.initLanguage(this.mText_Shop)
		
	
		this.initLanguage(this.mText_Dress)
		
	
		this.initLanguage(this.mText_Expression)
		
	
		this.initLanguage(this.mText_Hot_1)
		
	
		this.initLanguage(this.mText_Hot_1_1)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Survival/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Save/TextBlock_2") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Info/canvas_Score/mCanvas_Kill/TextBlock_2_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Rule/mCanvas_HospitalRule/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Rule/mCanvas_HospitalRule/TextBlock_4") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Rule/mCanvas_DrameRule/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Rule/mCanvas_DrameRule/TextBlock_5") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Bag/TextBlock_8") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBtn_Rule/TextBlock_6") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Event/TextBlock_7") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_Event/TextBlock_9") as any);
		
	

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
 