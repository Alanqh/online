/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-08-21 10:02:39
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-21 10:49:40
 * @FilePath     : \stumbleguys\JavaScripts\TestMode.t
 * @Description  : 修改描述
 */
export namespace TestMode {
    /**
     * 测试模式
     */
    const debuging: boolean = true;

    export let testMode: boolean = SystemUtil.isPIE;
    export let testRound: number = 1;
}