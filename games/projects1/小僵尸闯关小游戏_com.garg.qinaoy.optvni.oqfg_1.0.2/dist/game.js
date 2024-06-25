'use strict';

var foreign0 = /*#__PURE__*/Object.freeze({
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

let CheckPoint2 = class CheckPoint2 extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
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
CheckPoint2 = __decorate([
    Component
], CheckPoint2);
var CheckPoint2$1 = CheckPoint2;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CheckPoint2$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/GameUI.ui
*/
let GameUI_Generate = class GameUI_Generate extends UIScript {
    get mBG() {
        if (!this.mBG_Internal && this.uiWidgetBase) {
            this.mBG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBG');
        }
        return this.mBG_Internal;
    }
    get mTextBlock() {
        if (!this.mTextBlock_Internal && this.uiWidgetBase) {
            this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTextBlock');
        }
        return this.mTextBlock_Internal;
    }
    get mLevelProgress() {
        if (!this.mLevelProgress_Internal && this.uiWidgetBase) {
            this.mLevelProgress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevelProgress');
        }
        return this.mLevelProgress_Internal;
    }
    get mLevelText() {
        if (!this.mLevelText_Internal && this.uiWidgetBase) {
            this.mLevelText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mLevelText');
        }
        return this.mLevelText_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
GameUI_Generate = __decorate([
    UIBind('UI/GameUI.ui')
], GameUI_Generate);
var GameUI_Generate$1 = GameUI_Generate;

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameUI_Generate$1
});

class GameUI extends GameUI_Generate$1 {
    constructor() {
        super(...arguments);
        /**最大关卡数 */
        this.maxLevelNum = 0;
        /**当前关卡数 */
        this.nowLevelNum = 0;
    }
    onAwake() {
        this.mBG.visibility = SlateVisibility.Hidden;
        this.mTextBlock.visibility = SlateVisibility.Hidden;
        Event.addLocalListener("Victory", () => {
            this.mBG.visibility = SlateVisibility.Visible;
            this.mTextBlock.visibility = SlateVisibility.Visible;
            this.mTextBlock.text = "芜湖胜利！";
        });
        Event.addLocalListener("Death", () => {
            this.mBG.visibility = SlateVisibility.Visible;
            this.mTextBlock.visibility = SlateVisibility.Visible;
            let time = 3;
            this.mTextBlock.text = time.toString();
            let handle = setInterval(() => {
                if (time == 1) {
                    clearInterval(handle);
                    this.mBG.visibility = SlateVisibility.Hidden;
                    this.mTextBlock.visibility = SlateVisibility.Hidden;
                }
                time--;
                this.mTextBlock.text = time.toString();
            }, 1000);
        });
        Event.addLocalListener("CheckPoint", (chekPoint) => {
            this.nowLevelNum = chekPoint.pointNumber;
            // 更新进度条
            this.freshProgress();
        });
    }
    onShow(maxLevelNum, nowLevelNum) {
        // 最大关卡数
        this.maxLevelNum = maxLevelNum;
        // 当前关卡数
        this.nowLevelNum = nowLevelNum;
        this.freshProgress();
    }
    freshProgress() {
        if (this.nowLevelNum == -1) {
            this.mLevelText.text = "第" + this.maxLevelNum + "关";
            this.mLevelProgress.currentValue = 1;
            return;
        }
        this.mLevelText.text = "第" + this.nowLevelNum + "关";
        this.mLevelProgress.currentValue = this.nowLevelNum / this.maxLevelNum;
    }
}

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameUI
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(rpcExtesionS, rpcExtesionC, null);
    }
    static isCharacterBase(obj) {
        return obj instanceof mw.Character;
    }
    /**是否是npc */
    static isNpc(obj) {
        if ((obj instanceof Character) && obj.player == null) {
            return true;
        }
        return false;
    }
    /**是否是玩家 */
    static isCharacter(obj) {
        if ((obj instanceof Character) && obj.player != null) {
            return true;
        }
        return false;
    }
    static isUseRpc(isSync) {
        if (SystemUtil.isServer()) {
            return false;
        }
        else {
            return isSync;
        }
    }
    //#region Stance姿态相关
    /**
     * 停止姿态
     * @param char character
     * @param sync 是否同步
     */
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(rpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    /**改变基础姿态 */
    static changeBaseStanceExtesion(char, assetId) {
        let basicStance = char.loadStance(assetId);
        basicStance.play();
    }
    /**
     * 改变姿态
     * @param char Character
     * @param assetId 姿态资源id
     */
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(rpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    /**
     * 加载姿态
     * @param char Character
     * @param assetId 姿态资源id
     * @param sync 是否同步
     * @returns 返回姿态
     */
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
    //#endregion Stance姿态相关end
    //#region  Animation动画相关
    static rpcPlayAnimation(owner, assetId, loop = 1, speed = 1) {
        let ani = this.loadAnimationExtesion(owner, assetId);
        ani.loop = loop;
        ani.speed = speed;
        ani.play();
        return ani;
    }
    static rpcStopAnimation(owner, assetId) {
        if (!this.isUseRpc(true)) {
            if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
                owner.currentAnimation.stop();
            return;
        }
        let module = ModuleService.getModule(rpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    /**
     * 播放动画
     * @param owner Character
     * @param assetId 动画资源id
     * @param speed 播放速率
     * @param loop 循环次数
     * @returns 返回动画
     */
    static playAnimationLocally(owner, assetId, speed, loop) {
        if (owner === undefined || owner === null)
            return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loop;
        anim.speed = speed;
        anim.play();
        return anim;
    }
    /**
     * 加载动画
     * @param char Character
     * @param assetid 动画资源id
     * @param sync 是否同步
     * @returns 返回动画
     */
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        Character.nameVisible;
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}
class rpcExtesionC extends ModuleC {
    //#region sync Animation
    playAnimationSync(charGuid, myAnimation) {
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    //#endregion sync Animation
    //#region sync Stance
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(stance.assetId);
    }
    net_playAnimation(charGuid, assetId, rate, loop, slot) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.resumeAnimation(charGuid, assetId);
    }
    net_stopAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId)
            return;
        RpcAnimation.stopAnimation(charGuid, assetId);
    }
}
class rpcExtesionS extends ModuleS {
    //#region sync Animation
    net_playAnimationSync(charGuid, assetId, rate, loop, slot) {
        this.getAllClient().net_playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimationSync(charGuid, assetId) {
        this.getAllClient().net_pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimationSync(charGuid, assetId) {
        this.getAllClient().net_resumeAnimation(charGuid, assetId);
    }
    net_stopAnimationSync(charGuid, assetId) {
        this.getAllClient().net_stopAnimation(charGuid, assetId);
    }
    //#endregion sync Animation
    //#region sync Stance
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(assetId) {
        RpcStance.stopStance(this.currentPlayer.character.gameObjectId, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(assetid, blendMode) {
        RpcStance.playStance(this.currentPlayer.character.gameObjectId, assetid, blendMode);
    }
}
class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this.loop = 1;
        this.speed = 1;
        this.slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get length() {
        return this.ani.length;
    }
    get isPlaying() {
        return this.ani.isPlaying;
    }
    get onFinish() {
        return this.ani.onFinish;
    }
    play() {
        this.ani?.play();
        let module = ModuleService.getModule(rpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(rpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(rpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(rpcExtesionC);
        module.stopAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    static playAnimation(guid, assetid, speed, loop, slot) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.loadAnimation(assetid);
        anim.loop = loop;
        anim.speed = speed;
        anim.slot = slot;
        anim.play();
        return anim;
    }
    static pauseAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.pause();
    }
    static resumeAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.resume();
    }
    static stopAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char)
            return;
        let anim = char.currentAnimation;
        if (!anim)
            return;
        anim.stop();
    }
}
class RpcStance {
    constructor(assetId, owner) {
        this.assetId = null;
        this.owner = null;
        this.blendMode = null;
        this.assetId = assetId;
        this.owner = owner;
    }
    play() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(rpcExtesionS) : ModuleService.getModule(rpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(rpcExtesionS) : ModuleService.getModule(rpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    static playStance(charGuid, assetId, blendMode) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        if (assetId == "") {
            char.currentSubStance?.stop();
            return;
        }
        let stance = char.loadSubStance(assetId);
        if (blendMode)
            stance.blendMode = blendMode;
        stance.play();
    }
    static stopStance(charGuid, assetId) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char)
            return;
        let currentStance = char.currentSubStance;
        if (currentStance && (currentStance.assetId == assetId || assetId == "")) {
            currentStance.stop();
        }
    }
}
PlayerManagerExtesion.init();

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/PrefabEvtUI.ui
 * TIME: 2023.03.27-16.57.10
 */
let PrefabEvtUI_Generate = class PrefabEvtUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mFlyUpBtn = undefined;
        this.mFlyDownBtn = undefined;
        this.mFlyCanvas = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.mFlyUpBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mFlyUpBtn");
        });
        this.mFlyUpBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mFlyDownBtn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mFlyDownBtn");
        });
        this.mFlyDownBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮多语言
        //文本多语言
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/mFlyCanvas/mFlyUpBtn')
], PrefabEvtUI_Generate.prototype, "mFlyUpBtn", void 0);
__decorate([
    UIWidgetBind('RootCanvas/mFlyCanvas/mFlyDownBtn')
], PrefabEvtUI_Generate.prototype, "mFlyDownBtn", void 0);
__decorate([
    UIWidgetBind('RootCanvas/mFlyCanvas')
], PrefabEvtUI_Generate.prototype, "mFlyCanvas", void 0);
PrefabEvtUI_Generate = __decorate([
    UIBind('UI/PrefabEvtUI.ui')
], PrefabEvtUI_Generate);
var PrefabEvtUI_Generate$1 = PrefabEvtUI_Generate;

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PrefabEvtUI_Generate$1
});

/*

 * @Date         : 2023-03-22 16:42:04

 * @LastEditTime: 2023-07-19 14:03:09
 * @FilePath: \commonprefab\JavaScripts\Prefabs\prefabEvent\PrefabEvtUI.ts
 * @Description  :
 */
