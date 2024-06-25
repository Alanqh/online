import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["TipID","Condition","Remark","Content","Comment"],["","","","Language",""],[1,"当有角色被击杀时显示","<color=#00ff00ff>{玩家1}</color>击败<color=#ff0000ff>{玩家2}</color>，<color=#ffff00ff\n>{几}</color>连胜！","Tips_Content_10001","击杀公告"]];
export interface ITipsElement extends IElementBase{
 	/**序号*/
	TipID:number
	/**显示条件*/
	Condition:string
	/**标注*/
	Remark:string
	/**内容*/
	Content:string
	/**备注*/
	Comment:string
 } 
export class TipsConfig extends ConfigBase<ITipsElement>{
	constructor(){
		super(EXCELDATA);
	}

}