import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","resId","nAmmoType","speed","gravityScale","scale","rotation","DanceList","TarnsferID"],["","","","","","","","","",""],[1002,"脉冲枪子弹","286792",1,5000,0,new mw.Vector(2,2,2),new mw.Vector(0,0,0),null,null],[1003,"动感波弹","129106",1,5001,0,new mw.Vector(2,2,2),new mw.Vector(0,90,0),[63,65,66,67,68],null],[1004,"团扇子弹","160703",1,5001,0,new mw.Vector(2,2,3),new mw.Vector(0,90,1),null,["151157","151813","151835","152166","156484","156703","156752","192803"]]];
export interface InBulletElement extends IElementBase{
 	/**ID*/
	ID:number
	/**子弹名*/
	Name:string
	/**子弹资源id*/
	resId:string
	/**子弹类型（1：特效 2：模型
3:预制体）*/
	nAmmoType:number
	/**子弹速度（单位：秒）*/
	speed:number
	/**子弹重力*/
	gravityScale:number
	/**子弹缩放*/
	scale:mw.Vector
	/**子弹旋转*/
	rotation:mw.Vector
	/**舞蹈id列表*/
	DanceList:Array<number>
	/**变身模型ID*/
	TarnsferID:Array<string>
 } 
export class nBulletConfig extends ConfigBase<InBulletElement>{
	constructor(){
		super(EXCELDATA);
	}

}