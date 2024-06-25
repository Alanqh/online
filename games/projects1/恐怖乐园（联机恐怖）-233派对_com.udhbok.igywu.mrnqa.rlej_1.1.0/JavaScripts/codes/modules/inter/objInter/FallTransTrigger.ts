/*
 * @Author       : dal
 * @Date         : 2024-04-08 19:03:41
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-24 10:08:11
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\objInter\FallTransTrigger.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { CommonUtils } from "../../../utils/CommonUtils";
import { ArchiveDataType } from "../../archive/ArchiveHelper";
import ArchiveModuleC from "../../archive/ArchiveModuleC";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import BirthInfoHelper from "../../procedure/util/BirthInfoHelper";

@Component
export default class FallTransTrigger extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        const trigger = this.gameObject as Trigger;
        trigger.onEnter.add((char: Character) => {
            if (!CommonUtils.isSelfChar(char)) {
                return;
            }
            char.worldTransform.position = BirthInfoHelper.instance.birthPos;
        })
    }
}