/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-05 13:59:37
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-11-02 15:20:21
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\大炮\Script\ICannonConfig.ts
 * @Description  : 修改描述
 */
export interface ICannonConfig {
    /**
     * 销毁时间
     */
    destoryTime: number;
    /**
     * 速度
     */
    speed: number;
    /**
     * 冲量大小
     */
    impulse: number;
    /**
     * 受到冲击时Id;
     */
    gearId: number
    /**
     * 炮弹销毁特效
     */
    destroyEffect: string;
    /**
     * 销毁特效缩放
     */
    destroyEffectScale: Vector
}