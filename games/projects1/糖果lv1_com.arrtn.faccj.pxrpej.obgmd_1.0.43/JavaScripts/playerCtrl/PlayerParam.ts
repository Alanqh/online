/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-04-03 18:46:36
 * @LastEditors  : bao.zhang bao.zhang@appshahe.com
 * @LastEditTime : 2023-07-24 15:24:07
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\PlayerParam.ts
 * @Descripttion : 
 */
export class PlayerParam {
    /**是否正在滑行 */
    static isSlide: boolean = false;
    /**飞扑冲量大小 */
    static force: number = 300;
    /**制动速度 */
    static delSpeed: number = 2048;
    /**平地制动系数 */
    static grounddelSpeed: number = 0.8;
    /**上坡制动系数 */
    static updelSpeed: number = 5;
    /**下坡制动系数 */
    static downdelSpeed: number = 2;
    /**滑行最低速度 */
    static minVelocity: number = 150;
    /**飞扑时再飞扑冲量系数 */
    static forceSize: number = 1;
    /**滑行加速度系数 */
    static acceleratioonSize: number = 0.01;
    /**飞扑时的下落制动系数 */
    static dropSpeedSize: number = 0;
    /**滑行时转向速度 */
    static slideRotateSpeed: number = 2000;
    /**角色初始下落制动速度 */
    static dropSpeed: number = 500;
    /**角色初始加速度 */
    static oriAcceleration: number = 1850;
    /**角色初始转向速度 */
    static oriRotateSpeed: number = 1000;
    /**角色初始的行走制动速度 */
    static defaultdelSpeed: number = 750;
    /**最大地面速度 */
    static maxWalkSpeed: number = 450;


    /**飞扑上方向冲量系数 */
    static up: number = 0;
    /**飞扑前方向冲量系数 */
    static forward: number = 1;

    /**滑行最大速度 */
    static slideSpeed: number = 0;

    /**飞扑初速度 */
    static initSpeed: number = 300;

    /**重力加速度 */
    static g: number = 2048;

    /**下落控制 */
    static airControl: number = 0.25;
    /**下落控制乘数 */
    static airControlBoostMultiplier: number = 2;
    /**下落控制提升速度阈值 */
    static airControlBoostVelocityThreshold: number = 25;
    /**重力倍率 */
    static gravityScale: number =0.9;
    /**最大跳跃高度 */
    static maxJumpHeight: number = 200;
    static maxFallingSpeed: number = 2048;


}