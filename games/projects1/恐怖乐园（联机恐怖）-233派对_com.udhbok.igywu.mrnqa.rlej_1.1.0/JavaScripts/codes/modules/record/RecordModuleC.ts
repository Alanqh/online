/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-09 15:43:36
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-16 19:00:24
 * @FilePath: \1001_hall\JavaScripts\codes\modules\record\RecordModuleC.ts
 * @Description  : 
 */



import RecordData from "./RecordData";
import RecordModuleS from "./RecordModuleS";

export default class RecordModuleC extends ModuleC<RecordModuleS, RecordData> {

    /**
     * 记录拍鬼次数
     * @param cfgIdList 鬼图录id列表
     */
    public addGhostPicCount(cfgIdList: number[]) {
        this.server.net_addGhostPicCount(cfgIdList);
    }

    /**
     * 保存hand次数
     * @param type 0是非门交互  1是门交互
     */
    public addHandCount(type: number) {
        this.server.net_addHandCount(type);
    }

    /**
    * 请求保存对话且领取过奖励的Npc信息
    * @param id npcID
    */
    public reqSaveTalkNpc(id: number): boolean {
        if (this.data.talkNpcArr.includes(id)) {
            return false;
        }
        this.server.net_saveTalkNpc(id);
        return true;
    }
}