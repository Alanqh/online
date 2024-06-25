
import { SceneUnitModuleS } from "./SceneUnitModuleS";
import BagModuleC from "../Bag/BagModuleC";
import UITools from "../../utils/UI/UITools";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../utils/uitls";
import { P_Reset } from "../GameHud/UI/P_Reset";
import { P_GlobalTips } from "../../utils/UI/P_GlobalTips";
import { GameConfig } from "../../config/GameConfig";
import PropModuleC from "../Prop/PropModuleC";

const aniGuids: string[] = ["29772", "108425", "157423", "47766"];
const bornPosArr: mw.Vector[] = [new Vector(4870, -3110, 100), new Vector(5000, -3110, 100), new Vector(5222, -2442, 100),
new Vector(4810, -2377, 100), new Vector(4839, -3690, 88), new Vector(5800, -3110, 100), new Vector(6270, -2659, 100),
new Vector(5890, -2505, 100), new Vector(6180, -4585, 100), new Vector(5400, -2505, 100), new Vector(5550, -2200, 100),
new Vector(5634, -4512, 100), new Vector(5160, -4512, 100), new Vector(4860, -4512, 100), new Vector(5759, -5249, 100),
new Vector(5466, -2050, 100), new Vector(4747, -2377, 100), new Vector(4689, -3690, 88)];

export class SceneUnitModuleC extends ModuleC<SceneUnitModuleS, null> {

    private bagMC: BagModuleC = null;

    async onStart() {

        this.bagMC = ModuleService.getModule(BagModuleC);

        InputUtil.onKeyDown(mw.Keys.F2, async () => {
            console.warn(`lwj move ${this.localPlayer.character.movementEnabled}`);
        });

    }


    protected async onEnterScene(sceneType: number): Promise<void> {

        setTimeout(() => {
            this.setNpcPos("2598CBC7", new Vector(2728, 135, -415));
            this.setNpcPos("22CFA9CE", new Vector(2861, 1521, -410));
        }, 20000);
        this.getSceneUnitName();
        this.playNpcStance();
        this.createTrigger();
        this.net_resetPos(false);
    }

    /**
     * 设置NPC位置
     * @param guid 设置NPCguid
     */
    private setNpcPos(guid: string, pos: Vector) {
        GameObject.asyncFindGameObjectById(guid).then((npc) => {
            try {
                let npc2 = npc as mw.Character;

                npc2.worldTransform.position = pos;
                npc2.displayName = "";

                npc2.setCollision(CollisionStatus.Off);
            } catch (error) {
                console.error(`npc ${npc.name} 设置位置失败`);
            }
        });
    }

    /**
     * 获取场景中的NPC 隐藏名字
     */
    private getSceneUnitName() {

        GlobalData.NPC.npcGuidArr.forEach(async (value) => {
            try {
                let npc = await mw.GameObject.asyncFindGameObjectById(value) as mw.Character;
                npc.complexMovementEnabled = false;
                npc.displayName = "";
            } catch (error) {
            }
        })
    }

    /**
     * 播放姿态
     */
    private playNpcStance() {

        GlobalData.NPC.npcModelGuids.forEach(async (value, index) => {
            try {
                let npc = await mw.GameObject.asyncFindGameObjectById(value) as mw.Character;

                let asset = aniGuids[index % 4];
                utils.downloadAsset(asset).then(() => {
                    let ani = npc.loadAnimation(asset)
                    ani.play();
                    setTimeout(() => {
                        ani?.pause();
                    }, 2888);
                });
            } catch (error) {
            }
            await TimeUtil.delaySecond(0.2);
        })
    }

    /**玩家攻击怪 */
    public playerAttackSceneUnit(sceneid: number) {
        // 攻击怪的道具Id
        let targetPropId = 1001
        if (sceneid == 0) return;
        let key = this.bagMC.getPropKeyById(targetPropId);
        // 没有攻击道具
        if (key == -1) {
            UITools.ShowSoftTips(utils.getLanguageByKey("Tips_06"));
            return;
        }
        ModuleService.getModule(PropModuleC).useProp(targetPropId, key);

        this.server.net_hitSceneUnit(sceneid);
    }

    /**玩家变怪后攻击 */
    public playerAttackByMonster() {
        this.server.net_playerAtkPlayer();
    }


    /**解救床上的玩家 */
    public rescuePlayer(playerId: number) {

    }

    net_resetPos(ishowUI: boolean) {
        if (ishowUI)
            UIService.getUI(P_Reset).showAni();

        this.localPlayer.character.collisionWithOtherCharacterEnabled = false;
        let loc = bornPosArr[MathUtil.randomInt(0, bornPosArr.length)];
        if (!loc) loc = bornPosArr[0]
        this.localPlayer.character.worldTransform.position = utils.randomLoc(loc, 100);

        setTimeout(() => {
            this.localPlayer.character.collisionWithOtherCharacterEnabled = true;
            let t_CurCharac = Player.localPlayer.character;
            t_CurCharac.worldTransform.scale = new mw.Vector(1, 1, 1);
            t_CurCharac.worldTransform.rotation = new Rotation(0, 0, 0)
        }, 1500 + MathUtil.randomInt(0, 1000));

    }

    net_Help(name: string) {
        if (!name || name == "") {
            console.warn(`lwj net_Help name is null`);
            return;
        }
        let str = utils.Format(GameConfig.Language.Text_Action_Name_14.Value, name);
        UIService.getUI(P_GlobalTips).showTips(str);
    }

    net_stopAni(playerId: number) {
        let char = Player.getPlayer(playerId)?.character;
        if (char)
            utils.stopAnimation(char);
    }

    private createTrigger() {
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });

        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
        GameObjPool.asyncSpawn("Trigger", mwext.GameObjPoolSourceType.Asset).then((trigger) => {
            GameObjPool.despawn(trigger);
        });
    }

}