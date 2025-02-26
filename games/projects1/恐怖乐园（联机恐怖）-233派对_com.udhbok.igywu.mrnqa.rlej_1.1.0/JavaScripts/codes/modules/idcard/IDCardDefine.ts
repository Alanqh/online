/*
 * @Author       : dal
 * @Date         : 2024-03-04 10:59:56
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-08 17:03:06
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\IDCardDefine.ts
 * @Description  : 
 */
import TimeTransferUtil from "../../utils/TimeTransferUtil";
import { IDCardData } from "./IDCardDataHelper";
import { IDCardModuleC, IDCardModuleS } from "./IDCardModule";

export default class IDCardDefine {

    private constructor() { }

    public static checkIsNewDay(lastLoginTimeInterval: number) {
        return TimeTransferUtil.getDaysDifference(lastLoginTimeInterval, Date.now()) >= 1;
    }

    /** 获取所有礼物总数 */
    public static getAllGiftCount(data: IDCardData) {
        return data.giftInfoList.map(v => { return v.c }).reduce((p, c) => { return p + c }, 0);
    }

    public static async reqIDCardData(userId: string) {
        return SystemUtil.isClient() ? await ModuleService.getModule(IDCardModuleC).reqData(userId) : await ModuleService.getModule(IDCardModuleS).net_reqData(userId);
    }
}