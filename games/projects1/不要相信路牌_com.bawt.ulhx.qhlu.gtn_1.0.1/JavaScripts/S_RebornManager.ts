import S_DontTrustTrigger from "./S_DontTrustTrigger";
import S_NextTrigger from "./S_NextTrigger";
import { PrefabEvent } from "./prefabEvent/PrefabEvent";

export class S_RebornManager {
    _rebornPosition: Vector = new Vector(0, 0, 140)
    private static _instance: S_RebornManager
    public static get instance(): S_RebornManager {
        if (S_RebornManager._instance == null) {
            S_RebornManager._instance = new S_RebornManager()
        }
        return S_RebornManager._instance
    }
    private _deathTrigger: Trigger

    public lastPointNumber: number = 0

    public checkPointMap: Map<number, S_NextTrigger> = new Map()

    public async init() {
        this._deathTrigger = await GameObject.asyncFindGameObjectById("120E35DB") as Trigger
        this._deathTrigger.onEnter.add((other: GameObject) => {
            if (other instanceof Character) {
                let char = other as Character
                if(char == Player .localPlayer.character)
                     char.worldTransform.position = this._rebornPosition.clone()
                 
                
            }
        })
        Event.addLocalListener("CheckPoint2",(checkPointTrigger:S_NextTrigger)=>{
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone()
            this.lastPointNumber = checkPointTrigger.pointNumber
        })
        Event.addLocalListener("CheckPoint1", (checkPointTrigger: S_DontTrustTrigger) => {
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone()
            this.lastPointNumber = checkPointTrigger.pointNumber
        })
        
    }

    public charDeath(char:Character){
        // 开启布娃娃属性
        //char.ragdollEnabled = true
        this.charReborn(char)
       
        
    }

    public charReborn(char: Character) {
        char.worldTransform.position = this._rebornPosition.clone()
    }

    public jumpToPoint(pointNumber: number = this.lastPointNumber+1) {
        // 实现跳转 
        let checkPoint = this.checkPointMap.get(pointNumber)
        if (checkPoint) {
            Player.localPlayer.character.worldTransform.position = checkPoint.gameObject.worldTransform.position.clone()
        }
    }
}