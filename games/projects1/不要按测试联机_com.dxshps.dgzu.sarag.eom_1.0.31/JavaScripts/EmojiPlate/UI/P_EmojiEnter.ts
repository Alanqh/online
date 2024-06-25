/** 
 * @Author       : Songyang.Xie
 * @Date         : 2024-01-23 15:07:06
 * @LastEditors  : Songyang.Xie
 * @LastEditTime : 2024-01-23 15:34:11
 * @FilePath     : \petparty\JavaScripts\EmojiPlate\UI\P_EmojiEnter.ts
 * @Description  : 修改描述
 */
import MainEmojiUI_Generate from "../../ui-generate/MainEmojiUI_generate";
import EmojiScript, { WheelCancelRadius } from "../EmojiScript";
import { P_ChatWheelUI } from "./P_ChatWheelPanel";

export default class P_EmojiEnter extends MainEmojiUI_Generate {
    private chatWheelPanel: P_ChatWheelUI;
    private chooseIndex:number = 0;
    private emojiCD = 0;
    private isJoyStickDown:boolean =false;
    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = true;
        this.layer = UILayerMiddle;
        this.setEmojiJoyStick();
    }

    public initData(list: Array<number>){
        this.chatWheelPanel = UIService.create(P_ChatWheelUI);
        this.chatWheelPanel.refreshList(list);
    }

    protected onUpdate(dt :number) {
        this.updateEmoji(dt);
	}

    private setEmojiJoyStick(){
        this.joyStick_Emoji.onInputDir.add((vec)=>{
            if(this.emojiCD > 0) return;
            if(!this.isJoyStickDown) return;
            if(!this.chatWheelPanel.visible) return;
            let index = 0;
            if(vec.length < WheelCancelRadius){
                index = -1;
            }else{
                let angle = Vector2.signAngle(vec,new Vector2(0,1)) + 180 + 22.5;
                index = Math.floor(angle / 45);
                index = index == 8 ? 0 : index;
            }
            if(this.chooseIndex == index) return;
            this.chooseIndex = index;
            this.chatWheelPanel.chooseChat(this.chooseIndex);
        })
        
        this.joyStick_Emoji.onJoyStickDown.add(()=>{
            if(this.emojiCD > 0) return;
            UIService.showUI(this.chatWheelPanel);
            this.isJoyStickDown = true;
        })

        this.joyStick_Emoji.onJoyStickUp.add(()=>{
            this.isJoyStickDown = false;
            if(!this.chatWheelPanel.visible) return;
            UIService.hideUI(this.chatWheelPanel);
            if(this.chooseIndex == -1) return
            this.emojiCD = EmojiScript.instance.playCoolTime;
            EmojiScript.instance.playChat(this.chooseIndex);
        })
    }

    updateEmoji(dt:number){
        this.emojiCD -= dt;
        if(this.emojiCD < -0.1) return;
        this.mask_Emoji_JoyStick.fanShapedValue = MathUtil.clamp(1 - (this.emojiCD / EmojiScript.instance.playCoolTime), 0, 1)
    }

}