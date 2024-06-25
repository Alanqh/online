import { off } from "puerts";
import { IFindElement } from "../../../../config/Find";
import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import Document_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Document_UI_generate";
import Findthing_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Findthing_UI_generate";
import Multiitem_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Multiitem_UI_generate";
import Nodeitem_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/Nodeitem_UI_generate";
import WardItem_UI_Generate from "../../../../ui-generate/ShareUI/Find相关UI/WardItem_UI_generate";
import ShopDetail_UI_Generate from "../../../../ui-generate/ShareUI/shop/ShopDetail_UI_generate";
import { CommonUtils } from "../../../utils/CommonUtils";
import { LanUtil } from "../../../utils/LanUtil";
import Tips from "../../../utils/Tips";
import { GridContainer } from "../../../utils/UIPool";
import { UIItemDetail } from "../../store/ui/UIItemDetail";
import { FindData } from "../FindData";
import { FindModuleC } from "../FindModuleC";
import { FindGuideTxtUI, FindGuideUI } from "./FindGuideUI";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import RecordData from "../../record/RecordData";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { UtilEx } from "../../../utils/UtilEx";

const lan6 = "已收藏{0}/{1}"

const pageCount: number = 6;

class BookData {
    public cfgs: IFindElement[] = [];
    public isCanGet: boolean = false;
}

class MultiItemUI extends Multiitem_UI_Generate {
    private _itemCfg: IItemElement;
    onStart() {
        this.btn.onClicked.add(() => {
            let pos: Vector2 = new Vector2(0, 0);
            mw.localToViewport(this.rootCanvas.tickSpaceGeometry, Vector2.zero, new Vector2(0, 0), pos);
            pos.y += this.rootCanvas.size.y;
            UIService.show(UIItemDetail, this._itemCfg, pos);
        })
    }

    setData(itemcfg: IItemElement, count: number) {
        this._itemCfg = itemcfg
        this.img_multiItem.imageGuid = itemcfg.icon;
        this.txt_itemname.text = `${itemcfg.name}`
        this.txt_number.text = `${count}`
    }
}

export class FindDocumentUI extends Document_UI_Generate {

    private _bookCon: GridContainer<DocumentItemUI>;

    private _processCon: GridContainer<DocumentProcessUI>;

    private _pool: GridContainer<MultiItemUI>;

    private _bookDatas: BookData[] = [];

    private _curPage: number = 0;

    /** 最大边界 */
    private _maxBound: Vector2;

    private _isgetreward: boolean = false;

    private _tweenAniCount: number = 0;

    public get maxBound() {
        if (!this._maxBound) {
            const curViewPortScale = getViewportScale();
            let viewPortSize = getViewportSize();
            this._maxBound = new Vector2(viewPortSize.x / curViewPortScale, viewPortSize.y / curViewPortScale);
        }
        return this._maxBound;
    }


