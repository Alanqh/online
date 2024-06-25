import { GameConfig } from "../../../config/GameConfig";
import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
import { SkillManager } from "../../../modules/Skill/SkillManager";
import { Utils } from "../../../tool/Utils";
import { recordCharacter } from "../../CheckPoint/Script/CheckPoint";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 17:26:36
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-22 15:08:13
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\DeathArea\Script\DeathScript.ts
 * @Description  : 死亡区域，碰到就死亡
 */
class DeathCharacter {
    private defualtRespawn: Vector = GameConfig.GameInfo.getAllElement()[0].spawns[0];

    constructor(public character: Character, private time: number = -1, private respawnTimeout = -1) {

    }
    /**死亡 */
    public death() {
        this.time = 1;
        this.respawnTimeout = 2;
        //进入布娃娃，避免再次触发
        this.character.ragdollEnabled = true;
        SkillManager.instance.onHitOrDeath(true);
        Event.dispatchToLocal("Player.Death.Client", this.character.gameObjectId);
    }
    public onUpdate(dt: number) {
        if (this.time > 0) {
            this.time -= dt;
            if (this.time <= 0) {
                Event.dispatchToLocal("Player.Respawn.Req.Client", this.character.gameObjectId);
            }
        } else if (this.respawnTimeout > 0) {
            this.respawnTimeout -= dt;
            if (this.respawnTimeout <= 0) {
                this.onRespawn();
                return true;
            }
        }
        return this.respawnTimeout <= 0;
    }

    /**复活 */
    public onRespawn(respawnLocation?: mw.Vector) {
        this.respawnTimeout = -1;
        if (Utils.illegalParam(respawnLocation)) {
            this.character.worldTransform.position = this.defualtRespawn;
        } else {
            this.character.worldTransform.position = respawnLocation;
        }
        this.character.ragdollEnabled = false;
        recordCharacter && recordCharacter.onRecord();
        Event.dispatchToLocal("Player.Respawn.Success.Client", this.character.gameObjectId);
    }
}
/**当前死亡的玩家 */
let deathCharacter: DeathCharacter;
Event.addLocalListener("Player.Respawn.Rsp.Client", (guid, position: mw.Vector) => {
    deathCharacter && deathCharacter.onRespawn(position);
});

if (SystemUtil.isClient()) {
    const inter = setInterval(() => {
        const player = Player.localPlayer
        if (player) {
            clearInterval(inter);
            deathCharacter = new DeathCharacter(player.character)
            setInterval(() => {
                deathCharacter.onUpdate(1);
            }, 1000)
        }
    }, 100);
}
@Component
export default class DeathScript extends mw.Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as mw.Trigger;
        trigger.onEnter.add(gameObject => {
            if (SystemUtil.isClient()) {
                if (PlayerManagerExtesion.isCharacter(gameObject)) {
                    if (deathCharacter && deathCharacter.character == gameObject) {
                        deathCharacter.death();
                    }
                } else if (PlayerManagerExtesion.isNpc(gameObject)) {
                    Event.dispatchToLocal("AI.Death.Client", gameObject, Utils.localCharacter);
                }
            } else {
                if (PlayerManagerExtesion.isNpc(gameObject)) {
                    Event.dispatchToLocal("AI.Death.Server", gameObject);
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