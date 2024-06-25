import { GameAnim } from "../GameAni";
@Component
export default class Test extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            let randTime = 2;    
            TimeUtil.setInterval(()=>{
                const SelfPos = this.gameObject.parent.worldTransform.position;
                // 进行范围检测
                const goArray = QueryUtil.sphereOverlap(SelfPos, 500, false);
                // 遍历检测到的对象并输出对象名
                for (let go of goArray) {
                    console.log(go.name);
                    // if(go.tag == "point"){
                    //     //在检测到的物体上进行播放特效
                    //     EffectService.playAtPosition("27702",go.worldTransform.position);
                    // }
                    if(go instanceof Character){
                        //console.log(go.displayName);
                        if(this.gameObject.parent.getVisibility() == true){
                            //在检测到的物体上进行播放特效
                            EffectService.playAtPosition("27702",this.gameObject.parent.worldTransform.position);
            
                            let StartPos = this.gameObject.parent.localTransform.position;
                            let x = StartPos.x;
                            let y = StartPos.y;
                            let z = StartPos.z;
                            GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z),new Vector(x,y,z+5),50,()=>{
                                GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z+5),new Vector(x,y,z-5),100,()=>{
                                    GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z-5),new Vector(x,y,z),50,()=>{
                                        GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z),new Vector(x,y,z+5),50,()=>{
                                            GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z+5),new Vector(x,y,z-5),100,()=>{
                                                GameAnim.instance.localMoveGo(this.gameObject.parent,new Vector(x,y,z-5),new Vector(x,y,z),50,()=>{
                                                
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    }
                }
                randTime = MathUtil.randomFloat(0.5,1.5)
            },randTime)
        }
    }
    @RemoteFunction(Client)

    private Tx(player:Player):void{

        SoundService.playSound("99723", );

    }

}
