'use strict';

// @Component
// export default class MusicManager extends mw.Script {
//     protected onStart(): void {
//         let isBGMPlaying: boolean = true;
//         if(SystemUtil.isServer()){
//             if(isBGMPlaying){
//                 this.playGlobalBGM();
//             }
//         }
//     }
//     private playGlobalBGM(): void {
//         const bgmSoundAssetId = "129959";
//         SoundService.play3DSound("129959");
//     }
// }

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let ConveyorBeltTS = class ConveyorBeltTS extends Script {
    onStart() {
        this.Trigger = this.gameObject;
        this.player = [];
        this.Trigger.onEnter.add((go) => {
            if (go instanceof mw.Character && !this.player.includes(go)) {
                this.player.push(go);
            }
        });
        this.Trigger.onLeave.add((go) => {
            if (go && this.player.includes(go)) {
                this.player.splice(this.player.indexOf(go), 1);
            }
        });
        this.MoverValue = this.Trigger.worldTransform.getForwardVector().normalize();
        console.log(`触发器正方向` + this.MoverValue);
        // 开启帧更新
        this.useUpdate = true;
    }
    onUpdate(dt) {
        if (this.player && this.player.length > 0 && SystemUtil.isClient()) {
            this.player.forEach((go) => {
                let location = go.worldTransform.position;
                // 添加距离需要用帧时间校准
                // location.x = location.x + dt*200;
                location = location.add((this.Trigger.worldTransform.getForwardVector().normalize()).multiply(dt * 300));
                go.worldTransform.position = location;
            });
        }
    }
};
ConveyorBeltTS = __decorate([
    Component
], ConveyorBeltTS);
var ConveyorBeltTS$1 = ConveyorBeltTS;

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ConveyorBeltTS$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/TimeUI.ui
*/
let TimeUI_Generate = class TimeUI_Generate extends UIScript {
    get textTime() {
        if (!this.textTime_Internal && this.uiWidgetBase) {
            this.textTime_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textTime');
        }
        return this.textTime_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
TimeUI_Generate = __decorate([
    UIBind('UI/TimeUI.ui')
], TimeUI_Generate);
var TimeUI_Generate$1 = TimeUI_Generate;

var foreign137 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TimeUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.15-16.34.58
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class TimeUI extends TimeUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign102 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TimeUI
});

let CountDown = class CountDown extends Script {
    constructor() {
        super(...arguments);
        //当前时间
        this.curTime = 0;
        //是否结束
        this.isEnd = false;
    }
    onStart() {
        Event.addLocalListener("initCountDown", (limtime) => {
            this.Init(limtime);
        });
    }
    Init(limtime) {
        if (SystemUtil.isServer()) {
            this.curTime = limtime;
            Event.addLocalListener("Level4End", () => { this.curTime = 0; });
            Event.addLocalListener("Level5End", () => { this.curTime = 0; });
            let timeUtilId = TimeUtil.setInterval(() => {
                this.curTime -= 1;
                if (this.curTime <= 0) {
                    TimeUtil.clearInterval(timeUtilId);
                    this.GameEnd();
                }
            }, 1);
        }
        if (SystemUtil.isClient()) {
            // 创建UI
            this.ui = mw.createUI("TimeUI", TimeUI);
            this.ui.uiWidgetBase.addToViewport(1);
        }
    }
    GameEnd() {
        if (SystemUtil.isServer()) {
            console.log("执行GameEnd");
            Event.dispatchToLocal("LevelEnd");
        }
    }
    //时间更新，客户端执行
    onTimeChange() {
        //console.log("时间变化")
        this.ui.textTime.text = this.curTime.toString();
        //关闭ui
        if (this.curTime <= 0) {
            this.ui.setVisible(false);
            Event.dispatchToLocal("LookWarEnd");
        }
    }
};
__decorate([
    Property({ replicated: true, onChanged: "onTimeChange" })
], CountDown.prototype, "curTime", void 0);
__decorate([
    Property({ replicated: true })
], CountDown.prototype, "isEnd", void 0);
CountDown = __decorate([
    Component
], CountDown);
var CountDown$1 = CountDown;

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CountDown$1
});

class PlayerData extends Subdata {
    // 初始化默认数据
    initDefaultData() {
        this.WonderCion = 0;
        this.WonderUmb = 0;
        this.TotalScore = 0;
        this.TotalSession = 0;
    }
    AddWonderCion(num) {
        this.WonderCion += num;
    }
    AddWonderUmb(num) {
        this.WonderUmb += num;
    }
    AddTotalScore(num) {
        this.TotalScore += num;
    }
    AddTotalSession(num) {
        this.TotalSession += num;
    }
}
__decorate([
    Decorator.persistence()
], PlayerData.prototype, "WonderCion", void 0);
__decorate([
    Decorator.persistence()
], PlayerData.prototype, "WonderUmb", void 0);
__decorate([
    Decorator.persistence()
], PlayerData.prototype, "TotalScore", void 0);
__decorate([
    Decorator.persistence()
], PlayerData.prototype, "TotalSession", void 0);

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerData
});

class GlobalManager {
    //初始化
    constructor() {
        this.levelList = [4, 4]; // 初始化关卡顺序数组
        this.levelCount = 0; // 初始化当前关卡次数
        this.GameType = -1; //0表示任意玩   1表示闯关赛
        this.levelId = 0; // 当前玩法id，大厅为0
        this.LevelTimeMap = new Map(); // key：关卡id  value：关卡倒计时
        this.PlayerMap = new Map(); //当前游戏中玩家分数信息 key玩家id，value分数
        this.PlayerIsInDaTingMap = new Map(); //当前游戏中玩家是否在大厅 key玩家id，value是否在大厅
        //初始化操作
        this.Init();
        this.SetRandomLevelList();
        //设置玩法及其对应倒计时
        this.LevelTimeMap.set(1, 40);
        this.LevelTimeMap.set(2, 40);
        this.LevelTimeMap.set(3, 60);
        this.LevelTimeMap.set(4, 120);
        this.LevelTimeMap.set(5, 100);
        this.LevelTimeMap.set(6, 50);
        this.LevelTimeMap.set(7, 75);
        this.LevelTimeMap.set(8, 65);
    }
    Init() {
        //初始化操作
        this.levelId = 0;
        this.GameType = -1;
        this.levelCount = 0;
        this.PlayerMap.clear();
    }
    SetRandomLevelList() {
        this.setLevelList(this.generateRandomLevelList());
    }
    generateRandomLevelList() {
        return [...this.levelList].sort(() => Math.random() - 0.5);
    }
    // 获取单例实例
    static getInstance() {
        if (!GlobalManager._instance) {
            GlobalManager._instance = new GlobalManager();
        }
        return GlobalManager._instance;
    }
    // 公共方法来设置和获取全局变量
    setLevelList(list) {
        this.levelList = list;
    }
    getLevelList() {
        return this.levelList;
    }
    setLevelCount(count) {
        this.levelCount = count;
    }
    getLevelCount() {
        return this.levelCount;
    }
    setGameType(n) {
        this.GameType = n;
    }
    getGameType() {
        return this.GameType;
    }
    setLevelId(id) {
        this.levelId = id;
    }
    getLevelId() {
        return this.levelId;
    }
    getLevelTime(id) {
        return this.LevelTimeMap.get(id);
    }
    //增加玩家分数
    AddPlayerScore(playerId, score) {
        if (this.PlayerMap.has(playerId)) {
            let oldScore = this.PlayerMap.get(playerId);
            this.PlayerMap.set(playerId, oldScore + score);
        }
        else {
            this.PlayerMap.set(playerId, score);
        }
    }
    //获取玩家分数
    GetPlayerScore(playerId) {
        if (this.PlayerMap.has(playerId)) {
            return this.PlayerMap.get(playerId);
        }
        else {
            return 0;
        }
    }
    //判断玩家id是否存在PlayerMap
    IsPlayerExist(playerId) {
        return this.PlayerMap.has(playerId);
    }
    //清空PlayerMap
    ClearPlayerMap() {
        this.PlayerMap.clear();
    }
    //获取PlayerMap中的所有玩家id列表
    GetPlayerIdList() {
        let playerIdList = [];
        this.PlayerMap.forEach((value, key) => {
            playerIdList.push(key);
        });
        return playerIdList;
    }
    //判断玩家是否在大厅
    IsPlayerInDaTing(playerId) {
        if (this.PlayerIsInDaTingMap.has(playerId)) {
            return this.PlayerIsInDaTingMap.get(playerId);
        }
        else {
            return false;
        }
    }
    //设置玩家是否在大厅
    SetPlayerInDaTing(playerId, isInDaTing) {
        this.PlayerIsInDaTingMap.set(playerId, isInDaTing);
    }
}

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GlobalManager
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/CGSInitUI.ui
*/
let CGSInitUI_Generate = class CGSInitUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CGSInitUI_Generate = __decorate([
    UIBind('UI/DaTingUI/CGSInitUI.ui')
], CGSInitUI_Generate);
var CGSInitUI_Generate$1 = CGSInitUI_Generate;

var foreign104 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGSInitUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.09-10.56.32
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class CGSInitUI extends CGSInitUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign83 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGSInitUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/CGSTSUI.ui
*/
let CGSTSUI_Generate = class CGSTSUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CGSTSUI_Generate = __decorate([
    UIBind('UI/DaTingUI/CGSTSUI.ui')
], CGSTSUI_Generate);
var CGSTSUI_Generate$1 = CGSTSUI_Generate;

var foreign105 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGSTSUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.09-10.56.32
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class CGSTSUI extends CGSTSUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign84 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGSTSUI
});

let CGSMatch = class CGSMatch extends Script {
    constructor() {
        super(...arguments);
        this.curLevel = 0;
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isServer()) {
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    let globalManager = GlobalManager.getInstance();
                    if (globalManager.getGameType() != -1) {
                        return;
                    }
                    //绑定光环称号
                    this.AttachHalo(chara.player);
                    const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
                    allPlayersIds.forEach(playerId => {
                        this.ShowCGSUI(Player.getPlayer(playerId));
                    });
                    globalManager.setGameType(1); //闯关赛玩法
                    globalManager.setLevelCount(0);
                    setTimeout(() => {
                        globalManager.setLevelId(globalManager.getLevelList()[this.curLevel]);
                        console.log("curLevel ", this.curLevel);
                        this.curLevel = this.curLevel + 1;
                        if (this.curLevel >= 8) {
                            this.curLevel = 0;
                            //设置随机关卡
                            globalManager.SetRandomLevelList();
                        }
                        let CGSLevelStr = "CGS_Level" + globalManager.getLevelId();
                        console.log("闯关赛事件 ", CGSLevelStr);
                        Event.dispatchToLocal(CGSLevelStr);
                    }, 5 * 1000);
                }
            });
        }
    }
    async AttachHalo(player) {
        let TarHaloObj = GameObject.findGameObjectByName("光环称号");
        let HaloObj = TarHaloObj.clone();
        HaloObj.worldTransform.scale = new Vector(0.2, 0.2, 0.2);
        await player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration.add(HaloObj, new Transform(new Vector(0, 0, 0), new Rotation(0, 0, 0), new Vector(1, 1, 1)));
        setTimeout(() => {
            let obj = player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration[0].attachmentGameObject;
            if (obj) {
                player.character.description.advance.slotAndDecoration.slot[HumanoidSlotType.ChatFrame].decoration.delete(obj, true);
                //player.character.meshPositionOffset = new Vector(0, 0, 0)
            }
        }, 30 * 1000);
    }
    ShowCGSUI(player) {
        let ui = mw.createUI("DaTingUI/CGSInitUI", CGSInitUI);
        ui.uiWidgetBase.addToViewport(10);
        setTimeout(() => {
            ui.destroy();
        }, 4.9 * 1000);
    }
    ShowCGSTSUI(player) {
        let ui = mw.createUI("DaTingUI/CGSTSUI", CGSTSUI);
        ui.uiWidgetBase.addToViewport(10);
        setTimeout(() => {
            ui.destroy();
        }, 3 * 1000);
    }
};
__decorate([
    RemoteFunction(Client, Multicast)
], CGSMatch.prototype, "AttachHalo", null);
__decorate([
    RemoteFunction(Client)
], CGSMatch.prototype, "ShowCGSUI", null);
__decorate([
    RemoteFunction(Client)
], CGSMatch.prototype, "ShowCGSTSUI", null);
CGSMatch = __decorate([
    Component
], CGSMatch);
var CGSMatch$1 = CGSMatch;

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGSMatch$1
});

let PrepareTrigger = class PrepareTrigger extends Script {
    constructor() {
        super(...arguments);
        this.TSUI = null;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            let globalManager = GlobalManager.getInstance();
            let trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) {
                    globalManager.SetPlayerInDaTing(other.player.userId, true);
                    console.log("进入大厅准备区域触发器 " + globalManager.getGameType().toString());
                    if (globalManager.getGameType() != -1) {
                        this.ShowTSUI(other.player);
                    }
                }
            });
            trigger.onLeave.add((other) => {
                if (other instanceof Character) {
                    globalManager.SetPlayerInDaTing(other.player.userId, false);
                    console.log("退出大厅准备区域触发器");
                    this.UnShowTSUI(other.player);
                }
            });
        }
    }
    ShowTSUI(player) {
        if (this.TSUI == null) {
            this.TSUI = mw.createUI("DaTingUI/CGSTSUI", CGSTSUI);
            this.TSUI.uiWidgetBase.addToViewport(10);
        }
    }
    UnShowTSUI(player) {
        if (this.TSUI != null) {
            this.TSUI.destroy();
            this.TSUI = null;
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
__decorate([
    RemoteFunction(Client)
], PrepareTrigger.prototype, "ShowTSUI", null);
__decorate([
    RemoteFunction(Client)
], PrepareTrigger.prototype, "UnShowTSUI", null);
PrepareTrigger = __decorate([
    Component
], PrepareTrigger);
var PrepareTrigger$1 = PrepareTrigger;

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PrepareTrigger$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/HotTimeUI.ui
*/
let HotTimeUI_Generate = class HotTimeUI_Generate extends UIScript {
    get number_2() {
        if (!this.number_2_Internal && this.uiWidgetBase) {
            this.number_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number_2');
        }
        return this.number_2_Internal;
    }
    get number() {
        if (!this.number_Internal && this.uiWidgetBase) {
            this.number_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number');
        }
        return this.number_Internal;
    }
    get number_1() {
        if (!this.number_1_Internal && this.uiWidgetBase) {
            this.number_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/number_1');
        }
        return this.number_1_Internal;
    }
    get image_go() {
        if (!this.image_go_Internal && this.uiWidgetBase) {
            this.image_go_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/image_go');
        }
        return this.image_go_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
HotTimeUI_Generate = __decorate([
    UIBind('UI/HotTimeUI.ui')
], HotTimeUI_Generate);
var HotTimeUI_Generate$1 = HotTimeUI_Generate;

var foreign114 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HotTimeUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.28-09.13.39
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class HotTimeUI extends HotTimeUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign85 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HotTimeUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L1UI/L1_IntroUI.ui
*/
let L1_IntroUI_Generate = class L1_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L1_IntroUI_Generate = __decorate([
    UIBind('UI/L1UI/L1_IntroUI.ui')
], L1_IntroUI_Generate);
var L1_IntroUI_Generate$1 = L1_IntroUI_Generate;

var foreign115 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L1_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.31-16.06.38
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L1_IntroUI extends L1_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign86 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L1_IntroUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/LevelLoadUI.ui
*/
let LevelLoadUI_Generate = class LevelLoadUI_Generate extends UIScript {
    get levelImage1() {
        if (!this.levelImage1_Internal && this.uiWidgetBase) {
            this.levelImage1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/levelImage1');
        }
        return this.levelImage1_Internal;
    }
    get levelImage3() {
        if (!this.levelImage3_Internal && this.uiWidgetBase) {
            this.levelImage3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1_1/levelImage3');
        }
        return this.levelImage3_Internal;
    }
    get levelImage2() {
        if (!this.levelImage2_Internal && this.uiWidgetBase) {
            this.levelImage2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1/levelImage2');
        }
        return this.levelImage2_Internal;
    }
    get levelImage4() {
        if (!this.levelImage4_Internal && this.uiWidgetBase) {
            this.levelImage4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1_1_1/levelImage4');
        }
        return this.levelImage4_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
LevelLoadUI_Generate = __decorate([
    UIBind('UI/LevelLoadUI.ui')
], LevelLoadUI_Generate);
var LevelLoadUI_Generate$1 = LevelLoadUI_Generate;

var foreign132 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LevelLoadUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.13-21.40.26
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class LevelLoadUI extends LevelLoadUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    ShowLevelUIById(levelId) {
        levelId = levelId + 1;
        if (levelId == 1)
            this.ShowLevel1UI();
        if (levelId == 2)
            this.ShowLevel2UI();
        if (levelId == 3)
            this.ShowLevel3UI();
        if (levelId == 4)
            this.ShowLevel4UI();
    }
    //显示关卡1UI
    ShowLevel1UI() {
        this.levelImage1.visibility = SlateVisibility.Visible;
        this.levelImage2.visibility = SlateVisibility.Hidden;
        this.levelImage3.visibility = SlateVisibility.Hidden;
        this.levelImage4.visibility = SlateVisibility.Hidden;
    }
    //显示关卡2UI
    ShowLevel2UI() {
        this.levelImage1.visibility = SlateVisibility.Hidden;
        this.levelImage2.visibility = SlateVisibility.Visible;
        this.levelImage3.visibility = SlateVisibility.Hidden;
        this.levelImage4.visibility = SlateVisibility.Hidden;
    }
    //显示关卡3UI
    ShowLevel3UI() {
        this.levelImage1.visibility = SlateVisibility.Hidden;
        this.levelImage2.visibility = SlateVisibility.Hidden;
        this.levelImage3.visibility = SlateVisibility.Visible;
        this.levelImage4.visibility = SlateVisibility.Hidden;
    }
    //显示关卡4UI
    ShowLevel4UI() {
        this.levelImage1.visibility = SlateVisibility.Hidden;
        this.levelImage2.visibility = SlateVisibility.Hidden;
        this.levelImage3.visibility = SlateVisibility.Hidden;
        this.levelImage4.visibility = SlateVisibility.Visible;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign97 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LevelLoadUI
});

let L_1 = class L_1 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.useUpdate = true;
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法一bgm资源
            AssetUtil.asyncDownloadAsset("99390");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level1", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(1);
        Event.dispatchToLocal("Level1Init");
        //传送玩家到玩法1位置
        let levelpos = new Vector(37448.54, -10799.90, 2099.00);
        //进入玩法一后,禁用玩法一BGM
        setTimeout(() => {
            SoundService.stopSound("99390");
        }, 59 * 1000);
        //进入玩法一后,播放玩法一BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 9 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x, levelpos.y + MathUtil.randomFloat(-500.00, 500.00), levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, 0);
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                //玩家最大速度
                player.character.maxWalkSpeed = 400;
            }, 8 * 1000);
            this.AttachModel(player, globalManager.getLevelTime(1) + 8);
            this.InClientFun(player, globalManager.getLevelTime(1), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(1));
        }, 8 * 1000);
    }
    // 播放玩法1全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "99390";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    //添加挂载木桶模型
    async AttachModel(player, num) {
        let chara = player.character;
        chara.meshPositionOffset = new Vector(0, 0, 90);
        await chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.add("49905", new Transform(new Vector(10, 70, -240), new Rotation(-90, 0, 0), new Vector(2, 2, 2)));
        //chara.attachToSlot(MuTong, HumanoidSlotType.Root)
        let Obj;
        let timerId;
        //延时获取Obj
        setTimeout(() => {
            Obj = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
            console.log("rotation");
            timerId = TimeUtil.setInterval(() => {
                let x = Math.abs(chara.velocity.x);
                let y = Math.abs(chara.velocity.y);
                let result = Math.max(x, y);
                // 计算旋转速度
                let value = 360 * 1 * (30 / 1000) * (Math.PI / 180) * (result / chara.maxWalkSpeed);
                // 四元数进行转向
                let quater1 = Quaternion.fromRotation(Obj.localTransform.rotation);
                let quater2 = Quaternion.rotateAround(quater1, Vector.left, value);
                Obj.localTransform.rotation = quater2.toRotation();
            }, 0.01);
        }, 1000);
        chara.jumpEnabled = false;
        setTimeout(() => {
            TimeUtil.clearInterval(timerId);
            chara.jumpEnabled = true;
            let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
            if (ring) {
                chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
                chara.meshPositionOffset = new Vector(0, 0, 0);
            }
        }, num * 1000);
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 56 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L1UI/L1_IntroUI", L1_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 7 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 8 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 9 * 1000);
    }
    onUpdate(dt) {
        TweenUtil.TWEEN.update();
    }
};
__decorate([
    RemoteFunction(Client, Multicast)
], L_1.prototype, "AttachModel", null);
__decorate([
    RemoteFunction(Client)
], L_1.prototype, "InClientFun", null);
L_1 = __decorate([
    Component
], L_1);
var L_1$1 = L_1;

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_1$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L2UI/L2_IntroUI.ui
*/
let L2_IntroUI_Generate = class L2_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L2_IntroUI_Generate = __decorate([
    UIBind('UI/L2UI/L2_IntroUI.ui')
], L2_IntroUI_Generate);
var L2_IntroUI_Generate$1 = L2_IntroUI_Generate;

var foreign117 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L2_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.31-16.06.46
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L2_IntroUI extends L2_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign88 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L2_IntroUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L2UI/CoinUI.ui
*/
let CoinUI_Generate = class CoinUI_Generate extends UIScript {
    get coinCount() {
        if (!this.coinCount_Internal && this.uiWidgetBase) {
            this.coinCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/coinCount');
        }
        return this.coinCount_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CoinUI_Generate = __decorate([
    UIBind('UI/L2UI/CoinUI.ui')
], CoinUI_Generate);
var CoinUI_Generate$1 = CoinUI_Generate;

var foreign116 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CoinUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.29-08.55.51
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class CoinUI extends CoinUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.coinCount.text = "0";
        Event.addServerListener("UpdateCoin", (num) => {
            this.coinCount.text = num.toString();
        });
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign87 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CoinUI
});

let L_2 = class L_2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法二bgm资源
            AssetUtil.asyncDownloadAsset("186451");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level2", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(2);
        //传送玩家到玩法2位置
        let levelpos = GameObject.findGameObjectByName("Level2Start").worldTransform.position;
        //进入玩法二后,禁用玩法二BGM
        setTimeout(() => {
            SoundService.stopSound("186451");
        }, 54 * 1000);
        //进入玩法二后,播放玩法二BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 6 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x, levelpos.y + MathUtil.randomFloat(-500.00, 500.00), levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, 0);
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                // 玩家最大速度
                player.character.maxWalkSpeed = 400;
                //显示金币UI与设置玩家摄像机
                this.ShowCoinUI(player, globalManager.getLevelTime(2));
            }, 6 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(2), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(2));
            this.Level2Fun();
            Event.dispatchToLocal("Level2Init", globalManager.getLevelTime(2));
        }, 6 * 1000);
    }
    // 播放玩法2全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "186451";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    Level2Fun() {
    }
    ShowCoinUI(player, num) {
        let ui = mw.createUI("L2UI/CoinUI", CoinUI);
        ui.uiWidgetBase.addToViewport(2);
        Camera.currentCamera.springArm.length = 800;
        setTimeout(() => {
            ui.setVisible(false);
            Camera.currentCamera.preset = CameraPreset.Default;
            Camera.currentCamera.fov = 90;
            Camera.currentCamera.springArm.length = 400;
            Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
            Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
        }, num * 1000);
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 55 * 1000);
        //异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L2UI/L2_IntroUI", L2_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 7 * 1000);
    }
};
__decorate([
    RemoteFunction(Server)
], L_2.prototype, "Level2Fun", null);
__decorate([
    RemoteFunction(Client)
], L_2.prototype, "ShowCoinUI", null);
__decorate([
    RemoteFunction(Client)
], L_2.prototype, "InClientFun", null);
L_2 = __decorate([
    Component
], L_2);
var L_2$1 = L_2;

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_2$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L3UI/HurtUI.ui
*/
let HurtUI_Generate = class HurtUI_Generate extends UIScript {
    get hurtMsg() {
        if (!this.hurtMsg_Internal && this.uiWidgetBase) {
            this.hurtMsg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/hurtMsg');
        }
        return this.hurtMsg_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
HurtUI_Generate = __decorate([
    UIBind('UI/L3UI/HurtUI.ui')
], HurtUI_Generate);
var HurtUI_Generate$1 = HurtUI_Generate;

var foreign120 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HurtUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.27-08.37.22
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class HurtUI extends HurtUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        Event.addServerListener("UpdateHurt", (num) => {
            let damage = num / 30 * 100;
            //保留一位小数
            damage = Math.round(damage * 10) / 10;
            if (damage > 100.0)
                damage = 100;
            this.hurtMsg.text = "受伤程度:" + damage + "%";
        });
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    onUpdate(dt) {
    }
}

var foreign89 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HurtUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L3UI/L3_IntroUI.ui
*/
let L3_IntroUI_Generate = class L3_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L3_IntroUI_Generate = __decorate([
    UIBind('UI/L3UI/L3_IntroUI.ui')
], L3_IntroUI_Generate);
var L3_IntroUI_Generate$1 = L3_IntroUI_Generate;

var foreign121 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L3_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.31-16.06.51
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L3_IntroUI extends L3_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign90 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L3_IntroUI
});

let L_3 = class L_3 extends Script {
    constructor() {
        super(...arguments);
        //C
        this.selfEffect = null;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法三bgm资源
            AssetUtil.asyncDownloadAsset("140367");
            AssetUtil.asyncDownloadAsset("160737");
            AssetUtil.asyncDownloadAsset("266518");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level3", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(3);
        Event.dispatchToLocal("Level3Init");
        //传送玩家到玩法3位置
        let levelpos = GameObject.findGameObjectByName("Level3Start").worldTransform.position;
        //进入玩法三后,禁用玩法三BGM
        setTimeout(() => {
            SoundService.stopSound("140367");
        }, 77 * 1000);
        //进入玩法三后,播放玩法三BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 7 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x + MathUtil.randomFloat(-500.00, 500.00), levelpos.y, levelpos.z);
            //player.character.worldTransform.rotation = new Rotation(0,0,-179)
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                //显示受伤程度UI
                this.ShowHurtUI(player, globalManager.getLevelTime(3));
            }, 6 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(3), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(3));
            this.Level3Fun();
        }, 6 * 1000);
    }
    // 播放玩法3全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "140367";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    // //斗牛高玩法玩家高亮特效
    // @RemoteFunction(Client)
    // private ShowPlayer(chara:Character,num:number):void{
    //     EffectService.playOnGameObject("12212",chara, {slotType: HumanoidSlotType.Root,duration:3000,loopCount:0})
    // }
    ShowHurtUI(player, num) {
        this.selfEffect = EffectService.playOnGameObject("13403", player.character, { slotType: HumanoidSlotType.Root, loopCount: 0 });
        let ui = mw.createUI("L3UI/HurtUI", HurtUI);
        ui.uiWidgetBase.addToViewport(2);
        let myC = Camera.currentCamera;
        let Prot = player.character.worldTransform.rotation;
        let Crot = myC.worldTransform.rotation;
        let Srot = myC.springArm.worldTransform.rotation;
        //player.character.worldTransform.rotation = new Rotation(0,0,179)
        //Camera.currentCamera.worldTransform.rotation = new Rotation(0,0,179)
        //Camera.currentCamera.springArm.worldTransform.rotation = new Rotation(0,0,179)
        player.character.movementDirection = MovementDirection.AxisDirection;
        let L3C = GameObject.findGameObjectByName("L3摄像机");
        Camera.switch(L3C);
        console.log("Pr ", Prot.x, " ", Prot.y, " ", Prot.z);
        console.log("Cr ", Crot.x, " ", Crot.y, " ", Crot.z);
        console.log("Sr ", Srot.x, " ", Srot.y, " ", Srot.z);
        setTimeout(() => {
            EffectService.stop(this.selfEffect);
            ui.destroy();
            Camera.switch(myC);
            // Camera.currentCamera.preset = CameraPreset.Default;
            // Camera.currentCamera.fov = 90;
            // Camera.currentCamera.springArm.length = 400;
            // Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
            // Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
        }, num * 1000);
    }
    async Level3Fun() {
        //0-39s : 地板不动，牛频率少，一次出1-2个
        //40-79s :地板转动一般，牛频率中等，一次2-4个
        //80-119s :地板转动快，牛频率高，一次3-5个  
        let curTime = 0;
        let groundMover = await GameObject.asyncFindGameObjectById("2B1283DF");
        let groundMoverObj = await GameObject.asyncFindGameObjectById("2B1283DF");
        groundMover.enable = false;
        groundMover.rotationSpeed = new Vector(0, 0, 0);
        //播放牛冲撞时音效
        function PlaySound() {
            //console.log("播放牛冲撞时音效")
            SoundService.play3DSound("210087", groundMoverObj, 1, 1000, { radius: 2000, falloffDistance: 2000 });
        }
        const timerId = TimeUtil.setInterval(() => {
            let CowList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
            this.shuffleArray(CowList);
            if (curTime >= 2 && curTime < 40) {
                //4表示每隔4秒生成一波牛，该数值必须为整数
                if (curTime % 4 == 0) {
                    PlaySound();
                    //生成3-5之间的随机数，每波生成3-5个牛
                    let randomNum = MathUtil.randomInt(1, 4);
                    for (let i = 0; i < randomNum; i++) {
                        let ShootEvent = "L3_Shoot" + CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent);
                    }
                }
            }
            if (curTime >= 15 && curTime < 35) {
                groundMover.enable = true;
                //Vector(0,0,10)中的10为地板自转速度，可调
                groundMover.rotationSpeed = new Vector(0, 0, 10);
                //3表示每隔3秒生成一波牛，该数值必须为整数
                if (curTime % 3 == 0) {
                    PlaySound();
                    //生成4-6之间的随机数，每波生成4-6个牛
                    let randomNum = MathUtil.randomInt(2, 6);
                    for (let i = 0; i < randomNum; i++) {
                        let ShootEvent = "L3_Shoot" + CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent);
                    }
                }
            }
            if (curTime >= 35 && curTime < 59) {
                groundMover.enable = true;
                //Vector(0,0,20)中的10为地板自转速度，可调
                groundMover.rotationSpeed = new Vector(0, 0, 20);
                //2表示每隔2秒生成一波牛，该数值必须为整数
                if (curTime % 3 == 0) {
                    PlaySound();
                    //生成5-7之间的随机数，每波生成5-7个牛
                    let randomNum = MathUtil.randomInt(4, 8);
                    for (let i = 0; i < randomNum; i++) {
                        let ShootEvent = "L3_Shoot" + CowList[i].toString();
                        //console.log(ShootEvent)
                        Event.dispatchToLocal(ShootEvent);
                    }
                }
            }
            curTime += 1;
            if (curTime >= 59) {
                TimeUtil.clearInterval(timerId);
                groundMover.enable = false;
                groundMover.rotationSpeed = new Vector(0, 0, 0);
            }
        }, 1);
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // 生成从0到i的随机索引
            const j = Math.floor(Math.random() * (i + 1));
            // 交换元素array[i]和array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 75 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L3UI/L3_IntroUI", L3_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 7 * 1000);
    }
};
__decorate([
    RemoteFunction(Client)
], L_3.prototype, "ShowHurtUI", null);
__decorate([
    RemoteFunction(Server)
], L_3.prototype, "Level3Fun", null);
__decorate([
    RemoteFunction(Client)
], L_3.prototype, "InClientFun", null);
L_3 = __decorate([
    Component
], L_3);
var L_3$1 = L_3;

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_3$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L4UI/L4_IntroUI.ui
*/
let L4_IntroUI_Generate = class L4_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L4_IntroUI_Generate = __decorate([
    UIBind('UI/L4UI/L4_IntroUI.ui')
], L4_IntroUI_Generate);
var L4_IntroUI_Generate$1 = L4_IntroUI_Generate;

var foreign123 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L4_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.31-16.06.56
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L4_IntroUI extends L4_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign91 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L4_IntroUI
});

let L_4 = class L_4 extends Script {
    constructor() {
        super(...arguments);
        this.isEnd = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法四bgm资源
            AssetUtil.asyncDownloadAsset("132972");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level4", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        this.isEnd = false;
        Event.addLocalListener("Level4End", () => {
            this.isEnd = true;
            SoundService.stopSound("132972");
        });
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(4);
        //传送玩家到玩法4位置
        let levelpos = GameObject.findGameObjectByName("Level4Start").worldTransform.position;
        //进入玩法四后,禁用玩法四BGM
        setTimeout(() => {
            if (this.isEnd == false) {
                SoundService.stopSound("132972");
            }
        }, 136 * 1000);
        //进入玩法四后,播放玩法四BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 8 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = levelpos;
            player.character.movementEnabled = false;
            setTimeout(() => {
                player.character.movementEnabled = true;
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                Event.dispatchToLocal("Level4Init");
            }, 6 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(4), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(4));
            this.Level4Fun();
        }, 6 * 1000);
    }
    // 播放玩法4全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "132972";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    async Level4Fun() {
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 3 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L4UI/L4_IntroUI", L4_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 7 * 1000);
    }
};
__decorate([
    RemoteFunction(Server)
], L_4.prototype, "Level4Fun", null);
__decorate([
    RemoteFunction(Client)
], L_4.prototype, "InClientFun", null);
L_4 = __decorate([
    Component
], L_4);
var L_4$1 = L_4;

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_4$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L5UI/L5_IntroUI.ui
*/
let L5_IntroUI_Generate = class L5_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L5_IntroUI_Generate = __decorate([
    UIBind('UI/L5UI/L5_IntroUI.ui')
], L5_IntroUI_Generate);
var L5_IntroUI_Generate$1 = L5_IntroUI_Generate;

