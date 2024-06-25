
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/玩家系统/UI/PlayerInfo.ui
 * TIME: 2023.03.27-16.53.06
 */

 

 @UIBind('UI/Prefabs/玩家系统/UI/PlayerInfo.ui')
 export default class PlayerInfo_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/btnBag/bagName')
    public bagName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/btnBag')
    public btnBag: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/btnRecord/recordName')
    public recordName: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/btnRecord')
    public btnRecord: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/JumpImage/btnJump')
    public btnJump: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/JumpImage')
    public Jump: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/deathImg')
    public deathImg: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/labelLv')
    public labelLv: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/StageInfo/labelStage')
    public labelStage: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/StageInfo/progressStage')
    public progressStage: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/atlas/btnAtlas')
    public btnAtlas: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/atlas')
    public atlas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/RankCnavas/btnRank')
    public btnRank: mw.Button=undefined;
    @UIWidgetBind('RootCanvas/RankCnavas')
    public RankCnavas: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/progresssHp')
    public progresssHp: mw.ProgressBar=undefined;
    @UIWidgetBind('RootCanvas/hpText')
    public hpText: mw.TextBlock=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
		this.Jump.visibility = SlateVisibility.Collapsed

		this.progressStage.visibility = SlateVisibility.Collapsed
		this.labelLv.visibility = SlateVisibility.Collapsed

		this.RankCnavas.visibility = SlateVisibility.Collapsed
		this.atlas.visibility = SlateVisibility.Collapsed

		this.btnRecord.visibility = SlateVisibility.Collapsed
		this.btnBag.visibility = SlateVisibility.Collapsed
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.btnBag.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnBag");
		})
		this.btnBag.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnRecord.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnRecord");
		})
		this.btnRecord.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnJump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnJump");
		})
		this.btnJump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnAtlas.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnAtlas");
		})
		this.btnAtlas.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnRank.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnRank");
		})
		this.btnRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.bagName)
		
	
		this.initLanguage(this.recordName)
		
	
		this.initLanguage(this.labelLv)
		
	
		this.initLanguage(this.labelStage)
		
	
		this.initLanguage(this.hpText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 