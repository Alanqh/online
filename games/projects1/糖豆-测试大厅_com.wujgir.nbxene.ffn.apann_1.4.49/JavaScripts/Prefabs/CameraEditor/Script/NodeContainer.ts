
import { Camera } from "../../CameraRuntime/Script/Camera";
import { RenderNode } from "./render/RenderNode";
import KeyFrameUI from "./ui/KeyFrame";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-02-08 09:59:25
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-10-29 14:07:42
 * @FilePath     : \stumbleguys_new\JavaScripts\Prefabs\CameraEditor\Script\NodeContainer.ts
 * @Description  : 修改描述
 */
export namespace NodeContainer {
    export let nodes: RenderNode[] = [];
    export let template: mw.GameObject;
    export function insertNode(node: RenderNode) {
        let insertIndex = nodes.length;
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            if (element.data.time == node.data.time) {
                //更新现有的节点
                element.data.clone(node.data);
                return;
            }
            else if (element.data.time > node.data.time) {
                insertIndex = i;
                break;
            }
        }
        nodes.splice(insertIndex, 0, node);
    }

    export function insertNodes(insertNodes: RenderNode[]) {
        for (let i = 0; i < insertNodes.length; i++) {
            insertNode(insertNodes[i]);
        }
    }
    export function delCurrentNode() {
        const focusNode = nodes.findIndex(i => i.isFocus);
        if (focusNode >= 0) {
            nodes[focusNode].destroy();
            nodes.splice(focusNode, 1);
        }
    }
    function init() {
        Event.addLocalListener("KeyFrame.Click", (frame: KeyFrameUI) => {
            const focusNode = nodes.find(i => i.isFocus);
            const currentNode = nodes.find(i => i.ui == frame);
            if (focusNode == currentNode) {
                currentNode.unSelect();
                return;
            }
            if (focusNode) focusNode.unSelect();
            currentNode.select();
        });
        Event.addLocalListener("Timeline_Time_Change", (time: number) => {
            const focusNode = nodes.find(i => i.isFocus);
            if (focusNode) {
                focusNode.data.time = time;
                Event.dispatchToLocal("CameraMainPanel.UpdateFrame");
            } else {
                Camera.getPlayer().skipTo(time);
            }
        });

        Player.asyncGetLocalPlayer().then(player => {
            const cameraSystem = mw.Camera.currentCamera["ueCamera"].CameraSystemComponent.CameraComponent;
            setInterval(() => {
                const focusNode = nodes.find(i => i.isFocus);
                if (focusNode) {
                    focusNode.onUpdate(cameraSystem, 1);
                }
            }, 1);
        });

    }
    if (SystemUtil.isClient()) {

        init();
    }

}