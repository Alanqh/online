import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","EffectID","EffectPoint","EffectLocation","EffectRotate","EffectLarge","EffectTime","ColorValue","Notice","Rate"],["","","","","","","","","",""],[1,"157253",23,new mw.Vector(0,0,100),new mw.Vector(0,0,180),new mw.Vector(1,1,1),0,null,"玩家死亡特效(女)",0],[2,"157254",23,new mw.Vector(0,0,100),new mw.Vector(0,0,180),new mw.Vector(1,1,1),0,null,"玩家死亡特效(男)",0],[3,"107629",23,new mw.Vector(0,0,-30),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,null,"npc死亡光柱",0],[4,"89589",23,new mw.Vector(-30,0,0),new mw.Vector(0,0,-90),new mw.Vector(0.8,0.8,0.8),1,null,"npc出现烟雾",20],[5,"145495",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),0,null,"糖果拖尾",0],[6,"145500",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),0,null,"骷髅拖尾",0],[7,"4330",5,new mw.Vector(-1.5,5,-2.5),new mw.Vector(0,0,0),new mw.Vector(0.03,0.03,1),0,"008F15FF","男火焰左",0],[8,"4330",5,new mw.Vector(-1.5,-5,-2.5),new mw.Vector(0,0,0),new mw.Vector(0.03,0.03,1),0,"008F15FF","男火焰右",0],[9,"4330",5,new mw.Vector(-1.5,5,-2.5),new mw.Vector(0,0,0),new mw.Vector(0.03,0.03,1),0,"CB00D7FF","女火焰左",0],[10,"4330",5,new mw.Vector(-1.5,-5,-2.5),new mw.Vector(0,0,0),new mw.Vector(0.03,0.03,1),0,"CB00D7FF","女火焰右",0],[11,"154749",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,"008F15FF","男烟雾",0],[12,"154749",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,"CB00D7FF","女烟雾",0],[13,"89093",-1,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,null,"死亡特效",0],[14,"13403",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.7,0.7,0.7),0,null,"道具特效",0],[15,"132893",0,new mw.Vector(0,0,50),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,null,"大眼怪出现特效",0],[16,"136953",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.7,0.7,0.7),0,null,"玩家（大眼怪周围）环绕特效",0],[17,"158084",0,new mw.Vector(20,20,0),new mw.Vector(0,0,0),new mw.Vector(40,40,40),0,"75FF75FF","飞眼怪被击中特效 1",0],[18,"89563",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),1,"75FF75FF","水落在地上特效",0],[19,"158084",0,new mw.Vector(0,10,-50),new mw.Vector(0,0,0),new mw.Vector(2.5,2.5,2.5),0,"75FF75FF","正常的怪被击中特效",0],[20,"86366",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(15,15,15),0,"75FF75FF","飞眼怪被击中特效 2",0],[21,"128900",23,new mw.Vector(-21,31,64),new mw.Vector(-180,0,25),new mw.Vector(0.7,0.7,0.7),0,"FFEC00FF","正常的怪被击中减速箭头特效",0],[22,"128900",23,new mw.Vector(-10,-17,90),new mw.Vector(-180,0,-35),new mw.Vector(0.7,0.7,0.7),0,"FFEC00FF","正常的怪被击中减速箭头特效",0],[23,"128900",23,new mw.Vector(14.41,-10,116),new mw.Vector(-180,0,55),new mw.Vector(0.7,0.7,0.7),0,"FFEC00FF","正常的怪被击中减速箭头特效",0],[24,"252127",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),1,null,"击中爆一下的特效",0],[25,"222993",23,new mw.Vector(-4,-2,92),new mw.Vector(0,0,0),new mw.Vector(2,2,2),0,null,"被命中持续跳舞特效",0],[26,"153606",23,new mw.Vector(0,0,111.82),new mw.Vector(0,0,0),new mw.Vector(0.8,0.8,0.8),1,null,"舞蹈枪命中瞬间特效",0]];
export interface IEffectElement extends IElementBase{
 	/**唯一id*/
	ID:number
	/**特效id*/
	EffectID:string
	/**特效挂点*/
	EffectPoint:number
	/**特效偏移*/
	EffectLocation:mw.Vector
	/**特效旋转*/
	EffectRotate:mw.Vector
	/**特效缩放*/
	EffectLarge:mw.Vector
	/**特效时间（循环方式(0为无限*/
	EffectTime:number
	/** 正数为循环次数，负数为循环时间(单位:秒)) default: 1）*/
	ColorValue:string
	/**颜色值*/
	Notice:string
	/**备注*/
	Rate:number
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}