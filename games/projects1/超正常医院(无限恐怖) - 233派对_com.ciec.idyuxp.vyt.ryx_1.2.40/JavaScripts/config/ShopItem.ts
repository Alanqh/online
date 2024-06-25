import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","name","noUse","propIds","dressIds","DanceIds","ItemBG","time","price","nowPrice","discount","coinType","awards","awardCount","limitCount","refreshType","commodityId","isRedNotice","advertiseNum","weekSolds"],["","Language","","","","","","","","","","","","","","","","","",""],[1001,"Tips_96","复活币",[1018],null,null,"316098",null,50,88,0,0,0,[1],0,0,null,0,0,null,"复活币","94KbeAt0000BQ"],[1002,"Tips_97","变身卡",[1019],null,null,"316098",null,100,0,0,0,0,[1],0,0,null,0,0,null,"变身卡","3bx7Esv0000BR"],[1003,"Tips_239","抽奖券",[1025],null,null,null,null,100,0,0,0,0,[1],0,0,null,0,0,null,"抽奖券"],[2001,"Tips_98","动感波枪",[1020],null,null,"316098",null,2888,0,0,0,0,[1],1,1,null,0,0,null,"动感波枪","FyDVhM70000BS"],[2002,"Tips_116","动感波枪3天",[1020],null,null,null,[3],188,0,0,0,0,[1],0,0,null,0,0,null,"动感波枪3天","5bITjsY0000C8"],[2003,"Tips_117","动感波枪7天",[1020],null,null,null,[7],388,0,0,0,0,[1],0,0,null,0,0,null,"动感波枪7天","6xLVtMR0000C9"],[2004,"Tips_196","团扇",[1024],null,null,null,null,2888,0,0,0,0,[1],1,0,null,0,0,null,"团扇"],[2005,"Tips_196","团扇3天",[1024],null,null,null,[3],188,0,0,0,0,[1],1,0,null,0,0,null,"团扇"],[2006,"Tips_196","团扇7天",[1024],null,null,null,[7],388,0,0,0,0,[1],1,0,null,0,0,null,"团扇"],[3001,"Tips_99","每周礼包（额外处理）",[1018],null,null,null,null,0,0,0,0,0,[1],1,2,null,1,0,null,"每周礼包（额外处理）"],[3002,"Tips_100","复活币大礼包",[1018],null,null,null,null,188,0,2,0,0,[20],0,0,null,0,0,null,"复活币大礼包","F7p4adp0000BT"],[3003,"Tips_101","变身卡大礼包",[1019],null,null,null,null,520,0,5,0,0,[10],0,0,null,0,0,null,"变身卡大礼包","Ccp73rC0000BU"],[3004,"Tips_194","周特惠礼包1",[1019,1018],null,null,null,null,440,0,7,0,0,[5,5],1,3,null,0,0,null,"周特惠礼包1"],[3005,"Tips_195","周特惠礼包2",[1019,1018],null,null,null,null,1688,0,8,0,0,[10,20],2,3,null,0,0,null,"周特惠礼包2"],[3006,"Tips_193","周末礼包（iaa）",[1019,1018],null,null,null,null,0,0,0,0,0,[1,3],1,2,null,1,3,[5,6,0],"周末礼包（iaa）"],[3007,"Tips_229","表情包",null,null,[4,5,6,7,8,9],null,null,300,0,0,0,0,null,1,1,null,0,0,null],[3008,"Tips_230","抽奖券(iaa免费)",[1025],null,null,null,null,0,0,0,0,0,[1],0,0,null,0,3,null,"抽奖券"],[3009,"Tips_251","抽奖券大礼包",[1025],null,null,null,null,99,0,2,0,0,[5],1,0,null,0,0,null,"抽奖券大礼包"],[3010,"Tips_251","抽奖券大礼包",[1025],null,null,null,null,499,0,5,0,0,[10],2,0,null,0,0,null,"抽奖券大礼包"],[4001,"超值礼包一天",null,[1020,1018,1019],null,null,null,[3,0,0],100,0,0,0,0,[1,5,1],0,1,null,0,0,null,null,"2tCPPwd0000BV"],[4002,"超值礼包二天",null,[1020,1018,1019],null,null,null,[3,0,0],100,0,0,0,0,[1,2,1],0,1,null,0,0,null,null,"2tCPPwd0000BV"],[4003,"超值礼包三天",null,[1020,1018,1019],null,null,null,[3,0,0],100,0,0,0,0,[1,3,1],0,1,null,0,0,null,null,"2tCPPwd0000BV"],[5001,"超值vip",null,[1022,1018,1019],null,null,null,null,520,0,0,0,0,[1,3,1],0,0,null,0,0,null,null,"ErRw7Q80000BW"],[6001,"充值跳转用",null,null,null,null,null,null,0,0,0,1,0,null,0,0,null,0,0,null,null,"4gXL1zT0000C2"],[7001,"Tips_190",null,[1023],null,null,null,null,100,0,0,1,100,null,0,0,"7vNgonI0000IJ",0,0,null],[7002,"Tips_191",null,[1023],null,null,null,null,600,0,0,1,600,null,0,0,"2XMu0EL0000IK",0,0,null],[7003,"Tips_192",null,[1023],null,null,null,null,3000,0,0,1,3000,null,0,0,"HI5CbOd0000IL",0,0,null],[8101,"Tips_212","奢华花环",null,[2002],null,null,null,100,0,0,0,0,[1],1,0,null,0,0,null],[8102,"Tips_213","独角兽",null,[2003],null,null,null,100,0,0,0,0,[1],1,0,null,0,0,null],[8103,"Tips_214","圣诞鹿角",null,[2004],null,null,null,100,0,0,0,0,[1],1,0,null,0,0,null],[8201,"Tips_215","堕天使",null,[3010],null,null,null,2888,0,0,0,0,[1],1,0,null,0,0,null],[8202,"Tips_216","火狐尾巴",null,[3004],null,null,null,200,0,0,0,0,[1],1,0,null,0,0,null],[8203,"Tips_217","翅膀",null,[3006],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null,null,null,null,0],[8204,"Tips_218","粉狐尾巴",null,[3003],null,null,null,200,0,0,0,0,[1],1,0,null,0,0,null,null,null,0],[8205,"Tips_219","卡通玩偶2",null,[3008],null,null,null,100,0,0,0,0,[1],1,0,null,0,0,null],[8206,"Tips_220","卡通玩偶3",null,[3009],null,null,null,100,0,0,0,0,[1],1,0,null,0,0,null],[8207,"Tips_231","索菲亚",null,[3014],null,null,null,3288,0,0,0,0,[1],1,0,null,0,0,null],[8208,"Tips_233","莉莉丝",null,[3016],null,null,null,3288,0,0,0,0,[1],1,0,null,0,0,null],[8303,"Tips_221","彩虹拖尾",null,[4004,4010],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8304,"Tips_222","樱花拖尾",null,[4005,4011],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8305,"Tips_223","乐符拖尾",null,[4006,4012],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8401,"Tips_224","藤曼生长",null,[5003,5008],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8402,"Tips_225","像素电玩",null,[5005,5010],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8501,"Tips_235","绚丽烟花",null,[6002],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8502,"Tips_236","坚强笑脸",null,[6003],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8601,"Tips_237","魔法藤蔓",null,[7002],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[8602,"Tips_238","梦境时分",null,[7003],null,null,null,500,0,0,0,0,[1],1,0,null,0,0,null],[9001,"Tips_96","复活币",[1018],null,null,null,null,1250,0,0,2,0,[1],10,0,null,0,0,null,"复活币","94KbeAt0000BQ"],[9002,"Tips_97","变身卡",[1019],null,null,null,null,2500,0,0,2,0,[1],5,0,null,0,0,null,"变身卡","3bx7Esv0000BR"],[9003,"Tips_116","动感波枪3天",[1020],null,null,null,[3],7500,0,0,2,0,[1],2,0,null,0,0,null,"动感波枪3天","5bITjsY0000C8"],[9004,"Tips_239","抽奖券",[1025],null,null,null,null,2500,0,0,2,0,[1],10,0,null,0,0,null,"抽奖券"],[9005,"Tips_240","星云头环",null,[2005],null,null,null,12500,0,0,2,0,[1],1,0,null,0,0,null],[9006,"Tips_241","天使之翼",null,[3011],null,null,null,75000,0,0,2,0,[1],1,0,null,0,0,null],[9007,"Tips_242","旋转流光",null,[3013],null,null,null,6250,0,0,2,0,[1],1,0,null,0,0,null],[9008,"Tips_243","气泡拖尾·左",null,[4013],null,null,null,6250,0,0,2,0,[1],1,0,null,0,0,null],[9009,"Tips_244","气泡拖尾·右",null,[4014],null,null,null,6250,0,0,2,0,[1],1,0,null,0,0,null],[9010,"Tips_245","光束拖尾·左",null,[4015],null,null,null,6250,0,0,2,0,[1],1,0,null,0,0,null],[9011,"Tips_246","光束拖尾·右",null,[4016],null,null,null,6250,0,0,2,0,[1],1,0,null,0,0,null]];
export interface IShopItemElement extends IElementBase{
 	/**表id*/
	ID:number
	/**商品名称
（目前礼包用）*/
	name:string
	/**备注*/
	noUse:string
	/**道具表id*/
	propIds:Array<number>
	/**装扮表ID*/
	dressIds:Array<number>
	/**表情舞蹈表ID*/
	DanceIds:Array<number>
	/**开屏界面商品背景图*/
	ItemBG:string
	/**时限(天)*/
	time:Array<number>
	/**价格*/
	price:number
	/**现价
（无则不填）*/
	nowPrice:number
	/**折扣
（无则不填）*/
	discount:number
	/**付款货币类型
(0: 异常币
 1: 乐币)*/
	coinType:number
	/**买完后获得的异常币数*/
	awards:number
	/**对应的个数  配合道具表id使用*/
	awardCount:Array<number>
	/**限购次数*/
	limitCount:number
	/**刷新类型
（1：不刷新
   2：每周刷新
   3：每日刷新）
有限购的配置*/
	refreshType:number
	/**商品ID*/
	commodityId:string
	/**是否显示红点*/
	isRedNotice:number
	/**广告次数*/
	advertiseNum:number
	/**星期几可售
（范围从 0（星期日）到 6（星期六））*/
	weekSolds:Array<number>
 } 
export class ShopItemConfig extends ConfigBase<IShopItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}