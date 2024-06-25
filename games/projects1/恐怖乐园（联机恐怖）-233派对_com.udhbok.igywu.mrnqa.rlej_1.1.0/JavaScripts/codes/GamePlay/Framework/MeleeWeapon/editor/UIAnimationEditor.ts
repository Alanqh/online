import AnimationEditor_Generate from "../../../../../ui-generate/ShareUI/common/AnimationEditor/AnimationEditor_generate";
import { GridSelectContainer } from "../../../../utils/UIPool";
import { NodeType, AnimationInfo } from "../AnmationInfo";
import { SkillRectCheck } from "../SkillRectCheck";
import Weapon from "../Weapon";
import { UIAnimationNode } from "./AnimationNodeUI";
import WeaponEditor from "./WeaponEditor";


export const NodeTypeStr = ["", "动画", "特效", "移动", "音效", "技能判定", "飞行弹道", "动作阶段", "控制启用", "相机", "脱手脉冲技能", "相机位置", "隐藏角色"];

export class Define {

    /** ai受击特效 */
    public static ai_OnHitEffGuid: string = "85143";

    /** ai受击动画 */
    public static ai_OnHitAnimationGuid: string = "46284";

    /** ai死亡动画 */
    public static ai_OnDieAnimationGuid: string = "8355";

}

export class UIAnimationEditor extends AnimationEditor_Generate {

    /** 滚动区域 */
    public scroll: GridSelectContainer<UIAnimationNode>;

    /** 所有节点 */
    public nodes: UIAnimationNode[] = [];

    /** 当前选中的节点 */
    public selectIndex: number = -1;

    private testPlayer: Weapon = null;

    private curComboMilSec: number = 0;

    private cs: Camera;

