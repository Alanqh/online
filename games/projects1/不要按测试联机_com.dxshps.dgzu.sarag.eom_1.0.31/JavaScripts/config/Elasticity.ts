import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Speed","Frequency","Amplitude","RockTime","ElasticityTime","RockScale","ScaleMultXY","ImpulseTime","EffectGuid","EffectColor","EffectPos","EffectRot","EffectScale","EffectTime","VoiceGuid","VoiceTime","Volume"],["","","","","","","","","","","\n","","","","","","",""],[10001,8,3,3,0.5,0.1,2,0.5,0.1,"89563","#F9FFFF",new mw.Vector(0,0,50),new mw.Vector(0,0,0),new mw.Vector(1,1,0.5),0.1,"148668",0.1,1]];
export interface IElasticityElement extends IElementBase{
 	/**序号*/
	ID:number
	/**蹦床震荡衰减/增益速度*/
	Speed:number
	/**蹦床震荡频率*/
	Frequency:number
	/**蹦床震荡幅度*/
	Amplitude:number
	/**蹦床晃动时间（单位秒）*/
	RockTime:number
	/**蹦床延迟时间（单位秒）*/
	ElasticityTime:number
	/**蹦床变化缩放*/
	RockScale:number
	/**xy衰减幅度调整*/
	ScaleMultXY:number
	/**冲量延迟时间（单位秒）*/
	ImpulseTime:number
	/**特效Guid*/
	EffectGuid:string
	/**特效颜色*/
	EffectColor:string
	/**特效偏移xyz*/
	EffectPos:mw.Vector
	/**特效旋转xyz*/
	EffectRot:mw.Vector
	/**特效缩放xyz*/
	EffectScale:mw.Vector
	/**特效延迟时间（单位秒）*/
	EffectTime:number
	/**音效Guid*/
	VoiceGuid:string
	/**音效延迟时间（单位秒）*/
	VoiceTime:number
	/**蹦床音效音量*/
	Volume:number
 } 
export class ElasticityConfig extends ConfigBase<IElasticityElement>{
	constructor(){
		super(EXCELDATA);
	}

}