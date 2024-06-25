/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-14 15:40:43
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-08-17 13:10:01
 * @FilePath: \看谁跳的高\JavaScripts\GameStart.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { modS } from "./modS";
import { modC } from "./modC";
import mydata from "./mydata";
import { RankMgr } from "./UI/RankMgr";
import { RankUI } from "./UI/RankUI";
import MainUI from "./UI/MainUI";
@Component
export default class GameStart extends mw.Script {
    protected onStart(): void {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE)
        // 注册模块（作用相当于游戏脚本里的初始化）
        ModuleService.registerModule(modS, modC, mydata)
        // 初始化RankManager
        RankMgr.Instance.initRankMgr()
        if (SystemUtil.isClient()) {
            // 显示RankUI
            mw.UIService.show(RankUI)
            // 显示UI
            mw.UIService.show(MainUI)
            //取消人物之间的碰撞
            Player.asyncGetLocalPlayer().then(p => {
                p.character.collisionWithOtherCharacterEnabled = false
            })
        }

    }
    
}