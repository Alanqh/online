/** 
 * @Author       : zhenhaung.luo  zhenhuang.luo@appshahe.com
 * @Date         : 2023-03-02 10:31:11
 * @LastEditors  : zhenhuang.luo  zhenhuang.luo@appshahe.com
 * @LastEditTime : 2023-03-02 10:33:19
 * @FilePath     : \stumbleguys\JavaScripts\modules\dress\DressModuleS.ts
 * @Descripttion : 
 */
import { Singleton } from "../../tool/Singleton";
import { DressData } from "./DressData";
import { DressModuleC } from "./DressModuleC";
import { ScriptManager } from "./ScriptManager";

/** 装扮模块服务端 */
export class DressModuleS extends ModuleS<DressModuleC, DressData> {
    protected onPlayerLeft(player: mw.Player): void {
        Singleton.getIns(ScriptManager).clear(player);
    }

    protected onPlayerJoined(player: mw.Player): void {
        Singleton.getIns(ScriptManager).createAll(player);
    }
}