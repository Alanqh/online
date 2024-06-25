
import { AddGMCommand, GMBasePanel } from "module_gm";
import GMHUD_Generate from "../../ui-generate/module_gm/gmModule/GMHUD_generate";
import GMItem_Generate from "../../ui-generate/module_gm/gmModule/GMItem_generate";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { GameConfig } from "../../config/GameConfig";
import { utils } from "../../utils/uitls";
import TimeModuleS from "../Time/TimeModuleS";
import TimeModuleC from "../Time/TimeModuleC";
import { AnimationPlayManager } from "../../Tool/AnimationEditor/AnimationPlay";
import { GlobalAnalytics } from "../Analytics/GlobalAnalytics";
import { AnalyticsModuleC, AnalyticsModuleS } from "../Analytics/AnalyticsModule";
import BagModuleC from "../Bag/BagModuleC";
import GuideModuleS from "../Guide/GuideModuleS";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { ShopModuleS } from "../Shop/ShopModuleS";
import PlayerAssetModuleS from "../PlayerAsset/PlayerAssetModuleS";
import P_IAA from "../Shop/P_IAA";
import PropSaveData from "../PlayerAsset/PropSaveData";
import BattlePassModuleS from "../BattlePass/BattlePassModuleS";
import DressUpModuleS from "../DressUp/DressUpModuleS";
import { DressUpItemData } from "../DressUp/DressData";


//主面板
export class GMBasePanelUI extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }
}

AddGMCommand("日期偏移（参数：天数）", (player: Player, value: string) => {
    let day = Number(value);
    utils.gmAddedDay = day;
}, (player: Player, value: string) => {
    let day = Number(value);
    utils.gmAddedDay = day;
})

AddGMCommand("添加装扮", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(DressUpModuleS).addDress(player.playerId, new DressUpItemData(Number(value)));
}, "测试")

AddGMCommand("增加活动积分", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(BattlePassModuleS).addScore(player.playerId, Number(value));
}, "测试")

AddGMCommand("弹IAA窗口", (player: Player, value: string) => {
    let ui = UIService.create(P_IAA)
    ui.show()
    ui.init(3006);
}, async (player: Player, value: string) => {

}, "测试")

AddGMCommand("设置安全", (player: Player, value: string) => {
    ActionCommon.onPlayerHide.call(true);
}, async (player: Player, value: string) => {

}, "测试")

AddGMCommand("添加限时道具", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    let savedData = new PropSaveData(Number(value), false, 60);
    ModuleService.getModule(PlayerAssetModuleS).addPropAndSave(player.playerId, savedData);
}, "测试")

AddGMCommand("添加资产道具", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    let savedData = new PropSaveData(Number(value), true);
    ModuleService.getModule(PlayerAssetModuleS).addPropAndSave(player.playerId, savedData);
}, "测试")


AddGMCommand("添加异常币", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(ShopModuleS).addGameCoin(Number(value), player);
}, "shop")

AddGMCommand("已现在的时间加X天VIP天数", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(ShopModuleS).test_VIP(player, Number(value));
}, "shop")

AddGMCommand("位置", (player: Player, value: string) => {
    let vs = value.split("|");
    if (vs.length != 3) {
        console.error("交互 参数有问题", value)
        return;
    }
    ModuleService.getModule(PlayerModuleC).test(new Vector(Number(vs[0]), Number(vs[1]), Number(vs[2])));
}, async (player: Player, value: string) => {
}, "摄像机特效")

AddGMCommand("换装", (player: Player, value: string) => {

}, async (player: Player, value: string) => {

    let vs = value.split("|");
    if (vs.length != 2) {
        console.error(" 参数有问题 guid|换装id", value)
        return;
    }
    GameObject.asyncFindGameObjectById(vs[0]).then((obj) => {
        let char = obj as Character;
        char.displayName = ""
        char.setDescription([vs[1]]);
        console.warn(`lwj 换装成功${vs[1]}`);
    })
}, "NPC 换装")

AddGMCommand("完成一次任务", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(GuideModuleS).finishOnce(Number(value), player.playerId);
    console.warn(`完成id:${value}任务一次`)
}, "测试")

AddGMCommand("完成所有任务", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    ModuleService.getModule(GuideModuleS).finishAllTask(player.playerId);
    console.warn(`完成所有任务`)
}, "测试")

AddGMCommand("新一天", (player: Player, value: string) => {
}, async (player: Player, value: string) => {

    GlobalAnalytics.instance.reset();
    ModuleService.getModule(AnalyticsModuleS).resetData(player.playerId);

}, "埋点")
AddGMCommand("攻击NPC", (player: Player, value: string) => {
}, async (player: Player, value: string) => {
    ModuleService.getModule(AnalyticsModuleS).AttNPC(player.playerId);

}, "埋点")
AddGMCommand("解救", (player: Player, value: string) => {
    ModuleService.getModule(AnalyticsModuleC).playerRescue();
}, async (player: Player, value: string) => {

}, "埋点")

