/** 
 * @Author       : lei.zhao
 * @Date         : 2023-08-03 15:11:40
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-03 15:31:02
 * @FilePath     : \stumbleguys\JavaScripts\tool\LanguageUtil.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../config/GameConfig";
import { ILanguageElement } from "../config/Language";

export namespace LanUtils {
    export function getLanguage(key: string) {
        let value: ILanguageElement = GameConfig.Language[key]
        return value ? value.Value : key;
    }
    /**当前语言环境是否是中文 */
    export let isCH: boolean = true;
    /**设置海外的图片 */
    export async function setOutSeaImg(img: mw.Image, cfgId: number) {
        if (!isCH) {
            let cfg = GameConfig.UILan.getElement(cfgId);
            img.imageGuid = cfg.imgGuid;
        }
    }
    /**设置海外的按钮 */
    export function setOutSeaBtn(btn: mw.Button | mw.StaleButton, normalCfg: number, pressCfg: number) {
        if (!isCH) {
            let cfg = GameConfig.UILan.getElement(normalCfg);
            btn.normalImageGuid = cfg.imgGuid;
            if (pressCfg) {
                cfg = GameConfig.UILan.getElement(pressCfg);
                btn.pressedImageGuid = cfg.imgGuid;
            }
        }
    }
    export function initLanguage(ev: number) {
        let index: number;
        if (SystemUtil.isPIE) {
            index = ev;
        } else {
            index = LanUtils.getLanguageEv();
        }
        GameConfig.initLanguage(index, key => {
            const lan = GameConfig.Language[key];
            if (lan) {
                return lan.Value;
            } else {
                return key.toString();
            }
        });
        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let key: string = ui.text;
            const lan = GameConfig.Language[key];
            if (lan) {
                ui.text = lan.Value;
            }
        });
        LanUtils.isCH = index == 0;
        Event.dispatchToLocal(`LanguageInit`);
    }
    /**
     * 获取多语言环境
     * @returns  0-中文 1-英文
     */
    export function getLanguageEv(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("zh")) {
            return 0;
        }
        if (!!language.match("en")) {
            return 1;
        }
        return 1;
    }

}