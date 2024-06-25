import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","des","chValue","enValue","chTest1","enTest2","meta1","meta2"],["","","","","","","",""],[1,"大厅id","923728","0kxgKevv8ji0o8Bie1mB","866585","RCEpLPShE2S9KEQgMnK8",null,null]];
export interface IVerCfgElement extends IElementBase{
 	/**id*/
	id:number
	/**数据描述*/
	des:string
	/**国内配置*/
	chValue:string
	/**海外配置*/
	enValue:string
	/**国内测试*/
	chTest1:string
	/**海外测试*/
	enTest2:string
	/**undefined*/
	meta1:string
	/**undefined*/
	meta2:string
 } 
export class VerCfgConfig extends ConfigBase<IVerCfgElement>{
	constructor(){
		super(EXCELDATA);
	}

}