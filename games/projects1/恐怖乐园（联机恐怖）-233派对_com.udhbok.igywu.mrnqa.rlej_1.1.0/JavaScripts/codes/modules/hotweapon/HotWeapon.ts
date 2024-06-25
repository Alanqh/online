import { IBulletElement } from '../../../config/Bullet';
import { GameConfig } from '../../../config/GameConfig';
import { IHotWeaponElement } from '../../../config/HotWeapon';
import { IItemElement } from '../../../config/Item';
import { PlayerManagerExtension } from '../../Modified027Editor/ModifiedPlayer';
import { TimerOnly, WaitLoop } from '../../utils/AsyncTool';
import { CommonUtils } from '../../utils/CommonUtils';
import { EffectMgrIns } from '../../utils/EffectMgr';
import MusicMgr from '../../utils/MusicMgr';
import { ObjAniUtil } from '../../utils/ObjAniUtil';
import { BagModuleC } from '../bag/BagModuleC';
import { BuffModuleC } from '../buff/BuffModule';
import { EquipDefine } from '../equip/EquipDefine';
import { EquipModuleC } from '../equip/EquipModuleC';
import { Item, registerItem } from '../equip/items/Item';
import { WeaponProperty, WeaponPropertyService } from '../equip/util/WeaponPropertyIns';
import { RouteDefine } from '../route/RouteDefine';
import { RouteModuleC } from '../route/RouteModule';
import HotWeaponModuleC from './HotWeaponC';
import HotWeaponPanel from './ui/HotWeaponPanel';
import { EHurtTextType, HitDamage } from './ui/UIHitDamage';

@registerItem
export class HotWeaponItem extends Item {

    private get selfModule() {
        return ModuleService.getModule(HotWeaponModuleC);
    }

    protected onHand(element: IItemElement, itemIns: GameObject, ownerId: number): void {
        this.selfModule.equip(element, itemIns, ownerId);
    }

    protected onRemoveHand(element: IItemElement, ownerId: number): void {
        this.selfModule.curItemDataCache && ModuleService.getModule(BagModuleC).reqSyncItem(this.selfModule.curItemDataCache);
        this.selfModule.unEquip(ownerId);
    }

    protected async onUse(element: IItemElement): Promise<boolean> {
        return true;
    }
}

export class HotWeapon {

    /** 发射子弹位置的锚点 */
    private bulletAnchor: GameObject;
    /** 被创建出来的武器模型 */
    private go: GameObject;
    /** 武器配置 */
    public weaponCfg: IHotWeaponElement;
    /** 子弹配置 */
    public bulletCfg: IBulletElement;

    public fireEffRot: Rotation = Rotation.zero;

    /** 自己 */
    private selfCha: Character;

    /** 主人 */
    private owner: Character;

    /** 主人的姿态 */
    public ownerStance: SubStance;

    private get isOwner() {
        return this.selfCha === this.owner;
    }

    constructor() {
        this.curBulletNumAction.add(() => {
            if (EquipDefine.curPlayerEquipItem) EquipDefine.curPlayerEquipItem.customData = `${this.curBulletNum}`;
            if (this.go) {
                this.panel.setBulletLeft(this.curBulletNum);
                if (this.curBulletNum <= 0) {
                    this.shiftTimer.setTimeout(() => {
                        this.shiftBullet();
                    }, this.property.spd);
                }
            }
        });
    }

    /** 获取枪的后坐力 */
    public get backForce() {
        return Camera.currentCamera.worldTransform.getForwardVector().negative.multiply(this.weaponCfg.force);
    }

    private property: WeaponProperty;

