import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","title","title_desc","content","content_desc","endingSound","expMul","needTime"],["","Language","","Language","","","",""],[1000,"Ending_school_Title1","结局二 绝望的回响","Ending_Content1","历经重重困难，你终于从大门逃离了。但惨剧依然在不断上演，难道真的没有拯救所有人的办法吗？","135161",0.9,20],[2000,"Ending_school_Title2","结局一 噩梦的彼岸","Ending_Content2","终于从暗河逃出险境，但这似乎是另一个陷阱？校长真正的秘密依然隐藏在这片罪恶之地…","135161",1,20],[3000,"Ending_school_Title3","结局三 圣洁的救赎","Ending_Content3","你驱散了血月的邪恶之力，寄生在帕姆尼体内的恶灵被净化。向终结了校长阴谋的英雄致敬！","271083",1.1,20]];
export interface IPassEndingElement extends IElementBase{
 	/**ID*/
	id:number
	/**结局标题多语言的key*/
	title:string
	/**结局标题多语言的key备注*/
	title_desc:string
	/**结局内容多语言的key*/
	content:string
	/**结局内容多语言的key_备注*/
	content_desc:string
	/**结局音效*/
	endingSound:string
	/**经验倍率*/
	expMul:number
	/**预计通关时长（分钟）*/
	needTime:number
 } 
export class PassEndingConfig extends ConfigBase<IPassEndingElement>{
	constructor(){
		super(EXCELDATA);
	}

}