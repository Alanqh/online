
export class editorUtil {
    static vectorEncode(vec: Vector): string {
        return `V:${vec.x}:${vec.y}:${vec.z}`;
    }

    static rotationEncode(vec: Rotation): string {
        return `R:${vec.x}:${vec.y}:${vec.z}`;
    }

    static vectorDecode(str: string): Vector {
        const [x, y, z] = str.split(':').slice(1).map(parseFloat);
        return new Vector(x, y, z);
    }

    static rotationDecode(str: string): Rotation {
        const [x, y, z] = str.split(':').slice(1).map(parseFloat);
        return new Rotation(x, y, z);
    }
}

export abstract class mwBase {
    /**已播放帧数 */
    public mFrameIndex: number = 0;
    /**动画节点信息 */
    public mNode: nodeBase;
    owner: Character;

    constructor(owner: Character) {
        this.owner = owner;
    }

    setInfo(node: nodeBase) {
        this.mFrameIndex = 0;
        this.mNode = node;
        this.play();
    }

    update(): boolean {
        this.mFrameIndex++;
        if (this.mFrameIndex > this.mNode.frameCount) {
            this.stop();
            this.mNode = null;
            return true;
        }
        return false;
    }
    abstract stop(): void;
    abstract play(): void;
    abstract pause(): void;
    abstract resume(): void;
}

export class mwAnimation extends mwBase {
    owner: mw.Character;

    /**已播放帧数 */
    public mFrameIndex: number = 0;
    /**动画节点信息 */
    public mNode: AnimationNode;

    play(): void {
        if (!this.mNode) return;
        let mAnimation = this.owner.currentAnimation;
        if (this.isPause) {
            this.isPause = false;
            mAnimation?.resume();
        }
        if (mAnimation && mAnimation.assetId == this.mNode.resId + "") {
            if (this.mNode.speed != mAnimation.speed) {
                if (this.mNode.speed == 0) {
                    mAnimation.pause();
                    return;
                } else {
                    mAnimation.speed = this.mNode.speed;
                }
            }
            if (this.mNode.slot != mAnimation.slot) mAnimation.slot = this.mNode.slot;
            mAnimation.play();
        } else {
            let ani = this.owner.loadAnimation(this.mNode.resId + "");
            ani.speed = this.mNode.speed;
            ani.slot = this.mNode.slot;
            ani.play();
        }
    }

    private isPause: boolean = false;

    pause() {
        this.isPause = true;
        let curAnimation = this.owner.currentAnimation;
        if (curAnimation && curAnimation.assetId == this.mNode.resId + "") {
            curAnimation.pause();
        }
    }

    stop() {
        let curAnimation = this.owner.currentAnimation;
        if (curAnimation && curAnimation.assetId == this.mNode.resId + "") {
            this.mNode.speed == 0 ? curAnimation.resume() : curAnimation.stop();
        }
    }

    resume() {
        let curAnimation = this.owner.currentAnimation;
        if (curAnimation && curAnimation.assetId == this.mNode.resId + "") {
            curAnimation.resume();
            this.isPause = false;
        }
    }
}

export class mwEffect extends mwBase {
    owner: mw.Character;

    public mNode: EffectNode;
    private effect: Effect;
    private isStop = false;

    private tween: Tween<{ pos: Vector, rot: Rotation, scale: Vector }> = null;

