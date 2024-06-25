import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","backup","moveSpeed","reviveEff","shiftTime","changeHp","interval"],["","","","","","",""],[1,"后面的各个玩家属性值会关联难度，根据难度从列表中选一个",[-20,-30,-40,-50,-60],[-0.2,-0.3,-0.4,-0.5,-0.6],[500,600,700,800,1000],[-4,-6,-7,-9,-20],[1.5,1.2,1,0.8,0.5]]];
export interface IBuffExElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	backup:string
	/**移动速度（值）*/
	moveSpeed:Array<number>
	/**回血效率（比例）*/
	reviveEff:Array<number>
	/**换弹时间（值）*/
	shiftTime:Array<number>
	/**改变血量（值）*/
	changeHp:Array<number>
	/**生效时间（秒）*/
	interval:Array<number>
 } 
export class BuffExConfig extends ConfigBase<IBuffExElement>{
	constructor(){
		super(EXCELDATA);
	}

}