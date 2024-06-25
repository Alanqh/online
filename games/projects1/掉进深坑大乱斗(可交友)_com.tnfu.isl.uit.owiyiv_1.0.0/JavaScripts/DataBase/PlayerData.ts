
export default class PlayerData extends Subdata {

    // 玩家数据

    //奇妙币
    @Decorator.persistence()
    WonderCion : number;

    // 奇妙伞
    @Decorator.persistence()
    WonderUmb : number;

    //总得分
    @Decorator.persistence()
    TotalScore : number;

    //总游玩场数
    @Decorator.persistence()
    TotalSession : number;

    // 初始化默认数据
    protected initDefaultData(): void {
        this.WonderCion = 0;
        this.WonderUmb = 0;
        this.TotalScore = 0;
        this.TotalSession = 0;
    }

    public AddWonderCion(num:number):void{
        this.WonderCion += num;
    }

    public AddWonderUmb(num:number):void{
        this.WonderUmb += num;
    }

    public AddTotalScore(num:number):void{
        this.TotalScore += num;
    }

    public AddTotalSession(num:number):void{
        this.TotalSession += num;
    }

}