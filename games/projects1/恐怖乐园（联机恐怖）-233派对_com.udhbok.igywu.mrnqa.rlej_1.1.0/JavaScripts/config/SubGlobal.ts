import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","number","numberList","string","stringList","vector","array1d","locations"],["","ReadByName","","","","","","","",""],[1,"wantParams","每日白嫖配置",20,null,null,null,null,null,null],[2,"openBoxTimes","每日开宝箱次数",5,null,null,null,null,null,null],[3,"CurCardEffect","解密卡引导特效|缩放",0,null,"E4ABE76F452E98C5394D27ABFFC38A08",null,new mw.Vector(1,1,1),null,null],[4,"PassBaseExp","通关获得经验基数",300,null,null,null,null,null,null],[5,"NaturalOutputExp","每分钟自然产出经验",10,null,null,null,null,null,null],[6,"NaturalOutputExpPerSec","每秒自然产出",0.167,null,null,null,null,null,null],[7,"MonthlyCard","月卡",0,null,null,["311592","324344"],null,[0.1,1000,30000],null],[8,"SeasonalCard","季卡",0,null,null,["311626","324359"],null,[0.2,3000,90000],null],[9,"skyBoxLightIntensity","天空光强度",0,null,null,null,null,[2.8,3,2.8,2,2.5],null],[10,"lightingIntensity","平行光强度",0,null,null,null,null,[2,2.5,2,1.3,1.6],null],[11,"sunColor","太阳光颜色",0,null,null,["#757ABC","#D8FFFF","#FF3F3B","#FF1100","#FF3F3B"],null,null,null],[12,"skyBoxTopColor","天空球上层颜色",0,null,null,["#879BD8","#FDF1F1","#2F3245","#2C2C2C","#2F3245"],null,null,null],[13,"skyBoxMiddleColor","天空球中层颜色",0,null,null,["#4279B5","#D4DEF0","#5B6677","#252A33","#5B6677"],null,null,null],[14,"skyBoxBottomColor","天空球下层颜色",0,null,null,["#6772B1","#D7DBF7","#9194A6","#2B2C33","#9194A6"],null,null,null],[15,"lerpTime","过渡时间",0,null,null,null,null,[126,252,378,423,468],null],[16,"dayTime","白天时间（s）784",378,null,null,null,null,null,null],[17,"nightTime","夜晚时间（s）180",90,null,null,null,null,null,null],[18,"skyBoxLightIntensityMoon","天空光强度",0,null,null,null,null,[2.8,3,2.8,1.8,2.5],null],[19,"lightingIntensityMoon","平行光强度",0,null,null,null,null,[2,2.5,2,1,1.6],null],[20,"sunColorMoon","太阳光颜色",0,null,null,["#FF3A00","#FF5800","#FF3A00","#BA0014","#BA0014"],null,null,null],[21,"skyBoxTopColorMoon","天空球上层颜色",0,null,null,["#FFAF00","#FFAF00","#FFAF00","#FFAF00","#FFAF00"],null,null,null],[22,"skyBoxMiddleColorMoon","天空球中层颜色",0,null,null,["#FF2800","#FF2800","#FF2800","#FF2800","#FF2800"],null,null,null],[23,"skyBoxBottomColorMoon","天空球下层颜色",0,null,null,["#72D400","#72D400","#72D400","#72D400","#72D400"],null,null,null],[24,"fearCoinIcon","恐惧币图标",0,null,"306668",null,null,null,null],[25,"leCoinIcon","乐币图标",0,null,"291724",null,null,null,null],[26,"gCoinIcon","G币图标",0,null,"311872",null,null,null,null],[27,"AlternateKilled","击杀伪人相关",60,null,null,null,null,[10026],null],[28,"fakerIcon","一些伪人的假图标",0,null,null,["325126","325130","325135","325131","325128"],null,null,null],[29,"findEffect","魔物被拾取后的材质",0,null,"224382",null,null,null,null],[30,"addCharmValArr","拍照评价增加魅力值：Excellent|Great|Not Bad",0,null,null,null,null,[20,10,5],null],[31,"photoAngleArr","评价划分距离",0,null,null,null,null,[10,30],null],[32,"photoCountRate","拍照数量与魅力值倍率",0,[[10,1.1],[20,1.3],[50,1.5],[75,2],[100,2.5]],null,null,null,null,null],[33,"charmIcon","魅力值图标",0,null,"98813",null,null,null,null],[34,"IntegraBtnIconList","任务界面左侧分页的图标",0,null,null,["UI_item_10203","UI_item_10203","UI_item_10203","UI_item_10203"],null,[337888,337890,337876,337884],null],[35,"expIcon","经验值图标",0,null,"101954",null,null,null,null],[36,"charmValIcon","鬼魅值图标",0,null,"98813",null,null,null,null],[40,"guid_pos","新手引导坐标",0,null,null,null,new mw.Vector(-10868,2825,379),null,null],[41,"guid_outpos","新手引导出去的坐标",0,null,null,null,new mw.Vector(0,-1350,300),null,null],[42,"Faker1Pieces","伪人1给的碎片图录id|权重",0,[[1,10],[2,10],[3,10],[4,10],[5,10]],null,null,null,null,null],[43,"Faker2Pieces","伪人2给的碎片图录id|权重",0,[[1,10],[2,10],[3,10],[4,10],[5,10]],null,null,null,null,null],[44,"Faker3Pieces","伪人3给的碎片图录id|权重",0,[[1,10],[2,10],[3,10],[4,10],[5,10]],null,null,null,null,null],[45,"Faker4Pieces","伪人4给的碎片图录id|权重",0,[[1,10],[2,10],[3,10],[4,10],[5,10]],null,null,null,null,null],[46,"BillboardTime","广告牌盯着的时间长度",0,[[4,2,2,2,2,1]],null,null,null,null,null],[50,"RealNameItems","实名认证奖励",0,[[10200,1000],[61025,1],[10013,5]],null,null,null,null,null]];
export interface ISubGlobalElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**备注*/
	detail:string
	/**数字*/
	number:number
	/**二维数组*/
	numberList:Array<Array<number>>
	/**字符串*/
	string:string
	/**字符串数组*/
	stringList:Array<string>
	/**坐标*/
	vector:mw.Vector
	/**一维数组*/
	array1d:Array<number>
	/**向量数组*/
	locations:mw.Vector[]
 } 