class PrefabEvtUI extends PrefabEvtUI_Generate$1 {
    constructor() {
        super(...arguments);
        this._flyMove = Vector.zero;
    }
    onStart() {
        this.layer = mw.UILayerMiddle;
        Player.asyncGetLocalPlayer().then((player) => {
            this._char = player.character;
        });
        this.mFlyUpBtn.onPressed.add(() => {
            this._flyMove.z += 1;
            this.canUpdate = true;
        });
        this.mFlyDownBtn.onPressed.add(() => {
            this._flyMove.z -= 1;
            this.canUpdate = true;
        });
        this.mFlyDownBtn.onReleased.add(() => {
            this._flyMove.z += 1;
            this._char.addMovement(Vector.zero);
            if (this._flyMove.z == 0) {
                this.canUpdate = false;
            }
        });
        this.mFlyUpBtn.onReleased.add(() => {
            this._flyMove.z -= 1;
            this._char.addMovement(Vector.zero);
            if (this._flyMove.z == 0) {
                this.canUpdate = false;
            }
        });
    }
    onUpdate() {
        this._char.addMovement(this._flyMove);
    }
    setFlyCanvas(isShow) {
        this.mFlyCanvas.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
}

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PrefabEvtUI: PrefabEvtUI
});

/**
 * MapEx(可序列化)
*/
var MapEx;
(function (MapEx) {
    /**
     * 是否为空
     * @param map
     * @returns 是/否
     */
    function isNull(map) {
        return !map || map == null || map == undefined;
    }
    MapEx.isNull = isNull;
    /**
     * 获取对象
     * @param map
     * @param key
     * @returns
     */
    function get(map, key) {
        if (map[key]) {
            return map[key];
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            return map[key];
        }
        return null;
    }
    MapEx.get = get;
    /**
     * 设置对象
     * @param map
     * @param key
     * @param val
     */
    function set(map, key, val) {
        map[key] = val;
    }
    MapEx.set = set;
    /**
     * 删除对象
     * @param map
     * @param key
     * @returns 成功/失败
     */
    function del(map, key) {
        if (map[key]) {
            delete map[key];
            return true;
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            delete map[key];
            return true;
        }
        return false;
    }
    MapEx.del = del;
    /**
     * 是否有指定对象
     * @param map
     * @param key
     * @returns
     */
    function has(map, key) {
        if (map[key]) {
            return true;
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            return true;
        }
        return false;
    }
    MapEx.has = has;
    /**
     * 获取count数量
     * @param map
     * @param key
     * @returns
     */
    function count(map) {
        let res = 0;
        forEach(map, e => {
            ++res;
        });
        return res;
    }
    MapEx.count = count;
    /**
     * 遍历map
     * @param map
     * @param callback
     */
    function forEach(map, callback) {
        for (let key in map) {
            if (map[key]) {
                callback(key, map[key]);
            }
        }
    }
    MapEx.forEach = forEach;
    /**
     * 拷贝，Val还是引用出来的，只是Map换了
     * @param map
     * @returns
     */
    function copy(map) {
        let res = {};
        for (let key in map) {
            res[key] = map[key];
        }
        return res;
    }
    MapEx.copy = copy;
})(MapEx || (MapEx = {}));
class DBSaveBase {
}
class PrefabEventModuleData extends Subdata {
    constructor() {
        super(...arguments);
        this.cacheData = null;
    }
    initDefaultData() {
        if (this.cacheData == null) {
            this.cacheData = {};
        }
    }
    /**
     * 设置Value
     * @param key
     * @param val
     */
    setValue(key, val) {
        let data = new DBSaveBase();
        data.value = val;
        let dataStr = JSON.stringify(data);
        MapEx.set(this.cacheData, key, dataStr);
        this.save(true);
    }
    /**
     * 获取Value
     * @param key
     */
    getValue(key) {
        if (!MapEx.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx.get(this.cacheData, key);
        let res = JSON.parse(value);
        return res.value;
    }
}
__decorate([
    Decorator.persistence()
], PrefabEventModuleData.prototype, "cacheData", void 0);
let PrefabEventAirportData = class PrefabEventAirportData {
    constructor(_cacheData) {
        this.cacheData = {};
        if (_cacheData != null) {
            this.cacheData = _cacheData;
        }
    }
    /**
     * 设置Value
     * @param key
     * @param val
     */
    setValue(key, val) {
        console.log("[PF]set Vale : " + key + " => " + val);
        let data = new DBSaveBase();
        data.value = val;
        let dataStr = JSON.stringify(data);
        MapEx.set(this.cacheData, key, dataStr);
    }
    /**
     * 获取Value
     * @param key
     */
    getValue(key) {
        if (!MapEx.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx.get(this.cacheData, key);
        let res = JSON.parse(value);
        return res.value;
    }
};
PrefabEventAirportData = __decorate([
    Serializable
], PrefabEventAirportData);
class PrefabEventModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        /**
         * 空中数据
         */
        this.airData = {};
    }
    onStart() {
        PrefabEvent.PrefabEvtPlayerStat.onSetPlayerStat((senderGuid, targetGuid, stat) => {
            let char = Player.localPlayer.character;
            if (targetGuid == char.gameObjectId) {
                let prefabEveUI = mw.UIService.getUI(PrefabEvtUI);
                if (stat == PrefabEvent.PlayerStatType.Flying) {
                    char.switchToFlying();
                    mw.UIService.showUI(prefabEveUI);
                    prefabEveUI.setFlyCanvas(true);
                }
                else if (stat == PrefabEvent.PlayerStatType.Walking) {
                    char.switchToWalking();
                    mw.UIService.hideUI(prefabEveUI);
                    prefabEveUI.setFlyCanvas(false);
                }
            }
        });
    }
    /**
     * 同步空中数据
     * @param data
     */
    net_SyncAirData(data) {
        console.log("[PF] sync air data : " + data);
        this.airData = JSON.parse(data);
        MapEx.forEach(this.airData, (k, v) => {
            MapEx.set(this.airData, k, new PrefabEventAirportData(v.cacheData));
        });
    }
    /**
     * 同步服务器空中数据
     * @param targetGuid
     * @param key
     * @param data
     */
    net_SetData(targetGuid, key, data) {
        console.log("客户端 net_SetData : " + key + " => " + data);
        if (!MapEx.has(this.airData, targetGuid)) {
            MapEx.set(this.airData, targetGuid, new PrefabEventAirportData(null));
        }
        MapEx.get(this.airData, targetGuid).setValue(key, data);
    }
    /**
     * 获取空中数据
     * @param targetGuid
     * @param key
     * @returns
     */
    getData(targetGuid, key) {
        let res = null;
        if (!MapEx.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx.get(this.airData, targetGuid).getValue(key);
        return res;
    }
    /**
     * (双端)获取玩家信息
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    getPlayerInfo(clazzName, targetGuid, infoType) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.data?.getValue(clazzName + infoType);
                //console.log(value + ":" + clazzName + infoType)
                if (value == null)
                    value = 0;
                return value;
            }
        }
        return null;
    }
    /**
     * 获取玩家属性
     * @param targetGuid
     * @param val
     * @param attrType
     */
    getAttrVal(clazzName, targetGuid, attrType) {
        let curVal = this.getData(targetGuid, clazzName + attrType);
        if (curVal == null)
            curVal = 0;
        //console.error("获取玩家属性 : " + attrType + " : " + curVal);
        return curVal;
    }
    /**
    * 获取玩家状态
    * @param clazzName
    * @param targetGuid
    * @returns
    */
    getPlayerStat(clazzName, targetGuid) {
        let curVal = this.getData(clazzName, targetGuid);
        if (curVal == null)
            curVal = 0;
        //console.error("获取玩家状态 : " + curVal);
        return curVal;
    }
    /**
     * (双端)获取关卡
     * @param targetGuid
     */
    getRecordPoint(clazzName, targetGuid) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.data?.getValue(clazzName + "record");
                if (dbval == null)
                    dbval = 0;
                return dbval;
            }
        }
    }
    /**
     * 获取当前的货币数目
     * @param clazzName
     * @param targetGuid
     * @param currencyId
     * @returns
     */
    getCurrencyNum(clazzName, targetGuid, currencyId) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.data?.getValue(clazzName + currencyId);
                if (value == null)
                    value = 0;
                return value;
            }
        }
        return null;
    }
    /**
     * 用货币买东西
     * @param targetGuid 购买者
     * @param currencyId 货币id
     * @param price 价格
     * @returns 是否购买成功
     */
    async buyWithCurrency(targetGuid, currencyId, price) {
        return await this.server.net_BuyWithCurrency(targetGuid, currencyId, price);
    }
}
class PrefabEventModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.airData = {};
    }
    /**
     * 玩家进入游戏
     * @param player
     */
    onPlayerEnterGame(player) {
        // 同步一次空中数据
        this.getClient(player).net_SyncAirData(JSON.stringify(this.airData));
    }
    onPlayerLeft(player) {
        if (MapEx.has(this.airData, player.character.gameObjectId)) {
            MapEx.del(this.airData, player.character.gameObjectId);
        }
    }
    /**
     * 设置玩家空中数据
     * @param targetGuid
     * @param key
     * @param data
     */
    setData(targetGuid, key, data) {
        console.log("[PF:]net_SetData");
        this.getAllClient().net_SetData(targetGuid, key, data);
        if (!MapEx.has(this.airData, targetGuid)) {
            MapEx.set(this.airData, targetGuid, new PrefabEventAirportData());
        }
        MapEx.get(this.airData, targetGuid).setValue(key, data);
    }
    /**
     * 获取玩家空中数据
     * @param targetGuid
     * @param key
     * @returns
     */
    getData(targetGuid, key) {
        let res = null;
        if (!MapEx.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx.get(this.airData, targetGuid).getValue(key);
        return res;
    }
    /**
     * 广播事件
     * @param clazzName
     * @param funcName
     * @param params
     */
    notify(clazzName, funcName, ...params) {
        Event.dispatchToAllClient(PrefabEvent._onEventNetKey, clazzName, funcName, ...params);
        Event.dispatchToLocal(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
        console.log(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
    }
    /**
     * (双端)添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param attrType 属性类型
     */
    onSetAttrVal(clazzName, senderGuid, targetGuid, val, attrType) {
        let curVal = 0;
        curVal = val;
        this.setData(targetGuid, clazzName + attrType, curVal);
        console.log("[PF:]设置玩家属性 : " + attrType + " : " + curVal);
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (attrType == PrefabEvent.AttrType.Jump) {
                char.maxJumpHeight = curVal;
            }
            if (attrType == PrefabEvent.AttrType.Speed) {
                char.maxWalkSpeed = curVal;
            }
        }
        this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
    }
    /**
     * 添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param attrType 属性类型
     */
    onAddAttrVal(clazzName, senderGuid, targetGuid, val, attrType) {
        let curVal = this.getData(targetGuid, clazzName + attrType);
        if (curVal == null)
            curVal = 0;
        curVal += val;
        this.setData(targetGuid, clazzName + attrType, curVal);
        console.log("[PF:]设置玩家属性 : " + attrType + " : " + curVal);
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (attrType == PrefabEvent.AttrType.Jump) {
                char.maxJumpHeight = curVal;
            }
            if (attrType == PrefabEvent.AttrType.Speed) {
                char.maxWalkSpeed = curVal;
            }
        }
        this.notify(clazzName, PrefabEvent.PrefabEvtAttr.onChangeAttrVal.name, senderGuid, targetGuid, curVal, attrType);
    }
    /**
     * 获取属性
     * @param targetGuid
     * @param val
     * @param attrType
     */
    getAttrVal(clazzName, targetGuid, attrType) {
        let curVal = this.getData(targetGuid, clazzName + attrType);
        if (curVal == null)
            curVal = 0;
        //console.log("[PF:]获取玩家属性 : " + attrType + " : " + curVal);
        return curVal;
    }
    /**
     * (双端) 穿戴装备
     * @param targetGuid 对象Guid
     * @param slot 槽位
     * @param equipGuid 装备Guid
     */
    onEquip(clazzName, targetGuid, slot, equipGuid) {
        this.setData(targetGuid, clazzName + slot, equipGuid);
        this.notify(clazzName, this.onEquip.name, targetGuid, slot, equipGuid);
    }
    /**
     * (双端)设置属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    onSetPlayerInfo(clazzName, senderGuid, targetGuid, val, infoType) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                this.getPlayerData(char.player.playerId).setValue(clazzName + infoType, val);
                this.notify(clazzName, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
            }
        }
    }
    /**
     * (双端)获取属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    getPlayerInfo(clazzName, targetGuid, infoType) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.getPlayerData(char.player.playerId).getValue(clazzName + infoType);
                if (value == null)
                    value = 0;
                return value;
            }
        }
        return null;
    }
    /**
     * (双端)添加属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    onAddPlayerInfo(clazzName, senderGuid, targetGuid, val, infoType) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerInfo(clazzName, targetGuid, infoType);
                if (dbval == null || !Number.isNaN(dbval)) {
                    let nVal = dbval;
                    nVal += val;
                    this.onSetPlayerInfo(clazzName, senderGuid, targetGuid, nVal, infoType);
                    this.notify(clazzName, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, infoType);
                }
            }
        }
    }
    /**
     * (双端)设置关卡
     * @param senderGuid 发送者Guid
     * @param targetGuid 目标Guid
     * @param recordPointId 记录点id
     */
    onSetRecordPoint(clazzName, senderGuid, targetGuid, recordPointId, saveDB) {
        console.log("[PF:]onSetRecordPoint : " + clazzName + "_" + senderGuid);
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                if (saveDB)
                    this.getPlayerData(char.player.playerId)?.setValue(clazzName + "record", recordPointId);
                this.notify(clazzName, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId);
            }
        }
    }
    /**
     * (双端)获取关卡
     * @param targetGuid
     */
    getRecordPoint(clazzName, targetGuid) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerData(char.player.playerId)?.getValue(clazzName + "record");
                return dbval;
            }
        }
    }
    /**
     * (双端)获得收集物
     * @param senderGuid
     * @param targetGuid
     * @param atlasId
     */
    onAddCollection(clazzName, atlasId, charGuid) {
        let char = GameObject.findGameObjectById(charGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let db = this.getPlayerData(char.player.playerId);
                if (db) {
                    let dbval = db.getValue(clazzName + "atlasItem");
                    if (!dbval) {
                        dbval = [];
                    }
                    if (dbval.indexOf(atlasId) == -1) {
                        dbval.push(atlasId);
                        db.setValue(clazzName + "atlasItem", dbval);
                        this.notify(clazzName, this.onAddCollection.name, atlasId, charGuid);
                    }
                }
            }
        }
    }
    /**
     * 获取所有收集物
     */
    getAllCollection(clazzName, charGuid) {
        let char = GameObject.findGameObjectById(charGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getPlayerData(char.player.playerId)?.getValue(clazzName + "atlasItem");
                let res = [];
                if (dbval) {
                    res.push(...dbval);
                }
                return res;
            }
        }
    }
    /**
     * 获取玩家状态
     * @param clazzName
     * @param targetGuid
     * @returns
     */
    getPlayerStat(clazzName, targetGuid) {
        let curVal = this.getData(clazzName, targetGuid);
        if (curVal == null)
            curVal = 0;
        //console.log("[PF:]获取玩家状态 : " + curVal);
        return curVal;
    }
    /**
     * (双端)设置属性
     * @param senderGuid 发起对象Guid
     * @param targetGuid 目标对象Guid
     * @param val 值
     * @param infoType 信息类型
     */
    onSetPlayerStat(clazzName, senderGuid, targetGuid, statType) {
        this.setData(targetGuid, clazzName, statType);
        this.notify(clazzName, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
    }
    getCurrencyNum(clazzName, targetGuid, currencyId) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let value = this.getPlayerData(char.player.playerId).getValue(clazzName + currencyId);
                if (value == null)
                    value = 0;
                return value;
            }
        }
        return null;
    }
    /**
     *
     * @param clazzName
     * @param senderGuid
     * @param targetGuid
     */
    onChangeCurrency(clazzName, targetGuid, currencyId, currencyNum) {
        let char = GameObject.findGameObjectById(targetGuid);
        if (PlayerManagerExtesion.isCharacter(char)) {
            if (char.player) {
                let dbval = this.getCurrencyNum(clazzName, targetGuid, currencyId);
                if (dbval == null || !Number.isNaN(dbval)) {
                    let nVal = dbval;
                    nVal += currencyNum;
                    this.getPlayerData(char.player.playerId).setValue(clazzName + currencyId, nVal);
                    this.notify(clazzName, this.onChangeCurrency.name, targetGuid, currencyId, currencyNum, nVal);
                }
            }
        }
    }
    /**
     *
     * @param targetGuid
     * @param currencyId
     * @param price
     * @returns
     */
    net_BuyWithCurrency(targetGuid, currencyId, price) {
        let curNum = this.getCurrencyNum(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId);
        if (curNum < price) {
            return false;
        }
        else {
            this.onChangeCurrency(PrefabEvent.PrefabEvtCurrency.name, targetGuid, currencyId, -price);
            return true;
        }
    }
}
ModuleService.registerModule(PrefabEventModuleS, PrefabEventModuleC, PrefabEventModuleData);

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MapEx () { return MapEx; },
    PrefabEventModuleC: PrefabEventModuleC,
    PrefabEventModuleData: PrefabEventModuleData,
    PrefabEventModuleS: PrefabEventModuleS
});

