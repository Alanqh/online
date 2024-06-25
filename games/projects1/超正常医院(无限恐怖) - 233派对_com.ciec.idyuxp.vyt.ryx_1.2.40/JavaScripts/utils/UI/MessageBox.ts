import { GameConfig } from "../../config/GameConfig";
import MessageBox_Generate from "../../ui-generate/Common/MessageBox_generate";
import { utils } from "../uitls";



/**二次确认框*/
export default class MessageBox extends MessageBox_Generate {
    private static _instance: MessageBox;
    private resListener: Function;//保存的结果回调方法


    public static get instance(): MessageBox {
        if (MessageBox._instance == null) {
            MessageBox._instance = mw.UIService.getUI(MessageBox);
        }
        return MessageBox._instance;
    }


    onStart() {

        this.layer = mw.UILayerTop;

        this.mYes_btn.onClicked.add(() => {
            this.hide();
            this.resListener(true);
        });
        this.mNo_btn.onClicked.add(() => {
            this.hide();
            this.resListener(false);
        });
        this.mButton_Close.onClicked.add(() => {
            this.hide();
            this.resListener(false);
        })
    }
    public static hide() {
        MessageBox._instance.hide();
    }


    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param yListener “是”回调事件
     * @param nListener “否”回调事件
     */
    public static showTwoBtnMessage(content: string, resListener: (res: boolean) => void, okKey: number = 6, noKey = 7) {
        MessageBox.instance.hide();
        MessageBox.instance.show();

        let yesStr = GameConfig.Language.getElement(okKey).Value;
        let noStr = GameConfig.Language.getElement(noKey).Value;
        MessageBox.instance.showMsg2(content, resListener, yesStr, noStr);
    }


    private showMsg2(content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string) {

        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mText_Konw.text = (yesStr);
        this.mText_Konw_1.text = (noStr);
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
    }

}