    stop(): void {
        this.isStop = true;
        this.effect?.stop()
        this.effect && GameObjPool.despawn(this.effect);
        this.tween?.stop();
    }
    private isSpawn: boolean = false;
    async play(): Promise<void> {
        if (this.isSpawn) return;
        let resId = this.mNode.resId;
        if (resId == 0) return;
        if (!this.effect) {
            this.isSpawn = true;
            this.effect = await GameObjPool.asyncSpawn(resId + "");
            this.isSpawn = false;
            if (this.isStop) {
                this.effect && GameObjPool.despawn(this.effect);
                return;
            }
            this.effect.play();
        }
        if (this.mNode.color != "") this.effect.setColor("Color", LinearColor.colorHexToLinearColor(this.mNode.color));
        if (!this.effect) return;
        let char = this.owner;
        let modifyTransform = this.effect.localTransform;
        if (this.mNode.slot > 0) {
            char.attachToSlot(this.effect, this.mNode.slot);
            modifyTransform = this.effect.localTransform;
        } else {
            this.effect.parent = null;
            this.mNode.offset = char.worldTransform.transformPosition(this.mNode.offset);
        }
        if (this.mNode.moveTime > 0) {
            this.tween = new Tween<{ pos: Vector, rot: Rotation, scale: Vector }>(
                {
                    pos: this.mNode.offset.clone(),
                    rot: this.mNode.rotation.clone(),
                    scale: this.mNode.scale.clone()
                }
            ).to(
                {
                    pos: this.mNode.targetOffset.clone(),
                    rot: this.mNode.targetRotation.clone(),
                    scale: this.mNode.targetScale.clone()
                },
                this.mNode.moveTime * 1000
            ).onUpdate(value => {
                modifyTransform.position = value.pos;
                modifyTransform.rotation = value.rot;
                modifyTransform.scale = value.scale;
            }).onComplete(() => {
                this.tween = null;
            }).start();
            return;
        }
        modifyTransform.position = this.mNode.offset;
        modifyTransform.rotation = this.mNode.rotation;
        modifyTransform.scale = this.mNode.scale;
    }
    pause(): void {
        this.tween?.pause();
    }
    resume(): void {
        this.tween?.resume();
    }

}

export class mwModel extends mwBase {
    owner: mw.Character;

    public mNode: EffectNode;
    private model: Model;
    private isStop = false;
    stop(): void {
        this.isStop = true;
        this.model?.destroy();
    }
    private isSpawn: boolean = false;
    async play(): Promise<void> {
        if (this.isSpawn) return;
        let resId = this.mNode.resId;
        if (resId == 0) return;
        if (!this.model) {
            this.isSpawn = true;
            this.model = await GameObject.asyncSpawn(resId + "");
            this.isSpawn = false;
            if (this.isStop) {
                this.model.destroy();
                return;
            }
        }
        if (!this.model) return;
        let char = this.owner;
        if (this.mNode.slot > 0) {
            char.attachToSlot(this.model, this.mNode.slot);
            this.model.localTransform.position = this.mNode.offset;
            this.model.localTransform.rotation = this.mNode.rotation;
        } else {
            this.model.parent = null;
            let pos = char.worldTransform.transformPosition(this.mNode.offset);
            this.model.worldTransform.position = pos;
            this.model.worldTransform.rotation = this.mNode.rotation;
        }
        this.model.worldTransform.scale = this.mNode.scale;
    }
    pause(): void {
    }
    resume(): void {
    }

}


export class mwTransform extends mwBase {
    owner: mw.Character;
    public mNode: TransformNode;
    public nextNode: TransformNode;
    public nextTime: number;

    private static tween: Tween<{}> = null;

    play(): void {
        if (this.owner != Player.localPlayer.character) {
            console.error("不是本地玩家");
            return;
        }
        let mCharacter = Player.localPlayer.character;
        if (!this.nextNode) {
            mCharacter.worldTransform.position = mCharacter.worldTransform.transformPosition(this.mNode.position);
            // mCharacter.worldTransform.rotation = this.mNode.rotation;
            console.error("下个节点为空")
            return;
        }
        if (mwTransform.tween) mwTransform.tween.stop();
        mwTransform.tween = new Tween<{ pos: Vector }>({
            pos: this.mNode.position.clone()

        }).to({
            pos: this.nextNode.position.clone(),

        }, this.nextTime).onUpdate(value => {
            mCharacter.worldTransform.position = mCharacter.worldTransform.transformPosition(value.pos);
        }).start();

        console.log("mwTransform Play");
    }

    pause(): void {
        if (this.owner != Player.localPlayer.character) return;
        mwTransform.tween?.pause();
    }

    resume(): void {
        if (this.owner != Player.localPlayer.character) return;
        mwTransform.tween?.resume();
    }

