import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","backup","name","nameDesc","desc","desc_Desc","icon","frameColor","duration","type","value","isEx","isArchive"],["","","Language","","Language","","","","","","","",""],[1,"双倍经验卡","UI_buff_01","双倍经验卡","UI_buffdesc_01","经验卡","324463","FFA800FF",1,1,2,null,null],[2,"双倍经验卡","UI_buff_01","双倍经验卡","UI_buffdesc_01","经验卡","324463","FFA800FF",3,1,2,null,null],[3,"双倍经验卡","UI_buff_01","双倍经验卡","UI_buffdesc_01","经验卡","324463","FFA800FF",7,1,2,null,null],[4,"三倍经验卡","UI_buff_02","三倍经验卡","UI_buffdesc_01","经验卡","324496","FFA800FF",1,1,3,null,null],[5,"小镇的中毒buff","buff_01","中毒","buff_des_01","当前处于中毒状态，移动速度、换弹速度减慢，回血量减少","319144","780E00FF",20,2,1,true,true],[6,"小镇的毒性免疫buff","buff_02","毒性免疫","buff_des_02","获得一段时间的毒性免疫效果，此效果生效时不会中毒","319146","0060F6FF",10,3,0,null,true],[7,"小镇的流血buff","buff_03","流血","buff_des_03","当前处于流血状态，持续扣除血量中","143698",null,10,4,2,true,true],[8,"金牌","危命之金","金牌","下次危命任务胜利经验值+300%","金牌","324496",null,99999,5,2,null,true],[9,"银牌","危命之银","银牌","下次危命任务胜利经验值+50%","银牌","324463",null,99999,5,1.5,null,true]];
export interface IBuffElement extends IElementBase{
 	/**id*/
	id:number
	/**buff的备注*/
	backup:string
	/**名字*/
	name:string
	/**名字备注*/
	nameDesc:string
	/**效果描述*/
	desc:string
	/**效果描述的备注*/
	desc_Desc:string
	/**buff图标*/
	icon:string
	/**边框颜色*/
	frameColor:string
	/**持续时间*/
	duration:number
	/**类型：1.经验卡（天数） 2.中毒3.毒免4.持续扣血*/
	type:number
	/**效果值*/
	value:number
	/**是否使用扩展配置使用就填1不用就不填填了1的效果值就会关联扩展配置*/
	isEx:boolean
	/**是否是存档buff*/
	isArchive:boolean
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}