var foreign126 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L5_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.02-09.28.35
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L5_IntroUI extends L5_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign92 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L5_IntroUI
});

let L_5 = class L_5 extends Script {
    constructor() {
        super(...arguments);
        this.isEnd = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法bgm资源
            AssetUtil.asyncDownloadAsset("268224");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level5", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        this.isEnd = false;
        Event.addLocalListener("Level5End", () => {
            this.isEnd = true;
            SoundService.stopSound("268224");
        });
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(5);
        //传送玩家到玩法5位置
        let levelpos = GameObject.findGameObjectByName("Level5Start").worldTransform.position;
        //进入玩法五后,禁用玩法五BGM
        setTimeout(() => {
            if (this.isEnd == false) {
                SoundService.stopSound("268224");
            }
        }, 117 * 1000);
        setTimeout(() => {
            this.playGlobalBGM();
        }, 7 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x + MathUtil.randomFloat(-500.00, 500.00), levelpos.y, levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, -90);
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                Event.dispatchToLocal("Level5Init");
            }, 6 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(5), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(5));
            this.Level5Fun();
        }, 6 * 1000);
    }
    // 播放玩法5全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "268224";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    async Level5Fun() {
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 115 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L5UI/L5_IntroUI", L5_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 7 * 1000);
    }
};
__decorate([
    RemoteFunction(Server)
], L_5.prototype, "Level5Fun", null);
__decorate([
    RemoteFunction(Client)
], L_5.prototype, "InClientFun", null);
L_5 = __decorate([
    Component
], L_5);
var L_5$1 = L_5;

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_5$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L6UI/L6_IntroUI.ui
*/
let L6_IntroUI_Generate = class L6_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L6_IntroUI_Generate = __decorate([
    UIBind('UI/L6UI/L6_IntroUI.ui')
], L6_IntroUI_Generate);
var L6_IntroUI_Generate$1 = L6_IntroUI_Generate;

var foreign128 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L6_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.07-00.04.37
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L6_IntroUI extends L6_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign93 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L6_IntroUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L6UI/L6_ShootUI.ui
*/
let L6_ShootUI_Generate = class L6_ShootUI_Generate extends UIScript {
    get shootButton() {
        if (!this.shootButton_Internal && this.uiWidgetBase) {
            this.shootButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/shootButton');
        }
        return this.shootButton_Internal;
    }
    get bullets() {
        if (!this.bullets_Internal && this.uiWidgetBase) {
            this.bullets_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image_1/bullets');
        }
        return this.bullets_Internal;
    }
    get score() {
        if (!this.score_Internal && this.uiWidgetBase) {
            this.score_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TextBlock/score');
        }
        return this.score_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L6_ShootUI_Generate = __decorate([
    UIBind('UI/L6UI/L6_ShootUI.ui')
], L6_ShootUI_Generate);
var L6_ShootUI_Generate$1 = L6_ShootUI_Generate;

var foreign129 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L6_ShootUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.06-13.02.53
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L6_ShootUI extends L6_ShootUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign94 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L6_ShootUI
});

class SettlementManager {
    //初始化
    constructor() {
        this.playerLoseMap = new Map(); //玩家死亡数
        this.playerCountMap = new Map(); //玩家Count数，Count可以作为金币等
        this.curRank = 1; //当前排名
        this.playerRankMap = new Map(); //玩家排名
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        this.curRank = 1;
        playerIdList.forEach(element => {
            this.playerLoseMap.set(element, 0);
            this.playerCountMap.set(element, 0);
            this.playerRankMap.set(element, 0);
        });
    }
    //创建/获取单例
    static getInstance() {
        if (!SettlementManager._instance) {
            SettlementManager._instance = new SettlementManager();
        }
        return SettlementManager._instance;
    }
    //销毁单例
    static destroyInstance() {
        if (SettlementManager._instance) {
            SettlementManager._instance = null;
        }
    }
    //获取指定玩家死亡数
    GetPlayerLose(playerId) {
        return this.playerLoseMap.get(playerId);
    }
    //获取指定玩家Count数
    GetPlayerCount(playerId) {
        return this.playerCountMap.get(playerId);
    }
    //添加玩家Lose
    AddPlayerLose(playerId, lose) {
        let loseNum = this.playerLoseMap.get(playerId);
        this.playerLoseMap.set(playerId, loseNum + lose);
    }
    //添加玩家Count
    AddPlayerCount(playerId, count) {
        let countNum = this.playerCountMap.get(playerId);
        this.playerCountMap.set(playerId, countNum + count);
    }
    //添加通关玩家
    AddPlayerPass(playerId) {
        this.playerRankMap.set(playerId, this.curRank);
        this.curRank++;
    }
    //获取玩家排名
    GetPlayerRank(playerId) {
        return this.playerRankMap.get(playerId);
    }
    //获取玩家LoseMap
    GetPlayerLoseMap() {
        return this.playerLoseMap;
    }
    //获取玩家CountMap
    GetPlayerCountMap() {
        return this.playerCountMap;
    }
    //获取玩家RankMap
    GetPlayerRankMap() {
        return this.playerRankMap;
    }
}

var foreign81 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettlementManager
});

