

import { GameConfig } from "../../config/GameConfig";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import NWeaponBase from "./nHotWeaponBase";
import { CameraManager } from '../../utils/CameraManager';
import { utils } from '../../utils/uitls';
import { WeaponModuleS } from './WeaponModuleS';
import { P_Ami } from './UI/P_Ami';
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { EffectManager } from "../../utils/EffectManager";
import { Ammo, AmmoPool } from "./nAmmo";
import P_Gun_HUD from "./P_Gun_HUD";
import nfanWeapon from "./nfanWeapon";
import ChangeJS from "../ChangeMonster/ChangeJS";


export class WeaponModuleC extends ModuleC<WeaponModuleS, null> {

    /**玩家的枪集合 */
    private weapons: Map<number, NWeaponBase> = new Map<number, NWeaponBase>();
    /* 弹药数组 */
    private ammos: Map<number, Ammo> = new Map<number, Ammo>();
    /**当前持有热武器模型 */
    private currentWeaponModel: mw.GameObject = null;


    private outSound: number;
    private _cameraOffsetX: number = null;
    private end: Vector = null;
    private start: mw.Vector;

    private isUpdate: boolean = false;
    /**枪脚本 */
    private weapon: NWeaponBase;
    private amiUI: P_Ami = null;

    /**枪销毁事件 */
    public weaponDestroyAC: Action = new Action();
    /**枪UI */
    public gunHUD: P_Gun_HUD = null;
    /**NPC动画表ID */
    private curDanceId: number = 0;

    protected onStart(): void {

        InputUtil.onKeyDown(mw.Keys.F3, () => {

        });

        this.gunHUD = UIService.getUI(P_Gun_HUD);
        this.gunHUD.onDanceChange.add(this.changeDanceId.bind(this));
    }

    /**初始化玩家的武器 
     * @param cfgId 武器表配置id
     */
    public async initPlayerWeapon(cfgId: number): Promise<void> {
        if (!this.weapons.has(cfgId)) {
            let script = await this.init(cfgId);
            this.weapons.set(cfgId, script);
            console.warn(`lwj 设置武器脚本成功 ${cfgId}`);
        }
    }


    /**
     * 装备武器
     * @param cfgId 武器表配置id
     * @param weaponGuid 武器guid
     */
    public async equipWeapon(cfgId: number, weaponGuid: string) {

        if (!this.weapons.has(cfgId)) {
            let script = await this.init(cfgId);
            this.weapons.set(cfgId, script);
            console.warn(`lwj 设置武器脚本成功 ${cfgId}`);
        }
        this.gunHUD.onEquipGun(cfgId);

        this.weapon = this.weapons.get(cfgId);
        this.isUpdate = true;
        this.amiUI.show();
        this.amiUI.onAttack.add(this.startFire.bind(this));
        this.setWeapon(weaponGuid, cfgId);
        CameraManager.instance.saveCurCameraData();
        CameraManager.instance.setCameraOffset();
        this.weapon.equip(this.localPlayer.character);
        this.amiUI.setBulletNum(this.weapon.bulletCount, this.weapon.currentClipSize);
        ModuleService.getModule(PlayerModuleC).effOffset(true);
    }

    /**
     * 卸载武器
     */
    public unEquipWeapon() {

        this.amiUI.hide();
        this.isUpdate = false;
        this.weapon.unequip();
        CameraManager.instance.resumeCameraData();
        this.amiUI.onAttack.clear();
        ModuleService.getModule(PlayerModuleC).effOffset(false);
        this.gunHUD.onUnequipGun();
    }

    /**
     * 开火
     */
    public startFire() {
        if (!this.weapon) return;
        this.weapon.startFire();
    }

    /**
     * 添加子弹
     * @param cfgId 武器item表id
     * @param bulletCount 子弹数量
     * @returns 是否添加成功
     */
    public addBullet(cfgId: number, bulletCount: number): boolean {
        let weapon = this.weapons.get(cfgId);
        if (!weapon) {
            console.warn(`lwj 当前武器信息为空 ${cfgId}`);
            return false;
        }
        let isSuccess = weapon.addAmmo(bulletCount);
        if (this.weapon && this.weapon.cfgId == cfgId)
            this.amiUI.setBulletNum(weapon.bulletCount, weapon.currentClipSize);
        return isSuccess;
    }

