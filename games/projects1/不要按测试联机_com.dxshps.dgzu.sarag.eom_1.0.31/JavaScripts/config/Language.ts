import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["TextID","Name","Value","Value_Ch","Comment"],["","Key|ReadByName","MainLanguage","ChildLanguage",""],[10001,"Text_Text_10001",null,"选中的栏位已经有保存的装扮，是否覆盖",null],[10002,"Text_Text_10002",null,"覆盖",null],[10003,"Text_Text_10003",null,"取消",null],[10004,"Text_Text_10004",null,"取消保存",null],[10005,"Text_Text_10005",null,"幸运抽奖",null],[10006,"Text_Text_10006",null,"轮换商店",null],[10007,"Text_Text_10007",null,"抽一次",null],[10008,"Text_Text_10008",null,"抽十次",null],[10009,"Text_Text_10009",null,"再抽一次",null],[10010,"Text_Text_10010",null,"再抽十次",null],[10011,"Text_Text_10011",null,"显示全部奖池",null],[10012,"Text_Text_10012",null,null,null],[10013,"Text_Text_10013",null,"购买",null],[10014,"Text_Text_10014",null,"是否确认购买",null],[10015,"Text_Text_10015",null,"保存",null],[10016,"Text_Text_10016",null,"商店",null],[10017,"Text_Text_10017",null,"装扮",null],[10018,"Text_Text_10018",null,"资料",null],[10019,"Text_Text_10019",null,"排名",null],[10020,"Text_Text_10020","Shapeshift","切换形态",null],[10021,"Text_Text_40001",null,"变身冷却中",null],[10022,"Text_Text_40002",null,"货币不足",null],[10023,"Text_Text_40003",null,"保存成功",null],[10024,"Text_Text_40004",null,"切换成功",null],[10025,"Text_Text_40005",null,"购买成功",null],[10026,"Text_Text_50001",null,"派对次数",null],[10027,"Text_Text_50002",null,"夺冠次数",null],[10028,"Text_Text_50003",null,"完成关卡",null],[10029,"Text_Text_50004",null,"入学天数",null],[10030,"Text_Text_50005",null,"活跃天数",null],[10031,"Text_Text_50006",null,"宠物收集",null],[10032,"Text_Text_50007",null,"装扮收集",null],[10033,"Text_Text_50008",null,"时尚分数",null],[10034,"Text_Text_50009",null,"珍惜宠物",null],[10035,"Text_Text_50010",null,"抽奖总数",null],[10036,"Text_Text_40006",null,"竞速比赛夺冠来获得",null],[10037,"Text_Text_40007",null,"参加竞速比赛、探索世界来获得",null],[10038,"Text_Text_10021",null,"敬请期待",null],[10039,"Text_Text_10022",null," 距离商店轮换还有{0}天{1}时",null],[10040,"Text_Text_10023",null," 距离商店轮换还有{0}时{1}分",null],[10041,"Text_Text_10024",null,"下次必中传说物品：{0}/{1}",null],[10042,"Text_Text_20001",null,"确认要返回大厅吗？",null],[10043,"Text_Text_20002",null,"取消",null],[10044,"Text_Text_20003",null,"确认",null],[10045,"Text_Text_10025",null,"已拥有",null],[10046,"Text_Text_40008",null,"慢一点",null],[10047,"Text_Text_10026",null,"价格：每抽{0}",null],[10048,"Text_Text_60001","Unfortunately, it's just a little bit close","可惜就差一点点",null],[10049,"Text_Text_60002","You caught the fish","抓到鱼了！",null],[10050,"Text_Text_60003","What a pity, the fish ran away","好遗憾，鱼跑掉了",null],[10051,"Text_Text_60004","Fishing successfully","摸鱼成功",null],[10052,"Text_Text_60005","Fishing","摸鱼",null],[10053,"Text_Text_60006","Tame","驯服",null],[10054,"Text_Text_70001",null,"去瞧瞧发生了什么？",null],[10055,"Text_Text_70002",null,"想办法来到训练师身边...",null],[10056,"Text_Text_70003",null,"跳过挡路的电线杆",null],[10057,"Text_Text_70004",null,"使用飞扑穿过池塘",null],[10058,"Text_Text_70005",null,"继续前进...",null],[10059,"Text_Text_70006",null,"使用泡泡枪击败恶犬",null],[10060,"Text_Text_70007",null,"和训练师团聚",null],[10061,"Text_Text_70008",null,"带着宠物回到训练师基地吧",null],[10062,"Text_Text_80001",null,"登录游戏","游戏任务"],[10063,"Text_Text_80002",null,"参与{0}场比赛","游戏任务"],[10064,"Text_Text_80003",null,"在大厅使用{0}次飞扑","游戏任务"],[10065,"Text_Text_80004",null,"夺冠{0}次","游戏任务"],[10066,"Text_Text_80005",null,"进行{0}次抽奖","游戏任务"],[10067,"Text_Text_80006",null,"使用{0}次动作/表情","游戏任务"],[10068,"Text_Text_80007",null,"更换宠物{0}次","游戏任务"],[10069,"Text_Text_80008",null,"在比赛中晋级{0}次","游戏任务"],[10070,"Text_Text_80009",null,"使用{0}次动作","游戏任务"],[10071,"Text_Text_80010",null,"使用{0}次表情","游戏任务"],[10072,"Text_Text_80011",null,"获得{0}金币","游戏任务"],[10073,"Text_Text_80012",null,"在线时长{0}分钟","游戏任务"],[10074,"Text_Text_80013",null,"登录{0}天","游戏任务"],[10075,"Text_Text_80014",null,"组队状态下参加{0}场比赛","游戏任务"],[10076,"Text_Text_80015",null,"进入{0}次活动关卡","游戏任务"],[10077,"Text_Text_80016",null,"达到{0}等级","游戏任务"],[10078,"Text_Text_80017",null,"在关卡内使用{0}次飞扑","游戏任务"],[10079,"Text_Text_10027",null,"宠物天赋","宠物天赋强化界面"],[10080,"Text_Text_10028",null,"降级","宠物天赋强化界面"],[10081,"Text_Text_10029",null,"升级","宠物天赋强化界面"],[10082,"Text_Text_10030",null,"下一个等级：","宠物天赋强化界面"],[10083,"Text_Text_10031",null,"可强化！","宠物天赋强化界面"],[10084,"Text_Text_10032",null,"训练师的新人好礼！","新手签到界面"],[10085,"Text_Text_10033",null,"报道","新手签到界面"],[10086,"Text_Text_10034",null,"训练师的报到任务：","新手签到界面"],[10087,"Text_Text_10035",null,"连续7天，每日登录都可以领取奖励！","新手签到界面"],[10088,"Text_Text_10036",null,"记得明天来领取哦~","新手签到界面"],[10089,"Text_Text_10037",null,"未解锁","新手签到界面"],[10090,"Text_Text_10038",null,"领取","新手签到界面"],[10091,"Text_Text_10039",null,"已领取","新手签到界面"],[10092,"Text_Text_10040",null,"已领取","任务系统界面"],[10093,"Text_Text_10041",null,"日常任务","任务系统界面"],[10094,"Text_Text_10042",null,"领取","任务系统界面"],[10095,"Text_Text_10043",null,"未完成","任务系统界面"],[10096,"Text_Text_10044",null,"今日活跃度","任务系统界面"],[10097,"Text_Text_10045",null,"本周活跃度","任务系统界面"],[10098,"Text_Text_10046",null,"一键领取","任务系统界面"],[10099,"Text_Text_10047",null,"！","任务系统界面"],[10100,"Text_Text_10048",null,"未达到该等级","等级系统界面"],[10101,"Text_Text_30001",null,"派对币","货币"],[10102,"Text_Text_30002",null,"萌宠钱钱","货币"],[10103,"Text_Text_30003",null,"活跃度","货币"],[10104,"Text_Text_30004",null,"天赋代币","货币"],[10105,"Text_Text_40009",null,"已送出邀请","组队提示"],[10106,"Text_Text_40010",null,"成功加入{0}的队伍","组队提示"],[10107,"Text_Text_40011",null,"{0}加入了你的队伍","组队提示"],[10108,"Text_Text_40012",null,"需要由队长开启游戏","组队匹配提示"],[10109,"Text_Text_40013",null,"{0}邀请你加入小队","组队提示"],[10110,"Text_Text_40014",null,"确认要退出队伍吗？","组队提示"],[10111,"Text_Text_10049",null,"强化","系统入口，尽量简短"],[10112,"Text_Text_10050",null,"签到","系统入口，尽量简短"],[10113,"Text_Text_10051",null,"任务","系统入口，尽量简短"],[10114,"Text_Text_10052",null,"抱歉呀，已经领取过啦！","新手签到界面"],[10115,"Text_Text_10053",null,"活跃度足够即可开启，不同宝箱有各式礼物赠送","任务活跃度宝箱界面"],[10116,"Text_Text_10054","Hello!","你好！",null],[10117,"Text_Text_10055","Hello, can we make friends?","哈喽，我们能交个朋友吗？",null],[10118,"Text_Text_10056","Can we play together?","我们能一起玩吗？",null],[10119,"Text_Text_10057","I like you!","我喜欢你！",null],[10120,"Text_Text_10058","I like your outfit!","我喜欢你的装扮！",null],[10121,"Text_Text_10059","Wow！You look really nice!","哇偶 你看起来真好看！",null],[10122,"Text_Text_10060","Where do you come from？","你来自哪里啊？",null],[10123,"Text_Text_10061","Yes! That's right!","对！没错！",null],[10124,"Text_Text_10062","Do you need help？","你需要帮助吗？",null],[10125,"Text_Text_10063","Do you want to play games with us？","你想跟我们一起玩游戏吗？",null],[10126,"Text_Text_10064","That's right! That's it！","没错！就是那样！",null],[10127,"Text_Text_10065","I'm leaving","我走了",null],[10128,"Text_Text_10066","See you again next time~","下次再见~",null],[10129,"Text_Text_30005",null,"宠物","奖励"],[10130,"Text_Text_60007",null,"已经被别人挖走啦",null],[10131,"Text_Text_60008",null,"获得了一个雪球",null],[20001,"Decoration_name_10001",null,"篮球","挂件"],[20002,"Decoration_name_10002",null,"樱花狐","挂件"],[20003,"Decoration_name_10003",null,"小熊猫","挂件"],[20004,"Decoration_name_10004",null,"神秘宝箱","挂件"],[20005,"Decoration_name_10005",null,"吸血鬼之墓","挂件"],[20006,"Decoration_name_20001",null,"尖叫鸡","挂件"],[20007,"Decoration_name_20002",null,"圣诞礼物","挂件"],[20008,"Decoration_name_20003",null,"回旋镖","挂件"],[20009,"Decoration_name_20004",null,"暗夜之翼","挂件"],[20010,"Decoration_name_20005",null,"恶魔之翼","挂件"],[20011,"Decoration_name_30001",null,"雪花","挂件"],[20012,"Decoration_name_30002",null,"螺丝","挂件"],[20013,"Decoration_name_30003",null,"泡泡","挂件"],[20014,"Decoration_name_30004",null,"烟花","挂件"],[20015,"Decoration_name_40001",null,"流光精灵","挂件"],[20016,"Decoration_name_40002",null,"恶魔火焰","挂件"],[20017,"Decoration_name_50001",null,"可爱的","头衔"],[20018,"Decoration_name_50002",null,"喵喵叫的","头衔"],[20019,"Decoration_name_50003",null,"猫王","头衔"],[20020,"Decoration_name_50004",null,"跑酷高手","头衔"],[20021,"Decoration_detail_10001",null,"小黑子必备",null],[20022,"Decoration_detail_10002",null,"保护小宠物平平安安",null],[20023,"Decoration_detail_10003",null,"光彩夺目的明星宠物",null],[20024,"Decoration_detail_10004",null,"藏着什么样的宝物？",null],[20025,"Decoration_detail_10005",null,"在半夜偷偷爬出来",null],[20026,"Decoration_detail_20001",null,"小黑子必备",null],[20027,"Decoration_detail_20002",null,"随时随地圣诞快乐",null],[20028,"Decoration_detail_20003",null,"成为忍者大师",null],[20029,"Decoration_detail_20004",null,"黑夜里最优雅的存在",null],[20030,"Decoration_detail_20005",null,"恶魔化身特有的翅膀",null],[20031,"Decoration_detail_30001",null,"唤醒冬日的记忆",null],[20032,"Decoration_detail_30002",null,"伪装成机械宠物",null],[20033,"Decoration_detail_30003",null,"唤醒夏日的记忆",null],[20034,"Decoration_detail_30004",null,"向所有人展示你的热情",null],[20035,"Decoration_detail_40001",null,"正在分析目标数据...",null],[20036,"Decoration_detail_40002",null,"感觉血液在燃烧",null],[20037,"Decoration_title_50001",null,"可爱的","头衔，前置于玩家名"],[20038,"Decoration_title_50002",null,"喵喵叫的","头衔，前置于玩家名"],[20039,"Decoration_title_50003",null,"猫王","头衔，前置于玩家名"],[20040,"Decoration_title_50004",null,"，跑酷高手","头衔，后置于玩家名"],[40001,"Lottery_name_1001",null,"训练师神秘大礼",null],[50001,"Pet_name_10001","Cow Cat","奶牛猫","宠物"],[50002,"Pet_name_10002","White Cat","白猫",null],[50003,"Pet_name_10003","Ginger Cat","橘猫",null],[50004,"Pet_name_10004","Princess Cat","公主猫",null],[50005,"Pet_name_10005","Pirate Lord Cat","海盗王猫",null],[50006,"Pet_name_10006","Persian Cat","波斯猫",null],[50007,"Pet_name_10007","Beach Cat","沙滩猫",null],[50008,"Pet_name_10008","Sphynx Cat","无毛猫",null],[50009,"Pet_name_10009","Witch Cat","女巫猫",null],[50010,"Pet_name_10010","Carrot Cat","萝卜猫","头饰是胡萝卜，但叫胡萝卜猫不好听，但是是胡萝卜"],[50011,"Pet_name_10011","Spooky Pumpkin Cat","恐怖南瓜猫",null],[50012,"Pet_name_10012","Santa Cat","圣诞老人猫",null],[50013,"Pet_name_10013","The Great Magician Cat","大魔术师猫",null],[50014,"Pet_name_10014","Cerberus","地狱三头犬",null],[50015,"Pet_name_10015","Chinese Panda","中华熊猫",null],[50016,"Pet_name_10016","Mini Pig","迷你猪",null],[50017,"Pet_detailContent_10001",null,"机灵顽皮的奶牛猫",null],[50018,"Pet_detailContent_10002",null,"性格温顺的白猫",null],[50019,"Pet_detailContent_10003",null,"可爱又贪吃的橘猫",null],[50020,"Pet_detailContent_10004",null,"住在城堡里的公主猫",null],[50021,"Pet_detailContent_10005",null,"拥有一艘舰船的海盗王猫",null],[50022,"Pet_detailContent_10006",null,"眼睛像宝石的波斯猫",null],[50023,"Pet_detailContent_10007",null,"享受度假生活的沙滩猫",null],[50024,"Pet_detailContent_10008",null,"怪异又警惕的无毛猫",null],[50025,"Pet_detailContent_10009",null,"会骑着扫帚飞行的女巫猫",null],[50026,"Pet_detailContent_10010",null,"冬天也不怕冷的萝卜猫",null],[50027,"Pet_detailContent_10011",null,"不给糖就捣蛋！",null],[50028,"Pet_detailContent_10012",null,"乘坐驯鹿雪橇的圣诞老人猫",null],[50029,"Pet_detailContent_10013",null,"神秘莫测的大魔术师猫",null],[50030,"Pet_detailContent_10014",null,"看守地狱大门的三头犬",null],[50031,"Pet_detailContent_10015",null,"喜欢吃竹子和睡懒觉的中华熊猫",null],[50032,"Pet_detailContent_10016",null,"香喷喷的迷你猪",null],[50033,"Pet_name_10030",null,"彩虹独角马",null],[50034,"Pet_detailContent_10030",null,"萌宠训练师基地的小主人",null],[60001,"AIName_Name_1",null,"有朝夕与四季","假玩家的id，不用直译，放一些外网常见id就行"],[60002,"AIName_Name_2",null,"梨花落心扉","假玩家的id，不用直译，放一些外网常见id就行"],[60003,"AIName_Name_3",null,"夏青","假玩家的id，不用直译，放一些外网常见id就行"],[60004,"AIName_Name_4",null,"笨比熊","假玩家的id，不用直译，放一些外网常见id就行"],[60005,"AIName_Name_5",null,"喵叽","假玩家的id，不用直译，放一些外网常见id就行"],[60006,"AIName_Name_6",null,"即使孤独依旧前行","假玩家的id，不用直译，放一些外网常见id就行"],[60007,"AIName_Name_7",null,"理想的翅膀","假玩家的id，不用直译，放一些外网常见id就行"],[60008,"AIName_Name_8",null,"花漓","假玩家的id，不用直译，放一些外网常见id就行"],[60009,"AIName_Name_9",null,"会挖宝的小仙女","假玩家的id，不用直译，放一些外网常见id就行"],[60010,"AIName_Name_10",null,"冉七","假玩家的id，不用直译，放一些外网常见id就行"],[60011,"AIName_Name_11",null,"此账号已停用","假玩家的id，不用直译，放一些外网常见id就行"],[60012,"AIName_Name_12",null,"不解风情的老妖怪","假玩家的id，不用直译，放一些外网常见id就行"],[60013,"AIName_Name_13",null,"华元","假玩家的id，不用直译，放一些外网常见id就行"],[60014,"AIName_Name_14",null,"千杯风月醉","假玩家的id，不用直译，放一些外网常见id就行"],[60015,"AIName_Name_15",null,"梦菡","假玩家的id，不用直译，放一些外网常见id就行"],[60016,"AIName_Name_16",null,"浮笙","假玩家的id，不用直译，放一些外网常见id就行"],[70001,"PetUpgrades_name_10001",null,"冲刺加速度",null],[70002,"PetUpgrades_name_10002",null,"冲刺持续时间",null],[70003,"PetUpgrades_name_10003",null,"移动最大速度",null],[70004,"PetUpgrades_name_10004",null,"冲刺最大速度",null],[70005,"PetUpgrades_name_10005",null,"移动加速度",null],[70006,"PetUpgrades_name_10006",null,"冲刺冷却时间",null],[70007,"PetUpgrades_detail_10001",null,"冲刺的加速度增加{0}",null],[70008,"PetUpgrades_detail_10002",null,"冲刺的持续时间增加{0}",null],[70009,"PetUpgrades_detail_10003",null,"移动的最大速度增加{0}",null],[70010,"PetUpgrades_detail_10004",null,"冲刺的最大速度增加{0}",null],[70011,"PetUpgrades_detail_10005",null,"移动的加速度增加{0}",null],[70012,"PetUpgrades_detail_10006",null,"冲刺的冷却时间降低{0}",null],[90001,"ToolStat_name_10001","Blast","冲击波","道具，尽量短"],[90002,"ToolStat_name_10002","Bubble","泡泡枪","道具，尽量短，不需要翻枪"],[90003,"ToolStat_name_10003","Speed","加速饮料","道具，尽量短，不需要翻饮料"],[90004,"ToolStat_name_10004","Teleport","传送方块","道具，尽量短，不需要翻方块"],[90005,"ToolStat_name_10005","Octopus","章鱼","道具，尽量短"],[90006,"ToolStat_name_10006","Snowball","雪球","道具，尽量短"],[90007,"ToolStat_name_10007","Bomb","炸弹","道具，尽量短"],[90008,"ToolStat_name_10008","Rocket","火箭","道具，尽量短"],[90009,"ToolStat_name_10009","Trampoline","丢弹板","道具，尽量短，不需要翻丢"],[100001,"Language_Name_100001",null,"确认覆盖",null],[100002,"Language_Name_100002",null,"驯服进度",null],[100003,"Language_Name_100003",null,"已转化","抽到重复的道具和宠物，转化成钱"],[100004,"Language_Name_100004",null,"是否接受其他玩家的邀请","组队设置，通过按钮开关"],[100005,"Language_Name_100005",null,"邀请",null],[100006,"Language_Name_100006",null,"离开",null],[100007,"Language_Name_100007",null,"队长","尽量简短，组队界面名字上的角标"],[100008,"Language_Name_100008",null,"开始匹配","尽量和中文文本长度接近"],[100009,"Language_Name_100009",null,"取消匹配","尽量和中文文本长度接近"],[100010,"Language_Name_100010",null,"队伍",null],[100011,"Language_Name_100011",null,"取消换装",null],[100012,"Language_Name_100012",null,"显示详情","点击之后显示抽卡详细概率的页签"],[100013,"Language_Name_100013",null,"价格：每抽160","后面接了货币UI，需要160在文本最后"],[100014,"Language_Name_100014",null,"欢迎来到萌宠派对",null],[100015,"Language_Name_100015",null,"点击跳跃",null],[100016,"Language_Name_100016",null,"点击飞扑",null],[100017,"Language_Name_100017",null,"点击冲刺",null],[100018,"Language_Name_100018",null,"我明白了",null],[100019,"Language_Name_100019",null,"获得冠军",null],[100020,"Language_Name_100020",null,"s后自动退出","xxx秒后自动退出，s需要在最前"],[100021,"Language_Name_100021",null,"点击继续",null],[100022,"Language_Name_100022",null,"获得冠军",null],[100023,"Language_Name_100023",null,"下一关是...",null],[100024,"Language_Name_100024",null,"距离游戏开始还有：",null],[100025,"Language_Name_100025",null,"争冠军","尽量和中文文本长度接近"],[100026,"Language_Name_100026",null,"已晋级","尽量和中文文本长度接近"],[100027,"Language_Name_100027",null,"匹配成功","尽量和中文文本长度接近"],[100028,"Language_Name_100028",null,"匹配中","尽量和中文文本长度接近"]];
export interface ILanguageElement extends IElementBase{
 	/**文本序号
10000：文本表
20000：装扮
30000：商店轮换
40000：抽奖
50000：宠物
60001：AI名字
70000：宠物强化
80000：日常任务
90000：道具
100000：纯UI文本*/
	TextID:number
	/**key*/
	Name:string
	/**英文*/
	Value:string
	/**备注*/
	Comment:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**选中的栏位已经有保存的装扮，是否覆盖*/
	get Text_Text_10001():ILanguageElement{return this.getElement(10001)};
	/**覆盖*/
	get Text_Text_10002():ILanguageElement{return this.getElement(10002)};
	/**取消*/
	get Text_Text_10003():ILanguageElement{return this.getElement(10003)};
	/**取消保存*/
	get Text_Text_10004():ILanguageElement{return this.getElement(10004)};
	/**幸运抽奖*/
	get Text_Text_10005():ILanguageElement{return this.getElement(10005)};
	/**轮换商店*/
	get Text_Text_10006():ILanguageElement{return this.getElement(10006)};
	/**抽一次*/
	get Text_Text_10007():ILanguageElement{return this.getElement(10007)};
	/**抽十次*/
	get Text_Text_10008():ILanguageElement{return this.getElement(10008)};
	/**再抽一次*/
	get Text_Text_10009():ILanguageElement{return this.getElement(10009)};
	/**再抽十次*/
	get Text_Text_10010():ILanguageElement{return this.getElement(10010)};
	/**显示全部奖池*/
	get Text_Text_10011():ILanguageElement{return this.getElement(10011)};
	/**null*/
	get Text_Text_10012():ILanguageElement{return this.getElement(10012)};
	/**购买*/
	get Text_Text_10013():ILanguageElement{return this.getElement(10013)};
	/**是否确认购买*/
	get Text_Text_10014():ILanguageElement{return this.getElement(10014)};
	/**保存*/
	get Text_Text_10015():ILanguageElement{return this.getElement(10015)};
	/**商店*/
	get Text_Text_10016():ILanguageElement{return this.getElement(10016)};
	/**装扮*/
	get Text_Text_10017():ILanguageElement{return this.getElement(10017)};
	/**资料*/
	get Text_Text_10018():ILanguageElement{return this.getElement(10018)};
	/**排名*/
	get Text_Text_10019():ILanguageElement{return this.getElement(10019)};
	/**切换形态*/
	get Text_Text_10020():ILanguageElement{return this.getElement(10020)};
	/**变身冷却中*/
	get Text_Text_40001():ILanguageElement{return this.getElement(10021)};
	/**货币不足*/
	get Text_Text_40002():ILanguageElement{return this.getElement(10022)};
	/**保存成功*/
	get Text_Text_40003():ILanguageElement{return this.getElement(10023)};
	/**切换成功*/
	get Text_Text_40004():ILanguageElement{return this.getElement(10024)};
	/**购买成功*/
	get Text_Text_40005():ILanguageElement{return this.getElement(10025)};
	/**派对次数*/
	get Text_Text_50001():ILanguageElement{return this.getElement(10026)};
	/**夺冠次数*/
	get Text_Text_50002():ILanguageElement{return this.getElement(10027)};
	/**完成关卡*/
	get Text_Text_50003():ILanguageElement{return this.getElement(10028)};
	/**入学天数*/
	get Text_Text_50004():ILanguageElement{return this.getElement(10029)};
	/**活跃天数*/
	get Text_Text_50005():ILanguageElement{return this.getElement(10030)};
	/**宠物收集*/
	get Text_Text_50006():ILanguageElement{return this.getElement(10031)};
	/**装扮收集*/
	get Text_Text_50007():ILanguageElement{return this.getElement(10032)};
	/**时尚分数*/
	get Text_Text_50008():ILanguageElement{return this.getElement(10033)};
	/**珍惜宠物*/
	get Text_Text_50009():ILanguageElement{return this.getElement(10034)};
	/**抽奖总数*/
	get Text_Text_50010():ILanguageElement{return this.getElement(10035)};
	/**竞速比赛夺冠来获得*/
	get Text_Text_40006():ILanguageElement{return this.getElement(10036)};
	/**参加竞速比赛、探索世界来获得*/
	get Text_Text_40007():ILanguageElement{return this.getElement(10037)};
	/**敬请期待*/
	get Text_Text_10021():ILanguageElement{return this.getElement(10038)};
	/** 距离商店轮换还有{0}天{1}时*/
	get Text_Text_10022():ILanguageElement{return this.getElement(10039)};
	/** 距离商店轮换还有{0}时{1}分*/
	get Text_Text_10023():ILanguageElement{return this.getElement(10040)};
	/**下次必中传说物品：{0}/{1}*/
	get Text_Text_10024():ILanguageElement{return this.getElement(10041)};
	/**确认要返回大厅吗？*/
	get Text_Text_20001():ILanguageElement{return this.getElement(10042)};
	/**取消*/
	get Text_Text_20002():ILanguageElement{return this.getElement(10043)};
	/**确认*/
	get Text_Text_20003():ILanguageElement{return this.getElement(10044)};
	/**已拥有*/
	get Text_Text_10025():ILanguageElement{return this.getElement(10045)};
	/**慢一点*/
	get Text_Text_40008():ILanguageElement{return this.getElement(10046)};
	/**价格：每抽{0}*/
	get Text_Text_10026():ILanguageElement{return this.getElement(10047)};
	/**可惜就差一点点*/
	get Text_Text_60001():ILanguageElement{return this.getElement(10048)};
	/**抓到鱼了！*/
	get Text_Text_60002():ILanguageElement{return this.getElement(10049)};
	/**好遗憾，鱼跑掉了*/
	get Text_Text_60003():ILanguageElement{return this.getElement(10050)};
	/**摸鱼成功*/
	get Text_Text_60004():ILanguageElement{return this.getElement(10051)};
	/**摸鱼*/
	get Text_Text_60005():ILanguageElement{return this.getElement(10052)};
	/**驯服*/
	get Text_Text_60006():ILanguageElement{return this.getElement(10053)};
	/**去瞧瞧发生了什么？*/
	get Text_Text_70001():ILanguageElement{return this.getElement(10054)};
	/**想办法来到训练师身边...*/
	get Text_Text_70002():ILanguageElement{return this.getElement(10055)};
	/**跳过挡路的电线杆*/
	get Text_Text_70003():ILanguageElement{return this.getElement(10056)};
	/**使用飞扑穿过池塘*/
	get Text_Text_70004():ILanguageElement{return this.getElement(10057)};
	/**继续前进...*/
	get Text_Text_70005():ILanguageElement{return this.getElement(10058)};
	/**使用泡泡枪击败恶犬*/
	get Text_Text_70006():ILanguageElement{return this.getElement(10059)};
	/**和训练师团聚*/
	get Text_Text_70007():ILanguageElement{return this.getElement(10060)};
	/**带着宠物回到训练师基地吧*/
	get Text_Text_70008():ILanguageElement{return this.getElement(10061)};
	/**登录游戏*/
	get Text_Text_80001():ILanguageElement{return this.getElement(10062)};
	/**参与{0}场比赛*/
	get Text_Text_80002():ILanguageElement{return this.getElement(10063)};
	/**在大厅使用{0}次飞扑*/
	get Text_Text_80003():ILanguageElement{return this.getElement(10064)};
	/**夺冠{0}次*/
	get Text_Text_80004():ILanguageElement{return this.getElement(10065)};
	/**进行{0}次抽奖*/
	get Text_Text_80005():ILanguageElement{return this.getElement(10066)};
	/**使用{0}次动作/表情*/
	get Text_Text_80006():ILanguageElement{return this.getElement(10067)};
	/**更换宠物{0}次*/
	get Text_Text_80007():ILanguageElement{return this.getElement(10068)};
	/**在比赛中晋级{0}次*/
	get Text_Text_80008():ILanguageElement{return this.getElement(10069)};
	/**使用{0}次动作*/
	get Text_Text_80009():ILanguageElement{return this.getElement(10070)};
	/**使用{0}次表情*/
	get Text_Text_80010():ILanguageElement{return this.getElement(10071)};
	/**获得{0}金币*/
	get Text_Text_80011():ILanguageElement{return this.getElement(10072)};
	/**在线时长{0}分钟*/
	get Text_Text_80012():ILanguageElement{return this.getElement(10073)};
	/**登录{0}天*/
	get Text_Text_80013():ILanguageElement{return this.getElement(10074)};
	/**组队状态下参加{0}场比赛*/
	get Text_Text_80014():ILanguageElement{return this.getElement(10075)};
	/**进入{0}次活动关卡*/
	get Text_Text_80015():ILanguageElement{return this.getElement(10076)};
	/**达到{0}等级*/
	get Text_Text_80016():ILanguageElement{return this.getElement(10077)};
	/**在关卡内使用{0}次飞扑*/
	get Text_Text_80017():ILanguageElement{return this.getElement(10078)};
	/**宠物天赋*/
	get Text_Text_10027():ILanguageElement{return this.getElement(10079)};
	/**降级*/
	get Text_Text_10028():ILanguageElement{return this.getElement(10080)};
	/**升级*/
	get Text_Text_10029():ILanguageElement{return this.getElement(10081)};
	/**下一个等级：*/
	get Text_Text_10030():ILanguageElement{return this.getElement(10082)};
	/**可强化！*/
	get Text_Text_10031():ILanguageElement{return this.getElement(10083)};
	/**训练师的新人好礼！*/
	get Text_Text_10032():ILanguageElement{return this.getElement(10084)};
	/**报道*/
	get Text_Text_10033():ILanguageElement{return this.getElement(10085)};
	/**训练师的报到任务：*/
	get Text_Text_10034():ILanguageElement{return this.getElement(10086)};
	/**连续7天，每日登录都可以领取奖励！*/
	get Text_Text_10035():ILanguageElement{return this.getElement(10087)};
	/**记得明天来领取哦~*/
	get Text_Text_10036():ILanguageElement{return this.getElement(10088)};
	/**未解锁*/
	get Text_Text_10037():ILanguageElement{return this.getElement(10089)};
	/**领取*/
	get Text_Text_10038():ILanguageElement{return this.getElement(10090)};
	/**已领取*/
	get Text_Text_10039():ILanguageElement{return this.getElement(10091)};
	/**已领取*/
	get Text_Text_10040():ILanguageElement{return this.getElement(10092)};
	/**日常任务*/
	get Text_Text_10041():ILanguageElement{return this.getElement(10093)};
	/**领取*/
	get Text_Text_10042():ILanguageElement{return this.getElement(10094)};
	/**未完成*/
	get Text_Text_10043():ILanguageElement{return this.getElement(10095)};
	/**今日活跃度*/
	get Text_Text_10044():ILanguageElement{return this.getElement(10096)};
	/**本周活跃度*/
	get Text_Text_10045():ILanguageElement{return this.getElement(10097)};
	/**一键领取*/
	get Text_Text_10046():ILanguageElement{return this.getElement(10098)};
	/**！*/
	get Text_Text_10047():ILanguageElement{return this.getElement(10099)};
	/**未达到该等级*/
	get Text_Text_10048():ILanguageElement{return this.getElement(10100)};
	/**派对币*/
	get Text_Text_30001():ILanguageElement{return this.getElement(10101)};
	/**萌宠钱钱*/
	get Text_Text_30002():ILanguageElement{return this.getElement(10102)};
	/**活跃度*/
	get Text_Text_30003():ILanguageElement{return this.getElement(10103)};
	/**天赋代币*/
	get Text_Text_30004():ILanguageElement{return this.getElement(10104)};
	/**已送出邀请*/
	get Text_Text_40009():ILanguageElement{return this.getElement(10105)};
	/**成功加入{0}的队伍*/
	get Text_Text_40010():ILanguageElement{return this.getElement(10106)};
	/**{0}加入了你的队伍*/
	get Text_Text_40011():ILanguageElement{return this.getElement(10107)};
	/**需要由队长开启游戏*/
	get Text_Text_40012():ILanguageElement{return this.getElement(10108)};
	/**{0}邀请你加入小队*/
	get Text_Text_40013():ILanguageElement{return this.getElement(10109)};
	/**确认要退出队伍吗？*/
	get Text_Text_40014():ILanguageElement{return this.getElement(10110)};
	/**强化*/
	get Text_Text_10049():ILanguageElement{return this.getElement(10111)};
	/**签到*/
	get Text_Text_10050():ILanguageElement{return this.getElement(10112)};
	/**任务*/
	get Text_Text_10051():ILanguageElement{return this.getElement(10113)};
	/**抱歉呀，已经领取过啦！*/
	get Text_Text_10052():ILanguageElement{return this.getElement(10114)};
	/**活跃度足够即可开启，不同宝箱有各式礼物赠送*/
	get Text_Text_10053():ILanguageElement{return this.getElement(10115)};
	/**你好！*/
	get Text_Text_10054():ILanguageElement{return this.getElement(10116)};
	/**哈喽，我们能交个朋友吗？*/
	get Text_Text_10055():ILanguageElement{return this.getElement(10117)};
	/**我们能一起玩吗？*/
	get Text_Text_10056():ILanguageElement{return this.getElement(10118)};
	/**我喜欢你！*/
	get Text_Text_10057():ILanguageElement{return this.getElement(10119)};
	/**我喜欢你的装扮！*/
	get Text_Text_10058():ILanguageElement{return this.getElement(10120)};
	/**哇偶 你看起来真好看！*/
	get Text_Text_10059():ILanguageElement{return this.getElement(10121)};
	/**你来自哪里啊？*/
	get Text_Text_10060():ILanguageElement{return this.getElement(10122)};
	/**对！没错！*/
	get Text_Text_10061():ILanguageElement{return this.getElement(10123)};
	/**你需要帮助吗？*/
	get Text_Text_10062():ILanguageElement{return this.getElement(10124)};
	/**你想跟我们一起玩游戏吗？*/
	get Text_Text_10063():ILanguageElement{return this.getElement(10125)};
	/**没错！就是那样！*/
	get Text_Text_10064():ILanguageElement{return this.getElement(10126)};
	/**我走了*/
	get Text_Text_10065():ILanguageElement{return this.getElement(10127)};
	/**下次再见~*/
	get Text_Text_10066():ILanguageElement{return this.getElement(10128)};
	/**宠物*/
	get Text_Text_30005():ILanguageElement{return this.getElement(10129)};
	/**已经被别人挖走啦*/
	get Text_Text_60007():ILanguageElement{return this.getElement(10130)};
	/**获得了一个雪球*/
	get Text_Text_60008():ILanguageElement{return this.getElement(10131)};
	/**篮球*/
	get Decoration_name_10001():ILanguageElement{return this.getElement(20001)};
	/**樱花狐*/
	get Decoration_name_10002():ILanguageElement{return this.getElement(20002)};
	/**小熊猫*/
	get Decoration_name_10003():ILanguageElement{return this.getElement(20003)};
	/**神秘宝箱*/
	get Decoration_name_10004():ILanguageElement{return this.getElement(20004)};
	/**吸血鬼之墓*/
	get Decoration_name_10005():ILanguageElement{return this.getElement(20005)};
	/**尖叫鸡*/
	get Decoration_name_20001():ILanguageElement{return this.getElement(20006)};
	/**圣诞礼物*/
	get Decoration_name_20002():ILanguageElement{return this.getElement(20007)};
	/**回旋镖*/
	get Decoration_name_20003():ILanguageElement{return this.getElement(20008)};
	/**暗夜之翼*/
	get Decoration_name_20004():ILanguageElement{return this.getElement(20009)};
	/**恶魔之翼*/
	get Decoration_name_20005():ILanguageElement{return this.getElement(20010)};
	/**雪花*/
	get Decoration_name_30001():ILanguageElement{return this.getElement(20011)};
	/**螺丝*/
	get Decoration_name_30002():ILanguageElement{return this.getElement(20012)};
	/**泡泡*/
	get Decoration_name_30003():ILanguageElement{return this.getElement(20013)};
	/**烟花*/
	get Decoration_name_30004():ILanguageElement{return this.getElement(20014)};
	/**流光精灵*/
	get Decoration_name_40001():ILanguageElement{return this.getElement(20015)};
	/**恶魔火焰*/
	get Decoration_name_40002():ILanguageElement{return this.getElement(20016)};
	/**可爱的*/
	get Decoration_name_50001():ILanguageElement{return this.getElement(20017)};
	/**喵喵叫的*/
	get Decoration_name_50002():ILanguageElement{return this.getElement(20018)};
	/**猫王*/
	get Decoration_name_50003():ILanguageElement{return this.getElement(20019)};
	/**跑酷高手*/
	get Decoration_name_50004():ILanguageElement{return this.getElement(20020)};
	/**小黑子必备*/
	get Decoration_detail_10001():ILanguageElement{return this.getElement(20021)};
	/**保护小宠物平平安安*/
	get Decoration_detail_10002():ILanguageElement{return this.getElement(20022)};
	/**光彩夺目的明星宠物*/
	get Decoration_detail_10003():ILanguageElement{return this.getElement(20023)};
	/**藏着什么样的宝物？*/
	get Decoration_detail_10004():ILanguageElement{return this.getElement(20024)};
	/**在半夜偷偷爬出来*/
	get Decoration_detail_10005():ILanguageElement{return this.getElement(20025)};
	/**小黑子必备*/
	get Decoration_detail_20001():ILanguageElement{return this.getElement(20026)};
	/**随时随地圣诞快乐*/
	get Decoration_detail_20002():ILanguageElement{return this.getElement(20027)};
	/**成为忍者大师*/
	get Decoration_detail_20003():ILanguageElement{return this.getElement(20028)};
	/**黑夜里最优雅的存在*/
	get Decoration_detail_20004():ILanguageElement{return this.getElement(20029)};
	/**恶魔化身特有的翅膀*/
	get Decoration_detail_20005():ILanguageElement{return this.getElement(20030)};
	/**唤醒冬日的记忆*/
	get Decoration_detail_30001():ILanguageElement{return this.getElement(20031)};
	/**伪装成机械宠物*/
	get Decoration_detail_30002():ILanguageElement{return this.getElement(20032)};
	/**唤醒夏日的记忆*/
	get Decoration_detail_30003():ILanguageElement{return this.getElement(20033)};
	/**向所有人展示你的热情*/
	get Decoration_detail_30004():ILanguageElement{return this.getElement(20034)};
	/**正在分析目标数据...*/
	get Decoration_detail_40001():ILanguageElement{return this.getElement(20035)};
	/**感觉血液在燃烧*/
	get Decoration_detail_40002():ILanguageElement{return this.getElement(20036)};
	/**可爱的*/
	get Decoration_title_50001():ILanguageElement{return this.getElement(20037)};
	/**喵喵叫的*/
	get Decoration_title_50002():ILanguageElement{return this.getElement(20038)};
	/**猫王*/
	get Decoration_title_50003():ILanguageElement{return this.getElement(20039)};
	/**，跑酷高手*/
	get Decoration_title_50004():ILanguageElement{return this.getElement(20040)};
	/**训练师神秘大礼*/
	get Lottery_name_1001():ILanguageElement{return this.getElement(40001)};
	/**奶牛猫*/
	get Pet_name_10001():ILanguageElement{return this.getElement(50001)};
	/**白猫*/
	get Pet_name_10002():ILanguageElement{return this.getElement(50002)};
	/**橘猫*/
	get Pet_name_10003():ILanguageElement{return this.getElement(50003)};
	/**公主猫*/
	get Pet_name_10004():ILanguageElement{return this.getElement(50004)};
	/**海盗王猫*/
	get Pet_name_10005():ILanguageElement{return this.getElement(50005)};
	/**波斯猫*/
	get Pet_name_10006():ILanguageElement{return this.getElement(50006)};
	/**沙滩猫*/
	get Pet_name_10007():ILanguageElement{return this.getElement(50007)};
	/**无毛猫*/
	get Pet_name_10008():ILanguageElement{return this.getElement(50008)};
	/**女巫猫*/
	get Pet_name_10009():ILanguageElement{return this.getElement(50009)};
	/**萝卜猫*/
	get Pet_name_10010():ILanguageElement{return this.getElement(50010)};
	/**恐怖南瓜猫*/
	get Pet_name_10011():ILanguageElement{return this.getElement(50011)};
	/**圣诞老人猫*/
	get Pet_name_10012():ILanguageElement{return this.getElement(50012)};
	/**大魔术师猫*/
	get Pet_name_10013():ILanguageElement{return this.getElement(50013)};
	/**地狱三头犬*/
	get Pet_name_10014():ILanguageElement{return this.getElement(50014)};
	/**中华熊猫*/
	get Pet_name_10015():ILanguageElement{return this.getElement(50015)};
	/**迷你猪*/
	get Pet_name_10016():ILanguageElement{return this.getElement(50016)};
	/**机灵顽皮的奶牛猫*/
	get Pet_detailContent_10001():ILanguageElement{return this.getElement(50017)};
	/**性格温顺的白猫*/
	get Pet_detailContent_10002():ILanguageElement{return this.getElement(50018)};
	/**可爱又贪吃的橘猫*/
	get Pet_detailContent_10003():ILanguageElement{return this.getElement(50019)};
	/**住在城堡里的公主猫*/
	get Pet_detailContent_10004():ILanguageElement{return this.getElement(50020)};
	/**拥有一艘舰船的海盗王猫*/
	get Pet_detailContent_10005():ILanguageElement{return this.getElement(50021)};
	/**眼睛像宝石的波斯猫*/
	get Pet_detailContent_10006():ILanguageElement{return this.getElement(50022)};
	/**享受度假生活的沙滩猫*/
	get Pet_detailContent_10007():ILanguageElement{return this.getElement(50023)};
	/**怪异又警惕的无毛猫*/
	get Pet_detailContent_10008():ILanguageElement{return this.getElement(50024)};
	/**会骑着扫帚飞行的女巫猫*/
	get Pet_detailContent_10009():ILanguageElement{return this.getElement(50025)};
	/**冬天也不怕冷的萝卜猫*/
	get Pet_detailContent_10010():ILanguageElement{return this.getElement(50026)};
	/**不给糖就捣蛋！*/
	get Pet_detailContent_10011():ILanguageElement{return this.getElement(50027)};
	/**乘坐驯鹿雪橇的圣诞老人猫*/
	get Pet_detailContent_10012():ILanguageElement{return this.getElement(50028)};
	/**神秘莫测的大魔术师猫*/
	get Pet_detailContent_10013():ILanguageElement{return this.getElement(50029)};
	/**看守地狱大门的三头犬*/
	get Pet_detailContent_10014():ILanguageElement{return this.getElement(50030)};
	/**喜欢吃竹子和睡懒觉的中华熊猫*/
	get Pet_detailContent_10015():ILanguageElement{return this.getElement(50031)};
	/**香喷喷的迷你猪*/
	get Pet_detailContent_10016():ILanguageElement{return this.getElement(50032)};
	/**彩虹独角马*/
	get Pet_name_10030():ILanguageElement{return this.getElement(50033)};
	/**萌宠训练师基地的小主人*/
	get Pet_detailContent_10030():ILanguageElement{return this.getElement(50034)};
	/**有朝夕与四季*/
	get AIName_Name_1():ILanguageElement{return this.getElement(60001)};
	/**梨花落心扉*/
	get AIName_Name_2():ILanguageElement{return this.getElement(60002)};
	/**夏青*/
	get AIName_Name_3():ILanguageElement{return this.getElement(60003)};
	/**笨比熊*/
	get AIName_Name_4():ILanguageElement{return this.getElement(60004)};
	/**喵叽*/
	get AIName_Name_5():ILanguageElement{return this.getElement(60005)};
	/**即使孤独依旧前行*/
	get AIName_Name_6():ILanguageElement{return this.getElement(60006)};
	/**理想的翅膀*/
	get AIName_Name_7():ILanguageElement{return this.getElement(60007)};
	/**花漓*/
	get AIName_Name_8():ILanguageElement{return this.getElement(60008)};
	/**会挖宝的小仙女*/
	get AIName_Name_9():ILanguageElement{return this.getElement(60009)};
	/**冉七*/
	get AIName_Name_10():ILanguageElement{return this.getElement(60010)};
	/**此账号已停用*/
	get AIName_Name_11():ILanguageElement{return this.getElement(60011)};
	/**不解风情的老妖怪*/
	get AIName_Name_12():ILanguageElement{return this.getElement(60012)};
	/**华元*/
	get AIName_Name_13():ILanguageElement{return this.getElement(60013)};
	/**千杯风月醉*/
	get AIName_Name_14():ILanguageElement{return this.getElement(60014)};
	/**梦菡*/
	get AIName_Name_15():ILanguageElement{return this.getElement(60015)};
	/**浮笙*/
	get AIName_Name_16():ILanguageElement{return this.getElement(60016)};
	/**冲刺加速度*/
	get PetUpgrades_name_10001():ILanguageElement{return this.getElement(70001)};
	/**冲刺持续时间*/
	get PetUpgrades_name_10002():ILanguageElement{return this.getElement(70002)};
	/**移动最大速度*/
	get PetUpgrades_name_10003():ILanguageElement{return this.getElement(70003)};
	/**冲刺最大速度*/
	get PetUpgrades_name_10004():ILanguageElement{return this.getElement(70004)};
	/**移动加速度*/
	get PetUpgrades_name_10005():ILanguageElement{return this.getElement(70005)};
	/**冲刺冷却时间*/
	get PetUpgrades_name_10006():ILanguageElement{return this.getElement(70006)};
	/**冲刺的加速度增加{0}*/
	get PetUpgrades_detail_10001():ILanguageElement{return this.getElement(70007)};
	/**冲刺的持续时间增加{0}*/
	get PetUpgrades_detail_10002():ILanguageElement{return this.getElement(70008)};
	/**移动的最大速度增加{0}*/
	get PetUpgrades_detail_10003():ILanguageElement{return this.getElement(70009)};
	/**冲刺的最大速度增加{0}*/
	get PetUpgrades_detail_10004():ILanguageElement{return this.getElement(70010)};
	/**移动的加速度增加{0}*/
	get PetUpgrades_detail_10005():ILanguageElement{return this.getElement(70011)};
	/**冲刺的冷却时间降低{0}*/
	get PetUpgrades_detail_10006():ILanguageElement{return this.getElement(70012)};
	/**冲击波*/
	get ToolStat_name_10001():ILanguageElement{return this.getElement(90001)};
	/**泡泡枪*/
	get ToolStat_name_10002():ILanguageElement{return this.getElement(90002)};
	/**加速饮料*/
	get ToolStat_name_10003():ILanguageElement{return this.getElement(90003)};
	/**传送方块*/
	get ToolStat_name_10004():ILanguageElement{return this.getElement(90004)};
	/**章鱼*/
	get ToolStat_name_10005():ILanguageElement{return this.getElement(90005)};
	/**雪球*/
	get ToolStat_name_10006():ILanguageElement{return this.getElement(90006)};
	/**炸弹*/
	get ToolStat_name_10007():ILanguageElement{return this.getElement(90007)};
	/**火箭*/
	get ToolStat_name_10008():ILanguageElement{return this.getElement(90008)};
	/**丢弹板*/
	get ToolStat_name_10009():ILanguageElement{return this.getElement(90009)};
	/**确认覆盖*/
	get Language_Name_100001():ILanguageElement{return this.getElement(100001)};
	/**驯服进度*/
	get Language_Name_100002():ILanguageElement{return this.getElement(100002)};
	/**已转化*/
	get Language_Name_100003():ILanguageElement{return this.getElement(100003)};
	/**是否接受其他玩家的邀请*/
	get Language_Name_100004():ILanguageElement{return this.getElement(100004)};
	/**邀请*/
	get Language_Name_100005():ILanguageElement{return this.getElement(100005)};
	/**离开*/
	get Language_Name_100006():ILanguageElement{return this.getElement(100006)};
	/**队长*/
	get Language_Name_100007():ILanguageElement{return this.getElement(100007)};
	/**开始匹配*/
	get Language_Name_100008():ILanguageElement{return this.getElement(100008)};
	/**取消匹配*/
	get Language_Name_100009():ILanguageElement{return this.getElement(100009)};
	/**队伍*/
	get Language_Name_100010():ILanguageElement{return this.getElement(100010)};
	/**取消换装*/
	get Language_Name_100011():ILanguageElement{return this.getElement(100011)};
	/**显示详情*/
	get Language_Name_100012():ILanguageElement{return this.getElement(100012)};
	/**价格：每抽160*/
	get Language_Name_100013():ILanguageElement{return this.getElement(100013)};
	/**欢迎来到萌宠派对*/
	get Language_Name_100014():ILanguageElement{return this.getElement(100014)};
	/**点击跳跃*/
	get Language_Name_100015():ILanguageElement{return this.getElement(100015)};
	/**点击飞扑*/
	get Language_Name_100016():ILanguageElement{return this.getElement(100016)};
	/**点击冲刺*/
	get Language_Name_100017():ILanguageElement{return this.getElement(100017)};
	/**我明白了*/
	get Language_Name_100018():ILanguageElement{return this.getElement(100018)};
	/**获得冠军*/
	get Language_Name_100019():ILanguageElement{return this.getElement(100019)};
	/**s后自动退出*/
	get Language_Name_100020():ILanguageElement{return this.getElement(100020)};
	/**点击继续*/
	get Language_Name_100021():ILanguageElement{return this.getElement(100021)};
	/**获得冠军*/
	get Language_Name_100022():ILanguageElement{return this.getElement(100022)};
	/**下一关是...*/
	get Language_Name_100023():ILanguageElement{return this.getElement(100023)};
	/**距离游戏开始还有：*/
	get Language_Name_100024():ILanguageElement{return this.getElement(100024)};
	/**争冠军*/
	get Language_Name_100025():ILanguageElement{return this.getElement(100025)};
	/**已晋级*/
	get Language_Name_100026():ILanguageElement{return this.getElement(100026)};
	/**匹配成功*/
	get Language_Name_100027():ILanguageElement{return this.getElement(100027)};
	/**匹配中*/
	get Language_Name_100028():ILanguageElement{return this.getElement(100028)};

}