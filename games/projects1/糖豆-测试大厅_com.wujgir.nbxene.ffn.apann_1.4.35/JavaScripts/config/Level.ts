import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","graphId","time"],["","","",""],[1,"第一波",[1],3],[2,"第二波",[2,3],8],[3,"第三波",[4],13],[4,"第四波",[6],18],[5,"第五波",[5],23],[6,"第六波",[11],28],[7,"第七波",[1],33],[8,"第八波",[6],38],[9,"第九波",[7],43],[10,"第十波",[10],48],[11,"第十一波",[11],53],[12,"第十二波",[1],58],[13,"第十三波",[9],63],[14,"第十四波",[8],68],[15,"第十五波",[6],73],[16,"第十六波",[8],78],[17,"第十七波",[7,10],83],[18,"第十八波",[12],88],[19,"第十九波",[12],93],[20,"第十九波",[12],98]];
export interface ILevelElement extends IElementBase{
 	/**id*/
	id:number
	/**name*/
	name:string
	/**图形id*/
	graphId:Array<number>
	/**开始时间*/
	time:number
 } 
export class LevelConfig extends ConfigBase<ILevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}