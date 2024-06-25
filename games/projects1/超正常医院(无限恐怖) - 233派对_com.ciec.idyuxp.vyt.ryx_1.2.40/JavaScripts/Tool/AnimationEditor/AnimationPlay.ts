import { AnimationNode, EffectNode, ModelNode, CameraNode, PoseNode, mwCamera, mwAnimation, mwEffect, mwModel, mwBase, mwTransform, TransformNode, mwSound3D, Sound3DNode, Sound2DNode, mwSound2D } from "./AnimationNode";

/**帧事件 */
export class FrameEvent {
    /**事件 */
    eventName: string;
    /**参数 */
    params: any[];

    constructor(eventName: string, ...params: any) {
        this.eventName = eventName;
        this.params = params;
    }
}

export class AnimationPlayManager {

    private static _instance: AnimationPlayManager = null;
    public static get instance(): AnimationPlayManager {
        if (AnimationPlayManager._instance == null) {
            AnimationPlayManager._instance = new AnimationPlayManager();
            AnimationPlayManager._instance.init();
        }
        return AnimationPlayManager._instance;
    }
    private _isInit: boolean = false;
    public init() {
        if (this._isInit) return;
        this._isInit = true;
        TimeUtil.onEnterFrame.add(this.onUpdate, this);
    }

    private allAnimation: Map<Character, AnimationPlay> = new Map<Character, AnimationPlay>();

    playAnimationEditor(char: Character, animationStr: string): AnimationPlay {
        let animation = this.allAnimation.get(char);
        if (animation == null) {
            animation = new AnimationPlay(char);
            this.allAnimation.set(char, animation);
        } else {
            animation.stopAnimation();
        }
        animationStr = this.changeStr2(animationStr);
        animation.playAnimation(animationStr);
        return animation;
    }

    /**将当前字符串中所有的\\替换为\ */
    private changeStr2(str: string): string {
        let index = str.indexOf(':');
        str = str.substring(index + 1);
        str = str.replace(/\\\\/g, '\\');
        return str;
    }

    stopAnimationEditor(char: Character): void {
        let animation = this.allAnimation.get(char);
        if (animation != null) {
            animation.stopAnimation();
            this.allAnimation.delete(char);
        }
    }

    onUpdate(dt: number) {
        this.allAnimation.forEach(animation => {
            animation.update(dt);
        });
    }
}

class AnimationPlay {

    private owner: Character;

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
    /**当前所有位置节点 */
    private mTransformNodes: Map<number, TransformNode[]> = new Map();
    /**帧事件 key: 事件帧  value: 事件名 */
    private mFrameEvent: Map<number, string> = new Map();
    /**播放动画结束时的回调 */
    public onFinish: Action = new Action();

    constructor(owner: Character) {
        this.owner = owner;
        if (owner == null) return;
    }

    playAnimation(animationStr: string): void {
        this.decodeAllNode(animationStr);
        this.mIsUpdate = true;
        this.mFrameIndex = -1;
        this.mTimer = 0;
        // 播动画编辑器动画前，先记录当前播放的动画，如果是持续动画，则在播放结束后继续播放
        let animBeforePlay = this.owner.currentAnimation;
        let continuePlay = animBeforePlay && animBeforePlay.isPlaying && animBeforePlay?.loop == 0;
        this.onFinish.add(() => {
            if (continuePlay) animBeforePlay.play();
        })
    }

    /**当前轮询到了第几帧 */
    private mFrameIndex: number = -1;
    /**轮询计时器 */
    private mTimer: number = 0;
    /**是否开始轮询 */
    private mIsUpdate: boolean = false;
    private allMwBase: mwBase[] = [];
    private maxLength: number = 5;

    /**1秒20帧的轮询间隔 */
    public update(dt: number) {
        if (!this.mIsUpdate) return;
        this.mTimer += dt;
        if (this.mTimer < 0.05) return;
        this.mTimer = 0;
        this.mFrameIndex++;
        this.execute(this.mFrameIndex);
        if (this.mFrameIndex >= this.maxLength - 1) {
            this.stopAnimation();
        }
    }