    stop(): void {

    }
}

export class mwCamera extends mwBase {
    owner: mw.Character;
    public mNode: CameraNode;
    public nextNode: CameraNode;
    public nextTime: number;

    private static tween: Tween<{ pos: Vector, rot: Rotation }> = null;

    play(): void {
        if (this.owner != Player.localPlayer.character) return;
        let camera = Camera.currentCamera;
        if (!this.nextNode) {
            camera.localTransform.position = this.mNode.relative;
            camera.localTransform.rotation = this.mNode.relativeRotation;
            return;
        }
        if (mwCamera.tween) mwCamera.tween.stop();
        mwCamera.tween = new Tween<{ pos: Vector, rot: Rotation }>({
            pos: this.mNode.relative.clone(),
            rot: this.mNode.relativeRotation.clone()
        }).to({
            pos: this.nextNode.relative.clone(),
            rot: this.nextNode.relativeRotation.clone()
        }, this.nextTime).onUpdate(value => {
            camera.localTransform.position = value.pos;
            camera.localTransform.rotation = value.rot;
        }).start();
    }

    pause(): void {
        if (this.owner != Player.localPlayer.character) return;
        mwCamera.tween?.pause();
    }

    resume(): void {
        if (this.owner != Player.localPlayer.character) return;
        mwCamera.tween?.resume();
    }

    stop(): void {

    }
}

export class mwPose extends mwBase {
    owner: mw.Character;
    public mNode: PoseNode;
    private pose: SubStance;

    stop(): void {
        this.pose?.stop();
    }
    private isSpawn: boolean = false;
    async play(): Promise<void> {
        if (this.isSpawn) return;
        let resId = this.mNode.resId;
        if (resId == 0) return;
        this.isSpawn = true;
        this.pose = this.owner.loadSubStance(resId + "");
        this.pose.blendMode = this.mNode.blendMode;
        this.pose.play();
    }
    pause(): void {
    }
    resume(): void {
    }

}

export class mwSound3D extends mwBase {
    owner: mw.Character;
    public mNode: Sound3DNode;
    private soundId: number;

    stop(): void {
        this.soundId ? SoundService.stop3DSound(this.soundId) : null;
    }

    async play(): Promise<void> {
        let resId = this.mNode.resId;
        if (resId == 0) return;
        let pos = this.owner.worldTransform.transformPosition(this.mNode.offset);
        this.soundId = SoundService.play3DSound(resId + "", pos, this.mNode.loopCount, this.mNode.volume, {
            radius: this.mNode.innerRadius,
            falloffDistance: this.mNode.attenuationDistance
        });
    }
    pause(): void {

    }
    resume(): void {

    }

}

export class mwSound2D extends mwBase {
    owner: mw.Character;
    public mNode: Sound2DNode;
    private soundId: string;

    stop(): void {
        this.soundId ? SoundService.stopSound(this.soundId) : null;
    }

    async play(): Promise<void> {
        let resId = this.mNode.resId;
        if (resId == 0) return;
        this.soundId = SoundService.playSound(resId + "", this.mNode.loopCount, this.mNode.volume);
    }

    pause(): void {

    }
    resume(): void {

    }


}


export interface nodeBase {
    frameCount: number;
    copy(): nodeBase;
}

export class AnimationNode implements nodeBase {

    /**动画资源id */
    public resId: number = 0;
    /**动画播放帧数 */
    public frameCount: number = 0;
    /**动画播放速度 */
    public speed: number = 1;
    /**动画插槽 */
    public slot: number = AnimSlot.Default;

    copy() {
        return null;
    }
}

export class EffectNode implements nodeBase {
    frameCount: number = 0;
    /**特效资源id */
    public resId: number = 0;
    /**特效播放插槽 */
    public slot: number = HumanoidSlotType.Head;
    /**特效颜色 */
    public color: string = "";
    /**特效偏移 */
    public offset: Vector = new Vector(0, 0, 0);
    /**特效旋转 */
    public rotation: Rotation = new Rotation(0, 0, 0);
    /**特效缩放 */
    public scale: Vector = new Vector(1, 1, 1);
    /**目标偏移 */
    public targetOffset: Vector = new Vector(0, 0, 0);
    /**目标旋转 */
    public targetRotation: Rotation = new Rotation(0, 0, 0);
    /**目标缩放 */
    public targetScale: Vector = new Vector(1, 1, 1);
    /**移动到目标耗费时间 */
    public moveTime: number = 0;

