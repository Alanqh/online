import PlayerTempData from "../modules/Player/PlayerTempData";
import { CurTimeState, GameMode, PlayerCurState, PlayerRace, PropQualityType } from "./enum";

export namespace GlobalData {
    export let curPlayerData: PlayerTempData;
    export class Global {
        /**是否显示GM */
        public static isShowGM: boolean = false;
        /**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
        public static selectedLanguageIndex: number = -1;
        /**临时旋转参数 */
        public static tmpRotation: Rotation = Rotation.zero;
        /**提示存在时间 秒*/
        public static tipTime: number = 2.5;
        /**是否开启提示 */
        public static isOpenActivity: boolean = true;
    }

    /**时间 */
    export class Time {
        /**白天时间 (s) */
        public static dayTime: number = 120;
        /**切换环境的时间 (s) */
        public static switchEnvTime: number = 4;
        /**夜晚时间 (普通模式)(s)*/
        public static normalNightTime: number = 300;
        /**24小时制的 白天起始时间(早晨6点) */
        public static dayStartTime: number = 6 * 60 * 60;
        /**梦魇模式白天icon初始位置 */
        public static nightmareDayIconStartPos: mw.Vector2 = new mw.Vector2(-622.5, 412);
        /**白天UI图片Guid */
        public static dayImageGuid = "271240";
        /**晚上UI图片Guid */
        public static nightImageGuid = "271216";
        /**梦魇模式白天图片Guid */
        public static nightmareDayImageGuid = "298436"
        /**梦魇模式晚上图片Guid */
        public static nightmareNightImageGuid = "298432";
        /**根据天数循环切换的图片Guid列表 */
        public static loopImageList = ["271218", "271208"];
        /**星期图片 */
        public static weekImageList = ["271202", "271212"];
    }

    /**核心循环步骤 */
    export class CoreStrp {
        /**存活一天发 */
        public static lifeOneDay = false;
    }
    export class DeadCount {
        public static fadeInTime: number = 0.5;
    }
    export class Teleport {
        public static isShowTeleportUI: boolean = false;
    }
    export class Bag {
        /**背包默认颜色 */
        public static bagDefaultColor: string = "#FFFFFFFF";
        /**背包满颜色 */
        public static bagFullColor: string = "#FF0000FF";
        /**背包点击cd 单位s */
        public static bagClickCd: number = 1;
        /**背包最大容量 */
        public static bagMaxSize: number = 20;
        /**拾取道具的距离 */
        public static pickDis: number = 150;
        /**弹“背包已满”UI的Cd 单位s */
        public static bagFullCd: number = 2;
        /**道具栏格子数量 */
        public static propBarMaxSize: number = 5;

        // 背包Item布局相关
        /**每行道具数 */
        public static rowCount: number = 5;
        /**高度 */
        public static itemHeight: number = 100;
        /**宽度 */
        public static itemWidth: number = 100;
        /**间距 */
        public static itemInterval: number = 50;
        /**左边距 */
        public static leftOffsetX: number = 50;
        /**上边距 */
        public static topOffsetY: number = 50;
    }

    /**道具 */
    export class Prop {
        /**道具背包点击cd 单位s */
        public static bagClickCd: number = 1;
        /**拾取道具的距离 */
        public static pickDis: number = 150;
        /**弹“背包已满”UI的Cd 单位s */
        public static bagFullCd: number = 2;
        /**玩家一个格子拥有的最大道具数 */
        public static propMaxCount: number = 20;
        /**道具描边颜色 */
        public static propOutlineColor: mw.LinearColor = new mw.LinearColor(1, 1, 1, 1);  //白色

        // 道具栏Item布局相关
        /**每行的道具数 */
        public static rowCount: number = 10;
        /**高度 */
        public static itemHeight: number = 90;
        /**宽度 */
        public static itemWidth: number = 90;
        /**间距 */
        public static itemInterval: number = 47.5;
        /**左边距 */
        public static leftOffsetX: number = 10;
        /**上边距 */
        public static topOffsetY: number = 5;
    }
    /**全局tips */
    export class GlobalTips {
        /**显示背景时间  ms*/
        public static showBgTime: number = 1500;
        /**显示文字时间 */
        public static showTextTime: number = 4000;
    }



