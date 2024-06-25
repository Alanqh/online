import { GameConfig } from "../../../../../config/GameConfig";
import { GamesStartDefines } from "../../../../Defines";
import GameStart, { EGameTheme } from "../../../../GameStart";
import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3ArgType, B3Dec, B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import { PlayerInterModuleS } from "../../../inter/PlayerInterModule";
import GhostBehavoirInst from "../../GhostBehavoir";
import { GhostNodeStat } from "../const/GhostNodeStat";

const queryExtends: Vector = new Vector(500, 500, 500);

@regBehaviorNode()
class GhostChaseTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "追逐目标",
        `将会追逐这个目标,直接返回true`
    ).addInput("追逐的目标")


    @B3Dec.ArgDec("停止距离", B3ArgType.Number)
    public stopDis: number;

    public run(node: BehaviorNode, env: Environment, target: number) {
        if (!Player.getPlayer(target)) {
            return BehaviorRet.Success;
        }
        let inst = env["inst"] as GhostBehavoirInst;
        let timer = env.getInnerVar(node, "interval");
        env[GhostNodeStat.IsMoving] = false;
        if (env[GhostNodeStat.MoveType]) {
            inst.moveProxy.isFly = false;
            inst.ghostChar.switchToWalking();
            inst.ghostChar.movementDirection = MovementDirection.ControllerDirection;
            env[GhostNodeStat.MoveType] = 0;
        }

        if (timer >= TimeUtil.elapsedTime()) {
            return BehaviorRet.Success;
        }
        timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 0.4);
        const player = Player.getPlayer(target);
        if (!player) {
            return BehaviorRet.Success;
        }
        let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
        let dis = inst._cfg.attackMode <= 0 ? 80 : 10;
        if (this.stopDis) {
            dis = this.stopDis;
        }
        let predir = inst.bindDir;
        let presuc = env.getInnerVar(node, "presuc");
        env.setInnerVar(node, "presuc", true);
        const ghostcharpos = inst.ghostChar.worldTransform.position;
        if (pos.z - ghostcharpos.z > 100) {
            ghostcharpos.z = pos.z;
            inst.ghostChar.worldTransform.rotation = Vector.subtract(pos, ghostcharpos).toRotation();
            if (Vector.squaredDistance(ghostcharpos, pos) < 25000) {
                inst.moveProxy.jump(inst.ghostChar);
            }
        }
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            inst.moveProxy.failFunc(inst.ghostChar);
        }
        Navigation.navigateTo(inst.ghostChar, pos, dis, () => {
            inst.bindDir = null;
            if (Vector.distance(inst.ghostChar.worldTransform.position, pos) >= 200) {
                inst.moveProxy.failFunc(inst.ghostChar);
            }
        }, () => {
            if (player.character.isDestroyed) {
                return;
            }
            let newDir = Vector.subtract(player.character.worldTransform.position, inst.ghostChar.worldTransform.position);
            newDir.z = 0;
            inst.bindDir = newDir.toRotation();
            env.setInnerVar(node, "presuc", false);
        });
        if (!presuc) {
            inst.bindDir = predir;
        }
        return BehaviorRet.Success;
    }
}


