
import BagModuleS from "../Bag/BagModuleS";
import { PropId } from "../Bag/PropEnum";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import PlayerAssetModuleData from "./PlayerAssetMData";
import PlayerAssetModuleC from "./PlayerAssetModuleC";
import PropSaveData from "./PropSaveData";

export default class PlayerAssetModuleS extends ModuleS<PlayerAssetModuleC, PlayerAssetModuleData> {

    /**道具剩余时间map key: playerId, value: 道具id和剩余时间 */
    public remainTimeMap: Map<number, { id: number, remain: number }[]> = new Map();
    /**更新剩余时间定时任务 */
    private updateRemainTimeTaskMap: Map<number, any> = new Map();
    /**玩家资产数据更新回调 参数：玩家id */
    public onAssetDataUpdate: Action1<number> = new Action();
    /**玩家使用资产道具回调 参数1. 玩家id, 参数2. 道具id*/
    public onUseAssetProp: Action2<number, number> = new Action()


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.onUseAssetProp.add((playerId, propId) => {
            let data = this.getPlayerData(playerId);
            data.delProp(propId);
            data.save(false);
            this.syncToClient(playerId, data.propDataList);
        })

    }


    protected onPlayerEnterGame(player: mw.Player): void {
        this.updataRemainTime(player.playerId);
        // 每过60秒更新一次物品剩余时间
        let task = TimeUtil.setInterval(() => {
            this.updataRemainTime(player.playerId);
        }, 10);
        this.updateRemainTimeTaskMap.set(player.playerId, task);
    }

    protected onPlayerLeft(player: mw.Player): void {
        let task = this.updateRemainTimeTaskMap.get(player.playerId);
        if (task) TimeUtil.clearInterval(task);
        this.updateRemainTimeTaskMap.delete(player.playerId);
    }


    /**更新剩余时间 */
    private updataRemainTime(playerId: number) {
        let data = this.getPlayerData(playerId);
        data.updateRemainTime();
        // 检查道具是否过期
        data.propDataList.forEach((saveData) => {
            if (saveData.isForever == false && saveData.remain < 0) {
                this.overTime(playerId, saveData.id);
            }
        })
        data.save(false);
        this.syncToClient(playerId, data.propDataList);
        // console.log(`更新剩余时间：${JSON.stringify(data.propDataList)}`);
    }


    /**设置玩家物品过期 */
    private overTime(playerId: number, propId: number) {
        ModuleService.getModule(BagModuleS).delPropFromBagById(playerId, propId);
        let data = this.getPlayerData(playerId);
        data.delProp(propId);
        this.getClient(playerId).net_overTime(propId);
        console.log('删除道具' + propId);
    }


    /**添加道具 */
    public addPropAndSave(playerId: number, savedData: PropSaveData) {
        

        let moduleData = this.getPlayerData(playerId);
        this.addProp(playerId, savedData, moduleData)
        moduleData.save(false);
        this.onAssetDataUpdate.call(playerId);
        this.updataRemainTime(playerId);
        console.log(`添加道具：${JSON.stringify(moduleData.propDataList)}`);
    }


    public addProp(playerId:number, savedData: PropSaveData, moduleData: PlayerAssetModuleData){
        // TODO 暂时先写这，后面把复活币从playerModule挪过来
        if (savedData.id == PropId.ReviveCoin) {
            ModuleService.getModule(PlayerModuleS).addReviveCoin(playerId, savedData.count);
            // return;
        }
        
        // 如果是单例道具, 检测能不能转换成 变身卡(暂时, 以后转换成异常币)
        if (savedData.isSingle) {
            let cardNumber = this.convertToTransformationCard(playerId, savedData);
            if (cardNumber > 0) this.addPropAndSave(playerId, new PropSaveData(PropId.TransformationCard, true, -1, cardNumber));
        }
        // 第一次获得跳舞枪
        if (savedData.id == PropId.DanceGun && moduleData.getProp(PropId.DanceGun) == null) {
            this.getClient(playerId).net_firstGet(savedData.id);
        }
        if (savedData.id == PropId.TransformationCard && moduleData.getProp(PropId.TransformationCard) == null) {
            this.getClient(playerId).net_firstGet(savedData.id);
        }        
        // 如果是舞蹈枪, 初始化武器
        if (savedData.id == PropId.DanceGun) {
            this.getClient(playerId).net_initWeapon(PropId.DanceGun);
            console.warn("重新生成道具！！！！");
        }
        moduleData.addSavedProp(savedData);
    }

    /**批量添加道具 */
    public addPropList(playerId: number, newDataList: PropSaveData[]) {
        let moduleData = this.getPlayerData(playerId);
        newDataList.forEach((newData) => {
            this.addProp(playerId, newData, moduleData);
        });
        moduleData.save(false);
        this.onAssetDataUpdate.call(playerId);
        this.updataRemainTime(playerId);
        console.log(`当前道具: ${JSON.stringify(moduleData.propDataList)}`);
    }


    /**删除指定数量道具, 返回成功状态 */
    public delProp(playerId: number, propId: number, count: number = 1): boolean {
        let data = this.getPlayerData(playerId);
        let isSuccess = data.delProp(propId, count);
        if (isSuccess == false) return isSuccess;
        data.save(false);
        this.onAssetDataUpdate.call(playerId);
        this.syncToClient(playerId, data.propDataList);
        return isSuccess;
    }

    /**检查折算成异常币 */
    public checkConvertToAbnormalCoin(playerId: number, savedData: PropSaveData): number {
        let data = this.getPlayerData(playerId);
        let propData = data.propDataList.find(data => data.id == savedData.id);
        if (propData == null) return 0;
        // 拥有试用卡的情况下获得试用卡
        if (propData.isForever == false && savedData.isForever == false) return 0;
        // TODO 配置物品折算价值计算的公式、或者配置表
        // 拥有永久道具的情况下获得了试用卡
        if (propData.isForever && savedData.isForever == false) return savedData.tryTime;
        // 拥有试用卡的情况下获得永久道具
        if (propData.isForever == false && savedData.isForever) return propData.tryTime;

        // 未知情况
        return 0;
    }


    /**
     * 折算成变身卡
     * @param playerId 玩家id
     * @param savedData 保存的信息
     * @returns 变身卡的数量
     */
    public convertToTransformationCard(playerId: number, savedData: PropSaveData): number {
        let data = this.getPlayerData(playerId);
        let propData = data.propDataList.find(data => data.id == savedData.id);
        if (propData == null) return;
        // 玩家道具是永久的
        if (propData.isForever && savedData.isForever == false) {
            // 返还试用道具的天数个变身卡
            return Math.ceil(savedData.tryTime / (60 * 60 * 24));
        }
        // 玩家道具是限时的, 获得了永久的道具, 
        if (savedData.isForever && propData.isForever == false) {
            // 返还玩家剩余试用时间的变身卡
            return Math.ceil(propData.tryTime / (60 * 60 * 24));
        }
        // 其它情况，不返还变身卡
        console.error(`lmn error: 预期外的情况 玩家道具:${propData.isForever}, 新增道具:${savedData.isForever}, 道具id:${propData.id}`);
        return 0;
    }


    /**同步到客户端 */
    syncToClient(playerId: number, dataList: PropSaveData[]) {
        if (dataList == null || dataList.length == 0) return;
        this.getClient(playerId).net_updateRemainTime(JSON.stringify(dataList));
    }
}