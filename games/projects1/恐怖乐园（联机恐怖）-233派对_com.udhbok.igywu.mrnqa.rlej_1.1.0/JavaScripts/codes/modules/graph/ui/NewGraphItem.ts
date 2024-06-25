import { GameConfig } from "../../../../config/GameConfig";
import { IGhostFragmentElement } from "../../../../config/GhostFragment";
import { IGhostGraphElement } from "../../../../config/GhostGraph";
import GhostMenuItem_UI_Generate from "../../../../ui-generate/ShareUI/ghostmenu/GhostMenuItem_UI_generate";
import { TimerOnly } from "../../../utils/AsyncTool";
import { GameAnim } from "../../../utils/GameAnim";
import Tips from "../../../utils/Tips";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import GraphModuleC from "../GraphModuleC";
import GraphModuleData from "../GraphModuleData";
import NewGhostGraphPanel from "./NewGraphPanel";

export class NewGhostGraphItem extends GhostMenuItem_UI_Generate {

    /** 不能监听这个 */
    public onSelect: Action = new Action();

    public isSelected: boolean;

    private readonly selectColor = LinearColor.colorHexToLinearColor("#FFE4CC");
    private readonly unSelectColor = LinearColor.colorHexToLinearColor("#FFFFFF");

    public setSelected(isTrue: boolean) {
        if (isTrue) {
            this.mBtn_GMI.normalImageColor = this.selectColor;
        } else {
            this.mBtn_GMI.normalImageColor = this.unSelectColor;
        }
        this.isSelected = isTrue;
    }

    private get data() {
        return DataCenterC.getData(GraphModuleData);
    }

    public get pieceArr() {
        return this.data.getPieces(this.cfg.id);
    }

    private timer = new TimerOnly();

    protected onStart() {
        this.mBtn_GMI.onClicked.add(() => {
            if (this.isSelected) { return; }
            this.call();
        });
    }

    public call() {
        this.onSelect.call();
        UIService.getUI(NewGhostGraphPanel).switch(this);
        this.timer.setTimeout(() => { this.checkRedDot() }, 1500);
    }

    public get isLocked() {
        return !this.data.checkHasGraph(this.cfg.id);
    }

    public cfg: IGhostGraphElement;

    public setData(cfg: IGhostGraphElement) {
        this.cfg = cfg;
        this.setLockState(!this.data.checkHasGraph(cfg.id));
        this.mImg_GMI.imageGuid = cfg.unlockedImgGuid;
        this.mText_GMN.text = cfg.name;
        this.checkRedDot();
    }

    public checkRedDot() {
        // 红点设置
        if (this.data.checkViewRedDot(this.cfg.id)) {
            this.setRedPointView(true);
        } else {
            this.setRedPointView(false);
        }
    }

    /**
     * 设置锁的状态
     * @param isLock 
     */
    private setLockState(isLock: boolean) {
        if (isLock) {
            this.mImg_GMBG.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mText_GMP.visibility = SlateVisibility.SelfHitTestInvisible;
            this.mImageGML.visibility = SlateVisibility.SelfHitTestInvisible;
            const needCount = this.data.getNeedPieces(this.cfg.id).length;
            const allCount = this.data.getPieces(this.cfg.id).length;
            const haveCount = allCount - needCount;
            this.mText_GMP.text = `${haveCount}/${allCount}`;
        } else {
            this.mImg_GMBG.visibility = SlateVisibility.Collapsed;
            this.mText_GMP.visibility = SlateVisibility.Collapsed;
            this.mImageGML.visibility = SlateVisibility.Collapsed;
        }
    }

    private setRedPointView(isView: boolean) {
        this.img_redpointGMI.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }
}

export class PieceUIItem {

    public img: Image;
    public mask: MaskButton;
    public lockCan: Canvas;
    public txt: TextBlock;
    public lockImg: Image;
    public lockImg2: Image;
    public sucImg: Image;
    public sucImg2: Image;

    public constructor(public rootCanvas: Canvas) {
        this.img = rootCanvas.getChildAt(0) as Image;
        this.mask = rootCanvas.getChildAt(1) as MaskButton;
        this.lockCan = rootCanvas.getChildAt(2) as Canvas;
        this.txt = this.lockCan.getChildAt(1) as TextBlock;
        this.lockImg = this.lockCan.getChildAt(2) as Image;
        this.lockImg2 = this.lockCan.getChildAt(3) as Image;
        this.sucImg = this.lockCan.getChildAt(4) as Image;
        this.sucImg2 = this.lockCan.getChildAt(5) as Image;
    }

    private pieceCfg: IGhostFragmentElement;

    public setData(pieceCfg: IGhostFragmentElement) {
        this.pieceCfg = pieceCfg;
        this.img.imageGuid = pieceCfg.icon;
        this.txt.text = "碎片" + pieceCfg.fragmentCode + "\n" + pieceCfg.name;
        this.setLockState(!this.data.checkHasPiece(pieceCfg.id));
    }

    private get data() {
        return DataCenterC.getData(GraphModuleData);
    }