export class SubGlobalConfig extends ConfigBase<ISubGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**20*/
	get wantParams():ISubGlobalElement{return this.getElement(1)};
	/**5*/
	get openBoxTimes():ISubGlobalElement{return this.getElement(2)};
	/**0*/
	get CurCardEffect():ISubGlobalElement{return this.getElement(3)};
	/**300*/
	get PassBaseExp():ISubGlobalElement{return this.getElement(4)};
	/**10*/
	get NaturalOutputExp():ISubGlobalElement{return this.getElement(5)};
	/**0.167*/
	get NaturalOutputExpPerSec():ISubGlobalElement{return this.getElement(6)};
	/**0*/
	get MonthlyCard():ISubGlobalElement{return this.getElement(7)};
	/**0*/
	get SeasonalCard():ISubGlobalElement{return this.getElement(8)};
	/**0*/
	get skyBoxLightIntensity():ISubGlobalElement{return this.getElement(9)};
	/**0*/
	get lightingIntensity():ISubGlobalElement{return this.getElement(10)};
	/**0*/
	get sunColor():ISubGlobalElement{return this.getElement(11)};
	/**0*/
	get skyBoxTopColor():ISubGlobalElement{return this.getElement(12)};
	/**0*/
	get skyBoxMiddleColor():ISubGlobalElement{return this.getElement(13)};
	/**0*/
	get skyBoxBottomColor():ISubGlobalElement{return this.getElement(14)};
	/**0*/
	get lerpTime():ISubGlobalElement{return this.getElement(15)};
	/**378*/
	get dayTime():ISubGlobalElement{return this.getElement(16)};
	/**90*/
	get nightTime():ISubGlobalElement{return this.getElement(17)};
	/**0*/
	get skyBoxLightIntensityMoon():ISubGlobalElement{return this.getElement(18)};
	/**0*/
	get lightingIntensityMoon():ISubGlobalElement{return this.getElement(19)};
	/**0*/
	get sunColorMoon():ISubGlobalElement{return this.getElement(20)};
	/**0*/
	get skyBoxTopColorMoon():ISubGlobalElement{return this.getElement(21)};
	/**0*/
	get skyBoxMiddleColorMoon():ISubGlobalElement{return this.getElement(22)};
	/**0*/
	get skyBoxBottomColorMoon():ISubGlobalElement{return this.getElement(23)};
	/**0*/
	get fearCoinIcon():ISubGlobalElement{return this.getElement(24)};
	/**0*/
	get leCoinIcon():ISubGlobalElement{return this.getElement(25)};
	/**0*/
	get gCoinIcon():ISubGlobalElement{return this.getElement(26)};
	/**60*/
	get AlternateKilled():ISubGlobalElement{return this.getElement(27)};
	/**0*/
	get fakerIcon():ISubGlobalElement{return this.getElement(28)};
	/**0*/
	get findEffect():ISubGlobalElement{return this.getElement(29)};
	/**0*/
	get addCharmValArr():ISubGlobalElement{return this.getElement(30)};
	/**0*/
	get photoAngleArr():ISubGlobalElement{return this.getElement(31)};
	/**0*/
	get photoCountRate():ISubGlobalElement{return this.getElement(32)};
	/**0*/
	get charmIcon():ISubGlobalElement{return this.getElement(33)};
	/**0*/
	get IntegraBtnIconList():ISubGlobalElement{return this.getElement(34)};
	/**0*/
	get expIcon():ISubGlobalElement{return this.getElement(35)};
	/**0*/
	get charmValIcon():ISubGlobalElement{return this.getElement(36)};
	/**0*/
	get guid_pos():ISubGlobalElement{return this.getElement(40)};
	/**0*/
	get guid_outpos():ISubGlobalElement{return this.getElement(41)};
	/**0*/
	get Faker1Pieces():ISubGlobalElement{return this.getElement(42)};
	/**0*/
	get Faker2Pieces():ISubGlobalElement{return this.getElement(43)};
	/**0*/
	get Faker3Pieces():ISubGlobalElement{return this.getElement(44)};
	/**0*/
	get Faker4Pieces():ISubGlobalElement{return this.getElement(45)};
	/**0*/
	get BillboardTime():ISubGlobalElement{return this.getElement(46)};
	/**0*/
	get RealNameItems():ISubGlobalElement{return this.getElement(50)};

}