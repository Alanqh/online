
import editorMain_Generate from "../../ui-generate/AnimationEditor/editorMain_generate";
import { AnimationNode, EffectNode, ModelNode, CameraNode, PoseNode, Sound2DNode, Sound3DNode, editorUtil, mwBase, mwAnimation, mwEffect, mwModel, mwCamera, nodeBase, TransformNode, mwTransform, mwSound3D, mwSound2D } from "./AnimationNode";
import { CreateUI } from "./CreateUI";
import { AnimationTopFrame, EffectTopFrame, ModelTopFrame, CameraTopFrame, PoseTopFrame, TopFrame, TransformTopFrame, Sound2DTopFrame, Sound3DTopFrame } from "./TopFrame";
import frameItem_Generate from "./ui-generate/AnimationEditor/frameItem_generate";
import infoItem_Generate from "./ui-generate/AnimationEditor/infoItem_generate";

export class EditorMain extends editorMain_Generate {

    /**当前生成的所有动画节点 */
    private mAnimationNodes: Map<number, AnimationNode[]> = new Map();
    /**当前生成的所有特效节点 */
    private mEffectNodes: Map<number, EffectNode[]> = new Map();
    /**当前生成的所有模型节点 */
    private mModelNodes: Map<number, ModelNode[]> = new Map();
    /**当前生成的所有摄像机节点 */
    private mCameraNodes: Map<number, CameraNode[]> = new Map();
    /**当前生成的所有姿态节点 */
    private mPoseNodes: Map<number, PoseNode[]> = new Map();
    /**当前生成的所有2D音效节点 */
    private m2DSoundNodes: Map<number, Sound2DNode[]> = new Map();
    /**当前生成的所有3D音效节点 */
    private m3DSoundNodes: Map<number, Sound3DNode[]> = new Map();
    /**当前生成的移动节点 */
    private mTransformNodes: Map<number, TransformNode[]> = new Map();

    /**当前选中的帧数节点 */
    private mSelectedFrame: frameItem;
    /**当前所有的帧数节点 */
    private allFrameItems: Map<number, frameItem> = new Map();
    /**创建ui */
    private createUI: CreateUI;
    /**所有的创建信息 */
    private saveInfos: SaveInfo[] = [];
    /**当前选中的创建信息 */
    private mSelectedSaveInfo: SaveInfo;

    /**将所有相关节点编码 */
    private encodeAllNode(): string {
        let animation = this.encodeToString(this.mAnimationNodes);
        let effect = this.encodeToString(this.mEffectNodes);
        let model = this.encodeToString(this.mModelNodes);
        let camera = this.encodeToString(this.mCameraNodes);
        let pose = this.encodeToString(this.mPoseNodes);
        let sound2D = this.encodeToString(this.m2DSoundNodes);
        let sound3D = this.encodeToString(this.m3DSoundNodes);
        let TransformNode = this.encodeToString(this.mTransformNodes);
        let endStr = animation + ";" + effect + ";" + model + ";" + camera + ";" + pose + ";" + sound2D + ";" + sound3D + ";" + TransformNode;
        return this.changeStr(endStr);
    }

    /**将当前字符串中所有的\替换为\\ */
    private changeStr(str: string): string {
        let result = str.replace(/\\/g, '\\\\');
        return result;
    }
    /**将当前字符串中所有的\\替换为\ */
    private changeStr2(str: string): string {
        str = str.replace(/\\\\/g, '\\');
        return str;
    }

    /**将所有相关节点解码 */
    private decodeAllNode(str: string): void {
        str = this.changeStr2(str);
        let arr = str.split(";");
        this.mAnimationNodes = this.decodeFromString(arr[0]);
        this.mEffectNodes = this.decodeFromString(arr[1]);
        this.mModelNodes = this.decodeFromString(arr[2]);
        this.mCameraNodes = this.decodeFromString(arr[3]);
        this.mPoseNodes = this.decodeFromString(arr[4]);
        this.m2DSoundNodes = this.decodeFromString(arr[5]);
        this.m3DSoundNodes = this.decodeFromString(arr[6]);
        this.mTransformNodes = this.decodeFromString(arr[7]);
        console.error("decodeAllNode", this.mAnimationNodes, this.mEffectNodes, this.mModelNodes, this.mCameraNodes, this.mPoseNodes);
    }

