import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","picId","Color","strokeSize","strokeColor","isDefault"],["","","","","",""],[1001,null,"#FFFFFFFF",2,"#000000FF",true],[1002,"215951","#FFFFFFFF",2,"#000000FF",false,"霓虹甜心"],[1003,"328947","#FFFFFFFF",2,"#000000FF",false,"拂晓神剑"],[1004,"328946","#FFFFFFFF",2,"#000000FF",false,"暮光之城"],[1005,"328952","#FFFFFFFF",2,"#000000FF",false,"噩兆降临"],[1006,"328985","#FFFFFFFF",2,"#000000FF",false,"鹰击长空"],[1007,"328986","#FFFFFFFF",2,"#000000FF",false,"日月沉浮"],[1008,"328974","#FFFFFFFF",2,"#000000FF",false,"草莓布丁"],[1009,"328975","#FFFFFFFF",2,"#000000FF",false,"拨云见日"],[1010,"328978","#FFFFFFFF",2,"#000000FF",false,"踏浪而行"],[1011,"328953","#FFFFFFFF",2,"#000000FF",false,"黎明深秋"],[1012,"328981","#FFFFFFFF",2,"#000000FF",false,"荷塘月色"],[1013,"328945","#FFFFFFFF",2,"#000000FF",false,"天光云影"],[1014,"328949","#FFFFFFFF",2,"#000000FF",false,"奶油泡芙"],[1015,"328951","#FFFFFFFF",2,"#000000FF",false,"夏日出行"],[1016,"328948","#FFFFFFFF",2,"#000000FF",false,"彩虹白马"]];
export interface INameTitleElement extends IElementBase{
 	/**ID*/
	id:number
	/**图片GUID*/
	picId:string
	/**文本颜色*/
	Color:string
	/**描边大小*/
	strokeSize:number
	/**描边颜色*/
	strokeColor:string
	/**是否默认配置*/
	isDefault:boolean
 } 
export class NameTitleConfig extends ConfigBase<INameTitleElement>{
	constructor(){
		super(EXCELDATA);
	}

}