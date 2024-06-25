import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","difficult","name","atk","hp","effect","effectSlot","effectLoc","effectScale","effectRot","effectColor","rewardRate","weight","ghostpool","littles"],["","","","","","","","","","","","","","",""],[1,1,"简单",0.75,0.75,null,0,null,0,null,null,0.75,2,[20001],[20011,3]],[2,2,"普通",1,1,null,0,null,0,null,null,1,4,[20001],[20011,3]],[3,3,"困难",1.2,1.2,null,0,null,0,null,null,1.2,3,[20001],[20011,3]],[4,4,"恶名",1.36,1.36,null,0,null,0,null,null,1.36,1,[20001],[20011,3]]];
export interface IGhostBossDifficultElement extends IElementBase{
 	/**id*/
	id:number
	/**难度*/
	difficult:number
	/**难度名字*/
	name:string
	/**攻击率*/
	atk:number
	/**生命值率*/
	hp:number
	/**特效*/
	effect:string
	/**特效插槽*/
	effectSlot:number
	/**特效偏移位置*/
	effectLoc:mw.Vector
	/**特效缩放*/
	effectScale:number
	/**特效旋转*/
	effectRot:mw.Vector
	/**特效颜色*/
	effectColor:string
	/**奖励比例*/
	rewardRate:number
	/**权重*/
	weight:number
	/**怪物池子*/
	ghostpool:Array<number>
	/**小怪配置*/
	littles:Array<number>
 } 
export class GhostBossDifficultConfig extends ConfigBase<IGhostBossDifficultElement>{
	constructor(){
		super(EXCELDATA);
	}

}