/*
 * @Author       : dal
 * @Date         : 2024-05-29 15:51:11
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-29 16:41:12
 * @FilePath     : \1005_town\JavaScripts\codes\modules\hotweapon\ui\UIHitDamage.ts
 * @Description  : 
 */
import HitDamage_Generate from "../../../../ui-generate/ShareUI/世界UI/HitDamage_generate";

/** 总时长 */
const durationTime: number = 5e2;

/** 渐显时间 */
const fadeInTime: number = 1e2;

/** 淡出时间*/
const fadeOutTime: number = 1e2;

/** z偏移区间 */
const zOffZone: number[] = [70, 90];

/** x偏移区间 */
const xOffZone: number[] = [0, 30];

/** 函数曲线方法 */
const easingFun: TweenEasingFunction = TweenUtil.Easing.Back.Out;

/** 不同文本对应的伤害类型 */
export enum EHurtTextType {

    /** 普通伤害 */
    Normal = 0,
    /** 暴击伤害 */
    Critical,
    /** 受击 */
    BeHurt,
    /** 治愈 */
    Heal,
    /** 爆头 */
    HeadShot,
    /** 中毒 */
    Poison,
    /** Buff */
    Buff
}

class UIHitDamage extends HitDamage_Generate {

    /** 各种不同伤害类型的容器 */
    private canList: Canvas[] = [];

    /** 各种不同伤害类型的文本 */
    private txtList: TextBlock[] = [];

    protected onAwake(): void {
        this.canList.push(this.canvas_Damage);
        this.canList.push(this.canvas_Crritical);
        this.canList.push(this.canvas_Hurt);
        this.canList.push(this.canvas_Heal);
        this.canList.push(this.canvas_HeadHit);
        this.canList.push(this.canvas_BUFF_PoisoningHit);
        this.canList.push(this.canvas_BUFF_BurnHit);

        this.txtList.push(this.mDamageText);
        this.txtList.push(this.mDamageCriticalText);
        this.txtList.push(this.mHurtText);
        this.txtList.push(this.mHealText);
        this.txtList.push(this.mHeadHitText);
        this.txtList.push(this.mPoisoningHitText);
        this.txtList.push(this.mBurnHitText);

        this.canList.forEach((canvas) => {
            canvas.visibility = SlateVisibility.Collapsed;
        });

        this.rootCanvas["uuid"] = Date.now();
    }

    /** 当前显示伤害文本类型 */
    private curViewTxtType: EHurtTextType = EHurtTextType.Normal;

    public setDamage(damage: string, txtType: EHurtTextType = EHurtTextType.Normal) {
        if (this.curViewTxtType != txtType) {
            this.canList[this.curViewTxtType].visibility = SlateVisibility.Collapsed;
            this.curViewTxtType = txtType;
        }
        this.canList[this.curViewTxtType].visibility = SlateVisibility.SelfHitTestInvisible;
        this.txtList[this.curViewTxtType].text = damage;
    }

    public playShowAni() {
        this.rootCanvas.renderOpacity = 0;
        playOpaAni(this.rootCanvas, 1, fadeInTime);
    }

    public playHideAni(doCompleteCall?: Function) {
        playOpaAni(this.rootCanvas, 0, fadeOutTime, doCompleteCall);
    }
}

const opaTween: Map<string, Tween<any>> = new Map();

/**
* 播放UI的透明度tween动画（0-360自动轮回）
*/
function playOpaAni(ui: Widget, toOpa: number, duration: number = 1e3, doCompleteCall?: Function) {
    let uuid = StringUtil.isEmpty(ui["uuid"]) ? ui.guid : ui["uuid"];
    opaTween.get(uuid)?.stop();
    let tween = new Tween({ value: ui.renderOpacity })
        .to({ value: toOpa }, duration)
        .onUpdate((delta) => {
            if (!ui || !ui.visibility) {
                tween.stop();
                opaTween.delete(uuid);
                return;
            }
            ui.renderOpacity = delta.value;
        })
        .start()
        .onComplete(() => {
            doCompleteCall && doCompleteCall();
            opaTween.delete(uuid);
        });
    opaTween.set(uuid, tween);
    return tween;
}

