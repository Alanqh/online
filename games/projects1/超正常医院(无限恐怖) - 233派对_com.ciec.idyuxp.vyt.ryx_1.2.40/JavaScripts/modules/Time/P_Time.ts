
import TimeUI_Generate from "../../ui-generate/Time/TimeUI_generate";


export class Time {
    hour: number;
    min: number;
    second: number;
    constructor(h, m, s) {
        this.hour = h;
        this.min = m;
        this.second = s;
    }

    setData(h, m, s) {
        this.hour = h;
        this.min = m;
        this.second = s;
    }
}

export default class P_Time extends TimeUI_Generate {


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }


    // private formatTime(time: number) {
    //     let minute = Math.floor(time / 60);
    //     let second = time % 60;
    //     let minuteStr = minute.toString();
    //     let secondStr = second.toString();
    //     if (minute < 10) {
    //         minuteStr = 0 + minuteStr;
    //     }
    //     if(second < 10) {
    //         secondStr = 0 + secondStr;
    //     }
    //     return `${minuteStr}:${secondStr}`;
    // }


}