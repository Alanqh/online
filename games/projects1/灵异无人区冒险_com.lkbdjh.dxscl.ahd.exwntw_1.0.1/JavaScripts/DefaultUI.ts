import { CheckUI } from "./CheckUI";
import { IAACore } from "./IAACore";
import { Tools } from "./Tools";
import { PrefabEvent } from "./prefabEvent/PrefabEvent";

@UIBind('')
export default class DefaultUI extends UIScript {
	private character: Character;
	private anim1 = null;
	time:number = 0;
	playtime:StaleButton;
	static _key:Canvas[] = [];

	/** 仅在游戏时间对非模板实例调用一次 */
    protected  onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = true;

		//找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as Button
		const attackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack') as Button
        const adjump = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton_1') as StaleButton
		const revive = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton') as StaleButton
		this.playtime = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton_2') as StaleButton
		DefaultUI._key[0] = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas') as Canvas
		DefaultUI._key[1] = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1') as Canvas
		//点击跳跃按钮,异步获取人物后执行跳跃
        jumpBtn.onPressed.add(()=>{
			if (this.character) {
				this.character.jump();
			} else {
				Player.asyncGetLocalPlayer().then((player) => {
					this.character = player.character;
					//角色执行跳跃功能
					this.character.jump();
				});
			}
		})	
		

		//点击攻击按钮,异步获取人物后执行攻击动作
		attackBtn.onPressed.add(()=>{
			Player.asyncGetLocalPlayer().then((player) => {
				this.character = player.character;
				AssetUtil.asyncDownloadAsset("61245").then((res : boolean) => {
					if (res) {
						if (!this.anim1) {
							this.anim1= player.character.loadAnimation("61245");
							this.anim1.slot = AnimSlot.Upper;
						}
						//角色执行攻击动作
						if(this.anim1.isPlaying){
							return
						}else{
							this.anim1.play();
						}
					}
				})
			});
		})  

		adjump.onPressed.add(()=>{
			Player.asyncGetLocalPlayer().then((player) => {
				this.character = player.character;
				CheckUI.showUI('跳过此关', '观看广告即可跳过此关', '确认', '取消', (res: boolean) => {
					if (res) {
						IAACore.playAds((res: boolean) => {
							if (res) {
								let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(this.character.gameObjectId);
								console.log('stage = ',stage)
								stage = stage+1>26?26:stage+1
								PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.character.gameObjectId, stage);
							}
						})
					}
				})
			});
		})	

		revive.onPressed.add(()=>{
			Player.asyncGetLocalPlayer().then((player) => {
				this.character = player.character;
				CheckUI.showUI('脱离卡死', '点击确认回到复活点', '确认', '取消', (res: boolean) => {
					if (res) {
						let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(this.character.gameObjectId);
						PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.character.gameObjectId, stage);
					}
				})
			});
		})	
    }

	public static changeicon(index: number,isshow: boolean) {
		if (this._key[index]){
			if (isshow){
				this._key[index].visibility = SlateVisibility.Visible
			}else{
				this._key[index].visibility = SlateVisibility.Collapsed
			}
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
	protected onUpdate(dt :number) {
		this.time += dt;
		this.playtime.text = "当前游玩时间："+ Tools.changeSecond2Minus2(this.time)
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
	//protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
	//	return EventReply.unHandled; //EventReply.handled
	//}

	/**
	 * 手指或则鼠标再UI界面上移动时
	 */
	//protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
	//	return EventReply.unHandled; //EventReply.handled
	//}

	/**
	 * 手指或则鼠标离开UI界面时
	 */
	//protected OnTouchEnded(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
	//	return EventReply.unHandled; //EventReply.handled
	//}

	/**
	 * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
	 * 可以触发一次拖拽事件的开始生成
	 * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
	 */
	//protected onDragDetected(InGemotry :Geometry,InPointerEvent:PointerEvent):DragDropOperation {
	//	return this.newDragDrop(null);
	//}

	/**
	 * 拖拽操作生成事件触发后经过这个UI时触发
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDragOver(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后在这个UI释放完成时
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDrop(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后进入这个UI时触发
	 */
	//protected onDragEnter(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后离开这个UI时触发
	 */
	//protected onDragLeave(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
	//}
	
	/**
	 * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
	 */
	//protected onDragCancelled(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
	//}

}
