import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name_desc","type","maxLevel","needsId","exLevel","itemId","propertyId","scale","offset","rot"],["","","","","","","","","","",""],[1,"手枪",1,30,1,6,1001,1,new mw.Vector(3,3,3),new mw.Vector(0,0,0),new mw.Vector(0,0,0)],[2,"霰弹枪",1,30,1,6,2002,2,new mw.Vector(2.5,2.5,2.5),new mw.Vector(0,25,0),new mw.Vector(0,0,0)],[3,"机枪",1,30,1,6,2003,3,new mw.Vector(1.2,1.2,1.2),new mw.Vector(0,20,10),new mw.Vector(0,0,0)],[4,"步枪",1,30,1,6,2004,4,new mw.Vector(2.5,2.5,2.5),new mw.Vector(0,0,0),new mw.Vector(0,0,0)],[5,"球棒",2,20,2,4,2001,5,new mw.Vector(1.1,1.1,1.1),new mw.Vector(0,6,20),new mw.Vector(0,-45,0)],[2000,"孤岛武器强化",2,0,0,0,0,0,null,null,null]];
export interface IItemLevelElement extends IElementBase{
 	/**id*/
	id:number
	/**名称备注*/
	name_desc:string
	/**强化类型（
1.热武器
2.冷兵器
）*/
	type:number
	/**最大等级*/
	maxLevel:number
	/**各等级需求，关联需求配置*/
	needsId:number
	/**额外强化（需要使用乐币强化，没有就不填）*/
	exLevel:number
	/**关联道具配置（没有就不填）*/
	itemId:number
	/**关联强化属性表*/
	propertyId:number
	/**缩放*/
	scale:mw.Vector
	/**偏移*/
	offset:mw.Vector
	/**旋转*/
	rot:mw.Vector
 } 
export class ItemLevelConfig extends ConfigBase<IItemLevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}