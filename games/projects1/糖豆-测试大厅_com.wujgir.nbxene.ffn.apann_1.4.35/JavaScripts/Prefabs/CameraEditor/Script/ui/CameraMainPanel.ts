/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-07 14:04:18
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-06 14:29:52
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\CameraEditor\Script\ui\CameraMainPanel.ts
 * @Description  : 修改描述
 */

import { Camera } from "../../../CameraRuntime/Script/Camera";
import { KeyAction } from "../KeyAction";
import { KeyBindings } from "../KeyBindings";
import { NodeContainer } from "../NodeContainer";
import { RenderNode } from "../render/RenderNode";
import { Traveler } from "../Traveler";
import InputFrame from "./InputFrame";

class CameraMainPanel_Generate extends mw.UIScript {
    @UIWidgetBind('RootCanvas/lineCanvas')
    public lineCanvas: mw.Canvas = undefined;
    @UIWidgetBind('RootCanvas/keyFlag')
    public keyFlag: mw.Image = undefined;
    @UIWidgetBind('RootCanvas/addTime')
    public addTime: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/subTime')
    public subTime: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/exportBtn')
    public exportBtn: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/importBtn')
    public importBtn: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/addButton')
    public addButton: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/delButton')
    public delButton: mw.Button = undefined;
    @UIWidgetBind('RootCanvas/playButton')
    public playButton: mw.Button = undefined;



    /**
    * onStart 之前触发一次
    */
    protected onAwake() {
    }

}

@UIBind('/UI/Prefabs/CameraEditor/UI/CameraMainPanel.ui')
export default class CameraMainPanel extends CameraMainPanel_Generate {
    private _isDropKey: boolean;
    private timeTexts: mw.TextBlock[] = [];
    /**初始60秒 */
    private timeGlobal: number = 60;
    /**关键帧UI */
    private keyFrames: mw.UIScript[] = [];
    /**播放时间 */
    private _playTime: number = 0;
    public onStart() {
        Traveler.start();
        setTimeout(() => {
            this.uiObject.zOrder = 5;
            this.buildUI();
            KeyBindings.start();
        }, 1000);
        this.addTime.onClicked.add(this.addTimeGlobal);
        this.subTime.onClicked.add(this.subTimeGlobal);

        this.exportBtn.onClicked.add(() => {
            mw.UIService.show(InputFrame, "save");
        });

        this.importBtn.onClicked.add(() => {
            mw.UIService.show(InputFrame, "import");
        });

        this.addButton.onClicked.add(() => {
            NodeContainer.insertNode(new RenderNode(Traveler.currentData()));
            const x = this.keyFlag.position.x + 30;
            this.keyFlag.position = new mw.Vector2(x, 0);
            Event.dispatchToLocal("Timeline_Time", parseFloat(((x + 50) / this.lineCanvas.size.x * this.timeGlobal).toFixed(2)));
            this.updateKeyFrames();
            Camera.getPlayer().loadCameraData(NodeContainer.nodes.map(i => i.data));
            Camera.getPlayer().loadEditorData(NodeContainer.nodes.map(i => i.data));

        });
        this.delButton.onClicked.add(() => {
            NodeContainer.delCurrentNode();
            this.updateKeyFrames();
            Camera.getPlayer().loadCameraData(NodeContainer.nodes.map(i => i.data));
            Camera.getPlayer().loadEditorData(NodeContainer.nodes.map(i => i.data));
        });
        this.playButton.onClicked.add(() => {
            this._playTime = 0;
            Camera.getPlayer().destroy();
            Camera.getPlayer().loadCameraData(NodeContainer.nodes.map(i => i.data));
            Camera.getPlayer().skipTo(0);
            Camera.getPlayer().play();
        });

        KeyBindings.bindButton(KeyAction.SaveAnim, this.exportBtn);
        KeyBindings.bindButton(KeyAction.KeyFrame, this.addButton);
        KeyBindings.bindButton(KeyAction.DelKeyFrame, this.delButton);

        Event.addLocalListener("CameraMainPanel.UpdateFrame", () => {
            this.updateKeyFrames();
        });

        Event.addLocalListener("PlayTimePassed", (dt: number) => {
            this._playTime += dt;
            const perSize = this.lineCanvas.size.x * this._playTime / this.timeGlobal;
            this.keyFlag.position = new mw.Vector2(perSize - 50, 0);
        });
    }
    public onShow() {
        this.uiObject.zOrder = 5;
    }
    /**更新关键帧 */
    private updateKeyFrames = () => {

        for (let i = 0; i < NodeContainer.nodes.length; i++) {
            const node = NodeContainer.nodes[i];
            const percent = node.data.time / this.timeGlobal;
            node.ui.uiObject.position = new mw.Vector2(percent * this.lineCanvas.size.x - 5, 0);
            if (!this.keyFrames.includes(node.ui)) {
                this.lineCanvas.addChild(node.ui.uiObject);
                this.keyFrames.push(node.ui);
            }
        }
        for (let i = 0; i < this.keyFrames.length; i++) {
            const element = this.keyFrames[i];
            if (!NodeContainer.nodes.find(i => i.ui == element)) {
                element.uiObject.destroyObject();
                this.keyFrames.splice(i, 1);
            }
        }
    }

