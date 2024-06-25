import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_desc","imageGuid","TalkID","Character","rewardId"],["","Language","","","","",""],[1,"我","我","340818",10,null,0],[2,"监守","监守","340840",1,"BC2F4CFE4FE60E97D1970C988F403920",0],[3,"任务大师","任务大师","306768",1002,null,0],[4,"医生","医生","340841",100,null,0],[5,"老默","老默","340835",200,null,0],[6,"阿莱尔","阿莱尔","340834",300,null,0],[7,"伪人导师","伪人","340819",400,null,10025]];
export interface INPCElement extends IElementBase{
 	/**id*/
	id:number
	/**NPC名称*/
	name:string
	/**NPC名称备注*/
	name_desc:string
	/**立绘guid*/
	imageGuid:string
	/**默认对话*/
	TalkID:number
	/**NPC装扮（可以不填）*/
	Character:string
	/**对话完奖励道具ID*/
	rewardId:number
 } 
export class NPCConfig extends ConfigBase<INPCElement>{
	constructor(){
		super(EXCELDATA);
	}

}