var MyClearGuns_1;
// ---------[非UI类基元]---------- //
/**音效通用基元 */
class SoundUnit {
    constructor() {
        this.guid = "7994";
        this.volume = 1;
        this.inner = 3;
        this.outter = 12;
    }
}
/**枪械数据通用基元 */
class GunDataUnit {
    constructor() {
        this.GunName = "scar-L";
        this.GunGUID = "43712";
        this.GunLoc = "4|0|0";
        this.GunRot = "0|0|-25";
        this.GunScal = "0.8|0.8|0.8";
        this.GetGunAnime = "97180";
        this.GetGunSound = "20429|1|3|6";
        this.GetGunShowTime = 0.5;
        this.Range = 20;
        this.Projectil_Damage = 30;
        this.Projectil_Count = 1;
        this.Recoil_H = 0.55;
        this.Recoil_V = 0.35;
        this.Spread = 0.2;
        this.FullAuto = true;
        this.ShootDelay = 100;
        this.ShootAnime = "80483";
        this.ShootSound = "12563|1|8|16";
        this.Ammo_CurNum = 30;
        this.Ammo_MaxInOne = 30;
        this.Ammo_CurPrepare = 180;
        this.Ammo_MaxPrepare = 360;
        this.ReloadDelay = 2;
        this.ReloadAnime = "33561";
        this.ReloadStartSound = "12525|1|3|6";
        this.ReloadOverSound = "12546|1|3|6";
    }
}
// ---------[UI类基元]---------- //
/**编辑态主要UI类 */
class MainUI extends UIScript {
    constructor() {
        super(...arguments);
        this.lable0 = undefined;
        this.input0 = undefined;
        this.lable1 = undefined;
        this.input1 = undefined;
        this.lable2 = undefined;
        this.input2 = undefined;
        this.lable3 = undefined;
        this.input3 = undefined;
        this.lable4 = undefined;
        this.input4 = undefined;
        this.lable5 = undefined;
        this.input5 = undefined;
        this.lable6 = undefined;
        this.input6 = undefined;
        this.lable7 = undefined;
        this.input7 = undefined;
        this.lable8 = undefined;
        this.input8 = undefined;
        this.lable9 = undefined;
        this.input9 = undefined;
        this.lable10 = undefined;
        this.input10 = undefined;
        this.lable11 = undefined;
        this.input11 = undefined;
        this.lable12 = undefined;
        this.input12 = undefined;
        this.lable13 = undefined;
        this.input13 = undefined;
        this.lable14 = undefined;
        this.input14 = undefined;
        this.lable15 = undefined;
        this.input15 = undefined;
        this.lable16 = undefined;
        this.input16 = undefined;
        this.lable17 = undefined;
        this.input17 = undefined;
        this.lable18 = undefined;
        this.input18 = undefined;
        this.lable19 = undefined;
        this.input19 = undefined;
        this.lable20 = undefined;
        this.input20 = undefined;
        this.lable21 = undefined;
        this.input21 = undefined;
        this.lable22 = undefined;
        this.input22 = undefined;
        this.lable23 = undefined;
        this.input23 = undefined;
        this.lable24 = undefined;
        this.input24 = undefined;
        this.lable25 = undefined;
        this.input25 = undefined;
        /**底部按钮容器 */
        this.btnCanv = undefined;
        /**界面显隐按钮 */
        this.hideShowBtn = undefined;
        /**序列化按钮 */
        this.enCodeBtn = undefined;
        /**反序列化按钮 */
        this.deCodeBtn = undefined;
        /**获取GUID按钮 */
        this.getGUIDBtn = undefined;
        /**装备枪械按钮 */
        this.equipBtn = undefined;
        /**编辑态开火按钮 */
        this.shootBtn = undefined;
        /**编辑态换弹按钮 */
        this.ReloadBtn = undefined;
        /**输入输出框 */
        this.downInput = undefined;
    }
    onAwake() {
        MainUI.instance = this;
        let size = WindowUtil.getViewportSize();
        this.rootCanvas.renderOpacity = 0.8;
        this.rootCanvas.zOrder = UILayerSystem;
        let _margin = new Margin(0.1);
        this.downInput = InputBox.newObject(this.rootCanvas);
        this.downInput.size = new Vector2(size.x - 40, size.y / 30);
        this.downInput.fontSize = 14;
        this.downInput.textLengthLimit = 999999;
        this.btnCanv = Canvas.newObject(this.rootCanvas);
        this.btnCanv.size = new Vector2(size.x, size.y / 20);
        this.downInput.position = new Vector2(20, size.y - 1.1 * this.downInput.size.y);
        this.downInput.text = MyClearGuns.instance.GunDataJsonList[0].GunDataJson;
        this.btnCanv.position = new Vector2(20, size.y - 1.1 * this.btnCanv.size.y - 1.1 * this.downInput.size.y);
        this.btnCanv.autoLayoutRule = new UILayout(10, _margin, UILayoutType.Horizontal, UILayoutPacket.LeftCenter, new UIHugContent(0, 0), true, false);
        this.hideShowBtn = StaleButton.newObject(this.rootCanvas);
        this.hideShowBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.hideShowBtn.text = "界面显隐[X]";
        this.hideShowBtn.fontSize = 18;
        this.btnCanv.addChild(this.hideShowBtn);
        /** 界面显隐按钮初始化 */
        this.hideShowBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.X, this.hideShowBtn);
        this.hideShowBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.hideShowBtn.onClicked.add(() => {
            if (MyClearGuns.instance.UIVisible) {
                MyClearGuns.instance.UIVisible = false;
                this.rootCanvas.visibility = 2;
            }
            else {
                MyClearGuns.instance.UIVisible = true;
                this.rootCanvas.visibility = 0;
            }
        });
        this.enCodeBtn = StaleButton.newObject(this.rootCanvas);
        this.enCodeBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.enCodeBtn.text = "↓序列化[G]";
        this.enCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.enCodeBtn);
        /** 序列化按钮初始化 */
        this.enCodeBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.G, this.enCodeBtn);
        this.enCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.enCodeBtn.onClicked.add(() => {
            this.xuLieHua();
        });
        this.deCodeBtn = StaleButton.newObject(this.rootCanvas);
        this.deCodeBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.deCodeBtn.text = "↑反序列化[H]";
        this.deCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.deCodeBtn);
        /** 反序列化按钮初始化 */
        this.deCodeBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.H, this.deCodeBtn);
        this.deCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.deCodeBtn.onClicked.add(() => {
            this.fanXuLieHua();
        });
        this.getGUIDBtn = StaleButton.newObject(this.rootCanvas);
        this.getGUIDBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.getGUIDBtn.text = "获取GUID";
        this.getGUIDBtn.fontSize = 18;
        this.btnCanv.addChild(this.getGUIDBtn);
        /** 获取唯一GUID按钮初始化 */
        this.getGUIDBtn.transitionEnable = true;
        this.getGUIDBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.getGUIDBtn.onClicked.add(() => {
            let InptGunData = JSON.parse(this.downInput.text);
            let result = InptGunData.GunGUID;
            result += ("," + InptGunData.GetGunAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.GetGunSound).guid);
            result += ("," + InptGunData.ShootAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ShootSound).guid);
            result += ("," + InptGunData.ReloadAnime);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadStartSound).guid);
            result += ("," + MyClearGuns.instance.Text2SoundUnit(InptGunData.ReloadOverSound).guid);
            this.downInput.text = result;
        });
        this.equipBtn = StaleButton.newObject(this.rootCanvas);
        this.equipBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.equipBtn.text = "装备枪械[E]";
        this.equipBtn.fontSize = 18;
        this.btnCanv.addChild(this.equipBtn);
        /** 获取唯一GUID按钮初始化 */
        this.equipBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.E, this.equipBtn);
        this.equipBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.equipBtn.onClicked.add(() => {
            let MyGunDataJSON = MyClearGuns.instance.TempDefaultGunData;
            MyClearGuns.instance.CurrGunData = MyClearGuns.instance.TempDefaultGunData;
            MyClearGuns.instance.GunDataIntoMap(JSON.stringify(MyGunDataJSON));
            MyClearGuns.instance.GunDataIntoServerMap(JSON.stringify(MyGunDataJSON));
            MyClearGuns.instance.ClientAskServerForGun(Player.localPlayer);
        });
        this.shootBtn = StaleButton.newObject(this.rootCanvas);
        this.shootBtn.size = new Vector2(size.x / 18, size.y / 20);
        this.shootBtn.text = "开火[F]";
        this.shootBtn.fontSize = 18;
        this.btnCanv.addChild(this.shootBtn);
        /** 开火按钮初始化 */
        this.shootBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.F, this.shootBtn);
        this.shootBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.shootBtn.onPressed.add(() => {
            MyClearGuns.ClientStartShoot();
        });
        this.shootBtn.onReleased.add(() => {
            MyClearGuns.ClientStopShoot();
        });
        this.ReloadBtn = StaleButton.newObject(this.rootCanvas);
        this.ReloadBtn.size = new Vector2(size.x / 18, size.y / 20);
        this.ReloadBtn.text = "换弹[R]";
        this.ReloadBtn.fontSize = 18;
        this.btnCanv.addChild(this.ReloadBtn);
        /** 换弹按钮初始化 */
        this.ReloadBtn.transitionEnable = true;
        InputUtil.bindButton(Keys.R, this.ReloadBtn);
        this.ReloadBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.ReloadBtn.onClicked.add(() => {
            MyClearGuns.ClientReloadAmmo();
        });
        //-----------------------//
        this.lable0 = TextBlock.newObject(this.rootCanvas);
        this.lable0.size = new Vector2(size.x / 12, size.y / 30 + 0 * (size.y / 30));
        this.lable0.position = new Vector2(10, 10);
        this.lable0.text = "枪械名称：";
        this.lable0.fontSize = 24;
        this.lable0.fontColor = LinearColor.blue;
        this.lable0.outlineSize = 1;
        this.lable0.outlineColor = LinearColor.black;
        this.lable1 = TextBlock.newObject(this.rootCanvas);
        this.lable1.size = new Vector2(size.x / 12, size.y / 30);
        this.lable1.position = new Vector2(10, 10 + 1 * (size.y / 30));
        this.lable1.text = "枪械模型：";
        this.lable1.fontSize = 24;
        this.lable1.outlineSize = 1;
        this.lable1.outlineColor = LinearColor.black;
        this.lable2 = TextBlock.newObject(this.rootCanvas);
        this.lable2.size = new Vector2(size.x / 12, size.y / 30);
        this.lable2.position = new Vector2(10, 10 + 2 * (size.y / 30));
        this.lable2.text = "　　偏移：";
        this.lable2.fontSize = 24;
        this.lable2.outlineSize = 1;
        this.lable2.outlineColor = LinearColor.black;
        this.lable3 = TextBlock.newObject(this.rootCanvas);
        this.lable3.size = new Vector2(size.x / 12, size.y / 30);
        this.lable3.position = new Vector2(10, 10 + 3 * (size.y / 30));
        this.lable3.text = "　　旋转：";
        this.lable3.fontSize = 24;
        this.lable3.outlineSize = 1;
        this.lable3.outlineColor = LinearColor.black;
        this.lable4 = TextBlock.newObject(this.rootCanvas);
        this.lable4.size = new Vector2(size.x / 12, size.y / 30);
        this.lable4.position = new Vector2(10, 10 + 4 * (size.y / 30));
        this.lable4.text = "　　缩放：";
        this.lable4.fontSize = 24;
        this.lable4.outlineSize = 1;
        this.lable4.outlineColor = LinearColor.black;
        this.lable5 = TextBlock.newObject(this.rootCanvas);
        this.lable5.size = new Vector2(size.x / 12, size.y / 30);
        this.lable5.position = new Vector2(10, 10 + 5 * (size.y / 30));
        this.lable5.text = "掏枪动画：";
        this.lable5.fontSize = 24;
        this.lable5.outlineSize = 1;
        this.lable5.outlineColor = LinearColor.black;
        this.lable6 = TextBlock.newObject(this.rootCanvas);
        this.lable6.size = new Vector2(size.x / 12, size.y / 30);
        this.lable6.position = new Vector2(10, 10 + 6 * (size.y / 30));
        this.lable6.text = "掏枪音效：";
        this.lable6.fontSize = 24;
        this.lable6.outlineSize = 1;
        this.lable6.outlineColor = LinearColor.black;
        this.lable7 = TextBlock.newObject(this.rootCanvas);
        this.lable7.size = new Vector2(size.x / 12, size.y / 30);
        this.lable7.position = new Vector2(10, 10 + 7 * (size.y / 30));
        this.lable7.text = "出枪时间：";
        this.lable7.fontSize = 24;
        this.lable7.outlineSize = 1;
        this.lable7.outlineColor = LinearColor.black;
        this.lable8 = TextBlock.newObject(this.rootCanvas);
        this.lable8.size = new Vector2(size.x / 12, size.y / 30);
        this.lable8.position = new Vector2(10, 10 + 8 * (size.y / 30));
        this.lable8.text = "有效射程：";
        this.lable8.fontSize = 24;
        this.lable8.fontColor = LinearColor.red;
        this.lable8.outlineSize = 1;
        this.lable8.outlineColor = LinearColor.black;
        this.lable9 = TextBlock.newObject(this.rootCanvas);
        this.lable9.size = new Vector2(size.x / 12, size.y / 30);
        this.lable9.position = new Vector2(10, 10 + 9 * (size.y / 30));
        this.lable9.text = "单发伤害：";
        this.lable9.fontSize = 24;
        this.lable9.fontColor = LinearColor.red;
        this.lable9.outlineSize = 1;
        this.lable9.outlineColor = LinearColor.black;
        this.lable10 = TextBlock.newObject(this.rootCanvas);
        this.lable10.size = new Vector2(size.x / 12, size.y / 30);
        this.lable10.position = new Vector2(10, 10 + 10 * (size.y / 30));
        this.lable10.text = "弹丸数量：";
        this.lable10.fontSize = 24;
        this.lable10.fontColor = LinearColor.red;
        this.lable10.outlineSize = 1;
        this.lable10.outlineColor = LinearColor.black;
        this.lable11 = TextBlock.newObject(this.rootCanvas);
        this.lable11.size = new Vector2(size.x / 12, size.y / 30);
        this.lable11.position = new Vector2(10, 10 + 11 * (size.y / 30));
        this.lable11.text = "水平后座：";
        this.lable11.fontSize = 24;
        this.lable11.fontColor = LinearColor.red;
        this.lable11.outlineSize = 1;
        this.lable11.outlineColor = LinearColor.black;
        this.lable12 = TextBlock.newObject(this.rootCanvas);
        this.lable12.size = new Vector2(size.x / 12, size.y / 30);
        this.lable12.position = new Vector2(10, 10 + 12 * (size.y / 30));
        this.lable12.text = "垂直后座：";
        this.lable12.fontColor = LinearColor.red;
        this.lable12.fontSize = 24;
        this.lable12.outlineSize = 1;
        this.lable12.outlineColor = LinearColor.black;
        this.lable13 = TextBlock.newObject(this.rootCanvas);
        this.lable13.size = new Vector2(size.x / 12, size.y / 30);
        this.lable13.position = new Vector2(10, 10 + 13 * (size.y / 30));
        this.lable13.text = "散射程度：";
        this.lable13.fontSize = 24;
        this.lable13.fontColor = LinearColor.red;
        this.lable13.outlineSize = 1;
        this.lable13.outlineColor = LinearColor.black;
        this.lable14 = TextBlock.newObject(this.rootCanvas);
        this.lable14.size = new Vector2(size.x / 12, size.y / 30);
        this.lable14.position = new Vector2(10, 10 + 14 * (size.y / 30));
        this.lable14.text = "　全自动：";
        this.lable14.fontColor = LinearColor.red;
        this.lable14.fontSize = 24;
        this.lable14.outlineSize = 1;
        this.lable14.outlineColor = LinearColor.black;
        this.lable15 = TextBlock.newObject(this.rootCanvas);
        this.lable15.size = new Vector2(size.x / 12, size.y / 30);
        this.lable15.position = new Vector2(10, 10 + 15 * (size.y / 30));
        this.lable15.text = "射击间隔：";
        this.lable15.fontSize = 24;
        this.lable15.fontColor = LinearColor.red;
        this.lable15.outlineSize = 1;
        this.lable15.outlineColor = LinearColor.black;
        this.lable16 = TextBlock.newObject(this.rootCanvas);
        this.lable16.size = new Vector2(size.x / 12, size.y / 30);
        this.lable16.position = new Vector2(10, 10 + 16 * (size.y / 30));
        this.lable16.text = "开火动画：";
        this.lable16.fontSize = 24;
        this.lable16.fontColor = LinearColor.red;
        this.lable16.outlineSize = 1;
        this.lable16.outlineColor = LinearColor.black;
        this.lable17 = TextBlock.newObject(this.rootCanvas);
        this.lable17.size = new Vector2(size.x / 12, size.y / 30);
        this.lable17.position = new Vector2(10, 10 + 17 * (size.y / 30));
        this.lable17.text = "开火音效：";
        this.lable17.fontSize = 24;
        this.lable17.fontColor = LinearColor.red;
        this.lable17.outlineSize = 1;
        this.lable17.outlineColor = LinearColor.black;
        this.lable18 = TextBlock.newObject(this.rootCanvas);
        this.lable18.size = new Vector2(size.x / 12, size.y / 30);
        this.lable18.position = new Vector2(10, 10 + 18 * (size.y / 30));
        this.lable18.text = "到手载弹：";
        this.lable18.fontSize = 24;
        this.lable18.fontColor = LinearColor.yellow;
        this.lable18.outlineSize = 1;
        this.lable18.outlineColor = LinearColor.black;
        this.lable19 = TextBlock.newObject(this.rootCanvas);
        this.lable19.size = new Vector2(size.x / 12, size.y / 30);
        this.lable19.position = new Vector2(10, 10 + 19 * (size.y / 30));
        this.lable19.text = "弹匣载弹：";
        this.lable19.fontSize = 24;
        this.lable19.fontColor = LinearColor.yellow;
        this.lable19.outlineSize = 1;
        this.lable19.outlineColor = LinearColor.black;
        this.lable20 = TextBlock.newObject(this.rootCanvas);
        this.lable20.size = new Vector2(size.x / 12, size.y / 30);
        this.lable20.position = new Vector2(10, 10 + 20 * (size.y / 30));
        this.lable20.text = "到手备弹：";
        this.lable20.fontSize = 24;
        this.lable20.fontColor = LinearColor.yellow;
        this.lable20.outlineSize = 1;
        this.lable20.outlineColor = LinearColor.black;
        this.lable21 = TextBlock.newObject(this.rootCanvas);
        this.lable21.size = new Vector2(size.x / 12, size.y / 30);
        this.lable21.position = new Vector2(10, 10 + 21 * (size.y / 30));
        this.lable21.text = "最大备弹：";
        this.lable21.fontSize = 24;
        this.lable21.fontColor = LinearColor.yellow;
        this.lable21.outlineSize = 1;
        this.lable21.outlineColor = LinearColor.black;
        this.lable22 = TextBlock.newObject(this.rootCanvas);
        this.lable22.size = new Vector2(size.x / 12, size.y / 30);
        this.lable22.position = new Vector2(10, 10 + 22 * (size.y / 30));
        this.lable22.text = "换弹耗时：";
        this.lable22.fontSize = 24;
        this.lable22.fontColor = LinearColor.yellow;
        this.lable22.outlineSize = 1;
        this.lable22.outlineColor = LinearColor.black;
        this.lable23 = TextBlock.newObject(this.rootCanvas);
        this.lable23.size = new Vector2(size.x / 12, size.y / 30);
        this.lable23.position = new Vector2(10, 10 + 23 * (size.y / 30));
        this.lable23.text = "换弹动画：";
        this.lable23.fontSize = 24;
        this.lable23.fontColor = LinearColor.yellow;
        this.lable23.outlineSize = 1;
        this.lable23.outlineColor = LinearColor.black;
        this.lable24 = TextBlock.newObject(this.rootCanvas);
        this.lable24.size = new Vector2(size.x / 12, size.y / 30);
        this.lable24.position = new Vector2(10, 10 + 24 * (size.y / 30));
        this.lable24.text = "开始音效：";
        this.lable24.fontSize = 24;
        this.lable24.fontColor = LinearColor.yellow;
        this.lable24.outlineSize = 1;
        this.lable24.outlineColor = LinearColor.black;
        this.lable25 = TextBlock.newObject(this.rootCanvas);
        this.lable25.size = new Vector2(size.x / 12, size.y / 30);
        this.lable25.position = new Vector2(10, 10 + 25 * (size.y / 30));
        this.lable25.text = "完成音效：";
        this.lable25.fontSize = 24;
        this.lable25.fontColor = LinearColor.yellow;
        this.lable25.outlineSize = 1;
        this.lable25.outlineColor = LinearColor.black;
        this.input0 = InputBox.newObject(this.rootCanvas);
        this.input0.size = new Vector2(size.x / 12, size.y / 31);
        this.input0.position = new Vector2(12 + size.x / 12, 10 + 0 * (size.y / 30));
        this.input0.textLengthLimit = 99;
        this.input0.text = MyClearGuns.instance.TempDefaultGunData.GunName;
        this.input0.fontSize = 14;
        this.input0.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GunName = text;
        });
        this.input1 = InputBox.newObject(this.rootCanvas);
        this.input1.size = new Vector2(size.x / 12, size.y / 31);
        this.input1.position = new Vector2(12 + size.x / 12, 10 + 1 * (size.y / 30));
        this.input1.textLengthLimit = 99;
        this.input1.text = MyClearGuns.instance.TempDefaultGunData.GunGUID;
        this.input1.fontSize = 14;
        this.input1.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GunGUID = text;
        });
        this.input2 = InputBox.newObject(this.rootCanvas);
        this.input2.size = new Vector2(size.x / 12, size.y / 31);
        this.input2.position = new Vector2(12 + size.x / 12, 10 + 2 * (size.y / 30));
        this.input2.textLengthLimit = 99;
        this.input2.text = MyClearGuns.instance.TempDefaultGunData.GunLoc;
        this.input2.fontSize = 14;
        this.input2.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GunLoc = text;
        });
        this.input3 = InputBox.newObject(this.rootCanvas);
        this.input3.size = new Vector2(size.x / 12, size.y / 31);
        this.input3.position = new Vector2(12 + size.x / 12, 10 + 3 * (size.y / 30));
        this.input3.textLengthLimit = 99;
        this.input3.text = MyClearGuns.instance.TempDefaultGunData.GunRot;
        this.input3.fontSize = 14;
        this.input3.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GunRot = text;
        });
        this.input4 = InputBox.newObject(this.rootCanvas);
        this.input4.size = new Vector2(size.x / 12, size.y / 31);
        this.input4.position = new Vector2(12 + size.x / 12, 10 + 4 * (size.y / 30));
        this.input4.textLengthLimit = 99;
        this.input4.text = MyClearGuns.instance.TempDefaultGunData.GunScal;
        this.input4.fontSize = 14;
        this.input4.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GunScal = text;
        });
        this.input5 = InputBox.newObject(this.rootCanvas);
        this.input5.size = new Vector2(size.x / 12, size.y / 31);
        this.input5.position = new Vector2(12 + size.x / 12, 10 + 5 * (size.y / 30));
        this.input5.textLengthLimit = 99;
        this.input5.text = MyClearGuns.instance.TempDefaultGunData.GetGunAnime;
        this.input5.fontSize = 14;
        this.input5.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunAnime = text;
        });
        this.input6 = InputBox.newObject(this.rootCanvas);
        this.input6.size = new Vector2(size.x / 12, size.y / 31);
        this.input6.position = new Vector2(12 + size.x / 12, 10 + 6 * (size.y / 30));
        this.input6.textLengthLimit = 99;
        this.input6.text = MyClearGuns.instance.TempDefaultGunData.GetGunSound;
        this.input6.fontSize = 14;
        this.input6.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunSound = text;
        });
        this.input7 = InputBox.newObject(this.rootCanvas);
        this.input7.size = new Vector2(size.x / 12, size.y / 31);
        this.input7.position = new Vector2(12 + size.x / 12, 10 + 7 * (size.y / 30));
        this.input7.textLengthLimit = 99;
        this.input7.text = MyClearGuns.instance.TempDefaultGunData.GetGunShowTime + "";
        this.input7.fontSize = 14;
        this.input7.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.GetGunShowTime = Number(text);
        });
        this.input8 = InputBox.newObject(this.rootCanvas);
        this.input8.size = new Vector2(size.x / 12, size.y / 31);
        this.input8.position = new Vector2(12 + size.x / 12, 10 + 8 * (size.y / 30));
        this.input8.textLengthLimit = 99;
        this.input8.text = MyClearGuns.instance.TempDefaultGunData.Range + "";
        this.input8.fontSize = 14;
        this.input8.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Range = Number(text);
        });
        this.input9 = InputBox.newObject(this.rootCanvas);
        this.input9.size = new Vector2(size.x / 12, size.y / 31);
        this.input9.position = new Vector2(12 + size.x / 12, 10 + 9 * (size.y / 30));
        this.input9.textLengthLimit = 99;
        this.input9.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Damage + "";
        this.input9.fontSize = 14;
        this.input9.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Projectil_Damage = Number(text);
        });
        this.input10 = InputBox.newObject(this.rootCanvas);
        this.input10.size = new Vector2(size.x / 12, size.y / 31);
        this.input10.position = new Vector2(12 + size.x / 12, 10 + 10 * (size.y / 30));
        this.input10.textLengthLimit = 99;
        this.input10.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Count + "";
        this.input10.fontSize = 14;
        this.input10.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Projectil_Count = Number(text);
        });
        this.input11 = InputBox.newObject(this.rootCanvas);
        this.input11.size = new Vector2(size.x / 12, size.y / 31);
        this.input11.position = new Vector2(12 + size.x / 12, 10 + 11 * (size.y / 30));
        this.input11.textLengthLimit = 99;
        this.input11.text = MyClearGuns.instance.TempDefaultGunData.Recoil_H + "";
        this.input11.fontSize = 14;
        this.input11.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Recoil_H = Number(text);
        });
        this.input12 = InputBox.newObject(this.rootCanvas);
        this.input12.size = new Vector2(size.x / 12, size.y / 31);
        this.input12.position = new Vector2(12 + size.x / 12, 10 + 12 * (size.y / 30));
        this.input12.textLengthLimit = 99;
        this.input12.text = MyClearGuns.instance.TempDefaultGunData.Recoil_V + "";
        this.input12.fontSize = 14;
        this.input12.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Recoil_V = Number(text);
        });
        this.input13 = InputBox.newObject(this.rootCanvas);
        this.input13.size = new Vector2(size.x / 12, size.y / 31);
        this.input13.position = new Vector2(12 + size.x / 12, 10 + 13 * (size.y / 30));
        this.input13.textLengthLimit = 99;
        this.input13.text = MyClearGuns.instance.TempDefaultGunData.Spread + "";
        this.input13.fontSize = 14;
        this.input13.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Spread = Number(text);
        });
        this.input14 = InputBox.newObject(this.rootCanvas);
        this.input14.size = new Vector2(size.x / 12, size.y / 31);
        this.input14.position = new Vector2(12 + size.x / 12, 10 + 14 * (size.y / 30));
        this.input14.textLengthLimit = 99;
        this.input14.text = MyClearGuns.instance.TempDefaultGunData.FullAuto + "";
        this.input14.fontSize = 14;
        this.input14.onTextCommitted.add((text) => {
            if (text == "false" || text == "0" || text == "False" || text == "FALSE") {
                MyClearGuns.instance.TempDefaultGunData.FullAuto = false;
            }
            else {
                MyClearGuns.instance.TempDefaultGunData.FullAuto = true;
            }
        });
        this.input15 = InputBox.newObject(this.rootCanvas);
        this.input15.size = new Vector2(size.x / 12, size.y / 31);
        this.input15.position = new Vector2(12 + size.x / 12, 10 + 15 * (size.y / 30));
        this.input15.textLengthLimit = 99;
        this.input15.text = MyClearGuns.instance.TempDefaultGunData.ShootDelay + "";
        this.input15.fontSize = 14;
        this.input15.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ShootDelay = Number(text);
        });
        this.input16 = InputBox.newObject(this.rootCanvas);
        this.input16.size = new Vector2(size.x / 12, size.y / 31);
        this.input16.position = new Vector2(12 + size.x / 12, 10 + 16 * (size.y / 30));
        this.input16.textLengthLimit = 99;
        this.input16.text = MyClearGuns.instance.TempDefaultGunData.ShootAnime + "";
        this.input16.fontSize = 14;
        this.input16.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ShootAnime = text;
        });
        this.input17 = InputBox.newObject(this.rootCanvas);
        this.input17.size = new Vector2(size.x / 12, size.y / 31);
        this.input17.position = new Vector2(12 + size.x / 12, 10 + 17 * (size.y / 30));
        this.input17.textLengthLimit = 99;
        this.input17.text = MyClearGuns.instance.TempDefaultGunData.ShootSound;
        this.input17.fontSize = 14;
        this.input17.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ShootSound = text;
        });
        this.input18 = InputBox.newObject(this.rootCanvas);
        this.input18.size = new Vector2(size.x / 12, size.y / 31);
        this.input18.position = new Vector2(12 + size.x / 12, 10 + 18 * (size.y / 30));
        this.input18.textLengthLimit = 99;
        this.input18.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum + "";
        this.input18.fontSize = 14;
        this.input18.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum = Number(text);
        });
        this.input19 = InputBox.newObject(this.rootCanvas);
        this.input19.size = new Vector2(size.x / 12, size.y / 31);
        this.input19.position = new Vector2(12 + size.x / 12, 10 + 19 * (size.y / 30));
        this.input19.textLengthLimit = 99;
        this.input19.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne + "";
        this.input19.fontSize = 14;
        this.input19.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne = Number(text);
        });
        this.input20 = InputBox.newObject(this.rootCanvas);
        this.input20.size = new Vector2(size.x / 12, size.y / 31);
        this.input20.position = new Vector2(12 + size.x / 12, 10 + 20 * (size.y / 30));
        this.input20.textLengthLimit = 99;
        this.input20.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare + "";
        this.input20.fontSize = 14;
        this.input20.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare = Number(text);
        });
        this.input21 = InputBox.newObject(this.rootCanvas);
        this.input21.size = new Vector2(size.x / 12, size.y / 31);
        this.input21.position = new Vector2(12 + size.x / 12, 10 + 21 * (size.y / 30));
        this.input21.textLengthLimit = 99;
        this.input21.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare + "";
        this.input21.fontSize = 14;
        this.input21.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare = Number(text);
        });
        this.input22 = InputBox.newObject(this.rootCanvas);
        this.input22.size = new Vector2(size.x / 12, size.y / 31);
        this.input22.position = new Vector2(12 + size.x / 12, 10 + 22 * (size.y / 30));
        this.input22.textLengthLimit = 99;
        this.input22.text = MyClearGuns.instance.TempDefaultGunData.ReloadDelay + "";
        this.input22.fontSize = 14;
        this.input22.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadDelay = Number(text);
        });
        this.input23 = InputBox.newObject(this.rootCanvas);
        this.input23.size = new Vector2(size.x / 12, size.y / 31);
        this.input23.position = new Vector2(12 + size.x / 12, 10 + 23 * (size.y / 30));
        this.input23.textLengthLimit = 99;
        this.input23.text = MyClearGuns.instance.TempDefaultGunData.ReloadAnime;
        this.input23.fontSize = 14;
        this.input23.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadAnime = text;
        });
        this.input24 = InputBox.newObject(this.rootCanvas);
        this.input24.size = new Vector2(size.x / 12, size.y / 31);
        this.input24.position = new Vector2(12 + size.x / 12, 10 + 24 * (size.y / 30));
        this.input24.textLengthLimit = 99;
        this.input24.text = MyClearGuns.instance.TempDefaultGunData.ReloadStartSound;
        this.input24.fontSize = 14;
        this.input24.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadStartSound = text;
        });
        this.input25 = InputBox.newObject(this.rootCanvas);
        this.input25.size = new Vector2(size.x / 12, size.y / 31);
        this.input25.position = new Vector2(12 + size.x / 12, 10 + 25 * (size.y / 30));
        this.input25.textLengthLimit = 99;
        this.input25.text = MyClearGuns.instance.TempDefaultGunData.ReloadOverSound;
        this.input25.fontSize = 14;
        this.input25.onTextCommitted.add((text) => {
            MyClearGuns.instance.TempDefaultGunData.ReloadOverSound = text;
        });
        // // 加载完成后执行一次序列化
        // this.xuLieHua();
        // 加载完成后执行一次反序列化
        this.fanXuLieHua();
    }
    /**反序列化，将底部编辑栏中的Json反序列化进TempDefaultGunData中，并投射到UI里 */
    fanXuLieHua() {
        MyClearGuns.instance.TempDefaultGunData = JSON.parse(this.downInput.text);
        this.input0.text = MyClearGuns.instance.TempDefaultGunData.GunName;
        this.input1.text = MyClearGuns.instance.TempDefaultGunData.GunGUID;
        this.input2.text = MyClearGuns.instance.TempDefaultGunData.GunLoc;
        this.input3.text = MyClearGuns.instance.TempDefaultGunData.GunRot;
        this.input4.text = MyClearGuns.instance.TempDefaultGunData.GunScal;
        this.input5.text = MyClearGuns.instance.TempDefaultGunData.GetGunAnime;
        this.input6.text = MyClearGuns.instance.TempDefaultGunData.GetGunSound;
        this.input7.text = MyClearGuns.instance.TempDefaultGunData.GetGunShowTime + "";
        this.input8.text = MyClearGuns.instance.TempDefaultGunData.Range + "";
        this.input9.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Damage + "";
        this.input10.text = MyClearGuns.instance.TempDefaultGunData.Projectil_Count + "";
        this.input11.text = MyClearGuns.instance.TempDefaultGunData.Recoil_H + "";
        this.input12.text = MyClearGuns.instance.TempDefaultGunData.Recoil_V + "";
        this.input13.text = MyClearGuns.instance.TempDefaultGunData.Spread + "";
        this.input14.text = MyClearGuns.instance.TempDefaultGunData.FullAuto + "";
        this.input15.text = MyClearGuns.instance.TempDefaultGunData.ShootDelay + "";
        this.input16.text = MyClearGuns.instance.TempDefaultGunData.ShootAnime + "";
        this.input17.text = MyClearGuns.instance.TempDefaultGunData.ShootSound;
        this.input18.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurNum + "";
        this.input19.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxInOne + "";
        this.input20.text = MyClearGuns.instance.TempDefaultGunData.Ammo_CurPrepare + "";
        this.input21.text = MyClearGuns.instance.TempDefaultGunData.Ammo_MaxPrepare + "";
        this.input22.text = MyClearGuns.instance.TempDefaultGunData.ReloadDelay + "";
        this.input23.text = MyClearGuns.instance.TempDefaultGunData.ReloadAnime;
        this.input24.text = MyClearGuns.instance.TempDefaultGunData.ReloadStartSound;
        this.input25.text = MyClearGuns.instance.TempDefaultGunData.ReloadOverSound;
    }
    /**序列化，将TempDefaultGunData中的数据Json化，并覆写到底部编辑栏中 */
    xuLieHua() {
        this.downInput.text = JSON.stringify(MyClearGuns.instance.TempDefaultGunData);
    }
}
/**枪械Json */
let GunList = class GunList {
    constructor(a) {
        this.GunDataJson = "";
        this.GunDataJson = a ?? "";
    }
};
__decorate([
    mw.Property({ displayName: "枪械Json" })
], GunList.prototype, "GunDataJson", void 0);
GunList = __decorate([
    Serializable
], GunList);
/** 主脚本 MyClearGuns*/
let MyClearGuns = MyClearGuns_1 = class MyClearGuns extends mw.Script {
    constructor() {
        super(...arguments);
        // ---------[属性面板&全局设置]---------- //
        this.NeedloadAssets = "";
        this.EditorMode = true;
        this.SoundCutDistanceScale = 1;
        this.EffectCutDistanceScale = 1;
        this.AnnieCutDistance = 1200;
        this.GunDataJsonList = [new GunList('{"GunName":"scar-L","GunGUID":"43712","GunLoc":"4|0|0","GunRot":"0|0|-25","GunScal":"0.8|0.8|0.8","GetGunAnime":"97180","GetGunSound":"20429|1|3|6","GetGunShowTime":0.5,"Range":20,"Projectil_Damage":30,"Projectil_Count":1,"Recoil_H":0.55,"Recoil_V":0.35,"Spread":0.02,"FullAuto":true,"ShootDelay":100,"ShootAnime":"80483","ShootSound":"12563|1|8|16","Ammo_CurNum":30,"Ammo_MaxInOne":30,"Ammo_CurPrepare":180,"Ammo_MaxPrepare":360,"ReloadDelay":2,"ReloadAnime":"33561","ReloadStartSound":"12525|1|3|6","ReloadOverSound":"12546|1|3|6"}')];
        // ---------[双端属性-不需要同步的]---------- //
        /**由枪名-json串反序列化而来存在了这个map，用于服务端、客户端获取枪械时的数据对齐 */
        this.GunName_GunData = new Map();
        // ---------[服务器的属性]---------- //
        /** 玩家-手里的枪模型 */
        this.PlayersInfo_GunMesh = new Map();
        /** 玩家-手里的枪名 */
        this.Players_GunName = new Map();
        // ---------[客户端的属性]---------- //
        //【编辑态】
        /** 编辑状态UI显隐 */
        this.UIVisible = true;
        //** 编辑状态的临时枪械数据 *
        this.TempDefaultGunData = new GunDataUnit;
        //【消费态】
        /** 当前手持枪械数据 */
        this.CurrGunData = undefined;
        /**是否已有自动开火在进行 */
        this.FireLoop = null;
        /**开火间隔Timeout，用于半自动射击间隔 */
        this.FireDelayTimeout = null;
        /**当前是否在换弹状态 */
        this.isReloading = false;
    }
    // /**换弹中的Timeout */
    // public reloadTimeoutNum: number = null;
    /* 解析资源ID列表 */
    resolveString(assetIds) {
        let assetIdArray = new Array();
        let assetId = "";
        let s = assetIds.split("");
        for (let a of s) {
            if (a == ",") {
                assetIdArray.push(assetId);
                assetId = "";
            }
            else {
                assetId += a;
            }
        }
        if (assetId) {
            assetIdArray.push(assetId);
        }
        return assetIdArray;
    }
    /* 初始化资源 */
    async initAssets(assetIds) {
        let assetIdArray = this.resolveString(assetIds);
        for (let element of assetIdArray) {
            await AssetUtil.asyncDownloadAsset(element);
        }
    }
    // instance 属性用于获取 MyClearGuns 的实例
    static get instance() {
        // 如果实例尚未创建，则创建一个代理（Proxy）
        if (!MyClearGuns_1._instance) {
            MyClearGuns_1._instance = new Proxy({}, {
                get: (target, prop) => {
                    // 如果已经准备就绪，直接返回实例的方法或属性
                    if (MyClearGuns_1._isReady) {
                        return MyClearGuns_1._instance[prop];
                    }
                    else {
                        // 如果尚未准备就绪，返回一个函数，将操作加入队列中
                        return (...args) => {
                            MyClearGuns_1._queuedOperations.push(() => MyClearGuns_1._instance[prop](...args));
                        };
                    }
                }
            });
        }
        return MyClearGuns_1._instance;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 初始化真正的 MyClearGuns 实例
        MyClearGuns_1._instance = this;
        MyClearGuns_1._isReady = true;
        this.GunDataListIntoMap();
        this.initAssets(this.NeedloadAssets);
        this.UIVisible = true;
        if (SystemUtil.isClient()) {
            // this.EditorMode = true;
            setTimeout(() => {
                if (this.EditorMode && SystemUtil.isPIE) {
                    let mainui = UIService.create(MainUI);
                    UIService.showUI(mainui);
                }
            }, 700);
        }
        if (SystemUtil.isServer()) {
            Player.onPlayerJoin.add((player) => {
                this.onPlayerJoin(player);
            });
            Player.onPlayerLeave.add((player) => {
                this.onPlayerLeft(player);
            });
        }
    }
    /**当玩家加入时的方法 */
    onPlayerJoin(player) {
        if (SystemUtil.isServer()) {
            player.character.collisionExtent.y = 150;
            // console.log(player.character.displayName + " Joined the game");
        }
    }
    /**当玩家离开时的方法 */
    onPlayerLeft(player) {
        if (SystemUtil.isServer()) {
            // console.log(player.character.displayName + " Left the game");
            // 卸除玩家手里的枪
            this.ServerDelAllWeapon(player);
        }
    }
    // ---------[客户端方法]---------- //
    //----[动作]---//
    /**纯客户端停火 */
    static ClientStopShoot() {
        if (SystemUtil.isClient()) {
            if (MyClearGuns_1.instance.FireLoop != undefined) {
                /**清理全自动开火 */
                clearInterval(MyClearGuns_1.instance.FireLoop);
                /**将全自动开火记录清除 */
                MyClearGuns_1.instance.FireLoop = null;
            }
        }
    }
    /**纯客户端持续开火，包含全自动和半自动，没有弹速、下坠，纯射线，用ClientStopShoot()停火*/
    static ClientStartShoot() {
        if (SystemUtil.isClient()) {
            /**如果手里没有枪械，则不进行射击 */
            if (MyClearGuns_1.instance.CurrGunData != undefined) {
                /**如果正在换弹，停止射击并返回 */
                if (MyClearGuns_1.instance.isReloading) {
                    this.ClientStopShoot();
                    return;
                }
                /**有枪且不在换弹中，拿出当前数据 */
                let dt = MyClearGuns_1.instance.CurrGunData.ShootDelay;
                let autofall = MyClearGuns_1.instance.CurrGunData.FullAuto;
                let range = MyClearGuns_1.instance.CurrGunData.Range;
                let Y_move = MyClearGuns_1.instance.CurrGunData.Recoil_V;
                let Z_move = MyClearGuns_1.instance.CurrGunData.Recoil_H;
                let Spred = MyClearGuns_1.instance.CurrGunData.Spread;
                let count = MyClearGuns_1.instance.CurrGunData.Projectil_Count;
                // 进行全自动射击
                if (autofall) {
                    // console.log("全自动射击");
                    // 如果timeout还在就不射击，不在就射击并加个timeout
                    if (MyClearGuns_1.instance.FireDelayTimeout == undefined) {
                        MyClearGuns_1.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        if (MyClearGuns_1.instance.FireLoop != null) {
                            return;
                        }
                        MyClearGuns_1.instance.FireLoop = setInterval(() => {
                            MyClearGuns_1.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        }, dt);
                        MyClearGuns_1.instance.FireDelayTimeout = setTimeout(() => {
                            // timeout后清除timeout存储器
                            MyClearGuns_1.instance.FireDelayTimeout = undefined;
                        }, dt);
                    }
                    /**2023.12.3 尝试修复连点器情况下超越全自动的射速 */
                    // this.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                    // if (this.FireLoop != null) { return; }
                    // this.FireLoop = setInterval(() => {
                    //     this.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                    // }, dt)
                }
                // 进行半自动射击
                else {
                    // console.log("半自动射击");
                    // 如果timeout还在就不射击，不在就射击并加个timeout
                    if (MyClearGuns_1.instance.FireDelayTimeout == undefined) {
                        MyClearGuns_1.instance.ClientShootOnce(range, Y_move, Z_move, Spred, count);
                        MyClearGuns_1.instance.FireDelayTimeout = setTimeout(() => {
                            // timeout后清除timeout存储器
                            MyClearGuns_1.instance.FireDelayTimeout = undefined;
                        }, dt);
                    }
                }
            }
        }
    }
    /**纯客户端换弹，换弹会停止射击，且换弹期间无法射击 */
    static ClientReloadAmmo() {
        if (SystemUtil.isClient()) {
            if (MyClearGuns_1.instance.CurrGunData == undefined) {
                return;
            }
            if (MyClearGuns_1.instance.CurrGunData.Ammo_CurNum == MyClearGuns_1.instance.CurrGunData.Ammo_MaxInOne) {
                return;
            }
            /**如果当前正在换弹，则直接返回不执行下面的操作 */
            if (MyClearGuns_1.instance.isReloading) {
                return;
            }
            /**现在正在换弹 */
            MyClearGuns_1.instance.isReloading = true;
            /**换弹停止开火 */
            this.ClientStopShoot();
            let char = Player.localPlayer.character;
            /**没备弹了 */
            if (MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare <= 0) {
                /**放一下没子弹的音效 */
                MyClearGuns_1.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, "95723", 1, 400, 800);
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, "27257", 1, 400, 800);
                /**现在不在换弹了 */
                MyClearGuns_1.instance.isReloading = false;
                // console.log("[MCG] 没备弹啦！！");
                /**返回，不执行之后的动作 */
                return;
            }
            /**放一下开始换弹的音效 */
            let _reloadStartSound = MyClearGuns_1.instance.Text2SoundUnit(MyClearGuns_1.instance.CurrGunData.ReloadStartSound);
            MyClearGuns_1.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadStartSound.guid, _reloadStartSound.volume, _reloadStartSound.inner, _reloadStartSound.outter);
            // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadStartSound.guid, _reloadStartSound.volume, _reloadStartSound.inner, _reloadStartSound.outter);
            // console.log("[MCG] 开始换弹");
            MyClearGuns_1.instance.ServerPlayAnnie(MyClearGuns_1.instance.CurrGunData.ReloadAnime, char.player.userId);
            // let anime1 = char.loadAnimation(this.CurrGunData.ReloadAnime);
            // anime1.speed = anime1.length / this.CurrGunData.ReloadDelay;
            // anime1.slot = AnimSlot.Upper;
            // anime1.play();
            /**读秒，等换弹完成 */
            setTimeout(() => {
                // 判断手里是否还有枪，不然直接操作数据会报错
                if (MyClearGuns_1.instance.CurrGunData != undefined) {
                    /**归拢一下剩余子弹数 */
                    let totalAmmo = MyClearGuns_1.instance.CurrGunData.Ammo_CurNum + MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare;
                    /**还够换一次子弹 */
                    if (totalAmmo > MyClearGuns_1.instance.CurrGunData.Ammo_MaxInOne) {
                        MyClearGuns_1.instance.CurrGunData.Ammo_CurNum = MyClearGuns_1.instance.CurrGunData.Ammo_MaxInOne;
                        MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = totalAmmo - MyClearGuns_1.instance.CurrGunData.Ammo_MaxInOne;
                    }
                    /**不够了只能有多少上多少了 */
                    else {
                        MyClearGuns_1.instance.CurrGunData.Ammo_CurNum = totalAmmo;
                        MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = 0;
                    }
                    // 给开发者方便调的地方，完成了换弹后会执行这个
                    this.onClientReloadComplete.forEach(callbackfn => callbackfn(MyClearGuns_1.instance.CurrGunData.Ammo_CurNum, MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare));
                }
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadOverSound.guid, _reloadOverSound.volume, _reloadOverSound.inner, _reloadOverSound.outter);
                // console.log("[MCG] 换弹完毕！");
                /**现在不在换弹了 */
                MyClearGuns_1.instance.isReloading = false;
            }, MyClearGuns_1.instance.CurrGunData.ReloadDelay * 1000);
            if (MyClearGuns_1.instance.CurrGunData != undefined) {
                setTimeout(() => {
                    /**放一下结束换弹的音效 */
                    let _reloadOverSound = MyClearGuns_1.instance.Text2SoundUnit(MyClearGuns_1.instance.CurrGunData.ReloadOverSound);
                    MyClearGuns_1.instance.ServerPlay3DSoundOnGmoj(char.gameObjectId, _reloadOverSound.guid, _reloadOverSound.volume, _reloadOverSound.inner, _reloadOverSound.outter);
                }, MyClearGuns_1.instance.CurrGunData.ReloadDelay * 1000 - 300);
            }
        }
    }
    /** 给指定玩家添加子弹，双端可用，如果补成功了会触发换弹完成onClientReloadComplete回调
     * @param player 需要添加子弹的玩家
     * @param AmmoCount 可选，不填=装满最大备弹数Ammo_MaxPrepare，>1则给具体子弹数但不超过限制，0<x<1则按最大备弹数比例给
     */
    static ClientAddAmmo(player, AmmoCount) {
        if (AmmoCount == undefined) {
            MyClearGuns_1.instance.CurrGunData.Ammo_CurNum = MyClearGuns_1.instance.CurrGunData.Ammo_MaxInOne;
            MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = MyClearGuns_1.instance.CurrGunData.Ammo_MaxPrepare;
        }
        else {
            if (AmmoCount >= 1) {
                if (AmmoCount > MyClearGuns_1.instance.CurrGunData.Ammo_MaxPrepare) {
                    MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = MyClearGuns_1.instance.CurrGunData.Ammo_MaxPrepare;
                }
                else {
                    MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = AmmoCount;
                }
            }
            else {
                if (AmmoCount < 1 && AmmoCount > 0) {
                    MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare = Math.floor(MyClearGuns_1.instance.CurrGunData.Ammo_MaxPrepare * AmmoCount);
                }
            }
        }
        this.onClientReloadComplete.forEach(callbackfn => callbackfn(MyClearGuns_1.instance.CurrGunData.Ammo_CurNum, MyClearGuns_1.instance.CurrGunData.Ammo_CurPrepare));
    }
    // ---------[服务器方法]---------- //
    //----[动作]---//
    /**服务器移除玩家枪械 */
    static ServerDelGun(player) {
        MyClearGuns_1.instance.ServerDelAllWeapon(player);
        // 清除玩家手里的枪名
        MyClearGuns_1.instance.Players_GunName.delete(player);
        MyClearGuns_1.instance.ServerRemoveClientGunData(player);
        MyClearGuns_1.instance.serverLetClientRemovedGun(player);
    }
    /**服务器给玩家装备枪械，是枪械库里有的枪 */
    static ServerGiveGun(player, gunName) {
        let GunData = MyClearGuns_1.instance.GunName_GunData.get(gunName);
        let loc = MyClearGuns_1.instance.stringToVector(GunData.GunLoc);
        let rot = MyClearGuns_1.instance.stringToRotation(GunData.GunRot);
        let scal = MyClearGuns_1.instance.stringToVector(GunData.GunScal);
        MyClearGuns_1.instance.ChangeClientCurrGunData(player, JSON.stringify(GunData));
        let anime1 = player.character.loadAnimation(GunData.GetGunAnime);
        anime1.slot = AnimSlot.Upper;
        anime1.play();
        MyClearGuns_1.instance.Players_GunName.set(player, gunName);
        setTimeout(() => {
            MyClearGuns_1.instance.ServerEquipWeapon(GunData.GunGUID, player, loc, rot, scal);
            MyClearGuns_1.instance.ServerPlay3DSoundOnGmoj(player.character.gameObjectId, "12732", 1, 3, 6);
            MyClearGuns_1.instance.serverLetClientEquipedGun(player, gunName);
        }, GunData.GetGunShowTime * 1000);
    }
    /**服务器给玩家随机一把枪，可选定范围
     * @param player 需要给枪的玩家
     * @param guns 给枪范围，传枪械名称string[]，如为空就从所有枪械里给
     */
    static ServerGiveRandomGun(player, guns) {
        if (guns == undefined) {
            guns = [];
            MyClearGuns_1.instance.GunName_GunData.forEach((value, key) => {
                guns.push(key);
            });
        }
        else {
            let newGuns = new Set();
            guns.forEach((value) => {
                if (MyClearGuns_1.instance.GunName_GunData.has(value)) {
                    newGuns.add(value);
                }
            });
            guns = Array.from(newGuns);
            if (guns.length < 1) {
                guns = [];
                MyClearGuns_1.instance.GunName_GunData.forEach((value, key) => {
                    guns.push(key);
                });
            }
        }
        const randomIndex = Math.floor(Math.random() * guns.length);
        const RandomGunName = guns[randomIndex];
        this.ServerGiveGun(player, RandomGunName);
    }
    /**[双端] 获取玩家手里装备着的枪名，C端只获取自己
     * @param player 玩家
     * @returns 枪名字
     */
    static getPlayerGunName(player) {
        if (SystemUtil.isClient()) {
            if (MyClearGuns_1.instance.CurrGunData != undefined) {
                return MyClearGuns_1.instance.CurrGunData.GunName;
            }
            else {
                return null;
            }
        }
        else {
            if (player != undefined) {
                if (MyClearGuns_1.instance.Players_GunName.has(player)) {
                    return MyClearGuns_1.instance.Players_GunName.get(player);
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
    }
    ////////////////////////////////
    //方法实现类接口(开发者可以不管)//
    ////////////////////////////////
    // 【动作】
    /** 纯客户端单次开火，没有弹速、下坠，纯射线
     * @param range 有效射程
     * @param Y_move 垂直后座-上抬
     * @param Z_move 水平后座-左右
     * @param Spred 散射
     * @param count [可选]弹丸数，默认1
     */
    ClientShootOnce(range, Y_move, Z_move, Spred, count) {
        if (SystemUtil.isClient()) {
            // 有子弹的情况
            if (this.CurrGunData.Ammo_CurNum > 0) {
                let p = Player.localPlayer;
                p.character;
                this.CurrGunData.Ammo_CurNum -= 1;
                // console.log("剩余子弹: " + this.CurrGunData.Ammo_CurNum + "/" + this.CurrGunData.Ammo_CurPrepare);
                this.ClientTellServerShoot(p);
                // this.ServerPlay3DSoundOnGmoj(char.gameObjectId, S_uni.guid, S_uni.volume, S_uni.inner, S_uni.outter);
                Spred *= 10;
                range *= 100;
                let cam = Camera.currentCamera;
                let dir = cam.worldTransform.getForwardVector();
                let start = p.character.worldTransform.position.clone().add(Vector.multiply(dir, 30)).clone().add(new Vector(0, 0, 30));
                // 获取角色身上到准星位置的向量，最大距离5000(50格)
                let shotDir = this.getShootDir(p.character, start, range);
                if (count == undefined) {
                    count = 1;
                }
                for (let index = 0; index < count; index++) {
                    // console.log("尝试射击");
                    /** 偏移后的射击方向 */
                    let shotDir2 = undefined;
                    // 散射逻辑 一个圆形内散射
                    if (Spred != null) {
                        let spredx = null;
                        let spredy = null;
                        let matharg = Math.random() * 360;
                        spredx = Math.random() * Math.sin(matharg) * Spred;
                        spredy = Math.random() * Math.cos(matharg) * Spred;
                        shotDir2 = shotDir.clone().toRotation().add(new Rotation(0, spredx, spredy)).getForce();
                    }
                    let end = Vector.add(p.character.worldTransform.position, Vector.multiply(shotDir2, range));
                    try {
                        let Results = QueryUtil.lineTrace(start, end, true, true);
                        // console.log("Results:"+Results.length)
                        Results.forEach((v) => {
                            if (v.gameObject.name == "left_right" || v.gameObject.name == "up_down") {
                                // console.log("命中的物体父亲名字为"+v.gameObject.parent.name+" id:"+v.gameObject.parent.gameObjectId)
                            }
                            else if (v.gameObject.name.includes("地狱龙") || v.gameObject.name.includes("宠物")) {
                                // console.log("命中的物体名字为"+v.gameObject.name+" id:"+v.gameObject.gameObjectId)
                                //v.gameObject.setVisibility(false);
                                //(v.gameObject as Model).setCollision(CollisionStatus.Off);
                                this.toServer(v.gameObject, Player.localPlayer, v.gameObject.name);
                                //Event.dispatchToServer("L6_OnHurt",Player.localPlayer)
                            }
                        });
                        QueryUtil.lineTrace(start, end, true, true, ["2C4B10D3"]).forEach((v) => {
                            //console.log("命中的物体名字为"+v.gameObject.name)
                            if (v.gameObject instanceof Character) {
                                if (v.gameObject != p.character) {
                                    if (!v.gameObject.ragdollEnabled) {
                                        // 击中非自身角色
                                        let loc = v.position;
                                        let rot = v.impactNormal.toRotation();
                                        rot.y -= 90;
                                        // 如果需要判断队友，需要自己去isFriendly方法里设计队友判定逻辑哦
                                        if (!this.isFriendly(p.userId, v.gameObject.player.userId)) {
                                            // 如果不是队友
                                            // 击中角色的特效
                                            this.ServerHitChar(v.gameObject.gameObjectId, loc, rot);
                                            // 客户端击中其他玩家，播放音效
                                            setTimeout(() => {
                                                SoundService.playSound("121684", 1, 1.5);
                                            }, 200);
                                            if (v.gameObject instanceof Character) {
                                                let hitChar = v.gameObject;
                                                MyClearGuns_1.onClientHit.forEach(callbackfn => callbackfn(hitChar, this.CurrGunData.Projectil_Damage));
                                            }
                                            // 爆头判定
                                            if (!v.gameObject.isCrouching) {
                                                if (loc.z - v.gameObject.worldTransform.position.z >= 40) {
                                                    // console.log("head shot!");
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, true);
                                                }
                                                else {
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, false);
                                                }
                                            }
                                            else {
                                                if (loc.z - v.gameObject.worldTransform.position.z >= 35) {
                                                    // console.log("head shot!");
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, true);
                                                }
                                                else {
                                                    this.clientLetServerDamageChar(p.character.gameObjectId, v.gameObject.gameObjectId, this.CurrGunData.Projectil_Damage, false);
                                                }
                                            }
                                            throw new Error("[just ignore] stop Foreach , just return once!!");
                                        }
                                    }
                                }
                            }
                            else {
                                // 排除击中触发器和冲量对象
                                if (!(v.gameObject instanceof Trigger) && !(v.gameObject instanceof Impulse)) {
                                    // 击中场景  
                                    let loc = v.position;
                                    let rot = v.impactNormal.toRotation();
                                    rot.y -= 90;
                                    // 播放击中场景的声效、特效                                
                                    //this.ServerHitMesh(loc, rot);
                                    throw new Error("[just ignore] stop Foreach , just return once!!");
                                }
                            }
                        });
                    }
                    catch (error) {
                    }
                }
                // 射线后的镜头抖动垂直后座、水平后座
                let y = Math.random() * Y_move;
                let z = (1 - 2 * Math.random()) * Z_move;
                let oldRota = Player.getControllerRotation();
                Player.setControllerRotation(new Rotation(oldRota.x, oldRota.y + y, oldRota.z + z));
                // 触发射击一次完毕的回调
                MyClearGuns_1.onClientOneShootComplete.forEach(callbackfn => callbackfn(this.CurrGunData.Ammo_CurNum, this.CurrGunData.Ammo_CurPrepare));
            }
            // 没子弹了，播放没子弹音效
            else {
                let p = Player.localPlayer;
                let char = p.character;
                MyClearGuns_1.ClientStopShoot();
                this.ServerPlay3DSoundOnGmoj(char.gameObjectId, "27257", 1, 400, 800);
                MyClearGuns_1.ClientReloadAmmo();
            }
        }
    }
    // 【数据层封装】
    /**客户端告诉服务器开火了 */
    ClientTellServerShoot(player) {
        let _pGunData = this.GunName_GunData.get(this.Players_GunName.get(player));
        if (_pGunData != undefined) {
            // 开火音效
            let S_uni = this.Text2SoundUnit(_pGunData.ShootSound);
            this.ServerPlay3DSoundOnGmoj(player.character.gameObjectId, S_uni.guid, S_uni.volume, S_uni.inner, S_uni.outter);
            this.ServerPlayAnnie(_pGunData.ShootAnime, player.userId, 1.5);
            MyClearGuns_1.onPlayerShoot.forEach(callbackfn => callbackfn(player.userId));
        }
        else {
            MyClearGuns_1.ServerDelGun(player);
        }
    }
    /**PIE编辑态客户端找服务器要枪，要的是TempDefaultGunData里的枪，即左侧编辑器上的 */
    ClientAskServerForGun(player) {
        MyClearGuns_1.ServerGiveGun(player, this.TempDefaultGunData.GunName);
    }
    /**双端可用，仅调用端，解析配置列表里的枪械数据，并加入到map里维护 */
    GunDataListIntoMap() {
        this.GunDataJsonList.forEach((value) => {
            this.GunDataIntoMap(value.GunDataJson);
            if (SystemUtil.isClient()) {
                let InptGunData = JSON.parse(value.GunDataJson);
                let result = InptGunData.GunGUID;
                result += ("," + InptGunData.GetGunAnime);
                result += ("," + MyClearGuns_1.instance.Text2SoundUnit(InptGunData.GetGunSound).guid);
                result += ("," + InptGunData.ShootAnime);
                result += ("," + MyClearGuns_1.instance.Text2SoundUnit(InptGunData.ShootSound).guid);
                result += ("," + InptGunData.ReloadAnime);
                result += ("," + MyClearGuns_1.instance.Text2SoundUnit(InptGunData.ReloadStartSound).guid);
                result += ("," + MyClearGuns_1.instance.Text2SoundUnit(InptGunData.ReloadOverSound).guid);
                // console.log("GunDataListIntoMap:" + result);
                this.initAssets(result);
            }
        });
    }
    /**双端可用，仅调用端，将GunDataJson解析，并加入到map里维护 */
    GunDataIntoMap(MyGunDataJSON) {
        let _myGunData = JSON.parse(MyGunDataJSON);
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已导入枪械：" + _myGunData.GunName);
    }
    /**服务器向指定客户端下发临时枪械数据 */
    ChangeClientCurrGunData(player, MyGunDataJSON) {
        let _myGunData = JSON.parse(MyGunDataJSON);
        this.CurrGunData = _myGunData;
    }
    /**客户端向服务器临时导入，将GunDataJson解析，并加入到map里维护，一般用在PIE环境 */
    GunDataIntoServerMap(MyGunDataJSON) {
        let _myGunData = JSON.parse(MyGunDataJSON);
        this.TempDefaultGunData = _myGunData;
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已从客户端临时导入枪械：" + _myGunData.GunName);
    }
    /**服务器向指定客户端临时导入，将GunDataJson解析，并加入到map里维护，一般用在PIE环境 */
    GunDataIntoClientMap(player, MyGunDataJSON) {
        let _myGunData = JSON.parse(MyGunDataJSON);
        this.GunName_GunData.set(_myGunData.GunName, _myGunData);
        // console.log("[MyClearGuns] 已从服务器临时导入枪械：" + _myGunData.GunName);
    }
    /**客户端向服务器上报伤害事件，可以在这里做一定的反作弊检测
     * @param attacker 攻击者guid
     * @param victim 受害者guid
     * @param damege 造成的伤害
     * @param HeadShot 是否爆头，不带参数视为不爆头
     */
    clientLetServerDamageChar(attacker, victim, damege, HeadShot) {
        let victimChar = GameObject.findGameObjectById(victim);
        // 判断攻击者此时有没有枪
        GameObject.asyncFindGameObjectById(attacker).then((obj) => {
            const attackerChar = obj;
            if (this.Players_GunName.get(attackerChar.player) != undefined) {
                // 判断此刻玩家手里的枪的伤害是否正常
                if (this.GunName_GunData.get(this.Players_GunName.get(attackerChar.player)).Projectil_Damage != damege) {
                    damege = this.GunName_GunData.get(this.Players_GunName.get(attackerChar.player)).Projectil_Damage;
                }
                // console.log("[MCG] " + attackerChar.displayName + " 击中了 " + victimChar.displayName + ",造成: " + damege + "点伤害，是否爆头： " + HeadShot);
                MyClearGuns_1.ServerDamageChar.forEach(callbackfn => callbackfn(attackerChar.player.userId, victimChar.player.userId, damege, HeadShot));
            }
            else {
                // 攻击者没枪但是能造成伤害，可能卡了，没有成功下掉他的枪
                // 那就再下一次
                // console.log("攻击者没枪但是能造成伤害，可能卡了，没有成功下掉他的枪");
                MyClearGuns_1.ServerDelGun(attackerChar.player);
            }
        });
    }
    /** 服务器向指定客户端清理客户端枪械数据缓存
     * @param player 指定客户端
     */
    ServerRemoveClientGunData(player) {
        this.CurrGunData = undefined;
    }
    /** 服务器移除所有枪
     * @param player 需要移除的玩家
     */
    ServerDelAllWeapon(player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    // console.log("DelAllGun: " + player.userId + "-" + oldGobj.guid + "  trying destroy gun");
                    oldGobj.destroy();
                    this.PlayersInfo_GunMesh.delete(oldkey);
                }
            }
        });
    }
    /** 服务器隐藏所有枪
     * @param player 需要隐藏的玩家
     */
    ServerHideAllWeapon(player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    oldGobj.setVisibility(2);
                }
            }
        });
    }
    /** 服务器显示所有枪
     * @param player 需要显示的玩家
     */
    ServerShowAllWeapon(player) {
        this.PlayersInfo_GunMesh.forEach((oldGobj, oldkey) => {
            if (oldkey.includes("p_" + player.userId)) {
                if (oldGobj) {
                    oldGobj.setVisibility(1);
                }
            }
        });
    }
    /**判断是否为友军 */
    isFriendly(PlayerID1, PlayerID2) {
        for (const check of MyClearGuns_1.checkIfFriendly) {
            if (check(PlayerID1, PlayerID2)) {
                return true;
            }
        }
        return false;
        // //阵营系统 https://forum.ark.online/forum.php?mod=viewthread&tid=1686
        // return MyClearGuns.instance.isFriendly(PlayerID1, PlayerID2);
    }
    /**服务器下发装备枪的事件给客户端 */
    serverLetClientEquipedGun(player, gunName) {
        // 被下掉枪后要停止换弹状态
        this.isReloading = false;
        // 触发拿到武器后的回调
        MyClearGuns_1.onClientEquipedGun.forEach(callbackfn => callbackfn(gunName, this.CurrGunData.Ammo_CurNum, this.CurrGunData.Ammo_CurPrepare));
        // //无限弹药逻辑：将备弹改为一个弹匣的数量
        // this.CurrGunData.Ammo_CurPrepare = this.CurrGunData.Ammo_MaxInOne;
        // 这里写你的逻辑
    }
    /**服务器下掉枪后向客户端通信 */
    serverLetClientRemovedGun(player) {
        // 这里写你的逻辑
        // 被下掉枪后要停止换弹状态
        this.isReloading = false;
        // 被下掉枪后要停止开火
        MyClearGuns_1.ClientStopShoot();
        MyClearGuns_1.onClientRemovedGun.forEach(callbackfn => callbackfn());
    }
    //【表现层封装】
    /** 服务器给玩家装备枪械模型
     * @param guid 武器guid
     * @param player 需要装配枪械的玩家
     * @param offset 枪械的偏移
     * @param rotation 枪械的旋转
     * @param scale 枪械的缩放
     */
    async ServerEquipWeapon(guid, player, offset, rotation, scale) {
        /**枪械储存标识符 */
        let PlayerInfoGunGUID = "p_" + player.userId;
        this.ServerDelAllWeapon(player);
        GameObject.asyncSpawn(guid, { replicates: true }).then((MyNewGobj) => {
            if (offset == undefined) {
                offset = Vector.zero;
            }
            if (rotation == undefined) {
                rotation = Rotation.zero;
            }
            if (scale == undefined) {
                scale = Vector.one;
            }
            offset = new Vector(offset.x, offset.y, offset.z);
            rotation = new Rotation(rotation.x, rotation.y, rotation.z);
            scale = new Vector(scale.x, scale.y, scale.z);
            let MyTransform = new Transform(offset, rotation, scale);
            MyNewGobj.worldTransform = MyTransform;
            MyNewGobj.setCollision(2);
            MyNewGobj.getChildren().forEach((ggobj) => {
                ggobj.setCollision(2);
            });
            player.character.attachToSlot(MyNewGobj, 16);
            PlayerInfoGunGUID += MyNewGobj.gameObjectId;
            this.PlayersInfo_GunMesh.set(PlayerInfoGunGUID, MyNewGobj);
            // console.log("MyNewGobjGUID:" + MyNewGobj.guid + ", pinfo:" + PlayerInfoGunGUID);
        });
    }
    /**子弹击中墙面声效，客户端向服务器发起同步，默认1200内可见可听，受裁剪影响
     * @param loc 弹痕特效、声音的位置
     * @param rot 弹痕特效的旋转
     */
    ServerHitMesh(loc, rot) {
        Player.getAllPlayers().forEach((player) => {
            let dis = loc.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= (1200 * this.EffectCutDistanceScale)) {
                this.ServerPlayEffectOnLoc("98962", 1, loc, rot, Vector.one, 1200);
            }
            if (dis <= (800 * this.EffectCutDistanceScale)) {
                this.ServerPlay3DSoundOnLoc(loc, "114172", 1, 4, 8);
            }
        });
    }
    /**子弹确认击中角色声效，客户端向服务器发起同步，默认1200内可见可听，受裁剪影响，建议在此之前判断好是否是队友
     * @param CharGuid 确认击中的角色
     * @param loc 击中位置
     * @param rot 特效的旋转
     * @param hitAinimGuid 可选，受击者需要播放的动画，默认46284
     */
    ServerHitChar(CharGuid, loc, rot, hitAinimGuid) {
        let char = GameObject.findGameObjectById(CharGuid);
        let hitAnime = char.loadAnimation("46284");
        // console.log("hit.z: " + loc.z + ", char.z: " + char.worldTransform.position.z + ", collison.z: " + char.collisionExtent.z);
        if (!char.isCrouching) {
            hitAnime.play();
            // if (loc.z - char.worldTransform.position.z - char.collisionExtent.z >= -38) {
            //     console.log("head shot!");
            // }
        }
        else {
            hitAnime.slot = AnimSlot.Upper;
            hitAnime.play();
            // if (loc.z - char.worldTransform.position.z - char.collisionExtent.z >= -10) {
            //     console.log("head shot!");
            // }
        }
        Player.getAllPlayers().forEach((player) => {
            let dis = char.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= (1200 * this.EffectCutDistanceScale)) {
                let MyScal = Vector.one.multiply(0.3);
                this.ServerPlayEffectOnLoc("29392", 1, loc, rot, MyScal, 1200);
            }
            if (dis <= (800 * this.EffectCutDistanceScale)) {
                this.ServerPlay3DSoundOnLoc(loc, "115257", 1, 4, 8);
            }
        });
    }
    //【声效相关】
    /** 服务器在指定位置播放3D声音，自动裁剪
     * @param guid 播放声音的GUID,<=0时不播放
     * @param startLoc 播放声音的起始位置
     * @param volume 播放声音的音量
     * @param inner 声音的内径，1=1个正方体的边长=100
     * @param outter 声音的外径,超过外径*全局缩放比的距离的玩家将不会接收到改声音，以节省性能
     */
    ServerPlay3DSoundOnLoc(startLoc, guid, volume, inner, outter) {
        if (Number(guid) <= 0) {
            return;
        }
        const in_ = inner;
        const out_ = outter;
        inner = in_ < out_ ? in_ : out_;
        outter = in_ >= out_ ? in_ : out_;
        inner *= MyClearGuns_1.instance.SoundCutDistanceScale * 100;
        outter *= MyClearGuns_1.instance.SoundCutDistanceScale * 100;
        startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
        Player.getAllPlayers().forEach((player) => {
            let dis = startLoc.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= outter) {
                this.ClientPlay3DSoundOnLoc(player, startLoc, guid, volume, inner, outter);
            }
        });
    }
    /** 客户端被服务器RPC在指定位置播放3D声音
     * @param player 指定的客户端
     * @param guid 播放声音的GUID
     * @param startLoc 播放声音的起始位置
     * @param volume 播放声音的音量
     * @param inner 声音的内径
     * @param outter 声音的外径
     */
    ClientPlay3DSoundOnLoc(player, startLoc, guid, volume, inner, outter) {
        // 2023.12.03 尝试修复开火声音丢失问题
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((result) => {
                if (result) {
                    startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
                    SoundService.play3DSound(guid, startLoc, 1, volume, { radius: inner, falloffDistance: outter });
                }
            });
        }
        else {
            startLoc = new Vector(startLoc.x, startLoc.y, startLoc.z);
            SoundService.play3DSound(guid, startLoc, 1, volume, { radius: inner, falloffDistance: outter });
        }
    }
    /** 服务器在指定Gmoj播放3D声音，自动裁剪
     * @param guid 播放声音的GUID,<=0时不播放
     * @param Gmojguid 播放声音的Gameobject的GUID
     * @param volume 播放声音的音量
     * @param inner 声音的内径，1=1个正方体的边长=100
     * @param outter 声音的外径,超过外径*全局缩放比的距离的玩家将不会接收到改声音，以节省性能
     */
    ServerPlay3DSoundOnGmoj(Gmojguid, guid, volume, inner, outter) {
        if (Number(guid) <= 0) {
            return;
        }
        const in_ = inner;
        const out_ = outter;
        inner = in_ < out_ ? in_ : out_;
        outter = in_ >= out_ ? in_ : out_;
        inner *= MyClearGuns_1.instance.SoundCutDistanceScale * 100;
        outter *= MyClearGuns_1.instance.SoundCutDistanceScale * 100;
        let obj = GameObject.findGameObjectById(Gmojguid);
        Player.getAllPlayers().forEach((player) => {
            let dis = obj.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= outter) {
                this.ClientPlay3DSoundOnGmoj(player, Gmojguid, guid, volume, inner, outter);
            }
        });
    }
    /** 客户端被服务器RPC在指定Gmoj上播放3D声音
     * @param player 指定的客户端
     * @param guid 播放声音的GUID
     * @param Gmojguid 播放声音的Gameobject的GUID
     * @param volume 播放声音的音量
     * @param inner 声音的内径
     * @param outter 声音的外径
     */
    ClientPlay3DSoundOnGmoj(player, Gmojguid, guid, volume, inner, outter) {
        // 2023.12.03 尝试修复开火声音丢失问题
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((result) => {
                if (result) {
                    SoundService.play3DSound(guid, Gmojguid, 1, volume, { radius: inner, falloffDistance: outter });
                }
            });
        }
        else {
            SoundService.play3DSound(guid, Gmojguid, 1, volume, { radius: inner, falloffDistance: outter });
        }
    }
    //【特效相关】
    /** 服务器在指定position上播放特效，自动裁剪
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     * @param distance 最大可视距离，超视距就不同步给客户端了
     */
    ServerPlayEffectOnLoc(guid, loop, position, rotation, scale, distance) {
        if (Number(guid) <= 0) {
            return;
        }
        position = new Vector(position.x, position.y, position.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        distance *= MyClearGuns_1.instance.EffectCutDistanceScale;
        Player.getAllPlayers().forEach((player) => {
            let dis = position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= distance) {
                this.ClientPlayEffectOnLoc(player, guid, loop, position, rotation, scale);
            }
        });
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    ClientPlayEffectOnLoc(player, guid, loop, position, rotation, scale) {
        position = new Vector(position.x, position.y, position.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        EffectService.playAtPosition(guid, position, {
            loopCount: loop,
            rotation: rotation,
            scale: scale
        });
    }
    /** 服务器在指定GUID的Gameobject上播放特效，自动裁剪
     * @param guid 特效guid，<=0不播放
     * @param gmobjGUID 需要播放特效的gameobject
     * @param loop 循环次数，负数则为时间
     * @param offset 特效的偏移
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     * @param distance 最大可视距离，超视距就不同步给客户端了
     */
    ServerPlayEffectAtGmoj(guid, gmobjGUID, loop, offset, rotation, scale, distance) {
        if (Number(guid) <= 0) {
            return;
        }
        GameObject.asyncFindGameObjectById(gmobjGUID).then((gmobj) => {
            offset = new Vector(offset.x, offset.y, offset.z);
            rotation = new Rotation(rotation.x, rotation.y, rotation.z);
            scale = new Vector(scale.x, scale.y, scale.z);
            distance *= MyClearGuns_1.instance.EffectCutDistanceScale;
            Player.getAllPlayers().forEach((player) => {
                let dis = gmobj.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
                if (dis <= distance) {
                    this.ClientPlayEffectAtGmoj(player, guid, gmobjGUID, loop, offset, rotation, scale);
                }
            });
        });
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param gmobjGUID 需要播放特效的gameobject
     * @param loop 循环次数，负数则为时间
     * @param offset 特效的偏移
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    ClientPlayEffectAtGmoj(player, guid, gmobjGUID, loop, offset, rotation, scale) {
        offset = new Vector(offset.x, offset.y, offset.z);
        rotation = new Rotation(rotation.x, rotation.y, rotation.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        GameObject.asyncFindGameObjectById(gmobjGUID).then((gmobj) => {
            EffectService.playOnGameObject(guid, gmobj, {
                position: offset, rotation: rotation, loopCount: loop, scale: scale
            });
            //loop, offset, rotation, scale
        });
    }
    //【动画相关】
    /**服务器在指定玩家身上广播指定动画，自动距离裁剪
     * @param guid 动画guid
     * @param AnnieplayerID 要播放动画的玩家
     * @param speed 播放动画的速度
     * @returns
     */
    ServerPlayAnnie(guid, AnnieplayerID, speed) {
        if (Number(guid) <= 0) {
            return;
        }
        if (speed == undefined) {
            speed = 1;
        }
        Player.getAllPlayers().forEach((player) => {
            let dis = Player.getPlayer(AnnieplayerID).character.worldTransform.position.clone().subtract(player.character.worldTransform.position.clone()).magnitude;
            if (dis <= this.AnnieCutDistance) {
                let fireEffectID = [];
                this.PlayersInfo_GunMesh.forEach((Gunmesh, key) => {
                    if (key.includes(AnnieplayerID)) {
                        Gunmesh.getChildren().forEach(gobj => {
                            if (gobj.tag == "FireEffect") {
                                fireEffectID.push(gobj.gameObjectId);
                            }
                        });
                    }
                });
                this.ClientPlayAnnie(player, guid, AnnieplayerID, speed, fireEffectID);
            }
        });
    }
    /** 客户端被服务器RPC在指定GUID的Gameobject上播放特效
     * @param player 指定的客户端
     * @param guid 特效guid，<=0不播放
     * @param loop 循环次数，负数则为时间
     * @param position 特效的位置
     * @param rotation 特效的旋转
     * @param scale 特效的缩放
     */
    ClientPlayAnnie(player, guid, AnnieplayerID, speed, fireEffectID) {
        const PChar = Player.getPlayer(AnnieplayerID).character;
        if (PChar) {
            const _anim = PChar.loadAnimation(guid);
            _anim.speed = speed;
            _anim.loop = 1;
            _anim.slot = AnimSlot.Upper;
            _anim.play();
        }
        if (fireEffectID.length != 0) {
            fireEffectID.forEach((EID) => {
                GameObject.asyncFindGameObjectById(EID).then((v) => {
                    v.play();
                    setTimeout(() => {
                        v.stop();
                    }, 60);
                });
            });
        }
    }
    ////////////////////////////
    //       通用工具接口      //
    ////////////////////////////
    getShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, false, [], false, true, chara);
            dir = end.subtract(start);
            if (hits.length > 1) {
                dir = hits[1].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    /** 将SoundUnit音效通用基元转换为String
     * @param S_uni 需要转换的音效通用基元
     * @returns 返回转换后的String: guid|volume|inner|outter
     */
    SoundUnit2Text(S_uni) {
        return (S_uni.guid + "|" + S_uni.volume + "|" + S_uni.inner + "|" + S_uni.outter);
    }
    /** 文本String转SoundUnit音效通用基元，格式不对返回基元的默认值 */
    Text2SoundUnit(Text) {
        let myS_uni = new SoundUnit;
        let parts = Text.split("|").map(parseFloat);
        if (parts.length != 4 || parts.some(isNaN)) {
            return myS_uni;
        }
        else {
            myS_uni.guid = parseInt(parts[0] + "") + "";
            myS_uni.volume = parts[1];
            myS_uni.inner = parts[2];
            myS_uni.outter = parts[3];
            return myS_uni;
        }
    }
    /** v3、旋转变量转换为string
    * @param v3 传入的v3或旋转
    * @returns 返回转换好的string
    */
    v3toString(v3) {
        let st = v3.x + "|" + v3.y + "|" + v3.z;
        return st;
    }
    /**文本转Rotation，如格式不对则返回Rotation.Zero */
    stringToRotation(st) {
        let parts = st.split("|").map(parseFloat);
        if (parts.length != 3 || parts.some(isNaN)) {
            return Rotation.zero;
        }
        else {
            return new Rotation(parts[0], parts[1], parts[2]);
        }
    }
    /**文本转Vector，如格式不对则返回Vector.one */
    stringToVector(st) {
        let parts = st.split("|").map(parseFloat);
        if (parts.length != 3 || parts.some(isNaN)) {
            return Vector.one;
        }
        else {
            return new Vector(parts[0], parts[1], parts[2]);
        }
    }
    toServer(obj, player, objName) {
        // console.log("进入命中服务端")
        EffectService.playOnGameObject("27422", obj);
        SoundService.play3DSound("199431", obj, 1, 80, { radius: 1500, falloffDistance: 2000 });
        obj.setVisibility(false);
        obj.setCollision(CollisionStatus.Off);
        let settlementManager = SettlementManager.getInstance();
        let score;
        if (objName.includes("地狱龙")) {
            score = 2;
        }
        if (objName.includes("宠物")) {
            score = 1;
        }
        settlementManager.AddPlayerCount(player.userId, score);
        // console.log("玩家"+player.userId+" 命中"+settlementManager.GetPlayerCount(player.userId)+"次")
        Event.dispatchToClient(player, "L6_Hurt", settlementManager.GetPlayerCount(player.userId));
    }
};
// _isReady 标志用于指示 MyClearGuns 是否已经准备就绪
MyClearGuns._isReady = false;
// _instance 用于存储 MyClearGuns 的实例
MyClearGuns._instance = null;
// _queuedOperations 数组用于存储还未执行的方法调用
MyClearGuns._queuedOperations = [];
////////////////////////////
//   建议开发者调用的接口   //
////////////////////////////
/**检查两个PlayerID是否为友军 */
MyClearGuns.checkIfFriendly = [];
//----[事件]----//
/**[纯客户端] 成功拿到枪后调用，可以在这里改UI、摄像机属性
 * @param gunName: 枪名
 */
MyClearGuns.onClientEquipedGun = [];
/**纯客户端，每批次射击完成时调用，不管半自动还是全自动，也不管子弹数，打一次射线就会掉一次，可以在这里接UI更新子弹数 */
MyClearGuns.onClientOneShootComplete = [];
/**纯客户端，每次成功换弹后调用，可以在这里接UI更新子弹数 */
MyClearGuns.onClientReloadComplete = [];
/**纯客户端，成功下掉枪后调用，可以在这里改UI、摄像机属性 */
MyClearGuns.onClientRemovedGun = [];
/**纯客户端，当客户端击中敌方时，可以在这里修改UI、播放集中音效、提示等，但此时并未造成伤害，伤害仅由服务端执行
 * @param victim 被击中的玩家角色
 * @param damage 伤害值
 */
MyClearGuns.onClientHit = [];
/**服务器处理伤害事件
 * @param attacker 攻击者guid
 * @param victim 受害者guid
 * @param damege 造成的伤害
 * @param HeadShot 是否爆头，不带参数视为不爆头
 */
MyClearGuns.ServerDamageChar = [];
/**服务器，检测到玩家开火事件 */
MyClearGuns.onPlayerShoot = [];
__decorate([
    mw.Property({ displayName: "优先加载", group: "全局设置", tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复" })
], MyClearGuns.prototype, "NeedloadAssets", void 0);
__decorate([
    mw.Property({ displayName: "编辑状态", group: "全局设置", tooltip: "进游戏后是否能看到枪械编辑UI" })
], MyClearGuns.prototype, "EditorMode", void 0);
__decorate([
    mw.Property({ displayName: "音效距离系数", group: "距离裁剪", tooltip: "音效广播距离的全局缩放裁剪系数，可通过调整该系数降低rpc压力" })
], MyClearGuns.prototype, "SoundCutDistanceScale", void 0);
__decorate([
    mw.Property({ displayName: "特效距离系数", group: "距离裁剪", tooltip: "特效广播距离的全局缩放裁剪系数，可通过调整该系数降低rpc压力" })
], MyClearGuns.prototype, "EffectCutDistanceScale", void 0);
__decorate([
    mw.Property({ displayName: "动画裁剪距离", group: "距离裁剪", tooltip: "超过这个距离将看不到其他玩家的开火、换弹动画" })
], MyClearGuns.prototype, "AnnieCutDistance", void 0);
__decorate([
    mw.Property({ displayName: "枪械配置", group: "枪械库", tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复" })
], MyClearGuns.prototype, "GunDataJsonList", void 0);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ClientTellServerShoot", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ClientAskServerForGun", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ChangeClientCurrGunData", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "GunDataIntoServerMap", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "GunDataIntoClientMap", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "clientLetServerDamageChar", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ServerRemoveClientGunData", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerDelAllWeapon", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerHideAllWeapon", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerShowAllWeapon", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "serverLetClientEquipedGun", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "serverLetClientRemovedGun", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerEquipWeapon", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerHitMesh", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerHitChar", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerPlay3DSoundOnLoc", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ClientPlay3DSoundOnLoc", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerPlay3DSoundOnGmoj", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ClientPlay3DSoundOnGmoj", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerPlayEffectOnLoc", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ClientPlayEffectOnLoc", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerPlayEffectAtGmoj", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ClientPlayEffectAtGmoj", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns.prototype, "ServerPlayAnnie", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns.prototype, "ClientPlayAnnie", null);
__decorate([
    RemoteFunction(Server)
], MyClearGuns.prototype, "toServer", null);
__decorate([
    mw.RemoteFunction(mw.Client)
], MyClearGuns, "ClientAddAmmo", null);
__decorate([
    mw.RemoteFunction(mw.Server)
], MyClearGuns, "ServerGiveGun", null);
MyClearGuns = MyClearGuns_1 = __decorate([
    Component
], MyClearGuns);
var MyClearGuns$1 = MyClearGuns;

var foreign65 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MyClearGuns$1
});

let L_6 = class L_6 extends Script {
    constructor() {
        super(...arguments);
        this.targetObj = null;
        this.dtick = 0;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法六bgm资源
            AssetUtil.asyncDownloadAsset("162450");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level6", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(6);
        //传送玩家到玩6位置
        let levelpos = GameObject.findGameObjectByName("Level6Start").worldTransform.position;
        //进入玩法六后,禁用玩法六BGM
        setTimeout(() => {
            SoundService.stopSound("162450");
        }, 66 * 1000);
        //进入玩法六后,播放玩法六BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 7 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x + MathUtil.randomFloat(-500.00, 500.00), levelpos.y, levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, -90);
            player.character.movementEnabled = false;
            setTimeout(() => {
                player.character.movementEnabled = true;
                // 玩家最大速度
                player.character.maxWalkSpeed = 450;
                Event.dispatchToLocal("Level6Init");
                MyClearGuns$1.instance;
                MyClearGuns$1.ServerGiveRandomGun(player);
                this.ChangeCamera(player, 1, globalManager.getLevelTime(6));
            }, 6 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(6), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(6));
            this.Level6Fun();
        }, 6 * 1000);
    }
    // 播放玩法6全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "162450";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    async Level6Fun() {
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 64 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L6UI/L6_IntroUI", L6_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 3 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 3 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 4 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 7 * 1000);
    }
    ChangeCamera(play, type, time) {
        if (type == 1) {
            this.useUpdate = true;
            Camera.currentCamera.preset = CameraPreset.TPSOverShoulderAngle;
            if (this.shootUI != null) {
                this.shootUI.destroy();
                this.shootUI = null;
            }
            //初始化射击UI
            this.shootUI = mw.createUI("L6UI/L6_ShootUI", L6_ShootUI);
            this.shootUI.uiWidgetBase.addToViewport(10);
            this.shootUI.bullets.text = "30";
            this.shootUI.score.text = "0";
            //射击按钮绑定
            this.shootUI.shootButton.onClicked.add(() => {
                MyClearGuns$1.ClientStartShoot();
            });
            //监听子弹数量变化
            MyClearGuns$1.onClientOneShootComplete.push((curAmmo, preAmmo) => {
                console.log("射击后，当前弹药:", curAmmo);
                this.shootUI.bullets.text = curAmmo.toString();
                if (curAmmo == 0) {
                    MyClearGuns$1.ServerDelGun(Player.localPlayer);
                    this.ChangeCamera(Player.localPlayer, 3, time);
                }
            });
            //监听倒计时结束
            setTimeout(() => {
                this.useUpdate = false;
                MyClearGuns$1.ServerDelGun(Player.localPlayer);
                Camera.currentCamera.preset = CameraPreset.Default;
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
                this.shootUI.destroy();
                this.shootUI = null;
            }, time * 1000);
            Event.addServerListener("L6_Hurt", (totalScore) => {
                this.shootUI.score.text = totalScore.toString();
            });
        }
        if (type == 3) {
            this.useUpdate = false;
            Camera.currentCamera.preset = CameraPreset.Default;
            Camera.currentCamera.fov = 90;
            Camera.currentCamera.springArm.length = 400;
            Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
            Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            //this.shootUI.destroy();
            //this.shootUI = null;
        }
    }
    onUpdate(dt) {
        if (SystemUtil.isClient()) {
            this.dtick = this.dtick + 1;
            let p = Player.localPlayer;
            let dirction = Camera.currentCamera.worldTransform.getForwardVector();
            let start = p.character.worldTransform.position.clone().add(Vector.multiply(dirction, 30)).clone().add(new Vector(0, 0, 30));
            let end = Camera.currentCamera.worldTransform.position.add(Camera.currentCamera.worldTransform.getForwardVector().multiply(5000));
            const hits = QueryUtil.lineTrace(Camera.currentCamera.worldTransform.position, end, true, false, [], false, true, p.character);
            end.subtract(start);
            if (hits.length > 1) {
                hits[1].impactPoint.subtract(start);
                if (hits[1].gameObject.name.includes("地狱龙") || hits[1].gameObject.name.includes("宠物")) {
                    this.targetObj = hits[1].gameObject;
                }
                else {
                    this.targetObj = null;
                }
            }
            InputUtil.onTouchMove((index, location, touchType) => {
                console.error(`===>onTouchMove: ${index}, ${location}, ${touchType}`);
                this.targetObj = null;
            });
            if (this.dtick % 5 == 0) {
                this.targetObj = null;
            }
            if (this.targetObj) {
                if (this.targetObj.getVisibility() == false)
                    this.targetObj = null;
                if (this.targetObj) {
                    let P2Gdir = this.targetObj.worldTransform.position.subtract(Camera.currentCamera.worldTransform.position);
                    Camera.currentCamera.worldTransform.rotation;
                    P2Gdir.toRotation();
                    let targetPos = this.targetObj.worldTransform.position;
                    Camera.currentCamera.lookAt(new Vector(targetPos.x, targetPos.y, targetPos.z + 50));
                }
            }
        }
    }
};
__decorate([
    RemoteFunction(Server)
], L_6.prototype, "Level6Fun", null);
__decorate([
    RemoteFunction(Client)
], L_6.prototype, "InClientFun", null);
__decorate([
    RemoteFunction(Client)
], L_6.prototype, "ChangeCamera", null);
L_6 = __decorate([
    Component
], L_6);
var L_6$1 = L_6;

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_6$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L7UI/L7_IntroUI.ui
*/
let L7_IntroUI_Generate = class L7_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L7_IntroUI_Generate = __decorate([
    UIBind('UI/L7UI/L7_IntroUI.ui')
], L7_IntroUI_Generate);
var L7_IntroUI_Generate$1 = L7_IntroUI_Generate;

var foreign130 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L7_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.13-20.43.12
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L7_IntroUI extends L7_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign95 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L7_IntroUI
});

