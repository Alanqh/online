import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","content_desc","deltaTime"],["","","",""]];
export interface IGuideTalkElement extends IElementBase{
 	/**id*/
	id:number
	/**对话内容*/
	content:Array<string>
	/**对话内容备注*/
	content_desc:string
	/**字符显示间隔*/
	deltaTime:Array<number>
 } 
export class GuideTalkConfig extends ConfigBase<IGuideTalkElement>{
	constructor(){
		super(EXCELDATA);
	}

}