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
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    static async asyncRpcGetPlayer(playerId) {
        let player = Player.getPlayer(playerId);
        return Promise.resolve(player);
    }
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
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
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        if (!reult)
            return Promise.resolve(false);
        return new Promise((resolve, reject) => {
            let resultFun = () => {
                inter.onEnter.remove(resultFun);
                resolve(true);
            };
            inter.onEnter.add(resultFun);
        });
    }
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model) {
            obj.setOutline(false);
        }
    }
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(1, width / 2, height / 2);
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
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(1, Width / 2, Height / 2);
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
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, false, chara);
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
    static setMaterialColor(model, Index, InColor) {
        let materialList = model.getMaterialInstance();
        materialList[Index].getAllVectorParameterName().forEach((v, i) => {
            materialList[Index].setVectorParameterValue(v, InColor);
        });
    }
    static getMaterialColor(model, Index) {
        let materialList = model.getMaterialInstance();
        if (!(materialList.length > 0)) {
            return;
        }
        let nameList = materialList[Index].getAllVectorParameterName();
        return nameList.length > 0 ? materialList[Index].getVectorParameterValue(nameList[0]) : new LinearColor(1, 1, 1, 1);
    }
}

var foreign6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(RpcExtesionS, RpcExtesionC, null);
    }
    static isNpc(obj) {
        if ((obj instanceof Character) && obj.player == null) {
            return true;
        }
        return false;
    }
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
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    static changeBaseStanceExtesion(char, assetId) {
        if (!this.isUseRpc(true)) {
            if (assetId == "") {
                char.currentStance?.stop();
                return;
            }
            let basicStance = char.loadStance(assetId);
            basicStance.play();
        }
        else {
            let module = ModuleService.getModule(RpcExtesionC);
            module.playBasicStance(char.gameObjectId, assetId);
        }
    }
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            if (assetId == "") {
                char.currentSubStance?.stop();
                return;
            }
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
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
        if (owner.currentAnimation && owner.currentAnimation.assetId == assetId)
            owner.currentAnimation.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    static rpcPlayAnimationLocally(owner, assetId, AnimationLength = 0, loopCount = 1) {
        if (owner === undefined || owner === null)
            return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loopCount;
        anim.speed = AnimationLength === 0 ? 1 : this.getRate(anim.length / AnimationLength);
        anim.play();
        return anim;
    }
    static getRate(num) {
        return Math.round(num * 100) / 100;
    }
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}
class RpcExtesionC extends ModuleC {
    constructor() {
        super(...arguments);
        this.syncAnimation = null;
    }
    net_playerJoin(playerId) {
        if (this.localPlayerId == playerId)
            return;
        let char = this.localPlayer.character;
        let curAnimation = char.currentAnimation;
        if (!curAnimation)
            return;
        let ani = this.syncAnimation;
        if (ani && curAnimation.assetId == ani.assetId && ani.isPlaying) {
            this.server.net_playAnimationSync(char.gameObjectId, ani.assetId, ani.speed, ani.loop, ani.slot, playerId);
        }
    }
    playAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = myAnimation;
        }
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = null;
        }
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    playBasicStance(charGuid, basicStance) {
        this.server.net_playBasicStance(charGuid, basicStance);
    }
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(charGuid, myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(charGuid, stance.assetId);
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
class RpcExtesionS extends ModuleS {
    async net_playBasicStance(charGuid, basicStance) {
        let char = await GameObject.asyncFindGameObjectById(charGuid);
        char.loadStance(basicStance).play();
    }
    net_playAnimationSync(charGuid, assetId, rate, loop, slot, playerId = 0) {
        if (playerId != 0) {
            this.getClient(playerId).net_playAnimation(charGuid, assetId, rate, loop, slot);
            return;
        }
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
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(charGuid, assetId) {
        RpcStance.stopStance(charGuid, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(charGuid, assetid, blendMode) {
        RpcStance.playStance(charGuid, assetid, blendMode);
    }
    onPlayerEnterGame(player) {
        this.getAllClient().net_playerJoin(player.playerId);
    }
}
class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this._loop = 1;
        this._speed = 1;
        this._slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.ani.loop = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.ani.speed = value;
    }
    get slot() {
        return this._slot;
    }
    set slot(value) {
        this._slot = value;
        this.ani.slot = value;
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
        let module = ModuleService.getModule(RpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(RpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(RpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(RpcExtesionC);
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
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(this.owner.gameObjectId, this);
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
        if (blendMode != null)
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

var foreign4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

class mydata extends Subdata {
    /**初始化数据，当远端数据不存在时，会调用这个方法来初始化数据 */
    initDefaultData() {
        this.pro = 0;
        this.reborn = 0;
        this.cup = 0;
        this.score = 0;
        this.dressunlock = [];
        this.tailunlock = [];
        this.wingunlock = [];
        this.avaunlock = [];
    }
    /**版本升级开始 */
    onDataInit() {
        while (this.version != this.currentVersion) {
            switch (this.currentVersion) {
                case 1:
                    //假如数据版本还是1，那么就需要进行升级
                    this.currentVersion = 2;
                    //在升级的地方对新字段进行初始化
                    this.avaunlock = [];
                    break;
                default:
                    console.log("未处理的数据版本");
                    break;
            }
        }
    }
    //重写获取版本号的接口，通过该接口来指定版本号
    get version() {
        return 2;
    }
    /**版本升级结束 */
    /**增减数据 */
    change(dat, value, n) {
        //只要是n是1就是增减保存
        if (n === 1) {
            this[dat] += value;
        }
        else if (n === 0) {
            this[dat] = value;
        }
        // 修改完自动保存一次数据
        this.save(true);
    }
    changelock(word, value, n) {
        let unlock;
        if (word == "换装") {
            unlock = this.dressunlock;
        }
        else if (word == "拖尾") {
            unlock = this.tailunlock;
        }
        else if (word == "翅膀") {
            unlock = this.wingunlock;
        }
        else if (word == "变身") {
            unlock = this.avaunlock;
        }
        //只要n是1，就是增加数据
        if (n === 1) {
            unlock.push(value);
        }
        else if (n === 0) {
            unlock.length = 0;
        }
        // 修改完自动保存一次数据
        this.save(true);
        // console.log("执行了")
    }
    savedata() {
        this.save(true);
    }
}
__decorate([
    Decorator.persistence()
], mydata.prototype, "pro", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "reborn", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "cup", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "score", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "dressunlock", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "tailunlock", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "wingunlock", void 0);
__decorate([
    Decorator.persistence()
], mydata.prototype, "avaunlock", void 0);

var foreign8 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: mydata
});

/**
 * 模块S（服务端）
 */
class modS extends ModuleS {
    constructor() {
        super(...arguments);
        this.guanqiaid = "0854BF23"; //空锚点的id-关卡
        this.dressid = "3E71FEC7"; //空锚点的id-换装
        this.chuansongid = "277BF522"; //空锚点的id-传送门
        this.rebornid = "25AF5166"; //空锚点的id-重生
        this.hidenameid = "26A2FC77"; //空锚点的id-角色头顶名字-换装角色
        //收到测试按钮事件
        this.testact = true;
        //拖尾
        this.charTails = new Map();
        this.scenetail = [
            "145512", "145503", "145504", "145507", "145508",
            "145509", "145499", "145500", "145502", "145506",
            "145510", "145511", "145493", "145494", "145495",
            "145496", "145497", "145498", "145513", "145492",
            "151527",
            //没图标的↓
            "186344", "192273", "193220", "153603", "153613",
            "88824", "4399", "27392", "14317", "142959",
            "14318", "14319", "27447", "88441", "88442",
            "88443", "88444", "88021", "81694", "128512",
            "128513", "128514", "128515", "128516", "128517",
            "128518", "128521", "142933", "142957",
        ];
        //翅膀
        this.charWings = new Map();
        this.scenewing = [
            "42804", "42818", "42816", "42821", "42805",
            "42812", "42830", "42814", "42815", "42826",
            "136957", "136958", "136959", "136960", "136962",
            "136963", "136964", "136966", "145902", "145903",
            "145904", "145907", "145909", "145910", "145911",
            "145913", "177589", "145906", "145908", "145912",
            //没图标的↓
            "42803", "42806", "42808", "42810", "42819",
            "42820", "42807", "42809", "42811", "42813",
            // "", "", "", "", "",
            // "", "", "", "", "",
        ];
        this.Wingoffset = [
            new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
            new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, 50), new mw.Vector(0, 0, 50), new mw.Vector(0, 0, 50),
            new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
            new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 15), new mw.Vector(0, 0, 10),
            new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 5), new mw.Vector(0, 0, 10), new mw.Vector(0, 0, 0),
            new mw.Vector(0, 0, -5), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 15),
            //没图标的↓
            new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0), new mw.Vector(0, 0, 0),
            new mw.Vector(0, 0, 0), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20), new mw.Vector(0, 0, -20),
        ];
        this.Wingrotation = [
            new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
            new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
            new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180),
            new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 180),
            new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 180), new mw.Rotation(0, 0, 90),
            new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
            //没图标的↓
            new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
            new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90), new mw.Rotation(0, 0, 90),
        ];
        this.Wingscale = [
            new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
            new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2),
            new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
            new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(2, 2, 2), new mw.Vector(1, 1, 1),
            new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5),
            new mw.Vector(2, 2, 2), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1), new mw.Vector(1, 1, 1),
            //没图标的↓
            new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2), new mw.Vector(2, 2, 2),
            new mw.Vector(2, 2, 2), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5), new mw.Vector(1.5, 1.5, 1.5),
        ];
    }
    onStart() {
        //玩家进入房间时的事件
        // Player.onPlayerJoin.add((player: mw.Player) => {
        // })
        //玩家离开房间时的事件
        Player.onPlayerLeave.add((player) => {
            let uid = player.userId;
            //清空玩家身上的拖尾特效
            if (this.charTails.get(uid)) {
                EffectService.stop(this.charTails.get(uid));
                this.charTails.delete(uid);
            }
            //清空玩家身上的翅膀特效
            if (this.charWings.get(uid)) {
                EffectService.stop(this.charWings.get(uid));
                this.charWings.delete(uid);
            }
        });
        //收到客户端事件
        Event.addClientListener("客户端", (player, word, name, tnum) => {
            this.kehuduan(player, word, name, tnum);
        });
        //收到测试按钮事件
        Event.addClientListener("测试", (player, word, tword) => {
            this.testbtn(player, word, tword);
        });
        //注册换装触发器
        this.tipstrigger(this.dressid, "换装");
        //注册传送触发器
        this.tipstrigger(this.chuansongid, "下一关");
        //注册重生触发器
        this.tipstrigger(this.rebornid, "重生");
        //注册关卡触发器
        this.proTriggerEnter();
        //注册隐藏npc头顶的名字
        this.hidename();
    }
    //注册关卡触发器
    proTriggerEnter() {
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child;
                trigger.onEnter.add(async (other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other; //是的话，转成角色类型
                        let player = character.player;
                        //获取进度，只有大于当前才保存。
                        let Pdata = DataCenterS.getData(player, mydata);
                        let nowpro = Number(trigger.name);
                        if (Pdata.pro < nowpro) {
                            Pdata.change("pro", nowpro, 0); //替换
                            Pdata.change("cup", 1, 1);
                            Pdata.change("score", Pdata.reborn * 5 + 5, 1);
                            Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
                        }
                    }
                });
            }
        });
    }
    //注册换装触发器//注册传送触发器
    tipstrigger(sid, word) {
        GameObject.asyncFindGameObjectById(sid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child;
                trigger.onEnter.add((other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other; //是的话，转成角色类型
                        let player = character.player;
                        if (word == "换装") {
                            const Pdata = this.getPlayerData(player);
                            if (!Pdata.dressunlock) {
                                console.log("空");
                                return;
                            }
                            //先判断解锁了没，如果解锁了，提示是否使用
                            let lok = Pdata.dressunlock.indexOf(Number(trigger.name));
                            if (lok == -1) {
                                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                                if (Pdata.cup < 10) {
                                    //如果钱不够，提示看广告可以获得
                                    Event.dispatchToClient(player, "提示面板", "换装", trigger.name); //服务器发送给单个客户端
                                }
                                else {
                                    //提示是否花钱
                                    Event.dispatchToClient(player, "提示面板", "花钱换装", trigger.name); //服务器发送给单个客户端
                                }
                            }
                            else {
                                Event.dispatchToClient(player, "提示面板", "直接换装", trigger.name); //服务器发送给单个客户端
                            }
                            return;
                        }
                        else if (word == "下一关") {
                            const Pdata = this.getPlayerData(player);
                            GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                                let arr = go.getChildren();
                                for (let child of arr) {
                                    let nowpro = Number(child.name);
                                    if ((Pdata.pro + 1) == nowpro) {
                                        //改变玩家坐标
                                        let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                                        player.character.worldTransform.position = (pos);
                                        break;
                                    }
                                }
                            });
                            return;
                        }
                        Event.dispatchToClient(player, "提示面板", word, trigger.name); //服务器发送给单个客户端
                    }
                });
            }
        });
    }
    //注册隐藏npc头顶的名字
    hidename() {
        GameObject.asyncFindGameObjectById(this.hidenameid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                if (child instanceof mw.Pawn) {
                    let character = child;
                    character.displayName = "";
                }
            }
        });
    }
    //飞行
    async flying(player) {
        player.character.switchToFlying();
        for (let i = 10; i > -1; i--) {
            Event.dispatchToClient(player, "飞行倒计时", i); //服务器发送给单个客户端
            await TimeUtil.delaySecond(1); //等待1秒后继续执行
        }
        player.character.switchToWalking();
    }
    //收到客户端事件
    async kehuduan(player, word, name, tnum) {
        let Pdata = DataCenterS.getData(player, mydata); //获取数据
        if (word == "重生") {
            setTimeout(() => {
                Pdata.change("pro", 0, 0);
                Pdata.change("reborn", 1, 1);
                Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
            }, 900);
        }
        else if (word == "回城") {
            this.backhome(player);
        }
        else if (word == "换装c") {
            if (!Pdata.dressunlock) {
                console.log("空");
                return;
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.dressunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "换装", name); //服务器发送给单个客户端
                }
                else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱换装", name); //服务器发送给单个客户端
                }
            }
            else {
                Event.dispatchToClient(player, "提示面板", "直接换装", name); //服务器发送给单个客户端
            }
        }
        else if (word === "拖尾c") {
            if (!Pdata.tailunlock) {
                console.log("空");
                return;
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.tailunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "拖尾", name); //服务器发送给单个客户端
                }
                else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱拖尾", name); //服务器发送给单个客户端
                }
            }
            else {
                Event.dispatchToClient(player, "提示面板", "直接拖尾", name); //服务器发送给单个客户端
            }
        }
        else if (word === "翅膀c") {
            if (!Pdata.wingunlock) {
                console.log("空");
                return;
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.wingunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "翅膀", name); //服务器发送给单个客户端
                }
                else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱翅膀", name); //服务器发送给单个客户端
                }
            }
            else {
                Event.dispatchToClient(player, "提示面板", "直接翅膀", name); //服务器发送给单个客户端
            }
        }
        else if (word === "变身c") {
            if (!Pdata.avaunlock) {
                console.log("空");
                return;
            }
            //先判断解锁了没，如果解锁了，提示是否使用
            let lok = Pdata.avaunlock.indexOf(Number(name));
            if (lok == -1) {
                //如果没解锁，看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "变身", name); //服务器发送给单个客户端
                }
                else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱变身", name); //服务器发送给单个客户端
                }
            }
            else {
                Event.dispatchToClient(player, "提示面板", "直接变身", name); //服务器发送给单个客户端
            }
        }
        else if (word == "花钱换装") {
            Pdata.change("cup", -10, 1); //扣钱
            Pdata.changelock("换装", Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "换装", Number(name)); //服务器发送给单个客户端
        }
        else if (word == "换装") {
            Pdata.changelock(word, Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "换装", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "直接拖尾") {
            this.tuoweiS(player, name);
        }
        else if (word === "花钱拖尾") {
            Pdata.change("cup", -10, 1); //扣钱
            this.tuoweiS(player, name); //给拖尾
            Pdata.changelock("拖尾", Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "拖尾", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "拖尾") {
            this.tuoweiS(player, name);
            Pdata.changelock(word, Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "拖尾", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "直接翅膀") {
            this.chibangS(player, name);
        }
        else if (word === "花钱翅膀") {
            Pdata.change("cup", -10, 1); //扣钱
            this.chibangS(player, name); //给
            Pdata.changelock("翅膀", Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "翅膀", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "翅膀") {
            this.chibangS(player, name);
            Pdata.changelock(word, Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "翅膀", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "花钱变身") {
            Pdata.change("cup", -10, 1); //扣钱
            Pdata.changelock("变身", Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "变身", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "变身") {
            Pdata.changelock(word, Number(name), 1); //存解锁
            Event.dispatchToClient(player, "刷新商店标签", "变身", Number(name)); //服务器发送给单个客户端
        }
        else if (word === "加跳跃c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "加跳跃", name); //服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            }
            else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱加跳跃", name); //服务器发送给单个客户端
            }
        }
        else if (word === "飞行c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "飞行", name); //服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            }
            else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱飞行", name); //服务器发送给单个客户端
            }
        }
        else if (word === "加速度c") {
            //看钱够不够，如果够，提示是否花钱购买
            if (Pdata.cup < 10) {
                //如果钱不够，提示看广告可以获得
                Event.dispatchToClient(player, "提示面板", "加速度", name); //服务器发送给单个客户端
                // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
            }
            else {
                //提示是否花钱
                Event.dispatchToClient(player, "提示面板", "花钱加速度", name); //服务器发送给单个客户端
            }
        }
        else if (word == "下一关") {
            if (Pdata.pro < 165) {
                //看钱够不够，如果够，提示是否花钱购买
                if (Pdata.cup < 10) {
                    //如果钱不够，提示看广告可以获得
                    Event.dispatchToClient(player, "提示面板", "下一关", name); //服务器发送给单个客户端
                    // Event.dispatchToClient(player, "浮动提示", '需要 10 奖杯')//服务器发送给单个客户端
                }
                else {
                    //提示是否花钱
                    Event.dispatchToClient(player, "提示面板", "花钱下一关", name); //服务器发送给单个客户端
                }
            }
        }
        else if (word === "花钱加跳跃" || word === "花钱加速度" || word === "花钱下一关") {
            Pdata.change("cup", -10, 1); //扣钱
        }
        else if (word == "飞行") {
            this.flying(player);
        }
        else if (word == "花钱飞行") {
            Pdata.change("cup", -10, 1); //扣钱
            this.flying(player);
        }
        else if (word == "在线奖励") {
            let num = 1;
            Pdata.change("cup", num, 1); //扣钱
            Event.dispatchToClient(player, "浮动提示", '奖杯 + ' + num); //服务器发送给单个客户端
        }
        else if (word === "清除翅膀") {
            this.chibangClear(player);
        }
        Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
    }
    //回城
    backhome(player) {
        let Pdata = DataCenterS.getData(player, mydata);
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                let nowpro = Number(child.name);
                if (Pdata.pro == nowpro) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                    player.character.worldTransform.position = (pos);
                    player.character.movementEnabled = true; //移动
                    player.character.jumpEnabled = true; //跳跃
                    break;
                }
            }
        });
    }
    testbtn(player, word, tword) {
        if (this.testact) {
            this.testact = false;
            let Pdata = DataCenterS.getData(player, mydata); //获取数据
            if (word === "新手") {
                GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                    let arr = go.getChildren();
                    for (let child of arr) {
                        let nowpro = Number(child.name);
                        if (nowpro == 0) {
                            //改变玩家坐标
                            let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                            player.character.worldTransform.position = (pos);
                            break;
                        }
                    }
                });
                setTimeout(() => {
                    Pdata.change("pro", 0, 0);
                    Pdata.change("reborn", 0, 0);
                    Pdata.change("cup", 0, 0);
                    Pdata.change("score", 0, 0);
                    Pdata.changelock("换装", 0, 0);
                    Pdata.changelock("拖尾", 0, 0);
                    Pdata.changelock("翅膀", 0, 0);
                    player.character.gravityScale = 1;
                    player.character.maxWalkSpeed = 450;
                    player.character.maxJumpHeight = 150;
                    Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
                }, 900);
            }
            else if (word === "下一关") {
                Pdata.change("pro", Pdata.pro + 1, 0);
                this.backhome(player);
            }
            else if (word === "上一关") {
                GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                    let arr = go.getChildren();
                    for (let child of arr) {
                        let nowpro = Number(child.name);
                        if ((Pdata.pro - 1) == nowpro) {
                            //改变玩家坐标
                            let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                            player.character.worldTransform.position = (pos);
                            break;
                        }
                    }
                });
                setTimeout(() => {
                    if ((Pdata.pro - 1) >= 0) {
                        Pdata.change("pro", Pdata.pro - 1, 0);
                        Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
                    }
                }, 900);
            }
            else if (word === "跳关") {
                let nn = Number(tword);
                GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
                    let arr = go.getChildren();
                    for (let child of arr) {
                        let nowpro = Number(child.name);
                        if (nn == nowpro) {
                            //改变玩家坐标
                            let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                            player.character.worldTransform.position = (pos);
                            break;
                        }
                    }
                });
                setTimeout(() => {
                    if (nn >= 0) {
                        Pdata.change("pro", nn, 0);
                        Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
                    }
                }, 900);
            }
            else if (word === "加成") {
                player.character.switchToFlying();
                // player.character.maxWalkSpeed = 1200;
                // player.character.gravityScale = 0.8
                // player.character.maxJumpHeight = 250
            }
            else if (word === "B") {
                player.character.switchToWalking();
                Pdata.change("cup", 100, 0);
            }
            Event.dispatchToClient(player, "刷新关卡"); //服务器发送给单个客户端
            this.testact = true;
        }
    }
    tuoweiS(player, name) {
        let uid = player.userId;
        //清空玩家身上的拖尾特效
        if (this.charTails.get(uid)) {
            EffectService.stop(this.charTails.get(uid));
            this.charTails.delete(uid);
        }
        let TailGuid = this.scenetail[Number(name)]; //拖尾的id
        //在玩家身上创建一个拖尾
        let effid = GeneralManager.rpcPlayEffectOnPlayer(TailGuid, player, 12, 0); //12背部
        this.charTails.set(uid, effid); //加入map
    }
    chibangS(player, name) {
        let uid = player.userId;
        //清空玩家身上的翅膀特效
        if (this.charWings.get(uid)) {
            EffectService.stop(this.charWings.get(uid));
            this.charWings.delete(uid);
        }
        let wingGuid = this.scenewing[Number(name)]; //翅膀的id
        //在玩家身上创建一个翅膀
        let effid = GeneralManager.rpcPlayEffectOnPlayer(wingGuid, player, 12, 0, this.Wingoffset[Number(name)], this.Wingrotation[Number(name)], this.Wingscale[Number(name)]); //12背部
        this.charWings.set(uid, effid); //加入map
    }
    chibangClear(player) {
        let uid = player.userId;
        //清空玩家身上的翅膀特效
        if (this.charWings.get(uid)) {
            EffectService.stop(this.charWings.get(uid));
            this.charWings.delete(uid);
        }
    }
}

