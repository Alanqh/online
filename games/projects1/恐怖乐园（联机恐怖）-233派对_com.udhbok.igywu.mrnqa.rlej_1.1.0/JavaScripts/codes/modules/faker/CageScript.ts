/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-04-22 19:42:53
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-20 17:24:34
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\faker\CageScript.ts
 * @Description  : 
 */

import { PlayerManagerExtension } from "../../Modified027Editor/ModifiedPlayer";
import { WaitLoop } from "../../utils/AsyncTool";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { DanmakuModuleS } from "../danmaku/DanmakuModule";
import FakerModuleS from "./FakerModuleS";
import FakerScript from "./FakerScript";


@Component
export default class CageScript extends Script {

    private explodeEffect: mw.GameObject;

    private lightEffectFather: mw.GameObject;

    private aircraft: mw.GameObject;

    private cage: mw.GameObject;

    private barrier: mw.GameObject;

    private tweens: Tween<{}>[] = []

    private timer: any;
    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            this.lightEffectFather = this.gameObject.getChildByName("激光炮");
            this.explodeEffect = this.gameObject.getChildByName("爆炸");
            this.aircraft = this.gameObject.getChildByName("飞行器")
            this.cage = this.gameObject.getChildByName("笼子")
            this.barrier = this.cage.getChildByName("屏幕特效")
            this.gameObject.worldTransform.scale = new Vector(0.1, 0.1, 0.1)
            this.useUpdate = true;
        })
    }

    /**
     * 开始清除伪人
     * @param launchPos 发射位置
     * @param faker 伪人
     */
    public startCleaningFaker(cleaner: mw.Player, launchPos: Vector, faker: mw.Character) {
        this.gameObject.worldTransform.position = launchPos;
        let targetPos = new Vector(faker.worldTransform.position.x, faker.worldTransform.position.y, faker.worldTransform.position.z + 350)
        let toPos = new Vector(faker.worldTransform.position.x, faker.worldTransform.position.y, faker.worldTransform.position.z - 110)
        let tween2 = new Tween({ pos: targetPos })
            .onStart(() => {
                SoundService.playSound("205857")
                this.cage.setVisibility(mw.PropertyStatus.On);
            })
            .to({ pos: toPos }, 500)
            .easing(TweenUtil.Easing.Back.In)
            .onUpdate((val) => { this.gameObject.worldTransform.position = val.pos })
            .onComplete(async () => {
                //伪人现出原形
                faker.getComponent(FakerScript).setMonsterStyle();
                SoundService.playSound("162709")//笑一下算了
                await TimeUtil.delaySecond(3.5);//先露3.5秒原型拍照
                PlayerManagerExtension.loadAnimationExtesion(faker, "280663", true).play();//再播放伪人被抓动画
                SoundService.playSound("162715")
                await TimeUtil.delaySecond(1);//延迟1秒让玩家看被抓动画
                this.barrier.setVisibility(mw.PropertyStatus.On);//打开隔离屏障
                this.lightEffectFather.setVisibility(mw.PropertyStatus.On, true);

                //提示正在处理伪人
                this.cleaningTips(cleaner);
                await TimeUtil.delaySecond(0.5)
                this.explodeEffect.setVisibility(mw.PropertyStatus.On, true);//爆炸特效
                await TimeUtil.delaySecond(0.3)
                this.gameObject.destroy();//销毁笼子
                ModuleService.getModule(FakerModuleS).deleteFaker(faker.gameObjectId)
                let name = cleaner.character.displayName
                ModuleService.getModule(FakerModuleS).notifyFakerBeCleaned(name, "UI_item_Chicken04", 1)
                faker.destroy();//销毁伪人
            })

        let tween1 = new Tween({ pos: launchPos, scale: new Vector(0.1, 0.1, 0.1) })
            .to({ pos: targetPos, scale: Vector.one }, 1000)
            .onUpdate(val => {
                this.gameObject.worldTransform.scale = val.scale;
                this.gameObject.worldTransform.position = val.pos;
            })
            .onComplete(() => {
                tween2.start()
            })

        tween1.start()
        this.tweens.push(tween1)
        this.tweens.push(tween2)
        //补丁 8秒后销毁预制体
        this.timer = setTimeout(() => {
            if (!this.gameObject.isDestroyed) this.gameObject.destroy()
        }, 10e3)
    }

    @RemoteFunction(Client)
    cleaningTips(player: mw.Player) {
        Tips.show(LanUtil.getText("UI_item_Chicken03"))
    }

    protected onUpdate(dt: number): void {

    }

    protected onDestroy(): void {
        clearTimeout(this.timer)
        this.tweens.forEach(t => {
            t.stop();
        })
        this.tweens.length = 0;
    }

}