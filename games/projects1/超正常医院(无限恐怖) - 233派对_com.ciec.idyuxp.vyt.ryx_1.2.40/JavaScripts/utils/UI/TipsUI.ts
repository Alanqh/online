
import { GlobalData } from "../../const/GlobalData";
import Tips_Generate from "../../ui-generate/Common/Tips_generate";
import { utils } from "../uitls";

export default class TipsUI extends Tips_Generate {

    /** 当前正在显示的提示 */
    private tipsQueue: string[] = [];
    /** 提示信息列表 */
    private tipsList: TextBlock[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        this.tipsList.push(this.mBottomText_1);
        this.tipsList.push(this.mBottomText_2);
        this.tipsList.push(this.mBottomText_3);
        this.tipsList.push(this.mBottomText_4);
        for (let i = 0; i < this.tipsList.length; i++) {
            const textUI = this.tipsList[i];
            textUI.visibility = SlateVisibility.Hidden;
        }
        this.layer = UILayerTop;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }


    /**显示提示 */
    public showTips(text: string) {
        let index = this.getFristTipsIndex();
        // 当前UI提示队列已满，加入队列并返回
        if (index == -1) {
            this.tipsQueue.push(text);
            return;
        }
        let textUI = this.tipsList[index]
        let originalPos = new Vector2(textUI.position.x, textUI.position.y);
        textUI.text = text;
        textUI.visibility = SlateVisibility.Visible;
        let duration = GlobalData.Global.tipTime * 1000;
        let tipsTween = new Tween({ alpha: 1, posY: textUI.position.y }).to({ alpha: 0, posY: textUI.position.y - 60 }, duration)
            .onUpdate((obj) => {
                textUI.renderOpacity = obj.alpha;
                textUI.position = new Vector2(textUI.position.x, obj.posY);
            })
            .onComplete(() => {
                textUI.visibility = SlateVisibility.Hidden;
                textUI.position = originalPos;
                if (this.tipsQueue.length != 0) {
                    this.showTips(this.tipsQueue.shift());
                }
            })
        // 根据帧率选择不同显示方式
        if (utils.frameCount > 20) {
            // 高帧率播放更新动画
            tipsTween.start();
        } else {
            // 低帧率显示后隐藏
            setTimeout(() => {
                textUI.visibility = SlateVisibility.Hidden;
                textUI.position = originalPos;
                if (this.tipsQueue.length != 0) {
                    this.showTips(this.tipsQueue.shift());
                }
            }, duration);
        }

    }


    /**
     * @returns 返回第一个隐藏的提示的索引，如果没有隐藏的提示则返回-1
     */
    public getFristTipsIndex() {
        for (let i = 0; i < this.tipsList.length; i++) {
            if (this.tipsList[i].visibility == SlateVisibility.Hidden) {
                return i;
            }
        }
        return -1;
    }
}