// import LevelLoadUI from "../../UI/LevelLoadUI";
let L_7 = class L_7 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.useUpdate = true;
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法七bgm资源
            AssetUtil.asyncDownloadAsset("121746");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level7", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(7);
        Event.dispatchToLocal("Level7Init");
        //传送玩家到玩法7位置
        let levelpos = GameObject.findGameObjectByName("Level7Start").worldTransform.position;
        //进入玩法后,禁用玩法BGM
        setTimeout(() => {
            SoundService.stopSound("121746");
        }, 93 * 1000);
        //进入玩法后,播放玩法BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 8 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x, levelpos.y + MathUtil.randomFloat(-500.00, 500.00), levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, 0);
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                //玩家最大速度
                player.character.maxWalkSpeed = 400;
            }, 8 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(7), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(7));
        }, 8 * 1000);
    }
    // 播放玩法1全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "121746";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        // let loadui = mw.createUI("LevelLoadUI",LevelLoadUI);
        // loadui.uiWidgetBase.addToViewport(10); 
        // loadui.ShowLevelUIById(levelCoundId)
        // setTimeout(() => {
        //     loadui.destroy();
        // }, 93*1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L7UI/L7_IntroUI", L7_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 7 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 8 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 9 * 1000);
    }
    onUpdate(dt) {
        TweenUtil.TWEEN.update();
    }
};
__decorate([
    RemoteFunction(Client)
], L_7.prototype, "InClientFun", null);
L_7 = __decorate([
    Component
], L_7);
var L_7$1 = L_7;

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_7$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L8UI/L8_IntroUI.ui
*/
let L8_IntroUI_Generate = class L8_IntroUI_Generate extends UIScript {
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L8_IntroUI_Generate = __decorate([
    UIBind('UI/L8UI/L8_IntroUI.ui')
], L8_IntroUI_Generate);
var L8_IntroUI_Generate$1 = L8_IntroUI_Generate;

var foreign131 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L8_IntroUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.13-20.43.40
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class L8_IntroUI extends L8_IntroUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign96 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L8_IntroUI
});

