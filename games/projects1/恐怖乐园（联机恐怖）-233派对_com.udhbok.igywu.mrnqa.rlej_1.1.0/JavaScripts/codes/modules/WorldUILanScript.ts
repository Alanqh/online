import { LanUtil } from "../utils/LanUtil";



@Component
export default class WorldUILanScript extends Script {

    @mw.Property({ displayName: "多语言key" })
    public langueKey: string = "shop_18"
    @mw.Property({ displayName: "ui文本路径" })
    public textPath: string = "RootCanvas/text_shop"

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.gameObject.asyncReady().then(() => {
            let worldUI = this.gameObject as UIWidget;
            let ui = worldUI.getTargetUIWidget()
            let txtName = ui.findChildByPath(this.textPath) as TextBlock;
            if (txtName) {
                txtName.text = LanUtil.getText(this.langueKey)
            }
        })
    }

}