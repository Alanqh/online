/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-21 10:36:36
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-02-21 10:51:34
 * @FilePath     : \stumbleguys\JavaScripts\mgs\MGSBase.ts
 * @Description  : 埋点抽象类（避免实例化）
 */

export abstract class MGSBase {
    /**
     * 父类中的公用方法
     * @param name 时间名称
     * @param desc 描述
     * @param arg 传递的信息对象
     */
    protected reportLog(name: string, desc: string, arg?: any) {
        if (!arg) {
            arg = {};
        }
        console.log("统计", name, desc, JSON.stringify(arg));
        mw.RoomService.reportLogInfo(name, desc, JSON.stringify(arg));
    }
    // /**在背包中保存装扮 */
    // export function wearInBag(cfg: number) {
    //     reportLog("ts_action_change_cloth", "记录玩家更换装扮", { cloth_id: cfg });
    // }
}