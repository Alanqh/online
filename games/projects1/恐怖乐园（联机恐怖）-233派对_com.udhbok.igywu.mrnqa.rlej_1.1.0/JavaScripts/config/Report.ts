import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","day_desc"],["","Language",""],[1,"Report_01","伪人：我不是伪人啊！我只是个普通玩家！救救我！"],[2,"Report_02","伪人：竟然敢偷看我的秘密，你晚上睡觉的时候当心点！"],[3,"Report_03","伪人：我没干过坏事！凭什么抓我啊啊啊啊啊啊啊啊——"],[4,"Report_04","伪人：可恶的安全员，下次我一定会报仇的！"],[5,"Report_05","伪人：冤枉啊——不要抓我！我一直都是人类！"],[6,"Report_06","伪人：哈哈哈哈！一切都是徒劳！伪人将占领乐园！"],[7,"Report_07","伪人：哼！你说说从哪里看出来我是伪人了~"],[8,"Report_08","伪人：我...会...回...来...的..."],[9,"Report_09","伪人：破笼子可抓不住我！告密者！我会跟着你的！"],[10,"Report_10","伪人：抓住了我又如何，你们永远不可能解决伪人！"],[11,"Report_11","我不是伪人...呜呜呜...别抓我...我害怕..."]];
export interface IReportElement extends IElementBase{
 	/**id*/
	id:number
	/**气泡内容多语言key*/
	content:string
	/**气泡内容备注*/
	day_desc:string
 } 
export class ReportConfig extends ConfigBase<IReportElement>{
	constructor(){
		super(EXCELDATA);
	}

}