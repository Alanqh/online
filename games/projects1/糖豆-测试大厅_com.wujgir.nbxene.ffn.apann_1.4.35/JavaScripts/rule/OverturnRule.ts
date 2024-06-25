import { ITeamRule } from "../Prefabs/GameStater/Script/data/IRule";
import { Team } from "../Prefabs/GameStater/Script/data/Team";
import { GameConfig } from "../config/GameConfig";
import { ILevelElement } from "../config/Level";
import { Utils } from "../tool/Utils";

export class OverturnRule implements ITeamRule {

    time: number = 0;
    id: number = 1;
    cfg: ILevelElement;
    isStart: boolean = false;

    propPoints: Vector[] = [];
    //道具生成间隔时间
    intervalTime: number = 30;
    //同时生成道具个数
    propCount: number = 3;

    startTime: number = 5;

    isSpawnProp: boolean = false;
    canUpdate: boolean = false;
    spawnTime: number = 0;
    constructor(private team: Team) {
        this.cfg = GameConfig.Level.getElement(this.id);
        this.propPoints = GameConfig.Points.getElement(1).points;
        this.intervalTime = GameConfig.GameParam.getElement(10).value;
        this.propCount = GameConfig.GameParam.getElement(12).value;
        this.startTime = GameConfig.GameParam.getElement(14).value;
    }


    onUpdate(dt: number) {
        if (!this.isStart) {
            this.isStart = true;
            this.team.broadcast("Overturn.Start");
        }
        if (this.cfg) {
            this.time += dt;
            if (this.time >= this.cfg.time) {
                this.updateCells();
                this.id++;
                this.cfg = GameConfig.Level.getElement(this.id);
                if (!this.cfg) {
                    this.team.broadcast("Overturn.Stop");
                }
            }
        }

        if (this.canUpdate) {
            this.spawnTime += dt;
            if (this.spawnTime > this.intervalTime) {
                this.spawnTime = 0;
                this.spawnProp();
            }
        } else {
            console.log(this.spawnTime, this.startTime);

            this.spawnTime += dt;
            if (this.spawnTime > this.startTime) {
                this.canUpdate = true;
                this.spawnTime = 0;
                this.spawnProp();
            }
        }
    }
    spawnProp() {
        const pos: number[] = [];
        const length = this.propPoints.length - 1
        while (pos.length < this.propCount) {
            const index = Math.round(Math.random() * length);
            if (pos.indexOf(index) < 0) {
                pos.push(index)
            }
        }
        console.log("生成道具++++++++++");
        this.team.broadcast("Prop.Spawn", pos);
    }
    updateCells() {
        const graphId = Utils.randomInList(this.cfg.graphId);
        this.team.broadcast("Overturn.Update", graphId);
    }
    onStop() {
        this.canUpdate = false;
        this.team.broadcast("Overturn.End");
    }
}