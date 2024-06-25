import { IAlternateElement } from "../../../config/Alternate";
import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import GameStart from "../../GameStart";
import { PlayerManagerExtension } from "../../Modified027Editor/ModifiedPlayer";
import { MainUI } from "../../ui/MainUI";
import SetUI from "../../ui/SetUI";
import { WaitLoop } from "../../utils/AsyncTool";
import { CommonUtils } from "../../utils/CommonUtils";
import MusicMgr from "../../utils/MusicMgr";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { UtilEx } from "../../utils/UtilEx";
import { BagItemData } from "../bag/BagDefine";
import { EquipDefine } from "../equip/EquipDefine";
import { EquipModuleC } from "../equip/EquipModuleC";
import CameraPanel from "../equip/ui/UICamera";
import WeaponUpgradePanel from "../equip/ui/WeaponUpgradePanel";
import { GhostModuleC } from "../ghost/GhostModuleC";
import { GhostModuleS } from "../ghost/GhostModuleS";
import { KillUI } from "../ghost/ui/KillUI";
import NewGhostGraphPanel from "../graph/ui/NewGraphPanel";
import { PlayerInterModuleC, PlayerInterModuleS } from "../inter/PlayerInterModule";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { NotebookPanel } from "../procedure/ui/NotebookPanel";
import { RecordDefine } from "../record/RecordDefine";
import StoreModuleC from "../store/StoreModuleC";
import CageScript from "./CageScript";
import FakerModuleC from "./FakerModuleC";
import FakerModuleS from "./FakerModuleS";
import { AttackState, DecryptState, DazeState, EFakerState, ObserveState, FakerState } from "./FakerState";
import { UIFakerKill } from "./ui/UIFakerKill";

@Component
export default class FakerScript extends Script {
    private _machine: UtilEx.StateMachine<EFakerState>;

    public faker: Character;

    /**配置数据 */
    private _cfg: IAlternateElement;

    /**攻击的目标玩家 */
    public attackTarget: Player;

    /**玩家当前位置缓存 */
    private _targetPos: Vector;

    /**锁定后的等待攻击时间 在这个时间内被玩家发现就会停止攻击 */
    private _attackTimer: any;
    /**模仿的玩家id */
    @mw.Property({ replicated: true })
    public copyPlayerId: number;

    /**模仿的玩家userId */
    @mw.Property({ replicated: true })
    public fakerUserId: string;
    /**怪物外观的索引 */
    @mw.Property({ replicated: true })
    public appearanceIndex: number = 0;
    /**被报警发现 */
    @mw.Property({ replicated: true, onChanged: "onBeFindChange" })
    public beFind: boolean = false;
    /**警戒消除计时器 */
    public findTimer = 0;
    /**当前播放的动画 */
    public curAni: mw.Animation;