    /**创建武器 */
    private setWeapon(weaId: string, weapCfgId: number) {
        console.warn(`lwj 设置武器guid ${weaId}  ${weapCfgId}`);
        GameObject.asyncFindGameObjectById(weaId).then((obj) => {
            if (!obj) {
                console.warn(`lwj 武器模型为空 ${weaId}`);
                GameObject.asyncFindGameObjectById(weaId).then((obj) => {
                    console.warn(`lwj 武器模型为再次空！！ ${weaId}`);
                    this.currentWeaponModel = obj;
                });
                return;
            }
            this.currentWeaponModel = obj;
        })
        this.server.net_setWeapon(weaId, weapCfgId, this.curDanceId);
    }

    private changeDanceId(danceId: number) {
        this.curDanceId = danceId;
        this.server.net_setDanceId(danceId);
    }

    /**销毁武器 */
    private destroyWeapon() {
        this.server.net_destroyWeapon();
    }

    /**开始射击 */
    private async onstartFire(curBullectCount: number) {
        this.amiUI.setBulletNum(curBullectCount, this.weapon.currentClipSize);
    }

    /**中断射击 */
    private async onstopFire() {
        this.server.net_stopFire();

        if (this.outSound) {
            SoundService.stop3DSound(this.outSound);
            this.outSound = null;
        }

    }

    /**射击回调 */
    private async onFire(aimOffest: number = 0) {
        if (this.currentWeaponModel == null) {
            console.warn(`lwj 当前武器信息为空`);
            return;
        }

        let startLoc = this.currentWeaponModel.worldTransform.transformPosition(GlobalData.Gun.bulletOffset)
        let tr = CameraManager.instance.worldTransform;
        let arm = CameraManager.instance.armLength;
        GlobalData.TempVector.temp.set(arm - this.cameraOffsetX(), 0, 0);
        this.start = utils.transformPosition(tr, GlobalData.TempVector.temp);
        Vector.multiply(tr.getForwardVector(), GlobalData.Gun.bulletCheckDis, GlobalData.TempVector.temp1);
        if (this.end == null) this.end = new Vector(0, 0, 0);
        Vector.add(this.start, GlobalData.TempVector.temp1, this.end);


        let shootDir = this.end.clone().subtract(startLoc);
        let ammoDirection = shootDir.normalized.add(new mw.Vector(0, 0, aimOffest));
        this.server.net_onFire(ammoDirection, shootDir.length);

    }

    /**
    * 相机的相对偏移x
    */
    private cameraOffsetX(): number {
        if (this._cameraOffsetX == null) {
            this._cameraOffsetX = CameraManager.instance.localTransform.position.x;
        }
        return this._cameraOffsetX;;
    }

    /**
     * 初始化创建枪脚本
     * @param cfgId 武器表配置id
     */
    private async init(cfgId: number): Promise<NWeaponBase> {
        let anchor = await GameObjPool.asyncSpawn("Anchor", GameObjPoolSourceType.Asset);
        if (cfgId == 1003) {
            this.weapon = anchor.addComponent(nfanWeapon);
        } else {
            this.weapon = anchor.addComponent(NWeaponBase);
        }
        this.amiUI = UIService.getUI(P_Ami);
        this.weapon.onEquip = (id: number) => {

        }
        this.weapon.init(cfgId);
        this.weapon.onStartFire = (bulletCount: number) => { this.onstartFire(bulletCount); }
        this.weapon.onStopFire = () => { this.onstopFire(); }
        this.weapon.onFire = (aimOffest: number) => { this.onFire(aimOffest); }
        this.weapon.onUnequip = () => { this.destroyWeapon(); }
        this.weapon.onDestroyWeapon = () => { this.destroyScript(); }
        return this.weapon;
    }

    /**回收脚本 */
    private destroyScript(): void {
        if (!this.weapon) return;
        this.weaponDestroyAC.call()
        this.weapons.delete(this.weapon.cfgId);
        this.weapon.destroy();
        this.weapon = null;
    }

    protected onUpdate(dt: number): void {
        this.updateAmmo(dt);
        if (!this.isUpdate) return;
        this.checkAim();
    }

