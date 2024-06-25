import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","mark","key","gameId","gameIdGPark","maxNum","name","name_desc","desc","desc_desc","PIC","levelName"],["","","","","","","Language","","Language","","",""],[1,"大厅（不会出现在跳游戏的列表里）","Hall","P_d288b58efdfcc12558ad19601647a6ab87d0e305","P_855fd66ecf725a5f9436f48cb61b82f591551ef1",5,"Gamename_01","大厅","大厅文本测试","大厅文本测试",308710,"1001_hall"],[2,"学校","School","P_abdcacf4c8596dce5366b37b98ce85480b949c92","P_de18c334404201e856f4fb5f6c2341930bd5a0bb",5,"Gamename_02","鬼校","Skip_01","欢迎来到恐怖鬼校\n诡异的谜团和隐秘的真相等待你去揭开\n· 你可以选择逃出去，但你只有5天时间\n· 你也可以尝试找到背后的真相，解救帕姆尼\n· 只有个别房间和柜子是安全的\n· 听说出去的路不止一条\n他们来找你了\n祝你好运... …",308713,"1002_shool"],[3,"医院","Hospital","P_af43d40d4c839e12abb7266888584980c6e64cc1","P_2e8aaa759338543c856f951601e317c439408c89",5,"Gamename_03","疯人院","Skip_02","欢迎来到疯人院\n诡异的夜晚，红月升空，为疯人院带来了许多谜团...\n包括帕姆尼在内的不少生物似乎都变的疯狂\n· 你可以选择独自出逃\n· 也可以选择拯救一切\n· 亦或者投身于黑暗中\n· 但记住，你只有5天时间\n他们来找你了\n祝你好运...",308710,"1003_hospital"],[4,"孤岛","Graveyard","P_66106133d124d4c838915bc832ed62d30406a217","P_5aa35a8e3b72474228a30ce4a92a7be6241d1bc2",5,"Gamename_04","惊魂岛","Skip_03","各位露营者，欢迎来到惊魂岛！\n听说，每当血月降临，你的影子就会来找你…\n探索建造，就地取材，阻挡影人的攻击\n完善你的露营小屋，坚持活下去！\n饿猫、钓鱼人、火山魔树、牢笼中的月亮…\n岛上似乎还隐藏着许多不为人知的秘密…\n享受血色露营之旅吧！",308712,"1004_graveyard"],[5,"小镇","Town","P_a900c29788f522cc4d6cd2a9698a637407de6077","P_2c8794ada5dc8cc7c7f3e81f69dedb5a29ebe9e7",5,"Gamename_05","丧尸小镇","Skip_04","小镇本是个普通的小镇，人们在这里过着重复的生活\n突然出现的红月，打破了小镇以往的宁静......\n红月的光芒，让小镇居民的身体和精神都发生了变化\n小镇不再宁静......这里遍布着丧尸的低吼\n你该如何选择呢？逃离？还是拯救？",308709,"1005_town"]];
export interface IGameThemeElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	mark:string
	/**undefined*/
	key:string
	/**游戏id（只用来拷存档用了）*/
	gameId:string
	/**海外游戏id（只用来拷存档用了）*/
	gameIdGPark:string
	/**最大匹配人数*/
	maxNum:number
	/**名字*/
	name:string
	/**名字的备注*/
	name_desc:string
	/**描述*/
	desc:string
	/**描述的备注*/
	desc_desc:string
	/**图片*/
	PIC:number
	/**场景名字*/
	levelName:string
 } 
export class GameThemeConfig extends ConfigBase<IGameThemeElement>{
	constructor(){
		super(EXCELDATA);
	}

}