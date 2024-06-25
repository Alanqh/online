import { GM } from "module_gm";
import { GlobalData } from "./const/GlobalData";
import { GameConfig } from "./config/GameConfig";
import { GMBasePanelUI } from "./modules/GM/GMModule";
import { EventsTool } from "./utils/EventsTool";
import { GameModule_Client, GameModule_Server } from "./modules/GameHud/GameModule";
import { PlayerModuleS } from "./modules/Player/PlayerModuleS";
import { PlayerModuleC } from "./modules/Player/PlayerModuleC";
import { PlayerModuleData } from "./modules/Player/PlayerModuleData";
import TimeModuleS from "./modules/Time/TimeModuleS";
import TimeModuleC from "./modules/Time/TimeModuleC";
import { SceneUnitModuleS } from "./modules/SceneUnitModule/SceneUnitModuleS";
import { SceneUnitModuleC } from "./modules/SceneUnitModule/SceneUnitModuleC";
import { SportModuleS } from "./modules/Sport/SportModuleS";
import { SportModuleC } from "./modules/Sport/SportModuleC";
import EditorMainStart from "./Tool/AnimationEditor/EditorMainStart";
import BagModuleS from "./modules/Bag/BagModuleS";
import BagModuleC from "./modules/Bag/BagModuleC";
import PropModuleS from "./modules/Prop/PropModuleS";
import PropModuleC from "./modules/Prop/PropModuleC";
import FindModuleC from "./modules/Find/FindModuleC";
import FindModuleS from "./modules/Find/FindModuleS";
import SceneModuleS from "./modules/Scene/SceneModuleS";
import SceneModuleC from "./modules/Scene/SceneModuleC";
import DeadCountModuleC from "./modules/DeadCount/DeadCountModuleC";
import DeadCountModuleS from "./modules/DeadCount/DeadCountModuleS";
import BagModuleData from "./modules/Bag/BagModuleData";
import { AnalyticsModuleC, AnalyticsModuleS } from "./modules/Analytics/AnalyticsModule";
import { AnalyticsData } from "./modules/Analytics/AnalyticsData";
import { WeaponModuleC } from "./modules/weaponModule/WeaponModuleC";
import { WeaponModuleS } from "./modules/weaponModule/WeaponModuleS";
import GuideModuleS from "./modules/Guide/GuideModuleS";
import GuideModuleC from "./modules/Guide/GuideModuleC";
import GuideModuleData from "./modules/Guide/GuideModuleData";
import { ShopModuleS } from "./modules/Shop/ShopModuleS";
import { ShopModuleC } from "./modules/Shop/ShopModuleC";
import { ShopData } from "./modules/Shop/ShopData";
import { MonsterChangeS } from "./modules/ChangeMonster/MonsterChangeS";
import { MonsterChangeC } from "./modules/ChangeMonster/MonsterChangeC";
import PlayerAssetModuleData from "./modules/PlayerAsset/PlayerAssetMData";
import PlayerAssetModuleS from "./modules/PlayerAsset/PlayerAssetModuleS";
import PlayerAssetModuleC from "./modules/PlayerAsset/PlayerAssetModuleC";
import TSIAP from "./modules/Shop/IAPInstance";
import { RedDotModuleC, RedDotModuleS } from "module_reddot";
import TeamS from "./modules/Team/TeamS";
import TeamC from "./modules/Team/TeamC";
import BattlePassModuleS from "./modules/BattlePass/BattlePassModuleS";
import BattlePassModuleC from "./modules/BattlePass/BattlePassModuleC";
import BattlePassModuleData from "./modules/BattlePass/BattlePassModuleData";
import { ShareData, ShareModuleC, ShareModuleS } from "./modules/Share/ShareModule";
import DressUpModuleS from "./modules/DressUp/DressUpModuleS";
import DressUpModuleC from "./modules/DressUp/DressUpModuleC";
import DressUpModuleData from "./modules/DressUp/DressUpModuleData";
import { TeamData } from "./modules/Team/TeamData";
import DanceModuleS from "./modules/Dance/DanceModuleS";
import DanceModuleC from "./modules/Dance/DanceModuleC";
import { LotteryModuleC, LotteryModuleData, LotteryModuleS } from "./modules/Lottery/LotteryModule";
import PropModuleData from "./modules/Prop/PropModuleData";


@Component
export default class GameStart extends mw.Script {

    @mw.Property()
    private isOnline: boolean = false;

