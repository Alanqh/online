/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:40:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-23 11:11:58
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import RankUI_Generate from "../ui-generate/在线排行/RankUI_generate"
import { RankItemUI } from "./RankItemUI"


export class RankUI extends RankUI_Generate {
    /**Item列表，存储了显示的所有Item */
    private _allRankUIItem: RankItemUI[] = []
    protected onAwake(): void {
        Event.addLocalListener("onScoreDataChange", (enCodeDataList: string[]) => {
            this.freshItemByData(enCodeDataList)
        })
        this.mtbtn.onClicked.add(() => {
			if (this.mScrollBox.visible){
                this.mScrollBox.visibility = mw.SlateVisibility.Hidden//隐藏
            }else{
                this.mScrollBox.visibility = mw.SlateVisibility.Visible//显示
            }
		})
    }
    /**根据数据，刷新Item的显示 */
    private freshItemByData(enCodeDataList: string[]) {
        // 获取玩家的数据
        let deCodeDataList = this.deCodeAndSortData(enCodeDataList)
        // 根据玩家数据的数量，算出是否需要创建新的Item
        let differenceValue = deCodeDataList.length - this._allRankUIItem.length
        // 如果当前Item的数量小于玩家的数量，创建新的Item
        if (differenceValue > 0) {
            for (let i = 0; i < differenceValue; i++) {
                // 创建Item
                let rankItem = mw.createUI("在线排行/RankItemUI", RankItemUI)
                // 将Item添加到滑动框中
                this.mScrollBox.addChild(rankItem.uiObject)
                // 计算Item在滑动框中的位置
                rankItem.uiObject.position = new mw.Vector2(0, this._allRankUIItem.length * 50)
                this._allRankUIItem.push(rankItem)
            }
        }
        // 遍历所有Item，根据数据判断是否需要刷新数据，是否需要隐藏
        for (let index = 0; index < this._allRankUIItem.length; index++) {
            if (index < deCodeDataList.length) {
                this._allRankUIItem[index].setVisible(true)
                this._allRankUIItem[index].freshByData(index, deCodeDataList[index].nickname, deCodeDataList[index].score, deCodeDataList[index].s2, deCodeDataList[index].s3)
            } else {
                this._allRankUIItem[index].setVisible(false)
            }
        }
    }
    /**将数据还原为键值对形式，并排序 */
    private deCodeAndSortData(enCodeDataList: string[]) {
        let deCodeList: { "playerID": string, "nickname": string ,"score": number , "s2": number, "s3": number}[] = []
        for (let enCode of enCodeDataList) {
            let deCode = enCode.split("_")
            deCodeList.push({ "playerID": String(deCode[0]),"nickname": String(deCode[1]), "score": Number(deCode[2]), "s2": Number(deCode[3]), "s3": Number(deCode[4]) })
        }
        deCodeList.sort((a, b) => { return b.score - a.score })
        return deCodeList
    }
}