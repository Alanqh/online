import { ActionCommon, GlobalData } from "../../../const/GlobalData";
import { EPlayerState } from "../../../const/enum";
import SportEffect_Generate from "../../../ui-generate/Sport/SportEffect_generate";
import { SoundManager } from "../../../utils/SoundManager";
import { PlyerState } from "./PlyerState";

/**
 * 冲刺状态
 */
export class PlayerState_Sprint extends PlyerState {

    /**检测计时*/
    private timer: number = 0;

    /**相机动画*/
    private camFOVAni: mw.Tween<any> = null;

    /**相机默认fov*/
    private dfCamFov: number = null;

    /**速度UI*/
    private speedUI: SportEffect_Generate = null;

    /**音效id */
    private soundIds: number[] = [];

    /**音效*/
    private sounds: Sound[] = [];

    /**音效动画*/
    private soundVlomeTweens: mw.Tween<any>[] = [];

    /**音效updateKey*/
    private key: number = null;

    /**音效计时*/
    private timers: number[] = [];

    /**音效间隔*/
    private invervaleTimers: number[] = [];

    /**音效间隔动画*/
    private soundinvervalTweens: mw.Tween<any>[] = [];

    constructor(stateType: EPlayerState) {
        super(stateType);
        this.dfCamFov = Camera.currentCamera.fov;
        this.speedUI = UIService.create(SportEffect_Generate);
        ActionCommon.onSPChange.add(this.listen_stopSound.bind(this));
    }

    enter() {
        this.updateSpeed();
        this.startCameraFov(GlobalData.PlayerSport.cameraTargetFov, GlobalData.PlayerSport.cameraTargetFovChangeTime);
        this.screenEffect(true);
        this.playeSounds();

        this.clearSoundUpdateKey();
        this.key = TimeUtil.onEnterFrame.add(this.updateSound.bind(this))
    }

    exit() {
        this.startCameraFov(this.dfCamFov, GlobalData.PlayerSport.cameraTargetFovBackTime);
        this.screenEffect(false);
        this.reduceSoundVolme();
        this.changeSoundInterval(false);
        this.timer = 0;
    }

    onUpdate(dt: number) {
        this.updateSpeed();
        this.updateSP(dt);
    }

    /**
     * 相机fov修改
     */
    private startCameraFov(targetFov: number, time: number = 1) {
        // 初始相机fov
        let startFov = Camera.currentCamera.fov;

        if (this.camFOVAni) {
            this.camFOVAni.stop();
            this.camFOVAni = null;
        }
        // 角度转弧度系数
        const R = Math.PI / 180;
        // console.log("start:" + startFov + " targetFov:" + targetFov);
        if (!GlobalData.Environment.nightSceenEffect1) return;
        if (!GlobalData.Environment.nightSceenEffect2) return;
        let tempVec = new Vector();
        this.camFOVAni = new mw.Tween({ fov: startFov }).to({ fov: targetFov }, time * 1000).onUpdate(fov => {
            Camera.currentCamera.fov = fov.fov;
            let scale = Math.tan(fov.fov / 2 * R);
            tempVec.x = scale;
            tempVec.y = scale;
            tempVec.z = scale;
            GlobalData.Environment.nightSceenEffect1.localTransform.scale = tempVec;
            GlobalData.Environment.nightSceenEffect2.localTransform.scale = tempVec;
        }).start();
    }

