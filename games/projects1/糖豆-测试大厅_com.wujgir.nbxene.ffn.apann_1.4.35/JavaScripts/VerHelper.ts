/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-06-08 18:49:41
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-12-26 09:42:58
 * @FilePath     : \stumbleguys_new\JavaScripts\VerHelper.ts
 * @Description  : 修改描述
 */

import { ConfigBase } from "./config/ConfigBase";

/**
 *版本切换
 */
export class VerHelper {
    public static HallName: string = "stumbleguys";
    public static set Ver(v: boolean) {
        this._Ver = v ? "en" : "ch";
    }
    private static _Ver: string = "";
    /**
     * 获取一个版本配置
     * @param cfg 
     * @param id 
     * @returns 
     */
    public static getVerCfg<T>(cfg: ConfigBase<any>, id: number): T {
        return cfg.getElement(id)[`${VerHelper._Ver}Value`];
    }
    /**
     * 获取但配置的版本
     */
    public static getVerSingleCfg<T>(cfg): T {
        return cfg[`${VerHelper._Ver}Value`];
    }

}
export function showVersion() {
    if (SystemUtil.isClient()) {
        const txtVersion = TextBlock.newObject(UIService.canvas, "txtVersion");
        const layout = new mw.UIConstraintAnchors(UIConstraintHorizontal.Left, UIConstraintVertical.Bottom);
        txtVersion.visibility = mw.SlateVisibility.Visible;
        txtVersion.size = new Vector2(15, 25);
        txtVersion.position = new Vector2(0, UIService.canvas.size.y - 25);
        txtVersion.fontSize = 15;

        txtVersion.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
        txtVersion.textJustification = mw.TextJustify.Left;
        txtVersion.constraints = layout;
        txtVersion.textVerticalJustification = mw.TextVerticalJustify.Top;
        let title: string = "";
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
            title = "版本号:";
        }
        if (!!language.match("en")) {
            title = "Version:"
        }
        txtVersion.text = `${title}${SystemUtil.isPIE ? "PIE" : RouteService.getGameVersion()}`;
    }
}
