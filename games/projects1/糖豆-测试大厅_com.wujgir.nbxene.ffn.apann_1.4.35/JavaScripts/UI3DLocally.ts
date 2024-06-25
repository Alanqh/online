/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-03-13 16:24:58
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-05-09 14:19:25
 * @FilePath     : \stumbleguys\JavaScripts\UI3DLocally.ts
 * @Description  : 修改描述
 */
/*
 * @Author: byq
 * @Date: 2022-10-28 13:04:03
 * @LastEditTime: 2022-12-02 20:56:38
 * @LastEditors: byq
 * @Description: 
 */
// import { LanUtil } from "./ui/UITemplate";

@UIBind('')
export default class UI3DLocally extends mw.UIScript {
    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        Event.addLocalListener(`LanguageInit`, () => {
            this.updateLanguage(this.rootCanvas);
        });
        this.updateLanguage(this.rootCanvas);
    }
    /**
       * 设置语言
       * @param prefab 
       */
    private updateLanguage(prefab: mw.PanelWidget) {
        const count = prefab.getChildrenCount();
        for (let i = 0; i < count; i++) {
            const child = prefab.getChildAt(i);
            if (child instanceof mw.TextBlock) {
                this.initLanguage(child);
            } else if (child instanceof mw.StaleButton) {
                this.initLanguage(child);
            } else if (child instanceof mw.PanelWidget) {
                this.updateLanguage(child);
            } else if (child instanceof mw.UserWidget) {
                this.updateLanguage(child.rootContent);
            }
        }
    }
    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
}
