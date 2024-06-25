import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","itemLevelId","guid","damage","isDisDamage","fireInter","range","otherStance","bulletLoc","fireEffect","fireSound","bulletID","bulletNum","fireEffRot","fireEffScale","fireEffOffset","shiftTime","shiftMus","force","shakeRotY","shakePosX","shakeTime"],["","","","","","","","","","","","","","","","","","","","","","",""]];
export interface IHotWeaponElement extends IElementBase{
 	/**id*/
	id:number
	/**热武器名*/
	name:string
	/**关联强化等级配置*/
	itemLevelId:number
	/**武器模型guid*/
	guid:string
	/**伤害*/
	damage:number
	/**是否接入距离衰减*/
	isDisDamage:boolean
	/**连续开火时间间隔（毫秒）*/
	fireInter:number
	/**射程*/
	range:number
	/**别人眼里的姿态*/
	otherStance:string
	/**发射子弹的相对位置*/
	bulletLoc:mw.Vector
	/**开火特效*/
	fireEffect:string
	/**开火音效*/
	fireSound:number
	/**关联子弹表的id*/
	bulletID:number
	/**弹夹子弹数量*/
	bulletNum:number
	/**开火特效相对旋转*/
	fireEffRot:Array<number>
	/**开火特效缩放*/
	fireEffScale:mw.Vector
	/**开火特效偏移*/
	fireEffOffset:mw.Vector
	/**换弹时间/s*/
	shiftTime:number
	/**换弹音效*/
	shiftMus:number
	/**后坐力*/
	force:number
	/**开火相对晃动Y轴旋转*/
	shakeRotY:number
	/**开火相对晃动的X轴位移*/
	shakePosX:number
	/**晃动时间（毫秒）*/
	shakeTime:number
 } 
export class HotWeaponConfig extends ConfigBase<IHotWeaponElement>{
	constructor(){
		super(EXCELDATA);
	}

}