import { MainUI } from "../../ui/MainUI";
import { InterEvtNameDef, ObjInterDefine } from "./ObjInterDefine";
import { PlayerModuleS } from "../player/PlayerModuleS";
import { HumanInteract } from "./objInter/HumanInteract";
import ObjInterScript from "./objInter/ObjInterScript";
import { GameConfig } from "../../../config/GameConfig";
import { IInteractElement } from "../../../config/Interact";
import InteractPanel_Generate from "../../../ui-generate/ShareUI/hud/InteractPanel_generate";
import { InterPanel } from "./ui/InterUI";
import Tips from "../../utils/Tips";
import { GhostTraceHelper } from "../../utils/TraceHelper";
export class PlayerInterData {
    public constructor(public char: Character, public pid: number) {
    }
    public lastValidPos(): Vector {
        if (this.validPos) {
            return this.validPos;
        }
        return this.char.worldTransform.position;
    }

    public validPos: Vector;

    public stat: string = "";

    public curInterCfg: IInteractElement;

    public isMain: boolean = false;

    public interPids: number[] = [];

    public interAnchor: Interactor;
}

export class PlayerInterModuleC extends ModuleC<PlayerInterModuleS, null> {
    private _playerInter: HumanInteract;

    private _bindScript: ObjInterScript;

    private _isInterLoading: boolean = false;

    public playerInterStat: number = 0;

    public playerInterMain: boolean = false;

    public playerInterPids: number[] = [];

    private _clickTimer: number = 0;

    protected onStart(): void {
        this._playerInter = new HumanInteract()
    }

    protected onEnterScene(sceneType: number): void {
        this._playerInter.initInterObj();
    }

    public async reqInter(interObj: ObjInterScript) {
        if (this._isInterLoading) {
            console.error("正在交互加载中")
            return false;
        }
        if (this._playerInter.isInteracting) {
            console.error("正在交互中")
            return false;
        }
        this._isInterLoading = true;
        await this._playerInter.initInterObj();
        let offset = interObj.gameObject.worldTransform.rotation.rotateVector(interObj.releasePos);
        let pos = interObj.gameObject.worldTransform.position.clone().add(offset);
        if (!interObj.isSingle) {
            this.server.net_setPlayerValidPos(interObj.safeStat, pos)//this.localPlayer.character.worldTransform.position);
        }
        else {
            let res = await this.server.net_setPlayerValidPos(interObj.safeStat, pos, interObj.gameObject.gameObjectId);
            if (!res) {
                this._isInterLoading = false;
                return false;
            }
        }
        this._bindScript = interObj;
        this._playerInter.enterInteract(interObj.interactStance, interObj.gameObject, interObj.interSlot, interObj.isRotateCamera);
        this._isInterLoading = false;
        UIService.getUI(MainUI).setHandVisible(true, 3);
        return true;
    }

    /** 是否在交互建筑的标记 */
    public interBuildingMark: boolean = false;

    public reqStopInter(resetLoc: boolean = true) {
        if (!this._playerInter.isInteracting) {
            return false;
        }

        if (this._bindScript) {
            this._playerInter.exitInteract(resetLoc, this._bindScript.releasePos);
        }
        else {
            this._playerInter.exitInteract(resetLoc);
        }

        this.server.net_freePlayerPos();
        if (this._bindScript) {
            this._bindScript.leave();
        }

        if (this.interBuildingMark) { Event.dispatchToLocal("ClearBuildingDirtyMark"); this.interBuildingMark = false; }

        UIService.getUI(MainUI).setHandVisible(false, 3);
        return true;
    }

    private _startTime: number = 0;

    async reqInterWithPlayer(userId: string, cfgId: number) {
        const curTime = TimeUtil.elapsedTime();
        if (curTime - this._clickTimer < 0.5) {
            return;
        }
        this._clickTimer = curTime;

        GhostTraceHelper.uploadMGS("ts_action_hit", "点击按钮时上发", {
            skill_id: cfgId - 1
        })
        let plaeyr = Player.getPlayer(userId);
        this.server.net_startPlayerInter(this.localPlayerId, plaeyr.playerId, cfgId);
    }

    net_startInter(ismain: boolean, targetId: number[], cfgId: number) {
        const interCfg = GameConfig.Interact.getElement(cfgId);
        this.playerInterPids = targetId;
        if (!ismain && interCfg.id == 2) {
            const targetPlayer = Player.getPlayer(targetId[0]);
            Navigation.follow(Player.localPlayer.character, targetPlayer.character, 100)
        }
        this.playerInterMain = ismain;
        this.playerInterStat = cfgId;
        UIService.getUI(InterPanel).showInter(ismain)
        this._startTime = TimeUtil.elapsedTime();
    }

