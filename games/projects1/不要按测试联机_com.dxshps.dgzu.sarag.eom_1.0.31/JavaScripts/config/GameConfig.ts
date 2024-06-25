import {ConfigBase, IElementBase} from "./ConfigBase";
import {AIAvatarConfig} from "./AIAvatar";
import {AINameConfig} from "./AIName";
import {AssetGameConfig} from "./AssetGame";
import {AssetsConfig} from "./Assets";
import {ChatConfig} from "./Chat";
import {DecorationConfig} from "./Decoration";
import {EffectConfig} from "./Effect";
import {ElasticityConfig} from "./Elasticity";
import {GearConfig} from "./Gear";
import {GlobalConfig} from "./Global";
import {HitRecoverConfig} from "./HitRecover";
import {LanguageConfig} from "./Language";
import {LevelConfig} from "./Level";
import {LightConfig} from "./Light";
import {PetAnimationConfig} from "./PetAnimation";
import {PetGameConfig} from "./PetGame";
import {PetStatConfig} from "./PetStat";
import {PetUpgradesConfig} from "./PetUpgrades";
import {PetConfig} from "./Pet";
import {PlayerGradeConfig} from "./PlayerGrade";
import {RuleGameConfig} from "./RuleGame";
import {ShopConfig} from "./Shop";
import {SoundConfig} from "./Sound";
import {TextConfig} from "./Text";
import {TimeConfig} from "./Time";
import {TipsConfig} from "./Tips";
import {ToolGameConfig} from "./ToolGame";
import {ToolStatConfig} from "./ToolStat";

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
	public static get AIAvatar():AIAvatarConfig{ return this.getConfig(AIAvatarConfig) };
	public static get AIName():AINameConfig{ return this.getConfig(AINameConfig) };
	public static get AssetGame():AssetGameConfig{ return this.getConfig(AssetGameConfig) };
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Chat():ChatConfig{ return this.getConfig(ChatConfig) };
	public static get Decoration():DecorationConfig{ return this.getConfig(DecorationConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get Elasticity():ElasticityConfig{ return this.getConfig(ElasticityConfig) };
	public static get Gear():GearConfig{ return this.getConfig(GearConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get HitRecover():HitRecoverConfig{ return this.getConfig(HitRecoverConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Level():LevelConfig{ return this.getConfig(LevelConfig) };
	public static get Light():LightConfig{ return this.getConfig(LightConfig) };
	public static get PetAnimation():PetAnimationConfig{ return this.getConfig(PetAnimationConfig) };
	public static get PetGame():PetGameConfig{ return this.getConfig(PetGameConfig) };
	public static get PetStat():PetStatConfig{ return this.getConfig(PetStatConfig) };
	public static get PetUpgrades():PetUpgradesConfig{ return this.getConfig(PetUpgradesConfig) };
	public static get Pet():PetConfig{ return this.getConfig(PetConfig) };
	public static get PlayerGrade():PlayerGradeConfig{ return this.getConfig(PlayerGradeConfig) };
	public static get RuleGame():RuleGameConfig{ return this.getConfig(RuleGameConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get Text():TextConfig{ return this.getConfig(TextConfig) };
	public static get Time():TimeConfig{ return this.getConfig(TimeConfig) };
	public static get Tips():TipsConfig{ return this.getConfig(TipsConfig) };
	public static get ToolGame():ToolGameConfig{ return this.getConfig(ToolGameConfig) };
	public static get ToolStat():ToolStatConfig{ return this.getConfig(ToolStatConfig) };
}