import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","buyLimit","limitType","price","currencyType","showGameID","shopID","show","type","listingTime","shopItemType","itemID","weight","modelGuid","otherLoc","otherRot","otherScale","limitString","limitString_Desc","wantParams"],["","Language","","","","","","","","","","","","","","","","","","",""],[1,"天使庇佑",-1,1,1000,1,[1,2,3,4,5],1,1,2,"1",0,10000,15,"6C10D428438DB508193C099BA9A46CB8",null,new mw.Vector(0,0,-90),new mw.Vector(0.3,0.3,0.3),null,null,[0.0016,3,7]],[2,"小血瓶",-1,1,100,1,[1,4,5],1,1,2,"1",0,10001,18,"95F0853C47C7395D51FA48BFBFC75445",null,new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[3,"中血瓶",-1,1,150,1,[1,4,5],1,1,2,"2",0,10002,19,"B53086794A95410F8EEA68836BBECB30",null,new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[4,"大血瓶",-1,1,200,1,[1,4,5],1,1,2,"2",0,10003,20,"7025CF164FA8B605746A4092EEC5E663",null,new mw.Vector(0,0,0),new mw.Vector(1.3,1.3,1.3),null,null,[0.0016,3,7]],[5,"活力丹",-1,1,300,1,[1,4,5],1,1,2,"2",0,10004,21,"0FE9447F44F0933A31C921954DBA413C",null,new mw.Vector(0,0,-90),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[7,"一天双倍经验卡",-1,1,1600,1,[1,2,3,4,5],1,1,2,"1",0,10006,22,"61A98A904C5EBF2BE7552D92A75F670A",null,new mw.Vector(0,0,-90),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[8,"三天双倍经验卡",-1,1,4600,1,[1,2,3,4,5],1,1,2,"1",0,10007,23,"3CDA9F7E4DDA2B62852C70B330B1D888",null,new mw.Vector(0,0,-90),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[9,"七天双倍经验卡",-1,1,10000,1,[1,2,3,4,5],1,1,2,"1",0,10008,24,"C36EC0A34913E9F1495330965DA8A47A",null,new mw.Vector(0,0,-90),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[10,"一天三倍经验卡",-1,1,2400,1,[1,2,3,4,5],1,1,2,"3",0,10009,25,"05E746674FAA01EC63A54DAAEC550B2A",null,new mw.Vector(0,0,-90),new mw.Vector(1.5,1.5,1.5),null,null,[0.0016,3,7]],[14,"灵感灯泡",-1,1,100,1,[1,2,3,4,5],1,1,2,"3",0,10013,14,"456C88EF4D354CFB2B1B85A452AEE77E",new mw.Vector(0,0,-30),new mw.Vector(0,0,-90),new mw.Vector(0.5,0.5,0.5),null,null,[0.0016,3,7]],[20,"复苏小礼包",-1,1,5000,1,[1,2,3,4,5],1,1,4,"4",0,10019,16,"691FEB614742DD826EB010B36597967E",null,new mw.Vector(0,0,-90),null,null,null,[0.0016,3,7]],[21,"复苏大礼包",-1,1,9800,1,[1,2,3,4,5],1,1,4,"4",0,10020,17,"F024854242614A0D7DDE259D30F450BC",null,new mw.Vector(0,0,-90),null,null,null,[0.0016,3,7]],[22,"特权卡（仅有孤岛显示）",1,1,22,2,[4],1,1,2,"4",0,10100,12,"C0D4E78846CDFD3E36FD49B8FF622B7F",null,new mw.Vector(0,0,-90),new mw.Vector(0.2,0.2,0.2),null,null,null],[100,"每日限定礼包",1,2,0,1,[1,2,3,4,5],1,1,4,"3",0,10021,0,"4A9F358C45083E9CA4FE728004A409DB",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.7,1.7,1.7),"UI_others_11","每日限购{0}/{1}",null],[101,"每周限定礼包",10,3,101,2,[1,2,3,4,5],1,0,4,"3",0,10022,5,"8A990F0544A41352138DAA8D73EADD50",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.7,1.7,1.7),"UI_others_14","每周限购{0}/{1}",null],[102,"每月限定礼包",10,4,102,2,[1,2,3,4,5],1,1,4,"3",0,10023,5,"E36E34AD4B8DDB72C1FE53A86BB5E150",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.7,1.7,1.7),"UI_others_15","每月限购{0}/{1}",null],[1000,"1000恐惧币",1,1,1000,2,[1,2,3,4,5],1,1,6,"4",0,20001,3,"E78829214D47A25915697AADAC7CCEDB",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1001,"6000恐惧币",1,1,1001,2,[1,2,3,4,5],1,1,6,"4",0,20002,4,"51DB695144C1E905F070A4805EF19D2F",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1002,"10000恐惧币",1,1,1002,2,[1,2,3,4,5],1,1,6,"4",0,20003,5,"2E9683524A95460BB9B7948895E73B3A",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1003,"18000恐惧币",1,1,1003,2,[1,2,3,4,5],1,1,6,"4",0,20004,6,"D3D4690B41B9D574289BFBA9AAC649AD",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1004,"30000恐惧币",1,1,1004,2,[1,2,3,4,5],1,1,6,"4",0,20005,7,"D96229B84831C8AA133768B269098E41",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1005,"48000恐惧币",1,1,1005,2,[1,2,3,4,5],1,1,6,"4",0,20006,8,"C6D4A3124156216EE79C8781A9444AAD",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[1006,"64000恐惧币",1,1,1006,2,[1,2,3,4,5],1,1,6,"4",0,20007,9,"B2A824894B2CE00CD0195BAFEA49F52C",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[2000,"月卡",1,1,2000,2,[1,2,3,4,5],1,1,5,"4",1,50001,10,"C6D4A3124156216EE79C8781A9444AAD",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[2001,"季卡",1,1,2001,2,[1,2,3,4,5],1,1,5,"4",1,50002,11,"B2A824894B2CE00CD0195BAFEA49F52C",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[3000,"勇者平地",1,1,6000,1,[4],1,1,1,"4",0,12004,3,"447FF0F64615026E16142897E22A9B37",null,new mw.Vector(0,0,0),new mw.Vector(0.1,0.1,0.1),"UI_others_16","每人限购{0}/{1}",null],[3001,"豪华别墅",1,1,14000,1,[4],1,1,1,"4",0,12002,4,"916BFB1549426D0BFF6057AF5BDE1F31",null,new mw.Vector(0,0,0),new mw.Vector(0.1,0.1,0.1),"UI_others_16","每人限购{0}/{1}",null],[3002,"现代小屋",1,1,30000,1,[4],1,1,1,"4",0,12003,5,"687DE4AF4803FC037B4336B6BF635C07",null,new mw.Vector(0,0,0),new mw.Vector(0.1,0.1,0.1),"UI_others_16","每人限购{0}/{1}",null],[3003,"芭比小屋",1,1,68000,1,[4],1,1,1,"4",0,12001,6,"BB9536BE40A8A9D88AAAB3A53A2B0C8E",null,new mw.Vector(0,0,0),new mw.Vector(0.1,0.1,0.1),"UI_others_16","每人限购{0}/{1}",null],[500,"现代家具装包",10,1,1000,1,[4],1,1,4,"3",0,2001,10,"413925824E9D4EEBD64E24B8054B18D8",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[501,"古典家具装饰包",10,1,1000,1,[4],1,1,4,"3",0,2002,11,"E5FF3090431F69F8FDF0CD887C08EAA8",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[502,"蓝色家具装饰包",10,1,1000,1,[4],1,1,4,"3",0,2003,12,"D5A71B2E4778A28E339948ABA115A99F",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[503,"粉色家具装饰包",10,1,2000,1,[4],1,1,4,"3",0,2004,13,"2373E3DA4D2101AE5EAFB9B07CFADDC9",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[504,"铁质防御素材包",10,1,1000,1,[4],1,1,4,"3",0,2010,14,"A24FFE584C669AEF03CBFBB31394FF7C",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[505,"黄金防御素材包",10,1,2000,1,[4],1,1,4,"3",0,2011,15,"69FCB4D4431C7900266785A011B8C99F",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[506,"钻石防御素材包",10,1,6000,1,[4],1,1,4,"3",0,2012,16,"6AE876E14F1CED33D613388E2B1ED816",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(1.3,1.3,1.3),null,null,null],[100001,"霰弹枪",1,1,4999,1,[5],1,0,10,"1",0,2002,3,"D96229B84831C8AA133768B269098E41",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[100002,"机枪",1,1,11999,1,[5],1,0,10,"1",0,2003,3,"C6D4A3124156216EE79C8781A9444AAD",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[100003,"步枪",1,1,19999,1,[5],1,0,10,"1",0,2004,3,"B2A824894B2CE00CD0195BAFEA49F52C",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(0.4,0.4,0.4),null,null,null],[200001,"尖叫鸡",3,2,0,1,[1,2,3,4,5],1,1,2,"1",0,10025,1,"A5D8735B4218994D4A0542B010617836",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(2,2,2),"UI_others_11","每日限购{0}/{1}",null],[200002,"尖叫鸡",-1,1,200,1,[1,2,3,4,5],1,1,2,"1",0,10025,2,"A5D8735B4218994D4A0542B010617836",new mw.Vector(0,0,-10),new mw.Vector(0,0,-90),new mw.Vector(2,2,2),null,null,null],[210001,"齿轮",-1,1,10,1,[5],1,1,2,"1",0,51001,16,"90E3B023442DB6346F23B7BBAEB58CE3",new mw.Vector(0,0,20),new mw.Vector(90,0,-90),new mw.Vector(0.7,0.7,0.7),null,null,null],[210002,"粘合剂",-1,1,425,1,[5],1,1,2,"1",0,51002,17,"3AF61B9C46663A8CF10DC1893ED3F760",new mw.Vector(0,0,20),new mw.Vector(0,0,0),new mw.Vector(1.4,1.4,1.4),null,null,null],[220001,"灵异胶卷",-1,1,200,1,[1,2,3,4,5],1,1,2,"1",0,51004,1,"6AC80D3A435F2BD4299112B54F62FE5B",new mw.Vector(0,10,10),new mw.Vector(90,180,-90),new mw.Vector(2.5,2.5,2.5),null,null,null],[230005,"吸粉礼包",2,2,100,1,[1,2,3,4,5],1,1,4,"1",0,61023,1,"B11441C54C766D9112A67984DE965061",new mw.Vector(0,0,-5),new mw.Vector(0,0,120),new mw.Vector(1.3,1.3,1.3),"UI_others_11","每日限购{0}/{1}",null],[230006,"嗨粉礼包",3,3,500,1,[1,2,3,4,5],1,1,4,"1",0,61024,1,"AC20EA8149335A9EF7FE7AA249889491",new mw.Vector(20,12,0),new mw.Vector(0,0,230),new mw.Vector(0.12,0.12,0.12),"UI_others_14","每周限购{0}/{1}",null],[240001,"图纸碎片",-1,1,40,1,[4],1,1,2,"1",0,20000,1,"F435EA6143D0E4A735B3A1A3D7BFA7A6",new mw.Vector(0,5,40),new mw.Vector(0,0,0),new mw.Vector(2,2,2),null,null,[0.0016,3,7]]];
export interface IShopElement extends IElementBase{
 	/**ID*/
	id:number
	/**备注*/
	name:string
	/**限购数量(-1表示不限购)*/
	buyLimit:number
	/**限购类型1.背包限购 2 每日限购 3每周限购 4每月限购*/
	limitType:number
	/**价格（如果是乐币就读乐币商品表）*/
	price:number
	/**货币类型*/
	currencyType:number
	/**所属游戏（查游戏主题表的ID）*/
	showGameID:Array<number>
	/**商店ID*/
	shopID:number
	/**是否在商店中显示（0=不显示，1=显示）*/
	show:number
	/**道具类型*/
	type:number
	/**上架时间*/
	listingTime:string
	/**是否是道具（0*/
	shopItemType:number
	/**道具，1月卡，季卡）*/
	itemID:number
	/**关联道具表id*/
	weight:number
	/**权重*/
	modelGuid:string
	/**模型ID*/
	otherLoc:mw.Vector
	/**模型位移*/
	otherRot:mw.Vector
	/**模型旋转*/
	otherScale:mw.Vector
	/**模型缩放*/
	limitString:string
	/**限购文本*/
	limitString_Desc:string
	/**限购文本备注*/
	wantParams:Array<number>
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}