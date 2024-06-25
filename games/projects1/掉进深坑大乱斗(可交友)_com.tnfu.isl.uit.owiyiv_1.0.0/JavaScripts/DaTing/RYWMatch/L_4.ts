import GlobalManager from "../../GlobalManager";
import HotTimeUI from "../../UI/HotTimeUI";
import L4_IntroUI from "../../UI/L4UI/L4_IntroUI";
import LevelLoadUI from "../../UI/LevelLoadUI";
@Component
export default class L_4 extends Script {

    isEnd:boolean = true;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法四bgm资源
            AssetUtil.asyncDownloadAsset("132972");
            
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    this.LevelStart(0)
                }
            });

            Event.addLocalListener("CGS_Level4",()=>{
                this.LevelStart(1)
            })
        }
    }


    //玩法入口函数
    private LevelStart(GameType:number):void{

        this.isEnd = false;
        Event.addLocalListener("Level4End",()=>{
            this.isEnd = true;
            SoundService.stopSound("132972");
        })

        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType)
        globalManager.setLevelId(4)

        //传送玩家到玩法4位置
        let levelpos = GameObject.findGameObjectByName("Level4Start").worldTransform.position

        //进入玩法四后,禁用玩法四BGM
        setTimeout(() => {
            if(this.isEnd == false){
                SoundService.stopSound("132972");
            }
        }, 136*1000);

        //进入玩法四后,播放玩法四BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 8*1000);
        

        for (let i = 0; i < allPlayersIds.length; i++) {

            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i],0)

            let player = Player.getPlayer(allPlayersIds[i]);
            
            player.character.worldTransform.position = levelpos;

            player.character.movementEnabled = false;
            setTimeout(() => {
                player.character.movementEnabled = true;
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                Event.dispatchToLocal("Level4Init")
            }, 6*1000);

            this.InClientFun(player,globalManager.getLevelTime(4),globalManager.getLevelCount());
            
        }

        setTimeout(() => {
                Event.dispatchToLocal("initCountDown",globalManager.getLevelTime(4))
                this.Level4Fun();
        }, 6*1000);               
    }


    // 播放玩法4全局BGM
    private playGlobalBGM(): void {
        const bgmSoundAssetId = "132972";
            SoundService.playBGM(bgmSoundAssetId, 0.6);
    }

    @RemoteFunction(Server)
    private async Level4Fun(): Promise<void> {
    }

    //客户端调用
    @RemoteFunction(Client)
    private InClientFun(player:Player,num:number,levelCoundId:number) : void{
        let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10); 
        loadui.ShowLevelUIById(levelCoundId)
        setTimeout(() => {
            loadui.destroy();
        }, 3*1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");

        let introui = mw.createUI("L4UI/L4_IntroUI",L4_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI",HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3*1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3*1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4*1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5*1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6*1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown",num)
        }, 7*1000);
    }
}