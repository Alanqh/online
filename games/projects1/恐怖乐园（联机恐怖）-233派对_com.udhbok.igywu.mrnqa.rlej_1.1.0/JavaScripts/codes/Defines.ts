import { AddGMCommand } from "module_gm";
import Tips from "./utils/Tips";
import { off } from "puerts";

/**
 * 配在Gamestart上面，但是，不是游戏的开始，而是游戏的定义
 */

/** 游戏主题 -  */
export enum EGameTheme {

    /** 大厅 */
    Hall = "Hall",

    /** 学校 */
    School = "School",

    /** 医院 */
    Hospital = "Hospital",

    /** 孤岛 */
    Graveyard = "Graveyard",

    /** 小镇 */
    Town = "Town",

    /** 占位 */
    Empty = "Empty"
}

export const PassTimesGameTheme: EGameTheme[] = [EGameTheme.School, EGameTheme.Town, EGameTheme.Hospital];

/** 子场景游戏主题列表 */
export const SubGameThemeArr: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town];

/** 所有游戏游戏主题列表 */
export const ALLGameThemeArr: EGameTheme[] = [EGameTheme.Hall, EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town];

/** 索取一个游戏主题的索引 */
export function getGameThemeId(gameTheme: EGameTheme) {
    return ALLGameThemeArr.findIndex(v => { return v === GamesStartDefines.gameTheme });
}

export class GamesStartDefines {
    /** 是否打开玩家间碰撞 */
    public static isOpenCharCollsion: boolean = false;

    public static gameTheme: EGameTheme = EGameTheme.Hall;

    public static isOpenTimer: boolean = false;

    /** 配置表是否合并完成 */
    public static isMergeConfigFinish: boolean = false;

    public static isJumpGuide: boolean = false;
}

export class Const {

    /** 假设特殊道具的type是这个 */
    public static readonly SpecialItemType: number = 555;
}


if (SystemUtil.isPIE) {
    let ori = DataStorage.asyncGetOtherGameData;
    DataStorage.asyncGetOtherGameData = async (id: string, key: string) => {
        if (!SystemUtil.isPIE) {
            return await ori(id, key);
        }
        return await DataStorage.asyncGetData(id.slice(0, 3) + "_" + key);
    }
    let ori2 = DataStorage.asyncSetOtherGameData;
    DataStorage.asyncSetOtherGameData = async (id: string, key: string, data: any) => {
        if (!SystemUtil.isPIE) {
            return await ori2(id, key, data);
        }
        return await DataStorage.asyncSetData(id.slice(0, 3) + "_" + key, data);
    }
}


let func = Date.now.bind(Date)
/**重写Date.now */
Date.now = () => {
    let oriTime = func();
    oriTime += globalOffsetTime;
    return oriTime;
}

export let globalOffsetTime = 0;
/**监听服务端事件 */
Event.addServerListener("changeGlobalTime", (newTime: number, isLog: boolean) => {
    if (newTime == 0) {
        // Tips.show("格式错误")
        return;
    }
    let old = func();
    let offset = newTime - old;
    globalOffsetTime = offset;
    console.log("新的客户端时间为" + Date.now().toLocaleString())
    if (isLog) {
        let str = "服务器时间更新：" + new Date(newTime).toString();
        Tips.show(str)
    }
})
/**添加GM */
AddGMCommand("按天重置", null, (player: mw.Player, newDay: string) => {
    let dayTime = Number(newDay);
    if (typeof (dayTime) != "number") {
        console.log("数字类型错误")
        Event.dispatchToAllClient("changeGlobalTime", 0, true)
        return;
    }
    if (!Number.isSafeInteger(dayTime)) {
        Event.dispatchToAllClient("changeGlobalTime", 0, true)
        return;
    }
    let offset = dayTime * 24 * 60 * 60 * 1000;
    globalOffsetTime = offset;
    console.log("新的服务器时间为" + Date.now().toLocaleString())
    console.log("new 出来的时间为" + new Date(Date.now()).getTime())
    Event.dispatchToAllClient("changeGlobalTime", Date.now(), true)
}, "全局设置");
/**添加GM */
AddGMCommand("按天|时重置", null, (player: mw.Player, input: string) => {
    let times = input.split("|")
    let dayTime = Number(times[0]);
    let hourTime = Number(times[1]);
    if (typeof (dayTime) != "number") {
        console.log("数字类型错误")
        Event.dispatchToAllClient("changeGlobalTime", 0, true)
        return;
    }
    if (!Number.isSafeInteger(dayTime)) {
        Event.dispatchToAllClient("changeGlobalTime", 0, true)
        return;
    }
    let offset = dayTime * 24 * 60 * 60 * 1000;
    offset += hourTime * 60 * 60 * 1000;
    globalOffsetTime = offset;
    console.log("新的服务器时间为" + Date.now().toLocaleString())
    console.log("new 出来的时间为" + new Date(Date.now()).getTime())
    Event.dispatchToAllClient("changeGlobalTime", Date.now(), true)
}, "全局设置");
/**添加GM */
AddGMCommand("显示当前时间", () => {
    Tips.show(new Date(Date.now()).toUTCString() + "当前的时间为")
}, null, "全局设置")