    /**场景物体 */
    export class SceneObject {
        /**晚上隐藏的物体Guid */
        public static nightHideGuids: string[] = ["08D61ED3", "282405DB", "3DB839B1"];
        /**开门后 过多久自动关门(s) */
        public static DelayTimeAfterOpenDoor = 1;
        /**npc场景音效 */
        public static sceneSoundGuid: string[] = ["00159918", "0516CE16", "296C7122"];
    }

    /**环境 */
    export class Environment {
        /**雾最大密度 */
        public static maxfogDensity: number = 1;
        /**夜晚雾密度 */
        public static nightFogDensity: number = 0.1;
        /**雾颜色 */
        public static fogColor: string = "#E2E8EBFF";
        /**雾起始距离 */
        public static fogBeginDistance: number = 500;
        /**钟声Guid */
        public static bellRing: string = "271263";
        /**晚上屏幕特效1 */
        public static nightSceenEffectId1: string = "146797";
        /**晚上屏幕特效颜色1 */
        public static nightSceenEffectColor1: string = "751900FF";
        /**特效距离相机相对位置1 */
        public static nightSceenEffectPos1: mw.Vector = new mw.Vector(50, 0, 0);

        /**晚上屏幕特效2 */
        public static nightSceenEffectId2: string = "153048";
        /**晚上屏幕特效颜色2 */
        public static nightSceenEffectColor2: string = "751900FF";
        /**特效距离相机相对位置2 */
        public static nightSceenEffectPos2: mw.Vector = new mw.Vector(50, 0, 0);
        /**晚上屏幕特效1 */
        public static nightSceenEffect1: Effect = null;
        /**晚上屏幕特效2 */
        public static nightSceenEffect2: Effect = null;
        /**默认全局饱和度 */
        public static defaultGlobalSaturation: number = 1.2;

        /**模式和晚上环境id的对应关系 */
        public static modeNightEnvIdMap: Map<GameMode, number> = new Map([
            [GameMode.Normal, 2],
            [GameMode.Dream, 3],
        ]);

    }


    export class NPC {
        public static tag = "NPC";
        // 逻辑帧间隔(秒)
        public static LogicFrameInterval = 0.1;
        /**巡逻检测间隔 /s */
        public static otherPosInterval: number = 0.5;
        /**NPC回收后的位置 */
        public static npcRecyclePoint: mw.Vector = new mw.Vector(1199, -350, -700);
        /**NPC射线过滤数组 */
        public static raycastFilter: string[] = [];
        /**NPC跳跃动画 */
        public static npcJumpGuid: string = "122549";
        /**场景氛围NPC */
        public static npcGuidArr: string[] = ["22CFA9CE", "2598CBC7", "13C48B74", "03148E35", "0EE9FE93", "2E5FEF86", "3698117D", "1F3EF684"];
        /**换装模特NPC */
        public static npcModelGuids: string[] = ["13C48B74", "03148E35", "0EE9FE93", "2E5FEF86", "3698117D", "1F3EF684"];
        /**索敌距离 目前没用 */
        public static searchDis: number = 2000;
        /**护士巡逻扇形检测角度 */
        public static checkAnagle = 150;

        /**NPC临时击退时间 NPC倒地动画时间 /s */
        public static npcTempBackTime: number = 50;
        /**NPC跳舞时间 */
        public static npcDanceTime: number = 5;
        /**躺在床上的玩家 白天传送的位置 */
        public static playerBedDayPos: mw.Vector = new mw.Vector(4850, -3100, 100);
        /**床交互物guid数组 NPC将玩家带到那里*/
        public static labInteractGuids: string[] = ["3CFB0BD8", "34920E8B", "061C4364", "091CE2CD", "3EB805DB", "24C07307", "0C48D1A6",
            "0682ED7F", "330D6841", "3AEE4D08", "3AEE4D08", "217820BA", "0633C10C"];

