import { GameConfig } from "../../../config/GameConfig";
import { GlobalData } from "../../../const/GlobalData";
import { EnumSceneUnitAnimationState, Sex } from "../../../const/enum";
import { PlayerManager } from "../../Player/PlayerManager";
import { PlayerModuleS } from "../../Player/PlayerModuleS";

interface AnimationInfo { guid: string; repeat: boolean; time: number, slot: number }

/**NPC动画 */
export class AnimationState {
    /**key: this.sceneID   value:Map key = EnumSceneUnitAnimationState  value:动画infor*/
    public static animMap: Map<number, Map<number, AnimationInfo[]>> = new Map<number, Map<number, AnimationInfo[]>>();

    public static addAnimInfo(id: number, value: number, animID: string, time: number, repeat: boolean, slot: number) {
        if (!this.animMap.has(id)) {
            let newMap = new Map<number, AnimationInfo[]>();
            this.animMap.set(id, newMap);
        }
        let map = this.animMap.get(id);
        let animInfo = { guid: animID, time: time, repeat: repeat, slot: slot };
        if (!map.has(value)) map.set(value, []);
        map.get(value).push(animInfo);
    }

    public static getAnimInfo(id: number, state: EnumSceneUnitAnimationState) {
        if (!this.animMap.has(id)) {
            console.error(" In getAnimInfo Map 里没有当前的ID = " + id);
            return null;
        }
        let animSecondMap = this.animMap.get(id);
        if (!animSecondMap.has(state)) {
            console.error(" In getAnimInfo Second Map 里没有当前的状态动作 = " + state);
            return null;
        }
        let anis = animSecondMap.get(state);
        if (anis.length > 1) {
            //随机一个
            let index = MathUtil.randomInt(0, anis.length);
            return anis[index];
        }
        return anis[0];
    }

}



/**NPC 模型 */
export class SceneUnitPerformantFactory {
    /**NPC性别 */
    private static readonly sex = '_sex';
    /**NPC是否正用 */
    private static readonly activeMark = '__isActive';
    private static pool: mw.Character[] = []

    static async init() {
        let cfgs = GameConfig.Monsters.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            const cfg = cfgs[i];
            let unit = await mw.GameObject.asyncFindGameObjectById(cfg.GUID) as mw.Character
            unit.displayName = '';
            unit.complexMovementEnabled = false;
            unit.changeState(CharacterStateType.Flying)
            unit.collisionWithOtherCharacterEnabled = false;
            this.pool.push(unit);
            GlobalData.NPC.raycastFilter.push(unit.gameObjectId);
        }
        GlobalData.NPC.npcGuids.forEach((guid) => {
            mw.GameObject.asyncFindGameObjectById(guid).then((obj) => {
                let unit = obj as mw.Character
                unit.displayName = '';
                unit.complexMovementEnabled = false;
                unit.collisionWithOtherCharacterEnabled = true;
                this.pool.push(unit as mw.Character);
                GlobalData.NPC.raycastFilter.push(unit.gameObjectId);
            });

        });
    }

    static async get(): Promise<mw.Character> {
        let result: mw.Character = null;
        for (const unit of this.pool) {
            if (!unit[this.activeMark]) {
                result = unit
                break
            }
        }
        if (!result) {
            console.warn(`lwje create新NPC  `);
            result = await mw.GameObject.asyncSpawn("Character") as mw.Character

            result.displayName = ''
            this.pool.push(result)
        }
        result[this.activeMark] = true;
        result.complexMovementEnabled = true;
        result.changeState(CharacterStateType.Running);
        result.collisionWithOtherCharacterEnabled = true;
        return result
    }

    static giveBack(unit: mw.Character, onDone: () => void,): mw.Character {

        // unit.clearDescription()
        unit[this.activeMark] = false;
        unit.worldTransform.position = GlobalData.NPC.npcRecyclePoint.clone();
        unit.complexMovementEnabled = false;
        unit.changeState(CharacterStateType.Flying)
        unit.collisionWithOtherCharacterEnabled = false;

        if (onDone) onDone();

        return unit;
    }
}


// 获取最近的玩家的距离平方根
export function getNearPlayerXY(npcID: number, center: mw.Vector,): mw.Player {
    let dis: number = null
    let p: mw.Player = null;
    let playerMD = ModuleService.getModule(PlayerModuleS)
    if (!center) return null;
    let players = playerMD.getAlivePlayer(npcID, center);

    for (let player of players) {
        // 判断距离
        let loc = PlayerManager.instance.getPlayerLoc(player.playerId);
        // 容错 可能为空
        if (loc == null) {
            console.warn(`lwj 玩家位置为空${player.playerId}`);
            continue;
        }
        let d = mw.Vector.squaredDistance(loc, center);
        if (d < dis || dis == null) {
            dis = d
            p = player
        }
    }
    return p;
}

/**
 * 以玩家视野方向，做夹角为60度的扇形检测玩家
 * @param npc npc
 * @param distance 距离
 */
export function checkNpcByAngle(model, distance: number): Player {
    if (!model.npc_S) return;

    const angle = GlobalData.NPC.checkAnagle / 2;

    let npcTrans = model.npc_S.worldTransform;
    let players = Player.getAllPlayers();


    let minDis: number = MathUtil.DBL_MAX;
    let minDisPlayer: Player = null;

    let playerMS = ModuleService.getModule(PlayerModuleS);

    players.forEach((player) => {
        //剔除安全状态的玩家
        if (!player || !player.character) return;

        let can = playerMS.canBeAttacked(model.unitCfg.ID, player.playerId);
        if (!can) return;

        //范围外的不计算
        let dis = Vector.squaredDistance(player.character.worldTransform.position, npcTrans.position);
        if (dis > Math.pow(distance, 2)) return;

        let norVec = model.npc_S.worldTransform.getForwardVector();

        let temVec = Vector.subtract(player.character.worldTransform.position, npcTrans.position);
        let angle2 = Vector.angle(norVec, temVec);

        //判断是否在视野范围内
        if (angle2 <= angle && minDis > dis) {
            //判断是否有障碍物
            let hitArr = QueryUtil.lineTrace(npcTrans.position, player.character.worldTransform.position, false, false,
                [player.character.gameObjectId], false, false, model.npc_S);

            let isReturn = false;
            hitArr.forEach((hit) => {
                if (isReturn) return;
                let isChara = hit instanceof Character
                if (!isChara)
                    isReturn = true;
            });
            if (isReturn) return;

            minDisPlayer = player;
            minDis = dis;
        }
    });
    return minDisPlayer;

}


