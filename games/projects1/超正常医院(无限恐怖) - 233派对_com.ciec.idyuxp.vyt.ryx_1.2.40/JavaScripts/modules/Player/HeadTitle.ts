import { GlobalData } from "../../const/GlobalData";
import InfectLine_Generate from "../../ui-generate/worldUI/InfectLine_generate";

export class HeadTitle {

    /**ui */
    private ui: InfectLine_Generate;

    public constructor(character: Character) {

        this.ui = mw.UIService.create(InfectLine_Generate);
        GameObject.asyncSpawn("UIWidget").then((obj) => {
            let head = obj as UIWidget;
            head.interaction = false;
            head.setTargetUIWidget(this.ui.uiWidgetBase);
            head.widgetSpace = WidgetSpaceMode.OverheadUI;
            // headUI.drawSize = new mw.Vector2(380, 160);
            head.occlusionEnable = true;
            character.attachToSlot(head, 23);
            head.localTransform.position = GlobalData.Biochemical.infectBarOffset;
        });
    }


    /**
     * 显示文字
     * @param text 显示的文字
     */
    public showText(text: string) {
        // if (!this.ui) {
        //     this.ui = mw.UIService.create(HeadTitle_Generate);
        // }
        // this.ui.mText_name.text = text;

    }

    /**更新血条 */
    public updateBlood(blood: number) {
        if (!this.ui) {
            this.ui = mw.UIService.create(InfectLine_Generate);
        }
        let rate = blood / 100;
        this.ui.mSpBar_Infect.percent = rate;
    }

    public setVisible(isShow: boolean) {
        if (this.ui) {
            this.ui.visible = isShow;
        }
    }

}