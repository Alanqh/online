'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const jetPackAsset = "131208";
const tailFrameEffect = "27393";
const animMap = new Map([
    [SomatotypeV2.AnimeMale, { sprint: "270580", emergencyStop: "270596", multiJump: "270574" }],
    [SomatotypeV2.AnimeFemale, { sprint: "270589", emergencyStop: "270591", multiJump: "270578" }],
    [SomatotypeV2.LowpolyAdultMale, { sprint: "270595", emergencyStop: "270583", multiJump: "270576" }],
    [SomatotypeV2.LowpolyAdultFemale, { sprint: "270585", emergencyStop: "270590", multiJump: "270587" }],
    [SomatotypeV2.RealisticAdultMale, { sprint: "270584", emergencyStop: "270586", multiJump: "270573" }],
    [SomatotypeV2.RealisticAdultFemale, { sprint: "270594", emergencyStop: "270582", multiJump: "270577" }],
    [SomatotypeV2.CartoonyMale, { sprint: "270575", emergencyStop: "270581", multiJump: "270579" }],
    [SomatotypeV2.CartoonyFemale, { sprint: "270593", emergencyStop: "270592", multiJump: "270588" }],
]);
const effectMap = new Map([
    [SomatotypeV2.AnimeMale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.AnimeFemale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.LowpolyAdultMale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.LowpolyAdultFemale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.RealisticAdultMale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.RealisticAdultFemale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.CartoonyMale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
    [SomatotypeV2.CartoonyFemale, { run: "219369", sprint: "219369", multiJump: "219368", landed: "151535", velocityLine: "219370" }],
]);
const iconList = {
    runImage: "158379",
    flyImage: "158400",
    standImage: "158379",
    crouchImage: "114090",
};
const movementSetting = {
    sprintSpeed: 1000,
    emergencyStopSpeed: 900,
    multiJumpHeight: 360,
    emergencyStopTime: 1.5
};

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    animMap: animMap,
    effectMap: effectMap,
    iconList: iconList,
    jetPackAsset: jetPackAsset,
    movementSetting: movementSetting,
    tailFrameEffect: tailFrameEffect
});

var SprintStateType;
(function (SprintStateType) {
    SprintStateType[SprintStateType["none"] = 0] = "none";
    SprintStateType[SprintStateType["preSprint"] = 1] = "preSprint";
    SprintStateType[SprintStateType["sprint"] = 2] = "sprint";
    SprintStateType[SprintStateType["emergencyStop"] = 3] = "emergencyStop";
})(SprintStateType || (SprintStateType = {}));
class AnimAssets {
}
class EffectAssets {
}
var SyncStateType;
(function (SyncStateType) {
    SyncStateType[SyncStateType["startSprint"] = 0] = "startSprint";
    SyncStateType[SyncStateType["stopSprint"] = 1] = "stopSprint";
    SyncStateType[SyncStateType["emergencyStop"] = 2] = "emergencyStop";
    SyncStateType[SyncStateType["multiJump"] = 3] = "multiJump";
    SyncStateType[SyncStateType["fly"] = 4] = "fly";
    SyncStateType[SyncStateType["run"] = 5] = "run";
})(SyncStateType || (SyncStateType = {}));
class SyncState {
    constructor() {
        this.stateType = SyncStateType.stopSprint;
        this.forceRep = false; // 用于强制触发属性同步
    }
    // 网络同步数据编码
    // 强制同步位|    动画类型
    //      1   | 0 0 0 0 0 0 1
    serialize() {
        this.forceRep = !this.forceRep;
        let result = 0b00000000;
        let mask = 0b10000000;
        result |= this.stateType;
        result |= this.forceRep ? mask : 0;
        return result;
    }
    unserialize(data) {
        this.stateType = data & 0b01111111;
    }
}

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AnimAssets: AnimAssets,
    EffectAssets: EffectAssets,
    get SprintStateType () { return SprintStateType; },
    SyncState: SyncState,
    get SyncStateType () { return SyncStateType; }
});

