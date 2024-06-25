import { IAchievementElement } from "../../../../config/Achievement";
import AchieveList_UI_Generate from "../../../../ui-generate/ShareUI/integration/Achievements/AchieveList_UI_generate";
import { IntegrationPanel } from "../../../ui/UIIntegration";
import { TimerOnly } from "../../../utils/AsyncTool";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { GridContainer } from "../../../utils/UIPool";
import { AchieveService } from "../AchieveDefine";
import AchieveModuleC from "../AchieveModuleC";
import AchieveModuleData from "../AchieveModuleData";
import { AchieveFinishTipsIns } from "./AchieveFinishTips";
import { AchieveItem } from "./AchieveItem";
import { RewardTipsHud } from "./RewardTipsHud";

/** 成就页枚举 */
export enum EAchievePageType {

    /** 我的成就 */
    Mine = 0,
    /** 即将达成 */
    Soon,
    /** 全部成就 */
    All,
    /** 空 */
    Empty,
}

class AchieveIndexItem {

    public img: Image;
    public btn: StaleButton;

    public constructor(public pageType: EAchievePageType, public rootCanvas: Canvas) {
        this.img = this.rootCanvas.getChildAt(1) as Image;
        this.btn = this.rootCanvas.getChildAt(2) as StaleButton;
        this.btn.onClicked.add(() => { this.selfPanel.switchToPage(this.pageType); });
        this.disSelect();
    }

    private get selfPanel() {
        return UIService.getUI(AchievementPanel);
    }

    public select() {
        this.img.visibility = SlateVisibility.Visible;
    }

    public disSelect() {
        this.img.visibility = SlateVisibility.Collapsed;
    }
}

export class AchievementPanel extends AchieveList_UI_Generate implements IntegrationPanel {

    showVisible(bVisible: boolean): void {
        bVisible ? this.show() : this.hide()
    }

    /** 内容容器 */
    private contentContainer: GridContainer<AchieveItem>;

    /** 按钮数组 */
    private pageArr: AchieveIndexItem[] = [];

    /** 当前的item指针 */
    private curPage: EAchievePageType = EAchievePageType.Empty;

    protected onStart() {
        this.layer = mw.UILayerDialog;
        this.contentContainer = new GridContainer(this.canvas_achieveItem, AchieveItem);
        this.pageArr.push(new AchieveIndexItem(0, this.canvas_done));
        this.pageArr.push(new AchieveIndexItem(1, this.canvas_unfinished));
        this.pageArr.push(new AchieveIndexItem(2, this.canvas_all));
        this.btn_giftGain.onClicked.add(this.reqGainGift.bind(this));
        this.rewardTipsBtn.onClicked.add(this.showReward.bind(this));
        ModuleService.getModule(AchieveModuleC).getAchieveData().then(v => {
            v.achieveFinishAction.add(async (newAchieveId: number) => {
                this.data = await this.selfModule.getAchieveData();
                this.setLevelData();
                this.setInfo();
                const cfg = AchieveService.getAchieveCfg(newAchieveId);
                AchieveFinishTipsIns.show(`达成 ${cfg.name} 成就`);
                GhostTraceHelper.uploadMGS("ts_game_over", "成就达成", { round_id: 800, disaster_id: newAchieveId, failNum: this.data.finishedArr.length });
            });

            v.levelChangeAction.add((data: AchieveModuleData) => {
                this.data = data;
                this.setLevelData();
                GhostTraceHelper.uploadMGS("ts_game_over", "成就等级变更", { round_id: 801, disaster_id: this.data.level });
            });
        })

        // 等拿数据
        this.selfModule.getAchieveData().then(data => { this.data = data });
    }

    /** 主动show一下 */
    protected show() {
        this.pageArr[this.curPage]?.disSelect();
        this.curPage = EAchievePageType.Empty;
        this.setGainGiftState(false);
        this.switchToPage(EAchievePageType.Mine);
        this.setLevelData();
        this.uiObject.visibility = SlateVisibility.Visible
    }

    /** 缓存一下data */
    private data: AchieveModuleData;

    private readonly offset: Vector2 = new Vector2(170, 50);

    private showReward() {
        const rewardCfg = AchieveService.getLevelCfg(this.data.level);
        UIService.show(RewardTipsHud, rewardCfg.rewards, this.rewardTipsBtn, this.offset);
    }

    /**
     * 请求领取礼物
     */
    private reqGainGift() {
        this.setGainGiftState(false);
        this.stopGiftTween();
        ModuleService.getModule(AchieveModuleC).getGift();
    }

    public switchToPage(page: EAchievePageType) {
        if (this.curPage === page || page === EAchievePageType.Empty) { return; }
        this.pageArr[this.curPage]?.disSelect();
        this.curPage = page;
        this.pageArr[this.curPage].select();
        this.setInfo();
    }

    private get selfModule() {
        return ModuleService.getModule(AchieveModuleC);
    }

    /**
     * 设置等级数据
     */
    private setLevelData() {
        const levelCfg = AchieveService.getLevelCfg(this.data.level);
        this.text_lv.text = this.data.level + "";
        this.text_lvNum.text = `${this.data.points}/${levelCfg.requireScore}`;
        this.setProgress(this.data.points, levelCfg.requireScore, () => {
            if (this.canGainGift) {
                this.playGainGiftAni();
                this.setGainGiftState(true);
            }
        });
    }

    private setGainGiftState(canGain: boolean) {
        if (canGain) {
            this.img_giftLight.visibility = SlateVisibility.SelfHitTestInvisible;
            this.img_lockBr.visibility = SlateVisibility.Collapsed;
            this.btn_giftGain.enable = true;
        } else {
            this.img_giftLight.visibility = SlateVisibility.Collapsed;
            this.img_lockBr.visibility = SlateVisibility.Visible;
            this.btn_giftGain.enable = false;
        }
    }