        /**玩家出生床位 */
        public static playerBornBedGuids: string[] = ["3CBD4804", "065893B0", "22B748CF", "3BC5BD19", "2A71E0F8", "076A6AB5", "0F99E74D",
            "278C22BD", "0F14D0DA", "24AE12BA", "0D7F9C5E", "164E944C", "2327F19A", "3D901172"];
        /**备用NPC数组 */
        public static npcGuids: string[] = ["3AB33C0D", "36B7A7B3", "174C2D10", "223D112E", "07298F1D"]
        /**NPC抗玩家，玩家姿态 */
        public static playerStance: string = "101652";
        /**NPC的插槽 放交互物 */
        public static npcSlot = 6;
        /**NPC抗玩家交互相对位置 */
        public static interactLocPos = new Vector(-6, -2, -75);
        /**NPC抗玩家交互相对旋转 */
        public static interactLocRot = new Rotation(0, 0, 0);
        /**NPC攻击检测时机(动画播到第几毫秒检测) /ms */
        public static npcAtkCheckTime: number = 400;
        /**npc身上的触发器大小 */
        public static npcScal = new Vector(3, 3, 1);
        /**玩家受击动画 加优先加载*/
        public static playHitAniGuid = "121409";
        /**NPC收集倒地动画 */
        public static npcFallDownGuid = "46287";

        /**NPC走路音效（音效表id） */
        public static walksounds: number[] = [15];
        /** 播放频率(n秒/次)*/
        public static walksoundsInverval: number[] = [0.5];

        //------- 眼 怪-------------

        /**特效x秒后 怪物出现 */
        public static eyeMonstAppearDelay: number = 1;
        /**怪物出场动作 */
        public static eyeMonstAppearGuid: string = "121607";
        /**怪物离场特效传送门 */
        public static eyeMonstDisappearGuid: string = "88757";
        /**怪物出场X秒后离场 */
        public static eyeMonstDisappearDelay: number = 5;
        /**怪物出现后 半径X 玩家受到影响 */
        public static npcRadius: number = 1000;
        /**玩家受到影响后 后处理参数  泛光、饱和度、对比度*/
        public static postProcessArr: number[] = [1, 1, 1];
        /**小眼怪 剔除距离 */
        public static cullingDistance: number = 1800;
        /**小眼怪个数 */
        public static eyeMonstCount: number = 8;
        /**怪受枪击时间 /s */
        public static eyeMonstHurtTime: number = 10;
    }

    export class PlayerAttribute {
        public static maxHp: number = 100;
        /**受击ui显示、隐藏 时间 /ms */
        public static bloodShowTime: number[] = [1000, 300];
        /**受击ui 显示 贝塞尔 */
        public static showTweenBezier: number[] = [.0, .65, 1., 1.];
        /**受击ui 隐藏 贝塞尔 */
        public static hideTweenBezier: number[] = [.13, .88, .82, .15];

        /**玩家默认的体型缩放 */
        public static playerDefaultScale: number = 1;
        /**玩家受伤事件 */
        public static playerIsHurt_C: Action = new Action();
        /**玩家加血事件 */
        public static playerIsCure_C: Action = new Action();

        /**玩家Z轴最小值 检测玩家是否掉下去了 */
        public static playerMinZ: number = -750;
        /**玩家状态修改事件
         * 参数1：玩家Id
         * 参数2：当前玩家的状态
         */
        public static playerStateChanged_S: Action = new Action();
        /**当前玩家状态 */
        public static curPlayerState: PlayerCurState = PlayerCurState.Alive;
        /**健康血条颜色 */
        public static hpBarHealthColor: string = "#00FF00";
        /**受伤血条颜色 */
        public static hpBarDangerColor: string = "#FF0000";

