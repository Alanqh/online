import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","number","numberList","string","stringList","vector","array1d","locations"],["","ReadByName","","","","","","","",""],[1,"Test","测试，不用管",0,null,null,null,null,null,null],[2,"Test2","测试，不用管",0,null,"203770",null,null,null,null],[3,"GameBGM","游戏的内的BGM",0,null,"221073",null,null,null,null],[4,"BadEndSound","死亡音效",0,null,"203411",null,null,null,null],[5,"HappyEndSound","胜利音效",0,null,"135161",null,null,null,null],[6,"StartPos","开始的坐标",0,null,null,null,new mw.Vector(2515,2715,660),null,null],[7,"StartRot","开始的旋转",0,null,null,null,new mw.Vector(0,0,270),null,null],[8,"RevivePos","复活点位",0,null,null,null,new mw.Vector(2515,2715,660),null,null],[9,"ReviveRot","复活点玩家旋转",0,null,null,null,new mw.Vector(0,0,270),null,null],[10,"WalkSound","行走的随机音效",0,[[1,2]],null,null,null,null,null],[11,"WalkInterval","行走的音效播放间隔",0.7,null,null,null,null,null,null],[12,"ItemMax","背包最大各自数目",23,null,null,null,null,null,null],[13,"MaxHeight","人物最大身高",0.8,null,null,null,null,null,null],[14,"distance","14~16是鬼追逐人的时候UI的变化动画，这里是鬼与人之间的距离",0,null,null,null,null,[200,400,500,600],null],[15,"timeLevel","变化时间节点",0,null,null,null,null,[300,500,600,800,1000],null],[16,"renderLevel","透明度。",0,null,null,null,null,[0.8,0.6,0.4,0.2,0.1],null],[17,"defaultNoteIdList","默认解锁的笔记id",0,null,null,null,null,[3001,3004],null],[18,"cameraInputScale","摄像机移动灵敏度比例",0.18,null,null,null,null,null,null],[19,"itemScrollBox","物品滑动条长度",900,null,null,null,null,null,null],[20,"itemScrollEnable","物品滑条是否可以滑动",1,null,null,null,null,null,null],[21,"initItems","初始物品列表",0,null,null,null,null,[44],null],[22,"MinHeight","人物最低身高",0.6,null,null,null,null,null,null],[23,"flashUI","闪屏UI画质区分",0,null,null,["m1","m2","m3"],null,null,null],[24,"killUI","击杀UI画质区分",0,null,null,["m1","m2","m3"],null,null,null],[25,"isGhostCloseDoor","鬼是否需要关门",1,null,null,null,null,null,null],[38,"LineLength","射线长度",300,null,null,null,null,null,null],[39,"Alternate","伪人生成：一维数组（数量上限、时间间隔）向量数组（坐标）",0,null,null,null,null,[6,5],[new mw.Vector(3135,-826,1000),new mw.Vector(670,-810,1000),new mw.Vector(-521,-764,1000),new mw.Vector(-1261,-800,780),new mw.Vector(-600,-4500,550),new mw.Vector(-5,-250,550),new mw.Vector(-537,1853,550),new mw.Vector(2784,2151,550),new mw.Vector(2510,2520,550),new mw.Vector(2786,1475,550),new mw.Vector(2050,1210,550)]]];
export interface IGlobalElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**描述*/
	detail:string
	/**数字*/
	number:number
	/**二维数组*/
	numberList:Array<Array<number>>
	/**字符串*/
	string:string
	/**字符串数组*/
	stringList:Array<string>
	/**坐标*/
	vector:mw.Vector
	/**一维数组*/
	array1d:Array<number>
	/**向量数组*/
	locations:mw.Vector[]
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**0*/
	get Test():IGlobalElement{return this.getElement(1)};
	/**0*/
	get Test2():IGlobalElement{return this.getElement(2)};
	/**0*/
	get GameBGM():IGlobalElement{return this.getElement(3)};
	/**0*/
	get BadEndSound():IGlobalElement{return this.getElement(4)};
	/**0*/
	get HappyEndSound():IGlobalElement{return this.getElement(5)};
	/**0*/
	get StartPos():IGlobalElement{return this.getElement(6)};
	/**0*/
	get StartRot():IGlobalElement{return this.getElement(7)};
	/**0*/
	get RevivePos():IGlobalElement{return this.getElement(8)};
	/**0*/
	get ReviveRot():IGlobalElement{return this.getElement(9)};
	/**0*/
	get WalkSound():IGlobalElement{return this.getElement(10)};
	/**0.7*/
	get WalkInterval():IGlobalElement{return this.getElement(11)};
	/**23*/
	get ItemMax():IGlobalElement{return this.getElement(12)};
	/**0.8*/
	get MaxHeight():IGlobalElement{return this.getElement(13)};
	/**0*/
	get distance():IGlobalElement{return this.getElement(14)};
	/**0*/
	get timeLevel():IGlobalElement{return this.getElement(15)};
	/**0*/
	get renderLevel():IGlobalElement{return this.getElement(16)};
	/**0*/
	get defaultNoteIdList():IGlobalElement{return this.getElement(17)};
	/**0.18*/
	get cameraInputScale():IGlobalElement{return this.getElement(18)};
	/**900*/
	get itemScrollBox():IGlobalElement{return this.getElement(19)};
	/**1*/
	get itemScrollEnable():IGlobalElement{return this.getElement(20)};
	/**0*/
	get initItems():IGlobalElement{return this.getElement(21)};
	/**0.6*/
	get MinHeight():IGlobalElement{return this.getElement(22)};
	/**0*/
	get flashUI():IGlobalElement{return this.getElement(23)};
	/**0*/
	get killUI():IGlobalElement{return this.getElement(24)};
	/**1*/
	get isGhostCloseDoor():IGlobalElement{return this.getElement(25)};
	/**300*/
	get LineLength():IGlobalElement{return this.getElement(38)};
	/**0*/
	get Alternate():IGlobalElement{return this.getElement(39)};

}