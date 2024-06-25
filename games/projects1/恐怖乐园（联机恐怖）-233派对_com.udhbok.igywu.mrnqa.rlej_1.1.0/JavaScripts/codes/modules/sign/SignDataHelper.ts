/**
 * 签到数据，功能为：定义签到数据的存储结构，以及提供签到数据的操作方法
 */

import { GameConfig } from "../../../config/GameConfig";

export enum ESignState {
    /**已领取 */
    Received = 1,
    /**已签到未领取 */
    CanReceive,
    /**待签到 */
    NotTime

}

export class SignDataHelper extends Subdata {

    /**签到活动版本 */
    @Decorator.persistence()
    public signVersion: number = 0;

    /**已经领取的 */
    @Decorator.persistence()
    public sign7thGetRecord: number[] = [];

    /**可以领取的 */
    @Decorator.persistence()
    public sign7thCanGetList: number[] = [];

    @Decorator.persistence()
    public lastLoginTime: number = 0;

    public onSingChangeAction: Action2<number[], number[]> = new Action2()

    protected onDataInit(): void {

    }

    /**更新签到数据 */
    public updateSignData() {
        //检查时间
        if (this.checkDate()) {
            let list = [].concat(this.sign7thGetRecord).concat(this.sign7thCanGetList)
            if (list.length >= GameConfig.CheckIn.getAllElement().length) return;
            this.sign7thCanGetList.push(list.length + 1);//加一就是今天可以领的
            this.save(true);
        }
    }

    /**检查领取状态 */
    public checkState(dayIndex: number) {
        if (this.sign7thGetRecord.indexOf(dayIndex) != -1) {
            return ESignState.Received;
        } else if (this.sign7thCanGetList.indexOf(dayIndex) != -1) {
            return ESignState.CanReceive;
        } else {
            return ESignState.NotTime;
        }
    }

    /**保存领取索引 */
    public saveReward(dayIndex: number) {
        let index = this.sign7thCanGetList.indexOf(dayIndex)
        if (index == -1) return false;
        if (this.sign7thGetRecord.indexOf(dayIndex) != -1) return false;
        this.sign7thGetRecord.push(dayIndex);
        this.sign7thCanGetList.splice(index, 1);
        this.save(true);
        this.onSingChangeAction.call(this.sign7thGetRecord, this.sign7thCanGetList);
        return true;
    }

    /**重置签到数据 */
    public resetData() {
        this.sign7thGetRecord = [];
        this.sign7thCanGetList = [];
        this.lastLoginTime = 0;
        this.save(true);
    }

    /**检查签到是否完毕 */
    public checkFinish() {
        return this.sign7thGetRecord.length === GameConfig.CheckIn.getAllElement().length
    }

    public checkDate() {
        //检查时间
        let lastDay = new Date(this.lastLoginTime).getDate()//上次登录的日期
        let curDay = new Date().getDate();
        if (lastDay != curDay) {
            this.lastLoginTime = Date.now();
            return true
        }
        return false
    }

    /**检查有没有可以领取的 */
    public checkCanReceive() {
        return this.sign7thCanGetList.length != 0
    }

}