        /**玩家倒地动画 */
        public static playerFallDownGuid: string = "97858";
        /**灵魂特效初始位置 */
        public static soulEffectPos: mw.Vector = new Vector(-130, 0, 27);
        /**灵魂特效初始旋转 */
        public static soulEffectRot: mw.Rotation = new Rotation(-181, -98, 1);
        /**灵魂特效结束位置 */
        public static soulEffectEndPos: mw.Vector = new Vector(0, 0, 100);
        /**灵魂特效结束旋转 */
        public static soulEffectEndRot: mw.Rotation = new Rotation(0, 0, 180);
        /**玩家床起身动画 */
        public static playerUpAniGuid: string = "14629";
        /**玩家呼救一次掉血量 */
        public static playerHelpBlood: number = -5;
        /**玩家头顶UI 相对位置 */
        public static playerHeadUIOffset: mw.Vector = new mw.Vector(0, 0, 108);
        /**玩家受到大眼怪攻击倒地动作 */
        public static playerEyeMonstAttackGuid: string = "52996";
        /**玩家受到大眼怪攻击倒地X秒后起身 */
        public static playerEyeMonstAttackUpDelay: number = 15;
        /**描边颜色 */
        public static OutlineColor: mw.LinearColor = new mw.LinearColor(1, 0, 0, 1);  //R,G,B,A
        /**描边宽度 */
        public static OutlineWidth: number = 2;  //[0, 10]
        /**描边时间/s */
        public static OutlineTime: number = 5;

    }

    export class MyCamera {
    }
    /**玩家运动相关配置 */
    export class PlayerSport {

        /**每降低10点san值，移动速度变化值 */
        public static speedChangePer10San: number = 20;
        /**玩家基础默认移动速度 */
        public static dfSpeed: number = 300;
        /**恢复体力间隔时间(s) */
        public static oneSpRecoverTime: number = 1;
        /**体力每秒恢复体力值 */
        public static sprintRecoverSp: number = 6;

        /**--------------------------状态cd--------------------------------*/
        /**蹲伏cd*/
        public static crouchCD: number = 0.5;
        /**潜行翻滚cd*/
        public static rollCD: number = 1.5;
        /**冲刺cd*/
        public static sprintCD: number = 0;
        /**跳跃cd*/
        public static jmupCD: number = 0.2;

        /**--------------------------蹲伏--------------------------------*/
        /**蹲伏 行走动作动画id,次数，速率 */
        public static crouchWalkAnimtion: [string, number, number] = ["52971", 0, 1];
        /**蹲伏 待机动作动画id,次数，速率 */
        public static crouchIdleAnimtion: [string, number, number] = ["46285", 0, 1];
        /**蹲伏 移动最大速度的 */
        public static crouchSpeed: number = 100;
        /**蹲伏 UI渐变时间 */
        public static crouchUIchangeTime: number = 0.2;

        /**--------------------------潜行翻滚--------------------------------*/
        /**潜行翻滚 消耗体力 */
        public static rollCostSp: number = 15;
        /**潜行翻滚 每帧移动距离 */
        public static rollDisplacement: mw.Vector = new Vector(25, 0, 0);
        /**潜行翻滚 总帧数*/
        public static rollDisplacementCount: number = 15;
        /**潜行翻滚 特效id 关联特效表*/
        public static rolltEffect: number = null;
        /**潜行翻滚 动作动画id,速度，速率 */
        public static rollAnimtion: [string, number, number] = ["95752", 1, 1];
        /**潜行翻滚 停止时间（毫秒，处理动画打断站立部分好像没有合适资源）*/
        public static rollAnimtionStopTime: number = 600;

        /**--------------------------冲刺--------------------------------*/
        /**冲刺 消耗体力 */
        public static sprintCostSp: number = 15;
        /**冲刺 每秒消耗体力 */
        public static sprintCostSpSecond: number = 5;
        /*冲刺  动作动画id,速度，速率 */
        public static sprintAnimtion: [string, number, number] = ["122507", 1, 1];
        /**冲刺 速度倍率 */
        public static sprintSpeedAdd: number = 2.5;
        /**冲刺 相机FOV */
        public static cameraTargetFov: number = 120;
        /**冲刺 相机FOV切换时间 */
        public static cameraTargetFovChangeTime: number = 1;
        /**冲刺 相机FOV切换时间 */
        public static cameraTargetFovBackTime: number = 0.5;
        /**冲刺 音效 关联音效表id（呼吸，心跳）*/
        public static sounds: number[] = [9, 13];
        /**冲刺 音效音量衰减到0所用时间（秒）*/
        public static soundsVlomeChangeTime: number = 10;
        /**冲刺 体力恢复到80%时，音效停止*/
        public static soundsVlomeStop: number = 80;
        /**冲刺 最低声音播放频率(n秒/次)（呼吸，心跳）*/
        public static dfsoundsBreathInverval: number[] = [1, 0.6];
        /**冲刺 最高中声音播放频率(n秒/次)（呼吸，心跳）*/
        public static spsoundsBreathInverval: number[] = [0.8, 0.4];
        /**冲刺 刺到最高声所需时间 && 恢复到最低声所需时间*/
        public static soundsInvervalChangeTimer: number[] = [0.3, 1];
        /**--------------------------跑步--------------------------------*/
        /**跑步 音效 关联音效表id */
        public static walksounds: number[] = [15];
        /**跑步 播放频率(n秒/次)*/
        public static walksoundsInverval: number[] = [0.5];

    }

