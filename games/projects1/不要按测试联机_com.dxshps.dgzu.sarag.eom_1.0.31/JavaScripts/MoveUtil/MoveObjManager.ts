import MoveObj from "./MoveObj";


export default class MoveObjManager{
    /**单例类 */
    private static _instance: MoveObjManager = null;
    public static get instance(): MoveObjManager {
        if (!this._instance) {
            this._instance = new MoveObjManager();
    }
        return this._instance;
    }
    private moveObjMap: Map<string, MoveObj> = new Map<string, MoveObj>();
    /**参数太多了，返回子物体然后自己操作吧 */
    public addMoveObj(obj: GameObject){
        let moveObj = new MoveObj(obj);
        this.moveObjMap.set(obj.gameObjectId, moveObj);
        return moveObj
    }

    public stopMove(obj: GameObject){
        let moveObj = this.moveObjMap.get(obj.gameObjectId);
        if (moveObj) {
            moveObj.stopObj();
        }
    }

    public resumeObj(obj: GameObject){
        let moveObj = this.moveObjMap.get(obj.gameObjectId);
        if (moveObj) {
            moveObj.resumeObj();
        }
    }

    public deleteMove(obj: GameObject){
        let moveObj = this.moveObjMap.get(obj.gameObjectId);
        if (moveObj) {
            moveObj.stopObj();
            this.moveObjMap.delete(obj.gameObjectId);
        }
        
    }

    public destroy(){
        this.moveObjMap.forEach((value, index)=>{
            value.stopObj();
        })
        this.moveObjMap.clear();
    }
    
    public update(dt: number){
        this.moveObjMap.forEach((value)=>{
            value.update(dt);
        })
    }

}