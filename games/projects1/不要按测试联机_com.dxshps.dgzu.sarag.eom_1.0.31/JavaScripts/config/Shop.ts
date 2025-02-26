import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","type","price","priceType","returnPrice","configID","currencyGUID"],["","","","","","","",""],[10001,"篮球",1,150,1,10,10001,"98159"],[10002,"樱花狐",1,150,1,10,10002,"98159"],[10003,"小熊猫",1,150,1,10,10003,"98159"],[10004,"神秘宝箱",1,300,1,20,10004,"98159"],[10005,"吸血鬼之墓",1,990,1,160,10005,"98159"],[20001,"尖叫鸡",2,150,1,10,20001,"98159"],[20002,"圣诞礼物",2,150,1,10,20002,"98159"],[20003,"回旋镖",2,150,1,10,20003,"98159"],[20004,"暗夜之翼",2,300,1,20,20004,"98159"],[20005,"恶魔之翼",2,990,1,160,20005,"98159"],[30001,"雪花",3,150,1,10,30001,"98159"],[30002,"螺丝",3,150,1,10,30002,"98159"],[30003,"泡泡",3,300,1,20,30003,"98159"],[30004,"烟花",3,990,1,160,30004,"98159"],[40001,"流光精灵",4,300,1,20,40001,"98159"],[40002,"恶魔火焰",4,990,1,160,40002,"98159"],[50001,"可爱的",5,150,1,10,50001,"98159"],[50002,"喵喵叫的",5,150,1,10,50002,"98159"],[50003,"猫王",5,300,1,20,50003,"98159"],[50004,"跑酷高手",5,990,1,160,50004,"98159"],[60001,"奶牛猫",6,0,1,0,10001,"98159"],[60002,"白猫",6,0,1,0,10002,"98159"],[60003,"橘猫",6,0,1,0,10003,"98159"],[60004,"公主猫",6,300,1,20,10004,"98159"],[60005,"海盗王猫",6,300,1,20,10005,"98159"],[60006,"波斯猫",6,300,1,20,10006,"98159"],[60007,"沙滩猫",6,300,1,20,10007,"98159"],[60008,"无毛猫",6,300,1,20,10008,"98159"],[60009,"魔法女巫猫",6,990,1,160,10009,"98159"],[60010,"萝卜猫",6,990,1,160,10010,"98159"],[60011,"恐怖南瓜猫",6,990,1,160,10011,"98159"],[60012,"圣诞老人猫",6,990,1,160,10012,"98159"],[60013,"大魔术师猫",6,990,1,160,10013,"98159"],[60014,"地狱三头犬",6,40,2,10,10014,"98220"],[60015,"中华熊猫",6,40,2,10,10015,"98220"],[60016,"迷你猪",6,40,2,10,10016,"98220"],[60030,"彩虹独角马",6,0,2,0,10030,"98220"]];
export interface IShopElement extends IElementBase{
 	/**序号
10000背部挂件
20000肩部挂件
30000拖尾
40000特效挂件
50000头衔
60000宠物
70000货币*/
	id:number
	/**商品名称
（策划看）*/
	content:string
	/**商品类别
1：背部挂件
2：肩部挂件
3：拖尾
4：特效挂件
5：头衔
6：宠物*/
	type:number
	/**价格*/
	price:number
	/**货币种类
1：派对币
2：萌宠钱钱*/
	priceType:number
	/**重复后返还货币数量*/
	returnPrice:number
	/**对应装扮表/宠物表的ID
（如果是12345就读装扮表，6就读宠物表）*/
	configID:number
	/**货币图标guid*/
	currencyGUID:string
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}