    onStart() {
        Event.addLocalListener("onOpenKillUI", () => {
            if (this.visible) {
                UIService.hideUI(this);
            }
        })
        this.layer = UILayerTop;
        this._bookCon = new GridContainer(this.canvas_findnote, DocumentItemUI);
        this._processCon = new GridContainer(this.canvas_nodeward, DocumentProcessUI);
        this._pool = new GridContainer(this.canvas_prize, MultiItemUI);
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
        })
        const allFindCfgs = GameConfig.Find.getAllElement().filter(e => {
            return !e.process;
        })
        let maxCount = Math.ceil(allFindCfgs.length / pageCount);
        for (let index = 0; index < maxCount; index++) {
            this._bookDatas.push(new BookData());
        }
        for (let index = 0; index < allFindCfgs.length; index++) {
            const cfg = allFindCfgs[index];
            let curPage = Math.floor(index / pageCount);
            this._bookDatas[curPage].cfgs.push(cfg);
        }

        this.btn_next.onClicked.add(() => {
            this._curPage++;
            this._curPage = Math.min(this._bookDatas.length - 1, this._curPage);
            this.refresh();
        })
        this.btn_last.onClicked.add(() => {
            this._curPage--;
            this._curPage = Math.max(0, this._curPage);
            this.refresh();
        })

        this.btn_close.onClicked.add(() => {
            this.btn_close.visibility = SlateVisibility.Collapsed;
            this.canvas_tips.visibility = SlateVisibility.Collapsed;
            this.canvas_pool.visibility = SlateVisibility.Collapsed;
        })

        const data = DataCenterC.getData(FindData);

        data.onDataChange.add(() => {
            if (!this.visible) {
                return;
            }
            this._isgetreward = true;
            this.refreshPointFunc();
        })
    }

    private refreshPointFunc = () => {
        const data = DataCenterC.getData(FindData);
        const module = ModuleService.getModule(FindModuleC);
        const canGetIds = data.finds.filter(e => {
            return !data.rewardItems.includes(e);
        });

        this._bookDatas.forEach(e => {
            e.isCanGet = e.cfgs.findIndex(e => { return canGetIds.includes(e.id); }) != -1;
        })
        if (module.curGuide == 1) {
            this._curPage = this._bookDatas.findIndex(e => {
                return e.isCanGet;
            })
        }
        this.refresh();
    }

    onShow(cfg: IFindElement) {
        this.btn_close.visibility = SlateVisibility.Collapsed;
        this.canvas_tips.visibility = SlateVisibility.Collapsed;
        this.canvas_pool.visibility = SlateVisibility.Collapsed;
        if (!cfg) {
            this._curPage = 0;
        }
        else {
            this._curPage = this._bookDatas.findIndex(e => {
                return e.cfgs.includes(cfg);
            })
        }

        this._isgetreward = false;
        this.refreshPointFunc();
        this._tweenAniCount = 0;
        UIAniUtil.popUp(this.rootCanvas, 500, () => {
            this._tweenAniCount++;
        })
        setTimeout(() => {
            UtilEx.UIEx.transformIn(this.canvas_setting, UtilEx.UIEx.Direction.Bottom, 500, () => {
                this._tweenAniCount++
            })
            UtilEx.UIEx.transformIn(this.canvas_findnote, UtilEx.UIEx.Direction.Bottom, 500)
        }, 0)

    }
    onHide() {
        UIAniUtil.popDown(this.rootCanvas, 500)
        UtilEx.UIEx.transformOut(this.canvas_setting, UtilEx.UIEx.Direction.Bottom, 500)
        UtilEx.UIEx.transformOut(this.canvas_findnote, UtilEx.UIEx.Direction.Bottom, 500)
    }

    async refresh() {
        const module = ModuleService.getModule(FindModuleC);
        console.log("刷新了本界面")
        const data = DataCenterC.getData(FindData);
        /** setNode data */
        const allProcessCfgs = GameConfig.Find.getAllElement().filter(e => {
            return e.process;
        })
        const allFindsCfgs = GameConfig.Find.getAllElement().filter(e => {
            return !e.process;
        })
        const hasGetCount = data.finds.length;

        this.txt_gotnumber.text = CommonUtils.formatString(lan6, hasGetCount, allFindsCfgs.length);
        this._processCon.clear();
        for (let index = 0; index < allProcessCfgs.length; index++) {
            const cfg = allProcessCfgs[index];
            const node = this._processCon.addNode();
            node.setData(cfg, hasGetCount >= cfg.process, data.isGetReward(cfg.id));
        }
        /** set book data */
        this.canvas_next.visibility = SlateVisibility.SelfHitTestInvisible;
        this.canvas_last.visibility = SlateVisibility.SelfHitTestInvisible;
        if (this._curPage == this._bookDatas.length - 1) {
            this.canvas_next.visibility = SlateVisibility.Collapsed;
        }
        else if (this._curPage == 0) {
            this.canvas_last.visibility = SlateVisibility.Collapsed;
        }
        let isLastRed = false;
        let isNextRed = false;
        for (let index = 0; index < this._bookDatas.length; index++) {
            const bookData = this._bookDatas[index];
            if (!bookData.isCanGet || index == this._curPage) {
                continue;
            }
            if (index < this._curPage) {
                isLastRed = true;
            }
            else {
                isNextRed = true;
            }
        }

        this.redPoint_last.visibility = isLastRed ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.redPoint_next.visibility = isNextRed ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this._bookCon.removeAllNode();
        const book = this._bookDatas[this._curPage];
        for (let index = 0; index < book.cfgs.length; index++) {
            const cfg = book.cfgs[index];
            const node = this._bookCon.addNode();
            node.setData(cfg, data.isFined(cfg.id), data.isGetReward(cfg.id));
        }
        /** guidestage 2 */
        if (module.curGuide == 1) {
            ModuleService.getModule(FindModuleC).reqSetGuideStage(2);
            GhostTraceHelper.uploadMGS("ts_game_over", "Find引导步骤", {
                round_id: 901,
                polong_hold: 2
            })
            const node = this._bookCon.nodes.find(e => {
                return e.isfind && !e.isGet;
            })
            await new Promise((res) => {
                const interval = setInterval(() => {
                    if (node.visible && this._tweenAniCount >= 2) {
                        clearInterval(interval);
                        res(0)
                    }
                }, 20)
            })
            UIService.getUI(FindGuideUI).handOnTarget(node.img_setting, node.btn_take, "找到物品就能领取相应奖励", () => {
                return this._isgetreward;
            }, (isJump: boolean) => {
                if (isJump) {
                    this.startGuide();
                }
            }, true, "下一步");
        }
    }

    startGuide() {
        const module = ModuleService.getModule(FindModuleC);
        let totalTime = DataCenterC.getData(RecordData).baseRecordInfo.totalOnlineTimesLength - module.curTime;
        GhostTraceHelper.uploadMGS("ts_game_over", "Find引导步骤", {
            round_id: 901,
            polong_hold: 3,
            round_length: totalTime + 10
        })
        module.reqSetGuideStage(3);
        UIService.getUI(FindGuideUI).handOnTarget(this.guideArea, null, "这里是你收藏物品的过程\n达到数量可以领取奖励哦", () => { return false }, () => {
            UIService.getUI(FindGuideTxtUI).showTxt("", "每个进程的奖励都不一样哦\n快去游戏中寻找魔物吧！", null)
        }, false)
    }

    showTips(rewards: number[][], widget: Widget) {
        let pos: Vector2 = new Vector2(0, 0);
        mw.localToViewport(widget.tickSpaceGeometry, Vector2.zero, new Vector2(0, 0), pos);
        this.btn_close.visibility = SlateVisibility.Visible;
        this.canvas_pool.visibility = SlateVisibility.SelfHitTestInvisible;
        if (pos.x + this.canvas_pool.size.x > this.maxBound.x) {
            pos.x -= this.canvas_pool.size.x - widget.size.x;
        }
        // pos.x += widget.size.x / 2;
        pos.y -= this.canvas_pool.size.y;
        this.canvas_pool.position = pos;
        this._pool.removeAllNode();
        for (let index = 0; index < rewards.length; index++) {
            const element = rewards[index];
            const itemCfg = GameConfig.Item.getElement(element[0]);
            if (!itemCfg) {
                continue;
            }
            const node = this._pool.addNode();
            node.setData(itemCfg, element[1]);
        }
    }
}