    net_stopInter(ismain: boolean, cfgid: number) {
        if (cfgid == 2) {
            !ismain && Navigation.stopFollow(Player.localPlayer.character)
        }
        this.playerInterStat = 0;
        this.playerInterMain = false;
        UIService.hide(InterPanel);
    }

    reqCancelPlayerInter() {
        if (!this.playerInterStat) {
            return;
        }
        this.playerInterStat = 0;
        this.server.net_stopPlayerInter(Player.localPlayer.playerId);
        if (this._startTime) {
            GhostTraceHelper.uploadMGS("ts_action_hit", "点击按钮时上发", {
                stage_level: 1,
                skill_id: TimeUtil.elapsedTime() - this._startTime
            })
        }
    }

    reqInterAction() {
        const curTime = TimeUtil.elapsedTime();
        if (curTime - this._clickTimer < 0.5) {
            return;
        }
        this._clickTimer = curTime;
        if (this.playerInterStat == 1) {
            this.server.net_playerAction(0);
        }
        else if (this.playerInterStat == 2) {
            const cfg = GameConfig.Interact.getElement(this.playerInterStat);
            if (cfg.interactNum <= this.playerInterPids.length) {
                Tips.show("已达最大交互数目")
                return;
            }
            let mindis: number = Number.MAX_SAFE_INTEGER;
            let player: Player = null;
            const localPos = Player.localPlayer.character.worldTransform.position;
            Player.getAllPlayers().forEach(e => {
                if (!e.character || e.character.isDestroyed) {
                    return;
                }
                if (this.playerInterPids.includes(e.playerId)) {
                    return;
                }
                if (e.playerId == this.localPlayer.playerId) {
                    return;
                }
                const dis = Vector.distance(localPos, e.character.worldTransform.position);
                if (dis > 500) {
                    return;
                }
                if (!player || dis < mindis) {
                    mindis = dis;
                    player = e;
                }
            })
            if (player) {
                this.server.net_playerAction(player.playerId)
            }
        }
    }

    net_sendForece(force: Vector) {
        Player.localPlayer.character.addImpulse(force, true);
    }
}

export class PlayerInterModuleS extends ModuleS<PlayerInterModuleC, null> {
    public _playerInfoMap: Map<number, PlayerInterData> = new Map();

    private _interStatMap: Map<string, number> = new Map();
    private _player2InterMap: Map<number, string> = new Map();

    public getPlayerPos(char: Character) {
        if (this._playerInfoMap.has(char.player.playerId)) {
            return this._playerInfoMap.get(char.player.playerId).lastValidPos();
        }
        else {
            return char.worldTransform.position;
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (this._playerInfoMap.has(player.playerId)) {
                this.stopPlayerInter(player.playerId);
                this._playerInfoMap.delete(player.playerId);
            }
            if (this._player2InterMap.has(player.playerId)) {
                let guid = this._player2InterMap.get(player.playerId);
                this._player2InterMap.delete(player.playerId);
                this._interStatMap.delete(guid);
            }
        } catch (error) {
            console.log("PlayerInterModuleS onPlayerLeft error:", error);
        }
    }

    public getPlayerIsInter(player: Player) {
        return this._player2InterMap.has(player.playerId) && this._playerInfoMap.get(player.playerId).validPos != null;
    }

    public getPlayerInterStat(player: Player): string {
        if (this._playerInfoMap.has(player.playerId)) {
            return this._playerInfoMap.get(player.playerId).stat;
        }
        else {
            return "";
        }
    }

    public net_setPlayerValidPos(interStat: string, pos: Vector, guid: string = "") {
        if (guid != "") {
            if (this._interStatMap.has(guid)) {
                return false;
            }
            this._interStatMap.set(guid, this.currentPlayerId)
            this._player2InterMap.set(this.currentPlayerId, guid);
        }
        if (!this._playerInfoMap.has(this.currentPlayerId)) {
            this._playerInfoMap.set(this.currentPlayerId, new PlayerInterData(this.currentPlayer.character, this.currentPlayerId));
        }
        this._playerInfoMap.get(this.currentPlayerId).validPos = pos;
        this._playerInfoMap.get(this.currentPlayerId).stat = interStat;
        this.currentPlayer.character.setCollision(PropertyStatus.Off);
        return true;
    }

