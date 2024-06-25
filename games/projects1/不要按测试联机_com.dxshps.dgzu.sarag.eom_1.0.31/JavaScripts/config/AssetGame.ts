import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Guid","Name","Comment"],["","","",""],[10001,"235649","待机",null],[10002,"235648","跑步",null],[10003,"228104","跳跃",null],[10004,"233450","上升滞空",null],[10005,"233450","下落滞空",null],[10006,"228104","飞扑",null],[10007,"231716","平地摔",null],[10008,"181293","冲刺",null],[10009,"228108","小硬直",null],[10010,"228103","大硬直",null],[10011,"232067","获胜",null],[10012,"231572","失败",null],[10013,"230575","庆祝",null],[10014,"228105","飞扑滞空",null],[20001,"224943","失败",null],[20002,"123713","庆祝",null],[20003,"14560","庆祝",null],[20004,"232068","庆祝",null],[20005,"231571","失败",null],[20006,"224943","淘汰",null],[20007,"271252","宠物挣扎",null]];
export interface IAssetGameElement extends IElementBase{
 	/**资源ID
10000：宠物
20000：人类*/
	ID:number
	/**资源GUID*/
	Guid:string
	/**名称及内容*/
	Name:string
	/**备注*/
	Comment:string
 } 
export class AssetGameConfig extends ConfigBase<IAssetGameElement>{
	constructor(){
		super(EXCELDATA);
	}

}