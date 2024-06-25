import GlobalManager from "../../GlobalManager";
import HotTimeUI from "../../UI/HotTimeUI";
import L8_IntroUI from "../../UI/L8UI/L8_IntroUI";
import LevelLoadUI from "../../UI/LevelLoadUI";
@Component
export default class L_8 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.useUpdate = true

        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {

            //异步下载玩法一bgm资源
            AssetUtil.asyncDownloadAsset("129648");

            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    this.LevelStart(0)
                }
            });

            Event.addLocalListener("CGS_Level8",()=>{
                this.LevelStart(1)
            })
        }
    }

    //玩法入口函数
    private LevelStart(GameType:number):void{
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType)
        globalManager.setLevelId(8)

        Event.dispatchToLocal("Level8Init")

        //传送玩家到玩法8位置
        let levelpos = GameObject.findGameObjectByName("Level8Start").worldTransform.position;

        //进入玩法后,禁用玩法BGM
        setTimeout(() => {
            SoundService.stopSound("129648");
        }, 83*1000);

        //进入玩法后,播放玩法BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 8*1000);

        for (let i = 0; i < allPlayersIds.length; i++) {

            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i],0)

            let player = Player.getPlayer(allPlayersIds[i]);
            
            player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+MathUtil.randomFloat(-500.00,500.00),levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            
            player.character.worldTransform.rotation = new Rotation(0,0,0)

            player.character.setStateEnabled(CharacterStateType.Running,false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running,true);
                //玩家最大速度
                player.character.maxWalkSpeed = 400;
            }, 8*1000);

            this.InClientFun(player,globalManager.getLevelTime(8),globalManager.getLevelCount())
        }

        setTimeout(() => {
            Event.dispatchToLocal("initCountDown",globalManager.getLevelTime(8))
        }, 8*1000);
    }

    // 播放玩法1全局BGM
    private playGlobalBGM(): void {
        const bgmSoundAssetId = "129648";
            SoundService.playBGM(bgmSoundAssetId, 0.6);
    }

    //客户端调用
    @RemoteFunction(Client)
    private InClientFun(player:Player,num:number,levelCoundId:number) : void{
        let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10); 
        loadui.ShowLevelUIById(levelCoundId)
        setTimeout(() => {
            loadui.destroy();
        }, 83*1000);

        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");

        let introui = mw.createUI("L8UI/L8_IntroUI",L8_IntroUI);
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
        }, 5*1000);
        setTimeout(() => {
            SoundService.playSound("132944")
        }, 5*1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 6*1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 7*1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 8*1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown",num)
        }, 9*1000);
    }

    protected onUpdate(dt: number): void {
        TweenUtil.TWEEN.update();
    }
}

    
