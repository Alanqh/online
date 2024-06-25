
 

 @UIBind('UI/ShareUI/ghostmenu/GhostMenu_UI.ui')
 export default class GhostMenu_UI_Generate extends UIScript {
	 	private mCanvas_GhostMenuTop_Internal: mw.Canvas
	public get mCanvas_GhostMenuTop(): mw.Canvas {
		if(!this.mCanvas_GhostMenuTop_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostMenuTop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuTop') as mw.Canvas
		}
		return this.mCanvas_GhostMenuTop_Internal
	}
	private mText_RizzNum_Internal: mw.TextBlock
	public get mText_RizzNum(): mw.TextBlock {
		if(!this.mText_RizzNum_Internal&&this.uiWidgetBase) {
			this.mText_RizzNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuTop/mText_RizzNum') as mw.TextBlock
		}
		return this.mText_RizzNum_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuTop/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private mCanvas_GhostMenuDetail_Internal: mw.Canvas
	public get mCanvas_GhostMenuDetail(): mw.Canvas {
		if(!this.mCanvas_GhostMenuDetail_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostMenuDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuDetail') as mw.Canvas
		}
		return this.mCanvas_GhostMenuDetail_Internal
	}
	private mText_GhostName_Internal: mw.TextBlock
	public get mText_GhostName(): mw.TextBlock {
		if(!this.mText_GhostName_Internal&&this.uiWidgetBase) {
			this.mText_GhostName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuDetail/mText_GhostName') as mw.TextBlock
		}
		return this.mText_GhostName_Internal
	}
	private mText_GhostDesc_Internal: mw.TextBlock
	public get mText_GhostDesc(): mw.TextBlock {
		if(!this.mText_GhostDesc_Internal&&this.uiWidgetBase) {
			this.mText_GhostDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuDetail/mText_GhostDesc') as mw.TextBlock
		}
		return this.mText_GhostDesc_Internal
	}
	private mText_GhostMess_Internal: mw.TextBlock
	public get mText_GhostMess(): mw.TextBlock {
		if(!this.mText_GhostMess_Internal&&this.uiWidgetBase) {
			this.mText_GhostMess_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuDetail/mText_GhostMess') as mw.TextBlock
		}
		return this.mText_GhostMess_Internal
	}
	private mCanvas_Reward_Internal: mw.Canvas
	public get mCanvas_Reward(): mw.Canvas {
		if(!this.mCanvas_Reward_Internal&&this.uiWidgetBase) {
			this.mCanvas_Reward_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward') as mw.Canvas
		}
		return this.mCanvas_Reward_Internal
	}
	private mText_RewardTitle_Internal: mw.TextBlock
	public get mText_RewardTitle(): mw.TextBlock {
		if(!this.mText_RewardTitle_Internal&&this.uiWidgetBase) {
			this.mText_RewardTitle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mText_RewardTitle') as mw.TextBlock
		}
		return this.mText_RewardTitle_Internal
	}
	private mCanvas_RewardItem_Internal: mw.Canvas
	public get mCanvas_RewardItem(): mw.Canvas {
		if(!this.mCanvas_RewardItem_Internal&&this.uiWidgetBase) {
			this.mCanvas_RewardItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem') as mw.Canvas
		}
		return this.mCanvas_RewardItem_Internal
	}
	private mCanvas_Rizz_Internal: mw.Canvas
	public get mCanvas_Rizz(): mw.Canvas {
		if(!this.mCanvas_Rizz_Internal&&this.uiWidgetBase) {
			this.mCanvas_Rizz_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz') as mw.Canvas
		}
		return this.mCanvas_Rizz_Internal
	}
	private mBG_Internal: mw.Image
	public get mBG(): mw.Image {
		if(!this.mBG_Internal&&this.uiWidgetBase) {
			this.mBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mBG') as mw.Image
		}
		return this.mBG_Internal
	}
	private mButton_Fearcoin_Internal: mw.Button
	public get mButton_Fearcoin(): mw.Button {
		if(!this.mButton_Fearcoin_Internal&&this.uiWidgetBase) {
			this.mButton_Fearcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mButton_Fearcoin') as mw.Button
		}
		return this.mButton_Fearcoin_Internal
	}
	private mText_Rizz_Internal: mw.TextBlock
	public get mText_Rizz(): mw.TextBlock {
		if(!this.mText_Rizz_Internal&&this.uiWidgetBase) {
			this.mText_Rizz_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mText_Rizz') as mw.TextBlock
		}
		return this.mText_Rizz_Internal
	}
	private img_redpoint_Internal: mw.Image
	public get img_redpoint(): mw.Image {
		if(!this.img_redpoint_Internal&&this.uiWidgetBase) {
			this.img_redpoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/img_redpoint') as mw.Image
		}
		return this.img_redpoint_Internal
	}
	private mImage_check_Internal: mw.Image
	public get mImage_check(): mw.Image {
		if(!this.mImage_check_Internal&&this.uiWidgetBase) {
			this.mImage_check_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mImage_check') as mw.Image
		}
		return this.mImage_check_Internal
	}
	private mImage_LockedBG_Internal: mw.Image
	public get mImage_LockedBG(): mw.Image {
		if(!this.mImage_LockedBG_Internal&&this.uiWidgetBase) {
			this.mImage_LockedBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mImage_LockedBG') as mw.Image
		}
		return this.mImage_LockedBG_Internal
	}
	private mImage_Locked_Internal: mw.Image
	public get mImage_Locked(): mw.Image {
		if(!this.mImage_Locked_Internal&&this.uiWidgetBase) {
			this.mImage_Locked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mImage_Locked') as mw.Image
		}
		return this.mImage_Locked_Internal
	}
	private mTextBlock_PriceL1_Internal: mw.TextBlock
	public get mTextBlock_PriceL1(): mw.TextBlock {
		if(!this.mTextBlock_PriceL1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_PriceL1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Rizz/mTextBlock_PriceL1') as mw.TextBlock
		}
		return this.mTextBlock_PriceL1_Internal
	}
	private mCanvas_Coin_Internal: mw.Canvas
	public get mCanvas_Coin(): mw.Canvas {
		if(!this.mCanvas_Coin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin') as mw.Canvas
		}
		return this.mCanvas_Coin_Internal
	}
	private mBG_1_Internal: mw.Image
	public get mBG_1(): mw.Image {
		if(!this.mBG_1_Internal&&this.uiWidgetBase) {
			this.mBG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mBG_1') as mw.Image
		}
		return this.mBG_1_Internal
	}
	private mButton_Fearcoin_1_Internal: mw.Button
	public get mButton_Fearcoin_1(): mw.Button {
		if(!this.mButton_Fearcoin_1_Internal&&this.uiWidgetBase) {
			this.mButton_Fearcoin_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mButton_Fearcoin_1') as mw.Button
		}
		return this.mButton_Fearcoin_1_Internal
	}
	private mText_Fearcoin_Internal: mw.TextBlock
	public get mText_Fearcoin(): mw.TextBlock {
		if(!this.mText_Fearcoin_Internal&&this.uiWidgetBase) {
			this.mText_Fearcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mText_Fearcoin') as mw.TextBlock
		}
		return this.mText_Fearcoin_Internal
	}
	private img_redpoint2_Internal: mw.Image
	public get img_redpoint2(): mw.Image {
		if(!this.img_redpoint2_Internal&&this.uiWidgetBase) {
			this.img_redpoint2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/img_redpoint2') as mw.Image
		}
		return this.img_redpoint2_Internal
	}
	private mImage_check2_Internal: mw.Image
	public get mImage_check2(): mw.Image {
		if(!this.mImage_check2_Internal&&this.uiWidgetBase) {
			this.mImage_check2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mImage_check2') as mw.Image
		}
		return this.mImage_check2_Internal
	}
	private mImage_LockedBG2_Internal: mw.Image
	public get mImage_LockedBG2(): mw.Image {
		if(!this.mImage_LockedBG2_Internal&&this.uiWidgetBase) {
			this.mImage_LockedBG2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mImage_LockedBG2') as mw.Image
		}
		return this.mImage_LockedBG2_Internal
	}
	private mImage_Locked2_Internal: mw.Image
	public get mImage_Locked2(): mw.Image {
		if(!this.mImage_Locked2_Internal&&this.uiWidgetBase) {
			this.mImage_Locked2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mImage_Locked2') as mw.Image
		}
		return this.mImage_Locked2_Internal
	}
	private mTextBlock_PriceL2_Internal: mw.TextBlock
	public get mTextBlock_PriceL2(): mw.TextBlock {
		if(!this.mTextBlock_PriceL2_Internal&&this.uiWidgetBase) {
			this.mTextBlock_PriceL2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Reward/mCanvas_RewardItem/mCanvas_Coin/mTextBlock_PriceL2') as mw.TextBlock
		}
		return this.mTextBlock_PriceL2_Internal
	}
	private mCanvas_GhostMenuPieces_Internal: mw.Canvas
	public get mCanvas_GhostMenuPieces(): mw.Canvas {
		if(!this.mCanvas_GhostMenuPieces_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostMenuPieces_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces') as mw.Canvas
		}
		return this.mCanvas_GhostMenuPieces_Internal
	}
	private mCanvas_Piece1_Internal: mw.Canvas
	public get mCanvas_Piece1(): mw.Canvas {
		if(!this.mCanvas_Piece1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Piece1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece1') as mw.Canvas
		}
		return this.mCanvas_Piece1_Internal
	}
	private mImage_Piece1_Internal: mw.Image
	public get mImage_Piece1(): mw.Image {
		if(!this.mImage_Piece1_Internal&&this.uiWidgetBase) {
			this.mImage_Piece1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece1/mImage_Piece1') as mw.Image
		}
		return this.mImage_Piece1_Internal
	}
	private mMaskButton_Piece1_Internal: mw.MaskButton
	public get mMaskButton_Piece1(): mw.MaskButton {
		if(!this.mMaskButton_Piece1_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Piece1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece1/mMaskButton_Piece1') as mw.MaskButton
		}
		return this.mMaskButton_Piece1_Internal
	}
	private mCanvas_Lock1_Internal: mw.Canvas
	public get mCanvas_Lock1(): mw.Canvas {
		if(!this.mCanvas_Lock1_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece1/mCanvas_Lock1') as mw.Canvas
		}
		return this.mCanvas_Lock1_Internal
	}
	private mText_Piece1_Internal: mw.TextBlock
	public get mText_Piece1(): mw.TextBlock {
		if(!this.mText_Piece1_Internal&&this.uiWidgetBase) {
			this.mText_Piece1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece1/mCanvas_Lock1/mText_Piece1') as mw.TextBlock
		}
		return this.mText_Piece1_Internal
	}
	private mCanvas_Piece2_Internal: mw.Canvas
	public get mCanvas_Piece2(): mw.Canvas {
		if(!this.mCanvas_Piece2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Piece2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece2') as mw.Canvas
		}
		return this.mCanvas_Piece2_Internal
	}
	private mImage_Piece2_Internal: mw.Image
	public get mImage_Piece2(): mw.Image {
		if(!this.mImage_Piece2_Internal&&this.uiWidgetBase) {
			this.mImage_Piece2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece2/mImage_Piece2') as mw.Image
		}
		return this.mImage_Piece2_Internal
	}
	private mMaskButton_Piece2_Internal: mw.MaskButton
	public get mMaskButton_Piece2(): mw.MaskButton {
		if(!this.mMaskButton_Piece2_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Piece2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece2/mMaskButton_Piece2') as mw.MaskButton
		}
		return this.mMaskButton_Piece2_Internal
	}
	private mCanvas_Lock2_Internal: mw.Canvas
	public get mCanvas_Lock2(): mw.Canvas {
		if(!this.mCanvas_Lock2_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece2/mCanvas_Lock2') as mw.Canvas
		}
		return this.mCanvas_Lock2_Internal
	}
	private mText_Piece2_Internal: mw.TextBlock
	public get mText_Piece2(): mw.TextBlock {
		if(!this.mText_Piece2_Internal&&this.uiWidgetBase) {
			this.mText_Piece2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece2/mCanvas_Lock2/mText_Piece2') as mw.TextBlock
		}
		return this.mText_Piece2_Internal
	}
	private mCanvas_Piece3_Internal: mw.Canvas
	public get mCanvas_Piece3(): mw.Canvas {
		if(!this.mCanvas_Piece3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Piece3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece3') as mw.Canvas
		}
		return this.mCanvas_Piece3_Internal
	}
	private mImage_Piece3_Internal: mw.Image
	public get mImage_Piece3(): mw.Image {
		if(!this.mImage_Piece3_Internal&&this.uiWidgetBase) {
			this.mImage_Piece3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece3/mImage_Piece3') as mw.Image
		}
		return this.mImage_Piece3_Internal
	}
	private mMaskButton_Piece3_Internal: mw.MaskButton
	public get mMaskButton_Piece3(): mw.MaskButton {
		if(!this.mMaskButton_Piece3_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Piece3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece3/mMaskButton_Piece3') as mw.MaskButton
		}
		return this.mMaskButton_Piece3_Internal
	}
	private mCanvas_Lock3_Internal: mw.Canvas
	public get mCanvas_Lock3(): mw.Canvas {
		if(!this.mCanvas_Lock3_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece3/mCanvas_Lock3') as mw.Canvas
		}
		return this.mCanvas_Lock3_Internal
	}
	private mText_Piece3_Internal: mw.TextBlock
	public get mText_Piece3(): mw.TextBlock {
		if(!this.mText_Piece3_Internal&&this.uiWidgetBase) {
			this.mText_Piece3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece3/mCanvas_Lock3/mText_Piece3') as mw.TextBlock
		}
		return this.mText_Piece3_Internal
	}
	private mCanvas_Piece4_Internal: mw.Canvas
	public get mCanvas_Piece4(): mw.Canvas {
		if(!this.mCanvas_Piece4_Internal&&this.uiWidgetBase) {
			this.mCanvas_Piece4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece4') as mw.Canvas
		}
		return this.mCanvas_Piece4_Internal
	}
	private mImage_Piece4_Internal: mw.Image
	public get mImage_Piece4(): mw.Image {
		if(!this.mImage_Piece4_Internal&&this.uiWidgetBase) {
			this.mImage_Piece4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece4/mImage_Piece4') as mw.Image
		}
		return this.mImage_Piece4_Internal
	}
	private mMaskButton_Piece4_Internal: mw.MaskButton
	public get mMaskButton_Piece4(): mw.MaskButton {
		if(!this.mMaskButton_Piece4_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Piece4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece4/mMaskButton_Piece4') as mw.MaskButton
		}
		return this.mMaskButton_Piece4_Internal
	}
	private mCanvas_Lock4_Internal: mw.Canvas
	public get mCanvas_Lock4(): mw.Canvas {
		if(!this.mCanvas_Lock4_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece4/mCanvas_Lock4') as mw.Canvas
		}
		return this.mCanvas_Lock4_Internal
	}
	private mText_Piece4_Internal: mw.TextBlock
	public get mText_Piece4(): mw.TextBlock {
		if(!this.mText_Piece4_Internal&&this.uiWidgetBase) {
			this.mText_Piece4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece4/mCanvas_Lock4/mText_Piece4') as mw.TextBlock
		}
		return this.mText_Piece4_Internal
	}
	private mCanvas_Piece5_Internal: mw.Canvas
	public get mCanvas_Piece5(): mw.Canvas {
		if(!this.mCanvas_Piece5_Internal&&this.uiWidgetBase) {
			this.mCanvas_Piece5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece5') as mw.Canvas
		}
		return this.mCanvas_Piece5_Internal
	}
	private mImage_Piece5_Internal: mw.Image
	public get mImage_Piece5(): mw.Image {
		if(!this.mImage_Piece5_Internal&&this.uiWidgetBase) {
			this.mImage_Piece5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece5/mImage_Piece5') as mw.Image
		}
		return this.mImage_Piece5_Internal
	}
	private mMaskButton_Piece5_Internal: mw.MaskButton
	public get mMaskButton_Piece5(): mw.MaskButton {
		if(!this.mMaskButton_Piece5_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Piece5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece5/mMaskButton_Piece5') as mw.MaskButton
		}
		return this.mMaskButton_Piece5_Internal
	}
	private mCanvas_Lock5_Internal: mw.Canvas
	public get mCanvas_Lock5(): mw.Canvas {
		if(!this.mCanvas_Lock5_Internal&&this.uiWidgetBase) {
			this.mCanvas_Lock5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece5/mCanvas_Lock5') as mw.Canvas
		}
		return this.mCanvas_Lock5_Internal
	}
	private mText_Piece5_Internal: mw.TextBlock
	public get mText_Piece5(): mw.TextBlock {
		if(!this.mText_Piece5_Internal&&this.uiWidgetBase) {
			this.mText_Piece5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuPieces/mCanvas_Piece5/mCanvas_Lock5/mText_Piece5') as mw.TextBlock
		}
		return this.mText_Piece5_Internal
	}
	private mCanvas_GhostMenuLevel_Internal: mw.Canvas
	public get mCanvas_GhostMenuLevel(): mw.Canvas {
		if(!this.mCanvas_GhostMenuLevel_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostMenuLevel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuLevel') as mw.Canvas
		}
		return this.mCanvas_GhostMenuLevel_Internal
	}
	private mImage_GhostGraph_Internal: mw.Image
	public get mImage_GhostGraph(): mw.Image {
		if(!this.mImage_GhostGraph_Internal&&this.uiWidgetBase) {
			this.mImage_GhostGraph_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuLevel/mImage_GhostGraph') as mw.Image
		}
		return this.mImage_GhostGraph_Internal
	}
	private achieveTxt_Internal: mw.TextBlock
	public get achieveTxt(): mw.TextBlock {
		if(!this.achieveTxt_Internal&&this.uiWidgetBase) {
			this.achieveTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuLevel/Canvas_2/achieveTxt') as mw.TextBlock
		}
		return this.achieveTxt_Internal
	}
	private mPB_ShotNum_Internal: mw.ProgressBar
	public get mPB_ShotNum(): mw.ProgressBar {
		if(!this.mPB_ShotNum_Internal&&this.uiWidgetBase) {
			this.mPB_ShotNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuLevel/Canvas_2/mPB_ShotNum') as mw.ProgressBar
		}
		return this.mPB_ShotNum_Internal
	}
	private mText_ShotNum_Internal: mw.TextBlock
	public get mText_ShotNum(): mw.TextBlock {
		if(!this.mText_ShotNum_Internal&&this.uiWidgetBase) {
			this.mText_ShotNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostMenuLevel/Canvas_2/mText_ShotNum') as mw.TextBlock
		}
		return this.mText_ShotNum_Internal
	}
	private mCanvas_GhostList_Internal: mw.Canvas
	public get mCanvas_GhostList(): mw.Canvas {
		if(!this.mCanvas_GhostList_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostList') as mw.Canvas
		}
		return this.mCanvas_GhostList_Internal
	}
	private mScrollBox_GhostList_Internal: mw.ScrollBox
	public get mScrollBox_GhostList(): mw.ScrollBox {
		if(!this.mScrollBox_GhostList_Internal&&this.uiWidgetBase) {
			this.mScrollBox_GhostList_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostList/mScrollBox_GhostList') as mw.ScrollBox
		}
		return this.mScrollBox_GhostList_Internal
	}
	private mCanvas_GhostListItems_Internal: mw.Canvas
	public get mCanvas_GhostListItems(): mw.Canvas {
		if(!this.mCanvas_GhostListItems_Internal&&this.uiWidgetBase) {
			this.mCanvas_GhostListItems_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_GhostList/mScrollBox_GhostList/mCanvas_GhostListItems') as mw.Canvas
		}
		return this.mCanvas_GhostListItems_Internal
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
			Event.dispatchToLocal("PlayButtonClick", "GhostMenu_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.mButton_Fearcoin.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostMenu_UI_mButton_Fearcoin");
		})
		this.mButton_Fearcoin.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mButton_Fearcoin.onPressed.add(() => {
			this.mButton_Fearcoin["preScale"] = this.mButton_Fearcoin.renderScale;
			this.mButton_Fearcoin.renderScale = Vector2.one.set(this.mButton_Fearcoin["preScale"]).multiply(1.1);
		})
		this.mButton_Fearcoin.onReleased.add(() => {
			this.mButton_Fearcoin.renderScale = this.mButton_Fearcoin["preScale"];
		})
		
	
		this.mButton_Fearcoin_1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "GhostMenu_UI_mButton_Fearcoin_1");
		})
		this.mButton_Fearcoin_1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mButton_Fearcoin_1.onPressed.add(() => {
			this.mButton_Fearcoin_1["preScale"] = this.mButton_Fearcoin_1.renderScale;
			this.mButton_Fearcoin_1.renderScale = Vector2.one.set(this.mButton_Fearcoin_1["preScale"]).multiply(1.1);
		})
		this.mButton_Fearcoin_1.onReleased.add(() => {
			this.mButton_Fearcoin_1.renderScale = this.mButton_Fearcoin_1["preScale"];
		})
		
	

		//按钮多语言
		

		//文本多语言
		
		this.initLanguage(this.mText_RizzNum)
		this.mText_RizzNum.isRichText = true;
		
	
		this.initLanguage(this.mText_GhostName)
		this.mText_GhostName.isRichText = true;
		
	
		this.initLanguage(this.mText_GhostDesc)
		this.mText_GhostDesc.isRichText = true;
		
	
		this.initLanguage(this.mText_GhostMess)
		this.mText_GhostMess.isRichText = true;
		
	
		this.initLanguage(this.mText_RewardTitle)
		this.mText_RewardTitle.isRichText = true;
		
	
		this.initLanguage(this.mText_Rizz)
		this.mText_Rizz.isRichText = true;
		
	
		this.initLanguage(this.mTextBlock_PriceL1)
		this.mTextBlock_PriceL1.isRichText = true;
		
	
		this.initLanguage(this.mText_Fearcoin)
		this.mText_Fearcoin.isRichText = true;
		
	
		this.initLanguage(this.mTextBlock_PriceL2)
		this.mTextBlock_PriceL2.isRichText = true;
		
	
		this.initLanguage(this.mText_Piece1)
		this.mText_Piece1.isRichText = true;
		
	
		this.initLanguage(this.mText_Piece2)
		this.mText_Piece2.isRichText = true;
		
	
		this.initLanguage(this.mText_Piece3)
		this.mText_Piece3.isRichText = true;
		
	
		this.initLanguage(this.mText_Piece4)
		this.mText_Piece4.isRichText = true;
		
	
		this.initLanguage(this.mText_Piece5)
		this.mText_Piece5.isRichText = true;
		
	
		this.initLanguage(this.achieveTxt)
		this.achieveTxt.isRichText = true;
		
	
		this.initLanguage(this.mText_ShotNum)
		this.mText_ShotNum.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_GhostMenuTop/Text_Title") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_GhostMenuLevel/Canvas_2/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_GhostMenu_UI'] = GhostMenu_UI_Generate;