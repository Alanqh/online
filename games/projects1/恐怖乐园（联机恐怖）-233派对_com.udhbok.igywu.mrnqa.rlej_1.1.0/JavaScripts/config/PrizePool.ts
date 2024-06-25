import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","value","clazz","isHasLimit"],["","","","",""],[1,"新手池1（复活币）",1000,null,true],[2,"新手池2（解谜提示卡*3）",21,null,true],[3,"活动池道具（尖叫鸡*）5",100,null,true]];
export interface IPrizePoolElement extends IElementBase{
 	/**价值池ID*/
	id:number
	/**备注（策划看）*/
	desc:string
	/**价值池价值*/
	value:number
	/**实现类（程序）*/
	clazz:string
	/**是否有上限*/
	isHasLimit:boolean
 } 
export class PrizePoolConfig extends ConfigBase<IPrizePoolElement>{
	constructor(){
		super(EXCELDATA);
	}

}