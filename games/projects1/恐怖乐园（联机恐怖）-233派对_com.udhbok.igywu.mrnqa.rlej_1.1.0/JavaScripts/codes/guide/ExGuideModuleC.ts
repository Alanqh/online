/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-19 16:03:56
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-06-07 17:48:28
 * @FilePath     : \1004_graveyard\JavaScripts\codes\guide\ExGuideModuleC.ts
 * @Description  : 
 */

import { AddGMCommand } from "module_gm";

import ExGuideData from "./ExGuideData";
import ExGuideModuleS from "./ExGuideModuleS";
import UIHallContent from "./ui/UIHallContent";
import UIHallPopUp from "./ui/UIHallPopUp";
import UISkip from "./ui/UISkip";
import { GameConfig } from "../../config/GameConfig";
import Background_Generate from "../../ui-generate/ShareUI/Background_generate";
import { GameDefines } from "../CehuaDefines";
import GameStart from "../GameStart";
import { BagModuleC } from "../modules/bag/BagModuleC";
import { CameraCG } from "../modules/cameraCG/CameraCG";
import { EquipDefine } from "../modules/equip/EquipDefine";
import { ObjInterModuleC } from "../modules/inter/ObjInterModuleC";
import UINpcTalk from "../modules/npc/ui/UINpcTalk";
import { LoadingGameUI } from "../modules/procedure/ui/LoadingGameUI";
import StoreModuleC from "../modules/store/StoreModuleC";
import { MainUI } from "../ui/MainUI";
import { WaitLoop, WaitTime } from "../utils/AsyncTool";
import { GhostTraceHelper } from "../utils/TraceHelper";
import { GuideCameraUtil } from "./utils/GuideCameraUtil";
import { LoginInfo } from "../modules/record/RecordData";
import { EquipModuleC } from "../modules/equip/EquipModuleC";
import { RealNameConditionType, RealNameTool } from "../ui/realName/RealNameUI";
import { EGameTheme, GamesStartDefines } from "../Defines";


GameStart.onRegisterModule.add(() => {
    // ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper)
    ModuleService.registerModule(ExGuideModuleS, ExGuideModuleC, ExGuideData)
})
AddGMCommand("测试引导CG", (player: mw.Player, val: string) => {
    ModuleService.getModule(ExGuideModuleC).testGuide()
}, null)

