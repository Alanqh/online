/*
 * @Author       : dal
 * @Date         : 2024-02-27 14:40:03
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-11 10:14:57
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\procedure\state\ProcedureState.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { EGameTheme, GamesStartDefines } from "../../../Defines";
import { ModifiedCameraSystem } from "../../../Modified027Editor/ModifiedCamera";
import { TimerOnly } from "../../../utils/AsyncTool";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import { UtilEx } from "../../../utils/UtilEx"
import { AchieveService, EAchieveType } from "../../achievement/AchieveDefine";
import { BuffModuleS } from "../../buff/BuffModule";
import RecordData from "../../record/RecordData";
import { RouteDataHelper, RouteDataType } from "../../route/RouteData";
import ProcedureScript from "../component/ProcedureScript"
import { GraveyardExpIndex, DiffExpIndex, HallExpIndex } from "../const/ClueDefine";
import BirthInfoHelper from "../util/BirthInfoHelper";

export class ProcedureStateBase extends UtilEx.StateFunc {

    protected countPlayerTimer: TimerOnly = new TimerOnly();
    protected countTime: number = 0;

    public constructor(protected owner: ProcedureScript) {
        super();
    }

    protected saveGameTime() {
        // 同时保存一下经验
        // 难度倍率
        let diffExpMul = 1;
        if (GlobalSwitch.isDynamicDegree()) {
            diffExpMul = GraveyardExpIndex;
        } else if (GamesStartDefines.gameTheme === EGameTheme.Hall) {
            diffExpMul = HallExpIndex;
        } else {
            diffExpMul = DiffExpIndex[this.owner.degree - 1];
        }
        let exp = Number((this.countTime * GameConfig.SubGlobal.NaturalOutputExpPerSec.number * diffExpMul).toFixed(3));
        if (Number.isNaN(exp) || exp === Infinity) { return; }
        exp *= BuffModuleS.getAttr(this.owner.userId).expIndex;
        RouteDataHelper.reqSetData(this.owner.userId, GamesStartDefines.gameTheme, [RouteDataType.TotalGameTime, RouteDataType.TotalExp], [this.countTime, exp]);
        this.countTime = 0;
        Event.dispatchToAllClient("OnExpChangeCall");

        // 监听在线时长的成就
        AchieveService.getAchieveIns(EAchieveType.OnlineTimeLength).listen(Player.getPlayer(this.owner.userId));
    }

    /** 客户端初始化玩家状态 */
    public client_initPlayerState() {
        if (SystemUtil.isServer()) { return; }
        const char = Player.localPlayer.character
        char.jumpEnabled = false;
        char.movementEnabled = false;
        char.worldTransform.position = BirthInfoHelper.instance.birthPos;
        const rot = BirthInfoHelper.instance.birthRot;
        char.worldTransform.rotation = rot;
        ModifiedCameraSystem.setOverrideCameraRotation(rot);
        ModifiedCameraSystem.resetOverrideCameraRotation();
    }
}