    /**构建初始UI */
    private buildUI() {
        const perSize = this.lineCanvas.size.x / 60;
        const perSec = this.timeGlobal / 60;
        for (let i = 0; i < 61; i++) {
            const line = mw.Image.newObject(this.lineCanvas);
            const text = mw.TextBlock.newObject(this.lineCanvas);
            line.size = new mw.Vector2(2, i % 5 == 0 ? this.lineCanvas.size.y : this.lineCanvas.size.y / 2);
            line.position = new mw.Vector2(-1 + (perSize * i), i % 5 == 0 ? 0 : this.lineCanvas.size.y / 2);
            text.fontColor = mw.LinearColor.white;
            text.textAlign = mw.TextJustify.Left;
            text.textVerticalAlign = mw.TextVerticalJustify.Top;
            text.autoSizeEnable = true;
            text.fontSize = 9;
            text.outlineSize = 1;
            text.outlineColor = mw.LinearColor.black;
            const m = Math.floor((perSec * i) / 60);
            const s = (perSec * i) % 60;
            text.text = `${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`
            text.position = new mw.Vector2((perSize * i) - 16, this.lineCanvas.size.y - 14);
            this.timeTexts.push(text);
        }
    }

    /**更新时间条 */
    private invalidateTime() {
        const perSec = this.timeGlobal / 60;
        for (let i = 0; i < this.timeTexts.length; i++) {
            const m = Math.floor((perSec * i) / 60);
            const s = (perSec * i) % 60;
            this.timeTexts[i].text = `${(m < 10 ? "0" : "") + m}:${(s < 10 ? "0" : "") + s}`
        }
        this.updateKeyFrames();
    }
    private addTimeGlobal = () => {
        this.timeGlobal += 60;
        this.invalidateTime();
    }
    private subTimeGlobal = () => {
        if (this.timeGlobal > 60) {
            this.timeGlobal -= 60;
            this.invalidateTime();
        }
    }
    /**
     * 当这个UI界面是可以接收事件的时候
     * 手指或则鼠标触发一次Touch时触发
     * 返回事件是否处理了
     * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
     * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
     */
    protected onTouchStarted(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        if (this.keyFlag.tickSpaceGeometry.isUnderLocation(InPointerEvent.screenSpacePosition)) {
            //开始拖动
            Camera.getPlayer().pause();
            this._isDropKey = true;
        } else {
            Event.dispatchToLocal("TravelerUI_TouchBegin");
        }
        return mw.EventReply.handled;
    }
    /**
     * 手指或则鼠标再UI界面上移动时
     */
    protected onTouchMoved(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        const point = mw.absoluteToLocal(this.rootCanvas.tickSpaceGeometry, InPointerEvent.screenSpacePosition);
        if (this._isDropKey) {
            this.keyFlag.position = new mw.Vector2(point.x - 50, 0);
            const percent = point.x / this.rootCanvas.size.x;
            Event.dispatchToLocal("Timeline_Time_Change", parseFloat((percent * this.timeGlobal).toFixed(2)));
        } else {
            Event.dispatchToLocal("TravelerUI_TouchMove", point);
        }
        return mw.EventReply.handled;
    }
    /**
     * 手指或则鼠标离开UI界面时
     */
    protected onTouchEnded(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        const point = mw.absoluteToLocal(this.rootCanvas.tickSpaceGeometry, InPointerEvent.screenSpacePosition);
        if (this._isDropKey) {
            this.keyFlag.position = new mw.Vector2(point.x - 50, 0);
            const percent = point.x / this.rootCanvas.size.x;
            Event.dispatchToLocal("Timeline_Time", parseFloat((percent * this.timeGlobal).toFixed(2)));
            this._isDropKey = false;
        }
        return mw.EventReply.handled;
    }

    get layer(): number {
        return mw.UILayerMiddle;
    }

}
