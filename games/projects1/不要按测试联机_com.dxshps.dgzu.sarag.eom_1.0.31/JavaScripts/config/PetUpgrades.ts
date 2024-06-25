import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","name","upScores","cost","guid","detailContent","detail"],["","","Language","","","","","Language"],[10001,"冲刺加速度","PetUpgrades_name_10001",[100,200,300,400,500],[1,1,1,1,1],228284,"冲刺的加速度增加{0}","PetUpgrades_detail_10001"],[10002,"冲刺持续时间","PetUpgrades_name_10002",[0.1,0.2,0.3,0.4,0.5],[1,1,1,1,1],228284,"冲刺的持续时间增加{0}","PetUpgrades_detail_10002"],[10003,"移动最大速度","PetUpgrades_name_10003",[3,6,9,12,15],[1,1,1,1,1],228284,"移动的最大速度增加{0}","PetUpgrades_detail_10003"],[10004,"冲刺最大速度","PetUpgrades_name_10004",[8,16,24,32,40],[1,1,1,1,1],228284,"冲刺的最大速度增加{0}","PetUpgrades_detail_10004"],[10005,"移动加速度","PetUpgrades_name_10005",[3,6,9,12,15],[1,1,1,1,1],228284,"移动的加速度增加{0}","PetUpgrades_detail_10005"],[10006,"冲刺冷却时间","PetUpgrades_name_10006",[0.4,0.8,1.2,1.6,2],[1,1,1,1,1],228284,"冲刺的冷却时间降低{0}","PetUpgrades_detail_10006"]];
export interface IPetUpgradesElement extends IElementBase{
 	/**序号*/
	id:number
	/**强化名称策划看*/
	content:string
	/**强化名称*/
	name:string
	/**强化数值*/
	upScores:Array<number>
	/**强化耗费*/
	cost:Array<number>
	/**强化选项的图标*/
	guid:number
	/**强化详情文本描述策划看*/
	detailContent:string
	/**强化详情文本描述*/
	detail:string
 } 
export class PetUpgradesConfig extends ConfigBase<IPetUpgradesElement>{
	constructor(){
		super(EXCELDATA);
	}

}