    // 自定义编码逻辑，考虑包含向量和旋转的对象数组
    encodeToString(map: Map<number, any[]>): string {
        const encodedMap: Record<string, string> = {};
        map.forEach((value, key) => {
            encodedMap[key.toString()] = JSON.stringify(value, (k, v) => {
                // 对向量和旋转进行特殊处理
                if (v instanceof Vector) {
                    return editorUtil.vectorEncode(v);
                } else if (v instanceof Rotation) {
                    return editorUtil.rotationEncode(v);
                }
                return v;
            });
        });
        return JSON.stringify(encodedMap);
    }

    // 自定义解码逻辑，考虑包含向量和旋转的对象数组
    decodeFromString(encodedString: string): Map<number, any[]> {
        const decodedMap: Map<number, any[]> = new Map();
        const encodedMap = JSON.parse(encodedString);
        Object.entries(encodedMap).forEach(([key, value]) => {
            decodedMap.set(parseInt(key, 10), JSON.parse(value as any, (k, v) => {
                // 对向量和旋转进行特殊处理
                if (typeof v === 'string' && v.startsWith('V:')) {
                    return editorUtil.vectorDecode(v);
                } else if (typeof v === 'string' && v.startsWith('R:')) {
                    return editorUtil.rotationDecode(v);
                }
                return v;
            }));
        });
        return decodedMap;
    }

    onStart() {
        console.log("动画编辑器Start！");
        this.canUpdate = true;
        let aa = '{};{};{};{};{"0":"[{ \\"relative\\":\\"V:13:9:0\\",\\"relativeRotation\\":\\"R:7:8:0\\"}]", "3": "[{\\"relative\\":\\"V:12:0:0\\",\\"relativeRotation\\":\\"R:10:0:0\\"}]", "7": "[{\\"relative\\":\\"V:8:8:8\\",\\"relativeRotation\\":\\"R:8:8:8\\"}]", "9": "[{\\"relative\\":\\"V:0:0:0\\",\\"relativeRotation\\":\\"R:0:0:0\\"}]" }; { }'
        InputUtil.onKeyDown(Keys.F1, () => {
            aa = this.encodeAllNode();
            console.error(this.encodeAllNode());
        })
        InputUtil.onKeyDown(Keys.F2, () => {
            this.decodeAllNode(aa);
        })
        this.createUI = UIService.create(CreateUI);
        this.createUI.createUIAction.add((name: string, count: number) => {
            this.generateSaveInfo(name, count);
        })
        this.aniButton.onClicked.add(() => { this.addAnimateNode() });
        this.aniButton_1.onClicked.add(() => { this.addEffectNode() });
        this.aniButton_2.onClicked.add(() => { this.addModelNode() });
        this.aniButton_3.onClicked.add(() => { this.addCameraNode() });
        this.aniButton_4.onClicked.add(() => { this.addPoseNode() });
        this.aniButton_5.onClicked.add(() => { this.addSound2DNode() });
        this.aniButton_6.onClicked.add(() => { this.addSound3DNode() });
        this.aniButton_7.onClicked.add(() => { this.addTransformNode() });
        // this.anibutton;
        this.createButton.onClicked.add(() => {
            this.createUI.show();
        })
        this.playButton.onClicked.add(() => {
            console.log("播放");
            this.mIsUpdate = true;
            this.mFrameIndex = -1;
            this.mTimer = 0;
            isPause = false;
            this.allMwBase.forEach(base => {
                base.stop();
            })
            this.allMwBase.length = 0;
        });
        let isPause = false;
        this.pauseButton.onClicked.add(() => {
            this.mIsUpdate = isPause;
            this.allMwBase.forEach(mw => {
                isPause ? mw.resume() : mw.pause();
            })
            isPause = true;
        });
        this.addButton.onClicked.add(() => {
            let i = this.allFrameItems.size;
            let frame = this.generateFrame(i);
            if (i == 0) frame.selectAction.call();
        });
        this.subButton.onClicked.add(() => {
            let i = this.allFrameItems.size;
            if (i == 0) return;
            this.allFrameItems.get(i - 1).deleteAction.call();
            this.allFrameItems.delete(i - 1);
        });
        let encode = "";
        this.mInputButton.onClicked.add(() => {
            let str = this.encodeAllNode();
            encode = str;
            this.mNameCanvas.visibility = SlateVisibility.Visible;
        })
        this.nameButton.onClicked.add(() => {
            if (this.nameInputBox.text == "") return;
            this.mInputInputBox.text = this.nameInputBox.text + ":" + encode;
            this.mNameCanvas.visibility = SlateVisibility.Collapsed;
        })
        this.mNameCanvas.visibility = SlateVisibility.Collapsed;
        this.mOutButton.onClicked.add(() => {
            this.destroyAllNode();
            this.mFrameCanvas.removeAllChildren();
            this.allFrameItems.clear();
            this.mSelectedFrame = null;
            let str = this.mOutInputBox.text;
            this.decodeAllNode(str);
            console.log("退出----------------");
            let maxCount = 0;
            let countMap = new Map<number, number>();
            this.mAnimationNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.mEffectNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.mModelNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.mCameraNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.mPoseNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.m2DSoundNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.m3DSoundNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            this.mTransformNodes.forEach((value, key) => {
                maxCount = this.saveCount(key, maxCount, countMap, value);
            })
            for (let i = 0; i <= maxCount; i++) {
                let frame = this.generateFrame(i);
                let count = 0;
                if (countMap.has(i)) {
                    count = countMap.get(i);
                }
                if (i == 0) this.selectFrame(frame);
                if (count > 0) frame.addContent(count)
            }

        })
    }

