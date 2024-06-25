import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Content","SmallStiffGuid","BigStiffGuid","SmallStiffRate","BigStiffRate","WinGuid","WinRate","FailGuid","FailRataRata","CelebrateGuid","CelebrateRate"],["","","","","","","","","","","",""],[10001,"测试用猫","228108","228103",1,1,"232067",1,"231572",1,"230575",1]];
export interface IPetGameElement extends IElementBase{
 	/**序号*/
	id:number
	/**备注*/
	Content:string
	/**小硬直动画*/
	SmallStiffGuid:string
	/**大硬直动画*/
	BigStiffGuid:string
	/**小硬直动画速率*/
	SmallStiffRate:number
	/**大硬直动画速率*/
	BigStiffRate:number
	/**获胜动画*/
	WinGuid:string
	/**获胜动画速率*/
	WinRate:number
	/**失败动画*/
	FailGuid:string
	/**失败动画速率*/
	FailRataRata:number
	/**庆祝动画*/
	CelebrateGuid:string
	/**庆祝动画速率*/
	CelebrateRate:number
 } 
export class PetGameConfig extends ConfigBase<IPetGameElement>{
	constructor(){
		super(EXCELDATA);
	}

}