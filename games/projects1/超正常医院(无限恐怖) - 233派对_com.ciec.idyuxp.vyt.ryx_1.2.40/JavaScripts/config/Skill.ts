import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","User","Type","AttackRadios","IncludedAngle","AttackSpeed","CountDown","ItemID","Damage","SkillAnima"],["","","","","","","","","","",""],[3001,"偷袭",1,1,50,120,1.5,1,1001,50,"6002"]];
export interface ISkillElement extends IElementBase{
 	/**id*/
	ID:number
	/**技能名称*/
	Name:string
	/**技能使用者：
1.玩家
2.怪物*/
	User:number
	/**技能类型：
1.攻击*/
	Type:number
	/**攻击半径*/
	AttackRadios:number
	/**攻击夹角*/
	IncludedAngle:number
	/**攻速*/
	AttackSpeed:number
	/**冷却时间（内置冷却时间）*/
	CountDown:number
	/**使用物品*/
	ItemID:number
	/**伤害值*/
	Damage:number
	/**技能动画*/
	SkillAnima:string
 } 
export class SkillConfig extends ConfigBase<ISkillElement>{
	constructor(){
		super(EXCELDATA);
	}

}