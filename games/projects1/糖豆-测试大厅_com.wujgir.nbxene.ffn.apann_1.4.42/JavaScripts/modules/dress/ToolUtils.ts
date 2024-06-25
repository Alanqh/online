import { PlayerManagerExtesion } from '../../Modified027Editor/ModifiedPlayer';
import { SpawnManager } from '../../Modified027Editor/ModifiedSpawn';
import { GeneralManager } from '../../Modified027Editor/ModifiedStaticAPI';
import { ZwtTween } from "../../tool/ZwtTween";

1
export class ToolUtils {

    public static tempVector = mw.Vector.zero;
    public static tempVector2 = mw.Vector2.zero;
    public static tempRotation = mw.Rotation.zero;
    private static formatNumberBits = [1000000000000000000000000, 1000000000000000000000, 1000000000000000000, 1000000000000000, 1000000000000, 1000000000, 1000000, 1000];
    private static formatNumberString = ["ad", "ac", "ab", "aa", "T", "B", "M", "k"];

    /**
     * 格式化数字显示
     * @param value 
     * @returns 
     */
    static formatNumber(value: number) {
        for (let i = 0; i < ToolUtils.formatNumberBits.length; i++) {
            if (value > ToolUtils.formatNumberBits[i]) {
                return (value / ToolUtils.formatNumberBits[i]).toFixed(2) + ToolUtils.formatNumberString[i];
            }
        }
        return value.toString();
    }
    /**
     * 格式化字符串
     * @param text xx{0}xx,xx{1}xx
     * @param params 
     * @returns 
     */
    // static formatText(text: string, ...params: any[]) {
    //     text = DataServices.getLanguage(text);
    //     return text.replace(/\{(\d+)\}/g, (text, index) => {
    //         return params[index];
    //     });
    // }

    /**
     * 创建一个物体
     */
    static spawnGo<T extends mw.GameObject>(guid: string, bInReplicates: boolean = false) {
        return SpawnManager.wornSpawn(guid, bInReplicates) as T;
    }

    /**
     * 寻找一个物体
     */
    static findGo<T extends mw.GameObject>(guid: string) {
        return GameObject.findGameObjectById(guid) as T;
    }

