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

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/CheckUI.ui
*/
let CheckUI_Generate = class CheckUI_Generate extends UIScript {
    get title() {
        if (!this.title_Internal && this.uiWidgetBase) {
            this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/title');
        }
        return this.title_Internal;
    }
    get content() {
        if (!this.content_Internal && this.uiWidgetBase) {
            this.content_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/content');
        }
        return this.content_Internal;
    }
    get confirm() {
        if (!this.confirm_Internal && this.uiWidgetBase) {
            this.confirm_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/confirm');
        }
        return this.confirm_Internal;
    }
    get cancel() {
        if (!this.cancel_Internal && this.uiWidgetBase) {
            this.cancel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/cancel');
        }
        return this.cancel_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
CheckUI_Generate = __decorate([
    UIBind('UI/CheckUI.ui')
], CheckUI_Generate);
var CheckUI_Generate$1 = CheckUI_Generate;

var foreign38 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: CheckUI_Generate$1
});

/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-17 16:32:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-17 16:40:22
 * @FilePath: \巴里监狱\JavaScripts\CheckUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class CheckUI extends CheckUI_Generate$1 {
    static get instance() {
        if (CheckUI._instance == null) {
            CheckUI._instance = mw.UIService.create(CheckUI);
        }
        return CheckUI._instance;
    }
    onStart() {
        this.confirm.onClicked.add(() => {
            mw.UIService.hide(CheckUI);
            this.resListener(true);
        });
        this.cancel.onClicked.add(() => {
            mw.UIService.hide(CheckUI);
            this.resListener(false);
        });
    }
    static showUI(title = '标题', content = '内容', confirm = '确认', cancel = '取消', resListener) {
        mw.UIService.showUI(CheckUI.instance, mw.UILayerTop);
        CheckUI.instance.changeUI(title, content, confirm, cancel, resListener);
    }
    changeUI(title, content, confirm, cancel, resListener) {
        this.title.text = title;
        this.content.text = content;
        this.confirm.text = confirm;
        this.cancel.text = cancel;
        this.resListener = resListener;
    }
}

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CheckUI: CheckUI
});

