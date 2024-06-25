import { GameConfig } from "../../config/GameConfig";
import { IShopItemElement } from "../../config/ShopItem";
import IaaBuy_Generate from "../../ui-generate/Shop/IaaBuy_generate";
import iconItem_Generate from "../../ui-generate/Shop/iconItem_generate";

/**一个类对应一个广告按钮，达成领取条件之后隐藏广告按钮，需要使用create创建而不是getUI */
export default class P_IAA extends IaaBuy_Generate {

    /**剩余观看次数 */
    private _remainCount = null;
    public get remainCount() {
        return this._remainCount;
    }
    public set remainCount(value) {
        this._remainCount = value;
        this.setRemainCountUI(value);
    }
    /**观看成功一次回调  参数: 剩余次数*/
    public onSuccessOnce: Action1<number> = new Action();
    /**全部观看成功回调 */
    public onSuccessAll: Action = new Action();


    protected onStart(): void {
        this.layer = mw.UILayerTop;
        // AdsService.isReady((isReady) => {
        // console.log("ready: " + isReady);
        // if (isReady) {
        this.mAds.onClose.add((isSuccess) => {
            if (isSuccess) {
                this.remainCount--;
                this.onSuccessOnce.call(this.remainCount);
                if (this.remainCount <= 0) {
                    this.onSuccessAll.call();
                }
            }
        });
        // }
        // })
        // 领取成功之后隐藏广告按钮
        this.onSuccessAll.add(() => {
            this.mAds.visibility = mw.SlateVisibility.Collapsed;
            this.hide();
        })
        // 关闭窗口
        this.mButton_Close.onClicked.add(() => {
            this.hide();
        });
    }

    /**初始化UI */
    public init(shopItemId: number) {
        let shopConf = GameConfig.ShopItem.getElement(shopItemId);
        this.setPropImageUI(shopConf);
        this.remainCount = shopConf.advertiseNum;
        return this;
    }


    /**设置剩余次数UI */
    private setRemainCountUI(remainCount: number) {
        if (remainCount <= 0) {
            this.mText_tips.text = "领取成功";
        } else {
            this.mText_tips.text = `剩余观看次数：${remainCount}`;
        }
    }

    /**设置道具图片UI */
    private setPropImageUI(shopConf: IShopItemElement) {
        shopConf.propIds.forEach((propId, index) => {
            let propConf = GameConfig.Item.getElement(propId);
            let iconItem = UIService.create(iconItem_Generate);
            iconItem.show();
            iconItem.mImage_icon.imageGuid = propConf.Icon;
            iconItem.mText_num.text = shopConf.awardCount[index].toString();
            this.mCanvas_Item.addChild(iconItem.uiObject);
            iconItem.uiObject.size = iconItem.rootCanvas.size;
            // console.log(`创建道具图标：${propConf.Name} x${shopConf.awardCount[index]}, visib = ${iconItem.visible}`)
        });
    }
}