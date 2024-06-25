import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","goosd","BG","Title","TitleLoaction","Picture","PictureLoaction","PictureBG","PictureBGLocation","Time","TimeLocation","Describe","DescribeLoaction","CanvasLoaction","ItemID","ItemName","ItemLocation","ItemSize","IsTransfer","transferType","transferChildType","isBuy"],["","","","","","","","","","","","","","","","","","","","","",""],[11011,"超值礼包","323033","323029",new mw.Vector2(25.00,-106.20),"323026",new mw.Vector2(-212.83,-30.00),"323030",new mw.Vector2(-180.83,-26.00),"<color=#FFA600>永久优惠</color>",new mw.Vector2(-36.14,426.48),"<color=#FFA600>连续3日超值登录奖励！</color>",new mw.Vector2(-36.14,474.77),new mw.Vector2(240.00,94.48),["1002","1001","2001"],["变身卡×3","复活币×10","动感波枪体验卡×3"],[new mw.Vector2(-40,-20),new mw.Vector2(130,-20),new mw.Vector2(300,-20)],[0.5,0.5],true,2,1011,["4001"]],[11012,"周末超值礼包","323034","323028",new mw.Vector2(25.00,-106.20),"323035",new mw.Vector2(497.19,-22.00),"196972",new mw.Vector2(481.19,-80.00),"<color=#FFA600> </color>",new mw.Vector2(-36.14,426.48),"<color=#FFA600>周末超值变身复活道具礼包！</color>",new mw.Vector2(-36.14,474.77),new mw.Vector2(8.00,93.96),["1002","1001"],["周末超值礼包","周末特惠礼包"],[new mw.Vector2(-10,-20),new mw.Vector2(250,-20)],[0.8,0.8],true,1,1010,["3004","3005"]],[11013,"武器礼包","323034","323031",new mw.Vector2(25.00,-106.20),"184564",new mw.Vector2(-212.83,-30.00),"184575",new mw.Vector2(-180.83,-26.00),"<color=#FFA600>限定武器</color>",new mw.Vector2(-36.14,426.48),"<color=#FFA600>超有趣限定武器</color>",new mw.Vector2(-36.14,474.77),new mw.Vector2(100.00,114.12),["2001"],["动感波枪"],[new mw.Vector2(200,-20)],[1,1],true,1,1001,["2001"]]];
export interface IScreenshowElement extends IElementBase{
 	/**唯一id*/
	ID:number
	/**商品界面（策划看）*/
	goosd:string
	/**界面背景图片*/
	BG:string
	/**标题*/
	Title:string
	/**标题位置*/
	TitleLoaction:mw.Vector2
	/**立绘*/
	Picture:string
	/**立绘位置*/
	PictureLoaction:mw.Vector2
	/**立绘背景*/
	PictureBG:string
	/**立绘背景位置*/
	PictureBGLocation:mw.Vector2
	/**活动时间*/
	Time:string
	/**活动时间位置*/
	TimeLocation:mw.Vector2
	/**活动说明*/
	Describe:string
	/**活动说明位置*/
	DescribeLoaction:mw.Vector2
	/**商品容器位置*/
	CanvasLoaction:mw.Vector2
	/**商品item*/
	ItemID:Array<string>
	/**商品item名称*/
	ItemName:Array<string>
	/**商品item位置*/
	ItemLocation:mw.Vector2[]
	/**商品item渲染尺寸*/
	ItemSize:Array<number>
	/**是否跳转*/
	IsTransfer:boolean
	/**跳转界面类型 1商城 2热销*/
	transferType:number
	/**不正常币商城 1002*/
	transferChildType:number
	/**
乐币商城 1001*/
	isBuy:Array<string>
 } 
export class ScreenshowConfig extends ConfigBase<IScreenshowElement>{
	constructor(){
		super(EXCELDATA);
	}

}