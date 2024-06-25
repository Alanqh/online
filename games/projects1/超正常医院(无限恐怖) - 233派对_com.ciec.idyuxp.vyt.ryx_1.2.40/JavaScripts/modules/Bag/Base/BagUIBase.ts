
import { utils } from "../../../utils/uitls";
import BagPanelBase from "./BagPanelBase";
import IBagData from "./IBagData";
import { Layout } from "./IBagUI";


/**背包itemUI基类 */
export abstract class BagUIBase<Data extends IBagData, ItemUI extends mw.UIScript> {

    public data: Data = null;
    public ui: ItemUI = null;
    /**所属的背包panel */
    public panel: BagPanelBase<Data, ItemUI> = null;

    /**item在panel中的第几个位置 */
    public count: number = null;
    /**淡入 */
    private fadeInTween: mw.Tween<{}> = null;
    /**淡出 */
    private fadeOutTween: mw.Tween<{}> = null;
    /**平移 */
    private movetTween: mw.Tween<{}> = null;

    constructor(data: Data, ui: ItemUI, panel: BagPanelBase<Data, ItemUI>) {
        this.data = data;
        this.ui = ui;
        this.panel = panel;
    }


    /**初始化 */
    abstract initItem(): void;


    /**排名item淡入 */
    public itemFadeInTween(count: number) {

        if (this.fadeInTween && this.fadeInTween.isPlaying()) {
            this.fadeInTween.stop();
        }
        this.ui.uiObject.position = this.calcuItemPos(count);
        let fadeInTween = new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 300)
            .onUpdate((obj) => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {

            })
            .start();
        this.fadeInTween = fadeInTween;
    }

    /**排名item平移 */
    public itemMoveTween(toCount: number) {
        let toPos = this.calcuItemPos(toCount);
        if (this.movetTween && this.movetTween.isPlaying()) {
            this.movetTween.stop();
        }
        // let emptyTween = new mw.Tween(null);
        // 移动
        this.count = toCount;
        let moveTween = new mw.Tween({ pos: this.ui.uiObject.position }).to({ pos: toPos }, 200)
            .onUpdate(obj => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.position = obj.pos;
                }
            });

        this.movetTween = moveTween.start();
    }


    /**排名item淡出 */
    public itemFadeOutTween() {
        // item.uiObject.position = this.calcuItemPos(count);
        if (this.fadeOutTween && this.fadeOutTween.isPlaying()) {
            this.fadeOutTween.stop();
        }
        let fadeOutTween = new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 300)
            .onUpdate((obj) => {
                if (this.ui.uiObject) {
                    this.ui.uiObject.renderOpacity = obj.alpha;
                }
            })
            .onComplete(() => {
                this.ui.destroy();
            })
            .start();
        this.fadeOutTween = fadeOutTween;
    }


    /**item设置位置 */
    public calcuItemPos(count: number): Vector2 {
        let x = 0;
        let y = 0
        try {
            //距离左边的偏移量
            let offX = this.panel.layout.leftOffsetX;
            //距离上边的偏移量
            let offY = this.panel.layout.topOffsetY;
            //每个item的间隔
            let space =this.panel.layout.itemInterval;
            //每行的个数
            let row = this.panel.layout.itemCount;
            //每个item的宽度
            let itemWidth = this.panel.layout.itemWidth;
            //每个item的高度
            let itemHeight = this.panel.layout.itemHeight;
            //计算出每个item的位置
            let index_x: number = count % row;
            if (index_x == 0) {
                index_x = row;
            }
            x = (index_x - 1) * (itemWidth + space) + offX;  // 1* (200 + 90) + 50
            y = Math.floor((count - 1) / row) * (itemHeight + space) + offY; // 0 * (200 + 90) + 50
            // item.position = new mw.Vector2(x, y);
        } catch (error) {
            console.log("布局计算失败" + error);
        }
        return new mw.Vector2(x, y);
    }

    /**新增itemUI */
    addUI(count: number): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemFadeInTween(count);
        } else {
            this.count = count;
            this.ui.uiObject.position = this.calcuItemPos(count);
            console.log("ui位置为：" + this.ui.uiObject.position)
        }
    }

    /**删除itemUI */
    delUI(): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemFadeOutTween();
        } else {
            this.ui.destroy();
        }
    }

    /**移动itemUI */
    moveUI(toCount: number): void {
        // 高帧率播放动画，低帧率直接刷新
        if (utils.frameCount > 20) {
            this.itemMoveTween(toCount);
        } else {
            this.ui.uiObject.position = this.calcuItemPos(toCount);
        }
    }
}