/*
 * @Author       : dal
 * @Date         : 2024-05-08 11:18:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-16 11:33:30
 * @FilePath     : \1003_hospital\JavaScripts\codes\modules\graph\GraphModuleS.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { IDCardModuleS } from "../idcard/IDCardModule";
import { RouteDefine } from "../route/RouteDefine";
import GraphModuleC from "./GraphModuleC";
import GraphModuleData from "./GraphModuleData";

export default class GraphModuleS extends ModuleS<GraphModuleC, GraphModuleData> {

    @Decorator.noReply()
    public net_readPiece(pieceId: number) {
        this.currentData.saveReadPiece(pieceId);
    }

    @Decorator.noReply()
    public net_unlockNewPiece(pieceId: number) {
        this.currentData.addPhotoCount(GameConfig.GhostFragment.getElement(pieceId).ghostGraphId);
        this.currentData.unlockNewPiece(pieceId);
    }

    public net_unlockNewGraph(graphId: number) {
        return this.currentData.unlockNewGraph(graphId);
    }

    /**
     * 领取奖励
     * @param graphId 图录id
     * @param type 类型
     * @returns 
     */
    public net_receiveReward(graphId: number, type: number) {
        if (this.currentData.saveRewardReceived(graphId, type)) {
            const cfg = GameConfig.GhostGraph.getElement(graphId);
            switch (type) {
                // 鬼魅币
                case 0:
                    RouteDefine.changeFearCoin(this.currentPlayer.userId, cfg.gfearcoin[0]);
                    break;
                // 魅力值
                case 1:
                    ModuleService.getModule(IDCardModuleS).net_addCharmVal(this.currentPlayer.userId, cfg.gpopular[0]);
                    break;
            }
            return true;
        }
        return false;
    }
}