import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Mode","Time","Name","Describe","Num","Order","Picture","Text","IsShow"],["","","","","","","","","",""],[1,[null],[null],"<size=27>收集道具</size>","<size=23>收集到3个回复道具</size>",3,1,"304011","<size=24>游戏场景中散落着的许多<color=#FF0000>回复血量的道具</color>，靠近道具点击<color=#FF0000>交互按钮</color>就可以收集到啦</size>",true],[2,[null],[null],"<size=27>使用道具</size>","<size=23>点击道具栏任意道具进行1次使用</size>",1,2,"304002","<size=24><color=#FF0000>点击道具栏任意道具</color>，屏幕右侧会出现<color=#FF0000>道具的图标</color>，<color=#FF0000>点击图标</color>就可以使用道具了哦</size>",true],[3,[null],[null],"<size=27>收集镇定剂</size>","<size=23>收集到1个镇定剂</size>",1,3,"304004","<size=24>场景中还有着特殊的道具：<color=#FF0000>镇定剂</color>，对怪物使用镇定剂可以造成<color=#FF0000>克制效果</color>，快去多收集一些吧</size>",true],[4,[null],[2],"<size=27> 拯救队友(夜间)</size>","<size=23> 前往地下室拯救一位被抓到的队友</size>",1,5,"303998","<size=24> 角色被抓住后会被怪物送往<color=#FF0000>地下室</color>，前往<color=#FF0000>地下室</color>拯救被抓到的队友，靠近队友点击<color=#FF0000>交互按钮</color>即可救起</size>",true],[5,[null],[null],"<size=27>收集枪械</size>","<size=23>收集一把脉冲枪</size>",1,6,"303996","<size=24><color=#FF0000>脉冲枪是</color>对付怪物非常有效的道具，在场景中寻找到脉冲枪吧！</size>",true],[6,[null],[2],"<size=27>射击怪物(夜间)</size>","<size=23>使用脉冲枪击中任意怪物</size>",3,7,"304003","<size=24>点击道具栏的<color=#FF0000>脉冲枪</color>以后，屏幕上会出现<color=#FF0000>准心和发射按钮</color>，瞄准怪物后<color=#FF0000>点击发射即可命中怪物</color></size>",true],[7,[2],[2],"<size=27>寻找传送门(梦魇)</size>","<size=23>梦魇模式夜晚寻找到散落的传送门</size>",1,8,"304010","<size=24>梦魇模式是在某些夜晚随机出现的高难度玩法，在<color=#FF0000>梦魇模式</color>下，场景内会存在<color=#FF0000>5扇传送门</color>，传送门是<color=#FF0000>获胜的关键</color>，快去寻找！</size>",true],[8,[2],[2],"<size=27>进入传送门(梦魇)</size>","<size=23>进入传送门内寻找钥匙</size>",1,9,"303995","<size=24>进入<color=#FF0000>传送门</color>后会被传送到一个房间内，在中间可以找到<color=#FF0000>火焰钥匙（若房间内没有钥匙，就是被其他玩家捡走啦，继续寻找钥匙吧）</color></size>",true],[9,[2],[2],"<size=27>获得钥匙(梦魇)</size>","<size=23>拾取到任意一把钥匙</size>",1,10,"304012","<size=24>靠近钥匙<color=#FF0000>点击交互</color>就可以拾取钥匙了，被拾取的钥匙会<color=#FF0000>环绕在角色的四周</color>，如果此时<color=#FF0000>被怪物攻击到钥匙就会掉落</color></size>",true],[10,[2],[2],"<size=27>激活钥匙(梦魇)</size>","<size=23>将任意一把钥匙递送到骷髅门处</size>",1,11,"304008","<size=24>将钥匙带到场景的<color=#FF0000>骷髅门</color>处，钥匙会<color=#FF0000>自动飞向骷髅门</color>激活，<color=#FF0000>5把钥匙集齐后</color>就获得胜利啦！</size>",true],[11,[null],[null],"<size=27>舞蹈枪</size>","<size=23>点击右侧得舞蹈按钮会弹出舞蹈类型轮盘，选择舞蹈后，对转怪物发射就可以让怪物翩翩起舞啦</size>",1,12,"317490","<size=24>点击右侧的<color=#FF0000>舞蹈按钮</color>会出现轮盘，<color=#FF0000>拖动按钮</color>选择舞蹈后，对准怪物<color=#FF0000>发射子弹</color>就可以让怪物翩翩起舞啦</size>",false],[12,[null],[null],"<size=27>变身卡</size>","<size=23>变身卡会显示在背包里，打开背包点击使用变身卡</size>",1,13,"317491","<size=24>变身卡会显示在<color=#FF0000>背包</color>里，打开背包点击<color=#FF0000>使用变身卡</color></size>",false],[13,[null],[null],"<size=27>变身卡</size>","<size=23>使用变身卡后会弹出变身选择弹窗，点击你想变身的怪物并确定，就可以在当天夜晚变身成为怪物啦</size>",1,14,"317492","<size=24><color=#FF0000>使用变身卡</color>后会弹出<color=#FF0000>变身选择弹窗</color>，<color=#FF0000>点击</color>你想变身的怪物并<color=#FF0000>确定</color>，就可以在当天<color=#FF0000>夜晚变身</color>成为怪物啦</size>",false],[14,[null],[null],"<size=27>变身卡</size>","<size=23>变身成为怪物后你可以对其他玩家进行抓捕，并将他们放到地下室</size>",1,15,"317493","<size=24>变身<color=#FF0000>成为怪物后</color>你可以<color=#FF0000>对其他玩家</color>进行<color=#FF0000>抓捕</color>，并将他们放到<color=#FF0000>地下室</color></size>",false]];
export interface ITaskElement extends IElementBase{
 	/**id*/
	id:number
	/**模式*/
	Mode:Array<number>
	/**开启任务时间段*/
	Time:Array<number>
	/**任务名*/
	Name:string
	/**任务描述*/
	Describe:string
	/**完成所需次数*/
	Num:number
	/**任务顺序*/
	Order:number
	/**弹窗图片*/
	Picture:string
	/**弹窗说明文本*/
	Text:string
	/**是否显示再任务栏中*/
	IsShow:boolean
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}