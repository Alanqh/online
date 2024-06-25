
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../utils/uitls";
import TimeModuleC from "../Time/TimeModuleC";
import SceneModuleS from "./SceneModuleS";

/**
 * 场景物体模块 - 客户端
 */

export default class SceneModuleC extends ModuleC<SceneModuleS, null> {

    /**音效数组 */
    private audioArr: Sound[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        let timeMC = ModuleService.getModule(TimeModuleC);
        timeMC.onDayStart.add(this.setSceneAudioSwitch.bind(this, false));
        timeMC.onNightStart.add(this.setSceneAudioSwitch.bind(this, true));

    }

    protected async onEnterScene(sceneType: number): Promise<void> {
        await this.getSceneAudio();
        this.createTrigger();
        setTimeout(() => {
            this.setSceneAudioSwitch(utils.isNight());
        }, 10000);
    }

    /**
     * 获取场景音效
     */
    private async getSceneAudio() {
        GlobalData.SceneObject.sceneSoundGuid.forEach(async (element) => {
            GameObject.asyncFindGameObjectById(element).then((sound) => {
                let audio = sound as Sound;
                this.audioArr.push(audio);
            })
        });
    }

    /**
     * 设置场景音效开关
     */
    private setSceneAudioSwitch(isOpen: boolean) {
        this.audioArr.forEach((sound) => {
            if (!sound) {
                return;
            }
            if (sound instanceof Sound) {
                isOpen ? sound.play() : sound.stop()
            }
        })
    }

    private async createTrigger() {
        let trigger = await GameObject.asyncSpawn("Trigger") as Trigger;

        trigger.worldTransform.position = new Vector(5377, -3319, 524);
        trigger.worldTransform.scale = new Vector(17, 11, 1);

        trigger.onEnter.add((obj) => {

            let isChar = utils.checkTriggerGo(obj);
            if (!isChar) {
                return;
            }

            let char = obj as Character;
            char.worldTransform.position = GlobalData.NPC.playerBedDayPos;
        });
    }
}