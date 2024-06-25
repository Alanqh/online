import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","Value","Value_CN","Value_JP"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage"],[2001,"Door_Tips1","This door cannot be opened.","这道门打不开",null],[2002,"Door_Tips2","You need {0} to open it.","需要{0}才能打开",null],[2004,"ts_tips_2","The monitor is broken, there's nothing to be seen.","坏了的监视器，已经看不到画面了",null],[2005,"ts_tips_3","The door is stuck. Look for another way out.","这扇门已经打不开了，找找别的出口吧",null],[2006,"ts_tips_4","Can't see out the window.","看不到窗外的情况",null],[2007,"ts_tips_5","It's about something mathematical.","写着有关数学的知识",null],[2008,"ts_tips_6","The book is too dirty to be read.","这本书非常脏，什么都看不见",null],[2009,"ts_tips_7","A ghost story is written on the book, but the content is unclear.","书上写着有关鬼的故事，故事内容已经看不清了",null],[2010,"ts_tips_8","Half-erased clothing design sketch.","被擦了一半的服装设计图",null],[2012,"ts_tips_10","Unopenable computer monitor.","打不开的电脑显示器",null],[2013,"ts_tips_11","A place for students to do some reading.","学生查阅书籍的地方",null],[2014,"ts_tips_12","Shelves of English magazines.","书架上都是英文杂志",null],[2015,"ts_tips_13","Many books are covered in dust.","各种书籍，上面落满了灰尘",null],[2016,"ts_tips_14","Some expired notices.","有一些过期的通知",null],[2017,"ts_tips_15","A toilet, seemingly left unflushed.","马桶，好像没冲干净",null],[2018,"ts_tips_16","A sink filled with water.","装满水的洗手台",null],[2019,"ts_tips_17","The mirror is very dirty, can't reflect anything.","镜子很脏，什么都反射不出来",null],[2020,"ts_tips_18","Can't be opened.","打不开",null],[2021,"ts_tips_19","Firefighting equipment.","消防器材",null],[2022,"ts_tips_20","A dusty trophy from the school days.","学校获得的奖杯，上面有很多灰尘",null],[2023,"ts_tips_21","Blakcboard littered with posters and notices.","黑板上贴满了海报和通知",null],[2026,"ts_tips_24","Emergency exit sign, follow the arrow to reach the exit.","安全出口标志，沿着箭头就能到达安全出口",null],[2027,"ts_tips_25","School Lobby","放学家长等候的区域",null],[2028,"ts_tips_26","Student's Certificate of Honor.","学生获得的荣誉奖状",null],[2029,"ts_tips_27","A world map covered in dust.","落满灰尘的世界地图",null],[2030,"ts_tips_28","The man in the painting looks very painful.","画里的男人好像很痛苦",null],[2031,"ts_tips_29","An unsettling smile.","令人不安的笑容",null],[2032,"ts_tips_30","Eerie scene, can't see anything in the black areas.","阴森的场景，黑色的地方什么也看不清",null],[2033,"ts_tips_31","A beautiful oil painted landscape.","优美的风景油画",null],[2034,"ts_tips_32","Strange portraits.","奇怪的人物画像",null],[2035,"ts_tips_33","Library","图书室",null],[2036,"ts_tips_34","Portrait oil painting.","人物油画",null],[2037,"ts_tips_35","Normal portrait painting.","普通人像画",null],[2038,"ts_tips_36","Portraits of A Celebrity","名人油画",null],[2039,"ts_tips_37","A tattered oil painting.","一幅破旧的油画",null],[2040,"ts_tips_38","Scattered Files","散落的文件",null],[2043,"ts_tips_41","Chemical apparatus","化学用具",null],[2044,"ts_tips_42","Bandages","绷带",null],[2045,"ts_tips_43","Medical Supplies","医用药品",null],[2046,"ts_tips_44","Eye Chart","视力表",null],[2047,"ts_tips_45","You can see a blood moon through the window.","透过窗户可以看到外面的血月",null],[2048,"ts_tips_46","Many chemical formulas written on the blackboard.","黑板上写着许多化学公式",null],[2049,"ts_tips_47","There seems to be some records, but you can't open it.","好像有什么档案，但是没办法打开",null],[2050,"ts_tips_48","A human body model for teaching.","教学用的人体模型",null],[2052,"ts_tips_50","Student's small drum.","学生用的小鼓",null],[2053,"ts_tips_51","Dusty drum kit","积满灰的架子鼓",null],[2054,"ts_tips_52","Students' musical instruments.","学生使用的乐器大号",null],[2055,"ts_tips_53","Strange sketches","奇怪的画",null],[2056,"ts_tips_54","Unrecognisable violinist","看不清人脸的小提琴手",null],[2057,"ts_tips_55","Beethoven","贝多芬",null],[2058,"ts_tips_56","Bach","巴赫",null],[2059,"ts_tips_57","Schumann","舒曼",null],[2060,"ts_tips_58","Terrified Portraits","惊恐的人像画",null],[2061,"ts_tips_59","This painting makes me feel like be stared","这幅画让我觉得有人在盯着我",null],[2062,"ts_tips_60","The paintings in the school are very strange.","这个学校的画都好奇怪",null],[2063,"ts_tips_61","Twisted old man's face","扭曲的老人脸",null],[2064,"ts_tips_62","A pommel horse","鞍马",null],[2065,"ts_tips_63","The box is full of balls for class, no useful clues.","箱子里都是上课用的球，没有有用的线索",null],[2066,"ts_tips_64","Rugby helmet","橄榄球头盔",null],[2067,"ts_tips_65","Tennis racket","网球拍",null],[2068,"ts_tips_66","Dumbbells","运动用的哑铃",null],[2069,"ts_tips_67","Boxing gloves","拳击手套",null],[2071,"ts_tips_69","Scattered documents and newspapers.","散落的文件和报纸",null],[2073,"ts_tips_71","The school has many mechanisms; opening them reveals unexpected discoveries.","学校有很多机关，打开有意想不到的发现",null],[2076,"ts_tips_74","Don't get too close to the ghosts; keep your distance!","放回丢失的奖杯，做一个行为规范的学生",null],[2077,"ts_tips_75","Be sure to open cabinets and drawers!","校长很喜欢图形，连大门钥匙都是带有形状的",null],[2079,"ts_tips_77","Children rain boots","小孩的雨鞋",null],[2080,"ts_tips_78","Sneakers","学生的运动鞋",null],[2081,"ts_tips_79","Putting the balls back in their corresponding positions can open a secret door.","把球放回对应的位置，就能开启暗门",null],[2082,"ts_tips_80","Deflated basketball","没了气的篮球",null],[2083,"ts_tips_81","Teacher's demonstration painting, slightly eerie.","老师的示范画，好像是美术课，画面稍微有点诡异",null],[2084,"ts_tips_82","Artworks from students.","学生上课的作品",null],[2085,"ts_tips_83","Oddly shaped fish.","形状怪异的鱼",null],[2086,"ts_tips_84","Autumn school uniform.","秋季校服",null],[2087,"ts_tips_85","Tuxedo","燕尾服",null],[2091,"ts_tips_89","A dead bug!","一只虫子！已经死掉了",null],[2098,"ts_tips_96","A kitchen knife","一把菜刀",null],[2099,"ts_tips_97","Broken lamp","打不开的台灯",null],[2100,"ts_tips_98","The paint box can be opened according to the color order.","按照颜色顺序能打开颜料箱",null],[2101,"ts_tips_99","Further ahead is the principal's office, which hides some principal's secrets.","再往前走就是校长办公室了，藏了一些校长的秘密",null],[2102,"ts_tips_100","Incorrect password!","密码错误",null],[2112,"UI_diffi_3","Easy","简单",null],[2113,"UI_diffi_4","Normal","普通",null],[2114,"UI_diffi_5","Hard","困难",null],[2115,"UI_diffi_6","Nightmare","噩梦",null],[2181,"UI_diffi_7","Hell","地狱",null],[2120,"UI_item_1","Art Room Key","画室钥匙",null],[2121,"UI_item_2","Crowbar","撬棍",null],[2122,"UI_item_3","Rusty Screwdriver","生锈的螺丝刀",null],[2123,"UI_item_4","Wires","电线圈",null],[2124,"UI_item_5","Iron Piece","铁片",null],[2125,"UI_item_6","Orange Password","橙色密码",null],[2126,"UI_item_7","Purple Password","紫色密码",null],[2127,"UI_item_8","Blue Password","蓝色密码",null],[2128,"UI_item_9","White Password","白色密码",null],[2129,"UI_item_10","Security Door Key","安全门钥匙",null],[2130,"EXCEL_diffculty_1","Ghost moves slowly, items are easy to find, Try various endings!\nCandles: 12","鬼的速度很慢，道具很容易找到，尝试多种结局吧！\n蜡烛数量：12根\n",null],[2131,"EXCEL_diffculty_2","Ghosts are a bit faster now, but items are still easy to find. Hope you can escape!\nCandles: 13","鬼速稍微快了点，道具还是容易找到的，希望你能逃出这里\n蜡烛数量：13根",null],[2132,"EXCEL_diffculty_3","Welcome to hard mode! You're skilled. Let's see how you perform!\nCandles: 15","已经到了困难模式呀，你很厉害，接下来看你表现了！\n蜡烛数量：15根",null],[2133,"EXCEL_diffculty_4","With the Blood Moon, ghosts are faster. Will you find it challenging?\nCandles: 17","红月给鬼提高了很多速度，你会感到吃力吗？\n蜡烛数量：17根",null],[2170,"EXCEL_diffculty_5","Ever encountered ultra-fast ghosts? Items aren't as easy to find. Good luck!\nCandles: 20","极速的鬼你见过吗，道具也没那么容易找到了，祝你好运吧！\n蜡烛数量：20根",null],[2135,"UI_item_12","Triangle Ritual Object","三角形钥匙",null],[2136,"UI_item_13","Square Ritual Object","方形钥匙",null],[2137,"UI_item_14","Circle Ritual Object","圆形钥匙",null],[2138,"UI_item_15","Iron Door Key","铁门钥匙",null],[2139,"UI_item_16","Bridge Gate","桥闸门",null],[2140,"UI_item_17","Boat Key","船的钥匙",null],[2141,"UI_item_18","The Steering Wheel of Boat","船上缺失的方向盘",null],[2142,"UI_item_19","Important Boat Component: Gear","船上的重要部件：齿轮",null],[2143,"UI_item_20","Boat's Power Source: Gasoline","船的动力来源：汽油",null],[2144,"UI_item_21","Safe Valve","保险箱阀门",null],[2145,"UI_item_22","Meat patty, seems to have saliva on it.","肉饼",null],[2146,"UI_item_23","Puzzle Piece 1, carefully observe its patter","拼图碎片1",null],[2147,"UI_item_24","Puzzle Piece 2, carefully observe its pattern","拼图碎片2",null],[2148,"UI_item_25","Puzzle Piece 3, carefully observe its pattern","拼图碎片3",null],[2149,"UI_item_26","Puzzle Piece 4, carefully observe its pattern","拼图碎片4",null],[2150,"UI_item_27","Triangle Ritual Object","三角祭祀物",null],[2151,"UI_item_28","Square Ritual Object","方形祭祀物",null],[2152,"UI_item_29","Circle Ritual Object","圆形祭祀物",null],[2153,"UI_item_30","Gold trophy","金奖杯，把它摆放到正确的位置吧",null],[2154,"UI_item_31","Silver trophy","银奖杯，把它摆放到正确的位置吧",null],[2155,"UI_item_32","Bronze trophy","铜奖杯，把它摆放到正确的位置吧",null],[2156,"UI_item_33","Wooden trophy","木奖杯，把它摆放到正确的位置吧",null],[2157,"UI_item_34","Soccer ball","一个足球，把它摆放到正确的位置吧",null],[2158,"UI_item_35","Basketball","一个篮球，把它摆放到正确的位置吧",null],[2159,"UI_item_36","Volleyball","一个排球，把它摆放到正确的位置吧",null],[2160,"UI_item_37","Severely damaged hammer","一把破损严重的锤子",null],[2161,"UI_item_38","Brand-new pair of pliers","一把崭新的钳子",null],[2162,"UI_item_39","Principal's ID Card","校长的身份卡",null],[2163,"UI_item_40","Key to the basement","地下通道钥匙",null],[2164,"UI_item_41","Banana, can be thrown out when being chased","香蕉，被追击时可以丢出去试试",null],[2165,"UI_item_42","Regular shovel","一把普通的铁铲",null],[2166,"UI_Story_textStory","Welcome to the Horror School.\n· You only have 5 days to escape.\n· Or you can try to uncover the truth and save Pamni.\n· Only a few rooms and lockers are safe.\n· There's said to be more than one way out.\nGood luck... ...","欢迎来到恐怖鬼校\n诡异的谜团和隐秘的真相等待你去揭开\n你只有 5 天时间逃出去，或者永远留在这\n学校里只有个别房间和柜子里是安全的\n听说出去的路不止一条\n他们来找你了…",null],[2167,"UI_Story_textTitle","Admission Notice","入学须知",null],[2168,"UI_Start_textTitle","Horror School","恐怖鬼校",null],[4000,"Ending_school_Title1","Ending 2: Echoes of Despair","结局二 绝望的回响",null],[4001,"Ending_Content1","After overcoming numerous difficulties, you finally escaped through the main door. However, the tragedy continues to unfold. Is there no way to save everyone?","历经重重困难，你终于从大门逃离了。但惨剧依然在不断上演，难道真的没有拯救所有人的办法吗？",null],[4002,"Ending_school_Title2","Ending 1: Nightmare Beyond","结局一 噩梦的彼岸",null],[4003,"Ending_Content2","You managed to escape the peril of the underground river, but it seems to be another trap. The principal's true secret is still hidden in this place of sin...","终于从暗河逃出险境，但这似乎是另一个陷阱？校长真正的秘密依然隐藏在这片罪恶之地…",null],[4004,"Ending_school_Title3","End 3: Holy Redemption","结局三 圣洁的救赎",null],[4005,"Ending_Content3","You have dispelled the Blood Moon's evil power and purified the parasitic evil spirit in Pamni's body. Salute to the hero who ended the principal's conspiracy!","你驱散了血月的邪恶之力，寄生在帕姆尼体内的恶灵被净化。向终结了校长阴谋的英雄致敬！",null],[4006,"Ending_Title0","End ?","结局 ？",null],[2169,"UI_item_43","Engine","发动机",null],[5001,"ts_tips_102","This is the cleaning room. It seems that students are often locked up here.","这里是保洁室，看样子经常有学生被关在这里",null],[5002,"ts_tips_103","No door lock, and it cannot be opened from the outside.","没有门锁，无法从外面打开",null],[5003,"ts_tips_104","One-way elevator: please take the elevator next to it.","单向电梯，请乘坐旁边的电梯",null],[5004,"ts_tips_105","Cannot be opened from the outside, and it seems to lead to some room.","从外面打不开，似乎通向哪个房间",null],[5005,"ts_tips_106","I have never seen the principal open the door from the outside.","从没见过校长从外面开门进去",null],[5101,"tips_show_01","The backpack is already full.","背包已经塞不下东西了",null],[5102,"tips_show_02","Items have been placed and cannot be placed again.","已经放置道具，无法放置",null],[5105,"tips_show_05","You searched the trash can for a while, but found nothing.","你翻找了一会垃圾桶，什么也没发现",null],[5100,"text_diffi_title","Difficulty","难度",null],[3001,"Notebook1_1","The Blood Moon has come; find a way to escape! The school gate is in the first-floor hall or the underground...","血月降临了，得想办法逃出去！一楼大厅的学校大门，或者地下…我，快不行了",null],[3002,"Notebook1_2","I can feel tremendous energy in the candles left by the exorcist. Perhaps it can be used to ignite other candles.","我能感受到驱魔人留下的蜡烛中蕴藏着巨大能量，或许可以用它点燃其它蜡烛",null],[3003,"Notebook1_3","The school has various mechanisms set up by someone, seemingly hiding some secrets.","学校被人为设置了各种机关，似乎在隐藏什么秘密",null],[3004,"Notebook1_4","If caught, you will be knocked unconscious for a day. We only have 5 days to escape, or else we'll be eaten...","被抓到会被打晕昏睡1天，我们每个人都只有 5 天的时间逃出去，否则会被吃掉…",null],[3005,"Notebook1_5","Only a few rooms and cabinets are safe, I'm not sure about other places...","只有个别房间和柜子里是安全的，其它地方…我不确定",null],[3006,"Notebook1_6","The backpack has limited capacity, temporarily unused items can be left in place.","背包的容量是有限的，暂时不用的东西可以丢在原地",null],[3007,"Notebook2_1","My partner says: The biology classroom is guarded. Don't worry, it only dares to sneak up from behind.","伙伴说：生物教室被看管着，别怕，它只敢在背后偷偷靠近",null],[3008,"Notebook2_2","Pamni, what happened to you?! Don't you recognize me?","帕姆尼，你怎么了？！你不认识我了吗",null],[3009,"Notebook2_3","At the end of the second-floor corridor, there are often screams from students... It, it's behind me!","二楼的走廊尽头，常常传来学生的惨叫…它，它在背后！",null],[3010,"Notebook2_4","Whenever the Blood Moon descends, the world will give birth to countless pains and evil thoughts...","每当血月降临，世间将诞生无数痛苦与恶念……",null],[3011,"Notebook2_5","Why do the \"classmates\" in the class keep staring at me?!","班上的“同学”为什么一直盯着我？！",null],[3012,"Notebook2_6","I don't believe it... Pamni wouldn't hurt me! An evil spirit must control her to become like this!","我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！",null],[3013,"Notebook3_1","The principal's office door has been locked all along. Could it be hiding some unknown secret?","校长办公室的门一直锁着，难道藏了什么不为人知的秘密？",null],[3014,"Notebook3_2","Is that... a hidden door? Is someone calling for help? It's too far, I can't hear clearly.","那是…一个暗门？有谁在求救吗？太远了，我听不清",null],[3015,"Notebook3_3","Where did my companions go? I can't hold on much longer...","我的同伴们…都去哪了？我快撑不下去了…",null],[3016,"Notebook3_4","The door can only be opened from one side, I need to find another way around.","只能从一侧打开的门，我得从其它的地方过去",null],[3017,"Notebook3_5","The principal modified an elevator in a corner of a classroom on the first floor. I wonder where it leads...","校长在一楼的某个教室角落里改造了一部电梯，不知道通向哪里…",null],[3018,"Notebook3_6","I can sense the will of the exorcist protecting us in the depths.","我能感受到驱魔人的意志在冥冥之中保护着我们",null],[3019,"Notebook4_1","I often see the principal swiping a card to enter a hidden door...","我经常看到校长刷卡进入一个暗门……",null],[3020,"Notebook4_2","I want to escape from here... No, I want to take everyone with me!","我要逃离这里…不，我想带大家一起逃出去！",null],[3021,"Notebook4_3","Has the passage connecting the basement to somewhere been blocked? Or should I first organize the balls on the ground...","地下室连接某处的通路被挡住了？还是先把地上的球整理一下吧",null],[3022,"Notebook4_4","I've had enough... these days of hiding and fear.","我受够了……躲来躲去的日子，好害怕",null],[3023,"Notebook4_5","I need to pull myself together, my companions are all protecting me!","我要振作起来，伙伴们都在保护我！",null],[3024,"Notebook4_6","Triangle, circle, square... I need three keys to leave this place.","三角、圆圈、方块，貌似需要三把钥匙才能离开这里",null],[3025,"Notebook5_1","Surveillance room... Have we been monitored by the principal all along?","监控室……难道我们一直在校长被监视着？",null],[3026,"Notebook5_2","There's an altar in the principal's office?! Perhaps there's something hidden inside they don't want us to discover...","校长室里竟然设了一个祭坛？！或许有什么不想被我们发现的东西藏在里面…",null],[3027,"Notebook5_3","I'm injured... there should be bandages in the second-floor infirmary.","我受伤了……二楼的医务室里应该有绷带",null],[3028,"Notebook5_4","Why is she crying... did she think of something sad?","她怎么在哭……是想到了悲伤的事情吗",null],[3029,"Notebook5_5","The school is filled with unsettling oil paintings.","学校到处悬挂着令人感到不安的油画",null],[3030,"Notebook5_6","Ahead is the principal's lounge; I've seen the principal coming here several times before entering the secret room.","前面是校长的休息室，我看到校长有好几次进入密室前都来这里取东西",null],[3031,"Notebook6_1","Cleaning room; it seems like companions are often locked in here.","保洁室，看样子经常有同伴被关在这里",null],[3032,"Notebook6_2","The art room seems safe... Oh? What's this strange paintbox?","画室似乎很安全…咦？这里怎么有一个奇怪的颜料箱",null],[3033,"Notebook6_3","With the roar of the engine, even the music became desperate and sad.","伴随着发动机的轰鸣声，连音乐都变得绝望而悲伤",null],[3034,"Notebook6_4","I heard students who accidentally enter the basement get eaten, unless... you can give her a tasty meat pie.","听说不小心闯入地下室的学生会被吃掉，除非…你能给她美味的肉饼",null],[3035,"Notebook6_5","I don't believe it... Pamni wouldn't hurt me! An evil spirit must control her to become like this!","我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！",null],[3036,"Notebook6_6","The underground river... seems like an excellent escape route!","地下暗河…似乎是一个绝佳的逃跑路径！",null],[3201,"catch_1","Only 4 days left; don't think you can escape from me!","还剩 4 天，别想从我手里逃出去！",null],[3202,"catch_2","Only 3 days left; you've angered me!","还剩 3 天，你惹怒我了！",null],[3203,"catch_3","Only 2 days left; lousy boy, don't fool me!","还剩 2 天，坏孩子，别想跟我耍花招！",null],[3204,"catch_4","Last day; stay here forever with me!","还剩最后 1 天，别挣扎了，永远留在这里不好吗？",null],[3101,"procedure_1","Click to continue the game","点击继续游戏",null],[3102,"procedure_2","Tap to start a new game","点击开始新游戏",null],[3103,"procedure_3","Empty","空",null],[3104,"procedure_4","Day {0}","第{0}天",null],[3105,"procedure_5","Time spent: {0}","耗时：{0}",null],[3106,"procedure_6","Creation date: {0}","创建日期：{0}",null],[3107,"procedure_7","Select save file","选择存档",null],[3108,"procedure_8","Delete the current save file?","是否删除当前存档",null],[3109,"procedure_9","Yes","是",null],[3110,"procedure_10","No","否",null],[3111,"procedure_11","Save 1","存档1",null],[3112,"procedure_12","Save 2","存档2",null],[3113,"procedure_13","Save 3","存档3",null],[3301,"ranktext_01","Not ranked","未上榜",null],[3302,"ranktime_01","Not cleared","未通关",null],[3303,"ranktext_02","World Ranking","世界排名",null],[3304,"ranktext_03","No one has cleared yet","目前还无人通关哦",null],[3305,"ranktext_04","Nickname","玩家昵称",null],[3401,"UI_Start_01","Start Adventure","开始冒险",null],[3402,"UI_Start_02","Switch","切换画风",null],[3403,"UI_Start_03","Normal","普通",null],[3404,"UI_Start_04","Cute","可爱",null],[3405,"UI_Start_05","Weird","诡异",null],[3406,"UI_dietext_01","You are losing consciousness to darkness...","你的意识逐渐被黑暗吞噬……",null],[3407,"UI_dietext_02","Escape Failed","逃脱失败",null],[3408,"UI_Start_06","Switch","切换难度",null],[3409,"UI_edback","Main Menu","回主菜单",null],[3410,"UI_edtime","Time","通关用时",null],[7101,"UI_Password_01","Close","关闭",null],[7102,"UI_Password_02","Confirm","确认",null],[7103,"UI_diffi_01","Difficulty: Easy","简单难度",null],[7104,"UI_diffi_02","Difficulty: Normal","普通难度",null],[7105,"UI_diffi_03","Difficulty: Hard","困难难度",null],[7106,"UI_diffi_04","Difficulty: Nightmare","噩梦难度",null],[7107,"UI_diffi_05","Difficulty: Hell","地狱难度",null],[7108,"UI_diffi_06","Record","通关记录",null],[7109,"UI_diffi_07","Explanation","难度说明",null],[7000,"Door_Tips3","Look for {0} and put it in the right position","寻找{0}，把他摆到正确的位置吧",null],[7001,"Door_Tips4","Digit {0} of the password: {1}","图书室密码箱第{0}位密码：{1}",null],[2171,"UI_item_44","Unextinguished candle","远古驱魔师留下的不会熄灭的蜡烛",null],[7002,"Door_Tips5","Obtained {0}","获得{0}",null],[7003,"Door_Tips6","{0}","{0}",null],[5006,"ts_tips_107","Rigid iron plates, it seems like there's another way in.","坚硬的铁板，好像有别的通道可以进入",null],[6001,"subtitles_1","Don't joke me to change the carefully prepared ghosts into this cutty, seriously?","别告诉我你这个菜鸟要把我精心准备的鬼换成这玩意？！",null],[6002,"subtitles_3","Like this art style? I appreciate your taste, but let's discuss it after you pass! LOL","喜欢这种画风？有点品味，不过能通关再说吧，呵呵。",null],[6003,"subtitles_2","Don't be scared into peeing your pants!","别被吓得尿裤子了~",null],[5007,"ts_tips_108","Keep the pointer in the white area.","将指针停留在白色区域内",null],[5008,"ts_tips_109","Let the pointer stay in color order to activate the mechanism.","让指针按颜色顺序停留可开启机关",null],[7004,"Door_Tips7","Light {0} more candles to dispel the magic circle.","还要点亮{0}根蜡烛解除法阵",null],[5302,"ts_tips_112","Sealed by iron plates, maybe there's another entrance.","被铁板封起来了，好像能从别的地方进入",null],[5303,"ts_tips_113","Safe box: find passwords scattered in classrooms to open (passwords are random and visible only to yourself).","保险箱，要找到散落在各个教室里的密码才能打开（密码是随机的，仅自己可见）",null],[5401,"ts_tips_201","The Blood Moon is here, find a way to escape! The school gate on the first floor, or the underground... I can't hold on much longer.","血月降临了，得想办法逃出去！一楼大厅的学校大门，或者地下…我，快不行了",null],[5402,"ts_tips_202","I can feel tremendous energy in the candles left by the exorcist. Perhaps it can be used to ignite other candles.","我能感受到驱魔人留下的蜡烛中蕴藏着巨大能量，或许可以用它点燃其它蜡烛",null],[5403,"ts_tips_203","The school has various mechanisms, hiding some secrets, it seems.","学校被人为设置了各种机关，似乎在隐藏什么秘密",null],[5404,"ts_tips_204","If caught, you will be knocked unconscious for a day. We only have 5 days to escape, or else we'll be eaten...","被抓到会被打晕昏睡1天，我们每个人都只有 5 天的时间逃出去，否则会被吃掉…",null],[5405,"ts_tips_205","Only a few rooms and lockers are safe; I'm not sure about other places.","只有个别房间和柜子里是安全的，其它地方…我不确定",null],[5406,"ts_tips_206","The backpack has limited capacity; temporarily unused items can be left in place.","背包的容量是有限的，暂时不用的东西可以丢在原地",null],[5407,"ts_tips_207","My partner says: The biology classroom is guarded. Don't worry; it only dares to sneak up from behind.","伙伴说：生物教室被看管着，别怕，它只敢在背后偷偷靠近",null],[5408,"ts_tips_208","Pamni, what happened to you?! Don't you recognize me?","帕姆尼，你怎么了？！你不认识我我了吗",null],[5409,"ts_tips_209","At the end of the second-floor corridor, there are often screams from students... it behind you!","二楼的走廊尽头，常常传来学生的惨叫…它，它在背后！",null],[5410,"ts_tips_210","Whenever the Blood Moon descends, the world will give birth to countless pains and evil thoughts...","每当血月降临，世间将诞生无数痛苦与恶念……",null],[5411,"ts_tips_211","Why do the \"classmates\" in the class keep staring at me?!","班上的“同学”为什么一直盯着我？！",null],[5412,"ts_tips_212","I don't believe it... Pamni wouldn't hurt me! An evil spirit must control her to become like this!","我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！",null],[5413,"ts_tips_213","The principal's office door has been locked all along. Could it be hiding some unknown secret?","校长办公室的门一直锁着，难道藏了什么不为人知的秘密？",null],[5414,"ts_tips_214","Is that a hidden door? Is someone calling for help? It's too far; I can't hear clearly.","那是…一个暗门？有谁在求救吗？太远了，我听不清",null],[5415,"ts_tips_215","Where did my companions go? I can't hold on much longer...","我的同伴们…都去哪了？我快撑不下去了…",null],[5416,"ts_tips_216","The door can only be opened from one side; I need to find another way around.","只能从一侧打开的门，我得从其它的地方过去",null],[5417,"ts_tips_217","The principal modified an elevator in a corner of a classroom on the first floor. I wonder where it leads...","校长在一楼的某个教室角落里改造了一部电梯，不知道通向哪里…",null],[5418,"ts_tips_218","I can sense the will of the exorcist protecting us in the depths.","我能感受到驱魔人的意志在冥冥之中保护着我们",null],[5419,"ts_tips_219","I often see the principal swiping a card to enter a hidden door...","我经常看到校长刷卡进入一个暗门……",null],[5420,"ts_tips_220","I want to escape from here... No, I want to take everyone with me!","我要逃离这里…不，我想带大家一起逃出去！",null],[5421,"ts_tips_221","Has the passage connecting the basement to somewhere been blocked? Or should I first organize the balls on the ground...","地下室连接某处的通路被挡住了？还是先把地上的球整理一下吧",null],[5422,"ts_tips_222","I've tired of hiding every moment, it's too scary.","我受够了……躲来躲去的日子，好害怕",null],[5423,"ts_tips_223","I need to pull myself together; my companions are all protecting me!","我要振作起来，伙伴们都在保护我！",null],[5424,"ts_tips_224","Triangle, circle, square... I need three keys to leave this place.","三角、圆圈、方块，貌似需要三把钥匙才能离开这里",null],[5425,"ts_tips_225","Surveillance room, have we been monitored by the principal all along?","监控室……难道我们一直在校长被监视着？",null],[5426,"ts_tips_226","There's an altar in the principal's office?! Perhaps there's something hidden inside they don't want us to discover.","校长室里竟然设了一个祭坛？！或许有什么不想被我们发现的东西藏在里面…",null],[5427,"ts_tips_227","I'm injured... there should be bandages in the second-floor infirmary.","我受伤了……二楼的医务室里应该有绷带",null],[5428,"ts_tips_228","Why is she crying... did she think of something sad?","她怎么在哭……是想到了悲伤的事情吗",null],[5429,"ts_tips_229","The school is filled with unsettling oil paintings.","学校到处悬挂着令人感到不安的油画",null],[5430,"ts_tips_230","Ahead is the principal's lounge; I've seen the principal coming here several times before entering the secret room.","前面是校长的休息室，我看到校长有好几次进入密室前都来这里取东西",null],[5431,"ts_tips_231","Cleaning room; it seems like companions are often locked in here.","保洁室，看样子经常有同伴被关在这里",null],[5432,"ts_tips_232","The art room seems safe... Oh? What's this strange paintbox?","画室似乎很安全…咦？这里怎么有一个奇怪的颜料箱",null],[5433,"ts_tips_233","With the roar of the engine, even the music became desperate and sad.","伴随着发动机的轰鸣声，连音乐都变得绝望而悲伤",null],[5434,"ts_tips_234","I heard students who accidentally enter the basement get eaten, unless... you can give her a tasty meat pie.","听说不小心闯入地下室的学生会被吃掉，除非…你能给她美味的肉饼",null],[5435,"ts_tips_235","I don't believe Pamni would hurt me! There must be an evil spirit made her become like this!","我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！",null],[5436,"ts_tips_236","The underground river... seems like an excellent escape route!","地下暗河…似乎是一个绝佳的逃跑路径！",null],[5501,"ts_tips_301","Through the door crack, I can feel a mysterious evil force; maybe there's another way in?","透过门缝，能感受到一股神秘的邪恶力量袭来，或许能从其它地方进去？",null],[5502,"ts_tips_302","Candles tainted by the Blood Moon, light them with the exorcist's candles to purify.","被血月侵蚀的蜡烛，用远古驱魔人留下的蜡烛点燃可以净化它",null],[5503,"ts_tips_303","The malice on the candle has receded, and the evil force in a particular place has weakened.","蜡烛上的恶念消退了，位于某处的邪恶力量也随之削弱了",null],[5504,"ts_tips_304","A voice from ancient times says: 'Come, child, I guide you with the exorcist's will to end the darkness.'","来自远古的声音传来：来吧孩子，我以驱魔人的意志指引你，终结黑暗——",null],[5505,"ts_tips_305","Guiding power, only the brave inheriting the exorcist's will can see it.","指引之力，只有继承了驱魔人意志的勇敢者可以看到",null],[5506,"ts_tips_306","The Blood Moon taints the exorcism circle! I can't get close now.","驱魔法阵被血月侵蚀了！现在根本无法靠近",null],[5507,"ts_tips_307","The Blood Moon taints the exorcism circle; light all the candles to dispel the darkness and activate the ring.","驱魔法阵被血月侵蚀了，点燃所有的蜡烛来驱散黑暗，激活法阵",null],[5508,"ts_tips_308","This candle has been lit.","这个蜡烛已经被点燃",null],[5509,"ts_tips_309","Candle Clue: Look in the mirror.","此蜡烛位于：照照镜子吧",null],[5510,"ts_tips_310","Candle Clue: Why hasn't she come out yet? I need to use the bathroom!","此蜡烛位于：怎么还不出来！我要上厕所",null],[5511,"ts_tips_311","Candle Clue: Why is there an elevator in the classroom?","此蜡烛位于：教室里怎么会有电梯？",null],[5512,"ts_tips_312","Candle Clue: Escape is just a step away.","此蜡烛位于：逃离，仅一步之遥",null],[5513,"ts_tips_313","Candle Clue: From the underground's aura.","此蜡烛位于：来自地下的气息",null],[5514,"ts_tips_314","Candle Clue: Damp, dark, and narrow.","此蜡烛位于：潮湿、黑暗、狭窄",null],[5515,"ts_tips_315","Candle Clue: Huge Blood Moon, eerie beauty.","此蜡烛位于：巨大的血月，诡异的美",null],[5516,"ts_tips_316","Candle Clue: One, two, three... Ready or not, here I come...","此蜡烛位于：123，木头人",null],[5517,"ts_tips_317","Candle Clue: I'm injured, help me bandage it!","此蜡烛位于：受伤了，帮我包扎一下",null],[5518,"ts_tips_318","Candle Clue: Delicious thick soup.","此蜡烛位于：美味浓汤",null],[5519,"ts_tips_319","Candle Clue: Powerful magical force.","此蜡烛位于：强大的魔法力量",null],[5520,"ts_tips_320","The evil force in the erosion circle has been dispelled!","侵蚀法阵的邪恶力量被驱散了！",null],[5521,"ts_tips_321","The massive exorcism candle... it's time to light it!","巨大的驱魔蜡烛…就是现在，点燃它！",null],[5522,"ts_tips_322","A secret door, can't be forced open.","一个暗门，无法用蛮力打开",null],[5523,"ts_tips_323","This painting seems tilted due to the Blood Moon. Try to adjust it.","这幅画似乎也因为血月的影响歪掉了，把它摆正试试？",null],[5524,"ts_tips_324","The painting rotated! But why is it still tilted? Try again.","画转动了！但是怎么还是歪的？再试试",null],[5525,"ts_tips_325","The painting rotated! But why is it still tilted? Try a few more times.","画转动了！但是怎么还是歪的？多试几次？",null],[5526,"ts_tips_326","The painting rotated! But why is it still tilted? It looks like it's almost successful.","画转动了！但是怎么还是歪的？看起来就快成功了",null],[5527,"ts_tips_327","Behind the painting, there's actually a passage?! I wonder where it leads...","画后面居然隐藏了一个通道 ？！不知道会通向哪里呢…",null],[2172,"UI_item_45","Ladder, you can use it to reach high places","梯子，可以用它拿高处的东西了",null],[5528,"ts_tips_328","Triggering the mechanism can open it.","触发机关可以打开",null],[2173,"UI_walltips_1","Use item: \nLight the <color=#ff0000ff>candle</color>.","使用道具\n点燃<color=#ff0000ff>蜡烛</color>",null],[2174,"UI_walltips_2","Light all the <color=#ff0000ff>candles</color> to remove the Blood Moon threat.","点燃所有<color=#ff0000ff>蜡烛</color>\n可以解除血月威胁",null],[2175,"UI_walltips_3","Click to open the door","点击 开门",null],[2200,"UI_walltips_4","Click to open the secret door","点击 打开\n暗门",null],[2201,"UI_walltips_5","<color=#ff0000ff>Safe Box</color>","<color=#ff0000ff>安全柜</color>",null],[2202,"UI_walltips_6","Click to pick up <color=#ff0000ff>Round Key</color>","点击拾取<color=#ff0000ff>圆钥匙</color>",null],[2203,"UI_walltips_7","Put back <color=#ff0000ff>Trophy</color> to obtain a key item","放回<color=#ff0000ff>奖杯</color>\n获得关键道具",null],[2204,"UI_walltips_8","Use special-shaped <color=#ff0000ff>Key</color>","使 用特 殊形 状<color=#ff0000ff>钥 匙</color>",null],[2205,"UI_walltips_9","Open the escape door","开 启逃 生大 门",null],[2206,"UI_walltips_10","Put back the lost <color=#ff0001ff>Puzzle</color>","放回丢失的<color=#ff0001ff>拼图</color>",null],[2207,"UI_walltips_11","Go light the <color=#ff0000ff>Candle</color> left by the exorcist. The school's fate is in your hands, young one.","去点燃驱魔人留下的<color=#ff0000ff>蜡烛</color>吧\n拯救学校就靠你了，年轻人",null],[2208,"UI_walltips_12","Ignite the nearby <color=#ff0000ff>Candle</color>","点燃旁边的<color=#ff0000ff>蜡烛</color>",null],[2209,"UI_walltips_13","Click to rotate the <color=#ff0000ff>Painting</color>. \nTry multiple times ^ ^","点击转动<color=#ff0000ff>画像</color>\n多点几次^ ^",null],[2210,"UI_walltips_14","<color=#ff0000ff>Run!!!</color>","<color=#ff0000ff>快逃!!!</color>",null],[2211,"back_01","Return to Game","返回游戏",null],[2212,"back_02","Main Menu","返回主菜单",null],[2230,"help_01","Long press the screen to give up asking for help","长按屏幕放弃求救",null],[2231,"help_02","Help me!","请救救我！",null],[2232,"help_03","HELP","HELP",null],[2233,"help_04","{}","{}",null],[2234,"help_05","{}m","{}米",null],[2235,"ts_tips_329","Have you found all the secrets behind the paintings?","你已经找到所有画背后的秘密了?",null],[2236,"ts_tips_330","Need to power on before opening the safe","需要先通电，才能打开保险箱",null],[2237,"UI_item_46","Blue Cup","蓝色杯子",null],[2238,"UI_item_47","Yellow Cup","黄色杯子",null],[2239,"ts_tips_331","There's a mechanism controlling this curtain","有机关控制着这个窗帘",null],[2240,"UI_item_48","Green Candle","绿色蜡烛",null],[2241,"ts_tips_332","Congratulations, you've mastered the color mechanism","恭喜你掌握了颜色反应机关",null],[2242,"UI_item_49","Dorm Secret Door","宿舍暗门钥匙",null],[2243,"ts_tips_333","Awesome, you must have seen the password!","棒耶，你一定看到密码了吧！",null],[2244,"ts_tips_334","There must be secrets outside these two windows!","这两扇窗的外面一定有秘密！",null],[2245,"ts_tips_335","Congratulations, you've learned the Purge Skill!","恭喜你，学会了净化技巧！",null],[2246,"diffilock_01","Unlock any ending at {0} mode","通过{0}难度任意结局解锁",null],[2247,"diffilock_02","{0} mode unlocked","{0}难度已解锁",null],[2248,"diffilock_03","Tap anywhere to close","点击屏幕任意位置关闭",null],[2249,"help_06","(Long press on the left to give up asking for help)","（长按屏幕左侧放弃求救）",null],[2250,"help_07","Can be revived by other players within {0}s","{0}秒内被其他玩家解除可复活",null],[2251,"UI_walltips_15",null,"这里是<color=#ff0000ff>绝对安全</color>的区域",null],[2252,"UI_walltips_16","Start","开始",null],[2253,"UI_walltips_17","Adventure","冒险",null],[2254,"UI_walltips_18","Safe Zone","安全区域",null],[2255,"UI_walltips_19","Password","密码",null],[2256,"ts_tips_336","Rotate to connect wires","转动连接电线",null],[2257,"ts_tips_337","Make sure to look at the paintings in this room!","一定要看这个房间里的画！",null],[2258,"ts_tips_338","Password Correct","密码正确",null],[2259,"UI_walltips_20",null,"此保险箱密码在安全区域内",null],[2260,"ts_tips_339","Success！","成功",null],[2261,"ts_tips_340","Failed！","失败",null],[2262,"UI_walltips_21","Library","图书室",null],[2263,"back_03","Back to hall","返回大厅",null],[2264,"UI_item_56","Camera","照相机",null],[2265,"BackToHall_01","Back to hall","返回大厅",null],[2266,"UI_des_1","Can be used to open the studio","可以用来开启画室",null],[2267,"UI_des_2","It can be used to pry a lot of things","能用来撬开很多东西",null],[2268,"UI_des_3","Old enough to be used only once","旧到只能用一次",null],[2269,"UI_des_4","Gear locks can be energized","可以为齿轮锁通电",null],[2270,"UI_des_6","The first password","第一位密码",null],[2271,"UI_des_7","The second password","第二位密码",null],[2272,"UI_des_8","The third digit of the password","第三位密码",null],[2273,"UI_des_12","The key has a strange shape, it is triangular","形状奇怪得钥匙，是三角形的",null],[2274,"UI_des_13","The key is strangely shaped, it is square","形状奇怪得钥匙，是正方形的",null],[2275,"UI_des_14","The key has a strange shape, it is round","形状奇怪得钥匙，是圆形的",null],[2276,"UI_des_15","A key that carries a lot of weight","一把很有分量得钥匙",null],[2277,"UI_des_16","It's like a switch on a console","像是一个操作台的开关",null],[2278,"UI_des_18","The reverse disc is missing from the ship","船上缺失的反向盘","  "],[2279,"UI_des_19","An important component on board: gears","船上的重要部件：齿轮",null],[2280,"UI_des_20","The power source of the ship: gasoline","船的动力来源：汽油",null],[2281,"UI_des_21","The safe is missing a start switch","保险箱缺失的启动开关",null],[2282,"UI_des_22","It seems to be saliva","上面好像还沾着口水",null],[2283,"UI_des_23","A fragmented part of a painting, take a closer look at his pattern","一幅画残缺的部分，仔细观察他的图案",null],[2284,"UI_des_24","A fragmented part of a painting, take a closer look at his pattern","一幅画残缺的部分，仔细观察他的图案",null],[2285,"UI_des_25","A fragmented part of a painting, take a closer look at his pattern","一幅画残缺的部分，仔细观察他的图案",null],[2286,"UI_des_26","A fragmented part of a painting, take a closer look at his pattern","一幅画残缺的部分，仔细观察他的图案",null],[2287,"UI_des_27","A triangular item of pure gold, which seems to have a peculiar effect","纯金的三角形物品，似乎有奇特的效果",null],[2288,"UI_des_28","A square item of pure gold that seems to have a peculiar effect","纯金的正方形物品，似乎有奇特的效果",null],[2289,"UI_des_29","A round item of pure gold that seems to have a peculiar effect","纯金的圆形物品，似乎有奇特的效果",null],[2290,"UI_des_30","Prizes for the first prize in the learning competition","学习竞赛一等奖的奖励品",null],[2291,"UI_des_31","Prizes for the second prize in the Mathematics Olympiad","奥数竞赛二等奖的奖励品",null],[2292,"UI_des_32","The prize for the third prize in the ancient poetry competition","古诗比赛三等奖的奖励品",null],[2293,"UI_des_33","Encouragement trophies","鼓励级的奖杯",null],[2294,"UI_des_34","The soccer ball, which is almost flattened, seems to be used a lot","已经快扁了的足球，好像经常使用",null],[2295,"UI_des_35","The shabby old basketball is very popular with the students","破破旧旧的篮球，学生非常喜欢",null],[2296,"UI_des_36","Brand new volleyball, very well preserved","崭新的排球，保存的很好",null],[2297,"UI_des_37","When you knock it once, it shatters and feels brittle like glass","敲一次就会碎裂，感觉比玻璃还脆",null],[2298,"UI_des_38","The tools left by the security guard seem to have been newly bought","保安留下的工具，好像是新买的",null],[2299,"UI_des_39","It's not like a simple ID card, it seems to open the door","不像是简单的身份卡，似乎可以开门",null],[2300,"UI_des_40","This key is very well kept, and it should be able to open a very important door","这把钥匙被保存的很好，应该能开很重要的门",null],[2301,"UI_des_42","It can both shovel soil and knock on glass","既可以铲土又可以敲玻璃",null],[2302,"UI_des_43","The power source of the boat","开船的动力来源",null],[2303,"UI_des_44","Candles with mana, use them to light other candles and set up circles","具有法力的蜡烛，使用其点燃其他蜡烛并布置法阵",null],[2304,"UI_des_45","You can use it to hold things from above","可以用它拿高处的东西了",null],[2305,"UI_des_46","A blue mug that students love","学生都喜欢的蓝色杯子",null],[2306,"UI_des_47","Yellow cups are also popular","黄色杯子也很受欢迎",null],[2307,"UI_des_48","It's similar to a mana candle, but it's a normal candle","和法力蜡烛很像，但是是普通蜡烛",null],[2308,"UI_des_49","A secret door in the dormitory can be opened","可以打开宿舍里的一扇暗门",null]];
export interface ILanguageElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字索引*/
	name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**这道门打不开*/
	get Door_Tips1():ILanguageElement{return this.getElement(2001)};
	/**需要{0}才能打开*/
	get Door_Tips2():ILanguageElement{return this.getElement(2002)};
	/**坏了的监视器，已经看不到画面了*/
	get ts_tips_2():ILanguageElement{return this.getElement(2004)};
	/**这扇门已经打不开了，找找别的出口吧*/
	get ts_tips_3():ILanguageElement{return this.getElement(2005)};
	/**看不到窗外的情况*/
	get ts_tips_4():ILanguageElement{return this.getElement(2006)};
	/**写着有关数学的知识*/
	get ts_tips_5():ILanguageElement{return this.getElement(2007)};
	/**这本书非常脏，什么都看不见*/
	get ts_tips_6():ILanguageElement{return this.getElement(2008)};
	/**书上写着有关鬼的故事，故事内容已经看不清了*/
	get ts_tips_7():ILanguageElement{return this.getElement(2009)};
	/**被擦了一半的服装设计图*/
	get ts_tips_8():ILanguageElement{return this.getElement(2010)};
	/**打不开的电脑显示器*/
	get ts_tips_10():ILanguageElement{return this.getElement(2012)};
	/**学生查阅书籍的地方*/
	get ts_tips_11():ILanguageElement{return this.getElement(2013)};
	/**书架上都是英文杂志*/
	get ts_tips_12():ILanguageElement{return this.getElement(2014)};
	/**各种书籍，上面落满了灰尘*/
	get ts_tips_13():ILanguageElement{return this.getElement(2015)};
	/**有一些过期的通知*/
	get ts_tips_14():ILanguageElement{return this.getElement(2016)};
	/**马桶，好像没冲干净*/
	get ts_tips_15():ILanguageElement{return this.getElement(2017)};
	/**装满水的洗手台*/
	get ts_tips_16():ILanguageElement{return this.getElement(2018)};
	/**镜子很脏，什么都反射不出来*/
	get ts_tips_17():ILanguageElement{return this.getElement(2019)};
	/**打不开*/
	get ts_tips_18():ILanguageElement{return this.getElement(2020)};
	/**消防器材*/
	get ts_tips_19():ILanguageElement{return this.getElement(2021)};
	/**学校获得的奖杯，上面有很多灰尘*/
	get ts_tips_20():ILanguageElement{return this.getElement(2022)};
	/**黑板上贴满了海报和通知*/
	get ts_tips_21():ILanguageElement{return this.getElement(2023)};
	/**安全出口标志，沿着箭头就能到达安全出口*/
	get ts_tips_24():ILanguageElement{return this.getElement(2026)};
	/**放学家长等候的区域*/
	get ts_tips_25():ILanguageElement{return this.getElement(2027)};
	/**学生获得的荣誉奖状*/
	get ts_tips_26():ILanguageElement{return this.getElement(2028)};
	/**落满灰尘的世界地图*/
	get ts_tips_27():ILanguageElement{return this.getElement(2029)};
	/**画里的男人好像很痛苦*/
	get ts_tips_28():ILanguageElement{return this.getElement(2030)};
	/**令人不安的笑容*/
	get ts_tips_29():ILanguageElement{return this.getElement(2031)};
	/**阴森的场景，黑色的地方什么也看不清*/
	get ts_tips_30():ILanguageElement{return this.getElement(2032)};
	/**优美的风景油画*/
	get ts_tips_31():ILanguageElement{return this.getElement(2033)};
	/**奇怪的人物画像*/
	get ts_tips_32():ILanguageElement{return this.getElement(2034)};
	/**图书室*/
	get ts_tips_33():ILanguageElement{return this.getElement(2035)};
	/**人物油画*/
	get ts_tips_34():ILanguageElement{return this.getElement(2036)};
	/**普通人像画*/
	get ts_tips_35():ILanguageElement{return this.getElement(2037)};
	/**名人油画*/
	get ts_tips_36():ILanguageElement{return this.getElement(2038)};
	/**一幅破旧的油画*/
	get ts_tips_37():ILanguageElement{return this.getElement(2039)};
	/**散落的文件*/
	get ts_tips_38():ILanguageElement{return this.getElement(2040)};
	/**化学用具*/
	get ts_tips_41():ILanguageElement{return this.getElement(2043)};
	/**绷带*/
	get ts_tips_42():ILanguageElement{return this.getElement(2044)};
	/**医用药品*/
	get ts_tips_43():ILanguageElement{return this.getElement(2045)};
	/**视力表*/
	get ts_tips_44():ILanguageElement{return this.getElement(2046)};
	/**透过窗户可以看到外面的血月*/
	get ts_tips_45():ILanguageElement{return this.getElement(2047)};
	/**黑板上写着许多化学公式*/
	get ts_tips_46():ILanguageElement{return this.getElement(2048)};
	/**好像有什么档案，但是没办法打开*/
	get ts_tips_47():ILanguageElement{return this.getElement(2049)};
	/**教学用的人体模型*/
	get ts_tips_48():ILanguageElement{return this.getElement(2050)};
	/**学生用的小鼓*/
	get ts_tips_50():ILanguageElement{return this.getElement(2052)};
	/**积满灰的架子鼓*/
	get ts_tips_51():ILanguageElement{return this.getElement(2053)};
	/**学生使用的乐器大号*/
	get ts_tips_52():ILanguageElement{return this.getElement(2054)};
	/**奇怪的画*/
	get ts_tips_53():ILanguageElement{return this.getElement(2055)};
	/**看不清人脸的小提琴手*/
	get ts_tips_54():ILanguageElement{return this.getElement(2056)};
	/**贝多芬*/
	get ts_tips_55():ILanguageElement{return this.getElement(2057)};
	/**巴赫*/
	get ts_tips_56():ILanguageElement{return this.getElement(2058)};
	/**舒曼*/
	get ts_tips_57():ILanguageElement{return this.getElement(2059)};
	/**惊恐的人像画*/
	get ts_tips_58():ILanguageElement{return this.getElement(2060)};
	/**这幅画让我觉得有人在盯着我*/
	get ts_tips_59():ILanguageElement{return this.getElement(2061)};
	/**这个学校的画都好奇怪*/
	get ts_tips_60():ILanguageElement{return this.getElement(2062)};
	/**扭曲的老人脸*/
	get ts_tips_61():ILanguageElement{return this.getElement(2063)};
	/**鞍马*/
	get ts_tips_62():ILanguageElement{return this.getElement(2064)};
	/**箱子里都是上课用的球，没有有用的线索*/
	get ts_tips_63():ILanguageElement{return this.getElement(2065)};
	/**橄榄球头盔*/
	get ts_tips_64():ILanguageElement{return this.getElement(2066)};
	/**网球拍*/
	get ts_tips_65():ILanguageElement{return this.getElement(2067)};
	/**运动用的哑铃*/
	get ts_tips_66():ILanguageElement{return this.getElement(2068)};
	/**拳击手套*/
	get ts_tips_67():ILanguageElement{return this.getElement(2069)};
	/**散落的文件和报纸*/
	get ts_tips_69():ILanguageElement{return this.getElement(2071)};
	/**学校有很多机关，打开有意想不到的发现*/
	get ts_tips_71():ILanguageElement{return this.getElement(2073)};
	/**放回丢失的奖杯，做一个行为规范的学生*/
	get ts_tips_74():ILanguageElement{return this.getElement(2076)};
	/**校长很喜欢图形，连大门钥匙都是带有形状的*/
	get ts_tips_75():ILanguageElement{return this.getElement(2077)};
	/**小孩的雨鞋*/
	get ts_tips_77():ILanguageElement{return this.getElement(2079)};
	/**学生的运动鞋*/
	get ts_tips_78():ILanguageElement{return this.getElement(2080)};
	/**把球放回对应的位置，就能开启暗门*/
	get ts_tips_79():ILanguageElement{return this.getElement(2081)};
	/**没了气的篮球*/
	get ts_tips_80():ILanguageElement{return this.getElement(2082)};
	/**老师的示范画，好像是美术课，画面稍微有点诡异*/
	get ts_tips_81():ILanguageElement{return this.getElement(2083)};
	/**学生上课的作品*/
	get ts_tips_82():ILanguageElement{return this.getElement(2084)};
	/**形状怪异的鱼*/
	get ts_tips_83():ILanguageElement{return this.getElement(2085)};
	/**秋季校服*/
	get ts_tips_84():ILanguageElement{return this.getElement(2086)};
	/**燕尾服*/
	get ts_tips_85():ILanguageElement{return this.getElement(2087)};
	/**一只虫子！已经死掉了*/
	get ts_tips_89():ILanguageElement{return this.getElement(2091)};
	/**一把菜刀*/
	get ts_tips_96():ILanguageElement{return this.getElement(2098)};
	/**打不开的台灯*/
	get ts_tips_97():ILanguageElement{return this.getElement(2099)};
	/**按照颜色顺序能打开颜料箱*/
	get ts_tips_98():ILanguageElement{return this.getElement(2100)};
	/**再往前走就是校长办公室了，藏了一些校长的秘密*/
	get ts_tips_99():ILanguageElement{return this.getElement(2101)};
	/**密码错误*/
	get ts_tips_100():ILanguageElement{return this.getElement(2102)};
	/**简单*/
	get UI_diffi_3():ILanguageElement{return this.getElement(2112)};
	/**普通*/
	get UI_diffi_4():ILanguageElement{return this.getElement(2113)};
	/**困难*/
	get UI_diffi_5():ILanguageElement{return this.getElement(2114)};
	/**噩梦*/
	get UI_diffi_6():ILanguageElement{return this.getElement(2115)};
	/**地狱*/
	get UI_diffi_7():ILanguageElement{return this.getElement(2181)};
	/**画室钥匙*/
	get UI_item_1():ILanguageElement{return this.getElement(2120)};
	/**撬棍*/
	get UI_item_2():ILanguageElement{return this.getElement(2121)};
	/**生锈的螺丝刀*/
	get UI_item_3():ILanguageElement{return this.getElement(2122)};
	/**电线圈*/
	get UI_item_4():ILanguageElement{return this.getElement(2123)};
	/**铁片*/
	get UI_item_5():ILanguageElement{return this.getElement(2124)};
	/**橙色密码*/
	get UI_item_6():ILanguageElement{return this.getElement(2125)};
	/**紫色密码*/
	get UI_item_7():ILanguageElement{return this.getElement(2126)};
	/**蓝色密码*/
	get UI_item_8():ILanguageElement{return this.getElement(2127)};
	/**白色密码*/
	get UI_item_9():ILanguageElement{return this.getElement(2128)};
	/**安全门钥匙*/
	get UI_item_10():ILanguageElement{return this.getElement(2129)};
	/**鬼的速度很慢，道具很容易找到，尝试多种结局吧！
蜡烛数量：12根
*/
	get EXCEL_diffculty_1():ILanguageElement{return this.getElement(2130)};
	/**鬼速稍微快了点，道具还是容易找到的，希望你能逃出这里
蜡烛数量：13根*/
	get EXCEL_diffculty_2():ILanguageElement{return this.getElement(2131)};
	/**已经到了困难模式呀，你很厉害，接下来看你表现了！
蜡烛数量：15根*/
	get EXCEL_diffculty_3():ILanguageElement{return this.getElement(2132)};
	/**红月给鬼提高了很多速度，你会感到吃力吗？
蜡烛数量：17根*/
	get EXCEL_diffculty_4():ILanguageElement{return this.getElement(2133)};
	/**极速的鬼你见过吗，道具也没那么容易找到了，祝你好运吧！
蜡烛数量：20根*/
	get EXCEL_diffculty_5():ILanguageElement{return this.getElement(2170)};
	/**三角形钥匙*/
	get UI_item_12():ILanguageElement{return this.getElement(2135)};
	/**方形钥匙*/
	get UI_item_13():ILanguageElement{return this.getElement(2136)};
	/**圆形钥匙*/
	get UI_item_14():ILanguageElement{return this.getElement(2137)};
	/**铁门钥匙*/
	get UI_item_15():ILanguageElement{return this.getElement(2138)};
	/**桥闸门*/
	get UI_item_16():ILanguageElement{return this.getElement(2139)};
	/**船的钥匙*/
	get UI_item_17():ILanguageElement{return this.getElement(2140)};
	/**船上缺失的方向盘*/
	get UI_item_18():ILanguageElement{return this.getElement(2141)};
	/**船上的重要部件：齿轮*/
	get UI_item_19():ILanguageElement{return this.getElement(2142)};
	/**船的动力来源：汽油*/
	get UI_item_20():ILanguageElement{return this.getElement(2143)};
	/**保险箱阀门*/
	get UI_item_21():ILanguageElement{return this.getElement(2144)};
	/**肉饼*/
	get UI_item_22():ILanguageElement{return this.getElement(2145)};
	/**拼图碎片1*/
	get UI_item_23():ILanguageElement{return this.getElement(2146)};
	/**拼图碎片2*/
	get UI_item_24():ILanguageElement{return this.getElement(2147)};
	/**拼图碎片3*/
	get UI_item_25():ILanguageElement{return this.getElement(2148)};
	/**拼图碎片4*/
	get UI_item_26():ILanguageElement{return this.getElement(2149)};
	/**三角祭祀物*/
	get UI_item_27():ILanguageElement{return this.getElement(2150)};
	/**方形祭祀物*/
	get UI_item_28():ILanguageElement{return this.getElement(2151)};
	/**圆形祭祀物*/
	get UI_item_29():ILanguageElement{return this.getElement(2152)};
	/**金奖杯，把它摆放到正确的位置吧*/
	get UI_item_30():ILanguageElement{return this.getElement(2153)};
	/**银奖杯，把它摆放到正确的位置吧*/
	get UI_item_31():ILanguageElement{return this.getElement(2154)};
	/**铜奖杯，把它摆放到正确的位置吧*/
	get UI_item_32():ILanguageElement{return this.getElement(2155)};
	/**木奖杯，把它摆放到正确的位置吧*/
	get UI_item_33():ILanguageElement{return this.getElement(2156)};
	/**一个足球，把它摆放到正确的位置吧*/
	get UI_item_34():ILanguageElement{return this.getElement(2157)};
	/**一个篮球，把它摆放到正确的位置吧*/
	get UI_item_35():ILanguageElement{return this.getElement(2158)};
	/**一个排球，把它摆放到正确的位置吧*/
	get UI_item_36():ILanguageElement{return this.getElement(2159)};
	/**一把破损严重的锤子*/
	get UI_item_37():ILanguageElement{return this.getElement(2160)};
	/**一把崭新的钳子*/
	get UI_item_38():ILanguageElement{return this.getElement(2161)};
	/**校长的身份卡*/
	get UI_item_39():ILanguageElement{return this.getElement(2162)};
	/**地下通道钥匙*/
	get UI_item_40():ILanguageElement{return this.getElement(2163)};
	/**香蕉，被追击时可以丢出去试试*/
	get UI_item_41():ILanguageElement{return this.getElement(2164)};
	/**一把普通的铁铲*/
	get UI_item_42():ILanguageElement{return this.getElement(2165)};
	/**欢迎来到恐怖鬼校
诡异的谜团和隐秘的真相等待你去揭开
你只有 5 天时间逃出去，或者永远留在这
学校里只有个别房间和柜子里是安全的
听说出去的路不止一条
他们来找你了…*/
	get UI_Story_textStory():ILanguageElement{return this.getElement(2166)};
	/**入学须知*/
	get UI_Story_textTitle():ILanguageElement{return this.getElement(2167)};
	/**恐怖鬼校*/
	get UI_Start_textTitle():ILanguageElement{return this.getElement(2168)};
	/**结局二 绝望的回响*/
	get Ending_school_Title1():ILanguageElement{return this.getElement(4000)};
	/**历经重重困难，你终于从大门逃离了。但惨剧依然在不断上演，难道真的没有拯救所有人的办法吗？*/
	get Ending_Content1():ILanguageElement{return this.getElement(4001)};
	/**结局一 噩梦的彼岸*/
	get Ending_school_Title2():ILanguageElement{return this.getElement(4002)};
	/**终于从暗河逃出险境，但这似乎是另一个陷阱？校长真正的秘密依然隐藏在这片罪恶之地…*/
	get Ending_Content2():ILanguageElement{return this.getElement(4003)};
	/**结局三 圣洁的救赎*/
	get Ending_school_Title3():ILanguageElement{return this.getElement(4004)};
	/**你驱散了血月的邪恶之力，寄生在帕姆尼体内的恶灵被净化。向终结了校长阴谋的英雄致敬！*/
	get Ending_Content3():ILanguageElement{return this.getElement(4005)};
	/**结局 ？*/
	get Ending_Title0():ILanguageElement{return this.getElement(4006)};
	/**发动机*/
	get UI_item_43():ILanguageElement{return this.getElement(2169)};
	/**这里是保洁室，看样子经常有学生被关在这里*/
	get ts_tips_102():ILanguageElement{return this.getElement(5001)};
	/**没有门锁，无法从外面打开*/
	get ts_tips_103():ILanguageElement{return this.getElement(5002)};
	/**单向电梯，请乘坐旁边的电梯*/
	get ts_tips_104():ILanguageElement{return this.getElement(5003)};
	/**从外面打不开，似乎通向哪个房间*/
	get ts_tips_105():ILanguageElement{return this.getElement(5004)};
	/**从没见过校长从外面开门进去*/
	get ts_tips_106():ILanguageElement{return this.getElement(5005)};
	/**背包已经塞不下东西了*/
	get tips_show_01():ILanguageElement{return this.getElement(5101)};
	/**已经放置道具，无法放置*/
	get tips_show_02():ILanguageElement{return this.getElement(5102)};
	/**你翻找了一会垃圾桶，什么也没发现*/
	get tips_show_05():ILanguageElement{return this.getElement(5105)};
	/**难度*/
	get text_diffi_title():ILanguageElement{return this.getElement(5100)};
	/**血月降临了，得想办法逃出去！一楼大厅的学校大门，或者地下…我，快不行了*/
	get Notebook1_1():ILanguageElement{return this.getElement(3001)};
	/**我能感受到驱魔人留下的蜡烛中蕴藏着巨大能量，或许可以用它点燃其它蜡烛*/
	get Notebook1_2():ILanguageElement{return this.getElement(3002)};
	/**学校被人为设置了各种机关，似乎在隐藏什么秘密*/
	get Notebook1_3():ILanguageElement{return this.getElement(3003)};
	/**被抓到会被打晕昏睡1天，我们每个人都只有 5 天的时间逃出去，否则会被吃掉…*/
	get Notebook1_4():ILanguageElement{return this.getElement(3004)};
	/**只有个别房间和柜子里是安全的，其它地方…我不确定*/
	get Notebook1_5():ILanguageElement{return this.getElement(3005)};
	/**背包的容量是有限的，暂时不用的东西可以丢在原地*/
	get Notebook1_6():ILanguageElement{return this.getElement(3006)};
	/**伙伴说：生物教室被看管着，别怕，它只敢在背后偷偷靠近*/
	get Notebook2_1():ILanguageElement{return this.getElement(3007)};
	/**帕姆尼，你怎么了？！你不认识我了吗*/
	get Notebook2_2():ILanguageElement{return this.getElement(3008)};
	/**二楼的走廊尽头，常常传来学生的惨叫…它，它在背后！*/
	get Notebook2_3():ILanguageElement{return this.getElement(3009)};
	/**每当血月降临，世间将诞生无数痛苦与恶念……*/
	get Notebook2_4():ILanguageElement{return this.getElement(3010)};
	/**班上的“同学”为什么一直盯着我？！*/
	get Notebook2_5():ILanguageElement{return this.getElement(3011)};
	/**我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！*/
	get Notebook2_6():ILanguageElement{return this.getElement(3012)};
	/**校长办公室的门一直锁着，难道藏了什么不为人知的秘密？*/
	get Notebook3_1():ILanguageElement{return this.getElement(3013)};
	/**那是…一个暗门？有谁在求救吗？太远了，我听不清*/
	get Notebook3_2():ILanguageElement{return this.getElement(3014)};
	/**我的同伴们…都去哪了？我快撑不下去了…*/
	get Notebook3_3():ILanguageElement{return this.getElement(3015)};
	/**只能从一侧打开的门，我得从其它的地方过去*/
	get Notebook3_4():ILanguageElement{return this.getElement(3016)};
	/**校长在一楼的某个教室角落里改造了一部电梯，不知道通向哪里…*/
	get Notebook3_5():ILanguageElement{return this.getElement(3017)};
	/**我能感受到驱魔人的意志在冥冥之中保护着我们*/
	get Notebook3_6():ILanguageElement{return this.getElement(3018)};
	/**我经常看到校长刷卡进入一个暗门……*/
	get Notebook4_1():ILanguageElement{return this.getElement(3019)};
	/**我要逃离这里…不，我想带大家一起逃出去！*/
	get Notebook4_2():ILanguageElement{return this.getElement(3020)};
	/**地下室连接某处的通路被挡住了？还是先把地上的球整理一下吧*/
	get Notebook4_3():ILanguageElement{return this.getElement(3021)};
	/**我受够了……躲来躲去的日子，好害怕*/
	get Notebook4_4():ILanguageElement{return this.getElement(3022)};
	/**我要振作起来，伙伴们都在保护我！*/
	get Notebook4_5():ILanguageElement{return this.getElement(3023)};
	/**三角、圆圈、方块，貌似需要三把钥匙才能离开这里*/
	get Notebook4_6():ILanguageElement{return this.getElement(3024)};
	/**监控室……难道我们一直在校长被监视着？*/
	get Notebook5_1():ILanguageElement{return this.getElement(3025)};
	/**校长室里竟然设了一个祭坛？！或许有什么不想被我们发现的东西藏在里面…*/
	get Notebook5_2():ILanguageElement{return this.getElement(3026)};
	/**我受伤了……二楼的医务室里应该有绷带*/
	get Notebook5_3():ILanguageElement{return this.getElement(3027)};
	/**她怎么在哭……是想到了悲伤的事情吗*/
	get Notebook5_4():ILanguageElement{return this.getElement(3028)};
	/**学校到处悬挂着令人感到不安的油画*/
	get Notebook5_5():ILanguageElement{return this.getElement(3029)};
	/**前面是校长的休息室，我看到校长有好几次进入密室前都来这里取东西*/
	get Notebook5_6():ILanguageElement{return this.getElement(3030)};
	/**保洁室，看样子经常有同伴被关在这里*/
	get Notebook6_1():ILanguageElement{return this.getElement(3031)};
	/**画室似乎很安全…咦？这里怎么有一个奇怪的颜料箱*/
	get Notebook6_2():ILanguageElement{return this.getElement(3032)};
	/**伴随着发动机的轰鸣声，连音乐都变得绝望而悲伤*/
	get Notebook6_3():ILanguageElement{return this.getElement(3033)};
	/**听说不小心闯入地下室的学生会被吃掉，除非…你能给她美味的肉饼*/
	get Notebook6_4():ILanguageElement{return this.getElement(3034)};
	/**我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！*/
	get Notebook6_5():ILanguageElement{return this.getElement(3035)};
	/**地下暗河…似乎是一个绝佳的逃跑路径！*/
	get Notebook6_6():ILanguageElement{return this.getElement(3036)};
	/**还剩 4 天，别想从我手里逃出去！*/
	get catch_1():ILanguageElement{return this.getElement(3201)};
	/**还剩 3 天，你惹怒我了！*/
	get catch_2():ILanguageElement{return this.getElement(3202)};
	/**还剩 2 天，坏孩子，别想跟我耍花招！*/
	get catch_3():ILanguageElement{return this.getElement(3203)};
	/**还剩最后 1 天，别挣扎了，永远留在这里不好吗？*/
	get catch_4():ILanguageElement{return this.getElement(3204)};
	/**点击继续游戏*/
	get procedure_1():ILanguageElement{return this.getElement(3101)};
	/**点击开始新游戏*/
	get procedure_2():ILanguageElement{return this.getElement(3102)};
	/**空*/
	get procedure_3():ILanguageElement{return this.getElement(3103)};
	/**第{0}天*/
	get procedure_4():ILanguageElement{return this.getElement(3104)};
	/**耗时：{0}*/
	get procedure_5():ILanguageElement{return this.getElement(3105)};
	/**创建日期：{0}*/
	get procedure_6():ILanguageElement{return this.getElement(3106)};
	/**选择存档*/
	get procedure_7():ILanguageElement{return this.getElement(3107)};
	/**是否删除当前存档*/
	get procedure_8():ILanguageElement{return this.getElement(3108)};
	/**是*/
	get procedure_9():ILanguageElement{return this.getElement(3109)};
	/**否*/
	get procedure_10():ILanguageElement{return this.getElement(3110)};
	/**存档1*/
	get procedure_11():ILanguageElement{return this.getElement(3111)};
	/**存档2*/
	get procedure_12():ILanguageElement{return this.getElement(3112)};
	/**存档3*/
	get procedure_13():ILanguageElement{return this.getElement(3113)};
	/**未上榜*/
	get ranktext_01():ILanguageElement{return this.getElement(3301)};
	/**未通关*/
	get ranktime_01():ILanguageElement{return this.getElement(3302)};
	/**世界排名*/
	get ranktext_02():ILanguageElement{return this.getElement(3303)};
	/**目前还无人通关哦*/
	get ranktext_03():ILanguageElement{return this.getElement(3304)};
	/**玩家昵称*/
	get ranktext_04():ILanguageElement{return this.getElement(3305)};
	/**开始冒险*/
	get UI_Start_01():ILanguageElement{return this.getElement(3401)};
	/**切换画风*/
	get UI_Start_02():ILanguageElement{return this.getElement(3402)};
	/**普通*/
	get UI_Start_03():ILanguageElement{return this.getElement(3403)};
	/**可爱*/
	get UI_Start_04():ILanguageElement{return this.getElement(3404)};
	/**诡异*/
	get UI_Start_05():ILanguageElement{return this.getElement(3405)};
	/**你的意识逐渐被黑暗吞噬……*/
	get UI_dietext_01():ILanguageElement{return this.getElement(3406)};
	/**逃脱失败*/
	get UI_dietext_02():ILanguageElement{return this.getElement(3407)};
	/**切换难度*/
	get UI_Start_06():ILanguageElement{return this.getElement(3408)};
	/**回主菜单*/
	get UI_edback():ILanguageElement{return this.getElement(3409)};
	/**通关用时*/
	get UI_edtime():ILanguageElement{return this.getElement(3410)};
	/**关闭*/
	get UI_Password_01():ILanguageElement{return this.getElement(7101)};
	/**确认*/
	get UI_Password_02():ILanguageElement{return this.getElement(7102)};
	/**简单难度*/
	get UI_diffi_01():ILanguageElement{return this.getElement(7103)};
	/**普通难度*/
	get UI_diffi_02():ILanguageElement{return this.getElement(7104)};
	/**困难难度*/
	get UI_diffi_03():ILanguageElement{return this.getElement(7105)};
	/**噩梦难度*/
	get UI_diffi_04():ILanguageElement{return this.getElement(7106)};
	/**地狱难度*/
	get UI_diffi_05():ILanguageElement{return this.getElement(7107)};
	/**通关记录*/
	get UI_diffi_06():ILanguageElement{return this.getElement(7108)};
	/**难度说明*/
	get UI_diffi_07():ILanguageElement{return this.getElement(7109)};
	/**寻找{0}，把他摆到正确的位置吧*/
	get Door_Tips3():ILanguageElement{return this.getElement(7000)};
	/**图书室密码箱第{0}位密码：{1}*/
	get Door_Tips4():ILanguageElement{return this.getElement(7001)};
	/**远古驱魔师留下的不会熄灭的蜡烛*/
	get UI_item_44():ILanguageElement{return this.getElement(2171)};
	/**获得{0}*/
	get Door_Tips5():ILanguageElement{return this.getElement(7002)};
	/**{0}*/
	get Door_Tips6():ILanguageElement{return this.getElement(7003)};
	/**坚硬的铁板，好像有别的通道可以进入*/
	get ts_tips_107():ILanguageElement{return this.getElement(5006)};
	/**别告诉我你这个菜鸟要把我精心准备的鬼换成这玩意？！*/
	get subtitles_1():ILanguageElement{return this.getElement(6001)};
	/**喜欢这种画风？有点品味，不过能通关再说吧，呵呵。*/
	get subtitles_3():ILanguageElement{return this.getElement(6002)};
	/**别被吓得尿裤子了~*/
	get subtitles_2():ILanguageElement{return this.getElement(6003)};
	/**将指针停留在白色区域内*/
	get ts_tips_108():ILanguageElement{return this.getElement(5007)};
	/**让指针按颜色顺序停留可开启机关*/
	get ts_tips_109():ILanguageElement{return this.getElement(5008)};
	/**还要点亮{0}根蜡烛解除法阵*/
	get Door_Tips7():ILanguageElement{return this.getElement(7004)};
	/**被铁板封起来了，好像能从别的地方进入*/
	get ts_tips_112():ILanguageElement{return this.getElement(5302)};
	/**保险箱，要找到散落在各个教室里的密码才能打开（密码是随机的，仅自己可见）*/
	get ts_tips_113():ILanguageElement{return this.getElement(5303)};
	/**血月降临了，得想办法逃出去！一楼大厅的学校大门，或者地下…我，快不行了*/
	get ts_tips_201():ILanguageElement{return this.getElement(5401)};
	/**我能感受到驱魔人留下的蜡烛中蕴藏着巨大能量，或许可以用它点燃其它蜡烛*/
	get ts_tips_202():ILanguageElement{return this.getElement(5402)};
	/**学校被人为设置了各种机关，似乎在隐藏什么秘密*/
	get ts_tips_203():ILanguageElement{return this.getElement(5403)};
	/**被抓到会被打晕昏睡1天，我们每个人都只有 5 天的时间逃出去，否则会被吃掉…*/
	get ts_tips_204():ILanguageElement{return this.getElement(5404)};
	/**只有个别房间和柜子里是安全的，其它地方…我不确定*/
	get ts_tips_205():ILanguageElement{return this.getElement(5405)};
	/**背包的容量是有限的，暂时不用的东西可以丢在原地*/
	get ts_tips_206():ILanguageElement{return this.getElement(5406)};
	/**伙伴说：生物教室被看管着，别怕，它只敢在背后偷偷靠近*/
	get ts_tips_207():ILanguageElement{return this.getElement(5407)};
	/**帕姆尼，你怎么了？！你不认识我我了吗*/
	get ts_tips_208():ILanguageElement{return this.getElement(5408)};
	/**二楼的走廊尽头，常常传来学生的惨叫…它，它在背后！*/
	get ts_tips_209():ILanguageElement{return this.getElement(5409)};
	/**每当血月降临，世间将诞生无数痛苦与恶念……*/
	get ts_tips_210():ILanguageElement{return this.getElement(5410)};
	/**班上的“同学”为什么一直盯着我？！*/
	get ts_tips_211():ILanguageElement{return this.getElement(5411)};
	/**我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！*/
	get ts_tips_212():ILanguageElement{return this.getElement(5412)};
	/**校长办公室的门一直锁着，难道藏了什么不为人知的秘密？*/
	get ts_tips_213():ILanguageElement{return this.getElement(5413)};
	/**那是…一个暗门？有谁在求救吗？太远了，我听不清*/
	get ts_tips_214():ILanguageElement{return this.getElement(5414)};
	/**我的同伴们…都去哪了？我快撑不下去了…*/
	get ts_tips_215():ILanguageElement{return this.getElement(5415)};
	/**只能从一侧打开的门，我得从其它的地方过去*/
	get ts_tips_216():ILanguageElement{return this.getElement(5416)};
	/**校长在一楼的某个教室角落里改造了一部电梯，不知道通向哪里…*/
	get ts_tips_217():ILanguageElement{return this.getElement(5417)};
	/**我能感受到驱魔人的意志在冥冥之中保护着我们*/
	get ts_tips_218():ILanguageElement{return this.getElement(5418)};
	/**我经常看到校长刷卡进入一个暗门……*/
	get ts_tips_219():ILanguageElement{return this.getElement(5419)};
	/**我要逃离这里…不，我想带大家一起逃出去！*/
	get ts_tips_220():ILanguageElement{return this.getElement(5420)};
	/**地下室连接某处的通路被挡住了？还是先把地上的球整理一下吧*/
	get ts_tips_221():ILanguageElement{return this.getElement(5421)};
	/**我受够了……躲来躲去的日子，好害怕*/
	get ts_tips_222():ILanguageElement{return this.getElement(5422)};
	/**我要振作起来，伙伴们都在保护我！*/
	get ts_tips_223():ILanguageElement{return this.getElement(5423)};
	/**三角、圆圈、方块，貌似需要三把钥匙才能离开这里*/
	get ts_tips_224():ILanguageElement{return this.getElement(5424)};
	/**监控室……难道我们一直在校长被监视着？*/
	get ts_tips_225():ILanguageElement{return this.getElement(5425)};
	/**校长室里竟然设了一个祭坛？！或许有什么不想被我们发现的东西藏在里面…*/
	get ts_tips_226():ILanguageElement{return this.getElement(5426)};
	/**我受伤了……二楼的医务室里应该有绷带*/
	get ts_tips_227():ILanguageElement{return this.getElement(5427)};
	/**她怎么在哭……是想到了悲伤的事情吗*/
	get ts_tips_228():ILanguageElement{return this.getElement(5428)};
	/**学校到处悬挂着令人感到不安的油画*/
	get ts_tips_229():ILanguageElement{return this.getElement(5429)};
	/**前面是校长的休息室，我看到校长有好几次进入密室前都来这里取东西*/
	get ts_tips_230():ILanguageElement{return this.getElement(5430)};
	/**保洁室，看样子经常有同伴被关在这里*/
	get ts_tips_231():ILanguageElement{return this.getElement(5431)};
	/**画室似乎很安全…咦？这里怎么有一个奇怪的颜料箱*/
	get ts_tips_232():ILanguageElement{return this.getElement(5432)};
	/**伴随着发动机的轰鸣声，连音乐都变得绝望而悲伤*/
	get ts_tips_233():ILanguageElement{return this.getElement(5433)};
	/**听说不小心闯入地下室的学生会被吃掉，除非…你能给她美味的肉饼*/
	get ts_tips_234():ILanguageElement{return this.getElement(5434)};
	/**我不相信……帕姆尼是不会伤害我的！她一定是被恶灵控制了才会变成这样！*/
	get ts_tips_235():ILanguageElement{return this.getElement(5435)};
	/**地下暗河…似乎是一个绝佳的逃跑路径！*/
	get ts_tips_236():ILanguageElement{return this.getElement(5436)};
	/**透过门缝，能感受到一股神秘的邪恶力量袭来，或许能从其它地方进去？*/
	get ts_tips_301():ILanguageElement{return this.getElement(5501)};
	/**被血月侵蚀的蜡烛，用远古驱魔人留下的蜡烛点燃可以净化它*/
	get ts_tips_302():ILanguageElement{return this.getElement(5502)};
	/**蜡烛上的恶念消退了，位于某处的邪恶力量也随之削弱了*/
	get ts_tips_303():ILanguageElement{return this.getElement(5503)};
	/**来自远古的声音传来：来吧孩子，我以驱魔人的意志指引你，终结黑暗——*/
	get ts_tips_304():ILanguageElement{return this.getElement(5504)};
	/**指引之力，只有继承了驱魔人意志的勇敢者可以看到*/
	get ts_tips_305():ILanguageElement{return this.getElement(5505)};
	/**驱魔法阵被血月侵蚀了！现在根本无法靠近*/
	get ts_tips_306():ILanguageElement{return this.getElement(5506)};
	/**驱魔法阵被血月侵蚀了，点燃所有的蜡烛来驱散黑暗，激活法阵*/
	get ts_tips_307():ILanguageElement{return this.getElement(5507)};
	/**这个蜡烛已经被点燃*/
	get ts_tips_308():ILanguageElement{return this.getElement(5508)};
	/**此蜡烛位于：照照镜子吧*/
	get ts_tips_309():ILanguageElement{return this.getElement(5509)};
	/**此蜡烛位于：怎么还不出来！我要上厕所*/
	get ts_tips_310():ILanguageElement{return this.getElement(5510)};
	/**此蜡烛位于：教室里怎么会有电梯？*/
	get ts_tips_311():ILanguageElement{return this.getElement(5511)};
	/**此蜡烛位于：逃离，仅一步之遥*/
	get ts_tips_312():ILanguageElement{return this.getElement(5512)};
	/**此蜡烛位于：来自地下的气息*/
	get ts_tips_313():ILanguageElement{return this.getElement(5513)};
	/**此蜡烛位于：潮湿、黑暗、狭窄*/
	get ts_tips_314():ILanguageElement{return this.getElement(5514)};
	/**此蜡烛位于：巨大的血月，诡异的美*/
	get ts_tips_315():ILanguageElement{return this.getElement(5515)};
	/**此蜡烛位于：123，木头人*/
	get ts_tips_316():ILanguageElement{return this.getElement(5516)};
	/**此蜡烛位于：受伤了，帮我包扎一下*/
	get ts_tips_317():ILanguageElement{return this.getElement(5517)};
	/**此蜡烛位于：美味浓汤*/
	get ts_tips_318():ILanguageElement{return this.getElement(5518)};
	/**此蜡烛位于：强大的魔法力量*/
	get ts_tips_319():ILanguageElement{return this.getElement(5519)};
	/**侵蚀法阵的邪恶力量被驱散了！*/
	get ts_tips_320():ILanguageElement{return this.getElement(5520)};
	/**巨大的驱魔蜡烛…就是现在，点燃它！*/
	get ts_tips_321():ILanguageElement{return this.getElement(5521)};
	/**一个暗门，无法用蛮力打开*/
	get ts_tips_322():ILanguageElement{return this.getElement(5522)};
	/**这幅画似乎也因为血月的影响歪掉了，把它摆正试试？*/
	get ts_tips_323():ILanguageElement{return this.getElement(5523)};
	/**画转动了！但是怎么还是歪的？再试试*/
	get ts_tips_324():ILanguageElement{return this.getElement(5524)};
	/**画转动了！但是怎么还是歪的？多试几次？*/
	get ts_tips_325():ILanguageElement{return this.getElement(5525)};
	/**画转动了！但是怎么还是歪的？看起来就快成功了*/
	get ts_tips_326():ILanguageElement{return this.getElement(5526)};
	/**画后面居然隐藏了一个通道 ？！不知道会通向哪里呢…*/
	get ts_tips_327():ILanguageElement{return this.getElement(5527)};
	/**梯子，可以用它拿高处的东西了*/
	get UI_item_45():ILanguageElement{return this.getElement(2172)};
	/**触发机关可以打开*/
	get ts_tips_328():ILanguageElement{return this.getElement(5528)};
	/**使用道具
点燃<color=#ff0000ff>蜡烛</color>*/
	get UI_walltips_1():ILanguageElement{return this.getElement(2173)};
	/**点燃所有<color=#ff0000ff>蜡烛</color>
可以解除血月威胁*/
	get UI_walltips_2():ILanguageElement{return this.getElement(2174)};
	/**点击 开门*/
	get UI_walltips_3():ILanguageElement{return this.getElement(2175)};
	/**点击 打开
暗门*/
	get UI_walltips_4():ILanguageElement{return this.getElement(2200)};
	/**<color=#ff0000ff>安全柜</color>*/
	get UI_walltips_5():ILanguageElement{return this.getElement(2201)};
	/**点击拾取<color=#ff0000ff>圆钥匙</color>*/
	get UI_walltips_6():ILanguageElement{return this.getElement(2202)};
	/**放回<color=#ff0000ff>奖杯</color>
获得关键道具*/
	get UI_walltips_7():ILanguageElement{return this.getElement(2203)};
	/**使 用特 殊形 状<color=#ff0000ff>钥 匙</color>*/
	get UI_walltips_8():ILanguageElement{return this.getElement(2204)};
	/**开 启逃 生大 门*/
	get UI_walltips_9():ILanguageElement{return this.getElement(2205)};
	/**放回丢失的<color=#ff0001ff>拼图</color>*/
	get UI_walltips_10():ILanguageElement{return this.getElement(2206)};
	/**去点燃驱魔人留下的<color=#ff0000ff>蜡烛</color>吧
拯救学校就靠你了，年轻人*/
	get UI_walltips_11():ILanguageElement{return this.getElement(2207)};
	/**点燃旁边的<color=#ff0000ff>蜡烛</color>*/
	get UI_walltips_12():ILanguageElement{return this.getElement(2208)};
	/**点击转动<color=#ff0000ff>画像</color>
多点几次^ ^*/
	get UI_walltips_13():ILanguageElement{return this.getElement(2209)};
	/**<color=#ff0000ff>快逃!!!</color>*/
	get UI_walltips_14():ILanguageElement{return this.getElement(2210)};
	/**返回游戏*/
	get back_01():ILanguageElement{return this.getElement(2211)};
	/**返回主菜单*/
	get back_02():ILanguageElement{return this.getElement(2212)};
	/**长按屏幕放弃求救*/
	get help_01():ILanguageElement{return this.getElement(2230)};
	/**请救救我！*/
	get help_02():ILanguageElement{return this.getElement(2231)};
	/**HELP*/
	get help_03():ILanguageElement{return this.getElement(2232)};
	/**{}*/
	get help_04():ILanguageElement{return this.getElement(2233)};
	/**{}米*/
	get help_05():ILanguageElement{return this.getElement(2234)};
	/**你已经找到所有画背后的秘密了?*/
	get ts_tips_329():ILanguageElement{return this.getElement(2235)};
	/**需要先通电，才能打开保险箱*/
	get ts_tips_330():ILanguageElement{return this.getElement(2236)};
	/**蓝色杯子*/
	get UI_item_46():ILanguageElement{return this.getElement(2237)};
	/**黄色杯子*/
	get UI_item_47():ILanguageElement{return this.getElement(2238)};
	/**有机关控制着这个窗帘*/
	get ts_tips_331():ILanguageElement{return this.getElement(2239)};
	/**绿色蜡烛*/
	get UI_item_48():ILanguageElement{return this.getElement(2240)};
	/**恭喜你掌握了颜色反应机关*/
	get ts_tips_332():ILanguageElement{return this.getElement(2241)};
	/**宿舍暗门钥匙*/
	get UI_item_49():ILanguageElement{return this.getElement(2242)};
	/**棒耶，你一定看到密码了吧！*/
	get ts_tips_333():ILanguageElement{return this.getElement(2243)};
	/**这两扇窗的外面一定有秘密！*/
	get ts_tips_334():ILanguageElement{return this.getElement(2244)};
	/**恭喜你，学会了净化技巧！*/
	get ts_tips_335():ILanguageElement{return this.getElement(2245)};
	/**通过{0}难度任意结局解锁*/
	get diffilock_01():ILanguageElement{return this.getElement(2246)};
	/**{0}难度已解锁*/
	get diffilock_02():ILanguageElement{return this.getElement(2247)};
	/**点击屏幕任意位置关闭*/
	get diffilock_03():ILanguageElement{return this.getElement(2248)};
	/**（长按屏幕左侧放弃求救）*/
	get help_06():ILanguageElement{return this.getElement(2249)};
	/**{0}秒内被其他玩家解除可复活*/
	get help_07():ILanguageElement{return this.getElement(2250)};
	/**这里是<color=#ff0000ff>绝对安全</color>的区域*/
	get UI_walltips_15():ILanguageElement{return this.getElement(2251)};
	/**开始*/
	get UI_walltips_16():ILanguageElement{return this.getElement(2252)};
	/**冒险*/
	get UI_walltips_17():ILanguageElement{return this.getElement(2253)};
	/**安全区域*/
	get UI_walltips_18():ILanguageElement{return this.getElement(2254)};
	/**密码*/
	get UI_walltips_19():ILanguageElement{return this.getElement(2255)};
	/**转动连接电线*/
	get ts_tips_336():ILanguageElement{return this.getElement(2256)};
	/**一定要看这个房间里的画！*/
	get ts_tips_337():ILanguageElement{return this.getElement(2257)};
	/**密码正确*/
	get ts_tips_338():ILanguageElement{return this.getElement(2258)};
	/**此保险箱密码在安全区域内*/
	get UI_walltips_20():ILanguageElement{return this.getElement(2259)};
	/**成功*/
	get ts_tips_339():ILanguageElement{return this.getElement(2260)};
	/**失败*/
	get ts_tips_340():ILanguageElement{return this.getElement(2261)};
	/**图书室*/
	get UI_walltips_21():ILanguageElement{return this.getElement(2262)};
	/**返回大厅*/
	get back_03():ILanguageElement{return this.getElement(2263)};
	/**照相机*/
	get UI_item_56():ILanguageElement{return this.getElement(2264)};
	/**返回大厅*/
	get BackToHall_01():ILanguageElement{return this.getElement(2265)};
	/**可以用来开启画室*/
	get UI_des_1():ILanguageElement{return this.getElement(2266)};
	/**能用来撬开很多东西*/
	get UI_des_2():ILanguageElement{return this.getElement(2267)};
	/**旧到只能用一次*/
	get UI_des_3():ILanguageElement{return this.getElement(2268)};
	/**可以为齿轮锁通电*/
	get UI_des_4():ILanguageElement{return this.getElement(2269)};
	/**第一位密码*/
	get UI_des_6():ILanguageElement{return this.getElement(2270)};
	/**第二位密码*/
	get UI_des_7():ILanguageElement{return this.getElement(2271)};
	/**第三位密码*/
	get UI_des_8():ILanguageElement{return this.getElement(2272)};
	/**形状奇怪得钥匙，是三角形的*/
	get UI_des_12():ILanguageElement{return this.getElement(2273)};
	/**形状奇怪得钥匙，是正方形的*/
	get UI_des_13():ILanguageElement{return this.getElement(2274)};
	/**形状奇怪得钥匙，是圆形的*/
	get UI_des_14():ILanguageElement{return this.getElement(2275)};
	/**一把很有分量得钥匙*/
	get UI_des_15():ILanguageElement{return this.getElement(2276)};
	/**像是一个操作台的开关*/
	get UI_des_16():ILanguageElement{return this.getElement(2277)};
	/**船上缺失的反向盘*/
	get UI_des_18():ILanguageElement{return this.getElement(2278)};
	/**船上的重要部件：齿轮*/
	get UI_des_19():ILanguageElement{return this.getElement(2279)};
	/**船的动力来源：汽油*/
	get UI_des_20():ILanguageElement{return this.getElement(2280)};
	/**保险箱缺失的启动开关*/
	get UI_des_21():ILanguageElement{return this.getElement(2281)};
	/**上面好像还沾着口水*/
	get UI_des_22():ILanguageElement{return this.getElement(2282)};
	/**一幅画残缺的部分，仔细观察他的图案*/
	get UI_des_23():ILanguageElement{return this.getElement(2283)};
	/**一幅画残缺的部分，仔细观察他的图案*/
	get UI_des_24():ILanguageElement{return this.getElement(2284)};
	/**一幅画残缺的部分，仔细观察他的图案*/
	get UI_des_25():ILanguageElement{return this.getElement(2285)};
	/**一幅画残缺的部分，仔细观察他的图案*/
	get UI_des_26():ILanguageElement{return this.getElement(2286)};
	/**纯金的三角形物品，似乎有奇特的效果*/
	get UI_des_27():ILanguageElement{return this.getElement(2287)};
	/**纯金的正方形物品，似乎有奇特的效果*/
	get UI_des_28():ILanguageElement{return this.getElement(2288)};
	/**纯金的圆形物品，似乎有奇特的效果*/
	get UI_des_29():ILanguageElement{return this.getElement(2289)};
	/**学习竞赛一等奖的奖励品*/
	get UI_des_30():ILanguageElement{return this.getElement(2290)};
	/**奥数竞赛二等奖的奖励品*/
	get UI_des_31():ILanguageElement{return this.getElement(2291)};
	/**古诗比赛三等奖的奖励品*/
	get UI_des_32():ILanguageElement{return this.getElement(2292)};
	/**鼓励级的奖杯*/
	get UI_des_33():ILanguageElement{return this.getElement(2293)};
	/**已经快扁了的足球，好像经常使用*/
	get UI_des_34():ILanguageElement{return this.getElement(2294)};
	/**破破旧旧的篮球，学生非常喜欢*/
	get UI_des_35():ILanguageElement{return this.getElement(2295)};
	/**崭新的排球，保存的很好*/
	get UI_des_36():ILanguageElement{return this.getElement(2296)};
	/**敲一次就会碎裂，感觉比玻璃还脆*/
	get UI_des_37():ILanguageElement{return this.getElement(2297)};
	/**保安留下的工具，好像是新买的*/
	get UI_des_38():ILanguageElement{return this.getElement(2298)};
	/**不像是简单的身份卡，似乎可以开门*/
	get UI_des_39():ILanguageElement{return this.getElement(2299)};
	/**这把钥匙被保存的很好，应该能开很重要的门*/
	get UI_des_40():ILanguageElement{return this.getElement(2300)};
	/**既可以铲土又可以敲玻璃*/
	get UI_des_42():ILanguageElement{return this.getElement(2301)};
	/**开船的动力来源*/
	get UI_des_43():ILanguageElement{return this.getElement(2302)};
	/**具有法力的蜡烛，使用其点燃其他蜡烛并布置法阵*/
	get UI_des_44():ILanguageElement{return this.getElement(2303)};
	/**可以用它拿高处的东西了*/
	get UI_des_45():ILanguageElement{return this.getElement(2304)};
	/**学生都喜欢的蓝色杯子*/
	get UI_des_46():ILanguageElement{return this.getElement(2305)};
	/**黄色杯子也很受欢迎*/
	get UI_des_47():ILanguageElement{return this.getElement(2306)};
	/**和法力蜡烛很像，但是是普通蜡烛*/
	get UI_des_48():ILanguageElement{return this.getElement(2307)};
	/**可以打开宿舍里的一扇暗门*/
	get UI_des_49():ILanguageElement{return this.getElement(2308)};

}