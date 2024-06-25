/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-07 16:07:18
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-08 16:33:49
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\sign\ui\UISignIn.ts
 * @Description  : 
 */

import { ICheckInElement } from "../../../../config/CheckIn";
import { GameConfig } from "../../../../config/GameConfig";
import CheckIn_UI_Generate from "../../../../ui-generate/ShareUI/checkin/CheckIn_UI_generate";
import UIIntegration from "../../../ui/UIIntegration";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { UIGainItem } from "../../store/ui/UIGaintem";
import { UIItemDetail } from "../../store/ui/UIItemDetail";
import { ESignState, SignDataHelper } from "../SignDataHelper";
import { SignModuleC } from "../SignModuleC";

export default class UISignIn extends CheckIn_UI_Generate {

    items: UISignItem[] = []
    protected onStart(): void {
        this.btn_back.onClicked.add(() => {
            UIService.hide(UISignIn);
        })
        for (let i = 1; i <= 7; ++i) {
            let item = new UISignItem(this[`canvas_day${i}`], GameConfig.CheckIn.getElement(i))
            this.items.push(item)
        }
        // 在子游戏中层级高于了 开始界面了低一点
        this.layer = mw.UILayerMiddle;
    }
    onShow() {
        UIAniUtil.popUp(this.rootCanvas)
    }

    onHide() {
        UIAniUtil.popDown(this.rootCanvas)

    }

}

export class UISignItem {
    data: ICheckInElement;
    rootCanvas: mw.Canvas;
    text_day1: TextBlock;
    text_get: TextBlock;
    btn_get: Button;
    item_icon: Image;
    text_itemName: TextBlock;
    canvas_received: mw.Canvas;
    img_receivedBg: Image;
    img_receivedIcon: Image
    btn_item: Button;
    item_iconBg: Image;
    text_itemNum: TextBlock;

    getState: ESignState = ESignState.CanReceive
    constructor(rootCanvas: mw.Canvas, data: ICheckInElement) {
        this.rootCanvas = rootCanvas;
        this.data = data;
        this.text_day1 = this.rootCanvas.findChildByPath("Text_day1") as TextBlock
        this.text_get = this.rootCanvas.findChildByPath("Text_get1") as TextBlock
        this.btn_get = this.rootCanvas.findChildByPath("Btn_get1") as Button
        this.item_icon = this.rootCanvas.findChildByPath("Canvas_item/Item_icon") as Image
        this.img_receivedBg = this.rootCanvas.findChildByPath("Canvas_received1/Img_receivedBg") as Image
        this.img_receivedIcon = this.rootCanvas.findChildByPath("Canvas_received1/Img_receivedIcon") as Image
        this.text_itemName = this.rootCanvas.findChildByPath("Canvas_item/Text_itemName") as TextBlock
        this.text_itemNum = this.rootCanvas.findChildByPath("Canvas_item/Text_itemNum") as TextBlock
        this.canvas_received = this.rootCanvas.findChildByPath("Canvas_received1") as Canvas
        this.btn_item = this.rootCanvas.findChildByPath("Canvas_item/Btn_item") as Button
        this.item_iconBg = this.rootCanvas.findChildByPath("Canvas_item/Item_iconBg") as Image
        this.initUI();
        this.initButton()
    }

    initUI() {
        this.text_day1.text = this.data.day_desc//LanUtil.getText(this.data.day_desc);
        let itemData = GameConfig.Item.getElement(this.data.itemId)
        this.item_icon.imageGuid = itemData.icon;
        this.text_itemName.text = itemData.name;
        this.text_itemNum.text = this.data.itemNum.toString()
        this.item_iconBg.imageGuid = GameConfig.ItemQuality.getElement(itemData.quality).imgGuid
        this.checkState()
    }

    initButton() {
        this.btn_item.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "CheckIn_UI_btn_item");
            let itemData = GameConfig.Item.getElement(this.data.itemId)
            let position = CommonUtils.getViewPosition(this.rootCanvas, this.rootCanvas.position);
            position.x += 100
            if (this.data.id == 7) {
                position.x -= 250
            }
            UIService.show(UIItemDetail, itemData, position)
        })
        this.btn_get.onClicked.add(async () => {
            Event.dispatchToLocal("PlayButtonClick", "CheckIn_UI_btn_get");
            if (!this.data) return;
            if (this.getState == ESignState.CanReceive) {
                let result = await ModuleService.getModule(SignModuleC).reqGetSignReward(this.data.id);
                if (result) {
                    this.getSuccess()
                } else {
                    Tips.show("签到失败")
                }
            } else {
                Tips.show(LanUtil.getText("UI_checkIn_14"))
            }
        })
    }


    private checkState() {
        this.getState = DataCenterC.getData(SignDataHelper).checkState(this.data.id);
        this.btn_get.visibility = SlateVisibility.Hidden
        if (this.getState == ESignState.CanReceive) {
            this.text_get.text = `领取`;
            this.text_get.fontColor = LinearColor.red
            this.btn_get.visibility = SlateVisibility.Visible
        } else if (this.getState == ESignState.Received) {
            this.text_get.text = `已领取`;
            this.text_get.setFontColorByHex("#C1C1C1FF")
            this.canvas_received.visibility = SlateVisibility.Visible
        } else {
            this.text_get.text = `待签到`;
        }
    }

    private getSuccess() {
        this.img_receivedBg.visibility = SlateVisibility.Hidden;
        this.img_receivedIcon.visibility = SlateVisibility.Hidden;
        this.canvas_received.visibility = SlateVisibility.Visible;
        this.btn_get.visibility = SlateVisibility.Hidden
        new Tween({ opacity: 0, scale: new Vector2(4, 4) })
            .to({ opacity: 1, scale: new Vector2(1, 1) }, 500)
            .onStart(() => { this.img_receivedIcon.visibility = SlateVisibility.Visible; })
            .onUpdate((val) => {
                this.img_receivedIcon.renderOpacity = val.opacity
                this.img_receivedIcon.renderScale = val.scale;
            })
            .onComplete(() => {
                this.img_receivedBg.visibility = SlateVisibility.Visible;
                this.text_get.text = `已领取`;
                this.text_get.setFontColorByHex("#C1C1C1FF")
                TimeUtil.delayExecute(() => {
                    let itemData = GameConfig.Item.getElement(this.data.itemId)
                    itemData && UIService.show(UIGainItem, itemData, this.data.itemNum);
                }, 5)
            })
            .easing(TweenUtil.Easing.Back.In)
            .start()
    }

}