class IAACore {
    /**
         * 播放广告
         * @param myAdsType 广告类型
         * @param callback 回调（是否成功播放）
         * @returns
         */
    static playAds(callback) {
        if (SystemUtil.isPIE) {
            callback(true);
        }
        //未激活广告
        if (!AdsService.isActive(AdsType.Reward)) {
            return;
        }
        //准备播放广告
        AdsService.isReady(AdsType.Reward, async (isReady) => {
            if (isReady) {
                //准备好了广告
                AdsService.showAd(AdsType.Reward, async (state) => {
                    if (state) {
                        setTimeout(() => {
                            callback(true);
                        }, 1000);
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

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAACore: IAACore
});

/**音效枚举 */
var SoundType;
(function (SoundType) {
    /**BGM */
    SoundType[SoundType["BGM"] = 0] = "BGM";
    /**客户端音效 */
    SoundType[SoundType["Sound"] = 1] = "Sound";
    /**3D音效 */
    SoundType[SoundType["Sound3D"] = 2] = "Sound3D";
})(SoundType || (SoundType = {}));
class Tools {
    static getRandomInt(min, max) {
        let range = max - min + 1;
        let rand = Math.random();
        return Math.floor((min + rand * range));
    }
    static changeSecond2Minus(curtime) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let minus = Math.floor(time / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        resStr = minus.toString() + ":" + secondstr;
        return resStr;
    }
    /**转换时间格式为00:00:00 */
    static changeSecond2Minus2(curtime) {
        let resStr = "0";
        if (curtime < 0) {
            return resStr;
        }
        let time = Math.round(curtime);
        let hour = Math.floor(time / 3600);
        let minus = Math.floor((time - hour * 3600) / 60);
        let seconds = time % 60;
        let secondstr = seconds.toString();
        let minusstr = minus.toString();
        let hourstr = hour.toString();
        if (seconds < 10) {
            secondstr = "0" + seconds.toString();
        }
        if (minus < 10) {
            minusstr = "0" + minus.toString();
        }
        if (hour < 10) {
            hourstr = "0" + hour.toString();
        }
        resStr = hourstr + ":" + minusstr + ":" + secondstr;
        return resStr;
    }
    /**判断该物体是否是触发器等逻辑对象 */
    static isTrigger(obj) {
        return obj instanceof mw.Trigger;
        // let isTrigger = mw.isBoxTrigger(obj) || mw.isSphereTrigger(obj) || mw.isAmbientSound(obj) || mw.isEffectSys(obj)
        // return isTrigger;
    }
    /**
     * 设置显隐
     * @param obj MWUICanvas/MWUIImage/MWUITextblock/MWUIButton
     * @param visible UI节点显示规则
     */
    static setVisible(obj, visibility) {
        switch (visibility) {
            case Visibility.Visible:
                obj.visibility = mw.SlateVisibility.Visible;
                break;
            case Visibility.Collapsed:
                obj.visibility = mw.SlateVisibility.Collapsed;
                break;
            case Visibility.Hidden:
                obj.visibility = mw.SlateVisibility.Hidden;
                break;
            case Visibility.HitTestInvisible:
                obj.visibility = mw.SlateVisibility.HitTestInvisible;
                break;
            case Visibility.SelfHitTestInvisible:
                obj.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                break;
        }
    }
}
var Visibility;
(function (Visibility) {
    /** 可见 */
    Visibility[Visibility["Visible"] = 0] = "Visible";
    /** 隐藏 并且不占用大小 */
    Visibility[Visibility["Collapsed"] = 1] = "Collapsed";
    /** 隐藏 占用计算大小 */
    Visibility[Visibility["Hidden"] = 2] = "Hidden";
    /** 可见 自身以及子节点不可响应事件 */
    Visibility[Visibility["HitTestInvisible"] = 3] = "HitTestInvisible";
    /** 可见 自身不可响应事件 */
    Visibility[Visibility["SelfHitTestInvisible"] = 4] = "SelfHitTestInvisible";
})(Visibility || (Visibility = {}));
var ecodeType;
(function (ecodeType) {
    //布尔类型
    ecodeType["EcodeBool"] = "EcodeBool";
    //字符类型
    ecodeType["EcodeString"] = "EcodeString";
    //数字类型
    ecodeType["EcodeNumber"] = "EcodeNumber";
})(ecodeType || (ecodeType = {}));

var foreign36 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get SoundType () { return SoundType; },
    Tools: Tools,
    get Visibility () { return Visibility; },
    get ecodeType () { return ecodeType; }
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

var foreign5 = /*#__PURE__*/Object.freeze({
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

var foreign42 = /*#__PURE__*/Object.freeze({
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

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PrefabEvtUI: PrefabEvtUI
});

/**
 * MapEx(可序列化)
*/
var MapEx$1;
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
})(MapEx$1 || (MapEx$1 = {}));
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
        MapEx$1.set(this.cacheData, key, dataStr);
        this.save(true);
    }
    /**
     * 获取Value
     * @param key
     */
    getValue(key) {
        if (!MapEx$1.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx$1.get(this.cacheData, key);
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
        MapEx$1.set(this.cacheData, key, dataStr);
    }
    /**
     * 获取Value
     * @param key
     */
    getValue(key) {
        if (!MapEx$1.has(this.cacheData, key)) {
            return null;
        }
        let value = MapEx$1.get(this.cacheData, key);
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
        MapEx$1.forEach(this.airData, (k, v) => {
            MapEx$1.set(this.airData, k, new PrefabEventAirportData(v.cacheData));
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
        if (!MapEx$1.has(this.airData, targetGuid)) {
            MapEx$1.set(this.airData, targetGuid, new PrefabEventAirportData(null));
        }
        MapEx$1.get(this.airData, targetGuid).setValue(key, data);
    }
    /**
     * 获取空中数据
     * @param targetGuid
     * @param key
     * @returns
     */
    getData(targetGuid, key) {
        let res = null;
        if (!MapEx$1.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx$1.get(this.airData, targetGuid).getValue(key);
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
        if (MapEx$1.has(this.airData, player.character.gameObjectId)) {
            MapEx$1.del(this.airData, player.character.gameObjectId);
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
        if (!MapEx$1.has(this.airData, targetGuid)) {
            MapEx$1.set(this.airData, targetGuid, new PrefabEventAirportData());
        }
        MapEx$1.get(this.airData, targetGuid).setValue(key, data);
    }
    /**
     * 获取玩家空中数据
     * @param targetGuid
     * @param key
     * @returns
     */
    getData(targetGuid, key) {
        let res = null;
        if (!MapEx$1.get(this.airData, targetGuid)) {
            return res;
        }
        res = MapEx$1.get(this.airData, targetGuid).getValue(key);
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

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MapEx () { return MapEx$1; },
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

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get PrefabEvent () { return PrefabEvent; }
});

var DefaultUI_1;
let DefaultUI = DefaultUI_1 = class DefaultUI extends UIScript {
    constructor() {
        super(...arguments);
        this.anim1 = null;
        this.time = 0;
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
        this.canUpdate = true;
        //找到对应的跳跃按钮
        const jumpBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Jump');
        const attackBtn = this.uiWidgetBase.findChildByPath('RootCanvas/Button_Attack');
        const adjump = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton_1');
        const revive = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton');
        this.playtime = this.uiWidgetBase.findChildByPath('RootCanvas/StaleButton_2');
        DefaultUI_1._key[0] = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas');
        DefaultUI_1._key[1] = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas_1');
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
        adjump.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.character = player.character;
                CheckUI.showUI('跳过此关', '观看广告即可跳过此关', '确认', '取消', (res) => {
                    if (res) {
                        IAACore.playAds((res) => {
                            if (res) {
                                let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(this.character.gameObjectId);
                                console.log('stage = ', stage);
                                stage = stage + 1 > 26 ? 26 : stage + 1;
                                PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.character.gameObjectId, stage);
                            }
                        });
                    }
                });
            });
        });
        revive.onPressed.add(() => {
            Player.asyncGetLocalPlayer().then((player) => {
                this.character = player.character;
                CheckUI.showUI('脱离卡死', '点击确认回到复活点', '确认', '取消', (res) => {
                    if (res) {
                        let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(this.character.gameObjectId);
                        PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.character.gameObjectId, stage);
                    }
                });
            });
        });
    }
    static changeicon(index, isshow) {
        if (this._key[index]) {
            if (isshow) {
                this._key[index].visibility = SlateVisibility.Visible;
            }
            else {
                this._key[index].visibility = SlateVisibility.Collapsed;
            }
        }
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
        this.time += dt;
        this.playtime.text = "当前游玩时间：" + Tools.changeSecond2Minus2(this.time);
    }
};
DefaultUI._key = [];
DefaultUI = DefaultUI_1 = __decorate([
    UIBind('')
], DefaultUI);
var DefaultUI$1 = DefaultUI;

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/dakai.ui
*/
let dakai_Generate = class dakai_Generate extends UIScript {
    get mButton_anniu() {
        if (!this.mButton_anniu_Internal && this.uiWidgetBase) {
            this.mButton_anniu_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mButton_anniu');
        }
        return this.mButton_anniu_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
dakai_Generate = __decorate([
    UIBind('UI/dakai.ui')
], dakai_Generate);
var dakai_Generate$1 = dakai_Generate;

var foreign39 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: dakai_Generate$1
});

/**
 * AUTHOR: 玩味
 * TIME: 2023.11.10-13.53.37
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
let _Key = 0;
let _level = 1;
class ClickEvent extends dakai_Generate$1 {
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        //设置能否每帧触发onUpdate
        this.canUpdate = true;
        this.layer = UILayerMiddle;
        this.mButton_anniu.onPressed.add(() => {
            console.log('_level = ' + _level);
            this.updateLevel(_level);
            switch (_level) {
                case 1:
                    if (_Key != _level) {
                        const obj7 = GameObject.findGameObjectById("15832995");
                        obj7.setVisibility(false);
                        PrefabEvent.PrefabEvtNotify.notifyLocal("拾取了钥匙！");
                        _Key = _level;
                        DefaultUI$1.changeicon(0, true);
                    }
                    break;
                case 2:
                    if (_Key == 1) {
                        const obj8 = GameObject.findGameObjectById("2A48D1A5");
                        obj8.localTransform.position = new Vector(-44583.773438, -1316.780029, 2617.969971);
                        DefaultUI$1.changeicon(0, false);
                    }
                    else {
                        PrefabEvent.PrefabEvtNotify.notifyLocal("需要钥匙开门！");
                    }
                    break;
            }
        });
        setTimeout(() => {
            const keyuse = GameObject.findGameObjectById("05F3214C");
            keyuse.onEnter.add(() => {
                if (_Key == 1) {
                    const obj8 = GameObject.findGameObjectById("2A48D1A5");
                    obj8.localTransform.position = new Vector(-44583.773438, -1316.780029, 2617.969971);
                    DefaultUI$1.changeicon(0, false);
                }
                else {
                    PrefabEvent.PrefabEvtNotify.notifyLocal("需要钥匙开门！");
                }
            });
            const diearea1 = GameObject.findGameObjectById("17092570");
            diearea1.onEnter.add(() => {
                setTimeout(() => {
                    let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
                    PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(Player.localPlayer.character.gameObjectId, stage);
                    PrefabEvent.PrefabEvtNotify.notifyLocal("走错了！");
                }, 1000);
            });
            const diearea2 = GameObject.findGameObjectById("3B047158");
            diearea2.onEnter.add(() => {
                setTimeout(() => {
                    let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
                    PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(Player.localPlayer.character.gameObjectId, stage);
                    PrefabEvent.PrefabEvtNotify.notifyLocal("走错了！");
                }, 1000);
            });
            const finish = GameObject.findGameObjectById("2E8BD3D1");
            finish.onEnter.add(() => {
                PrefabEvent.PrefabEvtNotify.notifyLocal("恭喜通关！！来终点打卡展示一下自己吧！");
            });
        }, 5000);
    }
    updateLevel(level) {
        _level = level;
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
        TweenUtil.TWEEN.update();
    }
}

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ClickEvent
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        }
        else if (this.deleteDic.has(guid)) {
            console.error("使用已经删除的id", guid);
        }
        return res;
    }
    static modifyPoolSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.spawn(assetId);
        }
        return GameObjPool.spawn(assetId, type);
    }
    static modifyPoolAsyncSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.asyncSpawn(assetId);
        }
        return GameObjPool.asyncSpawn(assetId, type);
    }
    static wornSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.spawn(info);
    }
    static wornAsyncSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.asyncSpawn(info);
    }
    static spawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.spawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
    static asyncSpawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.asyncSpawn(guid, { replicates: info.replicates, transform: info.transform });
        return obj;
    }
}
SpawnManager.replicateDic = new Map([
    ["104", "Sound"],
    ["109", "SpawnLocation"],
    ["113", "Trigger"],
    ["116", "Interactor"],
    ["117", "BlockingVolume"],
    ["4301", "PointLight"],
    ["4306", "Effect"],
    ["20191", "PhysicsThruster"],
    ["20193", "NavigationVolume"],
    ["21151", "PostProcess"],
    ["108547", "ObjectLauncher"],
    ["119918", "IntegratedMover"],
    ["12683", "SwimmingVolume"],
    ["16037", "UIWidget"],
    ["16038", "WheeledVehicle4W"],
    ["20504", "PhysicsFulcrum"],
    ["20194", "NavModifierVolume"],
    ["20638", "HotWeapon"],
    ["25782", "Anchor"],
    ["67455", "PhysicsImpulse"],
    ["NPC", "Character"],
    ["31969", "Character"],
    ["124744", "Character"],
    ["28449", "Character"],
    ["BlockingArea", "BlockingVolume"],
    ["RelativeEffect", "Effect"],
    ["Thruster", "PhysicsThruster"],
    ["NavMeshVolume", "NavigationVolume"],
    ["PostProcessAdvance", "PostProcess"],
    ["ProjectileLauncher", "ObjectLauncher"],
    ["PhysicsSports", "IntegratedMover"],
]);
SpawnManager.deleteDic = new Map([
    ["110", true],
    ["8444", true],
    ["14090", true],
    ["14971", true],
    ["2695", true],
    ["30829", true],
    ["31479", true],
    ["14197", true],
]);

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

class GeneralManager {
    vscodeChange() {
        let animation;
        animation.speed = 1; // 先通过vscodeF2替换为 rate 再替换为 speed
        let obj;
        obj.gameObjectId; // 先通过vscodeF2替换为 guid 再替换为 gameObjectId
        let camera;
        camera.worldTransform; // 先通过vscodeF2替换为 transform 再替换为 worldTransform
        let model;
        model.onTouch; // 先通过vscodeF2替换为 onEnter 再替换为 onTouch
        model.onTouchEnd; // 先通过vscodeF2替换为 onLeave 再替换为 onTouchEnd 
        let effect;
        effect.maskcolor; // 先通过vscodeF2替换为 color 再替换为 maskcolor
        effect.onFinish; // 先通过vscodeF2替换为 onFinished 再替换为 onFinish
        effect.timeLength; // 先通过vscodeF2替换为 particleLength 再替换为 timeLength
        let sound;
        sound.timePosition; // 先通过vscodeF2替换为 currentProgress 再替换为 timePosition
        sound.timeLength; // 先通过vscodeF2替换为 duration 再替换为 timeLength
        sound.timeLength; // 先通过vscodeF2替换为 timelength 再替换为 timeLength
        sound.isLoop; // 先通过vscodeF2替换为 loop 再替换为 isLoop
        let transform;
        transform.position; // 先通过vscodeF2替换为 location 再替换为 position
        class module extends ModuleC {
            get localPlayer() {
                return null;
            }
            get localPlayerId() {
                return null;
            }
        }
    }
    /**异步获取自定义数据 */
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    /**在一个角色的挂点上播放特效 */
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            loopCount = undefined;
            duration = -loopCount;
        }
        return EffectService.playOnGameObject(source, target instanceof mw.Player ? target.character : target, {
            slotType: slotType,
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    /**在一个GameObject上播放特效 */
    static rpcPlayEffectOnGameObject(source, target, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target, {
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    /**在指定位置播放特效 */
    static rpcPlayEffectAtLocation(source, location, loopCount, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playAtPosition(source, location, {
            loopCount: loopCount,
            duration: duration,
            rotation: rotation,
            scale: scale,
        });
    }
    /**播放广告 */
    static modifyShowAd(adsType, callback) {
        AdsService.showAd(adsType, isSuccess => {
            if (isSuccess) {
                callback(AdsState.Success);
                callback(AdsState.Close);
                callback(AdsState.Reward);
            }
            else {
                callback(AdsState.Fail);
            }
        });
    }
    /**
     * 激活交互
     */
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        return Promise.resolve(reult);
    }
    /**
     * 退出交互
     */
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    /**描边 */
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    /**取消描边 */
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model) {
            obj.setOutline(false);
        }
    }
    /**矩形范围检测 */
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    /**废弃的矩形范围检测 */
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj)
                continue;
            if (objResults.indexOf(obj) == -1)
                objResults.push(obj);
        }
        return objResults;
    }
    static modifyGetShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, true, chara);
            dir = end.subtract(start);
            if (hits.length > 0) {
                dir = hits[0].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    static modifyProjectWorldLocationToWidgetPosition(player, worldLocation, outScreenPosition, isPlayerViewportRelative) {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
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

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PrefabReport: PrefabReport
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/MessageBox.ui
*/
let MessageBox_Generate = class MessageBox_Generate extends UIScript {
    get mTitle_txt() {
        if (!this.mTitle_txt_Internal && this.uiWidgetBase) {
            this.mTitle_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mTitle_txt');
        }
        return this.mTitle_txt_Internal;
    }
    get mContent_txt() {
        if (!this.mContent_txt_Internal && this.uiWidgetBase) {
            this.mContent_txt_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mContent_txt');
        }
        return this.mContent_txt_Internal;
    }
    get mYes_btn() {
        if (!this.mYes_btn_Internal && this.uiWidgetBase) {
            this.mYes_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mYes_btn');
        }
        return this.mYes_btn_Internal;
    }
    get mNo_btn() {
        if (!this.mNo_btn_Internal && this.uiWidgetBase) {
            this.mNo_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mNo_btn');
        }
        return this.mNo_btn_Internal;
    }
    get mOK_btn() {
        if (!this.mOK_btn_Internal && this.uiWidgetBase) {
            this.mOK_btn_Internal = this.uiWidgetBase.findChildByPath('Canvas/BodyCanvas/mOK_btn');
        }
        return this.mOK_btn_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
MessageBox_Generate = __decorate([
    UIBind('UI/MessageBox.ui')
], MessageBox_Generate);
var MessageBox_Generate$1 = MessageBox_Generate;

var foreign41 = /*#__PURE__*/Object.freeze({
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

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MessageBoxUI
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

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAAUtil: IAAUtil
});

let IAAChangeCloth = class IAAChangeCloth extends mw.Script {
    constructor() {
        super(...arguments);
        this.tipsLan = "观看广告即可换装！";
        this.isShowNpc = true;
        this.role = "";
        this.frontHair = "";
        this.backHair = "";
        this.gloves = "";
        this.shoes = "";
        this.upBody = "";
        this.lowBody = "";
        this._isSync = true;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        let trigger = this.gameObject;
        trigger.onEnter.add(this.client_OnEnterTrigger.bind(this));
        this.initNpc();
    }
    /**
     * 初始化Npc
     */
    async initNpc() {
        let npc = this.gameObject.getChildByName("npc");
        await npc.asyncReady();
        if (!this.isShowNpc) {
            npc.setVisibility(PropertyStatus.Off);
            return;
        }
        npc.displayName = "";
        npc.onDescriptionChange.add(() => {
            npc.syncDescription();
            this.dressOnParts(npc);
        });
        this.dressOn(npc, false);
    }
    /**
     * 给一个V2对象换装
     * @param v2 换装对象
     * @param isSync 是否同步
     */
    dressOn(v2, isSync = true) {
        this._isSync = isSync;
        if (this.role != "") {
            v2.setDescription([this.role]);
            if (isSync) {
                v2.syncDescription();
            }
        }
        else {
            this.dressOnParts(v2);
        }
    }
    /**
     * 换装剩余部分
     * @param v2 换装对象
     * @param isSync 是否同步
     */
    dressOnParts(v2) {
        this._isSync;
        if (this.frontHair != "") {
            v2.description.advance.hair.frontHair.style = this.frontHair;
        }
        if (this.backHair != "") {
            v2.description.advance.hair.backHair.style = this.backHair;
        }
        if (this.gloves != "") {
            v2.description.advance.clothing.gloves.style = this.gloves;
        }
        if (this.shoes != "") {
            v2.description.advance.clothing.shoes.style = this.shoes;
        }
        if (this.upBody != "") {
            v2.description.advance.clothing.upperCloth.style = this.upBody;
        }
        if (this.lowBody != "") {
            v2.description.advance.clothing.lowerCloth.style = this.lowBody;
        }
    }
    /**
     * 家你听角色进入触发器
     * @param character 进入的角色
     */
    client_OnEnterTrigger(character) {
        if (!character.player) {
            return;
        }
        if (character.player.playerId == Player.localPlayer.playerId) {
            MessageBoxUI.showTwoBtnMessage("", this.tipsLan, (res) => {
                if (res) {
                    IAAUtil.playAds((res) => {
                        if (res) {
                            this.dressOn(character);
                        }
                    });
                }
            }, "观看广告", "取消");
        }
    }
};
__decorate([
    mw.Property({ displayName: "UI提示语" })
], IAAChangeCloth.prototype, "tipsLan", void 0);
__decorate([
    mw.Property({ displayName: "是否显示模特" })
], IAAChangeCloth.prototype, "isShowNpc", void 0);
__decorate([
    mw.Property({ displayName: "角色数据Id", group: "换装数据" })
], IAAChangeCloth.prototype, "role", void 0);
__decorate([
    mw.Property({ displayName: "前发", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "frontHair", void 0);
__decorate([
    mw.Property({ displayName: "后发", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "backHair", void 0);
__decorate([
    mw.Property({ displayName: "手套", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "gloves", void 0);
__decorate([
    mw.Property({ displayName: "鞋子", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "shoes", void 0);
__decorate([
    mw.Property({ displayName: "上衣", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "upBody", void 0);
__decorate([
    mw.Property({ displayName: "下衣", asset: AssetType.Cloth, group: "换装数据" })
], IAAChangeCloth.prototype, "lowBody", void 0);
__decorate([
    PrefabReport(31)
], IAAChangeCloth.prototype, "onStart", null);
IAAChangeCloth = __decorate([
    Component
], IAAChangeCloth);
var IAAChangeCloth$1 = IAAChangeCloth;

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: IAAChangeCloth$1
});

let DieArea = class DieArea extends mw.Script {
    constructor() {
        super(...arguments);
        this.damage = 100;
    }
    onStart() {
        if (mw.SystemUtil.isServer()) {
            const handle = setInterval(async () => {
                if (this.gameObject == null)
                    return;
                await this.gameObject.asyncReady();
                clearInterval(handle);
                let trigger = this.gameObject;
                trigger.onEnter.add((go) => {
                    if (PlayerManagerExtesion.isCharacter(go)) {
                        PrefabEvent.PrefabEvtFight.hurt(this.gameObject.gameObjectId, go.gameObjectId, this.damage);
                    }
                });
            }, 100);
        }
    }
};
__decorate([
    mw.Property({ displayName: "伤害值" })
], DieArea.prototype, "damage", void 0);
__decorate([
    PrefabReport(4)
], DieArea.prototype, "onStart", null);
DieArea = __decorate([
    Component
], DieArea);
var DieArea$1 = DieArea;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DieArea$1
});

class WeaponAction {
    get assetGuids() {
        return [this.shootAnimation, this.reloadAnimation, this.holdStance];
    }
}
let MaleAction = class MaleAction extends WeaponAction {
    constructor() {
        super(...arguments);
        this.shootAnimation = "80483";
        this.reloadAnimation = "80479";
        this.holdStance = "94261";
    }
};
__decorate([
    mw.Property({ displayName: "射击动画" })
], MaleAction.prototype, "shootAnimation", void 0);
__decorate([
    mw.Property({ displayName: "换弹动画" })
], MaleAction.prototype, "reloadAnimation", void 0);
__decorate([
    mw.Property({ displayName: "姿态" })
], MaleAction.prototype, "holdStance", void 0);
MaleAction = __decorate([
    Serializable
], MaleAction);
let FemaleAction = class FemaleAction extends WeaponAction {
    constructor() {
        super(...arguments);
        this.shootAnimation = "49095";
        this.reloadAnimation = "80479";
        this.holdStance = "49098";
    }
};
__decorate([
    mw.Property({ displayName: "射击动画" })
], FemaleAction.prototype, "shootAnimation", void 0);
__decorate([
    mw.Property({ displayName: "换弹动画" })
], FemaleAction.prototype, "reloadAnimation", void 0);
__decorate([
    mw.Property({ displayName: "姿态" })
], FemaleAction.prototype, "holdStance", void 0);
FemaleAction = __decorate([
    Serializable
], FemaleAction);

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get FemaleAction () { return FemaleAction; },
    get MaleAction () { return MaleAction; }
});

let WeaponCross = class WeaponCross {
    constructor() {
        this.min = 10;
        this.add = 2;
        this.max = 30;
    }
};
__decorate([
    mw.Property({ displayName: "最低扩散度" })
], WeaponCross.prototype, "min", void 0);
__decorate([
    mw.Property({ displayName: "扩散每次射击增加" })
], WeaponCross.prototype, "add", void 0);
__decorate([
    mw.Property({ displayName: "最大扩散度" })
], WeaponCross.prototype, "max", void 0);
WeaponCross = __decorate([
    Serializable
], WeaponCross);

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get WeaponCross () { return WeaponCross; }
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/射线枪/UI/RayGunUI.ui
*/
let RayGunUI_Generate = class RayGunUI_Generate extends UIScript {
    get left() {
        if (!this.left_Internal && this.uiWidgetBase) {
            this.left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/left');
        }
        return this.left_Internal;
    }
    get right() {
        if (!this.right_Internal && this.uiWidgetBase) {
            this.right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/right');
        }
        return this.right_Internal;
    }
    get point() {
        if (!this.point_Internal && this.uiWidgetBase) {
            this.point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/point');
        }
        return this.point_Internal;
    }
    get up() {
        if (!this.up_Internal && this.uiWidgetBase) {
            this.up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/up');
        }
        return this.up_Internal;
    }
    get down() {
        if (!this.down_Internal && this.uiWidgetBase) {
            this.down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/down');
        }
        return this.down_Internal;
    }
    get name() {
        if (!this.name_Internal && this.uiWidgetBase) {
            this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/name');
        }
        return this.name_Internal;
    }
    get icon() {
        if (!this.icon_Internal && this.uiWidgetBase) {
            this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/icon');
        }
        return this.icon_Internal;
    }
    get bullet() {
        if (!this.bullet_Internal && this.uiWidgetBase) {
            this.bullet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bullet');
        }
        return this.bullet_Internal;
    }
    get reload() {
        if (!this.reload_Internal && this.uiWidgetBase) {
            this.reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/reload');
        }
        return this.reload_Internal;
    }
    get crouch() {
        if (!this.crouch_Internal && this.uiWidgetBase) {
            this.crouch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/crouch');
        }
        return this.crouch_Internal;
    }
    get right_fire() {
        if (!this.right_fire_Internal && this.uiWidgetBase) {
            this.right_fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/right_fire');
        }
        return this.right_fire_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
RayGunUI_Generate = __decorate([
    UIBind('UI/Prefabs/射线枪/UI/RayGunUI.ui')
], RayGunUI_Generate);
var RayGunUI_Generate$1 = RayGunUI_Generate;

var foreign43 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RayGunUI_Generate$1
});

/*

 * @Date: 2023-03-15 16:40:42

 * @LastEditTime: 2023-03-15 18:48:31
 * @Description: file content
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\UI\RayGunUI.ts
 */
class RayGunUI extends RayGunUI_Generate$1 {
    constructor() {
        super(...arguments);
        //准心参数部分 上下左右
        this.upPosition = mw.Vector2.zero;
        this.downPosition = mw.Vector2.zero;
        this.leftPosition = mw.Vector2.zero;
        this.rightPosition = mw.Vector2.zero;
        this.upCurPosition = mw.Vector2.zero;
        this.downCurPosition = mw.Vector2.zero;
        this.leftCurPosition = mw.Vector2.zero;
        this.rightCurPosition = mw.Vector2.zero;
        this.ammoNumChangeFunc = this.changeAmmoNum.bind(this);
        this.crossChangeFunc = this.changeCross.bind(this);
    }
    onStart() {
        this.right_fire.onJoyStickDown.add(() => {
            console.error("right_fire onPressed");
            if (!this.curWeapon)
                return;
            this.curWeapon.startFire();
        });
        this.right_fire.onJoyStickUp.add(() => {
            console.error("right_fire onReleased");
            if (!this.curWeapon)
                return;
            this.curWeapon.stopFire();
        });
        this.reload.onClicked.add(() => {
            console.error("reload onClicked");
            if (!this.curWeapon)
                return;
            this.curWeapon.startReload();
        });
        this.crouch.onClicked.add(() => {
            console.error("crouch onClicked");
            Event.dispatchToLocal("onUnequip");
            // let player = Player.localPlayer;
            // if (player) {
            //     if (player.character.isCrouching) {
            //         player.character.crouch(false);
            //     } else {
            //         player.character.crouch(true);
            //     }
            // }
        });
    }
    onShow() {
        let camera = Camera.currentCamera;
        camera.preset = (mw.CameraPreset.TPSOverShoulderAngle);
        this.curWeapon = GunManagerC.instance.curGun;
        this.icon.imageGuid = this.curWeapon.weaponIcon;
        this.name.text = this.curWeapon.weaponName;
        this.upPosition = this.upPosition.set(this.up.position);
        this.downPosition = this.downPosition.set(this.down.position);
        this.leftPosition = this.leftPosition.set(this.left.position);
        this.rightPosition = this.rightPosition.set(this.right.position);
    }
    changeCross() {
        let value = this.curWeapon.curCross;
        this.up.position = this.upCurPosition.set(this.upPosition.x, this.upPosition.y - value);
        this.down.position = this.downCurPosition.set(this.downPosition.x, this.downPosition.y + value);
        this.left.position = this.leftCurPosition.set(this.leftPosition.x - value, this.leftPosition.y);
        this.right.position = this.rightCurPosition.set(this.rightPosition.x + value, this.rightPosition.y);
    }
    changeAmmoNum() {
        let bullet = this.curWeapon.curAmmoNum;
        let ammo = this.curWeapon.maxAmmoNum;
        this.bullet.text = `${bullet} / ${ammo}`;
    }
    onHide() {
        this.up.position = this.upCurPosition.set(this.upPosition);
        this.down.position = this.downCurPosition.set(this.downPosition);
        this.left.position = this.leftCurPosition.set(this.leftPosition);
        this.right.position = this.rightCurPosition.set(this.rightPosition);
    }
}

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RayGunUI: RayGunUI
});

/*

 * @Date         : 2023-02-15 16:19:01

 * @LastEditTime: 2023-09-11 11:45:59
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\Manager\GunManager.ts
 * @Description  :
 */
class GunManagerC {
    static get instance() {
        if (!this._instance) {
            this._instance = new GunManagerC();
        }
        return this._instance;
    }
    constructor() {
        Player.onPlayerLeave.add((player) => {
            if (this._playerId && player.playerId != this._playerId) {
                return;
            }
            this.unloadResources();
        });
        PrefabEvent.PrefabEvtEquip.onEquip((targetGuid, slot, guid) => {
            if (!this._char) {
                return;
            }
            if (targetGuid == this._char.gameObjectId && PrefabEvent.EquipSlot.Weapon == slot && this.curGun && guid != this.curGun.guid) {
                this.unloadGun();
            }
        });
        Event.addLocalListener("onUnequip", () => { this.unloadGun(); });
    }
    /**
     * 注册一个枪械到管理器
     * @param newGun 枪械
     */
    registerGun(newGun) {
        if (!this._char) {
            let player = Player.localPlayer;
            this._char = player.character;
        }
        this.unloadResources();
        let ui = mw.UIService.getUI(RayGunUI);
        if (this.curGun) {
            this.curGun.onAmmoNumChange.remove(ui.changeAmmoNum, ui);
            this.curGun.onCrossChange.remove(ui.changeCross, ui);
            this.curGun.server_reqDestroy();
            this.curGun = null;
        }
        this.curGun = newGun;
        this.curGun.onAmmoNumChange.add(ui.changeAmmoNum, ui);
        this.curGun.onCrossChange.add(ui.changeCross, ui);
        let sex = this._char.description.advance.base.characterSetting.somatotype % 2;
        let weaponAction = sex == 0 ? newGun.femaleAction : newGun.maleAction;
        PlayerManagerExtesion.changeStanceExtesion(this._char, weaponAction.holdStance);
        this._fireAnimation = PlayerManagerExtesion.loadAnimationExtesion(this._char, weaponAction.shootAnimation, true);
        this._reloadAnimation = PlayerManagerExtesion.loadAnimationExtesion(this._char, weaponAction.reloadAnimation, true);
        mw.UIService.showUI(ui);
        PrefabEvent.PrefabEvtEquip.equip(this._char.gameObjectId, PrefabEvent.EquipSlot.Weapon, this.curGun.guid);
    }
    /**
     * 播放开火动画
     */
    playFireAni() {
        this._fireAnimation?.play();
    }
    /**
     * 播放装弹动画
     */
    playReloadAni() {
        this._reloadAnimation?.play();
    }
    /**
     * 获取装弹需要的时间长度
     * @returns 装弹的时间
     */
    getReloadingTime() {
        return this._reloadAnimation.length;
    }
    /**
     * 卸载发射器和相关资源
     */
    unloadGun() {
        this.unloadResources();
        this.curGun?.server_reqDestroy();
        this.curGun = null;
        mw.UIService.hide(RayGunUI);
    }
    /**
     * 卸载自身管理的资源
     */
    unloadResources() {
        if (this._char && this.curGun) {
            PlayerManagerExtesion.changeStanceExtesion(this._char, "");
            console.log("资源卸载");
        }
        this._fireAnimation?.stop();
        this._fireAnimation = null;
        this._reloadAnimation?.stop();
        this._reloadAnimation = null;
    }
}

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GunManagerC: GunManagerC
});

/*

 * @Date         : 2023-02-15 16:52:22

 * @LastEditTime: 2023-09-11 11:46:50
 * @FilePath: \commonprefab\JavaScripts\Prefabs\射线枪\Script\Prefab\Tools\AssetsHelper.ts
 * @Description  :
 */
class AssetsHelper {
    static async checkAssets(...assets) {
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            if (!AssetUtil.assetLoaded(element)) {
                await AssetUtil.asyncDownloadAsset(element);
                AssetUtil.assetLoaded(element);
            }
        }
    }
}

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AssetsHelper: AssetsHelper
});

/** 扩散UI与方向偏移的比例 */
const CrossRate = 0.0009;
/** 最大检测距离 */
const maxCheckDistance = 10000;
class RayGunPredef extends mw.Script {
}
class RayGunClient extends RayGunPredef {
    constructor() {
        super(...arguments);
        /** 持有发射器的玩家的id */
        this.playerId = -1;
        this.weaponIcon = "101167";
        this.weaponName = "射线枪";
        this.attackDamage = 10;
        this.interval = 0.3;
        this.maxAmmoNum = 30;
        this.crossInfo = new WeaponCross();
        this.maleAction = new MaleAction();
        this.femaleAction = new FemaleAction();
        this.distance = 1000;
        this.fireSound = "";
        this.effectObjID = "";
        this.effectCharID = "";
        this.soundObjID = "";
        this.soundCharID = "";
        this.triggerGuid = "";
        /** 是否被当做了武器使用 */
        this._enable = false;
        /** 是否正在重新装弹 */
        this._isReloading = false;
        /** 是否正在开火 */
        this._isFiring = false;
        /** 当前的子弹数目 */
        this.curAmmoNum = 0;
        /** 在子弹数目改变的时候调用 */
        this.onAmmoNumChange = new Action();
        /** 在扩散度改变的时候调用 */
        this.onCrossChange = new Action();
        /**
         * 开火剩余间隔
         */
        this.curCd = 0;
    }
    onStart() {
        this.pos = this.gameObject.worldTransform.position;
        if (SystemUtil.isClient()) {
            this.initObj();
            AssetsHelper.checkAssets(...[this.effectCharID, this.effectObjID]);
            AssetsHelper.checkAssets(...this.maleAction.assetGuids);
            AssetsHelper.checkAssets(...this.femaleAction.assetGuids);
        }
    }
    /**
     * 初始化场景中已经放好的物件
     */
    async initObj() {
        if (!this.gameObject) {
            return;
        }
        this._weaponApperence = this.gameObject.getChildByName("weaponRoot");
        this._fireEffect = this._weaponApperence.getChildByName("fireEffect");
        this._enterTrigger = await GameObject.asyncFindGameObjectById(this.triggerGuid);
        this._enterTrigger.onEnter.add(this.onEnterTrigger.bind(this));
        this.OnBindPlayerChange();
    }
    /**
     * 在一个玩家进入了捡取触发器
     * @param character 进入的玩家
     */
    onEnterTrigger(character) {
        let locPid = Player.localPlayer.playerId;
        if (character.player && character.player.playerId == locPid) {
            this.server_equip(locPid);
        }
    }
    /**
     * 枪械绑定的玩家变化
     */
    OnBindPlayerChange() {
        let player = Player.getPlayer(this.playerId);
        if (!player) {
            return;
        }
        if (this._weaponApperence) {
            player.character.attachToSlot(this._weaponApperence, mw.HumanoidSlotType.RightHand);
            this._weaponApperence.localTransform.position = Vector.zero;
        }
    }
    /**
     * 被服务器告知装备上这个装备
     * @param player 装备的玩家
     */
    client_Equip(player) {
        GunManagerC.instance.registerGun(this);
        this._enable = true;
        this.useUpdate = true;
        this.curAmmoNum = this.maxAmmoNum;
        this.onAmmoNumChange.call();
        this.curCross = this.crossInfo.min;
        this.onCrossChange.call();
    }
    onUpdate(dt) {
        if (!this._enable) {
            return;
        }
        this.curCd -= dt;
        if (this._isReloading) {
            this.reloading();
        }
        else if (this._isFiring) {
            this.shoot();
        }
        if (!this._isFiring || this._isReloading) {
            this.curCross -= this.crossInfo.add * dt * 5;
            this.curCross = Math.max(this.curCross, this.crossInfo.min);
            this.onCrossChange.call();
        }
    }
    /**
     * 开始开火
     */
    startFire() {
        this._isFiring = true;
    }
    /**
     * 停止开火
     */
    stopFire() {
        this._isFiring = false;
    }
    /**
     * 开始重新装弹
     */
    startReload() {
        if (this._isReloading) {
            return;
        }
        this._isReloading = true;
        GunManagerC.instance.playReloadAni();
        this.curCd = GunManagerC.instance.getReloadingTime();
    }
    /** 重新装弹的过程 */
    reloading() {
        if (this.curCd > 0) {
            return;
        }
        this.curAmmoNum = this.maxAmmoNum;
        this.onAmmoNumChange.call();
        this._isReloading = false;
    }
    /**
     * 射击接口
     */
    shoot() {
        if (this.curAmmoNum <= 0) {
            this.startReload();
        }
        else if (this.curCd <= 0) {
            this.curCd = this.interval;
            this.curCross += this.crossInfo.add;
            this.curCross = Math.min(this.curCross, this.crossInfo.max);
            this.onCrossChange.call();
            this.curAmmoNum -= 1;
            this.onAmmoNumChange.call();
            GunManagerC.instance.playFireAni();
            this.client_checkEnemies();
        }
    }
    /**
     * 敌人检测
     */
    client_checkEnemies() {
        //根据视窗获取在准星范围内的点。
        let camera = Camera.currentCamera;
        let cameraShootDir = camera.worldTransform.clone().getForwardVector().clone();
        let rd = Vector2.random().multiply(CrossRate * this.curCross);
        let right = camera.worldTransform.clone().getRightVector();
        let up = camera.worldTransform.getUpVector();
        cameraShootDir.add(right.multiply(rd.x).add(up.multiply(rd.y)));
        let endLoc = cameraShootDir.multiply(maxCheckDistance).add(camera.worldTransform.clone().position);
        let shootDir = endLoc.clone().subtract(this._weaponApperence.worldTransform.position);
        let hitRes = QueryUtil.lineTrace(camera.worldTransform.clone().position, endLoc, true, false);
        hitRes = hitRes.filter(e => {
            return !(e.gameObject instanceof mw.Trigger);
        });
        if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this._weaponApperence.worldTransform.position), shootDir) > 0) {
            shootDir = hitRes[0].impactPoint.clone().subtract(this._weaponApperence.worldTransform.position);
        }
        else {
            SoundService.play3DSound(this.soundObjID, Player.localPlayer.character.worldTransform.position, 1, 1, { falloffDistance: 3000 });
            return;
        }
        let ammoDirection = shootDir.normalized;
        let end = ammoDirection.clone().multiply(this.distance).add(this._weaponApperence.worldTransform.position);
        let startLoc = this._weaponApperence.worldTransform.position.clone();
        //根据点位获取到实际的敌人
        let lineRes = QueryUtil.lineTrace(startLoc, end, true, false);
        let curCharGuid = Player.localPlayer.character.gameObjectId;
        let target;
        for (let index = 0; index < lineRes.length; index++) {
            const element = lineRes[index];
            if (element.gameObject.gameObjectId == curCharGuid || element.gameObject instanceof mw.Trigger) {
                continue;
            }
            target = element;
            break;
        }
        if (target) {
            let rot = target.impactNormal.toRotation();
            rot.y -= 90;
            let isChar = (target.gameObject instanceof mw.Pawn);
            this.server_playEffectProxy(target.gameObject.worldTransform.position, rot, isChar, Player.localPlayer.character.worldTransform.position);
            PrefabEvent.PrefabEvtFight.hit(curCharGuid, target.gameObject.gameObjectId, this.attackDamage, target.impactPoint);
        }
        else {
            SoundService.play3DSound(this.soundObjID, Player.localPlayer.character.worldTransform.position, 1, 1, { falloffDistance: 3000 });
        }
    }
    /**
     * 客户端播放特效声效
     * @param effectLoc 目标点特效位置
     * @param rot 旋转度
     * @param isChar 击中目标是否是角色
     * @param charPos 发生源，开枪者
     */
    clinet_PlayerEffcet(effectLoc, rot, isChar, charPos) {
        if (isChar) {
            GeneralManager.rpcPlayEffectAtLocation(this.effectCharID, effectLoc, 1, rot);
            SoundService.play3DSound(this.soundCharID, effectLoc, 1, 1, { falloffDistance: 3000 });
        }
        else {
            GeneralManager.rpcPlayEffectAtLocation(this.effectObjID, effectLoc, 1, rot);
            SoundService.play3DSound(this.soundObjID, effectLoc, 1, 1, { falloffDistance: 3000 });
        }
        SoundService.play3DSound(this.soundObjID, charPos, 1, 1, { falloffDistance: 3000 });
        if (this._fireEffect) {
            this._fireEffect.stop();
            this._fireEffect.play();
        }
    }
    onDestroy() {
        if (SystemUtil.isClient()) {
            this._enterTrigger?.destroy();
            this._weaponApperence?.destroy();
            this._fireEffect?.destroy();
        }
    }
}
__decorate([
    mw.Property({ hideInEditor: true, replicated: true, onChanged: "OnBindPlayerChange" })
], RayGunClient.prototype, "playerId", void 0);
__decorate([
    mw.Property({ displayName: "武器图标", group: "射线枪属性" })
], RayGunClient.prototype, "weaponIcon", void 0);
__decorate([
    mw.Property({ displayName: "武器名字", group: "射线枪属性" })
], RayGunClient.prototype, "weaponName", void 0);
__decorate([
    mw.Property({ displayName: "攻击力", group: "射线枪属性" })
], RayGunClient.prototype, "attackDamage", void 0);
__decorate([
    mw.Property({ displayName: "开火间隔", group: "射线枪属性" })
], RayGunClient.prototype, "interval", void 0);
__decorate([
    mw.Property({ displayName: "弹夹容量", group: "射线枪属性" })
], RayGunClient.prototype, "maxAmmoNum", void 0);
__decorate([
    mw.Property({ displayName: "扩散", group: "射线枪属性" })
], RayGunClient.prototype, "crossInfo", void 0);
__decorate([
    mw.Property({ displayName: "男性动作", group: "动作资源", tooltip: "男性角色操作武器的各种动作资源" })
], RayGunClient.prototype, "maleAction", void 0);
__decorate([
    mw.Property({ displayName: "女性动作", group: "动作资源", tooltip: "女性角色操作武器的各种动作资源" })
], RayGunClient.prototype, "femaleAction", void 0);
__decorate([
    mw.Property({ displayName: "攻击距离", group: "射线枪属性" })
], RayGunClient.prototype, "distance", void 0);
__decorate([
    mw.Property({ displayName: "开火音效", group: "射线枪属性" })
], RayGunClient.prototype, "fireSound", void 0);
__decorate([
    mw.Property({ displayName: "命中特效(物)", group: "射线枪属性" })
], RayGunClient.prototype, "effectObjID", void 0);
__decorate([
    mw.Property({ displayName: "命中特效(人)", group: "射线枪属性" })
], RayGunClient.prototype, "effectCharID", void 0);
__decorate([
    mw.Property({ displayName: "命中声效(物)", group: "射线枪属性" })
], RayGunClient.prototype, "soundObjID", void 0);
__decorate([
    mw.Property({ displayName: "命中声效(人)", group: "射线枪属性" })
], RayGunClient.prototype, "soundCharID", void 0);
__decorate([
    mw.Property({ displayName: "捡取触发器", group: "射线枪属性", capture: true })
], RayGunClient.prototype, "triggerGuid", void 0);
__decorate([
    RemoteFunction(mw.Client)
], RayGunClient.prototype, "client_Equip", null);
__decorate([
    RemoteFunction(mw.Client, mw.Multicast)
], RayGunClient.prototype, "clinet_PlayerEffcet", null);
class RayGunServer extends RayGunClient {
    onStart() {
        super.onStart();
        if (SystemUtil.isServer()) {
            this._leftGameListener = this.onPlayerLeftGame.bind(this);
            Player.onPlayerLeave.add(this._leftGameListener);
        }
    }
    onDestroy() {
        super.onDestroy();
        if (SystemUtil.isServer()) {
            Player.onPlayerLeave.remove(this._leftGameListener);
        }
    }
    onPlayerLeftGame(player) {
        if (player.playerId == this.playerId) {
            this.server_reqDestroy();
        }
    }
    server_equip(playerId) {
        if (this.playerId != -1) {
            return;
        }
        const player = Player.getPlayer(playerId);
        if (!player) {
            return;
        }
        this.playerId = playerId;
        if (SystemUtil.isServer()) {
            setTimeout(async () => {
                console.log('this.createGoAsync');
                // console.log(this.pos)
                await GameObject.asyncSpawn("AA054E8B48C354C4C832AEB598F4B8EE", { replicates: true }).then((obj) => {
                    obj.worldTransform.position = this.pos;
                });
            }, 5000);
        }
        this.client_Equip(player);
        //this.gameObject.destroy();
    }
    server_reqDestroy() {
        this.gameObject.destroy();
    }
    /**
     * 服务器播放特效声效
     * @param effectLoc 目标点特效位置
     * @param rot 旋转度
     * @param isChar 击中目标是否是角色
     * @param charPos 发生源，开枪者
     */
    server_playEffectProxy(effectLoc, rot, isChar, charPos) {
        this.clinet_PlayerEffcet(effectLoc, rot, isChar, charPos);
    }
}
__decorate([
    mw.Property({ hideInEditor: true })
], RayGunServer.prototype, "none", void 0);
__decorate([
    RemoteFunction(mw.Server)
], RayGunServer.prototype, "server_equip", null);
__decorate([
    RemoteFunction(mw.Server)
], RayGunServer.prototype, "server_reqDestroy", null);
__decorate([
    RemoteFunction(mw.Server)
], RayGunServer.prototype, "server_playEffectProxy", null);
let RayGun = class RayGun extends RayGunServer {
    onStart() {
        super.onStart();
    }
};
__decorate([
    PrefabReport(25)
], RayGun.prototype, "onStart", null);
RayGun = __decorate([
    Component
], RayGun);
var RayGun$1 = RayGun;

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RayGunClient: RayGunClient,
    RayGunServer: RayGunServer,
    default: RayGun$1
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

var foreign26 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MapEx () { return MapEx; }
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/排行榜系统/UI/UIRank.ui
*/
let UIRank_Generate = class UIRank_Generate extends UIScript {
    get contentCanvas() {
        if (!this.contentCanvas_Internal && this.uiWidgetBase) {
            this.contentCanvas_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas');
        }
        return this.contentCanvas_Internal;
    }
    get rankBg() {
        if (!this.rankBg_Internal && this.uiWidgetBase) {
            this.rankBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/rankBg');
        }
        return this.rankBg_Internal;
    }
    get rankText() {
        if (!this.rankText_Internal && this.uiWidgetBase) {
            this.rankText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/rankText');
        }
        return this.rankText_Internal;
    }
    get gradeText() {
        if (!this.gradeText_Internal && this.uiWidgetBase) {
            this.gradeText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/gradeText');
        }
        return this.gradeText_Internal;
    }
    get nameText() {
        if (!this.nameText_Internal && this.uiWidgetBase) {
            this.nameText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/contentCanvas/nameText');
        }
        return this.nameText_Internal;
    }
    get putBtn() {
        if (!this.putBtn_Internal && this.uiWidgetBase) {
            this.putBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/putBtn');
        }
        return this.putBtn_Internal;
    }
    get list() {
        if (!this.list_Internal && this.uiWidgetBase) {
            this.list_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/list');
        }
        return this.list_Internal;
    }
    get btnLeft() {
        if (!this.btnLeft_Internal && this.uiWidgetBase) {
            this.btnLeft_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/btnLeft');
        }
        return this.btnLeft_Internal;
    }
    get btnRight() {
        if (!this.btnRight_Internal && this.uiWidgetBase) {
            this.btnRight_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/RankList/btnRight');
        }
        return this.btnRight_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
UIRank_Generate = __decorate([
    UIBind('UI/Prefabs/排行榜系统/UI/UIRank.ui')
], UIRank_Generate);
var UIRank_Generate$1 = UIRank_Generate;

var foreign45 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIRank_Generate$1
});

/*

* @Date: 2022-03-04 15:34:30

 * @LastEditTime: 2022-12-21 15:31:41
* @Description: file content
 * @FilePath: \JavaScripts\ui\GridLayout.ts
*/
class GridLayout {
    // /**
    //  * 锚点修复
    //  */
    // private _anchor: mw.MWUIConstraintAnchors;
    /**初始化GridLayout */
    constructor(_root, cls, _isAutoWrap = true) {
        this._root = _root;
        this.cls = cls;
        this._isAutoWrap = _isAutoWrap;
        /**子节点 */
        this.nodes = [];
        /**偏移 */
        this.left = 0;
        this.top = 0;
        /** X间隔 */
        this.spacingX = 0;
        /** Y间隔 */
        this.spacingY = 0;
        const size = this._root.size;
        this._growDir = this._root.orientation;
        if (_isAutoWrap) {
            this._growDir = 1 - this._growDir;
        }
        this._growSize = this._growDir == mw.Orientation.OrientHorizontal ? size.x : size.y;
    }
    /**
     * 添加节点
     * @param node 节点
     */
    addNode(...params) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i].visible) {
                this.nodes[i].setVisible(true, ...params);
                return this.nodes[i];
            }
        }
        let node = mw.UIService.create(this.cls);
        this._root.addChild(node.uiObject);
        node.rootCanvas.size = (node.rootCanvas.size);
        this.nodes.push(node);
        node.setVisible(true, ...params);
        return node;
    }
    /**
     * 移除单个节点
     */
    removeNode(node) {
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            node.visible = false;
            this.nodes.push(...this.nodes.splice(index, 1));
        }
        this.invalidate();
    }
    /**
     * 移除所有节点
     */
    removeAllNode() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].visible = false;
        }
    }
    /**
     * 更新布局
     */
    invalidate() {
        let startX = this.left;
        let startY = this.top;
        this.nodes.forEach(element => {
            if (!element.visible) {
                element.rootCanvas.position = (mw.Vector2.zero);
                return;
            }
            let slot = element.rootCanvas;
            let slotSize = slot.size;
            if (this._growDir == mw.Orientation.OrientHorizontal) {
                if (this._isAutoWrap && startX + slotSize.x > this._growSize) {
                    startY += this.spacingY + slotSize.y;
                    startX = this.left;
                }
                slot.position = (new mw.Vector2(startX, startY));
                startX += slotSize.x + this.spacingX;
            }
            else {
                if (this._isAutoWrap && startY + slotSize.y >= this._growSize) {
                    startX += this.spacingX + slotSize.x;
                    startY = this.top;
                }
                slot.position = (new mw.Vector2(startX, startY));
                startY += slotSize.y + this.spacingY;
            }
        });
    }
}