let L_8 = class L_8 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.useUpdate = true;
        // 下列代码仅在服务端执行
        if (SystemUtil.isServer()) {
            //异步下载玩法一bgm资源
            AssetUtil.asyncDownloadAsset("129648");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    this.LevelStart(0);
                }
            });
            Event.addLocalListener("CGS_Level8", () => {
                this.LevelStart(1);
            });
        }
    }
    //玩法入口函数
    LevelStart(GameType) {
        const allPlayersIds = Player.getAllPlayers().map(player => player.userId);
        let globalManager = GlobalManager.getInstance();
        globalManager.setGameType(GameType);
        globalManager.setLevelId(8);
        Event.dispatchToLocal("Level8Init");
        //传送玩家到玩法8位置
        let levelpos = GameObject.findGameObjectByName("Level8Start").worldTransform.position;
        //进入玩法后,禁用玩法BGM
        setTimeout(() => {
            SoundService.stopSound("129648");
        }, 83 * 1000);
        //进入玩法后,播放玩法BGM
        setTimeout(() => {
            this.playGlobalBGM();
        }, 8 * 1000);
        for (let i = 0; i < allPlayersIds.length; i++) {
            //初始化玩家分数
            globalManager.AddPlayerScore(allPlayersIds[i], 0);
            let player = Player.getPlayer(allPlayersIds[i]);
            player.character.worldTransform.position = new Vector(levelpos.x, levelpos.y + MathUtil.randomFloat(-500.00, 500.00), levelpos.z);
            // if(i==0) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y+500.00,levelpos.z);
            // if(i==1) player.character.worldTransform.position = new Vector(levelpos.x,levelpos.y-500.00,levelpos.z);
            player.character.worldTransform.rotation = new Rotation(0, 0, 0);
            player.character.setStateEnabled(CharacterStateType.Running, false);
            setTimeout(() => {
                player.character.setStateEnabled(CharacterStateType.Running, true);
                //玩家最大速度
                player.character.maxWalkSpeed = 400;
            }, 8 * 1000);
            this.InClientFun(player, globalManager.getLevelTime(8), globalManager.getLevelCount());
        }
        setTimeout(() => {
            Event.dispatchToLocal("initCountDown", globalManager.getLevelTime(8));
        }, 8 * 1000);
    }
    // 播放玩法1全局BGM
    playGlobalBGM() {
        const bgmSoundAssetId = "129648";
        SoundService.playBGM(bgmSoundAssetId, 0.6);
    }
    //客户端调用
    InClientFun(player, num, levelCoundId) {
        let loadui = mw.createUI("LevelLoadUI", LevelLoadUI);
        loadui.uiWidgetBase.addToViewport(10);
        loadui.ShowLevelUIById(levelCoundId);
        setTimeout(() => {
            loadui.destroy();
        }, 83 * 1000);
        // 异步下载倒计时开始音效资源
        AssetUtil.asyncDownloadAsset("132944");
        let introui = mw.createUI("L8UI/L8_IntroUI", L8_IntroUI);
        introui.uiWidgetBase.addToViewport(10);
        let hotui = mw.createUI("HotTimeUI", HotTimeUI);
        hotui.uiWidgetBase.addToViewport(10);
        // hotui.image.visibility = SlateVisibility.Collapsed;
        hotui.number.visibility = SlateVisibility.Collapsed;
        hotui.number_1.visibility = SlateVisibility.Collapsed;
        hotui.number_2.visibility = SlateVisibility.Collapsed;
        hotui.image_go.visibility = SlateVisibility.Collapsed;
        setTimeout(() => {
            introui.destroy();
            // hotui.image.visibility = SlateVisibility.Visible;
            hotui.number.visibility = SlateVisibility.Visible;
        }, 5 * 1000);
        setTimeout(() => {
            SoundService.playSound("132944");
        }, 5 * 1000);
        setTimeout(() => {
            hotui.number.visibility = SlateVisibility.Collapsed;
            hotui.number_2.visibility = SlateVisibility.Visible;
        }, 6 * 1000);
        setTimeout(() => {
            hotui.number_2.visibility = SlateVisibility.Collapsed;
            hotui.number_1.visibility = SlateVisibility.Visible;
        }, 7 * 1000);
        setTimeout(() => {
            hotui.number_1.visibility = SlateVisibility.Collapsed;
            hotui.image_go.visibility = SlateVisibility.Visible;
        }, 8 * 1000);
        setTimeout(() => {
            hotui.destroy();
            Event.dispatchToLocal("initCountDown", num);
        }, 9 * 1000);
    }
    onUpdate(dt) {
        TweenUtil.TWEEN.update();
    }
};
__decorate([
    RemoteFunction(Client)
], L_8.prototype, "InClientFun", null);
L_8 = __decorate([
    Component
], L_8);
var L_8$1 = L_8;

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L_8$1
});

let MoTianLun = class MoTianLun extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const roll = this.gameObject;
        const children = roll.getChildren();
        for (const child of children) {
            child.setAbsolute(false, true, false);
        }
    }
};
MoTianLun = __decorate([
    Component
], MoTianLun);
var MoTianLun$1 = MoTianLun;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MoTianLun$1
});

let Launch$2 = class Launch extends Script {
    constructor() {
        super(...arguments);
        // 填写触发器的 GameObjectId
        this.triggerGameObjectId = "2864AAE8";
        // 填写交互物的 GameObjectId
        this.interactiveGameObjectId = "3CAE9C07";
    }
    async onStart() {
        // 因为是坐下是个动作，我们只需要在客户端表现，这里就在客户端运行
        if (SystemUtil.isClient()) {
            // 下载并加载 173334 资源
            await AssetUtil.asyncDownloadAsset("173334");
            // 获取交互物
            const interactive = (await GameObject.asyncFindGameObjectById(this.interactiveGameObjectId));
            // 获取触发器
            const trigger = (await GameObject.asyncFindGameObjectById(this.triggerGameObjectId));
            // 触发器事件绑定
            trigger.onEnter.add(go => {
                // 判断进入碰撞区域的对象是否为角色
                if (!(go instanceof Character)) {
                    // 不是角色，停止执行
                    return;
                }
                // 让该角色进入交互
                interactive.enter(go);
                interactive.enter(go);
                // 3000 毫秒后离开交互，并移动到(0,0,200)
                setTimeout(() => {
                    interactive.leave(new Vector(3356.81, -5752.69, 2));
                }, 6000);
            });
        }
    }
};
Launch$2 = __decorate([
    Component
], Launch$2);
var Launch$3 = Launch$2;

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Launch$3
});

let SkyWheel = class SkyWheel extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const roll = this.gameObject;
        const children = roll.getChildren();
        for (const child of children) {
            child.setAbsolute(false, true, false);
        }
    }
};
SkyWheel = __decorate([
    Component
], SkyWheel);
var SkyWheel$1 = SkyWheel;

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SkyWheel$1
});

let Launch = class Launch extends Script {
    constructor() {
        super(...arguments);
        // 填写触发器的 GameObjectId
        this.triggerGameObjectId = "1EDB92B0";
        // 填写交互物的 GameObjectId
        this.interactiveGameObjectId = "31DA03FB";
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    async onStart() {
        // 因为是坐下是个动作，我们只需要在客户端表现，这里就在客户端运行
        if (SystemUtil.isClient()) {
            // 下载并加载 35400 资源
            await AssetUtil.asyncDownloadAsset("35400");
            // 获取交互物
            const interactive = (await GameObject.asyncFindGameObjectById(this.interactiveGameObjectId));
            // 获取触发器
            const trigger = (await GameObject.asyncFindGameObjectById(this.triggerGameObjectId));
            // 触发器事件绑定
            trigger.onEnter.add(go => {
                // 判断进入碰撞区域的对象是否为角色
                if (!(go instanceof Character)) {
                    // 不是角色，停止执行
                    return;
                }
                // 让该角色进入交互
                interactive.enter(go);
                // 3000 毫秒后离开交互，并移动到(0,0,200)
                setTimeout(() => {
                    interactive.leave(new Vector(-7729.02, -1591.63, 3.00));
                }, 3000);
            });
        }
    }
};
Launch = __decorate([
    Component
], Launch);
var Launch$1 = Launch;

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Launch$1
});

let UIDefault = class UIDefault extends mw.UIScript {
    /* 解析资源ID列表 */
    resolveString(assetIds) {
        let assetIdArray = new Array();
        let assetId = "";
        let s = assetIds.split("");
        for (let a of s) {
            if (a == ",") {
                assetIdArray.push(assetId);
                assetId = "";
            }
            else {
                assetId += a;
            }
        }
        if (assetId) {
            assetIdArray.push(assetId);
        }
        return assetIdArray;
    }
    /* 初始化资源 */
    initAssets(assetIds) {
        let assetIdArray = this.resolveString(assetIds);
        for (let element of assetIdArray) {
            mw.AssetUtil.asyncDownloadAsset(element);
        }
    }
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        //初始化动画资源 
        this.initAssets("95777,61245");
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        //找到对应的跳跃按钮
        const JumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump');
        const AttackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack');
        const InteractBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Interact');
        //点击跳跃按钮,异步获取人物后执行跳跃
        JumpBtn.onPressed.add(() => {
            if (this.Character) {
                this.Character.changeState(CharacterStateType.Jumping);
            }
            else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this.Character = player.character;
                    //角色执行跳跃功能
                    this.Character.changeState(CharacterStateType.Jumping);
                });
            }
        });
        //点击攻击按钮,异步获取人物后执行攻击动作
        AttackBtn.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.Character = player.character;
                //让动画只在上半身播放
                let anim1 = player.character.loadAnimation("61245");
                anim1.slot = mw.AnimSlot.Upper;
                //角色执行攻击动作
                if (anim1.isPlaying) {
                    return;
                }
                else {
                    anim1.play();
                }
            });
        });
        //点击交互按钮,异步获取人物后执行交互动作
        InteractBtn.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.Character = player.character;
                //让动画只在上半身播放
                let anim2 = player.character.loadAnimation("95777");
                anim2.slot = mw.AnimSlot.Upper;
                //角色执行交互动作
                if (anim2.isPlaying) {
                    return;
                }
                else {
                    anim2.play();
                }
            });
        });
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
};
UIDefault = __decorate([
    UIBind('')
], UIDefault);
var UIDefault$1 = UIDefault;

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIDefault$1
});

class GameAnim {
    static get instance() {
        if (!this._inst) {
            this._inst = new GameAnim();
            TimeUtil.onEnterFrame.add(() => { TweenUtil.TWEEN.update(); });
        }
        return this._inst;
    }
    /**
     * 透明度动效
     * @param time 持续时间
     * @param ui 动效UI
     * @param [loopCount=Infinity] 循序次数
     * @param [start=1] 开始透明度
     * @param [end=0] 结束透明度
     * @param [yoyo=true] 是否开启yoyo
     * @param over 结束回调
     * @returns tween动效
     */
    opacityEff(time, ui, loopCount = Infinity, start = 1, end = 0, yoyo = true, over) {
        let tween = new Tween({ opacity: start })
            .to({ opacity: end }, time)
            .onUpdate((obj) => {
            ui.renderOpacity = obj.opacity;
        })
            .repeat(loopCount)
            .yoyo(yoyo)
            .onComplete(() => {
            over && over();
        })
            .start();
        return tween;
    }
    /**
   * 缩放动效
   * @param time 持续时间
   * @param ui 动效UI
   * @param loopCount 循环次数
   * @returns tween动效
   */
    scaleEff(time, ui, loopCount, startScale = 1, toScale = 0, yoyo = true, over) {
        let tempVec = Vector2.zero;
        let tween = new Tween({ scale: startScale })
            .to({ scale: toScale }, time)
            .onUpdate((obj) => {
            tempVec.set(obj.scale, obj.scale);
            ui.renderScale = tempVec;
        })
            .onComplete(() => {
            over && over();
        })
            .repeat(loopCount)
            .yoyo(yoyo)
            .start();
        return tween;
    }
    /**
     *  UI移动动效
     * @param ui UI
     * @param startPos 开始位置
     * @param endPos 结束位置
     * @param time 动效时间
     * @returns tween动效
     */
    moveUI(ui, startPos, endPos, time, over) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
            ui.position = obj;
        })
            .onComplete(() => {
            over && over();
        })
            .start();
        return tween;
    }
    /**
     * 播放闪光动效
     * @param ui UI
     */
    playTween(ui) {
        let start = 0;
        let tween = new Tween({ angle: start })
            .to({ angle: start + 90 }, 1500)
            .onUpdate((obj) => {
            ui.renderTransformAngle = obj.angle;
        })
            .onRepeat(() => {
            start = ui.renderTransformAngle;
        })
            .repeat(Infinity)
            .start();
        return tween;
    }
    /**
     * 弹簧臂本地坐标移动动效
     * @param ui UI
     * @param startPos 开始位置
     * @param endPos 结束位置
     * @param time 动效时间
     * @returns tween动效
     */
    springArmLocalMoveGo(go, startPos, endPos, time, over) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
            go.localTransform.position = obj;
        })
            .onComplete(() => {
            over && over();
        })
            .start();
        return tween;
    }
    /**
    * 物体本地坐标移动动效
    * @param ui UI
    * @param startPos 开始位置
    * @param endPos 结束位置
    * @param time 动效时间
    * @returns tween动效
    */
    localMoveGo(go, startPos, endPos, time, over) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
            go.localTransform.position = obj;
        })
            .onComplete(() => {
            over && over();
        })
            .start();
        return tween;
    }
    /**
    * 世界坐标移动动效
    * @param ui UI
    * @param startPos 开始位置
    * @param endPos 结束位置
    * @param time 动效时间
    * @returns tween动效
    */
    worldMoveGo(go, startPos, endPos, time, over) {
        let tween = new Tween(startPos.clone())
            .to(endPos.clone(), time)
            .onUpdate((obj) => {
            go.worldTransform.position = obj;
        })
            .onComplete(() => {
            over && over();
        })
            .start();
        return tween;
    }
}

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GameAnim: GameAnim
});

let GameStart = class GameStart extends Script {
    constructor() {
        super(...arguments);
        this.playerCount = 0;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            console.log("欢迎来到大厅");
        }
        if (SystemUtil.isClient()) {
            let player = Player.localPlayer;
            this.Init(player);
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
    Init(player) {
        console.log("欢迎来到大厅" + player.userId);
        player.character.displayName = player.nickname;
        player.character.maxWalkSpeed = 500;
    }
};
__decorate([
    RemoteFunction(Server)
], GameStart.prototype, "Init", null);
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

/**
 * @Author       : lei.zhao
 * @Date         : 2023-02-16 09:42:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-16 13:48:15
 * @FilePath     : \stumbleguys\Prefabs\GravityArea\Script\GravityArea.ts
 * @Description  : 修改描述
 */
const TEMP$1 = new mw.Vector();
let GravityArea$2 = class GravityArea extends mw.Script {
    constructor() {
        super(...arguments);
        // 用触发器确认进入进入的角色，建议使用数组
        this.characters = [];
        /**周期系数，用于模拟上下浮动的效果 */
        this.cycle = 0;
        /**周期乘法系数，用于模拟上下浮动的效果 */
        this.cycleMulit = 300;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // if(mw.SystemUtil.isServer())return;
        let trigger = this.gameObject;
        trigger.onEnter.add((go) => {
            if (go instanceof mw.Character && !this.characters.includes(go)) {
                go.gravityScale = 0;
                go.addImpulse(mw.Vector.multiply(trigger.localTransform.getUpVector(), 1500, TEMP$1));
                this.characters.push(go);
            }
        });
        trigger.onLeave.add((go) => {
            if (go && this.characters.includes(go)) {
                go.gravityScale = 1;
                this.characters.splice(this.characters.indexOf(go), 1);
            }
        });
        this.rootPoint = new mw.Vector();
        this.size = mw.Vector.multiply(trigger.localTransform.scale, 100, this.rootPoint).length;
        //后方向量
        mw.Vector.multiply(trigger.localTransform.getUpVector(), -40, this.rootPoint);
        //中心点位置
        mw.Vector.add(trigger.worldTransform.position, mw.Vector.multiply(this.rootPoint, trigger.localTransform.scale, this.rootPoint), this.rootPoint);
        // 开启帧更新
        this.useUpdate = true;
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
        this.characters.forEach((character) => {
            // character["syncSetMovementMode"](0);
            let location = character.worldTransform.position;
            //运动方向
            mw.Vector.subtract(location, this.rootPoint, TEMP$1);
            //力度
            const force = (this.size - TEMP$1.length) * 2 - this.cycle;
            this.cycle += dt * this.cycleMulit;
            if (this.cycle > 200) {
                this.cycle = 200;
                this.cycleMulit = -this.cycleMulit;
            }
            else if (this.cycle < -200) {
                this.cycle = -200;
                this.cycleMulit = -this.cycleMulit;
            }
            mw.Vector.multiply(this.gameObject.localTransform.getUpVector(), dt * force, TEMP$1);
            // 添加距离需要用帧时间校准
            mw.Vector.add(location, TEMP$1, location);
            character.worldTransform.position = location;
        });
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
GravityArea$2 = __decorate([
    Component
], GravityArea$2);
var GravityArea$3 = GravityArea$2;

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GravityArea$3
});

let SpeedBoostFloorTS$2 = class SpeedBoostFloorTS extends mw.Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中填入角色默认的地面最大效果
        // @mw.Property({ displayName: "角色初始速度", group: "必填" })
        this.OriginalSpeed = 450;
        //设置脚本在属性面板中可以填入加速效果
        // @mw.Property({ displayName: "加速效果", group: "必填" })
        this.SpeedValue = 1.3;
        //设置脚本在属性面板中可以填入生效持续时间
        // @mw.Property({ displayName: "持续时间", grsoup: "必填" })
        this.Duration = 1500;
        this.Speedflag = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        //角色进入触发器后获得加速效果
        trigger.onEnter.add((chara) => {
            this.Speedflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Speedflag == true) {
                    this.Speedflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if (this.Speedflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }
};
SpeedBoostFloorTS$2 = __decorate([
    Component
], SpeedBoostFloorTS$2);
var SpeedBoostFloorTS$3 = SpeedBoostFloorTS$2;

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpeedBoostFloorTS$3
});

// @Component
// export default class NewScript extends Script {
//     // 当脚本启动时，执行此函数
//     protected onStart(): void {
//         // 获取当前脚本所在的GameObject，并将其转换为Trigger类型
//         let trigger = this.gameObject as Trigger;
//         // 当有物体进入触发器时，执行此函数
//         trigger.onEnter.add((other: GameObject) => {
//             // 如果进入的物体是Character类型
//             if (other instanceof Character) {
//                 // 获取本地玩家
//                 let myPlayer = other.player;
//                 // 获取本地玩家的角色
//                 let myCharacter = myPlayer.character;
//                 // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点
//                 EffectService.playOnGameObject("128518", myCharacter, {slotType: HumanoidSlotType.Root,loopCount:0});
//                 EffectService.playOnGameObject("128513", myCharacter, {slotType: HumanoidSlotType.Buttocks,loopCount:0});
//             }
//         });
//     }
// }
let b_tx$4 = class b_tx extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("128518");
            AssetUtil.asyncDownloadAsset("128513");
            AssetUtil.asyncDownloadAsset("95728");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("95728");
        setTimeout(() => {
            SoundService.stopSound("95728");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("128518", chara, { slotType: HumanoidSlotType.Root, duration: 3000, loopCount: 0 });
        EffectService.playOnGameObject("128513", chara, { slotType: HumanoidSlotType.Buttocks, duration: 3000, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("128518", chara);
            EffectService.stopEffectFromHost("128513", chara);
        }, 1500);
    }
};
__decorate([
    RemoteFunction(Client)
], b_tx$4.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], b_tx$4.prototype, "EnterFun", null);
b_tx$4 = __decorate([
    Component
], b_tx$4);
var b_tx$5 = b_tx$4;

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: b_tx$5
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/PassUI.ui
*/
let PassUI_Generate = class PassUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
PassUI_Generate = __decorate([
    UIBind('UI/PassUI.ui')
], PassUI_Generate);
var PassUI_Generate$1 = PassUI_Generate;

var foreign134 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PassUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.15-21.25.34
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class PassUI extends PassUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign99 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PassUI
});

let levelEnd$8 = class levelEnd extends Script {
    constructor() {
        super(...arguments);
        this.WinMap = new Map();
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isClient()) ;
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level1Init", () => {
                console.log("Level1Init");
                this.WinMap.clear();
            });
            trigger.onEnter.add((chara) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.WinMap.has(player.userId)) {
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.PlaySound(chara.player);
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                this.RestoreModel(player);
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("99723", 1, 1);
    }
    RestoreModel(player) {
        let chara = player.character;
        let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
        if (ring) {
            chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
            chara.meshPositionOffset = new Vector(0, 0, 0);
        }
    }
    ShowPassUI(player) {
        let ui = mw.createUI("PassUI", PassUI);
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy();
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }
};
__decorate([
    RemoteFunction(Client)
], levelEnd$8.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
], levelEnd$8.prototype, "RestoreModel", null);
__decorate([
    RemoteFunction(Client)
], levelEnd$8.prototype, "ShowPassUI", null);
levelEnd$8 = __decorate([
    Component
], levelEnd$8);
var levelEnd$9 = levelEnd$8;

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: levelEnd$9
});

let SlowingFloorTS$4 = class SlowingFloorTS extends mw.Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中填入角色默认的地面最大效果
        // @mw.Property({ displayName: "角色初始速度", group: "必填" })
        this.OriginalSpeed = 450;
        //设置脚本在属性面板中可以填入减速效果
        // @mw.Property({ displayName: "减速效果", group: "必填" })
        this.SpeedValue = 0.5;
        //设置脚本在属性面板中可以填入生效持续时间
        // @mw.Property({ displayName: "持续时间", group: "必填" })
        this.Duration = 10;
        this.Slowingflag = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        //角色进入触发器后获得减速效果
        trigger.onEnter.add((chara) => {
            this.Slowingflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Slowingflag == true) {
                    this.Slowingflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if (this.Slowingflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }
};
SlowingFloorTS$4 = __decorate([
    Component
], SlowingFloorTS$4);
var SlowingFloorTS$5 = SlowingFloorTS$4;

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SlowingFloorTS$5
});

// @Component
// export default class NewScript extends Script {
//     // 当脚本启动时，执行此函数
//     protected onStart(): void {
//         // 获取当前脚本所在的GameObject，并将其转换为Trigger类型
//         let trigger = this.gameObject as Trigger;
//         // 当有物体进入触发器时，执行此函数
//         trigger.onEnter.add((other: GameObject) => {
//             // 如果进入的物体是Character类型
//             if (other instanceof Character) {
//                 // 获取本地玩家
//                 let myPlayer = other.player;
//                 // 获取本地玩家的角色
//                 let myCharacter = myPlayer.character;
//                 // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点
//                 EffectService.playOnGameObject("150907", myCharacter, {slotType: HumanoidSlotType.Root},);            
//             }
//         });
//         // 当有物体离开触发器时，执行此函数
//         trigger.onLeave.add((other: GameObject) => {
//             // 如果离开的物体是Character类型
//             if (other instanceof Character) {
//                 // 获取进入触发器玩家
//                 let myPlayer = other.player;
//                 // 获取本地玩家的角色
//                 let myCharacter = myPlayer.character;
//                 // 停止本地玩家角色上所有资源ID为"142750"的特效
//                 EffectService.stopEffectFromHost("150907", myCharacter);
//             }
//         });
//     }
// }
let s_tx2$a = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("150907");
            AssetUtil.asyncDownloadAsset("135883");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("135883");
        setTimeout(() => {
            SoundService.stopSound("135883");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("150907", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("150907", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2$a.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], s_tx2$a.prototype, "EnterFun", null);
s_tx2$a = __decorate([
    Component
], s_tx2$a);
var s_tx2$b = s_tx2$a;

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$b
});

// @Component
// export default class NewScript extends Script {
//     // 当脚本启动时，执行此函数
//     protected onStart(): void {
//         // 获取当前脚本所在的GameObject，并将其转换为Trigger类型
//         let trigger = this.gameObject as Trigger;
//         // 当有物体进入触发器时，执行此函数
//         trigger.onEnter.add((other: GameObject) => {
//             // 如果进入的物体是Character类型
//             if (other instanceof Character) {
//                 // 获取本地玩家
//                 let myPlayer = other.player;
//                 // 获取本地玩家的角色
//                 let myCharacter = myPlayer.character;
//                 // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点
//                 EffectService.playOnGameObject("88795", myCharacter, {slotType: HumanoidSlotType.Root,loopCount:0});            
//             }
//         });
//         // 当有物体离开触发器时，执行此函数
//         trigger.onLeave.add((other: GameObject) => {
//             // 如果离开的物体是Character类型
//             if (other instanceof Character) {
//                 // 获取进入触发器玩家
//                 let myPlayer = other.player;
//                 // 获取本地玩家的角色
//                 let myCharacter = myPlayer.character;
//                 // 停止本地玩家角色上所有资源ID为"142750"的特效
//                 EffectService.stopEffectFromHost("88795", myCharacter);
//             }
//         });
//     }
// }
let s_tx2$8 = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("88795");
            AssetUtil.asyncDownloadAsset("208536");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("208536");
        setTimeout(() => {
            SoundService.stopSound("208536");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("88795", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("88795", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2$8.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], s_tx2$8.prototype, "EnterFun", null);
s_tx2$8 = __decorate([
    Component
], s_tx2$8);
var s_tx2$9 = s_tx2$8;

var foreign29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$9
});

let coinTX$2 = class coinTX extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("136198");
            // 获取脚本所在的GameObject，并将其转换为Model类型
            let obj = this.gameObject;
            // 获取Model的第一个子物体，并将其转换为Trigger类型
            let trigger = obj.getChildren()[0];
            // 为Trigger的onEnter事件添加一个新的代理函数
            trigger.onEnter.add((chara) => {
                // 如果chara存在且为玩家角色
                if (chara && chara.player) {
                    // 播放资源ID为"136198"的声音，循环播放1次，音量为1
                    // SoundService.playSound("136198", 1, 1);
                    this.PlaySound(chara.player);
                    // 拾取后禁用触发器
                    trigger.enabled = false;
                    setTimeout(() => {
                        // 启用触发器
                        trigger.enabled = true;
                    }, 5 * 1000);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("136198", 1, 1);
    }
};
__decorate([
    RemoteFunction(Client)
], coinTX$2.prototype, "PlaySound", null);
coinTX$2 = __decorate([
    Component
], coinTX$2);
var coinTX$3 = coinTX$2;

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: coinTX$3
});

let CoinTX = class CoinTX extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            const model = this.gameObject;
            // 添加进入模型事件
            model.onTouch.add((other) => {
                if (other instanceof Character) {
                    if (model.getVisibility() == false) {
                        return;
                    }
                    model.setVisibility(false);
                    let settlementManager = SettlementManager.getInstance();
                    settlementManager.AddPlayerCount(other.player.userId, 1);
                    Event.dispatchToClient(other.player, "UpdateCoin", settlementManager.GetPlayerCount(other.player.userId));
                    setTimeout(() => {
                        model.setVisibility(true);
                    }, 5 * 1000);
                }
            });
            // 添加离开模型事件
            model.onTouchEnd.add((other) => {
                if (other instanceof Character) ;
            });
        }
        if (SystemUtil.isClient()) ;
    }
};
CoinTX = __decorate([
    Component
], CoinTX);
var CoinTX$1 = CoinTX;

var foreign31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CoinTX$1
});

let HoleMove = class HoleMove extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        Event.addLocalListener("Level2Init", (num) => {
            let integratedMover = this.gameObject;
            integratedMover.enable = true;
            //integratedMover.linearRepeat = true;
            //integratedMover.linearRepeatTime = num;
            //let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, 40 * 999);
        });
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
HoleMove = __decorate([
    Component
], HoleMove);
var HoleMove$1 = HoleMove;

var foreign32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: HoleMove$1
});

let levelEnd$6 = class levelEnd extends Script {
    constructor() {
        super(...arguments);
        this.WinMap = new Map();
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isClient()) ;
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            const trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) {
                    let losepos = GameObject.findGameObjectByName("Level2小黑屋").worldTransform.position;
                    other.worldTransform.position = losepos;
                }
            });
        }
        if (SystemUtil.isServer()) {
            // 获取脚本对应的触发器
            let trigger = this.gameObject;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level2Init", () => {
                console.log("Level2Init");
                this.WinMap.clear();
            });
            trigger.onEnter.add((chara) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.WinMap.has(player.userId)) {
                                this.PlaySound(chara.player);
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerCount(player.userId, 5);
                                console.log("玩家" + player.userId + "获得5枚金币");
                                Event.dispatchToClient(player, "UpdateCoin", settlementManager.GetPlayerCount(player.userId));
                                this.ShowPassUI(player);
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("99723", 1, 1);
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
    ShowPassUI(player) {
        let ui = mw.createUI("PassUI", PassUI);
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy();
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }
};
__decorate([
    RemoteFunction(Client)
], levelEnd$6.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client)
], levelEnd$6.prototype, "ShowPassUI", null);
levelEnd$6 = __decorate([
    Component
], levelEnd$6);
var levelEnd$7 = levelEnd$6;

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: levelEnd$7
});

let coinTX = class coinTX extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("162452");
            // 获取脚本所在的GameObject，并将其转换为Model类型
            let obj = this.gameObject;
            // 获取Model的第一个子物体，并将其转换为Trigger类型
            let trigger = obj.getChildren()[0];
            // 为Trigger的onEnter事件添加一个新的代理函数
            trigger.onEnter.add((chara) => {
                // 如果chara存在且为玩家角色
                if (chara && chara.player) {
                    // 播放资源ID为"162451"的声音，循环播放1次，音量为1
                    // SoundService.playSound("162452", 1, 1);
                    this.PlaySound(chara.player);
                }
                // setTimeout(() => {
                //     // 击中后禁用触发器
                //     trigger.enabled = false;;
                // }, 10);
                // setTimeout(() => {
                //     // 2秒后启用触发器
                //     trigger.enabled = true;;
                // }, 1000);
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("162452", 1, 1);
    }
};
__decorate([
    RemoteFunction(Client)
], coinTX.prototype, "PlaySound", null);
coinTX = __decorate([
    Component
], coinTX);
var coinTX$1 = coinTX;

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: coinTX$1
});

let playerLose = class playerLose extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            const trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) {
                    let losepos = GameObject.findGameObjectByName("Level2小黑屋").worldTransform.position;
                    other.worldTransform.position = losepos;
                }
            });
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
playerLose = __decorate([
    Component
], playerLose);
var playerLose$1 = playerLose;

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: playerLose$1
});

/**

- player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
- character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。

*/
let RPCtest$2 = class RPCtest extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isClient()) {
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行
                    this.MulticastFun(other);
                }
            });
        }
    }
    MulticastFun(chara) {
        //在玩家角色的位置播放特效
        EffectService.playOnGameObject("297400", chara, { slotType: HumanoidSlotType.Rings });
        // 1秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("297400", chara);
        }, 1000);
        chara.ragdollEnabled = true;
        //倒计时 1 秒
        setTimeout(() => {
            //角色关闭布娃娃系统
            chara.ragdollEnabled = false;
        }, 1000);
    }
};
__decorate([
    RemoteFunction(Client, Multicast)
], RPCtest$2.prototype, "MulticastFun", null);
RPCtest$2 = __decorate([
    Component
], RPCtest$2);
var RPCtest$3 = RPCtest$2;

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RPCtest$3
});

let BeHurt = class BeHurt extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            AssetUtil.asyncDownloadAsset("120841");
            const trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) ;
            });
        }
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("120841");
            const trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) {
                    //播放被撞击效果
                    this.MulticastFun(other);
                    //增加撞击次数
                    this.AddLose(other.player);
                    //播放音效
                    this.PlaySound(other.player);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("120841");
        setTimeout(() => {
            SoundService.stopSound("120841");
        }, 1000);
    }
    StopSound(player) {
        SoundService.stopSound("120841");
    }
    MulticastFun(chara) {
        //异步下载资源
        AssetUtil.asyncDownloadAsset("142935");
        //console.log("这是,所有客户端执行");
        //在玩家角色头顶播放特效
        EffectService.playOnGameObject("142935", chara, { slotType: HumanoidSlotType.Rings });
        // 1 秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("142935", chara);
        }, 1000);
        chara.ragdollEnabled = true;
        //倒计时 1 秒
        setTimeout(() => {
            //角色关闭布娃娃系统
            chara.ragdollEnabled = false;
        }, 1000);
    }
    AddLose(player) {
        //记录玩家死亡次数+1
        let settlementManager = SettlementManager.getInstance();
        settlementManager.AddPlayerLose(player.userId, 1);
        Event.dispatchToClient(player, "UpdateHurt", settlementManager.GetPlayerLose(player.userId));
    }
    BeHurtAudio(player) {
        //记录玩家死亡次数+1
        let settlementManager = SettlementManager.getInstance();
        settlementManager.AddPlayerLose(player.userId, 1);
        Event.dispatchToClient(player, "UpdateHurt", settlementManager.GetPlayerLose(player.userId));
    }
};
__decorate([
    RemoteFunction(Client)
], BeHurt.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client)
], BeHurt.prototype, "StopSound", null);
__decorate([
    RemoteFunction(Client, Multicast)
], BeHurt.prototype, "MulticastFun", null);
__decorate([
    RemoteFunction(Server)
], BeHurt.prototype, "AddLose", null);
__decorate([
    RemoteFunction(Client)
], BeHurt.prototype, "BeHurtAudio", null);
BeHurt = __decorate([
    Component
], BeHurt);
var BeHurt$1 = BeHurt;
/**
 * player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
 * character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。
 */

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BeHurt$1
});

let TestShoot$u = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot1", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$u.prototype, "ShootFun", null);
TestShoot$u = __decorate([
    Component
], TestShoot$u);
var TestShoot$v = TestShoot$u;

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$v
});

let TestShoot$s = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot10", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$s.prototype, "ShootFun", null);
TestShoot$s = __decorate([
    Component
], TestShoot$s);
var TestShoot$t = TestShoot$s;

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$t
});

let TestShoot$q = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot11", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$q.prototype, "ShootFun", null);
TestShoot$q = __decorate([
    Component
], TestShoot$q);
var TestShoot$r = TestShoot$q;

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$r
});

