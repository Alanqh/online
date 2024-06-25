import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Describe","AssetGuid","Icon","ChatType","ChatLoop","AnimationTime","SoundGuid","SoundLoop","SoundVolume","IsNew","UnlockType","IconReadAssetsGuid"],["","","","","","","","","","","","","",""],[1,"笑哭",null,"184427","50317",1,1,0,"265055",1,1,null,1,true],[2,"干杯",null,"184428","116895",1,1,0,"265055",1,1,null,1,true],[3,"不要",null,"184429","116898",1,1,0,"265055",1,1,null,1,true],[4,"吃瓜",null,"184431","132303",1,1,0,"265055",1,1,null,1,true],[5,"看戏",null,"184440","132328",1,1,0,"265055",1,1,null,1,true],[6,"加油",null,"184432","132351",1,1,0,"265055",1,1,null,1,true],[7,"OK",null,"184433","132352",1,1,0,"265055",1,1,null,1,true],[8,"爱心",null,"184435","132363",1,1,0,"265055",1,1,null,1,true],[9,"不行",null,"184439","50317",1,1,0,"265055",1,1,null,1,true],[10,"大哭",null,"184443","116895",1,1,0,"265055",1,1,null,1,true],[11,"惊讶",null,"184444","116898",1,1,0,"265055",1,1,null,1,true],[12,"方了",null,"184445","132303",1,1,0,"265055",1,1,null,1,true],[13,"听听",null,"185312","132328",1,1,0,"265055",1,1,null,1,true],[14,"喜欢",null,"185315","132351",1,1,0,"265055",1,1,null,1,true],[15,"捂嘴",null,"185318","132352",1,1,0,"265055",1,1,null,1,true],[16,"悠闲",null,"185319","132363",1,1,0,"265055",1,1,null,1,true],[17,"庆祝",null,"185322","50317",1,1,0,"265055",1,1,null,1,true],[18,"闪亮",null,"185323","116895",1,1,0,"265055",1,1,null,1,true],[19,"送花",null,"185326","116898",1,1,0,"265055",1,1,null,1,true],[20,"生气",null,"185327","132303",1,1,0,"265055",1,1,null,1,true],[21,"石化",null,"185328","132328",1,1,0,"265055",1,1,null,1,true],[22,"科目三",null,"232755","159386",2,1,-1,null,1,1,null,1,null],[23,"小熊跳舞",null,"200201","159386",2,1,-1,null,1,1,null,1,null],[24,"极乐净土",null,"195754","159386",2,1,-1,null,1,1,null,1,null],[25,"Queencard",null,"197629","159386",2,1,-1,null,1,1,null,1,null],[26,"Bodyshaming",null,"272027","159386",2,1,-1,null,1,1,null,1,null],[27,"叮当舞",null,"197236","159386",2,1,-1,null,1,1,null,1,null],[28,"抖肩舞",null,"29717","159386",2,1,-1,null,1,1,null,1,null],[29,"海草舞",null,"126579","159386",2,1,-1,null,1,1,null,1,null],[30,"骑马舞",null,"137301","159386",2,1,-1,null,1,1,null,1,null],[31,"恐龙抗狼",null,"210266","159386",2,1,-1,null,1,1,null,1,null],[32,"坐",null,"227463","255669",2,0,-1,null,1,1,null,1,null],[33,"哭",null,"14655","255669",2,1,-1,null,1,1,null,1,null],[34,"拒绝",null,"14524","255669",2,1,-1,null,1,1,null,1,null],[35,"挥手",null,"29775","255669",2,1,-1,null,1,1,null,1,null],[36,"挑衅",null,"15022","255669",2,1,-1,null,1,1,null,1,null],[37,"恭喜",null,"141497","255669",2,1,-1,null,1,1,null,1,null],[38,"敬礼",null,"221986","255669",2,1,-1,null,1,1,null,1,null],[39,"鼓掌",null,"29758","255669",2,1,-1,null,1,1,null,1,null],[40,"后空翻",null,"14602","255669",2,1,-1,null,1,1,null,1,null],[41,"单人比心",null,"198611","255669",2,1,-1,null,1,1,null,1,null],[42,"双人比心左",null,"123712","255669",2,1,-1,null,1,1,null,1,null],[43,"双人比心右",null,"123726","255669",2,1,-1,null,1,1,null,1,null],[44,"钵钵鸡",null,"122455","159386",2,4,-1,null,1,1,true,1,null],[45,"庆祝",null,"230575","240174",2,1,-1,null,1,1,true,1,null],[46,"摇尾巴",null,"235649","240174",2,1,-1,null,1,1,true,1,null],[47,"翻滚",null,"235650","240174",2,1,-1,null,1,1,true,1,null],[48,"科目三",null,"265652","240174",2,1,-1,null,1,1,true,1,null],[49,"趴下",null,"181286","240174",2,1,-1,null,1,1,true,1,null],[50,"洗澡",null,"181287","240174",2,1,-1,null,1,1,true,1,null],[51,"增地板",null,"181290","240174",2,1,-1,null,1,1,true,1,null],[52,"点头",null,"181292","240174",2,1,-1,null,1,1,true,1,null],[53,"挠痒痒",null,"181294","240174",2,1,-1,null,1,1,true,1,null],[54,"作揖",null,"181297","240174",2,1,-1,null,1,1,true,1,null],[55,"伸懒腰",null,"181298","240174",2,1,-1,null,1,1,true,1,null],[56,"坐",null,"181301","240174",2,1,-1,null,1,1,true,1,null],[57,"睡觉",null,"181303","240174",2,1,-1,null,1,1,true,1,null],[58,"张望",null,"181389","240174",2,1,-1,null,1,1,true,1,null],[59,"舔爪爪",null,"181392","240174",2,1,-1,null,1,1,true,1,null]];
export interface IChatElement extends IElementBase{
 	/**id*/
	ID:number
	/**交互名字*/
	Name:string
	/**物品描述*/
	Describe:string
	/**交互guid*/
	AssetGuid:string
	/***/
	Icon:string
	/**交互类型
1 = 表情
2 = 人物动作
3 = 宠物动作*/
	ChatType:number
	/**交互循环次数*/
	ChatLoop:number
	/**动作播放时间*/
	AnimationTime:number
	/**声音Guid*/
	SoundGuid:string
	/**声音循环次数*/
	SoundLoop:number
	/**声音音量*/
	SoundVolume:number
	/**是否新增*/
	IsNew:boolean
	/**解锁类型：
1：免费
2：购买*/
	UnlockType:number
	/**是否使用资源ICon*/
	IconReadAssetsGuid:boolean
 } 
export class ChatConfig extends ConfigBase<IChatElement>{
	constructor(){
		super(EXCELDATA);
	}

}