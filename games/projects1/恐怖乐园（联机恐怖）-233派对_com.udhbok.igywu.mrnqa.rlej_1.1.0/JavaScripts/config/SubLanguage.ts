import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","Value","Value_CN","Value_JP"],["","Key|ReadByName","","MainLanguage","ChildLanguage","ChildLanguage"],[1,"seriesOfWorks_01",null,"Horror Park Series","恐怖乐园系列作品",null],[2,"Brand_1",null,"Please input the display content","请输入展示内容",null],[3,"UI_Dialog_1",null,"Confirm","确定",null],[4,"UI_Dialog_2",null,"Cancel","取消",null],[5,"UI_Dialog_11",null,"The input content contains illegal words; please re-enter","输入内容包含敏感词，请重新输入",null],[6,"camera_01",null,"No ghosts were captured","没有拍到任何鬼怪",null],[7,"camera_02",null,"Captured <color=#00ff00ff>{0}</color>, image recorded has been unlocked","拍到<color=#00ff00ff>{0}</color>，图录已解锁",null],[8,"back_03",null,"Return to lobby","返回大厅",null],[9,"go_01",null,"Do you want to go to {0}'s world?","是否前往{0}的世界",null],[10,"ReturnHall_01",null,"Do you want to return to the lobby?","是否返回大厅？",null],[11,"ReturnHall_02",null,"Yes","是",null],[12,"ReturnHall_03",null,"No","否",null],[13,"BackToHall_01",null,"Return to lobby","返回大厅",null],[14,"ghostLock_01",null,"Locked","待解锁",null],[15,"ghostName_01","鬼怪图录，鬼名字","Shadow","影人",null],[16,"ghostUnlock_01","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Haunt Isle\nBlood Moon Minion \nAnother \"Me\"","惊魂岛\n血月爪牙\n另一个\"我\"",null],[17,"ghostType_01","鬼怪图录，鬼类别","Dark Creatures","黑暗的牲灵",null],[18,"ghostWeek_01","鬼怪图录，鬼弱点",null,"极度讨厌碍事的建筑",null],[19,"ghostBack_01","鬼怪图录，鬼相关背景介绍","Background: I know everything about you... your existence, your fears... Why should I only be your shadow? Replace me, or be destroyed!","背景: 我了解你的一切...\n你的存在、你的恐惧...\n凭什么我只能成为你的影子？\n取代我，或者消灭你！",null],[20,"ghostName_02",null,"Nurse Pamni","护士帕姆尼",null],[21,"ghostUnlock_02",null,"Asylum \nWandering \nEverywhere","疯人院\n四处游荡\n随处可见",null],[22,"ghostType_02",null,"Red Moon Creature","红月生物",null],[23,"ghostWeek_02",null,"Seemingly unable to enter certain doors","似乎进不去一些门",null],[24,"ghostBack_02",null,"Background: Originally pure and kind creatures, they gradually lost themselves under the prolonged influence of the Red Moon. Even so, there is still a chance of salvation.","背景: 原本是纯洁善良的生物\n在红月的长时间浸染下，逐渐失去了自我\n即便如此，也仍有被拯救的可能",null],[25,"ghostName_03","鬼怪图录，鬼名字","Pamni","帕姆尼",null],[26,"ghostName_04","鬼怪图录，鬼名字","Crawling Pamni","阴暗爬行帕姆尼",null],[27,"ghostName_05","鬼怪图录，鬼名字","Shy Pamni","羞羞帕姆尼",null],[28,"ghostName_06","鬼怪图录，鬼名字","Flashing Pamni","闪灵帕姆尼",null],[29,"ghostUnlock_03","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nDigital Circus \nSuperstar","恐怖鬼校\n数字马戏团\n超级明星",null],[30,"ghostUnlock_04","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nUnable to Stand and Walk \nDark and Damp Places","恐怖鬼校\n无法站立行走\n阴暗潮湿的地方",null],[31,"ghostUnlock_05","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nShy Twisted Personality \nHiding with Dummies","恐怖鬼校\n害羞扭曲的性格\n和假人躲在一起",null],[32,"ghostUnlock_06","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nFlashing\nOnly Appears on the Second Floor","恐怖鬼校\n一闪一闪\n只会在二楼出现",null],[33,"ghostType_03","鬼怪图录，鬼类别","Ordinary Undead","普通亡灵",null],[34,"ghostType_04","鬼怪图录，鬼类别","Animal Undead","动物亡灵",null],[35,"ghostType_05","鬼怪图录，鬼类别","Shy Undead","羞羞亡灵",null],[36,"ghostType_06","鬼怪图录，鬼类别","Flashing Undead","闪烁亡灵",null],[37,"ghostWeek_03","鬼怪图录，鬼弱点","Fear of Magic Circles","惧怕法阵",null],[38,"ghostWeek_04","鬼怪图录，鬼弱点","Extremely hungry, craving food","十分饥饿，渴望食物",null],[39,"ghostWeek_05","鬼怪图录，鬼弱点","Weakness: Staring at it is like magic; paralysis ensues","对于他注视就像魔法，盯住就被麻痹了似的",null],[40,"ghostWeek_06","鬼怪图录，鬼弱点","Weakness: Confined to a fixed area","被禁锢在固定区域",null],[41,"ghostBack_03","鬼怪图录，鬼相关背景介绍","Background: Pamni, who came from the Digital Circus and was controlled by the school's spirits, replicated Pamni's appearance, continuing to roam the school...","背景: 从数字马戏团穿越而来的帕姆尼，被学校怨灵所控制，怨灵复制了帕姆尼的外形，继续在学校中游荡……",null],[42,"ghostBack_04","鬼怪图录，鬼相关背景介绍","Background: Jack, the principal's beloved dog in the underground tunnels, fell victim to the Blood Moon's appearance, forcing the principal to take drastic measures. Jack, too, didn't survive and continues to use Pamni's body, seeking food in the sewers...","背景: 地下道中本是校长养着的爱犬——杰克，血月的出现迫使校长对它下了狠手，杰克也没能幸免，继续使用帕姆尼的身躯，在下水道寻找食物……",null],[43,"ghostBack_05","鬼怪图录，鬼相关背景介绍","Background: There was a girl who used to spend afternoons in the chemistry classroom. She was shy and met her end here, harmed by students using chemicals. Her spirit was sealed in this classroom...","背景: 以前，学校的化学教室中总有一个小女孩做实验到放学，她生性胆小害羞，最后却在这里被坏学生用化学药品伤害而亡，她的亡灵就被封印在了这间教室里……",null],[44,"ghostBack_06","鬼怪图录，鬼相关背景介绍","Background: The principal's office at school is strictly off-limits to students. They have never seen the principal enter the office directly. One day, a curious student followed the principal's route to the office but did not come out.","背景: 校长办公室是学校的禁地，学生从来没见过校长直接进入到办公室里。有一天，一个好奇的学生跟着校长的路线进入了办公室，他却再也没有出来过……",null],[45,"ghostName_07",null,"Anna","安娜",null],[46,"ghostName_08",null,"Frank","弗兰克",null],[47,"ghostName_09",null,"Tic","蒂奇",null],[48,"ghostName_10",null,"Alice","爱丽丝",null],[49,"ghostName_11",null,"Jack","杰克",null],[50,"ghostName_12",null,"Kelly","凯莉",null],[51,"ghostUnlock_07",null,"Zombie Ville \nShop \nRiverside","丧尸小镇\n商店\n河边",null],[52,"ghostUnlock_08",null,"Zombie Ville\nWandering Everywhere \nMain Road","丧尸小镇\n四处游荡\n必经之路",null],[53,"ghostUnlock_09",null,"Zombie Ville\nScythe \nAlways in the House","丧尸小镇\n镰刀\n总在屋子里",null],[54,"ghostUnlock_10",null,"Zombie Ville\nStaring at the Crossroads \nRed Pigtails","丧尸小镇\n岔路口发呆\n红发双马尾",null],[55,"ghostUnlock_11",null,"Zombie Ville\nPlump \nGiant Knife","丧尸小镇\n胖胖的\n巨大的刀",null],[56,"ghostUnlock_12",null,"Zombie Ville\nLoitering Near Home \nWhite Pigtails","丧尸小镇\n家附近闲逛\n白发双马尾",null],[57,"ghostType_07",null,"Normal Zombie","普通丧尸",null],[58,"ghostType_08",null,"Normal Zombie","普通丧尸",null],[59,"ghostType_09",null,"Special Zombie","特殊丧尸",null],[60,"ghostType_10",null,"Child Zombie","小孩丧尸",null],[61,"ghostType_11",null,"Special Zombie","特殊丧尸",null],[62,"ghostType_12",null,"Child Zombie","小孩丧尸\n",null],[63,"ghostWeek_07",null,"Easily stunned","十分容易被击晕",null],[64,"ghostWeek_08",null,"Easily stunned","十分容易被击晕",null],[65,"ghostWeek_09",null,"Long stun duration","击晕后晕倒时间长",null],[66,"ghostWeek_10",null,"Small movement area","行动区域小",null],[67,"ghostWeek_11",null,"Slow movement","行动缓慢",null],[68,"ghostWeek_12",null,"No attacking ability","不会攻击",null],[69,"ghostBack_07",null,"Background: Anna had always been troubled by the repetitive and joyless life in her town, but everything changed with the appearance of the Blood Moon, as she became the first affected person.","背景: 小镇的生活是重复的，毫无乐趣的，安娜一直为这无聊的生活而烦恼，她想改变。直到红月的出现，她成为了第一个被影响的人",null],[70,"ghostBack_08",null,"Background: Frank appears serious and reserved, rarely smiling or seeming youthful. He has a distinctly old-fashioned air, but he harbors his own private world.","背景: 弗兰克是个不苟言笑的人，在别人看来完全不像个年轻人，显得十分古板，但只有他自己知道，他有着自己的世界",null],[71,"ghostBack_09",null,"Background: He once wanted to be a pirate and put a scythe on his left hand, but his mother opposed. So, he became an expert in cutting wheat with his scythe and gained fame in the town.","背景: 曾经想当海盗，于是给左手装上镰刀，但受到母亲的反对，被母亲狠狠教育后，只能选择选择留在了小镇里，利用镰刀左手成为了小镇里有名的割麦子高手",null],[72,"ghostBack_10",null,"Background: Alice, once the naughtiest kid in town, grew silent and violent after being influenced by the Blood Moon. She now stays at the crossroads all day.","背景: 爱丽丝是小镇里最顽皮的小孩，每天在小镇里上窜下跳，但红月影响后，她变得沉默，整天呆在路口发呆，但脾气变得暴躁，攻击性极强",null],[73,"ghostBack_11",null,"Background: The town has only one butcher, who may look intimidating, but he is actually a very kind person. When the Blood Moon appeared, he was the first to step forward and use his huge knife to protect those who had not yet been affected by the moonlight.","背景: 小镇里唯一的屠夫，虽然长得很吓人但实际上是个热心肠。红月之后，他第一个站出来，用他巨大的刀守护还未受红月光芒影响的人",null],[74,"ghostBack_12",null,"Background: Kelly was the only person in town who was not affected by the Blood Moon. Before Jack was affected, he tried to protect her by locking her in a dark room. However, his efforts were in vain, and Kelly remained the only person in town who did not turn violent.","背景: 凯莉是小镇里最后一个被红月影响的人。杰克被影响前，用最后的理智将她锁在了见不到光的房间，终究无济于事，但她成为了小镇里唯一不会攻击的人",null],[75,"bag_01",null,"Not the same breed of item, move failed!","不是同一个品种的道具，移动失败！",null],[76,"bag_02",null,"Items","道具",null],[77,"bag_03",null,"Special","特殊",null],[78,"bag_04",null,"Use","使用",null],[79,"bag_05",null,"Move","移动",null],[80,"bag_06",null,"Details","详细信息",null],[81,"bag_07",null,"Use","使用",null],[82,"bag_08",null,"Max","最大",null],[83,"bag_09",null,"Cancel","取消",null],[84,"bag_10",null,"Confirm","确定",null],[85,"bag_11",null,"Successfully Used","使用成功",null],[86,"bag_12",null,"Already at Maximum Quantity","已经是最大数量",null],[87,"bag_13",null,"Too Much Potion!","所用药量过猛！",null],[100,"shop_01",null,"Mysterious Shop","神秘人商店",null],[101,"shop_02",null,"Purchase","购买",null],[102,"shop_03",null,"I Want It","我想要",null],[103,"sort_01",null,"Default Sort","默认排序",null],[104,"sort_02",null,"Price ↑","价格 ↑",null],[105,"sort_03",null,"Price ↓","价格 ↓",null],[106,"sort_04",null,"Time Added ↑","上架时间 ↑",null],[107,"sort_05",null,"Time Added ↓","上架时间 ↓",null],[108,"sort_06",null,"Sort","排序",null],[109,"shoptips_01",null,"Tip","提示",null],[110,"shoptips_02",null,"Cancel","取消",null],[111,"shoptips_03",null,"Confirm","确定",null],[112,"shoptips_04",null,"Confirm using {0} Fear Coins to buy {1} {2}?","确认使用{0}恐惧币购买{1}个{2}吗？",null],[113,"shoptips_05",null,"Not Enough Fear Coins. Do you want to buy Fear Coins? Confirm","恐惧币不足，可前往购买恐惧币，确认前往",null],[114,"shoptips_06",null,"Not enough tries left. Try again tomorrow!","剩余次数不足，明天再来试试吧~",null],[115,"shop_04",null,"congratulations！","恭喜获得",null],[116,"shop_05",null,"Confirm","确定",null],[117,"shop_06",null,"Purchase","购买",null],[118,"shop_07",null,"Maximum","最大",null],[119,"shop_08",null,"Limited to: {0}","限购：{0}",null],[120,"shop_09",null,"Gift Package includes","礼包内容",null],[121,"shop_10",null,"Click the \"I Want It\" button for surprises! There might even be a chance to get this item directly!","点击【我想要】按钮，将有惊喜发生噢~甚至有概率直接获得该道具！",null],[122,"shop_11",null,"All Tools","所有道具",null],[123,"shop_12",null,"BUFF","BUFF",null],[124,"shop_13",null,"Consumables","消耗品",null],[125,"shop_14",null,"Interactive Tools","互动道具",null],[126,"shop_15",null,"Gift Packs","礼包",null],[127,"shop_16",null,"Congratulations! You've earned Fear Coins!","恭喜你！成功获得了恐惧币！",null],[128,"shop_17",null,"Don't remind me next login","本次登录不再提示",null],[129,"shop_18",null,"Shop","商店",null],[130,"ghostName_13",null,"Doom","杜姆",null],[131,"ghostName_14",null,"Vivian","薇薇安",null],[132,"ghostType_13",null,"Special Zombie","特殊丧尸",null],[133,"ghostType_14",null,"Special Zombie","特殊丧尸",null],[134,"ghostWeek_13",null,"Can't move during self-destruct.","自爆期间无法移动",null],[135,"ghostWeek_14",null,"Use Detox Potion to prevent poisoning.","解毒药可以防止中毒",null],[136,"ghostUnlock_13",null,"Zombie Ville \nCrossroads\nRed All Over","丧尸小镇\n十字路口\n浑身通红",null],[137,"ghostUnlock_14",null,"Zombie Ville\nNear Villa\nA Purple-Robed","丧尸小镇\n别墅附近\n身着紫色长袍",null],[138,"ghostBack_13",null,"Background: No One Knows Where Doom Came From. When He First Appeared in Town, He Looked Dangerous All Over, With No Part of Him Unmodified","背景：没有人知道杜姆从何而来，他第一次出现在小镇上时，已经是一副危险的模样了，全身上下没有一处是未经改造的",null],[139,"ghostBack_14",null,"Background: There's a mysterious witch in town. Rumor has it she pops up unexpectedly, using magic to tell fortunes and heal the townsfolk, but she can also cause harm when she wants to.","背景：小镇里有一位神秘的女巫，传言里她总是会突然出现，操纵巫术为小镇居民占卜与治疗，但同时她也可以随心所欲地施加伤害",null],[150,"money_01",null,"Fear Coins","恐惧币",null],[151,"money_02",null,"G-coins","派对币",null],[1001,"RouteTeam_01",null,"Team Jump ({0}/{1})","组队跳转({0}/{1})",null],[1002,"RouteTeam_02",null,"Proceed in {0} seconds","{0}秒后跳转",null],[2000,"Currency_01",null,"Received {0} Fear Coins","获得了{0}恐惧币",null],[3000,"ReItem_01",null,"Use {0} to continue the game?","使用 {0} 继续游戏？",null],[3001,"relife_success",null,"Resurrection Successful","复活成功",null],[3002,"buy_nomoney",null,"Not enough Fear Coins to purchase","恐惧币不足，无法购买",null],[3003,"UI_Item_UseLimit",null,"This tool cannot be used in the current game","当前游戏内无法使用该道具",null],[10000,"UI_item_10000",null,"Angel's Blessing","天使庇护",null],[10001,"UI_item_10001",null,"Potion S","小血瓶",null],[10002,"UI_item_10002",null,"Potion M","中血瓶",null],[10003,"UI_item_10003",null,"Potion L","大血瓶",null],[10004,"UI_item_10004",null,"Vitality Pill","活力丹",null],[10005,"UI_item_10005",null,"2xEXP Card","单局双倍经验卡",null],[10006,"UI_item_10006",null,"1D 2xEXP Card","一天双倍经验卡",null],[10007,"UI_item_10007",null,"3D 2xEXP Card","三天双倍经验卡",null],[10008,"UI_item_10008",null,"7D 2x EXP Card","七天双倍经验卡",null],[10009,"UI_item_10009",null,"1D 3x EXP Card","一天三倍经验卡",null],[10010,"UI_item_10010",null,"S Gift Pack","小礼包",null],[10011,"UI_item_10011",null,"M Gift Pack","中礼包",null],[10012,"UI_item_10012",null,"L Gift Pack","大礼包",null],[10013,"UI_item_10013",null,"Inspiration Bulb","灵感灯泡",null],[10014,"UI_item_10014",null,"Cupid Effect","丘比特效",null],[10015,"UI_item_10015",null,"Snowball","雪球",null],[10016,"UI_item_10016",null,"Slap Effect","巴掌特效",null],[10017,"UI_item_10017",null,"Chicken Effect","鸡腿特效",null],[10018,"UI_item_10018",null,"Cheer Effect","欢呼特效",null],[10019,"UI_item_10019",null,"Revive S Gift Pack","复苏小礼包",null],[10020,"UI_item_10020",null,"Revive L Gift Pack","复苏大礼包",null],[10101,"packbuy_01",null,"Exchange for {0}?","是否兑换{0}",null],[10102,"packbuy_02",null,"Open {0} Gift Pack","开启{0}礼包",null],[10103,"quality_01",null,"Common","普通",null],[10104,"quality_02",null,"Rare","罕见",null],[10105,"quality_03",null,"SR","稀有",null],[10106,"quality_04",null,"Epic","史诗",null],[10107,"quality_05",null,"Legendary","传奇",null],[10200,"UI_item_10200",null,"Fear Coins","恐惧币",null],[10201,"UI_item_10201",null,null,"经验值",null],[10202,"UI_item_10202",null,null,"鬼魅值",null],[10203,"UI_item_10203",null,null,"活跃值",null],[10300,"UI_des_00",null,"Contains the protective power of angels. Can consume 1 Angel's Blessing to resurrect directly upon death, and your data will be retained.","蕴含着天使气息的庇护力量，死亡时可以消耗1个天使庇护直接复活，并且存档数据会保留",null],[10301,"UI_des_01",null,"Special medicine, \na portable healing potion. Use to restore 20 HP.","特殊药品，可随身携带的补血剂，使用可回复20血量",null],[10302,"UI_des_02",null,"Special medicine, \na portable healing potion. Use to restore 40 HP.","特殊药品，可随身携带的补血剂，使用可回复40血量",null],[10303,"UI_des_03",null,"Special medicine, \na portable healing potion. Use to restore 70 HP.","特殊药品，可随身携带的补血剂，使用可回复70血量",null],[10304,"UI_des_04",null,"Special medicine, \na portable healing potion. Use to restore 100 HP.","特殊药品，可随身携带的补血剂，使用可回复 100 血量",null],[10305,"UI_des_05",null,"After use, complete a game to receive double experience.","使用后完成一局游戏，即可 双倍 经验加成",null],[10306,"UI_des_06",null,"After use, each game completed within a day will have double experience.","使用后一天内每完成一局游戏均有 双倍 经验加成",null],[10307,"UI_des_07",null,"After use, each game completed within three days will have double experience.","使用后三天内每完成一局游戏均有 双倍 经验加成",null],[10308,"UI_des_08",null,"After use, each game completed within seven days will have double experience.","使用后七天内每完成一局游戏均有 双倍 经验加成",null],[10309,"UI_des_09",null,"After use, each game completed within a day will have triple experience.","使用后一天内每完成一局游戏均有 三倍 经验加成",null],[10310,"UI_des_10",null,"Open to get one of the following prizes: Angel's Blessing, Small Potion, Snowball Effect, Slap Effect, 15 Fear Coins, 5 Fear Coins.","打开概率获得以下奖品之一：天使庇佑、小血瓶、雪球特效、巴掌特效、15恐惧币、5恐惧币",null],[10311,"UI_des_11",null,"Open to get one of the following prizes: Angel's Blessing, Double Experience Card for One Day, Double Experience Card for Three Days, Medium Potion, Chicken Leg Effect, Cheer Effect, 25 Fear Coins, 5 Fear Coins.","打开概率获得以下奖品之一：天使庇佑、一天双倍经验卡、三天双倍经验卡、中血瓶、鸡腿特效、欢呼特效、25恐惧币、5恐惧币",null],[10312,"UI_des_12",null,"Open to get one of the following prizes: Angel's Blessing, Triple Experience Card for One Day, Double Experience Card for Three Days, Double Experience Card for Seven Days, Large Potion, Vitality Pill, Cupid Effect, Inspiration Bulb, 50 Fear Coins, 25 Fear Coins, 10 Fear Coins.","打开概率获得以下奖品之一：天使庇佑、一天三倍经验卡、三天双倍经验卡、七天双倍经验卡、大血瓶、活力丹、丘比特效、灵感灯泡、50恐惧币、25恐惧币、10恐惧币",null],[10313,"UI_des_13",null,"Bulb with lots of inspiration. \nCan consume bulbs to gain puzzle inspiration when decrypting.","蕴含非常多灵感的灯泡，在解密时可以通过消耗灯泡获得谜题的灵感",null],[10314,"UI_des_14",null,"After use, you can have special interactions with other players.","使用后可以和其他玩家产生特殊互动效果",null],[10315,"UI_des_15",null,"After use, you can have special interactions with other players.","使用后可以和其他玩家产生特殊互动效果",null],[10316,"UI_des_16",null,"After use, you can have special interactions with other players.","使用后可以和其他玩家产生特殊互动效果",null],[10317,"UI_des_17",null,"After use, you can have special interactions with other players.","使用后可以和其他玩家产生特殊互动效果",null],[10318,"UI_des_18",null,"After use, you can have special interactions with other players.","使用后可以和其他玩家产生特殊互动效果",null],[10319,"UI_des_19",null,"Receive 6 Angel's Blessings after use.","使用后可以获得天使庇佑*6",null],[10320,"UI_des_20",null,"Receive 12 Angel's Blessings after use.","使用后可以获得天使庇佑*12",null],[10400,"Ending_hospital_Title1",null,"Ending A - Endless Threat","A结局 无尽的威胁",null],[10401,"Ending_hospital_Title2",null,"Ending X - Glorious Hymn","X结局 光辉颂歌",null],[10402,"Ending_hospital_Title3",null,"Ending S - Guiding Force","S结局 指引的力量",null],[10403,"Ending_hospital_Title4",null,"Ending T - Embrace The Darkness","T结局 投身黑暗",null],[10404,"Ending_school_Title1",null,"Ending 2: Echoes of Despair","结局二 绝望的回响",null],[10405,"Ending_school_Title2",null,"Ending 1: Nightmare Beyond","结局一 噩梦的彼岸",null],[10406,"Ending_school_Title3",null,"End 3: Holy Redemption","结局三 圣洁的救赎",null],[10407,"Ending_Town_Title1",null,"Ending Two: Escape from the Abyss","结局二 逃出深渊",null],[10408,"Ending_Town_Title2",null,"Ending One: Extinguished Light","结局一 光芒熄灭",null],[10409,"Ending_Town_Title3",null,"Ending Three: Lifting the Curse","结局三 解除诅咒",null],[10410,"Ending_Town_Title4",null,"Ending Four: Hidden Secrets","结局四 深藏的秘密",null],[10500,"UI_des_200",null,"Obtain by by picking up in the scene or playing games.","可以通过场景拾取、游玩游戏等方式获得",null],[11011,"UI_item_11011",null,"Lollipop","棒棒糖",null],[11012,"UI_item_11012",null,"Plane","飞机",null],[11013,"UI_item_11013",null,"Bomb","炸弹",null],[11014,"UI_item_11014",null,"Pumpkin","南瓜",null],[11015,"UI_item_11015",null,"Race Car","跑车",null],[11016,"UI_item_11016",null,"Lipstick","口红",null],[11017,"UI_item_11017",null,"Balloon","气球",null],[11020,"UI_diffi_3",null,"Team","简单",null],[11021,"UI_diffi_4",null,"Normal","普通",null],[11022,"UI_diffi_5",null,"Hard","困难",null],[11023,"UI_diffi_6",null,"Nightmare","噩梦",null],[11024,"UI_diffi_7",null,"Hell","地狱",null],[11025,"Team_UI",null,"Team up","组队",null],[12004,"UI_EXPtips",null,"{0} EXP until next level.\nGain EXP by playing or over time.","距离下一级还有{0}经验\n经验值可以通过时间缓慢增加，也可以通关游戏获得大量的经验",null],[12005,"UI_item_1200",null,"Wooden Board","木板",null],[12006,"UI_addfriends",null,"Add Friend","添加好友",null],[12007,"UI_PopularExp",null,"{0} MP until next level.\nEarn mischief points by liking and receiving gifts.","距离下一级还需要{0}鬼魅值\n鬼魅值可以通过点赞和收获礼物获得",null],[12008,"UI_Sign",null,"Bio (30 characters)","请在此输入您的个性签名（30字）",null],[12009,"UI_des_999",null,"A camera that captures ghostly spirits.","具有灵性的照相机，可以拍到鬼怪的种类",null],[13000,"UI_item_20001",null,"1k Fear Coins","1000恐惧币",null],[13001,"UI_item_20002",null,"6k Fear Coins","6000恐惧币",null],[13002,"UI_item_20003",null,"10k Fear Coins","10000恐惧币",null],[13003,"UI_item_20004",null,"18k Fear Coins","18000恐惧币",null],[13004,"UI_item_20005",null,"30k Fear Coins","30000恐惧币",null],[13005,"UI_item_20006",null,"48k Fear Coins","48000恐惧币",null],[13006,"UI_item_20007",null,"64k Fear Coins","64000恐惧币",null],[13007,"UI_item_10021",null,"Daily Limited Pack","每日限定礼包",null],[13008,"UI_item_10022",null,"Weekly Limited Pack","每周限定礼包",null],[13009,"UI_item_10023",null,"Monthly Limited Pack","每月限定礼包",null],[13010,"UI_item_10024",null,"Pink Sweetheart Pack","粉色甜心礼包",null],[13011,"UI_des_10021",null,"Open to get: 100, 300, or 1k Fear Coins.","打开后从概率获得：100、300、1000恐惧币。中的其中一个奖励",null],[13012,"UI_des_10022",null,"Open for 200 Fear Coins and an item.","打开后必定获得200恐惧币和一件额外的物品",null],[13013,"UI_des_10023",null,"Open for 1k Fear Coins and an item.","打开后必定获得1000恐惧币和一件额外的物品",null],[13014,"UI_des_10024",null,"Chance to get a Cake Sweetheart reward.","打开后有概率获得蛋糕甜心奖励",null],[13015,"UI_text_tequandescMonthly",null,"Activate for {0}. Receive {1} daily.","激活立即获得 {0}\n每日领取 {1}",null],[13100,"buff_01",null,"Poisoned","中毒",null],[13101,"buff_02",null,"Immune to Poison","毒性免疫",null],[13102,"buff_03",null,"Bleeding","流血",null],[16001,"UI_item_21001",null,null,"尖叫鸡",null],[16002,"UI_item_21002",null,null,"尖叫鸡，伪人似乎异常害怕尖叫",null],[16003,"UI_des_21001",null,null,"清除伪人专用物品",null],[16004,"UI_item_21003",null,null,"黄金尖叫鸡雕像",null],[16005,"UI_item_21004",null,null,"伪人清理大师荣耀的象征（限定活动奖励）",null],[16006,"UI_des_21002",null,null,"伪人清理大师荣耀的象征（限定活动奖励）",null],[20000,"UI_checkIn_01",null,null,"第1天",null],[20001,"UI_checkIn_02",null,null,"第2天",null],[20002,"UI_checkIn_03",null,null,"第3天",null],[20003,"UI_checkIn_04",null,null,"第4天",null],[20004,"UI_checkIn_05",null,null,"第5天",null],[20005,"UI_checkIn_06",null,null,"第6天",null],[20006,"UI_checkIn_07",null,null,"第7天",null],[20007,"UI_checkIn_08",null,null,"日签到",null],[20008,"UI_checkIn_09",null,null,"送好礼！",null],[20009,"UI_checkIn_10",null,null,"每日登录均能领取奖励，签到7天领取宝箱！",null],[20010,"UI_checkIn_11",null,null,"领取",null],[20011,"UI_checkIn_12",null,null,"待签到",null],[20012,"UI_checkIn_13",null,null,"已领取",null],[20013,"UI_checkIn_14",null,null,"未到签到时间，无法领取奖励哦~",null],[20014,"UI_item_51004",null,null,"灵异胶卷",null],[20015,"UI_desc_51004",null,null,"能够洞悉怪物的神器胶卷，需配合照相机使用",null],[20016,"UI_find_itemname",null,null,"<color=#ff0000ff>{0}</color>",null],[50001,"UI_item_50001",null,"Monthly Pass","月卡",null],[50002,"UI_item_50002",null,"Seasonal Pass","季卡",null],[50003,"UI_desc_50001",null,"Activated to receive 30k Fear Coins immediately, and 1k Fear Coins daily during the monthly pass period.","激活后可立即获得30000恐惧币，月卡期间每日可领取1000恐惧币",null],[50004,"UI_desc_50002",null,"Activated to receive 90k Fear Coins immediately, and 3k Fear Coins daily during the monthly pass period.","激活后可立即获得90000恐惧币，月卡期间每日可领取3000恐惧币",null],[50005,"UI_treasurebox_99",null,"You can still open {0} chests today.","今日还可开启{0}个宝箱",null],[50006,"UI_guide_01",null,"Go to the gate to start the game.","前往大门开始游戏",null],[50007,"UI_item_10100",null,"Open to get: 100, 300, or 1,000 Fear Coins","打开后从概率获得：100、300、1000恐惧币。中的其中一个奖励",null],[50008,"UI_item_10101",null,"Guaranteed to receive 200 Fear Coins and an extra item when opened.","打开后必定获得200恐惧币和一件额外的物品",null],[50009,"UI_item_10102",null,"Guaranteed to receive 1,000 Fear Coins and an extra item when opened.","打开后必定获得1000恐惧币和一件额外的物品",null],[50010,"UI_item_11000",null,"1k Fear Coins","1000恐惧币",null],[50011,"UI_item_11001",null,"6k Fear Coins","6000恐惧币",null],[50012,"UI_item_11002",null,"10k Fear Coins","10000恐惧币",null],[50013,"UI_item_11003",null,"18k Fear Coins","18000恐惧币",null],[50014,"UI_item_11004",null,"30k Fear Coins","30000恐惧币",null],[50015,"UI_item_11005",null,"48k Fear Coins","48000恐惧币",null],[50016,"UI_item_11006",null,"64k Fear Coins","64000恐惧币",null],[50017,"UI_item_11007",null,"Monthly Pass","月卡",null],[50018,"UI_item_11008",null,"Seasonal Pass","季卡",null],[50019,"UI_item_10500",null,"Guaranteed to receive a complete set of modern-style furniture when opened.","打开后必定获得现代风格的家具一整套",null],[50020,"UI_item_10501",null,"Guaranteed to receive a complete set of classical-style furniture when opened.","打开后必定获得古典风格的家具一整套",null],[50021,"UI_item_10502",null,"Guaranteed to receive a complete set of blue-style furniture when opened.","打开后必定获得蓝色风格的家具一整套",null],[50022,"UI_item_10503",null,"Guaranteed to receive a complete set of pink-style furniture when opened.","打开后必定获得粉色风格的家具一整套",null],[50023,"UI_item_10504",null,"Guaranteed to receive 5 various iron defense measures when opened.","打开后必定获得各种铁质防御措施×5",null],[50024,"UI_item_10505",null,"Guaranteed to receive 5 various gold defense measures when opened.","打开后必定获得各种黄金防御措施×5",null],[50025,"UI_item_10506",null,"Guaranteed to receive 5 various diamond defense measures when opened.","打开后必定获得各种钻石防御措施×5",null],[50026,"UI_item_13000",null,"If you don't like houses, then this is definitely your best choice.","如果你不喜欢房子，那么这一定是你最好的选择",null],[50027,"UI_item_13001",null,"Modern luxury cottage, providing you with a sense of security in the apocalypse.","现代的豪华小屋，能给你末世满满的安全感",null],[50028,"UI_item_13002",null,"Super luxurious villa, the highest level of the end of the world feeling.","超级豪华的别墅，末世最高级的感觉",null],[50029,"UI_item_13003",null,"Barbie cottage bursting with pink girlishness, super cute.","粉色少女心爆棚的芭比小屋，超级可爱",null],[50030,"UI_shop_240",null,"Activate to receive immediately","激活立即获得",null],[50031,"UI_shop_241",null,"Daily Claim","每日领取",null],[50036,"UI_npctalk",null,"You're not eligible yet","你还不够格",null],[50037,"UI_Closeprompt_01",null,"Close","关闭提示",null],[50038,"UI_LvUp_01",null,"Level up","等级提升",null],[50039,"UI_bag_01",null,"Use","使用",null],[50040,"UI_bag_02",null,"Move","移动",null],[50041,"UI_bag_03",null,"Detail","详细信息",null],[51001,"UI_bag_04",null,"Daily free treasurebox haven't been gotten yet.","今日免费宝箱还未领取",null],[51002,"UI_sendfriend",null,"Sending Successfully","发送成功",null],[51003,"UI_nosign",null,"He did not fill out his signature","他没有填写签名~",null],[52001,"ReItem_02",null,"Use Props","使用道具",null],[52002,"ReItem_03",null,"Escape Failed","逃脱失败",null],[52003,"UI_item_name_10100",null,null,"禁入特权卡",null],[52004,"UI_item_tip_10100",null,null,"禁入特权卡，可以激活进入光墙",null],[52005,"UI_item_des_10100",null,null,"背包中携带此卡，那么就可以开启禁止其他玩家进入自己家园的光墙",null],[52006,"UI_item_Chicken01",null,null,"消耗了一只尖叫鸡，但未发现异常",null],[52007,"UI_item_Chicken02",null,null,"尖叫鸡发现了一个伪人！准备实施抓捕",null],[52008,"UI_item_Chicken03",null,null,"正在执行清理程序…",null],[52009,"UI_item_Chicken04",null,null,"伟大的安全员{0}使用尖叫鸡清理了一个伪人！",null],[52010,"UI_Tips_shoploading",null,"Shop Loading...","商店初始化加载中...",null],[52011,"UI_item_51001",null,null,"齿轮",null],[52012,"UI_item_51002",null,null,"粘合剂",null],[52013,"UI_desc_51001",null,null,"丧尸小镇中用于武器强化的必备材料，击倒丧必定获得",null],[52014,"UI_desc_51002",null,null,"丧尸小镇中用于武器强化的稀有材料，击倒丧尸概率获得",null],[52015,"UI_item_Chicken05",null,null,"只能对人形对象使用",null],[81001,"GhostName_15",null,null,"大嘴形态伪人",null],[81002,"ghostName_15",null,null,"电视形态伪人",null],[81003,"GhostName_16",null,null,"捧花形态伪人",null],[81004,"ghostName_16",null,null,"大眼形态伪人",null],[82001,"ghostUnlock_15",null,null,"伪装成人类潜伏在恐怖乐园各处",null],[82002,"ghostUnlock_16",null,null,"伪装成人类潜伏在恐怖乐园各处",null],[82003,"ghostUnlock_17",null,null,"伪装成人类潜伏在恐怖乐园各处",null],[82004,"ghostUnlock_18",null,null,"伪装成人类潜伏在恐怖乐园各处",null],[83001,"ghostType_15",null,null,"伪人",null],[83002,"ghostType_16",null,null,"伪人",null],[83003,"ghostType_17",null,null,"伪人",null],[83004,"ghostType_18",null,null,"伪人",null],[84001,"ghostWeek_15",null,null,"异常害怕尖叫鸡",null],[84002,"ghostWeek_16",null,null,"异常害怕尖叫鸡",null],[84003,"ghostWeek_17",null,null,"异常害怕尖叫鸡",null],[84004,"ghostWeek_18",null,null,"异常害怕尖叫鸡",null],[85001,"ghostBack_15",null,null,"背景：它们极度危险，通过模拟人的五官表情和行为，干掉一个人类，并伪装成此人的样子继续寻找下一个目标…",null],[85002,"ghostBack_16",null,null,"背景：它们极度危险，通过模拟人的五官表情和行为，干掉一个人类，并伪装成此人的样子继续寻找下一个目标…",null],[85003,"ghostBack_17",null,null,"背景：它们极度危险，通过模拟人的五官表情和行为，干掉一个人类，并伪装成此人的样子继续寻找下一个目标…",null],[85004,"ghostBack_18",null,null,"背景：它们极度危险，通过模拟人的五官表情和行为，干掉一个人类，并伪装成此人的样子继续寻找下一个目标…",null],[86000,"UI_main_07",null,null,"今日免费礼包未领取，点击领取",null],[88001,"UI_item_tip_20001",null,null,"交互道具只能对其它玩家使用",null],[88002,"UI_item_tip_20002",null,null,"道具正在使用……",null],[131500,"buff_des_01",null,"Currently poisoned, with reduced movement and health regeneration.","当前处于中毒状态，移动速度、换弹速度减慢，回血量减少",null],[131501,"buff_des_02",null,"Gain temporary immunity to poison.","获得一段时间的毒性免疫效果，此效果生效时不会中毒",null],[131502,"buff_des_03",null,"Currently bleeding, losing health over time.","当前处于流血状态，持续扣除血量中",null],[300001,"UI_Popup_01",null,"Sold Out","已售罄",null],[300002,"UI_Popup_02",null,"Recommended","为你推荐",null],[300003,"UI_Popup_03",null,"Don't show again today","今日内不再弹出",null],[300004,"UI_Popup_04",null,"{0}D remaining","剩余{0}天",null],[310001,"UI_treasurebox_01",null,"{0} chests can still be opened","今日宝箱已领完，明天再来吧~",null],[310002,"UI_treasurebox_02",null,"Daily Chest","每日宝箱",null],[310003,"UI_treasurebox_03",null,"Congratulations!","恭喜获得",null],[310004,"UI_treasurebox_04",null,"Tap any where to close","点击空白处关闭窗口",null],[310006,"UI_treasurebox_06",null,"Prize Pool","奖池",null],[310007,"UI_treasurebox_07",null,"Chance to win various rewards.","开启宝箱有概率获得以下奖励",null],[310008,"UI_treasurebox_08",null,"Tap any where to close","点击空白处关闭窗口",null],[310009,"UI_treasurebox_09",null,"Open chest for a random reward","开启宝箱获得随机奖励",null],[310010,"UI_treasurebox_10",null,"Open","开启",null],[320001,"UI_shop_01",null,"Purchase","购买",null],[320002,"UI_shop_02",null,"Max","最大",null],[320003,"UI_shop_03",null,"Discounted Fear Coin items by {0}%","特权生效中，恐惧币相关商品降价{0}%",null],[320004,"UI_shop_04",null,"Chance to Get","概率获得",null],[320005,"UI_shop_05",null,"Mystery Shop","神秘人商店",null],[320006,"UI_shop_06",null,"Back","返回",null],[320007,"UI_shop_07",null,"Tip","提示",null],[320008,"UI_shop_08",null,"Confirm","确认",null],[320009,"UI_shop_09",null,"Cancel","取消",null],[320010,"UI_shop_10",null,"Congratulations!","恭喜获得",null],[320011,"UI_shop_11",null,"Click 'I Want It' for a chance to get this item.","点击【我想要】按钮，\n有概率直接获得该道具",null],[320012,"UI_shop_12",null,"Skin","皮肤",null],[320013,"UI_shop_13",null,"Consumables","消耗品",null],[320014,"UI_shop_14",null,"Interactive Items","互动道具",null],[320015,"UI_shop_15",null,"Gift Packs","礼包",null],[320016,"UI_shop_16",null,"Monthly Pass","月卡",null],[320017,"UI_shop_17",null,"Top-up","充值",null],[320018,"UI_shop_18",null,"CM","建材",null],[320019,"UI_shop_19",null,"D, W, M Packs","日周月礼包",null],[320020,"UI_shop_20",null,"All Items","全部商品",null],[320021,"UI_shop_21",null,"Activated","已激活",null],[320022,"UI_shop_22",null,"Monthly Pass and Seasonal Pass can be used together","月卡和季卡可以叠加使用",null],[320023,"UI_shop_23",null,"10% discount on Fear Coin items","恐惧币商品价格减免10%",null],[320024,"UI_shop_24",null,"Activate now to get: 30k\nReceive daily: 1k","激活立即获得：30000\n每日领取：1000",null],[320025,"UI_shop_25",null,"{0} days left","剩余{0}天",null],[320026,"UI_shop_26",null,"Fear Coins can be accumulated when offline","离线期间的恐惧币也会积累",null],[320027,"UI_shop_27",null,"3k G-coins","3000派对币",null],[320028,"UI_shop_28",null,"Supreme Seasonal Pass","至尊季卡",null],[320029,"UI_shop_29",null,"Privilege Monthly Pass","特权月卡",null],[330001,"UI_item_12000",null,"House Skins: Melody City","房屋皮肤:爱乐之城",null],[330002,"UI_item_12001",null,"House Skins: Pink Barbie","房屋皮肤:粉色芭比",null],[330003,"UI_item_12002",null,"House Skins: Modern Cabin","房屋皮肤:现代小屋",null],[330004,"UI_item_12003",null,"House Skins: Luxury Villa","房屋皮肤:豪华别墅",null],[330005,"UI_item_12004",null,"House Skins: Brave Plains","房屋皮肤:勇者平地",null],[330006,"UI_des_120000",null,"Unlock skin automatically in Haunt Isle: Melody City","拥有后自动在惊魂岛中解锁房屋皮肤：爱乐之城",null],[330007,"UI_des_120010",null,"Unlock skin automatically in Haunt Isle: Pink Barbie","拥有后自动在惊魂岛中解锁房屋皮肤：粉色芭比",null],[330008,"UI_des_120020",null,"Unlock skin automatically in Haunt Isle: Modern Cabin","拥有后自动在惊魂岛中解锁房屋皮肤：现代小屋",null],[330009,"UI_des_120030",null,"Unlock skin automatically in Haunt Isle: Luxury Villa","拥有后自动在惊魂岛中解锁房屋皮肤：豪华别墅",null],[330010,"UI_des_120040",null,"Unlock skin automatically in Haunt Isle: Brave Plains","拥有后自动在惊魂岛中解锁房屋皮肤：勇者平地",null],[330011,"UI_des_200010",null,"Receive 1k Fear Coins immediately","充值后立即获得1000恐惧币",null],[330012,"UI_des_200020",null,"Receive 6k Fear Coins immediately","充值后立即获得6000恐惧币",null],[330013,"UI_des_200030",null,"Receive 10k Fear Coins immediately","充值后立即获得10000恐惧币",null],[330014,"UI_des_200040",null,"Receive 18k Fear Coins immediately","充值后立即获得18000恐惧币",null],[330015,"UI_des_200050",null,"Receive 30k Fear Coins immediately","充值后立即获得30000恐惧币",null],[330016,"UI_des_200060",null,"Receive 48k Fear Coins immediately","充值后立即获得48000恐惧币",null],[330017,"UI_des_200070",null,"Receive 64k Fear Coins immediately","充值后立即获得64000恐惧币",null],[340001,"UI_gift_01",null,"Lollipop","棒棒糖",null],[340002,"UI_gift_02",null,"Balloon","气球",null],[340003,"UI_gift_03",null,"Bomb","炸弹",null],[340004,"UI_gift_04",null,"Pumpkin","南瓜",null],[340005,"UI_gift_05",null,"Lipstick","口红",null],[340006,"UI_gift_06",null,"Race Car","跑车",null],[340007,"UI_gift_07",null,"Plane","飞机",null],[340008,"UI_buff_01",null,"2xEXP Card","双倍经验卡",null],[340009,"UI_buff_02",null,"3xEXP Card","三倍经验卡",null],[340010,"UI_bufftype_01",null,"Duration: Days","持续时间单位：天",null],[340011,"UI_buffdesc_01",null,"EXP Card","经验卡",null],[340012,"UI_lightBulbUsed_01",null,"Inspiration Bulb used, check out marked locations now","灵感灯泡已使用，去标记地点看看吧",null],[350001,"UI_others_01",null,"Claimed Today","今日已领取",null],[350002,"UI_others_02",null,"{0} G-coins","{0}派对币",null],[350003,"UI_others_03",null,"Claim {0} Fear Coins","领取{0}恐惧币",null],[350004,"UI_others_04",null,"Get {0} Fear Coins","获得{0}恐惧币",null],[350005,"UI_others_05",null,"Current Skin","当前皮肤",null],[350006,"UI_others_06",null,"Switch Skin","切换皮肤",null],[350007,"UI_others_07",null,"Go Buy","去购买",null],[350008,"UI_others_08",null,"Please complete the tutorial first","请先完成新手引导",null],[350009,"UI_others_09",null,"Not Obtained","未获得",null],[350010,"UI_others_10",null,"Free","免费",null],[350011,"UI_others_11",null,"Daily Limit {0}/{1}","每日限购{0}/{1}",null],[350012,"UI_others_12",null,"Purchase Successful","购买成功",null],[350013,"UI_others_13",null,"AD not ready","广告未就绪",null],[350014,"UI_others_14",null,"Weekly Limit {0}/{1}","每周限购{0}/{1}",null],[350015,"UI_others_15",null,"Monthly Limit {0}/{1}","每月限购{0}/{1}",null],[350016,"UI_others_16",null,"PP Limit {0}/{1}","每人限购{0}/{1}",null],[350017,"UI_others_17",null,"Rare","稀有",null],[350018,"UI_others_18",null,"Fear Coins x500","恐惧币x500",null],[350019,"UI_others_19",null,"Tap screen to speed up opening","点击屏幕加速开启",null],[350020,"UI_others_20",null,"Amazing!","恭喜获得",null],[350021,"UI_others_21",null,"Continue","继续开启",null],[350022,"UI_others_22",null,"OK","知道了",null],[400001,"Code_001",null,"Today's Free Openings Remaining: {0}","今日免费次数余额不足 当前剩余免费次数{0}",null],[400002,"Code_002",null,"Pack Exhausted","礼包已用完",null],[400003,"Code_003",null,"Already Owned","已拥有",null],[400004,"Code_004",null,"Guaranteed","必得",null],[400005,"Code_005",null,"Unlocked","已解锁",null],[400006,"Code_006",null,"Unlock","解锁",null],[400007,"Code_007",null,"R/s","发/秒",null],[400008,"Code_008",null,"Please click on the position to exchange","请点击要交换的位置",null],[400009,"Code_009",null,"You can open {0} more chests today.","今天还可以打开{0}个宝箱哦。",null],[400010,"Code_010",null,"Cannot Like Yourself","不能给自己点赞",null],[400011,"Code_011",null,"Player you want to like is offline or not in the room!","你要点赞的玩家已离线或不在一个房间！",null],[400012,"Code_012",null,"Cannot Like Again","无法重复点赞",null],[400013,"Code_013",null,"Liked too many times today, try again tomorrow!","今天点赞太多了，明天再来吧!",null],[400014,"Code_014",null,"Cannot Gift Yourself","不能给自己送礼",null],[400015,"Code_015",null,"Player you want to gift is offline or not in the room!","你要送礼的玩家已离线或不在一个房间！",null],[400016,"Code_016",null,"{0} thinks you're cool, gave you a like","{0}觉得你很不错，给你点了个赞",null],[400017,"Code_017",null,"{0} gave {1} {2} * {3} as a gift","{0}给{1}赠送了{2} * {3}",null],[400018,"Code_018",null,"Request to add you as a friend!","请求添加你为好友！",null],[400019,"Code_019",null,"Already Friends!","已经是好友了！",null],[400020,"Code_020",null,"Send Friend Request to {0}?","向{0}发送好友申请？",null],[400021,"Code_021",null,"Active","生效中",null],[400022,"Code_022",null,"Cleared Record","通关记录",null],[400023,"Code_023",null,"Coming Soon","敬请期待",null],[400024,"Code_024",null,"h","小时",null],[400025,"Code_025",null,"m","分钟",null],[400026,"Code_026",null,"Player","玩家",null],[400027,"Code_027",null,"(up to 16 characters)","（最多字数16）",null],[400028,"Code_028",null,"Bio Changed Successfully","个性签名更改成功",null],[400029,"Code_029",null,"Contains blocked words, please re-enter!","包含屏蔽词，请重新输入！",null],[400030,"Code_030",null,"Already Friends","已是好友",null],[400031,"Code_031",null,"{0}'s Identity Card","{0}的身份卡",null],[400032,"Code_032",null,"Nickname","昵称",null],[400033,"Code_033",null,"Gender","性别",null],[400034,"Code_034",null,"Friend ID","好友ID",null,"UI_item_10001"],[400035,"Code_035",null,"None","暂无",null],[400036,"Code_036",null,"MP","鬼魅值",null],[400037,"Code_037",null,"Popularity LV","人气等级",null],[400038,"Code_038",null,"<!-- -->","级",null],[400039,"Code_039",null,"EXP","经验值",null],[400040,"Code_040",null,"Level","等级",null],[400041,"Code_041",null,"{0} threw {2} {3} to {1}","{0}向{1}投掷了{2}个{3}",null],[400042,"Code_042",null,"Confirm spending {0} Fear Coins to unlock {1}?","确认花费{0}恐惧币解锁{1}吗？",null],[400043,"Code_043",null,"Purchase Successful","购买成功",null],[400044,"Code_044",null,"Purchase limit reached","购买次数已用完",null],[400045,"Code_045",null,"Insufficient backpack items","背包物品数量不足",null],[400046,"Code_046",null,"Not enough Fear Coins, go to recharge?","恐惧币不足是否前往充值",null],[400047,"Code_047",null,"Free","免费",null],[400048,"Code_048",null,"Spend {0} G-coins to buy {1}?","是否花费{0}派对币购买{1}",null],[400049,"Code_049",null,"Purchase limit reached","购买次数已用完",null],[400050,"Code_050",null,"Item limit reached","道具已达持有上限",null],[400051,"Code_051",null,"Fear Coin item prices reduced by {0}%","恐惧币商品价格减免{0}%",null],[400052,"Code_052",null,"Already claimed today","今日已领取",null],[400053,"Code_053",null,"Claim {0} Fear Coins","领取{0}恐惧币",null],[400054,"Code_054",null,"Received {0} Fear Coins","获得{0}恐惧币",null],[400055,"Code_055",null,"{0} days left","剩余{0}天",null],[400056,"Code_056",null,"Current version does not support payments, please update version","版本过低，请更新",null],[400057,"Code_057",null,"Monthly Pass","月卡",null],[400058,"Code_058",null,"Seasonal Pass","季卡",null],[400059,"Code_059",null,"Weekly Pack","周礼包",null],[400060,"Code_060",null,"Purchase Failed","购买失败",null],[400061,"Code_061",null,"Purchase Successful","购买成功",null],[400062,"Code_062",null,"Insufficient Fear Coins, open daily chest in the lobby or collect in-game","恐惧币不足, 可以前往大厅开启每日宝箱获取或者在游戏场景中拾取",null],[400063,"Code_063",null,"Not enough {0} items","道具{0}不够",null],[400064,"Code_064",null,"Daily opening limit reached","今日开启次数已用完",null],[400065,"Code_065",null,"Watch ad to open","看广告开启",null],[400066,"Code_066",null,"Open","开启",null],[400067,"Code_067",null,"Ad playback failed","广告播放失败",null],[400068,"Code_068",null,"Ad not ready","广告未准备好",null],[400069,"Code_069",null,"Ad not activated","广告未激活",null],[400070,"Code_070",null,"Current EXP","本局经验",null],[400071,"Code_071",null,"Current Level: {0}","当前等级：{0}级",null],[400072,"Code_072",null,"A similar {0} has already been activated. Replace it, and the original will become inactive. Proceed?","已经生效了同种类型的{0},替换后原来的会失效 是否确定取代",null],[400073,"Code_073",null,"Full HP, no need for treatment","满血无需治疗",null],[400074,"Code_074",null,"Can only use one at a time","只能一个一个使用",null],[400075,"Code_075",null,"Melody City","爱乐之城",null],[500001,"Gamename_01",null,"Hall","大厅",null],[500002,"Gamename_02",null,"School","鬼校",null],[500003,"Gamename_03",null,"Hospital","疯人院",null],[500004,"Gamename_04",null,"Graveyard","惊魂岛",null],[500005,"Gamename_05",null,"Town","丧尸小镇",null],[500006,"Gamename_06",null,"Hall text test","大厅文本测试",null],[500007,"Skip_01",null,"Welcome to the Ghost School\nMysterious puzzles and hidden truths await your unraveling\n· You can choose to escape, but you only have 5 days.\n· Or try to uncover the truth and rescue Pamni.\n· Only a few rooms and lockers are safe.\nThey're coming for you.\nBest of luck...","欢迎来到恐怖鬼校\n诡异的谜团和隐秘的真相等待你去揭开\n· 你可以选择逃出去，但你只有5天时间\n· 你也可以尝试找到背后的真相，解救帕姆尼\n· 只有个别房间和柜子是安全的\n· 听说出去的路不止一条\n他们来找你了\n祝你好运... …",null],[500008,"Skip_02",null,"Welcome to the Asylum\nIn the eerie night, with the red moon rising, many mysteries surround the asylum...\nIncluding Pamni, many creatures seem to have gone mad.\n· You can choose to flee alone.\n· Or choose to save everything.\n· Or immerse yourself in darkness.\n· But remember, you only have 5 days.\nThey're coming for you.\nBest of luck...","欢迎来到疯人院\n诡异的夜晚，红月升空，为疯人院带来了许多谜团...\n包括帕姆尼在内的不少生物似乎都变的疯狂\n· 你可以选择独自出逃\n· 也可以选择拯救一切\n· 亦或者投身于黑暗中\n· 但记住，你只有5天时间\n他们来找你了\n祝你好运...",null],[500009,"Skip_03",null,"Welcome, campers, to Haunt Isle!\nThey say, whenever the Blood Moon rises, your shadow comes looking for you...\nExplore, build, gather resources, fend off the Shadow People's attacks.\nEnhance your campsite, survive!\nStarving cats, fishers, volcano trees, the moon in the cage...\nThe island seems to hold many unknown secrets...\nEnjoy the crimson camping journey!","各位露营者，欢迎来到惊魂岛！\n听说，每当血月降临，你的影子就会来找你…\n探索建造，就地取材，阻挡影人的攻击\n完善你的露营小屋，坚持活下去！\n饿猫、钓鱼人、火山魔树、牢笼中的月亮…\n岛上似乎还隐藏着许多不为人知的秘密…\n享受血色露营之旅吧！",null],[500010,"Skip_04",null,"The town was once a typical one, where people lived repetitive lives.\nThe sudden appearance of the red moon shattered the town's tranquility...\nThe moon's glow has changed the residents both physically and mentally.\nThe town is no longer peaceful... filled with the low growls of zombies.\nHow will you choose? Escape? Or rescue?","小镇本是个普通的小镇，人们在这里过着重复的生活\n突然出现的红月，打破了小镇以往的宁静......\n红月的光芒，让小镇居民的身体和精神都发生了变化\n小镇不再宁静......这里遍布着丧尸的低吼\n你该如何选择呢？逃离？还是拯救？",null],[510001,"UI_main_01",null,"Album","图录",null],[510002,"UI_main_02",null,"Settings","设置",null],[510003,"UI_main_03",null,"Shop","商店",null],[510004,"UI_main_04",null,"Name Card","名片",null],[510005,"UI_main_05",null,"Emojis","表情",null],[510006,"UI_main_06",null,"Notes","笔记",null],[510007,"GiftShow",null,"Gift Showcase:","礼物展示：",null],[510008,"PassRecord",null,"Clearance Record","通关记录",null],[510009,"RecentLikes",null,"Recent Likes","最近点赞",null],[510010,"PersonalSign",null,"Bio:","个性签名：",null],[510011,"GiftList",null,"Gifts List","收礼列表",null],[700001,"UI_News_01",null,null,"恐怖乐园大事件",null],[700002,"UI_News_02",null,null,"小心伪人出没！",null],[700003,"UI_News_03",null,null,"ㅤ ㅤ近日，恐怖乐园多地频繁观测到一种被称为 <color=#E41B00ff>伪人</color> 的神秘生物，它们喜欢模拟人的五官表情和行为，却极度危险。\n\nㅤ ㅤ‎‏伪人会攻击落单的人，吸取恐惧能量。跟好朋友抱团可以有效的抵御伪人，前提是你的好朋友真的是人。",null],[700004,"UI_News_04",null,null,"ㅤ目前可以公开的情报：\n\n· 大部分伪人无法完全伪装成人的样子\n\n· 注意观察其他人的 <color=#E41B00ff>名片</color>\n\n· 商店和宝箱有可以扫描出伪人的 <color=#E41B00ff>尖叫鸡</color> 可以购买",null],[700005,"UI_News_05",null,null,"ㅤ<color=#CA0000ff>版本活动限定</color>\n「安全员」神秘奖励\nㅤ清除一定数量伪人获得",null],[700006,"UI_News_06",null,null,"{0}/60",null],[700007,"UI_News_07",null,null,"清除数量不足！！",null],[700008,"UI_News_08",null,null,"领取奖励成功！！",null],[700009,"UI_News_09",null,null,"不可以重复领取",null],[800000,"FindTips_01",null,null,"还未找到物品",null],[800001,"FindTips_02",null,null,"领取",null],[800002,"FindTips_03",null,null,"已领取",null],[800003,"FindTips_04",null,null,"收集魔物数量还不够哦",null],[800004,"FindTips_05",null,null,"收藏{0}个",null],[800005,"FindTips_06",null,null,"已收藏{0}个",null],[900001,"GhostMenu_01",null,null,"拍摄范围内未检测到怪物",null],[900002,"GhostMenu_02",null,null,"×{0}",null],[900003,"GhostMenu_03",null,null,"{0}/{1}",null],[900004,"GhostMenu_04",null,null,"鬼怪图录",null],[900005,"GhostMenu_05",null,null,"魅力值：{0}",null],[900006,"GhostMenu_06",null,null,"{0}\n{1}\n{2}\n解锁进度：{3}/{4}",null],[900007,"GhostMenu_07",null,null,"解锁可获得奖励：",null],[900008,"GhostMenu_08",null,null,"帕姆尼摄影入门（拍摄帕姆尼魅力值×{}）",null],[900009,"GhostMenu_09",null,null,"<color=#FFDB00>Excellent</color>",null],[900010,"GhostMenu_10",null,null,"<color=#53A8FF>Great</color>",null],[900011,"GhostMenu_11",null,null,"<color=#5DFF58>Not Bad</color>",null],[900012,"GhostMenu_12",null,null,"获得了以下碎片",null],[900013,"GhostMenu_13",null,null,"异世怪物出没 灵异相机大升级",null],[900014,"GhostMenu_14",null,null,"恐怖乐园发现大量不明生物",null],[900015,"GhostMenu_15",null,null,"ㅤ近日，恐怖乐园中出现大量不明生物，研究专家指出，这些生物可能来自另一个名为<color=#FF0000>“波比”</color>的世界线。\nㅤ这些生物似乎会在<color=#FF0000>不同的时间段</color>出现在各个游戏中，各位逃生者们请多加注意，尤其当心名为<color=#FF0000>“长腿妈妈”</color>的生物。",null],[900016,"GhostMenu_16",null,null,"ㅤ神秘人调整了灵异相机和鬼怪图录的功能：\n· 新的灵异相机能拍到鬼怪的<color=#FF0000>更为内在的东西</color>，但需要消耗<color=#FF0000>灵异胶卷</color>。\n· 随着灵异相机的升级，<color=#FF0000>鬼怪图录</color>也发生了一些变化，快去看看吧~\n· 拍照成为新潮流，似乎还能<color=#FF0000>增加魅力值</color>？",null],[900017,"GhostMenu_17",null,null,"为未来的摄影大师\n献上灵异胶卷*15",null],[900018,"GhostMenu_18",null,null,"灵异胶卷*15",null],[900019,"GhostMenu_19",null,null,"灵异相机与鬼怪图录功能大升级",null],[701000,"Report_01",null,null,"我不是伪人啊！我只是个普通玩家！救救我！",null],[701001,"Report_02",null,null,"竟然敢偷看我的秘密，你晚上睡觉的时候当心点！",null],[701002,"Report_03",null,null,"我没干过坏事！凭什么抓我啊啊啊啊啊啊啊啊——",null],[701003,"Report_04",null,null,"可恶的安全员，下次我一定会报仇的！",null],[701004,"Report_05",null,null,"冤枉啊——不要抓我！我一直都是人类！",null],[701005,"Report_06",null,null,"哈哈哈哈！一切都是徒劳！伪人将占领乐园！",null],[701006,"Report_07",null,null,"哼！你说说从哪里看出来我是伪人了~",null],[701007,"Report_08",null,null,"我...会...回...来...的...",null],[701008,"Report_09",null,null,"破笼子可抓不住我！告密者！我会跟着你的！",null],[701009,"Report_10",null,null,"抓住了我又如何，你们永远不可能解决伪人！",null],[701010,"Report_11",null,null,"我不是伪人...呜呜呜...别抓我...我害怕...",null],[701011,"Report_12",null,null,"{0}玩家举报{1}玩家是伪人！！大家快去看看！",null],[701012,"Report_13",null,null,"举报伪人!",null],[60000,"Find_name_01",null,null,"魔戒",null],[60001,"Find_name_02",null,null,"塑料梳子",null],[60002,"Find_name_03",null,null,"毒蛇苹果",null],[60003,"Find_name_04",null,null,"玩具熊",null],[60004,"Find_name_05",null,null,"雷剑",null],[60005,"Find_name_06",null,null,"咒怨铁锤",null],[60006,"Find_name_07",null,null,"血色红裙",null],[60007,"Find_name_08",null,null,"雪人",null],[60008,"Find_name_09",null,null,"精美项链",null],[60009,"Find_name_10",null,null,"长尺电锯",null],[60010,"Find_name_11",null,null,"小提琴",null],[60011,"Find_name_12",null,null,"杰森面具",null],[60012,"Find_name_13",null,null,"钉子项圈",null],[60013,"Find_name_14",null,null,"异形头套",null],[60014,"Find_name_15",null,null,"古书",null],[60015,"Find_name_16",null,null,"怪脸南瓜",null],[60016,"Find_name_17",null,null,"魔碟",null],[60017,"Find_name_18",null,null,"巨大斧头",null],[60018,"Find_name_19",null,null,"机器手臂",null],[60019,"Find_name_20",null,null,"黑伞",null],[60020,"Find_name_21",null,null,"危险药品",null],[60021,"Find_name_22",null,null,"旧公文包",null],[60022,"Find_name_23",null,null,"毒鱼",null],[60023,"Find_name_24",null,null,"防毒面具",null],[60024,"Find_name_25",null,null,"猫咪玩偶",null],[60025,"Find_name_26",null,null,"熊猫玩偶",null],[60026,"Find_name_27",null,null,"银质手铐",null],[60027,"Find_name_28",null,null,"护士帽",null],[60028,"Find_name_29",null,null,"美味肉饼",null],[60029,"Find_name_30",null,null,"帕姆尼头套",null],[60030,"Find_name_31",null,null,"发箍",null],[60031,"Find_name_32",null,null,"安娜贝尔",null],[60032,"Find_name_33",null,null,"山羊头",null],[60033,"Find_name_34",null,null,"黑湖海螺",null],[60034,"Find_name_35",null,null,"纯净之角",null],[60035,"Find_name_36",null,null,"十字架",null],[60036,"Find_name_37",null,null,"洋娃娃",null],[60037,"Find_name_38",null,null,"巨大宝戒",null],[60038,"Find_name_39",null,null,"魔法唱片",null],[60039,"Find_name_40",null,null,"僵尸仙灵",null],[60040,"Find_name_41",null,null,"沙漠玫瑰",null],[60041,"Find_name_42",null,null,"暗黑精灵",null],[60042,"Find_name_43",null,null,"榆木梳子",null],[60043,"Find_name_44",null,null,"华丽项链",null],[60044,"Find_name_45",null,null,"海洋宝石",null],[60045,"Find_name_46",null,null,"镜子",null],[60046,"Find_name_47",null,null,"影人残影",null],[60047,"Find_name_48",null,null,"魔力之花",null],[60048,"Find_name_49",null,null,"火爆珠珠",null],[60049,"Find_name_50",null,null,"暗黑物质",null],[60050,"Find_describe_01",null,null,"哥布林世界具有魔力的戒指\n这枚魔戒拥有很强的法力，现在被封印了",null],[60051,"Find_describe_02",null,null,"伽椰子的儿子俊雄的玩具梳子\n俊雄经常用这把梳子给妈妈梳头发",null],[60052,"Find_describe_03",null,null,"毒蛇留下的美味苹果\n毒蛇化身为苹果树而结的果子，有着剧毒",null],[60053,"Find_describe_04",null,null,"安娜贝尔的玩具熊\n玲娜贝尔被领养后收到的第一个玩具",null],[60054,"Find_describe_05",null,null,"雷鬼的武器\n可以召唤雷电的强大武器",null],[60055,"Find_describe_06",null,null,"双一用来诅咒别人的工具\n双一拥有诅咒和预言的能力，锤子是他的工具之一",null],[60056,"Find_describe_07",null,null,"富江最喜欢的裙子之一\n富江拥有无限分裂的能力，这条裙子是她分身穿过",null],[60057,"Find_describe_08",null,null,"雪山怪人在雪山上推起来的雪人\n雪山怪人用雪人吸引人类，从而吃掉他们",null],[60058,"Find_describe_09",null,null,"雾男的项链，他带上十分帅气\n雾男将项链故意丢在地上，等着有缘人捡到",null],[60059,"Find_describe_10",null,null,"电锯魔人的作案工具\n电锯魔人使用电锯长期进行连环作案，令人骇闻",null],[60060,"Find_describe_11",null,null,"满脸牙齿芭蕾女好友的小提琴\n芭蕾女的好友经常弹奏小提琴，为她伴奏",null],[60061,"Find_describe_12",null,null,"黑色星期五杰森的面具\n杰森的脸长得很恐怖丑陋，他戴上面具防止别人看他",null],[60062,"Find_describe_13",null,null,"地狱领主前来地球带着的项圈\n项圈上都是钉子，这是地狱领主强大的象征",null],[60063,"Find_describe_14",null,null,"万圣鬼在万圣节带的头套\n只在万圣节会出现，他不会伤害人，只会吓人",null],[60064,"Find_describe_15",null,null,"考试鬼弄丢的书籍，他总是丢三落四\n考试忘带东西郁郁而终，常常帮学生改文章或捣乱",null],[60065,"Find_describe_16",null,null,"南瓜灯人备用的南瓜头\n灯人在南瓜上雕出人脸，从而接近人类伤害他们",null],[60066,"Find_describe_17",null,null,"用来召唤碟仙的法器\n传说要在碟子前很虔诚的问问题，碟仙就会出现",null],[60067,"Find_describe_18",null,null,"闪灵里父亲用来砍门的斧头\n这把斧头内涵着强烈的怨念",null],[60068,"Find_describe_19",null,null,"机器人杀手的手臂\n这个手臂是在喝金刚斗争中被打掉的",null],[60069,"Find_describe_20",null,null,"雨衣杀手最喜欢的伞\n雨衣杀手母亲送给他的礼物，伞坏后他患上了精神病",null],[60070,"Find_describe_21",null,null,"学校里的化学物品\n导致羞羞帕慕尼致死的液体，十分危险！",null],[60071,"Find_describe_22",null,null,"弗兰克的公文包\n弗兰克是在早晨工作途中被咬变成丧尸的",null],[60072,"Find_describe_23",null,null,"生活在小镇河里的鱼\n被丧尸毒气感染后变成了具有剧毒的鱼，不能吃",null],[60073,"Find_describe_24",null,null,"用来躲避毒气的工具\n这个面具似乎是前小镇居民逃生遗落的",null],[60074,"Find_describe_25",null,null,"丧尸爱丽丝心爱的玩具\n在猫咪玩偶丢失后，爱丽丝就变得十分暴躁",null],[60075,"Find_describe_26",null,null,"丧尸凯丽心爱的玩具\n凯丽是爱丽丝的妹妹，这个玩具是他生日时候爱丽丝送给她的",null],[60076,"Find_describe_27",null,null,"警察安娜的标配工具\n安娜是在保护居民的时候，不幸变成丧尸的",null],[60077,"Find_describe_28",null,null,"护士帕姆尼的帽子\n疯人院的帕姆尼在净化后留下的帽子",null],[60078,"Find_describe_29",null,null,"看上去汁水很多的肉饼\n学校以前经常会举办全校烧烤的活动，这是不小心掉落的吧",null],[60079,"Find_describe_30",null,null,"帕姆尼的小丑头套\n鬼校的学生在净化后脱离帕姆尼留下的头套",null],[60080,"Find_describe_31",null,null,"花子遗留在鬼校的发箍\n花子生前的好朋友送的生日礼物",null],[60081,"Find_describe_32",null,null,"安娜贝尔的真身\n安娜贝尔的灵魂被净化后，封印在了这个玩偶里",null],[60082,"Find_describe_33",null,null,"人型山羊用来伪装的道具\n山羊站立起来学人类两脚走路，后来发现了他伪装的道具",null],[60083,"Find_describe_34",null,null,"鱼头怪送给心爱之人的定情信物\n鱼头怪是黑湖的怪兽，他喜欢上了科考的女博士",null],[60084,"Find_describe_35",null,null,"独角兽换下来的角\n传说独角兽是纯净的生物，实际上他是很邪恶的生物",null],[60085,"Find_describe_36",null,null,"封印木乃伊的法器\n探考队将十字架带回来后，木乃伊也被解封了... ...",null],[60086,"Find_describe_37",null,null,"利用安抚产鬼的法器\n产鬼会缠上活着的孕妇，阻碍其生产",null],[60087,"Find_describe_38",null,null,"金刚用来给心爱之人求婚的戒指\n这是复刻品，真的在斗争中被损坏了，金刚也因此失控",null],[60088,"Find_describe_39",null,null,"女巫布莱恩最喜欢的唱片\n这张唱片响起的时候，布莱恩的魔力会大幅增长",null],[60089,"Find_describe_40",null,null,"神秘人的宠物\n难道这是引起小镇丧尸恐慌的源头吗？",null],[60090,"Find_describe_41",null,null,"大眼伪人的手捧花\n这是盛开在沙漠中的玫瑰，其本身就有强大的法力",null],[60091,"Find_describe_42",null,null,"时不时会出现在各个地方\n传说他是神秘人的手下，前来探查的",null],[60092,"Find_describe_43",null,null,"这是一把伽椰子最喜欢的梳子\n这把梳子是他的孩子送给她的礼物",null],[60093,"Find_describe_44",null,null,"被诅咒的项链\n这项链是血新娘结婚时候的",null],[60094,"Find_describe_45",null,null,"黑暗女巫的至尊宝物\n这是黑暗女巫用一半寿命换来的强大宝物",null],[60095,"Find_describe_46",null,null,"贞子的镜子\n贞子生前最喜欢坐在镜子前梳她乌黑的头发",null],[60096,"Find_describe_47",null,null,"影人离开时留下的残影\n能感觉到很强烈的攻击意念，似乎离太近都会被吸进去",null],[60097,"Find_describe_48",null,null,"薇薇安魔法产物\n微微安将魔法储存在花苞中，孕育成更强的法力",null],[60098,"Find_describe_49",null,null,"杜姆爆炸的核心\n这是一颗具有强大能量的红色珠子",null],[60099,"Find_describe_50",null,null,"影人的能量内核\n怨念、狂暴、代替...里面蕴含了很多黑暗的意识",null],[60100,"Find_tips_01",null,null,"哥布林首领在乐园买吃的时候落下了",null],[60101,"Find_tips_02",null,null,"俊雄经常和小朋友在游乐园的滑梯玩耍",null],[60102,"Find_tips_03",null,null,"长在乐园的树上",null],[60103,"Find_tips_04",null,null,"安娜贝尔和小熊之前在乐园的帐篷里玩过家家",null],[60104,"Find_tips_05",null,null,"在乐园的出口处",null],[60105,"Find_tips_06",null,null,"在乐园的废墟门口",null],[60106,"Find_tips_07",null,null,"地域领主帮富江收在了乐园的豪华城堡里",null],[60107,"Find_tips_08",null,null,"在乐园的冰山上",null],[60108,"Find_tips_09",null,null,"雾男把他丢在了乐园十分显眼的地方",null],[60109,"Find_tips_10",null,null,"电锯魔人把它扔在了废墟的房间里",null],[60110,"Find_tips_11",null,null,"乐器当然是在音乐教室啦",null],[60111,"Find_tips_12",null,null,"在吸血鬼城堡周围",null],[60112,"Find_tips_13",null,null,"吸血城堡的王座上",null],[60113,"Find_tips_14",null,null,"高塔是藏东西的好地方",null],[60114,"Find_tips_15",null,null,"在鬼校某间教室的讲台上",null],[60115,"Find_tips_16",null,null,"就在乐园很热闹的地方",null],[60116,"Find_tips_17",null,null,"在乐园的小卖部里",null],[60117,"Find_tips_18",null,null,"这把斧头能砍碎很多东西，包括废墟的墙壁",null],[60118,"Find_tips_19",null,null,"机器人杀手最喜欢在乐园里出现了",null],[60119,"Find_tips_20",null,null,"黑伞在废墟的房屋后面",null],[60120,"Find_tips_21",null,null,"只有护士能拿得到这么危险的药品",null],[60121,"Find_tips_22",null,null,"弗莱克的包被他忘在了小镇的站台上",null],[60122,"Find_tips_23",null,null,"毒鱼从小镇逃到了乐园的某个地方",null],[60123,"Find_tips_24",null,null,"在小镇的休闲台上，一定是为了躲避丧尸才站在这么高的",null],[60124,"Find_tips_25",null,null,"安娜贝尔把他丢在了乐园的废墟楼顶上",null],[60125,"Find_tips_26",null,null,"凯丽帮爱丽丝找猫咪的时候遗落在乐园了",null],[60126,"Find_tips_27",null,null,"在小镇安娜的家中桌子上，安娜的小屋是白色的平房",null],[60127,"Find_tips_28",null,null,"在疯人院的护士站",null],[60128,"Find_tips_29",null,null,"和普通肉饼外型不同，但也在鬼校里",null],[60129,"Find_tips_30",null,null,"在鬼校净化的屋子里",null],[60130,"Find_tips_31",null,null,"在鬼校的宿舍里",null],[60131,"Find_tips_32",null,null,"安娜贝尔一直在乐园的高处看着玩家们",null],[60132,"Find_tips_33",null,null,"山羊人把面具扔在了人少的废墟",null],[60133,"Find_tips_34",null,null,"惊魂岛的海边好像有很多的海螺",null],[60134,"Find_tips_35",null,null,"独角兽经常在惊魂岛的雪山出现",null],[60135,"Find_tips_36",null,null,"在另一个废墟的屋顶",null],[60136,"Find_tips_37",null,null,"洋娃娃在乐园的火山台上",null],[60137,"Find_tips_38",null,null,"金刚用最后一丝力气把戒指放在了废墟的一楼里",null],[60138,"Find_tips_39",null,null,"疯人院的病人们疯了以后就爱听这个",null],[60139,"Find_tips_40",null,null,"他在小镇大木屋里的一处安静的休息着，据说那个房间没上锁",null],[60140,"Find_tips_41",null,null,"在大厅的正中央",null],[60141,"Find_tips_42",null,null,"他在乐园的城堡高处俯视这乐园的一切",null],[60142,"Find_tips_43",null,null,"俊雄把梳子藏在了乐园废墟的楼梯上",null],[60143,"Find_tips_44",null,null,"在去小镇和惊魂岛的必经之处",null],[60144,"Find_tips_45",null,null,"在某处房屋的顶上",null],[60145,"Find_tips_46",null,null,"在惊魂岛的某处藏着，分清楚他和使用的区别",null],[60146,"Find_tips_47",null,null,"影人离开的时候遗留下来的残影",null],[60147,"Find_tips_48",null,null,"在小镇魔女丧尸的炼药小屋里",null],[60148,"Find_tips_49",null,null,"杜姆把他藏在了小镇屋子的柜子里，并且亲自在屋外镇守",null],[60149,"Find_tips_50",null,null,"在乐园的正上方空中，等等，空中？",null],[70001,"GhostFragment_01",null,null,"帕姆尼之首",null],[70002,"GhostFragment_02",null,null,"帕姆尼之魂",null],[70003,"GhostFragment_03",null,null,"帕姆尼之心",null],[70004,"GhostFragment_04",null,null,"帕姆尼之灵",null],[70005,"GhostFragment_05",null,null,"帕姆尼之器",null],[70006,"GhostFragment_06",null,null,"阴暗爬行帕姆尼之首",null],[70007,"GhostFragment_07",null,null,"阴暗爬行帕姆尼之魂",null],[70008,"GhostFragment_08",null,null,"阴暗爬行帕姆尼之心",null],[70009,"GhostFragment_09",null,null,"阴暗爬行帕姆尼之灵",null],[70010,"GhostFragment_10",null,null,"阴暗爬行帕姆尼之器",null],[70011,"GhostFragment_11",null,null,"羞羞帕姆尼之首",null],[70012,"GhostFragment_12",null,null,"羞羞帕姆尼之魂",null],[70013,"GhostFragment_13",null,null,"羞羞帕姆尼之心",null],[70014,"GhostFragment_14",null,null,"羞羞帕姆尼之灵",null],[70015,"GhostFragment_15",null,null,"羞羞帕姆尼之器",null],[70016,"GhostFragment_16",null,null,"闪灵帕姆尼之首",null],[70017,"GhostFragment_17",null,null,"闪灵帕姆尼之魂",null],[70018,"GhostFragment_18",null,null,"闪灵帕姆尼之心",null],[70019,"GhostFragment_19",null,null,"闪灵帕姆尼之灵",null],[70020,"GhostFragment_20",null,null,"闪灵帕姆尼之器",null],[70021,"GhostFragment_21",null,null,"护士帕姆尼之首",null],[70022,"GhostFragment_22",null,null,"护士帕姆尼之魂",null],[70023,"GhostFragment_23",null,null,"护士帕姆尼之心",null],[70024,"GhostFragment_24",null,null,"护士帕姆尼之灵",null],[70025,"GhostFragment_25",null,null,"护士帕姆尼之器",null],[70026,"GhostFragment_26",null,null,"影人之首",null],[70027,"GhostFragment_27",null,null,"影人之魂",null],[70028,"GhostFragment_28",null,null,"影人之心",null],[70029,"GhostFragment_29",null,null,"影人之灵",null],[70030,"GhostFragment_30",null,null,"影人之器",null],[70031,"GhostFragment_31",null,null,"安娜之首",null],[70032,"GhostFragment_32",null,null,"安娜之魂",null],[70033,"GhostFragment_33",null,null,"安娜之心",null],[70034,"GhostFragment_34",null,null,"安娜之灵",null],[70035,"GhostFragment_35",null,null,"安娜之器",null],[70036,"GhostFragment_36",null,null,"弗兰克之首",null],[70037,"GhostFragment_37",null,null,"弗兰克之魂",null],[70038,"GhostFragment_38",null,null,"弗兰克之心",null],[70039,"GhostFragment_39",null,null,"弗兰克之灵",null],[70040,"GhostFragment_40",null,null,"弗兰克之器",null],[70041,"GhostFragment_41",null,null,"蒂奇之首",null],[70042,"GhostFragment_42",null,null,"蒂奇之魂",null],[70043,"GhostFragment_43",null,null,"蒂奇之心",null],[70044,"GhostFragment_44",null,null,"蒂奇之灵",null],[70045,"GhostFragment_45",null,null,"蒂奇之器",null],[70046,"GhostFragment_46",null,null,"爱丽丝之首",null],[70047,"GhostFragment_47",null,null,"爱丽丝之魂",null],[70048,"GhostFragment_48",null,null,"爱丽丝之心",null],[70049,"GhostFragment_49",null,null,"爱丽丝之灵",null],[70050,"GhostFragment_50",null,null,"爱丽丝之器",null],[70051,"GhostFragment_51",null,null,"杰克之首",null],[70052,"GhostFragment_52",null,null,"杰克之魂",null],[70053,"GhostFragment_53",null,null,"杰克之心",null],[70054,"GhostFragment_54",null,null,"杰克之灵",null],[70055,"GhostFragment_55",null,null,"杰克之器",null],[70056,"GhostFragment_56",null,null,"凯莉之首",null],[70057,"GhostFragment_57",null,null,"凯莉之魂",null],[70058,"GhostFragment_58",null,null,"凯莉之心",null],[70059,"GhostFragment_59",null,null,"凯莉之灵",null],[70060,"GhostFragment_60",null,null,"凯莉之器",null],[70061,"GhostFragment_61",null,null,"杜姆之首",null],[70062,"GhostFragment_62",null,null,"杜姆之魂",null],[70063,"GhostFragment_63",null,null,"杜姆之心",null],[70064,"GhostFragment_64",null,null,"杜姆之灵",null],[70065,"GhostFragment_65",null,null,"杜姆之器",null],[70066,"GhostFragment_66",null,null,"薇薇安之首",null],[70067,"GhostFragment_67",null,null,"薇薇安之魂",null],[70068,"GhostFragment_68",null,null,"薇薇安之心",null],[70069,"GhostFragment_69",null,null,"薇薇安之灵",null],[70070,"GhostFragment_70",null,null,"薇薇安之器",null],[70071,"GhostFragment_71",null,null,"大嘴伪人之首",null],[70072,"GhostFragment_72",null,null,"大嘴伪人之魂",null],[70073,"GhostFragment_73",null,null,"大嘴伪人之心",null],[70074,"GhostFragment_74",null,null,"大嘴伪人之灵",null],[70075,"GhostFragment_75",null,null,"大嘴伪人之器",null],[70076,"GhostFragment_76",null,null,"电视伪人之首",null],[70077,"GhostFragment_77",null,null,"电视伪人之魂",null],[70078,"GhostFragment_78",null,null,"电视伪人之心",null],[70079,"GhostFragment_79",null,null,"电视伪人之灵",null],[70080,"GhostFragment_80",null,null,"电视伪人之器",null],[70081,"GhostFragment_81",null,null,"捧花伪人之首",null],[70082,"GhostFragment_82",null,null,"捧花伪人之魂",null],[70083,"GhostFragment_83",null,null,"捧花伪人之心",null],[70084,"GhostFragment_84",null,null,"捧花伪人之灵",null],[70085,"GhostFragment_85",null,null,"捧花伪人之器",null],[70086,"GhostFragment_86",null,null,"大眼伪人之首",null],[70087,"GhostFragment_87",null,null,"大眼伪人之魂",null],[70088,"GhostFragment_88",null,null,"大眼伪人之心",null],[70089,"GhostFragment_89",null,null,"大眼伪人之灵",null],[70090,"GhostFragment_90",null,null,"大眼伪人之器",null],[70091,"GhostFragment_91",null,null,"长腿妈妈之首",null],[70092,"GhostFragment_92",null,null,"长腿妈妈之魂",null],[70093,"GhostFragment_93",null,null,"长腿妈妈之心",null],[70094,"GhostFragment_94",null,null,"长腿妈妈之灵",null],[70095,"GhostFragment_95",null,null,"长腿妈妈之器",null],[70096,"GhostFragment_96",null,null,"亲吻米西之首",null],[70097,"GhostFragment_97",null,null,"亲吻米西之魂",null],[70098,"GhostFragment_98",null,null,"亲吻米西之心",null],[70099,"GhostFragment_99",null,null,"亲吻米西之灵",null],[70100,"GhostFragment_100",null,null,"亲吻米西之器",null],[70101,"GhostFragment_101",null,null,"迷你好奇之首",null],[70102,"GhostFragment_102",null,null,"迷你好奇之魂",null],[70103,"GhostFragment_103",null,null,"迷你好奇之心",null],[70104,"GhostFragment_104",null,null,"迷你好奇之灵",null],[70105,"GhostFragment_105",null,null,"迷你好奇之器",null],[70106,"GhostFragment_106",null,null,"胆小鸡之首",null],[70107,"GhostFragment_107",null,null,"胆小鸡之魂",null],[70108,"GhostFragment_108",null,null,"胆小鸡之心",null],[70109,"GhostFragment_109",null,null,"胆小鸡之灵",null],[70110,"GhostFragment_110",null,null,"胆小鸡之器",null],[70111,"GhostFragment_111",null,null,"PJ之首",null],[70112,"GhostFragment_112",null,null,"PJ之魂",null],[70113,"GhostFragment_113",null,null,"PJ之心",null],[70114,"GhostFragment_114",null,null,"PJ之灵",null],[70115,"GhostFragment_115",null,null,"PJ之器",null],[70116,"GhostFragment_116",null,null,"跳跳兔之首",null],[70117,"GhostFragment_117",null,null,"跳跳兔之魂",null],[70118,"GhostFragment_118",null,null,"跳跳兔之心",null],[70119,"GhostFragment_119",null,null,"跳跳兔之灵",null],[70120,"GhostFragment_120",null,null,"跳跳兔之器",null],[70121,"GhostFragment_121",null,null,"邦佐兔之首",null],[70122,"GhostFragment_122",null,null,"邦佐兔之魂",null],[70123,"GhostFragment_123",null,null,"邦佐兔之心",null],[70124,"GhostFragment_124",null,null,"邦佐兔之灵",null],[70125,"GhostFragment_125",null,null,"邦佐兔之器",null],[70126,"GhostFragment_126",null,null,"碎片遮罩1",null],[70127,"GhostFragment_127",null,null,"碎片遮罩2",null],[70128,"GhostFragment_128",null,null,"碎片遮罩3",null],[70129,"GhostFragment_129",null,null,"碎片遮罩4",null],[70130,"GhostFragment_130",null,null,"碎片遮罩5",null],[71001,"ghostName_19",null,null,"长腿妈妈",null],[71002,"ghostName_20",null,null,"亲吻米西",null],[71003,"ghostName_21",null,null,"迷你好奇",null],[71004,"ghostName_22",null,null,"胆小鸡",null],[71005,"ghostName_23",null,null,"PJ",null],[71006,"ghostName_24",null,null,"跳跳兔",null],[71007,"ghostName_25",null,null,"邦佐兔",null],[71008,"ghostUnlock_19",null,null,"只有特定时间才能遇到",null],[71009,"ghostUnlock_20",null,null,"只有特定时间才能遇到",null],[71010,"ghostUnlock_21",null,null,"只有特定时间才能遇到",null],[71011,"ghostUnlock_22",null,null,"只有特定时间才能遇到",null],[71012,"ghostUnlock_23",null,null,"只有特定时间才能遇到",null],[71013,"ghostUnlock_24",null,null,"只有特定时间才能遇到",null],[71014,"ghostUnlock_25",null,null,"只有特定时间才能遇到",null],[71015,"ghostType_19",null,null,"异世生物",null],[71016,"ghostType_20",null,null,"异世生物",null],[71017,"ghostType_21",null,null,"异世生物",null],[71018,"ghostType_22",null,null,"异世生物",null],[71019,"ghostType_23",null,null,"异世生物",null],[71020,"ghostType_24",null,null,"异世生物",null],[71021,"ghostType_25",null,null,"异世生物",null],[71022,"ghostWeek_19",null,null,"十分惧怕灵异相机",null],[71023,"ghostWeek_20",null,null,"惧怕长腿妈妈",null],[71024,"ghostWeek_21",null,null,"会受到长腿妈妈的控制",null],[71025,"ghostWeek_22",null,null,"会受到长腿妈妈的控制",null],[71026,"ghostWeek_23",null,null,"惧怕长腿妈妈",null],[71027,"ghostWeek_24",null,null,"长腿妈妈的助力",null],[71028,"ghostWeek_25",null,null,"及其惧怕长腿妈妈",null],[71029,"ghostBack_19",null,null,"背景：异世而来的生物，有着极端的自我意识，对1006这个数字异常恐惧，对逃生者充满敌意，但异世而来的她似乎无法真正伤害到逃生者。",null],[71030,"ghostBack_20",null,null,"背景：异世而来的生物，对人十分友善，但见到长腿妈妈时就会惧怕起一切。",null],[71031,"ghostBack_21",null,null,"背景：异世而来的生物，受到长腿妈妈的控制，平时不会主动攻击，一旦长腿妈妈出现在附近就会变得异常有进攻，但异世而来的她似乎无法真正伤害到逃生者。",null],[71032,"ghostBack_22",null,null,"背景：异世而来的生物，惧怕这一切，但长腿妈妈出现在在附近时会变得不再恐惧，甚至有些狂躁，但异世而来的她似乎无法真正伤害到逃生者。",null],[71033,"ghostBack_23",null,null,"背景：异世而来的生物，对玩家十分好奇，受到刺激就会发起攻击，长腿妈妈出现在附近时会惧怕一切。",null],[71034,"ghostBack_24",null,null,"背景：异世而来的生物，存在性格缺陷，会攻击看到的人，长腿妈妈出现在附近时会变得疯狂，但异世而来的她似乎无法真正伤害到逃生者。",null],[71035,"ghostBack_25",null,null,"背景：异世而来的生物，害怕很多事物，在长腿妈妈出现时甚至会害怕到走不动道。",null],[71036,"ghostmenu_10",null,null,"彰显个人受欢迎程度的魅力值",null],[71037,"ghostmenu_11",null,null,"恐怖乐园的通用货币恐惧币",null],[71038,"ui_main_guid_01",null,null,"找找房间内有没有出口",null],[71039,"UIMissionDailyPanel",null,null,"每日活跃",null],[71040,"UIMissionNormalPanel",null,null,"任务",null],[71041,"AchievementPanel",null,null,"成就",null],[71042,"UINews",null,null,"公告",null],[71043,"UI_item_61001",null,null,"默认头像框",null],[71044,"UI_item_61002",null,null,"星天开门",null],[71045,"UI_item_61003",null,null,"星语红结",null],[71046,"UI_item_61004",null,null,"星语星愿",null],[71047,"UI_item_61005",null,null,"花叶碟语",null],[71048,"UI_item_61006",null,null,"小鸡蹦蹦",null],[71049,"UI_item_61007",null,null,"群鸡蹦蹦",null],[71050,"UI_item_61008",null,null,"宇之博学者",null],[71051,"UI_item_61009",null,null,"宙之博学者",null],[71052,"UI_item_61010",null,null,"龙门之跃",null],[71053,"UI_item_61011",null,null,"凤毛麟角",null],[71054,"UI_item_61012",null,null,"寻物萌新",null],[71055,"UI_item_61013",null,null,"探索小将",null],[71056,"UI_item_61014",null,null,"时间掌控者",null],[71057,"UI_item_61015",null,null,"魔典大师",null],[71058,"UI_item_61016",null,null,"魔典尊者",null],[71059,"UI_item_61017",null,null,"白玫瑰之梦",null],[71060,"AvatarFrame_01",null,null,"默认头像框",null],[71061,"AvatarFrame_02",null,null,"达成一级成就获得",null],[71062,"AvatarFrame_03",null,null,"达成二级成就获得",null],[71063,"AvatarFrame_04",null,null,"达成三级成就获得",null],[71064,"AvatarFrame_05",null,null,"达成四级成就获得",null],[71065,"AvatarFrame_06",null,null,"达成五级成就获得",null],[71066,"AvatarFrame_07",null,null,"达成六级成就获得",null],[71067,"AvatarFrame_08",null,null,"达成七级成就获得",null],[71068,"AvatarFrame_09",null,null,"达成八级成就获得",null],[71069,"AvatarFrame_10",null,null,"达成九级成就获得",null],[71070,"AvatarFrame_11",null,null,"达成十级成就获得",null],[71071,"AvatarFrame_12",null,null,"收藏5个魔物获得",null],[71072,"AvatarFrame_13",null,null,"收藏30个魔物获得",null],[71073,"AvatarFrame_14",null,null,"收藏50个魔物获得",null],[71074,"AvatarFrame_15",null,null,"七日签到获得",null],[71075,"UI_item_61018",null,null,"卡皮巴拉发卡",null],[71076,"UI_item_61019",null,null,"兔叽发卡",null],[71077,"UI_item_61020",null,null,"熊熊发卡",null],[71078,"UI_item_61021",null,null,"荧光棒",null],[71079,"UI_item_61022",null,null,"粉丝灯牌",null],[71080,"UI_item_61023",null,null,"粉丝礼包",null],[71081,"UI_item_61024",null,null,"铁粉礼包",null],[71082,"UI_gift_08",null,null,"卡皮巴拉发卡",null],[71083,"UI_gift_09",null,null,"兔叽发卡",null],[71084,"UI_gift_10",null,null,"熊熊发卡",null],[71085,"UI_gift_11",null,null,"荧光棒",null],[71086,"UI_gift_12",null,null,"粉丝灯牌",null],[71087,"UI_firstbuy",null,null,"首充赠{0}",null],[71088,"UI_normalbuy",null,null,"附赠{0}",null],[71089,"UI_firstbuy_tips",null,null,"首充优惠每档充值仅限一次哦~",null],[72000,"UI_crush_name",null,null,"粉碎机",null],[72001,"UI_crushtips_01",null,null,"粉碎装备！",null],[72002,"UI_crushtips_02",null,null,"从右侧背包中选择要<color=#FFED56>分解的装备</color>",null],[72003,"UI_des_201",null,null,"赠送可增加5点魅力值","卡皮巴拉发卡"],[72004,"UI_des_202",null,null,"赠送可增加2点魅力值","萌鸡发卡"],[72005,"UI_des_203",null,null,"赠送可增加2点魅力值","猪猪发卡"],[72006,"UI_des_204",null,null,"赠送可增加12点魅力值","荧光棒"],[72007,"UI_des_205",null,null,"赠送可增加20点魅力值","粉丝灯牌"],[72008,"UI_des_206",null,null,"打赏小礼包，打开必定获得其中打赏道具","粉丝礼包"],[72009,"UI_des_207",null,null,"打赏大礼包，打开必定获得其中打赏道具","铁粉礼包"],[72010,"UI_des_208",null,null,"赠送可增加2点魅力值","棒棒糖"],[72011,"UI_des_209",null,null,"赠送可增加2点魅力值","飞机"],[72012,"UI_des_210",null,null,"赠送可增加5点魅力值","炸弹"],[72013,"UI_des_211",null,null,"赠送可增加5点魅力值","南瓜"],[72014,"UI_des_212",null,null,"赠送可增加10点魅力值","跑车"],[72015,"UI_des_213",null,null,"赠送可增加17点魅力值","口红"],[72016,"UI_des_214",null,null,"赠送可增加17点魅力值","气球"],[81000,"UI_blueprint_0",null,null,"图纸碎片",null],[86001,"UI_blueprintDes_0",null,null,"用于在工作台中解锁物品",null],[90000,"RealName_text_1",null,null,"实名认证",null],[90001,"RealName_text_2",null,null,"前往认证",null],[90002,"RealName_text_3",null,null,"退出游戏",null],[90003,"RealName_text_4",null,null,"亲爱的玩家，您当前还是未实名的用户，请前往实名，实名成功后我们《恐怖乐园》将\n送给您以下奖励。感谢您对《恐怖乐园》的支持~",null],[90004,"RealName_text_5",null,null,"注：根据政策要求，未实名用户禁止享用游戏服务，请尽快前往实名！若不实名领奖无法游玩《恐怖乐园》",null],[90005,"RealName_text_6",null,null,"实名认证成功",null],[90006,"RealName_text_7",null,null,"实名认证失败",null],[90007,"Prop_Bobble_03",null,null,"关闭",null],[91001,"AvatarFrame_16",null,null,"通过游戏内实名认证后获得",null],[91002,"UI_item_61025",null,null,"红玫瑰",null]];
export interface ISubLanguageElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字索引*/
	name:string
	/**描述*/
	desc:string
	/**英文*/
	Value:string
 } 
