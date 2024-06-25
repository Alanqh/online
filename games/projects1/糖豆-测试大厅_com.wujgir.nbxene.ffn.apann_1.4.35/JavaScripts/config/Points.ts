import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","points"],["",""],[1,[new mw.Vector(4278.22265625,5550.9501953125,375),new mw.Vector(4878.22021484375,5825.9501953125,375),new mw.Vector(5488.22021484375,5670.9501953125,375),new mw.Vector(5903.22021484375,4990.9501953125,375),new mw.Vector(5408.22021484375,4305.9501953125,375),new mw.Vector(4628.22021484375,4305.9501953125,375),new mw.Vector(4153.220703125,4830.9501953125,375),new mw.Vector(5853.22021484375,5420.9501953125,375),new mw.Vector(5383.22021484375,5100.9501953125,375),new mw.Vector(5923.2197265625,4375.9501953125,375),new mw.Vector(4618.220703125,5205.9501953125,375)],"道具刷新点位"]];
export interface IPointsElement extends IElementBase{
 	/**id*/
	id:number
	/**点位*/
	points:mw.Vector[]
 } 
export class PointsConfig extends ConfigBase<IPointsElement>{
	constructor(){
		super(EXCELDATA);
	}

}