
import { GameConfig } from "../../../config/GameConfig";
import { IMonstersElement } from "../../../config/Monsters";
import { GlobalData } from "../../../const/GlobalData";
import { SoundManager } from "../../../utils/SoundManager";
import { utils } from "../../../utils/uitls";
import { SceneUnitPerformantFactory } from "../Tool/NPCTool";

const maxWalkFiledCount = 3;
@Component
export default class DayNpcShow extends mw.Script {


    /**模型Guid */
    @mw.Property({ replicated: true, multicast: true, onChanged: "changeModelState_C" })
    public modelGuid: string = "";
    /**类型表ID */
    @mw.Property({ replicated: true, multicast: true })
    public cfgID: number;


    private npc_S: mw.Character;
    /**寻路索引 */
    private moveIndex: number = 0;
    /**巡逻间隔 */
    private patrolInter: any;
    /**寻路间隔 */
    private walkTimeout: any;
    /**寻路失败次数 */
    private walkFailCount: number = 0;


    private lastLoc: mw.Vector;

    private _use: boolean = false;

    //#region ---------------Server----------------

    public get modelLocaction() {
        return this.npc_S ? this.npc_S.worldTransform.position : null
    }
    public get isUse(): boolean {
        return this._use;
    }

    /**npc回收时的位置 */
    public lastLocation() {
        return this.lastLoc;
    }


    public async init_S(id: number) {
        this.cfgID = id;
        this.openPatrol(true);
    }



    /**总开关 */
    public async openPatrol(isOpen: boolean) {

        this.moveIndex = 0;

        if (isOpen) {
            this._use = false;
            await this.getNpc();
            this.startPatrol();
            return;
        }
        this._use = true;
        this.clearPatrol();
        this.clearDanceTime();
        this.clearWolkTimeOut();
        this.clearChangeSmallTime();
        this.stopMove_S();
        this.recycleNpc();
    }

    private async getNpc() {

        this.npc_S = await SceneUnitPerformantFactory.get();

        this.npc_S.maxWalkSpeed = this.Cfg.WalkSpeed;
        this.modelGuid = this.npc_S.gameObjectId;

        this.npc_S.worldTransform.position = this.Cfg.BirthPosition;
        this.npc_S.setDescription([this.Cfg.DayDressAsset]);
    }

    public async recycleNpc() {
        if (!this.npc_S) return;
        this.stopMove_S();

        let ani: mw.Animation = null;
        this._use = true;

        return new Promise<void>((resolve) => {
            this.modelGuid = "1";
            setTimeout(() => {
                ani?.stop();
                SceneUnitPerformantFactory.giveBack(this.npc_S, () => { });
                this.npc_S = null;
                return resolve();
            }, 1 * 1000);
        })

    }


    /**开始巡逻 */
    private startPatrol() {
        this.startMove_S();
    }

    private clearPatrol() {
        if (this.patrolInter) {
            clearTimeout(this.patrolInter);
            this.patrolInter = null;
        }
    }


    /**寻路 */
    private startMove_S() {
        let loc = this.Cfg.PatrolPosArr[this.moveIndex];
        if (!loc) {
            loc = this.Cfg.PatrolPosArr[0];
        }
        if (!this.npc_S) return;
        Navigation.navigateTo(this.npc_S, loc, 60, () => {
            this.moveIndex++;
            if (this.moveIndex >= this.Cfg.PatrolPosArr.length) {
                this.moveIndex = 0;
            }
            this.walkFailCount = 0;
            this.startPatrol()
        }, () => {
            this.walkFailCount++;
            if (this.walkFailCount >= maxWalkFiledCount) {
                this.moveIndex = MathUtil.randomInt(0, this.Cfg.PatrolPosArr.length)
                this.walkFailCount = 0;
                if (this.npc_S)
                    this.npc_S.worldTransform.position = this.Cfg.PatrolPosArr[this.moveIndex];
            }
            if (this.walkTimeout) return;
            this.walkTimeout = setTimeout(() => {
                this.startPatrol();
                this.walkTimeout = null;
            }, 1000);
        });
    }
    /**停止寻路 */
    private stopMove_S() {
        if (this.npc_S)
            Navigation.stopNavigateTo(this.npc_S);
    }

    private clearWolkTimeOut() {
        if (this.walkTimeout) {
            clearTimeout(this.walkTimeout);
            this.walkTimeout = null;
        }
    }

    private danceTime: any = null;
    private danceAni: Animation = null;
    public dance_S(danceId: number) {
        if (!this.npc_S) return;
        this.clearDanceTime();
        this.stopMove_S();

        let info = GameConfig.NPCAnimation.getElement(danceId);
        utils.downloadAsset(info.Guid).then(() => {
            this.danceAni = utils.playAnimationLocally2(this.npc_S,
                info.Guid,
                info.Repeat ? 0 : 1,
                info.Time,
                info.slot
            );
        });
        this.danceTime = setTimeout(() => {
            this.clearDanceTime();
        }, GlobalData.NPC.npcDanceTime * 1000);
    }

