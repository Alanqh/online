/*
 * @Author       : dal
 * @Date         : 2024-01-25 16:29:23
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-20 18:45:21
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\equip\ui\UICamera.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Clicking_UI_Generate from "../../../../ui-generate/ShareUI/Clicking_UI_generate";
import Camera_UI_Generate from "../../../../ui-generate/ShareUI/ghostmenu/Camera_UI_generate";
import { ALLGameThemeArr, EGameTheme, GamesStartDefines, getGameThemeId as getGameThemeIndex } from "../../../Defines";
import { MainUI } from "../../../ui/MainUI";
import { TimerOnly } from "../../../utils/AsyncTool";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { ActiveGhostModuleC } from "../../activeGhost/ActiveGhostModuleC";
import FakerModuleC from "../../faker/FakerModuleC";
import GraphModuleC from "../../graph/GraphModuleC";
import GraphModuleData from "../../graph/GraphModuleData";
import { IDCardModuleC } from "../../idcard/IDCardModule";
import MissionModuleC from "../../mission/MissionModuleC";
import RecordModuleC from "../../record/RecordModuleC";
import { RouteDefine } from "../../route/RouteDefine";
import { EquipDefine } from "../EquipDefine";
import { EquipModuleC } from "../EquipModuleC";
import { CameraUtilHelper, PhotoData } from "../util/CamerHelper";
import { NewPieceUnlockTips } from "./NewPieceUnlockTips";

export default class CameraPanel extends Camera_UI_Generate {

    /** 所有鬼怪的标志 */
    public static GhostGraphTags: string[] = [];

    protected onStart() {
        CameraPanel.GhostGraphTags = GameConfig.GhostGraph.getAllElement().map((v) => { return v.tag });
        this.btn_back.onClicked.add(() => {
            UIService.show(MainUI);
            UIService.hide(CameraPanel);
            // CameraItem.itemGo.setVisibility(PropertyStatus.On);
        });

        this.btn_camera.onClicked.add(this.takePhoto.bind(this));
    }

    protected onHide() {
        this.canUpdate = false;
        this.virtualJoystickPanel.resetJoyStick();
        // 复原
        ModuleService.getModule(EquipModuleC).resetCamera();
    }

    protected onShow() {
        this.curTime = 0;
        this.canUpdate = true;
        this.setFilmCount();
        // 第一人称
        ModuleService.getModule(EquipModuleC).applyFirstPerson();
        // 取消装备
        EquipDefine.EquipItem(null);
        this.virtualJoystickPanel.resetJoyStick();
    }

    /** 每0.5秒检测一次范围内是否有怪 */
    private readonly checkTime: number = 0.5;

    /** 当前时间 */
    private curTime: number = this.checkTime;

    protected onUpdate(dt: number) {
        this.curTime -= dt;
        if (this.curTime <= 0) {
            this.curTime = this.checkTime;
            this.checkGhostIsInView();
        }
    }

    /**
     * 设置胶卷的数量
     */
    private async setFilmCount() {
        this.filmTxt.text = `✖${await RouteDefine.getSpecialItemCount(Player.localPlayer.userId, this.filmId)}`;
    }

    /** 检查鬼是否在视野 */
    private checkGhostIsInView() {
        const hitsDataArr: PhotoData[] = CameraUtilHelper.takeAShot(CameraPanel.GhostGraphTags, "photoTag");
        if (hitsDataArr.length === 0) {
            this.setTipsView(true);
        } else {
            this.setTipsView(false);
        }
    }

    private setTipsView(isView: boolean) {
        this.mText_NoGhost.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
        this.img_aim.imageColor = isView ? LinearColor.red : LinearColor.green;
    }

    /** 灵异胶卷的配置id */
    private readonly filmId: number = 51004;

    private async takePhoto() {
        if (UIService.getUI(ClickingUI).visible) { return; }
        if (await RouteDefine.removeSpecialItem(Player.localPlayer.userId, this.filmId, 1)) {
            SoundService.playSound("296874");
            UIService.show(ClickingUI);
            this.setFilmCount();
        } else {
            GhostTraceHelper.uploadMGS("ts_action_decompose", "点击拍照按钮上发", { item_id: getGameThemeIndex(GamesStartDefines.gameTheme), item_type: 2 });
        }
    }
}

export class ClickingUI extends Clicking_UI_Generate {

    private readonly startPosTop: Vector2 = new Vector2(0, -540);

    private readonly startPosBottom: Vector2 = new Vector2(0, 1080);

    private readonly endPosTop: Vector2 = new Vector2(0, 0);

    private readonly endPosBottom: Vector2 = new Vector2(0, 540);

    private timer: TimerOnly = new TimerOnly();

    /** 毫秒 */
    private readonly shotTime: number = 260;

    protected onHide() {
        this.timer.stop();
    }

