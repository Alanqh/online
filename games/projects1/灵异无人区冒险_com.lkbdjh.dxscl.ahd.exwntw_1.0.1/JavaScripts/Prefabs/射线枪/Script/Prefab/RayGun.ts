import { GeneralManager, } from '../../../../Modified027Editor/ModifiedStaticAPI';
/*

* @Date         : 2023-02-16 17:34:09

 * @LastEditTime: 2023-09-11 11:50:33
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\RayGun.ts
* @Description  : 
*/
import { PrefabEvent } from "../../../../prefabEvent/PrefabEvent";
import { PrefabReport } from '../../../../prefabEvent/PrefabReport';
import { MaleAction, FemaleAction } from "./Data/WeaponAction";
import { WeaponCross } from "./Data/WeaponCross";
import { GunManagerC } from "./Manager/GunManager";
import { AssetsHelper } from "./Tools/AssetsHelper";

/** 扩散UI与方向偏移的比例 */
const CrossRate = 0.0009;
/** 最大检测距离 */
const maxCheckDistance = 10000;

abstract class RayGunPredef extends mw.Script {
    protected abstract server_equip(playerId: number);

    public abstract server_reqDestroy();

    protected abstract server_playEffectProxy(effectLoc: Vector, rot: Rotation, isChar: boolean, charPos: Vector);
}

export abstract class RayGunClient extends RayGunPredef {
    /** 持有发射器的玩家的id */
    @mw.Property({ hideInEditor: true, replicated: true, onChanged: "OnBindPlayerChange" })
    public playerId: number = -1;

    @mw.Property({ displayName: "武器图标", group: "射线枪属性" })
    public weaponIcon: string = "101167";

    @mw.Property({ displayName: "武器名字", group: "射线枪属性" })
    public weaponName: string = "射线枪";

    @mw.Property({ displayName: "攻击力", group: "射线枪属性" })
    public attackDamage: number = 10;

    @mw.Property({ displayName: "开火间隔", group: "射线枪属性" })
    public interval: number = 0.3;

    @mw.Property({ displayName: "弹夹容量", group: "射线枪属性" })
    public maxAmmoNum: number = 30;

    @mw.Property({ displayName: "扩散", group: "射线枪属性" })
    public crossInfo: WeaponCross = new WeaponCross();

    @mw.Property({ displayName: "男性动作", group: "动作资源", tooltip: "男性角色操作武器的各种动作资源" })
    public maleAction = new MaleAction();

    @mw.Property({ displayName: "女性动作", group: "动作资源", tooltip: "女性角色操作武器的各种动作资源" })
    public femaleAction = new FemaleAction();

    @mw.Property({ displayName: "攻击距离", group: "射线枪属性" })
    public distance: number = 1000;

    @mw.Property({ displayName: "开火音效", group: "射线枪属性" })
    public fireSound: string = "";

    @mw.Property({ displayName: "命中特效(物)", group: "射线枪属性" })
    public effectObjID: string = "";

    @mw.Property({ displayName: "命中特效(人)", group: "射线枪属性" })
    public effectCharID: string = "";

    @mw.Property({ displayName: "命中声效(物)", group: "射线枪属性" })
    public soundObjID: string = "";

    @mw.Property({ displayName: "命中声效(人)", group: "射线枪属性" })
    public soundCharID: string = "";

    @mw.Property({ displayName: "捡取触发器", group: "射线枪属性", capture: true })
    public triggerGuid: string = "";

    /** 进入触发器 */
    private _enterTrigger: mw.Trigger;

    /** 武器外观，放在场景里面的 */
    private _weaponApperence: mw.GameObject;

    /** 是否被当做了武器使用 */
    private _enable: boolean = false;

    /** 是否正在重新装弹 */
    private _isReloading: boolean = false;

    /** 是否正在开火 */
    private _isFiring: boolean = false;

    /** 当前的子弹数目 */
    public curAmmoNum: number = 0;

    /** 在子弹数目改变的时候调用 */
    public onAmmoNumChange: Action = new Action();

    /** 在扩散度改变的时候调用 */
    public onCrossChange: Action = new Action();

    /** 当前的扩散度 */
    public curCross: number;

    /** 开火特效 */
    private _fireEffect: mw.Effect;

    /**
     * 开火剩余间隔
     */
    public curCd: number = 0;
    public pos 

    protected onStart() {
        this.pos = this.gameObject.worldTransform.position
        if (SystemUtil.isClient()) {
            this.initObj();
            AssetsHelper.checkAssets(...[this.effectCharID, this.effectObjID]);
            AssetsHelper.checkAssets(...this.maleAction.assetGuids);
            AssetsHelper.checkAssets(...this.femaleAction.assetGuids);
        }
    }

