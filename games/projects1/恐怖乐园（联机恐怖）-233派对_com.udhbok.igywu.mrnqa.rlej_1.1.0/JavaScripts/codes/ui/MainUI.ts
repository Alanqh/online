import { IBuffElement } from "../../config/Buff";
import { GameConfig } from "../../config/GameConfig";
import Main_UI_Generate from "../../ui-generate/ShareUI/Main_UI_generate";
import { EGameTheme, GamesStartDefines } from "../Defines";
import { ArchiveDataType } from "../modules/archive/ArchiveHelper";
import ArchiveModuleC from "../modules/archive/ArchiveModuleC";
import { BagItemData } from "../modules/bag/BagDefine";
import BagPanel from "../modules/bag/ui/BagPanel";
import { EBuffType } from "../modules/buff/BuffDefine";
import BuffItemUI from "../modules/buff/ui/BuffItemUI";
import PoisonHud from "../modules/buff/ui/PoisonHud";
import { EquipDefine } from "../modules/equip/EquipDefine";
import CameraPanel from "../modules/equip/ui/UICamera";
import WeaponUpgradePanel from "../modules/equip/ui/WeaponUpgradePanel";
import { FindDocumentUI } from "../modules/find/ui/FindDocumentUI";
import { BossResultUI } from "../modules/ghostBoss/ui/BossResultUI";
import NewGhostGraphPanel from "../modules/graph/ui/NewGraphPanel";
import IDCardPanel from "../modules/idcard/ui/IDCardPanel";
import { ObjInterModuleC } from "../modules/inter/ObjInterModuleC";
import { PlayerInterModuleC } from "../modules/inter/PlayerInterModule";
import { TwoFingerToucher } from "../modules/inter/TwoFIngerToucher";
import LockUI from "../modules/lock/LockUI";
import HpHud from "../modules/player/ui/HpHud";
import { ProcedureModuleC } from "../modules/procedure/ProcedureModuleC";
import { EmProcedureState } from "../modules/procedure/const/EmProcedureState";
import { NotebookPanel } from "../modules/procedure/ui/NotebookPanel";
import { EStateIndex, RouteDefine } from "../modules/route/RouteDefine";
import UISignIn from "../modules/sign/ui/UISignIn";
import StoreModuleC from "../modules/store/StoreModuleC";
import { CommonUtils } from "../utils/CommonUtils";
import { GameAnim } from "../utils/GameAnim";
import { GlobalSwitch } from "../utils/GlobalSwitch";
import MusicMgr from "../utils/MusicMgr";
import { GhostTraceHelper } from "../utils/TraceHelper";
import { GridSelectContainer } from "../utils/UIPool";
import { default as EmojiUI, default as emojiUI } from "./EmojiUI";
import { GuideHand } from "./GuideHand";
import SetUI from "./SetUI";
import { TipsUI } from "./TipsUI";
import UIIntegration from "./UIIntegration";


/** 代表生命数量的图片 */
const LifeNumImags: string[] = ["227788", "227783", "227772", "227789", "227771"];

export class MainUI extends Main_UI_Generate {
    private _lastTriggerTime: number = 0;

    private _twoFinger: TwoFingerToucher;

    protected onAwake(): void {
        this.initButtons();

    }

    public switch2Clamp() {
    }

    /** 缓存一个存活天数 */
    private curAliveDay;

    /** 设置存活天数 - 加载游戏的时候读存档 */
    public setAliveDay(aliveDay: number) {
        this.curAliveDay = aliveDay;
        UIService.getUI(MainUI).text_daynew.text = CommonUtils.formatString(GameConfig.Language.procedure_4.Value, (this.curAliveDay + 1));
    }

