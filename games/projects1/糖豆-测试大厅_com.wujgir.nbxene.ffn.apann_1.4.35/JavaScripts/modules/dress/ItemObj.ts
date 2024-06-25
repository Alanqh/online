import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
/** 
* @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
* @Date         : 2023-03-02 13:25:03
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-11-14 14:20:19
 * @FilePath     : \stumbleguys\JavaScripts\modules\dress\ItemObj.ts
* @Descripttion : 
*/

import { GameConfig } from "../../config/GameConfig";
import { Utils } from "../../tool/Utils";
import { PlayerHudUI } from "../../UI/PlayerHudUI";
import { RoleShadow } from '../../utils/RoleShadow';
import { Tools } from '../../utils/Tools';
import { DressModuleC } from "./DressModuleC";
import { TagScript } from "./ScriptManager";

@Component
export default class ItemObj extends TagScript {

	protected onRequestAttribute(player: mw.Player) {
	}
	protected onResponseAttribute(player: mw.Player, ...params: any[]) {
	}

	public static tag = "ItemObj";

	public get tag(): string {
		return ItemObj.tag;
	}
	@mw.Property({ replicated: true, onChanged: "onSkinChanged" })
	private skin: number = 0;

	@mw.Property({ replicated: true, onChanged: "onFootChanged" })
	private _decorateIds: number[] = []
	@mw.Property({ replicated: true, onChanged: "onTitleChanged" })
	private _title: string = "";

	private _decorateSlot: mw.HumanoidSlotType[] = [null, mw.HumanoidSlotType.LeftHand, mw.HumanoidSlotType.RightHand, mw.HumanoidSlotType.BackOrnamental]

	private _decorateObj: mw.GameObject[] = [];

	private isHide: boolean = false;

	private hud: PlayerHudUI;
	appearance: CharacterDescription;
	private roleShadow: RoleShadow = null;

	override onStart() {
		super.onStart();
		if (mw.SystemUtil.isClient()) {
			Event.addLocalListener("MODULE_PLAY_ANIMATION", (res: string, times: number, playerid: number) => {
				if (Player.localPlayer.playerId == playerid) {
					this.playAnimation(res, times, playerid);
					this.playAnimationLocal(res, times, playerid, true);
				}
			});
			Player.onPlayerLeave.add((val) => {
				if (this.playerId == val.playerId) {
					this.onDestroy();
				}
			});

			Player.onPlayerJoin.add((val) => {
				if (this.playerId == val.playerId) {
					this.onDestroy();
				}
			});
			this.useUpdate = true;
			Event.addLocalListener("Hand.Hide", (character: Character, status: PropertyStatus) => {
				if (this.player && character == this.player.character) {
					const right = this._decorateObj[2];
					if (right) {
						right.setVisibility(status);
					}
					const left = this._decorateObj[1];
					if (left) {
						left.setVisibility(status);
					}
				}
			})
		}
	}
	private onSkinChanged() {
		const inter = setInterval(() => {
			if (this.player && this.appearance) {
				clearInterval(inter);
				this.dressCharacter(this.skin.toString());
			}

		}, 100);
	}
	private dressCharacter(data: string) {
		this.player.character.asyncReady().then(() => {
			this.appearance.base.wholeBody = data;
		});
	}
	@RemoteFunction(mw.Server)
	private playAnimation(res: string, times: number, playerid: number) {
		this.playAnimationLocal(res, times, playerid, false);
	}
	@RemoteFunction(mw.Client, mw.Multicast)
	private playAnimationLocal(res: string, times: number, playerid: number, force: boolean) {
		if (force || playerid != this.playerId) {
			const player = Player.getPlayer(playerid);
			if (player) {
				Utils.downloadAsset(res).then(() => {
					PlayerManagerExtesion.rpcPlayAnimation(player.character, res, times);
				});
			}
		}
	}
	protected onUpdate(dt: number): void {
		super.onUpdate(dt);
		if (this.roleShadow) {
			this.roleShadow.onUpdate(dt);
		}
	}