let StateMachine = class StateMachine extends Script {
    constructor() {
        super(...arguments);
        this.currSyncState = new SyncState();
        this.onSprintStateChanged = new MulticastDelegate();
        // #endregion Anim Network Sync
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.character = this.gameObject;
        this.debugLog(`onStart()`);
        if (SystemUtil.isClient()) {
            this.character.asyncReady().then(() => {
                this.initAnim();
                this.initEffects();
                this.useUpdate = true;
            });
        }
        this.isLocalCharacter = SystemUtil.isClient() && Player.localPlayer.character == this.character;
        this.onStateChange = this.onStateChange.bind(this);
        this.character.onStateChanged.add(this.onStateChange);
        this.jumpHeight = this.character.maxJumpHeight;
        this.walkSpeed = this.character.maxWalkSpeed;
    }
    initAnim() {
        let animAssets = animMap.get(this.character.description.advance.base.characterSetting.somatotype);
        AssetUtil.asyncDownloadAsset(animAssets.sprint);
        AssetUtil.asyncDownloadAsset(animAssets.emergencyStop);
        AssetUtil.asyncDownloadAsset(animAssets.multiJump);
        this.sprintAnim = this.character.loadAnimation(animAssets.sprint);
        this.sprintAnim.loop = 0;
        this.emergencyStopAnim = this.character.loadAnimation(animAssets.emergencyStop);
        // 根据急停滑行距离计算急停动画速度: 动画速度 = 动画长度 / (角色速度 / 制动速度)
        // this.emergencyStopAnim.speed = 1.5 / (movementSetting.emergencyStopSpeed / this.character.brakingDecelerationWalking);
        this.multiJumpAnim = this.character.loadAnimation(animAssets.multiJump);
    }
    initEffects() {
        let effectAssets = effectMap.get(this.character.description.advance.base.characterSetting.somatotype);
        let offset = Vector.zero;
        offset.z -= this.character.collisionExtent.z / 2;
        this.spawnEffect(effectAssets.multiJump, this.character, new Transform(offset, new Rotation(0, 0, -90), Vector.one.multiply(0.8)), false).then((effect) => {
            this.multiJumpEffect = effect;
        });
        let tempTransform = new Transform(offset, new Rotation(0, 0, -90), Vector.one);
        this.spawnEffect(effectAssets.sprint, this.character, tempTransform).then((effect) => {
            this.sprintEffect = effect;
        });
        this.spawnEffect(effectAssets.velocityLine, this.character, tempTransform).then((effect) => {
            this.velocityLineEffect = effect;
        });
        this.spawnEffect(effectAssets.landed, this.character, tempTransform, false).then((effect) => {
            this.landedEffect = effect;
        });
        this.spawnEffect(effectAssets.run, this.character, new Transform(offset, new Rotation(0, 0, -90), Vector.one.multiply(0.6))).then((effect) => {
            this.runEffect = effect;
        });
        GameObject.asyncSpawn(jetPackAsset).then((obj) => {
            this.jetPackGo = obj;
            this.character.attachToSlot(this.jetPackGo, HumanoidSlotType.BackOrnamental);
            this.jetPackGo.localTransform.position = new Vector(-4, -2.5, -125);
            this.jetPackGo.localTransform.rotation = new Rotation(0, -0.8, 90);
            this.jetPackGo.setVisibility(PropertyStatus.Off, true);
            this.jetPackGo.setCollision(CollisionStatus.Off);
            this.spawnEffect(tailFrameEffect, this.jetPackGo, new Transform(new Vector(-33, -15.25, 100), Rotation.zero, Vector.one.multiply(0.4)), true, false);
            this.spawnEffect(tailFrameEffect, this.jetPackGo, new Transform(new Vector(33, -15.25, 100), Rotation.zero, Vector.one.multiply(0.4)), true, false);
        });
    }
    async spawnEffect(guid, parent, transform = new Transform(), isLoop = true, isStop = true) {
        return new Promise((resolve) => {
            GameObject.asyncSpawn(guid).then((obj) => {
                let effect = obj;
                if (parent) {
                    effect.parent = parent;
                    effect.localTransform = transform;
                }
                else {
                    effect.worldTransform = transform;
                }
                effect.loop = isLoop;
                if (isStop) {
                    effect.stop();
                }
                resolve(effect);
            });
        });
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
        if (this.isLocalCharacter) {
            this.updateSprintState(dt);
        }
        switch (this.character.getCurrentState()) {
            case CharacterStateType.Running:
                let vec2d = new Vector2(this.character.velocity.x, this.character.velocity.y);
                if (this.isMoving) {
                    if (vec2d.length < 50) {
                        this.isMoving = false;
                        this.stopEffectChecked(this.runEffect);
                    }
                }
                else {
                    if (vec2d.length >= 50) {
                        this.isMoving = true;
                        this.playEffectChecked(this.runEffect);
                    }
                }
                break;
            case CharacterStateType.Jumping:
            case CharacterStateType.Freefall:
                if (this.isMoving) {
                    this.isMoving = false;
                    this.stopEffectChecked(this.runEffect);
                }
                break;
            case CharacterStateType.Flying:
                if (this.isMoving) {
                    if (this.character.velocity.length < 50) {
                        this.isMoving = false;
                        this.stopEffectChecked(this.velocityLineEffect);
                    }
                }
                else {
                    if (this.character.velocity.length >= 50) {
                        this.isMoving = true;
                        this.playEffectChecked(this.velocityLineEffect);
                    }
                }
                break;
        }
    }
    updateSprintState(dt) {
        let vec2d = new Vector2(this.character.velocity.x, this.character.velocity.y);
        // this.debugLog(`vec2d: ${vec2d}, length: ${vec2d.length}`)
        switch (this.currSprintState) {
            case SprintStateType.preSprint:
                if (vec2d.length >= movementSetting.sprintSpeed - 1) {
                    this.debugLog(`preSprint -> sprint`);
                    this.setSyncState(SyncStateType.startSprint);
                    this.changeSprintState(SprintStateType.sprint);
                }
                break;
            case SprintStateType.sprint:
                if (this.character.getCurrentState() == CharacterStateType.Crouching || this.character.getCurrentState() == CharacterStateType.Swimming) {
                    console.log(`sprint -> forceStopSprint`);
                    this.character.maxWalkSpeed = this.walkSpeed;
                    this.isSprintJump = false;
                    this.setSyncState(SyncStateType.stopSprint);
                    this.changeSprintState(SprintStateType.none);
                }
                else if (vec2d.length <= movementSetting.emergencyStopSpeed) {
                    this.character.maxWalkSpeed = this.walkSpeed;
                    if (this.isSprintJump) {
                        this.debugLog(`sprintJump -> none`);
                        this.changeSprintState(SprintStateType.none);
                    }
                    else {
                        this.debugLog(`sprint -> emergencyStop ${this.character.worldTransform.position}`);
                        this.character.groundFrictionEnabled = false;
                        this.emergencyStopTime = movementSetting.emergencyStopTime;
                        this.character.movementEnabled = false;
                        this.character.setStateEnabled(CharacterStateType.Jumping, false);
                        this.character.setStateEnabled(CharacterStateType.Crouching, false);
                        this.character.setStateEnabled(CharacterStateType.Flying, false);
                        this.character.setStateEnabled(CharacterStateType.Swimming, false);
                        this.setSyncState(SyncStateType.emergencyStop);
                        this.changeSprintState(SprintStateType.emergencyStop);
                    }
                }
                break;
            case SprintStateType.emergencyStop:
                this.emergencyStopTime -= dt;
                if (this.emergencyStopTime <= 0) {
                    this.debugLog(`emergencyStop -> end ${this.character.worldTransform.position}`);
                    this.character.groundFrictionEnabled = true;
                    this.character.movementEnabled = true;
                    this.character.setStateEnabled(CharacterStateType.Jumping, true);
                    this.character.setStateEnabled(CharacterStateType.Crouching, true);
                    this.character.setStateEnabled(CharacterStateType.Flying, true);
                    this.character.setStateEnabled(CharacterStateType.Swimming, true);
                    this.changeSprintState(SprintStateType.none);
                }
                break;
        }
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
    debugLog(...params) {
        this.isLocalCharacter ? "local" : "simulate";
        // console.log(`[StateMachine] (${role} ${this.character.displayName}) ${params.join(" ")}`);
    }
    playEffectChecked(effect) {
        if (effect) {
            effect.play();
        }
    }
    stopEffectChecked(effect) {
        if (effect) {
            effect.stop();
        }
    }
    onStateChange(prevState, currState) {
        // this.debugLog(`onStateChange prev: ${CharacterStateType[prevState]}, curr: ${CharacterStateType[currState]}`);
        if (this.isLocalCharacter) {
            this.onStateChangeLocal(prevState, currState);
        }
        if (currState == CharacterStateType.Landed) {
            this.stopEffectChecked(this.landedEffect);
            this.playEffectChecked(this.landedEffect);
        }
    }
    onStateChangeLocal(prevState, currState) {
        if ((prevState == CharacterStateType.Jumping || prevState == CharacterStateType.Freefall) && currState == CharacterStateType.Jumping) {
            this.debugLog(`multiJump`);
            this.character.maxJumpHeight = movementSetting.multiJumpHeight;
            this.setSyncState(SyncStateType.multiJump);
        }
        else if (this.currSprintState == SprintStateType.sprint && !this.isSprintJump && (currState == CharacterStateType.Jumping || currState == CharacterStateType.Freefall)) {
            this.debugLog(`sprint -> sprintJump`);
            this.isSprintJump = true;
            this.setSyncState(SyncStateType.stopSprint);
        }
        else if (currState == CharacterStateType.Landed) {
            this.debugLog(`landed`);
            if (this.currSprintState == SprintStateType.sprint) {
                this.setSyncState(SyncStateType.startSprint);
            }
            this.isSprintJump = false;
            this.character.maxJumpHeight = this.jumpHeight;
        }
        else if (currState == CharacterStateType.Flying) {
            this.debugLog(`fly`);
            this.character.maxWalkSpeed = this.walkSpeed;
            this.isSprintJump = false;
            this.changeSprintState(SprintStateType.none);
            this.setSyncState(SyncStateType.fly);
        }
        else if (prevState == CharacterStateType.Flying && currState == CharacterStateType.Running) {
            this.debugLog(`run`);
            this.setSyncState(SyncStateType.run);
        }
    }
    changeSprintState(state) {
        let prevState = this.currSprintState;
        this.currSprintState = state;
        this.onSprintStateChanged.broadcast(prevState, this.currSprintState);
    }
    startSprint() {
        this.debugLog(`start -> preSprint`);
        this.changeSprintState(SprintStateType.preSprint);
        this.character.maxWalkSpeed = movementSetting.sprintSpeed;
    }
    onRepState() {
        this.currSyncState.unserialize(this.repState);
        this.debugLog(`onRepState ${SyncStateType[this.currSyncState.stateType]}`);
        this.setSyncStateInternal();
    }
    setSyncState(stateType) {
        this.currSyncState.stateType = stateType;
        this.repState = this.currSyncState.serialize();
        this.setSyncStateInternal();
        this.serverSetSyncState(this.repState);
    }
    setSyncStateInternal() {
        switch (this.currSyncState.stateType) {
            case SyncStateType.startSprint:
                this.sprintAnim.play();
                this.playEffectChecked(this.sprintEffect);
                this.playEffectChecked(this.velocityLineEffect);
                break;
            case SyncStateType.stopSprint:
                this.sprintAnim.stop();
                this.stopEffectChecked(this.sprintEffect);
                this.stopEffectChecked(this.velocityLineEffect);
                break;
            case SyncStateType.emergencyStop:
                this.emergencyStopAnim.play();
                this.stopEffectChecked(this.sprintEffect);
                this.stopEffectChecked(this.velocityLineEffect);
                break;
            case SyncStateType.multiJump:
                this.multiJumpAnim.play();
                this.playEffectChecked(this.multiJumpEffect);
                break;
            case SyncStateType.fly:
                this.sprintAnim.stop();
                this.stopEffectChecked(this.sprintEffect);
                this.stopEffectChecked(this.velocityLineEffect);
                this.jetPackGo.setVisibility(true);
                this.stopEffectChecked(this.runEffect);
                this.isMoving = false;
                break;
            case SyncStateType.run:
                this.jetPackGo.setVisibility(false);
                this.stopEffectChecked(this.velocityLineEffect);
                this.isMoving = false;
                break;
        }
    }
    serverSetSyncState(value) {
        this.repState = value;
    }
};
__decorate([
    Property({
        replicated: true,
        onChanged: "onRepState",
    })
], StateMachine.prototype, "repState", void 0);
__decorate([
    RemoteFunction(Server)
], StateMachine.prototype, "serverSetSyncState", null);
StateMachine = __decorate([
    Component
], StateMachine);
var StateMachine$1 = StateMachine;

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StateMachine$1
});

