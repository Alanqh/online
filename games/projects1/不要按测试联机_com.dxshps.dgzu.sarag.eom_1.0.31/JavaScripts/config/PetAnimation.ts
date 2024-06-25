import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Content","IdleGuid","IdleRate","RunGuid","RunRate","JumpGuid","JumpRate","HoverUpGuid","HoveUpRate","HoverDownGuid","HoveDownRate","FlyGuid","FlyRate","FlyHoverGuid","FlyHoverRate","FallGuid","FallRate","RollGuid","RollRate"],["","","","","","","","","","","","","","","","","","","",""],[10001,"猫","235649",1,"235648",1.1,"228104",1,"233450",1,"233450",1,"228104",0.9,"228105",1,"231716",1.9,"181293",1.5]];
export interface IPetAnimationElement extends IElementBase{
 	/**序号*/
	id:number
	/**备注*/
	Content:string
	/**待机动画*/
	IdleGuid:string
	/**待机动画速率*/
	IdleRate:number
	/**跑步动画*/
	RunGuid:string
	/**跑步动画速率*/
	RunRate:number
	/**跳跃动画*/
	JumpGuid:string
	/**跳跃动画速率*/
	JumpRate:number
	/**上升滞空动画*/
	HoverUpGuid:string
	/**滞空动画速率*/
	HoveUpRate:number
	/**下落滞空动画*/
	HoverDownGuid:string
	/**滞空动画速率*/
	HoveDownRate:number
	/**飞扑动画*/
	FlyGuid:string
	/**飞扑动画速率*/
	FlyRate:number
	/**飞扑滞空动画*/
	FlyHoverGuid:string
	/**飞扑滞空动画速率*/
	FlyHoverRate:number
	/**平地摔动画*/
	FallGuid:string
	/**平地摔动画速率*/
	FallRate:number
	/**冲刺动画*/
	RollGuid:string
	/**冲刺动画速率*/
	RollRate:number
 } 
export class PetAnimationConfig extends ConfigBase<IPetAnimationElement>{
	constructor(){
		super(EXCELDATA);
	}

}