const cameraJson1 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":5515.86,\"y\":-12427.92,\"z\":280.72},\"_rotation\":{\"x\":0,\"y\":-1.88,\"z\":-90.03},\"_fov\":90},{\"_time\":1.45,\"_location\":{\"x\":5632.96,\"y\":-12787.06,\"z\":280.72},\"_rotation\":{\"x\":0,\"y\":-14.42,\"z\":-200.13},\"_fov\":90},{\"_time\":2.85,\"_location\":{\"x\":5486.02,\"y\":-12880,\"z\":290.59},\"_rotation\":{\"x\":0,\"y\":-12.41,\"z\":-250},\"_fov\":90},{\"_time\":3.78,\"_location\":{\"x\":5391.96,\"y\":-12767.64,\"z\":266.04},\"_rotation\":{\"x\":0,\"y\":-15.68,\"z\":-304.1},\"_fov\":90},{\"_time\":6.2,\"_location\":{\"x\":5532.53,\"y\":-12645.72,\"z\":225.66},\"_rotation\":{\"x\":0,\"y\":0.44,\"z\":-269.82},\"_fov\":90},{\"_time\":6.71,\"_location\":{\"x\":5532.48,\"y\":-12626.56,\"z\":228.16},\"_rotation\":{\"x\":0,\"y\":0.44,\"z\":-269.82},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[]}"
const cameraJson2 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":5535.22,\"y\":-12633.62,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.51,\"z\":91.51},\"_fov\":90},{\"_time\":2.23,\"_location\":{\"x\":5534.82,\"y\":-12742.32,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90},{\"_time\":2.68,\"_location\":{\"x\":5532.83,\"y\":-12641.69,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90},{\"_time\":3.21,\"_location\":{\"x\":5532.95,\"y\":-12647.52,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[{\"_time\":0,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"27BD6122\\\",\\\"visible\\\":false}\"},{\"_time\":0,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"visible\\\":true}\"},{\"_time\":0.02,\"_name\":\"CS.Trans\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"position\\\":{\\\"x\\\":5533,\\\"y\\\":-12613.19,\\\"z\\\":229.7},\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":0.01,\\\"y\\\":0.01,\\\"z\\\":0.01}}\"},{\"_time\":2.83,\"_name\":\"CS.Trans\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"position\\\":{\\\"x\\\":5533,\\\"y\\\":-12613.19,\\\"z\\\":229.7},\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":1,\\\"y\\\":0.1,\\\"z\\\":1}}\"}]}"
const cameraJson3 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":10830.58,\"y\":-13894.37,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.91,\"z\":37.31},\"_fov\":90},{\"_time\":55.04,\"_location\":{\"x\":10844.82,\"y\":-13886.17,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-1282.69},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[]}"
const cameraJson4 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":10830.58,\"y\":-13894.37,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.91,\"z\":37.31},\"_fov\":90},{\"_time\":4.97,\"_location\":{\"x\":10844.82,\"y\":-13886.17,\"z\":52.2},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-482.69},\"_fov\":90},{\"_time\":6.8,\"_location\":{\"x\":10844.8,\"y\":-13886.18,\"z\":59.66},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-841.96},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[]}"
const cameraJson5 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":4252.54,\"y\":-6601.86,\"z\":2013},\"_rotation\":{\"x\":0,\"y\":19.57,\"z\":94.68},\"_fov\":90},{\"_time\":1.85,\"_location\":{\"x\":3211.72,\"y\":-3931.79,\"z\":2687.59},\"_rotation\":{\"x\":0,\"y\":-2.64,\"z\":113.26},\"_fov\":90},{\"_time\":3.5,\"_location\":{\"x\":2228.78,\"y\":-2475.55,\"z\":1460.45},\"_rotation\":{\"x\":0,\"y\":-29.4,\"z\":123.52},\"_fov\":90},{\"_time\":5.14,\"_location\":{\"x\":860.26,\"y\":-1848.24,\"z\":559.27},\"_rotation\":{\"x\":0,\"y\":-11.34,\"z\":141.22},\"_fov\":90},{\"_time\":7.81,\"_location\":{\"x\":-1169.36,\"y\":-703.5,\"z\":559.27},\"_rotation\":{\"x\":0,\"y\":-27.4,\"z\":32.16},\"_fov\":90},{\"_time\":10.05,\"_location\":{\"x\":-1175.17,\"y\":927.92,\"z\":557.23},\"_rotation\":{\"x\":0,\"y\":-19.24,\"z\":-24.91},\"_fov\":90},{\"_time\":12.23,\"_location\":{\"x\":240.71,\"y\":583.42,\"z\":306.21},\"_rotation\":{\"x\":0,\"y\":-8.63,\"z\":-16.73},\"_fov\":90},{\"_time\":13.87,\"_location\":{\"x\":1147.22,\"y\":949.43,\"z\":306.21},\"_rotation\":{\"x\":0,\"y\":-10.44,\"z\":122.7},\"_fov\":90},{\"_time\":14.69,\"_location\":{\"x\":1269.42,\"y\":1526.15,\"z\":304.27},\"_rotation\":{\"x\":0,\"y\":-6.2,\"z\":166.27},\"_fov\":90},{\"_time\":16.03,\"_location\":{\"x\":164.63,\"y\":1799.63,\"z\":304.27},\"_rotation\":{\"x\":0,\"y\":-12.44,\"z\":119.15},\"_fov\":90},{\"_time\":17.57,\"_location\":{\"x\":21.98,\"y\":2147.67,\"z\":304.17},\"_rotation\":{\"x\":0,\"y\":3.29,\"z\":90.29},\"_fov\":90},{\"_time\":20.02,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":20.45,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":20.88,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":21.18,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":22.46,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[]}"
const cameraJson6 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":-8198.15,\"y\":7054.87,\"z\":787.48},\"_rotation\":{\"x\":0,\"y\":14.19,\"z\":91.4},\"_fov\":90},{\"_time\":8.08,\"_location\":{\"x\":-7381.72,\"y\":7074.77,\"z\":787.48},\"_rotation\":{\"x\":0,\"y\":14.19,\"z\":91.4},\"_fov\":90},{\"_time\":12.99,\"_location\":{\"x\":-7381.98,\"y\":7074.76,\"z\":787.48},\"_rotation\":{\"x\":0,\"y\":14.19,\"z\":91.4},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[{\"_time\":0,\"_name\":\"CS.ChangeCloth\",\"_params\":\"{\\\"assetId\\\":\\\"self\\\",\\\"targetId\\\":\\\"35461C6B\\\"}\"},{\"_time\":0.5,\"_name\":\"CS.Nav\",\"_params\":\"{\\\"targetId\\\":\\\"35461C6B\\\",\\\"position\\\":{\\\"x\\\":-6589.35,\\\"y\\\":7766.68,\\\"z\\\":951.35},\\\"radius\\\":0}\"},{\"_time\":9.32,\"_name\":\"CS.Nav\",\"_params\":\"{\\\"targetId\\\":\\\"166775A0\\\",\\\"position\\\":{\\\"x\\\":-6589.35,\\\"y\\\":7766.68,\\\"z\\\":951.35},\\\"radius\\\":0}\"}]}"
const cameraJson7 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":1218.34,\"y\":-6971.33,\"z\":537.46},\"_rotation\":{\"x\":0,\"y\":-26.63,\"z\":115.31},\"_fov\":90},{\"_time\":3.17,\"_location\":{\"x\":958.56,\"y\":-6629.24,\"z\":237.46},\"_rotation\":{\"x\":0,\"y\":-2.72,\"z\":89.06},\"_fov\":90},{\"_time\":5.03,\"_location\":{\"x\":896.59,\"y\":-6434.75,\"z\":87.46},\"_rotation\":{\"x\":0,\"y\":18.66,\"z\":83.81},\"_fov\":90},{\"_time\":8.08,\"_location\":{\"x\":898.08,\"y\":-6439.42,\"z\":91.07},\"_rotation\":{\"x\":0,\"y\":18.15,\"z\":83.94},\"_fov\":90},{\"_time\":10.94,\"_location\":{\"x\":1275.26,\"y\":-6172.4,\"z\":266.07},\"_rotation\":{\"x\":0,\"y\":-12.96,\"z\":196.3},\"_fov\":90},{\"_time\":13.8,\"_location\":{\"x\":1275.26,\"y\":-6172.4,\"z\":266.07},\"_rotation\":{\"x\":0,\"y\":-12.96,\"z\":196},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[{\"_time\":0.37,\"_name\":\"CS.ChangeCloth\",\"_params\":\"{\\\"assetId\\\":\\\"self\\\",\\\"targetId\\\":\\\"354DD043\\\"}\"},{\"_time\":1.08,\"_name\":\"CS.Effect\",\"_params\":\"{\\\"assetId\\\":\\\"246583\\\",\\\"position\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"loopCount\\\":1,\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":3,\\\"y\\\":3,\\\"z\\\":3},\\\"targetId\\\":\\\"354DD043\\\"}\"},{\"_time\":1.27,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"2B1B8379\\\",\\\"visible\\\":true}\"},{\"_time\":5.7,\"_name\":\"CS.Anim\",\"_params\":\"{\\\"assetId\\\":\\\"314876\\\",\\\"targetId\\\":\\\"354DD043\\\",\\\"speed\\\":1,\\\"loopCount\\\":1}\"},{\"_time\":10.66,\"_name\":\"CS.Effect\",\"_params\":\"{\\\"assetId\\\":\\\"246583\\\",\\\"position\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"loopCount\\\":1,\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":3,\\\"y\\\":3,\\\"z\\\":3},\\\"targetId\\\":\\\"173988AC\\\"}\"},{\"_time\":10.89,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"13147BAF\\\",\\\"visible\\\":true}\"},{\"_time\":11.95,\"_name\":\"CS.Anim\",\"_params\":\"{\\\"assetId\\\":\\\"285705\\\",\\\"targetId\\\":\\\"173988AC\\\",\\\"speed\\\":1,\\\"loopCount\\\":1}\"},{\"_time\":12.7,\"_name\":\"CS.Anim\",\"_params\":\"{\\\"assetId\\\":\\\"15847\\\",\\\"targetId\\\":\\\"354DD043\\\",\\\"speed\\\":1,\\\"loopCount\\\":0}\"}]}"
export default class ExGuideModuleC extends ModuleC<ExGuideModuleS, ExGuideData> {
    private _dialogUI: UIHallPopUp;
    private _contentUI: UIHallContent
    private _camera: Camera;
    private _defaultCamera: Camera;
    private _bornPoint: GameObject

