import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","gameTime","playerNum","loadTime","overlookTime","countDownTime","gameEndTime","resultTime","chooseMapTime","spawns","seats","redBlock","greenBlock","levelPic","seatPoint"],["","","","","","","","","","","","","","","","",""],[1,"Level_035",1,140,6,8,6,3,4,7,10,[new mw.Vector(286,-321,1030),new mw.Vector(286,-171,1030),new mw.Vector(286,-21,1030),new mw.Vector(286,128,1030),new mw.Vector(286,278,1030),new mw.Vector(286,428,1030),new mw.Vector(136,428,1030),new mw.Vector(136,278,1030),new mw.Vector(136,128,1030),new mw.Vector(136,-21,1030),new mw.Vector(136,-171,1030),new mw.Vector(136,-321,1030),new mw.Vector(-13,428,1030),new mw.Vector(-13,278,1030),new mw.Vector(-13,128,1030),new mw.Vector(-13,-21,1030),new mw.Vector(-13,-171,1030),new mw.Vector(-13,-321,1030),new mw.Vector(-163,428,1030),new mw.Vector(-163,278,1030),new mw.Vector(-163,128,1030),new mw.Vector(-163,-21,1030),new mw.Vector(-163,-171,1030),new mw.Vector(-163,-321,1030)],[new mw.Vector(9905,10550,9950),new mw.Vector(9905,10330,9950),new mw.Vector(9905,10105,9950),new mw.Vector(9905,9880,9950),new mw.Vector(9905,9660,9950),new mw.Vector(9905,9435,9950),new mw.Vector(10130,10550,9950),new mw.Vector(10130,10330,9950),new mw.Vector(10130,10105,9950),new mw.Vector(10130,9880,9950),new mw.Vector(10130,9660,9950),new mw.Vector(10130,9435,9950),new mw.Vector(10360,10550,9950),new mw.Vector(10360,10330,9950),new mw.Vector(10360,10105,9950),new mw.Vector(10360,9880,9950),new mw.Vector(10360,9660,9950),new mw.Vector(10360,9435,9950),new mw.Vector(10590,10550,9950),new mw.Vector(10590,10330,9950),new mw.Vector(10590,10105,9950),new mw.Vector(10590,9880,9950),new mw.Vector(10590,9660,9950),new mw.Vector(10590,9435,9950),new mw.Vector(10830,10330,9950),new mw.Vector(10830,10105,9950),new mw.Vector(10830,9880,9950),new mw.Vector(10830,9660,9950)],"656C624348417E5F52AD849400E71FBD","9AB294284C7DD3130FB4FFAD3A8820D1",265963,new mw.Vector(10000,10000,10000)]];
export interface IGameInfoElement extends IElementBase{
 	/**id*/
	id:number
	/**游戏名*/
	name:string
	/**类型：
1-竞速；
2-淘汰。*/
	type:number
	/**游戏最大时长*/
	gameTime:number
	/**人数要求*/
	playerNum:number
	/**load条时长 */
	loadTime:number
	/**俯瞰时长 */
	overlookTime:number
	/**倒计时时间 */
	countDownTime:number
	/**游戏结束UI显示时间 */
	gameEndTime:number
	/**淘汰结算时间 */
	resultTime:number
	/**选图时间 */
	chooseMapTime:number
	/**出生点位置*/
	spawns:mw.Vector[]
	/**淘汰点位置*/
	seats:mw.Vector[]
	/**淘汰方块*/
	redBlock:string
	/**过关方块*/
	greenBlock:string
	/**关卡展示图*/
	levelPic:number
	/**淘汰位置原点*/
	seatPoint:mw.Vector
 } 
export class GameInfoConfig extends ConfigBase<IGameInfoElement>{
	constructor(){
		super(EXCELDATA);
	}

}