import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","WordID"],["\n","Language"],[1,"Txt_ChatWord_1"],[2,"Txt_ChatWord_2"],[3,"Txt_ChatWord_3"],[4,"Txt_ChatWord_4"],[5,"Txt_ChatWord_5"],[6,"Txt_ChatWord_6"],[7,"Txt_ChatWord_7"],[8,"Txt_ChatWord_8"],[9,"Txt_ChatWord_9"],[10,"Txt_ChatWord_10"],[11,"Txt_ChatWord_11"]];
export interface IChatWordElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**内容*/
	WordID:string
 } 
export class ChatWordConfig extends ConfigBase<IChatWordElement>{
	constructor(){
		super(EXCELDATA);
	}

}