let DefaultUI = class DefaultUI extends UIScript {
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        Player.asyncGetLocalPlayer().then((player) => {
            this.character = player.character;
            this.initOperationPanel();
        });
    }
    /**
     * 每一帧调用
     * 通过canUpdate可以开启关闭调用
     * dt 两帧调用的时间差，毫秒
     */
    onUpdate(dt) {
    }
    getStateMachine() {
        if (!this.stateMachine) {
            this.stateMachine = this.character.getComponent(StateMachine$1);
        }
        return this.stateMachine;
    }
    initOperationPanel() {
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump');
        const sprintBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Sprint');
        const crouchBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Crouch');
        const switchMovementBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_SwitchMovement');
        jumpBtn.onPressed.add(() => {
            if (this.character.getCurrentState() == CharacterStateType.Flying) {
                return;
            }
            this.character.changeState(CharacterStateType.Jumping);
        });
        sprintBtn.onPressed.add(() => {
            if (this.character.getCurrentState() == CharacterStateType.Crouching) {
                this.character.changeState(CharacterStateType.Running);
                crouchBtn.normalImageGuid = iconList.crouchImage;
            }
            this.getStateMachine().startSprint();
            sprintBtn.enable = false;
            let callback = (prevState, currState) => {
                if (currState == SprintStateType.none) {
                    this.getStateMachine().onSprintStateChanged.remove(callback);
                    if (this.character.getCurrentState() != CharacterStateType.Flying) {
                        sprintBtn.enable = true;
                    }
                }
            };
            this.getStateMachine().onSprintStateChanged.add(callback);
        });
        crouchBtn.onPressed.add(() => {
            if (this.character.getCurrentState() == CharacterStateType.Crouching) {
                this.character.changeState(CharacterStateType.Running);
                crouchBtn.normalImageGuid = iconList.crouchImage;
            }
            else if (this.character.getCurrentState() == CharacterStateType.Running && this.getStateMachine().currSprintState != SprintStateType.emergencyStop) {
                this.character.changeState(CharacterStateType.Crouching);
                crouchBtn.normalImageGuid = iconList.standImage;
            }
        });
        switchMovementBtn.onPressed.add(() => {
            if (this.character.getCurrentState() == CharacterStateType.Flying) {
                this.character.changeState(CharacterStateType.Running);
                crouchBtn.enable = true;
                sprintBtn.enable = true;
                switchMovementBtn.normalImageGuid = iconList.flyImage;
            }
            else if (this.getStateMachine().currSprintState != SprintStateType.emergencyStop) {
                if (this.character.getCurrentState() == CharacterStateType.Crouching) {
                    this.character.changeState(CharacterStateType.Running);
                    crouchBtn.normalImageGuid = iconList.crouchImage;
                }
                this.character.changeState(CharacterStateType.Flying);
                crouchBtn.enable = false;
                sprintBtn.enable = false;
                switchMovementBtn.normalImageGuid = iconList.runImage;
            }
        });
    }
};
DefaultUI = __decorate([
    UIBind('')
], DefaultUI);
var DefaultUI$1 = DefaultUI;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI$1
});

let GameStart = class GameStart extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            Player.getAllPlayers().forEach((player) => {
                player.character.addComponent(StateMachine$1, true);
            });
            Player.onPlayerJoin.add((player) => {
                player.character.addComponent(StateMachine$1, true);
            });
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

const MWModuleMap = { 
     'E793F4E748068B7014AF149815249190': foreign1,
     '73E2698B433C20C4AF92909593F1C9DE': foreign2,
     '453B1F994F041001F134F9BFC2452B9B': foreign3,
     'D68E812C45C4FA4FC4DF0C8FDE52D681': foreign4,
     '309B530841912D868BB4A88AEDB55AA4': foreign5,
};
const MWFileMapping = new WeakMap([[foreign1 || {}, "JavaScripts/DefaultUI"],
[foreign2 || {}, "JavaScripts/GameStart"],
[foreign3 || {}, "JavaScripts/Setting"],
[foreign4 || {}, "JavaScripts/StateMachine"],
[foreign5 || {}, "JavaScripts/TypeDefine"]]);

exports.MWFileMapping = MWFileMapping;
exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
