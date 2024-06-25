import BossWorld_UI_Generate from "../../../../ui-generate/ShareUI/boss/BossWorld_UI_generate";

export class BossWorldUI extends BossWorld_UI_Generate {
    onStart() {
        this.layer = UILayerDialog;
    }


}