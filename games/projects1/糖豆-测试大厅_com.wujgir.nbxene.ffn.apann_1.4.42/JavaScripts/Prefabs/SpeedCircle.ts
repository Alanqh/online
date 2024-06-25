import { CLAI } from "../AI/client/ClientAIService";
import { ModifiedCameraSystem } from '../Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion } from '../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';

class SpeedPlayerManager {
    private time: number = 0;
    private characters: Character[] = [];
    constructor() {
        setInterval(() => {
            const now = Date.now();
            if (this.time) {
                const passed = (now - this.time) / 1000;
                for (let i = 0; i < this.characters.length; i++) {
                    const character = this.characters[i];
                    character["speedTime"] -= passed;
                    if (character["speedTime"] <= 0) {
                        this.characters.splice(i, 1);
                        character["speedEffect"] && character["speedEffect"]["effect"] && character["speedEffect"].forceStop()
                        character["speedEffect"] && character["speedEffect"].destroy();
                        character["speedEffect"] = null;
                        i--;
                        character.maxWalkSpeed = 450;
                    }
                }
            }
            this.time = now;
        }, 1);
    }

    public push(character: Character, time: number, effect: string) {
        if (!this.characters.includes(character)) {
            this.characters.push(character);
            effect && SpawnManager.asyncSpawn({ guid: effect }).then((obj: mw.Effect) => {
                obj.loop = true;
                obj.play();
                character.attachToSlot(obj, mw.HumanoidSlotType.Buttocks);
                obj.localTransform.position = mw.Vector.zero;
                character["speedEffect"] = obj;
            });
        }
        character["speedTime"] = time;
    }
}
let manager: SpeedPlayerManager;
if (SystemUtil.isClient()) {
    manager = new SpeedPlayerManager();
} else {
    Event.addClientListener("SpeedCircle.Impluse", (player, guid: string, impluse: mw.Vector) => {
        GameObject.asyncFindGameObjectById(guid).then((npc: Character) => {
            if (npc) {
                npc.addImpulse(mw.Vector.subtract(impluse, npc.velocity, temp), true);
            }
        });
    });
}
const temp = new mw.Vector();
@Component
export default class SpeedCircle extends mw.Script {
    @mw.Property({ displayName: "最大速度" })
    private speed: number = 1000;
    @mw.Property({ displayName: "施加冲量" })
    private impluse: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "持续时间" })
    private time: number = 10;
    @mw.Property({ displayName: "拖尾特效" })
    private effect: string = "27392";
    @mw.Property({ displayName: "是否开启控制", group: "角色摄像机旋转控制" })
    private isControlCamera: boolean = false;
    @mw.Property({ displayName: "旋转时间", group: "角色摄像机旋转控制" })
    private rotateTime: number = 1.5;
    @mw.Property({ displayName: "目标角度", group: "角色摄像机旋转控制" })
    private targetAngle: Rotation = new Rotation(0, 0, 90);
    @mw.Property({ displayName: "gearId" })
    public _gearId: number = 9;
    private player: mw.Player;

    private cameraTween: mw.Tween<{ rot: mw.Rotation; }>;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            let camera = Camera.currentCamera;
            const trigger = this.gameObject as mw.Trigger;
            trigger.onEnter.add((obj) => {
                if (obj instanceof Character) {
                    obj.maxWalkSpeed = this.speed;
                    this.effect && manager && manager.push(obj, this.time, this.effect);
                    if (!this.impluse.equals(mw.Vector.zero)) {
                        if (PlayerManagerExtesion.isNpc(obj)) {
                            if (!this.player) {
                                this.player = player;
                            }
                            if (CLAI.hasAI(obj)) {
                                obj.addImpulse(mw.Vector.subtract(this.impluse, obj.velocity, temp), true);
                            } else {
                                this.isController && Event.dispatchToServer("SpeedCircle.Impluse", obj.gameObjectId, this.impluse);
                            }
                        } else {
                            (obj as Character).addImpulse(mw.Vector.subtract(this.impluse, (obj as Character).velocity, temp), true);
                            Event.dispatchToLocal("GEAR_EFF_BY_CFG", player.character.gameObjectId, this._gearId, player.character.worldTransform.position);
                            if (obj === player.character && this.isControlCamera) {
                                this.cameraTween && this.cameraTween.stop();
                                this.cameraTween = new mw.Tween({ rot: camera.worldTransform.clone().rotation }).to({ rot: this.targetAngle }, this.rotateTime * 1e3).onUpdate(obj => {
                                    ModifiedCameraSystem.setOverrideCameraRotation(obj.rot);
                                }).onComplete(() => {
                                    ModifiedCameraSystem.resetOverrideCameraRotation();
                                    player.character.movementEnabled = true;
                                })
                                this.cameraTween?.start();
                                player.character.movementEnabled = false;
                            }
                        }
                    }
                }
            });
        })
    }
    private get isController() {
        const players = Player.getAllPlayers();
        return this.player == players[MathUtil.randomInt(0, players.length)];
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