let TestShoot$o = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot12", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$o.prototype, "ShootFun", null);
TestShoot$o = __decorate([
    Component
], TestShoot$o);
var TestShoot$p = TestShoot$o;

var foreign41 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$p
});

let TestShoot$m = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot13", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$m.prototype, "ShootFun", null);
TestShoot$m = __decorate([
    Component
], TestShoot$m);
var TestShoot$n = TestShoot$m;

var foreign42 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$n
});

let TestShoot$k = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot14", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$k.prototype, "ShootFun", null);
TestShoot$k = __decorate([
    Component
], TestShoot$k);
var TestShoot$l = TestShoot$k;

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$l
});

let TestShoot$i = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot15", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$i.prototype, "ShootFun", null);
TestShoot$i = __decorate([
    Component
], TestShoot$i);
var TestShoot$j = TestShoot$i;

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$j
});

let TestShoot$g = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot16", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$g.prototype, "ShootFun", null);
TestShoot$g = __decorate([
    Component
], TestShoot$g);
var TestShoot$h = TestShoot$g;

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$h
});

let TestShoot$e = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot2", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$e.prototype, "ShootFun", null);
TestShoot$e = __decorate([
    Component
], TestShoot$e);
var TestShoot$f = TestShoot$e;

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$f
});

let TestShoot$c = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot3", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$c.prototype, "ShootFun", null);
TestShoot$c = __decorate([
    Component
], TestShoot$c);
var TestShoot$d = TestShoot$c;

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$d
});

let TestShoot$a = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot4", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$a.prototype, "ShootFun", null);
TestShoot$a = __decorate([
    Component
], TestShoot$a);
var TestShoot$b = TestShoot$a;

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$b
});

let TestShoot$8 = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot5", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$8.prototype, "ShootFun", null);
TestShoot$8 = __decorate([
    Component
], TestShoot$8);
var TestShoot$9 = TestShoot$8;

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$9
});

let TestShoot$6 = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot6", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$6.prototype, "ShootFun", null);
TestShoot$6 = __decorate([
    Component
], TestShoot$6);
var TestShoot$7 = TestShoot$6;

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$7
});

let TestShoot$4 = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot7", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$4.prototype, "ShootFun", null);
TestShoot$4 = __decorate([
    Component
], TestShoot$4);
var TestShoot$5 = TestShoot$4;

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$5
});

let TestShoot$2 = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot8", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot$2.prototype, "ShootFun", null);
TestShoot$2 = __decorate([
    Component
], TestShoot$2);
var TestShoot$3 = TestShoot$2;

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$3
});

let TestShoot = class TestShoot extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        if (SystemUtil.isServer()) {
            //异步下载资源
            AssetUtil.asyncDownloadAsset("31645");
            Event.addLocalListener("L3_Shoot9", () => {
                this.ShootFun();
            });
        }
        // if(SystemUtil.isClient()){
        //     // 监听键盘按键事件，当按下1键时，执行以下代码
        //     InputUtil.onKeyDown(Keys.One, () => {     
        //         this.ShootFun();
        //     });
        // }
    }
    ShootFun() {
        let integratedMover = this.gameObject;
        EffectService.playAtPosition("31645", this.gameObject.worldTransform.position, { scale: new Vector(3, 3, 3), duration: 0.75 });
        setTimeout(() => {
            integratedMover.enable = true;
            let moveTime = integratedMover.linearRepeatTime;
            setTimeout(() => {
                integratedMover.enable = false;
                integratedMover.moverReset();
            }, moveTime * 900);
        }, 750);
    }
};
__decorate([
    RemoteFunction(Server)
], TestShoot.prototype, "ShootFun", null);
TestShoot = __decorate([
    Component
], TestShoot);
var TestShoot$1 = TestShoot;

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TestShoot$1
});

let audioFall = class audioFall extends Script {
    // 当脚本启动时，执行此函数
    onStart() {
        // if(SystemUtil.isServer()){
        //     console.log("audioFall进入服务端");
        //     let Model = this.gameObject as Model;
        //     Model.setCollision(CollisionStatus.On);
        //     Model.onTouch.add((chara) => {
        //         console.log("audioFall进入触发器");
        //         if(chara instanceof Character){
        //             console.log("audioFall进入触发器执行");
        //             Model.setVisibility(false);
        //             Model.setCollision(CollisionStatus.Off);
        //         }
        //     });
        // }
        if (SystemUtil.isServer) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("120846");
            // 获取脚本所在的GameObject，并将其转换为Model类型
            let obj = this.gameObject;
            // 获取Model的第一个子物体，并将其转换为Trigger类
            let trigger = obj.getChildren()[0];
            // 为Trigger的onEnter事件添加一个新的代理函数
            trigger.onEnter.add((chara) => {
                // 如果chara存在且为玩家角色
                if (chara && chara.player) {
                    // 播放资源ID为"120846"的声音，循环播放1次，音量为1
                    // SoundService.playSound("120846", 1, 1);
                    this.PlaySound(chara.player);
                }
                setTimeout(() => {
                    // 地板消失后禁用触发器
                    trigger.enabled = false;
                }, 1500);
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("120846", 1, 1);
    }
};
__decorate([
    RemoteFunction(Client)
], audioFall.prototype, "PlaySound", null);
audioFall = __decorate([
    Component
], audioFall);
var audioFall$1 = audioFall;

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: audioFall$1
});

/**

- player: 通常指代玩家对象，代表游戏中的玩家实体，可以控制角色进行各种操作。
- character: 则是指角色对象，代表游戏中的角色实体，可以是玩家角色、敌对角色、NPC角色等不同类型的角色。
- const：用于声明一个常量，一旦赋值后就不能再被修改。常量在声明时必须进行初始化赋值，且不能再次赋值。适合用于那些不需要改变数值的情况。
- let：用于声明一个变量，可以被重新赋值。变量在声明时可以不进行初始化赋值，之后可以重新赋值。适合用于那些需要变化数值的情况
*/
let floorFall = class floorFall extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        //this.gameObject.destroy();
        if (SystemUtil.isServer()) {
            this.gameObject.parent.localTransform.scale = this.gameObject.parent.localTransform.scale.multiply(new Vector(0.9, 0.9, 0.9));
            this.gameObject.localTransform.scale = this.gameObject.localTransform.scale.multiply(new Vector(0.9, 0.9, 0.9));
            Event.addLocalListener("Level4Init", () => {
                console.log("L4重置方块");
                let trigger = this.gameObject;
                trigger.enabled = true;
                this.Init();
                this.gameObject.parent.setVisibility(PropertyStatus.On);
                this.gameObject.parent.setCollision(CollisionStatus.On);
            });
            // this.gameObject.localTransform.position = new Vector(0,0,57)
            let trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                // console.log("被触发")
                if (other instanceof Character) {
                    this.CameraOn(other.player);
                    // 1.5秒后隐藏显示方块
                    console.log("进入触发器");
                    setTimeout(() => {
                        this.gameObject.parent.setVisibility(PropertyStatus.Off);
                        this.gameObject.parent.setCollision(CollisionStatus.Off);
                    }, 1500);
                    setTimeout(() => { this.Shake(); }, 0);
                    setTimeout(() => { this.Shake(); }, 500);
                    setTimeout(() => { this.Shake(); }, 1000);
                }
            });
            trigger.onLeave.add((other) => {
                if (other instanceof Character) {
                    this.CameraOff(other.player);
                }
            });
        }
        if (SystemUtil.isClient()) {
            AssetUtil.asyncDownloadAsset("27702");
            let trigger = this.gameObject;
            let liewen = trigger.parent;
            trigger.onEnter.add((other) => {
                if (other instanceof Character) {
                    console.log(TimeUtil.elapsedTime());
                    this.MulticastFun(other, liewen);
                }
            });
        }
    }
    //开启摄像机高度固定
    CameraOn(player) {
        Camera.currentCamera.fixedElevation = true;
    }
    //关闭摄像机高度固定
    CameraOff(player) {
        Camera.currentCamera.fixedElevation = false;
    }
    Init() {
        let trigger = this.gameObject;
        trigger.enabled = true;
    }
    MulticastFun(_other, liewen) {
        // 在静态物体上触发特效
        EffectService.playOnGameObject("27702", liewen);
        // 1.5秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("27702", liewen);
        }, 1500);
    }
    //400ms
    Shake() {
        let StartPos = this.gameObject.parent.localTransform.position;
        let x = StartPos.x;
        let y = StartPos.y;
        let z = StartPos.z;
        let Flu = 10;
        GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z), new Vector(x, y, z + Flu), 50, () => {
            GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z + Flu), new Vector(x, y, z - Flu), 100, () => {
                GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z - Flu), new Vector(x, y, z), 50, () => {
                    GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z), new Vector(x, y, z + Flu), 50, () => {
                        GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z + Flu), new Vector(x, y, z - Flu), 100, () => {
                            GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z - Flu), new Vector(x, y, z), 50, () => {
                            });
                        });
                    });
                });
            });
        });
    }
};
__decorate([
    RemoteFunction(Client)
], floorFall.prototype, "CameraOn", null);
__decorate([
    RemoteFunction(Client)
], floorFall.prototype, "CameraOff", null);
__decorate([
    RemoteFunction(Client, Multicast)
], floorFall.prototype, "Init", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的GameObject参数来处理角色相关的逻辑
], floorFall.prototype, "MulticastFun", null);
floorFall = __decorate([
    Component
], floorFall);
var floorFall$1 = floorFall;

var foreign55 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: floorFall$1
});

let PingTai = class PingTai extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            Event.addLocalListener("Level4Init", () => {
                this.gameObject.setVisibility(false);
                this.gameObject.setCollision(CollisionStatus.Off);
                setTimeout(() => {
                    this.gameObject.setVisibility(true);
                    this.gameObject.setCollision(CollisionStatus.On);
                }, 30 * 1000);
            });
        }
    }
    /**

     * 周期函数 每帧执行

     * 此函数执行需要将this.useUpdate赋值为true

     * @param dt 当前帧与上一帧的延迟 / 秒

     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
PingTai = __decorate([
    Component
], PingTai);
var PingTai$1 = PingTai;

var foreign56 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PingTai$1
});

let playerDead$2 = class playerDead extends Script {
    constructor() {
        super(...arguments);
        this.PassMap = new Map();
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            //异步下载结算音效资源
            AssetUtil.asyncDownloadAsset("136204");
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) ;
            });
        }
        if (SystemUtil.isServer()) {
            Event.addLocalListener("Level4Init", () => {
                console.log("Level4Init");
                this.PassMap.clear();
            });
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.PassMap.has(player.userId)) {
                                // 当前玩家首次死亡，记录玩家ID,结算时注意倒序排名，排名最后的分数越高,排名0说明未死亡
                                //结算音效
                                this.PlaySound(chara.player);
                                this.PassMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                if (settlementManager.GetPlayerRankMap().size == this.PassMap.size) {
                                    Event.dispatchToLocal("Level4End");
                                }
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        Event.dispatchToLocal("LookWarStart");
        SoundService.playSound("136204", 1, 1);
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
__decorate([
    RemoteFunction(Client)
], playerDead$2.prototype, "PlaySound", null);
playerDead$2 = __decorate([
    Component
], playerDead$2);
var playerDead$3 = playerDead$2;

var foreign57 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: playerDead$3
});

/**
 * @Author       : lei.zhao
 * @Date         : 2023-02-16 09:42:19
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-02-16 13:48:15
 * @FilePath     : \stumbleguys\Prefabs\GravityArea\Script\GravityArea.ts
 * @Description  : 修改描述
 */
const TEMP = new mw.Vector();
let GravityArea = class GravityArea extends mw.Script {
    constructor() {
        super(...arguments);
        // 用触发器确认进入进入的角色，建议使用数组
        this.characters = [];
        /**周期系数，用于模拟上下浮动的效果 */
        this.cycle = 0;
        /**周期乘法系数，用于模拟上下浮动的效果 */
        this.cycleMulit = 300;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // if(mw.SystemUtil.isServer())return;
        let trigger = this.gameObject;
        trigger.onEnter.add((go) => {
            if (go instanceof mw.Character && !this.characters.includes(go)) {
                go.gravityScale = 0;
                go.addImpulse(mw.Vector.multiply(trigger.localTransform.getUpVector(), 1500, TEMP));
                this.characters.push(go);
            }
        });
        trigger.onLeave.add((go) => {
            if (go && this.characters.includes(go)) {
                go.gravityScale = 1;
                this.characters.splice(this.characters.indexOf(go), 1);
            }
        });
        this.rootPoint = new mw.Vector();
        this.size = mw.Vector.multiply(trigger.localTransform.scale, 100, this.rootPoint).length;
        //后方向量
        mw.Vector.multiply(trigger.localTransform.getUpVector(), -40, this.rootPoint);
        //中心点位置
        mw.Vector.add(trigger.worldTransform.position, mw.Vector.multiply(this.rootPoint, trigger.localTransform.scale, this.rootPoint), this.rootPoint);
        // 开启帧更新
        this.useUpdate = true;
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
        this.characters.forEach((character) => {
            // character["syncSetMovementMode"](0);
            let location = character.worldTransform.position;
            //运动方向
            mw.Vector.subtract(location, this.rootPoint, TEMP);
            //力度
            const force = (this.size - TEMP.length) * 2 - this.cycle;
            this.cycle += dt * this.cycleMulit;
            if (this.cycle > 200) {
                this.cycle = 200;
                this.cycleMulit = -this.cycleMulit;
            }
            else if (this.cycle < -200) {
                this.cycle = -200;
                this.cycleMulit = -this.cycleMulit;
            }
            mw.Vector.multiply(this.gameObject.localTransform.getUpVector(), dt * force, TEMP);
            // 添加距离需要用帧时间校准
            mw.Vector.add(location, TEMP, location);
            character.worldTransform.position = location;
        });
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
GravityArea = __decorate([
    Component
], GravityArea);
var GravityArea$1 = GravityArea;

var foreign58 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GravityArea$1
});

let L5_cubeTransfor = class L5_cubeTransfor extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        let Obj = this.gameObject.parent;
        if (SystemUtil.isServer()) {
            // console.log("======================")
            // console.log(Obj.name)
            // console.log(Obj.gameObjectId)
            // console.log("======================")
            let Obj1 = Obj.parent.getChildByName("玻璃道路");
            let Obj2List = Obj1.getChildren();
            Obj2List.forEach(Obj3 => {
                let cubeList = Obj3.getChildren();
                cubeList.forEach(cube => {
                    //console.log(cube.name)
                    cube.localTransform.scale = cube.localTransform.scale.multiply(new Vector(0.9, 0.9, 0.9));
                });
            });
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
L5_cubeTransfor = __decorate([
    Component
], L5_cubeTransfor);
var L5_cubeTransfor$1 = L5_cubeTransfor;

var foreign59 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L5_cubeTransfor$1
});

let playerDead = class playerDead extends Script {
    constructor() {
        super(...arguments);
        this.PassMap = new Map();
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            let trigger = this.gameObject;
            trigger.onEnter.add((chara) => {
                if (chara instanceof Character) {
                    setTimeout(() => {
                        let levelpos = GameObject.findGameObjectByName("Level5Start").worldTransform.position;
                        chara.worldTransform.position = levelpos;
                    }, 100);
                }
            });
        }
        if (SystemUtil.isServer()) {
            //异步下载音效资源
            AssetUtil.asyncDownloadAsset("120841");
            AssetUtil.asyncDownloadAsset("153615");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.MulticastFun(other);
                    this.PlaySound(other.player);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("120841", 1, 1);
    }
    MulticastFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        //在玩家角色的位置播放特效
        EffectService.playOnGameObject("153615", chara, { slotType: HumanoidSlotType.Root });
        // 3秒后停止播放特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("153615", chara);
        }, 2000);
        // chara.ragdollEnabled = true;
        // //倒计时 3 秒
        // setTimeout(() => {
        // //角色关闭布娃娃系统
        // chara.ragdollEnabled = false;
        // }, 3000);
    }
};
__decorate([
    RemoteFunction(Client)
], playerDead.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], playerDead.prototype, "MulticastFun", null);
playerDead = __decorate([
    Component
], playerDead);
var playerDead$1 = playerDead;

var foreign60 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: playerDead$1
});

let RPCtest = class RPCtest extends Script {
    onStart() {
        if (SystemUtil.isServer()) {
            Event.addLocalListener("Level5Init", () => {
                // console.log("L5重置方块");
                //let trigger = this.gameObject as Trigger;
                this.gameObject.parent.setVisibility(PropertyStatus.On);
                this.gameObject.parent.setCollision(CollisionStatus.On);
            });
            this.gameObject.localTransform.position = new Vector(0, 0, 57);
            let trigger = this.gameObject;
            trigger.onEnter.add((other) => {
                // console.log("被触发")
                if (other instanceof Character) {
                    // 隐藏方块
                    // console.log("进入触发器")
                    setTimeout(() => {
                        this.gameObject.parent.setVisibility(PropertyStatus.Off);
                        this.gameObject.parent.setCollision(CollisionStatus.Off);
                    }, 10);
                    // setTimeout(() => {
                    //     this.gameObject.parent.setVisibility(PropertyStatus.On);
                    //     (this.gameObject.parent as Model).setCollision(CollisionStatus.On);
                    // }, 6*1000);
                }
            });
        }
    }
};
RPCtest = __decorate([
    Component
], RPCtest);
var RPCtest$1 = RPCtest;

var foreign61 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RPCtest$1
});

let levelEnd$4 = class levelEnd extends Script {
    constructor() {
        super(...arguments);
        this.WinMap = new Map();
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isClient()) ;
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level5Init", () => {
                console.log("Level5Init");
                this.WinMap.clear();
            });
            trigger.onEnter.add((chara) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.WinMap.has(player.userId)) {
                                this.PlaySound(chara.player);
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                if (settlementManager.GetPlayerRankMap().size == this.WinMap.size) {
                                    Event.dispatchToLocal("Level5End");
                                }
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        Event.dispatchToLocal("LookWarStart");
        SoundService.playSound("99723", 1, 1);
    }
    ShowPassUI(player) {
        let ui = mw.createUI("PassUI", PassUI);
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy();
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }
};
__decorate([
    RemoteFunction(Client)
], levelEnd$4.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client)
], levelEnd$4.prototype, "ShowPassUI", null);
levelEnd$4 = __decorate([
    Component
], levelEnd$4);
var levelEnd$5 = levelEnd$4;

var foreign62 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: levelEnd$5
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.02-15.49.16
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class NewUIScript extends UIScript {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign63 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NewUIScript
});

let Test = class Test extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            let randTime = 2;
            TimeUtil.setInterval(() => {
                const SelfPos = this.gameObject.parent.worldTransform.position;
                // 进行范围检测
                const goArray = QueryUtil.sphereOverlap(SelfPos, 500, false);
                // 遍历检测到的对象并输出对象名
                for (let go of goArray) {
                    console.log(go.name);
                    // if(go.tag == "point"){
                    //     //在检测到的物体上进行播放特效
                    //     EffectService.playAtPosition("27702",go.worldTransform.position);
                    // }
                    if (go instanceof Character) {
                        //console.log(go.displayName);
                        if (this.gameObject.parent.getVisibility() == true) {
                            //在检测到的物体上进行播放特效
                            EffectService.playAtPosition("27702", this.gameObject.parent.worldTransform.position);
                            let StartPos = this.gameObject.parent.localTransform.position;
                            let x = StartPos.x;
                            let y = StartPos.y;
                            let z = StartPos.z;
                            GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z), new Vector(x, y, z + 5), 50, () => {
                                GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z + 5), new Vector(x, y, z - 5), 100, () => {
                                    GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z - 5), new Vector(x, y, z), 50, () => {
                                        GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z), new Vector(x, y, z + 5), 50, () => {
                                            GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z + 5), new Vector(x, y, z - 5), 100, () => {
                                                GameAnim.instance.localMoveGo(this.gameObject.parent, new Vector(x, y, z - 5), new Vector(x, y, z), 50, () => {
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    }
                }
                randTime = MathUtil.randomFloat(0.5, 1.5);
            }, randTime);
        }
    }
    Tx(player) {
        SoundService.playSound("99723");
    }
};
__decorate([
    RemoteFunction(Client)
], Test.prototype, "Tx", null);
Test = __decorate([
    Component
], Test);
var Test$1 = Test;

var foreign64 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Test$1
});

let left_right = class left_right extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.gameObject.setCollision(CollisionStatus.Off);
        let Cube = this.gameObject.parent;
        Event.addLocalListener("Level6Init", () => {
            Cube.setVisibility(true);
            Cube.setCollision(CollisionStatus.On);
            let chilren = Cube.getChildren();
            chilren.forEach(element => {
                if (element.name == "运动器") {
                    let moveEle = element;
                    moveEle.enable = false;
                    moveEle.moverReset();
                    setTimeout(() => {
                        moveEle.enable = true;
                    }, 10 * 1000);
                }
            });
        });
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
left_right = __decorate([
    Component
], left_right);
var left_right$1 = left_right;

var foreign66 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: left_right$1
});

let up_down = class up_down extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        this.gameObject.setCollision(CollisionStatus.Off);
        let Cube = this.gameObject.parent;
        Event.addLocalListener("Level6Init", () => {
            Cube.setVisibility(true);
            Cube.setCollision(CollisionStatus.On);
        });
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
up_down = __decorate([
    Component
], up_down);
var up_down$1 = up_down;

var foreign67 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: up_down$1
});

let SpeedBoostFloorTS = class SpeedBoostFloorTS extends mw.Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中填入角色默认的地面最大效果
        // @mw.Property({ displayName: "角色初始速度", group: "必填" })
        this.OriginalSpeed = 450;
        //设置脚本在属性面板中可以填入加速效果
        // @mw.Property({ displayName: "加速效果", group: "必填" })
        this.SpeedValue = 1.2;
        //设置脚本在属性面板中可以填入生效持续时间
        // @mw.Property({ displayName: "持续时间", grsoup: "必填" })
        this.Duration = 1000;
        this.Speedflag = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        //角色进入触发器后获得加速效果
        trigger.onEnter.add((chara) => {
            this.Speedflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Speedflag == true) {
                    this.Speedflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if (this.Speedflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }
};
SpeedBoostFloorTS = __decorate([
    Component
], SpeedBoostFloorTS);
var SpeedBoostFloorTS$1 = SpeedBoostFloorTS;

var foreign68 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SpeedBoostFloorTS$1
});

let b_tx$2 = class b_tx extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("128518");
            AssetUtil.asyncDownloadAsset("128513");
            AssetUtil.asyncDownloadAsset("95728");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("95728");
        setTimeout(() => {
            SoundService.stopSound("95728");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("128518", chara, { slotType: HumanoidSlotType.Root, duration: 3000, loopCount: 0 });
        EffectService.playOnGameObject("128513", chara, { slotType: HumanoidSlotType.Buttocks, duration: 3000, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        setTimeout(() => {
            EffectService.stopEffectFromHost("128518", chara);
            EffectService.stopEffectFromHost("128513", chara);
        }, 1 * 1000);
    }
};
__decorate([
    RemoteFunction(Client)
], b_tx$2.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], b_tx$2.prototype, "EnterFun", null);
b_tx$2 = __decorate([
    Component
], b_tx$2);
var b_tx$3 = b_tx$2;

var foreign69 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: b_tx$3
});

let levelEnd$2 = class levelEnd extends Script {
    constructor() {
        super(...arguments);
        this.WinMap = new Map();
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isClient()) ;
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level7Init", () => {
                console.log("Level7Init");
                this.WinMap.clear();
            });
            trigger.onEnter.add((chara) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.WinMap.has(player.userId)) {
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.PlaySound(chara.player);
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                this.RestoreModel(player);
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("99723", 1, 1);
    }
    RestoreModel(player) {
        let chara = player.character;
        let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
        if (ring) {
            chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
            chara.meshPositionOffset = new Vector(0, 0, 0);
        }
    }
    ShowPassUI(player) {
        let ui = mw.createUI("PassUI", PassUI);
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy();
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }
};
__decorate([
    RemoteFunction(Client)
], levelEnd$2.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
], levelEnd$2.prototype, "RestoreModel", null);
__decorate([
    RemoteFunction(Client)
], levelEnd$2.prototype, "ShowPassUI", null);
levelEnd$2 = __decorate([
    Component
], levelEnd$2);
var levelEnd$3 = levelEnd$2;

var foreign70 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: levelEnd$3
});

let SlowingFloorTS$2 = class SlowingFloorTS extends mw.Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中填入角色默认的地面最大效果
        // @mw.Property({ displayName: "角色初始速度", group: "必填" })
        this.OriginalSpeed = 450;
        //设置脚本在属性面板中可以填入减速效果
        // @mw.Property({ displayName: "减速效果", group: "必填" })
        this.SpeedValue = 0.5;
        //设置脚本在属性面板中可以填入生效持续时间
        // @mw.Property({ displayName: "持续时间", group: "必填" })
        this.Duration = 10;
        this.Slowingflag = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        //角色进入触发器后获得减速效果
        trigger.onEnter.add((chara) => {
            this.Slowingflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Slowingflag == true) {
                    this.Slowingflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if (this.Slowingflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }
};
SlowingFloorTS$2 = __decorate([
    Component
], SlowingFloorTS$2);
var SlowingFloorTS$3 = SlowingFloorTS$2;

var foreign71 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SlowingFloorTS$3
});

let SlowingFloorTS = class SlowingFloorTS extends mw.Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中填入角色默认的地面最大效果
        // @mw.Property({ displayName: "角色初始速度", group: "必填" })
        this.OriginalSpeed = 450;
        //设置脚本在属性面板中可以填入减速效果
        // @mw.Property({ displayName: "减速效果", group: "必填" })
        this.SpeedValue = 0.5;
        //设置脚本在属性面板中可以填入生效持续时间
        // @mw.Property({ displayName: "持续时间", group: "必填" })
        this.Duration = 10;
        this.Slowingflag = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        //角色进入触发器后获得减速效果
        trigger.onEnter.add((chara) => {
            this.Slowingflag = true;
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                if (this.Slowingflag == true) {
                    this.Slowingflag = false;
                    chara.maxWalkSpeed = this.OriginalSpeed * this.SpeedValue;
                }
            }
        });
        //角色离开触发器后指定时间效果消失
        trigger.onLeave.add((chara) => {
            if (chara instanceof mw.Character && chara.player == mw.Player.localPlayer) {
                setTimeout(() => {
                    if (this.Slowingflag == false) {
                        chara.maxWalkSpeed = this.OriginalSpeed;
                    }
                }, this.Duration);
            }
        });
    }
};
SlowingFloorTS = __decorate([
    Component
], SlowingFloorTS);
var SlowingFloorTS$1 = SlowingFloorTS;

var foreign72 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SlowingFloorTS$1
});

let s_tx2$6 = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("88792");
            AssetUtil.asyncDownloadAsset("204427");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("204427");
        console.log("播放声音");
        setTimeout(() => {
            SoundService.stopSound("204427");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("执行减速");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("88792", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("88792", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2$6.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
], s_tx2$6.prototype, "EnterFun", null);
s_tx2$6 = __decorate([
    Component
], s_tx2$6);
var s_tx2$7 = s_tx2$6;

var foreign73 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$7
});

let s_tx2$4 = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("88792");
            AssetUtil.asyncDownloadAsset("134419");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("134419");
        setTimeout(() => {
            SoundService.stopSound("134419");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("88792", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("88792", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2$4.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], s_tx2$4.prototype, "EnterFun", null);
s_tx2$4 = __decorate([
    Component
], s_tx2$4);
var s_tx2$5 = s_tx2$4;

var foreign74 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$5
});

// @Component
// export default class b_tx extends Script {
//     /** 当脚本被实例后，会在第一帧更新前调用此函数 */
//     protected onStart(): void {
//         if(SystemUtil.isClient()){
//             // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
//             const trigger = this.gameObject as Trigger;
//             // 检测进入触发器范围的玩家
//             trigger.onEnter.add((other) => {
//                 //判断是否是角色
//                 if(other instanceof Character){
//                     this.EnterFun(other);
//                     console.log("进入");
//                 }  
//             });           
//             // 当有物体离开触发器时，执行此函数
//             trigger.onLeave.add((other: GameObject) => {
//                 // 如果离开的物体是Character类型
//                 if (other instanceof Character) {
//                     this.LeaveFun(other);
//                     console.log("离开");
//                 }
//             });
//         }
//     }
//     @RemoteFunction(Client)
//     //根据传入的Character参数来处理角色相关的逻辑
//     public EnterFun(chara:Character): void {
//         //声明角色
//         let player = Player.localPlayer.character
//         //启用地面摩擦力
//         player.groundFrictionEnabled = true;
//         //设备角色的地面摩擦力=10
//         player.groundFriction = 1;
//     }
//     public LeaveFun(chara:Character): void {
//         //声明角色
//         let player = Player.localPlayer.character
//         //启用地面摩擦力
//         player.groundFrictionEnabled = false;
//         //设备角色的地面摩擦力=10
//         player.groundFriction = 10;
//     }
// }
let b_tx = class b_tx extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    this.ice_speed(other.player);
                }
            });
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.fall_speed(other.player);
                }
            });
        }
    }
    ice_speed(player) {
        this.useUpdate = true;
        let myPlayer = Player.localPlayer;
        // 获取当前玩家控制的角色
        let myCharacter = myPlayer.character;
        // 最大加速度为原来的0.1倍
        // myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
        // 最大转向速度为原来的0.5倍
        // myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
        // 最大行走速度为原来的2倍
        // myCharacter.maxWalkSpeed = 0.5 * myCharacter.maxWalkSpeed;
        // 行走制动速率为原来的0.1倍
        myCharacter.brakingDecelerationWalking = 0.2 * myCharacter.brakingDecelerationWalking;
        // 地面摩擦系数为1
        myCharacter.groundFriction = 0.5;
        console.log("进入");
    }
    fall_speed(player) {
        this.useUpdate = true;
        let myPlayer = Player.localPlayer;
        // 获取当前玩家控制的角色
        let myCharacter = myPlayer.character;
        // 最大加速度为原来的0.1倍
        // myCharacter.maxAcceleration = 0.1 * myCharacter.maxAcceleration;
        // 最大转向速度为原来的0.5倍
        // myCharacter.rotateRate = 0.5 * myCharacter.rotateRate;
        // 最大行走速度为原来的2倍
        // myCharacter.maxWalkSpeed = 0.5 * myCharacter.maxWalkSpeed;
        // 行走制动速率为原来的0.1倍
        myCharacter.brakingDecelerationWalking = myCharacter.brakingDecelerationWalking;
        // 地面摩擦系数为1
        myCharacter.groundFriction = 8;
        console.log("出去");
    }
    onUpdate() {
        if (SystemUtil.isClient()) {
            let myPlayer = Player.localPlayer;
            // 获取当前玩家控制的角色
            let myCharacter = myPlayer.character;
            if (myCharacter.isMoving) {
                console.log("移动中");
            }
        }
    }
};
__decorate([
    RemoteFunction(Client)
], b_tx.prototype, "ice_speed", null);
__decorate([
    RemoteFunction(Client)
], b_tx.prototype, "fall_speed", null);
b_tx = __decorate([
    Component
], b_tx);
var b_tx$1 = b_tx;

var foreign75 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: b_tx$1
});