var foreign25 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GridLayout: GridLayout
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/Prefabs/排行榜系统/UI/UIRankItem.ui
*/
let UIRankItem_Generate = class UIRankItem_Generate extends UIScript {
    get rankText() {
        if (!this.rankText_Internal && this.uiWidgetBase) {
            this.rankText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/rankText');
        }
        return this.rankText_Internal;
    }
    get gradeText() {
        if (!this.gradeText_Internal && this.uiWidgetBase) {
            this.gradeText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/gradeText');
        }
        return this.gradeText_Internal;
    }
    get nameText() {
        if (!this.nameText_Internal && this.uiWidgetBase) {
            this.nameText_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/nameText');
        }
        return this.nameText_Internal;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
UIRankItem_Generate = __decorate([
    UIBind('UI/Prefabs/排行榜系统/UI/UIRankItem.ui')
], UIRankItem_Generate);
var UIRankItem_Generate$1 = UIRankItem_Generate;

var foreign44 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIRankItem_Generate$1
});

/*
 * @Description: Description
 */
class RankUIItem extends UIRankItem_Generate$1 {
    onStart() {
    }
    onShow(info, rankNumber) {
        this.nameText.text = info.name;
        this.gradeText.text = info.score.toString();
        this.rankText.text = (rankNumber + 1).toString();
    }
}

var foreign24 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankUIItem
});

/*

 * @Date: 2023-09-11 09:25:01

 * @LastEditTime: 2023-09-11 11:36:53
 * @FilePath: \commonprefab\JavaScripts\Prefabs\排行榜系统\Script\Prefabs\Rank\RankUI.ts
 * @Description:
 */
/*
 * @Description: Description
 */
/*
 * @Description: Description
 */
/*
 * @Description: Description
 */
let RankUI$1 = class RankUI extends UIRank_Generate$1 {
    constructor() {
        super(...arguments);
        this._index = 0;
        this._maxIndex = 0;
    }
    onStart() {
        this._grid = new GridLayout(this.list, RankUIItem, false);
        this._grid.spacingY = 30;
        this._index = 0;
        this.btnRight.visibility = mw.SlateVisibility.Hidden;
        this.btnLeft.visibility = mw.SlateVisibility.Hidden;
        this.btnRight.onClicked.add(() => {
            this._index++;
            this.showByIndex();
        });
        this.btnLeft.onClicked.add(() => {
            this._index--;
            this.showByIndex();
        });
        this.putBtn.onClicked.add(() => {
            if (this.list.visible) {
                this.list.visibility = mw.SlateVisibility.Hidden;
                this.rankBg.visibility = mw.SlateVisibility.Hidden;
                this.contentCanvas.visibility = mw.SlateVisibility.Hidden;
                let size = this.putBtn.size.clone();
                this.putBtn.size = new mw.Vector2(size.x, -size.y);
                this.putBtn.position = this.putBtn.position.clone().add(new mw.Vector2(0, size.y));
                this.rankText;
            }
            else {
                this.list.visibility = mw.SlateVisibility.Visible;
                this.rankBg.visibility = mw.SlateVisibility.Visible;
                this.contentCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                let size = this.putBtn.size.clone();
                this.putBtn.size = new mw.Vector2(size.x, Math.abs(size.y));
                this.putBtn.position = this.putBtn.position.clone().add(new mw.Vector2(0, -Math.abs(size.y)));
            }
        });
    }
    UpdateData(infos) {
        this._infos = infos;
        let indexCount = 0;
        MapEx.forEach(this._infos, (k, e) => {
            indexCount++;
        });
        this._maxIndex = indexCount;
        if (this._index >= this._maxIndex) {
            this._index = this._maxIndex - 1;
        }
        if (this._index < 0)
            this._index = 0;
        this.showByIndex();
    }
    showByIndex() {
        this._grid.removeAllNode();
        let curIndex = 0;
        MapEx.forEach(this._infos, (k, e) => {
            if (curIndex == this._index) {
                this.gradeText.text = k.toString();
                e.forEach((e2, i, arrs) => {
                    this._grid.addNode(e2, i);
                });
                this._grid.invalidate();
            }
            curIndex++;
        });
        this.btnRight.visibility = mw.SlateVisibility.Visible;
        this.btnLeft.visibility = mw.SlateVisibility.Visible;
        if (this._index >= this._maxIndex - 1) {
            this.btnRight.visibility = mw.SlateVisibility.Hidden;
        }
        if (this._index == 0) {
            this.btnLeft.visibility = mw.SlateVisibility.Hidden;
        }
    }
    onShow() {
    }
    onUpdate(dt) {
    }
};

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankUI$1
});

/*
 * @Description: Description
 */
class RankSystemPreDef extends mw.Script {
}
class RankPlayerInfo {
    constructor(senderGuid, name, score) {
        this.senderGuid = senderGuid;
        this.name = name;
        this.score = score;
    }
}
class RankSystemClient extends RankSystemPreDef {
    constructor() {
        super(...arguments);
        this.showUI = true;
        this._allInfos = {};
        this._playerNames = new Map();
    }
    async onStart() {
        super.onStart();
        if (mw.SystemUtil.isClient()) {
            let ui = mw.UIService.getUI(RankUI$1);
            if (this.showUI) {
                mw.UIService.showUI(ui);
                console.log("显示UI");
            }
            let player = await Player.asyncGetLocalPlayer();
            this.initRankData(player.playerId);
            PrefabEvent.PrefabEvtRank.onOpenRank(() => {
                var rankUI = mw.UIService.getUI(RankUI$1);
                if (rankUI.visible) {
                    mw.UIService.hide(RankUI$1);
                }
                else {
                    mw.UIService.show(RankUI$1);
                }
            });
            PrefabEvent.PrefabEvtRank.onSetRankData(async (senderGuid, name, score, typeName) => {
                if (!MapEx.has(this._allInfos, typeName)) {
                    MapEx.set(this._allInfos, typeName, []);
                }
                let infos = MapEx.get(this._allInfos, typeName);
                let info = infos.find(e => {
                    return e.senderGuid == senderGuid;
                });
                if (info == null) {
                    let nikeName = name;
                    if (this._playerNames.has(senderGuid)) {
                        nikeName = this._playerNames.get(senderGuid);
                    }
                    else {
                        let go = await GameObject.asyncFindGameObjectById(senderGuid);
                        nikeName = (go.displayName != nikeName) ? go.displayName : nikeName;
                    }
                    info = new RankPlayerInfo(senderGuid, nikeName, score);
                    infos.push(info);
                }
                info.score = score;
                infos = infos.sort((a, b) => {
                    return b.score - a.score;
                });
                MapEx.set(this._allInfos, typeName, infos);
                mw.UIService.getUI(RankUI$1).UpdateData(this._allInfos);
            });
            PrefabEvent.PrefabEvtRank.onDelRankData((senderGuid) => {
                MapEx.forEach(this._allInfos, (k, e) => {
                    let res = [];
                    e.forEach((e, i, arrs) => {
                        if (e.senderGuid == senderGuid)
                            return;
                        res.push(e);
                    });
                    MapEx.set(this._allInfos, k, res);
                });
                mw.UIService.getUI(RankUI$1).UpdateData(this._allInfos);
            });
            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid, targetGuid, name, type) => {
                if (type == PrefabEvent.PlayerInfoType.Name) {
                    if (!this._playerNames.has(senderGuid)) {
                        this._playerNames.set(senderGuid, name);
                    }
                    if (!MapEx.isNull(this._allInfos)) {
                        MapEx.forEach(this._allInfos, (key, element) => {
                            element.forEach((e) => {
                                if (e.senderGuid == senderGuid) {
                                    e.name = name;
                                }
                            });
                        });
                        mw.UIService.getUI(RankUI$1).UpdateData(this._allInfos);
                    }
                }
            });
        }
    }
    syncRankPlayerInfo(player, keys, lengthes, senderGuid, name, score) {
        let infos = {};
        for (let index = 0; index < keys.length; index++) {
            let res = [];
            MapEx.set(infos, keys[index], res);
            for (let j = 0; j < lengthes[index]; j++) {
                let info = new RankPlayerInfo(senderGuid[j], name[j], score[j]);
                res.push(info);
            }
        }
        this._allInfos = infos;
        mw.UIService.getUI(RankUI$1).UpdateData(this._allInfos);
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isClient()) ;
    }
}
__decorate([
    mw.Property({ displayName: "默认打开UI", group: "排行榜配置" })
], RankSystemClient.prototype, "showUI", void 0);
__decorate([
    RemoteFunction(mw.Client)
], RankSystemClient.prototype, "syncRankPlayerInfo", null);
let RankSystemServer = class RankSystemServer extends RankSystemClient {
    initRankData(playerId) {
        let keys = [];
        let lengthes = [];
        let senderGuid = [];
        let name = [];
        let score = [];
        MapEx.forEach(this._allInfos, (k, v) => {
            keys.push(k);
            lengthes.push(v.length);
            for (let index = 0; index < v.length; index++) {
                const element = v[index];
                senderGuid.push(element.senderGuid);
                score.push(element.score);
                name.push(element.name);
            }
        });
        this.syncRankPlayerInfo(Player.getPlayer(playerId), keys, lengthes, senderGuid, name, score);
    }
    async onStart() {
        super.onStart();
        if (mw.SystemUtil.isServer()) {
            Player.onPlayerLeave.add((player) => {
                PrefabEvent.PrefabEvtRank.delRankData(player.character.gameObjectId);
            });
            PrefabEvent.PrefabEvtRank.onDelRankData((senderGuid) => {
                MapEx.forEach(this._allInfos, (k, e) => {
                    let res = [];
                    e.forEach((e, i, arrs) => {
                        if (e.senderGuid == senderGuid)
                            return;
                        res.push(e);
                    });
                    MapEx.set(this._allInfos, k, res);
                });
            });
            PrefabEvent.PrefabEvtRank.onSetRankData((senderGuid, name, score, typeName) => {
                if (!MapEx.has(this._allInfos, typeName)) {
                    MapEx.set(this._allInfos, typeName, []);
                }
                let infos = MapEx.get(this._allInfos, typeName);
                let info = infos.find(e => {
                    return e.senderGuid == senderGuid;
                });
                if (info == null) {
                    info = new RankPlayerInfo(senderGuid, name, score);
                    infos.push(info);
                }
                info.score = score;
                infos = infos.sort((a, b) => {
                    return b.score - a.score;
                });
                MapEx.set(this._allInfos, typeName, infos);
            });
            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid, targetGuid, name, type) => {
                if (type == PrefabEvent.PlayerInfoType.Name) {
                    if (!MapEx.isNull(this._allInfos)) {
                        MapEx.forEach(this._allInfos, (key, element) => {
                            element.forEach((e) => {
                                if (e.senderGuid == senderGuid) {
                                    e.name = name;
                                }
                            });
                        });
                    }
                }
            });
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isServer()) ;
    }
};
__decorate([
    RemoteFunction(mw.Server)
], RankSystemServer.prototype, "initRankData", null);
__decorate([
    PrefabReport(14)
], RankSystemServer.prototype, "onStart", null);
RankSystemServer = __decorate([
    Component
], RankSystemServer);
var RankSystemServer$1 = RankSystemServer;

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankPlayerInfo: RankPlayerInfo,
    RankSystemClient: RankSystemClient,
    RankSystemPreDef: RankSystemPreDef,
    default: RankSystemServer$1
});

var PlayerSystem;
(function (PlayerSystem) {
    PlayerSystem.instance = null;
})(PlayerSystem || (PlayerSystem = {}));
/**
 * 角色系统
 */
