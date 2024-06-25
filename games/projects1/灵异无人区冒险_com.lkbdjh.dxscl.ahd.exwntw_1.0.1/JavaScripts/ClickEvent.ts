
/** 
 * AUTHOR: 玩味
 * TIME: 2023.11.10-13.53.37
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import DefaultUI from "./DefaultUI";
import { PlayerManagerExtesion } from "./Modified027Editor/ModifiedPlayer";
import { PrefabEvent } from "./prefabEvent/PrefabEvent";
import dakai_Generate from "./ui-generate/dakai_generate";

let _Key: number = 0;
let _Anim: number = 0;
let _level: number = 1;
export default class ClickEvent extends dakai_Generate {
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
        if (SystemUtil.isServer()) {
            return
        }
		//设置能否每帧触发onUpdate
		this.canUpdate = true;
		this.layer = UILayerMiddle;

        this.mButton_anniu.onPressed.add(()=>{
			console.log('_level = ' + _level)
			this.updateLevel(_level)
			switch(_level){
				case 1:
					if (_Key != _level){
						const obj7 = GameObject.findGameObjectById("15832995");
						obj7.setVisibility(false);
						PrefabEvent.PrefabEvtNotify.notifyLocal("拾取了钥匙！");
						_Key = _level;
						DefaultUI.changeicon(0,true)
					}
					break;
				case 2:
					if(_Key == 1){
						const obj8 = GameObject.findGameObjectById("2A48D1A5");
						obj8.localTransform.position = new Vector(-44583.773438,-1316.780029,2617.969971)
						DefaultUI.changeicon(0,false)
					}else{
						PrefabEvent.PrefabEvtNotify.notifyLocal("需要钥匙开门！");
					}
					break;
				}
		})
		setTimeout(()=>{
		const keyuse = GameObject.findGameObjectById("05F3214C") as Trigger; 
		keyuse.onEnter.add(()=>{
			if(_Key == 1){
				const obj8 = GameObject.findGameObjectById("2A48D1A5");
				obj8.localTransform.position = new Vector(-44583.773438,-1316.780029,2617.969971)
				DefaultUI.changeicon(0,false)
			}else{
				PrefabEvent.PrefabEvtNotify.notifyLocal("需要钥匙开门！");
			}
		})
		const diearea1 = GameObject.findGameObjectById("17092570") as Trigger; 
		diearea1.onEnter.add(()=>{
			setTimeout(() => {
				let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
				PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(Player.localPlayer.character.gameObjectId, stage);
				PrefabEvent.PrefabEvtNotify.notifyLocal("走错了！");
			}, 1000);
		})
		const diearea2 = GameObject.findGameObjectById("3B047158") as Trigger;
		diearea2.onEnter.add(()=>{
			setTimeout(() => {
				let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
				PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(Player.localPlayer.character.gameObjectId, stage);
				PrefabEvent.PrefabEvtNotify.notifyLocal("走错了！");
			}, 1000);
		})
		const finish = GameObject.findGameObjectById("2E8BD3D1") as Trigger;
		finish.onEnter.add(()=>{
			PrefabEvent.PrefabEvtNotify.notifyLocal("恭喜通关！！来终点打卡展示一下自己吧！");
		})
		},5000)
	}

    public updateLevel(level: number) {
        _level = level;
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
	protected onUpdate(dt :number) {
		TweenUtil.TWEEN.update();
	}

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
