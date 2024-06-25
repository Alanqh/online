/*
 * @Author       : dal
 * @Date         : 2024-05-24 16:57:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-06-05 16:27:31
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\globalRankNew\ui\NewRankPanel.ts
 * @Description  : 
 */

import RankingList_UI_Generate from "../../../../ui-generate/ShareUI/rank/RankingList_UI_generate";
import { GridContainer } from "../../../utils/UIPool";
import { globalRankComponentMap } from "../GlobalRankComponent";
import { NewRankDataInfoBase } from "../NewRankData";
import { EBaseRankDataType, NewRankDefine } from "../NewRankDefine";
import { NewRankModuleC } from "../NewRankModuleC";
import { MyRankItem, NewRankItem } from "./NewRankItem";

export class NewRankPanel extends RankingList_UI_Generate {
    private container: GridContainer<NewRankItem>;

    private myItem: MyRankItem;

    public type: EBaseRankDataType;

    protected onStart() {
        this.canUpdate = true;
        this.container = new GridContainer(this.canva_rankContent, NewRankItem);
        this.myItem = new MyRankItem(this.canvas_myRank, this.text_myRankNum, this.text_myData, this.text_myName, this.img_icon, this.btn_openCard, this.btn_gift);
    }

    private get selfModule() {
        return ModuleService.getModule(NewRankModuleC);
    }

    public init(type: EBaseRankDataType) {
        this.type = type;
        let txt = NewRankDefine.tittleTxtArr[NewRankDefine.rankTypeArr.indexOf(type)];
        this.text_title.text = `${txt}榜`;
        this.text_data.text = `${txt}`;
        // 添加个监听方法
        this.selfModule.addViewAction(type, this.updateView.bind(this));
    }

    /** 自动刷新时间 */
    private refreshTime: number = NewRankDefine.AutoUpdateCacheTime - 1;

    /** 没过一秒更新下排行榜剩余刷新时间 */
    private delta = 1;

    /** 刷新面板 */
    public refresh() {
        this.delta = 1;
        this.refreshTime = NewRankDefine.AutoUpdateCacheTime - 1;
        this.updateLeftRefreshTime();
    }

    protected onUpdate(dt: number) {
        if (this.refreshTime <= 0) { return; }
        this.delta -= dt;
        if (this.delta <= 0) {
            this.delta = 1;
            this.refreshTime = this.refreshTime - 1;
            this.updateLeftRefreshTime();
        }
    }

    private updateLeftRefreshTime() {
        this.text_time.text = `排行榜剩余刷新时间：${this.refreshTime}s`;
    }

    private async updateView(infoArr: NewRankDataInfoBase[]) {
        // 设置自己的数据
        this.selfModule.reqGetSelfRankInfo(this.type).then((info) => {
            this.myItem.setData(info, this);
        });

        /** 禁止掉一些玩家显示 */
        infoArr = infoArr.filter((v) => { return !NewRankDefine.BlackList.includes(v.i) });

        // 设置总体数据
        this.container.clear();
        infoArr.forEach((info, id) => {
            const node = this.container.addNode();
            node.setData(id + 1, info, this);
        });

        // 对于需要显示形象的排行榜，设置排行前三的形象
        if (NewRankDefine.viewRole(this.type)) {
            const arr = Array.from(infoArr).slice(0, 3).map(v => { return v.i });
            globalRankComponentMap.get(this.type).setShareRole(await this.selfModule.getUserBaseInfoArr(arr));
        }
    }
}