import {ConfigBase, IElementBase} from "./ConfigBase";
import {AnimationConfig} from "./Animation";
import {AudioConfig} from "./Audio";
import {ChatConfig} from "./Chat";
import {DressTabConfig} from "./DressTab";
import {DressConfig} from "./Dress";
import {EffectConfig} from "./Effect";
import {EyeMonstConfig} from "./EyeMonst";
import {FactionConfig} from "./Faction";
import {GamePassLevelConfig} from "./GamePassLevel";
import {GamePassRewaridConfig} from "./GamePassRewarid";
import {ItemPointConfig} from "./ItemPoint";
import {ItemConfig} from "./Item";
import {LanguageConfig} from "./Language";
import {LotteryConfig} from "./Lottery";
import {LotteryFirstRewardConfig} from "./LotteryFirstReward";
import {MonstersConfig} from "./Monsters";
import {NameTitleConfig} from "./NameTitle";
import {nBulletConfig} from "./nBullet";
import {NightmareRuleConfig} from "./NightmareRule";
import {NPCAnimationConfig} from "./NPCAnimation";
import {nWeaponConfig} from "./nWeapon";
import {PropActionConfig} from "./PropAction";
import {ScreenshowConfig} from "./Screenshow";
import {ShopItemConfig} from "./ShopItem";
import {ShopConfig} from "./Shop";
import {SkillConfig} from "./Skill";
import {TaskConfig} from "./Task";
import {TeleportConfig} from "./Teleport";
import {TimeTurnConfig} from "./TimeTurn";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Animation():AnimationConfig{ return this.getConfig(AnimationConfig) };
	public static get Audio():AudioConfig{ return this.getConfig(AudioConfig) };
	public static get Chat():ChatConfig{ return this.getConfig(ChatConfig) };
	public static get DressTab():DressTabConfig{ return this.getConfig(DressTabConfig) };
	public static get Dress():DressConfig{ return this.getConfig(DressConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get EyeMonst():EyeMonstConfig{ return this.getConfig(EyeMonstConfig) };
	public static get Faction():FactionConfig{ return this.getConfig(FactionConfig) };
	public static get GamePassLevel():GamePassLevelConfig{ return this.getConfig(GamePassLevelConfig) };
	public static get GamePassRewarid():GamePassRewaridConfig{ return this.getConfig(GamePassRewaridConfig) };
	public static get ItemPoint():ItemPointConfig{ return this.getConfig(ItemPointConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Lottery():LotteryConfig{ return this.getConfig(LotteryConfig) };
	public static get LotteryFirstReward():LotteryFirstRewardConfig{ return this.getConfig(LotteryFirstRewardConfig) };
	public static get Monsters():MonstersConfig{ return this.getConfig(MonstersConfig) };
	public static get NameTitle():NameTitleConfig{ return this.getConfig(NameTitleConfig) };
	public static get nBullet():nBulletConfig{ return this.getConfig(nBulletConfig) };
	public static get NightmareRule():NightmareRuleConfig{ return this.getConfig(NightmareRuleConfig) };
	public static get NPCAnimation():NPCAnimationConfig{ return this.getConfig(NPCAnimationConfig) };
	public static get nWeapon():nWeaponConfig{ return this.getConfig(nWeaponConfig) };
	public static get PropAction():PropActionConfig{ return this.getConfig(PropActionConfig) };
	public static get Screenshow():ScreenshowConfig{ return this.getConfig(ScreenshowConfig) };
	public static get ShopItem():ShopItemConfig{ return this.getConfig(ShopItemConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get Teleport():TeleportConfig{ return this.getConfig(TeleportConfig) };
	public static get TimeTurn():TimeTurnConfig{ return this.getConfig(TimeTurnConfig) };
}