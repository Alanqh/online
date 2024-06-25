import { GameConfig } from "../../config/GameConfig";
import { ActionCommon, GlobalData } from "../../const/GlobalData";
import { PlayerCurState } from "../../const/enum";
import P_Game_Prop_Generate from "../../ui-generate/Porp/P_Game_Prop_generate";
import BagModuleC from "./BagModuleC";

export default class P_PropBar extends P_Game_Prop_Generate {

    private bagModuleC: BagModuleC;

    /**cd遮罩tween */
    private cdTween: mw.Tween<any>;
    /**
     * 各个道具cd
     * key: 道具key, value: cd
     */
    private propCdMap: Map<number, number> = new Map();

    onStart() {
        this.bagModuleC = ModuleService.getModule(BagModuleC);
        this.canUpdate = true;

        // 最初默认隐藏使用UI
        this.mBtn_Action.visibility = mw.SlateVisibility.Collapsed;
        this.mImage_Action.visibility = mw.SlateVisibility.Collapsed;
    }

    /**cd减少 */
    onUpdate(dt: number) {
        this.propCdMap.forEach((v, k) => {
            v -= dt;
            if (v <= 0) {
                this.propCdMap.delete(k);
                //console.warn(`道具${k} cd结束，从cd列表中移除`)
                if (this.propCdMap.size == 0) {
                    this.canUpdate = false;
                }
            } else {
                this.propCdMap.set(k, v);
            }
        });
    }

    /**设置使用按钮cd */
    public setUseBtnCd(key: number, cd: number) {
        //console.warn("设置按钮cd：" + cd)
        // if(this.mBtn_Action.visibility == SlateVisibility.Collapsed) return;        
        this.mBtn_Action.visibility = SlateVisibility.HitTestInvisible;
        this.propCdMap.set(key, cd);
        this.canUpdate = true;

        if (this.cdTween) this.cdTween.stop();
        this.cdTween = new mw.Tween({ percent: 0 }).to({ percent: 1 }, cd * 1000)
            .onUpdate(obj => {
                this.mBtn_Action.fanShapedValue = obj.percent;
            })
            .onComplete(() => {
                if (this.mBtn_Action.visibility != SlateVisibility.Collapsed) {
                    this.mBtn_Action.visibility = SlateVisibility.Visible;
                }
            })
            .start();
    }

    /**初始化按钮cd */
    public initBtnCd(key: number, propId: number) {
        let curCd = this.propCdMap.get(key);
        // 如果道具正在cd
        if (curCd) {
            this.mBtn_Action.visibility = SlateVisibility.HitTestInvisible;
            let conf = GameConfig.Item.getElement(propId);
            // let maxCd = conf.PropCD;
            let maxCd = 0;
            let remainCd = maxCd - curCd;
            if (this.cdTween) this.cdTween.stop();
            this.cdTween = new mw.Tween({ percent: remainCd / maxCd }).to({ percent: 1 }, curCd * 1000)
                .onUpdate(obj => {
                    this.mBtn_Action.fanShapedValue = obj.percent;
                })
                .onComplete(() => {
                    if (this.mBtn_Action.visibility != SlateVisibility.Collapsed) {
                        this.mBtn_Action.visibility = SlateVisibility.Visible;
                    }
                })
                .start();
            //console.log(key + " 道具当前cd: " + curCd);
        }
        // 如果道具没有cd
        else {
            this.cdTween?.stop();

            this.mBtn_Action.fanShapedValue = 1;
            this.mBtn_Action.visibility = SlateVisibility.Visible;
            //console.log(key + " 道具当前未在cd");
        }
    }

    private propCdTask: any;
    /**设置道具面板cd */
    public setPropPanelCd(cd: number) {
        // 设置面板cd
        this.mPropCanvas.visibility = SlateVisibility.HitTestInvisible;
        if (this.propCdTask) clearTimeout(this.propCdTask);
        this.propCdTask = setTimeout(() => {
            this.mPropCanvas.visibility = SlateVisibility.Visible;
            this.propCdTask == null;
        }, cd * 1000);
        //console.log("设置面板cd");
    }

    /**设置使用按钮可见性 */
    public setUseBtnVis(isVisible: boolean) {
        this.mBtn_Action.visibility = isVisible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
        this.mImage_Action.visibility = this.mBtn_Action.visibility;
    }

    /**添加玩家死亡监听，隐藏使用道具按钮 */
    public addPlayerDeadListener() {
        ActionCommon.onPlayerCurStateChange.add((state: PlayerCurState, playerId: number) => {
            if (playerId == Player.localPlayer.playerId && state == PlayerCurState.Weak) {
                this.setUseBtnVis(false);
            }
        })
    }

}