    private saveCount(key: number, maxCount: number, countMap: Map<number, number>, value: any[]): number {
        if (key > maxCount) maxCount = key;
        let count = countMap.get(key);
        if (count) {
            countMap.set(key, count + value.length);
        } else {
            countMap.set(key, value.length);
        }
        return maxCount;
    }


    protected onUpdate(dt: number): void {
        this.update(dt);
    }
    /**当前轮询到了第几帧 */
    private mFrameIndex: number = -1;
    /**轮询计时器 */
    private mTimer: number = 0;
    /**是否开始轮询 */
    private mIsUpdate: boolean = false;
    private allMwBase: mwBase[] = [];

    /**1秒20帧的轮询间隔 */
    private update(dt: number) {
        if (!this.mIsUpdate) return;
        this.mTimer += dt;
        if (this.mTimer < 0.05) return;
        this.mTimer = 0;
        this.mFrameIndex++;
        this.execute(this.mFrameIndex);
        if (this.mFrameIndex >= this.allFrameItems.size - 1) {
            this.mFrameIndex = -1;
            this.mIsUpdate = false;
            // 最后一帧  停止所有！！！
            this.allMwBase.forEach(base => {
                base.stop();
            })
        }
    }

    /**执行功能 */
    private execute(frameIndex: number) {
        //遍历allMwBase执行update 如果返回值为true，则从数组中删除该对象
        this.allMwBase = this.allMwBase.filter(mw => !mw.update());
        let frame = this.allFrameItems.get(frameIndex);
        if (frame) this.selectFrame(frame, false);
        this.creatFrameAnimation(this.mAnimationNodes.get(frameIndex));
        this.creatFrameEffect(this.mEffectNodes.get(frameIndex));
        this.creatFrameModel(this.mModelNodes.get(frameIndex));
        this.creatFrameCamera(this.mCameraNodes.get(frameIndex), frameIndex);
        this.creatFramePose(this.mPoseNodes.get(frameIndex));
        this.creatFrame2DSound(this.m2DSoundNodes.get(frameIndex));
        this.creatFrame3DSound(this.m3DSoundNodes.get(frameIndex));
        this.createFrameTransform(this.mTransformNodes.get(frameIndex), frameIndex);
    }

    /**生成当前帧的动画 */
    private creatFrameAnimation(aniInfos: AnimationNode[]) {
        if (aniInfos) aniInfos.forEach(aniInfo => {
            let ani = new mwAnimation(Player.localPlayer.character);
            ani.setInfo(aniInfo);
            this.allMwBase.push(ani);
        })
    }

    /**生成当前帧的特效 */
    private creatFrameEffect(effectInfos: EffectNode[]) {
        if (effectInfos) effectInfos.forEach(effectInfo => {
            let effect = new mwEffect(Player.localPlayer.character);
            effect.setInfo(effectInfo);
            this.allMwBase.push(effect);
        })
    }

    /**生成当前帧的模型 */
    private creatFrameModel(modelInfos: ModelNode[]) {
        if (modelInfos) modelInfos.forEach(modelInfo => {
            let model = new mwModel(Player.localPlayer.character);
            model.setInfo(modelInfo);
            this.allMwBase.push(model);
        })
    }

