import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Probability","RandomRewardID","RandomRewardCount"],["","","",""],[1,0.1,[1001,1002,1003,1004],[5,5,5,5]],[2,0.1,[1001,1002,1003,1004],[5,5,5,5]],[3,0.1,[1001,1002,1003,1004],[5,5,5,5]],[4,0.1,[1001,1002,1003,1004],[5,5,5,5]],[5,0.1,[1001,1002,1003,1004],[5,5,5,5]],[6,0.1,[1001,1002,1003,1004],[5,5,5,5]],[7,0.1,[1001,1002,1003,1004],[5,5,5,5]],[8,0.1,[1001,1002,1003,1004],[5,5,5,5]],[9,0.1,[1001,1002,1003,1004],[5,5,5,5]],[10,0.1,[1001,1002,1003,1004],[5,5,5,5]]];
export interface ILotteryFirstRewardElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**总和为1*/
	Probability:number
	/**奖励物品ID*/
	RandomRewardID:Array<number>
	/**奖励物品数量*/
	RandomRewardCount:Array<number>
 } 
export class LotteryFirstRewardConfig extends ConfigBase<ILotteryFirstRewardElement>{
	constructor(){
		super(EXCELDATA);
	}

}