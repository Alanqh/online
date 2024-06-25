import { Const } from "../../../Defines";
import { EBuffType } from "../../../modules/buff/BuffDefine";
import { BuffModuleC } from "../../../modules/buff/BuffModule";
import { PlayerModuleC } from "../../../modules/player/PlayerModuleC";
import { CommonUtils } from "../../../utils/CommonUtils";
import { VectorUtils } from "../../../utils/VectorUtils";

export class FlyItem {
    private _movement: ProjectileMovement;

    private _ignoreIds: string[] = [];

    public callBack: () => void;

    public dmg: number = 0;

    public send(bindGo: GameObject, spd: number, dir: Vector, ignoreIds: string[]) {
        bindGo.setCollision(CollisionStatus.QueryOnly, true);
        this._movement = new ProjectileMovement(bindGo, {
            gravityScale: 0.05
        });

        this._movement.onProjectileHit.add((go: Character) => {
            if (this._ignoreIds.includes(go.gameObjectId)) {
                return;
            }
            if (go.tag && go.tag.includes("Ghost")) {
                return;
            }
            if (!(go instanceof Trigger)) {
                this._movement.destroy(false);
                this.callBack();
            }
            if (!CommonUtils.isSelfChar(go)) {
                return;
            }
            ModuleService.getModule(PlayerModuleC).changeHp(-this.dmg);
            ModuleService.getModule(BuffModuleC).addArchiveBuff(EBuffType.Poison);
        })
        this._ignoreIds = ignoreIds;
        this._movement.maxSpeed = spd;
        this._movement.initialSpeed = spd;
        this._movement.launch(dir);
    }
}

export class GhostFlyItemMgr {
    public static get instance(): GhostFlyItemMgr {
        return this._isntance || (this._isntance = new GhostFlyItemMgr());
    }
    private static _isntance: GhostFlyItemMgr;

    public async sendItem(effectGuid: string, spd: number, ignoreIds: string[], sender: Character, targetId: number, dmg: number) {
        const player = Player.getPlayer(targetId);
        if (!player) {
            return;
        }
        const char = player.character;
        let go = await GameObjPool.asyncSpawn(effectGuid, GameObjPoolSourceType.Prefab);
        go.getChildByName("sphere").localTransform.position = Vector.zero;
        const startpos = sender.getSlotWorldPosition(HumanoidSlotType.RightHand)
        go.worldTransform.position = startpos
        if (Vector.distance(startpos, Player.localPlayer.character.worldTransform.position) > 4000) {
            return;
        }

        let flyItem = new FlyItem();
        flyItem.dmg = dmg;
        flyItem.callBack = () => {
            GameObjPool.despawn(go);
        }
        const force = VectorUtils.getHitForce(80, spd, startpos, char.getSlotWorldPosition(HumanoidSlotType.Head));
        ignoreIds.push(sender.gameObjectId)
        flyItem.send(go.getChildByName("sphere"), force.magnitude, force, ignoreIds);
    }
}


InputUtil.onKeyDown(Keys.B, async () => {
    const char = Player.localPlayer.character;
    const trans = char.worldTransform;
    let go = await GameObjPool.asyncSpawn("197388", GameObjPoolSourceType.Prefab);
    let startPos = trans.position.clone().add(trans.getForwardVector().multiply(1000));
    go.worldTransform.position = startPos;
    let flyItem = new FlyItem();
    flyItem.callBack = () => {
        GameObjPool.despawn(go);
    }
    const force = VectorUtils.getHitForce(320, 500, startPos, char.getSlotWorldPosition(HumanoidSlotType.Head));
    flyItem.send(go, force.magnitude, force, []);
})