    /**生成当前帧的相机 */
    private creatFrameCamera(cameraInfos: CameraNode[], currentFrame: number) {
        /**寻找下一帧的摄像机节点 */
        let nextNodes: CameraNode[] = null;
        let nextTime = 0;
        this.mCameraNodes.forEach((cameraNode, id) => {
            if (!nextNodes && id > currentFrame) {
                nextNodes = cameraNode;
                nextTime = (id - currentFrame) / 20 * 1000;
            }
        })
        if (cameraInfos) cameraInfos.forEach(cameraInfo => {
            let camera = new mwCamera(Player.localPlayer.character);
            if (nextNodes) camera.nextNode = nextNodes[0];
            camera.nextTime = nextTime;
            camera.setInfo(cameraInfo);
            this.allMwBase.push(camera);
        })
    }

    /**创建当前帧的位移 */
    private createFrameTransform(transformInfos: TransformNode[], currentFrame: number) {
        /**寻找下一帧的摄像机节点 */
        let nextNodes: TransformNode[] = null;
        let nextTime = 0;
        this.mTransformNodes.forEach((transformNode, id) => {
            if (!nextNodes && id > currentFrame) {
                nextNodes = transformNode;
                nextTime = (id - currentFrame) / 20 * 1000;
            }
        })
        if (transformInfos) transformInfos.forEach(tfInfo => {
            let tf = new mwTransform(Player.localPlayer.character);
            if (nextNodes) tf.nextNode = nextNodes[0];
            tf.nextTime = nextTime;
            tf.setInfo(tfInfo);
            this.allMwBase.push(tf);
        })
    }


    /**生成当前帧的姿态 */
    private creatFramePose(poseInfos: PoseNode[]) {
        if (poseInfos) poseInfos.forEach(poseInfo => {
            let pose = new mwModel(Player.localPlayer.character);
            pose.setInfo(poseInfo);
            this.allMwBase.push(pose);
        })
    }

    /**生成当前帧的3D音效 */
    private creatFrame3DSound(soundInfos: Sound3DNode[]) {
        if (soundInfos) soundInfos.forEach(soundInfo => {
            let sound = new mwSound3D(Player.localPlayer.character);
            sound.setInfo(soundInfo);
            this.allMwBase.push(sound);
        })
    }
    /**生成当前帧的2D音效 */
    private creatFrame2DSound(soundInfos: Sound2DNode[]) {
        if (soundInfos) soundInfos.forEach(soundInfo => {
            let sound = new mwSound2D(Player.localPlayer.character);
            sound.setInfo(soundInfo);
            this.allMwBase.push(sound);
        })
    }

    /**生成保存信息 */
    private generateSaveInfo(name: string, count: number): SaveInfo {
        let saveInfo = UIService.create(SaveInfo);
        saveInfo.setInfo(this.saveInfos.length, name, count);
        saveInfo.deleteAction.add(() => {
            this.saveInfos.splice(saveInfo.mindex, 1);
            saveInfo.destroy();
        });
        saveInfo.selectAction.add(() => {
            if (this.mSelectedSaveInfo) this.mSelectedSaveInfo.onSeleted(false);
            this.mSelectedSaveInfo = saveInfo;
            saveInfo.onSeleted(true);
            for (let i = 0; i < saveInfo.count; i++) {
                let frame = this.generateFrame(i);
                if (i == 0) this.selectFrame(frame);
            }
        });
        this.saveInfos.push(saveInfo);
        this.createUI.hide();
        saveInfo.selectAction.call();
        this.mSaveCanvas.addChild(saveInfo.uiObject);
        return saveInfo;
    }

    /**生成frame */
    private generateFrame(index: number): frameItem {
        let frame = UIService.create(frameItem);
        frame.index = index;
        frame.selectAction.add(() => {
            this.selectFrame(frame);
        });
        frame.deleteAction.add(() => {
            if (this.mSelectedFrame == frame) {
                this.mSelectedFrame = null;
                this.destroyAllNode();
            }
            frame.destroy();
        });
        frame.setInfo(index);
        this.allFrameItems.set(index, frame);
        this.mFrameCanvas.addChild(frame.uiObject);
        return frame;
    }

    /**选择frame */
    private selectFrame(frame: frameItem, isPlay: boolean = true) {
        if (this.mSelectedFrame != frame) {
            this.mSelectedFrame?.setSelected(false);
            this.destroyAllNode();
        }
        this.mSelectedFrame = frame;
        frame.setSelected(true);
        if (isPlay) this.generateCurrentUI(frame.index);
    }