AddGMCommand("切换到白天", (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleC).isPause = true;
}, (player: mw.Player, value: string) => {
    let modeList = GlobalData.Mode.modeList;
    let mode = Number(value);
    if (value == null || modeList.includes(Number(value)) == false) {
        mode = utils.randomSelect(modeList);
    }
    console.log("GM value = " + value)
    ModuleService.getModule(TimeModuleS).nextDay(mode);

}, "时间");

AddGMCommand("切换到夜晚", (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleC).isPause = true;
}, (player: mw.Player, value: string) => {
    let timeMS = ModuleService.getModule(TimeModuleS);
    ModuleService.getModule(TimeModuleS).isPause = true;
    // let conf = GlobalData.GlobalEnvironment;
    // timeMS.curTime = conf.dayDuration + conf.dayToDuskDuration + conf.duskDuration + conf.duskToNightDuration - 1;
    timeMS.onNightStart.call(timeMS.mode);

}, "时间");


AddGMCommand("播放动画", (player: mw.Player, value: string) => {
    let cfg = GameConfig.Animation.getElement(Number(value));
    AnimationPlayManager.instance.playAnimationEditor(
        Player.localPlayer.character,
        cfg.Animation)
}, (player: mw.Player, value: string) => {

}, "动画编辑器");


AddGMCommand("瞬移", (player: mw.Player, value: string) => {
    let vec = value.split(" ");
    let x = vec[0].split("=")[1];
    let y = vec[1].split("=")[1];
    let z = vec[2].split("=")[1];
    Player.localPlayer.character.worldTransform.position = new Vector(Number(x), Number(y), Number(z));
}, (player: mw.Player, value: string) => {

}, "瞬移");




AddGMCommand("暂停时间", (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleC).isPause = true;
}, (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleS).isPause = true;
}, "时间");

AddGMCommand("恢复暂停时间", (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleC).isPause = false;
}, (player: mw.Player, value: string) => {
    ModuleService.getModule(TimeModuleS).isPause = false;
}, "时间");

AddGMCommand("添加道具", (player: mw.Player, id: string) => {
    console.log("添加道具 " + id);
    ModuleService.getModule(BagModuleC).addPropToBag(Number(id));
}, (player: mw.Player, value: string) => {

}, "道具");


AddGMCommand("删除道具", (player: mw.Player, key: string) => {
    console.log("删除道具 " + key);
    ModuleService.getModule(BagModuleC).delPropFromBag(Number(key));
}, (player: mw.Player, value: string) => {

}, "道具");


AddGMCommand("播放动画编辑器动画", async (player: mw.Player, value: string) => {
    isNaN(Number(value)) ? console.error("播放动画编辑器动画 参数有问题", value) : utils.playAnimation(player.character, Number(value));
}, (player: mw.Player, value: string) => {

}, "交互");


AddGMCommand("加(+)/扣(-)血", (player: Player, value: string) => {

}, (player: Player, value: string) => {
    if (StringUtil.isEmpty(value)) {
        console.error("血量参数有问题")
        return;
    }
    ModuleService.getModule(PlayerModuleS).changeHp(player.playerId, Number(value));
}, "玩家")

AddGMCommand("当前玩家死亡(0)/复活(1)", (player: Player, value: string) => {

}, (player: Player, value: string) => {
    if (StringUtil.isEmpty(value)) {
        console.error("参数有问题", value)
        return;
    }
    if (Number(value) == 0) {

    } else if (Number(value) == 1) {
        // ModuleService.getModule(PlayerModuleS).revivePlayerById(player.playerId);
    }
}, "玩家")

AddGMCommand("修改相机offset(x|y|z)", (player: Player, value: string) => {
    let vs = value.split("|");
    if (vs.length != 3) {
        console.error("相机修改参数有问题", value)
        return;
    }
    Camera.currentCamera['offset'] = new Vector(Number(vs[0]), Number(vs[1]), Number(vs[2]));
    console.error(" 相机修改参数", Camera.currentCamera['offset'])
}, (player: Player, value: string) => {
}, "工具")

AddGMCommand("获取相机配置", (player: Player, value: string) => {

    console.error(" 相机Pos", Camera.currentCamera.localTransform.position)
    console.error(" 相机弹簧臂", Camera.currentCamera.springArm.length)
}, (player: Player, value: string) => {
}, "工具")