var PrefabEvent;
(function (PrefabEvent) {
    /**
     * 网络事件key
     */
    PrefabEvent._onEventNetKey = "PrefabEventExNeyKey";
    /**
     * 本地事件key
     */
    PrefabEvent._onEventKey = "PrefabEventExKey";
    function callRemoteFunc(clazzName, funcName, ...params) {
        if (!PrefabEvent[clazzName] || !PrefabEvent[clazzName][funcName]) {
            console.error("无效协议 " + clazzName + " : " + funcName);
            return;
        }
        callFunc(clazzName, funcName, ...params);
    }
    function addEventListeners() {
        if (mw.SystemUtil.isServer()) {
            Event.addClientListener(PrefabEvent._onEventNetKey, (player, clazzName, funcName, ...params) => {
                callRemoteFunc(clazzName, funcName, ...params);
            });
        }
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(PrefabEvent._onEventNetKey, (clazzName, funcName, ...params) => {
                callLocalFunc(clazzName, funcName, ...params);
            });
        }
    }
    function initEvent() {
        addEventListeners();
    }
    /**
     * 回调客户端事件
     * @param clazzName
     * @param funcName
     * @param params
     */
    function callLocalFunc(clazzName, funcName, ...params) {
        Event.dispatchToLocal(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, ...params);
    }
    /**
     * 回调事件
     * @param clazzName
     * @param funcName
     * @param params
     */
    function callFunc(clazzName, funcName, ...params) {
        if (mw.SystemUtil.isClient()) {
            /** 透传到服务端去 执行 */
            Event.dispatchToServer(PrefabEvent._onEventNetKey, clazzName, funcName, ...params);
        }
        if (mw.SystemUtil.isServer()) {
            /** 调用函数 得到结果 在广播出去 */
            if (ModuleService.getModule(PrefabEventModuleS)[funcName]) {
                ModuleService.getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
            }
            else {
                ModuleService.getModule(PrefabEventModuleS).notify(clazzName, funcName, ...params);
            }
        }
    }
    /**
     * 回调事件
     * @param clazzName
     * @param funcName
     * @param params
     */
    function callFuncRes(clazzName, funcName, ...params) {
        if (mw.SystemUtil.isClient()) {
            /** 透传到服务端去 执行 */
            if (!ModuleService.getModule(PrefabEventModuleC)[funcName]) {
                console.error("find error PrefabEventModuleC: " + funcName);
                return null;
            }
            return ModuleService.getModule(PrefabEventModuleC)[funcName](clazzName, ...params);
        }
        if (mw.SystemUtil.isServer()) {
            if (!ModuleService.getModule(PrefabEventModuleS)[funcName]) {
                console.error("find error PrefabEventModuleS: " + funcName);
                return null;
            }
            /** 调用函数 得到结果 在广播出去 */
            return ModuleService.getModule(PrefabEventModuleS)[funcName](clazzName, ...params);
        }
    }
    /**
     * 监听事件
     * @param clazzName
     * @param funcName
     * @param callback
     */
    function onFunc(clazzName, funcName, callback) {
        // console.log("register : " + _onEventKey + ":" + clazzName + ":" + funcName);
        return Event.addLocalListener(PrefabEvent._onEventKey + ":" + clazzName + ":" + funcName, callback);
    }
    (function (AttrType) {
        /** 最大血量  */
        AttrType[AttrType["MaxHp"] = 0] = "MaxHp";
        /** 当前Hp */
        AttrType[AttrType["CurHp"] = 1] = "CurHp";
        /** 最大蓝量 */
        AttrType[AttrType["MaxMp"] = 2] = "MaxMp";
        /** 攻击力 */
        AttrType[AttrType["Attack"] = 3] = "Attack";
        /** 魔法力 */
        AttrType[AttrType["Magic"] = 4] = "Magic";
        /** 防御力 */
        AttrType[AttrType["Def"] = 5] = "Def";
        /** 魔法防御力 */
        AttrType[AttrType["MDef"] = 6] = "MDef";
        /** 速度 */
        AttrType[AttrType["Speed"] = 7] = "Speed";
        /** 跳跃力 */
        AttrType[AttrType["Jump"] = 8] = "Jump";
        /** 攻击速度 */
        AttrType[AttrType["AttackSpeed"] = 9] = "AttackSpeed";
        /** 攻击距离 */
        AttrType[AttrType["AttackDistance"] = 10] = "AttackDistance";
        /** 是否是无敌 */
        AttrType[AttrType["IsInvincible"] = 11] = "IsInvincible";
    })(PrefabEvent.AttrType || (PrefabEvent.AttrType = {}));
    /**
     * 属性协议
     */
    class PrefabEvtAttr {
        /**
         * (双端)添加属性
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param attrType 属性类型
         */
        static setAttrVal(senderGuid, targetGuid, val, attrType) {
            callFunc(this.name, this.onSetAttrVal.name, senderGuid, targetGuid, val, attrType);
        }
        /**
         * (双端)监听属性改变
         * @param callback 回调
         * @returns
         */
        static onSetAttrVal(callback) {
            return this.onChangeAttrVal(callback);
        }
        /**
         * (双端)添加属性
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param attrType 属性类型
         */
        static addAttrVal(senderGuid, targetGuid, val, attrType) {
            callFunc(this.name, this.onAddAttrVal.name, senderGuid, targetGuid, val, attrType);
        }
        static onAddAttrVal(callback) {
            return this.onChangeAttrVal(callback);
        }
        /**
         * (双端)获取属性
         * @param targetGuid
         * @param val
         * @param attrType
         */
        static getAttrVal(targetGuid, attrType) {
            let res = callFuncRes(this.name, this.getAttrVal.name, targetGuid, attrType);
            return res;
        }
        /**
         * (双端)监听属性改变
         * @param callback 回调
         * @returns
         */
        static onChangeAttrVal(callback) {
            return onFunc(this.name, this.onChangeAttrVal.name, callback);
        }
    }
    PrefabEvent.PrefabEvtAttr = PrefabEvtAttr;
    (function (EquipSlot) {
        /** 武器 */
        EquipSlot[EquipSlot["Weapon"] = 1] = "Weapon";
    })(PrefabEvent.EquipSlot || (PrefabEvent.EquipSlot = {}));
    /**
     * 装备协议
     */
    class PrefabEvtEquip {
        /**
         * (双端) 穿戴装备
         * @param targetGuid 对象Guid
         * @param slot 槽位
         * @param equipGuid 装备Guid
         */
        static equip(targetGuid, slot, equipGuid) {
            callFunc(this.name, this.onEquip.name, targetGuid, slot, equipGuid);
        }
        /**
         * (双端)监听装备改变
         * @param callback
         * @returns
         */
        static onEquip(callback) {
            return onFunc(this.name, this.onEquip.name, callback);
        }
    }
    PrefabEvent.PrefabEvtEquip = PrefabEvtEquip;
    (function (PlayerInfoType) {
        /** 名字 */
        PlayerInfoType[PlayerInfoType["Name"] = 0] = "Name";
        /** 等级 */
        PlayerInfoType[PlayerInfoType["Level"] = 1] = "Level";
        /** 经验 */
        PlayerInfoType[PlayerInfoType["Exp"] = 2] = "Exp";
        /** 金币 */
        PlayerInfoType[PlayerInfoType["Gold"] = 3] = "Gold";
        /** 积分 */
        PlayerInfoType[PlayerInfoType["Score"] = 4] = "Score";
        /** 关卡 */
        PlayerInfoType[PlayerInfoType["Stage"] = 5] = "Stage";
        /** 人气 */
        PlayerInfoType[PlayerInfoType["Popularity"] = 6] = "Popularity";
        /** 是否不在大厅中 */
        PlayerInfoType[PlayerInfoType["IsNotInLobby"] = 7] = "IsNotInLobby";
        /** 死亡次数 */
        PlayerInfoType[PlayerInfoType["DeathCount"] = 8] = "DeathCount";
    })(PrefabEvent.PlayerInfoType || (PrefabEvent.PlayerInfoType = {}));
    /**
     * 玩家信息协议
     */
    class PrefabEvtPlayerInfo {
        /**
         * (双端)获取玩家信息
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        static getPlayerInfo(targetGuid, infoType) {
            return callFuncRes(this.name, this.getPlayerInfo.name, targetGuid, infoType);
        }
        /**
         * (双端)设置玩家信息
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        static setPlayerInfo(senderGuid, targetGuid, val, infoType) {
            callFunc(this.name, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
        }
        /**
         * (双端)监听信息改变
         * @param callback 回调
         * @returns
         */
        static onSetPlayerInfo(callback) {
            return onFunc(this.name, this.onSetPlayerInfo.name, callback);
        }
        /**
         * (双端)添加信息
         * @param senderGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param val 值
         * @param infoType 信息类型
         */
        static addPlayerInfo(senderGuid, targetGuid, val, attrType) {
            callFunc(this.name, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, attrType);
        }
        /**
         * (双端)监听信息改变
         * @param callback 回调
         * @returns
         */
        static onAddPlayerInfo(callback) {
            return onFunc(this.name, this.onAddPlayerInfo.name, callback);
        }
    }
    PrefabEvent.PrefabEvtPlayerInfo = PrefabEvtPlayerInfo;
    (function (PlayerStatType) {
        /** 行走 */
        PlayerStatType[PlayerStatType["Walking"] = 0] = "Walking";
        /** 飞行 */
        PlayerStatType[PlayerStatType["Flying"] = 1] = "Flying";
    })(PrefabEvent.PlayerStatType || (PrefabEvent.PlayerStatType = {}));
    class PrefabEvtPlayerStat {
        /**
         * (双端)更改玩家状态
         * @param senderGuid 发起对象guid
         * @param targetGuid 目标对象guid
         * @param statType 玩家状态
         */
        static setPlayerStat(senderGuid, targetGuid, statType) {
            return callFunc(this.name, this.onSetPlayerStat.name, senderGuid, targetGuid, statType);
        }
        /**
         * (双端)监听玩家状态更改
         * @param callback
         */
        static onSetPlayerStat(callback) {
            return onFunc(this.name, this.onSetPlayerStat.name, callback);
        }
        /**
         * (双端)获得玩家当前状态
         * @param targetGuid 目标对象guid
         * @returns 玩家当前状态
         */
        static getPlayerStat(targetGuid) {
            return callFuncRes(this.name, this.getPlayerStat.name, targetGuid);
        }
    }
    PrefabEvent.PrefabEvtPlayerStat = PrefabEvtPlayerStat;
    /**
    * 攻击协议
    */
    class PrefabEvtFight {
        /**
         * (双端)击中目标
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param damage 伤害
         * @param hitPoint 击中点
         */
        static hit(senderGuid, targetGuid, damage, hitPoint) {
            callFunc(this.name, this.onHit.name, senderGuid, targetGuid, damage, hitPoint);
        }
        /**
         * (双端)监听击中目标
         * @param callback 回调
         * @returns
         */
        static onHit(callback) {
            return onFunc(this.name, this.onHit.name, callback);
        }
        /**
         * (双端)发起伤害
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param damage 伤害
         */
        static hurt(senderGuid, targetGuid, damage) {
            callFunc(this.name, this.onHurt.name, senderGuid, targetGuid, damage);
        }
        /**
         * (双端)监听受到伤害
         * @param callback 回调
         * @returns
         */
        static onHurt(callback) {
            return onFunc(this.name, this.onHurt.name, callback);
        }
        /**
         * (双端)发起治疗
         * @param attackerGuid 发起对象Guid
         * @param targetGuid 目标对象Guid
         * @param cureVal 治疗数值
         */
        static cure(senderGuid, targetGuid, cureVal) {
            callFunc(this.name, this.onCure.name, senderGuid, targetGuid, cureVal);
        }
        /**
         * (双端)监听受到治疗
         * @param callback 回调
         * @returns
         */
        static onCure(callback) {
            return onFunc(this.name, this.onCure.name, callback);
        }
        /**
         * (双端)发起死亡
         * @param targetGuid
         */
        static die(targetGuid) {
            callFunc(this.name, this.onDie.name, targetGuid);
        }
        /**
         * (双端)监听对象死亡
         * @param callback
         * @returns
         */
        static onDie(callback) {
            return onFunc(this.name, this.onDie.name, callback);
        }
        /**
         * (双端)通知复活
         * @param targetGuid 对象id
         */
        static revive(targetGuid) {
            callFunc(this.name, this.onRevive.name, targetGuid);
        }
        /**
         * (双端)监听复活
         * @param callback 回调
         * @returns
         */
        static onRevive(callback) {
            return onFunc(this.name, this.onRevive.name, callback);
        }
    }
    PrefabEvent.PrefabEvtFight = PrefabEvtFight;
    /**
     * 记录点协议
     */
    class PrefabEvtRecordPoint {
        /**
         * (双端)设置关卡
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标Guid
         * @param recordPointId 记录点id
         */
        static setRecordPoint(senderGuid, targetGuid, recordPointId, saveDB) {
            callFunc(this.name, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId, saveDB);
        }
        /**
         * (双端)获取关卡
         * @param targetGuid
         */
        static getRecordPoint(targetGuid) {
            return callFuncRes(this.name, this.getRecordPoint.name, targetGuid);
        }
        /**
         * (双端)监听设置关卡
         * @param callback 回调
         * @returns
         */
        static onSetRecordPoint(callback) {
            return onFunc(this.name, this.onSetRecordPoint.name, callback);
        }
        /**
         * (双端)返回存档记录点
         * @param senderGuid 发送者guid
         */
        static backCurrentRecordPoint(senderGuid) {
            callFunc(this.name, this.onBackCurrentRecordPoint.name, senderGuid);
        }
        /**
         * (双端)监听回到存档记录点
         * @param callback 回调
         */
        static onBackCurrentRecordPoint(callback) {
            return onFunc(this.name, this.onBackCurrentRecordPoint.name, callback);
        }
        /**
         * (双端)返回记录点
         * @param senderGuid 发送者guid
         * @param recordPointId 记录点id
         */
        static backRecordPoint(senderGuid, recordPointId) {
            callFunc(this.name, this.onBackRecordPoint.name, senderGuid, recordPointId);
        }
        /**
         * (双端)监听回到记录点
         * @param callback 回调
         */
        static onBackRecordPoint(callback) {
            return onFunc(this.name, this.onBackRecordPoint.name, callback);
        }
    }
    PrefabEvent.PrefabEvtRecordPoint = PrefabEvtRecordPoint;
    /**
     * 通知协议
     */
    class PrefabEvtNotify {
        /**
         * (客户端)本地通知
         * @param text
         */
        static notifyLocal(text) {
            callLocalFunc(this.name, this.onNotify.name, text);
        }
        /**
         * (双端)全局通知
         * @param text 信息
         */
        static notify(text) {
            callFunc(this.name, this.onNotify.name, text);
        }
        /**
         * (双端)监听通知
         * @param callback
         * @returns
         */
        static onNotify(callback) {
            return onFunc(this.name, this.onNotify.name, callback);
        }
    }
    PrefabEvent.PrefabEvtNotify = PrefabEvtNotify;
    /**
     * 排行榜协议
     */
    class PrefabEvtRank {
        /**
         * (客户端)打开排行榜UI
         */
        static openRank() {
            callLocalFunc(this.name, this.onOpenRank.name);
        }
        /**
         * (客户端)监听打开排行榜UI
         * @param callback 回调
         * @returns
         */
        static onOpenRank(callback) {
            return onFunc(this.name, this.onOpenRank.name, callback);
        }
        /**
         * (双端)设置排行榜数据
         * @param senderGuid
         * @param score
         * @param typeName
         */
        static setRankData(senderGuid, name, score, typeName) {
            callFunc(this.name, this.onSetRankData.name, senderGuid, name, score, typeName);
        }
        /**
         * (双端)监听设置排行榜数据
         * @param callback
         * @returns
         */
        static onSetRankData(callback) {
            return onFunc(this.name, this.onSetRankData.name, callback);
        }
        /**
         * (双端)删除排行榜数据
         * @param senderGuid
         */
        static delRankData(senderGuid) {
            callFunc(this.name, this.onDelRankData.name, senderGuid);
        }
        /**
         * (双端)监听删除排行榜数据
         * @param callback
         * @returns
         */
        static onDelRankData(callback) {
            return onFunc(this.name, this.onDelRankData.name, callback);
        }
    }
    PrefabEvent.PrefabEvtRank = PrefabEvtRank;
    /**
     * 换装协议
     */
    class PrefabEvtCloth {
        /**
         * (客户端)加载角色体型
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param dressResGuid 装扮资源Guid
         */
        static loadRole(senderGuid, targetGuid, dressResGuid) {
            callLocalFunc(this.name, this.onLoadRole.name, senderGuid, targetGuid, dressResGuid);
        }
        /**
         * (客户端)监听加载角色体型协议
         * @param callback 回调
         * @returns
         */
        static onLoadRole(callback) {
            return onFunc(this.name, this.onLoadRole.name, callback);
        }
        /**
         * (客户端)加载装扮
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param dressResGuid 装扮资源Guid
         */
        static loadCloth(senderGuid, targetGuid, dressResGuid) {
            callLocalFunc(this.name, this.onLoadCloth.name, senderGuid, targetGuid, dressResGuid);
        }
        /**
         * (客户端)监听加载装扮
         * @param callback
         * @returns
         */
        static onLoadCloth(callback) {
            return onFunc(this.name, this.onLoadCloth.name, callback);
        }
        /**
         * (客户端)加载插槽资源
         * @param senderGuid 发送者Guid
         * @param targetGuid 目标对象Guid
         * @param slotResGuid 插槽资源Guid
         */
        static loadSlot(senderGuid, targetGuid, slotResGuid) {
            callLocalFunc(this.name, this.onLoadSlot.name, senderGuid, targetGuid, slotResGuid);
        }
        /**
         * (客户端)监听加载插槽资源
         * @param callback
         * @returns
         */
        static onLoadSlot(callback) {
            return onFunc(this.name, this.onLoadSlot.name, callback);
        }
    }
    PrefabEvent.PrefabEvtCloth = PrefabEvtCloth;
    /**
     * 收集物协议
     */
    class PrefabEvtCollection {
        /**
         * (客户端)打开收集物UI
         */
        static openCollectionUI() {
            callLocalFunc(this.name, this.onOpenCollectionUI.name);
        }
        /**
         * (客户端)监听收集物UI被打开
         * @param callback
         * @returns
         */
        static onOpenCollectionUI(callback) {
            return onFunc(this.name, this.onOpenCollectionUI.name, callback);
        }
        /**
         * (双端)获得收集物
         * @param senderGuid
         * @param targetGuid
         * @param atlasId
         */
        static addCollection(atlasId, charGuid) {
            callFunc(this.name, this.onAddCollection.name, atlasId, charGuid);
        }
        /**
         * (双端)获取所有已经收集的物品
         */
        static getAllCollection(charGuid) {
            return callFuncRes(this.name, this.getAllCollection.name, charGuid);
        }
        /**
         * (双端)监听获得收集物
         * @param callback 回调
         * @returns
         */
        static onAddCollection(callback) {
            return onFunc(this.name, this.onAddCollection.name, callback);
        }
    }
    PrefabEvent.PrefabEvtCollection = PrefabEvtCollection;
    class PrefabEvtCurrency {
        /**
         * (双端)改变货币的值
         * @param targetGuid 改变的对象
         * @param currencyId 货币Id
         * @param changeNum 改变的数目
         */
        static changeCurrency(targetGuid, currencyId, changeNum) {
            callFunc(this.name, this.onChangeCurrency.name, targetGuid, currencyId, changeNum);
        }
        /**
         * (双端)监听改变货币的值
         * @param targetGuid 改变的对象
         * @param currencyId 货币Id
         * @param changeNum 改变的数目
         */
        static onChangeCurrency(callback) {
            return onFunc(this.name, this.onChangeCurrency.name, callback);
        }
        /**
         * （双端）消费
         * @param targetGuid 目标guid
         * @param currencyId 货币Id
         * @param price 价位
         * @returns 是否消费成功
         */
        static async buyWithCurrency(targetGuid, currencyId, price) {
            if (SystemUtil.isClient()) {
                return await ModuleService.getModule(PrefabEventModuleC).buyWithCurrency(targetGuid, currencyId, price);
            }
            else {
                return await ModuleService.getModule(PrefabEventModuleS).net_BuyWithCurrency(targetGuid, currencyId, price);
            }
        }
        /**
         * (双端)
         * @param targetGuid 目标guid
         * @param currencyId 货币id
         * @returns 货币值
         */
        static getCurrencyNum(targetGuid, currencyId) {
            return callFuncRes(this.name, this.getCurrencyNum.name, targetGuid, currencyId);
        }
    }
    PrefabEvent.PrefabEvtCurrency = PrefabEvtCurrency;
    initEvent();
})(PrefabEvent || (PrefabEvent = {}));

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get PrefabEvent () { return PrefabEvent; }
});

