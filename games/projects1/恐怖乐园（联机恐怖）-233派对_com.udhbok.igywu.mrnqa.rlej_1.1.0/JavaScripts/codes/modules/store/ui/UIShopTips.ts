/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-25 18:49:29
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-04-18 14:32:03
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\store\ui\UIShopTips.ts
 * @Description  : 
 */
import ShopWindowTips_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopWindowTips_UI_generate";


export class UIShopTips extends ShopWindowTips_UI_Generate {

    private _callBack: Function;

    public static checkAction: Action1<boolean> = new Action1()
    private _isCheck: boolean = false;

    onStart() {
        this.btn_cancel.onClicked.add(() => {
            UIService.hide(UIShopTips)
        })

        this.btn_confirm.onClicked.add(() => {
            this._callBack && this._callBack()
            UIService.hide(UIShopTips);
        })

        this.btn_checked.onClicked.add(() => {
            this._isCheck = !this._isCheck;
            UIShopTips.checkAction.call(this._isCheck);
            this.setCheckState()
        })
        this.layer = mw.UILayerSystem
    }

    onShow(title: string, content: string, call?: Function, onShowCall?: Function, showConfirm: boolean = true, showCheckBox: boolean = false) {
        this.text_tipstitle.text = title;
        this.text_tipscontent.text = content;
        this._callBack = call;
        this.mcheck_canvas.visibility = showCheckBox ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.btn_confirm.visibility = showConfirm ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.setCheckState();
    }

    setCheckState() {
        this.img_checked.visibility = this._isCheck ? SlateVisibility.Visible : SlateVisibility.Collapsed
        this.img_unchecked.visibility = this._isCheck ? SlateVisibility.Collapsed : SlateVisibility.Visible
    }

}