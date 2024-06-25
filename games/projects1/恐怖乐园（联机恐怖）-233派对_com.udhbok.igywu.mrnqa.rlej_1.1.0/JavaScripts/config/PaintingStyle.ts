import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","text","text_desc","ghostGuid","isHide","animationGuid","animationSpeed","CameraId","TransformAnchorId","tauntTxt","tauntTxt_desc"],["","Language","","","","","","","","Language",""],[1,"UI_Start_03","普通","27DF04E74F6184FFA49A45B47266EF5B",0,"120393",0.5,"17DEDB14","10B54752","subtitles_3","喜欢这种画风？有点品味，不过能通关再说吧，呵呵。"],[2,"UI_Start_05","诡异","5D75018D4FBD126ADBB2F08E1B563A2D",1,"120393",0.5,"150733F6","1B71249C","subtitles_2","别被吓得尿裤子了~"],[3,"UI_Start_04","可爱","86DC3418436A54A579AE4793ED6AD5C7",0,"120393",0.5,"25AC47B1","230F1DA8","subtitles_1","别告诉我你这个菜鸟要把我精心准备的鬼换成这玩意？！"]];
export interface IPaintingStyleElement extends IElementBase{
 	/**ID*/
	id:number
	/**画风文本*/
	text:string
	/**画风文本备注*/
	text_desc:string
	/**鬼模型ID*/
	ghostGuid:string
	/**国内是否隐藏*/
	isHide:number
	/**播放待机动作*/
	animationGuid:string
	/**播放速度*/
	animationSpeed:number
	/**摄像机ID*/
	CameraId:string
	/**鬼锚点ID*/
	TransformAnchorId:string
	/**嘲讽文字*/
	tauntTxt:string
	/**嘲讽文字备注*/
	tauntTxt_desc:string
 } 
export class PaintingStyleConfig extends ConfigBase<IPaintingStyleElement>{
	constructor(){
		super(EXCELDATA);
	}

}