/** 
 * @Author       : Songyang.Xie
 * @Date         : 2024-01-23 15:07:06
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-24 10:16:22
 * @FilePath     : \petparty\JavaScripts\EmojiPlate\UI\P_ChatWheelPanel.ts
 * @Description  : 修改描述
 */
import ChatWheelUI_Generate from "../../ui-generate/ChatWheelUI_generate";
import { ChatListLength } from "../EmojiScript";
import P_ChatWheelItem from "./P_ChatWheelItem";


export class P_ChatWheelUI extends ChatWheelUI_Generate {

    private chatWheelItemList: P_ChatWheelItem[] = [];

    private lastChooseIndex:number = -1;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        for(let i = 0;i < ChatListLength;i++){
            let grid = this.canvas_Origin.findChildByPath("ChatWheelItem_" + i)
            let item = mw.findUIScript(grid) as P_ChatWheelItem;
            this.chatWheelItemList.push(item);
        }
    }

    refreshList(list: number[]){
        list.forEach((value, index)=>{
            this.chatWheelItemList[index].setChatId(value);
        })
    }

    chooseChat(index:number){
        if(this.lastChooseIndex != -1){
            this.chatWheelItemList[this.lastChooseIndex].unChoose();
        }else{
            //圆盘取消选中时
            this.img_clock.imageColor = mw.LinearColor.colorHexToLinearColor("#000000FF");
            this.img_clock.renderOpacity = 0.3;
        }
        this.lastChooseIndex = index;
        if(index == -1){
            //中间圆盘被选中时
            this.img_clock.imageColor = mw.LinearColor.yellow;
            this.img_clock.imageColor = mw.LinearColor.colorHexToLinearColor("#B1B1B1FF");
            this.img_clock.renderOpacity = 0.5;
            return;
        }
        this.chatWheelItemList[index].onChoose();
    }

}