class PlayerSystemPreDef extends mw.Script {
}
class PlayerSystemClient extends PlayerSystemPreDef {
    constructor() {
        super(...arguments);
        this.maxStage = 1;
        this.reviveToCheckPoint = true;
        this.showHeadHpSlider = true;
        this.maxHp = 100;
        this.def = 0;
        this.attack = 0;
        this.relifeTime = 3;
        this.defaultStage = 1;
        this.speed = 1000;
        this.jump = 200;
        this.bgm = "121746";
    }
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isClient()) {
            // mw.UIService.show(UIPlayerInfo, this.maxStage);
            setTimeout(() => {
                Player.asyncGetLocalPlayer().then(player => {
                    let name = mw.AccountService.getNickName();
                    const char = player.character;
                    char.asyncReady().then(() => {
                        if (!name) {
                            name = "MWTest_" + char.player.playerId;
                        }
                        char.displayName = name;
                        this.initPlayerName(char.player.playerId, char.displayName);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.speed, PrefabEvent.AttrType.Speed);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.jump, PrefabEvent.AttrType.Jump);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.def, PrefabEvent.AttrType.Def);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.attack, PrefabEvent.AttrType.Attack);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.maxHp, PrefabEvent.AttrType.MaxHp);
                        PrefabEvent.PrefabEvtAttr.addAttrVal(char.gameObjectId, char.gameObjectId, this.maxHp, PrefabEvent.AttrType.CurHp);
                    });
                });
            }, 1000);
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isClient()) ;
    }
}
__decorate([
    mw.Property({ displayName: "最大关卡数(请配置最大关卡数)", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "maxStage", void 0);
__decorate([
    mw.Property({ displayName: "出生点/检查点复活(勾选是检查点)", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "reviveToCheckPoint", void 0);
__decorate([
    mw.Property({ displayName: "是否显示头顶血条", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "showHeadHpSlider", void 0);
__decorate([
    mw.Property({ displayName: "最大血量", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "maxHp", void 0);
__decorate([
    mw.Property({ displayName: "默认防御力", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "def", void 0);
__decorate([
    mw.Property({ displayName: "默认攻击力", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "attack", void 0);
__decorate([
    mw.Property({ displayName: "复活时间", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "relifeTime", void 0);
__decorate([
    mw.Property({ displayName: "默认关卡", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "defaultStage", void 0);
__decorate([
    Property({ displayName: "默认速度", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "speed", void 0);
__decorate([
    Property({ displayName: "默认跳跃力", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "jump", void 0);
__decorate([
    Property({ displayName: "背景音乐", group: "玩家属性配置" })
], PlayerSystemClient.prototype, "bgm", void 0);
let PlayerSystemServer = class PlayerSystemServer extends PlayerSystemClient {
    constructor() {
        super(...arguments);
        this.isLocalSave = true;
        this._cacheScript = new Map();
        this.playerNum = 0;
    }
    onStart() {
        PlayerSystem.instance = this;
        super.onStart();
        if (mw.SystemUtil.isServer()) {
            Player.onPlayerJoin.add(async (player) => {
                if (SystemUtil.isPIE && this.isLocalSave) {
                    let playerId = this.playerNum++;
                    player["getUserSystemId"] = () => {
                        return playerId + "";
                    };
                }
                let char = await player.character.asyncReady();
                let script = await mw.Script.spawnScript(PlayerComServer$1, true);
                //TODO:这里不能直接挂角色上
                //script.gameObject = this.gameObject;
                //通过guid绑定角色
                script.selfGuid = char.gameObjectId;
                this._cacheScript.set(player.playerId, script);
            });
            Player.onPlayerLeave.add((player) => {
                let playerId = player.playerId;
                if (this._cacheScript.has(playerId)) {
                    this._cacheScript.get(playerId).destroy();
                    this._cacheScript.delete(playerId);
                }
            });
            PrefabEvent.PrefabEvtRecordPoint.onBackCurrentRecordPoint(async (senderGuid) => {
                await ModuleService.ready();
                let go = await GameObject.asyncFindGameObjectById(senderGuid);
                if (!(PlayerManagerExtesion.isCharacter(go)))
                    return;
                let char = go;
                let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(char.gameObjectId); //await PrefabEvent.DBServerTool.asyncGetValue<number>(char.player.getUserSystemId(), PrefabEvent.PrefabEvtRecordPoint.name);
                if (!stage) {
                    stage = this.defaultStage;
                    //PrefabEvent.PrefabEvtRecordPoint.setRecordPoint(char.guid, char.guid, stage);
                }
                console.log("期望回到的记录点" + stage);
                PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(senderGuid, stage);
            });
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isServer()) ;
    }
    /**
     * 初始化玩家名字
     * @param playerId 玩家ID
     * @param name 名字
     */
    initPlayerName(playerId, name) {
        const char = Player.getPlayer(playerId).character;
        char.displayName = name;
        let guid = Player.getPlayer(playerId).character.gameObjectId;
        PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(guid, guid, name, PrefabEvent.PlayerInfoType.Name);
    }
};
__decorate([
    mw.Property({ displayName: "本地存储" })
], PlayerSystemServer.prototype, "isLocalSave", void 0);
__decorate([
    PrefabReport(17)
], PlayerSystemServer.prototype, "onStart", null);
__decorate([
    RemoteFunction(mw.Server)
], PlayerSystemServer.prototype, "initPlayerName", null);
PlayerSystemServer = __decorate([
    Component
], PlayerSystemServer);
var PlayerSystemServer$1 = PlayerSystemServer;

var foreign28 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get PlayerSystem () { return PlayerSystem; },
    PlayerSystemClient: PlayerSystemClient,
    PlayerSystemPreDef: PlayerSystemPreDef,
    default: PlayerSystemServer$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/玩家系统/UI/PlayerInfo.ui
 * TIME: 2023.03.27-16.53.06
 */
let PlayerInfo_Generate = class PlayerInfo_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.bagName = undefined;
        this.btnBag = undefined;
        this.recordName = undefined;
        this.btnRecord = undefined;
        this.btnJump = undefined;
        this.Jump = undefined;
        this.deathImg = undefined;
        this.labelLv = undefined;
        this.labelStage = undefined;
        this.progressStage = undefined;
        this.btnAtlas = undefined;
        this.atlas = undefined;
        this.btnRank = undefined;
        this.RankCnavas = undefined;
        this.progresssHp = undefined;
        this.hpText = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
        this.Jump.visibility = SlateVisibility.Collapsed;
        this.progressStage.visibility = SlateVisibility.Collapsed;
        this.labelLv.visibility = SlateVisibility.Collapsed;
        this.RankCnavas.visibility = SlateVisibility.Collapsed;
        this.atlas.visibility = SlateVisibility.Collapsed;
        this.btnRecord.visibility = SlateVisibility.Collapsed;
        this.btnBag.visibility = SlateVisibility.Collapsed;
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        this.btnBag.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btnBag");
        });
        this.btnBag.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btnRecord.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btnRecord");
        });
        this.btnRecord.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btnJump.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btnJump");
        });
        this.btnJump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btnAtlas.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btnAtlas");
        });
        this.btnAtlas.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        this.btnRank.onClicked.add(() => {
            Event.dispatchToLocal("PlayButtonClick", "btnRank");
        });
        this.btnRank.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
        //按钮多语言
        //文本多语言
        this.initLanguage(this.bagName);
        this.initLanguage(this.recordName);
        this.initLanguage(this.labelLv);
        this.initLanguage(this.labelStage);
        this.initLanguage(this.hpText);
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
    UIWidgetBind('RootCanvas/btnBag/bagName')
], PlayerInfo_Generate.prototype, "bagName", void 0);
__decorate([
    UIWidgetBind('RootCanvas/btnBag')
], PlayerInfo_Generate.prototype, "btnBag", void 0);
__decorate([
    UIWidgetBind('RootCanvas/btnRecord/recordName')
], PlayerInfo_Generate.prototype, "recordName", void 0);
__decorate([
    UIWidgetBind('RootCanvas/btnRecord')
], PlayerInfo_Generate.prototype, "btnRecord", void 0);
__decorate([
    UIWidgetBind('RootCanvas/JumpImage/btnJump')
], PlayerInfo_Generate.prototype, "btnJump", void 0);
__decorate([
    UIWidgetBind('RootCanvas/JumpImage')
], PlayerInfo_Generate.prototype, "Jump", void 0);
__decorate([
    UIWidgetBind('RootCanvas/deathImg')
], PlayerInfo_Generate.prototype, "deathImg", void 0);
__decorate([
    UIWidgetBind('RootCanvas/labelLv')
], PlayerInfo_Generate.prototype, "labelLv", void 0);
__decorate([
    UIWidgetBind('RootCanvas/StageInfo/labelStage')
], PlayerInfo_Generate.prototype, "labelStage", void 0);
__decorate([
    UIWidgetBind('RootCanvas/StageInfo/progressStage')
], PlayerInfo_Generate.prototype, "progressStage", void 0);
__decorate([
    UIWidgetBind('RootCanvas/atlas/btnAtlas')
], PlayerInfo_Generate.prototype, "btnAtlas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/atlas')
], PlayerInfo_Generate.prototype, "atlas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RankCnavas/btnRank')
], PlayerInfo_Generate.prototype, "btnRank", void 0);
__decorate([
    UIWidgetBind('RootCanvas/RankCnavas')
], PlayerInfo_Generate.prototype, "RankCnavas", void 0);
__decorate([
    UIWidgetBind('RootCanvas/progresssHp')
], PlayerInfo_Generate.prototype, "progresssHp", void 0);
__decorate([
    UIWidgetBind('RootCanvas/hpText')
], PlayerInfo_Generate.prototype, "hpText", void 0);
PlayerInfo_Generate = __decorate([
    UIBind('UI/Prefabs/玩家系统/UI/PlayerInfo.ui')
], PlayerInfo_Generate);
var PlayerInfo_Generate$1 = PlayerInfo_Generate;

var foreign47 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerInfo_Generate$1
});

class UIPlayerInfo extends PlayerInfo_Generate$1 {
    constructor() {
        super(...arguments);
        this._warnningHp = false;
        this._warnningCurTime = 0;
        this._warnningCount = 1;
        this._maxStage = 0;
    }
    async onStart() {
        this.canUpdate = true;
        PrefabEvent.PrefabEvtFight.onHurt(((senderGuid, targetGuid, damage) => {
            if (targetGuid == Player.localPlayer.character.gameObjectId) {
                if (PrefabEvent.PrefabEvtAttr.getAttrVal(targetGuid, PrefabEvent.AttrType.IsInvincible) == 1) {
                    return;
                }
                if (this._warnningHp) {
                    return;
                }
                this._warnningHp = true;
                this.deathImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.deathImg.renderOpacity = 0;
                this._warnningCurTime = 0;
                this._warnningCount = 1;
            }
        }).bind(this));
        PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo(async (senderGuid, targetGuid, val, type) => {
            let go = await GameObject.asyncFindGameObjectById(targetGuid);
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (go.player.playerId == Player.localPlayer.playerId) {
                    if (type == PrefabEvent.PlayerInfoType.Level) {
                        this.labelLv.text = "Lv." + val;
                    }
                }
            }
        });
        PrefabEvent.PrefabEvtRecordPoint.onSetRecordPoint(async (senderGuid, targetGuid, stage) => {
            let go = await GameObject.asyncFindGameObjectById(targetGuid);
            if (PlayerManagerExtesion.isCharacter(go)) {
                if (go.player.playerId == Player.localPlayer.playerId) {
                    this.labelStage.text = "关卡:" + (stage);
                    this.progressStage.currentValue = (stage) / this._maxStage;
                }
            }
        });
        let curPlayer = await Player.asyncGetLocalPlayer();
        this.btnJump && this.btnJump.onPressed.add(() => {
            curPlayer.character.jump();
        });
        this.btnAtlas.onClicked.add(() => {
            PrefabEvent.PrefabEvtCollection.openCollectionUI();
        });
        this.btnRank.onClicked.add(() => {
            PrefabEvent.PrefabEvtRank.openRank();
        });
        mw.InputUtil.onKeyDown(mw.Keys.SpaceBar, () => {
            curPlayer.character.jump();
        });
        await ModuleService.ready();
        let stage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(Player.localPlayer.character.gameObjectId);
        this.labelStage.text = "关卡:" + (stage);
        this.progressStage.currentValue = (stage) / this._maxStage;
    }
    /**
     * UI显示
     * @param maxStage 最大层数
     */
    onShow(maxStage) {
        this._maxStage = maxStage;
    }
    /**
     * 更新生命值
     * @param hp 当前生命值
     * @param maxhp 最大生命值
     */
    updateHp(hp, maxhp) {
        console.error("更新生命值：" + hp + " : " + maxhp);
        this._curHp = hp;
        this._maxHp = maxhp;
        this.val = this.progresssHp.currentValue;
        this.to = this._curHp / this._maxHp;
        this.hpText.text = this._curHp + "/" + this._maxHp;
        this.curProgress = this.val;
        this.rate = Math.abs(this.curProgress - this.to) * 2;
        this._handle = true;
    }
    /**
     * 设置等级
     * @param lv
     */
    setLevel(lv) {
        this.labelLv.text = "Lv." + lv;
    }
    onUpdate(dt) {
        this.warningHp(dt);
        this.hpGradient(dt);
    }
    hpGradient(dt) {
        if (!this._handle) {
            return;
        }
        if (Math.abs(this.curProgress - this.to) <= this.rate * dt) {
            this.progresssHp.currentValue = this.to;
            this._handle = false;
            return;
        }
        if (this.val < this.to) {
            this.curProgress += this.rate * dt;
        }
        else {
            this.curProgress -= this.rate * dt;
        }
        this.progresssHp.currentValue = this.curProgress;
    }
    warningHp(dt) {
        if (this._warnningHp) {
            this._warnningCurTime += dt * 3;
            if (this._warnningCurTime >= 1)
                this._warnningCurTime == 1;
            if (this._warnningCount % 2 == 0) {
                this.deathImg.renderOpacity = 1 - this._warnningCurTime;
            }
            else {
                this.deathImg.renderOpacity = this._warnningCurTime;
            }
            if (this._warnningCurTime >= 1) {
                this._warnningCount++;
                this._warnningCurTime = 0;
                if (this._warnningCount >= 5) {
                    this._warnningHp = false;
                    this.deathImg.visibility = mw.SlateVisibility.Hidden;
                    return;
                }
            }
        }
    }
}

var foreign29 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIPlayerInfo
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/玩家系统/UI/PlayerHp.ui
 * TIME: 2023.03.27-16.53.05
 */
let PlayerHp_Generate = class PlayerHp_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.hpSlider = undefined;
        this.nameTxt = undefined;
        this.levelTxt = undefined;
        this.canvas = undefined;
    }
    onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.levelTxt.visibility = SlateVisibility.Collapsed;
        this.initButtons();
    }
    initButtons() {
        //按钮添加点击
        //按钮添加点击
        //按钮多语言
        //文本多语言
        this.initLanguage(this.nameTxt);
        this.initLanguage(this.levelTxt);
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
    UIWidgetBind('RootCanvas/canvas/hpSlider')
], PlayerHp_Generate.prototype, "hpSlider", void 0);
__decorate([
    UIWidgetBind('RootCanvas/canvas/nameTxt')
], PlayerHp_Generate.prototype, "nameTxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/canvas/levelTxt')
], PlayerHp_Generate.prototype, "levelTxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/canvas')
], PlayerHp_Generate.prototype, "canvas", void 0);
PlayerHp_Generate = __decorate([
    UIBind('UI/Prefabs/玩家系统/UI/PlayerHp.ui')
], PlayerHp_Generate);
var PlayerHp_Generate$1 = PlayerHp_Generate;

var foreign46 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerHp_Generate$1
});

/*

 * @Date         : 2022-12-07 15:42:17

 * @LastEditTime: 2023-03-16 19:09:27
 * @FilePath: \commonprefab\JavaScripts\Prefabs\玩家系统\Script\Prefabs\PlayerSystem\UIPlayerSlider.ts
 * @Description  :
 */
/*
 * @Description: Description
 */
class UIPlayerHpSlider extends PlayerHp_Generate$1 {
    constructor() {
        super(...arguments);
        this._charGuid = "";
    }
    init(charGuid, maxHp, curHp, widget, level) {
        this._charGuid = charGuid;
        this._curHp = curHp;
        this._maxHp = maxHp;
        this._widget = widget;
        this._level = level;
        this.hpSlider.currentValue = this._curHp / this._maxHp;
        this.levelTxt.text = "Lv." + this._level.toString();
    }
    updateLevel(level) {
        this._level = level;
        this.levelTxt.text = "Lv." + this._level.toString();
    }
    updateHp(curHp, maxHp) {
        this._curHp = curHp;
        this._maxHp = maxHp;
        this.val = this.hpSlider.currentValue;
        this.to = this._curHp / this._maxHp;
        this.curProgress = this.val;
        this.rate = Math.abs(this.curProgress - this.to) * 2;
        this._handle = true;
    }
    onStart() {
        this.setVisible(false);
        this.canUpdate = true;
    }
    onShow() {
    }
    onUpdate(dt) {
        if (Math.abs(this.curProgress - this.to) <= this.rate * dt) {
            this.hpSlider.currentValue = this.to;
            this._widget.refresh();
            this._handle = false;
            return;
        }
        if (this.val < this.to) {
            this.curProgress += this.rate * dt;
        }
        else {
            this.curProgress -= this.rate * dt;
        }
        this.hpSlider.currentValue = this.curProgress;
        //console.error("hp : " + this.to);
        this._widget.refresh();
    }
}

var foreign30 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIPlayerHpSlider
});

class PlayerComPreDef extends mw.Script {
}
class PlayerComData extends PlayerComPreDef {
    constructor() {
        super(...arguments);
        this.selfGuid = "";
        this.relifeTime = 0;
    }
    get attack() {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.Attack);
    }
    set attack(_attack) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _attack, PrefabEvent.AttrType.Attack);
    }
    get def() {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.Def);
    }
    set def(_def) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _def, PrefabEvent.AttrType.Def);
    }
    get maxHp() {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.MaxHp);
    }
    set maxHp(_maxHp) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _maxHp, PrefabEvent.AttrType.MaxHp);
    }
    get level() {
        return PrefabEvent.PrefabEvtPlayerInfo.getPlayerInfo(this.selfGuid, PrefabEvent.PlayerInfoType.Level);
    }
    set level(_level) {
        PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(this.selfGuid, this.selfGuid, _level, PrefabEvent.PlayerInfoType.Level);
    }
    get hp() {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.CurHp);
    }
    set hp(_hp) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, _hp, PrefabEvent.AttrType.CurHp);
    }
    get isInvincible() {
        return PrefabEvent.PrefabEvtAttr.getAttrVal(this.selfGuid, PrefabEvent.AttrType.IsInvincible) != 0;
    }
    set isInvincible(value) {
        PrefabEvent.PrefabEvtAttr.setAttrVal(this.selfGuid, this.selfGuid, value ? 1 : 0, PrefabEvent.AttrType.IsInvincible);
    }
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isClient()) ;
    }
    onUpdate(dt) {
        super.onUpdate(dt);
    }
}
__decorate([
    mw.Property({ replicated: true, onChanged: "onSelfGuidChange" })
], PlayerComData.prototype, "selfGuid", void 0);
__decorate([
    mw.Property({ replicated: true })
], PlayerComData.prototype, "relifeTime", void 0);
class PlayerComClient extends PlayerComData {
    constructor() {
        super(...arguments);
        this.slotGoList = [];
    }
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isClient()) {
            PrefabEvent.PrefabEvtAttr.onChangeAttrVal((senderGuid, targetGuid, val, type) => {
                //console.log("onChangeAttrVal : " + type + " => " + val)
                if (type == PrefabEvent.AttrType.CurHp || type == PrefabEvent.AttrType.MaxHp) {
                    this.onHpChange();
                }
            });
            PrefabEvent.PrefabEvtPlayerInfo.onSetPlayerInfo((senderGuid, targetGuid, val, type) => {
                if (type == PrefabEvent.PlayerInfoType.Level) {
                    this.onLevelChange();
                }
            });
            mw.UIService.show(UIPlayerInfo);
        }
    }
    async onHpChange() {
        const player = await Player.asyncGetLocalPlayer();
        if (this.selfGuid == player.character.gameObjectId) {
            console.log("生命：" + this.hp + ":" + this.maxHp);
            mw.UIService.getUI(UIPlayerInfo).updateHp(this.hp, this.maxHp);
        }
        if (this._ui) {
            this._ui.updateHp(this.hp, this.maxHp);
        }
    }
    async onSelfGuidChange() {
        this.newHpSlider(this.selfGuid, this.hp, this.maxHp);
        const player = await Player.asyncGetLocalPlayer();
        if (this.selfGuid == player.character.gameObjectId) {
            console.log("showPlayerUI");
            // PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
            ModuleService.ready().then(() => {
                this.reqInit();
            });
            this.onHpChange();
            this.onLevelChange();
        }
        if (this._ui) {
            this._ui.updateHp(this.hp, this.maxHp);
        }
    }
    onLevelChange() {
        if (this.selfGuid == Player.localPlayer.character.gameObjectId) {
            mw.UIService.getUI(UIPlayerInfo).setLevel(this.level);
            if (this._ui) {
                this._ui.updateLevel(this.level);
            }
        }
    }
    setPlayerInfo(charGuid, level, hp, maxHp) {
        if (charGuid == Player.localPlayer.character.gameObjectId) {
            this.level = level;
            mw.UIService.getUI(UIPlayerInfo).setLevel(this.level);
            mw.UIService.getUI(UIPlayerInfo).updateHp(hp, maxHp);
        }
    }
    async newHpSlider(charGuid, hp, maxHp) {
        const intervalId = setInterval(() => {
            if (!PlayerSystem.instance) {
                return;
            }
            if (!PlayerSystem.instance.showHeadHpSlider) {
                return;
            }
            clearInterval(intervalId);
            if (this._hpSlider != null)
                return;
            const handle = setInterval(async () => {
                let char = await GameObject.asyncFindGameObjectById(charGuid);
                if (char == null)
                    return;
                clearInterval(handle);
                if (this._hpSlider)
                    return;
                this._hpSlider = await SpawnManager.asyncSpawn({ guid: "16037", replicates: false });
                if (charGuid == Player.localPlayer.character.gameObjectId) {
                    return;
                }
                this._ui = mw.UIService.create(UIPlayerHpSlider);
                this._ui.setVisible(true);
                this._ui.init(charGuid, maxHp, hp, this._hpSlider, this.level);
                this._hpSlider.setTargetUIWidget(this._ui.uiWidgetBase);
                this._hpSlider.drawSize = new mw.Vector2(405, 300);
                this._hpSlider.parent = char;
                this._hpSlider.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
                this._hpSlider.localTransform.position = (new mw.Vector(0, 0, 90));
            }, 300);
        }, 200);
    }
    onDestroy() {
        if (mw.SystemUtil.isClient()) {
            if (this._hpSlider) {
                this._hpSlider.parent = null;
                this._hpSlider.destroy();
            }
            this._ui?.destroy();
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isClient()) ;
    }
}
__decorate([
    RemoteFunction(mw.Multicast, mw.Client)
], PlayerComClient.prototype, "setPlayerInfo", null);
__decorate([
    RemoteFunction(mw.Multicast, mw.Client)
], PlayerComClient.prototype, "newHpSlider", null);
let PlayerComServer = class PlayerComServer extends PlayerComClient {
    constructor() {
        super(...arguments);
        this._onEvt = [];
        this._char = null;
    }
    async reqInit() {
        console.log("playerComServer Init Begin");
        this._char = await GameObject.asyncFindGameObjectById(this.selfGuid);
        await this._char.asyncReady();
        //设置初始属性
        this.attack = PlayerSystem.instance.attack;
        this.def = PlayerSystem.instance.def;
        this.maxHp = PlayerSystem.instance.maxHp;
        this.hp = PlayerSystem.instance.maxHp;
        this.relifeTime = PlayerSystem.instance.relifeTime;
        console.log("初始化角色 : " + this.selfGuid);
        this.newHpSlider(this.selfGuid, this.hp, this.maxHp);
        // 初始化数据
        this.init(this._char.player.userId, this.selfGuid);
        //放背景音乐
        mw.SoundService.playBGM(PlayerSystem.instance.bgm);
        this._onEvt.push(PrefabEvent.PrefabEvtFight.onHit((senderGuid, targetGuid, damage, hitPoint) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.hurt(senderGuid, damage);
        }));
        this._onEvt.push(PrefabEvent.PrefabEvtFight.onHurt((senderGuid, targetGuid, damage) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.hurt(senderGuid, damage);
        }));
        this._onEvt.push(PrefabEvent.PrefabEvtFight.onCure((senderGuid, targetGuid, cureVal) => {
            if (targetGuid != this.selfGuid) {
                return;
            }
            this.cure(senderGuid, cureVal);
        }));
        PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
    }
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isServer()) ;
    }
    async init(playerId, charGuid) {
        let level = PrefabEvent.PrefabEvtPlayerInfo.getPlayerInfo(charGuid, PrefabEvent.PlayerInfoType.Level);
        if (!level) {
            level = 1;
            PrefabEvent.PrefabEvtPlayerInfo.setPlayerInfo(charGuid, charGuid, level, PrefabEvent.PlayerInfoType.Level);
        }
        this.level = level;
        this.setPlayerInfo(charGuid, this.level, this.hp, this.maxHp);
    }
    /**
     * 伤害
     * @param senderGuid
     * @param damage
     */
    hurt(senderGuid, damage) {
        if (this.hp <= 0)
            return;
        if (this.isInvincible)
            return;
        this.hp = this.hp - damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.setDie();
        }
    }
    /**
     * 治疗
     * @param senderGuid
     * @param cureVal
     */
    cure(senderGuid, cureVal) {
        this.hp += cureVal;
        if (this.hp >= this.maxHp) {
            this.hp = this.maxHp;
        }
    }
    /**
     * 设置死亡
     * @returns
     */
    setDie() {
        if (this._char.ragdollEnabled == true)
            return;
        this._char.ragdollEnabled = true;
        PrefabEvent.PrefabEvtFight.die(this.selfGuid);
        setTimeout(() => {
            if (PlayerSystem.instance && PlayerSystem.instance.reviveToCheckPoint) {
                console.log("玩家死了");
                PrefabEvent.PrefabEvtRecordPoint.backCurrentRecordPoint(this.selfGuid);
            }
            else {
                PrefabEvent.PrefabEvtRecordPoint.backRecordPoint(this.selfGuid, 0);
            }
            setTimeout(() => {
                this.hp = this.maxHp;
                this._char.ragdollEnabled = false;
                PrefabEvent.PrefabEvtFight.revive(this._char.gameObjectId);
            }, 1000);
        }, this.relifeTime * 1000);
    }
    onDestroy() {
        super.onDestroy();
        this._onEvt.forEach(e => {
            e.disconnect();
        });
        this._onEvt = null;
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isServer()) ;
    }
};
__decorate([
    RemoteFunction(mw.Server)
], PlayerComServer.prototype, "reqInit", null);
PlayerComServer = __decorate([
    Component
], PlayerComServer);
var PlayerComServer$1 = PlayerComServer;

var foreign27 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: PlayerComServer$1
});

class StageRecordPreDef extends mw.Script {
}
class StageRecordClient extends StageRecordPreDef {
    constructor() {
        // @mw.Property({ displayName: "触发器id", group: "关卡配置" })
        // public triggerGuid: string = "";
        super(...arguments);
        this.stage = 1;
        this.forceSave = false;
        this.isSave = true;
    }
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isClient()) {
            PrefabEvent.PrefabEvtRecordPoint.onSetRecordPoint((_senderGuid, targetGuid, stage) => {
                console.error("激活关卡 :  " + stage);
                if (stage != this.stage) {
                    return;
                }
                if (Player.localPlayer.character.gameObjectId == targetGuid) {
                    if (this.isSave) {
                        PrefabEvent.PrefabEvtNotify.notifyLocal("激活关卡" + stage + ",进度已保存");
                        PrefabEvent.PrefabEvtRank.setRankData(Player.localPlayer.character.gameObjectId, Player.localPlayer.character.name, stage, "score");
                    }
                    else {
                        PrefabEvent.PrefabEvtNotify.notifyLocal("激活关卡" + stage + "");
                    }
                }
            });
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isClient()) ;
    }
}
__decorate([
    mw.Property({ displayName: "关卡(1为起始关卡)", group: "关卡信息" })
], StageRecordClient.prototype, "stage", void 0);
__decorate([
    mw.Property({ displayName: "强制存档", group: "关卡信息" })
], StageRecordClient.prototype, "forceSave", void 0);
__decorate([
    mw.Property({ displayName: "是否存档", group: "关卡信息" })
], StageRecordClient.prototype, "isSave", void 0);
__decorate([
    PrefabReport(5)
], StageRecordClient.prototype, "onStart", null);
let StageRecordServer = class StageRecordServer extends StageRecordClient {
    onStart() {
        super.onStart();
        if (mw.SystemUtil.isServer()) {
            const handle = setInterval(async () => {
                if (this.gameObject == null)
                    return;
                clearInterval(handle);
                this._trigger = this.gameObject;
                this._onEnter = (async (go) => {
                    if (PlayerManagerExtesion.isCharacter(go)) {
                        let char = go;
                        console.log("进入触发器 : " + go.gameObjectId);
                        let curStage = PrefabEvent.PrefabEvtRecordPoint.getRecordPoint(char.gameObjectId); //await PrefabEvent.DBServerTool.asyncGetValue<number>(char.player.getUserSystemId(), PrefabEvent.PrefabEvtRecordPoint.name)
                        if (curStage >= this.stage && !this.forceSave) {
                            return;
                        }
                        console.log("设置记录点");
                        PrefabEvent.PrefabEvtRecordPoint.setRecordPoint(char.gameObjectId, char.gameObjectId, this.stage, this.isSave);
                        PrefabEvent.PrefabEvtRank.setRankData(go.gameObjectId, char.displayName, this.stage, "关卡");
                    }
                }).bind(this);
                this._trigger.onLeave.add((go) => {
                    console.log("离开触发器 : " + go.gameObjectId);
                });
                this._trigger.onEnter.add(this._onEnter);
                PrefabEvent.PrefabEvtRecordPoint.onBackRecordPoint(async (senderGuid, stage) => {
                    if (this.stage == stage) {
                        let go = await GameObject.asyncFindGameObjectById(senderGuid);
                        if (PlayerManagerExtesion.isCharacter(go)) {
                            let char = go;
                            go.worldTransform.position = (this.gameObject.worldTransform.position.clone().add(mw.Vector.up.multiply(char.collisionExtent.z / 2 + 10)));
                            PrefabEvent.PrefabEvtRank.setRankData(go.gameObjectId, char.displayName, this.stage, "关卡");
                        }
                        else {
                            go.worldTransform.position = (this.gameObject.worldTransform.position.clone().add(mw.Vector.up.multiply(150)));
                        }
                    }
                });
            }, 100);
        }
    }
    onUpdate(dt) {
        super.onUpdate(dt);
        if (mw.SystemUtil.isServer()) ;
    }
};
StageRecordServer = __decorate([
    Component
], StageRecordServer);
var StageRecordServer$1 = StageRecordServer;

