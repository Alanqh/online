
enum PlayType {
	Loop = 1,
	PlayAndStop = 2,
}


@Component
export default class PlayAnim extends mw.Script {

	/**播放动作*/
	@mw.Property({ displayName: "播放动作时长" })
	private playAnimTime: number = 0;

	/**播放动作*/
	@mw.Property({ displayName: "播放动作" })
	private playAnim: string = "";

	/**播放类型 */
	@mw.Property({ displayName: "播放类型" })
	private playType: PlayType = PlayType.PlayAndStop;

	@mw.Property({ displayName: "上半身姿态" })
	private upperBodyPose = "";
	@mw.Property({ displayName: "下半身动画" })
	private lowerBodyAnim = "";

	@mw.Property()
	private preloadAssetsmw = "";


	private currentPlayer: mw.Player;

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (mw.SystemUtil.isServer()) return;
		this.gameObject.asyncReady().then(() => {
			(this.gameObject as mw.Character).displayName = "";
			(this.gameObject as mw.Character).complexMovementEnabled = false;
			if (this.playAnim != "") {
				let ani = (this.gameObject as mw.Character).loadAnimation(this.playAnim);
				ani.slot = mw.AnimSlot.FullyBody;
				ani.speed = this.playAnimTime === 0 ? 1 : this.getTwoNum(ani.length / this.playAnimTime);
				this.playAnimByType(this.playType, ani);
			}

			if (this.upperBodyPose != "") {
				let ani = (this.gameObject as mw.Character).loadSubStance(this.upperBodyPose);
				ani.play();
			}
			if (this.lowerBodyAnim != "") {
				let ani = (this.gameObject as mw.Character).loadAnimation(this.lowerBodyAnim);
				ani.slot = mw.AnimSlot.Lower;
				ani.speed = this.playAnimTime === 0 ? 1 : this.getTwoNum(ani.length / this.playAnimTime);
				this.playAnimByType(this.playType, ani);
			}


			Player.asyncGetLocalPlayer().then((player) => {
				this.currentPlayer = player;
				// this.equipGun();
			});
		})
	}

	/**保留该数字的两位小数 */
	private getTwoNum(num: number): number {
		return Math.round(num * 100) / 100;
	}



	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.useUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {

	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}

	playAnimByType(playType: PlayType, anim: Animation) {
		if (playType == PlayType.Loop) {
			anim.loop = 0;
			anim.play();
		} else if (playType == PlayType.PlayAndStop) {
			anim.loop = 1;
			anim.play();
			anim.onFinish.add(() => {
				anim.play();
			})
		}
	}

}
