/*
 * @Author       : dal
 * @Date         : 2024-03-04 10:59:56
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-11 17:53:40
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\ui\RecentInfoItem.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import GiftName_UI_Generate from "../../../../ui-generate/ShareUI/card/GiftName_UI_generate";
import LikeName_UI_Generate from "../../../../ui-generate/ShareUI/card/LikeName_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import { RecentGiftInfo, RecentLikeInfo } from "../IDCardConst";
import IDCardPanel from "./IDCardPanel";

export class RecentLikeInfoItem extends LikeName_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public setSelected(isTrue: boolean) {
    }

    protected onStart() {
        this.onSelect = new Action();
        this.btn_likeName.onClicked.add(() => {
            UIService.show(IDCardPanel, this.userId);
        })
    }

    private userId: string;

    public setData(recentLikeInfo: RecentLikeInfo) {
        this.userId = recentLikeInfo.u;
        this.text_likeName.text = LanUtil.getText("Code_026") + "：" + recentLikeInfo.n.substring(0, 16);
    }
}

export class RecentGiftInfoItem extends GiftName_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public setSelected(isTrue: boolean) {
    }

    protected onStart() {
        this.onSelect = new Action();
        this.btn_giftName.onClicked.add(() => {
            UIService.show(IDCardPanel, this.userId);
        })
    }

    private userId: string;

    public setData(recentGiftInfo: RecentGiftInfo) {
        this.userId = recentGiftInfo.uId;
        this.text_giftName.text = LanUtil.getText("Code_026") + "：" + recentGiftInfo.n.substring(0, 16);
        this.img_giftItem.imageGuid = GameConfig.Gift.getElement(recentGiftInfo.gId).imageGuid;
        this.text_giftNum1.text = "✖" + recentGiftInfo.c;
    }
}