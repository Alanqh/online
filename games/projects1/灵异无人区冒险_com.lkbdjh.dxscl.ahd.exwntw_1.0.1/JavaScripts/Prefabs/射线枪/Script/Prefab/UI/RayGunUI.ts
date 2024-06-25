/*

 * @Date: 2023-03-15 16:40:42

 * @LastEditTime: 2023-03-15 18:48:31
 * @Description: file content
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\UI\RayGunUI.ts
 */

import { PrefabEvent } from "../../../../../prefabEvent/PrefabEvent";
import RayGunUI_Generate from "../../../../../ui-generate/Prefabs/射线枪/UI/RayGunUI_generate";
import { GunManagerC } from "../Manager/GunManager";
import RayGun, { RayGunClient } from "../RayGun";

export class RayGunUI extends RayGunUI_Generate {
    /** 当前绑定的武器 */
    curWeapon: RayGunClient;

    //准心参数部分 上下左右
    upPosition: mw.Vector2 = mw.Vector2.zero;
    downPosition: mw.Vector2 = mw.Vector2.zero;
    leftPosition: mw.Vector2 = mw.Vector2.zero;
    rightPosition: mw.Vector2 = mw.Vector2.zero;

    upCurPosition: mw.Vector2 = mw.Vector2.zero;
    downCurPosition: mw.Vector2 = mw.Vector2.zero;
    leftCurPosition: mw.Vector2 = mw.Vector2.zero;
    rightCurPosition: mw.Vector2 = mw.Vector2.zero;

    public ammoNumChangeFunc = this.changeAmmoNum.bind(this);

    public crossChangeFunc = this.changeCross.bind(this);

    onStart() {
        this.right_fire.onJoyStickDown.add(() => {
            console.error("right_fire onPressed");
            if (!this.curWeapon) return;
            this.curWeapon.startFire();
        });

        this.right_fire.onJoyStickUp.add(() => {
            console.error("right_fire onReleased");
            if (!this.curWeapon) return;
            this.curWeapon.stopFire();
        });

        this.reload.onClicked.add(() => {
            console.error("reload onClicked");
            if (!this.curWeapon) return;
            this.curWeapon.startReload();
        });

        this.crouch.onClicked.add(() => {
            console.error("crouch onClicked");
            Event.dispatchToLocal("onUnequip")
            // let player = Player.localPlayer;
            // if (player) {
            //     if (player.character.isCrouching) {
            //         player.character.crouch(false);
            //     } else {
            //         player.character.crouch(true);
            //     }

            // }
        });
    }

    onShow() {
        let camera = Camera.currentCamera;
        camera.preset = (mw.CameraPreset.TPSOverShoulderAngle);
        this.curWeapon = GunManagerC.instance.curGun;
        this.icon.imageGuid = this.curWeapon.weaponIcon;
        this.name.text = this.curWeapon.weaponName;
        this.upPosition = this.upPosition.set(this.up.position);
        this.downPosition = this.downPosition.set(this.down.position);
        this.leftPosition = this.leftPosition.set(this.left.position);
        this.rightPosition = this.rightPosition.set(this.right.position);
    }

    changeCross() {
        let value = this.curWeapon.curCross;
        this.up.position = this.upCurPosition.set(this.upPosition.x, this.upPosition.y - value);
        this.down.position = this.downCurPosition.set(this.downPosition.x, this.downPosition.y + value);
        this.left.position = this.leftCurPosition.set(this.leftPosition.x - value, this.leftPosition.y);
        this.right.position = this.rightCurPosition.set(this.rightPosition.x + value, this.rightPosition.y);
    }

    changeAmmoNum() {
        let bullet = this.curWeapon.curAmmoNum;
        let ammo = this.curWeapon.maxAmmoNum;
        this.bullet.text = `${bullet} / ${ammo}`;
    }

    onHide() {
        this.up.position = this.upCurPosition.set(this.upPosition);
        this.down.position = this.downCurPosition.set(this.downPosition);
        this.left.position = this.leftCurPosition.set(this.leftPosition);
        this.right.position = this.rightCurPosition.set(this.rightPosition);
    }
}