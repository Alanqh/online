import { RankData } from "./RankData";
import RankItem from "./RankItem";
/** 
 * @Author       : lei.zhao
 * @Date         : 2023-08-10 19:12:54
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-11 09:59:20
 * @FilePath     : \FogTest\JavaScripts\world-rank\RankUI.ts
 * @Description  : 修改描述
 */
const tempV2 = new Vector2();
export class RankUI {

    private rankTitle: mw.TextBlock;
    private nameTitle: mw.TextBlock;
    private dataTitle: mw.TextBlock;
    public canvas: mw.Canvas;

    private cache: RankItem[] = [];
    constructor(private userWidget: mw.UserWidget) {
        this.rankTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/RankTitle") as mw.TextBlock;
        this.nameTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/NameTitle") as mw.TextBlock;
        this.dataTitle = this.userWidget.findChildByPath("RootCanvas/Canvas/DataTitle") as mw.TextBlock;
        this.canvas = this.userWidget.findChildByPath("RootCanvas/Canvas") as mw.Canvas;
    }

    public updateRankTitle(rankTitle: string, nameTitle: string, dataTitle: string) {
        this.rankTitle.text = rankTitle;
        this.nameTitle.text = nameTitle;
        this.dataTitle.text = dataTitle;
    }
    public updateData(component: mw.Canvas, data: RankData[], isLongNum: boolean, localUserId: string) {
        for (let i = 0; i < data.length; i++) {
            let item = this.cache[i];
            if (!item) {
                item = mw.UIService.create(RankItem);
                component.addChild(item.uiObject);
                item.uiObject.position = tempV2.set(0, 120 + 110 * i);
                this.cache.push(item);
            }
            item.updateData(i + 1, data[i], isLongNum, localUserId === data[i].userId);
        }
    }
}
