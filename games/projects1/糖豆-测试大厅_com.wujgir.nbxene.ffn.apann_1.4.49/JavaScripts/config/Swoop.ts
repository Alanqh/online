import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","Value"],["","",""],[1,"飞扑冲量",300],[2,"制动速度",2048],[3,"平地制动系数",0.5],[4,"上坡制动系数",5],[5,"下坡制动系数",8],[6,"滑行最低速度V",350],[7,"飞扑时再飞扑冲量系数",1],[8,"滑行加速度系数",0.5],[9,"滑行下落制动速度",0],[10,"滑行转向速度",2000],[11,"飞扑初速度",250],[12,"向上冲量系数",0],[13,"向前冲量系数",1],[14,"滑行最大速度",1000],[15,"重力加速度",2048],[16,"摄像机位置延迟速度",10],[17,"摄像机位置延迟距离",100],[18,"最大下落速度",1500],[19,"下落控制",0.4],[20,"下落控制乘数",25],[21,"下落控制提升速度阈值",25],[22,"重力倍率",0.75],[23,"最大跳跃高度",200],[24,"地面最大行走速度",450]];
export interface ISwoopElement extends IElementBase{
 	/**id*/
	id:number
	/**参数名*/
	name:string
	/**取值*/
	Value:number
 } 
export class SwoopConfig extends ConfigBase<ISwoopElement>{
	constructor(){
		super(EXCELDATA);
	}

}