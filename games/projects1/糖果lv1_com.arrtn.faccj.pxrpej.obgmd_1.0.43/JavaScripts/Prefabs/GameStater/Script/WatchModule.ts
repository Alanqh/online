
/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-02-09 17:35:16
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-09-06 14:03:54
 * @FilePath     : \stumbleguys\JavaScripts\Prefabs\GameStater\Script\WatchModule.ts
 * @Description  : 观战模式
 */

// import { Utils } from "tslint";
import { MGSWatch } from "../../../../JavaScripts/mgs/MGSWatch";
import { Singleton } from "../../../../JavaScripts/tool/Singleton";
import WatchUI_Generate from "../../../../JavaScripts/ui-generate/WatchUI_generate";
import { GameConfig } from "../../../config/GameConfig";
import PlayerModuleC from "../../../modules/PlayerModule/PlayerModuleC";
import { LanUtils } from "../../../tool/LanguageUtil";
import { Utils } from "../../../tool/Utils";


// export const toWatchModule: string = "toWatchModule";
type PlayerDelta = { all: string[], remove: string }
@Component
export default class WatchModule extends mw.Script {
    //当前绑定的characterid
    private _bindCharacter: string;
    //当前绑定的遍历下标
    private _bindIndex: number = 0;
    //相机对象
    private _camera: Camera;
    //游玩中的列表（排除通关和淘汰）
    private _watchCharacter: string[] = [];

    /**我所在的游戏是否结束，确保对局结束之后，不会因为多余的rpc导致出现观战ui */
    private _gameFinished: boolean = false;
    //我自己的guid
    private _selfGuid: string;
    //看我自己
    public _showSelf: boolean = true;
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        Player.asyncGetLocalPlayer().then(player => {

            let self = player.character;
            this._selfGuid = self.gameObjectId;
            this._camera = Camera.currentCamera;
        })
        //监听玩家离线，如果相机处于这个人头上的话那就换一个人
        Player.onPlayerLeave.add((player: mw.Player) => {
            this.changeGameCharacter({ all: null, remove: player.character.gameObjectId });
            this.hasDataRemove(player.character.gameObjectId);

        });
        //全量更新、淘汰、到达终点PlayerDelta
        Event.addServerListener("GameState.WatchData", (strData: string) => {
            let data = JSON.parse(strData);
            this.changeGameCharacter(data);
            this.hasDataRemove(data.remove);
            if (this._watchCharacter) {
                const index = this._watchCharacter.indexOf(this._selfGuid);
                if (index >= 0) {
                    this._watchCharacter.splice(index, 1);
                }
            }
            this.switchToOther();
            if (!this._gameFinished) {
                if (GameConfig.GameInfo.getAllElement()[0].type == 2) {
                    this._showSelf = false;
                    this.switchToOther(-1);
                } else {
                    mw.UIService.show(WatchUI, null, this);
                }
            }
        });

        Event.addLocalListener("GameState.EliminatePlayer.Watch", (guid: string) => {
            this.changeGameCharacter({ all: null, remove: guid });
            this.hasDataRemove(guid);
        });
        Event.addLocalListener("AI.Create.Client", (character: Character) => {
            if (!this._watchCharacter.includes(character.gameObjectId)) {
                this._watchCharacter.push(character.gameObjectId);
            }
        });
        Event.addLocalListener("AI.Eliminate.Client", (guid: string) => {
            this.changeGameCharacter({ all: null, remove: guid });
            this.hasDataRemove(guid);
        });
        Event.addLocalListener("AI.Pass.Client", (guid: string) => {
            this.changeGameCharacter({ all: null, remove: guid });
            this.hasDataRemove(guid);
        });
        Event.addLocalListener("AI.Eliminate.Client", (character: Character) => {
            this.changeGameCharacter({ all: null, remove: character.gameObjectId });
            this.hasDataRemove(character.gameObjectId);
        });

