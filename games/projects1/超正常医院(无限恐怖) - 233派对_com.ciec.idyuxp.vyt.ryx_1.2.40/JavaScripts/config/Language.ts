/**aits-ignore*/
import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_C"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"Prop_Food_1","{0} health restored!","恢复了{0}点精神力！"],[2,"DeadCount_Text_1","You survived for {0} day(s)!","你活过了{0}天"],[3,"DeadCount_Text_2","Escaped {0} meters","逃了{0}米"],[4,"DeadCount_Text_7","OK","确定"],[5,"Tips_1","You can't get away!","你逃不出去的"],[6,"Common_Text_1","Confirm","确认"],[7,"Common_Text_2","Cancel","取消"],[8,"Common_Text_4","Return","返回"],[9,"Hud_Text_1","Health","生命值"],[10,"Hud_Text_2","Day {0}","已存活{0}天"],[11,"Login_Text_1","Here is <color=#dc143cff> Twilight Mercywood</color>. You are currently undergoing treatment. During the day, explore the hospital to find items that alleviate your pain. Nighttime is for treatment, and <color=#dc143cff>they</color> will take good care of you. We hope to see you again when the sun rises tomorrow.","这里是<color=#dc143cff>超正常医院</color>\n你现在正在接受治疗，乘着白天在医院里找找减轻痛苦的物品吧，\n夜晚是治疗时间，<color=#dc143cff>他们</color>会好好医治你的，希望明天太阳升起时，还能再次见到你~"],[12,"Reset_Tips_1","There's no way out!","这里可没有能逃跑的地方！"],[13,"Rules_Tips_1","<color=#dc143cff>The night fell</color>, and they are on their way!","<color=#dc143cff>天黑了</color>，新一轮的实验开始了！"],[14,"Rank_Text_1","Wonderland Star","家具城之星"],[15,"Rank_Text_2","Rank","排名"],[16,"Rank_Text_3","Name","昵称"],[17,"Rank_Text_4","Survives","已存活"],[18,"Text_Action_Name_14","{0} was captured. Go and rescue him!","玩家 {0} 被抓走了,快去解救他"],[19,"Text_Action_Name_15",null,"背包已满"],[20,"Time_Text_1",null,"距离晚上还有:{0}"],[21,"Time_Text_2",null,"距离早上还有:{0}"],[22,"Action_Text_1","Respawn in: {0}","复活倒计时：{0}"],[23,"Tips_01","Lost {0} sanity!","失去了{0}点精神力！"],[24,"Tips_02","Your inventory is full!","道具已满"],[25,"Tips_03","Congrats on surviving another day. You rescued {0} people yesterday.","恭喜你又存活了一天，昨天你拯救了{0}人"],[26,"Tips_04","Sadly, you died last night. You rescued {0} people yesterday.","遗憾你死在了昨夜，昨天你拯救了{0}人"],[27,"Tips_05","Operation too fast!","操作太快"],[28,"Tips_06","You don't have a weapon. Find one first!","没有攻击道具,请先找到攻击道具"],[29,"Tips_07","Low stamina.","体力不足"],[30,"Item_Name_1","Tranquilizer","镇静剂"],[31,"Item_Name_2","Drug","实验药品"],[32,"Item_Name_3","Lollipop","棒棒糖"],[33,"Item_Name_4","Apple","苹果"],[34,"Item_Name_5","Donut","甜甜圈"],[35,"Item_Name_6","Burger","汉堡"],[36,"Tips_08","Survived","生存"],[37,"Tips_09","Rescued","拯救"],[38,"Tips_10","Survival Guide","医院守则"],[39,"Tips_11","How to Survive in This Hospital","超正常医院生存守则"],[40,"Tips_12","1. <color=#B62B3D>Sneak-attacking</color> the monsters with a <color=#B62B3D>tranquilizer</color> is the only way to restrain them by putting them into a short sleep.\n2. <color=#B62B3D>Apples, burgers, drugs, lollipops, and other supplies</color> can <color=#B62B3D>restore a small amount of sanity</color>. But spoiled food can pollute your sanity, too.\n3. You can <color=#B62B3D>struggle</color> and make sounds to inform your companions when you're caught. But it will consume sanity, too.\n4. You can be <color=#B62B3D>rescued</color> by your companions after being caught and before going completely insane.","1.<color=#B62B3D>镇静剂</color>是克制怪物的唯一手段，使用镇静剂<color=#B62B3D>偷袭</color>怪物，可以让它们陷入短暂的沉睡；\n2.<color=#B62B3D>苹果、汉堡、药物、棒棒糖等</color>物资可以<color=#B62B3D>恢复少量精神力</color>，但是一些变质的食物吃下去反而会污染精神；\n3.被抓起来的时候可以奋力<color=#B62B3D>挣扎</color>发出声音告知其他人，但是挣扎时会消耗较多精神力；\n4.被抓起来后，在彻底陷入疯狂之前，都能被其他同伴<color=#B62B3D>解救</color>。"],[41,"Tips_13","You are the Horse Head, responsible for movement.","你是马头，负责移动"],[42,"Tips_14","You are the Horse Body, responsible for jumping.","你是马身，负责跳跃"],[43,"Tips_15","You are the Rider, responsible for using items.","你是骑手，负责使用道具"],[44,"Tips_16","Disband","解除合体"],[45,"Tips_17","Horse Archer Challenge","马弓手挑战"],[46,"Tips_18","1. When three people enter the spotlight, they can form a Horse Archer team, and each person's position is randomly assigned.\n2. Each position has different responsibilities: the Horse Head is responsible for movement, the Horse Body is responsible for jumping, and the Rider is responsible for using items.\n3. Tap the button in the top left corner of the screen to disband the team.","1.3个人同时进入光圈内，可以组成马弓手，每个人负责的位置随机；\n2.每个位置负责的职责不同，马头负责移动，马身负责跳跃，骑马人负责使用道具；\n3.点击界面左上角的按钮，可以解除马弓手组合。"],[47,"Tips_19","Replacement","换装"],[48,"Shop_Tips_1","{0}0% OFF","{0}折"],[49,"Shop_Tips_2","SOLD OUT","已售罄"],[50,"Shop_Tips_8","Insufficient G-Coins. Please recharge first.","乐币不足请充值"],[51,"Shop_Tips_3","Purchase successful!","购买成功"],[52,"Shop_Tips_4","Insufficient Abnormal Coins.","异常币不足"],[53,"Shop_Tips_5","FREE","免费"],[54,"Shop_Tips_6","Purchase Limit: {0}","限购：{0}"],[55,"Shop_Tips_7","<s>{0}</s>{1}","<s>{0}</s>{1}"],[56,"Bag_Text_1","INVENTORY: Select to Equip","背包：选择装备你的物品"],[57,"Bag_Text_2","Item","物品名称"],[58,"Bag_Text_3","Description","描述"],[59,"Bag_Text_4","EQUIP","装备"],[60,"Bag_Text_5","Unload","卸载"],[61,"Bag_Text_6","Discard","丢弃"],[62,"Weapon_Text_1","<size=30><color=#FF0000>Ammo</color> {0}/{1}</size>","<size=30>弹<color=#FF0000>药</color>{0}/{1}</size>"],[63,"Text_Key_Number","{0} keys to be placed","{0}把钥匙尚未放置"],[64,"Text_Key_Place","All keys have been placed","全部钥匙已放置"],[65,"Shop_Tips_9","<color=#FF0000>Purchase</color> Item","道具<color=#FF0000>购</color>买"],[66,"Shop_Tips_10","<color=#FF0000>Purchase</color> Pack","礼包<color=#FF0000>购</color>买"],[67,"Shop_Tips_11","The purchase limit has been reached. Please come back after it refreshes.","已达到限购次数，请下次刷新再来"],[68,"Shop_Tips_12","Next refresh in {0}d {1}h {2}min","距离下次刷新<color=#FF0000>{0}天{1}时{2}分</color>"],[69,"Shop_Tips_13","Claim","领取"],[70,"Shop_Tips_14","Please come back tomorrow","明日再来"],[71,"Shop_Tips_15","All rewards have been claimed.","已领取全部奖励"],[72,"Shop_Tips_16","Membership consumes {0} G-Coins, proceed?","是否花费{0}乐币购买特权会员?"],[73,"Shop_Tips_17","You have purchased the Membership experience!","特权VIP已购买"],[74,"Shop_Tips_18","Membership expires in <color=#81E881>{0}d {1}h</color>","特权VIP剩余时间：<color=#81E881>{0}天{1}时</color>"],[75,"Shop_Tips_19","Your Membership has expired. You can renew it to continue your exclusive experience.","您的特权会员已到期，可再次至特权会员界面进行购买"],[76,"Shop_Tips_20","Membership expires in <color=#81E881>{0}d {1}h</color>","VIP剩余时间：<color=#81E881>{0}分</color>"],[77,"Shop_Tips_21","Claimed","已领取"],[78,"Shop_Tips_22","Claim today's reward","领取当日奖励"],[79,"Shop_Tips_23","Shop_Tips_23",null],[80,"Tips_20","Welcome to <color=#FF0000>Twilight Mercywood</color>. Researcher Anna has prepared a <color=#FF0000>survival guide</color> for newly admitted patients. Tell us how <color=#FF0000>good</color> you are?","欢迎来到<color=#FF0000>超正常医院</color>，研究员安娜特地为新入院的病人准备了一份<color=#FF0000>生存教程</color>，请问你是<color=#FF0000>新手</color>吗"],[81,"Tips_21","<color=#FF0000>I'm New</color>","<color=#FF0000>我是新手</color>"],[82,"Tips_22","I'm Pro","我是老手"],[83,"Tips_23","I'm Pro","我是老手"],[84,"Tips_24","TUTORIAL","教程"],[85,"Tips_25","<size=27><color=#00FF83FF>Collect items</color></size>","<size=27>收集道具</size>"],[86,"Tips_26","<size=27><color=#00FF83FF>Use items</color></size>","<size=27>使用道具</size>"],[87,"Tips_27","<size=23><color=#00FF83FF>Collect tranquilizers</color></size>","<size=27>收集镇定剂</size>"],[88,"Tips_28","<size=20><color=#00FF83FF>Rescue teammates (night)</color></size>","<size=27> 拯救队友(夜间)</size>"],[89,"Tips_29","<size=27><color=#00FF83FF>Collect firearms</color></size>","<size=27>收集枪械</size>"],[90,"Tips_30","<size=22><color=#00FF83FF>Shoot monsters (night)</color></size>","<size=27>射击怪物(夜间)</size>"],[91,"Tips_31","<size=21><color=#00FF83FF>Seek portals (nightmare)</color></size>","<size=27>寻找传送门(梦魇)</size>"],[92,"Tips_32","<size=21><color=#00FF83FF>Enter a portal (nightmare)</color></size>","<size=27>进入传送门(梦魇)</size>"],[93,"Tips_33","<size=23><color=#00FF83FF>Get keys (nightmare)</color></size>","<size=27>获得钥匙(梦魇)</size>"],[94,"Tips_34","<size=21><color=#00FF83FF>Activate keys (nightmare)</color></size>","<size=27>激活钥匙(梦魇)</size>"],[95,"Tips_35","<size=23>Collect 3 restoration items</size>","<size=23>收集到3个回复道具</size>"],[96,"Tips_36","<size=21>Tap any item in the inventory to use it once</size>","<size=23>点击道具栏任意道具进行1次使用</size>"],[97,"Tips_37","<size=23>Collect 1 tranquilizer</size>","<size=23>收集到1个镇定剂</size>"],[98,"Tips_38","<size=21>Go to the basement and rescue 1 teammate</size>","<size=23> 前往地下室拯救一位被抓到的队友</size>"],[99,"Tips_39","<size=23>Collect 1 pulse gun</size>","<size=23>收集一把脉冲枪</size>"],[100,"Tips_40","<size=23>Shoot any monster with a pulse gun</size>","<size=23>使用脉冲枪击中任意怪物</size>"],[101,"Tips_41","<size=21>Find the scattered portals in nightmare mode</size>","<size=23>梦魇模式夜晚寻找到散落的传送门</size>"],[102,"Tips_42","<size=23>Enter a portal and find keys</size>","<size=23>进入传送门内寻找钥匙</size>"],[103,"Tips_43","<size=23>Collect any key</size>","<size=23>拾取到任意一把钥匙</size>"],[104,"Tips_44","<size=23>Deliver any key to the Skull Door</size>","<size=23>将任意一把钥匙递送到骷髅门处</size>"],[105,"Tips_45","<size=24>There are many <color=#FF0000> items that restore health</color> scattered in the scene. Tap the <color=#FF0000>interactive button</color> near the item to collect it.</size>","<size=24>游戏场景中散落着的许多<color=#FF0000>回复血量的道具</color>，靠近道具点击<color=#FF0000>交互按钮</color>就可以收集到啦</size>"],[106,"Tips_46","<size=24><color=#FF0000>Tap any item in the inventory</color>, an <color=#FF0000>item icon</color> will appear on the right side of the screen. <color=#FF0000>Tap the icon</color> to use the item.</size>","<size=24><color=#FF0000>点击道具栏任意道具</color>，屏幕右侧会出现<color=#FF0000>道具的图标</color>，<color=#FF0000>点击图标</color>就可以使用道具了哦</size>"],[107,"Tips_47","<size=24>There are also special items in the scene: <color=#FF0000>Tranquilizer</color>. Using tranquilizer on monsters can cause <color=#FF0000>restraint effect</color>, go and collect more.</size>","<size=24>场景中还有着特殊的道具：<color=#FF0000>镇定剂</color>，对怪物使用镇定剂可以造成<color=#FF0000>克制效果</color>，快去多收集一些吧</size>"],[108,"Tips_48","<size=24>After being caught, palyers will be sent to the <color=#FF0000>basement</color> by the monster. Go to the <color=#FF0000>basement</color>, get close to the captured teammate and tap the <color=#FF0000>interactive button</color> to save them.</size>","<size=24> 角色被抓住后会被怪物送往<color=#FF0000>地下室</color>，前往<color=#FF0000>地下室</color>拯救被抓到的队友，靠近队友点击<color=#FF0000>交互按钮</color>即可救起</size>"],[109,"Tips_49","<size=24>The <color=#FF0000>Pulse Gun</color> is a very effective item for dealing with monsters. Find pulse guns in the scene!</size>","<size=24><color=#FF0000>脉冲枪是</color>对付怪物非常有效的道具，在场景中寻找到脉冲枪吧！</size>"],[110,"Tips_50","<size=24>After tapping <color=#FF0000>Pulse Gun</color> in the inventory, <color=#FF0000>aim sign and fire button</color> will appear on the screen. After aiming at the monster <color=#FF0000>tap to fire at the monster.</color></size>","<size=24>点击道具栏的<color=#FF0000>脉冲枪</color>以后，屏幕上会出现<color=#FF0000>准心和发射按钮</color>，瞄准怪物后<color=#FF0000>点击发射即可命中怪物</color></size>"],[111,"Tips_51","<size=24>Nightmare Mode is a high-difficulty gameplay that randomly appears on certain nights. In <color=#FF0000>Nightmare Mode</color>, there will be <color=#FF0000>5 portals</color> in the scene. The portal is the key to <color=#FF0000>winning</color>, go find the portals! </size>","<size=24>梦魇模式是在某些夜晚随机出现的高难度玩法，在<color=#FF0000>梦魇模式</color>下，场景内会存在<color=#FF0000>5扇传送门</color>，传送门是<color=#FF0000>获胜的关键</color>，快去寻找！</size>"],[112,"Tips_52","<size=24>After entering a <color=#FF0000>portal</color>, you will be transported to a room, and the <color=#FF0000>flame key</color> can be found in the middle (if there is no key in the room, it must have been picked up by other players, continue to look for the key.)</size>","<size=24>进入<color=#FF0000>传送门</color>后会被传送到一个房间内，在中间可以找到<color=#FF0000>火焰钥匙（若房间内没有钥匙，就是被其他玩家捡走啦，继续寻找钥匙吧）</color></size>"],[113,"Tips_53","<size=24>Close to the key and <color=#FF0000>tap the interactive button</color> to pick up the key. The picked up key will <color=#FF0000>float around the player</color>. If <color=#FF0000>the player is attacked by a monster at this time, the key will fall.</color></size>","<size=24>靠近钥匙<color=#FF0000>点击交互</color>就可以拾取钥匙了，被拾取的钥匙会<color=#FF0000>环绕在角色的四周</color>，如果此时<color=#FF0000>被怪物攻击到钥匙就会掉落</color></size>"],[114,"Tips_54","<size=24>Bring the key to the <color=#FF0000>Skull Door</color> in the scene, and the key will <color=#FF0000>automatically fly to the skeleton door</color> for activation. <color=#FF0000>After 5 keys are collected</color>, you win!</size>","<size=24>将钥匙带到场景的<color=#FF0000>骷髅门</color>处，钥匙会<color=#FF0000>自动飞向骷髅门</color>激活，<color=#FF0000>5把钥匙集齐后</color>就获得胜利啦！</size>"],[115,"Tips_55","Got it.","知道啦"],[116,"Tips_56","{0} keys to be placed","{0}把钥匙尚未放置"],[117,"Tips_57","All keys have been placed","全部钥匙已放置"],[118,"Tips_58","Nightmare Invasion","梦魇入侵"],[119,"Tips_59","Backpack","背<color=#FF0000>包</color>"],[120,"Tips_60","<color=#FF0000>Nightmare</color> Guide","梦<color=#FF0000>魇</color>求生<color=#FF0000>法</color>则"],[121,"Tips_61","Congratulations! You have escaped the nightmare.","<color=#FF0000>恭喜你，成功逃离梦魇</color>"],[122,"Tips_62","Nightmare <color=#FF0000>Invasion</color> Survival <color=#FF0000>Guide</color>","梦<color=#FF0000>魇</color>入侵生存<color=#FF0000>法</color>则"],[123,"Tips_63","Monster Notes","怪物说明"],[125,"Tips_64","Find the Keys","寻找钥匙"],[127,"Tips_65","Get Victory","获得胜利"],[129,"Tips_66","Pulse Gun","脉冲枪"],[131,"Tips_67","After the Flying Eye Monster detects the player, it will summon the monster Mammon to attack them.","飞眼怪扫描到玩家后，会召唤怪物玛门对玩家进行攻击"],[132,"Tips_68","Mammon will target the player for a ray attack.","玛门会锁定玩家进行射线攻击"],[133,"Tips_69","Avoid monsters, search for the 5 portals in the scene as much as possible and enter.","躲避怪物，尽可能的寻找场景中的五座传送门并进入"],[134,"Tips_70","Collect keys in the portal, and the collected keys will float around the player.","在传送门中收集钥匙，收集到的钥匙会漂浮在玩家周围"],[135,"Tips_71","Bringing the collected keys near the Skull Goor will light up the skull.","将收集到的钥匙带到骷髅门附近会点亮骷髅头"],[136,"Tips_72","When all five skulls on the doors were lit up, the player survived that night!","当五个骷髅均被点亮时，当夜玩家成功存活！"],[137,"Tips_73","Using a pulse gun can throw the Flying Eye into chaos for a while.","使用脉冲枪可以让飞眼怪陷入混乱一段时间"],[138,"Tips_74","Using it on other monsters can also slow down the target.","对其余怪物使用也可对目标造成减速效果"],[139,"Tips_75","Next","下一页"],[140,"Tips_76","Previous","上一页"],[141,"Tips_77","Capacity limit:","容量上限："],[142,"Tips_78","Consuming a tranquilizer can make the monster sleep for 1 minute.","消耗一只镇静剂，可以使怪物沉睡1分钟"],[143,"Tips_79","Hospital-developed mind control drugs that are still in the testing stage.","医院研究出来的精神控制药品，目前还在测试阶段"],[144,"Tips_80","Small snacks that can be seen everywhere.","随处可见的小零食"],[145,"Tips_81","An apple a day keeps the doctor away.","一天一苹果，医生远离我"],[146,"Tips_82","A dessert to replenish sugar and bring joy at the same time.","餐后甜点，补充糖分的同时带来快乐"],[147,"Tips_83","Who could say no to a tasty burger?","没有人能拒绝一个充满能量的香香汉堡"],[148,"Tips_84","Pulse Gun","脉冲枪"],[149,"Tips_85","A powerful attack weapon. Monsters hit by it will be controlled for a period of time.","强力的攻击武器，被击中的怪物会被控制一段时间"],[150,"Tips_86","<size=30><color=#FF0000>Ammo</color> {0}/{1}</size>","<size=30>弹<color=#FF0000>药</color>{0}/{1}</size>"],[151,"Tips_87","Congrats to {0} for obtaining the {1}!","恭喜玩家 {0} 获得{1}"],[152,"Tips_88","Key of Reality","真实之钥"],[153,"Tips_89","Key of Innocence","纯真之钥"],[154,"Tips_90","Key of Wisdom","智慧之钥"],[155,"Tips_91","Key of Faith","信仰之钥"],[156,"Tips_92","Key of Truth","真理之钥"],[157,"Tips_93","Out of bullets. Change another gun!","没有子弹了，换一把枪吧"],[158,"Tips_94","Failed to escape, you were swallowed by the nightmare.","逃离梦魇失败，你被梦魇吞噬了"],[159,"Tips_95","The door of dream has opened. You're about to escape the nightmare!","梦境之门已开启，即将逃离梦魇"],[160,"Tips_96","Respawn Coin","复活币"],[161,"Tips_97","Shapeshift Card","变身卡"],[162,"Tips_98","Dynamic Pop Gun","动感波枪"],[163,"Tips_99","Weekly Pack","每周礼包"],[164,"Tips_100","Respawn Coin Pack","复活币大礼包"],[165,"Tips_101","Shapeshift Card Pack","变身卡大礼包"],[166,"Tips_102","<size=34>G-Coin <color=#FF0000>Store</color></size>","<size=34>功能<color=#FF0000>物</color>品</size>"],[167,"Tips_103","<size=34>Abnormal Coin <color=#FF0000>Store</color></size>","<size=34>不正常币<color=#FF0000>商</color>城</size>"],[168,"Tips_104","<size=34><color=#FF0000>Special</color> Offer</size>","<size=34>特惠<color=#FF0000>礼</color>包</size>"],[169,"Tips_105","<color=#FF0000>Items</color>","道<color=#FF0000>具</color>"],[170,"Tips_106","<color=#FF0000>Firearms</color>","枪<color=#FF0000>械</color>"],[171,"Tips_107","<size=34>Party Coin Store</size>","<size=34>功能物品</size>"],[172,"Tips_108","<size=34>Abnormal Coin Store</size>","<size=34>不正常币商城</size>"],[173,"Tips_109","<size=34>Special Offer</size>","<size=34>特惠礼包</size>"],[174,"Tips_110","Items","道具"],[175,"Tips_111","Firearms","枪械"],[176,"Tips_112","Value Pack","超值礼包"],[177,"Tips_113","Membership","特权会员"],[178,"Tips_114","<size=34><color=#FF0000>Value</color> Pack</size>","<size=34>超值<color=#FF0000>礼</color>包</size>"],[179,"Tips_115","<size=34><color=#FF0000>Member</color>ship</size>","<size=34>特权<color=#FF0000>会</color>员</size>"],[180,"Tips_116","Dynamic Pop Gun 3-day Experience Voucher","动感波枪3天体验卡"],[181,"Tips_117","Dynamic Pop Gun 7-day Experience Voucher","动感波枪7天体验卡"],[182,"Tips_118","Out of bullets. Change another gun!","没有子弹了 换一把枪吧"],[183,"Tips_119","Out of bullets. Go find more ammo!","没子弹了，快去寻找子弹"],[184,"Tips_120","Insufficient Respawn Coins.","复活币数量不足"],[185,"Tips_121","Experience expires in {0}d {1}h {2}min","剩余体验时间：<color=#00FF83FF>{0}天{1}时{2}分</color>"],[186,"Tips_122","The night is over, you have caught a total of ${0} players tonight.","夜晚结束，你今晚一共抓捕${0}个玩家"],[187,"Tips_123","Function unavailable, please update the app to the latest version.","功能未开放, 请升级到最新版本"],[188,"Tips_124","Order payment failure.","订单支付失败"],[189,"Tips_125","Claimed successfully.","领取成功"],[190,"Tips_126","Purchase successful!","购买成功"],[191,"Tips_127","Claimed successfully. Obtained the following items:","领取成功，获得以下道具"],[192,"Tips_128","Purchase successful. Obtained the following items:","购买成功，获得以下道具"],[193,"Tips_129","<size=24>Shapeshift Cards will be displayed in <color=#FF0000>Backpack</color>. Open the backpack and tap to <color=#FF0000>use it</color>.</size>","<size=24>变身卡会显示在<color=#FF0000>背包</color>里，打开背包点击<color=#FF0000>使用变身卡</color></size>"],[194,"Tips_130","<size=24><color=#FF0000>After using Shapeshift Card</color>, a <color=#FF0000>shape selection window will pop up</color>, <color=#FF0000>select</color> the monster shape you want to turn into at night and <color=#FF0000>confirm</color>.</size>","<size=24><color=#FF0000>使用变身卡</color>后会弹出<color=#FF0000>变身选择弹窗</color>，<color=#FF0000>点击</color>你想变身的怪物并<color=#FF0000>确定</color>，就可以在当天<color=#FF0000>夜晚变身</color>成为怪物啦</size>"],[195,"Tips_131","<size=24>After <color=#FF0000>transforming into a monster</color>. You can <color=#FF0000>capture</color> other players and <color=#FF0000>lock</color> them in the < <color=#FF0000>Basement</color>.</size>","<size=24>变身<color=#FF0000>成为怪物后</color>你可以<color=#FF0000>对其他玩家</color>进行<color=#FF0000>抓捕</color>，并将他们放到<color=#FF0000>地下室</color></size>"],[196,"Tips_132","<size=24>Tap the <color=#FF0000>dance button</color> on the right to show spin wheel, <color=#FF0000>drag the button</color> after selecting the dance, aim at the monster and <color=#FF0000>fire bullets</color> to make the monster dance.</size>","<size=24>点击右侧的<color=#FF0000>舞蹈按钮</color>会出现轮盘，<color=#FF0000>拖动按钮</color>选择舞蹈后，对准怪物<color=#FF0000>发射子弹</color>就可以让怪物翩翩起舞啦</size>"],[197,"ChangeMonster_4","Are you sure to select this monster?","确定选择这个怪物吗？"],[198,"ChangeMonster_5","Are you sure to select this monster?","确定选择这个怪物吗？"],[199,"ChangeMonster_1","The rest of the night time is short. Are you sure to shapeshift?","黑夜所剩时间较短，是否变身？"],[200,"ChangeMonster_2","You have already used the Shapeshift Card tonight.","您当夜已使用过变身卡"],[201,"ChangeMonster_3","Already selected by another player. Please select again.","已有玩家选择，请重新选择"],[202,"Tips_133","Nightmare <color=#FF0000>Invasion</color> Survival <color=#FF0000>Guide</color>","梦<color=#FF0000>魇</color>入侵<color=#FF0000>法</color>则"],[203,"Tips_134","Premium Membership","超值VIP"],[204,"Tips_135","<color=#8E0005>Member-only</color> Namecard","会<color=#8E0005>员</color>专属名牌"],[205,"Tips_136","Get <color=#8E0005FF>privileges</color> for <color=#FFD100FF>30</color> consecutive days","连续<color=#FFD100FF>30</color>日获得<color=#8E0005FF>特权</color>"],[206,"Tips_137","Congratulations on successfully purchasing the <color=#FF0000>Value Pack</color>, you can <color=#FF0000>claim extra item reward for three consecutive days</color>!","恭喜你成功购买<color=#FF0000>超值礼包</color>，可<color=#FF0000>连续三日</color>领取道具奖励"],[207,"Tips_138","Congratulations on successfully purchasing the <color=#FF0000>Membership</color>, <color=#FF0000>sign in daily</color> to claim exclusive rewards!","恭喜你成功购买<color=#FF0000>特权会员</color>，<color=#FF0000>每日上线</color>可领取专属奖励"],[208,"Tips_139","The item is available immediately after purchase.","购买后可立即获得该物品"],[209,"Tips_140","Hot Sale","热<color=#FF0000>销</color>"],[210,"Tips_141","Tap the sneak attack button to stun the monster","点击偷袭按钮击晕怪物"],[211,"Tips_142","Respawn Coin X","剩余复活币 X"],[212,"Tips_143","Use","使用"],[213,"Tips_144","Sign in for <color=#FFD100FF>3</color> days to <color=#FFD100FF>claim bonus items</color>","连续<color=#FFD100FF>3</color>日<color=#FFD100FF>领取道具</color>"],[214,"Tips_145","Great Value 1200%","超值1200%"],[215,"Tips_146","Buy","购买"],[216,"Tips_147","Ultra Supply Pack","超级补给礼包"],[217,"Tips_148","Dynamic Pop Gun 1-day","<color=#FFD100FF>动感波枪</color>1日"],[218,"Tips_149","Respawn Coin ⅹ5","<color=#FFD100FF>复活币</color>X5"],[219,"Tips_150","Shapeshift Card ⅹ1","<color=#FFD100FF>变身卡</color>X1"],[220,"Tips_151","Respawn Coin ⅹ2","<color=#FFD100FF>复活币</color>X2"],[221,"Tips_152","Respawn Coin ⅹ3","<color=#FFD100FF>复活币</color>X3"],[222,"Tips_153","A useful item that can bring you back to life immediately.","可以让你立即复活的超有用道具"],[223,"Tips_154","After use, you can shapeshift into a monster that night and hunt down players.","使用后可以让你在当夜化身成为怪物，追捕玩家"],[224,"Tips_155","A powerful attack weapon. Monsters hit by it will be performing strange dances for a period of time.","强力的攻击武器，被击中的怪物会跳一些奇怪的舞蹈"],[225,"Tips_156","Dynamic Pop Bullets","动感波子弹"],[226,"Tips_157","Store","商<color=#FF0000>城</color>"],[227,"Tips_158","Shape<color=#FF0000>shift</color>","变身<color=#FF0000>选</color>择"],[228,"Tips_159","Already selected by another player","已有玩家选择"],[229,"Tips_160","Shapeshift","变身"],[230,"Tips_161","Item has expired：","物品过期："],[231,"Tips_162","Bullets are full","子弹已满"],[232,"Tips_163","get bullets","获得子弹"],[233,"Tips_164",null,"异常币不足，是否充值？"],[234,"Tips_165",null,null],[235,"Tips_166",null,null],[236,"Tips_167",null,null],[237,"Tips_168",null,null],[238,"Tips_169",null,null],[239,"Tips_170",null,null],[240,"Tips_171",null,null],[241,"Tips_172","<size=27>Dynamic Pop Gun</size>","<size=27>动感波枪</size>"],[242,"Tips_173","<size=27>Shapeshift Card</size>","<size=27>变身卡</size>"],[243,"Tips_174","Notice","提示"],[244,"Tips_175","Survival <color=#FF0000>Guide</color>","医<color=#FF0000>院</color>守则"],[245,"Tips_176","Premium","超值"],[246,"Tips_177","Membership","V\n I\n P"],[247,"Tips_178","Ivy Lady","屠夫"],[248,"Tips_179","Young Girl","面具男"],[249,"Tips_180","Toy Rabbit","玩具熊"],[250,"Tips_181","Kuchisake Onna","僵尸女"],[251,"Tips_182","Headless Horseman","无头骑士"],[252,"Tips_183","Zombie Woman","裂口女"],[253,"Tips_184","Teddy Bear","玩具兔"],[254,"Tips_185","Masked Man","萝莉"],[255,"Tips_186","Butcher","花缠"],[256,"Tips_187","Caught","抓捕"],[257,"Tips_188",null,"充值"],[258,"Tips_189",null,"充<color=#FF0000>值</color>"],[259,"Tips_190",null,"100异常币"],[260,"Tips_191",null,"600异常币"],[261,"Tips_192",null,"3000异常币"],[262,"Tips_193",null,"周福利礼包"],[263,"Tips_194",null,"周末特惠礼包1"],[264,"Tips_195",null,"周末特惠礼包2"],[265,"Tips_196",null,"团扇"],[266,"Tips_197",null,"神奇的扇子，可发射奇特的冲击波让怪物变成奇奇怪怪的东西"],[267,"Tips_198",null,"专属铭牌"],[268,"Tips_199",null,"特权VIP专属的贵族名牌"],[269,"Tips_200",null,"异常币"],[270,"Tips_201",null,"可用于购买不正常小镇系列游戏商品的稀有货币！"],[271,"Tips_202",null,"头饰"],[272,"Tips_203",null,"背饰"],[273,"Tips_204",null,"手饰"],[274,"Tips_205",null,"脚饰"],[275,"Tips_206",null,"装扮"],[276,"Tips_207",null,"头<color=#FF0000>饰</color>"],[277,"Tips_208",null,"背<color=#FF0000>饰</color>"],[278,"Tips_209",null,"手<color=#FF0000>饰</color>"],[279,"Tips_210",null,"脚<color=#FF0000>饰</color>"],[280,"Tips_211",null,"装<color=#FF0000>扮</color>"],[281,"Tips_212",null,"奢华花环"],[282,"Tips_213",null,"独角兽"],[283,"Tips_214",null,"圣诞鹿角"],[284,"Tips_215",null,"堕天使"],[285,"Tips_216",null,"火狐尾巴"],[286,"Tips_217",null,"翅膀"],[287,"Tips_218",null,"粉狐尾巴"],[288,"Tips_219",null,"卡通玩偶2"],[289,"Tips_220",null,"卡通玩偶3"],[290,"Tips_221",null,"彩虹拖尾"],[291,"Tips_222",null,"樱花拖尾"],[292,"Tips_223",null,"乐符拖尾"],[293,"Tips_224",null,"藤曼生长"],[294,"Tips_225",null,"像素电玩"],[295,"chat_1",null,"哭泣"],[296,"chat_2",null,"疑惑"],[297,"chat_3",null,"害羞"],[298,"chat_4",null,"烦躁"],[299,"chat_5",null,"兴奋"],[300,"chat_6",null,"生气"],[301,"chat_7",null,"无语"],[302,"chat_8",null,"尴尬"],[303,"chat_9",null,"黑脸"],[304,"chat_10",null,"科目三"],[305,"chat_11",null,"小熊跳舞"],[306,"chat_12",null,"极乐净土"],[307,"chat_13",null,"Queencard"],[308,"chat_14",null,"Bodyshaming"],[309,"chat_15",null,"叮当舞"],[310,"chat_16",null,"抖肩舞"],[311,"chat_17",null,"海草舞"],[312,"chat_18",null,"骑马舞"],[313,"chat_19",null,"恐龙抗狼"],[314,"chat_20",null,"无牙仔"],[315,"chat_21",null,"爱如火"],[316,"chat_22",null,"小猪跳舞"],[317,"chat_23",null,"Flower"],[318,"chat_24",null,"呱呱呱"],[319,"chat_25",null,"恭喜发财"],[320,"Tips_226",null,"抽奖券"],[321,"Tips_227",null,"感染币"],[322,"Tips_228",null,"感染<color=#FF0000>币</color>"],[323,"Tips_229",null,"表情包"],[324,"Tips_230",null,"抽奖券"],[325,"Tips_231",null,"小天使"],[326,"Tips_232",null,"小精灵"],[327,"Tips_233",null,"小恶魔"],[328,"Tips_234",null,"花仙子"],[329,"Tips_235",null,"绚丽烟花"],[330,"Tips_236",null,"坚强笑脸"],[331,"Tips_237",null,"魔法藤蔓"],[332,"Tips_238",null,"梦境时分"],[333,"Tips_239",null,"抽奖券"],[334,"Tips_240",null,"星云头环"],[335,"Tips_241",null,"天使之翼"],[336,"Tips_242",null,"旋转流光"],[337,"Tips_243",null,"气泡拖尾（左）"],[338,"Tips_244",null,"气泡拖尾（右）"],[339,"Tips_245",null,"光束拖尾（左）"],[340,"Tips_246",null,"光束拖尾（右）"],[341,"Tips_247",null,"死亡特效"],[342,"Tips_248",null,"入场特效"],[343,"Tips_249",null,"死亡<color=#FF0000>特效</color>"],[344,"Tips_250",null,"入场<color=#FF0000>特效</color>"],[345,"Tips_251",null,"抽奖券大礼包"]];
export interface ILanguageElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**多语言key*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**恢复了{0}点精神力！*/
	get Prop_Food_1():ILanguageElement{return this.getElement(1)};
	/**你活过了{0}天*/
	get DeadCount_Text_1():ILanguageElement{return this.getElement(2)};
	/**逃了{0}米*/
	get DeadCount_Text_2():ILanguageElement{return this.getElement(3)};
	/**确定*/
	get DeadCount_Text_7():ILanguageElement{return this.getElement(4)};
	/**你逃不出去的*/
	get Tips_1():ILanguageElement{return this.getElement(5)};
	/**确认*/
	get Common_Text_1():ILanguageElement{return this.getElement(6)};
	/**取消*/
	get Common_Text_2():ILanguageElement{return this.getElement(7)};
	/**返回*/
	get Common_Text_4():ILanguageElement{return this.getElement(8)};
	/**生命值*/
	get Hud_Text_1():ILanguageElement{return this.getElement(9)};
	/**已存活{0}天*/
	get Hud_Text_2():ILanguageElement{return this.getElement(10)};
	/**这里是<color=#dc143cff>超正常医院</color>
你现在正在接受治疗，乘着白天在医院里找找减轻痛苦的物品吧，
夜晚是治疗时间，<color=#dc143cff>他们</color>会好好医治你的，希望明天太阳升起时，还能再次见到你~*/
	get Login_Text_1():ILanguageElement{return this.getElement(11)};
	/**这里可没有能逃跑的地方！*/
	get Reset_Tips_1():ILanguageElement{return this.getElement(12)};
	/**<color=#dc143cff>天黑了</color>，新一轮的实验开始了！*/
	get Rules_Tips_1():ILanguageElement{return this.getElement(13)};
	/**家具城之星*/
	get Rank_Text_1():ILanguageElement{return this.getElement(14)};
	/**排名*/
	get Rank_Text_2():ILanguageElement{return this.getElement(15)};
	/**昵称*/
	get Rank_Text_3():ILanguageElement{return this.getElement(16)};
	/**已存活*/
	get Rank_Text_4():ILanguageElement{return this.getElement(17)};
	/**玩家 {0} 被抓走了,快去解救他*/
	get Text_Action_Name_14():ILanguageElement{return this.getElement(18)};
	/**背包已满*/
	get Text_Action_Name_15():ILanguageElement{return this.getElement(19)};
	/**距离晚上还有:{0}*/
	get Time_Text_1():ILanguageElement{return this.getElement(20)};
	/**距离早上还有:{0}*/
	get Time_Text_2():ILanguageElement{return this.getElement(21)};
	/**复活倒计时：{0}*/
	get Action_Text_1():ILanguageElement{return this.getElement(22)};
	/**失去了{0}点精神力！*/
	get Tips_01():ILanguageElement{return this.getElement(23)};
	/**道具已满*/
	get Tips_02():ILanguageElement{return this.getElement(24)};
	/**恭喜你又存活了一天，昨天你拯救了{0}人*/
	get Tips_03():ILanguageElement{return this.getElement(25)};
	/**遗憾你死在了昨夜，昨天你拯救了{0}人*/
	get Tips_04():ILanguageElement{return this.getElement(26)};
	/**操作太快*/
	get Tips_05():ILanguageElement{return this.getElement(27)};
	/**没有攻击道具,请先找到攻击道具*/
	get Tips_06():ILanguageElement{return this.getElement(28)};
	/**体力不足*/
	get Tips_07():ILanguageElement{return this.getElement(29)};
	/**镇静剂*/
	get Item_Name_1():ILanguageElement{return this.getElement(30)};
	/**实验药品*/
	get Item_Name_2():ILanguageElement{return this.getElement(31)};
	/**棒棒糖*/
	get Item_Name_3():ILanguageElement{return this.getElement(32)};
	/**苹果*/
	get Item_Name_4():ILanguageElement{return this.getElement(33)};
	/**甜甜圈*/
	get Item_Name_5():ILanguageElement{return this.getElement(34)};
	/**汉堡*/
	get Item_Name_6():ILanguageElement{return this.getElement(35)};
	/**生存*/
	get Tips_08():ILanguageElement{return this.getElement(36)};
	/**拯救*/
	get Tips_09():ILanguageElement{return this.getElement(37)};
	/**医院守则*/
	get Tips_10():ILanguageElement{return this.getElement(38)};
	/**超正常医院生存守则*/
	get Tips_11():ILanguageElement{return this.getElement(39)};
	/**1.<color=#B62B3D>镇静剂</color>是克制怪物的唯一手段，使用镇静剂<color=#B62B3D>偷袭</color>怪物，可以让它们陷入短暂的沉睡；
2.<color=#B62B3D>苹果、汉堡、药物、棒棒糖等</color>物资可以<color=#B62B3D>恢复少量精神力</color>，但是一些变质的食物吃下去反而会污染精神；
3.被抓起来的时候可以奋力<color=#B62B3D>挣扎</color>发出声音告知其他人，但是挣扎时会消耗较多精神力；
4.被抓起来后，在彻底陷入疯狂之前，都能被其他同伴<color=#B62B3D>解救</color>。*/
	get Tips_12():ILanguageElement{return this.getElement(40)};
	/**你是马头，负责移动*/
	get Tips_13():ILanguageElement{return this.getElement(41)};
	/**你是马身，负责跳跃*/
	get Tips_14():ILanguageElement{return this.getElement(42)};
	/**你是骑手，负责使用道具*/
	get Tips_15():ILanguageElement{return this.getElement(43)};
	/**解除合体*/
	get Tips_16():ILanguageElement{return this.getElement(44)};
	/**马弓手挑战*/
	get Tips_17():ILanguageElement{return this.getElement(45)};
	/**1.3个人同时进入光圈内，可以组成马弓手，每个人负责的位置随机；
2.每个位置负责的职责不同，马头负责移动，马身负责跳跃，骑马人负责使用道具；
3.点击界面左上角的按钮，可以解除马弓手组合。*/
	get Tips_18():ILanguageElement{return this.getElement(46)};
	/**换装*/
	get Tips_19():ILanguageElement{return this.getElement(47)};
	/**{0}折*/
	get Shop_Tips_1():ILanguageElement{return this.getElement(48)};
	/**已售罄*/
	get Shop_Tips_2():ILanguageElement{return this.getElement(49)};
	/**乐币不足请充值*/
	get Shop_Tips_8():ILanguageElement{return this.getElement(50)};
	/**购买成功*/
	get Shop_Tips_3():ILanguageElement{return this.getElement(51)};
	/**异常币不足*/
	get Shop_Tips_4():ILanguageElement{return this.getElement(52)};
	/**免费*/
	get Shop_Tips_5():ILanguageElement{return this.getElement(53)};
	/**限购：{0}*/
	get Shop_Tips_6():ILanguageElement{return this.getElement(54)};
	/**<s>{0}</s>{1}*/
	get Shop_Tips_7():ILanguageElement{return this.getElement(55)};
	/**背包：选择装备你的物品*/
	get Bag_Text_1():ILanguageElement{return this.getElement(56)};
	/**物品名称*/
	get Bag_Text_2():ILanguageElement{return this.getElement(57)};
	/**描述*/
	get Bag_Text_3():ILanguageElement{return this.getElement(58)};
	/**装备*/
	get Bag_Text_4():ILanguageElement{return this.getElement(59)};
	/**卸载*/
	get Bag_Text_5():ILanguageElement{return this.getElement(60)};
	/**丢弃*/
	get Bag_Text_6():ILanguageElement{return this.getElement(61)};
	/**<size=30>弹<color=#FF0000>药</color>{0}/{1}</size>*/
	get Weapon_Text_1():ILanguageElement{return this.getElement(62)};
	/**{0}把钥匙尚未放置*/
	get Text_Key_Number():ILanguageElement{return this.getElement(63)};
	/**全部钥匙已放置*/
	get Text_Key_Place():ILanguageElement{return this.getElement(64)};
	/**道具<color=#FF0000>购</color>买*/
	get Shop_Tips_9():ILanguageElement{return this.getElement(65)};
	/**礼包<color=#FF0000>购</color>买*/
	get Shop_Tips_10():ILanguageElement{return this.getElement(66)};
	/**已达到限购次数，请下次刷新再来*/
	get Shop_Tips_11():ILanguageElement{return this.getElement(67)};
	/**距离下次刷新<color=#FF0000>{0}天{1}时{2}分</color>*/
	get Shop_Tips_12():ILanguageElement{return this.getElement(68)};
	/**领取*/
	get Shop_Tips_13():ILanguageElement{return this.getElement(69)};
	/**明日再来*/
	get Shop_Tips_14():ILanguageElement{return this.getElement(70)};
	/**已领取全部奖励*/
	get Shop_Tips_15():ILanguageElement{return this.getElement(71)};
	/**是否花费{0}乐币购买特权会员?*/
	get Shop_Tips_16():ILanguageElement{return this.getElement(72)};
	/**特权VIP已购买*/
	get Shop_Tips_17():ILanguageElement{return this.getElement(73)};
	/**特权VIP剩余时间：<color=#81E881>{0}天{1}时</color>*/
	get Shop_Tips_18():ILanguageElement{return this.getElement(74)};
	/**您的特权会员已到期，可再次至特权会员界面进行购买*/
	get Shop_Tips_19():ILanguageElement{return this.getElement(75)};
	/**VIP剩余时间：<color=#81E881>{0}分</color>*/
	get Shop_Tips_20():ILanguageElement{return this.getElement(76)};
	/**已领取*/
	get Shop_Tips_21():ILanguageElement{return this.getElement(77)};
	/**领取当日奖励*/
	get Shop_Tips_22():ILanguageElement{return this.getElement(78)};
	/**null*/
	get Shop_Tips_23():ILanguageElement{return this.getElement(79)};
	/**欢迎来到<color=#FF0000>超正常医院</color>，研究员安娜特地为新入院的病人准备了一份<color=#FF0000>生存教程</color>，请问你是<color=#FF0000>新手</color>吗*/
	get Tips_20():ILanguageElement{return this.getElement(80)};
	/**<color=#FF0000>我是新手</color>*/
	get Tips_21():ILanguageElement{return this.getElement(81)};
	/**我是老手*/
	get Tips_22():ILanguageElement{return this.getElement(82)};
	/**我是老手*/
	get Tips_23():ILanguageElement{return this.getElement(83)};
	/**教程*/
	get Tips_24():ILanguageElement{return this.getElement(84)};
	/**<size=27>收集道具</size>*/
	get Tips_25():ILanguageElement{return this.getElement(85)};
	/**<size=27>使用道具</size>*/
	get Tips_26():ILanguageElement{return this.getElement(86)};
	/**<size=27>收集镇定剂</size>*/
	get Tips_27():ILanguageElement{return this.getElement(87)};
	/**<size=27> 拯救队友(夜间)</size>*/
	get Tips_28():ILanguageElement{return this.getElement(88)};
	/**<size=27>收集枪械</size>*/
	get Tips_29():ILanguageElement{return this.getElement(89)};
	/**<size=27>射击怪物(夜间)</size>*/
	get Tips_30():ILanguageElement{return this.getElement(90)};
	/**<size=27>寻找传送门(梦魇)</size>*/
	get Tips_31():ILanguageElement{return this.getElement(91)};
	/**<size=27>进入传送门(梦魇)</size>*/
	get Tips_32():ILanguageElement{return this.getElement(92)};
	/**<size=27>获得钥匙(梦魇)</size>*/
	get Tips_33():ILanguageElement{return this.getElement(93)};
	/**<size=27>激活钥匙(梦魇)</size>*/
	get Tips_34():ILanguageElement{return this.getElement(94)};
	/**<size=23>收集到3个回复道具</size>*/
	get Tips_35():ILanguageElement{return this.getElement(95)};
	/**<size=23>点击道具栏任意道具进行1次使用</size>*/
	get Tips_36():ILanguageElement{return this.getElement(96)};
	/**<size=23>收集到1个镇定剂</size>*/
	get Tips_37():ILanguageElement{return this.getElement(97)};
	/**<size=23> 前往地下室拯救一位被抓到的队友</size>*/
	get Tips_38():ILanguageElement{return this.getElement(98)};
	/**<size=23>收集一把脉冲枪</size>*/
	get Tips_39():ILanguageElement{return this.getElement(99)};
	/**<size=23>使用脉冲枪击中任意怪物</size>*/
	get Tips_40():ILanguageElement{return this.getElement(100)};
	/**<size=23>梦魇模式夜晚寻找到散落的传送门</size>*/
	get Tips_41():ILanguageElement{return this.getElement(101)};
	/**<size=23>进入传送门内寻找钥匙</size>*/
	get Tips_42():ILanguageElement{return this.getElement(102)};
	/**<size=23>拾取到任意一把钥匙</size>*/
	get Tips_43():ILanguageElement{return this.getElement(103)};
	/**<size=23>将任意一把钥匙递送到骷髅门处</size>*/
	get Tips_44():ILanguageElement{return this.getElement(104)};
	/**<size=24>游戏场景中散落着的许多<color=#FF0000>回复血量的道具</color>，靠近道具点击<color=#FF0000>交互按钮</color>就可以收集到啦</size>*/
	get Tips_45():ILanguageElement{return this.getElement(105)};
	/**<size=24><color=#FF0000>点击道具栏任意道具</color>，屏幕右侧会出现<color=#FF0000>道具的图标</color>，<color=#FF0000>点击图标</color>就可以使用道具了哦</size>*/
	get Tips_46():ILanguageElement{return this.getElement(106)};
	/**<size=24>场景中还有着特殊的道具：<color=#FF0000>镇定剂</color>，对怪物使用镇定剂可以造成<color=#FF0000>克制效果</color>，快去多收集一些吧</size>*/
	get Tips_47():ILanguageElement{return this.getElement(107)};
	/**<size=24> 角色被抓住后会被怪物送往<color=#FF0000>地下室</color>，前往<color=#FF0000>地下室</color>拯救被抓到的队友，靠近队友点击<color=#FF0000>交互按钮</color>即可救起</size>*/
	get Tips_48():ILanguageElement{return this.getElement(108)};
	/**<size=24><color=#FF0000>脉冲枪是</color>对付怪物非常有效的道具，在场景中寻找到脉冲枪吧！</size>*/
	get Tips_49():ILanguageElement{return this.getElement(109)};
	/**<size=24>点击道具栏的<color=#FF0000>脉冲枪</color>以后，屏幕上会出现<color=#FF0000>准心和发射按钮</color>，瞄准怪物后<color=#FF0000>点击发射即可命中怪物</color></size>*/
	get Tips_50():ILanguageElement{return this.getElement(110)};
	/**<size=24>梦魇模式是在某些夜晚随机出现的高难度玩法，在<color=#FF0000>梦魇模式</color>下，场景内会存在<color=#FF0000>5扇传送门</color>，传送门是<color=#FF0000>获胜的关键</color>，快去寻找！</size>*/
	get Tips_51():ILanguageElement{return this.getElement(111)};
	/**<size=24>进入<color=#FF0000>传送门</color>后会被传送到一个房间内，在中间可以找到<color=#FF0000>火焰钥匙（若房间内没有钥匙，就是被其他玩家捡走啦，继续寻找钥匙吧）</color></size>*/
	get Tips_52():ILanguageElement{return this.getElement(112)};
	/**<size=24>靠近钥匙<color=#FF0000>点击交互</color>就可以拾取钥匙了，被拾取的钥匙会<color=#FF0000>环绕在角色的四周</color>，如果此时<color=#FF0000>被怪物攻击到钥匙就会掉落</color></size>*/
	get Tips_53():ILanguageElement{return this.getElement(113)};
	/**<size=24>将钥匙带到场景的<color=#FF0000>骷髅门</color>处，钥匙会<color=#FF0000>自动飞向骷髅门</color>激活，<color=#FF0000>5把钥匙集齐后</color>就获得胜利啦！</size>*/
	get Tips_54():ILanguageElement{return this.getElement(114)};
	/**知道啦*/
	get Tips_55():ILanguageElement{return this.getElement(115)};
	/**{0}把钥匙尚未放置*/
	get Tips_56():ILanguageElement{return this.getElement(116)};
	/**全部钥匙已放置*/
	get Tips_57():ILanguageElement{return this.getElement(117)};
	/**梦魇入侵*/
	get Tips_58():ILanguageElement{return this.getElement(118)};
	/**背<color=#FF0000>包</color>*/
	get Tips_59():ILanguageElement{return this.getElement(119)};
	/**梦<color=#FF0000>魇</color>求生<color=#FF0000>法</color>则*/
	get Tips_60():ILanguageElement{return this.getElement(120)};
	/**<color=#FF0000>恭喜你，成功逃离梦魇</color>*/
	get Tips_61():ILanguageElement{return this.getElement(121)};
	/**梦<color=#FF0000>魇</color>入侵生存<color=#FF0000>法</color>则*/
	get Tips_62():ILanguageElement{return this.getElement(122)};
	/**怪物说明*/
	get Tips_63():ILanguageElement{return this.getElement(123)};
	/**寻找钥匙*/
	get Tips_64():ILanguageElement{return this.getElement(125)};
	/**获得胜利*/
	get Tips_65():ILanguageElement{return this.getElement(127)};
	/**脉冲枪*/
	get Tips_66():ILanguageElement{return this.getElement(129)};
	/**飞眼怪扫描到玩家后，会召唤怪物玛门对玩家进行攻击*/
	get Tips_67():ILanguageElement{return this.getElement(131)};
	/**玛门会锁定玩家进行射线攻击*/
	get Tips_68():ILanguageElement{return this.getElement(132)};
	/**躲避怪物，尽可能的寻找场景中的五座传送门并进入*/
	get Tips_69():ILanguageElement{return this.getElement(133)};
	/**在传送门中收集钥匙，收集到的钥匙会漂浮在玩家周围*/
	get Tips_70():ILanguageElement{return this.getElement(134)};
	/**将收集到的钥匙带到骷髅门附近会点亮骷髅头*/
	get Tips_71():ILanguageElement{return this.getElement(135)};
	/**当五个骷髅均被点亮时，当夜玩家成功存活！*/
	get Tips_72():ILanguageElement{return this.getElement(136)};
	/**使用脉冲枪可以让飞眼怪陷入混乱一段时间*/
	get Tips_73():ILanguageElement{return this.getElement(137)};
	/**对其余怪物使用也可对目标造成减速效果*/
	get Tips_74():ILanguageElement{return this.getElement(138)};
	/**下一页*/
	get Tips_75():ILanguageElement{return this.getElement(139)};
	/**上一页*/
	get Tips_76():ILanguageElement{return this.getElement(140)};
	/**容量上限：*/
	get Tips_77():ILanguageElement{return this.getElement(141)};
	/**消耗一只镇静剂，可以使怪物沉睡1分钟*/
	get Tips_78():ILanguageElement{return this.getElement(142)};
	/**医院研究出来的精神控制药品，目前还在测试阶段*/
	get Tips_79():ILanguageElement{return this.getElement(143)};
	/**随处可见的小零食*/
	get Tips_80():ILanguageElement{return this.getElement(144)};
	/**一天一苹果，医生远离我*/
	get Tips_81():ILanguageElement{return this.getElement(145)};
	/**餐后甜点，补充糖分的同时带来快乐*/
	get Tips_82():ILanguageElement{return this.getElement(146)};
	/**没有人能拒绝一个充满能量的香香汉堡*/
	get Tips_83():ILanguageElement{return this.getElement(147)};
	/**脉冲枪*/
	get Tips_84():ILanguageElement{return this.getElement(148)};
	/**强力的攻击武器，被击中的怪物会被控制一段时间*/
	get Tips_85():ILanguageElement{return this.getElement(149)};
	/**<size=30>弹<color=#FF0000>药</color>{0}/{1}</size>*/
	get Tips_86():ILanguageElement{return this.getElement(150)};
	/**恭喜玩家 {0} 获得{1}*/
	get Tips_87():ILanguageElement{return this.getElement(151)};
	/**真实之钥*/
	get Tips_88():ILanguageElement{return this.getElement(152)};
	/**纯真之钥*/
	get Tips_89():ILanguageElement{return this.getElement(153)};
	/**智慧之钥*/
	get Tips_90():ILanguageElement{return this.getElement(154)};
	/**信仰之钥*/
	get Tips_91():ILanguageElement{return this.getElement(155)};
	/**真理之钥*/
	get Tips_92():ILanguageElement{return this.getElement(156)};
	/**没有子弹了，换一把枪吧*/
	get Tips_93():ILanguageElement{return this.getElement(157)};
	/**逃离梦魇失败，你被梦魇吞噬了*/
	get Tips_94():ILanguageElement{return this.getElement(158)};
	/**梦境之门已开启，即将逃离梦魇*/
	get Tips_95():ILanguageElement{return this.getElement(159)};
	/**复活币*/
	get Tips_96():ILanguageElement{return this.getElement(160)};
	/**变身卡*/
	get Tips_97():ILanguageElement{return this.getElement(161)};
	/**动感波枪*/
	get Tips_98():ILanguageElement{return this.getElement(162)};
	/**每周礼包*/
	get Tips_99():ILanguageElement{return this.getElement(163)};
	/**复活币大礼包*/
	get Tips_100():ILanguageElement{return this.getElement(164)};
	/**变身卡大礼包*/
	get Tips_101():ILanguageElement{return this.getElement(165)};
	/**<size=34>功能<color=#FF0000>物</color>品</size>*/
	get Tips_102():ILanguageElement{return this.getElement(166)};
	/**<size=34>不正常币<color=#FF0000>商</color>城</size>*/
	get Tips_103():ILanguageElement{return this.getElement(167)};
	/**<size=34>特惠<color=#FF0000>礼</color>包</size>*/
	get Tips_104():ILanguageElement{return this.getElement(168)};
	/**道<color=#FF0000>具</color>*/
	get Tips_105():ILanguageElement{return this.getElement(169)};
	/**枪<color=#FF0000>械</color>*/
	get Tips_106():ILanguageElement{return this.getElement(170)};
	/**<size=34>功能物品</size>*/
	get Tips_107():ILanguageElement{return this.getElement(171)};
	/**<size=34>不正常币商城</size>*/
	get Tips_108():ILanguageElement{return this.getElement(172)};
	/**<size=34>特惠礼包</size>*/
	get Tips_109():ILanguageElement{return this.getElement(173)};
	/**道具*/
	get Tips_110():ILanguageElement{return this.getElement(174)};
	/**枪械*/
	get Tips_111():ILanguageElement{return this.getElement(175)};
	/**超值礼包*/
	get Tips_112():ILanguageElement{return this.getElement(176)};
	/**特权会员*/
	get Tips_113():ILanguageElement{return this.getElement(177)};
	/**<size=34>超值<color=#FF0000>礼</color>包</size>*/
	get Tips_114():ILanguageElement{return this.getElement(178)};
	/**<size=34>特权<color=#FF0000>会</color>员</size>*/
	get Tips_115():ILanguageElement{return this.getElement(179)};
	/**动感波枪3天体验卡*/
	get Tips_116():ILanguageElement{return this.getElement(180)};
	/**动感波枪7天体验卡*/
	get Tips_117():ILanguageElement{return this.getElement(181)};
	/**没有子弹了 换一把枪吧*/
	get Tips_118():ILanguageElement{return this.getElement(182)};
	/**没子弹了，快去寻找子弹*/
	get Tips_119():ILanguageElement{return this.getElement(183)};
	/**复活币数量不足*/
	get Tips_120():ILanguageElement{return this.getElement(184)};
	/**剩余体验时间：<color=#00FF83FF>{0}天{1}时{2}分</color>*/
	get Tips_121():ILanguageElement{return this.getElement(185)};
	/**夜晚结束，你今晚一共抓捕${0}个玩家*/
	get Tips_122():ILanguageElement{return this.getElement(186)};
	/**功能未开放, 请升级到最新版本*/
	get Tips_123():ILanguageElement{return this.getElement(187)};
	/**订单支付失败*/
	get Tips_124():ILanguageElement{return this.getElement(188)};
	/**领取成功*/
	get Tips_125():ILanguageElement{return this.getElement(189)};
	/**购买成功*/
	get Tips_126():ILanguageElement{return this.getElement(190)};
	/**领取成功，获得以下道具*/
	get Tips_127():ILanguageElement{return this.getElement(191)};
	/**购买成功，获得以下道具*/
	get Tips_128():ILanguageElement{return this.getElement(192)};
	/**<size=24>变身卡会显示在<color=#FF0000>背包</color>里，打开背包点击<color=#FF0000>使用变身卡</color></size>*/
	get Tips_129():ILanguageElement{return this.getElement(193)};
	/**<size=24><color=#FF0000>使用变身卡</color>后会弹出<color=#FF0000>变身选择弹窗</color>，<color=#FF0000>点击</color>你想变身的怪物并<color=#FF0000>确定</color>，就可以在当天<color=#FF0000>夜晚变身</color>成为怪物啦</size>*/
	get Tips_130():ILanguageElement{return this.getElement(194)};
	/**<size=24>变身<color=#FF0000>成为怪物后</color>你可以<color=#FF0000>对其他玩家</color>进行<color=#FF0000>抓捕</color>，并将他们放到<color=#FF0000>地下室</color></size>*/
	get Tips_131():ILanguageElement{return this.getElement(195)};
	/**<size=24>点击右侧的<color=#FF0000>舞蹈按钮</color>会出现轮盘，<color=#FF0000>拖动按钮</color>选择舞蹈后，对准怪物<color=#FF0000>发射子弹</color>就可以让怪物翩翩起舞啦</size>*/
	get Tips_132():ILanguageElement{return this.getElement(196)};
	/**确定选择这个怪物吗？*/
	get ChangeMonster_4():ILanguageElement{return this.getElement(197)};
	/**确定选择这个怪物吗？*/
	get ChangeMonster_5():ILanguageElement{return this.getElement(198)};
	/**黑夜所剩时间较短，是否变身？*/
	get ChangeMonster_1():ILanguageElement{return this.getElement(199)};
	/**您当夜已使用过变身卡*/
	get ChangeMonster_2():ILanguageElement{return this.getElement(200)};
	/**已有玩家选择，请重新选择*/
	get ChangeMonster_3():ILanguageElement{return this.getElement(201)};
	/**梦<color=#FF0000>魇</color>入侵<color=#FF0000>法</color>则*/
	get Tips_133():ILanguageElement{return this.getElement(202)};
	/**超值VIP*/
	get Tips_134():ILanguageElement{return this.getElement(203)};
	/**会<color=#8E0005>员</color>专属名牌*/
	get Tips_135():ILanguageElement{return this.getElement(204)};
	/**连续<color=#FFD100FF>30</color>日获得<color=#8E0005FF>特权</color>*/
	get Tips_136():ILanguageElement{return this.getElement(205)};
	/**恭喜你成功购买<color=#FF0000>超值礼包</color>，可<color=#FF0000>连续三日</color>领取道具奖励*/
	get Tips_137():ILanguageElement{return this.getElement(206)};
	/**恭喜你成功购买<color=#FF0000>特权会员</color>，<color=#FF0000>每日上线</color>可领取专属奖励*/
	get Tips_138():ILanguageElement{return this.getElement(207)};
	/**购买后可立即获得该物品*/
	get Tips_139():ILanguageElement{return this.getElement(208)};
	/**热<color=#FF0000>销</color>*/
	get Tips_140():ILanguageElement{return this.getElement(209)};
	/**点击偷袭按钮击晕怪物*/
	get Tips_141():ILanguageElement{return this.getElement(210)};
	/**剩余复活币 X*/
	get Tips_142():ILanguageElement{return this.getElement(211)};
	/**使用*/
	get Tips_143():ILanguageElement{return this.getElement(212)};
	/**连续<color=#FFD100FF>3</color>日<color=#FFD100FF>领取道具</color>*/
	get Tips_144():ILanguageElement{return this.getElement(213)};
	/**超值1200%*/
	get Tips_145():ILanguageElement{return this.getElement(214)};
	/**购买*/
	get Tips_146():ILanguageElement{return this.getElement(215)};
	/**超级补给礼包*/
	get Tips_147():ILanguageElement{return this.getElement(216)};
	/**<color=#FFD100FF>动感波枪</color>1日*/
	get Tips_148():ILanguageElement{return this.getElement(217)};
	/**<color=#FFD100FF>复活币</color>X5*/
	get Tips_149():ILanguageElement{return this.getElement(218)};
	/**<color=#FFD100FF>变身卡</color>X1*/
	get Tips_150():ILanguageElement{return this.getElement(219)};
	/**<color=#FFD100FF>复活币</color>X2*/
	get Tips_151():ILanguageElement{return this.getElement(220)};
	/**<color=#FFD100FF>复活币</color>X3*/
	get Tips_152():ILanguageElement{return this.getElement(221)};
	/**可以让你立即复活的超有用道具*/
	get Tips_153():ILanguageElement{return this.getElement(222)};
	/**使用后可以让你在当夜化身成为怪物，追捕玩家*/
	get Tips_154():ILanguageElement{return this.getElement(223)};
	/**强力的攻击武器，被击中的怪物会跳一些奇怪的舞蹈*/
	get Tips_155():ILanguageElement{return this.getElement(224)};
	/**动感波子弹*/
	get Tips_156():ILanguageElement{return this.getElement(225)};
	/**商<color=#FF0000>城</color>*/
	get Tips_157():ILanguageElement{return this.getElement(226)};
	/**变身<color=#FF0000>选</color>择*/
	get Tips_158():ILanguageElement{return this.getElement(227)};
	/**已有玩家选择*/
	get Tips_159():ILanguageElement{return this.getElement(228)};
	/**变身*/
	get Tips_160():ILanguageElement{return this.getElement(229)};
	/**物品过期：*/
	get Tips_161():ILanguageElement{return this.getElement(230)};
	/**子弹已满*/
	get Tips_162():ILanguageElement{return this.getElement(231)};
	/**获得子弹*/
	get Tips_163():ILanguageElement{return this.getElement(232)};
	/**异常币不足，是否充值？*/
	get Tips_164():ILanguageElement{return this.getElement(233)};
	/**null*/
	get Tips_165():ILanguageElement{return this.getElement(234)};
	/**null*/
	get Tips_166():ILanguageElement{return this.getElement(235)};
	/**null*/
	get Tips_167():ILanguageElement{return this.getElement(236)};
	/**null*/
	get Tips_168():ILanguageElement{return this.getElement(237)};
	/**null*/
	get Tips_169():ILanguageElement{return this.getElement(238)};
	/**null*/
	get Tips_170():ILanguageElement{return this.getElement(239)};
	/**null*/
	get Tips_171():ILanguageElement{return this.getElement(240)};
	/**<size=27>动感波枪</size>*/
	get Tips_172():ILanguageElement{return this.getElement(241)};
	/**<size=27>变身卡</size>*/
	get Tips_173():ILanguageElement{return this.getElement(242)};
	/**提示*/
	get Tips_174():ILanguageElement{return this.getElement(243)};
	/**医<color=#FF0000>院</color>守则*/
	get Tips_175():ILanguageElement{return this.getElement(244)};
	/**超值*/
	get Tips_176():ILanguageElement{return this.getElement(245)};
	/**V
 I
 P*/
	get Tips_177():ILanguageElement{return this.getElement(246)};
	/**屠夫*/
	get Tips_178():ILanguageElement{return this.getElement(247)};
	/**面具男*/
	get Tips_179():ILanguageElement{return this.getElement(248)};
	/**玩具熊*/
	get Tips_180():ILanguageElement{return this.getElement(249)};
	/**僵尸女*/
	get Tips_181():ILanguageElement{return this.getElement(250)};
	/**无头骑士*/
	get Tips_182():ILanguageElement{return this.getElement(251)};
	/**裂口女*/
	get Tips_183():ILanguageElement{return this.getElement(252)};
	/**玩具兔*/
	get Tips_184():ILanguageElement{return this.getElement(253)};
	/**萝莉*/
	get Tips_185():ILanguageElement{return this.getElement(254)};
	/**花缠*/
	get Tips_186():ILanguageElement{return this.getElement(255)};
	/**抓捕*/
	get Tips_187():ILanguageElement{return this.getElement(256)};
	/**充值*/
	get Tips_188():ILanguageElement{return this.getElement(257)};
	/**充<color=#FF0000>值</color>*/
	get Tips_189():ILanguageElement{return this.getElement(258)};
	/**100异常币*/
	get Tips_190():ILanguageElement{return this.getElement(259)};
	/**600异常币*/
	get Tips_191():ILanguageElement{return this.getElement(260)};
	/**3000异常币*/
	get Tips_192():ILanguageElement{return this.getElement(261)};
	/**周福利礼包*/
	get Tips_193():ILanguageElement{return this.getElement(262)};
	/**周末特惠礼包1*/
	get Tips_194():ILanguageElement{return this.getElement(263)};
	/**周末特惠礼包2*/
	get Tips_195():ILanguageElement{return this.getElement(264)};
	/**团扇*/
	get Tips_196():ILanguageElement{return this.getElement(265)};
	/**神奇的扇子，可发射奇特的冲击波让怪物变成奇奇怪怪的东西*/
	get Tips_197():ILanguageElement{return this.getElement(266)};
	/**专属铭牌*/
	get Tips_198():ILanguageElement{return this.getElement(267)};
	/**特权VIP专属的贵族名牌*/
	get Tips_199():ILanguageElement{return this.getElement(268)};
	/**异常币*/
	get Tips_200():ILanguageElement{return this.getElement(269)};
	/**可用于购买不正常小镇系列游戏商品的稀有货币！*/
	get Tips_201():ILanguageElement{return this.getElement(270)};
	/**头饰*/
	get Tips_202():ILanguageElement{return this.getElement(271)};
	/**背饰*/
	get Tips_203():ILanguageElement{return this.getElement(272)};
	/**手饰*/
	get Tips_204():ILanguageElement{return this.getElement(273)};
	/**脚饰*/
	get Tips_205():ILanguageElement{return this.getElement(274)};
	/**装扮*/
	get Tips_206():ILanguageElement{return this.getElement(275)};
	/**头<color=#FF0000>饰</color>*/
	get Tips_207():ILanguageElement{return this.getElement(276)};
	/**背<color=#FF0000>饰</color>*/
	get Tips_208():ILanguageElement{return this.getElement(277)};
	/**手<color=#FF0000>饰</color>*/
	get Tips_209():ILanguageElement{return this.getElement(278)};
	/**脚<color=#FF0000>饰</color>*/
	get Tips_210():ILanguageElement{return this.getElement(279)};
	/**装<color=#FF0000>扮</color>*/
	get Tips_211():ILanguageElement{return this.getElement(280)};
	/**奢华花环*/
	get Tips_212():ILanguageElement{return this.getElement(281)};
	/**独角兽*/
	get Tips_213():ILanguageElement{return this.getElement(282)};
	/**圣诞鹿角*/
	get Tips_214():ILanguageElement{return this.getElement(283)};
	/**堕天使*/
	get Tips_215():ILanguageElement{return this.getElement(284)};
	/**火狐尾巴*/
	get Tips_216():ILanguageElement{return this.getElement(285)};
	/**翅膀*/
	get Tips_217():ILanguageElement{return this.getElement(286)};
	/**粉狐尾巴*/
	get Tips_218():ILanguageElement{return this.getElement(287)};
	/**卡通玩偶2*/
	get Tips_219():ILanguageElement{return this.getElement(288)};
	/**卡通玩偶3*/
	get Tips_220():ILanguageElement{return this.getElement(289)};
	/**彩虹拖尾*/
	get Tips_221():ILanguageElement{return this.getElement(290)};
	/**樱花拖尾*/
	get Tips_222():ILanguageElement{return this.getElement(291)};
	/**乐符拖尾*/
	get Tips_223():ILanguageElement{return this.getElement(292)};
	/**藤曼生长*/
	get Tips_224():ILanguageElement{return this.getElement(293)};
	/**像素电玩*/
	get Tips_225():ILanguageElement{return this.getElement(294)};
	/**哭泣*/
	get chat_1():ILanguageElement{return this.getElement(295)};
	/**疑惑*/
	get chat_2():ILanguageElement{return this.getElement(296)};
	/**害羞*/
	get chat_3():ILanguageElement{return this.getElement(297)};
	/**烦躁*/
	get chat_4():ILanguageElement{return this.getElement(298)};
	/**兴奋*/
	get chat_5():ILanguageElement{return this.getElement(299)};
	/**生气*/
	get chat_6():ILanguageElement{return this.getElement(300)};
	/**无语*/
	get chat_7():ILanguageElement{return this.getElement(301)};
	/**尴尬*/
	get chat_8():ILanguageElement{return this.getElement(302)};
	/**黑脸*/
	get chat_9():ILanguageElement{return this.getElement(303)};
	/**科目三*/
	get chat_10():ILanguageElement{return this.getElement(304)};
	/**小熊跳舞*/
	get chat_11():ILanguageElement{return this.getElement(305)};
	/**极乐净土*/
	get chat_12():ILanguageElement{return this.getElement(306)};
	/**Queencard*/
	get chat_13():ILanguageElement{return this.getElement(307)};
	/**Bodyshaming*/
	get chat_14():ILanguageElement{return this.getElement(308)};
	/**叮当舞*/
	get chat_15():ILanguageElement{return this.getElement(309)};
	/**抖肩舞*/
	get chat_16():ILanguageElement{return this.getElement(310)};
	/**海草舞*/
	get chat_17():ILanguageElement{return this.getElement(311)};
	/**骑马舞*/
	get chat_18():ILanguageElement{return this.getElement(312)};
	/**恐龙抗狼*/
	get chat_19():ILanguageElement{return this.getElement(313)};
	/**无牙仔*/
	get chat_20():ILanguageElement{return this.getElement(314)};
	/**爱如火*/
	get chat_21():ILanguageElement{return this.getElement(315)};
	/**小猪跳舞*/
	get chat_22():ILanguageElement{return this.getElement(316)};
	/**Flower*/
	get chat_23():ILanguageElement{return this.getElement(317)};
	/**呱呱呱*/
	get chat_24():ILanguageElement{return this.getElement(318)};
	/**恭喜发财*/
	get chat_25():ILanguageElement{return this.getElement(319)};
	/**抽奖券*/
	get Tips_226():ILanguageElement{return this.getElement(320)};
	/**感染币*/
	get Tips_227():ILanguageElement{return this.getElement(321)};
	/**感染<color=#FF0000>币</color>*/
	get Tips_228():ILanguageElement{return this.getElement(322)};
	/**表情包*/
	get Tips_229():ILanguageElement{return this.getElement(323)};
	/**抽奖券*/
	get Tips_230():ILanguageElement{return this.getElement(324)};
	/**小天使*/
	get Tips_231():ILanguageElement{return this.getElement(325)};
	/**小精灵*/
	get Tips_232():ILanguageElement{return this.getElement(326)};
	/**小恶魔*/
	get Tips_233():ILanguageElement{return this.getElement(327)};
	/**花仙子*/
	get Tips_234():ILanguageElement{return this.getElement(328)};
	/**绚丽烟花*/
	get Tips_235():ILanguageElement{return this.getElement(329)};
	/**坚强笑脸*/
	get Tips_236():ILanguageElement{return this.getElement(330)};
	/**魔法藤蔓*/
	get Tips_237():ILanguageElement{return this.getElement(331)};
	/**梦境时分*/
	get Tips_238():ILanguageElement{return this.getElement(332)};
	/**抽奖券*/
	get Tips_239():ILanguageElement{return this.getElement(333)};
	/**星云头环*/
	get Tips_240():ILanguageElement{return this.getElement(334)};
	/**天使之翼*/
	get Tips_241():ILanguageElement{return this.getElement(335)};
	/**旋转流光*/
	get Tips_242():ILanguageElement{return this.getElement(336)};
	/**气泡拖尾（左）*/
	get Tips_243():ILanguageElement{return this.getElement(337)};
	/**气泡拖尾（右）*/
	get Tips_244():ILanguageElement{return this.getElement(338)};
	/**光束拖尾（左）*/
	get Tips_245():ILanguageElement{return this.getElement(339)};
	/**光束拖尾（右）*/
	get Tips_246():ILanguageElement{return this.getElement(340)};
	/**死亡特效*/
	get Tips_247():ILanguageElement{return this.getElement(341)};
	/**入场特效*/
	get Tips_248():ILanguageElement{return this.getElement(342)};
	/**死亡<color=#FF0000>特效</color>*/
	get Tips_249():ILanguageElement{return this.getElement(343)};
	/**入场<color=#FF0000>特效</color>*/
	get Tips_250():ILanguageElement{return this.getElement(344)};
	/**抽奖券大礼包*/
	get Tips_251():ILanguageElement{return this.getElement(345)};

}