class DocumentProcessUI extends Nodeitem_UI_Generate {
    private _isGet: boolean;
    private _canGet: boolean;
    private _curCfg: IFindElement;

    onStart() {
        this.btn_nodeward1.onClicked.add(() => {
            if (!this._canGet) {
                Tips.show(LanUtil.getText("FindTips_04"))

                let itemCfg = GameConfig.Item.getElement(this._curCfg.rewards[0][0]);
                if (!itemCfg) {
                    return;
                }
                UIService.getUI(FindDocumentUI).showTips(this._curCfg.rewards, this.uiWidgetBase);
                return;
            }
            if (this._isGet) {
                return;
            }
            ModuleService.getModule(FindModuleC).reqGetItemReward(this._curCfg.id);
        })
    }

    setData(cfg: IFindElement, canGet: boolean, isGet: boolean) {
        this._curCfg = cfg;
        this._isGet = isGet;
        this._canGet = canGet;
        this.img_point.visibility = SlateVisibility.Collapsed;
        this.canvas_cant.visibility = SlateVisibility.Collapsed;
        this.canvas_gotten.visibility = SlateVisibility.Collapsed;
        if (canGet) {
            if (isGet) {
                this.canvas_gotten.visibility = SlateVisibility.SelfHitTestInvisible;
            }
            else {
                this.img_point.visibility = SlateVisibility.SelfHitTestInvisible;
            }
        }
        else {
            this.canvas_cant.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        this.txt_collect.text = CommonUtils.formatString(LanUtil.getText("FindTips_05"), cfg.process);
    }
}

class WardItem extends WardItem_UI_Generate {
    private _itemCfg: IItemElement;

