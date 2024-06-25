/*
 * @Author       : dal
 * @Date         : 2023-11-26 14:22:50
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-13 14:21:07
 * @FilePath     : \1004_graveyard\JavaScripts\codes\modules\player\PlayerModuleC.ts
 * @Description  : 
 */
import { ModifiedCameraSystem, } from '../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import { P_Blood } from '../../ui/P_Blood';
import MusicMgr from '../../utils/MusicMgr';
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import { GhostEvents } from '../ghost/GhostDefine';
import { KillUI } from '../ghost/ui/KillUI';
import { InterEvtNameDef } from '../inter/ObjInterDefine';
import { ProcedureModuleC } from '../procedure/ProcedureModuleC';
import { DeathPanel } from '../procedure/ui/DeathPanel';
import { LosePanel } from '../procedure/ui/LosePanel';
import PlayerData, { INIT_HP_NUM, INIT_LIFE_NUM } from './PlayerData';
import { PlayerModuleS } from "./PlayerModuleS";
import HpHud from './ui/HpHud';
import RegionTips from '../../ui/RegionTips';
import { GhostModuleC } from '../ghost/GhostModuleC';
import { EquipDefine } from '../equip/EquipDefine';
import HandHud from '../idcard/ui/HandHud';
import { ReItemUI } from '../../ui/items/ReItemUI';
import { MainMenuPanel } from '../procedure/ui/MainMenuPanel';
import { RouteDefine } from '../route/RouteDefine';
import UIShop from '../store/ui/UIShop';
import Animation2D_Generate from '../../../ui-generate/ShareUI/Animation2D_generate';
import { GameAnim } from '../../utils/GameAnim';
import BagPanel from '../bag/ui/BagPanel';
import { BuffModuleC } from '../buff/BuffModule';
import StoreModuleC from '../store/StoreModuleC';
import { TimeScriptTrace } from '../time/TimeScript';
import BirthInfoHelper from '../procedure/util/BirthInfoHelper';
import FakerModuleC from '../faker/FakerModuleC';
import FakerScript from '../faker/FakerScript';
import GameStart from '../../GameStart';
import { EGameTheme } from '../../Defines';
import { GhostBossModuleC } from '../ghostBoss/GhostBossModuleC';


