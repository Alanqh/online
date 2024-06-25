import SettlementManager from "./SettlementManager";
import GlobalManager from "./GlobalManager";
import CountDown from "./CountDown";
import SettlementUI from "./UI/SettlementUI";
import PlayerData from "./DataBase/PlayerData";
import RankUI from "./UI/RankUI";
@Component
export default class LevelEnd extends Script {

    protected onStart(): void {
        Event.addLocalListener("LevelEnd",()=>{
            console.log("Init LevelEnd OnStart")
            this.LevelEndFun()
        })
    }

    //处理倒计时or玩法结束逻辑  仅处理单个玩家
    public LevelEndFun():void{
        let globalManager = GlobalManager.getInstance();
        let levelId = globalManager.getLevelId();
        let gameType = globalManager.getGameType();
        this.LevelSettlementFun(levelId)
        setTimeout(() => {
            this.NextTeleport(gameType)
        }, 10*1000);
        
    }

    //处理子玩法结算
    private LevelSettlementFun(levelId:number):void{
        let settlementManager = SettlementManager.getInstance();
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        //子玩法1
        if(levelId == 1){
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if(CurRank == 1){
                        globalManager.AddPlayerScore(playerId,3);
                    }
                    else if(CurRank == 2){
                        globalManager.AddPlayerScore(playerId,2);
                    }
                    else if(CurRank >= 3){
                        globalManager.AddPlayerScore(playerId,1);
                    }
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,settlementManager.GetPlayerRankMap(),levelId);
                    }
                    
                }
            })
        }

        //子玩法2
        if(levelId == 2){
            let CountMap = settlementManager.GetPlayerCountMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(CountMap.entries()).sort((a, b) => b[1] - a[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap: Map<string, number> = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if(Rank == 1){
                    globalManager.AddPlayerScore(key,3);
                }
                if(Rank == 2){
                    globalManager.AddPlayerScore(key,2);
                }
                if(Rank >= 3){
                    globalManager.AddPlayerScore(key,1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,sortedMap,levelId);
                    }
                    
                }
            })
        }

        //子玩法3
        if(levelId == 3){
            let loseMap = settlementManager.GetPlayerLoseMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(loseMap.entries()).sort((a, b) => a[1] - b[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap: Map<string, number> = new Map(sortedPlayers);
            //打印
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if(Rank == 1){
                    globalManager.AddPlayerScore(key,3);
                }
                if(Rank == 2){
                    globalManager.AddPlayerScore(key,2);
                }
                if(Rank >= 3){
                    globalManager.AddPlayerScore(key,1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,sortedMap,levelId);
                    }
                }
                
            })
        }

        //子玩法4
        if(levelId == 4){
            //注意倒序排名，排名最后的分数越高,排名0说明未死亡
            let RankMap = settlementManager.GetPlayerRankMap()
            const sortedPlayers = Array.from(RankMap.entries()).sort((a, b) => {
                if(a[1] == 0){
                    return -1;
                }

                if(b[1] == 0){
                    return 1;
                }

                if(a[1] > b[1]){
                    return -1;
                }
                else{
                    return 1;
                }
            });
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap: Map<string, number> = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if(Rank == 1){
                    globalManager.AddPlayerScore(key,3);
                }
                if(Rank == 2){
                    globalManager.AddPlayerScore(key,2);
                }
                if(Rank >= 3){
                    globalManager.AddPlayerScore(key,1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,sortedMap,levelId);
                    }
                }
                
            })
            
        }

        //子玩法5
        if(levelId == 5){
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if(CurRank == 1){
                        globalManager.AddPlayerScore(playerId,3);
                    }
                    else if(CurRank == 2){
                        globalManager.AddPlayerScore(playerId,2);
                    }
                    else if(CurRank >= 3){
                        globalManager.AddPlayerScore(playerId,1);
                    }
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,settlementManager.GetPlayerRankMap(),levelId);
                    }
                }     
            })
        }

        //子玩法6
        if(levelId == 6){
            let CountMap = settlementManager.GetPlayerCountMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(CountMap.entries()).sort((a, b) => b[1] - a[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap: Map<string, number> = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if(Rank == 1){
                    globalManager.AddPlayerScore(key,3);
                }
                if(Rank == 2){
                    globalManager.AddPlayerScore(key,2);
                }
                if(Rank >= 3){
                    globalManager.AddPlayerScore(key,1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,sortedMap,levelId);
                    }
                }
                
            })

        }

        //子玩法7
        if(levelId == 7){
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if(CurRank == 1){
                        globalManager.AddPlayerScore(playerId,3);
                    }
                    else if(CurRank == 2){
                        globalManager.AddPlayerScore(playerId,2);
                    }
                    else if(CurRank >= 3){
                        globalManager.AddPlayerScore(playerId,1);
                    }
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,settlementManager.GetPlayerRankMap(),levelId);
                    }
                }     
            })
        }

        //子玩法8
        if(levelId == 8){
            playerIdList.forEach(playerId => {
                if(!globalManager.IsPlayerInDaTing(playerId)){
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if(CurRank == 1){
                        globalManager.AddPlayerScore(playerId,3);
                    }
                    else if(CurRank == 2){
                        globalManager.AddPlayerScore(playerId,2);
                    }
                    else if(CurRank >= 3){
                        globalManager.AddPlayerScore(playerId,1);
                    }
                    let player = Player.getPlayer(playerId)
                    if(player){
                        this.ShowRankUI(player,settlementManager.GetPlayerRankMap(),levelId);
                    }
                }     
            })
        }

        SettlementManager.destroyInstance();
    }

    //处理传送
    private NextTeleport(gameType:number):void{
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        console.log("NextTeleport gametype"+gameType)
        //打印玩家id列表
        console.log("playeridlist:"+playerIdList)
        Event.dispatchToAllClient("LookWarEnd")
        if(gameType == 0){
            let datingpos = GameObject.findGameObjectByName("PlayerStart").worldTransform.position
            playerIdList.forEach(playerId => {
                let player = Player.getPlayer(playerId);
                if(player){
                    player.character.maxWalkSpeed = 1500;
                    player.character.worldTransform.position = datingpos;
                    console.log("playerid:"+playerId);
                    console.log("score:"+globalManager.GetPlayerScore(playerId));
                    this.SaveData(player,globalManager.GetPlayerScore(playerId),gameType);
                }
            })
            globalManager.Init();
        }
        if(gameType == 1){
            let levelCount = globalManager.getLevelCount();
            levelCount = levelCount + 1;
            globalManager.setLevelCount(levelCount);
            if(levelCount == 1){
                let datingpos = GameObject.findGameObjectByName("PlayerStart").worldTransform.position
                playerIdList.forEach(playerId => {
                    let player = Player.getPlayer(playerId);
                    if(player){
                        player.character.maxWalkSpeed = 500;
                        player.character.worldTransform.position = datingpos;
                        console.log("playerid:"+playerId);
                        console.log("score:"+globalManager.GetPlayerScore(playerId));
                        this.SaveData(player,globalManager.GetPlayerScore(playerId),gameType);
                    }   
                })
                globalManager.Init();
            }
            else{
                //设置关卡
                globalManager.setLevelId(globalManager.getLevelList()[globalManager.getLevelCount()]);
                let CGSLevelStr = "CGS_Level" + globalManager.getLevelId();
                console.log("闯关赛事件 ",CGSLevelStr)
                Event.dispatchToLocal(CGSLevelStr)
            }
        }
    }

    //保存玩家数据
    @RemoteFunction(Server)
    private SaveData(player:Player,score:number,gameType:number):void{
        console.log("In SaveData"+player.userId)
        let playerData = DataCenterS.getData(player,PlayerData)
        playerData.AddTotalScore(score)
        playerData.AddTotalSession(1)
        playerData.AddWonderCion(score*100)
        let Umb:number = 0;
        if(gameType == 1){
            if (score >= 12) {
                Umb = 5;
            } else if (score >= 8) {
                Umb = 4;
            } else if (score >= 5) {
                Umb = 3;
            } else if (score >= 3) {
                Umb = 2;
            } else if (score >= 1) {
                Umb = 1;
            } else {
                Umb = 0;
            }     
        }
        playerData.AddWonderUmb(Umb)
        playerData.save(true);
        this.ShowSettlementUI(player,score,score*100,Umb)
    }

    //显示结算信息
    @RemoteFunction(Client)
    private ShowSettlementUI(player:Player,WinCount:number,Coin:number,Umb:number):void{
        let ui = mw.createUI("SettlementUI",SettlementUI)
        ui.uiWidgetBase.addToViewport(2);
        ui.playerName.text = player.character.displayName;
        ui.winCount.text = WinCount.toString();
        ui.winCoin.text = Coin.toString();
        ui.winUmb.text = Umb.toString();

        ui.closeButton.onClicked.add(()=>{
            //模糊功能启用
            PostProcess.blurEnabled = false;
            ui.destroy();
        })
    }

    //显示局内结算排名信息
    @RemoteFunction(Client)
    private ShowRankUI(player:Player,rankMap:Map<string,number>,levelId:number):void{
        let ui = mw.createUI("RankUI",RankUI)
        ui.uiWidgetBase.addToViewport(5);
        setTimeout(() => {
            ui.destroy();
            PostProcess.blurEnabled = false;
        }, 8*1000);
        ui.playerName1.text = ""
        ui.playerName2.text = ""
        ui.playerName3.text = ""
        ui.rankName1.text = ""
        ui.rankName2.text = ""
        ui.rankName3.text = ""
        ui.selfRankId.text = ""
        ui.selfRankName.text = ""
        
        //模糊功能启用
        PostProcess.blurEnabled = true;


        if(levelId == 1){
            ui.rankName.text = "通关情况"
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if(value == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if(value == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if(value == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level1本地玩家排名"+LocalRank)
            if(LocalRank == 1){
                ui.selfRankId.text = "1"
                ui.selfRankName.text = "冠军"
            }
            else if(LocalRank == 2){
                ui.selfRankId.text = "2"
                ui.selfRankName.text = "亚军"
            }
            else if(LocalRank == 3){
                ui.selfRankId.text = "3"
                ui.selfRankName.text = "并列季军"
            }
            else if(LocalRank == 0){
                ui.selfRankId.text = "未上榜"
                ui.selfRankName.text = "未通关"
            }
            else{
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关"
            }
        }

        if(levelId == 2){
            ui.rankName.text = "金币数量";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if(Rank == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = value.toString();
                }
                if(Rank == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = value.toString();
                }
                if(Rank == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = value.toString();
                }
                if(key == player.userId){
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = value.toString();
                }
                Rank++;
            }
        }

        if(levelId == 3){
            ui.rankName.text = "受伤程度"
            let Rank = 1;
            for (const [key, value] of rankMap) {
                let hurt = Math.round(value/30*100*10)/10;
                if(hurt > 100.0) hurt = 100;
                if(Rank == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = hurt.toString()+"%";
                }
                if(Rank == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = hurt.toString()+"%";
                }
                if(Rank == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = hurt.toString()+"%";
                }
                if(key == player.userId){
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = hurt.toString()+"%";
                }
                Rank++;
            }
        }

        if(levelId == 4){
            ui.rankName.text = "通关情况"
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if(Rank == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "第一名";
                }
                if(Rank == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "第二名";
                }
                if(Rank == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "第三名";
                }
                if(key == player.userId){
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = "完成";
                }
                Rank++;
            }
        }

        if(levelId == 5){
            ui.rankName.text = "通关情况"
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if(value == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if(value == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if(value == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level5本地玩家排名"+LocalRank)
            if(LocalRank == 1){
                ui.selfRankId.text = "1"
                ui.selfRankName.text = "冠军"
            }
            else if(LocalRank == 2){
                ui.selfRankId.text = "2"
                ui.selfRankName.text = "亚军"
            }
            else if(LocalRank == 3){
                ui.selfRankId.text = "3"
                ui.selfRankName.text = "并列季军"
            }
            else if(LocalRank == 0){
                ui.selfRankId.text = "未上榜"
                ui.selfRankName.text = "未通关"
            }
            else{
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关"
            }
        }

        if(levelId == 6){
            ui.rankName.text = "命中得分";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if(Rank == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = value.toString();
                }
                if(Rank == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = value.toString();
                }
                if(Rank == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = value.toString();
                }
                if(key == player.userId){
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = value.toString();
                }
                Rank++;
            }
        }

        if(levelId == 7){
            ui.rankName.text = "通关情况"
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if(value == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if(value == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if(value == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level7本地玩家排名"+LocalRank)
            if(LocalRank == 1){
                ui.selfRankId.text = "1"
                ui.selfRankName.text = "冠军"
            }
            else if(LocalRank == 2){
                ui.selfRankId.text = "2"
                ui.selfRankName.text = "亚军"
            }
            else if(LocalRank == 3){
                ui.selfRankId.text = "3"
                ui.selfRankName.text = "并列季军"
            }
            else if(LocalRank == 0){
                ui.selfRankId.text = "未上榜"
                ui.selfRankName.text = "未通关"
            }
            else{
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关"
            }
        }

        if(levelId == 8){
            ui.rankName.text = "通关情况"
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if(value == 1){
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if(value == 2){
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if(value == 3){
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level8本地玩家排名"+LocalRank)
            if(LocalRank == 1){
                ui.selfRankId.text = "1"
                ui.selfRankName.text = "冠军"
            }
            else if(LocalRank == 2){
                ui.selfRankId.text = "2"
                ui.selfRankName.text = "亚军"
            }
            else if(LocalRank == 3){
                ui.selfRankId.text = "3"
                ui.selfRankName.text = "并列季军"
            }
            else if(LocalRank == 0){
                ui.selfRankId.text = "未上榜"
                ui.selfRankName.text = "未通关"
            }
            else{
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关"
            }
        }
    } 
        
}