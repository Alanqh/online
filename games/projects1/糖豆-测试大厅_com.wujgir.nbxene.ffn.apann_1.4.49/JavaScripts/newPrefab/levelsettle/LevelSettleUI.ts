/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-13 17:42:10
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-08 11:30:34
 * @FilePath     : \stumbleguys_new\JavaScripts\newPrefab\levelsettle\LevelSettleUI.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../config/GameConfig";
import { LanUtils } from "../../tool/LanguageUtil";
import CommonItem_Generate from "../../ui-generate/CommonItem_generate";
import SettleUI_Generate from "../../ui-generate/SettleUI_generate";

export default class LevelSettleUI extends SettleUI_Generate {
    private time = 0;
    private lastTime = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mBack.onClicked.add(() => {
            this.backToLobby();
        })
    }

    public onShow(isChampion: boolean) {
        this.time = 60;
        this.lastTime = 60;
        this.mCountDown.text = StringUtil.format(GameConfig.Language.UI_Settle_CountDown.Value, 60);
        this.canUpdate = true;

        // TODO 夺冠了UI
        if (isChampion) {
            this.setAward(1);
            this.canvas_Champion.visibility = mw.SlateVisibility.Visible;
            this.canvas_Out.visibility = mw.SlateVisibility.Hidden;
            if (LanUtils.isCH) {
                this.img_Champion.visibility = mw.SlateVisibility.Visible;
                this.img_Champion_Eng.visibility = mw.SlateVisibility.Hidden;
            } else {
                this.img_Champion.visibility = mw.SlateVisibility.Hidden;
                this.img_Champion_Eng.visibility = mw.SlateVisibility.Visible;
            }
        } else {
            this.setAward(2);
            this.canvas_Champion.visibility = mw.SlateVisibility.Hidden;
            this.canvas_Out.visibility = mw.SlateVisibility.Visible;
            if (LanUtils.isCH) {
                this.img_Out.visibility = mw.SlateVisibility.Visible;
                this.img_Out_Eng.visibility = mw.SlateVisibility.Hidden;
            } else {
                this.img_Out.visibility = mw.SlateVisibility.Hidden;
                this.img_Out_Eng.visibility = mw.SlateVisibility.Visible;
            }
        }
    }

    private setAward(index: number) {
        let config = GameConfig.Settle.getElement(index);
        let offsetX = 0;
        let count = 0;
        config.gold && count++;
        config.exp && count++;
        if (config.gold) {
            let ui = UIService.create(CommonItem_Generate);
            offsetX += (this.mAward.size.x - count * ui.rootCanvas.size.x) / 2;
            this.mAward.addChild(ui.uiObject);
            ui.mImg_common.imageGuid = "155412";
            ui.txt_common.text = "×" + config.gold;
            ui.uiObject.position = new Vector2(offsetX, 0);
            offsetX += ui.rootCanvas.size.x;
        }
        if (config.exp) {
            let ui = UIService.create(CommonItem_Generate);
            this.mAward.addChild(ui.uiObject);
            ui.mImg_common.imageGuid = "156305";
            ui.txt_common.text = "×" + config.exp;
            ui.uiObject.position = new Vector2(offsetX, 0);
            offsetX += ui.rootCanvas.size.x;
        }
    }

    private backToLobby(): void {
        if (SystemUtil.isPIE) return;
        Event.dispatchToServer("EnterLobby");
        setTimeout(() => {
            this.backToLobby();
        }, 5000);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        this.time -= dt;
        if (this.time > 0) {
            if (Math.floor(this.time) != this.lastTime) {
                this.lastTime = Math.floor(this.time);
                this.mCountDown.text = StringUtil.format(GameConfig.Language.UI_Settle_CountDown.Value, this.lastTime);
            }
        } else {
            this.backToLobby();
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}