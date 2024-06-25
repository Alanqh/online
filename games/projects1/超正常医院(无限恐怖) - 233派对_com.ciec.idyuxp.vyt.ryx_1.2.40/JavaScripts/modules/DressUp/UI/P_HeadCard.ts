import { GameConfig } from "../../../config/GameConfig";
import { INameTitleElement } from "../../../config/NameTitle";
import HeadTitle_Generate from "../../../ui-generate/Shop/HeadTitle_generate";

/**头顶名片UI */
export default class P_HeadCard extends HeadTitle_Generate {

    private defaultConf: INameTitleElement;

    onStart() {
        console.log("头顶名片UI");
        
        this.defaultConf = GameConfig.NameTitle.findElement("isDefault", 1);
        console.log(`默认配置id = ${this.defaultConf.id}`);
    }


    public setHeadUI(confId: number) {
        if (confId == null || isNaN(confId)) {
            confId = this.defaultConf.id;
        }

        let conf = GameConfig.NameTitle.getElement(confId);

        if (confId == null || conf.picId == null) {
            conf = this.defaultConf;
        }
        // 设置图片
        if (conf.picId == null) {
            this.mImage.visibility = SlateVisibility.Collapsed;
        } else {
            this.mImage.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mImage.imageGuid = conf.picId;
        }
        // 设置文字
        this.mText_name.fontColor = LinearColor.colorHexToLinearColor(conf.Color);
        this.mText_name.outlineSize = conf.strokeSize;
        this.mText_name.outlineColor = LinearColor.colorHexToLinearColor(conf.strokeColor);

        console.log(`头顶ui: picID:${conf.picId}, color:${conf.Color}, strokeSize:${conf.strokeSize}, strokeColor:${conf.strokeColor}`)
    }


    /**设置名片文字 */
    public setNickName(playerId: number) {
        // 设置名称为玩家昵称
        Player.asyncGetPlayer(playerId).then(player => {
            let nickname = player.nickname;
            this.mText_name.text = nickname && nickname != "" ? nickname : playerId.toString();
        })
    }

}