    /**人变身后 */
    export class PlayerChange {
        /**基础速度相对玩家增加值 */
        public static speedAdd: number = 100;
        /**冲刺速度相对玩家倍率 */
        public static sprintSpeedAdd: number = 1.2;
        /**冲刺每秒消耗体力增加值（相对上边配置的增加） */
        public static sprintCostSpSecondAdd: number = 5;
    }

    /**Buff */
    export class Buff {
        /**基础速度buff */
        public static speedBuff: number = 0;
        /**冲刺速度倍率 */
        public static sprintSpeedBuff: number = 1;
        /**冲刺每秒消耗体力buff */
        public static sprintCostSpSecondBuff: number = 0;
    }

    export class worldUI {
        /**血条最远显示距离 */
        public static headUIMAxVisDistance: number = 3000;
        /**头顶UI 相对位置 */
        public static petHeadUIOffset: mw.Vector = new mw.Vector(20, 0, 80);
        /**头顶ui 大小 */
        public static petHeadUISize: mw.Vector2 = new mw.Vector2(370, 200);
    }

    export class GlobalTime {
        /** 当前时间阶段 */
        public static curTimeState: CurTimeState = CurTimeState.Day;
        /** TODO 把时间事件写到Global里 */
    }

    export class TempVector {
        /**只参与计算 不参与存储 不异步使用*/
        public static vector: mw.Vector = mw.Vector.zero;
        //攻击用
        public static vector1: mw.Vector = mw.Vector.zero;
        public static vector2: mw.Vector = mw.Vector.zero;
        /**临时变量 */
        public static temp: Vector = new Vector();
        /**临时变量1 */
        public static temp1: Vector = new Vector();
        /**拷贝临时 计算 */
        public static copyVector(loc: mw.Vector) {
            this.vector.x = loc.x;
            this.vector.y = loc.y;
            this.vector.z = loc.z;
        }
    }

    export class TempRotation {
        /**只参与计算 不参与存储 不异步使用*/
        public static rotation: mw.Rotation = mw.Rotation.zero;
        public static rotation1: mw.Rotation = mw.Rotation.zero;
        /**拷贝临时 计算 */
        public static copyRotation(loc: mw.Vector) {
            this.rotation.x = loc.x;
            this.rotation.y = loc.y;
            this.rotation.z = loc.z;
        }
    }


    export class Mode {
        /**模式类型 */
        public static modeList: GameMode[] = [GameMode.Normal, GameMode.Dream];
        /**模式对应的随机概率 */
        public static modeProbilityList: number[] = [100, 0];
    }

    /**枪配置 */
    export class Gun {
        /**子弹相对枪偏移 */
        public static bulletOffset: mw.Vector = new mw.Vector(0, 0, 30);
        /**子弹检测距离 */
        public static bulletCheckDis: number = 4500;
        /**摄像机偏移 */
        public static cameraOffset = new Vector(0, 0, 60);
        /**摄像机弹簧臂长度 */
        public static springArmLen = 320;
        /**被攻击到 减速 X  */
        public static slowDown = -80;
        /**枪弹夹容量 */
        public static bulletMaxCount = 10;
        /**子弹检测大小  越大越容易击中*/
        public static checkSize = 70;
        /**轮盘Transform配置(五个项) (position, size) */
        public static normalSize: Vector2[] = [

        ]
        /**团扇恢复单一能量时间 /s */
        public static fanRecoverTime: number = 5;
        /**NPC变形时间 /s */
        public static npcChangeTime: number = 8;
    }

