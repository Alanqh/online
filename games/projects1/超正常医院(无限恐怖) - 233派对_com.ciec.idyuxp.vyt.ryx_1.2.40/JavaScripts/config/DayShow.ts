import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","AppearanceGUID","pos","ani","aniToNight"],["","","","",""],[1,"211774",new mw.Vector(-1735,1285,20),"26","25"],[2,"211774",new mw.Vector(-5260,4150,20,),"27","25"],[3,"211774",new mw.Vector(-1790,-2805,20,),"28","25"],[4,"211774",new mw.Vector(-10,2900,20,),"29","25"],[5,"211774",new mw.Vector(-1105,-1095,20),"30","25"]];
export interface IDayShowElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**换装资源
白天*/
	AppearanceGUID:string
	/**出生点*/
	pos:mw.Vector
	/**姿态动作*/
	ani:string
	/**白天切晚上动作*/
	aniToNight:string
 } 
export class DayShowConfig extends ConfigBase<IDayShowElement>{
	constructor(){
		super(EXCELDATA);
	}

}