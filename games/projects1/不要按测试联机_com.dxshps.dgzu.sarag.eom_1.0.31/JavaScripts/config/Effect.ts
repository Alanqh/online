import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","EffectID","EffectPoint","EffectLocation","EffectRotate","EffectLarge","EffectTime","ColorValue","Notice"],["","","","","","","","",""],[10001,"27711",-1,new mw.Vector(0,24,130),new mw.Vector(-20,0,0),new mw.Vector(1,1,1),99999,null,"洗澡花洒特效"],[10002,"174250",-1,new mw.Vector(6,-10,32),new mw.Vector(-35,-20,0),new mw.Vector(1,1,1),99999,null,"舞台射灯特效"],[10003,"107629",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.2,1.2,0.5),99999,null,"广场井盖触发光圈"],[10004,"126018",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1),1,null,"投篮中彩带特效"],[10005,"14332",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.5,0.5,0.5),1,null,"进入泳池时的水花"],[10006,"78671",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),0,null,"废弃"],[10007,"186074",23,new mw.Vector(0,0,70),new mw.Vector(0,0,0),new mw.Vector(0.5,0.5,0.5),99999,null,"泳池中，水拖尾特效，人形"],[10008,"186074",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.5,0.5,0.5),99999,null,"泳池中，水拖尾特效，四足"],[20001,"113922",23,new mw.Vector(0,0,40),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,null,"游戏 - 淘汰玩家特效"],[20002,"145501",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,null,"游戏 - 晋级玩家特效"],[20003,"153616",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2.5,2.5,2.5),1,null,"游戏 - 玩家存档及复活特效"],[20004,"128516",0,null,null,null,0,null,null],[30001,"287126",0,new mw.Vector(0,0,5),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-99999,null,"受击泡泡宠物"],[30002,"287126",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),-99999,null,"受击泡泡玩家"],[30003,"151559",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),1,null,"受击雪球炸弹"]];
export interface IEffectElement extends IElementBase{
 	/**唯一id*/
	ID:number
	/**特效id*/
	EffectID:string
	/**特效挂点*/
	EffectPoint:number
	/**特效偏移*/
	EffectLocation:mw.Vector
	/**特效旋转*/
	EffectRotate:mw.Vector
	/**特效缩放*/
	EffectLarge:mw.Vector
	/**特效时间（循环方式(99999为无限*/
	EffectTime:number
	/** 正数为循环次数，负数为循环时间(单位:秒)) default: 1）*/
	ColorValue:string
	/**颜色值*/
	Notice:string
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}