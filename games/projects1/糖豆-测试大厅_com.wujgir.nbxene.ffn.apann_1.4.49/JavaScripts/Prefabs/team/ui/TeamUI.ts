/** 
 * @Author       : lei.zhao
 * @Date         : 2023-06-01 16:06:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-07-04 16:12:55
 * @FilePath     : \stumbleguys\JavaScripts\prefabs\team\ui\TeamUI.ts
 * @Description  : 修改描述
 */

import TeamUI_Generate from "../../../ui-generate/Prefabs/Team/TeamUI_generate";
import { MemberItemUI } from "./MemberItemUI";
const temp = new mw.Vector2();
export class TeamUI extends TeamUI_Generate {
    private memberCache: MemberItemUI[] = [];
    private members: string[];
    private time: number = 0;
    onAwake() {
        this.layer = mw.UILayerScene;
        super.onAwake();
    }
    public onStart() {
        this.memberCloseButton.onClicked.add(() => {
            this.teamCanvas.visibility = mw.SlateVisibility.Collapsed;
        });

        this.teamButton.onClicked.add(() => {
            this.teamCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        });
        this.teamCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;


    }
    private ready() {
        let currentIndex = 0;
        for (let i = 0; i < this.members.length; i++) {
            const player = Player.getAllPlayers().find(p => p.userId == this.members[i]);
            if (player && player.character && player.character.displayName) {
                const canvas = this.memberCache[i] ? this.memberCache[i] : mw.UIService.create(MemberItemUI);
                if (!canvas.uiObject.parent) {
                    this.memberList.addChild(canvas.uiObject);
                    canvas.uiObject.position = temp.set(0, 60 * currentIndex);
                    this.memberCache.push(canvas);
                } else {
                    canvas.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                }
                currentIndex++;
                canvas.setPlayerId(player.character.displayName, player.playerId);
            }
        }
        if (currentIndex == this.members.length) this.canUpdate = false;
        for (let i = currentIndex; i < this.memberCache.length; i++) {
            this.memberCache[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    public onUpdate(dt: number) {
        this.time -= dt;
        if (this.time <= 0) {
            this.time = 3;
            this.ready();
        }
    }
    onShow(members: string[], localUserId: string) {
        this.uiObject.zOrder = -1;
        this.members = members;
        this.canUpdate = true;
        this.time = 0;
    }

}
