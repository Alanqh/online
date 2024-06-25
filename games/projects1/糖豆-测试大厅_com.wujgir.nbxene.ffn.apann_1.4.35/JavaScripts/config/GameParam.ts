import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","strValue","value"],["","","",""],[1,"翻转材质","AD272AF94B1F6BE1A5A0A4B184C7148F",0],[2,"板子翻转间隔时间",null,2],[3,"板子变色后等待翻转时间",null,2],[4,"板子翻转时间",null,3],[5,"第一圈材质","AD537C304E1DEAC6EBCBABA46FED52C4",0],[6,"第二圈材质","85E36DA948DC023A449FEC8947281725",0],[7,"第三圈材质","4D7F78AA4DE96390ADD350A3BD15121E",0],[8,"第四圈材质","F76A39D14CE268DE1AFB9BA407F5CE03",0],[9,"第0圈材质","170FAA1448DDA9D9BE2E8A9D94D4E6A5",0],[10,"道具生成间隔时间",null,30],[11,"同时生成道具个数",null,5],[12,"场上最大可存在道具个数",null,5],[13,"道具持续时间",null,20],[14,"道具开始生成时间",null,40]];
export interface IGameParamElement extends IElementBase{
 	/**id*/
	id:number
	/**name*/
	name:string
	/**字符串值*/
	strValue:string
	/**数字值*/
	value:number
 } 
export class GameParamConfig extends ConfigBase<IGameParamElement>{
	constructor(){
		super(EXCELDATA);
	}

}