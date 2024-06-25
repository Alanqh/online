import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","numberList"],["",""],[1,[2000,2001,102],"大厅","月卡|季卡|每月限定礼包"],[2,[3001,3002,3003],"惊魂岛","豪华别墅|现代小屋|芭比小屋"],[3,[100001,100002,100003],"小镇","霰弹枪|机枪|步枪"],[4,[1,14,102],"学校","天使庇佑|活力丹|灵感灯泡"],[5,[1,14,102],"医院","天使庇佑|活力丹|灵感灯泡"]];
export interface IRecommendedElement extends IElementBase{
 	/**ID*/
	id:number
	/**商店表ID（A|B|C）*/
	numberList:Array<number>
 } 
export class RecommendedConfig extends ConfigBase<IRecommendedElement>{
	constructor(){
		super(EXCELDATA);
	}

}