    public net_freePlayerPos() {
        if (this._playerInfoMap.has(this.currentPlayerId)) {
            this._playerInfoMap.get(this.currentPlayerId).validPos = null;
            this._playerInfoMap.get(this.currentPlayerId).stat = "";
        }
        if (this._player2InterMap.has(this.currentPlayerId)) {
            let guid = this._player2InterMap.get(this.currentPlayerId);
            this._player2InterMap.delete(this.currentPlayerId);
            this._interStatMap.delete(guid);
        }
        this.currentPlayer.character.setCollision(PropertyStatus.On);
    }

    @Decorator.noReply()
    net_startPlayerInter(senderId: number, targetId: number, cfgid: number) {
        if (targetId == senderId) {
            return;
        }
        const sender = this.getPlayerInfo(senderId);
        const target = this.getPlayerInfo(targetId);
        if (!sender || !target) {
            return;
        }
        if (sender.isMain && sender.interPids.includes(targetId) && sender.curInterCfg && sender.curInterCfg.id == cfgid) {
            return;
        }
        let checkTarget = () => {
            if (sender.curInterCfg) {
                console.log("当前发起者的当前交互状态为" + sender.curInterCfg.id)
            }
            if (!sender.curInterCfg || (cfgid == 2 && sender.curInterCfg.id == 2 && sender.isMain)) {
                this.startNewInter(senderId, targetId, cfgid);
            }
            else {
                this.stopPlayerInter(sender.pid, () => {
                    this.startNewInter(senderId, targetId, cfgid);
                });
            }
        }
        if (target.curInterCfg) {
            console.log("当前交互者的当前交互状态为" + target.curInterCfg.id)
        }
        if (!target.curInterCfg) {
            checkTarget();
        }
        else {
            this.stopPlayerInter(target.pid, checkTarget);
        }
    }

    private startNewInter(senderId: number, targetId: number, cfgid: number) {
        const sender = this.getPlayerInfo(senderId);
        const target = this.getPlayerInfo(targetId);
        const cfg = GameConfig.Interact.getElement(cfgid);
        if (cfgid == 1) {
            if (sender.isMain && sender.interPids.includes(targetId)) {
                return;
            }
            const inter = GameObject.spawn("Interactor") as Interactor;
            sender.char.attachToSlot(inter, HumanoidSlotType.RightHand);
            inter.localTransform.position = cfg.bePickedPlayerRelativeLoc;
            inter.localTransform.rotation = new Rotation(cfg.bePickedPlayerRelativeRot);
            inter.enter(target.char, cfg.slotPos, cfg.passiveGuid);
            /** playAni */
            const senderAni = sender.char.loadAnimation(cfg.activeGuid)
            senderAni.loop = Infinity;
            senderAni.slot = AnimSlot.Upper;
            senderAni.play();
            const targetAni = target.char.loadAnimation(cfg.passiveGuid);
            targetAni.loop = Infinity;
            targetAni.play();
            sender.interAnchor = inter;
            sender.interPids.push(targetId);
            sender.isMain = true;
            target.interPids.push(senderId);
            target.isMain = false;
            target.char.setCollision(CollisionStatus.Off);
            this.getClient(senderId).net_startInter(true, sender.interPids, cfgid);
            this.getClient(targetId).net_startInter(false, target.interPids, cfgid);
        }
        else if (cfgid == 2) {
            if (sender.interPids.length >= cfg.interactNum) {
                return;
            }
            if (sender.isMain && sender.interPids.includes(targetId)) {
                return;
            }
            sender.interPids.push(targetId);
            sender.isMain = true;
            target.interPids.push(senderId);
            target.isMain = false;
            this.getClient(senderId).net_startInter(true, sender.interPids, cfgid);
            const followTarget = sender.interPids.length == 1 ? sender.pid : sender.interPids[sender.interPids.length - 2];
            this.getClient(targetId).net_startInter(false, [followTarget], cfgid);
            const ani = target.char.loadAnimation(cfg.passiveGuid);
            ani.slot = AnimSlot.Upper;
            ani.loop = Infinity;
            ani.play();
        }

        /** setInfo */
        sender.curInterCfg = cfg;
        target.curInterCfg = cfg;
    }

    @Decorator.noReply()
    net_stopPlayerInter(sender: number) {
        this.stopPlayerInter(sender);
    }

