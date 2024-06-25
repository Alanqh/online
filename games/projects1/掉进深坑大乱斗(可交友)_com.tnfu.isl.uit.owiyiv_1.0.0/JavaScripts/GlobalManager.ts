import CountDown from "./CountDown";
export default class GlobalManager {
    private static _instance: GlobalManager;
    private levelList: any[] = [4,4]; // 初始化关卡顺序数组
    private levelCount: number = 0; // 初始化当前关卡次数
    private GameType: number = -1; //0表示任意玩   1表示闯关赛
    private levelId: number = 0; // 当前玩法id，大厅为0
    private LevelTimeMap:Map<number,number> = new Map(); // key：关卡id  value：关卡倒计时
    private PlayerMap:Map<string,number> = new Map();//当前游戏中玩家分数信息 key玩家id，value分数
    private PlayerIsInDaTingMap:Map<string,boolean> = new Map();//当前游戏中玩家是否在大厅 key玩家id，value是否在大厅
    //初始化
    private constructor() {
        //初始化操作
        this.Init();
        this.SetRandomLevelList();
        //设置玩法及其对应倒计时
        this.LevelTimeMap.set(1, 40);
        this.LevelTimeMap.set(2, 40);
        this.LevelTimeMap.set(3, 60);
        this.LevelTimeMap.set(4, 120);
        this.LevelTimeMap.set(5, 100);
        this.LevelTimeMap.set(6, 50);
        this.LevelTimeMap.set(7, 75);
        this.LevelTimeMap.set(8, 65);
        
    }
    public Init():void{
        //初始化操作
        this.levelId = 0;
        this.GameType = -1;
        this.levelCount = 0;
        this.PlayerMap.clear();
    }
    public SetRandomLevelList() {
        this.setLevelList(this.generateRandomLevelList());
    }
    private generateRandomLevelList(): any[] {
        return [...this.levelList].sort(() => Math.random() - 0.5);
    }
    // 获取单例实例
    public static getInstance(): GlobalManager {
        if (!GlobalManager._instance) {
            GlobalManager._instance = new GlobalManager();
        }
        return GlobalManager._instance;
    }
    // 公共方法来设置和获取全局变量
    setLevelList(list: any[]) {
        this.levelList = list;
    }
    getLevelList(): any[] {
        return this.levelList;
    }
    setLevelCount(count: number) {
        this.levelCount = count;
    }
    getLevelCount(): number {
        return this.levelCount;
    }
    setGameType(n: number) {
        this.GameType = n;
    }
    getGameType(): number {
        return this.GameType;
    }
    setLevelId(id: number) {
        this.levelId = id;
    }
    getLevelId(): number {
        return this.levelId;
    }
    getLevelTime(id: number): number {
        return this.LevelTimeMap.get(id);
    }
    
    //增加玩家分数
    public AddPlayerScore(playerId:string,score:number):void{
        if(this.PlayerMap.has(playerId)){
            let oldScore = this.PlayerMap.get(playerId);
            this.PlayerMap.set(playerId,oldScore+score);
        }else{
            this.PlayerMap.set(playerId,score);
        }
    }

    //获取玩家分数
    public GetPlayerScore(playerId:string):number{
        if(this.PlayerMap.has(playerId)){
            return this.PlayerMap.get(playerId);
        }else{
            return 0;
        }
    }

    //判断玩家id是否存在PlayerMap
    public IsPlayerExist(playerId:string):boolean{
        return this.PlayerMap.has(playerId);
    }

    //清空PlayerMap
    public ClearPlayerMap():void{
        this.PlayerMap.clear();
    }

    //获取PlayerMap中的所有玩家id列表
    public GetPlayerIdList():string[]{
        let playerIdList:string[] = [];
        this.PlayerMap.forEach((value,key)=>{
            playerIdList.push(key);
        })
        return playerIdList;
    }

    //判断玩家是否在大厅
    public IsPlayerInDaTing(playerId:string):boolean{
        if(this.PlayerIsInDaTingMap.has(playerId)){
            return this.PlayerIsInDaTingMap.get(playerId);
        }else{
            return false;
        }
    }

    //设置玩家是否在大厅
    public SetPlayerInDaTing(playerId:string,isInDaTing:boolean):void{
        this.PlayerIsInDaTingMap.set(playerId,isInDaTing);
    }

}