var foreign7 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    modS: modS
});

/**
 * 模块C（客户端）
 */
class modC extends ModuleC {
    constructor() {
        super(...arguments);
        this.guanqiaid = "0854BF23"; //空锚点的id-关卡
        this.deadid = "25227780"; //空锚点的id-死亡碰撞
        this.avaAction = false; //是否为宠物状态
        this.avaActioning = false; //是否为宠物状态动画循环中
        this.scenedress = [
            "02F7FEC041D94830FEA3338AC5EC5BE6", "E3AF5053412ABC1F4B8682B0AE7CC946", "9984D7834E891FA28CAA19B397F6478F", "F6B9E8BB4A04146BA51B3FA57EF122E9", "239E802B4D040C7FA9FBFE8198D1A99B",
            "5B003C8D49813547F729FBBE1242ECBF", "36CB6E2C4F4D25A7BEA69D9B3F596F57", "D6480C9C48347BDA019BCAACB1477C7C", "5355447A4A6DEB56726FFBB74A88530F", "CC43467746542876F89903A68EA76C98",
            "6C34A17942D610A260C298B7FBDDB96B", "756F1F674E4D6409B37AD491568A1DDF", "4804D10F4793F38E9FACE58E651BAC99", "0D88D36648935DC64E961AB169419C22", "C4E55E504C1BE3D5C6FC539C5FC9B1DD",
            "15B79C8746FC12A8BB474EA6F2A4434D", "80DB150D4384468E229E24A04B5D8A77", "98ADBF4F4D66AEC2534B15B31C3E2713", "9504EEA04E082A41A173EE96B894FCCD", "A6AE3B834ABC0D8C07B964B1AFED6975",
        ];
        this.DressIcon = [
            "123229", "114908", "101659", "170921", "123144",
            "146227", "114907", "169725", "170366", "114938",
            "114899", "114904", "183081", "114889", "183038",
            "183029", "183054", "114906", "165109", "114947",
        ];
        this.TailIcon = [
            "148843", "148845", "148831", "148834", "148836",
            "148844", "148835", "148825", "148824", "148826",
            "148829", "148828", "148833", "148839", "148827",
            "148840", "148837", "148830", "148841", "148838",
            "174364",
            //没图标的↓
            "159337", "159337", "159337", "159337", "159337",
            "159337", "159337", "159337", "159337", "159337",
            "159337", "159337", "159337", "159337", "159337",
            "159337", "159337", "159337", "159337", "159337",
            "159337", "159337", "159337", "159337", "159337",
            "159337", "159337", "159337", "159337",
        ];
        this.TailTxt = [
            "泡泡", "闪电", "雪花", "爆竹", "烟花",
            "礼物", "爱心", "骷髅", "香蕉", "亮闪",
            "钞票", "火焰", "足球", "彩虹", "糖果",
            "烟雾", "奖杯", "皇冠", "彩带", "螺丝",
            "彩烟",
            //没图标的↓
            "坨", "水", "羽毛", "泡光束", "彩光束",
            "彩条", "紫雷", "细彩虹", "黄烟", "绿烟",
            "火雾", "黑烟", "光粒", "紫光束", "红光束",
            "蓝瀑", "蓝光束", "紫星", "黄宝石", "乐曲",
            "星彩", "雪流光", "紫流光", "水流光", "粉流光",
            "光带", "泡流光", "水雾", "雪印",
        ];
        this.WingIcon = [
            "112150", "112145", "136692", "112141", "120646",
            "112143", "112138", "110639", "110638", "110679",
            "174376", "174374", "174373", "174330", "174382",
            "174347", "174326", "174380", "174366", "174339",
            "174341", "174342", "145999", "174360", "174375",
            "174353", "174371", "174331", "174327", "174379",
            //没图标的↓
            "120646", "120646", "120646", "120646", "120646",
            "120646", "120646", "120646", "120646", "120646",
            // "", "", "", "", "",
        ];
        this.WingTxt = [
            "火之翼", "水之翼", "闪耀之翼", "光之翼", "生命之翼",
            "圣光之翼", "火焰之翼", "蓝翎", "红翎", "黄翎",
            "红芒", "黑龙", "蜻蜓", "浪蝶", "小天使",
            "蓝芒", "诺", "蝙蝠", "大天使", "紫蝶",
            "蓝龙", "千叶蝶", "六翼", "粉天使", "神雀",
            "凤", "花蝶", "蓝天使", "灵蝶", "恶魔",
            //没图标的↓
            "蓝羽", "黄羽", "红羽", "绿羽", "紫羽",
            "黑羽", "紫灵", "墨灵", "蓝灵", "碧灵",
            // "", "", "", "", "",
        ];
        this.AvaIcon = [
            "160436", "160437", "160438", "160439", "193823",
            "76737", "76737", "76737", "76737", "76737",
            "76737", "76737", "76737", "76737", "76737",
            "76737", "76737", "76737", "76737", "76737",
            // "", "", "", "", "",//76737
        ];
        this.AvaTxt = [
            "樱花猫", "虎斑猫", "三花猫", "兔帽猫", "唐装熊猫",
            "粉猪", "小白狗", "小金毛", "斑点狗", "小白兔",
            "垂耳兔", "矮脚马", "变异三头狗", "头套白猫", "水手服猫",
            "无毛猫", "柴犬", "哈士奇", "萨摩耶", "粉衣猫",
            // "", "", "", "", "",
        ];
        this.AvaScene = [
            "159611", "160193", "160163", "160214", "174966",
            "159590", "159665", "159842", "159843", "160044",
            "160045", "174968", "174697", "160421", "160405",
            "160382", "160306", "160319", "160333", "160250",
            // "", "", "", "", "",
        ];
        //浮动提示
        this.fudongact = true;
    }
    onStart() {
        this.deadth();
    }
    //宠物动画循环
    avaloop() {
        if (!this.avaActioning) {
            this.avaActioning = true;
            let char = Player.localPlayer.character;
            AssetUtil.asyncDownloadAsset("181289"); //宠物动画
            let ani = PlayerManagerExtesion.loadAnimationExtesion(char, "181289", true);
            ani.loop = 1;
            // 创建并开始这个循环
            let inter = setInterval(() => {
                if (this.avaAction) {
                    // console.log("循环")
                    if (char.isMoving) { //判断是否在移动状态
                        if (!ani.isPlaying) {
                            ani.play();
                            // console.log("移动" + char.isMoving)
                        }
                    }
                }
                else {
                    // 结束这个循环
                    clearInterval(inter);
                    this.avaActioning = false;
                    // console.log("停止循环")
                }
            }, 500);
        }
    }
    //注册死亡碰撞
    deadth() {
        GameObject.asyncFindGameObjectById(this.deadid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                //为触发器绑定 有物体进入时 会触发的监听事件
                let trigger = child;
                trigger.onEnter.add((other) => {
                    //这里判断一下进入区域的物体是不是一名角色
                    if (PlayerManagerExtesion.isCharacter(other)) {
                        let character = other; //是的话，转成角色类型
                        let player = character.player;
                        let player2 = Player.localPlayer;
                        if (player == player2) {
                            Event.dispatchToServer("客户端", "回城", ""); //客户端给服务器发消息
                        }
                    }
                });
            }
        });
    }
    async fudongui(fudong, fdimg, fdtxt, word) {
        if (this.fudongact) {
            this.fudongact = false;
            await TimeUtil.delaySecond(0.1); //等待1秒后继续执行
            let len = word.length;
            fdimg.size = new mw.Vector2(len * 55, 100);
            fdimg.position = new mw.Vector2((1920 - len * 55) / 2, 0);
            let fdtxt2 = fdtxt;
            fdtxt2.text = word;
            fudong.visibility = mw.SlateVisibility.HitTestInvisible; //显示 可见不可交互
            for (let i = 25; i > 15; i--) {
                fudong.position = new mw.Vector2(0, i * 10);
                await TimeUtil.delaySecond(0.01); //等待1秒后继续执行
            }
            await TimeUtil.delaySecond(1.8); //等待1秒后继续执行
            fudong.visibility = mw.SlateVisibility.Hidden; //隐藏
            this.fudongact = true;
        }
    }
    //关闭UI
    uiClose(xui) {
        xui.visibility = mw.SlateVisibility.Collapsed; //隐藏
        Player.localPlayer.character.movementEnabled = true; //移动
    }
    //显示UI
    uiShow(xui) {
        xui.visibility = mw.SlateVisibility.Visible; //显示
        Player.localPlayer.character.movementEnabled = false; //移动
    }
    //换装
    changedress(w2) {
        let CharGuid = this.scenedress[Number(w2)];
        Player.asyncGetLocalPlayer().then((player) => {
            player.character.setDescription([CharGuid]);
            //将角色装扮同步给其他客户端
            player.character.syncDescription();
            this.avaAction = false;
        });
    }
    //变身
    changeava(w2) {
        let CharGuid = this.AvaScene[Number(w2)];
        Player.asyncGetLocalPlayer().then(async (player) => {
            player.character.description.base.wholeBody = CharGuid;
            this.avaAction = false;
            await TimeUtil.delaySecond(1); //等待1秒后继续执行
            this.avaAction = true;
            this.avaloop(); //宠物动作判断
            Event.dispatchToServer("客户端", "清除翅膀", ""); //客户端给服务器发消息
        });
    }
    //下一关
    nextpro() {
        let Pdata = DataCenterC.getData(mydata);
        let player = Player.localPlayer;
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                let nowpro = Number(child.name);
                if ((Pdata.pro + 1) == nowpro) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                    player.character.worldTransform.position = (pos);
                    break;
                }
            }
        });
    }
    //重生
    rebornpro() {
        let player = Player.localPlayer;
        GameObject.asyncFindGameObjectById(this.guanqiaid).then(go => {
            let arr = go.getChildren();
            for (let child of arr) {
                let nowpro = Number(child.name);
                if (nowpro == 0) {
                    //改变玩家坐标
                    let pos = child.worldTransform.position.add(new mw.Vector(0, 0, 200));
                    player.character.worldTransform.position = (pos);
                    break;
                }
            }
        });
        Event.dispatchToServer("客户端", "重生", ""); //客户端给服务器发消息
    }
    // 开始准备广告咯
    AdsForReward(word, w2) {
        if (word == "直接换装") {
            this.changedress(w2);
            return;
        }
        else if (word == "花钱换装") {
            this.changedress(w2);
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "直接翅膀" || word == "花钱翅膀") {
            if (this.avaAction) {
                Event.dispatchToLocal("浮动提示", "四足动物不能使用"); //客户端给服务器发消息
                return;
            }
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "直接拖尾" || word == "花钱拖尾" || word == "花钱飞行") {
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "花钱加跳跃") {
            Player.localPlayer.character.maxJumpHeight += 100;
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "花钱加速度") {
            Player.localPlayer.character.maxWalkSpeed += 200;
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "花钱下一关") {
            this.nextpro();
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        else if (word == "重生") {
            this.rebornpro();
            return;
        }
        else if (word == "直接变身") {
            this.changeava(w2);
            return;
        }
        else if (word == "花钱变身") {
            this.changeava(w2);
            Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
            return;
        }
        // return
        //---------------------------------------------------------
        mw.AdsService.isReady(mw.AdsType.Reward, (isReady) => {
            if (isReady) {
                if (word == "加跳跃") {
                    Player.localPlayer.character.maxJumpHeight += 100;
                }
                else if (word == "翅膀") {
                    if (this.avaAction) {
                        Event.dispatchToLocal("浮动提示", "四足动物不能使用"); //客户端给服务器发消息
                        return;
                    }
                    Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
                }
                else if (word == "拖尾") {
                    Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
                }
                else if (word == "加速度") {
                    Player.localPlayer.character.maxWalkSpeed += 200;
                }
                else if (word == "换装") {
                    this.changedress(w2);
                    Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
                }
                else if (word == "变身") {
                    this.changeava(w2);
                    Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
                }
                else if (word == "下一关") {
                    this.nextpro();
                }
                mw.AdsService.showAd(mw.AdsType.Reward, (isSuccess) => {
                    setTimeout(() => {
                        if (isSuccess) {
                            // 关闭界面看完了广告时的逻辑
                            if (word == "飞行") {
                                Event.dispatchToServer("客户端", word, w2); //客户端给服务器发消息
                            }
                        }
                    }, 500);
                });
            }
        });
    }
    //数字换算↓
    NumCon(num) {
        if (num < 1000) {
            return num.toString();
        }
        let ss = 0;
        let dd = "";
        if (num >= Math.pow(10, 3) && num < Math.pow(10, 6)) {
            ss = num / Math.pow(10, 3);
            dd = "K";
        }
        else if (num >= Math.pow(10, 6) && num < Math.pow(10, 9)) {
            ss = num / Math.pow(10, 6);
            dd = "M";
        }
        else if (num >= Math.pow(10, 9) && num < Math.pow(10, 12)) {
            ss = num / Math.pow(10, 9);
            dd = "G";
        }
        else if (num >= Math.pow(10, 12) && num < Math.pow(10, 15)) {
            ss = num / Math.pow(10, 12);
            dd = "T";
        }
        else if (num >= Math.pow(10, 15) && num < Math.pow(10, 18)) {
            ss = num / Math.pow(10, 15);
            dd = "P";
        }
        else if (num >= Math.pow(10, 18) && num < Math.pow(10, 21)) {
            ss = num / Math.pow(10, 18);
            dd = "E";
        }
        else if (num >= Math.pow(10, 21) && num < Math.pow(10, 24)) {
            ss = num / Math.pow(10, 21);
            dd = "Z";
        }
        else if (num >= Math.pow(10, 24) && num < Math.pow(10, 27)) {
            ss = num / Math.pow(10, 24);
            dd = "Y";
        }
        else if (num >= Math.pow(10, 27) && num < Math.pow(10, 30)) {
            ss = num / Math.pow(10, 27);
            dd = "B";
        }
        else if (num >= Math.pow(10, 30) && num < Math.pow(10, 33)) {
            ss = num / Math.pow(10, 30);
            dd = "KB";
        }
        else if (num >= Math.pow(10, 33) && num < Math.pow(10, 36)) {
            ss = num / Math.pow(10, 33);
            dd = "MB";
        }
        else if (num >= Math.pow(10, 36) && num < Math.pow(10, 39)) {
            ss = num / Math.pow(10, 36);
            dd = "GB";
        }
        else if (num >= Math.pow(10, 39) && num < Math.pow(10, 42)) {
            ss = num / Math.pow(10, 39);
            dd = "TB";
        }
        else if (num >= Math.pow(10, 42) && num < Math.pow(10, 45)) {
            ss = num / Math.pow(10, 42);
            dd = "PB";
        }
        else if (num >= Math.pow(10, 45) && num < Math.pow(10, 48)) {
            ss = num / Math.pow(10, 45);
            dd = "EB";
        }
        else if (num >= Math.pow(10, 48) && num < Math.pow(10, 51)) {
            ss = num / Math.pow(10, 48);
            dd = "ZB";
        }
        else if (num >= Math.pow(10, 51) && num < Math.pow(10, 54)) {
            ss = num / Math.pow(10, 51);
            dd = "YB";
        }
        else if (num >= Math.pow(10, 54) && num < Math.pow(10, 57)) {
            ss = num / Math.pow(10, 54);
            dd = "BB";
        }
        else if (num >= Math.pow(10, 57) && num < Math.pow(10, 60)) {
            ss = num / Math.pow(10, 57);
            dd = "KBB";
        }
        else if (num >= Math.pow(10, 60) && num < Math.pow(10, 63)) {
            ss = num / Math.pow(10, 60);
            dd = "MBB";
        }
        else if (num >= Math.pow(10, 63)) {
            return "∞";
        }
        let res = String(ss);
        let res2 = res.substring(0, 3);
        let res3 = res2.substring(res2.length - 1); //最后一个字符
        if (res3 === ".") {
            return res.substring(0, 2) + dd;
        }
        else {
            return res.substring(0, 3) + dd;
        }
    }
    //时间换算
    TimeConversion(timenum) {
        let strSec = "";
        let sec = Math.floor(timenum % 60);
        if (sec < 10) {
            strSec = "0" + sec;
        }
        else {
            strSec = String(sec);
        }
        let strMin = "";
        let min = Math.floor(timenum / 60 % 60);
        if (min < 10) {
            strMin = "0" + min;
        }
        else {
            strMin = String(min);
        }
        let uiTxt = strMin + ":" + strSec;
        return uiTxt;
    }
}

