/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-03 19:04:37
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-06-09 15:51:13
 * @FilePath     : \stumbleguys\JavaScripts\playerCtrl\PlayerComponentMgr.ts
 * @Description  : 修改描述
 */
import { PlayerParam } from "./PlayerParam";
import { SpeedComponent } from "./SpeedComponent";

/**角色前方的坡度 */
export enum EFrontSlope {
    /**平地 */
    Ground = 0,
    /**上坡 */
    Up = 1,
    /**下坡 */
    Down = 2,
}
/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-03 15:05:50
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-04-03 16:19:52
 * @FilePath     : \举人实现\JavaScripts\playerCtrl\PlayerComponentMgr.ts
 * @Description  : 角色组件管理中心
 */
export class PlayerComponentMgr {
    /**
     * 速度组件
     */
    public _speedComponent: SpeedComponent;
    private _character: Character;

    /**
     * 初始化角色
     * @param character 
     */
    init(character: Character) {
        this._speedComponent = new SpeedComponent(character);
        this._character = character;
    }
    private static _ins: PlayerComponentMgr;
    public static get ins(): PlayerComponentMgr {
        if (!this._ins) {
            this._ins = new PlayerComponentMgr();
        }
        return this._ins;
    }
    update(dt: number) {
        this._speedComponent.onUpdate(dt);
    }
    /**
     * 跳跃之后是否落地
     * @returns 
     */
    isCharacterOnGround() {
        let onGround = (this._speedComponent && this._speedComponent.onGround) || !this._character.isJumping;

        return onGround;
    }
    /**
     * 角色前方坡度
     */
    isSlopFrontCharacter(): EFrontSlope {
        return this._speedComponent && this._speedComponent.currentFrontSlope;

    }
    /**
     * 角色速度是否足够低
     */
    isCharacterSpeedLow(character: Character) {
        const velocity = character.velocity;
        velocity.z = 0;
        return velocity.magnitude < PlayerParam.minVelocity;
    }
}