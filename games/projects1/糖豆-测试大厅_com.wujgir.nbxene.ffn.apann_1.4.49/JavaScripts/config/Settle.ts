import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","gold","exp","txz"],["\n","\n","\n",""],[1,100,10,25,"第二轮吃鸡"],[2,30,10,15,"第一轮晋级"],[3,15,5,10,"第一轮被淘汰"],[4,5,0,0,"挂机党"]];
export interface ISettleElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**金币*/
	gold:number
	/**经验*/
	exp:number
	/**通行证*/
	txz:number
 } 
export class SettleConfig extends ConfigBase<ISettleElement>{
	constructor(){
		super(EXCELDATA);
	}

}