    /**
     * 屏幕特效
     */
    private screenEffect(isEnter: boolean) {
        if (this.speedUI == null) {
            return;
        }
        isEnter ? UIService.showUI(this.speedUI) : UIService.hideUI(this.speedUI);
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
     * 播放音效
     */
    private playeSounds() {
        this.stopSounds();
        for (let index = 0; index < GlobalData.PlayerSport.dfsoundsBreathInverval.length; index++) {
            const element = GlobalData.PlayerSport.dfsoundsBreathInverval[index];
            this.invervaleTimers.push(element);
            this.timers.push(0);
            this.playSound(index);
        }
        this.changeSoundInterval(true);
    }

    /**
     * 播放index音效
     * @param isEnter 
     */
    private async playSound(index: number) {
        const element = GlobalData.PlayerSport.sounds[index];
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

    /**
     * 音效音量衰减 喘息和心跳声变小变缓
     */
    private reduceSoundVolme() {
        for (let index = 0; index < this.sounds.length; index++) {
            const element = this.sounds[index];
            let volumeStart = element.volume;
            let volumeEnd = 0;
            let tween = new mw.Tween({ value: volumeStart }).to({ value: volumeEnd }, GlobalData.PlayerSport.soundsVlomeChangeTime * 1000)
                .onUpdate(value => {
                    //注意：这里会变化!
                    if (this.sounds[index]) {
                        this.sounds[index].volume = value.value;
                    }
                    //体力恢复到80%时音效停止
                    let sp = this.sportModuleC.getPlayeSP();
                    if (sp >= 80) {
                        this.stopSounds();
                    }
                }).onComplete(() => {

                    this.stopSounds();

                })
                .start();
            this.soundVlomeTweens.push(tween);
        }
    }

    /**
     * 音效音量动画
     */
    private clearSoundTween() {
        if (this.soundVlomeTweens.length <= 0) {
            return;
        }
        for (let index = 0; index < this.soundVlomeTweens.length; index++) {
            const element = this.soundVlomeTweens[index];
            element.stop();
        }
        this.soundVlomeTweens = [];
    }

    /**
     * 音效频率修改
     */
    private changeSoundInterval(isAdd) {

        for (let index = 0; index < this.invervaleTimers.length; index++) {
            const element = this.invervaleTimers[index];
            let statrtInterval = element; //isAdd ? GlobalData.PlayerSport.dfsoundsBreathInverval[index] : GlobalData.PlayerSport.spsoundsBreathInverval[index];
            let endtInterval = isAdd ? GlobalData.PlayerSport.spsoundsBreathInverval[index] : GlobalData.PlayerSport.dfsoundsBreathInverval[index]
            let time = isAdd ? GlobalData.PlayerSport.soundsInvervalChangeTimer[0] : GlobalData.PlayerSport.soundsInvervalChangeTimer[1];

            let tween = new Tween({ value: statrtInterval }).to({ value: endtInterval }, time * 1000).onUpdate(
                (value) => {
                    if (this.invervaleTimers[index]) {
                        this.invervaleTimers[index] = value.value;
                    }
                }
            )
                .start();
            this.soundinvervalTweens.push(tween);
        }
    }

    /**
     * 音效频率动画
     */
    private clearSoundInvervalTween() {
        if (this.soundinvervalTweens.length <= 0) {
            return;
        }
        for (let index = 0; index < this.soundinvervalTweens.length; index++) {
            const element = this.soundinvervalTweens[index];
            element.stop();
        }
        this.soundinvervalTweens = [];
    }

    /**
     * 停止所有声音
     */
    private stopSounds() {

        this.invervaleTimers = [];

        this.timers = [];

        this.sounds = []

        this.clearSoundUpdateKey();

        this.clearSoundTween();

        this.clearSoundInvervalTween();

        for (let index = 0; index < this.soundIds.length; index++) {
            const element = this.soundIds[index];
            SoundService.stop3DSound(element);
        }
        this.soundIds = [];
    }

    /**
     * 清空音效update
     */
    private clearSoundUpdateKey() {
        if (this.key) {
            TimeUtil.onEnterFrame.remove(this.key);
        }
    }

    /**
     * 监听停止声音
     */
    private listen_stopSound(sp: number) {
        if (sp <= GlobalData.PlayerSport.soundsVlomeStop) {
            return;
        }
        this.stopSounds();
    }

    /**
     * 更新速度
     */
    private updateSpeed() {
        let speed = this.sportModuleC.getPlayerSpeed();
        speed *= GlobalData.PlayerSport.sprintSpeedAdd * GlobalData.Buff.sprintSpeedBuff;
        if (speed == Player.localPlayer.character.maxWalkSpeed) {
            return;
        }
        Player.localPlayer.character.maxWalkSpeed = speed;
    }

    /**
     * 体力消耗
     */
    private updateSP(dt: number) {
        let sp = this.sportModuleC.getPlayeSP();
        if (sp <= 0) {
            this.sportModuleC.isCanSprint = false;
            this.sportModuleC.changeState_Base();
            return;
        } else {
            this.timer += dt;
            if (this.timer >= 1) {
                this.timer = 0;
                this.sportModuleC.reducePlayerSP(GlobalData.PlayerSport.sprintCostSpSecond + GlobalData.Buff.sprintCostSpSecondBuff);
            }
        }
    }


    onDestory(): void {

    }

}