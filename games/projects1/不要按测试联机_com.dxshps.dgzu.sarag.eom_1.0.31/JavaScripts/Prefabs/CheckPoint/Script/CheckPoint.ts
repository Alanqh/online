import { GameEventC2C, TrapEventC2C } from '../../../const/GameCommonEvent';
import { AIManager_C } from '../../../modules/aIModule/AIManager_C';
import GameComUtils from '../../../utils/GameComUtils';

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 17:26:36
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-04 09:48:52
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\CheckPoint\Script\CheckPoint.ts
 * @Description  : 死亡区域，碰到就死亡
 */
class RecordCharacter {
    public checkPoint: number = -1;
    public centerPoint: mw.Vector = null;
    public size: mw.Vector2 = null;
}
/**已经记录的玩家 */
export const recordCharacter: RecordCharacter = new RecordCharacter();
// 清楚记录
Event.addLocalListener(TrapEventC2C.TRAP_CLEAN_RECORD_C2C, () => {
    recordCharacter.checkPoint = -1;
    recordCharacter.centerPoint = null;
    recordCharacter.size = null;
})

@Component
export default class CheckPoint extends mw.Script {
    @mw.Property({ displayName: "序号" })
    public order: number = 1;

    @mw.Property({ displayName: "相对于触发器高度的偏移(复活高度)" })
    public offsetHeight: number = 0;

    private rateSize: mw.Vector2 = new Vector2();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) return;

        const trigger = this.gameObject as mw.Trigger;
        const worldSize = trigger.worldTransform.rotation.rotateVector(trigger.worldTransform.scale);
        this.rateSize.set(worldSize.x * 50, worldSize.y * 50);
        trigger.onEnter.add(gameObject => {
            const loc = this.gameObject.worldTransform.position.clone().add(new Vector(0, 0, this.offsetHeight));
            if (loc.equals(Vector.zero)) return;

            // if (PlayerManagerExtesion.isNpc(gameObject)){
            //     oTrace('guan log 修改AI位置');
            //     loc.x += MathUtil.randomFloat(-this.rage * this.rateSize.x, this.rage * this.rateSize.x);
            //     loc.y += MathUtil.randomFloat(-this.rage * this.rateSize.y, this.rage * this.rateSize.y);
            //     Event.dispatchToLocal("AI.CheckPoint.Client", gameObject, loc);
            //     return
            // }
            if (gameObject instanceof Character) {
                let aiCheckPointInfo = AIManager_C.Instance.findAICheckPointInfoByObj(gameObject);
                if (aiCheckPointInfo && aiCheckPointInfo.checkPoint < this.order) {
                    aiCheckPointInfo.checkPoint = this.order;
                    aiCheckPointInfo.centerPoint = loc;
                    aiCheckPointInfo.size = this.rateSize;
                    return;
                }
            }

            if (!GameComUtils.check_isLocalPlayer(gameObject)) {
                return
            }
            if (recordCharacter.checkPoint >= this.order) {//玩家存档点大于或等于当前点，不处理
                return
            }
            recordCharacter.centerPoint = loc;
            recordCharacter.size = this.rateSize;
            recordCharacter.checkPoint = this.order;
            // Event.dispatchToLocal("EnterPointClient", gameObject.gameObjectId, this.order, true);
            Event.dispatchToLocal(GameEventC2C.GAME_CHECKPOINT_C2C, this.order);
        });
    }
}