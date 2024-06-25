import { Singleton } from "../tool/Singleton";
import { MGSBase } from "./MGSBase";
type TimeCache = { guid: string, time: number };
let caches: TimeCache[] = [];
if (SystemUtil.isClient()) {
    Event.addServerListener("MGSAI.postAIPassTime", (time: number) => {
        Singleton.getIns(MGSAI).postAIPassTime(time);
    });
}
else {
    //监听AI 创建
    Event.addLocalListener("AI.Created.Server", (character: Character) => {
        let cache = caches.find(i => i.guid == character.gameObjectId);
        if (!cache) {
            cache = { guid: character.gameObjectId, time: Date.now() };
            caches.push(cache);
        } else {
            cache.time = Date.now();
        }
    });
    let finishHandlr = Event.addLocalListener("FinishLine.Pass.Server", (guid: string) => {
        if (typeof (guid) == "string") {
            let cache = caches.find(i => i.guid == guid);
            if (cache) {
                let startTime = Math.floor((Date.now() - cache.time) / 1000);
                Event.dispatchToAllClient("MGSAI.postAIPassTime", startTime);
                finishHandlr.disconnect();
            }
        }
    });
}
/**
 * 后端AI行为
 */
export class MGSAI extends MGSBase {
    /**
     * ai冲线时间
     * @param time （s）
     */
    postAIPassTime(time: number) {
        this.reportLog("ts_game_over", "首个ai冲线", { king_timeout: time });
    }
}