    /** 是否跳过过 */
    private _isJumped: boolean = false;
    /** */
    private skipTraceArr: number[] = [1, 7, 9, 10]


    /**狱卒npc */
    private jailer: Character;
    private doctorChar: Character;

    // done第一个cg在最后和npc对话的时候播
    // done移动引导在第一人称后开始
    // done移动引导控制不灵敏
    // done第一人称切换要有一个摄像机移动的过程
    // done隧道跳过直接到场景外
    // done不跳过的话会有cg之间的穿帮，可以加个遮罩
    // done场景外可以有一个第一人称，爬起来，变成第三人称的过程
    // done爬起来后强制和npc触发对话
    // done对话完播cg1
    // done cg完成镜头看向大门


    protected onAwake(): void {
        GameObject.asyncFindGameObjectById("27BD6122").then(obj => {
            if (!obj) {
                return;
            }
            // this.data.guideStage = 4;
            AccountService.downloadData(obj as Character, async () => {
                this._dialogUI = UIService.getUI(UIHallPopUp)
                this._contentUI = UIService.getUI(UIHallContent)
                this._contentUI.initMsgData(GameConfig.GuideTalk.getAllElement())
                this._camera = await GameObject.asyncFindGameObjectById("2964FB23") as Camera
                this._bornPoint = await GameObject.asyncFindGameObjectById("3198F16F")
                this.jailer = await GameObject.asyncFindGameObjectById("183A6120") as Character
                this.jailer.displayName = "";
                this.doctorChar = await GameObject.asyncFindGameObjectById("2362F169") as Character;
                UIService.hide(MainUI)
                // this.checkGuide()
                this.reqGuideStep()
            })
        })
        this._defaultCamera = Camera.currentCamera

        // InputUtil.onKeyDown(Keys.Five,()=>{
        //     GuideCameraUtil.switchToFirstPerson(()=>{
        //         console.log("switchToFirstPerson");
        //     });
        // })
        // InputUtil.onKeyDown(Keys.Six,()=>{
        //     Camera.currentCamera.preset = CameraPreset.ThirdPerson;
        // })
        // InputUtil.onKeyDown(Keys.Seven,()=>{
        //     GuideCameraUtil.switchToThirdPerson(()=>{
        //         console.log("switchToFirstPerson");
        //     });
        // })
    }

