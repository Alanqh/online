/*
 * @Author       : dal
 * @Date         : 2024-05-29 18:10:47
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-29 19:02:15
 * @FilePath     : \1005_town\JavaScripts\codes\utils\EffectMgr.ts
 * @Description  : 特效管理器，支持更改特效颜色
 */

type EffParam = {
    /** 相对缩放 */
    scale?: Vector,
    /** 相对旋转 */
    rot?: Rotation,
    /** 颜色 */
    color?: LinearColor,
    /** 循环次数 */
    loopCount?: number,
    /** 回收时间 */
    recycleTime: number,
}

class EffectMgr {

    private effectMap: Map<string, Effect[]> = new Map();

    private async createEff(resId: string): Promise<Effect> {
        return (await Effect.asyncSpawn(resId) as Effect);
    }

    private async getEff(resId: string) {
        let effArr = this.effectMap.get(resId);
        if (!effArr) {
            effArr = [];
            this.effectMap.set(resId, effArr);
        }
        let eff = effArr.pop();
        return eff || await this.createEff(resId);
    }

    public async playEff(resId: string, pos: Vector, effParam: EffParam) {
        let eff = await this.getEff(resId);
        eff.worldTransform.position = pos;
        if (effParam.color != undefined) { eff.setColor("color", effParam.color) }
        if (effParam.loopCount != undefined) { eff.loopCount = effParam.loopCount; }
        if (effParam.rot != undefined) { eff.worldTransform.rotation = effParam.rot; }
        if (effParam.scale != undefined) { eff.worldTransform.scale = effParam.scale; }
        eff.setVisibility(PropertyStatus.On);
        eff.play();
        // 回收
        setTimeout(() => {
            eff.setVisibility(PropertyStatus.Off);
            this.effectMap.get(resId).push(eff);
        }, effParam.recycleTime * 1e3);
    }
}

export const EffectMgrIns = new EffectMgr();