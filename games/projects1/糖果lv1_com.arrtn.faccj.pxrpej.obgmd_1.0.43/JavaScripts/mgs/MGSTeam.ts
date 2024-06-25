import { MGSBase } from "./MGSBase";

/** 
 * @Author       : weihao.xu
 * @Date         : 2023-05-28 16:15:02
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-05-28 16:29:45
 * @FilePath     : \stumbleguys\JavaScripts\mgs\MGSTeam.ts
 * @Description  : 修改描述
 */
export class MGSTeam extends MGSBase {

    /**
     * 小游戏组队流失
     * @param isTeam 是否组队
     * @param oritSize 初始队伍人数
     * @param curSize 现在队伍人数
     * @param turn 第一轮还是第二轮
     */
    teamSizeLoss(isTeam: number, oriSize: number, curSize: number, turn: number) {
        if (turn === 1) {
            this.reportLog("ts_task", "小游戏房组队占比", { task_id: "team_game01", taskid: isTeam, lifetime: oriSize, task: curSize });
        } else if (turn === 2) {
            this.reportLog("ts_task", "小游戏房组队占比", { task_id: "team_game02", taskid: isTeam, lifetime: oriSize, task: curSize });
        }
    }

}