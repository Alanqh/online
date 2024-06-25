/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-08 15:11:38
 * @LastEditors  : yuanqi.bai
 * @LastEditTime : 2023-08-08 13:03:32
 * @FilePath     : \stumbleguys\JavaScripts\render\RenderNode.ts
 * @Description  : 修改描述
 */

import { Camera } from "../../../CameraRuntime/Script/Camera";
import { Data } from "../../../CameraRuntime/Script/Data";
import { NodeContainer } from "../NodeContainer";
import KeyFrameUI from "../ui/KeyFrame";




const FORWARD = new UE.Vector(50, 0, 0);
export class RenderNode {


    private obj: mw.GameObject;
    /**是否在编辑状态 */
    private isEditting: boolean = false;
    /**界面 */
    public ui: KeyFrameUI;
    constructor(public data: Data) {
        this.obj = NodeContainer.template.clone();
        this.obj.setVisibility(mw.PropertyStatus.On);
        const rot = new mw.Rotation(data.rotation[0], data.rotation[1], data.rotation[2]);
        const loc = new mw.Vector(data.position[0], data.position[1], data.position[2]);
        this.obj.worldTransform.rotation = rot;
        this.obj.worldTransform.position = loc.add(rot.rotateVector(new mw.Vector(50, 0, 0)));
        this.ui = mw.UIService.create(KeyFrameUI);
    }
    /**销毁节点 */
    public destroy() {
        this.obj.destroy();
    }
    public get isFocus() {
        return this.isEditting;
    }
    public unSelect() {
        if (this.isEditting) {
            this.ui.unselect();
            this.isEditting = false;
            this.data.onChanged.call(this.data);
        }
    }
    public select() {
        if (!this.isEditting) {
            Camera.getPlayer().stop();
            Camera.getPlayer().enterEdit();
            Camera.getPlayer().checkLock(true);
            Camera.getPlayer().skipTo(this.data.time);
            this.ui.select();
            this.isEditting = true;
        }
    }
    public onUpdate(camera: UE.MWSysCameraSystemComponent, dt: number) {
        if (!this.isEditting) return;
        const actor = this.obj["actor"] as UE.Actor;
        const rot = camera.K2_GetComponentRotation();
        const loc = camera.K2_GetComponentLocation();
        actor.K2_SetActorLocationAndRotation(loc.op_Addition(rot.RotateVector(FORWARD)), rot, false, null, false);
        this.data.position[0] = loc.X;
        this.data.position[1] = loc.Y;
        this.data.position[2] = loc.Z;
        this.data.rotation[0] = rot.Roll;
        this.data.rotation[1] = rot.Pitch;
        this.data.rotation[2] = rot.Yaw;
    }
}