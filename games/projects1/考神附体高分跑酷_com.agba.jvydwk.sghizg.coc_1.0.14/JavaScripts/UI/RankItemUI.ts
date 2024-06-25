/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:42:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-08-19 20:01:14
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankItemUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-21 12:42:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-03-21 15:15:41
 * @FilePath: \看谁跳的高\JavaScripts\UI\RankItemUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { modC } from "../modC"
import RankItemUI_Generate from "../ui-generate/在线排行/RankItemUI_generate"

export class RankItemUI extends RankItemUI_Generate {
    /**根据数据刷新显示 */
    public freshByData(index: number,nickname:string, score: number, s2: number, s3: number) {
		let ranknum =  (index + 1).toString()
		let ss1 = ModuleService.getModule(modC).NumCon(score)
		let ss2 = ModuleService.getModule(modC).NumCon(s2)
		let ss3 = ModuleService.getModule(modC).NumCon(s3)
        this.mRank_txt.text = ranknum + " " + nickname + " - " + ss1 + " - " + ss2 + " - " + ss3
    }

}