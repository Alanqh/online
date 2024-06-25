import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
/** 
* @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
* @Date         : 2023-03-02 13:25:03
* @LastEditors  : zhenhuang.luo  zhenhuang.luo@appshahe.com
* @LastEditTime : 2023-04-16 15:50:50
* @FilePath     : \stumbleguys\JavaScripts\modules\dress\ScriptManager.ts
* @Descripttion : 
*/
import { Singleton } from "../../tool/Singleton";
import { Timer } from "../../tool/Timer";

export abstract class TagScript extends mw.Script {

	/**
	 * 属性修复时间间隔
	 */
	private _fixTimer: Timer = new Timer(5, true);

	@mw.Property({ replicated: true, onChanged: "onPlayerIdChanged" })
	protected playerId: number;
	private _isAdded: boolean;
	isCreated: boolean;
	/**
	 * 设置所属玩家，只会在服务端调用
	 * @param player 
	 */
	public setPlayer(player: mw.Player) {
		if (!player.playerId)
			return;
		Singleton.getIns(ScriptManager).setScriptOnPlayer(player.playerId, this);
		setTimeout(() => {
			this.tag
			this.playerId = player.playerId;
		}, 500);
	}
	public abstract get tag(): string;

	protected override onStart() {
		if (mw.SystemUtil.isClient()) {
			if (this.playerId) {
				console.log("----------------------->onstart ", this.playerId, new Date().toLocaleString());
				this.onPlayerIdChanged();
			}
			this.useUpdate = true;
		}
	}
	/**
 * 请求装扮信息
 * @param player 
 */
	@RemoteFunction(mw.Server)
	private requestAttribute(player: mw.Player) {
		if (this.playerId) {
			this.responseAttribute(player, this.playerId);
			this.onRequestAttribute(player);
		}
	}
	protected abstract onRequestAttribute(player: mw.Player);
	protected abstract onClientUpdate();
	protected abstract onResponseAttribute(player: mw.Player, ...params);
	@RemoteFunction(mw.Client)
	private responseAttribute(player: mw.Player, id: number) {
		console.log("-------------------->responseAttribute");
		this.playerId = id;
		this.onPlayerIdChanged();
	}
	public get player() {
		return Player.getPlayer(this.playerId);
	}

	protected override onUpdate(dt: number) {
		if (!this.playerId) {
			//装扮不存在
			if (!this.isCreated) {
				const player = Player.getPlayer(this.playerId);
				if (player) {
					this.onClientUpdate();
					this.isCreated = true;
				}
			}
			if (this._fixTimer.isExpire(dt)) {
				console.log("------------------------->this._fixTimer.isExpire(dt)")
				if (mw.SystemUtil.isClient()) {
					this.requestAttribute(Player.localPlayer);//当前玩家没有信息，只发当前玩家
				}
			}
		} else {
			if (this._fixTimer.isExpire(dt)) {
				this.onClientUpdate();//当前玩家没有信息，只发当前玩家
			}
		}
	}
	/**
	 * 设置客户端ID
	 */
	protected onPlayerIdChanged() {
		if (!this._isAdded) {
			if (this.playerId > 0) {

				console.log("----------------------->onPlayerIdChanged");
				this._isAdded = true;
				Singleton.getIns(ScriptManager).setScriptOnPlayer(this.playerId, this);
			}

			if (this.playerId != undefined && this.playerId != null) {
			}
		}
	}
}
// @Singleton()
export class ScriptManager {

	public static instance: ScriptManager;

	private playerScipts: Map<number, mw.Script[]>;

	constructor() {
		this.playerScipts = new Map();
	}

	/**
	 * 创建所有用户的脚本
	 * @param player 
	 */
	public createAll(player: mw.Player) {
		this.spawnPlayerPrefabScript(player, "B29FCD1240C7E8CA3E5C2BA2C8DA19D9");
	}
	/**
	 * 添加一个脚本到玩家上
	 * @param player 
	 * @param guid 
	 */
	public async spawnPlayerPrefabScript<T extends TagScript>(player: mw.Player, guid: string) {
		const attachObject = SpawnManager.wornSpawn("Anchor");
		if (!attachObject) return;
		attachObject.parent = player.character;
		const sc = await mw.Script.spawnScript<T>(guid);
		sc.gameObject = (attachObject);
		sc.setPlayer(player);
		return sc as T;
	}

	/**
	 * 获取一个玩家身上的脚本
	 * @param playerId 
	 * @param scriptCls 
	 * @returns 
	 */
	public getScriptOnPlayer<T extends TagScript>(playerId: number, scriptCls: { new(O): T, tag: string }): T {
		const scriptContainer = this.playerScipts.get(playerId);
		if (scriptContainer) {
			return scriptContainer.find(i => i["tag"] == (scriptCls["tag"])) as T;
		}
		return null;
	}
	/**
	 * 删除玩家身上所有的脚本
	 * @param player 
	 */
	public clear(player: mw.Player) {
		const scriptContainer = this.playerScipts.get(player.playerId);
		if (scriptContainer) {
			scriptContainer.forEach(sc => {
				if (sc.gameObject) {
					sc.gameObject.destroy();
				} else {
					sc.destroy();
				}
			});
			this.playerScipts.delete(player.playerId);
		}
	}
	/**
	 * 放入一个玩家身上的脚本
	 * @param playerId 
	 * @param script 
	 */
	public setScriptOnPlayer(playerId: number, script: TagScript) {
		if (!playerId) return;
		let scriptContainer = this.playerScipts.get(playerId);



		if (!scriptContainer) {
			scriptContainer = [];
			this.playerScipts.set(playerId, scriptContainer);
		}
		if (!scriptContainer.includes(script)) {
			scriptContainer.push(script);
		}
	}
}
