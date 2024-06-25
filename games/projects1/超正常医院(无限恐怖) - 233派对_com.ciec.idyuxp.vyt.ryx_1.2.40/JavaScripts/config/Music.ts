import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","guid","Notice","volume","IFSync","IFCycle","IF3d","falloffDistance","shapeExtents"],["","","","","","","","",""],[1,"14031","背景音乐（每个世界不同）",1,null,null,null,0,0],[2,"134704","npc脚步声",0.3,null,null,null,666,333],[3,"186447","NPC受击",1.3,null,null,null,0,0]];
export interface IMusicElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**音效guid*/
	guid:string
	/**备注*/
	Notice:string
	/**音量比例*/
	volume:number
	/**是否同步*/
	IFSync:boolean
	/**是否循环播放*/
	IFCycle:boolean
	/**是否为3d音效*/
	IF3d:boolean
	/**衰减距离（默认值600）*/
	falloffDistance:number
	/**球体半径（默认值200）*/
	shapeExtents:number
 } 
export class MusicConfig extends ConfigBase<IMusicElement>{
	constructor(){
		super(EXCELDATA);
	}

}