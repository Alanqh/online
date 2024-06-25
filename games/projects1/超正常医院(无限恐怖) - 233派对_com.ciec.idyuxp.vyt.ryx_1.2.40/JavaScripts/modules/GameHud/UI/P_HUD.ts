

import HUD_Generate from "../../../ui-generate/GameHUD/HUD_generate";


export class P_HUD extends HUD_Generate {

    onStart() {

    }

    public setInter(isInter: boolean) {
        this.mVirtualJoystick.setVisibility(isInter ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden);
        this.mVirtualJoystick.resetJoyStick();
    }

    protected onShow(...params: any[]): void {

    }

    onHide() {
        this.mVirtualJoystick.resetJoyStick();
    }

}