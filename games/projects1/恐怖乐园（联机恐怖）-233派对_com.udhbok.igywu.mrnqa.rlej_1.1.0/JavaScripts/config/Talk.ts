import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","talk","talk_desc","isShowMission","talkTable","talkTableText","talkTableText_desc","talkTablePara"],["","Language","","","","","",""],[1,"赞美伟大的恐惧之神，又从异世界带来了美味稚嫩的新人，很快又有乐子了","赞美伟大的恐惧之神，又从异世界带来了美味稚嫩的新人，很快又有乐子了",0,[0],["你们是谁？"],null,[2]],[2,"我们？你不配知道，老老实实待着吧，明天，就会送你去恐怖乐园里，嘿嘿嘿","我们？你不配知道，老老实实待着吧，明天，就会送你去恐怖乐园里，嘿嘿嘿",0,[1],["别走"],null,null],[10,"恐怖乐园，那是什么地方，我得赶紧逃出去，先看看周围有没有什么可以逃出去的办法","恐怖乐园，那是什么地方，我得赶紧逃出去，先看看周围有没有什么可以逃出去的办法",0,[1],["探查下周围"],null,null],[100,"你醒了呀",null,1,[0],["这里是哪里"],["我为什么在这里"],[101]],[101,"你也是一个苦命人，被恐惧之神从异时空抓取到了这里，刚刚袭击你的是他的狂信徒",null,0,[0],["是你救了我么"],["是你救了我么"],[102]],[102,"救你只是顺手的小事，只有大家一起努力才能逃出这里",null,0,[0],["怎样才能逃出去"],["怎样才能逃出去"],[103]],[103,"找到恐惧之神，然后消灭它，才能逃出去",null,0,[0],["我要怎么才能找到他"],["我要怎么才能找到他"],[104]],[104,"我也不知道，通道那里有恐惧之神准备的游戏，那里或许会有答案",null,0,[1],["好的，我去看看"],["好的，我去看看"],null],[200,"你好，新来的食物",null,1,[0],["你是谁"],["你是谁"],[201]],[201,"我只是一个放弃希望的人罢了",null,0,[0],["你身后是什么"],["你身后是什么"],[202]],[202,"那是一个收藏室，专门收藏一些你找到的战利品",null,0,[1],["谢谢，我去看看"],["谢谢，我去看看"],[0]],[300,"你好哦，我的朋友",null,1,[0],["你为什么要在这里跳舞"],["你为什么要在这里跳舞"],[301]],[301,"在恐惧的日子里总是需要有人站出来鼓励大家",null,1,[0],["旁边的通道是干嘛的"],["旁边的通道是干嘛的"],[302]],[302,"那里是恐惧之神准备的挑战，只有通过了每一款游戏，才有可能见到他",null,1,[1],["谢谢你，我去看看"],["谢谢你，我去看看"],[0]],[400,"两个长得一模一样的人？！等等！好像哪里不对，听说最近乐园陷入了伪人危机，伪人会假扮成别人去活动，聪明的你能看出他们两个谁有问题吗？",null,1,[0,0],["左边","右边"],["左边","右边"],[402,401]],[401,"不愧是你！成功分辨出了伪人！乐园里面现在还有着很多伪人，他们总是神秘地潜伏在玩家之中，如果是你的话，一定可以将他们全都逮出来吧！快拿上【尖叫鸡】，将他们都清除！",null,0,[1],["好！包在我身上了！"],["好！包在我身上了！"],[0]],[402,"天哪！选择错误！不过没关系，这只是乐园给你的一个小测验，相信你现在已经能分辨了伪人和玩家了吧。赶紧拿上【尖叫鸡】，帮助乐园清除伪人，回归平静吧！",null,0,[1],["好！包在我身上了！"],["好！包在我身上了！"],[0]],[1000,"你找我有什么事","你找我有什么事",1,[0,1],["你吃饭了么","离开"],["你吃饭了么","离开"],[1001,0]],[1001,"没有吃，你要请我吃么","没有吃，你要请我吃么",0,[0,0],["可以啊，你要吃什么","没有钱"],["可以啊，你要吃什么","没有钱"],[1010,1020]],[1010,"你人真是太好了，不过不用了谢谢","你人真是太好了，不过不用了谢谢",0,[1],["再见"],["再见"],[0]],[1020,"那你说个锤子","那你说个锤子",0,[1],["再见"],["再见"],[0]],[100001,"我作为校长煤气忘记关了","我作为校长煤气忘记关了",0,[0],["煤气的开关在哪"],["煤气的开关在哪"],[100002]],[100002,"煤气的开关在鬼校的尽头","煤气的开关在鬼校的尽头",0,[2,1],["好的我去帮你关","算了"],["好的我去帮你关","算了"],[100001,0]]];
export interface ITalkElement extends IElementBase{
 	/**对话ID*/
	id:number
	/**对话内容*/
	talk:string
	/**对话内容备注*/
	talk_desc:string
	/**是否显示NPC身上的任务（0显示 1不显示）*/
	isShowMission:number
	/**选项ID 【int[]】0下一句对话1关闭对话2接受任务4打开UI*/
	talkTable:Array<number>
	/**选项文本【string[]】*/
	talkTableText:Array<string>
	/**选项文本备注*/
	talkTableText_desc:Array<string>
	/**选项参数【int[]】*/
	talkTablePara:Array<number>
 } 
export class TalkConfig extends ConfigBase<ITalkElement>{
	constructor(){
		super(EXCELDATA);
	}

}