    /** 开始 */
    onStart() {

        this.canUpdate = true;

        this.scroll = new GridSelectContainer(this.mCanvasScroll, UIAnimationNode);
        this.cs = Camera.currentCamera;

        // 受击特效
        this.mAIOnHitGuid.onTextChanged.add((text: string) => {
            Define.ai_OnHitEffGuid = text;
        })

        // 受击动画
        this.mAIOnHitAnimation.onTextChanged.add((text: string) => {
            Define.ai_OnHitAnimationGuid = text;
        })

        // 死亡动画
        this.mAIOnDieAnimation.onTextChanged.add((text: string) => {
            Define.ai_OnDieAnimationGuid = text;
        })

        // #region 新增节点
        this.mAddPeriod.onClicked.add(() => {
            this.addNode(NodeType.Period);
        })
        this.mAddAni.onClicked.add(() => {
            this.addNode(NodeType.Animation);
        })
        this.mAddEff.onClicked.add(() => {
            this.addNode(NodeType.Eff);
        })
        this.mAddMove.onClicked.add(() => {
            this.addNode(NodeType.Move);
        })
        this.mAddAudio.onClicked.add(() => {
            this.addNode(NodeType.Audio);
        })
        this.mAddSkillRect.onClicked.add(() => {
            this.addNode(NodeType.SkillRect);
        })
        this.mAddFlyNode.onClicked.add(() => {
            this.addNode(NodeType.FlyEntity);
        })
        this.mAddForbidenNode.onClicked.add(() => {
            this.addNode(NodeType.Forbidden);
        })
        this.mAddCameraNode.onClicked.add(() => {
            this.addNode(NodeType.Camera);
        })
        this.mAddFollowNode.onClicked.add(() => {
            this.addNode(NodeType.Throw);
        })
        // this.mAddCtrlCameraPos.onClicked.add(() => {
        //     this.addNode(NodeType.CameraPos);
        // })

        // this.mAddHideCharNode.onClicked.add(() => {
        //     this.addNode(NodeType.HideChar);
        // })

        // #endregion


        // 序列化
        this.mBtnToJson.onClicked.add(() => {
            this.toJson();
        })

        // 反序列化
        this.mBtnToView.onClicked.add(() => {
            this.selectIndex = -1;
            this.toView();
        })

        // 获取guid
        this.mBtnGetGuid.onClicked.add(() => {
            let guid = "";
            for (let i = 0; i < this.nodes.length; i++) {
                let info = this.nodes[i].info;
                guid += info["guid"];
                if (i != this.nodes.length - 1) {
                    guid += ",";
                }
            }
            this.mInputOutJson.text = (guid);
        })

        // 播放
        this.mBtnPlay.onPressed.add(() => {

            this.toJson();
            let json = [];
            json.push(this.mInputOutJson.text);
            this.test(json);

        })

        // this.mBtnPlay.onReleased.add(() => {
        //     ModuleService.getModule(GameModuleC).onReleaseBtn();
        // })

        this.mShowBtn.onClicked.add(() => {
            if (this.mScorllAnimation.visible) {
                this.mScorllAnimation.visibility = (mw.SlateVisibility.Hidden);
                SkillRectCheck.showRect = false;
            } else {
                this.mScorllAnimation.visibility = (mw.SlateVisibility.Visible);
                SkillRectCheck.showRect = true;
            }
        })

        // #region Key

        // 播放
        mw.InputUtil.onKeyDown(mw.Keys.One, () => {
            this.toJson();
            let json = [];
            json.push(this.mInputOutJson.text);
            this.test(json);
        })

        // 上移节点
        mw.InputUtil.onKeyDown(mw.Keys.Left, () => {
            if (this.selectIndex >= 0) {
                this.preNode(this.nodes[this.selectIndex]);
            }
        });

        // 下移节点
        mw.InputUtil.onKeyDown(mw.Keys.Right, () => {
            if (this.selectIndex >= 0) {
                this.nextNode(this.nodes[this.selectIndex]);
            }
        });

        // 删除节点
        mw.InputUtil.onKeyDown(mw.Keys.Delete, () => {
            if (this.selectIndex >= 0) {
                this.removeNode(this.nodes[this.selectIndex]);
            }
        });
        // #endregion

        // #region Camera
        // 摄像机
        this.mProgressBarLength.onSliderValueChanged.add((value: number) => {
            this.cs.springArm.length = value;
        })
        this.mProgressBarFov.onSliderValueChanged.add((value: number) => {
            this.cs.fov = value;
        })

        // #endregion

    }

    public clearComboValue() {
        this.curComboMilSec = 0;
    }

    onUpdate(dt: number) {
        let maxComBoTime = WeaponEditor.instance.getCurComboTime();
        if (maxComBoTime == 0) {
            this.mBtnPlay.text = ("")
            this.mSec.text = ("");
            this.mComboSlider.currentValue = (0);
            this.curComboMilSec = 0;
        } else {
            this.curComboMilSec += dt * 1000;
            this.mSec.text = (((maxComBoTime - this.curComboMilSec) / 1000).toFixed(2) + "s");
            this.mComboSlider.currentValue = (this.curComboMilSec / maxComBoTime);
        }
    }

    private test(animationJson: string[]) {
        console.log("testJson", animationJson);
        // ModuleService.getModule(GameModuleC).playAnimation_attack(animationJson);
        WeaponEditor.instance.playAnimation_attack(animationJson, "", 0);
    }

    public removeNode(node: UIAnimationNode) {
        if (this.selectIndex >= 0 && node == this.nodes[this.selectIndex]) {
            this.selectIndex = -1;
        }
        this.scroll.removeNode(node);
        let index = this.nodes.indexOf(node);
        if (index != -1) {
            this.nodes.splice(index, 1);
        }

    }

    /** 上移一个节点 */
    public preNode(node: UIAnimationNode) {

        let index = this.nodes.indexOf(node);
        if (index - 1 < 0) {
            return;
        }
        let temp = this.nodes[index - 1];
        this.nodes[index - 1] = node;
        this.nodes[index] = temp;
        this.selectIndex = index - 1;
        this.toJson();
        this.toView();

    }