    protected onStart(): void {
        Event.addLocalListener("evt_guideStep", (step: number) => { this[`guideStage${step}`] && this[`guideStage${step}`]() })
        Event.addLocalListener("evt_changeLoc", (gameObjectId: string, locStr: string, rotStr: string) => {
            if (gameObjectId === this.localPlayer.character.gameObjectId && locStr == "-519|915|112") {
                this.guideStage6()
            }
        })
    }

    protected onEnterScene(sceneType: number): void {
        if (this.data.guideStage != 6) {
            Player.getAllPlayers().forEach(player => {
                player.character.setVisibility(player.playerId == this.localPlayerId, true)
            })
        }
        if (GamesStartDefines.gameTheme != EGameTheme.Hall) {
            RealNameTool.instance.checkRealName(RealNameConditionType.GameStart);
        }
    }

    private async reqGuideStep() {
        let stage = await this.server.net_getGuideStep()
        this.checkGuide(stage)
    }

    private async checkGuide(step: number) {
        switch (step) {
            case 0:
                this.localPlayer.character.setVisibility(false, true);
                this.guideStage1()
                RealNameTool.instance.checkRealName(RealNameConditionType.GuideStart);
                break
            case 1:
                this.guideStage2()
                break
            case 2:
                this.guideStage3()
                break
            case 3:
                this.guideStage4()
                break
            case 4:
                this.guideStage5()
                break;
            case 5:
                this.guideStage6()
                break
            default:
                RealNameTool.instance.checkRealName(RealNameConditionType.GameStart);
                console.log("已完成引导，进入游戏");
                ModuleService.getModule(BagModuleC).pushWoodCardItemIntoBag();
                UIService.show(MainUI).applyHallPanel();
                TimeUtil.delaySecond(2).then(() => {
                    ModuleService.getModule(StoreModuleC).checkPopDialog()
                })
        }
    }

