import { GameConfig } from "../../../../../config/GameConfig";
import RewardsItem_UI_Generate from "../../../../../ui-generate/ShareUI/checkin/RewardsItem_UI_generate";
import { GamesStartDefines } from "../../../../Defines";
import { BehaviorType, BehaviorRet } from "../../../../behavior3/BehaviorDefine";
import { regBehaviorNode } from "../../../../behavior3/BehaviorManager";
import { BehaviorNode } from "../../../../behavior3/BehaviorNode";
import { Environment } from "../../../../behavior3/BehaviorTree";
import { NodeBase, B3Define, B3Dec, B3ArgType } from "../../../../behavior3/nodes/NodeBase";
import { BlackBoardModuleS } from "../../../blackboard/BlackBoardModuleS";
import GhostBossInst from "../../../ghostBoss/GhostBossInst";
import { GhostBossModuleS } from "../../../ghostBoss/GhostBossModuleS";
import GhostBehavoirInst, { GhostMusicData } from "../../GhostBehavoir";
import { GhostLogicState, GhostSettings } from "../../GhostDefine";
import { GhostModuleS } from "../../GhostModuleS";
import { GhostNodeStat } from "../const/GhostNodeStat";

@regBehaviorNode()
class GhostStopMove extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "停止寻路",
        `将会停止移动,直接返回true`
    );

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        env[GhostNodeStat.IsMoving] = false;
        Navigation.stopNavigateTo(inst.ghostChar);
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostGetDistance extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获取距离",
        `获取与一个目标的距离(取最近的宝)`
    ).addOutput("距离");

    @B3Dec.ArgDec("目标行为树", B3ArgType.String)
    public treeName: string;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        let mindis = Number.MAX_SAFE_INTEGER;
        ModuleService.getModule(GhostModuleS).ghostMap.forEach(e => {
            if (!e._insCfg.treeName || e._insCfg.treeName != this.treeName) {
                return;
            }
            let dis = Vector.distance(inst.ghostChar.worldTransform.position, e.ghostChar.worldTransform.position);
            if (dis < mindis) {
                mindis = dis;
            }
        })
        if (GhostSettings.recoverDis) {
            mindis = GhostSettings.recoverDis;
        }
        return [BehaviorRet.Success, mindis];
    }
}


@regBehaviorNode()
class GhostPlayMusic extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "播放音乐",
        `播放音乐`
    );

    @B3Dec.ArgDec("音乐id", B3ArgType.String)
    public music: string;

    @B3Dec.ArgDec("影响半径", B3ArgType.Number)
    public radius: number;

    @B3Dec.ArgDec("持续时间", B3ArgType.Number)
    public keepTime: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        if (this.keepTime < 0) {
            inst.music = new GhostMusicData(this.music, this.radius, this.keepTime);
        }
        else {
            inst.playMusic(this.music, this.radius, this.keepTime);
        }

        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostPlayAni extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "播放动画",
        `播放动画`
    );

    @B3Dec.ArgDec("动画", B3ArgType.String)
    public ani: string;

    @B3Dec.ArgDec("是否循环", B3ArgType.Number)
    public isLoop: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.playAni(this.ani, this.isLoop == 1);

        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostStopAni extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "停止动画",
        `停止播放动画`
    );

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.stopAni();

        return BehaviorRet.Success;
    }
}


@regBehaviorNode()
class GhostInit extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "初始化",
        `只会执行一次`
    )

    public run(node: BehaviorNode, env: Environment) {
        if (env.getInnerVar(node, "GhostInit")) {
            return BehaviorRet.Fail;
        }
        env.setInnerVar(node, "GhostInit", true)
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostSetPos extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "传送位置",
        `传送到指定位置`
    ).addInput("pos")


    public run(node: BehaviorNode, env: Environment, pos: Vector) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.ghostChar.worldTransform.position = pos;
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostSetiVisiable extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "设置显隐",
        `设置显隐`
    );

    @B3Dec.ArgDec("是否显示", B3ArgType.Number)
    public isShow: number;


    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.ghostChar.setVisibility(this.isShow ? PropertyStatus.On : PropertyStatus.Off);
        inst.ghostChar.collisionWithOtherCharacterEnabled = this.isShow != 0;
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostGetFarPos extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "获得最远位置",
        `获得最远的巡逻位置`
    ).addOutput("位置")

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        const allPartorls = inst._insCfg.patrols;
        let maxDis = 0;
        let targetPos: Vector = Vector.zero;
        const instPos = inst.ghostChar.worldTransform.position;
        for (let index = 0; index < allPartorls.length; index++) {
            const element = allPartorls[index];
            const dis = Vector.distance(instPos, element);
            if (dis > maxDis) {
                maxDis = dis
                targetPos.set(element);
            }
        }
        return [BehaviorRet.Success, targetPos];
    }
}