    onStart() {
        this.btn_notice.onClicked.add(() => {
            let pos: Vector2 = new Vector2(0, 0);
            mw.localToViewport(this.rootCanvas.tickSpaceGeometry, Vector2.zero, new Vector2(0, 0), pos);
            pos.y += this.rootCanvas.size.y;
            UIService.show(UIItemDetail, this._itemCfg, pos);
        })
    }

    public setData(data: number[]) {
        this._itemCfg = GameConfig.Item.getElement(data[0]);
        if (!this._itemCfg) {
            return;
        }
        this.img_wardicon1.imageGuid = this._itemCfg.icon;
        this.txtnumber.text = data[1] + "";
    }
}


class DocumentItemUI extends Findthing_UI_Generate {
    public isGet: boolean = false;

    public isfind: boolean = false;

    public curCfg: IFindElement;

    public con: GridContainer<WardItem>;


    onStart() {
        this.con = new GridContainer(this.canvas_rewards, WardItem);
        this.btn_take.onClicked.add(() => {
            if (!this.isfind) {
                Tips.show(LanUtil.getText("FindTips_01"))
                return;
            }
            if (this.isGet) {
                return;
            }
            ModuleService.getModule(FindModuleC).reqGetItemReward(this.curCfg.id);
        })
    }

    setData(cfg: IFindElement, isFind: boolean, isGet: boolean) {
        /** init info */
        this.curCfg = cfg;
        this.isGet = isGet;
        this.isfind = isFind;
        /** set findInfo */
        this.btn_take.visibility = SlateVisibility.Visible;
        if (isFind) {
            this.canvas_didntfind.visibility = SlateVisibility.Collapsed;
            this.img_findicon.imageColor = LinearColor.white;
            this.btn_take.normalImageColor = isGet ? LinearColor.white : LinearColor.yellow;
            this.txt_findname.text = cfg.name;
            this.txt_findcontent.text = cfg.description;
            this.txt_findbackground.text = cfg.tips;
        }
        else {
            this.canvas_didntfind.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_findicon.imageColor = LinearColor.black;
            this.btn_take.normalImageColor = LinearColor.white;

            this.txt_findname.text = cfg.name;
            this.txt_findcontent.text = "?"
            this.txt_findbackground.text = cfg.tips;
        }
        if (isGet) {
            this.txt_take.visibility = SlateVisibility.Collapsed;
            this.txt_taken.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        else {
            this.txt_take.visibility = SlateVisibility.SelfHitTestInvisible;
            this.txt_taken.visibility = SlateVisibility.Collapsed
        }
        /** set base info */
        this.img_findicon.imageGuid = cfg.icon;
        const qualityCfg = GameConfig.ItemQuality.getElement(cfg.quality);
        if (qualityCfg) {
            this.img_quality.imageGuid = qualityCfg.imgGuid;
        }
        this.con.removeAllNode();
        if (cfg.rewards) {
            for (let index = 0; index < cfg.rewards.length; index++) {
                const element = cfg.rewards[index];
                const node = this.con.addNode();
                node.setData(element);
            }
        }
    }
}

