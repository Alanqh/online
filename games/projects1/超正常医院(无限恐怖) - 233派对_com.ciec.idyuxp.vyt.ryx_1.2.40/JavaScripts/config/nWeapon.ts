import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","weaId","weaPos","weaRot","weaScale","bulletID","bulletMaxCount","fireSoundId","fireSoundVom"],["","","","","","","","","",""],[1001,"脉冲枪","155696",new mw.Vector(0,0,-10),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1002,10,"261160",1],[1002,"动感波枪","221099",new mw.Vector(0,0,-11),new mw.Vector(0,0,1),new mw.Vector(1,1,1),1003,20,"261160",1],[1003,"团扇","210582",new mw.Vector(0,0,-12),new mw.Vector(0,0,2),new mw.Vector(0.1,0.1,0.1),1004,20,"261160",1]];
export interface InWeaponElement extends IElementBase{
 	/**ID*/
	ID:number
	/**武器名*/
	Name:string
	/**武器资源id*/
	weaId:string
	/**武器相对坐标*/
	weaPos:mw.Vector
	/**武器相对旋转*/
	weaRot:mw.Vector
	/**武器相对缩放*/
	weaScale:mw.Vector
	/**子弹id*/
	bulletID:number
	/**子弹上限*/
	bulletMaxCount:number
	/**开火音效资源id*/
	fireSoundId:string
	/**开火音效大小*/
	fireSoundVom:number
 } 
export class nWeaponConfig extends ConfigBase<InWeaponElement>{
	constructor(){
		super(EXCELDATA);
	}

}