    @mw.Property({ displayName: "是否开启主页GM开关按钮" })
    private isOpenGm = false;
    @mw.Property({ displayName: "是否开启主页动画编辑器" })
    private isOpenAni = false;
    @mw.Property({ displayName: "是否开启事件统计" })
    private isOpenEvent = false;
    @mw.Property({ displayName: "是否开启活动模式" })
    private isOpenActivity = true;

    @mw.Property({ displayName: "语言类型", group: "Odin设置", selectOptions: { "系统默认": "-1", "English": "0", "简体中文": "1", "日本語": "2", "Deutsch": "3" } })
    private selectedLanguageIndex: string = "-1";

    @mw.Property({ displayName: "Log级别", group: "Odin设置", selectOptions: { "None": "0", "Error": "1", "Warn": "2", "Log": "3" } })
    private logLevel: string = "0";



    override async onStart() {
        if (this.isOpenEvent) {
            EventsTool.start();
        }
        if (this.isOpenAni) {
            Script.spawnScript(EditorMainStart);
        }
        TSIAP.instance.init()
        GlobalData.Global.isShowGM = this.isOpenGm;
        GlobalData.Global.isOpenActivity = this.isOpenActivity;
        GlobalData.Global.selectedLanguageIndex = Number(this.selectedLanguageIndex);

        this.onRegisterModule();

        DataStorage.setTemporaryStorage(!this.isOnline);
        if (mw.SystemUtil.isClient()) {
            if (GlobalData.Global.selectedLanguageIndex == -1) {
                GlobalData.Global.selectedLanguageIndex = this.getSystemLanguageIndex();
            }
            //初始化表格语言
            GameConfig.initLanguage(Number(this.selectedLanguageIndex), (key) => {
                let ele = GameConfig.Language.getElement(key);
                if (ele == null)
                    return "unknow_" + key;
                return ele.Value;
            });
            mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
                if (ui == null) return;
                let key: string = ui.text;
                if (key == null) return;
                let langueConfig = GameConfig.Language.findElement("Name", key);
                if (!langueConfig) {
                    return;
                }
                ui.text = langueConfig.Value;
            });
        }

        this.useUpdate = true;

        if (SystemUtil.isClient()) {
            if (this.isOpenGm) {
                GM.start(GMBasePanelUI);
                return;
            }
            GM.checkAuthority((res) => {
                if (res) {
                    GM.start(GMBasePanelUI);
                }
            })

        }
    }
    //获取系统语言索引
    private getSystemLanguageIndex(): number {
        let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
    }

    protected onRegisterModule(): void {
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerModuleData);
        ModuleService.registerModule(TeamS, TeamC, TeamData);
        ModuleService.registerModule(ShareModuleS, ShareModuleC, ShareData);
        ModuleService.registerModule(GameModule_Server, GameModule_Client, null);
        ModuleService.registerModule(TimeModuleS, TimeModuleC, null);
        ModuleService.registerModule(SceneUnitModuleS, SceneUnitModuleC, null);
        ModuleService.registerModule(SportModuleS, SportModuleC, null);
        ModuleService.registerModule(BagModuleS, BagModuleC, BagModuleData);
        ModuleService.registerModule(PropModuleS, PropModuleC, PropModuleData);
        ModuleService.registerModule(FindModuleS, FindModuleC, null);
        ModuleService.registerModule(SceneModuleS, SceneModuleC, null);
        ModuleService.registerModule(DeadCountModuleS, DeadCountModuleC, null)
        ModuleService.registerModule(AnalyticsModuleS, AnalyticsModuleC, AnalyticsData);
        ModuleService.registerModule(WeaponModuleS, WeaponModuleC, null)
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideModuleData);
        ModuleService.registerModule(ShopModuleS, ShopModuleC, ShopData);
        ModuleService.registerModule(MonsterChangeS, MonsterChangeC, null);
        ModuleService.registerModule(RedDotModuleS, RedDotModuleC, null);
        ModuleService.registerModule(DanceModuleS, DanceModuleC, null);
        ModuleService.registerModule(LotteryModuleS, LotteryModuleC, LotteryModuleData);
        ModuleService.registerModule(DressUpModuleS, DressUpModuleC, DressUpModuleData)
        ModuleService.registerModule(PlayerAssetModuleS, PlayerAssetModuleC, PlayerAssetModuleData);
        ModuleService.registerModule(BattlePassModuleS, BattlePassModuleC, BattlePassModuleData);
        // EventsTool.start(3000, 1);
    }

    /**
     * 手动初始化客户端(如果没有勾选自动初始化，会调用这个方法)
     */
    protected async onInitClientByHand() {
        await DataCenterC.ready();
        await Player.asyncGetLocalPlayer();
    }

}