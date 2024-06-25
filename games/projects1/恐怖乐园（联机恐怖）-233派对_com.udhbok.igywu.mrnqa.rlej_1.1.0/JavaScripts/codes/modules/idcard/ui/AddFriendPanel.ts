/*
 * @Author       : dal
 * @Date         : 2024-03-11 17:56:58
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-11 10:44:27
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\ui\AddFriendPanel.ts
 * @Description  : 
 */
import FriendRequest_UI_Generate from "../../../../ui-generate/ShareUI/card/FriendRequest_UI_generate";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";

export default class AddFriendHud extends FriendRequest_UI_Generate {

    userId: string;

    closeTimer: any;

    protected onStart() {
        this.layer = mw.UILayerDialog;
        this.btn_yes.onClicked.add(() => {
            if (!this.userId) { return; }
            if (SystemUtil.isPIE) {
                this.canvas_friend1.visibility = SlateVisibility.Collapsed;
                this.canvas_friend2.visibility = SlateVisibility.SelfHitTestInvisible;
                this.closeTimer = setTimeout(() => {
                    UIService.hideUI(this);
                }, 2e3);
                // Tips.show("添加好友成功，这是pie端测试代码，并不会真的添加成功");
            } else {
                AccountService.isFriend((isSuccess: boolean, jsonData: string) => {
                    if (jsonData.includes("false")) {
                        AccountService.addFriend((isSuccess) => {
                            if (isSuccess) {
                                this.canvas_friend1.visibility = SlateVisibility.Collapsed;
                                this.canvas_friend2.visibility = SlateVisibility.SelfHitTestInvisible;
                                this.closeTimer = setTimeout(() => {
                                    UIService.hideUI(this);
                                }, 2e3);
                            }
                        }, this.userId, LanUtil.getText("Code_018"));
                    } else {
                        Tips.show(LanUtil.getText("Code_019"));
                    }
                }, this.userId);
            }
        });

        this.btn_no.onClicked.add(() => {
            UIService.hideUI(this);
        });
    }

    protected onHide() {
        this.userId = null;
        this.closeTimer && clearTimeout(this.closeTimer);
        this.closeTimer = null;
    }

    protected onShow(userId: string, nickName: string) {
        this.closeTimer && clearTimeout(this.closeTimer);
        this.canvas_friend1.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_friend2.visibility = SlateVisibility.Collapsed;
        this.userId = userId;
        this.text_friendRequest.text = StringUtil.format(LanUtil.getText("Code_020"), nickName);
    }
}