    /**商城 */
    export class Shop {
        /**一级标签选中颜色|默认颜色 */
        public static seleBtnColorLevel_1: string[] = ["#FFFFFFFF", "#B3B3B3FF"];
        /**二级选中颜色|默认颜色 */
        public static seleBtnColorLevel_2: string[] = ["#FFFFFFFF", "#B3B3B3FF"];
        /**补给礼包id */
        public static supplyGiftIds: number[] = [4001, 4002, 4003];
        /**会员有效期 小时 /h */
        public static vipHour: number = 30 * 24;
        /**异常币乐币代币cons */
        public static icons: string[] = ["317289", "291726", "324532"];
        /**限时道具--永久道具id */
        public static limitPropMap: Map<number, number> = new Map([
            [2002, 2001],
            [2003, 2001],
            [9003, 2001],
            [2005, 2004],
            [2006, 2004],
        ]);
    }


    /**装饰 */
    export class DressUp {
        /**名字框item的大小 */
        public static nameBackgroundSize: Vector2 = new Vector2(0, 0);
        /**装饰item的大小 */
        public static pendantSize: Vector2 = new Vector2(180.00, 208.33);

        /**一级页签选中态字体颜色 */
        public static tab1SelectFontColor: string = "#FFFFFFFF";
        /**一级页签非选中态字体颜色 */
        public static tab1UnselectFontColor: string = "#B1B1B1FF";

        /**二级页签选中态字体颜色 */
        public static tab2SelectFontColor: string = "#FFFFFFFF";
        /**二级页签非选中态字体颜色 */
        public static tab2UnselectFontColor: string = "#B1B1B1FF";

        /**个人档案位置 */
        public static personalFilePos: Vector = new Vector(0, -7, 95);
        /**个人档案旋转 */
        public static personalFileRot: Rotation = new Rotation(0, -18, 0);
        /**换装动画 */
        public static dressGuid = "84857";
    }

    /**生化模式 */
    export class Biochemical {
        /**可变身怪物的id数组 */
        public static changeArr: number[] = [2001, 2002, 2003, 2004, 2005, 2006, 2007];
        /**队伍人数比例 */
        public static teamNumRate: number[] = [3, 7];
        /**感染进度值 每秒+ */
        public static infectRate: number = 5;
        /**受击感染进入 + */
        public static infectRateHit: number = 16;
        /**感染模式开启(敲钟提示音ID) */
        public static infectModeOpenSound: number = 39;
        /**感染进度条相对根节点偏移 */
        public static infectBarOffset: Vector = new Vector(0, 0, 150);
        /**每局经验值 */
        public static expPerGame: number = 750;
        /*经验、代币icon*/
        public static expIcon: string[] = ["153850", "324532"];
        /**经验、代币item 渲染缩放 */
        public static expItemScale: Vector2 = new Vector2(1.3, 1.3);

        //结算
        /**基础分数 */
        public static baseScore: number = 1000;
        /**生存 基础百分比 */
        public static basePercent: number = 0.05;
        /**每生存一分钟 百分比加值 */
        public static percentAdd: number = 0.05;

        /**感染积分加成 */
        public static infectAdd: number = 0.02;

    }

    /**战令模块 */
    export class BattlePass {
        /**战令等级上限 */
        public static maxLevel: number = 20;
        /**战令每升一级所需积分 */
        public static expPerLevel: number = 1000;
        /**高级通行证花费异常币数量 */
        public static passCost: number = 1000;
        /**轮播图片切换间隔 (s)*/
        public static imgSwitchInterval: number = 2;
        /**每多少道具一个mvp物品 */
        public static mvpItemPerItem: number = 5;
        /**购买一级需要的异常币 */
        public static levelCost: number = 100;
        /**购买通行证时，奖励展示UI item放大倍数 */
        public static rewardItemScale: number = 1.5;
    }

