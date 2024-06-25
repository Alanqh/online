
import { GlobalData } from "../../../const/GlobalData";
import { PlayerRace } from "../../../const/enum";
import BonusItem_Generate from "../../../ui-generate/Event/BonusItem_generate";
import ResultItem_Generate from "../../../ui-generate/Event/ResultItem_generate";
import Result_Generate from "../../../ui-generate/Event/Result_generate";
import { utils } from "../../../utils/uitls";

export class P_Result extends Result_Generate {

    private expItem: rewardItem = null;
    private coinItem: rewardItem = null;
    private reultItemArr: Array<ResultItem_Generate> = [];

    onAwake() {
        this.layer = mw.UILayerTop;
    }

    onStart() {
        this.mBtn_Affrim.onClicked.add(() => {
            this.hide();
        });
        // this.mBtn_Close.onClicked.add(() => {
        //     this.hide();
        // });
        if (!this.expItem) {
            this.expItem = UIService.create(rewardItem);
            this.expItem.mTxt_Num.text = GlobalData.Biochemical.expPerGame.toString();
            this.expItem.mImg_Icon.imageGuid = GlobalData.Biochemical.expIcon[0];
            this.mCanvas_BonusItem.addChild(this.expItem.uiObject);
            this.expItem.uiObject.size = this.expItem.rootCanvas.size;
            this.expItem.uiObject.renderScale = GlobalData.Biochemical.expItemScale;
        }
        if (!this.coinItem) {
            this.coinItem = UIService.create(rewardItem);
            this.coinItem.mImg_Icon.imageGuid = GlobalData.Biochemical.expIcon[1];
            this.mCanvas_BonusItem.addChild(this.coinItem.uiObject);
            this.coinItem.uiObject.size = this.expItem.rootCanvas.size;
            this.coinItem.uiObject.renderScale = GlobalData.Biochemical.expItemScale;
        }
        for (let i = 0; i < 3; i++) {
            let item = UIService.create(ResultItem_Generate);
            this.mCanvas_ResultList.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            item.visible = false;
            this.reultItemArr.push(item);
        }
    }

    public showRule(type: PlayerRace, isWin: boolean, str: string) {
        this.fixRes(isWin);
        let resData = JSON.parse(str) as { sec: number, saveCount: number, killCount: number, coin: number };
        console.warn(`lwj resData:${resData.sec}`);
        if (resData.coin) {
            this.coinItem.visible = true;
            this.coinItem.mTxt_Num.text = resData.coin.toString();
        } else {
            this.coinItem.visible = false;
        }
        this.showResultItem(type, resData);

        this.show();
    }

    private fixRes(isWin: boolean) {
        if (isWin) {
            this.mTextBlock.setFontColorByHex("#FFA600");
            this.mTextBlock.text = "胜利";
        } else {
            this.mTextBlock.setFontColorByHex("#7B0003");
            this.mTextBlock.text = "失败";
        }
    }

    /**根据类型显示result */
    private showResultItem(type: PlayerRace, resData: { sec: number, saveCount: number, killCount: number, coin: number }) {
        if (type == PlayerRace.Human) {
            this.reultItemArr[0].visible = true;
            this.reultItemArr[0].mTxt_Title.text = "生存时间";
            this.reultItemArr[0].mTxt_Num.text = utils.formatSecondsToMin(resData.sec);
            this.reultItemArr[1].visible = true;
            this.reultItemArr[1].mTxt_Title.text = "救援队友";
            this.reultItemArr[1].mTxt_Num.text = resData.saveCount.toString();
            this.reultItemArr[2].visible = false;
        } else if (type == PlayerRace.Mix) {
            this.reultItemArr[0].visible = true;
            this.reultItemArr[0].mTxt_Title.text = "生存时间";
            this.reultItemArr[0].mTxt_Num.text = utils.formatSecondsToMin(resData.sec);
            this.reultItemArr[1].visible = true;
            this.reultItemArr[1].mTxt_Title.text = "救援队友";
            this.reultItemArr[1].mTxt_Num.text = resData.saveCount.toString();
            this.reultItemArr[2].visible = true;
            this.reultItemArr[2].mTxt_Title.text = "感染人数";
            this.reultItemArr[2].mTxt_Num.text = resData.killCount.toString();
        } else if (type == PlayerRace.Ghost) {
            this.reultItemArr[0].visible = true;
            this.reultItemArr[0].mTxt_Title.text = "感染人数";
            this.reultItemArr[0].mTxt_Num.text = resData.killCount.toString();
            this.reultItemArr[1].visible = false;
            this.reultItemArr[2].visible = false;
        }
    }


    private hideTime: any = null;
    protected onShow(...params: any[]): void {
        utils.showUITween(this);

        this.hideTime = setTimeout(() => {
            this.hide();
        }, 10 * 1000);
    }

    protected onHide(): void {
        clearTimeout(this.hideTime);
        this.hideTime = null;
    }


}

class rewardItem extends BonusItem_Generate {

    onStart() {
        this.mCanvas_Unlock.visibility = SlateVisibility.Collapsed;
        this.mCanvas_Got.visibility = SlateVisibility.Collapsed;
    }

}