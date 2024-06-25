import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","lobbyId","maxPlayer","maxTime","maxNum","maxTimeSingle","aiJump"],["","","","","","",""],[1,"RCEpLPShE2S9KEQgMnK8",8,31,12,31,true]];
export interface IGameCfgElement extends IElementBase{
 	/**主键*/
	id:number
	/**大厅房间id*/
	lobbyId:string
	/**最大人数*/
	maxPlayer:number
	/**最大等待时间*/
	maxTime:number
	/**AI+真人最大数量*/
	maxNum:number
	/**最大等待时间
（单人）*/
	maxTimeSingle:number
	/**ai保持跳跃*/
	aiJump:boolean
 } 
export class GameCfgConfig extends ConfigBase<IGameCfgElement>{
	constructor(){
		super(EXCELDATA);
	}

}