/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-15 18:05:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-18 09:36:02
 * @FilePath: \巴里监狱\JavaScripts\TriggerWind.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PlayerManagerExtesion } from "./Modified027Editor/ModifiedPlayer";

@Component
export default class TriggerWind extends Script {
    public isOpenWind = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
		// 获取当前脚本所挂载的触发器
		let Trigger = this.gameObject as Trigger
		// 对进入触发器事件进行绑定
		Trigger.onEnter.add(this.onTriggerEnter.bind(this));
		// 对离开触发器事件进行绑定
		Trigger.onLeave.add(this.onTriggerLeave.bind(this));
        this.useUpdate = true;
    }

    //有物体进入了触发区域,other 为进入触发区域的物体对象
    private async onTriggerEnter(other: GameObject) {
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            console.log('this.isOpenWind = true')
            this.isOpenWind = true
        }
    }

    //有物体离开了触发区域
    private onTriggerLeave(other: GameObject) {
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            this.isOpenWind = false
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if(this.isOpenWind){
            // Player.localPlayer.character.
            // let playerworldVector2 = new Vector2(Player.localPlayer.character.movementDirection,Player.localPlayer.character.worldTransform.getForwardVector().y)
            // let playerlocalVector2 = new Vector2(Player.localPlayer.character.localTransform.getForwardVector().x,Player.localPlayer.character.localTransform.getForwardVector().y)
            
            // let cameraVector2 = new Vector2(Camera.currentCamera.worldTransform.getForwardVector().x,Camera.currentCamera.worldTransform.getForwardVector().y) 
            // let WindVector2 = new Vector2(-0.5,0) 
            // // let redians = Vector2.angle(cameraVector2,WindVector2.normalize())
            // // console.log("redians",redians)
            // let finalVector2 = cameraVector2.subtract(WindVector2)
            // let finalVector2 = new Vector2
            // Vector2.rotate(WindVector2,redians,finalVector2)
            // console.log("finalVector2",finalVector2.toString())
            // finalVector2 = finalVector2.multiply(0.1)
            let myCamera = Camera.currentCamera;
            let dir = new Rotation(0,0,180).subtract(myCamera.worldTransform.rotation)
            let finalVector2 = dir.getForce().multiply(0.2)
                // myCharacter.addMovement(dir.getForce());
            Player.localPlayer.character.addMovement(new Vector(finalVector2.x,finalVector2.y,0))
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}