    /**生成当前节点显示的node */
    private generateCurrentUI(index: number) {
        let aniArr = this.mAnimationNodes.get(index);
        if (aniArr) {
            for (let i = 0; i < aniArr.length; i++) {
                let ani = aniArr[i];
                this.generateNodeUI(ani, this.mAnimationNodes, UIService.create(AnimationTopFrame));
            }
        }
        let effectArr = this.mEffectNodes.get(index);
        if (effectArr) {
            for (let i = 0; i < effectArr.length; i++) {
                let effect = effectArr[i];
                this.generateNodeUI(effect, this.mEffectNodes, UIService.create(EffectTopFrame));
            }
        }
        let modelArr = this.mModelNodes.get(index);
        if (modelArr) {
            for (let i = 0; i < modelArr.length; i++) {
                let model = modelArr[i];
                this.generateNodeUI(model, this.mModelNodes, UIService.create(ModelTopFrame));
            }
        }
        let cameraArr = this.mCameraNodes.get(index);
        if (cameraArr) {
            for (let i = 0; i < cameraArr.length; i++) {
                let camera = cameraArr[i];
                this.generateNodeUI(camera, this.mCameraNodes, UIService.create(CameraTopFrame));
            }
        }
        let poseArr = this.mPoseNodes.get(index);
        if (poseArr) {
            for (let i = 0; i < poseArr.length; i++) {
                let pose = poseArr[i];
                this.generateNodeUI(pose, this.mPoseNodes, UIService.create(PoseTopFrame));
            }
        }
        let Sound2DArr = this.m2DSoundNodes.get(index);
        if (Sound2DArr) {
            for (let i = 0; i < Sound2DArr.length; i++) {
                let pose = Sound2DArr[i];
                this.generateNodeUI(pose, this.m2DSoundNodes, UIService.create(Sound2DTopFrame));
            }
        }
        let Sound3DArr = this.m3DSoundNodes.get(index);
        if (Sound3DArr) {
            for (let i = 0; i < Sound3DArr.length; i++) {
                let pose = Sound3DArr[i];
                this.generateNodeUI(pose, this.m3DSoundNodes, UIService.create(Sound3DTopFrame));
            }
        }
        let TransformArr = this.mTransformNodes.get(index);
        if (TransformArr) {
            for (let i = 0; i < TransformArr.length; i++) {
                let Transform = TransformArr[i];
                this.generateNodeUI(Transform, this.mTransformNodes, UIService.create(TransformTopFrame));
            }
        }
    }

    /**销毁所有节点 */
    private destroyAllNode() {
        this.allTopFrame.forEach((frame) => {
            frame.stop();
        });
        this.mTopFrameCanvas.removeAllChildren();
        this.allTopFrame.clear();
    }

    /**添加动画节点 */
    addAnimateNode() {
        if (!this.mSelectedFrame) return;
        let arr = this.mAnimationNodes.get(this.mSelectedFrame.index);
        if (arr && arr.length > 0) return;
        this.generateNode(new AnimationNode(), this.mAnimationNodes, UIService.create(AnimationTopFrame));
    }
    /**添加暂提节点 */
    addAnimationPauseNode() {
        if (!this.mSelectedFrame) return;
        let pauseInfo = new AnimationNode();
        pauseInfo.speed = 0;
        this.generateNode(pauseInfo, this.mAnimationNodes, UIService.create(AnimationTopFrame));
    }
    /**添加特效节点 */
    addEffectNode() {
        if (!this.mSelectedFrame) return;
        this.generateNode(new EffectNode(), this.mEffectNodes, UIService.create(EffectTopFrame));
    }
    /**添加模型节点 */
    addModelNode() {
        if (!this.mSelectedFrame) return;
        this.generateNode(new ModelNode(), this.mModelNodes, UIService.create(ModelTopFrame));
    }
    /**添加摄像机节点 */
    addCameraNode() {
        if (!this.mSelectedFrame) return;
        let arr = this.mCameraNodes.get(this.mSelectedFrame.index);
        if (arr && arr.length > 0) return;
        this.generateNode(new CameraNode(), this.mCameraNodes, UIService.create(CameraTopFrame));
    }
    /**添加移动节点 */
    addTransformNode() {
        if (!this.mSelectedFrame) return;
        let arr = this.mTransformNodes.get(this.mSelectedFrame.index);
        if (arr && arr.length > 0) return;
        this.generateNode(new TransformNode(), this.mTransformNodes, UIService.create(TransformTopFrame));
        console.log("添加移动节点");
    }
    /**添加姿态节点 */
    addPoseNode() {
        if (!this.mSelectedFrame) return;
        this.generateNode(new PoseNode(), this.mPoseNodes, UIService.create(PoseTopFrame));
    }
    /**添加2d音乐节点 */
    addSound2DNode() {
        if (!this.mSelectedFrame) return;
        this.generateNode(new Sound2DNode(), this.m2DSoundNodes, UIService.create(Sound2DTopFrame));
    }
    /**添加3d音乐节点 */
    addSound3DNode() {
        if (!this.mSelectedFrame) return;
        this.generateNode(new Sound3DNode(), this.m3DSoundNodes, UIService.create(Sound3DTopFrame));
    }
    /**节点生成 */
    private generateNode(node: nodeBase, nodes: Map<number, nodeBase[]>, topFrame: TopFrame) {
        let frame = this.mSelectedFrame.index;
        let effectNodes = nodes.get(frame);
        if (!effectNodes) {
            effectNodes = [];
            nodes.set(frame, effectNodes);
        }
        effectNodes.push(node);
        this.mSelectedFrame.addContent();
        this.generateNodeUI(node, nodes, topFrame);
    }

