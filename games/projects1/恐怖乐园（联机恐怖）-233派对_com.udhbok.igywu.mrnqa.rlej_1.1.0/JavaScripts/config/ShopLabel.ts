import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Desc","name","name_Desc","displayAll"],["","","Language","",""],[1,"孤岛独游的皮肤","UI_shop_12","皮肤",true],[2,"处理礼包以外的所有消耗品","UI_shop_13","消耗品",true],[3,"暂时没用，大家也别配这个","UI_shop_14","互动道具",true],[4,"礼包类的道具","UI_shop_15","礼包",true],[5,"月卡和季卡都在这里","UI_shop_16","月卡",false],[6,"恐惧币都在这兑换","UI_shop_17","充值",false],[7,"暂时没用","UI_shop_18","建材",true],[8,"暂时没用","UI_shop_19","日周月礼包",true],[9,"暂时没用","UI_shop_20","全部商品",true]];
export interface IShopLabelElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	Desc:string
	/**名字*/
	name:string
	/**名字备注*/
	name_Desc:string
	/**是否显示在所有的分页里*/
	displayAll:boolean
 } 
export class ShopLabelConfig extends ConfigBase<IShopLabelElement>{
	constructor(){
		super(EXCELDATA);
	}

}