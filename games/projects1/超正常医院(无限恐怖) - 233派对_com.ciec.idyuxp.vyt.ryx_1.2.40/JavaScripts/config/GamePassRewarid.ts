import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Icon","Type","RewardID","QualityType","RewardName","Count"],["","","","","","",""],[1,"324532",5,0,1,"感染币",1600],[2,"324532",5,0,1,"感染币",3600],[3,"324532",5,0,1,"感染币",4000],[4,"324532",5,0,1,"感染币",3200],[5,"324532",5,0,1,"感染币",6400],[6,"324532",5,0,1,"感染币",8000],[7,"328603",2,5011,2,"乘风破浪·左",1],[8,"328603",2,5012,2,"乘风破浪·右",1],[9,"328947",2,1002,2,"拂晓神剑",1]];
export interface IGamePassRewaridElement extends IElementBase{
 	/**undefined*/
	id:number
	/**奖励图标*/
	Icon:string
	/**奖励类型
1. 道具
2. 装扮
3. 表情
4. 舞蹈
5.活动代币*/
	Type:number
	/**奖励对应id*/
	RewardID:number
	/**品质类型
1. 普通
2. 神话*/
	QualityType:number
	/**奖励名称*/
	RewardName:string
	/**奖励数量*/
	Count:number
 } 
export class GamePassRewaridConfig extends ConfigBase<IGamePassRewaridElement>{
	constructor(){
		super(EXCELDATA);
	}

}