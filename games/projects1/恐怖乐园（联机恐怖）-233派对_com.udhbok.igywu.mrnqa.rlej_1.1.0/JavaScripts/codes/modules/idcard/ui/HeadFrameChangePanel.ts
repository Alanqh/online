/*
 * @Author       : dal
 * @Date         : 2024-05-16 16:29:17
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-20 13:51:47
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\idcard\ui\HeadFrameChangePanel.ts
 * @Description  : 换头像框的面板
 */

import { IAvatarFrameElement } from "../../../../config/AvatarFrame";
import { GameConfig } from "../../../../config/GameConfig";
import AvatarFrame_UI_Generate from "../../../../ui-generate/ShareUI/card/AvatarFrame_UI_generate";
import Tips from "../../../utils/Tips";
import { GridSelectContainer } from "../../../utils/UIPool";
import { RouteDefine } from "../../route/RouteDefine";
import { IDCardModuleC } from "../IDCardModule";
import { HeadFrameUIItem } from "./HeadFrameUIItem";
import IDCardPanel from "./IDCardPanel";

export default class HeadFrameChangePanel extends AvatarFrame_UI_Generate {

    private container: GridSelectContainer<HeadFrameUIItem>;

    /** 头像的道具表id列表 */
    private headFrameItemIdArr: number[];

    protected onStart() {
        this.layer = mw.UILayerDialog;
        this.container = new GridSelectContainer(this.canvas_frameItem, HeadFrameUIItem);
        this.btn_change.onClicked.add(async () => {
            if (this.curUsedFrameId === this.curFrameCfg.id) { return; }
            if (!this.checkIsUnlock(this.curFrameCfg.itemId)) { return; }
            if (await this.selfModule.reqChangeCurFrame(this.curFrameCfg.id)) {
                await UIService.getUI(IDCardPanel).setCurHeadFrame()
                UIService.hideUI(this);
                Tips.show("更换头像成功");
            } else {
                UIService.hideUI(this);
                Tips.show("更换头像失败，你似乎没有这个头像");
            }
        });
        this.btn_back.onClicked.add(() => { UIService.hideUI(this) });
        this.headFrameItemIdArr = GameConfig.AvatarFrame.getAllElement().map(v => { return v.itemId; });
    }

    private get selfModule() {
        return ModuleService.getModule(IDCardModuleC);
    }

    /** 当前在看的id */
    private curFrameCfg: IAvatarFrameElement;

    /**
     * 设置信息
     * @param nameStr 
     * @param resourceStr 
     */
    public setInfo(cfg: IAvatarFrameElement) {
        this.curFrameCfg = cfg;
        const itemCfg = GameConfig.Item.getElement(cfg.itemId);
        this.img_avatarFrame.imageGuid = itemCfg.icon;
        this.text_name.text = itemCfg.name;
        this.resourceTxt.text = cfg.source;
        if (cfg.id === this.curUsedFrameId) {
            this.btn_change.visibility = SlateVisibility.Collapsed;
            this.text_change.text = "使用中";
        } else {
            if (this.checkIsUnlock(cfg.itemId)) {
                this.text_change.text = "更换";
                this.btn_change.visibility = SlateVisibility.Visible;
            } else {
                this.text_change.text = "未解锁";
                this.btn_change.visibility = SlateVisibility.Collapsed;
            }
        }
    }

    /** 默认的头像框道具 */
    private readonly defaultHeadFrameItemId: number = 61001;

    /** 当前已解锁的头像框道具id数组 */
    private unlockedItemIdArr: number[] = [];

    /**
     * 检查一个item是否解锁
     * @param itemId 道具id
     */
    public checkIsUnlock(itemId: number) {
        return this.unlockedItemIdArr.includes(itemId);
    }

    /** 当前使用着的头像框id */
    private curUsedFrameId: number = 1;

    protected onShow(curUsedFrameId: number) {
        this.curUsedFrameId = curUsedFrameId;
        this.scrollBox.scrollToStart();
        this.container.clear();
        RouteDefine.getSpecialItemDataList(Player.localPlayer.userId).then(v => {
            // 已解锁的数组
            this.unlockedItemIdArr = v.filter(v => { return this.headFrameItemIdArr.includes(v.cfgId); }).map(v => { return v.cfgId });
            // 默认的解锁道具
            if (!this.unlockedItemIdArr.includes(this.defaultHeadFrameItemId)) { this.unlockedItemIdArr.push(this.defaultHeadFrameItemId); }

            // 排序
            let tempArr = this.getSortedArr(GameConfig.AvatarFrame.getAllElement());
            tempArr.forEach((v) => {
                const node = this.container.addNode();
                node.setData(v);
            });

            this.container.nodes.find(v => { return v.cfg.id === this.curUsedFrameId })?.call();
        });
    }

    /**
     * 获取排序后的数组 是一个新的拷贝
     * @param cfgArr 成就数组
     */
    private getSortedArr(cfgDataArr: IAvatarFrameElement[]) {
        // 拷贝一下防止影响原配置
        let cfgArr = Array.from(cfgDataArr);
        // 权重小的在前
        cfgArr = cfgArr.sort((a, b) => { return a.weight - b.weight });
        // 已解锁的在前
        cfgArr = cfgArr.sort((a, b) => {
            if (this.unlockedItemIdArr.includes(a.itemId) && !this.unlockedItemIdArr.includes(b.itemId)) { return -1; }
            return 0;
        });
        return cfgArr;
    }
}