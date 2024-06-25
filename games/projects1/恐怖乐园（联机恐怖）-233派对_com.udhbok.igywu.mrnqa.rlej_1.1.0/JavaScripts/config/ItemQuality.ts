import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","backUp","imgGuid","colorRGB"],["","","",""],[1,"默认(或者空格子)","225454","#A9A9A9"],[2,"普通","318918","#32CD32"],[3,"稀有","318915","#4682B4"],[4,"珍贵","318906","#EE82EE"],[5,"神话","318907","#FFD700"]];
export interface IItemQualityElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	backUp:string
	/**品质图片guid*/
	imgGuid:string
	/**品质演示rgb值*/
	colorRGB:string
 } 
export class ItemQualityConfig extends ConfigBase<IItemQualityElement>{
	constructor(){
		super(EXCELDATA);
	}

}