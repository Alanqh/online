import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3ArgType, B3Dec, B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import { BuffModuleS } from "../../../buff/BuffModule";
import GhostBossInst from "../../../ghostBoss/GhostBossInst";
import { PlayerInterModuleS } from "../../../inter/PlayerInterModule";
import GhostBehavoirInst from "../../GhostBehavoir";
import { GhostModuleS } from "../../GhostModuleS";
import { TriggerCounter } from "../TriggerCounter";
import { GhostNodeStat } from "../const/GhostNodeStat";

@regBehaviorNode()
class GhostIsMoving extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "获取自己是否在移动",
        `是否在移动中`
    )

    public run(node: BehaviorNode, env: Environment, arr: any[]) {
        //let inst = env["inst"] as GhostBehavoirInst;
        if (env[GhostNodeStat.IsMoving]) {
            return BehaviorRet.Success;
        }
        // if (inst.ghostChar.isMoving) {
        //     return BehaviorRet.Success;
        // }
        // else {
        //     return BehaviorRet.Fail;
        // }
        return BehaviorRet.Fail;
    }
}

@regBehaviorNode()
class GhostCheckStat extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "状态检查",
        `是否处于XX状态中`
    );
    @B3Dec.ArgDec("检查的状态", B3ArgType.String)
    public stat: string;

    public run(node: BehaviorNode, env: Environment) {
        let targetStat = env[this.stat] || 0;
        if (targetStat == -1) {
            return BehaviorRet.Success;
        }
        if (TimeUtil.elapsedTime() > targetStat) {
            return BehaviorRet.Fail;
        }
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostCheckTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查追逐目标",
        `追逐目标是否无效，无效返回true 
        +如果超出了追逐距离
        +如果追逐目标已经死亡
        +如果追逐目标已经进入了安全区
        +但是如果只是进入了柜子这类安全区
        +会追逐到附近再停止`
    ).addInput("检查的对象id")

    @B3Dec.ArgDec("是否需要额外查毒", B3ArgType.Number)
    public isCheckPos: number;

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;
        let player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Success;
        }
        if (!ModuleService.getModule(GhostModuleS).checkCanKill(targetId)) {
            return BehaviorRet.Success;
        }
        if (this.isCheckPos) {
            let posCheck = ModuleService.getModule(BuffModuleS).checkPoisonExist(player);
            if (posCheck) {
                return BehaviorRet.Success;
            }
        }
        /** 安全区检测 */
        let issafe = false;
        let curSafe: string = ModuleService.getModule(PlayerInterModuleS).getPlayerInterStat(player);
        if (curSafe && inst._cfg.safePlace && inst._cfg.safePlace.includes(curSafe)) {
            console.log("检测到玩家正在安全的地方躲避")
            issafe = true;
        }
        let time = inst.targetData.startTime || 0;
        if (TimeUtil.elapsedTime() - time >= inst.targetData.cfg.existChaseTime) {
            return BehaviorRet.Success;
        }

        let exitDis = inst.targetData.cfg.existChaseDist;
        let pos = ModuleService.getModule(PlayerInterModuleS).getPlayerPos(player.character);
        const dis = Vector.distance(inst.ghostChar.worldTransform.position, pos);
        if (dis > exitDis) {
            return BehaviorRet.Success;
        }
        if (dis < 100 && issafe) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }
}

@regBehaviorNode()
class GhostCheckTargetSafe extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查目标是否在安全区内",
        `追逐目标是否是安全的`
    ).addInput("检查的对象id")

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;
        let player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Success;
        }
        /** 安全区检测 */
        let issafe = false;
        let curSafe: string = ModuleService.getModule(PlayerInterModuleS).getPlayerInterStat(player);
        if (curSafe && inst._cfg.safePlace && inst._cfg.safePlace.includes(curSafe)) {
            console.log("检测到玩家正在安全的地方躲避")
            issafe = true;
        }
        if (issafe) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }
}

@regBehaviorNode()
class GhostTriggerGet extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "检查触发器", `        +检查触发器是否有敌人存在，始终会返回成功        `).addOutput("高优先级玩家");

    @B3Dec.ArgDec("触发器guid", B3ArgType.String)
    public guid: string;

    private readonly selfTrigger: string = "selfTrigger";

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        let counter = env[this.selfTrigger] as TriggerCounter;
        if (!counter) {
            counter = new TriggerCounter(inst._insCfg[this.guid]);
            env[this.selfTrigger] = counter;
        }
        let player = counter.getPlayer();
        if (!player) {
            return [BehaviorRet.Success, undefined];
        }
        return [BehaviorRet.Success, player.playerId];
    }
}

@regBehaviorNode()
class CheckPlayerId extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查玩家",
        `
        +检查一个玩家id是否有效,如果有效则返回成功
        +如果玩家id无效则返回失败
        `
    ).addInput("玩家id");

    private readonly selfTrigger: string = "selfTrigger";

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        if (!targetId) {
            return BehaviorRet.Fail;
        }
        let player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Fail;
        }
        return BehaviorRet.Success;
    }
}


@regBehaviorNode()
class CheckGhostHp extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "获取当前生命值", `        +获取生命值        `).addOutput("生命值");

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.curHp];
    }
}

@regBehaviorNode()
class CheckGhostHpPercent extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "百分比", `        +获取生命值百分比        `).addOutput("生命值");

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBossInst;
        return [BehaviorRet.Success, inst.curHp / inst.bossInfo.maxHp];
    }
}




@regBehaviorNode()
class SetGhostHp extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "设置当前生命值", `        +设置当前的生命值        `);

    @B3Dec.ArgDec("生命值", B3ArgType.Number)
    public hp: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.curHp = this.hp;
        return BehaviorRet.Success;
    }
}
