import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","imgGuid"],["",""],[1,"162301","公告本身两字ANOUNCEMENT"],[2,"157206","开始按钮常态START"],[3,"157242","开始按钮按压态START"],[4,"162271","成就（获得冠军的标题） ACQUIRE"],[5,"162300","恭喜获得（获得exp和金币的标题）ACHIEVEMENT"],[6,"162296","回合结束UI  Round Ends"],[7,"162304","出局啦UI   OUT"],[8,"162280","过关啦UI    PASS"],[9,"162288","免费抽奖Free"],[10,"162286","金币抽奖Rraw"]];
export interface IUILanElement extends IElementBase{
 	/**id*/
	id:number
	/**英文资源*/
	imgGuid:string
 } 
export class UILanConfig extends ConfigBase<IUILanElement>{
	constructor(){
		super(EXCELDATA);
	}

}