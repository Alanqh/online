import { GameConfig } from "../../../config/GameConfig";

/** buff 类型 */
export enum EBuffType {

    /** 天数经验卡加成 */
    DayExp = 1,

    /** 毒药 */
    Poison = 2,

    /** 毒免 */
    NoPoison = 3,

    /** 掉血 */
    ReduceBlood = 4,
    /** Boss奖励buff */
    BossReward = 5,
}

export default class BuffDefine {

    private constructor() { }

    /**
     * 根据效果值和类型精确找到一个buff配置
     * @param val 效果值
     * @param type 类型
     */
    public static getCfgByValueAndType(val: number, type: number) {
        return GameConfig.Buff.getAllElement().filter(v => { return v.type === type && v.value === val })[0];
    }

    /**
     * 仅根据类型模糊找到一个buff配置
     * @param type 类型
     */
    public static getCfgByType(type: number) {
        return GameConfig.Buff.findElement("type", type);
    }
}
