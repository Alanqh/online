import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guid","offset","rotation","scale"],["","","","",""],[1,"153599",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),"小碰撞（比如上下平移的杠杆/会把人弹开的碰撞体）"],[2,"153610",new mw.Vector(0,0,0),new mw.Vector(0,0,-120),new mw.Vector(2,2,2),"大碰撞（比如大摆锤、旋转摆锤之类的）"],[3,"119346",new mw.Vector(0,0,-100),new mw.Vector(0,0,0),new mw.Vector(1.7,1.7,1.7),"蹦床/弹起平台等会把人弹起来的"],[4,"158089",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.8,1.8,1.8),"弹射大炮"]];
export interface IEffectElement extends IElementBase{
 	/**id*/
	id:number
	/**特效guid*/
	guid:string
	/**偏移*/
	offset:mw.Vector
	/**旋转*/
	rotation:mw.Vector
	/**缩放*/
	scale:mw.Vector
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}