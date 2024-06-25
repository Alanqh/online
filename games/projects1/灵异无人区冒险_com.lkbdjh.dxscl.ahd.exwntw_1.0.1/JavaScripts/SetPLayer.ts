import { PlayerManagerExtesion } from "./Modified027Editor/ModifiedPlayer";
import { PrefabEvent } from "./prefabEvent/PrefabEvent";

@Component
export default class SetPLayer extends Script {
	private character: Character;
	@mw.Property({ displayName: "玩家属性" })
	public PlayerAttr: string[] = ["Jump","Speed"];
	@mw.Property({ displayName: "数值" })
	public Value: number[] = [200,1000]
	
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let Trigger = this.gameObject as Trigger
		// 对进入触发器事件进行绑定 
		Trigger.onEnter.add((other: GameObject)=>{
            if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
                const Guid = Player.localPlayer.character.gameObjectId
                if (PrefabEvent.AttrType[this.PlayerAttr[0]]) {PrefabEvent.PrefabEvtAttr.setAttrVal(Guid, Guid,this.Value[0],PrefabEvent.AttrType[this.PlayerAttr[0]])}
                if (PrefabEvent.AttrType[this.PlayerAttr[1]]) {PrefabEvent.PrefabEvtAttr.setAttrVal(Guid, Guid,this.Value[1],PrefabEvent.AttrType[this.PlayerAttr[1]])}
            }
        });
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