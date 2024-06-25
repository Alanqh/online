import AnimationNode_Generate from "../../../../../ui-generate/ShareUI/common/AnimationEditor/AnimationNode_generate";
import { PlayerManagerExtension } from "../../../../Modified027Editor/ModifiedPlayer";
import { GridLayout } from "../../../../utils/GridLayout";
import { GridSelectContainerItem } from "../../../../utils/UIPool";
import { NodeInfoBase, NodeType, getNodeClassByType, NodeInfoAnim, NodeInfoSkillRect } from "../AnmationInfo";
import { SkillRectCheck } from "../SkillRectCheck";
import { NodeParamItem } from "./AnimationParamItem";
import { UIAnimationEditor, NodeTypeStr } from "./UIAnimationEditor";


export class UIAnimationNode extends AnimationNode_Generate implements GridSelectContainerItem {

    // #region GridSelectContainerItem
    onSelect: Action = new Action();
    isSelected: boolean;
    setSelected(isTrue: boolean) {
        this.isSelected = isTrue;
        if (isTrue) {
            this.cavSelect.visibility = mw.SlateVisibility.Visible;
        } else {
            this.cavSelect.visibility = mw.SlateVisibility.Collapsed;
        }
    }
    // #endregion


    /** 节点信息 */
    public info: NodeInfoBase;

    /** 参数UI对象 */
    public paramGridContainer: GridLayout<NodeParamItem>;



    public getInfo() {
        return this.info;
    }

    onStart() {
        this.btnSelect.onClicked.add(() => {
            this.onSelect.call();
        });
        this.paramGridContainer = new GridLayout(this.mScrollBox, this.mCanvasParams, NodeParamItem);


        // =======================绑定按钮事件

        this.mBtnDel.onClicked.add(() => {
            mw.UIService.getUI(UIAnimationEditor).removeNode(this);
        })

        this.mBtnPre.onClicked.add(() => {
            mw.UIService.getUI(UIAnimationEditor).preNode(this);
        })

        this.mBtnNext.onClicked.add(() => {
            mw.UIService.getUI(UIAnimationEditor).nextNode(this);
        })

        this.mBtnCheck.onClicked.add(() => {
            this.onCheckClicked();
        })
    }

    onShow(type: NodeType) {
        if (type == null) return;
        console.log("onShow1", type)
        const nodeClass = getNodeClassByType(type);
        this.info = new nodeClass();
        this.mTextBlockNodeName.text = NodeTypeStr[type];
        this.info.type = type.toString();
        this.paramGridContainer.removeAllNode();
        this.mTextTips.visibility = mw.SlateVisibility.Collapsed;

        // 设置InputBox的内容
        Object.keys(this.info).forEach((key) => {
            console.log("init info param", key, this.info[key]);
            if (key == "type") return;
            const paramNode = this.paramGridContainer.addNode(key);
            if (Array.isArray(this.info[key])) {
                let param = "";
                this.info[key].forEach((element: string, i) => {
                    param += element.toString();
                    if (this.info[key].length - 1 != i) {
                        param += "|";
                    }
                })
                paramNode.mInputBox.text = param;
            }
            else {
                paramNode.mInputBox.text = this.info[key];
            }

            // 绑定InputBox的事件
            paramNode.mInputBox.onTextChanged.clear();
            paramNode.mInputBox.onTextChanged.add((text: string) => {
                if (Array.isArray(this.info[paramNode.keyString])) {
                    let res = text.split("|");
                    let res2 = [];
                    for (let i = 0; i < res.length; i++) {
                        res2.push((res[i]));
                    }
                    this.info[paramNode.keyString] = res2;
                }
                else {
                    this.info[paramNode.keyString] = text;
                }
            });

        })
        console.log("onShow", this.info.type);

    }

    setInfo(info: NodeInfoBase) {
        const nodeClass = getNodeClassByType(Number(info.type));
        this.info = new nodeClass();
        this.mTextBlockNodeName.text = NodeTypeStr[Number(info.type)];
        this.paramGridContainer.removeAllNode();

        Object.keys(this.info).forEach(key => {
            console.log("setInfo", key, info[key])
            if (info[key] != undefined && info[key] != "") {
                if (Array.isArray(this.info[key])) {
                    for (let i = 0; i < this.info[key].length; i++) {
                        if (!Array.isArray(info[key])) {
                            this.info[key][i] = info[key];
                            break;
                        }
                        else if (info[key].length <= i) {
                            break;
                        }
                        else {
                            this.info[key][i] = info[key][i];
                        }
                    }
                } else {
                    if (this.info instanceof NodeInfoAnim && key == "slotIndex") {
                        let slot = parseInt(info[key]);
                        this.info[key] = slot < 0 ? "0" : info[key];
                    } else {
                        this.info[key] = info[key];
                    }
                }
            }
            console.log("set info param", key, this.info[key]);
            if (key == "type") return;
            const paramNode = this.paramGridContainer.addNode(key);
            if (Array.isArray(this.info[key])) {
                let param = "";
                this.info[key].forEach((element: string, i) => {
                    param += element.toString();
                    if (this.info[key].length - 1 != i) {
                        param += "|";
                    }
                })
                paramNode.mInputBox.text = param;
            }
            else {
                paramNode.mInputBox.text = this.info[key];
            }

            // 绑定InputBox的事件
            paramNode.mInputBox.onTextChanged.clear();
            paramNode.mInputBox.onTextChanged.add((text: string) => {
                if (Array.isArray(this.info[paramNode.keyString])) {
                    let res = text.split("|");
                    let res2 = [];
                    for (let i = 0; i < res.length; i++) {
                        res2.push((res[i]));
                    }
                    this.info[paramNode.keyString] = res2;
                }
                else {
                    this.info[paramNode.keyString] = text;
                }
            });
        });
    }

    async onCheckClicked() {
        if (!this.info) {
            return;
        }
        if (this.info instanceof NodeInfoSkillRect) {
            SkillRectCheck.checkNodes(Player.localPlayer.character, [this.info]);
        }
        else if (this.info instanceof NodeInfoAnim) {
            const guid = this.info.guid;
            if (!AssetUtil.assetLoaded(guid)) {
                await AssetUtil.asyncDownloadAsset(guid);
            }
            const anim = PlayerManagerExtension.loadAnimationExtesion(Player.localPlayer.character, guid)
            this.mTextTips.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            if (anim) {
                this.mTextTips.text = `动画时长为${anim.length * 1000}ms`;
                console.log("提示信息", this.mTextTips.text)
            }
            else {
                this.mTextTips.text = `动画加载失败`;
            }
        }
    }

}