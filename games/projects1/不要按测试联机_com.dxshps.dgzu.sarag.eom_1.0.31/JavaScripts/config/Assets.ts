import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Guid","Type","Name","Volume","Comment"],["","","","","",""],[1,"61247","Animation","徒手攻击1、3",0,null],[2,"61245","Animation","徒手攻击2",0,null],[3,"61246","Animation","徒手攻击4",0,null],[4,"20226","Animation","徒手攻击5、刺剑攻击5",0,null],[5,"14714","Animation","防御",0,null],[6,"159199","Animation","冲刺退",0,null],[7,"95751","Animation","冲刺前",0,null],[8,"117326","Animation","拳师技能1",0,null],[9,"122548","Animation","拳师技能2",0,null],[10,"122547","Animation","拳师技能3",0,null],[11,"20267","Animation","拳师技能4",0,null],[12,"117381","Animation","拳师必杀1、镰刀必杀1",0,null],[13,"117402","Animation","拳师必杀2",0,null],[14,"85125","Animation","刺剑攻击1、3",0,null],[15,"85124","Animation","刺剑攻击2、刺剑技能1",0,null],[16,"85955","Animation","刺剑攻击4",0,null],[17,"117364","Animation","刺剑技能2",0,null],[18,"85120","Animation","刺剑技能3",0,null],[19,"111101","Animation","刺剑技能4",0,null],[20,"162136","Animation","刺剑必杀",0,null],[21,"20257","Animation","被破防，被弹反动作",0,null],[22,"91955","Posture","硬直姿态",0,null],[23,"117399","Animation","镰刀攻击4",0,null],[24,"85945","Animation","镰刀技能1",0,null],[25,"117378","Animation","镰刀技能2",0,null],[26,"115478","Animation","镰刀技能3",0,null],[27,"29723","Animation","镰刀技能4",0,null],[28,"111099","Animation","镰刀必杀2",0,null],[29,"117398","Animation","镰刀攻击1、3",0,null],[30,"121789","Animation","元素普攻3",0,null],[31,"121790","Animation","元素普攻2",0,null],[32,"20268","Animation","元素技能3",0,null],[33,"20275","Animation","元素技能1、元素技能2、元素技能4",0,null],[34,"121793","Animation","元素必杀",0,null],[35,"121791","Animation","元素必杀",0,null]];
export interface IAssetsElement extends IElementBase{
 	/**资源ID*/
	ID:number
	/**资源GUID*/
	Guid:string
	/**类别（Posture
Animation）*/
	Type:string
	/**名称及内容*/
	Name:string
	/**音量大小*/
	Volume:number
	/**备注
2023.2.22：除动画外都无需预加载*/
	Comment:string
 } 
export class AssetsConfig extends ConfigBase<IAssetsElement>{
	constructor(){
		super(EXCELDATA);
	}

}