    public async setWeaponInfo(ownerId: number, go: GameObject, weaponCfg: IHotWeaponElement) {
        this.resetInfo();
        this.selfCha = Player.localPlayer.character;
        this.bulletCfg = GameConfig.Bullet.getElement(weaponCfg.bulletID);
        this.weaponCfg = weaponCfg;
        const player = await Player.asyncGetPlayer(ownerId);
        if (!player) { ModuleService.getModule(EquipModuleC).equip(null); console.error("武器装备失败！"); return; }
        this.owner = player.character;
        if (!this.owner) { console.error("武器装备失败！"); return; }
        this.go = go;
        if (!AssetUtil.assetLoaded(this.bulletCfg.modelGuid)) { AssetUtil.asyncDownloadAsset(this.bulletCfg.modelGuid); }
        this.fireEffRot = new Rotation(weaponCfg.fireEffRot[0], weaponCfg.fireEffRot[1], weaponCfg.fireEffRot[2]);


        // 以下是枪主的设定
        if (this.isOwner) {
            const routeData = await ModuleService.getModule(RouteModuleC).reqHallRouteData(this.owner.player.userId);
            const level = RouteDefine.getItemLevel(this.weaponCfg["itemLevelId"], routeData);
            this.property = WeaponPropertyService.getProperty(this.weaponCfg.id, level, 1);
            // 绑定枪口抖动相对信息
            this.preRot = go.localTransform.rotation.clone();
            this.prePos = go.localTransform.position.clone();
            this.toRot = new Rotation(this.preRot.x, this.preRot.y + this.weaponCfg.shakeRotY, this.preRot.z);
            this.toPos = new Vector(this.prePos.x + this.weaponCfg.shakePosX, this.prePos.y, this.prePos.z);

            // 绑定武器换弹偏移位置
            this.reloadRot = new Rotation(this.preRot.x - 90, this.preRot.y, this.preRot.z);
            this.reloadPos = new Vector(this.prePos.x, this.prePos.y + 10, this.prePos.z);
            this.halfTime = this.weaponCfg.shiftTime / 2 * 1e3;

            this.checkWeaponHasBullet();
        } else {
            let stanceGuid = this.weaponCfg["otherStance"];
            if (StringUtil.isEmpty(stanceGuid)) { stanceGuid = "99647" }
            const stance = this.owner.loadSubStance(stanceGuid);
            stance.blendMode = StanceBlendMode.BlendUpper;
            stance.play();
            this.ownerStance = stance;
        }
        this.setBulletAnchor(go);
        if (!this.bulletAnchor) {
            this.bulletAnchor = await GameObject.asyncSpawn("Anchor");
            this.bulletAnchor.parent = (this.go);
            this.bulletAnchor.localTransform.position = (weaponCfg.bulletLoc);
            this.bulletAnchor.localTransform.rotation = (Rotation.zero);
            console.error(`Debug MyTypeError>>> 武器${this.weaponCfg.id}没有BulletAnchor`);
        }
    }

    private setBulletAnchor(obj: GameObject) {
        if (obj.name === "BulletAnchor") {
            this.bulletAnchor = obj;
            return;
        }
        obj.getChildren().forEach(v => {
            this.setBulletAnchor(v);
        });
    }

    private checkWeaponHasBullet() {
        if (!StringUtil.isEmpty(this.go["customData"])) {
            const leftBullet = Number(this.go["customData"]);
            this.curBulletNum = leftBullet;
        } else {
            this.curBulletNum = 0;
        }
    }

    public get isEquip() {
        return this.go;
    }

    /** 清除武器信息 */
    public clearWeaponInfo() {
        if (this.ownerStance) { this.ownerStance.stop(); }
        // this.curBulletNum > 0 && ModuleService.getModule(BagModuleC).reqChangeItemCount(this.curBulletNum, this.bulletCfg.itemId);
        this.weaponCfg = null;
        this.go = null;
        this.resetInfo();
    }

    private resetInfo() {
        this.curBulletNum = 0;
        this.checkAttachTime = this.CheckAttachTime;
        this._flyDirIndex = null;
        this.isShifting = false;
        this.shiftTimer.stop();
        if (this.bulletAnchor) {
            this.bulletAnchor.destroy();
            this.bulletAnchor = null;
        }
    }