var foreign31 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    StageRecordClient: StageRecordClient,
    StageRecordPreDef: StageRecordPreDef,
    default: StageRecordServer$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 犯困嫌疑人
 * UI: UI/Prefabs/通知系统/UI/Notify.ui
 * TIME: 2023.03.27-16.53.06
 */
let Notify_Generate = class Notify_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.tips = undefined;
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
        this.initLanguage(this.tips);
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
    UIWidgetBind('RootCanvas/tips')
], Notify_Generate.prototype, "tips", void 0);
Notify_Generate = __decorate([
    UIBind('UI/Prefabs/通知系统/UI/Notify.ui')
], Notify_Generate);
var Notify_Generate$1 = Notify_Generate;

var foreign48 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: Notify_Generate$1
});

/*
 * @Description: Description
 */
/*
 * @Description: Description
 */
class NotifyUI extends Notify_Generate$1 {
    constructor() {
        super(...arguments);
        this._startTime = 0;
        this._start = false;
    }
    onStart() {
        this.canUpdate = true;
    }
    onShow(tips, complateCall) {
        this.tips.text = tips;
        this._complateCall = complateCall;
        this._startTime = -1;
        this.tips.position = new mw.Vector2(850, 176);
        this._start = true;
    }
    onUpdate(dt) {
        if (!this.visible || !this._start)
            return;
        if (this._startTime < 0) {
            this._startTime += dt * 1.2;
            return;
        }
        else {
            this._startTime += dt * 2;
        }
        if (this._startTime >= 1)
            this._startTime = 1;
        this.tips.position = new mw.Vector2(850, mw.MathUtil.lerp(176, -100, this._startTime));
        if (this._startTime == 1) {
            this._start = false;
            this._complateCall();
        }
    }
}

var foreign33 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NotifyUI
});

class NotifySystem extends mw.Script {
    constructor() {
        super(...arguments);
        this.tips = [];
    }
    onStart() {
        PrefabEvent.PrefabEvtNotify.onNotify((text) => {
            if (this.tips.length <= 0) {
                let ui = mw.UIService.create(NotifyUI);
                ui.setVisible(true);
                this.tips.push(ui);
            }
            let ui = this.tips.shift();
            if (ui) {
                mw.UIService.showUI(ui, mw.UILayerTop, text, () => {
                    mw.UIService.hideUI(ui);
                    this.tips.push(ui);
                });
            }
        });
    }
}
__decorate([
    PrefabReport(15)
], NotifySystem.prototype, "onStart", null);

var foreign32 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: NotifySystem
});

let SetPLayer = class SetPLayer extends Script {
    constructor() {
        super(...arguments);
        this.PlayerAttr = ["Jump", "Speed"];
        this.Value = [200, 1000];
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        let Trigger = this.gameObject;
        // 对进入触发器事件进行绑定 
        Trigger.onEnter.add((other) => {
            if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
                const Guid = Player.localPlayer.character.gameObjectId;
                if (PrefabEvent.AttrType[this.PlayerAttr[0]]) {
                    PrefabEvent.PrefabEvtAttr.setAttrVal(Guid, Guid, this.Value[0], PrefabEvent.AttrType[this.PlayerAttr[0]]);
                }
                if (PrefabEvent.AttrType[this.PlayerAttr[1]]) {
                    PrefabEvent.PrefabEvtAttr.setAttrVal(Guid, Guid, this.Value[1], PrefabEvent.AttrType[this.PlayerAttr[1]]);
                }
            }
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
__decorate([
    mw.Property({ displayName: "玩家属性" })
], SetPLayer.prototype, "PlayerAttr", void 0);
__decorate([
    mw.Property({ displayName: "数值" })
], SetPLayer.prototype, "Value", void 0);
SetPLayer = __decorate([
    Component
], SetPLayer);
var SetPLayer$1 = SetPLayer;

var foreign34 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: SetPLayer$1
});

/**
 * AUTHOR: 玩味
 * TIME: 2023.11.10-10.39.08
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */
let ShowWorldUI = class ShowWorldUI extends Script {
    constructor() {
        super(...arguments);
        this.level = 1;
        this.worldUIGID = '';
        this.worldUI = null;
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
        //protected onTouchStarted(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
        //	return mw.EventReply.unHandled; //mw.EventReply.handled
        //}
        /**
         * 手指或则鼠标再UI界面上移动时
         */
        //protected onTouchMoved(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
        //	return mw.EventReply.unHandled; //mw.EventReply.handled
        //}
        /**
         * 手指或则鼠标离开UI界面时
         */
        //protected onTouchEnded(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
        //	return mw.EventReply.unHandled; //mw.EventReply.handled
        //}
        /**
         * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
         * 可以触发一次拖拽事件的开始生成
         * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
         */
        //protected onDragDetected(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent):mw.DragDropOperation {
        //	return this.newDragDrop(null);
        //}
        /**
         * 拖拽操作生成事件触发后经过这个UI时触发
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDragOver(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后在这个UI释放完成时
         * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
         */
        //protected onDrop(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
        //	return true;
        //}
        /**
         * 拖拽操作生成事件触发后进入这个UI时触发
         */
        //protected onDragEnter(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
        //}
        /**
         * 拖拽操作生成事件触发后离开这个UI时触发
         */
        //protected onDragLeave(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
        //}
        /**
         * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
         */
        //protected onDragCancelled(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
        //}
    }
    onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        this.worldUI = GameObject.findGameObjectById(this.worldUIGID);
        // setTimeout(() => {
        // 	this.worldUI.setVisibility(mw.PropertyStatus.Off)
        // }, 3000);
        // 获取当前脚本所挂载的触发器
        let Trigger = this.gameObject;
        // 对进入触发器事件进行绑定
        Trigger.onEnter.add(this.onTriggerEnter.bind(this));
        // 对离开触发器事件进行绑定
        Trigger.onLeave.add(this.onTriggerLeave.bind(this));
        // //通过上面复制的 guid 获取触发器对象
        // const trigger1 = GameObject.findGameObjectById("2FE63CA7") as Trigger;
        // //为触发器绑定 有物体进入时 会触发的监听事件
        // trigger1.onEnter.add(this.onTriggerEnter);
        // //为触发器绑定 有物体离开时 会触发的监听事件
        // trigger1.onLeave.add(this.onTriggerLeave);
        // await this.gameObject.asyncReady();
        // clearInterval(handle);
        // let trigger = this.gameObject as mw.Trigger;
        // trigger.onEnter.add((go: mw.GameObject) => {
        // 	if (PlayerManagerExtesion.isCharacter(go)) {
        // 		PrefabEvent.PrefabEvtFight.hurt(this.gameObject.gameObjectId, go.gameObjectId, this.damage);
        // 	}
        // })
    }
    //有物体进入了触发区域,other 为进入触发区域的物体对象
    onTriggerEnter(other) {
        if (SystemUtil.isServer()) {
            return;
        }
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            this.worldUI.setVisibility(mw.PropertyStatus.On);
            Event.dispatchToLocal('levelChange', this.level);
            // switch(this.level){
            // 	case 1:
            // 		worldUI = GameObject.findGameObjectById(this.worldUIGID)
            // 		worldUI.setVisibility(mw.PropertyStatus.On)
            // 		break;
            // 	case 1:
            // 		worldUI = GameObject.findGameObjectById("308CCBD1")
            // 		worldUI.setVisibility(mw.PropertyStatus.On)
            // 		break;
            // }
            // //是的话，转成角色类型
            // const character = other as Character;
            // //修改角色名称
            // character.displayName = "进入区域";
        }
    }
    //有物体离开了触发区域
    onTriggerLeave(other) {
        if (SystemUtil.isServer()) {
            return;
        }
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            this.worldUI.setVisibility(mw.PropertyStatus.Off);
            // switch(this.level){
            // 	case 1:
            // 		const worldUI = GameObject.findGameObjectById("308CCBD1")
            // 		worldUI.setVisibility(mw.PropertyStatus.Off)
            // 		break;
            // }
        }
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
__decorate([
    mw.Property({ displayName: "触发器ID" })
], ShowWorldUI.prototype, "level", void 0);
__decorate([
    mw.Property({ displayName: "世界UI" })
], ShowWorldUI.prototype, "worldUIGID", void 0);
ShowWorldUI = __decorate([
    Component
], ShowWorldUI);
var ShowWorldUI$1 = ShowWorldUI;

var foreign35 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ShowWorldUI$1
});

let TriggerWind = class TriggerWind extends Script {
    constructor() {
        super(...arguments);
        this.isOpenWind = false;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        // 获取当前脚本所挂载的触发器
        let Trigger = this.gameObject;
        // 对进入触发器事件进行绑定
        Trigger.onEnter.add(this.onTriggerEnter.bind(this));
        // 对离开触发器事件进行绑定
        Trigger.onLeave.add(this.onTriggerLeave.bind(this));
        this.useUpdate = true;
    }
    //有物体进入了触发区域,other 为进入触发区域的物体对象
    async onTriggerEnter(other) {
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            console.log('this.isOpenWind = true');
            this.isOpenWind = true;
        }
    }
    //有物体离开了触发区域
    onTriggerLeave(other) {
        //这里判断一下进入区域的物体是不是一名角色
        if (PlayerManagerExtesion.isCharacter(other) && other.player == Player.localPlayer) {
            this.isOpenWind = false;
        }
    }
    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    onUpdate(dt) {
        if (this.isOpenWind) {
            // Player.localPlayer.character.
            // let playerworldVector2 = new Vector2(Player.localPlayer.character.movementDirection,Player.localPlayer.character.worldTransform.getForwardVector().y)
            // let playerlocalVector2 = new Vector2(Player.localPlayer.character.localTransform.getForwardVector().x,Player.localPlayer.character.localTransform.getForwardVector().y)
            // let cameraVector2 = new Vector2(Camera.currentCamera.worldTransform.getForwardVector().x,Camera.currentCamera.worldTransform.getForwardVector().y) 
            // let WindVector2 = new Vector2(-0.5,0) 
            // // let redians = Vector2.angle(cameraVector2,WindVector2.normalize())
            // // console.log("redians",redians)
            // let finalVector2 = cameraVector2.subtract(WindVector2)
            // let finalVector2 = new Vector2
            // Vector2.rotate(WindVector2,redians,finalVector2)
            // console.log("finalVector2",finalVector2.toString())
            // finalVector2 = finalVector2.multiply(0.1)
            let myCamera = Camera.currentCamera;
            let dir = new Rotation(0, 0, 180).subtract(myCamera.worldTransform.rotation);
            let finalVector2 = dir.getForce().multiply(0.2);
            // myCharacter.addMovement(dir.getForce());
            Player.localPlayer.character.addMovement(new Vector(finalVector2.x, finalVector2.y, 0));
        }
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
TriggerWind = __decorate([
    Component
], TriggerWind);
var TriggerWind$1 = TriggerWind;

var foreign37 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TriggerWind$1
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

var foreign40 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/yaoshi.ui
*/
let yaoshi_Generate = class yaoshi_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
yaoshi_Generate = __decorate([
    UIBind('UI/yaoshi.ui')
], yaoshi_Generate);
var yaoshi_Generate$1 = yaoshi_Generate;

var foreign49 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: yaoshi_Generate$1
});

/**
 * 实用拓展命名空间
 * @desc MapEx:	可以数据传输的Map类型拓展
 * @desc UIEx:	UI拓展
 * @desc TimeEx:时间拓展(await sleep)
 * @desc MathEx:数学拓展
 * @desc SoundEx:声音拓展
 * @desc TypeEx:类型拓展(包括Vector2,Vector3,Vector4,Quaternion,Color,Rect,RectOffset,Matrix4x4,Plane,Ray,Ray2D)
 */
