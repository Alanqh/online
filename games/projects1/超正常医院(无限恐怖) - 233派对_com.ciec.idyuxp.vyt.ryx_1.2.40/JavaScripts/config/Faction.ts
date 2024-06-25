import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","MountPoint","Type","Offset","Damage","Animation","Effect","EffectOffset"],["","","","","","","",""],[7001,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2)],10,6005,null,null],[7002,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2)],-10,6006,null,null],[7003,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1)],10,6005,null,null],[7004,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1)],-10,6006,null,null],[7005,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.05,0.05,0.05)],10,6005,null,null],[7006,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.05,0.05,0.05)],-10,6006,null,null],[7007,16,0,[new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.5,0.5,0.5)],60,6003,null,null],[7008,16,0,[new mw.Vector(21.04,-0.63,30.62),new mw.Vector(0,-302.85,-0.14),new mw.Vector(0.1,0.1,0.1)],10,6003,null,null]];
export interface IFactionElement extends IElementBase{
 	/**ID*/
	id:number
	/**挂点*/
	MountPoint:number
	/**类型*/
	Type:number
	/**偏移值，顺序为：位置|旋转|尺寸*/
	Offset:mw.Vector[]
	/**伤害值*/
	Damage:number
	/**动画*/
	Animation:number
	/**特效*/
	Effect:string
	/**特效挂点偏移*/
	EffectOffset:Array<string>
 } 
export class FactionConfig extends ConfigBase<IFactionElement>{
	constructor(){
		super(EXCELDATA);
	}

}