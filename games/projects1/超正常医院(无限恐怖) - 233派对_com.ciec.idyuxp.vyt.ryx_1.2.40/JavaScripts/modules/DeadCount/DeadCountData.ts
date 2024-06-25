import P_Game_HUD from "../GameHud/UI/P_Game_HUD";
import { DeadCountDataC } from "./DeadCountModuleC";


export class DeadCountData {

    /**生存天数 */
    private _aliveDays: number = 0;
    public get aliveDays(): number {
        return this._aliveDays;
    }
    public set aliveDays(v: number) {
        this._aliveDays = v;
        // 同时设置UI
        if (SystemUtil.isClient()) UIService.getUI(P_Game_HUD).mTxt_Days.text = this._aliveDays.toString();
    }

    /**拯救玩家数 */
    private _rescuePlayerCount: number = 0;
    public get rescuePlayerCount(): number {
        return this._rescuePlayerCount;
    }
    public set rescuePlayerCount(v: number) {
        this._rescuePlayerCount = v;
        // 同时设置UI
        if (SystemUtil.isClient()) UIService.getUI(P_Game_HUD).mTxt_Peoples.text = this._rescuePlayerCount.toString();
    }


    constructor(dataC?: DeadCountDataC) {
        if (dataC) {
            this.aliveDays = dataC.aliveDays;
            this.rescuePlayerCount = dataC.rescuePlayerCount;
        } else {
            this.aliveDays = 0;
            this.rescuePlayerCount = 0;
        }
    }

    /**重置数据 */
    public resetData() {
        this.aliveDays = 0;
        this.rescuePlayerCount = 0;
    }
}