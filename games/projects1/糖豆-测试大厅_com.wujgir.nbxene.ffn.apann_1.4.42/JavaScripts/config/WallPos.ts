import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","wallTrans"],["",""],[1,[new mw.Vector(-82.95,-930.54,68.66),new mw.Vector(0,0,90),new mw.Vector(3,12,5.42)]]];
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