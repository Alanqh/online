import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { GlobalData } from "../../../const/GlobalData";
import { EPlayerState } from "../../../const/enum";
import { CrouchMask } from "../UI/CrouchMask";
import { PlyerState } from "./PlyerState";

/**
 * 潜行状态
 */
export class PlayerState_Crouch extends PlyerState {

    /**爬行行走动画 */
    private couchWalkAni: Animation = null;

    /**爬行静止动画 */
    private couchIdleAni: Animation = null;

    /**是否播放静止动画 */
    private isPlayIdleAni: boolean = false;

    /**是否播放行走动画*/
    private isPlayWalkAni: boolean = false;


    /**蒙版UI */
    private maskUI: CrouchMask = null;

    constructor(stateType: EPlayerState) {
        super(stateType);
        this.maskUI = UIService.getUI(CrouchMask);
    }

    enter() {
        //编辑器BUG: 动画切换玩家会站起来
        // Player.localPlayer.character.crouch(true);

        Player.localPlayer.character.maxWalkSpeed = GlobalData.PlayerSport.crouchSpeed;

        this.playCrouchAni();

        if (this.maskUI) { UIService.showUI(this.maskUI); this.maskUI.fade(true); }
    }

    exit() {
        //编辑器BUG: 动画切换玩家会站起来
        // Player.localPlayer.character.crouch(false);

        if (this.couchWalkAni != null) {
            PlayerManagerExtesion.rpcStopAnimation(Player.localPlayer.character, GlobalData.PlayerSport.crouchWalkAnimtion[0]);
            this.couchWalkAni = null;
        }

        if (this.couchIdleAni != null) {
            PlayerManagerExtesion.rpcStopAnimation(Player.localPlayer.character, GlobalData.PlayerSport.crouchIdleAnimtion[0]);
            this.couchIdleAni = null;
        }

        this.isPlayIdleAni = false;
        this.isPlayWalkAni = false;
        Player.localPlayer.character.maxWalkSpeed = this.sportModuleC.getPlayerSpeed();

        if (this.maskUI) { UIService.hideUI(this.maskUI); this.maskUI.fade(false); }
    }

    onUpdate(dt: number) {

        this.playCrouchAni();
    }

    /**
     * 播放潜行动画
     */
    private playCrouchAni() {

        let char = Player.localPlayer.character;
        if (char == null) return;
        let speed = char.velocity.length;
        if (speed <= 10) {
            if (this.isPlayIdleAni == false) {
                //fix: 第一播放RPC TODO
                this.couchIdleAni = PlayerManagerExtesion.rpcPlayAnimation(Player.localPlayer.character, GlobalData.PlayerSport.crouchIdleAnimtion[0],
                    GlobalData.PlayerSport.crouchIdleAnimtion[1], GlobalData.PlayerSport.crouchIdleAnimtion[2]);
                // console.error("静止动画_____________________________________");
                this.isPlayIdleAni = true;
                this.isPlayWalkAni = false;
            }
        }
        else {
            if (this.isPlayWalkAni == false) {
                //fix: 第一播放RPC TODO
                this.couchWalkAni = PlayerManagerExtesion.rpcPlayAnimation(Player.localPlayer.character, GlobalData.PlayerSport.crouchWalkAnimtion[0],
                    GlobalData.PlayerSport.crouchWalkAnimtion[1], GlobalData.PlayerSport.crouchWalkAnimtion[2]);
                // console.error("行走动画_____________________________________");
                this.isPlayWalkAni = true;
                this.isPlayIdleAni = false;
            }
        }
    }


    onDestory(): void {

    }


}