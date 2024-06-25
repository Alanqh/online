import { IGamePassLevelElement } from "../../config/GamePassLevel";
import PassCheckItem_Generate from "../../ui-generate/Event/PassCheckItem_generate";
import BattlePassModuleData from "./BattlePassModuleData";
import P_PassRewardItem from "./P_PassRewardItem";

/**单个等级的奖励 */
export default class P_BattlePassItem extends PassCheckItem_Generate {

    /**免费奖励列表 */
    public freeItems: P_PassRewardItem[] = [];
    /**通行证奖励列表 */
    public collectionItems: P_PassRewardItem[] = [];
    /**配置 */
    public conf: IGamePassLevelElement;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    /**初始化 一个等级的战令UI */
    init(conf:IGamePassLevelElement, data: BattlePassModuleData){
        this.conf = conf;
        // 等级UI
        this.mTxt_Level.text = conf.ShowLevel.toString();
        
        // 初始化免费奖励
        conf.NormalRewardCfgID.forEach((id)=>{
            let freeItem = UIService.create(P_PassRewardItem);
            this.mCanvas_Free.addChild(freeItem.uiObject);
            freeItem.init(id, data, conf.ShowLevel, false);
            this.freeItems.push(freeItem);
        });
        // 初始化通行证奖励
        conf.SpecialRewardCfgID.forEach((id)=>{
            let collectionItem = UIService.create(P_PassRewardItem);
            this.mCanvas_Collection.addChild(collectionItem.uiObject);
            collectionItem.init(id, data, conf.ShowLevel, true);
            this.collectionItems.push(collectionItem);
        });
    }
}