import { GameConfig } from "../../config/GameConfig";

type Rang = {
    weight: number,
    min: number,
    max: number,
}
export default class RandomGroup {
    private _weightMap: Map<number, Rang> = new Map();
    private _useWeightMap: Map<number, Rang> = new Map();// 用一个删1个，用完重置
    constructor() {
        let levelConfigs = GameConfig.Level.getAllElement();
        for (let i = 0; i < levelConfigs.length; i++) {
            if (levelConfigs[i].weight == 0) continue;
            this._weightMap.set(levelConfigs[i].id, {
                weight: levelConfigs[i].weight,
                min: 0,
                max: 0
            })
        }
        this.copyMap();
    }

    public getTrapRandomId() {
        let totalW = 0;
        this._useWeightMap.forEach((val) => {
            val.min = totalW;
            totalW += val.weight * 100
            val.max = totalW
        })
        let ran = MathUtil.randomInt(1, totalW);
        let retId = 0
        // 使用对象解析
        for (let [id, value] of this._useWeightMap) {
            if (ran > value.min && ran <= value.max) {
                retId = id
                value.weight = 0
            }
            else {
                value.weight++
            }
        }

        this._useWeightMap.delete(retId);

        if (this._useWeightMap.size == 0) {
            this.copyMap();
        }

        return retId;
    }

    private copyMap() {
        this._useWeightMap.clear();
        this._weightMap.forEach((value, key) => {
            this._useWeightMap.set(key, {
                weight: value.weight,
                min: value.min,
                max: value.max
            });
        })
    }
}