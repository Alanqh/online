
import CheckPointTrigger from "../CheckPointTrigger";
import GameUI_Generate from "../ui-generate/GameUI_generate";


export default class GameUI extends GameUI_Generate {

    /**最大关卡数 */
    maxLevelNum:number = 0
    /**当前关卡数 */
    nowLevelNum:number = 0

    protected onAwake(): void {
        

        this.mBG.visibility = SlateVisibility.Hidden
        this.mTextBlock.visibility = SlateVisibility.Hidden

        Event.addLocalListener("Victory",()=>{
            this.mBG.visibility = SlateVisibility.Visible
            this.mTextBlock.visibility = SlateVisibility.Visible

            this.mTextBlock.text = "芜湖胜利！"
        })

        Event.addLocalListener("Death",()=>{
            this.mBG.visibility = SlateVisibility.Visible
            this.mTextBlock.visibility = SlateVisibility.Visible

            let time = 3;
            this.mTextBlock.text = time.toString()
            let handle =  setInterval(()=>{
                if(time==1){
                    clearInterval(handle)
                    this.mBG.visibility = SlateVisibility.Hidden
                    this.mTextBlock.visibility = SlateVisibility.Hidden
                }
                time--
                this.mTextBlock.text = time.toString()                
            },1000)
        })

        Event.addLocalListener("CheckPoint",(chekPoint:CheckPointTrigger)=>{
            this.nowLevelNum = chekPoint.pointNumber
            // 更新进度条
            this.freshProgress()
        })
    }

    onShow(maxLevelNum:number,nowLevelNum:number){
        // 最大关卡数
        this.maxLevelNum = maxLevelNum

        // 当前关卡数
        this.nowLevelNum = nowLevelNum

        this.freshProgress()
       
    }

    private freshProgress(){
        if(this.nowLevelNum == -1){
            this.mLevelText.text = "第"+this.maxLevelNum+"关"

            this.mLevelProgress.currentValue = 1
            return
        }

        this.mLevelText.text = "第"+this.nowLevelNum+"关"

        this.mLevelProgress.currentValue = this.nowLevelNum / this.maxLevelNum
    }
}