import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","rewards","requireScore"],["","",""],[1,[[10201,50],[10200,50],[61002,1]],50],[2,[[10201,150],[10200,50],[61003,1]],350],[3,[[10201,250],[10200,100],[61004,1]],750],[4,[[10201,350],[10200,100],[61005,1]],1660],[5,[[10201,500],[10200,150],[61006,1]],2560],[6,[[10201,750],[10200,150],[61007,1]],3280],[7,[[10201,950],[10200,200],[61008,1]],4550],[8,[[10201,1250],[10200,200],[61009,1]],5500],[9,[[10201,1500],[10200,250],[61010,1]],7400],[10,[[10201,2000],[10200,300],[61011,1]],9285]];
export interface IAchievementLevelElement extends IElementBase{
 	/**成就Level*/
	id:number
	/**奖励列表
10200钱
10201经验值
10202鬼魅值
10203活跃度
其他的读取道具表ID*/
	rewards:Array<Array<number>>
	/**需要成就积分*/
	requireScore:number
 } 
export class AchievementLevelConfig extends ConfigBase<IAchievementLevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}