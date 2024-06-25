import { GameConfig } from "../../config/GameConfig";

export default class PropSaveData {

    /**道具表id */
    id: number;
    /**数量 */
    count: number;
    /**是否为永久 */
    isForever: boolean;
    /**解锁时间 */
    unlockTime: number;
    /**试用时间 (默认为-1, 非限时道具) */
    tryTime: number;
    /**是否只能拥有一个 */
    isSingle: boolean;
    /**剩余时间 */
    remain: number;

    constructor(id: number, isForever: boolean, tryTime: number = -1, count: number = 1) {
        this.id = id;
        this.count = count;
        this.isForever = isForever;
        this.unlockTime = TimeUtil.time();
        this.tryTime = tryTime;
        let conf  = GameConfig.Item.getElement(id);
        this.isSingle = conf.IsSingle;
    }
    
}