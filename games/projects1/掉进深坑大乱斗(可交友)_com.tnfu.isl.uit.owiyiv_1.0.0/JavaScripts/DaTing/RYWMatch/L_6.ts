import GlobalManager from "../../GlobalManager";
import HotTimeUI from "../../UI/HotTimeUI";
import L6_IntroUI from "../../UI/L6UI/L6_IntroUI";
import L6_ShootUI from "../../UI/L6UI/L6_ShootUI";
import MyClearGuns from "../../L6/L6_MyClearGuns";
import LevelLoadUI from "../../UI/LevelLoadUI";
@Component
export default class L_6 extends Script {

    //客户端变量
    shootUI:L6_ShootUI;
    targetObj:GameObject = null;
    dtick:number = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法六bgm资源
            AssetUtil.asyncDownloadAsset("162450");
            
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((chara: GameObject) => {
                if(chara instanceof Character){
                    this.LevelStart(0)
                }
            });

            Event.addLocalListener("CGS_Level6",()=>{
                this.LevelStart(1)
            })
        }
    }


    //玩法入口函数
    private LevelStart(GameType:number):void{
        
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType)
        globalManager.setLevelId(6)

        //传送玩家到玩6位置
        let levelpos = GameObject.findGameObjectByName("Level6Start").worldTransform.position;

        //进入玩法六后,禁用玩法六BGM
        setTimeout(() => {
            SoundService.stopSound("162450");
        }, 66*1000);

        //进入玩法六后,播放玩法六BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 7*1000);

        for (let i = 0; i < allPlayersIds.length; i++) {

            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i],0)

            let player = Player.getPlayer(allPlayersIds[i]);
            
            player.character.worldTransform.position = new Vector(levelpos.x+MathUtil.randomFloat(-500.00,500.00),levelpos.y,levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);

            player.character.worldTransform.rotation = new Rotation(0,0,-90)

            player.character.movementEnabled = false;
            setTimeout(() => {
                player.character.movementEnabled = true;
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                Event.dispatchToLocal("Level6Init")
                let gunInstance = MyClearGuns.instance;
                MyClearGuns.ServerGiveRandomGun(player)
                this.ChangeCamera(player,1,globalManager.getLevelTime(6))
            }, 6*1000);

            this.InClientFun(player,globalManager.getLevelTime(6),globalManager.getLevelCount());
            
        }

        setTimeout(() => {
                Event.dispatchToLocal("initCountDown",globalManager.getLevelTime(6))
                this.Level6Fun();
        }, 6*1000);
    }


    // 播放玩法6全局BGM
    private playGlobalBGM(): void {
        const bgmSoundAssetId = "162450";
            SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    @RemoteFunction(Server)
    private async Level6Fun(): Promise<void> {
    }

    //客户端调用
    @RemoteFunction(Client)
    private InClientFun(player:Player,num:number,levelCoundId:number) : void{
        let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10); 
        loadui.ShowLevelUIById(levelCoundId)
        setTimeout(() => {
            loadui.destroy();
        }, 64*1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");

        let introui = mw.createUI("L6UI/L6_IntroUI",L6_IntroUI);
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

    @RemoteFunction(Client)
    private ChangeCamera(play:Player,type:number,time:number) {
        if(type == 1){
            this.useUpdate = true;
            Camera.currentCamera.preset = CameraPreset.TPSOverShoulderAngle
            if(this.shootUI != null){
                this.shootUI.destroy();
                this.shootUI = null;
            }
            //初始化射击UI
            this.shootUI = mw.createUI("L6UI/L6_ShootUI",L6_ShootUI)
            this.shootUI.uiWidgetBase.addToViewport(10);
            this.shootUI.bullets.text="30";
            this.shootUI.score.text="0";
            //射击按钮绑定
            this.shootUI.shootButton.onClicked.add(()=>{
                MyClearGuns.ClientStartShoot();
            })
            //监听子弹数量变化
            MyClearGuns.onClientOneShootComplete.push((curAmmo, preAmmo) => {
                console.log("射击后，当前弹药:", curAmmo);
                this.shootUI.bullets.text=curAmmo.toString();
                if(curAmmo == 0){
                    MyClearGuns.ServerDelGun(Player.localPlayer)
                    this.ChangeCamera(Player.localPlayer,3,time)
                }
            })
            //监听倒计时结束
            setTimeout(() => {
                this.useUpdate = false;
                MyClearGuns.ServerDelGun(Player.localPlayer)
                Camera.currentCamera.preset = CameraPreset.Default
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
                this.shootUI.destroy();
                this.shootUI = null;
            }, time*1000);

            Event.addServerListener("L6_Hurt",(totalScore:number)=>{
                this.shootUI.score.text = totalScore.toString();
            })

        }
        if(type == 3){
            this.useUpdate = false;
            Camera.currentCamera.preset = CameraPreset.Default
            Camera.currentCamera.fov = 90;
            Camera.currentCamera.springArm.length = 400;
            Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
            Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            //this.shootUI.destroy();
            //this.shootUI = null;
        }
    }

    protected onUpdate(dt: number): void {
        if(SystemUtil.isClient()){
            this.dtick = this.dtick + 1;
            let p = Player.localPlayer;
            let dirction = Camera.currentCamera.worldTransform.getForwardVector();
            let start = p.character.worldTransform.position.clone().add(Vector.multiply(dirction, 30)).clone().add(new Vector(0, 0, 30));
            let end = Camera.currentCamera.worldTransform.position.add(Camera.currentCamera.worldTransform.getForwardVector().multiply(5000));
            const hits = QueryUtil.lineTrace(Camera.currentCamera.worldTransform.position, end, true, false, [], false, true, p.character);
            let dir = end.subtract(start);
            if (hits.length > 1) {
                dir = hits[1].impactPoint.subtract(start);
                if(hits[1].gameObject.name.includes("地狱龙") || hits[1].gameObject.name.includes("宠物")){
                    this.targetObj = hits[1].gameObject;
                }
                else{
                    this.targetObj = null;
                }
            }
            InputUtil.onTouchMove((index: number, location: Vector2, touchType: TouchInputType) => {
                console.error(`===>onTouchMove: ${index}, ${location}, ${touchType}`);
                this.targetObj = null;
            });

            if(this.dtick % 5 == 0){
                this.targetObj = null;
            }

            if(this.targetObj){
                if(this.targetObj.getVisibility() == false) this.targetObj = null;
                if(this.targetObj){
                    let P2Gdir = this.targetObj.worldTransform.position.subtract(Camera.currentCamera.worldTransform.position);
                    let selfRot = Camera.currentCamera.worldTransform.rotation;
                    let TarRot = P2Gdir.toRotation();
                    let targetPos = this.targetObj.worldTransform.position
                    Camera.currentCamera.lookAt(new Vector(targetPos.x,targetPos.y,targetPos.z+50))
                }
            }
        }
    }


}