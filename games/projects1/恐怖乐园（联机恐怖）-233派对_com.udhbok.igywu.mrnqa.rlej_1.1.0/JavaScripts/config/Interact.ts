import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","day_desc","activeGuid","passiveGuid","interactNum","bePickedPlayerRelativeLoc","bePickedPlayerRelativeRot","slotPos"],["","","","","","","",""],[1,"公主抱","14751","35445",1,new mw.Vector(0,10,-10),new mw.Vector(-90,0,0),19],[2,"跟随","280794","280794",2,new mw.Vector(0,0,0),new mw.Vector(0,0,0),23]];
export interface IInteractElement extends IElementBase{
 	/**id*/
	id:number
	/**动作名称（策划看）*/
	day_desc:string
	/**主动动作guid*/
	activeGuid:string
	/**被动动作guid*/
	passiveGuid:string
	/**可交互玩家数*/
	interactNum:number
	/**被抱起玩家的相对位置*/
	bePickedPlayerRelativeLoc:mw.Vector
	/**被抱起玩家的相对旋转*/
	bePickedPlayerRelativeRot:mw.Vector
	/**交互插槽位置*/
	slotPos:number
 } 
export class InteractConfig extends ConfigBase<IInteractElement>{
	constructor(){
		super(EXCELDATA);
	}

}