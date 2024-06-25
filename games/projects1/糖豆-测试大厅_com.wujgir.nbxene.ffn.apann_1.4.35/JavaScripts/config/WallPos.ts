import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","wallTrans"],["",""],[1,[new mw.Vector(764,112,-191),new mw.Vector(0,0,0),new mw.Vector(1,14,6)]]];
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