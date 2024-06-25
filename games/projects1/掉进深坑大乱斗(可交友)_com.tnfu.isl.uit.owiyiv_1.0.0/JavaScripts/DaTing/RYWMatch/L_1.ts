import GlobalManager from "../../GlobalManager";
import HotTimeUI from "../../UI/HotTimeUI";
import L1_IntroUI from "../../UI/L1UI/L1_IntroUI";
import LevelLoadUI from "../../UI/LevelLoadUI";
@Component
export default class L_1 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.useUpdate = true

        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {

            //异步下载玩法一bgm资源
            AssetUtil.asyncDownloadAsset("99390");

            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    this.LevelStart(0)
                }
            });

            Event.addLocalListener("CGS_Level1",()=>{
                this.LevelStart(1)
            })
        }
    }

    //玩法入口函数
    private LevelStart(GameType:number):void{
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType)
        globalManager.setLevelId(1)

        Event.dispatchToLocal("Level1Init")

        //传送玩家到玩法1位置
        let levelpos = new Vector(37448.54,-10799.90,2099.00)

        //进入玩法一后,禁用玩法一BGM
        setTimeout(() => {
            SoundService.stopSound("99390");
        }, 59*1000);

        //进入玩法一后,播放玩法一BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 9*1000);

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

            this.AttachModel(player,globalManager.getLevelTime(1)+8);
            this.InClientFun(player,globalManager.getLevelTime(1),globalManager.getLevelCount())
        }

        setTimeout(() => {
            Event.dispatchToLocal("initCountDown",globalManager.getLevelTime(1))
        }, 8*1000);
    }

    // 播放玩法1全局BGM
    private playGlobalBGM(): void {
        const bgmSoundAssetId = "99390";
            SoundService.playBGM(bgmSoundAssetId, 0.6);
    }


    //添加挂载木桶模型
    @RemoteFunction(Client,Multicast)
    private async AttachModel(player:Player,num:number) : Promise<void>{

        let chara = player.character;
        chara.meshPositionOffset = new Vector(0, 0, 90)
        await chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.add("49905", new Transform(new Vector(10, 70, -240),new Rotation(-90,0,0),new Vector(2, 2, 2)));
        
        //chara.attachToSlot(MuTong, HumanoidSlotType.Root)

        let Obj:GameObject;
        let timerId;
        //延时获取Obj
        setTimeout(() => {
            Obj = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
            console.log("rotation")
            timerId = TimeUtil.setInterval(() => {
                let x = Math.abs(chara.velocity.x)
                let y = Math.abs(chara.velocity.y)
                let result = Math.max(x, y)
    
                // 计算旋转速度
                let value = 360 * 1 * (30 / 1000) * (Math.PI / 180) * (result / chara.maxWalkSpeed)
    
                // 四元数进行转向
                let quater1 = Quaternion.fromRotation(Obj.localTransform.rotation)
                let quater2 = Quaternion.rotateAround(quater1, Vector.left, value)
                Obj.localTransform.rotation = quater2.toRotation()
            }, 0.01);
        }, 1000);
        
        chara.jumpEnabled = false;

        setTimeout(() => {
            TimeUtil.clearInterval(timerId);
            chara.jumpEnabled = true;
            let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
            if(ring) {
                chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
                chara.meshPositionOffset = new Vector(0, 0, 0)
            }
        }, num*1000);
    }

    //客户端调用
    @RemoteFunction(Client)
    private InClientFun(player:Player,num:number,levelCoundId:number) : void{
        let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10); 
        loadui.ShowLevelUIById(levelCoundId)
        setTimeout(() => {
            loadui.destroy();
        }, 56*1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");

        let introui = mw.createUI("L1UI/L1_IntroUI",L1_IntroUI);
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

    