var foreign2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    modC: modC
});

/*
 * @Author: ao001.wu ao001.wu@appshahe.com
 * @Date: 2023-03-19 13:19:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-08-19 19:58:43
 * @FilePath: \RPCDemo\JavaScripts\RankMgr.ts
 * @Description:
 */
class RankMgr {
    constructor() {
        /**判断是否初始化，防止初始化多次 */
        this._isInit = false;
        /**维护在服务端的记录当前房间所有玩家分数的列表 */
        this._scoreDataList = [];
    }
    static get Instance() {
        if (RankMgr._instance == null) {
            RankMgr._instance = new RankMgr();
        }
        return RankMgr._instance;
    }
    /**初始化RankMgr */
    initRankMgr() {
        if (this._isInit) {
            return;
        }
        // 服务端监听玩家上下线
        if (SystemUtil.isServer()) {
            // 玩家上线，向分数列表创建该玩家的分数记录
            Player.onPlayerJoin.add((player) => {
                let uid = this.net_getuid(player);
                this._scoreDataList.push({ "playerID": uid, "nickname": "", "score": 0, "s2": 0, "s3": 0 });
            });
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "44", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "5", "score": 0, "s2": 0, "s3": 0 })
            // this._scoreDataList.push({ "playerID": "6676", "nickname": "55", "score": 0, "s2": 0, "s3": 0 })
            // 玩家下线，将该玩家的分数记录从列表中移除
            Player.onPlayerLeave.add((player) => {
                let index = this.getIndexByPlayerID(this.net_getuid(player));
                if (index != -1) {
                    this._scoreDataList.splice(index, 1);
                }
            });
            // 服务端开启数据自动同步
            this.serverOpenAutoSyncData();
        }
        if (SystemUtil.isClient()) {
            // 监听服务端同步过来的分数
            Event.addServerListener("SyncData", (enCodedataList) => {
                // 同步到分数后，将分数传给RankUI
                Event.dispatchToLocal("onScoreDataChange", enCodedataList);
            });
        }
        this._isInit = true;
    }
    /**服务端开始自动同步数据 */
    serverOpenAutoSyncData() {
        // 每500毫秒，向所有客户端发送服务端存储的分数列表（！这个同步频率不能太快,如需高频率同步，推荐使用Replicated）
        setInterval(() => {
            //获取所有玩家//更新玩家的数值
            Player.getAllPlayers().forEach((player) => {
                let Pdata = DataCenterS.getData(player, mydata);
                let nickname = player.character.displayName;
                nickname = nickname.substring(0, 6);
                let index = this.getIndexByPlayerID(this.net_getuid(player));
                if (Pdata && index != -1) {
                    this._scoreDataList[index].nickname = nickname;
                    this._scoreDataList[index].score = Pdata.score;
                    this._scoreDataList[index].s2 = Pdata.pro;
                    this._scoreDataList[index].s3 = Pdata.reborn;
                }
            });
            let enCodeDataList = [];
            for (let data of this._scoreDataList) {
                enCodeDataList.push(this.enCodeScoreData(data));
            }
            Event.dispatchToAllClient("SyncData", enCodeDataList);
        }, 1000);
    }
    /**将数据转化成string类型（方便进行RPC传输） */
    enCodeScoreData(data) {
        return data.playerID + "_" + data.nickname + "_" + data.score + "_" + data.s2 + "_" + data.s3;
    }
    /**通过playerID获取对应数据的index ,下线删除时候用*/
    getIndexByPlayerID(playerID) {
        for (let i = 0; i < this._scoreDataList.length; i++) {
            if (this._scoreDataList[i].playerID == playerID) {
                return i;
            }
        }
        return -1;
    }
    //获取玩家id
    net_getuid(player) {
        let uid = player.userId;
        return uid;
    }
}