    private setLockState(isLock: boolean) {
        this.lockImg.renderOpacity = 1;
        this.lockImg2.renderOpacity = 1;
        this.sucImg.renderOpacity = 0;
        this.sucImg2.renderOpacity = 0;
        if (isLock) {
            this.mask.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mask.visibility = SlateVisibility.Collapsed;
            this.playUnlockAni();
        }
    }

    public stopTween() {
        this.tween?.stop();
    }

    private tween: Tween<any>;

    private timer = new TimerOnly();

    private readonly hideTime: number = 1e3;

    private get selfPanel() {
        return UIService.getUI(NewGhostGraphPanel);
    }

    private playUnlockAni() {
        if (ModuleService.getModule(GraphModuleC).readPiece(this.pieceCfg.id)) {
            this.tween = UIAniUtil.playOpaAni(this.lockImg, 0, this.hideTime, () => {
            });
            this.tween = UIAniUtil.playOpaAni(this.lockImg2, 0, this.hideTime, () => {
                this.sucImg.renderOpacity = 1;
                this.sucImg2.renderOpacity = 1;
            });
            let curItem = this.selfPanel.curItem;
            UIService.getUI(NewGhostGraphPanel).checkCompleteUnlockGraph(curItem, this.pieceCfg.ghostGraphId);
        } else {
            this.lockImg.renderOpacity = 0;
            this.lockImg2.renderOpacity = 0
            this.sucImg.renderOpacity = 1;
            this.sucImg2.renderOpacity = 1;
            let curItem = this.selfPanel.curItem;
            UIService.getUI(NewGhostGraphPanel).checkCompleteUnlockGraph(curItem, this.pieceCfg.ghostGraphId);
        }
    }
}

export class RewardUIItem {

    public img: Image;
    public btn: Button;
    public count: TextBlock;
    public redDot: Image;
    public suc: Image
    public lockBg: Image;
    public lock: Image;
    public lockTxt: TextBlock;

    /**
     * @param rootCanvas 
     * @param type 0是恐惧币奖励，1是魅力值奖励
     */
    public constructor(public rootCanvas: Canvas, public type: number) {
        this.img = rootCanvas.getChildAt(0) as Image;
        this.btn = rootCanvas.getChildAt(1) as Button;
        this.count = rootCanvas.getChildAt(2) as TextBlock;
        this.redDot = rootCanvas.getChildAt(3) as Image;
        this.suc = rootCanvas.getChildAt(4) as Image;
        this.lockBg = rootCanvas.getChildAt(5) as Image;
        this.lock = rootCanvas.getChildAt(6) as Image;
        this.lock.visibility = SlateVisibility.Collapsed;
        this.lockTxt = rootCanvas.getChildAt(7) as TextBlock;
        this.btn.normalImageGuid = type === 0 ? GameConfig.SubGlobal.fearCoinIcon.string : GameConfig.SubGlobal.charmIcon.string;
        this.btn.onClicked.add(async () => {
            if (await ModuleService.getModule(GraphModuleC).receiveReward(this.graphId, type)) {
                if (this.type === 1) {
                    GameAnim.flySequence(5, this.img, UIService.getUI(NewGhostGraphPanel).mText_RizzNum, GameConfig.SubGlobal.charmIcon.string,
                        new Vector2(50, 50), Vector2.zero,
                        () => { UIService.getUI(NewGhostGraphPanel).updateCharmVal(); }
                    );
                }
                UIService.getUI(NewGhostGraphPanel).curItem.checkRedDot();
                this.setReceiveState(true);
            } else {
                const cfg = GameConfig.GhostGraph.getElement(this.graphId);
                if (type === 0) {
                    Tips.show(`恐惧币 * ${cfg.gfearcoin[0]}`);
                } else {
                    Tips.show(`魅力值 * ${cfg.gpopular[0]}`);
                }
            }
        });
    }

    private timer = new TimerOnly();

    private graphId: number;

    public setData(graphId: number, rewardCount: number, isLock: boolean, isReceived: boolean) {
        this.graphId = graphId;
        const cfg = GameConfig.GhostGraph.getElement(this.graphId);
        const qualityCfg = GameConfig.ItemQuality.getElement(this.type === 0 ? cfg.gfearcoin[1] : cfg.gpopular[1]);
        this.img.imageGuid = qualityCfg.imgGuid;
        this.count.text = rewardCount + "";
        this.setLockState(isLock, isReceived);
    }

    private setLockState(isLock: boolean, isReceived: boolean) {
        if (isLock) {
            this.setReceiveState(false);
            this.redDot.visibility = SlateVisibility.Collapsed;
            // this.lock.visibility = SlateVisibility.Visible;
            this.lockTxt.visibility = SlateVisibility.SelfHitTestInvisible;
            this.lockBg.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.setReceiveState(isReceived);
            // this.lock.visibility = SlateVisibility.Collapsed;
            this.lockTxt.visibility = SlateVisibility.Collapsed;
            this.lockBg.visibility = SlateVisibility.Collapsed;
        }
    }

    private setReceiveState(isReceived: boolean) {
        if (isReceived) {
            this.redDot.visibility = SlateVisibility.Collapsed;
            this.suc.visibility = SlateVisibility.Visible;
        } else {
            this.redDot.visibility = SlateVisibility.Visible;
            this.suc.visibility = SlateVisibility.Collapsed;
        }
    }
}