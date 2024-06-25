import CheckPointTrigger from "./CheckPointTrigger"
import GameUI from "./UI/GameUI" 
import { PrefabEvent } from "./prefabEvent/PrefabEvent"

/**
 * 关卡管理器
 */
export class LevelManager{
    // 单例模式
    private static _instacne:LevelManager
    public static get instance():LevelManager{
        if(LevelManager._instacne==null){
            LevelManager._instacne = new LevelManager()
        }
        return LevelManager._instacne
    }

    /**死亡触发器 */
    private _deathTrigger:Trigger

    public lastPointNumber: number = 0

    /**复活位置 */
    private _rebornPosition:Vector = new Vector(-176.49,574.14,148.00)

    /**所有的检查点脚本 */
    public checkPointMap:Map<number,CheckPointTrigger> = new Map()

    public async init(){
        this._deathTrigger =  await GameObject.asyncFindGameObjectById("2E40236E") as Trigger
        this._deathTrigger.onEnter.add((other:GameObject)=>{
            // 当进入的物体是角色类型
            if(other instanceof Character){
                // 让角色死亡
                this.charDeath(other)
            }
        })


        Event.addLocalListener("CheckPoint",(checkPointTrigger:CheckPointTrigger)=>{
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone()
            this.lastPointNumber = checkPointTrigger.pointNumber
        })

        setTimeout(() => { 
            UIService.show(GameUI,this.checkPointMap.size,0)     
        }, 2000); 
    }

    /**让角色死亡 */
    public charDeath(char:Character){
        // 开启布娃娃属性
        char.ragdollEnabled = true
        // 播放特效
        EffectService.playAtPosition("27421",char.worldTransform.position)
        // 播放音效
        SoundService.playSound("120841")
        setTimeout(() => {
            // 让角色复活
            if(char == Player.localPlayer.character){
                let playerid = char.gameObjectId;
                PrefabEvent.PrefabEvtFight.revive(playerid)
            }
            this.charReborn(char)
        }, 3000);

        if(char==Player.localPlayer.character){
            Event.dispatchToLocal("Death")
        }
    }

    /**让角色复活 */
    private charReborn(char:Character){
        if(char == Player.localPlayer.character){
            // 将角色的位置改变到复活点
            char.worldTransform.position = this._rebornPosition.clone()
        }

        // 关闭布娃娃属性
        char.ragdollEnabled = false
    }

    public jumpToPoint(pointNumber: number = this.lastPointNumber+1) {
        // 实现跳转 
        let checkPoint = this.checkPointMap.get(pointNumber)
        if (checkPoint) {
            Player.localPlayer.character.worldTransform.position = checkPoint.gameObject.worldTransform.position.clone()
        }
    }
}