import { GameConfig } from "../../config/GameConfig";

export class ProjectileMovementFactory {
    /**
     * 创建一个投掷物类
     * @param obj 需要投资的物体
     * @param cfgID 道具ID，目前没用到
     * @returns 
     */
    public static createProjectile(obj: GameObject, cfgID: number): ProjectileMovement {
        let projectile = new ProjectileMovement(obj);
        let speed = 1500;
        let gravity = 1;
        if (cfgID) {
            let cfg = GameConfig.ToolStat.getElement(cfgID);
            speed = cfg.projectionSpeed;
            gravity = cfg.projectionGravity;
        }
        // 一些默认配置
        // 设置初始发射速度为1500。
        projectile.initialSpeed = speed;
        // 设置重力缩放为1。
        projectile.gravityScale = gravity;
        // 设置投掷物旋转跟随速度方向。
        projectile.isRotationFollowsVelocity = true;
        // // 设置投掷物碰撞维持速度比例为0.4。
        // projectile.speedRetention = 0;

        if (cfgID) {
            this.refreshProjectile(projectile, cfgID);
        }

        return projectile;
    }

    /**
     * 根据道具ID刷新投掷物
     * @param projectile 
     * @param cfgID 
     */
    public static refreshProjectile(projectile: ProjectileMovement, cfgID: number) {
        let cfg = GameConfig.ToolStat.getElement(cfgID);
        projectile.initialSpeed = cfg.projectionSpeed;
        projectile.gravityScale = cfg.projectionGravity;
    }
}

//道具枚举
export enum PropType {
    /**咸鱼 */
    Fish = 10001,
    /**泡泡 */
    Bubble = 10002,
    /**加速 */
    SpeedUp = 10003,
    /**传送门 */
    Door = 10004,
}
// 道具瞄准类型
export enum PropAimType {
    /**不瞄准 */
    None,
    /**抛物线 */
    Parabola,
    /**直线 */
    Line
}

export const propMoveObjArr: GameObject[] = [];
export type PropMoveData = {
    startPos: Vector,
    // endPos: Vector,
    dir: Vector,
}

/**
 * 点数量
 */
export const moveObjCount: number = 40;

/**
 * 起点偏移X
 */
export const PropMoveStartPosOffsetX: number = GameConfig.Global.getElement(50002).float_Value;

/**
 * 向上的向量
 */
export const v2Up: Vector2 = new Vector2(0, 1);
/**
 * 起点偏移高度
 */
export const StartPosOffsetZ: Vector = new Vector(0, 0, GameConfig.Global.getElement(50001).float_Value);


/**
 * 抛物线向前延伸申倍率
 */
export const distanceRate: number = GameConfig.Global.getElement(50007).float_Value;

/**抛物线z轴增量 */
export const parabolaZIncrement: number = GameConfig.Global.getElement(50012).float_Value;

/**直线特效guid */
export const lineEffectGuid: string = GameConfig.Global.getElement(50009).string_Value;

/**直线特效缩放 */
export const lineEffectScale: Vector = GameConfig.Global.getElement(50011).vector3_Value;
/**直线特效z轴增量 */
export const lineEffZIncrement: Vector = new Vector(0, 0, GameConfig.Global.getElement(50010).float_Value);