var foreign11 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankMgr: RankMgr
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/在线排行/RankUI.ui
 * TIME: 2023.09.06-10.43.04
*/
let RankUI_Generate = class RankUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mtbtn = undefined;
        this.mScrollBox = undefined;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
__decorate([
    UIWidgetBind('RootCanvas/Canvas/mtbtn')
], RankUI_Generate.prototype, "mtbtn", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Canvas/mScrollBox')
], RankUI_Generate.prototype, "mScrollBox", void 0);
RankUI_Generate = __decorate([
    UIBind('UI/在线排行/RankUI.ui')
], RankUI_Generate);
var RankUI_Generate$1 = RankUI_Generate;

var foreign18 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/在线排行/RankItemUI.ui
 * TIME: 2023.09.06-10.43.04
*/
let RankItemUI_Generate = class RankItemUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.mRank_txt = undefined;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
__decorate([
    UIWidgetBind('RootCanvas/mRank_txt')
], RankItemUI_Generate.prototype, "mRank_txt", void 0);
RankItemUI_Generate = __decorate([
    UIBind('UI/在线排行/RankItemUI.ui')
], RankItemUI_Generate);
var RankItemUI_Generate$1 = RankItemUI_Generate;

var foreign17 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: RankItemUI_Generate$1
});

/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:42:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-08-19 20:01:14
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankItemUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:42:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-21 15:15:41
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankItemUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class RankItemUI extends RankItemUI_Generate$1 {
    /**根据数据刷新显示 */
    freshByData(index, nickname, score, s2, s3) {
        let ranknum = (index + 1).toString();
        let ss1 = ModuleService.getModule(modC).NumCon(score);
        let ss2 = ModuleService.getModule(modC).NumCon(s2);
        let ss3 = ModuleService.getModule(modC).NumCon(s3);
        this.mRank_txt.text = ranknum + " " + nickname + " - " + ss1 + " - " + ss2 + " - " + ss3;
    }
}

var foreign10 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankItemUI: RankItemUI
});

/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:40:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-23 11:11:58
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class RankUI extends RankUI_Generate$1 {
    constructor() {
        super(...arguments);
        /**Item列表，存储了显示的所有Item */
        this._allRankUIItem = [];
    }
    onAwake() {
        Event.addLocalListener("onScoreDataChange", (enCodeDataList) => {
            this.freshItemByData(enCodeDataList);
        });
        this.mtbtn.onClicked.add(() => {
            if (this.mScrollBox.visible) {
                this.mScrollBox.visibility = mw.SlateVisibility.Hidden; //隐藏
            }
            else {
                this.mScrollBox.visibility = mw.SlateVisibility.Visible; //显示
            }
        });
    }
    /**根据数据，刷新Item的显示 */
    freshItemByData(enCodeDataList) {
        // 获取玩家的数据
        let deCodeDataList = this.deCodeAndSortData(enCodeDataList);
        // 根据玩家数据的数量，算出是否需要创建新的Item
        let differenceValue = deCodeDataList.length - this._allRankUIItem.length;
        // 如果当前Item的数量小于玩家的数量，创建新的Item
        if (differenceValue > 0) {
            for (let i = 0; i < differenceValue; i++) {
                // 创建Item
                let rankItem = mw.createUI("在线排行/RankItemUI", RankItemUI);
                // 将Item添加到滑动框中
                this.mScrollBox.addChild(rankItem.uiObject);
                // 计算Item在滑动框中的位置
                rankItem.uiObject.position = new mw.Vector2(0, this._allRankUIItem.length * 50);
                this._allRankUIItem.push(rankItem);
            }
        }
        // 遍历所有Item，根据数据判断是否需要刷新数据，是否需要隐藏
        for (let index = 0; index < this._allRankUIItem.length; index++) {
            if (index < deCodeDataList.length) {
                this._allRankUIItem[index].setVisible(true);
                this._allRankUIItem[index].freshByData(index, deCodeDataList[index].nickname, deCodeDataList[index].score, deCodeDataList[index].s2, deCodeDataList[index].s3);
            }
            else {
                this._allRankUIItem[index].setVisible(false);
            }
        }
    }
    /**将数据还原为键值对形式，并排序 */
    deCodeAndSortData(enCodeDataList) {
        let deCodeList = [];
        for (let enCode of enCodeDataList) {
            let deCode = enCode.split("_");
            deCodeList.push({ "playerID": String(deCode[0]), "nickname": String(deCode[1]), "score": Number(deCode[2]), "s2": Number(deCode[3]), "s3": Number(deCode[4]) });
        }
        deCodeList.sort((a, b) => { return b.score - a.score; });
        return deCodeList;
    }
}

var foreign12 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    RankUI: RankUI
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/BagItemUI.ui
 * TIME: 2023.09.06-10.43.04
*/
let BagItemUI_Generate = class BagItemUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.lock = undefined;
        this.icon = undefined;
        this.txt = undefined;
        this.btn = undefined;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
__decorate([
    UIWidgetBind('RootCanvas/lock')
], BagItemUI_Generate.prototype, "lock", void 0);
__decorate([
    UIWidgetBind('RootCanvas/icon')
], BagItemUI_Generate.prototype, "icon", void 0);
__decorate([
    UIWidgetBind('RootCanvas/txt')
], BagItemUI_Generate.prototype, "txt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/btn')
], BagItemUI_Generate.prototype, "btn", void 0);
BagItemUI_Generate = __decorate([
    UIBind('UI/BagItemUI.ui')
], BagItemUI_Generate);
var BagItemUI_Generate$1 = BagItemUI_Generate;

var foreign13 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: BagItemUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/MainUI.ui
 * TIME: 2023.09.06-10.43.04