    private jumpTime: number = 0;
    /**是否正在被清除 */
    public isBeCleaning: boolean = false;

    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            this.gameObject.tag = "Faker";
            this._cfg = GameConfig.Alternate.getElement(1);
            SystemUtil.isClient() ? this.initClient() : this.initServer()
        })
    }

    private fakerJump() {
        this.jumpTime = MathUtil.randomFloat(5, 180);
    }

    /**初始化外观 */
    private async initAppearance() {
        this.appearanceIndex = MathUtil.randomInt(0, this._cfg.monsterAppearance.length)
        //设置伪人外观
        if (Math.random() <= this._cfg.probability) {
            //概率设置伪人畸变
            let appearance = this._cfg.normalAppearance[MathUtil.randomInt(0, this._cfg.normalAppearance.length)]
            this.faker.setDescription([appearance]);
        }

        let player = ModuleService.getModule(FakerModuleS).getReadyPlayer();
        this.copyPlayerId = player.playerId;
        this.fakerUserId = player.userId;
        this.faker.loadStance(player.character.currentStance.assetId).play();//设置伪人基础姿态
        this.faker.displayName = player.character.displayName;
        await player.character.asyncReady();
        this.copyPlayerBody(player);
        this.copyPlayerDress(player)
    }

    /**复制玩家体型 */
    private copyPlayerBody(player: mw.Player) {
        Object.entries(player.character.description.advance.bodyFeatures.arms).forEach(value => {
            this.faker.description.advance.bodyFeatures.arms[value[0]] = value[1]
        })
        Object.entries(player.character.description.advance.bodyFeatures.body).forEach(value => {
            this.faker.description.advance.bodyFeatures.body[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.breast).forEach(value => {
            this.faker.description.advance.bodyFeatures.breast[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.chest).forEach(value => {
            this.faker.description.advance.bodyFeatures.chest[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.feet).forEach(value => {
            this.faker.description.advance.bodyFeatures.chest[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.hands).forEach(value => {
            this.faker.description.advance.bodyFeatures.hands[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.hips).forEach(value => {
            this.faker.description.advance.bodyFeatures.hips[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.legs).forEach(value => {
            this.faker.description.advance.bodyFeatures.legs[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.neck).forEach(value => {
            this.faker.description.advance.bodyFeatures.neck[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.ribs).forEach(value => {
            this.faker.description.advance.bodyFeatures.ribs[value[0]] = value[1]
        })

        Object.entries(player.character.description.advance.bodyFeatures.waist).forEach(value => {
            this.faker.description.advance.bodyFeatures.waist[value[0]] = value[1]
        })
    }

    /**复制玩家装扮 */
    private copyPlayerDress(player: mw.Player) {
        //装扮
        this.faker.description.advance.clothing.upperCloth.style = player.character.description.advance.clothing.upperCloth.style
        for (let i = 0; i < player.character.description.advance.clothing.upperCloth.part.length; ++i) {
            this.faker.description.advance.clothing.upperCloth.part[i].color.areaColor = player.character.description.advance.clothing.upperCloth.part[i].color.areaColor
        }
        this.faker.description.advance.clothing.gloves.style = player.character.description.advance.clothing.gloves.style
        for (let i = 0; i < player.character.description.advance.clothing.gloves.part.length; ++i) {
            this.faker.description.advance.clothing.gloves.part[i].color.areaColor = player.character.description.advance.clothing.gloves.part[i].color.areaColor
        }
        this.faker.description.advance.clothing.lowerCloth.style = player.character.description.advance.clothing.lowerCloth.style
        for (let i = 0; i < player.character.description.advance.clothing.lowerCloth.part.length; ++i) {
            this.faker.description.advance.clothing.lowerCloth.part[i].color.areaColor = player.character.description.advance.clothing.lowerCloth.part[i].color.areaColor
        }
        this.faker.description.advance.clothing.shoes.style = player.character.description.advance.clothing.shoes.style
        for (let i = 0; i < player.character.description.advance.clothing.shoes.part.length; ++i) {
            this.faker.description.advance.clothing.shoes.part[i].color.areaColor = player.character.description.advance.clothing.shoes.part[i].color.areaColor
        }
        //头发
        let frontColor = player.character.description.advance.hair.frontHair.color.color
        let backColor = player.character.description.advance.hair.backHair.color.color
        this.faker.description.advance.hair.frontHair.style = player.character.description.advance.hair.frontHair.style
        if (frontColor) this.faker.description.advance.hair.frontHair.color.color = frontColor
        this.faker.description.advance.hair.backHair.style = player.character.description.advance.hair.backHair.style
        if (backColor) this.faker.description.advance.hair.backHair.color.color = backColor

    }


    /**初始化客户端 */
    private initClient() {
        this.faker = this.gameObject as mw.Character;
        ModuleService.getModule(FakerModuleC).saveFaker(this.faker);
        this.faker.overheadUI.occlusionEnable = true;
        try {
            const txt = this.faker.overheadUI["getUI"]().findChildByPath("Background/Content") as mw.TextBlock;
            txt.fontColor = LinearColor.white;
        } catch (error) {

        }
        this.useUpdate = true;
    }
    /**初始化服务器 */
    private initServer() {
        this.faker = this.gameObject as mw.Character;
        this.faker.collisionWithOtherCharacterEnabled = GameStart.GameTheme == EGameTheme.Town ? true : false;
        this.initAppearance();
        this.initMachine();
        this.fakerJump();
        this.useUpdate = true;
    }

    /**初始化状态机 */
    private initMachine() {
        this._machine = new UtilEx.StateMachine();
        this._machine.register(EFakerState.Daze, new DazeState(this, EFakerState.Daze));
        this._machine.register(EFakerState.Decrypt, new DecryptState(this, EFakerState.Decrypt));
        this._machine.register(EFakerState.Observe, new ObserveState(this, EFakerState.Observe));
        this._machine.register(EFakerState.Attack, new AttackState(this, EFakerState.Attack));
        // this._machine.register(EFakerState.LockTarget, new LockTargetState(this));
        this.randomState();
    }

    /**根据权重切换状态 */
    public randomState() {
        let index = CommonUtils.weightRandom(this._cfg.stateWeights);
        let state = this._cfg.states[index];
        if (!this.attackTarget) {
            this._machine.switch(this._cfg.states[index]);
        } else {
            let canKill = ModuleService.getModule(GhostModuleS).checkCanKill(this.attackTarget.playerId, false)
            if (state == EFakerState.Attack && !canKill) {//切换攻击状态时发现玩家不能被攻击 就切换到发呆状态
                this._machine.switch(EFakerState.Daze)
            } else {
                this._machine.switch(this._cfg.states[index]);
            }
        }
    }

    public stopCurAni() {
        if (this.curAni) {
            this.curAni.stop();
            this.curAni = null;
        }
        // this.faker.worldTransform.rotation = Rotation.zero;
    }

    /**发呆 */
    public daze() {
        if (this._cfg.dazeAni) {
            this.curAni = PlayerManagerExtension.loadAnimationExtesion(this.faker, this._cfg.dazeAni, true);//伪人发呆
            this.curAni.play()
        }
    }

    /**去解密 */
    public toDecrypt() {
        let trans = this.fakerModuleS.getPoint();
        if (!trans) {//没有解谜点就切到其他状态去
            this.randomState();
            return
        }
        Navigation.navigateTo(this.faker, trans.position, 100,
            () => {
                console.log("Faker====>>>寻路成功！到达解密地点");
                this.faker.worldTransform.rotation = trans.rotation;
                if (this._cfg.decryptAni) {
                    this.curAni = PlayerManagerExtension.loadAnimationExtesion(this.faker, this._cfg.decryptAni, true);//伪人假装解密动画
                    this.curAni.play()
                }
                this.startStateCount()
            },
            () => {
                console.log("Faker====>>>到达解密地点失败！");
                this.randomState()
            })
    }

    private startStateCount() {
        let state = this._machine.getCurStateObj()
        if (state) {
            (state as FakerState).startCountDown = true;
        }
    }

    /**去围观 */
    public toObserve() {
        let targetId = this.findLonelyPlayer()[1];
        if (!targetId) return null;//没找到落单玩家 啥也不干
        let player = Player.getPlayer(targetId);
        if (!this.fakerModuleS.playerIsEnable(player)) return;
        Navigation.navigateTo(this.faker, player.character.worldTransform.position, 50,
            () => {
                console.log("Faker====>>>前往观察地点成功");
                if (this._cfg.observeAni) {
                    this.curAni = PlayerManagerExtension.loadAnimationExtesion(this.faker, this._cfg.observeAni, true);//伪人假装围观动画
                    this.curAni.play()
                }
                this.startStateCount()
            },
            () => {
                console.log("Faker====>>>前往观察地点失败");
                this.randomState()
            })
    }

    /**去偷袭落单玩家 */
    public toAttack() {
        let targetId = this.findLonelyPlayer()[0];
        if (!targetId) return null;//没找到落单玩家 啥也不干
        this.attackTarget = Player.getPlayer(targetId);
    }

    /**绕后背刺 */
    public followTarget(canFollow: boolean) {
        if (!this.fakerModuleS.playerIsEnable(this.attackTarget)) return;
        if (!this._targetPos || !Vector.equals(this._targetPos, this.attackTarget.character.worldTransform.position)) {//玩家位置改变重新寻找绕后点
            this.playerRunAway(this.attackTarget);
            if (!canFollow) {
                return;
            }
            this._targetPos = this.attackTarget.character.worldTransform.position.clone();
            let forward = this.attackTarget.character.worldTransform.getForwardVector().normalized;
            let tempPos = forward.multiply(-1).multiply(this._cfg.flowDistance).add(this.attackTarget.character.worldTransform.position);

            Navigation.navigateTo(this.faker, tempPos, 0,
                () => {
                    if (!this.fakerModuleS.playerIsEnable(this.attackTarget)) return;
                    let lookPos = new Vector(this.attackTarget.character.worldTransform.position.x, this.attackTarget.character.worldTransform.position.y, this.faker.worldTransform.position.z)
                    this.faker.worldTransform.lookAt(lookPos)  //伪人看向玩家
                    //等待计时进入 锁定状态 发动攻击
                    this.prepareToAttack(this.attackTarget);
                    this.startStateCount()
                    this.startFollowColdDown();
                }, () => {
                    console.log("Faker=======>>>绕道玩家背后失败");
                    this.randomState()
                })
        }
    }

    private startFollowColdDown() {
        let state = this._machine.getCurStateObj()
        if (state && state instanceof AttackState) {
            (state as AttackState).followTimer = 5;
        }
    }
    /**玩家是否在安全区 */
    private playerIsInSafeArea(player: mw.Player) {
        let curSafe = ModuleService.getModule(PlayerInterModuleS).getPlayerInterStat(player)
        if (curSafe && ["bed", "cupboard"].includes(curSafe)) {
            return true
        }
        return false
    }

    /**查找落单的玩家 以玩家为中心1000码范围内相邻人数为0视为落单，返回值可能为 null*/
    private findLonelyPlayer(): number[] {
        if (this.fakerModuleS.playerList.length == 0) return [null, null]
        let players = this.fakerModuleS.playerList.filter(p => { return !this.playerIsInSafeArea(p) })//从准备好的玩家中找 过滤掉在安全区的玩家
        if (players.length === 0) {
            this.randomState();
            return [null, null];
        }
        if (!players[0]) return [null, null];
        let aloneId: number = players[0].playerId;//落单玩家id
        let togetherId: number = players[0].playerId;//聚集玩家id
        // return [aloneId, togetherId]
        if (players.length == 1) return [aloneId, togetherId];//只有一个玩家就锁定他
        let resultMap: Map<number, number> = new Map();
        for (let i = 0; i < players.length; ++i) {
            if (!players[i]) continue;
            let count = 0
            let pos1 = players[i].character.worldTransform.position;
            for (let j = 0; j < players.length; ++j) {
                if (i == j) continue;
                let pos2 = players[j].character.worldTransform.position
                if (Vector.squaredDistance(pos1, pos2) <= Math.pow(this._cfg.aloneDistance, 2)) {
                    count++
                }
            }
            resultMap.set(players[i].playerId, count)
        }
        let max = 0;
        resultMap.forEach((count, playerId) => {
            if (count == 0) aloneId = playerId;
            if (count > max) {
                max = count;
                togetherId = playerId;
            }
        })
        return [aloneId, togetherId];
    }

    /**道具清除伪人 */
    @RemoteFunction(Server)
    async cleanFaker(player: Player, location: Vector) {
        this.useUpdate = false;//停止状态机
        //创建一个笼子 飞向伪人上方 
        let cage = await mw.GameObject.asyncSpawn("34E40A794F4F191B932D6E9CDB75DAD7")
        let _cageScript = cage.getComponent(CageScript);
        _cageScript.startCleaningFaker(player, location, this.faker);
        Navigation.stopNavigateTo(this.faker);
        // 保存记录
        Event.dispatchToLocal(RecordDefine.CaptureFaker, player);
    }

    /**
 * 怪物攻击结束 销毁怪物
     */

    @RemoteFunction(Server)
    private async fakerDead(player: Player) {
        console.log("Faker=====>>>销毁伪人");
        clearTimeout(this.destroyTimer);
        if (this.gameObject.isDestroyed || this.faker.isDestroyed) return
        this.useUpdate = false;//停止状态机
        EffectService.playAtPosition("194441", this.faker.worldTransform.position);
        this.fakerModuleS.deleteFaker(this.gameObject.gameObjectId)
        this.gameObject.destroy()
    }

    private destroyTimer: any

    @RemoteFunction(Server)
    private async turnToMonster(player: mw.Player) {
        this.useUpdate = false;  //停止怪物所有的状态机 避免在客户端做表现时服务器状态乱切
        ModuleService.getModule(GhostModuleS).setPlayerCd(this.attackTarget, 10);
        this.killPlayer(player)
        //打个补丁 变身后最多10秒自动销毁
        let p = player
        this.destroyTimer = setTimeout(() => {
            this.fakerDead(p)
        }, 10e3)

    }

    /**设置怪物外观 */

    @RemoteFunction(Client, Multicast)
    public async setMonsterStyle() {
        this.faker.clearDescription();
        this.faker.setDescription([this._cfg.monsterAppearance[this.appearanceIndex]]);
        EffectService.playAtPosition("194441", this.faker.worldTransform.position)
        this.setPhotoTag()
    }

    @RemoteFunction(Client, Multicast)
    private async killPlayer(player: mw.Player) {
        this.setMonsterStyle()
        if (player == Player.localPlayer) {
            ModuleService.getModule(PlayerInterModuleC).reqCancelPlayerInter();
            if (GameStart.GameTheme === EGameTheme.Town) { UIService.hide(WeaponUpgradePanel); }
            Event.dispatchToLocal("evt_fakerAttack");//通知关闭养成ui
            ModuleService.getModule(StoreModuleC).closeStore();//万一前边没关到 这里再关一次
            //隐藏所有UI
            this.hideUI(MainUI)
            this.hideUI(SetUI);
            this.hideUI(CameraPanel);
            this.hideUI(NotebookPanel);
            this.hideUI(NewGhostGraphPanel);
            UIService.show(UIFakerKill, async () => {
                if (Camera.currentCamera.preset != CameraPreset.ThirdPerson) {
                    Camera.currentCamera.preset = CameraPreset.ThirdPerson;//切到第三人称看怪物变身
                    ModuleService.getModule(PlayerModuleC).changeHeadFair(true)
                }
                GhostTraceHelper.uploadMGS("ts_dancefight_chat", "玩家被伪人贴脸时上发", { chat_id: 995 })
                // Tips.show("啊哦！你被伪人抓住了")
                await TimeUtil.delaySecond(1.5)//变身完了 切到第一人称做表现
                Camera.currentCamera.preset = CameraPreset.FirstPerson;
                Camera.currentCamera.lookAt(this.faker.getSlotWorldPosition(HumanoidSlotType.Head));
                PlayerManagerExtension.loadAnimationExtesion(this.faker, "269292", true).play();//伪人表演动画
                await TimeUtil.delaySecond(1)
                PlayerManagerExtension.loadAnimationExtesion(this.attackTarget.character, "86094", true).play();//玩家挨打动画
                await TimeUtil.delaySecond(1)
                ModuleService.getModule(PlayerModuleC).changeHeadFair(false)
                //怪物贴脸杀
                this.attackPerformance(player);
            })
        }
    }

    private hideUI<T extends mw.UIScript>(panelClass: { new(): T }) {
        let ui = UIService.getUI(panelClass)
        if (!ui.visible || ui.uiObject.position.x >= 10000) return;
        UIService.hide(panelClass);
    }

    /**伪人攻击表现 */
    private async attackPerformance(player: mw.Player) {

        let isGirl = this.attackTarget.character.description.advance.base.characterSetting.somatotype % 2 == 0;
        PlayerManagerExtension.loadAnimationExtesion(this.faker, this._cfg.attackAni, true).play();//伪人攻击动画
        let ani = PlayerManagerExtension.loadAnimationExtesion(this.attackTarget.character, "52998", true);//玩家挨打动画
        UIService.show(KillUI);
        MusicMgr.instance.play(104);
        MusicMgr.instance.play(isGirl ? 102 : 103);
        await TimeUtil.delaySecond(2);
        ani.stop();
        this.hideUI(KillUI);
        UIService.show(MainUI);
        //恢复玩家移动
        player.character.setStateEnabled(CharacterStateType.Running, true);
        player.character.setStateEnabled(CharacterStateType.Jumping, true);
        //通知服务期攻击结束 伪人消灭
        ModuleService.getModule(EquipModuleC).resetCamera()
        this.curHandItem && EquipDefine.EquipItem(this.curHandItem.guid);//重新恢复玩家手上的道具
        this.curHandItem = null;
        this.fakerDead(player);
    }

    @RemoteFunction(Server)
    private doSomething() {
        this.randomState();//重新切个状态
    }

    /**被攻击玩家当前手上的道具 */
    private curHandItem: BagItemData = null

    /**
     * 执行攻击逻辑
     */

    @RemoteFunction(Client)
    private async prepareToAttack(player: Player) {
        console.log("Faker======>>>挨打了", player != Player.localPlayer);
        if (player != Player.localPlayer) return;
        clearTimeout(this._attackTimer);
        this.attackTarget = player;
        FakerModuleC.beLocked = true;//被锁定 才开启射线检测
        this._attackTimer = setTimeout(async () => {
            console.log("Faker======>>>进入攻击流程")
            let canKill = await ModuleService.getModule(GhostModuleC).canBeAttack(this.attackTarget);//攻击目标受保护中
            let distance = Vector.distance(this.faker.worldTransform.position, this.attackTarget.character.worldTransform.position);//攻击时判断玩家是否在攻击范围内
            if (!canKill || distance > 270) {
                this.doSomething()
                FakerModuleC.beLocked = false;//被锁定 才开启射线检测
            } else {
                this.turnToMonster(player);
                SoundService.playSound("326834");
                //进入攻击流程 关闭射线检测
                FakerModuleC.beLocked = false;
                this.curHandItem = EquipDefine.curPlayerEquipItem//暂存玩家手上的道具
                EquipDefine.EquipItem(null);//被攻击时取下玩家手上的道具
                //限制玩家移动
                this.attackTarget.character.setStateEnabled(CharacterStateType.Running, false);
                this.attackTarget.character.setStateEnabled(CharacterStateType.Jumping, false);
            }

        }, this._cfg.waitLockTime * 1e3)

    }

    @RemoteFunction(Client, Multicast)
    private setPhotoTag() {
        this.gameObject["photoTag"] = this._cfg.atlasKey[this.appearanceIndex];
    }

    @RemoteFunction(Client)
    private playerRunAway(player: Player) {
        if (player != Player.localPlayer) return;
        clearTimeout(this._attackTimer);
    }

    /**绕后被发现 */
    @RemoteFunction(Server)
    private beFoundServer(player: Player) {
        if (player != this.attackTarget) return;//再次验证扫描对象 只有被当前攻击目标发现才进入发呆状态
        console.log("Faker=====>>>>伪人被发现")
        this._machine.switch(EFakerState.Daze);//被玩家发现就切换到发呆状态
    }

    public beFoundClient() {
        if (this.attackTarget != Player.localPlayer || !FakerModuleC.beLocked) return;//被其他人扫到
        FakerModuleC.beLocked = false;//被扫描到 关闭射线检测
        clearTimeout(this._attackTimer);//清除攻击定时器
        this.beFoundServer(Player.localPlayer);//通知服务器 被玩家扫描到
    }


    /**被道具清除 */
    public beCleaning(location: Vector) {
        console.log("Faker====>>>被攻击");
        if (this.isBeCleaning) return;
        this.isBeCleaning = true;
        this.cleanFaker(Player.localPlayer, location)
    }

    protected onUpdate(dt: number): void {
        if (SystemUtil.isServer()) {
            this._machine?.update(dt);
            if (this.jumpTime > 0) {
                this.jumpTime -= dt;
                if (this.jumpTime <= 0) {
                    if (this._machine.getState() != EFakerState.Attack) this.faker.changeState(mw.CharacterStateType.Jumping);//非攻击状态下才跳
                    this.fakerJump()
                }
            }
            this.onFindUpdate(dt);
        }
    }

    protected onDestroy(): void {
    }

    get fakerModuleS() {
        if (SystemUtil.isServer()) {
            return ModuleService.getModule(FakerModuleS)
        }
        return null
    }

    /**
     * 被发现回调
     */
    async onBeFindChange() {
        let char = this.gameObject as Character;
        await char.asyncReady();
        if (this.beFind) {
            char.setOutline(true, LinearColor.red, 0.4);
        } else {
            char.setOutline(false);
        }
    }

    /**
     * 设置伪人被发现状态
     * @param beFind 是否被发现
     */
    public setFindState(beFind: boolean) {
        this.beFind = beFind;
        if (this.beFind) {
            this.findTimer = 10;
        }
    }

    onFindUpdate(dt: number) {
        if (this.beFind) {
            this.findTimer -= dt;
            if (this.findTimer <= 0) {
                this.setFindState(false);
            }
        }
    }


}