    /**
     * 随机一个靠近最大值的数
     * @param min 
     * @param max 
     * @returns 
     */
    static rangeFloatToMax(min: number, max: number): number {
        return ToolUtils.rangeFloat(max - ToolUtils.rangeFloat(min, max), max);
    }
    /**
    * 随机一个靠近最小值的数
    * @param min 
    * @param max 
    * @returns 
    */
    static rangeFloatToMin(min: number, max: number): number {
        return ToolUtils.rangeFloat(min, max - ToolUtils.rangeFloat(min, max));
    }
    static rangeFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    static rangeInt(min: number, max: number): number {
        return Math.floor(ToolUtils.rangeFloat(min, max));
    }
    static rangeItem<T>(items: T[], pAutoRemove: boolean): T {
        const index = ToolUtils.rangeInt(0, items.length);
        const item = items[index];
        if (pAutoRemove) {
            items.splice(index, 1);
        }
        return item;
    }
    static inLimit(min: number, max: number, range: number): boolean {
        return range >= min && range <= max;
    }
    /**获取配置里面的一个权重值 */
    // static randomItemRangeT<T>(list: T[], key: string): T {
    //     let sum = list.reduce((pr, current: T) => {
    //         return pr + current[`key`];
    //     }, 0);
    //     let ran = ToolUtils.rangeInt(0, sum);
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i][`key`] > ran) {
    //             return list[i];
    //         }
    //         ran -= list[i][`key`];
    //     }
    //     return list[0];
    // };
    static randomItemRange(ranges: number[]): number {
        let sum = ranges.reduce((pr, current) => {
            return pr + current;
        }, 0);
        let ran = ToolUtils.rangeInt(0, sum);
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i] > ran) {
                return i;
            }
            ran -= ranges[i];
        }
        return ranges.length - 1;
    }
    /**
     * 异步寻找一个物体
     * @param guid 
     * @param timeout 
     * @returns 
     */
    public static async asyncFindGo<T extends mw.GameObject>(guid: string, timeout: number = 10): Promise<T> {
        const gameObject = GameObject.findGameObjectById(guid);
        if (gameObject) return gameObject as T;
        return new Promise((resolve, reject) => {
            let inter = setInterval(() => {
                const gameObject = ToolUtils.findGo<T>(guid);
                if (gameObject) {
                    resolve(gameObject);
                    clearInterval(inter);
                } else {
                    timeout--;
                    if (timeout == 0) {
                        reject();
                        clearInterval(inter);
                    }
                }
            }, 100)
        });
    }
    /**
     * 设置UI可见性
     * @param ButtonSingle 
     * @param arg1 
     */
    public static setUIVisible(widget: mw.Widget, visible: boolean) {
        if (visible) {
            widget.visibility = (mw.SlateVisibility.Visible);
        } else {
            widget.visibility = (mw.SlateVisibility.Hidden);
        }
    }
    /**差值计算 */
    public static lerp(from: number, to: number, d: number): number {
        return from + (to - from) * d;
    }

    /**向量的差值计算 */
    public static lerpVector(from: mw.Vector, to: mw.Vector, d: number): mw.Vector {
        let x1 = from.x;
        let y1 = from.y;
        let z1 = from.z;

        let x2 = to.x;
        let y2 = to.y;
        let z2 = to.z;

        let distance = 1;
        return new mw.Vector(x1 + ((x2 - x1) / distance) * d,
            y1 + ((y2 - y1) / distance) * d,
            z1 + ((z2 - z1) / distance) * d);
    }
    /**角度的差值计算 */
    // public static lerpRotation(from: mw.Rotation, to: mw.Rotation, percent: number): mw.Rotation {
    //     let out = new mw.Rotation();
    //     let qfrom = new UE.Quat(new UE.Rotator(from.x, from.y, from.z));
    //     let qto = new UE.Quat(new UE.Rotator(to.x, to.y, to.z));
    //     let lerpq = UE.Quat.Slerp(qfrom, qto, percent).Rotator();//球形差值
    //     out.x = lerpq.Pitch;
    //     out.y = lerpq.Yaw;
    //     out.z = lerpq.Roll;
    //     return out;
    // }
    /**获取hh：mm：ss的时间格式 */
    public static getFormateTime(timeStamp: number): string {
        let fullSecond = Math.floor(timeStamp / 1000);
        let sec = fullSecond % 60;
        let min = Math.floor(fullSecond / 60) % 60;
        let hor = Math.floor(fullSecond / 3600);
        return `${hor < 10 ? "0" + hor : hor}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    }
    public static numDistancePow(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
        return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2);
    }
    public static vecDistancePow(v1: mw.Vector, v2: mw.Vector): number {
        return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z);
    }
    static arrayToRotation(worldRotation: number[]): mw.Rotation {
        return new mw.Rotation(worldRotation[0], worldRotation[1], worldRotation[2]);
    }
    static arrayToPoint(worldLocation: number[]): mw.Vector {
        return new mw.Vector(worldLocation[0], worldLocation[1], worldLocation[2]);

    }
    /**
     * 将value限定在区间内
     * @param min 
     * @param max 
     * @param value 
     */
    public static Clamp(min: number, max: number, value: number) {
        return Math.min(Math.max(min, value), max);
    }
    /**
     * 上传统计数据
     */
    public static uploadMGS(key: string, des: string, data: any) {
        if (mw.SystemUtil.isClient()) {
            mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));
        }
    }
    // public static UIPos2WorldPos(SceneX: number, SceneY: number, Distance: number) {
    //     let worldLocation = new UE.Vector(0);
    //     let WorldDirection = new UE.Vector(0);
    //     const worldLocationRef = puerts.$ref(worldLocation);
    //     const WorldDirectionRef = puerts.$ref(WorldDirection);

    //     let character: UE.MWSysPlayerCharacter = mw.GetCurrentPlayer().Character.Actor as any as UE.MWSysPlayerCharacter;

    //     character.GetPlayerController().DeprojectScreenPositionToWorld(SceneX, SceneY, worldLocationRef, WorldDirectionRef);
    //     worldLocation = puerts.$unref(worldLocationRef);
    //     WorldDirection = puerts.$unref(WorldDirectionRef);
    //     const EndworldLocation = new mw.Vector(WorldDirection.X * Distance + worldLocation.X, WorldDirection.Y * Distance + worldLocation.Y, WorldDirection.Z * Distance + worldLocation.Z);
    //     return EndworldLocation;
    // }
    /**
   * 修改材质颜色，所有用到该材质的颜色都会修改
   * @param obj 
   */
    // static setStaticMeshMaterialColor(obj, color) {
    //     const MESH = obj.Actor.GetStaticMeshComponent() as UE.MWStaticMeshComponent;
    //     for (let i = 0; i < MESH.GetNumMaterials(); i++) {
    //         const element = MESH.GetMaterial(i) as UE.MaterialInstanceDynamic;
    //         element.SetVectorParameterValue("BaseColor", color.ToUeLinearColor());
    //         element.SetVectorParameterValue("MW_MainColor", color.ToUeLinearColor());
    //         element.SetVectorParameterValue("MainColor", color.ToUeLinearColor());
    //     }
    // }
    /**
    * 计算两点距离
    * @param from 初始坐标
    * @param to 目标坐标
    * @param isPlane 是否只计算平面距离
    * @returns 距离
    */
    // static distance(from: mw.Vector, to: mw.Vector, isPlane: boolean = false): number {
    //     let fromV3 = new UE.Vector(from.x, from.y, isPlane ? 0 : from.z);
    //     let toV3 = new UE.Vector(to.x, to.y, isPlane ? 0 : to.z);
    //     return UE.Vector.Dist(fromV3, toV3);
    // }
    /**判断一个节点是不是角色 */
    static isCharacter(node: mw.GameObject): boolean {
        return (node as Character).player != null;
    }

    // static UIDefultLaugage(panel: mw.UIScript) {
    //     let key: string;// = "Buff01Name";
    //     let cfg: ILanguageElement;
    //     for (let i in panel) {
    //         if (panel[i] instanceof mw.StaleButton) {
    //             key = (panel[i] as mw.StaleButton).text;
    //             cfg = GameConfig.Language[key];
    //             if (cfg) {
    //                 (panel[i] as mw.StaleButton).text = (cfg.Value);
    //             } else {
    //                 oTrace("UIDefultLaugage______________", panel.constructor.name, i, key);
    //             }
    //         } else if (panel[i] instanceof mw.TextBlock) {
    //             key = (panel[i] as mw.TextBlock).text;
    //             cfg = GameConfig.Language[key];
    //             if (cfg) {
    //                 (panel[i] as mw.TextBlock).text = (cfg.Value);
    //             } else {
    //                 oTrace("UIDefultLaugage______________", panel.constructor.name, i, key);

    //             }
    //         }
    //     }
    // }

    /**
    * 初始化多语言
    */
    // public static initLanguage() {
    //     GameConfig.initLanguage(this.GetLanguage(), key => {
    //         let result = GameConfig.Language.getElement(key);
    //         if (result) {
    //             return result.Value;
    //         } else {
    //             return `语言表中没有${key}的值！！`;
    //         }
    //     });
    // }



    /**获取出生位置 */
    static getHallPos(index: number) {
        return new mw.Vector(500 * index, 500, 350);
    }

    /**返回指定范围内的随机整数 */
    static getRandomNum(min: number, max: number) {
        if (min == max) {
            return min;
        }
        return min + Math.round(Math.random() * (max - min));
    }


    static getAngle(x1: number, y1: number, x2: number, y2: number): number {
        const x = x1 - x2;
        const y = y1 - y2;
        if (!x && !y) {
            return 0;
        }
        const angle = (Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
        return 360 - angle;
    }

    /**获取玩家正向正方体玩家 */
    static getBoxPlayers(player: mw.Player, length: number, width: number, height: number): mw.GameObject[] {
        let front = player.character.worldTransform.getForwardVector().normalized;
        let loc = player.character.worldTransform.position;
        let end = mw.Vector.add(loc, front.multiply(length));
        const result = GeneralManager.modifyboxOverlapInLevel(loc, end, width, height, false);
        let res: mw.GameObject[] = [];
        for (let i of result) {
            if (PlayerManagerExtesion.isCharacter(i)) {
                res.push(i);
            }
        }
        return res;

    }


    /**
     * 获取世界坐标转屏幕坐标
     * @param loc 
     * @returns 
     */
    static getCanvasPointByWorld(loc: mw.Vector): mw.Vector2 {

        let res = mw.InputUtil.projectWorldPositionToWidgetPosition(loc, false);
        if (res.result) {
            return res.screenPosition;
        }
        return mw.Vector2.zero;
    }




    static convertArrayToRotation(nums: number[]): mw.Rotation {
        if (!nums || nums.length < 3) {
            return mw.Rotation.zero;
        }
        return new mw.Rotation(nums[0], nums[1], nums[2]);

    }

    static convertArrayToVector(nums: number[]): mw.Vector {
        if (!nums || nums.length < 3) {
            return mw.Vector.zero;
        }
        return new mw.Vector(nums[0], nums[1], nums[2]);

    }

    /**ui动画, 右到左 */
    static UIAnimaRightToLeft(target: mw.Widget, emoUI: mw.Widget, startPos: mw.Vector2, endPos: mw.Vector2, call?: () => void) {
        target.position = startPos
        target.renderOpacity = 0
        target.renderScale = new mw.Vector2(0, 1)
        emoUI.renderScale = Vector.zero

        //延迟0.3s, 先让图片下载
        setTimeout(() => {
            if (call) call()
            new ZwtTween(target)
                .moveTo(endPos, 0.5, true, mw.TweenUtil.Easing.Back.Out, true)
                .UIOpacityTo(1, 0.5, mw.TweenUtil.Easing.Back.Out, true)
                .scaleTo(mw.Vector2.one, 0.5, true, mw.TweenUtil.Easing.Back.Out)
                .start()
            setTimeout(() => {
                new ZwtTween(emoUI)
                    .scaleTo(Vector.one, 0.3, true, mw.TweenUtil.Easing.Back.Out)
                    .start()
            }, 500);
        }, 300);
    }

    /**ui动画, 右到左 */
    static UIAnimaRightToLeftAndWord(target: mw.Widget, emoUI: mw.Widget, timeUI: mw.Widget, startPos: mw.Vector2, endPos: mw.Vector2, call?: () => void) {
        target.position = startPos
        target.renderOpacity = 0
        target.renderScale = new mw.Vector2(0, 1)
        emoUI.renderScale = Vector.zero
        timeUI.renderScale = Vector.zero

        //延迟0.3s, 先让图片下载
        setTimeout(() => {
            if (call) call()
            new ZwtTween(target)
                .moveTo(endPos, 0.5, true, mw.TweenUtil.Easing.Back.Out, true)
                .UIOpacityTo(1, 0.5, mw.TweenUtil.Easing.Back.Out, true)
                .scaleTo(mw.Vector2.one, 0.5, true, mw.TweenUtil.Easing.Back.Out)
                .start()
            setTimeout(() => {
                new ZwtTween(emoUI)
                    .scaleTo(Vector.one, 0.3, true, mw.TweenUtil.Easing.Back.Out)
                    .start()
                new ZwtTween(timeUI)
                    .scaleTo(new Vector(1.3, 1.3, 1.3), 0.2, true, mw.TweenUtil.Easing.Back.Out)
                    .scaleTo(new Vector(0.9, 0.9, 0.9), 0.266, true, mw.TweenUtil.Easing.Back.Out)
                    .scaleTo(new Vector(1.1, 1.1, 1.1), 0.134, true, mw.TweenUtil.Easing.Back.Out)
                    .scaleTo(Vector.one, 0.067, true, mw.TweenUtil.Easing.Back.Out)
                    .start()
            }, 500);
        }, 300);
    }
}
