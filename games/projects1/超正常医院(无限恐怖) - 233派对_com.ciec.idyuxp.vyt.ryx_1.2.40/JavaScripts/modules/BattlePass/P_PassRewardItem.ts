import { GameConfig } from "../../config/GameConfig";
import { IGamePassRewaridElement } from "../../config/GamePassRewarid";
import BonusItem_Generate from "../../ui-generate/Event/BonusItem_generate";
import BattlePassModuleData from "./BattlePassModuleData";
import { QualityType } from "./PassEnum";
import PassUtils from "./PassUtils";

export enum PassRewardState {
    /**未解锁 */
    Locked = 0,
    /**已解锁未领取 */
    UnReceive = 1,
    /**已领取 */
    Received = 2
}


/**通行证单个奖励的ItemUI */
export default class P_PassRewardItem extends BonusItem_Generate {

    /**奖励配置 */
    public conf: IGamePassRewaridElement;
    /**是否是高级奖励 */
    private isSenior;

    /**奖励状态 */
    private _state: PassRewardState = PassRewardState.Locked;
    public get state(): PassRewardState {
        return this._state;
    }
    public set state(value: PassRewardState) {
        this.setStateUI(value);
        this._state = value;
    }


    /**初始化单个奖励Item */
    init(confId: number, data: BattlePassModuleData, level: number, isSenior: boolean) {
        let conf = GameConfig.GamePassRewarid.getElement(confId);
        this.conf = conf;
        this.isSenior = isSenior;
        this.mImg_Icon.imageGuid = conf.Icon;
        this.mTxt_Num.text = conf.Count.toString();
        this.setState(data, level);
    }


    public setState(data: BattlePassModuleData, level: number) {
        let itemData = data.getRewardByLevel(level);
        // 1. 判断等级是否达到可解锁等级
        if (level > PassUtils.getCurLevel(data.score)) {
            this.state = PassRewardState.Locked;
            return;
        }
        // 等级达到可领取等级
        if (this.isSenior == false) {
            // 普通奖励, 根据是否已领取设置状态
            if (itemData.isGet1) {
                this.state = PassRewardState.Received;
            } else {
                this.state = PassRewardState.UnReceive;
            }
        } else {
            // 战令奖励, 先看开没开通战令
            if (data.isBuy == false) {
                this.state = PassRewardState.Locked;
                return;
            }
            // 买了战令在看领没领取
            if (itemData.isGet2) {
                this.state = PassRewardState.Received;
            } else {
                this.state = PassRewardState.UnReceive;
            }

        }
    }

    /**设置领取状态UI */
    public setStateUI(state: PassRewardState) {
        switch (state) {
            // 未解锁
            case PassRewardState.Locked:
                this.mCanvas_Got.visibility = SlateVisibility.Collapsed;
                this.mCanvas_Unlock.visibility = SlateVisibility.HitTestInvisible;
                this.mbtn.enable = false;
                break;
            // 未领取
            case PassRewardState.UnReceive:
                this.mCanvas_Got.visibility = SlateVisibility.Collapsed;
                this.mCanvas_Unlock.visibility = SlateVisibility.Collapsed;
                this.mbtn.enable = true;
                break;
            // 已领取
            case PassRewardState.Received:
                this.mCanvas_Got.visibility = SlateVisibility.HitTestInvisible;
                this.mCanvas_Unlock.visibility = SlateVisibility.Collapsed;
                this.mbtn.enable = false;
                break;
        }

    }
}