
import { PlayerManagerExtesion } from "../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../config/GameConfig";
import { AnimationPlayManager } from "../Tool/AnimationEditor/AnimationPlay";
import { GlobalData } from "../const/GlobalData";
import TimeModuleC from "../modules/Time/TimeModuleC";
import TimeModuleS from "../modules/Time/TimeModuleS";
import { Events_CS } from "../const/enum";
import { Time } from "../modules/Time/P_Time";


export class utils {

    /**当前帧率 */
    public static frameCount: number = 200;
    /**上一秒时间 */
    public static lastTime: number = 0;
    /**一帧的时间 */
    public static dt: number = 0;

    // 根据资源id获取资源icon
    public static async setIconByAssetId(icon: mw.Image, assetId: string) {
        await mw.assetIDChangeIconUrlRequest([assetId]);
        let data = mw.getAssetIconDataByAssetID(assetId);
        try {
            icon.setImageByAssetIconData(data);
        } catch (error) {
            console.warn("根据资源设置图片失败！");
        }
    }
    /**客户端 获取本地玩家昵称 */
    public static getNickname_C() {
        let nickname = "";
        // 
        if (SystemUtil.isClient()) {
            nickname = AccountService.getNickName();
            if (nickname == null || nickname == "") {
                nickname = Player.localPlayer.character.displayName;
            }
        }
        return nickname;
    }

    /**服务端 获取某个玩家的昵称 */
    // public static async getNicname_S(playerId: number) {
    //     let player = Player.getPlayer(playerId);
    //     let nickname = "";
    //     let done = false;
    //     AccountService.getUserInfo(player.userId, GlobalData.Global.gameId, (nickname) => {
    //         if(nickname == null || nickname == ""){
    //             nickname = player.character.displayName;
    //             done = true
    //         }
    //     })
    //     // 自旋
    //     for(;;){
    //         if(done) break;
    //         await TimeUtil.delaySecond(0.1);
    //     }
    //     return nickname;
    // }

    /**UI弹出效果 */
    public static showUITween(ui: mw.UIScript, posY?: number, duration: number = 100, callBack?: Function) {
        let pos: mw.Vector2 = mw.Vector2.zero;

        posY = posY ? posY : mw.getViewportSize().y / 10;//视口大小

        new mw.Tween({ y: posY })

            .to({ y: 0 })

            .duration(duration)

            .onUpdate(val => {

                pos.set(0, val.y);

                ui.uiObject.position = pos;

            })

            // .interpolation(TweenUtil.Interpolation.Bezier)

            .easing(TweenUtil.Easing.Cubic.Out)//TweenUtil.Easing.Elastic.Out   TweenUtil.Easing.Cubic.Out

            .start()

            .onComplete(() => {
                if (callBack) { callBack }
            })
    }


    /**
     * 根据概率数组，随机选择数组中的元素
     * @param probability 概率数组, 不传则等概率选择
     * @param list 待选择的数组
     * @returns 选择出的元素
     */
    public static randomSelect<T>(list: T[], probability?: number[]): T {
        if (probability == null) {
            return list[MathUtil.randomInt(0, list.length)];
        }
        let total = 0;
        for (let i = 0; i < probability.length; i++) {
            total += probability[i];
        }
        let randomNum = MathUtil.randomFloat(0, total);
        for (let i = 0; i < probability.length; i++) {
            if (randomNum < probability[i]) {
                return list[i];
            }
            randomNum -= probability[i];
        }
        throw new Error("randomSelect error");
    }


    /**
     * 根据概率数组，随机选择元素索引
     * @param probability 概率数组
     */
    public static randomIndex(probability: number[]) {
        let total = 0;
        for (let i = 0; i < probability.length; i++) {
            total += probability[i];
        }
        let randomNum = MathUtil.randomFloat(0, total);
        for (let i = 0; i < probability.length; i++) {
            if (randomNum < probability[i]) {
                return i;
            }
            randomNum -= probability[i];
        }
        throw new Error("randomIndex error");
    }

