import TimeUI from "./UI/TimeUI";
@Component
export default class CountDown extends Script {

    //当前时间
    @Property({ replicated: true, onChanged: "onTimeChange" })
    private curTime:number = 0;

    //是否结束
    @Property({ replicated: true })	
    private isEnd:boolean = false;

    //ui实例
    private ui: TimeUI;

    public onStart(): void {
        Event.addLocalListener("initCountDown", (limtime:number) => {	
            this.Init(limtime);	
        });	
    }

    public Init(limtime:number):void{
        if(SystemUtil.isServer()){
            this.curTime = limtime;
            Event.addLocalListener("Level4End",()=>{ this.curTime = 0; })
            Event.addLocalListener("Level5End",()=>{ this.curTime = 0; })
            let timeUtilId = TimeUtil.setInterval(() => {
                this.curTime -= 1;
                if(this.curTime <= 0){
                    TimeUtil.clearInterval(timeUtilId);
                    this.GameEnd();
                }
            }, 1);
        }
        if (SystemUtil.isClient()) {
            // 创建UI
            this.ui = mw.createUI("TimeUI", TimeUI)
            this.ui.uiWidgetBase.addToViewport(1)    
        }
    }

    private GameEnd():void{
        if(SystemUtil.isServer()){
            console.log("执行GameEnd")
            Event.dispatchToLocal("LevelEnd");
        }
    }

    //时间更新，客户端执行
    private onTimeChange(): void {
        //console.log("时间变化")
        this.ui.textTime.text = this.curTime.toString();
        //关闭ui
        if(this.curTime <= 0){
            this.ui.setVisible(false)
            Event.dispatchToLocal("LookWarEnd");
        }
    }
    
}