	protected onDestroy(): void {
		this.decorateObjDestory();
		this.hud = null;
		if (this.roleShadow) {
			this.roleShadow.destroy();
			this.roleShadow = null;
		}
	}

	/**拖尾銷毀 */
	private decorateObjDestory() {
		for (let obj of this._decorateObj) {
			if (obj) {
				obj.destroy();
				obj = null;
			}
		}
		this._decorateObj = []
	}

	@RemoteFunction(mw.Server)
	public clientSetDecorateId(cfgId: number[]) {
		if (this._decorateIds == cfgId) {
			return;
		}
		this._decorateIds = cfgId;
	}
	@RemoteFunction(mw.Server)
	public clientSetTitle(title: string) {
		this._title = title;
		console.log("____________$", title);
	}
	@RemoteFunction(mw.Server)
	public clientSetSkin(skinId: number) {
		this.skin = skinId;
	}

	public hideFootEffect() {
		let count = 0;
		let inter = setInterval(() => {
			if (count > 10) {
				clearInterval(inter);
			}
			if (this._decorateObj[0] && this._decorateObj[0] instanceof mw.Effect) {
				this._decorateObj[0].stop();
				this._decorateObj[0].destroy();
				this._decorateObj[0] = null;
			}
			this.isHide = true;
			count++;
		}, 1000)
	}

	protected onClientUpdate() {
	}

	protected override onPlayerIdChanged() {
		super.onPlayerIdChanged();
		GeneralManager.asyncRpcGetPlayer(this.playerId).then(async (player) => {
			if (player) {
				let interval = setInterval(() => {
					const character = player.character;
					if (character) {
						clearInterval(interval);
						if (!this.hud) {
							this.hud = new PlayerHudUI(character, true, this._title);
						}
						if (!this.roleShadow) {
							this.roleShadow = new RoleShadow(character);
						}
						const inter = setInterval(() => {
							this.appearance = character.description;
							if (this.appearance) {
								clearInterval(inter);
							}
						}, 100);
					}
				}, 100)
			}
		});
	}
	private onTitleChanged() {
		if (this.hud) {
			this.hud.setTitle(this._title);
		}
	}

	/**item 拖尾模型改变 */
	private async onFootChanged() {
		if (!this.player || this.isHide)
			return;

		this.decorateObjDestory()
		const character = await Tools.getCharacter(this.player);
		if (!character) return;
		for (let [idx, decorateId] of this._decorateIds.entries()) {
			if (decorateId) {
				const config = GameConfig.Item.getElement(decorateId);
				if (config) {
					SpawnManager.asyncSpawn({ guid: config.resGUID.toString() }).then(async (obj: mw.GameObject) => {
						if (!obj) return;
						obj.setVisibility(mw.PropertyStatus.Off)
						if (this._decorateSlot[idx]) {
							await ModuleService.ready();
							let data = ModuleService.getModule(DressModuleC).getDecorateData(config.id, idx == 1)
							character.attachToSlot(obj, this._decorateSlot[idx])
							obj.localTransform.position = data.location.clone()
							obj.localTransform.rotation = data.rotation.clone()
						} else {
							obj.parent = character
							obj.localTransform.position = new mw.Vector(config.location.x, config.location.y, idx == 0 ? config.location.z - 50 : config.location.z);
							obj.localTransform.rotation = new mw.Rotation(config.rotation.x, config.rotation.y, config.rotation.z);
						}

						if (config.scale) obj.worldTransform.scale = config.scale;
						this._decorateObj[idx] = obj
						if (obj instanceof mw.Effect) {
							obj.loop = true;
							obj.play();
							if (config.color) obj.setColor("color", new LinearColor(config.color.x / 255, config.color.y / 255, config.color.z / 255, config.color.w))
						}
						obj.setVisibility(mw.PropertyStatus.On)
					});
				}
			}
		}
	}
	@RemoteFunction(mw.Server)
	setCharacterName(userName: string) {
		this.player.character.displayName = userName;
	}
}