    public showContentUI() {
        this.traceAni(3);
        //显示被欺骗文本
        this._contentUI.showMessage(async () => {
            this.traceAni(4);
            await TimeUtil.delaySecond(2)
            //再次弹出对话框
            this._dialogUI.changeContent()
            UIService.showUI(this._dialogUI);
            await TimeUtil.delaySecond(3)
            this.traceAni(5);
            //显示准备好前往幸福生活
            this._contentUI.showMessage(async () => {
                await TimeUtil.delaySecond(1)
                UIService.hideUI(this._contentUI);

                this.traceAni(6);
                UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
                CameraCG.instance.play(cameraJson2, async () => {
                    UIService.hide(UISkip)
                    CameraCG.instance.play(cameraJson3, null, false)//播放第三段动画
                    await TimeUtil.delaySecond(1.5)
                    this.traceAni(7);
                    this._contentUI.showMessage(() => {
                        UIService.hideUI(this._contentUI);
                        CameraCG.instance.stop(true);
                        this.reqGuideComplete(1);//完成第一阶段引导
                        UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
                        this.traceAni(8);
                        CameraCG.instance.play(cameraJson4, () => {
                            UIService.hide(UISkip)
                            this.guideStage2()
                        }, false)
                    })
                }, false)
            })
        });
    }

    private guideStage1() {

        this.traceAni(0);
        UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
        CameraCG.instance.play(cameraJson1, async () => {
            await TimeUtil.delaySecond(2)
            UIService.hide(UISkip)
            this.traceAni(1);
            UIService.showUI(this._dialogUI);
        }, false)
    }

    private traceAni(aniId: number) {
        console.log("traceAni", aniId)
        GhostTraceHelper.hallAniTrace(aniId, this.skipTraceArr.includes(aniId), this._isJumped);
        this._isJumped = false;
    }

    private lookAtJailer() {
        this.localPlayer.character.worldTransform.lookAt(new Vector(this.jailer.worldTransform.position.x, this.jailer.worldTransform.position.y, this.localPlayer.character.worldTransform.position.z))//镜头朝向狱卒
        this._defaultCamera.lookAt(this.jailer);
    }

    private async guideStage2() {
        console.log("guideStage2")
        Camera.switch(this._camera);
        this.localPlayer.character.setVisibility(true, true);
        this.lookAtJailer()
        this.localPlayer.character.worldTransform.position = this._bornPoint.worldTransform.position.clone().add(new Vector(0, 0, 300))
        await TimeUtil.delaySecond(2)
        this._bornPoint.setVisibility(false);
        //动画四

        this.traceAni(9);
        this.traceAni(10);
        UIService.hide(UISkip)
        this.reqGuideComplete(2);//完成第二阶段引导
        this.guideStage3()


    }

    /**跟狱卒对话阶段 */
    public async guideStage3() {
        console.log("guideStage3")
        CameraCG.instance.activeCGCamera();
        CameraCG.instance.exitFreeCamera()
        Camera.switch(this._defaultCamera)
        this.localPlayer.character.worldTransform.position = GameConfig.SubGlobal.guid_pos.vector
        console.log(this.jailer?.worldTransform?.position, this.localPlayer.character.worldTransform.position);
        this.lookAtJailer()
        await WaitTime.wait(1);
        let distance = this._defaultCamera.worldTransform.getForwardVector().normalize().multiply(600);
        this._defaultCamera.worldTransform.position = this._defaultCamera.worldTransform.position.add(distance)
        UIService.show(UINpcTalk, 2, [], () => { this.stage3call(distance) })
        this.skipNpcTalk()
    }