export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {

    /** 碰撞体大小 */
    private static readonly COLLISION_CROUCH = new Vector(88, 88, 115);

    /** 是否上一帧在移动 */
    private _preIsMoving: boolean = false;

    /** 发声计时器 */
    private _walkTimer: number = 0;

    /** 发声随机rd */
    private _soundRd: number = undefined;

    /** 发声随机数组 */
    private _soundArr: number[] = [];

    protected onAwake(): void {
        Player.asyncGetLocalPlayer().then((player: Player) => {
            player.character.onDescriptionComplete.add(() => {
                this.refreshHeight();
            })
        })
        setInterval(() => {
            this.refreshHeight();
        }, 60000)

        Event.addLocalListener("PlayButtonClick", (name: string) => {
            if (name.includes("screen")) return
            MusicMgr.instance.play(1002);
        })
        Event.addLocalListener("EnterRegion", (guid: string, showTime: string, mapKey: string, tipsKey: string) => { UIService.getUI(RegionTips).show(showTime, mapKey, tipsKey); })

        RouteDefine.onFearCoinChangeAction.add((money: number, delta: number) => {
            if (delta < 0) return
            let shop = UIService.getUI(UIShop);
            if (shop.visible) return
            let animationUI = UIService.getUI(Animation2D_Generate)
            GameAnim.flySequence(5, animationUI.start, UIService.getUI(BagPanel).btn_openbag, "303467", new Vector2(50, 50))
        })

        InputUtil.onKeyDown(Keys.F, () => {
            const cha = Player.localPlayer.character;
            cha.switchToFlying();
        });

        InputUtil.onKeyDown(Keys.R, () => {
            const cha = Player.localPlayer.character;
            cha.switchToWalking();
        });
    }

    protected onStart(): void {
        Player.asyncGetLocalPlayer().then(async player => {
            await player.character.asyncReady();
            //player.character.collisionWithOtherCharacterEnabled = false;
            if (SystemUtil.isPIE) {
                player.character.displayName = "PIEName" + MathUtil.randomInt(0, 99999999)
            }
            else {
                player.character.displayName = AccountService.getNickName();
            }

            setTimeout(() => {
                GhostTraceHelper.playerGoTrace(player.character.worldTransform.position.clone());
                const inter = setInterval(() => {
                    if (!player.character || !player.character.worldTransform) {
                        clearInterval(inter);
                        return;
                    }
                    GhostTraceHelper.playerGoTrace(player.character.worldTransform.position.clone());
                }, 10000)
            }, (10 - TimeUtil.elapsedTime() % 10) * 1000);
        })

        DataCenterC.ready().then(() => { this.data.lifeAction.add(this.onLifeChangeCall.bind(this)); });

        DataCenterC.ready().then(() => { this.data.hpAction.add(this.onHpChangeCall.bind(this)); });

        this._soundArr = GameConfig.Global.WalkSound.numberList[0].slice();
        if (this._soundArr.length == 1) {
            this._soundArr.push(this._soundArr[0]);
        }
        UIService.getUI(P_Blood);
    }


    /** 复活次数改变的回调 */
    private onLifeChangeCall(lifeNum: number) {
        UIService.hide(LosePanel);
        UIService.getUI(MainUI).setLifeNum(this.deathTimes);
        ModuleService.getModule(StoreModuleC).closeStore();

        if (lifeNum <= 0) {
            // 清除玩家身上的存档buff
            ModuleService.getModule(BuffModuleC).clearAllArchiveBuff();

            UIService.show(LosePanel);
            if (GameConfig.Global.RevivePos.vector) {
                Player.localPlayer.character.worldTransform.position = new Vector(this.birthPos.x, this.birthPos.y, this.birthPos.z);
                Player.localPlayer.character.worldTransform.rotation = this.birthRot;
            }

            UIService.show(ReItemUI, (res: boolean, guid: string) => {
                if (res) {
                    this.server.net_relife(guid);
                    UIService.show(MainUI);
                    if (this.bossLoc) {
                        Player.localPlayer.character.worldTransform.position = this.bossLoc;
                    }
                    else {
                        this.backToBirthPoint();
                    }

                }
                else {
                    UIService.hide(LosePanel);
                    UIService.show(MainMenuPanel);
                    ModuleService.getModule(ProcedureModuleC).setPlayerLoseState();
                    // 生命消耗完，玩家失败了
                    GhostTraceHelper.uploadMGS("ts_action_open_box", "死亡", { box_id: 5 });
                    TimeScriptTrace.traceEndMoon();
                }
            });
            if (this.bossLoc) {
                ModuleService.getModule(GhostBossModuleC).curCom?.cancelLifeTips();
            }
        } else {
            // 返回出生点
            if (lifeNum != INIT_LIFE_NUM) {
                this.backToBirthPoint();
                setTimeout(() => { this.setHp(INIT_HP_NUM); }, 1e3);
                GhostTraceHelper.uploadMGS("ts_action_open_box", "死亡", { box_id: 5 });
            }
        }
    }

    public bossLoc: Vector;

    /** 生命值改变的回调 */
    private async onHpChangeCall(hpNum: number) {

        let preHpNum = UIService.getUI(HpHud).bloodVolume.currentValue;
        if (preHpNum > hpNum) { GhostTraceHelper.uploadMGS("ts_action_open_box", "box_id", { box_id: 7 }); }
        UIService.getUI(HpHud).updateBloodVolume(hpNum);
        ModuleService.getModule(StoreModuleC).closeStore()
        if (hpNum <= 0) {
            let bossMoc = ModuleService.getModule(GhostBossModuleC);
            if (bossMoc.isInBattle) {
                GhostTraceHelper.uploadMGS("ts_game_over", "玩家在boss战区域内死亡上发", {
                    round_id: 1008615
                })
                this.bossLoc = this.localPlayer.character.worldTransform.position;
            }
            else {
                this.bossLoc = null
            }
            let ghostmoc = ModuleService.getModule(GhostModuleC);
            ghostmoc.playKillAni();
            if (ghostmoc.isKilling) {
                await new Promise((resolve) => {
                    const intervalid = setInterval(() => {
                        if (ghostmoc.isKilling) {
                            return;
                        }
                        clearInterval(intervalid)
                        resolve(0)
                    }, 200)
                })
            }
            this.reduceLife(true);
        }
    }

    /**获取玩家当前等级 */
    public async getPlayerLevel() {
        return this.server.net_getPlayerLevel(this.localPlayer.userId)
    }

    /** 复活点 */
    private _birthPos: Vector = BirthInfoHelper.instance.birthPos;
    birthRot: Rotation = BirthInfoHelper.instance.birthRot;

    /** 复活点 */
    public get birthPos(): Vector {
        return this._birthPos;
    }

    /** 复活点 */
    public set birthPos(pos: Vector) {
        this._birthPos = pos;
    }

    /** 回到出生点 */
    public backToBirthPoint() {
        // 存进去的东西vector会变成map所以拿出来需要重新new才行
        Player.localPlayer.character.worldTransform.position = new Vector(this.birthPos.x, this.birthPos.y, this.birthPos.z);
        const rot = this.birthRot;
        this.localPlayer.character.worldTransform.rotation = new Rotation(0, 0, rot.z);
        Player.setControllerRotation(this.birthRot);
    }

    /** 回到出生点 */
    public backToDoorPos(pos: Vector) {
        Player.localPlayer.character.worldTransform.position = pos;
        const rot = this.birthRot;
        this.localPlayer.character.worldTransform.rotation = new Rotation(0, 0, rot.z);
        Player.setControllerRotation(new Rotation(0, -20, rot.z));
    }

    /** 直接设置玩家生命值为某一个值 */
    public setHp(hpNum: number) {
        this.server.net_setHp(this.localPlayer.userId, hpNum);
    }

    /** 是否是健康的 */
    public isHealthy() {
        return this.data.hp >= INIT_HP_NUM;
    }

    public checkCanAddFullHp(deltaHp: number) {
        return this.data.hp + deltaHp >= INIT_HP_NUM;
    }

    /** 根据当前生命值增加或改变一个值  */
    public changeHp(deltaNum: number) {
        if (this.data.hp <= 0) {
            return;
        }
        if (deltaNum > 0) { deltaNum *= BuffModuleC.attr.reviveEff; }
        this.server.net_changeHp(this.localPlayer.userId, deltaNum);
    }

    /** 减少一条生命 */
    public reduceLife(isdeath: boolean = false) {
        if (this.data.life <= 0) { return; }
        if (this.data.life >= 1) { UIService.getUI(DeathPanel).playScaleAni(); }
        // 取消掉手里的装备
        EquipDefine.EquipItem(null);
        // 更新复活点
        if (GameConfig.Global.RevivePos.vector) {
            Player.localPlayer.character.worldTransform.position = new Vector(this.birthPos.x, this.birthPos.y, this.birthPos.z);
            Player.localPlayer.character.worldTransform.rotation = this.birthRot;
        }
        isdeath ? this.server.net_killLife(this.localPlayerId) : this.server.net_reduceLife(this.localPlayerId);
    }
    /** 死亡次数 */
    public get deathTimes() {
        return INIT_LIFE_NUM - this.data.life;
    }

    /** 初始化生命 */
    public initLife() {
        const degreeCfg = GameConfig.Difficulty.getElement(ModuleService.getModule(ProcedureModuleC).myScript.degree);
        this.server.net_initLife(this.localPlayerId, degreeCfg.lifeNum);
    }

    /** 是否监听第一次移动 */
    private isListenMove: boolean = false;

    /** 是否监听第一次改变镜头 */
    private isListenCameraRot: boolean = false;

    /** 初始玩家位置 */
    private moveBirthPos: Vector;

    /** 初始化摄像机旋转 */
    private cameraBirthRot: Rotation;

    /**
     * 监听并发送每局游戏第一次移动和第一次改变视角的埋点
     */
    public setMGSListener() {
        this.isListenMove = true;
        this.isListenCameraRot = true;
        this.moveBirthPos = this.localPlayer.character.worldTransform.position;
        this.cameraBirthRot = Camera.currentCamera.worldTransform.rotation;
    }

    /**
     * 设置玩家的生命数
     * @param lifeNum 生命数
     */
    public async setLife() {
        this.server.net_setLife(this.localPlayer.userId);
    }

    /** 蹲下计数器 */
    private _crouchCount: number = 0;

    /** 之前的蹲下在脏标记数目 */
    private _preCrouchCount: number = 0;

    protected async onEnterScene(sceneType: number) {
        let player = await Player.asyncGetLocalPlayer();
        await player.character.asyncReady();
        let char = player.character;

        Event.addLocalListener(InterEvtNameDef.evt_changeLoc, (targetGuid: string, locStr: string, rotStr: string) => {
            let locarr = locStr.split("|");
            let loc = new Vector(Number(locarr[0]), Number(locarr[1]), Number(locarr[2]));
            if (rotStr) {
                let rot = new Rotation(0, 0, Number(rotStr));
                char.worldTransform.rotation = rot;
                ModifiedCameraSystem.setOverrideCameraRotation(rot);
                setTimeout(() => { ModifiedCameraSystem.resetOverrideCameraRotation(); }, 20);

            }
            char.worldTransform.position = loc;
            GhostTraceHelper.interTrace(0, 0, targetGuid);
        });
        Event.addLocalListener("evt_changeCrouch", (targetGuid: string, isCrouch: string) => {
            if (isCrouch.includes("true")) {
                this._crouchCount++;
                GhostTraceHelper.interTrace(1, 1, targetGuid);
            }
            else {
                this._crouchCount--;
                GhostTraceHelper.interTrace(1, 0, targetGuid);
            }
        })
        Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
            this._crouchCount = 0;
            this._preCrouchCount = 0;
            char.crouch(false);
        })
        setInterval(() => {
            if (this._crouchCount == this._preCrouchCount) {
                return;
            }
            console.log("crouchCountChanged" + this._crouchCount)
            this._preCrouchCount = this._crouchCount;
            const isCrouch = this._crouchCount != 0
            char.crouch(isCrouch);
            char.capsuleCorrectionEnabled = !isCrouch;
            isCrouch && char.setCollisionShapeAndExtent(CustomShapeType.VerticalCapsule, PlayerModuleC.COLLISION_CROUCH.clone());
            // this.server.net_setCollision(isCrouch);
            console.log("setOtherPlayerCollision", isCrouch);
        }, 100)

        console.log("changeHeight3")

        Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
            player.character.asyncReady().then(() => {
                this.refreshHeight();
            })
            ModuleService.getModule(GhostBossModuleC).reqSyncData();
        })

        mw.RoomService.registerMGSChatMessageEvent((msg) => {
            Event.dispatchToLocal("Bubble_scMsg", msg)
            Event.dispatchToLocal("evt_sendDanmaku", msg);
        })


        setTimeout(() => {
            this.server.net_setCharName(SystemUtil.isPIE ? AccountService.getUserId() : AccountService.getNickName());
        }, 2000);
        Player.getAllPlayers().forEach(player => {
            if (!player.character || !player.character.overheadUI) {
                return;
            }
            player.character.overheadUI.occlusionEnable = true;
            try {
                const txt = player.character.overheadUI["getUI"]().findChildByPath("Background/Content") as mw.TextBlock;
                txt.fontColor = LinearColor.white;
            } catch (error) {

            }
        });
        Player.onPlayerJoin.add(async (player) => {
            if (!player.character) {
                return;
            }
            await player.character.asyncReady();
            if (!player.character.overheadUI) {
                return;
            }
            player.character.overheadUI.occlusionEnable = true;
            try {
                const txt = player.character.overheadUI["getUI"]().findChildByPath("Background/Content") as mw.TextBlock;
                txt.fontColor = LinearColor.white;
            } catch (error) {

            }
        })
    }

    /** 
     * 站起
     */
    public clearCrouch() {
        this._crouchCount = 0;
    }

    private _changeTime: boolean = false;

    /** 缓存角色形象数据 */
    public get cacheApp(): CharacterDescription {
        let cache = Player.localPlayer.character.getDescription();
        return cache;
    }

    private _cacheApp: CharacterDescription;

    /**
     * 刷新玩家的身高
     */
    public async refreshHeight(needSync: boolean = true) {
        if (this._changeTime) {
            this._changeTime = false;
            return;
        }
        this._changeTime = true;
        Player.localPlayer.character.addMovement(Vector.forward);
        let apperance = Player.localPlayer.character.getDescription();
        let height = apperance.advance.bodyFeatures.body.height
        if (height > GameConfig.Global.MaxHeight.number || height < GameConfig.Global.MinHeight.number) {
            console.log("玩家当前身高为第一次======", apperance.advance.bodyFeatures.body.height)
            apperance.advance.bodyFeatures.body.height = GameConfig.Global.MaxHeight.number - 0.01;
            console.log("切换成功后的身高为第二次====", apperance.advance.bodyFeatures.body.height);
            console.log("changeHeight2")
        }
        if (apperance.advance.bodyFeatures.feet.feetOverallScale > 1) {
            apperance.advance.bodyFeatures.feet.feetOverallScale = 1;
        }
        if (apperance.advance.bodyFeatures.legs.thighVerticalScale > 1) {
            apperance.advance.bodyFeatures.legs.thighVerticalScale = 1;
        }
        if (apperance.advance.bodyFeatures.breast.breastOverallScale > 1) {
            apperance.advance.bodyFeatures.breast.breastOverallScale = 1;
        }
        if (apperance.advance.bodyFeatures.chest.chestVerticalScale > 1) {
            apperance.advance.bodyFeatures.chest.chestVerticalScale = 1;
        }
        if (apperance.advance.bodyFeatures.neck.neckVerticalScale > 1) {
            apperance.advance.bodyFeatures.neck.neckVerticalScale = 1;
        }
        if (apperance.advance.headFeatures.head.headOverallScale > 1) {
            apperance.advance.headFeatures.head.headOverallScale = 1;
        }
        if (apperance.advance.bodyFeatures.waist.waistFrontalScale > 1) {
            apperance.advance.bodyFeatures.waist.waistFrontalScale = 1;
        }
        if (apperance.advance.bodyFeatures.waist.waistHorizontalScale > 1) {
            apperance.advance.bodyFeatures.waist.waistHorizontalScale = 1;
        }
        if (apperance.advance.bodyFeatures.waist.waistVerticalScale > 1) {
            apperance.advance.bodyFeatures.waist.waistVerticalScale = 1;
        }

        Player.localPlayer.character.setDescription(apperance);
        needSync && Player.localPlayer.character.syncDescription();
        await Player.localPlayer.character.asyncReady();
        console.log("changeHeight1")
        console.log("成功之后身高为====", apperance.advance.bodyFeatures.body.height);
        console.log("成功切换身高====");
    }

    /**
     * 是否戴上假发
     * @param isThirdPerson 是否戴上假发
     */
    public changeHeadFair(isThirdPerson: boolean) {
        if (isThirdPerson) {
            this._cacheApp && Player.localPlayer.character.setDescription(this._cacheApp);
        }
        else {
            if (GameStart.GameTheme == EGameTheme.Hall) {
                return;
            }
            this.refreshHeight(false);
        }
    }

    private listerMove() {
        if (!this.isListenMove) { return; }
        if (Vector.squaredDistance(this.birthPos, Player.localPlayer.character.worldTransform.position) > 1e4) {
            GhostTraceHelper.uploadMGS("ts_action_open_box", "第一次移动", { box_id: -1 });
            this.isListenMove = false;
        }
    }

    private listenCameraRot() {
        if (!this.isListenCameraRot) { return; }
        let cameraRot = Camera.currentCamera.worldTransform.rotation;
        const rotNum = 10;
        if (Math.abs(this.cameraBirthRot.x - cameraRot.x) > rotNum || Math.abs(this.cameraBirthRot.y - cameraRot.y) > rotNum || Math.abs(this.cameraBirthRot.z - cameraRot.z) > rotNum) {
            GhostTraceHelper.uploadMGS("ts_action_open_box", "第一次旋转视角", { box_id: -2 });
            this.isListenCameraRot = false;
        }
    }

    protected onUpdate(dt: number): void {
        this.listerMove();
        this.listenCameraRot();
        this.playWalkSound();
        if (this._preIsMoving) {
            this._walkTimer += dt;
        }
        if (this._walkTimer >= GameConfig.Global.WalkInterval.number) {
            let rd = MathUtil.randomInt(0, this._soundArr.length);
            let cfgId = this._soundArr[rd];
            this._soundArr.splice(rd, 1);
            if (this._soundRd != undefined) {
                this._soundArr.push(this._soundRd);
            }
            this._soundRd = cfgId;
            MusicMgr.instance.play(cfgId);
            this._walkTimer = 0;
        }
        this.checkOtherDis(dt);
    }

    /** 60ms帧检测一次 */
    private countDisTime: number = 0.6;

    /** 查看身份卡的距离范围 */
    private readonly ViewIdCardDis: number = 2e2;

    /** 显示了手世界UI按钮的玩家列表 */
    private handViewUserList: string[] = [];

    private checkOtherDis(dt: number) {
        this.countDisTime -= dt;
        if (this.countDisTime <= 0) {
            this.countDisTime = 0.6;
            if (this.localPlayer && this.localPlayer.character) {

                if (this.fakerMap.size > 0) {
                    this.fakerMap.forEach(async (v) => {
                        // 有可能还没有character
                        if (!v || v.isDestroyed) { return; }

                        let thisDis = Vector.distance(v.worldTransform.position, this.localPlayer.character.worldTransform.position);
                        if (this.handViewUserList.includes(v.gameObjectId)) {
                            if (thisDis >= this.ViewIdCardDis) {
                                const headUI = v["NewHeadUI"] as UIWidget;
                                headUI.parent = null;
                                this.handViewUserList.splice(this.handViewUserList.indexOf(v.gameObjectId), 1);
                            }
                        } else {
                            if (thisDis < this.ViewIdCardDis) {
                                const headUI = await this.getWorldUIOnPlayerHead();
                                if (!headUI || !headUI.worldTransform) { return; }
                                headUI.parent = v;
                                headUI.worldTransform.position = v.getSlotWorldPosition(HumanoidSlotType.Head);
                                v["NewHeadUI"] = headUI;
                                this.selfDestroy(headUI);
                                const fakerComponent = v.getComponent() as FakerScript;
                                this.handUIMap.get(headUI.gameObjectId).setData(fakerComponent.fakerUserId, true, v.gameObjectId);
                                this.handViewUserList.push(v.gameObjectId);
                            }
                        }
                    })
                }

                if (Player.getAllPlayers().length > 1) {
                    Player.getAllPlayers().forEach(async (v) => {

                        // 有可能还没有character
                        if (!v.character) { return; }

                        if (v != this.localPlayer) {
                            let thisDis = Vector.distance(v.character.worldTransform.position, this.localPlayer.character.worldTransform.position);
                            if (this.handViewUserList.includes(v.userId)) {
                                if (thisDis >= this.ViewIdCardDis || !v.character.getVisibility()) {
                                    const headUI = v["NewHeadUI"] as UIWidget;
                                    headUI.parent = null;
                                    this.handViewUserList.splice(this.handViewUserList.indexOf(v.userId), 1);
                                }
                            } else {
                                if (thisDis < this.ViewIdCardDis && !v["finishGuide"] && v.character.getVisibility()) { //加个标记 引导时屏蔽IDCard
                                    const headUI = await this.getWorldUIOnPlayerHead();
                                    headUI.parent = v.character;
                                    headUI.worldTransform.position = v.character.getSlotWorldPosition(HumanoidSlotType.Head);
                                    v["NewHeadUI"] = headUI;
                                    this.selfDestroy(headUI);
                                    this.handUIMap.get(headUI.gameObjectId).setData(v.userId);
                                    this.handViewUserList.push(v.userId);
                                }
                            }
                        }
                    });
                }

            }

        }
    }

    private get fakerMap() {
        return ModuleService.getModule(FakerModuleC).fakerMap;
    }

    /** 自毁程序 */
    private selfDestroy(headUI: UIWidget) {
        let inter = setInterval(() => {
            if (!headUI.parent) {
                headUI.setVisibility(PropertyStatus.Off);
                this.headUIList.push(headUI);
                headUI["selfDestroy"] = null;
                clearInterval(inter);
            }
        }, 10);
    }

    private headUIList: UIWidget[] = []

    private handUIMap: Map<string, HandHud> = new Map();

    /** 获得一个玩家头顶世界UI */
    private async getWorldUIOnPlayerHead() {
        let headUI: UIWidget = this.headUIList.pop();
        if (!headUI) {
            headUI = await GameObject.asyncSpawn("UIWidget") as UIWidget;
            headUI.selfOcclusion = false;
            headUI.interaction = true;
            headUI.occlusionEnable = false;
            headUI.scaledByDistanceEnable = false;
            headUI.widgetSpace = WidgetSpaceMode.OverheadUI;
            const handUI = UIService.create(HandHud);
            headUI.setTargetUIWidget(handUI.uiWidgetBase);
            this.handUIMap.set(headUI.gameObjectId, handUI);
        }
        headUI.setVisibility(PropertyStatus.On);
        return headUI;
    }

    /**
     * 播放角色行走音效
     */
    private playWalkSound() {
        const char = this.localPlayer.character;
        if (!char || (char.isMoving == null)) { return; }
        const isMoving = char.isMoving && !char.isJumping;
        if (this._preIsMoving == isMoving) {
            return;
        }
        this._preIsMoving = isMoving;

        if (isMoving) {
            this._walkTimer = GameConfig.Global.WalkInterval.number;
        }
    }

    /** 
     * 设置其他玩家的碰撞体(防止抖动)
     */
    public async net_setOtherPlayerCollision(playerId: number, isCrouch: boolean) {
        const player = Player.getPlayer(playerId);
        if (!player || !player.character) return;
        await player.character.asyncReady();
        player.character.capsuleCorrectionEnabled = !isCrouch;
        isCrouch && player.character.setCollisionShapeAndExtent(CustomShapeType.VerticalCapsule, PlayerModuleC.COLLISION_CROUCH.clone());
    }

    private _isKilling: boolean = false;

    public get isKilling(): boolean {
        return this._isKilling;
    }

    /**
     * 杀死玩家
     * @param delay 延迟
     * @param callback 回调
     */
    public killPlayer(delay: number, callback: () => void) {
        if (this._isKilling) {
            return;
        }
        this.server.net_setKillCd(delay);
        UIService.hide(MainUI);
        this._isKilling = true;
        this.localPlayer.character.movementEnabled = false;
        this.localPlayer.character.jumpEnabled = false;
        setTimeout(() => {
            // 有复活次数的时候才能复活
            if (DataCenterC.getData(PlayerData).life > 1) {
                UIService.getUI(DeathPanel).playOpenAni(() => {
                    UIService.show(MainUI);
                    UIService.hide(KillUI);

                    this.localPlayer.character.movementEnabled = true;
                    this.localPlayer.character.jumpEnabled = true;
                    setTimeout(() => {
                        callback && callback();
                        Event.dispatchToLocal(GhostEvents.CatchPlayer, this.localPlayerId);
                        this._isKilling = false;
                    }, 1000);
                });
            }
            // 最后一条命的时候被干死了
            else {
                callback && callback();
                this.localPlayer.character.movementEnabled = true;
                this.localPlayer.character.jumpEnabled = true;
                Event.dispatchToLocal(GhostEvents.CatchPlayer, this.localPlayerId);
                setTimeout(() => {
                    UIService.hide(KillUI);
                    this._isKilling = false;
                }, 1000);
            }
            console.log("完成了击杀动画演示")
        }, delay * 1000);
    }

    net_playEffect(playerId: number, effectGuid: string) {
        const player = Player.getPlayer(playerId);
        if (!player || !player.character) {
            return;
        }
        EffectService.playAtPosition(effectGuid, player.character.getSlotWorldPosition(HumanoidSlotType.Root));
    }
}
