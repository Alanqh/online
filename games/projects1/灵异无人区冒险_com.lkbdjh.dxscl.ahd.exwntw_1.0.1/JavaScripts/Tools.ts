
/**音效枚举 */
export enum SoundType {
    /**BGM */
    BGM,
    /**客户端音效 */
    Sound,
    /**3D音效 */
    Sound3D
}
export class Tools {
    public static getRandomInt(min: number, max: number): number {
        let range = max - min + 1;
        let rand = Math.random();
        return Math.floor((min + rand * range));
    }
    public static changeSecond2Minus(curtime: number) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let minus = Math.floor(time / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        resStr = minus.toString() + ":" + secondstr;
        return resStr;
    }
    /**转换时间格式为00:00:00 */
    public static changeSecond2Minus2(curtime: number) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let hour = Math.floor(time / 3600);
        let minus = Math.floor((time - hour * 3600) / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        let minusstr = minus.toString();
        let hourstr = hour.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        if (minus < 10) {
            minusstr = "0" + minus.toString();
        }
        if (hour < 10) {
            hourstr = "0" + hour.toString();
        }
        resStr = hourstr + ":" + minusstr + ":" + secondstr;
        return resStr;
    }

    /**判断该物体是否是触发器等逻辑对象 */
    public static isTrigger(obj: mw.GameObject): boolean {
        return obj instanceof mw.Trigger;
        // let isTrigger = mw.isBoxTrigger(obj) || mw.isSphereTrigger(obj) || mw.isAmbientSound(obj) || mw.isEffectSys(obj)
        // return isTrigger;
    }
    /**
     * 设置显隐
     * @param obj MWUICanvas/MWUIImage/MWUITextblock/MWUIButton
     * @param visible UI节点显示规则
     */
    public static setVisible(obj: mw.Canvas | mw.Button | mw.Image | mw.TextBlock, visibility: Visibility) {
        switch (visibility) {
            case Visibility.Visible:
                obj.visibility = mw.SlateVisibility.Visible;
                break;
            case Visibility.Collapsed:
                obj.visibility = mw.SlateVisibility.Collapsed;
                break;
            case Visibility.Hidden:
                obj.visibility = mw.SlateVisibility.Hidden;
                break;
            case Visibility.HitTestInvisible:
                obj.visibility = mw.SlateVisibility.HitTestInvisible;
                break;
            case Visibility.SelfHitTestInvisible:
                obj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                break;
        }
    }
}

export enum Visibility {
    /** 可见 */
    Visible = 0,
    /** 隐藏 并且不占用大小 */
    Collapsed = 1,
    /** 隐藏 占用计算大小 */
    Hidden = 2,
    /** 可见 自身以及子节点不可响应事件 */
    HitTestInvisible = 3,
    /** 可见 自身不可响应事件 */
    SelfHitTestInvisible = 4
}

export enum ecodeType {
    //布尔类型
    EcodeBool = `EcodeBool`,
    //字符类型
    EcodeString = `EcodeString`,
    //数字类型
    EcodeNumber = `EcodeNumber`
}