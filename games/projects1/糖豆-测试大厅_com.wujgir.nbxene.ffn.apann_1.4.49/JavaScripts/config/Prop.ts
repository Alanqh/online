import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","para","buttonEnable","iconGUID","cd","clicked","draged"],["","Language","","","","","","",""],[1,"Item_name_1",2,1,true,"178017",2,true,true,"炸弹/水炸弹"],[2,"Item_name_2",1,30,true,null,0,true,true,"翅膀"],[3,"Item_name_3",1,30,true,null,0,true,true,"变大药剂"],[4,"Item_name_4",1,30,true,null,0,true,true,"变小药剂"],[5,"Item_name_5",2,5,true,"167105",1,true,true,"水枪"],[6,"Item_name_6",2,3,true,"137997",2,true,false,"夏日冰棒"],[7,"Item_name_7",2,1,true,"137997",5,true,false,"称号道具"],[8,"Item_name_8",2,-1,false,null,1,true,false,"钓鱼竿"],[9,"Item_name_9",2,5,true,"101944",3,true,true,"吹风"],[10,"Item_name_10",2,5,true,"199006",3,true,false,"激光"]];
export interface IPropElement extends IElementBase{
 	/**ID*/
	id:number
	/**道具名*/
	name:string
	/**道具类型：
1.持续性道具；
2.手持类道具*/
	type:number
	/**道具参数：
type=1，为持续时间；
type=2，为使用次数*/
	para:number
	/**启用按钮*/
	buttonEnable:boolean
	/**道具图标GUID
（用于在使用按钮按钮展示）*/
	iconGUID:string
	/**冷却时间*/
	cd:number
	/**响应点击*/
	clicked:boolean
	/**响应拖动*/
	draged:boolean
 } 
export class PropConfig extends ConfigBase<IPropElement>{
	constructor(){
		super(EXCELDATA);
	}

}