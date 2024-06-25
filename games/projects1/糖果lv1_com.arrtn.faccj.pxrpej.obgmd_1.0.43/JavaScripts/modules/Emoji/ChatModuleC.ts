import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
/** 
* @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
* @Date         : 2023-03-17 10:12:28
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-01 18:28:25
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\Emoji\ChatModuleC.ts
* @Descripttion : 
*/

import { Bubble } from "module_bubble";
import { GameConfig } from "../../config/GameConfig";
import { MGSEmoji } from "../../mgs/MGSEmoji";
import { GridLayout } from "../../tool/GridLayout";
import { Singleton } from "../../tool/Singleton";
import { Utils } from "../../tool/Utils";
import { ZwtTween } from "../../tool/ZwtTween";
import Word_Generate from "../../ui-generate/Word_generate";
import UIExpression from "../../UI/UIExpression";
import ProcessModuleC from "../ProcessModule/ProcessModuleC";
import { ChatModuleS } from "./ChatModuleS";
import Emoji from "./ui/Emoji";

enum ERenderType {
	e0Expresion,
	e1Action
}
// 表情偏移
const ExpressionHeight: mw.Vector = new mw.Vector(0, 0, 250);
const ExpressionHeight1: mw.Vector = new mw.Vector(0, 0, 140);
const ExpressionScale: mw.Vector = new mw.Vector(3, 3, 3);
export class ChatModuleC extends ModuleC<ChatModuleS, null>{
	private _main: UIExpression;					// 主画布
	private _layout_emoji: GridLayout<Emoji>;	// 存放聊天表情的滚动框
	private _allEmotes: number[] = [];
	private _cacheType: ERenderType;
	curCharacter: Character;
	currentEmotes: number[] = [];
	currentAnims: number[] = [];

	/**快捷对话文本 */
	public chatConfig: string[] = [];
	/**快捷对话格子 */
	private _wordArr: Word_Generate[] = [];
	private isShown: boolean = false;

	onStart() {
		Event.addLocalListener("showChatView", () => { this.showChatView() });
	}

	async showChatView() {
		if (this.isShown) return;
		this.isShown = true;
		Player.asyncGetLocalPlayer().then(player => {
			player.character.asyncReady().then(char => {
				this.curCharacter = char;
			})
		})
		const procModule = ModuleService.getModule(ProcessModuleC);
		this.currentEmotes = await procModule.getPlayerEmoji();
		this.currentAnims = await procModule.getPlayerAnims();
		if (!this.currentEmotes) {
			this.currentEmotes = [];
		}
		if (!this.currentAnims) {
			this.currentAnims = [];
		}
		this.initMain();
		this.initScrollBox();
		// 自动布局
		this._layout_emoji.invalidate();

		this.addWordLayoutNodes()
		this.addWordBtnEvents()
	}

	/**初始化UI */
	initMain() {
		mw.UIService.show(UIExpression);
		this._main = mw.UIService.getUI(UIExpression);
		this._main.expressionCanvas.visibility = (1);
		this._main.expression_Btn.onClicked.add(() => {
			this.renderItemByType(ERenderType.e0Expresion);
		});
		this._main.mAction_btn.onClicked.add(() => {
			this.renderItemByType(ERenderType.e1Action);
		});

		// 初始化快捷对话UI
		for (let cfg of GameConfig.ChatWord.getAllElement()) {
			this.chatConfig.push(cfg.WordID);
		}
		this._main.wordBtn.onClicked.add(() => {
			if (this._main.canvas_word.visible) {
				this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
			} else {
				// Singleton.getIns(MGSHall).tsBtnClick("5");
				this._main.canvas_word.visibility = mw.SlateVisibility.Visible;
			}
		});
	}
	/**
	 * 
	 * @param type "EXP":表情，'ACT':动作
	 */
	private renderItemByType(type: ERenderType) {
		if (this._cacheType != type) {
			this._main.expressionCanvas.visibility = mw.SlateVisibility.Visible;
			this._layout_emoji.removeAllNode();
			switch (type) {
				case ERenderType.e0Expresion:
					this.addLayoutNodes(this.currentEmotes, type);
					this._main.expressionCanvas.renderTransformPivot = new Vector2(1, 0.15);
					break;
				case ERenderType.e1Action:
					this.addLayoutNodes(this.currentAnims, type);
					this._main.expressionCanvas.renderTransformPivot = new Vector2(1, 0.5);
					break;
			}
			this._layout_emoji.invalidate();
			this._cacheType = type;
			new ZwtTween(this._main.expressionCanvas)
				.scaleTo(Vector2.one, 0.3, true, mw.TweenUtil.Easing.Back.Out)
				.start()
		} else {
			this._cacheType = null;
			new ZwtTween(this._main.expressionCanvas)
				.scaleTo(Vector2.zero, 0.3, true, mw.TweenUtil.Easing.Back.In)
				.start()
		}
	}

