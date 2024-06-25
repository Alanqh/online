import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Describe","AssetGuid","Icon","ChatType","ChatLoop","UnlockType"],["","Language","","","","","",""],[1,"chat_1","哭泣","326478","326478",1,1,1],[2,"chat_2","疑惑","326484","326484",1,1,1],[3,"chat_3","害羞","326485","326485",1,1,1],[4,"chat_4","烦躁","326486","326486",1,1,2,"|","4|"],[5,"chat_5","兴奋","326487","326487",1,1,2,"|","5|"],[6,"chat_6","生气","326488","326488",1,1,2,"|","6|"],[7,"chat_7","无语","326489","326489",1,1,2,"|","7|"],[8,"chat_8","尴尬","326490","326490",1,1,2,"|","8|"],[9,"chat_9","黑脸","326491","326491",1,1,2,null,"9"],[22,"chat_10","科目三","232755",null,2,1,1],[23,"chat_11","小熊跳舞","200201",null,2,1,1],[24,"chat_12","极乐净土","195754",null,2,1,1],[25,"chat_13","Queencard","197629",null,2,1,1],[26,"chat_14","Bodyshaming","272027",null,2,1,1],[27,"chat_15","叮当舞","197236",null,2,1,1],[28,"chat_16","抖肩舞","29717",null,2,1,1],[29,"chat_17","海草舞","126579",null,2,1,1],[30,"chat_18","骑马舞","137301",null,2,1,1],[31,"chat_19","恐龙抗狼","210266",null,2,1,1],[32,"chat_20","无牙仔","295726",null,2,1,2],[33,"chat_21","爱如火","292500",null,2,1,2],[34,"chat_22","小猪跳舞","269130",null,2,1,2],[35,"chat_23","Flower","269142",null,2,1,2],[36,"chat_24","呱呱呱","294660",null,2,1,2],[37,"chat_25","恭喜发财","297263",null,2,1,2]];
export interface IChatElement extends IElementBase{
 	/**id*/
	ID:number
	/**交互名字*/
	Name:string
	/**物品描述*/
	Describe:string
	/**交互guid*/
	AssetGuid:string
	/**交互Icon*/
	Icon:string
	/**交互类型（1 = 表情，2 = 舞蹈*/
	ChatType:number
	/**交互循环次数*/
	ChatLoop:number
	/**解锁类型：
1：免费
2：购买*/
	UnlockType:number
 } 
export class ChatConfig extends ConfigBase<IChatElement>{
	constructor(){
		super(EXCELDATA);
	}

}