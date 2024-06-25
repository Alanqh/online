/*
 * @Author       : dal
 * @Date         : 2024-05-31 17:02:06
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-31 17:02:50
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\ui\NewRankPanelMgr.ts
 * @Description  : 
 */

import { EBaseRankDataType } from "../NewRankDefine";
import { NewRankPanel } from "./NewRankPanel";

class NewRankPanelMgr {

    private map: Map<string, NewRankPanel> = new Map();

    /**
     * 获取一个排行榜UI实例
     * @param type 排行榜类型
     * @param isWorld 是否世界UI default false
     * @returns 
     */
    public getPanel(type: EBaseRankDataType, isWorld: boolean = false): NewRankPanel {
        let key = type + isWorld;
        if (!this.map.has(key)) {
            const panel = UIService.create(NewRankPanel);
            panel.init(type);
            this.map.set(key, panel);
        }
        return this.map.get(key);
    }
}

export const newRankPanelMgrIns: NewRankPanelMgr = new NewRankPanelMgr();