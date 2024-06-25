import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Des","Image","GameId","prefabGuid","waitTime","ScenceName"],["","","","","","","",""],[1,"惊奇游乐园","\"不正常小镇:游乐园\"\n在不正常小镇里,有一座早就荒废的游乐园。\n小丑在游乐园游荡,似乎充满善意。\n直到你们在游乐园迎来了第一个夜晚......","304447",null,"EFF166594F99F86371F34EB7CB8F53C0",5,"Park"],[2,"恐怖家具城","\"不正常小镇:恐怖家具城\": 假人军团控制了家具城，你能和朋友使用家具，建造属于自己的庇护所吗？","304449",null,"EFF166594F99F86371F34EB7CB8F53C0",5,"furniture"],[3,"致命废土","\"不正常小镇:致命废土\"\n辐射摧毁了这里,同时也让全世界的\"异常\"汇聚于此,在这里你会发现很多似曾相识的面孔,这会是在梦里吗?\n不论白天黑夜,他们都在这里游荡......","304448",null,"D3ECB181461DCFA540E779AE324880EA",5,"Town"]];
export interface ITeleportElement extends IElementBase{
 	/**ID*/
	ID:number
	/**名字*/
	Name:string
	/**描述*/
	Des:string
	/**图片Guid*/
	Image:string
	/**跳转游戏ID（短的）*/
	GameId:string
	/**传送门预制体Guid*/
	prefabGuid:string
	/**传送门持续时间*/
	waitTime:number
	/**场景名字*/
	ScenceName:string
 } 
export class TeleportConfig extends ConfigBase<ITeleportElement>{
	constructor(){
		super(EXCELDATA);
	}

}