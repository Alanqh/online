import { PlayerManagerExtesion } from '../../../Modified027Editor/ModifiedPlayer';
/** 
 * @Author       : weihao.xu
 * @Date         : 2023-06-11 13:20:10
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-06-12 14:52:38
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\大炮\Script\BulletDamage.ts
 * @Description  : 修改描述
 */
import { ICannonConfig } from "./ICannonConfig";

const tempVec = new Vector();
export class BulletDamage {
    /**
     * 多少帧记录一次方位
     */
    private recordPostionTimeout = 5;
    /**
     * 上一次记录位置
     */
    private preLocation: mw.Vector = new mw.Vector();

    /**
     * 击中的玩家
     */
    private hitChars: { char: Character, resumeTime: number }[] = [];
    constructor(private root: mw.Model, private data: ICannonConfig) { }

    /**
     * 击中物体
     * @param character 
     */
    public onHit(character: mw.GameObject, speed: any, gearId: number) {
        if (character instanceof Character && !this.hitChars.find(i => i.char == character)) {
            const dir = mw.Vector.subtract(character.worldTransform.position, this.root.worldTransform.position);
            dir.z = 0;
            dir.normalize();

            mw.Vector.subtract(this.root.worldTransform.position, this.preLocation, tempVec);
            tempVec.z = 0;
            tempVec.normalize();
            // const cross = mw.Vector.cross(tempVec, dir)
            // const rotDir = new mw.Rotation(0, 0, (cross.z > 0 ? (1 - cross.z) : (-1 - cross.z)) * 90).rotateVector(dir);
            // rotDir.z = 0.4;
            let rate = speed.Size();
            if (rate < 300) {
                return;
            }

            let max = Math.min(1600, rate / 500 * this.data.impulse);
            character.addImpulse(dir.multiply(max).subtract(character.velocity), true);

            this.hitChars.push({ char: character, resumeTime: 0.2 });
            if (PlayerManagerExtesion.isCharacter(character)) {
                Event.dispatchToClient(character.player, "OnCannonHit", character.gameObjectId, gearId, character.worldTransform.position);
            }
        }
    }
    /**
     * 子弹锚固时
     */
    public onAnchor() {
        this.recordPostionTimeout = 5;
    }

    public onUpdate(dt: number) {
        this.recordPostionTimeout--;
        if (this.recordPostionTimeout == 0) {
            this.recordPostionTimeout = 5;
            this.preLocation.set(this.root.worldTransform.position);
        }

        for (let i = 0; i < this.hitChars.length; i++) {
            this.hitChars[i].resumeTime -= dt;
            if (this.hitChars[i].resumeTime <= 0) {
                this.hitChars.splice(i, 1);
                i--;
            }
        }
    }
    /**
     * 子弹销毁时
     */
    public onStop() {
        for (let i = 0; i < this.hitChars.length; i++) {
            this.hitChars[i].resumeTime = 0;
        }
        this.onUpdate(0.1);
    }
}