/**
 * 关卡管理器
 */
class LevelManager {
    constructor() {
        this.lastPointNumber = 0;
        /**复活位置 */
        this._rebornPosition = new Vector(-176.49, 574.14, 148.00);
        /**所有的检查点脚本 */
        this.checkPointMap = new Map();
    }
    static get instance() {
        if (LevelManager._instacne == null) {
            LevelManager._instacne = new LevelManager();
        }
        return LevelManager._instacne;
    }
    async init() {
        this._deathTrigger = await GameObject.asyncFindGameObjectById("2E40236E");
        this._deathTrigger.onEnter.add((other) => {
            // 当进入的物体是角色类型
            if (other instanceof Character) {
                // 让角色死亡
                this.charDeath(other);
            }
        });
        Event.addLocalListener("CheckPoint", (checkPointTrigger) => {
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone();
            this.lastPointNumber = checkPointTrigger.pointNumber;
        });
        setTimeout(() => {
            UIService.show(GameUI, this.checkPointMap.size, 0);
        }, 2000);
    }
    /**让角色死亡 */
    charDeath(char) {
        // 开启布娃娃属性
        char.ragdollEnabled = true;
        // 播放特效
        EffectService.playAtPosition("27421", char.worldTransform.position);
        // 播放音效
        SoundService.playSound("120841");
        setTimeout(() => {
            // 让角色复活
            if (char == Player.localPlayer.character) {
                let playerid = char.gameObjectId;
                PrefabEvent.PrefabEvtFight.revive(playerid);
            }
            this.charReborn(char);
        }, 3000);
        if (char == Player.localPlayer.character) {
            Event.dispatchToLocal("Death");
        }
    }
    /**让角色复活 */
    charReborn(char) {
        if (char == Player.localPlayer.character) {
            // 将角色的位置改变到复活点
            char.worldTransform.position = this._rebornPosition.clone();
        }
        // 关闭布娃娃属性
        char.ragdollEnabled = false;
    }
    jumpToPoint(pointNumber = this.lastPointNumber + 1) {
        // 实现跳转 
        let checkPoint = this.checkPointMap.get(pointNumber);
        if (checkPoint) {
            Player.localPlayer.character.worldTransform.position = checkPoint.gameObject.worldTransform.position.clone();
        }
    }
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LevelManager: LevelManager
});

