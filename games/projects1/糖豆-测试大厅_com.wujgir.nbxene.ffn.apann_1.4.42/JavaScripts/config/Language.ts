import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Name","Value","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage","是否需要校验"],[1,"UI_Game_001","选择地图","Next Up"],[2,"UI_LOBBY_001","未解锁","Locked"],[3,"UI_LOBBY_002","选择","Select"],[4,"UI_LOBBY_003","恭喜获得","Reward List"],[5,"UI_LOBBY_007","领取","Claim"],[6,"UI_LOBBY_008","胜利者名字","Winner's name"],[7,"UI_LOBBY_009","获得了胜利","Win the game!"],[8,"UI_LOBBY_011","获得了胜利","Accept"],[9,"UI_LOBBY_010","拒绝","Reject"],[10,"UI_LOBBY_012","背包","Backpack"],[11,"UI_LOBBY_014","服装","Skin"],[12,"UI_LOBBY_016","动作","Action"],[13,"UI_LOBBY_015","挂件","Trail"],[14,"UI_Game_002","回合结束","Round Ends"],[15,"UI_LOBBY_017","表情","Emoji"],[16,"UI_Game_003","主题","Theme"],[17,"UI_Game_004","通关人数","Passers"],[18,"UI_LOBBY_021","开始","Start"],[19,"UI_LOBBY_020","商店","Shop"],[20,"UI_LOBBY_019","背包","Backpack"],[21,"UI_LOBBY_018","免费抽奖","Free"],[22,"UI_LOBBY_022","抽奖","Draw"],[23,"UI_Game_005","出局啦！","Out!"],[24,"UI_Game_006","过关啦！","Pass!"],[25,"UI_Game_007","确定返回大厅吗？","Are you sure to return to the lobby?"],[26,"UI_LOBBY_023","商店","Shop"],[27,"UI_LOBBY_024","神话","Legendary"],[28,"UI_LOBBY_025","稀有","Rare"],[29,"UI_LOBBY_026","一般","General"],[30,"UI_LOBBY_028","交互","Interaction"],[31,"UI_LOBBY_029","挂件","Trail"],[32,"UI_LOBBY_030","抽奖","Draw"],[33,"UI_LOBBY_031","成长之路","The Path to Growth"],[34,"UI_Game_008","正在观战","Spectating"],[35,"UI_GUIDE_001","滑动摇杆移动","Slide the joystick to move"],[36,"UI_GUIDE_002","右上方滑动移动视角","Swipe top right to move the view"],[37,"UI_GUIDE_003","点击","Tap"],[38,"UI_GUIDE_004","跳跃","Jump"],[39,"UI_GUIDE_005","双击","Double tap"],[40,"UI_GUIDE_006","飞扑","Dive"],[41,"UI_LOBBY_033","点击免费抽奖","Tap for free Lottery"],[42,"UI_LOBBY_032","免费抽奖","Free"],[43,"UI_LOBBY_034","奖池大奖列表","Jackpot Prize"],[44,"UI_LOBBY_035","已拥有","Already owned"],[45,"UI_LOBBY_013","表情","Emoji"],[46,"UI_LAN_000","积分排行","Score Ranking"],[47,"UI_LAN_001","1","1"],[48,"UI_LAN_002","名字","Name"],[49,"UI_LAN_003","分数","Score"],[50,"UI_LAN_004","Mr Bad Egg","Mr Bad Egg"],[51,"UI_LAN_005","1000","1000"],[52,"UI_LAN_006","皮肤","Skins"],[53,"UI_LAN_007","单人","Solo"],[54,"UI_LAN_008","双人","Duo"],[55,"UI_LAN_009","别掉下去","Don't fall off"],[56,"UI_LAN_010","emmm","emmm"],[57,"UI_LAN_011","O(∩_∩)O","Happy"],[58,"UI_LAN_012","酷酷墨镜","Cool Sunglasses"],[59,"UI_LAN_013","0w0","Cute"],[60,"UI_LAN_014","晕啦","Dizzy"],[61,"UI_LAN_015","星星眼","Star eyes"],[62,"UI_LAN_016","要睡着了","I'm sleepy..."],[63,"UI_LAN_017","ovO","Smile"],[64,"UI_LAN_018","飞吻","Air kiss"],[65,"UI_LAN_019","我很生气！","I'm pissed!"],[66,"UI_LAN_020","哭哭","Crying"],[67,"UI_LAN_021","≧▽≦","Excited"],[68,"UI_LAN_022","我生气啦！","I'm angry!"],[69,"UI_LAN_023","【拖尾】彩色泡泡","[Trail] Colourful bubble"],[70,"UI_LAN_024","【拖尾】彩带","[Trail] Coloured ribbon"],[71,"UI_LAN_025","【拖尾】四角星星","[Trail] Four-pointed star"],[72,"UI_LAN_026","【拖尾】火焰","[Trail] Flame"],[73,"UI_LAN_027","【拖尾】金钱","[Trail] Money"],[74,"UI_LAN_028","【拖尾】骷髅","[Trail] Skeleton"],[75,"UI_LAN_029","【拖尾】爱心","[Trail] Love"],[76,"UI_LAN_030","【拖尾】香蕉","[Trail] Banana"],[77,"UI_LAN_031","【拖尾】彩虹","[Trail] Rainbow"],[78,"UI_LAN_032","【拖尾】糖果","[Trail] Candy"],[79,"UI_LAN_033","【拖尾】螺丝钉","[Trail] Screw"],[80,"UI_LAN_034","【拖尾】足球","[Trail] Football"],[81,"UI_LAN_035","【拖尾】奖杯","[Trail] Trophy"],[82,"UI_LAN_036","【拖尾】皇冠","[Trail] Crown"],[83,"UI_LAN_037","【拖尾】闪电","[Trail] Lightning"],[84,"UI_LAN_038","【拖尾】雪花","[Trail] Snowflake"],[85,"UI_LAN_039","【拖尾】2023","[Trail] 2023"],[86,"UI_LAN_040","【拖尾】爆竹","[Trail] Firecracker"],[87,"UI_LAN_041","【拖尾】烟花","[Trail] Firework"],[88,"UI_LAN_042","【拖尾】礼物盒","[Trail] Gift Box Trailer"],[89,"UI_LAN_043","跑步尾气","Running Trailer"],[90,"UI_LAN_044","教学","Tutorial"],[91,"UI_LAN_045","金币抽奖","Draw"],[92,"UI_LAN_046","选择地图","Next up"],[93,"UI_LAN_047","奖励清单","Reward List"],[94,"UI_LAN_048","胜利者名字","Winner's name"],[95,"UI_LAN_049","获得了胜利","WIN"],[96,"UI_LAN_050","接受","Accept"],[97,"UI_LAN_051","拒绝","Reject"],[98,"UI_LAN_052","超出金币获取上限","Exceeding the Gold Coin acquisition limit"],[99,"UI_LAN_053","您已获取","You have obtained"],[100,"UI_LAN_054","您已拥有该物品,获得糖果","You already got this item, exchange to Candy Coins"],[101,"UI_LAN_055","刷新时间","Refresh"],[102,"UI_LAN_056","奖杯排行","Trophy Ranking"],[103,"UI_LAN_057","是否购买该物品?","Do you want to purchase the item?"],[104,"UI_LAN_058","已获取该物品，快去背包里看看吧","You have already got the item, go to your backpack and check it out!"],[105,"UI_LAN_059","金币不足!","Not enough Gold Coins!"],[106,"UI_LAN_060","获得积分来解锁物品","Earn points to unlock items"],[107,"UI_LAN_061","你已领取过了该物品","You have already collected the item"],[108,"UI_LAN_062","脱下","Take Off"],[109,"UI_LAN_063","装扮","Put On"],[110,"UI_LAN_064","未拥有","Locked"],[111,"UI_LAN_065","经验获取超出上限!","Exceed the Experience Gain Limit!"],[112,"UI_LAN_066","超出金币获取上限!","Exceed the Gold Coins Gain Limit!"],[113,"UI_LAN_067","正在抽奖中!","Lottery in progress!"],[114,"UI_LAN_068","免费抽奖时间还没到!","Free Lottery time is not yet available!"],[115,"UI_LAN_069","确认花费{}金币抽奖?","Are you sure to spend {} Gold Coins on the Lottery?"],[116,"UI_LAN_070","抽奖中,暂不能返回!","The Lottery is in progress, you cannot return at this time!"],[117,"UI_LAN_071","您已获取:","You have obtained:"],[118,"UI_LAN_072","您已拥有该物品,获得金币:","You already owned this item and have received Gold Coins:"],[119,"UI_LAN_073","未上榜","Not on the list"],[120,"UI_LAN_074","获得积分来解锁物品!","Earn Points to unlock items!"],[121,"UI_LAN_075","你已领取过了该物品!","You have already claimed the item!"],[122,"UI_LAN_076","正在等待玩家{1}/{2}","Waiting for players {1}/{2}"],[123,"UI_LAN_077","请耐心等待...({})","Please wait patiently... ({})"],[124,"UI_LAN_078","预计等待时间{}秒","Estimated waiting time: {} seconds"],[125,"UI_LAN_079","已收集星星 :{}颗","Stars Collected :{}"],[126,"UI_LAN_080","可转化金币 :{}个","Gold Coins :{}"],[127,"UI_LAN_081","是否返回大厅","Are you sure to return to the lobby?"],[128,"UI_LAN_082","{}/{}","{}/{}"],[129,"UI_LAN_083","{}/{}","{}/{}"],[130,"UI_LAN_084","{}/{}","{}/{}"],[131,"UI_LAN_085","看起来不错嘛","Looks great!"],[132,"UI_LAN_086","下车吧小糖果！好好去享受你的糖果派对吧","Keep going, Candy! Enjoy your Candy Party!"],[133,"UI_LAN_087","小时候听外婆说，在遥远的海洋中，有一座蛋糕与糖果组成的岛屿，聪明与听话的小孩会被糖果们接上岛，参加让人羡慕的糖果派对 ......","When I was a kid, my grandmother told me that in a faraway ocean, there was an island made of cakes and candies, and the smart and well-behaved kids would be picked up by the candies and go to the enviable candy parties ......"],[134,"UI_LAN_088","你怎么也被落下了，快，跟我一起","Why have you been left behind? Come on, join me!"],[135,"UI_LAN_089","快跟上呀，要赶不上火车了！","Hurry up, we'll miss the train!"],[136,"UI_LAN_090","太好了，小糖果，我们赶上了^0^","Bravo, little candy, we're catching up ^0^"],[137,"UI_LAN_091","我们是要去哪里呀？为什么我会变成这样子？","Where are we going? Why am I in this state?"],[138,"UI_LAN_092","这是通往糖果岛的火车呀，能去到糖果岛的当然都是糖果啦。","This is the train to Candy Island, and of course everything that goes to Candy Island is candy."],[139,"UI_LAN_093","糖果岛！难道是外婆和我说的童话里的充满爱与糖果的岛屿？可是我的假期就要结束了，作业还没写完呢！","Candy Island! Could it be the island full of love and candy from the fairy tale that Grandma told me about? But my holiday is coming to an end and I haven't finished my homework yet!"],[140,"UI_LAN_094","现在回不去啦，要等糖果派对结束，才能有离开糖果岛的火车。你放心啦，糖果岛和外界的时间不一样，在这里玩上多久外界的时间也不会变的！","We can't go back now, we have to wait until the Candy Party is over before we can get a train to leave Candy Island. Don't worry, the time between Candy Island and the outside world is different, so the outside time will not change for as long as you play here!"],[141,"UI_LAN_095","太好了！那...那我也可以参加糖果派对吗？听说只有最聪明的孩子才可以...","Great! So... Can I join the candy party too? I heard that only the smartest kids are allowed..."],[142,"UI_LAN_096","当然啦，你能来到这里就已经证明你是最聪明的孩子了，只要在糖果岛的范围内，任何时候都可以参加哦！我来教你吧！","Of course, the fact that you're here is proof that you're the smartest kid in the world, and you can join in any time you want, as long as you're within the confines of Candy Island! I'll teach you!"],[143,"UI_LAN_097","点击右上角的按钮，就可以开启派对啦！","Tap the button in the top right corner to get the party started!"],[144,"UI_LAN_098","这次就让我来教教你好啦！","Let me show you how to do it this time!"],[145,"UI_LAN_099","还以为你是新手呢，没想到你还挺厉害的嘛，说不定以后真的有机会拿下糖果之星的称号呢！把我的这个送给你好啦，以后还要努力哦。","I thought you were a newbie, but you're pretty good, maybe you'll get a chance to win the Candy Star title! I'll give you this one and you'll have to work on it later."],[146,"UI_LAN_100","在鱼游到鱼钩处时点击按钮将鱼钩中吧！","Tap the button to hook the fish when it swims to the hook!"],[147,"UI_LAN_101","鱼咬钩啦！快速连点按钮将它钓起吧！","The fish is biting! Tap the button quickly to catch it!"],[148,"UI_LAN_102","是否继续钓鱼","Do you want to continue fishing?"],[149,"UI_LAN_103","确定","Yes"],[150,"UI_LAN_104","取消","No"],[151,"UI_LAN_105","米","M"],[152,"UI_LAN_106","鱼没有上钩!","The fish are not hooked!"],[153,"UI_LAN_107","风浪越大鱼越难钓！","The higher the wind and waves, the more expensive the fish!"],[154,"UI_LAN_108","时机不对！","Bad timing!"],[155,"UI_LAN_109","金币","Gold Coins"],[156,"UI_LAN_110","关闭","Close"],[157,"UI_LAN_111","熊猫隐者","Panda Recluse"],[158,"UI_LAN_112","服装店主","clothing store owner"],[159,"UI_LAN_113","你可以在这里换上自己喜欢的装扮！","You can put on your favourite outfit here!"],[160,"UI_LAN_114","你好！欢迎光临，我是糖果王国的著名商人！","Hello! Welcome, would you like to buy something?"],[161,"UI_LAN_115","新手奖励","Newbie Rewards"],[162,"UI_LAN_116","通行证","Pass"],[163,"UI_LAN_117","商店购买","Purchase in Shop"],[164,"UI_LAN_118","皮肤","Skin"],[165,"UI_LAN_119","生气","Angry"],[166,"UI_LAN_120","比心","Finger heart"],[167,"UI_LAN_121","哭泣","Cry"],[168,"UI_LAN_122","后空翻","Backflip"],[169,"UI_LAN_123","攻击","Attack"],[170,"UI_LAN_124","打call","Cheer up"],[171,"UI_LAN_125","挥手","Wave"],[172,"UI_LAN_126","捂头","Cover head"],[173,"UI_LAN_127","起飞飞","Take off"],[174,"UI_LAN_128","扭腰","Twist"],[175,"UI_LAN_129","每日抽奖","Free"],[176,"UI_LAN_130","还剩{}人","Still {} Left"],[177,"UI_LAN_131","摇摇晃晃~","Wobbling~"],[178,"UI_LAN_132","丛林滚筒！","Jungle Rollers!"],[179,"UI_LAN_133","旋转跳跃！","Spinning and Jumping!"],[180,"UI_LAN_134","糖果转转转","Candy Spinning"],[181,"UI_LAN_135","无限起伏","Infinite Curves"],[182,"UI_LAN_136","转盘大作战","Turntable Battle"],[183,"UI_LAN_137","太空遨游","Space Travel"],[184,"UI_LAN_138","笔刷之路","Way of Brushes"],[185,"UI_LAN_139","别掉下去","Seesaw Challenge"],[186,"UI_LAN_140","躲避炮弹","Dodge candy shells"],[187,"UI_FISH_COIN","钓鱼成功，继续练习吧","Fishing success, keep practicing"],[188,"UI_LAN_141","动作","Action"],[189,"UI_LAN_142","黄南瓜头","Yellow Pumpkin Head"],[190,"UI_LAN_143","红南瓜头","Red Pumpkin Head"],[191,"UI_LAN_144","绿南瓜头","Green Pumpkin Head"],[192,"UI_LAN_145","黑南瓜头","Black Pumpkin Head"],[193,"UI_LAN_146","白南瓜头","White Pumpkin Head"],[194,"UI_LAN_147","粉斑马","Pink Zebra"],[195,"UI_LAN_148","绿斑马","Green Zebra"],[196,"UI_LAN_149","紫斑马","Purple Zebra"],[197,"UI_LAN_150","黑斑马","Black Zebra"],[198,"UI_LAN_151","白斑马","White Zebra"],[199,"UI_LAN_152","灰小喵","Grey Kitten"],[200,"UI_LAN_153","棕小喵","Brown Kitten"],[201,"UI_LAN_154","黄小喵","Yellow Kitten"],[202,"UI_LAN_155","黑小喵","Black Kitten"],[203,"UI_LAN_156","白小喵","White Kitten"],[204,"UI_LAN_157","粉小兔","Pink Bunny"],[205,"UI_LAN_158","黄小兔","Yellow Bunny"],[206,"UI_LAN_159","蓝小兔","Blue Bunny"],[207,"UI_LAN_160","黑小兔","Black Bunny"],[208,"UI_LAN_161","白小兔","White Bunny"],[209,"UI_LAN_162","黄小汪","Yellow Doggy"],[210,"UI_LAN_163","绿小汪","Green Doggy"],[211,"UI_LAN_164","深小汪","Violet Doggy"],[212,"UI_LAN_165","黑小汪","Black Doggy"],[213,"UI_LAN_166","白小汪","White Doggy"],[214,"UI_LAN_167","木乃伊","Mummy"],[215,"UI_LAN_168","粉木乃伊","Pink Mummy"],[216,"UI_LAN_169","紫木乃伊","Purple Mummy"],[217,"UI_LAN_170","黑木乃伊","Black Mummy"],[218,"UI_LAN_171","白木乃伊","White Mummy"],[219,"UI_LAN_172","橙宝宝","Orange Candy"],[220,"UI_LAN_173","粉宝宝","Pink Candy"],[221,"UI_LAN_174","蓝宝宝","Blue Candy"],[222,"UI_LAN_175","黑宝宝","Black Candy"],[223,"UI_LAN_176","白宝宝","White Candy"],[224,"UI_LAN_177","红西红柿","Red Tomato"],[225,"UI_LAN_178","橙西红柿","Orange Tomato"],[226,"UI_LAN_179","蓝西红柿","Blue Tomato"],[227,"UI_LAN_180","黑西红柿","Black Tomato"],[228,"UI_LAN_181","白西红柿","White Tomato"],[229,"UI_LAN_182","芒果冰","Mango Ice"],[230,"UI_LAN_183","巧克力冰","Chocolate Ice"],[231,"UI_LAN_184","破壳崽崽黄","Yellow Baby Chicken"],[232,"UI_LAN_185","破壳崽崽绿","Green Baby Chicken"],[233,"UI_LAN_186","贝贝公主","Princess Betty"],[234,"UI_LAN_187","茜茜公主","Princess Sissy"],[235,"UI_LAN_188","甜甜圈国王","King Donut"],[236,"UI_LAN_189","曲奇国王","King Cookie"],[237,"UI_LAN_190","绿功夫熊猫","Green Kung Fu Panda"],[238,"UI_LAN_191","红功夫熊猫","Red Kung Fu Panda"],[239,"UI_LAN_192","守护天使","Guardian Angel"],[240,"UI_LAN_193","守护恶魔","Guardian Demon"],[241,"UI_LAN_194","初始角色","Initial Character"],[242,"UI_LAN_195","抽奖获取","Lottery to get"],[243,"UI_LAN_196","通行证升级","Season Pass"],[244,"UI_LAN_197","开始参加派对吧!","Let the party begin!"],[245,"UI_LAN_198","更换你的挂件吧！","Change your Trail!"],[246,"UI_LOBBY_036","成就","Achievements"],[247,"UI_LOBBY_038","已穿戴","Dressed"],[248,"UI_LOBBY_039","最佳收藏家","Best Collector"],[249,"UI_LOBBY_040","糖果大赛赞助商","Candy Contest Sponsor"],[250,"UI_LAN_199","这里可以查看全部装扮和获取途径哟！","You can check out all the Outfits and how to get them here!"],[251,"UI_LAN_200","开始游戏并坚持到最后可以帮助你获取更多的金币购买装扮！","Starting the game and sticking to the end can help you get more Coins to buy costumes!"],[252,"UI_LAN_201","没有人的装扮收藏可以超过我！","No one's costume collection can surpass mine!"],[253,"UI_LAN_202","我就是糖果王国里装扮最多的收藏家！","I'm the collector with the most costumes in the Candy Kingdom!"],[254,"UI_LAN_203","表情和动作获取后会自动装备进栏位噢！","Emotes and Actions will be automatically equipped into the field after they are acquired!"],[255,"UI_LAN_204","这里有服装，表情，动作，甚至还可以参加抽奖获取稀有装扮！","There are costumes, emotes, actions, and you can even enter a raffle for a rare costume!"],[256,"UI_LAN_205","请问你要买点什么吗？","Would you like to buy something?"],[257,"UI_LAN_206","不买也可以来看看呀！","Have a look even if you won't buy it!"],[258,"UI_LAN_207","抽到已有的物品可以获取特殊货币----糖果噢!","If you win an item you already have, you can exchange it for a special currency - Candy!"],[259,"UI_LAN_208","嘿！今天攒够钱了吗伙计！","Hey! Have you saved enough coins today mate!"],[260,"UI_LAN_209","什么？钱不够？快去进行对局获取更多货币吧！","What? Don't have enough coins? Go play a game to get more coins!"],[261,"UI_LOBBY_041","部分大奖","Selected Awards"],[262,"UI_LAN_210","提示","Tips"],[263,"UI_LAN_211","取消","Cancel"],[264,"UI_LAN_212","确定","Sure"],[265,"UI_LAN_213","匹配成功，等待进入游戏...","Match Successed ! Transporting..."],[266,"UI_LAN_214","虽然好像前不久刚更新过，但是都要2024啦，新年新气象！新的一年我们有了新的赛季，除此之外，我们还加入了月签到，大家后续可以获取更多游戏内的道具啦！具体内容让我们一起往下看吧~\n一、关卡更新\n元旦主题关卡——新年冲刺\n \n二、大厅内容更新\n1、月签到\n每日签到即可领取超多好礼！\n \n2、新赛季更新\n通行证皮肤龙焰焰\n通行证皮肤龙青青\n  \n果冻跑跑玩家群（457069782）现已创立，快来加群一起组队玩耍吧~","Although it seems like we just had an update recently, it's already 2024 – a new year, a fresh start! In the upcoming year, we have a brand new season, and excitingly, we've introduced monthly check-ins for everyone to collect more in-game items! Let's dive into the details:"],[267,"UI_LAN_215","糖果更新公告",null],[268,"UI_LAN_216","正在等待下轮比赛","I. Level Updates"],[269,"UI_LAN_217","观战专属沙发区域"," New Year's Sprint – A special level for the New Year celebration"],[270,"UIMain_018","糖果派对公告板",null],[271,"UI_LAN_218","抽到了重复物品，已转化为糖果！","II. Lobby Updates"],[272,"UI_LAN_219","货币不足","1. Monthly Check-ins"],[273,"UI_LAN_220","滑动左侧移动"," Collect fantastic rewards through daily check-ins!"],[274,"UI_LAN_221","奇怪的人到前面就消失了,我要去看看！",null],[275,"Txt_ChatWord_1","你好呀，可以交个朋友么","2. New Season Update"],[276,"Txt_ChatWord_2","快，跟着我走"," Pass Skin: Dragon Flame"],[277,"Txt_ChatWord_3","我觉得你很可爱呀"," Pass Skin: Dragon Cyan"],[278,"Txt_ChatWord_4","一起去坐火车吧",null],[279,"Txt_ChatWord_5","一起去坐飞机","刘妍冰（发版糕手）"],[280,"Txt_ChatWord_6","我们一块去玩滑滑梯吧","Let's go on the slide together"],[281,"Txt_ChatWord_7","我们一块玩吧","Let's play together"],[282,"Txt_ChatWord_8","处闺蜜么","Can we be bestie?"],[283,"Txt_ChatWord_9","我想要你陪我玩儿","I want you to play with me"],[284,"UI_LAN_222","剩余时间：","Time limit："],[285,"UI_LAN_223","射门","Shoot！"],[286,"UI_LAN_224","蓄力越久，踢飞越远~","hold longer,kick farther~"],[287,"UI_LAN_225","秒后比分清空","60 seconds until the score clears"],[288,"Txt_ChatWord_10","好哒","OK"],[289,"Txt_ChatWord_11","不行哦","NO"],[290,"UI_LAN_226","勾选后今日不再弹出","Don't show in a day"],[291,"UI_LAN_227","队伍","Teams"],[292,"UI_LAN_228","玩家列表","Player List"],[293,"UI_LAN_229","接受组队邀请","Accept team invitation"],[294,"UI_LAN_230","打折啦！打折啦！新款皮肤快来看呀！","Discounted! Sale! Come and see the new skins!"],[295,"UI_LAN_231","这里可以免费抽奖，试试运气吧","Try your luck with the free lottory here!"],[296,"UI_LAN_232","新款皮肤你穿上肯定好看的嘞","You'll look great in the new skins!"],[297,"UI_LAN_233","吆喝了半天，怎么还是没有客户呢","I've been shouting for a long time, but I still don't have any customers!"],[298,"UI_LAN_234","天天换装，心情美美的","Dress up every day and look great!"],[299,"UI_LAN_235","快来获得跟你闺蜜的同款皮肤吧","Come and get the same skin as your best friend!"],[300,"UI_LAN_236","动感大炮","Dynamic Cannon"],[301,"UI_LAN_237","旋转跳跃","Spin and Jump"],[302,"UI_LAN_238","已夺冠{}/{}","Win {}/{}"],[303,"UI_LAN_239","已达标{}/{}","Qualified {}/{}"],[304,"UI_LAN_240","已淘汰{}/{}","Out {}/{}"],[305,"UI_LAN_241","Tips:每场对局分两轮比赛，第一轮胜利的玩家才能参加决赛哦~","Tips:Each game is divided into two rounds, and the player who wins the first round can participate in the Final!"],[306,"UI_LAN_242","自己","You"],[307,"UI_LAN_243","观战","Others"],[308,"UI_LAN_244","金币 x 100","Gold x 100"],[309,"UI_LAN_245","金币 x 200","Gold x 200"],[310,"UI_LAN_246","金币 x 500","Gold x 500"],[311,"UI_LAN_247","【拖尾】彩色泡泡","[Trail] Colourful bubble"],[312,"UI_LAN_248","【拖尾】彩带","[Trail] Coloured ribbon"],[313,"UI_LAN_249","【拖尾】四角星星","[Trail] Four-pointed star"],[314,"UI_LAN_250","【拖尾】火焰","[Trail] Flame"],[315,"UI_LAN_251","【拖尾】金钱","[Trail] Money"],[316,"UI_LAN_252","【拖尾】骷髅","[Trail] Skeleton"],[317,"UI_LAN_253","【拖尾】爱心","[Trail] Love"],[318,"UI_LAN_254","【拖尾】香蕉","[Trail] Banana"],[319,"UI_LAN_255","【拖尾】彩虹","[Trail] Rainbow"],[320,"UI_LAN_256","【拖尾】糖果","[Trail] Candy"],[321,"UI_LAN_257","【拖尾】螺丝钉","[Trail] Screw"],[322,"UI_LAN_258","【拖尾】足球","[Trail] Football"],[323,"UI_LAN_259","【拖尾】奖杯","[Trail] Trophy"],[324,"UI_LAN_260","【拖尾】皇冠","[Trail] Crown"],[325,"UI_LAN_261","【拖尾】闪电","[Trail] Lightning"],[326,"UI_LAN_262","【拖尾】雪花","[Trail] Snowflake"],[327,"UI_LAN_263","【拖尾】2023","[Trail] 2023"],[328,"UI_LAN_264","【拖尾】爆竹","[Trail] Firecracker"],[329,"UI_LAN_265","【拖尾】烟花","[Trail] Firework"],[330,"UI_LAN_266","【拖尾】礼物盒","[Trail] Gift Box"],[331,"UI_LAN_267","本轮名次","Ranking of the round"],[332,"UI_LAN_268","点击屏幕继续","Tap the screen to continue"],[333,"UI_LAN_269","金币","Gold"],[334,"UI_LAN_270","天使","Angel"],[335,"UI_LAN_271","成长之路","The Path to Growth"],[336,"UI_LAN_272","参加比赛可以获得成长之路分数","Play the game can earn growth path points"],[337,"UI_LAN_273","问卷","Survey"],[338,"ITEM_NAME_20014","贱笑","Smirk"],[339,"ITEM_NAME_20015","不屑","Disdain"],[340,"ITEM_NAME_20016","托腮","Think"],[341,"ITEM_NAME_20017","鼻孔","Nostrils"],[342,"ITEM_NAME_20018","你好","Hello"],[343,"ITEM_NAME_20019","再见","Goodbye"],[344,"ITEM_NAME_50001","【手】法杖","[Hand] Magic wand"],[345,"ITEM_NAME_50002","【手】权杖","[Hand] Scepter"],[346,"ITEM_NAME_50003","【手】书","[Hand] Book"],[347,"ITEM_NAME_50004","【手】星星杯","[Hand] Star cup"],[348,"ITEM_NAME_50005","【手】奖杯","[Hand] Trophy"],[349,"ITEM_NAME_50006","【手】毛笔","[Hand] Writing brush"],[350,"ITEM_NAME_50007","【手】红色铅笔","[Hand] Red pencil"],[351,"ITEM_NAME_50008","【手】圆珠笔","[Hand] Ballpoint pen"],[352,"ITEM_NAME_50009","【手】钞票","[Hand] Cash"],[353,"ITEM_NAME_50010","【手】鸭舌帽","[Hand] Duckbill cap"],[354,"ITEM_NAME_50011","【手】尖叫鸡","[Hand] Screaming chicken"],[355,"ITEM_NAME_50012","【手】熊猫","[Hand] Panda"],[356,"ITEM_NAME_50013","【手】小白兔","[Hand] Little rabbit"],[357,"ITEM_NAME_50014","【手】鲸鱼","[Hand] Whale"],[358,"ITEM_NAME_50015","【手】阿花","[Hand] Daisy"],[359,"ITEM_NAME_50016","【手】阿黑","[Hand] Blake"],[360,"ITEM_NAME_50017","【手】荧光棒","[Hand] Glow stick"],[361,"ITEM_NAME_50018","【手】蜡烛","[Hand] Candle"],[362,"ITEM_NAME_50019","【手】花束","[Hand] Bouquet"],[363,"ITEM_NAME_50020","【手】星星棒","[Hand] Star stick"],[364,"ITEM_NAME_50021","【手】魔法棒","[Hand] Magic wand"],[365,"ITEM_NAME_50022","【手】我反对","[Hand] Against"],[366,"ITEM_NAME_50023","【手】我赞同","[Hand] Agree"],[367,"ITEM_NAME_50024","【手】捕虫网","[Hand] Bug net"],[368,"ITEM_NAME_50025","【手】藏宝图","[Hand] Treasure map"],[369,"ITEM_NAME_50026","【手】玩偶","[Hand] Doll"],[370,"ITEM_NAME_50027","【手】网球","[Hand] Tennis ball"],[371,"ITEM_NAME_50028","【手】爆竹","[Hand] Firecracker"],[372,"ITEM_NAME_50029","【手】大骨头","[Hand] Big bone"],[373,"ITEM_NAME_50030","【手】蛋糕","[Hand] Cake"],[374,"ITEM_NAME_50031","【手】奶油","[Hand] Cream"],[375,"ITEM_NAME_50032","【手】小黄鸭","[Hand] Rubber duck"],[376,"ITEM_NAME_50033","【手】降落鸭","[Hand] Landing duck"],[377,"ITEM_NAME_50034","【手】纸飞机","[Hand] Paper plane"],[378,"ITEM_NAME_50035","【手】皮球","[Hand] Football"],[379,"ITEM_NAME_50036","【手】晴天娃娃","[Hand] Sunny doll"],[380,"ITEM_NAME_50037","【手】礼帽","[Hand] Top hat"],[381,"ITEM_NAME_50038","【手】粉色包包","[Hand] Pink bag"],[382,"ITEM_NAME_50039","【手】海王叉","[Hand] Trident"],[383,"ITEM_NAME_50040","【手】紫色包包","[Hand] Purple bag"],[384,"ITEM_NAME_50041","【手】鱼竿","[Hand] Fishing rod"],[385,"ITEM_NAME_50042","【手】多彩锤","[Hand] Colorful hammer"],[386,"ITEM_NAME_50043","【手】平底锅","[Hand] Frying pan"],[387,"ITEM_NAME_50044","【手】游戏机","[Hand] Game console"],[388,"ITEM_NAME_50045","【手】游戏机pro","[Hand] Game console pro"],[389,"ITEM_NAME_50046","【手】大葱","[Hand] Green onion"],[390,"ITEM_NAME_50047","【手】萝卜","[Hand] Radish"],[391,"ITEM_NAME_50048","【手】扇子","[Hand] Fan"],[392,"ITEM_NAME_50049","【手】蓝折扇","[Hand] Blue folding fan"],[393,"ITEM_NAME_50050","【手】白折扇","[Hand] White folding fan"],[394,"ITEM_NAME_50051","【手】咖啡杯","[Hand] Coffee cup"],[395,"ITEM_NAME_50052","【手】披萨","[Hand] Pizza"],[396,"ITEM_NAME_50053","【手】冰淇淋","[Hand] Ice cream"],[397,"ITEM_NAME_50054","【手】棒棒糖","[Hand] Lollipop"],[398,"ITEM_NAME_50055","【手】金钥匙","[Hand] Golden key"],[399,"ITEM_NAME_50056","【手】肉串","[Hand] Skewers"],[400,"ITEM_NAME_50057","【手】对讲机","[Hand] Walkie-talkie"],[401,"ITEM_NAME_50058","【手】拐杖糖","[Hand] Candy cane"],[402,"ITEM_NAME_50059","【手】小哑铃","[Hand] Small dumbbell"],[403,"ITEM_NAME_50060","【手】哑铃","[Hand] Dumbbell"],[404,"ITEM_NAME_50061","【手】大哑铃","[Hand] Big dumbbell"],[405,"ITEM_NAME_50062","【手】刷子","[Hand] Brush"],[406,"ITEM_NAME_50063","【手】小号","[Hand] Trumpet"],[407,"ITEM_NAME_50064","【手】气球","[Hand] Balloon"],[408,"ITEM_NAME_50065","【手】网球拍","[Hand] Tennis racket"],[409,"ITEM_NAME_50066","【手】铃鼓","[Hand] Bell drum"],[410,"ITEM_NAME_50067","【手】抹茶沙锤","[Hand] Matcha","是"],[411,"ITEM_NAME_50068","【手】草莓沙锤","[Hand] Strawberry","是"],[412,"ITEM_NAME_50069","【手】蓝莓沙锤","[Hand] Blueberry","是"],[413,"ITEM_NAME_50070","【手】魔杖","[Hand] Wand"],[414,"ITEM_NAME_50071","【手】棒球棍","[Hand] Baseball bat"],[415,"ITEM_NAME_60001","【背】猩红之翼","[Back] Crimson wing"],[416,"ITEM_NAME_60002","【背】漆黑之翼","[Back] Black wing"],[417,"ITEM_NAME_60003","【背】天锁","[Back] Sky lock"],[418,"ITEM_NAME_60004","【背】蝴蝶结","[Back] Bow tie"],[419,"ITEM_NAME_60005","【背】绿丝带","[Back] Green ribbon"],[420,"ITEM_NAME_60006","【背】棕丝带","[Back] Brown ribbon"],[421,"ITEM_NAME_60007","【背】背包","[Back] Backpack"],[422,"ITEM_NAME_60008","【背】鬼怪","[Back] Ghost"],[423,"ITEM_NAME_60009","【背】幽灵","[Back] Phantom"],[424,"ITEM_NAME_60010","【背】小熊","[Back] Little bear"],[425,"ITEM_NAME_60011","【背】鬼火","[Back] Ghost fire"],[426,"ITEM_NAME_60012","【背】蝶群","[Back] Butterfly"],[427,"ITEM_NAME_60013","【背】吉他","[Back] Guitar"],[428,"ITEM_NAME_60014","【背】巧克力吉他","[Back] Chocolate guitar"],[429,"ITEM_NAME_60015","【背】萨克斯","[Back] Saxophone"],[430,"ITEM_NAME_60016","【背】熊猫","[Back] Panda"],[431,"ITEM_NAME_60017","【背】吉祥物","[Back] Mascot"],[432,"ITEM_NAME_60018","【背】大甜甜圈","[Back] Big donut"],[433,"ITEM_NAME_60019","【背】大披萨","[Back] Big pizza"],[434,"ITEM_NAME_60020","【背】大冰淇淋","[Back] Big ice cream"],[435,"ITEM_NAME_60021","【背】烧烤大串","[Back] BBQ skewers"],[436,"ITEM_NAME_60022","【背】大姜饼","[Back] Big gingerbread"],[437,"ITEM_NAME_60023","【背】大煎蛋","[Back] Big fried egg"],[438,"ITEM_NAME_60024","【背】大白兔","[Back] Big white rabbit"],[439,"ITEM_NAME_60025","【背】猫咪垫","[Back] Cat pad"],[440,"ITEM_NAME_60026","【背】灰猫垫","[Back] Gray cat pad"],[441,"ITEM_NAME_60027","【背】大鼠仔","[Back] Big mouse"],[442,"ITEM_NAME_60028","【背】糖兔兔","[Back] Sugar bunny"],[443,"ITEM_NAME_60029","【背】害羞幽灵","[Back] Shy ghost"],[444,"ITEM_NAME_60030","【背】柴犬天使","[Back] Shiba Inu Angel"],[445,"ITEM_NAME_60031","【背】猫猫幽灵","[Back] Cat ghost"],[446,"ITEM_NAME_60032","【背】胡萝卜","[Back] Carrot"],[447,"UI_LAN_274","果冻快跑","Dash Dash！"],[448,"UI_LOBBY_042","任务","Quests"],[449,"UI_LOBBY_043","日常任务","Daily Quests"],[450,"UI_LOBBY_044","今日活跃度","Daily active point"],[451,"UI_LOBBY_045","本周活跃度","Weekly active point"],[452,"UI_LOBBY_046","一键领取","Claim All"],[453,"UI_LOBBY_047","领取","Claim"],[454,"UI_LOBBY_048","未完成","Ongoing"],[455,"UI_LOBBY_049","已完成","Done"],[456,"QUEST_1","登录游戏","Login the game"],[457,"QUEST_2","参与{0}场比赛","Play {0} games"],[458,"QUEST_3","在大厅使用{0}次飞扑","Dive {0} times in lobby"],[459,"QUEST_4","夺冠{0}次","Win {0} times"],[460,"QUEST_5","进行{0}次抽奖","Draw {0} times"],[461,"QUEST_6","使用{0}次动作/表情","Use Emoji/Action {0} times"],[462,"QUEST_7","更换皮肤{0}次","Change Skin {0} times"],[463,"QUEST_8","在比赛中晋级{0}次","Pass {0} times"],[464,"QUEST_9","使用{0}次动作","Use Action {0} times"],[465,"QUEST_10","使用{0}次表情","Use Emoji {0} times"],[466,"QUEST_11","发送{0}次消息","Send message {0} times "],[467,"QUESTION_FIRST_1","亲爱的糖果们","Dear candies"],[468,"QUESTION_FIRST_2","请协助我们完成这份问卷，完成问卷后您可以获得奖励","Please help us to complete this survey and get rewards!"],[469,"QUESTION_ASK_1","【多选题】您对于《糖果派对》关卡方面哪些地方不太满意？（可以滑动屏幕查看更多选项）","[Multiple Choice] What are you not happy with about the levels in Candy Party? (You can swipe the screen to see more options)"],[470,"QUESTION_ASK_2","【多选题】您对于《糖果派对》还有啥不满意的？","[Multiple Choice] What are you not satisfied with in Candy Party?"],[471,"QUESTION_ASK_3","【多选题】请问您希望《糖果派对》未来有怎样的关卡？（可以滑动屏幕查看更多选项）","[Multiple Choice] What kind of levels would you like to see in Candy Party in the future? (You can slide the screen to see more options)"],[472,"QUESTION_ASK_4","【多选题】您觉得《糖果派对》哪些关卡最好玩？（可以滑动屏幕查看更多选项）","[Multiple Choice] Which levels of Candy Party do you think are the most fun? (You can swipe the screen to see more options)"],[473,"QUESTION_ASK_5","【多选题】这些关卡为什么好玩？（可以滑动屏幕查看更多选项）","[Multiple Choice] Why are these levels fun? (You can swipe the screen to see more options)"],[474,"QUESTION_CHOOSE_1","暂无|观战时间太久，很无聊|关卡数量少|关卡场景看起来不美观|关卡太简单缺乏挑战性|部分关卡难度过高|操作手感不佳|关卡玩法重复单一，缺少新鲜感|高手太多，追不上|关卡不好玩|其他","None | Too long to spectate, it's boring | Low number of levels | Level scenes look unattractive | Levels are too easy and lack challenge | Some levels are too difficult | Poor play experience | Levels are repetitive and lack freshness | Too many experts, can't catch up | Levels are not fun | Other"],[475,"QUESTION_CHOOSE_2","暂无|匹配等待时间长|游戏跳转时间长|网络有延迟，游戏有卡顿感|其他","None|Long waiting times for matches|Long loading times|Lagging network and laggy gameplay|Other"],[476,"QUESTION_CHOOSE_3","暂无|关卡内有更多道具可以使用|关卡长度更长|关卡内人数更多|关卡种类更多|关卡内能互动|其他","None|More props to use in levels|Longer levels|More people in levels|More variety in levels|Interaction in levels|Other"],[477,"QUESTION_CHOOSE_4","摇摇晃晃|丛林滚筒|太空遨游|无限起伏|别掉下去|笔刷之路|转盘大作战|动感大炮|旋转跳跃|糖果转转转|都不好玩","Wobbling | Jungle Rollers| Space Travel|Infinite Curves|Don't fall off|The Way of Brushes|Turntable Battle|Dynamic cannon|Spinning and Jumping!|Candy Spinning|None of them"],[478,"QUESTION_CHOOSE_5","暂无|玩的爽|简单|能跑第一|有挑战性|刺激|其他","None|Playful|Simple|Can win|Challenging|Exciting|Other"],[479,"QUESTION_BUTTON_1","下一页","Next page"],[480,"QUESTION_BUTTON_2","确认","Confirm"],[481,"UI_LOBBY_050","是你把我唤醒的吗？你是蛋蛋的爸爸还是妈妈？","Did you wake me up? Are you Eggy's daddy or mummy?"],[482,"UI_LOBBY_051","老大，你手里东西看起来好危险，蛋蛋要躲远一点","Boss, the thing in your hand looks so dangerous, Eggy should stay away."],[483,"UI_LOBBY_052","老大，我也想坐，蛋蛋也想坐跷跷板","Boss, I want to play too! Eggy also wants to sit on the seesaw!"],[484,"UI_LOBBY_053","哇,跷跷板好好玩,等蛋蛋长大了也想玩","Wow, the seesaw is so fun! Eggy wants to play when Eggy grows up!"],[485,"UI_LOBBY_054","呜呜呜蛋蛋坐不上跷跷板","*Sobbing* Eggy can't sit on the seesaw."],[486,"UI_LOBBY_055","哇！老大你飞起来了！","Wow! Boss, you are flying!"],[487,"UI_LOBBY_056","老大别飞太高啦，蛋蛋跟不上","Boss, don't fly too high, Eggy can't keep up!"],[488,"UI_LOBBY_057","进球！好厉害的射门！","Goal! What a great shot!"],[489,"UI_LOBBY_058","好准的射门！太酷啦！","What a shot! So cool!"],[490,"UI_LOBBY_059","老大真厉害！老大真厉害！老大最厉害了！","Boss is great! Boss is awesome! Boss is the best!"],[491,"UI_LOBBY_060","哇！好大一条鱼呀！老大你太厉害啦！","Wow! What a big fish! Boss, you're amazing!"],[492,"UI_LOBBY_061","钓鱼要耐心，嘘，鱼儿就要上钩了","Be patient when fishing, shhh, the fish are about to get hooked!"],[493,"UI_LOBBY_062","老大你知道海的那边是什么吗？","Boss, do you know what's on the other side of the sea?"],[494,"UI_LOBBY_063","老大蛋蛋就要出生啦！明天记得来看我呀！","Boss, Eggy is about to come out! Remember to visit me tomorrow!"],[495,"UI_LOBBY_064","肚子饱饱，心情好好，咕噜噜噜","My stomach is full, my mood is good! *Gurgling*"],[496,"UI_LOBBY_065","摇摇晃晃，我就是最酷的蛋蛋","Shake it! I'm the coolest egg!"],[497,"UI_LOBBY_066","老大，怎么总有人叫我蛋仔呀，我不喜欢被叫蛋仔","Boss, why do people always call me egg boy? I don't like being called egg boy."],[498,"UI_LOBBY_067","糖果世界里面有一只糖果蛋蛋，不是很合理吗","There is a candy egg in the candy world, isn't it reasonable?"],[499,"UI_LOBBY_068","明天蛋蛋会变成什么样子呢？好期待呀","What will Eggy look like tomorrow? I'm looking forward to it!"],[500,"UI_LOBBY_069","蛋蛋明天就要出生噜，好开心呀","Eggy is going out tomorrow! I'm so happy!"],[501,"UI_LOBBY_070","老大你明天还会来看蛋蛋吗？","Boss, will you come to see Eggy tomorrow?"],[502,"UI_LOBBY_071","想快快出生，想快快长大","I want to be born quickly, I want to grow up quickly..."],[503,"UI_LOBBY_072","明天蛋蛋要送你一个惊喜，记得来找蛋蛋","Eggy will give you a surprise tomorrow, remember to come to find Eggy."],[504,"UI_LOBBY_073","蛋蛋好喜欢和老大呆在一起","Eggy really likes staying with you."],[505,"UI_LOBBY_074","我们去坐火车吧老大","Let's go take the train, boss!"],[506,"UI_LOBBY_075","蛋蛋也想飞起来，说不定蛋蛋明天就变成恐龙了","Eggy also wants to fly! Maybe Eggy will become a dinosaur tomorrow!"],[507,"UI_LOBBY_076","糖果岛举办的比赛，老大你能夺冠吗？","Can you win the competition held by Candy Island, boss?"],[508,"UI_LOBBY_077","好多糖果呀，但是蛋蛋是不会把老大弄混的！","There are so many Candies here! But Eggy won't confuse the boss!"],[509,"UI_LOBBY_078","蛋蛋最喜欢老大啦","Eggy loves you!"],[510,"UI_LOBBY_079","老大你明天可一定要来找蛋蛋噢！","Boss, you must come to find Eggy tomorrow!"],[511,"UI_LOBBY_080","你离开的时候蛋蛋也会想你的老大","Eggy will miss you when you're away, boss..."],[512,"UI_LOBBY_081","呼噜噜，想睡觉，呼噜噜，想睡觉","*Snoring* I want to sleep... *Purring* I want to sleep..."],[513,"UI_LOBBY_082","我们去坐飞机吧老大！蛋蛋也想飞起来！","Let's get on the plane, boss! Eggy wants to fly too!"],[514,"UI_LOBBY_083","蹦蹦跳跳，和老大一起蹦蹦跳跳！","Bouncing, and bouncing with my boss!"],[515,"UI_LOBBY_084","老大蛋蛋马上就要出生啦！","Boss! Eggy is about to come out!"],[516,"UI_LOBBY_085","倒计时怎么这么慢呀！蛋蛋都快等不及啦","Why is the countdown so slow? I can't wait any longer!"],[517,"UI_LOBBY_086","明天见！老大！","See you tomorrow! Boss!"],[518,"UI_LOBBY_087","老大你明天是不是就不来看蛋蛋了","Boss, are you going to stop coming to find Eggy tomorrow?"],[519,"UI_LOBBY_088","蛋蛋也想和老大一起去闯关","Eggy wants to party with you too!"],[520,"UI_LOBBY_089","呼呼呼，好累好累","I'm so tired..."],[521,"UI_LOBBY_090","鸡蛋鸭蛋恐龙蛋，蛋蛋会是什么蛋呢？明天就知道啦","Eggs, duck eggs, dinosaur eggs... what kind of egg would Eggy be? We'll know tomorrow!"],[522,"UI_LOBBY_091","老大明天我就要出生啦！记得来找蛋蛋噢！","Boss, I will be born tomorrow! Remember to come to Eggy!"],[523,"UI_LOBBY_092","老大老大，我们去海滩边钓鱼吧！","Boss, let's go fishing at the beach!"],[524,"UI_LOBBY_093","老大，你能跳上云朵吗？","Boss, can you jump on a cloud?"],[525,"UI_LOBBY_094","蛋蛋最喜欢最喜欢老大啦！","Eggy like you!"],[526,"UI_LOBBY_095","听说海滩边可以钓鱼哦","I heard that you can fish by the beach."],[527,"UI_LOBBY_096","火车站的背面可以坐上火车","You can get on the train at the back of the train station."],[528,"UI_LOBBY_097","是小飞机飞得高还是小翅膀呢","Does the little plane fly higher or the little wing fly higher?"],[529,"UI_LOBBY_098","商店可以买到漂亮的衣服","Beautiful clothes are available in shops."],[530,"UI_LOBBY_099","每天都可以抽奖哦，要记得每天上线免费抽奖","You can draw prizes every day! Remember to login for free prize draws every day!"],[531,"UI_LOBBY_100","今天天气真不错哦~","It's a nice day today!"],[532,"UI_LOBBY_101","又要去拿冠军了吗老大","Are you going to win the championship again, boss?"],[533,"UI_LOBBY_102","好害怕被炸弹炸飞呀","I'm so afraid of being blown up by a bomb!"],[534,"UI_LOBBY_103","破壳后的蛋蛋还是蛋蛋","Eggy is still Eggy after coming out of the shell."],[535,"UI_LOBBY_104","海的那边是什么呢？","What's on the other side of the sea?"],[536,"UI_LOBBY_105","{0}秒后获得奖励","{0} seconds to get reward."],[537,"UI_LOBBY_106","一颗神秘的蛋，孵化后会获得什么呢","A mysterious egg, what will you get after hatching?"],[538,"UI_LOBBY_107","快来啊！","Come!"],[539,"PRATICE_NAME_1","移动练习","Move"],[540,"PRATICE_NAME_2","跳跃练习","Jump"],[541,"PRATICE_NAME_3","飞扑练习","Swoop"],[542,"PRATICE_TIP_1","组队状态下不能开始练习赛哦","Cannot start in a team"],[543,"PRATICE_TIP_2","暂未解锁","LOCK"],[544,"PRATICE_TIP_3","个人赛","Individual \nCompetition"],[545,"PRATICE_TIP_4","奖励","Rewards"],[546,"PRATICE_BUTTON_1","返回大厅","Back to lobby"],[547,"PRATICE_BUTTON_2","选择关卡","Select level"],[548,"PRATICE_BUTTON_3","再次挑战","Challenge Again"],[549,"PRATICE_BUTTON_4","开始练习","Start"],[550,"PRATICE_END_1","挑战失败","Challenge Failed"],[551,"PRATICE_END_2","练习成功","Practice Success"],[552,"ACTIVITY_BUTTON_01","活动","Event"],[553,"ACTIVITY_BUTTON_02","定时签到","Regular \nReward"],[554,"DAILYLOGIN_TIP_01","晚间登陆礼","Evening Login Gift"],[555,"DAILYLOGIN_TIP_02","登录游戏","Login the game"],[556,"DAILYLOGIN_BUTTON_01","领取","Claim"],[557,"DAILYLOGIN_BUTTON_02","已领取","Claimed"],[558,"DAILYLOGIN_BUTTON_03","未完成","Ongoing"],[559,"ANIMATION_BUTTON_01","跳过","Skip"],[560,"UI_TIP__01","金币","Gold Coins"],[561,"UI_TIP__02","糖果","Candy"],[562,"UI_TIP__03","活跃度","Activity"],[563,"UI_TIP__04","宝箱","Treasure Chest"],[564,"UI_TIP__05","游戏中获得，可用于商店购买","Obtained in-game and available for store purchase"],[565,"UI_TIP__06","获得重复道具 会变成糖果，可用于商店购买","Obtaining duplicate items will convert to candies, which can be used for store purchases."],[566,"UI_TIP__07","完成任务即可获得，可用于开启不同宝箱！","You can get it after completing the quest, which can be used to open different treasure chests!"],[567,"UI_TIP__08","活跃度足够即可开启，不同宝箱有各式礼物赠送~","You can open it if you are active enough, and there are various gifts for different treasure boxes!"],[568,"UI_LOBBY_108","邀请你组队游戏","Invite you to play "],[569,"UI_LOBBY_109","离开了队伍","Left the team"],[570,"UI_LOBBY_110","邀请","Invite"],[571,"UI_LOBBY_111","{0}秒后开始游戏","Game starts in {0}s"],[572,"UI_LOBBY_112","玩家列表","Player List"],[573,"UI_LOBBY_113","接受组队邀请","Accept team invitation"],[574,"UI_LOBBY_114","队伍成员","Team"],[575,"UI_LOBBY_115","组队","Team up"],[576,"UI_LOBBY_116","{0}开始了对战，是否进入","{0} started a match, do you want to enter?"],[577,"UI_LOBBY_117","{0}拒绝开始游戏","{0} refused to start"],[578,"UI_LOBBY_118","{0}加入了队伍","{0} joined the team"],[579,"UI_LOBBY_119","{0}离开了队伍","{0} has left the team"],[580,"UI_LOBBY_120","队伍人数超过{0}人","Team size over {0} people"],[581,"UI_LOBBY_121","对方免打扰,无法邀请","He/she is on Dismiss mode, can not be invited"],[582,"UI_LOBBY_122","对方已有队伍","Already has a team!"],[583,"UI_LOBBY_123","不存在玩家信息","Player info not exist!"],[584,"UI_LOBBY_124","存在新手引导无法加入","He/she is in tutorial, can not join the team."],[585,"UI_LOBBY_125","等待对方回复","Waiting for response..."],[586,"UI_LOBBY_126","{0}邀请你一起组队","{0} invites you to join the team"],[587,"UI_LOBBY_127","队长信息有误","Owner information error"],[588,"UI_LOBBY_128","队伍已解散","Team has been disbanded"],[589,"UI_LOBBY_129","队伍已满员","Team is full"],[590,"UI_LOBBY_130","是否离开队伍?","Do you want to leave the team?"],[591,"UI_LOBBY_131","获取中...","Processing..."],[592,"UI_LOBBY_132","带你飞！","I can carry!"],[594,"UI_LAN_275","急速前行","Rush Forward"],[595,"UI_LAN_276","极限通道","Extreme Access"],[596,"SKIN_NAME_1090","蓝莓硬糖","Blueberry Candy"],[597,"UI_LOBBY_133","拖尾","Trail"],[598,"UI_LOBBY_134","左手","Left"],[599,"UI_LOBBY_135","右手","Right"],[600,"UI_LOBBY_136","背部","Back"],[601,"UI_LOBBY_137","快来拔萝卜","Come and pull the radish!"],[602,"UI_LOBBY_138","我被卡住了，快来救救我","I'm stuck, come and help me!"],[603,"UI_LOBBY_139","合适时机点击按钮","Tap the button at the right time"],[604,"UI_LOBBY_140","快过来","Come here!"],[605,"UI_TIP_09","耗时","Time cost"],[606,"UI_LOBBY_141","新人每日签到","Newbie Daily Bonus"],[607,"UI_LOBBY_142","请在期限内签到并领取奖励！","Please sign in and claim your reward within the limit time!"],[608,"UI_LOBBY_143","{0}天 {1}小时","{0} days {1} hrs"],[609,"UI_LOBBY_144","获取奖励","Get Reward"],[610,"UI_LOBBY_145","7日奖励","7-Day Bonus"],[611,"UI_LOBBY_146","{0}日奖励","{0}Day Bonus"],[612,"UI_FISH_1","没有装备鱼竿","No fishing rod equipped"],[613,"UI_FISH_2","你已经在钓鱼","You're already fishing"],[614,"UI_FISH_3","你没有在钓鱼","You're not fishing."],[615,"UI_FISH_4","你的状态不对","You are not in the right state."],[616,"UI_FISH_5","请去有水且水较深的地方钓鱼","Please go fishing in deeper water"],[617,"UI_FISH_6","在【手机震动】的时候再【收杆】","When [Phone Vibrates], [Retract]"],[618,"UI_FISH_7","哎呀！鱼线断掉了","Oops! The line is broken!"],[619,"UI_FISH_8","太晚了，鱼跑掉了","It's too late, the fish has escaped."],[620,"UI_FISH_9","太棒了钓上来一条{0}，获得金币 x {1}","Great! Catch a {0} and get gold coins*{1}"],[621,"UI_FISH_10","太棒了钓上来一条{0}，获得糖果 x {1}","Great! Catch a {0} and get candy*{1}"],[622,"UI_FISH_11","捡到一个{0},获得金币*{1}","Pick up a {0}, get gold*{1}"],[623,"UI_FISH_12","捡到一个{0},获得糖果*{1}","Pick up a {0}, get candy*{1}"],[624,"UI_LOBBY_147","已签到","Done"],[625,"UI_LOBBY_148","今日已签到!","You've already signed in!"],[626,"UI_LOBBY_149","今日签到已更新！","Today's sign-in has been updated!"],[627,"UI_FISH_13","鲈鱼","Sea ​​bass"],[628,"UI_FISH_14","帝皇 鲈鱼","Emperor Bass"],[629,"UI_FISH_15","大口副鲈","Largemouth Bass"],[630,"UI_FISH_16","帝皇 大口副鲈","Emperor Largemouth Bass"],[631,"UI_FISH_17","草鱼","Grass carp"],[632,"UI_FISH_18","帝皇 草鱼","Emperor Grass Carp"],[633,"UI_FISH_19","香鱼","Mackerel"],[634,"UI_FISH_20","帝皇 香鱼","Emperor Mackerel"],[635,"UI_FISH_21","尖吻鲈","Zander"],[636,"UI_FISH_22","帝皇 尖吻鲈","Emperor Zander"],[637,"UI_FISH_23","雨鳟","Rain Trout"],[638,"UI_FISH_24","帝皇 雨鳟","Emperor Rain Trout"],[639,"UI_FISH_25","阿留申平鲉","Alaska flatfish"],[640,"UI_FISH_26","帝皇 阿留申平鲉","Emperor Alaska flatfish"],[641,"UI_FISH_27","乌鳢","Snakehead"],[642,"UI_FISH_28","帝皇 乌鳢","Emperor Snakehead"],[643,"UI_FISH_29","鲤鱼","Carp"],[644,"UI_FISH_30","帝皇 鲤鱼","Emperor Carp"],[645,"UI_FISH_31","花羔红点斑鲑鱼","Lamb Spotted Salmon"],[646,"UI_FISH_32","帝皇 花羔红点斑鲑鱼","Emperor Lamb Spotted Salmon"],[647,"UI_FISH_33","少鳞鳜","Coreoperca whiteheadi"],[648,"UI_FISH_34","帝皇 少鳞鳜","Emperor Coreoperca whiteheadi "],[649,"UI_FISH_35","虹鳟","Rainbow trout"],[650,"UI_FISH_36","帝皇 虹鳟","Emperor Rainbow Trout"],[651,"UI_FISH_37","鳟鱼","Trout"],[652,"UI_FISH_38","帝皇 鳟鱼","Emperor Trout"],[653,"UI_FISH_39","白斑狗鱼","White Spotted Dogfish"],[654,"UI_FISH_40","帝皇 白斑狗鱼","Emperor White Spotted Dogfish"],[655,"UI_FISH_41","青鳉","Medaka"],[656,"UI_FISH_42","帝皇 青鳉","Emperor medaka"],[657,"UI_FISH_43","笛鲷","Snapper"],[658,"UI_FISH_44","帝皇 笛鲷","Emperor Snapper"],[659,"UI_FISH_45","杜父鱼","Sculpin"],[660,"UI_FISH_46","帝皇 杜父鱼","Emperor sculpin"],[661,"UI_FISH_47","毛鼻鲶","Hairy-nosed catfish"],[662,"UI_FISH_48","帝皇 毛鼻鲶","Emperor Hairy-nosed Catfish"],[663,"UI_FISH_49","三刺鱼","Stickleback"],[664,"UI_FISH_50","帝皇 三刺鱼","Emperor stickleback"],[665,"UI_FISH_51","平颌鱲","Zacco platypus"],[666,"UI_FISH_52","帝皇 平颌鱲","Emperor Zacco platypus"],[667,"UI_FISH_53","虾虎鱼","Goby"],[668,"UI_FISH_54","帝皇 虾虎鱼","Emperor Goby"],[669,"UI_FISH_55","珍珠鱼","Pearl Fish"],[670,"UI_FISH_56","帝皇 珍珠鱼","Emperor Pearl Fish"],[671,"UI_FISH_57","冠丽鱼","Guppy"],[672,"UI_FISH_58","帝皇 冠丽鱼","Emperor Guppy"],[673,"UI_FISH_59","帝王鲑","King Salmon"],[674,"UI_FISH_60","帝皇 帝王鲑","Emperor King Salmon"],[675,"UI_FISH_61","英丽鱼","Heros severus"],[676,"UI_FISH_62","帝皇 英丽鱼","Emperor Heros severus"],[677,"UI_FISH_63","大口樱鳟","Cherry Trout"],[678,"UI_FISH_64","帝皇 大口樱鳟","Emperor Cherry Trout"],[679,"UI_FISH_65","石鲈","Blackbass"],[680,"UI_FISH_66","帝皇 石鲈","Emperor Blackbass"],[681,"UI_FISH_67","锯首平鲉","Treefish"],[682,"UI_FISH_68","帝皇 锯首平鲉","Emperor Treefish"],[683,"UI_FISH_69","福氏厚唇鲻","Mullet"],[684,"UI_FISH_70","帝皇 福氏厚唇鲻","Emperor Mullet"],[685,"UI_FISH_71","斑鳢","Channa"],[686,"UI_FISH_72","帝皇 斑鳢","Emperor Channa"],[687,"UI_FISH_73","高体鳑鲏","Rosy bitterling"],[688,"UI_FISH_74","帝皇 高体鳑鲏","Emperor Rosy bitterling"],[689,"UI_FISH_75","真鲈","Perch"],[690,"UI_FISH_76","帝皇 真鲈","Emperor Perch"],[691,"UI_FISH_77","银纹笛鲷","Silver snapper"],[692,"UI_FISH_78","帝皇 银纹笛鲷","Emperor silver snapper"],[693,"UI_FISH_79","曲纹唇鱼","Napoleon fish"],[694,"UI_FISH_80","帝皇 曲纹唇鱼","Emperor Napoleon fish"],[695,"UI_FISH_81","鲶鱼","Catfish"],[696,"UI_FISH_82","帝皇 鲶鱼","Emperor Catfish"],[697,"UI_FISH_83","皇带鱼","Oarfish"],[698,"UI_FISH_84","帝皇 皇带鱼","Emperor Oarfish"],[699,"UI_FISH_85","蓝鳍金枪鱼","Bluefin tuna"],[700,"UI_FISH_86","帝皇 蓝鳍金枪鱼","Emperor Bluefin Tuna"],[701,"UI_FISH_87","孔雀鱼","Guppy"],[702,"UI_FISH_88","帝皇 孔雀鱼","Emperor Guppy"],[703,"UI_FISH_89","大眼鲤鱼","Big Eye Carp"],[704,"UI_FISH_90","帝皇 大眼鲤鱼","Emperor Big Eye Carp"],[705,"UI_FISH_91","金龙鱼","Arowana"],[706,"UI_FISH_92","帝皇 金龙鱼","Emperor Arowana"],[707,"UI_FISH_93","小丑鱼","Clownfish"],[708,"UI_FISH_94","帝皇 小丑鱼","Emperor Clownfish"],[709,"UI_FISH_95","多莉鱼","Blue tang"],[710,"UI_FISH_96","帝皇 多莉鱼","Emperor Blue tang"],[711,"UI_FISH_97","金枪鱼","Tuna"],[712,"UI_FISH_98","帝皇 金枪鱼","Emperor Tuna"],[713,"UI_FISH_99","深海金枪鱼","Deep Sea Tuna"],[714,"UI_FISH_100","帝皇 深海金枪鱼","Emperor Deep Sea Tuna"],[715,"UI_FISH_101","鹦哥鱼","Parrotfish"],[716,"UI_FISH_102","帝皇 鹦哥鱼","Emperor Parrotfish"],[717,"UI_FISH_103","七彩神仙鱼","Discus fish"],[718,"UI_FISH_104","帝皇 七彩神仙鱼","Emperor Discus fish"],[719,"UI_FISH_105","犁头鳐","Guitar fish"],[720,"UI_FISH_106","帝皇 犁头鳐","Emperor Guitarfish"],[721,"UI_FISH_107","霓虹脂鲤","Neon carp"],[722,"UI_FISH_108","帝皇 霓虹脂鲤","Emperor Neon carp"],[723,"UI_FISH_109","杜氏扁鲨","Donovel's shark"],[724,"UI_FISH_110","帝皇 杜氏扁鲨","Emperor Donovel's shark"],[725,"UI_FISH_111","鲨鱼","Shark"],[726,"UI_FISH_112","帝皇 鲨鱼","Emperor Shark"],[727,"UI_FISH_113","魔鬼鱼","Devil Fish"],[728,"UI_FISH_114","帝皇 魔鬼鱼","Emperor Devilfish"],[729,"UI_FISH_115","蓝鳍金枪鱼王","King Bluefin Tuna"],[730,"UI_FISH_116","帝皇 蓝鳍金枪鱼王","Emperor Bluefin Tuna King"],[731,"UI_FISH_117","翻车鱼","Sunfish"],[732,"UI_FISH_118","帝皇 翻车鱼","Emperor Ocean sunfish"],[733,"UI_FISH_119","锦鲤","Koi"],[734,"UI_FISH_120","帝皇 锦鲤","Emperor Koi"],[735,"UI_FISH_121","须鲸","Baleen whale"],[736,"UI_FISH_122","帝皇 须鲸","Emperor Baleen Whale"],[737,"UI_FISH_123","猫鲨","Cat shark"],[738,"UI_FISH_124","帝皇 猫鲨","Emperor Cat Shark"],[739,"UI_FISH_125","鲸鱼","Whale"],[740,"UI_FISH_126","帝皇 鲸鱼","Emperor Whale"],[741,"UI_FISH_127","迷你鲨鱼","Mini Shark"],[742,"UI_FISH_128","帝皇 迷你鲨鱼","Emperor Mini Shark"],[743,"UI_FISH_129","迷你须鲸","Mini baleen whale"],[744,"UI_FISH_130","帝皇 迷你须鲸","Emperor minibaleen whale"],[745,"UI_FISH_131","迷你魔鬼鱼","Mini Devilfish"],[746,"UI_FISH_132","帝皇 迷你魔鬼鱼","Emperor Mini Devilfish"],[747,"UI_FISH_133","超大珍珠贝","Oversized pearl shell"],[748,"UI_FISH_134","大珍珠贝","Large pearl shell"],[749,"UI_FISH_135","珍珠贝","Pearl Shell"],[750,"UI_FISH_136","超大鸟蛤","Oversized bird clam"],[751,"UI_FISH_137","大鸟蛤","Big Bird Clam"],[752,"UI_FISH_138","鸟蛤","Bird Clam"],[753,"UI_FISH_139","超大宝塔螺","Oversized Pagoda Snail"],[754,"UI_FISH_140","大宝塔螺","Large Pagoda Snail"],[755,"UI_FISH_141","宝塔螺","Pagoda Snail"],[756,"UI_FISH_142","大海葵","Big Anemone"],[757,"UI_FISH_143","海葵","Anemone"],[758,"UI_FISH_144","小海葵","Little Anemone"],[759,"UI_FISH_145","超大响螺","Oversized Hemifusus"],[760,"UI_FISH_146","大响螺","Big Hemifusus"],[761,"UI_FISH_147","响螺","Hemifusus"],[762,"UI_FISH_148","大海蜇","Big Jellyfish"],[763,"UI_FISH_149","海蜇","Jellyfish"],[764,"UI_FISH_150","小海蜇","Small Jellyfish"],[765,"UI_FISH_151","怪物海星","Monster Starfish"],[766,"UI_FISH_152","霸王海星","Overlord starfish"],[767,"UI_FISH_153","海星","Starfish"],[768,"UI_FISH_154","超大巫女螺","Oversized Witch Conch"],[769,"UI_FISH_155","大巫女螺","Big Witch Conch"],[770,"UI_FISH_156","巫女螺","Witch conch"],[771,"UI_FISH_157","超大北极贝","Oversized Arctic shell"],[772,"UI_FISH_158","大北极贝","Big Arctic Shell"],[773,"UI_FISH_159","北极贝","Arctic shell"],[774,"UI_FISH_160","棒棒糖","Lollipop"],[775,"UI_FISH_161","超大猫眼螺","Oversized cat's eye snail"],[776,"UI_FISH_162","大猫眼螺","Big cat's eye snail"],[777,"UI_FISH_163","猫眼螺","Cat's eye snail"],[778,"UI_FISH_164","珍珠","Pearl"],[779,"UI_FISH_165","海盗的财宝","Pirate's Treasure"],[780,"UI_LOBBY_150","只有队长可以开始游戏","Only the owner can start the game"],[781,"SKIN_NAME_2060","蓝汉服糖糖","Blue Hanfu Candy"],[782,"ITEM_NAME_50072","【手】巫女螺","[Hand] Witch Snail"],[783,"ITEM_NAME_50073","【手】响螺","[Hand] Hemifusus"],[784,"ITEM_NAME_50074","【手】北极贝","[Hands] Arctic Shell"],[785,"ITEM_NAME_50075","【手】鸟蛤","[Hand] Bird Clam"],[786,"ITEM_NAME_50076","【手】珍珠贝","[Hands] Pearl Shell"],[787,"ITEM_NAME_50077","【手】宝塔螺","[Hand] Pagoda Snail"],[788,"ITEM_NAME_50078","【手】红海星","[Hand] Red Starfish"],[789,"UI_LOBBY_151","本日{0}获得金币数已达上限","Coins obtained by {0} today have reached the upper limit."],[790,"UI_FISH_166","本日\"收集贝壳\"获得金币数已达上限","Coins obtained by [Collect Seashell] today have reached the upper limit."],[791,"UI_FISH_167","本日\"收集贝壳\"获得糖果数已达上限","Candies obtained by [Collect Seashell] today have reached the upper limit."],[792,"UI_FISH_168","本日\"钓鱼\"获得金币数已达上限","Coins obtained by [Fishing] today have reached the upper limit."],[793,"UI_FISH_169","本日\"钓鱼\"获得糖果数已达上限","Candies obtained by [Fishing] today have reached the upper limit."],[794,"UI_FISH_170","不要点，鱼儿还没有上钩呢","Be patient, the fish are not yet hooked!"],[795,"UI_LOBBY_152","七日签到","Seven-day \nBonus"],[796,"Item_name_1","水炸弹","Water Balloon"],[797,"Item_name_2","翅膀","Wing"],[798,"Item_name_3","变大药剂","Bigger Potion"],[799,"Item_name_4","变小药剂","Smaller Potion"],[800,"Item_name_5","水枪","Water Gun"],[801,"Item_name_6","夏日冰棒","Summer Ice Pop"],[802,"UI_LAN_277","旋转激流","Swirling Torrent"],[803,"UI_NEWGUID_002","滑动右侧屏幕移动视角","Slide the right screen to move the viewing angle"],[804,"QUEST_12","在大厅拔出{0}个萝卜","Pull out {0} radishes in Lobby"],[805,"QUEST_13","在大厅使用{0}次飞行","Use {0} flights in the lobby"],[806,"QUEST_14","在大厅使用{0}次缩小药","Use {0} Smaller Potions in the lobby"],[807,"QUEST_15","获得{0}金币","Get {0} gold"],[808,"QUEST_16","单日在线时长{0}分钟","Daily online time {0} mins"],[809,"QUEST_17","登录{0}天","Login {0} days"],[810,"QUEST_18","组队状态下参加{0}场比赛","Participate in {0} games as a team"],[811,"Season_Button_01","奖励","Reward"],[812,"Season_Button_02","任务","Quest"],[813,"Season_Button_03","周任务","Weekly Quest"],[814,"Season_Button_04","赛季任务","Season Quest"],[815,"Season_Button_05","第{0}周","Week{0}"],[816,"Season_Des_01","{0}天{1}小时","{0} days {1} hrs"],[817,"Season_Des_02","第{0}周进度奖励","Week {0} Progress Reward"],[818,"Season_Des_03","本周剩余时间{0}天{1}小时","Remaining time this week: {0} days {1} hrs "],[819,"Season_Des_04","这一周还未解锁","This week's content is still unavailable."],[820,"Season_Des_05","开启高级通行证解锁","Activate Premium Pass to unlock"],[821,"Season_Des_06","赛季签到获取高级通行证","Season Check-In to get Premium Pass"],[822,"Season_Des_07","成功解锁高级通行证","Successfully unlock Premium Pass"],[823,"Season_Des_08","已解锁","Unlocked"],[824,"Season_Des_09","高级通行证","Premium Pass"],[825,"UI_LOBBY_153","签到","Daily"],[826,"UI_LOBBY_154","哦哈哈，又是一枚来参加派对的小糖果，穿过这里就可以到达糖果岛了，但是在此之前，你得要接受一点小小的考验","Aha, another little candy for the party!You can get to Candy Island through here, but before that, you must go through a little test."],[827,"UI_LOBBY_155","穿过这里就可以到达糖果岛了，但是在此之前，你得要接受一点小小的考验","You can get to Candy Island through here, but before that, you must go through a little test."],[828,"UI_LOBBY_156","在考验里好好学习派对技巧吧~我会在终点线等你的","Learn your party skills in the test! I'll be waiting for you at the finish line!"],[829,"UI_LOBBY_157","这么快就通过了考验，很厉害的新糖果嘛,接下来，来和我较量一番吧，可不要落后太多哦","You've passed the test so quickly, you're a great new candy! Now, come and compete with me, but don't be too far behind!"],[830,"UI_LOBBY_158","喜你获得了胜利，好好享受你的派对之旅吧！","Congratulations on your victory and enjoy your party!"],[831,"text_settle_01","已拥有的物品被转化为糖果啦~","Let me give you some candies!"],[832,"UI_TIP_10","经验","EXP"],[833,"SKIN_NAME_2070","蓝色夏威夷","Blue Hawaii"],[834,"SKIN_NAME_2071","红色夏威夷","Red Hawaii"],[835,"SKIN_NAME_3030","海滩风情","Beach Style"],[836,"ITEM_NAME_30011","害羞","Shy"],[837,"ITEM_NAME_30012","晕倒","Fainting"],[838,"ITEM_NAME_30013","愤怒","Angry"],[839,"ITEM_NAME_30014","小鸟飞","Birds flying"],[840,"ITEM_NAME_30015","悠闲","Relaxed"],[841,"Season_Des_10","赛季进度奖励","Season Progress Bonus"],[842,"Season_Des_11","解锁","Unlock"],[843,"Season_Des_12","赛季皮肤","Season Skin"],[844,"UI_LOBBY_159","熊猫隐士","Panda"],[845,"UI_LOBBY_160","对方完成一局对局才能解锁组队哦~","The player has to complete a game to unlock the team feature."],[846,"UI_LOBBY_161","换了新的装扮，快去游戏里试试吧！","You've got a new look, try it out in the game!"],[847,"UI_LAN_278","水上之路","Road on Water"],[848,"UI_LAN_279","赛季签到","Season \nDaily Reward "],[849,"Content_txt_01","匹配已成功，无法取消","The match has been made and cannot be cancelled!"],[850,"UI_LOBBY_162","进度","Progress"],[851,"Level_001","摇摇晃晃~","Wobbling~",null,"关卡中文重复正常，更新了更规范的key"],[852,"Level_002","丛林滚筒！","Jungle Rollers!"],[853,"Level_003","太空遨游","Space Travel"],[854,"Level_004","无限起伏","Infinite Curves"],[855,"Level_005","别掉下去","Don't fall off"],[856,"Level_006","笔刷之路","Way of Brushes"],[857,"Level_007","转盘大作战","Turntable Battle"],[858,"Level_011","动感大炮","Dynamic Cannon"],[859,"Level_012","旋转跳跃","Spinning & Jumping!"],[860,"Level_013","糖果转转转","Candy Spinning"],[861,"Level_014","果冻快跑","Jelly Run"],[862,"Level_015","急速前行","Rush Forward"],[863,"Level_016","极限通道","Extreme Access"],[864,"Level_018","水上之路","Road on Water"],[865,"Level_019","旋转激流","Swirling Torrent"],[866,"Obby_001","返回","Back"],[867,"Obby_002","重生","Respawn"],[868,"Obby_003","排名","Rank"],[869,"Obby_004","检查点","Level"],[870,"Obby_005","昵称","Name"],[871,"Obby_006","声音:开","Sound: On"],[872,"Obby_007","声音:关","Sound: Off"],[873,"Obby_008","第{0}关","Level {0}"],[874,"Obby_009","汽车驾驶室在左侧还是右侧？","Is the car cab on the left or right?"],[875,"Obby_010","展现你的蛇形走位","Show your snake walk"],[876,"Obby_011","注意避开红色的物体","Be careful to avoid red objects!"],[877,"UI_LOBBY_163","此处是通往国王的城堡，请多多获得比赛胜利以提升你的名气，国王会邀请有名气的果冻前往他的城堡。","This is the way to the king's castle. Win as many races as you can to increase your fame and the king will invite the famous jellies to his castle."],[878,"UI_LOBBY_164","活动限时开放","Limit Time Event"],[879,"UI_LOBBY_ActivityLevel1","马桶人跑酷！","Skibidi Toilet Obby!"],[880,"UI_LOBBY_165","※跳转将经历短暂的黑屏加载，请稍作等待","※Please wait while the screen loads for a short while."],[881,"UI_LOBBY_166","立即前往","Go Now"],[882,"Obby_012","有队友返回大厅，是否一起返回？","You have teammates returning to the lobby, do you want to return together?"],[883,"Obby_013","回到起点","Back to Startpoint"],[884,"Obby_014","太棒了，这里是终点！","Great, here's the finish line!"],[885,"Obby_015","你已经逃脱马桶人的追捕","You've escaped from Skibidi Toilet!"],[886,"UI_LOBBY_167","传送入口！马桶人跑酷！","TP entrance! Skibidi Toilet Obby!"],[887,"Level_020","真真假假","True or False"],[888,"UI_LOBBY_168","是否前往国王城堡？","Do you want to go to King's Castle?"],[889,"UI_EndRank_01","小队成员","Team Member"],[890,"UI_EndRank_02","给你点赞了"," likes you"],[891,"UI_EndRank_03","夺冠啦","Win!"],[892,"Obby_016","是否返回大厅？","Are you sure to return to the lobby?"],[893,"UI_LOBBY_169","获取3个皮肤后解锁，是否进入抽奖界面?","Unlock after obtaining 3 skins, do you want to enter the lottery interface?"],[894,"UI_LOBBY_170","有队员暂未解锁活动关卡，需要拥有3件皮肤才能解锁活动关卡","A team member has not unlocked the event level yet. You need 3 skins to unlock the event level."],[895,"UI_LOBBY_171","限时模式","Time Limit \nMode"],[896,"UI_LOBBY_172","果冻国王召见你，通过传送门前往果冻城堡","The Jelly King summons you. Use the portal to journey to the Jelly Castle."],[897,"UI_Story_001","前往<color=#green>城堡一层</color>与<color=#red>国王</color>对话","Head to the <color=#green>first floor of the castle</color>and speak with the <color=#red>King</color>."],[898,"UI_Story_002","<color=#green>城堡内外</color>寻找<color=#red>钥匙碎片</color>","Search both <color=#green>inside and outside the castle</color> to find <color=#red>key fragments</color>."],[899,"UI_Story_003","与<color=#red>国王</color>对话","Speak with the<color=#red>King</color>."],[900,"UI_Story_004","<color=#green>城堡外</color>寻找<color=#red>肉骨头</color>","Search<color=#green>outside the castle</color>for<color=#red>meat bones</color>."],[901,"UI_Story_005","与<color=#red>汪汪队长</color>对话","Talk to <color=#red>Captain Dog</color>."],[902,"UI_Story_006","<color=#green>城堡内外</color>寻找<color=#red>毛球</color>","Search <color=#green> inside and outside the castle</color> for <color=#red>furballs</color>."],[903,"UI_Story_007","你是新来的吗？先去城堡一层见国王吧","Are you new here? First, go to the first floor of the castle and meet the king."],[904,"UI_Story_008","先和我打招呼吗？果然喵喵的魅力没有果冻能拒绝","Did you greet me first? Indeed, the charm of meow-meow is irresistible, and no jelly can resist."],[905,"UI_Story_009","这里是观察远方的瞭望塔，我们要时刻警惕逐渐逼近的危机","This is the observatory tower for watching the distance. We need to stay vigilant about the approaching crisis."],[906,"UI_Story_010","终于来了，我的小果冻","Finally, you're here, my little jelly."],[907,"UI_Story_011","我们汪汪勇士是国王最忠诚的护卫，不像喵喵大臣那么狡猾！汪！","We, the Woof Woof Warriors, are the king's most loyal guards, unlike the cunning Meow Meow Minister! Woof!"],[908,"UI_Story_012","陛下在城堡一层等你，先去找国王陛下吧！汪！","His Majesty is waiting for you on the first floor of the castle. Go find the king! Woof!"],[909,"UI_Story_013","不要打扰我，我在训练，为了面对即将到来的入侵！汪！","Don't disturb me, I'm training to face the impending invasion! Woof!"],[910,"UI_Story_014","你就是被国王陛下召见的小果冻吗？","Are you the little jelly summoned by His Majesty, the King?"],[911,"UI_Story_015","新来的吗喵","Are you new here, meow?"],[912,"UI_Story_016","没有，见过，钥匙，碎片，请不要打扰我，汪","No, seen, key, fragments. Please don't disturb me, woof."],[913,"UI_Story_017","钥匙碎片吗？好像在另一个瞭望塔上也有","Key fragments, huh? It seems there are some on another watchtower as well."],[914,"UI_Story_018","钥匙碎片？我在餐桌上好像看见过","Key fragments? I think I saw some on the dining table."],[915,"UI_Story_019","请上楼","Please go upstairs."],[916,"UI_Story_020","钥匙碎片？似乎在城堡周围看见过","Key fragments? I think I saw some around the castle."],[917,"UI_Story_021","附近似乎就看见过钥匙碎片","I think I saw some key fragments nearby."],[918,"UI_Story_022","附近没有看见过钥匙碎片呢","I haven't seen any key fragments nearby."],[919,"UI_Story_023","小果冻，还没有找到足够的钥匙碎片吗?去问问其他果冻有没有见过吧","Little jelly, haven't you found enough key fragments yet? Go ask other jellies if they've seen any."],[920,"UI_Story_024","噢！我的小果冻，你已经收集到全部的钥匙碎片了","Oh! My little jelly, you've collected all the key fragments."],[921,"UI_Story_025","快去寻找其他需要帮助的果冻吧，我会在这里等你的好消息","Go find other jellies who need help quickly. I'll be here waiting for your good news."],[922,"UI_Story_026","汪，是陛下让你来帮助我吗？","Woof, did His Majesty send you to help me?"],[923,"UI_Story_027","喵，喵喵怎么知道笨狗的肉骨头在哪里","Meow, how does Meow Meow know where the dumb dog's meat bone is?"],[924,"UI_Story_028","汪！还没有找到肉骨头吗？一定是被城堡一层的喵喵大臣给藏起来了","Woof! Haven't found the meat bone yet? It must have been hidden by the Meow Meow Minister on the first floor of the castle."],[925,"UI_Story_029","汪汪！找到了找到了！汪汪的肉骨头回来了！谢谢你小果冻，你比喵喵更聪明！","Woof woof! Found it, found it! Woof woof's meat bone is back! Thank you, little jelly. You're smarter than Meow Meow!"],[926,"UI_Story_030","喵，陛下让你这种笨蛋来帮忙？既然陛下看好你，那就帮本喵喵把被风吹走的毛线球都找回来吧","Meow, did His Majesty send a fool like you to help? Since the King trusts you, then help this Meow Meow find all the yarn balls blown away by the wind."],[927,"UI_Story_031","喵，还没找到吗笨蛋，喵","Meow, still haven't found them, you fool, meow."],[928,"UI_Story_032","喵，居然被你找齐了，本喵又可以到处扔毛线球玩了，喵喵喵","Meow, you actually managed to find them all. Now this Meow Meow can go around tossing yarn balls again. Meow meow meow."],[929,"UI_Story_033","我们汪汪队是国王陛下最忠诚的护卫，时刻准备着为了保护陛下而牺牲，汪汪","We, the Woof Woof Squad, are His Majesty's most loyal guards, always ready to sacrifice ourselves to protect him. Woof woof."],[930,"UI_Story_034","喵喵，不要打扰本喵，本喵要负责整个果冻岛的防御安排","Meow meow, don't disturb me, Meow Meow is responsible for the entire Jelly Island's defense arrangements."],[931,"UI_Story_035","汪，训练，训练，刻苦训练，我一定可以加入国王的护卫队，汪汪","Woof, training, training, diligent training. I will definitely join the king's guard, woof woof."],[932,"UI_Story_036","危机越来越近了，果冻们都应该警惕","The crisis is getting closer. All the jellies should be alert."],[933,"UI_Story_037","这里没有国王的命令，不允许通过","Without the king's orders, passage is not permitted here."],[934,"UI_Story_038","汪，汪呜~","Woof, woof!"],[935,"UI_Story_039","大敌当前，果冻们都应该献出自己一份力","In times of great danger, all jellies should contribute their efforts."],[936,"UI_Story_040","欢迎大家来到果冻城堡","Welcome everyone to Jelly Castle!"],[937,"UI_Story_041","爸爸一点也不关心我","Dad doesn't care about me at all."],[938,"UI_Story_042","任务已经满了哦!","The quest is already full!"],[939,"UI_Story_043","真让人担心，公主又跑到哪里去了","It's really worrying. Where has the princess gone again?"],[940,"UI_Story_044","保护国王陛下","Protect His Majesty, the King!"],[941,"UI_Story_045","还要站多久呢喵","How much longer do I have to stand, meow?"],[942,"UI_Story_046","远方的威胁在靠近","The distant threat is approaching."],[943,"UI_Story_047","欢迎大家来到果冻城堡~","Welcome everyone to Jelly Castle!"],[944,"UI_Story_048","训练，训练，刻苦训练","Training, training, rigorous training!"],[945,"UI_Story_049","没有国王的口谕，不许进入","Without the king's orders, entry is not allowed."],[946,"UI_Story_050","老爸一点也不关心我","Dad doesn't care about me at all."],[947,"UI_Story_051","与<color=#red>喵喵大臣</color>对话","Speak with <color=#red>Meow Meow Minister</color>."],[948,"UI_Story_052","即使在城堡中，我也听到了你越来越响亮的名声","Even within the castle, I've heard your name growing louder."],[949,"UI_Story_053","我们果冻岛正要面临一场前所未有的危机，就在前几天，侦察兵报告，远方的敌人已经蠢蠢欲动","Our Jelly Island is about to face an unprecedented crisis. Just a few days ago, the scouts reported that distant enemies are becoming restless."],[950,"UI_Story_054","我们需要你，挺身而出，为果冻岛贡献一份力量","We need you to step up and contribute to Jelly Island, to lend a helping hand in this time of need."],[951,"UI_Story_055","可是前往城堡地下室的钥匙被敌人破坏成碎片遗失在城堡内，麻烦你在城堡内寻找到十把钥匙碎片","But the key to the castle's basement was destroyed into pieces by the enemy and lost within the castle. Could you please search within the castle to find ten key fragments?"],[952,"UI_Story_056","我会在城堡一层等你的好消息","I'll be waiting on the first floor of the castle for your good news."],[953,"UI_Story_057","真是太好了，这样我们就拥有一把可以开启地下室大门的钥匙了","That's fantastic! Now we have a key that can open the basement door."],[954,"UI_Story_058","但是小果冻，地下室是非常危险的，为了防止你被切成果冻条，得验证你的实力才行","But little jelly, the basement is extremely dangerous. To prevent you from being sliced into jelly strips, your abilities need to be tested."],[955,"UI_Story_059","去城堡寻找其他果冻，完成所有果冻的委托，证明你的实力吧","Go to the castle and find other jellies, complete all their tasks, and prove your abilities."],[956,"Level_023","墙来了","Walls Coming"],[957,"UI_Story_060","好","Yes"],[958,"UI_Story_061","不好","No"],[959,"UI_Story_062","我最喜欢的肉骨头不见了，一定是被喵喵大臣给藏起来了，麻烦你帮我找回来吧","My favorite meat bone is missing. It must have been hidden by Meow Meow Minister. Could you please help me find it?"],[960,"UI_Story_063","喵喵才不会把笨狗的肉骨头藏在大炮旁边呢","Meow Meow wouldn't hide the dumb dog's meat bone next to the cannon."],[961,"UI_Story_064","陛下已经在城堡一层等你了","Your Majesty is already waiting for you on the first floor of the castle."],[962,"UI_Story_065","但是陛下已经在等你了，不要让他久等了，喵~","But His Majesty is already waiting for you, don't keep him waiting, meow!"],[963,"UI_Story_066","唔...看不出有什么值得陛下召见的地方呢喵","Hmm... I don't see anything worthy of His Majesty's summons, meow."],[964,"UI_Story_067","钥匙碎片？喵喵也不知道在哪","The key fragment? Meow Meow doesn't know where it is."],[965,"UI_Story_068","钥匙碎片？在城堡一层大厅就见过","Key fragments? I think I saw some around the castle."],[966,"UI_Levelup_01","等级提升","Level Up"],[967,"UI_Levelup_02","亲爱的果冻们，\n\n细心的你或许已经发现了名字前面出现的<color=#FFB400><size=28>等级徽章</size></color>。\n没错！这就是我们新推出的<color=#FFB400><size=28>等级系统</size></color>！\n\n如果你已经有对局经验了，不用担心！\n我们为老玩家们提供<color=#FFB400><size=28>经验自动转换</size></color>的功能。\n根据以前的对局情况，你将自动获得相应的经验~\n悄悄告诉你，在每次对局中获胜得到的经验更多哦！多多去参加比赛吧！\n\n希望你们喜欢我们的游戏等级系统，找到属于自己的乐趣和成就！\n谢谢大家！","Dear Jellies,\n\nObservant players may have already noticed the <color=#FFB400><size=28>Rank Badge</size></color> appearing before names.\nYes! This is our newly introduced <color=#FFB400><size=28>Ranking System</size></color>!\n\nIf you're experienced in matches, no worries!\nWe've got <color=#FFB400><size=28>Experience Auto-Conversion</size></color> for our seasoned players.\nBased on your past match history, you'll automatically receive corresponding experience~\nSecret tip: Winning in each match gets you more experience! So, join more matches!\n\nWe hope you enjoy our game's ranking system, finding your own fun and achievements!\nThank you all!"],[968,"Level_024","躲避激光","Test to Reflexes"],[969,"Level_025","方块漫游","Cube Roaming"],[970,"Txt_ChatWord_12","谁跟我一块组队？","Who wanna team up with me?"],[971,"Txt_ChatWord_13","可以跟我穿得一样么","Can you dress like me?"],[972,"Txt_ChatWord_14","带我一个","Take me with you!"],[973,"UI_Story_069","小果冻你来啦，在我这里可以创建和删除果冻团称号，使用旁边的果冻团旗帜可以传递你的称号给朋友们，快去和朋友们使用同样的称号吧","Hey there, little jelly! Here with me, you can create and delete jelly squad titles. Use the jelly squad banner next to it to share your title with friends. Go ahead and use the same title with your friends!"],[974,"TIPS_TITLE_DEL","是否删除称号","Delete"],[975,"TIPS_TITLE_COIN_CHECK","用@金币创建？","Created with @ coins?"],[976,"TIPS_TITLE_COIN","金币不够，无法创建","Insufficient coins to create!"],[977,"UI_Story_070","在没有称号的时候不能使用果冻团旗帜哦，来我这里创建或者让已经有称号的果冻传递给你吧","You can't use the jelly squad banner without a title. Come to me to create one or have a jelly with a title pass it to you."],[978,"QUEST_19","进入{0}次活动关卡","Enter the activity stage {0} times."],[979,"QUEST_20","达到{0}等级","Reach Lv{0}."],[980,"QUEST_21","获得{0}次称号","Acquire the title {0} times."],[981,"QUEST_22","打开大厅里的解密宝箱{0}次","Open the Treasure box in the lobby {0} times."],[982,"QUEST_23","钓到{0}条鱼","Catch {0} fish."],[983,"QUEST_24","拾取{0}个海滩物品","Pick up {0} beach items."],[984,"QUEST_25","参与{0}次剧情模式","Participate in {0} story mode."],[985,"QUEST_26","在大厅扔出{0}个水炸弹","Throw {0} water bombs in the lobby."],[986,"QUEST_27","在大厅使用水枪射击{0}次","Shot {0} times with a water gun in the lobby."],[987,"QUEST_28","在大厅挥舞{0}次冰淇淋棒子","Waving an ice cream stick {0} times in the lobby."],[988,"QUEST_29","观战时点赞{0}次","Like {0} times while watching."],[989,"UI_LOBBY_173","规则介绍","Introduction"],[990,"UI_LOBBY_174","密码每天刷新！点击开始游戏，闯关过程中会随机掉落密码~如果你的密码不全，也可以问问别人或者去游戏圈碰碰运气哦！","The password refreshes every day! Tap 'Start Game,' and passwords will drop randomly during the level. If you don't have all the passwords, you can ask others or try your luck in the game community!"],[991,"UI_LOBBY_175","已知密码","Password"],[992,"UI_LOBBY_176","输入","Input"],[993,"UI_LOBBY_177","退出","Exit"],[994,"UI_LOBBY_178","抽奖中，请稍后退出","In a draw, please exit later."],[995,"UI_LOBBY_179","灵光一闪！今天宝箱第{0}位密码是{1}！可在大厅活动页面查看","A flash! Today's {0}th code is {1}! "],[996,"UI_LOBBY_180","今日奖励已获取","Rewards Claimed"],[997,"UI_LOBBY_181","箱子抽奖","Treasure Chest"],[998,"UI_LOBBY_182","密码错误","Password incorrect."],[999,"Obby_017","重新开始","Restart"],[1000,"Level_017","激流勇进","Flume Ride"],[1001,"Title_Chat","对话 ","Dialogue"],[1002,"Title_Npc_Name","熊猫隐士 ","Panda Hermit","是"],[1003,"Title_NPC_CHAT_CONTINIU","点击对话继续","Tap to continue.","是"],[1004,"Title_Create_Btn","创建称号","Create a Title","是"],[1005,"Title_ResOther","是否接受称号","Accept Titles?","是"],[1006,"UI_LOBBY_183","输入密码","Enter Password","是"],[1007,"UI_Story_086","国王叫你来帮忙的吗小果冻，远方的敌人正在慢慢靠近，我们需要搜集一切可以增加我们实力的东西，在城堡外散落着一些远古的秘宝，你可以帮我带回来吗？","Did the king send you, little jellybean? The enemy from afar is slowly closing in, and we need to gather everything that can boost our strength. There are some ancient treasures scattered outside the castle. Could you help me bring them back?","是"],[1008,"UI_Story_087","太好了，你把宝藏都收集到了小果冻，现在面对威胁，我们又有更多的信心了","That's fantastic, little jellybean! You've collected all the treasures. Now, with these, we have even more confidence in facing the threat!","是"],[1009,"UI_Story_088","我的爸爸不喜欢我，我的小熊丢了他一点也不在意，我觉得它会离家出走到森林里去，你能帮我找回来吗？","My dad doesn't seem to like me very much, and he doesn't care that my teddy bear is lost. I think it might have run away to the forest. Can you help me find it?","是"],[1010,"UI_Story_089","太好啦！你帮我找回了我最心爱的小熊，我要把我全部的零花钱都给你，谢谢你小果冻","That's amazing! You helped me find my most beloved teddy bear! I want to give you all my pocket money as a thank you, little jellybean!","是"],[1011,"UI_Story_090","帮助？我只想训练，如果你一定要帮我，那就帮我在城堡里寻找一些趁手的武器给我吧","Help? I just want to train. If you insist on helping me, then help me find some handy weapons in the castle.","是"],[1012,"UI_Story_071","谢谢，有了这些兵器我一定可以更好的锻炼","Thank you, with these weapons, I'm sure I can train even better.","是"],[1013,"UI_Story_072","欸，国王大人叫你来帮助我们吗？小兔的铃铛正好掉了，可以帮小兔去找找吗？","Hey, did the king call you to help us? Bunny just lost my bell. Could you help me look for it?","是"],[1014,"UI_Story_073","谢谢小果冻，你就是全天下最厉害的小果冻","Thank you, little jellybean. You're the most amazing little jellybean in the whole world!","是"],[1015,"UI_Story_074","与瞭望熊猫对话","Talk to Lookout Panda","是"],[1016,"UI_Story_075","与果冻公主对话","Talk to Jelly Princess","是"],[1017,"UI_Story_076","与努力狗狗对话","Talk to Hardworking Pup","是"],[1018,"UI_Story_077","与迎宾小兔对话","Talk to Welcoming Bunny","是"],[1019,"UI_Story_078","在城堡外寻找宝藏","Search for treasure outside the castle.","是"],[1020,"UI_Story_079","在森林里寻找小熊","Search for the teddy bear in the forest.","是"],[1021,"UI_Story_080","在城堡内寻找武器","Find weapons in the castle.","是"],[1022,"UI_Story_081","在城堡内寻找铃铛","Looking for bells in the castle.","是"],[1023,"UI_Story_091","返回果冻岛","Back to Jelly Island","是"],[1024,"UI_Story_082","还没有找到所有的宝藏吗？多去高处看看吧","Haven't found all the treasures yet? Try looking from a higher place.","是"],[1025,"UI_Story_083","没有找到小熊吗？它肯定是去城堡外的森林里了！","Haven't found the teddy bear? It must have gone to the forest outside the castle for sure!","是"],[1026,"UI_Story_084","武器就在城堡周围！仔细找找吧","The weapons are around the castle! Search carefully!","是"],[1027,"UI_Story_085","铃铛好像被风吹到城堡里很高的地方去了","It seems the bell got blown by the wind to a high place inside the castle.","是"],[1028,"SKIN_NAME_2061","绿汉服糖糖","Green Hanfu Candy"],[1029,"SKIN_NAME_2062","紫汉服糖糖","Purple Hanfu Candy"],[1030,"SKIN_NAME_2080","校服糖糖","School uniform Candy"],[1031,"TIPS_TITLE_1","下方填写称号","Fill in the title below"],[1032,"UI_Levelup_03","等级公告","Ranking System Announcement"],[1033,"TITLE_1032","请输入内容","sign your title"],[1034,"TITLE_1033","内容不合规","content non-compliance"],[1035,"TITLE_1034","删除称号","Delete Title"],[1036,"UI_Story_092","果冻国王","Jelly King"],[1037,"UI_Story_093","汪汪队长","Captain Dog"],[1038,"UI_Story_094","喵喵大臣","Meow Minister"],[1039,"UI_Story_095","瞭望熊猫","Panda Explorer"],[1040,"UI_Story_096","迎宾小兔","Welcome Rabbit"],[1041,"UI_Story_097","努力狗狗","Effort Dog"],[1042,"UI_Story_098","狗狗卫兵","Dog Guards"],[1043,"UI_Story_099","果冻公主","Jelly Princess"],[1044,"UI_Watch_01","确定退出对局，回到大厅？","Confirm to exit the game and return to the lobby?"],[1045,"UI_Watch_02","确定退出队伍，回到大厅？","Confirm to exit the team and return to the lobby?"],[1046,"Level_027","时空错乱","Space-time distortion"],[1047,"UI_LOBBY_ActivityLevel3","活到最后","Survive till the end"],[1048,"UI_LOBBY_184","是否开启马桶人跑酷","Do you want to enable Toilet Man Parkour?"],[1049,"UI_LOBBY_185","有队员没有达到五级，需要达到五级才能解锁关卡","Some teammates haven't reached level 5 yet, they need to reach level 5 to unlock the level"],[1050,"UI_LOBBY_186","你需要达到5级就能解锁马桶人跑酷","You need to reach level 5 to unlock Toilet Man Parkour"],[1051,"HUMAN_INTER_NOBODY","当前范围内无可交互玩家","No interactable player in current range"],[1052,"HUMAN_INTER_PASSMSG","向周围玩家发起成功，等待对方接受","Request sent to nearby players successfully, waiting for their acceptance"],[1053,"HUMAN_INTER_LEAVE","撤离","Evacuate"],[1054,"ITEM_NAME_30016","拖人","Drag player"],[1055,"ITEM_NAME_30017","双人转圈","Two-person spin"],[1056,"ITEM_NAME_30018","双人牵手","Hold Hands","是"],[1057,"HUMAN_INTER_TIMER","拒绝(@)","Refuse (@)"],[1058,"HUMAN_INTER_UNABLE","此状态不能进行双人动作","Cannot perform two-person actions in this state"],[1059,"UI_Story_100","帮公主找到短毛猫","Help the princess find the short-haired cat"],[1060,"UI_Story_101","把短毛猫带给公主吧","Bring the short-haired cat to the princess"],[1061,"UI_Story_102","找到天使猫","Find the Angel Cat"],[1062,"UI_Story_103","把天使猫带给公主吧","Bring the Angel Cat to the princess"],[1063,"UI_Story_104","找到宠物蛋","Find the pet egg"],[1064,"UI_Story_105","把宠物蛋带给瞭望熊猫吧","Bring the pet egg to the lookout panda"],[1065,"UI_Story_106","打败天空秃鹫","Defeat the Sky Vulture"],[1066,"UI_Story_107","去找瞭望熊猫领取奖励吧","Go to the lookout panda to collect your reward"],[1067,"UI_Story_108","小黑","Little Black"],[1068,"UI_Story_109","河边发光的是什么?","What's glowing by the river?"],[1069,"UI_Story_110","什么?钥匙?","What? A key?"],[1070,"UI_Story_111","附近的污水池里好像看到过几把,不知道是不是你要找的","I've seen a few in the nearby sewage pond, not sure if it's what you're looking for"],[1071,"UI_Story_112","你好,我是小黑","Hello, I'm Little Black"],[1072,"UI_Story_113","我的小猫走丢了,你能帮我找到吗?","My kitten is missing, can you help me find it?"],[1073,"UI_Story_114","它们有点调皮哦!好像跑到很高的地方去了","They are a bit naughty! It seems they ran to a high place"],[1074,"UI_Story_115","谢谢你,明天还可以继续来帮我吗?","Thank you, can you come and help me tomorrow?"],[1075,"UI_Story_116","我的猫猫需要你的帮忙!","My cat needs your help!"],[1076,"UI_Story_117","什么?公主的短毛猫","What? The princess's short-haired cat?"],[1077,"UI_Story_118","你看看是不是爬的很高那只?","Is it the one that climbs high?"],[1078,"UI_Story_119","总感觉城堡最上面有什么东西!","Always feel there is something at the top of the castle!"],[1079,"UI_Story_120","天上有很多秃鹫对我们城堡造成了威胁！","Many vultures in the sky are threatening our castle!"],[1080,"UI_Story_121","勇敢的果冻，使用大炮把他们除掉吧！","Brave Jelly, use the cannon to eliminate them!"],[1081,"UI_Story_122","太厉害了,明天还可以继续来帮我吗?","Amazing, can you come and help me tomorrow?"],[1082,"UI_Story_123","还有秃鹫在攻击我们！","There are still vultures attacking us!"],[1083,"UI_Story_124","好想我的天使猫呀,它好像在城堡上空乱飞.","I miss my Angel Cat so much. It seems to be flying around above the castle."],[1084,"UI_Story_125","你能帮我找它回来吗?","Can you help me find it and bring it back?"],[1085,"UI_Story_126","谢谢你小果冻,天使猫太调皮啦,不知道它明天还会不会乱跑","Thank you, Jelly. Angel Cat is so naughty, I don't know if it will run away tomorrow"],[1086,"UI_Story_127","天使猫好像在城堡上空乱飞","Angel Cat seems to be flying around above the castle"],[1087,"UI_Story_128","你能帮我去对面大树周围收集10个宠物蛋吗?","Can you help me collect 10 pet eggs around the big tree on the opposite side?"],[1088,"UI_Story_129","谢谢你的帮助小果冻!明天还可以继续来帮我吗?","Thank you for your help, Jelly! Can you come and help me tomorrow?"],[1089,"UI_Story_130","想想怎么才能上去!","Think about how to get up!"],[1090,"UI_Story_131","或许可以利用一下飞行道具","Perhaps you can use some flying props"],[1091,"UI_Story_132","返回旗帜点","Return to the flag point"],[1092,"UI_LOBBY_187","达到{0}级后解锁！ ","Unlock after reaching level {0}!"],[1093,"UI_LOBBY_188","有队员暂未达到{0}级！","Some teammates have not reached level {0} yet!"],[1094,"SKIN_NAME_2063","巧克力汉服","Chocolate Hanfu"],[1095,"SKIN_NAME_2064","牛奶汉服","Milk Hanfu"],[1096,"SKIN_NAME_3011","甜甜天使","Sweet Angel"],[1097,"SKIN_NAME_3012","香香天使","Fragrant Angel"],[1098,"SKIN_NAME_3021","芥末恶魔","Wasabi Demon"],[1099,"SKIN_NAME_3022","冰冰恶魔","Ice Demon"],[1100,"UI_ACTIVITY_1","门已打开","The door is open!"],[1101,"UI_ACTIVITY_2","找到小猫才能通过!","Find the kitten to pass!"],[1102,"UI_ACTIVITY_3","已找到小猫!","Kitten found!"],[1103,"UI_Season_Guid_01","欢迎来到新赛季","Welcome to the new season!"],[1104,"UI_Season_Guid_02","魔法赛季","Magic Season"],[1105,"UI_Season_Guid_03","水上乐园","Water Park"],[1106,"HUMAN_INTER_Guid_01","向你发起了双人动作请求","Sent you a buddy action request!"],[1107,"UI_MAZE_1","我的六只小猫贪玩跑丢了！你可以帮我找找吗?","My six little cats are mischievous and got lost while playing! Can you help me find them?"],[1108,"UI_MAZE_2","沿着前方道路闯关帮我找回所有小猫吧！","Go along the path ahead and help me retrieve all the little cats!"],[1109,"UI_MAZE_3","前面会有越来越多、越来越难的迷宫，小心不要迷路啦！","There will be more and more challenging mazes ahead, be careful not to get lost!"],[1110,"UI_MAZE_4","第一个迷宫很简单，你快去吧！","The first maze is quite simple, go ahead and give it a try!"],[1111,"UI_MAZE_5","呀！你好厉害！但是后边会越来越难的！","Wow! You're really amazing! But it's going to get more and more challenging ahead!"],[1112,"UI_MAZE_6","有一只小猫就是在下一个迷宫里跑丢的！找到它才能走出迷宫！","There's a kitten that got lost in the next maze! Find it to escape the maze!"],[1113,"UI_MAZE_7","辛苦你了！","Thanks!"],[1114,"UI_MAZE_8","你找到我的小猫了吗！","Did you find my kitten?"],[1115,"UI_MAZE_9","你还没有找到我的小猫！再去找找看吧！","you haven't found my kitten yet! Go and search again!"],[1116,"UI_MAZE_10","正确的房间可以帮助你到达下一站，错误的房间会让你原地打转！快试试吧！","The correct room can help you reach the next stop, while the wrong room will make you go in circles! Give it a try!"],[1117,"UI_MAZE_11","记得找到我的小猫才能走出迷宫！","Remember to find my cat before you can exit the maze!"],[1118,"UI_MAZE_12","房间更多了！不要迷路哟","There are more rooms now! Don't get lost!"],[1119,"UI_MAZE_13","又一个迷宫，记得找到我的小猫才能走出迷宫！","Another maze, remember to find my kitten before you can exit the maze!"],[1120,"UI_MAZE_14","最后一个也是最难的迷宫！记得找到我的小猫才能走出迷宫！","The last and the most challenging maze! Remember to find my kitten before you can exit the maze!"],[1121,"UI_MAZE_15","找到小猫并找到出口，才能离开！","Find the kitten and locate the exit to leave!"],[1122,"UI_MAZE_16","谢谢你帮我找到了全部的小猫！可以返回大厅啦！","Thank you for helping me find all the kittens!You can return to the hall!"],[1123,"UI_MAZE_17","谢谢你帮我找到它，你可以去下一关啦","Thank you for helping me find it. You can proceed to the next level now!"],[1124,"UI_MAZE_18","快去下一关吧！","Go to the next level!"],[1125,"UI_MAZE_19","好的","OK"],[1126,"UI_MAZE_20","好的！","OK！"],[1127,"UI_MAZE_21","我不怕！","I'm not afraid!"],[1128,"UI_MAZE_22","我会找到它","I will find it."],[1129,"UI_MAZE_23","离开","Leave"],[1130,"UI_MAZE_24","交给他","Give him."],[1131,"UI_MAZE_25","知道啦","Got it."],[1132,"UI_MAZE_26","不客气！","You're welcome!"],[1133,"UI_MAZE_27","非常乐意","I'm more than happy to help."],[1134,"UI_MAZE_28","上个存档点","Previous Point"],[1135,"UI_MAZE_29","回到大厅","Back to Lobby"],[1136,"UI_MAZE_30","传送入口！迷宫跑跑！","Teleport entrance! Maze run!"],[1137,"Level_021","蛋糕小径","Cake Path"],[1138,"UI_LOBBY_189","恭喜！","Congratulations!"],[1139,"UI_LOBBY_190","恭喜你来到超高跑酷的尽头！你可以获取王冠啦~它会在你头上停留到今晚12点。明天可以再来这里拿到它哦~","Congratulations on reaching the end of the super high-speed run! You can get the crown now! It will stay on your head until 12 o'clock tonight. You can come back here tomorrow to get it again~"],[1140,"UI_LOBBY_ActivityLevel2","迷宫探险","Maze exploration"],[1141,"SKIN_NAME_2090","薄荷法师","Mint Wizard"],[1142,"SKIN_NAME_2091","甜橙法师","Sweet Orange Wizard"],[1143,"SKIN_NAME_3040","奶糖魔女","Milk Candy Witch"],[1144,"SKIN_NAME_3041","树莓魔女","Raspberry Witch"],[1145,"Level_031","魔法光圈","magic circle"],[1146,"Obby_018","确定重开?","Restart Game?"],[1147,"UI_Story_133","没有钥匙","no key"],[1148,"UI_Story_134","获取一把钥匙!","Get a key!"],[1149,"UI_Story_135","钥匙不对","Wrong key"],[1150,"UI_Story_136","已经有钥匙了! 是否要替换?","I already have the key! Do you want to replace?"],[1151,"UI_Story_137","替换了一把钥匙!","Replaced a key!"],[1152,"UI_MAZE_31","猫猫妈妈","Mama Cat"],[1153,"UI_Story_138","输入称号","Enter Title"],[1154,"UI_ACTIVITY3_1","生存次数","Survival Attempts"],[1155,"UI_ACTIVITY3_2","摔下去了","You Fell!"],[1156,"UI_ACTIVITY3_3","{0}秒开始游戏!","Game starts in {0}s!"],[1157,"UI_ACTIVITY3_4","当前局就快结束了!请稍作等待","The current round is almost over! Please wait a moment."],[1158,"UI_ACTIVITY3_5","跳过栏杆","Jump over the railing."],[1159,"UI_ACTIVITY3_6","下一次,你能活更久","Next time, try to survive longer."],[1160,"UI_ACTIVITY3_7","这次竟无人生还","No one survived..."],[1161,"UI_ACTIVITY3_8","开始!","Start!"],[1162,"UI_ACTIVITY3_9","剩余","Remaining:"],[1163,"Level_022","迷幻魔阵","Magic Array"],[1164,"UI_Draw_1","五连抽","Draw ×5"],[1165,"UI_ACTIVITY3_10","坚持{0}秒就胜利了","{0}s to WIN!"],[1166,"Level_032","魔杖飞行","Wand Flight"],[1167,"UI_Draw_Des_1","已拥有的物品已转换为糖果","Owned items have been converted into candies."],[1168,"Level_026","躲避幽灵","Dodge the Ghosts"],[1169,"UI_LAN_280","得分+","Score +"],[1170,"UI_Story2_1","我是果冻群岛的国王，可爱的小果冻，你有什么事吗？","I am the King of Jelly Islands, adorable little jelly. How can I help you?"],[1171,"UI_Story2_2","找本喵有什么事？喵？","Is there anything you want from me? Meow?"],[1172,"UI_Story2_3","我是汪汪队长，保卫城堡平安，有什么事吗汪！","I am Captain Woof, safeguarding the castle's safety. What can I do for you, woof?"],[1173,"UI_Story2_4","为了做出最好吃的料理，兔兔正在潜心研究 ","To create the most delicious dishes, Bunny is dedicated to research."],[1174,"UI_Story2_5","你有什么事情吗？","Can I help you?"],[1175,"UI_Story2_6","果冻群岛是让大家永远快乐开心的地方","Jelly Islands are a place for everlasting joy and happiness."],[1176,"UI_Story2_7","你也参加了果冻跑跑吗？当年我也是果冻跑跑的冠军呢","Did you also participate in Jelly Run? Back in the day, I was the champion of Jelly Run."],[1177,"UI_Story2_8","果冻群岛由八个大岛屿组成，要管理这么多地方，我也有点累","The Jelly Islands are made up of eight large islands. Managing so many places in the Jelly Islands is a bit tiring."],[1178,"UI_Story2_9","我的孩子和子民们以前都在我身边，现在他们都要远离我","My children and subjects used to be by my side. Now they are all away from me."],[1179,"UI_Story2_10","果冻城堡隐藏着很多我也不知道的地方与宝藏","Jelly Castle hides many places and treasures I don't know about."],[1180,"UI_Story2_11","本喵世界第一聪明，汪汪队长世界第一笨，你同意吗喵？","I am the world's smartest cat. Captain Woof is the world's biggest fool. Do you agree, meow?"],[1181,"UI_Story2_12","国王也没有本喵聪明，你同意吗喵？","Even the king is not as smart as me. Do you agree, meow?"],[1182,"UI_Story2_13","汪汪队长太笨了，世界第一笨蛋喵，你同意吗喵","Captain Woof is too foolish, the world's biggest fool, meow. Do you agree?"],[1183,"UI_Story2_14","汪，不要找我闲聊，我要专心保卫城堡的安危","Woof, don't chat with me. I need to focus on guarding the castle."],[1184,"UI_Story2_15","城堡里到底有多少我都不知道的地方呢？汪","How many unknown places are there in the castle? Woof."],[1185,"UI_Story2_16","喵喵大臣老是说我笨，我真的很笨吗？","Minister Meow always says I'm foolish. Am I really that foolish?"],[1186,"UI_Story2_17","看来你还不算笨蛋喵，那本喵就告诉你一个秘密，城堡还有一层地下室","Looks like you're not a fool, meow. Let me tell you a secret: there's an underground floor in the castle."],[1187,"UI_Story2_18","看来你也是个大笨蛋喵","Seems like you're a big fool, meow."],[1188,"UI_Story2_19","知道本喵为什么这么说，因为我知道国王藏起来的房间在哪","Do you know why I say this? Because I know where the king's hidden room is."],[1189,"UI_Story2_20","就在这个房间内，但只有聪明人才知道","Right in this room. But only smart people know."],[1190,"UI_Story2_21","本喵不想和笨蛋说话，喵","I don't want to talk to fools, meow."],[1191,"UI_Story2_22","汪汪队长太笨了，太笨了太笨了喵！","Captain Woof is too foolish, really too foolish, meow!"],[1192,"UI_Story2_23","不许你说汪汪队长笨，只有本喵可以说","You're not allowed to call Captain Woof foolish, only I can say it."],[1193,"UI_Story2_24","汪汪队长就是很笨，本喵最讨厌他了！","Captain Woof is really foolish. I hate him the most, meow!"],[1194,"UI_Story2_25","好吧，看来我就是个笨蛋","Alright, it seems I'm a fool."],[1195,"UI_Story2_26","汪，我就知道她在骗我","Woof, I knew she was lying to me."],[1196,"UI_Story2_27","你知道酸菜鱼有四种做法吗？","Do you know there are four ways to make a poached egg?"],[1197,"UI_Story2_28","我要做出世界上最好吃的料理","I want to make the world's most delicious dishes."],[1198,"UI_Story2_29","好吃的料理可以带给人幸福，你觉得对吗","Delicious dishes can bring happiness. Do you agree?"],[1199,"UI_Story2_30","，","，"],[1200,"UI_Story2_31","很高兴见到你，新的被选召而来的小果冻，我是果冻城堡的国王，我见过你在果冻跑跑里出色的发挥","Nice to meet you, newly summoned jelly. I am the King of Jelly Castle. I saw your outstanding performance in Candy Party."],[1201,"UI_Story2_32","这次叫你过来，是因为果冻世界正在面临困难，我想你可以先去找喵喵大臣询问一下","I called you here because Jelly World is facing difficulties. I believe you can ask Minister Meow for details."],[1202,"UI_Story2_33","你就是最近名气很大的果冻吗喵？看着也没什么特殊的嘛","Are you the famous jelly lately? You don't look particularly special."],[1203,"UI_Story2_34","国王让你来询问我嘛喵，是这样的喵，果冻群岛最近发生了很多怪事，都是因为果冻能量缺失引起的喵","The king asked you to inquire with me, right? Strange things have been happening in the Jelly Islands because of energy deficiency."],[1204,"UI_Story2_35","为了让世界正常运转，所以需要你来收集果冻能量喵，喵喵把能量收集器给你了喵，现在你可以在地图上完成挑战，任务，以及收集到散步的实体能量，都能提升能量进度条噢喵","We need you to collect jelly energy to keep the world running normally. I will give you an Energy Collector. Now, you can complete challenges, tasks and even collect energy on the map to boost the energy progress bar."],[1205,"UI_Story2_36","当你的进度条满了以后就可以去码头，前往下个区域啦喵","When the bar is complete, you can go to the pier to travel to the next area."],[1206,"UI_Story2_37","需要我再重复一遍吗喵？","Do you need me to repeat that?"],[1207,"UI_Story2_38","同意","Agree"],[1208,"UI_Story2_39","反对","Disagree"],[1209,"UI_Story2_40","在哪里呢？","Where is it?"],[1210,"UI_Story2_41","不想知道","I don't want to know that."],[1211,"UI_Story2_42","重复一遍","Can you please repeat that?"],[1212,"UI_Story2_43","听懂了，不需要","I understand."],[1213,"UI_Story2_44","那现在帮喵做一个任务训练一下，在议会大厅中帮喵收集六个猫球，再交给我吧喵","Now, please help me with a task as training. Collect six cat balls in the Parliament Hall, then bring them to me."],[1214,"UI_Story2_45","还没有帮喵喵找到猫球吗？就在这个大厅内哦喵","Haven't found all the cat balls for me yet? They're right here in the hall, meow."],[1215,"UI_Story2_46","这么快就把猫球都找到了？还不错嘛喵，听说笨狗狗也有烦心事，你去问问汪汪队长有没有需要帮忙的吧喵","You found all the cat balls so quickly! Amazing! I heard the dumb dog also has some troubles. Ask Captain Woof if he needs help."],[1216,"UI_Story2_47","去问问汪汪队长吧喵","Go ask Captain Woof, meow."],[1217,"UI_Story2_48","汪汪，喵喵队长叫你来找我完成任务吗？","Woof woof! Did Captain Meow tell you to find me for a task?"],[1218,"UI_Story2_49","正好我已经很饿了，你可以去厨房让兔兔厨师帮我做一碗肉骨头汤吗？","I happen to be very hungry. Can you please go to the kitchen and ask Chef Bunny to make me a bowl of meat bone soup?"],[1219,"UI_Story2_50","没问题","No problem."],[1220,"UI_Story2_51","暂时没空","I'm busy right now."],[1221,"UI_Story2_52","汪，谢谢你，我就在这里等你的好消息，汪！","_x000d_\nWoof, thank you! I'll be here waiting for your good news, woof!"],[1222,"UI_Story2_53","汪呜~好吧~","Woof, alright."],[1223,"UI_Story2_54","还没有找到兔兔厨师吗？厨房就在城堡一楼餐厅的右边","You haven't found Chef Bunny yet? The kitchen is on the right side of the castle's dining room."],[1224,"UI_Story2_55","肉骨头汤吗？没问题","Bone soup? No problem!"],[1225,"UI_Story2_56","但是现在厨房里的肉骨头不够了，你可以去餐厅收集一些肉骨头给我吗？","But there's not enough meat bones in the kitchen right now. Can you go to the restaurant and collect some meat bones for me?"],[1226,"UI_Story2_57","太好了，你把骨头都收集完了，这下我可以给汪汪队长制作肉骨头汤了，稍等一会","Great! You've collected all the bones. Now, I can make meat bone soup for Captain Woof. Just wait a moment."],[1227,"UI_Story2_58","好了，已经做完了，你拿回去给汪汪队长吧！","Done! It's ready. Take it back to Captain Woof!"],[1228,"UI_Story2_59","小果冻，你已经证明了你的实力，我这里有一份困难的任务，除了你以外我不知道谁能完成","Little jelly, you've proven your strength. I have a difficult task for you. Besides you, I don't know who can accomplish it."],[1229,"UI_Story2_60","公主已经失踪了一个月了，你可以帮我把公主找回来吗？这是公主房间的钥匙，你可以去她的房间寻找线索","The princess has been missing for a month. Can you help me find her? Here's the key to her room. You can search for clues there."],[1230,"UI_Story2_61","公主的房间就在二楼的右侧","The princess's room is on the right side of the second floor."],[1231,"UI_Story2_62","什么？公主前往了后花园？可是城堡的后花园里面充满了迷宫，因为太过危险早就被我封锁起来了呀","What? The princess went to the backyard? But the castle's backyard is full of mazes and has been sealed by me for being too dangerous."],[1232,"UI_Story2_63","既然如此，那还是麻烦拜托你前往后花园帮我寻找到公主吧","In that case, please go to the backyard and find the princess for me."],[1233,"UI_Story2_64","汪！谢谢你的肉骨头汤！这下我可以肚子饱饱地守护城堡安全了。","Woof! Thanks for the meat bone soup! Now, I can guard the castle with a full belly."],[1234,"UI_Story2_65","你真是太厉害了汪，肯定只有你可以解决国王的困难了汪，快去找国王聊聊吧汪！","You're really amazing, woof! Only you can solve the king's difficulties. Go talk to the king!"],[1235,"UI_Story2_66","快去找国王聊聊吧！","Go talk to the king!"],[1236,"UI_Story2_67","你可以去外面的餐厅收集一些肉骨头给我吗？","Can you go to the restaurant outside to collect some meat bones for me?"],[1237,"UI_Story2_68","我想你可以先去找喵喵大臣询问一下","I think you should go ask Minister Meow first."],[1238,"UI_Story2_69","已经做完了，你拿回去给汪汪队长吧！","It's done. Take it back to Captain Woof!"],[1239,"UI_Story2_70","拜托你前往后花园帮我寻找到公主吧","Please go to the backyard and find the princess for me."],[1240,"UI_Story2_71","云中城，那是什么地方，母亲是去了那里吗？我觉得我们应该去问问父亲","Cloud City, what is that place? Did Mother go there? I think we should ask Father."],[1241,"UI_Story2_72","可以请你帮忙探索地下室找到线索吗？","Can you help explore the basement for clues?"],[1242,"UI_Story2_73","我觉得我们应该去问问父亲","I think we should ask Father."],[1243,"UI_Story2_74","云中城?","Cloud City?"],[1244,"UI_Story2_75","你们已经发现地下室的秘密了吗？","Have you discovered the secret of the basement?"],[1245,"UI_Story2_76","哎，瞒着公主的原因就是希望你不要去管这件事，可是公主还是偷偷自己找到了","*Sigh* I hide it from the princess because I hope she won't bother with this matter. But the princess found out on her own."],[1246,"UI_Story2_77","云中城是在果冻群岛八大岛屿之后的天空之岛，不是我们可以到达的地方","Cloud City is in the sky after the eight islands of Jelly Islands, a place we can't reach."],[1247,"UI_Story2_78","不过小果冻......如果是你的话，或许是有可能到达的","However, little jelly, if it's you, maybe it's possible."],[1248,"UI_Story2_79","前往下个岛屿的办法就是收集前一个岛屿中的所有果冻能量，搜集八个岛屿的果冻能量就可以打开通往云中城的大门","To go to the next island, you must collect all the jelly energy from the previous island. Collect the jelly energy from all eight islands, and you can open the gate to Cloud City."],[1249,"UI_Story2_80","小果冻，你可以帮帮我吗？","Little jelly, can you help me?"],[1250,"UI_Story2_81","寻找果冻国王","Find Jelly King"],[1251,"UI_Story2_82","与喵喵大臣对话","Talk to Minister Meow"],[1252,"UI_Story2_83","在城堡大厅中寻找猫球","Find cat balls in the castle hall"],[1253,"UI_Story2_84","与汪汪队长对话","Talk to Captain Woof"],[1254,"UI_Story2_85","前往厨房寻找兔兔厨师","Go to the kitchen to find Chef Bunny"],[1255,"UI_Story2_86","在城堡餐厅中寻找肉骨头","Find meat bones in the castle restaurant"],[1256,"UI_Story2_87","将肉骨头汤带给汪汪队长","Bring meat bone soup to Captain Woof"],[1257,"UI_Story2_88","询问国王的烦心事","Ask about the king's troubles"],[1258,"UI_Story2_89","前往城堡二层公主卧室寻找线索","Go to the princess's bedroom for clues"],[1259,"UI_Story2_90","前往城堡后花园寻找公主","Go to the castle backyard to find the princess"],[1260,"UI_Story2_91","探索地下室寻找线索","Explore the basement for clues"],[1261,"UI_Story2_92","向国王询问地下室情况","Ask the king about the basement"],[1262,"UI_Story2_93","对话","Talk"],[1263,"UI_Story2_94","国王的任务","King's Task"],[1264,"UI_Story2_95","寻找猫球","Find Cat Balls"],[1265,"UI_Story2_96","喵喵大臣的任务","Minister Meow's Task"],[1266,"UI_Story2_97","做肉骨头汤","Make Meat Bone Soup"],[1267,"UI_Story2_98","寻找肉骨头","Find Meat Bones"],[1268,"UI_Story2_99","肉骨头汤","Meat Bone Soup"],[1269,"UI_Story2_100","询问烦心事","Ask About Troubles"],[1270,"UI_Story2_101","公主的线索","Princess's Clues"],[1271,"UI_Story2_102","国王的烦恼","King's Worry"],[1272,"UI_Story2_103","关于地下室","About the Basement"],[1273,"UI_Story2_104","云中城","Cloud City?"],[1274,"UI_Story2_105","回去与喵喵大臣对话","Go back and Talk to Minister Meow"],[1275,"UI_Story2_106","将肉骨头交给兔兔厨师","Give the meat bones to Chef Bunny"],[1276,"UI_Story2_107","将线索告知国王","Inform the King about the clues"],[1277,"UI_Story2_108","与公主对话","Talk to the Princess"],[1278,"UI_Story2_109","期待后续更新","Future Updates Coming Soon"],[1279,"UI_Story2_110","3月1日 星期五 母亲消失已经一个月了，每次问父亲，他都遮遮掩掩  5月3日 星期二  在父亲的密室中寻找到关于母亲的书籍，云中城，是什么东西？  7月3日 星期六  忍不住询问父亲关于母亲的事情，父亲没有回答  8月1日 星期一  喵喵大臣告诉我最后一次看见母亲是在后花园里，我决定前往后花园找寻线索","March 1st, Friday - Mother has been missing for a month. Every time I ask Dad, he dodges the question._x000d_\nMay 3rd, Tuesday - Found a book about Mother in Dad's secret room. What is Sky City?_x000d_\nJuly 3rd, Saturday - Couldn't resist asking Dad about Mother, but he didn't answer._x000d_\nAugust 1st, Monday - Minister Meow said the last time he saw Mother was in the backyard. I decided to go there for clues."],[1280,"UI_Story2_111","童真之梦，化作岛屿 \n梦中情绪，化作果冻 \n无序思绪，成为海洋 \n群岛之上，有云中岛 \n凡人之躯，不可前往 ","Innocent dreams turn into islands. \nEmotional dreams become jelly. \nChaotic thoughts become the ocean. \nAbove the islands, there's Cloud City. \nAs mortals, we can not reach."],[1281,"UI_Story2_112","作为国王，一点也不轻松","Being a king is not easy."],[1282,"UI_Story2_113","公主不见了，好担心她","The princess is missing, and I worry about her."],[1283,"UI_Story2_114","笨蛋不要打扰本喵","Don't disturb me, foolish one."],[1284,"UI_Story2_115","汪汪队长，保卫平安，汪","Woof woof, captain, guard the peace, woof."],[1285,"UI_Story2_116","猫球","Cat Ball"],[1286,"UI_Story2_117","肉骨头","Meat Bones"],[1287,"UI_ActivityUpload_01","每天额外经验对局：7次","Extra EXP matches: 7 times"],[1288,"UI_ActivityUpload_02","当天已进行对局：{0}次","Matches played: {0} times"],[1289,"UI_ActivityUpload_03","每天完成对局可以额外获得赛季通行证经验~","Complete matches daily to earn extra season passport EXP！"],[1290,"UI_ActivityUpload_04","魔法赛季经验大放送","Magic Season Experience Extravaganza!"],[1291,"UI_ActivityUpload_05","通行证大放送","Passport Giveaway!"],[1292,"Level_028","冰块翻转","Ice Block Flip"],[1293,"UI_LOBBY_191","版本号","Version"],[1294,"Level_010","水城魔法","Water City Magic"],[1295,"UI_LAN_281","在翻转冰块上生存下去!","Survive on the flipping ice blocks!"],[1296,"UI_SCENE_1","前往","Go"],[1297,"UI_SCENE_2","助力","Boost"],[1298,"UI_SCENE_3","机场","Airport"],[1299,"UI_SCENE_4","荒岛","Desert Island"],[1300,"UI_SCENE_5","新场景","New Scene"],[1301,"UI_SCENE_6","旅游地","Tourist Paradise"],[1302,"UI_SCENE_7","富士山酒店","Mount Fuji Hotel"],[1303,"UI_SCENE_8","敬请期待","Coming Soon"],[1304,"UI_SCENE_9","助力一下，新场景会更快到来","Give it a boost, the new scene will arrive faster!"],[1305,"UI_SCENE_10","助力成功，作者已在紧急制作中","Boost successfully, the author is working harder!"],[1306,"UI_SCENE_11","请前往二楼登机口乘坐飞机到达旅游圣地","Please proceed to the 2F Gate to board the plane to the Tourist Paradise."],[1307,"UI_SCENE_NPC_01","安检员","Security"],[1308,"UI_SCENE_NPC_02","娜娜","Nana"],[1309,"UI_SCENE_NPC_03","琳星","Lindsey"],[1310,"UI_SCENE_NPC_04","工作人员","Staff"],[1311,"UI_SCENE_NPC_05","咖啡店员","Staff"],[1312,"UI_SCENE_NPC_06","光曦","Melo"],[1313,"UI_SCENE_NPC_07","莉莉","Lily"],[1314,"UI_SCENE_NPC_08","阿俊","Louie"],[1315,"UI_SCENE_NPC_09","乘务员","Flight Attendant"],[1316,"UI_SCENE_NPC_10","芒果冰","Mango Ice"],[1317,"UI_SCENE_NPC_11","酒店管家","Hotel Butler"],[1318,"UI_SCENE_TALK_01","行李都是需要经过安检","All luggage must go through security."],[1319,"UI_SCENE_TALK_02","为了您和其他乘客的安全","For your safety and the safety of other passengers."],[1320,"UI_SCENE_TALK_03","请勿携带违禁物品","Please do not carry prohibited items."],[1321,"UI_SCENE_TALK_04","请不要钻进安检传送带","Do not crawl into the security conveyor."],[1322,"UI_SCENE_TALK_05","你好","Hello!"],[1323,"UI_SCENE_TALK_06","请注意携带随身行李","Please be mindful of your carry-on luggage."],[1324,"UI_SCENE_TALK_07","好的，请转身检测这边","Alright, please turn around."],[1325,"UI_SCENE_TALK_08","已经可以了，谢谢配合","You're good to go now, thank you for your cooperation."],[1326,"UI_SCENE_TALK_09","终于可以好好休假了","Finally, I can have a proper vacation."],[1327,"UI_SCENE_TALK_10","这次目的地是富士山","This time, the destination is Mount Fuji!"],[1328,"UI_SCENE_TALK_11","酒店已经提前预定好了","The hotel has been pre-booked."],[1329,"UI_SCENE_TALK_12","行李托运还在办理","My luggage is already checked."],[1330,"UI_SCENE_TALK_13","这次没有超重","Not overweight this time!"],[1331,"UI_SCENE_TALK_14","还好提前半小时到","Thankfully, I arrived half an hour early."],[1332,"UI_SCENE_TALK_15","不然堵车误机了","Otherwise, I could have missed my flight due to traffic."],[1333,"UI_SCENE_TALK_16","希望这次旅行顺利吧","My trip is going to be amazing!"],[1334,"UI_SCENE_TALK_17","到酒店好好泡个澡","I can't wait to take a bath at the hotel."],[1335,"UI_SCENE_TALK_18","请将行李放置在传送带上","Please place your luggage on the conveyor belt."],[1336,"UI_SCENE_TALK_19","超重的话，会收取额外的费用","If your luggage is overweight, you'll be charged an extra fee."],[1337,"UI_SCENE_TALK_20","请稍等一下","Please wait for a moment."],[1338,"UI_SCENE_TALK_21","马上帮您办理好","I will help you with the check-in process."],[1339,"UI_SCENE_TALK_22","本店还在装修中","This store is still under renovation."],[1340,"UI_SCENE_TALK_23","请下次光临","Please visit next time."],[1341,"UI_SCENE_TALK_24","今天天气不错","The weather is so nice!"],[1342,"UI_SCENE_TALK_25","这次我们会去一个小岛上度假","This time we are going on vacation to a small island."],[1343,"UI_SCENE_TALK_26","有帆船，椰子树","There are sailboats and coconut trees."],[1344,"UI_SCENE_TALK_27","很期待这次旅行","I'm really looking forward to this trip."],[1345,"UI_SCENE_TALK_28","我也是这么认为的","I think so."],[1346,"UI_SCENE_TALK_29","今天我这身打扮还可以吧","Is my outfit okay today?"],[1347,"UI_SCENE_TALK_30","帽子可以在小岛上防晒","The hat helps protect me from the sun on the island."],[1348,"UI_SCENE_TALK_31","我想睡会儿","I'd like to take a short nap."],[1349,"UI_SCENE_TALK_32","对面的两个家伙儿太吵了","The two guys across from me are being too noisy."],[1350,"UI_SCENE_TALK_33","请出示您的机票","Please show your ticket."],[1351,"UI_SCENE_TALK_34","感谢配合","Thank you for your cooperation."],[1352,"UI_SCENE_TALK_35","祝您旅途愉快","Have a pleasant journey!"],[1353,"UI_SCENE_TALK_36","我是一个芒果冰","I'm a mango ice cream,"],[1354,"UI_SCENE_TALK_37","我快要融化啦","and I'm almost melting."],[1355,"UI_SCENE_TALK_38","呼呼呼。。","Hoo, hoo, hoo..."],[1356,"UI_SCENE_TALK_39","今天太阳好大","The sun is so bright today."],[1357,"UI_SCENE_TALK_40","欢迎光临","Welcome!"],[1358,"UI_SCENE_TALK_41","我是酒店管家","I'm the hotel butler."],[1359,"UI_SCENE_TALK_42","入住期间有任何问题都可以问我","If you have any questions during your stay, feel free to ask me."],[1360,"UI_SCENE_TALK_43","注意12点之后就不要出门了","Remember not to go out after 12 PM."],[1361,"UI_SCENE_TALK_44","入住愉快","Enjoy your stay!"],[1362,"UI_START_01","活动关卡","Event"],[1363,"UI_START_02","果宝剧院","Story"],[1364,"UI_START_03","果宝训练赛","Practice"],[1365,"UI_START_04","小游戏","Arcade"],[1366,"UI_START_05","果宝环游记","World"],[1367,"UI_START_06","出发","Start"],[1368,"UI_START_07","经典派对","Match"],[1369,"UI_START_08","队长已开局，正在跳转游戏","The team leader has started the game."],[1370,"UI_START_09","小提示：还未解锁该类关卡","Quick Tip: This category is not unlocked yet."],[1371,"UI_START_10","还未解锁该类关卡","Not unlocked yet."],[1372,"SKIN_NAME_3042","樱桃芒果冰","Cherry Mango Ice Cream"],[1373,"SKIN_NAME_3043","冰冰公主","Ice Princess"],[1374,"SKIN_NAME_3044","暖暖莓可","Warm Berrylicious"],[1375,"SKIN_NAME_3045","暖暖雪可","Warm Snowy Delights"],[1376,"ITEM_NAME_30019","双人比心","Double Hearts"],[1377,"ITEM_NAME_60033","红提灯","Red Lantern"],[1378,"ITEM_NAME_60034","蓝提灯","Blue Lantern"],[1379,"Trail_NAME_40022","冰蝴蝶","Ice Butterfly"],[1380,"Trail_NAME_40023","六芒星","Hexagram"],[1381,"Trail_NAME_40024","冰淇淋","Ice Cream"],[1382,"Trail_NAME_40025","白羽毛","White Feathers"],[1383,"Trail_NAME_40026","红羽毛","Red Feathers"],[1384,"UI_Season_Guid_04","冰雪赛季","Snow Season"],[1385,"UI_SCENE_12","请手机截图你想要的照片","Please take a screenshot of the photo you want!"],[1386,"Level_030","冰雪攀登","Ice climbing"],[1387,"UI_Watch_03","退出观战","Exit"],[1388,"UI_Watch_04","送上爱心","Love"],[1389,"UI_Find_01","购买成功","Purchase Successful"],[1390,"UI_Find_02","对应宝石不够，无法购买!","Not enough gems, unable to purchase!"],[1391,"UI_Find_03","物品栏已满","The inventory is full!"],[1392,"UI_Find_04","解锁了!","Unlocked!"],[1393,"UI_Find_05","电梯","Elevator"],[1394,"UI_Find_06","弹力地板","Bouncy Floor"],[1395,"UI_Find_07","还没有达到条件，继续收集吧！","Conditions not met yet, keep collecting!"],[1396,"UI_Find_08","开门:","Open door:"],[1397,"UI_Find_09","缺少{0}","Missing {0}"],[1398,"UI_Find_10","欢迎小果冻来到莱莎大人的魔法商店！！！！","Welcome, little jelly, to Lady Lisa's Magic Shop!!!!!"],[1399,"UI_Find_11","换装成功","Outfit change successful"],[1400,"UI_Find_12","弹簧腿","Springy Legs"],[1401,"UI_Find_13","飞毛腿","Flutter Legs"],[1402,"UI_Find_14","魔法护盾","Magic Shield"],[1403,"UI_Find_15","魔法徽章","Magic Badge"],[1404,"UI_Find_16","树莓魔法少女","Raspberry Magic Girl"],[1405,"UI_Find_17","金色钥匙","Gold Key"],[1406,"UI_Find_18","银色钥匙","Silver Key"],[1407,"UI_Find_19","铜色钥匙","Bronze Key"],[1408,"UI_Find_20","紫色魔法宝石","Purple Magic Gem"],[1409,"UI_Find_21","金币x500","Coins x500"],[1410,"UI_Find_22","金币x10","Coins x10"],[1411,"UI_Find_23","协会后院","Association Backyard"],[1412,"UI_Find_24","一楼大厅","1st-floor Hall"],[1413,"UI_Find_25","二层露台","2nd-floor Terrace"],[1414,"UI_Find_26","中央大街","Central Street"],[1415,"UI_Find_27","东大桥","East Bridge"],[1416,"UI_Find_28","西大桥","West Bridge"],[1417,"UI_Find_29","酒馆露台","Tavern Terrace"],[1418,"UI_Find_30","东侧城墙","East City Wall"],[1419,"UI_Find_31","西侧城墙","West City Wall"],[1420,"UI_Find_32","入口","Entrance"],[1421,"UI_Find_33","东侧区域","East Area"],[1422,"UI_Find_34","西侧区域","West Area"],[1423,"UI_Find_35","东侧","East Side"],[1424,"UI_Find_36","西侧","West Side"],[1425,"UI_Find_37","魔法师协会","Wizard Association"],[1426,"UI_Find_38","魔法城内","Inside Magic City"],[1427,"UI_Find_39","魔法城城墙","Magic City Walls"],[1428,"UI_Find_40","魔法城地下一层","Magic City Basement Level 1"],[1429,"UI_Find_41","魔法城地下二层","Magic City Basement Level 2"],[1430,"UI_Find_42","嗨嗨！你好呀我们又见面了。你走的还真是慢呀 。","Hi there! Hello again. You sure walk slowly. "],[1431,"UI_Find_43","我就是那位德高望重的魔法师啦！快叫我大魔法师莱莎大人 <(￣︶￣)>"," I am the esteemed mage! Call me Lady Lisa <(￣︶￣)>"],[1432,"UI_Find_44","锵锵，顶级魔女闪亮登场<(￣︶￣)>！！！","Ta-da! Top witch in the spotlight <(￣︶￣)>!!!"],[1433,"UI_Find_45","你好呀，外来的小果冻。咦？我是谁，我是魔女莱莎，欢迎你来到魔法世界，我正在用魔法向你传递我的声音。","Hello, outsider jelly. Huh? Who am I? I'm the witch Lisa. Welcome to the magical world. I'm using magic to transmit my voice to you."],[1434,"UI_Find_46","你刚刚是不是通过了一个奇怪的传送门，一转眼，就来到了这里。那就合理了，毕竟最近一段时间，我们魔法世界的能量外泄，许多其他的果冻世界也受到的魔法能量的影响。你就是被魔法能量生成的传送门带过来的。","Did you go through a strange portal and end up here in the blink of an eye? Well, that makes sense. Recently, the magical energy in our world has been leaking, affecting many other jelly worlds with magical energy. You were brought here by a portal generated by magical power."],[1435,"UI_Find_47","不过不用担心，<color=#cyan><size=35>在这个小院子门口</size></color>，有位德高望重的老魔法师，他可以告诉你离开这里的方法。快去找她吧！","But don't worry, at the <color=#cyan><size=35>entrance to this courtyard</size></color>, there's a highly esteemed old mage who can tell you how to leave. Find her!"],[1436,"UI_Find_48","你那是什么态度呀！我可是这个魔法师协会最厉害的魔法师之一。好啦不开玩笑啦，让我先看看你收集了多少魔法宝石。 ","What's with that attitude? I'm one of the most powerful mages in this mage association. Alright, no more joking. Let me see how many magic gems you've collected."],[1437,"UI_Find_49","什么才这么一点，你刚才到底在干什么，我可是专门辛辛苦苦的把这些魔法宝石放到你附近的！ ","What? Just this little? What were you doing earlier? I specifically placed these magic gems around you with great effort!"],[1438,"UI_Find_50","没想到你还挺能干的嘛。嘻嘻，作为大魔法师，你可是少有的可以接受到大魔法师的赞扬的人呢。 ","I didn't expect you to be quite capable. Hehe, as a grand mage, you're one of the few who can receive praise from me, the great mage.      "],[1439,"UI_Find_51","咳咳，接下说正事，我这里有很多好东西，你可以用你收集到的魔法宝石跟我交换哦。","Let's get back to business. I have many good things here; you can exchange them with the magic gems you've collected."],[1440,"UI_Find_52","当然这座魔法之城里，我还放置了很<color=#cyan><size=35>更加贵重的紫色魔法宝石</size></color>，当你获得六个紫色魔法宝石之后，你可以用他们跟我交换魔法师协会的法师徽章。","Indeed, in this magic city, I've placed even <color=#cyan><size=35>more precious purple magic gems</size></color>. When you collect 6 purple magical gems, you can exchange them with me for the Wizard Association's mage badge."],[1441,"UI_Find_53","有了法师徽章，你就可以自由出入魔法城啦！ ","You can freely enter and exit the magic city with the mage badge!"],[1442,"UI_Find_54","魔法宝石其实是一种魔法能量的结晶，越纯净的魔法宝石，紫色会越多越深。 ","Magic gems are crystallized forms of magical energy. The purer the magic gem, the more and deeper the purple color."],[1443,"UI_Find_55","其实我们魔法师平时要靠魔法宝石来增强自己的力量，但是你现在还接触不到魔法宝石里的力量，因为你没有魔法师的法杖。","Usually, we mages rely on magic gems to enhance our power. However, you can't access the energy inside the magical gems yet because you don't have a mage's staff."],[1444,"UI_Find_56","实话告诉你吧，这里其实是我的师傅，超级大大大魔法师拉娜耶大人塑造的梦境世界。","Honestly, this place is a dream world created by my master, the super, super, super mage Lady Lania."],[1445,"UI_Find_57","而你收集宝石，也是对你的一个考验，当你从我这获得那枚魔法徽章的时候，就是通过考验的时候。","Collecting gems is a test for you. When you obtain the mage badge from me, it means you've passed the test."],[1446,"UI_Find_58","那是一种可以将魔法能量具体表现出来的武器。不过现在魔法城里没有多余的法杖，其他法杖也都散落在世界各地。 ","The badge is a weapon that can manifest magical energy. But currently, there are no extra staffs in the Magic City, and other staffs are scattered worldwide."],[1447,"UI_Find_59","是的这里确实是魔法塑造的梦境世界，你还有什么需要的问的吗？","Yes, this is indeed a dream world shaped by magic. Do you have any other questions?"],[1448,"UI_Find_60","没有的话，你看看我这里有没有你需要的东西吧！","If not, check if there's anything you need from me!"],[1449,"UI_Find_61","你好呀，小果冻你还需要什么呀。 （＾ω＾）","Hello, little jelly, what else do you need? （＾ω＾）"],[1450,"UI_Find_62","小果冻加油收集宝石，通过考验吧 (o゜▽゜)o☆","Keep collecting gems and pass the test, little jelly (o゜▽゜)o☆"],[1451,"UI_Find_63","还有其他想知道的吗，都可以来问我莱莎大人 o(^▽^)o","Anything else you want to know, feel free to ask Lady Lisa o(^▽^)o"],[1452,"UI_Find_64","小果冻，认识我伟大的魔女，莱莎大人，是不是一件很棒的事情，哈哈哈哈。̋(๑˃́ꇴ˂̀๑) ","Little jelly, isn't it fantastic to meet me, the great witch Lady Lisa, haha. ̋(๑˃́ꇴ˂̀๑)"],[1453,"UI_Find_65","那个东西其实是你通过考验的证明，有了它你就可以离开这个梦中魔法城了。不过<color=#cyan><size=35>这枚徽章也是现实中魔法师之城的重要出入证明，只有有了它，你才可以自由出入魔法师之城。</size></color>","That thing is proof of passing the test. With it, you can leave this dream magic city. However, <color=#cyan><size=35>this badge is also a critical access pass to the real Mage City. Only with it can you freely enter and exit the Mage City.</size></color>"],[1454,"UI_Find_66","哇哇哇，你可真厉害呀，没想到你能做到这种程度，继续加油吧 ","Wow, you're amazing! I didn't expect you to achieve this level. Keep it up."],[1455,"UI_Find_67","咦，那是藏宝库的钥匙吗？你可以用钥匙打开城内一些<color=#cyan><size=35>锁住的门</size></color>。","Huh, is that the key to the treasure vault? You can use the key to open some <color=#cyan><size=35>locked doors</size></color> in the city."],[1456,"UI_Find_68","不过想要打开越稀有的藏宝库，就需要越稀有的钥匙。比如我这里的金钥匙，想要吗，你可以用魔法宝石来跟我交换。 ","But to open rarer treasure vaults, you need rarer keys. Like my gold key here. Interested? You can exchange magic gems with me for it."],[1457,"UI_Find_69","穿着这身衣服，你就是一名被我认可的魔法师，只要再获得徽章，就可以正式成为一名真正的魔法师啦。 （＾ω＾）","Wearing this outfit, you're recognized as a mage by me. Just get another badge, and you can officially become a real mage. （＾ω＾）"],[1458,"UI_Find_70","这个我不好说，魔法世界的魔法能量因为一些原因，出现了巨大波动，导致很多魔法能量泄露至其他果冻世界。","I can't say for sure. For some reason, there's been a massive fluctuation in magical energy in the magical world, causing magic energy to leak into other jelly worlds."],[1459,"UI_Find_71","所以这也是我的老师——超级大大大魔法师拉娜耶老师设计这次考验的原因。希望我们选拔出来的勇敢的小果冻，也就是你，在未来某一天可以帮助到我们魔法世界。","So, my teacher, the super, super, awesome mage Lady Lania, designed this test. We hope that the brave little jellies selected, which is you, can help our magical world in the future."],[1460,"UI_Find_72","不过别担心，我们也会为你们提供很多很棒的物品作为报酬的。 ","But don't worry; we'll reward you with many fantastic items."],[1461,"UI_Find_73","没想到你真的成功了呢，不愧是我看上的人，获得这枚徽章之后，你就是真正的魔法师啦。(≧▽≦)你现在可以随时离开这个梦中的魔法之城了，真期待我们下次在真正的魔法之城的相遇呢！(O ^ ~ ^ O) ","I didn't expect you to succeed. Well done! After obtaining this badge, you're a true mage now. (≧▽≦) I'm looking forward to our next encounter in the real Mage City! (O ^ ~ ^ O)"],[1462,"UI_Find_74","小果冻再见啦！ o(╥﹏╥)o","Goodbye, little jelly! o(╥﹏╥)o"],[1463,"UI_Find_75","还有其他想知道的吗，都可以来问我莱莎大人 ","If anything else you want to know, feel free to ask Lady Lisa."],[1464,"UI_Find_76","恭喜你已经，通过老师留下的法阵，<color=#cyan><size=35>解锁了超级跳魔法。</size></color>","Congratulations! By using the teacher's left-behind spell, <color=#cyan><size=35>you've unlocked the Super Jump Magic.</size></color>"],[1465,"UI_Find_77","之后这个小城里会出现一些能加强你跳跃能力的魔法阵。<color=#cyan><size=35>是一根蓝色的弹簧呦。</size></color>","Afterward, there will be magic circles in this little town that can enhance your jumping ability. <color=#cyan><size=35>It's a blue spring.</size></color>"],[1466,"UI_Find_78","接触它，你就可以获得<color=#cyan><size=35>跳跃魔法的加持，会跳的更高。不过魔法的效果是有时间限制的，时间一到，魔法就会解除。</size></color>你在使用时一定要小心。","Touch it, and you'll get the <color=#cyan><size=35>blessing of the Jump Magic, allowing you to jump higher</size></color>. However, the magic effect has a time limit. Once the time is up, the magic will be lifted. Be careful when using it."],[1467,"UI_Find_79","哇！你又解锁了一个魔法，这是飞毛腿魔法。（＾ω＾）","Wow! You've unlocked another magic. This is the Flutter Legs magic. （＾ω＾）"],[1468,"UI_Find_80","飞毛腿魔法可以<color=#cyan><size=35>让你跑的很快很快</size></color>，那些<color=#cyan><size=35>带小翅膀的魔法阵就是飞毛腿魔法</size></color>呦。","Flutter Legs magic can make you run <color=#cyan><size=35>very, very fast</size></color>. Those <color=#cyan><size=35>magic circles with little wings are Flutter Legs magic</size></color>."],[1469,"UI_Find_81","这是城墙高塔电梯的魔法开关，你已经启动了魔法电梯，现在你可以前往城墙进行探索啦！","This is the magic switch for the elevator to the tower on the city wall. You've activated the magic elevator and can now explore the city wall!"],[1470,"UI_Find_82","小心！这是老师看守城镇的机关人偶，小心它的火焰，<color=#red><size=35>不要碰到这些火焰</size></color>，不然你会没命的！ヾ(。＞＜)シ","Careful! This is a mechanical puppet guarding the town for the teacher. Be careful of its flames. <color=#red><size=35>Don't touch those flames</size></color>Or you'll be in big trouble! ヾ(。＞＜)シ"],[1471,"UI_Find_83","这些大炮看起来好危险，被打到一定很痛的！","These cannons look dangerous. Getting hit by them must hurt a lot!"],[1472,"UI_Find_84","可是这些大炮为什么会对着城墙发射呢，可能是老师的考验吧！Σ(°△°|||)︴","But why are these cannons firing at the city wall? Maybe it's another test by the teacher! Σ(°△°|||)︴"],[1473,"UI_Find_85","这是魔法护盾的魔法阵，看到那个圆圆的圈了吗？那个就是魔法护盾呦。魔法护盾可以保护你的安全，这样你就可以不用怕那些火焰大炮啦！","This is the magic circle for the Magic Shield. See that circle? That's the Magic Shield. It can protect you, so you don't have to fear those flame cannons!"],[1474,"UI_Find_86","你已经解锁了老师留在成里的魔法大跳板，踩上去可以让你跳的非常非常非常高，不过跳的太高的缺点就是很难控制降落的位置。（╥﹏╥）","You've unlocked the magic springboard. Stepping on it can make you jump very, very, very high. However, the drawback of jumping too high is that controlling your landing position is challenging. （╥﹏╥）"],[1475,"UI_Find_87","看到前方这个发着<color=#cyan><size=35>蓝色光芒的水晶</size></color>了吗？这是被称为记忆水晶的魔法产物。","See that crystal ahead emitting a <color=#cyan><size=35>blue glow</size></color>? It's a magical product called the Memory Crystal."],[1476,"UI_Find_88","触碰水晶，它可以<color=#cyan><size=35>记录并且告诉你当前所在区域</size></color>。你可以利用水晶在不同的区域内来回<color=#cyan><size=35>传送</size></color>。","Touch the crystal, and it can <color=#cyan><size=35>record and tell you the current area</size></color> you're in. You can use the crystal to <color=#cyan><size=35>teleport</size></color> between different areas."],[1477,"UI_Find_89","而且当你不小心死亡时，你也会在<color=#cyan><size=35>最后一次点击的水晶处复活</size></color>的，所以不要担心啦！"," And when you accidentally die, you'll <color=#cyan><size=35>respwan at the last crystal you touched</size></color>So don't worry!"],[1478,"UI_Find_90","怎么是你，老魔法师呢","Why is it you, old mage?"],[1479,"UI_Find_91","…………",".........."],[1480,"UI_Find_92","不到100个","Not yet 100."],[1481,"UI_Find_93","超过100呢","More than 100!"],[1482,"UI_Find_94","我一会儿会找很多的！","I'll find many more later!"],[1483,"UI_Find_95","嘿嘿，我一会还会再找一些的！","I'll be looking for some more later!"],[1484,"UI_Find_96","魔法宝石是什么？","What are magic gems?"],[1485,"UI_Find_97","你为什么需要魔法宝石？","Why do you need magic gems?"],[1486,"UI_Find_98","这里的其他人呢？","Where are the others here?"],[1487,"UI_Find_99","原来是这样","I see."],[1488,"UI_Find_100","魔法师法杖是什么 ","What is a mage's staff?"],[1489,"UI_Find_101","居然是梦境吗","Is it a dream?"],[1490,"UI_Find_102","好吧","OK."],[1491,"UI_Find_103","我看看","Let me take a look."],[1492,"UI_Find_104","不用了","No need."],[1493,"UI_Find_105","我们的世界怎么会出现那么多魔法事物？","Why are so many magical things in our world?"],[1494,"UI_Find_106","确认传送","Confirm"],[1495,"UI_Find_107","购买","Buy"],[1496,"UI_Find_108","莱莎的商店","Lisa's Shop"],[1497,"ITEM_NAME_60035","草莓魔女","Strawberry Witch"],[1498,"UI_Tips_Ski","是否进入滑雪总动员活动关卡？","Do you want to enter the speed skiing event level?"],[1499,"UI_Fire_01","快用鞭炮点燃烟花吧","Use fireworks to light up the sky!"],[1500,"Item_name_11 ","变身","shapeshift"],[1501,"UI_Find_109","<color=#cyan><size=35>适当的时机使用飞扑</size></color>，可以达到跳跃达不到的高处哦！（＾ω＾）","<color=#cyan><size=35>Use Dive at the right moment</size></color> to reach places you can't jump to! (＾ω＾)"],[1502,"UI_Ski_Tips_Enter","传送入口！滑雪总动员！","Teleport entrance! Speed Skiing!"],[1503,"UI_Name_01","经典派对","Classic "],[1504,"UI_Name_02","果宝剧院","Story"],[1505,"UI_Name_03","跑酷世界","Skibidi"],[1506,"UI_Name_04","果冻迷宫","Maze"],[1507,"UI_Name_05","果宝训练赛","Practice"],[1508,"UI_Name_06","果宝大师","Mastery"],[1509,"UI_Name_07","果宝特工队","Arena"],[1510,"UI_Name_08","果宝环游记","World"],[1511,"UI_Name_09","滑雪总动员","Ski"],[1512,"UI_Name_10","决战吧！果冻","Battle"],[1513,"UI_Name_11","快乐闯关！考验身法的时候到啦！","Happy challenge! It's time to test your agility!"],[1514,"UI_Name_12","果宝剧院又开设一个体验馆，这次会有什么新奇游戏呢？","Jelly Theater has opened a new experience hall. What exciting games will be there this time?"],[1515,"UI_Name_13","马桶人主题跑酷，挑战你的极限！","Skibidi-themed Obby, challenge your limits!"],[1516,"UI_Name_14","想来一场迷宫大冒险吗？","Want to embark on a maze adventure?"],[1517,"UI_Name_15","为初入果冻跑跑的小果冻量身定制的训练营，简单易过，很适合练习","Tutorial for newbies in Jelly Run, easy and suitable for practice."],[1518,"UI_Name_16","训练营进阶版，是果冻就来挑战！","Advanced training camp, challenge it if you're a true jelly!"],[1519,"UI_Name_17","适合成为果冻特种兵的果宝们，快来通过成为果宝特种兵吧！","For the jellies aspiring to become special forces, come and become a Special Forces through the challenge!"],[1520,"UI_Name_18","快带上你的果冻搭子，一起来漫游城市吧","Grab your jelly buddy and roam the city together!"],[1521,"UI_Name_19","冬天来了，带着过果冻宝宝来一场冬日滑雪吧~"," Take your jelly friend for a winter skiing adventure!"],[1522,"UI_Name_20","一场幸存者的游戏，击败所有对手，存活到最后吧！","A game of survivors, defeat all enemies, and survive until the end!"],[1523,"UI_Name_21","魔法试炼","Magic Trial"],[1524,"UI_Name_22","全新的魔法试炼关卡，寻找稀有宝石，获得炫酷技能和装扮，快来一场魔法世界的冒险吧！","Brand new magic trial levels, find rare gems, and get excellent skills and outfits. Embark on an adventure in the magical world!"],[1525,"UI_Find_110","魔女莱莎（现在是商人莱莎）","Witch Lisa (now Merchant Lisa)"],[1526,"UI_Find_111","脱离卡死","Reset"],[1527,"UI_Fire_02","丢入位于广场中心的烟花吧","Throw them into the fireworks on the square!"],[1528,"UI_Fire_03","靠近烟花试试呢","Get closer to the fireworks!"],[1529,"UI_Fire_04","传送到神奇的地方看烟花咯","Teleport to a magical place to watch the fireworks! "],[1530,"UI_Chose_01","达到{0}级后解锁！","Unlock at level {0}!"],[1531,"UI_Chose_02","完成上一个练习解锁","Complete the previous task to unlock"],[1532,"UI_Find_112","拉娜耶梦境考验的认可，也是 魔法之城的出入凭证。有了它可以自由出入魔法之城。可是，这个徽章，为什么和紫色魔法宝石那么像","Lania Dreamland Trial's approval is also the pass to Magic City. With it, you can freely enter and exit Magic City. But why does this badge look so similar to the purple magic gem?"],[1533,"UI_Find_113","和莱莎穿着类似的魔法师长袍，代表着莱莎与拉娜耶对考验者的认可。可以帮助穿戴者驾驭魔法能量","Similar to the robes that Lisa is wearing, this represents Lisa and Lania's approval of the challenger. It can help the wearer control magic energy."],[1534,"UI_Find_114","魔法城金色宝库的钥匙，可是金色宝库里有什么？","Magic City's golden treasury key. But what's inside the golden treasury?"],[1535,"UI_Find_115","神奇的银色钥匙，是可以打开宝库大门呢，还是可以打开秘密之地的通道呢，我们不得而知？","Magical silver key. Is it to open the treasury door or the passage to the secret place? We don't know."],[1536,"UI_Find_116","一把普通的铜钥匙","A common copper key."],[1537,"UI_Find_117","有着耀眼紫色光芒的魔法结晶，只有魔法世界的能量出现巨大问题时，才会出现","A dazzling purple magic crystal, only appears when there's a massive problem with the magic world's energy."],[1538,"UI_Find_118","一大把小果冻自己世界的金币","A bunch of small jelly world coins."],[1539,"UI_Find_119","小果冻自己世界的金币","Coins of Jelly World."],[1540,"UI_Find_120","想不通，这东西很便宜啊，我手里有大把呢！老师为什么要把它作为最终通过考验的证明呢？还不如我挑的衣服好看。","Why does the teacher use this cheap thing as proof of passing the test? It's not as good as my clothes."],[1541,"UI_Find_121","这可是身为魔女莱莎大人亲自为你挑选的，快换上试一试","Witch Lisa has selected this for you. Give it a try!"],[1542,"UI_Find_122","哇哇哇，这可是金钥匙哎！呜呜呜~老师，我不想卖给他","Wow, wow, wow, this is a golden key! *Sob* Professor, I don't want to sell it to him!"],[1543,"UI_Find_123","有了它，你就拥有了许多别人没有的宝藏","With it, you have many treasures that others don't have."],[1544,"UI_Find_124","铜钥匙，可以打开某些特殊房间的屋门","Copper key, can open the doors of some special rooms."],[1545,"UI_Find_125","这东西好像紫薯呀，哎呀给自己说饿了","This thing looks like a purple sweet potato. Oops, I'm hungry."],[1546,"UI_Find_126","金灿灿，一大把金灿灿的金币","Golden and shiny, a bunch of golden coins."],[1547,"UI_Find_127","金币可是一个好东西呀，谁会嫌弃金币多呢","Coins are a good thing, who would dislike having too many coins?"],[1548,"Txt_ChatWord_15","我可以背你吗","Can I give you a piggyback ride?"],[1549,"Txt_ChatWord_16","要不要去试试变身","How about trying out the transformation?"],[1550,"Txt_ChatWord_17","一起去看烟花吧","Let's go watch the fireworks together!"],[1551,"UI_LOBBY_192","前往","Go"],[1552,"UI_LOBBY_193","复位","Reset"],[1553,"LV36_TakeGift","快去拾取礼物吧","Go pick up the gifts!"],[1554,"LV36_BackToTree","前往光柱亮起的地方交付礼物","Head to the glowing locations to deliver the gifts."],[1555,"LV36_Utrl_Gift","地图角落出现了5分礼物，快去拾取吧","Gifts have appeared on the map and at the highest point. "],[1556,"UI_LV36_Takeoff","丢弃","Drop"],[1557,"Level_035","冰山滑行","Iceberg Slide"],[1558,"SKIN_NAME_3047","圣诞老人","Santa Claus"],[1559,"UI_LOBBY_194","返回","Back"],[1560,"Level_036","礼物速递","Gift Express"],[1561,"ShuangDan_UI_01","双旦活动","Merry Christmas"],[1562,"ShuangDan_UI_02","每日任务","Daily Quests"],[1563,"ShuangDan_UI_03","成就任务","Achievement"],[1564,"ShuangDan_UI_04","领取物品","Claim All"],[1565,"Level_029","圣诞脉冲","Christmas Pulse"],[1566,"UI_LOBBY_195","每日签到","Daily"],[1567,"Season_Des_13","基础通行证","Passport"],[1568,"SKIN_NAME_3048","龙焰焰","Dragon Flame"],[1569,"SKIN_NAME_3049","龙青青","Dragon Cyan"],[1570,"UI_Season_Guid_05","龙年新春","Dragon New Year"],[1571,"UI_LOBBY_196","本月已签到 <size=28><color=#000000FF>{0}</color></size> 天","Signed in for this month: <size=28><color=#000000FF>{0}</color></size> days"],[1572,"UI_LOBBY_197","签到时间已过，下次早点来吧~","Sign-in time has passed; please come back earlier next time!"],[1573,"UI_LOBBY_199","请在期限内签到并领取奖励","Please sign in and claim your rewards."],[1574,"UI_LV36_Score","积分","Score"],[1575,"UI_LOBBY_198","待解锁","Locked"],[1576,"SKIN_NAME_3050","酷酷王子","Cool Prince"],[1577,"ITEM_NAME_50079","红色法杖","Red Staff"],[1578,"ITEM_NAME_50080","冰霜法杖","Frost Staff"],[1579,"ITEM_NAME_30020","耍赖","Cheat"],[1580,"UI_LAN_282","很抱歉，出现了一点意外情况，得先让你返回果冻岛了。果冻传送魔法发动咯~","There was an unexpected situation. I have to let you return to Jelly Island first. The Jelly Teleportation Magic is activated!"],[1581,"UI_LAN_283","返回大厅","Back"],[1582,"Level_037","新年冲刺","New Year Sprint"],[1583,"UI_LOBBY_200","累计奖励","Total Rewards"],[1584,"UI_LOBBY_201","第7天","Day 7"],[1585,"UI_LOBBY_202","第14天","Day 14"],[1586,"UI_LOBBY_203","第21天","Day 21"],[1587,"UI_LOBBY_204","秒后返回","s to use again"],[1588,"SKIN_NAME_3051","挚爱花嫁","Beloved Bride"],[1589,"UI_Lobby_Card_TryTime","皮肤试穿倒计时{0}:{1}","Countdown to try on skin{0}:{1}"],[1590,"UI_Lobby_Card_NoneSkin","你还没有任何皮肤哦,快去商城购买皮肤!","You don’t have any skins yet, go to the shop to buy skins!"],[1591,"UI_Player_Card","查看名片","View Card"],[1592,"UI_LOBBY_Card","名片","My Card"],[1593,"UI_Lobby_Card_Already","已拥有该皮肤","You already own the skin"],[1594,"UI_Champion_Skip","跳过","Skip"],[1595,"UI_Champion_Best","全场最佳","Best Player"],[1596,"UI_Settle_Award","奖励","Rewards"],[1597,"UI_Settle_back","返回果冻岛","Back"],[1598,"UI_Settle_Try","再接再厉","Try harder"],[1599,"UI_Settle_CountDown","即将返回果冻岛  {0}s","Back in {0}s"],[1600,"UI_Title","称号","Title"],[1601,"UI_Confirm","编辑","Edit"],[1602,"UI_Close","关闭","Close"],[1603,"UI_Card_Skin","皮肤","Skin"],[1604,"UI_Card_Message","留言","Message"],[1605,"UI_Activity_Goto","查看活动",null],[1606,"UI_7Days_Task_Done","已完成",null],[1607,"UI_7DaysActivity_Goto","去完成",null],[1608,"UI_7DaysActivity_Label","新年限定",null],[1609,"UI_Skin_3061","青龙",null],[1610,"UI_7DaysActivity_Progress","红包数：{0}",null],[1611,"UI_7DaysActivity_1","第1天",null],[1612,"UI_7DaysActivity_2","第2天",null],[1613,"UI_7DaysActivity_3","第3天",null],[1614,"UI_7DaysActivity_4","第4天",null],[1615,"UI_7DaysActivity_5","第5天",null],[1616,"UI_7DaysActivity_6","第6天",null],[1617,"UI_7DaysActivity_7","第7天",null],[1618,"UI_Activity_Time","活动还有{0}天结束",null],[1619,"Activity_7Days_Name","寒假集红包",null],[1620,"UI_Activityget","参加活动免费得",null],[1621,"UI_7LockActivity_Task_1","登录1天",null],[1622,"UI_7LockActivity_Task_2","获得10金币",null],[1623,"UI_7LockActivity_Task_3","参加1场比赛",null],[1624,"UI_7LockActivity_Task_4","登录2天",null],[1625,"UI_7LockActivity_Task_5","进行1次抽奖",null],[1626,"UI_7LockActivity_Task_6","参加2场比赛",null],[1627,"UI_7LockActivity_Task_7","进行2次抽奖",null],[1628,"UI_7LockActivity_Task_8","使用1次动作或者表情",null],[1629,"UI_7LockActivity_Task_9","参加3场比赛",null],[1630,"UI_7LockActivity_Task_10","登录3天",null],[1631,"UI_7LockActivity_Task_11","达到3等级",null],[1632,"UI_7LockActivity_Task_12","使用3次动作或者表情",null],[1633,"UI_7LockActivity_Task_13","进行3次抽奖",null],[1634,"UI_7LockActivity_Task_14","更换皮肤2次",null],[1635,"UI_7LockActivity_Task_15","参加4场比赛",null],[1636,"UI_7LockActivity_Task_16","获得70金币",null],[1637,"UI_7LockActivity_Task_17","使用5次动作或者表情",null],[1638,"UI_7LockActivity_Task_18","进行4次抽奖",null],[1639,"UI_7LockActivity_Task_19","更换皮肤3次",null],[1640,"UI_7LockActivity_Task_20","发送2次消息",null],[1641,"UI_7LockActivity_Task_21","参加6场比赛",null],[1642,"Item_name_12","加速鞋",null],[1643,"Item_name_13","地雷",null],[1644,"Item_name_14","木板",null],[1645,"UI_7DaysActivity_Day1","第3天",null],[1646,"UI_7DaysActivity_Day2","第5天",null],[1647,"UI_7DaysActivity_Day3","第7天",null],[1648,"Level_033","极限攀登",null],[1649,"UI_EveDayTurn_01","每日轮换",null],[1650,"UI_EveDayTurn_02","绝版物品",null],[1651,"UI_Level_038_Tips_01","不断向前，逃离年兽",null],[1652,"Level_038","逃离年兽",null],[1653,"UI_SCENE_13","芭比生活",null]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	Name:string
	/**中文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Next Up*/
	get UI_Game_001():ILanguageElement{return this.getElement(1)};
	/**Locked*/
	get UI_LOBBY_001():ILanguageElement{return this.getElement(2)};
	/**Select*/
	get UI_LOBBY_002():ILanguageElement{return this.getElement(3)};
	/**Reward List*/
	get UI_LOBBY_003():ILanguageElement{return this.getElement(4)};
	/**Claim*/
	get UI_LOBBY_007():ILanguageElement{return this.getElement(5)};
	/**Winner's name*/
	get UI_LOBBY_008():ILanguageElement{return this.getElement(6)};
	/**Win the game!*/
	get UI_LOBBY_009():ILanguageElement{return this.getElement(7)};
	/**Accept*/
	get UI_LOBBY_011():ILanguageElement{return this.getElement(8)};
	/**Reject*/
	get UI_LOBBY_010():ILanguageElement{return this.getElement(9)};
	/**Backpack*/
	get UI_LOBBY_012():ILanguageElement{return this.getElement(10)};
	/**Skin*/
	get UI_LOBBY_014():ILanguageElement{return this.getElement(11)};
	/**Action*/
	get UI_LOBBY_016():ILanguageElement{return this.getElement(12)};
	/**Trail*/
	get UI_LOBBY_015():ILanguageElement{return this.getElement(13)};
	/**Round Ends*/
	get UI_Game_002():ILanguageElement{return this.getElement(14)};
	/**Emoji*/
	get UI_LOBBY_017():ILanguageElement{return this.getElement(15)};
	/**Theme*/
	get UI_Game_003():ILanguageElement{return this.getElement(16)};
	/**Passers*/
	get UI_Game_004():ILanguageElement{return this.getElement(17)};
	/**Start*/
	get UI_LOBBY_021():ILanguageElement{return this.getElement(18)};
	/**Shop*/
	get UI_LOBBY_020():ILanguageElement{return this.getElement(19)};
	/**Backpack*/
	get UI_LOBBY_019():ILanguageElement{return this.getElement(20)};
	/**Free*/
	get UI_LOBBY_018():ILanguageElement{return this.getElement(21)};
	/**Draw*/
	get UI_LOBBY_022():ILanguageElement{return this.getElement(22)};
	/**Out!*/
	get UI_Game_005():ILanguageElement{return this.getElement(23)};
	/**Pass!*/
	get UI_Game_006():ILanguageElement{return this.getElement(24)};
	/**Are you sure to return to the lobby?*/
	get UI_Game_007():ILanguageElement{return this.getElement(25)};
	/**Shop*/
	get UI_LOBBY_023():ILanguageElement{return this.getElement(26)};
	/**Legendary*/
	get UI_LOBBY_024():ILanguageElement{return this.getElement(27)};
	/**Rare*/
	get UI_LOBBY_025():ILanguageElement{return this.getElement(28)};
	/**General*/
	get UI_LOBBY_026():ILanguageElement{return this.getElement(29)};
	/**Interaction*/
	get UI_LOBBY_028():ILanguageElement{return this.getElement(30)};
	/**Trail*/
	get UI_LOBBY_029():ILanguageElement{return this.getElement(31)};
	/**Draw*/
	get UI_LOBBY_030():ILanguageElement{return this.getElement(32)};
	/**The Path to Growth*/
	get UI_LOBBY_031():ILanguageElement{return this.getElement(33)};
	/**Spectating*/
	get UI_Game_008():ILanguageElement{return this.getElement(34)};
	/**Slide the joystick to move*/
	get UI_GUIDE_001():ILanguageElement{return this.getElement(35)};
	/**Swipe top right to move the view*/
	get UI_GUIDE_002():ILanguageElement{return this.getElement(36)};
	/**Tap*/
	get UI_GUIDE_003():ILanguageElement{return this.getElement(37)};
	/**Jump*/
	get UI_GUIDE_004():ILanguageElement{return this.getElement(38)};
	/**Double tap*/
	get UI_GUIDE_005():ILanguageElement{return this.getElement(39)};
	/**Dive*/
	get UI_GUIDE_006():ILanguageElement{return this.getElement(40)};
	/**Tap for free Lottery*/
	get UI_LOBBY_033():ILanguageElement{return this.getElement(41)};
	/**Free*/
	get UI_LOBBY_032():ILanguageElement{return this.getElement(42)};
	/**Jackpot Prize*/
	get UI_LOBBY_034():ILanguageElement{return this.getElement(43)};
	/**Already owned*/
	get UI_LOBBY_035():ILanguageElement{return this.getElement(44)};
	/**Emoji*/
	get UI_LOBBY_013():ILanguageElement{return this.getElement(45)};
	/**Score Ranking*/
	get UI_LAN_000():ILanguageElement{return this.getElement(46)};
	/**1*/
	get UI_LAN_001():ILanguageElement{return this.getElement(47)};
	/**Name*/
	get UI_LAN_002():ILanguageElement{return this.getElement(48)};
	/**Score*/
	get UI_LAN_003():ILanguageElement{return this.getElement(49)};
	/**Mr Bad Egg*/
	get UI_LAN_004():ILanguageElement{return this.getElement(50)};
	/**1000*/
	get UI_LAN_005():ILanguageElement{return this.getElement(51)};
	/**Skins*/
	get UI_LAN_006():ILanguageElement{return this.getElement(52)};
	/**Solo*/
	get UI_LAN_007():ILanguageElement{return this.getElement(53)};
	/**Duo*/
	get UI_LAN_008():ILanguageElement{return this.getElement(54)};
	/**Don't fall off*/
	get UI_LAN_009():ILanguageElement{return this.getElement(55)};
	/**emmm*/
	get UI_LAN_010():ILanguageElement{return this.getElement(56)};
	/**Happy*/
	get UI_LAN_011():ILanguageElement{return this.getElement(57)};
	/**Cool Sunglasses*/
	get UI_LAN_012():ILanguageElement{return this.getElement(58)};
	/**Cute*/
	get UI_LAN_013():ILanguageElement{return this.getElement(59)};
	/**Dizzy*/
	get UI_LAN_014():ILanguageElement{return this.getElement(60)};
	/**Star eyes*/
	get UI_LAN_015():ILanguageElement{return this.getElement(61)};
	/**I'm sleepy...*/
	get UI_LAN_016():ILanguageElement{return this.getElement(62)};
	/**Smile*/
	get UI_LAN_017():ILanguageElement{return this.getElement(63)};
	/**Air kiss*/
	get UI_LAN_018():ILanguageElement{return this.getElement(64)};
	/**I'm pissed!*/
	get UI_LAN_019():ILanguageElement{return this.getElement(65)};
	/**Crying*/
	get UI_LAN_020():ILanguageElement{return this.getElement(66)};
	/**Excited*/
	get UI_LAN_021():ILanguageElement{return this.getElement(67)};
	/**I'm angry!*/
	get UI_LAN_022():ILanguageElement{return this.getElement(68)};
	/**[Trail] Colourful bubble*/
	get UI_LAN_023():ILanguageElement{return this.getElement(69)};
	/**[Trail] Coloured ribbon*/
	get UI_LAN_024():ILanguageElement{return this.getElement(70)};
	/**[Trail] Four-pointed star*/
	get UI_LAN_025():ILanguageElement{return this.getElement(71)};
	/**[Trail] Flame*/
	get UI_LAN_026():ILanguageElement{return this.getElement(72)};
	/**[Trail] Money*/
	get UI_LAN_027():ILanguageElement{return this.getElement(73)};
	/**[Trail] Skeleton*/
	get UI_LAN_028():ILanguageElement{return this.getElement(74)};
	/**[Trail] Love*/
	get UI_LAN_029():ILanguageElement{return this.getElement(75)};
	/**[Trail] Banana*/
	get UI_LAN_030():ILanguageElement{return this.getElement(76)};
	/**[Trail] Rainbow*/
	get UI_LAN_031():ILanguageElement{return this.getElement(77)};
	/**[Trail] Candy*/
	get UI_LAN_032():ILanguageElement{return this.getElement(78)};
	/**[Trail] Screw*/
	get UI_LAN_033():ILanguageElement{return this.getElement(79)};
	/**[Trail] Football*/
	get UI_LAN_034():ILanguageElement{return this.getElement(80)};
	/**[Trail] Trophy*/
	get UI_LAN_035():ILanguageElement{return this.getElement(81)};
	/**[Trail] Crown*/
	get UI_LAN_036():ILanguageElement{return this.getElement(82)};
	/**[Trail] Lightning*/
	get UI_LAN_037():ILanguageElement{return this.getElement(83)};
	/**[Trail] Snowflake*/
	get UI_LAN_038():ILanguageElement{return this.getElement(84)};
	/**[Trail] 2023*/
	get UI_LAN_039():ILanguageElement{return this.getElement(85)};
	/**[Trail] Firecracker*/
	get UI_LAN_040():ILanguageElement{return this.getElement(86)};
	/**[Trail] Firework*/
	get UI_LAN_041():ILanguageElement{return this.getElement(87)};
	/**[Trail] Gift Box Trailer*/
	get UI_LAN_042():ILanguageElement{return this.getElement(88)};
	/**Running Trailer*/
	get UI_LAN_043():ILanguageElement{return this.getElement(89)};
	/**Tutorial*/
	get UI_LAN_044():ILanguageElement{return this.getElement(90)};
	/**Draw*/
	get UI_LAN_045():ILanguageElement{return this.getElement(91)};
	/**Next up*/
	get UI_LAN_046():ILanguageElement{return this.getElement(92)};
	/**Reward List*/
	get UI_LAN_047():ILanguageElement{return this.getElement(93)};
	/**Winner's name*/
	get UI_LAN_048():ILanguageElement{return this.getElement(94)};
	/**WIN*/
	get UI_LAN_049():ILanguageElement{return this.getElement(95)};
	/**Accept*/
	get UI_LAN_050():ILanguageElement{return this.getElement(96)};
	/**Reject*/
	get UI_LAN_051():ILanguageElement{return this.getElement(97)};
	/**Exceeding the Gold Coin acquisition limit*/
	get UI_LAN_052():ILanguageElement{return this.getElement(98)};
	/**You have obtained*/
	get UI_LAN_053():ILanguageElement{return this.getElement(99)};
	/**You already got this item, exchange to Candy Coins*/
	get UI_LAN_054():ILanguageElement{return this.getElement(100)};
	/**Refresh*/
	get UI_LAN_055():ILanguageElement{return this.getElement(101)};
	/**Trophy Ranking*/
	get UI_LAN_056():ILanguageElement{return this.getElement(102)};
	/**Do you want to purchase the item?*/
	get UI_LAN_057():ILanguageElement{return this.getElement(103)};
	/**You have already got the item, go to your backpack and check it out!*/
	get UI_LAN_058():ILanguageElement{return this.getElement(104)};
	/**Not enough Gold Coins!*/
	get UI_LAN_059():ILanguageElement{return this.getElement(105)};
	/**Earn points to unlock items*/
	get UI_LAN_060():ILanguageElement{return this.getElement(106)};
	/**You have already collected the item*/
	get UI_LAN_061():ILanguageElement{return this.getElement(107)};
	/**Take Off*/
	get UI_LAN_062():ILanguageElement{return this.getElement(108)};
	/**Put On*/
	get UI_LAN_063():ILanguageElement{return this.getElement(109)};
	/**Locked*/
	get UI_LAN_064():ILanguageElement{return this.getElement(110)};
	/**Exceed the Experience Gain Limit!*/
	get UI_LAN_065():ILanguageElement{return this.getElement(111)};
	/**Exceed the Gold Coins Gain Limit!*/
	get UI_LAN_066():ILanguageElement{return this.getElement(112)};
	/**Lottery in progress!*/
	get UI_LAN_067():ILanguageElement{return this.getElement(113)};
	/**Free Lottery time is not yet available!*/
	get UI_LAN_068():ILanguageElement{return this.getElement(114)};
	/**Are you sure to spend {} Gold Coins on the Lottery?*/
	get UI_LAN_069():ILanguageElement{return this.getElement(115)};
	/**The Lottery is in progress, you cannot return at this time!*/
	get UI_LAN_070():ILanguageElement{return this.getElement(116)};
	/**You have obtained:*/
	get UI_LAN_071():ILanguageElement{return this.getElement(117)};
	/**You already owned this item and have received Gold Coins:*/
	get UI_LAN_072():ILanguageElement{return this.getElement(118)};
	/**Not on the list*/
	get UI_LAN_073():ILanguageElement{return this.getElement(119)};
	/**Earn Points to unlock items!*/
	get UI_LAN_074():ILanguageElement{return this.getElement(120)};
	/**You have already claimed the item!*/
	get UI_LAN_075():ILanguageElement{return this.getElement(121)};
	/**Waiting for players {1}/{2}*/
	get UI_LAN_076():ILanguageElement{return this.getElement(122)};
	/**Please wait patiently... ({})*/
	get UI_LAN_077():ILanguageElement{return this.getElement(123)};
	/**Estimated waiting time: {} seconds*/
	get UI_LAN_078():ILanguageElement{return this.getElement(124)};
	/**Stars Collected :{}*/
	get UI_LAN_079():ILanguageElement{return this.getElement(125)};
	/**Gold Coins :{}*/
	get UI_LAN_080():ILanguageElement{return this.getElement(126)};
	/**Are you sure to return to the lobby?*/
	get UI_LAN_081():ILanguageElement{return this.getElement(127)};
	/**{}/{}*/
	get UI_LAN_082():ILanguageElement{return this.getElement(128)};
	/**{}/{}*/
	get UI_LAN_083():ILanguageElement{return this.getElement(129)};
	/**{}/{}*/
	get UI_LAN_084():ILanguageElement{return this.getElement(130)};
	/**Looks great!*/
	get UI_LAN_085():ILanguageElement{return this.getElement(131)};
	/**Keep going, Candy! Enjoy your Candy Party!*/
	get UI_LAN_086():ILanguageElement{return this.getElement(132)};
	/**When I was a kid, my grandmother told me that in a faraway ocean, there was an island made of cakes and candies, and the smart and well-behaved kids would be picked up by the candies and go to the enviable candy parties ......*/
	get UI_LAN_087():ILanguageElement{return this.getElement(133)};
	/**Why have you been left behind? Come on, join me!*/
	get UI_LAN_088():ILanguageElement{return this.getElement(134)};
	/**Hurry up, we'll miss the train!*/
	get UI_LAN_089():ILanguageElement{return this.getElement(135)};
	/**Bravo, little candy, we're catching up ^0^*/
	get UI_LAN_090():ILanguageElement{return this.getElement(136)};
	/**Where are we going? Why am I in this state?*/
	get UI_LAN_091():ILanguageElement{return this.getElement(137)};
	/**This is the train to Candy Island, and of course everything that goes to Candy Island is candy.*/
	get UI_LAN_092():ILanguageElement{return this.getElement(138)};
	/**Candy Island! Could it be the island full of love and candy from the fairy tale that Grandma told me about? But my holiday is coming to an end and I haven't finished my homework yet!*/
	get UI_LAN_093():ILanguageElement{return this.getElement(139)};
	/**We can't go back now, we have to wait until the Candy Party is over before we can get a train to leave Candy Island. Don't worry, the time between Candy Island and the outside world is different, so the outside time will not change for as long as you play here!*/
	get UI_LAN_094():ILanguageElement{return this.getElement(140)};
	/**Great! So... Can I join the candy party too? I heard that only the smartest kids are allowed...*/
	get UI_LAN_095():ILanguageElement{return this.getElement(141)};
	/**Of course, the fact that you're here is proof that you're the smartest kid in the world, and you can join in any time you want, as long as you're within the confines of Candy Island! I'll teach you!*/
	get UI_LAN_096():ILanguageElement{return this.getElement(142)};
	/**Tap the button in the top right corner to get the party started!*/
	get UI_LAN_097():ILanguageElement{return this.getElement(143)};
	/**Let me show you how to do it this time!*/
	get UI_LAN_098():ILanguageElement{return this.getElement(144)};
	/**I thought you were a newbie, but you're pretty good, maybe you'll get a chance to win the Candy Star title! I'll give you this one and you'll have to work on it later.*/
	get UI_LAN_099():ILanguageElement{return this.getElement(145)};
	/**Tap the button to hook the fish when it swims to the hook!*/
	get UI_LAN_100():ILanguageElement{return this.getElement(146)};
	/**The fish is biting! Tap the button quickly to catch it!*/
	get UI_LAN_101():ILanguageElement{return this.getElement(147)};
	/**Do you want to continue fishing?*/
	get UI_LAN_102():ILanguageElement{return this.getElement(148)};
	/**Yes*/
	get UI_LAN_103():ILanguageElement{return this.getElement(149)};
	/**No*/
	get UI_LAN_104():ILanguageElement{return this.getElement(150)};
	/**M*/
	get UI_LAN_105():ILanguageElement{return this.getElement(151)};
	/**The fish are not hooked!*/
	get UI_LAN_106():ILanguageElement{return this.getElement(152)};
	/**The higher the wind and waves, the more expensive the fish!*/
	get UI_LAN_107():ILanguageElement{return this.getElement(153)};
	/**Bad timing!*/
	get UI_LAN_108():ILanguageElement{return this.getElement(154)};
	/**Gold Coins*/
	get UI_LAN_109():ILanguageElement{return this.getElement(155)};
	/**Close*/
	get UI_LAN_110():ILanguageElement{return this.getElement(156)};
	/**Panda Recluse*/
	get UI_LAN_111():ILanguageElement{return this.getElement(157)};
	/**clothing store owner*/
	get UI_LAN_112():ILanguageElement{return this.getElement(158)};
	/**You can put on your favourite outfit here!*/
	get UI_LAN_113():ILanguageElement{return this.getElement(159)};
	/**Hello! Welcome, would you like to buy something?*/
	get UI_LAN_114():ILanguageElement{return this.getElement(160)};
	/**Newbie Rewards*/
	get UI_LAN_115():ILanguageElement{return this.getElement(161)};
	/**Pass*/
	get UI_LAN_116():ILanguageElement{return this.getElement(162)};
	/**Purchase in Shop*/
	get UI_LAN_117():ILanguageElement{return this.getElement(163)};
	/**Skin*/
	get UI_LAN_118():ILanguageElement{return this.getElement(164)};
	/**Angry*/
	get UI_LAN_119():ILanguageElement{return this.getElement(165)};
	/**Finger heart*/
	get UI_LAN_120():ILanguageElement{return this.getElement(166)};
	/**Cry*/
	get UI_LAN_121():ILanguageElement{return this.getElement(167)};
	/**Backflip*/
	get UI_LAN_122():ILanguageElement{return this.getElement(168)};
	/**Attack*/
	get UI_LAN_123():ILanguageElement{return this.getElement(169)};
	/**Cheer up*/
	get UI_LAN_124():ILanguageElement{return this.getElement(170)};
	/**Wave*/
	get UI_LAN_125():ILanguageElement{return this.getElement(171)};
	/**Cover head*/
	get UI_LAN_126():ILanguageElement{return this.getElement(172)};
	/**Take off*/
	get UI_LAN_127():ILanguageElement{return this.getElement(173)};
	/**Twist*/
	get UI_LAN_128():ILanguageElement{return this.getElement(174)};
	/**Free*/
	get UI_LAN_129():ILanguageElement{return this.getElement(175)};
	/**Still {} Left*/
	get UI_LAN_130():ILanguageElement{return this.getElement(176)};
	/**Wobbling~*/
	get UI_LAN_131():ILanguageElement{return this.getElement(177)};
	/**Jungle Rollers!*/
	get UI_LAN_132():ILanguageElement{return this.getElement(178)};
	/**Spinning and Jumping!*/
	get UI_LAN_133():ILanguageElement{return this.getElement(179)};
	/**Candy Spinning*/
	get UI_LAN_134():ILanguageElement{return this.getElement(180)};
	/**Infinite Curves*/
	get UI_LAN_135():ILanguageElement{return this.getElement(181)};
	/**Turntable Battle*/
	get UI_LAN_136():ILanguageElement{return this.getElement(182)};
	/**Space Travel*/
	get UI_LAN_137():ILanguageElement{return this.getElement(183)};
	/**Way of Brushes*/
	get UI_LAN_138():ILanguageElement{return this.getElement(184)};
	/**Seesaw Challenge*/
	get UI_LAN_139():ILanguageElement{return this.getElement(185)};
	/**Dodge candy shells*/
	get UI_LAN_140():ILanguageElement{return this.getElement(186)};
	/**Fishing success, keep practicing*/
	get UI_FISH_COIN():ILanguageElement{return this.getElement(187)};
	/**Action*/
	get UI_LAN_141():ILanguageElement{return this.getElement(188)};
	/**Yellow Pumpkin Head*/
	get UI_LAN_142():ILanguageElement{return this.getElement(189)};
	/**Red Pumpkin Head*/
	get UI_LAN_143():ILanguageElement{return this.getElement(190)};
	/**Green Pumpkin Head*/
	get UI_LAN_144():ILanguageElement{return this.getElement(191)};
	/**Black Pumpkin Head*/
	get UI_LAN_145():ILanguageElement{return this.getElement(192)};
	/**White Pumpkin Head*/
	get UI_LAN_146():ILanguageElement{return this.getElement(193)};
	/**Pink Zebra*/
	get UI_LAN_147():ILanguageElement{return this.getElement(194)};
	/**Green Zebra*/
	get UI_LAN_148():ILanguageElement{return this.getElement(195)};
	/**Purple Zebra*/
	get UI_LAN_149():ILanguageElement{return this.getElement(196)};
	/**Black Zebra*/
	get UI_LAN_150():ILanguageElement{return this.getElement(197)};
	/**White Zebra*/
	get UI_LAN_151():ILanguageElement{return this.getElement(198)};
	/**Grey Kitten*/
	get UI_LAN_152():ILanguageElement{return this.getElement(199)};
	/**Brown Kitten*/
	get UI_LAN_153():ILanguageElement{return this.getElement(200)};
	/**Yellow Kitten*/
	get UI_LAN_154():ILanguageElement{return this.getElement(201)};
	/**Black Kitten*/
	get UI_LAN_155():ILanguageElement{return this.getElement(202)};
	/**White Kitten*/
	get UI_LAN_156():ILanguageElement{return this.getElement(203)};
	/**Pink Bunny*/
	get UI_LAN_157():ILanguageElement{return this.getElement(204)};
	/**Yellow Bunny*/
	get UI_LAN_158():ILanguageElement{return this.getElement(205)};
	/**Blue Bunny*/
	get UI_LAN_159():ILanguageElement{return this.getElement(206)};
	/**Black Bunny*/
	get UI_LAN_160():ILanguageElement{return this.getElement(207)};
	/**White Bunny*/
	get UI_LAN_161():ILanguageElement{return this.getElement(208)};
	/**Yellow Doggy*/
	get UI_LAN_162():ILanguageElement{return this.getElement(209)};
	/**Green Doggy*/
	get UI_LAN_163():ILanguageElement{return this.getElement(210)};
	/**Violet Doggy*/
	get UI_LAN_164():ILanguageElement{return this.getElement(211)};
	/**Black Doggy*/
	get UI_LAN_165():ILanguageElement{return this.getElement(212)};
	/**White Doggy*/
	get UI_LAN_166():ILanguageElement{return this.getElement(213)};
	/**Mummy*/
	get UI_LAN_167():ILanguageElement{return this.getElement(214)};
	/**Pink Mummy*/
	get UI_LAN_168():ILanguageElement{return this.getElement(215)};
	/**Purple Mummy*/
	get UI_LAN_169():ILanguageElement{return this.getElement(216)};
	/**Black Mummy*/
	get UI_LAN_170():ILanguageElement{return this.getElement(217)};
	/**White Mummy*/
	get UI_LAN_171():ILanguageElement{return this.getElement(218)};
	/**Orange Candy*/
	get UI_LAN_172():ILanguageElement{return this.getElement(219)};
	/**Pink Candy*/
	get UI_LAN_173():ILanguageElement{return this.getElement(220)};
	/**Blue Candy*/
	get UI_LAN_174():ILanguageElement{return this.getElement(221)};
	/**Black Candy*/
	get UI_LAN_175():ILanguageElement{return this.getElement(222)};
	/**White Candy*/
	get UI_LAN_176():ILanguageElement{return this.getElement(223)};
	/**Red Tomato*/
	get UI_LAN_177():ILanguageElement{return this.getElement(224)};
	/**Orange Tomato*/
	get UI_LAN_178():ILanguageElement{return this.getElement(225)};
	/**Blue Tomato*/
	get UI_LAN_179():ILanguageElement{return this.getElement(226)};
	/**Black Tomato*/
	get UI_LAN_180():ILanguageElement{return this.getElement(227)};
	/**White Tomato*/
	get UI_LAN_181():ILanguageElement{return this.getElement(228)};
	/**Mango Ice*/
	get UI_LAN_182():ILanguageElement{return this.getElement(229)};
	/**Chocolate Ice*/
	get UI_LAN_183():ILanguageElement{return this.getElement(230)};
	/**Yellow Baby Chicken*/
	get UI_LAN_184():ILanguageElement{return this.getElement(231)};
	/**Green Baby Chicken*/
	get UI_LAN_185():ILanguageElement{return this.getElement(232)};
	/**Princess Betty*/
	get UI_LAN_186():ILanguageElement{return this.getElement(233)};
	/**Princess Sissy*/
	get UI_LAN_187():ILanguageElement{return this.getElement(234)};
	/**King Donut*/
	get UI_LAN_188():ILanguageElement{return this.getElement(235)};
	/**King Cookie*/
	get UI_LAN_189():ILanguageElement{return this.getElement(236)};
	/**Green Kung Fu Panda*/
	get UI_LAN_190():ILanguageElement{return this.getElement(237)};
	/**Red Kung Fu Panda*/
	get UI_LAN_191():ILanguageElement{return this.getElement(238)};
	/**Guardian Angel*/
	get UI_LAN_192():ILanguageElement{return this.getElement(239)};
	/**Guardian Demon*/
	get UI_LAN_193():ILanguageElement{return this.getElement(240)};
	/**Initial Character*/
	get UI_LAN_194():ILanguageElement{return this.getElement(241)};
	/**Lottery to get*/
	get UI_LAN_195():ILanguageElement{return this.getElement(242)};
	/**Season Pass*/
	get UI_LAN_196():ILanguageElement{return this.getElement(243)};
	/**Let the party begin!*/
	get UI_LAN_197():ILanguageElement{return this.getElement(244)};
	/**Change your Trail!*/
	get UI_LAN_198():ILanguageElement{return this.getElement(245)};
	/**Achievements*/
	get UI_LOBBY_036():ILanguageElement{return this.getElement(246)};
	/**Dressed*/
	get UI_LOBBY_038():ILanguageElement{return this.getElement(247)};
	/**Best Collector*/
	get UI_LOBBY_039():ILanguageElement{return this.getElement(248)};
	/**Candy Contest Sponsor*/
	get UI_LOBBY_040():ILanguageElement{return this.getElement(249)};
	/**You can check out all the Outfits and how to get them here!*/
	get UI_LAN_199():ILanguageElement{return this.getElement(250)};
	/**Starting the game and sticking to the end can help you get more Coins to buy costumes!*/
	get UI_LAN_200():ILanguageElement{return this.getElement(251)};
	/**No one's costume collection can surpass mine!*/
	get UI_LAN_201():ILanguageElement{return this.getElement(252)};
	/**I'm the collector with the most costumes in the Candy Kingdom!*/
	get UI_LAN_202():ILanguageElement{return this.getElement(253)};
	/**Emotes and Actions will be automatically equipped into the field after they are acquired!*/
	get UI_LAN_203():ILanguageElement{return this.getElement(254)};
	/**There are costumes, emotes, actions, and you can even enter a raffle for a rare costume!*/
	get UI_LAN_204():ILanguageElement{return this.getElement(255)};
	/**Would you like to buy something?*/
	get UI_LAN_205():ILanguageElement{return this.getElement(256)};
	/**Have a look even if you won't buy it!*/
	get UI_LAN_206():ILanguageElement{return this.getElement(257)};
	/**If you win an item you already have, you can exchange it for a special currency - Candy!*/
	get UI_LAN_207():ILanguageElement{return this.getElement(258)};
	/**Hey! Have you saved enough coins today mate!*/
	get UI_LAN_208():ILanguageElement{return this.getElement(259)};
	/**What? Don't have enough coins? Go play a game to get more coins!*/
	get UI_LAN_209():ILanguageElement{return this.getElement(260)};
	/**Selected Awards*/
	get UI_LOBBY_041():ILanguageElement{return this.getElement(261)};
	/**Tips*/
	get UI_LAN_210():ILanguageElement{return this.getElement(262)};
	/**Cancel*/
	get UI_LAN_211():ILanguageElement{return this.getElement(263)};
	/**Sure*/
	get UI_LAN_212():ILanguageElement{return this.getElement(264)};
	/**Match Successed ! Transporting...*/
	get UI_LAN_213():ILanguageElement{return this.getElement(265)};
	/**Although it seems like we just had an update recently, it's already 2024 – a new year, a fresh start! In the upcoming year, we have a brand new season, and excitingly, we've introduced monthly check-ins for everyone to collect more in-game items! Let's dive into the details:*/
	get UI_LAN_214():ILanguageElement{return this.getElement(266)};
	/**null*/
	get UI_LAN_215():ILanguageElement{return this.getElement(267)};
	/**I. Level Updates*/
	get UI_LAN_216():ILanguageElement{return this.getElement(268)};
	/** New Year's Sprint – A special level for the New Year celebration*/
	get UI_LAN_217():ILanguageElement{return this.getElement(269)};
	/**null*/
	get UIMain_018():ILanguageElement{return this.getElement(270)};
	/**II. Lobby Updates*/
	get UI_LAN_218():ILanguageElement{return this.getElement(271)};
	/**1. Monthly Check-ins*/
	get UI_LAN_219():ILanguageElement{return this.getElement(272)};
	/** Collect fantastic rewards through daily check-ins!*/
	get UI_LAN_220():ILanguageElement{return this.getElement(273)};
	/**null*/
	get UI_LAN_221():ILanguageElement{return this.getElement(274)};
	/**2. New Season Update*/
	get Txt_ChatWord_1():ILanguageElement{return this.getElement(275)};
	/** Pass Skin: Dragon Flame*/
	get Txt_ChatWord_2():ILanguageElement{return this.getElement(276)};
	/** Pass Skin: Dragon Cyan*/
	get Txt_ChatWord_3():ILanguageElement{return this.getElement(277)};
	/**null*/
	get Txt_ChatWord_4():ILanguageElement{return this.getElement(278)};
	/**刘妍冰（发版糕手）*/
	get Txt_ChatWord_5():ILanguageElement{return this.getElement(279)};
	/**Let's go on the slide together*/
	get Txt_ChatWord_6():ILanguageElement{return this.getElement(280)};
	/**Let's play together*/
	get Txt_ChatWord_7():ILanguageElement{return this.getElement(281)};
	/**Can we be bestie?*/
	get Txt_ChatWord_8():ILanguageElement{return this.getElement(282)};
	/**I want you to play with me*/
	get Txt_ChatWord_9():ILanguageElement{return this.getElement(283)};
	/**Time limit：*/
	get UI_LAN_222():ILanguageElement{return this.getElement(284)};
	/**Shoot！*/
	get UI_LAN_223():ILanguageElement{return this.getElement(285)};
	/**hold longer,kick farther~*/
	get UI_LAN_224():ILanguageElement{return this.getElement(286)};
	/**60 seconds until the score clears*/
	get UI_LAN_225():ILanguageElement{return this.getElement(287)};
	/**OK*/
	get Txt_ChatWord_10():ILanguageElement{return this.getElement(288)};
	/**NO*/
	get Txt_ChatWord_11():ILanguageElement{return this.getElement(289)};
	/**Don't show in a day*/
	get UI_LAN_226():ILanguageElement{return this.getElement(290)};
	/**Teams*/
	get UI_LAN_227():ILanguageElement{return this.getElement(291)};
	/**Player List*/
	get UI_LAN_228():ILanguageElement{return this.getElement(292)};
	/**Accept team invitation*/
	get UI_LAN_229():ILanguageElement{return this.getElement(293)};
	/**Discounted! Sale! Come and see the new skins!*/
	get UI_LAN_230():ILanguageElement{return this.getElement(294)};
	/**Try your luck with the free lottory here!*/
	get UI_LAN_231():ILanguageElement{return this.getElement(295)};
	/**You'll look great in the new skins!*/
	get UI_LAN_232():ILanguageElement{return this.getElement(296)};
	/**I've been shouting for a long time, but I still don't have any customers!*/
	get UI_LAN_233():ILanguageElement{return this.getElement(297)};
	/**Dress up every day and look great!*/
	get UI_LAN_234():ILanguageElement{return this.getElement(298)};
	/**Come and get the same skin as your best friend!*/
	get UI_LAN_235():ILanguageElement{return this.getElement(299)};
	/**Dynamic Cannon*/
	get UI_LAN_236():ILanguageElement{return this.getElement(300)};
	/**Spin and Jump*/
	get UI_LAN_237():ILanguageElement{return this.getElement(301)};
	/**Win {}/{}*/
	get UI_LAN_238():ILanguageElement{return this.getElement(302)};
	/**Qualified {}/{}*/
	get UI_LAN_239():ILanguageElement{return this.getElement(303)};
	/**Out {}/{}*/
	get UI_LAN_240():ILanguageElement{return this.getElement(304)};
	/**Tips:Each game is divided into two rounds, and the player who wins the first round can participate in the Final!*/
	get UI_LAN_241():ILanguageElement{return this.getElement(305)};
	/**You*/
	get UI_LAN_242():ILanguageElement{return this.getElement(306)};
	/**Others*/
	get UI_LAN_243():ILanguageElement{return this.getElement(307)};
	/**Gold x 100*/
	get UI_LAN_244():ILanguageElement{return this.getElement(308)};
	/**Gold x 200*/
	get UI_LAN_245():ILanguageElement{return this.getElement(309)};
	/**Gold x 500*/
	get UI_LAN_246():ILanguageElement{return this.getElement(310)};
	/**[Trail] Colourful bubble*/
	get UI_LAN_247():ILanguageElement{return this.getElement(311)};
	/**[Trail] Coloured ribbon*/
	get UI_LAN_248():ILanguageElement{return this.getElement(312)};
	/**[Trail] Four-pointed star*/
	get UI_LAN_249():ILanguageElement{return this.getElement(313)};
	/**[Trail] Flame*/
	get UI_LAN_250():ILanguageElement{return this.getElement(314)};
	/**[Trail] Money*/
	get UI_LAN_251():ILanguageElement{return this.getElement(315)};
	/**[Trail] Skeleton*/
	get UI_LAN_252():ILanguageElement{return this.getElement(316)};
	/**[Trail] Love*/
	get UI_LAN_253():ILanguageElement{return this.getElement(317)};
	/**[Trail] Banana*/
	get UI_LAN_254():ILanguageElement{return this.getElement(318)};
	/**[Trail] Rainbow*/
	get UI_LAN_255():ILanguageElement{return this.getElement(319)};
	/**[Trail] Candy*/
	get UI_LAN_256():ILanguageElement{return this.getElement(320)};
	/**[Trail] Screw*/
	get UI_LAN_257():ILanguageElement{return this.getElement(321)};
	/**[Trail] Football*/
	get UI_LAN_258():ILanguageElement{return this.getElement(322)};
	/**[Trail] Trophy*/
	get UI_LAN_259():ILanguageElement{return this.getElement(323)};
	/**[Trail] Crown*/
	get UI_LAN_260():ILanguageElement{return this.getElement(324)};
	/**[Trail] Lightning*/
	get UI_LAN_261():ILanguageElement{return this.getElement(325)};
	/**[Trail] Snowflake*/
	get UI_LAN_262():ILanguageElement{return this.getElement(326)};
	/**[Trail] 2023*/
	get UI_LAN_263():ILanguageElement{return this.getElement(327)};
	/**[Trail] Firecracker*/
	get UI_LAN_264():ILanguageElement{return this.getElement(328)};
	/**[Trail] Firework*/
	get UI_LAN_265():ILanguageElement{return this.getElement(329)};
	/**[Trail] Gift Box*/
	get UI_LAN_266():ILanguageElement{return this.getElement(330)};
	/**Ranking of the round*/
	get UI_LAN_267():ILanguageElement{return this.getElement(331)};
	/**Tap the screen to continue*/
	get UI_LAN_268():ILanguageElement{return this.getElement(332)};
	/**Gold*/
	get UI_LAN_269():ILanguageElement{return this.getElement(333)};
	/**Angel*/
	get UI_LAN_270():ILanguageElement{return this.getElement(334)};
	/**The Path to Growth*/
	get UI_LAN_271():ILanguageElement{return this.getElement(335)};
	/**Play the game can earn growth path points*/
	get UI_LAN_272():ILanguageElement{return this.getElement(336)};
	/**Survey*/
	get UI_LAN_273():ILanguageElement{return this.getElement(337)};
	/**Smirk*/
	get ITEM_NAME_20014():ILanguageElement{return this.getElement(338)};
	/**Disdain*/
	get ITEM_NAME_20015():ILanguageElement{return this.getElement(339)};
	/**Think*/
	get ITEM_NAME_20016():ILanguageElement{return this.getElement(340)};
	/**Nostrils*/
	get ITEM_NAME_20017():ILanguageElement{return this.getElement(341)};
	/**Hello*/
	get ITEM_NAME_20018():ILanguageElement{return this.getElement(342)};
	/**Goodbye*/
	get ITEM_NAME_20019():ILanguageElement{return this.getElement(343)};
	/**[Hand] Magic wand*/
	get ITEM_NAME_50001():ILanguageElement{return this.getElement(344)};
	/**[Hand] Scepter*/
	get ITEM_NAME_50002():ILanguageElement{return this.getElement(345)};
	/**[Hand] Book*/
	get ITEM_NAME_50003():ILanguageElement{return this.getElement(346)};
	/**[Hand] Star cup*/
	get ITEM_NAME_50004():ILanguageElement{return this.getElement(347)};
	/**[Hand] Trophy*/
	get ITEM_NAME_50005():ILanguageElement{return this.getElement(348)};
	/**[Hand] Writing brush*/
	get ITEM_NAME_50006():ILanguageElement{return this.getElement(349)};
	/**[Hand] Red pencil*/
	get ITEM_NAME_50007():ILanguageElement{return this.getElement(350)};
	/**[Hand] Ballpoint pen*/
	get ITEM_NAME_50008():ILanguageElement{return this.getElement(351)};
	/**[Hand] Cash*/
	get ITEM_NAME_50009():ILanguageElement{return this.getElement(352)};
	/**[Hand] Duckbill cap*/
	get ITEM_NAME_50010():ILanguageElement{return this.getElement(353)};
	/**[Hand] Screaming chicken*/
	get ITEM_NAME_50011():ILanguageElement{return this.getElement(354)};
	/**[Hand] Panda*/
	get ITEM_NAME_50012():ILanguageElement{return this.getElement(355)};
	/**[Hand] Little rabbit*/
	get ITEM_NAME_50013():ILanguageElement{return this.getElement(356)};
	/**[Hand] Whale*/
	get ITEM_NAME_50014():ILanguageElement{return this.getElement(357)};
	/**[Hand] Daisy*/
	get ITEM_NAME_50015():ILanguageElement{return this.getElement(358)};
	/**[Hand] Blake*/
	get ITEM_NAME_50016():ILanguageElement{return this.getElement(359)};
	/**[Hand] Glow stick*/
	get ITEM_NAME_50017():ILanguageElement{return this.getElement(360)};
	/**[Hand] Candle*/
	get ITEM_NAME_50018():ILanguageElement{return this.getElement(361)};
	/**[Hand] Bouquet*/
	get ITEM_NAME_50019():ILanguageElement{return this.getElement(362)};
	/**[Hand] Star stick*/
	get ITEM_NAME_50020():ILanguageElement{return this.getElement(363)};
	/**[Hand] Magic wand*/
	get ITEM_NAME_50021():ILanguageElement{return this.getElement(364)};
	/**[Hand] Against*/
	get ITEM_NAME_50022():ILanguageElement{return this.getElement(365)};
	/**[Hand] Agree*/
	get ITEM_NAME_50023():ILanguageElement{return this.getElement(366)};
	/**[Hand] Bug net*/
	get ITEM_NAME_50024():ILanguageElement{return this.getElement(367)};
	/**[Hand] Treasure map*/
	get ITEM_NAME_50025():ILanguageElement{return this.getElement(368)};
	/**[Hand] Doll*/
	get ITEM_NAME_50026():ILanguageElement{return this.getElement(369)};
	/**[Hand] Tennis ball*/
	get ITEM_NAME_50027():ILanguageElement{return this.getElement(370)};
	/**[Hand] Firecracker*/
	get ITEM_NAME_50028():ILanguageElement{return this.getElement(371)};
	/**[Hand] Big bone*/
	get ITEM_NAME_50029():ILanguageElement{return this.getElement(372)};
	/**[Hand] Cake*/
	get ITEM_NAME_50030():ILanguageElement{return this.getElement(373)};
	/**[Hand] Cream*/
	get ITEM_NAME_50031():ILanguageElement{return this.getElement(374)};
	/**[Hand] Rubber duck*/
	get ITEM_NAME_50032():ILanguageElement{return this.getElement(375)};
	/**[Hand] Landing duck*/
	get ITEM_NAME_50033():ILanguageElement{return this.getElement(376)};
	/**[Hand] Paper plane*/
	get ITEM_NAME_50034():ILanguageElement{return this.getElement(377)};
	/**[Hand] Football*/
	get ITEM_NAME_50035():ILanguageElement{return this.getElement(378)};
	/**[Hand] Sunny doll*/
	get ITEM_NAME_50036():ILanguageElement{return this.getElement(379)};
	/**[Hand] Top hat*/
	get ITEM_NAME_50037():ILanguageElement{return this.getElement(380)};
	/**[Hand] Pink bag*/
	get ITEM_NAME_50038():ILanguageElement{return this.getElement(381)};
	/**[Hand] Trident*/
	get ITEM_NAME_50039():ILanguageElement{return this.getElement(382)};
	/**[Hand] Purple bag*/
	get ITEM_NAME_50040():ILanguageElement{return this.getElement(383)};
	/**[Hand] Fishing rod*/
	get ITEM_NAME_50041():ILanguageElement{return this.getElement(384)};
	/**[Hand] Colorful hammer*/
	get ITEM_NAME_50042():ILanguageElement{return this.getElement(385)};
	/**[Hand] Frying pan*/
	get ITEM_NAME_50043():ILanguageElement{return this.getElement(386)};
	/**[Hand] Game console*/
	get ITEM_NAME_50044():ILanguageElement{return this.getElement(387)};
	/**[Hand] Game console pro*/
	get ITEM_NAME_50045():ILanguageElement{return this.getElement(388)};
	/**[Hand] Green onion*/
	get ITEM_NAME_50046():ILanguageElement{return this.getElement(389)};
	/**[Hand] Radish*/
	get ITEM_NAME_50047():ILanguageElement{return this.getElement(390)};
	/**[Hand] Fan*/
	get ITEM_NAME_50048():ILanguageElement{return this.getElement(391)};
	/**[Hand] Blue folding fan*/
	get ITEM_NAME_50049():ILanguageElement{return this.getElement(392)};
	/**[Hand] White folding fan*/
	get ITEM_NAME_50050():ILanguageElement{return this.getElement(393)};
	/**[Hand] Coffee cup*/
	get ITEM_NAME_50051():ILanguageElement{return this.getElement(394)};
	/**[Hand] Pizza*/
	get ITEM_NAME_50052():ILanguageElement{return this.getElement(395)};
	/**[Hand] Ice cream*/
	get ITEM_NAME_50053():ILanguageElement{return this.getElement(396)};
	/**[Hand] Lollipop*/
	get ITEM_NAME_50054():ILanguageElement{return this.getElement(397)};
	/**[Hand] Golden key*/
	get ITEM_NAME_50055():ILanguageElement{return this.getElement(398)};
	/**[Hand] Skewers*/
	get ITEM_NAME_50056():ILanguageElement{return this.getElement(399)};
	/**[Hand] Walkie-talkie*/
	get ITEM_NAME_50057():ILanguageElement{return this.getElement(400)};
	/**[Hand] Candy cane*/
	get ITEM_NAME_50058():ILanguageElement{return this.getElement(401)};
	/**[Hand] Small dumbbell*/
	get ITEM_NAME_50059():ILanguageElement{return this.getElement(402)};
	/**[Hand] Dumbbell*/
	get ITEM_NAME_50060():ILanguageElement{return this.getElement(403)};
	/**[Hand] Big dumbbell*/
	get ITEM_NAME_50061():ILanguageElement{return this.getElement(404)};
	/**[Hand] Brush*/
	get ITEM_NAME_50062():ILanguageElement{return this.getElement(405)};
	/**[Hand] Trumpet*/
	get ITEM_NAME_50063():ILanguageElement{return this.getElement(406)};
	/**[Hand] Balloon*/
	get ITEM_NAME_50064():ILanguageElement{return this.getElement(407)};
	/**[Hand] Tennis racket*/
	get ITEM_NAME_50065():ILanguageElement{return this.getElement(408)};
	/**[Hand] Bell drum*/
	get ITEM_NAME_50066():ILanguageElement{return this.getElement(409)};
	/**[Hand] Matcha*/
	get ITEM_NAME_50067():ILanguageElement{return this.getElement(410)};
	/**[Hand] Strawberry*/
	get ITEM_NAME_50068():ILanguageElement{return this.getElement(411)};
	/**[Hand] Blueberry*/
	get ITEM_NAME_50069():ILanguageElement{return this.getElement(412)};
	/**[Hand] Wand*/
	get ITEM_NAME_50070():ILanguageElement{return this.getElement(413)};
	/**[Hand] Baseball bat*/
	get ITEM_NAME_50071():ILanguageElement{return this.getElement(414)};
	/**[Back] Crimson wing*/
	get ITEM_NAME_60001():ILanguageElement{return this.getElement(415)};
	/**[Back] Black wing*/
	get ITEM_NAME_60002():ILanguageElement{return this.getElement(416)};
	/**[Back] Sky lock*/
	get ITEM_NAME_60003():ILanguageElement{return this.getElement(417)};
	/**[Back] Bow tie*/
	get ITEM_NAME_60004():ILanguageElement{return this.getElement(418)};
	/**[Back] Green ribbon*/
	get ITEM_NAME_60005():ILanguageElement{return this.getElement(419)};
	/**[Back] Brown ribbon*/
	get ITEM_NAME_60006():ILanguageElement{return this.getElement(420)};
	/**[Back] Backpack*/
	get ITEM_NAME_60007():ILanguageElement{return this.getElement(421)};
	/**[Back] Ghost*/
	get ITEM_NAME_60008():ILanguageElement{return this.getElement(422)};
	/**[Back] Phantom*/
	get ITEM_NAME_60009():ILanguageElement{return this.getElement(423)};
	/**[Back] Little bear*/
	get ITEM_NAME_60010():ILanguageElement{return this.getElement(424)};
	/**[Back] Ghost fire*/
	get ITEM_NAME_60011():ILanguageElement{return this.getElement(425)};
	/**[Back] Butterfly*/
	get ITEM_NAME_60012():ILanguageElement{return this.getElement(426)};
	/**[Back] Guitar*/
	get ITEM_NAME_60013():ILanguageElement{return this.getElement(427)};
	/**[Back] Chocolate guitar*/
	get ITEM_NAME_60014():ILanguageElement{return this.getElement(428)};
	/**[Back] Saxophone*/
	get ITEM_NAME_60015():ILanguageElement{return this.getElement(429)};
	/**[Back] Panda*/
	get ITEM_NAME_60016():ILanguageElement{return this.getElement(430)};
	/**[Back] Mascot*/
	get ITEM_NAME_60017():ILanguageElement{return this.getElement(431)};
	/**[Back] Big donut*/
	get ITEM_NAME_60018():ILanguageElement{return this.getElement(432)};
	/**[Back] Big pizza*/
	get ITEM_NAME_60019():ILanguageElement{return this.getElement(433)};
	/**[Back] Big ice cream*/
	get ITEM_NAME_60020():ILanguageElement{return this.getElement(434)};
	/**[Back] BBQ skewers*/
	get ITEM_NAME_60021():ILanguageElement{return this.getElement(435)};
	/**[Back] Big gingerbread*/
	get ITEM_NAME_60022():ILanguageElement{return this.getElement(436)};
	/**[Back] Big fried egg*/
	get ITEM_NAME_60023():ILanguageElement{return this.getElement(437)};
	/**[Back] Big white rabbit*/
	get ITEM_NAME_60024():ILanguageElement{return this.getElement(438)};
	/**[Back] Cat pad*/
	get ITEM_NAME_60025():ILanguageElement{return this.getElement(439)};
	/**[Back] Gray cat pad*/
	get ITEM_NAME_60026():ILanguageElement{return this.getElement(440)};
	/**[Back] Big mouse*/
	get ITEM_NAME_60027():ILanguageElement{return this.getElement(441)};
	/**[Back] Sugar bunny*/
	get ITEM_NAME_60028():ILanguageElement{return this.getElement(442)};
	/**[Back] Shy ghost*/
	get ITEM_NAME_60029():ILanguageElement{return this.getElement(443)};
	/**[Back] Shiba Inu Angel*/
	get ITEM_NAME_60030():ILanguageElement{return this.getElement(444)};
	/**[Back] Cat ghost*/
	get ITEM_NAME_60031():ILanguageElement{return this.getElement(445)};
	/**[Back] Carrot*/
	get ITEM_NAME_60032():ILanguageElement{return this.getElement(446)};
	/**Dash Dash！*/
	get UI_LAN_274():ILanguageElement{return this.getElement(447)};
	/**Quests*/
	get UI_LOBBY_042():ILanguageElement{return this.getElement(448)};
	/**Daily Quests*/
	get UI_LOBBY_043():ILanguageElement{return this.getElement(449)};
	/**Daily active point*/
	get UI_LOBBY_044():ILanguageElement{return this.getElement(450)};
	/**Weekly active point*/
	get UI_LOBBY_045():ILanguageElement{return this.getElement(451)};
	/**Claim All*/
	get UI_LOBBY_046():ILanguageElement{return this.getElement(452)};
	/**Claim*/
	get UI_LOBBY_047():ILanguageElement{return this.getElement(453)};
	/**Ongoing*/
	get UI_LOBBY_048():ILanguageElement{return this.getElement(454)};
	/**Done*/
	get UI_LOBBY_049():ILanguageElement{return this.getElement(455)};
	/**Login the game*/
	get QUEST_1():ILanguageElement{return this.getElement(456)};
	/**Play {0} games*/
	get QUEST_2():ILanguageElement{return this.getElement(457)};
	/**Dive {0} times in lobby*/
	get QUEST_3():ILanguageElement{return this.getElement(458)};
	/**Win {0} times*/
	get QUEST_4():ILanguageElement{return this.getElement(459)};
	/**Draw {0} times*/
	get QUEST_5():ILanguageElement{return this.getElement(460)};
	/**Use Emoji/Action {0} times*/
	get QUEST_6():ILanguageElement{return this.getElement(461)};
	/**Change Skin {0} times*/
	get QUEST_7():ILanguageElement{return this.getElement(462)};
	/**Pass {0} times*/
	get QUEST_8():ILanguageElement{return this.getElement(463)};
	/**Use Action {0} times*/
	get QUEST_9():ILanguageElement{return this.getElement(464)};
	/**Use Emoji {0} times*/
	get QUEST_10():ILanguageElement{return this.getElement(465)};
	/**Send message {0} times */
	get QUEST_11():ILanguageElement{return this.getElement(466)};
	/**Dear candies*/
	get QUESTION_FIRST_1():ILanguageElement{return this.getElement(467)};
	/**Please help us to complete this survey and get rewards!*/
	get QUESTION_FIRST_2():ILanguageElement{return this.getElement(468)};
	/**[Multiple Choice] What are you not happy with about the levels in Candy Party? (You can swipe the screen to see more options)*/
	get QUESTION_ASK_1():ILanguageElement{return this.getElement(469)};
	/**[Multiple Choice] What are you not satisfied with in Candy Party?*/
	get QUESTION_ASK_2():ILanguageElement{return this.getElement(470)};
	/**[Multiple Choice] What kind of levels would you like to see in Candy Party in the future? (You can slide the screen to see more options)*/
	get QUESTION_ASK_3():ILanguageElement{return this.getElement(471)};
	/**[Multiple Choice] Which levels of Candy Party do you think are the most fun? (You can swipe the screen to see more options)*/
	get QUESTION_ASK_4():ILanguageElement{return this.getElement(472)};
	/**[Multiple Choice] Why are these levels fun? (You can swipe the screen to see more options)*/
	get QUESTION_ASK_5():ILanguageElement{return this.getElement(473)};
	/**None | Too long to spectate, it's boring | Low number of levels | Level scenes look unattractive | Levels are too easy and lack challenge | Some levels are too difficult | Poor play experience | Levels are repetitive and lack freshness | Too many experts, can't catch up | Levels are not fun | Other*/
	get QUESTION_CHOOSE_1():ILanguageElement{return this.getElement(474)};
	/**None|Long waiting times for matches|Long loading times|Lagging network and laggy gameplay|Other*/
	get QUESTION_CHOOSE_2():ILanguageElement{return this.getElement(475)};
	/**None|More props to use in levels|Longer levels|More people in levels|More variety in levels|Interaction in levels|Other*/
	get QUESTION_CHOOSE_3():ILanguageElement{return this.getElement(476)};
	/**Wobbling | Jungle Rollers| Space Travel|Infinite Curves|Don't fall off|The Way of Brushes|Turntable Battle|Dynamic cannon|Spinning and Jumping!|Candy Spinning|None of them*/
	get QUESTION_CHOOSE_4():ILanguageElement{return this.getElement(477)};
	/**None|Playful|Simple|Can win|Challenging|Exciting|Other*/
	get QUESTION_CHOOSE_5():ILanguageElement{return this.getElement(478)};
	/**Next page*/
	get QUESTION_BUTTON_1():ILanguageElement{return this.getElement(479)};
	/**Confirm*/
	get QUESTION_BUTTON_2():ILanguageElement{return this.getElement(480)};
	/**Did you wake me up? Are you Eggy's daddy or mummy?*/
	get UI_LOBBY_050():ILanguageElement{return this.getElement(481)};
	/**Boss, the thing in your hand looks so dangerous, Eggy should stay away.*/
	get UI_LOBBY_051():ILanguageElement{return this.getElement(482)};
	/**Boss, I want to play too! Eggy also wants to sit on the seesaw!*/
	get UI_LOBBY_052():ILanguageElement{return this.getElement(483)};
	/**Wow, the seesaw is so fun! Eggy wants to play when Eggy grows up!*/
	get UI_LOBBY_053():ILanguageElement{return this.getElement(484)};
	/***Sobbing* Eggy can't sit on the seesaw.*/
	get UI_LOBBY_054():ILanguageElement{return this.getElement(485)};
	/**Wow! Boss, you are flying!*/
	get UI_LOBBY_055():ILanguageElement{return this.getElement(486)};
	/**Boss, don't fly too high, Eggy can't keep up!*/
	get UI_LOBBY_056():ILanguageElement{return this.getElement(487)};
	/**Goal! What a great shot!*/
	get UI_LOBBY_057():ILanguageElement{return this.getElement(488)};
	/**What a shot! So cool!*/
	get UI_LOBBY_058():ILanguageElement{return this.getElement(489)};
	/**Boss is great! Boss is awesome! Boss is the best!*/
	get UI_LOBBY_059():ILanguageElement{return this.getElement(490)};
	/**Wow! What a big fish! Boss, you're amazing!*/
	get UI_LOBBY_060():ILanguageElement{return this.getElement(491)};
	/**Be patient when fishing, shhh, the fish are about to get hooked!*/
	get UI_LOBBY_061():ILanguageElement{return this.getElement(492)};
	/**Boss, do you know what's on the other side of the sea?*/
	get UI_LOBBY_062():ILanguageElement{return this.getElement(493)};
	/**Boss, Eggy is about to come out! Remember to visit me tomorrow!*/
	get UI_LOBBY_063():ILanguageElement{return this.getElement(494)};
	/**My stomach is full, my mood is good! *Gurgling**/
	get UI_LOBBY_064():ILanguageElement{return this.getElement(495)};
	/**Shake it! I'm the coolest egg!*/
	get UI_LOBBY_065():ILanguageElement{return this.getElement(496)};
	/**Boss, why do people always call me egg boy? I don't like being called egg boy.*/
	get UI_LOBBY_066():ILanguageElement{return this.getElement(497)};
	/**There is a candy egg in the candy world, isn't it reasonable?*/
	get UI_LOBBY_067():ILanguageElement{return this.getElement(498)};
	/**What will Eggy look like tomorrow? I'm looking forward to it!*/
	get UI_LOBBY_068():ILanguageElement{return this.getElement(499)};
	/**Eggy is going out tomorrow! I'm so happy!*/
	get UI_LOBBY_069():ILanguageElement{return this.getElement(500)};
	/**Boss, will you come to see Eggy tomorrow?*/
	get UI_LOBBY_070():ILanguageElement{return this.getElement(501)};
	/**I want to be born quickly, I want to grow up quickly...*/
	get UI_LOBBY_071():ILanguageElement{return this.getElement(502)};
	/**Eggy will give you a surprise tomorrow, remember to come to find Eggy.*/
	get UI_LOBBY_072():ILanguageElement{return this.getElement(503)};
	/**Eggy really likes staying with you.*/
	get UI_LOBBY_073():ILanguageElement{return this.getElement(504)};
	/**Let's go take the train, boss!*/
	get UI_LOBBY_074():ILanguageElement{return this.getElement(505)};
	/**Eggy also wants to fly! Maybe Eggy will become a dinosaur tomorrow!*/
	get UI_LOBBY_075():ILanguageElement{return this.getElement(506)};
	/**Can you win the competition held by Candy Island, boss?*/
	get UI_LOBBY_076():ILanguageElement{return this.getElement(507)};
	/**There are so many Candies here! But Eggy won't confuse the boss!*/
	get UI_LOBBY_077():ILanguageElement{return this.getElement(508)};
	/**Eggy loves you!*/
	get UI_LOBBY_078():ILanguageElement{return this.getElement(509)};
	/**Boss, you must come to find Eggy tomorrow!*/
	get UI_LOBBY_079():ILanguageElement{return this.getElement(510)};
	/**Eggy will miss you when you're away, boss...*/
	get UI_LOBBY_080():ILanguageElement{return this.getElement(511)};
	/***Snoring* I want to sleep... *Purring* I want to sleep...*/
	get UI_LOBBY_081():ILanguageElement{return this.getElement(512)};
	/**Let's get on the plane, boss! Eggy wants to fly too!*/
	get UI_LOBBY_082():ILanguageElement{return this.getElement(513)};
	/**Bouncing, and bouncing with my boss!*/
	get UI_LOBBY_083():ILanguageElement{return this.getElement(514)};
	/**Boss! Eggy is about to come out!*/
	get UI_LOBBY_084():ILanguageElement{return this.getElement(515)};
	/**Why is the countdown so slow? I can't wait any longer!*/
	get UI_LOBBY_085():ILanguageElement{return this.getElement(516)};
	/**See you tomorrow! Boss!*/
	get UI_LOBBY_086():ILanguageElement{return this.getElement(517)};
	/**Boss, are you going to stop coming to find Eggy tomorrow?*/
	get UI_LOBBY_087():ILanguageElement{return this.getElement(518)};
	/**Eggy wants to party with you too!*/
	get UI_LOBBY_088():ILanguageElement{return this.getElement(519)};
	/**I'm so tired...*/
	get UI_LOBBY_089():ILanguageElement{return this.getElement(520)};
	/**Eggs, duck eggs, dinosaur eggs... what kind of egg would Eggy be? We'll know tomorrow!*/
	get UI_LOBBY_090():ILanguageElement{return this.getElement(521)};
	/**Boss, I will be born tomorrow! Remember to come to Eggy!*/
	get UI_LOBBY_091():ILanguageElement{return this.getElement(522)};
	/**Boss, let's go fishing at the beach!*/
	get UI_LOBBY_092():ILanguageElement{return this.getElement(523)};
	/**Boss, can you jump on a cloud?*/
	get UI_LOBBY_093():ILanguageElement{return this.getElement(524)};
	/**Eggy like you!*/
	get UI_LOBBY_094():ILanguageElement{return this.getElement(525)};
	/**I heard that you can fish by the beach.*/
	get UI_LOBBY_095():ILanguageElement{return this.getElement(526)};
	/**You can get on the train at the back of the train station.*/
	get UI_LOBBY_096():ILanguageElement{return this.getElement(527)};
	/**Does the little plane fly higher or the little wing fly higher?*/
	get UI_LOBBY_097():ILanguageElement{return this.getElement(528)};
	/**Beautiful clothes are available in shops.*/
	get UI_LOBBY_098():ILanguageElement{return this.getElement(529)};
	/**You can draw prizes every day! Remember to login for free prize draws every day!*/
	get UI_LOBBY_099():ILanguageElement{return this.getElement(530)};
	/**It's a nice day today!*/
	get UI_LOBBY_100():ILanguageElement{return this.getElement(531)};
	/**Are you going to win the championship again, boss?*/
	get UI_LOBBY_101():ILanguageElement{return this.getElement(532)};
	/**I'm so afraid of being blown up by a bomb!*/
	get UI_LOBBY_102():ILanguageElement{return this.getElement(533)};
	/**Eggy is still Eggy after coming out of the shell.*/
	get UI_LOBBY_103():ILanguageElement{return this.getElement(534)};
	/**What's on the other side of the sea?*/
	get UI_LOBBY_104():ILanguageElement{return this.getElement(535)};
	/**{0} seconds to get reward.*/
	get UI_LOBBY_105():ILanguageElement{return this.getElement(536)};
	/**A mysterious egg, what will you get after hatching?*/
	get UI_LOBBY_106():ILanguageElement{return this.getElement(537)};
	/**Come!*/
	get UI_LOBBY_107():ILanguageElement{return this.getElement(538)};
	/**Move*/
	get PRATICE_NAME_1():ILanguageElement{return this.getElement(539)};
	/**Jump*/
	get PRATICE_NAME_2():ILanguageElement{return this.getElement(540)};
	/**Swoop*/
	get PRATICE_NAME_3():ILanguageElement{return this.getElement(541)};
	/**Cannot start in a team*/
	get PRATICE_TIP_1():ILanguageElement{return this.getElement(542)};
	/**LOCK*/
	get PRATICE_TIP_2():ILanguageElement{return this.getElement(543)};
	/**Individual 
Competition*/
	get PRATICE_TIP_3():ILanguageElement{return this.getElement(544)};
	/**Rewards*/
	get PRATICE_TIP_4():ILanguageElement{return this.getElement(545)};
	/**Back to lobby*/
	get PRATICE_BUTTON_1():ILanguageElement{return this.getElement(546)};
	/**Select level*/
	get PRATICE_BUTTON_2():ILanguageElement{return this.getElement(547)};
	/**Challenge Again*/
	get PRATICE_BUTTON_3():ILanguageElement{return this.getElement(548)};
	/**Start*/
	get PRATICE_BUTTON_4():ILanguageElement{return this.getElement(549)};
	/**Challenge Failed*/
	get PRATICE_END_1():ILanguageElement{return this.getElement(550)};
	/**Practice Success*/
	get PRATICE_END_2():ILanguageElement{return this.getElement(551)};
	/**Event*/
	get ACTIVITY_BUTTON_01():ILanguageElement{return this.getElement(552)};
	/**Regular 
Reward*/
	get ACTIVITY_BUTTON_02():ILanguageElement{return this.getElement(553)};
	/**Evening Login Gift*/
	get DAILYLOGIN_TIP_01():ILanguageElement{return this.getElement(554)};
	/**Login the game*/
	get DAILYLOGIN_TIP_02():ILanguageElement{return this.getElement(555)};
	/**Claim*/
	get DAILYLOGIN_BUTTON_01():ILanguageElement{return this.getElement(556)};
	/**Claimed*/
	get DAILYLOGIN_BUTTON_02():ILanguageElement{return this.getElement(557)};
	/**Ongoing*/
	get DAILYLOGIN_BUTTON_03():ILanguageElement{return this.getElement(558)};
	/**Skip*/
	get ANIMATION_BUTTON_01():ILanguageElement{return this.getElement(559)};
	/**Gold Coins*/
	get UI_TIP__01():ILanguageElement{return this.getElement(560)};
	/**Candy*/
	get UI_TIP__02():ILanguageElement{return this.getElement(561)};
	/**Activity*/
	get UI_TIP__03():ILanguageElement{return this.getElement(562)};
	/**Treasure Chest*/
	get UI_TIP__04():ILanguageElement{return this.getElement(563)};
	/**Obtained in-game and available for store purchase*/
	get UI_TIP__05():ILanguageElement{return this.getElement(564)};
	/**Obtaining duplicate items will convert to candies, which can be used for store purchases.*/
	get UI_TIP__06():ILanguageElement{return this.getElement(565)};
	/**You can get it after completing the quest, which can be used to open different treasure chests!*/
	get UI_TIP__07():ILanguageElement{return this.getElement(566)};
	/**You can open it if you are active enough, and there are various gifts for different treasure boxes!*/
	get UI_TIP__08():ILanguageElement{return this.getElement(567)};
	/**Invite you to play */
	get UI_LOBBY_108():ILanguageElement{return this.getElement(568)};
	/**Left the team*/
	get UI_LOBBY_109():ILanguageElement{return this.getElement(569)};
	/**Invite*/
	get UI_LOBBY_110():ILanguageElement{return this.getElement(570)};
	/**Game starts in {0}s*/
	get UI_LOBBY_111():ILanguageElement{return this.getElement(571)};
	/**Player List*/
	get UI_LOBBY_112():ILanguageElement{return this.getElement(572)};
	/**Accept team invitation*/
	get UI_LOBBY_113():ILanguageElement{return this.getElement(573)};
	/**Team*/
	get UI_LOBBY_114():ILanguageElement{return this.getElement(574)};
	/**Team up*/
	get UI_LOBBY_115():ILanguageElement{return this.getElement(575)};
	/**{0} started a match, do you want to enter?*/
	get UI_LOBBY_116():ILanguageElement{return this.getElement(576)};
	/**{0} refused to start*/
	get UI_LOBBY_117():ILanguageElement{return this.getElement(577)};
	/**{0} joined the team*/
	get UI_LOBBY_118():ILanguageElement{return this.getElement(578)};
	/**{0} has left the team*/
	get UI_LOBBY_119():ILanguageElement{return this.getElement(579)};
	/**Team size over {0} people*/
	get UI_LOBBY_120():ILanguageElement{return this.getElement(580)};
	/**He/she is on Dismiss mode, can not be invited*/
	get UI_LOBBY_121():ILanguageElement{return this.getElement(581)};
	/**Already has a team!*/
	get UI_LOBBY_122():ILanguageElement{return this.getElement(582)};
	/**Player info not exist!*/
	get UI_LOBBY_123():ILanguageElement{return this.getElement(583)};
	/**He/she is in tutorial, can not join the team.*/
	get UI_LOBBY_124():ILanguageElement{return this.getElement(584)};
	/**Waiting for response...*/
	get UI_LOBBY_125():ILanguageElement{return this.getElement(585)};
	/**{0} invites you to join the team*/
	get UI_LOBBY_126():ILanguageElement{return this.getElement(586)};
	/**Owner information error*/
	get UI_LOBBY_127():ILanguageElement{return this.getElement(587)};
	/**Team has been disbanded*/
	get UI_LOBBY_128():ILanguageElement{return this.getElement(588)};
	/**Team is full*/
	get UI_LOBBY_129():ILanguageElement{return this.getElement(589)};
	/**Do you want to leave the team?*/
	get UI_LOBBY_130():ILanguageElement{return this.getElement(590)};
	/**Processing...*/
	get UI_LOBBY_131():ILanguageElement{return this.getElement(591)};
	/**I can carry!*/
	get UI_LOBBY_132():ILanguageElement{return this.getElement(592)};
	/**Rush Forward*/
	get UI_LAN_275():ILanguageElement{return this.getElement(594)};
	/**Extreme Access*/
	get UI_LAN_276():ILanguageElement{return this.getElement(595)};
	/**Blueberry Candy*/
	get SKIN_NAME_1090():ILanguageElement{return this.getElement(596)};
	/**Trail*/
	get UI_LOBBY_133():ILanguageElement{return this.getElement(597)};
	/**Left*/
	get UI_LOBBY_134():ILanguageElement{return this.getElement(598)};
	/**Right*/
	get UI_LOBBY_135():ILanguageElement{return this.getElement(599)};
	/**Back*/
	get UI_LOBBY_136():ILanguageElement{return this.getElement(600)};
	/**Come and pull the radish!*/
	get UI_LOBBY_137():ILanguageElement{return this.getElement(601)};
	/**I'm stuck, come and help me!*/
	get UI_LOBBY_138():ILanguageElement{return this.getElement(602)};
	/**Tap the button at the right time*/
	get UI_LOBBY_139():ILanguageElement{return this.getElement(603)};
	/**Come here!*/
	get UI_LOBBY_140():ILanguageElement{return this.getElement(604)};
	/**Time cost*/
	get UI_TIP_09():ILanguageElement{return this.getElement(605)};
	/**Newbie Daily Bonus*/
	get UI_LOBBY_141():ILanguageElement{return this.getElement(606)};
	/**Please sign in and claim your reward within the limit time!*/
	get UI_LOBBY_142():ILanguageElement{return this.getElement(607)};
	/**{0} days {1} hrs*/
	get UI_LOBBY_143():ILanguageElement{return this.getElement(608)};
	/**Get Reward*/
	get UI_LOBBY_144():ILanguageElement{return this.getElement(609)};
	/**7-Day Bonus*/
	get UI_LOBBY_145():ILanguageElement{return this.getElement(610)};
	/**{0}Day Bonus*/
	get UI_LOBBY_146():ILanguageElement{return this.getElement(611)};
	/**No fishing rod equipped*/
	get UI_FISH_1():ILanguageElement{return this.getElement(612)};
	/**You're already fishing*/
	get UI_FISH_2():ILanguageElement{return this.getElement(613)};
	/**You're not fishing.*/
	get UI_FISH_3():ILanguageElement{return this.getElement(614)};
	/**You are not in the right state.*/
	get UI_FISH_4():ILanguageElement{return this.getElement(615)};
	/**Please go fishing in deeper water*/
	get UI_FISH_5():ILanguageElement{return this.getElement(616)};
	/**When [Phone Vibrates], [Retract]*/
	get UI_FISH_6():ILanguageElement{return this.getElement(617)};
	/**Oops! The line is broken!*/
	get UI_FISH_7():ILanguageElement{return this.getElement(618)};
	/**It's too late, the fish has escaped.*/
	get UI_FISH_8():ILanguageElement{return this.getElement(619)};
	/**Great! Catch a {0} and get gold coins*{1}*/
	get UI_FISH_9():ILanguageElement{return this.getElement(620)};
	/**Great! Catch a {0} and get candy*{1}*/
	get UI_FISH_10():ILanguageElement{return this.getElement(621)};
	/**Pick up a {0}, get gold*{1}*/
	get UI_FISH_11():ILanguageElement{return this.getElement(622)};
	/**Pick up a {0}, get candy*{1}*/
	get UI_FISH_12():ILanguageElement{return this.getElement(623)};
	/**Done*/
	get UI_LOBBY_147():ILanguageElement{return this.getElement(624)};
	/**You've already signed in!*/
	get UI_LOBBY_148():ILanguageElement{return this.getElement(625)};
	/**Today's sign-in has been updated!*/
	get UI_LOBBY_149():ILanguageElement{return this.getElement(626)};
	/**Sea ​​bass*/
	get UI_FISH_13():ILanguageElement{return this.getElement(627)};
	/**Emperor Bass*/
	get UI_FISH_14():ILanguageElement{return this.getElement(628)};
	/**Largemouth Bass*/
	get UI_FISH_15():ILanguageElement{return this.getElement(629)};
	/**Emperor Largemouth Bass*/
	get UI_FISH_16():ILanguageElement{return this.getElement(630)};
	/**Grass carp*/
	get UI_FISH_17():ILanguageElement{return this.getElement(631)};
	/**Emperor Grass Carp*/
	get UI_FISH_18():ILanguageElement{return this.getElement(632)};
	/**Mackerel*/
	get UI_FISH_19():ILanguageElement{return this.getElement(633)};
	/**Emperor Mackerel*/
	get UI_FISH_20():ILanguageElement{return this.getElement(634)};
	/**Zander*/
	get UI_FISH_21():ILanguageElement{return this.getElement(635)};
	/**Emperor Zander*/
	get UI_FISH_22():ILanguageElement{return this.getElement(636)};
	/**Rain Trout*/
	get UI_FISH_23():ILanguageElement{return this.getElement(637)};
	/**Emperor Rain Trout*/
	get UI_FISH_24():ILanguageElement{return this.getElement(638)};
	/**Alaska flatfish*/
	get UI_FISH_25():ILanguageElement{return this.getElement(639)};
	/**Emperor Alaska flatfish*/
	get UI_FISH_26():ILanguageElement{return this.getElement(640)};
	/**Snakehead*/
	get UI_FISH_27():ILanguageElement{return this.getElement(641)};
	/**Emperor Snakehead*/
	get UI_FISH_28():ILanguageElement{return this.getElement(642)};
	/**Carp*/
	get UI_FISH_29():ILanguageElement{return this.getElement(643)};
	/**Emperor Carp*/
	get UI_FISH_30():ILanguageElement{return this.getElement(644)};
	/**Lamb Spotted Salmon*/
	get UI_FISH_31():ILanguageElement{return this.getElement(645)};
	/**Emperor Lamb Spotted Salmon*/
	get UI_FISH_32():ILanguageElement{return this.getElement(646)};
	/**Coreoperca whiteheadi*/
	get UI_FISH_33():ILanguageElement{return this.getElement(647)};
	/**Emperor Coreoperca whiteheadi */
	get UI_FISH_34():ILanguageElement{return this.getElement(648)};
	/**Rainbow trout*/
	get UI_FISH_35():ILanguageElement{return this.getElement(649)};
	/**Emperor Rainbow Trout*/
	get UI_FISH_36():ILanguageElement{return this.getElement(650)};
	/**Trout*/
	get UI_FISH_37():ILanguageElement{return this.getElement(651)};
	/**Emperor Trout*/
	get UI_FISH_38():ILanguageElement{return this.getElement(652)};
	/**White Spotted Dogfish*/
	get UI_FISH_39():ILanguageElement{return this.getElement(653)};
	/**Emperor White Spotted Dogfish*/
	get UI_FISH_40():ILanguageElement{return this.getElement(654)};
	/**Medaka*/
	get UI_FISH_41():ILanguageElement{return this.getElement(655)};
	/**Emperor medaka*/
	get UI_FISH_42():ILanguageElement{return this.getElement(656)};
	/**Snapper*/
	get UI_FISH_43():ILanguageElement{return this.getElement(657)};
	/**Emperor Snapper*/
	get UI_FISH_44():ILanguageElement{return this.getElement(658)};
	/**Sculpin*/
	get UI_FISH_45():ILanguageElement{return this.getElement(659)};
	/**Emperor sculpin*/
	get UI_FISH_46():ILanguageElement{return this.getElement(660)};
	/**Hairy-nosed catfish*/
	get UI_FISH_47():ILanguageElement{return this.getElement(661)};
	/**Emperor Hairy-nosed Catfish*/
	get UI_FISH_48():ILanguageElement{return this.getElement(662)};
	/**Stickleback*/
	get UI_FISH_49():ILanguageElement{return this.getElement(663)};
	/**Emperor stickleback*/
	get UI_FISH_50():ILanguageElement{return this.getElement(664)};
	/**Zacco platypus*/
	get UI_FISH_51():ILanguageElement{return this.getElement(665)};
	/**Emperor Zacco platypus*/
	get UI_FISH_52():ILanguageElement{return this.getElement(666)};
	/**Goby*/
	get UI_FISH_53():ILanguageElement{return this.getElement(667)};
	/**Emperor Goby*/
	get UI_FISH_54():ILanguageElement{return this.getElement(668)};
	/**Pearl Fish*/
	get UI_FISH_55():ILanguageElement{return this.getElement(669)};
	/**Emperor Pearl Fish*/
	get UI_FISH_56():ILanguageElement{return this.getElement(670)};
	/**Guppy*/
	get UI_FISH_57():ILanguageElement{return this.getElement(671)};
	/**Emperor Guppy*/
	get UI_FISH_58():ILanguageElement{return this.getElement(672)};
	/**King Salmon*/
	get UI_FISH_59():ILanguageElement{return this.getElement(673)};
	/**Emperor King Salmon*/
	get UI_FISH_60():ILanguageElement{return this.getElement(674)};
	/**Heros severus*/
	get UI_FISH_61():ILanguageElement{return this.getElement(675)};
	/**Emperor Heros severus*/
	get UI_FISH_62():ILanguageElement{return this.getElement(676)};
	/**Cherry Trout*/
	get UI_FISH_63():ILanguageElement{return this.getElement(677)};
	/**Emperor Cherry Trout*/
	get UI_FISH_64():ILanguageElement{return this.getElement(678)};
	/**Blackbass*/
	get UI_FISH_65():ILanguageElement{return this.getElement(679)};
	/**Emperor Blackbass*/
	get UI_FISH_66():ILanguageElement{return this.getElement(680)};
	/**Treefish*/
	get UI_FISH_67():ILanguageElement{return this.getElement(681)};
	/**Emperor Treefish*/
	get UI_FISH_68():ILanguageElement{return this.getElement(682)};
	/**Mullet*/
	get UI_FISH_69():ILanguageElement{return this.getElement(683)};
	/**Emperor Mullet*/
	get UI_FISH_70():ILanguageElement{return this.getElement(684)};
	/**Channa*/
	get UI_FISH_71():ILanguageElement{return this.getElement(685)};
	/**Emperor Channa*/
	get UI_FISH_72():ILanguageElement{return this.getElement(686)};
	/**Rosy bitterling*/
	get UI_FISH_73():ILanguageElement{return this.getElement(687)};
	/**Emperor Rosy bitterling*/
	get UI_FISH_74():ILanguageElement{return this.getElement(688)};
	/**Perch*/
	get UI_FISH_75():ILanguageElement{return this.getElement(689)};
	/**Emperor Perch*/
	get UI_FISH_76():ILanguageElement{return this.getElement(690)};
	/**Silver snapper*/
	get UI_FISH_77():ILanguageElement{return this.getElement(691)};
	/**Emperor silver snapper*/
	get UI_FISH_78():ILanguageElement{return this.getElement(692)};
	/**Napoleon fish*/
	get UI_FISH_79():ILanguageElement{return this.getElement(693)};
	/**Emperor Napoleon fish*/
	get UI_FISH_80():ILanguageElement{return this.getElement(694)};
	/**Catfish*/
	get UI_FISH_81():ILanguageElement{return this.getElement(695)};
	/**Emperor Catfish*/
	get UI_FISH_82():ILanguageElement{return this.getElement(696)};
	/**Oarfish*/
	get UI_FISH_83():ILanguageElement{return this.getElement(697)};
	/**Emperor Oarfish*/
	get UI_FISH_84():ILanguageElement{return this.getElement(698)};
	/**Bluefin tuna*/
	get UI_FISH_85():ILanguageElement{return this.getElement(699)};
	/**Emperor Bluefin Tuna*/
	get UI_FISH_86():ILanguageElement{return this.getElement(700)};
	/**Guppy*/
	get UI_FISH_87():ILanguageElement{return this.getElement(701)};
	/**Emperor Guppy*/
	get UI_FISH_88():ILanguageElement{return this.getElement(702)};
	/**Big Eye Carp*/
	get UI_FISH_89():ILanguageElement{return this.getElement(703)};
	/**Emperor Big Eye Carp*/
	get UI_FISH_90():ILanguageElement{return this.getElement(704)};
	/**Arowana*/
	get UI_FISH_91():ILanguageElement{return this.getElement(705)};
	/**Emperor Arowana*/
	get UI_FISH_92():ILanguageElement{return this.getElement(706)};
	/**Clownfish*/
	get UI_FISH_93():ILanguageElement{return this.getElement(707)};
	/**Emperor Clownfish*/
	get UI_FISH_94():ILanguageElement{return this.getElement(708)};
	/**Blue tang*/
	get UI_FISH_95():ILanguageElement{return this.getElement(709)};
	/**Emperor Blue tang*/
	get UI_FISH_96():ILanguageElement{return this.getElement(710)};
	/**Tuna*/
	get UI_FISH_97():ILanguageElement{return this.getElement(711)};
	/**Emperor Tuna*/
	get UI_FISH_98():ILanguageElement{return this.getElement(712)};
	/**Deep Sea Tuna*/
	get UI_FISH_99():ILanguageElement{return this.getElement(713)};
	/**Emperor Deep Sea Tuna*/
	get UI_FISH_100():ILanguageElement{return this.getElement(714)};
	/**Parrotfish*/
	get UI_FISH_101():ILanguageElement{return this.getElement(715)};
	/**Emperor Parrotfish*/
	get UI_FISH_102():ILanguageElement{return this.getElement(716)};
	/**Discus fish*/
	get UI_FISH_103():ILanguageElement{return this.getElement(717)};
	/**Emperor Discus fish*/
	get UI_FISH_104():ILanguageElement{return this.getElement(718)};
	/**Guitar fish*/
	get UI_FISH_105():ILanguageElement{return this.getElement(719)};
	/**Emperor Guitarfish*/
	get UI_FISH_106():ILanguageElement{return this.getElement(720)};
	/**Neon carp*/
	get UI_FISH_107():ILanguageElement{return this.getElement(721)};
	/**Emperor Neon carp*/
	get UI_FISH_108():ILanguageElement{return this.getElement(722)};
	/**Donovel's shark*/
	get UI_FISH_109():ILanguageElement{return this.getElement(723)};
	/**Emperor Donovel's shark*/
	get UI_FISH_110():ILanguageElement{return this.getElement(724)};
	/**Shark*/
	get UI_FISH_111():ILanguageElement{return this.getElement(725)};
	/**Emperor Shark*/
	get UI_FISH_112():ILanguageElement{return this.getElement(726)};
	/**Devil Fish*/
	get UI_FISH_113():ILanguageElement{return this.getElement(727)};
	/**Emperor Devilfish*/
	get UI_FISH_114():ILanguageElement{return this.getElement(728)};
	/**King Bluefin Tuna*/
	get UI_FISH_115():ILanguageElement{return this.getElement(729)};
	/**Emperor Bluefin Tuna King*/
	get UI_FISH_116():ILanguageElement{return this.getElement(730)};
	/**Sunfish*/
	get UI_FISH_117():ILanguageElement{return this.getElement(731)};
	/**Emperor Ocean sunfish*/
	get UI_FISH_118():ILanguageElement{return this.getElement(732)};
	/**Koi*/
	get UI_FISH_119():ILanguageElement{return this.getElement(733)};
	/**Emperor Koi*/
	get UI_FISH_120():ILanguageElement{return this.getElement(734)};
	/**Baleen whale*/
	get UI_FISH_121():ILanguageElement{return this.getElement(735)};
	/**Emperor Baleen Whale*/
	get UI_FISH_122():ILanguageElement{return this.getElement(736)};
	/**Cat shark*/
	get UI_FISH_123():ILanguageElement{return this.getElement(737)};
	/**Emperor Cat Shark*/
	get UI_FISH_124():ILanguageElement{return this.getElement(738)};
	/**Whale*/
	get UI_FISH_125():ILanguageElement{return this.getElement(739)};
	/**Emperor Whale*/
	get UI_FISH_126():ILanguageElement{return this.getElement(740)};
	/**Mini Shark*/
	get UI_FISH_127():ILanguageElement{return this.getElement(741)};
	/**Emperor Mini Shark*/
	get UI_FISH_128():ILanguageElement{return this.getElement(742)};
	/**Mini baleen whale*/
	get UI_FISH_129():ILanguageElement{return this.getElement(743)};
	/**Emperor minibaleen whale*/
	get UI_FISH_130():ILanguageElement{return this.getElement(744)};
	/**Mini Devilfish*/
	get UI_FISH_131():ILanguageElement{return this.getElement(745)};
	/**Emperor Mini Devilfish*/
	get UI_FISH_132():ILanguageElement{return this.getElement(746)};
	/**Oversized pearl shell*/
	get UI_FISH_133():ILanguageElement{return this.getElement(747)};
	/**Large pearl shell*/
	get UI_FISH_134():ILanguageElement{return this.getElement(748)};
	/**Pearl Shell*/
	get UI_FISH_135():ILanguageElement{return this.getElement(749)};
	/**Oversized bird clam*/
	get UI_FISH_136():ILanguageElement{return this.getElement(750)};
	/**Big Bird Clam*/
	get UI_FISH_137():ILanguageElement{return this.getElement(751)};
	/**Bird Clam*/
	get UI_FISH_138():ILanguageElement{return this.getElement(752)};
	/**Oversized Pagoda Snail*/
	get UI_FISH_139():ILanguageElement{return this.getElement(753)};
	/**Large Pagoda Snail*/
	get UI_FISH_140():ILanguageElement{return this.getElement(754)};
	/**Pagoda Snail*/
	get UI_FISH_141():ILanguageElement{return this.getElement(755)};
	/**Big Anemone*/
	get UI_FISH_142():ILanguageElement{return this.getElement(756)};
	/**Anemone*/
	get UI_FISH_143():ILanguageElement{return this.getElement(757)};
	/**Little Anemone*/
	get UI_FISH_144():ILanguageElement{return this.getElement(758)};
	/**Oversized Hemifusus*/
	get UI_FISH_145():ILanguageElement{return this.getElement(759)};
	/**Big Hemifusus*/
	get UI_FISH_146():ILanguageElement{return this.getElement(760)};
	/**Hemifusus*/
	get UI_FISH_147():ILanguageElement{return this.getElement(761)};
	/**Big Jellyfish*/
	get UI_FISH_148():ILanguageElement{return this.getElement(762)};
	/**Jellyfish*/
	get UI_FISH_149():ILanguageElement{return this.getElement(763)};
	/**Small Jellyfish*/
	get UI_FISH_150():ILanguageElement{return this.getElement(764)};
	/**Monster Starfish*/
	get UI_FISH_151():ILanguageElement{return this.getElement(765)};
	/**Overlord starfish*/
	get UI_FISH_152():ILanguageElement{return this.getElement(766)};
	/**Starfish*/
	get UI_FISH_153():ILanguageElement{return this.getElement(767)};
	/**Oversized Witch Conch*/
	get UI_FISH_154():ILanguageElement{return this.getElement(768)};
	/**Big Witch Conch*/
	get UI_FISH_155():ILanguageElement{return this.getElement(769)};
	/**Witch conch*/
	get UI_FISH_156():ILanguageElement{return this.getElement(770)};
	/**Oversized Arctic shell*/
	get UI_FISH_157():ILanguageElement{return this.getElement(771)};
	/**Big Arctic Shell*/
	get UI_FISH_158():ILanguageElement{return this.getElement(772)};
	/**Arctic shell*/
	get UI_FISH_159():ILanguageElement{return this.getElement(773)};
	/**Lollipop*/
	get UI_FISH_160():ILanguageElement{return this.getElement(774)};
	/**Oversized cat's eye snail*/
	get UI_FISH_161():ILanguageElement{return this.getElement(775)};
	/**Big cat's eye snail*/
	get UI_FISH_162():ILanguageElement{return this.getElement(776)};
	/**Cat's eye snail*/
	get UI_FISH_163():ILanguageElement{return this.getElement(777)};
	/**Pearl*/
	get UI_FISH_164():ILanguageElement{return this.getElement(778)};
	/**Pirate's Treasure*/
	get UI_FISH_165():ILanguageElement{return this.getElement(779)};
	/**Only the owner can start the game*/
	get UI_LOBBY_150():ILanguageElement{return this.getElement(780)};
	/**Blue Hanfu Candy*/
	get SKIN_NAME_2060():ILanguageElement{return this.getElement(781)};
	/**[Hand] Witch Snail*/
	get ITEM_NAME_50072():ILanguageElement{return this.getElement(782)};
	/**[Hand] Hemifusus*/
	get ITEM_NAME_50073():ILanguageElement{return this.getElement(783)};
	/**[Hands] Arctic Shell*/
	get ITEM_NAME_50074():ILanguageElement{return this.getElement(784)};
	/**[Hand] Bird Clam*/
	get ITEM_NAME_50075():ILanguageElement{return this.getElement(785)};
	/**[Hands] Pearl Shell*/
	get ITEM_NAME_50076():ILanguageElement{return this.getElement(786)};
	/**[Hand] Pagoda Snail*/
	get ITEM_NAME_50077():ILanguageElement{return this.getElement(787)};
	/**[Hand] Red Starfish*/
	get ITEM_NAME_50078():ILanguageElement{return this.getElement(788)};
	/**Coins obtained by {0} today have reached the upper limit.*/
	get UI_LOBBY_151():ILanguageElement{return this.getElement(789)};
	/**Coins obtained by [Collect Seashell] today have reached the upper limit.*/
	get UI_FISH_166():ILanguageElement{return this.getElement(790)};
	/**Candies obtained by [Collect Seashell] today have reached the upper limit.*/
	get UI_FISH_167():ILanguageElement{return this.getElement(791)};
	/**Coins obtained by [Fishing] today have reached the upper limit.*/
	get UI_FISH_168():ILanguageElement{return this.getElement(792)};
	/**Candies obtained by [Fishing] today have reached the upper limit.*/
	get UI_FISH_169():ILanguageElement{return this.getElement(793)};
	/**Be patient, the fish are not yet hooked!*/
	get UI_FISH_170():ILanguageElement{return this.getElement(794)};
	/**Seven-day 
Bonus*/
	get UI_LOBBY_152():ILanguageElement{return this.getElement(795)};
	/**Water Balloon*/
	get Item_name_1():ILanguageElement{return this.getElement(796)};
	/**Wing*/
	get Item_name_2():ILanguageElement{return this.getElement(797)};
	/**Bigger Potion*/
	get Item_name_3():ILanguageElement{return this.getElement(798)};
	/**Smaller Potion*/
	get Item_name_4():ILanguageElement{return this.getElement(799)};
	/**Water Gun*/
	get Item_name_5():ILanguageElement{return this.getElement(800)};
	/**Summer Ice Pop*/
	get Item_name_6():ILanguageElement{return this.getElement(801)};
	/**Swirling Torrent*/
	get UI_LAN_277():ILanguageElement{return this.getElement(802)};
	/**Slide the right screen to move the viewing angle*/
	get UI_NEWGUID_002():ILanguageElement{return this.getElement(803)};
	/**Pull out {0} radishes in Lobby*/
	get QUEST_12():ILanguageElement{return this.getElement(804)};
	/**Use {0} flights in the lobby*/
	get QUEST_13():ILanguageElement{return this.getElement(805)};
	/**Use {0} Smaller Potions in the lobby*/
	get QUEST_14():ILanguageElement{return this.getElement(806)};
	/**Get {0} gold*/
	get QUEST_15():ILanguageElement{return this.getElement(807)};
	/**Daily online time {0} mins*/
	get QUEST_16():ILanguageElement{return this.getElement(808)};
	/**Login {0} days*/
	get QUEST_17():ILanguageElement{return this.getElement(809)};
	/**Participate in {0} games as a team*/
	get QUEST_18():ILanguageElement{return this.getElement(810)};
	/**Reward*/
	get Season_Button_01():ILanguageElement{return this.getElement(811)};
	/**Quest*/
	get Season_Button_02():ILanguageElement{return this.getElement(812)};
	/**Weekly Quest*/
	get Season_Button_03():ILanguageElement{return this.getElement(813)};
	/**Season Quest*/
	get Season_Button_04():ILanguageElement{return this.getElement(814)};
	/**Week{0}*/
	get Season_Button_05():ILanguageElement{return this.getElement(815)};
	/**{0} days {1} hrs*/
	get Season_Des_01():ILanguageElement{return this.getElement(816)};
	/**Week {0} Progress Reward*/
	get Season_Des_02():ILanguageElement{return this.getElement(817)};
	/**Remaining time this week: {0} days {1} hrs */
	get Season_Des_03():ILanguageElement{return this.getElement(818)};
	/**This week's content is still unavailable.*/
	get Season_Des_04():ILanguageElement{return this.getElement(819)};
	/**Activate Premium Pass to unlock*/
	get Season_Des_05():ILanguageElement{return this.getElement(820)};
	/**Season Check-In to get Premium Pass*/
	get Season_Des_06():ILanguageElement{return this.getElement(821)};
	/**Successfully unlock Premium Pass*/
	get Season_Des_07():ILanguageElement{return this.getElement(822)};
	/**Unlocked*/
	get Season_Des_08():ILanguageElement{return this.getElement(823)};
	/**Premium Pass*/
	get Season_Des_09():ILanguageElement{return this.getElement(824)};
	/**Daily*/
	get UI_LOBBY_153():ILanguageElement{return this.getElement(825)};
	/**Aha, another little candy for the party!You can get to Candy Island through here, but before that, you must go through a little test.*/
	get UI_LOBBY_154():ILanguageElement{return this.getElement(826)};
	/**You can get to Candy Island through here, but before that, you must go through a little test.*/
	get UI_LOBBY_155():ILanguageElement{return this.getElement(827)};
	/**Learn your party skills in the test! I'll be waiting for you at the finish line!*/
	get UI_LOBBY_156():ILanguageElement{return this.getElement(828)};
	/**You've passed the test so quickly, you're a great new candy! Now, come and compete with me, but don't be too far behind!*/
	get UI_LOBBY_157():ILanguageElement{return this.getElement(829)};
	/**Congratulations on your victory and enjoy your party!*/
	get UI_LOBBY_158():ILanguageElement{return this.getElement(830)};
	/**Let me give you some candies!*/
	get text_settle_01():ILanguageElement{return this.getElement(831)};
	/**EXP*/
	get UI_TIP_10():ILanguageElement{return this.getElement(832)};
	/**Blue Hawaii*/
	get SKIN_NAME_2070():ILanguageElement{return this.getElement(833)};
	/**Red Hawaii*/
	get SKIN_NAME_2071():ILanguageElement{return this.getElement(834)};
	/**Beach Style*/
	get SKIN_NAME_3030():ILanguageElement{return this.getElement(835)};
	/**Shy*/
	get ITEM_NAME_30011():ILanguageElement{return this.getElement(836)};
	/**Fainting*/
	get ITEM_NAME_30012():ILanguageElement{return this.getElement(837)};
	/**Angry*/
	get ITEM_NAME_30013():ILanguageElement{return this.getElement(838)};
	/**Birds flying*/
	get ITEM_NAME_30014():ILanguageElement{return this.getElement(839)};
	/**Relaxed*/
	get ITEM_NAME_30015():ILanguageElement{return this.getElement(840)};
	/**Season Progress Bonus*/
	get Season_Des_10():ILanguageElement{return this.getElement(841)};
	/**Unlock*/
	get Season_Des_11():ILanguageElement{return this.getElement(842)};
	/**Season Skin*/
	get Season_Des_12():ILanguageElement{return this.getElement(843)};
	/**Panda*/
	get UI_LOBBY_159():ILanguageElement{return this.getElement(844)};
	/**The player has to complete a game to unlock the team feature.*/
	get UI_LOBBY_160():ILanguageElement{return this.getElement(845)};
	/**You've got a new look, try it out in the game!*/
	get UI_LOBBY_161():ILanguageElement{return this.getElement(846)};
	/**Road on Water*/
	get UI_LAN_278():ILanguageElement{return this.getElement(847)};
	/**Season 
Daily Reward */
	get UI_LAN_279():ILanguageElement{return this.getElement(848)};
	/**The match has been made and cannot be cancelled!*/
	get Content_txt_01():ILanguageElement{return this.getElement(849)};
	/**Progress*/
	get UI_LOBBY_162():ILanguageElement{return this.getElement(850)};
	/**Wobbling~*/
	get Level_001():ILanguageElement{return this.getElement(851)};
	/**Jungle Rollers!*/
	get Level_002():ILanguageElement{return this.getElement(852)};
	/**Space Travel*/
	get Level_003():ILanguageElement{return this.getElement(853)};
	/**Infinite Curves*/
	get Level_004():ILanguageElement{return this.getElement(854)};
	/**Don't fall off*/
	get Level_005():ILanguageElement{return this.getElement(855)};
	/**Way of Brushes*/
	get Level_006():ILanguageElement{return this.getElement(856)};
	/**Turntable Battle*/
	get Level_007():ILanguageElement{return this.getElement(857)};
	/**Dynamic Cannon*/
	get Level_011():ILanguageElement{return this.getElement(858)};
	/**Spinning & Jumping!*/
	get Level_012():ILanguageElement{return this.getElement(859)};
	/**Candy Spinning*/
	get Level_013():ILanguageElement{return this.getElement(860)};
	/**Jelly Run*/
	get Level_014():ILanguageElement{return this.getElement(861)};
	/**Rush Forward*/
	get Level_015():ILanguageElement{return this.getElement(862)};
	/**Extreme Access*/
	get Level_016():ILanguageElement{return this.getElement(863)};
	/**Road on Water*/
	get Level_018():ILanguageElement{return this.getElement(864)};
	/**Swirling Torrent*/
	get Level_019():ILanguageElement{return this.getElement(865)};
	/**Back*/
	get Obby_001():ILanguageElement{return this.getElement(866)};
	/**Respawn*/
	get Obby_002():ILanguageElement{return this.getElement(867)};
	/**Rank*/
	get Obby_003():ILanguageElement{return this.getElement(868)};
	/**Level*/
	get Obby_004():ILanguageElement{return this.getElement(869)};
	/**Name*/
	get Obby_005():ILanguageElement{return this.getElement(870)};
	/**Sound: On*/
	get Obby_006():ILanguageElement{return this.getElement(871)};
	/**Sound: Off*/
	get Obby_007():ILanguageElement{return this.getElement(872)};
	/**Level {0}*/
	get Obby_008():ILanguageElement{return this.getElement(873)};
	/**Is the car cab on the left or right?*/
	get Obby_009():ILanguageElement{return this.getElement(874)};
	/**Show your snake walk*/
	get Obby_010():ILanguageElement{return this.getElement(875)};
	/**Be careful to avoid red objects!*/
	get Obby_011():ILanguageElement{return this.getElement(876)};
	/**This is the way to the king's castle. Win as many races as you can to increase your fame and the king will invite the famous jellies to his castle.*/
	get UI_LOBBY_163():ILanguageElement{return this.getElement(877)};
	/**Limit Time Event*/
	get UI_LOBBY_164():ILanguageElement{return this.getElement(878)};
	/**Skibidi Toilet Obby!*/
	get UI_LOBBY_ActivityLevel1():ILanguageElement{return this.getElement(879)};
	/**※Please wait while the screen loads for a short while.*/
	get UI_LOBBY_165():ILanguageElement{return this.getElement(880)};
	/**Go Now*/
	get UI_LOBBY_166():ILanguageElement{return this.getElement(881)};
	/**You have teammates returning to the lobby, do you want to return together?*/
	get Obby_012():ILanguageElement{return this.getElement(882)};
	/**Back to Startpoint*/
	get Obby_013():ILanguageElement{return this.getElement(883)};
	/**Great, here's the finish line!*/
	get Obby_014():ILanguageElement{return this.getElement(884)};
	/**You've escaped from Skibidi Toilet!*/
	get Obby_015():ILanguageElement{return this.getElement(885)};
	/**TP entrance! Skibidi Toilet Obby!*/
	get UI_LOBBY_167():ILanguageElement{return this.getElement(886)};
	/**True or False*/
	get Level_020():ILanguageElement{return this.getElement(887)};
	/**Do you want to go to King's Castle?*/
	get UI_LOBBY_168():ILanguageElement{return this.getElement(888)};
	/**Team Member*/
	get UI_EndRank_01():ILanguageElement{return this.getElement(889)};
	/** likes you*/
	get UI_EndRank_02():ILanguageElement{return this.getElement(890)};
	/**Win!*/
	get UI_EndRank_03():ILanguageElement{return this.getElement(891)};
	/**Are you sure to return to the lobby?*/
	get Obby_016():ILanguageElement{return this.getElement(892)};
	/**Unlock after obtaining 3 skins, do you want to enter the lottery interface?*/
	get UI_LOBBY_169():ILanguageElement{return this.getElement(893)};
	/**A team member has not unlocked the event level yet. You need 3 skins to unlock the event level.*/
	get UI_LOBBY_170():ILanguageElement{return this.getElement(894)};
	/**Time Limit 
Mode*/
	get UI_LOBBY_171():ILanguageElement{return this.getElement(895)};
	/**The Jelly King summons you. Use the portal to journey to the Jelly Castle.*/
	get UI_LOBBY_172():ILanguageElement{return this.getElement(896)};
	/**Head to the <color=#green>first floor of the castle</color>and speak with the <color=#red>King</color>.*/
	get UI_Story_001():ILanguageElement{return this.getElement(897)};
	/**Search both <color=#green>inside and outside the castle</color> to find <color=#red>key fragments</color>.*/
	get UI_Story_002():ILanguageElement{return this.getElement(898)};
	/**Speak with the<color=#red>King</color>.*/
	get UI_Story_003():ILanguageElement{return this.getElement(899)};
	/**Search<color=#green>outside the castle</color>for<color=#red>meat bones</color>.*/
	get UI_Story_004():ILanguageElement{return this.getElement(900)};
	/**Talk to <color=#red>Captain Dog</color>.*/
	get UI_Story_005():ILanguageElement{return this.getElement(901)};
	/**Search <color=#green> inside and outside the castle</color> for <color=#red>furballs</color>.*/
	get UI_Story_006():ILanguageElement{return this.getElement(902)};
	/**Are you new here? First, go to the first floor of the castle and meet the king.*/
	get UI_Story_007():ILanguageElement{return this.getElement(903)};
	/**Did you greet me first? Indeed, the charm of meow-meow is irresistible, and no jelly can resist.*/
	get UI_Story_008():ILanguageElement{return this.getElement(904)};
	/**This is the observatory tower for watching the distance. We need to stay vigilant about the approaching crisis.*/
	get UI_Story_009():ILanguageElement{return this.getElement(905)};
	/**Finally, you're here, my little jelly.*/
	get UI_Story_010():ILanguageElement{return this.getElement(906)};
	/**We, the Woof Woof Warriors, are the king's most loyal guards, unlike the cunning Meow Meow Minister! Woof!*/
	get UI_Story_011():ILanguageElement{return this.getElement(907)};
	/**His Majesty is waiting for you on the first floor of the castle. Go find the king! Woof!*/
	get UI_Story_012():ILanguageElement{return this.getElement(908)};
	/**Don't disturb me, I'm training to face the impending invasion! Woof!*/
	get UI_Story_013():ILanguageElement{return this.getElement(909)};
	/**Are you the little jelly summoned by His Majesty, the King?*/
	get UI_Story_014():ILanguageElement{return this.getElement(910)};
	/**Are you new here, meow?*/
	get UI_Story_015():ILanguageElement{return this.getElement(911)};
	/**No, seen, key, fragments. Please don't disturb me, woof.*/
	get UI_Story_016():ILanguageElement{return this.getElement(912)};
	/**Key fragments, huh? It seems there are some on another watchtower as well.*/
	get UI_Story_017():ILanguageElement{return this.getElement(913)};
	/**Key fragments? I think I saw some on the dining table.*/
	get UI_Story_018():ILanguageElement{return this.getElement(914)};
	/**Please go upstairs.*/
	get UI_Story_019():ILanguageElement{return this.getElement(915)};
	/**Key fragments? I think I saw some around the castle.*/
	get UI_Story_020():ILanguageElement{return this.getElement(916)};
	/**I think I saw some key fragments nearby.*/
	get UI_Story_021():ILanguageElement{return this.getElement(917)};
	/**I haven't seen any key fragments nearby.*/
	get UI_Story_022():ILanguageElement{return this.getElement(918)};
	/**Little jelly, haven't you found enough key fragments yet? Go ask other jellies if they've seen any.*/
	get UI_Story_023():ILanguageElement{return this.getElement(919)};
	/**Oh! My little jelly, you've collected all the key fragments.*/
	get UI_Story_024():ILanguageElement{return this.getElement(920)};
	/**Go find other jellies who need help quickly. I'll be here waiting for your good news.*/
	get UI_Story_025():ILanguageElement{return this.getElement(921)};
	/**Woof, did His Majesty send you to help me?*/
	get UI_Story_026():ILanguageElement{return this.getElement(922)};
	/**Meow, how does Meow Meow know where the dumb dog's meat bone is?*/
	get UI_Story_027():ILanguageElement{return this.getElement(923)};
	/**Woof! Haven't found the meat bone yet? It must have been hidden by the Meow Meow Minister on the first floor of the castle.*/
	get UI_Story_028():ILanguageElement{return this.getElement(924)};
	/**Woof woof! Found it, found it! Woof woof's meat bone is back! Thank you, little jelly. You're smarter than Meow Meow!*/
	get UI_Story_029():ILanguageElement{return this.getElement(925)};
	/**Meow, did His Majesty send a fool like you to help? Since the King trusts you, then help this Meow Meow find all the yarn balls blown away by the wind.*/
	get UI_Story_030():ILanguageElement{return this.getElement(926)};
	/**Meow, still haven't found them, you fool, meow.*/
	get UI_Story_031():ILanguageElement{return this.getElement(927)};
	/**Meow, you actually managed to find them all. Now this Meow Meow can go around tossing yarn balls again. Meow meow meow.*/
	get UI_Story_032():ILanguageElement{return this.getElement(928)};
	/**We, the Woof Woof Squad, are His Majesty's most loyal guards, always ready to sacrifice ourselves to protect him. Woof woof.*/
	get UI_Story_033():ILanguageElement{return this.getElement(929)};
	/**Meow meow, don't disturb me, Meow Meow is responsible for the entire Jelly Island's defense arrangements.*/
	get UI_Story_034():ILanguageElement{return this.getElement(930)};
	/**Woof, training, training, diligent training. I will definitely join the king's guard, woof woof.*/
	get UI_Story_035():ILanguageElement{return this.getElement(931)};
	/**The crisis is getting closer. All the jellies should be alert.*/
	get UI_Story_036():ILanguageElement{return this.getElement(932)};
	/**Without the king's orders, passage is not permitted here.*/
	get UI_Story_037():ILanguageElement{return this.getElement(933)};
	/**Woof, woof!*/
	get UI_Story_038():ILanguageElement{return this.getElement(934)};
	/**In times of great danger, all jellies should contribute their efforts.*/
	get UI_Story_039():ILanguageElement{return this.getElement(935)};
	/**Welcome everyone to Jelly Castle!*/
	get UI_Story_040():ILanguageElement{return this.getElement(936)};
	/**Dad doesn't care about me at all.*/
	get UI_Story_041():ILanguageElement{return this.getElement(937)};
	/**The quest is already full!*/
	get UI_Story_042():ILanguageElement{return this.getElement(938)};
	/**It's really worrying. Where has the princess gone again?*/
	get UI_Story_043():ILanguageElement{return this.getElement(939)};
	/**Protect His Majesty, the King!*/
	get UI_Story_044():ILanguageElement{return this.getElement(940)};
	/**How much longer do I have to stand, meow?*/
	get UI_Story_045():ILanguageElement{return this.getElement(941)};
	/**The distant threat is approaching.*/
	get UI_Story_046():ILanguageElement{return this.getElement(942)};
	/**Welcome everyone to Jelly Castle!*/
	get UI_Story_047():ILanguageElement{return this.getElement(943)};
	/**Training, training, rigorous training!*/
	get UI_Story_048():ILanguageElement{return this.getElement(944)};
	/**Without the king's orders, entry is not allowed.*/
	get UI_Story_049():ILanguageElement{return this.getElement(945)};
	/**Dad doesn't care about me at all.*/
	get UI_Story_050():ILanguageElement{return this.getElement(946)};
	/**Speak with <color=#red>Meow Meow Minister</color>.*/
	get UI_Story_051():ILanguageElement{return this.getElement(947)};
	/**Even within the castle, I've heard your name growing louder.*/
	get UI_Story_052():ILanguageElement{return this.getElement(948)};
	/**Our Jelly Island is about to face an unprecedented crisis. Just a few days ago, the scouts reported that distant enemies are becoming restless.*/
	get UI_Story_053():ILanguageElement{return this.getElement(949)};
	/**We need you to step up and contribute to Jelly Island, to lend a helping hand in this time of need.*/
	get UI_Story_054():ILanguageElement{return this.getElement(950)};
	/**But the key to the castle's basement was destroyed into pieces by the enemy and lost within the castle. Could you please search within the castle to find ten key fragments?*/
	get UI_Story_055():ILanguageElement{return this.getElement(951)};
	/**I'll be waiting on the first floor of the castle for your good news.*/
	get UI_Story_056():ILanguageElement{return this.getElement(952)};
	/**That's fantastic! Now we have a key that can open the basement door.*/
	get UI_Story_057():ILanguageElement{return this.getElement(953)};
	/**But little jelly, the basement is extremely dangerous. To prevent you from being sliced into jelly strips, your abilities need to be tested.*/
	get UI_Story_058():ILanguageElement{return this.getElement(954)};
	/**Go to the castle and find other jellies, complete all their tasks, and prove your abilities.*/
	get UI_Story_059():ILanguageElement{return this.getElement(955)};
	/**Walls Coming*/
	get Level_023():ILanguageElement{return this.getElement(956)};
	/**Yes*/
	get UI_Story_060():ILanguageElement{return this.getElement(957)};
	/**No*/
	get UI_Story_061():ILanguageElement{return this.getElement(958)};
	/**My favorite meat bone is missing. It must have been hidden by Meow Meow Minister. Could you please help me find it?*/
	get UI_Story_062():ILanguageElement{return this.getElement(959)};
	/**Meow Meow wouldn't hide the dumb dog's meat bone next to the cannon.*/
	get UI_Story_063():ILanguageElement{return this.getElement(960)};
	/**Your Majesty is already waiting for you on the first floor of the castle.*/
	get UI_Story_064():ILanguageElement{return this.getElement(961)};
	/**But His Majesty is already waiting for you, don't keep him waiting, meow!*/
	get UI_Story_065():ILanguageElement{return this.getElement(962)};
	/**Hmm... I don't see anything worthy of His Majesty's summons, meow.*/
	get UI_Story_066():ILanguageElement{return this.getElement(963)};
	/**The key fragment? Meow Meow doesn't know where it is.*/
	get UI_Story_067():ILanguageElement{return this.getElement(964)};
	/**Key fragments? I think I saw some around the castle.*/
	get UI_Story_068():ILanguageElement{return this.getElement(965)};
	/**Level Up*/
	get UI_Levelup_01():ILanguageElement{return this.getElement(966)};
	/**Dear Jellies,

Observant players may have already noticed the <color=#FFB400><size=28>Rank Badge</size></color> appearing before names.
Yes! This is our newly introduced <color=#FFB400><size=28>Ranking System</size></color>!

If you're experienced in matches, no worries!
We've got <color=#FFB400><size=28>Experience Auto-Conversion</size></color> for our seasoned players.
Based on your past match history, you'll automatically receive corresponding experience~
Secret tip: Winning in each match gets you more experience! So, join more matches!

We hope you enjoy our game's ranking system, finding your own fun and achievements!
Thank you all!*/
	get UI_Levelup_02():ILanguageElement{return this.getElement(967)};
	/**Test to Reflexes*/
	get Level_024():ILanguageElement{return this.getElement(968)};
	/**Cube Roaming*/
	get Level_025():ILanguageElement{return this.getElement(969)};
	/**Who wanna team up with me?*/
	get Txt_ChatWord_12():ILanguageElement{return this.getElement(970)};
	/**Can you dress like me?*/
	get Txt_ChatWord_13():ILanguageElement{return this.getElement(971)};
	/**Take me with you!*/
	get Txt_ChatWord_14():ILanguageElement{return this.getElement(972)};
	/**Hey there, little jelly! Here with me, you can create and delete jelly squad titles. Use the jelly squad banner next to it to share your title with friends. Go ahead and use the same title with your friends!*/
	get UI_Story_069():ILanguageElement{return this.getElement(973)};
	/**Delete*/
	get TIPS_TITLE_DEL():ILanguageElement{return this.getElement(974)};
	/**Created with @ coins?*/
	get TIPS_TITLE_COIN_CHECK():ILanguageElement{return this.getElement(975)};
	/**Insufficient coins to create!*/
	get TIPS_TITLE_COIN():ILanguageElement{return this.getElement(976)};
	/**You can't use the jelly squad banner without a title. Come to me to create one or have a jelly with a title pass it to you.*/
	get UI_Story_070():ILanguageElement{return this.getElement(977)};
	/**Enter the activity stage {0} times.*/
	get QUEST_19():ILanguageElement{return this.getElement(978)};
	/**Reach Lv{0}.*/
	get QUEST_20():ILanguageElement{return this.getElement(979)};
	/**Acquire the title {0} times.*/
	get QUEST_21():ILanguageElement{return this.getElement(980)};
	/**Open the Treasure box in the lobby {0} times.*/
	get QUEST_22():ILanguageElement{return this.getElement(981)};
	/**Catch {0} fish.*/
	get QUEST_23():ILanguageElement{return this.getElement(982)};
	/**Pick up {0} beach items.*/
	get QUEST_24():ILanguageElement{return this.getElement(983)};
	/**Participate in {0} story mode.*/
	get QUEST_25():ILanguageElement{return this.getElement(984)};
	/**Throw {0} water bombs in the lobby.*/
	get QUEST_26():ILanguageElement{return this.getElement(985)};
	/**Shot {0} times with a water gun in the lobby.*/
	get QUEST_27():ILanguageElement{return this.getElement(986)};
	/**Waving an ice cream stick {0} times in the lobby.*/
	get QUEST_28():ILanguageElement{return this.getElement(987)};
	/**Like {0} times while watching.*/
	get QUEST_29():ILanguageElement{return this.getElement(988)};
	/**Introduction*/
	get UI_LOBBY_173():ILanguageElement{return this.getElement(989)};
	/**The password refreshes every day! Tap 'Start Game,' and passwords will drop randomly during the level. If you don't have all the passwords, you can ask others or try your luck in the game community!*/
	get UI_LOBBY_174():ILanguageElement{return this.getElement(990)};
	/**Password*/
	get UI_LOBBY_175():ILanguageElement{return this.getElement(991)};
	/**Input*/
	get UI_LOBBY_176():ILanguageElement{return this.getElement(992)};
	/**Exit*/
	get UI_LOBBY_177():ILanguageElement{return this.getElement(993)};
	/**In a draw, please exit later.*/
	get UI_LOBBY_178():ILanguageElement{return this.getElement(994)};
	/**A flash! Today's {0}th code is {1}! */
	get UI_LOBBY_179():ILanguageElement{return this.getElement(995)};
	/**Rewards Claimed*/
	get UI_LOBBY_180():ILanguageElement{return this.getElement(996)};
	/**Treasure Chest*/
	get UI_LOBBY_181():ILanguageElement{return this.getElement(997)};
	/**Password incorrect.*/
	get UI_LOBBY_182():ILanguageElement{return this.getElement(998)};
	/**Restart*/
	get Obby_017():ILanguageElement{return this.getElement(999)};
	/**Flume Ride*/
	get Level_017():ILanguageElement{return this.getElement(1000)};
	/**Dialogue*/
	get Title_Chat():ILanguageElement{return this.getElement(1001)};
	/**Panda Hermit*/
	get Title_Npc_Name():ILanguageElement{return this.getElement(1002)};
	/**Tap to continue.*/
	get Title_NPC_CHAT_CONTINIU():ILanguageElement{return this.getElement(1003)};
	/**Create a Title*/
	get Title_Create_Btn():ILanguageElement{return this.getElement(1004)};
	/**Accept Titles?*/
	get Title_ResOther():ILanguageElement{return this.getElement(1005)};
	/**Enter Password*/
	get UI_LOBBY_183():ILanguageElement{return this.getElement(1006)};
	/**Did the king send you, little jellybean? The enemy from afar is slowly closing in, and we need to gather everything that can boost our strength. There are some ancient treasures scattered outside the castle. Could you help me bring them back?*/
	get UI_Story_086():ILanguageElement{return this.getElement(1007)};
	/**That's fantastic, little jellybean! You've collected all the treasures. Now, with these, we have even more confidence in facing the threat!*/
	get UI_Story_087():ILanguageElement{return this.getElement(1008)};
	/**My dad doesn't seem to like me very much, and he doesn't care that my teddy bear is lost. I think it might have run away to the forest. Can you help me find it?*/
	get UI_Story_088():ILanguageElement{return this.getElement(1009)};
	/**That's amazing! You helped me find my most beloved teddy bear! I want to give you all my pocket money as a thank you, little jellybean!*/
	get UI_Story_089():ILanguageElement{return this.getElement(1010)};
	/**Help? I just want to train. If you insist on helping me, then help me find some handy weapons in the castle.*/
	get UI_Story_090():ILanguageElement{return this.getElement(1011)};
	/**Thank you, with these weapons, I'm sure I can train even better.*/
	get UI_Story_071():ILanguageElement{return this.getElement(1012)};
	/**Hey, did the king call you to help us? Bunny just lost my bell. Could you help me look for it?*/
	get UI_Story_072():ILanguageElement{return this.getElement(1013)};
	/**Thank you, little jellybean. You're the most amazing little jellybean in the whole world!*/
	get UI_Story_073():ILanguageElement{return this.getElement(1014)};
	/**Talk to Lookout Panda*/
	get UI_Story_074():ILanguageElement{return this.getElement(1015)};
	/**Talk to Jelly Princess*/
	get UI_Story_075():ILanguageElement{return this.getElement(1016)};
	/**Talk to Hardworking Pup*/
	get UI_Story_076():ILanguageElement{return this.getElement(1017)};
	/**Talk to Welcoming Bunny*/
	get UI_Story_077():ILanguageElement{return this.getElement(1018)};
	/**Search for treasure outside the castle.*/
	get UI_Story_078():ILanguageElement{return this.getElement(1019)};
	/**Search for the teddy bear in the forest.*/
	get UI_Story_079():ILanguageElement{return this.getElement(1020)};
	/**Find weapons in the castle.*/
	get UI_Story_080():ILanguageElement{return this.getElement(1021)};
	/**Looking for bells in the castle.*/
	get UI_Story_081():ILanguageElement{return this.getElement(1022)};
	/**Back to Jelly Island*/
	get UI_Story_091():ILanguageElement{return this.getElement(1023)};
	/**Haven't found all the treasures yet? Try looking from a higher place.*/
	get UI_Story_082():ILanguageElement{return this.getElement(1024)};
	/**Haven't found the teddy bear? It must have gone to the forest outside the castle for sure!*/
	get UI_Story_083():ILanguageElement{return this.getElement(1025)};
	/**The weapons are around the castle! Search carefully!*/
	get UI_Story_084():ILanguageElement{return this.getElement(1026)};
	/**It seems the bell got blown by the wind to a high place inside the castle.*/
	get UI_Story_085():ILanguageElement{return this.getElement(1027)};
	/**Green Hanfu Candy*/
	get SKIN_NAME_2061():ILanguageElement{return this.getElement(1028)};
	/**Purple Hanfu Candy*/
	get SKIN_NAME_2062():ILanguageElement{return this.getElement(1029)};
	/**School uniform Candy*/
	get SKIN_NAME_2080():ILanguageElement{return this.getElement(1030)};
	/**Fill in the title below*/
	get TIPS_TITLE_1():ILanguageElement{return this.getElement(1031)};
	/**Ranking System Announcement*/
	get UI_Levelup_03():ILanguageElement{return this.getElement(1032)};
	/**sign your title*/
	get TITLE_1032():ILanguageElement{return this.getElement(1033)};
	/**content non-compliance*/
	get TITLE_1033():ILanguageElement{return this.getElement(1034)};
	/**Delete Title*/
	get TITLE_1034():ILanguageElement{return this.getElement(1035)};
	/**Jelly King*/
	get UI_Story_092():ILanguageElement{return this.getElement(1036)};
	/**Captain Dog*/
	get UI_Story_093():ILanguageElement{return this.getElement(1037)};
	/**Meow Minister*/
	get UI_Story_094():ILanguageElement{return this.getElement(1038)};
	/**Panda Explorer*/
	get UI_Story_095():ILanguageElement{return this.getElement(1039)};
	/**Welcome Rabbit*/
	get UI_Story_096():ILanguageElement{return this.getElement(1040)};
	/**Effort Dog*/
	get UI_Story_097():ILanguageElement{return this.getElement(1041)};
	/**Dog Guards*/
	get UI_Story_098():ILanguageElement{return this.getElement(1042)};
	/**Jelly Princess*/
	get UI_Story_099():ILanguageElement{return this.getElement(1043)};
	/**Confirm to exit the game and return to the lobby?*/
	get UI_Watch_01():ILanguageElement{return this.getElement(1044)};
	/**Confirm to exit the team and return to the lobby?*/
	get UI_Watch_02():ILanguageElement{return this.getElement(1045)};
	/**Space-time distortion*/
	get Level_027():ILanguageElement{return this.getElement(1046)};
	/**Survive till the end*/
	get UI_LOBBY_ActivityLevel3():ILanguageElement{return this.getElement(1047)};
	/**Do you want to enable Toilet Man Parkour?*/
	get UI_LOBBY_184():ILanguageElement{return this.getElement(1048)};
	/**Some teammates haven't reached level 5 yet, they need to reach level 5 to unlock the level*/
	get UI_LOBBY_185():ILanguageElement{return this.getElement(1049)};
	/**You need to reach level 5 to unlock Toilet Man Parkour*/
	get UI_LOBBY_186():ILanguageElement{return this.getElement(1050)};
	/**No interactable player in current range*/
	get HUMAN_INTER_NOBODY():ILanguageElement{return this.getElement(1051)};
	/**Request sent to nearby players successfully, waiting for their acceptance*/
	get HUMAN_INTER_PASSMSG():ILanguageElement{return this.getElement(1052)};
	/**Evacuate*/
	get HUMAN_INTER_LEAVE():ILanguageElement{return this.getElement(1053)};
	/**Drag player*/
	get ITEM_NAME_30016():ILanguageElement{return this.getElement(1054)};
	/**Two-person spin*/
	get ITEM_NAME_30017():ILanguageElement{return this.getElement(1055)};
	/**Hold Hands*/
	get ITEM_NAME_30018():ILanguageElement{return this.getElement(1056)};
	/**Refuse (@)*/
	get HUMAN_INTER_TIMER():ILanguageElement{return this.getElement(1057)};
	/**Cannot perform two-person actions in this state*/
	get HUMAN_INTER_UNABLE():ILanguageElement{return this.getElement(1058)};
	/**Help the princess find the short-haired cat*/
	get UI_Story_100():ILanguageElement{return this.getElement(1059)};
	/**Bring the short-haired cat to the princess*/
	get UI_Story_101():ILanguageElement{return this.getElement(1060)};
	/**Find the Angel Cat*/
	get UI_Story_102():ILanguageElement{return this.getElement(1061)};
	/**Bring the Angel Cat to the princess*/
	get UI_Story_103():ILanguageElement{return this.getElement(1062)};
	/**Find the pet egg*/
	get UI_Story_104():ILanguageElement{return this.getElement(1063)};
	/**Bring the pet egg to the lookout panda*/
	get UI_Story_105():ILanguageElement{return this.getElement(1064)};
	/**Defeat the Sky Vulture*/
	get UI_Story_106():ILanguageElement{return this.getElement(1065)};
	/**Go to the lookout panda to collect your reward*/
	get UI_Story_107():ILanguageElement{return this.getElement(1066)};
	/**Little Black*/
	get UI_Story_108():ILanguageElement{return this.getElement(1067)};
	/**What's glowing by the river?*/
	get UI_Story_109():ILanguageElement{return this.getElement(1068)};
	/**What? A key?*/
	get UI_Story_110():ILanguageElement{return this.getElement(1069)};
	/**I've seen a few in the nearby sewage pond, not sure if it's what you're looking for*/
	get UI_Story_111():ILanguageElement{return this.getElement(1070)};
	/**Hello, I'm Little Black*/
	get UI_Story_112():ILanguageElement{return this.getElement(1071)};
	/**My kitten is missing, can you help me find it?*/
	get UI_Story_113():ILanguageElement{return this.getElement(1072)};
	/**They are a bit naughty! It seems they ran to a high place*/
	get UI_Story_114():ILanguageElement{return this.getElement(1073)};
	/**Thank you, can you come and help me tomorrow?*/
	get UI_Story_115():ILanguageElement{return this.getElement(1074)};
	/**My cat needs your help!*/
	get UI_Story_116():ILanguageElement{return this.getElement(1075)};
	/**What? The princess's short-haired cat?*/
	get UI_Story_117():ILanguageElement{return this.getElement(1076)};
	/**Is it the one that climbs high?*/
	get UI_Story_118():ILanguageElement{return this.getElement(1077)};
	/**Always feel there is something at the top of the castle!*/
	get UI_Story_119():ILanguageElement{return this.getElement(1078)};
	/**Many vultures in the sky are threatening our castle!*/
	get UI_Story_120():ILanguageElement{return this.getElement(1079)};
	/**Brave Jelly, use the cannon to eliminate them!*/
	get UI_Story_121():ILanguageElement{return this.getElement(1080)};
	/**Amazing, can you come and help me tomorrow?*/
	get UI_Story_122():ILanguageElement{return this.getElement(1081)};
	/**There are still vultures attacking us!*/
	get UI_Story_123():ILanguageElement{return this.getElement(1082)};
	/**I miss my Angel Cat so much. It seems to be flying around above the castle.*/
	get UI_Story_124():ILanguageElement{return this.getElement(1083)};
	/**Can you help me find it and bring it back?*/
	get UI_Story_125():ILanguageElement{return this.getElement(1084)};
	/**Thank you, Jelly. Angel Cat is so naughty, I don't know if it will run away tomorrow*/
	get UI_Story_126():ILanguageElement{return this.getElement(1085)};
	/**Angel Cat seems to be flying around above the castle*/
	get UI_Story_127():ILanguageElement{return this.getElement(1086)};
	/**Can you help me collect 10 pet eggs around the big tree on the opposite side?*/
	get UI_Story_128():ILanguageElement{return this.getElement(1087)};
	/**Thank you for your help, Jelly! Can you come and help me tomorrow?*/
	get UI_Story_129():ILanguageElement{return this.getElement(1088)};
	/**Think about how to get up!*/
	get UI_Story_130():ILanguageElement{return this.getElement(1089)};
	/**Perhaps you can use some flying props*/
	get UI_Story_131():ILanguageElement{return this.getElement(1090)};
	/**Return to the flag point*/
	get UI_Story_132():ILanguageElement{return this.getElement(1091)};
	/**Unlock after reaching level {0}!*/
	get UI_LOBBY_187():ILanguageElement{return this.getElement(1092)};
	/**Some teammates have not reached level {0} yet!*/
	get UI_LOBBY_188():ILanguageElement{return this.getElement(1093)};
	/**Chocolate Hanfu*/
	get SKIN_NAME_2063():ILanguageElement{return this.getElement(1094)};
	/**Milk Hanfu*/
	get SKIN_NAME_2064():ILanguageElement{return this.getElement(1095)};
	/**Sweet Angel*/
	get SKIN_NAME_3011():ILanguageElement{return this.getElement(1096)};
	/**Fragrant Angel*/
	get SKIN_NAME_3012():ILanguageElement{return this.getElement(1097)};
	/**Wasabi Demon*/
	get SKIN_NAME_3021():ILanguageElement{return this.getElement(1098)};
	/**Ice Demon*/
	get SKIN_NAME_3022():ILanguageElement{return this.getElement(1099)};
	/**The door is open!*/
	get UI_ACTIVITY_1():ILanguageElement{return this.getElement(1100)};
	/**Find the kitten to pass!*/
	get UI_ACTIVITY_2():ILanguageElement{return this.getElement(1101)};
	/**Kitten found!*/
	get UI_ACTIVITY_3():ILanguageElement{return this.getElement(1102)};
	/**Welcome to the new season!*/
	get UI_Season_Guid_01():ILanguageElement{return this.getElement(1103)};
	/**Magic Season*/
	get UI_Season_Guid_02():ILanguageElement{return this.getElement(1104)};
	/**Water Park*/
	get UI_Season_Guid_03():ILanguageElement{return this.getElement(1105)};
	/**Sent you a buddy action request!*/
	get HUMAN_INTER_Guid_01():ILanguageElement{return this.getElement(1106)};
	/**My six little cats are mischievous and got lost while playing! Can you help me find them?*/
	get UI_MAZE_1():ILanguageElement{return this.getElement(1107)};
	/**Go along the path ahead and help me retrieve all the little cats!*/
	get UI_MAZE_2():ILanguageElement{return this.getElement(1108)};
	/**There will be more and more challenging mazes ahead, be careful not to get lost!*/
	get UI_MAZE_3():ILanguageElement{return this.getElement(1109)};
	/**The first maze is quite simple, go ahead and give it a try!*/
	get UI_MAZE_4():ILanguageElement{return this.getElement(1110)};
	/**Wow! You're really amazing! But it's going to get more and more challenging ahead!*/
	get UI_MAZE_5():ILanguageElement{return this.getElement(1111)};
	/**There's a kitten that got lost in the next maze! Find it to escape the maze!*/
	get UI_MAZE_6():ILanguageElement{return this.getElement(1112)};
	/**Thanks!*/
	get UI_MAZE_7():ILanguageElement{return this.getElement(1113)};
	/**Did you find my kitten?*/
	get UI_MAZE_8():ILanguageElement{return this.getElement(1114)};
	/**you haven't found my kitten yet! Go and search again!*/
	get UI_MAZE_9():ILanguageElement{return this.getElement(1115)};
	/**The correct room can help you reach the next stop, while the wrong room will make you go in circles! Give it a try!*/
	get UI_MAZE_10():ILanguageElement{return this.getElement(1116)};
	/**Remember to find my cat before you can exit the maze!*/
	get UI_MAZE_11():ILanguageElement{return this.getElement(1117)};
	/**There are more rooms now! Don't get lost!*/
	get UI_MAZE_12():ILanguageElement{return this.getElement(1118)};
	/**Another maze, remember to find my kitten before you can exit the maze!*/
	get UI_MAZE_13():ILanguageElement{return this.getElement(1119)};
	/**The last and the most challenging maze! Remember to find my kitten before you can exit the maze!*/
	get UI_MAZE_14():ILanguageElement{return this.getElement(1120)};
	/**Find the kitten and locate the exit to leave!*/
	get UI_MAZE_15():ILanguageElement{return this.getElement(1121)};
	/**Thank you for helping me find all the kittens!You can return to the hall!*/
	get UI_MAZE_16():ILanguageElement{return this.getElement(1122)};
	/**Thank you for helping me find it. You can proceed to the next level now!*/
	get UI_MAZE_17():ILanguageElement{return this.getElement(1123)};
	/**Go to the next level!*/
	get UI_MAZE_18():ILanguageElement{return this.getElement(1124)};
	/**OK*/
	get UI_MAZE_19():ILanguageElement{return this.getElement(1125)};
	/**OK！*/
	get UI_MAZE_20():ILanguageElement{return this.getElement(1126)};
	/**I'm not afraid!*/
	get UI_MAZE_21():ILanguageElement{return this.getElement(1127)};
	/**I will find it.*/
	get UI_MAZE_22():ILanguageElement{return this.getElement(1128)};
	/**Leave*/
	get UI_MAZE_23():ILanguageElement{return this.getElement(1129)};
	/**Give him.*/
	get UI_MAZE_24():ILanguageElement{return this.getElement(1130)};
	/**Got it.*/
	get UI_MAZE_25():ILanguageElement{return this.getElement(1131)};
	/**You're welcome!*/
	get UI_MAZE_26():ILanguageElement{return this.getElement(1132)};
	/**I'm more than happy to help.*/
	get UI_MAZE_27():ILanguageElement{return this.getElement(1133)};
	/**Previous Point*/
	get UI_MAZE_28():ILanguageElement{return this.getElement(1134)};
	/**Back to Lobby*/
	get UI_MAZE_29():ILanguageElement{return this.getElement(1135)};
	/**Teleport entrance! Maze run!*/
	get UI_MAZE_30():ILanguageElement{return this.getElement(1136)};
	/**Cake Path*/
	get Level_021():ILanguageElement{return this.getElement(1137)};
	/**Congratulations!*/
	get UI_LOBBY_189():ILanguageElement{return this.getElement(1138)};
	/**Congratulations on reaching the end of the super high-speed run! You can get the crown now! It will stay on your head until 12 o'clock tonight. You can come back here tomorrow to get it again~*/
	get UI_LOBBY_190():ILanguageElement{return this.getElement(1139)};
	/**Maze exploration*/
	get UI_LOBBY_ActivityLevel2():ILanguageElement{return this.getElement(1140)};
	/**Mint Wizard*/
	get SKIN_NAME_2090():ILanguageElement{return this.getElement(1141)};
	/**Sweet Orange Wizard*/
	get SKIN_NAME_2091():ILanguageElement{return this.getElement(1142)};
	/**Milk Candy Witch*/
	get SKIN_NAME_3040():ILanguageElement{return this.getElement(1143)};
	/**Raspberry Witch*/
	get SKIN_NAME_3041():ILanguageElement{return this.getElement(1144)};
	/**magic circle*/
	get Level_031():ILanguageElement{return this.getElement(1145)};
	/**Restart Game?*/
	get Obby_018():ILanguageElement{return this.getElement(1146)};
	/**no key*/
	get UI_Story_133():ILanguageElement{return this.getElement(1147)};
	/**Get a key!*/
	get UI_Story_134():ILanguageElement{return this.getElement(1148)};
	/**Wrong key*/
	get UI_Story_135():ILanguageElement{return this.getElement(1149)};
	/**I already have the key! Do you want to replace?*/
	get UI_Story_136():ILanguageElement{return this.getElement(1150)};
	/**Replaced a key!*/
	get UI_Story_137():ILanguageElement{return this.getElement(1151)};
	/**Mama Cat*/
	get UI_MAZE_31():ILanguageElement{return this.getElement(1152)};
	/**Enter Title*/
	get UI_Story_138():ILanguageElement{return this.getElement(1153)};
	/**Survival Attempts*/
	get UI_ACTIVITY3_1():ILanguageElement{return this.getElement(1154)};
	/**You Fell!*/
	get UI_ACTIVITY3_2():ILanguageElement{return this.getElement(1155)};
	/**Game starts in {0}s!*/
	get UI_ACTIVITY3_3():ILanguageElement{return this.getElement(1156)};
	/**The current round is almost over! Please wait a moment.*/
	get UI_ACTIVITY3_4():ILanguageElement{return this.getElement(1157)};
	/**Jump over the railing.*/
	get UI_ACTIVITY3_5():ILanguageElement{return this.getElement(1158)};
	/**Next time, try to survive longer.*/
	get UI_ACTIVITY3_6():ILanguageElement{return this.getElement(1159)};
	/**No one survived...*/
	get UI_ACTIVITY3_7():ILanguageElement{return this.getElement(1160)};
	/**Start!*/
	get UI_ACTIVITY3_8():ILanguageElement{return this.getElement(1161)};
	/**Remaining:*/
	get UI_ACTIVITY3_9():ILanguageElement{return this.getElement(1162)};
	/**Magic Array*/
	get Level_022():ILanguageElement{return this.getElement(1163)};
	/**Draw ×5*/
	get UI_Draw_1():ILanguageElement{return this.getElement(1164)};
	/**{0}s to WIN!*/
	get UI_ACTIVITY3_10():ILanguageElement{return this.getElement(1165)};
	/**Wand Flight*/
	get Level_032():ILanguageElement{return this.getElement(1166)};
	/**Owned items have been converted into candies.*/
	get UI_Draw_Des_1():ILanguageElement{return this.getElement(1167)};
	/**Dodge the Ghosts*/
	get Level_026():ILanguageElement{return this.getElement(1168)};
	/**Score +*/
	get UI_LAN_280():ILanguageElement{return this.getElement(1169)};
	/**I am the King of Jelly Islands, adorable little jelly. How can I help you?*/
	get UI_Story2_1():ILanguageElement{return this.getElement(1170)};
	/**Is there anything you want from me? Meow?*/
	get UI_Story2_2():ILanguageElement{return this.getElement(1171)};
	/**I am Captain Woof, safeguarding the castle's safety. What can I do for you, woof?*/
	get UI_Story2_3():ILanguageElement{return this.getElement(1172)};
	/**To create the most delicious dishes, Bunny is dedicated to research.*/
	get UI_Story2_4():ILanguageElement{return this.getElement(1173)};
	/**Can I help you?*/
	get UI_Story2_5():ILanguageElement{return this.getElement(1174)};
	/**Jelly Islands are a place for everlasting joy and happiness.*/
	get UI_Story2_6():ILanguageElement{return this.getElement(1175)};
	/**Did you also participate in Jelly Run? Back in the day, I was the champion of Jelly Run.*/
	get UI_Story2_7():ILanguageElement{return this.getElement(1176)};
	/**The Jelly Islands are made up of eight large islands. Managing so many places in the Jelly Islands is a bit tiring.*/
	get UI_Story2_8():ILanguageElement{return this.getElement(1177)};
	/**My children and subjects used to be by my side. Now they are all away from me.*/
	get UI_Story2_9():ILanguageElement{return this.getElement(1178)};
	/**Jelly Castle hides many places and treasures I don't know about.*/
	get UI_Story2_10():ILanguageElement{return this.getElement(1179)};
	/**I am the world's smartest cat. Captain Woof is the world's biggest fool. Do you agree, meow?*/
	get UI_Story2_11():ILanguageElement{return this.getElement(1180)};
	/**Even the king is not as smart as me. Do you agree, meow?*/
	get UI_Story2_12():ILanguageElement{return this.getElement(1181)};
	/**Captain Woof is too foolish, the world's biggest fool, meow. Do you agree?*/
	get UI_Story2_13():ILanguageElement{return this.getElement(1182)};
	/**Woof, don't chat with me. I need to focus on guarding the castle.*/
	get UI_Story2_14():ILanguageElement{return this.getElement(1183)};
	/**How many unknown places are there in the castle? Woof.*/
	get UI_Story2_15():ILanguageElement{return this.getElement(1184)};
	/**Minister Meow always says I'm foolish. Am I really that foolish?*/
	get UI_Story2_16():ILanguageElement{return this.getElement(1185)};
	/**Looks like you're not a fool, meow. Let me tell you a secret: there's an underground floor in the castle.*/
	get UI_Story2_17():ILanguageElement{return this.getElement(1186)};
	/**Seems like you're a big fool, meow.*/
	get UI_Story2_18():ILanguageElement{return this.getElement(1187)};
	/**Do you know why I say this? Because I know where the king's hidden room is.*/
	get UI_Story2_19():ILanguageElement{return this.getElement(1188)};
	/**Right in this room. But only smart people know.*/
	get UI_Story2_20():ILanguageElement{return this.getElement(1189)};
	/**I don't want to talk to fools, meow.*/
	get UI_Story2_21():ILanguageElement{return this.getElement(1190)};
	/**Captain Woof is too foolish, really too foolish, meow!*/
	get UI_Story2_22():ILanguageElement{return this.getElement(1191)};
	/**You're not allowed to call Captain Woof foolish, only I can say it.*/
	get UI_Story2_23():ILanguageElement{return this.getElement(1192)};
	/**Captain Woof is really foolish. I hate him the most, meow!*/
	get UI_Story2_24():ILanguageElement{return this.getElement(1193)};
	/**Alright, it seems I'm a fool.*/
	get UI_Story2_25():ILanguageElement{return this.getElement(1194)};
	/**Woof, I knew she was lying to me.*/
	get UI_Story2_26():ILanguageElement{return this.getElement(1195)};
	/**Do you know there are four ways to make a poached egg?*/
	get UI_Story2_27():ILanguageElement{return this.getElement(1196)};
	/**I want to make the world's most delicious dishes.*/
	get UI_Story2_28():ILanguageElement{return this.getElement(1197)};
	/**Delicious dishes can bring happiness. Do you agree?*/
	get UI_Story2_29():ILanguageElement{return this.getElement(1198)};
	/**，*/
	get UI_Story2_30():ILanguageElement{return this.getElement(1199)};
	/**Nice to meet you, newly summoned jelly. I am the King of Jelly Castle. I saw your outstanding performance in Candy Party.*/
	get UI_Story2_31():ILanguageElement{return this.getElement(1200)};
	/**I called you here because Jelly World is facing difficulties. I believe you can ask Minister Meow for details.*/
	get UI_Story2_32():ILanguageElement{return this.getElement(1201)};
	/**Are you the famous jelly lately? You don't look particularly special.*/
	get UI_Story2_33():ILanguageElement{return this.getElement(1202)};
	/**The king asked you to inquire with me, right? Strange things have been happening in the Jelly Islands because of energy deficiency.*/
	get UI_Story2_34():ILanguageElement{return this.getElement(1203)};
	/**We need you to collect jelly energy to keep the world running normally. I will give you an Energy Collector. Now, you can complete challenges, tasks and even collect energy on the map to boost the energy progress bar.*/
	get UI_Story2_35():ILanguageElement{return this.getElement(1204)};
	/**When the bar is complete, you can go to the pier to travel to the next area.*/
	get UI_Story2_36():ILanguageElement{return this.getElement(1205)};
	/**Do you need me to repeat that?*/
	get UI_Story2_37():ILanguageElement{return this.getElement(1206)};
	/**Agree*/
	get UI_Story2_38():ILanguageElement{return this.getElement(1207)};
	/**Disagree*/
	get UI_Story2_39():ILanguageElement{return this.getElement(1208)};
	/**Where is it?*/
	get UI_Story2_40():ILanguageElement{return this.getElement(1209)};
	/**I don't want to know that.*/
	get UI_Story2_41():ILanguageElement{return this.getElement(1210)};
	/**Can you please repeat that?*/
	get UI_Story2_42():ILanguageElement{return this.getElement(1211)};
	/**I understand.*/
	get UI_Story2_43():ILanguageElement{return this.getElement(1212)};
	/**Now, please help me with a task as training. Collect six cat balls in the Parliament Hall, then bring them to me.*/
	get UI_Story2_44():ILanguageElement{return this.getElement(1213)};
	/**Haven't found all the cat balls for me yet? They're right here in the hall, meow.*/
	get UI_Story2_45():ILanguageElement{return this.getElement(1214)};
	/**You found all the cat balls so quickly! Amazing! I heard the dumb dog also has some troubles. Ask Captain Woof if he needs help.*/
	get UI_Story2_46():ILanguageElement{return this.getElement(1215)};
	/**Go ask Captain Woof, meow.*/
	get UI_Story2_47():ILanguageElement{return this.getElement(1216)};
	/**Woof woof! Did Captain Meow tell you to find me for a task?*/
	get UI_Story2_48():ILanguageElement{return this.getElement(1217)};
	/**I happen to be very hungry. Can you please go to the kitchen and ask Chef Bunny to make me a bowl of meat bone soup?*/
	get UI_Story2_49():ILanguageElement{return this.getElement(1218)};
	/**No problem.*/
	get UI_Story2_50():ILanguageElement{return this.getElement(1219)};
	/**I'm busy right now.*/
	get UI_Story2_51():ILanguageElement{return this.getElement(1220)};
	/**_x000d_
Woof, thank you! I'll be here waiting for your good news, woof!*/
	get UI_Story2_52():ILanguageElement{return this.getElement(1221)};
	/**Woof, alright.*/
	get UI_Story2_53():ILanguageElement{return this.getElement(1222)};
	/**You haven't found Chef Bunny yet? The kitchen is on the right side of the castle's dining room.*/
	get UI_Story2_54():ILanguageElement{return this.getElement(1223)};
	/**Bone soup? No problem!*/
	get UI_Story2_55():ILanguageElement{return this.getElement(1224)};
	/**But there's not enough meat bones in the kitchen right now. Can you go to the restaurant and collect some meat bones for me?*/
	get UI_Story2_56():ILanguageElement{return this.getElement(1225)};
	/**Great! You've collected all the bones. Now, I can make meat bone soup for Captain Woof. Just wait a moment.*/
	get UI_Story2_57():ILanguageElement{return this.getElement(1226)};
	/**Done! It's ready. Take it back to Captain Woof!*/
	get UI_Story2_58():ILanguageElement{return this.getElement(1227)};
	/**Little jelly, you've proven your strength. I have a difficult task for you. Besides you, I don't know who can accomplish it.*/
	get UI_Story2_59():ILanguageElement{return this.getElement(1228)};
	/**The princess has been missing for a month. Can you help me find her? Here's the key to her room. You can search for clues there.*/
	get UI_Story2_60():ILanguageElement{return this.getElement(1229)};
	/**The princess's room is on the right side of the second floor.*/
	get UI_Story2_61():ILanguageElement{return this.getElement(1230)};
	/**What? The princess went to the backyard? But the castle's backyard is full of mazes and has been sealed by me for being too dangerous.*/
	get UI_Story2_62():ILanguageElement{return this.getElement(1231)};
	/**In that case, please go to the backyard and find the princess for me.*/
	get UI_Story2_63():ILanguageElement{return this.getElement(1232)};
	/**Woof! Thanks for the meat bone soup! Now, I can guard the castle with a full belly.*/
	get UI_Story2_64():ILanguageElement{return this.getElement(1233)};
	/**You're really amazing, woof! Only you can solve the king's difficulties. Go talk to the king!*/
	get UI_Story2_65():ILanguageElement{return this.getElement(1234)};
	/**Go talk to the king!*/
	get UI_Story2_66():ILanguageElement{return this.getElement(1235)};
	/**Can you go to the restaurant outside to collect some meat bones for me?*/
	get UI_Story2_67():ILanguageElement{return this.getElement(1236)};
	/**I think you should go ask Minister Meow first.*/
	get UI_Story2_68():ILanguageElement{return this.getElement(1237)};
	/**It's done. Take it back to Captain Woof!*/
	get UI_Story2_69():ILanguageElement{return this.getElement(1238)};
	/**Please go to the backyard and find the princess for me.*/
	get UI_Story2_70():ILanguageElement{return this.getElement(1239)};
	/**Cloud City, what is that place? Did Mother go there? I think we should ask Father.*/
	get UI_Story2_71():ILanguageElement{return this.getElement(1240)};
	/**Can you help explore the basement for clues?*/
	get UI_Story2_72():ILanguageElement{return this.getElement(1241)};
	/**I think we should ask Father.*/
	get UI_Story2_73():ILanguageElement{return this.getElement(1242)};
	/**Cloud City?*/
	get UI_Story2_74():ILanguageElement{return this.getElement(1243)};
	/**Have you discovered the secret of the basement?*/
	get UI_Story2_75():ILanguageElement{return this.getElement(1244)};
	/***Sigh* I hide it from the princess because I hope she won't bother with this matter. But the princess found out on her own.*/
	get UI_Story2_76():ILanguageElement{return this.getElement(1245)};
	/**Cloud City is in the sky after the eight islands of Jelly Islands, a place we can't reach.*/
	get UI_Story2_77():ILanguageElement{return this.getElement(1246)};
	/**However, little jelly, if it's you, maybe it's possible.*/
	get UI_Story2_78():ILanguageElement{return this.getElement(1247)};
	/**To go to the next island, you must collect all the jelly energy from the previous island. Collect the jelly energy from all eight islands, and you can open the gate to Cloud City.*/
	get UI_Story2_79():ILanguageElement{return this.getElement(1248)};
	/**Little jelly, can you help me?*/
	get UI_Story2_80():ILanguageElement{return this.getElement(1249)};
	/**Find Jelly King*/
	get UI_Story2_81():ILanguageElement{return this.getElement(1250)};
	/**Talk to Minister Meow*/
	get UI_Story2_82():ILanguageElement{return this.getElement(1251)};
	/**Find cat balls in the castle hall*/
	get UI_Story2_83():ILanguageElement{return this.getElement(1252)};
	/**Talk to Captain Woof*/
	get UI_Story2_84():ILanguageElement{return this.getElement(1253)};
	/**Go to the kitchen to find Chef Bunny*/
	get UI_Story2_85():ILanguageElement{return this.getElement(1254)};
	/**Find meat bones in the castle restaurant*/
	get UI_Story2_86():ILanguageElement{return this.getElement(1255)};
	/**Bring meat bone soup to Captain Woof*/
	get UI_Story2_87():ILanguageElement{return this.getElement(1256)};
	/**Ask about the king's troubles*/
	get UI_Story2_88():ILanguageElement{return this.getElement(1257)};
	/**Go to the princess's bedroom for clues*/
	get UI_Story2_89():ILanguageElement{return this.getElement(1258)};
	/**Go to the castle backyard to find the princess*/
	get UI_Story2_90():ILanguageElement{return this.getElement(1259)};
	/**Explore the basement for clues*/
	get UI_Story2_91():ILanguageElement{return this.getElement(1260)};
	/**Ask the king about the basement*/
	get UI_Story2_92():ILanguageElement{return this.getElement(1261)};
	/**Talk*/
	get UI_Story2_93():ILanguageElement{return this.getElement(1262)};
	/**King's Task*/
	get UI_Story2_94():ILanguageElement{return this.getElement(1263)};
	/**Find Cat Balls*/
	get UI_Story2_95():ILanguageElement{return this.getElement(1264)};
	/**Minister Meow's Task*/
	get UI_Story2_96():ILanguageElement{return this.getElement(1265)};
	/**Make Meat Bone Soup*/
	get UI_Story2_97():ILanguageElement{return this.getElement(1266)};
	/**Find Meat Bones*/
	get UI_Story2_98():ILanguageElement{return this.getElement(1267)};
	/**Meat Bone Soup*/
	get UI_Story2_99():ILanguageElement{return this.getElement(1268)};
	/**Ask About Troubles*/
	get UI_Story2_100():ILanguageElement{return this.getElement(1269)};
	/**Princess's Clues*/
	get UI_Story2_101():ILanguageElement{return this.getElement(1270)};
	/**King's Worry*/
	get UI_Story2_102():ILanguageElement{return this.getElement(1271)};
	/**About the Basement*/
	get UI_Story2_103():ILanguageElement{return this.getElement(1272)};
	/**Cloud City?*/
	get UI_Story2_104():ILanguageElement{return this.getElement(1273)};
	/**Go back and Talk to Minister Meow*/
	get UI_Story2_105():ILanguageElement{return this.getElement(1274)};
	/**Give the meat bones to Chef Bunny*/
	get UI_Story2_106():ILanguageElement{return this.getElement(1275)};
	/**Inform the King about the clues*/
	get UI_Story2_107():ILanguageElement{return this.getElement(1276)};
	/**Talk to the Princess*/
	get UI_Story2_108():ILanguageElement{return this.getElement(1277)};
	/**Future Updates Coming Soon*/
	get UI_Story2_109():ILanguageElement{return this.getElement(1278)};
	/**March 1st, Friday - Mother has been missing for a month. Every time I ask Dad, he dodges the question._x000d_
May 3rd, Tuesday - Found a book about Mother in Dad's secret room. What is Sky City?_x000d_
July 3rd, Saturday - Couldn't resist asking Dad about Mother, but he didn't answer._x000d_
August 1st, Monday - Minister Meow said the last time he saw Mother was in the backyard. I decided to go there for clues.*/
	get UI_Story2_110():ILanguageElement{return this.getElement(1279)};
	/**Innocent dreams turn into islands. 
Emotional dreams become jelly. 
Chaotic thoughts become the ocean. 
Above the islands, there's Cloud City. 
As mortals, we can not reach.*/
	get UI_Story2_111():ILanguageElement{return this.getElement(1280)};
	/**Being a king is not easy.*/
	get UI_Story2_112():ILanguageElement{return this.getElement(1281)};
	/**The princess is missing, and I worry about her.*/
	get UI_Story2_113():ILanguageElement{return this.getElement(1282)};
	/**Don't disturb me, foolish one.*/
	get UI_Story2_114():ILanguageElement{return this.getElement(1283)};
	/**Woof woof, captain, guard the peace, woof.*/
	get UI_Story2_115():ILanguageElement{return this.getElement(1284)};
	/**Cat Ball*/
	get UI_Story2_116():ILanguageElement{return this.getElement(1285)};
	/**Meat Bones*/
	get UI_Story2_117():ILanguageElement{return this.getElement(1286)};
	/**Extra EXP matches: 7 times*/
	get UI_ActivityUpload_01():ILanguageElement{return this.getElement(1287)};
	/**Matches played: {0} times*/
	get UI_ActivityUpload_02():ILanguageElement{return this.getElement(1288)};
	/**Complete matches daily to earn extra season passport EXP！*/
	get UI_ActivityUpload_03():ILanguageElement{return this.getElement(1289)};
	/**Magic Season Experience Extravaganza!*/
	get UI_ActivityUpload_04():ILanguageElement{return this.getElement(1290)};
	/**Passport Giveaway!*/
	get UI_ActivityUpload_05():ILanguageElement{return this.getElement(1291)};
	/**Ice Block Flip*/
	get Level_028():ILanguageElement{return this.getElement(1292)};
	/**Version*/
	get UI_LOBBY_191():ILanguageElement{return this.getElement(1293)};
	/**Water City Magic*/
	get Level_010():ILanguageElement{return this.getElement(1294)};
	/**Survive on the flipping ice blocks!*/
	get UI_LAN_281():ILanguageElement{return this.getElement(1295)};
	/**Go*/
	get UI_SCENE_1():ILanguageElement{return this.getElement(1296)};
	/**Boost*/
	get UI_SCENE_2():ILanguageElement{return this.getElement(1297)};
	/**Airport*/
	get UI_SCENE_3():ILanguageElement{return this.getElement(1298)};
	/**Desert Island*/
	get UI_SCENE_4():ILanguageElement{return this.getElement(1299)};
	/**New Scene*/
	get UI_SCENE_5():ILanguageElement{return this.getElement(1300)};
	/**Tourist Paradise*/
	get UI_SCENE_6():ILanguageElement{return this.getElement(1301)};
	/**Mount Fuji Hotel*/
	get UI_SCENE_7():ILanguageElement{return this.getElement(1302)};
	/**Coming Soon*/
	get UI_SCENE_8():ILanguageElement{return this.getElement(1303)};
	/**Give it a boost, the new scene will arrive faster!*/
	get UI_SCENE_9():ILanguageElement{return this.getElement(1304)};
	/**Boost successfully, the author is working harder!*/
	get UI_SCENE_10():ILanguageElement{return this.getElement(1305)};
	/**Please proceed to the 2F Gate to board the plane to the Tourist Paradise.*/
	get UI_SCENE_11():ILanguageElement{return this.getElement(1306)};
	/**Security*/
	get UI_SCENE_NPC_01():ILanguageElement{return this.getElement(1307)};
	/**Nana*/
	get UI_SCENE_NPC_02():ILanguageElement{return this.getElement(1308)};
	/**Lindsey*/
	get UI_SCENE_NPC_03():ILanguageElement{return this.getElement(1309)};
	/**Staff*/
	get UI_SCENE_NPC_04():ILanguageElement{return this.getElement(1310)};
	/**Staff*/
	get UI_SCENE_NPC_05():ILanguageElement{return this.getElement(1311)};
	/**Melo*/
	get UI_SCENE_NPC_06():ILanguageElement{return this.getElement(1312)};
	/**Lily*/
	get UI_SCENE_NPC_07():ILanguageElement{return this.getElement(1313)};
	/**Louie*/
	get UI_SCENE_NPC_08():ILanguageElement{return this.getElement(1314)};
	/**Flight Attendant*/
	get UI_SCENE_NPC_09():ILanguageElement{return this.getElement(1315)};
	/**Mango Ice*/
	get UI_SCENE_NPC_10():ILanguageElement{return this.getElement(1316)};
	/**Hotel Butler*/
	get UI_SCENE_NPC_11():ILanguageElement{return this.getElement(1317)};
	/**All luggage must go through security.*/
	get UI_SCENE_TALK_01():ILanguageElement{return this.getElement(1318)};
	/**For your safety and the safety of other passengers.*/
	get UI_SCENE_TALK_02():ILanguageElement{return this.getElement(1319)};
	/**Please do not carry prohibited items.*/
	get UI_SCENE_TALK_03():ILanguageElement{return this.getElement(1320)};
	/**Do not crawl into the security conveyor.*/
	get UI_SCENE_TALK_04():ILanguageElement{return this.getElement(1321)};
	/**Hello!*/
	get UI_SCENE_TALK_05():ILanguageElement{return this.getElement(1322)};
	/**Please be mindful of your carry-on luggage.*/
	get UI_SCENE_TALK_06():ILanguageElement{return this.getElement(1323)};
	/**Alright, please turn around.*/
	get UI_SCENE_TALK_07():ILanguageElement{return this.getElement(1324)};
	/**You're good to go now, thank you for your cooperation.*/
	get UI_SCENE_TALK_08():ILanguageElement{return this.getElement(1325)};
	/**Finally, I can have a proper vacation.*/
	get UI_SCENE_TALK_09():ILanguageElement{return this.getElement(1326)};
	/**This time, the destination is Mount Fuji!*/
	get UI_SCENE_TALK_10():ILanguageElement{return this.getElement(1327)};
	/**The hotel has been pre-booked.*/
	get UI_SCENE_TALK_11():ILanguageElement{return this.getElement(1328)};
	/**My luggage is already checked.*/
	get UI_SCENE_TALK_12():ILanguageElement{return this.getElement(1329)};
	/**Not overweight this time!*/
	get UI_SCENE_TALK_13():ILanguageElement{return this.getElement(1330)};
	/**Thankfully, I arrived half an hour early.*/
	get UI_SCENE_TALK_14():ILanguageElement{return this.getElement(1331)};
	/**Otherwise, I could have missed my flight due to traffic.*/
	get UI_SCENE_TALK_15():ILanguageElement{return this.getElement(1332)};
	/**My trip is going to be amazing!*/
	get UI_SCENE_TALK_16():ILanguageElement{return this.getElement(1333)};
	/**I can't wait to take a bath at the hotel.*/
	get UI_SCENE_TALK_17():ILanguageElement{return this.getElement(1334)};
	/**Please place your luggage on the conveyor belt.*/
	get UI_SCENE_TALK_18():ILanguageElement{return this.getElement(1335)};
	/**If your luggage is overweight, you'll be charged an extra fee.*/
	get UI_SCENE_TALK_19():ILanguageElement{return this.getElement(1336)};
	/**Please wait for a moment.*/
	get UI_SCENE_TALK_20():ILanguageElement{return this.getElement(1337)};
	/**I will help you with the check-in process.*/
	get UI_SCENE_TALK_21():ILanguageElement{return this.getElement(1338)};
	/**This store is still under renovation.*/
	get UI_SCENE_TALK_22():ILanguageElement{return this.getElement(1339)};
	/**Please visit next time.*/
	get UI_SCENE_TALK_23():ILanguageElement{return this.getElement(1340)};
	/**The weather is so nice!*/
	get UI_SCENE_TALK_24():ILanguageElement{return this.getElement(1341)};
	/**This time we are going on vacation to a small island.*/
	get UI_SCENE_TALK_25():ILanguageElement{return this.getElement(1342)};
	/**There are sailboats and coconut trees.*/
	get UI_SCENE_TALK_26():ILanguageElement{return this.getElement(1343)};
	/**I'm really looking forward to this trip.*/
	get UI_SCENE_TALK_27():ILanguageElement{return this.getElement(1344)};
	/**I think so.*/
	get UI_SCENE_TALK_28():ILanguageElement{return this.getElement(1345)};
	/**Is my outfit okay today?*/
	get UI_SCENE_TALK_29():ILanguageElement{return this.getElement(1346)};
	/**The hat helps protect me from the sun on the island.*/
	get UI_SCENE_TALK_30():ILanguageElement{return this.getElement(1347)};
	/**I'd like to take a short nap.*/
	get UI_SCENE_TALK_31():ILanguageElement{return this.getElement(1348)};
	/**The two guys across from me are being too noisy.*/
	get UI_SCENE_TALK_32():ILanguageElement{return this.getElement(1349)};
	/**Please show your ticket.*/
	get UI_SCENE_TALK_33():ILanguageElement{return this.getElement(1350)};
	/**Thank you for your cooperation.*/
	get UI_SCENE_TALK_34():ILanguageElement{return this.getElement(1351)};
	/**Have a pleasant journey!*/
	get UI_SCENE_TALK_35():ILanguageElement{return this.getElement(1352)};
	/**I'm a mango ice cream,*/
	get UI_SCENE_TALK_36():ILanguageElement{return this.getElement(1353)};
	/**and I'm almost melting.*/
	get UI_SCENE_TALK_37():ILanguageElement{return this.getElement(1354)};
	/**Hoo, hoo, hoo...*/
	get UI_SCENE_TALK_38():ILanguageElement{return this.getElement(1355)};
	/**The sun is so bright today.*/
	get UI_SCENE_TALK_39():ILanguageElement{return this.getElement(1356)};
	/**Welcome!*/
	get UI_SCENE_TALK_40():ILanguageElement{return this.getElement(1357)};
	/**I'm the hotel butler.*/
	get UI_SCENE_TALK_41():ILanguageElement{return this.getElement(1358)};
	/**If you have any questions during your stay, feel free to ask me.*/
	get UI_SCENE_TALK_42():ILanguageElement{return this.getElement(1359)};
	/**Remember not to go out after 12 PM.*/
	get UI_SCENE_TALK_43():ILanguageElement{return this.getElement(1360)};
	/**Enjoy your stay!*/
	get UI_SCENE_TALK_44():ILanguageElement{return this.getElement(1361)};
	/**Event*/
	get UI_START_01():ILanguageElement{return this.getElement(1362)};
	/**Story*/
	get UI_START_02():ILanguageElement{return this.getElement(1363)};
	/**Practice*/
	get UI_START_03():ILanguageElement{return this.getElement(1364)};
	/**Arcade*/
	get UI_START_04():ILanguageElement{return this.getElement(1365)};
	/**World*/
	get UI_START_05():ILanguageElement{return this.getElement(1366)};
	/**Start*/
	get UI_START_06():ILanguageElement{return this.getElement(1367)};
	/**Match*/
	get UI_START_07():ILanguageElement{return this.getElement(1368)};
	/**The team leader has started the game.*/
	get UI_START_08():ILanguageElement{return this.getElement(1369)};
	/**Quick Tip: This category is not unlocked yet.*/
	get UI_START_09():ILanguageElement{return this.getElement(1370)};
	/**Not unlocked yet.*/
	get UI_START_10():ILanguageElement{return this.getElement(1371)};
	/**Cherry Mango Ice Cream*/
	get SKIN_NAME_3042():ILanguageElement{return this.getElement(1372)};
	/**Ice Princess*/
	get SKIN_NAME_3043():ILanguageElement{return this.getElement(1373)};
	/**Warm Berrylicious*/
	get SKIN_NAME_3044():ILanguageElement{return this.getElement(1374)};
	/**Warm Snowy Delights*/
	get SKIN_NAME_3045():ILanguageElement{return this.getElement(1375)};
	/**Double Hearts*/
	get ITEM_NAME_30019():ILanguageElement{return this.getElement(1376)};
	/**Red Lantern*/
	get ITEM_NAME_60033():ILanguageElement{return this.getElement(1377)};
	/**Blue Lantern*/
	get ITEM_NAME_60034():ILanguageElement{return this.getElement(1378)};
	/**Ice Butterfly*/
	get Trail_NAME_40022():ILanguageElement{return this.getElement(1379)};
	/**Hexagram*/
	get Trail_NAME_40023():ILanguageElement{return this.getElement(1380)};
	/**Ice Cream*/
	get Trail_NAME_40024():ILanguageElement{return this.getElement(1381)};
	/**White Feathers*/
	get Trail_NAME_40025():ILanguageElement{return this.getElement(1382)};
	/**Red Feathers*/
	get Trail_NAME_40026():ILanguageElement{return this.getElement(1383)};
	/**Snow Season*/
	get UI_Season_Guid_04():ILanguageElement{return this.getElement(1384)};
	/**Please take a screenshot of the photo you want!*/
	get UI_SCENE_12():ILanguageElement{return this.getElement(1385)};
	/**Ice climbing*/
	get Level_030():ILanguageElement{return this.getElement(1386)};
	/**Exit*/
	get UI_Watch_03():ILanguageElement{return this.getElement(1387)};
	/**Love*/
	get UI_Watch_04():ILanguageElement{return this.getElement(1388)};
	/**Purchase Successful*/
	get UI_Find_01():ILanguageElement{return this.getElement(1389)};
	/**Not enough gems, unable to purchase!*/
	get UI_Find_02():ILanguageElement{return this.getElement(1390)};
	/**The inventory is full!*/
	get UI_Find_03():ILanguageElement{return this.getElement(1391)};
	/**Unlocked!*/
	get UI_Find_04():ILanguageElement{return this.getElement(1392)};
	/**Elevator*/
	get UI_Find_05():ILanguageElement{return this.getElement(1393)};
	/**Bouncy Floor*/
	get UI_Find_06():ILanguageElement{return this.getElement(1394)};
	/**Conditions not met yet, keep collecting!*/
	get UI_Find_07():ILanguageElement{return this.getElement(1395)};
	/**Open door:*/
	get UI_Find_08():ILanguageElement{return this.getElement(1396)};
	/**Missing {0}*/
	get UI_Find_09():ILanguageElement{return this.getElement(1397)};
	/**Welcome, little jelly, to Lady Lisa's Magic Shop!!!!!*/
	get UI_Find_10():ILanguageElement{return this.getElement(1398)};
	/**Outfit change successful*/
	get UI_Find_11():ILanguageElement{return this.getElement(1399)};
	/**Springy Legs*/
	get UI_Find_12():ILanguageElement{return this.getElement(1400)};
	/**Flutter Legs*/
	get UI_Find_13():ILanguageElement{return this.getElement(1401)};
	/**Magic Shield*/
	get UI_Find_14():ILanguageElement{return this.getElement(1402)};
	/**Magic Badge*/
	get UI_Find_15():ILanguageElement{return this.getElement(1403)};
	/**Raspberry Magic Girl*/
	get UI_Find_16():ILanguageElement{return this.getElement(1404)};
	/**Gold Key*/
	get UI_Find_17():ILanguageElement{return this.getElement(1405)};
	/**Silver Key*/
	get UI_Find_18():ILanguageElement{return this.getElement(1406)};
	/**Bronze Key*/
	get UI_Find_19():ILanguageElement{return this.getElement(1407)};
	/**Purple Magic Gem*/
	get UI_Find_20():ILanguageElement{return this.getElement(1408)};
	/**Coins x500*/
	get UI_Find_21():ILanguageElement{return this.getElement(1409)};
	/**Coins x10*/
	get UI_Find_22():ILanguageElement{return this.getElement(1410)};
	/**Association Backyard*/
	get UI_Find_23():ILanguageElement{return this.getElement(1411)};
	/**1st-floor Hall*/
	get UI_Find_24():ILanguageElement{return this.getElement(1412)};
	/**2nd-floor Terrace*/
	get UI_Find_25():ILanguageElement{return this.getElement(1413)};
	/**Central Street*/
	get UI_Find_26():ILanguageElement{return this.getElement(1414)};
	/**East Bridge*/
	get UI_Find_27():ILanguageElement{return this.getElement(1415)};
	/**West Bridge*/
	get UI_Find_28():ILanguageElement{return this.getElement(1416)};
	/**Tavern Terrace*/
	get UI_Find_29():ILanguageElement{return this.getElement(1417)};
	/**East City Wall*/
	get UI_Find_30():ILanguageElement{return this.getElement(1418)};
	/**West City Wall*/
	get UI_Find_31():ILanguageElement{return this.getElement(1419)};
	/**Entrance*/
	get UI_Find_32():ILanguageElement{return this.getElement(1420)};
	/**East Area*/
	get UI_Find_33():ILanguageElement{return this.getElement(1421)};
	/**West Area*/
	get UI_Find_34():ILanguageElement{return this.getElement(1422)};
	/**East Side*/
	get UI_Find_35():ILanguageElement{return this.getElement(1423)};
	/**West Side*/
	get UI_Find_36():ILanguageElement{return this.getElement(1424)};
	/**Wizard Association*/
	get UI_Find_37():ILanguageElement{return this.getElement(1425)};
	/**Inside Magic City*/
	get UI_Find_38():ILanguageElement{return this.getElement(1426)};
	/**Magic City Walls*/
	get UI_Find_39():ILanguageElement{return this.getElement(1427)};
	/**Magic City Basement Level 1*/
	get UI_Find_40():ILanguageElement{return this.getElement(1428)};
	/**Magic City Basement Level 2*/
	get UI_Find_41():ILanguageElement{return this.getElement(1429)};
	/**Hi there! Hello again. You sure walk slowly. */
	get UI_Find_42():ILanguageElement{return this.getElement(1430)};
	/** I am the esteemed mage! Call me Lady Lisa <(￣︶￣)>*/
	get UI_Find_43():ILanguageElement{return this.getElement(1431)};
	/**Ta-da! Top witch in the spotlight <(￣︶￣)>!!!*/
	get UI_Find_44():ILanguageElement{return this.getElement(1432)};
	/**Hello, outsider jelly. Huh? Who am I? I'm the witch Lisa. Welcome to the magical world. I'm using magic to transmit my voice to you.*/
	get UI_Find_45():ILanguageElement{return this.getElement(1433)};
	/**Did you go through a strange portal and end up here in the blink of an eye? Well, that makes sense. Recently, the magical energy in our world has been leaking, affecting many other jelly worlds with magical energy. You were brought here by a portal generated by magical power.*/
	get UI_Find_46():ILanguageElement{return this.getElement(1434)};
	/**But don't worry, at the <color=#cyan><size=35>entrance to this courtyard</size></color>, there's a highly esteemed old mage who can tell you how to leave. Find her!*/
	get UI_Find_47():ILanguageElement{return this.getElement(1435)};
	/**What's with that attitude? I'm one of the most powerful mages in this mage association. Alright, no more joking. Let me see how many magic gems you've collected.*/
	get UI_Find_48():ILanguageElement{return this.getElement(1436)};
	/**What? Just this little? What were you doing earlier? I specifically placed these magic gems around you with great effort!*/
	get UI_Find_49():ILanguageElement{return this.getElement(1437)};
	/**I didn't expect you to be quite capable. Hehe, as a grand mage, you're one of the few who can receive praise from me, the great mage.      */
	get UI_Find_50():ILanguageElement{return this.getElement(1438)};
	/**Let's get back to business. I have many good things here; you can exchange them with the magic gems you've collected.*/
	get UI_Find_51():ILanguageElement{return this.getElement(1439)};
	/**Indeed, in this magic city, I've placed even <color=#cyan><size=35>more precious purple magic gems</size></color>. When you collect 6 purple magical gems, you can exchange them with me for the Wizard Association's mage badge.*/
	get UI_Find_52():ILanguageElement{return this.getElement(1440)};
	/**You can freely enter and exit the magic city with the mage badge!*/
	get UI_Find_53():ILanguageElement{return this.getElement(1441)};
	/**Magic gems are crystallized forms of magical energy. The purer the magic gem, the more and deeper the purple color.*/
	get UI_Find_54():ILanguageElement{return this.getElement(1442)};
	/**Usually, we mages rely on magic gems to enhance our power. However, you can't access the energy inside the magical gems yet because you don't have a mage's staff.*/
	get UI_Find_55():ILanguageElement{return this.getElement(1443)};
	/**Honestly, this place is a dream world created by my master, the super, super, super mage Lady Lania.*/
	get UI_Find_56():ILanguageElement{return this.getElement(1444)};
	/**Collecting gems is a test for you. When you obtain the mage badge from me, it means you've passed the test.*/
	get UI_Find_57():ILanguageElement{return this.getElement(1445)};
	/**The badge is a weapon that can manifest magical energy. But currently, there are no extra staffs in the Magic City, and other staffs are scattered worldwide.*/
	get UI_Find_58():ILanguageElement{return this.getElement(1446)};
	/**Yes, this is indeed a dream world shaped by magic. Do you have any other questions?*/
	get UI_Find_59():ILanguageElement{return this.getElement(1447)};
	/**If not, check if there's anything you need from me!*/
	get UI_Find_60():ILanguageElement{return this.getElement(1448)};
	/**Hello, little jelly, what else do you need? （＾ω＾）*/
	get UI_Find_61():ILanguageElement{return this.getElement(1449)};
	/**Keep collecting gems and pass the test, little jelly (o゜▽゜)o☆*/
	get UI_Find_62():ILanguageElement{return this.getElement(1450)};
	/**Anything else you want to know, feel free to ask Lady Lisa o(^▽^)o*/
	get UI_Find_63():ILanguageElement{return this.getElement(1451)};
	/**Little jelly, isn't it fantastic to meet me, the great witch Lady Lisa, haha. ̋(๑˃́ꇴ˂̀๑)*/
	get UI_Find_64():ILanguageElement{return this.getElement(1452)};
	/**That thing is proof of passing the test. With it, you can leave this dream magic city. However, <color=#cyan><size=35>this badge is also a critical access pass to the real Mage City. Only with it can you freely enter and exit the Mage City.</size></color>*/
	get UI_Find_65():ILanguageElement{return this.getElement(1453)};
	/**Wow, you're amazing! I didn't expect you to achieve this level. Keep it up.*/
	get UI_Find_66():ILanguageElement{return this.getElement(1454)};
	/**Huh, is that the key to the treasure vault? You can use the key to open some <color=#cyan><size=35>locked doors</size></color> in the city.*/
	get UI_Find_67():ILanguageElement{return this.getElement(1455)};
	/**But to open rarer treasure vaults, you need rarer keys. Like my gold key here. Interested? You can exchange magic gems with me for it.*/
	get UI_Find_68():ILanguageElement{return this.getElement(1456)};
	/**Wearing this outfit, you're recognized as a mage by me. Just get another badge, and you can officially become a real mage. （＾ω＾）*/
	get UI_Find_69():ILanguageElement{return this.getElement(1457)};
	/**I can't say for sure. For some reason, there's been a massive fluctuation in magical energy in the magical world, causing magic energy to leak into other jelly worlds.*/
	get UI_Find_70():ILanguageElement{return this.getElement(1458)};
	/**So, my teacher, the super, super, awesome mage Lady Lania, designed this test. We hope that the brave little jellies selected, which is you, can help our magical world in the future.*/
	get UI_Find_71():ILanguageElement{return this.getElement(1459)};
	/**But don't worry; we'll reward you with many fantastic items.*/
	get UI_Find_72():ILanguageElement{return this.getElement(1460)};
	/**I didn't expect you to succeed. Well done! After obtaining this badge, you're a true mage now. (≧▽≦) I'm looking forward to our next encounter in the real Mage City! (O ^ ~ ^ O)*/
	get UI_Find_73():ILanguageElement{return this.getElement(1461)};
	/**Goodbye, little jelly! o(╥﹏╥)o*/
	get UI_Find_74():ILanguageElement{return this.getElement(1462)};
	/**If anything else you want to know, feel free to ask Lady Lisa.*/
	get UI_Find_75():ILanguageElement{return this.getElement(1463)};
	/**Congratulations! By using the teacher's left-behind spell, <color=#cyan><size=35>you've unlocked the Super Jump Magic.</size></color>*/
	get UI_Find_76():ILanguageElement{return this.getElement(1464)};
	/**Afterward, there will be magic circles in this little town that can enhance your jumping ability. <color=#cyan><size=35>It's a blue spring.</size></color>*/
	get UI_Find_77():ILanguageElement{return this.getElement(1465)};
	/**Touch it, and you'll get the <color=#cyan><size=35>blessing of the Jump Magic, allowing you to jump higher</size></color>. However, the magic effect has a time limit. Once the time is up, the magic will be lifted. Be careful when using it.*/
	get UI_Find_78():ILanguageElement{return this.getElement(1466)};
	/**Wow! You've unlocked another magic. This is the Flutter Legs magic. （＾ω＾）*/
	get UI_Find_79():ILanguageElement{return this.getElement(1467)};
	/**Flutter Legs magic can make you run <color=#cyan><size=35>very, very fast</size></color>. Those <color=#cyan><size=35>magic circles with little wings are Flutter Legs magic</size></color>.*/
	get UI_Find_80():ILanguageElement{return this.getElement(1468)};
	/**This is the magic switch for the elevator to the tower on the city wall. You've activated the magic elevator and can now explore the city wall!*/
	get UI_Find_81():ILanguageElement{return this.getElement(1469)};
	/**Careful! This is a mechanical puppet guarding the town for the teacher. Be careful of its flames. <color=#red><size=35>Don't touch those flames</size></color>Or you'll be in big trouble! ヾ(。＞＜)シ*/
	get UI_Find_82():ILanguageElement{return this.getElement(1470)};
	/**These cannons look dangerous. Getting hit by them must hurt a lot!*/
	get UI_Find_83():ILanguageElement{return this.getElement(1471)};
	/**But why are these cannons firing at the city wall? Maybe it's another test by the teacher! Σ(°△°|||)︴*/
	get UI_Find_84():ILanguageElement{return this.getElement(1472)};
	/**This is the magic circle for the Magic Shield. See that circle? That's the Magic Shield. It can protect you, so you don't have to fear those flame cannons!*/
	get UI_Find_85():ILanguageElement{return this.getElement(1473)};
	/**You've unlocked the magic springboard. Stepping on it can make you jump very, very, very high. However, the drawback of jumping too high is that controlling your landing position is challenging. （╥﹏╥）*/
	get UI_Find_86():ILanguageElement{return this.getElement(1474)};
	/**See that crystal ahead emitting a <color=#cyan><size=35>blue glow</size></color>? It's a magical product called the Memory Crystal.*/
	get UI_Find_87():ILanguageElement{return this.getElement(1475)};
	/**Touch the crystal, and it can <color=#cyan><size=35>record and tell you the current area</size></color> you're in. You can use the crystal to <color=#cyan><size=35>teleport</size></color> between different areas.*/
	get UI_Find_88():ILanguageElement{return this.getElement(1476)};
	/** And when you accidentally die, you'll <color=#cyan><size=35>respwan at the last crystal you touched</size></color>So don't worry!*/
	get UI_Find_89():ILanguageElement{return this.getElement(1477)};
	/**Why is it you, old mage?*/
	get UI_Find_90():ILanguageElement{return this.getElement(1478)};
	/**..........*/
	get UI_Find_91():ILanguageElement{return this.getElement(1479)};
	/**Not yet 100.*/
	get UI_Find_92():ILanguageElement{return this.getElement(1480)};
	/**More than 100!*/
	get UI_Find_93():ILanguageElement{return this.getElement(1481)};
	/**I'll find many more later!*/
	get UI_Find_94():ILanguageElement{return this.getElement(1482)};
	/**I'll be looking for some more later!*/
	get UI_Find_95():ILanguageElement{return this.getElement(1483)};
	/**What are magic gems?*/
	get UI_Find_96():ILanguageElement{return this.getElement(1484)};
	/**Why do you need magic gems?*/
	get UI_Find_97():ILanguageElement{return this.getElement(1485)};
	/**Where are the others here?*/
	get UI_Find_98():ILanguageElement{return this.getElement(1486)};
	/**I see.*/
	get UI_Find_99():ILanguageElement{return this.getElement(1487)};
	/**What is a mage's staff?*/
	get UI_Find_100():ILanguageElement{return this.getElement(1488)};
	/**Is it a dream?*/
	get UI_Find_101():ILanguageElement{return this.getElement(1489)};
	/**OK.*/
	get UI_Find_102():ILanguageElement{return this.getElement(1490)};
	/**Let me take a look.*/
	get UI_Find_103():ILanguageElement{return this.getElement(1491)};
	/**No need.*/
	get UI_Find_104():ILanguageElement{return this.getElement(1492)};
	/**Why are so many magical things in our world?*/
	get UI_Find_105():ILanguageElement{return this.getElement(1493)};
	/**Confirm*/
	get UI_Find_106():ILanguageElement{return this.getElement(1494)};
	/**Buy*/
	get UI_Find_107():ILanguageElement{return this.getElement(1495)};
	/**Lisa's Shop*/
	get UI_Find_108():ILanguageElement{return this.getElement(1496)};
	/**Strawberry Witch*/
	get ITEM_NAME_60035():ILanguageElement{return this.getElement(1497)};
	/**Do you want to enter the speed skiing event level?*/
	get UI_Tips_Ski():ILanguageElement{return this.getElement(1498)};
	/**Use fireworks to light up the sky!*/
	get UI_Fire_01():ILanguageElement{return this.getElement(1499)};
	/**shapeshift*/
	get Item_name_11 ():ILanguageElement{return this.getElement(1500)};
	/**<color=#cyan><size=35>Use Dive at the right moment</size></color> to reach places you can't jump to! (＾ω＾)*/
	get UI_Find_109():ILanguageElement{return this.getElement(1501)};
	/**Teleport entrance! Speed Skiing!*/
	get UI_Ski_Tips_Enter():ILanguageElement{return this.getElement(1502)};
	/**Classic */
	get UI_Name_01():ILanguageElement{return this.getElement(1503)};
	/**Story*/
	get UI_Name_02():ILanguageElement{return this.getElement(1504)};
	/**Skibidi*/
	get UI_Name_03():ILanguageElement{return this.getElement(1505)};
	/**Maze*/
	get UI_Name_04():ILanguageElement{return this.getElement(1506)};
	/**Practice*/
	get UI_Name_05():ILanguageElement{return this.getElement(1507)};
	/**Mastery*/
	get UI_Name_06():ILanguageElement{return this.getElement(1508)};
	/**Arena*/
	get UI_Name_07():ILanguageElement{return this.getElement(1509)};
	/**World*/
	get UI_Name_08():ILanguageElement{return this.getElement(1510)};
	/**Ski*/
	get UI_Name_09():ILanguageElement{return this.getElement(1511)};
	/**Battle*/
	get UI_Name_10():ILanguageElement{return this.getElement(1512)};
	/**Happy challenge! It's time to test your agility!*/
	get UI_Name_11():ILanguageElement{return this.getElement(1513)};
	/**Jelly Theater has opened a new experience hall. What exciting games will be there this time?*/
	get UI_Name_12():ILanguageElement{return this.getElement(1514)};
	/**Skibidi-themed Obby, challenge your limits!*/
	get UI_Name_13():ILanguageElement{return this.getElement(1515)};
	/**Want to embark on a maze adventure?*/
	get UI_Name_14():ILanguageElement{return this.getElement(1516)};
	/**Tutorial for newbies in Jelly Run, easy and suitable for practice.*/
	get UI_Name_15():ILanguageElement{return this.getElement(1517)};
	/**Advanced training camp, challenge it if you're a true jelly!*/
	get UI_Name_16():ILanguageElement{return this.getElement(1518)};
	/**For the jellies aspiring to become special forces, come and become a Special Forces through the challenge!*/
	get UI_Name_17():ILanguageElement{return this.getElement(1519)};
	/**Grab your jelly buddy and roam the city together!*/
	get UI_Name_18():ILanguageElement{return this.getElement(1520)};
	/** Take your jelly friend for a winter skiing adventure!*/
	get UI_Name_19():ILanguageElement{return this.getElement(1521)};
	/**A game of survivors, defeat all enemies, and survive until the end!*/
	get UI_Name_20():ILanguageElement{return this.getElement(1522)};
	/**Magic Trial*/
	get UI_Name_21():ILanguageElement{return this.getElement(1523)};
	/**Brand new magic trial levels, find rare gems, and get excellent skills and outfits. Embark on an adventure in the magical world!*/
	get UI_Name_22():ILanguageElement{return this.getElement(1524)};
	/**Witch Lisa (now Merchant Lisa)*/
	get UI_Find_110():ILanguageElement{return this.getElement(1525)};
	/**Reset*/
	get UI_Find_111():ILanguageElement{return this.getElement(1526)};
	/**Throw them into the fireworks on the square!*/
	get UI_Fire_02():ILanguageElement{return this.getElement(1527)};
	/**Get closer to the fireworks!*/
	get UI_Fire_03():ILanguageElement{return this.getElement(1528)};
	/**Teleport to a magical place to watch the fireworks! */
	get UI_Fire_04():ILanguageElement{return this.getElement(1529)};
	/**Unlock at level {0}!*/
	get UI_Chose_01():ILanguageElement{return this.getElement(1530)};
	/**Complete the previous task to unlock*/
	get UI_Chose_02():ILanguageElement{return this.getElement(1531)};
	/**Lania Dreamland Trial's approval is also the pass to Magic City. With it, you can freely enter and exit Magic City. But why does this badge look so similar to the purple magic gem?*/
	get UI_Find_112():ILanguageElement{return this.getElement(1532)};
	/**Similar to the robes that Lisa is wearing, this represents Lisa and Lania's approval of the challenger. It can help the wearer control magic energy.*/
	get UI_Find_113():ILanguageElement{return this.getElement(1533)};
	/**Magic City's golden treasury key. But what's inside the golden treasury?*/
	get UI_Find_114():ILanguageElement{return this.getElement(1534)};
	/**Magical silver key. Is it to open the treasury door or the passage to the secret place? We don't know.*/
	get UI_Find_115():ILanguageElement{return this.getElement(1535)};
	/**A common copper key.*/
	get UI_Find_116():ILanguageElement{return this.getElement(1536)};
	/**A dazzling purple magic crystal, only appears when there's a massive problem with the magic world's energy.*/
	get UI_Find_117():ILanguageElement{return this.getElement(1537)};
	/**A bunch of small jelly world coins.*/
	get UI_Find_118():ILanguageElement{return this.getElement(1538)};
	/**Coins of Jelly World.*/
	get UI_Find_119():ILanguageElement{return this.getElement(1539)};
	/**Why does the teacher use this cheap thing as proof of passing the test? It's not as good as my clothes.*/
	get UI_Find_120():ILanguageElement{return this.getElement(1540)};
	/**Witch Lisa has selected this for you. Give it a try!*/
	get UI_Find_121():ILanguageElement{return this.getElement(1541)};
	/**Wow, wow, wow, this is a golden key! *Sob* Professor, I don't want to sell it to him!*/
	get UI_Find_122():ILanguageElement{return this.getElement(1542)};
	/**With it, you have many treasures that others don't have.*/
	get UI_Find_123():ILanguageElement{return this.getElement(1543)};
	/**Copper key, can open the doors of some special rooms.*/
	get UI_Find_124():ILanguageElement{return this.getElement(1544)};
	/**This thing looks like a purple sweet potato. Oops, I'm hungry.*/
	get UI_Find_125():ILanguageElement{return this.getElement(1545)};
	/**Golden and shiny, a bunch of golden coins.*/
	get UI_Find_126():ILanguageElement{return this.getElement(1546)};
	/**Coins are a good thing, who would dislike having too many coins?*/
	get UI_Find_127():ILanguageElement{return this.getElement(1547)};
	/**Can I give you a piggyback ride?*/
	get Txt_ChatWord_15():ILanguageElement{return this.getElement(1548)};
	/**How about trying out the transformation?*/
	get Txt_ChatWord_16():ILanguageElement{return this.getElement(1549)};
	/**Let's go watch the fireworks together!*/
	get Txt_ChatWord_17():ILanguageElement{return this.getElement(1550)};
	/**Go*/
	get UI_LOBBY_192():ILanguageElement{return this.getElement(1551)};
	/**Reset*/
	get UI_LOBBY_193():ILanguageElement{return this.getElement(1552)};
	/**Go pick up the gifts!*/
	get LV36_TakeGift():ILanguageElement{return this.getElement(1553)};
	/**Head to the glowing locations to deliver the gifts.*/
	get LV36_BackToTree():ILanguageElement{return this.getElement(1554)};
	/**Gifts have appeared on the map and at the highest point. */
	get LV36_Utrl_Gift():ILanguageElement{return this.getElement(1555)};
	/**Drop*/
	get UI_LV36_Takeoff():ILanguageElement{return this.getElement(1556)};
	/**Iceberg Slide*/
	get Level_035():ILanguageElement{return this.getElement(1557)};
	/**Santa Claus*/
	get SKIN_NAME_3047():ILanguageElement{return this.getElement(1558)};
	/**Back*/
	get UI_LOBBY_194():ILanguageElement{return this.getElement(1559)};
	/**Gift Express*/
	get Level_036():ILanguageElement{return this.getElement(1560)};
	/**Merry Christmas*/
	get ShuangDan_UI_01():ILanguageElement{return this.getElement(1561)};
	/**Daily Quests*/
	get ShuangDan_UI_02():ILanguageElement{return this.getElement(1562)};
	/**Achievement*/
	get ShuangDan_UI_03():ILanguageElement{return this.getElement(1563)};
	/**Claim All*/
	get ShuangDan_UI_04():ILanguageElement{return this.getElement(1564)};
	/**Christmas Pulse*/
	get Level_029():ILanguageElement{return this.getElement(1565)};
	/**Daily*/
	get UI_LOBBY_195():ILanguageElement{return this.getElement(1566)};
	/**Passport*/
	get Season_Des_13():ILanguageElement{return this.getElement(1567)};
	/**Dragon Flame*/
	get SKIN_NAME_3048():ILanguageElement{return this.getElement(1568)};
	/**Dragon Cyan*/
	get SKIN_NAME_3049():ILanguageElement{return this.getElement(1569)};
	/**Dragon New Year*/
	get UI_Season_Guid_05():ILanguageElement{return this.getElement(1570)};
	/**Signed in for this month: <size=28><color=#000000FF>{0}</color></size> days*/
	get UI_LOBBY_196():ILanguageElement{return this.getElement(1571)};
	/**Sign-in time has passed; please come back earlier next time!*/
	get UI_LOBBY_197():ILanguageElement{return this.getElement(1572)};
	/**Please sign in and claim your rewards.*/
	get UI_LOBBY_199():ILanguageElement{return this.getElement(1573)};
	/**Score*/
	get UI_LV36_Score():ILanguageElement{return this.getElement(1574)};
	/**Locked*/
	get UI_LOBBY_198():ILanguageElement{return this.getElement(1575)};
	/**Cool Prince*/
	get SKIN_NAME_3050():ILanguageElement{return this.getElement(1576)};
	/**Red Staff*/
	get ITEM_NAME_50079():ILanguageElement{return this.getElement(1577)};
	/**Frost Staff*/
	get ITEM_NAME_50080():ILanguageElement{return this.getElement(1578)};
	/**Cheat*/
	get ITEM_NAME_30020():ILanguageElement{return this.getElement(1579)};
	/**There was an unexpected situation. I have to let you return to Jelly Island first. The Jelly Teleportation Magic is activated!*/
	get UI_LAN_282():ILanguageElement{return this.getElement(1580)};
	/**Back*/
	get UI_LAN_283():ILanguageElement{return this.getElement(1581)};
	/**New Year Sprint*/
	get Level_037():ILanguageElement{return this.getElement(1582)};
	/**Total Rewards*/
	get UI_LOBBY_200():ILanguageElement{return this.getElement(1583)};
	/**Day 7*/
	get UI_LOBBY_201():ILanguageElement{return this.getElement(1584)};
	/**Day 14*/
	get UI_LOBBY_202():ILanguageElement{return this.getElement(1585)};
	/**Day 21*/
	get UI_LOBBY_203():ILanguageElement{return this.getElement(1586)};
	/**s to use again*/
	get UI_LOBBY_204():ILanguageElement{return this.getElement(1587)};
	/**Beloved Bride*/
	get SKIN_NAME_3051():ILanguageElement{return this.getElement(1588)};
	/**Countdown to try on skin{0}:{1}*/
	get UI_Lobby_Card_TryTime():ILanguageElement{return this.getElement(1589)};
	/**You don’t have any skins yet, go to the shop to buy skins!*/
	get UI_Lobby_Card_NoneSkin():ILanguageElement{return this.getElement(1590)};
	/**View Card*/
	get UI_Player_Card():ILanguageElement{return this.getElement(1591)};
	/**My Card*/
	get UI_LOBBY_Card():ILanguageElement{return this.getElement(1592)};
	/**You already own the skin*/
	get UI_Lobby_Card_Already():ILanguageElement{return this.getElement(1593)};
	/**Skip*/
	get UI_Champion_Skip():ILanguageElement{return this.getElement(1594)};
	/**Best Player*/
	get UI_Champion_Best():ILanguageElement{return this.getElement(1595)};
	/**Rewards*/
	get UI_Settle_Award():ILanguageElement{return this.getElement(1596)};
	/**Back*/
	get UI_Settle_back():ILanguageElement{return this.getElement(1597)};
	/**Try harder*/
	get UI_Settle_Try():ILanguageElement{return this.getElement(1598)};
	/**Back in {0}s*/
	get UI_Settle_CountDown():ILanguageElement{return this.getElement(1599)};
	/**Title*/
	get UI_Title():ILanguageElement{return this.getElement(1600)};
	/**Edit*/
	get UI_Confirm():ILanguageElement{return this.getElement(1601)};
	/**Close*/
	get UI_Close():ILanguageElement{return this.getElement(1602)};
	/**Skin*/
	get UI_Card_Skin():ILanguageElement{return this.getElement(1603)};
	/**Message*/
	get UI_Card_Message():ILanguageElement{return this.getElement(1604)};
	/**null*/
	get UI_Activity_Goto():ILanguageElement{return this.getElement(1605)};
	/**null*/
	get UI_7Days_Task_Done():ILanguageElement{return this.getElement(1606)};
	/**null*/
	get UI_7DaysActivity_Goto():ILanguageElement{return this.getElement(1607)};
	/**null*/
	get UI_7DaysActivity_Label():ILanguageElement{return this.getElement(1608)};
	/**null*/
	get UI_Skin_3061():ILanguageElement{return this.getElement(1609)};
	/**null*/
	get UI_7DaysActivity_Progress():ILanguageElement{return this.getElement(1610)};
	/**null*/
	get UI_7DaysActivity_1():ILanguageElement{return this.getElement(1611)};
	/**null*/
	get UI_7DaysActivity_2():ILanguageElement{return this.getElement(1612)};
	/**null*/
	get UI_7DaysActivity_3():ILanguageElement{return this.getElement(1613)};
	/**null*/
	get UI_7DaysActivity_4():ILanguageElement{return this.getElement(1614)};
	/**null*/
	get UI_7DaysActivity_5():ILanguageElement{return this.getElement(1615)};
	/**null*/
	get UI_7DaysActivity_6():ILanguageElement{return this.getElement(1616)};
	/**null*/
	get UI_7DaysActivity_7():ILanguageElement{return this.getElement(1617)};
	/**null*/
	get UI_Activity_Time():ILanguageElement{return this.getElement(1618)};
	/**null*/
	get Activity_7Days_Name():ILanguageElement{return this.getElement(1619)};
	/**null*/
	get UI_Activityget():ILanguageElement{return this.getElement(1620)};
	/**null*/
	get UI_7LockActivity_Task_1():ILanguageElement{return this.getElement(1621)};
	/**null*/
	get UI_7LockActivity_Task_2():ILanguageElement{return this.getElement(1622)};
	/**null*/
	get UI_7LockActivity_Task_3():ILanguageElement{return this.getElement(1623)};
	/**null*/
	get UI_7LockActivity_Task_4():ILanguageElement{return this.getElement(1624)};
	/**null*/
	get UI_7LockActivity_Task_5():ILanguageElement{return this.getElement(1625)};
	/**null*/
	get UI_7LockActivity_Task_6():ILanguageElement{return this.getElement(1626)};
	/**null*/
	get UI_7LockActivity_Task_7():ILanguageElement{return this.getElement(1627)};
	/**null*/
	get UI_7LockActivity_Task_8():ILanguageElement{return this.getElement(1628)};
	/**null*/
	get UI_7LockActivity_Task_9():ILanguageElement{return this.getElement(1629)};
	/**null*/
	get UI_7LockActivity_Task_10():ILanguageElement{return this.getElement(1630)};
	/**null*/
	get UI_7LockActivity_Task_11():ILanguageElement{return this.getElement(1631)};
	/**null*/
	get UI_7LockActivity_Task_12():ILanguageElement{return this.getElement(1632)};
	/**null*/
	get UI_7LockActivity_Task_13():ILanguageElement{return this.getElement(1633)};
	/**null*/
	get UI_7LockActivity_Task_14():ILanguageElement{return this.getElement(1634)};
	/**null*/
	get UI_7LockActivity_Task_15():ILanguageElement{return this.getElement(1635)};
	/**null*/
	get UI_7LockActivity_Task_16():ILanguageElement{return this.getElement(1636)};
	/**null*/
	get UI_7LockActivity_Task_17():ILanguageElement{return this.getElement(1637)};
	/**null*/
	get UI_7LockActivity_Task_18():ILanguageElement{return this.getElement(1638)};
	/**null*/
	get UI_7LockActivity_Task_19():ILanguageElement{return this.getElement(1639)};
	/**null*/
	get UI_7LockActivity_Task_20():ILanguageElement{return this.getElement(1640)};
	/**null*/
	get UI_7LockActivity_Task_21():ILanguageElement{return this.getElement(1641)};
	/**null*/
	get Item_name_12():ILanguageElement{return this.getElement(1642)};
	/**null*/
	get Item_name_13():ILanguageElement{return this.getElement(1643)};
	/**null*/
	get Item_name_14():ILanguageElement{return this.getElement(1644)};
	/**null*/
	get UI_7DaysActivity_Day1():ILanguageElement{return this.getElement(1645)};
	/**null*/
	get UI_7DaysActivity_Day2():ILanguageElement{return this.getElement(1646)};
	/**null*/
	get UI_7DaysActivity_Day3():ILanguageElement{return this.getElement(1647)};
	/**null*/
	get Level_033():ILanguageElement{return this.getElement(1648)};
	/**null*/
	get UI_EveDayTurn_01():ILanguageElement{return this.getElement(1649)};
	/**null*/
	get UI_EveDayTurn_02():ILanguageElement{return this.getElement(1650)};
	/**null*/
	get UI_Level_038_Tips_01():ILanguageElement{return this.getElement(1651)};
	/**null*/
	get Level_038():ILanguageElement{return this.getElement(1652)};
	/**null*/
	get UI_SCENE_13():ILanguageElement{return this.getElement(1653)};

}