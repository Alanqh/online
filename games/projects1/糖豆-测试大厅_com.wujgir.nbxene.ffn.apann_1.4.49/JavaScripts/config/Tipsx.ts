import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","tips"],["",""],[1,"每场对局分两轮比赛，第一轮胜利的玩家才能参加决赛哦~"],[2,"在空中点击跳跃键，可以向前飞扑，会比平时的跳跃更远一点哦~"]];
export interface ITipsxElement extends IElementBase{
 	/**id*/
	id:number
	/**提示文本*/
	tips:string
 } 
export class TipsxConfig extends ConfigBase<ITipsxElement>{
	constructor(){
		super(EXCELDATA);
	}

}