
 

 @UIBind('UI/ShareUI/card/Avatar_UI.ui')
 export default class Avatar_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private contentCanvas_Internal: mw.Canvas
	public get contentCanvas(): mw.Canvas {
		if(!this.contentCanvas_Internal&&this.uiWidgetBase) {
			this.contentCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas') as mw.Canvas
		}
		return this.contentCanvas_Internal
	}
	private canvas_Internal: mw.Canvas
	public get canvas(): mw.Canvas {
		if(!this.canvas_Internal&&this.uiWidgetBase) {
			this.canvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas') as mw.Canvas
		}
		return this.canvas_Internal
	}
	private img_name_Internal: mw.Image
	public get img_name(): mw.Image {
		if(!this.img_name_Internal&&this.uiWidgetBase) {
			this.img_name_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/img_name') as mw.Image
		}
		return this.img_name_Internal
	}
	private img_name2_1_Internal: mw.Image
	public get img_name2_1(): mw.Image {
		if(!this.img_name2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/img_name2_1') as mw.Image
		}
		return this.img_name2_1_Internal
	}
	private img_name2_Internal: mw.Image
	public get img_name2(): mw.Image {
		if(!this.img_name2_Internal&&this.uiWidgetBase) {
			this.img_name2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/img_name2') as mw.Image
		}
		return this.img_name2_Internal
	}
	private img_name2_2_Internal: mw.Image
	public get img_name2_2(): mw.Image {
		if(!this.img_name2_2_Internal&&this.uiWidgetBase) {
			this.img_name2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/img_name2_2') as mw.Image
		}
		return this.img_name2_2_Internal
	}
	private img_name2_2_1_Internal: mw.Image
	public get img_name2_2_1(): mw.Image {
		if(!this.img_name2_2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/img_name2_2_1') as mw.Image
		}
		return this.img_name2_2_1_Internal
	}
	private txt_cardname_Internal: mw.TextBlock
	public get txt_cardname(): mw.TextBlock {
		if(!this.txt_cardname_Internal&&this.uiWidgetBase) {
			this.txt_cardname_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/txt_cardname') as mw.TextBlock
		}
		return this.txt_cardname_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private canvas_info_Internal: mw.Canvas
	public get canvas_info(): mw.Canvas {
		if(!this.canvas_info_Internal&&this.uiWidgetBase) {
			this.canvas_info_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info') as mw.Canvas
		}
		return this.canvas_info_Internal
	}
	private img_info_1_Internal: mw.Image
	public get img_info_1(): mw.Image {
		if(!this.img_info_1_Internal&&this.uiWidgetBase) {
			this.img_info_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_info_1') as mw.Image
		}
		return this.img_info_1_Internal
	}
	private img_info_Internal: mw.Image
	public get img_info(): mw.Image {
		if(!this.img_info_Internal&&this.uiWidgetBase) {
			this.img_info_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_info') as mw.Image
		}
		return this.img_info_Internal
	}
	private img_head_Internal: mw.Image
	public get img_head(): mw.Image {
		if(!this.img_head_Internal&&this.uiWidgetBase) {
			this.img_head_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_head') as mw.Image
		}
		return this.img_head_Internal
	}
	private img_head_1_Internal: mw.Image
	public get img_head_1(): mw.Image {
		if(!this.img_head_1_Internal&&this.uiWidgetBase) {
			this.img_head_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_head_1') as mw.Image
		}
		return this.img_head_1_Internal
	}
	private txt_name_Internal: mw.TextBlock
	public get txt_name(): mw.TextBlock {
		if(!this.txt_name_Internal&&this.uiWidgetBase) {
			this.txt_name_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_name') as mw.TextBlock
		}
		return this.txt_name_Internal
	}
	private txt_gender_Internal: mw.TextBlock
	public get txt_gender(): mw.TextBlock {
		if(!this.txt_gender_Internal&&this.uiWidgetBase) {
			this.txt_gender_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_gender') as mw.TextBlock
		}
		return this.txt_gender_Internal
	}
	private img_girl_Internal: mw.Image
	public get img_girl(): mw.Image {
		if(!this.img_girl_Internal&&this.uiWidgetBase) {
			this.img_girl_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_girl') as mw.Image
		}
		return this.img_girl_Internal
	}
	private img_boy_Internal: mw.Image
	public get img_boy(): mw.Image {
		if(!this.img_boy_Internal&&this.uiWidgetBase) {
			this.img_boy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_boy') as mw.Image
		}
		return this.img_boy_Internal
	}
	private txt_ID_Internal: mw.TextBlock
	public get txt_ID(): mw.TextBlock {
		if(!this.txt_ID_Internal&&this.uiWidgetBase) {
			this.txt_ID_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_ID') as mw.TextBlock
		}
		return this.txt_ID_Internal
	}
	private txt_level_Internal: mw.TextBlock
	public get txt_level(): mw.TextBlock {
		if(!this.txt_level_Internal&&this.uiWidgetBase) {
			this.txt_level_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_level') as mw.TextBlock
		}
		return this.txt_level_Internal
	}
	private levelCanvas_Internal: mw.Canvas
	public get levelCanvas(): mw.Canvas {
		if(!this.levelCanvas_Internal&&this.uiWidgetBase) {
			this.levelCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/levelCanvas') as mw.Canvas
		}
		return this.levelCanvas_Internal
	}
	private txt_EP_Internal: mw.TextBlock
	public get txt_EP(): mw.TextBlock {
		if(!this.txt_EP_Internal&&this.uiWidgetBase) {
			this.txt_EP_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_EP') as mw.TextBlock
		}
		return this.txt_EP_Internal
	}
	private btn_more_Internal: mw.Button
	public get btn_more(): mw.Button {
		if(!this.btn_more_Internal&&this.uiWidgetBase) {
			this.btn_more_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_more') as mw.Button
		}
		return this.btn_more_Internal
	}
	private btn_good_Internal: mw.Button
	public get btn_good(): mw.Button {
		if(!this.btn_good_Internal&&this.uiWidgetBase) {
			this.btn_good_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_good') as mw.Button
		}
		return this.btn_good_Internal
	}
	private img_good_Internal: mw.Image
	public get img_good(): mw.Image {
		if(!this.img_good_Internal&&this.uiWidgetBase) {
			this.img_good_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_good') as mw.Image
		}
		return this.img_good_Internal
	}
	private btn_gift_Internal: mw.Button
	public get btn_gift(): mw.Button {
		if(!this.btn_gift_Internal&&this.uiWidgetBase) {
			this.btn_gift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_gift') as mw.Button
		}
		return this.btn_gift_Internal
	}
	private img_gift_Internal: mw.Image
	public get img_gift(): mw.Image {
		if(!this.img_gift_Internal&&this.uiWidgetBase) {
			this.img_gift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_gift') as mw.Image
		}
		return this.img_gift_Internal
	}
	private txt_goodnum_Internal: mw.TextBlock
	public get txt_goodnum(): mw.TextBlock {
		if(!this.txt_goodnum_Internal&&this.uiWidgetBase) {
			this.txt_goodnum_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_goodnum') as mw.TextBlock
		}
		return this.txt_goodnum_Internal
	}
	private txt_sign_Internal: mw.TextBlock
	public get txt_sign(): mw.TextBlock {
		if(!this.txt_sign_Internal&&this.uiWidgetBase) {
			this.txt_sign_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_sign') as mw.TextBlock
		}
		return this.txt_sign_Internal
	}
	private txt_love_Internal: mw.TextBlock
	public get txt_love(): mw.TextBlock {
		if(!this.txt_love_Internal&&this.uiWidgetBase) {
			this.txt_love_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_love') as mw.TextBlock
		}
		return this.txt_love_Internal
	}
	private txt_achievement_Internal: mw.TextBlock
	public get txt_achievement(): mw.TextBlock {
		if(!this.txt_achievement_Internal&&this.uiWidgetBase) {
			this.txt_achievement_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_achievement') as mw.TextBlock
		}
		return this.txt_achievement_Internal
	}
	private btn_taAchievement_Internal: mw.Button
	public get btn_taAchievement(): mw.Button {
		if(!this.btn_taAchievement_Internal&&this.uiWidgetBase) {
			this.btn_taAchievement_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_taAchievement') as mw.Button
		}
		return this.btn_taAchievement_Internal
	}
	private txt_taAchievement_Internal: mw.TextBlock
	public get txt_taAchievement(): mw.TextBlock {
		if(!this.txt_taAchievement_Internal&&this.uiWidgetBase) {
			this.txt_taAchievement_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_taAchievement/txt_taAchievement') as mw.TextBlock
		}
		return this.txt_taAchievement_Internal
	}
	private img_taMedalAchieve_Internal: mw.Image
	public get img_taMedalAchieve(): mw.Image {
		if(!this.img_taMedalAchieve_Internal&&this.uiWidgetBase) {
			this.img_taMedalAchieve_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_taAchievement/img_taMedalAchieve') as mw.Image
		}
		return this.img_taMedalAchieve_Internal
	}
	private btn_myAchievement_Internal: mw.Button
	public get btn_myAchievement(): mw.Button {
		if(!this.btn_myAchievement_Internal&&this.uiWidgetBase) {
			this.btn_myAchievement_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_myAchievement') as mw.Button
		}
		return this.btn_myAchievement_Internal
	}
	private txt_myAchievement_Internal: mw.TextBlock
	public get txt_myAchievement(): mw.TextBlock {
		if(!this.txt_myAchievement_Internal&&this.uiWidgetBase) {
			this.txt_myAchievement_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_myAchievement/txt_myAchievement') as mw.TextBlock
		}
		return this.txt_myAchievement_Internal
	}
	private img_myMedalAchieve_Internal: mw.Image
	public get img_myMedalAchieve(): mw.Image {
		if(!this.img_myMedalAchieve_Internal&&this.uiWidgetBase) {
			this.img_myMedalAchieve_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_myAchievement/img_myMedalAchieve') as mw.Image
		}
		return this.img_myMedalAchieve_Internal
	}
	private inputBox_sign_Internal: mw.InputBox
	public get inputBox_sign(): mw.InputBox {
		if(!this.inputBox_sign_Internal&&this.uiWidgetBase) {
			this.inputBox_sign_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/inputBox_sign') as mw.InputBox
		}
		return this.inputBox_sign_Internal
	}
	private inputBox_love_Internal: mw.InputBox
	public get inputBox_love(): mw.InputBox {
		if(!this.inputBox_love_Internal&&this.uiWidgetBase) {
			this.inputBox_love_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/inputBox_love') as mw.InputBox
		}
		return this.inputBox_love_Internal
	}
	private stalebtn_chage_Internal: mw.StaleButton
	public get stalebtn_chage(): mw.StaleButton {
		if(!this.stalebtn_chage_Internal&&this.uiWidgetBase) {
			this.stalebtn_chage_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/stalebtn_chage') as mw.StaleButton
		}
		return this.stalebtn_chage_Internal
	}
	private stalebtnedit_Internal: mw.StaleButton
	public get stalebtnedit(): mw.StaleButton {
		if(!this.stalebtnedit_Internal&&this.uiWidgetBase) {
			this.stalebtnedit_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/stalebtnedit') as mw.StaleButton
		}
		return this.stalebtnedit_Internal
	}
	private stalebtn_BeFriend_Internal: mw.StaleButton
	public get stalebtn_BeFriend(): mw.StaleButton {
		if(!this.stalebtn_BeFriend_Internal&&this.uiWidgetBase) {
			this.stalebtn_BeFriend_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/stalebtn_BeFriend') as mw.StaleButton
		}
		return this.stalebtn_BeFriend_Internal
	}
	private img_game_Internal: mw.Image
	public get img_game(): mw.Image {
		if(!this.img_game_Internal&&this.uiWidgetBase) {
			this.img_game_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_game') as mw.Image
		}
		return this.img_game_Internal
	}
	private txt_giftshow_Internal: mw.TextBlock
	public get txt_giftshow(): mw.TextBlock {
		if(!this.txt_giftshow_Internal&&this.uiWidgetBase) {
			this.txt_giftshow_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_giftshow') as mw.TextBlock
		}
		return this.txt_giftshow_Internal
	}
	private txt_populevel_Internal: mw.TextBlock
	public get txt_populevel(): mw.TextBlock {
		if(!this.txt_populevel_Internal&&this.uiWidgetBase) {
			this.txt_populevel_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_populevel') as mw.TextBlock
		}
		return this.txt_populevel_Internal
	}
	private txt_popuEP_Internal: mw.TextBlock
	public get txt_popuEP(): mw.TextBlock {
		if(!this.txt_popuEP_Internal&&this.uiWidgetBase) {
			this.txt_popuEP_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_popuEP') as mw.TextBlock
		}
		return this.txt_popuEP_Internal
	}
	private img_record_Internal: mw.Image
	public get img_record(): mw.Image {
		if(!this.img_record_Internal&&this.uiWidgetBase) {
			this.img_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/img_record') as mw.Image
		}
		return this.img_record_Internal
	}
	private txt_record_Internal: mw.TextBlock
	public get txt_record(): mw.TextBlock {
		if(!this.txt_record_Internal&&this.uiWidgetBase) {
			this.txt_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_record') as mw.TextBlock
		}
		return this.txt_record_Internal
	}
	private scrollBox_gift_Internal: mw.ScrollBox
	public get scrollBox_gift(): mw.ScrollBox {
		if(!this.scrollBox_gift_Internal&&this.uiWidgetBase) {
			this.scrollBox_gift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/scrollBox_gift') as mw.ScrollBox
		}
		return this.scrollBox_gift_Internal
	}
	private canvas_gift_Internal: mw.Canvas
	public get canvas_gift(): mw.Canvas {
		if(!this.canvas_gift_Internal&&this.uiWidgetBase) {
			this.canvas_gift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/scrollBox_gift/canvas_gift') as mw.Canvas
		}
		return this.canvas_gift_Internal
	}
	private scrollBox_record_Internal: mw.ScrollBox
	public get scrollBox_record(): mw.ScrollBox {
		if(!this.scrollBox_record_Internal&&this.uiWidgetBase) {
			this.scrollBox_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/scrollBox_record') as mw.ScrollBox
		}
		return this.scrollBox_record_Internal
	}
	private canvas_record_Internal: mw.Canvas
	public get canvas_record(): mw.Canvas {
		if(!this.canvas_record_Internal&&this.uiWidgetBase) {
			this.canvas_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/scrollBox_record/canvas_record') as mw.Canvas
		}
		return this.canvas_record_Internal
	}
	private btn_pexp_Internal: mw.Button
	public get btn_pexp(): mw.Button {
		if(!this.btn_pexp_Internal&&this.uiWidgetBase) {
			this.btn_pexp_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/btn_pexp') as mw.Button
		}
		return this.btn_pexp_Internal
	}
	private txt_giftnum_Internal: mw.TextBlock
	public get txt_giftnum(): mw.TextBlock {
		if(!this.txt_giftnum_Internal&&this.uiWidgetBase) {
			this.txt_giftnum_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_info/txt_giftnum') as mw.TextBlock
		}
		return this.txt_giftnum_Internal
	}
	private img_bg00_Internal: mw.Image
	public get img_bg00(): mw.Image {
		if(!this.img_bg00_Internal&&this.uiWidgetBase) {
			this.img_bg00_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/img_bg00') as mw.Image
		}
		return this.img_bg00_Internal
	}
	private img_safe_Internal: mw.Image
	public get img_safe(): mw.Image {
		if(!this.img_safe_Internal&&this.uiWidgetBase) {
			this.img_safe_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/img_safe') as mw.Image
		}
		return this.img_safe_Internal
	}
	private canvas_like_Internal: mw.Canvas
	public get canvas_like(): mw.Canvas {
		if(!this.canvas_like_Internal&&this.uiWidgetBase) {
			this.canvas_like_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like') as mw.Canvas
		}
		return this.canvas_like_Internal
	}
	private img_likeBg1_Internal: mw.Image
	public get img_likeBg1(): mw.Image {
		if(!this.img_likeBg1_Internal&&this.uiWidgetBase) {
			this.img_likeBg1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/img_likeBg1') as mw.Image
		}
		return this.img_likeBg1_Internal
	}
	private img_likeBg2_Internal: mw.Image
	public get img_likeBg2(): mw.Image {
		if(!this.img_likeBg2_Internal&&this.uiWidgetBase) {
			this.img_likeBg2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/img_likeBg2') as mw.Image
		}
		return this.img_likeBg2_Internal
	}
	private img_likeBg3_Internal: mw.Image
	public get img_likeBg3(): mw.Image {
		if(!this.img_likeBg3_Internal&&this.uiWidgetBase) {
			this.img_likeBg3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/img_likeBg3') as mw.Image
		}
		return this.img_likeBg3_Internal
	}
	private btn_off1_Internal: mw.Button
	public get btn_off1(): mw.Button {
		if(!this.btn_off1_Internal&&this.uiWidgetBase) {
			this.btn_off1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/btn_off1') as mw.Button
		}
		return this.btn_off1_Internal
	}
	private text_like_Internal: mw.TextBlock
	public get text_like(): mw.TextBlock {
		if(!this.text_like_Internal&&this.uiWidgetBase) {
			this.text_like_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/text_like') as mw.TextBlock
		}
		return this.text_like_Internal
	}
	private canvas_likeName_Internal: mw.Canvas
	public get canvas_likeName(): mw.Canvas {
		if(!this.canvas_likeName_Internal&&this.uiWidgetBase) {
			this.canvas_likeName_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_like/ScrollBox_likeName0/canvas_likeName') as mw.Canvas
		}
		return this.canvas_likeName_Internal
	}
	private canvas_giftItems_Internal: mw.Canvas
	public get canvas_giftItems(): mw.Canvas {
		if(!this.canvas_giftItems_Internal&&this.uiWidgetBase) {
			this.canvas_giftItems_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems') as mw.Canvas
		}
		return this.canvas_giftItems_Internal
	}
	private img_giftItem1_Internal: mw.Image
	public get img_giftItem1(): mw.Image {
		if(!this.img_giftItem1_Internal&&this.uiWidgetBase) {
			this.img_giftItem1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/img_giftItem1') as mw.Image
		}
		return this.img_giftItem1_Internal
	}
	private img_giftItem2_Internal: mw.Image
	public get img_giftItem2(): mw.Image {
		if(!this.img_giftItem2_Internal&&this.uiWidgetBase) {
			this.img_giftItem2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/img_giftItem2') as mw.Image
		}
		return this.img_giftItem2_Internal
	}
	private img_giftItem3_Internal: mw.Image
	public get img_giftItem3(): mw.Image {
		if(!this.img_giftItem3_Internal&&this.uiWidgetBase) {
			this.img_giftItem3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/img_giftItem3') as mw.Image
		}
		return this.img_giftItem3_Internal
	}
	private btn_off3_Internal: mw.Button
	public get btn_off3(): mw.Button {
		if(!this.btn_off3_Internal&&this.uiWidgetBase) {
			this.btn_off3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/btn_off3') as mw.Button
		}
		return this.btn_off3_Internal
	}
	private text_giftItems_Internal: mw.TextBlock
	public get text_giftItems(): mw.TextBlock {
		if(!this.text_giftItems_Internal&&this.uiWidgetBase) {
			this.text_giftItems_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/text_giftItems') as mw.TextBlock
		}
		return this.text_giftItems_Internal
	}
	private giftItemScrollbox_Internal: mw.ScrollBox
	public get giftItemScrollbox(): mw.ScrollBox {
		if(!this.giftItemScrollbox_Internal&&this.uiWidgetBase) {
			this.giftItemScrollbox_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/giftItemScrollbox') as mw.ScrollBox
		}
		return this.giftItemScrollbox_Internal
	}
	private canvas_giftItem_Internal: mw.Canvas
	public get canvas_giftItem(): mw.Canvas {
		if(!this.canvas_giftItem_Internal&&this.uiWidgetBase) {
			this.canvas_giftItem_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_giftItems/giftItemScrollbox/canvas_giftItem') as mw.Canvas
		}
		return this.canvas_giftItem_Internal
	}
	private canvas_sendgift_Internal: mw.Canvas
	public get canvas_sendgift(): mw.Canvas {
		if(!this.canvas_sendgift_Internal&&this.uiWidgetBase) {
			this.canvas_sendgift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift') as mw.Canvas
		}
		return this.canvas_sendgift_Internal
	}
	private img_giftBg1_Internal: mw.Image
	public get img_giftBg1(): mw.Image {
		if(!this.img_giftBg1_Internal&&this.uiWidgetBase) {
			this.img_giftBg1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/img_giftBg1') as mw.Image
		}
		return this.img_giftBg1_Internal
	}
	private img_giftBg2_Internal: mw.Image
	public get img_giftBg2(): mw.Image {
		if(!this.img_giftBg2_Internal&&this.uiWidgetBase) {
			this.img_giftBg2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/img_giftBg2') as mw.Image
		}
		return this.img_giftBg2_Internal
	}
	private img_giftBg3_Internal: mw.Image
	public get img_giftBg3(): mw.Image {
		if(!this.img_giftBg3_Internal&&this.uiWidgetBase) {
			this.img_giftBg3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/img_giftBg3') as mw.Image
		}
		return this.img_giftBg3_Internal
	}
	private btn_off2_Internal: mw.Button
	public get btn_off2(): mw.Button {
		if(!this.btn_off2_Internal&&this.uiWidgetBase) {
			this.btn_off2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/btn_off2') as mw.Button
		}
		return this.btn_off2_Internal
	}
	private text_sendgift_Internal: mw.TextBlock
	public get text_sendgift(): mw.TextBlock {
		if(!this.text_sendgift_Internal&&this.uiWidgetBase) {
			this.text_sendgift_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/text_sendgift') as mw.TextBlock
		}
		return this.text_sendgift_Internal
	}
	private canvas_giftName_Internal: mw.Canvas
	public get canvas_giftName(): mw.Canvas {
		if(!this.canvas_giftName_Internal&&this.uiWidgetBase) {
			this.canvas_giftName_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_sendgift/canvas_giftName') as mw.Canvas
		}
		return this.canvas_giftName_Internal
	}
	private canvas_achieveMini_Internal: mw.Canvas
	public get canvas_achieveMini(): mw.Canvas {
		if(!this.canvas_achieveMini_Internal&&this.uiWidgetBase) {
			this.canvas_achieveMini_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini') as mw.Canvas
		}
		return this.canvas_achieveMini_Internal
	}
	private img_achieveMiniBg1_Internal: mw.Image
	public get img_achieveMiniBg1(): mw.Image {
		if(!this.img_achieveMiniBg1_Internal&&this.uiWidgetBase) {
			this.img_achieveMiniBg1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/img_achieveMiniBg1') as mw.Image
		}
		return this.img_achieveMiniBg1_Internal
	}
	private img_achieveMiniBg2_Internal: mw.Image
	public get img_achieveMiniBg2(): mw.Image {
		if(!this.img_achieveMiniBg2_Internal&&this.uiWidgetBase) {
			this.img_achieveMiniBg2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/img_achieveMiniBg2') as mw.Image
		}
		return this.img_achieveMiniBg2_Internal
	}
	private img_achieveMiniBg3_Internal: mw.Image
	public get img_achieveMiniBg3(): mw.Image {
		if(!this.img_achieveMiniBg3_Internal&&this.uiWidgetBase) {
			this.img_achieveMiniBg3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/img_achieveMiniBg3') as mw.Image
		}
		return this.img_achieveMiniBg3_Internal
	}
	private btn_off001_Internal: mw.Button
	public get btn_off001(): mw.Button {
		if(!this.btn_off001_Internal&&this.uiWidgetBase) {
			this.btn_off001_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/btn_off001') as mw.Button
		}
		return this.btn_off001_Internal
	}
	private text_achieveMini_Internal: mw.TextBlock
	public get text_achieveMini(): mw.TextBlock {
		if(!this.text_achieveMini_Internal&&this.uiWidgetBase) {
			this.text_achieveMini_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/text_achieveMini') as mw.TextBlock
		}
		return this.text_achieveMini_Internal
	}
	private text_achieveMiniTip_Internal: mw.TextBlock
	public get text_achieveMiniTip(): mw.TextBlock {
		if(!this.text_achieveMiniTip_Internal&&this.uiWidgetBase) {
			this.text_achieveMiniTip_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/text_achieveMiniTip') as mw.TextBlock
		}
		return this.text_achieveMiniTip_Internal
	}
	private canvas_achieveMiniFr_Internal: mw.Canvas
	public get canvas_achieveMiniFr(): mw.Canvas {
		if(!this.canvas_achieveMiniFr_Internal&&this.uiWidgetBase) {
			this.canvas_achieveMiniFr_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/contentCanvas/canvas_achieveMini/ScrollBox_achieveMini0/canvas_achieveMiniFr') as mw.Canvas
		}
		return this.canvas_achieveMiniFr_Internal
	}
	private canvas_report_Internal: mw.Canvas
	public get canvas_report(): mw.Canvas {
		if(!this.canvas_report_Internal&&this.uiWidgetBase) {
			this.canvas_report_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_report') as mw.Canvas
		}
		return this.canvas_report_Internal
	}
	private btn_report_Internal: mw.Button
	public get btn_report(): mw.Button {
		if(!this.btn_report_Internal&&this.uiWidgetBase) {
			this.btn_report_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_report/btn_report') as mw.Button
		}
		return this.btn_report_Internal
	}
	private text_report_Internal: mw.TextBlock
	public get text_report(): mw.TextBlock {
		if(!this.text_report_Internal&&this.uiWidgetBase) {
			this.text_report_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_report/text_report') as mw.TextBlock
		}
		return this.text_report_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {

		//按钮添加点击
		
		this.stalebtn_chage.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_stalebtn_chage");
		})
		this.initLanguage(this.stalebtn_chage);
		this.stalebtn_chage.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.stalebtn_chage.onPressed.add(() => {
			this.stalebtn_chage["preScale"] = this.stalebtn_chage.renderScale;
			this.stalebtn_chage.renderScale = Vector2.one.set(this.stalebtn_chage["preScale"]).multiply(1.1);
		})
		this.stalebtn_chage.onReleased.add(() => {
			this.stalebtn_chage.renderScale = this.stalebtn_chage["preScale"];
		})
		
		
	
		this.stalebtnedit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_stalebtnedit");
		})
		this.initLanguage(this.stalebtnedit);
		this.stalebtnedit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.stalebtnedit.onPressed.add(() => {
			this.stalebtnedit["preScale"] = this.stalebtnedit.renderScale;
			this.stalebtnedit.renderScale = Vector2.one.set(this.stalebtnedit["preScale"]).multiply(1.1);
		})
		this.stalebtnedit.onReleased.add(() => {
			this.stalebtnedit.renderScale = this.stalebtnedit["preScale"];
		})
		
		
	
		this.stalebtn_BeFriend.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_stalebtn_BeFriend");
		})
		this.initLanguage(this.stalebtn_BeFriend);
		this.stalebtn_BeFriend.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.stalebtn_BeFriend.onPressed.add(() => {
			this.stalebtn_BeFriend["preScale"] = this.stalebtn_BeFriend.renderScale;
			this.stalebtn_BeFriend.renderScale = Vector2.one.set(this.stalebtn_BeFriend["preScale"]).multiply(1.1);
		})
		this.stalebtn_BeFriend.onReleased.add(() => {
			this.stalebtn_BeFriend.renderScale = this.stalebtn_BeFriend["preScale"];
		})
		
		
	

		//按钮添加点击
		
		this.closeBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_closeBtn");
		})
		this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.closeBtn.onPressed.add(() => {
			this.closeBtn["preScale"] = this.closeBtn.renderScale;
			this.closeBtn.renderScale = Vector2.one.set(this.closeBtn["preScale"]).multiply(1.1);
		})
		this.closeBtn.onReleased.add(() => {
			this.closeBtn.renderScale = this.closeBtn["preScale"];
		})
		
	
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	
		this.btn_more.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_more");
		})
		this.btn_more.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_more.onPressed.add(() => {
			this.btn_more["preScale"] = this.btn_more.renderScale;
			this.btn_more.renderScale = Vector2.one.set(this.btn_more["preScale"]).multiply(1.1);
		})
		this.btn_more.onReleased.add(() => {
			this.btn_more.renderScale = this.btn_more["preScale"];
		})
		
	
		this.btn_good.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_good");
		})
		this.btn_good.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_good.onPressed.add(() => {
			this.btn_good["preScale"] = this.btn_good.renderScale;
			this.btn_good.renderScale = Vector2.one.set(this.btn_good["preScale"]).multiply(1.1);
		})
		this.btn_good.onReleased.add(() => {
			this.btn_good.renderScale = this.btn_good["preScale"];
		})
		
	
		this.btn_gift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_gift");
		})
		this.btn_gift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_gift.onPressed.add(() => {
			this.btn_gift["preScale"] = this.btn_gift.renderScale;
			this.btn_gift.renderScale = Vector2.one.set(this.btn_gift["preScale"]).multiply(1.1);
		})
		this.btn_gift.onReleased.add(() => {
			this.btn_gift.renderScale = this.btn_gift["preScale"];
		})
		
	
		this.btn_taAchievement.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_taAchievement");
		})
		this.btn_taAchievement.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_taAchievement.onPressed.add(() => {
			this.btn_taAchievement["preScale"] = this.btn_taAchievement.renderScale;
			this.btn_taAchievement.renderScale = Vector2.one.set(this.btn_taAchievement["preScale"]).multiply(1.1);
		})
		this.btn_taAchievement.onReleased.add(() => {
			this.btn_taAchievement.renderScale = this.btn_taAchievement["preScale"];
		})
		
	
		this.btn_myAchievement.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_myAchievement");
		})
		this.btn_myAchievement.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_myAchievement.onPressed.add(() => {
			this.btn_myAchievement["preScale"] = this.btn_myAchievement.renderScale;
			this.btn_myAchievement.renderScale = Vector2.one.set(this.btn_myAchievement["preScale"]).multiply(1.1);
		})
		this.btn_myAchievement.onReleased.add(() => {
			this.btn_myAchievement.renderScale = this.btn_myAchievement["preScale"];
		})
		
	
		this.btn_pexp.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_pexp");
		})
		this.btn_pexp.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_pexp.onPressed.add(() => {
			this.btn_pexp["preScale"] = this.btn_pexp.renderScale;
			this.btn_pexp.renderScale = Vector2.one.set(this.btn_pexp["preScale"]).multiply(1.1);
		})
		this.btn_pexp.onReleased.add(() => {
			this.btn_pexp.renderScale = this.btn_pexp["preScale"];
		})
		
	
		this.btn_off1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_off1");
		})
		this.btn_off1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off1.onPressed.add(() => {
			this.btn_off1["preScale"] = this.btn_off1.renderScale;
			this.btn_off1.renderScale = Vector2.one.set(this.btn_off1["preScale"]).multiply(1.1);
		})
		this.btn_off1.onReleased.add(() => {
			this.btn_off1.renderScale = this.btn_off1["preScale"];
		})
		
	
		this.btn_off3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_off3");
		})
		this.btn_off3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off3.onPressed.add(() => {
			this.btn_off3["preScale"] = this.btn_off3.renderScale;
			this.btn_off3.renderScale = Vector2.one.set(this.btn_off3["preScale"]).multiply(1.1);
		})
		this.btn_off3.onReleased.add(() => {
			this.btn_off3.renderScale = this.btn_off3["preScale"];
		})
		
	
		this.btn_off2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_off2");
		})
		this.btn_off2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off2.onPressed.add(() => {
			this.btn_off2["preScale"] = this.btn_off2.renderScale;
			this.btn_off2.renderScale = Vector2.one.set(this.btn_off2["preScale"]).multiply(1.1);
		})
		this.btn_off2.onReleased.add(() => {
			this.btn_off2.renderScale = this.btn_off2["preScale"];
		})
		
	
		this.btn_off001.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_off001");
		})
		this.btn_off001.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_off001.onPressed.add(() => {
			this.btn_off001["preScale"] = this.btn_off001.renderScale;
			this.btn_off001.renderScale = Vector2.one.set(this.btn_off001["preScale"]).multiply(1.1);
		})
		this.btn_off001.onReleased.add(() => {
			this.btn_off001.renderScale = this.btn_off001["preScale"];
		})
		
	
		this.btn_report.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Avatar_UI_btn_report");
		})
		this.btn_report.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_report.onPressed.add(() => {
			this.btn_report["preScale"] = this.btn_report.renderScale;
			this.btn_report.renderScale = Vector2.one.set(this.btn_report["preScale"]).multiply(1.1);
		})
		this.btn_report.onReleased.add(() => {
			this.btn_report.renderScale = this.btn_report["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.txt_cardname)
		this.txt_cardname.isRichText = true;
		
	
		this.initLanguage(this.txt_name)
		this.txt_name.isRichText = true;
		
	
		this.initLanguage(this.txt_gender)
		this.txt_gender.isRichText = true;
		
	
		this.initLanguage(this.txt_ID)
		this.txt_ID.isRichText = true;
		
	
		this.initLanguage(this.txt_level)
		this.txt_level.isRichText = true;
		
	
		this.initLanguage(this.txt_EP)
		this.txt_EP.isRichText = true;
		
	
		this.initLanguage(this.txt_goodnum)
		this.txt_goodnum.isRichText = true;
		
	
		this.initLanguage(this.txt_sign)
		this.txt_sign.isRichText = true;
		
	
		this.initLanguage(this.txt_love)
		this.txt_love.isRichText = true;
		
	
		this.initLanguage(this.txt_achievement)
		this.txt_achievement.isRichText = true;
		
	
		this.initLanguage(this.txt_taAchievement)
		this.txt_taAchievement.isRichText = true;
		
	
		this.initLanguage(this.txt_myAchievement)
		this.txt_myAchievement.isRichText = true;
		
	
		this.initLanguage(this.txt_giftshow)
		this.txt_giftshow.isRichText = true;
		
	
		this.initLanguage(this.txt_populevel)
		this.txt_populevel.isRichText = true;
		
	
		this.initLanguage(this.txt_popuEP)
		this.txt_popuEP.isRichText = true;
		
	
		this.initLanguage(this.txt_record)
		this.txt_record.isRichText = true;
		
	
		this.initLanguage(this.txt_giftnum)
		this.txt_giftnum.isRichText = true;
		
	
		this.initLanguage(this.text_like)
		this.text_like.isRichText = true;
		
	
		this.initLanguage(this.text_giftItems)
		this.text_giftItems.isRichText = true;
		
	
		this.initLanguage(this.text_sendgift)
		this.text_sendgift.isRichText = true;
		
	
		this.initLanguage(this.text_achieveMini)
		this.text_achieveMini.isRichText = true;
		
	
		this.initLanguage(this.text_achieveMiniTip)
		this.text_achieveMiniTip.isRichText = true;
		
	
		this.initLanguage(this.text_report)
		this.text_report.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Avatar_UI'] = Avatar_UI_Generate;