    /**更新弹药 */
    private updateAmmo(dt: number): void {
        this.ammos.forEach((ammo: Ammo, ammoId: number) => {
            if (ammo.update(dt)) {
                if (ammo.ownerId && ammo.ownerId == this.localPlayer.playerId) {
                    this.hitObject(ammo.bulletData.ID, ammo.hitResults, ammo.danceId);
                }
                this.server.net_destroyAmmo(ammoId);
                this.destroyAmmo(ammoId);
            }
        });
    }
    /**检测瞄准 */
    private checkAim(): void {
        if (!this.currentWeaponModel) return;

        let tr = CameraManager.instance.worldTransform;
        let arm = CameraManager.instance.armLength;
        GlobalData.TempVector.temp.set(arm - this.cameraOffsetX(), 0, 0);
        this.start = utils.transformPosition(tr, GlobalData.TempVector.temp);
        Vector.multiply(tr.getForwardVector(), GlobalData.Gun.bulletCheckDis, GlobalData.TempVector.temp1);
        if (this.end == null) this.end = new Vector(0, 0, 0);
        Vector.add(this.start, GlobalData.TempVector.temp1, this.end);

        let hits = utils.boxOverlap(this.start, this.end, GlobalData.Gun.checkSize, GlobalData.Gun.checkSize, false, GlobalData.NPC.npcModelGuids);

        let hitResults = hits.filter(hit => {
            if (hit instanceof Character) {
                let player = (hit as Character).player;
                if (!player) {
                    return true;
                } else {
                    let has = ChangeJS.changeJSArr.find((item) => {
                        if (item.OwnerID == player.playerId) {
                            return true;
                        }
                    });
                    if (has)
                        return true;
                }
            }
            return hit.tag;
        });

        this.amiUI.setAmiType(hitResults.length == 0);

    }

    /**主控端击中物体 */
    private hitObject(ammoId: number, hitResults: mw.GameObject[] | mw.HitResult[], danceId: number): void {
        if (hitResults.length <= 0) return;
        let tempResult = hitResults[hitResults.length - 1];
        if (!tempResult) return;
        let hitLoc: mw.Vector;
        let hitRot: mw.Rotation;
        let objGuids: string[] = [];
        if (tempResult instanceof mw.HitResult) {
            let hitRot = tempResult.impactNormal.toRotation();
            hitRot.y -= 90;
            hitLoc = tempResult.gameObject.localTransform.position;
        } else {
            hitLoc = tempResult.worldTransform.position;
            hitRot = mw.Rotation.zero;
        }
        hitResults.forEach((hitResult: mw.GameObject | mw.HitResult) => {

            if (hitResult instanceof mw.GameObject) {
                objGuids.push(hitResult.gameObjectId)
            } else {
                objGuids.push(hitResult.gameObject.gameObjectId)
            }
            EffectManager.instance.playEffectOnPos(24, hitLoc);
        });

        if (objGuids.length <= 0) return;

        this.server.net_hitObject(ammoId, hitLoc, objGuids, danceId);


    }

    /**接收服务端销毁弹药 */
    public net_destroyAmmo(ammoId: number): void {
        this.destroyAmmo(ammoId);
    }

    /**销毁弹药 */
    private destroyAmmo(ammoId: number): void {
        let ammo = this.ammos.get(ammoId);
        if (ammo) {
            this.ammos.delete(ammoId);
            AmmoPool.instance.recycleAmmo(ammo);
        }
    }

    /**吐出 */
    public async net_playFire(weaponGuid: string, weaInfoId: number, ownerId: number, danceId: number, bulletId: number, dir: mw.Vector, dis: number): Promise<void> {
        let weaInfo = GameConfig.nWeapon.getElement(weaInfoId);
        let weapon = GameObject.findGameObjectById(weaponGuid);

        if (!weapon) return;

        if (this.outSound) {
            SoundService.stop3DSound(this.outSound);
            this.outSound = null;
        }
        this.outSound = SoundService.play3DSound(weaInfo.fireSoundId, weapon, 1, weaInfo.fireSoundVom);

        let loc = weapon.worldTransform.position.add(GlobalData.Gun.bulletOffset)

        let ammoId = GameConfig.nWeapon.getElement(weaInfoId).bulletID;
        this.ammos.set(bulletId, await AmmoPool.instance.getAmmo(ownerId, loc, dir, ammoId, dis, danceId));
    }

    public net_playEffectOnPos(cfgId: number, loc: mw.Vector): void {
        EffectManager.instance.playEffectOnPos(cfgId, loc);
    }

    private effArr: number[] = [];
    /**
     * 击中表现
     * @param cfgId     特效表id
     * @param guid  击中物体guid
     */
    public async net_playEffectOnGameObject(cfgIds: number[], guid: string,) {
        let obj = GameObject.findGameObjectById(guid);
        if (obj) {

            cfgIds.forEach(async (cfgId) => {
                let effid = await EffectManager.instance.playEffectOnGameObject(obj, cfgId);
                this.effArr.push(effid);
            });

            setTimeout(() => {
                this.effArr.forEach((effid) => {
                    EffectManager.instance.stopEffect(effid);
                });
            }, GlobalData.NPC.npcDanceTime * 1000);

        }
    }




    /**播放击中玩家音效特效 */
    public playHitPlayerEffect(id: number, loc: mw.Vector): void {
        const bulletData = GameConfig.nBullet.getElement(id);
        EffectManager.instance.playEffectOnPos(17, loc);

    }
}
