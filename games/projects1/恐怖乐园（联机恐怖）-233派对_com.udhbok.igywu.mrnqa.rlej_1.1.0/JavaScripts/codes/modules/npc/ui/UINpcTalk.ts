/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-19 09:44:43
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-05-29 16:05:11
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\npc\ui\UINpcTalk.ts
 * @Description  : 
 */
/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-05-10 20:04:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2024-05-16 18:59:58
 * @FilePath: \1001_hall\JavaScripts\codes\modules\npc\ui\UINpcTalk.ts
 * @Description  : 
 */


import { GameConfig } from "../../../../config/GameConfig";
import { INPCElement } from "../../../../config/NPC";
import { ITalkElement } from "../../../../config/Talk";
import Guidtalk_Generate from "../../../../ui-generate/ShareUI/NPC/Guidtalk_generate";
import TalkItem_Generate from "../../../../ui-generate/ShareUI/NPC/TalkItem_generate";
import { BagDefine } from "../../bag/BagDefine";
import MissionModuleC from "../../mission/MissionModuleC";
import RecordModuleC from "../../record/RecordModuleC";


@RegNpcTalkUI([1, 2, 3])
export default class UINpcTalk extends Guidtalk_Generate {
    private npcData: INPCElement;
    private curTalkData: ITalkElement;
    private inter: any;
    private optionCanvasPos: Vector2;
    public canClick: boolean = false;
    private optionTween: Tween<{}>;
    private curMissList: number[] = []
    public curMissionID: number = -1;
    /**对话结束时 的回调函数 */
    private talkFinishCall: Function;
    /**对话打开的 */
    public static uiMap: Map<number | string, { new(): mw.UIScript }> = new Map();

    private uiHideCall: Map<mw.UIScript, Action> = new Map();

    protected onStart(): void {
        this.optionCanvasPos = this.cav_select.position;
        this.btn_continue.onClicked.add(() => {
            if (!this.canClick) this.stopPrint()
        })
    }

    setTalkFinishCall(call: Function) {
        this.talkFinishCall = call;
    }

    onShow(npcId: number, missionList: number[] = [], call?: Function) {
        this.curMissList = missionList;
        this.talkFinishCall = call;
        this.npcData = GameConfig.NPC.getElement(npcId);
        this.txt_name.text = this.npcData.name;
        this.img_people.imageGuid = this.npcData.imageGuid;
        this.showContent(this.npcData.TalkID)
    }

    showContent(talkID: number) {
        this.canClick = false;
        this.curTalkData = GameConfig.Talk.getElement(talkID);
        this.setOptions();
        this.printWords();
    }

    setOptions() {
        this.cav_select.removeAllChildren();
        //先创建任务选项
        if (this.curTalkData.isShowMission) {
            this.curMissList.forEach(missionID => {
                let mission = GameConfig.Mission.getElement(missionID);
                let item = UIService.create(OptionItem);
                item.setData(this, mission.name, 0, mission.talkID, missionID, true);
                this.cav_select.addChild(item.uiObject);
            })
        }

        //创建对话选项
        for (let i = 0; i < this.curTalkData.talkTableText.length; ++i) {
            let item = UIService.create(OptionItem);
            let text = this.curTalkData.talkTableText ? this.curTalkData.talkTableText[i] : "没有内容"
            let func = this.curTalkData.talkTable ? this.curTalkData.talkTable[i] : 1;
            let param = this.curTalkData.talkTablePara ? this.curTalkData.talkTablePara[i] : -1;
            item.setData(this, text, func, param);
            this.cav_select.addChild(item.uiObject);
        }
        this.cav_select.visibility = SlateVisibility.Collapsed;
    }

    printWords() {
        let content = this.curTalkData.talk;
        if (!content || content == "" || content.length < 1) return;
        let index = 0;
        this.inter = TimeUtil.setInterval(() => {
            if (index < content.length) {
                index++;
                this.txt_content_2.text = content.slice(0, index);
            } else {
                this.stopPrint()
            }
        }, 0.05)
    }