    /**
     * 初始化场景中已经放好的物件
     */
    private async initObj() {
        if (!this.gameObject) {
            return;
        }
        this._weaponApperence = this.gameObject.getChildByName("weaponRoot");
        this._fireEffect = this._weaponApperence.getChildByName("fireEffect") as mw.Effect;
        this._enterTrigger = await GameObject.asyncFindGameObjectById(this.triggerGuid) as mw.Trigger;
        this._enterTrigger.onEnter.add(this.onEnterTrigger.bind(this))
        this.OnBindPlayerChange();
    }

    /**
     * 在一个玩家进入了捡取触发器
     * @param character 进入的玩家
     */
    private onEnterTrigger(character: mw.Character) {
        let locPid = Player.localPlayer.playerId;
        if (character.player && character.player.playerId == locPid) {
            this.server_equip(locPid);
        }
    }

    /**
     * 枪械绑定的玩家变化
     */
    public OnBindPlayerChange() {
        let player = Player.getPlayer(this.playerId);
        if (!player) {
            return;
        }
        if (this._weaponApperence) {
            player.character.attachToSlot(this._weaponApperence, mw.HumanoidSlotType.RightHand);
            this._weaponApperence.localTransform.position = Vector.zero;
        }
    }

    /**
     * 被服务器告知装备上这个装备
     * @param player 装备的玩家
     */
    @RemoteFunction(mw.Client)
    public client_Equip(player: mw.Player) {
        GunManagerC.instance.registerGun(this);
        this._enable = true;
        this.useUpdate = true;
        this.curAmmoNum = this.maxAmmoNum;
        this.onAmmoNumChange.call();
        this.curCross = this.crossInfo.min;
        this.onCrossChange.call();
    }

    protected onUpdate(dt: number): void {
        if (!this._enable) {
            return;
        }
        this.curCd -= dt;
        if (this._isReloading) {
            this.reloading();
        } else if (this._isFiring) {
            this.shoot();
        }
        if (!this._isFiring || this._isReloading) {
            this.curCross -= this.crossInfo.add * dt * 5;
            this.curCross = Math.max(this.curCross, this.crossInfo.min);
            this.onCrossChange.call();
        }
    }

    /**
     * 开始开火
     */
    public startFire() {
        this._isFiring = true;
    }

    /**
     * 停止开火
     */
    public stopFire() {
        this._isFiring = false;
    }

    /**
     * 开始重新装弹
     */
    public startReload() {
        if (this._isReloading) {
            return;
        }
        this._isReloading = true;
        GunManagerC.instance.playReloadAni();
        this.curCd = GunManagerC.instance.getReloadingTime();
    }

    /** 重新装弹的过程 */
    private reloading() {
        if (this.curCd > 0) {
            return;
        }
        this.curAmmoNum = this.maxAmmoNum;
        this.onAmmoNumChange.call();
        this._isReloading = false;
    }

    /**
     * 射击接口
     */
    private shoot() {
        if (this.curAmmoNum <= 0) {
            this.startReload();
        }
        else if (this.curCd <= 0) {
            this.curCd = this.interval;
            this.curCross += this.crossInfo.add;
            this.curCross = Math.min(this.curCross, this.crossInfo.max);
            this.onCrossChange.call();
            this.curAmmoNum -= 1;
            this.onAmmoNumChange.call();
            GunManagerC.instance.playFireAni();
            this.client_checkEnemies();
        }
    }

