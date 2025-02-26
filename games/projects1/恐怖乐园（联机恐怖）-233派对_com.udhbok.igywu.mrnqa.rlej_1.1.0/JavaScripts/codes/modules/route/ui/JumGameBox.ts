import { GameConfig } from "../../../../config/GameConfig";
import GameSkip_UI_Generate from "../../../../ui-generate/ShareUI/hall/GameSkip_UI_generate";
import transferGameUI_Generate from "../../../../ui-generate/ShareUI/transferGameUI_generate";
import { EGameTheme } from "../../../GameStart";
import { CommonUtils } from "../../../utils/CommonUtils";
import { RouteModuleC } from "../RouteModule";

export default class JumpGameBox extends GameSkip_UI_Generate {

    /** 游戏主题 */
    private gameTheme: EGameTheme = EGameTheme.Graveyard;

    protected onShow(gameTheme: EGameTheme) {
        this.gameTheme = gameTheme;
        const cfg = GameConfig.GameTheme.getAllElement().find((e) => { return e.key === gameTheme });
        if (!cfg) {
            this.mTextBlock.text = StringUtil.format(GameConfig.SubLanguage.go_01.Value, gameTheme);
        }
        else {
            this.mTextBlock.text = CommonUtils.formatString(GameConfig.SubLanguage.go_01.Value, cfg.name);
        }

    }

    onStart() {

        this.btn_sure.onClicked.add(() => {
            UIService.hide(JumpGameBox);
            ModuleService.getModule(RouteModuleC).reqJumpGame(this.gameTheme);
        });

        this.btn_cancel.onClicked.add(() => {
            UIService.hide(JumpGameBox);
        });
    }
}

export class TransferGameUI extends transferGameUI_Generate {
    /** 游戏主题 */
    private gameTheme: EGameTheme = EGameTheme.Graveyard;

    onStart() {
        this.btn_sure.onClicked.add(() => {
            UIService.hideUI(this);
            ModuleService.getModule(RouteModuleC).reqJumpGame(this.gameTheme);
        });

        this.btn_close.onClicked.add(() => {
            UIService.hideUI(this);
        });
    }

    protected onShow(gameTheme: EGameTheme) {
        this.gameTheme = gameTheme;
        const cfg = GameConfig.GameTheme.getAllElement().find((e) => { return e.key === gameTheme });
        if (!cfg) {
            this.mTextGameName.text = StringUtil.format(GameConfig.SubLanguage["go_01"].Value, gameTheme);
        }
        else {
            this.mTextGameName.text = cfg.name;
            this.mText_desc.text = cfg.desc;
            this.img_gamePic.imageGuid = cfg.PIC.toString();
        }

    }
}
