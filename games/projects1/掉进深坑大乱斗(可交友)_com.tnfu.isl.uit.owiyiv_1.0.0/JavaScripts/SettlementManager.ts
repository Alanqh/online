import GlobalManager from "./GlobalManager";
export default class SettlementManager{
    private static _instance: SettlementManager;
    private playerLoseMap:Map<string,number> = new Map();//玩家死亡数
    private playerCountMap:Map<string,number> = new Map();//玩家Count数，Count可以作为金币等
    private curRank:number = 1;//当前排名
    private playerRankMap:Map<string,number> = new Map();//玩家排名

    //初始化
    private constructor() {
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        this.curRank = 1;
        playerIdList.forEach(element => {
            this.playerLoseMap.set(element,0);
            this.playerCountMap.set(element,0);
            this.playerRankMap.set(element,0);
        });
    }
    
    //创建/获取单例
    public static getInstance(): SettlementManager {
        if (!SettlementManager._instance) {
            SettlementManager._instance = new SettlementManager();
        }
        return SettlementManager._instance;
    }

    //销毁单例
    public static destroyInstance() {
        if (SettlementManager._instance) {
            SettlementManager._instance = null;
        }
    }

    //获取指定玩家死亡数
    public GetPlayerLose(playerId:string):number{
        return this.playerLoseMap.get(playerId);
    }
    //获取指定玩家Count数
    public GetPlayerCount(playerId:string):number{
        return this.playerCountMap.get(playerId);
    }

    //添加玩家Lose
    public AddPlayerLose(playerId:string,lose:number):void{
        let loseNum = this.playerLoseMap.get(playerId);
        this.playerLoseMap.set(playerId,loseNum+lose);
    }

    //添加玩家Count
    public AddPlayerCount(playerId:string,count:number):void{
        let countNum = this.playerCountMap.get(playerId);
        this.playerCountMap.set(playerId,countNum+count);
    }

    //添加通关玩家
    public AddPlayerPass(playerId:string):void{
        this.playerRankMap.set(playerId,this.curRank);
        this.curRank++;
    }

    //获取玩家排名
    public GetPlayerRank(playerId:string):number{
        return this.playerRankMap.get(playerId);
    }

    //获取玩家LoseMap
    public GetPlayerLoseMap():Map<string,number>{
        return this.playerLoseMap;
    }

    //获取玩家CountMap
    public GetPlayerCountMap():Map<string,number>{
        return this.playerCountMap;
    }

    //获取玩家RankMap
    public GetPlayerRankMap():Map<string,number>{
        return this.playerRankMap;
    }
}