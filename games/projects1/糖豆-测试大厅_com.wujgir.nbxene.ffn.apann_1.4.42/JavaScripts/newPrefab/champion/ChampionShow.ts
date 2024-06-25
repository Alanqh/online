/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-12 13:58:32
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-12-21 15:34:04
 * @FilePath     : \stumbleguys_new\JavaScripts\newPrefab\champion\ChampionShow.ts
 * @Description  : 修改描述
 */
import { ChampionMachine } from "./ChampionFsm";
import ChampionUI from "./ChampionUI";

export class ChampionShow {
    public camera: mw.Camera;
    public scene: GameObject;
    public npc: Character;
    public fountain: Effect;
    private fsm: ChampionMachine;
    private isReady: boolean = false;
    private npcName: string;

    public init(scene: GameObject, skin: string, name: string) {
        this.scene = scene;
        this.camera = this.scene.getChildByName("camera") as Camera;
        this.npc = this.scene.getChildByName("角色") as Character;
        this.npc.asyncReady().then(() => {
            this.npc.loadStance("154704").play();
            this.npc.description.base.wholeBody = skin;
            this.npc.displayName = "";
            this.npcName = name;
            this.npc.onDescriptionComplete.add(() => {
                this.isReady = true;
                this.npc.onDescriptionComplete.clear();
            })
            let init = this.scene.getChildByName("playerLoc0");
            this.npc.worldTransform.position = init.worldTransform.position;
            this.npc.worldTransform.rotation = init.worldTransform.rotation;
            this.npc.complexMovementEnabled = false;
            this.camera.worldTransform.rotation = this.npc.worldTransform.position.subtract(this.camera.worldTransform.position).toRotation();
        });


        this.fountain = this.scene.getChildByName("喷泉") as Effect;
        this.fountain.loop = true;
        this.fsm = new ChampionMachine(this);
    }

    public onUpdate(dt: number) {
        if (!this.isReady) return;
        this.fsm && this.fsm.onUpdate(dt);
    }

    public start() {
        const interval = setInterval(() => {
            if (this.isReady) {
                clearInterval(interval);
                this.fsm.start();
                Camera.switch(this.camera);
                Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", false);
                UIService.show(ChampionUI, this.npcName, () => {
                    this.fsm.stop();
                });
            }
        }, 1);
    }
}