    private gainGiftTween1: Tween<any>;
    private gainGiftTween2: Tween<any>;
    private readonly defaultScale: Vector2 = new Vector2(1, 1);
    private readonly defaultPos: Vector2 = new Vector2(18.33, 40.87);
    private readonly toScale: Vector2 = new Vector2(1.5, 1.5);
    private readonly toPos: Vector2 = new Vector2(18.33, -10);

    protected hide() {
        this.stopGiftTween();
        this.timer.stop();
        this.maskBtn_progress.fanShapedValue = 0;
        this.uiObject.visibility = SlateVisibility.Hidden
    }

    private playGainGiftAni() {
        this.stopGiftTween();
        this.gainGiftTween1 = new Tween({ delta: this.defaultScale.clone() })
            .to({ delta: this.toScale.clone() }, 500)
            .onUpdate((trans) => {
                if (!this.visible || !this.canGainGift) { this.stopGiftTween(); }
                this.img_giftIcon.renderScale = trans.delta;
            })
            .yoyo(true)
            .repeat(Infinity)
            .start();

        this.gainGiftTween2 = new Tween({ delta: this.defaultPos.clone() })
            .to({ delta: this.toPos.clone() }, 500)
            .onUpdate((trans) => {
                if (!this.visible || !this.canGainGift) { this.stopGiftTween(); }
                this.img_giftIcon.position = trans.delta;
            })
            .yoyo(true)
            .repeat(Infinity)
            .easing(TweenUtil.Easing.Back.InOut)
            .start();
    }

    private stopGiftTween() {
        this.gainGiftTween1?.stop();
        this.gainGiftTween2?.stop();
        this.img_giftIcon.position = this.defaultPos;
        this.img_giftIcon.renderScale = this.defaultScale;
    }

    private get canGainGift() {
        return this.data.checkCanLevelUp() && !this.data.checkIsMaxLevel();
    }

    private progressTween: Tween<any>;

    private setProgress(toVal: number, maxVal: number, onCompleteFun: Function) {
        const rate = Math.min(toVal, maxVal) / maxVal;
        this.progressTween?.stop();
        this.maskBtn_progress.fanShapedValue = 0;
        this.progressTween = new Tween({ delta: 0 })
            .to({ delta: rate }, 5e2)
            .onUpdate((trans) => {
                this.maskBtn_progress.fanShapedValue = trans.delta;
            })
            .onComplete(() => {
                onCompleteFun();
            })
            .start();
    }

    private timer = new TimerOnly();

    /** 一帧最多加载的数量 */
    private readonly loadCount: number = 10;

    /** 设置成就信息 */
    private setInfo() {
        this.contentContainer.clear();
        this.timer.stop();
        this.scrollBox_pages.scrollToStart();
        switch (this.curPage) {
            case EAchievePageType.Mine:
                let mineArr = AchieveService.getAllAchieveCfg().filter(v => { return this.data.finishedArr.includes(v.id) });
                // 排序
                if (mineArr.length === 0) {
                    this.text_noAchievement.text = "当前还没有已达成的成就！";
                } else {
                    this.text_noAchievement.text = "";
                    this.addNodePerFrame(this.getSortedArr(mineArr));
                }
                break;
            case EAchievePageType.Soon:
                let soonArr = AchieveService.getAllAchieveCfg().filter(v => { return !this.data.finishedArr.includes(v.id) });
                if (soonArr.length === 0) {
                    this.text_noAchievement.text = "恭喜达成全部成就！";
                } else {
                    this.text_noAchievement.text = "";
                    // 先得到配置备份
                    let tempArr = this.getSortedArr(soonArr);
                    // 只显示前置成就完成了的
                    let newArr = tempArr.filter(v => { return !v.preCondition || this.data.checkAchieveIsFinish(v.preCondition) });
                    this.addNodePerFrame(newArr);
                }
                break;
            case EAchievePageType.All:
                this.text_noAchievement.text = "";
                // 先得到配置备份
                let tempArr = this.getSortedArr(AchieveService.getAllAchieveCfg());
                // 只显示前置成就完成了的
                let newArr = tempArr.filter(v => { return !v.preCondition || this.data.checkAchieveIsFinish(v.preCondition) });
                this.addNodePerFrame(newArr);
                break;
        }
    }

    /**
     * 分帧加载节点
     * @param arr 这个数组一定要用拷贝，不能用原数组的的引用
     * @param count 当前分的次数
     */
    private addNodePerFrame(arr: IAchievementElement[]) {
        for (let index = 0; index < this.loadCount; index++) {
            const cfg = arr.shift();
            // 如果没有了就返回
            if (!cfg) { return; }
            const node = this.contentContainer.addNode();
            node.setData(this.data, cfg, this.curPage);
        }
        this.timer.setTimeout(() => { this.addNodePerFrame(arr); }, 1e2);
    }

    /**
     * 获取排序后的数组 是一个新的拷贝
     * @param cfgArr 成就数组
     */
    private getSortedArr(cfgDataArr: IAchievementElement[]) {
        // 拷贝一下防止影响原配置
        let cfgArr = Array.from(cfgDataArr);
        // 高稀有度在前
        cfgArr = cfgArr.sort((a, b) => { return b.rarity - a.rarity });
        // 未达成在前
        cfgArr = cfgArr.sort((a, b) => {
            if (this.data.checkAchieveIsFinish(a.id) && !this.data.checkAchieveIsFinish(b.id)) { return -1; }
            return 0;
        });
        return cfgArr;
    }
}