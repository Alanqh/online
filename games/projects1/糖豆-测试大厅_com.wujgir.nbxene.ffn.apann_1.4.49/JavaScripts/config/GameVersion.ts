import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","version"],["",""],[1,"V1.12.0"]];
export interface IGameVersionElement extends IElementBase{
 	/**id*/
	id:number
	/**版本*/
	version:string
 } 
export class GameVersionConfig extends ConfigBase<IGameVersionElement>{
	constructor(){
		super(EXCELDATA);
	}

}