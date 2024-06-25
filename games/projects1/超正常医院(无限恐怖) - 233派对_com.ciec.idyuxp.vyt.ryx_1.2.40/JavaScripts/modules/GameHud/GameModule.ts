import { GlobalData, } from "../../const/GlobalData";
import { Events_CS, PlayerCurState, ShopType, TabType } from "../../const/enum";
import Login_Generate from "../../ui-generate/GameHUD/Login_generate";
import Struggle_Generate from "../../ui-generate/GameHUD/Struggle_generate";
import { SoundManager } from "../../utils/SoundManager";
import InteractBtn from "../../utils/UI/InteractBtn";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { SceneUnitModuleC } from "../SceneUnitModule/SceneUnitModuleC";
import P_Game_HUD from "./UI/P_Game_HUD";
import { P_HUD } from "./UI/P_HUD";
import { utils } from "../../utils/uitls";
import { FrameAction } from "../../Tool/AnimationEditor/FrameAction";
import { AnalyticsModuleC } from "../Analytics/AnalyticsModule";
import P_Guide from "../Guide/P_Guide";
import { ShopModuleC } from "../Shop/ShopModuleC";
import P_PropBar from "../Bag/P_PropBar";
import { P_Bio } from "./UI/P_BioActiviy";

//客户端
export class GameModule_Client extends ModuleC<GameModule_Server, null> {
    public hudPanel: P_Game_HUD = null;
    private hud: P_HUD;
    // private loginUI: Login_Generate;
    /**解救玩家的id */
    private tarPlayerId: number = 0;

    protected onAwake(): void {

        // this.loginUI = mw.UIService.getUI(Login_Generate);
        // if (!this.loginUI) {
        //     this.loginUI = mw.UIService.getUI(Login_Generate);
        // }
        // 初始化帧事件
        FrameAction.initFrameAction();
    }

    onStart() {

        this.hudPanel = mw.UIService.getUI(P_Game_HUD);
        this.hud = mw.UIService.getUI(P_HUD);
        this.addEvent();

        console.warn(`lwj hudMC onStart`);
    }

    protected onUpdate(dt: number): void {
        utils.frameCount = 1 / dt;
        utils.dt = dt;
    }


    private addEvent() {

        // this.loginUI.show();

        // this.loginUI.mYes_btn.onClicked.add(() => {
        this.hud.show();
        // this.loginUI.hide();
        this.hudPanel.show();

        ModuleService.getModule(AnalyticsModuleC).coreStart();

        // 显示道具栏
        UIService.show(P_PropBar);

        // if ((DataCenterC.getData(GuideModuleData).isFinishGuide || DataCenterC.getData(GuideModuleData).isGuiding)
        //     && DataCenterC.getData(ShopData).isShowGift) {
        //     let shopModuleC = ModuleService.getModule(ShopModuleC);
        //     shopModuleC.showScreenShop(11011);
        // }
        // });

        //点击呼救按钮
        UIService.getUI(Struggle_Generate).mBrn_Striggle.onClicked.add(() => {
            ModuleService.getModule(PlayerModuleC).callHelp();
        });


        //点击 交互攻击按钮事件
        let sceneUnitModuleC = ModuleService.getModule(SceneUnitModuleC);
        this.hudPanel.attNpcAC.add((id) => {
            sceneUnitModuleC.playerAttackSceneUnit(id);
            UIService.getUI(P_Guide).arrowAnim(false);
        });

        // 在指定客户端播放音效
        Event.addServerListener(Events_CS.PlaySound, (soundId: number) => {
            SoundManager.instance.playSound(soundId);
        });

        // 在客户端播放动画
        Event.addServerListener(Events_CS.PlayAnimation_C, async (playerId: number, assetId: string, loop: number, speed: number) => {
            if (!AssetUtil.assetLoaded(assetId)) await AssetUtil.asyncDownloadAsset(assetId);
            let player = await Player.asyncGetPlayer(playerId);
            let anim = player.character.loadAnimation(assetId);
            anim.loop = loop;
            anim.speed = speed;
            anim.play();
        });

        // 在客户端播放动画(动画编辑器)
        Event.addServerListener(Events_CS.playAnimation_C_Editor, async (playerId: number, confId: number) => {
            let mCharacter = Player.getPlayer(playerId)?.character;
            if (mCharacter == null) return;
            utils.playAnimation(mCharacter, confId);
        });

        let shopModuleC = ModuleService.getModule(ShopModuleC);
        this.hudPanel.onOpenShop.add((type: ShopType) => {
            shopModuleC.showShop(type);
        });

        //活动模式 UI 
        let bioUI = UIService.getUI(P_Bio);
        bioUI.onJumpGameAC.add(() => {
            bioUI.hide();
            this.server.net_jumpGame();
        });
        bioUI.mBtn_EventShop.onClicked.add(() => {
            bioUI.hide();
            shopModuleC.showShop(ShopType.Shop, TabType.Score);
        })
        this.hudPanel.mBtn_Event.onClicked.add(() => {
            bioUI.show();
        });

        this.hudPanel.mBtn_EventShop.onClicked.add(() => {
            shopModuleC.showShop(ShopType.Shop, TabType.Score);
        })

    }


