import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name_desc","type","shopId"],["","","",""],[1,"恐惧币",1,0],[2,"乐币",2,0],[3,"粘合剂",3,210002],[4,null,3,210001],[5,null,3,4]];
export interface IItemMaterialElement extends IElementBase{
 	/**id*/
	id:number
	/**名称备注*/
	name_desc:string
	/***/
	type:number
	/**关联商店配置*/
	shopId:number
 } 
export class ItemMaterialConfig extends ConfigBase<IItemMaterialElement>{
	constructor(){
		super(EXCELDATA);
	}

}