    /** 获取射击终点 */
    public getShootEndLoc() {
        let rst = ScreenUtil.getGameObjectByScreenPosition(this.centerPos.x, this.centerPos.y, this.weaponCfg.range, true, false);
        let endLoc;
        // 找到第一个不是触发器或者不是character的带碰撞的gameObj
        for (const hit of rst) {
            const go = hit.gameObject;
            if (go.parent && go.parent.name.includes("空气墙")) { continue; }
            if (go instanceof mw.Trigger || PlayerManagerExtension.isCharacter(go)) { continue; }
            if (go instanceof UIWidget) { continue; }
            endLoc = hit.position;
            if (!go.tag.includes("Ghost")) {
                this.checkAttach();
            }
            return endLoc;
        }

        if (!endLoc) {
            let cs = Camera.currentCamera;
            let nowPos = cs.worldTransform.position;
            let toPos = cs.worldTransform.getForwardVector().multiply(this.weaponCfg.range);
            endLoc = toPos.add(nowPos);
            this.checkAttach();
        }
        return endLoc;
    }

    private _centerPos: Vector2;

    private get centerPos() {
        if (!this._centerPos) { this._centerPos = new Vector2(mw.getViewportSize().x / 2, mw.getViewportSize().y / 2); }
        return this._centerPos;
    }

    /** 当前子弹数量 */
    private _curBulletNum: number = 0;

    private shiftTimer: TimerOnly = new TimerOnly();

    public isShifting: boolean = false;

    private get panel() {
        return UIService.getUI(HotWeaponPanel);
    }

    /** 判断此时的枪中还有没有子弹 */
    public get bulletEnoughInWeapon(): boolean {
        return this.curBulletNum > 0;
    }

    /** 判断背包中还有没有子弹 */
    public get bulletEnoughInBag(): boolean {
        return ModuleService.getModule(BagModuleC).checkItemExist(this.bulletCfg.itemId);
    }

    public bulletCheck(id: number) {
        return this.bulletCfg.itemId === id;
    }

    private get curBulletNum() {
        return this._curBulletNum;
    }

    public curBulletNumAction: Action = new Action();

    private set curBulletNum(newCount: number) {
        this._curBulletNum = newCount;
        this.curBulletNumAction.call(this._curBulletNum);
    }

    /** 换弹 */
    public shiftBullet() {
        if (this.curBulletNum === this.property.cp) { console.error("子弹是满的"); return; }
        // 正在换弹中不允许换弹了
        if (this.isShifting) { return; }
        // 背包中子弹不够了不允许换弹
        if (!this.bulletEnoughInBag) {
            SoundService.playSound("208046");
            console.error("背包中没得这把枪的子弹");
            return;
        }
        if (!this.weaponCfg) { UIService.hideUI(this.panel); return; }
        this.panel.enterCool(this.weaponCfg.shiftTime);
        this.isShifting = true;
        this.shiftTimer.stop();
        this.playReloadBulletAni();
        MusicMgr.instance.play(this.weaponCfg.shiftMus);
        this.shiftTimer.setTimeout(async () => {
            this.isShifting = false;
            this.curBulletNum += await ModuleService.getModule(BagModuleC).reqChangeItemCount(this.curBulletNum - this.property.cp, this.bulletCfg.itemId);
            this.panel.updateCapacity();
        }, 1e3 * this.weaponCfg.shiftTime + BuffModuleC.attr.shiftTime);
    }

    /** 开火 */
    public async fire(endPos: Vector) {
        // 没有的话，就屏蔽了
        if (!this.weaponCfg) {
            return;
        }
        MusicMgr.instance.play(this.weaponCfg.fireSound, this.go.worldTransform.position);

        // 计算飞行时间
        let flyTime = Vector.distance(endPos, await this.getBulletPos()) / this.bulletCfg.flySpeed * 1e2;

        // 发射子弹
        let bullet = await this.createBullet(this.bulletCfg, this.weaponCfg);
        Vector.subtract(endPos, bullet.worldTransform.position, this.tempToRot);
        bullet.worldTransform.rotation = (this.tempToRot.toRotation());
        this.bulletAnchor && EffectService.playOnGameObject(this.weaponCfg.fireEffect, this.bulletAnchor, {
            position: this.weaponCfg.fireEffOffset,
            rotation: this.fireEffRot,
            scale: this.weaponCfg.fireEffScale,
            loopCount: 1
        });

        let bulletCfg = this.bulletCfg;

        ObjAniUtil.playPosAni(bullet, endPos, flyTime, () => {
            if (!bullet.getVisibility()) { return; }
            this.recycleBullet(bullet, bulletCfg, false);
        }, true, TweenUtil.Easing.Quadratic.Out);

        if (this.isOwner) {
            this.playShakeAni();
        }
    }

