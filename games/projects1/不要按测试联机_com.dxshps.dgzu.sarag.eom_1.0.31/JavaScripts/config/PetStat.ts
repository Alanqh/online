import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","guid","Pos","Rot","Scale","AbleUpgrade"],["","","","","","","",""],[10001,"宠物移动速度",400,null,null,null,null,1],[10002,"宠物跳跃高度",150,null,null,null,null,0],[10003,"宠物转向速度",400,null,null,null,null,0],[20001,"飞扑期间制动速率",1000,null,null,null,null,0],[20002,"飞扑地面冲量",800,null,null,null,null,0],[20003,"飞扑空中冲量",750,null,null,null,null,0],[20004,"飞扑空中转向速度",5,null,null,null,null,0],[20005,"飞扑持续时间",0.3,null,null,null,null,0],[20006,"平地摔硬直时间",0.6,null,null,null,null,0],[20007,"飞扑下落控制",0.1,null,null,null,null,0],[30001,"冲刺移动速度增量",400,null,null,null,null,0],[30002,"冲刺最大加速度",1400,null,null,null,null,1],[30003,"冲刺冷却时间",15,null,null,null,null,1],[30004,"冲刺持续时间",3.5,null,null,null,null,1],[30005,"冲刺最大转向速度",110,null,null,null,null,0],[30006,"冲刺地面摩擦力",0.7,null,null,null,null,0],[40001,"小硬直持续时间",0.6,null,null,null,null,0],[40002,"小硬直下限",500,null,null,null,null,0],[40003,"大硬直持续时间",0.8,null,null,null,null,0],[40004,"大硬直下限",1000,null,null,null,null,0]];
export interface IPetStatElement extends IElementBase{
 	/**序号*/
	ID:number
	/**描述*/
	Name:string
	/**数值*/
	Value:number
	/**GUID*/
	guid:string
	/**偏移*/
	Pos:mw.Vector
	/**旋转*/
	Rot:mw.Vector
	/**缩放*/
	Scale:mw.Vector
	/**是否可以升级
0否，1是*/
	AbleUpgrade:number
 } 
export class PetStatConfig extends ConfigBase<IPetStatElement>{
	constructor(){
		super(EXCELDATA);
	}

}