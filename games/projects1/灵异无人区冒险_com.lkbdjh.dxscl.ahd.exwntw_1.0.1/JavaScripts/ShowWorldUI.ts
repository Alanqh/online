import { PlayerManagerExtesion } from "./Modified027Editor/ModifiedPlayer";

/** 
 * AUTHOR: 玩味
 * TIME: 2023.11.10-10.39.08
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
@Component
export default class ShowWorldUI extends Script {

	@mw.Property({ displayName: "触发器ID" })
	public level: number = 1;
	@mw.Property({ displayName: "世界UI" })
	public worldUIGID: string = ''
	
	private worldUI:GameObject = null;

	protected onStart() {
        if (SystemUtil.isServer()) {
            return
        }
		this.worldUI = GameObject.findGameObjectById(this.worldUIGID)
		// setTimeout(() => {
		// 	this.worldUI.setVisibility(mw.PropertyStatus.Off)
		// }, 3000);
		// 获取当前脚本所挂载的触发器
		let Trigger = this.gameObject as Trigger
		// 对进入触发器事件进行绑定
		Trigger.onEnter.add(this.onTriggerEnter.bind(this));
		// 对离开触发器事件进行绑定
		Trigger.onLeave.add(this.onTriggerLeave.bind(this));
		// //通过上面复制的 guid 获取触发器对象
		// const trigger1 = GameObject.findGameObjectById("2FE63CA7") as Trigger;
		// //为触发器绑定 有物体进入时 会触发的监听事件
		// trigger1.onEnter.add(this.onTriggerEnter);
		// //为触发器绑定 有物体离开时 会触发的监听事件
		// trigger1.onLeave.add(this.onTriggerLeave);
		// await this.gameObject.asyncReady();
		// clearInterval(handle);

		// let trigger = this.gameObject as mw.Trigger;

		// trigger.onEnter.add((go: mw.GameObject) => {
		// 	if (PlayerManagerExtesion.isCharacter(go)) {

		// 		PrefabEvent.PrefabEvtFight.hurt(this.gameObject.gameObjectId, go.gameObjectId, this.damage);

		// 	}
		// })
	}
    //有物体进入了触发区域,other 为进入触发区域的物体对象
    private onTriggerEnter(other: GameObject) {
        if (SystemUtil.isServer()) {
            return
        }
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
			this.worldUI.setVisibility(mw.PropertyStatus.On)
			Event.dispatchToLocal('levelChange', this.level);
			// switch(this.level){
			// 	case 1:
			// 		worldUI = GameObject.findGameObjectById(this.worldUIGID)
			// 		worldUI.setVisibility(mw.PropertyStatus.On)
			// 		break;
			// 	case 1:
			// 		worldUI = GameObject.findGameObjectById("308CCBD1")
			// 		worldUI.setVisibility(mw.PropertyStatus.On)
			// 		break;

			// }
            // //是的话，转成角色类型
            // const character = other as Character;
            // //修改角色名称
            // character.displayName = "进入区域";
        }
    }

    //有物体离开了触发区域
    private onTriggerLeave(other: GameObject) {
        if (SystemUtil.isServer()) {
            return
        }
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
			this.worldUI.setVisibility(mw.PropertyStatus.Off)
			// switch(this.level){
			// 	case 1:
			// 		const worldUI = GameObject.findGameObjectById("308CCBD1")
			// 		worldUI.setVisibility(mw.PropertyStatus.Off)
			// 		break;

			// }
        }
    }
	/** 
	 * 构造UI文件成功后，onStart之后 
	 * 对于UI的根节点的添加操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onAdded() {
	}

	/** 
	 * 构造UI文件成功后，onAdded之后
	 * 对于UI的根节点的移除操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onRemoved() {
	}

	/** 
	* 构造UI文件成功后，UI对象再被销毁时调用 
	* 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
	*/
	protected onDestroy() {
	}

	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}

	/**
	 * 设置显示时触发
	 */
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

	/**
	 * 当这个UI界面是可以接收事件的时候
	 * 手指或则鼠标触发一次Touch时触发
	 * 返回事件是否处理了
	 * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
	 * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
	 */
	//protected onTouchStarted(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标再UI界面上移动时
	 */
	//protected onTouchMoved(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标离开UI界面时
	 */
	//protected onTouchEnded(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
	 * 可以触发一次拖拽事件的开始生成
	 * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
	 */
	//protected onDragDetected(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent):mw.DragDropOperation {
	//	return this.newDragDrop(null);
	//}

	/**
	 * 拖拽操作生成事件触发后经过这个UI时触发
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDragOver(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后在这个UI释放完成时
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDrop(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后进入这个UI时触发
	 */
	//protected onDragEnter(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后离开这个UI时触发
	 */
	//protected onDragLeave(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}
	
	/**
	 * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
	 */
	//protected onDragCancelled(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}
	
}
