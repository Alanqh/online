import GlobalManager from "../../GlobalManager";
import HurtUI from "../../UI/L3UI/HurtUI";
import HotTimeUI from "../../UI/HotTimeUI";
import L3_IntroUI from "../../UI/L3UI/L3_IntroUI";
import LevelLoadUI from "../../UI/LevelLoadUI";
@Component
export default class L_3 extends Script {

    //C
    private selfEffect: number = null;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法三bgm资源
            AssetUtil.asyncDownloadAsset("140367");
            AssetUtil.asyncDownloadAsset("160737");
            AssetUtil.asyncDownloadAsset("266518");
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    this.LevelStart(0)
                }
            });
            Event.addLocalListener("CGS_Level3",()=>{
                this.LevelStart(1)
            })
        }
    }



    //玩法入口函数
    private LevelStart(GameType:number):void{
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType)
        globalManager.setLevelId(3)

        Event.dispatchToLocal("Level3Init")

        //传送玩家到玩法3位置
        let levelpos = GameObject.findGameObjectByName("Level3Start").worldTransform.position;

        //进入玩法三后,禁用玩法三BGM
        setTimeout(() => {
            SoundService.stopSound("140367");
        }, 77*1000);

        //进入玩法三后,播放玩法三BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 7*1000);

        for (let i = 0; i < allPlayersIds.length; i++) {

            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i],0)

            let player = Player.getPlayer(allPlayersIds[i]);
            
            player.character.worldTransform.position = new Vector(levelpos.x+MathUtil.randomFloat(-500.00,500.00),levelpos.y,levelpos.z);
            
            //player.character.worldTransform.rotation = new Rotation(0,0,-179)

            player.character.setStateEnabled(CharacterStateType.Running,false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running,true);
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                //显示受伤程度UI
                this.ShowHurtUI(player,globalManager.getLevelTime(3));
            }, 6*1000);

            this.InClientFun(player,globalManager.getLevelTime(3),globalManager.getLevelCount());
            
        }

        setTimeout(() => {
                Event.dispatchToLocal("initCountDown",globalManager.getLevelTime(3))
                this.Level3Fun();
        }, 6*1000);  
    }


    // 播放玩法3全局BGM
    private playGlobalBGM(): void {
        const bgmSoundAssetId = "140367";
            SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    
    // //斗牛高玩法玩家高亮特效
    // @RemoteFunction(Client)
    // private ShowPlayer(chara:Character,num:number):void{
    //     EffectService.playOnGameObject("12212",chara, {slotType: HumanoidSlotType.Root,duration:3000,loopCount:0})
    // }
    @RemoteFunction(Client)
    private ShowHurtUI(player:Player,num:number):void{

        this.selfEffect = EffectService.playOnGameObject("13403",player.character, {slotType: HumanoidSlotType.Root,loopCount:0})
    
        let ui = mw.createUI("L3UI/HurtUI", HurtUI)
        ui.uiWidgetBase.addToViewport(2)
        let myC = Camera.currentCamera;
        let Prot = player.character.worldTransform.rotation
        let Crot = myC.worldTransform.rotation
        let Srot = myC.springArm.worldTransform.rotation
        //player.character.worldTransform.rotation = new Rotation(0,0,179)
        //Camera.currentCamera.worldTransform.rotation = new Rotation(0,0,179)
        //Camera.currentCamera.springArm.worldTransform.rotation = new Rotation(0,0,179)
        player.character.movementDirection = MovementDirection.AxisDirection
        let L3C = GameObject.findGameObjectByName("L3摄像机") as Camera;
        Camera.switch(L3C)
        console.log("Pr ",Prot.x," ",Prot.y," ",Prot.z)
        console.log("Cr ",Crot.x," ",Crot.y," ",Crot.z)
        console.log("Sr ",Srot.x," ",Srot.y," ",Srot.z)
        
        setTimeout(() => {
            EffectService.stop(this.selfEffect)
            ui.destroy();
            Camera.switch(myC)
            // Camera.currentCamera.preset = CameraPreset.Default;
            // Camera.currentCamera.fov = 90;
            // Camera.currentCamera.springArm.length = 400;
            // Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
            // Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);

        }, num*1000);    
    }

    @RemoteFunction(Server)
    private async Level3Fun(): Promise<void> {
        //0-39s : 地板不动，牛频率少，一次出1-2个
        //40-79s :地板转动一般，牛频率中等，一次2-4个
        //80-119s :地板转动快，牛频率高，一次3-5个  
        let curTime = 0;
        let groundMover = await GameObject.asyncFindGameObjectById("2B1283DF") as IntegratedMover;
        let groundMoverObj = await GameObject.asyncFindGameObjectById("2B1283DF");
        groundMover.enable = false;
        groundMover.rotationSpeed = new Vector(0,0,0);
        //播放牛冲撞时音效
        function PlaySound():void {
            //console.log("播放牛冲撞时音效")
            SoundService.play3DSound("210087", groundMoverObj,1,1000,{radius:2000,falloffDistance:2000})
        }

        const timerId = TimeUtil.setInterval(() => {
            let CowList:Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
            this.shuffleArray(CowList);
            if(curTime >= 2 && curTime < 40){
                //4表示每隔4秒生成一波牛，该数值必须为整数
                if(curTime % 4 == 0){
                    PlaySound();
                    //生成3-5之间的随机数，每波生成3-5个牛
                    let randomNum = MathUtil.randomInt(1,4);
                    for(let i=0;i<randomNum;i++){
                        let ShootEvent = "L3_Shoot"+CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent)
                    }
                }


            }
            if(curTime >= 15 && curTime < 35){
                groundMover.enable = true;
                //Vector(0,0,10)中的10为地板自转速度，可调
                groundMover.rotationSpeed = new Vector(0,0,10);
                //3表示每隔3秒生成一波牛，该数值必须为整数
                if(curTime % 3 == 0){
                    PlaySound();
                    //生成4-6之间的随机数，每波生成4-6个牛
                    let randomNum = MathUtil.randomInt(2,6);
                    for(let i=0;i<randomNum;i++){
                        let ShootEvent = "L3_Shoot"+CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent)
                    }

                }

            }
            if(curTime >= 35 && curTime < 59){
                groundMover.enable = true;
                //Vector(0,0,20)中的10为地板自转速度，可调
                groundMover.rotationSpeed = new Vector(0,0,20);
                //2表示每隔2秒生成一波牛，该数值必须为整数
                if(curTime % 3 == 0){
                    PlaySound();
                    //生成5-7之间的随机数，每波生成5-7个牛
                    let randomNum = MathUtil.randomInt(4,8);
                    for(let i=0;i<randomNum;i++){
                        let ShootEvent = "L3_Shoot"+CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent)
                    }

                }
            }
            
            curTime += 1;
            if(curTime >= 59){
                TimeUtil.clearInterval(timerId);
                groundMover.enable = false;
                groundMover.rotationSpeed = new Vector(0,0,0);
            }
        }, 1); 
    }

    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            // 生成从0到i的随机索引
            const j = Math.floor(Math.random() * (i + 1));
            // 交换元素array[i]和array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    //客户端调用
    @RemoteFunction(Client)
    private InClientFun(player:Player,num:number,levelCoundId:number) : void{
        let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10); 
        loadui.ShowLevelUIById(levelCoundId)
        setTimeout(() => {
            loadui.destroy();
        }, 75*1000);

        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");

        let introui = mw.createUI("L3UI/L3_IntroUI",L3_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI",HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3*1000);
        setTimeout(()=>{
            SoundService.playSound("132944");
        },3*1000);

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