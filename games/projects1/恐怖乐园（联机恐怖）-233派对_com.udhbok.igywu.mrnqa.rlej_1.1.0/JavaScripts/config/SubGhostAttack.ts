import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Desc","json","dis","cd","force"],["","","","","",""],[10000,"普通僵尸","{\"charFightIdelAniId\":\"97859\",\"charFightIdelSlot\":\"2\",\"autoFocus\":\"0\",\"autoFocusRadius\":\"500\",\"autoFocusAngle\":\"90\",\"autoFocusDistFactor\":\"1\",\"infos\":[{\"type\":\"7\",\"duration\":\"2000\",\"frontRockLength\":\"0\",\"isCharge\":\"0\",\"isAutoPlay\":\"0\",\"chargeTime\":[\"-1\",\"-1\",\"-1\"]},{\"type\":\"1\",\"guid\":\"97856\",\"slotIndex\":\"0\",\"duration\":\"2000\",\"rate\":\"1\",\"delayPlayTime\":\"0\",\"loop\":\"0\",\"hitLength\":\"0\",\"frontRockLength\":\"0\",\"isCharge\":\"0\",\"isAutoPlay\":\"0\"},{\"type\":\"5\",\"skillIndex\":\"1\",\"skillAngle\":\"120\",\"offsetPos\":[\"0\",\"0\",\"0\"],\"skillRadius\":\"0\",\"skillHeight\":\"120\",\"skillLength\":\"150\",\"skillWidth\":\"150\",\"delayPlayTime\":\"500\"},{\"type\":\"4\",\"guid\":\"207360\",\"delayPlayTime\":\"300\",\"stopTime\":\"1000\"}]}",150,1.3,new mw.Vector(500,0,200)]];
export interface ISubGhostAttackElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	Desc:string
	/**鬼的json*/
	json:string
	/**判断距离*/
	dis:number
	/**冷却时间*/
	cd:number
	/**冲量大小*/
	force:mw.Vector
 } 
export class SubGhostAttackConfig extends ConfigBase<ISubGhostAttackElement>{
	constructor(){
		super(EXCELDATA);
	}

}