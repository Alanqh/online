/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-01-30 11:05:28
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-10 14:47:05
 * @FilePath     : \hauntedparadise\JavaScripts\guide\ui\UISkip.ts
 * @Description  : 
 */

import Anime_UI_Generate from "../../../ui-generate/ShareUI/hall/Anime_UI_generate";




export default class UISkip extends Anime_UI_Generate {

    private _skipCall: Function;
    onStart() {
        this.mStaleButton_Skip.onClicked.add(() => {
            this._skipCall && this._skipCall()
            UIService.hide(UISkip)
        })
    }

    onShow(call: Function) {
        this._skipCall = call
    }

}