    /**
     * 敌人检测
     */
    private client_checkEnemies() {
        //根据视窗获取在准星范围内的点。
        let camera = Camera.currentCamera;
        let cameraShootDir = camera.worldTransform.clone().getForwardVector().clone();
        let rd = Vector2.random().multiply(CrossRate * this.curCross);
        let right = camera.worldTransform.clone().getRightVector();
        let up = camera.worldTransform.getUpVector();
        cameraShootDir.add(right.multiply(rd.x).add(up.multiply(rd.y)));

        let endLoc = cameraShootDir.multiply(maxCheckDistance).add(camera.worldTransform.clone().position);
        let shootDir = endLoc.clone().subtract(this._weaponApperence.worldTransform.position);
        let hitRes = QueryUtil.lineTrace(camera.worldTransform.clone().position, endLoc, true, false);
        hitRes = hitRes.filter(e => {
            return !(e.gameObject instanceof mw.Trigger)
        })
        if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this._weaponApperence.worldTransform.position), shootDir) > 0) {
            shootDir = hitRes[0].impactPoint.clone().subtract(this._weaponApperence.worldTransform.position);
        }
        else {
            SoundService.play3DSound(this.soundObjID, Player.localPlayer.character.worldTransform.position, 1, 1, { falloffDistance: 3000 });
            return;
        }
        let ammoDirection = shootDir.normalized;
        let end = ammoDirection.clone().multiply(this.distance).add(this._weaponApperence.worldTransform.position);

        let startLoc = this._weaponApperence.worldTransform.position.clone();
        //根据点位获取到实际的敌人
        let lineRes = QueryUtil.lineTrace(startLoc, end, true, false);
        let curCharGuid = Player.localPlayer.character.gameObjectId;
        let target: mw.HitResult;
        for (let index = 0; index < lineRes.length; index++) {
            const element = lineRes[index];
            if (element.gameObject.gameObjectId == curCharGuid || element.gameObject instanceof mw.Trigger) {
                continue;
            }
            target = element;
            break;
        }

        if (target) {
            let rot = target.impactNormal.toRotation();
            rot.y -= 90;
            let isChar = (target.gameObject instanceof mw.Pawn);
            this.server_playEffectProxy(target.gameObject.worldTransform.position, rot, isChar, Player.localPlayer.character.worldTransform.position);
            PrefabEvent.PrefabEvtFight.hit(curCharGuid, target.gameObject.gameObjectId, this.attackDamage, target.impactPoint);
        }
        else {
            SoundService.play3DSound(this.soundObjID, Player.localPlayer.character.worldTransform.position, 1, 1, { falloffDistance: 3000 });
        }
    }

    /**
     * 客户端播放特效声效
     * @param effectLoc 目标点特效位置
     * @param rot 旋转度
     * @param isChar 击中目标是否是角色
     * @param charPos 发生源，开枪者
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    public clinet_PlayerEffcet(effectLoc: Vector, rot: Rotation, isChar: boolean, charPos: Vector) {
        if (isChar) {
            GeneralManager.rpcPlayEffectAtLocation(this.effectCharID, effectLoc, 1, rot);
            SoundService.play3DSound(this.soundCharID, effectLoc, 1, 1, { falloffDistance: 3000 });
        }
        else {
            GeneralManager.rpcPlayEffectAtLocation(this.effectObjID, effectLoc, 1, rot);
            SoundService.play3DSound(this.soundObjID, effectLoc, 1, 1, { falloffDistance: 3000 });
        }
        SoundService.play3DSound(this.soundObjID, charPos, 1, 1, { falloffDistance: 3000 });
        if (this._fireEffect) {
            this._fireEffect.stop();
            this._fireEffect.play();
        }

    }

    protected onDestroy(): void {
        if (SystemUtil.isClient()) {
            this._enterTrigger?.destroy();
            this._weaponApperence?.destroy();
            this._fireEffect?.destroy();
        }
    }
}

export abstract class RayGunServer extends RayGunClient {
    @mw.Property({ hideInEditor: true })
    none;

    private _leftGameListener

    protected onStart(): void {
        super.onStart();
        if (SystemUtil.isServer()) {
            this._leftGameListener = this.onPlayerLeftGame.bind(this);
            Player.onPlayerLeave.add(this._leftGameListener)
        }
    }

    protected onDestroy(): void {
        super.onDestroy();
        if (SystemUtil.isServer()) {
            Player.onPlayerLeave.remove(this._leftGameListener);
        }
    }

    protected onPlayerLeftGame(player: mw.Player) {
        if (player.playerId == this.playerId) {
            this.server_reqDestroy();
        }
    }

    @RemoteFunction(mw.Server)
    protected server_equip(playerId: number) {
        if (this.playerId != -1) {
            return;
        }
        const player = Player.getPlayer(playerId);
        if (!player) {
            return;
        }
        this.playerId = playerId;
        if(SystemUtil.isServer()) {
            setTimeout(async () => {
                console.log('this.createGoAsync')
                // console.log(this.pos)
                let go = await GameObject.asyncSpawn("AA054E8B48C354C4C832AEB598F4B8EE",{ replicates: true }).then((obj) => {
                    obj.worldTransform.position = this.pos
                })
            }, 5000);
        }
        this.client_Equip(player);
        //this.gameObject.destroy();
    }

    @RemoteFunction(mw.Server)
    public server_reqDestroy() {
        this.gameObject.destroy();
    }

    /**
     * 服务器播放特效声效
     * @param effectLoc 目标点特效位置
     * @param rot 旋转度
     * @param isChar 击中目标是否是角色
     * @param charPos 发生源，开枪者
     */
    @RemoteFunction(mw.Server)
    protected server_playEffectProxy(effectLoc: Vector, rot: Rotation, isChar: boolean, charPos: Vector) {
        this.clinet_PlayerEffcet(effectLoc, rot, isChar, charPos);
    }
}

@Component
export default class RayGun extends RayGunServer {
    @PrefabReport(25)
    protected override onStart(): void {
        super.onStart();
    }
}

