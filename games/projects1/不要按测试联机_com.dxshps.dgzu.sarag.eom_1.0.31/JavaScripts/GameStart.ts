/** 
 * @Author       : Songyang.Xie
 * @Date         : 2023-11-03 09:40:44
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2023-11-21 14:30:03
 * @FilePath     : \petparty\JavaScripts\GameStart.ts
 * @Description  : 修改描述
 */
import { LogManager } from "odin";
import MoveObjManager from "./MoveUtil/MoveObjManager";
import { GameConfig } from "./config/GameConfig";
import { GlobalData } from "./const/GlobalData";
import { AIModuleC } from "./modules/aIModule/AIModuleC";
import { AIModuleS } from "./modules/aIModule/AIModuleS";
import GamingModuleC from "./modules/gamingModule/GamingModuleC";
import GamingModuleS from "./modules/gamingModule/GamingModuleS";
import { GmModuleC, GmModuleS } from "./modules/gmModule/GmModule";
import HUDModuleC from "./modules/hudModule/HUDModuleC";
import HUDModuleS from "./modules/hudModule/HUDModuleS";
import { LeaderboardModuleC } from "./modules/leaderboardModule/LeaderboardModuleC";
import { LeaderboardModuleS } from "./modules/leaderboardModule/LeaderboardModuleS";
import LoginModuleC from "./modules/loginModule/LoginModuleC";
import LoginModuleS from "./modules/loginModule/LoginModuleS";
import MGSModuleC from "./modules/mgsModule/MGSModuleC";
import { MGSModuleData } from "./modules/mgsModule/MGSModuleData";
import MGSModuleS from "./modules/mgsModule/MGSModuleS";
import { PetModuleC } from "./modules/petModule/PetModuleC";
import { PetModuleS } from "./modules/petModule/PetModuleS";
import PlayerModuleC from "./modules/playerModule/PlayerModuleC";
import PlayerModuleS from "./modules/playerModule/PlayerModuleS";
import { PropModuleC } from "./modules/propModule/PropModuleC";
import { PropModuleS } from "./modules/propModule/PropModuleS";
import TeamModuleC from "./modules/teamModule/TeamModuleC";
import TeamModuleS from "./modules/teamModule/TeamModuleS";
import { ClassInstance } from "./tools/ClassInstance/ClassInstance";
import GameComUtils from "./utils/GameComUtils";

@Component
export default class GameStart extends Script {
    @mw.Property({ displayName: "是否开启GM" })
    private isOpenGm = false;
    @mw.Property({ displayName: "是否使用平台形象" })
    private isUseAvatar = true;
    @mw.Property({ displayName: "是否使海外发布" })
    private isOverSea = true;
    @mw.Property({
        displayName: "日志等级", enumType: {
            "不打印": 0,
            "Error": 1,
            "Warn": 2,
            "Log": 3,
        }
    })
    public logLevel = 3;

    /** 当预加载资源改动的时候自动调用此函数 */
    public onPreloadAssetsChangedInEditor() {
        let result = new Set<string>();

        GameConfig.Assets.getAllElement().forEach((asset) => {
            if (!asset.Guid) return;
            result.add(asset.Guid);
        })

        result.add("Anchor");
        result.add("Trigger");
        result.add("197386");// 正方体

        let filterArray = Array.from(result);
        console.warn(`当前预加载资源个数:${filterArray.length}`);

        // this.preloadAssets = filterArray.join(",");
        return filterArray;
    }

    onStart(): void {
        super.onStart();
        if (SystemUtil.isPIE) {
            LogManager.instance.setLogLevel(3);
        } else {
            LogManager.instance.setLogLevel(this.logLevel);
        }

        let assets = this.onPreloadAssetsChangedInEditor();
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            if (AssetUtil.assetLoaded(element)) {
                continue;
            }

            AssetUtil.asyncDownloadAsset(element);
        }

        GlobalData.isShowGM = this.isOpenGm;
        if (SystemUtil.isPIE || this.isOpenGm) {
            // PIE开启GM
            GlobalData.isShowGM = true;
            // EventsTool.start();
        }
        // GlobalData.selectedLanguageIndex = Number(this.selectedLanguageIndex);
        GlobalData.selectedLanguageIndex = -1;
        GlobalData.isUseAvatar = this.isUseAvatar;
        GlobalData.isOverSea = this.isOverSea;

        DataStorage.setTemporaryStorage(SystemUtil.isPIE);// PIE临时存储，其他都未永久存储

        if (SystemUtil.isClient()) {
            if (GlobalData.selectedLanguageIndex == -1) {
                GlobalData.selectedLanguageIndex = this.getSystemLanguageIndex();
            }
            let languageType = mw.LanguageType.Chinese;

            if (GlobalData.selectedLanguageIndex != 1) {
                languageType = mw.LanguageType.English;
            }
            mw.LanguageUtil.useLocalizedLanguage(languageType);
            //初始化表格语言
            GameConfig.initLanguage(GlobalData.selectedLanguageIndex, (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            });
            mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
                if (ui == null) return;
                let key: string = ui.text;
                if (key == null || key === "") return;

                GameComUtils.setUIText(ui, key);
            });
        }
        this.onRegisterModule();
        this.useUpdate = true;

    }
    //获取系统语言索引
    private getSystemLanguageIndex(): number {
        // 要么中文要么英文
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        // if (!!language.match("en")) {
        //     return 0;
        // }
        if (!!language.match("zh")) {
            return 1;
        }
        // if (!!language.match("ja")) {
        //     return 2;
        // }
        // if (!!language.match("de")) {
        //     return 3;
        // }
        return 0;
    }
    onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
        ClassInstance.gc();
        MoveObjManager.instance.update(dt);
    }
    //当注册模块
    onRegisterModule(): void {
        ModuleService.ready().then(() => {
            // 所有模块执行 awake start enter之后，
            // 不考虑使用async重写上面3个方法
            // 如果重写了，自己判断
            GlobalData.odinInitDone = true;
        })
        //#region 注册模块
        ModuleService.registerModule(GmModuleS, GmModuleC, null);
        ModuleService.registerModule(LeaderboardModuleS, LeaderboardModuleC, null);
        ModuleService.registerModule(LoginModuleS, LoginModuleC, null);
        ModuleService.registerModule(HUDModuleS, HUDModuleC, null);
        ModuleService.registerModule(GamingModuleS, GamingModuleC, null);
        ModuleService.registerModule(PetModuleS, PetModuleC, null);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, null);
        ModuleService.registerModule(MGSModuleS, MGSModuleC, MGSModuleData);
        ModuleService.registerModule(AIModuleS, AIModuleC, null);
        ModuleService.registerModule(TeamModuleS, TeamModuleC, null);
        ModuleService.registerModule(PropModuleS, PropModuleC, null);


        //#endregion
    }

    // odin基类有销毁事件，client会报错。所以先重写
    protected onDestroy(): void {

    }
}