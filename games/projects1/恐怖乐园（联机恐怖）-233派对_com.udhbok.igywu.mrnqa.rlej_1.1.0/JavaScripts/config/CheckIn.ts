import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","day","day_desc","itemId","itemId_desc","itemNum"],["","Language","","","",""],[1,"UI_checkIn_01","第1天",51004,"胶卷",5],[2,"UI_checkIn_02","第2天",10200,"恐惧币",200],[3,"UI_checkIn_03","第3天",10006,"一天双倍经验卡",1],[4,"UI_checkIn_04","第4天",10200,"恐惧币",250],[5,"UI_checkIn_05","第5天",10200,"恐惧币",250],[6,"UI_checkIn_06","第6天",10200,"恐惧币",500],[7,"UI_checkIn_07","第7天",61017,"头像框",1]];
export interface ICheckInElement extends IElementBase{
 	/**id*/
	id:number
	/**天数*/
	day:string
	/**说明*/
	day_desc:string
	/**奖励关联的道具表id*/
	itemId:number
	/**对应的道具*/
	itemId_desc:string
	/**道具数量（为空则不显示*/
	itemNum:number
 } 
export class CheckInConfig extends ConfigBase<ICheckInElement>{
	constructor(){
		super(EXCELDATA);
	}

}