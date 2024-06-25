 /**

- player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
- character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。
- const：用于声明一个常量，一旦赋值后就不能再被修改。常量在声明时必须进行初始化赋值，且不能再次赋值。适合用于那些不需要改变数值的情况。
- let：用于声明一个变量，可以被重新赋值。变量在声明时可以不进行初始化赋值，之后可以重新赋值。适合用于那些需要变化数值的情况
 */


import { GameAnim } from "../GameAni";
@Component

export default class floorFall extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        
        //this.gameObject.destroy();
        if(SystemUtil.isServer()){

            this.gameObject.parent.localTransform.scale = this.gameObject.parent.localTransform.scale.multiply(new Vector(0.9,0.9,0.9));
            this.gameObject.localTransform.scale = this.gameObject.localTransform.scale.multiply(new Vector(0.9,0.9,0.9));

            Event.addLocalListener("Level4Init",()=>{
                console.log("L4重置方块");
                let trigger = this.gameObject as Trigger;
                trigger.enabled = true;
                this.Init();
                this.gameObject.parent.setVisibility(PropertyStatus.On);
                (this.gameObject.parent as Model).setCollision(CollisionStatus.On);
            })

            // this.gameObject.localTransform.position = new Vector(0,0,57)

            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((other)=>{
                // console.log("被触发")
                if(other instanceof Character){
                    this.CameraOn(other.player)
                    // 1.5秒后隐藏显示方块
                    console.log("进入触发器")
                    setTimeout(() => {
                        this.gameObject.parent.setVisibility(PropertyStatus.Off);
                        (this.gameObject.parent as Model).setCollision(CollisionStatus.Off)
                    }, 1500);

                    setTimeout(() => {this.Shake()}, 0);
                    setTimeout(() => {this.Shake()}, 500);
                    setTimeout(() => {this.Shake()}, 1000);
                }
            })
            trigger.onLeave.add((other)=>{
                if(other instanceof Character){
                    this.CameraOff(other.player)
                }
            })

        }

        if(SystemUtil.isClient()){
            AssetUtil.asyncDownloadAsset("27702");
            let trigger = this.gameObject as Trigger;
            let liewen = trigger.parent as GameObject;

            trigger.onEnter.add((other) => {
                if(other instanceof Character){
                    console.log(TimeUtil.elapsedTime());
                    this.MulticastFun(other,liewen);
                }  
            });
        }
    }


    //开启摄像机高度固定
    @RemoteFunction(Client)
    private CameraOn(player:Player):void{
        Camera.currentCamera.fixedElevation = true;
    }

    //关闭摄像机高度固定
    @RemoteFunction(Client)
    private CameraOff(player:Player):void{
        Camera.currentCamera.fixedElevation = false;
    }


    @RemoteFunction(Client,Multicast)
    private Init():void{
        let trigger = this.gameObject as Trigger;
        trigger.enabled = true;
    }

    @RemoteFunction(Client,Multicast)
    //根据传入的GameObject参数来处理角色相关的逻辑
    public MulticastFun(_other: Character, liewen: any): void {
        // 在静态物体上触发特效
        EffectService.playOnGameObject("27702",liewen);
        // 1.5秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("27702", liewen);
        }, 1500);
    }

    //400ms
    private Shake():void{
        let StartPos = this.gameObject.parent.localTransform.position;
        let x = StartPos.x;
        let y = StartPos.y;
        let z = StartPos.z;
        let Flu = 10;
        GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z),new Vector(x,y,z+Flu),50,()=>{
            GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z+Flu),new Vector(x,y,z-Flu),100,()=>{
                GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z-Flu),new Vector(x,y,z),50,()=>{
                    GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z),new Vector(x,y,z+Flu),50,()=>{
                        GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z+Flu),new Vector(x,y,z-Flu),100,()=>{
                            GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z-Flu),new Vector(x,y,z),50,()=>{
                            
                            })
                        })
                    })
                })
            })
        })
    }
}