var UtilEx;
(function (UtilEx) {
    (function (AssetEx) {
        async function asyncLoadAsset(guid) {
            if (!AssetUtil.assetLoaded(guid)) {
                await AssetUtil.asyncDownloadAsset(guid);
                if (!AssetUtil.assetLoaded(guid)) {
                    console.error("MyTypeError load asset error:", guid);
                }
            }
        }
        AssetEx.asyncLoadAsset = asyncLoadAsset;
        async function asyncLoadAssets(assets, loadPreFrame = 10, callback = null) {
            if (!assets || assets.length <= 0) {
                callback && callback(1, "");
                return;
            }
            let pro = 0; //进度值
            let arr = [];
            let count = 0;
            callback && callback(pro, assets.slice(0, loadPreFrame).toString());
            for (let i = 0; i < assets.length; i++) {
                const guid = assets[i];
                if (!AssetUtil.assetLoaded(guid)) {
                    arr.push(AssetUtil.asyncDownloadAsset(guid));
                    count++;
                }
                if (count >= loadPreFrame || i >= assets.length - 1) {
                    await Promise.all(arr);
                    arr.length = 0;
                    count = 0;
                    callback && callback(pro, (i < assets.length - 1) ? assets.slice(i + 1, i + loadPreFrame + 1).toString() : "");
                }
                pro = (i + 1) / assets.length;
            }
            assets.forEach(val => {
                if (!AssetUtil.assetLoaded(val)) {
                    console.error("MyTypeError load asset ss error:", val);
                }
            });
        }
        AssetEx.asyncLoadAssets = asyncLoadAssets;
        async function asyncLoadIcons(icons) {
            return assetIDChangeIconUrlRequest(icons);
        }
        AssetEx.asyncLoadIcons = asyncLoadIcons;
    })(UtilEx.AssetEx || (UtilEx.AssetEx = {}));
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
            return map[key] != null;
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
    })(UtilEx.MapEx || (UtilEx.MapEx = {}));
    (function (UIEx) {
        /** 浮动位置 */
        let TipsFloatPos;
        (function (TipsFloatPos) {
            TipsFloatPos[TipsFloatPos["Top"] = 0] = "Top";
            TipsFloatPos[TipsFloatPos["Bottom"] = 1] = "Bottom";
            TipsFloatPos[TipsFloatPos["Left"] = 2] = "Left";
            TipsFloatPos[TipsFloatPos["Right"] = 3] = "Right";
            /** 根据所在位置自动确认位置（超出位置后修改方向，直到最后一个方向） */
            TipsFloatPos[TipsFloatPos["Auto"] = 4] = "Auto";
        })(TipsFloatPos = UIEx.TipsFloatPos || (UIEx.TipsFloatPos = {}));
        /** 飞行UI 在一个范围内随机生成并飞行到目标位置
             * @param flyUI 飞行的UI面板
             * @param startPos 开始位置
             * @param endPos 结束位置
             * @returns 返回Tween
            */
        function flyUI(flyUI, startPos, endPos, completeCallBack = null) {
            const centerPos = Vector2.add(startPos, endPos).multiply(0.5).add(new Vector2(MathEx.rangeFloat(-300, 300), MathEx.rangeFloat(-300, 300)));
            startPos = new Vector2(MathEx.rangeFloat(-200, 200), MathEx.rangeFloat(-200, 200)).add(startPos);
            endPos = new Vector2(MathEx.rangeFloat(-10, 10), MathEx.rangeFloat(-10, 10)).add(endPos);
            const tween = new Tween({ t: 0 }).to({ t: 1 }, 1000).delay(MathEx.rangeFloat(10, 500)).onStart(() => {
                if (!flyUI.uiObject.parent)
                    flyUI.uiObject.position = (startPos);
            }).onUpdate((t) => {
                let pos = TypeEx.getBezier2d(startPos, centerPos, endPos, t.t);
                flyUI.uiObject.position = (pos);
            }).onComplete(() => {
                flyUI.uiObject.position = (new Vector2(-100, -100));
                if (completeCallBack) {
                    completeCallBack();
                }
            }).start();
            return tween;
        }
        UIEx.flyUI = flyUI;
        /** 周期性放大缩小img
              * @param img 图片
              * @param maxScale 最大大小
              * @param minScale 最小大小
              * @param changeValue 插值
              * @param intervalTime 间隔时间
              * @returns 返回句柄，不需要的时候使用CleanInterval清除(渲染大小不会还原)
             */
        function imgRenderScale(img, maxScale, minScale, changeValue, intervalTime = 100) {
            let scaleFlag = true;
            let scale = img.renderScale.x;
            const inter = setInterval(() => {
                if (scale >= maxScale)
                    scaleFlag = false;
                if (scale <= minScale)
                    scaleFlag = true;
                scale = changeValue * (scaleFlag ? 1 : -1);
                img.renderScale = (new Vector2(scale));
            }, intervalTime);
            return inter;
        }
        UIEx.imgRenderScale = imgRenderScale;
        /** 浮动提示 （根据tipsUI的画板大小来确定位置）
           * @param target 要显示浮动信息的按钮
           * @param tipsUI 浮动信息UI类(Canvas需要关闭自动大小)
           * @param posType 浮动位置
           * @param offset ui偏移
           * @param userdata 用户信息(传入tipsUI的数据)
           */
        function floatTips(ui, target, posType, offset = Vector2.zero) {
            target.onHovered.add(() => {
                ui.visible = true;
                // 画板
                const tips = ui.uiObject;
                // 面板大小
                const tipsSize = new Vector2(tips.size.x, tips.size.y);
                // 目标ui大小
                const targetSize = new Vector2(target.size.x, target.size.y);
                // 当前窗口大小 不能获取，自己加个数据
                const viewSize = getViewportSize();
                // 获取目标ui的世界坐标
                let pos = getWorldPosition(target);
                switch (posType) {
                    case TipsFloatPos.Top:
                        pos.subtract(new Vector2(0, tipsSize.y));
                        break;
                    case TipsFloatPos.Bottom:
                        pos.add(new Vector2(0, targetSize.y));
                        break;
                    case TipsFloatPos.Left:
                        pos.subtract(new Vector2(tipsSize.x, 0));
                        break;
                    case TipsFloatPos.Right:
                        pos.add(new Vector2(targetSize.x, 0));
                        break;
                    case TipsFloatPos.Auto:
                        // bottom
                        if (pos.y + targetSize.y + tipsSize.y < viewSize.y) {
                            pos.add(new Vector2(0, targetSize.y));
                            break;
                        }
                        // right
                        if (pos.x + targetSize.x + tipsSize.x < viewSize.x) {
                            pos.add(new Vector2(targetSize.x, 0));
                            break;
                        }
                        // left 
                        if (pos.x - tipsSize.x > 0) {
                            pos.subtract(new Vector2(tipsSize.x, 0));
                            break;
                        }
                        //top
                        if (pos.y - tipsSize.y > 0) {
                            pos.subtract(new Vector2(0, tipsSize.y));
                            break;
                        }
                        break;
                }
                // 添加偏移
                pos.add(offset);
                tips.position = (pos);
            });
            // 在没有覆盖的时候取消
            target.onUnhovered.add(() => {
                ui.visible = false;
            });
        }
        UIEx.floatTips = floatTips;
        const flag = "grid_visible_flag";
        class GridContainer {
            /**初始化GridLayout */
            constructor(_canvas, cls) {
                this._canvas = _canvas;
                this.cls = cls;
                /**子节点 */
                this.nodes = [];
                this.size = null;
            }
            /**
             * 添加节点
             * @param node 节点
             */
            addNode(...params) {
                for (var i = 0; i < this.nodes.length; i++) {
                    if (!this.nodes[i][flag]) {
                        this.nodes[i].uiObject.size = (this.size);
                        this.nodes[i].setVisible(true);
                        this.nodes[i][flag] = true;
                        return this.nodes[i];
                    }
                }
                let node = UIService.create(this.cls);
                if (this.size == null)
                    this.size = node.rootCanvas.size.clone().add(Vector2.zero);
                this._canvas.addChild(node.uiObject);
                node.uiObject.size = (this.size);
                node.setVisible(true);
                node[flag] = true;
                this.nodes.push(node);
                return node;
            }
            /**
             * 移除所有节点
             */
            removeAllNode() {
                for (var i = 0; i < this.nodes.length; i++) {
                    this.nodes[i].uiObject.size = (Vector2.zero);
                    this.nodes[i].setVisible(false);
                    this.nodes[i][flag] = false;
                }
            }
        }
        UIEx.GridContainer = GridContainer;
        /**
             * item UI抽象类
             */
        class AbstractUIItem extends UIScript {
        }
        UIEx.AbstractUIItem = AbstractUIItem;
        /**
    * 下拉列表菜单 Item需要继承AbstractUIItem
    */
        class DropdownList {
            constructor(_itemCls, _root, space = 0) {
                this._itemCls = _itemCls;
                this._root = _root;
                this.space = space;
                this._cache = [];
                this._items = [];
                this._addExpandEvent();
            }
            /**
             * 添加展开按钮事件
             */
            _addExpandEvent() {
                this._root.button.onClicked.add(() => {
                    this._isDropdown = !this._isDropdown;
                    this._invalidateLayout();
                });
            }
            /**
             * 获得选择项
             */
            get selectItem() {
                return this._select;
            }
            /**
             * 添加一个选项
             * @param node
             * @param index 索引
             */
            addItem(data, index = -1) {
                let itemUI = this._cache.length > 0 ? this._cache.shift() : this._itemCls.creat();
                if (!itemUI.menu) {
                    itemUI.menu = this;
                    itemUI.clickObj.touchMethod = (ButtonTouchMethod.PreciseTap);
                    itemUI.clickObj.onClicked.add(() => {
                        this._select = itemUI;
                        this._root.label.text = (data.label);
                        this._isDropdown = !this._isDropdown;
                        this._invalidateLayout();
                    });
                    this._root.panel.addChild(itemUI.uiObject);
                }
                itemUI.visible = true;
                itemUI.setData(data);
                itemUI.uiObject.autoSizeEnable = (true);
                if (!this._itemSize) {
                    this._itemSize = itemUI.uiObject.size;
                    const height = this._root.panel.size.y;
                    this._root.panel.size = (new Vector2(this._itemSize.x, height));
                }
                if (index >= 0) {
                    this._items.splice(index, 0, itemUI);
                }
                else {
                    this._items.push(itemUI);
                }
                if (this._items.length == 1) {
                    this._select = itemUI;
                    this._root.label.text = (data.label);
                }
                this._invalidateLayout();
            }
            /**
             * 删除一个选项
             * @param node
             */
            removeItem(node) {
                const index = this._items.indexOf(node);
                if (index >= 0) {
                    node.visible = false;
                    this._cache.push(...this._items.splice(index, 1));
                    this._invalidateLayout();
                }
            }
            /**
             * 删除一个指定索引
             * @param index
             */
            removeItemAt(index) {
                const node = this.getItem(index);
                if (node) {
                    this.removeItem(node);
                }
            }
            /**
             * 获取一个选项,超出范围则返回undefined
             * @param index
             */
            getItem(index) {
                if (index >= 0 && index < this._items.length)
                    return this._items[index];
            }
            /**
             * 重新对齐面板
             */
            _invalidateLayout() {
                if (this._isDropdown) {
                    let offset = 0;
                    this._root.panel.visibility = (SlateVisibility.Visible);
                    for (let i = 0; i < this._items.length; i++) {
                        this._items[i].uiObject.position = (new Vector2(0, offset));
                        offset += this._itemSize.y + this.space;
                    }
                }
                else {
                    this._root.panel.visibility = (SlateVisibility.Collapsed);
                }
            }
        }
        UIEx.DropdownList = DropdownList;
        /** 循环列表 */
        class MultiScrollerTable {
            /**
            * 循环列表构造函数
            * @param sbox       ScrollBox对象ui的引用
            * @param sr         ScrollBox下的节点的引用
            * @param prefab     ScrollBoxItem预制体
            * @param maxPerLine 每行显示的数量
            * @param leftSpace  左边界间距
            * @param topSpace   上边界间距
            * @param cellWidth  ScrollBox下子节点的宽
            * @param cellHeight ScrollBox下子节点的高
            * @param viewCount  ScrollBox的默认加载行数
            * @param spacingX   ScrollBox的行间距X
            * @param spacingY   ScrollBox的行间距Y
            */
            constructor(itemCls, sbox, sr, leftSpace = 30, topSpace = 30, cellWidth = 150, cellHeight = 150, spacingX = 40, spacingY = 20) {
                this._index = -1;
                this._itemArr = [];
                // 将未显示出来的Item存入未使用队列里面，等待需要使用的时候直接取出
                this._unUsedArray = [];
                this._maxPerLine = 3;
                // 距离左侧和上册的起始距离
                this._leftSpace = 30;
                this._topSpace = 30;
                // Item的宽高
                this._cellWidth = 500;
                this._cellHeight = 100;
                // 行间距X
                this._spacingX = 40;
                // 行间距Y
                this._spacingY = 20;
                //默认加载行数，一般比可显示行数大2~3行
                this._viewLine = 6;
                this.mInitCallback = new Action2();
                this.mItemCallback = new Action2();
                this._itemPrefab = itemCls;
                this._sBox = sbox;
                this._scrollRoot = sr;
                this._leftSpace = leftSpace;
                this._topSpace = topSpace;
                this._movement = sbox.orientation;
                this._cellWidth = cellWidth;
                this._cellHeight = cellHeight;
                this._spacingX = spacingX;
                this._spacingY = spacingY;
                this._maxPerLine = Math.floor((sr.size.x - leftSpace) / (cellWidth + spacingX));
                this._viewLine = Math.ceil((sr.size.y - topSpace) / (cellHeight + spacingY)) + 1;
                this._unUsedArray = [];
                this._sBox.onUserScrolled.add((curOffset) => {
                    this.onValueChange();
                });
            }
            /**调用InitData第一次初始化时的回调 */
            get InitCallback() {
                return this.mInitCallback;
            }
            /**每个Item刷新时的回调 */
            get ItemCallback() {
                return this.mItemCallback;
            }
            setData(val) {
                this._dataCount = val.length;
                this._dataArray = val;
                this.updateTotalWidth();
                this._index = -1;
                this.resetSBoxPos();
                if (this._itemArr != null) {
                    for (let i = this._itemArr.length; i > 0; i--) {
                        let item = this._itemArr[i - 1];
                        this._itemArr.splice(i - 1, 1);
                        this._unUsedArray.push(item);
                        item.uiObject.visibility = (SlateVisibility.Collapsed);
                    }
                    this.onValueChange();
                }
            }
            onValueChange() {
                if (this._itemArr == null || this._dataCount == 0)
                    return;
                let index = this.getPosIndex();
                if (index < 0 && this._index > 0) {
                    index = 0;
                }
                if (this._index != index && index > -1) {
                    this._index = index;
                    for (let i = this._itemArr.length; i > 0; i--) {
                        let item = this._itemArr[i - 1];
                        if (item["scorllIndex"] < index * this._maxPerLine || (item["scorllIndex"] >= (index + this._viewLine) * this._maxPerLine)) {
                            this._itemArr.splice(i - 1, 1);
                            this._unUsedArray.push(item);
                        }
                    }
                    for (let i = this._index * this._maxPerLine; i < (this._index + this._viewLine) * this._maxPerLine; i++) {
                        if (i < 0)
                            continue;
                        if (i > this._dataCount - 1)
                            continue;
                        let isOk = false;
                        for (let item of this._itemArr) {
                            if (item["scorllIndex"] == i)
                                isOk = true;
                        }
                        if (isOk)
                            continue;
                        this.createItem(i);
                    }
                }
            }
            /**
            * 根据索引号 获取当前item的位置
            * @param i   索引
            * @return 返回Pos
            */
            getPosition(i) {
                let xpos = (i % this._maxPerLine);
                let ypos = Math.floor(i / this._maxPerLine);
                switch (this._movement) {
                    case Orientation.OrientHorizontal:
                        return new Vector2((this._cellWidth + this._spacingX) * xpos + this._leftSpace, ((this._cellHeight + this._spacingY) * ypos) + this._topSpace);
                    case Orientation.OrientVertical:
                        return new Vector2((this._cellWidth + this._spacingX) * xpos + this._leftSpace, ((this._cellHeight + this._spacingY) * ypos) + this._topSpace);
                }
                return Vector2.zero;
            }
            onDestroy() {
                this._itemArr = null;
                this._unUsedArray = null;
            }
            getItemCount() {
                return this._maxPerLine * this._viewLine;
            }
            setItemIndex(item, index) {
                item["scorllIndex"] = index;
                item.uiObject.position = (this.getPosition(index));
            }
            createItem(i) {
                let itemBase;
                if (this._unUsedArray.length > 0) {
                    itemBase = this._unUsedArray.pop();
                    itemBase.uiObject.visibility = (SlateVisibility.Visible);
                }
                else {
                    if (this._itemPrefab.Gain != null) {
                        itemBase = this._itemPrefab.Gain();
                    }
                    else {
                        itemBase = this._itemPrefab["creat"]();
                    }
                    (this._scrollRoot.addChild(itemBase.uiObject));
                    itemBase.uiObject.size = (new Vector2(this._cellWidth, this._cellHeight));
                    this.mInitCallback.call(i, itemBase);
                }
                this.setItemIndex(itemBase, i);
                if (this._dataArray && itemBase["scorllIndex"] < this._dataArray.length) {
                    itemBase.setData(this._dataArray[itemBase["scorllIndex"]]);
                    this.mItemCallback.call(i, itemBase);
                }
                this._itemArr.push(itemBase);
                return;
            }
            /**
            * 获取最上位置的索引
             * @return 返回Pos
            */
            getPosIndex() {
                let pos = this._scrollRoot.position;
                switch (this._movement) {
                    case Orientation.OrientHorizontal:
                        {
                            return Math.floor(pos.x / -(this._cellWidth + this._spacingX));
                        }
                    case Orientation.OrientVertical:
                        {
                            let ret = pos.y / -(this._cellHeight + this._spacingY);
                            return Math.floor(ret);
                        }
                }
                return 0;
            }
            // 这个方法的目的 就是根据总数量 行列 来计算content的真正宽度或者高度
            updateTotalWidth() {
                switch (this._movement) {
                    case Orientation.OrientHorizontal:
                        let width = this._cellWidth * this._dataCount + this._spacingX * (this._dataCount - 1);
                        let height = this._scrollRoot.size.y;
                        this._scrollRoot.size = (new Vector2(width, height));
                        break;
                    case Orientation.OrientVertical:
                        let lineCount = Math.ceil(this._dataCount / this._maxPerLine);
                        this._scrollRoot.size = (new Vector2(this._scrollRoot.size.x, this._cellHeight * lineCount + this._spacingY * (lineCount - 1) + this._topSpace));
                        break;
                }
            }
            resetSBoxPos() {
                // 两句配合才能达到重置到顶部的效果
                this._scrollRoot.position = (new Vector2(0, 0));
                this._sBox.scrollToStart();
            }
            reset2BoxTop() {
                // 两句配合才能达到重置到顶部的效果
                this._scrollRoot.position = (new Vector2(0, 0));
                this._sBox.scrollToStart();
            }
            /** 重置到列表尾部 */
            reset2BoxEnd() {
                this._sBox.scrollToEnd();
            }
        }
        UIEx.MultiScrollerTable = MultiScrollerTable;
        /** 显示或者隐藏ui
         * @param ui ui控件
         * @param flag 是否显示ui
        */
        function show(ui, flag = true) {
            if (flag) {
                ui.visibility = (SlateVisibility.Visible);
            }
            else {
                ui.visibility = (SlateVisibility.Hidden);
            }
        }
        UIEx.show = show;
        /** 获取ui的世界坐标 */
        function getWorldPosition(ui) {
            let pos = ui.position;
            while (ui.parent != null) {
                ui = ui.parent;
                pos = pos.add(ui.position);
            }
            return pos;
        }
        UIEx.getWorldPosition = getWorldPosition;
        /** 判断ui是否可见 */
        function isShow(ui) {
            switch (ui.visibility) {
                case SlateVisibility.Visible:
                case SlateVisibility.HitTestInvisible:
                case SlateVisibility.SelfHitTestInvisible:
                    return true;
                case SlateVisibility.Hidden:
                case SlateVisibility.Collapsed:
                    return false;
                default:
                    return false;
            }
        }
        UIEx.isShow = isShow;
        /** Widget进出的方位 */
        let Direction;
        (function (Direction) {
            /** 从上到下进出场 */
            Direction[Direction["Top"] = 0] = "Top";
            /** 从下到上进出场 */
            Direction[Direction["Bottom"] = 1] = "Bottom";
            /** 从左向右进出场 */
            Direction[Direction["Left"] = 2] = "Left";
            /** 从右向左进出场 */
            Direction[Direction["Right"] = 3] = "Right";
            /** 中心 */
            Direction[Direction["Center"] = 4] = "Center";
            /** 左上 */
            Direction[Direction["TopLeft"] = 5] = "TopLeft";
            /** 右上 */
            Direction[Direction["TopRight"] = 6] = "TopRight";
            /** 左下 */
            Direction[Direction["BottomLeft"] = 7] = "BottomLeft";
            /** 右下 */
            Direction[Direction["BottomRight"] = 8] = "BottomRight";
        })(Direction = UIEx.Direction || (UIEx.Direction = {}));
        /* 动画播放器 */
        class UIAnimePlayer {
            /**
             * 使用Tween播放插值动画
             * @param widget 应用动画的Widget
             * @param startInfo 插值初始状态类
             * @param endInfo 插值结束状态类
             * @param easing Tween插值曲线
             * @param time 动画持续时间
             * @param onComplete 动画完成后回调
             * @returns
             */
            static playAnim(widget, startInfo, endInfo, easing, time, onComplete) {
                // 同一Widget不同动画中不重复执行 - 防止用户多次点击同一按钮连续触发还没执行完的动画
                if (UIAnimePlayer.playing.has(widget.guid)) {
                    return;
                }
                startInfo.applyToWidget(widget);
                const tween = new Tween(startInfo).to(endInfo)
                    .easing(easing)
                    .onComplete(() => {
                    UIAnimePlayer.playing.delete(widget.guid);
                    if (onComplete) {
                        endInfo.applyToWidget(widget);
                        onComplete();
                    }
                })
                    .onUpdate((info) => {
                    info.applyToWidget(widget);
                });
                if (time) {
                    tween.duration(time);
                }
                UIAnimePlayer.playing.set(widget.guid, tween);
                tween.start();
            }
        }
        /** 正在播放动画的Widget载入map保证一个widget一次性只能执行一个动画 */
        UIAnimePlayer.playing = new Map();
        /**
         * UI可变换状态类
         */
        class UIAnimInfo {
            constructor(infoProvider) {
                if (infoProvider instanceof UIAnimInfo) {
                    // 通过 UIAnimInfo 创建，实现克隆
                    this.position = infoProvider.position.clone();
                    this.renderOpacity = infoProvider.renderOpacity;
                    this.renderScale = infoProvider.renderScale.clone();
                    this.renderShear = infoProvider.renderShear.clone();
                    this.renderTransformAngle = infoProvider.renderTransformAngle;
                }
                else if (infoProvider instanceof Widget) {
                    // 通过 Widget 创建，使其保有默认值
                    this.position = infoProvider.position.clone();
                    this.renderOpacity = infoProvider.renderOpacity;
                    this.renderScale = infoProvider.renderScale.clone();
                    this.renderShear = infoProvider.renderShear.clone();
                    this.renderTransformAngle = infoProvider.renderTransformAngle;
                }
            }
            setPosition(position) {
                this.position = position.clone();
                return this;
            }
            setRenderOpacity(renderOpacity) {
                this.renderOpacity = renderOpacity;
                return this;
            }
            setRenderScale(renderScale) {
                this.renderScale = renderScale.clone();
                return this;
            }
            setRenderShear(renderShear) {
                this.renderShear = renderShear.clone();
                return this;
            }
            setRenderTransformAngle(renderTransformAngle) {
                this.renderTransformAngle = renderTransformAngle;
                return this;
            }
            clone() {
                return new UIAnimInfo(this);
            }
            /**
             * 将一个 UIAnimInfo 数据应用到 Widget
             * @param widget 可以是Widget，Img等
             */
            applyToWidget(widget) {
                widget.position = this.position.clone();
                widget.renderOpacity = this.renderOpacity;
                widget.renderScale = this.renderScale.clone();
                widget.renderShear = this.renderShear.clone();
                widget.renderTransformAngle = this.renderTransformAngle;
            }
        }
        /**
         * UI文本变换状态类
         */
        class UITextAnimInfo extends UIAnimInfo {
            constructor(infoProvider) {
                super(infoProvider);
                if (infoProvider instanceof UITextAnimInfo) {
                    this.textNum = infoProvider.textNum;
                }
                else if (infoProvider instanceof TextBlock) {
                    this.textNum = Number(infoProvider.text);
                }
            }
            setText(textNum) {
                this.textNum = textNum;
                return this;
            }
            applyToWidget(widget) {
                super.applyToWidget(widget);
                widget.text = Math.floor(this.textNum) + "";
            }
        }
        /**
         * 淡入
         * @param widget 应用动画的Widget
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         */
        function fadeIn(widget, time, onComplete) {
            const startInfo = new UIAnimInfo(widget)
                .setRenderOpacity(0);
            const endInfo = new UIAnimInfo(widget)
                .setRenderOpacity(1);
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
        }
        UIEx.fadeIn = fadeIn;
        /**
         * 从一侧平移进场
         * @param widget 应用动画的Widget
         * @param dir 进场方向
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         * @param easingFun 动画函数 - 默认线性
         */
        function transformIn(widget, dir, time, onComplete, easingFun = TweenUtil.Easing.Linear.None) {
            const startInfo = new UIAnimInfo(widget);
            const endInfo = new UIAnimInfo(widget).setPosition(widget.position);
            switch (dir) {
                case Direction.Top:
                    startInfo.setPosition(new Vector2(0, -widget.size.y));
                    break;
                case Direction.Bottom:
                    startInfo.setPosition(new Vector2(0, getViewportSize().y + widget.size.y));
                    break;
                case Direction.Left:
                    startInfo.setPosition(new Vector2(-widget.size.x, 0));
                    break;
                case Direction.Right:
                    startInfo.setPosition(new Vector2(getViewportSize().x + widget.size.x, 0));
                    break;
                default:
                    console.error("[UIAnimUtil] 该动画不能使用此方向");
                    return;
            }
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easingFun, time, onComplete);
        }
        UIEx.transformIn = transformIn;
        /**
         * 从一侧缩放进场
         * @param widget 应用动画的Widget
         * @param dir 进场方向
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         * @returns
         */
        function scaleIn(widget, dir, time, onComplete) {
            const startInfo = new UIAnimInfo(widget);
            const endInfo = new UIAnimInfo(widget).setRenderScale(Vector2.one);
            switch (dir) {
                case Direction.Top:
                    startInfo.setPosition(new Vector2(0, -widget.size.y / 2))
                        .setRenderScale(new Vector2(1, 0));
                    break;
                case Direction.Bottom:
                    startInfo.setPosition(new Vector2(0, widget.size.y / 2))
                        .setRenderScale(new Vector2(1, 0));
                    break;
                case Direction.Left:
                    startInfo.setPosition(new Vector2(-widget.size.x / 2, 0))
                        .setRenderScale(new Vector2(0, 1));
                    break;
                case Direction.Right:
                    startInfo.setPosition(new Vector2(widget.size.x / 2, 0))
                        .setRenderScale(new Vector2(0, 1));
                    break;
                case Direction.Center:
                    startInfo.setRenderScale(Vector2.zero);
                    break;
                default:
                    console.error("[UIAnimUtil] 该动画不能使用此方向");
                    return;
            }
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
        }
        UIEx.scaleIn = scaleIn;
        /**
         * 淡出
         * @param widget 应用动画的Widget
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         */
        function fadeOut(widget, time, onComplete) {
            const startInfo = new UIAnimInfo(widget)
                .setRenderOpacity(1);
            const endInfo = new UIAnimInfo(widget)
                .setRenderOpacity(0);
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
        }
        UIEx.fadeOut = fadeOut;
        /**
         * 从一侧平移出场
         * @param widget 应用动画的Widget
         * @param dir 进场方向
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         * @param easingFun 动画函数 - 默认线性
         */
        function transformOut(widget, dir, time, onComplete, easingFun = TweenUtil.Easing.Linear.None) {
            const startInfo = new UIAnimInfo(widget).setPosition(widget.position);
            const endInfo = new UIAnimInfo(widget);
            const defInfo = startInfo.clone();
            switch (dir) {
                case Direction.Top:
                    endInfo.setPosition(new Vector2(0, getViewportSize().y + widget.size.y));
                    break;
                case Direction.Bottom:
                    endInfo.setPosition(new Vector2(0, -widget.size.y));
                    break;
                case Direction.Left:
                    endInfo.setPosition(new Vector2(getViewportSize().x + widget.size.x, 0));
                    break;
                case Direction.Right:
                    endInfo.setPosition(new Vector2(-widget.size.x, 0));
                    break;
                default:
                    console.error("[UIAnimUtil] 该动画不能使用此方向");
                    return;
            }
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easingFun, time, () => {
                // 出场后需还原状态
                defInfo.applyToWidget(widget);
                if (onComplete) {
                    onComplete();
                }
            });
        }
        UIEx.transformOut = transformOut;
        /**
         * 从一侧缩放出场
         * @param widget 应用动画的Widget
         * @param dir 出场方向
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         * @returns
         */
        function scaleOut(widget, dir, time, onComplete) {
            const startInfo = new UIAnimInfo(widget);
            const endInfo = new UIAnimInfo(widget);
            const defInfo = startInfo.clone();
            switch (dir) {
                case Direction.Top:
                    endInfo.setPosition(new Vector2(0, -widget.size.y / 2))
                        .setRenderScale(new Vector2(1, 0));
                    break;
                case Direction.Bottom:
                    endInfo.setPosition(new Vector2(0, widget.size.y / 2))
                        .setRenderScale(new Vector2(1, 0));
                    break;
                case Direction.Left:
                    endInfo.setPosition(new Vector2(-widget.size.x / 2, 0))
                        .setRenderScale(new Vector2(0, 1));
                    break;
                case Direction.Right:
                    endInfo.setPosition(new Vector2(widget.size.x / 2, 0))
                        .setRenderScale(new Vector2(0, 1));
                    break;
                case Direction.Center:
                    endInfo.setRenderScale(Vector2.zero);
                    break;
                default:
                    console.error("[UIAnimUtil] 该动画不能使用此方向");
                    return;
            }
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, () => {
                // 出场后需还原状态
                defInfo.applyToWidget(widget);
                if (onComplete) {
                    onComplete();
                }
            });
        }
        UIEx.scaleOut = scaleOut;
        /**
         * 文本数字缓动
         * @param widget 应用动画的Widget
         * @param toTextNum 目标数字值
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         */
        function textNumTo(widget, toTextNum, time, onComplete) {
            const startInfo = new UITextAnimInfo(widget);
            const endInfo = new UITextAnimInfo(widget).setText(toTextNum);
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
        }
        UIEx.textNumTo = textNumTo;
        /**
         * 缩放动画
         * @param widget 应用动画的Widget
         * @param scale 目标缩放值
         * @param time 动画持续时间
         * @param onComplete 动画完成后回调
         */
        function scaleTo(widget, scale, time, onComplete) {
            const startInfo = new UIAnimInfo(widget);
            const endInfo = new UIAnimInfo(widget).setRenderScale(scale);
            const easing = TweenUtil.Easing.Linear.None;
            UIAnimePlayer.playAnim(widget, startInfo, endInfo, easing, time, onComplete);
        }
        UIEx.scaleTo = scaleTo;
    })(UtilEx.UIEx || (UtilEx.UIEx = {}));
    (function (TimeEx) {
        // 固定帧参数
        const FPS = 30; //  30帧每秒的情况
        const singleFrameTime = (1 / FPS);
        let timeStamp = 0;
        let _onFixedUpdate;
        /** 固定帧 */
        function onFixedUpdate(action) {
            if (!_onFixedUpdate) {
                _onFixedUpdate = new Action();
                TimeUtil.onEnterFrame.add((dt) => {
                    timeStamp += dt;
                    let count = 0;
                    while (timeStamp > singleFrameTime) {
                        // 追帧速度
                        if (count++ > 5)
                            break;
                        _onFixedUpdate.call(singleFrameTime);
                        timeStamp = (timeStamp - singleFrameTime);
                    }
                });
            }
            _onFixedUpdate.add(action);
        }
        TimeEx.onFixedUpdate = onFixedUpdate;
        /**
         * 分帧加载
         */
        class WaitSpawn {
            /**
             * 生成物体
             * @param spawnInfo 生成信息
             * @returns
             */
            static spawn(guid, spawnInfo) {
                if (!this._instance) {
                    this._instance = new WaitSpawn();
                }
                return this._instance.addSpawn(guid, spawnInfo);
            }
            constructor() {
                /**
                 * 等待列表
                 */
                this._waitList = [];
                TimeUtil.onEnterFrame.add(this.onEnterFrame.bind(this));
            }
            /**
             * 添加异步生成物体
             * @param spawnInfo
             * @returns
             */
            addSpawn(guid, spawnInfo) {
                return new Promise((resolve) => this._waitList.push({ guid: guid, spawnInfo: spawnInfo, resolve: resolve }));
            }
            /**
             * 每帧执行
             * @param dt
             * @returns
             */
            onEnterFrame(dt) {
                console.log("frame time:", dt);
                if (dt >= 100)
                    return;
                for (let index = 0; index < WaitSpawn.spawnCount && this._waitList.length > 0; index++) {
                    const waitData = this._waitList.shift();
                    GameObject.asyncSpawn(waitData.guid, waitData.spawnInfo).then(async (go) => {
                        await go.asyncReady();
                        waitData.resolve(go);
                    });
                }
            }
        }
        /**
         * 每帧加载个数
         */
        WaitSpawn.spawnCount = 100;
        TimeEx.WaitSpawn = WaitSpawn;
        /**
         *  异步等待
         */
        class WaitReady {
            constructor() {
                /** 是否有执行 */
                this.padded = false;
                /** 执行中时，缓存异步回调 */
                this.actionList = [];
            }
            /**
             * 异步执行
             */
            async ready() {
                if (this.padded) {
                    return null;
                }
                return new Promise((resolve, reject) => {
                    this.actionList.push({ resolve: resolve, reject: reject });
                });
            }
            /**
             * 调用结束结束
             * @description 仅支持了成功调用
             */
            over() {
                if (this.padded) {
                    return;
                }
                this.padded = true;
                let ls = this.actionList, len = ls.length;
                for (let i = 0; i < len; i++) {
                    ls[i].resolve(null);
                }
                this.actionList = [];
            }
        }
        TimeEx.WaitReady = WaitReady;
        async function asyncLoop(condition, timer = 100) {
            return new Promise((resolve) => {
                let res = condition();
                if (res) {
                    resolve(res);
                    return;
                }
                const inter = setInterval(() => {
                    res = condition();
                    if (res) {
                        clearInterval(inter);
                        resolve(res);
                    }
                }, timer);
            });
        }
        TimeEx.asyncLoop = asyncLoop;
    })(UtilEx.TimeEx || (UtilEx.TimeEx = {}));
    (function (SoundEx) {
        let BGMState;
        (function (BGMState) {
            BGMState[BGMState["Stop"] = 0] = "Stop";
            BGMState[BGMState["Playing"] = 1] = "Playing";
            BGMState[BGMState["Pause"] = 2] = "Pause";
        })(BGMState || (BGMState = {}));
        class BGMInfo {
        }
        class SoundInfo {
            constructor() {
                this.soundArr = [];
            }
        }
        const DefaultVolume = 100;
        const DefaultVolumeScale = 100;
        /**
         * 背景音乐
         */
        let _bgmMap = new Map();
        let _musicVolume = DefaultVolumeScale;
        let _currentMusic;
        let _musicFadeTween;
        let _musicLoop = true;
        /**
         * 音效
         */
        let _soundMap = new Map();
        let _soundVolume = DefaultVolumeScale;
        /**
         * 播放背景音乐
         * @param guid
         * @param volume
         * @param autoLoop
         */
        function playMusic(guid, volume = DefaultVolume, autoLoop = true) {
            _musicLoop = autoLoop;
            let info;
            if (_bgmMap.has(guid)) {
                info = _bgmMap.get(guid);
                if (volume != info.volume) {
                    info.volume = volume;
                }
                if (info.state == BGMState.Stop) {
                    changeMusic(info);
                }
                else if (info.state == BGMState.Pause) {
                    //todo pause
                    resumeMusic();
                }
                else if (info.state == BGMState.Playing) {
                    info.sound.volume = caculateMusicVolume(volume);
                }
            }
            else {
                info = new BGMInfo();
                info.guid = guid;
                info.volume = volume;
                GameObject.asyncSpawn(guid).then((sound) => {
                    info.sound = sound;
                    changeMusic(info);
                });
                _bgmMap.set(guid, info);
            }
        }
        SoundEx.playMusic = playMusic;
        /**
         * 设置BGM音量大小
         * @param volume
         */
        function setMusicVolume(volume) {
            _musicVolume = volume;
            if (_currentMusic) {
                _currentMusic.sound.volume = caculateMusicVolume(volume);
            }
        }
        SoundEx.setMusicVolume = setMusicVolume;
        /**
         * 停止BGM
         */
        function stopMusic() {
            if (_currentMusic) {
                _currentMusic.sound.stop();
                _currentMusic.state = BGMState.Stop;
            }
        }
        SoundEx.stopMusic = stopMusic;
        /**
         * 暂停BGM
         */
        function pauseMusic() {
            if (_currentMusic) {
                if (_currentMusic.state == BGMState.Pause) {
                    return;
                }
                _currentMusic.sound.pause();
                _currentMusic.state = BGMState.Pause;
            }
        }
        SoundEx.pauseMusic = pauseMusic;
        /**
         * 恢复音乐
         */
        function resumeMusic() {
            if (_currentMusic) {
                if (_currentMusic.state == BGMState.Playing) {
                    return;
                }
                _currentMusic.sound.play();
                _currentMusic.state = BGMState.Playing;
            }
        }
        SoundEx.resumeMusic = resumeMusic;
        /**
         * 获取背景音乐的音量大小
         * @returns
         */
        function getMusicVolume() { return _musicVolume; }
        SoundEx.getMusicVolume = getMusicVolume;
        /**
         * 播放音效
         * @param guid
         * @param volume 音量
         * @param autoLoop 是否循环
         */
        function playSound(guid, volume = DefaultVolume, autoLoop = false) {
            if (!_soundMap.has(guid)) {
                let info = new SoundInfo();
                info.volume = volume;
                info.loop = autoLoop;
                info.soundArr = [];
                _soundMap.set(guid, info);
            }
            const soundInfo = _soundMap.get(guid);
            if (soundInfo.volume != volume) {
                soundInfo.volume = volume;
            }
            let sound;
            for (let i = 0; i < soundInfo.soundArr.length; i++) {
                const element = soundInfo.soundArr[i];
                if (!element.playState) {
                    sound = element;
                    break;
                }
            }
            if (!sound) {
                GameObject.asyncSpawn(guid).then((obj) => {
                    sound = obj;
                    sound.isLoop = soundInfo.loop;
                    sound.volume = caculateSoundVolume(soundInfo.volume);
                    sound.play();
                    if (soundInfo.soundArr.length < 5) {
                        soundInfo.soundArr.push(sound);
                    }
                    else {
                        sound.onFinish.add(() => {
                            sound.destroy();
                        });
                    }
                });
            }
            else {
                sound.volume = caculateSoundVolume(soundInfo.volume);
                sound.play();
            }
        }
        SoundEx.playSound = playSound;
        function printAllSoundCounts() {
            console.log("BMG COUNTS=" + _bgmMap.size);
            let counts = 0;
            _soundMap.forEach((soundInfo) => {
                counts += soundInfo.soundArr.length;
            });
            console.log("Sound COUNTS=" + counts);
        }
        SoundEx.printAllSoundCounts = printAllSoundCounts;
        /**************************************************私有方法********************************************************************** */
        function caculateMusicVolume(volume) {
            return volume / 100 * 5 * _musicVolume / DefaultVolumeScale;
        }
        function caculateSoundVolume(volume) {
            return volume / 100 * 5 * _soundVolume / DefaultVolumeScale;
        }
        /**
         * 切换背景音乐
         * @param newMusic
         */
        function changeMusic(newMusic) {
            if (_musicFadeTween) {
                _musicFadeTween.stop();
            }
            if (_currentMusic && _currentMusic.state) {
                musicFadeOut(() => {
                    musicFadeIn(newMusic);
                });
            }
            else {
                musicFadeIn(newMusic);
            }
        }
        /**
         * 淡出
         * @param callback
         */
        function musicFadeOut(callback) {
            _musicFadeTween = new Tween({ volume: _currentMusic.volume })
                .to({ volume: 0 }, 1500)
                .onUpdate((obj) => {
                _currentMusic.sound.volume = caculateMusicVolume(obj.volume);
            })
                .onComplete(() => {
                _currentMusic.state = BGMState.Stop;
                _currentMusic.sound.stop();
                callback && callback();
            })
                .start();
        }
        /**
         * 淡入
         * @param callback
         */
        function musicFadeIn(newMusic, callback) {
            _musicFadeTween = new Tween({ volume: 0 })
                .to({ volume: newMusic.volume }, 1500)
                .onStart(() => {
                newMusic.state = BGMState.Playing;
                newMusic.sound.isLoop = _musicLoop;
                newMusic.sound.play();
                _currentMusic = newMusic;
            })
                .onUpdate((obj) => {
                newMusic.sound.volume = caculateMusicVolume(obj.volume);
            })
                .onComplete(() => {
                callback && callback();
            })
                .start();
        }
    })(UtilEx.SoundEx || (UtilEx.SoundEx = {}));
    /**
     * Type类工具
     */
    let TypeEx;
    (function (TypeEx) {
        function quaternionMul(a, b) {
            let result = new Quaternion();
            result.x = a.x * b.w + a.y * b.z - a.z * b.y + a.w * b.x;
            result.y = -a.x * b.z + a.y * b.w + a.z * b.x + a.w * b.y;
            result.z = a.x * b.y - a.y * b.x + a.z * b.w + a.w * b.z;
            result.w = -a.x * b.x - a.y * b.y - a.z * b.z + a.w * b.w;
            return result;
        }
        TypeEx.quaternionMul = quaternionMul;
        /**
         * 线性插值
         * @param from 初始位置
         * @param to 目标位置
         * @param t 插值
         * @param generator 生成返回值对象
         * @returns result
         */
        function vectorLerp(from, to, t, generator) {
            let result = new generator();
            for (var k in result) {
                let value0 = from[k];
                let value1 = to[k];
                if (null != value0 && null != value1) {
                    result[k] = value0 + (value1 - value0) * t;
                }
            }
            return result;
        }
        TypeEx.vectorLerp = vectorLerp;
        /**
         * 点乘
         * @param a
         * @param b
         * @returns
         */
        function dotMul(a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        }
        TypeEx.dotMul = dotMul;
        /**
         * 反射向量
         * @param inV
         * @param normalV
         * @returns
         */
        function getReflectVector(inV, normalV) {
            normalV = normalV.normalized;
            return inV.clone().subtract(normalV.multiply(dotMul(inV, normalV) * 2));
        }
        TypeEx.getReflectVector = getReflectVector;
        /**
         * 数组转vector
         * @param arr
         * @returns
         */
        function arr2Vec3(arr) {
            if (arr == null || arr.length != 3) {
                return null;
            }
            let vec = new Vector(arr[0], arr[1], arr[2]);
            return vec;
        }
        TypeEx.arr2Vec3 = arr2Vec3;
        /**
         * 数组转Rotation
         * @param arr
         * @returns
         */
        function arr2Rot3(arr) {
            if (arr == null || arr.length != 3) {
                return null;
            }
            let vec = new Rotation(arr[0], arr[1], arr[2]);
            return vec;
        }
        TypeEx.arr2Rot3 = arr2Rot3;
        /**
         * Vector转数组
         * @param vec
         * @returns
         */
        function vec2Arr(vec) {
            return [vec.x, vec.y, vec.z];
        }
        TypeEx.vec2Arr = vec2Arr;
        /**
         * 获取3维向量的长度
         * @param v3 3维向量
         * @returns 长度
         */
        function v3Magnitude(v3) {
            let result = v3.x * v3.x + v3.y * v3.y + v3.z * v3.z;
            return Math.sqrt(result);
        }
        TypeEx.v3Magnitude = v3Magnitude;
        /**
         * 距离平方
         * @param a
         * @param b
         * @returns
         */
        function distanceSquare(a, b) {
            return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z);
        }
        TypeEx.distanceSquare = distanceSquare;
        /**
         * 对比两个vector
         * @param vecA
         * @param vecB
         * @param diff
         * @returns
         */
        function isVectorSimilar(vecA, vecB, diff) {
            let diffX = Math.abs(vecA.x - vecB.x);
            let diffY = Math.abs(vecA.y - vecB.y);
            //oTrace("diff", diffX, diffY, diff);
            return diffX <= diff && diffY <= diff;
        }
        TypeEx.isVectorSimilar = isVectorSimilar;
        /**
         * 判断
         * @param A
         * @param B
         * @param center
         * @returns
         */
        function isBetween(A, B, center) {
            return ((A.x <= center.x && center.x <= B.x) || (B.x <= center.x && center.x <= A.x)) && ((A.y <= center.y && center.y <= B.y) || (B.y <= center.y && center.y <= A.y));
        }
        TypeEx.isBetween = isBetween;
        /**
         * 获取圆形上随机位置
         * @param center
         * @param raduis
         * @returns
         */
        function getCircleRandomPos(center, raduis) {
            let ret = new Vector(center.x, center.y, center.z);
            let angle = MathEx.rangeFloat(0, 360);
            ret.x = center.x + Math.sin(angle * Math.PI / 180) * raduis;
            ret.y = center.y + Math.cos(angle * Math.PI / 180) * raduis;
            return ret;
        }
        TypeEx.getCircleRandomPos = getCircleRandomPos;
        function getLinePos(start, end, raduis) {
            if (raduis == 0) {
                return end;
            }
            let dir = Vector.subtract(end, start);
            let size = dir.length;
            if (size <= raduis) {
                return start;
            }
            dir = dir.normalized;
            return dir.multiply(size - raduis).add(start);
        }
        TypeEx.getLinePos = getLinePos;
        /**
         * 3d 贝塞尔曲线
         * @param p0
         * @param p1
         * @param p2
         * @param t
         * @returns
         */
        function getBezier3d(p0, p1, p2, t) {
            let x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
            let y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
            let z = (1 - t) * (1 - t) * p0.z + 2 * t * (1 - t) * p1.z + t * t * p2.z;
            return new Vector(x, y, z);
        }
        TypeEx.getBezier3d = getBezier3d;
        /**
         * 2d 贝塞尔曲线
         * @param p0
         * @param p1
         * @param p2
         * @param t
         * @returns
         */
        function getBezier2d(p0, p1, p2, t) {
            let x = (1 - t) * (1 - t) * p0.x + 2 * t * (1 - t) * p1.x + t * t * p2.x;
            let y = (1 - t) * (1 - t) * p0.y + 2 * t * (1 - t) * p1.y + t * t * p2.y;
            return new Vector2(x, y);
        }
        TypeEx.getBezier2d = getBezier2d;
        /**获取向量的长度 */
        function v2Magnitude(v2) {
            let result = v2.x * v2.x + v2.y * v2.y;
            return Math.sqrt(result);
        }
        TypeEx.v2Magnitude = v2Magnitude;
        /**向量的插值计算 */
        function v3Lerp(from, to, t) {
            let result = new Vector(0, 0, 0);
            result.x = from.x + (to.x - from.x) * t;
            result.y = from.y + (to.y - from.y) * t;
            result.z = from.z + (to.z - from.z) * t;
            return result;
        }
        TypeEx.v3Lerp = v3Lerp;
        /**
         * 依轴过滤向量,只保留绝对值最大的值
         * @param vector 向量
         * @returns 轴向量
         */
        function getAxisAbsMax(vector) {
            let axis = "";
            let value = 0;
            for (let k in vector) {
                let compv = +vector[k];
                if (Number.isNaN(compv)) {
                    continue;
                }
                if (Math.abs(compv) > Math.abs(value)) {
                    axis = k;
                    value = compv;
                }
            }
            return { axis: axis, value: value };
        }
        TypeEx.getAxisAbsMax = getAxisAbsMax;
        /**
        * 判断2维向量是否在矩形范围内
        * @param min 矩形向量中最小的点
        * @param max 矩形向量中最大的点
        * @param pos 被判断的点
        * @returns 以两点作为边界值的比较
        */
        function withinRect(min, max, pos) {
            return pos.x >= min.x && pos.x <= max.x && pos.y >= min.y && pos.y <= max.y;
        }
        TypeEx.withinRect = withinRect;
    })(TypeEx = UtilEx.TypeEx || (UtilEx.TypeEx = {}));
    let MathEx;
    (function (MathEx) {
        /**一个唯一编号，累+ */
        let g_s_UnitBaseGuid = 0;
        /**调用这个获取一个中的唯一id
         * @TakeCare 客户端可能不同，双端调用的不要在客户端创建
         */
        function getGuid() {
            return g_s_UnitBaseGuid++;
        }
        MathEx.getGuid = getGuid;
        /**
         * 随机浮点数（返回大于等于 min 小于 max ）
         * @param min 最小值
         * @param max 最大值
         * @returns 返回大于等于 min 小于 max
         */
        function rangeFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
        MathEx.rangeFloat = rangeFloat;
        /**
         * 随机整数（返回min到max中的整数）
         * @param min 最小值
         * @param max 最大值
         * @returns min到max中的整数
         */
        function rangeInt(min, max) {
            return Math.floor(MathEx.rangeFloat(min, max));
        }
        MathEx.rangeInt = rangeInt;
        /**
         * 返回数组中一个随机的item
         * @param items 数组
         * @param pAutoRemove 是否从数组中删除
         * @returns 一个随机的item
         */
        function rangeItem(items, pAutoRemove = true) {
            const index = MathEx.rangeInt(0, items.length);
            const item = items[index];
            if (pAutoRemove) {
                items.splice(index, 1);
            }
            return item;
        }
        MathEx.rangeItem = rangeItem;
        /**
         * 根据权重返回一个index
         * @param arr
         * @returns
         */
        function rangeWeight(arr) {
            // 最大值
            let max = 0;
            arr.forEach(value => max += value);
            // 随机值
            const range = MathEx.rangeInt(0, max);
            // 最小值
            let min = 0;
            for (let index = 0; index < arr.length; index++) {
                min += arr[index];
                if (min >= range) {
                    return index;
                }
            }
        }
        MathEx.rangeWeight = rangeWeight;
        function rangeVector(start, end) {
            return new Vector(MathEx.rangeFloat(start.x, start.x + end.x), MathEx.rangeFloat(start.y, start.y + end.y), MathEx.rangeFloat(start.z, start.z + end.z));
        }
        MathEx.rangeVector = rangeVector;
        /**
       * 限制值为 [min,max]
       * @param value 被限制的值
       * @param min 最小值
       * @param max 最大值
       * @returns 当min>max时不做处理
       */
        function clamp(value, min, max) {
            if (min > max) {
                return value;
            }
            return value < min ? min : value > max ? max : value;
        }
        MathEx.clamp = clamp;
        /**
         * 限制值为 [0,1]
         * @param value 被限制的值
         * @returns 越界时替换
         */
        function clamp01(value) {
            return MathEx.clamp(value, 0, 1);
        }
        MathEx.clamp01 = clamp01;
    })(MathEx = UtilEx.MathEx || (UtilEx.MathEx = {}));
})(UtilEx || (UtilEx = {}));