*/
let MainUI_Generate = class MainUI_Generate extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.protxt = undefined;
        this.pro = undefined;
        this.flytxt = undefined;
        this.olbtxt = undefined;
        this.olbtn = undefined;
        this.skip = undefined;
        this.fly = undefined;
        this.addspeed = undefined;
        this.addjump = undefined;
        this.cuptxt = undefined;
        this.test = undefined;
        this.b1 = undefined;
        this.b2 = undefined;
        this.b3 = undefined;
        this.b4 = undefined;
        this.b5 = undefined;
        this.in1 = undefined;
        this.b6 = undefined;
        this.idtxt = undefined;
        this.dress = undefined;
        this.tail = undefined;
        this.wing = undefined;
        this.ava = undefined;
        this.home = undefined;
        this.dressp = undefined;
        this.dressclose = undefined;
        this.dressc = undefined;
        this.tailp = undefined;
        this.tailclose = undefined;
        this.tailc = undefined;
        this.wingp = undefined;
        this.wingclose = undefined;
        this.wingc = undefined;
        this.avap = undefined;
        this.avaclose = undefined;
        this.avac = undefined;
        this.fudong = undefined;
        this.fdimg = undefined;
        this.fdtxt = undefined;
        this.tips = undefined;
        this.tiptxt = undefined;
        this.tipclose = undefined;
        this.tipok = undefined;
    }
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
__decorate([
    UIWidgetBind('RootCanvas/Top/protxt')
], MainUI_Generate.prototype, "protxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Top/pro')
], MainUI_Generate.prototype, "pro", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Top/flytxt')
], MainUI_Generate.prototype, "flytxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Online/olbtxt')
], MainUI_Generate.prototype, "olbtxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Online/olbtn')
], MainUI_Generate.prototype, "olbtn", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Show/Move_3/skip')
], MainUI_Generate.prototype, "skip", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Show/Move_3_1/fly')
], MainUI_Generate.prototype, "fly", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Show/Move_3_2/addspeed')
], MainUI_Generate.prototype, "addspeed", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Show/Move_3_3/addjump')
], MainUI_Generate.prototype, "addjump", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Show/Move_3_3_1/cuptxt')
], MainUI_Generate.prototype, "cuptxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test')
], MainUI_Generate.prototype, "test", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b1')
], MainUI_Generate.prototype, "b1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b2')
], MainUI_Generate.prototype, "b2", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b3')
], MainUI_Generate.prototype, "b3", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b4')
], MainUI_Generate.prototype, "b4", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b5')
], MainUI_Generate.prototype, "b5", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/in1')
], MainUI_Generate.prototype, "in1", void 0);
__decorate([
    UIWidgetBind('RootCanvas/test/b6')
], MainUI_Generate.prototype, "b6", void 0);
__decorate([
    UIWidgetBind('RootCanvas/idtxt')
], MainUI_Generate.prototype, "idtxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Down/Move_3/dress')
], MainUI_Generate.prototype, "dress", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Down/Move_3_1/tail')
], MainUI_Generate.prototype, "tail", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Down/Move_3_2/wing')
], MainUI_Generate.prototype, "wing", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Down/Move_3_2_1_1/ava')
], MainUI_Generate.prototype, "ava", void 0);
__decorate([
    UIWidgetBind('RootCanvas/Right/Move_3/home')
], MainUI_Generate.prototype, "home", void 0);
__decorate([
    UIWidgetBind('RootCanvas/dressp')
], MainUI_Generate.prototype, "dressp", void 0);
__decorate([
    UIWidgetBind('RootCanvas/dressp/dressclose')
], MainUI_Generate.prototype, "dressclose", void 0);
__decorate([
    UIWidgetBind('RootCanvas/dressp/ScrollBox/dressc')
], MainUI_Generate.prototype, "dressc", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tailp')
], MainUI_Generate.prototype, "tailp", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tailp/tailclose')
], MainUI_Generate.prototype, "tailclose", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tailp/ScrollBox/tailc')
], MainUI_Generate.prototype, "tailc", void 0);
__decorate([
    UIWidgetBind('RootCanvas/wingp')
], MainUI_Generate.prototype, "wingp", void 0);
__decorate([
    UIWidgetBind('RootCanvas/wingp/wingclose')
], MainUI_Generate.prototype, "wingclose", void 0);
__decorate([
    UIWidgetBind('RootCanvas/wingp/ScrollBox/wingc')
], MainUI_Generate.prototype, "wingc", void 0);
__decorate([
    UIWidgetBind('RootCanvas/avap')
], MainUI_Generate.prototype, "avap", void 0);
__decorate([
    UIWidgetBind('RootCanvas/avap/avaclose')
], MainUI_Generate.prototype, "avaclose", void 0);
__decorate([
    UIWidgetBind('RootCanvas/avap/ScrollBox/avac')
], MainUI_Generate.prototype, "avac", void 0);
__decorate([
    UIWidgetBind('RootCanvas/fudong')
], MainUI_Generate.prototype, "fudong", void 0);
__decorate([
    UIWidgetBind('RootCanvas/fudong/fdimg')
], MainUI_Generate.prototype, "fdimg", void 0);
__decorate([
    UIWidgetBind('RootCanvas/fudong/fdtxt')
], MainUI_Generate.prototype, "fdtxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tips')
], MainUI_Generate.prototype, "tips", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tips/tiptxt')
], MainUI_Generate.prototype, "tiptxt", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tips/tipclose')
], MainUI_Generate.prototype, "tipclose", void 0);
__decorate([
    UIWidgetBind('RootCanvas/tips/tipok')
], MainUI_Generate.prototype, "tipok", void 0);
MainUI_Generate = __decorate([
    UIBind('UI/MainUI.ui')
], MainUI_Generate);
var MainUI_Generate$1 = MainUI_Generate;

var foreign15 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: MainUI_Generate$1
});

