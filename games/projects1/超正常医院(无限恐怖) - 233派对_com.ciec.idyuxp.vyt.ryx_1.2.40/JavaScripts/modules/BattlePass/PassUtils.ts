import { GlobalData } from "../../const/GlobalData";

export default class PassUtils {

    
    /**获取当前等级 */
    public static getCurLevel(score: number): number{
        let level = Math.floor(score / GlobalData.BattlePass.expPerLevel);
        return Math.min(level, GlobalData.BattlePass.maxLevel);
    }
}