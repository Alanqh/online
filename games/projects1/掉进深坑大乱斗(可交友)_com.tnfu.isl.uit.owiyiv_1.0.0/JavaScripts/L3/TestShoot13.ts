@Component
export default class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    protected onStart(): void {
        if(SystemUtil.isServer()){
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot13",()=>{
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }

    @RemoteFunction(Server)
    public ShootFun():void{
        let integratedMover = this.gameObject as IntegratedMover;
        EffectService.playAtPosition("31645",this.gameObject.worldTransform.position,{scale:new Vector(3,3,3),duration:0.75})
        setTimeout(()=>{
            integratedMover.enable=true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(()=>{
                integratedMover.enable=false;
                integratedMover.moverReset();
            },moveTime*900);
        },750);
    }
}
