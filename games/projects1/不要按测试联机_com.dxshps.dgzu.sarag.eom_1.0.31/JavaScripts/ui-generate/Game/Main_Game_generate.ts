
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Game/Main_Game.ui
*/



@UIBind('UI/Game/Main_Game.ui')
export default class Main_Game_Generate extends UIScript {
		private mCanvas_Anchor_Internal: mw.Canvas
	public get mCanvas_Anchor(): mw.Canvas {
		if(!this.mCanvas_Anchor_Internal&&this.uiWidgetBase) {
			this.mCanvas_Anchor_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Anchor') as mw.Canvas
		}
		return this.mCanvas_Anchor_Internal
	}
	private mCanvas_Match_Internal: mw.Canvas
	public get mCanvas_Match(): mw.Canvas {
		if(!this.mCanvas_Match_Internal&&this.uiWidgetBase) {
			this.mCanvas_Match_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Match') as mw.Canvas
		}
		return this.mCanvas_Match_Internal
	}
	private mImg_Match_Bg_Internal: mw.Image
	public get mImg_Match_Bg(): mw.Image {
		if(!this.mImg_Match_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Match_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Match/mImg_Match_Bg') as mw.Image
		}
		return this.mImg_Match_Bg_Internal
	}
	private mText_Match_Internal: mw.TextBlock
	public get mText_Match(): mw.TextBlock {
		if(!this.mText_Match_Internal&&this.uiWidgetBase) {
			this.mText_Match_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Match/mText_Match') as mw.TextBlock
		}
		return this.mText_Match_Internal
	}
	private mText_MatchTime_Internal: mw.TextBlock
	public get mText_MatchTime(): mw.TextBlock {
		if(!this.mText_MatchTime_Internal&&this.uiWidgetBase) {
			this.mText_MatchTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Match/mText_MatchTime') as mw.TextBlock
		}
		return this.mText_MatchTime_Internal
	}
	private mCanvas_Waiting_Internal: mw.Canvas
	public get mCanvas_Waiting(): mw.Canvas {
		if(!this.mCanvas_Waiting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Waiting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Waiting') as mw.Canvas
		}
		return this.mCanvas_Waiting_Internal
	}
	private mImg_Bg_Internal: mw.Image
	public get mImg_Bg(): mw.Image {
		if(!this.mImg_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Waiting/mImg_Bg') as mw.Image
		}
		return this.mImg_Bg_Internal
	}
	private mText_Matching_Internal: mw.TextBlock
	public get mText_Matching(): mw.TextBlock {
		if(!this.mText_Matching_Internal&&this.uiWidgetBase) {
			this.mText_Matching_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Waiting/mText_Matching') as mw.TextBlock
		}
		return this.mText_Matching_Internal
	}
	private mText_WaitNum_Internal: mw.TextBlock
	public get mText_WaitNum(): mw.TextBlock {
		if(!this.mText_WaitNum_Internal&&this.uiWidgetBase) {
			this.mText_WaitNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Waiting/mText_WaitNum') as mw.TextBlock
		}
		return this.mText_WaitNum_Internal
	}
	private mText_SuccessfulMatch_Internal: mw.TextBlock
	public get mText_SuccessfulMatch(): mw.TextBlock {
		if(!this.mText_SuccessfulMatch_Internal&&this.uiWidgetBase) {
			this.mText_SuccessfulMatch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Waiting/mText_SuccessfulMatch') as mw.TextBlock
		}
		return this.mText_SuccessfulMatch_Internal
	}
	private mCanvas_Gaming_Internal: mw.Canvas
	public get mCanvas_Gaming(): mw.Canvas {
		if(!this.mCanvas_Gaming_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gaming_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming') as mw.Canvas
		}
		return this.mCanvas_Gaming_Internal
	}
	private mCavnas_PlayerCount_Internal: mw.Canvas
	public get mCavnas_PlayerCount(): mw.Canvas {
		if(!this.mCavnas_PlayerCount_Internal&&this.uiWidgetBase) {
			this.mCavnas_PlayerCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCavnas_PlayerCount') as mw.Canvas
		}
		return this.mCavnas_PlayerCount_Internal
	}
	private mText_PlayerCount_Internal: mw.TextBlock
	public get mText_PlayerCount(): mw.TextBlock {
		if(!this.mText_PlayerCount_Internal&&this.uiWidgetBase) {
			this.mText_PlayerCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCavnas_PlayerCount/mText_PlayerCount') as mw.TextBlock
		}
		return this.mText_PlayerCount_Internal
	}
	private mCavnas_FinalRound_Internal: mw.Canvas
	public get mCavnas_FinalRound(): mw.Canvas {
		if(!this.mCavnas_FinalRound_Internal&&this.uiWidgetBase) {
			this.mCavnas_FinalRound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCavnas_FinalRound') as mw.Canvas
		}
		return this.mCavnas_FinalRound_Internal
	}
	private mText_FinalRound_Internal: mw.TextBlock
	public get mText_FinalRound(): mw.TextBlock {
		if(!this.mText_FinalRound_Internal&&this.uiWidgetBase) {
			this.mText_FinalRound_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCavnas_FinalRound/mText_FinalRound') as mw.TextBlock
		}
		return this.mText_FinalRound_Internal
	}
	private mCanvas_Time_Internal: mw.Canvas
	public get mCanvas_Time(): mw.Canvas {
		if(!this.mCanvas_Time_Internal&&this.uiWidgetBase) {
			this.mCanvas_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Time') as mw.Canvas
		}
		return this.mCanvas_Time_Internal
	}
	private mText_Time_Internal: mw.TextBlock
	public get mText_Time(): mw.TextBlock {
		if(!this.mText_Time_Internal&&this.uiWidgetBase) {
			this.mText_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Time/mText_Time') as mw.TextBlock
		}
		return this.mText_Time_Internal
	}
	private mImg_Bg_Time_Internal: mw.Image
	public get mImg_Bg_Time(): mw.Image {
		if(!this.mImg_Bg_Time_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Time_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Time/mImg_Bg_Time') as mw.Image
		}
		return this.mImg_Bg_Time_Internal
	}
	private mCanvas_Pass_Internal: mw.Canvas
	public get mCanvas_Pass(): mw.Canvas {
		if(!this.mCanvas_Pass_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pass_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Pass') as mw.Canvas
		}
		return this.mCanvas_Pass_Internal
	}
	private mText_Pass_Internal: mw.TextBlock
	public get mText_Pass(): mw.TextBlock {
		if(!this.mText_Pass_Internal&&this.uiWidgetBase) {
			this.mText_Pass_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Pass/mText_Pass') as mw.TextBlock
		}
		return this.mText_Pass_Internal
	}
	private mImg_Bg_Pass_Internal: mw.Image
	public get mImg_Bg_Pass(): mw.Image {
		if(!this.mImg_Bg_Pass_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Pass_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Pass/mImg_Bg_Pass') as mw.Image
		}
		return this.mImg_Bg_Pass_Internal
	}
	private mCanvas_Counts_Internal: mw.Canvas
	public get mCanvas_Counts(): mw.Canvas {
		if(!this.mCanvas_Counts_Internal&&this.uiWidgetBase) {
			this.mCanvas_Counts_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Counts') as mw.Canvas
		}
		return this.mCanvas_Counts_Internal
	}
	private mText_Counts_Internal: mw.TextBlock
	public get mText_Counts(): mw.TextBlock {
		if(!this.mText_Counts_Internal&&this.uiWidgetBase) {
			this.mText_Counts_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Counts/mText_Counts') as mw.TextBlock
		}
		return this.mText_Counts_Internal
	}
	private mText_Start_Internal: mw.TextBlock
	public get mText_Start(): mw.TextBlock {
		if(!this.mText_Start_Internal&&this.uiWidgetBase) {
			this.mText_Start_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gaming/mCanvas_Counts/mText_Start') as mw.TextBlock
		}
		return this.mText_Start_Internal
	}
	private mCanvas_Watch_Enter_Internal: mw.Canvas
	public get mCanvas_Watch_Enter(): mw.Canvas {
		if(!this.mCanvas_Watch_Enter_Internal&&this.uiWidgetBase) {
			this.mCanvas_Watch_Enter_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch_Enter') as mw.Canvas
		}
		return this.mCanvas_Watch_Enter_Internal
	}
	private mBtn_Enter_Watch_Internal: mw.Button
	public get mBtn_Enter_Watch(): mw.Button {
		if(!this.mBtn_Enter_Watch_Internal&&this.uiWidgetBase) {
			this.mBtn_Enter_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch_Enter/mBtn_Enter_Watch') as mw.Button
		}
		return this.mBtn_Enter_Watch_Internal
	}
	private mText_Enter_Watch_Internal: mw.TextBlock
	public get mText_Enter_Watch(): mw.TextBlock {
		if(!this.mText_Enter_Watch_Internal&&this.uiWidgetBase) {
			this.mText_Enter_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch_Enter/mText_Enter_Watch') as mw.TextBlock
		}
		return this.mText_Enter_Watch_Internal
	}
	private mCanvas_Calculate_Internal: mw.Canvas
	public get mCanvas_Calculate(): mw.Canvas {
		if(!this.mCanvas_Calculate_Internal&&this.uiWidgetBase) {
			this.mCanvas_Calculate_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Calculate') as mw.Canvas
		}
		return this.mCanvas_Calculate_Internal
	}
	private mCanvas_Num_Internal: mw.Canvas
	public get mCanvas_Num(): mw.Canvas {
		if(!this.mCanvas_Num_Internal&&this.uiWidgetBase) {
			this.mCanvas_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Calculate/mCanvas_Num') as mw.Canvas
		}
		return this.mCanvas_Num_Internal
	}
	private mImg_Bg_Num_Internal: mw.Image
	public get mImg_Bg_Num(): mw.Image {
		if(!this.mImg_Bg_Num_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Calculate/mCanvas_Num/mImg_Bg_Num') as mw.Image
		}
		return this.mImg_Bg_Num_Internal
	}
	private mText_Num_Internal: mw.TextBlock
	public get mText_Num(): mw.TextBlock {
		if(!this.mText_Num_Internal&&this.uiWidgetBase) {
			this.mText_Num_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Calculate/mCanvas_Num/mText_Num') as mw.TextBlock
		}
		return this.mText_Num_Internal
	}
	private mCanvas_Transition_Internal: mw.Canvas
	public get mCanvas_Transition(): mw.Canvas {
		if(!this.mCanvas_Transition_Internal&&this.uiWidgetBase) {
			this.mCanvas_Transition_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Transition') as mw.Canvas
		}
		return this.mCanvas_Transition_Internal
	}
	private mBtn_Transition_Internal: mw.MaskButton
	public get mBtn_Transition(): mw.MaskButton {
		if(!this.mBtn_Transition_Internal&&this.uiWidgetBase) {
			this.mBtn_Transition_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Transition/mBtn_Transition') as mw.MaskButton
		}
		return this.mBtn_Transition_Internal
	}
	private mCanvas_Out_Internal: mw.Canvas
	public get mCanvas_Out(): mw.Canvas {
		if(!this.mCanvas_Out_Internal&&this.uiWidgetBase) {
			this.mCanvas_Out_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Out') as mw.Canvas
		}
		return this.mCanvas_Out_Internal
	}
	private mImg_Bg_Out_Internal: mw.Image
	public get mImg_Bg_Out(): mw.Image {
		if(!this.mImg_Bg_Out_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_Out_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Out/mImg_Bg_Out') as mw.Image
		}
		return this.mImg_Bg_Out_Internal
	}
	private mText_Out_Internal: mw.TextBlock
	public get mText_Out(): mw.TextBlock {
		if(!this.mText_Out_Internal&&this.uiWidgetBase) {
			this.mText_Out_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Out/mText_Out') as mw.TextBlock
		}
		return this.mText_Out_Internal
	}
	private mCanvas_Watch_Internal: mw.Canvas
	public get mCanvas_Watch(): mw.Canvas {
		if(!this.mCanvas_Watch_Internal&&this.uiWidgetBase) {
			this.mCanvas_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch') as mw.Canvas
		}
		return this.mCanvas_Watch_Internal
	}
	private mCanvas_Watch_Exit_Internal: mw.Canvas
	public get mCanvas_Watch_Exit(): mw.Canvas {
		if(!this.mCanvas_Watch_Exit_Internal&&this.uiWidgetBase) {
			this.mCanvas_Watch_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Watch_Exit') as mw.Canvas
		}
		return this.mCanvas_Watch_Exit_Internal
	}
	private mBtn_Exit_Watch_Internal: mw.Button
	public get mBtn_Exit_Watch(): mw.Button {
		if(!this.mBtn_Exit_Watch_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Watch_Exit/mBtn_Exit_Watch') as mw.Button
		}
		return this.mBtn_Exit_Watch_Internal
	}
	private mText_Exit_Watch_Internal: mw.TextBlock
	public get mText_Exit_Watch(): mw.TextBlock {
		if(!this.mText_Exit_Watch_Internal&&this.uiWidgetBase) {
			this.mText_Exit_Watch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Watch_Exit/mText_Exit_Watch') as mw.TextBlock
		}
		return this.mText_Exit_Watch_Internal
	}
	private mCavnas_Watch_Players_Internal: mw.Canvas
	public get mCavnas_Watch_Players(): mw.Canvas {
		if(!this.mCavnas_Watch_Players_Internal&&this.uiWidgetBase) {
			this.mCavnas_Watch_Players_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players') as mw.Canvas
		}
		return this.mCavnas_Watch_Players_Internal
	}
	private mBtn_Previous_Internal: mw.Button
	public get mBtn_Previous(): mw.Button {
		if(!this.mBtn_Previous_Internal&&this.uiWidgetBase) {
			this.mBtn_Previous_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mBtn_Previous') as mw.Button
		}
		return this.mBtn_Previous_Internal
	}
	private mBtn_Next_Internal: mw.Button
	public get mBtn_Next(): mw.Button {
		if(!this.mBtn_Next_Internal&&this.uiWidgetBase) {
			this.mBtn_Next_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mBtn_Next') as mw.Button
		}
		return this.mBtn_Next_Internal
	}
	private mText_PlayerName_Internal: mw.TextBlock
	public get mText_PlayerName(): mw.TextBlock {
		if(!this.mText_PlayerName_Internal&&this.uiWidgetBase) {
			this.mText_PlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mText_PlayerName') as mw.TextBlock
		}
		return this.mText_PlayerName_Internal
	}
	private mCanvas_Like_Internal: mw.Canvas
	public get mCanvas_Like(): mw.Canvas {
		if(!this.mCanvas_Like_Internal&&this.uiWidgetBase) {
			this.mCanvas_Like_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mCanvas_Like') as mw.Canvas
		}
		return this.mCanvas_Like_Internal
	}
	private mBtn_Like_Internal: mw.Button
	public get mBtn_Like(): mw.Button {
		if(!this.mBtn_Like_Internal&&this.uiWidgetBase) {
			this.mBtn_Like_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mCanvas_Like/mBtn_Like') as mw.Button
		}
		return this.mBtn_Like_Internal
	}
	private mText_Like_Internal: mw.TextBlock
	public get mText_Like(): mw.TextBlock {
		if(!this.mText_Like_Internal&&this.uiWidgetBase) {
			this.mText_Like_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCavnas_Watch_Players/mCanvas_Like/mText_Like') as mw.TextBlock
		}
		return this.mText_Like_Internal
	}
	private mCanvas_First_Internal: mw.Canvas
	public get mCanvas_First(): mw.Canvas {
		if(!this.mCanvas_First_Internal&&this.uiWidgetBase) {
			this.mCanvas_First_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_First') as mw.Canvas
		}
		return this.mCanvas_First_Internal
	}
	private mImage_Rank1_Internal: mw.Image
	public get mImage_Rank1(): mw.Image {
		if(!this.mImage_Rank1_Internal&&this.uiWidgetBase) {
			this.mImage_Rank1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_First/mImage_Rank1') as mw.Image
		}
		return this.mImage_Rank1_Internal
	}
	private mText_Frist_Internal: mw.TextBlock
	public get mText_Frist(): mw.TextBlock {
		if(!this.mText_Frist_Internal&&this.uiWidgetBase) {
			this.mText_Frist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_First/mText_Frist') as mw.TextBlock
		}
		return this.mText_Frist_Internal
	}
	private mText_Name1_Internal: mw.TextBlock
	public get mText_Name1(): mw.TextBlock {
		if(!this.mText_Name1_Internal&&this.uiWidgetBase) {
			this.mText_Name1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_First/mText_Name1') as mw.TextBlock
		}
		return this.mText_Name1_Internal
	}
	private mCanvas_Second_Internal: mw.Canvas
	public get mCanvas_Second(): mw.Canvas {
		if(!this.mCanvas_Second_Internal&&this.uiWidgetBase) {
			this.mCanvas_Second_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Second') as mw.Canvas
		}
		return this.mCanvas_Second_Internal
	}
	private mImage_Rank2_Internal: mw.Image
	public get mImage_Rank2(): mw.Image {
		if(!this.mImage_Rank2_Internal&&this.uiWidgetBase) {
			this.mImage_Rank2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Second/mImage_Rank2') as mw.Image
		}
		return this.mImage_Rank2_Internal
	}
	private mText_Second_Internal: mw.TextBlock
	public get mText_Second(): mw.TextBlock {
		if(!this.mText_Second_Internal&&this.uiWidgetBase) {
			this.mText_Second_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Second/mText_Second') as mw.TextBlock
		}
		return this.mText_Second_Internal
	}
	private mText_Name2_Internal: mw.TextBlock
	public get mText_Name2(): mw.TextBlock {
		if(!this.mText_Name2_Internal&&this.uiWidgetBase) {
			this.mText_Name2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Second/mText_Name2') as mw.TextBlock
		}
		return this.mText_Name2_Internal
	}
	private mCanvas_Third_Internal: mw.Canvas
	public get mCanvas_Third(): mw.Canvas {
		if(!this.mCanvas_Third_Internal&&this.uiWidgetBase) {
			this.mCanvas_Third_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Third') as mw.Canvas
		}
		return this.mCanvas_Third_Internal
	}
	private mImage_Rank3_Internal: mw.Image
	public get mImage_Rank3(): mw.Image {
		if(!this.mImage_Rank3_Internal&&this.uiWidgetBase) {
			this.mImage_Rank3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Third/mImage_Rank3') as mw.Image
		}
		return this.mImage_Rank3_Internal
	}
	private mText_Third_Internal: mw.TextBlock
	public get mText_Third(): mw.TextBlock {
		if(!this.mText_Third_Internal&&this.uiWidgetBase) {
			this.mText_Third_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Third/mText_Third') as mw.TextBlock
		}
		return this.mText_Third_Internal
	}
	private mText_Name3_Internal: mw.TextBlock
	public get mText_Name3(): mw.TextBlock {
		if(!this.mText_Name3_Internal&&this.uiWidgetBase) {
			this.mText_Name3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Watch/mCanvas_Third/mText_Name3') as mw.TextBlock
		}
		return this.mText_Name3_Internal
	}
	private mCanvas_RoundOver_Internal: mw.Canvas
	public get mCanvas_RoundOver(): mw.Canvas {
		if(!this.mCanvas_RoundOver_Internal&&this.uiWidgetBase) {
			this.mCanvas_RoundOver_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_RoundOver') as mw.Canvas
		}
		return this.mCanvas_RoundOver_Internal
	}
	private mImg_Bg_RoundOver_Internal: mw.Image
	public get mImg_Bg_RoundOver(): mw.Image {
		if(!this.mImg_Bg_RoundOver_Internal&&this.uiWidgetBase) {
			this.mImg_Bg_RoundOver_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_RoundOver/mImg_Bg_RoundOver') as mw.Image
		}
		return this.mImg_Bg_RoundOver_Internal
	}
	private mText_RoundOver_Internal: mw.TextBlock
	public get mText_RoundOver(): mw.TextBlock {
		if(!this.mText_RoundOver_Internal&&this.uiWidgetBase) {
			this.mText_RoundOver_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_RoundOver/mText_RoundOver') as mw.TextBlock
		}
		return this.mText_RoundOver_Internal
	}
	private mCanvas_Quit_Internal: mw.Canvas
	public get mCanvas_Quit(): mw.Canvas {
		if(!this.mCanvas_Quit_Internal&&this.uiWidgetBase) {
			this.mCanvas_Quit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit') as mw.Canvas
		}
		return this.mCanvas_Quit_Internal
	}
	private mImg_Quit_Bg_Internal: mw.Image
	public get mImg_Quit_Bg(): mw.Image {
		if(!this.mImg_Quit_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Quit_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mImg_Quit_Bg') as mw.Image
		}
		return this.mImg_Quit_Bg_Internal
	}
	private mBtn_Quit_Internal: mw.Button
	public get mBtn_Quit(): mw.Button {
		if(!this.mBtn_Quit_Internal&&this.uiWidgetBase) {
			this.mBtn_Quit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mBtn_Quit') as mw.Button
		}
		return this.mBtn_Quit_Internal
	}
	private mCanvas_Exit_Internal: mw.Canvas
	public get mCanvas_Exit(): mw.Canvas {
		if(!this.mCanvas_Exit_Internal&&this.uiWidgetBase) {
			this.mCanvas_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mCanvas_Exit') as mw.Canvas
		}
		return this.mCanvas_Exit_Internal
	}
	private mImg_Exit_Bg_Internal: mw.Image
	public get mImg_Exit_Bg(): mw.Image {
		if(!this.mImg_Exit_Bg_Internal&&this.uiWidgetBase) {
			this.mImg_Exit_Bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mCanvas_Exit/mImg_Exit_Bg') as mw.Image
		}
		return this.mImg_Exit_Bg_Internal
	}
	private mBtn_Exit_Cancel_Internal: mw.StaleButton
	public get mBtn_Exit_Cancel(): mw.StaleButton {
		if(!this.mBtn_Exit_Cancel_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mCanvas_Exit/mBtn_Exit_Cancel') as mw.StaleButton
		}
		return this.mBtn_Exit_Cancel_Internal
	}
	private mBtn_Exit_Confirm_Internal: mw.StaleButton
	public get mBtn_Exit_Confirm(): mw.StaleButton {
		if(!this.mBtn_Exit_Confirm_Internal&&this.uiWidgetBase) {
			this.mBtn_Exit_Confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mCanvas_Exit/mBtn_Exit_Confirm') as mw.StaleButton
		}
		return this.mBtn_Exit_Confirm_Internal
	}
	private mText_Exit_Internal: mw.TextBlock
	public get mText_Exit(): mw.TextBlock {
		if(!this.mText_Exit_Internal&&this.uiWidgetBase) {
			this.mText_Exit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Quit/mCanvas_Exit/mText_Exit') as mw.TextBlock
		}
		return this.mText_Exit_Internal
	}


 
	/**
	* onStart 之前触发一次
	*/
	protected onAwake() {
	}
	 
}
 