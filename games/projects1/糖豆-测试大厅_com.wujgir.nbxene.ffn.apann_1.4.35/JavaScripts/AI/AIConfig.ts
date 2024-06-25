/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-05 14:36:33
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-08-20 11:09:32
 * @FilePath     : \stumbleguys\JavaScripts\AI\AIConfig.ts
 * @Description  : 修改描述
 */
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../config/GameConfig";
import { TestMode } from "../TestMode";
import { PlayerParam } from "../playerCtrl/PlayerParam";
import { CLAI } from "./client/ClientAIService";
import { AIConst } from "./hook/AIConst";
import { Humanoid } from "./Humanoid";
import { HumanoidManager } from "./HumanoidManager";
import { Path } from "./path/Path";
import { PathService } from "./path/PathService";
@Component
export default class AIConfig extends mw.Script {

    @mw.Property({ displayName: "路径点根节点" })
    public roadMapGuid: string = ""
    @mw.Property({ displayName: "路径点配置" })
    public roadCfg: string = ""
    @mw.Property({ displayName: "最大跳跃高度" })
    public maxJumpHeight: number = 200;
    @mw.Property({ displayName: "乱走间隔(秒)" })
    public roundWalkInterval: number = 0;
    @mw.Property({ displayName: "最大乱走时间(秒)" })
    public roundWalkTime: number = 0;
    @mw.Property({ displayName: "最大移动速度" })
    public maxWalkSpeed: number = 400;
    @mw.Property({ displayName: "重力缩放" })
    public gravityScale: number = 1;
    private path: Path;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.gravityScale = GameConfig.Swoop.getElement(22).Value;
        this.maxWalkSpeed = 450;
        CLAI.init(this.maxJumpHeight, this.maxWalkSpeed, this.gravityScale)
        PathService.init("", this.roadMapGuid);
        AIConst.gravityScale = this.gravityScale;
        AIConst.roundWalkInterval = this.roundWalkInterval;
        AIConst.roundWalkTime = this.roundWalkTime;

        if (SystemUtil.isClient()) {
            !TestMode.testMode && GameObject.asyncFindGameObjectById(this.roadMapGuid).then(go => {
                //如果没有找到可能是淘汰关卡
                go && go.setVisibility(mw.PropertyStatus.Off, true);
            });
            return;
        }
        Event.addLocalListener("AI.Path.Export", () => {
            if (this.path) {
                PathService.parseRoadMap().then(() => {
                    Event.dispatchToAllClient("AI.Path.Export", PathService.export().toString());
                });
            }
        });

        PathService.createPath().then(path => {
            this.path = path;
        });
        // Event.addLocalListener("GameState.EliminatePlayer.Server", (guid: string) => {
        //     //AI死亡
        //     GameObject.asyncFindGameObjectById(guid).then(character => {
        //         const humanoid = character["ai"] as Humanoid;
        //         humanoid.death();
        //     });
        // });
        Event.addLocalListener("AI.Created.Server", (character: Character, dist: mw.Vector, cfg) => {
            character.maxJumpHeight = this.maxJumpHeight;
            character.maxWalkSpeed = this.maxWalkSpeed;
            character.gravityScale = this.gravityScale;
            character.collisionWithOtherCharacterEnabled = false;
            const humanoid = HumanoidManager.addHumanoid(character, dist, cfg);
            humanoid.switchToWalk();
            if (this.path) {
                makeWaypoint(this.path);
            } else {
                const inter = setInterval(() => {
                    if (this.path) {
                        makeWaypoint(this.path);
                        clearInterval(inter);
                    }
                }, 100);
            }

            function makeWaypoint(path) {
                path.compute(character.worldTransform.position, dist);
                humanoid.setWalkPoints(path.waypoints);
            }
        });
        Event.addLocalListener("GEAR_EFF_BY_CFG", (character: Character | string) => {
            let humanoid: Humanoid = null;
            if (typeof (character) == "string") {
                const c = GameObject.findGameObjectById(character);
                humanoid = c && c["ai"];
            } else {
                humanoid = character["ai"] as Humanoid;
            }
            if (humanoid) {
                humanoid.beHit();
            }
        });
        Event.addLocalListener("AI.Repath.Server", (character: Character, point: string) => {
            const humanoid = character["ai"] as Humanoid;
            if (humanoid && humanoid.dist && this.path) {
                this.path.computeById(point, humanoid.dist);
                humanoid.setWalkPoints(this.path.waypoints);
            }
        });
        Event.addLocalListener("AI.Death.Server", (character: Character) => {
            const humanoid = character["ai"] as Humanoid;
            humanoid.death();
        });
        Event.addLocalListener("AI.Respawn.Server", (character: Character) => {
            const humanoid = character["ai"] as Humanoid;
            this.path.compute(character.worldTransform.position, humanoid.dist);
            humanoid.setWalkPoints(this.path.waypoints);
        });
        Event.addLocalListener("AI.CheckPoint.Server", (character: Character, position: mw.Vector) => {
            const humanoid = character["ai"] as Humanoid;
            humanoid.checkpoint(position);
        });

        this.useUpdate = SystemUtil.isServer();
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        HumanoidManager.onUpdate(dt);
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}

AddGMCommand("导出AI路点", null, () => {
    Event.dispatchToLocal("AI.Path.Export");
})
if (SystemUtil.isPIE) {

    Event.addServerListener("AI.Path.Export", (text: string) => {
        const ui = mw.InputBox.newObject(mw.UIService.canvas);
        ui.position = new mw.Vector2(1000, 400);
        ui.textLengthLimit = 99999999;
        ui.text = text;
    });
}