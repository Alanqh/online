
import { GameConfig } from "../../config/GameConfig";
import { InWeaponElement } from "../../config/nWeapon";
import { GlobalData } from "../../const/GlobalData";
import { EffectManager } from "../../utils/EffectManager";
import { utils } from "../../utils/uitls";
import { MonsterChangeS } from "../ChangeMonster/MonsterChangeS";
import { SceneUnitModuleS } from "../SceneUnitModule/SceneUnitModuleS";
import { WeaponModuleC } from "./WeaponModuleC";

export class WeaponModuleS extends ModuleS<WeaponModuleC, null> {

    private weapons: Map<number, WeaponServer> = new Map<number, WeaponServer>();

    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.destoryWeapon(player);
        } catch (error) {
        }
    }

    /**设置武器 */
    @Decorator.noReply()
    public async net_setWeapon(weaponGuid: string, weapCfgId: number, danceID: number) {
        if (this.weapons.has(this.currentPlayer.playerId)) {
            return this.weapons.get(this.currentPlayer.playerId).updateDanceId(danceID);
        }
        const weapon = new WeaponServer(this.currentPlayer, weaponGuid, weapCfgId, danceID);
        this.weapons.set(this.currentPlayer.playerId, weapon);
    }

    /**设置舞蹈 */
    @Decorator.noReply()
    public async net_setDanceId(danceId: number) {
        let weapon = this.weapons.get(this.currentPlayer.playerId);
        if (!weapon) return;
        weapon.updateDanceId(danceId);
    }

    /**开始射击 */
    @Decorator.noReply()
    public net_startFire(): void {
        let weapon = this.weapons.get(this.currentPlayer.playerId);
        if (!weapon) return;
        weapon.startFire();
    }

    /**停止射击 */
    @Decorator.noReply()
    public net_stopFire(): void {
        let weapon = this.weapons.get(this.currentPlayer.playerId);
        if (!weapon) return;
        weapon.stopFire();
    }

    /**射击回调 */
    @Decorator.noReply()
    public net_onFire(dir: mw.Vector, dis: number) {
        let weapon = this.weapons.get(this.currentPlayer.playerId);
        if (!weapon) {
            console.warn(`lwj 未找到武器信息`);
            return;
        }
        this.playFire(weapon.getWeaponInfo(), dir, dis);
    }


    /**击中物体 */
    @Decorator.noReply()
    public async net_hitObject(ammoId: number, hitLoc: mw.Vector, hitAll: string[], danceId: number) {
        let isPlayEffect = false;

        hitAll.forEach(guid => {
            const obj = GameObject.findGameObjectById(guid);
            if (!obj) return;
            if (obj instanceof mw.Pawn) {

                if (isPlayEffect) return;
                //播放特效
                let danceArr = danceId == 0 ? [19] : [25, 26]
                this.getAllClient().net_playEffectOnGameObject(danceArr, guid);

                if (ammoId == 1004) {
                    //变身
                    this.change(guid);
                } else {
                    //减速 跳舞
                    this.slowDance(this.currentPlayerId, guid, danceId)
                }
                isPlayEffect = true;

            } else {
                if (isPlayEffect) return;
                // this.isAttackSmallEye(this.currentPlayerId, guid, danceId);
                isPlayEffect = true;
            }
        })
        if (!isPlayEffect) {
            EffectManager.instance.playEffectOnPos(18, hitLoc);
        }
    }

    /**减速 跳舞 */
    private slowDance(atkerId: number, guid: string, danceId: number) {
        if (GlobalData.NPC.npcModelGuids.includes(guid)) return;

        let unitMS = ModuleService.getModule(SceneUnitModuleS);

        //跳舞
        unitMS.npcDance(atkerId, guid, danceId);
        //变身玩家 dance
        if (!utils.isNight()) return;
        ModuleService.getModule(MonsterChangeS).attackMonster(guid, danceId);

    }

    /**变身 */
    private change(guid: string) {
        console.warn(`lwj 变身0 ${guid}`);
        if (GlobalData.NPC.npcModelGuids.includes(guid)) return;

        //npc变身
        let unitMS = ModuleService.getModule(SceneUnitModuleS);
        unitMS.changeModel(guid);
        //变身玩家
        if (!utils.isNight()) return;
        ModuleService.getModule(MonsterChangeS).changeModel(guid);
    }

    // /**是否攻击到小眼怪 */
    // private isAttackSmallEye(atkerId: number, objGuid: string, danceId: number) {
    //     let isHas = Dream_Eye.smallEyeGuids.includes(objGuid);
    //     if (!isHas) return;

    //     ModuleService.getModule(SceneUnitModuleS).attackSmallEye(atkerId, objGuid);
    // }


    @Decorator.noReply()
    public net_destroyWeapon() {
        this.destoryWeapon(this.currentPlayer);
    }

    /**销毁武器 */
    private async destoryWeapon(player: mw.Player) {
        let playerId = player.playerId;
        let weapon = this.weapons.get(playerId);
        if (weapon) {
            // weapon?.destroy();
        }
        this.weapons.delete(playerId);
    }

    /**销毁弹药 同步到服务端再同步到其他客户端 */
    @Decorator.noReply()
    public async net_destroyAmmo(ammoId: number) {
        this.getAllClient().net_destroyAmmo(ammoId);
    }

    /**播放开火音效特效 */
    public playFire(data: { weaInfo: InWeaponElement, weapon: mw.GameObject, ownerId: number, danceId: number, guid: string }, dir: mw.Vector, dis: number): void {
        // if (!data.weapon || !data.weapon.gameObjectId) {
        //     console.warn(`lwj error 未找到武器guid`);
        //     return;
        // }
        this.getAllClient().net_playFire(data.guid, data.weaInfo.ID, data.ownerId, data.danceId, getUniqueId(data.ownerId), dir, dis);
    }

}

class WeaponServer {

    private playerId: number = 0;
    private weaInfo: InWeaponElement = null;
    private weapon: mw.GameObject = null;
    private curSoundId: number = 0;
    private danceId: number = 0;

    guid: string = null;

    constructor(player: mw.Player, weaGuid: string, weaponId: number, danceId: number = 0) {
        this.playerId = player.playerId;
        this.guid = weaGuid;
        this.danceId = danceId;
        this.weaInfo = GameConfig.nWeapon.getElement(weaponId);
        GameObject.asyncFindGameObjectById(weaGuid).then((weapon) => {
            console.warn(`lwj S wuqi ${weapon}`);
            this.weapon = weapon;
        });
    }

    public updateDanceId(danceID: number) {
        this.danceId = danceID;
    }


    public startFire(): void {
        this.curSoundId = SoundService.play3DSound(this.weaInfo.fireSoundId, this.weapon, 30, this.weaInfo.fireSoundVom);
    }
    public stopFire(): void {
        if (this.curSoundId) SoundService.stop3DSound(this.curSoundId);
    }

    /**获取当前武器模型guid */
    public get weaponGuid(): string {
        return this.weapon?.gameObjectId;
    }

    /**获取当前武器模型和数据 */
    public getWeaponInfo(): { weaInfo: InWeaponElement, weapon: mw.GameObject, ownerId: number, danceId: number, guid: string } {
        return { weaInfo: this.weaInfo, weapon: this.weapon, ownerId: this.playerId, danceId: this.danceId, guid: this.guid };
    }

    /**销毁武器 */
    public destroy(): void {
        if (this.weapon) {
            this.weapon.destroy();
            this.weapon = null;
        }

    }

}

/**生成绝对不重复的唯一id */
function getUniqueId(id: number): number {
    return Math.floor(Math.random() * 1000000000) + id;
}