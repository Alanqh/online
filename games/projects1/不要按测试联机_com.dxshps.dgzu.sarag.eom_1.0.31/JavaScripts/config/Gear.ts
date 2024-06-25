import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","EffectID","EffectLocation","EffectRotate","EffectLarge","EffectTime","ColorValue","SoundId","Notice","hitRecoverId"],["","","","","","","","","",""],[10000,"153599",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,"#F9FFFF",10005,"受击效果1",0]];
export interface IGearElement extends IElementBase{
 	/**id*/
	Id:number
	/**特效id*/
	EffectID:string
	/**特效偏移*/
	EffectLocation:mw.Vector
	/**特效旋转*/
	EffectRotate:mw.Vector
	/**特效缩放*/
	EffectLarge:mw.Vector
	/**特效时间（循环方式(0为无限*/
	EffectTime:number
	/** 正数为循环次数，负数为循环时间(单位:秒)) default: 1）*/
	ColorValue:string
	/**颜色值*/
	SoundId:number
	/**音效配置id*/
	Notice:string
	/**备注*/
	hitRecoverId:number
 } 
export class GearConfig extends ConfigBase<IGearElement>{
	constructor(){
		super(EXCELDATA);
	}

}