export class SubLanguageConfig extends ConfigBase<ISubLanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Horror Park Series*/
	get seriesOfWorks_01():ISubLanguageElement{return this.getElement(1)};
	/**Please input the display content*/
	get Brand_1():ISubLanguageElement{return this.getElement(2)};
	/**Confirm*/
	get UI_Dialog_1():ISubLanguageElement{return this.getElement(3)};
	/**Cancel*/
	get UI_Dialog_2():ISubLanguageElement{return this.getElement(4)};
	/**The input content contains illegal words; please re-enter*/
	get UI_Dialog_11():ISubLanguageElement{return this.getElement(5)};
	/**No ghosts were captured*/
	get camera_01():ISubLanguageElement{return this.getElement(6)};
	/**Captured <color=#00ff00ff>{0}</color>, image recorded has been unlocked*/
	get camera_02():ISubLanguageElement{return this.getElement(7)};
	/**Return to lobby*/
	get back_03():ISubLanguageElement{return this.getElement(8)};
	/**Do you want to go to {0}'s world?*/
	get go_01():ISubLanguageElement{return this.getElement(9)};
	/**Do you want to return to the lobby?*/
	get ReturnHall_01():ISubLanguageElement{return this.getElement(10)};
	/**Yes*/
	get ReturnHall_02():ISubLanguageElement{return this.getElement(11)};
	/**No*/
	get ReturnHall_03():ISubLanguageElement{return this.getElement(12)};
	/**Return to lobby*/
	get BackToHall_01():ISubLanguageElement{return this.getElement(13)};
	/**Locked*/
	get ghostLock_01():ISubLanguageElement{return this.getElement(14)};
	/**Shadow*/
	get ghostName_01():ISubLanguageElement{return this.getElement(15)};
	/**Haunt Isle
Blood Moon Minion 
Another "Me"*/
	get ghostUnlock_01():ISubLanguageElement{return this.getElement(16)};
	/**Dark Creatures*/
	get ghostType_01():ISubLanguageElement{return this.getElement(17)};
	/**null*/
	get ghostWeek_01():ISubLanguageElement{return this.getElement(18)};
	/**Background: I know everything about you... your existence, your fears... Why should I only be your shadow? Replace me, or be destroyed!*/
	get ghostBack_01():ISubLanguageElement{return this.getElement(19)};
	/**Nurse Pamni*/
	get ghostName_02():ISubLanguageElement{return this.getElement(20)};
	/**Asylum 
Wandering 
Everywhere*/
	get ghostUnlock_02():ISubLanguageElement{return this.getElement(21)};
	/**Red Moon Creature*/
	get ghostType_02():ISubLanguageElement{return this.getElement(22)};
	/**Seemingly unable to enter certain doors*/
	get ghostWeek_02():ISubLanguageElement{return this.getElement(23)};
	/**Background: Originally pure and kind creatures, they gradually lost themselves under the prolonged influence of the Red Moon. Even so, there is still a chance of salvation.*/
	get ghostBack_02():ISubLanguageElement{return this.getElement(24)};
	/**Pamni*/
	get ghostName_03():ISubLanguageElement{return this.getElement(25)};
	/**Crawling Pamni*/
	get ghostName_04():ISubLanguageElement{return this.getElement(26)};
	/**Shy Pamni*/
	get ghostName_05():ISubLanguageElement{return this.getElement(27)};
	/**Flashing Pamni*/
	get ghostName_06():ISubLanguageElement{return this.getElement(28)};
	/**Horror School 
Digital Circus 
Superstar*/
	get ghostUnlock_03():ISubLanguageElement{return this.getElement(29)};
	/**Horror School 
Unable to Stand and Walk 
Dark and Damp Places*/
	get ghostUnlock_04():ISubLanguageElement{return this.getElement(30)};
	/**Horror School 
Shy Twisted Personality 
Hiding with Dummies*/
	get ghostUnlock_05():ISubLanguageElement{return this.getElement(31)};
	/**Horror School 
Flashing
Only Appears on the Second Floor*/
	get ghostUnlock_06():ISubLanguageElement{return this.getElement(32)};
	/**Ordinary Undead*/
	get ghostType_03():ISubLanguageElement{return this.getElement(33)};
	/**Animal Undead*/
	get ghostType_04():ISubLanguageElement{return this.getElement(34)};
	/**Shy Undead*/
	get ghostType_05():ISubLanguageElement{return this.getElement(35)};
	/**Flashing Undead*/
	get ghostType_06():ISubLanguageElement{return this.getElement(36)};
	/**Fear of Magic Circles*/
	get ghostWeek_03():ISubLanguageElement{return this.getElement(37)};
	/**Extremely hungry, craving food*/
	get ghostWeek_04():ISubLanguageElement{return this.getElement(38)};
	/**Weakness: Staring at it is like magic; paralysis ensues*/
	get ghostWeek_05():ISubLanguageElement{return this.getElement(39)};
	/**Weakness: Confined to a fixed area*/
	get ghostWeek_06():ISubLanguageElement{return this.getElement(40)};
	/**Background: Pamni, who came from the Digital Circus and was controlled by the school's spirits, replicated Pamni's appearance, continuing to roam the school...*/
	get ghostBack_03():ISubLanguageElement{return this.getElement(41)};
	/**Background: Jack, the principal's beloved dog in the underground tunnels, fell victim to the Blood Moon's appearance, forcing the principal to take drastic measures. Jack, too, didn't survive and continues to use Pamni's body, seeking food in the sewers...*/
	get ghostBack_04():ISubLanguageElement{return this.getElement(42)};
	/**Background: There was a girl who used to spend afternoons in the chemistry classroom. She was shy and met her end here, harmed by students using chemicals. Her spirit was sealed in this classroom...*/
	get ghostBack_05():ISubLanguageElement{return this.getElement(43)};
	/**Background: The principal's office at school is strictly off-limits to students. They have never seen the principal enter the office directly. One day, a curious student followed the principal's route to the office but did not come out.*/
	get ghostBack_06():ISubLanguageElement{return this.getElement(44)};
	/**Anna*/
	get ghostName_07():ISubLanguageElement{return this.getElement(45)};
	/**Frank*/
	get ghostName_08():ISubLanguageElement{return this.getElement(46)};
	/**Tic*/
	get ghostName_09():ISubLanguageElement{return this.getElement(47)};
	/**Alice*/
	get ghostName_10():ISubLanguageElement{return this.getElement(48)};
	/**Jack*/
	get ghostName_11():ISubLanguageElement{return this.getElement(49)};
	/**Kelly*/
	get ghostName_12():ISubLanguageElement{return this.getElement(50)};
	/**Zombie Ville 
Shop 
Riverside*/
	get ghostUnlock_07():ISubLanguageElement{return this.getElement(51)};
	/**Zombie Ville
Wandering Everywhere 
Main Road*/
	get ghostUnlock_08():ISubLanguageElement{return this.getElement(52)};
	/**Zombie Ville
Scythe 
Always in the House*/
	get ghostUnlock_09():ISubLanguageElement{return this.getElement(53)};
	/**Zombie Ville
Staring at the Crossroads 
Red Pigtails*/
	get ghostUnlock_10():ISubLanguageElement{return this.getElement(54)};
	/**Zombie Ville
Plump 
Giant Knife*/
	get ghostUnlock_11():ISubLanguageElement{return this.getElement(55)};
	/**Zombie Ville
Loitering Near Home 
White Pigtails*/
	get ghostUnlock_12():ISubLanguageElement{return this.getElement(56)};
	/**Normal Zombie*/
	get ghostType_07():ISubLanguageElement{return this.getElement(57)};
	/**Normal Zombie*/
	get ghostType_08():ISubLanguageElement{return this.getElement(58)};
	/**Special Zombie*/
	get ghostType_09():ISubLanguageElement{return this.getElement(59)};
	/**Child Zombie*/
	get ghostType_10():ISubLanguageElement{return this.getElement(60)};
	/**Special Zombie*/
	get ghostType_11():ISubLanguageElement{return this.getElement(61)};
	/**Child Zombie*/
	get ghostType_12():ISubLanguageElement{return this.getElement(62)};
	/**Easily stunned*/
	get ghostWeek_07():ISubLanguageElement{return this.getElement(63)};
	/**Easily stunned*/
	get ghostWeek_08():ISubLanguageElement{return this.getElement(64)};
	/**Long stun duration*/
	get ghostWeek_09():ISubLanguageElement{return this.getElement(65)};
	/**Small movement area*/
	get ghostWeek_10():ISubLanguageElement{return this.getElement(66)};
	/**Slow movement*/
	get ghostWeek_11():ISubLanguageElement{return this.getElement(67)};
	/**No attacking ability*/
	get ghostWeek_12():ISubLanguageElement{return this.getElement(68)};
	/**Background: Anna had always been troubled by the repetitive and joyless life in her town, but everything changed with the appearance of the Blood Moon, as she became the first affected person.*/
	get ghostBack_07():ISubLanguageElement{return this.getElement(69)};
	/**Background: Frank appears serious and reserved, rarely smiling or seeming youthful. He has a distinctly old-fashioned air, but he harbors his own private world.*/
	get ghostBack_08():ISubLanguageElement{return this.getElement(70)};
	/**Background: He once wanted to be a pirate and put a scythe on his left hand, but his mother opposed. So, he became an expert in cutting wheat with his scythe and gained fame in the town.*/
	get ghostBack_09():ISubLanguageElement{return this.getElement(71)};
	/**Background: Alice, once the naughtiest kid in town, grew silent and violent after being influenced by the Blood Moon. She now stays at the crossroads all day.*/
	get ghostBack_10():ISubLanguageElement{return this.getElement(72)};
	/**Background: The town has only one butcher, who may look intimidating, but he is actually a very kind person. When the Blood Moon appeared, he was the first to step forward and use his huge knife to protect those who had not yet been affected by the moonlight.*/
	get ghostBack_11():ISubLanguageElement{return this.getElement(73)};
	/**Background: Kelly was the only person in town who was not affected by the Blood Moon. Before Jack was affected, he tried to protect her by locking her in a dark room. However, his efforts were in vain, and Kelly remained the only person in town who did not turn violent.*/
	get ghostBack_12():ISubLanguageElement{return this.getElement(74)};
	/**Not the same breed of item, move failed!*/
	get bag_01():ISubLanguageElement{return this.getElement(75)};
	/**Items*/
	get bag_02():ISubLanguageElement{return this.getElement(76)};
	/**Special*/
	get bag_03():ISubLanguageElement{return this.getElement(77)};
	/**Use*/
	get bag_04():ISubLanguageElement{return this.getElement(78)};
	/**Move*/
	get bag_05():ISubLanguageElement{return this.getElement(79)};
	/**Details*/
	get bag_06():ISubLanguageElement{return this.getElement(80)};
	/**Use*/
	get bag_07():ISubLanguageElement{return this.getElement(81)};
	/**Max*/
	get bag_08():ISubLanguageElement{return this.getElement(82)};
	/**Cancel*/
	get bag_09():ISubLanguageElement{return this.getElement(83)};
	/**Confirm*/
	get bag_10():ISubLanguageElement{return this.getElement(84)};
	/**Successfully Used*/
	get bag_11():ISubLanguageElement{return this.getElement(85)};
	/**Already at Maximum Quantity*/
	get bag_12():ISubLanguageElement{return this.getElement(86)};
	/**Too Much Potion!*/
	get bag_13():ISubLanguageElement{return this.getElement(87)};
	/**Mysterious Shop*/
	get shop_01():ISubLanguageElement{return this.getElement(100)};
	/**Purchase*/
	get shop_02():ISubLanguageElement{return this.getElement(101)};
	/**I Want It*/
	get shop_03():ISubLanguageElement{return this.getElement(102)};
	/**Default Sort*/
	get sort_01():ISubLanguageElement{return this.getElement(103)};
	/**Price ↑*/
	get sort_02():ISubLanguageElement{return this.getElement(104)};
	/**Price ↓*/
	get sort_03():ISubLanguageElement{return this.getElement(105)};
	/**Time Added ↑*/
	get sort_04():ISubLanguageElement{return this.getElement(106)};
	/**Time Added ↓*/
	get sort_05():ISubLanguageElement{return this.getElement(107)};
	/**Sort*/
	get sort_06():ISubLanguageElement{return this.getElement(108)};
	/**Tip*/
	get shoptips_01():ISubLanguageElement{return this.getElement(109)};
	/**Cancel*/
	get shoptips_02():ISubLanguageElement{return this.getElement(110)};
	/**Confirm*/
	get shoptips_03():ISubLanguageElement{return this.getElement(111)};
	/**Confirm using {0} Fear Coins to buy {1} {2}?*/
	get shoptips_04():ISubLanguageElement{return this.getElement(112)};
	/**Not Enough Fear Coins. Do you want to buy Fear Coins? Confirm*/
	get shoptips_05():ISubLanguageElement{return this.getElement(113)};
	/**Not enough tries left. Try again tomorrow!*/
	get shoptips_06():ISubLanguageElement{return this.getElement(114)};
	/**congratulations！*/
	get shop_04():ISubLanguageElement{return this.getElement(115)};
	/**Confirm*/
	get shop_05():ISubLanguageElement{return this.getElement(116)};
	/**Purchase*/
	get shop_06():ISubLanguageElement{return this.getElement(117)};
	/**Maximum*/
	get shop_07():ISubLanguageElement{return this.getElement(118)};
	/**Limited to: {0}*/
	get shop_08():ISubLanguageElement{return this.getElement(119)};
	/**Gift Package includes*/
	get shop_09():ISubLanguageElement{return this.getElement(120)};
	/**Click the "I Want It" button for surprises! There might even be a chance to get this item directly!*/
	get shop_10():ISubLanguageElement{return this.getElement(121)};
	/**All Tools*/
	get shop_11():ISubLanguageElement{return this.getElement(122)};
	/**BUFF*/
	get shop_12():ISubLanguageElement{return this.getElement(123)};
	/**Consumables*/
	get shop_13():ISubLanguageElement{return this.getElement(124)};
	/**Interactive Tools*/
	get shop_14():ISubLanguageElement{return this.getElement(125)};
	/**Gift Packs*/
	get shop_15():ISubLanguageElement{return this.getElement(126)};
	/**Congratulations! You've earned Fear Coins!*/
	get shop_16():ISubLanguageElement{return this.getElement(127)};
	/**Don't remind me next login*/
	get shop_17():ISubLanguageElement{return this.getElement(128)};
	/**Shop*/
	get shop_18():ISubLanguageElement{return this.getElement(129)};
	/**Doom*/
	get ghostName_13():ISubLanguageElement{return this.getElement(130)};
	/**Vivian*/
	get ghostName_14():ISubLanguageElement{return this.getElement(131)};
	/**Special Zombie*/
	get ghostType_13():ISubLanguageElement{return this.getElement(132)};
	/**Special Zombie*/
	get ghostType_14():ISubLanguageElement{return this.getElement(133)};
	/**Can't move during self-destruct.*/
	get ghostWeek_13():ISubLanguageElement{return this.getElement(134)};
	/**Use Detox Potion to prevent poisoning.*/
	get ghostWeek_14():ISubLanguageElement{return this.getElement(135)};
	/**Zombie Ville 
Crossroads
Red All Over*/
	get ghostUnlock_13():ISubLanguageElement{return this.getElement(136)};
	/**Zombie Ville
Near Villa
A Purple-Robed*/
	get ghostUnlock_14():ISubLanguageElement{return this.getElement(137)};
	/**Background: No One Knows Where Doom Came From. When He First Appeared in Town, He Looked Dangerous All Over, With No Part of Him Unmodified*/
	get ghostBack_13():ISubLanguageElement{return this.getElement(138)};
	/**Background: There's a mysterious witch in town. Rumor has it she pops up unexpectedly, using magic to tell fortunes and heal the townsfolk, but she can also cause harm when she wants to.*/
	get ghostBack_14():ISubLanguageElement{return this.getElement(139)};
	/**Fear Coins*/
	get money_01():ISubLanguageElement{return this.getElement(150)};
	/**G-coins*/
	get money_02():ISubLanguageElement{return this.getElement(151)};
	/**Team Jump ({0}/{1})*/
	get RouteTeam_01():ISubLanguageElement{return this.getElement(1001)};
	/**Proceed in {0} seconds*/
	get RouteTeam_02():ISubLanguageElement{return this.getElement(1002)};
	/**Received {0} Fear Coins*/
	get Currency_01():ISubLanguageElement{return this.getElement(2000)};
	/**Use {0} to continue the game?*/
	get ReItem_01():ISubLanguageElement{return this.getElement(3000)};
	/**Resurrection Successful*/
	get relife_success():ISubLanguageElement{return this.getElement(3001)};
	/**Not enough Fear Coins to purchase*/
	get buy_nomoney():ISubLanguageElement{return this.getElement(3002)};
	/**This tool cannot be used in the current game*/
	get UI_Item_UseLimit():ISubLanguageElement{return this.getElement(3003)};
	/**Angel's Blessing*/
	get UI_item_10000():ISubLanguageElement{return this.getElement(10000)};
	/**Potion S*/
	get UI_item_10001():ISubLanguageElement{return this.getElement(10001)};
	/**Potion M*/
	get UI_item_10002():ISubLanguageElement{return this.getElement(10002)};
	/**Potion L*/
	get UI_item_10003():ISubLanguageElement{return this.getElement(10003)};
	/**Vitality Pill*/
	get UI_item_10004():ISubLanguageElement{return this.getElement(10004)};
	/**2xEXP Card*/
	get UI_item_10005():ISubLanguageElement{return this.getElement(10005)};
	/**1D 2xEXP Card*/
	get UI_item_10006():ISubLanguageElement{return this.getElement(10006)};
	/**3D 2xEXP Card*/
	get UI_item_10007():ISubLanguageElement{return this.getElement(10007)};
	/**7D 2x EXP Card*/
	get UI_item_10008():ISubLanguageElement{return this.getElement(10008)};
	/**1D 3x EXP Card*/
	get UI_item_10009():ISubLanguageElement{return this.getElement(10009)};
	/**S Gift Pack*/
	get UI_item_10010():ISubLanguageElement{return this.getElement(10010)};
	/**M Gift Pack*/
	get UI_item_10011():ISubLanguageElement{return this.getElement(10011)};
	/**L Gift Pack*/
	get UI_item_10012():ISubLanguageElement{return this.getElement(10012)};
	/**Inspiration Bulb*/
	get UI_item_10013():ISubLanguageElement{return this.getElement(10013)};
	/**Cupid Effect*/
	get UI_item_10014():ISubLanguageElement{return this.getElement(10014)};
	/**Snowball*/
	get UI_item_10015():ISubLanguageElement{return this.getElement(10015)};
	/**Slap Effect*/
	get UI_item_10016():ISubLanguageElement{return this.getElement(10016)};
	/**Chicken Effect*/
	get UI_item_10017():ISubLanguageElement{return this.getElement(10017)};
	/**Cheer Effect*/
	get UI_item_10018():ISubLanguageElement{return this.getElement(10018)};
	/**Revive S Gift Pack*/
	get UI_item_10019():ISubLanguageElement{return this.getElement(10019)};
	/**Revive L Gift Pack*/
	get UI_item_10020():ISubLanguageElement{return this.getElement(10020)};
	/**Exchange for {0}?*/
	get packbuy_01():ISubLanguageElement{return this.getElement(10101)};
	/**Open {0} Gift Pack*/
	get packbuy_02():ISubLanguageElement{return this.getElement(10102)};
	/**Common*/
	get quality_01():ISubLanguageElement{return this.getElement(10103)};
	/**Rare*/
	get quality_02():ISubLanguageElement{return this.getElement(10104)};
	/**SR*/
	get quality_03():ISubLanguageElement{return this.getElement(10105)};
	/**Epic*/
	get quality_04():ISubLanguageElement{return this.getElement(10106)};
	/**Legendary*/
	get quality_05():ISubLanguageElement{return this.getElement(10107)};
	/**Fear Coins*/
	get UI_item_10200():ISubLanguageElement{return this.getElement(10200)};
	/**null*/
	get UI_item_10201():ISubLanguageElement{return this.getElement(10201)};
	/**null*/
	get UI_item_10202():ISubLanguageElement{return this.getElement(10202)};
	/**null*/
	get UI_item_10203():ISubLanguageElement{return this.getElement(10203)};
	/**Contains the protective power of angels. Can consume 1 Angel's Blessing to resurrect directly upon death, and your data will be retained.*/
	get UI_des_00():ISubLanguageElement{return this.getElement(10300)};
	/**Special medicine, 
a portable healing potion. Use to restore 20 HP.*/
	get UI_des_01():ISubLanguageElement{return this.getElement(10301)};
	/**Special medicine, 
a portable healing potion. Use to restore 40 HP.*/
	get UI_des_02():ISubLanguageElement{return this.getElement(10302)};
	/**Special medicine, 
a portable healing potion. Use to restore 70 HP.*/
	get UI_des_03():ISubLanguageElement{return this.getElement(10303)};
	/**Special medicine, 
a portable healing potion. Use to restore 100 HP.*/
	get UI_des_04():ISubLanguageElement{return this.getElement(10304)};
	/**After use, complete a game to receive double experience.*/
	get UI_des_05():ISubLanguageElement{return this.getElement(10305)};
	/**After use, each game completed within a day will have double experience.*/
	get UI_des_06():ISubLanguageElement{return this.getElement(10306)};
	/**After use, each game completed within three days will have double experience.*/
	get UI_des_07():ISubLanguageElement{return this.getElement(10307)};
	/**After use, each game completed within seven days will have double experience.*/
	get UI_des_08():ISubLanguageElement{return this.getElement(10308)};
	/**After use, each game completed within a day will have triple experience.*/
	get UI_des_09():ISubLanguageElement{return this.getElement(10309)};
	/**Open to get one of the following prizes: Angel's Blessing, Small Potion, Snowball Effect, Slap Effect, 15 Fear Coins, 5 Fear Coins.*/
	get UI_des_10():ISubLanguageElement{return this.getElement(10310)};
	/**Open to get one of the following prizes: Angel's Blessing, Double Experience Card for One Day, Double Experience Card for Three Days, Medium Potion, Chicken Leg Effect, Cheer Effect, 25 Fear Coins, 5 Fear Coins.*/
	get UI_des_11():ISubLanguageElement{return this.getElement(10311)};
	/**Open to get one of the following prizes: Angel's Blessing, Triple Experience Card for One Day, Double Experience Card for Three Days, Double Experience Card for Seven Days, Large Potion, Vitality Pill, Cupid Effect, Inspiration Bulb, 50 Fear Coins, 25 Fear Coins, 10 Fear Coins.*/
	get UI_des_12():ISubLanguageElement{return this.getElement(10312)};
	/**Bulb with lots of inspiration. 
Can consume bulbs to gain puzzle inspiration when decrypting.*/
	get UI_des_13():ISubLanguageElement{return this.getElement(10313)};
	/**After use, you can have special interactions with other players.*/
	get UI_des_14():ISubLanguageElement{return this.getElement(10314)};
	/**After use, you can have special interactions with other players.*/
	get UI_des_15():ISubLanguageElement{return this.getElement(10315)};
	/**After use, you can have special interactions with other players.*/
	get UI_des_16():ISubLanguageElement{return this.getElement(10316)};
	/**After use, you can have special interactions with other players.*/
	get UI_des_17():ISubLanguageElement{return this.getElement(10317)};
	/**After use, you can have special interactions with other players.*/
	get UI_des_18():ISubLanguageElement{return this.getElement(10318)};
	/**Receive 6 Angel's Blessings after use.*/
	get UI_des_19():ISubLanguageElement{return this.getElement(10319)};
	/**Receive 12 Angel's Blessings after use.*/
	get UI_des_20():ISubLanguageElement{return this.getElement(10320)};
	/**Ending A - Endless Threat*/
	get Ending_hospital_Title1():ISubLanguageElement{return this.getElement(10400)};
	/**Ending X - Glorious Hymn*/
	get Ending_hospital_Title2():ISubLanguageElement{return this.getElement(10401)};
	/**Ending S - Guiding Force*/
	get Ending_hospital_Title3():ISubLanguageElement{return this.getElement(10402)};
	/**Ending T - Embrace The Darkness*/
	get Ending_hospital_Title4():ISubLanguageElement{return this.getElement(10403)};
	/**Ending 2: Echoes of Despair*/
	get Ending_school_Title1():ISubLanguageElement{return this.getElement(10404)};
	/**Ending 1: Nightmare Beyond*/
	get Ending_school_Title2():ISubLanguageElement{return this.getElement(10405)};
	/**End 3: Holy Redemption*/
	get Ending_school_Title3():ISubLanguageElement{return this.getElement(10406)};
	/**Ending Two: Escape from the Abyss*/
	get Ending_Town_Title1():ISubLanguageElement{return this.getElement(10407)};
	/**Ending One: Extinguished Light*/
	get Ending_Town_Title2():ISubLanguageElement{return this.getElement(10408)};
	/**Ending Three: Lifting the Curse*/
	get Ending_Town_Title3():ISubLanguageElement{return this.getElement(10409)};
	/**Ending Four: Hidden Secrets*/
	get Ending_Town_Title4():ISubLanguageElement{return this.getElement(10410)};
	/**Obtain by by picking up in the scene or playing games.*/
	get UI_des_200():ISubLanguageElement{return this.getElement(10500)};
	/**Lollipop*/
	get UI_item_11011():ISubLanguageElement{return this.getElement(11011)};
	/**Plane*/
	get UI_item_11012():ISubLanguageElement{return this.getElement(11012)};
	/**Bomb*/
	get UI_item_11013():ISubLanguageElement{return this.getElement(11013)};
	/**Pumpkin*/
	get UI_item_11014():ISubLanguageElement{return this.getElement(11014)};
	/**Race Car*/
	get UI_item_11015():ISubLanguageElement{return this.getElement(11015)};
	/**Lipstick*/
	get UI_item_11016():ISubLanguageElement{return this.getElement(11016)};
	/**Balloon*/
	get UI_item_11017():ISubLanguageElement{return this.getElement(11017)};
	/**Team*/
	get UI_diffi_3():ISubLanguageElement{return this.getElement(11020)};
	/**Normal*/
	get UI_diffi_4():ISubLanguageElement{return this.getElement(11021)};
	/**Hard*/
	get UI_diffi_5():ISubLanguageElement{return this.getElement(11022)};
	/**Nightmare*/
	get UI_diffi_6():ISubLanguageElement{return this.getElement(11023)};
	/**Hell*/
	get UI_diffi_7():ISubLanguageElement{return this.getElement(11024)};
	/**Team up*/
	get Team_UI():ISubLanguageElement{return this.getElement(11025)};
	/**{0} EXP until next level.
Gain EXP by playing or over time.*/
	get UI_EXPtips():ISubLanguageElement{return this.getElement(12004)};
	/**Wooden Board*/
	get UI_item_1200():ISubLanguageElement{return this.getElement(12005)};
	/**Add Friend*/
	get UI_addfriends():ISubLanguageElement{return this.getElement(12006)};
	/**{0} MP until next level.
Earn mischief points by liking and receiving gifts.*/
	get UI_PopularExp():ISubLanguageElement{return this.getElement(12007)};
	/**Bio (30 characters)*/
	get UI_Sign():ISubLanguageElement{return this.getElement(12008)};
	/**A camera that captures ghostly spirits.*/
	get UI_des_999():ISubLanguageElement{return this.getElement(12009)};
	/**1k Fear Coins*/
	get UI_item_20001():ISubLanguageElement{return this.getElement(13000)};
	/**6k Fear Coins*/
	get UI_item_20002():ISubLanguageElement{return this.getElement(13001)};
	/**10k Fear Coins*/
	get UI_item_20003():ISubLanguageElement{return this.getElement(13002)};
	/**18k Fear Coins*/
	get UI_item_20004():ISubLanguageElement{return this.getElement(13003)};
	/**30k Fear Coins*/
	get UI_item_20005():ISubLanguageElement{return this.getElement(13004)};
	/**48k Fear Coins*/
	get UI_item_20006():ISubLanguageElement{return this.getElement(13005)};
	/**64k Fear Coins*/
	get UI_item_20007():ISubLanguageElement{return this.getElement(13006)};
	/**Daily Limited Pack*/
	get UI_item_10021():ISubLanguageElement{return this.getElement(13007)};
	/**Weekly Limited Pack*/
	get UI_item_10022():ISubLanguageElement{return this.getElement(13008)};
	/**Monthly Limited Pack*/
	get UI_item_10023():ISubLanguageElement{return this.getElement(13009)};
	/**Pink Sweetheart Pack*/
	get UI_item_10024():ISubLanguageElement{return this.getElement(13010)};
	/**Open to get: 100, 300, or 1k Fear Coins.*/
	get UI_des_10021():ISubLanguageElement{return this.getElement(13011)};
	/**Open for 200 Fear Coins and an item.*/
	get UI_des_10022():ISubLanguageElement{return this.getElement(13012)};
	/**Open for 1k Fear Coins and an item.*/
	get UI_des_10023():ISubLanguageElement{return this.getElement(13013)};
	/**Chance to get a Cake Sweetheart reward.*/
	get UI_des_10024():ISubLanguageElement{return this.getElement(13014)};
	/**Activate for {0}. Receive {1} daily.*/
	get UI_text_tequandescMonthly():ISubLanguageElement{return this.getElement(13015)};
	/**Poisoned*/
	get buff_01():ISubLanguageElement{return this.getElement(13100)};
	/**Immune to Poison*/
	get buff_02():ISubLanguageElement{return this.getElement(13101)};
	/**Bleeding*/
	get buff_03():ISubLanguageElement{return this.getElement(13102)};
	/**null*/
	get UI_item_21001():ISubLanguageElement{return this.getElement(16001)};
	/**null*/
	get UI_item_21002():ISubLanguageElement{return this.getElement(16002)};
	/**null*/
	get UI_des_21001():ISubLanguageElement{return this.getElement(16003)};
	/**null*/
	get UI_item_21003():ISubLanguageElement{return this.getElement(16004)};
	/**null*/
	get UI_item_21004():ISubLanguageElement{return this.getElement(16005)};
	/**null*/
	get UI_des_21002():ISubLanguageElement{return this.getElement(16006)};
	/**null*/
	get UI_checkIn_01():ISubLanguageElement{return this.getElement(20000)};
	/**null*/
	get UI_checkIn_02():ISubLanguageElement{return this.getElement(20001)};
	/**null*/
	get UI_checkIn_03():ISubLanguageElement{return this.getElement(20002)};
	/**null*/
	get UI_checkIn_04():ISubLanguageElement{return this.getElement(20003)};
	/**null*/
	get UI_checkIn_05():ISubLanguageElement{return this.getElement(20004)};
	/**null*/
	get UI_checkIn_06():ISubLanguageElement{return this.getElement(20005)};
	/**null*/
	get UI_checkIn_07():ISubLanguageElement{return this.getElement(20006)};
	/**null*/
	get UI_checkIn_08():ISubLanguageElement{return this.getElement(20007)};
	/**null*/
	get UI_checkIn_09():ISubLanguageElement{return this.getElement(20008)};
	/**null*/
	get UI_checkIn_10():ISubLanguageElement{return this.getElement(20009)};
	/**null*/
	get UI_checkIn_11():ISubLanguageElement{return this.getElement(20010)};
	/**null*/
	get UI_checkIn_12():ISubLanguageElement{return this.getElement(20011)};
	/**null*/
	get UI_checkIn_13():ISubLanguageElement{return this.getElement(20012)};
	/**null*/
	get UI_checkIn_14():ISubLanguageElement{return this.getElement(20013)};
	/**null*/
	get UI_item_51004():ISubLanguageElement{return this.getElement(20014)};
	/**null*/
	get UI_desc_51004():ISubLanguageElement{return this.getElement(20015)};
	/**null*/
	get UI_find_itemname():ISubLanguageElement{return this.getElement(20016)};
	/**Monthly Pass*/
	get UI_item_50001():ISubLanguageElement{return this.getElement(50001)};
	/**Seasonal Pass*/
	get UI_item_50002():ISubLanguageElement{return this.getElement(50002)};
	/**Activated to receive 30k Fear Coins immediately, and 1k Fear Coins daily during the monthly pass period.*/
	get UI_desc_50001():ISubLanguageElement{return this.getElement(50003)};
	/**Activated to receive 90k Fear Coins immediately, and 3k Fear Coins daily during the monthly pass period.*/
	get UI_desc_50002():ISubLanguageElement{return this.getElement(50004)};
	/**You can still open {0} chests today.*/
	get UI_treasurebox_99():ISubLanguageElement{return this.getElement(50005)};
	/**Go to the gate to start the game.*/
	get UI_guide_01():ISubLanguageElement{return this.getElement(50006)};
	/**Open to get: 100, 300, or 1,000 Fear Coins*/
	get UI_item_10100():ISubLanguageElement{return this.getElement(50007)};
	/**Guaranteed to receive 200 Fear Coins and an extra item when opened.*/
	get UI_item_10101():ISubLanguageElement{return this.getElement(50008)};
	/**Guaranteed to receive 1,000 Fear Coins and an extra item when opened.*/
	get UI_item_10102():ISubLanguageElement{return this.getElement(50009)};
	/**1k Fear Coins*/
	get UI_item_11000():ISubLanguageElement{return this.getElement(50010)};
	/**6k Fear Coins*/
	get UI_item_11001():ISubLanguageElement{return this.getElement(50011)};
	/**10k Fear Coins*/
	get UI_item_11002():ISubLanguageElement{return this.getElement(50012)};
	/**18k Fear Coins*/
	get UI_item_11003():ISubLanguageElement{return this.getElement(50013)};
	/**30k Fear Coins*/
	get UI_item_11004():ISubLanguageElement{return this.getElement(50014)};
	/**48k Fear Coins*/
	get UI_item_11005():ISubLanguageElement{return this.getElement(50015)};
	/**64k Fear Coins*/
	get UI_item_11006():ISubLanguageElement{return this.getElement(50016)};
	/**Monthly Pass*/
	get UI_item_11007():ISubLanguageElement{return this.getElement(50017)};
	/**Seasonal Pass*/
	get UI_item_11008():ISubLanguageElement{return this.getElement(50018)};
	/**Guaranteed to receive a complete set of modern-style furniture when opened.*/
	get UI_item_10500():ISubLanguageElement{return this.getElement(50019)};
	/**Guaranteed to receive a complete set of classical-style furniture when opened.*/
	get UI_item_10501():ISubLanguageElement{return this.getElement(50020)};
	/**Guaranteed to receive a complete set of blue-style furniture when opened.*/
	get UI_item_10502():ISubLanguageElement{return this.getElement(50021)};
	/**Guaranteed to receive a complete set of pink-style furniture when opened.*/
	get UI_item_10503():ISubLanguageElement{return this.getElement(50022)};
	/**Guaranteed to receive 5 various iron defense measures when opened.*/
	get UI_item_10504():ISubLanguageElement{return this.getElement(50023)};
	/**Guaranteed to receive 5 various gold defense measures when opened.*/
	get UI_item_10505():ISubLanguageElement{return this.getElement(50024)};
	/**Guaranteed to receive 5 various diamond defense measures when opened.*/
	get UI_item_10506():ISubLanguageElement{return this.getElement(50025)};
	/**If you don't like houses, then this is definitely your best choice.*/
	get UI_item_13000():ISubLanguageElement{return this.getElement(50026)};
	/**Modern luxury cottage, providing you with a sense of security in the apocalypse.*/
	get UI_item_13001():ISubLanguageElement{return this.getElement(50027)};
	/**Super luxurious villa, the highest level of the end of the world feeling.*/
	get UI_item_13002():ISubLanguageElement{return this.getElement(50028)};
	/**Barbie cottage bursting with pink girlishness, super cute.*/
	get UI_item_13003():ISubLanguageElement{return this.getElement(50029)};
	/**Activate to receive immediately*/
	get UI_shop_240():ISubLanguageElement{return this.getElement(50030)};
	/**Daily Claim*/
	get UI_shop_241():ISubLanguageElement{return this.getElement(50031)};
	/**You're not eligible yet*/
	get UI_npctalk():ISubLanguageElement{return this.getElement(50036)};
	/**Close*/
	get UI_Closeprompt_01():ISubLanguageElement{return this.getElement(50037)};
	/**Level up*/
	get UI_LvUp_01():ISubLanguageElement{return this.getElement(50038)};
	/**Use*/
	get UI_bag_01():ISubLanguageElement{return this.getElement(50039)};
	/**Move*/
	get UI_bag_02():ISubLanguageElement{return this.getElement(50040)};
	/**Detail*/
	get UI_bag_03():ISubLanguageElement{return this.getElement(50041)};
	/**Daily free treasurebox haven't been gotten yet.*/
	get UI_bag_04():ISubLanguageElement{return this.getElement(51001)};
	/**Sending Successfully*/
	get UI_sendfriend():ISubLanguageElement{return this.getElement(51002)};
	/**He did not fill out his signature*/
	get UI_nosign():ISubLanguageElement{return this.getElement(51003)};
	/**Use Props*/
	get ReItem_02():ISubLanguageElement{return this.getElement(52001)};
	/**Escape Failed*/
	get ReItem_03():ISubLanguageElement{return this.getElement(52002)};
	/**null*/
	get UI_item_name_10100():ISubLanguageElement{return this.getElement(52003)};
	/**null*/
	get UI_item_tip_10100():ISubLanguageElement{return this.getElement(52004)};
	/**null*/
	get UI_item_des_10100():ISubLanguageElement{return this.getElement(52005)};
	/**null*/
	get UI_item_Chicken01():ISubLanguageElement{return this.getElement(52006)};
	/**null*/
	get UI_item_Chicken02():ISubLanguageElement{return this.getElement(52007)};
	/**null*/
	get UI_item_Chicken03():ISubLanguageElement{return this.getElement(52008)};
	/**null*/
	get UI_item_Chicken04():ISubLanguageElement{return this.getElement(52009)};
	/**Shop Loading...*/
	get UI_Tips_shoploading():ISubLanguageElement{return this.getElement(52010)};
	/**null*/
	get UI_item_51001():ISubLanguageElement{return this.getElement(52011)};
	/**null*/
	get UI_item_51002():ISubLanguageElement{return this.getElement(52012)};
	/**null*/
	get UI_desc_51001():ISubLanguageElement{return this.getElement(52013)};
	/**null*/
	get UI_desc_51002():ISubLanguageElement{return this.getElement(52014)};
	/**null*/
	get UI_item_Chicken05():ISubLanguageElement{return this.getElement(52015)};
	/**null*/
	get GhostName_15():ISubLanguageElement{return this.getElement(81001)};
	/**null*/
	get ghostName_15():ISubLanguageElement{return this.getElement(81002)};
	/**null*/
	get GhostName_16():ISubLanguageElement{return this.getElement(81003)};
	/**null*/
	get ghostName_16():ISubLanguageElement{return this.getElement(81004)};
	/**null*/
	get ghostUnlock_15():ISubLanguageElement{return this.getElement(82001)};
	/**null*/
	get ghostUnlock_16():ISubLanguageElement{return this.getElement(82002)};
	/**null*/
	get ghostUnlock_17():ISubLanguageElement{return this.getElement(82003)};
	/**null*/
	get ghostUnlock_18():ISubLanguageElement{return this.getElement(82004)};
	/**null*/
	get ghostType_15():ISubLanguageElement{return this.getElement(83001)};
	/**null*/
	get ghostType_16():ISubLanguageElement{return this.getElement(83002)};
	/**null*/
	get ghostType_17():ISubLanguageElement{return this.getElement(83003)};
	/**null*/
	get ghostType_18():ISubLanguageElement{return this.getElement(83004)};
	/**null*/
	get ghostWeek_15():ISubLanguageElement{return this.getElement(84001)};
	/**null*/
	get ghostWeek_16():ISubLanguageElement{return this.getElement(84002)};
	/**null*/
	get ghostWeek_17():ISubLanguageElement{return this.getElement(84003)};
	/**null*/
	get ghostWeek_18():ISubLanguageElement{return this.getElement(84004)};
	/**null*/
	get ghostBack_15():ISubLanguageElement{return this.getElement(85001)};
	/**null*/
	get ghostBack_16():ISubLanguageElement{return this.getElement(85002)};
	/**null*/
	get ghostBack_17():ISubLanguageElement{return this.getElement(85003)};
	/**null*/
	get ghostBack_18():ISubLanguageElement{return this.getElement(85004)};
	/**null*/
	get UI_main_07():ISubLanguageElement{return this.getElement(86000)};
	/**null*/
	get UI_item_tip_20001():ISubLanguageElement{return this.getElement(88001)};
	/**null*/
	get UI_item_tip_20002():ISubLanguageElement{return this.getElement(88002)};
	/**Currently poisoned, with reduced movement and health regeneration.*/
	get buff_des_01():ISubLanguageElement{return this.getElement(131500)};
	/**Gain temporary immunity to poison.*/
	get buff_des_02():ISubLanguageElement{return this.getElement(131501)};
	/**Currently bleeding, losing health over time.*/
	get buff_des_03():ISubLanguageElement{return this.getElement(131502)};
	/**Sold Out*/
	get UI_Popup_01():ISubLanguageElement{return this.getElement(300001)};
	/**Recommended*/
	get UI_Popup_02():ISubLanguageElement{return this.getElement(300002)};
	/**Don't show again today*/
	get UI_Popup_03():ISubLanguageElement{return this.getElement(300003)};
	/**{0}D remaining*/
	get UI_Popup_04():ISubLanguageElement{return this.getElement(300004)};
	/**{0} chests can still be opened*/
	get UI_treasurebox_01():ISubLanguageElement{return this.getElement(310001)};
	/**Daily Chest*/
	get UI_treasurebox_02():ISubLanguageElement{return this.getElement(310002)};
	/**Congratulations!*/
	get UI_treasurebox_03():ISubLanguageElement{return this.getElement(310003)};
	/**Tap any where to close*/
	get UI_treasurebox_04():ISubLanguageElement{return this.getElement(310004)};
	/**Prize Pool*/
	get UI_treasurebox_06():ISubLanguageElement{return this.getElement(310006)};
	/**Chance to win various rewards.*/
	get UI_treasurebox_07():ISubLanguageElement{return this.getElement(310007)};
	/**Tap any where to close*/
	get UI_treasurebox_08():ISubLanguageElement{return this.getElement(310008)};
	/**Open chest for a random reward*/
	get UI_treasurebox_09():ISubLanguageElement{return this.getElement(310009)};
	/**Open*/
	get UI_treasurebox_10():ISubLanguageElement{return this.getElement(310010)};
	/**Purchase*/
	get UI_shop_01():ISubLanguageElement{return this.getElement(320001)};
	/**Max*/
	get UI_shop_02():ISubLanguageElement{return this.getElement(320002)};
	/**Discounted Fear Coin items by {0}%*/
	get UI_shop_03():ISubLanguageElement{return this.getElement(320003)};
	/**Chance to Get*/
	get UI_shop_04():ISubLanguageElement{return this.getElement(320004)};
	/**Mystery Shop*/
	get UI_shop_05():ISubLanguageElement{return this.getElement(320005)};
	/**Back*/
	get UI_shop_06():ISubLanguageElement{return this.getElement(320006)};
	/**Tip*/
	get UI_shop_07():ISubLanguageElement{return this.getElement(320007)};
	/**Confirm*/
	get UI_shop_08():ISubLanguageElement{return this.getElement(320008)};
	/**Cancel*/
	get UI_shop_09():ISubLanguageElement{return this.getElement(320009)};
	/**Congratulations!*/
	get UI_shop_10():ISubLanguageElement{return this.getElement(320010)};
	/**Click 'I Want It' for a chance to get this item.*/
	get UI_shop_11():ISubLanguageElement{return this.getElement(320011)};
	/**Skin*/
	get UI_shop_12():ISubLanguageElement{return this.getElement(320012)};
	/**Consumables*/
	get UI_shop_13():ISubLanguageElement{return this.getElement(320013)};
	/**Interactive Items*/
	get UI_shop_14():ISubLanguageElement{return this.getElement(320014)};
	/**Gift Packs*/
	get UI_shop_15():ISubLanguageElement{return this.getElement(320015)};
	/**Monthly Pass*/
	get UI_shop_16():ISubLanguageElement{return this.getElement(320016)};
	/**Top-up*/
	get UI_shop_17():ISubLanguageElement{return this.getElement(320017)};
	/**CM*/
	get UI_shop_18():ISubLanguageElement{return this.getElement(320018)};
	/**D, W, M Packs*/
	get UI_shop_19():ISubLanguageElement{return this.getElement(320019)};
	/**All Items*/
	get UI_shop_20():ISubLanguageElement{return this.getElement(320020)};
	/**Activated*/
	get UI_shop_21():ISubLanguageElement{return this.getElement(320021)};
	/**Monthly Pass and Seasonal Pass can be used together*/
	get UI_shop_22():ISubLanguageElement{return this.getElement(320022)};
	/**10% discount on Fear Coin items*/
	get UI_shop_23():ISubLanguageElement{return this.getElement(320023)};
	/**Activate now to get: 30k
Receive daily: 1k*/
	get UI_shop_24():ISubLanguageElement{return this.getElement(320024)};
	/**{0} days left*/
	get UI_shop_25():ISubLanguageElement{return this.getElement(320025)};
	/**Fear Coins can be accumulated when offline*/
	get UI_shop_26():ISubLanguageElement{return this.getElement(320026)};
	/**3k G-coins*/
	get UI_shop_27():ISubLanguageElement{return this.getElement(320027)};
	/**Supreme Seasonal Pass*/
	get UI_shop_28():ISubLanguageElement{return this.getElement(320028)};
	/**Privilege Monthly Pass*/
	get UI_shop_29():ISubLanguageElement{return this.getElement(320029)};
	/**House Skins: Melody City*/
	get UI_item_12000():ISubLanguageElement{return this.getElement(330001)};
	/**House Skins: Pink Barbie*/
	get UI_item_12001():ISubLanguageElement{return this.getElement(330002)};
	/**House Skins: Modern Cabin*/
	get UI_item_12002():ISubLanguageElement{return this.getElement(330003)};
	/**House Skins: Luxury Villa*/
	get UI_item_12003():ISubLanguageElement{return this.getElement(330004)};
	/**House Skins: Brave Plains*/
	get UI_item_12004():ISubLanguageElement{return this.getElement(330005)};
	/**Unlock skin automatically in Haunt Isle: Melody City*/
	get UI_des_120000():ISubLanguageElement{return this.getElement(330006)};
	/**Unlock skin automatically in Haunt Isle: Pink Barbie*/
	get UI_des_120010():ISubLanguageElement{return this.getElement(330007)};
	/**Unlock skin automatically in Haunt Isle: Modern Cabin*/
	get UI_des_120020():ISubLanguageElement{return this.getElement(330008)};
	/**Unlock skin automatically in Haunt Isle: Luxury Villa*/
	get UI_des_120030():ISubLanguageElement{return this.getElement(330009)};
	/**Unlock skin automatically in Haunt Isle: Brave Plains*/
	get UI_des_120040():ISubLanguageElement{return this.getElement(330010)};
	/**Receive 1k Fear Coins immediately*/
	get UI_des_200010():ISubLanguageElement{return this.getElement(330011)};
	/**Receive 6k Fear Coins immediately*/
	get UI_des_200020():ISubLanguageElement{return this.getElement(330012)};
	/**Receive 10k Fear Coins immediately*/
	get UI_des_200030():ISubLanguageElement{return this.getElement(330013)};
	/**Receive 18k Fear Coins immediately*/
	get UI_des_200040():ISubLanguageElement{return this.getElement(330014)};
	/**Receive 30k Fear Coins immediately*/
	get UI_des_200050():ISubLanguageElement{return this.getElement(330015)};
	/**Receive 48k Fear Coins immediately*/
	get UI_des_200060():ISubLanguageElement{return this.getElement(330016)};
	/**Receive 64k Fear Coins immediately*/
	get UI_des_200070():ISubLanguageElement{return this.getElement(330017)};
	/**Lollipop*/
	get UI_gift_01():ISubLanguageElement{return this.getElement(340001)};
	/**Balloon*/
	get UI_gift_02():ISubLanguageElement{return this.getElement(340002)};
	/**Bomb*/
	get UI_gift_03():ISubLanguageElement{return this.getElement(340003)};
	/**Pumpkin*/
	get UI_gift_04():ISubLanguageElement{return this.getElement(340004)};
	/**Lipstick*/
	get UI_gift_05():ISubLanguageElement{return this.getElement(340005)};
	/**Race Car*/
	get UI_gift_06():ISubLanguageElement{return this.getElement(340006)};
	/**Plane*/
	get UI_gift_07():ISubLanguageElement{return this.getElement(340007)};
	/**2xEXP Card*/
	get UI_buff_01():ISubLanguageElement{return this.getElement(340008)};
	/**3xEXP Card*/
	get UI_buff_02():ISubLanguageElement{return this.getElement(340009)};
	/**Duration: Days*/
	get UI_bufftype_01():ISubLanguageElement{return this.getElement(340010)};
	/**EXP Card*/
	get UI_buffdesc_01():ISubLanguageElement{return this.getElement(340011)};
	/**Inspiration Bulb used, check out marked locations now*/
	get UI_lightBulbUsed_01():ISubLanguageElement{return this.getElement(340012)};
	/**Claimed Today*/
	get UI_others_01():ISubLanguageElement{return this.getElement(350001)};
	/**{0} G-coins*/
	get UI_others_02():ISubLanguageElement{return this.getElement(350002)};
	/**Claim {0} Fear Coins*/
	get UI_others_03():ISubLanguageElement{return this.getElement(350003)};
	/**Get {0} Fear Coins*/
	get UI_others_04():ISubLanguageElement{return this.getElement(350004)};
	/**Current Skin*/
	get UI_others_05():ISubLanguageElement{return this.getElement(350005)};
	/**Switch Skin*/
	get UI_others_06():ISubLanguageElement{return this.getElement(350006)};
	/**Go Buy*/
	get UI_others_07():ISubLanguageElement{return this.getElement(350007)};
	/**Please complete the tutorial first*/
	get UI_others_08():ISubLanguageElement{return this.getElement(350008)};
	/**Not Obtained*/
	get UI_others_09():ISubLanguageElement{return this.getElement(350009)};
	/**Free*/
	get UI_others_10():ISubLanguageElement{return this.getElement(350010)};
	/**Daily Limit {0}/{1}*/
	get UI_others_11():ISubLanguageElement{return this.getElement(350011)};
	/**Purchase Successful*/
	get UI_others_12():ISubLanguageElement{return this.getElement(350012)};
	/**AD not ready*/
	get UI_others_13():ISubLanguageElement{return this.getElement(350013)};
	/**Weekly Limit {0}/{1}*/
	get UI_others_14():ISubLanguageElement{return this.getElement(350014)};
	/**Monthly Limit {0}/{1}*/
	get UI_others_15():ISubLanguageElement{return this.getElement(350015)};
	/**PP Limit {0}/{1}*/
	get UI_others_16():ISubLanguageElement{return this.getElement(350016)};
	/**Rare*/
	get UI_others_17():ISubLanguageElement{return this.getElement(350017)};
	/**Fear Coins x500*/
	get UI_others_18():ISubLanguageElement{return this.getElement(350018)};
	/**Tap screen to speed up opening*/
	get UI_others_19():ISubLanguageElement{return this.getElement(350019)};
	/**Amazing!*/
	get UI_others_20():ISubLanguageElement{return this.getElement(350020)};
	/**Continue*/
	get UI_others_21():ISubLanguageElement{return this.getElement(350021)};
	/**OK*/
	get UI_others_22():ISubLanguageElement{return this.getElement(350022)};
	/**Today's Free Openings Remaining: {0}*/
	get Code_001():ISubLanguageElement{return this.getElement(400001)};
	/**Pack Exhausted*/
	get Code_002():ISubLanguageElement{return this.getElement(400002)};
	/**Already Owned*/
	get Code_003():ISubLanguageElement{return this.getElement(400003)};
	/**Guaranteed*/
	get Code_004():ISubLanguageElement{return this.getElement(400004)};
	/**Unlocked*/
	get Code_005():ISubLanguageElement{return this.getElement(400005)};
	/**Unlock*/
	get Code_006():ISubLanguageElement{return this.getElement(400006)};
	/**R/s*/
	get Code_007():ISubLanguageElement{return this.getElement(400007)};
	/**Please click on the position to exchange*/
	get Code_008():ISubLanguageElement{return this.getElement(400008)};
	/**You can open {0} more chests today.*/
	get Code_009():ISubLanguageElement{return this.getElement(400009)};
	/**Cannot Like Yourself*/
	get Code_010():ISubLanguageElement{return this.getElement(400010)};
	/**Player you want to like is offline or not in the room!*/
	get Code_011():ISubLanguageElement{return this.getElement(400011)};
	/**Cannot Like Again*/
	get Code_012():ISubLanguageElement{return this.getElement(400012)};
	/**Liked too many times today, try again tomorrow!*/
	get Code_013():ISubLanguageElement{return this.getElement(400013)};
	/**Cannot Gift Yourself*/
	get Code_014():ISubLanguageElement{return this.getElement(400014)};
	/**Player you want to gift is offline or not in the room!*/
	get Code_015():ISubLanguageElement{return this.getElement(400015)};
	/**{0} thinks you're cool, gave you a like*/
	get Code_016():ISubLanguageElement{return this.getElement(400016)};
	/**{0} gave {1} {2} * {3} as a gift*/
	get Code_017():ISubLanguageElement{return this.getElement(400017)};
	/**Request to add you as a friend!*/
	get Code_018():ISubLanguageElement{return this.getElement(400018)};
	/**Already Friends!*/
	get Code_019():ISubLanguageElement{return this.getElement(400019)};
	/**Send Friend Request to {0}?*/
	get Code_020():ISubLanguageElement{return this.getElement(400020)};
	/**Active*/
	get Code_021():ISubLanguageElement{return this.getElement(400021)};
	/**Cleared Record*/
	get Code_022():ISubLanguageElement{return this.getElement(400022)};
	/**Coming Soon*/
	get Code_023():ISubLanguageElement{return this.getElement(400023)};
	/**h*/
	get Code_024():ISubLanguageElement{return this.getElement(400024)};
	/**m*/
	get Code_025():ISubLanguageElement{return this.getElement(400025)};
	/**Player*/
	get Code_026():ISubLanguageElement{return this.getElement(400026)};
	/**(up to 16 characters)*/
	get Code_027():ISubLanguageElement{return this.getElement(400027)};
	/**Bio Changed Successfully*/
	get Code_028():ISubLanguageElement{return this.getElement(400028)};
	/**Contains blocked words, please re-enter!*/
	get Code_029():ISubLanguageElement{return this.getElement(400029)};
	/**Already Friends*/
	get Code_030():ISubLanguageElement{return this.getElement(400030)};
	/**{0}'s Identity Card*/
	get Code_031():ISubLanguageElement{return this.getElement(400031)};
	/**Nickname*/
	get Code_032():ISubLanguageElement{return this.getElement(400032)};
	/**Gender*/
	get Code_033():ISubLanguageElement{return this.getElement(400033)};
	/**Friend ID*/
	get Code_034():ISubLanguageElement{return this.getElement(400034)};
	/**None*/
	get Code_035():ISubLanguageElement{return this.getElement(400035)};
	/**MP*/
	get Code_036():ISubLanguageElement{return this.getElement(400036)};
	/**Popularity LV*/
	get Code_037():ISubLanguageElement{return this.getElement(400037)};
	/**<!-- -->*/
	get Code_038():ISubLanguageElement{return this.getElement(400038)};
	/**EXP*/
	get Code_039():ISubLanguageElement{return this.getElement(400039)};
	/**Level*/
	get Code_040():ISubLanguageElement{return this.getElement(400040)};
	/**{0} threw {2} {3} to {1}*/
	get Code_041():ISubLanguageElement{return this.getElement(400041)};
	/**Confirm spending {0} Fear Coins to unlock {1}?*/
	get Code_042():ISubLanguageElement{return this.getElement(400042)};
	/**Purchase Successful*/
	get Code_043():ISubLanguageElement{return this.getElement(400043)};
	/**Purchase limit reached*/
	get Code_044():ISubLanguageElement{return this.getElement(400044)};
	/**Insufficient backpack items*/
	get Code_045():ISubLanguageElement{return this.getElement(400045)};
	/**Not enough Fear Coins, go to recharge?*/
	get Code_046():ISubLanguageElement{return this.getElement(400046)};
	/**Free*/
	get Code_047():ISubLanguageElement{return this.getElement(400047)};
	/**Spend {0} G-coins to buy {1}?*/
	get Code_048():ISubLanguageElement{return this.getElement(400048)};
	/**Purchase limit reached*/
	get Code_049():ISubLanguageElement{return this.getElement(400049)};
	/**Item limit reached*/
	get Code_050():ISubLanguageElement{return this.getElement(400050)};
	/**Fear Coin item prices reduced by {0}%*/
	get Code_051():ISubLanguageElement{return this.getElement(400051)};
	/**Already claimed today*/
	get Code_052():ISubLanguageElement{return this.getElement(400052)};
	/**Claim {0} Fear Coins*/
	get Code_053():ISubLanguageElement{return this.getElement(400053)};
	/**Received {0} Fear Coins*/
	get Code_054():ISubLanguageElement{return this.getElement(400054)};
	/**{0} days left*/
	get Code_055():ISubLanguageElement{return this.getElement(400055)};
	/**Current version does not support payments, please update version*/
	get Code_056():ISubLanguageElement{return this.getElement(400056)};
	/**Monthly Pass*/
	get Code_057():ISubLanguageElement{return this.getElement(400057)};
	/**Seasonal Pass*/
	get Code_058():ISubLanguageElement{return this.getElement(400058)};
	/**Weekly Pack*/
	get Code_059():ISubLanguageElement{return this.getElement(400059)};
	/**Purchase Failed*/
	get Code_060():ISubLanguageElement{return this.getElement(400060)};
	/**Purchase Successful*/
	get Code_061():ISubLanguageElement{return this.getElement(400061)};
	/**Insufficient Fear Coins, open daily chest in the lobby or collect in-game*/
	get Code_062():ISubLanguageElement{return this.getElement(400062)};
	/**Not enough {0} items*/
	get Code_063():ISubLanguageElement{return this.getElement(400063)};
	/**Daily opening limit reached*/
	get Code_064():ISubLanguageElement{return this.getElement(400064)};
	/**Watch ad to open*/
	get Code_065():ISubLanguageElement{return this.getElement(400065)};
	/**Open*/
	get Code_066():ISubLanguageElement{return this.getElement(400066)};
	/**Ad playback failed*/
	get Code_067():ISubLanguageElement{return this.getElement(400067)};
	/**Ad not ready*/
	get Code_068():ISubLanguageElement{return this.getElement(400068)};
	/**Ad not activated*/
	get Code_069():ISubLanguageElement{return this.getElement(400069)};
	/**Current EXP*/
	get Code_070():ISubLanguageElement{return this.getElement(400070)};
	/**Current Level: {0}*/
	get Code_071():ISubLanguageElement{return this.getElement(400071)};
	/**A similar {0} has already been activated. Replace it, and the original will become inactive. Proceed?*/
	get Code_072():ISubLanguageElement{return this.getElement(400072)};
	/**Full HP, no need for treatment*/
	get Code_073():ISubLanguageElement{return this.getElement(400073)};
	/**Can only use one at a time*/
	get Code_074():ISubLanguageElement{return this.getElement(400074)};
	/**Melody City*/
	get Code_075():ISubLanguageElement{return this.getElement(400075)};
	/**Hall*/
	get Gamename_01():ISubLanguageElement{return this.getElement(500001)};
	/**School*/
	get Gamename_02():ISubLanguageElement{return this.getElement(500002)};
	/**Hospital*/
	get Gamename_03():ISubLanguageElement{return this.getElement(500003)};
	/**Graveyard*/
	get Gamename_04():ISubLanguageElement{return this.getElement(500004)};
	/**Town*/
	get Gamename_05():ISubLanguageElement{return this.getElement(500005)};
	/**Hall text test*/
	get Gamename_06():ISubLanguageElement{return this.getElement(500006)};
	/**Welcome to the Ghost School
Mysterious puzzles and hidden truths await your unraveling
· You can choose to escape, but you only have 5 days.
· Or try to uncover the truth and rescue Pamni.
· Only a few rooms and lockers are safe.
They're coming for you.
Best of luck...*/
	get Skip_01():ISubLanguageElement{return this.getElement(500007)};
	/**Welcome to the Asylum
In the eerie night, with the red moon rising, many mysteries surround the asylum...
Including Pamni, many creatures seem to have gone mad.
· You can choose to flee alone.
· Or choose to save everything.
· Or immerse yourself in darkness.
· But remember, you only have 5 days.
They're coming for you.
Best of luck...*/
	get Skip_02():ISubLanguageElement{return this.getElement(500008)};
	/**Welcome, campers, to Haunt Isle!
They say, whenever the Blood Moon rises, your shadow comes looking for you...
Explore, build, gather resources, fend off the Shadow People's attacks.
Enhance your campsite, survive!
Starving cats, fishers, volcano trees, the moon in the cage...
The island seems to hold many unknown secrets...
Enjoy the crimson camping journey!*/
	get Skip_03():ISubLanguageElement{return this.getElement(500009)};
	/**The town was once a typical one, where people lived repetitive lives.
The sudden appearance of the red moon shattered the town's tranquility...
The moon's glow has changed the residents both physically and mentally.
The town is no longer peaceful... filled with the low growls of zombies.
How will you choose? Escape? Or rescue?*/
	get Skip_04():ISubLanguageElement{return this.getElement(500010)};
	/**Album*/
	get UI_main_01():ISubLanguageElement{return this.getElement(510001)};
	/**Settings*/
	get UI_main_02():ISubLanguageElement{return this.getElement(510002)};
	/**Shop*/
	get UI_main_03():ISubLanguageElement{return this.getElement(510003)};
	/**Name Card*/
	get UI_main_04():ISubLanguageElement{return this.getElement(510004)};
	/**Emojis*/
	get UI_main_05():ISubLanguageElement{return this.getElement(510005)};
	/**Notes*/
	get UI_main_06():ISubLanguageElement{return this.getElement(510006)};
	/**Gift Showcase:*/
	get GiftShow():ISubLanguageElement{return this.getElement(510007)};
	/**Clearance Record*/
	get PassRecord():ISubLanguageElement{return this.getElement(510008)};
	/**Recent Likes*/
	get RecentLikes():ISubLanguageElement{return this.getElement(510009)};
	/**Bio:*/
	get PersonalSign():ISubLanguageElement{return this.getElement(510010)};
	/**Gifts List*/
	get GiftList():ISubLanguageElement{return this.getElement(510011)};
	/**null*/
	get UI_News_01():ISubLanguageElement{return this.getElement(700001)};
	/**null*/
	get UI_News_02():ISubLanguageElement{return this.getElement(700002)};
	/**null*/
	get UI_News_03():ISubLanguageElement{return this.getElement(700003)};
	/**null*/
	get UI_News_04():ISubLanguageElement{return this.getElement(700004)};
	/**null*/
	get UI_News_05():ISubLanguageElement{return this.getElement(700005)};
	/**null*/
	get UI_News_06():ISubLanguageElement{return this.getElement(700006)};
	/**null*/
	get UI_News_07():ISubLanguageElement{return this.getElement(700007)};
	/**null*/
	get UI_News_08():ISubLanguageElement{return this.getElement(700008)};
	/**null*/
	get UI_News_09():ISubLanguageElement{return this.getElement(700009)};
	/**null*/
	get FindTips_01():ISubLanguageElement{return this.getElement(800000)};
	/**null*/
	get FindTips_02():ISubLanguageElement{return this.getElement(800001)};
	/**null*/
	get FindTips_03():ISubLanguageElement{return this.getElement(800002)};
	/**null*/
	get FindTips_04():ISubLanguageElement{return this.getElement(800003)};
	/**null*/
	get FindTips_05():ISubLanguageElement{return this.getElement(800004)};
	/**null*/
	get FindTips_06():ISubLanguageElement{return this.getElement(800005)};
	/**null*/
	get GhostMenu_01():ISubLanguageElement{return this.getElement(900001)};
	/**null*/
	get GhostMenu_02():ISubLanguageElement{return this.getElement(900002)};
	/**null*/
	get GhostMenu_03():ISubLanguageElement{return this.getElement(900003)};
	/**null*/
	get GhostMenu_04():ISubLanguageElement{return this.getElement(900004)};
	/**null*/
	get GhostMenu_05():ISubLanguageElement{return this.getElement(900005)};
	/**null*/
	get GhostMenu_06():ISubLanguageElement{return this.getElement(900006)};
	/**null*/
	get GhostMenu_07():ISubLanguageElement{return this.getElement(900007)};
	/**null*/
	get GhostMenu_08():ISubLanguageElement{return this.getElement(900008)};
	/**null*/
	get GhostMenu_09():ISubLanguageElement{return this.getElement(900009)};
	/**null*/
	get GhostMenu_10():ISubLanguageElement{return this.getElement(900010)};
	/**null*/
	get GhostMenu_11():ISubLanguageElement{return this.getElement(900011)};
	/**null*/
	get GhostMenu_12():ISubLanguageElement{return this.getElement(900012)};
	/**null*/
	get GhostMenu_13():ISubLanguageElement{return this.getElement(900013)};
	/**null*/
	get GhostMenu_14():ISubLanguageElement{return this.getElement(900014)};
	/**null*/
	get GhostMenu_15():ISubLanguageElement{return this.getElement(900015)};
	/**null*/
	get GhostMenu_16():ISubLanguageElement{return this.getElement(900016)};
	/**null*/
	get GhostMenu_17():ISubLanguageElement{return this.getElement(900017)};
	/**null*/
	get GhostMenu_18():ISubLanguageElement{return this.getElement(900018)};
	/**null*/
	get GhostMenu_19():ISubLanguageElement{return this.getElement(900019)};
	/**null*/
	get Report_01():ISubLanguageElement{return this.getElement(701000)};
	/**null*/
	get Report_02():ISubLanguageElement{return this.getElement(701001)};
	/**null*/
	get Report_03():ISubLanguageElement{return this.getElement(701002)};
	/**null*/
	get Report_04():ISubLanguageElement{return this.getElement(701003)};
	/**null*/
	get Report_05():ISubLanguageElement{return this.getElement(701004)};
	/**null*/
	get Report_06():ISubLanguageElement{return this.getElement(701005)};
	/**null*/
	get Report_07():ISubLanguageElement{return this.getElement(701006)};
	/**null*/
	get Report_08():ISubLanguageElement{return this.getElement(701007)};
	/**null*/
	get Report_09():ISubLanguageElement{return this.getElement(701008)};
	/**null*/
	get Report_10():ISubLanguageElement{return this.getElement(701009)};
	/**null*/
	get Report_11():ISubLanguageElement{return this.getElement(701010)};
	/**null*/
	get Report_12():ISubLanguageElement{return this.getElement(701011)};
	/**null*/
	get Report_13():ISubLanguageElement{return this.getElement(701012)};
	/**null*/
	get Find_name_01():ISubLanguageElement{return this.getElement(60000)};
	/**null*/
	get Find_name_02():ISubLanguageElement{return this.getElement(60001)};
	/**null*/
	get Find_name_03():ISubLanguageElement{return this.getElement(60002)};
	/**null*/
	get Find_name_04():ISubLanguageElement{return this.getElement(60003)};
	/**null*/
	get Find_name_05():ISubLanguageElement{return this.getElement(60004)};
	/**null*/
	get Find_name_06():ISubLanguageElement{return this.getElement(60005)};
	/**null*/
	get Find_name_07():ISubLanguageElement{return this.getElement(60006)};
	/**null*/
	get Find_name_08():ISubLanguageElement{return this.getElement(60007)};
	/**null*/
	get Find_name_09():ISubLanguageElement{return this.getElement(60008)};
	/**null*/
	get Find_name_10():ISubLanguageElement{return this.getElement(60009)};
	/**null*/
	get Find_name_11():ISubLanguageElement{return this.getElement(60010)};
	/**null*/
	get Find_name_12():ISubLanguageElement{return this.getElement(60011)};
	/**null*/
	get Find_name_13():ISubLanguageElement{return this.getElement(60012)};
	/**null*/
	get Find_name_14():ISubLanguageElement{return this.getElement(60013)};
	/**null*/
	get Find_name_15():ISubLanguageElement{return this.getElement(60014)};
	/**null*/
	get Find_name_16():ISubLanguageElement{return this.getElement(60015)};
	/**null*/
	get Find_name_17():ISubLanguageElement{return this.getElement(60016)};
	/**null*/
	get Find_name_18():ISubLanguageElement{return this.getElement(60017)};
	/**null*/
	get Find_name_19():ISubLanguageElement{return this.getElement(60018)};
	/**null*/
	get Find_name_20():ISubLanguageElement{return this.getElement(60019)};
	/**null*/
	get Find_name_21():ISubLanguageElement{return this.getElement(60020)};
	/**null*/
	get Find_name_22():ISubLanguageElement{return this.getElement(60021)};
	/**null*/
	get Find_name_23():ISubLanguageElement{return this.getElement(60022)};
	/**null*/
	get Find_name_24():ISubLanguageElement{return this.getElement(60023)};
	/**null*/
	get Find_name_25():ISubLanguageElement{return this.getElement(60024)};
	/**null*/
	get Find_name_26():ISubLanguageElement{return this.getElement(60025)};
	/**null*/
	get Find_name_27():ISubLanguageElement{return this.getElement(60026)};
	/**null*/
	get Find_name_28():ISubLanguageElement{return this.getElement(60027)};
	/**null*/
	get Find_name_29():ISubLanguageElement{return this.getElement(60028)};
	/**null*/
	get Find_name_30():ISubLanguageElement{return this.getElement(60029)};
	/**null*/
	get Find_name_31():ISubLanguageElement{return this.getElement(60030)};
	/**null*/
	get Find_name_32():ISubLanguageElement{return this.getElement(60031)};
	/**null*/
	get Find_name_33():ISubLanguageElement{return this.getElement(60032)};
	/**null*/
	get Find_name_34():ISubLanguageElement{return this.getElement(60033)};
	/**null*/
	get Find_name_35():ISubLanguageElement{return this.getElement(60034)};
	/**null*/
	get Find_name_36():ISubLanguageElement{return this.getElement(60035)};
	/**null*/
	get Find_name_37():ISubLanguageElement{return this.getElement(60036)};
	/**null*/
	get Find_name_38():ISubLanguageElement{return this.getElement(60037)};
	/**null*/
	get Find_name_39():ISubLanguageElement{return this.getElement(60038)};
	/**null*/
	get Find_name_40():ISubLanguageElement{return this.getElement(60039)};
	/**null*/
	get Find_name_41():ISubLanguageElement{return this.getElement(60040)};
	/**null*/
	get Find_name_42():ISubLanguageElement{return this.getElement(60041)};
	/**null*/
	get Find_name_43():ISubLanguageElement{return this.getElement(60042)};
	/**null*/
	get Find_name_44():ISubLanguageElement{return this.getElement(60043)};
	/**null*/
	get Find_name_45():ISubLanguageElement{return this.getElement(60044)};
	/**null*/
	get Find_name_46():ISubLanguageElement{return this.getElement(60045)};
	/**null*/
	get Find_name_47():ISubLanguageElement{return this.getElement(60046)};
	/**null*/
	get Find_name_48():ISubLanguageElement{return this.getElement(60047)};
	/**null*/
	get Find_name_49():ISubLanguageElement{return this.getElement(60048)};
	/**null*/
	get Find_name_50():ISubLanguageElement{return this.getElement(60049)};
	/**null*/
	get Find_describe_01():ISubLanguageElement{return this.getElement(60050)};
	/**null*/
	get Find_describe_02():ISubLanguageElement{return this.getElement(60051)};
	/**null*/
	get Find_describe_03():ISubLanguageElement{return this.getElement(60052)};
	/**null*/
	get Find_describe_04():ISubLanguageElement{return this.getElement(60053)};
	/**null*/
	get Find_describe_05():ISubLanguageElement{return this.getElement(60054)};
	/**null*/
	get Find_describe_06():ISubLanguageElement{return this.getElement(60055)};
	/**null*/
	get Find_describe_07():ISubLanguageElement{return this.getElement(60056)};
	/**null*/
	get Find_describe_08():ISubLanguageElement{return this.getElement(60057)};
	/**null*/
	get Find_describe_09():ISubLanguageElement{return this.getElement(60058)};
	/**null*/
	get Find_describe_10():ISubLanguageElement{return this.getElement(60059)};
	/**null*/
	get Find_describe_11():ISubLanguageElement{return this.getElement(60060)};
	/**null*/
	get Find_describe_12():ISubLanguageElement{return this.getElement(60061)};
	/**null*/
	get Find_describe_13():ISubLanguageElement{return this.getElement(60062)};
	/**null*/
	get Find_describe_14():ISubLanguageElement{return this.getElement(60063)};
	/**null*/
	get Find_describe_15():ISubLanguageElement{return this.getElement(60064)};
	/**null*/
	get Find_describe_16():ISubLanguageElement{return this.getElement(60065)};
	/**null*/
	get Find_describe_17():ISubLanguageElement{return this.getElement(60066)};
	/**null*/
	get Find_describe_18():ISubLanguageElement{return this.getElement(60067)};
	/**null*/
	get Find_describe_19():ISubLanguageElement{return this.getElement(60068)};
	/**null*/
	get Find_describe_20():ISubLanguageElement{return this.getElement(60069)};
	/**null*/
	get Find_describe_21():ISubLanguageElement{return this.getElement(60070)};
	/**null*/
	get Find_describe_22():ISubLanguageElement{return this.getElement(60071)};
	/**null*/
	get Find_describe_23():ISubLanguageElement{return this.getElement(60072)};
	/**null*/
	get Find_describe_24():ISubLanguageElement{return this.getElement(60073)};
	/**null*/
	get Find_describe_25():ISubLanguageElement{return this.getElement(60074)};
	/**null*/
	get Find_describe_26():ISubLanguageElement{return this.getElement(60075)};
	/**null*/
	get Find_describe_27():ISubLanguageElement{return this.getElement(60076)};
	/**null*/
	get Find_describe_28():ISubLanguageElement{return this.getElement(60077)};
	/**null*/
	get Find_describe_29():ISubLanguageElement{return this.getElement(60078)};
	/**null*/
	get Find_describe_30():ISubLanguageElement{return this.getElement(60079)};
	/**null*/
	get Find_describe_31():ISubLanguageElement{return this.getElement(60080)};
	/**null*/
	get Find_describe_32():ISubLanguageElement{return this.getElement(60081)};
	/**null*/
	get Find_describe_33():ISubLanguageElement{return this.getElement(60082)};
	/**null*/
	get Find_describe_34():ISubLanguageElement{return this.getElement(60083)};
	/**null*/
	get Find_describe_35():ISubLanguageElement{return this.getElement(60084)};
	/**null*/
	get Find_describe_36():ISubLanguageElement{return this.getElement(60085)};
	/**null*/
	get Find_describe_37():ISubLanguageElement{return this.getElement(60086)};
	/**null*/
	get Find_describe_38():ISubLanguageElement{return this.getElement(60087)};
	/**null*/
	get Find_describe_39():ISubLanguageElement{return this.getElement(60088)};
	/**null*/
	get Find_describe_40():ISubLanguageElement{return this.getElement(60089)};
	/**null*/
	get Find_describe_41():ISubLanguageElement{return this.getElement(60090)};
	/**null*/
	get Find_describe_42():ISubLanguageElement{return this.getElement(60091)};
	/**null*/
	get Find_describe_43():ISubLanguageElement{return this.getElement(60092)};
	/**null*/
	get Find_describe_44():ISubLanguageElement{return this.getElement(60093)};
	/**null*/
	get Find_describe_45():ISubLanguageElement{return this.getElement(60094)};
	/**null*/
	get Find_describe_46():ISubLanguageElement{return this.getElement(60095)};
	/**null*/
	get Find_describe_47():ISubLanguageElement{return this.getElement(60096)};
	/**null*/
	get Find_describe_48():ISubLanguageElement{return this.getElement(60097)};
	/**null*/
	get Find_describe_49():ISubLanguageElement{return this.getElement(60098)};
	/**null*/
	get Find_describe_50():ISubLanguageElement{return this.getElement(60099)};
	/**null*/
	get Find_tips_01():ISubLanguageElement{return this.getElement(60100)};
	/**null*/
	get Find_tips_02():ISubLanguageElement{return this.getElement(60101)};
	/**null*/
	get Find_tips_03():ISubLanguageElement{return this.getElement(60102)};
	/**null*/
	get Find_tips_04():ISubLanguageElement{return this.getElement(60103)};
	/**null*/
	get Find_tips_05():ISubLanguageElement{return this.getElement(60104)};
	/**null*/
	get Find_tips_06():ISubLanguageElement{return this.getElement(60105)};
	/**null*/
	get Find_tips_07():ISubLanguageElement{return this.getElement(60106)};
	/**null*/
	get Find_tips_08():ISubLanguageElement{return this.getElement(60107)};
	/**null*/
	get Find_tips_09():ISubLanguageElement{return this.getElement(60108)};
	/**null*/
	get Find_tips_10():ISubLanguageElement{return this.getElement(60109)};
	/**null*/
	get Find_tips_11():ISubLanguageElement{return this.getElement(60110)};
	/**null*/
	get Find_tips_12():ISubLanguageElement{return this.getElement(60111)};
	/**null*/
	get Find_tips_13():ISubLanguageElement{return this.getElement(60112)};
	/**null*/
	get Find_tips_14():ISubLanguageElement{return this.getElement(60113)};
	/**null*/
	get Find_tips_15():ISubLanguageElement{return this.getElement(60114)};
	/**null*/
	get Find_tips_16():ISubLanguageElement{return this.getElement(60115)};
	/**null*/
	get Find_tips_17():ISubLanguageElement{return this.getElement(60116)};
	/**null*/
	get Find_tips_18():ISubLanguageElement{return this.getElement(60117)};
	/**null*/
	get Find_tips_19():ISubLanguageElement{return this.getElement(60118)};
	/**null*/
	get Find_tips_20():ISubLanguageElement{return this.getElement(60119)};
	/**null*/
	get Find_tips_21():ISubLanguageElement{return this.getElement(60120)};
	/**null*/
	get Find_tips_22():ISubLanguageElement{return this.getElement(60121)};
	/**null*/
	get Find_tips_23():ISubLanguageElement{return this.getElement(60122)};
	/**null*/
	get Find_tips_24():ISubLanguageElement{return this.getElement(60123)};
	/**null*/
	get Find_tips_25():ISubLanguageElement{return this.getElement(60124)};
	/**null*/
	get Find_tips_26():ISubLanguageElement{return this.getElement(60125)};
	/**null*/
	get Find_tips_27():ISubLanguageElement{return this.getElement(60126)};
	/**null*/
	get Find_tips_28():ISubLanguageElement{return this.getElement(60127)};
	/**null*/
	get Find_tips_29():ISubLanguageElement{return this.getElement(60128)};
	/**null*/
	get Find_tips_30():ISubLanguageElement{return this.getElement(60129)};
	/**null*/
	get Find_tips_31():ISubLanguageElement{return this.getElement(60130)};
	/**null*/
	get Find_tips_32():ISubLanguageElement{return this.getElement(60131)};
	/**null*/
	get Find_tips_33():ISubLanguageElement{return this.getElement(60132)};
	/**null*/
	get Find_tips_34():ISubLanguageElement{return this.getElement(60133)};
	/**null*/
	get Find_tips_35():ISubLanguageElement{return this.getElement(60134)};
	/**null*/
	get Find_tips_36():ISubLanguageElement{return this.getElement(60135)};
	/**null*/
	get Find_tips_37():ISubLanguageElement{return this.getElement(60136)};
	/**null*/
	get Find_tips_38():ISubLanguageElement{return this.getElement(60137)};
	/**null*/
	get Find_tips_39():ISubLanguageElement{return this.getElement(60138)};
	/**null*/
	get Find_tips_40():ISubLanguageElement{return this.getElement(60139)};
	/**null*/
	get Find_tips_41():ISubLanguageElement{return this.getElement(60140)};
	/**null*/
	get Find_tips_42():ISubLanguageElement{return this.getElement(60141)};
	/**null*/
	get Find_tips_43():ISubLanguageElement{return this.getElement(60142)};
	/**null*/
	get Find_tips_44():ISubLanguageElement{return this.getElement(60143)};
	/**null*/
	get Find_tips_45():ISubLanguageElement{return this.getElement(60144)};
	/**null*/
	get Find_tips_46():ISubLanguageElement{return this.getElement(60145)};
	/**null*/
	get Find_tips_47():ISubLanguageElement{return this.getElement(60146)};
	/**null*/
	get Find_tips_48():ISubLanguageElement{return this.getElement(60147)};
	/**null*/
	get Find_tips_49():ISubLanguageElement{return this.getElement(60148)};
	/**null*/
	get Find_tips_50():ISubLanguageElement{return this.getElement(60149)};
	/**null*/
	get GhostFragment_01():ISubLanguageElement{return this.getElement(70001)};
	/**null*/
	get GhostFragment_02():ISubLanguageElement{return this.getElement(70002)};
	/**null*/
	get GhostFragment_03():ISubLanguageElement{return this.getElement(70003)};
	/**null*/
	get GhostFragment_04():ISubLanguageElement{return this.getElement(70004)};
	/**null*/
	get GhostFragment_05():ISubLanguageElement{return this.getElement(70005)};
	/**null*/
	get GhostFragment_06():ISubLanguageElement{return this.getElement(70006)};
	/**null*/
	get GhostFragment_07():ISubLanguageElement{return this.getElement(70007)};
	/**null*/
	get GhostFragment_08():ISubLanguageElement{return this.getElement(70008)};
	/**null*/
	get GhostFragment_09():ISubLanguageElement{return this.getElement(70009)};
	/**null*/
	get GhostFragment_10():ISubLanguageElement{return this.getElement(70010)};
	/**null*/
	get GhostFragment_11():ISubLanguageElement{return this.getElement(70011)};
	/**null*/
	get GhostFragment_12():ISubLanguageElement{return this.getElement(70012)};
	/**null*/
	get GhostFragment_13():ISubLanguageElement{return this.getElement(70013)};
	/**null*/
	get GhostFragment_14():ISubLanguageElement{return this.getElement(70014)};
	/**null*/
	get GhostFragment_15():ISubLanguageElement{return this.getElement(70015)};
	/**null*/
	get GhostFragment_16():ISubLanguageElement{return this.getElement(70016)};
	/**null*/
	get GhostFragment_17():ISubLanguageElement{return this.getElement(70017)};
	/**null*/
	get GhostFragment_18():ISubLanguageElement{return this.getElement(70018)};
	/**null*/
	get GhostFragment_19():ISubLanguageElement{return this.getElement(70019)};
	/**null*/
	get GhostFragment_20():ISubLanguageElement{return this.getElement(70020)};
	/**null*/
	get GhostFragment_21():ISubLanguageElement{return this.getElement(70021)};
	/**null*/
	get GhostFragment_22():ISubLanguageElement{return this.getElement(70022)};
	/**null*/
	get GhostFragment_23():ISubLanguageElement{return this.getElement(70023)};
	/**null*/
	get GhostFragment_24():ISubLanguageElement{return this.getElement(70024)};
	/**null*/
	get GhostFragment_25():ISubLanguageElement{return this.getElement(70025)};
	/**null*/
	get GhostFragment_26():ISubLanguageElement{return this.getElement(70026)};
	/**null*/
	get GhostFragment_27():ISubLanguageElement{return this.getElement(70027)};
	/**null*/
	get GhostFragment_28():ISubLanguageElement{return this.getElement(70028)};
	/**null*/
	get GhostFragment_29():ISubLanguageElement{return this.getElement(70029)};
	/**null*/
	get GhostFragment_30():ISubLanguageElement{return this.getElement(70030)};
	/**null*/
	get GhostFragment_31():ISubLanguageElement{return this.getElement(70031)};
	/**null*/
	get GhostFragment_32():ISubLanguageElement{return this.getElement(70032)};
	/**null*/
	get GhostFragment_33():ISubLanguageElement{return this.getElement(70033)};
	/**null*/
	get GhostFragment_34():ISubLanguageElement{return this.getElement(70034)};
	/**null*/
	get GhostFragment_35():ISubLanguageElement{return this.getElement(70035)};
	/**null*/
	get GhostFragment_36():ISubLanguageElement{return this.getElement(70036)};
	/**null*/
	get GhostFragment_37():ISubLanguageElement{return this.getElement(70037)};
	/**null*/
	get GhostFragment_38():ISubLanguageElement{return this.getElement(70038)};
	/**null*/
	get GhostFragment_39():ISubLanguageElement{return this.getElement(70039)};
	/**null*/
	get GhostFragment_40():ISubLanguageElement{return this.getElement(70040)};
	/**null*/
	get GhostFragment_41():ISubLanguageElement{return this.getElement(70041)};
	/**null*/
	get GhostFragment_42():ISubLanguageElement{return this.getElement(70042)};
	/**null*/
	get GhostFragment_43():ISubLanguageElement{return this.getElement(70043)};
	/**null*/
	get GhostFragment_44():ISubLanguageElement{return this.getElement(70044)};
	/**null*/
	get GhostFragment_45():ISubLanguageElement{return this.getElement(70045)};
	/**null*/
	get GhostFragment_46():ISubLanguageElement{return this.getElement(70046)};
	/**null*/
	get GhostFragment_47():ISubLanguageElement{return this.getElement(70047)};
	/**null*/
	get GhostFragment_48():ISubLanguageElement{return this.getElement(70048)};
	/**null*/
	get GhostFragment_49():ISubLanguageElement{return this.getElement(70049)};
	/**null*/
	get GhostFragment_50():ISubLanguageElement{return this.getElement(70050)};
	/**null*/
	get GhostFragment_51():ISubLanguageElement{return this.getElement(70051)};
	/**null*/
	get GhostFragment_52():ISubLanguageElement{return this.getElement(70052)};
	/**null*/
	get GhostFragment_53():ISubLanguageElement{return this.getElement(70053)};
	/**null*/
	get GhostFragment_54():ISubLanguageElement{return this.getElement(70054)};
	/**null*/
	get GhostFragment_55():ISubLanguageElement{return this.getElement(70055)};
	/**null*/
	get GhostFragment_56():ISubLanguageElement{return this.getElement(70056)};
	/**null*/
	get GhostFragment_57():ISubLanguageElement{return this.getElement(70057)};
	/**null*/
	get GhostFragment_58():ISubLanguageElement{return this.getElement(70058)};
	/**null*/
	get GhostFragment_59():ISubLanguageElement{return this.getElement(70059)};
	/**null*/
	get GhostFragment_60():ISubLanguageElement{return this.getElement(70060)};
	/**null*/
	get GhostFragment_61():ISubLanguageElement{return this.getElement(70061)};
	/**null*/
	get GhostFragment_62():ISubLanguageElement{return this.getElement(70062)};
	/**null*/
	get GhostFragment_63():ISubLanguageElement{return this.getElement(70063)};
	/**null*/
	get GhostFragment_64():ISubLanguageElement{return this.getElement(70064)};
	/**null*/
	get GhostFragment_65():ISubLanguageElement{return this.getElement(70065)};
	/**null*/
	get GhostFragment_66():ISubLanguageElement{return this.getElement(70066)};
	/**null*/
	get GhostFragment_67():ISubLanguageElement{return this.getElement(70067)};
	/**null*/
	get GhostFragment_68():ISubLanguageElement{return this.getElement(70068)};
	/**null*/
	get GhostFragment_69():ISubLanguageElement{return this.getElement(70069)};
	/**null*/
	get GhostFragment_70():ISubLanguageElement{return this.getElement(70070)};
	/**null*/
	get GhostFragment_71():ISubLanguageElement{return this.getElement(70071)};
	/**null*/
	get GhostFragment_72():ISubLanguageElement{return this.getElement(70072)};
	/**null*/
	get GhostFragment_73():ISubLanguageElement{return this.getElement(70073)};
	/**null*/
	get GhostFragment_74():ISubLanguageElement{return this.getElement(70074)};
	/**null*/
	get GhostFragment_75():ISubLanguageElement{return this.getElement(70075)};
	/**null*/
	get GhostFragment_76():ISubLanguageElement{return this.getElement(70076)};
	/**null*/
	get GhostFragment_77():ISubLanguageElement{return this.getElement(70077)};
	/**null*/
	get GhostFragment_78():ISubLanguageElement{return this.getElement(70078)};
	/**null*/
	get GhostFragment_79():ISubLanguageElement{return this.getElement(70079)};
	/**null*/
	get GhostFragment_80():ISubLanguageElement{return this.getElement(70080)};
	/**null*/
	get GhostFragment_81():ISubLanguageElement{return this.getElement(70081)};
	/**null*/
	get GhostFragment_82():ISubLanguageElement{return this.getElement(70082)};
	/**null*/
	get GhostFragment_83():ISubLanguageElement{return this.getElement(70083)};
	/**null*/
	get GhostFragment_84():ISubLanguageElement{return this.getElement(70084)};
	/**null*/
	get GhostFragment_85():ISubLanguageElement{return this.getElement(70085)};
	/**null*/
	get GhostFragment_86():ISubLanguageElement{return this.getElement(70086)};
	/**null*/
	get GhostFragment_87():ISubLanguageElement{return this.getElement(70087)};
	/**null*/
	get GhostFragment_88():ISubLanguageElement{return this.getElement(70088)};
	/**null*/
	get GhostFragment_89():ISubLanguageElement{return this.getElement(70089)};
	/**null*/
	get GhostFragment_90():ISubLanguageElement{return this.getElement(70090)};
	/**null*/
	get GhostFragment_91():ISubLanguageElement{return this.getElement(70091)};
	/**null*/
	get GhostFragment_92():ISubLanguageElement{return this.getElement(70092)};
	/**null*/
	get GhostFragment_93():ISubLanguageElement{return this.getElement(70093)};
	/**null*/
	get GhostFragment_94():ISubLanguageElement{return this.getElement(70094)};
	/**null*/
	get GhostFragment_95():ISubLanguageElement{return this.getElement(70095)};
	/**null*/
	get GhostFragment_96():ISubLanguageElement{return this.getElement(70096)};
	/**null*/
	get GhostFragment_97():ISubLanguageElement{return this.getElement(70097)};
	/**null*/
	get GhostFragment_98():ISubLanguageElement{return this.getElement(70098)};
	/**null*/
	get GhostFragment_99():ISubLanguageElement{return this.getElement(70099)};
	/**null*/
	get GhostFragment_100():ISubLanguageElement{return this.getElement(70100)};
	/**null*/
	get GhostFragment_101():ISubLanguageElement{return this.getElement(70101)};
	/**null*/
	get GhostFragment_102():ISubLanguageElement{return this.getElement(70102)};
	/**null*/
	get GhostFragment_103():ISubLanguageElement{return this.getElement(70103)};
	/**null*/
	get GhostFragment_104():ISubLanguageElement{return this.getElement(70104)};
	/**null*/
	get GhostFragment_105():ISubLanguageElement{return this.getElement(70105)};
	/**null*/
	get GhostFragment_106():ISubLanguageElement{return this.getElement(70106)};
	/**null*/
	get GhostFragment_107():ISubLanguageElement{return this.getElement(70107)};
	/**null*/
	get GhostFragment_108():ISubLanguageElement{return this.getElement(70108)};
	/**null*/
	get GhostFragment_109():ISubLanguageElement{return this.getElement(70109)};
	/**null*/
	get GhostFragment_110():ISubLanguageElement{return this.getElement(70110)};
	/**null*/
	get GhostFragment_111():ISubLanguageElement{return this.getElement(70111)};
	/**null*/
	get GhostFragment_112():ISubLanguageElement{return this.getElement(70112)};
	/**null*/
	get GhostFragment_113():ISubLanguageElement{return this.getElement(70113)};
	/**null*/
	get GhostFragment_114():ISubLanguageElement{return this.getElement(70114)};
	/**null*/
	get GhostFragment_115():ISubLanguageElement{return this.getElement(70115)};
	/**null*/
	get GhostFragment_116():ISubLanguageElement{return this.getElement(70116)};
	/**null*/
	get GhostFragment_117():ISubLanguageElement{return this.getElement(70117)};
	/**null*/
	get GhostFragment_118():ISubLanguageElement{return this.getElement(70118)};
	/**null*/
	get GhostFragment_119():ISubLanguageElement{return this.getElement(70119)};
	/**null*/
	get GhostFragment_120():ISubLanguageElement{return this.getElement(70120)};
	/**null*/
	get GhostFragment_121():ISubLanguageElement{return this.getElement(70121)};
	/**null*/
	get GhostFragment_122():ISubLanguageElement{return this.getElement(70122)};
	/**null*/
	get GhostFragment_123():ISubLanguageElement{return this.getElement(70123)};
	/**null*/
	get GhostFragment_124():ISubLanguageElement{return this.getElement(70124)};
	/**null*/
	get GhostFragment_125():ISubLanguageElement{return this.getElement(70125)};
	/**null*/
	get GhostFragment_126():ISubLanguageElement{return this.getElement(70126)};
	/**null*/
	get GhostFragment_127():ISubLanguageElement{return this.getElement(70127)};
	/**null*/
	get GhostFragment_128():ISubLanguageElement{return this.getElement(70128)};
	/**null*/
	get GhostFragment_129():ISubLanguageElement{return this.getElement(70129)};
	/**null*/
	get GhostFragment_130():ISubLanguageElement{return this.getElement(70130)};
	/**null*/
	get ghostName_19():ISubLanguageElement{return this.getElement(71001)};
	/**null*/
	get ghostName_20():ISubLanguageElement{return this.getElement(71002)};
	/**null*/
	get ghostName_21():ISubLanguageElement{return this.getElement(71003)};
	/**null*/
	get ghostName_22():ISubLanguageElement{return this.getElement(71004)};
	/**null*/
	get ghostName_23():ISubLanguageElement{return this.getElement(71005)};
	/**null*/
	get ghostName_24():ISubLanguageElement{return this.getElement(71006)};
	/**null*/
	get ghostName_25():ISubLanguageElement{return this.getElement(71007)};
	/**null*/
	get ghostUnlock_19():ISubLanguageElement{return this.getElement(71008)};
	/**null*/
	get ghostUnlock_20():ISubLanguageElement{return this.getElement(71009)};
	/**null*/
	get ghostUnlock_21():ISubLanguageElement{return this.getElement(71010)};
	/**null*/
	get ghostUnlock_22():ISubLanguageElement{return this.getElement(71011)};
	/**null*/
	get ghostUnlock_23():ISubLanguageElement{return this.getElement(71012)};
	/**null*/
	get ghostUnlock_24():ISubLanguageElement{return this.getElement(71013)};
	/**null*/
	get ghostUnlock_25():ISubLanguageElement{return this.getElement(71014)};
	/**null*/
	get ghostType_19():ISubLanguageElement{return this.getElement(71015)};
	/**null*/
	get ghostType_20():ISubLanguageElement{return this.getElement(71016)};
	/**null*/
	get ghostType_21():ISubLanguageElement{return this.getElement(71017)};
	/**null*/
	get ghostType_22():ISubLanguageElement{return this.getElement(71018)};
	/**null*/
	get ghostType_23():ISubLanguageElement{return this.getElement(71019)};
	/**null*/
	get ghostType_24():ISubLanguageElement{return this.getElement(71020)};
	/**null*/
	get ghostType_25():ISubLanguageElement{return this.getElement(71021)};
	/**null*/
	get ghostWeek_19():ISubLanguageElement{return this.getElement(71022)};
	/**null*/
	get ghostWeek_20():ISubLanguageElement{return this.getElement(71023)};
	/**null*/
	get ghostWeek_21():ISubLanguageElement{return this.getElement(71024)};
	/**null*/
	get ghostWeek_22():ISubLanguageElement{return this.getElement(71025)};
	/**null*/
	get ghostWeek_23():ISubLanguageElement{return this.getElement(71026)};
	/**null*/
	get ghostWeek_24():ISubLanguageElement{return this.getElement(71027)};
	/**null*/
	get ghostWeek_25():ISubLanguageElement{return this.getElement(71028)};
	/**null*/
	get ghostBack_19():ISubLanguageElement{return this.getElement(71029)};
	/**null*/
	get ghostBack_20():ISubLanguageElement{return this.getElement(71030)};
	/**null*/
	get ghostBack_21():ISubLanguageElement{return this.getElement(71031)};
	/**null*/
	get ghostBack_22():ISubLanguageElement{return this.getElement(71032)};
	/**null*/
	get ghostBack_23():ISubLanguageElement{return this.getElement(71033)};
	/**null*/
	get ghostBack_24():ISubLanguageElement{return this.getElement(71034)};
	/**null*/
	get ghostBack_25():ISubLanguageElement{return this.getElement(71035)};
	/**null*/
	get ghostmenu_10():ISubLanguageElement{return this.getElement(71036)};
	/**null*/
	get ghostmenu_11():ISubLanguageElement{return this.getElement(71037)};
	/**null*/
	get ui_main_guid_01():ISubLanguageElement{return this.getElement(71038)};
	/**null*/
	get UIMissionDailyPanel():ISubLanguageElement{return this.getElement(71039)};
	/**null*/
	get UIMissionNormalPanel():ISubLanguageElement{return this.getElement(71040)};
	/**null*/
	get AchievementPanel():ISubLanguageElement{return this.getElement(71041)};
	/**null*/
	get UINews():ISubLanguageElement{return this.getElement(71042)};
	/**null*/
	get UI_item_61001():ISubLanguageElement{return this.getElement(71043)};
	/**null*/
	get UI_item_61002():ISubLanguageElement{return this.getElement(71044)};
	/**null*/
	get UI_item_61003():ISubLanguageElement{return this.getElement(71045)};
	/**null*/
	get UI_item_61004():ISubLanguageElement{return this.getElement(71046)};
	/**null*/
	get UI_item_61005():ISubLanguageElement{return this.getElement(71047)};
	/**null*/
	get UI_item_61006():ISubLanguageElement{return this.getElement(71048)};
	/**null*/
	get UI_item_61007():ISubLanguageElement{return this.getElement(71049)};
	/**null*/
	get UI_item_61008():ISubLanguageElement{return this.getElement(71050)};
	/**null*/
	get UI_item_61009():ISubLanguageElement{return this.getElement(71051)};
	/**null*/
	get UI_item_61010():ISubLanguageElement{return this.getElement(71052)};
	/**null*/
	get UI_item_61011():ISubLanguageElement{return this.getElement(71053)};
	/**null*/
	get UI_item_61012():ISubLanguageElement{return this.getElement(71054)};
	/**null*/
	get UI_item_61013():ISubLanguageElement{return this.getElement(71055)};
	/**null*/
	get UI_item_61014():ISubLanguageElement{return this.getElement(71056)};
	/**null*/
	get UI_item_61015():ISubLanguageElement{return this.getElement(71057)};
	/**null*/
	get UI_item_61016():ISubLanguageElement{return this.getElement(71058)};
	/**null*/
	get UI_item_61017():ISubLanguageElement{return this.getElement(71059)};
	/**null*/
	get AvatarFrame_01():ISubLanguageElement{return this.getElement(71060)};
	/**null*/
	get AvatarFrame_02():ISubLanguageElement{return this.getElement(71061)};
	/**null*/
	get AvatarFrame_03():ISubLanguageElement{return this.getElement(71062)};
	/**null*/
	get AvatarFrame_04():ISubLanguageElement{return this.getElement(71063)};
	/**null*/
	get AvatarFrame_05():ISubLanguageElement{return this.getElement(71064)};
	/**null*/
	get AvatarFrame_06():ISubLanguageElement{return this.getElement(71065)};
	/**null*/
	get AvatarFrame_07():ISubLanguageElement{return this.getElement(71066)};
	/**null*/
	get AvatarFrame_08():ISubLanguageElement{return this.getElement(71067)};
	/**null*/
	get AvatarFrame_09():ISubLanguageElement{return this.getElement(71068)};
	/**null*/
	get AvatarFrame_10():ISubLanguageElement{return this.getElement(71069)};
	/**null*/
	get AvatarFrame_11():ISubLanguageElement{return this.getElement(71070)};
	/**null*/
	get AvatarFrame_12():ISubLanguageElement{return this.getElement(71071)};
	/**null*/
	get AvatarFrame_13():ISubLanguageElement{return this.getElement(71072)};
	/**null*/
	get AvatarFrame_14():ISubLanguageElement{return this.getElement(71073)};
	/**null*/
	get AvatarFrame_15():ISubLanguageElement{return this.getElement(71074)};
	/**null*/
	get UI_item_61018():ISubLanguageElement{return this.getElement(71075)};
	/**null*/
	get UI_item_61019():ISubLanguageElement{return this.getElement(71076)};
	/**null*/
	get UI_item_61020():ISubLanguageElement{return this.getElement(71077)};
	/**null*/
	get UI_item_61021():ISubLanguageElement{return this.getElement(71078)};
	/**null*/
	get UI_item_61022():ISubLanguageElement{return this.getElement(71079)};
	/**null*/
	get UI_item_61023():ISubLanguageElement{return this.getElement(71080)};
	/**null*/
	get UI_item_61024():ISubLanguageElement{return this.getElement(71081)};
	/**null*/
	get UI_gift_08():ISubLanguageElement{return this.getElement(71082)};
	/**null*/
	get UI_gift_09():ISubLanguageElement{return this.getElement(71083)};
	/**null*/
	get UI_gift_10():ISubLanguageElement{return this.getElement(71084)};
	/**null*/
	get UI_gift_11():ISubLanguageElement{return this.getElement(71085)};
	/**null*/
	get UI_gift_12():ISubLanguageElement{return this.getElement(71086)};
	/**null*/
	get UI_firstbuy():ISubLanguageElement{return this.getElement(71087)};
	/**null*/
	get UI_normalbuy():ISubLanguageElement{return this.getElement(71088)};
	/**null*/
	get UI_firstbuy_tips():ISubLanguageElement{return this.getElement(71089)};
	/**null*/
	get UI_crush_name():ISubLanguageElement{return this.getElement(72000)};
	/**null*/
	get UI_crushtips_01():ISubLanguageElement{return this.getElement(72001)};
	/**null*/
	get UI_crushtips_02():ISubLanguageElement{return this.getElement(72002)};
	/**null*/
	get UI_des_201():ISubLanguageElement{return this.getElement(72003)};
	/**null*/
	get UI_des_202():ISubLanguageElement{return this.getElement(72004)};
	/**null*/
	get UI_des_203():ISubLanguageElement{return this.getElement(72005)};
	/**null*/
	get UI_des_204():ISubLanguageElement{return this.getElement(72006)};
	/**null*/
	get UI_des_205():ISubLanguageElement{return this.getElement(72007)};
	/**null*/
	get UI_des_206():ISubLanguageElement{return this.getElement(72008)};
	/**null*/
	get UI_des_207():ISubLanguageElement{return this.getElement(72009)};
	/**null*/
	get UI_des_208():ISubLanguageElement{return this.getElement(72010)};
	/**null*/
	get UI_des_209():ISubLanguageElement{return this.getElement(72011)};
	/**null*/
	get UI_des_210():ISubLanguageElement{return this.getElement(72012)};
	/**null*/
	get UI_des_211():ISubLanguageElement{return this.getElement(72013)};
	/**null*/
	get UI_des_212():ISubLanguageElement{return this.getElement(72014)};
	/**null*/
	get UI_des_213():ISubLanguageElement{return this.getElement(72015)};
	/**null*/
	get UI_des_214():ISubLanguageElement{return this.getElement(72016)};
	/**null*/
	get UI_blueprint_0():ISubLanguageElement{return this.getElement(81000)};
	/**null*/
	get UI_blueprintDes_0():ISubLanguageElement{return this.getElement(86001)};
	/**null*/
	get RealName_text_1():ISubLanguageElement{return this.getElement(90000)};
	/**null*/
	get RealName_text_2():ISubLanguageElement{return this.getElement(90001)};
	/**null*/
	get RealName_text_3():ISubLanguageElement{return this.getElement(90002)};
	/**null*/
	get RealName_text_4():ISubLanguageElement{return this.getElement(90003)};
	/**null*/
	get RealName_text_5():ISubLanguageElement{return this.getElement(90004)};
	/**null*/
	get RealName_text_6():ISubLanguageElement{return this.getElement(90005)};
	/**null*/
	get RealName_text_7():ISubLanguageElement{return this.getElement(90006)};
	/**null*/
	get Prop_Bobble_03():ISubLanguageElement{return this.getElement(90007)};
	/**null*/
	get AvatarFrame_16():ISubLanguageElement{return this.getElement(91001)};
	/**null*/
	get UI_item_61025():ISubLanguageElement{return this.getElement(91002)};

}