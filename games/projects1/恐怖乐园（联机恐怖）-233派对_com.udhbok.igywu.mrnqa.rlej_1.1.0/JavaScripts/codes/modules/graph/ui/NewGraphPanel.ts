/*
 * @Author       : dal
 * @Date         : 2024-05-13 17:22:16
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-05-20 10:15:42
 * @FilePath: \1001_hall\JavaScripts\codes\modules\graph\ui\NewGraphPanel.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IGhostGraphElement } from "../../../../config/GhostGraph";
import GhostMenu_UI_Generate from "../../../../ui-generate/ShareUI/ghostmenu/GhostMenu_UI_generate";
import { TimerOnly } from "../../../utils/AsyncTool";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { GridSelectContainer } from "../../../utils/UIPool";
import { UtilEx } from "../../../utils/UtilEx";
import { IDCardModuleC } from "../../idcard/IDCardModule";
import GraphModuleC from "../GraphModuleC";
import GraphModuleData from "../GraphModuleData";
import { NewGhostGraphItem, PieceUIItem, RewardUIItem } from "./NewGraphItem";

export default class NewGhostGraphPanel extends GhostMenu_UI_Generate {

    private container: GridSelectContainer<NewGhostGraphItem>;

    private pieceItemArr: PieceUIItem[] = [];

    private rewardItemArr: RewardUIItem[] = [];

    protected onStart() {
        this.container = new GridSelectContainer<NewGhostGraphItem>(this.mCanvas_GhostListItems, NewGhostGraphItem);
        this.btn_back.onClicked.add(() => { UIService.hideUI(this) });
        this.pieceItemArr.push(new PieceUIItem(this.mCanvas_Piece1));
        this.pieceItemArr.push(new PieceUIItem(this.mCanvas_Piece2));
        this.pieceItemArr.push(new PieceUIItem(this.mCanvas_Piece3));
        this.pieceItemArr.push(new PieceUIItem(this.mCanvas_Piece4));
        this.pieceItemArr.push(new PieceUIItem(this.mCanvas_Piece5));
        this.rewardItemArr.push(new RewardUIItem(this.mCanvas_Coin, 0));
        this.rewardItemArr.push(new RewardUIItem(this.mCanvas_Rizz, 1));
        let cfgList = GameConfig.GhostGraph.getAllElement();
        /** 按权重排序，决定显示顺序 */
        cfgList.sort((v1, v2) => { return v2.viewWeight - v1.viewWeight });
    }

    /**
     * 更新鬼魅值的显示
     */
    public async updateCharmVal() {
        let charmVal = await ModuleService.getModule(IDCardModuleC).getCharmVal();
        this.mText_RizzNum.text = `魅力值：${charmVal}`;
    }

    private get data() {
        return DataCenterC.getData(GraphModuleData);
    }

    private barTween: Tween<any>;

    private appendStr(str: string) {
        return str + "\n";
    }

    private opaTween: Tween<any>;

    public async checkCompleteUnlockGraph(graphUIItem, graphId: number) {
        if (this.data.checkHasAllPiece(graphId)) {
            if (await ModuleService.getModule(GraphModuleC).unlockNewGraph(graphId)) {
                const cfg = GameConfig.GhostGraph.getElement(graphId);
                graphUIItem.setData(cfg);
                graphUIItem.checkRedDot();
                if (graphId === this.curItem.cfg.id) {
                    this.setGraphInfo(cfg);
                    this.setRewardInfo(cfg);
                    this.opaTween = UIAniUtil.playOpaAni(this.mCanvas_GhostMenuPieces, 0, 2e3, () => {
                        this.opaTween = UIAniUtil.playOpaAni(this.mCanvas_GhostMenuLevel, 1, 2e3, () => {
                        });
                    });
                }
            }
        }
    }

    public curItem: NewGhostGraphItem;

    public switch(item: NewGhostGraphItem) {
        this.curItem = item;
        this.updateCharmVal();
        this.opaTween?.stop();
        this.setLockState(item.isLocked);
        this.mText_GhostName.text = item.cfg.name;
        this.mText_GhostDesc.text = item.cfg.backDesc;
        this.setRewardInfo(item.cfg);
        let str = this.appendStr(`${item.cfg.unlockTips}`) +
            this.appendStr(`${item.cfg.typeDesc}`) +
            this.appendStr(`${item.cfg.weekDesc}`);
        this.mText_GhostMess.text = str;
        this.pieceItemArr.forEach(v => { v.stopTween(); })
        if (item.isLocked) {
            item.pieceArr.forEach((v, id) => {
                const pieceUI = this.pieceItemArr[id];
                pieceUI.setData(v);
            });
        } else {
            this.setGraphInfo(item.cfg);
        }
    }

    private setRewardInfo(cfg: IGhostGraphElement) {
        this.rewardItemArr[0].setData(cfg.id, cfg.gfearcoin[0], !this.data.checkHasGraph(cfg.id), this.data.rewardIsReceived(cfg.id, 0));
        this.rewardItemArr[1].setData(cfg.id, cfg.gpopular[0], !this.data.checkHasGraph(cfg.id), this.data.rewardIsReceived(cfg.id, 1));
    }

    /** 设置图录信息 - 已解锁了 */
    private setGraphInfo(graphCfg: IGhostGraphElement) {
        this.mImage_GhostGraph.imageGuid = graphCfg.unlockedImgGuid;
        this.mPB_ShotNum.currentValue = 0;
        const toVal = this.data.getPhotoCount(graphCfg.id);
        this.mText_ShotNum.text = toVal + "";
        this.achieveTxt.text = `${graphCfg.name}${this.getApdStr(graphCfg.id)}(拍摄${graphCfg.name}魅力值✖${this.data.getCountStageRate(graphCfg.id)})`;
        this.barTween?.stop();
        this.barTween = new Tween({ data: 0 })
            .to({ data: toVal }, 5e2)
            .onUpdate((trans) => {
                this.mPB_ShotNum.currentValue = trans.data;
            })
            .start()
    }

    private getApdStr(graphId: number) {
        let index = this.data.getCountStageIndex(graphId);
        return index != -1 ? this.apdStrArr[index] : "";
    }

    private readonly apdStrArr: string[] = ["摄影新手", "摄影入门", "摄影高手", "摄影专家", "摄影大师"];

    /**
     * 设置锁的状态
     * @param isLock 是否锁住
     */
    private setLockState(isLock: boolean) {
        this.mCanvas_GhostMenuPieces.renderOpacity = isLock ? 1 : 0;
        this.mCanvas_GhostMenuLevel.renderOpacity = !isLock ? 1 : 0;
    }

    protected onShow() {
        this.container.clear();
        this.mScrollBox_GhostList.scrollToStart();
        this.addNodePerFrame(this.getSortedArr(GameConfig.GhostGraph.getAllElement()));
        this.container.getFirstUsedNode().call();
        setTimeout(() => {
            UtilEx.UIEx.transformIn(this.mCanvas_GhostMenuTop, UtilEx.UIEx.Direction.Top, 500)
            UtilEx.UIEx.transformIn(this.mCanvas_GhostMenuDetail, UtilEx.UIEx.Direction.Left, 500)
            UtilEx.UIEx.transformIn(this.mCanvas_Reward, UtilEx.UIEx.Direction.Left, 500)
            UtilEx.UIEx.transformIn(this.mCanvas_GhostList, UtilEx.UIEx.Direction.Right, 500)
        }, 0);

    }
    protected onHide() {
        this.timer.stop();
        UtilEx.UIEx.transformOut(this.mCanvas_GhostMenuTop, UtilEx.UIEx.Direction.Top, 500)
        UtilEx.UIEx.transformOut(this.mCanvas_GhostMenuDetail, UtilEx.UIEx.Direction.Left, 500)
        UtilEx.UIEx.transformOut(this.mCanvas_Reward, UtilEx.UIEx.Direction.Left, 500)
        UtilEx.UIEx.transformOut(this.mCanvas_GhostList, UtilEx.UIEx.Direction.Right, 500)
    }


    private readonly loadCount = 6;

    private timer = new TimerOnly();

    /**
    * 分帧加载节点
    * @param arr 这个数组一定要用拷贝，不能用原数组的的引用
    * @param count 当前分的次数
    */
    private addNodePerFrame(arr: IGhostGraphElement[]) {
        for (let index = 0; index < this.loadCount; index++) {
            const cfg = arr.shift();
            // 如果没有了就返回
            if (!cfg) { return; }
            const node = this.container.addNode();
            node.setData(cfg);
        }
        this.timer.setTimeout(() => { this.addNodePerFrame(arr); }, 1e2);
    }

    /**
     * 获取排序后的数组 是一个新的拷贝
     * @param cfgArr 成就数组
     */
    private getSortedArr(cfgDataArr: IGhostGraphElement[]) {
        // 拷贝一下防止影响原配置
        let cfgArr = Array.from(cfgDataArr);
        // 已解锁的在前
        cfgArr = cfgArr.sort((a, b) => {
            if (this.data.checkHasGraph(a.id) && !this.data.checkHasGraph(b.id)) { return -1; }
            return 0;
        });
        // 解锁碎片多的在前
        cfgArr = cfgArr.sort((a, b) => { return this.data.getNeedPieces(a.id).length - this.data.getNeedPieces(b.id).length });
        return cfgArr;
    }
}