export class GameAnim {
    /**
     * 单例
     */
    private static _inst: GameAnim;
    public static get instance() {
        if (!this._inst) {
            this._inst = new GameAnim();
            TimeUtil.onEnterFrame.add(()=>{TweenUtil.TWEEN.update()}   );
        }
        return this._inst;
    }

    /**
     * 透明度动效
     * @param time 持续时间
     * @param ui 动效UI
     * @param [loopCount=Infinity] 循序次数
     * @param [start=1] 开始透明度
     * @param [end=0] 结束透明度
     * @param [yoyo=true] 是否开启yoyo
     * @param over 结束回调
     * @returns tween动效
     */
    public opacityEff(time: number, ui: mw.Widget, loopCount: number = Infinity, start: number = 1, end: number = 0, yoyo: boolean = true, over?: () => void): any {
        let tween = new Tween({ opacity: start })
            .to({ opacity: end }, time)
            .onUpdate((obj) => {
                ui.renderOpacity = obj.opacity;
            })
            .repeat(loopCount)
            .yoyo(yoyo)
            .onComplete(() => {
                over && over();
            })
            .start();
        return tween;
    }

    /**
   * 缩放动效
   * @param time 持续时间
   * @param ui 动效UI
   * @param loopCount 循环次数
   * @returns tween动效
   */
    public scaleEff(time: number, ui: mw.Widget, loopCount: number, startScale: number = 1, toScale: number = 0, yoyo: boolean = true, over?: () => void): any {
        let tempVec = Vector2.zero;
        let tween = new Tween({ scale: startScale })
            .to({ scale: toScale }, time)
            .onUpdate((obj) => {
                tempVec.set(obj.scale, obj.scale);
                ui.renderScale = tempVec;
            })
            .onComplete(() => {
                over && over();
            })
            .repeat(loopCount)
            .yoyo(yoyo)
            .start();
        return tween;
    }

    /**
     *  UI移动动效
     * @param ui UI
     * @param startPos 开始位置
     * @param endPos 结束位置
     * @param time 动效时间
     * @returns tween动效
     */
    public moveUI(ui: mw.Widget, startPos: mw.Vector2, endPos: mw.Vector2, time: number, over?: () => void) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
                ui.position = obj;
            })
            .onComplete(() => {
                over && over();
            })
            .start();
        return tween;
    }

    /**
     * 播放闪光动效
     * @param ui UI
     */
    public playTween(ui: mw.Widget) {
        let start = 0;
        let tween = new Tween({ angle: start })
            .to({ angle: start + 90 }, 1500)
            .onUpdate((obj) => {
                ui.renderTransformAngle = obj.angle;
            })
            .onRepeat(() => {
                start = ui.renderTransformAngle;
            })
            .repeat(Infinity)
            .start();
        return tween;
    }


    /**
     * 弹簧臂本地坐标移动动效
     * @param ui UI
     * @param startPos 开始位置
     * @param endPos 结束位置
     * @param time 动效时间
     * @returns tween动效
     */
    public springArmLocalMoveGo(go: mw.SpringArm, startPos: mw.Vector, endPos: mw.Vector, time: number, over?: () => void) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
                go.localTransform.position = obj;
            })
            .onComplete(() => {
                over && over();
            })
            .start();
        return tween;
    }

    /**
    * 物体本地坐标移动动效
    * @param ui UI
    * @param startPos 开始位置
    * @param endPos 结束位置
    * @param time 动效时间
    * @returns tween动效
    */
    public localMoveGo(go: GameObject, startPos: mw.Vector, endPos: mw.Vector, time: number, over?: () => void) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
                go.localTransform.position = obj;
            })
            .onComplete(() => {
                over && over();
            })
            .start();
        return tween;
    }

    /**
    * 世界坐标移动动效
    * @param ui UI
    * @param startPos 开始位置
    * @param endPos 结束位置
    * @param time 动效时间
    * @returns tween动效
    */
    public worldMoveGo(go: GameObject, startPos: mw.Vector, endPos: mw.Vector, time: number, over?: () => void) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
                go.worldTransform.position = obj;
            })
            .onComplete(() => {
                over && over();
            })
            .start();
        return tween;
    }



}