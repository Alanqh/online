
 

 @UIBind('UI/ShareUI/Main_UI.ui')
 export default class Main_UI_Generate extends UIScript {
	 	private mrootcanvas_Internal: mw.Canvas
	public get mrootcanvas(): mw.Canvas {
		if(!this.mrootcanvas_Internal&&this.uiWidgetBase) {
			this.mrootcanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas') as mw.Canvas
		}
		return this.mrootcanvas_Internal
	}
	private canvas_squat_Internal: mw.Canvas
	public get canvas_squat(): mw.Canvas {
		if(!this.canvas_squat_Internal&&this.uiWidgetBase) {
			this.canvas_squat_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_squat') as mw.Canvas
		}
		return this.canvas_squat_Internal
	}
	private img_squat_Internal: mw.Image
	public get img_squat(): mw.Image {
		if(!this.img_squat_Internal&&this.uiWidgetBase) {
			this.img_squat_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_squat/img_squat') as mw.Image
		}
		return this.img_squat_Internal
	}
	private btn_squat_Internal: mw.Button
	public get btn_squat(): mw.Button {
		if(!this.btn_squat_Internal&&this.uiWidgetBase) {
			this.btn_squat_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_squat/btn_squat') as mw.Button
		}
		return this.btn_squat_Internal
	}
	private canvas_move_Internal: mw.Canvas
	public get canvas_move(): mw.Canvas {
		if(!this.canvas_move_Internal&&this.uiWidgetBase) {
			this.canvas_move_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move') as mw.Canvas
		}
		return this.canvas_move_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_move/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private canvas_useprops_Internal: mw.Canvas
	public get canvas_useprops(): mw.Canvas {
		if(!this.canvas_useprops_Internal&&this.uiWidgetBase) {
			this.canvas_useprops_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops') as mw.Canvas
		}
		return this.canvas_useprops_Internal
	}
	private img_props_Internal: mw.Image
	public get img_props(): mw.Image {
		if(!this.img_props_Internal&&this.uiWidgetBase) {
			this.img_props_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops/img_props') as mw.Image
		}
		return this.img_props_Internal
	}
	private btn_useprops_Internal: mw.Button
	public get btn_useprops(): mw.Button {
		if(!this.btn_useprops_Internal&&this.uiWidgetBase) {
			this.btn_useprops_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_useprops/btn_useprops') as mw.Button
		}
		return this.btn_useprops_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private canvas_discardItem_Internal: mw.Canvas
	public get canvas_discardItem(): mw.Canvas {
		if(!this.canvas_discardItem_Internal&&this.uiWidgetBase) {
			this.canvas_discardItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_discardItem') as mw.Canvas
		}
		return this.canvas_discardItem_Internal
	}
	private btn_discardItem_Internal: mw.Button
	public get btn_discardItem(): mw.Button {
		if(!this.btn_discardItem_Internal&&this.uiWidgetBase) {
			this.btn_discardItem_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_discardItem/btn_discardItem') as mw.Button
		}
		return this.btn_discardItem_Internal
	}
	private canvas_jump_Internal: mw.Canvas
	public get canvas_jump(): mw.Canvas {
		if(!this.canvas_jump_Internal&&this.uiWidgetBase) {
			this.canvas_jump_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_jump') as mw.Canvas
		}
		return this.canvas_jump_Internal
	}
	private btn_jump_Internal: mw.Button
	public get btn_jump(): mw.Button {
		if(!this.btn_jump_Internal&&this.uiWidgetBase) {
			this.btn_jump_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_jump/btn_jump') as mw.Button
		}
		return this.btn_jump_Internal
	}
	private canvas_toprightcorner_Internal: mw.Canvas
	public get canvas_toprightcorner(): mw.Canvas {
		if(!this.canvas_toprightcorner_Internal&&this.uiWidgetBase) {
			this.canvas_toprightcorner_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_toprightcorner') as mw.Canvas
		}
		return this.canvas_toprightcorner_Internal
	}
	private canvas_time_Internal: mw.Canvas
	public get canvas_time(): mw.Canvas {
		if(!this.canvas_time_Internal&&this.uiWidgetBase) {
			this.canvas_time_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time') as mw.Canvas
		}
		return this.canvas_time_Internal
	}
	private img_moon_Internal: mw.Image
	public get img_moon(): mw.Image {
		if(!this.img_moon_Internal&&this.uiWidgetBase) {
			this.img_moon_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/img_moon') as mw.Image
		}
		return this.img_moon_Internal
	}
	private text_daynew_Internal: mw.TextBlock
	public get text_daynew(): mw.TextBlock {
		if(!this.text_daynew_Internal&&this.uiWidgetBase) {
			this.text_daynew_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/text_daynew') as mw.TextBlock
		}
		return this.text_daynew_Internal
	}
	private text_timenew_Internal: mw.TextBlock
	public get text_timenew(): mw.TextBlock {
		if(!this.text_timenew_Internal&&this.uiWidgetBase) {
			this.text_timenew_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_time/text_timenew') as mw.TextBlock
		}
		return this.text_timenew_Internal
	}
	private rightTopCanvas_Internal: mw.Canvas
	public get rightTopCanvas(): mw.Canvas {
		if(!this.rightTopCanvas_Internal&&this.uiWidgetBase) {
			this.rightTopCanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas') as mw.Canvas
		}
		return this.rightTopCanvas_Internal
	}
	private canvas_camera_Internal: mw.Canvas
	public get canvas_camera(): mw.Canvas {
		if(!this.canvas_camera_Internal&&this.uiWidgetBase) {
			this.canvas_camera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_camera') as mw.Canvas
		}
		return this.canvas_camera_Internal
	}
	private btn_camera_Internal: mw.Button
	public get btn_camera(): mw.Button {
		if(!this.btn_camera_Internal&&this.uiWidgetBase) {
			this.btn_camera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_camera/btn_camera') as mw.Button
		}
		return this.btn_camera_Internal
	}
	private text_camera_Internal: mw.TextBlock
	public get text_camera(): mw.TextBlock {
		if(!this.text_camera_Internal&&this.uiWidgetBase) {
			this.text_camera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_camera/text_camera') as mw.TextBlock
		}
		return this.text_camera_Internal
	}
	private img_camerapoint_Internal: mw.Image
	public get img_camerapoint(): mw.Image {
		if(!this.img_camerapoint_Internal&&this.uiWidgetBase) {
			this.img_camerapoint_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_camera/img_camerapoint') as mw.Image
		}
		return this.img_camerapoint_Internal
	}
	private canvas_setting_Internal: mw.Canvas
	public get canvas_setting(): mw.Canvas {
		if(!this.canvas_setting_Internal&&this.uiWidgetBase) {
			this.canvas_setting_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_setting') as mw.Canvas
		}
		return this.canvas_setting_Internal
	}
	private btn_setting_Internal: mw.Button
	public get btn_setting(): mw.Button {
		if(!this.btn_setting_Internal&&this.uiWidgetBase) {
			this.btn_setting_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_setting/btn_setting') as mw.Button
		}
		return this.btn_setting_Internal
	}
	private text_setting_Internal: mw.TextBlock
	public get text_setting(): mw.TextBlock {
		if(!this.text_setting_Internal&&this.uiWidgetBase) {
			this.text_setting_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_setting/text_setting') as mw.TextBlock
		}
		return this.text_setting_Internal
	}
	private canvas_book_Internal: mw.Canvas
	public get canvas_book(): mw.Canvas {
		if(!this.canvas_book_Internal&&this.uiWidgetBase) {
			this.canvas_book_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_book') as mw.Canvas
		}
		return this.canvas_book_Internal
	}
	private btn_notebook_Internal: mw.Button
	public get btn_notebook(): mw.Button {
		if(!this.btn_notebook_Internal&&this.uiWidgetBase) {
			this.btn_notebook_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_book/btn_notebook') as mw.Button
		}
		return this.btn_notebook_Internal
	}
	private img_point_Internal: mw.Image
	public get img_point(): mw.Image {
		if(!this.img_point_Internal&&this.uiWidgetBase) {
			this.img_point_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_book/img_point') as mw.Image
		}
		return this.img_point_Internal
	}
	private text_book_Internal: mw.TextBlock
	public get text_book(): mw.TextBlock {
		if(!this.text_book_Internal&&this.uiWidgetBase) {
			this.text_book_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_book/text_book') as mw.TextBlock
		}
		return this.text_book_Internal
	}
	private canvas_smile_Internal: mw.Canvas
	public get canvas_smile(): mw.Canvas {
		if(!this.canvas_smile_Internal&&this.uiWidgetBase) {
			this.canvas_smile_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_smile') as mw.Canvas
		}
		return this.canvas_smile_Internal
	}
	private btn_switchposition_Internal: mw.Button
	public get btn_switchposition(): mw.Button {
		if(!this.btn_switchposition_Internal&&this.uiWidgetBase) {
			this.btn_switchposition_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_smile/btn_switchposition') as mw.Button
		}
		return this.btn_switchposition_Internal
	}
	private text_switchposition_Internal: mw.TextBlock
	public get text_switchposition(): mw.TextBlock {
		if(!this.text_switchposition_Internal&&this.uiWidgetBase) {
			this.text_switchposition_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_smile/text_switchposition') as mw.TextBlock
		}
		return this.text_switchposition_Internal
	}
	private canvas_shop_Internal: mw.Canvas
	public get canvas_shop(): mw.Canvas {
		if(!this.canvas_shop_Internal&&this.uiWidgetBase) {
			this.canvas_shop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop') as mw.Canvas
		}
		return this.canvas_shop_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private btn_shop_Internal: mw.Button
	public get btn_shop(): mw.Button {
		if(!this.btn_shop_Internal&&this.uiWidgetBase) {
			this.btn_shop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/btn_shop') as mw.Button
		}
		return this.btn_shop_Internal
	}
	private text_shop_Internal: mw.TextBlock
	public get text_shop(): mw.TextBlock {
		if(!this.text_shop_Internal&&this.uiWidgetBase) {
			this.text_shop_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/text_shop') as mw.TextBlock
		}
		return this.text_shop_Internal
	}
	private img_shopPoint_Internal: mw.Image
	public get img_shopPoint(): mw.Image {
		if(!this.img_shopPoint_Internal&&this.uiWidgetBase) {
			this.img_shopPoint_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/img_shopPoint') as mw.Image
		}
		return this.img_shopPoint_Internal
	}
	private canvas_tips_Internal: mw.Canvas
	public get canvas_tips(): mw.Canvas {
		if(!this.canvas_tips_Internal&&this.uiWidgetBase) {
			this.canvas_tips_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/canvas_tips') as mw.Canvas
		}
		return this.canvas_tips_Internal
	}
	private img_tipsBg_1_Internal: mw.Image
	public get img_tipsBg_1(): mw.Image {
		if(!this.img_tipsBg_1_Internal&&this.uiWidgetBase) {
			this.img_tipsBg_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/canvas_tips/img_tipsBg_1') as mw.Image
		}
		return this.img_tipsBg_1_Internal
	}
	private img_tipsBg_Internal: mw.Image
	public get img_tipsBg(): mw.Image {
		if(!this.img_tipsBg_Internal&&this.uiWidgetBase) {
			this.img_tipsBg_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/canvas_tips/img_tipsBg') as mw.Image
		}
		return this.img_tipsBg_Internal
	}
	private text_tips_Internal: mw.TextBlock
	public get text_tips(): mw.TextBlock {
		if(!this.text_tips_Internal&&this.uiWidgetBase) {
			this.text_tips_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/canvas_tips/text_tips') as mw.TextBlock
		}
		return this.text_tips_Internal
	}
	private img_arrows_Internal: mw.Image
	public get img_arrows(): mw.Image {
		if(!this.img_arrows_Internal&&this.uiWidgetBase) {
			this.img_arrows_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_shop/canvas_tips/img_arrows') as mw.Image
		}
		return this.img_arrows_Internal
	}
	private canvas_idCard_Internal: mw.Canvas
	public get canvas_idCard(): mw.Canvas {
		if(!this.canvas_idCard_Internal&&this.uiWidgetBase) {
			this.canvas_idCard_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_idCard') as mw.Canvas
		}
		return this.canvas_idCard_Internal
	}
	private btn_idCard_Internal: mw.Button
	public get btn_idCard(): mw.Button {
		if(!this.btn_idCard_Internal&&this.uiWidgetBase) {
			this.btn_idCard_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_idCard/btn_idCard') as mw.Button
		}
		return this.btn_idCard_Internal
	}
	private text_idCard_Internal: mw.TextBlock
	public get text_idCard(): mw.TextBlock {
		if(!this.text_idCard_Internal&&this.uiWidgetBase) {
			this.text_idCard_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_idCard/text_idCard') as mw.TextBlock
		}
		return this.text_idCard_Internal
	}
	private canvas_weaponupgrade_Internal: mw.Canvas
	public get canvas_weaponupgrade(): mw.Canvas {
		if(!this.canvas_weaponupgrade_Internal&&this.uiWidgetBase) {
			this.canvas_weaponupgrade_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_weaponupgrade') as mw.Canvas
		}
		return this.canvas_weaponupgrade_Internal
	}
	private btn_weaponupgrade_Internal: mw.Button
	public get btn_weaponupgrade(): mw.Button {
		if(!this.btn_weaponupgrade_Internal&&this.uiWidgetBase) {
			this.btn_weaponupgrade_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_weaponupgrade/btn_weaponupgrade') as mw.Button
		}
		return this.btn_weaponupgrade_Internal
	}
	private img_weaponupgrade_Internal: mw.Image
	public get img_weaponupgrade(): mw.Image {
		if(!this.img_weaponupgrade_Internal&&this.uiWidgetBase) {
			this.img_weaponupgrade_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_weaponupgrade/img_weaponupgrade') as mw.Image
		}
		return this.img_weaponupgrade_Internal
	}
	private text_weaponupgrade_Internal: mw.TextBlock
	public get text_weaponupgrade(): mw.TextBlock {
		if(!this.text_weaponupgrade_Internal&&this.uiWidgetBase) {
			this.text_weaponupgrade_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_weaponupgrade/text_weaponupgrade') as mw.TextBlock
		}
		return this.text_weaponupgrade_Internal
	}
	private img_wupoint_Internal: mw.Image
	public get img_wupoint(): mw.Image {
		if(!this.img_wupoint_Internal&&this.uiWidgetBase) {
			this.img_wupoint_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/rightTopCanvas/canvas_weaponupgrade/img_wupoint') as mw.Image
		}
		return this.img_wupoint_Internal
	}
	private canvas_catch_Internal: mw.Canvas
	public get canvas_catch(): mw.Canvas {
		if(!this.canvas_catch_Internal&&this.uiWidgetBase) {
			this.canvas_catch_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_catch') as mw.Canvas
		}
		return this.canvas_catch_Internal
	}
	private btn_catch_Internal: mw.Button
	public get btn_catch(): mw.Button {
		if(!this.btn_catch_Internal&&this.uiWidgetBase) {
			this.btn_catch_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_catch/btn_catch') as mw.Button
		}
		return this.btn_catch_Internal
	}
	private canvas_aim_Internal: mw.Canvas
	public get canvas_aim(): mw.Canvas {
		if(!this.canvas_aim_Internal&&this.uiWidgetBase) {
			this.canvas_aim_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_aim') as mw.Canvas
		}
		return this.canvas_aim_Internal
	}
	private img_aim_Internal: mw.Image
	public get img_aim(): mw.Image {
		if(!this.img_aim_Internal&&this.uiWidgetBase) {
			this.img_aim_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_aim/img_aim') as mw.Image
		}
		return this.img_aim_Internal
	}
	private life_canvas_Internal: mw.Canvas
	public get life_canvas(): mw.Canvas {
		if(!this.life_canvas_Internal&&this.uiWidgetBase) {
			this.life_canvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/life_canvas') as mw.Canvas
		}
		return this.life_canvas_Internal
	}
	private img_lifenum_Internal: mw.Image
	public get img_lifenum(): mw.Image {
		if(!this.img_lifenum_Internal&&this.uiWidgetBase) {
			this.img_lifenum_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/life_canvas/img_lifenum') as mw.Image
		}
		return this.img_lifenum_Internal
	}
	private buffCanvas_Internal: mw.Canvas
	public get buffCanvas(): mw.Canvas {
		if(!this.buffCanvas_Internal&&this.uiWidgetBase) {
			this.buffCanvas_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/buffCanvas') as mw.Canvas
		}
		return this.buffCanvas_Internal
	}
	private canvas_news_Internal: mw.Canvas
	public get canvas_news(): mw.Canvas {
		if(!this.canvas_news_Internal&&this.uiWidgetBase) {
			this.canvas_news_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news') as mw.Canvas
		}
		return this.canvas_news_Internal
	}
	private btn_news_Internal: mw.Button
	public get btn_news(): mw.Button {
		if(!this.btn_news_Internal&&this.uiWidgetBase) {
			this.btn_news_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news/btn_news') as mw.Button
		}
		return this.btn_news_Internal
	}
	private img_wupoint06_Internal: mw.Image
	public get img_wupoint06(): mw.Image {
		if(!this.img_wupoint06_Internal&&this.uiWidgetBase) {
			this.img_wupoint06_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news/img_wupoint06') as mw.Image
		}
		return this.img_wupoint06_Internal
	}
	private canvas_faker_Internal: mw.Canvas
	public get canvas_faker(): mw.Canvas {
		if(!this.canvas_faker_Internal&&this.uiWidgetBase) {
			this.canvas_faker_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news/canvas_faker') as mw.Canvas
		}
		return this.canvas_faker_Internal
	}
	private img_tipsBg0_Internal: mw.Image
	public get img_tipsBg0(): mw.Image {
		if(!this.img_tipsBg0_Internal&&this.uiWidgetBase) {
			this.img_tipsBg0_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news/canvas_faker/img_tipsBg0') as mw.Image
		}
		return this.img_tipsBg0_Internal
	}
	private btn_faker_Internal: mw.Button
	public get btn_faker(): mw.Button {
		if(!this.btn_faker_Internal&&this.uiWidgetBase) {
			this.btn_faker_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_news/canvas_faker/btn_faker') as mw.Button
		}
		return this.btn_faker_Internal
	}
	private canvas_checkIn_Internal: mw.Canvas
	public get canvas_checkIn(): mw.Canvas {
		if(!this.canvas_checkIn_Internal&&this.uiWidgetBase) {
			this.canvas_checkIn_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_checkIn') as mw.Canvas
		}
		return this.canvas_checkIn_Internal
	}
	private img_checkIn_Internal: mw.Image
	public get img_checkIn(): mw.Image {
		if(!this.img_checkIn_Internal&&this.uiWidgetBase) {
			this.img_checkIn_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_checkIn/img_checkIn') as mw.Image
		}
		return this.img_checkIn_Internal
	}
	private btn_checkIn_Internal: mw.Button
	public get btn_checkIn(): mw.Button {
		if(!this.btn_checkIn_Internal&&this.uiWidgetBase) {
			this.btn_checkIn_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_checkIn/btn_checkIn') as mw.Button
		}
		return this.btn_checkIn_Internal
	}
	private img_checkInPoint_Internal: mw.Image
	public get img_checkInPoint(): mw.Image {
		if(!this.img_checkInPoint_Internal&&this.uiWidgetBase) {
			this.img_checkInPoint_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_checkIn/img_checkInPoint') as mw.Image
		}
		return this.img_checkInPoint_Internal
	}
	private canvas_camera_1_Internal: mw.Canvas
	public get canvas_camera_1(): mw.Canvas {
		if(!this.canvas_camera_1_Internal&&this.uiWidgetBase) {
			this.canvas_camera_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_camera_1') as mw.Canvas
		}
		return this.canvas_camera_1_Internal
	}
	private img_props_1_Internal: mw.Image
	public get img_props_1(): mw.Image {
		if(!this.img_props_1_Internal&&this.uiWidgetBase) {
			this.img_props_1_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_camera_1/img_props_1') as mw.Image
		}
		return this.img_props_1_Internal
	}
	private btn_usecamera_Internal: mw.Button
	public get btn_usecamera(): mw.Button {
		if(!this.btn_usecamera_Internal&&this.uiWidgetBase) {
			this.btn_usecamera_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/canvas_camera_1/btn_usecamera') as mw.Button
		}
		return this.btn_usecamera_Internal
	}
	private mGuideMask_Internal: mw.Image
	public get mGuideMask(): mw.Image {
		if(!this.mGuideMask_Internal&&this.uiWidgetBase) {
			this.mGuideMask_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/mGuideMask') as mw.Image
		}
		return this.mGuideMask_Internal
	}
	private mTextGuide_Internal: mw.TextBlock
	public get mTextGuide(): mw.TextBlock {
		if(!this.mTextGuide_Internal&&this.uiWidgetBase) {
			this.mTextGuide_Internal = this.uiWidgetBase.findChildByPath('mrootcanvas/mTextGuide') as mw.TextBlock
		}
		return this.mTextGuide_Internal
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
		
		this.btn_squat.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_squat");
		})
		this.btn_squat.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_squat.onPressed.add(() => {
			this.btn_squat["preScale"] = this.btn_squat.renderScale;
			this.btn_squat.renderScale = Vector2.one.set(this.btn_squat["preScale"]).multiply(1.1);
		})
		this.btn_squat.onReleased.add(() => {
			this.btn_squat.renderScale = this.btn_squat["preScale"];
		})
		
	
		this.btn_useprops.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_useprops");
		})
		this.btn_useprops.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_useprops.onPressed.add(() => {
			this.btn_useprops["preScale"] = this.btn_useprops.renderScale;
			this.btn_useprops.renderScale = Vector2.one.set(this.btn_useprops["preScale"]).multiply(1.1);
		})
		this.btn_useprops.onReleased.add(() => {
			this.btn_useprops.renderScale = this.btn_useprops["preScale"];
		})
		
	
		this.btn_discardItem.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_discardItem");
		})
		this.btn_discardItem.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_discardItem.onPressed.add(() => {
			this.btn_discardItem["preScale"] = this.btn_discardItem.renderScale;
			this.btn_discardItem.renderScale = Vector2.one.set(this.btn_discardItem["preScale"]).multiply(1.1);
		})
		this.btn_discardItem.onReleased.add(() => {
			this.btn_discardItem.renderScale = this.btn_discardItem["preScale"];
		})
		
	
		this.btn_jump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_jump");
		})
		this.btn_jump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_jump.onPressed.add(() => {
			this.btn_jump["preScale"] = this.btn_jump.renderScale;
			this.btn_jump.renderScale = Vector2.one.set(this.btn_jump["preScale"]).multiply(1.1);
		})
		this.btn_jump.onReleased.add(() => {
			this.btn_jump.renderScale = this.btn_jump["preScale"];
		})
		
	
		this.btn_camera.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_camera");
		})
		this.btn_camera.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_camera.onPressed.add(() => {
			this.btn_camera["preScale"] = this.btn_camera.renderScale;
			this.btn_camera.renderScale = Vector2.one.set(this.btn_camera["preScale"]).multiply(1.1);
		})
		this.btn_camera.onReleased.add(() => {
			this.btn_camera.renderScale = this.btn_camera["preScale"];
		})
		
	
		this.btn_setting.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_setting");
		})
		this.btn_setting.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_setting.onPressed.add(() => {
			this.btn_setting["preScale"] = this.btn_setting.renderScale;
			this.btn_setting.renderScale = Vector2.one.set(this.btn_setting["preScale"]).multiply(1.1);
		})
		this.btn_setting.onReleased.add(() => {
			this.btn_setting.renderScale = this.btn_setting["preScale"];
		})
		
	
		this.btn_notebook.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_notebook");
		})
		this.btn_notebook.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_notebook.onPressed.add(() => {
			this.btn_notebook["preScale"] = this.btn_notebook.renderScale;
			this.btn_notebook.renderScale = Vector2.one.set(this.btn_notebook["preScale"]).multiply(1.1);
		})
		this.btn_notebook.onReleased.add(() => {
			this.btn_notebook.renderScale = this.btn_notebook["preScale"];
		})
		
	
		this.btn_switchposition.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_switchposition");
		})
		this.btn_switchposition.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_switchposition.onPressed.add(() => {
			this.btn_switchposition["preScale"] = this.btn_switchposition.renderScale;
			this.btn_switchposition.renderScale = Vector2.one.set(this.btn_switchposition["preScale"]).multiply(1.1);
		})
		this.btn_switchposition.onReleased.add(() => {
			this.btn_switchposition.renderScale = this.btn_switchposition["preScale"];
		})
		
	
		this.btn_shop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_shop");
		})
		this.btn_shop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_shop.onPressed.add(() => {
			this.btn_shop["preScale"] = this.btn_shop.renderScale;
			this.btn_shop.renderScale = Vector2.one.set(this.btn_shop["preScale"]).multiply(1.1);
		})
		this.btn_shop.onReleased.add(() => {
			this.btn_shop.renderScale = this.btn_shop["preScale"];
		})
		
	
		this.btn_idCard.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_idCard");
		})
		this.btn_idCard.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_idCard.onPressed.add(() => {
			this.btn_idCard["preScale"] = this.btn_idCard.renderScale;
			this.btn_idCard.renderScale = Vector2.one.set(this.btn_idCard["preScale"]).multiply(1.1);
		})
		this.btn_idCard.onReleased.add(() => {
			this.btn_idCard.renderScale = this.btn_idCard["preScale"];
		})
		
	
		this.btn_weaponupgrade.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_weaponupgrade");
		})
		this.btn_weaponupgrade.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_weaponupgrade.onPressed.add(() => {
			this.btn_weaponupgrade["preScale"] = this.btn_weaponupgrade.renderScale;
			this.btn_weaponupgrade.renderScale = Vector2.one.set(this.btn_weaponupgrade["preScale"]).multiply(1.1);
		})
		this.btn_weaponupgrade.onReleased.add(() => {
			this.btn_weaponupgrade.renderScale = this.btn_weaponupgrade["preScale"];
		})
		
	
		this.btn_catch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_catch");
		})
		this.btn_catch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_catch.onPressed.add(() => {
			this.btn_catch["preScale"] = this.btn_catch.renderScale;
			this.btn_catch.renderScale = Vector2.one.set(this.btn_catch["preScale"]).multiply(1.1);
		})
		this.btn_catch.onReleased.add(() => {
			this.btn_catch.renderScale = this.btn_catch["preScale"];
		})
		
	
		this.btn_news.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_news");
		})
		this.btn_news.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_news.onPressed.add(() => {
			this.btn_news["preScale"] = this.btn_news.renderScale;
			this.btn_news.renderScale = Vector2.one.set(this.btn_news["preScale"]).multiply(1.1);
		})
		this.btn_news.onReleased.add(() => {
			this.btn_news.renderScale = this.btn_news["preScale"];
		})
		
	
		this.btn_faker.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_faker");
		})
		this.btn_faker.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_faker.onPressed.add(() => {
			this.btn_faker["preScale"] = this.btn_faker.renderScale;
			this.btn_faker.renderScale = Vector2.one.set(this.btn_faker["preScale"]).multiply(1.1);
		})
		this.btn_faker.onReleased.add(() => {
			this.btn_faker.renderScale = this.btn_faker["preScale"];
		})
		
	
		this.btn_checkIn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_checkIn");
		})
		this.btn_checkIn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_checkIn.onPressed.add(() => {
			this.btn_checkIn["preScale"] = this.btn_checkIn.renderScale;
			this.btn_checkIn.renderScale = Vector2.one.set(this.btn_checkIn["preScale"]).multiply(1.1);
		})
		this.btn_checkIn.onReleased.add(() => {
			this.btn_checkIn.renderScale = this.btn_checkIn["preScale"];
		})
		
	
		this.btn_usecamera.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Main_UI_btn_usecamera");
		})
		this.btn_usecamera.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_usecamera.onPressed.add(() => {
			this.btn_usecamera["preScale"] = this.btn_usecamera.renderScale;
			this.btn_usecamera.renderScale = Vector2.one.set(this.btn_usecamera["preScale"]).multiply(1.1);
		})
		this.btn_usecamera.onReleased.add(() => {
			this.btn_usecamera.renderScale = this.btn_usecamera["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.text_daynew)
		this.text_daynew.isRichText = true;
		
	
		this.initLanguage(this.text_timenew)
		this.text_timenew.isRichText = true;
		
	
		this.initLanguage(this.text_camera)
		this.text_camera.isRichText = true;
		
	
		this.initLanguage(this.text_setting)
		this.text_setting.isRichText = true;
		
	
		this.initLanguage(this.text_book)
		this.text_book.isRichText = true;
		
	
		this.initLanguage(this.text_switchposition)
		this.text_switchposition.isRichText = true;
		
	
		this.initLanguage(this.text_shop)
		this.text_shop.isRichText = true;
		
	
		this.initLanguage(this.text_tips)
		this.text_tips.isRichText = true;
		
	
		this.initLanguage(this.text_idCard)
		this.text_idCard.isRichText = true;
		
	
		this.initLanguage(this.text_weaponupgrade)
		this.text_weaponupgrade.isRichText = true;
		
	
		this.initLanguage(this.mTextGuide)
		this.mTextGuide.isRichText = true;
		
	

		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Main_UI'] = Main_UI_Generate;