let CheckPointTrigger = class CheckPointTrigger extends Script {
    constructor() {
        super(...arguments);
        this.pointNumber = 0;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        LevelManager.instance.checkPointMap.set(this.pointNumber, this);
        let trigger = this.gameObject;
        trigger.onEnter.add((other) => {
            // 进入的物体是否是角色
            if (other instanceof Character) {
                // 进入的角色 是否是 当前客户端角色
                if (other == Player.localPlayer.character) {
                    // 本地事件通信（派发）
                    Event.dispatchToLocal("CheckPoint", this);
                    // 播放特效
                    EffectService.playAtPosition("89097", this.gameObject.worldTransform.position);
                    // 播放音效
                    SoundService.playSound("38193");
                }
                if (this.pointNumber == -1) {
                    // 播放动作
                    other.loadAnimation("14509").play();
                    // 播放特效
                    EffectService.playAtPosition("142750", this.gameObject.worldTransform.position);
                    // 播放音效
                    SoundService.playSound("47425");
                    if (other == Player.localPlayer.character) {
                        Event.dispatchToLocal("Victory");
                    }
                }
            }
        });
    }
};
__decorate([
    Property({ displayName: "序号" })
], CheckPointTrigger.prototype, "pointNumber", void 0);
CheckPointTrigger = __decorate([
    Component
], CheckPointTrigger);
var CheckPointTrigger$1 = CheckPointTrigger;

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CheckPointTrigger$1
});

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

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ConveyorBeltTS$1
});

