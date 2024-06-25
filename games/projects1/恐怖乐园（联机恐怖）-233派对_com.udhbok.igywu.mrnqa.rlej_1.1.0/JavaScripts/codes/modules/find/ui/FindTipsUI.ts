import { IFindElement } from "../../../../config/Find";
import { GameConfig } from "../../../../config/GameConfig";
import Findtips_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Findtips_UI_generate";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { FindData } from "../FindData";
import { FindModuleC } from "../FindModuleC";
import { FindDocumentUI } from "./FindDocumentUI";
import { FindGuideTxtUI, FindGuideUI } from "./FindGuideUI";

export class FindTipsUI extends Findtips_UI_Generate {
    private _curCfg: IFindElement;

    onStart() {
        this.layer = UILayerDialog;
        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this);
        })
        this.btn_jumptobook.onClicked.add(() => {
            UIService.show(FindDocumentUI, this._curCfg);
            UIService.hideUI(this);
        })
    }

    showReward(cfg: IFindElement) {
        this._curCfg = cfg;
        this.txt_itemname.text = cfg.name;
        this.img_finditem.imageGuid = cfg.icon;
        const qualityCfg = GameConfig.ItemQuality.getElement(cfg.quality);
        if (qualityCfg) {
            this.img_quality.imageGuid = qualityCfg.imgGuid;
        }
        UIService.showUI(this, this.layer);
    }

    onShow() {
        const module = ModuleService.getModule(FindModuleC);
        if (module.curGuide) {
            return;
        }
        ModuleService.getModule(FindModuleC).reqSetGuideStage(1);
        UIService.getUI(FindGuideTxtUI).showTxt("灵魂档案教学", "恭喜你找到了和怪物相关的魔物！", () => {
            UIService.getUI(FindGuideUI).handOnTarget(this.bg2, this.btn_jumptobook, "点击打开灵魂手册领取奖励", () => {
                return !this.visible;
            }, (isjump: boolean) => {
                isjump && GhostTraceHelper.onJumpFindGuide(1, 1);
                UIService.hideUI(this);
            });
        })
        GhostTraceHelper.uploadMGS("ts_game_over", "Find引导步骤", {
            round_id: 901,
            polong_hold: 1
        })
    }
}
