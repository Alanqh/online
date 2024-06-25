
import { nodeBase, AnimationNode, EffectNode, ModelNode, CameraNode, PoseNode, Sound3DNode, TransformNode, Sound2DNode } from "./AnimationNode";
import { BtnItem, InputItem, VectorItem } from "./TopFrameItem";
import topFrameItem_Generate from "./ui-generate/AnimationEditor/topFrameItem_generate";

export abstract class TopFrame extends topFrameItem_Generate {
    /**复制action */
    public copyAction: Action = new Action();
    /**删除action */
    public deleteAction: Action = new Action();
    /**信息节点 */
    public infoNode: nodeBase;

    abstract play(): void;

    abstract pause(): void;

    abstract stop(): void;

    onStart() {
        this.copyButton.onClicked.add(() => {
            this.copyAction.call();
        })
        this.delButton.onClicked.add(() => {
            this.deleteAction.call();
        })
    }
    setInfo(info: nodeBase) {
        this.mCanvas.removeAllChildren();
        this.infoNode = info;
    }

    abstract copy(): TopFrame;
}

export class AnimationTopFrame extends TopFrame {

    /**动画节点 */
    public infoNode: AnimationNode;
    private animation: Animation;

    play(): void {
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        if (this.animation) {
            this.animation.slot = this.infoNode.slot;
            this.animation.speed = this.infoNode.speed;
            this.animation.resume();
            return;
        }
        this.animation = Player.localPlayer.character.loadAnimation(resId + "");
        this.animation.slot = this.infoNode.slot;
        this.animation.speed = this.infoNode.speed;
        this.animation.loop = 99999;
        this.animation.play();
        this.animation.onFinish.clear();
        this.animation.onFinish.add(() => {
            this.animation = null;
        });
    }

    pause(): void {
        this.animation?.pause();
    }

    stop(): void {
        this.animation?.stop();
        this.animation = null;
    }

    copy() {
        return UIService.create(AnimationTopFrame);
    }

    setInfo(info: AnimationNode): void {
        super.setInfo(info);

        let isPlayItem = UIService.create(BtnItem);
        isPlayItem.init((isPlay) => {
            isPlay ? this.play() : this.pause();
        }, false, "播放");
        this.mCanvas.addChild(isPlayItem.uiObject);

        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
        }, info.resId, "动画资源")
        this.mCanvas.addChild(resInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let speedInput = UIService.create(InputItem);
        speedInput.init((str) => {
            this.infoNode.speed = parseFloat(str);
            this.play();
        }, info.speed, "速度");
        this.mCanvas.addChild(speedInput.uiObject);

        let slotInput = UIService.create(InputItem);
        slotInput.init((str) => {
            this.infoNode.slot = parseInt(str);
            this.play();
        }, info.slot, "槽位");
        this.mCanvas.addChild(slotInput.uiObject);
    }

}

export class EffectTopFrame extends TopFrame {
    /**特效节点 */
    public infoNode: EffectNode;
    private effect: Effect;
    private isSpawned: boolean = false;
    private pos: Vector = Vector.zero;
    private rot: Rotation = Rotation.zero;
    private scale: Vector = Vector.one;

    async play(): Promise<void> {
        if (this.isSpawned) return;
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        this.stop();
        this.isSpawned = true;
        this.effect = await GameObject.asyncSpawn(resId + "");
        this.isSpawned = false;
        this.effect.loop = true;
        this.effect.play();
        if (this.infoNode.color != "") this.effect.setColor("Color", LinearColor.colorHexToLinearColor(this.infoNode.color));
        if (!this.effect) return;
        let char = Player.localPlayer.character;
        if (this.infoNode.slot > 0) {
            char.attachToSlot(this.effect, this.infoNode.slot);
            this.effect.localTransform.position = this.pos;
            this.effect.localTransform.rotation = this.rot;
        } else {
            this.effect.parent = null;
            let pos = char.worldTransform.transformPosition(this.pos);
            this.effect.worldTransform.position = pos;
            this.effect.worldTransform.rotation = this.rot;
        }
        this.effect.worldTransform.scale = this.scale;
    }

    pause(): void {

    }