	/**初始化滚动条 */
	initScrollBox() {
		this._layout_emoji = new GridLayout(this._main.exPression_Scroll, true);
		this._layout_emoji.spacingX = 5;
		this._layout_emoji.spacingY = 5;
	}

	/**
	 * 给Item添加点击事件
	 */
	addLayoutNodes(data: number[], type: ERenderType) {
		this._allEmotes = data;
		for (let i = 0; i < data.length; i++) {
			this._layout_emoji.addNode(Emoji);
		}
		let eNodes = this._layout_emoji.nodes;
		let index = 0;

		eNodes.forEach(element => {
			if (element.visible == false) return;
			let btn = element.mBtn_expression;
			const cfg = GameConfig.Item.getElement(this._allEmotes[index]);
			if (cfg) {
				element.cfg = cfg;
				btn.normalImageGuid = cfg.iconGUID;
				btn.onClicked.clear();
				if (cfg.type == 3) {
					btn.normalImageColor = mw.LinearColor.colorHexToLinearColor("E17660");
				} else {
					btn.normalImageColor = mw.LinearColor.colorHexToLinearColor("FFFFFFFF");
				}
				btn.onClicked.add(() => {
					Singleton.getIns(MGSEmoji).emojiType(cfg.id);
					switch (type) {
						case ERenderType.e0Expresion:
							let player = Player.localPlayer;
							Event.dispatchToLocal("Player.Emoji", player.character.worldTransform.position);
							this.server.net_playEmoji(player, cfg.resGUID);
							break;
						case ERenderType.e1Action:
							Event.dispatchToLocal("MODULE_PLAY_ANIMATION", cfg.resGUID, cfg.circulate ? 0 : 1, this.localPlayerId);
							break;
					}
				});
				index++;
			}
		});
	}

	/**
	 * 向快捷对话滚动条中添加结点
	 */
	addWordLayoutNodes() {
		let length = GameConfig.ChatWord.getAllElement().length;
		for (let i = 0; i < length; i++) {
			let item = mw.UIService.create(Word_Generate);
			this._main.mCanvasWord.addChild(item.uiObject);
			item.uiObject.size = item.rootCanvas.size;
			item.mBtn_word.touchMethod = mw.ButtonTouchMethod.PreciseTap;
			this._wordArr.push(item);
		}
	}

	/**
	 * 快捷对话文字按钮添加监听事件
	 */
	addWordBtnEvents() {
		let wNodes = this._wordArr;
		let config = this.chatConfig;
		wNodes.forEach(node => {
			let btn = node.mBtn_word;
			let index = wNodes.indexOf(node);
			let string = config[index] + "";
			btn.text = string;
			btn.onClicked.add(() => {
				Singleton.getIns(MGSEmoji).tsBtnClickWordid((wNodes.indexOf(node) + 1).toString());
				this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
				this.clientCallChat(string);
			});
		});
	}

	private isBag: boolean = false;
	public changePosType(isBag: boolean) {
		this.isBag = isBag;
	}
	/**
	 * 客户端通知服务端播放表情
	 * @param guid 表情guid
	 */
	public clientCallEmotes(guid: string) {
		this.server.net_playEmoji(Player.localPlayer, guid);
	}

	private lastEffect: string = "";
	/**
	 * 客户端播放表情
	 * @param player 播放表情的角色
	 * @param guid 表情guid
	 */
	public net_playEmoji_Client(player: mw.Player, guid: string) {
		if (!this.curCharacter || !Utils.checkSameTeam(this.curCharacter.player, player))
			return;
		if (this.lastEffect != "") {
			EffectService.stopEffectFromHost(this.lastEffect, player);
		}
		if (this.isBag) {
			GeneralManager.rpcPlayEffectAtLocation(guid, player.character.worldTransform.position.add(ExpressionHeight1), 1, mw.Rotation.zero, ExpressionScale);
		} else {
			if (player instanceof mw.Player) {
				GeneralManager.rpcPlayEffectOnPlayer(guid, player, 23, 1, ExpressionHeight, mw.Rotation.zero, ExpressionScale);
			}
		}
		this.lastEffect = guid;
	}

	/**
	 * 客户端通知服务端播快捷对话
	 * @param content 
	 * @param guid 
	 */
	public clientCallChat(content: string) {
		this.server.net_playChat(Player.localPlayer, content);
	}

	public net_playChat_Client(player: mw.Player, content: string) {
		if (this.curCharacter) {
			if (!Utils.checkSameTeam(this.curCharacter.player, player))
				return;
			Bubble.showBubble(0, content, player.character.gameObjectId, true);
		}
	}
}

