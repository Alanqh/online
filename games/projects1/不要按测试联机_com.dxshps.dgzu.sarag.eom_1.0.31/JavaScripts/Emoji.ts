/*
* @Author: yudong.wu yudong.wu@appshahe.com
* @Date: 2023-01-17 11:00:59
 * @LastEditors: kunchi.ran kunchi.ran@appshahe.com
 * @LastEditTime: 2023-12-18 15:44:37
 * @FilePath: \emoji\JavaScripts\Emoji.ts
* @Description: 
*/

import Emoji_Generate from "./ui-generate/Emoji_generate";
import Game_HUD_Generate from "./ui-generate/Game_HUD_generate";
@Serializable
class EmojiConfig {
    @mw.Property({ displayName: "Emoji显示的UI图片", group: "基础配置" })
    public expressionIcon: string = "";
    @mw.Property({ displayName: "Emoji显示的头顶特效", group: "基础配置" })
    public expressionVfx: string = "";
}

abstract class EmojiPFDef extends mw.Script {

    protected abstract syncPlayEmoji(playerId: number, guid: string);

}

abstract class EmojiClient extends EmojiPFDef {
    @Property({ displayName: "Emoji配置", arrayDefault: new EmojiConfig, group: "基础配置" })
    public emojiConfig: EmojiConfig[] = [];
    
    @Property({ displayName: "表情高度", group: "基础配置" })
    public expressionHeight: number = 225;

    @Property({ displayName: "表情缩放", group: "基础配置" })
    public expressionScale: number = 2;

    @Property({ displayName: "四足状态表情高度", group: "基础配置" })
    public fourFootExpressionHeight: number = 70;

    @Property({ displayName: "四足状态表情缩放", group: "基础配置" })
    public fourFootExpressionScale: number = 1;

    /**主画布 */
    private _main: Game_HUD_Generate;
    /**icon的Item */
    private _emojiArr: Emoji_Generate[] = [];
    /**上次播放的Emoji特效Guid */
    private _lastEffect: string = "";

    onStart(): void {
        super.onStart();
        if (mw.SystemUtil.isClient()) {
            this.initMain();
            this.addLayoutNodes();
            this.addEmojiBtnEvents();
        }
    }

    /**初始化UI */
    initMain() {
        this._main = mw.UIService.show(Game_HUD_Generate);
        this._main.canvas_emoji.visibility = mw.SlateVisibility.Collapsed;
        this._main.emojiBtn.onClicked.add(() => {
            this._main.canvas_emoji.visibility = (this._main.canvas_emoji.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible);
        });
    }

    /**
     * 向滚动条中添加结点 
     */
    addLayoutNodes() {
        let length = this.emojiConfig.length;
        for (let i = 0; i < length; i++) {
            let item = mw.UIService.create(Emoji_Generate);
            this._main.mCanvasEmoji.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            this._emojiArr.push(item);
        }
    }

    /** 
     * 为每个表情按钮添加监听事件 
     */
    addEmojiBtnEvents() {
        let eNodes = this._emojiArr;
        let config = this.emojiConfig;
        eNodes.forEach(element => {
            let btn = element.mBtn_expression;
            let index = eNodes.indexOf(element);
            // 按钮图片的guid
            btn.normalImageGuid = config[index].expressionIcon;
            btn.onClicked.add(() => {
                this._main.canvas_emoji.visibility = mw.SlateVisibility.Collapsed;
                // 特效的guid
                if (config[index].expressionVfx == null) {
                    console.log("typee__fmxs:表格ChatExpression中ExpressionVfx字段值错误！id = " + index);
                }
                else {
                    let player = Player.localPlayer;
                    this.syncPlayEmoji(player.playerId, config[index].expressionVfx);
                }

            });
        });
    }

    /**
     * 播放Emoji特效
     * @param player 挂载的玩家
     * @param guid 特效Guid
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    public net_playEmoji(playerId: number, guid: string) {
        let player = Player.getPlayer(playerId);
        if (!player || !player.character) return;
        if (this._lastEffect != "") {
            EffectService.stopEffectFromHost(this._lastEffect, player);
        }
        let scale = Vector.one;
        let offset = Vector.zero;
        if (player.character.characterType == CharacterType.FourFootStandard) {
            scale.x = this.fourFootExpressionScale;
            scale.y = this.fourFootExpressionScale;
            scale.z = this.fourFootExpressionScale;
            offset.z = this.fourFootExpressionHeight;
        } else {
            scale.x = this.expressionScale;
            scale.y = this.expressionScale;
            scale.z = this.expressionScale;
            offset.z = this.expressionHeight;
        }
        EffectService.playOnGameObject(guid, player.character, { slotType: 23, loopCount: 1, rotation: Rotation.zero, scale, position: offset });
        this._lastEffect = guid;
    }



}

@Component
export default class EmojiServer extends EmojiClient {

    onStart(): void {
        super.onStart();
    }

    /**
     * 同步表情
     * @param player 玩家
     * @param guid emoji的Guid
     */
    @RemoteFunction(mw.Server)
    public syncPlayEmoji(playerId: number, guid: string) {
        this.net_playEmoji(playerId, guid);
    }
}
