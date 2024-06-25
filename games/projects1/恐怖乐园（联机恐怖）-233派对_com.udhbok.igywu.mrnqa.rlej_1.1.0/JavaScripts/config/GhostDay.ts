import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","day","atk","spd","scale","markExLan","exLan","markExNightLan","exNightLan","exGhost","isRedMoon"],["","","","","","","","","","",""]];
export interface IGhostDayElement extends IElementBase{
 	/**id*/
	id:number
	/**天数*/
	day:number
	/**攻击率*/
	atk:number
	/**移动速度率*/
	spd:number
	/**体型倍率*/
	scale:number
	/**替换的当天提示备注*/
	markExLan:string
	/**替换的当天提示，不配就不替换*/
	exLan:string
	/**晚上的额外多语言*/
	markExNightLan:string
	/**晚上的额外多语言，没有就不替换*/
	exNightLan:string
	/**额外的鬼的insId*/
	exGhost:Array<number>
	/**是否是红月配置*/
	isRedMoon:boolean
 } 
export class GhostDayConfig extends ConfigBase<IGhostDayElement>{
	constructor(){
		super(EXCELDATA);
	}

}