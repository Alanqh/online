import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desac","appearanceId","graphicLevel","apprance","scale","runAni","idleAni","chaseAni","chaseSound","watchAni","attackAni","carAni","CarIdleAni","attackDelayUI","upAni","dizAni","dizAniPause","dizAniSpeed","deathAni","stopTime","offset","hotHit","meleeHit","danceAni","danceAniSpeed"],["","","","","","","","","","","","","","","","","","","","","","","","","",""],[10000,"普通男僵尸",10000,3,"415079614C87433DDC94CDBD8DD4BDB7",1,"97857","122509","122498",0,"120393","97856","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[10001,"普通男僵尸",10000,2,"5D75018D4FBD126ADBB2F08E1B563A2D",1,"97857","122509","122498",0,"120393","97856","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[10002,"普通男僵尸",10000,1,"415079614C87433DDC94CDBD8DD4BDB7",1,"97857","122509","122498",0,"120393","97856","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500001,"长腿妈妈",500001,3,"803D30DE4945D208BB72B2BCEE3DD204",1,"162005","159213","46290",0,"120393","119910","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","52998",1],[500002,"亲吻米西",500002,3,"40535F5C495252303EE86E8CA9B6F4DA",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","84920",0.8],[500003,"迷你好奇",500003,3,"FB9E3B38428FBF21E465A88A225D9497",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500004,"胆小鸡",500004,3,"A061793448819DB68F4907B2EB545C00",1,"159206","159213","230708",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500005,"PJ",500005,3,"F387E5D147CB2665ADDC12A6E8EC182C",1,"280760","159213","280671",0,"280823","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500006,"跳跳兔",500006,3,"D0ADF2DD47243986FA375997B6C98E04",1,"280665","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500007,"邦佐兔",500007,3,"7B48362542DFBEF9B15046A0982C4237",1,"285329","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","86094",0.8],[500008,"长腿妈妈",500001,2,"803D30DE4945D208BB72B2BCEE3DD204",1,"162005","159213","46290",0,"120393","119910","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","52998",1],[500009,"亲吻米西",500002,2,"40535F5C495252303EE86E8CA9B6F4DA",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","84920",0.8],[500010,"迷你好奇",500003,2,"FB9E3B38428FBF21E465A88A225D9497",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500011,"胆小鸡",500004,2,"A061793448819DB68F4907B2EB545C00",1,"159206","159213","230708",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500012,"PJ",500005,2,"F387E5D147CB2665ADDC12A6E8EC182C",1,"280760","159213","280671",0,"280823","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500013,"跳跳兔",500006,2,"D0ADF2DD47243986FA375997B6C98E04",1,"280665","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500014,"邦佐兔",500007,2,"7B48362542DFBEF9B15046A0982C4237",1,"285329","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","86094",0.8],[500015,"长腿妈妈",500001,1,"803D30DE4945D208BB72B2BCEE3DD204",1,"162005","159213","46290",0,"120393","119910","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","52998",1],[500016,"亲吻米西",500002,1,"40535F5C495252303EE86E8CA9B6F4DA",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","84920",0.8],[500017,"迷你好奇",500003,1,"FB9E3B38428FBF21E465A88A225D9497",1,"285329","159213","159212",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500018,"胆小鸡",500004,1,"A061793448819DB68F4907B2EB545C00",1,"159206","159213","230708",0,"120393","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500019,"PJ",500005,1,"F387E5D147CB2665ADDC12A6E8EC182C",1,"280760","159213","280671",0,"280823","84912","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500020,"跳跳兔",500006,1,"D0ADF2DD47243986FA375997B6C98E04",1,"280665","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952",null,0],[500021,"邦佐兔",500007,1,"7B48362542DFBEF9B15046A0982C4237",1,"285329","159213","123635",0,"120393","285090","14653","181191",0.6,"14629","97858",1.3,1,"52998",1.5,new mw.Vector(65,0,0),"145952","145952","86094",0.8]];
export interface ISubGhostGraphicElement extends IElementBase{
 	/**ID*/
	id:number
	/**备注*/
	desac:string
	/**外观id*/
	appearanceId:number
	/**对应的画质等级*/
	graphicLevel:number
	/**模型*/
	apprance:string
	/**缩放*/
	scale:number
	/**跑动动画*/
	runAni:string
	/**待机动画*/
	idleAni:string
	/**追逐动画*/
	chaseAni:string
	/**追逐音效*/
	chaseSound:number
	/**观望动画*/
	watchAni:string
	/**攻击动画*/
	attackAni:string
	/**推车动画*/
	carAni:string
	/**推车待机动画*/
	CarIdleAni:string
	/**碎屏UI显示时间*/
	attackDelayUI:number
	/**起身动画*/
	upAni:string
	/**眩晕动画*/
	dizAni:string
	/**眩晕动画的暂停时间*/
	dizAniPause:number
	/**眩晕动画播放速度*/
	dizAniSpeed:number
	/**玩家死亡动画*/
	deathAni:string
	/**玩家死亡动画停止时间*/
	stopTime:number
	/**攻击的时候的偏移*/
	offset:mw.Vector
	/**热武器受击*/
	hotHit:string
	/**冷兵器受击*/
	meleeHit:string
	/**undefined*/
	danceAni:string
	/**undefined*/
	danceAniSpeed:number
 } 
export class SubGhostGraphicConfig extends ConfigBase<ISubGhostGraphicElement>{
	constructor(){
		super(EXCELDATA);
	}

}