import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","name","guid","detail","detailContent","rarity","petScores","icon","scale","giftType","holdPos","holdRot","backPos","shoulderPos","trailPos","effectPos","collisionScale","collisionType","animationSet","gameAnimationSet","diveEffect","diveEffectPos","diveEffectRot","diveEffectScale","speedEffect","speedEffectPos","speedEffectRot","speedEffectScale","airEffect","airEffectPos","airEffectRot","airEffectScale","sleepEffectId","wakeEffectID","rarityGlobal","attachScale"],["","","Language","","Language","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],[10001,"奶牛猫","Pet_name_10001","159752","Pet_detailContent_10001","机灵顽皮的奶牛猫",4,6,"231287",new mw.Vector(2.5,2.5,2.5),0,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30001,new mw.Vector(0.4,0.4,0.4)],[10002,"白猫","Pet_name_10002","159751","Pet_detailContent_10002","性格温顺的白猫",4,6,"231283",new mw.Vector(2.5,2.5,2.5),0,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30001,new mw.Vector(0.4,0.4,0.4)],[10003,"橘猫","Pet_name_10003","159750","Pet_detailContent_10003","可爱又贪吃的橘猫",4,6,"231290",new mw.Vector(2.5,2.5,2.5),0,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30001,new mw.Vector(0.4,0.4,0.4)],[10004,"公主猫","Pet_name_10004","160250","Pet_detailContent_10004","住在城堡里的公主猫",3,25,"231294",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10005,"海盗王猫","Pet_name_10005","160373","Pet_detailContent_10005","拥有一艘舰船的海盗王猫",3,18,"231282",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10006,"波斯猫","Pet_name_10006","160191","Pet_detailContent_10006","眼睛像宝石的波斯猫",3,14,"231279",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10007,"沙滩猫","Pet_name_10007","160192","Pet_detailContent_10007","享受度假生活的沙滩猫",3,21,"231285",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10008,"无毛猫","Pet_name_10008","160382","Pet_detailContent_10008","怪异又警惕的无毛猫",3,12,"231281",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10009,"女巫猫","Pet_name_10009","159952","Pet_detailContent_10009","会骑着扫帚飞行的女巫猫",2,32,"231280",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10010,"萝卜猫","Pet_name_10010","160421","Pet_detailContent_10010","冬天也不怕冷的萝卜猫",2,24,"231286",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10011,"恐怖南瓜猫","Pet_name_10011","160391","Pet_detailContent_10011","不给糖就捣蛋！",2,33,"231284",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10012,"圣诞老人猫","Pet_name_10012","160446","Pet_detailContent_10012","乘坐驯鹿雪橇的圣诞老人猫",2,26,"231292",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10013,"大魔术师猫","Pet_name_10013","160235","Pet_detailContent_10013","神秘莫测的大魔术师猫",2,27,"231293",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10014,"地狱三头犬","Pet_name_10014","174697","Pet_detailContent_10014","看守地狱大门的三头犬",1,37,"231291",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30004,new mw.Vector(0.4,0.4,0.4)],[10015,"中华熊猫","Pet_name_10015","159933","Pet_detailContent_10015","喜欢吃竹子和睡懒觉的中华熊猫",1,35,"231289",new mw.Vector(1,1,1),1,new mw.Vector(0,0,60),new mw.Vector(0,0,0),new mw.Vector(0,0,60),new mw.Vector(0,10,50),new mw.Vector(0,-35,45),new mw.Vector(0,0,40),new mw.Vector(62.5,125,62.5),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(1,1,1),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(1,1,1),4367,27422,30004,new mw.Vector(1,1,1)],[10016,"迷你猪","Pet_name_10016","159590","Pet_detailContent_10016","圆滚滚香喷喷的迷你猪",1,34,"231288",new mw.Vector(1,1,1),1,new mw.Vector(0,0,60),new mw.Vector(0,0,0),new mw.Vector(0,10,70),new mw.Vector(0,25,55),new mw.Vector(0,-40,60),new mw.Vector(0,0,50),new mw.Vector(62.5,125,62.5),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(1,1,1),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(1,1,1),4367,27422,30004,new mw.Vector(1,1,1)],[10017,"铃铛猫","Pet_name_10017","160124","Pet_detailContent_10017","喜欢当显眼包的铃铛猫",3,18,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10018,"学霸猫","Pet_name_10018","160236","Pet_detailContent_10018","每次都考满分的学霸猫",3,23,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10019,"墨镜酷猫","Pet_name_10019","160213","Pet_detailContent_10019","真正的游戏高手墨镜酷猫",3,22,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10020,"虎猫","Pet_name_10020","160193","Pet_detailContent_10020","乍一看还以为是一只老虎",3,15,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10021,"豹猫","Pet_name_10021","160194","Pet_detailContent_10021","乍一看还以为是一只猎豹",3,15,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30002,new mw.Vector(0.4,0.4,0.4)],[10022,"春节鸿运猫","Pet_name_10022",null,"Pet_detailContent_10022","能够带来好运的春节鸿运猫",2,30,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10023,"财神爷猫","Pet_name_10023",null,"Pet_detailContent_10023","保佑发财的财神爷猫",2,32,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10024,"舞狮高手猫","Pet_name_10024",null,"Pet_detailContent_10024","身手矫健的舞狮高手猫",2,34,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10025,"登山猫","Pet_name_10025",null,"Pet_detailContent_10025","勇攀高峰的登山猫",2,26,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10026,"水手猫","Pet_name_10026",null,"Pet_detailContent_10026","乘风破浪的额水手猫",2,28,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30003,new mw.Vector(0.4,0.4,0.4)],[10027,"翠野云影猫","Pet_name_10027",null,"Pet_detailContent_10027",null,1,0,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30004,new mw.Vector(0.4,0.4,0.4)],[10028,"幻雪灵狐","Pet_name_10028",null,"Pet_detailContent_10028",null,1,0,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30004,new mw.Vector(0.4,0.4,0.4)],[10029,"祥瑞舞狮","Pet_name_10029",null,"Pet_detailContent_10029",null,1,0,null,new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30004,new mw.Vector(0.4,0.4,0.4)],[10030,"彩虹独角马","Pet_name_10030","174968","Pet_detailContent_10030","萌宠训练师基地的小主人",1,25,"290902",new mw.Vector(2.5,2.5,2.5),1,new mw.Vector(0,0,80),new mw.Vector(0,0,0),new mw.Vector(0,0,25),new mw.Vector(0,5,20),new mw.Vector(0,-15,20),new mw.Vector(0,0,15),new mw.Vector(25,50,25),1,10001,10001,"153601",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),"145496",new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.4,0.4,0.4),"153612",new mw.Vector(50,0,0),new mw.Vector(0,-90,0),new mw.Vector(0.4,0.4,0.4),4367,27422,30004,new mw.Vector(0.4,0.4,0.4)]];
export interface IPetElement extends IElementBase{
 	/**序号*/
	id:number
	/**名称策划看*/
	content:string
	/**宠物名称*/
	name:string
	/**宠物guid*/
	guid:string
	/**宠物文本描述*/
	detail:string
	/**宠物文本描述策划看*/
	detailContent:string
	/**宠物稀有度
0：神话（金）
1：传说（橙）
2：史诗（紫）
3：稀有（蓝）
4：普通（灰）*/
	rarity:number
	/**宠物的时尚分数*/
	petScores:number
	/**icon图标的资源库guid*/
	icon:string
	/**宠物体型缩放*/
	scale:mw.Vector
	/**是否为默认解锁
0：是
1：否*/
	giftType:number
	/**被托举时偏移*/
	holdPos:mw.Vector
	/**被托举时旋转*/
	holdRot:mw.Vector
	/**背部挂件偏移*/
	backPos:mw.Vector
	/**肩部挂件偏移*/
	shoulderPos:mw.Vector
	/**拖尾偏移*/
	trailPos:mw.Vector
	/**特效挂件偏移*/
	effectPos:mw.Vector
	/**碰撞盒大小
（横胶囊体下xz最小值为半径，y为长度）*/
	collisionScale:mw.Vector
	/**碰撞盒类型
（一般填1）
0：竖胶囊体
1：横胶囊体
2：方体
3：球体*/
	collisionType:number
	/**动作组
（引用PetAnimation表id）*/
	animationSet:number
	/**游戏内动作组
（引用PetGame表id）*/
	gameAnimationSet:number
	/**飞扑特效*/
	diveEffect:string
	/**飞扑特效偏移*/
	diveEffectPos:mw.Vector
	/**飞扑特效旋转*/
	diveEffectRot:mw.Vector
	/**飞扑特效缩放*/
	diveEffectScale:mw.Vector
	/**冲刺特效*/
	speedEffect:string
	/**冲刺特效偏移*/
	speedEffectPos:mw.Vector
	/**冲刺特效旋转*/
	speedEffectRot:mw.Vector
	/**冲刺特效缩放*/
	speedEffectScale:mw.Vector
	/**冲刺气流特效*/
	airEffect:string
	/**气流特效偏移*/
	airEffectPos:mw.Vector
	/**气流特效旋转*/
	airEffectRot:mw.Vector
	/**气流特效缩放*/
	airEffectScale:mw.Vector
	/**睡觉，特效表id*/
	sleepEffectId:number
	/**唤醒，特效表id*/
	wakeEffectID:number
	/**稀有度ui在global表里的key*/
	rarityGlobal:number
	/**挂载物缩放
（宠物缩放的倒数）*/
	attachScale:mw.Vector
 } 
export class PetConfig extends ConfigBase<IPetElement>{
	constructor(){
		super(EXCELDATA);
	}

}