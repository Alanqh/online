import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","tabName","tabSelectName","tabLevel","childTabId","SourceId","des","cameraLocation","cameraRotate"],["","","","","","","","",""],[1001,"名牌","名牌",1,[1101],null,null,new mw.Vector(151,-14,135),new mw.Vector(-7,-20,35)],[1002,"挂件","挂件",1,[2001,2002,2003,2004,2005,2006],null,null,new mw.Vector(3,-30,88),new mw.Vector(-7,-15,35)],[1003,"特效","特效",1,[3001,3002],null,null,new mw.Vector(3,-30,88),new mw.Vector(-7,-15,35)],[1101,"名牌","名牌",2,null,[1001,1002,1003,1004,7004],null,new mw.Vector(151,-14,185),new mw.Vector(-7,-20,35)],[2001,"头饰","头饰",2,null,[2001,2002,2003,2004,2005],null,new mw.Vector(151,-14,165),new mw.Vector(-7,-20,35)],[2002,"背饰","背饰",2,null,[3011,3012,3013,3014,3015,3016,3017,3002,3003,3004,3006,3007,3008,3009,3010],null,new mw.Vector(500,65,97),new mw.Vector(0,-8,218)],[2003,"左手","左手",2,null,[4001,4002,4003,4004,4005,4006,4013,4015],null,new mw.Vector(210,90,70),new mw.Vector(-10,-20,-40)],[2004,"右手","右手",2,null,[4007,4008,4009,4010,4011,4012,4014,4016],null,new mw.Vector(240,-86,50),new mw.Vector(0,0,100)],[2005,"左腿","左腿",2,null,[5001,5002,5003,5004,5005,5011],null,new mw.Vector(62,-26,34),new mw.Vector(-8,-14,38)],[2006,"右腿","左腿",2,null,[5006,5007,5008,5009,5010,5012],null,new mw.Vector(62,-26,34),new mw.Vector(-8,-14,38)],[3001,"死亡","死亡",2,null,[6001,6002,6003],null,new mw.Vector(462,35,97),new mw.Vector(-3,-13,218)],[3002,"入场","入场",2,null,[7001,7002,7003],null,new mw.Vector(462,35,97),new mw.Vector(-3,-13,218)]];
export interface IDressTabElement extends IElementBase{
 	/**表id*/
	id:number
	/**标签名字*/
	tabName:string
	/**一级标签选中名字*/
	tabSelectName:string
	/**标签级别
1:一级标签
2: 二级标签*/
	tabLevel:number
	/**子标签id*/
	childTabId:Array<number>
	/**资源ID（读Dress表）*/
	SourceId:Array<number>
	/**备注用*/
	des:string
	/**相机位置*/
	cameraLocation:mw.Vector
	/**相机旋转*/
	cameraRotate:mw.Vector
 } 
export class DressTabConfig extends ConfigBase<IDressTabElement>{
	constructor(){
		super(EXCELDATA);
	}

}