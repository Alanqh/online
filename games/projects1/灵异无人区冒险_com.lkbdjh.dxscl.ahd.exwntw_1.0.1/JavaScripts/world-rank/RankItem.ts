import { RankData } from "./RankData";

/** 
 * @Author       : lei.zhao
 * @Date         : 2023-08-10 19:13:01
 * @LastEditors  : lei.zhao
 * @LastEditTime : 2023-08-11 09:56:28
 * @FilePath     : \FogTest\JavaScripts\world-rank\RankItem.ts
 * @Description  : 修改描述
 */
@UIBind('UI/world-rank/WorldRankItem.ui')
export default class RankItem extends mw.UIScript {
    private formatNumberBits = [1000000000000000000000000, 1000000000000000000000, 1000000000000000000, 1000000000000000, 1000000000000, 1000000000, 1000000, 1000];
    private formatNumberString = ["ad", "ac", "ab", "aa", "T", "B", "M", "K"];
    public rankText: mw.TextBlock;
    public nameText: mw.TextBlock;
    public dataText: mw.TextBlock;
    onStart() {
        this.rankText = this.uiWidgetBase.findChildByPath("RootCanvas/RankText") as mw.TextBlock;
        this.nameText = this.uiWidgetBase.findChildByPath("RootCanvas/NameText") as mw.TextBlock;
        this.dataText = this.uiWidgetBase.findChildByPath("RootCanvas/DataText") as mw.TextBlock;
    }
    /**
     * 设置数控
     * @param index 排名
     * @param data 数据
     * @param isLongNum 是否是科学计数 
     * @param isLocalPlayer 是否本机玩家
     */
    public updateData(index: number, data: RankData, isLongNum: boolean, isLocalPlayer: boolean) {
        const color = isLocalPlayer ? mw.LinearColor.green : mw.LinearColor.white;
        this.rankText.text = index.toString();
        this.nameText.text = data.name;
        this.dataText.text = isLongNum ? this.formatNumber(data.data) : data.data.toString();
        this.dataText.fontColor = color;
        this.nameText.fontColor = color;
        this.rankText.fontColor = color;
    }

    /**
     * 科学计数法
     * @param value 
     * @returns 
     */
    private formatNumber(value: number) {
        const isNegetive = value < 0;
        if (value < 0) { value = -value; }
        for (let i = 0; i < this.formatNumberBits.length; i++) {
            if (value > this.formatNumberBits[i]) {
                return (value / this.formatNumberBits[i]).toFixed(1) + this.formatNumberString[i];
            }
        }
        return isNegetive ? ("-" + value) : value.toString();
    }
}
