@Component
export default class ConveyorBeltTS extends Script {

	// 用触发器确认进入进入的角色，建议使用数组
	player: mw.Character[]
	Trigger:mw.Trigger
	MoverValue:mw.Vector;
	protected onStart(): void {


		this.Trigger = this.gameObject as mw.Trigger
		this.player = [];
        
		this.Trigger.onEnter.add((go:mw.Character) => {
			if (go instanceof mw.Character &&!this.player.includes(go)) {
				this.player.push(go);
			}
		});
		this.Trigger.onLeave.add((go:mw.Character) => {
			if (go && this.player.includes(go)) {
				this.player.splice(this.player.indexOf(go), 1);
			}
		});
		this.MoverValue = this.Trigger.worldTransform.getForwardVector().normalize();
		console.log(`触发器正方向` + this.MoverValue);
		
		// 开启帧更新
		this.useUpdate = true;
	}

	protected onUpdate(dt: number): void {
		if (this.player && this.player.length > 0 && SystemUtil.isClient()) {
			this.player.forEach((go) =>{
				let location = go.worldTransform.position;
				// 添加距离需要用帧时间校准
				// location.x = location.x + dt*200;
				location = location.add((this.Trigger.worldTransform.getForwardVector().normalize()).multiply(dt*300));
				go.worldTransform.position = location;
			})
		}
	}
}
