
 

 @UIBind('UI/ShareUI/ghostmenu/ShotResult_UI.ui')
 export default class ShotResult_UI_Generate extends UIScript {
	 	private mText_Rank_Internal: mw.TextBlock
	public get mText_Rank(): mw.TextBlock {
		if(!this.mText_Rank_Internal&&this.uiWidgetBase) {
			this.mText_Rank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mText_Rank') as mw.TextBlock
		}
		return this.mText_Rank_Internal
	}
	private mCanvas_PieceGet_Internal: mw.Canvas
	public get mCanvas_PieceGet(): mw.Canvas {
		if(!this.mCanvas_PieceGet_Internal&&this.uiWidgetBase) {
			this.mCanvas_PieceGet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet') as mw.Canvas
		}
		return this.mCanvas_PieceGet_Internal
	}
	private mCanvas_Pieces_Internal: mw.Canvas
	public get mCanvas_Pieces(): mw.Canvas {
		if(!this.mCanvas_Pieces_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pieces_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces') as mw.Canvas
		}
		return this.mCanvas_Pieces_Internal
	}
	private mImage_piece1_Internal: mw.Image
	public get mImage_piece1(): mw.Image {
		if(!this.mImage_piece1_Internal&&this.uiWidgetBase) {
			this.mImage_piece1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/mImage_piece1') as mw.Image
		}
		return this.mImage_piece1_Internal
	}
	private mImage_piece2_Internal: mw.Image
	public get mImage_piece2(): mw.Image {
		if(!this.mImage_piece2_Internal&&this.uiWidgetBase) {
			this.mImage_piece2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/mImage_piece2') as mw.Image
		}
		return this.mImage_piece2_Internal
	}
	private mImage_piece3_Internal: mw.Image
	public get mImage_piece3(): mw.Image {
		if(!this.mImage_piece3_Internal&&this.uiWidgetBase) {
			this.mImage_piece3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/mImage_piece3') as mw.Image
		}
		return this.mImage_piece3_Internal
	}
	private mImage_piece4_Internal: mw.Image
	public get mImage_piece4(): mw.Image {
		if(!this.mImage_piece4_Internal&&this.uiWidgetBase) {
			this.mImage_piece4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/mImage_piece4') as mw.Image
		}
		return this.mImage_piece4_Internal
	}
	private mImage_piece5_Internal: mw.Image
	public get mImage_piece5(): mw.Image {
		if(!this.mImage_piece5_Internal&&this.uiWidgetBase) {
			this.mImage_piece5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/mImage_piece5') as mw.Image
		}
		return this.mImage_piece5_Internal
	}
	private nameTxt_Internal: mw.TextBlock
	public get nameTxt(): mw.TextBlock {
		if(!this.nameTxt_Internal&&this.uiWidgetBase) {
			this.nameTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_PieceGet/mCanvas_Pieces/nameTxt') as mw.TextBlock
		}
		return this.nameTxt_Internal
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
		
		this.initLanguage(this.mText_Rank)
		this.mText_Rank.isRichText = true;
		
	
		this.initLanguage(this.nameTxt)
		this.nameTxt.isRichText = true;
		
	

		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_PieceGet/BG3") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_ShotResult_UI'] = ShotResult_UI_Generate;