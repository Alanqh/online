import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_desc","imageGuid","charmVal","intimacy","purchaseType","price","itemId"],["","Language","","","","","","",""],[1,"UI_gift_01","棒棒糖","306767",2,10,2,20,11011],[2,"UI_gift_02","气球","306768",2,10,2,20,11017],[3,"UI_gift_03","炸弹","306766",5,10,2,50,11013],[4,"UI_gift_04","南瓜","306763",5,10,2,50,11014],[5,"UI_gift_05","口红","306770",10,21,2,98,11016],[6,"UI_gift_06","跑车","306761",17,52,2,168,11015],[7,"UI_gift_07","飞机","306764",17,52,2,168,11012],[8,"UI_gift_08","卡皮巴拉发卡","346692",5,10,2,50,61018],[9,"UI_gift_09","兔叽发卡","346705",2,10,2,20,61019],[10,"UI_gift_10","熊熊发卡","346712",2,10,2,20,61020],[11,"UI_gift_11","荧光棒","346697",12,10,2,100,61021],[12,"UI_gift_12","粉丝灯牌","347391",20,52,2,200,61022]];
export interface IGiftElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	name:string
	/**名称备注*/
	name_desc:string
	/**图标guid*/
	imageGuid:string
	/**魅力值*/
	charmVal:number
	/**增加的亲密度*/
	intimacy:number
	/**购买类型（
0.免费
1.乐币
2.恐惧币
）*/
	purchaseType:number
	/**单价*/
	price:number
	/**关联道具表id*/
	itemId:number
 } 
export class GiftConfig extends ConfigBase<IGiftElement>{
	constructor(){
		super(EXCELDATA);
	}

}