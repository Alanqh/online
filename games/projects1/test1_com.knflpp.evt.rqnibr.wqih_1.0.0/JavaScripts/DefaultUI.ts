import { iconList } from "./Setting";
import StateMachine from "./StateMachine";
import { SprintStateType } from "./TypeDefine";



@UIBind('')
export default class DefaultUI extends UIScript {
	private character: Character;
	private stateMachine: StateMachine;
	
	/** 仅在游戏时间对非模板实例调用一次 */
    protected  onStart() {
		Player.asyncGetLocalPlayer().then((player) => {
			this.character = player.character;
			this.initOperationPanel();
		})
    }

	/**
	 * 每一帧调用
	 * 通过canUpdate可以开启关闭调用
	 * dt 两帧调用的时间差，毫秒
	 */
	protected onUpdate(dt :number) {
	}

	private getStateMachine(): StateMachine {
		if (!this.stateMachine) {
			this.stateMachine = this.character.getComponent(StateMachine);
		}
		return this.stateMachine;
	}

	private initOperationPanel():void {
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as Button;
		const sprintBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Sprint') as Button;
		const crouchBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Crouch') as Button;
		const switchMovementBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_SwitchMovement') as Button;

		jumpBtn.onPressed.add(()=> {
			if (this.character.getCurrentState() == CharacterStateType.Flying) {
				return;
			}
			this.character.changeState(CharacterStateType.Jumping);
		})


		sprintBtn.onPressed.add(()=>{
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
			}
			this.getStateMachine().onSprintStateChanged.add(callback);
		})

		crouchBtn.onPressed.add(()=>{
			if (this.character.getCurrentState() == CharacterStateType.Crouching) {
				this.character.changeState(CharacterStateType.Running);
				crouchBtn.normalImageGuid = iconList.crouchImage;
			} else if (this.character.getCurrentState() == CharacterStateType.Running && this.getStateMachine().currSprintState != SprintStateType.emergencyStop) {
				this.character.changeState(CharacterStateType.Crouching);
				crouchBtn.normalImageGuid = iconList.standImage;
			}
		})

		switchMovementBtn.onPressed.add(()=>{
			if (this.character.getCurrentState() == CharacterStateType.Flying) {
				this.character.changeState(CharacterStateType.Running);
				crouchBtn.enable = true;
				sprintBtn.enable = true;
				switchMovementBtn.normalImageGuid = iconList.flyImage;
			} else if (this.getStateMachine().currSprintState != SprintStateType.emergencyStop){
				if (this.character.getCurrentState() == CharacterStateType.Crouching) {
					this.character.changeState(CharacterStateType.Running);
					crouchBtn.normalImageGuid = iconList.crouchImage;
				}
				this.character.changeState(CharacterStateType.Flying);
				crouchBtn.enable = false;
				sprintBtn.enable = false;
				switchMovementBtn.normalImageGuid = iconList.runImage;
			}
		})
	}


}
