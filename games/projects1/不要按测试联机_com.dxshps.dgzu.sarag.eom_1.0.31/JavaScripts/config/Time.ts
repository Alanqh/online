import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","beizhu1","beizhu2","timeStart","timeEnd","timeCycle"],["","","","","",""],[1,"25573.2083333333",null,334800000,4828276799,86400,"每日任务时间配置"],[2,"25573.2083333333",null,334800000,4828276799,604800,"周活跃度循环配置"]];
export interface ITimeElement extends IElementBase{
 	/**ID*/
	id:number
	/**开始时间*/
	beizhu1:string
	/**结束时间*/
	beizhu2:string
	/**开始时间（北京）*/
	timeStart:number
	/**结束时间（北京）*/
	timeEnd:number
	/**循环周期（秒）
（不填为期间不需要循环）*/
	timeCycle:number
 } 
export class TimeConfig extends ConfigBase<ITimeElement>{
	constructor(){
		super(EXCELDATA);
	}

}