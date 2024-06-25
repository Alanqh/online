import { off } from "puerts";
import FollowHand_UI_Generate from "../../../../ui-generate/ShareUI/FollowHand_UI_generate";
import LiftUpHand_UI_Generate from "../../../../ui-generate/ShareUI/LiftUpHand_UI_generate";
import CardHand_UI_Generate from "../../../../ui-generate/ShareUI/card/CardHand_UI_generate";
import HandGroup_UI_Generate from "../../../../ui-generate/ShareUI/card/HandGroup_UI_generate";
import { PlayerInterModuleC } from "../../inter/PlayerInterModule";
import IDCardPanel from "./IDCardPanel";
import { EGameTheme, GamesStartDefines } from "../../../Defines";

export default class HandHud extends HandGroup_UI_Generate {

    ownerId: string;

    gameObjectId: string;

    private isFaker: boolean;

    onStart() {
        let handHud = UIService.create(CardHand_UI_Generate);
        handHud.btn_cardHand.onClicked.add(() => {
            if (!this.ownerId) { return; }
            UIService.show(IDCardPanel, this.ownerId, this.isFaker, this.gameObjectId);
        });

        this.container.addChild(handHud.uiWidgetBase);
        if (GamesStartDefines.gameTheme != EGameTheme.Hall) {
            return;
        }
        let liftupHand = UIService.create(LiftUpHand_UI_Generate);
        liftupHand.btn_liftUpHand.onClicked.add(() => {
            if (!this.ownerId) { return; }
            if (this.isFaker) { return; }
            ModuleService.getModule(PlayerInterModuleC).reqInterWithPlayer(this.ownerId, 1);
        })
        this.container.addChild(liftupHand.uiWidgetBase);

        let followHand = UIService.create(FollowHand_UI_Generate);
        followHand.btn_followHand.onClicked.add(() => {
            if (!this.ownerId) { return; }
            if (this.isFaker) { return; }
            ModuleService.getModule(PlayerInterModuleC).reqInterWithPlayer(this.ownerId, 2);
        })
        this.container.addChild(followHand.uiWidgetBase);
    }

    public setData(ownerId: string, isFaker: boolean = false, gameObjectId?: string) {
        this.ownerId = ownerId;
        this.isFaker = isFaker;
        this.gameObjectId = gameObjectId;
    }
}
