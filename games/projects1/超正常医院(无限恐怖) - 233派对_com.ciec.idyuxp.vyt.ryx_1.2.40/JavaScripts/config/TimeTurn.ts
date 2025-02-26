import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","SkyDomePreinstall","Picture","skyDomeIntensity","SkyDomeColor","skyDomeTopTint","skyDomeHorizontalTint","skyDomeBotTint","cloudTint","starIntensity","moonIntensity","moonColor","moonPicture","moonSize","Orientation","Pitching","ParallelLight","ParallelLightColor","lightColor","lightIntensity","ColorTemperature","ExposureCompensation","ShadowDistance","fog","fogDensity","fogAbate","fogColor","fogHeight","fogBeginDistance","PostPorssesPreinstall","Floodlight","Saturability","Contrast"],["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],[1,1,"182108",0.5,"#C7DBFFFF","#006AC6FF","#5399E1FF","#FFEEE1FF",null,0,0,null,null,0,20,-40,1.4,"#FFFFFF00","#FFFFFF",1,5800,-1.5,3000,0,0,0,null,0,0,2,1.1,1.1,1.2],[2,4,"182106",0.5,"#B288ACFF","#2F3245FF","#5B6677FF","#9194A6FF",null,0,0,null,null,0,20,-31,2,"#FFFFFF00","#FFFFFF",1,7000,-1,1500,1,0.2,1,"#ABBDB8FF",2000,120,5,1,1.5,1.2],[3,4,"108341",1,"#FFFFFFFF","#9000A3FF","#F45FE2FF","#615EA6FF",null,0,30,"B60032FF","95620",30,-27,-26,4.29,"#E8AFEF","#FFFFFF",1,7000,-1,3000,1,0.1,1,"#B196D7",2000,50,7,1.2,1.39,1.2]];
export interface ITimeTurnElement extends IElementBase{
 	/**唯一ID
1.白天
2.夜晚*/
	ID:number
	/**天空球预设
1.清晨
2.中午
3.黄昏
4.夜晚*/
	SkyDomePreinstall:number
	/**天空球贴图*/
	Picture:string
	/**天空球亮度*/
	skyDomeIntensity:number
	/**天空球整体颜色*/
	SkyDomeColor:string
	/**天空球顶层颜色*/
	skyDomeTopTint:string
	/**天空球上层颜色*/
	skyDomeHorizontalTint:string
	/**天空球下层颜色*/
	skyDomeBotTint:string
	/**云颜色*/
	cloudTint:string
	/**星星亮度*/
	starIntensity:number
	/**月亮亮度*/
	moonIntensity:number
	/**月亮颜色*/
	moonColor:string
	/**月亮图片*/
	moonPicture:string
	/**月亮尺寸*/
	moonSize:number
	/**朝向角度*/
	Orientation:number
	/**俯仰角度*/
	Pitching:number
	/**平行光强度*/
	ParallelLight:number
	/**平行光颜色*/
	ParallelLightColor:string
	/**光颜色*/
	lightColor:string
	/**光照强度*/
	lightIntensity:number
	/**色温*/
	ColorTemperature:number
	/**曝光补偿*/
	ExposureCompensation:number
	/**阴影距离*/
	ShadowDistance:number
	/**是否开启雾气*/
	fog:number
	/**雾密度*/
	fogDensity:number
	/**雾高度衰减*/
	fogAbate:number
	/**雾散射颜色*/
	fogColor:string
	/**雾高度*/
	fogHeight:number
	/**雾起始距离*/
	fogBeginDistance:number
	/**后处理预设
1.梦境
2.反差色
3.暖阳
4.老照片
5.夜幕
6.鲜暖色
7.默认*/
	PostPorssesPreinstall:number
	/**泛光*/
	Floodlight:number
	/**全局饱和度*/
	Saturability:number
	/**全局对比度*/
	Contrast:number
 } 
export class TimeTurnConfig extends ConfigBase<ITimeTurnElement>{
	constructor(){
		super(EXCELDATA);
	}

}