class UIWidgetNode<T> {
    public uiWidget: UIWidget;
    public script: T;
}

class UIWidgetPool {

    private static pool: Map<string, UIWidgetNode<any>[]> = new Map<string, UIWidgetNode<any>[]>();

    /** 
     * 创建新的节点
     */
    public static async spawnNewWidget() {
        let go = await GameObject.asyncSpawn("UIWidget") as mw.UIWidget;
        go.widgetSpace = mw.WidgetSpaceMode.Screen;
        let ui = UIService.create(UIHitDamage);
        go.setTargetUIWidget(ui.uiWidgetBase);
        let node = new UIWidgetNode<UIHitDamage>();
        node.uiWidget = go;
        node.script = ui;
        this.releaseUIWidget(node);
    }

    public static async genUIWidget<T extends UIScript>(clazz: new () => T): Promise<UIWidgetNode<T>> {
        let key = clazz.name;
        if (this.pool.has(key) && this.pool.get(key).length > 0) {
            return this.pool.get(key).shift();
        } else {
            await this.spawnNewWidget();
            return this.genUIWidget(clazz);
        }
    }

    public static releaseUIWidget<T extends UIScript>(node: UIWidgetNode<T>) {
        let key = node.script.constructor.name;
        if (this.pool.has(key) == false) {
            this.pool.set(key, []);
        }
        this.pool.get(key).push(node);
        node.uiWidget.setVisibility(false);
    }

}

export class HitDamage {

    public static async show(pos: Vector, damage: number, txtType: EHurtTextType = EHurtTextType.Normal) {
        let goNode = await UIWidgetPool.genUIWidget(UIHitDamage);
        if (goNode == null) return;
        let go = goNode.uiWidget;
        let ui = goNode.script;
        go.worldTransform.position = pos;
        if (damage == 0) {
            ui.setDamage("Miss", txtType);
        } else if (damage == -1) {
            ui.setDamage("无敌", txtType);
        } else {
            ui.setDamage(damage.toString(), txtType);
        }
        go.hideByDistanceEnable = false;
        go.occlusionEnable = false;
        go.setVisibility(true);
        this.playViewAni(goNode, () => {
            UIWidgetPool.releaseUIWidget(goNode);
        });

    }

    /** 播放出现时动画 */
    private static playViewAni(uiNode: UIWidgetNode<UIHitDamage>, doCompleteCall?: Function) {
        uiNode.script.playShowAni();

        // 找个附近的点
        const toPos1 = this.getRandomPosNearby(uiNode.uiWidget.worldTransform.position, 3, false, zOffZone[0], zOffZone[1]);

        // 找个附近的点
        const toPos2 = this.getRandomPosNearby(toPos1, 1, true, xOffZone[0], xOffZone[1]);

        const nowPos = uiNode.uiWidget.worldTransform.position;
        const tempVec = new Vector();
        new Tween({ x: nowPos.x, y: nowPos.y, z: nowPos.z })
            .to({ x: [toPos1.x, toPos2.x], y: [toPos1.y, toPos2.y], z: [toPos1.z, toPos2.z] })
            .onUpdate((trans) => {
                tempVec.x = trans.x; tempVec.y = trans.y; tempVec.z = trans.z;
                uiNode.uiWidget.worldTransform.position = tempVec
            })
            .interpolation(TweenUtil.Interpolation.Bezier)
            .easing(easingFun)
            .start()

        // 播放隐藏动画的时间
        let hideTime = Math.max(durationTime - fadeOutTime, fadeOutTime);

        setTimeout(() => {
            uiNode.script.playHideAni(doCompleteCall);
        }, hideTime);
    }

    /** 获取一点附近的一个随机点 */
    private static getRandomPosNearby(pos: Vector, axi: number, isPos: boolean, fromNum: number = 60, toNum: number = 70) {
        let randomNum = MathUtil.randomFloat(fromNum, toNum);
        if (isPos) { randomNum *= Math.random() < 0.5 ? -1 : 1; }
        let newPos = new Vector(axi === 1 ? pos.x + randomNum : pos.x, axi === 2 ? pos.y + randomNum : pos.y, axi === 3 ? pos.z + randomNum : pos.z);
        return newPos;
    }
}