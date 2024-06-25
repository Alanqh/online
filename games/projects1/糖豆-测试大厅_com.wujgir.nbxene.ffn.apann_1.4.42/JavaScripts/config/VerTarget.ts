import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","des"],["",""],[1,false]];
export interface IVerTargetElement extends IElementBase{
 	/**id*/
	id:number
	/**海外=true*/
	des:boolean
 } 
export class VerTargetConfig extends ConfigBase<IVerTargetElement>{
	constructor(){
		super(EXCELDATA);
	}

}