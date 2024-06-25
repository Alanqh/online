import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","passCount","refreshIntervalMin","refreshIntervalMax"],["","","",""],[1,1,1,5],[2,1,1,5],[3,2,1,5],[4,2,1,5],[5,2,1,5],[6,2,1,5],[7,2,1,5],[8,2,1,5],[9,2,1,5],[10,2,1,5],[11,2,1,5],[12,2,1,5],[13,2,1,5],[14,2,1,5],[15,2,1,5],[16,2,1,5],[17,2,1,5],[18,2,1,5],[19,2,1,5],[20,2,1,5],[21,2,1,5],[22,2,1,5],[23,2,1,5],[24,2,1,5],[25,2,1,5]];
export interface IAIPassElement extends IElementBase{
 	/**id*/
	id:number
	/**开启所需真人通关数量*/
	passCount:number
	/**AI刷新最小间隔/S*/
	refreshIntervalMin:number
	/**AI刷新最大间隔/S*/
	refreshIntervalMax:number
 } 
export class AIPassConfig extends ConfigBase<IAIPassElement>{
	constructor(){
		super(EXCELDATA);
	}

}