@regBehaviorNode()
class GhostFlyChaseTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "飞行追逐目标",
        `将会以飞行形态 追逐这个目标,直接返回true`
    ).addInput("追逐的目标")

    @B3Dec.ArgDec("飞行的高度", B3ArgType.Number)
    public height: number;

    @B3Dec.ArgDec("开始俯冲的距离", B3ArgType.Number)
    public dis: number;

    public run(node: BehaviorNode, env: Environment, target: number) {
        if (!Player.getPlayer(target)) {
            return BehaviorRet.Success;
        }
        let inst = env["inst"] as GhostBehavoirInst;
        let timer = env.getInnerVar(node, "interval");
        if (!env[GhostNodeStat.MoveType]) {
            inst.ghostChar.switchToFlying();
            console.log("切换为飞行形态")
            inst.moveProxy.isFly = true;
            inst.ghostChar.movementDirection = MovementDirection.AxisDirection;
            env[GhostNodeStat.MoveType] = 1;
        }
        if (timer >= TimeUtil.elapsedTime()) {
            return BehaviorRet.Success;
        }
        timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 0.4);
        const player = Player.getPlayer(target);
        if (!player) {
            return BehaviorRet.Success;
        }

        let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
        let dis = inst._cfg.attackMode <= 0 ? 80 : 10;
        let predir = inst.bindDir;
        let presuc = env.getInnerVar(node, "presuc");
        env.setInnerVar(node, "presuc", true);
        const ghostcharpos = inst.ghostChar.worldTransform.position;
        if (pos.z - ghostcharpos.z > 100) {
            ghostcharpos.z = pos.z;
            inst.ghostChar.worldTransform.rotation = Vector.subtract(pos, ghostcharpos).toRotation();
            if (Vector.squaredDistance(ghostcharpos, pos) < 25000) {
                inst.moveProxy.jump(inst.ghostChar);
            }
        }
        inst.moveProxy.failFunc(inst.ghostChar);
        Navigation.navigateTo(inst.ghostChar, pos, dis, () => {
            inst.bindDir = null;
            if (Vector.distance(inst.ghostChar.worldTransform.position, pos) >= 200) {
                inst.moveProxy.failFunc(inst.ghostChar);
            }
        }, () => {
            const ghostpos = inst.ghostChar.worldTransform.position;
            const charPos = player.character.worldTransform.position;
            let dis = Vector.distance(ghostpos, charPos);
            dis -= Math.abs(ghostpos.z - charPos.z);
            if (dis <= this.dis) {
                if (inst.ghostChar["isDisableCollsion"]) {
                    inst.ghostChar.setCollision(PropertyStatus.On);
                }
            }
            else {
                if (!inst.ghostChar["isDisableCollsion"]) {
                    inst.ghostChar.setCollision(PropertyStatus.Off);
                }
                charPos.z = this.height;
            }
            let newDir = Vector.subtract(charPos, ghostpos);
            inst.bindDir = newDir.toRotation();
            env.setInnerVar(node, "presuc", false);
        });
        if (!presuc) {
            inst.bindDir = predir;
        }
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostClearTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "退出追逐",
        `将会停止追逐目标,直接返回true`
    )

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.server_exitChase();
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostFarTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取一个与目标相反反向的位置",
        `+输出一个与玩家相反方向的位置并移动过去`
    ).addInput("对象id");

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        const player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Success;
        }
        let timer = env.getInnerVar(node, "interval");
        if (timer >= TimeUtil.elapsedTime()) {
            return BehaviorRet.Success;
        }
        env[GhostNodeStat.IsMoving] = false;
        timer = env.setInnerVar(node, "interval", TimeUtil.elapsedTime() + 2);
        let inst = env["inst"] as GhostBehavoirInst;
        const startPos = inst.ghostChar.worldTransform.position;
        const dir = Vector.subtract(startPos, player.character.worldTransform.position);
        dir.z = 0;
        dir.normalize();
        startPos.add(dir.multiply(2000));
        let pos; //= Navigation.getClosestReachablePoint(startPos, queryExtends);
        if (!pos) {
            pos = startPos;
        }
        let dis = inst._cfg.attackMode <= 0 ? 80 : 10;
        let predir = inst.bindDir;
        let presuc = env.getInnerVar(node, "presuc");
        env.setInnerVar(node, "presuc", true);
        const ghostcharpos = inst.ghostChar.worldTransform.position;
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            inst.moveProxy.failFunc(inst.ghostChar);
        }
        Navigation.navigateTo(inst.ghostChar, pos, dis, () => {
            inst.bindDir = null;
            if (Vector.distance(inst.ghostChar.worldTransform.position, pos) >= 200) {
                inst.moveProxy.failFunc(inst.ghostChar);
            }
        }, () => {
            if (player.character.isDestroyed) {
                return;
            }
            let newDir = Vector.subtract(player.character.worldTransform.position, inst.ghostChar.worldTransform.position);
            newDir.z = 0;
            inst.bindDir = newDir.toRotation();
            env.setInnerVar(node, "presuc", false);
        });
        if (!presuc) {
            inst.bindDir = predir;
        }
        return BehaviorRet.Success;
    }
}




@regBehaviorNode()
class GhostAttackTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "攻击技能释放",
        `将会释放攻击技能，并造成伤害，直接返回true,释放成功后会处于PlayMelee状态`
    ).addInput("技能id", "朝向的目标")

    public run(node: BehaviorNode, env: Environment, skillId: number, targetid: number | Vector) {
        if (!skillId) {
            return BehaviorRet.Success;
        }
        let inst = env["inst"] as GhostBehavoirInst;
        let cfg = GameConfig.GhostAttack.getElement(skillId);
        if (!cfg) {
            return BehaviorRet.Success;
        }
        if (!targetid) {
            inst.ser_attack(skillId);
            return BehaviorRet.Success;
        }
        else if (typeof (targetid) == "number") {
            let player = Player.getPlayer(targetid);
            if (!player) {
                return BehaviorRet.Success;
            }
            let dir = Vector.subtract(player.character.worldTransform.position, inst.ghostChar.worldTransform.position);
            dir.z = 0;
            inst.ghostChar.worldTransform.rotation = dir.toRotation();
            inst.ser_attack(skillId, targetid);
            return BehaviorRet.Success;
        }
        else {
            let dir = Vector.subtract(targetid, inst.ghostChar.worldTransform.position);
            dir.z = 0;
            inst.ghostChar.worldTransform.rotation = dir.toRotation();
            inst.ser_attack(skillId);
            return BehaviorRet.Success;
        }

    }
}

@regBehaviorNode()
class GhostLockAttackTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "锁定对象攻击",
        `将会攻击玩家，
        +如果距离不够会返回false，攻击完后自动卸载仇恨`
    ).addInput("玩家id")

    @B3Dec.ArgDec("检测距离", B3ArgType.Number)
    public checkDis: number;

    public run(node: BehaviorNode, env: Environment, targetid: number) {
        let player = Player.getPlayer(targetid);
        let inst = env["inst"] as GhostBehavoirInst;
        if (!player) {
            inst.reset2Hang();
            return BehaviorRet.Success
        }
        const dis = Vector.distance(inst.ghostChar.worldTransform.position, player.character.worldTransform.position)
        if (dis > this.checkDis) {
            return BehaviorRet.Fail;
        }
        console.log("开始攻击玩家")
        inst.ser_catchPlayer(player);
        return BehaviorRet.Success;
    }
}