    private stopPlayerInter(sender: number, callback: (info: PlayerInterData) => void = null) {
        const info = this.getPlayerInfo(sender);
        if (!info.curInterCfg) {
            callback && callback(info);
            return;
        }
        const cfgId = info.curInterCfg.id;
        if (cfgId == 1) {
            const otherInfo = this.getPlayerInfo(info.interPids[0]);
            let anchor: Interactor;
            let rot: Rotation = Rotation.zero;
            if (info.isMain) {
                anchor = info.interAnchor;
                rot = info.char.worldTransform.rotation;
            }
            else {
                anchor = otherInfo.interAnchor;
                rot = otherInfo.char.worldTransform.rotation;
            }
            anchor.getCurrentCharacter().setCollision(CollisionStatus.On);
            anchor.getCurrentCharacter().worldTransform.scale = Vector.one;
            anchor?.leave(anchor.getCurrentCharacter().worldTransform.position, rot);
            anchor.onLeave.add(() => {
                anchor.onLeave.clear();
                callback && callback(info);
                setTimeout(() => {
                    !anchor.isDestroyed && anchor.destroy();
                }, 200);
            })
            info.char.currentAnimation?.stop();
            otherInfo.char.currentAnimation?.stop();
            this.getClient(otherInfo.pid).net_stopInter(otherInfo.isMain, cfgId);
            otherInfo.interPids.length = 0;
            otherInfo.curInterCfg = null;
            this.getClient(sender).net_stopInter(info.isMain, cfgId)
            info.isMain = false;
            info.interPids.length = 0;
            info.curInterCfg = null;
        }
        else if (cfgId == 2) {
            if (info.isMain) {
                info.interPids.forEach(e => {
                    const otherInfo = this.getPlayerInfo(e);
                    if (!otherInfo) {
                        return;
                    }
                    this.getClient(otherInfo.pid).net_stopInter(false, cfgId);
                    otherInfo.char.currentAnimation?.stop();
                    otherInfo.interPids.length = 0;
                    otherInfo.curInterCfg = null;
                })
                info.interPids.length = 0;
                this.getClient(info.pid).net_stopInter(true, cfgId)
                info.curInterCfg = null;
                callback && callback(info);
            }
            else {
                const mainInfo = this.getPlayerInfo(info.interPids[0]);
                if (mainInfo) {
                    const pidIndex = mainInfo.interPids.indexOf(info.pid)
                    pidIndex != -1 && mainInfo.interPids.splice(pidIndex, 1)
                }
                for (let index = 0; index < mainInfo.interPids.length; index++) {
                    const pid = mainInfo.interPids[index];
                    let pre = mainInfo.pid;
                    if (index != 0) {
                        pre = mainInfo.interPids[index - 1];
                    }
                    this.getClient(pid).net_startInter(false, [pre], cfgId);
                }
                if (mainInfo.interPids.length != 0) {
                    this.getClient(mainInfo.pid).net_startInter(true, mainInfo.interPids, cfgId);
                }
                else {
                    this.getClient(mainInfo.pid).net_stopInter(true, cfgId);
                    mainInfo.curInterCfg = null
                }
                this.getClient(info.pid).net_stopInter(false, cfgId);
                info.char.currentAnimation?.stop();
                info.interPids.length = 0;
                info.curInterCfg = null;
                callback && callback(info);
            }
        }
    }

    net_playerAction(targetid: number) {
        const senderId = this.currentPlayerId;
        const info = this.getPlayerInfo(this.currentPlayerId);
        if (!info.curInterCfg) {
            return;
        }
        const cfgid = info.curInterCfg.id
        if (cfgid == 1) {
            const targetid = info.interPids[0];
            this.stopPlayerInter(senderId, (data: PlayerInterData) => {
                const targetData = this.getPlayerInfo(targetid);
                if (!targetData) {
                    return;
                }
                this.getClient(targetData.pid).net_sendForece(data.char.worldTransform.getForwardVector().multiply(1000).add(Vector.up.multiply(600)));
            });
        }
        else if (cfgid == 2) {
            this.net_startPlayerInter(senderId, targetid, cfgid)
        }
    }

    private getPlayerInfo(pid: number) {
        const player = Player.getPlayer(pid);
        if (!player) {
            return null;
        }
        if (!this._playerInfoMap.has(pid)) {
            this._playerInfoMap.set(pid, new PlayerInterData(player.character, player.playerId));
        }
        const info = this._playerInfoMap.get(pid);
        return info;
    }
}