@regBehaviorNode()
class GetCurGameTheme extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "匹配主题",
        `匹配游戏主题`
    )

    @B3Dec.ArgDec("主题ids", B3ArgType.String)
    public themes: string;

    public run(node: BehaviorNode, env: Environment) {
        const cfg = GameConfig.GameTheme.getAllElement().find(e => {
            return e.key == GamesStartDefines.gameTheme;
        })
        const ids = this.themes.split("|").map(e => Number(e));
        if (ids.includes(cfg.id)) {
            return BehaviorRet.Success;
        }
        return BehaviorRet.Fail;
    }
}


@regBehaviorNode()
class GhostChangeSpd extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "更改速度倍率",
        `+修改速度倍率
        `);

    @B3Dec.ArgDec("移动速度", B3ArgType.Number)
    public spdRate: number;

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.dayCfg.spd = this.spdRate;
        inst.logicState == GhostLogicState.Casual ? inst.setCasualConfigs() : inst.setChaseConfigs();
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostCheckSkill extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Condition,
        "检查某个技能是否ok",
        `+检测了距离
         +检测了时间
        `).addInput("target").addInput("skillId");

    @B3Dec.ArgDec("检查cd", B3ArgType.Number)
    public cd: number;

    @B3Dec.ArgDec("检查距离", B3ArgType.Number)
    public dis: number;

    public run(node: BehaviorNode, env: Environment, targetId: number, skillId: number) {
        const player = Player.getPlayer(targetId);
        if (!player) {
            return;
        }
        let inst = env["inst"] as GhostBehavoirInst;
        if (this.cd) {
            let endTime = inst.skillCdMap.get(skillId) || 0;
            let curTime = TimeUtil.elapsedTime();
            if (curTime < endTime) {
                return BehaviorRet.Fail;
            }
        }
        if (this.dis) {
            let cfg = GameConfig.GhostAttack.getElement(skillId);
            const charPos = inst.ghostChar.worldTransform.position;
            const targetPos = player.character.worldTransform.position;
            charPos.z = targetPos.z;
            let dis = Vector.distance(charPos, targetPos);
            if (cfg.dis < dis) {
                return BehaviorRet.Fail;
            }
        }
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostTowardsTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "面向目标",
        `+面相某一个玩家
        `).addInput("target");

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;
        let player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Fail;
        }
        const pos = player.character.worldTransform.position;
        pos.z = inst.ghostChar.worldTransform.position.z;
        inst.ghostChar.worldTransform.lookAt(pos)
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostReadConfig extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "读取配置",
        `+读取instance表中的某一列
        `).addOutput("result");

    @B3Dec.ArgDec("参数", B3ArgType.String)
    public param: string;

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;

        return [BehaviorRet.Success, inst._insCfg[this.param]];
    }
}

@regBehaviorNode()
class GhostReadDiffcultConfig extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "读取配置",
        `+读取Diffcult表中的某一列
        `).addOutput("result");

    @B3Dec.ArgDec("参数", B3ArgType.String)
    public param: string;

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBossInst;

        return [BehaviorRet.Success, inst.diffcultCfg[this.param]];
    }
}

