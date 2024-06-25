import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Content","Timer","AniGuid","AniRate","IsGod","IsFly","Impulse","ImpulseJump","StartEffectID","TotalEffectID","EndEffectID","SoundId","modelID","modelPos","modelRot","modelScale"],["","","","","","","","","","","","","","","","",""],[10001,"泡泡，人，道具",2,"46288",1,true,true,0,0,0,30002,0,0,null,null,null,null],[10002,"泡泡，人，机关",2,"46288",1,true,true,0,0,0,30002,0,0,null,null,null,null],[10003,"泡泡，宠，道具",2,"271252",0.5,true,true,0,0,0,30001,0,0,null,null,null,null],[10004,"泡泡，宠，机关",2,"271252",0.5,true,true,0,0,0,30001,0,0,null,null,null,null],[10005,"炸弹，宠，道具",1.5,"271252",0.5,false,false,500,300,0,0,0,0,null,null,null,null],[10006,"炸弹，宠，机关",1.5,"231571",0.5,false,false,500,300,0,0,0,0,null,null,null,null],[10007,"雪球，人",1.5,null,0,true,true,0,0,0,0,0,0,"133838",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1)],[10008,"雪球，宠",1.5,null,0,true,true,0,0,0,0,0,0,"133838",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1)]];
export interface IHitRecoverElement extends IElementBase{
 	/**id*/
	Id:number
	/**名称策划看*/
	Content:string
	/**持续时间*/
	Timer:number
	/**播放动画*/
	AniGuid:string
	/**动画播放速度*/
	AniRate:number
	/**持续时间内不受其他道具，机关影响
0:否
1:是*/
	IsGod:boolean
	/**持续时间切飞行
0:否
1:是*/
	IsFly:boolean
	/**冲量*/
	Impulse:number
	/**空中冲量*/
	ImpulseJump:number
	/**开始特效表id*/
	StartEffectID:number
	/**持续中特效表id*/
	TotalEffectID:number
	/**结束特效表id*/
	EndEffectID:number
	/**音效表id*/
	SoundId:number
	/**持续时间内生成模型*/
	modelID:string
	/**模型偏移*/
	modelPos:mw.Vector
	/**模型旋转*/
	modelRot:mw.Vector
	/**模型缩放*/
	modelScale:mw.Vector
 } 
export class HitRecoverConfig extends ConfigBase<IHitRecoverElement>{
	constructor(){
		super(EXCELDATA);
	}

}