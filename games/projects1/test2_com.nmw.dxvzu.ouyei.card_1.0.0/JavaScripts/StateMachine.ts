import { animMap, effectMap, jetPackAsset, movementSetting, tailFrameEffect} from "./Setting";
import { SyncStateType, SyncState, SprintStateType} from "./TypeDefine";


@Component
export default class StateMachine extends Script {
    private character: Character;

    private isLocalCharacter: boolean;

    private currSyncState = new SyncState();

    currSprintState: SprintStateType;

    private sprintAnim: Animation;
    private emergencyStopAnim: Animation;
    private multiJumpAnim: Animation;

	private multiJumpEffect: Effect;
	private sprintEffect: Effect;
	private runEffect: Effect;
	private velocityLineEffect: Effect;
	private landedEffect: Effect;

    private jetPackGo: GameObject;

    private isSprintJump: boolean;
    private isMoving: boolean;
    private emergencyStopTime: number;

    private jumpHeight: number;
    private walkSpeed: number;

    onSprintStateChanged = new MulticastDelegate<(prevState: SprintStateType, currState: SprintStateType) => void>();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.character = this.gameObject as Character;
        this.debugLog(`onStart()`)
        if (SystemUtil.isClient()) {
            this.character.asyncReady().then(() => {
                this.initAnim();
                this.initEffects();
                this.useUpdate = true;
            });
        }

        this.isLocalCharacter = SystemUtil.isClient() && Player.localPlayer.character == this.character

        this.onStateChange = this.onStateChange.bind(this);
        this.character.onStateChanged.add(this.onStateChange);

