import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { ModifiedCameraSystem, CameraModifid, } from '../../Modified027Editor/ModifiedCamera';
import UITools from '../../utils/UI/UITools';
import { GlobalData } from '../../const/GlobalData';
import { GameConfig } from '../../config/GameConfig';
import { InWeaponElement } from '../../config/nWeapon';
/**
* @description 热武器状态
*/
enum HotWeaponState {
    /** 准备好，可以进行射击 非射机姿态 */
    Idle = 0,
    /** 换弹夹，装弹 */
    Reloading = 1,
    /** 上膛 */
    Loading = 2,
    /** 射击中 */
    Firing = 3
}


@Component
export default class NWeaponBase extends mw.Script {

    @mw.Property({ displayName: "武器冲量", group: "配置设置", range: { min: 0, max: 30 } })
    private _impulse: number = 0;
    @mw.Property({ displayName: "武器配表id", group: "配置设置" })
    protected weaponId: number = 1001;

    @mw.Property({ displayName: "发射动作", group: "发射设置" })
    protected fireAction: string = "99647";
    @mw.Property({ displayName: "发射姿态", group: "发射设置" })
    protected firePose: string = "4172";
    @mw.Property({ displayName: "常规姿态", group: "发射设置" })
    private normalPose: string = "";

    @mw.Property({ displayName: "发射间隔", group: "发射设置", range: { min: 0.1, max: 10 } })
    protected fireInterval: number = 0.8;
    @mw.Property({ displayName: "弹匣容量", group: "发射设置", range: { min: 1, max: 1000 } })
    private magazineCapacity: number = GlobalData.Gun.bulletMaxCount;

    private _cfgId: number = 0;
    public get cfgId(): number {
        return this._cfgId;
    }
    private cfg: InWeaponElement = null;

    /**获取武器冲量 */
    public get impulse(): number {
        return this._impulse;
    }
    /**获取当前弹夹容量 */
    public get currentClipSize(): number {
        return this.magazineCapacity;
    }


    @mw.Property({ displayName: "瞄准姿态", group: "瞄准设置" })
    protected aimPose: string = "4172";

    @mw.Property({ displayName: "启用上膛功能", group: "上膛设置" })
    private enableLoad: boolean = true;
    @mw.Property({ displayName: "上膛动作", group: "上膛设置" })
    private loadAction: string = "80482";
    @mw.Property({ displayName: "上膛时间", group: "上膛设置", range: { min: 0.1, max: 10 } })
    private loadTime: number = 1.0;

    @mw.Property({ displayName: "启用换弹功能", group: "换弹设置" })
    private enableReload: boolean = true;
    @mw.Property({ displayName: "换弹动作", group: "换弹设置" })
    private reloadAction: string = "4170";
    @mw.Property({ displayName: "换弹时间", group: "换弹设置", range: { min: 0.1, max: 10 } })
    private reloadTime: number = 0.87;