    copy() {
        let node = new EffectNode();
        node.resId = this.resId;
        node.slot = this.slot;
        node.color = this.color;
        node.offset = this.offset;
        node.rotation = this.rotation;
        node.scale = this.scale;
        node.targetOffset = this.targetOffset;
        node.targetRotation = this.targetRotation;
        node.targetScale = this.targetScale;
        node.moveTime = this.moveTime;
        node.frameCount = this.frameCount;
        return node;
    }
}

export class ModelNode implements nodeBase {
    frameCount: number = 0;
    /**模型资源id */
    public resId: number = 0;
    /**模型插槽 */
    public slot: number = AnimSlot.Default;
    /**模型偏移 */
    public offset: Vector = new Vector(0, 0, 0);
    /**模型旋转 */
    public rotation: Rotation = new Rotation(0, 0, 0);
    /**模型缩放 */
    public scale: Vector = new Vector(1, 1, 1);

    copy() {
        let node = new ModelNode();
        node.resId = this.resId;
        node.slot = this.slot;
        node.offset = this.offset;
        node.rotation = this.rotation;
        node.scale = this.scale;
        node.frameCount = this.frameCount;
        return node;
    }
}

export class CameraNode implements nodeBase {
    frameCount: number = 1000;
    /**相对坐标 */
    public relative: Vector = new Vector(0, 0, 0);
    /**相对旋转 */
    public relativeRotation: Rotation = new Rotation(0, 0, 0);

    copy() {
        return null;
    }
}

export class PoseNode implements nodeBase {
    frameCount: number = 0;
    /**姿态资源id */
    public resId: number = 0;
    /**姿态插槽 */
    public blendMode: number = StanceBlendMode.WholeBody;

    copy() {
        let node = new PoseNode();
        node.resId = this.resId;
        node.blendMode = this.blendMode;
        node.frameCount = this.frameCount;
        return node;
    }
}

export class TransformNode implements nodeBase {
    frameCount: number;
    /**位置 */
    position: Vector = Vector.zero;
    /**旋转 */
    // rotation: Rotation;

    nextNode: TransformNode;
    nextTime: number;

    copy(): nodeBase {
        let node = new TransformNode();
        node.position = this.position;
        // node.rotation = this.rotation;
        node.frameCount = this.frameCount;
        return node;
    }

}

/**3D音效节点 */
export class Sound3DNode implements nodeBase {
    frameCount: number = 0;
    /**音效资源id */
    public resId: number = 0;
    /**音效偏移 */
    public offset: Vector = new Vector(0, 0, 0);
    /**循环次数 */
    public loopCount: number = 1;
    /**音量 */
    public volume: number = 1;
    /**内部半径 */
    public innerRadius: number = 0;
    /**衰减距离 */
    public attenuationDistance: number = 0;

    copy(): nodeBase {
        let node = new Sound3DNode();
        node.resId = this.resId;
        node.offset = this.offset;
        node.frameCount = this.frameCount;
        node.loopCount = this.loopCount;
        node.volume = this.volume;
        node.innerRadius = this.innerRadius;
        node.attenuationDistance = this.attenuationDistance;
        return node;
    }
}

/**2D音效节点 */
export class Sound2DNode implements nodeBase {
    frameCount: number = 0;
    /**音效资源id */
    public resId: number = 0;
    /**音量 */
    public volume: number = 1;
    /**循环次数 */
    public loopCount: number = 1;

    copy(): nodeBase {
        let node = new Sound2DNode();
        node.resId = this.resId;
        node.volume = this.volume;
        node.loopCount = this.loopCount;
        node.frameCount = this.frameCount;
        return node;
    }
}