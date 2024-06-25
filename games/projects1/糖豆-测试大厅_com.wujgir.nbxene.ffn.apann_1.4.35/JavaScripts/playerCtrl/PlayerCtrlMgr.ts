import { GameConfig } from "../config/GameConfig";
import { GearConfig, IGearElement } from "../config/Gear";
import { SkillManager } from "../modules/Skill/SkillManager";
import { PlayerComponentMgr } from "./PlayerComponentMgr";
import PlayerCtrlUI from "./PlayerCtrlUI";
import { JumpFSM } from "./PlayerFSM";
import { PlayerParam } from "./PlayerParam";

/** 
 * @Author       : yuanqi.bai
 * @Date         : 2023-04-03 15:05:50
 * @LastEditors  : weihao.xu
 * @LastEditTime : 2023-11-22 15:03:17
 * @FilePath     : \stumbleguys_new\JavaScripts\playerCtrl\PlayerCtrlMgr.ts
 * @Description  : 角色控制中心
 */
export class PlayerCtrlMgr {
    private static _ins: PlayerCtrlMgr;
    public static get ins(): PlayerCtrlMgr {
        if (!this._ins) {
            this._ins = new PlayerCtrlMgr();
        }
        return this._ins;
    }
    public actionFSM: JumpFSM;
    private inited: boolean = false;
    /**
     * 初始化单例
     * @param character 外部等待玩家所有东西准备好之后再传入 
     */
    init(character: Character) {
        this.initPlayerParam();
        character.forceUpdateMovement = true;
        this.actionFSM = new JumpFSM(character);
        Event.addLocalListener("PLAYER_JUMP", () => {
            this.actionFSM.onClickJump();
        });
        Event.addLocalListener("GEAR_EFF_BY_CFG", (guid: string, id: number) => {
            if (guid == character.gameObjectId) {
                let gearCfg: IGearElement = GameConfig.getConfig(GearConfig).getElement(id)
                if (gearCfg && gearCfg.time) {
                    this.actionFSM.onGearHit(gearCfg);
                }
            }
        });
        //滑梯交互
        Event.addLocalListener("SLID_STATE_INT", (interval: boolean) => {
            if (interval) {
                this.actionFSM.slideEnter();
            } else {
                this.actionFSM.slideLeave();

            }
        });

        Event.addLocalListener("SUPER_JUMP", () => {
            this.actionFSM.forceToJump();
        });
        PlayerComponentMgr.ins.init(character);
        mw.UIService.show(PlayerCtrlUI);

        this.inited = true;
    }
    update(dt: number) {
        if (this.inited) {
            PlayerComponentMgr.ins.update(dt);
            SkillManager.instance.onUpdate(dt);
            this.actionFSM.update(dt);
        }
    }

    private initPlayerParam() {
        AssetUtil.asyncDownloadAsset("14701");
        PlayerParam.force = GameConfig.Swoop.getElement(1).Value;
        PlayerParam.delSpeed = GameConfig.Swoop.getElement(2).Value;
        PlayerParam.grounddelSpeed = GameConfig.Swoop.getElement(3).Value;
        PlayerParam.updelSpeed = GameConfig.Swoop.getElement(4).Value;
        PlayerParam.downdelSpeed = GameConfig.Swoop.getElement(5).Value;
        PlayerParam.minVelocity = GameConfig.Swoop.getElement(6).Value;
        PlayerParam.forceSize = GameConfig.Swoop.getElement(7).Value;
        PlayerParam.acceleratioonSize = GameConfig.Swoop.getElement(8).Value;
        PlayerParam.dropSpeedSize = GameConfig.Swoop.getElement(9).Value;
        PlayerParam.slideRotateSpeed = GameConfig.Swoop.getElement(10).Value;
        PlayerParam.initSpeed = GameConfig.Swoop.getElement(11).Value;
        PlayerParam.up = GameConfig.Swoop.getElement(12).Value;
        PlayerParam.forward = GameConfig.Swoop.getElement(13).Value;
        PlayerParam.slideSpeed = GameConfig.Swoop.getElement(14).Value;
        PlayerParam.g = GameConfig.Swoop.getElement(15).Value;
        PlayerParam.maxFallingSpeed = GameConfig.Swoop.getElement(18).Value;
        PlayerParam.airControl = GameConfig.Swoop.getElement(19).Value;
        PlayerParam.airControlBoostMultiplier = GameConfig.Swoop.getElement(20).Value;
        PlayerParam.airControlBoostVelocityThreshold = GameConfig.Swoop.getElement(21).Value;
        PlayerParam.gravityScale = GameConfig.Swoop.getElement(22).Value;
        PlayerParam.maxJumpHeight = GameConfig.Swoop.getElement(23).Value;
        PlayerParam.maxWalkSpeed = GameConfig.Swoop.getElement(24).Value;
    }
}