    stop(): void {
        this.effect?.destroy();
    }

    setInfo(info: EffectNode): void {
        super.setInfo(info);

        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
            this.play();
        }, info.resId, "特效资源")
        this.mCanvas.addChild(resInput.uiObject);

        let slotInput = UIService.create(InputItem);
        slotInput.init((str) => {
            this.infoNode.slot = parseInt(str);
            this.play();
        }, info.slot, "槽位")
        this.mCanvas.addChild(slotInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let colorInput = UIService.create(InputItem);
        colorInput.init((str) => {
            this.infoNode.color = str;
            this.play();
        }, info.color, "颜色")
        this.mCanvas.addChild(colorInput.uiObject);

        let offsetVector = UIService.create(VectorItem);
        offsetVector.init((vec) => {
            this.infoNode.offset = vec;
            this.pos = vec;
            this.play();
        }, info.offset, "偏移");
        this.mCanvas.addChild(offsetVector.uiObject);

        let rotVector = UIService.create(VectorItem);
        rotVector.init((vec) => {
            this.infoNode.rotation = new Rotation(vec);
            this.rot = new Rotation(vec);
            this.play();
        }, new Vector(info.rotation.x, info.rotation.y, info.rotation.z), "旋转");
        this.mCanvas.addChild(rotVector.uiObject);

        let scaleVector = UIService.create(VectorItem);
        scaleVector.init((vec) => {
            this.infoNode.scale = vec;
            this.scale = vec;
            this.play();
        }, info.scale, "缩放");
        this.mCanvas.addChild(scaleVector.uiObject);

        let timeInput = UIService.create(InputItem);
        timeInput.init((str) => {
            this.infoNode.moveTime = parseInt(str);
        }, info.moveTime, "时间")
        this.mCanvas.addChild(timeInput.uiObject);

        let targetOffsetVector = UIService.create(VectorItem);
        targetOffsetVector.init((vec) => {
            this.infoNode.targetOffset = vec;
            this.pos = vec;
            this.play();
        }, info.targetOffset, "目标偏移");
        this.mCanvas.addChild(targetOffsetVector.uiObject);

        let targetRotVector = UIService.create(VectorItem);
        targetRotVector.init((vec) => {
            this.infoNode.targetRotation = new Rotation(vec);
            this.rot = new Rotation(vec);
            this.play();
        }, new Vector(info.targetRotation.x, info.targetRotation.y, info.targetRotation.z), "目标旋转");
        this.mCanvas.addChild(targetRotVector.uiObject);

        let targetScaleVector = UIService.create(VectorItem);
        targetScaleVector.init((vec) => {
            this.infoNode.targetScale = vec;
            this.scale = vec;
            this.play();
        }, info.targetScale, "目标缩放");
        this.mCanvas.addChild(targetScaleVector.uiObject);
    }

    copy() {
        return UIService.create(EffectTopFrame);
    }

}

export class ModelTopFrame extends TopFrame {
    /**模型节点 */
    public infoNode: ModelNode;

    private model: Model;

    private isSpawned: boolean = false;

    async play(): Promise<void> {
        if (this.isSpawned) return;
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        if (!this.model) {
            this.isSpawned = true;
            this.model = await GameObject.asyncSpawn(resId + "");
            this.isSpawned = false;
        }
        if (!this.model) return;
        let char = Player.localPlayer.character;
        if (this.infoNode.slot > 0) {
            char.attachToSlot(this.model, this.infoNode.slot);
            this.model.localTransform.position = this.infoNode.offset;
            this.model.localTransform.rotation = this.infoNode.rotation;
        } else {
            this.model.parent = null;
            let pos = char.worldTransform.transformPosition(this.infoNode.offset);
            this.model.worldTransform.position = pos;
            this.model.worldTransform.rotation = this.infoNode.rotation;
        }
        this.model.worldTransform.scale = this.infoNode.scale;
    }

    pause(): void {

    }

    stop(): void {
        this.model?.destroy();
    }

    copy() {
        return UIService.create(ModelTopFrame);
    }