    protected onShow() {
        this.img_bg1.position = this.startPosTop;
        this.img_bg2.position = this.startPosBottom;

        // 强制关闭
        this.timer.setTimeout(() => {
            UIService.hideUI(this);
        }, 1e3);

        UIAniUtil.playPosAni(this.img_bg1, this.endPosTop, this.shotTime, () => {
            ModuleService.getModule(EquipModuleC).equip(null);
            UIAniUtil.playPosAni(this.img_bg1, this.startPosTop, this.shotTime, () => {
                this.checkPhoto(CameraUtilHelper.takeAShot(CameraPanel.GhostGraphTags, "photoTag"));
            });
        });

        UIAniUtil.playPosAni(this.img_bg2, this.endPosBottom, this.shotTime, () => {
            UIAniUtil.playPosAni(this.img_bg2, this.startPosBottom, this.shotTime, () => {
                UIService.hideUI(this);
            });
        });
    }

    /** 检查照片拍没拍中 */
    private async checkPhoto(hitsDataArr: PhotoData[]) {
        if (hitsDataArr.length === 0) {
            Tips.show(GameConfig.SubLanguage["camera_01"].Value);
            GhostTraceHelper.uploadMGS("ts_action_decompose", "点击拍照按钮上发", { item_id: getGameThemeIndex(GamesStartDefines.gameTheme), item_type: 1 });
        } else {
            GhostTraceHelper.uploadMGS("ts_action_decompose", "点击拍照按钮上发", { item_id: getGameThemeIndex(GamesStartDefines.gameTheme), item_type: 0 });
            // 根据怪物圆圈距离屏幕正中心的距离决定增加的魅力值量
            const photoDisArr = GameConfig.SubGlobal.photoAngleArr.array1d;
            const addCharmValArr = GameConfig.SubGlobal.addCharmValArr.array1d;
            // 最好评价的id
            let maxMarkIndex: number = 2;
            // 数据的索引
            let dataArrIndex: number = 0;
            // 同一个评价。找与玩家距离最小的
            let minDis: number = Infinity;

            hitsDataArr.forEach((v, id) => {
                let index = photoDisArr.findIndex(dis => { return v.angle <= dis });
                // 找一找评价最好的
                index = index === -1 ? 2 : index;
                if (maxMarkIndex > index) {
                    maxMarkIndex = index;
                    dataArrIndex = id;
                    minDis = v.distance;
                }
                // 评价相等情况下，找一个离玩家最近的
                if (maxMarkIndex === index && minDis > v.distance) {
                    dataArrIndex = id;
                    minDis = v.distance;
                }
            });

            // 现在只允许拍一个鬼了
            let graphData = hitsDataArr[dataArrIndex];
            let pieceId = await ModuleService.getModule(ActiveGhostModuleC).reqShotOneGhost(graphData.goId);
            if (pieceId == -1) {
                return;
            }
            if (!pieceId) { pieceId = await ModuleService.getModule(FakerModuleC).shotOneFaker(graphData.goId); }
            let pieceCfg = GameConfig.GhostFragment.getElement(pieceId);
            if (!pieceId) {
                console.error(`DEBUG MYTypeError>>> 没有拍到这个鬼${graphData.goId}的任何碎片${pieceId}`);
                pieceId = MathUtil.randomInt(1, 5);
                if (SystemUtil.isPIE) {
                    Tips.show(`没有拍到这个鬼${graphData.goId}的碎片${pieceId}，pie将会随机给个碎片${pieceId}来测试`);
                } else {
                    return;
                }
            }

            // 解锁碎片
            ModuleService.getModule(GraphModuleC).unlockNewPiece(pieceId);
            // 文字提示  
            const markStr = this.markStrArr[maxMarkIndex];
            const addVal = addCharmValArr[maxMarkIndex] * DataCenterC.getData(GraphModuleData).getCountStageRate(pieceCfg.ghostGraphId);
            Tips.show(`${markStr}：增加${addVal}魅力值`);
            // UI提示
            UIService.getUI(NewPieceUnlockTips).show(markStr, pieceId);
            // 增加鬼魅值
            ModuleService.getModule(IDCardModuleC).addCharmVal(addVal);
            // 增加拍鬼记录
            ModuleService.getModule(RecordModuleC).addGhostPicCount([pieceCfg.ghostGraphId]);
            // 监听任务
            ModuleService.getModule(MissionModuleC).reqSavePhotoData([graphData]);

            // 埋点
            GhostTraceHelper.uploadMGS("ts_action_compound", "点击拍照按钮上发", { item_id: pieceCfg.ghostGraphId, item_type: maxMarkIndex + 1 });
        }
    }

    /** 评价提示数组 */
    private readonly markStrArr: string[] = ["<color=#FFEB55>Excellent</color>", "<color=#6077D7>Great</color>", "<color=#00D74B>Not Bad</color>"];
}