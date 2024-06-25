/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:05:13
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-06 13:51:17
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\archive\ArchiveModuleS.ts
 * @Description  : 
 */

import PlayerArchiveData from "./ArchiveData";
import { ArchiveData, ArchiveHelper } from "./ArchiveHelper";
import ArchiveModuleC from "./ArchiveModuleC";

export default class ArchiveModuleS extends ModuleS<ArchiveModuleC, PlayerArchiveData> {

    protected onStart(): void {
        Event.addLocalListener("OnDataMigration", (userId: string) => {
            const data = this.getPlayerData(userId);
            if (data) {
                data.migrate(userId);
            } else {
                console.error(`DEBUG MyTypeError>>> 迁移PlayerArchiveData数据失败，没找到玩家数据userId = ${userId}`);
            }
        })
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        if (!player || !player.userId) { console.error(`DEBUG MyTypError>>> 检测数据迁移失败 没有玩家`); return; }
        ArchiveHelper.checkDataMigration(player.userId);
    }

    net_reqArchiveData(userId: string, archiveID: number): ArchiveData | PromiseLike<ArchiveData> {
        return ArchiveHelper.reqGetData(userId, archiveID);
    }

    @Decorator.noReply()
    net_reqSetData(userID, properties: string[], values: any[]): void {
        ArchiveHelper.reqSetData(userID, properties, values);
    }

    @Decorator.noReply()
    net_forceSaveData(userID, properties: string[], values: any[], archiveId: number): void {
        if (archiveId < 0 || archiveId > 2) { return; }
        ArchiveHelper.reqSetData(userID, properties, values, true, archiveId);
    }

    net_reqAllData(userID: string): Promise<ArchiveData[]> {
        return ArchiveHelper.reqGetAllData(userID);
    }

    @Decorator.noReply()
    net_reqDeleteData(userID: string, archiveId: number): void {
        ArchiveHelper.reqDeleteData(userID, archiveId);
    }

    @Decorator.noReply()
    net_addClickCount(userId: string, archiveId: number) {
        this.getPlayerData(userId).addClickCount(archiveId);
    }

    @Decorator.noReply()
    net_initClickCount(userId: string, archiveId: number) {
        this.getPlayerData(userId).initClickCount(archiveId);
    }
}