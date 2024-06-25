/*
 * @Author: zhaolei
 * @Date: 2022-05-07 10:13:06
 * @LastEditors: zhaolei
 * @Description: file content
 */
export class Timer {
    private _oriTime: number;
    constructor(private _time: number, private _autoReset: boolean = false) {
        this._oriTime = _time;
    }

    /**
     * 是否到期
     * @param dt 
     * @returns 
     */
    public isExpire(dt: number) {
        this._time -= dt;
        const isExp = this._time <= 0;
        if (isExp && this._autoReset) {
            this.reset();
        }
        return isExp;
    }

    /**
     * 重置时间
     * @param time 
     */
    public reset(time?: number) {
        this._time = (time ? time : this._oriTime) + this._time;
    }
} 