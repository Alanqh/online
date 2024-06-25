import { GameConfig } from "../../config/GameConfig";
import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerParam } from "../../playerCtrl/PlayerParam";
import { TeamManager } from "../../Prefabs/GameStater/Script/TeamManager";
import { PlayerHudUI } from "../../UI/PlayerHudUI";
import { AIFsm } from "../states/AIFsm";
import { IAIService } from "./IAIService";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-05-29 18:28:44
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-18 09:07:28
 * @FilePath     : \stumbleguys\JavaScripts\AI\client\AIRobot.ts
 * @Description  : 修改描述
 */
const temp: mw.Vector = new mw.Vector(0, 0, 250);
export class AIRobot {


    public fsm: AIFsm;
    private _checkPoint: mw.Vector = new Vector();
    private waypoints: Vector[];
    private deathTime: number = 0;
    private isFinish: boolean = false;
    private _condition: () => boolean;
    private hud: PlayerHudUI;
    public pauseTime: number = 10000;
    public emojiTime: number = 0;
    private emojiObject: mw.Effect;
    private emojiInverval: number = 0;
    private lastReachTime: number = 0;
    private moveDir = new mw.Vector();
    private moveTime: number = 0;
    private walkPauseTime: number = 0;
    public isPassable = false;
    private isChaos: boolean = false;
    private checkPointList: mw.Vector[] = [];
    constructor(public character: Character, private servcie: IAIService, public index: number, public skinId: number, public garnitureId: number, public title: string) {
        this.fsm = new AIFsm(character);
        this.hud = new PlayerHudUI(character, false, "");
        const loc = GameConfig.GameInfo.getElement(1).spawns[index];
        this._checkPoint.set(loc ? loc : GameConfig.GameInfo.getElement(1).spawns[0]);
        this.character.worldTransform.position = this._checkPoint;
        character.forceUpdateMovement = true;
        character.horizontalBrakingDecelerationFalling = PlayerParam.dropSpeed;
        this.emojiInverval = MathUtil.randomFloat(1, 20);
        if (this.emojiInverval >= 5) this.emojiInverval = 0;
        const type = GameConfig.GameInfo.getElement(1).type;
        this.character.addMovement(Vector.up)
        if (type == 2) {
            this.fsm.keepJump(GameConfig.GameCfg.getElement(1).aiJump);
            this.fsm.walkToSafe()
            this.isPassable = true;
        }
        this.lastReachTime = Date.now() + MathUtil.randomFloat(1000, 5000);
    }
    public chaos(isChaos: boolean) {
        this.isChaos = isChaos;
    }
    public set target(loc: mw.Vector) {
        if (loc && this.fsm) {
            this.fsm.target = loc;
        }
    }
    /**
     * 等待条件达到后继续执行
     * @param condition 
     */
    public waitForCondition(condition: () => boolean, range: number) {
        this._condition = condition;
    }
    public moveToObject(obj: mw.GameObject, callback: (npc: Character) => void, success?: (npcLocation: Vector, objectLocation: Vector) => boolean) {
        this.fsm && this.fsm.walkToObject(obj, (owner) => {
            callback(owner);
            if (Math.random() < 0.3 && this.emojiTime <= 0) {
                this.emojiInverval = MathUtil.randomFloat(5, 20);
            }
        }, success);
    }
    public addMoveInput(dir: mw.Vector, time: number, pauseTime: number) {
        if (this.isFinish) return;
        this.pauseTime = 0;
        this.walkPauseTime = pauseTime;
        mw.Vector.add(this.character.worldTransform.position, mw.Vector.multiply(dir, 2000, dir), this.moveDir);
        this.moveTime = time;
    }
    public moveToPoint(position: mw.Vector) {
        this.fsm && this.fsm.walkTo(position);
    }
    public get isWin() {
        return this.isFinish;
    }
    /**
     * 完赛
     */
    public finish(id: number) {
        if (this.isFinish) return false;
        Event.dispatchToLocal("AI.Pass.Client", this.character.gameObjectId);
        this.isFinish = true;
        this.pauseTime = 0;
        this.moveTime = 0;
        this.emojiInverval = MathUtil.randomFloat(5, 20);
        Event.dispatchToLocal("GameState.AddAIWinNum");
        const cfg = GameConfig.GameInfo.getElement(1);
        if (cfg.type == 1) {
            Event.dispatchToServer("AI.Pass.Client", this.character.displayName, this.index, this.skinId, this.garnitureId, this.character.gameObjectId, id);
        } else if (cfg.type == 2) {
            Event.dispatchToServer("AI.Eliminate.Client", this.character.displayName, this.index, this.skinId, this.garnitureId, this.character.gameObjectId, id);
        } else if (cfg.type == 3) {
            Event.dispatchToServer("AI.Pass.Client", this.character.displayName, this.index, this.skinId, this.garnitureId, this.character.gameObjectId, id);

        }
        if (cfg.type == 2) {
            this.fsm && this.fsm.eliminate();
        } else if (cfg.type == 3) {
            //TODO
            this.fsm && this.fsm.watch();
        } else {
            this.fsm && this.fsm.finish();
        }
        return true;
    }
    destroy() {
        if (this.emojiObject) {
            this.emojiObject.forceStop();
            GameObjPool.despawn(this.emojiObject);
            this.emojiObject = null;
        }
        this.character.setCollision(mw.PropertyStatus.Off, true);
        this.character.setVisibility(mw.PropertyStatus.Off, true);
        this.fsm = null;
    }
    death() {
        this.deathTime = 2;
    }
    checkPoint(location: mw.Vector) {
        if (!this.checkPointList.includes(location))
            this.checkPointList.push(location);
        this._checkPoint.set(location);
    }
    hitByGear(gearId: number) {
        let gear = GameConfig.Gear.getElement(gearId);
        if (gear) {
            let aniamtion = PlayerManagerExtesion.loadAnimationExtesion(this.character, "14701", false);
            aniamtion.play();
            this.pauseTime = gear.time;
        }
    }
    public updateHud(dt: number) {
        this.hud && this.hud.onUpdate(dt);
    }
    onUpdate(dt: number) {
        if (!this.fsm) return;
        if (this.pauseTime > 0) {
            this.pauseTime -= dt;
            return;
        }
        if (this.moveTime > 0) {
            this.moveTime -= dt;
            this.character.lookAt(this.moveDir);
            this.character.addMovement(mw.Vector.forward);
            if (this.moveTime <= 0)
                this.pauseTime = this.walkPauseTime;
            return;
        }

        if (this.emojiTime > 0) {
            this.emojiTime -= dt;
            if (this.emojiTime <= 0 && this.emojiObject) {
                GameObjPool.despawn(this.emojiObject);
                this.emojiObject = null;
            }
        }
        if (this.deathTime <= 0) {
            if (this._condition) {
                if (this._condition()) {
                    this._condition = null;
                }
            } else {
                this.fsm.onUpdate(dt);
                if (this.fsm.isFinish || this.fsm.isIdel) {
                    if (this.emojiInverval > 0) {
                        this.emojiInverval -= dt;
                        if (this.emojiInverval <= 0) {
                            this.emoji();
                            this.emojiInverval = this.fsm.isIdel ? MathUtil.randomFloat(8, 15) : MathUtil.randomFloat(8, 20);
                        }
                    }
                }
            }
        } else {
            this.deathTime -= dt;
            if (this.deathTime <= 0) {
                this.reborn();
            }
        }
    }
    public emoji() {
        if (this.emojiObject || this.emojiTime > 0) return;
        this.emojiTime = 1000;
        const cfgs = GameConfig.Item.findElements("type", 2);
        if (cfgs.length > 0) {
            const cfg = cfgs[MathUtil.randomInt(0, cfgs.length)];
            SpawnManager.modifyPoolAsyncSpawn(cfg.resGUID).then((emojiObject: mw.Effect) => {
                if (emojiObject) {

                    this.character.attachToSlot(emojiObject, mw.HumanoidSlotType.Root);
                    if (!emojiObject["created"]) {
                        emojiObject["created"] = true;
                        emojiObject.localTransform.scale = temp.set(3, 3, 3);
                        emojiObject.loop = true;
                    }
                    emojiObject.localTransform.position = temp.set(0, 0, 250);
                    emojiObject.play();
                    this.emojiTime = 2;
                    this.emojiObject = emojiObject;
                }
            });
        }
    }
    public repath(point: string) {
        this.servcie.path.computeById(point, this.servcie.dist);
        this.waypoints = this.servcie.path.waypoints;
        this.fakeWalk(0, true);
    }
    private fakeWalk(pathIndex: number, isForce: boolean) {
        if (this.fsm) {

            if (this.isChaos) {
                this.fsm.walkTo(temp.set(MathUtil.randomFloat(-50000, 50000), MathUtil.randomFloat(-50000, 50000), 0), this.onReached, isForce, 0);
            } else {
                if (this.isPassable) {
                    this.fsm.walkTo(this.waypoints[pathIndex], this.onReached, isForce, 0);
                } else {
                    let offset = 0;
                    if (TeamManager.teams[0].clientCurRound == 2) {
                        offset = (pathIndex + 1) / this.waypoints.length * 2500 + (10 - this.waypoints.length) * 500;
                        if (offset < 0) offset = 0;
                        if ((this.waypoints.length - pathIndex) < 10 || this.waypoints.length < 6) {
                            offset = 1000;
                            isForce = true;
                        }
                    } else if (this.index >= 16) {
                        offset = (pathIndex + 1) / this.waypoints.length * 1500;
                    }
                    this.fsm.walkTo(this.waypoints[pathIndex], this.onReached, isForce, offset);
                }
            }
        } else {
            console.log("__________________Typee_fakeWalk_fsm=null");
        }
    }
    public setPass(isPassable: boolean) {
        this.isPassable = isPassable;
        if (isPassable) {
            this.chaos(false);
        }
    }
    public reborn() {
        this.deathTime = 0;
        if (this.isChaos) {
            //混乱状态随机出生点
            this.character.worldTransform.position = this.checkPointList[MathUtil.randomInt(0, this.checkPointList.length)];
        } else {
            this.character.worldTransform.position = this._checkPoint;
        }
        this.start();
    }
    public start() {
        this.pauseTime = 0;
        if (this.isChaos) {
            this.fakeWalk(0, true);
        } else {
            this.servcie.path.compute(this.character.worldTransform.position, this.servcie.dist);
            this.waypoints = this.servcie.path.waypoints;
            // this.fakeWalk(0, true);
        }
    }
    private onReached = (position: Vector) => {
        const index = this.waypoints.indexOf(position) + 1;
        this.fakeWalk(index, false);
        if (this.lastReachTime < Date.now() && Math.random() < 0.1 && this.emojiTime <= 0) {
            this.lastReachTime = Date.now() + MathUtil.randomFloat(3000, 8000);
            this.emoji();
        }
    }
    public nameSkin(characterName: string) {
        const names = GameConfig.AIName.getAllElement();
        this.character.displayName = characterName ? characterName : LocaleUtil.getDefaultLocale().includes("zh") ? names[MathUtil.randomInt(0, names.length)].name : names[MathUtil.randomInt(0, names.length)].nameEn;
        return false;
    }
}