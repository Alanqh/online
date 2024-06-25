/** 
 * @Author       : weihao.xu
 * @Date         : 2023-12-13 15:02:35
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2024-01-02 09:57:46
 * @FilePath     : \stumbleguys_new\JavaScripts\newPrefab\champion\ChampionUI.ts
 * @Description  : 修改描述
 */
import { LanUtils } from "../../tool/LanguageUtil";
import ChampionShow_Generate from "../../ui-generate/ChampionShow_generate";

const canvas_Bottom_Time = 270;
const img_Trophy_Time = 200;
const img_Rinbow_Time = 100;
const canvas_TopMiddle_Time = 100;

export default class ChampionUI extends ChampionShow_Generate {
    private cb: Function;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.mSkip.onClicked.add(() => {
            this.cb && this.cb();
            UIService.hideUI(this);
            Event.dispatchToLocal("LEVEL_SETTLE");
        })
        this.canvas_Bottom.visibility = mw.SlateVisibility.Hidden;
        this.img_Arrowhead_Left.visibility = mw.SlateVisibility.Hidden;
        this.img_Arrowhead_RIght.visibility = mw.SlateVisibility.Hidden;
        this.canvas_TopMiddle.visibility = mw.SlateVisibility.Hidden;
        this.img_Trophy.visibility = mw.SlateVisibility.Hidden;
        this.img_Rinbow.visibility = mw.SlateVisibility.Hidden;
    }

    public onShow(name: string, cb: Function) {
        this.mName.text = name;
        this.cb = cb;
        this.showTween();
        if (LanUtils.isCH) {
            this.img_Champion.visibility = mw.SlateVisibility.Visible;
            this.img_Champion_Eng.visibility = mw.SlateVisibility.Hidden;
        } else {
            this.img_Champion.visibility = mw.SlateVisibility.Hidden;
            this.img_Champion_Eng.visibility = mw.SlateVisibility.Visible;
        }
        Event.dispatchToLocal("PLAY_BY_CFG", 71);
    }

    private showTween() {
        let oriRightPos = this.img_Arrowhead_Left.position;
        let oriLeftPos = this.img_Arrowhead_RIght.position;
        let stepTween1 = new Tween({ x: -900 }).to({ x: 0 }, canvas_Bottom_Time).onStart(() => {
            this.canvas_Bottom.visibility = mw.SlateVisibility.Visible;
        }).onUpdate((obj) => {
            this.canvas_Bottom.position = TEMP_VEC2.set(obj.x, 0);
        })
        let stepTween2 = new Tween({ scale: 1.5 }).to({ scale: 1 }, img_Trophy_Time).onStart(() => {
            this.img_Trophy.visibility = mw.SlateVisibility.Visible;
        }).onUpdate((obj) => {
            this.img_Trophy.renderScale = TEMP_VEC2.set(obj.scale, obj.scale);
        })
        let stepTween3 = new Tween({ scale: 1.5 }).to({ scale: 1 }, img_Rinbow_Time).onStart(() => {
            this.img_Rinbow.visibility = mw.SlateVisibility.Visible;
        }).onUpdate((obj) => {
            this.img_Rinbow.renderScale = TEMP_VEC2.set(obj.scale, obj.scale);
        })
        let stepTween4 = new Tween({ scale: 0.5, x: 0 }).to({ scale: 1, x: 200 }, canvas_TopMiddle_Time).onStart(() => {
            this.canvas_TopMiddle.visibility = mw.SlateVisibility.Visible;
            this.img_Arrowhead_Left.visibility = mw.SlateVisibility.Visible;
            this.img_Arrowhead_RIght.visibility = mw.SlateVisibility.Visible;
            this.img_Arrowhead_Left.position = TEMP_VEC2.set(oriLeftPos.x + 200, oriLeftPos.y);
            this.img_Arrowhead_RIght.position = TEMP_VEC2.set(oriRightPos.x - 200, oriRightPos.y);
        }).onUpdate((obj) => {
            this.canvas_TopMiddle.renderScale = TEMP_VEC2.set(obj.scale, obj.scale);
            this.img_Arrowhead_Left.position = TEMP_VEC2.set(oriRightPos.x + 200 - obj.x, oriRightPos.y);
            this.img_Arrowhead_RIght.position = TEMP_VEC2.set(oriLeftPos.x - 200 + obj.x, oriLeftPos.y);
        })
        stepTween1.chain(stepTween2);
        stepTween2.chain(stepTween3);
        stepTween3.chain(stepTween4);
        stepTween1.start();
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}

let TEMP_VEC2 = new mw.Vector2();