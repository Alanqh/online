/*
 * @Author       : dal
 * @Date         : 2024-02-28 10:07:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-07 16:27:35
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\IDCardConst.ts
 * @Description  : 
 */

import { EGameTheme } from "../../Defines";

/** 测试头像列表 */
export const TestHeadImgList: string[] = ["170386", "170385", "174057", "218467", "174094", "170380"];

/** 测试名列表 */
export const TestNameList: string[] = [
    "Ethan",
    "Olivia",
    "Benjamin",
    "Ava",
    "William",
    "Sophia",
    "James",
    "Mia",
    "Alexander",
    "Charlotte",
    "Henry",
    "Amelia",
    "Samuel",
    "Harper",
    "Emma",
    "Daniel",
    "Grace",
    "Joseph",
    "Lily",
    "Michael"];

/** 每日最多点赞次数 */
export const DayLikeNum: number = 20;

/** 最多最近的点赞和送礼记录次数 */
export const MaxRecentLikeNum: number = 10;

/** 被人点赞增加的亲密度 */
export const LikeAddIntimacyVal: number = 1;

/** 每日免费礼物次数 */
export const FreeGiftTimes: number = 15;

/** 所有游戏的路由信息 */
export const AllGameRouteList: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town, EGameTheme.Empty, EGameTheme.Hall];

/** 游戏记录信息 */
export const GameThemeRecordList: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town, EGameTheme.Empty];

/** 礼物购买的类型 */
export enum EGiftPurchaseType {

    /** 免费 */
    Free = 0,
    /** 乐币 */
    LeBi = 1,
    /** 恐惧币 */
    FearCoin = 2,
}

/** 玩家基础信息 */
export class BaseInfo {

    /** 头像url */
    u: string;

    /** 昵称 */
    n: string = "";

    /** 0女，1男 */
    s: number = 0;

    /** 用户userId */
    id: string;

    /** 用户shareId */
    si: string;
}

/** 近期被点赞的信息  */
export class RecentLikeInfo {

    /** 礼物的时间戳 */
    t: number = Date.now();

    /** userId */
    u: string;

    /** 玩家233名 */
    n: string = "";
}

/** 礼物信息 */
export class GiftInfo {

    /** 礼物编号 */
    gId: number;

    /** 礼物数量 */
    c: number = 0;
}

/** 近期礼物信息 */
export class RecentGiftInfo extends GiftInfo {

    /** 礼物的时间戳 */
    t: number = Date.now();

    /** userId */
    uId: string;

    /** 玩家233名 */
    n: string = "";
}

/** 亲昵度信息 */
export class IntimacyInfo {

    /** userId */
    id: string;

    /** 亲密值 */
    v: number = 0;
}