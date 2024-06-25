import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_Desc","desc","desc_Desc","passwordNumber","itemIds","isOpenFog","isOpenDarkAngle","lifeNum"],["","Language","","Language","","","","","",""],[1,"UI_diffi_01","简单难度","EXCEL_diffculty_1","鬼的速度很慢，道具很容易找到，尝试多种结局吧！\n蜡烛数量：12根\n",3,[[22,5],[30,1],[37,1],[28,1],[23,1],[43,1]],false,false,5],[2,"UI_diffi_02","普通难度","EXCEL_diffculty_2","鬼速稍微快了点，道具还是容易找到的，希望你能逃出这里\n蜡烛数量：13根",3,[[22,4],[30,1],[37,1],[28,1],[23,1],[43,1]],false,false,5],[3,"UI_diffi_03","困难难度","EXCEL_diffculty_3","已经到了困难模式呀，你很厉害，接下来看你表现了！\n蜡烛数量：15根",3,[[22,3],[30,1],[37,1],[28,1],[23,1],[43,1]],true,false,5],[4,"UI_diffi_04","噩梦难度","EXCEL_diffculty_4","红月给鬼提高了很多速度，你会感到吃力吗？\n蜡烛数量：17根",3,[[22,2],[30,1],[37,1],[28,1],[23,1],[43,1]],true,true,5],[5,"UI_diffi_05","地狱难度","EXCEL_diffculty_5","极速的鬼你见过吗，道具也没那么容易找到了，祝你好运吧！\n蜡烛数量：20根",3,[[30,1],[37,1],[28,1],[23,1],[43,1]],true,true,5]];
export interface IDifficultyElement extends IElementBase{
 	/**ID*/
	id:number
	/**难度名字*/
	name:string
	/**难度名字备注*/
	name_Desc:string
	/**难度说明*/
	desc:string
	/**难度说明备注*/
	desc_Desc:string
	/**密码锁数量*/
	passwordNumber:number
	/**道具表id(id*/
	itemIds:Array<Array<number>>
	/**数量)*/
	isOpenFog:boolean
	/**是否开启雾效*/
	isOpenDarkAngle:boolean
	/**是否开启暗角*/
	lifeNum:number
 } 
export class DifficultyConfig extends ConfigBase<IDifficultyElement>{
	constructor(){
		super(EXCELDATA);
	}

}