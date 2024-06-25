import { GameConfig } from "../config/GameConfig";
import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';

export default class BlockWall {
    private _wall: GameObject = null;
    private _effect: mw.Effect;
    private _isDestroy: boolean = false;

    public async start(): Promise<void> {
        if (GameConfig.GameInfo.getElement(1).type == 1) {
            if (!this._wall) {
                let wall = GameConfig.WallPos.getElement(1);
                if (wall != null) {
                    //开始特效
                    this._effect = await SpawnManager.asyncSpawn({ guid: "146788" }) as mw.Effect;
                    if (this._isDestroy) {
                        this._effect.destroy();
                        this._effect = null;
                        return;
                    }
                    this._effect.worldTransform.position = (wall.wallTrans[0])
                    this._effect.worldTransform.rotation = (new Rotation(wall.wallTrans[1].x, wall.wallTrans[1].y, wall.wallTrans[1].z + 90))
                    this._effect.worldTransform.scale = (new Vector(wall.wallTrans[2].y / 2, wall.wallTrans[2].x, wall.wallTrans[2].z))
                    this._effect.loop = true
                    this._effect.play()

                    this._wall = SpawnManager.spawn({ guid: "7669" }) as GameObject
                    this._wall.worldTransform.position = (wall.wallTrans[0])
                    this._wall.worldTransform.rotation = (new Rotation(wall.wallTrans[1].x, wall.wallTrans[1].y, wall.wallTrans[1].z))
                    this._wall.worldTransform.scale = (wall.wallTrans[2])
                    this._wall.setVisibility(mw.PropertyStatus.Off)
                    this._wall.setCollision(mw.PropertyStatus.On)
                }
            }
        }
    }


    public destroy(): void {
        this._isDestroy = true;
        if (this._wall) {
            this._wall.setCollision(mw.PropertyStatus.Off)
            this._wall.setVisibility(mw.PropertyStatus.Off)
        } if (this._effect) {
            this._effect.setVisibility(mw.PropertyStatus.Off)
        }
    }
}