    export class Dance {
        /**舞蹈按钮使用CD */
        public static danceBtnCD: number = 1;
        /**上一次点击舞蹈按钮时间 */
        public static lastClickDanceTime: number = null;
        /**表情按钮使用CD */
        public static expressionBtnCD: number = 1;
        /**上一次点击表情按钮时间 */
        public static lastClickExpressionTime: number = null;

        /**播放玩家动作 */
        public static onPlayAnim: Action1<string> = new Action1();
        /**播放表情 */
        public static onPlayExpression: Action1<string> = new Action1();
        /**获取舞蹈表情事件  参数：ShopItem表ID */
        public static getDanceAC: Action1<number> = new Action();
        /**表情特效偏移 */
        public static ExpressionOffset: Vector = new Vector(0, 0, 50);
        /**表情特效缩放 */
        public static ExpressionScale: Vector = new Vector(1, 1, 1);
        /**表情特效持续时间 */
        public static ExpressionTime: number = 2;
    }

    export class Lottery {
        /**单抽奖励飞行时间 */
        public static SingleRewardTime: number = 1;
        /**多抽奖励飞行时间 */
        public static MoreRewardTime: number = 1;
        /**抽奖券刷新事件 */
        public static lotteryCoinRefresh: Action = new Action();
        /**通过品质类型获取颜色String */
        public static getQualityColorByType(type: PropQualityType) {
            let color: string = null
            switch (type) {
                case PropQualityType.Blue:
                    color = "329935"//蓝色
                    break;
                case PropQualityType.Purple:
                    color = "329920"//紫色
                    break;
                case PropQualityType.Golden:
                    color = "329930"//金色
                    break;

                default:
                    break;
            }
            return color;
        }
    }

    /**跟随NPC */
    export class FollowNPC {
        /**NPC跟随玩家目标位置(相对玩家的偏移) */
        public static guideNpcFollowOffset: mw.Vector = new mw.Vector(-20, 30, 50);
        public static guideNpcFollowOffrot: mw.Rotation = new mw.Rotation(0, 0, 0)
        /**run动画 */
        public static runAnim: string = "164988";
        /**idle动画 */
        public static idleAnim: string = "46298";
        /**NPC id 对应 */
        public static npcGuidByIdMap: Map<number, string> = new Map([
            [3014, "8B3046AD408D6C60F302C5993E1B6E2A"],
            [3015, "0FA174A54F4C5AF37FDBE3A17AE9E49F"],
            [3016, "EAC9FE6344CC9F7C3AE1C59882D75C5E"],
            [3017, "D2DA2F95438B51D1A07D50BD3D33BC4F"],
        ]);
    }
}

/**全局Action */
export class ActionCommon {
    /**点击跳跃 */
    public static onJumpAction_C: Action = new Action();
    /**玩家状态发生改变 玩家Id-是否安全*/
    public static onPlayerStateChange_S: Action = new Action();
    /**玩家进入场景监听 */
    public static onPlayerEnterScene: Action = new Action();
    /**玩家生死状态改变事件 */
    public static onPlayerCurStateChange: Action = new Action();
    /**玩家躲起来事件 参数: 1. true:进入掩体 false: 离开掩体 */
    public static onPlayerHide: Action1<boolean> = new Action1();
    /**Hp改变事件 参数: 1.改变前的hp 2.改变后的hp*/
    public static onHpChange: Action2<number, number> = new Action2();
    /**SP改变事件 参数: 1SP值*/
    public static onSPChange: Action = new Action();
    /**眨眼动画结束 */
    public static eyeAniOverAC: Action = new Action();
    /**掉血事件 玩家id  是否掉血 */
    public static onPlayerDropBlood: Action2<number, boolean> = new Action2();
    /**小眼怪发现玩家 */
    public static onEyeMonstFindPlayer: Action1<number> = new Action1();
    /**完成一次任务 参数1.任务id  参数2.玩家id  */
    public static onTaskComplete: Action = new Action();
    /**任务细节弹窗 参数 taskId,  仅客户端*/
    public static onShowTaskDetail: Action1<number> = new Action1();
    /**装备枪  参数 枪id*/
    public static onEquipGun: Action1<number> = new Action();
    /**卸载枪 */
    public static onUnequipGun: Action = new Action();
}

export class EventName {
    public static readonly Net_test = "Net_test";
}