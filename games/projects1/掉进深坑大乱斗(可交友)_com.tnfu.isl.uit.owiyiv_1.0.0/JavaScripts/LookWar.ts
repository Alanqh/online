import LookWarUI from "./UI/LookWarUI";
import GlobalManager from "./GlobalManager";
@Component
export default class LookWar extends Script {

    //SC
    @Property({ replicated: true })
    LifePlayerList:Array<Player> = null;
    //C
    lookUI:LookWarUI = null;
    //C
    curLookPlayer:number = 0;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if(SystemUtil.isServer()){
            this.LifePlayerList = Player.getAllPlayers();
            Event.addLocalListener("Level5Init",()=>{
                this.ResetLifePlayerList()
            })
            Event.addLocalListener("Level4Init",()=>{
                this.ResetLifePlayerList()
            })
        }
        if(SystemUtil.isClient()){
            Event.addLocalListener("LookWarStart",()=>{
                this.lookUI = mw.createUI("LookWarUI",LookWarUI)
                this.lookUI.uiWidgetBase.addToViewport(10);
                this.lookUI.changeLookPlayer.onClicked.add(()=>{
                    this.curLookPlayer++;
                    if(this.curLookPlayer >= this.LifePlayerList.length){
                        this.curLookPlayer = 0;
                    }
                    this.ChangeLook();
                })
                this.curLookPlayer = 0;
                this.ChangeLook();
                Camera.currentCamera.springArm.localTransform.position = Vector.zero
            })
            Event.addLocalListener("LookWarEnd",()=>{
                if(this.lookUI){
                    this.lookUI.destroy();
                    this.lookUI = null;
                }
                Camera.currentCamera.parent = Player.localPlayer.character;
                Camera.currentCamera.preset = CameraPreset.Default
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            })
            Event.addServerListener("LookWarEnd",()=>{
                if(this.lookUI){
                    this.lookUI.destroy();
                    this.lookUI = null;
                }
                Camera.currentCamera.parent = Player.localPlayer.character;
                Camera.currentCamera.preset = CameraPreset.Default
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            })
        }
    }


    private ResetLifePlayerList():void{
        this.LifePlayerList = Player.getAllPlayers();
        this.LifePlayerList.forEach((player)=>{
            if(GlobalManager.getInstance().IsPlayerInDaTing(player.userId)){
                //在LifePlayerList中删除这个玩家
                this.LifePlayerList.splice(this.LifePlayerList.indexOf(player),1);
            }
        })
    }

    private ChangeLook():void{
        let curPlayer = this.LifePlayerList[this.curLookPlayer].character;
        Camera.currentCamera.parent = curPlayer;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}