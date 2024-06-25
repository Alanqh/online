import { GameConfig } from "../../../../config/GameConfig";
import { EGameTheme } from "../../../Defines";
import GameStart from "../../../GameStart";

export default class BirthInfoHelper {

    private static _instance: BirthInfoHelper;

    public static get instance() {
        if (!this._instance) {
            this._instance = new BirthInfoHelper();
        }
        return this._instance;
    }

    private constructor() { }

    private _birthIndex: number;

    private _birthPos: Vector;

    public get birthPos() {
        if (!this._birthPos) {
            if (GameStart.GameTheme === EGameTheme.Graveyard) {
                let startPosArr = GameConfig.Global.StartPos.locations;
                if (!this._birthIndex) { this._birthIndex = MathUtil.randomInt(0, startPosArr.length); }
                this._birthPos = startPosArr[this._birthIndex];
            } else {
                this._birthPos = GameConfig.Global.StartPos.vector;
            }
        }
        return this._birthPos;
    }

    private _birthRot: Rotation;

    public get birthRot() {
        if (!this._birthRot) {
            if (GameStart.GameTheme === EGameTheme.Graveyard) {
                let startRotArr = GameConfig.Global.StartRot.locations;
                if (!this._birthIndex) { this._birthIndex = MathUtil.randomInt(0, startRotArr.length); }
                let tempVec = startRotArr[this._birthIndex];
                this._birthRot = new Rotation(tempVec.x, tempVec.y, tempVec.z);
            } else {
                let tempVec = GameConfig.Global.StartRot.vector;
                this._birthRot = new Rotation(tempVec.x, tempVec.y, tempVec.z);
            }
        }
        return this._birthRot;
    }
}