    private changeSmallTime: any = null;
    public changeModel() {
        if (this.changeSmallTime) return;

        let bulletData = GameConfig.nBullet.getElement(1004);
        let modelGuid = bulletData.TarnsferID[MathUtil.randomInt(0, bulletData.TarnsferID.length - 1)];
        this.npc_S.description.base.wholeBody = modelGuid;

        this.changeSmallTime = setTimeout(() => {
            this.clearChangeSmallTime();
            this.npc_S.setDescription([this.Cfg.DayDressAsset]);
        }, GlobalData.Gun.fanRecoverTime * 1000);
    }

    private clearChangeSmallTime() {
        if (this.changeSmallTime) {
            clearTimeout(this.changeSmallTime);
            this.changeSmallTime = null;
        }
    }

    private clearDanceTime() {
        if (this.danceTime) {
            this.startMove_S();
            this.danceAni?.stop();
        }
    }

    //#endregion ---------------Server----------------


    public get Cfg(): IMonstersElement {
        return GameConfig.Monsters.getElement(this.cfgID);
    }


    //#region ---------------Client----------------


    private npc_C: mw.Character;
    private hideTimeOut: any;

    private async changeModelState_C(): Promise<void> {

        if (this.modelGuid && this.modelGuid != "1") {
            await this.createModel();


        } else if (this.modelGuid == "1") {
            this.recycleModel_C();
        }
    }

    private async createModel() {
        if (!this.npc_C) {//Find NPC
            this.npc_C = await GameObject.asyncFindGameObjectById(this.modelGuid) as mw.Character;
            if (!this.npc_C) {
                await TimeUtil.delaySecond(0.2);
                this.createModel();
                return
            }
        }
        if (this.npc_C["isReady"] == false) {//判断是否准备好
            await TimeUtil.delaySecond(0.2);
            this.createModel();
            return
        }

        this.playeSounds();
        // this.npc_C.setDescription([this.Cfg.DayDressAsset]);
        try {
            // this.npc_C.syncDescription(false);
        } catch (error) {
        }
    }


    private recycleModel_C(): void {
        if (this.npc_C) {
            utils.playAnimation(this.npc_C, this.Cfg.ChangeDressAnima);
            this.clearHideTimeOut();
            this.stopSounds();
            this.npc_C = null;
        }
    }


    private clearHideTimeOut() {
        if (this.hideTimeOut) {
            clearTimeout(this.hideTimeOut);
            this.hideTimeOut = null;
        }
    }

    private update_C(dt: number) {
        if (!this.npc_C) return;

        this.updateSound(dt);
    }


    /**音效*/
    private sounds: Sound[] = [];

    /**音效计时*/
    private timers: number[] = [];

    /**音效间隔*/
    private invervaleTimers: number[] = [];

    /**音效id */
    private soundIds: number[] = [];


    /**玩家移动判断 */
    private updateSound(dt: number): void {
        for (let index = 0; index < this.timers.length; index++) {
            let element = this.timers[index];
            element += dt;
            this.timers[index] = element;
            if (this.invervaleTimers[index] && element >= this.invervaleTimers[index]) {
                this.timers[index] = 0;
                this.stopSound(index);
                this.playSound(index);
            }
        }
    }
    /**
    * 播放所有音效
    */
    private playeSounds() {
        this.stopSounds();
        for (let index = 0; index < GlobalData.NPC.walksoundsInverval.length; index++) {
            const element = GlobalData.NPC.walksoundsInverval[index];
            this.invervaleTimers.push(element);
            this.timers.push(0);
            this.playSound(index);
        }
    }

    /**
     * 停止所有声音
     */
    private stopSounds() {

        this.invervaleTimers = [];

        this.timers = [];

        this.sounds = []

        for (let index = 0; index < this.soundIds.length; index++) {
            const element = this.soundIds[index];
            SoundService.stop3DSound(element);
        }
        this.soundIds = [];
    }

    /**
      * 播放index音效
      * @param isEnter 
      */
    private async playSound(index: number) {
        const element = GlobalData.NPC.walksounds[index];
        let playId = await SoundManager.instance.play3DSound(element, this.npc_C);
        this.soundIds.push(playId);
        let sound = await SoundService.get3DSoundById(playId)
        this.sounds.push(sound);
    }

    /**
     * 停止index音效
     * @param soundId 
     */
    private stopSound(soundId: number) {
        let index = this.soundIds.findIndex((ele) => {
            return ele == soundId;
        })
        if (index != -1) {
            const element = this.soundIds[index];
            SoundService.stop3DSound(element);
            this.soundIds.splice(index, 1);
        }
    }


    //#endregion ---------------Client----------------

    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            this.useUpdate = true;
        }
    }
    protected onUpdate(dt: number): void {

        this.update_C(dt);

    }

}