        this.jumpHeight = this.character.maxJumpHeight;
        this.walkSpeed = this.character.maxWalkSpeed;
    }

    private initAnim(): void {
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

	private initEffects():void {
        let effectAssets = effectMap.get(this.character.description.advance.base.characterSetting.somatotype);
		let offset = Vector.zero;
		offset.z-=this.character.collisionExtent.z/2;


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
            (this.jetPackGo as Model).setCollision(CollisionStatus.Off);

			this.spawnEffect(tailFrameEffect, this.jetPackGo, new Transform(new Vector(-33, -15.25, 100), Rotation.zero, Vector.one.multiply(0.4)), true, false);

			this.spawnEffect(tailFrameEffect, this.jetPackGo, new Transform(new Vector(33, -15.25, 100), Rotation.zero, Vector.one.multiply(0.4)), true, false);

		})
	}
    
    private async spawnEffect(guid: string, parent: GameObject, transform = new Transform(), isLoop = true, isStop = true) : Promise<Effect> {
		return new Promise((resolve) => {
			GameObject.asyncSpawn(guid).then((obj) => {
				let effect = obj as Effect;
				if (parent) {
					effect.parent = parent;
					effect.localTransform = transform;
				} else {
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
    protected onUpdate(dt: number): void {
        if (this.isLocalCharacter) {
            this.updateSprintState(dt);
        }

        switch(this.character.getCurrentState()) {
            case CharacterStateType.Running:
                let vec2d = new Vector2(this.character.velocity.x, this.character.velocity.y);
                if (this.isMoving) {
                    if (vec2d.length < 50) {
                        this.isMoving = false;
                        this.stopEffectChecked(this.runEffect)
                    }
                } else {
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
                        this.stopEffectChecked(this.velocityLineEffect)
                    }
                } else {
                    if (this.character.velocity.length >= 50) {
                        this.isMoving = true;
                        this.playEffectChecked(this.velocityLineEffect);
                    }
                }
                break;
        }
    }

    private updateSprintState(dt: number): void {
        let vec2d = new Vector2(this.character.velocity.x, this.character.velocity.y);
        // this.debugLog(`vec2d: ${vec2d}, length: ${vec2d.length}`)

        switch(this.currSprintState) {
            case SprintStateType.preSprint:
                if (vec2d.length >= movementSetting.sprintSpeed - 1)
                {
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
                        this.debugLog(`sprintJump -> none`)
                        this.changeSprintState(SprintStateType.none);
                    } else {
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
            default:
                break;
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

    private debugLog(...params: unknown[]): void {
        let role = this.isLocalCharacter ? "local" : "simulate"
        // console.log(`[StateMachine] (${role} ${this.character.displayName}) ${params.join(" ")}`);
    }

    private playEffectChecked(effect: Effect): void {
        if (effect) {
            effect.play();
        }
    }

    private stopEffectChecked(effect: Effect): void {
        if (effect) {
            effect.stop();
        }
    }

    private onStateChange(prevState: CharacterStateType, currState: CharacterStateType): void {
        // this.debugLog(`onStateChange prev: ${CharacterStateType[prevState]}, curr: ${CharacterStateType[currState]}`);
        if (this.isLocalCharacter) {
            this.onStateChangeLocal(prevState, currState);
        }
        if (currState == CharacterStateType.Landed) {
            this.stopEffectChecked(this.landedEffect);
            this.playEffectChecked(this.landedEffect);
        }
    }

    private onStateChangeLocal(prevState: CharacterStateType, currState: CharacterStateType): void {
        if ((prevState == CharacterStateType.Jumping || prevState == CharacterStateType.Freefall) && currState == CharacterStateType.Jumping) {
            this.debugLog(`multiJump`);
            this.character.maxJumpHeight = movementSetting.multiJumpHeight;
            this.setSyncState(SyncStateType.multiJump);
        }
        else if (this.currSprintState == SprintStateType.sprint && !this.isSprintJump && (currState == CharacterStateType.Jumping || currState == CharacterStateType.Freefall)) {
            this.debugLog(`sprint -> sprintJump`)
            this.isSprintJump = true;
            this.setSyncState(SyncStateType.stopSprint);
        }
        else if (currState == CharacterStateType.Landed) {
            this.debugLog(`landed`)
            if (this.currSprintState == SprintStateType.sprint) {
                this.setSyncState(SyncStateType.startSprint);
            }
            this.isSprintJump = false;
            this.character.maxJumpHeight = this.jumpHeight;
        }
        else if (currState == CharacterStateType.Flying) {
            this.debugLog(`fly`)
            this.character.maxWalkSpeed = this.walkSpeed;
            this.isSprintJump = false;
            this.changeSprintState(SprintStateType.none);
            this.setSyncState(SyncStateType.fly);
        } 
        else if (prevState == CharacterStateType.Flying && currState == CharacterStateType.Running) {
            this.debugLog(`run`)
            this.setSyncState(SyncStateType.run);
        }
    }

    changeSprintState(state: SprintStateType): void {
        let prevState = this.currSprintState;
        this.currSprintState = state;
        this.onSprintStateChanged.broadcast(prevState, this.currSprintState);
    }

    startSprint(): void {
        this.debugLog(`start -> preSprint`)
        this.changeSprintState(SprintStateType.preSprint);
        this.character.maxWalkSpeed = movementSetting.sprintSpeed;
    }


    // #region Anim & Effect Network Sync

    @Property({
        replicated: true,
        onChanged: "onRepState",
    })
    private repState: number;

    private onRepState(): void {
        this.currSyncState.unserialize(this.repState);
        this.debugLog(`onRepState ${SyncStateType[this.currSyncState.stateType]}`)
        this.setSyncStateInternal();
    }

    private setSyncState(stateType: SyncStateType): void {
        this.currSyncState.stateType = stateType;
        this.repState = this.currSyncState.serialize();
        this.setSyncStateInternal();
        this.serverSetSyncState(this.repState);
    }

    private setSyncStateInternal(): void {
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
            default:
                break;
        }
    }

    @RemoteFunction(Server)
    private serverSetSyncState(value: number): void {
        this.repState = value;
    }

    // #endregion Anim Network Sync
}