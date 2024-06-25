import { GameConfig } from "./config/GameConfig";
import { TestMode } from "./TestMode";

const EventName: string = "MOVER_RESET"
const MoverGuids: string[] = GameConfig.MoverGuids.getAllElement().map((i) => { return i.guid });

@Component
export default class MoverSync extends mw.Script {
    private movers: mw.IntegratedMover[] = [];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            Event.addServerListener(EventName, () => {
                for (let i of this.movers) {
                    i.moverReset();
                }
            });

            this.useUpdate = true;
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        for (let index = 0; index < MoverGuids.length; ++index) {
            let result = GameObject.findGameObjectById(MoverGuids[index]) as mw.IntegratedMover;
            if (result) {
                this.movers.push(result);
                MoverGuids.splice(index, 1);
                index--;
            } else {

            }
        }
        if (this.movers.length == MoverGuids.length) {
            this.useUpdate = false;
        }
    }
}
//测试用流程
if (TestMode.testMode) {
    if (SystemUtil.isClient()) {
        InputUtil.onKeyDown(mw.Keys.O, () => {
            Event.dispatchToServer(EventName);
        });
        Event.addServerListener(EventName, () => {
            Event.dispatchToLocal(EventName);
        });
    } else {
        Event.addClientListener(EventName, () => {
            Event.dispatchToAllClient(EventName);
        })
    }
}