    @mw.Property({ displayName: "启用后坐力功能", group: "后坐力设置" })
    private enableRecoil: boolean = true;
    @mw.Property({ displayName: "后坐力相机震荡幅度", group: "后坐力设置", range: { min: 0, max: 20 } })
    private recoilCameraShake: number = 10;
    @mw.Property({ displayName: "单次后坐力回归时间（毫秒）", group: "后坐力设置", range: { min: 100, max: 1000 } })
    private recoilRecoveryTime: number = 500;
    @mw.Property({ displayName: "水平偏移最小值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilOffsetMinX: number = -0.5;
    @mw.Property({ displayName: "水平偏移最大值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilOffsetMaxX: number = 0.5;
    @mw.Property({ displayName: "垂直偏移最小值", group: "后坐力设置", range: { min: 0, max: 1 } })
    private recoilOffsetMinY: number = 0;
    @mw.Property({ displayName: "垂直偏移最大值", group: "后坐力设置", range: { min: 0, max: 1 } })
    private recoilOffsetMaxY: number = 0.5;
    @mw.Property({ displayName: "水平抖动最小值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilShakeMinX: number = -0.5;
    @mw.Property({ displayName: "水平抖动最大值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilShakeMaxX: number = 0.5;
    @mw.Property({ displayName: "垂直抖动最小值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilShakeMinY: number = -0.5;
    @mw.Property({ displayName: "垂直抖动最大值", group: "后坐力设置", range: { min: -1, max: 1 } })
    private recoilShakeMaxY: number = 0.5;

    /**当前武器持有者 */
    protected owner: mw.Character;
    /**玩家相机 */
    protected camera: Camera;
    /**当前武器状态 */
    private state: HotWeaponState = HotWeaponState.Idle;

    /**可以开火 */
    private canFire: boolean = true;


    /**装备回调 */
    public onEquip: (id: number) => void;
    /**卸下回调 */
    public onUnequip: Function;
    /**开始开火回调 */
    public onStartFire: Function;
    /**开火回调 */
    public onFire: Function;
    /**停止开火回调 */
    public onStopFire: Function;
    /**销毁武器回调 */
    public onDestroyWeapon: Function;
    /**子弹总数 */
    public totalAmmo: number = 999;

    private tempMoveFacingDirection: number;


    init(cfgId: number) {
        this._cfgId = cfgId;
        this.cfg = GameConfig.nWeapon.getElement(this.cfgId);
        this.magazineCapacity = this.cfg.bulletMaxCount;
        if (this.cfgId == 1001) {
            this.bulletCount = this.magazineCapacity;
        }
    }

    public equip(owner: mw.Character): void {
        this.owner = owner;
        this.camera = Camera.currentCamera;
        this.useUpdate = true;
        console.warn(`lwj 设置姿态 ${this.firePose}`);
        this.setPosture(this.firePose);
        if (this.onEquip) this.onEquip(this.weaponId);
        this.tempMoveFacingDirection = this.owner.moveFacingDirection;
        this.owner.moveFacingDirection = mw.MoveFacingDirection.ControllerDirection;
    }

    public unequip(): void {
        this.stopFire();
        if (this.owner) {
            this.setPosture("");
            this.playAnimation("");
            this.owner.moveFacingDirection = this.tempMoveFacingDirection;
        } else {
            console.warn(`lwj typee 未找到武器持有者`);
        }
        this.useUpdate = false;
        this.owner = null;
        if (this.onUnequip) this.onUnequip();
    }

    /**开火 */
    public startFire(): void {
        if (!this.owner) {
            console.warn(`lwj 未找到武器持有者`);
            return;
        }
        let tips = "";
        if (this.cfgId == 1001) {
            tips = "没有子弹了 换一把枪吧";
        }
        if (this.cfgId == 1002) {
            tips = "没子弹了，快去寻找子弹";
        }
        if (this.cfgId == 1003) {
            tips = "武器过载,正在恢复中"
        }

        if (this._bulletCount <= 0) {
            //TODO 没有时的表现
            UITools.ShowSoftTips(tips);
            this.stopFire();
            if (this.cfgId == 1001)
                if (this.onDestroyWeapon) this.onDestroyWeapon();
            return;
        }
        if (!this.canFire) return;

        this.state = HotWeaponState.Firing;

        this.resumeFire();
    }

    /**停止开火 */
    public async stopFire(): Promise<void> {
        // this.setPosture(this.normalPose);
        this.canFire = false;
        this.state = HotWeaponState.Idle;
        this.pauseFire();
    }

    /**开火暂停 */
    public pauseFire(): void {
        if (this.onStopFire) this.onStopFire();
    }

    /**开火继续 */
    public resumeFire(): void {
        this.state = HotWeaponState.Firing;
        this.fire();
        console.warn(`lwj 开火 ${this.bulletCount}`);
        if (this.onStartFire) this.onStartFire(this.bulletCount);
    }

    /**获取当前热武器状态 */
    public getState(): HotWeaponState {
        return this.state;
    }


    /**当前开火时间 */
    private fireTime: number = 0;
    /**当前子弹数量 */
    protected _bulletCount: number = 0;

    /**获取当前子弹数量 */
    public get bulletCount(): number {
        return this._bulletCount;
    }
    /**设置当前子弹数量 */
    public set bulletCount(value: number) {
        this._bulletCount = value;
    }

    /**开火轮询 */
    private fireUpdate(dt: number): void {
        if (this.canFire) return;
        this.fireTime += dt;
        if (this.fireTime >= this.fireInterval) {
            this.fireTime = 0;
            this.canFire = true;
        }
    }

    /**开火 */
    protected fire(): void {
        if (this._bulletCount <= 0) {
            UITools.ShowSoftTips("没有子弹了 fire");
            this.pauseFire();
            //  this.reload();
            return;
        }
        this.recoilShake();
        this.clientFire();

        this._bulletCount--;
        this.stopFire();
    }

    /**客户端射击 */
    protected clientFire(): void {
        this.playAnimation(this.fireAction);
        // PlayerManagerExtesion.rpcPlayAnimation(this, this.fireAction);
        if (this.onFire) this.onFire();
    }

    /**换弹 */
    protected reload(): void {
        this.state = HotWeaponState.Reloading;
        if (!this.enableReload) {
            this.reloadComplete();
            return;
        }
        this.playAnimation(this.reloadAction, this.reloadTime, () => {
            this.reloadComplete();
        })
    }

    /**增加子弹 */
    public addAmmo(ammo: number): boolean {
        if (ammo > 18) return;
        if (this.bulletCount >= this.magazineCapacity) return false;
        this.bulletCount += ammo;
        if (this.bulletCount > this.magazineCapacity) {
            this.bulletCount = this.magazineCapacity;
            return true;
        }
        return true;

    }

    /**换弹完成回调 */
    public clientOnReloadEnd: Function = null;

    /**换弹完成 */
    private reloadComplete(): void {
        if (this.totalAmmo < this.magazineCapacity) {
            this._bulletCount = this.totalAmmo;
            this.totalAmmo = 0;
        } else {
            this.totalAmmo -= this.magazineCapacity;
            this._bulletCount = this.magazineCapacity;
        }
        this.clientOnReloadEnd && this.clientOnReloadEnd();
        this.startLoad();
    }

    /**开始上膛 */
    private startLoad(): void {
        this.state = HotWeaponState.Loading;
        if (!this.enableLoad) {
            this.loadComplete();
            return;
        }
        this.playAnimation(this.loadAction, this.loadTime, () => {
            this.loadComplete();
        })
        // PlayerManagerExtesion.rpcPlayAnimation(this, this.loadAction, this.loadTime, () => {
        //     this.loadComplete();
        // })
    }

    /**上膛完成 */
    private loadComplete(): void {
        this.logError("上膛完成");
        // if (this.isFiring) {
        //     this.resumeFire();
        // } else {
        //     this.state = HotWeaponState.Idle;
        // }
    }

    /**后坐力轮询 */
    private recoilShake(): void {
        if (!this.enableRecoil) return;
        const HO = this.getHorizontalOffset();//获取水平偏移
        const VO = this.getVerticalOffset();//获取垂直偏移
        // this._playerController.AddPitchInput(VO);
        // this._playerController.AddYawInput(HO);
        this.cameraShake();
    }

    /**当前姿态 */
    private currentPosture: mw.SubStance;

    /**设置姿态 */
    protected setPosture(posture: string): void {
        // if (this.currentPosture == posture) return;
        if (posture == "" && this.currentPosture) {
            this.currentPosture.stop();
            return;
        }
        this.currentPosture = PlayerManagerExtesion.loadStanceExtesion(this.owner, posture);
        this.currentPosture.play();
    }

    /**当前动画 */
    private currentAnimation: mw.Animation;

    /**播放动画 */
    protected playAnimation(guid: string, time: number = 0, callback: Function = null): void {
        if (!this.owner) return;
        this.currentAnimation?.stop();
        this.currentAnimation = PlayerManagerExtesion.loadAnimationExtesion(this.owner, guid, true);
        if (time) {
            const length = this.currentAnimation.length;
            const rate = time / length;
            this.currentAnimation.speed = rate;
        }
        if (callback) {
            TimeUtil.delaySecond(time).then(() => {
                callback();
            })
            //TODO:onAnimFinished 无效
            // this.currentAnimation.onFinish.add(() => { })
        }
        this.currentAnimation.play();
    }

    private shakeOnce: number = 0;
    private shakeData: CameraModifid.CameraShakeData;

    /**摄像机抖动 */
    private cameraShake(): void {
        if (this.shakeOnce) {
            clearTimeout(this.shakeOnce);
            this.shakeOnce = 0;
        }
        const HJ = this.getHorizontalJitter();//获取水平抖动值
        const VJ = this.getVerticalJitter();//获取垂直抖动值
        if (!this.shakeData) this.shakeData = ModifiedCameraSystem.getDefaultCameraShakeData();
        this.shakeData.rotPitchOscillation.amplitude = VJ;
        this.shakeData.rotPitchOscillation.frequency = this.recoilCameraShake;
        this.shakeData.rotPitchOscillation.waveform = CameraModifid.EOscillatorWaveform.PerlinNoise;
        this.shakeData.rotYawOscillation.amplitude = HJ;
        this.shakeData.rotYawOscillation.frequency = this.recoilCameraShake;
        this.shakeData.rotYawOscillation.waveform = CameraModifid.EOscillatorWaveform.PerlinNoise;
        ModifiedCameraSystem.startCameraShake(this.shakeData);
        this.shakeOnce = setTimeout(() => {
            Camera.stopShake();
            clearTimeout(this.shakeOnce);
            this.shakeOnce = 0;
        }, this.recoilRecoveryTime);
    }

    /**获取水平偏移 */
    private getHorizontalOffset(): number {
        return this.random(this.recoilOffsetMinX, this.recoilOffsetMaxX);
    }

    /**获取垂直偏移 */
    private getVerticalOffset(): number {
        return this.random(this.recoilOffsetMinY, this.recoilOffsetMaxY);
    }

    /**获取水平抖动值 */
    private getHorizontalJitter(): number {
        return this.random(this.recoilShakeMinX, this.recoilShakeMaxX);
    }

    /**获取垂直抖动值 */
    private getVerticalJitter(): number {
        return this.random(this.recoilShakeMinY, this.recoilShakeMaxY);
    }

    /**随机数(增加抖动情况) */
    private random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**日志输出 */
    private logError(...args: any[]): void {
    }


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            AssetUtil.asyncDownloadAsset(this.firePose);
            AssetUtil.asyncDownloadAsset(this.aimPose);
            AssetUtil.asyncDownloadAsset(this.normalPose);
            AssetUtil.asyncDownloadAsset(this.fireAction);
            AssetUtil.asyncDownloadAsset(this.reloadAction);
            AssetUtil.asyncDownloadAsset(this.loadAction);
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (SystemUtil.isClient()) {
            if (this.state === HotWeaponState.Idle) {
                this.fireUpdate(dt);
            }
        }

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.logError("销毁");
        this.unequip();
        this.magazineCapacity = GlobalData.Gun.bulletMaxCount;
    }
}