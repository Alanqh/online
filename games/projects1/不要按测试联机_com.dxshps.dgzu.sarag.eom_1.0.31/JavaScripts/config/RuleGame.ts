import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Des","int_Value","intArray_Value","float_Value","floatArr_Value","string_Value","stringArray_Value","vector3_Value","vector3Arr_Value","vector2_Value","vector2Arr_Value"],["","","","","","","","","","","",""],[10001,"角色在匹配场景生成的坐标",0,null,0,null,null,null,null,null,null,null],[10002,"角色在匹配场景生成时的面向",0,null,0,null,null,null,null,null,null,null],[10003,"角色在匹配场景生成时的相机朝向",0,null,0,null,null,null,null,null,null,null],[10004,"游戏房匹配阶段所需时间",45,null,0,null,null,null,null,null,null,null],[10005,"结束等待人数",8,null,0,null,null,null,null,null,null,null],[10006,"轮播图阶段持续时间",6,null,0,null,null,null,null,null,null,null],[10007,"关卡开始的倒数提示UI持续时间",3,null,0,null,null,null,null,null,null,null],[10008,"玩家到达终点时，弹出UI的持续时间",2,null,0,null,null,null,null,null,null,null],[10009,"玩家未在规定时间到达终点时，弹出UI的持续时间",1,null,0,null,null,null,null,null,null,null],[10010,"关卡结束时弹出UI的持续时间",2,null,0,null,null,null,null,null,null,null],[10011,"淘汰结算场景的持续时间",8,null,0,null,null,null,null,null,null,null],[10012,"淘汰结算场景，玩家被淘汰时弹出UI的持续时间",2,null,0,null,null,null,null,null,null,null],[10013,"淘汰结算场景，玩家晋级动画，速度",0,null,1,null,"230575",null,null,null,null,null],[10014,"淘汰结算场景，玩家晋级，特效表id",20002,null,0,null,null,null,null,null,null,null],[10015,"暂存",0,null,0,null,null,null,null,null,null,null],[10016,"核心循环场数",30,null,0,null,null,null,null,null,null,null],[10017,"玩家头顶的名字高度",0,null,60,null,null,null,null,null,null,null],[10018,"玩家死亡复活时间和特效id",20003,null,1,null,null,null,null,null,null,null],[10019,"等待结束显示匹配成功持续时间",0,null,2,null,null,null,null,null,null,null],[10020,"轮播图滚动动画持续时间",5,null,0,null,null,null,null,null,null,null],[10021,"轮播图中，位于屏幕中心的关卡图片扩大系数",0,null,0.3,null,null,null,null,null,null,null],[10022,"淘汰结算时，被淘汰,特效表id",20001,null,0,null,null,null,null,null,null,null],[10023,"淘汰结算时，被淘汰，播放动画，速度",0,null,0.8,null,"224943",null,null,null,null,null],[10024,"结算台相机guid",0,null,0,null,"2E36904C",null,null,null,null,null],[10025,"第一轮结算台相机位移",0,null,0,null,null,null,new mw.Vector(-95400,0,-9300),null,null,null],[10026,"第一轮结算台相机旋转",0,null,0,null,null,null,new mw.Vector(0,-4,0),null,null,null],[10027,"夺冠结算台相机位移",0,null,0,null,null,null,new mw.Vector(-92735,11870,-9560),null,null,null],[10028,"夺冠结算台相机旋转",0,null,0,null,null,null,new mw.Vector(0,3,0),null,null,null],[10029,"冠军NPC在场景中的guid",0,null,0,null,"192D6498",null,null,null,null,null],[10030,"冠军玩家坐标",0,null,0,null,null,null,new mw.Vector(-92335,11930,-9660),null,null,null],[10031,"冠军玩家朝向",0,null,0,null,null,null,new mw.Vector(0,0,-175),null,null,null],[10032,"夺冠结算时未获胜玩家位置",0,null,0,null,null,null,new mw.Vector(23,-42209,338),null,null,null],[10033,"冠军播放动画，动画间隔 - 宠物",0,null,3,null,null,["232067","230575","232068"],null,null,null,null],[10034,"冠军播放动画，动画间隔 - 人形",0,null,3,null,null,["14560","123713"],null,null,null,null],[10035,"冠军展示界面的自动退出时间",0,null,10,null,null,null,null,null,null,null],[10036,"AI基础属性配置",0,[400,300],0,null,null,null,null,null,null,null],[10037,"AI限时等待的时间",0,null,0,[1,5],null,null,null,null,null,null],[10038,"匹配倒计时UI的移动时间",0,null,2,null,null,null,null,null,null,null],[10039,"匹配倒计时UI下移距离",0,null,200,null,null,null,null,null,null,null],[10040,"淘汰阶段光照",1001,null,0,null,null,null,null,null,null,null],[10041,"夺冠阶段光照",1001,null,0,null,null,null,null,null,null,null],[10042,"过渡界面持续时间",0,null,3.5,null,null,null,null,null,null,null],[10043,"过渡UI遮罩扩大时间",0,null,1,null,null,null,null,null,null,null],[10044,"过渡UI遮罩保持时间",0,null,1.5,null,null,null,null,null,null,null],[10045,"过渡UI遮罩缩小时间",0,null,1,null,null,null,null,null,null,null],[10046,"淘汰动画、特效的延迟播放时间",0,null,3,null,null,null,null,null,null,null],[20001,"玩家进入关卡时冲刺冷却时间",0,null,10,null,null,null,null,null,null,null]];
export interface IRuleGameElement extends IElementBase{
 	/**序号
10000：流程相关
20000：基础属性
30000：其他功能
40000：IAA相关
50000：关卡相关
60000：物品相关*/
	ID:number
	/**描述*/
	Des:string
	/**数值*/
	int_Value:number
	/**数值*/
	intArray_Value:Array<number>
	/**数值*/
	float_Value:number
	/**带小数点*/
	floatArr_Value:Array<number>
	/**数值*/
	string_Value:string
	/**小数点数组*/
	stringArray_Value:Array<string>
	/**数值*/
	vector3_Value:mw.Vector
	/**数值*/
	vector3Arr_Value:mw.Vector[]
	/**数值*/
	vector2_Value:mw.Vector2
	/**数值*/
	vector2Arr_Value:mw.Vector2[]
 } 
export class RuleGameConfig extends ConfigBase<IRuleGameElement>{
	constructor(){
		super(EXCELDATA);
	}

}