    private stage3call(distance) {
        this._defaultCamera.worldTransform.position = this._defaultCamera.worldTransform.position.subtract(distance)
        console.log("guideStage3", this.jailer.worldTransform);
        Navigation.navigateTo(this.jailer, new Vector(-10977.96, 2457.95, 100), 50, () => {
            this.jailer.setVisibility(mw.PropertyStatus.Off, true);
            this.reqGuideComplete(3)
            //玩家开始自言自语
            this.guideStage4()
        }, () => {
            this.jailer.setVisibility(mw.PropertyStatus.Off, true);
            this.reqGuideComplete(3)
            //玩家开始自言自语
            this.guideStage4()
        })
    }
    /**自言自语 基本操作阶段 */
    public guideStage4() {
        console.log("guideStage4")
        this.localPlayer.character.worldTransform.position = GameConfig.SubGlobal.guid_pos.vector
        this.jailer.setVisibility(mw.PropertyStatus.Off, true);
        UIService.show(UINpcTalk, 1, [], () => { this.stage4call() })
        this.skipNpcTalk()
    }

    private stage4call() {
        this._defaultCamera.springArm.useControllerRotation = true;
        this.localPlayer.character.setStateEnabled(CharacterStateType.Running, true)
        this.localPlayer.character.setStateEnabled(CharacterStateType.Jumping, true)
        this.guideStage5();
    }

    private timeOut: any;

    /**寻找道具解密阶段 */
    public async guideStage5() {
        this.reqGuideComplete(4);
        console.log("guideStage5")
        this.localPlayer.character.worldTransform.position = GameConfig.SubGlobal.guid_pos.vector
        this.jailer.setVisibility(mw.PropertyStatus.Off, true);
        await WaitTime.wait(1);
        //切换到第一人称视角
        GuideCameraUtil.switchToFirstPerson(() => {
            GhostTraceHelper.uploadMGS("ts_game_start", "动画流程埋点", { scene_id: 12 })
            let mainUI = UIService.show(MainUI)
            mainUI.showGuideUI(false);
            mainUI.applyHallPanel();
            mainUI.mTextGuide.visibility = SlateVisibility.Visible;
            mainUI.moveGuide();
            this.timeOut = setTimeout(async () => {
                let obj1 = await GameObject.asyncFindGameObjectById("2C8AA3A1")
                let obj2 = await GameObject.asyncFindGameObjectById("2E779B45")
                obj1?.setVisibility(mw.PropertyStatus.On, true);
                obj2?.setVisibility(mw.PropertyStatus.On, true)
            }, 60e3)
        })
    }


    public guideStage6() {
        UIService.hide(MainUI).mTextGuide.visibility = SlateVisibility.Hidden
        this.reqGuideComplete(5)
        GhostTraceHelper.uploadMGS("ts_game_start", "动画流程埋点", { scene_id: 14 })
        this.localPlayer.character.worldTransform.position = GameConfig.SubGlobal.guid_outpos.vector
        UIService.hide(MainUI);
        // 阴暗爬行
        GhostTraceHelper.uploadMGS("ts_game_start", "动画流程埋点", { scene_id: 13 })
        CameraCG.instance.play(cameraJson6, async () => {
            UIService.hide(UISkip);
            //黑幕 
            UIService.show(Background_Generate);
            await TimeUtil.delaySecond(2)
            UIService.hide(Background_Generate);
            // 出来被击倒
            CameraCG.instance.play(cameraJson7, async () => {
                this.localPlayer.character.worldTransform.lookAt(new Vector(this.doctorChar.worldTransform.position.x, this.doctorChar.worldTransform.position.y, this.localPlayer.character.worldTransform.position.z))
                this.guideStage7();
            }, true)
            //用来跳过 cameraJson7
            UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
        }, true)
        //用来跳过cameraJson6
        UIService.show(UISkip, () => {
            this._isJumped = true; CameraCG.instance.stop(true);
        })
    }

