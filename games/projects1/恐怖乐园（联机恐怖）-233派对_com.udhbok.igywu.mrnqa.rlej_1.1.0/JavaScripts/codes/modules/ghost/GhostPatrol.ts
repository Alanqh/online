import { CeHuaDefines, GhostPatrolConfig } from "../../CehuaDefines";
import { WaitLoop } from "../../utils/AsyncTool";

export class GhostPatrol {
    private _effect: Effect;

    private _timer: number = 0;

    private _curScale: Vector = Vector.one;

    private _enable: boolean = false;

    public cfg: GhostPatrolConfig;

    public async init(cfg: GhostPatrolConfig) {
        this.cfg = cfg;
        this._effect = await GameObject.asyncSpawn(cfg.GhostPatrol) as Effect;
        this._effect.worldTransform.position = cfg.GhostPatrolPosition;
        this._effect.worldTransform.rotation = cfg.GhostPatrolRotation;
        this._effect.setCullDistance(999999999);
        this._effect.setVisibility(PropertyStatus.Off, true);
    }

    async start(syncTime: number) {
        if (syncTime > this.cfg.GhostPatrolKeepTime) {
            return;
        }
        this._timer = syncTime;
        this._enable = true;
        if (!this._effect) { await WaitLoop.loop(() => { return this._effect }, 1e2, 50) }
        if (!this._effect) { return; }
        this._effect.worldTransform.scale = this.cfg.GhostPatrolStartScale;
        this._effect.setVisibility(PropertyStatus.On, true);
        this._effect.loop = true;
        this._effect.play();
    }

    onupdate(dt: number) {
        if (!this._enable) {
            return;
        }
        this._timer += dt;
        let percent = this._timer / this.cfg.GhostPatrolScaleTime;
        percent = Math.min(percent, 1);
        this._effect.worldTransform.scale = Vector.lerp(this.cfg.GhostPatrolStartScale, this.cfg.GhostPatrolScale, percent, this._curScale);
        percent = this._timer / this.cfg.GhostPatrolKeepTime;
        if (percent >= 1) {
            this._enable = false;
            this._effect.setVisibility(PropertyStatus.Off, true);
        }
    }
}