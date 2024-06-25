/*
 * @Author       : dal
 * @Date         : 2024-05-08 09:41:42
 * @LastEditors  : dal
 * @LastEditTime : 2024-05-16 15:24:19
 * @FilePath     : \1003_hospital\JavaScripts\codes\modules\graph\GraphModuleData.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { EGameTheme } from "../../Defines";
import { MapEx } from "../../utils/MapEx";
import { AchieveService, EAchieveType } from "../achievement/AchieveDefine";
import { RouteDataHelper } from "../route/RouteData";

export default class GraphModuleData extends Subdata {

    /** 已解锁的图录列表 */
    @Decorator.persistence()
    unlockedGraphArr: number[];
    graphAction: Action = new Action();

    /** 已解锁的碎片列表 */
    @Decorator.persistence()
    unlockedPieceArr: number[];
    pieceAction: Action = new Action;

    /** 不同的鬼的拍摄次数 */
    @Decorator.persistence()
    photoCountMap: MapEx.MapExClass<number> = {};

    /** 奖励领取状态 */
    @Decorator.persistence()
    rewardReceivedMap: MapEx.MapExClass<number[]> = {};

    /** 阅读过的碎片 */
    @Decorator.persistence()
    readPieceArr: number[] = [];

    /** 当前的数据版本 - 用于升级用 */
    protected get version(): number {
        return 1;
    }

    /** 用来数据升级 */
    protected onDataInit(): void {

    }

    protected async initDefaultData(): Promise<void> {
        this.unlockedGraphArr = [];
        this.unlockedPieceArr = [];
        if (SystemUtil.isServer()) {
            // 将玩家已默认解锁的图录给解锁了
            const routeData = await RouteDataHelper.reqGetData(this["mUserId"], EGameTheme.Hall);
            routeData.unlockedItemList.forEach(graphId => {
                if (!this.checkHasGraph(graphId)) {
                    // 解锁对应的碎片
                    this.unlockedPieceArr.concat(GameConfig.GhostFragment.getAllElement()
                        .filter(fragment => { return fragment.ghostGraphId === graphId })
                        .map(cfg => { return cfg.id }));
                }
            });
        }
        this.save(true);
    }

    /**
     * 是否阅读过碎片
     * @param pieceId 碎片id
     */
    public isReadPiece(pieceId: number) {
        return this.readPieceArr.includes(pieceId);
    }

    /**
     * 已阅碎片
     * @param pieceId 
     */
    public saveReadPiece(pieceId: number) {
        if (this.isReadPiece(pieceId)) { return; }
        this.readPieceArr.push(pieceId);
        this.save(true);
    }

    /**
     * 保存奖励领取状态
     * @param graphId 图录id
     * @param type 奖励类型 - 0鬼魅币 1魅力值
     */
    public saveRewardReceived(graphId: number, type: number) {
        if (!this.checkHasThisGraphCfg(graphId)) { return false; }
        if (!this.checkHasGraph(graphId)) { return false; }
        const isReceived = this.rewardIsReceived(graphId, type);
        // 奖励已领取不能重复领取
        if (isReceived) { return false; }
        let reward = MapEx.get(this.rewardReceivedMap, graphId);
        if (!reward) { reward = [0, 0] }
        reward[type] = 1;
        MapEx.set(this.rewardReceivedMap, graphId, reward);
        this.save(true);
        return true;
    }

    /**
     * 某个图录的某个奖励是否已领取
     * @param graphId 图录id
     * @param type 奖励类型 - 0鬼魅币 1魅力值
     */
    public rewardIsReceived(graphId: number, type: number) {
        let reward = MapEx.get(this.rewardReceivedMap, graphId);
        if (!reward) { reward = [0, 0] }
        return reward[type] === 1;
    }

    /**
     * 获取拍摄鬼鬼次数阶段
     * @return 返回index索引 可能是-1
     */
    public getCountStageIndex(graphId: number): number {
        const count = this.getPhotoCount(graphId);
        const arr = GameConfig.SubGlobal.photoCountRate.numberList;
        for (let index = 4; index >= 0; index--) {
            if (count >= arr[index][0]) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 获取拍摄鬼鬼次数增加的鬼魅值倍率
     * @return 返回index索引 从0开始
     */
    public getCountStageRate(graphId: number): number {
        let id = this.getCountStageIndex(graphId);
        let rate = id != -1 ? GameConfig.SubGlobal.photoCountRate.numberList[id][1] : 1;
        return rate;
    }

    /** 增加一下拍摄次数 */
    public addPhotoCount(graphId: number) {
        const photoCount = this.getPhotoCount(graphId);
        MapEx.set(this.photoCountMap, graphId, photoCount + 1);
        this.save(true);
    }

    /** 增加一下拍摄次数 */
    public getPhotoCount(graphId: number) {
        const photoCount = MapEx.get(this.photoCountMap, graphId);
        return photoCount ? photoCount : 0;
    }

    /**
     * 从已阅读的碎片数组中取出该图录所需的碎片
     * @param graphId 图录id
     */
    public getPieceFromReadArr(graphId: number) {
        return this.readPieceArr
            .filter(v => { return GameConfig.GhostFragment.getElement(v).ghostGraphId === graphId });
    }

    /**
     * 从已解锁的碎片数组中取出该图录所需的碎片
     * @param graphId 图录id
     */
    public getPieceFromUnlockedArr(graphId: number) {
        return this.unlockedPieceArr
            .filter(v => { return GameConfig.GhostFragment.getElement(v).ghostGraphId === graphId });
    }

    /**
     * 检查是否显示红点
     * @param graphId 图录id
     */
    public checkViewRedDot(graphId: number) {
        // 解锁了新碎片但是还未阅读
        if (this.getPieceFromReadArr(graphId).length != this.getPieceFromUnlockedArr(graphId).length) {
            return true;
        }
        // 没有解锁这个图录但是已经有有所有的碎片了
        if (!this.checkHasGraph(graphId) && this.checkHasAllPiece(graphId)) {
            return true;
        }
        // 解锁了这个图录，但是还没有领完奖励
        if (this.checkHasGraph(graphId) && (!this.rewardIsReceived(graphId, 0) || !this.rewardIsReceived(graphId, 1))) {
            return true;
        }
        return false;
    }

    /**
     * 检查是否有这个图录配置
     * @param graphId 图录id
     */
    public checkHasThisGraphCfg(graphId: number) {
        return GameConfig.GhostGraph.getAllElement().findIndex(v => { return v.id === graphId }) != -1;
    }

    /**
     * 检查是否解锁了某个图录
     * @param graphId 图录配置id
     */
    public checkHasGraph(graphId: number) {
        return this.unlockedGraphArr.includes(graphId);
    }

    /**
     * 保存新的图录
     * @param graphId 图录id
     */
    public unlockNewGraph(graphId: number) {
        if (!this.checkHasThisGraphCfg(graphId)) {
            console.error(`DEBUG MyTypeError>>> 解锁新图录失败，配置表中无该配置${graphId}`);
            return false;
        }
        if (this.checkHasGraph(graphId)) {
            return false;
        }
        if (!this.checkHasAllPiece(graphId)) {
            console.error(`DEBUG MyTypeError>>> 解锁新图录失败，还未集起这个图录${graphId}所需碎片`);
            return false;
        }
        AchieveService.getAchieveIns(EAchieveType.UnlockGhostGraph).listen(this["mUserId"], this.unlockedGraphArr);
        this.unlockedGraphArr.push(graphId);
        this.save(true);
        this.graphAction.call(graphId);
        return true;
    }

    /**
     * 检查是否解锁了某个碎片
     * @param pieceId 图录配置id
     */
    public checkHasPiece(pieceId: number) {
        return this.unlockedPieceArr.includes(pieceId);
    }

    /**
     * 检查是否解锁了这个图录的所有碎片
     */
    public checkHasAllPiece(graphId: number) {
        return this.getNeedPieces(graphId).length === 0;
    }

    /**
     * 获取一个图录所需碎片
     * @param graphId 
     */
    public getPieces(graphId: number) {
        return GameConfig.GhostFragment.getAllElement()
            .filter(v => { return v.ghostGraphId === graphId });
    }

    /**
     * 获取一个图录还缺的碎片
     * @param graphId 
     */
    public getNeedPieces(graphId: number) {
        return GameConfig.GhostFragment.getAllElement()
            .filter(v => { return v.ghostGraphId === graphId && !this.unlockedPieceArr.includes(v.id) });
    }

    /**
    * 检查是否有这个图录配置
    * @param pieceId 图录id
    */
    public checkHasThisPieceCfg(pieceId: number) {
        return GameConfig.GhostFragment.getAllElement().findIndex(v => { return v.id === pieceId }) != -1;
    }

    /**
     * 保存新的碎片
     * @param pieceId 碎片id
     */
    public unlockNewPiece(pieceId: number) {
        if (!this.checkHasThisPieceCfg(pieceId)) {
            console.error(`DEBUG MyTypeError>>> 解锁新碎片失败，碎片配置中无该配置${pieceId}`);
            return false;
        }
        if (this.checkHasPiece(pieceId)) {
            // console.error(`DEBUG MyTypeError>>> 解锁新碎片失败，已存在${pieceId}`);
            return false;
        }
        this.unlockedPieceArr.push(pieceId);
        this.save(true);
        this.pieceAction.call(pieceId);
        return true;
    }
}