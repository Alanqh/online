/*
 * @Author       : dal
 * @Date         : 2024-04-01 13:44:18
 * @LastEditors  : dal
 * @LastEditTime : 2024-04-07 18:39:50
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\ghost\nodes\ActionNode\GhostSelfGuid.ts
 * @Description  : 
 */
import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { B3ArgType, B3Dec, B3Define, NodeBase } from "../../../../behavior3/nodes/NodeBase";
import GhostBehavoirInst from "../../GhostBehavoir";

@regBehaviorNode()
class GhostSelfGuid extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取自身guid",
        `返回自己的guid`
    ).addOutput("自己的唯一id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.gameObject.gameObjectId];
    }
}
@regBehaviorNode()
class GhostTargetId extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取自身目标id",
        `返回自己的目标的id`
    ).addOutput("正在追逐的目标id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.targetId];
    }
}
@regBehaviorNode()
class GhostBindPlayerId extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "获取绑定的玩家id", `        +返回绑定的玩家id        +只有特定的游戏可以用（例如惊魂岛）        `).addOutput("正在追逐的目标id")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        return [BehaviorRet.Success, inst.bindPlayerId];
    }
}

@regBehaviorNode()
class SetTimer extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置计时器",
        "+设置计时器+填入Instance表格中的列名")
        .addOutput("endTime")

    @B3Dec.ArgDec("时间/s", B3ArgType.String)
    public time: string;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        console.log("TIME" + inst._insCfg[this.time])
        return [BehaviorRet.Success, TimeUtil.elapsedTime() + inst._insCfg[this.time]];
    }
}

@regBehaviorNode()
class SetTimer2 extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置计时器",
        "+设置计时器时间")
        .addOutput("endTime")

    @B3Dec.ArgDec("时间/s", B3ArgType.Number)
    public time: number;

    public run(node: BehaviorNode, env: Environment) {
        return [BehaviorRet.Success, TimeUtil.elapsedTime() + this.time];
    }
}


@regBehaviorNode()
class CheckTimer extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查一个计时器是否OK",
        `
        +返回计时器是否完成了
        `
    ).addInput("计时器");

    public run(node: BehaviorNode, env: Environment, timer: number) {
        if (!timer) {
            return BehaviorRet.Success;
        }
        if (TimeUtil.elapsedTime() > timer) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }
}

@regBehaviorNode()
class GetSkill extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action, "获得一个技能", `        +获得一个技能        +如果一个都没有那就返回1        `).addOutput("技能");

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        let skillNodes = inst._insCfg.skills || [];
        if (skillNodes.length == 0) {
            return [BehaviorRet.Fail, 1];
        }
        return [BehaviorRet.Success, skillNodes[0]];
    }
}

@regBehaviorNode()
class GhostBuffer extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "增益",
        `+提高移动速度
        `);

    @B3Dec.ArgDec("移动速度", B3ArgType.Number)
    public spdRate: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.ghostChar.maxWalkSpeed = inst.ghostChar.maxWalkSpeed * this.spdRate;
        return BehaviorRet.Success;
    }
}
@regBehaviorNode()
class GhostChangeChaseSpd extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "速度变换",
        `+根据追击速度重新设定移动速度
        `);

    @B3Dec.ArgDec("移动速度", B3ArgType.Number)
    public spdRate: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.ghostChar.maxWalkSpeed = inst._cfg.chaseSpeed * this.spdRate;
        return BehaviorRet.Success;
    }
}