    public playerHpChange(hp: number): void {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(P_Game_HUD);
        }
        this.hudPanel.setHp(hp);
    }

    /**添加解救玩家 */
    public addRescuePlayer(isadd: boolean, playerId: number): void {
        if (GlobalData.curPlayerData.PlayerState != PlayerCurState.Survive) return;
        // if (MonsterChangeC.curPlayerRace == PlayerRace.Ghost) return;
        if (playerId)
            this.tarPlayerId = playerId;

        if (isadd)
            InteractBtn.instance.addClickFun(this.rescuePlayer, this, this.tarPlayerId);
        else
            InteractBtn.instance.removeClickFun(this.rescuePlayer, this, this.tarPlayerId);
    }

    /**解救玩家 */
    private rescuePlayer(): void {
        let playerMC = ModuleService.getModule(PlayerModuleC);
        playerMC.rescuePlayer(this.tarPlayerId);
        console.warn(`lwj 解救玩家`);
        InteractBtn.instance.removeClickFun(this.rescuePlayer, this, this.tarPlayerId);
    }

    /**恢复视角 */
    private recoverDefaultState(): void {


        InteractBtn.instance.removeClickFun(this.recoverDefaultState, this);


        // // 弹新手提示
        // ModuleService.getModule(GuideModuleC).initModule();
        // let timeMC = ModuleService.getModule(TimeModuleC);
        // // 显示新手任务详情
        // if (timeMC.isNight() && timeMC.mode == GameMode.Dream) ActionCommon.onShowTaskDetail.call(TaskEnum.findTpDoor);
        // timeMC.onNightStart.add((mode: GameMode) => {
        //     if (mode == GameMode.Dream) ActionCommon.onShowTaskDetail.call(TaskEnum.findTpDoor);
        // })
    }

    /**
     * 偷袭按钮显隐
     * @param isVisible 是否显示交互按钮
     */
    public setAttackBtnVisible(isVisible: boolean, scenceID: number) {
        if (!this.hudPanel) {
            this.hudPanel = UIService.getUI(P_Game_HUD);
        }
        this.hudPanel.setAttackBtnVisible(isVisible, scenceID);
        if (isVisible) {
            //引导
            // ActionCommon.onShowTaskDetail.call(TaskEnum.special_attack);
        } else {
            UIService.getUI(P_Guide).arrowAnim(false);
        }
    }

}





//服务端
export class GameModule_Server extends ModuleS<GameModule_Client, null> {

    protected onStart(): void {

        // 初始化帧事件
        FrameAction.initFrameAction();
    }

    protected onPlayerEnterGame(player: mw.Player): void {

        // 在全部客户端播放动画
        Event.addClientListener(Events_CS.PlayAnimation_S, (player: Player, assetId: string, loop: number, speed: number) => {
            Event.dispatchToAllClient(Events_CS.PlayAnimation_C, player.playerId, assetId, loop, speed);
        });
        // 在全部客户端播放动画(动画编辑器)
        Event.addClientListener(Events_CS.playAnimation_S_Editor, (player: Player, confId: number) => {
            Event.dispatchToAllClient(Events_CS.playAnimation_C_Editor, player.playerId, confId);
        })
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
        } catch (error) {
        }
    }


    @Decorator.noReply()
    net_setPlayerName(name: string) {
        this.currentPlayer.character.displayName = name;
    }


    @Decorator.noReply()
    net_jumpGame() {
        TeleportService.asyncTeleportToScene("abnormal-town", [this.currentPlayer.userId]);
    }
}
