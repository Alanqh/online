import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","itemId","itemId_desc","source","source_desc","weight"],["","","","Language","",""],[1,61001,"默认头像框","AvatarFrame_01","默认头像框",1],[2,61002,"星天开门","AvatarFrame_02","达成成就1获得",2],[3,61003,"星语红结","AvatarFrame_03","达成成就2获得",3],[4,61004,"星语星愿","AvatarFrame_04","达成成就3获得",4],[5,61005,"花叶碟语","AvatarFrame_05","达成成就4获得",5],[6,61006,"小鸡蹦蹦","AvatarFrame_06","达成成就5获得",6],[7,61007,"群鸡蹦蹦","AvatarFrame_07","达成成就6获得",7],[8,61008,"宇之博学者","AvatarFrame_08","达成成就7获得",8],[9,61009,"宙之博学者","AvatarFrame_09","达成成就8获得",9],[10,61010,"龙门之跃","AvatarFrame_10","达成成就9获得",10],[11,61011,"凤毛麟角","AvatarFrame_11","达成成就10获得",11],[12,61012,"寻物萌新","AvatarFrame_12","收藏5个魔物获得",12],[13,61013,"探索小将","AvatarFrame_13","收藏30个魔物获得",13],[14,61014,"时间掌控者","AvatarFrame_14","收藏50个魔物获得",14],[15,61017,"白玫瑰之梦","AvatarFrame_15","七日签到获得",15],[16,61025,"红玫瑰","AvatarFrame_16","通过游戏内实名认证后获得",16]];
export interface IAvatarFrameElement extends IElementBase{
 	/**id*/
	id:number
	/**头像框在公用道具表对应的id*/
	itemId:number
	/**名称备注*/
	itemId_desc:string
	/**头像框获得途径*/
	source:string
	/**获得途径文本备注*/
	source_desc:string
	/**权重（头像框排序）*/
	weight:number
 } 
export class AvatarFrameConfig extends ConfigBase<IAvatarFrameElement>{
	constructor(){
		super(EXCELDATA);
	}

}