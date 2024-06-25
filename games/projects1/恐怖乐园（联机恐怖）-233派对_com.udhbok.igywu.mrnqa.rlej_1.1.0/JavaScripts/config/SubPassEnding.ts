import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","title","title_Desc","gameTheme","passEndingId"],["","Language","","",""],[1,"Ending_school_Title1","结局二 绝望的回响","School",1000],[2,"Ending_school_Title2","结局一 噩梦的彼岸","School",2000],[3,"Ending_school_Title3","结局三 圣洁的救赎","School",3000],[4,"Ending_Graveyard_Title1","结局 热气球驾驶员","Graveyard",1000],[5,"Ending_hospital_Title1","A结局 无尽的威胁","Hospital",5001],[6,"Ending_hospital_Title2","X结局 光辉颂歌","Hospital",5002],[7,"Ending_hospital_Title3","S结局 指引的力量","Hospital",5003],[8,"Ending_hospital_Title4","T结局 投身黑暗","Hospital",5004],[9,"Ending_Town_Title1","结局二 逃出深渊","Town",1000],[10,"Ending_Town_Title2","结局一 光芒熄灭","Town",2000],[11,"Ending_Town_Title3","结局三 解除诅咒","Town",3000],[12,"Ending_Town_Title4","结局四 深藏的秘密","Town",4000],[13,"Ending_Graveyard_Title2","结局 代表月亮拯救你","Graveyard",2000]];
export interface ISubPassEndingElement extends IElementBase{
 	/**ID*/
	id:number
	/**结局标题多语言的key*/
	title:string
	/**结局标题多语言的key得备注*/
	title_Desc:string
	/**游戏主题*/
	gameTheme:string
	/**各结局的通关Id*/
	passEndingId:number
 } 
export class SubPassEndingConfig extends ConfigBase<ISubPassEndingElement>{
	constructor(){
		super(EXCELDATA);
	}

}