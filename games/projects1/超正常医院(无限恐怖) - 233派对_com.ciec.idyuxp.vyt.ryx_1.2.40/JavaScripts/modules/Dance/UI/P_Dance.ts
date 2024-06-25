
import { IChatElement } from "../../../config/Chat";
import { GameConfig } from "../../../config/GameConfig";
import { GlobalData } from "../../../const/GlobalData";
import { DanceTabType } from "../../../const/enum";
import Dance_Generate from "../../../ui-generate/Dress/Dance_generate";
import P_DanceItem from "./Item/P_DanceItem";
import P_ExpressionItem from "./Item/P_ExpressionItem";
import P_TabItem from "./Item/P_TabItem";

export default class P_Dance extends Dance_Generate {

    private tabArr: Map<DanceTabType, P_TabItem> = new Map();
    private allItemCfgs: IChatElement[] = [];
    private saveScrollBoxByType: Map<DanceTabType, ScrollBox> = new Map();
    private allDanceItem: P_DanceItem[] = [];
    private allExpressionItem: P_ExpressionItem[] = [];


    public init() {
        //TODO:接收表情动作获取的事件
        GlobalData.Dance.getDanceAC.add(this.refreshItem.bind(this));
        this.saveScrollBoxByType.set(DanceTabType.Expression, this.mScrollBox_Expression);
        this.saveScrollBoxByType.set(DanceTabType.Dance, this.mScrollBox_Dance);
        this.allItemCfgs = GameConfig.Chat.getAllElement();
        this.allItemCfgs.forEach(cfg => {
            this.initTab(cfg);
            this.initItem(cfg);
        })

        this.mButton_Close.onClicked.add(() => {
            UIService.hideUI(this);
        })
    }

    private initTab(cfg: IChatElement) {
        if (this.tabArr.has(cfg.ChatType)) return
        let tab = UIService.create(P_TabItem);
        tab.init(cfg.ChatType, this.changeTab.bind(this));
        this.mCanvas_Tab.addChild(tab.uiObject);
        this.tabArr.set(cfg.ChatType, tab);
    }

    private initItem(cfg: IChatElement) {
        switch (cfg.ChatType) {
            case DanceTabType.Expression:
                let expression = UIService.create(P_ExpressionItem);
                expression.init(cfg);
                this.mCanvas_Expression.addChild(expression.uiObject);
                this.allExpressionItem.push(expression);
                break;
            case DanceTabType.Dance:
                let dance = UIService.create(P_DanceItem);
                dance.init(cfg);
                this.mCanvas_Dance.addChild(dance.uiObject);
                this.allDanceItem.push(dance);
            default:
                break;
        }
    }

    private refreshItem(cfgId: number) {
        if (cfgId) {
            let ids = GameConfig.ShopItem.getElement(cfgId)?.DanceIds
            //TODO:通过获取的商店ItemID刷新对应的Item
            let dance = this.allDanceItem.filter(i => { return ids.includes(i.curCfg.ID) })
            if (dance && dance.length > 0) {
                dance.forEach(d => {
                    d.refresh();
                })
            }
            let expression = this.allExpressionItem.filter(i => { return ids.includes(i.curCfg.ID) })
            if (expression && expression.length > 0) {
                expression.forEach(e => {
                    e.refresh();
                })
            }
        } else {
            this.allDanceItem.forEach(dance => {
                dance.refresh();
            })
            this.allExpressionItem.forEach(expression => {
                expression.refresh();
            })
        }
    }


    public showPanel() {
        UIService.showUI(this);
        this.changeTab(DanceTabType.Expression);
    }

    private changeTab(type: DanceTabType) {
        this.tabArr.forEach((tab) => {
            tab.changeTab(type);
        })
        this.saveScrollBoxByType.forEach((scrollBox, key) => {
            scrollBox.visibility = key == type ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        })
    }

}