    setInfo(info: ModelNode): void {
        super.setInfo(info);
        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
            this.play();
        }, info.resId, "模型资源")
        this.mCanvas.addChild(resInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let slotInput = UIService.create(InputItem);
        slotInput.init((str) => {
            this.infoNode.slot = parseInt(str);
            this.play();
        }, info.slot, "槽位")
        this.mCanvas.addChild(slotInput.uiObject);

        let offsetVector = UIService.create(VectorItem);
        offsetVector.init((vec) => {
            this.infoNode.offset = vec;
            this.play();
        }, info.offset, "偏移");
        this.mCanvas.addChild(offsetVector.uiObject);

        let rotVector = UIService.create(VectorItem);
        rotVector.init((vec) => {
            this.infoNode.rotation = new Rotation(vec);
            this.play();
        }, new Vector(info.rotation.x, info.rotation.y, info.rotation.z), "旋转");
        this.mCanvas.addChild(rotVector.uiObject);

        let scaleVector = UIService.create(VectorItem);
        scaleVector.init((vec) => {
            this.infoNode.scale = vec;
            this.play();
        }, info.scale, "缩放");
        this.mCanvas.addChild(scaleVector.uiObject);
    }
}

export class CameraTopFrame extends TopFrame {
    /**摄像机节点 */
    public infoNode: CameraNode;

    oldPos: Vector;
    oldRot: Rotation;

    onStart(): void {
        this.oldPos = Camera.currentCamera.localTransform.position;
        this.oldRot = Camera.currentCamera.localTransform.rotation;
        super.onStart();
    }

    async play(): Promise<void> {
        let camera = Camera.currentCamera;
        camera.localTransform.position = this.infoNode.relative;
        camera.localTransform.rotation = this.infoNode.relativeRotation;
    }

    pause(): void {

    }

    stop(): void {
        Camera.currentCamera.localTransform.position = this.oldPos;
        Camera.currentCamera.localTransform.rotation = this.oldRot;
    }

    copy() {
        return UIService.create(CameraTopFrame);
    }

    setInfo(info: CameraNode): void {
        super.setInfo(info);

        let posVector = UIService.create(VectorItem);
        posVector.init((vec) => {
            this.infoNode.relative = vec;
            this.play();
        }, info.relative, "位置");
        this.mCanvas.addChild(posVector.uiObject);

        let rotVector = UIService.create(VectorItem);
        rotVector.init((vec) => {
            this.infoNode.relativeRotation = new Rotation(vec);
            this.play();
        }, new Vector(info.relativeRotation.x, info.relativeRotation.y, info.relativeRotation.z), "旋转");
        this.mCanvas.addChild(rotVector.uiObject);
    }
}

export class PoseTopFrame extends TopFrame {
    /**姿态节点 */
    public infoNode: PoseNode;
    private stance: SubStance = null;

    play(): void {
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        if (!this.stance) this.stance = Player.localPlayer.character.loadSubStance(resId + "");
        this.stance.blendMode = this.infoNode.blendMode;
        this.stance.play();
    }

    pause(): void {

    }

    stop(): void {
        this.stance?.stop();
    }
    copy() {
        return UIService.create(PoseTopFrame);
    }

    setInfo(info: PoseNode): void {
        super.setInfo(info);
        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
            this.play();
        }, info.resId, "姿态资源")
        this.mCanvas.addChild(resInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let slotInput = UIService.create(InputItem);
        slotInput.init((str) => {
            this.infoNode.blendMode = parseInt(str);
            this.play();
        }, info.blendMode, "槽位")
        this.mCanvas.addChild(slotInput.uiObject);
    }
}

export class Sound3DTopFrame extends TopFrame {
    /**3D音效节点 */
    public infoNode: Sound3DNode;
    private soundId: number;

    play(): void {
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        this.stop();
        let pos = Player.localPlayer.character.worldTransform.transformPosition(this.infoNode.offset);
        this.soundId = SoundService.play3DSound(resId + "", pos, this.infoNode.loopCount, this.infoNode.volume, {
            radius: this.infoNode.innerRadius,
            falloffDistance: this.infoNode.attenuationDistance
        });
    }

    pause(): void {

    }

    stop(): void {
        SoundService.stop3DSound(this.soundId);
    }

