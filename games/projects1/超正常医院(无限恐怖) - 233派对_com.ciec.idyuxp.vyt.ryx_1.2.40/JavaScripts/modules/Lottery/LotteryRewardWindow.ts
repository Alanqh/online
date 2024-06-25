
import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import LotteryRewardItem_Generate from "../../ui-generate/Lottery/LotteryRewardItem_generate";
import LotteryRewardShow_Generate from "../../ui-generate/Lottery/LotteryRewardShow_generate";
import { LotteryModuleC } from "./LotteryModule";
import { LotteryTransition } from "./LotteryTransition";


export interface ItemBaseInfo {
    // 物品表ID
    cfgID: number;
    // 数量
    count: number;
    /**Lottery表ID */
    lotteryCfgId: number;
}

export enum ShowRewardState {
    None = 0,
    showing = 1,
    canSkip = 2,
    canClose = 3,
}

class ItemTransInfo {
    public canvas: Canvas;
    public pos: Vector2;
    public item: P_RewardItem;
}

export default class P_LotteryRewardShow extends LotteryRewardShow_Generate {

    private curShowState: ShowRewardState = ShowRewardState.None;
    private saveAllItemInfo: ItemTransInfo[] = [];
    private allTweens: any[] = [];

    public init() {
        this.layer = UILayerDialog
        this.btn_close.onClicked.add(() => {
            this.changeShowState();
        })
        let counts = this.con_items.getChildrenCount()
        if (counts > 0) {
            for (let i = 0; i < counts; i++) {
                let canvas = this.con_items.getChildAt(i) as Canvas;
                let newInfo = new ItemTransInfo();
                newInfo.canvas = canvas;
                newInfo.pos = canvas.transform.position;
                this.saveAllItemInfo.push(newInfo);
            }
        }
    }

    public showReward(rewardArr: ItemBaseInfo[]) {

        if (rewardArr.length == 1) {
            this.showReward_Single(rewardArr[0]);
        } else {
            this.showReward_More(rewardArr);
        }
        this.curShowState = ShowRewardState.showing;
        setTimeout(() => {
            this.curShowState = ShowRewardState.canSkip;
        }, 1000);
        UIService.showUI(this);
    }

    private changeShowState() {
        switch (this.curShowState) {
            case ShowRewardState.None:
            case ShowRewardState.showing:
                return
            case ShowRewardState.canSkip:
                this.skipShow();
                break;
            case ShowRewardState.canClose:
                ModuleService.getModule(LotteryModuleC).showLotteryUI();
                UIService.hideUI(this);
                LotteryTransition.exit();
                this.curShowState = ShowRewardState.None;
                this.saveAllItemInfo.forEach(info => {
                    info.canvas.removeAllChildren();
                    info.item = null;
                })
                this.mCanvas_1item.removeAllChildren();
                break;
            default:
                break;
        }
    }

    private showReward_Single(itemInfo: ItemBaseInfo) {
        let item = UIService.create(P_RewardItem);
        item.init(itemInfo);
        this.mCanvas_1item.addChild(item.uiObject);
        let startPos = new Vector2(-item.uiObject.size.x - this.mCanvas_1item.position.x, 0)
        let tween = new Tween<{ pos: Vector2 }>({ pos: startPos }).to({ pos: Vector2.zero }, GlobalData.Lottery.SingleRewardTime * 1000)
            .onStart((info) => {
                item.uiObject.position = info.pos;
            })
            .onUpdate(info => {
                item.uiObject.position = info.pos;
            })
            .onComplete(() => {
                if (this.allTweens.includes(tween)) {
                    this.allTweens.splice(this.allTweens.indexOf(tween), 1);
                }
            }).start();
        this.allTweens.push(tween);
    }

    private showReward_More(itemInfoArr: ItemBaseInfo[]) {
        itemInfoArr.forEach((info, key) => {
            let item = UIService.create(P_RewardItem);
            item.init(info);
            let itemPosInfo = this.saveAllItemInfo[key];
            let startPos = null
            if (key < 5) {
                startPos = new Vector2(-(this.mCanvas_1item.position.x + itemPosInfo.pos.x), 0);
                // startPos = new Vector2(-1920, 0);
            } else {
                startPos = new Vector2(1920 - itemPosInfo.pos.x, 0);
            }
            itemPosInfo.item = item;
            itemPosInfo.canvas.addChild(item.uiObject);
            let tween = new Tween<{ pos: Vector2 }>({ pos: startPos }).to({ pos: Vector2.zero }, GlobalData.Lottery.MoreRewardTime * 1000)
                .onStart((info) => {
                    item.uiObject.position = info.pos;
                })
                .onUpdate(info => {
                    item.uiObject.position = info.pos;
                })
                .onComplete(() => {
                    if (this.allTweens.includes(tween)) {
                        this.allTweens.splice(this.allTweens.indexOf(tween), 1);
                    }
                }).start()
            this.allTweens.push(tween);
        })

    }

    private skipShow() {
        //TODO:跳过动画过程
        if (this.allTweens && this.allTweens.length > 0) {
            this.allTweens.forEach(t => {
                t.onComplete();
                t.stop();
            })
        }
        this.allTweens.length = 0;
        this.curShowState = ShowRewardState.canClose
    }
}

export class P_RewardItem extends LotteryRewardItem_Generate {

    public init(info: ItemBaseInfo) {
        let lotteryCfg = GameConfig.Lottery.getElement(info.lotteryCfgId);
        let day = lotteryCfg.ShowTime;
        let count: number = lotteryCfg.RewardCount;
        this.mText_Num.text = count.toString();
        switch (lotteryCfg.RewardType) {
            case 1:
            case 3:
                let itemCfg = GameConfig.Item.getElement(info.cfgID);
                this.img_icon.imageGuid = itemCfg.Icon;
                this.txt_name.text = day == null || day == 0 ? itemCfg.Name : itemCfg.Name + `${day}天`;
                this.mImg_back.imageGuid = GlobalData.Lottery.getQualityColorByType(itemCfg.QualityType)
                break;
            case 2:
                let clothCfg = GameConfig.Dress.getElement(info.cfgID);
                this.img_icon.imageGuid = clothCfg.Icon;
                this.txt_name.text = day == null || day == 0 ? clothCfg.Name : clothCfg.Name + `${day}天`;
                this.mImg_back.imageGuid = GlobalData.Lottery.getQualityColorByType(clothCfg.QualityType)
                break;
            default:
                break;
        }
    }
}