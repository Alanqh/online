import {ConfigBase, IElementBase} from "./ConfigBase";
import {AINameConfig} from "./AIName";
import {AIPassConfig} from "./AIPass";
import {AvatarAIConfig} from "./AvatarAI";
import {CameraConfigConfig} from "./CameraConfig";
import {ChatWordConfig} from "./ChatWord";
import {ChooseInfoConfig} from "./ChooseInfo";
import {CommonEffectConfig} from "./CommonEffect";
import {EffectConfig} from "./Effect";
import {GameCfgConfig} from "./GameCfg";
import {GameInfoConfig} from "./GameInfo";
import {GameVersionConfig} from "./GameVersion";
import {GearConfig} from "./Gear";
import {ItemConfig} from "./Item";
import {LanguageConfig} from "./Language";
import {MoverGuidsConfig} from "./MoverGuids";
import {SettleConfig} from "./Settle";
import {SkillConfig} from "./Skill";
import {SwoopConfig} from "./Swoop";
import {TipsxConfig} from "./Tipsx";
import {UILanConfig} from "./UILan";
import {VerCfgConfig} from "./VerCfg";
import {VoiceConfig} from "./Voice";
import {WallPosConfig} from "./WallPos";

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
	public static get AIName():AINameConfig{ return this.getConfig(AINameConfig) };
	public static get AIPass():AIPassConfig{ return this.getConfig(AIPassConfig) };
	public static get AvatarAI():AvatarAIConfig{ return this.getConfig(AvatarAIConfig) };
	public static get CameraConfig():CameraConfigConfig{ return this.getConfig(CameraConfigConfig) };
	public static get ChatWord():ChatWordConfig{ return this.getConfig(ChatWordConfig) };
	public static get ChooseInfo():ChooseInfoConfig{ return this.getConfig(ChooseInfoConfig) };
	public static get CommonEffect():CommonEffectConfig{ return this.getConfig(CommonEffectConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get GameCfg():GameCfgConfig{ return this.getConfig(GameCfgConfig) };
	public static get GameInfo():GameInfoConfig{ return this.getConfig(GameInfoConfig) };
	public static get GameVersion():GameVersionConfig{ return this.getConfig(GameVersionConfig) };
	public static get Gear():GearConfig{ return this.getConfig(GearConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get MoverGuids():MoverGuidsConfig{ return this.getConfig(MoverGuidsConfig) };
	public static get Settle():SettleConfig{ return this.getConfig(SettleConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get Swoop():SwoopConfig{ return this.getConfig(SwoopConfig) };
	public static get Tipsx():TipsxConfig{ return this.getConfig(TipsxConfig) };
	public static get UILan():UILanConfig{ return this.getConfig(UILanConfig) };
	public static get VerCfg():VerCfgConfig{ return this.getConfig(VerCfgConfig) };
	public static get Voice():VoiceConfig{ return this.getConfig(VoiceConfig) };
	public static get WallPos():WallPosConfig{ return this.getConfig(WallPosConfig) };
}