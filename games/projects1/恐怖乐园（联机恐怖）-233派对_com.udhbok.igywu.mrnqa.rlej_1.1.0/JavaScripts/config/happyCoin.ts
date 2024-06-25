import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","value","clazz","outValue","outClazz","itemID"],["","","","","","",""],[1000,"档位1 ，1000恐惧币，1元",100,"2r13Mk200007Q",20,"3xme0ZX00008T",20001],[1001,"档位2 ，6000恐惧币，6元",600,"FyDVRWJ00007R",120,"3sKGWAE00008S",20002],[1002,"档位3 ，10000恐惧币，10元",1000,"3CqZKjg00007V",200,"3d2nwcb00008R",20003],[1003,"档位4 ，18000恐惧币，18元",1800,"9b4sL9N00007W",360,"7OdQ8To00008Q",20004],[1004,"档位5 ，30000恐惧币，30元",3000,"CU5hcvh00007X",600,"429LbIW00008P",20005],[1005,"档位6 ，48000恐惧币，48元",4800,"7WH8Mix00007Y",960,"8IIswEw00008O",20006],[1006,"档位7，64000恐惧币，64元",6400,"55dsQfM00007Z",1280,"CFtw0az00008N",20007],[2000,"月卡，30元，别改ID",3000,"4lziGOi00007a",600,"1ocCRPw00008M",0],[2001,"季卡，88元，别改ID",8800,"2EoOwFZ00007b",1760,"7jNGCQd00008L",0],[101,"周礼包，0.2元",20,"7I5Lu720000BE",4,"7EoL3LM00008K",10022],[102,"月礼包，0.99元",99,"A5dnhU50000BF",20,"71iEHAE00008J",10023],[103,"每日抽奖 ，暂时移除",40,"7I5Lu710000BD",80,"待定",10024],[22,"禁入特权卡",1200,"4dGKHKA0000NP",0,null,10100],[3000,"武器强化1",200,"89wdY8gNTCN0000P6",0,null,0],[3001,"武器强化2",980,"1mdr50MrTMT0000P7",0,null,0],[3002,"武器强化3",1980,"1vmx5XbIdgs0000P8",0,null,0],[3003,"武器强化4",3280,"AIHGfivuB2e0000P9",0,null,0],[3004,"武器强化5",6480,"1monkIMedak0000PA",0,null,0],[3005,"武器强化6",13800,"9yLlReBkRUp0000PB",0,null,0]];
export interface IhappyCoinElement extends IElementBase{
 	/**商品ID*/
	id:number
	/**备注*/
	desc:string
	/**商品价格*/
	value:number
	/**商品标签*/
	clazz:string
	/**海外商品价格*/
	outValue:number
	/**海外商品标签*/
	outClazz:string
	/**关联道具id（两张月卡单独支持的逻辑）*/
	itemID:number
 } 
export class happyCoinConfig extends ConfigBase<IhappyCoinElement>{
	constructor(){
		super(EXCELDATA);
	}

}