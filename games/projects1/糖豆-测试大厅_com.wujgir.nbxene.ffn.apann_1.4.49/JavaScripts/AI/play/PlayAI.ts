import { GameConfig } from "../../config/GameConfig";
import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerParam } from "../../playerCtrl/PlayerParam";
import { TestMode } from "../../TestMode";
import { Utils } from "../../tool/Utils";
import { PlayerHudUI } from "../../UI/PlayerHudUI";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-04-06 17:50:19
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-11-02 09:49:39
 * @FilePath     : \stumbleguys\JavaScripts\AI\play\PlayAI.ts
 * @Description  : 演出AI，用于过关后的客户端AI
 */
const TEMP_ROTATION = new mw.Rotation();
export namespace PlayAIPool {
    const npcList: Character[] = [];
    let index = 0;
    export function init() {
        const inter = setInterval(() => {
            SpawnManager.asyncSpawn({ guid: "NPC", replicates: false, transform: new mw.Transform(new mw.Vector(0, 0, -20000), mw.Rotation.zero, mw.Vector.one) }).then((npc: Character) => {
                if (typeof npc == undefined) return;
                npcList.push(npc);
                npc.asyncReady().then(() => {
                    npc.maxWalkSpeed = PlayerParam.maxWalkSpeed
                    npc.collisionWithOtherCharacterEnabled = false;
                    npc.groundFrictionEnabled = false;
                    npc.brakingDecelerationWalking = PlayerParam.defaultdelSpeed
                    npc.maxAcceleration = PlayerParam.oriAcceleration
                    npc.groundFriction = 0
                    npc.rotateRate = PlayerParam.oriRotateSpeed

                    AssetUtil.asyncDownloadAsset("154704").then(() => {
                        PlayerManagerExtesion.changeBaseStanceExtesion(npc, "154704");
                    });
                })
                if (npcList.length == 11) {
                    clearInterval(inter);
                }

            });
        }, TestMode.testMode ? 500 : 4000);
    }

    export function show(host: Character, skinId: number, garnitureId: number, name: string) {
        return new PlayAI(host, skinId, garnitureId, name).ready();
    }
    export function reset() {
        index = 0;
    }
    export function getNPC() {
        if (index < npcList.length) {
            return npcList[index++];
        }
        return null;
    }

    // if (SystemUtil.isClient()) {
    //     setTimeout(() => {
    //         init();
    //     }, testMode ? 1000 : 10000);
    // }
}
class PlayAI {
    private character: Character;
    private transform: mw.Transform;
    private hud: PlayerHudUI;
    constructor(host: Character, private skinId: number, private garnitureId: number, private characterName: string) {
        host && (this.transform = host.worldTransform.clone());
    }

    public async ready() {
        if (!this.transform) return false;
        this.character = PlayAIPool.getNPC();
        if (!this.character) return false;
        this.character.displayName = this.characterName;
        this.hud = new PlayerHudUI(this.character, true, "");
        this.character.worldTransform = this.transform;
        await this.changeSkin();
        new MoveRandom(this.character);
        return true;
    }
    private async changeSkin() {
        const cfg = GameConfig.Item.getElement(this.skinId);
        this.character["skinId"] = this.skinId;
        const v1Human = this.character.description;
        v1Human.base.wholeBody = cfg.resGUID;
        const gCfg = GameConfig.Item.getElement(this.garnitureId);
        if (gCfg) {
            this.character["tailCache"] = await Utils.garniture(this.character, gCfg.resGUID.toString(), gCfg.location, TEMP_ROTATION.set(gCfg.rotation.x, gCfg.rotation.y, gCfg.rotation.z));
        } else {
            console.log("garnitureId miss", this.garnitureId);
        }

    }
}

class MoveRandom {
    private targetPoint: mw.Vector;
    private inter = null;
    constructor(private character: Character) {
        this.targetPoint = new mw.Vector();
        const a = this.character.worldTransform.rotation.z * Math.PI / 180 + MathUtil.randomInt(-Math.PI, Math.PI) / 3;
        const r = MathUtil.randomInt(200, 600);
        this.targetPoint.set(Math.cos(a) * r + character.worldTransform.position.x, Math.sin(a) * r + character.worldTransform.position.y, character.worldTransform.position.z);
        this.inter = setInterval(this.onUpdate, 1);
    }

    private onUpdate = () => {
        this.character.lookAt(this.targetPoint);
        this.character.addMovement(mw.Vector.forward);
        if (mw.Vector2.squaredDistance(this.targetPoint, this.character.worldTransform.position) <= 6000) {
            //到达目标点
            this.inter && clearInterval(this.inter);
        }
    }
}

