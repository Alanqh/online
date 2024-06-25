export class VectorUtils {
    /**
     * 获得一个打击的力
     * @param gravity 重力的数值
     * @param speed 速度
     * @param startPos 出发点
     * @param targetPos 目标点
     * @returns 产生的力
     */
    public static getHitForce(gravity: number, speed: number, startPos: mw.Vector, targetPos: mw.Vector): mw.Vector {
        const dis = mw.Vector.distance(startPos, targetPos);
        const costTime = dis / speed;
        const disY = targetPos.z - startPos.z;
        let force = new mw.Vector((targetPos.x - startPos.x) / costTime,
            (targetPos.y - startPos.y) / costTime,
            (disY / costTime) + 0.5 * gravity * costTime);
        return force;
    }

    public static getRandomVec2D(min: number, max: number) {
        let vec = new Vector(MathUtil.randomInt(min, max), MathUtil.randomInt(min, max), 0);
        return vec;
    }
}