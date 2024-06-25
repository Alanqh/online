import RANKUI2_Generate from "../ui-generate/Rank/RANKUI2_generate"

const firstTrophy = "156313"
const secondTrophy = "157927"
const thirdlyTrophy = "157926"

/** 
 * @Author       : haitao.zhong
 * @Date         : 2023-03-07 10:24:05
 * @LastEditors  : haitao.zhong
 * @LastEditTime : 2023-04-11 15:29:13
 * @FilePath     : \stumbleguys\JavaScripts\UI\RankItemUI.ts
 * @Description  : 修改描述
 */
export default class RankItemUI extends RANKUI2_Generate {
    public init(ranking: number, name: string) {
        this.mTextRank.text = ranking.toString()
        this.mTextName.text = name
        if (ranking <= 3) {
            this.mImageTrophy.visibility = mw.SlateVisibility.Visible
            this.mTextRank.visibility = mw.SlateVisibility.Collapsed
        }
        if (ranking == 1) this.mImageTrophy.imageGuid = firstTrophy
        if (ranking == 2) this.mImageTrophy.imageGuid = secondTrophy
        if (ranking == 3) this.mImageTrophy.imageGuid = thirdlyTrophy
    }
}