    /**执行功能 */
    private execute(frameIndex: number) {
        // console.log("执行~");
        //遍历allMwBase执行update 如果返回值为true，则从数组中删除该对象
        this.allMwBase = this.allMwBase.filter(mw => !mw.update());
        this.creatFrameAnimation(this.mAnimationNodes.get(frameIndex));
        this.creatFrameEffect(this.mEffectNodes.get(frameIndex));
        this.creatFrameModel(this.mModelNodes.get(frameIndex));
        this.creatFrameCamera(this.mCameraNodes.get(frameIndex), frameIndex);
        this.creatFrame2DSound(this.m2DSoundNodes.get(frameIndex));
        this.creatFrame3DSound(this.m3DSoundNodes.get(frameIndex));
        this.createFrameTransform(this.mTransformNodes.get(frameIndex), frameIndex);
        let eventName = this.mFrameEvent.get(frameIndex);
        if (eventName) {
            console.log(`在第${frameIndex}帧 执行事件${eventName}`);
            Event.dispatchToLocal(eventName, this.owner.player);
        }
    }

    /**生成当前帧的动画 */
    private creatFrameAnimation(aniInfos: AnimationNode[]) {
        if (aniInfos) aniInfos.forEach(aniInfo => {
            let ani = new mwAnimation(this.owner);
            ani.setInfo(aniInfo);
            this.allMwBase.push(ani);
        })
    }

    /**生成当前帧的特效 */
    private creatFrameEffect(effectInfos: EffectNode[]) {
        if (effectInfos) effectInfos.forEach(effectInfo => {
            let effect = new mwEffect(this.owner);
            effect.setInfo(effectInfo);
            this.allMwBase.push(effect);
        })
    }

    /**生成当前帧的模型 */
    private creatFrameModel(modelInfos: ModelNode[]) {
        if (modelInfos) modelInfos.forEach(modelInfo => {
            let model = new mwModel(this.owner);
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
            let camera = new mwCamera(this.owner);
            if (nextNodes) camera.nextNode = nextNodes[0];
            camera.nextTime = nextTime;
            camera.setInfo(cameraInfo);
            this.allMwBase.push(camera);
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
            let tf = new mwTransform(this.owner);
            if (nextNodes) tf.nextNode = nextNodes[0];
            tf.nextTime = nextTime;
            tf.setInfo(tfInfo);
            this.allMwBase.push(tf);
        })
    }

    stopAnimation(): void {
        this.mIsUpdate = false;
        this.mFrameIndex = -1;
        this.mTimer = 0;
        this.allMwBase.forEach(base => {
            base.stop();
        })
        this.onFinish.call();
        this.allMwBase.length = 0;
        this.onFinish.clear();
    }

    /**将所有相关节点解码 */
    private decodeAllNode(str: string): void {
        let arr = str.split(";");
        this.mAnimationNodes = this.decodeFromString(arr[0]);
        this.mEffectNodes = this.decodeFromString(arr[1]);
        this.mModelNodes = this.decodeFromString(arr[2]);
        this.mCameraNodes = this.decodeFromString(arr[3]);
        this.mPoseNodes = this.decodeFromString(arr[4]);
        this.m2DSoundNodes = this.decodeFromString(arr[5]);
        this.m3DSoundNodes = this.decodeFromString(arr[6]);
        this.mTransformNodes = this.decodeFromString(arr[7]);
        this.maxLength = 0;
        this.mAnimationNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.mEffectNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.mModelNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.mCameraNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.mPoseNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.m2DSoundNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.m3DSoundNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })
        this.mTransformNodes.forEach((value, key) => {
            if (key > this.maxLength) this.maxLength = key;
        })

    }

    // 自定义编码逻辑，考虑包含向量和旋转的对象数组
    encodeToString(map: Map<number, any[]>): string {
        const encodedMap: Record<string, string> = {};
        map.forEach((value, key) => {
            encodedMap[key.toString()] = JSON.stringify(value, (k, v) => {
                // 对向量和旋转进行特殊处理
                if (v instanceof Vector) {
                    return playUtil.vectorEncode(v);
                } else if (v instanceof Rotation) {
                    return playUtil.rotationEncode(v);
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
                    return playUtil.vectorDecode(v);
                } else if (typeof v === 'string' && v.startsWith('R:')) {
                    return playUtil.rotationDecode(v);
                }
                return v;
            }));
        });
        return decodedMap;
    }

    /**设置帧事件 */
    public setFrameEvent(frame: number, eventName: string): void {
        this.mFrameEvent.set(frame, eventName);
    }

}

class playUtil {
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

AnimationPlayManager.instance;