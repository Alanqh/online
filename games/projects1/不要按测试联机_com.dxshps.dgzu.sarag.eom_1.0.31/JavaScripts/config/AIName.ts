import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","content","Name"],["","","Language"],[10001,"奶牛猫","AIName_Name_1"],[10002,"白猫","AIName_Name_2"],[10003,"橘猫","AIName_Name_3"],[10004,"公主猫","AIName_Name_4"],[10005,"海盗王猫","AIName_Name_5"],[10006,"波斯猫","AIName_Name_6"],[10007,"沙滩猫","AIName_Name_7"],[10008,"无毛猫","AIName_Name_8"],[10009,"女巫猫","AIName_Name_9"],[10010,"萝卜猫","AIName_Name_10"],[10011,"恐怖南瓜猫","AIName_Name_11"],[10012,"圣诞老人猫","AIName_Name_12"],[10013,"大魔术师猫","AIName_Name_13"],[10014,"地狱三头犬","AIName_Name_14"],[10015,"中华熊猫","AIName_Name_15"],[10016,"迷你猪","AIName_Name_16"]];
export interface IAINameElement extends IElementBase{
 	/**ID*/
	ID:number
	/**名称策划看*/
	content:string
	/**名字*/
	Name:string
 } 
export class AINameConfig extends ConfigBase<IAINameElement>{
	constructor(){
		super(EXCELDATA);
	}

}