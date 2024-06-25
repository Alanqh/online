import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","wallTrans"],["",""],[1,[new mw.Vector(875,8,994),new mw.Vector(0,0,0),new mw.Vector(1,64,16)]]];
export interface IWallPosElement extends IElementBase{
 	/**id（关卡id）*/
	id:number
	/**空气墙位置\角度\大小*/
	wallTrans:mw.Vector[]
 } 
export class WallPosConfig extends ConfigBase<IWallPosElement>{
	constructor(){
		super(EXCELDATA);
	}

}