AddGMCommand("修改相机偏移(x|y|z)", (player: Player, value: string) => {
    let vs = value.split("|");
    if (vs.length != 3) {
        console.error("相机修改参数有问题", value)
        return;
    }
    Camera.currentCamera.localTransform.position = new Vector(Number(vs[0]), Number(vs[1]), Number(vs[2]));
    console.error(" 相机修改参数", Camera.currentCamera.localTransform.position)
}, (player: Player, value: string) => {
}, "工具")

AddGMCommand("修改相机旋转(x|y|z)", (player: Player, value: string) => {
    let vs = value.split("|");
    if (vs.length != 3) {
        console.error("相机修改参数有问题", value)
        return;
    }
    Camera.currentCamera.localTransform.rotation = new Rotation(Number(vs[0]), Number(vs[1]), Number(vs[2]));
    console.error(" 相机修改参数", Camera.currentCamera.localTransform.rotation)
}, (player: Player, value: string) => {
}, "工具")

AddGMCommand("弹簧臂长度", (player: Player, value: string) => {

    Camera.currentCamera.springArm.length = Number(value);
}, (player: Player, value: string) => {
}, "工具")
AddGMCommand("播姿态", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.play();
}, async (player: Player, value: string) => {

}, "动画姿态")

AddGMCommand("播姿态(下半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.blendMode = StanceBlendMode.BlendLower;
    anim.play();
}, async (player: Player, value: string) => {

}, "动画姿态")

AddGMCommand("播姿态(上半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.blendMode = StanceBlendMode.BlendUpper;
    anim.play();
}, async (player: Player, value: string) => {

}, "动画姿态")






AddGMCommand("播动画(下半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    let anim = character.loadAnimation(postureId);
    anim.loop = 0;
    anim.slot = AnimSlot.Lower;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "动画姿态")

AddGMCommand("播动画(上半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    let anim = character.loadAnimation(postureId);
    anim.loop = 0;
    anim.slot = AnimSlot.Upper;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "动画姿态")
AddGMCommand("播动画(正常预览)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    let anim = character.loadAnimation(postureId);
    anim.loop = 0
    anim.play();
}, async (player: Player, value: string) => {

}, "动画姿态")

let visible = false;


AddGMCommand("突进", (player: Player, value: string) => {
    let mCharacter = Player.localPlayer.character;
    let impulse = mCharacter.worldTransform.transformDirection(new Vector(Number(value), 0, 0));
    mCharacter.addImpulse(impulse, true);
    console.log("添加冲量");
}, (player: Player, value: string) => {

}, "Buff")


AddGMCommand("播放动画", (player: Player, value: string) => {


}, async (player: Player, value: string) => {
    utils.downloadAsset(value).then(() => {
        let anim = player.character.loadAnimation(value);
        anim.loop = 0;
        anim.play()
    })
}, "玩家人物")

AddGMCommand("停止动画", (player: Player, value: string) => {


}, async (player: Player, value: string) => {
    player.character.currentAnimation?.stop();
}, "玩家人物")


let eff1: Effect = null;
AddGMCommand("绑定", (player: Player, value: string) => {
    // if(eff1) eff1.stop();
    let camera = Camera.currentCamera;
    eff1 = GameObject.spawn(value) as Effect;
    console.log("生成特效成功" + value);
    eff1.parent = camera;
    eff1.localTransform.position = new Vector(90, 0, 0);
    eff1.localTransform.rotation = new Rotation(0, 0, 90);
    eff1.worldTransform.scale = Vector.one;
    eff1.loop = true;
    eff1.play();

}, async (player: Player, value: string) => {

}, "屏幕特效")

AddGMCommand("位置", (player: Player, value: string) => {
    let vec = value.split("|");
    eff1.localTransform.position = new Vector(Number(vec[0]), Number(vec[1]), Number(vec[2]));

}, async (player: Player, value: string) => {

}, "屏幕特效")


AddGMCommand("旋转", (player: Player, value: string) => {
    let vec = value.split("|");
    eff1.localTransform.rotation = new Rotation(Number(vec[0]), Number(vec[1]), Number(vec[2]));

}, async (player: Player, value: string) => {

}, "屏幕特效")


AddGMCommand("缩放", (player: Player, value: string) => {
    let vec = value.split("|");
    eff1.localTransform.scale = new Vector(Number(vec[0]), Number(vec[1]), Number(vec[2]));

}, async (player: Player, value: string) => {

}, "屏幕特效")

AddGMCommand("颜色", (player: Player, value: string) => {
    eff1.setColor("Color", LinearColor.colorHexToLinearColor(value));

}, async (player: Player, value: string) => {

}, "屏幕特效")


AddGMCommand("设置胶囊体", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.setCollisionShapeAndExtent(CustomShapeType.HorizontalCapsule, new Vector(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2])));
}, "测试")

