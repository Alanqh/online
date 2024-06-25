import { LevelBase } from "../LevelBase";
import { Level_Normal_C } from "./Level_Normal_C";
import { Level_Normal_S } from "./Level_Normal_S";


/**
 * 常规关卡脚本，无自定义功能
 */
@Component
export default class Level_Normal extends LevelBase {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        // this.configID = 10001;
        this.init(Level_Normal_S, Level_Normal_C);
    }
}