    /** 下移一个节点 */
    public nextNode(node: UIAnimationNode) {

        let index = this.nodes.indexOf(node);
        if (index + 1 >= this.nodes.length) {
            return;
        }
        let temp = this.nodes[index + 1];
        this.nodes[index + 1] = node;
        this.nodes[index] = temp;

        this.selectIndex = index + 1;

        this.toJson();
        this.toView();

    }

    /** 添加一个节点 */
    private addNode(type: NodeType) {
        let node = this.scroll.addNode(type);
        if (this.selectIndex >= 0) {
            this.nodes.splice(this.selectIndex + 1, 0, node);
        } else {
            this.nodes.push(node);
        }
        node.onSelect.add(() => {
            if (this.selectIndex == this.nodes.indexOf(node)) {
                this.selectIndex = -1;
                node.setSelected(false);
                return;
            }
            this.selectIndex = this.nodes.indexOf(node);
        })

        this.toJson();
        this.toView();
    }

    /** 序列化 */
    private toJson() {
        let info: AnimationInfo = new AnimationInfo();
        this.nodes.forEach(e => {
            console.log("tojson", JSON.stringify(e.info))
            info.infos.push(e.info);
        })
        if (this.mAIFightIdelGuid.text != "") {
            info.charFightIdelAniId = this.mAIFightIdelGuid.text;
        }
        if (this.mAIFightIdel2IdelGuid.text != "") {
            info.charFightIdel2IdelId = this.mAIFightIdel2IdelGuid.text;
        }
        if (this.mAIFightIdelSlot.text != "") {
            info.charFightIdelSlot = this.mAIFightIdelSlot.text;
        }
        if (this.mAIAutoFocus.text != "") {
            info.autoFocus = this.mAIAutoFocus.text;
        }
        if (this.mAIAutoFocusRadius.text != "") {
            info.autoFocusRadius = this.mAIAutoFocusRadius.text;
        }
        if (this.mAIAutoFocusAngle.text != "") {
            info.autoFocusAngle = this.mAIAutoFocusAngle.text;
        }
        if (this.mAIAutoFocusFactor.text != "") {
            info.autoFocusDistFactor = this.mAIAutoFocusFactor.text;
        }
        this.mInputOutJson.text = (JSON.stringify(info));
    }

    /** 反序列化 */
    private toView() {

        let jsonStr = this.mInputOutJson.text;

        while (jsonStr.indexOf("\\\"") != -1) {
            jsonStr = jsonStr.replace("\\\"", "\"");
        }
        console.log("toView1", jsonStr)
        let animationTemp = JSON.parse(jsonStr);
        let animation = new AnimationInfo();
        Object.keys(animationTemp).forEach(e => {
            animation[e] = animationTemp[e];
        })
        console.log("toView2")

        this.scroll.removeAllNode();
        this.nodes = [];
        this.mAIFightIdelGuid.text = (animation.charFightIdelAniId);
        this.mAIFightIdel2IdelGuid.text = (animation.charFightIdel2IdelId);
        this.mAIFightIdelSlot.text = (animation.charFightIdelSlot);
        this.mAIAutoFocus.text = animation.autoFocus;
        this.mAIAutoFocusRadius.text = animation.autoFocusRadius;
        this.mAIAutoFocusAngle.text = animation.autoFocusAngle;

        animation.infos.forEach(e => {
            console.log("toView3", JSON.stringify(e))
            let node = this.scroll.addNode(e.type);
            this.nodes.push(node);
            node.setInfo(e);
            node.onSelect.add(() => {
                if (this.selectIndex == this.nodes.indexOf(node)) {
                    this.selectIndex = -1;
                    node.setSelected(false);
                    return;
                }
                this.selectIndex = this.nodes.indexOf(node);
            })
        })

        if (this.selectIndex >= 0) {
            this.nodes[this.selectIndex].setSelected(true);
        }

    }

    setJson(str: string) {
        this.mInputOutJson.text = (str);
        this.toView();
    }
}