class UIs extends MainUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.maxpro = 165;
        //-----------------在线奖励倒计时------------------------------
        this.olcanget = true;
        this.dressGoods = [];
        this.tailGoods = [];
        this.wingGoods = [];
        this.avaGoods = [];
    }
    async onStart() {
        await DataCenterC.ready(); //等待数据加载
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        //----------左下角测试面板------------------------
        // this.test.visibility = mw.SlateVisibility.Visible//显示
        //-----------------生成商店内容------------------------------
        //换装面板
        const info = ModuleService.getModule(modC).DressIcon;
        for (let k in info) {
            const item = this.bagspawn(this.dressc);
            item.uiObject.size = new mw.Vector2(220, 220);
            item.setDress(parseInt(k)); //整数
            this.dressGoods.push(item); //存到表里
            this.bagRefresh("换装", item);
        }
        this.dress.onClicked.add(() => {
            if (this.dressp.visible) {
                ModuleService.getModule(modC).uiClose(this.dressp); //关闭UI
            }
            else {
                ModuleService.getModule(modC).uiShow(this.dressp); //显示UI
            }
        });
        this.dressclose.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.dressp); //关闭UI
        });
        //拖尾面板
        const info2 = ModuleService.getModule(modC).TailIcon;
        for (let k in info2) {
            const item = this.bagspawn(this.tailc);
            item.uiObject.size = new mw.Vector2(220, 220);
            item.setTail(parseInt(k)); //整数
            this.tailGoods.push(item); //存到表里
            this.bagRefresh("拖尾", item);
        }
        this.tail.onClicked.add(() => {
            if (this.tailp.visible) {
                ModuleService.getModule(modC).uiClose(this.tailp); //关闭UI
            }
            else {
                ModuleService.getModule(modC).uiShow(this.tailp); //显示UI
            }
        });
        this.tailclose.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.tailp); //关闭UI
        });
        //翅膀面板
        const info3 = ModuleService.getModule(modC).WingIcon;
        for (let k in info3) {
            const item = this.bagspawn(this.wingc);
            item.uiObject.size = new mw.Vector2(220, 220);
            item.setWing(parseInt(k)); //整数
            this.wingGoods.push(item); //存到表里
            this.bagRefresh("翅膀", item);
        }
        this.wing.onClicked.add(() => {
            if (this.wingp.visible) {
                ModuleService.getModule(modC).uiClose(this.wingp); //关闭UI
            }
            else {
                ModuleService.getModule(modC).uiShow(this.wingp); //显示UI
            }
        });
        this.wingclose.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.wingp); //关闭UI
        });
        //变身面板
        const info5 = ModuleService.getModule(modC).AvaIcon;
        for (let k in info5) {
            const item = this.bagspawn(this.avac);
            item.uiObject.size = new mw.Vector2(220, 220);
            item.setAva(parseInt(k)); //整数
            this.avaGoods.push(item); //存到表里
            this.bagRefresh("变身", item);
        }
        this.ava.onClicked.add(() => {
            if (this.avap.visible) {
                ModuleService.getModule(modC).uiClose(this.avap); //关闭UI
            }
            else {
                ModuleService.getModule(modC).uiShow(this.avap); //显示UI
            }
        });
        this.avaclose.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.avap); //关闭UI
        });
        //-----------------刷新商店------------------------------
        Event.addServerListener("刷新商店标签", (word, num) => {
            let Goods;
            if (word == "换装") {
                Goods = this.dressGoods;
            }
            else if (word == "拖尾") {
                Goods = this.tailGoods;
            }
            else if (word == "翅膀") {
                Goods = this.wingGoods;
            }
            else if (word == "变身") {
                Goods = this.avaGoods;
            }
            Goods[num].lock.visibility = mw.SlateVisibility.HitTestInvisible; //可见不可交互
        });
        //-----------------刷新关卡------------------------------
        this.updatatxt();
        Event.dispatchToServer("客户端", "回城", ""); //客户端给服务器发消息
        Event.addServerListener("刷新关卡", () => {
            this.updatatxt();
        });
        //-----------------浮动提示------------------------------
        let fdlist = [];
        let fdact = true;
        Event.addServerListener("浮动提示", async (word) => {
            fdlist.push(word);
            if (fdact) {
                fdact = false;
                do {
                    ModuleService.getModule(modC).fudongui(this.fudong, this.fdimg, this.fdtxt, fdlist[0]); //浮动提示
                    fdlist.splice(0, 1); //删除，第一个是位置，第二个是位置之后几项，第3,4,5是替换的内容
                    await TimeUtil.delaySecond(2.1); //等待1秒后继续执行
                } while (fdlist.length > 0);
                fdact = true;
            }
        });
        Event.addLocalListener("浮动提示", async (word) => {
            fdlist.push(word);
            if (fdact) {
                fdact = false;
                do {
                    ModuleService.getModule(modC).fudongui(this.fudong, this.fdimg, this.fdtxt, fdlist[0]); //浮动提示
                    fdlist.splice(0, 1); //删除，第一个是位置，第二个是位置之后几项，第3,4,5是替换的内容
                    await TimeUtil.delaySecond(2.1); //等待1秒后继续执行
                } while (fdlist.length > 0);
                fdact = true;
            }
        });
        //-----------------提示面板------------------------------
        let t1 = "";
        let t2 = "";
        let adshow = true;
        this.tips.visibility = mw.SlateVisibility.Hidden; //隐藏
        this.tipclose.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.tips); //关闭UI
        });
        this.tipok.onClicked.add(() => {
            ModuleService.getModule(modC).uiClose(this.tips); //关闭UI
            if (adshow) {
                ModuleService.getModule(modC).AdsForReward(t1, t2); //触发广告
            }
        });
        Event.addServerListener("提示面板", (word, w2) => {
            adshow = true;
            if (word == "加跳跃") {
                this.tiptxt.text = "看广告后，跳跃+100。（可以重复观看，每次都会增加）";
            }
            else if (word == "花钱加跳跃") {
                this.tiptxt.text = "是否花费 10 奖杯，跳跃+100。（可以重复观看，每次都会增加）";
            }
            else if (word == "飞行") {
                this.tiptxt.text = "看广告后，可持续飞行10秒。";
            }
            else if (word == "花钱飞行") {
                this.tiptxt.text = "是否花费 10 奖杯，可持续飞行10秒。";
            }
            else if (word == "加速度") {
                this.tiptxt.text = "看广告后，移动速度+200。（可以重复观看，每次都会增加）";
            }
            else if (word == "花钱加速度") {
                this.tiptxt.text = "是否花费 10 奖杯，，移动速度+200。（可以重复观看，每次都会增加）";
            }
            else if (word == "换装") {
                this.tiptxt.text = "看广告后，就可以获得这个装扮！";
                ModuleService.getModule(modC).uiClose(this.dressp); //关闭UI
            }
            else if (word == "直接换装") {
                this.tiptxt.text = "点击确定，就可以使用这个装扮！";
                ModuleService.getModule(modC).uiClose(this.dressp); //关闭UI
            }
            else if (word == "花钱换装") {
                this.tiptxt.text = "是否花费 10 奖杯，购买这个装扮！";
                ModuleService.getModule(modC).uiClose(this.dressp); //关闭UI
            }
            else if (word == "拖尾") {
                this.tiptxt.text = "看广告后，就可以获得这个拖尾！";
                ModuleService.getModule(modC).uiClose(this.tailp); //关闭UI
            }
            else if (word == "直接拖尾") {
                this.tiptxt.text = "点击确定，就可以使用这个拖尾！";
                ModuleService.getModule(modC).uiClose(this.tailp); //关闭UI
            }
            else if (word == "花钱拖尾") {
                this.tiptxt.text = "是否花费 10 奖杯，购买这个拖尾！";
                ModuleService.getModule(modC).uiClose(this.tailp); //关闭UI
            }
            else if (word == "翅膀") {
                this.tiptxt.text = "看广告后，就可以获得这个翅膀！";
                ModuleService.getModule(modC).uiClose(this.wingp); //关闭UI
            }
            else if (word == "直接翅膀") {
                this.tiptxt.text = "点击确定，就可以使用这个翅膀！";
                ModuleService.getModule(modC).uiClose(this.wingp); //关闭UI
            }
            else if (word == "花钱翅膀") {
                this.tiptxt.text = "是否花费 10 奖杯，购买这个翅膀！";
                ModuleService.getModule(modC).uiClose(this.wingp); //关闭UI
            }
            else if (word == "变身") {
                this.tiptxt.text = "看广告后，就可以获得这个装扮！";
                ModuleService.getModule(modC).uiClose(this.avap); //关闭UI
            }
            else if (word == "直接变身") {
                this.tiptxt.text = "点击确定，就可以使用这个装扮！";
                ModuleService.getModule(modC).uiClose(this.avap); //关闭UI
            }
            else if (word == "花钱变身") {
                this.tiptxt.text = "是否花费 10 奖杯，购买这个装扮！";
                ModuleService.getModule(modC).uiClose(this.avap); //关闭UI
            }
            else if (word == "下一关") {
                this.tiptxt.text = "看广告后，就可以到达下一关！";
            }
            else if (word == "花钱下一关") {
                this.tiptxt.text = "是否花费 10 奖杯，到达下一关！";
            }
            else if (word == "重生") {
                this.tiptxt.text = "点击确定，重生+1，并回到初始点！";
            }
            t1 = word;
            t2 = w2;
            ModuleService.getModule(modC).uiShow(this.tips); //显示UI
        });
        //-----------------加跳跃按钮------------------------------
        this.addjump.onClicked.add(() => {
            Event.dispatchToServer("客户端", "加跳跃c", ""); //客户端给服务器发消息
        });
        //-----------------飞行按钮------------------------------
        this.fly.onClicked.add(() => {
            if (this.flytxt.text == "") {
                Event.dispatchToServer("客户端", "飞行c", ""); //客户端给服务器发消息
            }
        });
        Event.addServerListener("飞行倒计时", (num) => {
            if (num < 1) {
                this.flytxt.text = "";
            }
            else {
                this.flytxt.text = "飞行倒计时 " + String(num);
            }
        });
        //-----------------加速度按钮------------------------------
        this.addspeed.onClicked.add(() => {
            Event.dispatchToServer("客户端", "加速度c", ""); //客户端给服务器发消息
        });
        //-----------------跳关------------------------------
        this.skip.onClicked.add(() => {
            Event.dispatchToServer("客户端", "下一关", ""); //客户端给服务器发消息
        });
        //-----------------回城------------------------------
        this.home.onClicked.add(() => {
            Event.dispatchToServer("客户端", "回城", ""); //客户端给服务器发消息
        });
        //-----------------测试按钮------------------------------
        this.b1.onClicked.add(() => {
            Event.dispatchToServer("测试", "新手"); //客户端给服务器发消息
        });
        this.b2.onClicked.add(() => {
            Event.dispatchToServer("测试", "下一关"); //客户端给服务器发消息
        });
        this.b3.onClicked.add(() => {
            Event.dispatchToServer("测试", "上一关"); //客户端给服务器发消息
        });
        this.b4.onClicked.add(() => {
            let nn = this.in1.text;
            Event.dispatchToServer("测试", "跳关", nn); //客户端给服务器发消息
        });
        this.b5.onClicked.add(() => {
            Event.dispatchToServer("测试", "加成"); //客户端给服务器发消息
            // ModuleService.getModule(modC).testbtnA()
        });
        this.b6.onClicked.add(() => {
            Event.dispatchToServer("测试", "B"); //客户端给服务器发消息
            // ModuleService.getModule(modC).testbtnB()
        });
        //-----------------在线奖励------------------------------
        this.olbtn.onClicked.add(() => {
            if (this.olcanget) {
                Event.dispatchToServer("客户端", "在线奖励", ""); //客户端给服务器发消息
                this.onlinetime(); //在线奖励
            }
        });
        await TimeUtil.delaySecond(5); //等待1秒后继续执行
        this.onlinetime(); //在线奖励
    }
    async onlinetime() {
        this.olcanget = false;
        for (let i = 60; i > -1; i--) {
            let zi = ModuleService.getModule(modC).TimeConversion(i);
            this.olbtxt.text = zi;
            await TimeUtil.delaySecond(1); //等待1秒后继续执行
        }
        this.olbtxt.text = "领取";
        this.olcanget = true;
    }
    //生成背包物品
    bagspawn(scroll) {
        let item;
        item = mw.UIService.create(UIBagItem);
        scroll.addChild(item.uiObject);
        return item;
    }
    //刷新背包物品解锁标签
    bagRefresh(word, item) {
        let Pdata = DataCenterC.getData(mydata);
        let unlock;
        let Goods;
        if (word == "换装") {
            unlock = Pdata.dressunlock;
            Goods = this.dressGoods;
        }
        else if (word == "拖尾") {
            unlock = Pdata.tailunlock;
            Goods = this.tailGoods;
        }
        else if (word == "翅膀") {
            unlock = Pdata.wingunlock;
            Goods = this.wingGoods;
        }
        else if (word == "变身") {
            unlock = Pdata.avaunlock;
            Goods = this.avaGoods;
        }
        if (unlock && unlock.length > 0) {
            Goods.forEach((v, i, a) => {
                let lok = unlock.indexOf(i);
                if (lok == -1) {
                    //未解锁 
                    item.lock.visibility = mw.SlateVisibility.Collapsed; //折叠
                }
                else {
                    item.lock.visibility = mw.SlateVisibility.HitTestInvisible; //可见不可交互
                }
            });
        }
    }
    //--刷新文字----
    updatatxt() {
        let Pdata = DataCenterC.getData(mydata);
        this.protxt.text = Pdata.pro + ' (' + Math.floor(Pdata.pro / this.maxpro * 100) + '%) 分数：' + Pdata.score + ' 重生：' + Pdata.reborn;
        let sx = Pdata.pro * 1000 / this.maxpro;
        if (sx > 1000) {
            sx = 1000;
        }
        this.pro.size = new mw.Vector2(sx, 25); //尺寸
        this.cuptxt.text = ModuleService.getModule(modC).NumCon(Pdata.cup); //奖杯数量
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
class UIBagItem extends BagItemUI_Generate$1 {
    /**
     * 设置数据
     * @param icon 图片
     * @param count 数量
     */
    setDress(goodsID) {
        const info = ModuleService.getModule(modC).DressIcon;
        this.icon.imageGuid = info[goodsID];
        this.btn.onClicked.add(() => {
            Event.dispatchToServer("客户端", "换装c", goodsID.toString()); //客户端给服务器发消息
        });
    }
    setTail(goodsID) {
        const info = ModuleService.getModule(modC).TailIcon;
        const info2 = ModuleService.getModule(modC).TailTxt;
        this.icon.imageGuid = info[goodsID];
        this.txt.text = info2[goodsID];
        this.btn.onClicked.add(() => {
            Event.dispatchToServer("客户端", "拖尾c", goodsID.toString()); //客户端给服务器发消息
        });
    }
    setWing(goodsID) {
        const info = ModuleService.getModule(modC).WingIcon;
        const info2 = ModuleService.getModule(modC).WingTxt;
        this.icon.imageGuid = info[goodsID];
        this.txt.text = info2[goodsID];
        this.btn.onClicked.add(() => {
            Event.dispatchToServer("客户端", "翅膀c", goodsID.toString()); //客户端给服务器发消息
        });
    }
    setAva(goodsID) {
        const info = ModuleService.getModule(modC).AvaIcon;
        const info2 = ModuleService.getModule(modC).AvaTxt;
        this.icon.imageGuid = info[goodsID];
        this.txt.text = info2[goodsID];
        this.btn.onClicked.add(() => {
            Event.dispatchToServer("客户端", "变身c", goodsID.toString()); //客户端给服务器发消息
        });
    }
}

var foreign9 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIs
});

let GameStart = class GameStart extends mw.Script {
    onStart() {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
        // 注册模块（作用相当于游戏脚本里的初始化）
        ModuleService.registerModule(modS, modC, mydata);
        // 初始化RankManager
        RankMgr.Instance.initRankMgr();
        if (SystemUtil.isClient()) {
            // 显示RankUI
            mw.UIService.show(RankUI);
            // 显示UI
            mw.UIService.show(UIs);
            //取消人物之间的碰撞
            Player.asyncGetLocalPlayer().then(p => {
                p.character.collisionWithOtherCharacterEnabled = false;
            });
        }
    }
};
GameStart = __decorate([
    Component
], GameStart);
var GameStart$1 = GameStart;

var foreign1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: GameStart$1
});

