/**aits-ignore*/
import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","tabName","tabSelectName","tabLevel","childTabId","shopItem","des"],["","Language","Language","","","",""],[1011,"Tips_112","Tips_114",1,null,[4001,4002,4003],"补给"],[1001,"Tips_107","Tips_102",1,[2002,2001],[1001,1002,2001,2004],"派对币商城"],[1012,"Tips_113","Tips_115",1,null,[5001],"vip"],[1010,"Tips_109","Tips_104",1,null,[3009,3010,3006,3004,3005,3007,3002,3003,2002,2003],"特惠礼包"],[1013,"Tips_188","Tips_189",1,null,[7001,7002,7003],"充值"],[1014,"Tips_206","Tips_211",1,[2003,2004,2005,2006,2007,2008],[8101,8102,8103,8207,8208,8201,8202,8203,8204,8205,8206,8303,8304,8305,8401,8402,8501,8502,8601,8602],"挂件"],[1015,"Tips_227","Tips_228",1,null,[9001,9002,9003,9004,9005,9006,9007,9008,9009,9010,9011],"代币"],[2001,"Tips_110","Tips_105",2,null,[1001,1002],"道具"],[2002,"Tips_111","Tips_106",2,null,[2001,2004],"枪械","|"],[2003,"Tips_202","Tips_207",2,null,[8101,8102,8103],"头饰","8101|8102|8103|8207|8208|8201|8202|8203|8204|8205|8206|8303|8304|8305|8401|8402|8501|8502|8601|8602"],[2004,"Tips_203","Tips_208",2,null,[8207,8208,8201,8202,8203,8204,8205,8206],"背饰"],[2005,"Tips_204","Tips_209",2,null,[8303,8304,8305],"手饰"],[2006,"Tips_205","Tips_210",2,null,[8401,8402],"脚饰"],[2007,"Tips_247","Tips_249",2,null,[8501,8502],"死亡特效"],[2008,"Tips_248","Tips_250",2,null,[8601,8602],"入场特效"]];
export interface IShopElement extends IElementBase{
 	/**表id*/
	ID:number
	/**标签名字*/
	tabName:string
	/**一级标签选中名字*/
	tabSelectName:string
	/**标签级别
1:一级标签
2: 二级标签*/
	tabLevel:number
	/**子标签id*/
	childTabId:Array<number>
	/**商品列表（索引商品表）*/
	shopItem:Array<number>
	/**备注用*/
	des:string
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}