import { LevelBase } from "../LevelBase";
import { Level_1_C } from "./Level_1_C";
import { Level_1_S } from "./Level_1_S";

/**
 * 关卡挂载脚本
 * 初始化配置表id，初始化双端控制脚本
 * 这些代码是为了后续如果关卡有多种玩法，做扩展用，暂时搁置
 */
@Component
export default class Level_1 extends LevelBase {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.configID = 10001;
        this.init(Level_1_S, Level_1_C);
    }
}