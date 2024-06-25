/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-05-17 15:14:36
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-12-19 19:05:24
 * @FilePath     : \stumbleguys_new\JavaScripts\modules\PlayerModule\PlayerModuleC.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../config/GameConfig";
import { MGSGame } from "../../mgs/MGSGame";
import { MGSTeam } from "../../mgs/MGSTeam";
import BlockWall from "../../newPrefab/BlockWall";
import { TeamService } from "../../Prefabs/team/Team";
import { TeamUI } from "../../Prefabs/team/ui/TeamUI";
import { Singleton } from "../../tool/Singleton";
import ItemObj from "../dress/ItemObj";
import { ScriptManager } from "../dress/ScriptManager";
import ProcessModuleC from "../ProcessModule/ProcessModuleC";
import PlayerModuleS from "./PlayerModuleS";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, null> {

    public cacheMember: string[] = []

    protected onStart(): void {


        Event.addLocalListener("GameState.Join.Client", (teamId: string) => {
            if (this.localPlayer.teamId == teamId) {
                this.lockPlayerInput();
            }
        });


        Event.addLocalListener("GameState.Overlook.Client", (teamId: string) => {
            if (this.localPlayer.teamId == teamId) {
                Singleton.getIns(BlockWall).start();
                if (GameConfig.GameInfo.getElement(1).type == 2) {
                    Event.dispatchToServer("PlayerCount.FixReq", teamId);
                }
                this.lockPlayerInput();
            }
        });

        Event.addLocalListener("GameState.CountDown.Client", (teamId: string) => {
            if (this.localPlayer.teamId == teamId) {
                // this.lockPlayerInput();
                this.unlockPlayerInput()
                //镜头回归
                // new mw.Tween({ fov: 120 })
                //     .to({ fov: 90 }, 250)
                //     .onUpdate((obj) => {
                //         Camera.currentCamera.fov = obj.fov
                //     })
                //     .start();
            }
        });
        Event.addLocalListener("GameState.Gameing.Client", (teamId: string) => {
            if (this.localPlayer.teamId == teamId) {
                setTimeout(() => {
                    this.onGameStart();
                }, 1000);
                Singleton.getIns(BlockWall).destroy();
                this.unlockPlayerInput();
            }
        });
        //通关的控制层控制由ProcessModule实现
        // Event.addLocalListener("FinishLine.Pass.Client", (guid: string) => {
        //     this.onPlayerFinish(guid);
        // })

        Event.addLocalListener("GameState.End.Client", (teamId: string) => {
            if (this.localPlayer.teamId == teamId) {
                this.lockPlayerInput();
            }
        });

        Event.addLocalListener("Analyst.Dead", (order: number) => {
            Singleton.getIns(MGSGame).reborn(order);
        });

        Event.addLocalListener("CheckAfk.client", () => {
            Singleton.getIns(MGSGame).checkAfk();
        });
        let findTimer = setInterval(() => {
            const itemObj = Singleton.getIns(ScriptManager).getScriptOnPlayer(Player.localPlayer.playerId, ItemObj);
            if (itemObj) {
                clearInterval(findTimer);
                let userName = mw.AccountService.getNickName();
                if (!userName) userName = "Player" + this.localPlayer.playerId;
                itemObj.setCharacterName(userName);
            }
        }, 500);
        // 同步玩家名字

        Event.addServerListener("Team.Query", (members: string[]) => {
            mw.UIService.show(TeamUI, members, this.localPlayer.userId);
            this.cacheMember = members
        });
        Event.dispatchToServer("Team.Query");
    }
    /**
     * 游戏开始
     */
    private async onGameStart(): Promise<void> {
        //开始时再请求一次队伍信息
        Event.dispatchToServer("Team.Query");

        const gameData = await ModuleService.getModule(ProcessModuleC).getGameInfo();
        if (gameData) {
            Singleton.getIns(MGSGame).startGame(gameData.round, gameData.teamPlayerNum);
            const oriSize = TeamService.getTeamSize();
            const curSize = TeamService.getCurTeamSize();
            Singleton.getIns(MGSTeam).teamSizeLoss(oriSize > 0 ? 1 : 0, oriSize, curSize, gameData.round);
        }
    }

    /**
     * 玩家完成
     * @param guid 玩家guid
     */
    private onPlayerFinish(guid: string): void {
        const curGuid = Player.localPlayer.character.gameObjectId;
        if (guid === curGuid) {
            this.lockPlayerInput();
        }
    }

    /**
     * 锁定玩家输入
     */
    private lockPlayerInput(): void {
        if (this.localPlayer) {
            // this._curPlayer.character.movementEnabled = false;
            // this._curPlayer.character.jumpEnabled = false;
        }
        Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", false);
    }

    /**
     * 解锁玩家输入
     */
    private unlockPlayerInput(): void {
        if (this.localPlayer) {
            // this._curPlayer.character.movementEnabled = true;
            // this._curPlayer.character.jumpEnabled = true;
        }
        Event.dispatchToLocal("SET_CTRL_UI_VISIBLE", true);
    }


}