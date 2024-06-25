/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-04-03 18:46:36
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-12-13 15:21:51
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\PlayerParam.ts
 * @Descripttion : 
 */
export class PlayerParam {
    /**是否溜冰 */
    static isSkating: boolean = true
    /**是否正在滑行 */
    static isSlide: boolean = false;
    /**飞扑冲量大小 */
    static get force() { return PlayerParam.isSkating ? 300 : 300; }
    /**制动速度 */
    static get delSpeed() { return PlayerParam.isSkating ? 600 : 2048 }
    /**平地制动系数 */
    static get grounddelSpeed() { return PlayerParam.isSkating ? 0.8 : 0.8 }
    /**上坡制动系数 */
    static get updelSpeed() { return PlayerParam.isSkating ? 5 : 5 }
    /**下坡制动系数 */
    static get downdelSpeed() { return PlayerParam.isSkating ? 1 : 2 }
    /**滑行最低速度 */
    static get minVelocity() { return PlayerParam.isSkating ? 150 : 150 }
    /**飞扑时再飞扑冲量系数 */
    static get forceSize() { return 1 }
    /**滑行加速度系数 */
    static get acceleratioonSize() { return PlayerParam.isSkating ? 1 : 0.01 }
    /**飞扑时的下落制动系数 */
    static get dropSpeedSize() { return 0 }
    /**滑行时转向速度 */
    static get slideRotateSpeed() { return PlayerParam.isSkating ? 2000 : 2000 }
    /**角色初始下落制动速度 */
    static get dropSpeed() { return PlayerParam.isSkating ? 500 : 500 }
    /**角色初始加速度 */
    static get oriAcceleration() { return PlayerParam.isSkating ? 1200 : 1850 }
    /**角色减速时的加速度 */
    static get delAcceleration() { return PlayerParam.isSkating ? 150 : 150 }
    /**角色初始转向速度 */
    static get oriRotateSpeed() { return PlayerParam.isSkating ? 1000 : 1000 }
    /**角色初始的行走制动速度 */
    static get defaultdelSpeed() { return PlayerParam.isSkating ? 200 : 750 }
    /**最大地面速度 */
    static get maxWalkSpeed() { return PlayerParam.isSkating ? 500 : 450 }
    /**最大地面上坡速度 */
    static get maxWalkUpSpeed() { return PlayerParam.isSkating ? 400 : 400 }
    /**最大地面下坡速度 */
    static get maxWalkDownSpeed() { return PlayerParam.isSkating ? 800 : 800 }


    /**飞扑上方向冲量系数 */
    static up: number = 0;
    /**飞扑前方向冲量系数 */
    static forward: number = 1;

    /**滑行最大速度 */
    static slideSpeed: number = 5000;

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
    static gravityScale: number = 0.9;
    /**最大跳跃高度 */
    static maxJumpHeight: number = 200;
    static maxFallingSpeed: number = 2048;


}