class ModifiedCameraSystem {
    static get cameraLocationMode() {
        if (!SystemUtil.isClient()) {
            return;
        }
        return Camera.currentCamera.positionMode;
    }
    static set cameraLocationMode(newCameraLocationMode) {
        if (!SystemUtil.isClient()) {
            return;
        }
        let tempTransform = Camera.currentCamera.springArm.localTransform;
        Camera.currentCamera.positionMode = newCameraLocationMode;
        if (newCameraLocationMode == CameraPositionMode.PositionFollow) {
            Camera.currentCamera.parent = Player.localPlayer.character;
            Camera.currentCamera.springArm.localTransform = tempTransform;
        }
    }
    static setCameraFollowTarget(target) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = target;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static cancelCameraFollowTarget() {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.parent = Player.localPlayer.character;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static setOverrideCameraRotation(newOverrideRotation) {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = true;
        ModifiedCameraSystem.followRotationValue = newOverrideRotation;
        Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
        if (!ModifiedCameraSystem.isBind) {
            TimeUtil.onEnterFrame.add(() => {
                if (ModifiedCameraSystem.followEnable) {
                    Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
                }
            }, this);
            ModifiedCameraSystem.isBind = true;
        }
    }
    static resetOverrideCameraRotation() {
        if (!SystemUtil.isClient())
            return;
        ModifiedCameraSystem.followEnable = false;
    }
    static getCurrentSettings() {
        if (!SystemUtil.isClient())
            return;
        cameraSystemConfig.cameraRelativeTransform = Camera.currentCamera.localTransform;
        cameraSystemConfig.cameraWorldTransform = Camera.currentCamera.worldTransform;
        cameraSystemConfig.targetArmLength = Camera.currentCamera.springArm.length;
        cameraSystemConfig.enableCameraLocationLag = Camera.currentCamera.positionLagEnabled;
        cameraSystemConfig.cameraLocationLagSpeed = Camera.currentCamera.positionLagSpeed;
        cameraSystemConfig.enableCameraRotationLag = Camera.currentCamera.rotationLagEnabled;
        cameraSystemConfig.cameraRotationLagSpeed = Camera.currentCamera.rotationLagSpeed;
        cameraSystemConfig.cameraFOV = Camera.currentCamera.fov;
        cameraSystemConfig.cameraLocationMode = Camera.currentCamera.positionMode;
        cameraSystemConfig.cameraRotationMode = Camera.currentCamera.rotationMode;
        cameraSystemConfig.enableCameraCollision = Camera.currentCamera.springArm.collisionEnabled;
        cameraSystemConfig.cameraUpLimitAngle = Camera.currentCamera.upAngleLimit;
        cameraSystemConfig.cameraDownLimitAngle = Camera.currentCamera.downAngleLimit;
        return cameraSystemConfig;
    }
    static applySettings(CameraSetting) {
        if (!SystemUtil.isClient())
            return;
        Camera.currentCamera.localTransform = CameraSetting.cameraRelativeTransform;
        Camera.currentCamera.springArm.length = CameraSetting.targetArmLength;
        Camera.currentCamera.positionLagEnabled = CameraSetting.enableCameraLocationLag;
        Camera.currentCamera.positionLagSpeed = CameraSetting.cameraLocationLagSpeed;
        Camera.currentCamera.rotationLagEnabled = CameraSetting.enableCameraRotationLag;
        Camera.currentCamera.rotationLagSpeed = CameraSetting.cameraRotationLagSpeed;
        Camera.currentCamera.fov = CameraSetting.cameraFOV;
        ModifiedCameraSystem.cameraLocationMode = CameraSetting.cameraLocationMode;
        Camera.currentCamera.rotationMode = CameraSetting.cameraRotationMode;
        Camera.currentCamera.springArm.collisionEnabled = CameraSetting.enableCameraCollision;
        Camera.currentCamera.upAngleLimit = CameraSetting.cameraUpLimitAngle;
        Camera.currentCamera.downAngleLimit = CameraSetting.cameraDownLimitAngle;
    }
    static cameraFocusing(targetArmLength, targetOffset, timeInterval = 20) {
        if (!SystemUtil.isClient())
            return;
        let timer = TimeUtil.onEnterFrame.add(() => {
            let interpolationValue = Camera.currentCamera.springArm.length + (targetArmLength - Camera.currentCamera.springArm.length) / timeInterval;
            Camera.currentCamera.springArm.length = interpolationValue;
            if (Math.abs(Camera.currentCamera.springArm.length - targetArmLength) <= 0.5) {
                TimeUtil.onEnterFrame.remove(timer);
            }
        });
    }
    static startCameraShake(shakeData) {
        if (!SystemUtil.isClient())
            return;
        let info = {
            rotationYAmplitude: shakeData.rotYawOscillation.amplitude,
            rotationYFrequency: shakeData.rotYawOscillation.frequency,
            rotationZAmplitude: shakeData.rotRollOscillation.amplitude,
            rotationZFrequency: shakeData.rotRollOscillation.frequency,
            rotationXAmplitude: shakeData.rotPitchOscillation.amplitude,
            rotationXFrequency: shakeData.rotPitchOscillation.frequency,
            positionXAmplitude: shakeData.locXOscillation.amplitude,
            positionXFrequency: shakeData.locXOscillation.frequency,
            positionYAmplitude: shakeData.locYOscillation.amplitude,
            positionYFrequency: shakeData.locYOscillation.frequency,
            positionZAmplitude: shakeData.locZOscillation.amplitude,
            positionZFrequency: shakeData.locZOscillation.frequency,
        };
        Camera.shake(info);
    }
    static stopCameraShake() {
        if (!SystemUtil.isClient())
            return;
        Camera.stopShake();
    }
    static getDefaultCameraShakeData() {
        const defaultOscillator = {
            amplitude: 0,
            frequency: 0,
            waveform: CameraModifid.EOscillatorWaveform.SineWave,
        };
        const defaultCameraShakeData = {
            rotPitchOscillation: { ...defaultOscillator },
            rotYawOscillation: { ...defaultOscillator },
            rotRollOscillation: { ...defaultOscillator },
            locXOscillation: { ...defaultOscillator },
            locYOscillation: { ...defaultOscillator },
            locZOscillation: { ...defaultOscillator },
            fovOscillation: { ...defaultOscillator },
        };
        return defaultCameraShakeData;
    }
}
ModifiedCameraSystem.isBind = false;
ModifiedCameraSystem.followTargetEnable = true;
ModifiedCameraSystem.followTargetInterpSpeed = 15;
var CameraModifid;
(function (CameraModifid) {
    (function (EOscillatorWaveform) {
        /** 正弦波 */
        EOscillatorWaveform[EOscillatorWaveform["SineWave"] = 0] = "SineWave";
        /** Perlin噪声 */
        EOscillatorWaveform[EOscillatorWaveform["PerlinNoise"] = 1] = "PerlinNoise";
    })(CameraModifid.EOscillatorWaveform || (CameraModifid.EOscillatorWaveform = {}));
})(CameraModifid || (CameraModifid = {}));
const cameraSystemConfig = {
    cameraRelativeTransform: Transform.identity,
    cameraWorldTransform: Transform.identity,
    targetArmLength: 400,
    enableCameraLocationLag: false,
    cameraLocationLagSpeed: 10,
    enableCameraRotationLag: false,
    cameraRotationLagSpeed: 10,
    cameraFOV: 90,
    cameraLocationMode: CameraPositionMode.PositionFollow,
    cameraRotationMode: CameraRotationMode.RotationControl,
    enableCameraCollision: true,
    cameraUpLimitAngle: 40,
    cameraDownLimitAngle: -40,
};

var foreign3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get CameraModifid () { return CameraModifid; },
    ModifiedCameraSystem: ModifiedCameraSystem
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        }
        else if (this.deleteDic.has(guid)) {
            console.error("-------", guid, "------- is deleted!");
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

var foreign5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/DefaultUI.ui
 * TIME: 2023.09.06-10.43.04
*/
let DefaultUI_Generate = class DefaultUI_Generate extends mw.UIScript {
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

var foreign14 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: DefaultUI_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/传送.ui
 * TIME: 2023.09.06-10.43.04
*/
let 传送_Generate = class 传送_Generate extends mw.UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
传送_Generate = __decorate([
    UIBind('UI/传送.ui')
], 传送_Generate);
var 传送_Generate$1 = 传送_Generate;

var foreign16 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: 传送_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/换装提示.ui
 * TIME: 2023.09.06-10.43.04
*/
let 换装提示_Generate = class 换装提示_Generate extends mw.UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
换装提示_Generate = __decorate([
    UIBind('UI/换装提示.ui')
], 换装提示_Generate);
var 换装提示_Generate$1 = 换装提示_Generate;

var foreign19 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: 换装提示_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/重生提示.ui
 * TIME: 2023.09.06-10.43.04
*/
let 重生提示_Generate = class 重生提示_Generate extends mw.UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
重生提示_Generate = __decorate([
    UIBind('UI/重生提示.ui')
], 重生提示_Generate);
var 重生提示_Generate$1 = 重生提示_Generate;

var foreign20 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: 重生提示_Generate$1
});

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 一纸红笺
 * UI: UI/高分提示.ui
 * TIME: 2023.09.06-10.43.04
*/
let 高分提示_Generate = class 高分提示_Generate extends mw.UIScript {
    /**
    * onStart 之前触发一次
    */
    onAwake() {
    }
};
高分提示_Generate = __decorate([
    UIBind('UI/高分提示.ui')
], 高分提示_Generate);
var 高分提示_Generate$1 = 高分提示_Generate;

var foreign21 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: 高分提示_Generate$1
});

let WtsMyName = class WtsMyName extends mw.Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    onStart() {
        if (SystemUtil.isClient()) {
            let nickname = "";
            if (!SystemUtil.isPIE) {
                nickname = AccountService.getNickName();
            }
            else {
                return;
            }
            Event.dispatchToServer("要名字", nickname);
        }
        else {
            Event.addClientListener("要名字", async (player, nickName) => {
                let char = player.character;
                await char.asyncReady();
                char.displayName = nickName;
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
WtsMyName = __decorate([
    Component
], WtsMyName);
var WtsMyName$1 = WtsMyName;

var foreign22 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: WtsMyName$1
});

let UIDefault = class UIDefault extends mw.UIScript {
    /** 仅在游戏时间对非模板实例调用一次 */
    onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        //找到对应的跳跃按钮
        const JumpBtn = this.uiWidgetBase.findChildByPath('MWCanvas/MWButton_Jump');
        //点击跳跃按钮,异步获取人物后执行跳跃
        JumpBtn.onPressed.add(() => {
            if (this.Character) {
                this.Character.jump();
            }
            else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this.Character = player.character;
                    //角色执行跳跃功能
                    this.Character.jump();
                });
            }
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

var foreign23 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: UIDefault$1
});

