import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","light","sound","time"],["","tag","tag","tag"],[1,1,10,1,"TangentialForce"],[2,1,10,0.8,"上下平移杠杆"],[3,1,10,0.8,"变速旋转栏杆0"],[4,2,10,1,"摆锤"],[5,1,10,0.8,"旋转栅栏"],[6,1,10,0.8,"移动圆柱"],[7,1,10,0.8,"转盘-栏杆0 "],[8,1,10,1,"RadialDirForce"],[9,3,9,0.1,"弹力地板/蹦床"],[10,0,10,1,"土星 "],[11,1,10,0.8,"左右平移圆柱 "],[12,2,10,1,"摆锤无脚本"],[13,4,10,1.5,"大炮"],[14,1,10,0,"Roadblock脚本"]];
export interface IGearElement extends IElementBase{
 	/**id*/
	id:number
	/**特效配置*/
	light:number
	/**音效配置*/
	sound:number
	/**失控时间(秒)*/
	time:number
 } 
export class GearConfig extends ConfigBase<IGearElement>{
	constructor(){
		super(EXCELDATA);
	}

}