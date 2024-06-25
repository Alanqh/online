import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","name","guid","detail","detailContent","banner","pos","rot","birthPoint","birthGap","finishDirection","rowNumber","levelTime","weight","playerNum","winNum","BgmId","MoveNum","light","aiPath"],["","","Language","","Language","","","","","","","","","","","","","","","",""],[10001,"秋秋小溪","Level_name_10001","23FB64C14F6DEBB42F13F0A40D8F5634",null,"Level_1","243877",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(771,-394,2000),100,new mw.Vector(1,0,0),6,150,1,12,6,30012,24,1001,0],[10002,"圣诞转转","Level_name_10002","2F0DE2534BB66CE7F41ED892F124748E","\n","Level_2","243875",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(616,-439,1000),100,new mw.Vector(1,0,0),6,150,1,12,6,30013,12,1001,0],[10003,"海滩寻路","Level_name_10003","48EA61074773C249F18F28B9D69A50CD","\n","Level_3","243873",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(679,-439,1400),100,new mw.Vector(1,0,0),6,150,1,12,6,30014,23,1001,0],[10004,"飞跃赛场","Level_name_10004","0AFA716B43CDCB0B2EF0B4ADE48A3150",null,"Level_4","243876",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(679,-439,1300),100,new mw.Vector(1,0,0),6,150,1,12,6,30015,37,1001,0],[10005,"夏日蹦床","Level_name_10005","9CAB66BE42C304C71AD6B8A1CCF82463",null,"Level_5","243874",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(679,-439,1500),100,new mw.Vector(1,0,0),6,150,1,12,6,30016,5,1001,1],[10006,"击鼓迎春","Level_name_10006","442F1BAB48D15D924B375CB5523832D9",null,"Level_6","290232",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(500,-500,1300),100,new mw.Vector(1,0,0),6,150,1,12,6,30017,0,1002,1],[10007,"城堡奇遇","Level_name_10007","CB9B2C75456470ABDE1953B6ABB42F2A",null,"Level_7","290228",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(500,-500,1300),100,new mw.Vector(1,0,0),6,150,0,12,6,30018,0,1003,1],[10008,"转转马戏团","Level_name_10008","83125E1A45F843A820080189C9B48E03","\n","Level_8","292527",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(400,-500,3500),100,new mw.Vector(1,0,0),6,150,1,12,6,30019,0,1001,0]];
export interface ILevelElement extends IElementBase{
 	/**序号*/
	id:number
	/**名称策划看*/
	content:string
	/**关卡名称*/
	name:string
	/**关卡prefab的guid*/
	guid:string
	/**关卡文本描述*/
	detail:string
	/**关卡文本描述策划看*/
	detailContent:string
	/**预览图的资源库guid*/
	banner:string
	/**生成位置*/
	pos:mw.Vector
	/**生成旋转*/
	rot:mw.Vector
	/**出生点原点*/
	birthPoint:mw.Vector
	/**出生点阵列间隔*/
	birthGap:number
	/**终点朝向*/
	finishDirection:mw.Vector
	/**每排人数*/
	rowNumber:number
	/**关卡最大时长*/
	levelTime:number
	/**生成权重*/
	weight:number
	/**需要人数*/
	playerNum:number
	/**通过人数*/
	winNum:number
	/**关卡BgmId*/
	BgmId:number
	/**关卡move脚本数量*/
	MoveNum:number
	/**光照参数（光照表id）*/
	light:number
	/**AI路线类型
0：随机路线
1：固定路线*/
	aiPath:number
 } 
export class LevelConfig extends ConfigBase<ILevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}