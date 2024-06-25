import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","detail","dropItemId","dropCount","dropPropability"],["","","","",""],[1,"难度1掉落",[51001,51002],[[65,75],[1,2]],[1,0.1]],[2,"难度2掉落",[51001,51002],[[70,85],[1,2]],[1,0.15]],[3,"难度3掉落",[51001,51002],[[75,90],[1,2]],[1,0.2]],[4,"难度4掉落",[51001,51002],[[80,95],[1,2]],[1,0.25]],[5,"难度5掉落",[51001,51002],[[85,100],[1,2]],[1,0.3]],[6,"boss掉落",[10201,10200,51001,51002],[[500,500],[100,100],[200,200],[5,5]],[1,1,1,1]],[7,"影人掉落",[20000],[[1,2]],[1]],[8,"飞行影人掉落",[20000],[[1,2]],[1]],[9,"血月影人掉落",[20000],[[1,2]],[1]],[10,"血月飞行影人掉落",[20000],[[1,2]],[1]],[11,"喷火猪掉落",[7112,7113,7114,20000],[[5,8],[5,8],[5,8],[1,2]],[0.4,0.4,0.4,1]],[12,"狼掉落",[7112,7113,7114,20000],[[5,8],[5,8],[5,8],[1,2]],[0.4,0.4,0.4,1]]];
export interface IDropItemElement extends IElementBase{
 	/**ID*/
	id:number
	/**描述*/
	detail:string
	/**掉落道具的id(关联掉落的道具配置)*/
	dropItemId:Array<number>
	/**掉落数量*/
	dropCount:Array<Array<number>>
	/**掉落率(掉落概率独立的，可以一个不掉，也可以都掉)*/
	dropPropability:Array<number>
 } 
export class DropItemConfig extends ConfigBase<IDropItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}