AddGMCommand("设置玩家local位置", (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.localTransform.position = new Vector(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2]));
    player.character.localTransform.rotation = new Rotation(0, 0, 0);
}, async (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.localTransform.position = new Vector(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2]));
    player.character.localTransform.rotation = new Rotation(0, 0, 0);
}, "测试")

AddGMCommand("设置玩家local旋转", (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.localTransform.rotation = new Rotation(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2]));
}, async (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.localTransform.rotation = new Rotation(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2]));
}, "测试")

AddGMCommand("设置玩家world位置", (player: Player, value: string) => {

}, async (player: Player, value: string) => {
    let vecLs = value.split(",");
    player.character.worldTransform.position = new Vector(Number(vecLs[0]), Number(vecLs[1]), Number(vecLs[2]));
}, "测试")

AddGMCommand("播姿态", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    // let anim1 = character.loadAnimation(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.blendMode = StanceBlendMode.WholeBody;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "测试")

AddGMCommand("播姿态(下半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    // let anim1 = character.loadAnimation(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.blendMode = StanceBlendMode.BlendLower;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "测试")

AddGMCommand("播姿态(上半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    // let anim1 = character.loadAnimation(postureId);
    if (character.currentAnimation) character.currentAnimation.stop();
    let anim = character.loadSubStance(value);
    anim.blendMode = StanceBlendMode.BlendUpper;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "测试")






AddGMCommand("播动画(下半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    let anim = character.loadAnimation(postureId);
    anim.loop = 0;
    anim.slot = AnimSlot.Lower;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "测试")

AddGMCommand("播动画(上半身)", (player: Player, value: string) => {
    let character = player.character;
    // 姿态id
    let postureId = value;
    if (!AssetUtil.assetLoaded(postureId)) AssetUtil.asyncDownloadAsset(postureId);
    let anim = character.loadAnimation(postureId);
    anim.loop = 0;
    anim.slot = AnimSlot.Upper;
    anim.play();
    console.log("播放动画" + value);
}, async (player: Player, value: string) => {

}, "测试")

type AreaData = {
    id: number,
    areaPoints: mw.Vector[];
}
AddGMCommand("导出", async (player: mw.Player, value: string) => {

    let arr: AreaData[] = [];
    await getPoints(arr, value);
    let str = JSON.stringify(arr);
    console.log("areaDatas:" + str);

}, (player: mw.Player, value: string) => {

}, "导出所有点");

let childPlayer: Character = null;
AddGMCommand("绑定子玩家", async (player: mw.Player, value: string) => {

}, (player: mw.Player, value: string) => {
    console.log("绑定，，，，");

    Player.getAllPlayers().forEach((_player) => {
        if (_player.playerId != player.playerId) {
            let childChar = _player.character;
            childChar.parent = player.character;
            childChar.setCollision(CollisionStatus.Off);
            childPlayer = childChar;
            console.log("绑定成功");
        }
    })
    console.log(`共有${Player.getAllPlayers().length}个玩家`)

}, "玩家绑玩家");


AddGMCommand("子玩家播动作", async (player: mw.Player, value: string) => {

}, async (player: mw.Player, value: string) => {
    if (AssetUtil.assetLoaded(value)) await AssetUtil.asyncDownloadAsset(value);
    let anim = childPlayer.loadAnimation(value);
    anim.loop = 0;
    anim.play()
}, "玩家绑玩家");

AddGMCommand("子玩家偏移", async (player: mw.Player, value: string) => {

}, async (player: mw.Player, value: string) => {

    let v3List = value.split(",")
    let pos = new Vector(Number(v3List[0]), Number(v3List[1]), Number(v3List[2]));
    childPlayer.localTransform.position = pos;
}, "玩家绑玩家");


AddGMCommand("子玩家旋转", async (player: mw.Player, value: string) => {

}, async (player: mw.Player, value: string) => {

    let v3List = value.split(",")
    let rot = new Rotation(Number(v3List[0]), Number(v3List[1]), Number(v3List[2]));
    childPlayer.localTransform.rotation = rot;
}, "玩家绑玩家");
// --------------------------------------------------------------------------------

async function getPoints(arr: AreaData[], guid: string) {
    let obj = await GameObject.asyncFindGameObjectById(guid);
    if (!obj) {
        console.error("找不到对象", guid);
        return;
    }
    for (let i = 0; i < obj.getChildren().length; i++) {
        const element = obj.getChildren()[i];
        let a: AreaData = {
            id: 0,
            areaPoints: []
        };
        a.id = i + 1;
        let loc = element.worldTransform.position.clone();
        loc.x = Number(loc.x.toFixed(2));
        loc.y = Number(loc.y.toFixed(2));
        loc.z = Number(loc.z.toFixed(2));
        a.areaPoints.push(loc);
        arr.push(a);
    }
}