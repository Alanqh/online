import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","icon","openIcon","rewards"],["","","","",""],[20,"第一档",178006,192810,[[10200,10],[10201,100],[10202,5]]],[40,"第二档",178006,192810,[[10200,20],[10201,100],[10202,10]]],[60,"第三档",178006,192810,[[10200,50],[10201,200],[10202,15]]],[80,"第四档",178006,192810,[[10200,175],[10201,300],[10202,20]]],[100,"第五档",178006,192810,[[10200,200],[10201,500],[10202,25],[7,1]]]];
export interface IActiveValueElement extends IElementBase{
 	/**活跃值*/
	id:number
	/**备注*/
	desc:string
	/**图标*/
	icon:number
	/**打开的图标*/
	openIcon:number
	/**奖励
-1经验值
-2鬼魅值
其他的读取道具表ID*/
	rewards:Array<Array<number>>
 } 
export class ActiveValueConfig extends ConfigBase<IActiveValueElement>{
	constructor(){
		super(EXCELDATA);
	}

}