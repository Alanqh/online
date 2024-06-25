/*
 * @Author       : dal
 * @Date         : 2024-05-13 14:16:18
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-17 18:18:44
 * @FilePath     : \1001_hall\JavaScripts\codes\modules\graph\GraphModuleC.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import GraphModuleData from "./GraphModuleData";
import GraphModuleS from "./GraphModuleS";

export default class GraphModuleC extends ModuleC<GraphModuleS, GraphModuleData> {

    protected onStart(): void {
        DataCenterC.ready().then(() => {
            this.data.onDataChange.add(() => {
                this.checkNeedViewRedDot()
            });
            this.checkNeedViewRedDot();
            this.data.pieceAction.add(v => {
                const pieceCfg = GameConfig.GhostFragment.getElement(v);
                GhostTraceHelper.uploadMGS("ts_action_levelup", "点击拍照按钮上发", { player_level: pieceCfg.ghostGraphId, money: this.data.getPieceFromUnlockedArr(pieceCfg.ghostGraphId).length });
            });
        });
    }

    private checkNeedViewRedDot() {
        for (const cfg of GameConfig.GhostGraph.getAllElement()) {
            if (this.data.checkViewRedDot(cfg.id)) {
                this.setMainUIRedPointView(true);
                return;
            }
        }
        this.setMainUIRedPointView(false);
    }

    /**
     * 控制主界面的红点UI显隐
     * @param isView 是否显示
     */
    private setMainUIRedPointView(isView: boolean) {
        UIService.getUI(MainUI).img_camerapoint.visibility = isView ? SlateVisibility.SelfHitTestInvisible : SlateVisibility.Collapsed;
    }

    /**
     * 阅读碎片
     */
    public readPiece(pieceId: number) {
        if (this.data.isReadPiece(pieceId)) {
            return false;
        }
        this.server.net_readPiece(pieceId);
        return true;
    }

    public unlockNewPiece(pieceId: number) {
        this.server.net_unlockNewPiece(pieceId);
    }

    public async unlockNewGraph(graphId: number) {
        if (this.data.checkHasGraph(graphId)) { return false; }
        if (!this.data.checkHasAllPiece(graphId)) { return false; }
        return this.server.net_unlockNewGraph(graphId);
    }

    public async receiveReward(graphId: number, type: number) {
        if (this.data.rewardIsReceived(graphId, type)) { return false; }
        if (!this.data.checkHasGraph(graphId)) { return false; }
        return await this.server.net_receiveReward(graphId, type);
    }
}