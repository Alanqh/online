
export class TeamData extends Subdata {

    /**代币 */
    @Decorator.persistence()
    private _bioCoin: number = 0;

    /**币子改变事件 */
    public onGameCoinChange: Action1<number> = new Action1();

    public get bioCoin(): number {
        return this._bioCoin;
    }


    protected initDefaultData(): void {
        this._bioCoin = 0;
    }



    /**游戏币改变 */
    public changegameCoin(value: number, isAdd: boolean, isSync: boolean = true): boolean {
        if (!isAdd && this._bioCoin < value) {
            console.error("游戏币不足");
            return false;
        }
        isAdd ? this._bioCoin += value : this._bioCoin -= value;

        this.save(isSync);
        this.onGameCoinChange.call(this._bioCoin);
        return true;
    }
}