import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","ghostId","diffcult","casualSpeed","chaseSpeed","shining","existChaseDist","existChaseTime","chaseCD","safePlace","sightRange","sightRangeInCD","goodMed","attackMode","atkRate","dropItemId"],["","","","","","","","","","","","","","","","",""],[10000,"普通僵尸",10000,[1,2,3,4,5],60,220,false,3000,20,20,["bed","cupboard"],[800,270],[300,30],null,0,1,1],[10001,"普通僵尸",10001,[1,2,3,4,5],70,280,false,3000,20,20,["bed","cupboard"],[1000,270],[300,30],null,0,2,2],[10002,"普通僵尸",10002,[1,2,3,4,5],80,350,false,3000,20,20,["bed","cupboard"],[1100,270],[300,30],null,0,3,3],[10003,"普通僵尸",10003,[1,2,3,4,5],80,350,false,3000,20,20,["bed","cupboard"],[1100,270],[300,30],null,0,3,3],[500001,"长腿妈妈",500001,[1,2,3,4,5],220,300,true,5000,10,20,null,[700,80],[10,10],null,0,1,0],[500002,"亲吻米西",500002,[1,2,3,4,5],180,280,false,3000,10,20,null,[700,80],[300,30],null,0,1,0],[500003,"迷你好奇",500003,[1,2,3,4,5],180,280,false,3000,10,20,null,[700,80],[300,30],null,0,1,0],[500004,"胆小鸡",500004,[1,2,3,4,5],180,280,false,3000,10,20,null,[700,80],[300,30],null,0,1,0],[500005,"PJ",500005,[1,2,3,4,5],180,280,false,3000,10,20,null,[700,80],[300,30],null,0,1,0],[500006,"跳跳兔",500006,[1,2,3,4,5],180,280,true,3000,10,20,null,[700,80],[300,30],null,0,1,0],[500007,"邦佐兔",500007,[1,2,3,4,5],180,280,false,3000,10,20,null,[700,80],[300,30],null,0,1,0]];
export interface ISubGhostElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	desc:string
	/**鬼的id（真实鬼的ID，用于鬼的示例配置）*/
	ghostId:number
	/**难度区分（填写后对应的难度会读取对应的配置）*/
	diffcult:Array<number>
	/**休闲态速度（S）*/
	casualSpeed:number
	/**追击速度（C为准）(S计算)*/
	chaseSpeed:number
	/**是否闪灵（C）*/
	shining:boolean
	/**离开追击距离（C）*/
	existChaseDist:number
	/**离开追击时间（C为准）(S计算)*/
	existChaseTime:number
	/**追击结束cd（C为准）(S计算)*/
	chaseCD:number
	/**有效的安全区（C）*/
	safePlace:Array<string>
	/**视线范围（C）*/
	sightRange:Array<number>
	/**CD期间视线范围（C）*/
	sightRangeInCD:Array<number>
	/**好药*/
	goodMed:Array<string>
	/**攻击模式（1为触碰击杀）*/
	attackMode:number
	/**攻击伤害倍率*/
	atkRate:number
	/**关联凋落物配置*/
	dropItemId:number
 } 
export class SubGhostConfig extends ConfigBase<ISubGhostElement>{
	constructor(){
		super(EXCELDATA);
	}

}