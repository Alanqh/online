/*
 * @Author       : dal
 * @Date         : 2024-05-11 15:56:14
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-13 15:05:54
 * @FilePath     : \1003_hospital\JavaScripts\codes\modules\activeGhost\ActiveGhostModuleC.ts
 * @Description  : 
 */
import { GhostModuleC } from "../ghost/GhostModuleC";
import { ActiveGhostModuleS } from "./ActiveGhostModuleS";

export class ActiveGhostModuleC extends ModuleC<ActiveGhostModuleS, null> {
    /**
     * 当拍照到了某一个鬼的时候发出
     * @param guid 鬼的guid
     */
    public reqShotOneGhost(goid: string) {
        const ghostModule = ModuleService.getModule(GhostModuleC);
        if (!ghostModule.partMap.has(goid)) {
            console.log("hittarget but not a part")
            return;
        }

        let ghostid = ghostModule.partMap.get(goid);

        return this.server.net_onShotGhost(ghostid);
    }
}