import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","detail","key","children","icon","title","type","panelName","textDesc"],["","","","","","Language","","",""],[1,"每日活跃",null,null,337888,"UIMissionDailyPanel",1,"UIMissionDailyPanel","每日活跃"],[2,"任务",null,null,337890,"UIMissionNormalPanel",2,"UIMissionNormalPanel","任务"],[3,"成就",null,null,337876,"AchievementPanel",3,"AchievementPanel","成就"],[4,"公告",null,[40,41],337884,"UINews",4,"UINewsParent","公告"],[40,"伪人",null,null,337876,"伪人",4,"UIFakerNewsItem","伪人"],[41,"拍照活动",null,null,337884,"拍照活动",4,"UIPhotoNews","拍照活动"]];
export interface INoticeElement extends IElementBase{
 	/**ID*/
	id:number
	/**备注*/
	detail:string
	/**变量名，需要这列唯一*/
	key:string
	/**子集*/
	children:Array<number>
	/**图标*/
	icon:number
	/**标题*/
	title:string
	/**1.每日活跃
2.任务
3.成就
4.公告*/
	type:number
	/**UI面板类名(程序写)*/
	panelName:string
	/**文本备注*/
	textDesc:string
 } 
export class NoticeConfig extends ConfigBase<INoticeElement>{
	constructor(){
		super(EXCELDATA);
	}

}