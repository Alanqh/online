import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Desc","type","endPos","endRot","useTime","useSound","useEff","dataEx"],["","","","","","","","",""],[1,"血瓶",1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["15"]],[2,"小血瓶",1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["20"]],[3,"中血瓶",1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["40"]],[4,"大血瓶",1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["70"]],[5,"活力丹",1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["100"]],[6,"解毒剂",2,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["6"]]];
export interface ITransItemElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	Desc:string
	/**类型（1.回血 2.buff）*/
	type:number
	/**相对镜头终点位置可配置多段连击*/
	endPos:mw.Vector
	/**相对镜头终点旋转可配置多段连击*/
	endRot:mw.Vector
	/**使用时长*/
	useTime:number
	/**使用音效，关联音效表*/
	useSound:number
	/**使用特效*/
	useEff:string
	/**额外数据*/
	dataEx:Array<string>
 } 
export class TransItemConfig extends ConfigBase<ITransItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}