let DeathBlock = class DeathBlock extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 当角色 碰到方块 就让角色死亡
        // 获取挂载到的物体的Model
        let model = this.gameObject;
        // 给物体的onTouch事件添加逻辑
        model.onTouch.add((other) => {
            if (other instanceof Character) {
                // 让角色死亡
                LevelManager.instance.charDeath(other);
            }
        });
    }
};
DeathBlock = __decorate([
    Component
], DeathBlock);
var DeathBlock$1 = DeathBlock;

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DeathBlock$1
});

let DefaultUI = class DefaultUI extends UIScript {
    constructor() {
        super(...arguments);
        this.anim1 = null;
        /**
        * 每一帧调用
        * 通过canUpdate可以开启关闭调用
        * dt 两帧调用的时间差，毫秒
        */
        //protected onUpdate(dt :number) {
        //}
        /**
         * 设置显示时触发
         */
        //protected onShow(...params:any[]) {
        //}
        /**
         * 设置不显示时触发
         */
        //protected onHide() {
        //}
        /**
         * 当这个UI界面是可以接收事件的时候
         * 手指或则鼠标触发一次Touch时触发
         * 返回事件是否处理了
         * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
         * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
         */
        //protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 手指或则鼠标再UI界面上移动时
         */
        //protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 手指或则鼠标离开UI界面时
         */
        //protected OnTouchEnded(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
        //	return EventReply.unHandled; //EventReply.handled
        //}
        /**
         * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
         * 可以触发一次拖拽事件的开始生成
         * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
         */
        //protected onDragDetected(InGemotry :Geometry,InPointerEvent:PointerEvent):DragDropOperation {
        //	return this.newDragDrop(null);
        //}
        /**
         * 拖拽操作生成事件触发后经过这个UI时触发
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDragOver(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后在这个UI释放完成时
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDrop(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后进入这个UI时触发
         */
        //protected onDragEnter(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation) {
        //}
        /**
         * 拖拽操作生成事件触发后离开这个UI时触发
         */
        //protected onDragLeave(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
        //}
        /**
         * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
         */
        //protected onDragCancelled(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
        //}
    }
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        //找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump');
        const attackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack');
        //点击跳跃按钮,异步获取人物后执行跳跃
        jumpBtn.onPressed.add(() => {
            if (this.character) {
                this.character.jump();
            }
            else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this.character = player.character;
                    //角色执行跳跃功能
                    this.character.jump();
                });
            }
        });
        //点击攻击按钮,异步获取人物后执行攻击动作
        attackBtn.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.character = player.character;
                AssetUtil.asyncDownloadAsset("61245").then((res) => {
                    if (res) {
                        if (!this.anim1) {
                            this.anim1 = player.character.loadAnimation("61245");
                            this.anim1.slot = AnimSlot.Upper;
                        }
                        //角色执行攻击动作
                        if (this.anim1.isPlaying) {
                            return;
                        }
                        else {
                            this.anim1.play();
                        }
                    }
                });
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
DefaultUI = __decorate([
    UIBind('')
], DefaultUI);
var DefaultUI$1 = DefaultUI;

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI$1
});

let GameStart = class GameStart extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    async onStart() {
        if (SystemUtil.isClient()) {
            LevelManager.instance.init();
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
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

/**
* 模板埋点注解(仅客户端生效)
* @param reportId 模板id
* @returns
*/
function PrefabReport(reportId = null) {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            if (SystemUtil.isClient() && reportId) {
                console.log("模板", target.constructor.name, "埋点", reportId);
                mw.RoomService.reportLogInfo("ts_action_firstdo", "模板埋点", JSON.stringify({ record: "TemplatePrefab", lifetime: reportId }));
            }
            const result = method.apply(this, args);
            return result;
        };
    };
}

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PrefabReport: PrefabReport
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/MessageBox.ui
 * TIME: 2023.03.27-16.53.03
 */
let MessageBox_Generate = class MessageBox_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mTitle_txt = undefined;
        this.mContent_txt = undefined;
        this.mYes_btn = undefined;
        this.mNo_btn = undefined;
        this.mOK_btn = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        this.mYes_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mYes_btn");
        });
        this.initLanguage(this.mYes_btn);
        this.mYes_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mNo_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mNo_btn");
        });
        this.initLanguage(this.mNo_btn);
        this.mNo_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.mOK_btn.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "mOK_btn");
        });
        this.initLanguage(this.mOK_btn);
        this.mOK_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.mTitle_txt);
        this.initLanguage(this.mContent_txt);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('Canvas/BodyCanvas/mTitle_txt')
], MessageBox_Generate.prototype, "mTitle_txt", void 0);
__decorate([
    UIWidgetBind('Canvas/BodyCanvas/mContent_txt')
], MessageBox_Generate.prototype, "mContent_txt", void 0);
__decorate([
    UIWidgetBind('Canvas/BodyCanvas/mYes_btn')
], MessageBox_Generate.prototype, "mYes_btn", void 0);
__decorate([
    UIWidgetBind('Canvas/BodyCanvas/mNo_btn')
], MessageBox_Generate.prototype, "mNo_btn", void 0);
__decorate([
    UIWidgetBind('Canvas/BodyCanvas/mOK_btn')
], MessageBox_Generate.prototype, "mOK_btn", void 0);
MessageBox_Generate = __decorate([
    UIBind('UI/MessageBox.ui')
], MessageBox_Generate);
var MessageBox_Generate$1 = MessageBox_Generate;

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MessageBox_Generate$1
});

class MessageBoxUI extends MessageBox_Generate$1 {
    static get instance() {
        if (MessageBoxUI._instance == null) {
            MessageBoxUI._instance = mw.UIService.create(MessageBoxUI);
        }
        return MessageBoxUI._instance;
    }
    onStart() {
        this.mOK_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            if (this.resListener != null) {
                this.resListener();
            }
        });
        this.mYes_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            this.resListener(true);
        });
        this.mNo_btn.onClicked.add(() => {
            mw.UIService.hide(MessageBoxUI);
            this.resListener(false);
        });
        this.mOK_btn.onClicked.add(() => {
        });
        this.mNo_btn.onClicked.add(() => {
        });
        this.mYes_btn.onClicked.add(() => {
        });
    }
    /**
     * 显示消息框（单个按钮）
     * @param title 标题
     * @param content 内容
     * @param confirmListener 确认回调
     */
    static showOneBtnMessage(title, content, resListener, okStr = "确定") {
        mw.UIService.showUI(MessageBoxUI.instance, mw.UILayerTop);
        MessageBoxUI.instance.showMsg1(title, content, resListener, okStr);
    }
    okCallBack() {
        mw.UIService.hide(MessageBoxUI);
        // this.hide();
        if (this.resListener != null) {
            this.resListener();
        }
    }
    yesCallBack() {
        mw.UIService.hide(MessageBoxUI);
        this.resListener(true);
    }
    noCallBack() {
        mw.UIService.hide(MessageBoxUI);
        this.resListener(false);
    }
    /**
     * 显示消息框（两个按钮）
     * @param title 标题
     * @param content 内容
     * @param resListener 回调事件
     * @param yesStr "是"按钮str
     * @param noStr "否"按钮str
     */
    static showTwoBtnMessage(title, content, resListener, yesStr = "是", noStr = "否") {
        mw.UIService.showUI(MessageBoxUI.instance, mw.UILayerTop);
        MessageBoxUI.instance.showMsg2(title, content, resListener, yesStr, noStr);
    }
    showMsg1(title, content, resListener, okStr) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mNo_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mOK_btn.visibility = (mw.SlateVisibility.Visible);
        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mOK_btn.text = (okStr);
    }
    showMsg2(title, content, resListener, yesStr, noStr) {
        this.mYes_btn.visibility = (mw.SlateVisibility.Visible);
        this.mNo_btn.visibility = (mw.SlateVisibility.Visible);
        this.mOK_btn.visibility = (mw.SlateVisibility.Collapsed);
        this.mTitle_txt.text = (title);
        this.mContent_txt.text = (content);
        this.resListener = resListener;
        this.mYes_btn.text = (yesStr);
        this.mNo_btn.text = (noStr);
    }
}

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MessageBoxUI
});

