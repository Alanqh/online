import { GameConfig } from "../config/GameConfig";
import { ActionCommon } from "../const/GlobalData";
import Rule_Generate from "../ui-generate/GameHUD/Rule_generate";

export default class P_Rule extends Rule_Generate {

    public onHideAC: Action = new Action();

    /**当前页 */
    private _curPage = null;
    public set curPage(value: number) {
        value = MathUtil.clamp(value, 1, this.maxPage);
        if (value == this._curPage) return;
        this._curPage = value;
        // 翻到第一页时，隐藏上一页按钮
        if (value == 1) this.mBtn_PreviousPage.visibility = SlateVisibility.Collapsed;
        else this.mBtn_PreviousPage.visibility = SlateVisibility.Visible;
        // 翻到最后一页时，隐藏下一页按钮
        if (value == this.maxPage) this.mBtn_NextPage.visibility = SlateVisibility.Collapsed;
        else this.mBtn_NextPage.visibility = SlateVisibility.Visible;
        // 根据页码设置内容
        this.setContentByPage(value);
    }
    public get curPage(): number {
        return this._curPage;
    }
    /**最大页 */
    private maxPage = 1;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        GameConfig.NightmareRule.getAllElement().forEach(conf => {
            this.maxPage = Math.max(this.maxPage, conf.Page);
        });
        this.mBtn_Close.onClicked.add(() => {
            this.hide()
        });
        this.mBtn_close.onClicked.add(() => {
            this.hide()
        });
        this.mBtn_NextPage.onClicked.add(() => { this.curPage++ });
        this.mBtn_PreviousPage.onClicked.add(() => { this.curPage-- });

        this.layer = mw.UILayerTop;
    }

    private isSafe: boolean = false;
    protected onShow(...params: any[]): void {
        // 初始化为第一页
        this.curPage = 1;

        if (TimeUtil.elapsedTime() < 50) {
            this.isSafe = true;
            ActionCommon.onPlayerHide.call(true);
        }
    }
    onHide() {
        this.onHideAC.call();
        if (this.isSafe) {
            ActionCommon.onPlayerHide.call(false);
        }
    }

    /**根据当前页码设置内容 */
    private setContentByPage(page: number) {
        let conf = GameConfig.NightmareRule.findElements("Page", page);
        if (conf == null || conf.length == 0) {
            console.error("没有找到页码为" + page + "的配置");
            return;
        }
        // 设置图片
        this.mImg_Picture_01.imageGuid = conf[0].ImageGuid;
        this.mImg_Picture_02.imageGuid = conf[1].ImageGuid;
        // 设置文字
        this.mTxt_Describe_01.text = conf[0].Text;
        this.mTxt_Describe_02.text = conf[1].Text;
        // 设置页码
        this.mTxt_Page.text = `${page}/${this.maxPage}`;
        // 副标题
        this.mTxt_Title.text = conf[0].Title;
    }


}