        Event.addLocalListener("AI.MoveBack.Client", (character: Character) => {
            if (this._bindCharacter == character.gameObjectId) {
                this.switchToOther(1);
            }
        });
        //有人通关
        Event.addLocalListener("FinishLine.Pass.Client", (remove: string) => {
            if (remove == this._selfGuid) {
                //通关表现做完了之后再请求
                // Event.dispatchToServer("GameState.WatchData");
            } else {
                this.changeGameCharacter({ all: null, remove: remove });
                this.hasDataRemove(remove);
            }
        });
        //玩家要求观战
        Event.addLocalListener("GameState.WatchGaming.Client", (dir: number) => {
            this.switchToOther(dir);
        });
        //通关表现做完了之后再全量请求
        Event.addLocalListener("ACTIVE_WATCH_MODULE", () => {
            Event.dispatchToServer("GameState.WatchData");

        });
        Event.addLocalListener("GameState.End.Client", () => {
            mw.UIService.hide(WatchUI);
            this._gameFinished = true;
        });

    }
    /**
     * 有玩家被移除，如果是我自己或者被绑定的玩家，自动切换到另外的玩家
     * @param remove 
     */
    private hasDataRemove(remove: string) {
        if (remove) {
            if (remove == this._selfGuid || remove == this._bindCharacter) {
                this.switchToOther();
            }
        }
    }
    /**
     * 同步游戏中的所有characterGuid
     * 全量更新只执行一次
     * 之后只会执行remove
     * @param data 
     */
    changeGameCharacter(data: PlayerDelta) {
        if (data.all && data.all.length) {
            data.all.forEach(id => {
                if (!this._watchCharacter.includes(id)) {
                    this._watchCharacter.push(id);
                }
            })
        }
        if (this._watchCharacter) {
            const index = this._watchCharacter.indexOf(data.remove);
            index >= 0 && this._watchCharacter.splice(index, 1);
        }
        else {
            console.log("Typee62", "_watchCharacter==null");
        }
    }
    /**
     * 切换到下一个character
     */
    private switchToOther(dir: number = 1) {
        if (GameConfig.GameInfo.getElement(1).type == 2) {
            const selfIndex = this._watchCharacter.indexOf(Player.localPlayer.character.gameObjectId);
            if (selfIndex != -1) {
                this._watchCharacter.splice(selfIndex, 1);
            }
        }
        if (this._watchCharacter && !this._showSelf) {
            if (this._watchCharacter.length) {

                let index = Math.abs(this._bindIndex % this._watchCharacter.length);
                this._bindIndex += dir;
                this._bindCharacter = this._watchCharacter[index];
                let target = GameObject.findGameObjectById(this._bindCharacter);
                if (!Utils.illegalParam(target) && target.getVisibility()) {
                    this.bindCamera(target);
                    if (!this._gameFinished) {
                        mw.UIService.show(WatchUI, target);
                    }
                } else {
                    this.bindCamera(Player.localPlayer.character);
                }
            }
        } else {
            this.bindCamera(Player.localPlayer.character);
        }
    }
    /**
     * 将相机绑定到另外一个物体上，相机不会发生偏移
     * @param target 
     * @returns 
     */
    private bindCamera(target: mw.GameObject) {

        if (!mw.SystemUtil.isClient()) {
            return;
        }
        Camera.currentCamera.parent = target;

    }
}

