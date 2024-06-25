import { GlobalData } from "../../../const/GlobalData";
import { EPlayerState } from "../../../const/enum";
import { SoundManager } from "../../../utils/SoundManager";
import { PlyerState } from "./PlyerState";

/**
 * 跑状态
 */
export class PlayerState_Run extends PlyerState {

    /**音效*/
    private sounds: Sound[] = [];

    /**音效计时*/
    private timers: number[] = [];

    /**音效间隔*/
    private invervaleTimers: number[] = [];

    /**音效id */
    private soundIds: number[] = [];


    constructor(stateType: EPlayerState) {
        super(stateType);
    }

    enter() {
        this.playeSounds();
    }

    exit() {
        this.stopSounds();
    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
        this.updateSpeed();
        this.updateSound(dt);
    }

    /**
     * 更新速度
     */
    private updateSpeed() {
        let char = Player.localPlayer.character;
        if (!char) return;
        let speed = this.sportModuleC.getPlayerSpeed();
        if (speed == char.maxWalkSpeed) {
            return;
        }
        char.maxWalkSpeed = speed;
    }

    /**
     * 更新音效
     */
    private updateSound(dt: number) {
        for (let index = 0; index < this.timers.length; index++) {
            let element = this.timers[index];
            element += dt;
            this.timers[index] = element;
            if (this.invervaleTimers[index] && element >= this.invervaleTimers[index]) {
                this.timers[index] = 0;
                this.stopSound(index);
                this.playSound(index);
            }
        }
    }

    /**
     * 播放所有音效
     */
    private playeSounds() {
        this.stopSounds();
        for (let index = 0; index < GlobalData.PlayerSport.walksoundsInverval.length; index++) {
            const element = GlobalData.PlayerSport.walksoundsInverval[index];
            this.invervaleTimers.push(element);
            this.timers.push(0);
            this.playSound(index);
        }
    }

    /**
     * 停止所有声音
     */
    private stopSounds() {

        this.invervaleTimers = [];

        this.timers = [];

        this.sounds = []

        for (let index = 0; index < this.soundIds.length; index++) {
            const element = this.soundIds[index];
            SoundService.stop3DSound(element);
        }
        this.soundIds = [];
    }

    /**
      * 播放index音效
      * @param isEnter 
      */
    private async playSound(index: number) {
        const element = GlobalData.PlayerSport.walksounds[index];
        let playId = await SoundManager.instance.play3DSound(element, Player.localPlayer.character);
        this.soundIds.push(playId);
        let sound = await SoundService.get3DSoundById(playId)
        this.sounds.push(sound);
    }

    /**
     * 停止index音效
     * @param soundId 
     */
    private stopSound(soundId: number) {
        let index = this.soundIds.findIndex((ele) => {
            return ele == soundId;
        })
        if (index != -1) {
            const element = this.soundIds[index];
            SoundService.stop3DSound(element);
            this.soundIds.splice(index, 1);
        }
    }





    onDestory(): void {

    }

}

