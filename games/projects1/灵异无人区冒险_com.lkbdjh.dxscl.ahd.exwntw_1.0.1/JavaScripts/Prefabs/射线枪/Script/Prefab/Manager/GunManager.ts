import { PlayerManagerExtesion, } from '../../../../../Modified027Editor/ModifiedPlayer';
import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";;
import { RayGunClient } from "../RayGun";
import { RayGunUI } from "../UI/RayGunUI";

/*

 * @Date         : 2023-02-15 16:19:01

 * @LastEditTime: 2023-09-11 11:45:59
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\Manager\GunManager.ts
 * @Description  : 
 */

export class GunManagerC {
    public static get instance(): GunManagerC {
        if (!this._instance) {
            this._instance = new GunManagerC();
        }
        return this._instance;
    }

    private static _instance: GunManagerC;

    /** 开火动画 */
    private _fireAnimation: mw.Animation;

    /** 装弹动画 */
    private _reloadAnimation: mw.Animation;

    /** 当前的角色 */
    private _char: mw.Character;

    /** 当前的玩家Id */
    private _playerId: number;

    /** 当前装备的枪械 */
    public curGun: RayGunClient;

    constructor() {
        Player.onPlayerLeave.add((player: mw.Player) => {
            if (this._playerId && player.playerId != this._playerId) {
                return;
            }
            this.unloadResources();
        })
        PrefabEvent.PrefabEvtEquip.onEquip((targetGuid, slot, guid) => {
            if (!this._char) {
                return;
            }
            if (targetGuid == this._char.gameObjectId && PrefabEvent.EquipSlot.Weapon == slot && this.curGun && guid != this.curGun.guid) {
                this.unloadGun();
            }
        });
        Event.addLocalListener("onUnequip", () =>{this.unloadGun();});
    }

    /**
     * 注册一个枪械到管理器
     * @param newGun 枪械
     */
    public registerGun(newGun: RayGunClient) {
        if (!this._char) {
            let player = Player.localPlayer;
            this._char = player.character;
        }
        this.unloadResources();

        let ui = mw.UIService.getUI(RayGunUI);
        if (this.curGun) {
            this.curGun.onAmmoNumChange.remove(ui.changeAmmoNum, ui);
            this.curGun.onCrossChange.remove(ui.changeCross, ui);
            this.curGun.server_reqDestroy();
            this.curGun = null;
        }

        this.curGun = newGun;
        this.curGun.onAmmoNumChange.add(ui.changeAmmoNum, ui);
        this.curGun.onCrossChange.add(ui.changeCross, ui);
        let sex = this._char.description.advance.base.characterSetting.somatotype % 2;
        let weaponAction = sex == 0 ? newGun.femaleAction : newGun.maleAction;
        PlayerManagerExtesion.changeStanceExtesion(this._char, weaponAction.holdStance)
        this._fireAnimation = PlayerManagerExtesion.loadAnimationExtesion(this._char, weaponAction.shootAnimation, true);
        this._reloadAnimation = PlayerManagerExtesion.loadAnimationExtesion(this._char, weaponAction.reloadAnimation, true);

        mw.UIService.showUI(ui);
        PrefabEvent.PrefabEvtEquip.equip(this._char.gameObjectId, PrefabEvent.EquipSlot.Weapon, this.curGun.guid);

    }


    /**
     * 播放开火动画
     */
    public playFireAni() {
        this._fireAnimation?.play();
    }

    /**
     * 播放装弹动画
     */
    public playReloadAni() {
        this._reloadAnimation?.play();
    }

    /**
     * 获取装弹需要的时间长度
     * @returns 装弹的时间
     */
    public getReloadingTime(): number {
        return this._reloadAnimation.length;
    }

    /**
     * 卸载发射器和相关资源
     */
    public unloadGun() {
        this.unloadResources();
        this.curGun?.server_reqDestroy();
        this.curGun = null;
        mw.UIService.hide(RayGunUI);
    }

    /**
     * 卸载自身管理的资源
     */
    private unloadResources() {
        if (this._char && this.curGun) {
            PlayerManagerExtesion.changeStanceExtesion(this._char, "")
            console.log("资源卸载")
        }
        this._fireAnimation?.stop();
        this._fireAnimation = null;
        this._reloadAnimation?.stop();
        this._reloadAnimation = null;
    }
}
