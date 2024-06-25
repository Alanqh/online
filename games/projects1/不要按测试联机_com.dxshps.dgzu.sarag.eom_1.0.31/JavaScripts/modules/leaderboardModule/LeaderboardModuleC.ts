import { LeaderboardBaseItem, LeaderboardBasePanel, LeaderboardModuleBaseC, LeaderboardPlayerData } from "module_leaderboard";
import { GameConfig } from "../../config/GameConfig";
import LeaderboardItem_Generate from "../../ui-generate/leaderboardModule/LeaderboardItem_generate";
import LeaderboardPanel_Generate from "../../ui-generate/leaderboardModule/LeaderboardPanel_generate";
import { LeaderboardModuleS } from "./LeaderboardModuleS";

//定义要显示的字段的key
export enum FieldType {
    Name = 1,
    Score = 2,
}
//定义UI-玩家条目
class LeaderboardItem extends LeaderboardBaseItem<LeaderboardItem_Generate>{
    private constructor() {
        super(LeaderboardItem_Generate);
    }
}
//定义UI-主面板
class LeaderboardPanel extends LeaderboardBasePanel<LeaderboardPanel_Generate>{
    private constructor() {
        super(LeaderboardPanel_Generate);
    }
    protected onStart(): void {
        let title = GameConfig.Text.getElement(10005).Text;//排行榜
        let ranking = GameConfig.Text.getElement(10006).Text;//排名
        let name = GameConfig.Text.getElement(10007).Text;//玩家
        let round = GameConfig.Text.getElement(10008).Text;//累计击杀
        let rankStr = GameConfig.Text.getElement(10009).Text;//第{0}名

        this.setStyle(title, true, 10, 5);//设置样式
        this.showRankField(ranking, rankStr, null);//显示排名字段，设置字段的显示方式，默认不显示排名
        this.addField(FieldType.Name, name);//添加字段
        // this.addField(FieldType.Gold, "金币");//添加字段
        this.addField(FieldType.Score, round);//添加字段并设置显示风格
        this.setSortFields(FieldType.Score);

        this.layer = mw.UILayerMiddle;

    }
    //创建一个玩家条目
    protected override creatItem(): LeaderboardItem {
        return LeaderboardItem.create();
    }
    // //可以重写自己的显示信息内容(就是UI下面那一行)，不需要重写的字段不用return，会使用addField的样式
    // protected override onSelfFieldSet(fieldId: number, fieldValue: number | string): string {
    //     if (fieldId == FieldType.Name) return "自己";
    // }
}
//排行榜-客户端
export class LeaderboardModuleC extends LeaderboardModuleBaseC<LeaderboardModuleS> {
    private _mainPanel: LeaderboardPanel;
    //执行
    protected onExecute() {
        this.startRefreshPanel((dataList: Array<LeaderboardPlayerData>) => {
            this.mainPanel.show(dataList);
        });
    }
    //主界面
    private get mainPanel(): LeaderboardPanel {
        if (this._mainPanel == null) {
            this._mainPanel = LeaderboardPanel.create();
            this._mainPanel.onClose.add(() => {
                this.stopRefreshPanel();
            });
        }
        return this._mainPanel;
    }
}