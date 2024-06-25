import Revive_Generate from "../ui-generate/GameHUD/Revive_generate";

export default class P_Revive extends Revive_Generate {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**设置复活币数量 */
    setCoinCount(count: number) {
        if (count == null) count = 0;
        this.mText_ReviveCoinCount.text = count.toString();
    }
}