let levelEnd = class levelEnd extends Script {
    constructor() {
        super(...arguments);
        this.WinMap = new Map();
    }
    // 当脚本启动时执行的函数
    async onStart() {
        if (SystemUtil.isClient()) ;
        if (SystemUtil.isServer()) {
            AssetUtil.asyncDownloadAsset("99723");
            // 获取脚本对应的触发器
            let trigger = this.gameObject;
            // 添加进入触发器的事件监听器
            Event.addLocalListener("Level8Init", () => {
                console.log("Level8Init");
                this.WinMap.clear();
            });
            trigger.onEnter.add((chara) => {
                // console.log(typeof chara)   
                //用于判断是否是character类型 如果是则执行逻辑
                if (chara instanceof Character) {
                    setTimeout(() => {
                        console.log("进入终点触发器");
                        console.log("chara:" + chara.constructor.name);
                        if (chara.constructor.name == "PlayerCharacter") {
                            console.log("Enter PlayerCharacter");
                            const player = chara.player;
                            if (!this.WinMap.has(player.userId)) {
                                // 当前玩家首次通关，记录玩家ID并显示通关UI
                                this.PlaySound(chara.player);
                                this.WinMap.set(player.userId, 1);
                                let settlementManager = SettlementManager.getInstance();
                                settlementManager.AddPlayerPass(player.userId);
                                this.ShowPassUI(player);
                                this.RestoreModel(player);
                            }
                        }
                    }, 100);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("99723", 1, 1);
    }
    RestoreModel(player) {
        let chara = player.character;
        let ring = chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration[0].attachmentGameObject;
        if (ring) {
            chara.description.advance.slotAndDecoration.slot[HumanoidSlotType.Nameplate].decoration.delete(ring, true);
            chara.meshPositionOffset = new Vector(0, 0, 0);
        }
    }
    ShowPassUI(player) {
        let ui = mw.createUI("PassUI", PassUI);
        ui.uiWidgetBase.addToViewport(10);
        const timerId = TimeUtil.setInterval(() => {
            ui.destroy();
            TimeUtil.clearInterval(timerId); // 清除定时器，确保只执行一次
        }, 2);
    }
};
__decorate([
    RemoteFunction(Client)
], levelEnd.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
], levelEnd.prototype, "RestoreModel", null);
__decorate([
    RemoteFunction(Client)
], levelEnd.prototype, "ShowPassUI", null);
levelEnd = __decorate([
    Component
], levelEnd);
var levelEnd$1 = levelEnd;

var foreign76 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: levelEnd$1
});

let s_tx2$2 = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("142957");
            AssetUtil.asyncDownloadAsset("162451");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("162451");
        setTimeout(() => {
            SoundService.stopSound("162451");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("142957", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("142957", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2$2.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], s_tx2$2.prototype, "EnterFun", null);
s_tx2$2 = __decorate([
    Component
], s_tx2$2);
var s_tx2$3 = s_tx2$2;

var foreign77 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$3
});

// @Component
// export default class GameStart extends Script {
//     // 当脚本启动时执行的函数
//     protected async onStart(): Promise<void> {
//         // 检查是否在客户端运行
//         if (SystemUtil.isClient()) {
//             // 异步下载资源
//             AssetUtil.asyncDownloadAsset("162452").then((success: boolean) => {
//                 // 如果下载成功，则打印成功消息
//                 if (success) {
//                     console.log("音乐资源加载成功");
//                 } else {
//                     // 如果下载失败，则打印失败消息
//                     console.log("音乐资源加载失败");
//                 }
//             });
//         }
//         // 获取脚本对应的GameObject并转换为Trigger类型
//         let trigger = this.gameObject as Trigger;
//         // 添加进入触发器的事件监听器
//         trigger.onEnter.add((other: GameObject) => {
//             // 检查进入的GameObject是否是本地玩家的角色
//             if (other == Player.localPlayer.character) {
//                 // 如果条件满足，则播放声音
//                 SoundService.playSound("162452");
//             }
//         });
//     }
// }
let s_tx2 = class s_tx2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 先判断是客户端还是服务端->转换类型->检测角色->执行远程函数
        // 客户端
        if (SystemUtil.isServer()) {
            // 异步下载资源
            AssetUtil.asyncDownloadAsset("145503");
            AssetUtil.asyncDownloadAsset("162452");
            // 将this.gameObject转换为Trigger类型，可以获得触发器对象并进行相应的操作
            const trigger = this.gameObject;
            // 检测进入触发器范围的玩家
            trigger.onEnter.add((other) => {
                //判断是否是角色
                if (other instanceof Character) {
                    //是角色,则执行广播
                    this.EnterFun(other);
                    this.PlaySound(other.player);
                }
            });
            // 当有物体离开触发器时，执行此函数
            trigger.onLeave.add((other) => {
                // 如果离开的物体是Character类型
                if (other instanceof Character) {
                    this.LeaveFun(other);
                }
            });
        }
    }
    PlaySound(player) {
        SoundService.playSound("162452");
        setTimeout(() => {
            SoundService.stopSound("162452");
        }, 1.5 * 1000);
    }
    EnterFun(chara) {
        //打印执行消息
        console.log("这是广播,所有客户端执行");
        // 在本地玩家的角色上播放特效，特效ID为"142750"，播放位置为根节点,循环次数为0
        EffectService.playOnGameObject("145503", chara, { slotType: HumanoidSlotType.Root, loopCount: 0 });
    }
    LeaveFun(chara) {
        //打印执行消息
        // console.log("这是广播,所有客户端执行");
        // 停止本地玩家角色上所有资源ID为"142750"的特效
        EffectService.stopEffectFromHost("145503", chara);
    }
};
__decorate([
    RemoteFunction(Client)
], s_tx2.prototype, "PlaySound", null);
__decorate([
    RemoteFunction(Client, Multicast)
    //根据传入的Character参数来处理角色相关的逻辑
], s_tx2.prototype, "EnterFun", null);
s_tx2 = __decorate([
    Component
], s_tx2);
var s_tx2$1 = s_tx2;

var foreign78 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: s_tx2$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/SettlementUI.ui
*/
let SettlementUI_Generate = class SettlementUI_Generate extends UIScript {
    get playerName() {
        if (!this.playerName_Internal && this.uiWidgetBase) {
            this.playerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName');
        }
        return this.playerName_Internal;
    }
    get winCount() {
        if (!this.winCount_Internal && this.uiWidgetBase) {
            this.winCount_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winCount');
        }
        return this.winCount_Internal;
    }
    get closeButton() {
        if (!this.closeButton_Internal && this.uiWidgetBase) {
            this.closeButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/closeButton');
        }
        return this.closeButton_Internal;
    }
    get winUmb() {
        if (!this.winUmb_Internal && this.uiWidgetBase) {
            this.winUmb_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winUmb');
        }
        return this.winUmb_Internal;
    }
    get winCoin() {
        if (!this.winCoin_Internal && this.uiWidgetBase) {
            this.winCoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/winCoin');
        }
        return this.winCoin_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
SettlementUI_Generate = __decorate([
    UIBind('UI/SettlementUI.ui')
], SettlementUI_Generate);
var SettlementUI_Generate$1 = SettlementUI_Generate;

var foreign136 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettlementUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.15-21.47.38
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class SettlementUI extends SettlementUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.closeButton.onClicked.add(() => {
            this.destroy();
        });
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign101 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SettlementUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/RankUI.ui
*/
let RankUI_Generate = class RankUI_Generate extends UIScript {
    get rankName() {
        if (!this.rankName_Internal && this.uiWidgetBase) {
            this.rankName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName');
        }
        return this.rankName_Internal;
    }
    get playerName1() {
        if (!this.playerName1_Internal && this.uiWidgetBase) {
            this.playerName1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName1');
        }
        return this.playerName1_Internal;
    }
    get playerName2() {
        if (!this.playerName2_Internal && this.uiWidgetBase) {
            this.playerName2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName2');
        }
        return this.playerName2_Internal;
    }
    get playerName3() {
        if (!this.playerName3_Internal && this.uiWidgetBase) {
            this.playerName3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/playerName3');
        }
        return this.playerName3_Internal;
    }
    get rankName1() {
        if (!this.rankName1_Internal && this.uiWidgetBase) {
            this.rankName1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName1');
        }
        return this.rankName1_Internal;
    }
    get rankName2() {
        if (!this.rankName2_Internal && this.uiWidgetBase) {
            this.rankName2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName2');
        }
        return this.rankName2_Internal;
    }
    get rankName3() {
        if (!this.rankName3_Internal && this.uiWidgetBase) {
            this.rankName3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/rankName3');
        }
        return this.rankName3_Internal;
    }
    get selfRankId() {
        if (!this.selfRankId_Internal && this.uiWidgetBase) {
            this.selfRankId_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/selfRankId');
        }
        return this.selfRankId_Internal;
    }
    get selfRankName() {
        if (!this.selfRankName_Internal && this.uiWidgetBase) {
            this.selfRankName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/selfRankName');
        }
        return this.selfRankName_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
RankUI_Generate = __decorate([
    UIBind('UI/RankUI.ui')
], RankUI_Generate);
var RankUI_Generate$1 = RankUI_Generate;

var foreign135 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.05.28-09.14.53
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class RankUI extends RankUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign100 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankUI
});

let LevelEnd = class LevelEnd extends Script {
    onStart() {
        Event.addLocalListener("LevelEnd", () => {
            console.log("Init LevelEnd OnStart");
            this.LevelEndFun();
        });
    }
    //处理倒计时or玩法结束逻辑  仅处理单个玩家
    LevelEndFun() {
        let globalManager = GlobalManager.getInstance();
        let levelId = globalManager.getLevelId();
        let gameType = globalManager.getGameType();
        this.LevelSettlementFun(levelId);
        setTimeout(() => {
            this.NextTeleport(gameType);
        }, 10 * 1000);
    }
    //处理子玩法结算
    LevelSettlementFun(levelId) {
        let settlementManager = SettlementManager.getInstance();
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        //子玩法1
        if (levelId == 1) {
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if (CurRank == 1) {
                        globalManager.AddPlayerScore(playerId, 3);
                    }
                    else if (CurRank == 2) {
                        globalManager.AddPlayerScore(playerId, 2);
                    }
                    else if (CurRank >= 3) {
                        globalManager.AddPlayerScore(playerId, 1);
                    }
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, settlementManager.GetPlayerRankMap(), levelId);
                    }
                }
            });
        }
        //子玩法2
        if (levelId == 2) {
            let CountMap = settlementManager.GetPlayerCountMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(CountMap.entries()).sort((a, b) => b[1] - a[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if (Rank == 1) {
                    globalManager.AddPlayerScore(key, 3);
                }
                if (Rank == 2) {
                    globalManager.AddPlayerScore(key, 2);
                }
                if (Rank >= 3) {
                    globalManager.AddPlayerScore(key, 1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, sortedMap, levelId);
                    }
                }
            });
        }
        //子玩法3
        if (levelId == 3) {
            let loseMap = settlementManager.GetPlayerLoseMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(loseMap.entries()).sort((a, b) => a[1] - b[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap = new Map(sortedPlayers);
            //打印
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if (Rank == 1) {
                    globalManager.AddPlayerScore(key, 3);
                }
                if (Rank == 2) {
                    globalManager.AddPlayerScore(key, 2);
                }
                if (Rank >= 3) {
                    globalManager.AddPlayerScore(key, 1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, sortedMap, levelId);
                    }
                }
            });
        }
        //子玩法4
        if (levelId == 4) {
            //注意倒序排名，排名最后的分数越高,排名0说明未死亡
            let RankMap = settlementManager.GetPlayerRankMap();
            const sortedPlayers = Array.from(RankMap.entries()).sort((a, b) => {
                if (a[1] == 0) {
                    return -1;
                }
                if (b[1] == 0) {
                    return 1;
                }
                if (a[1] > b[1]) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if (Rank == 1) {
                    globalManager.AddPlayerScore(key, 3);
                }
                if (Rank == 2) {
                    globalManager.AddPlayerScore(key, 2);
                }
                if (Rank >= 3) {
                    globalManager.AddPlayerScore(key, 1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, sortedMap, levelId);
                    }
                }
            });
        }
        //子玩法5
        if (levelId == 5) {
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if (CurRank == 1) {
                        globalManager.AddPlayerScore(playerId, 3);
                    }
                    else if (CurRank == 2) {
                        globalManager.AddPlayerScore(playerId, 2);
                    }
                    else if (CurRank >= 3) {
                        globalManager.AddPlayerScore(playerId, 1);
                    }
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, settlementManager.GetPlayerRankMap(), levelId);
                    }
                }
            });
        }
        //子玩法6
        if (levelId == 6) {
            let CountMap = settlementManager.GetPlayerCountMap();
            // 将Map转换为数组
            const sortedPlayers = Array.from(CountMap.entries()).sort((a, b) => b[1] - a[1]);
            console.log(sortedPlayers);
            // 将排序后的数组转换为Map
            let sortedMap = new Map(sortedPlayers);
            let Rank = 1;
            for (const [key, value] of sortedMap) {
                console.log(`${key}: ${value}`);
                if (Rank == 1) {
                    globalManager.AddPlayerScore(key, 3);
                }
                if (Rank == 2) {
                    globalManager.AddPlayerScore(key, 2);
                }
                if (Rank >= 3) {
                    globalManager.AddPlayerScore(key, 1);
                }
                Rank++;
            }
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, sortedMap, levelId);
                    }
                }
            });
        }
        //子玩法7
        if (levelId == 7) {
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if (CurRank == 1) {
                        globalManager.AddPlayerScore(playerId, 3);
                    }
                    else if (CurRank == 2) {
                        globalManager.AddPlayerScore(playerId, 2);
                    }
                    else if (CurRank >= 3) {
                        globalManager.AddPlayerScore(playerId, 1);
                    }
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, settlementManager.GetPlayerRankMap(), levelId);
                    }
                }
            });
        }
        //子玩法8
        if (levelId == 8) {
            playerIdList.forEach(playerId => {
                if (!globalManager.IsPlayerInDaTing(playerId)) {
                    let CurRank = settlementManager.GetPlayerRank(playerId);
                    if (CurRank == 1) {
                        globalManager.AddPlayerScore(playerId, 3);
                    }
                    else if (CurRank == 2) {
                        globalManager.AddPlayerScore(playerId, 2);
                    }
                    else if (CurRank >= 3) {
                        globalManager.AddPlayerScore(playerId, 1);
                    }
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        this.ShowRankUI(player, settlementManager.GetPlayerRankMap(), levelId);
                    }
                }
            });
        }
        SettlementManager.destroyInstance();
    }
    //处理传送
    NextTeleport(gameType) {
        let globalManager = GlobalManager.getInstance();
        let playerIdList = globalManager.GetPlayerIdList();
        console.log("NextTeleport gametype" + gameType);
        //打印玩家id列表
        console.log("playeridlist:" + playerIdList);
        Event.dispatchToAllClient("LookWarEnd");
        if (gameType == 0) {
            let datingpos = GameObject.findGameObjectByName("PlayerStart").worldTransform.position;
            playerIdList.forEach(playerId => {
                let player = Player.getPlayer(playerId);
                if (player) {
                    player.character.maxWalkSpeed = 1500;
                    player.character.worldTransform.position = datingpos;
                    console.log("playerid:" + playerId);
                    console.log("score:" + globalManager.GetPlayerScore(playerId));
                    this.SaveData(player, globalManager.GetPlayerScore(playerId), gameType);
                }
            });
            globalManager.Init();
        }
        if (gameType == 1) {
            let levelCount = globalManager.getLevelCount();
            levelCount = levelCount + 1;
            globalManager.setLevelCount(levelCount);
            if (levelCount == 1) {
                let datingpos = GameObject.findGameObjectByName("PlayerStart").worldTransform.position;
                playerIdList.forEach(playerId => {
                    let player = Player.getPlayer(playerId);
                    if (player) {
                        player.character.maxWalkSpeed = 500;
                        player.character.worldTransform.position = datingpos;
                        console.log("playerid:" + playerId);
                        console.log("score:" + globalManager.GetPlayerScore(playerId));
                        this.SaveData(player, globalManager.GetPlayerScore(playerId), gameType);
                    }
                });
                globalManager.Init();
            }
            else {
                //设置关卡
                globalManager.setLevelId(globalManager.getLevelList()[globalManager.getLevelCount()]);
                let CGSLevelStr = "CGS_Level" + globalManager.getLevelId();
                console.log("闯关赛事件 ", CGSLevelStr);
                Event.dispatchToLocal(CGSLevelStr);
            }
        }
    }
    //保存玩家数据
    SaveData(player, score, gameType) {
        console.log("In SaveData" + player.userId);
        let playerData = DataCenterS.getData(player, PlayerData);
        playerData.AddTotalScore(score);
        playerData.AddTotalSession(1);
        playerData.AddWonderCion(score * 100);
        let Umb = 0;
        if (gameType == 1) {
            if (score >= 12) {
                Umb = 5;
            }
            else if (score >= 8) {
                Umb = 4;
            }
            else if (score >= 5) {
                Umb = 3;
            }
            else if (score >= 3) {
                Umb = 2;
            }
            else if (score >= 1) {
                Umb = 1;
            }
            else {
                Umb = 0;
            }
        }
        playerData.AddWonderUmb(Umb);
        playerData.save(true);
        this.ShowSettlementUI(player, score, score * 100, Umb);
    }
    //显示结算信息
    ShowSettlementUI(player, WinCount, Coin, Umb) {
        let ui = mw.createUI("SettlementUI", SettlementUI);
        ui.uiWidgetBase.addToViewport(2);
        ui.playerName.text = player.character.displayName;
        ui.winCount.text = WinCount.toString();
        ui.winCoin.text = Coin.toString();
        ui.winUmb.text = Umb.toString();
        ui.closeButton.onClicked.add(() => {
            //模糊功能启用
            PostProcess.blurEnabled = false;
            ui.destroy();
        });
    }
    //显示局内结算排名信息
    ShowRankUI(player, rankMap, levelId) {
        let ui = mw.createUI("RankUI", RankUI);
        ui.uiWidgetBase.addToViewport(5);
        setTimeout(() => {
            ui.destroy();
            PostProcess.blurEnabled = false;
        }, 8 * 1000);
        ui.playerName1.text = "";
        ui.playerName2.text = "";
        ui.playerName3.text = "";
        ui.rankName1.text = "";
        ui.rankName2.text = "";
        ui.rankName3.text = "";
        ui.selfRankId.text = "";
        ui.selfRankName.text = "";
        //模糊功能启用
        PostProcess.blurEnabled = true;
        if (levelId == 1) {
            ui.rankName.text = "通关情况";
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if (value == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if (value == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if (value == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level1本地玩家排名" + LocalRank);
            if (LocalRank == 1) {
                ui.selfRankId.text = "1";
                ui.selfRankName.text = "冠军";
            }
            else if (LocalRank == 2) {
                ui.selfRankId.text = "2";
                ui.selfRankName.text = "亚军";
            }
            else if (LocalRank == 3) {
                ui.selfRankId.text = "3";
                ui.selfRankName.text = "并列季军";
            }
            else if (LocalRank == 0) {
                ui.selfRankId.text = "未上榜";
                ui.selfRankName.text = "未通关";
            }
            else {
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关";
            }
        }
        if (levelId == 2) {
            ui.rankName.text = "金币数量";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if (Rank == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = value.toString();
                }
                if (Rank == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = value.toString();
                }
                if (Rank == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = value.toString();
                }
                if (key == player.userId) {
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = value.toString();
                }
                Rank++;
            }
        }
        if (levelId == 3) {
            ui.rankName.text = "受伤程度";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                let hurt = Math.round(value / 30 * 100 * 10) / 10;
                if (hurt > 100.0)
                    hurt = 100;
                if (Rank == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = hurt.toString() + "%";
                }
                if (Rank == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = hurt.toString() + "%";
                }
                if (Rank == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = hurt.toString() + "%";
                }
                if (key == player.userId) {
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = hurt.toString() + "%";
                }
                Rank++;
            }
        }
        if (levelId == 4) {
            ui.rankName.text = "通关情况";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if (Rank == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "第一名";
                }
                if (Rank == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "第二名";
                }
                if (Rank == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "第三名";
                }
                if (key == player.userId) {
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = "完成";
                }
                Rank++;
            }
        }
        if (levelId == 5) {
            ui.rankName.text = "通关情况";
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if (value == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if (value == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if (value == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level5本地玩家排名" + LocalRank);
            if (LocalRank == 1) {
                ui.selfRankId.text = "1";
                ui.selfRankName.text = "冠军";
            }
            else if (LocalRank == 2) {
                ui.selfRankId.text = "2";
                ui.selfRankName.text = "亚军";
            }
            else if (LocalRank == 3) {
                ui.selfRankId.text = "3";
                ui.selfRankName.text = "并列季军";
            }
            else if (LocalRank == 0) {
                ui.selfRankId.text = "未上榜";
                ui.selfRankName.text = "未通关";
            }
            else {
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关";
            }
        }
        if (levelId == 6) {
            ui.rankName.text = "命中得分";
            let Rank = 1;
            for (const [key, value] of rankMap) {
                if (Rank == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = value.toString();
                }
                if (Rank == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = value.toString();
                }
                if (Rank == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = value.toString();
                }
                if (key == player.userId) {
                    ui.selfRankId.text = Rank.toString();
                    ui.selfRankName.text = value.toString();
                }
                Rank++;
            }
        }
        if (levelId == 7) {
            ui.rankName.text = "通关情况";
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if (value == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if (value == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if (value == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level7本地玩家排名" + LocalRank);
            if (LocalRank == 1) {
                ui.selfRankId.text = "1";
                ui.selfRankName.text = "冠军";
            }
            else if (LocalRank == 2) {
                ui.selfRankId.text = "2";
                ui.selfRankName.text = "亚军";
            }
            else if (LocalRank == 3) {
                ui.selfRankId.text = "3";
                ui.selfRankName.text = "并列季军";
            }
            else if (LocalRank == 0) {
                ui.selfRankId.text = "未上榜";
                ui.selfRankName.text = "未通关";
            }
            else {
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关";
            }
        }
        if (levelId == 8) {
            ui.rankName.text = "通关情况";
            //遍历rankMap
            for (const [key, value] of rankMap) {
                if (value == 1) {
                    ui.playerName1.text = Player.getPlayer(key).character.displayName;
                    ui.rankName1.text = "冠军";
                }
                if (value == 2) {
                    ui.playerName2.text = Player.getPlayer(key).character.displayName;
                    ui.rankName2.text = "亚军";
                }
                if (value == 3) {
                    ui.playerName3.text = Player.getPlayer(key).character.displayName;
                    ui.rankName3.text = "季军";
                }
            }
            let LocalRank = rankMap.get(player.userId);
            console.log("Level8本地玩家排名" + LocalRank);
            if (LocalRank == 1) {
                ui.selfRankId.text = "1";
                ui.selfRankName.text = "冠军";
            }
            else if (LocalRank == 2) {
                ui.selfRankId.text = "2";
                ui.selfRankName.text = "亚军";
            }
            else if (LocalRank == 3) {
                ui.selfRankId.text = "3";
                ui.selfRankName.text = "并列季军";
            }
            else if (LocalRank == 0) {
                ui.selfRankId.text = "未上榜";
                ui.selfRankName.text = "未通关";
            }
            else {
                ui.selfRankId.text = LocalRank.toString();
                ui.selfRankName.text = "通关";
            }
        }
    }
};
__decorate([
    RemoteFunction(Server)
], LevelEnd.prototype, "SaveData", null);
__decorate([
    RemoteFunction(Client)
], LevelEnd.prototype, "ShowSettlementUI", null);
__decorate([
    RemoteFunction(Client)
], LevelEnd.prototype, "ShowRankUI", null);
LevelEnd = __decorate([
    Component
], LevelEnd);
var LevelEnd$1 = LevelEnd;

var foreign79 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LevelEnd$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/LookWarUI.ui
*/
let LookWarUI_Generate = class LookWarUI_Generate extends UIScript {
    get changeLookPlayer() {
        if (!this.changeLookPlayer_Internal && this.uiWidgetBase) {
            this.changeLookPlayer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/changeLookPlayer');
        }
        return this.changeLookPlayer_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
LookWarUI_Generate = __decorate([
    UIBind('UI/LookWarUI.ui')
], LookWarUI_Generate);
var LookWarUI_Generate$1 = LookWarUI_Generate;

var foreign133 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LookWarUI_Generate$1
});

/**
 * AUTHOR: Return
 * TIME: 2024.06.15-15.41.27
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
class LookWarUI extends LookWarUI_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
    }
    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onAdded() {
    }
    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    onRemoved() {
    }
    /**
    * 构造UI文件成功后，UI对象再被销毁时调用
    * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
    */
    onDestroy() {
    }
}

var foreign98 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LookWarUI
});

let LookWar = class LookWar extends Script {
    constructor() {
        super(...arguments);
        //SC
        this.LifePlayerList = null;
        //C
        this.lookUI = null;
        //C
        this.curLookPlayer = 0;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            this.LifePlayerList = Player.getAllPlayers();
            Event.addLocalListener("Level5Init", () => {
                this.ResetLifePlayerList();
            });
            Event.addLocalListener("Level4Init", () => {
                this.ResetLifePlayerList();
            });
        }
        if (SystemUtil.isClient()) {
            Event.addLocalListener("LookWarStart", () => {
                this.lookUI = mw.createUI("LookWarUI", LookWarUI);
                this.lookUI.uiWidgetBase.addToViewport(10);
                this.lookUI.changeLookPlayer.onClicked.add(() => {
                    this.curLookPlayer++;
                    if (this.curLookPlayer >= this.LifePlayerList.length) {
                        this.curLookPlayer = 0;
                    }
                    this.ChangeLook();
                });
                this.curLookPlayer = 0;
                this.ChangeLook();
                Camera.currentCamera.springArm.localTransform.position = Vector.zero;
            });
            Event.addLocalListener("LookWarEnd", () => {
                if (this.lookUI) {
                    this.lookUI.destroy();
                    this.lookUI = null;
                }
                Camera.currentCamera.parent = Player.localPlayer.character;
                Camera.currentCamera.preset = CameraPreset.Default;
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            });
            Event.addServerListener("LookWarEnd", () => {
                if (this.lookUI) {
                    this.lookUI.destroy();
                    this.lookUI = null;
                }
                Camera.currentCamera.parent = Player.localPlayer.character;
                Camera.currentCamera.preset = CameraPreset.Default;
                Camera.currentCamera.fov = 90;
                Camera.currentCamera.springArm.length = 400;
                Camera.currentCamera.springArm.localTransform.position = new Vector(0, 0, 30);
                Camera.currentCamera.localTransform.position = new Vector(0, 0, 100);
            });
        }
    }
    ResetLifePlayerList() {
        this.LifePlayerList = Player.getAllPlayers();
        this.LifePlayerList.forEach((player) => {
            if (GlobalManager.getInstance().IsPlayerInDaTing(player.userId)) {
                //在LifePlayerList中删除这个玩家
                this.LifePlayerList.splice(this.LifePlayerList.indexOf(player), 1);
            }
        });
    }
    ChangeLook() {
        let curPlayer = this.LifePlayerList[this.curLookPlayer].character;
        Camera.currentCamera.parent = curPlayer;
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
__decorate([
    Property({ replicated: true })
], LookWar.prototype, "LifePlayerList", void 0);
LookWar = __decorate([
    Component
], LookWar);
var LookWar$1 = LookWar;

var foreign80 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: LookWar$1
});

let StatScript = class StatScript extends Script {
    constructor() {
        super(...arguments);
        this.monitorMgr = null;
        this.reciveInfo = "";
        this.sendInfo = "";
        this.cacheInfo = "";
        this.statInfo = "";
        this.statUI = null;
    }
    onStart() {
        this.monitorMgr = new MonitorMgr(this);
        if (SystemUtil.isClient()) {
            this.statUI = new StatUI(this);
        }
        this.useUpdate = true;
    }
    onUpdate(dt) {
        this.monitorMgr.onUpdate(dt);
        if (SystemUtil.isServer()) {
            this.statInfo = this.getStatInfo();
        }
        else {
            this.statUI.onUpdate(dt);
        }
    }
    getStatInfo() {
        let usedMemory = "当前使用内存" + DebugUtil.usedMemory;
        let frameTime = "帧耗时：" + DebugUtil.frameTime;
        let threadTime = "线程耗时：" + DebugUtil.gameThreadTime;
        let renderTime = "帧渲染耗时：" + DebugUtil.renderThreadTime;
        let send = "一秒内发出的网络包总大小：" + DebugUtil.sentBytes;
        let sendRpc = "一秒内发出的RPC数量：" + DebugUtil.sentRPCs.length;
        let cached = "当前帧缓存的RPC数量：" + DebugUtil.cachedRPCs.length;
        let received = "一秒内收到的网络包总大小：" + DebugUtil.receivedBytes;
        let receivedRpc = "当前帧收到的RPC数量：" + DebugUtil.receivedRPCs.length;
        return usedMemory + "\n" + frameTime + "\n" + threadTime + "\n" + renderTime + "\n"
            + send + "\n" + sendRpc + "\n" + cached + "\n" + received + "\n" + receivedRpc;
    }
};
__decorate([
    Property({ replicated: true })
], StatScript.prototype, "reciveInfo", void 0);
__decorate([
    Property({ replicated: true })
], StatScript.prototype, "sendInfo", void 0);
__decorate([
    Property({ replicated: true })
], StatScript.prototype, "cacheInfo", void 0);
__decorate([
    Property({ replicated: true })
], StatScript.prototype, "statInfo", void 0);
StatScript = __decorate([
    Component
], StatScript);
var StatScript$1 = StatScript;
/**
 * RPC监控管理器
 */
class MonitorMgr {
    constructor(statScript) {
        this.reciveRPC = null;
        this.sendRPC = null;
        this.cacheRPC = null;
        this.statScript = null;
        this.statScript = statScript;
        this.reciveRPC = new RPCMonitor(RPCType.Recive);
        this.sendRPC = new RPCMonitor(RPCType.Send);
        this.cacheRPC = new RPCMonitor(RPCType.Cache);
    }
    onUpdate(dt) {
        this.reciveRPC.freshData();
        this.sendRPC.freshData();
        this.cacheRPC.freshData();
        if (SystemUtil.isServer()) {
            this.statScript.reciveInfo = this.getStr(RPCType.Recive);
            this.statScript.sendInfo = this.getStr(RPCType.Send);
            this.statScript.cacheInfo = this.getStr(RPCType.Cache);
        }
    }
    getStr(rpcType) {
        if (rpcType == RPCType.Recive) {
            return this.reciveRPC.getDataStr();
        }
        else if (rpcType == RPCType.Send) {
            return this.sendRPC.getDataStr();
        }
        else if (rpcType == RPCType.Cache) {
            return this.cacheRPC.getDataStr();
        }
    }
}
/**
 * RPC监控类型
 */
var RPCType;
(function (RPCType) {
    RPCType[RPCType["Recive"] = 0] = "Recive";
    RPCType[RPCType["Send"] = 1] = "Send";
    RPCType[RPCType["Cache"] = 2] = "Cache";
})(RPCType || (RPCType = {}));
/**
 * RPC监控
 */
class RPCMonitor {
    constructor(rpcType) {
        this.rpcMap = new Map();
        this.tsRPCMap = new Map();
        this.rpcType = rpcType;
    }
    freshData() {
        let rpcArray = [];
        switch (this.rpcType) {
            case RPCType.Recive:
                rpcArray = DebugUtil.receivedRPCs;
                break;
            case RPCType.Send:
                rpcArray = DebugUtil.sentRPCs;
                break;
            case RPCType.Cache:
                rpcArray = DebugUtil.cachedRPCs;
                break;
        }
        for (const item of rpcArray) {
            const match = item.match(/Type:\s*(TSRPC|RPC),\s*Name:\s*([^,\s]+)/);
            if (match) {
                const type = match[1];
                const name = match[2];
                if (type === 'RPC') {
                    let count = this.rpcMap.get(name);
                    count ? this.rpcMap.set(name, count + 1) : this.rpcMap.set(name, 1);
                }
                else if (type === 'TSRPC') {
                    let count = this.tsRPCMap.get(name);
                    count ? this.tsRPCMap.set(name, count + 1) : this.tsRPCMap.set(name, 1);
                }
            }
        }
    }
    getDataStr() {
        let str = "/////////////";
        switch (this.rpcType) {
            case RPCType.Recive:
                str += "<color=#00ff00ff>接收</color>到的RPC\n";
                break;
            case RPCType.Send:
                str += "<color=#ff0000ff>发送</color>的RPC\n";
                break;
            case RPCType.Cache:
                str += "<color=#ffff00ff>缓存</color>的RPC\n";
                break;
        }
        const tsRpc = Array.from(this.tsRPCMap.entries());
        tsRpc.sort((a, b) => b[1] - a[1]);
        const rpc = Array.from(this.rpcMap.entries());
        rpc.sort((a, b) => b[1] - a[1]);
        str += "<color=#00ff00ff>TSRPC</color>\n";
        for (let item of tsRpc) {
            str += item + "\n";
        }
        str += "\n";
        str += "<color=#0000ff>RPC</color>\n";
        for (let item of rpc) {
            str += item + "\n";
        }
        return str;
    }
}
var UIState;
(function (UIState) {
    /**客户端实时性能 */
    UIState[UIState["ClientStat"] = 1] = "ClientStat";
    /**客户端收到的RPC信息 */
    UIState[UIState["ClientRecive"] = 2] = "ClientRecive";
    /**客户端发送的RPC信息 */
    UIState[UIState["ClientSend"] = 3] = "ClientSend";
    /**客户端缓存的RPC信息 */
    UIState[UIState["ClientCache"] = 4] = "ClientCache";
    /**服务端实时性能 */
    UIState[UIState["ServerStat"] = 5] = "ServerStat";
    /**服务端收到的RPC信息 */
    UIState[UIState["ServerRecive"] = 6] = "ServerRecive";
    /**服务端发送的RPC信息 */
    UIState[UIState["ServerSend"] = 7] = "ServerSend";
    /**服务端缓存的RPC信息 */
    UIState[UIState["ServerCache"] = 8] = "ServerCache";
})(UIState || (UIState = {}));
/**
 * UI
 */
class StatUI {
    constructor(statScript) {
        this.rootCanvas = null;
        this.textBlock = null;
        this.scrollBox = null;
        this.btnS = null;
        this.btnC = null;
        this.canvas = null;
        this.openBtn = null;
        // 收
        this.rpcReciveBtn = null;
        // 发
        this.rpcSendBtn = null;
        // 缓存
        this.rpcCacheBtn = null;
        this.statScript = null;
        this.curState = null;
        this.statScript = statScript;
        this.init();
    }
    init() {
        // 创建一个UI对象
        let ui = UserWidget.newObject();
        // 将UI添加到屏幕上
        ui.addToViewport(1);
        ui.zOrder = 999999;
        // 创建一个画布组件
        this.rootCanvas = Canvas.newObject();
        this.rootCanvas.size = new Vector2(1920, 1080);
        this.rootCanvas.position = Vector2.zero;
        // 将Ui的根画布设置为rootCanvas
        ui.rootContent = this.rootCanvas;
        // Canvas
        this.canvas = Canvas.newObject();
        this.rootCanvas.addChild(this.canvas);
        this.canvas.size = new Vector2(800, 500);
        this.canvas.position = new Vector2(0, 250);
        // BG
        let bg = Image.newObject();
        bg.size = new Vector2(800, 500);
        this.canvas.addChild(bg);
        bg.imageGuid = "114028";
        bg.imageColor = new LinearColor(0.0625, 0.0625, 0.0625);
        // MS
        this.btnS = StaleButton.newObject();
        this.btnS.size = new Vector2(70, 250);
        this.canvas.addChild(this.btnS);
        this.btnS.position = new Vector2(730, 0);
        this.btnS.normalImageGuid = "114028";
        this.btnS.transitionEnable = true;
        this.btnS.pressedImagColor = LinearColor.black;
        this.btnS.normalImageColor = new LinearColor(0.13, 0.391, 0.337);
        this.btnS.text = "S";
        // MC
        this.btnC = StaleButton.newObject();
        this.btnC.size = new Vector2(70, 250);
        this.canvas.addChild(this.btnC);
        this.btnC.position = new Vector2(730, 250);
        this.btnC.normalImageGuid = "114028";
        this.btnC.transitionEnable = true;
        this.btnC.pressedImagColor = LinearColor.black;
        this.btnC.normalImageColor = new LinearColor(0.7835, 0.2102, 0.5077);
        this.btnC.text = "C";
        // OPEN
        this.openBtn = StaleButton.newObject();
        this.openBtn.size = new Vector2(100, 100);
        this.rootCanvas.addChild(this.openBtn);
        this.openBtn.position = new Vector2(0, 150);
        this.openBtn.normalImageGuid = "114028";
        this.openBtn.transitionEnable = true;
        this.openBtn.pressedImagColor = LinearColor.black;
        this.openBtn.normalImageColor = LinearColor.white;
        this.openBtn.text = "性能";
        // rpcReciveBtn
        this.rpcReciveBtn = StaleButton.newObject();
        this.rpcReciveBtn.size = new Vector2(80, 80);
        this.canvas.addChild(this.rpcReciveBtn);
        this.rpcReciveBtn.position = new Vector2(100, -80);
        this.rpcReciveBtn.normalImageGuid = "114028";
        this.rpcReciveBtn.transitionEnable = true;
        this.rpcReciveBtn.pressedImagColor = LinearColor.black;
        this.rpcReciveBtn.normalImageColor = LinearColor.green;
        this.rpcReciveBtn.text = "收";
        // rpcSendBtn
        this.rpcSendBtn = StaleButton.newObject();
        this.rpcSendBtn.size = new Vector2(80, 80);
        this.canvas.addChild(this.rpcSendBtn);
        this.rpcSendBtn.position = new Vector2(180, -80);
        this.rpcSendBtn.normalImageGuid = "114028";
        this.rpcSendBtn.transitionEnable = true;
        this.rpcSendBtn.pressedImagColor = LinearColor.black;
        this.rpcSendBtn.normalImageColor = LinearColor.red;
        this.rpcSendBtn.text = "发";
        // rpcCacheBtn
        this.rpcCacheBtn = StaleButton.newObject();
        this.rpcCacheBtn.size = new Vector2(80, 80);
        this.canvas.addChild(this.rpcCacheBtn);
        this.rpcCacheBtn.position = new Vector2(260, -80);
        this.rpcCacheBtn.normalImageGuid = "114028";
        this.rpcCacheBtn.transitionEnable = true;
        this.rpcCacheBtn.pressedImagColor = LinearColor.black;
        this.rpcCacheBtn.normalImageColor = LinearColor.yellow;
        this.rpcCacheBtn.text = "缓存";
        // ScrollBox
        this.scrollBox = ScrollBox.newObject();
        this.scrollBox.size = new Vector2(730, 500);
        this.canvas.addChild(this.scrollBox);
        // TextBlock
        this.textBlock = TextBlock.newObject();
        this.textBlock.isRichText = true;
        this.textBlock.size = new Vector2(730, 3000);
        this.scrollBox.addChild(this.textBlock);
        this.textBlock.fontSize = 24;
        this.textBlock.textAlign = TextJustify.Left;
        this.textBlock.textVerticalAlign = TextVerticalJustify.Top;
        // this.showPanel(false)
        this.bindBtn();
        this.switchState(UIState.ClientStat);
    }
    onUpdate(dt) {
        this.freshInfo();
    }
    freshInfo() {
        if (this.curState == null) {
            return;
        }
        switch (this.curState) {
            case UIState.ClientStat:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.getStatInfo();
                break;
            case UIState.ClientRecive:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Recive);
                break;
            case UIState.ClientSend:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Send);
                break;
            case UIState.ClientCache:
                this.textBlock.text = "<color=#FF42C3>客户端</color>\n" + this.statScript.monitorMgr.getStr(RPCType.Cache);
                break;
            case UIState.ServerStat:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.statInfo;
                break;
            case UIState.ServerRecive:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.reciveInfo;
                break;
            case UIState.ServerSend:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.sendInfo;
                break;
            case UIState.ServerCache:
                this.textBlock.text = "<color=#00ffffff>服务端</color>\n" + this.statScript.cacheInfo;
                break;
        }
    }
    switchState(state) {
        this.curState = state;
    }
    bindBtn() {
        this.openBtn.onClicked.add(() => {
            let cur = this.canvas.visible;
            cur = !cur;
            this.openBtn.text = cur ? "关闭" : "性能";
            this.showPanel(cur);
        });
        this.btnS.onClicked.add(() => {
            this.switchState(UIState.ServerStat);
        });
        this.btnC.onClicked.add(() => {
            this.switchState(UIState.ClientStat);
        });
        this.rpcReciveBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientRecive);
            }
            else {
                this.switchState(UIState.ServerRecive);
            }
        });
        this.rpcSendBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientSend);
            }
            else {
                this.switchState(UIState.ServerSend);
            }
        });
        this.rpcCacheBtn.onClicked.add(() => {
            if (this.curState <= 4) {
                this.switchState(UIState.ClientCache);
            }
            else {
                this.switchState(UIState.ServerCache);
            }
        });
    }
    showPanel(flag) {
        this.canvas.visibility = flag ? SlateVisibility.Visible : SlateVisibility.Hidden;
    }
}

