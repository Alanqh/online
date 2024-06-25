import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","skillName","icon","cd","deathCD","trapCD","params"],["","","","","","",""],[1,"弹力冲击","163391",18,3.5,1.75,[1700,54],"冲量|冲量初始向上角度"]];
export interface ISkillElement extends IElementBase{
 	/**id*/
	id:number
	/**技能名*/
	skillName:string
	/**技能icon*/
	icon:string
	/**技能cd*/
	cd:number
	/**死亡可减少的技能CD*/
	deathCD:number
	/**被冲量机关击中可减少的CD*/
	trapCD:number
	/**参数*/
	params:Array<number>
 } 
export class SkillConfig extends ConfigBase<ISkillElement>{
	constructor(){
		super(EXCELDATA);
	}

}