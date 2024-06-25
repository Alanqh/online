import { GameConfig } from "../../config/GameConfig";
import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerParam } from "../../playerCtrl/PlayerParam";
import CheckPoint from "../../Prefabs/CheckPoint/Script/CheckPoint";
import FinishLine from "../../Prefabs/FinishLine/Script/FinishLine";
import { Team } from "../../Prefabs/GameStater/Script/data/Team";
import { LifeState } from "../../Prefabs/GameStater/Script/LifeState";
import { TeamManager } from "../../Prefabs/GameStater/Script/TeamManager";
import { Utils } from "../../tool/Utils";
import { VerHelper } from "../../VerHelper";
import { Path } from "../path/Path";
import { PathService } from "../path/PathService";
import { Swoop } from "../Swoop";
import { AIRobot } from "./AIRobot";
import { IAIService } from "./IAIService";
import { PassStageAI } from "./PassStagetAI";
const temp = new Vector();
const outTransform = new mw.Transform(new Vector(-20000, -30000, -50000), mw.Rotation.zero, mw.Vector.one);
class ClientAIService implements IAIService {
    private count: number = 0;
    private currentSpawn: number = 0;
    private isCreating: boolean = true;
    private robots: AIRobot[] = [];
    public path: Path;
    private swoops: Swoop[] = [];
    /**
     * 目的地
     */
    public dist: mw.Vector;
    private maxJumpHeight: number = 400;
    private maxWalkSpeed: number = 450;
    private team: Team = null;
    private birthRotation: mw.Rotation = mw.Rotation.zero;
    private isStop: boolean = false;
    private readonly _isActive = true;
    private emojiCount = 0;
    private checkPoints: CheckPoint[] = [];
    private isCheckPointOrder = false;
    private passedAI: PassStageAI[] = [];
    public passedNum: number[] = [];
    private finishObject: FinishLine;
    public init(maxJumpHeight: number, maxWalkSpeed: number, gravityScale: number) {
        this.maxJumpHeight = maxJumpHeight;
        this.maxWalkSpeed = maxWalkSpeed;
        // Event.addLocalListener("GameState.CountDown.Client", () => {
        //     this.robots.forEach(robot => {
        //         robot.pauseTime = 0;
        //     });
        // });

        Player.asyncGetLocalPlayer().then(player => {
            const inter = setInterval(() => {
                this.team = TeamManager.getTeam(player.teleportId);
                if (this.team) {
                    clearInterval(inter);
                }
            }, 1000);
        });
        Event.addServerListener("PassAI.Birth", (id: number) => {
            const robot = this.robots.find(i => !i.isPassable);
            if (!robot) return;
            const passAI = new PassStageAI(id, robot);
            this.passedAI.push(passAI);
            passAI.start();
        });
        Event.addServerListener("AI.Passed.Finish", (id: number) => {
            const passAI = this.passedAI.find(i => i.id == id);
            if (passAI && this.finishObject && !passAI.isFinish) {
                passAI.isFinish = true;
                temp.set(this.finishObject.gameObject.worldTransform.position);
                const scale = Math.min(this.finishObject.gameObject.worldTransform.scale.x, this.finishObject.gameObject.worldTransform.scale.y) * 1.2;
                if (mw.Vector2.squaredDistance(temp, passAI.ai.character.worldTransform.position) > 10000 * scale * scale) {
                    //距离超出
                    temp.x += MathUtil.randomFloat(-100, 100);
                    temp.y += MathUtil.randomFloat(-100, 100);

                    passAI.ai.character.worldTransform.position = temp;
                }
            }
        });
        Event.addServerListener("PassAI.Stop", (id: number) => {
            const passAI = this.passedAI.find(i => i.id == id);
            if (passAI) {
                passAI.stop();
            }
        });
        Event.addLocalListener("Player.Emoji", (position: mw.Vector) => {
            this.emojiCount = 0;
            for (let i = 0; i < this.robots.length; i++) {
                if (this.emojiCount > 2) break;
                const distance = mw.Vector2.squaredDistance(position, this.robots[i].character.worldTransform.position);
                if (this.robots[i].emojiTime <= 0 && distance < 90000) {
                    if (Math.random() < 0.6 - distance / 90000) {
                        this.robots[i].emoji();
                        this.emojiCount++;
                    }
                }
            }

        });

        Event.addLocalListener("AI.WalkAround", () => {
            this.robots.forEach(robot => {
                robot.fsm.keepJump(false);
                robot.fsm.walkAround();
            });
        });
        Event.addLocalListener("GameState.CountDown.Client", () => {
            this.robots.forEach(robot => {
                robot.pauseTime = 0;
                const setting = GameConfig.GameInfo.getElement(1);
                if (setting.type == 1) {
                    const cfg = GameConfig.WallPos.getElement(1).wallTrans;
                    const size = new Rotation(cfg[1].x, cfg[1].y, cfg[1].z).rotateVector(cfg[2]);
                    let vec = cfg[0].clone();
                    vec.x += MathUtil.randomFloat(-size.x * 50, size.x * 50);
                    vec.y += MathUtil.randomFloat(-size.y * 50, size.y * 50);
                    robot.fsm.walkTo(vec, () => { }, true);
                } else {
                    // robot.fsm.walkAround();
                }
            });
        });
        Event.addLocalListener("GameState.Gameing.Client", () => {
            // setTimeout(() => {
            this.robots.forEach(robot => {
                robot.pauseTime = 0;
                robot.target = this.dist;
                robot.start();
                const setting = GameConfig.GameInfo.getElement(1);
                if (setting.type == 2 || setting.type == 3) {
                    robot.fsm.walkAround();
                }
            });
            // }, 1000);
        });

        Event.addLocalListener("AIRobot.Chaos", (character: Character) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot && !robot.isPassable) {
                //开始乱走
                robot.chaos(true);
            }
        });
        Event.addLocalListener("AI.Death.Client", (character: Character) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot) {
                robot.death();
            }
        });
        Event.addLocalListener("Npc.Impluse", (character: Character, force: mw.Vector) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot) {
                character.addImpulse(force, true);
            }
        });
        Event.addLocalListener("Npc.OnHit", (character: Character, gearId: number) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot) {
                robot.hitByGear(gearId);
            }
        });
        Event.addLocalListener("AI.CheckPoint.Client", (character: Character, location: mw.Vector, checkPoint: CheckPoint) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot) {
                robot.checkPoint(location);
                if (!robot.isPassable && this.getCheckPoint(99) == checkPoint) {
                    //是最后检查点,普通AI扔到前面任意一个检查点
                    this.moveBack(robot);
                }
            }

        });
        Event.addLocalListener("AI.Repath.Client", (character: Character, point: string) => {
            const robot = this.robots.find(i => i.character == character);
            if (robot) {
                robot.repath(point);
            }
        });

        PathService.createPath().then(path => {
            this.path = path;
            this.isCreating = false;
        });
    }
    /**
     * 非通关AI仍到其他地方
     */
    private moveBack(robot: AIRobot) {
        const cp = this.getCheckPoint(MathUtil.randomInt(1, this.checkPoints.length - 1), -5);
        if (!cp) return;
        Event.dispatchToLocal("AI.MoveBack.Client", robot.character);
        robot.checkPoint(cp.gameObject.worldTransform.position);
        robot.reborn();
    }

    public getRobot(other: Character) {
        return this.robots.find(i => i.character == other);
    }
    /**
     * 保留AI
     * @param remaindAICount 保留的AI数量
     */
    public keepAI(remaindAICount: number) {
        if (remaindAICount >= 0) {
            const aliveAis = this.robots.filter(i => !i.isWin);
            if (remaindAICount < aliveAis.length) {
                for (let i = remaindAICount; i < aliveAis.length; i++) {
                    aliveAis[i].destroy();
                }
            }
        }
    }
    public isActive() {
        return this._isActive;
    }
    public stop() {
        this.isStop = true;
        for (let i of this.swoops) {
            i.stop();
        }
        this.swoops = [];
        for (let i of this.robots) {
            i.character.currentAnimation?.stop();
        }
    }
    public getAllRobots() {
        return this.robots;
    }
    /**
     * 找一个对应的character；
     * @param guid 
     * @returns 
     */
    public getAICharacter(guid: string): AIRobot {
        const robot = this.robots.find(i => i.character.gameObjectId == guid);
        return robot;
    }
    /**
     * 
     * @returns 获取任意一个NPC对象
     */
    public getWinCharacter(): AIRobot {
        const cfg = GameConfig.GameInfo.getElement(1);
        if (cfg.type == 1) {
            // 竞速没有人就没有人吧
            return this.robots.find(i => i.isWin)
        } else {
            return this.robots.find(i => !i.isWin) || this.robots[0];
        }
    }
    public hasAI(character: Character) {
        const robot = this.robots.find(i => i.character == character);
        return robot != null;
    }
    public finishLine(object: FinishLine) {
        this.finishObject = object;
    }

    /**
     * AI冲过终点
     */
    public finish(character: Character) {
        const robot = this.robots.find(i => i.character == character);
        if (robot) {
            const passAI = this.passedAI.find(i => i.ai == robot);
            const config = GameConfig.GameInfo.getElement(1)
            const gameType = config.type
            if (gameType == 2) {
                robot.finish(0);
            } else if (gameType == 3) {
                let id = Player.localPlayer.playerId * 100000 + this.passedNum.length;
                if (!this.passedNum.includes(id) && this.passedNum.length < config.playerNum) {
                    this.passedNum.push(id);
                    robot.finish(id);
                }
            } else if (passAI && robot.isPassable) {
                robot.finish(passAI.isFinish ? 0 : passAI.id);
                passAI.isFinish = true;
            } else {
                this.moveBack(robot);
            }
        }

    }
    public spawn(count: number) {
        if (!this._isActive) return;
        Utils.downloadAsset("NPC").then(() => {
            this.count = count;
        });

    }
    waitForCondition(character: Character, isCondition: () => boolean, range: number) {
        const robot = this.robots.find(i => i.character == character);
        if (robot) {
            robot.waitForCondition(isCondition, range);
        }
    }

    public birth(dist: mw.Vector, rotation: mw.Rotation) {
        this.dist = dist;
        this.birthRotation = rotation;
    }
    swoop(character: Character, timeOut: number) {
        if (this.hasAI(character)) {
            if (this.swoops.find(i => i.humanoid == character)) return;
            this.swoops.push(new Swoop(character, timeOut));
        }
    }
    public onUpdate(dt: number) {
        for (let i = 0; i < this.robots.length; i++) {
            this.robots[i].updateHud(dt);
        }
        if (this.isStop) return;
        if (this.currentSpawn < this.count && !this.isCreating) {
            this.isCreating = true;
            const avatarCfgs = GameConfig.AvatarAI.getAllElement();
            const avatarCfg = avatarCfgs[MathUtil.randomInt(0, avatarCfgs.length - 1)];
            this.createAI("", avatarCfg.cloth, avatarCfg.trailer[0], 12 + this.currentSpawn, VerHelper.getVerSingleCfg(avatarCfg), () => {
                this.currentSpawn++;
                this.isCreating = false;
            });
        }

        for (let i = 0; i < this.robots.length; i++) {
            if (this.team && this.team.state == LifeState.Gameing && this.robots[i].pauseTime > 10) {
                this.robots[i].target = this.dist;
                this.robots[i].start();
            }
            this.robots[i].onUpdate(dt);
        }
        for (let i = 0; i < this.swoops.length; i++) {
            if (this.swoops[i].onUpdate(dt)) {
                this.swoops.splice(i, 1);
                i--;
            }
        }
    }


    public createAI(characterName: string, skinId: number, garnitureId: number, seat: number, title: string, callback?: (robot: AIRobot) => void) {
        SpawnManager.asyncSpawn({ guid: "NPC", transform: outTransform }).then((npc: Character) => {
            npc.worldTransform.rotation = this.birthRotation;
            npc.collisionWithOtherCharacterEnabled = false;
            npc.asyncReady().then(async () => {
                npc.maxWalkSpeed = this.maxWalkSpeed;
                npc.groundFrictionEnabled = false;
                npc.brakingDecelerationWalking = PlayerParam.defaultdelSpeed
                npc.groundFriction = 0
                npc.maxAcceleration = PlayerParam.oriAcceleration
                npc.rotateRate = PlayerParam.oriRotateSpeed
                npc.maxJumpHeight = this.maxJumpHeight;
                npc.gravityScale = GameConfig.Swoop.getElement(22).Value;
                //npc使用和玩家一样的参数
                npc.driftControl = GameConfig.Swoop.getElement(19).Value;
                // npc.airControlBoostMultiplier = GameConfig.Swoop.getElement(20).Value
                // npc.airControlBoostVelocityThreshold = GameConfig.Swoop.getElement(21).Value
                npc.maxFallingSpeed = GameConfig.Swoop.getElement(18).Value
                npc.maxStepHeight = 45;
                npc.description.base.wholeBody = GameConfig.Item.getElement(skinId).resGUID;
                // npc.characterType = mw.AppearanceType.HumanoidV1;
                // const appearance = npc.getAppearance() as mw.HumanoidV1;
                // appearance.description.advance.base.characterSetting.somatotype = (mw.SomatotypeV1.HumanoidV1Eggy, false);
                // appearance.description.base.wholeBody = (GameConfig.Item.getElement(skinId).resGUID, false);
                await npc.asyncReady();
                const robot = new AIRobot(npc, this, seat, skinId, garnitureId, title);
                this.robots.push(robot);
                robot.nameSkin(characterName);
                Event.dispatchToLocal("AI.Create.Client", npc);
                Utils.downloadAsset("154704").then(() => {
                    PlayerManagerExtesion.changeBaseStanceExtesion(npc, "154704");
                });

                SpawnManager.asyncSpawn({ guid: GameConfig.Item.getElement(garnitureId).resGUID }).then((particle: mw.Effect) => {
                    npc.attachToSlot(particle, mw.HumanoidSlotType.Buttocks);
                    particle.localTransform.position = mw.Vector.zero;
                    particle.loop = true;
                    particle.play();
                    callback && callback(robot);
                });
            });

        });
    }
    public addCheckPoint(checkPoint: CheckPoint) {
        this.checkPoints.push(checkPoint);
    }

    public getPassedCheckPoint() {
        const ckp = this.checkPoints.find(i => i.isPassed);
        if (!ckp) {
            if (!this.isCheckPointOrder) {
                this.isCheckPointOrder = true;
                this.checkPoints.sort((a, b) => a.order - b.order);
            }
            return this.checkPoints[Math.floor(this.checkPoints.length / 2) + 1];
        }
        return ckp;
    }

    public getCheckPoint(id: number, orderIndex: number = -1) {
        const ckp = this.checkPoints.find(i => i.order == id);
        if (!ckp) {
            if (!this.isCheckPointOrder) {
                this.isCheckPointOrder = true;
                this.checkPoints.sort((a, b) => a.order - b.order);
            }
            return this.checkPoints[Math.max(0, this.checkPoints.length + orderIndex)];
        }
        return ckp;
    }
}

export const CLAI = new ClientAIService();