var foreign82 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: StatScript$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/CGS3DUI.ui
*/
let CGS3DUI_Generate = class CGS3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CGS3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/CGS3DUI.ui')
], CGS3DUI_Generate);
var CGS3DUI_Generate$1 = CGS3DUI_Generate;

var foreign103 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CGS3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L1_3DUI.ui
*/
let L1_3DUI_Generate = class L1_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L1_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L1_3DUI.ui')
], L1_3DUI_Generate);
var L1_3DUI_Generate$1 = L1_3DUI_Generate;

var foreign106 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L1_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L2_3DUI.ui
*/
let L2_3DUI_Generate = class L2_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L2_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L2_3DUI.ui')
], L2_3DUI_Generate);
var L2_3DUI_Generate$1 = L2_3DUI_Generate;

var foreign107 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L2_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L3_3DUI.ui
*/
let L3_3DUI_Generate = class L3_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L3_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L3_3DUI.ui')
], L3_3DUI_Generate);
var L3_3DUI_Generate$1 = L3_3DUI_Generate;

var foreign108 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L3_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L4_3DUI.ui
*/
let L4_3DUI_Generate = class L4_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L4_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L4_3DUI.ui')
], L4_3DUI_Generate);
var L4_3DUI_Generate$1 = L4_3DUI_Generate;

var foreign109 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L4_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L5_3DUI.ui
*/
let L5_3DUI_Generate = class L5_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L5_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L5_3DUI.ui')
], L5_3DUI_Generate);
var L5_3DUI_Generate$1 = L5_3DUI_Generate;

var foreign110 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L5_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/L6_3DUI.ui
*/
let L6_3DUI_Generate = class L6_3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
L6_3DUI_Generate = __decorate([
    UIBind('UI/DaTingUI/L6_3DUI.ui')
], L6_3DUI_Generate);
var L6_3DUI_Generate$1 = L6_3DUI_Generate;

var foreign111 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: L6_3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DaTingUI/QiDai.ui
*/
let QiDai_Generate = class QiDai_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
QiDai_Generate = __decorate([
    UIBind('UI/DaTingUI/QiDai.ui')
], QiDai_Generate);
var QiDai_Generate$1 = QiDai_Generate;

var foreign112 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: QiDai_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DefaultUI.ui
*/
let DefaultUI_Generate = class DefaultUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
DefaultUI_Generate = __decorate([
    UIBind('UI/DefaultUI.ui')
], DefaultUI_Generate);
var DefaultUI_Generate$1 = DefaultUI_Generate;

var foreign113 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L2UI/Lose3DUI.ui
*/
let Lose3DUI_Generate = class Lose3DUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
Lose3DUI_Generate = __decorate([
    UIBind('UI/L2UI/Lose3DUI.ui')
], Lose3DUI_Generate);
var Lose3DUI_Generate$1 = Lose3DUI_Generate;

var foreign118 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Lose3DUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L2UI/xL2_IntroUI.ui
*/
let xL2_IntroUI_Generate = class xL2_IntroUI_Generate extends UIScript {
    get gameName() {
        if (!this.gameName_Internal && this.uiWidgetBase) {
            this.gameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameName');
        }
        return this.gameName_Internal;
    }
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
xL2_IntroUI_Generate = __decorate([
    UIBind('UI/L2UI/xL2_IntroUI.ui')
], xL2_IntroUI_Generate);
var xL2_IntroUI_Generate$1 = xL2_IntroUI_Generate;

var foreign119 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: xL2_IntroUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L3UI/xL3_IntroUI.ui
*/
let xL3_IntroUI_Generate = class xL3_IntroUI_Generate extends UIScript {
    get gameName() {
        if (!this.gameName_Internal && this.uiWidgetBase) {
            this.gameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameName');
        }
        return this.gameName_Internal;
    }
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
xL3_IntroUI_Generate = __decorate([
    UIBind('UI/L3UI/xL3_IntroUI.ui')
], xL3_IntroUI_Generate);
var xL3_IntroUI_Generate$1 = xL3_IntroUI_Generate;

var foreign122 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: xL3_IntroUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L4UI/Prefabs/RPInteract/RPHud.ui
*/
let RPHud_Generate = class RPHud_Generate extends UIScript {
    get mBtnJump() {
        if (!this.mBtnJump_Internal && this.uiWidgetBase) {
            this.mBtnJump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasJump/mBtnJump');
        }
        return this.mBtnJump_Internal;
    }
    get mTextTips() {
        if (!this.mTextTips_Internal && this.uiWidgetBase) {
            this.mTextTips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/CanvasJump/mTextTips');
        }
        return this.mTextTips_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
RPHud_Generate = __decorate([
    UIBind('UI/L4UI/Prefabs/RPInteract/RPHud.ui')
], RPHud_Generate);
var RPHud_Generate$1 = RPHud_Generate;

var foreign124 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RPHud_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L4UI/xL4_IntroUI.ui
*/
let xL4_IntroUI_Generate = class xL4_IntroUI_Generate extends UIScript {
    get gameName() {
        if (!this.gameName_Internal && this.uiWidgetBase) {
            this.gameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameName');
        }
        return this.gameName_Internal;
    }
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
xL4_IntroUI_Generate = __decorate([
    UIBind('UI/L4UI/xL4_IntroUI.ui')
], xL4_IntroUI_Generate);
var xL4_IntroUI_Generate$1 = xL4_IntroUI_Generate;

var foreign125 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: xL4_IntroUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/L5UI/xL5_IntroUI.ui
*/
let xL5_IntroUI_Generate = class xL5_IntroUI_Generate extends UIScript {
    get gameName() {
        if (!this.gameName_Internal && this.uiWidgetBase) {
            this.gameName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameName');
        }
        return this.gameName_Internal;
    }
    get gameIntro() {
        if (!this.gameIntro_Internal && this.uiWidgetBase) {
            this.gameIntro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Image/gameIntro');
        }
        return this.gameIntro_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
xL5_IntroUI_Generate = __decorate([
    UIBind('UI/L5UI/xL5_IntroUI.ui')
], xL5_IntroUI_Generate);
var xL5_IntroUI_Generate$1 = xL5_IntroUI_Generate;

var foreign127 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: xL5_IntroUI_Generate$1
});

const MWModuleMap = { 
     '03A34578429C149E623044A73225A2B2': foreign1,
     'E0D442431D980D0C1D8AFD315D4EF0DE': foreign2,
     '75A667534B8C5C048F970C89CC4DB834': foreign3,
     '591CED2F44788F45EB0DEEA6F6B6E687': foreign4,
     'D2BDEABD4F5131E648B185B942F04A5C': foreign5,
     '5435F2584CCF91613EEDCF917A179C6B': foreign6,
     '9678C41C4309553B08288F8486D6799D': foreign7,
     '7752AD4D4366376062A6D7A3987B2423': foreign8,
     'A213AB76463CBC8DF8311E9B538DA7CC': foreign9,
     'E829DB3C485A85398C1118B7D0CCD269': foreign10,
     'D605D0EE4AB56DFF47D81DA82A96A745': foreign11,
     '4F119B4A4F26A4BF0F9AD2BB3C414071': foreign12,
     '39224E164972167DEEADC3A0DF128362': foreign13,
     '7882FFC0407D157DD2B38F8DFCBCBD08': foreign14,
     'E48989074121971E859214A39F6A73E7': foreign15,
     '59B06DD247A1B41F774C518406DA3405': foreign16,
     '902DC9AC4E99424D8657359714177422': foreign17,
     '3408A9184B2239C9785154B03925B925': foreign18,
     'E793F4E748068B7014AF149815249190': foreign19,
     '3EEB92844A7B3622C82564BC43D95654': foreign20,
     '97075A684B1B3B331CF2EAAB8AA5566F': foreign21,
     '31E824C040918ED66235ECA5D4B462DD': foreign22,
     '21E0839CC41DC4DC27D94186544C9915': foreign23,
     '2A7C27AC45934BDBCD05FE97F6728923': foreign24,
     'DE384A5946FC933BE00E14A3D15C11DA': foreign25,
     '41D701B14479959E0B84A1ABB9DFB9F1': foreign26,
     'B6626F7A46FEFA41E3AEF590A02C4C71': foreign27,
     '438E5C764D1519DF3231D19EB18A62CA': foreign28,
     'F89E3AFD4D8E7D7637F87BA289457D7C': foreign29,
     '706624D2467887ED81C49F969ACF5A8B': foreign30,
     '6065D46E4ABF6395041A11AFBEF6F7A5': foreign31,
     '4ED93ECA4E0CC52D1EC6E88EA81E52D4': foreign32,
     'B2BD88BF44051CF7F2E24F8B376435E9': foreign33,
     'FEA7B87E48A8503EFF952BAF671611CC': foreign34,
     '2078D8C3453DBE1FBEA7F186A9C627E4': foreign35,
     'D7AF235B406DCAB1E741B98578FBCB40': foreign36,
     '2FB6E4B543AB3F2F333918BD1139D2DB': foreign37,
     '29DC3F94459AFE9DBD798CB63C0A964B': foreign38,
     'ADBB320F4AF5F06A63BFD29212AFA73B': foreign39,
     '914B94344087F9068C5A8886B8F375E0': foreign40,
     'A446E80245DBE50B8E747F935323E88C': foreign41,
     '452477C94F5D539012AD2E8930394C4C': foreign42,
     'FB32C0304A24C92C016616B6B6D5A405': foreign43,
     '647FC4CE48CF9EC2527011B0C32305E9': foreign44,
     'D3696673452702865B99448FF2E994FC': foreign45,
     'BD28C724419908C8431A36924E2313A7': foreign46,
     'FD0E61404360C1B669B4A29560E7565C': foreign47,
     '179FC8814EBA4CE10C8BD08088282D61': foreign48,
     '9462785240CBD5F51B58A789E5D7A12D': foreign49,
     '7A08038A48D0B41DB32F26858A457F16': foreign50,
     'ECCFD2294D0471F9ECA5A28EF0EEDB82': foreign51,
     'CF67B869459A7C0EEEB2F380553C6691': foreign52,
     '01DDF28E49DF0625D8C5A59E8B8BAEE5': foreign53,
     'C7E2EBE04BB482BC96CFAFB69BDDDFB2': foreign54,
     '0EDB65224A015DF8DAD6C08F3CBA2EEA': foreign55,
     'F2EDAD0041814D040574DDB75378879C': foreign56,
     'E66B54A84B7ABD8B9BB52D8A23DC8115': foreign57,
     'CC7B986BB7A4DF1B86A5EADC4BCCCCEF': foreign58,
     '86F028C9420E4CB1F00F05AB5A1F5F33': foreign59,
     'B33F439F4F9A36C64AA5E8AE34BF64D6': foreign60,
     '1E90E81D409C8706CF17AF9F0A514C71': foreign61,
     'B6858B6C4D9F0B0A4DC6929FBAA9B28B': foreign62,
     '5889B23C40E2796F68FF6FA3FE4DD91B': foreign63,
     '93BE8AD54B3314E4A57DEFAD0418B86D': foreign64,
     '28DF9EAC4F0C74FB67B607B39A30ED4E': foreign65,
     'CFFD59F248DECB1A243595AE40E1A82A': foreign66,
     'DDCB43F245C981BA55C7CFB31ECF7FD4': foreign67,
     '50EEC8E0467336D55FE78D9E34BA9160': foreign68,
     '826300F9418B1B44287AD3B410B33D7E': foreign69,
     '176E09B94B9F53FC578522B65F5CFFA2': foreign70,
     '843E287B4C74BDBE2F3B57A374D1D8BF': foreign71,
     'FA0A9DAF49966F75EAFA8E97F62DAACF': foreign72,
     '5B167EF844B8BE00D0A9F8931B1B55EB': foreign73,
     '17DDDD83410A205686FE62A10E93F7E0': foreign74,
     '356713684C96D906C0AF37A5015610EC': foreign75,
     '5F61226542F53A9817A130B27EDAECBE': foreign76,
     'F17A65A34CC3361041B8A788EF90A47A': foreign77,
     '252658DC436B30804A954ABC6B6F4473': foreign78,
     '00C655E54494FFA6D68301864553EEE5': foreign79,
     '9D69D2E34ED22531EC05B2B86EB64D92': foreign80,
     '7B6311A341F821FD4BEFACBAA98A1C4A': foreign81,
     '608E258B47B744FAB08359879D838A23': foreign82,
     '0C35E6C7482A09EF5203E883EF167D49': foreign83,
     '9B4545A747713D0D6D30DC9643BC70A5': foreign84,
     '5CA355444BADA1C8999474A45D142731': foreign85,
     '2933E7604AF212DD6F8AB4BCA4AE01F5': foreign86,
     '31F4570646A3E697347996B3CFDB6450': foreign87,
     'D89C35B346BA065427C3318BD99802A9': foreign88,
     '55168B23446DF6FAF564CE815F9B6BBD': foreign89,
     'D2C384A84568FBEFE879A2A48F919E30': foreign90,
     '3F794F2D431CECD5601FC3AF1BFA3504': foreign91,
     '169F1EBC42B6F5F20890C0B42347C80C': foreign92,
     '362E32CD435AB450BA54D09F9F579554': foreign93,
     '6EFB0928461B819EA9EF2BBF4ED953DF': foreign94,
     '511A817A4099401A73767EB19340AD51': foreign95,
     '1F2DD54B47B8F96143BC6F9A57F770A2': foreign96,
     'D54ABEA147402C1609E0259DA6220888': foreign97,
     'D80CB9D4477B120E7928B1B0096894AA': foreign98,
     'FB3060904EEB9173C397848EF1BFF3BF': foreign99,
     'D68F2F204E2BA446C2BDAC8090D23932': foreign100,
     '0BAA62A6437AD05D8F5CC38DF59CE8B6': foreign101,
     '80473AA04114B7D6C1E1BE92D5C0FAC9': foreign102,
     'AEE768944D6A211F8F415B91336FFFB7': foreign103,
     'B8140A95463B2985870E93800796FE72': foreign104,
     '116685154220809AE0D75785AE24A7D1': foreign105,
     '3AA3B2FE4DB2A8830E77E492FDF296F0': foreign106,
     'EEC8718D425A862FD63C79A8E83BA7A8': foreign107,
     '2CD02A9A4E06AA741C438CA24E46BC45': foreign108,
     '4D55B0E5435EE6DB4159DEBEA2B12A84': foreign109,
     '1A34CE714C4E2026156D26A52905D046': foreign110,
     'A5E78E0B4457A15DC3986D89BE44FD07': foreign111,
     'CA07FF634DA1D110D48F39845F3FAB9A': foreign112,
     '086BF52642C633BC605BC7BE7785893B': foreign113,
     'A6CDFE6E45ECA9B77E6608B2005FB121': foreign114,
     'EF93C5D1405E412159AFCD95FE35A102': foreign115,
     '605E8D01479662916BE3CC878E346E74': foreign116,
     '2AFA539448C366B8A2DA488362C426AB': foreign117,
     'E5AAD2904B8D22C6B01AAE9778FCC4BE': foreign118,
     'D44A594441D3EBFDE5D0C2A1447F2CFF': foreign119,
     '024839F041BEADD17B6D798D0089D562': foreign120,
     'DC91157A42B96264C34589ACE8B8EDFA': foreign121,
     '7E5AE870477217E394735DB34D153FB3': foreign122,
     'B1F48E324DC515BFD3B06E8DC8E48E0C': foreign123,
     '9E3A3CBF46B880695642ABA1FB257865': foreign124,
     'EF8766EC4C76A0DD51CAE78DE99F1B3C': foreign125,
     '5886F7724571148D7A9867A580ABED28': foreign126,
     '46F7634049DF5154060C1486E2059C94': foreign127,
     'E088789742860DF50D9397B228A32AB9': foreign128,
     'A1661EF14594F42525C299AD71E6D463': foreign129,
     '73052FB2489F2E495CCD3B8E9997CCA5': foreign130,
     '9EC170C64AA8F8EB942EAD8C648BD9D6': foreign131,
     '3CECEA314A03F9B718B3468D2B89885F': foreign132,
     '0AE2D61F4031704B9290E58497BA56D8': foreign133,
     'F9CAC25741A4D6B0AE3BDD89BA86925E': foreign134,
     '2443B7F8413A7A83F2AC788A30D59805': foreign135,
     '3C230E0449A4DD9C1642A0A42EE580FF': foreign136,
     '1A1CBD004DEB387BADDA7F88CE576160': foreign137,
};
const MWFileMapping = new WeakMap([[foreign1 || {}, "JavaScripts/BGM_Change/BGM"],
[foreign2 || {}, "JavaScripts/ConveyorBeltTS"],
[foreign3 || {}, "JavaScripts/CountDown"],
[foreign4 || {}, "JavaScripts/DataBase/PlayerData"],
[foreign5 || {}, "JavaScripts/DaTing/CGSMatch"],
[foreign6 || {}, "JavaScripts/DaTing/PrepareTrigger"],
[foreign7 || {}, "JavaScripts/DaTing/RYWMatch/L_1"],
[foreign8 || {}, "JavaScripts/DaTing/RYWMatch/L_2"],
[foreign9 || {}, "JavaScripts/DaTing/RYWMatch/L_3"],
[foreign10 || {}, "JavaScripts/DaTing/RYWMatch/L_4"],
[foreign11 || {}, "JavaScripts/DaTing/RYWMatch/L_5"],
[foreign12 || {}, "JavaScripts/DaTing/RYWMatch/L_6"],
[foreign13 || {}, "JavaScripts/DaTing/RYWMatch/L_7"],
[foreign14 || {}, "JavaScripts/DaTing/RYWMatch/L_8"],
[foreign15 || {}, "JavaScripts/DaTing/SmallGame/MoTianLun"],
[foreign16 || {}, "JavaScripts/DaTing/SmallGame/MTLchuansong"],
[foreign17 || {}, "JavaScripts/DaTing/SmallGame/SkyWheel"],
[foreign18 || {}, "JavaScripts/DaTing/SmallGame/XuanZhuanMuMa"],
[foreign19 || {}, "JavaScripts/DefaultUI"],
[foreign20 || {}, "JavaScripts/GameAni"],
[foreign21 || {}, "JavaScripts/GameStart"],
[foreign22 || {}, "JavaScripts/GlobalManager"],
[foreign23 || {}, "JavaScripts/GravityArea"],
[foreign24 || {}, "JavaScripts/L1/boost"],
[foreign25 || {}, "JavaScripts/L1/b_tx"],
[foreign26 || {}, "JavaScripts/L1/level1Win"],
[foreign27 || {}, "JavaScripts/L1/slow"],
[foreign28 || {}, "JavaScripts/L1/s_tx1"],
[foreign29 || {}, "JavaScripts/L1/s_tx2"],
[foreign30 || {}, "JavaScripts/L2/CoinAudio"],
[foreign31 || {}, "JavaScripts/L2/CoinTX"],
[foreign32 || {}, "JavaScripts/L2/HoleMove"],
[foreign33 || {}, "JavaScripts/L2/level2Win"],
[foreign34 || {}, "JavaScripts/L2/outAudio"],
[foreign35 || {}, "JavaScripts/L2/playerLose"],
[foreign36 || {}, "JavaScripts/L2/playerOut"],
[foreign37 || {}, "JavaScripts/L3/BeHurt"],
[foreign38 || {}, "JavaScripts/L3/TestShoot1"],
[foreign39 || {}, "JavaScripts/L3/TestShoot10"],
[foreign40 || {}, "JavaScripts/L3/TestShoot11"],
[foreign41 || {}, "JavaScripts/L3/TestShoot12"],
[foreign42 || {}, "JavaScripts/L3/TestShoot13"],
[foreign43 || {}, "JavaScripts/L3/TestShoot14"],
[foreign44 || {}, "JavaScripts/L3/TestShoot15"],
[foreign45 || {}, "JavaScripts/L3/TestShoot16"],
[foreign46 || {}, "JavaScripts/L3/TestShoot2"],
[foreign47 || {}, "JavaScripts/L3/TestShoot3"],
[foreign48 || {}, "JavaScripts/L3/TestShoot4"],
[foreign49 || {}, "JavaScripts/L3/TestShoot5"],
[foreign50 || {}, "JavaScripts/L3/TestShoot6"],
[foreign51 || {}, "JavaScripts/L3/TestShoot7"],
[foreign52 || {}, "JavaScripts/L3/TestShoot8"],
[foreign53 || {}, "JavaScripts/L3/TestShoot9"],
[foreign54 || {}, "JavaScripts/L4/audioFall"],
[foreign55 || {}, "JavaScripts/L4/floorFall"],
[foreign56 || {}, "JavaScripts/L4/PingTai"],
[foreign57 || {}, "JavaScripts/L4/playerDead"],
[foreign58 || {}, "JavaScripts/L5/GravityArea"],
[foreign59 || {}, "JavaScripts/L5/L5_cubeTransfor"],
[foreign60 || {}, "JavaScripts/L5/L5_Dead"],
[foreign61 || {}, "JavaScripts/L5/L5_floorFall"],
[foreign62 || {}, "JavaScripts/L5/level5Win"],
[foreign63 || {}, "JavaScripts/L5/NewUIScript"],
[foreign64 || {}, "JavaScripts/L5/null"],
[foreign65 || {}, "JavaScripts/L6/L6_MyClearGuns"],
[foreign66 || {}, "JavaScripts/L6/left_right"],
[foreign67 || {}, "JavaScripts/L6/up_down"],
[foreign68 || {}, "JavaScripts/L7/boost"],
[foreign69 || {}, "JavaScripts/L7/b_tx"],
[foreign70 || {}, "JavaScripts/L7/level7Win"],
[foreign71 || {}, "JavaScripts/L7/slow"],
[foreign72 || {}, "JavaScripts/L7/slow_1"],
[foreign73 || {}, "JavaScripts/L7/s_tx_1"],
[foreign74 || {}, "JavaScripts/L7/s_tx_2"],
[foreign75 || {}, "JavaScripts/L8/ice_speed"],
[foreign76 || {}, "JavaScripts/L8/level8Win"],
[foreign77 || {}, "JavaScripts/L8/s_tx_1"],
[foreign78 || {}, "JavaScripts/L8/s_tx_2"],
[foreign79 || {}, "JavaScripts/LevelEnd"],
[foreign80 || {}, "JavaScripts/LookWar"],
[foreign81 || {}, "JavaScripts/SettlementManager"],
[foreign82 || {}, "JavaScripts/StatScript"],
[foreign83 || {}, "JavaScripts/UI/DaTingUI/CGSInitUI"],
[foreign84 || {}, "JavaScripts/UI/DaTingUI/CGSTSUI"],
[foreign85 || {}, "JavaScripts/UI/HotTimeUI"],
[foreign86 || {}, "JavaScripts/UI/L1UI/L1_IntroUI"],
[foreign87 || {}, "JavaScripts/UI/L2UI/CoinUI"],
[foreign88 || {}, "JavaScripts/UI/L2UI/L2_IntroUI"],
[foreign89 || {}, "JavaScripts/UI/L3UI/HurtUI"],
[foreign90 || {}, "JavaScripts/UI/L3UI/L3_IntroUI"],
[foreign91 || {}, "JavaScripts/UI/L4UI/L4_IntroUI"],
[foreign92 || {}, "JavaScripts/UI/L5UI/L5_IntroUI"],
[foreign93 || {}, "JavaScripts/UI/L6UI/L6_IntroUI"],
[foreign94 || {}, "JavaScripts/UI/L6UI/L6_ShootUI"],
[foreign95 || {}, "JavaScripts/UI/L7UI/L7_IntroUI"],
[foreign96 || {}, "JavaScripts/UI/L8UI/L8_IntroUI"],
[foreign97 || {}, "JavaScripts/UI/LevelLoadUI"],
[foreign98 || {}, "JavaScripts/UI/LookWarUI"],
[foreign99 || {}, "JavaScripts/UI/PassUI"],
[foreign100 || {}, "JavaScripts/UI/RankUI"],
[foreign101 || {}, "JavaScripts/UI/SettlementUI"],
[foreign102 || {}, "JavaScripts/UI/TimeUI"],
[foreign103 || {}, "JavaScripts/ui-generate/DaTingUI/CGS3DUI_generate"],
[foreign104 || {}, "JavaScripts/ui-generate/DaTingUI/CGSInitUI_generate"],
[foreign105 || {}, "JavaScripts/ui-generate/DaTingUI/CGSTSUI_generate"],
[foreign106 || {}, "JavaScripts/ui-generate/DaTingUI/L1_3DUI_generate"],
[foreign107 || {}, "JavaScripts/ui-generate/DaTingUI/L2_3DUI_generate"],
[foreign108 || {}, "JavaScripts/ui-generate/DaTingUI/L3_3DUI_generate"],
[foreign109 || {}, "JavaScripts/ui-generate/DaTingUI/L4_3DUI_generate"],
[foreign110 || {}, "JavaScripts/ui-generate/DaTingUI/L5_3DUI_generate"],
[foreign111 || {}, "JavaScripts/ui-generate/DaTingUI/L6_3DUI_generate"],
[foreign112 || {}, "JavaScripts/ui-generate/DaTingUI/QiDai_generate"],
[foreign113 || {}, "JavaScripts/ui-generate/DefaultUI_generate"],
[foreign114 || {}, "JavaScripts/ui-generate/HotTimeUI_generate"],
[foreign115 || {}, "JavaScripts/ui-generate/L1UI/L1_IntroUI_generate"],
[foreign116 || {}, "JavaScripts/ui-generate/L2UI/CoinUI_generate"],
[foreign117 || {}, "JavaScripts/ui-generate/L2UI/L2_IntroUI_generate"],
[foreign118 || {}, "JavaScripts/ui-generate/L2UI/Lose3DUI_generate"],
[foreign119 || {}, "JavaScripts/ui-generate/L2UI/xL2_IntroUI_generate"],
[foreign120 || {}, "JavaScripts/ui-generate/L3UI/HurtUI_generate"],
[foreign121 || {}, "JavaScripts/ui-generate/L3UI/L3_IntroUI_generate"],
[foreign122 || {}, "JavaScripts/ui-generate/L3UI/xL3_IntroUI_generate"],
[foreign123 || {}, "JavaScripts/ui-generate/L4UI/L4_IntroUI_generate"],
[foreign124 || {}, "JavaScripts/ui-generate/L4UI/Prefabs/RPInteract/RPHud_generate"],
[foreign125 || {}, "JavaScripts/ui-generate/L4UI/xL4_IntroUI_generate"],
[foreign126 || {}, "JavaScripts/ui-generate/L5UI/L5_IntroUI_generate"],
[foreign127 || {}, "JavaScripts/ui-generate/L5UI/xL5_IntroUI_generate"],
[foreign128 || {}, "JavaScripts/ui-generate/L6UI/L6_IntroUI_generate"],
[foreign129 || {}, "JavaScripts/ui-generate/L6UI/L6_ShootUI_generate"],
[foreign130 || {}, "JavaScripts/ui-generate/L7UI/L7_IntroUI_generate"],
[foreign131 || {}, "JavaScripts/ui-generate/L8UI/L8_IntroUI_generate"],
[foreign132 || {}, "JavaScripts/ui-generate/LevelLoadUI_generate"],
[foreign133 || {}, "JavaScripts/ui-generate/LookWarUI_generate"],
[foreign134 || {}, "JavaScripts/ui-generate/PassUI_generate"],
[foreign135 || {}, "JavaScripts/ui-generate/RankUI_generate"],
[foreign136 || {}, "JavaScripts/ui-generate/SettlementUI_generate"],
[foreign137 || {}, "JavaScripts/ui-generate/TimeUI_generate"]]);

exports.MWFileMapping = MWFileMapping;
exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