    stopPrint() {
        if (this.optionTween && this.optionTween.isPlaying()) return;
        TimeUtil.clearInterval(this.inter);
        this.txt_content_2.text = this.curTalkData.talk;
        let startPos = new Vector2(WindowUtil.getViewportSize().x, this.cav_select.position.y)
        this.optionTween = new Tween({ pos: startPos })
            .onStart(() => { this.cav_select.visibility = SlateVisibility.Visible })
            .to({ pos: this.optionCanvasPos }, 300)
            .onUpdate((val) => { this.cav_select.position = val.pos })
            .easing(TweenUtil.Easing.Cubic.In)
            .onComplete(() => { this.canClick = true })
            .start()
    }

    takeMission() {
        if (!GameConfig.Mission.getElement(this.curMissionID)) {
            console.log("任务ID错误！！");
            return
        }
        ModuleService.getModule(MissionModuleC).reqTakeMission(this.curMissionID);
    }

    showUI(key: number) {
        if (UINpcTalk.uiMap.has(key)) {
            UIService.hide(UINpcTalk);
            const view = UIService.show(UINpcTalk.uiMap.get(key));

            // // 隐藏回调
            // if (!this.uiHideCall.has(view)) {
            //     const action = new Action();
            //     this.uiHideCall.set(view, action);
            //     view["ueObject"].OnVisibilityChanged.Add((visible) => {
            //         if (visible == mw.SlateVisibility.Hidden || visible == mw.SlateVisibility.Collapsed) {
            //             action.call();
            //         }
            //     });
            // }
        }
    }
    onHide() {
        TimeUtil.clearInterval(this.inter);
        this.curMissionID = -1;
        this.canClick = false;
        this.curMissList.length = 0;
        this.txt_content_2.text = "";
        this.optionTween?.stop();
        this.talkFinishCall && this.talkFinishCall();
        this.savaDataAndGiveReward();
    }

    /**
     * 记录对话数据并给予奖励
     */
    public savaDataAndGiveReward() {
        if (this.npcData.rewardId) {
            let result = ModuleService.getModule(RecordModuleC).reqSaveTalkNpc(this.npcData.rewardId);
            if (result) {
                BagDefine.AddItem(Player.localPlayer.playerId, this.npcData.rewardId, "", "", 1, false);
            }
        }
    }

}

/**
 * 注册 npc 对话界面
 * @param key key值
 * @returns 
 */
export function RegNpcTalkUI(key?: string | number | ((number | string)[])) {
    return function (constructor: { new(): mw.UIScript }) {
        if (key == null) {
            UINpcTalk.uiMap.set(constructor.name, constructor);
        } else if (Array.isArray(key)) {
            key.forEach(k => {
                UINpcTalk.uiMap.set(k, constructor);
            });
        } else {
            UINpcTalk.uiMap.set(key, constructor);
        }
    };
}

export enum EOptionCall {
    /**下一句对话 */
    NextWords,
    /**关闭对话 */
    CloseTalk,
    /**接受任务 */
    TakeMission,
    /**暂定 */
    None,
    /**打开UI */
    OpenUI
}

export class OptionItem extends TalkItem_Generate {
    private func: number = -1;
    private param: number = -1;
    private missionId: number = -1;
    private parent: UINpcTalk;
    onStart() {
        this.btn_select_1.onClicked.add(() => {
            if (!this.parent || !this.parent.canClick) return;
            this.parent.curMissionID = this.missionId;
            this.clickCall()
        })
    }

    setData(parent: UINpcTalk, text: string, func: number, param: number, missionId: number = -1, isMissionItem: boolean = false) {
        this.func = func;
        this.param = param;
        this.parent = parent;
        this.btn_select_1.text = text;
        this.missionId = missionId;
        if (isMissionItem) this.imageMark.visibility = SlateVisibility.Visible;
    }

    clickCall() {
        switch (this.func) {
            case EOptionCall.NextWords:
                this.parent.showContent(this.param)
                break
            case EOptionCall.CloseTalk:
                UIService.hide(UINpcTalk);
                break
            case EOptionCall.TakeMission:
                this.parent.takeMission()
                break
            case EOptionCall.None:
                break
            case EOptionCall.OpenUI:
                this.parent.showUI(this.param)
                break
            default:
                console.log("参数错误！", this.func);

        }
    }
}