    guideStage7() {
        CameraCG.instance.exitFreeCamera();
        Camera.switch(this._defaultCamera)
        UIService.hide(UISkip);
        Event.addLocalListener("PlayerAlready", async () => {
            UIService.hide(MainUI);
            this._defaultCamera.lookAt(this.doctorChar.getSlotWorldPosition(HumanoidSlotType.Head));
            await WaitTime.wait(1);
            GuideCameraUtil.switchToThirdPerson(async () => {
                Event.dispatchToLocal("evt_interactNpc", "2362F169");
                // 等待对话结束
                UIService.getUI(UINpcTalk).setTalkFinishCall(() => { this.stage7call() })
                this.skipNpcTalk()
                //设置弹簧臂长度
                Camera.currentCamera.springArm.length = 350;
            });
        })
        // 把木牌子放进背包
        ModuleService.getModule(BagModuleC).pushWoodCardItemIntoBag();
        UIService.show(LoadingGameUI);
    }

    private skipNpcTalk() {
        TimeUtil.delayExecute(() => {
            UIService.show(UISkip, () => {
                this._isJumped = true; UIService.hide(UINpcTalk)
            })
        }, 5)
    }

    private stage7call() {
        GhostTraceHelper.uploadMGS("ts_game_start", "动画流程埋点", { scene_id: 15 })
        UIService.hide(MainUI);
        CameraCG.instance.play(cameraJson5, async () => {
            UIService.show(MainUI).applyHallPanel();
            UIService.getUI(MainUI).showGuideUI(false);
            EquipDefine.EquipItem(null);
            CameraCG.instance.exitFreeCamera();
            Camera.switch(this._defaultCamera);
            GameDefines.isThirdPerson = true;
            Camera.currentCamera.preset = CameraPreset.ThirdPerson;
            Camera.currentCamera.springArm.length = GuideCameraUtil.thirdPersonPreset.armLength;
            ModuleService.getModule(ObjInterModuleC).resetSelectItem();
            this.reqGuideComplete(6);
            console.log("guideStage7 EXIT");
            UIService.getUI(MainUI).showGuideUI(true);
            // 镜头旋转
            GameObject.asyncFindGameObjectById("055F0FAD").then(lookPoint => {
                Camera.currentCamera.lookAt(lookPoint);
            })
            ModuleService.getModule(EquipModuleC).resetCamera()
        }, true)
        TimeUtil.delaySecond(0.1).then(() => {
            UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
        })
    }

    public reqGuideComplete(stage: number) {
        this.server.net_completeGuide(stage);
        if (stage == 6) {
            UIService.hide(UISkip)
            this.localPlayer.character.collisionWithOtherCharacterEnabled = true;
            this.localPlayer.character.setStateEnabled(CharacterStateType.Running, true)
            this.localPlayer.character.setStateEnabled(CharacterStateType.Jumping, true)
        }
    }

    /**
     * 隐藏其他玩家
     * @param playerId 没有完成引导的玩家id
     */
    net_hideOtherPlayer(playerId: number) {
        let player = Player.getPlayer(playerId)
        player["finishGuide"] = true;//加个标记 引导时屏蔽IDCard
        if (playerId != this.localPlayerId) {
            if (player && player.character) player.character.setVisibility(mw.PropertyStatus.Off, true)
        } else {
            player.character.collisionWithOtherCharacterEnabled = false;
        }
    }

    /**玩家完成引导后 在其他玩家客户端显示该玩家 */
    net_showPlayer(playerIds: number[]) {
        console.log("showPlayers", playerIds);
        Player.getAllPlayers().forEach(player => {
            if (player && player.character && player.playerId != this.localPlayerId) {
                if (playerIds.includes(player.playerId)) {
                    player.character.setVisibility(mw.PropertyStatus.On, true);
                    player["finishGuide"] = null;//加个标记 引导时屏蔽IDCard
                }
                else {
                    player.character.setVisibility(mw.PropertyStatus.Off, true);
                    player["finishGuide"] = true;//加个标记 引导时屏蔽IDCard
                }
            }
        })
    }

    testGuide() {
        this.checkGuide(0)
    }
}
