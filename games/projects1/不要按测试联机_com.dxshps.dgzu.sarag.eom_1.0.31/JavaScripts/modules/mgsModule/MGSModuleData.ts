
export class MGSModuleData extends Subdata {
    /**核心循环步数 */
    @Decorator.persistence()
    private step: number = -1;
    public get curStep(): number {
        return this.step;
    }

    public get dataName() {
        return "MGSModuleData";
    }

    protected initDefaultData(): void {
        this.step = -1;
    }

    /**核心循环 */
    public changeStep(step: number) {
        this.step = step;
        this.save(true);
    }

}