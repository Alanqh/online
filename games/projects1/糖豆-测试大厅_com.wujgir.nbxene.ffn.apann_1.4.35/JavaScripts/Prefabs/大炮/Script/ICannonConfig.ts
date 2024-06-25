/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-05 13:59:37
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-03-05 14:25:17
 * @FilePath     : \10000Balls\Prefabs\大炮\Script\ICannonConfig.ts
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
}