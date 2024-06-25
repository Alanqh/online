import { GameConfig } from "../../../config/GameConfig";
import { TipsUI } from "../../ui/TipsUI";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import RecordData from "../record/RecordData";
import GhostBossCom from "./GhostBossCom";
import { BossLifeInfo } from "./GhostBossCtl";
import { BossInfo } from "./GhostBossInst";
import { GhostBossModuleS } from "./GhostBossModuleS";
import { BossConst } from "./const/BossConst";
import { BossInfoUI } from "./ui/BossInfoUI";
import { BossResultUI } from "./ui/BossResultUI";

export class GhostBossModuleC extends ModuleC<GhostBossModuleS, null> {
    lifeTimer: any;

    bossLifeInfos: BossLifeInfo[] = [];

    private comArr: GhostBossCom[] = [];

    private _ui: BossInfoUI;

    public isInBattle: boolean = false;
    curCom: GhostBossCom;

    protected onStart(): void {
        this.lifeTimer = setInterval(() => {
            this.onLifeTimer();
        }, 1000);
        this._ui = UIService.getUI(BossInfoUI);
        UIService.show(BossInfoUI)
        this._ui.setBossCavVisiable(false);
        this._ui.setTipsVisiable(false);
    }

    public isSynced: boolean = false

    public reqSyncData() {
        if (this.isSynced) {
            return;
        }
        this.isSynced = true;
        this.server.net_reqSyncData();
    }

    protected onLifeTimer(): void {
        this.bossLifeInfos.forEach(e => {
            e.vanishTime -= 1;
            if (!e.isSpawned) {
                let restTime = e.vanishTime - BossConst.LIMIT_TIME
                restTime = Math.max(restTime, 0);
                let timeTxt = CommonUtils.FormatTimeMS(restTime);
                e.cli_com.ui2.mTxt.text = CommonUtils.formatString(LanUtil.getText("BossTips_4"), timeTxt, LanUtil.getText(e.cli_cfg.photoTag));
                if (Math.ceil(restTime) == BossConst.FALL_TIME) {
                    e.cli_com.playFallEffect(restTime)
                }
            }
            else {
                let timeTxt = CommonUtils.FormatTimeMS(Math.max(0, e.vanishTime));
                e.cli_com.ui1.mText_BTime.text = timeTxt;
                if (e.cli_com.isentry) {
                    this._ui.updateTimer(timeTxt);
                }
            }
        })
    }

    addBossArea(com: GhostBossCom) {
        this.comArr.push(com);
    }

    net_syncBossInfos(infoArr: BossLifeInfo[]) {
        infoArr.forEach(e => {
            if (!e.isSpawned) {
                this.net_addBoss(e);
            }
            else {
                this.net_spawnBoss(e);
            }
        })
    }

    net_spawnBoss(newInfo: BossLifeInfo) {
        let info = this.bossLifeInfos.find(e => { return e.onlyid == newInfo.onlyid; });
        if (!info) {
            info = newInfo;
            info.cli_com = this.comArr.find(e => { return e.gameObject.gameObjectId == info.spawnPoint; });
            info.cli_cfg = GameConfig.GhostInstance.getElement(info.insId);
            this.bossLifeInfos.push(info);
        }
        info.isSpawned = true;
        info.vanishTime = newInfo.vanishTime;
        info.cli_com.setStat(1);
    }

    net_addBoss(info: BossLifeInfo) {
        info.cli_cfg = GameConfig.GhostInstance.getElement(info.insId);
        info.cli_com = this.comArr.find(e => { return e.gameObject.gameObjectId == info.spawnPoint; });
        this.bossLifeInfos.push(info);
        const restSpawnTime = info.vanishTime - BossConst.LIMIT_TIME;
        if (restSpawnTime <= BossConst.FALL_TIME) {
            info.cli_com.playFallEffect(restSpawnTime)
        }
        info.cli_com.setStat(0);
    }

    net_removeBoss(newInfo: BossLifeInfo) {
        const infoIndex = this.bossLifeInfos.findIndex(e => { return e.onlyid == newInfo.onlyid; });
        if (infoIndex == -1) {
            return;
        }
        const info = this.bossLifeInfos[infoIndex];
        this.bossLifeInfos.splice(infoIndex, 1);
        info.cli_com.setStat(2);
    }

    reqEntryBoss(comId: string, com: GhostBossCom) {
        this.isInBattle = true;
        this.server.net_entryBoss(comId);
        this.curCom = com;
    }

    reqLeaveBoss(comid: string) {
        this.isInBattle = false;
        this.server.net_LeaveBoss(comid);
    }

    net_sendReward(ids: number[], counts: number[], issuc: boolean, lvel: number) {
        UIService.getUI(BossInfoUI).setBossCavVisiable(false);
        UIService.getUI(BossResultUI).showReward(ids, counts, issuc, lvel);
    }

    net_tipsHeiHei(charName: string, bossName: string) {
        UIService.getUI(TipsUI).showTips(CommonUtils.formatString(LanUtil.getText("BossTips_6"), charName, LanUtil.getText(bossName)));
    }

    net_fristDmg(scene_id: number) {
        GhostTraceHelper.uploadMGS("ts_game_over", "玩家首次对某个boss造成伤害上发", {
            round_id: 1008613,
            scene_id: scene_id
        })
    }

    net_sendVectory(bossinfo: BossInfo, isSuc: boolean, minHp: number, fightCount: number, hurtCount: number, lifeTime: number) {
        GhostTraceHelper.uploadMGS("ts_game_over", "玩家首次对某个boss造成伤害上发", {
            round_id: 1008614,
            scene_id: bossinfo.sceneId,
            monster_num: bossinfo.insId,
            stage_level: bossinfo.difficult,
            dead: isSuc ? 1 : 0,
            survive_time: lifeTime,
            totalnum: bossinfo.playercount,
            win_num: fightCount,
            suicide: hurtCount,
            player_score: minHp,
            door_broken: DataCenterC.getData(RecordData).baseRecordInfo.playerLevel
        })
    }
}