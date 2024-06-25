import { GlobalData } from "../../const/GlobalData";
import { SceneUnitPerformantFactory } from "../SceneUnitModule/Tool/NPCTool";
enum EState {
    /**无 */
    None,
    /**正常待机*/
    Idle,
    run
}
@Component
export default class NPCFollow extends Script {

    private curPlayerId: number = null;
    private npc: Character = null;
    private curPlayer: Player = null;
    private _npcFlyAnimation: Animation = null;
    private _npcStandyAnimation: Animation = null;

    private curState: EState = EState.None;
    private static dfaultState: EState = null;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this.useUpdate = true;
        }
    }

    protected onUpdate(dt: number): void {
        this.followcurPlayerUpdate(dt);
    }

    protected onDestroy(): void {
        this.useUpdate = false;
        SceneUnitPerformantFactory.giveBack(this.npc, () => {
            this.npc = null;
        });
    }

    init(curPlayer: Player, id: number) {
        this.curPlayer = curPlayer;
        if (!this.curPlayer) {
            console.warn(`lwj dddd`);
            return;
        }
        SceneUnitPerformantFactory.get().then((npc) => {

            this.npc = npc;
            console.warn(`lwj 跟随成功`);
            this.changeNPCCloth(id);
            npc.collisionWithOtherCharacterEnabled = false;
            npc.changeState(CharacterStateType.Flying);

            this.npcFlyAnimation.play()
            console.warn(`lwj npc ${this.npcFlyAnimation.isPlaying}`);
        });

    }
    public changeNPCCloth(id: number) {
        let guid = GlobalData.FollowNPC.npcGuidByIdMap.get(id);
        if (!guid) {
            console.warn(`lwj typee 没有 派蒙 id=${id}`);
            return;
        }
        this.npc.setDescription([guid]);
        this.npc.worldTransform.position = this.curPlayer.character.worldTransform.position;
    }

    stop() {
        this.useUpdate = false;
    }

    private get npcFlyAnimation(): Animation {
        if (this._npcFlyAnimation == null) {
            this._npcFlyAnimation = this.npc.loadAnimation(GlobalData.FollowNPC.runAnim)
            this._npcFlyAnimation.speed = 1;
            this._npcFlyAnimation.loop = 0;
        }
        return this._npcFlyAnimation;
    }

    private get npcStandyAnimation(): Animation {
        if (this._npcStandyAnimation == null) {
            this._npcStandyAnimation = this.npc.loadAnimation(GlobalData.FollowNPC.idleAnim);//待机
            this._npcStandyAnimation.speed = 1;
            this._npcStandyAnimation.loop = 0;
        }
        return this._npcStandyAnimation;
    }



    private move() {
        // Navigation.follow(this.npc, this.char, 30, () => { }, () => {
        //     //失败
        //     console.warn(`lwj 跟随失败`);
        //     this.npc.worldTransform.position = this.char.worldTransform.position;
        // });
    }



    /**
       * NPC跟随玩家
       */
    private followcurPlayerUpdate(dt: number): void {

        if (!this.curPlayer || !this.npc) {
            return;
        }

        let tran = this.npc.worldTransform;
        if (tran == null) {
            return;
        }
        if (tran.position == null) {
            return;
        }
        let startPos = tran.position;
        let transform = this.curPlayer.character.worldTransform;
        let endPos = transform.transformPosition(GlobalData.FollowNPC.guideNpcFollowOffset);


        if (this.curPlayer.character.velocity.length > 0) {

            NPCFollow.dfaultState = EState.run;
            if (NPCFollow.dfaultState == EState.run && this.curState != EState.run) {
                this.stopAllAnimation();
                console.warn(`lwj 飞行`);
                this.npcFlyAnimation.play();
                this.curState = EState.run;
            }
        } else {

            NPCFollow.dfaultState = EState.Idle;
            if (NPCFollow.dfaultState == EState.Idle && this.curState != EState.Idle) {
                this.curState = EState.Idle;
                this.stopAllAnimation();
                console.warn(`lwj 待机`);
                this.npcStandyAnimation.play();
            }
        }

        if (mw.Vector.squaredDistance(startPos, endPos) <= 100) return;
        tran.rotation = transform.rotation.add(GlobalData.FollowNPC.guideNpcFollowOffrot);
        tran.position = mw.Vector.lerp(startPos, endPos, dt * 5, startPos);
        this.npc.worldTransform = tran;
    }


    private stopAllAnimation() {
        if (this.npcFlyAnimation && this.npcFlyAnimation.isPlaying) {
            this.npcFlyAnimation.stop();
        }
        if (this.npcStandyAnimation && this.npcStandyAnimation.isPlaying) {
            this.npcStandyAnimation.stop()
        }
    }


}