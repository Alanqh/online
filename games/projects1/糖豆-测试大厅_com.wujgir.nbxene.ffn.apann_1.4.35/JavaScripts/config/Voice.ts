import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guids","name","loop","SoundPropportion","distance"],["","tag","tag","tag","tag","tag"],[1,["34743","145637","134696","130708"],"大厅BGM",0,0.55,0,"进入大厅时播放",0,1],[2,["13976"],"匹配单独BGM",0,1,0,"匹配下落游戏时播放",1],[3,["117514"],"关卡中BGM",0,0.65,0,"玩家开始关卡时播放",0,null,"跟上一个风格需要差别大",null,"大厅第二关引导加了"],[4,["148665"],"3,2,1，go",1,1,0,"关卡开始倒计时播放",1,null,null,null,"大厅第二关引导加了"],[5,["178453"],"向上跳",1,1,0,"按下跳跃键",0,1],[6,["130809"],"飞扑",1,0.35,0,"玩家飞扑时播放",0,1],[7,["130809"],"大于一定的高度落地",1,0.4,0,"在大于一定的高度落地时播放",1,1],[8,["119061"],"移动",1,1,0,"在地面上走路时音效",0,1],[9,["148666"],"弹床机关",1,1,0,"玩家被弹床弹起时播放",0,1],[10,["148669"],"冲量受伤",1,1,1500,"玩家被除弹床外的冲量机关打到时播放",0,1],[11,["114008"],"死亡",1,1,0,"玩家掉到死亡区域时播放",1,1,null,null,"大厅引导流程已经添加"],[12,["148849"],"复活",1,1,0,"复活时",0,1,null,null,"大厅引导流程已经添加"],[13,["148664"],"显示结算UI",1,1,0,"玩家显示过关啦UI时播放",0],[14,["148664"],"方块结算晋级",1,1,0,"玩家站在方块上晋级时",0],[15,["148848"],"被淘汰",1,1,0,"玩家没能达到前几名被淘汰时播放",0],[16,["148848"],"超时",1,1,0,"玩家在关卡里超时时播放",0],[17,["119008"],"吃鸡",1,1,0,"玩家获得第一名后的结算界面播放",1],[18,["134703"],"通用按钮",1,1,0,"玩家点击按钮时播放",0,1,"除了特殊列出的按钮声音；所有按钮都是这个声音"],[19,["148847"],"匹配按钮",1,1,0,"玩家点击匹配按钮播放",0,1],[20,["127868"],"抽奖按钮",1,1,0,"玩家点击抽奖按钮播放",1,null,"跟普通的不一样",null,"大厅需要"],[21,["136208"],"吃钻石",1,1,0,"匹配时下落游戏吃钻石音效",0],[22,["148674"],"转盘",1,1,0,"玩家开始转盘时播放",0,1],[23,["148672"],"获得道具",1,1,0,"获得皮肤或表情或动作或拖尾播放",0,1,"可以看看效果，编辑器找找"],[24,["148672"],"获得金钱",1,1,0,"获得金钱时播放",0,1],[25,null,"跳跃时额外",1,1,0,"跳跃时其他的声音",2],[26,null,"飞扑时额外",1,1,0,"飞扑时另外一种声音",2],[27,null,"发送表情",1,1,0,"发送表情声音",2],[28,null,"做动作的",1,1,0,"做动作的声音",2],[29,null,"其他地面移动",1,1,0,"其他地面移动",2],[30,null,"其他机关",1,1,0,"其他机关",2],[31,["155479"],"转盘结束停顿声",1,1,0,"转盘结束停顿声",0,1],[32,["155480"],"转盘慢速转",0,1,0,"转盘慢速转",0,1],[33,["155481"],"拉杆声",1,1,0,"拉杆声",0,1],[34,["155482"],"转盘快速转",0,1,0,"转盘快速转",0,1],[35,["148652"],"新手引导CG单独BGM",0,1,0,"新手引导播放CG那一段时播放",1],[36,["157461"],"炸弹飞行音效",1,2,1000,"绑在炸弹上",1],[37,["124714"],"炸弹爆炸",1,1,1500,"在爆炸点播放",1],[38,["119030"],"足球进球的bgm",1,2,3000,"在球门处播放",1],[39,["119008"],"足球进球的欢呼声",1,2,2000,"在球门处播放",1],[40,["145517"],"踢球音效",1,0.4,5,"在玩家提中球时播放",1],[41,["130796"],"球飞远音效",1,1,2000,"在玩家将球踢飞时播放",1],[42,["124717"],"拔萝卜qte前半部分bgm",0,1,0,"拔萝卜qte前半部分bgm",1],[43,["124719"],"拔萝卜qte后半部分bgm",0,1,0,"拔萝卜qte后半部分bgm",1],[44,["124718"],"拔出萝卜后音效",1,1,0,"拔出萝卜后音效",1],[45,["124709"],"拔萝卜大成功音效",1,1,0,"拔萝卜大成功音效",1],[46,["124707"],"拔萝卜大成功音效",1,1,0,"拔萝卜大成功音效",1],[47,["124728"],"拔萝卜大成功音效",1,1,0,"拔萝卜大成功音效",1],[48,["124711"],"拔萝卜成功音效",1,1,0,"拔萝卜成功音效",1],[49,["124704"],"拔萝卜成功音效",1,1,0,"拔萝卜成功音效",1],[50,["124716"],"拔萝卜成功音效",1,1,0,"拔萝卜成功音效",1],[51,["135885"],"拔萝卜失败音效",1,1,0,"拔萝卜失败音效",1],[52,["124712"],"拔萝卜按钮音效",1,1,0,"拔萝卜按钮音效",1],[53,["136202"],"拾取贝壳",1,2,0],[54,["119832"],"展示",0,3,0],[55,["135885"],"钓鱼失败",1,4,0],[56,["137567"],"钓鱼成功",1,5,0],[57,["124703"],"拾取场景里的道具",1,1,0,"玩家拾取道具时播放一次，仅客户端，不需要别的玩家听到",1],[58,["96219"],"宝箱抽奖音效",1,1,0],[59,["124732"],"宝箱抽到了",1,1,0],[60,["126341"],"萝卜刀打中人音效",1,1,0,"萝卜刀打中人音效"],[61,["134703"],"点击萝卜刀按钮",1,1,0,"玩家点击萝卜刀按钮时播放"],[62,["137573"],"大跳空中翻滚声音",1,1,0,"大跳空中翻滚声音"],[63,["148669"],"17关撞上障碍物",1,1,0],[64,["148666"],"17关加速地板",1,1,0],[65,["115521"],"刷新幽灵",1,2,5000],[66,["117602"],"被幽灵锁定",1,1,0],[67,["29187"],"被幽灵捉住",1,2,0],[68,["12364"],"幽灵消失",1,0.6,500],[69,["135885"],"飞行受伤",1,3,1500,"在魔杖飞行碰到障碍物受伤时播放"],[70,["286362"],"结算bgm",0,1,0,"进入结算的时候播放"],[71,["286363"],"冠军bgm",0,1,0,"进入冠军镜头的时候播放"]];
export interface IVoiceElement extends IElementBase{
 	/**id*/
	id:number
	/**资源ID*/
	guids:Array<string>
	/**音效名称*/
	name:string
	/**循环播放次数(0=循环)*/
	loop:number
	/**音量比例(0~1)，1=音效原音量，实际音量可大于1*/
	SoundPropportion:number
	/**可以听见的距离*/
	distance:number
 } 
export class VoiceConfig extends ConfigBase<IVoiceElement>{
	constructor(){
		super(EXCELDATA);
	}

}