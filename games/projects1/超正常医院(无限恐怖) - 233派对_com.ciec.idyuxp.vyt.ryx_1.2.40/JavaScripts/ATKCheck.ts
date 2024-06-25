
@Component
export default class ATKCheck extends Script {
    npc: mw.Character;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (SystemUtil.isServer()) {

            let players: mw.Player = null;
            Event.addClientListener("Player", (player) => {
                players = player;
                console.warn(`lwj shoudao ${players}`);
            })

            setTimeout(async () => {
                let inter = await GameObjPool.asyncSpawn("Interactor", mwext.GameObjPoolSourceType.Asset) as mw.Interactor;
                inter.worldTransform.position = new Vector(-4000, -151, 199)
                console.warn(`lwj S 交互`);
                inter.onEnter.add(() => {
                    console.warn(`lwj S 交互成功`);
                })
                inter.enter(players.character);
            }, 7666);
            return;
        }

        Event.dispatchToServer("Player");

        this.npc = await mw.GameObject.asyncFindGameObjectById("0B1B84C1") as mw.Character;
        InputUtil.onKeyDown(mw.Keys.F2, async () => {

        });

    }

    /**以玩家视野方向，做夹角为60度的扇形检测npc */
    private checkNpcByAngle(npc: mw.Character): void {
        if (!this.npc) return;

        const distance = 1000;
        const angle = 60;

        let player = Player.localPlayer.character;
        let npcTrans = npc.worldTransform;

        let dis = Vector.distance(player.worldTransform.position, npcTrans.position);
        let norVec = npc.worldTransform.getForwardVector().normalize().multiply(500);

        // let pos = player.getSlotWorldPosition(mw.HumanoidSlotType.Eyes);
        // let end = Vector.add(pos.clone(), norVec);
        // QueryUtil.lineTrace(pos, end, false, true);

        let temVec = Vector.subtract(player.worldTransform.position, npcTrans.position).multiply(500);
        let angle2 = Vector.angle(norVec, temVec);

        if (dis < distance && angle2 <= angle) {
            console.warn(`lwj 在视野范围内`);
        }


        console.warn(`lwj 检查视野  angle:${angle2.toFixed(2)}`);
        // QueryUtil.lineTrace(player.worldTransform.position, temVec, false, true);
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