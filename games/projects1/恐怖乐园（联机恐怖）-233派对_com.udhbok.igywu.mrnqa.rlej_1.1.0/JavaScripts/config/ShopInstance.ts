import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Desc","cameraGuid","itemPoint"],["","","",""],[1,"公共商店（注意ID为1，就是公共库的商店）","15B7F3FD","0E52D423"]];
export interface IShopInstanceElement extends IElementBase{
 	/**商店ID*/
	id:number
	/**备注*/
	Desc:string
	/**摄像机guid*/
	cameraGuid:string
	/**模型锚点guid*/
	itemPoint:string
 } 
export class ShopInstanceConfig extends ConfigBase<IShopInstanceElement>{
	constructor(){
		super(EXCELDATA);
	}

}