class WatchUI extends WatchUI_Generate {
    private tweenIndex: number = 0;
    private tweenHandle: mw.Tween<TweenUI>[] = [];
    private watchTweener: TweenUI;
    private watchTween: mw.Tween<{ percent: number }>;
    private selfTweener: TweenUI;
    private selfTween: mw.Tween<{ percent: number }>;
    private logicScript: { _showSelf: boolean };
    protected onAwake(): void {
        super.onAwake();
        this.initTween();
        this.txtLove.text = GameConfig.Language.UI_Watch_04.Value;
        this.txtReturn.text = GameConfig.Language.UI_Watch_03.Value;

        //确认弹窗ui默认关闭
        this.canvasBackConfirm.visibility = mw.SlateVisibility.Collapsed
        //返回ui显示条件
        const cfg = GameConfig.GameInfo.getElement(1)
        this.canvasReturn.visibility = (cfg.type == 2) ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed
        // this.btnBack2Lobby.visibility = 
        // this.backBack.visibility = (cfg.type == 2) ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed

        //根据组队情况修改文本
        const player = Player.localPlayer
        let team = ModuleService.getModule(PlayerModuleC).cacheMember
        this.confirmTxt.text = LanUtils.getLanguage("UI_Watch_01")
        if (team.indexOf(player.userId) != -1) {
            team.forEach(element => {
                const player = Player.getAllPlayers().find(p => p.userId == element);
                if (player) {
                    this.confirmTxt.text = LanUtils.getLanguage("UI_Watch_02")
                }
            });
        }

        this.btnLeft.onClicked.add(() => {
            Event.dispatchToLocal("GameState.WatchGaming.Client", -1)
            Singleton.getIns(MGSWatch).onClickSwitch();
        });
        this.btnRight.onClicked.add(() => {
            Event.dispatchToLocal("GameState.WatchGaming.Client", 1);
            Singleton.getIns(MGSWatch).onClickSwitch();
        });

        //返回到大厅的按钮
        this.btnBack2Lobby.onClicked.add(() => {
            //弹出弹窗
            this.canvasBackConfirm.visibility = mw.SlateVisibility.Visible
            Singleton.getIns(MGSWatch).onClickBack("LeaveStart")
        });
        //确认返回到大厅
        this.btnOK.onClicked.add(() => {
            //发送返回大厅事件
            this.confirmTxt.text = "..."
            this.btnCancel.enable = false
            this.btnOK.enable = false
            setTimeout(() => {
                //五秒后还没返回的话关闭弹窗
                this.btnCancel.enable = true
                this.btnOK.enable = true
                this.canvasBackConfirm.visibility = mw.SlateVisibility.Collapsed
            }, 5000);
            Singleton.getIns(MGSWatch).onClickBack("LeaveDown")
            Event.dispatchToServer("EnterLobby");
        });
        //取消
        this.btnCancel.onClicked.add(() => {
            //关闭弹窗
            this.canvasBackConfirm.visibility = mw.SlateVisibility.Collapsed
            Singleton.getIns(MGSWatch).onClickBack("LeaveBack")
        });

        this.btnSwitch.onClicked.add(() => {
            if (this.logicScript._showSelf) {
                this.selfTween.stop();
                this.watchTween.start();
            } else {
                this.watchTween.stop();
                this.selfTween.start();
            }
            this.logicScript._showSelf = !this.logicScript._showSelf;
            this.renderRootCVS();

        });
        this.btnAssist.onClicked.add(() => {
            Singleton.getIns(MGSWatch).onClickAssist();

            let tween = this.tweenHandle[this.tweenIndex % this.tweenHandle.length];
            this.tweenIndex++;
            tween.stop();
            tween.start();
        });
    }
    private renderRootCVS() {
        this.cvsRoot.visibility = this.logicScript._showSelf ? mw.SlateVisibility.Hidden : mw.SlateVisibility.SelfHitTestInvisible;
        Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", this.logicScript._showSelf);
        if (GameConfig.GameInfo.getAllElement()[0].type == 1 || GameConfig.GameInfo.getAllElement()[0].type == 3) {
            Event.dispatchToLocal("GameState.WatchGaming.Client", 1);
        }
    }
    onShow(character: Character, script: { _showSelf: boolean }) {
        this.txtName.text = Utils.illegalParam(character?.displayName) ? "***" : character.displayName;
        if (script) {
            this.logicScript = script;
            this.renderRootCVS();
        }
        if (GameConfig.GameInfo.getElement(1).type == 2) {
            Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", false);
            this.cvsRoot.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.btnSwitch.parent.visibility = mw.SlateVisibility.Hidden;
        }
    }
    /**
     * 初始化所有的Tween
     */
    private initTween() {
        let nodeIndex: number = 0;
        let sv: mw.Vector2 = this.btnAssist.position;

        while (this[`imgP_${nodeIndex}`]) {
            let img: mw.Image = this[`imgP_${nodeIndex}`];
            let tweenui = new TweenUI(img, sv.x, sv.y, 1)
            let tween = new mw.Tween(tweenui).to({
                x: sv.x + (Math.random() - 0.5) * 100, y: sv.y - 600, alph: 0
            }).onStart(() => {
                tweenui.x = sv.x;
                tweenui.y = sv.y;
                tweenui.alph = 1;
            }).onUpdate(() => { tweenui.render() });
            this.tweenHandle.push(tween);
            nodeIndex++;
        }
        let rootPos = this.btnSwitch.position;
        let rootSize = this.btnSwitch.size;

        let pivotLeft = new Vector2(rootPos.x, rootPos.y);
        let pivotRight = new Vector2(rootPos.x + rootSize.x - this.btnWatch.size.x, rootPos.y + rootSize.y - this.btnWatch.size.y);

        let deltaPos = Vector2.subtract(pivotRight, pivotLeft);
        this.selfTweener = new TweenUI(this.btnSelf, pivotLeft.x, pivotLeft.y, 1);
        this.watchTweener = new TweenUI(this.btnWatch, pivotRight.x, pivotRight.y, 1);
        this.selfTweener.render();
        this.watchTweener.render();
        let tweenEasing = TweenUtil.Easing.Cubic.Out;
        const minAlph: number = 0.6;
        this.btnSelf.renderOpacity = 1;
        this.btnWatch.renderOpacity = minAlph;
        this.watchTween = new mw.Tween({ percent: 0 }).to({ percent: 1 }, 300).onUpdate((obj, elapsed) => {
            let dpPos = Vector2.multiply(deltaPos, obj.percent);

            this.selfTweener.x = dpPos.x + pivotLeft.x;
            this.selfTweener.y = dpPos.y + pivotLeft.y;
            this.selfTweener.alph = Math.max(1 - obj.percent, minAlph);

            this.watchTweener.x = pivotRight.x - dpPos.x;
            this.watchTweener.y = pivotRight.y - dpPos.y;
            this.watchTweener.alph = Math.max(obj.percent, minAlph);

            this.selfTweener.render();
            this.watchTweener.render();

            this.watchTweener.zOrder = 1;
            this.selfTweener.zOrder = 0;
        }).easing(tweenEasing);


        this.selfTween = new mw.Tween({ percent: 0 }).to({ percent: 1 }, 300).onUpdate((obj, elapsed) => {
            let dpPos = Vector2.multiply(deltaPos, obj.percent);

            this.selfTweener.x = pivotRight.x - dpPos.x;
            this.selfTweener.y = pivotRight.y - dpPos.y;
            this.selfTweener.alph = Math.max(obj.percent, minAlph);

            this.watchTweener.x = dpPos.x + pivotLeft.x;
            this.watchTweener.y = dpPos.y + pivotLeft.y;
            this.watchTweener.alph = Math.max(1 - obj.percent, minAlph);

            this.selfTweener.render();
            this.watchTweener.render();

            this.watchTweener.zOrder = 0;
            this.selfTweener.zOrder = 1;
        }).easing(tweenEasing);
    }
}
class TweenUI {
    private _alph: number = 1;
    private _x: number;
    private _y: number;
    private _location: mw.Vector2 = new mw.Vector2();
    constructor(private _node: mw.Widget, x: number, y: number, a: number) {
        this._x = x;
        this._y = y;
        this._alph = a;
    }
    get x() { return this._x }
    set x(v) { this._x = v }
    get y() { return this._y }
    set y(v) { this._y = v }
    public get alph(): number { return this._alph; }
    public set alph(value: number) { this._alph = value; }
    public get zOrder(): number { return this._node.zOrder; }
    public set zOrder(v: number) { this._node.zOrder = v; }
    render() {
        this._location.set(this._x, this._y);
        this._node.position = this._location;
        this._node.renderOpacity = this._alph;
    }
}