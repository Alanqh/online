import { GlobalData } from "../../../const/GlobalData";
import Mask_Generate from "../../../ui-generate/GameHUD/Mask_generate";

 

export class CrouchMask extends Mask_Generate {

    private tweenFade: mw.Tween<any> = null;
    
    onStart() {
        this.layer = mw.UILayerSystem;
        this.mImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }


    public fade(isCrouch: boolean) {
 
        if (this.tweenFade) {
            this.tweenFade.stop();
        }

        let start = isCrouch ? 0 : 1;
        let end = isCrouch ? 1 : 0;
        this.mImage.renderOpacity = start;

        this.tweenFade = new mw.Tween({ alpha: start }).to({ alpha: end }, GlobalData.PlayerSport.crouchUIchangeTime * 1000)
            .onUpdate((data) => {
                this.mImage.renderOpacity = data.alpha;
            })
            .onComplete(() => {

            }).onStart(() => {

            })

        this.tweenFade.start();
    }


}