    private allTopFrame: Set<TopFrame> = new Set();
    private generateNodeUI(node: nodeBase, nodes: Map<number, nodeBase[]>, topFrame: TopFrame, isPlay: boolean = false) {
        console.log("生成帧节点UI！")
        let frame = this.mSelectedFrame.index;
        topFrame.copyAction.add(() => {
            let newNode = node.copy();
            if (newNode) this.generateNode(newNode, nodes, topFrame.copy());
        })
        topFrame.deleteAction.add(() => {
            if (this.allTopFrame.has(topFrame)) {
                this.allTopFrame.delete(topFrame);
            }
            topFrame.stop();
            let effectNodes = nodes.get(frame);
            if (effectNodes) {
                let index = effectNodes.indexOf(node);
                if (index >= 0) {
                    effectNodes.splice(index, 1);
                    this.mSelectedFrame.removeContent();
                    topFrame.destroy();
                }
            }
        })
        topFrame.setInfo(node);
        this.mTopFrameCanvas.addChild(topFrame.uiObject);
        this.allTopFrame.add(topFrame);
    }

}

class frameItem extends frameItem_Generate {

    /**当前item是否被选中 */
    private isSelected: boolean = false;
    /**选中itemaction */
    public selectAction: Action = new Action();
    public deleteAction: Action = new Action();
    /**当前内容数量 */
    public contentCount: number = 0;
    public index: number = 0;

    onStart() {
        this.mSelectImage.visibility = SlateVisibility.Collapsed;
        this.mImage.visibility = SlateVisibility.Collapsed;
        this.mButton.onClicked.add(() => {
            this.selectAction.call();
        })
    }

    setInfo(index: number) {
        this.index = index;
        this.mIndex.text = index + "";
    }

    setSelected(isSelect: boolean) {
        this.isSelected = isSelect;
        this.mSelectImage.visibility = isSelect ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /**添加内容 */
    addContent(num: number = 1) {
        this.contentCount += num;
        this.mImage.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**删除内容 */
    removeContent(num: number = 1) {
        this.contentCount -= num;
        if (this.contentCount <= 0) {
            this.mImage.visibility = SlateVisibility.Collapsed;
        }
    }

}

class SaveInfo extends infoItem_Generate {

    /**删除action */
    public deleteAction: Action = new Action();
    /**选中action */
    public selectAction: Action = new Action();
    public mindex: number = -1;
    public count: number = 0;

    onStart() {
        this.mSelectImage.visibility = SlateVisibility.Collapsed;
        this.delButton.onClicked.add(() => {
            this.deleteAction.call();
        });
        this.selectButton.onClicked.add(() => {
            this.selectAction.call();
        });
    }

    onSeleted(isSelect: boolean) {
        this.mSelectImage.visibility = isSelect ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    setInfo(index: number, name: string, count: number) {
        this.name.text = name;
        this.time.text = count + "帧";
        this.index.text = index + "";
        this.count = count;
        this.mindex = index;
    }
}
