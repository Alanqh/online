/*
* @Author: YuKun.Gao
* @Date: 2022-03-04 15:34:30
 * @LastEditors: yukun.gao yukun.gao@appshahe.com
 * @LastEditTime: 2022-10-31 14:17:16
* @Description: file content
 * @FilePath: \JavaScripts\ui\GridLayout.ts
*/

export interface Class<T> extends Function {
    new(...args: any[]): T;
}


export class GridLayout<T extends mw.UIScript> {

    /**生长参数 */
    private _growSize: number;
    private _growDir: mw.Orientation;

    /**子节点 */
    public nodes: T[] = [];

    /**偏移 */
    public left: number = 0;
    public top: number = 0;

    /** X间隔 */
    public spacingX: number = 0;
    /** Y间隔 */
    public spacingY: number = 0;

    private size: mw.Vector2 = null;

    // /**
    //  * 锚点修复
    //  */
    // private _anchor: MWGameUI.MWUIConstraintAnchors;
    /**初始化GridLayout */
    constructor(private _root: mw.ScrollBox, private _canvas: mw.Canvas, private cls: Class<T>, private _isAutoWrap: boolean = true) {
        const size = this._root.size;
        this._growDir = this._root.orientation;
        if (_isAutoWrap) {
            this._growDir = 1 - this._growDir;
        }

        this._growSize = this._growDir == mw.Orientation.OrientHorizontal ? size.x : size.y;
    }
    /**
     * 添加节点
     * @param node 节点
     */
    public addNode(...params): T {
        for (let i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i].visible) {

                this.nodes[i].uiObject.size = (this.size);
                this.nodes[i].uiObject.visibility = (mw.SlateVisibility.Visible);;
                this.nodes[i].visible = true;
                if (this.nodes[i]["onShow"])
                    this.nodes[i]["onShow"](...params);
                return this.nodes[i];
            }
        }

        let node: T = mw.UIService.create(this.cls);// this.cls["creat"]();
        if (this.size == null)
            this.size = node.rootCanvas.size.clone().add(mw.Vector2.zero);

        this._canvas.addChild(node.uiObject);
        node.uiObject.size = (this.size);
        node.uiObject.visibility = (mw.SlateVisibility.Visible);;
        this.nodes.push(node);
        if (node["onShow"])
            node["onShow"](...params);
        return node;
    }
    /**
     * 移除单个节点
     */
    public removeNode(node: T) {
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            node.uiObject.size = (mw.Vector2.zero);
            node.uiObject.visibility = (mw.SlateVisibility.Hidden);
            node.visible = false;
        }
        //this.invalidate();
    }
    /**
     * 移除所有节点
     */
    public removeAllNode() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].uiObject.size = (mw.Vector2.zero);
            this.nodes[i].uiObject.visibility = (mw.SlateVisibility.Hidden);
            this.nodes[i].visible = false;
        }

    }

    /**
     * 更新布局
     */
    public invalidate() {
        let startX = this.left;
        let startY = this.top;
        this.nodes.forEach(
            element => {
                if (!element.visible) {
                    element.uiObject.position = (mw.Vector2.zero);
                    return;
                }
                let slot = element.uiObject;
                let slotSize = slot.size.clone();
                if (this._growDir == mw.Orientation.OrientHorizontal) {
                    if (this._isAutoWrap && startX + slotSize.x > this._growSize) {
                        startY += this.spacingY + slotSize.y;
                        startX = this.left;
                    }
                    slot.position = (new mw.Vector2(
                        startX,
                        startY
                    ));
                    startX += slotSize.x + this.spacingX;
                } else {
                    if (this._isAutoWrap && startY + slotSize.y >= this._growSize) {
                        startX += this.spacingX + slotSize.x;
                        startY = this.top;
                    }
                    slot.position = (new mw.Vector2(
                        startX,
                        startY
                    ));
                    startY += slotSize.y + this.spacingY;
                }
            }
        )

    }

}