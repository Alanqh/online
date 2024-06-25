/** 
 * @Author       : lei.zhao
 * @Date         : 2023-03-05 13:03:13
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-18 11:22:53
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\大炮\Script\Cannon.ts
 * @Description  : 修改描述
 */

import { Bullet } from "./Bullet";
import { ICannonConfig } from "./ICannonConfig";

@Component
export default class Cannon extends mw.Script implements ICannonConfig {
    @mw.Property({ capture: true, displayName: "炮口锚点" })
    private anchor: string = "";
    @mw.Property({ capture: true, displayName: "球模型" })
    private ball: string = "";
    @mw.Property({ capture: true, displayName: "发射特效" })
    private shootEffect: string = "";
    @mw.Property({ capture: true, displayName: "发射声效" })
    private soundEffect: string = "";
    @mw.Property({ displayName: "初始速度" })
    public speed: number = 1000;
    @mw.Property({ displayName: "发射延迟" })
    private shootDelay: number = 2;
    @mw.Property({ displayName: "发射间隔" })
    private interval: number = 5;
    @mw.Property({ displayName: "炮弹销毁时长" })
    public destoryTime: number = 5;
    @mw.Property({ displayName: "击中冲量" })
    public impulse: number = 800;
    @mw.Property({ displayName: "gearId" })
    public gearId: number = 1;
    @mw.Property({ displayName: "销毁特效" })
    public destroyEffect: string = "14335";

    /**
     * 当前计时
     */
    private currentInterval: number = 0;
    /**
     * 所有运行炮弹
     */
    private bullets: Bullet[] = [];
    /**
     * 回收站
     */
    private cache: Bullet[] = [];
    /**
     * 炮弹模板
     */
    private template: mw.Model;
    /**
    * 炮口
    */
    public anchorObject: mw.GameObject;
    /**
    * 炮口特效
    */
    private shootEffectObject: mw.Effect;
    /**
    * 炮口声效
    */
    private shootSoundObject: mw.Sound;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.template = GameObject.findGameObjectById(this.ball) as mw.Model;
            this.anchorObject = GameObject.findGameObjectById(this.anchor);
            this.cache.push(new Bullet(this.template.clone() as mw.Model, this));
            this.shootDelay += 2;
            this.useUpdate = true;

        } else {
            this.shootEffectObject = GameObject.findGameObjectById(this.shootEffect) as mw.Effect;
            this.shootSoundObject = GameObject.findGameObjectById(this.soundEffect) as mw.Sound;
            this.shootSoundObject.isSpatialization = true;
            this.shootSoundObject.worldTransform.position = this.gameObject.worldTransform.position;
            this.shootEffectObject.loop = false;
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (SystemUtil.isServer()) {
            if (this.shootDelay >= 0) {
                this.shootDelay -= dt;
                return;
            }
            if (this.currentInterval <= 0) {
                this.currentInterval = this.interval;
                this.fire();
            }
            this.currentInterval -= dt;
            for (let i = 0; i < this.bullets.length; i++) {
                if (this.bullets[i].onUpdate(dt)) {
                    this.cache.push(this.bullets.splice(i, 1)[0]);
                    i--;
                }
            }
        }
    }

    /**
     * 服务端广播开火
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    private onFireClient() {
        this.shootEffectObject && this.shootEffectObject.play();
        this.shootSoundObject && this.shootSoundObject.play();
    }

    /**
     * 开炮
     */
    private fire() {
        if (this.cache.length > 0) {
            this.onFireClient();
            const bullet = this.cache.shift();
            bullet.anchor(this.anchorObject);
            this.bullets.push(bullet);
        }
        else {
            this.cache.push(new Bullet(this.template.clone() as mw.Model, this));
        }

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}