import MessageBox_Generate from "../../ui-generate/MessageBox_generate";

export default class MessageBoxUI extends MessageBox_Generate {
    private static _instance: MessageBoxUI;
    private resListener: Function;//保存的结果回调方法

    private static get instance(): MessageBoxUI {
        if (MessageBoxUI._instance == null) {
            MessageBoxUI._instance = mw.UIService.create(MessageBoxUI);
        }
        return MessageBoxUI._instance;
    }
    onStart() {
        this.mOK_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            if (this.resListener != null) {
                this.resListener();
            }
        });
        this.mYes_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            this.resListener(true);
        });
        this.mNo_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            this.resListener(false);
        });

        this.mOK_btn.onClicked.add(() => {
        })
        this.mNo_btn.onClicked.add(() => {
        })
        this.mYes_btn.onClicked.add(() => {
        })
    }
    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     */
    public static showOneBtnMessage(title: string, content: string, resListener?: () => void, okStr: string = "确定") {
        mw.UIService.showUI(MessageBoxUI.instance, mw.UILayerTop)
        MessageBoxUI.instance.showMsg1(title, content, resListener, okStr);
    }

    public okCallBack() {
        mw.UIService.hide(MessageBoxUI);
        // this.hide();
        if (this.resListener != null) {
            this.resListener();
        }

    }

    public yesCallBack() {
        mw.UIService.hide(MessageBoxUI);
        this.resListener(true);

    }

    public noCallBack() {
        mw.UIService.hide(MessageBoxUI);
        this.resListener(false);
    }

    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param resListener 回调事件
     * @param yesStr "是"按钮str
     * @param noStr "否"按钮str
     */
    public static showTwoBtnMessage(title: string, content: string, resListener: (res: boolean) => void, yesStr: string = "是", noStr = "否") {
        mw.UIService.showUI(MessageBoxUI.instance, mw.UILayerTop)
        MessageBoxUI.instance.showMsg2(title, content, resListener, yesStr, noStr);
    }

    private showMsg1(title: string, content: string, resListener: () => void, okStr: string) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mNo_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mOK_btn.visibility = (mw.SlateVisibility.Visible);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mOK_btn.text = (okStr);
    }

    private showMsg2(title: string, content: string, resListener: (res: boolean) => void, yesStr: string, noStr: string) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Visible);
        this.mNo_btn.visibility = (mw.SlateVisibility.Visible);
        this.mOK_btn.visibility = (mw.SlateVisibility.Collapsed);

        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mYes_btn.text = (yesStr);
        this.mNo_btn.text = (noStr);
    }

}