    public reduceBullet() {
        if (!this.owner) { return; }
        // 每次开完火，检查子弹够不够
        this.curBulletNum--;
    }

    private reloadPos: Vector = Vector.zero;
    private reloadRot: Rotation = Rotation.zero;
    /** 换弹的一半时间 */
    private halfTime: number = 100;

    /** 播放武器换弹动画 */
    private playReloadBulletAni() {
        this.playCycleAni(this.halfTime + BuffModuleC.attr.shiftTime / 2, this.reloadRot, this.reloadPos);
    }

    /** 武器最初的相对镜头的旋转 */
    private preRot = Rotation.zero;

    private prePos = Vector.zero;

    /** 武器开火要抖动的相对幅度 */
    private toRot = Rotation.zero;

    /** 武器开火要抖动的相对位置 */
    private toPos = Vector.zero;

    /** 播放武器抖动动画 */
    public playShakeAni() {
        this.playCycleAni(this.weaponCfg.shakeTime, this.toRot, this.toPos);
    }

    /**
     * 播放一轮物体相对旋转和位置的yoyo动画
     * @param singleTime 单程动画时间
     */
    private playCycleAni(singleTime: number, toRot?: Rotation, toPos?: Vector) {
        toRot && ObjAniUtil.playRotAni(this.go, toRot, singleTime, () => {
            ObjAniUtil.playRotAni(this.go, this.preRot, singleTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);

        toPos && ObjAniUtil.playPosAni(this.go, toPos, singleTime, () => {
            ObjAniUtil.playPosAni(this.go, this.prePos, singleTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);
    }

    private tempToRot: Vector = Vector.zero;

    public async getBulletPos() {
        return this.bulletAnchor && this.bulletAnchor.worldTransform ? this.bulletAnchor.worldTransform.position : ((await WaitLoop.loop(() => { return this.bulletAnchor }, 10, 1e2)).worldTransform.position);
    }

    /** 拿子弹 */
    private async createBullet(bulletCfg: IBulletElement, weaponCfg: IHotWeaponElement) {
        let bullet = await GameObjPool.asyncSpawn(bulletCfg.modelGuid);
        this.bindTriggerEvt(bullet, bulletCfg, weaponCfg);
        (bullet as Model).setCollision(mw.PropertyStatus.Off);
        bullet.setVisibility(PropertyStatus.On, true);
        bullet.worldTransform.position = await this.getBulletPos();
        CommonUtils.enableEffFromHost(bullet);
        return bullet;
    }

    /** 力的方向轴系数 */
    private _flyDirIndex: Vector;

    public get flyDirIndex() {
        if (!this._flyDirIndex) { this._flyDirIndex = new Vector(0, 0, this.bulletCfg.dirZIndex); }
        return this._flyDirIndex;
    }

    /** 绑定触发器事件 */
    private async bindTriggerEvt(bullet: GameObject, bulletCfg: IBulletElement, weaponCfg: IHotWeaponElement) {
        if (!bullet) { await WaitLoop.loop(() => { return bullet; }) }
        let trigger = bullet.getChildren()[0] as Trigger;
        trigger.enabled = true;
        trigger.onEnter.clear();
        trigger.onEnter.add((obj: GameObject) => {
            if (obj.parent && obj.parent.name.includes("空气墙")) {
                return;
            }
            if (obj instanceof Character || obj instanceof mw.Trigger) {
                return;
            }
            if (obj instanceof UIWidget) {
                return;
            }
            if (obj.tag && obj.tag.includes("Ghost")) {
                // 真正造成伤害的权威端
                if (this.isOwner) {
                    // 计算子弹的力会包含方向
                    let force = bullet.worldTransform.getForwardVector().add(this.flyDirIndex).normalized.multiply(this.bulletCfg.force);

                    let dmg = this.property.dmg;
                    // 散弹枪，接入距离衰减公式
                    if (weaponCfg["isDisDamage"]) {
                        const dis = Vector.distance(this.owner.worldTransform.position, obj.worldTransform.position);
                        dmg = dmg * (weaponCfg.range - dis) / weaponCfg.range;
                    }

                    // 爆头伤害
                    if (obj.tag.includes("Head")) {
                        dmg *= this.property.shotHead;
                    }
                    dmg = Math.floor(dmg);
                    // 给自己一个伤害飘字
                    HitDamage.show(trigger.worldTransform.position, dmg, obj.tag == "GhostHead" ? EHurtTextType.HeadShot : EHurtTextType.Normal);
                    Event.dispatchToLocal("HitMonster", this.owner.player.playerId, obj.gameObjectId, Math.floor(dmg), obj.tag, "hotHit", force, trigger.worldTransform.position);
                }
                MusicMgr.instance.play(bulletCfg.hitSound, bullet.worldTransform.position);

                // 播个击中特效
                const effRot = this.getImpactPoint(trigger.worldTransform.position).toRotation().add(this.hitEffRotOff);
                const effPos = bullet.worldTransform.position;
                EffectMgrIns.playEff("86367", effPos, {
                    recycleTime: 1,
                    rot: effRot,
                    scale: this.hitGhostEffScale,
                    color: LinearColor.colorHexToLinearColor("00B05AFF"),
                });
                this.recycleBullet(bullet, bulletCfg, false);
            } else {
                this.recycleBullet(bullet, bulletCfg, this.isOwner, this.getImpactPoint(trigger.worldTransform.position).toRotation());
            }
        });
    }

    /** 打中鬼的特效缩放 */
    private readonly hitGhostEffScale: Vector = new Vector(0.5, 0.5, 0.5);

    /** 获取打击点法线 */
    private getImpactPoint(endPos: Vector): Vector {
        if (!this.owner || !this.owner.worldTransform) { return Vector.zero; }
        let startPos = this.owner.worldTransform.position;
        // 延长一些
        let rotVec = endPos.clone().subtract(startPos).normalized.multiply(1e3);
        endPos = endPos.add(rotVec);
        let hitRes = QueryUtil.lineTrace(startPos, endPos, true);
        for (const res of hitRes) {
            if (res.gameObject && res.gameObject != this.owner && !(res.gameObject instanceof Trigger)) {
                return res.impactNormal;
            }
        }
        return Vector.zero;
    }

    /** 回收位置 */
    private readonly farLoc = new Vector(0, 0, -1e9);

    private readonly hitEffRotOff: Rotation = new Rotation(0, -90, 0);

    /**
     * 回收子弹
     * @param bullet 子弹
     * @param bulletCfg 子弹配置
     * @param needEff 是否需要播放击打特效 打中鬼的时候不需要播放这个特效
     * @param effRot 击中时特效的相对旋转 needEff为true时传这个才有用
     */
    private recycleBullet(bullet: mw.GameObject, bulletCfg: IBulletElement, needEff: boolean, effRot?: Rotation) {
        CommonUtils.disableEffFromHost(bullet);
        needEff && EffectService.playAtPosition(bulletCfg.hitEffect, bullet.worldTransform.position, {
            duration: 0.35,
            rotation: effRot.add(this.hitEffRotOff),
            scale: bulletCfg.effectZoom,
            loopCount: 1
        });
        GameObjPool.despawn(bullet);
        bullet.setVisibility(PropertyStatus.Off);
        let trigger = bullet.getChildren()[0] as mw.Trigger;
        trigger.enabled = false;
        bullet.worldTransform.position = this.farLoc.clone();
    }

    /** 球形检测半径 */
    private readonly CheckRadius: number = 1e3;

    /** 检擦夹角 */
    private readonly CheckAngle: number = 50;

    /** 检查吸附的时间 */
    private readonly CheckAttachTime: number = 0.3;

    /** 是否需要检测吸附 */
    private needCheckAttach: boolean = false;

    /** 是否需要吸附 */
    public set attachEnable(isTrue: boolean) {
        this.needCheckAttach = isTrue;
        if (!isTrue) { this.lookTween && this.lookTween.isPlaying() && this.lookTween.stop(); }
    }

    /** 检测吸附的时间 */
    private checkAttachTime: number = this.CheckAttachTime;

    public onUpdate(dt: number) {
        // if (!this.needCheckAttach) { return; }
        // if (!this.isEquip || this.owner != Player.localPlayer.character) { return; }
        // this.checkAttachTime -= dt;
        // if (this.checkAttachTime <= 0) {
        //     this.checkAttach();
        //     this.checkAttachTime = this.CheckAttachTime;
        // }
    }

    /**
     * 吸附
     * @returns 
     */
    public checkAttach() {
        return;
        if (!this.needCheckAttach) { return; }
        const cameraTrans = Camera.currentCamera.worldTransform.clone();
        const startPos = cameraTrans.position.add(cameraTrans.getForwardVector().multiply(this.CheckRadius));
        const hitRes = QueryUtil.sphereOverlap(startPos, this.CheckRadius);
        let targetInfo: AttachTargetInfo;
        hitRes.forEach(v => {
            if (v.tag.includes("GhostHead") && !v["isBoss"]) {
                const objTrans = v.worldTransform;
                const betweenDis = Vector.distance(objTrans.position, cameraTrans.position);
                const dirVec = objTrans.position.subtract(cameraTrans.position);
                let angle = Vector.angle3D(cameraTrans.getForwardVector(), dirVec);
                if (angle > 90) {
                    angle = 180 - angle;
                }
                // 在摄像机视野外的过滤掉 且 没被挡住
                if (angle > 0 && angle <= this.CheckAngle && this.lineTrace(cameraTrans.position, objTrans.position, v)) {
                    if (angle > 0 && angle <= this.CheckAngle) {
                        if (targetInfo) {
                            if (targetInfo.dis > betweenDis) {
                                targetInfo = { obj: v, dis: betweenDis }
                            }
                        } else {
                            targetInfo = { obj: v, dis: betweenDis }
                        }
                    }
                }
            }
        })
        if (targetInfo) { this.lookTarget(targetInfo); }
    }

    private lookTween: Tween<any>;

    private lockCamera: Camera;

    /** 锁头偏移 */
    private readonly lockOffset: Vector = new Vector(0, 0, 30);

    private lookTarget(info: AttachTargetInfo) {
        this.attachEnable = false;
        this.lockCamera = Camera.currentCamera;
        this.lookTween && this.lookTween.isPlaying() && this.lookTween.stop();
        let startVec = this.lockCamera.worldTransform.position.add(this.lockCamera.worldTransform.getForwardVector().multiply(info.dis * 8));
        UIService.getUI(HotWeaponPanel).playAimAni();
        this.lookTween = new Tween({ data: startVec.clone() })
            .to({ data: info.obj.worldTransform.position.clone().subtract(this.lockOffset) }, 100)
            .onUpdate((trans) => { this.lockCamera.lookAt(trans.data); })
            // .easing(TweenUtil.Easing.Cubic.In)
            // .onComplete(() => { this.attachEnable = true; })
            .start()
    }

    /**
     * 射线检测找一个不被遮挡的物体
     * @param startPos 起点
     * @param endPos 终点
     * @param targetObj 目标物体
     * @returns 是否找到
     */
    private lineTrace(startPos: Vector, endPos: Vector, targetObj: GameObject) {
        if (!endPos) { return false; }
        let hitRes = QueryUtil.lineTrace(startPos, endPos, true, false)
        /** 遍历射线列表，过滤掉自己和触发器，如果遇到非obj其他模型就break */
        for (const res of hitRes) {
            if (res.gameObject) {
                if (res.gameObject instanceof Trigger) { continue; }
                if (res.gameObject instanceof Character && (res.gameObject as Character) === Player.localPlayer.character) { continue; }
                if (res.gameObject.tag.includes("Ghost")) { return true; }
                else { return false; }
            }
        }
        return false
    }
}

type AttachTargetInfo = {

    /** 目标对象 */
    obj: GameObject;
    /** 和摄像机的距离 */
    dis: number;
}