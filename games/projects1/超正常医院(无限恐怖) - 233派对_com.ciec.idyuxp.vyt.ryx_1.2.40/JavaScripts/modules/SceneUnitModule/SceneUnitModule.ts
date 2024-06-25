
import { GameConfig } from "../../config/GameConfig";
import { Singleton } from "../../utils/uitls";
import DayNpcShow from "./model/DayNpcShow";
import { GlobalData } from "../../const/GlobalData";



/**
 * 白天溜达NPC
 */
@Singleton()
export class DayNpc {
    public static instance: DayNpc = null;

    private dayShowNpcArr: Array<DayNpcShow> = [];

    public async init() {

        GameConfig.Monsters.getAllElement().forEach(async (cfg) => {

            let script = await mw.Script.spawnScript(DayNpcShow, true)
            script.init_S(cfg.ID);
            this.dayShowNpcArr.push(script);

        });
    }

    public async recycle() {
        for (let i = 0; i < this.dayShowNpcArr.length; i++) {
            const element = this.dayShowNpcArr[i];
            if (i == this.dayShowNpcArr.length - 1)
                await element.recycleNpc();
            else
                element.recycleNpc();
        }
    }

    public startNpc(npc: mw.Character) {
        let script = this.dayShowNpcArr.find((item) => {
            return item.isUse;
        });

        if (script) {
            script.openPatrol(true);
        } else {
            npc.worldTransform.position = GlobalData.NPC.npcRecyclePoint.clone();
            npc.complexMovementEnabled = false;
            console.error("lwji 没有空闲的NPC");
        }
    }

    public startALLNpc() {
        this.dayShowNpcArr.forEach(async (item) => {
            if (item.isUse)
                await item.openPatrol(true);
        });
    }

    /**跳舞 */
    public danceNpc(guid: string, danceId: number) {
        if (danceId == 0) return;
        let npc = this.dayShowNpcArr.find((item) => {
            return item.modelGuid == guid;
        });
        if (npc) {
            npc.dance_S(danceId);
        }
    }
    /**变身团团 */
    public changeModel(guid: string) {
        let npc = this.dayShowNpcArr.find((item) => {
            return item.modelGuid == guid;
        });
        if (npc) {
            npc.changeModel();
        }
    }

    // public playAni(guid: string) {
    //     let script = this.dayShowNpcArr.find((item) => {
    //         return !item.isUse;
    //     });
    //     script.playAni(guid);
    // }

    // public setLoc(pos: mw.Vector) {
    //     let script = this.dayShowNpcArr.find((item) => {
    //         return !item.isUse;
    //     });
    //     script.setLoc(pos);
    // }




}