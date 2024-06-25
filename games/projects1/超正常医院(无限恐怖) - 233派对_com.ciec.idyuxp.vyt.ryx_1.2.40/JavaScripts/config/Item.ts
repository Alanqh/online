/**aits-ignore*/
import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Name","Tab","Describe","Icon","AssetID","SourceType","HangingPointPosition","Size","Rotate","ActionAnimation","Faction","CreateNum","Stack","FactionID","Probability","IsUse","WeaponId","IsSingle","IsInBag","IsInItem","QualityType","isAsset"],["","Language","","Language","","","","","","","","","","","","","","","","","","",""],[1001,"Item_Name_1",4,"Tips_78","167921","118289",0,16,new mw.Vector(0.5,0.5,0.5),new mw.Vector(90,0,0),null,2,30,5,["7007"],[100],false,0,null,true,true,1,false],[1002,"Item_Name_2",3,"Tips_79","137153","50131",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,3,20,5,["7003","7004"],[50,50],true,0,null,true,true,1,false],[1003,"Item_Name_3",3,"Tips_80","60219","40834",0,16,new mw.Vector(0.05,0.05,0.05),new mw.Vector(90,0,0),null,3,20,5,["7005","7006"],[70,30],true,0,null,true,true,1,false],[1004,"Item_Name_4",3,"Tips_81","103379","175232",0,16,new mw.Vector(2,2,2),new mw.Vector(0,0,0),null,3,20,5,["7001","7002"],[70,30],true,0,null,true,true,1,false],[1005,"Item_Name_5",3,"Tips_82","97101","40811",0,16,new mw.Vector(0.05,0.05,0.05),new mw.Vector(0,0,0),null,3,20,5,["7005","7006"],[70,30],true,0,null,true,true,1,false],[1006,"Item_Name_6",3,"Tips_83","193565","40869",0,16,new mw.Vector(0.05,0.05,0.05),new mw.Vector(0,0,0),null,3,20,5,["7005","7006"],[70,30],true,0,null,true,true,1,false],[1007,"摇摇乐",2,"坐上去后会疯狂摇晃",null,"88654",0,19,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1008,"猴子头套",2,"谁还不是一只可怜的吗喽",null,"234390",0,1,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1009,"猴子头套",2,"谁还不是一只可怜的吗喽",null,"234389",0,1,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1010,"砍刀",4,"屠夫专武",null,"118142",0,16,null,null,null,2,0,0,null,null,false,0,null,true,true,1,false],[1011,"长刀",4,"饱含邪念的妖刀",null,"40715",0,16,null,null,null,2,0,0,null,null,false,0,null,true,true,1,false],[1012,"手术刀粗糙版",4,"开瓢专用",null,"85721",0,16,null,null,null,2,0,0,null,null,false,0,null,true,true,1,false],[1013,"路牌",4,"削掉你的狗头",null,"37470",0,16,null,null,null,2,0,0,null,null,false,0,null,true,true,1,false],[1014,"柜子",1,"躲在柜子里总能发现一些不可思议的事情",null,"44765",0,0,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1015,"床",1,"床底下非常的安全",null,"34243",0,0,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1016,"垃圾桶",1,"实在不行，也可以凑合一下，毕竟狗命要紧",null,"37444",0,0,null,null,null,1,0,0,null,null,false,0,null,true,true,1,false],[1017,"Tips_66",5,"Tips_85","144243","155696",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,2,30,5,["7003"],[100],false,1001,null,true,true,1,false],[1018,"Tips_96",5,"Tips_153","316179","155696",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,1,0,5,null,null,false,0,null,true,false,1,true],[1019,"Tips_97",6,"Tips_154","316473","155696",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,1,0,5,null,null,true,0,null,true,false,2,true],[1020,"Tips_98",5,"Tips_155","316182","221099",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,2,0,1,["7003"],null,false,1002,true,true,true,2,true],[1021,"Tips_153",7,"Tips_156","144243","047F33AB4841D12061B1CDBEBF72F0B5",2,16,new mw.Vector(2,2,2),new mw.Vector(0,0,0),null,1,30,10,null,null,false,1002,null,false,false,3,true],[1022,"Tips_198",8,"Tips_199","308643","155696",0,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,0,0,0,null,null,null,0,true,null,null,2,true],[1023,"Tips_200",0,"Tips_201","317289",null,0,0,null,null,null,0,0,0,null,null,false,0,null,false,false,2,true],[1024,"Tips_196",5,"Tips_197","324985","D1E488D7482363CE5F51B184A7224FF4",2,16,new mw.Vector(1,1,1),new mw.Vector(0,0,0),null,2,0,1,["7008"],null,false,1003,true,true,true,2,true],[1025,"Tips_226",9,"Tips_226","327201",null,0,0,null,null,null,0,0,0,null,null,true,0,null,true,false,2,true],[1026,"Tips_227",10,"Tips_227","324532",null,0,0,null,null,null,0,0,0,null,null,false,0,null,false,false,2,true]];
export interface IItemElement extends IElementBase{
 	/**id*/
	id:number
	/**物品名称*/
	Name:string
	/**物品分类页签：
1.道具
2.玩具
3.血药
4.武器
5.枪
6.变身卡
7.子弹
8.名牌
9.抽奖券
10.代币*/
	Tab:number
	/**物品用途描述*/
	Describe:string
	/**物品icon*/
	Icon:string
	/**物品的模型资源ID*/
	AssetID:string
	/**资源类型
资源库资源 0*/
	SourceType:number
	/**
场景对象 1*/
	HangingPointPosition:number
	/**
 预制体 2*/
	Size:mw.Vector
	/**物品挂点位置*/
	Rotate:mw.Vector
	/**物品模型尺寸*/
	ActionAnimation:string
	/**物品模型摆放旋转*/
	Faction:number
	/**使用物品时的动画*/
	CreateNum:number
	/**物品功能
1.交互道具
2.武器
3.San值恢复或者减少*/
	Stack:number
	/**生成数量*/
	FactionID:Array<string>
	/**物品堆叠上限，-1为不可放入装备栏物品*/
	Probability:Array<number>
	/**功能ID*/
	IsUse:boolean
	/**概率*/
	WeaponId:number
	/**是否可使用*/
	IsSingle:boolean
	/**武器表id*/
	IsInBag:boolean
	/**是否只能拥有1个*/
	IsInItem:boolean
	/**是否加入背包*/
	QualityType:number
	/**是否可加入道具栏*/
	isAsset:boolean
 } 
export class ItemConfig extends ConfigBase<IItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}