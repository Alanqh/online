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
 * UI: UI/DefaultUI.ui
*/
let DefaultUI_Generate = class DefaultUI_Generate extends UIScript {
    get levelText() {
        if (!this.levelText_Internal && this.uiWidgetBase) {
            this.levelText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/levelText');
        }
        return this.levelText_Internal;
    }
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

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

class DefaultUI extends DefaultUI_Generate$1 {
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
        this.uiWidgetBase.findChildByPath('RootCanvas/levelText');
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
    refreshProgress(level) {
        this.levelText.text = level;
    }
    onAwake() {
        Event.addLocalListener("CheckPoint1", (checkPointTrigger) => {
            this.levelText.text = "2";
            console.log(123);
        });
        Event.addLocalListener("CheckPoint2", (checkPointTrigger) => {
            this.levelText.text = checkPointTrigger.pointNumber.toString();
            console.log(123);
        });
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

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI
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

var foreign2 = /*#__PURE__*/Object.freeze({
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

var foreign23 = /*#__PURE__*/Object.freeze({
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

var foreign5 = /*#__PURE__*/Object.freeze({
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

var foreign4 = /*#__PURE__*/Object.freeze({
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

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get PrefabEvent () { return PrefabEvent; }
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

var foreign6 = /*#__PURE__*/Object.freeze({
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

var foreign22 = /*#__PURE__*/Object.freeze({
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

var foreign7 = /*#__PURE__*/Object.freeze({
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

var foreign8 = /*#__PURE__*/Object.freeze({
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

var foreign11 = /*#__PURE__*/Object.freeze({
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

var foreign24 = /*#__PURE__*/Object.freeze({
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

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IAAUI: IAAUI
});

class S_RebornManager {
    constructor() {
        this._rebornPosition = new Vector(0, 0, 140);
        this.lastPointNumber = 0;
        this.checkPointMap = new Map();
    }
    static get instance() {
        if (S_RebornManager._instance == null) {
            S_RebornManager._instance = new S_RebornManager();
        }
        return S_RebornManager._instance;
    }
    async init() {
        this._deathTrigger = await GameObject.asyncFindGameObjectById("120E35DB");
        this._deathTrigger.onEnter.add((other) => {
            if (other instanceof Character) {
                let char = other;
                if (char == Player.localPlayer.character)
                    char.worldTransform.position = this._rebornPosition.clone();
            }
        });
        Event.addLocalListener("CheckPoint2", (checkPointTrigger) => {
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone();
            this.lastPointNumber = checkPointTrigger.pointNumber;
        });
        Event.addLocalListener("CheckPoint1", (checkPointTrigger) => {
            this._rebornPosition = checkPointTrigger.gameObject.worldTransform.position.clone();
            this.lastPointNumber = checkPointTrigger.pointNumber;
        });
    }
    charDeath(char) {
        // 开启布娃娃属性
        //char.ragdollEnabled = true
        this.charReborn(char);
    }
    charReborn(char) {
        char.worldTransform.position = this._rebornPosition.clone();
    }
    jumpToPoint(pointNumber = this.lastPointNumber + 1) {
        // 实现跳转 
        let checkPoint = this.checkPointMap.get(pointNumber);
        if (checkPoint) {
            Player.localPlayer.character.worldTransform.position = checkPoint.gameObject.worldTransform.position.clone();
        }
    }
}

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    S_RebornManager: S_RebornManager
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
            console.log("didi");
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
        if (this.jumpLevel) {
            S_RebornManager.instance.jumpToPoint();
        }
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

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: IAADeathBuff$1
});

let S_DeathBlock = class S_DeathBlock extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        let model = this.gameObject;
        model.onTouch.add((other) => {
            if (other instanceof Character) {
                S_RebornManager.instance.charDeath(other);
            }
        });
    }
};
S_DeathBlock = __decorate([
    Component
], S_DeathBlock);
var S_DeathBlock$1 = S_DeathBlock;

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: S_DeathBlock$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 * UI: UI/DontTrustUI.ui
*/
let DontTrustUI_Generate = class DontTrustUI_Generate extends UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
DontTrustUI_Generate = __decorate([
    UIBind('UI/DontTrustUI.ui')
], DontTrustUI_Generate);
var DontTrustUI_generate = DontTrustUI_Generate;

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DontTrustUI_generate
});

class S_DontTrustUI extends DontTrustUI_generate {
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
}

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: S_DontTrustUI
});

let S_DontTrustTrigger = class S_DontTrustTrigger extends Script {
    constructor() {
        super(...arguments);
        this.pointNumber = 2;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            let trigger = this.gameObject;
            trigger.onEnter.add(async (other) => {
                UIService.show(S_DontTrustUI);
                // DefaultUI.TextBlock1.text = "2"
                if (other instanceof Character) {
                    // 进入的角色 是否是 当前客户端角色
                    if (other == Player.localPlayer.character) {
                        // 本地事件通信（派发）
                        Event.dispatchToLocal("CheckPoint1", this);
                        EffectService.playAtPosition("4375", this.gameObject.worldTransform.position);
                    }
                }
            });
            trigger.onLeave.add(async (other) => {
                UIService.hide(S_DontTrustUI);
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
S_DontTrustTrigger = __decorate([
    Component
], S_DontTrustTrigger);
var S_DontTrustTrigger$1 = S_DontTrustTrigger;

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: S_DontTrustTrigger$1
});

let GameStart = class GameStart extends Script {
    async onStart() {
        if (SystemUtil.isClient()) {
            S_RebornManager.instance.init();
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

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

let S_NextTrigger$2 = class S_NextTrigger extends Script {
    constructor() {
        super(...arguments);
        this.pointNumber = 3;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            S_RebornManager.instance.checkPointMap.set(this.pointNumber, this);
            let trigger = this.gameObject;
            trigger.onEnter.add(async (other) => {
                // DefaultUI.TextBlock1.text = "2"
                if (other instanceof Character) {
                    // 进入的角色 是否是 当前客户端角色
                    if (other == Player.localPlayer.character) {
                        // 本地事件通信（派发）
                        Event.dispatchToLocal("CheckPoint2", this);
                        EffectService.playAtPosition("4375", this.gameObject.worldTransform.position);
                    }
                    if (this.pointNumber == -1) {
                        // 播放动作 
                        other.loadAnimation("14509").play();
                        // 播放特效 
                        EffectService.playAtPosition("142750", this.gameObject.worldTransform.position);
                        // 播放音效 
                        SoundService.playSound("47425");
                    }
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
__decorate([
    Property({ displayName: "序号" })
], S_NextTrigger$2.prototype, "pointNumber", void 0);
S_NextTrigger$2 = __decorate([
    Component
], S_NextTrigger$2);
var S_NextTrigger$3 = S_NextTrigger$2;

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: S_NextTrigger$3
});

let S_NextTrigger = class S_NextTrigger extends Script {
    constructor() {
        super(...arguments);
        this.pointNumber = 3;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            let trigger = this.gameObject;
            trigger.onEnter.add(async (other) => {
                // DefaultUI.TextBlock1.text = "2"
                if (other instanceof Character) {
                    // 进入的角色 是否是 当前客户端角色
                    if (other == Player.localPlayer.character) {
                        // 本地事件通信（派发）
                        Event.dispatchToLocal("CheckPoint2", this);
                        EffectService.playAtPosition("4375", this.gameObject.worldTransform.position);
                    }
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
__decorate([
    Property({ displayName: "序号" })
], S_NextTrigger.prototype, "pointNumber", void 0);
S_NextTrigger = __decorate([
    Component
], S_NextTrigger);
var S_NextTrigger$1 = S_NextTrigger;

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: S_NextTrigger$1
});

let TemporaryFloorTS = class TemporaryFloorTS extends Script {
    constructor() {
        super(...arguments);
        //设置脚本在属性面板中可以填入地板消失的时间
        this.HideTime = 1000;
        //设置脚本在属性面板中可以填入地板恢复的时间
        this.RecoveryTime = 1000;
    }
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        const trigger = this.gameObject;
        const mesh = trigger.getChildren();
        //当角色进入触发器时，地板在指定时间后消失
        trigger.onEnter.add((chara) => {
            if (chara instanceof Character) {
                setTimeout(() => {
                    mesh.forEach(element => {
                        element.setVisibility(PropertyStatus.Off, true);
                        element.setCollision(PropertyStatus.Off, true);
                    });
                }, this.HideTime);
            }
        });
        //当角色离开触发器时，地板在指定时间后恢复
        trigger.onLeave.add((chara) => {
            if (chara instanceof Character) {
                setTimeout(() => {
                    mesh.forEach(element => {
                        element.setVisibility(PropertyStatus.On, true);
                        element.setCollision(PropertyStatus.On, true);
                    });
                }, this.RecoveryTime);
            }
        });
    }
};
__decorate([
    Property({ displayName: "恢复时间", group: "必填" })
], TemporaryFloorTS.prototype, "HideTime", void 0);
__decorate([
    Property({ displayName: "恢复时间", group: "必填" })
], TemporaryFloorTS.prototype, "RecoveryTime", void 0);
TemporaryFloorTS = __decorate([
    Component
], TemporaryFloorTS);
var TemporaryFloorTS$1 = TemporaryFloorTS;

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: TemporaryFloorTS$1
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/DefaultUI': foreign1,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign2,
     'JavaScripts/prefabEvent/PrefabEvent': foreign3,
     'JavaScripts/prefabEvent/PrefabEventModule': foreign4,
     'JavaScripts/prefabEvent/PrefabEvtUI': foreign5,
     'JavaScripts/prefabEvent/PrefabReport': foreign6,
     'JavaScripts/Prefabs/common/MessageBox': foreign7,
     'JavaScripts/Prefabs/IAA/IAABuffManager': foreign8,
     'JavaScripts/Prefabs/IAA/IAADeathBuff': foreign9,
     'JavaScripts/Prefabs/IAA/IAAUI': foreign10,
     'JavaScripts/Prefabs/Tools/IAAUtil': foreign11,
     'JavaScripts/S_DeathBlock': foreign12,
     'JavaScripts/S_DontTrustTrigger': foreign13,
     'JavaScripts/S_DontTrustUI': foreign14,
     'JavaScripts/S_GameStart': foreign15,
     'JavaScripts/S_NextTrigger': foreign16,
     'JavaScripts/S_NextTrigger2': foreign17,
     'JavaScripts/S_RebornManager': foreign18,
     'JavaScripts/TemporaryFloorTS': foreign19,
     'JavaScripts/ui-generate/DefaultUI_generate': foreign20,
     'JavaScripts/ui-generate/DontTrustUI_generate': foreign21,
     'JavaScripts/ui-generate/MessageBox_generate': foreign22,
     'JavaScripts/ui-generate/PrefabEvtUI_generate': foreign23,
     'JavaScripts/ui-generate/Prefabs/IAA/IAAUI_generate': foreign24,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vTWV0YVdvcmxkL01XL0NvbnRlbnQvQnVpbGRUb29sL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUudHMiLCIuLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUkudHMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllci50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYkV2dFVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZ0VUkudHMiLCIuLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdmVudE1vZHVsZS50cyIsIi4uL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50LnRzIiwiLi4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiUmVwb3J0LnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWVzc2FnZUJveF9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvY29tbW9uL01lc3NhZ2VCb3gudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFCdWZmTWFuYWdlci50cyIsIi4uL0phdmFTY3JpcHRzL1ByZWZhYnMvVG9vbHMvSUFBVXRpbC50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYnMvSUFBL0lBQVVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvUHJlZmFicy9JQUEvSUFBVUkudHMiLCIuLi9KYXZhU2NyaXB0cy9TX1JlYm9ybk1hbmFnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFEZWF0aEJ1ZmYudHMiLCIuLi9KYXZhU2NyaXB0cy9TX0RlYXRoQmxvY2sudHMiLCIuLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9Eb250VHJ1c3RVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1NfRG9udFRydXN0VUkudHMiLCIuLi9KYXZhU2NyaXB0cy9TX0RvbnRUcnVzdFRyaWdnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9TX0dhbWVTdGFydC50cyIsIi4uL0phdmFTY3JpcHRzL1NfTmV4dFRyaWdnZXIudHMiLCIuLi9KYXZhU2NyaXB0cy9TX05leHRUcmlnZ2VyMi50cyIsIi4uL0phdmFTY3JpcHRzL1RlbXBvcmFyeUZsb29yVFMudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9NZXRhV29ybGQvTVcvQ29udGVudC9CdWlsZFRvb2wvbXctdmlydHVhbC1lbnRyeSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsImltcG9ydCAqIGFzIGZvcmVpZ24wIGZyb20gJy4vYnVpbGQnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEgZnJvbSAnLi9KYXZhU2NyaXB0cy9EZWZhdWx0VUknO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIgZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFBsYXllcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMyBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2ZW50JztcbmltcG9ydCAqIGFzIGZvcmVpZ240IGZyb20gJy4vSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjUgZnJvbSAnLi9KYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdnRVSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNiBmcm9tICcuL0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYlJlcG9ydCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNyBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvY29tbW9uL01lc3NhZ2VCb3gnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjggZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFCdWZmTWFuYWdlcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduOSBmcm9tICcuL0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQURlYXRoQnVmZic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFVSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTEgZnJvbSAnLi9KYXZhU2NyaXB0cy9QcmVmYWJzL1Rvb2xzL0lBQVV0aWwnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEyIGZyb20gJy4vSmF2YVNjcmlwdHMvU19EZWF0aEJsb2NrJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMyBmcm9tICcuL0phdmFTY3JpcHRzL1NfRG9udFRydXN0VHJpZ2dlcic7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTQgZnJvbSAnLi9KYXZhU2NyaXB0cy9TX0RvbnRUcnVzdFVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNSBmcm9tICcuL0phdmFTY3JpcHRzL1NfR2FtZVN0YXJ0JztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNiBmcm9tICcuL0phdmFTY3JpcHRzL1NfTmV4dFRyaWdnZXInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE3IGZyb20gJy4vSmF2YVNjcmlwdHMvU19OZXh0VHJpZ2dlcjInO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE4IGZyb20gJy4vSmF2YVNjcmlwdHMvU19SZWJvcm5NYW5hZ2VyJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xOSBmcm9tICcuL0phdmFTY3JpcHRzL1RlbXBvcmFyeUZsb29yVFMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIwIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRGVmYXVsdFVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RvbnRUcnVzdFVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMiBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL01lc3NhZ2VCb3hfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIzIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFiRXZ0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjI0IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy9JQUEvSUFBVUlfZ2VuZXJhdGUnO1xuZXhwb3J0IGNvbnN0IE1XTW9kdWxlTWFwID0geyBcbiAgICAgJ2J1aWxkJzogZm9yZWlnbjAsXG4gICAgICdKYXZhU2NyaXB0cy9EZWZhdWx0VUknOiBmb3JlaWduMSxcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJzogZm9yZWlnbjIsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJFdmVudCc6IGZvcmVpZ24zLFxuICAgICAnSmF2YVNjcmlwdHMvcHJlZmFiRXZlbnQvUHJlZmFiRXZlbnRNb2R1bGUnOiBmb3JlaWduNCxcbiAgICAgJ0phdmFTY3JpcHRzL3ByZWZhYkV2ZW50L1ByZWZhYkV2dFVJJzogZm9yZWlnbjUsXG4gICAgICdKYXZhU2NyaXB0cy9wcmVmYWJFdmVudC9QcmVmYWJSZXBvcnQnOiBmb3JlaWduNixcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvY29tbW9uL01lc3NhZ2VCb3gnOiBmb3JlaWduNyxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQUJ1ZmZNYW5hZ2VyJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9QcmVmYWJzL0lBQS9JQUFEZWF0aEJ1ZmYnOiBmb3JlaWduOSxcbiAgICAgJ0phdmFTY3JpcHRzL1ByZWZhYnMvSUFBL0lBQVVJJzogZm9yZWlnbjEwLFxuICAgICAnSmF2YVNjcmlwdHMvUHJlZmFicy9Ub29scy9JQUFVdGlsJzogZm9yZWlnbjExLFxuICAgICAnSmF2YVNjcmlwdHMvU19EZWF0aEJsb2NrJzogZm9yZWlnbjEyLFxuICAgICAnSmF2YVNjcmlwdHMvU19Eb250VHJ1c3RUcmlnZ2VyJzogZm9yZWlnbjEzLFxuICAgICAnSmF2YVNjcmlwdHMvU19Eb250VHJ1c3RVSSc6IGZvcmVpZ24xNCxcbiAgICAgJ0phdmFTY3JpcHRzL1NfR2FtZVN0YXJ0JzogZm9yZWlnbjE1LFxuICAgICAnSmF2YVNjcmlwdHMvU19OZXh0VHJpZ2dlcic6IGZvcmVpZ24xNixcbiAgICAgJ0phdmFTY3JpcHRzL1NfTmV4dFRyaWdnZXIyJzogZm9yZWlnbjE3LFxuICAgICAnSmF2YVNjcmlwdHMvU19SZWJvcm5NYW5hZ2VyJzogZm9yZWlnbjE4LFxuICAgICAnSmF2YVNjcmlwdHMvVGVtcG9yYXJ5Rmxvb3JUUyc6IGZvcmVpZ24xOSxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZSc6IGZvcmVpZ24yMCxcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RvbnRUcnVzdFVJX2dlbmVyYXRlJzogZm9yZWlnbjIxLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWVzc2FnZUJveF9nZW5lcmF0ZSc6IGZvcmVpZ24yMixcbiAgICAgJ0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL1ByZWZhYkV2dFVJX2dlbmVyYXRlJzogZm9yZWlnbjIzLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvUHJlZmFicy9JQUEvSUFBVUlfZ2VuZXJhdGUnOiBmb3JlaWduMjQsXG59XG4iXSwibmFtZXMiOlsiRGVmYXVsdFVJX0dlbmVyYXRlIiwiUHJlZmFiRXZ0VUlfR2VuZXJhdGUiLCJNZXNzYWdlQm94X0dlbmVyYXRlIiwiSUFBVUlfR2VuZXJhdGUiLCJTX05leHRUcmlnZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXNDQTtBQUNPLFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUMxRCxJQUFJLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNqSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkksU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdB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