/*

 * @Date         : 2023-03-29 14:38:35

 * @LastEditTime : 2023-03-29 14:44:18
 * @FilePath     : \commonprefab3\JavaScripts\Prefabs\IAA\IAABuffManager.ts
 * @Description  :
 */
class IAABuffManager {
    static get instance() {
        if (!this._instance) {
            this._instance = new IAABuffManager();
        }
        return this._instance;
    }
    /**
     * (C端)切换为飞行模式
     * @param keepTime 持续时间
     */
    switchToFly(keepTime) {
        let player = Player.localPlayer;
        if (this._flyHandler != undefined) {
            clearTimeout(this._flyHandler);
            this._flyHandler = undefined;
        }
        PrefabEvent.PrefabEvtPlayerStat.setPlayerStat(player.character.gameObjectId, player.character.gameObjectId, PrefabEvent.PlayerStatType.Flying);
        setTimeout(() => {
            this._flyHandler = undefined;
            PrefabEvent.PrefabEvtPlayerStat.setPlayerStat(player.character.gameObjectId, player.character.gameObjectId, PrefabEvent.PlayerStatType.Walking);
        }, keepTime * 1000);
    }
    /**
     * 增加跳跃力
     * @param addVal 增加的值
     * @param keepTime 持续时间
     */
    addJumpForce(addVal, keepTime) {
        let player = Player.localPlayer;
        player.character.maxJumpHeight += addVal;
        setTimeout(() => {
            player.character.maxJumpHeight -= addVal;
        }, keepTime * 1000);
    }
    /**
     * 增加移动速度
     * @param addVal 增加的值
     * @param keepTime 持续时间
     */
    addMoveSpd(addVal, keepTime) {
        let player = Player.localPlayer;
        player.character.maxWalkSpeed += addVal;
        setTimeout(() => {
            player.character.maxWalkSpeed -= addVal;
        }, keepTime * 1000);
    }
}

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAABuffManager: IAABuffManager
});

/*

 * @Date: 2023-09-11 09:25:01

 * @LastEditTime: 2023-09-11 13:09:03
 * @FilePath: \commonprefab\JavaScripts\Prefabs\Tools\IAAUtil.ts
 * @Description:
 */
const AdsInstance = mw.AdsService;
const isActive = AdsInstance.isActive(AdsType.Reward);
class IAAUtil {
    /**
         * 播放广告
         * @param myAdsType 广告类型
         * @param callback 回调（是否成功播放）
         * @returns
         */
    static playAds(callback) {
        if (mw.SystemUtil.isPIE) {
            callback(true);
        }
        //未激活广告
        if (!isActive) {
            return;
        }
        //准备播放广告
        AdsInstance.isReady(AdsType.Reward, async (isReady) => {
            if (isReady) {
                //准备好了广告
                AdsInstance.showAd(AdsType.Reward, async (res) => {
                    if (res) {
                        console.log("ads is reward");
                        setTimeout(() => {
                            callback(true);
                        }, 1000);
                    }
                    else {
                        console.warn("MyTypeError ads is not reward", res);
                    }
                });
            }
            else {
                //没准备好广告
                return;
            }
        });
    }
}

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAAUtil: IAAUtil
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/IAA/IAAUI.ui
 * TIME: 2023.03.27-16.53.05
 */
let IAAUI_Generate = class IAAUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.keepTimeBar = undefined;
        this.keepTimeTxt = undefined;
        this.mKeepTimeCanvas = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.keepTimeTxt);
        //文本多语言
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
};
__decorate([
    UIWidgetBind('RootCanvas/mKeepTimeCanvas/keepTimeBar')
], IAAUI_Generate.prototype, "keepTimeBar", void 0);
__decorate([
    UIWidgetBind('RootCanvas/mKeepTimeCanvas/keepTimeTxt')
], IAAUI_Generate.prototype, "keepTimeTxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/mKeepTimeCanvas')
], IAAUI_Generate.prototype, "mKeepTimeCanvas", void 0);
IAAUI_Generate = __decorate([
    UIBind('UI/Prefabs/IAA/IAAUI.ui')
], IAAUI_Generate);
var IAAUI_Generate$1 = IAAUI_Generate;

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: IAAUI_Generate$1
});

/*

 * @Date         : 2023-03-27 16:41:44

 * @LastEditTime : 2023-03-29 13:25:44
 * @FilePath     : \commonprefab3\JavaScripts\Prefabs\IAA\IAAUI.ts
 * @Description  :
 */
class IAAUI extends IAAUI_Generate$1 {
    constructor() {
        super(...arguments);
        this._maxKeepTime = 0;
        this._curKeepSec = 0;
    }
    onUpdate(dt) {
        this.showKeepTimeInfo(dt);
    }
    onShow() {
        this.canUpdate = true;
        console.log("showcanvas");
    }
    setKeepTime(maxKeepTime) {
        this._maxKeepTime = maxKeepTime;
        this._curKeepSec = 0;
    }
    onHide() {
        this.canUpdate = false;
    }
    /**
     * 更新持续时间
     * @param dt 帧时间
     */
    showKeepTimeInfo(dt) {
        this._curKeepSec += dt;
        this.keepTimeTxt.text = (((this._maxKeepTime - this._curKeepSec)).toFixed(2) + "s");
        this.keepTimeBar.currentValue = ((this._maxKeepTime - this._curKeepSec) / this._maxKeepTime);
        if (this._curKeepSec >= this._maxKeepTime) {
            this.setVisible(false);
        }
    }
}

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAAUI: IAAUI
});

