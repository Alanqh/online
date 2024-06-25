import { IGiftElement } from "../../../../config/Gift";
import CardGiftItem_UI_Generate from "../../../../ui-generate/ShareUI/card/CardGiftItem_UI_generate";
import Giftrecord_UI_Generate from "../../../../ui-generate/ShareUI/card/Giftrecord_UI_generate";
import { TimerOnly } from "../../../utils/AsyncTool";
import { LanUtil } from "../../../utils/LanUtil";
import { IDCardModuleC } from "../IDCardModule";
import IDCardPanel from "./IDCardPanel";

export class GiftItem extends Giftrecord_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean;

    public onStart() {
        this.onSelect = new Action();
    }

    public setSelected(isTrue: boolean) {
    }

    public cfgId: number;

    public init(cfgId: number, imgGuid: string) {
        this.cfgId = cfgId;
        this.img.imageGuid = imgGuid;
        this.setCount(0);
    }

    public setCount(count: number) {
        this.txt.text = count + "";
    }

    public setAsEmpty() {
    }
}

export class GiftSendItem extends CardGiftItem_UI_Generate {

    public onSelect: Action;
    public isSelected: boolean = false;

    /** 单价canvas */
    private priceCan: Canvas[] = [];

    /** 总共需要花费 */
    private totalPayCan: Canvas[] = [];

    public onStart() {
        this.onSelect = new Action();
        this.btn_giftChoose.onClicked.add(this.onChooseGift.bind(this));
        this.btn_backToItem.onClicked.add(this.backToItem.bind(this));
        this.btn_buyGift.onClicked.add(this.buyGift.bind(this));
        this.btn_up.onClicked.add(this.onAddClick.bind(this));
        this.btn_down.onClicked.add(this.onReduceClick.bind(this));
        this.priceCan.push(this.canvas_free);
        this.priceCan.push(this.canvas_coin1);
        this.priceCan.push(this.canvas_coin2);
        this.totalPayCan.push(this.canvas_buygiftFree);
        this.totalPayCan.push(this.canvas_buygiftLebi);
        this.totalPayCan.push(this.canvas_buygiftKong);
    }

    private onAddClick() {
        if (this.sendCount >= this.maxCount) { return; }
        this.sendCount += 1;
        this.countCost();
    }

    private onReduceClick() {
        if (this.sendCount <= 1) { return; }
        this.sendCount -= 1;
        this.countCost();
    }

    private maxCount: number = Number.MAX_VALUE;

    private onChooseGift() {
        this.onSelect.call();
        this.applySecondView();
    }

    private backToItem() {
        this.applyFirstView();
    }

    private get selfModule() {
        return ModuleService.getModule(IDCardModuleC);
    }

    private async buyGift() {
        if (await this.selfModule.checkCanPurChase(this.cfg, this.cost)) {
            if (this.selfModule.reqGift(UIService.getUI(IDCardPanel)["userId"], this.cfg.id, this.sendCount, this.isFaker)) {
                this.showPurchaseTips(true);
            }
        }
    }

    public setSelected(isTrue: boolean) {
        !isTrue && this.applyFirstView();
    }

    private cfg: IGiftElement;

    private allPayTxt: TextBlock;

    private priceTxt: TextBlock;

    public init(cfg: IGiftElement) {
        this.cfg = cfg;
        this.img_giftItem.imageGuid = cfg.imageGuid;
        this.text_fireNum.text = cfg.charmVal + "";
        this.shiftPurchaseCanvas(cfg.purchaseType, cfg.price);
        this.applyFirstView();
    }

    public shiftPurchaseCanvas(type: number, price: number) {
        this.priceCan.forEach((can, id) => {
            if (id === type) {
                can.visibility = SlateVisibility.SelfHitTestInvisible;
                this.priceTxt = can.getChildAt(0) as TextBlock;
                this.priceTxt.text = price + "";
            } else {
                can.visibility = SlateVisibility.Collapsed;
            }
        });
        this.totalPayCan.forEach((can, id) => {
            if (id === type) {
                can.visibility = SlateVisibility.SelfHitTestInvisible;
                this.allPayTxt = can.getChildAt(0) as TextBlock;
            } else {
                can.visibility = SlateVisibility.Collapsed;
            }
        });
    }

    private sendCount: number = 1;

    private haveCount: number = 0;

    public setData(haveCount: number, isFaker: boolean = false) {
        this.haveCount = haveCount;
        this.isFaker = isFaker;
        this.text_haveNum.text = LanUtil.getText("Code_003") + "：" + haveCount + "";
    }

    private isFaker: boolean = false;

    private viewStage = -1;

    private applyFirstView() {
        this.sendCount = 1;
        this.countCost();
        if (this.viewStage === 1) { return; }
        this.viewStage = 1;
        this.canvas_buygift.visibility = SlateVisibility.Collapsed;
        this.canvas_buyTips.visibility = SlateVisibility.Collapsed;
    }

    private applySecondView() {
        if (this.viewStage === 2) { return; }
        this.viewStage = 2;
        if (this.cfg.purchaseType === 0 && !this.selfModule.checkCanPurChase(this.cfg, this.needBuyCount)) {
            this.showPurchaseTips(false);
            return;
        }
        this.canvas_buygift.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_buyTips.visibility = SlateVisibility.Collapsed;
    }

    private viewTimer: TimerOnly = new TimerOnly();

    /** 显示购买提示 */
    private showPurchaseTips(isSuc: boolean) {
        this.canvas_buyTips.visibility = SlateVisibility.SelfHitTestInvisible;
        if (isSuc) {
            this.text_soldtips1.visibility = SlateVisibility.Collapsed;
            this.text_soldtips2.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.text_soldtips1.visibility = SlateVisibility.SelfHitTestInvisible;
            this.text_soldtips2.visibility = SlateVisibility.Collapsed;
        }
        this.viewTimer.setTimeout(() => {
            this.applyFirstView();
        }, 1e3);
    }

    /** 总开销 */
    private cost: number = 0;

    /** 需要购买的数量 */
    private needBuyCount: number = this.sendCount;

    /** 计算花费 */
    private countCost() {
        this.needBuyCount = this.sendCount - this.haveCount;
        const needCost = this.needBuyCount * this.cfg.price;
        this.cost = needCost > 0 ? needCost : 0;
        this.allPayTxt.text = this.cost + "";
        this.text_buyNum.text = this.sendCount + "";
    }
}