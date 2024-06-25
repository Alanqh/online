
export class PlayerModuleData extends Subdata {

    /**复活币 */
    @Decorator.persistence()
    public reviceCoin: number;

    /**拯救数 */
    @Decorator.persistence()
    public saveCount: number = 0;

    /**感染数 */
    @Decorator.persistence()
    public infectionCount: number = 0;

    /**首次加入 */
    @Decorator.persistence()
    public firstJoin: boolean = true;

    protected initDefaultData(): void {
        this.reviceCoin = 0;
        this.firstJoin = true;
    }

    public addSaveCount() {
        this.saveCount++;
        this.save(false);
    }

    public addInfectionCount() {
        this.infectionCount++;
        this.save(false);
    }


}