    /**
     * 原地打乱一个数组
     * @param array 待打乱的数组
     */
    public static shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机下标
            [array[i], array[j]] = [array[j], array[i]]; // 交换元素位置
        }
    }

    /**
     * 触发器判断go是否合理
     */
    public static checkTriggerGo(go: mw.GameObject) {
        // 不是玩家
        if (go instanceof mw.Character == false) {
            return false;
        }
        let player = (go as mw.Character).player;
        // 玩家为空
        if (player == null) {
            return false;
        }
        if (SystemUtil.isServer()) {
            return true;
        } else if (SystemUtil.isClient()) {
            // 玩家为空
            if (Player.localPlayer == null) {
                return false;
            }
            // 如果不是自己
            if (Player.localPlayer.playerId != player.playerId) {
                return false;
            }
            return true;
        }
    }

    /**获得平面距离的平方 */
    public static checkPlaneDisSquare(vec1: Vector, vec2: Vector) {
        return Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2);
    }

    /**
     * 播放动画编辑器动画  不播特效
     * @param char 玩家
     * @param confId 动画表id
     */
    public static playAnimation(char: Character, confId: number | string) {
        let cfg = GameConfig.Animation.getElement(confId);
        let anim = AnimationPlayManager.instance.playAnimationEditor(
            char,
            cfg.Animation);
        if (cfg.Frame) {
            cfg.Frame.forEach((frame, index) => {
                anim.setFrameEvent(frame, cfg.EventName[index]);
            })
        }
        return anim;
    }

    public static stopAnimation(char: Character) {
        AnimationPlayManager.instance.stopAnimationEditor(char);
    }

    /**在所有客户端播放动画 */
    public static playAnimationAtAllClient(cfgID: number, playerId?: number) {

        if (SystemUtil.isClient()) {
            Event.dispatchToServer(Events_CS.PlayAnimEditor, cfgID);
        } else {
            console.warn(playerId, cfgID);
            Event.dispatchToAllClient(Events_CS.PlayAnimEditor, playerId, cfgID)
        }
    }

    /**
     * 在指定客户端播放音效
     * 调用端：服务端
     * @param soundId 音效id
     * @param playerId 玩家id
     */
    public static playSoundAtClient(soundId: number, playerId: number) {
        Event.dispatchToClient(Player.getPlayer(playerId), Events_CS.PlaySound, soundId);

    }


    /* 本地播放动画
    * @param owner 播放者
    * @param animationGuid 动画guid
    * @param loop 是否循环
    * @param time 时间  
    */
    public static playAnimationLocally2(owner: mw.Character,
        animationGuid: string, loop: number, time: number,
        slot: mw.AnimSlot = mw.AnimSlot.Default) {
        if (owner === undefined || owner === null) return;
        let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, false);
        anim.loop = loop;
        if (slot > 0) {
            anim.slot = slot;
        }
        anim.speed = anim.length / time;
        anim.play();
        return anim;
    }

    //随机获取圆内一点坐标
    public static getCirclePoint(centerX: number, centerY: number, radius: number, centerZ: number): mw.Vector {
        let random = Math.random() * 2 * Math.PI;
        let x = centerX + Math.cos(random) * radius;
        let y = centerY + Math.sin(random) * radius;
        return new mw.Vector(x, y, centerZ);
    }

    /**下载资源 */
    public static async downloadAsset(assetId: string) {
        if (AssetUtil.assetLoaded(assetId)) {
            return;
        }
        await AssetUtil.asyncDownloadAsset(assetId);
    }

    /**
     * 获取当前坐标附近范围随机坐标
     */
    public static randomLoc(loc: mw.Vector, dis?: number): mw.Vector {
        let x = loc.x;
        let y = loc.y;
        let z = loc.z;
        let newX = MathUtil.randomInt(x, (x + dis));
        let newY = MathUtil.randomInt(y, (y + dis));
        let newLoc = new mw.Vector(newX, newY, z);
        return newLoc;
    }

    /**
     * 多语言表格式化工具
     * @param str 多语言表配置字符串
     * @param param 格式化字符串参数
     * @returns 格式化后的字符串
     */
    public static Format(str: string, ...param: any[]) {
        if (param) {
            let i = 0;
            param.forEach((p) => {
                if (!str) return "unKnow";
                str = str.replace("{" + i + "}", param[i]);
                i++;
            });
        }
        return str;
    }

    /**
    * 获取多语言格式化字符串
    */
    public static getLanguageByKey(key: string, param?: any[]) {
        let res = GameConfig.Language[key];
        return res?.Value == null ? key : param == null ? res.Value : this.Format(res.Value, param);
    }

    /**
     * 获取多语言格式化字符串
     */
    public static getLanguageByKeys(keys: string[]) {
        let res: string[] = [];
        for (let i = 0; i < keys.length; i++) {
            let text = GameConfig.Language[keys[i]];
            text = text?.Value == null ? keys[i] : text.Value;
            res.push(text);
        }
        return res;
    }

    /**
     * 判断是否是晚上
     */
    public static isNight() {
        if (SystemUtil.isClient()) {
            return ModuleService.getModule(TimeModuleC).curTime >= GlobalData.Time.dayTime;
        } else {
            return ModuleService.getModule(TimeModuleS).curTime >= GlobalData.Time.dayTime;
        }
    }

    /**把游戏时间转换为24小时制 */
    public static parseTimeTo24(curTime: number): Time {
        let timeMC = ModuleService.getModule(TimeModuleC);
        let tempTime: Time = new Time(0, 0, 0);
        let dayTimeScale: number = 60 * 60 * 12 / timeMC.dayTime;
        let nightTimeScale: number = 60 * 60 * 12 / timeMC.nightTime;

        // //console.log(`当前时间${curTime}, 白天时间${this.timeMC.dayTime}, 晚上时间${this.timeMC.nightTime}`);
        // 时间缩放：60 * 60 * 12 / 300
        let time: number;
        if (curTime < timeMC.dayTime) {
            // 白天
            time = curTime * dayTimeScale;
        } else {
            // 晚上
            time = timeMC.dayTime * dayTimeScale + (curTime - timeMC.dayTime) * nightTimeScale;
        }
        time = (time + GlobalData.Time.dayStartTime) % (24 * 60 * 60);
        let hour = Math.floor(time / 3600);
        time = time % 3600;
        let min = Math.floor(time / 60);
        let second = time % 60;
        tempTime.setData(hour, min, second);
        // //console.log(`当前时间${curTime}, 换算成时分秒：${tempTime.hour}:${tempTime.min}:${tempTime.second}`);
        return tempTime;
    }

    /**获取今天日期 转为number */
    public static getTodayNumber(): number {
        let a = new Date();
        let str = TimeUtil.parseTime(a);

        let strr = str.split(' ')[0].replace('-', '').replace('-', '');
        return Number(strr);
    }
    /**判断是否是同一周 */
    public static isSameWeek(date1: Date, date2: Date): boolean {
        // 将日期设置为同一周的星期一
        date1.setHours(0, 0, 0, 0);
        date1.setDate(date1.getDate() - (date1.getDay() === 0 ? 6 : date1.getDay() - 1));
        date2.setHours(0, 0, 0, 0);
        date2.setDate(date2.getDate() - (date2.getDay() === 0 ? 6 : date2.getDay() - 1));

        return date1.getTime() === date2.getTime();
    }
    /**判断是否是同一天 */
    public static isSameDay(date1: Date, date2: Date): boolean {
        return date1.toDateString() === date2.toDateString();
    }

    /**获取距离下周一的时间 */
    public static secondsToNextMonday(date: Date): number {
        let now = date;
        let dayOfWeek = now.getDay();
        if (dayOfWeek === 0) dayOfWeek = 7;
        let daysToNextMonday = dayOfWeek === 1 ? 7 : (7 - dayOfWeek + 1);

        let nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysToNextMonday);
        nextMonday.setHours(0, 0, 0, 0);

        let diffInSeconds = Math.floor((nextMonday.getTime() - now.getTime()) / 1000);
        return diffInSeconds;
    }

    /**获取距离今晚24点的时间 */
    public static secondsToMidnight(date: Date): number {
        let now = date;
        let midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        midnight.setHours(0, 0, 0, 0);

        let diffInSeconds = Math.floor((midnight.getTime() - now.getTime()) / 1000);
        return diffInSeconds;
    }

    /**将秒转换 天时分秒 格式 */
    public static formatSeconds(seconds: number): string {
        let days = Math.floor(seconds / (24 * 60 * 60));
        let hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        let minutes = Math.floor((seconds % (60 * 60)) / 60);
        // let secs = seconds % 60;

        return utils.Format(GameConfig.Language.Shop_Tips_12.Value, days, hours, minutes)
    }

    /**将秒转换为天-小时-分钟 */
    public static parseToDayHourMin(seconds: number) {
        let days = Math.floor(seconds / (24 * 60 * 60));
        let hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        let minutes = Math.floor((seconds % (60 * 60)) / 60);
        // let secs = seconds % 60;

        return { days, hours, minutes };
    }

    /**比较两个日期相差小时 */
    public static compareDate(nowDate1: Date, date2: Date): number {
        let diff = nowDate1.getTime() - date2.getTime();
        return diff / (1000 * 60 * 60);
    }
    /**比较两个日期相差分钟 */
    public static compareDateMin(nowDate1: Date, date2: Date): number {
        let diff = nowDate1.getTime() - date2.getTime();
        return diff / (1000 * 60);
    }

    /**将小时转换为 天时 格式 */
    public static formatHourToDayHour(hour: number): string {
        let days = Math.floor(hour / 24);
        let hours = Math.floor(hour % 24);
        return utils.Format(GameConfig.Language.Shop_Tips_18.Value, days, hours);
    }

    /**将秒转为00-00 格式 */
    public static formatSecondsToMin(seconds: number): string {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    }

    /**递归获取指定名称的子物体 */
    public static getChildByNameRecursion(go: mw.GameObject, name: string): mw.GameObject {
        if (go.name == name) {
            return go;
        }
        let children = go.getChildren();
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let res = this.getChildByNameRecursion(child, name);
            if (res != null) {
                return res;
            }
        }
        return null;
    }

    /** 随机生成不重复的数字
     * @param min 最小值[
     * @param max 最大值(
     * @param len 生成的个数
     */
    public static getRandomArray(min: number, max: number, len: number): number[] {
        // 初始化一个空数组，用于存储结果
        let result: number[] = [];
        // 循环生成len个随机数
        for (let i = 0; i < len; i++) {
            // 使用MathUtil.randomInt生成一个随机数，范围是min到max，不包括max
            let random = MathUtil.randomInt(min, max);
            // 如果result数组中不包含这个随机数，则添加到result数组中
            if (!result.includes(random)) {
                result.push(random);
            } else {
                // 如果result数组中包含这个随机数，则重新生成一个新的随机数
                i--;
            }

        }
        // 返回结果数组
        return result;
    }
    /**本地坐标转化为世界坐标 */
    public static transformPosition(transform: Transform, location: Vector): Vector {
        // 首先对本地坐标应用缩放
        let scaledPosition = transform.position;
        let rotatedPosition = location.clone();
        // 接着应用旋转
        if (transform.rotation.x == 0 && transform.rotation.y == 0 && location.y == 0) {
            rotatedPosition = this.rotateOnlyZ(location, transform.rotation);
        } else {
            rotatedPosition = this.rotate(location, transform.rotation);
        }
        // 最后将旋转和缩放后的坐标平移到世界坐标
        return rotatedPosition.add(scaledPosition);
    }
    private static rotate(position: Vector, rotation: Rotation): Vector {
        const pitch = rotation.y * Math.PI / 180;
        const roll = rotation.x * Math.PI / 180;
        const yaw = rotation.z * Math.PI / 180;
        let cosPitch = Math.cos(pitch);
        let sinPitch = Math.sin(pitch);
        let cosYaw = Math.cos(yaw);
        let sinYaw = Math.sin(yaw);
        let cosRoll = Math.cos(roll);
        let sinRoll = Math.sin(roll);

        let m00 = cosYaw * cosPitch;
        let m01 = cosYaw * sinPitch * sinRoll - sinYaw * cosRoll;
        let m02 = cosYaw * sinPitch * cosRoll + sinYaw * sinRoll;

        let m10 = sinYaw * cosPitch;
        let m11 = sinYaw * sinPitch * sinRoll + cosYaw * cosRoll;
        let m12 = sinYaw * sinPitch * cosRoll - cosYaw * sinRoll;

        let m20 = sinPitch;
        let m21 = cosPitch * sinRoll;
        let m22 = cosPitch * cosRoll;
        return new Vector(
            position.x * m00 + position.y * m01 + position.z * m02,
            position.x * m10 + position.y * m11 + position.z * m12,
            position.x * m20 + position.y * m21 + position.z * m22
        );
    }

    private static rotateOnlyZ(position: Vector, rotation: Rotation): Vector {
        const rotZ = rotation.z * Math.PI / 180;
        let cosZ = Math.cos(rotZ);
        let sinZ = Math.sin(rotZ);
        return new Vector(
            cosZ * position.x + sinZ * position.y,
            sinZ * position.x + cosZ * position.y,
            position.z
        );
    }

    /**盒体检测 */
    public static boxOverlap(startLocation: Vector, endLocation: Vector, width: number, height: number, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreObjectsByType?: boolean, self?: GameObject): Array<GameObject> {
        let halfSize = new Vector(1, width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array<GameObject>();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }


    /**判断两个对象的值是否相等 */
    public static deepEqual(obj1: any, obj2: any): boolean {
        // 判断是否是对象类型
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return obj1 === obj2;

        }

        // 判断是否为null
        if (obj1 === null || obj2 === null) {
            return obj1 === obj2;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // 判断属性数量是否相等
        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            // 递归比较属性值
            if (!this.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    // 获取今天是今年的第几天
    public static gmAddedDay: number = 0
    public static getTodayOfYear(): number {
        return Math.floor(
            (
                Number(new Date()) - (Number(new Date(new Date().getFullYear().toString())) - (8 * 60 * 60 * 1000))
            ) / (24 * 60 * 60 * 1000)) + 1 + this.gmAddedDay
    }

    public static pingPong(t: number): number {
        return Math.abs(t % 1 - 0.5) * 2
    }

}


//单例的装饰器
const SINGLETON_KEY = Symbol();
export function Singleton() {
    return function (type: { new(), instance: any }) {
        const proxyType = new Proxy(type, {
            // this will hijack the constructor
            construct(target, argsList, newTarget) {
                // we should skip the proxy for children of our target class
                if (target.prototype !== newTarget.prototype) {
                    return Reflect.construct(target, argsList, newTarget);
                }
                // if our target class does not have an instance, create it
                if (!target[SINGLETON_KEY]) {
                    target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
                }
                return target[SINGLETON_KEY];
            },

        })
        Reflect.defineProperty(proxyType, "instance", {
            get() {
                if (!this[SINGLETON_KEY]) {
                    new this();
                }
                return this[SINGLETON_KEY];
            },
            set(next) {
                this[SINGLETON_KEY] = next;
            }
        })
        return proxyType
    }
}

/**贝塞尔曲线 */
export function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;
    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }
    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }
    function solveCurveX(x) {
        let t2 = x;
        let derivative;
        let x2;
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }
        let t1 = 1;
        let t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }
        return t2;
    }
    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }
    return solve;
}
