import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Des","int_Value","intArray_Value","string_Value","stringArray_Value","vector3_Value","vector2_Value","vector2Arr_Value","float_Value","vector3Arr_Value","floatArr_Value"],["","","","","","","","","","","",""],[10001,"宠物被托动画guid",0,null,"181286",null,null,null,null,0,null,null],[10002,"大厅gameId",0,null,"1402619",null,null,null,null,0,null,null],[10003,"游戏房gameId",0,null,"1402618",null,null,null,null,0,null,null],[20001,"冲刺期间字体颜色",0,null,"FFE47CFF",null,null,null,null,0,null,null],[20002,"冲刺冷却字体颜色",0,null,"6B6B6AFF",null,null,null,null,0,null,null],[30001,"普通，稀有度标签|长卡背景|方卡背景",0,null,null,["240137","240239","240171"],null,null,null,0,null,null],[30002,"稀有，稀有度标签|长卡背景|方卡背景",0,null,null,["240135","240236","240170"],null,null,null,0,null,null],[30003,"史诗，稀有度标签|长卡背景|方卡背景",0,null,null,["240136","240169","240149"],null,null,null,0,null,null],[30004,"传说，稀有度标签|长卡背景|方卡背景",0,null,null,["240179","240172","240131"],null,null,null,0,null,null],[30005,"神话，稀有度标签|长卡背景|方卡背景",0,null,null,["240150","240238","240132"],null,null,null,0,null,null],[30006,"保存栏位背景无存档guid",0,null,"240180",null,null,null,null,0,null,null],[30007,"保存栏位背景有存档guid",0,null,"240247",null,null,null,null,0,null,null],[30008,"保存栏位背景生效中guid",0,null,"240153",null,null,null,null,0,null,null],[30009,"存档栏位物品空置时背景图guid",0,null,"240171",null,null,null,null,0,null,null],[30010,"商店页签当前页签文本颜色",0,null,"000000FF",null,null,null,null,0,null,null],[30012,"商店页签非当前页签文本颜色",0,null,"FFFFFFFF",null,null,null,null,0,null,null],[30013,"未配奖池的背景图guid",0,null,"245362",null,null,null,null,0,null,null],[30014,"保存栏位空置icon",0,null,"240171",null,null,null,null,0,null,null],[30015,"角色卡宠物展示，无保存宠物的位置icon",0,null,"147652",null,null,null,null,0,null,null],[40001,"人物默认制动速率",0,null,null,null,null,null,null,2048,null,null],[50001,"轨迹线起始点偏移高度（抛物线）",0,null,null,null,null,null,null,50,null,null],[50002,"轨迹线起始点和玩家间距",0,null,null,null,null,null,null,80,null,null],[50003,"抛物线点1",0,null,null,null,null,null,null,0.25,null,null],[50004,"抛物线点2",0,null,null,null,null,null,null,0.75,null,null],[50005,"抛物线点模型/特效guid",0,null,"161342",null,null,null,null,0,null,null],[50006,"每100距离的点数量",5,null,null,null,null,null,null,0,null,null],[50007,"抛物线向前延伸申倍率",0,null,null,null,null,null,null,0.2,null,null],[50008,"抛物线向下延伸申倍率",0,null,null,null,null,null,null,0.8,null,null],[50009,"直线弹道特效",0,null,"155686",null,null,null,null,0,null,null],[50010,"直线弹道特效偏移加值",0,null,null,null,null,null,null,-60,null,null],[50011,"直线弹道特效缩放",0,null,null,null,new mw.Vector(1,1,1),null,null,0,null,null],[50012,"抛物线上扬偏移值",0,null,null,null,null,null,null,1,null,null],[60001,"场景中道具刷新点的特效",0,null,"287122",null,null,null,null,0,null,null],[60002,"场景中道具刷新点的特效偏移",0,null,null,null,new mw.Vector(0,0,0),null,null,0,null,null],[60004,"场景中道具刷新点的特效缩放",0,null,null,null,new mw.Vector(1.3,1.3,1.3),null,null,0,null,null],[60005,"新版特效prefab触发器",0,null,"DAAA1A414689A11D11530B99AF8C9972",null,null,null,null,0,null,null],[70001,"道具摇杆外圈默认颜色",0,null,"67E2FFFF",null,null,null,null,0,null,null],[70002,"道具摇杆外圈取消状态颜色",0,null,"FF6A76FF",null,null,null,null,0,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**描述*/
	Des:string
	/**数值*/
	int_Value:number
	/**数值*/
	intArray_Value:Array<number>
	/**数值*/
	string_Value:string
	/**数值*/
	stringArray_Value:Array<string>
	/**数值*/
	vector3_Value:mw.Vector
	/**数值*/
	vector2_Value:mw.Vector2
	/**数值*/
	vector2Arr_Value:mw.Vector2[]
	/**数值*/
	float_Value:number
	/**数值*/
	vector3Arr_Value:mw.Vector[]
	/**数值*/
	floatArr_Value:Array<number>
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}