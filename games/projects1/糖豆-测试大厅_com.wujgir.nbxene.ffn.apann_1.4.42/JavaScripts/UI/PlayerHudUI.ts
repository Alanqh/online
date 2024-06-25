import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : haitao.zhong
* @Date         : 2023-04-20 17:53:39
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-11-14 14:47:35
 * @FilePath     : \stumbleguys\JavaScripts\UI\PlayerHudUI.ts
* @Description  : 修改描述
*/
import { TeamService } from "../Prefabs/team/Team";
import TitleUI_Generate from "../ui-generate/TitleUI_generate";
import { Tools } from '../utils/Tools';
const selfColors = [mw.LinearColor.white, mw.LinearColor.colorHexToLinearColor("FF5A9AFF")];
const otherColors = [mw.LinearColor.white, mw.LinearColor.black];
const teamColors = [mw.LinearColor.white, mw.LinearColor.blue];
const temp = new Vector(0, 0, 0);
export class PlayerHudUI {

	private nameTxt: mw.TextBlock;
	private localCharacter: Character;
	private playerId: string = "";
	private isInTeam: boolean = null;
	private inerval: number = 0;
	private isAlwaysShow: boolean = false;
	private titleTxt: mw.TextBlock;
	constructor(public character: Character, selfUpdate: boolean = false, private titleStr: string) {
		this.character.onDestroyDelegate.add(() => {
			this.character = null;
		});
		if (PlayerManagerExtesion.isCharacter(character))
			this.playerId = this.character.player.userId;
		this.getHeadUI();
		Event.addLocalListener("GameState.End.Client", () => {
			this.isAlwaysShow = true;
		});

		Tools.getLocalPlayer().then((player) => {
			Event.addLocalListener("PlayerHud.Show", () => {
				this.isAlwaysShow = true;
			});
			this.localCharacter = player.character;
			Event.addLocalListener("FinishLine.Pass.Client", (guid: string) => {
				if (guid == this.localCharacter.gameObjectId)
					this.isAlwaysShow = true;
			});
			Event.addLocalListener("GameState.EliminatePlayer", (guid: string) => {
				if (guid == this.localCharacter.gameObjectId)
					this.isAlwaysShow = true;
			});
		});
		if (selfUpdate) {
			setInterval(() => { this.onUpdate(0.1) }, 100);
		}
		Event.addLocalListener("PLAYERNAME_VISIBLE", (visible: boolean) => {
			const widget = this.character.overheadUI;
			if (widget) {
				widget.getTargetUIWidget().rootContent.visibility = (visible ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Hidden);
			}
		});
	}
	private getHeadUI() {
		if (!this.character) return
		const inter = setInterval(() => {
			if (!this.character) return;
			const widget = this.character.overheadUI;
			if (widget) {
				clearInterval(inter);
				widget.scaledByDistanceEnable = false;
				widget.localTransform.position = temp.set(0, 0, 60);
				const root = widget.getTargetUIWidget().rootContent;
				root.autoLayoutContainerRule = mw.UILayoutType.Vertical;
				this.nameTxt = widget.getTargetUIWidget().rootContent.getChildAt(0) as mw.TextBlock;
				this.nameTxt.fontSize = 24;
				this.nameTxt.outlineSize = 2;
				this.nameTxt.glyph = mw.UIFontGlyph.Bold;
				if (!this.titleTxt) {
					let titleUI = mw.UIService.create(TitleUI_Generate);
					this.titleTxt = titleUI.txtTitle;
					widget.getTargetUIWidget().rootContent.addChild(titleUI.txtTitle);
					this.setTitle(this.titleStr);
				}
			}
		}, 100);
	}
	setTitle(_title: string) {
		this.titleStr = _title;
		if (this.titleTxt) {
			this.titleTxt.text = _title;
		}
	}
	public static createStatic(character: Character) {
		const inter = setInterval(() => {
			const widget = character.overheadUI;
			if (widget) {
				clearInterval(inter);
				widget.scaledByDistanceEnable = false;
				widget.localTransform.position = temp.set(0, 0, 60);
				const nameTxt = widget.getTargetUIWidget().rootContent.getChildAt(0) as mw.TextBlock;
				nameTxt.fontSize = 24;
				nameTxt.outlineSize = 2;
				nameTxt.glyph = mw.UIFontGlyph.Bold;
				nameTxt.fontColor = otherColors[0];
				nameTxt.outlineColor = otherColors[1];


			}
		}, 100);
	}
	public onUpdate(dt: number) {
		if (!this.nameTxt) return;
		if (!this.character) return;
		if (!this.localCharacter) return;
		if (!this.character.worldTransform) return;
		const isInTeam = TeamService.isInTeam(this.playerId);
		if (this.isInTeam == null || this.isInTeam != isInTeam) {
			this.isInTeam = isInTeam;
			if (isInTeam) {
				this.nameTxt.fontColor = teamColors[0];
				this.nameTxt.outlineColor = teamColors[1];
			} else if (this.localCharacter == this.character) {
				this.nameTxt.fontColor = selfColors[0];
				this.nameTxt.outlineColor = selfColors[1];
			} else {
				this.nameTxt.fontColor = otherColors[0];
				this.nameTxt.outlineColor = otherColors[1];
			}
		}
		if (this.localCharacter && this.character != this.localCharacter) {
			this.inerval -= dt;
			if (this.inerval < 0) {
				this.inerval = 0.2;
				let llt = this.localCharacter.worldTransform;
				if (!llt) return;
				let from: Vector = llt.position;
				let to: Vector = this.character.worldTransform.position;
				if (from && to) {
					let dis = this.isAlwaysShow ? 0 : mw.Vector.distance(llt.position, this.character.worldTransform.position);
					if (dis < 600) {
						this.nameTxt.renderOpacity = 1
					} else if (dis < 1000) {
						this.nameTxt.renderOpacity = 1 - (dis - 600) / 400 * 0.2
					} else {
						this.nameTxt.renderOpacity = 0.8 - (dis - 1000) / 1000 < 0 ? 0 : 0.8 - (dis - 1000) / 1000
					}
				}

			}
		}

	}

	destroy() {
	}
}
