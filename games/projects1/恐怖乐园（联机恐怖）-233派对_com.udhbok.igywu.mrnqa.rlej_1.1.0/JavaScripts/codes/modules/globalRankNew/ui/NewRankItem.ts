/*
 * @Author       : dal
 * @Date         : 2024-05-29 15:12:00
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 16:29:06
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\ui\NewRankItem.ts
 * @Description  : 
 */
import ListItem_UI_Generate from "../../../../ui-generate/ShareUI/rank/ListItem_UI_generate";
import { IDCardModuleC } from "../../idcard/IDCardModule";
import IDCardPanel from "../../idcard/ui/IDCardPanel";
import { NewRankDataInfoBase } from "../NewRankData";
import { NewRankDefine } from "../NewRankDefine";
import { NewRankModuleC } from "../NewRankModuleC";
import { NewGiftPanel } from "./NewGiftPanel";
import { NewRankPanel } from "./NewRankPanel";

export class NewRankItem extends ListItem_UI_Generate {

    private readonly isSelfColor = LinearColor.colorHexToLinearColor("770000FF");

    private readonly isNotSelfColor = LinearColor.colorHexToLinearColor("595959FF");

    protected onStart() {
        this.btn_gift.onClicked.add(async () => {
            const baseInfoArr = await ModuleService.getModule(NewRankModuleC).getUserBaseInfoArr([this.info.i]);
            // UIService.showUI(newRankPanelMgrIns.getPanel(this.selfPanel.type));
            UIService.show(NewGiftPanel, baseInfoArr[0], this.selfPanel.type);
        });

        this.btn_openCard.onClicked.add(() => {
            UIService.show(IDCardPanel, this.info.i, false);
        });
    }

    private setRank(rankId: number) {
        if (rankId <= 3) {
            this.img_rankIcon.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_rankIcon.imageGuid = NewRankDefine.rankImgArr[rankId - 1];
        } else {
            this.img_rankIcon.visibility = SlateVisibility.Collapsed;
            this.text_rankNum.text = rankId + "";
        }
    }

    private info: NewRankDataInfoBase;

    private selfPanel: NewRankPanel;

    public setData(rankId: number, info: NewRankDataInfoBase, rankPanel: NewRankPanel) {
        this.selfPanel = rankPanel;
        this.info = info;
        this.setRank(rankId);
        if (StringUtil.isEmpty(info.n)) {
            ModuleService.getModule(IDCardModuleC).reqData(info.i).then(v => {
                this.text_name.text = v.baseInfo.n;
            });
        } else {
            this.text_name.text = info.n;
        }
        this.text_data.text = info.v + "";
        if (info.i === Player.localPlayer.userId) {
            this.img_rankBg.imageColor = this.isSelfColor;
        } else {
            this.img_rankBg.imageColor = this.isNotSelfColor;
        }
    }
}

export class MyRankItem {

    public constructor(public canvas: Canvas, public rankTxt: TextBlock, public valTxt: TextBlock,
        public nameTxt: TextBlock, public trophyImg: Image, public openCardBtn: Button, public giftBtn: Button) {
        this.giftBtn.onClicked.add(async () => {
            const baseInfoArr = await ModuleService.getModule(NewRankModuleC).getUserBaseInfoArr([Player.localPlayer.userId]);
            // UIService.showUI(newRankPanelMgrIns.getPanel(this.selfPanel.type));
            UIService.show(NewGiftPanel, baseInfoArr[0], this.selfPanel.type);
        });

        this.openCardBtn.onClicked.add(() => {
            UIService.show(IDCardPanel, Player.localPlayer.userId, false);
        });

        if (SystemUtil.isPIE) {
            setTimeout(() => {
                this.nameTxt.text = Player.localPlayer.character.displayName;
            }, 1e3);
        } else {
            this.nameTxt.text = Player.localPlayer['nickname'];
        }
    }

    private setRank(rankId: number) {
        if (rankId < 1) {
            this.rankTxt.text = "暂未上榜";
            this.trophyImg.visibility = SlateVisibility.Collapsed;
            return;
        }
        if (rankId <= 3) {
            this.trophyImg.visibility = SlateVisibility.SelfHitTestInvisible;
            this.rankTxt.text = "";
            this.trophyImg.imageGuid = NewRankDefine.rankImgArr[rankId - 1];
        } else {
            this.trophyImg.visibility = SlateVisibility.Collapsed;
            this.rankTxt.text = rankId + "";
        }
    }

    private selfPanel: NewRankPanel;

    /**
     * 设置自己的数据
     * @param info 信息
     */
    public setData(info: number[], rankPanel: NewRankPanel) {
        this.selfPanel = rankPanel;
        this.setRank(info[0]);
        this.valTxt.text = info[1] + "";
    }
}