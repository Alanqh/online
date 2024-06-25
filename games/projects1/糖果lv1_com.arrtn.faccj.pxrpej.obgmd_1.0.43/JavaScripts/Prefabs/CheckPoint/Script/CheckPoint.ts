import { CLAI } from "../../../AI/client/ClientAIService";
import { GameConfig } from "../../../config/GameConfig";
import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../../Modified027Editor/ModifiedSpawn';

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 17:26:36
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-06 10:24:30
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\CheckPoint\Script\CheckPoint.ts
 * @Description  : 死亡区域，碰到就死亡
 */
class RecordCharacter {
    public location: mw.Vector;
    public playerId: number = 0;
    public particle: mw.Effect;
    public checkPoint: number = null;
    public lastRank: number = 0;
    constructor() {
        if (SystemUtil.isClient()) {
            const inter = setInterval(() => {
                const player = Player.localPlayer
                if (player) {
                    this.playerId = player.playerId;
                    //以出生点为第一个复活点
                    this.location = GameConfig.GameInfo.getAllElement()[0].spawns[0];
                    clearInterval(inter);
                }
            }, 100);

            AssetUtil.asyncDownloadAsset("152562").then(() => {
                this.particle = SpawnManager.spawn({ guid: "152562" }) as mw.Effect;
            });
        }
    }

    onRecord() {
        if (this.particle && this.playerId) {
            let player = Player.getPlayer(this.playerId);
            player.character.attachToSlot(this.particle, mw.HumanoidSlotType.Root);
            this.particle.worldTransform.scale = new Vector(2, 2, 2);
            this.particle.loop = false;
            this.particle?.play();
        }
    }
}
/**已经记录的玩家 */
export const recordCharacter: RecordCharacter = new RecordCharacter();
Event.addLocalListener("Player.Respawn.Req.Client", (guid) => {
    recordCharacter.checkPoint && Event.dispatchToLocal("Analyst.Dead", recordCharacter.checkPoint);
    recordCharacter.location && Event.dispatchToLocal("Player.Respawn.Rsp.Client", guid, recordCharacter.location);
});
let isPassed = false;
@Component
export default class CheckPoint extends mw.Script {

    @mw.Property({ displayName: "序号" })
    public order: number = 1;
    @mw.Property({ displayName: "复活范围" })
    public rage: number = 0.8;
    @mw.Property({ displayName: "是否存档" })
    public isCheckPoint: boolean = true;
    @mw.Property({ displayName: "是否保底" })
    public isPassed: boolean = false;

    private rateSize: mw.Vector2 = new Vector2();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        const worldSize = trigger.worldTransform.rotation.rotateVector(trigger.worldTransform.scale);
        this.rateSize.set(worldSize.x * 50, worldSize.y * 50);
        CLAI.addCheckPoint(this);
        trigger.onEnter.add(gameObject => {
            const loc = this.gameObject.worldTransform.position;
            if (loc.equals(Vector.zero)) return;
            if (SystemUtil.isClient()) {
                if (PlayerManagerExtesion.isCharacter(gameObject)) {
                    if (gameObject.player && recordCharacter.playerId == gameObject.player.playerId) {
                        if (this.isCheckPoint) {
                            const xOffset = Math.abs(this.rage * this.rateSize.x);
                            const yOffset = Math.abs(this.rage * this.rateSize.y);
                            loc.x += MathUtil.randomFloat(-xOffset, xOffset);
                            loc.y += MathUtil.randomFloat(-yOffset, yOffset);
                            recordCharacter.location = loc;
                            recordCharacter.checkPoint = this.order;
                            recordCharacter.onRecord();
                        }
                        Event.dispatchToLocal("EnterPointClient", gameObject.gameObjectId, this.order, true);
                        if (!isPassed && this == CLAI.getPassedCheckPoint()) {
                            //如果是保底点，就通知服务器
                            isPassed = true;
                            Event.dispatchToServer("Player.CheckPointPassed.Server");
                        }
                    } else if (gameObject.player && gameObject.getVisibility()) {
                        Event.dispatchToLocal("EnterPointClient", gameObject.gameObjectId, this.order, false);
                    }
                } else if (PlayerManagerExtesion.isNpc(gameObject)) {
                    if (this.isCheckPoint) {
                        loc.x += MathUtil.randomFloat(-this.rage * this.rateSize.x, this.rage * this.rateSize.x);
                        loc.y += MathUtil.randomFloat(-this.rage * this.rateSize.y, this.rage * this.rateSize.y);
                        Event.dispatchToLocal("AI.CheckPoint.Client", gameObject, loc, this);
                    }
                    if (gameObject.getVisibility()) {
                        Event.dispatchToLocal("EnterPointClient", gameObject.gameObjectId, this.order, false);
                    }
                }
            } else {
                if (PlayerManagerExtesion.isNpc(gameObject)) {
                    Event.dispatchToLocal("AI.CheckPoint.Server", gameObject, this.gameObject.worldTransform.position);
                }
            }
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}