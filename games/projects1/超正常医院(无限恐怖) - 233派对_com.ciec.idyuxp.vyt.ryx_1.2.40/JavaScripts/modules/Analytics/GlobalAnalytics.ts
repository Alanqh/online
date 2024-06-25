import { GameConfig } from "../../config/GameConfig";
import { EnumAnalytics } from "../../const/enum";
import { utils } from "../../utils/uitls";
import { AnalyticsTool } from "./AnalyticsTool";



/**
 * 全服数据
 */
export class GlobalAnalytics {

    private static _instance: GlobalAnalytics;

    public static get instance(): GlobalAnalytics {
        if (!this._instance) {
            this._instance = new GlobalAnalytics();
        }
        return this._instance;
    }


    /**初始化 判断日期*/
    public async init() {
        let curTime = utils.getTodayNumber();

        let date = (await DataStorage.asyncGetData(EnumAnalytics.CurDate)).data as number;
        if (!date) {
            this.reset();
            DataStorage.asyncSetData(EnumAnalytics.CurDate, curTime);

        } else {
            // 如果不是同一天
            if (date != curTime) {
                this.reset();
                DataStorage.asyncSetData(EnumAnalytics.CurDate, curTime);
            }
        }
        //商业化
        await this.shopInit(EnumAnalytics.reborn_use);
        await this.shopInit(EnumAnalytics.transfer_use);
        await this.shopInit(EnumAnalytics.recharge_hit);
        await this.shopInit(EnumAnalytics.recharge_confirm_hit);
        await this.shopInit(EnumAnalytics.recharge_return_hit);
        GameConfig.Monsters.getAllElement().forEach(async (element) => {
            await this.shopInit("Monster_" + element.ID);
        });

        await this.shopInit(EnumAnalytics.Event_Click);
        await this.shopInit(EnumAnalytics.EventShop_Click);
        await this.shopInit(EnumAnalytics.EventShop_Buy);
        await this.shopInit(EnumAnalytics.EventButton_Click);
        await this.shopInit(EnumAnalytics.EventTransferSuccess);
        await this.shopInit(EnumAnalytics.PassCheckBuy);
        await this.shopInit(EnumAnalytics.PassCheckBuyAffrim);
        await this.shopInit(EnumAnalytics.PasscheckBuySuccess);
        await this.shopInit(EnumAnalytics.PassCheckBonus_Get_);
    }

    /**商业化初始化 */
    private async shopInit(key: EnumAnalytics | string) {
        let date = (await DataStorage.asyncGetData(key)).data as number;
        if (!date) {
            await DataStorage.asyncSetData(key, 1);
        }
    }

    public reset() {
        DataStorage.asyncSetData(EnumAnalytics.PlayerDead, 1);
        DataStorage.asyncSetData(EnumAnalytics.PlayerRescue, 1);
        DataStorage.asyncSetData(EnumAnalytics.PlayerAttack, 1);
        DataStorage.asyncSetData("1000", 1);
        DataStorage.asyncSetData("999", 1);
        DataStorage.asyncSetData(EnumAnalytics.ArcherCount, 1);
        DataStorage.asyncSetData(EnumAnalytics.ArcherTime, 1);
        GameConfig.Item.getAllElement().forEach((element) => {
            DataStorage.asyncSetData(element.id.toString(), 1);
        });
    }


    /**设置枚举数据 */
    public async setGlobalEnumData(key: EnumAnalytics, player: Player) {


        switch (key) {
            case EnumAnalytics.PlayerDead:
                AnalyticsTool.ts_game_dead(0, player)
                break;
            case EnumAnalytics.PlayerRescue:
                AnalyticsTool.ts_action_click("1", player);
                break;
            case EnumAnalytics.PlayerAttack:
                AnalyticsTool.ts_action_kill(1, player);
                break;
            case EnumAnalytics.ArcherCount:
                AnalyticsTool.ts_action_do(1, player);
                break;
            case EnumAnalytics.reborn_use:
                AnalyticsTool.ts_action_click_shop(key, 1, player);
                break;
            case EnumAnalytics.transfer_use:
                AnalyticsTool.ts_action_click_shop(key, 1, player);
                break;
            case EnumAnalytics.recharge_hit:
                AnalyticsTool.ts_action_click_shop(key, 1, player);
                break;
            case EnumAnalytics.recharge_confirm_hit:
                AnalyticsTool.ts_action_click_shop(key, 1, player);
                break;
            case EnumAnalytics.recharge_return_hit:
                AnalyticsTool.ts_action_click_shop(key, 1, player);
                break;
        }


    }

    /**设置变身选中 */
    public setGlobalTransformSelect(id: number, player: Player) {
        let key = EnumAnalytics.Monster_ + id
        this.getGlobalData(key).then(async (value) => {
            value++;
            AnalyticsTool.ts_action_click_monster(key, value, player);
            await DataStorage.asyncSetData(EnumAnalytics.Monster_ + id, value);
        });
        AnalyticsTool.ts_action_firstdo("1002", 0, player);
    }

    /**设置弓马手组成时间 */
    public setGlobalArcherTimeData(time: number, player: Player) {

        AnalyticsTool.ts_action_hit(time, player);

    }

    /**设置Id数据 */
    public async setGlobalIdData(key: string, player: Player) {


        AnalyticsTool.ts_action_firstdo(key, 1, player);


    }


    /**获取数据 */
    public async getGlobalData(key: EnumAnalytics | string) {
        let data = await DataStorage.asyncGetData(key);
        return data.data as number;
    }

    /**三期埋点 */
    public async setGlobalThreeData(key: string, player: Player) {

        AnalyticsTool.ts_action_firstdo(key, 1, player);


    }


}