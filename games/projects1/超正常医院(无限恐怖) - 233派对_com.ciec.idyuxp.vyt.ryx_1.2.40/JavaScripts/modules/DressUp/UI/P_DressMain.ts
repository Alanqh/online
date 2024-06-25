
import { GameConfig } from "../../../config/GameConfig";
import DressMain_Generate from "../../../ui-generate/Dress/DressMain_generate";
import P_DressTab1 from "./P_DressTab1";
import P_SelfDress from "./P_SelfDress";

/**装扮系统主入口 */
export default class P_DressMain extends DressMain_Generate {

    /**页签map 参数1.id  参数2. UI类 */
    public tabMap: Map<number, P_DressTab1> = new Map();


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initTab();
        this.layer = UILayerMiddle;
    }

    /**初始化页签 */
    private initTab() {
        // 将一级页签添加进列表
        let confs = GameConfig.DressTab.getAllElement();
        console.log(`main: 页签数量: ${confs.length}`);
        confs.forEach((conf) => {
            if (conf.tabLevel == 1) {
                let tab = UIService.create(P_DressTab1);
                tab.mText_TagName.text = conf.tabName;
                tab.mBtn_Tab.onClicked.add(() => {
                    let selfDressUI = UIService.show(P_SelfDress);

                    this.hide();
                });
                this.tabMap.set(conf.id, tab);
                this.mCanvas_Tab1.addChild(tab.uiObject);
                console.log(`main: 添加一级页签: ${conf.tabName}`);
            }
        });
    }



}