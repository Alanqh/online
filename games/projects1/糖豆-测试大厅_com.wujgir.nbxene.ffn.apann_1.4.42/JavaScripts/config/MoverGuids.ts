import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guid"],["",""],[1,"123"]];
export interface IMoverGuidsElement extends IElementBase{
 	/**id*/
	id:number
	/**运动器guid*/
	guid:string
 } 
export class MoverGuidsConfig extends ConfigBase<IMoverGuidsElement>{
	constructor(){
		super(EXCELDATA);
	}

}