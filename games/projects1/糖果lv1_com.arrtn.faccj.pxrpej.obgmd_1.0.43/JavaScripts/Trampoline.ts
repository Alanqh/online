import { GameConfig } from "./config/GameConfig";
import { MGSGame } from "./mgs/MGSGame";
import { ModifiedCameraSystem } from './Modified027Editor/ModifiedCamera';
import { PlayerManagerExtesion } from './Modified027Editor/ModifiedPlayer';
import { GeneralManager } from './Modified027Editor/ModifiedStaticAPI';
import { Singleton } from "./tool/Singleton";

@Component
export default class Trampoline extends mw.Script {


    @mw.Property({ displayName: "世界ui", capture: true })
    uiWidgetGuid: string = "";

    @mw.Property({ displayName: "篮球框触发器", capture: true })
    hoopTriggerGuid: string = "";


    uiWidget: UIWidget;
    hoopTrigger: Trigger;
    trigger: Trigger;
    scoreText: mw.TextBlock;
    score: number = 0;
    tempVec: Vector = new Vector()
    character: Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            AssetUtil.asyncDownloadAsset("145501")
            this.hoopTrigger = GameObject.findGameObjectById(this.hoopTriggerGuid) as Trigger;
            this.uiWidget = GameObject.findGameObjectById(this.uiWidgetGuid) as UIWidget;
            if (!this.uiWidget) {
                console.error("_________________TypeError,终点场景没实装配置", this.uiWidgetGuid)
                return;
            }
            this.scoreText = this.uiWidget.getTargetUIWidget().findChildByPath("RootCanvas/score") as mw.TextBlock;
            this.scoreText.text = this.score.toString();
            this.trigger = this.gameObject as Trigger;
            setTimeout(() => {
                (this.uiWidget.getTargetUIWidget().findChildByPath("RootCanvas/TextBlock") as mw.TextBlock).text = GameConfig.Language.UI_LAN_280.Value;
            }, 1000);
            Player.asyncGetLocalPlayer().then(player => {
                this.character = player.character;
                this.trigger.onEnter.add((cha) => {

                    if (cha instanceof Character && cha.getVisibility() && cha == this.character) {
                        if (!cha['isTransfer']) {
                            cha['isTransfer'] = true;
                            cha['inHoop'] = true;
                            this.move(cha, this.trigger.worldTransform.position, this.hoopTrigger.worldTransform.position)
                            Singleton.getIns(MGSGame).areaEnter(1);
                        }
                    }
                })
                this.hoopTrigger.onEnter.add((cha) => {
                    if (cha instanceof mw.Pawn && cha.getVisibility() && cha == this.character && cha['inHoop']) {
                        this.score++;
                        cha['inHoop'] = false;
                        this.scoreText.text = this.score.toString();
                        GeneralManager.rpcPlayEffectAtLocation("145501", this.hoopTrigger.worldTransform.position, 1);
                        SoundService.play3DSound("124716", this.hoopTrigger.worldTransform.position, 1, 1, { radius: 400, falloffDistance: 600 });
                    }
                })
            })

        }
    }

    move(cha: Character, start: Vector, end: Vector) {
        let animation
        if (PlayerManagerExtesion.isCharacter(cha)) {
            animation = PlayerManagerExtesion.loadAnimationExtesion(cha, "122290", true);
        } else {
            animation = PlayerManagerExtesion.loadAnimationExtesion(cha, "122290", false);
        }
        animation.loop = 0;
        const startPos = { x: start.x, y: start.y, z: start.z };
        const endPos = { x: end.x, y: end.y, z: end.z };
        const midlePos = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2, z: (start.z + end.z) / 2 + 1000 }
        new mw.Tween(startPos).to({ x: [midlePos.x, endPos.x], y: [midlePos.y, endPos.y], z: [midlePos.z, endPos.z] }, 1800).interpolation(TweenUtil.Interpolation.Bezier).onUpdate((v) => {
        }).onStart(() => {
            if (PlayerManagerExtesion.isCharacter(cha)) {
                Camera.currentCamera.rotationLagEnabled = true;
                Vector.subtract(end, start, this.tempVec);
                this.tempVec.z = 0;
                cha.worldTransform.rotation = this.tempVec.toRotation();
                ModifiedCameraSystem.setOverrideCameraRotation(cha.worldTransform.getForwardVector().toRotation());
                setTimeout(() => {
                    ModifiedCameraSystem.resetOverrideCameraRotation();
                }, 100);
            }
            animation.play();
            cha.movementEnabled = false;
            cha.switchToFlying();
        }).onUpdate((pos) => {
            cha.worldTransform.position = this.tempVec.set(pos.x, pos.y, pos.z);
        }).onComplete(() => {
            cha.movementEnabled = true;
            cha.switchToWalking();
            const worldRotation = cha.worldTransform.rotation
            worldRotation.x = worldRotation.y = 0
            cha.worldTransform.rotation = worldRotation
            cha['isTransfer'] = false;
            if (PlayerManagerExtesion.isCharacter(cha)) {
                Camera.currentCamera.rotationLagEnabled = true;
            }
            animation.stop();

        }).start();
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