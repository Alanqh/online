/*
 * @Author       : dal
 * @Date         : 2023-11-09 11:12:27
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-10 15:36:22
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\player\PlayerData.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { MapEx } from "../../utils/MapEx";
import { ArchiveData, ArchiveDataType, ArchiveHelper } from "../archive/ArchiveHelper";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";

/** 初始化复活次数 */
export const INIT_LIFE_NUM: number = 5;

/** 初始化生命值 */
export const INIT_HP_NUM: number = 100;

export default class PlayerData extends Subdata {

    /** 生命数 */
    @Decorator.persistence("hp")
    hp: number = 3;

    hpAction: Action = new Action();

    /** 生命数 */
    @Decorator.persistence("life")
    life: number = 3;

    lifeAction: Action = new Action();

    private _tempData: ArchiveData;

    private _tempArchiveId: number;

    reduceLife(userID: string, reduceNum: number = 1) {
        this.life -= reduceNum;
        // 保存受伤次数
        ArchiveHelper.reqSetData(userID, [ArchiveDataType.BeHurtTimes], [1]);
        this.save(true);
        this.lifeAction.call(this.life);
        // 如果游戏失败了，那就要删档了(保留了一份数据在服务器，以便于玩家可以使用复活道具继续游戏)
        if (this.life <= 0) {
            const archiveId = ProcedureModuleS.getScriptByUserID(userID).archiveID;
            // 玩家死亡了，通知备份数据，方便玩家复活可以恢复
            Event.dispatchToLocal("OnPlayerDeathBackupData", userID, archiveId);
            this._tempArchiveId = archiveId;
            // ProcedureModuleS.getScriptByUserID(userID).archiveID = -1;
            ArchiveHelper.reqGetData(userID, archiveId).then(data => {
                this._tempData = data;
            });
            ArchiveHelper.reqDeleteData(userID, archiveId);
        }
        else {
            if (GameConfig.Global.RevivePos.vector) {
                ArchiveHelper.reqSetData(userID, [ArchiveDataType.LIFE, ArchiveDataType.BIRTHPOS], [this.life, GameConfig.Global.RevivePos.vector]);
            } else {
                ArchiveHelper.reqSetData(userID, [ArchiveDataType.LIFE], [this.life]);
            }
        }
    }

    initLife(userID: string, lifeNum: number) {
        this.life = lifeNum;
        this.save(true);
        this.lifeAction.call(this.life);
        ArchiveHelper.reqSetData(userID, [ArchiveDataType.LIFE], [this.life]);
    }

    /** 供有存档时使用 */
    setLife(lifeNum: number) {
        this.life = lifeNum;
        this.save(true);
        this.lifeAction.call(this.life);
    }

    setHp(userId: string, hpNum: number) {
        this.hp = hpNum;
        this.save(true);
        this.hpAction.call(this.hp);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.HP], [this.hp]);
    }

    public relife(userId: string) {
        if (!this._tempData) {
            return;
        }
        this._tempData.hp = INIT_HP_NUM;
        this._tempData.lifeNum = INIT_LIFE_NUM;
        this._tempData.deathTimes = this._tempData.deathTimes > 0 ? this._tempData.deathTimes + 1 : 1;
        let keys = [];
        let vals = [];
        for (let key in this._tempData) {
            if (this._tempData[key] != null && this._tempData[key] != undefined) {
                // if (key === ArchiveDataType.TIME) {
                //     continue
                // }
                keys.push(key);
                vals.push(this._tempData[key]);
            }
        }
        this.setHp(userId, this._tempData.hp);
        this.setLife(this._tempData.lifeNum);
        ProcedureModuleS.getScriptByUserID(userId).archiveID = this._tempArchiveId;
        ArchiveHelper.reqSetData(userId, keys, vals);
    }
}