var IAADeathBuff_1;
let IAADeathBuff = IAADeathBuff_1 = class IAADeathBuff extends mw.Script {
    constructor() {
        super(...arguments);
        this.tipsLan = "关卡太难？看个广告飞行10秒钟！";
        this.keepTime = 10;
        this.effectrate = 3;
        this.speedUp = false;
        this.jumpUp = false;
        this.flyEffect = true;
        this.jumpLevel = false;
        this._deathCount = 0;
    }
    onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        if (IAADeathBuff_1.isHasInstance) {
            console.log("场景中存在多个IAA死亡Buff预制体，只有一个会生效");
            return;
        }
        IAADeathBuff_1.isHasInstance = true;
        PrefabEvent.PrefabEvtFight.onRevive((target) => {
            if (target != Player.localPlayer.character.gameObjectId) {
                return;
            }
            let rate = 0.3;
            rate += this._deathCount * 0.1;
            rate = MathUtil.clamp(rate, 0, 1);
            console.log("当前的广告概率" + rate);
            let rd = Math.random();
            this._deathCount++;
            if (rd <= rate) {
                this.showDialog();
            }
        });
    }
    /**
     * 显示对话框
     */
    showDialog() {
        MessageBoxUI.showTwoBtnMessage("", this.tipsLan, (res) => {
            if (res) {
                this._deathCount = 0;
                IAAUtil.playAds((res) => {
                    if (res) {
                        this.getEffects(Player.localPlayer.character);
                    }
                });
            }
        }, "观看广告", "取消");
    }
    /**
     * 获得实际的buff
     */
    getEffects(target) {
        if (this.flyEffect) {
            IAABuffManager.instance.switchToFly(this.keepTime);
        }
        if (this.speedUp) {
            let addVal = target.maxWalkSpeed * this.effectrate;
            IAABuffManager.instance.addMoveSpd(addVal, this.keepTime);
        }
        if (this.jumpUp) {
            let addVal = target.maxJumpHeight * this.effectrate;
            IAABuffManager.instance.addJumpForce(addVal, this.keepTime);
        }
        if (this.speedUp || this.flyEffect || this.speedUp) {
            let ui = mw.UIService.getUI(IAAUI);
            mw.UIService.showUI(ui);
            ui.setKeepTime(this.keepTime);
        }
        if (this.jumpLevel) ;
    }
};
IAADeathBuff.isHasInstance = false;
__decorate([
    mw.Property({ displayName: "UI提示语" })
], IAADeathBuff.prototype, "tipsLan", void 0);
__decorate([
    mw.Property({ displayName: "持续时间", tooltip: "持续时间仅对加速、跳跃、飞行起效果" })
], IAADeathBuff.prototype, "keepTime", void 0);
__decorate([
    mw.Property({ displayName: "能力倍数", tooltip: "能力倍数仅对加速、跳跃生效" })
], IAADeathBuff.prototype, "effectrate", void 0);
__decorate([
    mw.Property({ displayName: "加速效果" })
], IAADeathBuff.prototype, "speedUp", void 0);
__decorate([
    mw.Property({ displayName: "跳跃效果" })
], IAADeathBuff.prototype, "jumpUp", void 0);
__decorate([
    mw.Property({ displayName: "飞行效果" })
], IAADeathBuff.prototype, "flyEffect", void 0);
__decorate([
    mw.Property({ displayName: "跳关效果" })
], IAADeathBuff.prototype, "jumpLevel", void 0);
__decorate([
    PrefabReport(28)
], IAADeathBuff.prototype, "onStart", null);
IAADeathBuff = IAADeathBuff_1 = __decorate([
    Component
], IAADeathBuff);
var IAADeathBuff$1 = IAADeathBuff;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: IAADeathBuff$1
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

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/CheckPoint2': foreign1,
     'JavaScripts/CheckPointTrigger': foreign2,
     'JavaScripts/ConveyorBeltTS': foreign3,
     'JavaScripts/DeathBlock': foreign4,
     'JavaScripts/DefaultUI': foreign5,
     'JavaScripts/GameStart': foreign6,
     'JavaScripts/LevelManager': foreign7,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign8,
     'JavaScripts/prefabEvent/PrefabEvent': foreign9,
     'JavaScripts/prefabEvent/PrefabEventModule': foreign10,
     'JavaScripts/prefabEvent/PrefabEvtUI': foreign11,
     'JavaScripts/prefabEvent/PrefabReport': foreign12,
     'JavaScripts/Prefabs/common/MessageBox': foreign13,
     'JavaScripts/Prefabs/IAA/IAABuffManager': foreign14,
     'JavaScripts/Prefabs/IAA/IAADeathBuff': foreign15,
     'JavaScripts/Prefabs/IAA/IAAUI': foreign16,
     'JavaScripts/Prefabs/Tools/IAAUtil': foreign17,
     'JavaScripts/UI/GameUI': foreign18,
     'JavaScripts/ui-generate/DefaultUI_generate': foreign19,
     'JavaScripts/ui-generate/GameUI_generate': foreign20,
     'JavaScripts/ui-generate/MessageBox_generate': foreign21,
     'JavaScripts/ui-generate/PrefabEvtUI_generate': foreign22,
     'JavaScripts/ui-generate/Prefabs/IAA/IAAUI_generate': foreign23,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2luZG93c05vRWRpdG9yL01XL0NvbnRlbnQvQnVpbGRUb29sL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9KYXZhU2NyaXB0cy9DaGVja1BvaW50Mi50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0dhbWVVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1VJL0dhbWVVSS50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFiRXZ0VUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdnRVSS50cyIsIi4uL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50TW9kdWxlLnRzIiwiLi4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQudHMiLCIuLi9KYXZhU2NyaXB0cy9MZXZlbE1hbmFnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9DaGVja1BvaW50VHJpZ2dlci50cyIsIi4uL0phdmFTY3JpcHRzL0NvbnZleW9yQmVsdFRTLnRzIiwiLi4vSmF2YVNjcmlwdHMvRGVhdGhCbG9jay50cyIsIi4uL0phdmFTY3JpcHRzL0RlZmF1bHRVSS50cyIsIi4uL0phdmFTY3JpcHRzL0dhbWVTdGFydC50cyIsIi4uL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYlJlcG9ydC50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL01lc3NhZ2VCb3hfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL2NvbW1vbi9NZXNzYWdlQm94LnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9JQUEvSUFBQnVmZk1hbmFnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1Rvb2xzL0lBQVV0aWwudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL0lBQS9JQUFVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQVVJLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9JQUEvSUFBRGVhdGhCdWZmLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRGVmYXVsdFVJX2dlbmVyYXRlLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2luZG93c05vRWRpdG9yL01XL0NvbnRlbnQvQnVpbGRUb29sL213LXZpcnR1YWwtZW50cnkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgZm9yZWlnbjAgZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0NoZWNrUG9pbnQyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yIGZyb20gJy4vSmF2YVNjcmlwdHMvQ2hlY2tQb2ludFRyaWdnZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMgZnJvbSAnLi9KYXZhU2NyaXB0cy9Db252ZXlvckJlbHRUUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNCBmcm9tICcuL0phdmFTY3JpcHRzL0RlYXRoQmxvY2snO1xuaW1wb3J0ICogYXMgZm9yZWlnbjUgZnJvbSAnLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjYgZnJvbSAnLi9KYXZhU2NyaXB0cy9HYW1lU3RhcnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjcgZnJvbSAnLi9KYXZhU2NyaXB0cy9MZXZlbE1hbmFnZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjggZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduOSBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50JztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMCBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50TW9kdWxlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMSBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2dFVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMiBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYlJlcG9ydCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTMgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL2NvbW1vbi9NZXNzYWdlQm94JztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQUJ1ZmZNYW5hZ2VyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQURlYXRoQnVmZic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTYgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFVSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTcgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1Rvb2xzL0lBQVV0aWwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE4IGZyb20gJy4vSmF2YVNjcmlwdHMvVUkvR2FtZVVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xOSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjAgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9HYW1lVUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIxIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWVzc2FnZUJveF9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjIgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJFdnRVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjMgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL0lBQS9JQUFVSV9nZW5lcmF0ZSc7XG5leHBvcnQgY29uc3QgTVdNb2R1bGVNYXAgPSB7IFxuICAgICAnYnVpbGQnOiBmb3JlaWduMCxcbiAgICAgJ0phdmFTY3JpcHRzL0NoZWNrUG9pbnQyJzogZm9yZWlnbjEsXG4gICAgICdKYXZhU2NyaXB0cy9DaGVja1BvaW50VHJpZ2dlcic6IGZvcmVpZ24yLFxuICAgICAnSmF2YVNjcmlwdHMvQ29udmV5b3JCZWx0VFMnOiBmb3JlaWduMyxcbiAgICAgJ0phdmFTY3JpcHRzL0RlYXRoQmxvY2snOiBmb3JlaWduNCxcbiAgICAgJ0phdmFTY3JpcHRzL0RlZmF1bHRVSSc6IGZvcmVpZ241LFxuICAgICAnSmF2YVNjcmlwdHMvR2FtZVN0YXJ0JzogZm9yZWlnbjYsXG4gICAgICdKYXZhU2NyaXB0cy9MZXZlbE1hbmFnZXInOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdmVudCc6IGZvcmVpZ245LFxuICAgICAnSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnOiBmb3JlaWduMTAsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdnRVSSc6IGZvcmVpZ24xMSxcbiAgICAgJ0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYlJlcG9ydCc6IGZvcmVpZ24xMixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvY29tbW9uL01lc3NhZ2VCb3gnOiBmb3JlaWduMTMsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFCdWZmTWFuYWdlcic6IGZvcmVpZ24xNCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQURlYXRoQnVmZic6IGZvcmVpZ24xNSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQVVJJzogZm9yZWlnbjE2LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9Ub29scy9JQUFVdGlsJzogZm9yZWlnbjE3LFxuICAgICAnSmF2YVNjcmlwdHMvVUkvR2FtZVVJJzogZm9yZWlnbjE4LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRGVmYXVsdFVJX2dlbmVyYXRlJzogZm9yZWlnbjE5LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvR2FtZVVJX2dlbmVyYXRlJzogZm9yZWlnbjIwLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWVzc2FnZUJveF9nZW5lcmF0ZSc6IGZvcmVpZ24yMSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYkV2dFVJX2dlbmVyYXRlJzogZm9yZWlnbjIyLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy9JQUEvSUFBVUlfZ2VuZXJhdGUnOiBmb3JlaWduMjMsXG59XG4iXSwibmFtZXMiOlsiR2FtZVVJX0dlbmVyYXRlIiwiUHJlZmFiRXZ0VUlfR2VuZXJhdGUiLCJNZXNzYWdlQm94X0dlbmVyYXRlIiwi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QUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLFlBQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDMUIsU0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBSztBQUNoQyxZQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixZQUFBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQUs7QUFDakMsWUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFlBQUEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdEIsZ0JBQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsYUFBQTtBQUNMLFNBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQUs7QUFDL0IsWUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFlBQUEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdEIsZ0JBQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsYUFBQTtBQUNMLFNBQUMsQ0FBQyxDQUFBO0tBQ0w7SUFFRCxRQUFRLEdBQUE7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJ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QUFBLFNBQUEsRUFBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7QUFuRGdCLFlBQVksR0FBQSxjQUFBLEdBQUEsVUFBQSxDQUFBO0lBRGhDLFNBQVM7QUFDVyxDQUFBLEVBQUEsWUFBWSxDQThGaEMsQ0FBQTtxQkE5Rm9CLFlBQVk7Ozs7Ozs7QUNmakM7Ozs7O0FBS0U7QUFLRixJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsUUFBUSxDQUFBO0FBSXZEOztBQUVFO0lBQ1EsT0FBTyxHQUFBO0tBQ2hCO0NBRUQsQ0FBQTtBQVZvQixrQkFBa0IsR0FBQSxVQUFBLENBQUE7SUFEdEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBQ0wsQ0FBQSxFQUFBLGtCQUFrQixDQVV0QyxDQUFBOzJCQVZvQixrQkFBa0I7Ozs7Ozs7QUNhM0IsTUFBQyxXQUFXLEdBQUc7QUFDM0IsS0FBSyxPQUFPLEVBQUUsUUFBUTtBQUN0QixLQUFLLHlCQUF5QixFQUFFLFFBQVE7QUFDeEMsS0FBSywrQkFBK0IsRUFBRSxRQUFRO0FBQzlDLEtBQUssNEJBQTRCLEVBQUUsUUFBUTtBQUMzQyxLQUFLLHdCQUF3QixFQUFFLFFBQVE7QUFDdkMsS0FBSyx1QkFBdUIsRUFBRSxRQUFRO0FBQ3RDLEtBQUssdUJBQXVCLEVBQUUsUUFBUTtBQUN0QyxLQUFLLDBCQUEwQixFQUFFLFFBQVE7QUFDekMsS0FBSyw4Q0FBOEMsRUFBRSxRQUFRO0FBQzdELEtBQUsscUNBQXFDLEVBQUUsUUFBUTtBQUNwRCxLQUFLLDJDQUEyQyxFQUFFLFNBQVM7QUFDM0QsS0FBSyxxQ0FBcUMsRUFBRSxTQUFTO0FBQ3JELEtBQUssc0NBQXNDLEVBQUUsU0FBUztBQUN0RCxLQUFLLHVDQUF1QyxFQUFFLFNBQVM7QUFDdkQsS0FBSyx3Q0FBd0MsRUFBRSxTQUFTO0FBQ3hELEtBQUssc0NBQXNDLEVBQUUsU0FBUztBQUN0RCxLQUFLLCtCQUErQixFQUFFLFNBQVM7QUFDL0MsS0FBSyxtQ0FBbUMsRUFBRSxTQUFTO0FBQ25ELEtBQUssdUJBQXVCLEVBQUUsU0FBUztBQUN2QyxLQUFLLDRDQUE0QyxFQUFFLFNBQVM7QUFDNUQsS0FBSyx5Q0FBeUMsRUFBRSxTQUFTO0FBQ3pELEtBQUssNkNBQTZDLEVBQUUsU0FBUztBQUM3RCxLQUFLLDhDQUE4QyxFQUFFLFNBQVM7QUFDOUQsS0FBSyxvREFBb0QsRUFBRSxTQUFTO0FBQ3BFOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