    copy() {
        return UIService.create(Sound3DTopFrame);
    }

    setInfo(info: Sound3DNode): void {
        super.setInfo(info);
        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
            this.play();
        }, info.resId, "音效资源")
        this.mCanvas.addChild(resInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let offset = UIService.create(VectorItem);
        offset.init((vec) => {
            this.infoNode.offset = vec;
            this.play();
        }, info.offset, "偏移");
        this.mCanvas.addChild(offset.uiObject);

        let loopInput = UIService.create(InputItem);
        loopInput.init((str) => {
            this.infoNode.loopCount = parseInt(str);
            this.play();
        }, info.loopCount, "循环次数")
        this.mCanvas.addChild(loopInput.uiObject);

        let volumeInput = UIService.create(InputItem);
        volumeInput.init((str) => {
            this.infoNode.volume = parseFloat(str);
            this.play();
        }, info.volume, "音量")

        let innerRadiusInput = UIService.create(InputItem);
        innerRadiusInput.init((str) => {
            this.infoNode.innerRadius = parseFloat(str);
            this.play();
        }, info.innerRadius, "内半径")
        this.mCanvas.addChild(volumeInput.uiObject);

        let attenuationDistanceInput = UIService.create(InputItem);
        attenuationDistanceInput.init((str) => {
            this.infoNode.attenuationDistance = parseFloat(str);
            this.play();
        }, info.attenuationDistance, "衰减距离")
        this.mCanvas.addChild(volumeInput.uiObject);


    }
}

export class TransformTopFrame extends TopFrame{

    public infoNode: TransformNode;
    play(): void {
        let player = Player.localPlayer;
        if (!player) return;
        let char = player.character;
        let worldTransform = char.worldTransform;
        worldTransform.position = worldTransform.transformPosition(this.infoNode.position);
    }
    pause(): void {
        
    }
    stop(): void {
        
    }
    copy(): TopFrame {
        return UIService.create(TransformTopFrame);
    }

    setInfo(info: TransformNode): void {
        super.setInfo(info);
        let posVector = UIService.create(VectorItem);
        posVector.init((vec) => {
            this.infoNode.position = vec;
            this.play();
        }, info.position, "位置");
        this.mCanvas.addChild(posVector.uiObject);

        // let rot = Player.localPlayer.character.worldTransform.rotation;
        // let rotVector = UIService.create(VectorItem);
        // rotVector.init((vec) => {
        //     this.play();
        // }, new Vector(rot.x,rot.y,rot.z), "旋转");
        // this.mCanvas.addChild(rotVector.uiObject);
    }
}

export class Sound2DTopFrame extends TopFrame {
    /**2D音效节点 */
    public infoNode: Sound2DNode;
    private soundId: string;

    play(): void {
        let resId = this.infoNode.resId;
        if (resId == 0) return;
        this.stop();
        this.soundId = SoundService.playSound(resId + "", this.infoNode.loopCount, this.infoNode.volume);
    }

    pause(): void {

    }

    stop(): void {
        SoundService.stopSound(this.soundId);
    }

    copy() {
        return UIService.create(Sound2DTopFrame);
    }

    setInfo(info: Sound2DNode): void {
        super.setInfo(info);
        let resInput = UIService.create(InputItem);
        resInput.init((str) => {
            this.infoNode.resId = parseInt(str);
            this.play();
        }, info.resId, "音效资源")
        this.mCanvas.addChild(resInput.uiObject);

        let frameInput = UIService.create(InputItem);
        frameInput.init((str) => {
            this.infoNode.frameCount = parseInt(str);
        }, info.frameCount, "帧数")
        this.mCanvas.addChild(frameInput.uiObject);

        let loopInput = UIService.create(InputItem);
        loopInput.init((str) => {
            this.infoNode.loopCount = parseInt(str);
            this.play();
        }, info.loopCount, "循环次数")
        this.mCanvas.addChild(loopInput.uiObject);

        let volumeInput = UIService.create(InputItem);
        volumeInput.init((str) => {
            this.infoNode.volume = parseFloat(str);
            this.play();
        }, info.volume, "音量")
        this.mCanvas.addChild(volumeInput.uiObject);
    }
}