import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","DESC","yawAngle","pitchAngle","directionalLightIntensity","directionalLightColor","temperatureEnabled","temperature","skyLightIntensity","skyLightColor","ev100","castShadowsEnabled","shadowsDistance","lightColor","skyBoxPre","skyDomeTextureID","skyDomeIntensity","SkyYawAngle","skyDomeBaseColor","skyDomeGradientEnabled","skyDomeTopColor","skyDomeMiddleColor","skyDomeBottomColor","skyDomeHorizontalFallOff","starVisible","starTextureID","starIntensity","starDensity","sunVisible","sunTextureID","sunIntensity","sunColor","sunSize","moonVisible","moonTextureID","moonIntensity","moonColor","cloudVisible","cloudTextureID","cloudOpacity","cloudColor","cloudDensity","cloudSpeed","Enabled","fogPreset","density","heightFalloff","height","inscatteringColor","maxOpacity","startDistance","directionalInscatteringExponent","directionalInscatteringStartDistance","directionalInscatteringColor"],["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],[1,"游戏内",18.14,-31,5,"FF000000",true,7000,30,"F4C6BC00",0.5,true,3000,"87A2C7FF",1,"14307",3.88,0,"FFFFFFFF",true,"2F3245FF","C2DAFFFF","9194A6FF",3,true,"14307",0.5,10,false,null,0,null,0,true,"233556",100,"870A00FF",false,null,0,null,0,0,true,2,0.66,0.51,1949.84,"000000FF",1,0,2,10000,"000000FF"],[2,"商店界面",-52,-30,10,"FFFFFF00",false,5800,30,"FFFFFF00",-1,false,2500,"C7C7C7FF",1,"14304",0.2,0,"996053FF",true,"8C5B54FF","000000FF","FC4F00FF",4.76,false,null,1,10,false,"14309",40,"FFE2B6FF",9,true,"95626",1,"FF0000FF",true,"31970",1,"000000FF",1,1,true,2,0.8,1,1000,"1000",1,1200,4,10000,"10000"]];
export interface IHomeWeatherElement extends IElementBase{
 	/**ID*/
	id:number
	/**备注*/
	DESC:string
	/**朝向角度*/
	yawAngle:number
	/**俯仰角度*/
	pitchAngle:number
	/**平行光强度*/
	directionalLightIntensity:number
	/**平行光颜色*/
	directionalLightColor:string
	/**是否开启色温*/
	temperatureEnabled:boolean
	/**色温*/
	temperature:number
	/**天光强度*/
	skyLightIntensity:number
	/**天光颜色*/
	skyLightColor:string
	/**曝光补偿*/
	ev100:number
	/**投射阴影*/
	castShadowsEnabled:boolean
	/**阴影距离*/
	shadowsDistance:number
	/**偏色值*/
	lightColor:string
	/**天空球预设*/
	skyBoxPre:number
	/**天空盒贴图*/
	skyDomeTextureID:string
	/**天空盒亮度*/
	skyDomeIntensity:number
	/**天空盒贴图旋转*/
	SkyYawAngle:number
	/**天空盒整体颜色*/
	skyDomeBaseColor:string
	/**是否开启渐变*/
	skyDomeGradientEnabled:boolean
	/**天空球顶层颜色*/
	skyDomeTopColor:string
	/**天空球上层颜色*/
	skyDomeMiddleColor:string
	/**天空球下层颜色*/
	skyDomeBottomColor:string
	/**地平线渐出*/
	skyDomeHorizontalFallOff:number
	/**是否开启星星*/
	starVisible:boolean
	/**星星贴图*/
	starTextureID:string
	/**星星亮度*/
	starIntensity:number
	/**星星密度*/
	starDensity:number
	/**是否开启太阳*/
	sunVisible:boolean
	/**太阳贴图*/
	sunTextureID:string
	/**太阳亮度*/
	sunIntensity:number
	/**太阳颜色*/
	sunColor:string
	/**太阳大小*/
	sunSize:number
	/**是否开启月亮*/
	moonVisible:boolean
	/**月亮贴图*/
	moonTextureID:string
	/**月亮亮度*/
	moonIntensity:number
	/**月亮颜色*/
	moonColor:string
	/**是否开启云*/
	cloudVisible:boolean
	/**云贴图*/
	cloudTextureID:string
	/**云透明度*/
	cloudOpacity:number
	/**云颜色*/
	cloudColor:string
	/**云密度*/
	cloudDensity:number
	/**云速度*/
	cloudSpeed:number
	/**是否启用雾*/
	Enabled:boolean
	/**雾效预设*/
	fogPreset:number
	/**雾密度*/
	density:number
	/**雾高度衰弱*/
	heightFalloff:number
	/**雾高度*/
	height:number
	/**雾散射颜色*/
	inscatteringColor:string
	/**最大透明度*/
	maxOpacity:number
	/**起始距离*/
	startDistance:number
	/**太阳光散射指数*/
	directionalInscatteringExponent:number
	/**太阳光散射初始距离*/
	directionalInscatteringStartDistance:number
	/**太阳光散射颜色*/
	directionalInscatteringColor:string
 } 
export class HomeWeatherConfig extends ConfigBase<IHomeWeatherElement>{
	constructor(){
		super(EXCELDATA);
	}

}