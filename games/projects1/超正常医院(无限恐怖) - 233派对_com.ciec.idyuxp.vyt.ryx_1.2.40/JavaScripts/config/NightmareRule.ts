import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Page","ImageGuid","Text","Title"],["","","","",""],[1,1,"328982","感染模式中玩家会在夜晚中被随机分派“猎手”与“求生者”角色","”猎手“与”求生者“"],[2,1,"328976","猎手玩家可对求生者展开追捕并进行感染，猎手感染全部求生者后，则求猎手阵营获胜！","”猎手“与”求生者“"],[3,2,"328979","被猎手攻击到的求生者会陷入感染状态，在感染进度条结束后就会转化为猎手！","感染"],[4,2,"328983","其他求生着可对进入感染状态得玩家进行施救，游戏时间结束时还有求生者生存，则求生者获胜！","施救"]];
export interface INightmareRuleElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**所属页码*/
	Page:number
	/**图片Guid*/
	ImageGuid:string
	/**文字说明*/
	Text:string
	/**小标题*/
	Title:string
 } 
export class NightmareRuleConfig extends ConfigBase<INightmareRuleElement>{
	constructor(){
		super(EXCELDATA);
	}

}