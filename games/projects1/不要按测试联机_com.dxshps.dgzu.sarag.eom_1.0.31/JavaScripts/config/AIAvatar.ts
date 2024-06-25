import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","des","clothGuidArr"],["","",""],[10001,"女形象01",["136298"]],[10002,"男形象01",["136299"]],[10003,"女形象02",["136189"]],[10004,"女形象03",["136191"]],[10005,"女形象04",["136190"]],[10006,"男形象02",["136301"]],[10007,"男形象03",["136299"]],[10008,"男形象04",["136303"]]];
export interface IAIAvatarElement extends IElementBase{
 	/**ID*/
	ID:number
	/**描述*/
	des:string
	/**服装ID*/
	clothGuidArr:Array<string>
 } 
export class AIAvatarConfig extends ConfigBase<IAIAvatarElement>{
	constructor(){
		super(EXCELDATA);
	}

}