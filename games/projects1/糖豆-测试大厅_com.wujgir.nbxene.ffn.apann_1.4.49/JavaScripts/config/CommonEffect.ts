import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","EfectGuid","EffectOffset","EffectColor","IsLoop"],["","","","",""],[1,["153616"],[new mw.Vector(0,0,-60),new mw.Vector(0,0,0),new mw.Vector(2,2,2)],null,false,null,null,"复活检测到玩家【复活】时"],[10,["151535"],[new mw.Vector(0,0,-60),new mw.Vector(0,0,0),new mw.Vector(2,2,2)],null,false,null,null,"检测到玩家【跳跃】时"]];
export interface ICommonEffectElement extends IElementBase{
 	/**编号（对应参数）*/
	ID:number
	/**特效ID*/
	EfectGuid:Array<string>
	/**特效偏移*/
	EffectOffset:mw.Vector[]
	/**特效换色*/
	EffectColor:Array<number>
	/**状态内是否循环播放*/
	IsLoop:boolean
 } 
export class CommonEffectConfig extends ConfigBase<ICommonEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}