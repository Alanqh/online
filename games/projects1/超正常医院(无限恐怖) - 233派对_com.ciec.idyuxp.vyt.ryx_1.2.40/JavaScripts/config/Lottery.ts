import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Type","Probability","RewardID","RewardType","RewardCount","ShowInPreveiew","ShowProbability","Time","ShowTime"],["","","","","","","","","",""],[1,1,0.2,1018,1,1,true,0.2,0,0],[2,1,0.07,1019,1,1,true,0.1,0,0],[3,1,0.06,1020,1,1,true,0.06,259200,3],[4,1,0.03,1020,1,1,true,0.03,604800,7],[7,1,0.01,3012,2,1,true,0.01,0,0],[8,1,0.03,4001,2,1,true,0.03,0,0],[9,1,0.03,4002,2,1,true,0.03,0,0],[10,1,0.03,4007,2,1,true,0.03,0,0],[11,1,0.03,4008,2,1,true,0.03,0,0],[12,1,0.03,5001,2,1,true,0.03,0,0],[13,1,0.03,5002,2,1,true,0.03,0,0],[14,1,0.03,5006,2,1,true,0.03,0,0],[15,1,0.03,5007,2,1,true,0.03,0,0],[16,1,0.01,3017,2,1,true,0.01,0,0],[17,1,0.23,1026,3,1000,true,0.2,0,0],[18,1,0.1,1026,3,2000,true,0.1,0,0],[19,1,0.04,1026,3,3000,true,0.04,0,0],[20,1,0.01,1026,3,5000,true,0.01,0,0]];
export interface ILotteryElement extends IElementBase{
 	/**undefined*/
	ID:number
	/**1普通*/
	Type:number
	/**2高级*/
	Probability:number
	/**总和为1*/
	RewardID:number
	/**奖励物品ID*/
	RewardType:number
	/**奖励物品类型
1=道具表
2=装扮表
3=代币*/
	RewardCount:number
	/**奖励物品数量*/
	ShowInPreveiew:boolean
	/**奖励预览中是否显示*/
	ShowProbability:number
	/**显示概率*/
	Time:number
	/**时限（秒）*/
	ShowTime:number
 } 
export class LotteryConfig extends ConfigBase<ILotteryElement>{
	constructor(){
		super(EXCELDATA);
	}

}