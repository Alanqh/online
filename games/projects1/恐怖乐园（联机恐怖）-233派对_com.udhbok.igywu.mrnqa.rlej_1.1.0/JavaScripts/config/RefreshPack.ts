import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Desc","lv","type","prizeId","activenum","value","numberList","weight","u"],["","","","","","","","","",""],[1,"场景刷新1级资源包",1,1,0,0,2,[11001,11002,11003,11004,11005,10015,10016,10013],8,1.3],[2,"场景刷新2级资源包",2,1,0,0,5,[11004,11005,11006,11007,10017,10018,10013],2,1.2],[3,"场景刷新3级资源包",3,1,0,0,10,[11007,11008,11009,11010,10000,10013],1,2],[1000,"首次游玩场景刷新复活币",1000,2,1,1,1000,[10000],0,1],[1001,"首次游玩场景刷新灵感灯泡",1001,2,2,3,7,[10013],0,1],[1002,"版本活动尖叫鸡",1002,2,3,5,20,[10025],0,1]];
export interface IRefreshPackElement extends IElementBase{
 	/**ID*/
	id:number
	/**包的备注*/
	Desc:string
	/**资源包等级*/
	lv:number
	/**类型（1=场景道具刷新，2=价值池刷新）*/
	type:number
	/**价值池id*/
	prizeId:number
	/**生效点位数*/
	activenum:number
	/**组合包价值*/
	value:number
	/**道具ID*/
	numberList:Array<number>
	/**比例*/
	weight:number
	/**u*/
	u:number
 } 
export class RefreshPackConfig extends ConfigBase<IRefreshPackElement>{
	constructor(){
		super(EXCELDATA);
	}

}