const MWModuleMap = { 
     'build': foreign0,
     'JavaScripts/GameStart': foreign1,
     'JavaScripts/modC': foreign2,
     'JavaScripts/Modified027Editor/ModifiedCamera': foreign3,
     'JavaScripts/Modified027Editor/ModifiedPlayer': foreign4,
     'JavaScripts/Modified027Editor/ModifiedSpawn': foreign5,
     'JavaScripts/Modified027Editor/ModifiedStaticAPI': foreign6,
     'JavaScripts/modS': foreign7,
     'JavaScripts/mydata': foreign8,
     'JavaScripts/UI/MainUI': foreign9,
     'JavaScripts/UI/RankItemUI': foreign10,
     'JavaScripts/UI/RankMgr': foreign11,
     'JavaScripts/UI/RankUI': foreign12,
     'JavaScripts/ui-generate/BagItemUI_generate': foreign13,
     'JavaScripts/ui-generate/DefaultUI_generate': foreign14,
     'JavaScripts/ui-generate/MainUI_generate': foreign15,
     'JavaScripts/ui-generate/传送_generate': foreign16,
     'JavaScripts/ui-generate/在线排行/RankItemUI_generate': foreign17,
     'JavaScripts/ui-generate/在线排行/RankUI_generate': foreign18,
     'JavaScripts/ui-generate/换装提示_generate': foreign19,
     'JavaScripts/ui-generate/重生提示_generate': foreign20,
     'JavaScripts/ui-generate/高分提示_generate': foreign21,
     'JavaScripts/修复头顶名字/WtsMyName': foreign22,
     'JavaScripts/默认/UIDefault': foreign23,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2luZG93c05vRWRpdG9yL01XL0NvbnRlbnQvQnVpbGRUb29sL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFN0YXRpY0FQSS50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyLnRzIiwiLi4vSmF2YVNjcmlwdHMvbXlkYXRhLnRzIiwiLi4vSmF2YVNjcmlwdHMvbW9kUy50cyIsIi4uL0phdmFTY3JpcHRzL21vZEMudHMiLCIuLi9KYXZhU2NyaXB0cy9VSS9SYW5rTWdyLnRzIiwiLi4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv5Zyo57q/5o6S6KGML1JhbmtVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+WcqOe6v+aOkuihjC9SYW5rSXRlbVVJX2dlbmVyYXRlLnRzIiwiLi4vSmF2YVNjcmlwdHMvVUkvUmFua0l0ZW1VSS50cyIsIi4uL0phdmFTY3JpcHRzL1VJL1JhbmtVSS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0JhZ0l0ZW1VSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL01haW5VSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL1VJL01haW5VSS50cyIsIi4uL0phdmFTY3JpcHRzL0dhbWVTdGFydC50cyIsIi4uL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkQ2FtZXJhLnRzIiwiLi4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bi50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0RlZmF1bHRVSV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+S8oOmAgV9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+aNouijheaPkOekul9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+mHjeeUn+aPkOekul9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+mrmOWIhuaPkOekul9nZW5lcmF0ZS50cyIsIi4uL0phdmFTY3JpcHRzL+S/ruWkjeWktOmhtuWQjeWtly9XdHNNeU5hbWUudHMiLCIuLi9KYXZhU2NyaXB0cy/pu5jorqQvVUlEZWZhdWx0LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vV2luZG93c05vRWRpdG9yL01XL0NvbnRlbnQvQnVpbGRUb29sL213LXZpcnR1YWwtZW50cnkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCwiaW1wb3J0ICogYXMgZm9yZWlnbjAgZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMSBmcm9tICcuL0phdmFTY3JpcHRzL0dhbWVTdGFydCc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMiBmcm9tICcuL0phdmFTY3JpcHRzL21vZEMnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjMgZnJvbSAnLi9KYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZENhbWVyYSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduNCBmcm9tICcuL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJztcbmltcG9ydCAqIGFzIGZvcmVpZ241IGZyb20gJy4vSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRTcGF3bic7XG5pbXBvcnQgKiBhcyBmb3JlaWduNiBmcm9tICcuL0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkU3RhdGljQVBJJztcbmltcG9ydCAqIGFzIGZvcmVpZ243IGZyb20gJy4vSmF2YVNjcmlwdHMvbW9kUyc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOCBmcm9tICcuL0phdmFTY3JpcHRzL215ZGF0YSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduOSBmcm9tICcuL0phdmFTY3JpcHRzL1VJL01haW5VSSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTAgZnJvbSAnLi9KYXZhU2NyaXB0cy9VSS9SYW5rSXRlbVVJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMSBmcm9tICcuL0phdmFTY3JpcHRzL1VJL1JhbmtNZ3InO1xuaW1wb3J0ICogYXMgZm9yZWlnbjEyIGZyb20gJy4vSmF2YVNjcmlwdHMvVUkvUmFua1VJJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xMyBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL0JhZ0l0ZW1VSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTQgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS9EZWZhdWx0VUlfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjE1IGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWFpblVJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xNiBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+S8oOmAgV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTcgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS/lnKjnur/mjpLooYwvUmFua0l0ZW1VSV9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMTggZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS/lnKjnur/mjpLooYwvUmFua1VJX2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24xOSBmcm9tICcuL0phdmFTY3JpcHRzL3VpLWdlbmVyYXRlL+aNouijheaPkOekul9nZW5lcmF0ZSc7XG5pbXBvcnQgKiBhcyBmb3JlaWduMjAgZnJvbSAnLi9KYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS/ph43nlJ/mj5DnpLpfZ2VuZXJhdGUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIxIGZyb20gJy4vSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv6auY5YiG5o+Q56S6X2dlbmVyYXRlJztcbmltcG9ydCAqIGFzIGZvcmVpZ24yMiBmcm9tICcuL0phdmFTY3JpcHRzL+S/ruWkjeWktOmhtuWQjeWtly9XdHNNeU5hbWUnO1xuaW1wb3J0ICogYXMgZm9yZWlnbjIzIGZyb20gJy4vSmF2YVNjcmlwdHMv6buY6K6kL1VJRGVmYXVsdCc7XG5leHBvcnQgY29uc3QgTVdNb2R1bGVNYXAgPSB7IFxuICAgICAnYnVpbGQnOiBmb3JlaWduMCxcbiAgICAgJ0phdmFTY3JpcHRzL0dhbWVTdGFydCc6IGZvcmVpZ24xLFxuICAgICAnSmF2YVNjcmlwdHMvbW9kQyc6IGZvcmVpZ24yLFxuICAgICAnSmF2YVNjcmlwdHMvTW9kaWZpZWQwMjdFZGl0b3IvTW9kaWZpZWRDYW1lcmEnOiBmb3JlaWduMyxcbiAgICAgJ0phdmFTY3JpcHRzL01vZGlmaWVkMDI3RWRpdG9yL01vZGlmaWVkUGxheWVyJzogZm9yZWlnbjQsXG4gICAgICdKYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFNwYXduJzogZm9yZWlnbjUsXG4gICAgICdKYXZhU2NyaXB0cy9Nb2RpZmllZDAyN0VkaXRvci9Nb2RpZmllZFN0YXRpY0FQSSc6IGZvcmVpZ242LFxuICAgICAnSmF2YVNjcmlwdHMvbW9kUyc6IGZvcmVpZ243LFxuICAgICAnSmF2YVNjcmlwdHMvbXlkYXRhJzogZm9yZWlnbjgsXG4gICAgICdKYXZhU2NyaXB0cy9VSS9NYWluVUknOiBmb3JlaWduOSxcbiAgICAgJ0phdmFTY3JpcHRzL1VJL1JhbmtJdGVtVUknOiBmb3JlaWduMTAsXG4gICAgICdKYXZhU2NyaXB0cy9VSS9SYW5rTWdyJzogZm9yZWlnbjExLFxuICAgICAnSmF2YVNjcmlwdHMvVUkvUmFua1VJJzogZm9yZWlnbjEyLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvQmFnSXRlbVVJX2dlbmVyYXRlJzogZm9yZWlnbjEzLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvRGVmYXVsdFVJX2dlbmVyYXRlJzogZm9yZWlnbjE0LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUvTWFpblVJX2dlbmVyYXRlJzogZm9yZWlnbjE1LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv5Lyg6YCBX2dlbmVyYXRlJzogZm9yZWlnbjE2LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv5Zyo57q/5o6S6KGML1JhbmtJdGVtVUlfZ2VuZXJhdGUnOiBmb3JlaWduMTcsXG4gICAgICdKYXZhU2NyaXB0cy91aS1nZW5lcmF0ZS/lnKjnur/mjpLooYwvUmFua1VJX2dlbmVyYXRlJzogZm9yZWlnbjE4LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv5o2i6KOF5o+Q56S6X2dlbmVyYXRlJzogZm9yZWlnbjE5LFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv6YeN55Sf5o+Q56S6X2dlbmVyYXRlJzogZm9yZWlnbjIwLFxuICAgICAnSmF2YVNjcmlwdHMvdWktZ2VuZXJhdGUv6auY5YiG5o+Q56S6X2dlbmVyYXRlJzogZm9yZWlnbjIxLFxuICAgICAnSmF2YVNjcmlwdHMv5L+u5aSN5aS06aG25ZCN5a2XL1d0c015TmFtZSc6IGZvcmVpZ24yMixcbiAgICAgJ0phdmFTY3JpcHRzL+m7mOiupC9VSURlZmF1bHQnOiBmb3JlaWduMjMsXG59XG4iXSwibmFtZXMiOlsiUmFua0l0ZW1VSV9HZW5lcmF0ZSIsIlJhbmtVSV9HZW5lcmF0ZSIsIk1haW5VSV9HZW5lcmF0ZSIsIkJhZ0l0ZW1VSV9HZW5lcmF0ZSIsIk1haW5VSSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFzQ0E7QUFDTyxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUQsSUFBSSxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7QUFDakksSUFBSSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25JLFNBQVMsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMs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QUFFaEQsWUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTztBQUMzQyxZQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPOzs7U0FHOUMsQ0FBQztBQUNGLFFBQUEsSUFBQSxDQUFBLFVBQVUsR0FBcUI7WUFDM0IsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0gsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4SCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkgsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7WUFFMUgsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RILFlBQUEsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDakksQ0FBQztBQUNGLFFBQUEsSUFBQSxDQUFBLFlBQVksR0FBdUI7WUFDL0IsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3JJLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUVySSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDMUksSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQzFJLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN2SSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7O1lBRXJJLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNySSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDeEksQ0FBQztBQUNGLFFBQUEsSUFBQSxDQUFBLFNBQVMsR0FBcUI7WUFDMUIsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsSSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEgsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUN4SSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7O1lBRXRILElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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LHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsQztJQWtERCxRQUFRLENBQUMsTUFBaUIsRUFBRSxJQUFZLEVBQUE7QUFDcEMsUUFBQSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBOztRQUV2QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3pCLFlBQUEsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQzNDLFlBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsU0FBQTtBQUNELFFBQUEsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTs7UUFFM0MsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsQztBQUNELElBQUEsWUFBWSxDQUFDLE1BQWlCLEVBQUE7QUFDMUIsUUFBQSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBOztRQUV2QixJQUFJLElBQUksQ0FBQyxTQUFTLENB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QUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1gsU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxRCxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsR0FBRyxHQUFHLENBQUE7QUFDWCxTQUFBO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDM0IsRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNYLFNBQUE7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ1gsU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxRCxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsR0FBRyxHQUFHLENBQUE7QUFDWCxTQUFBO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDM0IsRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNYLFNBQUE7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ1osU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxRCxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDWixTQUFBO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDM0IsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUNaLFNBQUE7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ1osU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxRCxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDWixTQUFBO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDM0IsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUNaLFNBQUE7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsSUFBSSxDQUFBO0FBQ1osU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUMxRCxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQzNCLEVBQUUsR0FBRyxJQUFJLENBQUE7QUFDWixTQUFBO2FBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDM0IsRUFBRSxHQUFHLElBQUksQ0FBQTtBQUNaLFNBQUE7YUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMzQixFQUFFLEdBQUcsS0FBSyxDQUFBO0FBQ2IsU0FBQTthQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtZ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QUM7UUFFM0IsSUFBSSxDQUFBLElBQUEsR0FBWSxTQUFTLENBQUM7UUFFMUIsSUFBRyxDQUFBLEdBQUEsR0FBWSxTQUFTLENBQUM7UUFFekIsSUFBUSxDQUFBLFFBQUEsR0FBWSxTQUFTLENBQUM7UUFFOUIsSUFBTyxDQUFBLE9BQUEsR0FBWSxTQUFTLENBQUM7UUFFN0IsSUFBTSxDQUFBLE1BQUEsR0FBZSxTQUFTLENBQUM7UUFFL0IsSUFBSSxDQUFBLElBQUEsR0FBWSxTQUFTLENBQUM7UUFFMUIsSUFBRSxDQUFBLEVBQUEsR0FBaUIsU0FBUyxDQUFDO1FBRTdCLElBQUUsQ0FBQSxFQUFBLEdBQWlCLFNBQVMsQ0FBQztRQUU3QixJQUFFLENBQUEsRUFBQSxHQUFpQixTQUFTLENBQUM7UUFFN0IsSUFBRSxDQUFBLEVBQUEsR0FBaUIsU0FBUyxDQUFDO1FBRTdCLElBQUUsQ0FBQSxFQUFBLEdBQWlCLFNBQVMsQ0FBQztRQUU3QixJQUFHLENBQUEsR0FBQSxHQUFjLFNBQVMsQ0FBQztRQUUzQixJQUFFLENBQUEsRUFBQSxHQUFpQixTQUFTLENBQUM7UUFFN0IsSUFBSyxDQUFBLEtBQUEsR0FBZSxTQUFTLENBQUM7UUFFOUIsSUFBSyxDQUFBLEtBQUEsR0FBWSxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFBLElBQUEsR0FBWSxTQUFTLENBQUM7UUFFMUIsSUFBSSxDQUFBLElBQUEsR0FBWSxTQUFTLENBQUM7UUFFMUIsSUFBRyxDQUFBLEdBQUEsR0FBWSxTQUFTLENBQUM7UUFFekIsSUFBSSxDQUFBLElBQUEsR0FBWSxTQUFTLENBQUM7UUFFMUIsSUFBTSxDQUFBLE1BQUEsR0FBWSxTQUFTLENBQUM7UUFFNUIsSUFBVSxDQUFBLFVBQUEsR0FBWSxTQUFTLENBQUM7UUFFaEMsSUFBTSxDQUFBLE1BQUEsR0FBWSxTQUFTLENBQUM7UUFFNUIsSUFBSyxDQUFBLEtBQUEsR0FBWSxTQUFTLENBQUM7UUFFM0IsSUFBUyxDQUFBLFNBQUEsR0FBWSxTQUFTLENBQUM7UUFFL0IsSUFBSyxDQUFBLEtBQUEsR0FBWSxT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QSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztBQUNDLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztBQUNDLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztBQUNDLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztBQUNDLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztBQUNGLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTNCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztBQUNDLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTdCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztBQUNJLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTlCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQztBQUNYLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTNCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQywrQkFBK0IsQ0FBQztBQUNiLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTFCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQywrQkFBK0IsQ0FBQztBQUNiLENBQUEsRUFBQSxlQUFBLENBQUEsU0FBQSxFQUFBLE1BQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBO0FBRTFCLFVBQUEsQ0FBQTtJQUROLFlBQVksQ0FBQyxrQ0FBa0MsQ0FBQztBQUNqQixDQUFBLEVBQUEsZUFBQSxDQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUV6QixVQUFBLENBQUE7SUFETixZQUFZLENBQUMsOEJBQThCLENBQUM7QUFDWixDQUFBLEVBQUEsZUFBQSxDQUFBLFNBQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUUxQixVQUFBLENBQUE7SUFETixZQUFZLENBQUMsbUJBQW1CLENBQUM7QUFDQyxDQUFBLEVBQUEsZUFBQSxDQUFBLFNBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUU1QixVQUFBLENBQUE7SUFETixZQUFZLENBQUMsOEJBQThCLENBQUM7QUFDTixDQUFBLEVBQUEsZUFBQSxDQUFBLFNBQUEsRUFBQSxZQUFBLEVBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUVoQyxVQUFBLENBQUE7SUFETixZQUFZLENBQUMsb0NBQW9DLENBQUM7QUFDaEIsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFNUIsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGtCQUFrQixDQUFDO0FBQ0MsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFM0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDRCQUE0QixDQUFDO0FBQ0wsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFL0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGtDQUFrQyxDQUFDO0FBQ2YsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFM0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGtCQUFrQixDQUFDO0FBQ0MsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFM0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDRCQUE0QixDQUFDO0FBQ0wsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFL0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGtDQUFrQyxDQUFDO0FBQ2YsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFM0IsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGlCQUFpQixDQUFDO0FBQ0MsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFMUIsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLDBCQUEwQixDQUFDO0FBQ0osQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFOUIsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLGdDQUFnQyxDQUFDO0FBQ2QsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsTUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7QUFFMUIsVUFBQSxDQUFBO0lBRE4sWUFBWSxDQUFDLG1CQUFtQixDQUFDO0FBQ0MsQ0FBQSxFQUFBLGVBQUEsQ0FBQSxTQUFBLEVBQUEsUUFBQSxF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RyxDQUFDLE1BQUs7QUFDM0IsWUFBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN6RCxTQUFDLENBQUMsQ0FBQTtLQUNGO0FBQ00sSUFBQSxPQUFPLENBQUMsT0FBZSxFQUFBO1FBQzdCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3BELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQUs7QUFDM0IsWUFBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUN6RCxTQUFDLENBQUMsQ0FBQTtLQUNGO0FBQ00sSUFBQSxPQUFPLENBQUMsT0FBZSxFQUFBO1FBQzdCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3BELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQUs7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
