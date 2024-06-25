import { cubicBezier } from "./utils/uitls";

@Component
export default class Npc extends Script {


    private eyeAni: mw.Tween<{ X: number; }> = null;
    atkEff: mw.Effect;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        if (SystemUtil.isServer()) return;

        this.useUpdate = true;

        let char = this.gameObject as Character;

        let eff = await Effect.asyncSpawn<Effect>("a");

        InputUtil.onKeyDown(mw.Keys.F1, async () => {
            let slot = char.description.advance.slotAndDecoration.slot[12].decoration;
            if (!slot) return;
            let obj = slot[0].attachmentGameObject;
            if (!obj) return;
            let eye = (obj.getChildByName("球体"));
            this.eyeAnimation(eye);
            this.npcRotationAni(char);
            this.useUpdate = true;

            this.atkEff = await Effect.asyncSpawn<Effect>("160764");
            this.atkEff.play()
            this.atkEff.parent = eye;
            this.atkEff.localTransform.position = new Vector(0, 0, 0);
            this.atkEff.localTransform.rotation = new Rotation(0, 99, 0);
            // this.eyeAnimation(eye);
            Player.localPlayer.character.worldTransform.position = new Vector(-366, 85, 100)
        });

        InputUtil.onKeyDown(mw.Keys.F2, () => {
            let pos = eff.localTransform.rotation.clone();
            pos.z -= 5;
            eff.localTransform.rotation = pos;
            console.warn(`lwj pso ${eff.localTransform.rotation}`);
        });
        InputUtil.onKeyDown(mw.Keys.F3, () => {
            let pos = eff.localTransform.rotation.clone();
            pos.y += 5;
            eff.localTransform.rotation = pos;
            console.warn(`lwj pso ${eff.localTransform.rotation}`);
        });
        InputUtil.onKeyDown(mw.Keys.F4, () => {
            let pos = eff.localTransform.rotation.clone();
            pos.x += 5;
            eff.localTransform.rotation = pos;
            console.warn(`lwj pso ${eff.localTransform.rotation}`);
        });


    }

    /**眼球转动动画 */
    private eyeAnimation(obj: GameObject): void {

        let rota = obj.localTransform.rotation;
        let eyeAni_1 = new mw.Tween({ X: 0 }).to({ X: 30 }, 2000)
            .onUpdate((data) => {
                rota.x = data.X;

                obj.localTransform.rotation = rota;
            }).yoyo(true).repeat(1).easing(cubicBezier(0.45, 0, 0.55, 1));

        let eyeAni_2 = new mw.Tween({ X: 0 }).to({ X: -30 }, 2000)
            .onUpdate((data) => {
                rota.x = data.X;
                obj.localTransform.rotation = rota;
            }).yoyo(true).repeat(1).easing(cubicBezier(0.45, 0, 0.55, 1));

        let eyeAni_3 = new mw.Tween({ Z: 0, }).to({ Z: 180, }, 2000)
            .onUpdate((data) => {
                rota.z = data.Z;
                obj.localTransform.rotation = rota;
            }).yoyo(true).repeat(1).easing(cubicBezier(0.16, 1, 0.3, 1));


        eyeAni_1.chain(eyeAni_2);
        eyeAni_2.chain(eyeAni_3);
        eyeAni_3.chain(eyeAni_1);
        eyeAni_1.start();

    }
    /**NPC自己转圈 */
    private npcRotationAni(npc: Character): void {
        let rota = npc.worldTransform.rotation;
        let npcAni = new mw.Tween({ Z: rota.z }).to({ Z: 360 }, 10000)
            .onUpdate((data) => {
                rota.z = data.Z;
                npc.worldTransform.rotation = rota;
            }).repeat(Infinity).easing(cubicBezier(0.45, 0, 0.55, 1));

        npcAni.start();
    }


    private time: number = 0;

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

        this.time += dt;
        if (this.time < 2) return;
        this.time = 0;

        if (this.atkEff) {
            //检测冲击波是否碰到玩家
            let startPos = this.atkEff.worldTransform.position.add(this.atkEff.worldTransform.getForwardVector().multiply(100));

            let endPos = startPos.clone().add(this.atkEff.worldTransform.getForwardVector().multiply(800))
            let hitArr = QueryUtil.boxTrace(startPos, endPos, new Vector(50, 50, 50), new Rotation(0, 0, 0), true, true,
                [this.gameObject.gameObjectId, this.atkEff.gameObjectId]);

            if (hitArr.length > 0) {
                hitArr.forEach((hit) => {
                    if (hit.gameObject instanceof mw.Character) {
                        console.warn(`lwj hit Char`);
                    }
                });
            }
        }
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}