var foreign50 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get UtilEx () { return UtilEx; }
});

class RankData {
}

var foreign51 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankData: RankData
});

/**
 * @Author       : lei.zhao
 * @Date         : 2023-08-10 19:13:01
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-11 09:56:28
 * @FilePath     : \FogTest\JavaScripts\world-rank\RankItem.ts
 * @Description  : 修改描述
 */
let RankItem = class RankItem extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.formatNumberBits = [1000000000000000000000000, 1000000000000000000000, 1000000000000000000, 1000000000000000, 1000000000000, 1000000000, 1000000, 1000];
        this.formatNumberString = ["ad", "ac", "ab", "aa", "T", "B", "M", "K"];
    }
    onStart() {
        this.rankText = this.uiWidgetBase.findChildByPath("RootCanvas/RankText");
        this.nameText = this.uiWidgetBase.findChildByPath("RootCanvas/NameText");
        this.dataText = this.uiWidgetBase.findChildByPath("RootCanvas/DataText");
    }
    /**
     * 设置数控
     * @param index 排名
     * @param data 数据
     * @param isLongNum 是否是科学计数
     * @param isLocalPlayer 是否本机玩家
     */
    updateData(index, data, isLongNum, isLocalPlayer) {
        const color = isLocalPlayer ? mw.LinearColor.green : mw.LinearColor.white;
        this.rankText.text = index.toString();
        this.nameText.text = data.name;
        this.dataText.text = isLongNum ? this.formatNumber(data.data) : data.data.toString();
        this.dataText.fontColor = color;
        this.nameText.fontColor = color;
        this.rankText.fontColor = color;
    }
    /**
     * 科学计数法
     * @param value
     * @returns
     */
    formatNumber(value) {
        const isNegetive = value < 0;
        if (value < 0) {
            value = -value;
        }
        for (let i = 0; i < this.formatNumberBits.length; i++) {
            if (value > this.formatNumberBits[i]) {
                return (value / this.formatNumberBits[i]).toFixed(1) + this.formatNumberString[i];
            }
        }
        return isNegetive ? ("-" + value) : value.toString();
    }
};
RankItem = __decorate([
    UIBind('UI/world-rank/WorldRankItem.ui')
], RankItem);
var RankItem$1 = RankItem;

var foreign52 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankItem$1
});

/**
 * @Author       : lei.zhao
 * @Date         : 2023-08-10 19:12:54
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-11 09:59:20
 * @FilePath     : \FogTest\JavaScripts\world-rank\RankUI.ts
 * @Description  : 修改描述
 */
const tempV2 = new Vector2();
class RankUI {
    constructor(userWidget) {
        this.userWidget = userWidget;
        this.cache = [];
        this.rankTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/RankTitle");
        this.nameTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/NameTitle");
        this.dataTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/DataTitle");
        this.canvas = this.userWidget.findChildByPath("RootCanvas/Canvas");
    }
    updateRankTitle(rankTitle, nameTitle, dataTitle) {
        this.rankTitle.text = rankTitle;
        this.nameTitle.text = nameTitle;
        this.dataTitle.text = dataTitle;
    }
    updateData(component, data, isLongNum, localUserId) {
        for (let i = 0; i < data.length; i++) {
            let item = this.cache[i];
            if (!item) {
                item = mw.UIService.create(RankItem$1);
                component.addChild(item.uiObject);
                item.uiObject.position = tempV2.set(0, 120 + 110 * i);
                this.cache.push(item);
            }
            item.updateData(i + 1, data[i], isLongNum, localUserId === data[i].userId);
        }
    }
}

var foreign53 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankUI: RankUI
});

