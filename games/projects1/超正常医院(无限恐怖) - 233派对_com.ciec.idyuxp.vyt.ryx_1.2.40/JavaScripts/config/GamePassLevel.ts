import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","ShowLevel","NormalRewardCfgID","SpecialRewardCfgID"],["","","",""],[1,1,[1],[4,7,8]],[2,2,[1],[4]],[3,3,[1],[4]],[4,4,[1],[4]],[5,5,[2],[5]],[6,6,[1],[4]],[7,7,[1],[4]],[8,8,[1],[4]],[9,9,[1],[4]],[10,10,[2],[5,9]],[11,11,[1],[4]],[12,12,[1],[4]],[13,13,[1],[4]],[14,14,[1],[4]],[15,15,[3],[6]],[16,16,[1],[4]],[17,17,[1],[4]],[18,18,[1],[4]],[19,19,[1],[4]],[20,20,[3],[6]]];
export interface IGamePassLevelElement extends IElementBase{
 	/**id*/
	id:number
	/**显示等级*/
	ShowLevel:number
	/**普通奖励表ID(不能重复*/
	NormalRewardCfgID:Array<number>
	/** 不能和后面的重复)*/
	SpecialRewardCfgID:Array<number>
 } 
export class GamePassLevelConfig extends ConfigBase<IGamePassLevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}