    /** 增加存活天数 - 更新天数的同时更新存档 */
    public addAliveDay() {
        this.setAliveDay(this.curAliveDay + 1);
        Event.dispatchToServer("OnPlayerAliveDayChange", this.curAliveDay);
        ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.ALIVEDAY], [this.curAliveDay]);
    }

    public addBuff(buffCfg: IBuffElement, elapse: number, duration: number) {
        if (buffCfg.type === EBuffType.BossReward && GamesStartDefines.gameTheme != EGameTheme.Town) { return; }
        if (GamesStartDefines.gameTheme != EGameTheme.Hall && ModuleService.getModule(ProcedureModuleC).myScript.state != EmProcedureState.Start) { return; }
        const node = this.buffContainer.nodes.find(v => { return v.cfg.type === buffCfg.type });
        if (node != undefined && node["UIPoolFlagVisible"]) { node.setData(buffCfg, elapse, duration); return; }
        this.buffContainer.addNode().setData(buffCfg, elapse, duration);
        if (buffCfg.type === EBuffType.Poison) {
            UIService.show(PoisonHud);
        }
    }

    /**
     * 控制右上角canvas显隐
     * @param isView 
     */
    public shiftRightTopCanvasView(isView: boolean) {
        this.rightTopCanvas.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.needCheckShopRedDot = isView ? true : false;
        this.canvas_checkIn.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.canvas_news.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        if (isView) {
            this.checkShopRedDot();
        } else {
            // 等MainUIOnShow异步完
            setTimeout(() => {
                this.canvas_tips.visibility = SlateVisibility.Collapsed;
            }, 100);
        }
    }

    public removeBuff(buffType: EBuffType) {
        const node = this.buffContainer.nodes.find(v => { return v["UIPoolFlagVisible"] && v.cfg.type === buffType });
        this.buffContainer.removeNode(node);
        if (buffType === EBuffType.Poison) {
            UIService.hide(PoisonHud);
        }
    }

    public clearBuff() {
        UIService.hide(PoisonHud);
        this.buffContainer.removeAllNode();
    }

    onStart() {
        this._twoFinger = new TwoFingerToucher();
        this.layer = mw.UILayerScene;

        this.buffContainer = new GridSelectContainer<BuffItemUI>(this.buffCanvas, BuffItemUI);

        //幽灵档案
        this.btn_notebook.onClicked.add(() => { UIService.show(FindDocumentUI); });
        // this.btn_catch.pressedMethod = mw.ButtonPressMethod.ButtonPress;
        this.btn_catch.clickMethod = mw.ButtonClickMethod.DownAndUp;
        this.btn_catch.touchMethod = ButtonTouchMethod.DownAndUp;

        this.btn_squat.clickMethod = mw.ButtonClickMethod.DownAndUp;
        this.btn_squat.touchMethod = ButtonTouchMethod.DownAndUp;
        // this.canvas_squat.visibility = SlateVisibility.Collapsed;
        this.btn_squat.onClicked.add(() => {
            let cha = Player.localPlayer.character;
            if (cha.getCurrentState() === CharacterStateType.Crouching) {
                cha.changeState(mw.CharacterStateType.Running);
            } else {
                cha.changeState(mw.CharacterStateType.Crouching);
            }
        });

        this.mTouchPad.inputScale = Vector2.one.multiply(GameConfig.Global.cameraInputScale.number);
        this.mVirtualJoystickPanel.onInputDir.add(() => {
            const module = ModuleService.getModule(PlayerInterModuleC);
            if (module.playerInterStat == 2 && !module.playerInterMain) {
                module.reqCancelPlayerInter();
            }
        })
        this.mVirtualJoystickPanel.onJoyStickUp.add(() => {
            this._twoFinger.enable = true;
        })
        this.mVirtualJoystickPanel.onJoyStickDown.add(() => {
            this._twoFinger.enable = false;
        })

        this.btn_catch.onClicked.add(() => {
            let curTIme = TimeUtil.elapsedTime();
            if (curTIme - this._lastTriggerTime < 0.5) {
                console.error("操作过于频繁")
                return;
            }
            this._lastTriggerTime = curTIme;
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) {
                return;
            }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        })
        this.btn_setting.onClicked.add(() => {
            UIService.show(SetUI);
        })

        // 鬼怪图录
        this.btn_camera.onClicked.add(() => {
            // UIService.show(GhostGraphPanel);
            UIService.show(NewGhostGraphPanel);
            GhostTraceHelper.uploadMGS("ts_game_over", "点击拍照按钮上发", { round_id: 668 });
        });

        this.btn_usecamera.onClicked.add(() => {
            UIService.hide(MainUI);
            UIService.show(CameraPanel);
        });

        // 名片
        this.btn_idCard.onClicked.add(() => {
            UIService.show(IDCardPanel, Player.localPlayer.userId);
        });


        this.btn_switchposition.onClicked.add(() => {
            UIService.show(emojiUI);
            this.btn_switchposition.visibility = SlateVisibility.Collapsed;
        })

        this.btn_discardItem.onClicked.add(() => {
            EquipDefine.discardEquip();
        });
        this.btn_useprops.onClicked.add(() => {
            EquipDefine.activeUseEquip();
        })

        if (GamesStartDefines.gameTheme === EGameTheme.Graveyard) {
            this.btn_jump.onClicked.clear();
            this.btn_jump.onClicked.add(() => {
                MusicMgr.instance.play(2006);
                if (!Player.localPlayer.character) { return; }
                Player.localPlayer.character.jump();
                Event.dispatchToLocal("OnPlayerJump")
            });
        } else {
            this.btn_jump.onClicked.add(() => {
                Player.localPlayer.character.jump();
                Event.dispatchToLocal("OnPlayerJump")
            });
        }
        this.btn_shop.onClicked.add(() => {
            ModuleService.getModule(StoreModuleC).openStore(1)
        })

        this.setHandVisible(false)
        this.initEquipUse();

        /** 启用跳跃按钮 */
        if (GlobalSwitch.enableJumpBtn()) { this.canvas_jump.visibility = SlateVisibility.SelfHitTestInvisible; }
        InputUtil.onTouchBegin(() => {
            if (this.buffContainer.beSelectedNode) {
                this.buffContainer.beSelectedNode.setSelected(false);
                this.buffContainer.beSelectedNode = null;
            }
        })
        Event.addLocalListener("PlayButtonClick", () => {
            if (this.buffContainer.beSelectedNode) {
                this.buffContainer.beSelectedNode.setSelected(false);
                this.buffContainer.beSelectedNode = null;
            }
        })
        Event.addLocalListener("evt_triggerRedDot", this.checkShopRedDot.bind(this))

        if (GamesStartDefines.gameTheme != EGameTheme.Town) {
            this.canvas_weaponupgrade.visibility = SlateVisibility.Collapsed;
        } else {
            this.btn_weaponupgrade.onClicked.add(() => {
                UIService.show(WeaponUpgradePanel);
                GhostTraceHelper.uploadMGS("ts_action_pick", "打开武器升级界面上发", { loot: 1 });
            });
        }

        // 新闻,活动
        this.btn_news.onClicked.add(() => {
            UIService.show(UIIntegration)
            // this.showFakerCanvas()
        })
        this.btn_faker.onClicked.add(() => {
            // UIService.show(UINews, false);
            this.canvas_faker.visibility = SlateVisibility.Hidden;
            // this.showFakerCanvas()
        })

        if (this.img_arrows) {
            let oriPosition = this.img_arrows.position.clone()
            new Tween({ pos: this.img_arrows.position.clone() })
                .to({ pos: new Vector2(oriPosition.x + 20, oriPosition.y) }, 1000)
                .onUpdate((val) => { this.img_arrows.position = val.pos })
                .yoyo(true)
                .repeat(Infinity)
                .start()
        }

        this.btn_checkIn.onClicked.add(() => {
            UIService.show(UISignIn);
        })
    }

    /**
     * 飞魅力值图标动画
     * @param isCharm 是否是魅力值图标，否则就是金币图标
     * @param start 开始位置 不给就会默认在屏幕中心飞过去
     * @returns 
     */
    public flyCharmOrExpIcon(isCharm: boolean, start?: mw.Widget | mw.Vector) {
        if (!this.canvas_idCard.visible) { return; }
        if (!start) { start = this.img_aim }
        let icon = isCharm ? GameConfig.SubGlobal.charmIcon.string : GameConfig.SubGlobal.expIcon.string;
        GameAnim.flySequence(5, start, this.btn_idCard, icon, new Vector2(50, 50))
    }

    private showFakerCanvas() {
        setTimeout(() => {
            this.canvas_faker.visibility = SlateVisibility.Visible;
            this.hideFakerCanvas()
        }, 300 * 1e3)
    }

    private hideFakerCanvas() {
        setTimeout(() => {
            if (this.canvas_faker.visibility == SlateVisibility.Hidden) return;//已经隐藏了
            this.canvas_faker.visibility = SlateVisibility.Hidden;
            this.showFakerCanvas()
        }, 20 * 1e3)
    }

    /** 是否需要检查商品红点 */
    private needCheckShopRedDot: boolean = true;

    private async checkShopRedDot() {
        if (!this.needCheckShopRedDot) { return; }
        let result1 = await StoreModuleC.checkCardRewards()
        let result2 = await StoreModuleC.checkDailyPack()
        this.canvas_tips.visibility = result1 || result2 ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed
        this.img_shopPoint.visibility = result1 || result2 ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed

    }

    public setBtnCameraEnable(enable: boolean) {
        this.btn_usecamera.enable = enable
    }

    private initEquipUse() {
        Event.addLocalListener(EquipDefine.EquipEvt, (equipData: BagItemData) => {
            if (equipData) {
                let cfg = GameConfig.Item.getElement(equipData.cfgId);
                if (cfg.isCanActiveUse) {
                    this.canvas_useprops.visibility = SlateVisibility.SelfHitTestInvisible;
                    this.img_props.imageGuid = cfg.icon;
                }
                else {
                    this.canvas_useprops.visibility = SlateVisibility.Collapsed;
                }
                if (cfg.isCanDiscard) {
                    this.canvas_discardItem.visibility = SlateVisibility.SelfHitTestInvisible;
                }
                else {
                    this.canvas_discardItem.visibility = SlateVisibility.Collapsed;
                }
            }
            else {
                this.canvas_useprops.visibility = SlateVisibility.Collapsed;
                this.canvas_discardItem.visibility = SlateVisibility.Collapsed;
            }
        })
    }

    setLifeNum(lifeIndex: number) {
        this.img_lifenum.imageGuid = LifeNumImags[lifeIndex];
    }

    /**
     * 
     * @param needResetJoyStick 是否需要重置摇杆
     * @returns 
     */
    onShow(needResetJoyStick: boolean = true, needPriorBagView: boolean = false) {
        // 不在游戏流程中却被显示了就关闭
        if (GamesStartDefines.gameTheme != EGameTheme.Hall && ModuleService.getModule(ProcedureModuleC).myScript.state != EmProcedureState.Start) {
            UIService.hideUI(this);
            return;
        }
        // 与笔记本页面不共存
        UIService.hide(NotebookPanel);
        // 与密码UI不共存
        UIService.hide(LockUI);
        needResetJoyStick && this.mVirtualJoystickPanel.resetJoyStick();
        console.log("ressetJoyStick");

        GlobalSwitch.enableHpHud() && UIService.show(HpHud);
        UIService.getUI(TipsUI).setCatVisiable(true);
        UIService.show(TipsUI);

        UIService.show(BagPanel, needPriorBagView);
        this.checkShopRedDot()
        this._twoFinger.enable = true;
    }

    async showGuideUI(show: boolean) {
        this.canvas_news.visibility = show ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;

        this.canvas_checkIn.visibility = show ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;

        this.rightTopCanvas.visibility = show ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;

        // 领取过灵异胶卷才显示照相机的UI
        if (show && !(await RouteDefine.canReceiveActivity(Player.localPlayer.userId, EStateIndex.ShowPhotoCanvas))) {
            this.canvas_camera_1.visibility = SlateVisibility.SelfHitTestInvisible;
        } else {
            this.canvas_camera_1.visibility = SlateVisibility.Collapsed;
        }
    }





    onHide() {
        this.mVirtualJoystickPanel.resetJoyStick();
        console.log("ressetJoyStick")
        UIService.hide(HpHud);
        UIService.hide(EmojiUI);
        UIService.getUI(TipsUI).setCatVisiable(false);
        UIService.hide(BagPanel);
        UIService.hide(BossResultUI);
        this._twoFinger.enable = false;
    }

    /** 是否静止交互UI的显示 */
    public banHandUIVisible: boolean = false;

    private _priority: number = 0

    /**
     * 设置手的显隐
     * @param visible 是否显示
     * @param priority 显示的优先级，优先级高的会覆盖优先级低的
     * @returns 
     */
    public setHandVisible(visible: boolean, priority: number = 0, isSync: boolean = true) {
        isSync && Event.dispatchToLocal("SetHandVisible", visible);
        if (visible && this.banHandUIVisible) { console.error("交互UI显示失败，被ban了！"); return; }

        if (this._priority > priority) {
            return;
        }
        if (visible) {
            this._priority = priority;
        }
        else {
            this._priority = 0;
        }

        this.canvas_catch.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setAim(isAim: boolean) {
        this.img_aim.imageColor = isAim ? LinearColor.red : LinearColor.white;
    }

    public getWhitePointPos() {
        let v1 = new Vector2(0, 0);
        let v2 = new Vector2(0, 0);
        mw.localToViewport(this.img_aim.paintSpaceGeometry, Vector2.zero, v1, v2);
        return v2;
    }

    public changeClockUI(color: LinearColor) {
        // this.mCanvas_pointer.renderTransformAngle = time / AllTimeSecond * 360;
        if (!this.img_moon || !this.img_moon.imageColor) { return; }
        this.img_moon.imageColor = color;
        //计算当前时间24小时制
        //  this.text_timenew.text = (Math.floor(time / AllTimeSecond * 24) + ":" + ((time / AllTimeSecond * 24 - Math.floor(time / AllTimeSecond * 24)) * 60).toFixed(0));
    }

    public async moveGuide() {
        let handUI = UIService.show(GuideHand);
        await handUI.startTween(this.mVirtualJoystickPanel);
        this.mGuideMask.visibility = SlateVisibility.Visible;
        this.mVirtualJoystickPanel.onJoyStickUp.add(async () => {
            this.mVirtualJoystickPanel.onJoyStickUp.clear()
            this.canvas_move.zOrder = 0;
            await TimeUtil.delaySecond(0.1)
            handUI.closeTween()
            this.rotateCameraGuide();
            this.mVirtualJoystickPanel.onJoyStickUp.add(() => {
                this._twoFinger.enable = true;
            })
        })
        this.canvas_move.zOrder = 10000;
    }

    public async rotateCameraGuide() {
        this.mTouchPad.zOrder = 10000;
        let maxX = this.mTouchPad.position.x + this.mTouchPad.size.x;
        let maxY = this.mTouchPad.position.x + this.mTouchPad.size.y;
        let handUI = UIService.show(GuideHand);
        await handUI.startTween(this.mTouchPad);
        let touchMove = InputUtil.onTouchMove(async (index: number, location: Vector2, touchType: mw.TouchInputType) => {
            if (location.x > this.mTouchPad.position.x && location.x < maxX && location.y > this.mTouchPad.position.y && location.y < maxY) {
                touchMove.disconnect();
                this.mTouchPad.zOrder = 0;
                await TimeUtil.delaySecond(0.1)
                handUI.closeTween()
                this.mGuideMask.visibility = SlateVisibility.Hidden;
                //开启下一步引导
                // Event.dispatchToLocal("evt_guideStep", 6)
                this.applyHallPanel();
            }
        })
    }

    /** 应用大厅界面 */
    public applyHallPanel() {
        this.canvas_setting.visibility = SlateVisibility.Collapsed;
        // this.canvas_tools.visibility = SlateVisibility.Collapsed;
        this.life_canvas.visibility = SlateVisibility.Collapsed;
        this.canvas_time.visibility = SlateVisibility.Collapsed;
        //this.img_point.visibility = SlateVisibility.Collapsed;
    }

    /** buff容器 */
    private buffContainer: GridSelectContainer<BuffItemUI>;
}