var Order;
(function (Order) {
    /**
     * 升序
     */
    Order[Order["Ascending"] = 0] = "Ascending";
    /**
     * 降序
     */
    Order[Order["Descending"] = 1] = "Descending";
})(Order || (Order = {}));
var WorldRankService;
(function (WorldRankService) {
    /**
     * 排行实体，不可更改
     */
    WorldRankService._ranks = [];
    /**
     * 更新某个排行数据
     * @timelife 双端都可调用
     * @param key 排行通讯Key
     * @param player 玩家
     * @param data 数据
     */
    function rank(key, player, data) {
        const rank = getRank(key);
        if (rank) {
            rank.updateData(player, data);
        }
    }
    WorldRankService.rank = rank;
    function getRank(key) {
        return WorldRankService._ranks.find(r => r.channel == key);
    }
    if (SystemUtil.isServer()) {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
    }
})(WorldRankService || (WorldRankService = {}));
let WorldRank = class WorldRank extends mw.Script {
    constructor() {
        super(...arguments);
        this.rankTitle = "排名";
        this.nameTitle = "玩家";
        this.dataTitle = "积分";
        this.worldUIGuid = "";
        this.order = Order.Descending;
        this.channel = "Score";
        this.isLongNum = false;
        this.data = [];
        this.userId = "";
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        WorldRankService._ranks.push(this);
        if (this.isRunningClient()) {
            Player.asyncGetLocalPlayer().then(player => {
                // 获取玩家ID,这里需要等待
                this.userId = player.userId;
                this.requestRank(player);
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
    /**
     * -------------------------------client-----------------
     */
    onRequestData(player, data) {
        GameObject.asyncFindGameObjectById(this.worldUIGuid).then((widget) => {
            this.rankUI = new RankUI(widget.getTargetUIWidget());
            this.rankUI.updateRankTitle(this.rankTitle, this.nameTitle, this.dataTitle);
            this.boardcastData(data);
        });
    }
    /**
     * 广播数据
     * @param data
     */
    boardcastData(data) {
        this.data.length = 0;
        data && this.data.push(...data);
        const inter = setInterval(() => {
            if (this.rankUI) {
                clearInterval(inter);
                this.rankUI.updateData(this.rankUI.canvas, this.data, this.isLongNum, this.userId);
            }
        }, 100);
    }
    /**
     * -------------------------------server-----------------
     *  */
    /**
     * 更新数据
     * @param player
     * @param data
     */
    updateData(player, data) {
        //获取最新数据防止覆盖
        this.sortData(player, data) && this.updateRemoteData(player, data, (isSuccess) => {
            this.boardcastData(this.data);
        });
    }
    /**
     * 监听数据是否改变
     */
    sortData(player, data) {
        const userId = player.userId;
        let isChanged = this.data.length < 10;
        const playerData = this.data.find(d => d.userId == userId);
        if (playerData) {
            if (this.order == Order.Ascending) {
                if (playerData.data > data) {
                    playerData.data = data;
                    isChanged = true;
                }
            }
            else {
                if (playerData.data < data) {
                    playerData.data = data;
                    isChanged = true;
                }
            }
        }
        else if (isChanged) {
            //如果数据不足10条，直接添加
            this.data.push({ userId: userId, name: player.character.displayName, data: data });
        }
        else {
            //判断是否需要替换
            const lastData = this.data[this.data.length - 1];
            if (this.order == Order.Ascending) {
                if (lastData.data > data) {
                    isChanged = true;
                }
            }
            else {
                if (lastData.data < data) {
                    isChanged = true;
                }
            }
            if (isChanged) {
                lastData.userId = userId;
                lastData.name = player.character.displayName;
                lastData.data = data;
            }
        }
        if (isChanged) {
            //排序
            this.data.sort((a, b) => {
                if (this.order == Order.Ascending) {
                    return a.data - b.data;
                }
                else {
                    return b.data - a.data;
                }
            });
        }
        return isChanged;
    }
    /**
     * 更新远端数据
     * @param player
     * @param data
     */
    updateRemoteData(player, data, callback) {
        GeneralManager.asyncRpcGetData(`WorldRank.${this.channel}`).then(remoteData => {
            remoteData && (this.data = remoteData);
            const isChanged = this.sortData(player, data);
            if (isChanged) {
                //更新数据
                DataStorage.asyncSetData(`WorldRank.${this.channel}`, this.data).then((code) => {
                    callback(code == mw.DataStorageResultCode.Success);
                }).catch(() => {
                    callback(false);
                });
            }
        }).catch(() => {
            callback(false);
        });
    }
    /**
     * 请求排行
     */
    requestRank(player) {
        if (this.data.length > 0) {
            this.onRequestData(player, this.data);
        }
        else {
            GeneralManager.asyncRpcGetData(`WorldRank.${this.channel}`).then(data => {
                if (data) {
                    this.data.length = 0;
                    this.data.push(...data);
                }
                this.onRequestData(player, data);
            });
        }
    }
    /** 脚本被销毁时最后一帧执行完调用此函数 */
    onDestroy() {
    }
};
__decorate([
    mw.Property({ displayName: "排行字段名", group: "扩展属性" })
], WorldRank.prototype, "rankTitle", void 0);
__decorate([
    mw.Property({ displayName: "玩家字段名", group: "扩展属性" })
], WorldRank.prototype, "nameTitle", void 0);
__decorate([
    mw.Property({ displayName: "数据字段名", group: "扩展属性" })
], WorldRank.prototype, "dataTitle", void 0);
__decorate([
    mw.Property({ displayName: "世界UI(不可更改)", capture: true, group: "不可编辑" })
], WorldRank.prototype, "worldUIGuid", void 0);
__decorate([
    mw.Property({ displayName: "排行规则", group: "扩展属性", enumType: Order })
], WorldRank.prototype, "order", void 0);
__decorate([
    mw.Property({ displayName: "排行关键字,WorldRankService.rank中的key属性", group: "扩展属性" })
], WorldRank.prototype, "channel", void 0);
__decorate([
    mw.Property({ displayName: "长数字模式", group: "扩展属性" })
], WorldRank.prototype, "isLongNum", void 0);
__decorate([
    RemoteFunction(mw.Client)
], WorldRank.prototype, "onRequestData", null);
__decorate([
    RemoteFunction(mw.Client, mw.Multicast)
], WorldRank.prototype, "boardcastData", null);
__decorate([
    RemoteFunction(mw.Server)
], WorldRank.prototype, "updateData", null);
__decorate([
    RemoteFunction(mw.Server)
], WorldRank.prototype, "requestRank", null);
WorldRank = __decorate([
    Component
], WorldRank);
var WorldRank$1 = WorldRank;

var foreign54 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get WorldRankService () { return WorldRankService; },
    default: WorldRank$1
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/CheckUI': foreign1,
     'JavaScripts/ClickEvent': foreign2,
     'JavaScripts/DefaultUI': foreign3,
     'JavaScripts/IAACore': foreign4,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign5,
     'JavaScripts/Modified027Editor/ModifiedSpawn': foreign6,
     'JavaScripts/Modified027Editor/ModifiedStaticAPI': foreign7,
     'JavaScripts/prefabEvent/PrefabEvent': foreign8,
     'JavaScripts/prefabEvent/PrefabEventModule': foreign9,
     'JavaScripts/prefabEvent/PrefabEvtUI': foreign10,
     'JavaScripts/prefabEvent/PrefabReport': foreign11,
     'JavaScripts/Prefabs/common/MessageBox': foreign12,
     'JavaScripts/Prefabs/IAACloth/IAAChangeCloth': foreign13,
     'JavaScripts/Prefabs/Tools/IAAUtil': foreign14,
     'JavaScripts/Prefabs/即死块/Script/Prefabs/DieArea/DieArea': foreign15,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/Data/WeaponAction': foreign16,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/Data/WeaponCross': foreign17,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/Manager/GunManager': foreign18,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/RayGun': foreign19,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/Tools/AssetsHelper': foreign20,
     'JavaScripts/Prefabs/射线枪/Script/Prefab/UI/RayGunUI': foreign21,
     'JavaScripts/Prefabs/排行榜系统/Script/Prefabs/Rank/RankSystem': foreign22,
     'JavaScripts/Prefabs/排行榜系统/Script/Prefabs/Rank/RankUI': foreign23,
     'JavaScripts/Prefabs/排行榜系统/Script/Prefabs/Rank/RankUIItem': foreign24,
     'JavaScripts/Prefabs/排行榜系统/Script/Prefabs/Tools/GridLayout': foreign25,
     'JavaScripts/Prefabs/排行榜系统/Script/Prefabs/Tools/MapEx': foreign26,
     'JavaScripts/Prefabs/玩家系统/Script/Prefabs/PlayerSystem/PlayerComponent': foreign27,
     'JavaScripts/Prefabs/玩家系统/Script/Prefabs/PlayerSystem/PlayerSystem': foreign28,
     'JavaScripts/Prefabs/玩家系统/Script/Prefabs/PlayerSystem/UIPlayerInfo': foreign29,
     'JavaScripts/Prefabs/玩家系统/Script/Prefabs/PlayerSystem/UIPlayerSlider': foreign30,
     'JavaScripts/Prefabs/记录点功能/Script/Prefabs/StageRecord/StageRecord': foreign31,
     'JavaScripts/Prefabs/通知系统/Script/Prefabs/Notify/NotifySystem': foreign32,
     'JavaScripts/Prefabs/通知系统/Script/Prefabs/Notify/NotifyUI': foreign33,
     'JavaScripts/SetPLayer': foreign34,
     'JavaScripts/ShowWorldUI': foreign35,
     'JavaScripts/Tools': foreign36,
     'JavaScripts/TriggerWind': foreign37,
     'JavaScripts/ui-generate/CheckUI_generate': foreign38,
     'JavaScripts/ui-generate/dakai_generate': foreign39,
     'JavaScripts/ui-generate/DefaultUI_generate': foreign40,
     'JavaScripts/ui-generate/MessageBox_generate': foreign41,
     'JavaScripts/ui-generate/PrefabEvtUI_generate': foreign42,
     'JavaScripts/ui-generate/Prefabs/射线枪/UI/RayGunUI_generate': foreign43,
     'JavaScripts/ui-generate/Prefabs/排行榜系统/UI/UIRankItem_generate': foreign44,
     'JavaScripts/ui-generate/Prefabs/排行榜系统/UI/UIRank_generate': foreign45,
     'JavaScripts/ui-generate/Prefabs/玩家系统/UI/PlayerHp_generate': foreign46,
     'JavaScripts/ui-generate/Prefabs/玩家系统/UI/PlayerInfo_generate': foreign47,
     'JavaScripts/ui-generate/Prefabs/通知系统/UI/Notify_generate': foreign48,
     'JavaScripts/ui-generate/yaoshi_generate': foreign49,
     'JavaScripts/utils/UtilEx': foreign50,
     'JavaScripts/world-rank/RankData': foreign51,
     'JavaScripts/world-rank/RankItem': foreign52,
     'JavaScripts/world-rank/RankUI': foreign53,
     'JavaScripts/world-rank/WorldRank': foreign54,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2luZG93c05vRWRpdG9yL01XL0NvbnRlbnQvQnVpbGRUb29sL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9DaGVja1VJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvQ2hlY2tVSS50cyIsIi4uL0phdmFTY3JpcHRzL0lBQUNvcmUudHMiLCIuLi9KYXZhU2NyaXB0cy9Ub29scy50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFiRXZ0VUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdnRVSS50cyIsIi4uL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50TW9kdWxlLnRzIiwiLi4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQudHMiLCIuLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUkudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9kYWthaV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL0NsaWNrRXZlbnQudHMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFNwYXduLnRzIiwiLi4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTdGF0aWNBUEkudHMiLCIuLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJSZXBvcnQudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9NZXNzYWdlQm94X2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9jb21tb24vTWVzc2FnZUJveC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvVG9vbHMvSUFBVXRpbC50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBQ2xvdGgvSUFBQ2hhbmdlQ2xvdGgudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WNs+atu+Wdly9TY3JpcHQvUHJlZmFicy9EaWVBcmVhL0RpZUFyZWEudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL0RhdGEvV2VhcG9uQWN0aW9uLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9EYXRhL1dlYXBvbkNyb3NzLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy/lsITnur/mnqovVUkvUmF5R3VuVUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL1VJL1JheUd1blVJLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9NYW5hZ2VyL0d1bk1hbmFnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL1Rvb2xzL0Fzc2V0c0hlbHBlci50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMv5bCE57q/5p6qL1NjcmlwdC9QcmVmYWIvUmF5R3VuLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvVG9vbHMvTWFwRXgudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9VSS9VSVJhbmtfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9TY3JpcHQvUHJlZmFicy9Ub29scy9HcmlkTGF5b3V0LnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy/mjpLooYzmppzns7vnu58vVUkvVUlSYW5rSXRlbV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMv5o6S6KGM5qac57O757ufL1NjcmlwdC9QcmVmYWJzL1JhbmsvUmFua1VJSXRlbS50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMv5o6S6KGM5qac57O757ufL1NjcmlwdC9QcmVmYWJzL1JhbmsvUmFua1VJLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvUmFuay9SYW5rU3lzdGVtLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/njqnlrrbns7vnu58vU2NyaXB0L1ByZWZhYnMvUGxheWVyU3lzdGVtL1BsYXllclN5c3RlbS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv546p5a6257O757ufL1VJL1BsYXllckluZm9fZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vVUlQbGF5ZXJJbmZvLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy/njqnlrrbns7vnu58vVUkvUGxheWVySHBfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vVUlQbGF5ZXJTbGlkZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vUGxheWVyQ29tcG9uZW50LnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy/orrDlvZXngrnlip/og70vU2NyaXB0L1ByZWZhYnMvU3RhZ2VSZWNvcmQvU3RhZ2VSZWNvcmQudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+mAmuefpeezu+e7ny9VSS9Ob3RpZnlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+mAmuefpeezu+e7ny9TY3JpcHQvUHJlZmFicy9Ob3RpZnkvTm90aWZ5VUkudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+mAmuefpeezu+e7ny9TY3JpcHQvUHJlZmFicy9Ob3RpZnkvTm90aWZ5U3lzdGVtLnRzIiwiLi4vSmF2YVNjcmlwdHMvU2V0UExheWVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvU2hvd1dvcmxkVUkudHMiLCIuLi9KYXZhU2NyaXB0cy9UcmlnZ2VyV2luZC50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL3lhb3NoaV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3V0aWxzL1V0aWxFeC50cyIsIi4uL0phdmFTY3JpcHRzL3dvcmxkLXJhbmsvUmFua0RhdGEudHMiLCIuLi9KYXZhU2NyaXB0cy93b3JsZC1yYW5rL1JhbmtJdGVtLnRzIiwiLi4vSmF2YVNjcmlwdHMvd29ybGQtcmFuay9SYW5rVUkudHMiLCIuLi9KYXZhU2NyaXB0cy93b3JsZC1yYW5rL1dvcmxkUmFuay50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL1dpbmRvd3NOb0VkaXRvci9NVy9Db250ZW50L0J1aWxkVG9vbC9tdy12aXJ0dWFsLWVudHJ5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgZm9yZWlnbjAgZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0NoZWNrVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9DbGlja0V2ZW50JztcbmltcG9ydCAqIGFzIGZvcmVpZ24zIGZyb20gJy4vSmF2YVNjcmlwdHMvRGVmYXVsdFVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvSUFBQ29yZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNSBmcm9tICcuL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ242IGZyb20gJy4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bic7XG5pbXBvcnQgKiBhcyBmb3JlaWduNyBmcm9tICcuL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkU3RhdGljQVBJJztcbmltcG9ydCAqIGFzIGZvcmVpZ244IGZyb20gJy4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjkgZnJvbSAnLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdnRVSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTEgZnJvbSAnLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJSZXBvcnQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEyIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy9jb21tb24vTWVzc2FnZUJveCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTMgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQUNsb3RoL0lBQUNoYW5nZUNsb3RoJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNCBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvVG9vbHMvSUFBVXRpbCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTUgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WNs+atu+Wdly9TY3JpcHQvUHJlZmFicy9EaWVBcmVhL0RpZUFyZWEnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE2IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9EYXRhL1dlYXBvbkFjdGlvbic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTcgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL0RhdGEvV2VhcG9uQ3Jvc3MnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE4IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9NYW5hZ2VyL0d1bk1hbmFnZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE5IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9SYXlHdW4nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIwIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9Ub29scy9Bc3NldHNIZWxwZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIxIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9VSS9SYXlHdW5VSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9TY3JpcHQvUHJlZmFicy9SYW5rL1JhbmtTeXN0ZW0nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIzIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvUmFuay9SYW5rVUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI0IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvUmFuay9SYW5rVUlJdGVtJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yNSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMv5o6S6KGM5qac57O757ufL1NjcmlwdC9QcmVmYWJzL1Rvb2xzL0dyaWRMYXlvdXQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI2IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvVG9vbHMvTWFwRXgnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI3IGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/njqnlrrbns7vnu58vU2NyaXB0L1ByZWZhYnMvUGxheWVyU3lzdGVtL1BsYXllckNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjggZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vUGxheWVyU3lzdGVtJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yOSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMv546p5a6257O757ufL1NjcmlwdC9QcmVmYWJzL1BsYXllclN5c3RlbS9VSVBsYXllckluZm8nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMwIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/njqnlrrbns7vnu58vU2NyaXB0L1ByZWZhYnMvUGxheWVyU3lzdGVtL1VJUGxheWVyU2xpZGVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zMSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMv6K6w5b2V54K55Yqf6IO9L1NjcmlwdC9QcmVmYWJzL1N0YWdlUmVjb3JkL1N0YWdlUmVjb3JkJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zMiBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMv6YCa55+l57O757ufL1NjcmlwdC9QcmVmYWJzL05vdGlmeS9Ob3RpZnlTeXN0ZW0nO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMzIGZyb20gJy4vSmF2YVNjcmlwdHMvUHJlZmFicy/pgJrnn6Xns7vnu58vU2NyaXB0L1ByZWZhYnMvTm90aWZ5L05vdGlmeVVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zNCBmcm9tICcuL0phdmFTY3JpcHRzL1NldFBMYXllcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzUgZnJvbSAnLi9KYXZhU2NyaXB0cy9TaG93V29ybGRVSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzYgZnJvbSAnLi9KYXZhU2NyaXB0cy9Ub29scyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzcgZnJvbSAnLi9KYXZhU2NyaXB0cy9UcmlnZ2VyV2luZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMzggZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9DaGVja1VJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24zOSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL2Rha2FpX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MCBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNDEgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9NZXNzYWdlQm94X2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MiBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYkV2dFVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240MyBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv5bCE57q/5p6qL1VJL1JheUd1blVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NCBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv5o6S6KGM5qac57O757ufL1VJL1VJUmFua0l0ZW1fZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ1IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy/mjpLooYzmppzns7vnu58vVUkvVUlSYW5rX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NiBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv546p5a6257O757ufL1VJL1BsYXllckhwX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240NyBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv546p5a6257O757ufL1VJL1BsYXllckluZm9fZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjQ4IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy/pgJrnn6Xns7vnu58vVUkvTm90aWZ5X2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ240OSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL3lhb3NoaV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTAgZnJvbSAnLi9KYXZhU2NyaXB0cy91dGlscy9VdGlsRXgnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjUxIGZyb20gJy4vSmF2YVNjcmlwdHMvd29ybGQtcmFuay9SYW5rRGF0YSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNTIgZnJvbSAnLi9KYXZhU2NyaXB0cy93b3JsZC1yYW5rL1JhbmtJdGVtJztcbmltcG9ydCAqIGFzIGZvcmVpZ241MyBmcm9tICcuL0phdmFTY3JpcHRzL3dvcmxkLXJhbmsvUmFua1VJJztcbmltcG9ydCAqIGFzIGZvcmVpZ241NCBmcm9tICcuL0phdmFTY3JpcHRzL3dvcmxkLXJhbmsvV29ybGRSYW5rJztcbmV4cG9ydCBjb25zdCBNV01vZHVsZU1hcCA9IHsgXG4gICAgICdidWlsZCc6IGZvcmVpZ24wLFxuICAgICAnSmF2YVNjcmlwdHMvQ2hlY2tVSSc6IGZvcmVpZ24xLFxuICAgICAnSmF2YVNjcmlwdHMvQ2xpY2tFdmVudCc6IGZvcmVpZ24yLFxuICAgICAnSmF2YVNjcmlwdHMvRGVmYXVsdFVJJzogZm9yZWlnbjMsXG4gICAgICdKYXZhU2NyaXB0cy9JQUFDb3JlJzogZm9yZWlnbjQsXG4gICAgICdKYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllcic6IGZvcmVpZ241LFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bic6IGZvcmVpZ242LFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTdGF0aWNBUEknOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50JzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZSc6IGZvcmVpZ245LFxuICAgICAnSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZ0VUknOiBmb3JlaWduMTAsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJSZXBvcnQnOiBmb3JlaWduMTEsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL2NvbW1vbi9NZXNzYWdlQm94JzogZm9yZWlnbjEyLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9JQUFDbG90aC9JQUFDaGFuZ2VDbG90aCc6IGZvcmVpZ24xMyxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvVG9vbHMvSUFBVXRpbCc6IGZvcmVpZ24xNCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMv5Y2z5q275Z2XL1NjcmlwdC9QcmVmYWJzL0RpZUFyZWEvRGllQXJlYSc6IGZvcmVpZ24xNSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMv5bCE57q/5p6qL1NjcmlwdC9QcmVmYWIvRGF0YS9XZWFwb25BY3Rpb24nOiBmb3JlaWduMTYsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL0RhdGEvV2VhcG9uQ3Jvc3MnOiBmb3JlaWduMTcsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL01hbmFnZXIvR3VuTWFuYWdlcic6IGZvcmVpZ24xOCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMv5bCE57q/5p6qL1NjcmlwdC9QcmVmYWIvUmF5R3VuJzogZm9yZWlnbjE5LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy/lsITnur/mnqovU2NyaXB0L1ByZWZhYi9Ub29scy9Bc3NldHNIZWxwZXInOiBmb3JlaWduMjAsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+WwhOe6v+aeqi9TY3JpcHQvUHJlZmFiL1VJL1JheUd1blVJJzogZm9yZWlnbjIxLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvUmFuay9SYW5rU3lzdGVtJzogZm9yZWlnbjIyLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvUmFuay9SYW5rVUknOiBmb3JlaWduMjMsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9TY3JpcHQvUHJlZmFicy9SYW5rL1JhbmtVSUl0ZW0nOiBmb3JlaWduMjQsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9TY3JpcHQvUHJlZmFicy9Ub29scy9HcmlkTGF5b3V0JzogZm9yZWlnbjI1LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy/mjpLooYzmppzns7vnu58vU2NyaXB0L1ByZWZhYnMvVG9vbHMvTWFwRXgnOiBmb3JlaWduMjYsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vUGxheWVyQ29tcG9uZW50JzogZm9yZWlnbjI3LFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy/njqnlrrbns7vnu58vU2NyaXB0L1ByZWZhYnMvUGxheWVyU3lzdGVtL1BsYXllclN5c3RlbSc6IGZvcmVpZ24yOCxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMv546p5a6257O757ufL1NjcmlwdC9QcmVmYWJzL1BsYXllclN5c3RlbS9VSVBsYXllckluZm8nOiBmb3JlaWduMjksXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+eOqeWutuezu+e7ny9TY3JpcHQvUHJlZmFicy9QbGF5ZXJTeXN0ZW0vVUlQbGF5ZXJTbGlkZXInOiBmb3JlaWduMzAsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+iusOW9leeCueWKn+iDvS9TY3JpcHQvUHJlZmFicy9TdGFnZVJlY29yZC9TdGFnZVJlY29yZCc6IGZvcmVpZ24zMSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMv6YCa55+l57O757ufL1NjcmlwdC9QcmVmYWJzL05vdGlmeS9Ob3RpZnlTeXN0ZW0nOiBmb3JlaWduMzIsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL+mAmuefpeezu+e7ny9TY3JpcHQvUHJlZmFicy9Ob3RpZnkvTm90aWZ5VUknOiBmb3JlaWduMzMsXG4gICAgICdKYXZhU2NyaXB0cy9TZXRQTGF5ZXInOiBmb3JlaWduMzQsXG4gICAgICdKYXZhU2NyaXB0cy9TaG93V29ybGRVSSc6IGZvcmVpZ24zNSxcbiAgICAgJ0phdmFTY3JpcHRzL1Rvb2xzJzogZm9yZWlnbjM2LFxuICAgICAnSmF2YVNjcmlwdHMvVHJpZ2dlcldpbmQnOiBmb3JlaWduMzcsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9DaGVja1VJX2dlbmVyYXRlJzogZm9yZWlnbjM4LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvZGFrYWlfZ2VuZXJhdGUnOiBmb3JlaWduMzksXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUnOiBmb3JlaWduNDAsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9NZXNzYWdlQm94X2dlbmVyYXRlJzogZm9yZWlnbjQxLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFiRXZ0VUlfZ2VuZXJhdGUnOiBmb3JlaWduNDIsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+WwhOe6v+aeqi9VSS9SYXlHdW5VSV9nZW5lcmF0ZSc6IGZvcmVpZ240MyxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv5o6S6KGM5qac57O757ufL1VJL1VJUmFua0l0ZW1fZ2VuZXJhdGUnOiBmb3JlaWduNDQsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+aOkuihjOamnOezu+e7ny9VSS9VSVJhbmtfZ2VuZXJhdGUnOiBmb3JlaWduNDUsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+eOqeWutuezu+e7ny9VSS9QbGF5ZXJIcF9nZW5lcmF0ZSc6IGZvcmVpZ240NixcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMv546p5a6257O757ufL1VJL1BsYXllckluZm9fZ2VuZXJhdGUnOiBmb3JlaWduNDcsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9QcmVmYWJzL+mAmuefpeezu+e7ny9VSS9Ob3RpZnlfZ2VuZXJhdGUnOiBmb3JlaWduNDgsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS95YW9zaGlfZ2VuZXJhdGUnOiBmb3JlaWduNDksXG4gICAgICdKYXZhU2NyaXB0cy91dGlscy9VdGlsRXgnOiBmb3JlaWduNTAsXG4gICAgICdKYXZhU2NyaXB0cy93b3JsZC1yYW5rL1JhbmtEYXRhJzogZm9yZWlnbjUxLFxuICAgICAnSmF2YVNjcmlwdHMvd29ybGQtcmFuay9SYW5rSXRlbSc6IGZvcmVpZ241MixcbiAgICAgJ0phdmFTY3JpcHRzL3dvcmxkLXJhbmsvUmFua1VJJzogZm9yZWlnbjUzLFxuICAgICAnSmF2YVNjcmlwdHMvd29ybGQtcmFuay9Xb3JsZFJhbmsnOiBmb3JlaWduNTQsXG59XG4iXSwibmFtZXMiOlsiQ2hlY2tVSV9HZW5lcmF0ZSIsIlByZWZhYkV2dFVJX0dlbmVyYXRlIiwiTWFwRXgiLCJkYWthaV9HZW5lcmF0ZSIsIkRlZmF1bHRVSSIsIk1lc3NhZ2VCb3hfR2VuZXJhdGUiLCJSYXlHdW5VSV9HZW5lcmF0ZSIsIlVJUmFua0l0ZW1fR2VuZXJhdGUiLCJVSVJhbmtfR2VuZXJhdGUiLCJSYW5rVUkiLCJQbGF5ZXJDb21TZXJ2ZXIiLCJQbGF5ZXJJbmZvX0dlbmVyYXRlIiwiUGxheWVySHBfR2VuZXJhdGUiLCJOb3RpZnlfR2VuZXJhdGUiLCJSYW5rSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFzQ0E7QUFDTyxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUQsSUFBSSxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFB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LENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ04sQ0FBQSxFQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFHMUIsVUFBQSxDQUFBO0FBRE4sSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDN0IsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFHbEIsVUFBQSxDQUFBO0FBRE4sSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDNUMsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFHdkIsVUFBQSxDQUFBO0FBRE4sSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDN0MsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFHdEIsVUFBQSxDQUFBO0FBRE4sSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDL0MsQ0FBQSxFQUFBLGNBQUEsQ0FBQSxTQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFHcEIsVUFBQSxDQUFBO0FBRE4sSUFBQSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUs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Q0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFDM0MsUUFBQSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEQsUUFBQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUQsUUFBQSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUQsUUFBQSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDcEU7SUFFRCxXQUFXLEdBQUE7QUFDUCxRQUFBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZ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QUEsRUFBQSxZQUFBLENBQUEsU0FBQSxFQUFBLFlBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRzlCLFVBQUEsQ0FBQTtBQUROLElBQUEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztBQUN2QyxDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUdsQyxVQUFBLENBQUE7QUFETixJQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUN0QixDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxVQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUd4QixVQUFBLENBQUE7QUFETixJQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUN2QixDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxXQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUd2QixVQUFBLENBQUE7QUFETixJQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUN4QixDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxhQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUd6QixVQUFBLENBQUE7QUFETixJQUFBLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUN2QixDQUFBLEVBQUEsWUFBQSxDQUFBLFNBQUEsRUFBQSxjQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUcxQixVQUFB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aUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEQsU0FBQyxDQUFDLENBQUE7QUFDRixRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUc1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBSTtBQUNoQyxZQUFBLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDdkQsU0FBQyxDQUFDLENBQUE7QUFDRixRQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUcvRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBSTtBQUM5QixZQUFBLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDckQsU0FBQyxDQUFDLENBQUE7QUFDRixRQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUc3RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBSTtBQUMvQixZQUFBLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDdEQsU0FBQyxDQUFDLENBQUE7QUFDRixRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUc5RCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBSTtBQUM5QixZQUFBLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDckQsU0FBQyxDQUFDLENBQUE7QUFDRixRQUFBLElBQUksQ0FBQyxPQUFP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RUFBQTtBQUV0QixRQUFBLFNBQWdCLGFBQWEsQ0FBQyxDQUFhLEVBQUUsQ0FBYSxFQUFBO0FBQ3pELFlBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUM5QixZQUFBLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELFlBQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxZQUFBLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELFlBQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxZQUFBLE9BQU8sTUFBTSxDQUFDO1NB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QUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RSxZQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RSxZQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV6RSxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0I7QUFOZSxRQUFBLE1BQUEsQ0FBQSxXQUFXLGNBTTFCLENBQUE7QUFDRDs7Ozs7OztBQU9HO1FBQ0gsU0FBZ0IsV0FBVyxDQUFDLEVBQVcsRUFBRSxFQUFXLEVBQUUsRUFBVyxFQUFFLENBQVMsRUFBQTtBQUMzRSxZQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FB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
