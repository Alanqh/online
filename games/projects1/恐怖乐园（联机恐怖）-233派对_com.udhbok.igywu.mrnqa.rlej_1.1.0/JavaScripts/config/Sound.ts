import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","guid","volume","loopNum","type","radius"],["","","","","","",""],[1,"脚步声1","203939",1,1,2,0],[2,"脚步声2","203939",0.3,1,2,0],[101,"道具丢弃落地","233030",1,1,2,0],[102,"女生死亡音效","233022",1,1,2,0],[103,"男生死亡音效","233031",1,1,2,0],[104,"鬼击打人的声音","233023",1,1,2,0],[1000,"游戏内bgm","221073",1,0,0,0],[1001,"主菜单、难度选择、存档选择bgm","233038",1,0,0,0],[1002,"按钮按下","233040",1,1,1,0],[1003,"出生音效","208894",1,1,1,0],[1004,"主界面-》难度选择","203853",1,1,1,0],[1005,"难度选择界面-》背景介绍界面","199443",1,1,1,0],[200,"起床音效","21003",1,1,1,0]];
export interface ISoundElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	desc:string
	/**音效guid*/
	guid:string
	/**音量大小（0~1）*/
	volume:number
	/**播放次数（0为无限次）*/
	loopNum:number
	/**音效类型:
0. bgm
1. 2D音效
2. 3D音效*/
	type:number
	/**3D音效的空间半径（默认为3000）*/
	radius:number
 } 
export class SoundConfig extends ConfigBase<ISoundElement>{
	constructor(){
		super(EXCELDATA);
	}

}