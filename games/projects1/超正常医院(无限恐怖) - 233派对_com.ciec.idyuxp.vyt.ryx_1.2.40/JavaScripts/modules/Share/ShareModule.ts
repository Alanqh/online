
export class ShareModuleC extends ModuleC<ShareModuleS, ShareData> {

    getCoin() {
        return this.data.abCoin;
    }

    public async addGameCoin(val: number) { return await this.server.net_AddGameCoin(val); }

    public async subGameCoin(val: number) { return await this.server.net_SubGameCoin(val); }

}



export class ShareModuleS extends ModuleS<ShareModuleC, ShareData> {


    protected onPlayerEnterGame(player: mw.Player): void {
        this.getPlayerData(player);
    }

    getPlayerCoin(player: Player) {
        return this.getPlayerData(player).abCoin;
    }

    net_AddGameCoin(value: number) {
        return this.addGameCoin(value, this.currentPlayer)
    }

    net_SubGameCoin(value: number) {
        return this.reduceGameCoin(value, this.currentPlayer)
    }

    addGameCoin(val: number, player: Player) {
        return this.getPlayerData(player).changegameCoin(val, true);
    }

    reduceGameCoin(val: number, player: Player) {
        return this.getPlayerData(player).changegameCoin(val, false);
    }
}


export class ShareData extends Subdata {

    /**异常币 */
    @Decorator.persistence()
    private _abCoin: number = 0;

    /**币子改变事件 */
    public onGameCoinChange: Action1<number> = new Action1();

    public get abCoin(): number {
        return this._abCoin;
    }


    /**游戏币改变 */
    public changegameCoin(value: number, isAdd: boolean, isSync: boolean = true): boolean {
        if (!isAdd && this.abCoin < value) {
            console.error("游戏币不足");
            return false;
        }
        isAdd ? this._abCoin += value : this._abCoin -= value;

        this.save(isSync);
        this.onGameCoinChange.call(this.abCoin);
        return true;
    }

}