@regBehaviorNode()
class GhostSkillSequnce extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "技能序列",
        `+根据配置获取技能轴
        +配置填技能id|持续时间
        +输出一个数字
        `).addOutput("result");

    @B3Dec.ArgDec("参数", B3ArgType.String)
    public param: string;

    public run(node: BehaviorNode, env: Environment) {
        let p2 = env.getInnerVar(node, "cache") as number[][];
        let lastGetTime = env.getInnerVar(node, "lastTime") || 0;
        let lastGetIndex = env.getInnerVar(node, "lastIndex") || 0;
        let isfirst = env.getInnerVar(node, "isfirst");
        if (!p2) {
            const p1 = this.param.split("||")
            p2 = p1.map(e => { return e.split("|").map(e => Number(e)) });
            env.setInnerVar(node, "cache", p2);
        }
        const curTime = TimeUtil.elapsedTime();

        if (isfirst) {
            if (curTime > lastGetTime) {
                lastGetIndex++;
                if (lastGetIndex >= p2.length) {
                    lastGetIndex = 0;
                }
            }
            else {
                return [BehaviorRet.Success, p2[lastGetIndex][0]];
            }
        }
        const cur = p2[lastGetIndex];
        console.log("lastIndex" + cur[0] + "lasttime" + curTime + cur[1])
        env.setInnerVar(node, "lastIndex", lastGetIndex);
        env.setInnerVar(node, "lastTime", curTime + cur[1]);
        env.setInnerVar(node, "isfirst", true);
        return [BehaviorRet.Success, cur[0]];
    }
}

// @regBehaviorNode()
// class GhostSpawnLittle extends NodeBase {
//     define: B3Define = new B3Define(
//         BehaviorType.Action,
//         "生小怪",
//         `+生成几个小怪，并且进入无敌状态
//         `);

//     @B3Dec.ArgDec("生成的cfgid", B3ArgType.Number)
//     public cfgid: number;

//     @B3Dec.ArgDec("生成数目", B3ArgType.Number)
//     public param: number;

//     public run(node: BehaviorNode, env: Environment) {
//         let inst = env["inst"] as GhostBossInst;
//         inst.isInvicible = true;
//         inst.spawnLittles(this.cfgid, this.param);
//         return BehaviorRet.Success;
//     }
// }

@regBehaviorNode()
class GhostCheckLittles extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Composite,
        "小怪检测",
        `+检测自身已经没有无附属小怪了
        `);

    public run(node: BehaviorNode, env: Environment) {
        let inst = env["inst"] as GhostBossInst;
        if (inst.littles.length == 0) {
            return BehaviorRet.Success;
        }
        let isFinished: boolean = true;
        inst.littles.forEach(e => {
            if (e.curHp > 0) {
                isFinished = false;
            }
        })
        if (isFinished) {
            inst.littles.length = 0;
            inst.isInvicible = false;
            return BehaviorRet.Success;
        }
        else {
            return BehaviorRet.Fail;
        }
    }
}

@regBehaviorNode()
class GhostCircleTarget extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "环绕玩家",
        `+环绕一个目标进行匀速圆周运动。
        `).addInput("target");

    @B3Dec.ArgDec("距离", B3ArgType.Number)
    public radius: number;


    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;
        let player = Player.getPlayer(targetId);
        if (!player) {
            return BehaviorRet.Fail;
        }
        const pos = player.character.worldTransform.position;
        const instPos = inst.ghostChar.worldTransform.position
        pos.z = instPos.z;
        const dis = Vector.distance(pos, instPos);
        let moveDir = Vector.right;
        if (dis > this.radius) {
            moveDir.x += 1;
        }
        else {
            moveDir.x -= 1;
        }
        inst.ghostChar.worldTransform.lookAt(pos);
        inst.ghostChar.addMovement(moveDir);
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostChangeAniGroup extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "移动动画",
        `+切换移动动画，2是闲逛，其他是追击
        `).addInput("target");

    @B3Dec.ArgDec("动画", B3ArgType.Number)
    public group: number;

    public run(node: BehaviorNode, env: Environment, targetId: number) {
        let inst = env["inst"] as GhostBehavoirInst;
        inst.moveState = this.group;
        return BehaviorRet.Success;
    }
}

@regBehaviorNode()
class GhostSetStat extends NodeBase {
    define: B3Define = new B3Define(
        BehaviorType.Action,
        "改变装填",
        `+将某个状态改变为某个值
        `)

    @B3Dec.ArgDec("状态", B3ArgType.String)
    public stat: number;

    @B3Dec.ArgDec("值", B3ArgType.Number)
    public val: number;

    public run(node: BehaviorNode, env: Environment) {
        env[this.stat] = this.val;
        return BehaviorRet.Success;
    }
}





